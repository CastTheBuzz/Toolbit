"""Calendar (in-app only, no syncing) and a dumbbell workout program with logging and progression."""
from datetime import date, datetime, timedelta

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import config, history
from ..core.db import get_db, now

router = APIRouter(prefix="/api", tags=["calendar"])

KINDS = ["workout", "study", "focus", "work", "personal", "other"]


def init():
    conn = get_db()
    conn.execute("""CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, date TEXT NOT NULL,
        start TEXT DEFAULT '', end TEXT DEFAULT '', kind TEXT DEFAULT 'other', notes TEXT DEFAULT '',
        repeat TEXT DEFAULT 'none', weekdays TEXT DEFAULT '', until TEXT DEFAULT '', created_at TEXT NOT NULL)""")
    conn.execute("""CREATE TABLE IF NOT EXISTS event_marks (
        event_id INTEGER NOT NULL, date TEXT NOT NULL, state TEXT NOT NULL, PRIMARY KEY (event_id, date))""")
    conn.execute("""CREATE TABLE IF NOT EXISTS workout_sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, session TEXT NOT NULL, exercise TEXT NOT NULL,
        set_no INTEGER NOT NULL, weight REAL DEFAULT 0, reps INTEGER DEFAULT 0, equipment TEXT DEFAULT '',
        created_at TEXT NOT NULL)""")
    conn.commit()
    conn.close()


# ---------------- calendar ----------------
def _d(s):
    return datetime.strptime(s, "%Y-%m-%d").date()


def _occurs(ev, day: date) -> bool:
    start = _d(ev["date"])
    if day < start or (ev["until"] and day > _d(ev["until"])):
        return False
    if ev["repeat"] == "none":
        return day == start
    if ev["repeat"] == "daily":
        return True
    if ev["repeat"] == "weekly":
        wd = [int(x) for x in (ev["weekdays"] or str(start.weekday())).split(",") if x != ""]
        return day.weekday() in wd
    return False


def occurrences(start: str, end: str):
    a, b = _d(start), _d(end)
    if (b - a).days > 400:
        raise HTTPException(400, "Range too long")
    conn = get_db()
    evs = [dict(r) for r in conn.execute("SELECT * FROM events WHERE date <= ?", (end,)).fetchall()]
    marks = {(r["event_id"], r["date"]): r["state"] for r in
             conn.execute("SELECT * FROM event_marks WHERE date BETWEEN ? AND ?", (start, end)).fetchall()}
    conn.close()
    out, day = [], a
    while day <= b:
        ds = day.isoformat()
        for ev in evs:
            if _occurs(ev, day):
                st = marks.get((ev["id"], ds))
                if st == "skip":
                    continue
                out.append({**ev, "occ_date": ds, "done": st == "done"})
        day += timedelta(days=1)
    out.sort(key=lambda e: (e["occ_date"], e["start"] or "99", e["title"]))
    return out


@router.get("/calendar/events")
def list_events(start: str, end: str):
    return {"events": occurrences(start, end), "kinds": KINDS}


class EventReq(BaseModel):
    title: str
    date: str
    start: str = ""
    end: str = ""
    kind: str = "other"
    notes: str = ""
    repeat: str = "none"        # none / daily / weekly
    weekdays: str = ""          # weekly: "0,2,4" (Mon=0)
    until: str = ""


def _check(r: EventReq):
    if not r.title.strip():
        raise HTTPException(400, "Give the event a title")
    _d(r.date)
    if r.repeat not in ("none", "daily", "weekly"):
        raise HTTPException(400, "repeat must be none, daily or weekly")
    if r.kind not in KINDS:
        r.kind = "other"


@router.post("/calendar/events")
def create_event(r: EventReq):
    _check(r)
    conn = get_db()
    cur = conn.execute("""INSERT INTO events (title, date, start, end, kind, notes, repeat, weekdays, until, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)""", (r.title.strip(), r.date, r.start, r.end, r.kind, r.notes, r.repeat,
                                          r.weekdays, r.until, now()))
    conn.commit()
    eid = cur.lastrowid
    conn.close()
    history.log(f"Calendar: added {r.title.strip()}", f"{r.date} {r.start}".strip() + (f", repeats {r.repeat}" if r.repeat != "none" else ""))
    return {"id": eid}


