"""Email (Gmail over IMAP/SMTP with an app password): inbox, search, read, save attachments to My Files, send files."""
from __future__ import annotations

import email
import email.policy
import imaplib
import io
import re
import smtplib
import socket
import threading
from email.header import decode_header, make_header
from email.message import EmailMessage
from email.utils import formataddr, getaddresses, parseaddr, parsedate_to_datetime
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import config, files, history

router = APIRouter(prefix="/api/mail", tags=["mail"])
IMAP_HOST, SMTP_HOST = "imap.gmail.com", "smtp.gmail.com"
PAGE = 30
_lock = threading.Lock()
_conn: dict = {}          # address -> open IMAP connection


def accounts() -> list[dict]:
    """[{address, app_password}], newest settings format. Moves the old single-account keys over once."""
    acc = [a for a in (config.get("email_accounts") or []) if a.get("address")]
    old = (config.get("email_address") or "").strip()
    if old and not any(a["address"].lower() == old.lower() for a in acc):
        acc.append({"address": old, "app_password": (config.get("email_app_password") or "").replace(" ", "")})
        # stamped "old" so a paired device's real list always wins over this one-time move
        config.save_settings({"email_accounts": acc, "email_active": config.get("email_active") or old,
                              "email_address": "", "email_app_password": ""}, meta={"email_accounts": "0"})
    return acc


def active() -> str:
    acc = accounts()
    want = (config.get("email_active") or "").lower()
    for a in acc:
        if a["address"].lower() == want:
            return a["address"]
    return acc[0]["address"] if acc else ""


def _creds(account: str = ""):
    want = (account or active()).lower()
    for a in accounts():
        if a["address"].lower() == want and a.get("app_password"):
            return a["address"], a["app_password"].replace(" ", "")
    raise HTTPException(400, "Email isn't set up yet")


def _login(addr: str, pw: str):
    try:
        m = imaplib.IMAP4_SSL(IMAP_HOST, 993, timeout=25)
        m.login(addr, pw)
        return m
    except imaplib.IMAP4.error:
        raise HTTPException(400, "Gmail didn't accept that login. Check the address, and use an app password "
                                 "(16 letters from myaccount.google.com/apppasswords), not your normal password.")
    except (socket.timeout, OSError) as e:
        raise HTTPException(502, f"Couldn't reach Gmail: {e}")


def _imap(account: str = ""):
    """One shared connection per account, re-opened when it drops."""
    addr, pw = _creds(account)
    m = _conn.get(addr.lower())
    if m is not None:
        try:
            m.noop()
            return m
        except Exception:
            _conn.pop(addr.lower(), None)
    m = _login(addr, pw)
    _conn[addr.lower()] = m
    return m


def _drop(addr: str):
    m = _conn.pop(addr.lower(), None)
    try:
        m and m.logout()
    except Exception:
        pass


def _dec(v) -> str:
    if not v:
        return ""
    try:
        out = str(make_header(decode_header(v)))
    except Exception:
        out = str(v)
    if "=?" in out:   # badly encoded sender names: show the readable part
        out = re.sub(r"=\?[^?]+\?[qQ]\?(.*?)\?=", lambda m: m.group(1).replace("_", " "), out)
    return out


def _q(name: str) -> str:
    return '"' + name.replace("\\", "\\\\").replace('"', '\\"') + '"'


def _folders(m) -> dict:
    """Map inbox/starred/sent/all to this account's real folder names (they're translated in some languages)."""
    out = {"inbox": "INBOX"}
    typ, data = m.list()
    for raw in data or []:
        line = raw.decode("utf-8", "replace") if isinstance(raw, bytes) else str(raw)
        mt = re.match(r'\((?P<flags>[^)]*)\) "(?P<sep>[^"]*)" (?P<name>.+)$', line)
        if not mt:
            continue
        flags, name = mt.group("flags"), mt.group("name").strip().strip('"')
        for flag, key in (("\\Sent", "sent"), ("\\Flagged", "starred"), ("\\All", "all")):
            if flag in flags:
                out[key] = name
    return out


def _select(m, folder: str, readonly=True):
    names = _folders(m)
    real = names.get(folder, folder if folder not in ("sent", "starred", "all") else None)
    if not real:
        raise HTTPException(400, f"Folder '{folder}' not found")
    typ, _ = m.select(_q(real), readonly=readonly)
    if typ != "OK":
        raise HTTPException(400, f"Couldn't open {real}")
    return real


_UNREAD: dict = {}       # address -> (time, count)


def _unread_one(addr: str):
    import time as _t
    hit = _UNREAD.get(addr.lower())
    if hit and _t.time() - hit[0] < 120:
        return hit[1]
    n = None
    try:
        with _lock:
            m = _imap(addr)
            typ, data = m.status("INBOX", "(UNSEEN)")
        mt = re.search(rb"UNSEEN (\d+)", data[0] if data else b"")
        n = int(mt.group(1)) if mt else None
    except Exception:
        n = None
    _UNREAD[addr.lower()] = (_t.time(), n)
    return n


