"""Video tools: trim, merge, convert, compress, transform, extract audio, GIF, thumbnail, add music."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import files, media

router = APIRouter(prefix="/api/video", tags=["video"])
NORM_A = "aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo"


def _vfmt(f, fmt):
    if fmt:
        fmt = fmt.lower().lstrip(".")
        if fmt not in media.VIDEO_FORMATS:
            raise HTTPException(400, f"Unsupported video format {fmt}")
        return fmt
    e = files.ext_of(f["name"])
    return e if e in media.VIDEO_FORMATS and e != "gif" else "mp4"


class TrimReq(BaseModel):
    file_id: str
    start: float = 0
    end: float | None = None
    format: str | None = None
    fast: bool = False   # stream copy (instant, cuts on keyframes)


def trim(r: TrimReq):
    f = files.get_file(r.file_id)
    dur = media.probe(f["path"])["duration"]
    end = r.end if r.end and r.end > 0 else dur
    if end <= r.start:
        raise HTTPException(400, "End must be after start")
    fmt = _vfmt(f, r.format)
    out = files.output_path(f"{files.stem(f['name'])} - cut", fmt, "Video")
    codec = ["-c", "copy"] if r.fast else media.video_args(fmt)
    media.run(["-ss", f"{r.start:.3f}", "-i", f["path"], "-t", f"{end - r.start:.3f}", *codec, out])
    return files.register_output(out, "video.trim")


class MergeReq(BaseModel):
    file_ids: list[str]
    format: str = "mp4"
    name: str | None = None


def merge(r: MergeReq):
    if len(r.file_ids) < 2:
        raise HTTPException(400, "Pick at least 2 videos")
    fs = [files.get_file(i) for i in r.file_ids]
    infos = [media.probe(f["path"]) for f in fs]
    W = infos[0]["width"] or 1280
    H = infos[0]["height"] or 720
    W, H = W - W % 2, H - H % 2
    args, parts, labels = [], [], []
    for f in fs:
        args += ["-i", f["path"]]
    extra = len(fs)
    for i, inf in enumerate(infos):
        parts.append(f"[{i}:v]scale={W}:{H}:force_original_aspect_ratio=decrease,"
                     f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p[v{i}]")
        if inf["has_audio"]:
            parts.append(f"[{i}:a]{NORM_A}[a{i}]")
        else:
            args += ["-f", "lavfi", "-t", f"{inf['duration']:.3f}", "-i", "anullsrc=r=44100:cl=stereo"]
            parts.append(f"[{extra}:a]{NORM_A}[a{i}]")
            extra += 1
        labels.append(f"[v{i}][a{i}]")
    fc = ";".join(parts) + ";" + "".join(labels) + f"concat=n={len(fs)}:v=1:a=1[v][a]"
    fmt = _vfmt(fs[0], r.format)
    out = files.output_path(r.name or f"{files.stem(fs[0]['name'])} merged", fmt, "Video")
    media.run(args + ["-filter_complex", fc, "-map", "[v]", "-map", "[a]", *media.video_args(fmt), out])
    return files.register_output(out, "video.merge")


class ConvertReq(BaseModel):
    file_id: str
    format: str = "mp4"
    crf: int = 23


def convert(r: ConvertReq):
    f = files.get_file(r.file_id)
    fmt = _vfmt(f, r.format) if r.format != "gif" else "gif"
    if fmt == "gif":
        return gif(GifReq(file_id=r.file_id, start=0, duration=0))
    out = files.output_path(files.stem(f["name"]), fmt, "Video")
    media.run(["-i", f["path"], *media.video_args(fmt, r.crf), out])
    return files.register_output(out, "video.convert")


class CompressReq(BaseModel):
    file_id: str
    quality: str = "medium"   # high / medium / small / tiny
    max_height: int | None = None


def compress(r: CompressReq):
    f = files.get_file(r.file_id)
    crf = {"high": 22, "medium": 26, "small": 30, "tiny": 34}.get(r.quality, 26)
    vf = []
    if r.max_height:
        vf = ["-vf", f"scale=-2:'min({r.max_height},ih)'"]
    out = files.output_path(f"{files.stem(f['name'])} - compressed", "mp4", "Video")
    media.run(["-i", f["path"], *vf, "-c:v", "libx264", "-crf", crf, "-preset", "slow", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", out])
    from pathlib import Path
    if Path(out).stat().st_size >= Path(f["path"]).stat().st_size:
        Path(out).unlink(missing_ok=True)
        raise HTTPException(400, f"{f['name']} is already well compressed: a smaller copy came out bigger, so nothing was saved.")
    return files.register_output(out, "video.compress")


class TransformReq(BaseModel):
    file_id: str
    height: int | None = None
    rotate: int = 0          # 90, 180, 270
    flip_h: bool = False
    flip_v: bool = False
    speed: float = 1.0
    mute: bool = False
    volume_db: float = 0
    format: str | None = None


def transform(r: TransformReq):
    f = files.get_file(r.file_id)
    info = media.probe(f["path"])
    vf, af = [], []
    if r.height:
        vf.append(f"scale=-2:{r.height}")
    rot = {90: "transpose=1", 180: "transpose=1,transpose=1", 270: "transpose=2"}.get(r.rotate % 360)
    if rot:
        vf.append(rot)
    if r.flip_h:
        vf.append("hflip")
    if r.flip_v:
        vf.append("vflip")
    if abs(r.speed - 1) > 1e-3:
        vf.append(f"setpts=PTS/{r.speed}")
        af.append(media.atempo_chain(r.speed))
    if r.volume_db:
        af.append(f"volume={r.volume_db}dB")
    fmt = _vfmt(f, r.format)
    args = ["-i", f["path"]]
    if vf:
        args += ["-vf", ",".join(vf)]
    if r.mute or not info["has_audio"]:
        args += ["-an"]
    elif af:
        args += ["-af", ",".join(af)]
    out = files.output_path(f"{files.stem(f['name'])} - edited", fmt, "Video")
    media.run(args + [*media.video_args(fmt), out])
    return files.register_output(out, "video.transform")


class ExtractReq(BaseModel):
    file_id: str
    format: str = "mp3"
    bitrate: str = "192k"


def extract_audio(r: ExtractReq):
    f = files.get_file(r.file_id)
    fmt = r.format if r.format in media.AUDIO_FORMATS else "mp3"
    out = files.output_path(files.stem(f["name"]), fmt, "Audio")
    media.run(["-i", f["path"], "-vn", *media.audio_args(fmt, r.bitrate), out])
    return files.register_output(out, "video.extract_audio")


class GifReq(BaseModel):
    file_id: str
    start: float = 0
    duration: float = 5
    width: int = 480
    fps: int = 12


def gif(r: GifReq):
    f = files.get_file(r.file_id)
    out = files.output_path(files.stem(f["name"]), "gif", "Video")
    pre = ["-ss", r.start] if r.start else []
    t = ["-t", r.duration] if r.duration else []
    vf = (f"fps={r.fps},scale={r.width}:-1:flags=lanczos,split[s0][s1];"
          f"[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4")
    media.run([*pre, *t, "-i", f["path"], "-filter_complex", vf, "-loop", "0", out])
    return files.register_output(out, "video.gif")


class ThumbReq(BaseModel):
    file_id: str
    time: float = 1.0
    format: str = "png"


def thumbnail(r: ThumbReq):
    f = files.get_file(r.file_id)
    fmt = r.format if r.format in ("png", "jpg", "webp") else "png"
    out = files.output_path(f"{files.stem(f['name'])} - frame {r.time:.1f}s", fmt, "Images")
    media.run(["-ss", r.time, "-i", f["path"], "-frames:v", "1", out])
    return files.register_output(out, "video.thumbnail")


class AddAudioReq(BaseModel):
    video_id: str
    audio_id: str
    mode: str = "replace"     # replace / mix
    music_volume_db: float = 0
    loop: bool = False


def add_audio(r: AddAudioReq):
    v = files.get_file(r.video_id)
    a = files.get_file(r.audio_id)
    info = media.probe(v["path"])
    loop = ["-stream_loop", "-1"] if r.loop else []
    args = ["-i", v["path"], *loop, "-i", a["path"]]
    vol = f",volume={r.music_volume_db}dB" if r.music_volume_db else ""
    if r.mode == "mix" and info["has_audio"]:
        fc = f"[1:a]{NORM_A}{vol}[m];[0:a]{NORM_A}[o];[o][m]amix=inputs=2:duration=first:normalize=0[a]"
    else:
        fc = f"[1:a]{NORM_A}{vol}[a]"
    out = files.output_path(f"{files.stem(v['name'])} - with audio", "mp4", "Video")
    media.run(args + ["-filter_complex", fc, "-map", "0:v", "-map", "[a]", "-c:v", "copy",
                      "-c:a", "aac", "-b:a", "192k", "-t", f"{info['duration']:.3f}", out])
    return files.register_output(out, "video.add_audio")


@router.post("/trim")
def r_trim(r: TrimReq): return {"file": trim(r)}
@router.post("/merge")
def r_merge(r: MergeReq): return {"file": merge(r)}
@router.post("/convert")
def r_convert(r: ConvertReq): return {"file": convert(r)}
@router.post("/compress")
def r_compress(r: CompressReq): return {"file": compress(r)}
@router.post("/transform")
def r_transform(r: TransformReq): return {"file": transform(r)}
@router.post("/extract-audio")
def r_extract(r: ExtractReq): return {"file": extract_audio(r)}
@router.post("/gif")
def r_gif(r: GifReq): return {"file": gif(r)}
@router.post("/thumbnail")
def r_thumb(r: ThumbReq): return {"file": thumbnail(r)}
@router.post("/add-audio")
def r_add_audio(r: AddAudioReq): return {"file": add_audio(r)}