@router.put("/calendar/events/{eid}")
def update_event(eid: int, r: EventReq):
    _check(r)
    conn = get_db()
    conn.execute("""UPDATE events SET title=?, date=?, start=?, end=?, kind=?, notes=?, repeat=?, weekdays=?, until=?
        WHERE id=?""", (r.title.strip(), r.date, r.start, r.end, r.kind, r.notes, r.repeat, r.weekdays, r.until, eid))
    conn.commit()
    conn.close()
    history.log(f"Calendar: changed {r.title.strip()}")
    return {"ok": True}


# ---- removing without confirmations: every removal can be undone for a while ----
_UNDO: dict[str, list] = {}


def _remove(conn, eid: int, date: str | None, scope: str, ops: list):
    """Remove one event (scope all), one day of it (one) or it from date on (future); record how to undo it."""
    ev = conn.execute("SELECT * FROM events WHERE id=?", (eid,)).fetchone()
    if not ev:
        return None
    if scope == "one" and date:
        prev = conn.execute("SELECT state FROM event_marks WHERE event_id=? AND date=?", (eid, date)).fetchone()
        conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,'skip')", (eid, date))
        ops.append(("mark", eid, date, prev["state"] if prev else None))
    elif scope == "future" and date:
        conn.execute("UPDATE events SET until=? WHERE id=?", ((_d(date) - timedelta(days=1)).isoformat(), eid))
        ops.append(("until", eid, ev["until"]))
    else:
        marks = [dict(m) for m in conn.execute("SELECT * FROM event_marks WHERE event_id=?", (eid,)).fetchall()]
        conn.execute("DELETE FROM events WHERE id=?", (eid,))
        conn.execute("DELETE FROM event_marks WHERE event_id=?", (eid,))
        ops.append(("event", dict(ev), marks))
    return ev["title"]


def _keep_undo(ops) -> str:
    import uuid
    uid = uuid.uuid4().hex[:10]
    _UNDO[uid] = ops
    while len(_UNDO) > 30:
        _UNDO.pop(next(iter(_UNDO)))
    return uid


@router.delete("/calendar/events/{eid}")
def delete_event(eid: int, date: str | None = None, scope: str = "all"):
    conn = get_db()
    ops = []
    title = _remove(conn, eid, date, scope, ops)
    conn.commit()
    conn.close()
    if title:
        history.log(f"Calendar: removed {title}", {"one": f"on {date}", "future": f"from {date} on"}.get(scope, "all"))
    return {"ok": True, "undo": _keep_undo(ops) if ops else None, "title": title}


class ClearDayReq(BaseModel):
    date: str
    kinds: list[str] | None = None     # only these kinds (default: everything that day)


@router.post("/calendar/day/clear")
def clear_day(r: ClearDayReq):
    """Empty a day: one-off blocks are removed, repeating ones are skipped for that day only."""
    _d(r.date)
    evs = [e for e in occurrences(r.date, r.date) if not r.kinds or e["kind"] in r.kinds]
    conn = get_db()
    ops = []
    for e in evs:
        one_off = (e.get("repeat") or "none") == "none"
        _remove(conn, e["id"], r.date, "all" if one_off else "one", ops)
    conn.commit()
    conn.close()
    if evs:
        history.log(f"Calendar: cleared {r.date}", f"{len(evs)} blocks")
    return {"removed": len(evs), "undo": _keep_undo(ops) if ops else None}


class UndoReq(BaseModel):
    undo: str


