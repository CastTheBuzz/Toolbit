import sqlite3
from datetime import datetime

from . import config


def get_db():
    conn = sqlite3.connect(config.DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def now():
    return datetime.now().isoformat(timespec="seconds")


def init_db():
    conn = get_db()
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL, source TEXT NOT NULL, question TEXT,
        result TEXT NOT NULL, notes TEXT DEFAULT '', chart TEXT,
        created_at TEXT NOT NULL)""")
    c.execute("""CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, path TEXT NOT NULL,
        kind TEXT NOT NULL, size INTEGER, origin TEXT, created_at TEXT NOT NULL)""")
    c.execute("""CREATE TABLE IF NOT EXISTS chats (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT,
        messages TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)""")
    c.execute("""CREATE TABLE IF NOT EXISTS folders (
        name TEXT PRIMARY KEY, created_at TEXT NOT NULL)""")
    c.execute("""CREATE TABLE IF NOT EXISTS chat_folders (
        name TEXT PRIMARY KEY, created_at TEXT NOT NULL)""")
    if "folder" not in [r[1] for r in c.execute("PRAGMA table_info(chats)").fetchall()]:
        c.execute("ALTER TABLE chats ADD COLUMN folder TEXT DEFAULT ''")
    cols = [r[1] for r in c.execute("PRAGMA table_info(files)").fetchall()]
    if "folder" not in cols:
        c.execute("ALTER TABLE files ADD COLUMN folder TEXT DEFAULT ''")
    if "sha" not in cols:                      # 3.3: content hash, used to sync with other devices
        c.execute("ALTER TABLE files ADD COLUMN sha TEXT")
    c.execute("CREATE TABLE IF NOT EXISTS sync_deleted (sha TEXT PRIMARY KEY, at TEXT NOT NULL)")
    conn.commit()
    conn.close()


def import_old_analyses(old_db_path: str) -> int:
    try:
        old = sqlite3.connect(old_db_path)
        old.row_factory = sqlite3.Row
        rows = old.execute("SELECT title, source, question, result, notes, created_at FROM analyses").fetchall()
        old.close()
    except Exception:
        return 0
    conn = get_db()
    for r in rows:
        conn.execute(
            "INSERT INTO analyses (title, source, question, result, notes, created_at) VALUES (?,?,?,?,?,?)",
            (r["title"], r["source"], r["question"], r["result"], r["notes"] or "", r["created_at"]),
        )
    conn.commit()
    conn.close()
    return len(rows)
