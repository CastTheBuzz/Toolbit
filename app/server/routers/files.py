import os
import subprocess
import sys
from pathlib import Path

from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel
from fastapi.responses import FileResponse

from ..core import config, files, media

router = APIRouter(prefix="/api/files", tags=["files"])


@router.post("/upload")
def upload(files_in: list[UploadFile] = File(..., alias="files"), folder: str = Form("")):
    out = []
    for f in files_in:
        out.append(files.save_upload(f.filename or "file", f.file, folder))
    return {"files": out}


class FolderReq(BaseModel):
    name: str
    new_name: str | None = None


@router.get("/folders")
def folders():
    return {"folders": files.list_folders()}


@router.post("/folders")
def folder_create(r: FolderReq):
    return {"name": files.create_folder(r.name), "folders": files.list_folders()}


@router.post("/folders/rename")
def folder_rename(r: FolderReq):
    return {"name": files.rename_folder(r.name, r.new_name or ""), "folders": files.list_folders()}


@router.post("/folders/delete")
def folder_delete(r: FolderReq):
    files.delete_folder(r.name)
    return {"folders": files.list_folders()}


class MoveReq(BaseModel):
    folder: str = ""


@router.post("/{fid}/move")
def move(fid: str, r: MoveReq):
    return {"file": files.move_file(fid, r.folder)}


class RenameReq(BaseModel):
    name: str


@router.post("/{fid}/rename")
def rename(fid: str, r: RenameReq):
    return {"file": files.rename_file(fid, r.name)}


@router.get("")
def list_all(kind: str | None = None):
    return {"files": files.list_files(kind)}


@router.delete("/{fid}")
def remove(fid: str):
    files.delete_file(fid)
    return {"ok": True}


@router.get("/{fid}/raw")
def raw(fid: str):
    f = files.get_file(fid)
    return FileResponse(f["path"])


@router.get("/{fid}/download")
def download(fid: str):
    f = files.get_file(fid)
    return FileResponse(f["path"], filename=f["name"])


@router.get("/{fid}/info")
def info(fid: str):
    f = files.get_file(fid)
    d = dict(f)
    if f["kind"] in ("audio", "video"):
        d["media"] = media.probe(f["path"])
    elif f["kind"] == "image":
        try:
            from PIL import Image
            with Image.open(f["path"]) as im:
                d["image"] = {"width": im.width, "height": im.height, "mode": im.mode, "format": im.format}
        except Exception:
            pass
    return d


def _open(path: str, select=False):
    if sys.platform == "win32":
        if select:
            subprocess.Popen(["explorer", "/select,", os.path.normpath(path)])
        else:
            os.startfile(path)  # noqa
    elif sys.platform == "darwin":
        subprocess.Popen(["open", "-R" if select else "", path])
    else:
        subprocess.Popen(["xdg-open", str(Path(path).parent if select else path)])


@router.post("/{fid}/reveal")
def reveal(fid: str):
    f = files.get_file(fid)
    _open(f["path"], select=True)
    return {"ok": True}


@router.post("/{fid}/open")
def open_file(fid: str):
    f = files.get_file(fid)
    _open(f["path"])
    return {"ok": True}


@router.post("/open-output-folder")
def open_output_folder():
    _open(str(config.output_dir()))
    return {"ok": True, "path": str(config.output_dir())}