@router.post("/calendar/undo")
def undo(r: UndoReq):
    ops = _UNDO.pop(r.undo, None)
    if ops is None:
        raise HTTPException(400, "Too late to undo that one")
    conn = get_db()
    for op in reversed(ops):
        if op[0] == "mark":
            _, eid, date, prev = op
            if prev:
                conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,?)", (eid, date, prev))
            else:
                conn.execute("DELETE FROM event_marks WHERE event_id=? AND date=?", (eid, date))
        elif op[0] == "until":
            conn.execute("UPDATE events SET until=? WHERE id=?", (op[2], op[1]))
        elif op[0] == "event":
            ev, marks = op[1], op[2]
            cols = list(ev)
            conn.execute(f"INSERT INTO events ({','.join(cols)}) VALUES ({','.join('?' * len(cols))})", [ev[c] for c in cols])
            for mk in marks:
                conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,?)",
                             (mk["event_id"], mk["date"], mk["state"]))
    conn.commit()
    conn.close()
    history.log("Calendar: undid a removal")
    return {"ok": True, "restored": len(ops)}


class DoneReq(BaseModel):
    date: str
    done: bool = True


@router.post("/calendar/events/{eid}/done")
def mark_done(eid: int, r: DoneReq):
    conn = get_db()
    if r.done:
        conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,'done')", (eid, r.date))
    else:
        conn.execute("DELETE FROM event_marks WHERE event_id=? AND date=? AND state='done'", (eid, r.date))
    row = conn.execute("SELECT title FROM events WHERE id=?", (eid,)).fetchone()
    conn.commit()
    conn.close()
    if row and r.done:
        history.log(f"Done: {row['title']}", r.date)
    return {"ok": True}


# ---------------- workouts ----------------
# Two full-body sessions, alternated on workout days (A, B, A, B...). Rep ranges use "double progression":
# when every set reaches the top of the range, the weight goes up next time.
PROGRAM = {
    "A": [
        dict(id="goblet_squat", bw_cue="Feet shoulder-width, arms forward, sit down between your heels, chest up, knees follow toes.", name="Goblet squat", bw="Bodyweight squat", sets=3, lo=8, hi=12, step=2.0,
             cue="Hold one dumbbell upright at your chest. Sit down between your heels, chest up, knees follow toes."),
        dict(id="floor_press", bw_cue="Hands a bit wider than shoulders, body straight, lower your chest to the floor and push back up.", name="Dumbbell floor / bench press", bw="Push-up (on knees or a table if needed)", sets=3, lo=8, hi=12, step=2.0,
             cue="Lie on the floor or a bench, elbows about 45° from your body, press up until arms are straight."),
        dict(id="one_arm_row", bw_cue="Fill a backpack with books, hold it by the strap, hand and knee on a chair, pull to your hip.", name="One-arm dumbbell row", bw="Backpack row (bag with books)", sets=3, lo=8, hi=12, step=2.0, per_side=True,
             cue="Hand and knee on a chair or bench, flat back, pull the weight to your hip, lower slowly."),
        dict(id="rdl", bw_cue="Stand on one leg, soft knee, tip forward from the hips with a flat back until you feel the hamstring, stand back up.", name="Dumbbell Romanian deadlift", bw="Single-leg hip hinge", sets=3, lo=8, hi=12, step=2.0,
             cue="Soft knees, push your hips back and slide the weights down your thighs with a flat back. Stand up by squeezing your glutes."),
        dict(id="shoulder_press", bw_cue="Hands on the floor, hips high in an upside-down V, bend the elbows to bring your head toward the floor, press back.", name="Standing shoulder press", bw="Pike push-up", sets=2, lo=8, hi=12, step=1.0,
             cue="Brace your stomach, press the dumbbells overhead without leaning back."),
        dict(id="plank", name="Plank", bw="Plank", sets=3, lo=30, hi=60, step=0, unit="s", bodyweight=True,
             cue="Forearms down, body in a straight line, squeeze glutes. Add 5 seconds when it feels easy."),
    ],
    "B": [
        dict(id="split_squat", name="Dumbbell split squat", bw="Bodyweight split squat", sets=3, lo=8, hi=12, step=2.0, per_side=True,
             cue="Long stance, back knee lowers straight down toward the floor, front heel stays planted."),
        dict(id="incline_pushup", name="Push-up", bw="Push-up", sets=3, lo=6, hi=15, step=0, bodyweight=True,
             cue="Hands under shoulders, body straight. Use a table or knees until you can do 10 clean reps."),
        dict(id="bent_row", bw_cue="Hold a loaded backpack with both hands, hinge forward with a flat back, pull it to your stomach.", name="Two-dumbbell bent-over row", bw="Backpack bent-over row", sets=3, lo=10, hi=12, step=2.0,
             cue="Hinge forward with a flat back, pull both elbows back toward your hips."),
        dict(id="hip_thrust", bw_cue="Lie on your back, knees bent, drive your hips up through your heels and squeeze at the top for a second.", name="Dumbbell hip thrust / glute bridge", bw="Glute bridge", sets=3, lo=10, hi=15, step=2.0,
             cue="Upper back on a couch or floor, dumbbell on hips, drive up through your heels and pause at the top."),
        dict(id="lateral_raise", bw_cue="Two full water bottles, raise to shoulder height with slightly bent elbows, lower slowly.", name="Lateral raise", bw="Water-bottle lateral raise", sets=2, lo=12, hi=15, step=1.0,
             cue="Light weight, raise to shoulder height with slightly bent elbows, lower slowly."),
        dict(id="curl", bw_cue="Hold a loaded backpack by the top handle, elbows at your sides, curl up without swinging.", name="Biceps curl", bw="Backpack curl", sets=2, lo=10, hi=12, step=1.0,
             cue="Elbows fixed at your sides, no swinging."),
        dict(id="oh_triceps", bw_cue="Hands on the edge of a sturdy chair behind you, bend the elbows to lower, push back up. Keep shoulders down.", name="Overhead triceps extension", bw="Bench / chair dips", sets=2, lo=10, hi=12, step=1.0,
             cue="One dumbbell held with both hands overhead, lower behind your head, extend fully."),
        dict(id="dead_bug", name="Dead bug", bw="Dead bug", sets=3, lo=8, hi=12, step=0, per_side=True, bodyweight=True,
             cue="Lower back pressed into the floor, extend opposite arm and leg slowly."),
    ],
}
WARMUP = "5 min warm-up: brisk walk or jumping jacks, then 10 arm circles, 10 hip hinges, 10 bodyweight squats."
NOTES = ("Rest 60–90 s between sets. Pick a weight where the last 2 reps are hard but your form stays clean. "
         "Stop if anything hurts (sharp pain, not normal muscle effort).")


