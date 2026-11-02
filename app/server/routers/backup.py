"""Backup to a USB stick or any folder. No cloud. Incremental: only new or changed files are copied."""
import json
import os
import shutil
import sqlite3
import sys
import threading
import time
import zipfile
from datetime import datetime, timedelta
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import config, history

router = APIRouter(prefix="/api/backup", tags=["backup"])
STATE = {"running": False, "phase": "", "copied": 0, "checked": 0, "bytes": 0, "error": "", "finished": ""}
_lock = threading.Lock()
KEEP_SNAPSHOTS = 10
SECRET_KEYS = ("anthropic_api_key", "airtable_token", "email_app_password", "email_accounts", "remote_pin",
               "remote_sessions", "peer_tokens", "peers")


def drives():
    out = []
    if sys.platform == "win32":
        import ctypes
        k = ctypes.windll.kernel32
        mask = k.GetLogicalDrives()
        for i in range(26):
            if not mask & (1 << i):
                continue
            root = f"{chr(65 + i)}:\\"
            kind = k.GetDriveTypeW(root)   # 2 removable, 3 fixed, 4 network
            if kind not in (2, 3, 4):
                continue
            label = ctypes.create_unicode_buffer(261)
            fs = ctypes.create_unicode_buffer(261)
            ok = k.GetVolumeInformationW(root, label, 261, None, None, None, fs, 261)
            if not ok:
                continue
            try:
                u = shutil.disk_usage(root)
            except Exception:
                continue
            name = label.value or ("USB drive" if kind == 2 else "Local disk")
            cloud = _is_cloud(name, fs.value)
            out.append({"path": root, "label": name + (" (cloud)" if cloud else ""), "removable": kind == 2,
                        "cloud": cloud, "system": root.upper() == os.environ.get("SystemDrive", "C:").upper() + "\\",
                        "free": u.free, "total": u.total})
    else:
        for base in ("/media", "/mnt", "/run/media"):
            for p in Path(base).glob("*/*") if base != "/mnt" else Path(base).glob("*"):
                try:
                    if p.is_dir() and os.path.ismount(p):
                        u = shutil.disk_usage(p)
                        out.append({"path": str(p), "label": p.name, "removable": True, "free": u.free, "total": u.total})
                except Exception:
                    pass
    return out


CLOUD_WORDS = ("google drive", "onedrive", "dropbox", "icloud", "mega", "box drive", "pcloud")


def _is_cloud(label: str, fs: str = "") -> bool:
    l = (label or "").lower()
    return any(w in l for w in CLOUD_WORDS) or (fs and fs.upper() not in ("NTFS", "FAT32", "EXFAT", "FAT", "REFS", "UDF"))


def check_target(target: str) -> str:
    """'' if we can back up there, else a plain-language reason."""
    if not target or not Path(target).exists():
        return "The backup drive isn't plugged in (or the folder is gone). Plug in the USB stick or pick another folder."
    d = next((x for x in drives() if x["path"].upper() == str(Path(target).anchor).upper()), None)
    if d and d.get("cloud"):
        return (f"{d['path']} is a cloud drive ({d['label']}), not a USB stick. Pick your USB stick, or a normal "
                "folder, so your backup stays offline.")
    try:
        root = _target_root(target)
        root.mkdir(parents=True, exist_ok=True)
        probe = root / ".write-test"
        probe.write_text("ok", encoding="utf-8")
        probe.unlink()
    except Exception:
        return (f"Can't write to {target}. It may be read-only, protected, or a cloud drive (Google Drive shows up "
                "as G:). Pick your USB stick or another folder.")
    return ""


_PROBLEM = {"t": 0.0, "target": None, "msg": ""}


def _cached_problem(target: str) -> str:
    """The Backup page polls status while a backup runs; don't test-write the drive every time."""
    if _PROBLEM["target"] != target or time.time() - _PROBLEM["t"] > 30:
        _PROBLEM.update(t=time.time(), target=target, msg=check_target(target))
    return _PROBLEM["msg"]


def _target_root(target: str) -> Path:
    t = Path(target)
    return t if t.name == "Data Assistant Backup" else t / "Data Assistant Backup"


def _mirror(src: Path, dst: Path):
    for root, dirs, fnames in os.walk(src):
        rel = Path(root).relative_to(src)
        (dst / rel).mkdir(parents=True, exist_ok=True)
        for n in fnames:
            s = Path(root) / n
            d = dst / rel / n
            STATE["checked"] += 1
            try:
                st = s.stat()
                if d.exists():
                    ds = d.stat()
                    if ds.st_size == st.st_size and int(ds.st_mtime) >= int(st.st_mtime):
                        continue
                shutil.copy2(s, d)
                STATE["copied"] += 1
                STATE["bytes"] += st.st_size
            except Exception:
                continue


def _snapshot(dst: Path):
    snaps = dst / "App snapshots"
    snaps.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d %H-%M")
    tmp_db = snaps / f".{stamp}.db"
    src = sqlite3.connect(config.DB_PATH)
    dstc = sqlite3.connect(tmp_db)
    src.backup(dstc)                       # consistent copy even while the app is running
    dstc.close(); src.close()
    s = config.load_settings()
    for k in SECRET_KEYS:
        if s.get(k):
            s[k] = ""                       # keys stay on this PC only
    with zipfile.ZipFile(snaps / f"{stamp}.zip", "w", zipfile.ZIP_DEFLATED) as z:
        z.write(tmp_db, "assistant.db")
        z.writestr("settings.json", json.dumps(s, indent=2))
    tmp_db.unlink(missing_ok=True)
    old = sorted(snaps.glob("*.zip"))
    for f in old[:-KEEP_SNAPSHOTS]:
        f.unlink(missing_ok=True)


