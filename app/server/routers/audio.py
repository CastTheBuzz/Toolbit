"""Audio studio: cut, merge, effects, convert, split, vocal remover, tags, waveform."""
from __future__ import annotations
import base64
import subprocess
from pathlib import Path

from ..core.lazy import np
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import files, media

router = APIRouter(prefix="/api/audio", tags=["audio"])

NORM = "aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo"


def _fmt(f, fmt):
    if fmt:
        fmt = fmt.lower().lstrip(".")
        if fmt not in media.AUDIO_FORMATS:
            raise HTTPException(400, f"Unsupported audio format {fmt}")
        return fmt
    e = files.ext_of(f["name"])
    return e if e in media.AUDIO_FORMATS else "mp3"


def _fades(filters, fade_in, fade_out, duration):
    if fade_in and fade_in > 0:
        filters.append(f"afade=t=in:st=0:d={fade_in}")
    if fade_out and fade_out > 0 and duration > 0:
        filters.append(f"afade=t=out:st={max(duration - fade_out, 0):.3f}:d={fade_out}")


class TrimReq(BaseModel):
    file_id: str
    start: float = 0
    end: float | None = None
    fade_in: float = 0
    fade_out: float = 0
    format: str | None = None
    bitrate: str = "192k"
    remove_selection: bool = False   # True = cut the selection OUT and keep the rest


def trim(r: TrimReq):
    f = files.get_file(r.file_id)
    info = media.probe(f["path"])
    dur = info["duration"]
    end = r.end if r.end and r.end > 0 else dur
    if end <= r.start:
        raise HTTPException(400, "End must be after start")
    fmt = _fmt(f, r.format)
    out = files.output_path(f"{files.stem(f['name'])} - cut", fmt, "Audio")
    if r.remove_selection:
        fc = (f"[0:a]atrim=0:{r.start},asetpts=PTS-STARTPTS[a0];"
              f"[0:a]atrim=start={end},asetpts=PTS-STARTPTS[a1];[a0][a1]concat=n=2:v=0:a=1[o]")
        new_dur = dur - (end - r.start)
        post = []
        _fades(post, r.fade_in, r.fade_out, new_dur)
        if post:
            fc = fc.replace("[o]", "[m]") + ";[m]" + ",".join(post) + "[o]"
        media.run(["-i", f["path"], "-filter_complex", fc, "-map", "[o]", *media.audio_args(fmt, r.bitrate), out])
    else:
        filters = []
        _fades(filters, r.fade_in, r.fade_out, end - r.start)
        args =["-ss", f"{r.start:.3f}", "-i", f["path"], "-t", f"{end - r.start:.3f}", "-vn"]
        if filters:
            args += ["-af", ",".join(filters)]
        media.run(args + [*media.audio_args(fmt, r.bitrate), out])
    return files.register_output(out, "audio.trim")


class MergeReq(BaseModel):
    file_ids: list[str]
    crossfade: float = 0
    gap: float = 0
    format: str = "mp3"
    bitrate: str = "192k"
    name: str | None = None


def merge(r: MergeReq):
    if len(r.file_ids) < 2:
        raise HTTPException(400, "Pick at least 2 files to merge")
    fs = [files.get_file(i) for i in r.file_ids]
    fmt = _fmt(fs[0], r.format)
    args, parts = [], []
    for i, f in enumerate(fs):
        args += ["-i", f["path"]]
        pad = f",apad=pad_dur={r.gap}" if r.gap > 0 and i < len(fs) - 1 else ""
        parts.append(f"[{i}:a]{NORM}{pad}[a{i}]")
    if r.crossfade > 0:
        chain, prev = [], "a0"
        for i in range(1, len(fs)):
            nxt = f"x{i}" if i < len(fs) - 1 else "o"
            chain.append(f"[{prev}][a{i}]acrossfade=d={r.crossfade}:c1=tri:c2=tri[{nxt}]")
            prev = nxt
        fc = ";".join(parts + chain)
    else:
        fc = ";".join(parts) + ";" + "".join(f"[a{i}]" for i in range(len(fs))) + f"concat=n={len(fs)}:v=0:a=1[o]"
    name = r.name or f"{files.stem(fs[0]['name'])} + {len(fs) - 1} merged"
    out = files.output_path(name, fmt, "Audio")
    media.run(args + ["-filter_complex", fc, "-map", "[o]", *media.audio_args(fmt, r.bitrate), out])
    return files.register_output(out, "audio.merge")


