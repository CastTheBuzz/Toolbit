"""Paths and settings for Toolbit (formerly Data Assistant; folders keep the old name)."""
import json
import os
import sys
import threading
from pathlib import Path

APP_NAME = "Toolbit"
VERSION = "3.3.1"

if sys.platform == "win32":
    _base = Path(os.environ.get("APPDATA", Path.home() / "AppData" / "Roaming"))
else:
    _base = Path(os.environ.get("XDG_DATA_HOME", Path.home() / ".local" / "share"))

DATA_DIR = Path(os.environ.get("DA_DATA_DIR", _base / "DataAssistant"))
WORKSPACE_DIR = DATA_DIR / "workspace"      # uploaded files
MODELS_DIR = DATA_DIR / "models"            # whisper models
LOG_DIR = DATA_DIR / "logs"
DB_PATH = DATA_DIR / "assistant.db"
SETTINGS_PATH = DATA_DIR / "settings.json"

# older installs keep "Documents\Data Assistant"; new ones (e.g. the laptop) use "Documents\Toolbit"
_OLD_OUT = Path.home() / "Documents" / "Data Assistant"
DEFAULT_OUTPUT_DIR = _OLD_OUT if _OLD_OUT.exists() else Path.home() / "Documents" / "Toolbit"

for d in (DATA_DIR, WORKSPACE_DIR, MODELS_DIR, LOG_DIR):
    d.mkdir(parents=True, exist_ok=True)

DEFAULTS = {
    "anthropic_api_key": "",
    "model": "claude-sonnet-5-5",
    "airtable_token": "",
    "output_dir": str(DEFAULT_OUTPUT_DIR),
    "whisper_model": "small",
    "voice_model": "base",
    "equipment": "none",           # workouts: none (bodyweight) / dumbbells
    "backup_dir": "",
    "backup_auto": True,
    "backup_uploads": False,
    "last_backup": "",
    "reminders": True,
    "reminder_minutes": 10,
    "daily_summary": True,
    "background": True,            # keep running after the window closes (reminders, auto-backup)
    "effort": "",                  # "" = model default, or low/medium/high/xhigh/max
    "web_search": True,            # Assistant may search the web ($10 per 1,000 searches)
    "location": {"city": "London", "country": "GB", "timezone": "Europe/London"},
    "hotkey": False,
    "email_address": "",           # (before 3.3: single account; moved into email_accounts on first use)
    "email_app_password": "",
    "email_accounts": [],          # [{address, app_password}] Gmail app passwords; never in backups
    "email_active": "",
    # 3.3 other devices: phone/laptop use this Toolbit over Tailscale or home Wi-Fi
    "device_id": "",
    "device_name": "",
    "remote_access": False,        # listen on the network (PIN required for anything not on this PC)
    "remote_pin": "",              # salted hash
    "remote_sessions": [],         # [{h, at, ua}] signed-in browsers (hashed tokens)
    "peer_tokens": [],             # [{h, name, id, at}] devices allowed to sync with this one
    "peers": [],                   # [{id, name, urls, token, last_ok, last_sync, version}] devices this one syncs with
    "sync_files": True,
    "sync_max_mb": 200,
    "settings_meta": {},           # key -> ISO time it last changed (sync: newest wins)
    "news_feeds": [
        {"name": "BBC World", "url": "https://feeds.bbci.co.uk/news/world/rss.xml"},
        {"name": "BBC Tech", "url": "https://feeds.bbci.co.uk/news/technology/rss.xml"},
        {"name": "Hacker News", "url": "https://hnrss.org/frontpage"},
        {"name": "The Verge", "url": "https://www.theverge.com/rss/index.xml"},
    ],
    "profile": "",
}

_lock = threading.Lock()


def load_settings() -> dict:
    s = dict(DEFAULTS)
    if SETTINGS_PATH.exists():
        try:
            s.update(json.loads(SETTINGS_PATH.read_text(encoding="utf-8")))
        except Exception:
            pass
    return s


SYNC_KEYS = ("email_accounts", "news_feeds", "location")   # shared between paired devices


def save_settings(updates: dict, meta: dict | None = None) -> dict:
    """meta: change times to store for synced keys (default: now). Sync passes the other device's times."""
    from datetime import datetime
    with _lock:
        s = load_settings()
        stamps = dict(s.get("settings_meta") or {})
        for k, v in updates.items():
            if k in DEFAULTS and v is not None:
                if k in SYNC_KEYS and s.get(k) != v:
                    stamps[k] = (meta or {}).get(k) or datetime.now().astimezone().isoformat(timespec="seconds")
                s[k] = v
        s["settings_meta"] = stamps
        tmp = SETTINGS_PATH.with_suffix(".tmp")
        tmp.write_text(json.dumps(s, indent=2), encoding="utf-8")
        os.replace(tmp, SETTINGS_PATH)
    return s


def get(key: str):
    return load_settings().get(key, DEFAULTS.get(key))


def output_dir() -> Path:
    p = Path(get("output_dir") or DEFAULT_OUTPUT_DIR)
    p.mkdir(parents=True, exist_ok=True)
    return p


def import_legacy():
    """First run: pull the API key and saved analyses from the old data-assistant project."""
    legacy = Path.home() / "Desktop" / "Projects" / "Paused" / "data-assistant" / "backend"
    flag = DATA_DIR / ".legacy_imported"
    if flag.exists() or not legacy.exists():
        return None
    result = {}
    env = legacy / ".env"
    if env.exists() and not get("anthropic_api_key"):
        for line in env.read_text(encoding="utf-8", errors="ignore").splitlines():
            if "=" in line and line.split("=", 1)[0].strip() == "ANTHROPIC_API_KEY":
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
                if key:
                    save_settings({"anthropic_api_key": key})
                    result["api_key"] = True
    old_db = legacy / "assistant.db"
    if old_db.exists():
        result["old_db"] = str(old_db)
    flag.write_text("done")
    return result