@router.get("/unread")
def unread():
    """Unread inbox counts for the Home page (each account checked at most every 2 minutes)."""
    acc = accounts()
    if not acc:
        return {"configured": False, "unread": None, "accounts": []}
    per = [{"address": a["address"], "unread": _unread_one(a["address"])} for a in acc]
    nums = [p["unread"] for p in per if p["unread"] is not None]
    return {"configured": True, "unread": sum(nums) if nums else None, "accounts": per}


class MailSettings(BaseModel):
    address: str
    app_password: str = ""


class AccountReq(BaseModel):
    address: str = ""


@router.get("/status")
def status():
    acc = accounts()
    return {"configured": bool(acc), "address": active(), "accounts": [a["address"] for a in acc]}


@router.post("/settings")
def save(r: MailSettings):
    """Add a Gmail account (or update its app password). It becomes the one shown."""
    addr = r.address.strip()
    acc = accounts()
    known = next((a for a in acc if a["address"].lower() == addr.lower()), None)
    pw = r.app_password.replace(" ", "").strip() or (known or {}).get("app_password", "")
    if "@" not in addr:
        raise HTTPException(400, "Enter your Gmail address")
    if not pw:
        raise HTTPException(400, "Paste the app password")
    m = _login(addr, pw)          # test before saving
    try:
        m.logout()
    except Exception:
        pass
    acc = [a for a in acc if a["address"].lower() != addr.lower()] + [{"address": addr, "app_password": pw}]
    config.save_settings({"email_accounts": acc, "email_active": addr})
    _drop(addr)
    history.log("Email connected", addr)
    return status()


@router.post("/active")
def set_active(r: AccountReq):
    if not any(a["address"].lower() == r.address.lower() for a in accounts()):
        raise HTTPException(400, "That account isn't connected")
    config.save_settings({"email_active": r.address})
    return status()


@router.post("/disconnect")
def disconnect(r: AccountReq | None = None):
    addr = ((r and r.address) or active()).strip()
    acc = [a for a in accounts() if a["address"].lower() != addr.lower()]
    config.save_settings({"email_accounts": acc, "email_active": acc[0]["address"] if acc else ""})
    _drop(addr)
    _UNREAD.pop(addr.lower(), None)
    history.log("Email disconnected", addr)
    return status()


def _has_attachment(bs: str) -> bool:
    return bool(re.search(r'"(attachment|ATTACHMENT)"|"(name|NAME|filename|FILENAME)" "', bs))


@router.get("/list")
def list_mail(folder: str = "inbox", q: str = "", page: int = 0):
    with _lock:
        m = _imap()
        _select(m, folder)
        if q.strip():
            # Gmail search syntax works here (from:, has:attachment, subject:, older_than: ...)
            typ, data = m.uid("SEARCH", "X-GM-RAW", _q(q.strip()))
        else:
            typ, data = m.uid("SEARCH", None, "ALL")
        uids = (data[0].split() if data and data[0] else [])[::-1]
        total = len(uids)
        chunk = uids[page * PAGE:(page + 1) * PAGE]
        items = []
        if chunk:
            typ, resp = m.uid("FETCH", b",".join(chunk).decode(),
                              "(UID FLAGS RFC822.SIZE BODYSTRUCTURE BODY.PEEK[HEADER.FIELDS (FROM TO SUBJECT DATE)])")
            meta, cur = {}, None
            for part in resp or []:
                if isinstance(part, tuple):
                    head = part[0].decode("utf-8", "replace")
                    uid = re.search(r"UID (\d+)", head)
                    if not uid:
                        continue
                    cur = uid.group(1)
                    msg = email.message_from_bytes(part[1])
                    try:
                        dt = parsedate_to_datetime(msg.get("Date")).isoformat()
                    except Exception:
                        dt = ""
                    name, addr = parseaddr(_dec(msg.get("From")))
                    to_name, to_addr = parseaddr(_dec(msg.get("To")))
                    meta[cur] = {"uid": cur, "from": name or addr, "from_addr": addr, "to": to_name or to_addr,
                                 "subject": _dec(msg.get("Subject")) or "(no subject)", "date": dt,
                                 "unread": "\\Seen" not in head, "attachment": _has_attachment(head),
                                 "starred": "\\Flagged" in head}
            items = [meta[u.decode()] for u in chunk if u.decode() in meta]
    return {"items": items, "total": total, "page": page, "pages": (total + PAGE - 1) // PAGE}


def _text_of(msg) -> tuple[str, str]:
    plain, html = "", ""
    for part in msg.walk():
        if part.is_multipart() or part.get_content_disposition() == "attachment":
            continue
        ct = part.get_content_type()
        try:
            content = part.get_content()
        except Exception:
            payload = part.get_payload(decode=True) or b""
            content = payload.decode(part.get_content_charset() or "utf-8", "replace")
        if ct == "text/plain" and not plain:
            plain = content
        elif ct == "text/html" and not html:
            html = content
    return plain, html


def _clean_html(html: str) -> str:
    """Show the email's own layout, minus anything that runs code or loads trackers."""
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "iframe", "object", "embed", "form", "base", "meta", "link"]):
        t.decompose()
    for t in soup.find_all(True):
        for a in list(t.attrs):
            if a.lower().startswith("on"):
                del t.attrs[a]
        if t.name == "a":
            t["target"] = "_blank"
            t["rel"] = "noopener noreferrer"
    return str(soup)


