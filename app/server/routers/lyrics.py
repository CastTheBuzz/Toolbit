"""Lyrics: search online (LRCLIB, free, no key), transcribe any audio with Whisper (offline), save / embed."""
import re
import threading
from pathlib import Path

import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import ai, config, files

router = APIRouter(prefix="/api/lyrics", tags=["lyrics"])
LRCLIB = "https://lrclib.net/api"
HEADERS = {"User-Agent": "DataAssistant/2.0 (personal desktop app)"}

_models = {}
_model_lock = threading.Lock()


class SearchReq(BaseModel):
    query: str = ""
    track: str = ""
    artist: str = ""


def search(r: SearchReq):
    params = {}
    if r.track:
        params["track_name"] = r.track
        if r.artist:
            params["artist_name"] = r.artist
    else:
        params["q"] = r.query
    if not any(params.values()):
        raise HTTPException(400, "Enter a song name")
    try:
        res = requests.get(f"{LRCLIB}/search", params=params, headers=HEADERS, timeout=20)
        res.raise_for_status()
    except Exception as e:
        raise HTTPException(502, f"Lyrics search failed: {e}")
    out = []
    for it in res.json()[:15]:
        out.append({
            "id": it.get("id"), "track": it.get("trackName"), "artist": it.get("artistName"),
            "album": it.get("albumName"), "duration": it.get("duration"),
            "instrumental": it.get("instrumental"),
            "plain": it.get("plainLyrics") or "", "synced": it.get("syncedLyrics") or "",
        })
    return out


@router.post("/search")
def r_search(r: SearchReq):
    return {"results": search(r)}


def _fmt_ts(t: float) -> str:
    m = int(t // 60)
    return f"[{m:02d}:{t - m * 60:05.2f}]"


def _get_model(name: str):
    with _model_lock:
        if name not in _models:
            from faster_whisper import WhisperModel
            if len(_models) >= 2:          # keep memory in check
                _models.pop(next(iter(_models)))
            _models[name] = WhisperModel(name, device="cpu", compute_type="int8",
                                         download_root=str(config.MODELS_DIR))
        return _models[name]


def _load_audio(path, song: bool = False):
    """Any audio/video file -> 16 kHz mono float32 array for Whisper.
    song=True gently focuses on the vocal range and evens out quiet singing."""
    import subprocess
    import numpy as np
    from ..core import media
    args = [media.FFMPEG, "-nostdin", "-hide_banner", "-i", str(path), "-vn"]
    if song:
        args += ["-af", "highpass=f=100,lowpass=f=7500,dynaudnorm=f=200:g=15"]
    args += ["-f", "s16le", "-ac", "1", "-ar", "16000", "-"]
    p = subprocess.run(args, capture_output=True, creationflags=media._NOWIN)
    if p.returncode != 0 or not p.stdout:
        tail = p.stderr.decode("utf-8", "replace").strip().splitlines()[-3:]
        raise HTTPException(400, "Could not read audio: " + " ".join(tail))
    return np.frombuffer(p.stdout, np.int16).astype(np.float32) / 32768.0


_JUNK_LINES = re.compile(r"^\W*(?:thanks?(?: you)? (?:so much )?for watching|subtitles? by.*|please subscribe.*|"
                         r"amara\.org.*|transcribed by.*)?\W*$", re.I)


def _clean_segments(segments):
    """Drop Whisper hallucinations: empty/junk lines and the same line looping over and over."""
    out, last, repeat = [], None, 0
    for s in segments:
        t = s.text.strip()
        if not t or _JUNK_LINES.match(t):
            continue
        key = re.sub(r"\W+", "", t.lower())
        repeat = repeat + 1 if key == last else 0
        last = key
        if repeat >= 2:      # allow a line twice in a row (choruses), not more
            continue
        out.append((s.start, s.end, t))
    return out


class TranscribeReq(BaseModel):
    file_id: str
    model: str | None = None      # tiny / base / small / medium
    language: str | None = None   # e.g. "en", "sq"; None = auto
    ai_cleanup: bool = False
    speech_only: bool = False     # True = skip parts with no voice (good for talks, bad for songs)


def transcribe(r: TranscribeReq):
    f = files.get_file(r.file_id)
    name = r.model or config.get("whisper_model") or "small"
    try:
        model = _get_model(name)
    except Exception as e:
        raise HTTPException(500, f"Could not load Whisper model '{name}' (first use downloads it, "
                                 f"needs internet): {e}")
    audio = _load_audio(f["path"], song=not r.speech_only)
    segments, info = model.transcribe(
        audio, language=r.language or None, beam_size=5,
        vad_filter=r.speech_only,                 # the speech filter throws away sung parts
        condition_on_previous_text=False,         # stops it getting stuck repeating a line
        initial_prompt="Song lyrics." if not r.speech_only else None,
        no_speech_threshold=0.6, compression_ratio_threshold=2.4,
    )
    lines = _clean_segments(segments)
    plain = [t for _, _, t in lines]
    lrc = [f"{_fmt_ts(a)}{t}" for a, _, t in lines]
    srt = [f"{i}\n{_srt(a)} --> {_srt(b)}\n{t}\n" for i, (a, b, t) in enumerate(lines, 1)]
    text = "\n".join(plain)
    if r.ai_cleanup and text:
        text = ai.ask("These are machine-transcribed song lyrics. Fix obvious mistakes, keep the original "
                      "language, split into verses/chorus with blank lines between sections. Output only "
                      f"the lyrics.\n\n{text}", 3000)
    return {"text": text, "lrc": "\n".join(lrc), "srt": "\n".join(srt),
            "language": info.language, "duration": info.duration, "model": name}


def _srt(t: float) -> str:
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int((s % 1) * 1000):03d}"


