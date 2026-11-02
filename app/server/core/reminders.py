"""Windows notifications for calendar blocks + 'start with Windows'. Uses PowerShell's built-in toast API,
so no extra software is needed."""
import base64
import logging
import os
import subprocess
import sys
import threading
import time
from datetime import date, datetime, timedelta
from pathlib import Path
from xml.sax.saxutils import escape

from . import config
from .db import get_db

log = logging.getLogger("reminders")
APP_DIR = Path(__file__).resolve().parents[2]          # ...\app
PORT = 47615
_AUMID = r"{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe"
_NOWIN = 0x08000000 if sys.platform == "win32" else 0


def init():
    conn = get_db()
    conn.execute("CREATE TABLE IF NOT EXISTS reminders_sent (key TEXT PRIMARY KEY, ts TEXT NOT NULL)")
    conn.commit()
    conn.close()


def _ps(script: str, timeout=20):
    enc = base64.b64encode(script.encode("utf-16-le")).decode()
    return subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass",
                           "-EncodedCommand", enc], capture_output=True, text=True, timeout=timeout,
                          creationflags=_NOWIN)


def notify(title: str, body: str, page: str = "calendar") -> bool:
    if sys.platform != "win32":
        log.info("notify: %s | %s", title, body)
        return True
    xml = (f'<toast activationType="protocol" launch="http://127.0.0.1:{PORT}/#/{page}" scenario="reminder">'
           f'<visual><binding template="ToastGeneric"><text>{escape(title)}</text><text>{escape(body)}</text>'
           f'</binding></visual><actions><action content="Open" activationType="protocol" '
           f'arguments="http://127.0.0.1:{PORT}/#/{page}"/><action content="Dismiss" activationType="system" '
           f'arguments="dismiss"/></actions></toast>')
    script = ("$ErrorActionPreference='Stop';"
              "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType=WindowsRuntime] > $null;"
              "[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType=WindowsRuntime] > $null;"
              "$x = New-Object Windows.Data.Xml.Dom.XmlDocument;"
              f"$x.LoadXml(@'\n{xml}\n'@);"
              "$t = [Windows.UI.Notifications.ToastNotification]::new($x);"
              f"[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('{_AUMID}').Show($t)")
    try:
        p = _ps(script)
        if p.returncode != 0:
            log.warning("toast failed: %s", p.stderr[-300:])
        return p.returncode == 0
    except Exception as e:
        log.warning("toast failed: %s", e)
        return False


def _sent(key: str) -> bool:
    conn = get_db()
    row = conn.execute("SELECT 1 FROM reminders_sent WHERE key=?", (key,)).fetchone()
    conn.close()
    return bool(row)


def _mark(key: str):
    conn = get_db()
    conn.execute("INSERT OR IGNORE INTO reminders_sent (key, ts) VALUES (?,?)", (key, datetime.now().isoformat(timespec="seconds")))
    conn.execute("DELETE FROM reminders_sent WHERE ts < ?", ((datetime.now() - timedelta(days=30)).isoformat(),))
    conn.commit()
    conn.close()


def check_once(now: datetime | None = None):
    """Send any reminders that are due. Returns the titles sent (for tests)."""
    from ..routers.calendar import occurrences, today_summary
    now = now or datetime.now()
    s = config.load_settings()
    sent = []
    if not s.get("reminders", True):
        return sent
    lead = int(s.get("reminder_minutes") or 10)
    ds = now.date().isoformat()
    for e in occurrences(ds, ds):
        if e["done"] or not e["start"]:
            continue
        try:
            start = datetime.combine(now.date(), datetime.strptime(e["start"], "%H:%M").time())
        except ValueError:
            continue
        if start - timedelta(minutes=lead) <= now < start + timedelta(minutes=2):
            key = f"{e['id']}:{ds}"
            if not _sent(key):
                mins = max(0, round((start - now).total_seconds() / 60))
                when = "now" if mins == 0 else f"in {mins} min"
                body = f"{e['start']}" + (f"–{e['end']}" if e["end"] else "") + (f" · {e['notes']}" if e["notes"] and "[program]" not in e["notes"] else "")
                page = "calendar"
                if e["kind"] == "workout":
                    body += " · open the app for today's exercises"
                notify(f"{e['title']} {when}", body, page)
                _mark(key)
                sent.append(e["title"])
    # one morning overview (only between 07:00 and 11:00)
    if s.get("daily_summary", True) and 7 <= now.hour < 11 and not _sent(f"summary:{ds}"):
        t = today_summary(ds)
        n = len([e for e in t["events"] if e["kind"] != "workout"])
        parts = [f"{n} plan{'s' if n != 1 else ''} today"]
        if t["workout"]["due"]:
            parts.append(f"Workout {t['workout']['session']}")
        if t["yesterday_unfinished"]:
            parts.append(f"{len(t['yesterday_unfinished'])} left over from yesterday")
        first = next((e for e in t["events"] if e["start"]), None)
        notify("Good morning", " · ".join(parts) + (f". First up: {first['title']} at {first['start']}" if first else ""), "")
        _mark(f"summary:{ds}")
        sent.append("summary")
    return sent


def _loop():
    time.sleep(15)
    while True:
        try:
            check_once()
        except Exception:
            log.exception("reminder check failed")
        time.sleep(30)


def start():
    threading.Thread(target=_loop, daemon=True, name="reminders").start()


# ---------- start with Windows ----------
_STARTUP = Path(os.environ.get("APPDATA", "")) / "Microsoft/Windows/Start Menu/Programs/Startup"


