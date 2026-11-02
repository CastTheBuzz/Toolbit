"""3.3 Other devices.

- Phone / any browser: when "Other devices" is on, Toolbit listens on the network (Tailscale or home Wi-Fi only)
  and anything not on this PC must sign in with the PIN.
- Laptop: a second Toolbit paired with this one. The laptop drives the sync (settings + My Files, both ways)
  and offers updates when this PC runs a newer version.
- Installer: this PC builds "Toolbit-Setup.zip" (Python + app + pairing) for the laptop.
"""
from __future__ import annotations

import hashlib
import ipaddress
import json
import logging
import os
import re
import secrets
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time
import uuid
import zipfile
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, RedirectResponse
from pydantic import BaseModel

from ..core import config, files, history, jobs

log = logging.getLogger("devices")
router = APIRouter(tags=["devices"])
PORT = int(os.environ.get("TOOLBIT_PORT", 47615))
APP_DIR = Path(__file__).resolve().parents[2]            # ...\app
ROOT = APP_DIR.parent                                    # ...\Data Assistant  (python\ + app\)
TMP = config.DATA_DIR / "tmp"
_NOWIN = 0x08000000 if sys.platform == "win32" else 0
SECURE_NET = ipaddress.ip_network("100.64.0.0/10")      # Tailscale
_EXTRA = [ipaddress.ip_network(n) for n in os.environ.get("TOOLBIT_SECURE_NETS", "").split(",") if n]   # tests only
STATE: dict = {"sync": {"running": False, "last": "", "log": []}, "update": None, "peers": {}}


def _now() -> str:
    return datetime.now().isoformat(timespec="seconds")


def vtuple(v: str):
    return tuple(int(x) for x in re.findall(r"\d+", v or "0")[:3])


def me() -> dict:
    s = config.load_settings()
    upd = {}
    if not s.get("device_id"):
        upd["device_id"] = uuid.uuid4().hex[:12]
    if not s.get("device_name"):
        upd["device_name"] = (socket.gethostname() or "This PC")[:40]
    if upd:
        s = config.save_settings(upd)
    return {"id": s["device_id"], "name": s["device_name"], "version": config.VERSION}


# ---------------- secrets ----------------
def _hash_pin(pin: str, salt: str | None = None) -> str:
    salt = salt or secrets.token_hex(8)
    return salt + "$" + hashlib.pbkdf2_hmac("sha256", pin.encode(), salt.encode(), 120_000).hex()


def _pin_ok(pin: str) -> bool:
    stored = config.get("remote_pin") or ""
    if "$" not in stored or not pin:
        return False
    return secrets.compare_digest(_hash_pin(pin, stored.split("$")[0]), stored)


def _th(token: str) -> str:
    return hashlib.sha256((token or "").encode()).hexdigest()


_FAILS: dict = {}
_PIN_LOCK = threading.Lock()


def _try_pin(ip: str, pin: str) -> bool:
    """Counts the attempt first (under a lock, so parallel guesses can't slip through), then checks it.
    Limits: 5 tries per address and 15 overall per 10 minutes."""
    with _PIN_LOCK:
        now = time.time()
        for k in list(_FAILS):
            _FAILS[k] = [t for t in _FAILS[k] if now - t < 600]
        # the overall limit only counts home-network guesses, so nobody on the Wi-Fi can lock out
        # this PC or your Tailscale devices
        mine = len(_FAILS.get(ip, []))
        lan = sum(len(v) for k, v in _FAILS.items() if not secure_host(k))
        if mine >= 5 or (not secure_host(ip) and lan >= 15):
            raise HTTPException(429, "Too many tries. Wait 10 minutes and try again.")
        _FAILS.setdefault(ip, []).append(now)
        ok = _pin_ok(pin)
        if ok:
            _FAILS[ip].pop()
        return ok


# ---------------- who is asking ----------------
def is_local(host: str) -> bool:
    return host in ("127.0.0.1", "::1", "localhost") or host.startswith("::ffff:127.")


def _ip(host: str):
    try:
        ip = ipaddress.ip_address(host.replace("::ffff:", ""))
        return ip
    except ValueError:
        return None


def allowed_net(host: str) -> bool:
    ip = _ip(host)
    return bool(ip and (ip in SECURE_NET or ip.is_private or ip.is_link_local))


def secure_host(host: str) -> bool:
    """Tailscale (encrypted) or this machine: OK to pass email app passwords."""
    ip = _ip(host)
    return is_local(host) or bool(ip and (ip in SECURE_NET or any(ip in n for n in _EXTRA)))


_CACHE = {"t": 0.0, "s": None}


def _settings_cached():
    if time.time() - _CACHE["t"] > 3 or _CACHE["s"] is None:
        _CACHE.update(t=time.time(), s=config.load_settings())
    return _CACHE["s"]


def _bust():
    _CACHE["s"] = None


SESSION_DAYS = 90


def session_ok(request: Request) -> bool:
    tok = request.cookies.get("tb_session") or ""
    if not tok:
        return False
    h = _th(tok)
    oldest = datetime.fromtimestamp(time.time() - SESSION_DAYS * 86400).isoformat(timespec="seconds")
    return any(x.get("h") == h and (x.get("at") or "") > oldest for x in (_settings_cached().get("remote_sessions") or []))


def peer_from(request: Request):
    tok = request.headers.get("x-toolbit-token") or ""
    if not tok:
        return None
    h = _th(tok)
    return next((x for x in (_settings_cached().get("peer_tokens") or []) if x.get("h") == h), None)


OPEN_PATHS = ("/login", "/api/remote/login", "/api/peer/pair", "/icon.svg", "/icon-32.png", "/icon-256.png",
              "/manifest.webmanifest")
# things a signed-in phone may NOT do (they act on the PC itself or change how it can be reached)
PC_ONLY = re.compile(r"^/api/(quit|restart|open-url|open-data-folder|history/open-folder|files/open-output-folder"
                     r"|files/[^/]+/(open|reveal)|backup/(open|save|settings|run)|settings(/.*)?|reminders/settings"
                     r"|devices/(?!status$).*)/?$", re.I)
