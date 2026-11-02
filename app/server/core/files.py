"""File registry: every uploaded or produced file gets an id so tools can chain."""
import re
import shutil
import uuid
from pathlib import Path

from fastapi import HTTPException

from . import config
from .db import get_db, now

KINDS = {
    "audio": {"mp3", "wav", "flac", "aac", "ogg", "m4a", "opus", "wma", "aiff", "aif", "amr"},
    "video": {"mp4", "avi", "mov", "mkv", "webm", "flv", "wmv", "m4v", "3gp", "mpeg", "mpg", "ts"},
    "image": {"jpg", "jpeg", "png", "webp", "bmp", "gif", "tiff", "tif", "ico", "heic", "heif", "avif"},
    "pdf": {"pdf"},
    "data": {"csv", "tsv", "xlsx", "xls", "json", "jsonl", "xml", "parquet", "db", "sqlite", "sql", "pkl"},
    "document": {"docx", "txt", "md", "html", "htm", "rtf", "lrc", "srt"},
}


def ext_of(name: str) -> str:
    return Path(name).suffix.lower().lstrip(".")


def kind_of(name: str) -> str:
    e = ext_of(name)
    for k, exts in KINDS.items():
        if e in exts:
            return k
    return "other"


def safe_name(name: str) -> str:
    name = Path(name).name
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "_", name).strip(" .")
    return name or "file"


def _row(r):
    d = dict(r)
    d["exists"] = Path(d["path"]).exists()
    return d