class EffectsReq(BaseModel):
    file_id: str
    volume_db: float = 0
    speed: float = 1.0
    pitch: float = 0          # semitones
    normalize: bool = False
    fade_in: float = 0
    fade_out: float = 0
    reverse: bool = False
    bass_db: float = 0
    treble_db: float = 0
    mono: bool = False
    trim_silence: bool = False
    format: str | None = None
    bitrate: str = "192k"


def effects(r: EffectsReq):
    f = files.get_file(r.file_id)
    dur = media.probe(f["path"])["duration"]
    fl = ["aresample=44100"]
    if r.trim_silence:
        s = "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1"
        fl += [s, "areverse", s, "areverse"]
    if r.pitch:
        k = 2 ** (r.pitch / 12)
        fl += [f"asetrate={44100 * k:.0f}", "aresample=44100", media.atempo_chain(1 / k)]
    if r.speed and abs(r.speed - 1) > 1e-3:
        fl.append(media.atempo_chain(r.speed))
        dur = dur / r.speed
    if r.bass_db:
        fl.append(f"bass=g={r.bass_db}")
    if r.treble_db:
        fl.append(f"treble=g={r.treble_db}")
    if r.volume_db:
        fl.append(f"volume={r.volume_db}dB")
    if r.normalize:
        fl += ["loudnorm=I=-14:TP=-1:LRA=11", "aresample=44100"]   # loudnorm outputs 192 kHz otherwise
    if r.reverse:
        fl.append("areverse")
    if r.mono:
        fl.append("pan=mono|c0=0.5*c0+0.5*c1")
    _fades(fl, r.fade_in, r.fade_out, dur)
    fmt = _fmt(f, r.format)
    only_norm = r.normalize and not any([r.trim_silence, r.pitch, abs((r.speed or 1) - 1) > 1e-3, r.bass_db, r.treble_db,
                                             r.volume_db, r.reverse, r.mono, r.fade_in, r.fade_out])
    out = files.output_path(f"{files.stem(f['name'])} - {'normalized' if only_norm else 'edited'}", fmt, "Audio")
    media.run(["-i", f["path"], "-vn", "-af", ",".join(fl), *media.audio_args(fmt, r.bitrate), out])
    return files.register_output(out, "audio.effects")


class ConvertReq(BaseModel):
    file_id: str
    format: str = "mp3"
    bitrate: str = "192k"
    sample_rate: int | None = None


def convert(r: ConvertReq):
    f = files.get_file(r.file_id)
    fmt = _fmt(f, r.format)
    out = files.output_path(files.stem(f["name"]), fmt, "Audio")
    args = ["-i", f["path"], "-vn", "-map_metadata", "0"]
    if r.sample_rate:
        args += ["-ar", r.sample_rate]
    media.run(args + [*media.audio_args(fmt, r.bitrate), out])
    return files.register_output(out, "audio.convert")


class SplitReq(BaseModel):
    file_id: str
    segment_seconds: float = 60
    format: str | None = None


