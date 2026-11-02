"""Turn technical errors into one plain sentence for the screen (the full error still goes to the log)."""
from __future__ import annotations

import re

_RULES = [
    (r"UnidentifiedImageError|cannot identify image", "This file isn't a picture Toolbit can read. It may be damaged or not really an image."),
    (r"PdfStreamError|PdfReadError|EmptyFileError|Stream has ended|EOF marker not found|invalid pdf header",
     "This PDF looks damaged or incomplete, so it can't be opened."),
    (r"FileNotDecryptedError|file has not been decrypted|password", "This PDF is password-protected. Remove the password first (PDF › Password)."),
    (r"matches no streams|does not contain any stream|Output file .*does not contain", "This file has no sound (or no picture) to work with."),
    (r"Invalid data found when processing input|moov atom not found", "This media file looks damaged or isn't a real audio/video file."),
    (r"No space left on device", "Your disk is full. Free some space and try again."),
    (r"PermissionError|Permission denied|being used by another process",
     "Windows wouldn't let Toolbit write that file. Close it in other programs and try again."),
    (r"MemoryError", "That file is too big to handle in one go."),
]
_PATH = re.compile(r"(?:[A-Za-z]:\\|/)(?:[^\s'\"]+[\\/])+([^\s'\"\\/]+)")


def friendly(msg: str) -> str:
    s = str(msg or "")
    for pat, text in _RULES:
        if re.search(pat, s, re.I):
            return text
    if s.startswith("ffmpeg failed:"):
        last = [l for l in s.splitlines() if l.strip()][-1].strip()
        return "Couldn't process this media file" + (f" ({last[:120]})" if len(last) < 160 else ".")
    s = _PATH.sub(lambda m: m.group(1), s)          # no long workspace paths on screen
    s = re.sub(r"^[A-Z]\w*(Error|Exception): ", "", s)
    return s[:300] or "Something went wrong."