def _all_ex():
    return {e["id"]: e for s in PROGRAM.values() for e in s}


def _equipment():
    return config.get("equipment") or "none"


def _last_session(before: str | None = None):
    conn = get_db()
    sql = "SELECT date, session FROM workout_sets"
    args = []
    if before:
        sql += " WHERE date < ?"; args.append(before)
    row = conn.execute(sql + " ORDER BY date DESC, id DESC LIMIT 1", args).fetchone()
    conn.close()
    return dict(row) if row else None


def _suggest(ex: dict, equipment: str):
    """Target for next time from the last time this exercise was logged."""
    conn = get_db()
    last = conn.execute("SELECT date FROM workout_sets WHERE exercise=? ORDER BY date DESC LIMIT 1", (ex["id"],)).fetchone()
    sets = []
    if last:
        sets = [dict(r) for r in conn.execute(
            "SELECT set_no, weight, reps, equipment FROM workout_sets WHERE exercise=? AND date=? ORDER BY set_no",
            (ex["id"], last["date"])).fetchall()]
    conn.close()
    use_bw = ex.get("bodyweight") or equipment != "dumbbells"
    unit = ex.get("unit", "reps")
    if not sets:
        return {"weight": None if use_bw else 0, "reps": ex["lo"], "last": None,
                "tip": "First time: find a weight you can lift for the low end of the range with good form."
                if not use_bw else f"Aim for {ex['lo']}–{ex['hi']} {unit}."}
    w = max(s["weight"] or 0 for s in sets)
    reps = [s["reps"] or 0 for s in sets]
    last = {"date": last["date"], "sets": sets}
    if all(r >= ex["hi"] for r in reps) and len(sets) >= ex["sets"]:
        if use_bw or not ex["step"]:
            tip = f"You hit {ex['hi']} {unit} on every set. Add {5 if unit == 's' else 1} more or use a harder version."
            return {"weight": None, "reps": ex["hi"] + (5 if unit == "s" else 1), "last": last, "tip": tip}
        return {"weight": round(w + ex["step"], 1), "reps": ex["lo"], "last": last,
                "tip": f"All sets at {ex['hi']}: go up to {round(w + ex['step'], 1)} kg and start again at {ex['lo']}."}
    if min(reps) < ex["lo"] and not use_bw and w > ex["step"]:
        return {"weight": w, "reps": ex["lo"], "last": last,
                "tip": f"Below {ex['lo']} reps last time: stay at {w} kg (or drop {ex['step']} kg) and build up."}
    more = "5 more seconds per set" if unit == "s" else "one more rep per set"
    return {"weight": None if use_bw else w, "reps": min(ex["hi"], max(reps) + (5 if unit == "s" else 1)), "last": last,
            "tip": f"Same {'weight' if not use_bw else 'version'}, try {more} than last time."}