PHONE_OK = re.compile(r"^/api/(remote/logout|devices/status)$")
_HOST_OK = re.compile(r"^(\[[0-9a-f:.]+\]|[0-9.]+|localhost|[a-z0-9-]+|[a-z0-9.-]+\.ts\.net)(:\d+)?$", re.I)


def _same_origin(request: Request) -> bool:
    """Blocks other websites from making the browser send commands to Toolbit (CSRF)."""
    if request.method in ("GET", "HEAD", "OPTIONS"):
        return True
    origin = request.headers.get("origin")
    if origin:
        return origin.split("//", 1)[-1].rstrip("/").lower() == (request.headers.get("host") or "").lower()
    return request.headers.get("sec-fetch-site", "same-origin") in ("same-origin", "none")


def guard(request: Request):
    """Called for every request. None = let it through."""
    host = request.client.host if request.client else ""
    path = request.url.path
    if "//" in path or "\\" in path or "/.." in path:
        return JSONResponse({"detail": "Bad path"}, status_code=400)
    # DNS rebinding: only answer to addresses / names, never to some website's domain
    if not _HOST_OK.match(request.headers.get("host") or ""):
        return JSONResponse({"detail": "Bad host"}, status_code=403)
    peer_api = path.startswith("/api/peer/") and path != "/api/peer/pair"
    if peer_api and not peer_from(request):
        return JSONResponse({"detail": "This device isn't paired"}, status_code=401)
    if not peer_api and not _same_origin(request):
        return JSONResponse({"detail": "Blocked: request from another website"}, status_code=403)
    if is_local(host):
        return None
    s = _settings_cached()
    if not s.get("remote_access") or not allowed_net(host):
        return JSONResponse({"detail": "Not allowed"}, status_code=403)
    if path in OPEN_PATHS or peer_api:
        return None
    if not session_ok(request):
        if path.startswith("/api/"):
            return JSONResponse({"detail": "Sign in with your PIN first"}, status_code=401)
        from urllib.parse import quote
        return RedirectResponse("/login" + ("?to=" + quote(path) if path not in ("/", "") else ""), status_code=303)
    if PC_ONLY.match(path) and not PHONE_OK.match(path):
        return JSONResponse({"detail": "That only works on the PC itself"}, status_code=403)
    return None


# ---------------- addresses ----------------
_TS = {"t": 0.0, "v": None}


def tailscale() -> dict:
    if _TS["v"] is not None and time.time() - _TS["t"] < 30:
        return _TS["v"]
    _TS.update(t=time.time(), v=_tailscale())
    return _TS["v"]


def _tailscale() -> dict:
    exe = shutil.which("tailscale")
    if not exe and sys.platform == "win32":
        p = Path(os.environ.get("PROGRAMFILES", r"C:\Program Files")) / "Tailscale" / "tailscale.exe"
        exe = str(p) if p.exists() else None
    if not exe:
        return {"installed": False}
    try:
        p = subprocess.run([exe, "status", "--json"], capture_output=True, text=True, timeout=6, creationflags=_NOWIN)
        d = json.loads(p.stdout or "{}")
        selfd = d.get("Self") or {}
        ips = [x for x in (selfd.get("TailscaleIPs") or []) if ":" not in x]
        return {"installed": True, "running": d.get("BackendState") == "Running", "ip": ips[0] if ips else "",
                "name": (selfd.get("DNSName") or "").rstrip(".").split(".")[0],
                "dns": (selfd.get("DNSName") or "").rstrip(".")}
    except Exception:
        return {"installed": True, "running": False, "ip": ""}


def lan_ips() -> list[str]:
    out = []
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))          # no packet is sent; just picks the main network card
        out.append(s.getsockname()[0])
        s.close()
    except Exception:
        pass
    try:
        for fam, _, _, _, sa in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            out.append(sa[0])
    except Exception:
        pass
    keep = []
    for ip in out:
        a = _ip(ip)
        if a and not a.is_loopback and not a.is_link_local and ip not in keep:
            keep.append(ip)
    return keep


def my_urls() -> list[dict]:
    ts = tailscale()
    urls = []
    if ts.get("ip"):
        urls.append({"label": "Tailscale (works anywhere)", "url": f"http://{ts['ip']}:{PORT}", "secure": True})
    for ip in lan_ips():
        if not ts.get("ip") or ip != ts["ip"]:
            if _ip(ip) in SECURE_NET:
                continue
            urls.append({"label": "Home Wi-Fi only", "url": f"http://{ip}:{PORT}", "secure": False})
    return urls


# ---------------- status (UI) ----------------
def _peer_view(p: dict) -> dict:
    st = STATE["peers"].get(p["id"], {})
    return {"id": p["id"], "name": p.get("name") or "Toolbit", "urls": p.get("urls", []), "version": p.get("version", ""),
            "last_ok": p.get("last_ok", ""), "last_sync": p.get("last_sync", ""), "online": st.get("online"),
            "error": st.get("error", ""), "url": st.get("url", "")}


@router.get("/api/devices/status")
def status(request: Request):
    s = config.load_settings()
    host = request.client.host if request.client else ""
    return {
        "me": me(), "remote_access": bool(s.get("remote_access")), "pin_set": bool(s.get("remote_pin")),
        "local": is_local(host),
        "tailscale": tailscale() if is_local(host) else {}, "urls": my_urls() if s.get("remote_access") else [],
        "sessions": [{"at": x.get("at"), "ua": x.get("ua", "")} for x in s.get("remote_sessions") or []],
        "paired": [{"id": x.get("id", ""), "name": x.get("name", ""), "at": x.get("at", ""), "seen": x.get("seen", ""),
                    "k": x["h"][:10]} for x in s.get("peer_tokens") or []],
        "peers": [_peer_view(p) for p in s.get("peers") or []],
        "update": STATE["update"],
        "sync": {"files": bool(s.get("sync_files", True)), "max_mb": s.get("sync_max_mb", 200), **STATE["sync"]},
        "setup": _setup_info(),
    }


