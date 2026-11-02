"""PDF tools: merge, split, extract pages, rotate, compress, protect/unlock, to images, to text/Word."""
from __future__ import annotations
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.lazy import Lazy
_pypdf = Lazy("pypdf")


def PdfReader(*a, **k):
    return _pypdf.PdfReader(*a, **k)


def PdfWriter(*a, **k):
    return _pypdf.PdfWriter(*a, **k)

from ..core import files
from ..core.parse import pdf_text

router = APIRouter(prefix="/api/pdf", tags=["pdf"])


def parse_ranges(spec: str, n: int):
    """'1-3,5,8-' -> [0,1,2,4,7..n-1] (1-based input)."""
    pages = []
    spec = (spec or "").replace(" ", "")
    if not spec:
        return list(range(n))
    for part in spec.split(","):
        if not part:
            continue
        if "-" in part:
            a, b = part.split("-", 1)
            a = int(a) if a else 1
            b = int(b) if b else n
            pages.extend(range(a - 1, min(b, n)))
        else:
            pages.append(int(part) - 1)
    bad = [p + 1 for p in pages if p < 0 or p >= n]
    if bad:
        raise HTTPException(400, f"Page(s) {bad} out of range (document has {n} pages)")
    return pages


def _reader(fid, password=None):
    f = files.get_file(fid)
    r = PdfReader(f["path"])
    if r.is_encrypted:
        if not password or not r.decrypt(password):
            raise HTTPException(400, "PDF is password protected. Enter the password.")
    return f, r


class MergeReq(BaseModel):
    file_ids: list[str]
    name: str | None = None


def merge(r: MergeReq):
    if len(r.file_ids) < 2:
        raise HTTPException(400, "Pick at least 2 PDFs")
    w = PdfWriter()
    first = None
    for fid in r.file_ids:
        f, rd = _reader(fid)
        first = first or f
        for p in rd.pages:
            w.add_page(p)
    out = files.output_path(r.name or f"{files.stem(first['name'])} merged", "pdf", "PDF")
    with open(out, "wb") as fh:
        w.write(fh)
    return files.register_output(out, "pdf.merge")


class SplitReq(BaseModel):
    file_id: str
    mode: str = "ranges"   # ranges (one file with those pages) / each (one file per page) / groups ("1-3;4-6")
    ranges: str = ""


def split(r: SplitReq):
    f, rd = _reader(r.file_id)
    n = len(rd.pages)
    outs = []
    if r.mode == "each":
        for i in parse_ranges(r.ranges, n):
            w = PdfWriter()
            w.add_page(rd.pages[i])
            out = files.output_path(f"{files.stem(f['name'])} - page {i + 1}", "pdf", f"PDF/{files.safe_name(files.stem(f['name']))[:60]} pages")
            with open(out, "wb") as fh:
                w.write(fh)
            outs.append(files.register_output(out, "pdf.split"))
    elif r.mode == "groups":
        for grp in [g for g in r.ranges.split(";") if g.strip()]:
            w = PdfWriter()
            for i in parse_ranges(grp, n):
                w.add_page(rd.pages[i])
            out = files.output_path(f"{files.stem(f['name'])} - pages {grp.strip()}", "pdf", f"PDF/{files.safe_name(files.stem(f['name']))[:60]} pages")
            with open(out, "wb") as fh:
                w.write(fh)
            outs.append(files.register_output(out, "pdf.split"))
    else:
        w = PdfWriter()
        for i in parse_ranges(r.ranges, n):
            w.add_page(rd.pages[i])
        out = files.output_path(f"{files.stem(f['name'])} - pages {r.ranges or 'all'}", "pdf", "PDF")
        with open(out, "wb") as fh:
            w.write(fh)
        outs.append(files.register_output(out, "pdf.extract"))
    return outs


class RotateReq(BaseModel):
    file_id: str
    angle: int = 90
    ranges: str = ""


def rotate(r: RotateReq):
    f, rd = _reader(r.file_id)
    sel = set(parse_ranges(r.ranges, len(rd.pages)))
    w = PdfWriter()
    for i, p in enumerate(rd.pages):
        if i in sel:
            p.rotate(r.angle)
        w.add_page(p)
    out = files.output_path(f"{files.stem(f['name'])} - rotated", "pdf", "PDF")
    with open(out, "wb") as fh:
        w.write(fh)
    return files.register_output(out, "pdf.rotate")