def split(r: SplitReq):
    f = files.get_file(r.file_id)
    fmt = _fmt(f, r.format)
    dur = media.probe(f["path"])["duration"]
    if r.segment_seconds <= 0:
        raise HTTPException(400, "Segment length must be > 0")
    n = int(dur // r.segment_seconds) + (1 if dur % r.segment_seconds > 0.05 else 0)
    if n > 200:
        raise HTTPException(400, "That would create more than 200 pieces")
    outs = []
    for i in range(n):
        out = files.output_path(f"{files.stem(f['name'])} - part {i + 1}", fmt, f"Audio/{files.safe_name(files.stem(f['name']))[:60]} parts")
        media.run(["-ss", i * r.segment_seconds, "-i", f["path"], "-t", r.segment_seconds, "-vn",
                   *media.audio_args(fmt), out])
        outs.append(files.register_output(out, "audio.split"))
    return outs


class VocalReq(BaseModel):
    file_id: str
    format: str | None = None


def vocal_remove(r: VocalReq):
    f = files.get_file(r.file_id)
    fmt = _fmt(f, r.format)
    out = files.output_path(f"{files.stem(f['name'])} - instrumental", fmt, "Audio")
    # Phase-cancel the centre channel (where lead vocals usually sit), keep the bass.
    fc = ("[0:a]aresample=44100,asplit=2[a][b];"
          "[a]pan=stereo|c0=c0-c1|c1=c1-c0[side];"
          "[b]lowpass=f=160,pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0+0.5*c1[low];"
          "[side][low]amix=inputs=2:normalize=0[o]")
    media.run(["-i", f["path"], "-filter_complex", fc, "-map", "[o]", *media.audio_args(fmt), out])
    return files.register_output(out, "audio.vocal_remove")


# ---------- routes ----------
@router.post("/trim")
def trim_route(r: TrimReq):
    return {"file": trim(r)}


@router.post("/merge")
def merge_route(r: MergeReq):
    return {"file": merge(r)}


@router.post("/effects")
def effects_route(r: EffectsReq):
    return {"file": effects(r)}


@router.post("/convert")
def convert_route(r: ConvertReq):
    return {"file": convert(r)}


@router.post("/split")
def split_route(r: SplitReq):
    return {"files": split(r)}


@router.post("/vocal-remove")
def vocal_route(r: VocalReq):
    return {"file": vocal_remove(r)}


@router.get("/{fid}/peaks")
def peaks(fid: str, n: int = 1200):
    f = files.get_file(fid)
    cmd = [media.FFMPEG, "-hide_banner", "-i", f["path"], "-vn", "-ac", "1", "-ar", "4000",
           "-f", "s16le", "-acodec", "pcm_s16le", "-"]
    p = subprocess.run(cmd, capture_output=True, creationflags=media._NOWIN)
    data = np.frombuffer(p.stdout, dtype=np.int16)
    if data.size == 0:
        raise HTTPException(400, "Could not decode audio")
    n = max(100, min(n, 4000))
    chunks = np.array_split(np.abs(data.astype(np.float32)), n)
    vals = np.array([c.max() if c.size else 0 for c in chunks])
    top = vals.max() or 1
    return {"peaks": (vals / top).round(3).tolist(), "duration": data.size / 4000}


# ---------- tags ----------
EASY_KEYS = ["title", "artist", "album", "albumartist", "date", "genre", "tracknumber", "composer"]


@router.get("/{fid}/tags")
def get_tags(fid: str):
    import mutagen
    f = files.get_file(fid)
    tags, lyrics, cover = {}, "", None
    try:
        m = mutagen.File(f["path"], easy=True)
        if m is not None and m.tags is not None:
            for k in EASY_KEYS:
                if k in m.tags:
                    tags[k] = "; ".join(m.tags[k])
    except Exception:
        pass
    try:
        full = mutagen.File(f["path"])
        if full is not None and full.tags is not None:
            for k, v in full.tags.items():
                if k.startswith("USLT"):
                    lyrics = str(v.text)
                if k.startswith("APIC") and cover is None:
                    cover = "data:%s;base64,%s" % (v.mime, base64.b64encode(v.data).decode())
                if k.lower() in ("lyrics", "©lyr", "unsyncedlyrics"):
                    lyrics = str(v[0] if isinstance(v, list) else v)
    except Exception:
        pass
    return {"tags": tags, "lyrics": lyrics, "cover": cover}


class TagsReq(BaseModel):
    tags: dict = {}
    lyrics: str | None = None
    cover_file_id: str | None = None


def write_tags(fid: str, r: TagsReq):
    """Writes tags. Uploaded files are first copied to the output folder so the user gets a real file."""
    import shutil
    import mutagen
    from ..core import config
    f = files.get_file(fid)
    new_file = None
    if config.WORKSPACE_DIR in Path(f["path"]).parents:
        out = files.output_path(files.stem(f["name"]), files.ext_of(f["name"]), "Audio")
        shutil.copy2(f["path"], out)
        new_file = files.register_output(out, "audio.tags")
        f = new_file
        fid = f["id"]
    path = f["path"]
    m = mutagen.File(path, easy=True)
    if m is None:
        raise HTTPException(400, "This file type doesn't support tags")
    if m.tags is None:
        m.add_tags()
    for k, v in r.tags.items():
        if k in EASY_KEYS:
            if v:
                m.tags[k] = str(v)
            elif k in m.tags:
                del m.tags[k]
    m.save()
    ext = files.ext_of(path)
    if r.lyrics is not None or r.cover_file_id:
        if ext == "mp3":
            from mutagen.id3 import APIC, ID3, USLT
            id3 = ID3(path)
            if r.lyrics is not None:
                id3.delall("USLT")
                if r.lyrics.strip():
                    id3.add(USLT(encoding=3, lang="eng", desc="", text=r.lyrics))
            if r.cover_file_id:
                c = files.get_file(r.cover_file_id)
                mime = "image/png" if c["name"].lower().endswith(".png") else "image/jpeg"
                id3.delall("APIC")
                id3.add(APIC(encoding=3, mime=mime, type=3, desc="Cover", data=Path(c["path"]).read_bytes()))
            id3.save()
        elif ext in ("flac", "ogg", "opus"):
            full = mutagen.File(path)
            if r.lyrics is not None:
                full["LYRICS"] = r.lyrics
            full.save()
        elif ext in ("m4a", "aac", "mp4"):
            full = mutagen.File(path)
            if r.lyrics is not None:
                full.tags["\xa9lyr"] = r.lyrics
            if r.cover_file_id:
                from mutagen.mp4 import MP4Cover
                c = files.get_file(r.cover_file_id)
                fmtc = MP4Cover.FORMAT_PNG if c["name"].lower().endswith(".png") else MP4Cover.FORMAT_JPEG
                full.tags["covr"] = [MP4Cover(Path(c["path"]).read_bytes(), imageformat=fmtc)]
            full.save()
    res = get_tags(fid)
    res["file"] = new_file or files.get_file(fid)
    return res


@router.post("/{fid}/tags")
def set_tags(fid: str, r: TagsReq):
    return write_tags(fid, r)


# ---------- split a continuous mix / playlist into songs ----------
import re as _re

_TS = _re.compile(r"(?<![\d:])(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?![\d:])")


def parse_tracklist(text: str):
    """'00:00 Artist - Title', '1. Title 3:45', '[12:30] Title' ... -> [{start, title}] sorted."""
    out = []
    for line in (text or "").splitlines():
        m = _TS.search(line)
        if not m:
            continue
        h, mi, se = m.groups()
        start = int(h or 0) * 3600 + int(mi) * 60 + int(se)
        title = (line[:m.start()] + " " + line[m.end():])
        title = _re.sub(r"[\[(]\s*[\])]", " ", title)                  # brackets left empty by the timestamp
        title = _re.sub(r"^[\s\d.)\]\[(\-–—:|•*#]+", "", title)          # numbering in front
        title = _re.sub(r"[\s\-–—:|•]+$", "", title).strip()
        title = _re.sub(r"\s{2,}", " ", title)
        out.append({"start": float(start), "title": title})
    out.sort(key=lambda t: t["start"])
    if out and out[0]["start"] > 0:
        out.insert(0, {"start": 0.0, "title": out[0]["title"] if out[0]["start"] < 1 else "Intro"})
    return out


class DetectSongsReq(BaseModel):
    file_id: str
    count: int | None = None        # how many songs the mix has, if known


def detect_songs(r: DetectSongsReq):
    from ..core import splitmix
    f = files.get_file(r.file_id)
    try:
        res = splitmix.detect(f["path"], count=r.count, ffmpeg=media.FFMPEG, flags=media._NOWIN)
    except ValueError as e:
        raise HTTPException(400, str(e))
    starts = [0.0] + [c["time"] for c in res["cuts"]]
    res["tracks"] = [{"start": s, "title": f"Track {i + 1:02d}"} for i, s in enumerate(starts)]
    return res


class TrackItem(BaseModel):
    start: float
    title: str = ""


class SplitSongsReq(BaseModel):
    file_id: str
    tracks: list[TrackItem] = []     # start times (+ optional titles). Empty = detect automatically
    tracklist: str | None = None     # or paste "00:00 Song A / 03:12 Song B ..."
    count: int | None = None         # for auto-detect
    format: str | None = None        # default: same as the mix
    bitrate: str = "256k"
    fade: float = 0.0                # short fade at each cut, seconds
    album: str | None = None


def split_songs(r: SplitSongsReq):
    """Cut a mix into separate songs in Documents/Data Assistant/Audio/<mix name>/, numbered and tagged."""
    f = files.get_file(r.file_id)
    dur = media.probe(f["path"])["duration"]
    tracks = [t.model_dump() for t in r.tracks]
    if not tracks and r.tracklist:
        tracks = parse_tracklist(r.tracklist)
        if not tracks:
            raise HTTPException(400, "No timestamps found in the tracklist (expected lines like '03:12 Song name')")
    if not tracks:
        tracks = detect_songs(DetectSongsReq(file_id=r.file_id, count=r.count))["tracks"]
    tracks = sorted([t for t in tracks if 0 <= t["start"] < dur - 1], key=lambda t: t["start"])
    if not tracks or tracks[0]["start"] > 1:
        tracks.insert(0, {"start": 0.0, "title": "Intro"})
    album = files.safe_name(r.album or files.stem(f["name"]))[:70]
    src_ext = files.ext_of(f["name"])
    fmt = _fmt(f, r.format)
    copy = fmt == src_ext and r.fade <= 0 and fmt in ("mp3", "m4a", "aac", "ogg", "opus", "flac")
    outs = []
    for i, t in enumerate(tracks):
        start = t["start"]
        end = tracks[i + 1]["start"] if i + 1 < len(tracks) else dur
        if end - start < 1:
            continue
        title = (t.get("title") or "").strip() or f"Track {i + 1:02d}"
        out = files.output_path(f"{i + 1:02d} - {title}", fmt, f"Audio/{album}")
        args = ["-ss", f"{start:.3f}", "-i", f["path"], "-t", f"{end - start:.3f}", "-vn", "-map_metadata", "-1"]
        if copy:
            args += ["-c:a", "copy"]
        else:
            flt = []
            _fades(flt, r.fade, r.fade, end - start)
            if flt:
                args += ["-af", ",".join(flt)]
            args += media.audio_args(fmt, r.bitrate)
        media.run(args + [out])
        reg = files.register_output(out, "audio.split_songs")
        # tags: "Artist - Title" titles fill both fields
        try:
            artist, _, song = title.partition(" - ") if " - " in title else ("", "", title)
            tags = {"title": song or title, "album": album, "tracknumber": f"{i + 1}/{len(tracks)}"}
            if artist:
                tags["artist"] = artist
            write_tags(reg["id"], TagsReq(tags=tags))
        except Exception:
            pass
        outs.append(files.get_file(reg["id"]))
    return {"files": outs, "folder": str(Path(outs[0]["path"]).parent) if outs else "", "count": len(outs)}


class TracklistReq(BaseModel):
    text: str


@router.post("/parse-tracklist")
def r_parse_tracklist(r: TracklistReq):
    return {"tracks": parse_tracklist(r.text)}


@router.post("/detect-songs")
def r_detect_songs(r: DetectSongsReq):
    return detect_songs(r)


@router.post("/split-songs")
def r_split_songs(r: SplitSongsReq):
    return split_songs(r)
