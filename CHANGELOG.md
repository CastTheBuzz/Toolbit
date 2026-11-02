# Changelog

## 3.3.1 (2026-10-30)
- Devices: PC names the laptop that syncs with it instead of "Not paired" (first update delivered to the laptop through the Update button).

## 3.3.0 (2026-10-30)
- Devices: phone access to the PC's Toolbit (Tailscale/Wi-Fi, PIN, phone layout), laptop installer with automatic pairing, sync of settings + My Files, Update button on the laptop when the PC is newer.
- Email: multiple Gmail accounts.
- News links open in a window in front.
- Security hardening after independent review (host allow-list, CSRF block, PIN throttling, Tailscale-only sync).

## 3.2.1 (2026-10-21)
- Shortcut rename made reliable (Python rename with retries, taskbar pin folder, icon refresh); PNG window icons.
- Plain-language error messages (core/errors.py).
- Identical re-uploads reuse the existing file; picker de-duplicated with dates.
- Calculator: percent like a phone calculator, thousands commas, − sign, live error text.
- Audio Studio Start/End typable; Jump to readable + action shortcuts; Data & Docs refuses images; stale results cleared on error; fresh-install History shows only the current version; log lines no longer doubled.

## 3.2.0 (2026-10-21) — Toolbit
- New name and icon (Data Assistant → Toolbit); shortcuts renamed automatically; hotkey Ctrl+Alt+T.
- Home: Quick convert, weather/email/backup pills, compact recent files.
- Batch: PDF to images, PDF to Word/text.
- Fixes: no upscaling on "smaller", normalize keeps 44.1 kHz, compress never saves a bigger file, scanned PDFs explain why there's no text, rename avoids duplicate names.

## 3.1.0 (2026-10-18)
- Email: Gmail in the app (read, search, save attachments to My Files, send files).
- News & Weather: forecast for your city and headlines from sources you choose.

## 3.0.0 (2026-10-18)
- Simplified to a files & media toolbox (Audio, Lyrics, Video, Images, PDF, Data & Docs, Batch, My Files, Quick Tools, Backup). Calendar, planning, reminders, notes, the Assistant and other Claude-powered tools are switched off; data and code are kept.

## 2.8.2 (2026-10-18)
- Calendar: Clear day button, no confirmation pop-ups (Undo instead). The Assistant can remove blocks and clear days.

## 2.8.1 (2026-10-18)
- Plan my week: type changes under the suggested week and Claude updates the same plan.

## 2.8.0 (2026-10-18)
- After an update the app shows a banner and restarts itself with one click. Settings has a Restart button too.
- Backup refuses cloud drives (Google Drive appears as G:) and drives it can't write to, explains why, and stops retrying every 5 minutes.
- Sidebar: everyday pages first, foldable sections. Home tiles are compact.
- Settings: web search on/off and your city. Assistant keeps your text if a message fails.

## 2.7.2 (2026-10-18)
- Assistant: fixed the error when web search was on. If web search fails again, it answers without it instead of erroring.

## 2.7.1 (2026-10-18)
- Plan my week: the suggestion now stays until you add or discard it, even after switching pages, closing the app, or leaving while it's still planning. Ticks are remembered.

## 2.7.0 (2026-10-17)
- **Notes**: quick capture (Ctrl+Shift+N or + Note on Today), #tags, pins, tick-able checklists, search, archive, notes for a day in Today, export to Markdown. The Assistant can save and find notes.
- **Batch**: convert, resize, compress, normalize, rename (with preview), read text or ZIP many files at once, with progress.
- **Read text (OCR)** from photos, screenshots and scanned PDFs, to Markdown, Word or text.
- **Video › Subtitles**: automatic subtitles from speech (offline), optional translation, as .srt, a subtitle track or burned in.
- **Week review**: done %, focus and study hours, workouts, streak, day-by-day bars, missed blocks, and a short coach-style reflection.

## 2.6.0 (2026-10-17)
- **Faster start**: the window opens immediately with a loading screen; heavy libraries load only when needed; app files are compressed and cached.
- **Quick Tools**: focus timer (logs focus blocks to the calendar), calculator, unit converter, live currency, world clock, date maths, text tools, encode/decode, password generator, QR codes, colour picker.
- Assistant can **search the web** for current info (🌐 toggle), with sources.
- Optional **Ctrl+Alt+D** shortcut to open the app.

## 2.5.0 (2026-10-17)
- Pick the Claude **model** (Sonnet 5.5, Opus 5.5, Fable 5.1, Haiku 5.5) and **effort** (low → max) in Settings, or per chat and per week plan.
- **About me** profile in Settings, used by the Assistant and the planner.
- Calendar › **Plan my week**: suggested week + recommendations from your profile, calendar and last week's results; tick the blocks you want and add them.
- Interface: **Ctrl+K** quick jump, light/dark switch, time-of-day greeting, active-page marker.
- Assistant keeps Claude's reasoning between tool steps (as the API requires) and has more output room.

## 2.4.0 (2026-10-15)
- Home: **Today** view (plans, next up with countdown, today's workout, leftovers from yesterday with "Move to today", quick-add).
- **Reminders**: Windows notifications before each planned block (5–60 min, configurable) and a morning overview.
- **Background mode**: keeps running after the window closes (reminders, auto-backup); optional start with Windows. Quit stops it.

## 2.3.0 (2026-10-13)
- Fixed category folders (Audio, Video, Images, PDF, Lyrics, Data, Documents, Reports, History); multi-file results in sub-folders; uploads filed by type; My Files mirrors the tree.
- **History** log of every action and app update (in-app + `Documents\Data Assistant\History`).
- **Calendar** (month view, repeats, kinds, done) and **Workouts** (3-day dumbbell program A/B, bodyweight versions, logging, progression, progress).
- **Backup** to USB / any folder: incremental, app-library snapshots without API keys, auto once a day.

## 2.2.0 (2026-10-13)
- Audio Studio: **split a seamless mix into songs** (auto-detect or tracklist, preview/nudge cuts, tagged + numbered output).
- Assistant: chat folders, drag and drop, rename; can split mixes on request.

## 2.1.0 (2026-10-13)
- Lyrics: find lyrics online for a song file, add lyrics into the song (+ `.lrc`), better transcription.
- My Files: folders, rename, move, Download buttons.
- Voice: talk to the Assistant, spoken replies, conversation mode.

## 2.0.1 (2026-10-12)
- Fixed Lyrics > Transcribe crash (PyAV / faster-whisper mismatch).

## 2.0.0 (2026-10-12)
- Data Assistant 2: the old data-assistant (v1, FastAPI + React) rebuilt into one installable local app with all tools.