class FileReq(BaseModel):
    file_id: str
    password: str | None = None


def compress(r: FileReq):
    f, rd = _reader(r.file_id, r.password)
    w = PdfWriter(clone_from=rd)
    for p in w.pages:
        p.compress_content_streams()
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
    out = files.output_path(f"{files.stem(f['name'])} - compressed", "pdf", "PDF")
    with open(out, "wb") as fh:
        w.write(fh)
    from pathlib import Path
    if Path(out).stat().st_size >= Path(f["path"]).stat().st_size:
        Path(out).unlink(missing_ok=True)
        raise HTTPException(400, f"{f['name']} is already as small as it gets, so nothing was saved.")
    return files.register_output(out, "pdf.compress")


class ProtectReq(BaseModel):
    file_id: str
    password: str
    unlock: bool = False


def protect(r: ProtectReq):
    if r.unlock:
        f, rd = _reader(r.file_id, r.password)
        w = PdfWriter(clone_from=rd)
        out = files.output_path(f"{files.stem(f['name'])} - unlocked", "pdf", "PDF")
    else:
        f, rd = _reader(r.file_id)
        w = PdfWriter(clone_from=rd)
        w.encrypt(r.password, algorithm="AES-256")
        out = files.output_path(f"{files.stem(f['name'])} - protected", "pdf", "PDF")
    with open(out, "wb") as fh:
        w.write(fh)
    return files.register_output(out, "pdf.protect")


class ToImagesReq(BaseModel):
    file_id: str
    format: str = "png"
    dpi: int = 150
    ranges: str = ""


def to_images(r: ToImagesReq):
    import pypdfium2 as pdfium
    f = files.get_file(r.file_id)
    doc = pdfium.PdfDocument(f["path"])
    fmt = r.format if r.format in ("png", "jpg", "webp") else "png"
    outs = []
    for i in parse_ranges(r.ranges, len(doc)):
        img = doc[i].render(scale=r.dpi / 72).to_pil()
        if fmt == "jpg":
            img = img.convert("RGB")
        out = files.output_path(f"{files.stem(f['name'])} - page {i + 1}", fmt, f"Images/{files.safe_name(files.stem(f['name']))[:60]} pages")
        img.save(out, "JPEG" if fmt == "jpg" else fmt.upper(), quality=92)
        outs.append(files.register_output(out, "pdf.to_images"))
    doc.close()
    return outs


class ToTextReq(BaseModel):
    file_id: str
    format: str = "txt"    # txt / docx / md


def to_text(r: ToTextReq):
    f = files.get_file(r.file_id)
    text = pdf_text(f["path"], max_pages=2000)
    if not text.strip():
        raise HTTPException(400, f"{f['name']} has no text to copy (it looks like a scan or photos of pages).")
    fmt = r.format if r.format in ("txt", "docx", "md") else "txt"
    out = files.output_path(files.stem(f["name"]), fmt, "Documents")
    if fmt == "docx":
        import docx
        d = docx.Document()
        for para in text.split("\n"):
            d.add_paragraph(para)
        d.save(out)
    else:
        out.write_text(text, encoding="utf-8")
    return files.register_output(out, "pdf.to_text")


@router.get("/{fid}/info")
def info(fid: str):
    f = files.get_file(fid)
    rd = PdfReader(f["path"])
    if rd.is_encrypted:
        return {"pages": None, "encrypted": True}
    meta = {k.strip("/"): str(v) for k, v in (rd.metadata or {}).items()}
    return {"pages": len(rd.pages), "encrypted": False, "metadata": meta}


@router.post("/merge")
def r_merge(r: MergeReq): return {"file": merge(r)}
@router.post("/split")
def r_split(r: SplitReq): return {"files": split(r)}
@router.post("/rotate")
def r_rotate(r: RotateReq): return {"file": rotate(r)}
@router.post("/compress")
def r_compress(r: FileReq): return {"file": compress(r)}
@router.post("/protect")
def r_protect(r: ProtectReq): return {"file": protect(r)}
@router.post("/to-images")
def r_images(r: ToImagesReq): return {"files": to_images(r)}
@router.post("/to-text")
def r_text(r: ToTextReq): return {"file": to_text(r)}
