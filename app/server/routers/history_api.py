from fastapi import APIRouter

from ..core import config, history

router = APIRouter(prefix="/api/history", tags=["history"])


@router.get("")
def list_history(kind: str | None = None, q: str = "", limit: int = 300, before_id: int | None = None):
    return {"entries": history.entries(kind or None, q, min(limit, 1000), before_id)}


@router.post("/open-folder")
def open_folder():
    from .files import _open
    p = config.output_dir() / "History"
    p.mkdir(parents=True, exist_ok=True)
    _open(str(p))
    return {"ok": True}