def _startup_lnk() -> Path:
    return _STARTUP / "Toolbit (background).lnk"


def startup_enabled() -> bool:
    return sys.platform == "win32" and (_startup_lnk().exists() or (_STARTUP / "Data Assistant (background).lnk").exists())


def set_startup(on: bool):
    if sys.platform != "win32":
        raise RuntimeError("Only available on Windows")
    lnk = _startup_lnk()
    if not on:
        lnk.unlink(missing_ok=True)
        (_STARTUP / "Data Assistant (background).lnk").unlink(missing_ok=True)
        return False
    exe = Path(sys.executable)
    if exe.name.lower() == "python.exe" and (exe.parent / "pythonw.exe").exists():
        exe = exe.parent / "pythonw.exe"
    launcher = APP_DIR / "launcher.py"
    icon = APP_DIR / "icon.ico"
    script = ("$s = (New-Object -ComObject WScript.Shell).CreateShortcut('{lnk}');"
              "$s.TargetPath = '{exe}'; $s.Arguments = '\"{launcher}\" --no-window';"
              "$s.WorkingDirectory = '{wd}'; $s.IconLocation = '{icon}';"
              "$s.Description = 'Toolbit in the background (instant start, auto-backup)'; $s.Save()").format(
        lnk=str(lnk).replace("'", "''"), exe=str(exe).replace("'", "''"), launcher=str(launcher).replace("'", "''"),
        wd=str(APP_DIR.parent).replace("'", "''"), icon=str(icon).replace("'", "''"))
    p = _ps(script)
    if p.returncode != 0 or not lnk.exists():
        raise RuntimeError(f"Could not create the startup shortcut: {p.stderr[-200:]}")
    return True


# ---------- global keyboard shortcut (Ctrl+Alt+D on the desktop shortcut) ----------
def _desktop_lnk():
    home = Path(os.environ.get("USERPROFILE", str(Path.home())))
    for d in (home / "Desktop", home / "OneDrive" / "Desktop"):
        for name in ("Toolbit.lnk", "Data Assistant.lnk"):
            p = d / name
            if p.exists():
                return p
    return None


def migrate_shortcuts():
    """3.2 rename: 'Data Assistant' shortcuts become 'Toolbit' with the new icon (hotkey and target kept).
    Runs every start; does nothing once everything is renamed."""
    if sys.platform != "win32":
        return
    home = Path(os.environ.get("USERPROFILE", str(Path.home())))
    roam = Path(os.environ.get("APPDATA", ""))
    progs = roam / "Microsoft/Windows/Start Menu/Programs"
    pinned = roam / "Microsoft/Internet Explorer/Quick Launch/User Pinned/TaskBar"
    pairs = [(d / "Data Assistant.lnk", d / "Toolbit.lnk") for d in (home / "Desktop", home / "OneDrive" / "Desktop", progs,
                                                                    progs / "Data Assistant", pinned)]
    pairs.append((_STARTUP / "Data Assistant (background).lnk", _startup_lnk()))
    icon = str(APP_DIR / "icon.ico").replace("'", "''")
    changed = False
    for old, new in pairs:
        try:
            target = new if new.exists() else old if old.exists() else None
            if not target:
                continue
            t = str(target).replace("'", "''")
            p = _ps(f"$s=(New-Object -ComObject WScript.Shell).CreateShortcut('{t}');$c=$false;"
                    f"if($s.IconLocation -notlike '*icon.ico*'){{$s.IconLocation='{icon},0';$c=$true}};"
                    f"if($s.Hotkey -like '*Alt+D*'){{$s.Hotkey='CTRL+ALT+T';$c=$true}};"
                    f"if($s.Description -ne 'Toolbit'){{$s.Description='Toolbit';$c=$true}};if($c){{$s.Save()}}")
            if p.returncode != 0:
                log.warning("shortcut update failed for %s: %s", target, (p.stderr or "")[-200:])
            if target == old:
                for _ in range(10):             # Explorer can hold the file for a moment after saving
                    try:
                        os.replace(old, new)
                        log.info("shortcut renamed: %s -> %s", old, new.name)
                        changed = True
                        break
                    except OSError:
                        time.sleep(0.5)
                else:
                    log.warning("couldn't rename %s (in use?)", old)
        except Exception:
            log.exception("shortcut migration failed for %s", old)
    if changed:   # make Explorer redraw icons
        _ps("ie4uinit.exe -show", timeout=10)


def hotkey_enabled() -> bool:
    if sys.platform != "win32":
        return False
    lnk = _desktop_lnk()
    if not lnk:
        return False
    p = _ps(f"(New-Object -ComObject WScript.Shell).CreateShortcut('{str(lnk).replace(chr(39), chr(39) * 2)}').Hotkey")
    return "ALT" in (p.stdout or "").upper()


def set_hotkey(on: bool):
    if sys.platform != "win32":
        raise RuntimeError("Only available on Windows")
    lnk = _desktop_lnk()
    if not lnk:
        raise RuntimeError("The 'Toolbit' shortcut isn't on your Desktop, so Windows can't attach a hotkey to it.")
    key = "CTRL+ALT+T" if on else ""
    p = _ps(f"$s=(New-Object -ComObject WScript.Shell).CreateShortcut('{str(lnk).replace(chr(39), chr(39) * 2)}');"
            f"$s.Hotkey='{key}';$s.Save()")
    if p.returncode != 0:
        raise RuntimeError(f"Could not change the shortcut: {p.stderr[-200:]}")
    return on