class RemoteReq(BaseModel):
    on: bool
    pin: str = ""


def _firewall():
    """Allow Toolbit through Windows Firewall for Tailscale + the home network (asks for permission once)."""
    if sys.platform != "win32":
        return True
    py = Path(sys.executable).parent
    progs = [str(py / n) for n in ("pythonw.exe", "python.exe") if (py / n).exists()]
    want = (progs[0] if progs else "").replace("'", "''")

    def have_rule():
        c = subprocess.run(["powershell", "-NoProfile", "-Command",
                            f"$r = Get-NetFirewallRule -DisplayName 'Toolbit' -ErrorAction SilentlyContinue; "
                            f"if ($r -and (($r | Get-NetFirewallApplicationFilter).Program -contains '{want}') -and "
                            f"(($r | Get-NetFirewallPortFilter).LocalPort -contains '{PORT}')) {{ 'yes' }}"],
                           capture_output=True, text=True, timeout=20, creationflags=_NOWIN)
        return "yes" in (c.stdout or "")
    if have_rule():
        return True
    lines = ["Get-NetFirewallRule -DisplayName 'Toolbit' -ErrorAction SilentlyContinue | Remove-NetFirewallRule"]
    for prog in progs:
        q = prog.replace("'", "''")
        # an earlier "Cancel" on Windows' own pop-up leaves a Block rule that would win: remove those first
        lines.append(f"Get-NetFirewallApplicationFilter -Program '{q}' -ErrorAction SilentlyContinue | Get-NetFirewallRule | "
                     f"Where-Object {{ $_.Action -eq 'Block' }} | Remove-NetFirewallRule")
        lines.append(f"New-NetFirewallRule -DisplayName 'Toolbit' -Direction Inbound -Action Allow -Protocol TCP "
                     f"-LocalPort {PORT} -Program '{q}' -Profile Any -RemoteAddress @('100.64.0.0/10','LocalSubnet') | Out-Null")
    import base64
    enc = base64.b64encode(";".join(lines).encode("utf-16-le")).decode()
    p = subprocess.run(["powershell", "-NoProfile", "-Command",
                        f"Start-Process powershell -Verb RunAs -Wait -WindowStyle Hidden -ArgumentList "
                        f"'-NoProfile','-EncodedCommand','{enc}'"],
                       capture_output=True, text=True, timeout=180, creationflags=_NOWIN)
    ok = have_rule()                                  # the only reliable answer: is the rule there now?
    if not ok:
        log.warning("firewall rule not added: %s", (p.stderr or "")[-300:])
    return ok


def _check_pin(pin: str):
    if not re.fullmatch(r"\d{6,12}", pin or ""):
        raise HTTPException(400, "The PIN must be 6 to 12 digits")


@router.post("/api/devices/remote")
def set_remote(r: RemoteReq):
    upd = {"remote_access": r.on}
    if r.on:
        if r.pin:
            _check_pin(r.pin)
            upd["remote_pin"] = _hash_pin(r.pin)
        elif not config.get("remote_pin"):
            raise HTTPException(400, "Choose a PIN first")
        fw = _firewall()
    else:
        fw = True
        upd["remote_sessions"] = []
    config.save_settings(upd)
    _bust()
    history.log("Other devices " + ("switched on" if r.on else "switched off"))
    return {"ok": True, "restart": True, "firewall": fw}


class PinReq(BaseModel):
    pin: str


@router.post("/api/devices/pin")
def set_pin(r: PinReq):
    _check_pin(r.pin)
    config.save_settings({"remote_pin": _hash_pin(r.pin), "remote_sessions": []})
    _bust()
    return {"ok": True}


@router.post("/api/devices/signout-all")
def signout_all():
    config.save_settings({"remote_sessions": []})
    _bust()
    return {"ok": True}


class NameReq(BaseModel):
    name: str


@router.post("/api/devices/name")
def set_name(r: NameReq):
    config.save_settings({"device_name": r.name.strip()[:40] or socket.gethostname()})
    return me()


class SyncCfg(BaseModel):
    files: bool = True
    max_mb: int = 200


@router.post("/api/devices/sync-settings")
def sync_settings(r: SyncCfg):
    config.save_settings({"sync_files": r.files, "sync_max_mb": max(1, min(r.max_mb, 4000))})
    return {"ok": True}


@router.post("/api/devices/paired/{k}/remove")
def unpair_token(k: str):
    toks = [x for x in config.get("peer_tokens") or [] if not x["h"].startswith(k)]
    config.save_settings({"peer_tokens": toks})
    _bust()
    return {"ok": True}


@router.post("/api/devices/peer/{pid}/remove")
def remove_peer(pid: str):
    config.save_settings({"peers": [p for p in config.get("peers") or [] if p["id"] != pid]})
    STATE["peers"].pop(pid, None)
    if STATE["update"] and STATE["update"].get("peer") == pid:
        STATE["update"] = None
    return {"ok": True}


