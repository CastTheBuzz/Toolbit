"""Toolbit launcher: starts the local server and opens the app window."""
import json
import logging
import os
import socket
import subprocess
import sys
import threading
import time
import urllib.request
import webbrowser
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from server.core import config  # noqa: E402

LOG_FILE = config.LOG_DIR / "app.log"
# pythonw has no console: send everything to the log file
_fh = None
if sys.stdout is None or sys.stderr is None or "--log-to-file" in sys.argv:
    _fh = open(LOG_FILE, "a", encoding="utf-8", buffering=1)
    sys.stdout = sys.stdout or _fh
    sys.stderr = sys.stderr or _fh
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s",
                    handlers=[logging.FileHandler(LOG_FILE, encoding="utf-8")]
                    + ([] if sys.stderr is _fh else [logging.StreamHandler(sys.stderr)]))   # no double lines
log = logging.getLogger("launcher")

PREFERRED_PORT = 47615
HOST = "0.0.0.0" if config.get("remote_access") else "127.0.0.1"   # 3.3: phone/laptop can reach it (PIN)
INSTANCE = config.DATA_DIR / "instance.json"
HEARTBEAT = {"last": 0.0}


def healthy(port, timeout=1.0):
    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/api/health", timeout=timeout) as r:
            return json.loads(r.read()).get("ok") is True
    except Exception:
        return False


def _sock():
    s = socket.socket()
    if sys.platform != "win32":   # Linux keeps closed ports in TIME_WAIT; uvicorn reuses them the same way
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    return s


def free_port():
    for port in [PREFERRED_PORT] + [0]:
        s = _sock()
        try:
            s.bind((HOST, port))
            p = s.getsockname()[1]
            s.close()
            return p
        except OSError:
            s.close()
    raise RuntimeError("no free port")


def find_browser():
    if sys.platform != "win32":
        return None
    cands = []
    for env in ("PROGRAMFILES(X86)", "PROGRAMFILES", "LOCALAPPDATA"):
        base = os.environ.get(env)
        if base:
            cands += [Path(base) / "Microsoft/Edge/Application/msedge.exe",
                      Path(base) / "Google/Chrome/Application/chrome.exe"]
    for c in cands:
        if c.exists():
            return str(c)
    return None


def open_window(url):
    """Open as an app window. Returns the browser process if we own it, else None."""
    exe = find_browser()
    if exe:
        profile = config.DATA_DIR / "window-profile"
        args = [exe, f"--app={url}", f"--user-data-dir={profile}", "--no-first-run",
                "--no-default-browser-check", "--disable-features=Translate", "--window-size=1360,880"]
        try:
            return subprocess.Popen(args, creationflags=0x08000000 if sys.platform == "win32" else 0)
        except Exception:
            log.exception("browser launch failed")
    webbrowser.open(url)
    return None


def main():
    restarted = "--restarted" in sys.argv
    if restarted:
        # started by "Restart" in the app: wait for the old copy to stop, then take over (the window is already open)
        for _ in range(300):
            try:
                old = json.loads(INSTANCE.read_text())["port"]
            except Exception:
                break
            if not healthy(old, 0.3):
                break
            time.sleep(0.1)
        for _ in range(50):                 # wait for the port to be released so the window can reconnect
            s = _sock()
            try:
                s.bind((HOST, PREFERRED_PORT))
                s.close()
                break
            except OSError:
                s.close()
                time.sleep(0.1)
    # Single instance: if already running just show the window
    if INSTANCE.exists() and not restarted:
        try:
            port = json.loads(INSTANCE.read_text())["port"]
            if healthy(port):
                open_window(f"http://127.0.0.1:{port}/")
                return
        except Exception:
            pass

    t0 = time.time()
    port = free_port()
    url = f"http://127.0.0.1:{port}/"
    want_window = "--no-window" not in sys.argv and not restarted
    started = time.time()
    proc = None
    if want_window:
        # show the window right away with a loading screen; it switches to the app as soon as it's up
        splash = HERE / "web" / "splash.html"
        from urllib.parse import quote
        proc = open_window(f"{splash.as_uri()}?to={quote(url, safe='')}" if splash.exists() else url)

    os.environ["TOOLBIT_PORT"] = str(port)          # so Devices shows the real address
    import uvicorn
    from server.main import create_app
    from server.routers import system

    app = create_app()

    @app.post("/api/heartbeat", include_in_schema=False)
    def heartbeat():
        HEARTBEAT["last"] = time.time()
        return {"ok": True}

    server = uvicorn.Server(uvicorn.Config(app, host=HOST, port=port, log_config=None,
                                           log_level="warning", timeout_keep_alive=30))
    system.shutdown_hook["fn"] = lambda: setattr(server, "should_exit", True)
    t = threading.Thread(target=server.run, daemon=True)
    t.start()
    for _ in range(300):
        if healthy(port, 0.5):
            break
        time.sleep(0.05)
    INSTANCE.write_text(json.dumps({"port": port, "pid": os.getpid()}))
    log.info("%s %s running on %s (ready in %.1f s)", config.APP_NAME, config.VERSION, url, time.time() - t0)

    if not want_window and not restarted:
        t.join()
        return

    if proc is not None:
        proc.wait()
        if time.time() - started > 8:
            if config.get("background") or config.get("remote_access"):
                log.info("window closed, staying in the background (auto-backup). Quit in the app stops it.")
                t.join()
                _cleanup()
                return
            log.info("window closed, shutting down")
            server.should_exit = True
            t.join(timeout=5)
            _cleanup()
            return
        log.info("browser handed off to existing process; using heartbeat mode")
    elif restarted:
        log.info("restarted; the open window reconnects (heartbeat mode)")
    # Heartbeat mode: stop when the page hasn't pinged for 3 minutes (unless background mode is on)
    while t.is_alive():
        time.sleep(5)
        last = HEARTBEAT["last"]
        if last and time.time() - last > 180 and not (config.get("background") or config.get("remote_access")):
            log.info("no heartbeat, shutting down")
            server.should_exit = True
            break
    t.join(timeout=5)
    _cleanup()


def _cleanup():
    try:
        INSTANCE.unlink()
    except Exception:
        pass


if __name__ == "__main__":
    try:
        main()
    except Exception:
        log.exception("fatal")
        raise
    finally:
        os._exit(0)
