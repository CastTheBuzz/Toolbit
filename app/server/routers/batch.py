"""Batch mode: run one action over many files (convert, compress, resize, rename, zip) with progress."""
from __future__ import annotations

import re
import zipfile
from datetime import date

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import files, history, jobs
from ..core.errors import friendly
from . import audio, data, image, pdf, video

router = APIRouter(prefix="/api/batch", tags=["batch"])
jobs_router = APIRouter(prefix="/api/jobs", tags=["jobs"])

# action -> (label, kinds it accepts)
ACTIONS = {
    "image": ("Convert / resize / compress images", {"image"}),
    "audio_convert": ("Convert audio", {"audio", "video"}),
    "audio_normalize": ("Even out loudness (normalize)", {"audio"}),
    "video_convert": ("Convert video", {"video"}),
    "video_compress": ("Compress video", {"video"}),
    "video_audio": ("Extract audio from videos", {"video"}),
    "pdf_compress": ("Compress PDFs", {"pdf"}),
    "pdf_images": ("PDF pages to images", {"pdf"}),
    "pdf_text": ("PDF to Word / text", {"pdf"}),
    "doc_convert": ("Convert documents / tables", {"data", "document", "pdf"}),
    "rename": ("Rename", None),
    "zip": ("Put into one ZIP", None),
}


class BatchReq(BaseModel):
    file_ids: list[str]
    action: str
    options: dict = {}


def _rename_name(pattern: str, f: dict, n: int, total: int, find: str = "", repl: str = "") -> str:
    stem, ext = files.stem(f["name"]), files.ext_of(f["name"])
    if find:
        stem = stem.replace(find, repl)
    width = max(2, len(str(total)))
    out = (pattern or "{name}")
    out = re.sub(r"\{n(?::(\d+))?\}", lambda m: str(n).zfill(int(m.group(1)) if m.group(1) else width), out)
    out = (out.replace("{name}", stem).replace("{date}", date.today().isoformat())
           .replace("{NAME}", stem.upper()).replace("{lower}", stem.lower()))
    return f"{out.strip() or stem}.{ext}" if ext else out


def preview_rename(file_ids: list[str], options: dict) -> list[dict]:
    fs = [files.get_file(i) for i in file_ids]
    out, seen = [], set()
    for k, f in enumerate(fs, options.get("start", 1)):
        to = _rename_name(options.get("pattern", "{name}"), f, k, len(fs), options.get("find", ""),
                          options.get("replace", ""))
        base, n = to, 2
        while to.lower() in seen:            # two files can't get the same name
            stem, dot, ext = base.rpartition(".")
            to = f"{stem} ({n}).{ext}" if dot else f"{base} ({n})"
            n += 1
        seen.add(to.lower())
        out.append({"from": f["name"], "to": to})
    return out


def _one(action: str, f: dict, o: dict):
    fid = f["id"]
    if action == "image":
        return image.edit_one(fid, image.EditReq(file_ids=[fid], **{k: v for k, v in o.items() if v not in ("", None)}))
    if action == "audio_convert":
        return audio.convert(audio.ConvertReq(file_id=fid, format=o.get("format", "mp3"), bitrate=o.get("bitrate", "192k")))
    if action == "audio_normalize":
        return audio.effects(audio.EffectsReq(file_id=fid, normalize=True))
    if action == "video_convert":
        return video.convert(video.ConvertReq(file_id=fid, format=o.get("format", "mp4")))
    if action == "video_compress":
        return video.compress(video.CompressReq(file_id=fid, quality=o.get("quality", "medium"),
                                                max_height=o.get("max_height") or None))
    if action == "video_audio":
        return video.extract_audio(video.ExtractReq(file_id=fid, format=o.get("format", "mp3")))
    if action == "pdf_compress":
        return pdf.compress(pdf.FileReq(file_id=fid))
    if action == "pdf_images":
        return pdf.to_images(pdf.ToImagesReq(file_id=fid, format=o.get("format", "png"), dpi=int(o.get("dpi", 150))))
    if action == "pdf_text":
        return pdf.to_text(pdf.ToTextReq(file_id=fid, format=o.get("format", "docx")))
    if action == "doc_convert":
        req = data.ConvertReq(file_id=fid, format=o.get("format", "pdf"))
        return data.convert_table(req) if f["kind"] == "data" else data.convert_document(req)
    raise HTTPException(400, f"Unknown action {action}")


def run_batch(job, r: BatchReq) -> dict:
    if r.action not in ACTIONS:
        raise HTTPException(400, f"Unknown action {r.action}")
    fs = [files.get_file(i) for i in dict.fromkeys(r.file_ids)]
    if not fs:
        raise HTTPException(400, "Pick some files first")
    label, kinds = ACTIONS[r.action]
    outs, errors, skipped = [], [], []
    if r.action == "zip":
        name = r.options.get("name") or (f"{files.stem(fs[0]['name'])} + {len(fs) - 1} file{'s' if len(fs) > 2 else ''}"
                                         if len(fs) > 1 else files.stem(fs[0]["name"]))
        p = files.output_path(name, "zip", "Documents")
        used = set()
        with zipfile.ZipFile(p, "w", zipfile.ZIP_DEFLATED) as z:
            for k, f in enumerate(fs):
                job.step(k, len(fs), f["name"])
                arc = f["name"]
                while arc in used:
                    arc = f"{files.stem(arc)} (2).{files.ext_of(arc)}"
                used.add(arc)
                z.write(f["path"], arc)
        outs.append(files.register_output(p, "batch.zip"))
    elif r.action == "rename":
        for k, (f, nm) in enumerate(zip(fs, preview_rename(r.file_ids, r.options))):
            job.step(k, len(fs), f["name"])
            try:
                outs.append(files.rename_file(f["id"], nm["to"]))
            except HTTPException as e:
                errors.append(f"{f['name']}: {e.detail}")
    else:
        for k, f in enumerate(fs):
            if job.cancelled:
                errors.append("Stopped before the rest")
                break
            job.step(k, len(fs), f"{k + 1}/{len(fs)} · {f['name']}")
            if kinds and f["kind"] not in kinds:
                skipped.append(f["name"])
                continue
            try:
                res = _one(r.action, f, r.options)
                outs += res if isinstance(res, list) else [res]
            except HTTPException as e:
                d = friendly(str(e.detail))
                errors.append(d if f["name"] in d else f"{f['name']}: {d}")
            except Exception as e:
                errors.append(f"{f['name']}: {friendly(f'{type(e).__name__}: {e}')}")
    job.step(len(fs), len(fs), "Done")
    history.log(f"Batch: {label} ({len(fs)} files)", f"{len(outs)} done, {len(errors)} failed, {len(skipped)} skipped",
                kind="batch")
    return {"files": outs, "errors": errors, "skipped": skipped, "action": r.action}


@router.get("/actions")
def r_actions():
    return {"actions": [{"id": k, "label": v[0], "kinds": sorted(v[1]) if v[1] else None} for k, v in ACTIONS.items()]}


@router.post("")
def r_batch(r: BatchReq):
    return jobs.start("batch", run_batch, r)


@router.post("/rename-preview")
def r_preview(r: BatchReq):
    return {"names": preview_rename(r.file_ids, r.options)}


@jobs_router.get("/{jid}")
def r_job(jid: str):
    return jobs.get(jid)


@jobs_router.post("/{jid}/cancel")
def r_cancel(jid: str):
    return jobs.cancel(jid)
