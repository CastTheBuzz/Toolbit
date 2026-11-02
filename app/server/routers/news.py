"""News (RSS/Atom feeds you choose) and weather (Open-Meteo, free, no key). No AI."""
from __future__ import annotations

import html as htmlmod
import re
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import config

router = APIRouter(prefix="/api", tags=["news"])
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) DataAssistant/3 (personal news reader)"}
_cache: dict = {}


def _cached(key, ttl, fn):
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < ttl:
        return hit[1]
    val = fn()
    _cache[key] = (time.time(), val)
    return val


# ---------------- news ----------------
def _strip(s: str, n: int = 260) -> str:
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = re.sub(r"\s+", " ", htmlmod.unescape(s)).strip()
    return s[:n] + ("…" if len(s) > n else "")


def _date(s: str) -> str:
    if not s:
        return ""
    try:
        return parsedate_to_datetime(s).astimezone(timezone.utc).isoformat()
    except Exception:
        pass
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat()
    except Exception:
        return ""


def _local(tag: str) -> str:
    return tag.rsplit("}", 1)[-1].lower()


def parse_feed(xml: bytes, source: str) -> list[dict]:
    root = ET.fromstring(xml)
    out = []
    for el in root.iter():
        name = _local(el.tag)
        if name not in ("item", "entry"):
            continue
        d = {"source": source, "title": "", "link": "", "date": "", "summary": "", "image": ""}
        for c in el:
            t = _local(c.tag)
            if t == "title":
                d["title"] = _strip(c.text or "", 200)
            elif t == "link":
                href = c.get("href")
                if href and (c.get("rel") in (None, "alternate")):
                    d["link"] = href
                elif not href and (c.text or "").strip():
                    d["link"] = c.text.strip()
            elif t in ("pubdate", "published", "updated", "date") and not d["date"]:
                d["date"] = _date((c.text or "").strip())
            elif t in ("description", "summary") and not d["summary"]:
                d["summary"] = _strip(c.text or "")
                img = re.search(r'<img[^>]+src="([^"]+)"', c.text or "")
                if img and not d["image"]:
                    d["image"] = img.group(1)
            elif t == "content" and not d["summary"]:
                d["summary"] = _strip(c.text or "")
            elif t in ("thumbnail",) and c.get("url") and not d["image"]:
                d["image"] = c.get("url")
            elif t in ("enclosure", "content") and (c.get("type") or "").startswith("image") and not d["image"]:
                d["image"] = c.get("url", "")
        if d["title"] and d["link"]:
            out.append(d)
    return out


def _fetch_feed(f: dict) -> dict:
    try:
        r = requests.get(f["url"], headers=UA, timeout=15)
        r.raise_for_status()
        items = parse_feed(r.content, f["name"])
        return {"name": f["name"], "url": f["url"], "items": items[:40], "error": ""}
    except Exception as e:
        return {"name": f["name"], "url": f["url"], "items": [], "error": str(e)[:160]}


def feeds() -> list[dict]:
    return [f for f in (config.get("news_feeds") or []) if f.get("url")]


@router.get("/news")
def news(refresh: bool = False):
    fl = feeds()
    key = "news:" + "|".join(f["url"] for f in fl)
    if refresh:
        _cache.pop(key, None)

    def load():
        with ThreadPoolExecutor(6) as ex:
            return list(ex.map(_fetch_feed, fl))
    res = _cached(key, 15 * 60, load)
    return {"feeds": res, "updated": datetime.fromtimestamp(_cache[key][0]).isoformat(timespec="minutes")}


class FeedsReq(BaseModel):
    feeds: list[dict]


@router.post("/news/feeds")
def save_feeds(r: FeedsReq):
    clean = []
    for f in r.feeds:
        url = str(f.get("url", "")).strip()
        if not url:
            continue
        if not url.startswith("http"):
            url = "https://" + url
        clean.append({"name": str(f.get("name") or url.split("/")[2]).strip()[:40], "url": url})
    config.save_settings({"news_feeds": clean})
    return {"feeds": clean}


@router.post("/news/test")
def test_feed(f: dict):
    res = _fetch_feed({"name": f.get("name") or "Test", "url": f.get("url", "")})
    if res["error"] or not res["items"]:
        raise HTTPException(400, f"Couldn't read that feed: {res['error'] or 'no articles found'}")
    return {"count": len(res["items"]), "first": res["items"][0]["title"]}