@router.get("/workouts/program")
def program():
    return {"program": PROGRAM, "warmup": WARMUP, "notes": NOTES, "equipment": _equipment()}


@router.get("/workouts/today")
def today(day: str | None = None, session: str | None = None):
    day = day or date.today().isoformat()
    conn = get_db()
    logged = [dict(r) for r in conn.execute("SELECT * FROM workout_sets WHERE date=? ORDER BY exercise, set_no", (day,)).fetchall()]
    conn.close()
    if not session:
        if logged:
            session = logged[0]["session"]
        else:
            prev = _last_session(day)
            session = "B" if prev and prev["session"] == "A" else "A"
    eq = _equipment()
    exercises = []
    for ex in PROGRAM[session]:
        use_bw = ex.get("bodyweight") or eq != "dumbbells"
        exercises.append({**ex, "display": ex["bw"] if use_bw else ex["name"], "uses_weight": not use_bw,
                          "cue": (ex.get("bw_cue") or ex["cue"]) if use_bw else ex["cue"],
                          "suggest": _suggest(ex, eq),
                          "logged": [s for s in logged if s["exercise"] == ex["id"]]})
    return {"date": day, "session": session, "equipment": eq, "warmup": WARMUP, "notes": NOTES,
            "exercises": exercises, "done": bool(logged)}


class SetItem(BaseModel):
    exercise: str
    set_no: int
    weight: float = 0
    reps: int = 0


class LogReq(BaseModel):
    date: str
    session: str
    sets: list[SetItem]


@router.post("/workouts/log")
def log_workout(r: LogReq):
    if r.session not in PROGRAM:
        raise HTTPException(400, "Unknown session")
    eq = _equipment()
    conn = get_db()
    conn.execute("DELETE FROM workout_sets WHERE date=?", (r.date,))
    n = 0
    for s in r.sets:
        if s.reps <= 0:
            continue
        conn.execute("""INSERT INTO workout_sets (date, session, exercise, set_no, weight, reps, equipment, created_at)
            VALUES (?,?,?,?,?,?,?,?)""", (r.date, r.session, s.exercise, s.set_no, s.weight or 0, s.reps, eq, now()))
        n += 1
    # tick the workout in the calendar for that day (an extra session gets its own entry)
    ticked = False
    for ev in conn.execute("SELECT * FROM events WHERE kind='workout'").fetchall():
        if _occurs(dict(ev), _d(r.date)):
            conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,'done')", (ev["id"], r.date))
            ticked = True
    if not ticked and n:
        cur = conn.execute("""INSERT INTO events (title, date, kind, notes, repeat, created_at)
            VALUES (?,?,'workout','Extra session','none',?)""", (f"Workout {r.session}", r.date, now()))
        conn.execute("INSERT INTO event_marks (event_id, date, state) VALUES (?,?,'done')", (cur.lastrowid, r.date))
    conn.commit()
    conn.close()
    names = _all_ex()
    vol = sum((s.weight or 0) * s.reps for s in r.sets)
    history.log(f"Workout {r.session} logged", f"{r.date}: {n} sets" + (f", {round(vol)} kg total volume" if vol else ""))
    return {"ok": True, "sets": n}


