"""History: every action and every app update, in the database and as readable files in
Documents/Data Assistant/History/."""
import json
import threading
from datetime import datetime

from . import config
from .db import get_db

_lock = threading.Lock()

# Newest first. Each app update adds an entry here; it is written to History once, on first start.
CHANGELOG = [
    ("3.3.1", "2026-10-30", ["Devices: the PC now says which laptop syncs with it instead of \"Not paired\"."]),
    ("3.3.0", "2026-10-30", [
        "Devices page: use this PC's Toolbit from your phone (Tailscale or home Wi-Fi, PIN sign-in, phone-sized layout).",
        "Laptop: one installer file that pairs with this PC by itself. Settings and My Files sync both ways, and the laptop "
        "shows an Update button when this PC has a newer version.",
        "Email: more than one Gmail account (＋ Account, switch at the top).",
        "News articles open in a browser window in front of Toolbit.",
    ]),
    ("3.2.1", "2026-10-21", [
        "Shortcuts: the Desktop, Start menu and taskbar shortcuts are renamed to Toolbit reliably, with the new icon.",
        "Errors are now one plain sentence (e.g. 'This PDF looks damaged') instead of technical messages.",
        "Adding the exact same file twice reuses the first copy, so My Files and the file pickers stay tidy.",
        "Calculator: 200 + 15% = 230, 15% of 80 = 12, and 1,000 is read as a thousand.",
        "Audio Studio: you can type Start and End times again. Jump to (Ctrl K) finds actions like 'merge' or 'gif'.",
        "Fresh installs only show the current version in History.",
    ]),
    ("3.2.0", "2026-10-21", [
        "New name and icon: Data Assistant is now Toolbit. Your files, settings and shortcuts carry over "
        "(the desktop shortcut is renamed automatically).",
        "Home: Quick convert. Drop any files and pick what they should become in one click.",
        "Home: compact recent files, unread email count, and a warning when backups aren't working.",
        "Batch: PDF pages to images, and PDF to Word/text.",
    ]),
    ("3.1.0", "2026-10-18", [
        "Email: your Gmail inside the app (inbox, starred, sent, Gmail search), save attachments straight into "
        "My Files, and send files from My Files by email. Uses a Gmail app password that stays on this PC.",
        "News & Weather: today's weather and the week ahead for your city, plus headlines from news sources you pick.",
    ]),
    ("3.0.0", "2026-10-18", [
        "Simplified to a files & media toolbox: Audio Studio, Lyrics, Video, Images, PDF, Data & Docs, Batch, "
        "My Files, Quick Tools and Backup. Calendar, week planning, reminders, notes, the Assistant chat and the other "
        "Claude-powered tools are switched off (your data is kept).",
    ]),
    ("2.8.2", "2026-10-18", [
        "Calendar: 'Clear day' removes everything on a day in one click; no more confirmation pop-ups when removing "
        "blocks, use Undo instead (repeating blocks are removed for that day, with 'All future ones too').",
        "Assistant can remove calendar blocks and clear a day for you.",
    ]),
    ("2.8.1", "2026-10-18", [
        "Plan my week: type changes under the suggested week (\"workouts in the evening\", \"keep Saturday free\") "
        "and Claude updates the same plan, no need to start over.",
    ]),
    ("2.8.0", "2026-10-18", [
        "After an update the app tells you and restarts itself with one click (no more running an old version "
        "in the background). Settings also has a Restart button.",
        "Backup: refuses cloud drives (Google Drive shows up as G:) and drives it can't write to, explains why, and "
        "stops retrying a failed backup every 5 minutes.",
        "Sidebar: everyday pages first, sections you can fold away.",
        "Settings: web search on/off and your city for local results.",
        "Assistant: if a message fails, your text goes back into the box so you can resend it.",
    ]),
    ("2.7.2", "2026-10-18", [
        "Assistant: fixed an error when web search was on (the location sent with searches was rejected). If web "
        "search ever fails again, the Assistant answers without it instead of showing an error.",
    ]),
    ("2.7.1", "2026-10-18", [
        "Plan my week: the suggested plan now stays until you add it or discard it, even if you switch pages, "
        "close the app, or leave while Claude is still planning. Your ticks are remembered too.",
    ]),
    ("2.7.0", "2026-10-17", [
        "Notes: your second brain. Quick capture from anywhere in the app (Ctrl+Shift+N or the + Note button), "
        "#tags, pins, checklists, search, notes for a day show up in Today; the Assistant can save and find notes.",
        "Batch mode: pick many files and convert, compress, resize, normalize, rename, read text or zip them in one go.",
        "Video › Subtitles: automatic subtitles from speech (offline), optional translation, as .srt, a subtitle "
        "track, or burned into the video.",
        "Read text (OCR) from photos, screenshots and scanned PDFs, to Markdown, Word or text.",
        "Week review: planned vs done, focus and study hours, workouts, streak, and a short coach-style reflection.",
    ]),
    ("2.6.0", "2026-10-17", [
        "Opens much faster: the window appears instantly with a loading screen, and heavy libraries load only "
        "when a tool needs them (startup imports about 3x faster).",
        "Quick Tools: calculator, unit and currency converter, world clock, date maths, text tools, encode/decode, "
        "hashes, password and QR generator, colour converter, and a focus (Pomodoro) timer that logs to your calendar.",
        "Assistant can search the web (with sources) so you don't have to google; toggle 🌐 per chat.",
        "Optional global shortcut Ctrl+Alt+D to open the app from anywhere.",
    ]),
    ("2.5.0", "2026-10-17", [
        "Choose the Claude model (Sonnet, Opus, Fable, Haiku) and effort level in Settings, or per chat.",
        "About me profile in Settings: the Assistant and the week planner use it.",
        "Calendar › Plan my week: Claude suggests a realistic week with recommendations, based on your profile, "
        "calendar and how last week went; pick the blocks you want and add them in one click.",
        "Interface: Ctrl+K quick jump, light/dark switch, greeting by time of day.",
        "Assistant: keeps Claude's reasoning between tool steps and has more room for long tasks.",
    ]),
    ("2.4.0", "2026-10-15", [
        "Home: Today view with your plans, what's next, today's workout and anything left over from yesterday "
        "(move it to today in one click), plus quick-add.",
        "Reminders: Windows notifications before each planned block and a morning overview.",
        "Background mode: the app keeps running after you close the window so reminders and auto-backup work; "
        "optional start with Windows. Quit in the sidebar stops it completely.",
    ]),
    ("2.3.0", "2026-10-13", [
        "Output folders: every category (Audio, Video, Images, PDF, Lyrics, Data, Documents, Reports) is created "
        "up front; multi-file results get their own sub-folder; My Files mirrors the folder tree.",
        "History: a log of every action and every app update (this page + Documents/Data Assistant/History).",
        "Calendar: month view, events with repeats, focus/study/workout types.",
        "Workouts: 3-day dumbbell program (bodyweight versions until you have dumbbells), set logging, "
        "progress per exercise, automatic weight suggestions.",
        "Backup: one-click or automatic backup to a USB stick or any folder, no cloud.",
    ]),
    ("2.2.0", "2026-10-13", [
        "Audio Studio: split a seamless mix/playlist into songs (auto-detect or tracklist), preview and nudge cuts.",
        "Assistant: chat folders (drag and drop, rename), can split mixes on request.",
    ]),
    ("2.1.0", "2026-10-13", [
        "Lyrics: find lyrics online for a song file, add lyrics into the song (+ .lrc), better transcription.",
        "My Files: folders, rename, move, download buttons.",
        "Voice: talk to the Assistant, spoken replies, conversation mode.",
    ]),
    ("2.0.1", "2026-10-12", ["Fixed Lyrics > Transcribe crash."]),
    ("2.0.0", "2026-10-12", ["Data Assistant 2 installed: all tools in one local app."]),
]


