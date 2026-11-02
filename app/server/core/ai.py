"""Claude connection: model + effort choice, thinking-safe requests."""
from fastapi import HTTPException

from . import config

# Current Claude API models (docs: platform.claude.com/docs/en/models/overview)
MODELS = [
    {"id": "claude-sonnet-5-5", "name": "Sonnet 5.5", "note": "Fast and smart. Best everyday choice.",
     "price": "$2 / $10 per M tokens", "default_effort": "high"},
    {"id": "claude-opus-5-5", "name": "Opus 5.5", "note": "Top quality for long, complex work.",
     "price": "$4 / $20 per M tokens", "default_effort": "medium"},
    {"id": "claude-fable-5-1", "name": "Fable 5.1", "note": "Deepest reasoning. Slowest and most expensive.",
     "price": "$10 / $50 per M tokens", "default_effort": "high"},
    {"id": "claude-haiku-5-5", "name": "Haiku 5.5", "note": "Fastest and cheapest. Good for quick tasks.",
     "price": "from $0.10 / $0.50 per M tokens", "default_effort": "medium"},
]
EFFORTS = ["low", "medium", "high", "xhigh", "max"]
# room for thinking + answer (thinking counts toward max_tokens)
_HEADROOM = {"low": 4000, "medium": 8000, "high": 16000, "xhigh": 32000, "max": 48000}


def client():
    key = config.get("anthropic_api_key")
    if not key:
        raise HTTPException(400, "No Claude API key set. Add it in Settings.")
    from anthropic import Anthropic
    return Anthropic(api_key=key)


def model():
    return config.get("model") or config.DEFAULTS["model"]


def effort():
    e = config.get("effort") or ""
    return e if e in EFFORTS else ""


def _effective_effort(m: str, e: str) -> str:
    if e in EFFORTS:
        return e
    return next((x["default_effort"] for x in MODELS if x["id"] == m), "high")


def create(messages, max_tokens: int = 4096, system=None, tools=None, model_id: str | None = None,
           effort_level: str | None = None):
    """messages.create with the chosen model/effort. Streams for big budgets so long requests don't time out."""
    m = model_id or model()
    e = effort_level if effort_level is not None else effort()
    eff = _effective_effort(m, e)
    kw = dict(model=m, max_tokens=max_tokens + _HEADROOM.get(eff, 16000), messages=messages)
    if system:
        kw["system"] = system
    if tools:
        kw["tools"] = tools
    if e in EFFORTS:
        kw["extra_body"] = {"output_config": {"effort": e}}
    c = client()
    try:
        if kw["max_tokens"] > 20000:
            with c.messages.stream(**kw) as s:
                return s.get_final_message()
        return c.messages.create(**kw)
    except HTTPException:
        raise
    except Exception as ex:
        msg = str(ex)
        import logging
        logging.getLogger("da").warning("Claude API error (%s): %s", m, msg[:1500])
        if "web search" in msg.lower() and ("not enabled" in msg.lower() or "disabled" in msg.lower()):
            msg += " (Web search is off for your Anthropic account. Turn it on in the Claude Console, or switch 🌐 Web off in the Assistant.)"
        raise HTTPException(502, f"Claude error: {msg}")


def text_of(msg) -> str:
    return "".join(b.text for b in msg.content if getattr(b, "type", "") == "text")


def ask(prompt: str, max_tokens: int = 2048, system: str | None = None, model_id: str | None = None,
        effort_level: str | None = None) -> str:
    return text_of(create([{"role": "user", "content": prompt}], max_tokens, system, None, model_id, effort_level))


def profile() -> str:
    return (config.get("profile") or "").strip()
