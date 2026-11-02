"""Find song boundaries inside a continuous DJ mix / playlist (numpy only)."""
import subprocess
import numpy as np

SR = 11025
N_FFT, HOP = 4096, 2048


def _load(path, ffmpeg="ffmpeg", flags=0):
    p = subprocess.run([ffmpeg, "-nostdin", "-hide_banner", "-i", str(path), "-vn", "-f", "s16le", "-ac", "1",
                        "-ar", str(SR), "-"], capture_output=True, creationflags=flags)
    if p.returncode != 0 or not p.stdout:
        raise ValueError("Could not read audio")
    return np.frombuffer(p.stdout, np.int16).astype(np.float32) / 32768.0


def _features(x):
    win = np.hanning(N_FFT).astype(np.float32)
    n = 1 + (len(x) - N_FFT) // HOP
    freqs = np.fft.rfftfreq(N_FFT, 1 / SR)
    valid = (freqs > 55) & (freqs < 4000)
    pc = np.zeros(len(freqs), int)
    pc[valid] = (np.round(12 * np.log2(freqs[valid] / 440.0)) + 9) % 12
    band = np.digitize(freqs, np.geomspace(40, 5000, 25)) - 1
    chroma_m = np.stack([(valid & (pc == k)).astype(np.float32) for k in range(12)], 1)
    band_m = np.stack([(band == k).astype(np.float32) for k in range(24)], 1)
    C = np.zeros((n, 12), np.float32); B = np.zeros((n, 24), np.float32); E = np.zeros(n, np.float32)
    for s in range(0, n, 1500):
        idx = np.arange(s, min(n, s + 1500))
        fr = np.lib.stride_tricks.sliding_window_view(x, N_FFT)[idx * HOP] * win
        mag = np.abs(np.fft.rfft(fr, axis=1)) ** 2
        E[idx] = mag.sum(1); C[idx] = mag @ chroma_m; B[idx] = mag @ band_m
    C /= C.sum(1, keepdims=True) + 1e-9
    D = np.cos(np.pi / 24 * (np.arange(24)[:, None] + 0.5) * np.arange(1, 14)[None, :])
    return C, np.log(B + 1e-6) @ D, 10 * np.log10(E + 1e-9)


def _blocks(M, k):
    n = len(M) // k
    return M[:n * k].reshape(n, k, *M.shape[1:])


def _novelty(F, L):
    F = (F - F.mean(0)) / (F.std(0) + 1e-6)
    F /= np.linalg.norm(F, axis=1, keepdims=True) + 1e-9
    S = F @ F.T
    g = np.exp(-0.5 * np.linspace(-2, 2, 2 * L) ** 2)
    sgn = np.r_[-np.ones(L), np.ones(L)]
    K = np.outer(g, g) * np.outer(sgn, sgn)
    Sp = np.pad(S, L, mode="edge")
    v = np.array([(Sp[i:i + 2 * L, i:i + 2 * L] * K).sum() for i in range(len(S))])
    v -= np.median(v)
    return np.clip(v, 0, None) / (v.max() + 1e-9)


def detect(path, count=None, min_song=75.0, max_song=330.0, ffmpeg="ffmpeg", flags=0):
    """Returns {"duration", "cuts": [{"time", "score"}], "curve"}; cuts exclude 0 and the end."""
    x = _load(path, ffmpeg, flags)
    dur = len(x) / SR
    if dur < min_song * 1.5:          # too short to hold two songs
        return {"duration": round(dur, 2), "cuts": [], "curve": [], "curve_step": 2.0}
    C, T, e = _features(x)
    fh = HOP / SR
    k = max(1, int(round(2.0 / fh)))          # ~2 s blocks
    bs = k * fh
    Cb = _blocks(C, k).mean(1); Tb = _blocks(T, k).mean(1); eb = _blocks(e, k).min(1)
    n = len(Cb)
    L = 15                                     # ~30 s each side
    chroma = _novelty(Cb, L)
    timbre = _novelty(Tb, L)
    ctx = np.array([np.median(eb[max(0, i - 15):i + 15]) for i in range(n)])
    dip = np.clip(ctx - eb, 0, None); dip /= dip.max() + 1e-9
    score = 1.0 * chroma + 0.4 * timbre + 0.5 * dip
    score = np.convolve(score, np.ones(3) / 3, "same")
    edge = int(min_song / 2 / bs)
    score[:edge] = 0; score[-edge:] = 0
    gap = int(min_song / bs)

    # local maxima, strongest first, keeping songs at least min_song long
    peaks = [i for i in range(1, n - 1) if score[i] >= score[i - 1] and score[i] > score[i + 1] and score[i] > 0]
    peaks.sort(key=lambda i: -score[i])
    chosen = []
    want = (count - 1) if count and count > 1 else None
    thr = np.mean(score[score > 0]) + 1.6 * np.std(score[score > 0]) if want is None else -1
    for i in peaks:
        if want is not None and len(chosen) >= want:
            break
        if score[i] < thr:
            break
        if all(abs(i - j) >= gap for j in chosen):
            chosen.append(i)
    # no "song" longer than max_song: add the best peak inside long stretches
    if want is None:
        changed = True
        while changed:
            changed = False
            b = sorted([0] + chosen + [n])
            for a, c in zip(b, b[1:]):
                if (c - a) * bs > max_song:
                    inside = [i for i in peaks if a + gap <= i <= c - gap]
                    if inside:
                        chosen.append(max(inside, key=lambda i: score[i])); changed = True
                        break
    # refine each cut to the quietest moment within +-3 s (fine frames)
    cuts = []
    for i in sorted(chosen):
        t = (i + 0.5) * bs
        lo, hi = int(max(0, t - 3) / fh), int(min(dur, t + 3) / fh)
        seg = np.convolve(e[lo:hi], np.ones(3) / 3, "same") if hi - lo > 3 else e[lo:hi]
        if len(seg):
            t = (lo + int(np.argmin(seg))) * fh
        cuts.append({"time": round(float(t), 2), "score": round(float(score[i]), 3)})
    return {"duration": round(dur, 2), "cuts": cuts,
            "curve": [round(float(v), 3) for v in score[::2]], "curve_step": round(2 * bs, 3)}