_TITLE_JUNK = re.compile(
    r"[\(\[][^\)\]]*(official|lyric|video|audio|visuali[sz]er|\bhd\b|\bhq\b|4k|remaster|explicit|"
    r"clean|prod\.?|download|\bmv\b|m/v|live|version|edit)[^\)\]]*[\)\]]", re.I)


def guess_song(f: dict) -> dict:
    """Title/artist from the file's tags, else from a 'Artist - Title' filename."""
    title = artist = ""
    try:
        import mutagen
        m = mutagen.File(f["path"], easy=True)
        if m is not None and m.tags:
            title = (m.tags.get("title") or [""])[0]
            artist = (m.tags.get("artist") or [""])[0]
    except Exception:
        pass
    if not title:
        stem = Path(f["name"]).stem.replace("_", " ")
        stem = _TITLE_JUNK.sub("", stem)
        stem = re.sub(r"^\d{1,3}[\s.\-]+", "", stem)          # leading track numbers
        parts = re.split(r"\s+[-–—]\s+", stem, maxsplit=1)
        if len(parts) == 2:
            artist, title = parts
        else:
            title = stem
    title = re.split(r"\s+(?:ft\.?|feat\.?|featuring)\s+", _TITLE_JUNK.sub("", title), flags=re.I)[0]
    artist = re.split(r"\s*(?:,|&|\bx\b|ft\.?|feat\.?)\s*", artist, flags=re.I)[0] if artist else ""
    return {"track": re.sub(r"\s+", " ", title).strip(" -"), "artist": artist.strip()}


class AutoReq(BaseModel):
    file_id: str


@router.post("/auto")
def auto(r: AutoReq):
    """Find the real lyrics for a song file: guess title/artist, search LRCLIB, pick the closest length."""
    from ..core import media
    f = files.get_file(r.file_id)
    guess = guess_song(f)
    if not guess["track"]:
        return {"guess": guess, "best": None, "results": []}
    results = []
    try:
        if guess["artist"]:
            results = search(SearchReq(track=guess["track"], artist=guess["artist"]))
        if not results:
            results = search(SearchReq(query=f"{guess['artist']} {guess['track']}".strip()))
    except HTTPException:
        raise
    duration = 0
    try:
        duration = media.probe(f["path"]).get("duration") or 0
    except Exception:
        pass
    with_lyrics = [x for x in results if x["plain"] or x["synced"]]
    best = None
    if with_lyrics:
        if duration:
            best = min(with_lyrics, key=lambda x: abs((x["duration"] or 0) - duration))
            if abs((best["duration"] or 0) - duration) > 20:   # probably a different version
                best = with_lyrics[0]
        else:
            best = with_lyrics[0]
    return {"guess": guess, "best": best, "results": results, "duration": duration}


@router.post("/transcribe")
def r_transcribe(r: TranscribeReq):
    return transcribe(r)


class SaveReq(BaseModel):
    name: str = "lyrics"
    text: str
    format: str = "txt"   # txt / lrc / srt / docx / pdf


@router.post("/save")
def save(r: SaveReq):
    fmt = r.format if r.format in ("txt", "lrc", "srt", "docx", "pdf") else "txt"
    out = files.output_path(r.name, fmt, "Lyrics")
    if fmt == "docx":
        import docx
        d = docx.Document()
        d.add_heading(r.name, 1)
        for line in r.text.split("\n"):
            d.add_paragraph(line)
        d.save(out)
    elif fmt == "pdf":
        from .data import text_to_pdf
        text_to_pdf(r.text, out, r.name)
    else:
        out.write_text(r.text, encoding="utf-8")
    return {"file": files.register_output(out, "lyrics.save"), "folder": str(out.parent)}


class EmbedReq(BaseModel):
    file_id: str
    text: str
    synced: str | None = None     # timed LRC lyrics, saved as "<song>.lrc" next to the song


@router.post("/embed")
def embed(r: EmbedReq):
    from .audio import TagsReq, write_tags
    res = write_tags(r.file_id, TagsReq(tags={}, lyrics=r.text))
    song = res["file"]
    lrc_text = r.synced if r.synced and r.synced.strip() else (r.text if re.match(r"^\s*\[\d+:\d", r.text) else "")
    res["files"] = [song]
    if lrc_text:
        lrc_path = Path(song["path"]).with_suffix(".lrc")
        lrc_path.write_text(lrc_text, encoding="utf-8")
        res["files"].append(files.register_output(lrc_path, "lyrics.embed"))
    res["folder"] = str(Path(song["path"]).parent)
    return res