# ---------------- weather ----------------
WMO = {0: ("Clear", "☀️"), 1: ("Mostly clear", "🌤️"), 2: ("Partly cloudy", "⛅"), 3: ("Cloudy", "☁️"),
       45: ("Fog", "🌫️"), 48: ("Fog", "🌫️"), 51: ("Light drizzle", "🌦️"), 53: ("Drizzle", "🌦️"),
       55: ("Heavy drizzle", "🌧️"), 56: ("Freezing drizzle", "🌧️"), 57: ("Freezing drizzle", "🌧️"),
       61: ("Light rain", "🌦️"), 63: ("Rain", "🌧️"), 65: ("Heavy rain", "🌧️"), 66: ("Freezing rain", "🌧️"),
       67: ("Freezing rain", "🌧️"), 71: ("Light snow", "🌨️"), 73: ("Snow", "🌨️"), 75: ("Heavy snow", "❄️"),
       77: ("Snow grains", "🌨️"), 80: ("Showers", "🌦️"), 81: ("Showers", "🌧️"), 82: ("Heavy showers", "⛈️"),
       85: ("Snow showers", "🌨️"), 86: ("Snow showers", "❄️"), 95: ("Thunderstorm", "⛈️"),
       96: ("Thunderstorm, hail", "⛈️"), 99: ("Thunderstorm, hail", "⛈️")}


def _wmo(code):
    t, i = WMO.get(int(code) if code is not None else -1, ("", "🌡️"))
    return {"text": t, "icon": i}


def _place(city: str) -> dict:
    def look():
        r = requests.get("https://geocoding-api.open-meteo.com/v1/search",
                         params={"name": city, "count": 1, "language": "en"}, headers=UA, timeout=15)
        r.raise_for_status()
        res = (r.json().get("results") or [])
        if not res:
            raise HTTPException(400, f"Couldn't find '{city}'. Check the city name in the weather settings.")
        p = res[0]
        return {"name": p["name"], "country": p.get("country", ""), "lat": p["latitude"], "lon": p["longitude"]}
    return _cached("geo:" + city.lower(), 30 * 24 * 3600, look)


@router.get("/weather")
def weather(city: str | None = None, refresh: bool = False):
    city = (city or (config.get("location") or {}).get("city") or "London").strip()
    key = "wx:" + city.lower()
    if refresh:
        _cache.pop(key, None)

    def load():
        p = _place(city)
        r = requests.get("https://api.open-meteo.com/v1/forecast", headers=UA, timeout=15, params={
            "latitude": p["lat"], "longitude": p["lon"], "timezone": "auto", "forecast_days": 7,
            "current": "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
            "hourly": "temperature_2m,precipitation_probability,weather_code",
            "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
        })
        r.raise_for_status()
        d = r.json()
        cur, daily, hourly = d.get("current", {}), d.get("daily", {}), d.get("hourly", {})
        now = cur.get("time", "")
        hours = []
        for k, t in enumerate(hourly.get("time", [])):
            if t >= now[:13] and len(hours) < 24:
                hours.append({"time": t[11:16], "temp": round(hourly["temperature_2m"][k]),
                              "rain": hourly.get("precipitation_probability", [None] * (k + 1))[k],
                              **_wmo(hourly["weather_code"][k])})
        days = [{"date": t, "max": round(daily["temperature_2m_max"][k]), "min": round(daily["temperature_2m_min"][k]),
                 "rain": daily.get("precipitation_probability_max", [None] * (k + 1))[k],
                 "sunrise": (daily.get("sunrise") or [""] * (k + 1))[k][11:16],
                 "sunset": (daily.get("sunset") or [""] * (k + 1))[k][11:16], **_wmo(daily["weather_code"][k])}
                for k, t in enumerate(daily.get("time", []))]
        return {"place": p, "now": {"temp": round(cur.get("temperature_2m", 0)), "feels": round(cur.get("apparent_temperature", 0)),
                                    "humidity": cur.get("relative_humidity_2m"), "wind": round(cur.get("wind_speed_10m", 0)),
                                    "time": now, **_wmo(cur.get("weather_code"))},
                "hours": hours, "days": days}
    try:
        return _cached(key, 20 * 60, load)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(502, f"Weather isn't available right now ({e.__class__.__name__}). Check your internet.")


class CityReq(BaseModel):
    city: str


@router.post("/weather/city")
def set_city(r: CityReq):
    city = r.city.strip()
    if not city:
        raise HTTPException(400, "Type a city")
    _place(city)   # checks it exists
    loc = dict(config.get("location") or {})
    loc["city"] = city
    config.save_settings({"location": loc})
    return weather(city)