class SetupReq(BaseModel):
    weekdays: list[int] = [0, 2, 4]
    time: str = "18:00"
    equipment: str | None = None
    start: str | None = None


@router.post("/workouts/setup")
def setup(r: SetupReq):
    """Puts the workout days in the calendar (replaces an earlier program schedule)."""
    if r.equipment in ("none", "dumbbells"):
        config.save_settings({"equipment": r.equipment})
    days = sorted({d for d in r.weekdays if 0 <= d <= 6})
    if not days:
        raise HTTPException(400, "Pick at least one day")
    start = r.start or date.today().isoformat()
    conn = get_db()
    conn.execute("UPDATE events SET until=? WHERE kind='workout' AND notes LIKE '%[program]%' AND (until='' OR until>=?)",
                 ((_d(start) - timedelta(days=1)).isoformat(), start))
    conn.execute("""INSERT INTO events (title, date, start, end, kind, notes, repeat, weekdays, until, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)""", ("Workout", start, r.time, "", "workout", "Dumbbell program [program]",
                                          "weekly", ",".join(map(str, days)), "", now()))
    conn.commit()
    conn.close()
    names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    history.log("Workout schedule set", f"{', '.join(names[d] for d in days)} at {r.time}, equipment: {_equipment()}")
    return {"ok": True}


class EquipReq(BaseModel):
    equipment: str


@router.post("/workouts/equipment")
def set_equipment(r: EquipReq):
    if r.equipment not in ("none", "dumbbells"):
        raise HTTPException(400, "equipment must be none or dumbbells")
    config.save_settings({"equipment": r.equipment})
    history.log("Workout equipment", "dumbbells" if r.equipment == "dumbbells" else "bodyweight only")
    return {"equipment": r.equipment}


@router.get("/workouts/progress")
def progress():
    conn = get_db()
    rows = [dict(r) for r in conn.execute(
        "SELECT date, exercise, MAX(weight) AS weight, SUM(reps) AS reps, COUNT(*) AS sets FROM workout_sets "
        "GROUP BY date, exercise ORDER BY date").fetchall()]
    sessions = conn.execute("SELECT COUNT(DISTINCT date) FROM workout_sets").fetchone()[0]
    conn.close()
    names = _all_ex()
    out = {}
    for r in rows:
        ex = names.get(r["exercise"])
        if not ex:
            continue
        out.setdefault(r["exercise"], {"name": ex["name"], "unit": ex.get("unit", "reps"), "points": []})["points"].append(r)
    # streak: workouts in the last 28 days
    since = (date.today() - timedelta(days=28)).isoformat()
    recent = len({r["date"] for r in rows if r["date"] >= since})
    return {"exercises": out, "sessions": sessions, "last_28_days": recent}


# ---------------- Today ----------------
def today_summary(day: str | None = None):
    d = _d(day) if day else date.today()
    ds, ys = d.isoformat(), (d - timedelta(days=1)).isoformat()
    events = occurrences(ds, ds)
    left = [e for e in occurrences(ys, ys) if not e["done"] and e["kind"] != "workout"]
    w_events = [e for e in events if e["kind"] == "workout"]
    conn = get_db()
    logged = conn.execute("SELECT session FROM workout_sets WHERE date=? LIMIT 1", (ds,)).fetchone()
    conn.close()
    if logged:
        session = logged["session"]
    else:
        prev = _last_session(ds)
        session = "B" if prev and prev["session"] == "A" else "A"
    since = (d - timedelta(days=28)).isoformat()
    conn = get_db()
    recent = conn.execute("SELECT COUNT(DISTINCT date) FROM workout_sets WHERE date > ? AND date <= ?", (since, ds)).fetchone()[0]
    conn.close()
    now = datetime.now().strftime("%H:%M") if d == date.today() else None
    nxt = next((e for e in events if e["start"] and now and e["start"] >= now and not e["done"]), None)
    return {"date": ds, "events": events, "yesterday": ys, "yesterday_unfinished": left,
            "workout": {"due": bool(w_events), "done": bool(logged) or any(e["done"] for e in w_events),
                        "session": session, "time": w_events[0]["start"] if w_events else "", "last_28_days": recent},
            "next": nxt, "now": now, "notes": _day_notes(ds)}