def init():
    conn = get_db()
    conn.execute("""CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, kind TEXT NOT NULL,
        title TEXT NOT NULL, detail TEXT DEFAULT '')""")
    conn.commit()
    conn.close()


def _folder():
    p = config.output_dir() / "History"
    p.mkdir(parents=True, exist_ok=True)
    return p


def log(title: str, detail="", kind: str = "action"):
    """Never raises: history must not break the tool that called it."""
    try:
        ts = datetime.now().isoformat(timespec="seconds")
        if not isinstance(detail, str):
            detail = json.dumps(detail, ensure_ascii=False)
        with _lock:
            conn = get_db()
            conn.execute("INSERT INTO history (ts, kind, title, detail) VALUES (?,?,?,?)", (ts, kind, title, detail))
            conn.commit()
            conn.close()
            if kind != "update":
                f = _folder() / f"{ts[:7]} Activity.md"
                new = not f.exists()
                with open(f, "a", encoding="utf-8") as out:
                    if new:
                        out.write(f"# Activity {ts[:7]}\n\n")
                    out.write(f"- {ts[:10]} {ts[11:16]} · {title}" + (f" — {detail}" if detail else "") + "\n")
    except Exception:
        pass


def record_updates():
    """Write any app versions not yet in History, and keep 'App updates.md' complete."""
    try:
        conn = get_db()
        seen = {r[0] for r in conn.execute("SELECT title FROM history WHERE kind='update'").fetchall()}
        conn.close()
        todo = CHANGELOG if seen else CHANGELOG[:1]   # fresh install: only the current version
        for ver, day, notes in reversed(todo):
            title = f"Updated to version {ver}"
            if title not in seen:
                log(title, " · ".join(notes), kind="update")
        lines = ["# Toolbit: app updates\n"]
        for ver, day, notes in CHANGELOG:
            lines.append(f"\n## {ver} ({day})\n")
            lines += [f"- {n}\n" for n in notes]
        (_folder() / "App updates.md").write_text("".join(lines), encoding="utf-8")
    except Exception:
        pass


def entries(kind: str | None = None, q: str = "", limit: int = 300, before_id: int | None = None):
    sql, args = "SELECT * FROM history WHERE 1=1", []
    if kind:
        sql += " AND kind=?"; args.append(kind)
    if q:
        sql += " AND (title LIKE ? OR detail LIKE ?)"; args += [f"%{q}%", f"%{q}%"]
    if before_id:
        sql += " AND id<?"; args.append(before_id)
    sql += " ORDER BY id DESC LIMIT ?"; args.append(limit)
    conn = get_db()
    rows = [dict(r) for r in conn.execute(sql, args).fetchall()]
    conn.close()
    return rows