def _insert(fid, name, path: Path, origin, folder: str = ""):
    conn = get_db()
    conn.execute(
        "INSERT INTO files (id, name, path, kind, size, origin, created_at, folder) VALUES (?,?,?,?,?,?,?,?)",
        (fid, name, str(path), kind_of(name), path.stat().st_size, origin, now(), clean_folder(folder)),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM files WHERE id=?", (fid,)).fetchone()
    conn.close()
    from . import history
    if origin == "upload":
        history.log(f"Added {name}", f"to {clean_folder(folder) or 'My Files'}")
    else:
        history.log(f"Created {name}", f"{origin.replace('.', ' › ')} → {clean_folder(folder) or 'Toolbit'}")
    return _row(row)


def save_upload(name: str, fileobj, into: str = "") -> dict:
    fid = uuid.uuid4().hex[:12]
    name = safe_name(name)
    folder = config.WORKSPACE_DIR / fid
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / name
    with open(path, "wb") as out:
        shutil.copyfileobj(fileobj, out, length=1024 * 1024)
    same = _same_upload(name, path)
    if same:                     # the exact same file was added before: reuse it instead of a second copy
        shutil.rmtree(folder, ignore_errors=True)
        return same
    return _insert(fid, name, path, "upload", into or KIND_FOLDER.get(kind_of(name), ""))


def _same_upload(name: str, path: Path):
    import filecmp
    try:
        size = path.stat().st_size
        conn = get_db()
        rows = conn.execute("SELECT * FROM files WHERE name=? AND size=? AND origin='upload' ORDER BY created_at DESC LIMIT 5",
                            (name, size)).fetchall()
        conn.close()
        for r in rows:
            d = _row(r)
            if d["exists"] and filecmp.cmp(d["path"], path, shallow=False):
                return d
    except Exception:
        pass
    return None


def save_bytes(name: str, data: bytes, origin="upload") -> dict:
    fid = uuid.uuid4().hex[:12]
    name = safe_name(name)
    folder = config.WORKSPACE_DIR / fid
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / name
    path.write_bytes(data)
    return _insert(fid, name, path, origin)


CATEGORIES = ["Audio", "Video", "Images", "PDF", "Lyrics", "Data", "Documents", "History"]


KIND_FOLDER = {"audio": "Audio", "video": "Video", "image": "Images", "pdf": "PDF", "data": "Data",
               "document": "Documents"}


def ensure_folders():
    for c in CATEGORIES:
        (config.output_dir() / c).mkdir(parents=True, exist_ok=True)


def _rel_folder(path: Path) -> str:
    try:
        rel = Path(path).resolve().parent.relative_to(config.output_dir().resolve())
        return "" if str(rel) == "." else rel.as_posix()
    except Exception:
        return ""


def migrate_output_folders():
    """Older outputs were filed by their parent folder name only; give them the full path (Audio/My mix).
    Uploads that were never sorted go into the folder for their type."""
    conn = get_db()
    for r in conn.execute("SELECT id, name FROM files WHERE origin = 'upload' AND (folder IS NULL OR folder = '')").fetchall():
        k = KIND_FOLDER.get(kind_of(r["name"]))
        if k:
            conn.execute("UPDATE files SET folder=? WHERE id=?", (k, r["id"]))
    rows = conn.execute("SELECT id, path, folder FROM files WHERE origin != 'upload'").fetchall()
    for r in rows:
        rel = _rel_folder(r["path"])
        if rel and r["folder"] != rel and (not r["folder"] or r["folder"] == Path(r["path"]).parent.name):
            conn.execute("UPDATE files SET folder=? WHERE id=?", (rel, r["id"]))
    conn.commit()
    conn.close()


def output_path(stem: str, ext: str, sub: str = "") -> Path:
    """Unique path in the user's output folder (Documents/Data Assistant/<sub>)."""
    folder = config.output_dir() / sub if sub else config.output_dir()
    folder.mkdir(parents=True, exist_ok=True)
    stem = safe_name(stem)[:80] or "output"
    ext = ext.lstrip(".")
    p = folder / f"{stem}.{ext}"
    i = 2
    while p.exists():
        p = folder / f"{stem} ({i}).{ext}"
        i += 1
    return p


def register_output(path: Path, origin: str, folder: str | None = None) -> dict:
    """Outputs land in the folder named after the tool's sub-folder (Audio, Lyrics, Video...)."""
    fid = uuid.uuid4().hex[:12]
    path = Path(path)
    if folder is None:
        folder = _rel_folder(path)
    return _insert(fid, path.name, path, origin, folder)


def get_file(fid: str) -> dict:
    conn = get_db()
    r = conn.execute("SELECT * FROM files WHERE id=?", (fid,)).fetchone()
    conn.close()
    if not r:
        raise HTTPException(404, f"File {fid} not found")
    d = _row(r)
    if not d["exists"]:
        raise HTTPException(404, f"File '{d['name']}' no longer exists on disk")
    return d


def list_files(kind: str | None = None, limit: int = 2000):
    conn = get_db()
    if kind:
        rows = conn.execute("SELECT * FROM files WHERE kind=? ORDER BY created_at DESC LIMIT ?", (kind, limit)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM files ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
    conn.close()
    return [d for d in (_row(r) for r in rows) if d["exists"]]


def delete_file(fid: str, delete_disk: bool = True):
    conn = get_db()
    r = conn.execute("SELECT * FROM files WHERE id=?", (fid,)).fetchone()
    conn.execute("DELETE FROM files WHERE id=?", (fid,))
    conn.commit()
    conn.close()
    if r:
        from . import history
        history.log(f"Removed {r['name']} from My Files")
    if r:
        try:                                      # remember it so paired devices remove it too
            sha = r["sha"] or file_sha(Path(r["path"]))
            c3 = get_db()
            still = c3.execute("SELECT 1 FROM files WHERE sha=? LIMIT 1", (sha,)).fetchone() if sha else None
            c3.close()
            if sha and not still:                 # skip if another copy with the same content is still here
                c2 = get_db()
                c2.execute("INSERT OR REPLACE INTO sync_deleted (sha, at) VALUES (?,?)", (sha, now()))
                c2.commit(); c2.close()
        except Exception:
            pass
    if r and delete_disk:
        p = Path(r["path"])
        # only remove files inside our workspace; outputs in Documents are the user's
        if config.WORKSPACE_DIR in p.parents:
            shutil.rmtree(p.parent, ignore_errors=True)


def stem(name: str) -> str:
    return Path(name).stem


# ---------- folders ----------
def clean_folder(name) -> str:
    """Folder names may be nested with '/', e.g. 'Audio/My mix'."""
    parts = []
    for part in re.split(r"[/\\]+", str(name or "")):
        part = re.sub(r'[<>:"|?*\x00-\x1f]', " ", part).strip(" .")
        part = re.sub(r"\s+", " ", part)[:70]
        if part:
            parts.append(part)
    return "/".join(parts[:4])


def list_folders():
    """Every folder (category folders, nested ones and their parents) with direct and total file counts."""
    conn = get_db()
    rows = conn.execute("SELECT name FROM folders").fetchall()
    counts = dict(conn.execute("SELECT folder, COUNT(*) FROM files GROUP BY folder").fetchall())
    conn.close()
    names = {r["name"] for r in rows} | {k for k in counts if k} | set(CATEGORIES)
    for n in list(names):
        parts = n.split("/")
        names |= {"/".join(parts[:i]) for i in range(1, len(parts))}
    out = []
    for n in sorted(names, key=lambda x: (x.split("/")[0] not in CATEGORIES, x.lower())):
        total = sum(c for k, c in counts.items() if k and (k == n or k.startswith(n + "/")))
        out.append({"name": n, "count": counts.get(n, 0), "total": total, "category": n in CATEGORIES})
    return out


def create_folder(name: str) -> str:
    name = clean_folder(name)
    if not name:
        raise HTTPException(400, "Give the folder a name")
    conn = get_db()
    conn.execute("INSERT OR IGNORE INTO folders (name, created_at) VALUES (?,?)", (name, now()))
    conn.commit()
    conn.close()
    from . import history
    history.log(f"Created folder {name}")
    return name


def rename_folder(old: str, new: str) -> str:
    new = clean_folder(new)
    if not new:
        raise HTTPException(400, "Give the folder a name")
    conn = get_db()
    conn.execute("DELETE FROM folders WHERE name=?", (old,))
    conn.execute("INSERT OR IGNORE INTO folders (name, created_at) VALUES (?,?)", (new, now()))
    conn.execute("UPDATE files SET folder=? WHERE folder=?", (new, old))
    conn.execute("UPDATE files SET folder=? || substr(folder, ?) WHERE folder LIKE ?", (new, len(old) + 1, old + "/%"))
    conn.commit()
    conn.close()
    from . import history
    history.log(f"Renamed folder {old}", f"to {new}")
    return new


def delete_folder(name: str):
    """Removes the folder only; its files move back to the top level."""
    conn = get_db()
    conn.execute("DELETE FROM folders WHERE name=?", (name,))
    conn.execute("UPDATE files SET folder='' WHERE folder=? OR folder LIKE ?", (name, name + "/%"))
    conn.execute("DELETE FROM folders WHERE name LIKE ?", (name + "/%",))
    conn.commit()
    conn.close()
    from . import history
    history.log(f"Deleted folder {name}", "files kept")


def move_file(fid: str, folder: str) -> dict:
    folder = clean_folder(folder)
    if folder:
        create_folder(folder)
    conn = get_db()
    conn.execute("UPDATE files SET folder=? WHERE id=?", (folder, fid))
    conn.commit()
    conn.close()
    f = get_file(fid)
    from . import history
    history.log(f"Moved {f['name']}", f"to {folder or 'No folder'}")
    return f


def rename_file(fid: str, new_name: str) -> dict:
    f = get_file(fid)
    new_name = safe_name(new_name)
    if not Path(new_name).suffix:
        new_name += Path(f["name"]).suffix
    old = Path(f["path"])
    target = old.with_name(new_name)
    if target != old:
        if target.exists():
            raise HTTPException(400, f"A file called '{new_name}' already exists there")
        old.rename(target)
    conn = get_db()
    conn.execute("UPDATE files SET name=?, path=?, kind=? WHERE id=?", (new_name, str(target), kind_of(new_name), fid))
    conn.commit()
    conn.close()
    from . import history
    history.log(f"Renamed {f['name']}", f"to {new_name}")
    return get_file(fid)


# ---------------- 3.3: sync helpers ----------------
def file_sha(path: Path) -> str:
    import hashlib
    try:
        h = hashlib.sha1()
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(1024 * 1024), b""):
                h.update(chunk)
        return h.hexdigest()
    except OSError:
        return ""


def manifest() -> list[dict]:
    """Every file in My Files with its content hash (hashes are worked out once and stored)."""
    conn = get_db()
    rows = [dict(r) for r in conn.execute("SELECT * FROM files ORDER BY created_at").fetchall()]
    out, seen = [], set()
    for r in rows:
        p = Path(r["path"])
        if not p.exists():
            continue
        if not r.get("sha"):
            r["sha"] = file_sha(p)
            conn.execute("UPDATE files SET sha=? WHERE id=?", (r["sha"], r["id"]))
        if r["sha"] and r["sha"] not in seen:
            seen.add(r["sha"])
            out.append({k: r.get(k) for k in ("id", "sha", "name", "kind", "size", "origin", "created_at", "folder")})
    conn.commit()
    conn.close()
    return out


def tombstones() -> dict:
    conn = get_db()
    rows = conn.execute("SELECT sha, at FROM sync_deleted").fetchall()
    conn.close()
    return {r[0]: r[1] for r in rows}


def add_synced(src: Path, meta: dict) -> dict | None:
    """Store a file that came from another device. Outputs go to the output folder, uploads to the workspace."""
    sha = meta["sha"]
    conn = get_db()
    dup = conn.execute("SELECT id FROM files WHERE sha=?", (sha,)).fetchone()
    conn.execute("DELETE FROM sync_deleted WHERE sha=?", (sha,))
    conn.commit()
    conn.close()
    if dup:
        src.unlink(missing_ok=True)
        return None
    name = safe_name(meta["name"])
    fid = uuid.uuid4().hex[:12]
    if (meta.get("origin") or "") == "upload":
        dest = config.WORKSPACE_DIR / fid / name
        dest.parent.mkdir(parents=True, exist_ok=True)
    else:
        sub = clean_folder(meta.get("folder") or "")
        dest = output_path(Path(name).stem, Path(name).suffix.lstrip(".") or "bin", sub)
    shutil.move(str(src), dest)
    conn = get_db()
    conn.execute("INSERT INTO files (id, name, path, kind, size, origin, created_at, folder, sha) VALUES (?,?,?,?,?,?,?,?,?)",
                 (fid, dest.name, str(dest), kind_of(dest.name), dest.stat().st_size, meta.get("origin") or "sync",
                  meta.get("created_at") or now(), clean_folder(meta.get("folder") or ""), sha))
    conn.commit()
    conn.close()
    return get_file(fid)


def remove_synced(sha: str, at: str):
    """Another device deleted this file: take it out of My Files here too (files in Documents stay on disk)."""
    conn = get_db()
    rows = conn.execute("SELECT id, created_at FROM files WHERE sha=?", (sha,)).fetchall()
    conn.close()
    n = 0
    for fid, created in rows:
        if (created or "") < at:
            delete_file(fid, delete_disk=True)
            n += 1
    return n
