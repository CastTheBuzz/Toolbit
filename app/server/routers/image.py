"""Image tools: convert, resize, compress, rotate/flip, crop, grayscale, images -> PDF (batch)."""
from __future__ import annotations
from fastapi import APIRouter, HTTPException
from ..core.lazy import Lazy
Image = Lazy("PIL.Image")
ImageOps = Lazy("PIL.ImageOps")
from pydantic import BaseModel

from ..core import files

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except Exception:
    pass

router = APIRouter(prefix="/api/image", tags=["image"])

IMAGE_FORMATS = ["png", "jpg", "webp", "bmp", "gif", "tiff", "ico", "avif", "pdf"]
PIL_NAME = {"jpg": "JPEG", "jpeg": "JPEG", "png": "PNG", "webp": "WEBP", "bmp": "BMP", "gif": "GIF",
            "tiff": "TIFF", "ico": "ICO", "avif": "AVIF", "pdf": "PDF"}


class EditReq(BaseModel):
    file_ids: list[str]
    format: str | None = None
    width: int | None = None
    height: int | None = None
    scale_percent: float | None = None
    keep_aspect: bool = True
    quality: int = 90
    rotate: int = 0
    flip_h: bool = False
    flip_v: bool = False
    grayscale: bool = False
    crop: list[int] | None = None    # [left, top, right, bottom] in pixels
    strip_metadata: bool = True


def _prepare(im: Image.Image, fmt: str):
    if fmt in ("jpg", "jpeg", "bmp", "pdf") and im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        return bg
    if im.mode not in ("RGB", "RGBA", "L", "LA", "P"):
        im = im.convert("RGB")
    return im


def edit_one(fid: str, r: EditReq):
    f = files.get_file(fid)
    src_ext = files.ext_of(f["name"])
    fmt = (r.format or src_ext).lower().lstrip(".")
    if fmt == "jpeg":
        fmt = "jpg"
    if fmt in ("heic", "heif", "tif"):
        fmt = {"tif": "tiff"}.get(fmt, "jpg")
    if fmt not in IMAGE_FORMATS:
        raise HTTPException(400, f"Unsupported image format {fmt}")
    im = Image.open(f["path"])
    im = ImageOps.exif_transpose(im)
    if r.crop and len(r.crop) == 4:
        im = im.crop(tuple(r.crop))
    if r.scale_percent and r.scale_percent > 0:
        im = im.resize((max(1, round(im.width * r.scale_percent / 100)),
                        max(1, round(im.height * r.scale_percent / 100))), Image.LANCZOS)
    elif r.width or r.height:
        if r.keep_aspect:
            w = r.width or 10 ** 6
            h = r.height or 10 ** 6
            ratio = min(w / im.width, h / im.height, 1.0)   # max size: shrink only, never blow small images up
            im = im.resize((max(1, round(im.width * ratio)), max(1, round(im.height * ratio))), Image.LANCZOS)
        else:
            im = im.resize((r.width or im.width, r.height or im.height), Image.LANCZOS)
    if r.rotate % 360:
        im = im.rotate(-r.rotate, expand=True)
    if r.flip_h:
        im = ImageOps.mirror(im)
    if r.flip_v:
        im = ImageOps.flip(im)
    if r.grayscale:
        im = ImageOps.grayscale(im)
    im = _prepare(im, fmt)
    suffix = "" if (fmt != src_ext) and not any([r.width, r.height, r.scale_percent, r.crop]) else " - edited"
    out = files.output_path(files.stem(f["name"]) + suffix, fmt, "Images")
    kw = {}
    if fmt in ("jpg", "webp", "avif"):
        kw["quality"] = max(1, min(r.quality, 100))
        if fmt == "jpg":
            kw["optimize"] = True
            kw["progressive"] = True
    if fmt == "png":
        kw["optimize"] = True
    if fmt == "ico":
        kw["sizes"] = [(s, s) for s in (16, 32, 48, 64, 128, 256) if s <= max(im.size)] or [(16, 16)]
    if not r.strip_metadata and "exif" in im.info:
        kw["exif"] = im.info["exif"]
    im.save(out, PIL_NAME[fmt], **kw)
    return files.register_output(out, "image.edit")


def edit(r: EditReq):
    return [edit_one(fid, r) for fid in r.file_ids]


class ToPdfReq(BaseModel):
    file_ids: list[str]
    name: str | None = None


def images_to_pdf(r: ToPdfReq):
    if not r.file_ids:
        raise HTTPException(400, "No images")
    ims = []
    for fid in r.file_ids:
        im = ImageOps.exif_transpose(Image.open(files.get_file(fid)["path"]))
        ims.append(_prepare(im, "pdf").convert("RGB"))
    first = files.get_file(r.file_ids[0])
    out = files.output_path(r.name or files.stem(first["name"]), "pdf", "PDF")
    ims[0].save(out, "PDF", save_all=True, append_images=ims[1:], resolution=150)
    return files.register_output(out, "image.to_pdf")


@router.post("/edit")
def r_edit(r: EditReq): return {"files": edit(r)}


@router.post("/to-pdf")
def r_topdf(r: ToPdfReq): return {"file": images_to_pdf(r)}
