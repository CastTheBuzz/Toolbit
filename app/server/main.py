import logging
import threading
import traceback
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse

from .core import config, db
from .core import files as core_files
from .core import history, reminders
from .routers import (audio, backup, batch, calendar, data, devices, files, history_api, image, lyrics, mail, news, pdf,
                      system, tools, video)

log = logging.getLogger("da")

WEB_DIR = Path(__file__).resolve().parent.parent / "web"


def create_app(background: bool = True) -> FastAPI:
    db.init_db()
    history.init()
    calendar.init()
    reminders.init()
    try:
        core_files.ensure_folders()
        core_files.migrate_output_folders()
        history.record_updates()
        threading.Thread(target=reminders.migrate_shortcuts, daemon=True).start()
    except Exception:
        log.exception("folder setup failed")
    if background:
        backup.start_auto()
    try:
        devices.init(background)
    except Exception:
        log.exception("devices init failed")
    try:
        legacy = config.import_legacy()
        if legacy and legacy.get("old_db"):
            n = db.import_old_analyses(legacy["old_db"])
            log.info("Imported %s analyses from old app", n)
    except Exception:
        log.exception("legacy import failed")

    app = FastAPI(title=config.APP_NAME, version=config.VERSION)
    for r in (system, files, audio, video, image, pdf, data, lyrics, calendar, backup, history_api, tools, batch, mail, news,
              devices):
        app.include_router(r.router)

    @app.middleware("http")
    async def other_devices_guard(request: Request, call_next):
        # anything not on this PC must be on Tailscale / home Wi-Fi and signed in (PIN) or paired
        blocked = devices.guard(request)
        return blocked if blocked is not None else await call_next(request)
    app.include_router(batch.jobs_router)

    @app.exception_handler(Exception)
    async def all_errors(request: Request, exc: Exception):
        log.error("Unhandled error on %s\n%s", request.url.path, traceback.format_exc())
        from .core.errors import friendly
        return JSONResponse(status_code=500, content={"detail": friendly(f"{type(exc).__name__}: {exc}")})

    @app.exception_handler(HTTPException)
    async def http_errors(request: Request, exc: HTTPException):
        from .core.errors import friendly
        d = exc.detail
        if exc.status_code >= 400 and isinstance(d, str):
            if d.startswith("ffmpeg failed") or "Error" in d:
                log.warning("%s on %s: %s", exc.status_code, request.url.path, d[-400:])
            d = friendly(d)
        return JSONResponse(status_code=exc.status_code, content={"detail": d}, headers=getattr(exc, "headers", None))

    @app.get("/{full_path:path}", include_in_schema=False)
    def spa(full_path: str, request: Request):
        if full_path.startswith("api/"):
            raise HTTPException(404)
        target = (WEB_DIR / full_path).resolve()
        if full_path and target.is_file() and WEB_DIR in target.parents:
            # bundles have the version in their name, so the window can keep them cached
            cache = "public, max-age=31536000, immutable" if full_path.startswith("assets/") else "no-cache"
            gz = target.with_name(target.name + ".gz")
            if gz.is_file() and "gzip" in request.headers.get("accept-encoding", ""):
                kind = "text/css" if target.suffix == ".css" else "text/javascript"
                return FileResponse(gz, media_type=kind, headers={"Cache-Control": cache, "Content-Encoding": "gzip",
                                                                  "Vary": "Accept-Encoding"})
            return FileResponse(target, headers={"Cache-Control": cache})
        index = WEB_DIR / "index.html"
        if index.exists():
            return FileResponse(index, headers={"Cache-Control": "no-cache"})
        return JSONResponse({"detail": "Frontend not built"}, status_code=404)

    return app
