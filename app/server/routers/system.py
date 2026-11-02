"""Settings, health and app control."""
import os
import subprocess
import threading

from fastapi import APIRouter
from pydantic import BaseModel

from ..core import ai, config, media

router = APIRouter(prefix="/api", tags=["system"])
shutdown_hook = {"fn": None}
_FF = {}


def _mask(k: str):
    return (k[:7] + "…" + k[-4:]) if k and len(k) > 14 else ("set" if k else "")


def disk_version() -> str:
    """Version of the code on disk. Differs from config.VERSION after an update until the app restarts."""
    import re
    from pathlib import Path
    try:
        m = re.search(r'VERSION = "([^"]+)"', (Path(config.__file__)).read_text(encoding="utf-8"))
        return m.group(1) if m else config.VERSION
    except Exception:
        return config.VERSION


@router.get("/health")
def health():
    from . import devices
    return {"ok": True, "app": config.APP_NAME, "version": config.VERSION, "disk_version": disk_version(),
            "peer_update": devices.STATE["update"]}


@router.post("/restart")
def restart_app():
    """Start a fresh copy of the app (it waits for this one to stop), then stop this one.
    The open window reconnects by itself."""
    import sys
    from pathlib import Path
    launcher = Path(__file__).resolve().parents[2] / "launcher.py"
    flags = (0x00000008 | 0x00000200 | 0x08000000) if sys.platform == "win32" else 0  # detached, new group, no window
    subprocess.Popen([sys.executable, str(launcher), "--restarted"], cwd=str(launcher.parent),
                     creationflags=flags, close_fds=True)
    from ..core import history
    history.log("App restarted", f"{config.VERSION} → {disk_version()}")
    return quit_app()


@router.get("/settings")
def get_settings():
    s = config.load_settings()
    return {
        "model": s["model"], "output_dir": s["output_dir"], "whisper_model": s["whisper_model"],
        "anthropic_api_key": _mask(s["anthropic_api_key"]), "has_anthropic_key": bool(s["anthropic_api_key"]),
        "airtable_token": _mask(s["airtable_token"]), "has_airtable_token": bool(s["airtable_token"]),
        "data_dir": str(config.DATA_DIR), "version": config.VERSION,
        "effort": s.get("effort") or "", "profile": s.get("profile") or "",
        "models": ai.MODELS, "efforts": ai.EFFORTS, "web_search": bool(s.get("web_search", True)),
        "location": s.get("location") or {},
    }


class SettingsReq(BaseModel):
    anthropic_api_key: str | None = None
    airtable_token: str | None = None
    model: str | None = None
    output_dir: str | None = None
    whisper_model: str | None = None
    effort: str | None = None
    profile: str | None = None
    web_search: bool | None = None
    location: dict | None = None


@router.post("/settings")
def save_settings(r: SettingsReq):
    upd = {k: (v.strip() if isinstance(v, str) else v) for k, v in r.model_dump().items() if v is not None}
    if "effort" in upd and upd["effort"] not in ai.EFFORTS:
        upd["effort"] = ""
    config.save_settings(upd)
    from ..core import history
    history.log("Settings changed", ", ".join(k.replace("_", " ") for k in upd))
    return get_settings()


@router.post("/settings/test-claude")
def test_claude():
    try:
        txt = ai.ask("Reply with just: OK", 10, effort_level="low")
        return {"ok": True, "reply": txt.strip(), "model": ai.model()}
    except Exception as e:
        return {"ok": False, "error": getattr(e, "detail", str(e))}


@router.get("/status")
def status():
    s = config.load_settings()
    ff = _FF.get("v")
    if ff is None:
        try:
            p = subprocess.run([media.FFMPEG, "-version"], capture_output=True, text=True, creationflags=media._NOWIN)
            ff = _FF["v"] = p.stdout.split("\n")[0][:60]
        except Exception as e:
            ff = f"missing ({e})"
    models = [d.name for d in config.MODELS_DIR.iterdir()] if config.MODELS_DIR.exists() else []
    return {"claude": bool(s["anthropic_api_key"]), "airtable": bool(s["airtable_token"]),
            "ffmpeg": ff, "whisper_models": models, "output_dir": str(config.output_dir()),
            "model": s["model"]}


class UrlReq(BaseModel):
    url: str


@router.post("/open-url")
def open_url(r: UrlReq):
    """Open a web link in the normal browser (not inside the app window)."""
    if not r.url.startswith(("http://", "https://")):
        from fastapi import HTTPException
        raise HTTPException(400, "Only web links")
    import webbrowser
    webbrowser.open(r.url)
    return {"ok": True}


@router.post("/open-data-folder")
def open_data():
    from .files import _open
    _open(str(config.DATA_DIR))
    return {"ok": True}


@router.post("/quit")
def quit_app():
    def later():
        import time
        time.sleep(0.5)
        if shutdown_hook["fn"]:
            shutdown_hook["fn"]()
        os._exit(0)
    threading.Thread(target=later, daemon=True).start()
    return {"ok": True}
