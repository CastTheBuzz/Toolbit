"""Background jobs for slow work (batch, subtitles, OCR): start, report progress, poll."""
import threading
import time
import traceback
import uuid
import logging

from fastapi import HTTPException

log = logging.getLogger("da")
_jobs: dict[str, dict] = {}
_lock = threading.Lock()


class Job:
    def __init__(self, jid):
        self.id = jid

    def update(self, **kw):
        with _lock:
            _jobs[self.id].update(kw)

    def step(self, done: int, total: int, msg: str = ""):
        self.update(done=done, total=total, message=msg)

    @property
    def cancelled(self):
        return _jobs[self.id].get("cancel", False)


def start(kind: str, fn, *args) -> dict:
    """Run fn(job, *args) in a thread. fn returns {"files": [...], ...}."""
    jid = uuid.uuid4().hex[:10]
    with _lock:
        # forget finished jobs older than an hour
        for k in [k for k, j in _jobs.items() if j["state"] != "running" and time.time() - j["started"] > 3600]:
            _jobs.pop(k, None)
        _jobs[jid] = {"id": jid, "kind": kind, "state": "running", "done": 0, "total": 0, "message": "Starting…",
                      "started": time.time(), "result": None, "error": None, "errors": []}
    job = Job(jid)

    def run():
        try:
            res = fn(job, *args)
            job.update(state="done", result=res, message="Done")
        except HTTPException as e:
            from .errors import friendly
            job.update(state="error", error=friendly(str(e.detail)))
        except Exception as e:
            log.error("job %s failed\n%s", kind, traceback.format_exc())
            from .errors import friendly
            job.update(state="error", error=friendly(f"{type(e).__name__}: {e}"))

    threading.Thread(target=run, daemon=True, name=f"job-{kind}").start()
    return get(jid)


def get(jid: str) -> dict:
    with _lock:
        j = _jobs.get(jid)
        if not j:
            raise HTTPException(404, "Job not found (the app may have restarted)")
        return {k: v for k, v in j.items() if k != "cancel"}


def cancel(jid: str):
    with _lock:
        if jid in _jobs:
            _jobs[jid]["cancel"] = True
    return {"ok": True}


def wait(jid: str, timeout: float = 3600) -> dict:
    """For the Assistant: block until a job finishes."""
    t0 = time.time()
    while time.time() - t0 < timeout:
        j = get(jid)
        if j["state"] != "running":
            return j
        time.sleep(0.5)
    raise HTTPException(504, "Still running; check the page for progress")
