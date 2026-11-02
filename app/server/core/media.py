"""ffmpeg helpers (ffmpeg binary ships inside the imageio-ffmpeg package)."""
import re
import subprocess
import sys

from fastapi import HTTPException

try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:  # pragma: no cover
    FFMPEG = "ffmpeg"

_NOWIN = 0x08000000 if sys.platform == "win32" else 0  # CREATE_NO_WINDOW

AUDIO_CODECS = {
    "mp3": ["-c:a", "libmp3lame", "-b:a", "{br}"],
    "wav": ["-c:a", "pcm_s16le"],
    "flac": ["-c:a", "flac"],
    "aac": ["-c:a", "aac", "-b:a", "{br}"],
    "m4a": ["-c:a", "aac", "-b:a", "{br}"],
    "ogg": ["-c:a", "libvorbis", "-q:a", "6"],
    "opus": ["-c:a", "libopus", "-b:a", "{br}"],
    "aiff": ["-c:a", "pcm_s16be"],
    "wma": ["-c:a", "wmav2", "-b:a", "{br}"],
}
AUDIO_FORMATS = list(AUDIO_CODECS)
VIDEO_FORMATS = ["mp4", "mkv", "mov", "webm", "avi", "gif", "m4v", "flv", "wmv"]


def audio_args(fmt: str, bitrate: str = "192k"):
    return [a.replace("{br}", bitrate or "192k") for a in AUDIO_CODECS.get(fmt, AUDIO_CODECS["mp3"])]


def video_args(fmt: str, crf: int = 23, preset: str = "medium"):
    if fmt == "webm":
        return ["-c:v", "libvpx-vp9", "-crf", str(min(max(crf + 8, 15), 50)), "-b:v", "0", "-c:a", "libopus"]
    if fmt in ("avi", "wmv", "flv"):
        codec = {"avi": "mpeg4", "wmv": "wmv2", "flv": "flv"}[fmt]
        return ["-c:v", codec, "-q:v", "4", "-c:a", "libmp3lame" if fmt != "wmv" else "wmav2"]
    return ["-c:v", "libx264", "-crf", str(crf), "-preset", preset, "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "160k"] + (["-movflags", "+faststart"] if fmt in ("mp4", "mov", "m4v") else [])


def run(args, timeout=None):
    cmd = [FFMPEG, "-hide_banner", "-y"] + [str(a) for a in args]
    p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace",
                       creationflags=_NOWIN, timeout=timeout)
    if p.returncode != 0:
        tail = "\n".join(l for l in p.stderr.strip().splitlines()[-6:])
        raise HTTPException(400, f"ffmpeg failed: {tail}")
    return p.stderr


def probe(path) -> dict:
    p = subprocess.run([FFMPEG, "-hide_banner", "-i", str(path)], capture_output=True, text=True,
                       encoding="utf-8", errors="replace", creationflags=_NOWIN)
    err = p.stderr
    info = {"duration": 0.0, "has_audio": False, "has_video": False, "width": None, "height": None,
            "fps": None, "audio": None, "video": None}
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", err)
    if m:
        info["duration"] = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    for line in err.splitlines():
        if "Stream #" in line and "Audio:" in line and not info["has_audio"]:
            info["has_audio"] = True
            info["audio"] = line.split("Audio:", 1)[1].strip()[:120]
        if "Stream #" in line and "Video:" in line and "attached pic" not in line and not info["has_video"]:
            info["has_video"] = True
            info["video"] = line.split("Video:", 1)[1].strip()[:160]
            wm = re.search(r"\b(\d{2,5})x(\d{2,5})\b", line)
            if wm:
                info["width"], info["height"] = int(wm.group(1)), int(wm.group(2))
            fm = re.search(r"([\d.]+) fps", line)
            if fm:
                info["fps"] = float(fm.group(1))
    return info


def atempo_chain(speed: float):
    """atempo only accepts 0.5..2.0 per filter, chain them."""
    parts = []
    s = speed
    while s > 2.0:
        parts.append("atempo=2.0")
        s /= 2.0
    while s < 0.5:
        parts.append("atempo=0.5")
        s /= 0.5
    parts.append(f"atempo={s:.4f}")
    return ",".join(parts)