# ---------------- phone sign-in ----------------
LOGIN_HTML = """<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Toolbit · Sign in</title><link rel="icon" href="/icon-32.png"><link rel="apple-touch-icon" href="/icon-256.png">
<link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#121218">
<style>:root{color-scheme:light dark}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
font:15px/1.5 Segoe UI,system-ui,-apple-system,sans-serif;background:#f6f6f9;color:#17171c}
@media(prefers-color-scheme:dark){body{background:#0f0f13;color:#ececf2}.box{background:#18181f!important;border-color:#2a2a36!important}
input{background:#20202a!important;color:#ececf2!important;border-color:#2a2a36!important}}
.box{background:#fff;border:1px solid #e3e3ea;border-radius:16px;padding:28px 24px;width:min(340px,88vw);text-align:center}
img{width:56px;height:56px}h1{font-size:20px;margin:10px 0 2px}p{margin:0 0 18px;color:#6b6b78;font-size:13.5px}
input{width:100%;box-sizing:border-box;font-size:24px;letter-spacing:.3em;text-align:center;padding:10px;border:1px solid #e3e3ea;border-radius:10px;outline:none}
input:focus{border-color:#5b5bf7}button{margin-top:14px;width:100%;padding:11px;border:0;border-radius:10px;background:#5b5bf7;color:#fff;font-size:15px;font-weight:600}
.err{color:#d94545;font-size:13px;min-height:20px;margin-top:10px}</style></head><body>
<form class="box" id="f"><img src="/icon.svg" alt=""><h1>Toolbit</h1><p>Enter the PIN you set on your PC<br>(Toolbit › Devices).</p>
<input id="pin" type="password" inputmode="numeric" autocomplete="current-password" autofocus maxlength="10">
<button>Sign in</button><div class="err" id="e"></div></form>
<script>document.getElementById('f').onsubmit=async(ev)=>{ev.preventDefault();const e=document.getElementById('e');e.textContent='';
try{const r=await fetch('/api/remote/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pin:document.getElementById('pin').value})});
const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Wrong PIN');
const to=new URLSearchParams(location.search).get('to')||'/';location.replace(to.charAt(0)==='/'&&to.charAt(1)!=='/'&&to.charAt(1)!==String.fromCharCode(92)?to:'/')}catch(x){e.textContent=x.message}}</script></body></html>"""

MANIFEST = {"name": "Toolbit", "short_name": "Toolbit", "start_url": "/", "display": "standalone",
            "background_color": "#121218", "theme_color": "#121218",
            "icons": [{"src": "/icon-256.png", "sizes": "256x256", "type": "image/png"},
                      {"src": "/icon.svg", "sizes": "any", "type": "image/svg+xml"}]}


@router.get("/login", include_in_schema=False)
def login_page():
    return HTMLResponse(LOGIN_HTML, headers={"Cache-Control": "no-cache"})


@router.get("/manifest.webmanifest", include_in_schema=False)
def manifest():
    return JSONResponse(MANIFEST, media_type="application/manifest+json")


class LoginReq(BaseModel):
    pin: str


@router.post("/api/remote/login")
def remote_login(r: LoginReq, request: Request):
    ip = request.client.host if request.client else "?"
    if not _try_pin(ip, r.pin):
        raise HTTPException(401, "Wrong PIN")
    tok = secrets.token_urlsafe(32)
    ua = request.headers.get("user-agent", "")
    oldest = datetime.fromtimestamp(time.time() - SESSION_DAYS * 86400).isoformat(timespec="seconds")
    kind = "Phone" if re.search(r"Android|iPhone|Mobile", ua) else "Browser"
    sess = [x for x in config.get("remote_sessions") or [] if (x.get("at") or "") > oldest][-19:]
    sess.append({"h": _th(tok), "at": _now(), "ua": f"{kind} ({ip})"})
    config.save_settings({"remote_sessions": sess})
    _bust()
    res = JSONResponse({"ok": True})
    res.set_cookie("tb_session", tok, max_age=90 * 24 * 3600, httponly=True, samesite="lax")
    return res


@router.post("/api/remote/logout")
def remote_logout(request: Request):
    h = _th(request.cookies.get("tb_session") or "")
    config.save_settings({"remote_sessions": [x for x in config.get("remote_sessions") or [] if x.get("h") != h]})
    _bust()
    res = JSONResponse({"ok": True})
    res.delete_cookie("tb_session")
    return res


# ---------------- peer API (what the laptop calls on this PC) ----------------
def issue_token(name: str, did: str = "") -> str:
    tok = secrets.token_urlsafe(32)
    toks = [x for x in config.get("peer_tokens") or [] if not (did and x.get("id") == did)]
    toks.append({"h": _th(tok), "name": name[:40], "id": did, "at": _now(), "seen": ""})
    config.save_settings({"peer_tokens": toks})
    _bust()
    return tok


def _touch(request: Request):
    """Remember which device a token belongs to (the installer's token learns the laptop's name on first use)."""
    t = peer_from(request)
    if not t:
        return None
    did, name = request.headers.get("x-toolbit-device", ""), request.headers.get("x-toolbit-name", "")
    if (did and t.get("id") != did) or (name and t.get("name") != name) or t.get("seen", "")[:15] != _now()[:15]:
        toks = config.get("peer_tokens") or []
        for x in toks:
            if x["h"] == t["h"]:
                x.update(id=did or x.get("id", ""), name=(name or x.get("name", ""))[:40], seen=_now())
        config.save_settings({"peer_tokens": toks})
        _bust()
    return t


class PairReq(BaseModel):
    pin: str
    id: str = ""
    name: str = ""


@router.post("/api/peer/pair")
def peer_pair(r: PairReq, request: Request):
    ip = request.client.host if request.client else "?"
    if not _try_pin(ip, r.pin):
        raise HTTPException(401, "Wrong PIN")
    tok = issue_token(r.name or "Device", r.id)
    history.log("Device paired", r.name or ip)
    return {"token": tok, **me(), "urls": [u["url"] for u in my_urls()]}


@router.get("/api/peer/info")
def peer_info(request: Request):
    _touch(request)
    return {**me(), "urls": [u["url"] for u in my_urls()]}


def _sync_values(secure: bool) -> dict:
    s = config.load_settings()
    keys = [k for k in config.SYNC_KEYS if secure or k != "email_accounts"]
    meta = s.get("settings_meta") or {}
    return {"values": {k: s.get(k) for k in keys}, "meta": {k: meta.get(k, "") for k in keys}}


@router.get("/api/peer/settings")
def peer_settings(request: Request):
    return _sync_values(secure_host(request.client.host if request.client else ""))


class SettingsPush(BaseModel):
    values: dict
    meta: dict


@router.post("/api/peer/settings")
def peer_settings_push(r: SettingsPush, request: Request):
    secure = secure_host(request.client.host if request.client else "")
    mine = (config.get("settings_meta") or {})
    upd = {k: v for k, v in r.values.items() if k in config.SYNC_KEYS and (secure or k != "email_accounts")
           and (r.meta.get(k) or "") > (mine.get(k) or "")}
    if upd:
        config.save_settings(upd, meta=r.meta)
    return {"ok": True, "applied": list(upd)}


