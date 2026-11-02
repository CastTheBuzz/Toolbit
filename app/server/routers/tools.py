"""Quick tools that need the backend: currency rates (cached), focus sessions, global shortcut."""
import time
from datetime import date

import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import history
from ..core.db import get_db, now

router = APIRouter(prefix="/api/tools", tags=["tools"])
_FX = {}


@router.get("/fx")
def fx(base: str = "EUR"):
    """Exchange rates for one base currency (free open.er-api.com, refreshed every 6 h)."""
    base = base.upper()[:3]
    hit = _FX.get(base)
    if hit and time.time() - hit["at"] < 6 * 3600:
        return hit["data"]
    try:
        r = requests.get(f"https://open.er-api.com/v6/latest/{base}", timeout=12)
        r.raise_for_status()
        d = r.json()
        if d.get("result") != "success":
            raise ValueError(d.get("error-type", "unknown error"))
    except Exception as e:
        if hit:
            return {**hit["data"], "stale": True}
        raise HTTPException(502, f"Couldn't get exchange rates (are you online?): {e}")
    data = {"base": base, "rates": d["rates"], "updated": d.get("time_last_update_utc", "")}
    _FX[base] = {"at": time.time(), "data": data}
    return data


class FocusReq(BaseModel):
    start: str          # HH:MM
    end: str            # HH:MM
    minutes: int
    label: str = "Focus session"


@router.post("/focus-done")
def focus_done(r: FocusReq):
    """Log a finished focus session in the calendar (as done) and History."""
    d = date.today().isoformat()
    conn = get_db()
    cur = conn.execute("""INSERT INTO events (title, date, start, end, kind, notes, repeat, weekdays, until, created_at)
        VALUES (?,?,?,?,'focus','Focus timer','none','','',?)""", (r.label.strip()[:80] or "Focus session", d, r.start, r.end, now()))
    conn.execute("INSERT INTO event_marks (event_id, date, state) VALUES (?,?,'done')", (cur.lastrowid, d))
    total = conn.execute("""SELECT COUNT(*) FROM events e JOIN event_marks m ON m.event_id=e.id
        WHERE e.notes='Focus timer' AND m.date=? AND m.state='done'""", (d,)).fetchone()[0]
    conn.commit()
    conn.close()
    history.log(f"Focus session done: {r.label}", f"{r.minutes} min ({r.start}–{r.end})")
    from ..core import reminders
    reminders.notify("Focus session done 🎉", f"{r.minutes} min of {r.label}. Take a short break. ({total} today)", "tools")
    return {"ok": True, "today": total}


@router.get("/focus-today")
def focus_today():
    d = date.today().isoformat()
    conn = get_db()
    rows = conn.execute("""SELECT e.start, e.end, e.title FROM events e JOIN event_marks m ON m.event_id=e.id
        WHERE e.notes='Focus timer' AND m.date=? AND m.state='done' ORDER BY e.start""", (d,)).fetchall()
    conn.close()
    return {"sessions": [dict(r) for r in rows]}