README = """Toolbit backup (made by Toolbit, formerly Data Assistant)
=====================
Files\\           = a copy of Documents\\Data Assistant (everything you created, sorted by category).
Uploads\\         = the files you added to the app (only if "include uploaded files" is on).
App snapshots\\   = the app's library (saved analyses, chats, calendar, workouts, file list, history) by date.
                   API keys are NOT included; add them again in Settings after a restore.

Restore:
- Your files: copy Files\\ back to Documents\\Data Assistant.
- The app library: close Toolbit, unzip the newest snapshot, and put assistant.db into
  %APPDATA%\\DataAssistant (replace the old one). Then start the app.

Nothing is ever deleted from this backup automatically, except old snapshots (the newest 10 are kept).
"""


def run_backup(target: str):
    with _lock:
        if STATE["running"]:
            return False
        STATE.update(running=True, phase="Starting", copied=0, checked=0, bytes=0, error="", finished="")
    t0 = time.time()
    try:
        problem = check_target(target)
        if problem:
            raise RuntimeError(problem)
        dst = _target_root(target)
        dst.mkdir(parents=True, exist_ok=True)
        (dst / "README.txt").write_text(README, encoding="utf-8")
        STATE["phase"] = "Copying your files"
        _mirror(config.output_dir(), dst / "Files")
        if config.get("backup_uploads"):
            STATE["phase"] = "Copying uploaded files"
            _mirror(config.WORKSPACE_DIR, dst / "Uploads")
        STATE["phase"] = "Saving app library"
        _snapshot(dst)
        when = datetime.now().isoformat(timespec="seconds")
        config.save_settings({"last_backup": when})
        mb = STATE["bytes"] / 1e6
        history.log("Backup finished", f"{STATE['copied']} new/changed files ({mb:.1f} MB) to {dst} in {time.time() - t0:.0f} s")
        STATE["finished"] = when
        STATE["failed_at"] = 0
    except Exception as e:
        STATE["error"] = str(e)
        if STATE.get("last_error_logged") != str(e):     # don't fill History with the same failure
            history.log("Backup failed", str(e))
            STATE["last_error_logged"] = str(e)
        STATE["failed_at"] = time.time()
    finally:
        STATE["running"] = False
        STATE["phase"] = ""
    return True


def auto_loop():
    """Runs in the background: backs up once a day when the backup drive/folder is reachable."""
    time.sleep(60)
    while True:
        try:
            s = config.load_settings()
            target = s.get("backup_dir")
            if s.get("backup_auto") and target and Path(target).exists() and not STATE["running"]:
                last = s.get("last_backup")
                recently_failed = time.time() - STATE.get("failed_at", 0) < 6 * 3600   # retry a failure every 6 h
                if (not last or datetime.now() - datetime.fromisoformat(last) > timedelta(hours=20)) and not recently_failed:
                    run_backup(target)
        except Exception:
            pass
        time.sleep(300)


def start_auto():
    threading.Thread(target=auto_loop, daemon=True, name="auto-backup").start()


@router.get("/status")
def status():
    s = config.load_settings()
    target = s.get("backup_dir") or ""
    return {"state": STATE, "backup_dir": target, "available": bool(target) and Path(target).exists(),
            "problem": _cached_problem(target) if target else "",
            "backup_auto": bool(s.get("backup_auto")), "backup_uploads": bool(s.get("backup_uploads")),
            "last_backup": s.get("last_backup") or "", "drives": drives(),
            "library_size": _size(config.output_dir()), "uploads_size": _size(config.WORKSPACE_DIR)}


def _size(p: Path):
    total = 0
    for root, _, fs in os.walk(p):
        for n in fs:
            try:
                total += (Path(root) / n).stat().st_size
            except Exception:
                pass
    return total


class BackupSettings(BaseModel):
    backup_dir: str | None = None
    backup_auto: bool | None = None
    backup_uploads: bool | None = None


@router.post("/settings")
def save(r: BackupSettings):
    upd = {k: v for k, v in r.model_dump().items() if v is not None}
    if "backup_dir" in upd:
        upd["backup_dir"] = upd["backup_dir"].strip().strip('"')
        if upd["backup_dir"]:
            problem = check_target(upd["backup_dir"])
            if problem:
                raise HTTPException(400, problem)
    config.save_settings(upd)
    if "backup_dir" in upd:
        history.log("Backup location set", upd["backup_dir"] or "none")
    return status()


@router.post("/run")
def run():
    target = config.get("backup_dir")
    if not target:
        raise HTTPException(400, "Choose where to back up first")
    if STATE["running"]:
        return {"started": False, "state": STATE}
    problem = check_target(target)
    if problem:
        raise HTTPException(400, problem)
    threading.Thread(target=run_backup, args=(target,), daemon=True).start()
    time.sleep(0.2)
    return {"started": True, "state": STATE}


@router.post("/open")
def open_backup():
    from .files import _open
    target = config.get("backup_dir")
    problem = check_target(target) if target else "Choose where to back up first"
    if problem:
        raise HTTPException(400, problem)
    _open(str(_target_root(target)))
    return {"ok": True}