@router.get("/api/peer/files")
def peer_files():
    return {"files": files.manifest(), "deleted": files.tombstones()}


@router.get("/api/peer/files/{sha}")
def peer_file(sha: str):
    from ..core.db import get_db
    conn = get_db()
    rows = conn.execute("SELECT path, name FROM files WHERE sha=?", (sha,)).fetchall()
    conn.close()
    for p, name in rows:
        if Path(p).exists():
            return FileResponse(p, filename=name)
    raise HTTPException(404, "Not here any more")


@router.post("/api/peer/files")
def peer_file_push(meta: str = Form(...), file: UploadFile = File(...)):
    m = json.loads(meta)
    TMP.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=TMP, suffix=".part")
    with os.fdopen(fd, "wb") as out:
        shutil.copyfileobj(file.file, out, 1024 * 1024)
    if files.file_sha(Path(tmp)) != m.get("sha"):
        Path(tmp).unlink(missing_ok=True)
        raise HTTPException(400, "File arrived damaged")
    f = files.add_synced(Path(tmp), m)
    return {"ok": True, "added": bool(f)}


class DeletedReq(BaseModel):
    items: dict


@router.post("/api/peer/files/deleted")
def peer_deleted(r: DeletedReq):
    n = sum(files.remove_synced(sha, at) for sha, at in r.items.items())
    return {"removed": n}