def _attachments(msg):
    out = []
    for k, part in enumerate(msg.walk()):
        if part.is_multipart():
            continue
        fn = part.get_filename()
        if part.get_content_disposition() in ("attachment", "inline") and fn:
            data = part.get_payload(decode=True) or b""
            out.append((k, _dec(fn), part.get_content_type(), data))
    return out


def _fetch(folder: str, uid: str, mark_read=True):
    with _lock:
        m = _imap()
        _select(m, folder, readonly=not mark_read)
        typ, resp = m.uid("FETCH", uid, "(BODY[])" if mark_read else "(BODY.PEEK[])")
        raw = next((p[1] for p in resp or [] if isinstance(p, tuple)), None)
    if not raw:
        raise HTTPException(404, "Email not found (it may have been moved)")
    return email.message_from_bytes(raw, policy=email.policy.default)


@router.get("/msg/{uid}")
def read(uid: str, folder: str = "inbox"):
    msg = _fetch(folder, uid)
    plain, html = _text_of(msg)
    try:
        dt = parsedate_to_datetime(msg.get("Date")).isoformat()
    except Exception:
        dt = ""
    return {
        "uid": uid, "subject": _dec(msg.get("Subject")) or "(no subject)", "date": dt,
        "from": _dec(msg.get("From")), "from_addr": parseaddr(_dec(msg.get("From")))[1],
        "to": _dec(msg.get("To")), "cc": _dec(msg.get("Cc")),
        "message_id": msg.get("Message-ID", ""),
        "text": plain, "html": _clean_html(html) if html else "",
        "attachments": [{"index": k, "name": n, "type": t, "size": len(d)} for k, n, t, d in _attachments(msg)],
    }


class SaveReq(BaseModel):
    folder: str = "inbox"
    indexes: list[int] | None = None     # None = all attachments


@router.post("/msg/{uid}/save")
def save_attachments(uid: str, r: SaveReq):
    msg = _fetch(r.folder, uid, mark_read=False)
    atts = [a for a in _attachments(msg) if r.indexes is None or a[0] in r.indexes]
    if not atts:
        raise HTTPException(400, "No attachments to save")
    saved = [files.save_upload(name, io.BytesIO(data)) for _, name, _, data in atts]
    return {"files": saved}


class SendReq(BaseModel):
    to: str
    subject: str = ""
    body: str = ""
    cc: str = ""
    file_ids: list[str] = []
    in_reply_to: str = ""


@router.post("/send")
def send(r: SendReq):
    addr, pw = _creds()
    to = [a for _, a in getaddresses([r.to]) if "@" in a]
    cc = [a for _, a in getaddresses([r.cc]) if "@" in a]
    if not to:
        raise HTTPException(400, "Add who it's going to")
    msg = EmailMessage()
    msg["From"] = formataddr(("", addr))
    msg["To"] = ", ".join(to)
    if cc:
        msg["Cc"] = ", ".join(cc)
    msg["Subject"] = r.subject
    if r.in_reply_to:
        msg["In-Reply-To"] = r.in_reply_to
        msg["References"] = r.in_reply_to
    msg.set_content(r.body or "")
    total = 0
    for fid in r.file_ids:
        f = files.get_file(fid)
        data = Path(f["path"]).read_bytes()
        total += len(data)
        if total > 24 * 1024 * 1024:
            raise HTTPException(400, "Attachments are over Gmail's 25 MB limit")
        import mimetypes
        mt = (mimetypes.guess_type(f["name"])[0] or "application/octet-stream").split("/")
        msg.add_attachment(data, maintype=mt[0], subtype=mt[1], filename=f["name"])
    try:
        with smtplib.SMTP_SSL(SMTP_HOST, 465, timeout=60) as s:
            s.login(addr, pw)
            s.send_message(msg)
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(400, "Gmail refused the login for sending. Check the app password in Email settings.")
    except (smtplib.SMTPException, OSError) as e:
        raise HTTPException(502, f"Couldn't send: {e}")
    history.log(f"Email sent: {r.subject or '(no subject)'}", f"to {', '.join(to)}"
                + (f", {len(r.file_ids)} attachment(s)" if r.file_ids else ""))
    return {"ok": True}