def _day_notes(ds: str):
    try:
        from .notes import for_day
        return [{k: n[k] for k in ("id", "title", "body", "pinned", "todo", "done")}
                for n in for_day(ds) if "weekly-review" not in n["tags"]][:6]
    except Exception:
        return []


@router.get("/today")
def r_today(day: str | None = None):
    return today_summary(day)


class MoveReq(BaseModel):
    from_date: str
    to_date: str


@router.post("/calendar/events/{eid}/move")
def move_event(eid: int, r: MoveReq):
    """Move one day's block to another day. One-off events just change date; repeating ones get a one-off copy."""
    conn = get_db()
    ev = conn.execute("SELECT * FROM events WHERE id=?", (eid,)).fetchone()
    if not ev:
        conn.close()
        raise HTTPException(404, "Event not found")
    ev = dict(ev)
    if ev["repeat"] == "none":
        conn.execute("UPDATE events SET date=? WHERE id=?", (r.to_date, eid))
        conn.execute("DELETE FROM event_marks WHERE event_id=?", (eid,))
    else:
        conn.execute("INSERT OR REPLACE INTO event_marks (event_id, date, state) VALUES (?,?,'skip')", (eid, r.from_date))
        conn.execute("""INSERT INTO events (title, date, start, end, kind, notes, repeat, weekdays, until, created_at)
            VALUES (?,?,?,?,?,?,'none','','',?)""", (ev["title"], r.to_date, ev["start"], ev["end"], ev["kind"],
                                                     ev["notes"].replace("[program]", "").strip(), now()))
    conn.commit()
    conn.close()
    history.log(f"Calendar: moved {ev['title']}", f"{r.from_date} → {r.to_date}")
    return {"ok": True}


# ---------------- reminder settings ----------------
class ReminderSettings(BaseModel):
    hotkey: bool | None = None
    reminders: bool | None = None
    reminder_minutes: int | None = None
    daily_summary: bool | None = None
    background: bool | None = None
    start_with_windows: bool | None = None


def _rem_status():
    from ..core import reminders
    s = config.load_settings()
    return {"reminders": bool(s.get("reminders", True)), "reminder_minutes": int(s.get("reminder_minutes") or 10),
            "daily_summary": bool(s.get("daily_summary", True)), "background": bool(s.get("background", True)),
            "start_with_windows": reminders.startup_enabled(), "hotkey": reminders.hotkey_enabled()}


@router.get("/reminders/settings")
def rem_settings():
    return _rem_status()


@router.post("/reminders/settings")
def rem_save(r: ReminderSettings):
    from ..core import reminders
    upd = {k: v for k, v in r.model_dump().items() if v is not None and k not in ("start_with_windows", "hotkey")}
    if r.hotkey is not None:
        try:
            reminders.set_hotkey(r.hotkey)
        except Exception as e:
            raise HTTPException(400, str(e))
        history.log("Shortcut Ctrl+Alt+D " + ("on" if r.hotkey else "off"))
    if "reminder_minutes" in upd:
        upd["reminder_minutes"] = max(0, min(120, upd["reminder_minutes"]))
    if upd:
        config.save_settings(upd)
    if r.start_with_windows is not None:
        try:
            reminders.set_startup(r.start_with_windows)
        except Exception as e:
            raise HTTPException(400, str(e))
        history.log("Start with Windows " + ("on" if r.start_with_windows else "off"))
    if upd:
        history.log("Reminder settings changed", ", ".join(f"{k.replace('_', ' ')}: {v}" for k, v in upd.items()))
    return _rem_status()


@router.post("/reminders/test")
def rem_test():
    from ..core import reminders
    ok = reminders.notify("Data Assistant reminders work", "You'll get a note like this before each planned block.")
    if not ok:
        raise HTTPException(500, "Windows didn't accept the notification. Check Settings > System > Notifications.")
    return {"ok": True}