def app_members():
    """Files that make up the app (no backups, deploy leftovers, old bundles or source)."""
    index = (APP_DIR / "web" / "index.html").read_text(encoding="utf-8") if (APP_DIR / "web" / "index.html").exists() else ""
    wanted_assets = set(re.findall(r"/assets/([\w.-]+)", index))
    for p in sorted(APP_DIR.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(APP_DIR)
        top = rel.parts[0]
        if (top.startswith(("backup-", "_deploy", "_old", "pairing")) or top in ("frontend-src",)
                or "__pycache__" in rel.parts or p.suffix in (".pyc", ".log", ".tmp", ".part")):
            continue
        if top == "web" and len(rel.parts) == 3 and rel.parts[1] == "assets":
            base = rel.parts[2][:-3] if rel.parts[2].endswith(".gz") else rel.parts[2]
            if base not in wanted_assets:
                continue
        yield p, rel.as_posix()


@router.get("/api/peer/app.zip")
def peer_app_zip():
    TMP.mkdir(parents=True, exist_ok=True)
    out = TMP / f"toolbit-app-{config.VERSION}.zip"
    members = list(app_members())
    newest = max((p.stat().st_mtime for p, _ in members), default=0)
    if not out.exists() or out.stat().st_mtime < newest:
        for old in TMP.glob("toolbit-app-*.zip"):
            old.unlink(missing_ok=True)
        part = out.with_suffix(".part")
        with zipfile.ZipFile(part, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
            for p, rel in members:
                z.write(p, rel)
        os.replace(part, out)
    return FileResponse(out, filename=out.name, media_type="application/zip")


# ---------------- this device talking to its peers (laptop side) ----------------
def _http():
    import requests
    s = requests.Session()
    s.trust_env = False                       # never send device traffic through a proxy
    return s


def _headers(peer):
    m = me()
    return {"X-Toolbit-Token": peer["token"], "X-Toolbit-Device": m["id"], "X-Toolbit-Name": m["name"]}


def _base(url: str) -> str:
    url = (url or "").strip().rstrip("/")
    if not url:
        return ""
    if not re.match(r"https?://", url):
        url = "http://" + url
    if not re.search(r":\d+$", url.split("//", 1)[1].split("/")[0]):
        url += f":{PORT}"
    return url


def _url_secure(url: str) -> bool:
    host = url.split("//", 1)[-1].split("/")[0].rsplit(":", 1)[0].strip("[]")
    if secure_host(host):
        return True
    if _ip(host) is None:                      # a Tailscale name: check where it points
        try:
            return secure_host(socket.gethostbyname(host))
        except OSError:
            return False
    return False


def _reach(peer, sess):
    st = STATE["peers"].setdefault(peer["id"], {})
    # device traffic (token, files, updates) only goes over Tailscale, which is encrypted
    urls = [u for u in dict.fromkeys(peer.get("urls") or []) if _url_secure(u)]
    if peer.get("urls") and not urls:
        st.update(online=False, error="Needs Tailscale on both devices (home Wi-Fi alone isn't encrypted).")
        return None, None
    last = ""
    for u in urls:
        try:
            r = sess.get(u + "/api/peer/info", headers=_headers(peer), timeout=4)
            if r.status_code == 401:
                st.update(online=True, error="This PC no longer knows this device. Pair again.", url=u)
                return None, None
            r.raise_for_status()
            st.update(online=True, error="", url=u)
            return u, r.json()
        except Exception as e:
            last = str(e)[:120]
    st.update(online=False, error="Not reachable right now (is it on, with Tailscale running?)" if urls else "No address")
    log.info("peer %s offline: %s", peer.get("name"), last)
    return None, None


def _save_peer(pid: str, **kw):
    peers = config.get("peers") or []
    for p in peers:
        if p["id"] == pid:
            p.update(kw)
    config.save_settings({"peers": peers})


def _log(msg: str):
    STATE["sync"]["log"] = ([f"{_now()[11:16]} {msg}"] + STATE["sync"]["log"])[:30]


def sync_peer(peer: dict, job=None) -> dict:
    sess = _http()
    base, info = _reach(peer, sess)
    if not base:
        return {"ok": False}
    h = _headers(peer)
    urls = list(dict.fromkeys([base] + [_base(u) for u in info.get("urls") or []] + list(peer.get("urls") or [])))
    _save_peer(peer["id"], name=info.get("name") or peer.get("name"), version=info.get("version", ""),
               last_ok=_now(), urls=urls[:6])
    # newer version over there? offer it here
    if vtuple(info.get("version")) > vtuple(config.VERSION):
        STATE["update"] = {"peer": peer["id"], "name": info.get("name") or "your PC", "version": info["version"]}
    elif STATE["update"] and STATE["update"].get("peer") == peer["id"]:
        STATE["update"] = None
    summary = {"settings": [], "down": 0, "up": 0, "removed_here": 0, "removed_there": 0, "skipped_big": 0}

    # settings: newest change wins, key by key
    secure = True                                # _reach only returns Tailscale/local addresses
    theirs = sess.get(base + "/api/peer/settings", headers=h, timeout=15).json()
    mine = _sync_values(secure)
    take, give, give_meta, take_meta = {}, {}, {}, {}
    for k in theirs.get("values", {}):
        if k not in mine["values"]:
            continue
        tm, mm = theirs["meta"].get(k) or "", mine["meta"].get(k) or ""
        if tm > mm:
            take[k], take_meta[k] = theirs["values"][k], tm
        elif mm > tm:
            give[k], give_meta[k] = mine["values"][k], mm
    if take:
        config.save_settings(take, meta=take_meta)
        summary["settings"] += [f"got {k}" for k in take]
    if give:
        sess.post(base + "/api/peer/settings", headers=h, json={"values": give, "meta": give_meta}, timeout=15)
        summary["settings"] += [f"sent {k}" for k in give]

    # files
    if config.get("sync_files"):
        cap = int(config.get("sync_max_mb") or 200) * 1024 * 1024
        rem = sess.get(base + "/api/peer/files", headers=h, timeout=120).json()
        rfiles = {f["sha"]: f for f in rem.get("files", [])}
        rdel = rem.get("deleted", {})
        lfiles = {f["sha"]: f for f in files.manifest()}
        ldel = files.tombstones()
        # deleted over there → remove here
        for sha, at in rdel.items():
            if sha in lfiles and (lfiles[sha]["created_at"] or "") < at:
                summary["removed_here"] += files.remove_synced(sha, at)
                lfiles.pop(sha, None)
        # deleted here → remove there
        push = {sha: at for sha, at in ldel.items()
                if sha in rfiles and sha not in lfiles and (rfiles[sha]["created_at"] or "") < at}
        if push:
            r = sess.post(base + "/api/peer/files/deleted", headers=h, json={"items": push}, timeout=60).json()
            summary["removed_there"] += r.get("removed", 0)
            for sha in push:
                rfiles.pop(sha, None)
        down = [f for sha, f in rfiles.items() if sha not in lfiles
                and not (sha in ldel and ldel[sha] >= (f["created_at"] or ""))]
        up = [f for sha, f in lfiles.items() if sha not in rfiles
              and not (sha in rdel and rdel[sha] >= (f["created_at"] or ""))]
        todo = [("down", f) for f in down] + [("up", f) for f in up]
        TMP.mkdir(parents=True, exist_ok=True)
        for k, (way, f) in enumerate(todo):
            if (f.get("size") or 0) > cap:
                summary["skipped_big"] += 1
                continue
            if job:
                job.step(k, len(todo), f"{'⬇' if way == 'down' else '⬆'} {f['name']}")
            try:
                if way == "down":
                    with sess.get(f"{base}/api/peer/files/{f['sha']}", headers=h, stream=True, timeout=60) as r:
                        r.raise_for_status()
                        fd, tmp = tempfile.mkstemp(dir=TMP, suffix=".part")
                        with os.fdopen(fd, "wb") as out:
                            for chunk in r.iter_content(1024 * 1024):
                                out.write(chunk)
                    if files.file_sha(Path(tmp)) != f["sha"]:
                        Path(tmp).unlink(missing_ok=True)
                        raise RuntimeError("damaged in transfer")
                    if files.add_synced(Path(tmp), f):
                        summary["down"] += 1
                else:
                    from ..core.db import get_db
                    conn = get_db()
                    row = conn.execute("SELECT path FROM files WHERE id=?", (f["id"],)).fetchone()
                    conn.close()
                    if not row or not Path(row[0]).exists():
                        continue
                    with open(row[0], "rb") as fh:
                        r = sess.post(base + "/api/peer/files", headers=h, timeout=600,
                                      data={"meta": json.dumps(f)}, files={"file": (f["name"], fh)})
                    r.raise_for_status()
                    summary["up"] += 1
            except Exception as e:
                _log(f"couldn't sync {f['name']}: {str(e)[:80]}")
        if summary["down"] or summary["removed_here"]:
            files_changed()
    _save_peer(peer["id"], last_sync=_now())
    parts = [f"{summary['down']} received", f"{summary['up']} sent"]
    if summary["removed_here"] or summary["removed_there"]:
        parts.append(f"{summary['removed_here'] + summary['removed_there']} removed")
    if summary["skipped_big"]:
        parts.append(f"{summary['skipped_big']} too big")
    if summary["settings"]:
        parts.append("settings updated")
    _log(f"{info.get('name') or 'peer'}: " + ", ".join(parts))
    return {"ok": True, **summary}


def files_changed():
    pass   # the UI refreshes My Files when it next loads; hook kept for clarity


_sync_lock = threading.Lock()


def sync_all(job=None) -> dict:
    if not _sync_lock.acquire(blocking=False):
        return {"busy": True}
    STATE["sync"]["running"] = True
    out = []
    try:
        for p in config.get("peers") or []:
            try:
                out.append(sync_peer(p, job))
            except Exception as e:
                log.exception("sync with %s failed", p.get("name"))
                STATE["peers"].setdefault(p["id"], {})["error"] = f"Sync failed: {str(e)[:100]}"
                _log(f"{p.get('name')}: sync failed ({str(e)[:60]})")
    finally:
        STATE["sync"].update(running=False, last=_now())
        _sync_lock.release()
    return {"results": out}


def _loop():
    time.sleep(20)
    while True:
        if config.get("peers"):
            try:
                sync_all()
            except Exception:
                log.exception("sync loop")
        time.sleep(600)


def init(background=True):
    me()
    _adopt_pairing_file()
    if background:
        threading.Thread(target=_loop, daemon=True, name="device-sync").start()


@router.post("/api/devices/sync")
def r_sync():
    if not config.get("peers"):
        raise HTTPException(400, "No devices paired yet")
    return jobs.start("sync", lambda job: {"files": [], **sync_all(job)})


class PairWithReq(BaseModel):
    address: str
    pin: str


@router.post("/api/devices/pair")
def pair_with(r: PairWithReq):
    base = _base(r.address)
    if not base:
        raise HTTPException(400, "Type the other Toolbit's address")
    m = me()
    try:
        res = _http().post(base + "/api/peer/pair", json={"pin": r.pin, "id": m["id"], "name": m["name"]}, timeout=10)
    except Exception:
        raise HTTPException(502, f"Couldn't reach {base}. Is Toolbit open there, with 'Other devices' on and Tailscale running?")
    if res.status_code != 200:
        try:
            raise HTTPException(res.status_code, res.json().get("detail", "Pairing failed"))
        except ValueError:
            raise HTTPException(502, "That address isn't a Toolbit")
    d = res.json()
    if d.get("id") == m["id"]:
        raise HTTPException(400, "That's this device")
    peers = [p for p in config.get("peers") or [] if p["id"] != d["id"]]
    peers.append({"id": d["id"], "name": d.get("name", "Toolbit"), "token": d["token"], "version": d.get("version", ""),
                  "urls": list(dict.fromkeys([base] + [_base(u) for u in d.get("urls") or []]))[:6],
                  "last_ok": _now(), "last_sync": ""})
    config.save_settings({"peers": peers})
    history.log("Paired with", d.get("name", base))
    threading.Thread(target=sync_all, daemon=True).start()
    return {"ok": True, "name": d.get("name")}


def _adopt_pairing_file():
    """The installer carries a pairing.json from the PC that built it: use it once."""
    pf = APP_DIR / "pairing.json"
    if not pf.exists():
        return
    try:
        d = json.loads(pf.read_text(encoding="utf-8"))
        host = d["host"]
        if host["id"] != me()["id"]:
            peers = [p for p in config.get("peers") or [] if p["id"] != host["id"]]
            peers.append({"id": host["id"], "name": host.get("name", "PC"), "token": d["token"],
                          "urls": [_base(u) for u in host.get("urls") or []], "version": host.get("version", ""),
                          "last_ok": "", "last_sync": ""})
            config.save_settings({"peers": peers})
            log.info("paired with %s from the installer", host.get("name"))
        os.replace(pf, APP_DIR / "pairing.used.json")
    except Exception:
        log.exception("pairing file")


# ---------------- update from the PC ----------------
@router.post("/api/devices/update")
def update_from_peer():
    u = STATE["update"]
    if not u:
        raise HTTPException(400, "No update waiting")
    peer = next((p for p in config.get("peers") or [] if p["id"] == u["peer"]), None)
    if not peer:
        raise HTTPException(400, "That device isn't paired any more")
    sess = _http()
    base, info = _reach(peer, sess)
    if not base:
        raise HTTPException(502, f"Can't reach {peer.get('name')} right now")
    TMP.mkdir(parents=True, exist_ok=True)
    zp = TMP / "update.zip"
    with sess.get(base + "/api/peer/app.zip", headers=_headers(peer), stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(zp, "wb") as out:
            for chunk in r.iter_content(1024 * 1024):
                out.write(chunk)
    ver = apply_update(zp)
    zp.unlink(missing_ok=True)
    history.log(f"Updated from {peer.get('name')}", f"{config.VERSION} → {ver}")
    return {"ok": True, "version": ver}


def apply_update(zp: Path) -> str:
    with zipfile.ZipFile(zp) as z:
        names = z.namelist()
        if "launcher.py" not in names or "server/core/config.py" not in names:
            raise HTTPException(400, "That update package is incomplete")
        mt = re.search(r'VERSION = "([^"]+)"', z.read("server/core/config.py").decode("utf-8", "replace"))
        ver = mt.group(1) if mt else "?"
        bdir = APP_DIR / f"backup-v{config.VERSION}"
        for n in names:
            if n.endswith("/"):
                continue
            dest = (APP_DIR / n).resolve()
            if APP_DIR not in dest.parents:
                continue                                  # never write outside the app folder
            data = z.read(n)
            if dest.exists():
                if dest.read_bytes() == data:
                    continue
                b = bdir / n
                if not b.exists():
                    b.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(dest, b)
            dest.parent.mkdir(parents=True, exist_ok=True)
            tmp = dest.with_name(dest.name + ".new")
            tmp.write_bytes(data)
            try:
                os.replace(tmp, dest)
            except PermissionError:                      # Windows: move the busy file aside, then put the new one in
                aside = dest.with_name(dest.name + ".old")
                aside.unlink(missing_ok=True)
                os.replace(dest, aside)
                os.replace(tmp, dest)
    return ver


# ---------------- installer for the laptop ----------------
INSTALL_PS1 = r'''$ErrorActionPreference = "Stop"
$src = Split-Path -Parent $MyInvocation.MyCommand.Path
$dst = Join-Path $env:LOCALAPPDATA "Programs\Toolbit"
Write-Host "Installing Toolbit to $dst ..."
Get-CimInstance Win32_Process -Filter "Name='pythonw.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*Programs\Toolbit\app\launcher.py*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
foreach ($part in "python", "app") {
  robocopy (Join-Path $src $part) (Join-Path $dst $part) /E /NFL /NDL /NJH /NJS /NP /R:2 /W:1 | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "Copying $part failed (robocopy $LASTEXITCODE)" }
}
Copy-Item (Join-Path $src "uninstall.bat") (Join-Path $dst "uninstall.bat") -Force
$pyw = Join-Path $dst "python\pythonw.exe"
$launcher = Join-Path $dst "app\launcher.py"
$icon = Join-Path $dst "app\icon.ico"
$ws = New-Object -ComObject WScript.Shell
$places = @([Environment]::GetFolderPath("Desktop"), (Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"))
foreach ($dir in $places) {
  $s = $ws.CreateShortcut((Join-Path $dir "Toolbit.lnk"))
  $s.TargetPath = $pyw; $s.Arguments = "`"$launcher`""; $s.WorkingDirectory = (Join-Path $dst "app")
  $s.IconLocation = "$icon,0"; $s.Description = "Toolbit"
  if ($dir -like "*Desktop*") { $s.Hotkey = "CTRL+ALT+T" }
  $s.Save()
}
Write-Host "Done. Starting Toolbit..."
Start-Process $pyw "`"$launcher`"" -WorkingDirectory (Join-Path $dst "app")
'''

INSTALL_BAT = ('@echo off\r\ntitle Install Toolbit\r\necho Installing Toolbit (takes a minute)...\r\n'
               'powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1"\r\n'
               'if errorlevel 1 (echo. & echo Something went wrong. Send Claude a screenshot of this window. & pause & exit /b 1)\r\n'
               'echo. & echo Toolbit is installed. You can close this window and delete the setup folder.\r\n'
               'timeout /t 8 >nul\r\n')

UNINSTALL_BAT = ('@echo off\r\ntitle Uninstall Toolbit\r\necho This removes Toolbit from this computer (your files in Documents stay).\r\npause\r\n'
                 'powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name=\'pythonw.exe\'\\" | '
                 'Where-Object { $_.CommandLine -like \'*Programs\\Toolbit\\app*\' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"\r\n'
                 'del "%USERPROFILE%\\Desktop\\Toolbit.lnk" 2>nul\r\ndel "%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\Toolbit.lnk" 2>nul\r\n'
                 'cd /d "%TEMP%" & (rmdir /s /q "%LOCALAPPDATA%\\Programs\\Toolbit" & echo Removed. Settings stay in '
                 '%APPDATA%\\DataAssistant ^(delete that folder too to remove email passwords^). & pause)\r\n')

README = ("Toolbit setup\r\n=============\r\n\r\n1. Right-click this zip > Extract All (or open it and drag the Toolbit folder to the Desktop).\r\n"
          "2. In the extracted folder, double-click install.bat.\r\n3. Toolbit opens and pairs with your PC by itself.\r\n\r\n"
          "To remove it later: run uninstall.bat in %LOCALAPPDATA%\\Programs\\Toolbit.\r\n\r\n"
          "Updates: when your PC gets a newer Toolbit, this one shows an 'Update' button.\r\n"
          "Sync needs Tailscale running on both (or both on the same Wi-Fi).\r\n")


def _python_dir() -> Path:
    env = os.environ.get("TOOLBIT_PY_DIR")
    if env:
        return Path(env)
    return ROOT / "python" if (ROOT / "python").exists() else Path(sys.executable).parent


def _setup_info():
    z = sorted(TMP.glob("Toolbit-Setup-*.zip")) if TMP.exists() else []
    if not z:
        return None
    p = z[-1]
    return {"name": p.name, "size": p.stat().st_size, "built": datetime.fromtimestamp(p.stat().st_mtime).isoformat(timespec="minutes")}


def build_setup(job):
    TMP.mkdir(parents=True, exist_ok=True)
    for old in TMP.glob("Toolbit-Setup-*"):
        old.unlink(missing_ok=True)
    out = TMP / f"Toolbit-Setup-{config.VERSION}.zip"
    part = out.with_suffix(".part")
    py = _python_dir()
    members = [(p, "Toolbit/python/" + p.relative_to(py).as_posix()) for p in py.rglob("*")
               if p.is_file() and "__pycache__" not in p.parts]
    members += [(p, "Toolbit/app/" + rel) for p, rel in app_members()]
    toks = [x for x in config.get("peer_tokens") or [] if not (x.get("name", "").startswith("New device") and not x.get("seen"))]
    config.save_settings({"peer_tokens": toks})       # an older installer that was never used stops working
    tok = issue_token("New device (from installer)")
    m = me()
    pairing = {"host": {**m, "urls": [u["url"] for u in my_urls()]}, "token": tok}
    total = len(members)
    with zipfile.ZipFile(part, "w", zipfile.ZIP_DEFLATED, compresslevel=5) as z:
        for k, (p, arc) in enumerate(members):
            if job.cancelled:
                break
            if k % 40 == 0:
                job.step(k, total, f"Packing {k}/{total} files…")
            z.write(p, arc)
        z.writestr("Toolbit/app/pairing.json", json.dumps(pairing, indent=2))
        z.writestr("Toolbit/install.ps1", INSTALL_PS1.replace("\n", "\r\n"))
        z.writestr("Toolbit/install.bat", INSTALL_BAT)
        z.writestr("Toolbit/uninstall.bat", UNINSTALL_BAT)
        z.writestr("Toolbit/READ ME.txt", README)
    if job.cancelled:
        part.unlink(missing_ok=True)
        raise HTTPException(400, "Stopped")
    os.replace(part, out)
    job.step(total, total, "Done")
    history.log("Installer made", f"{out.name} ({out.stat().st_size // (1024 * 1024)} MB)")
    return {"files": [], "setup": _setup_info()}


@router.post("/api/devices/setup")
def r_build_setup():
    return jobs.start("setup", build_setup)


@router.get("/api/devices/setup.zip")
def r_setup_zip():
    info = _setup_info()
    if not info:
        raise HTTPException(404, "Make the installer first")
    return FileResponse(TMP / info["name"], filename=info["name"], media_type="application/zip")


@router.post("/api/devices/setup/reveal")
def r_setup_reveal():
    info = _setup_info()
    if not info:
        raise HTTPException(404, "Make the installer first")
    p = TMP / info["name"]
    if sys.platform == "win32":
        subprocess.Popen(["explorer", "/select,", str(p)])
    return {"ok": True}
