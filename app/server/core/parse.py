"""Turn any file into text (and a DataFrame when tabular) for analysis."""
from __future__ import annotations
import json
import sqlite3
import xml.etree.ElementTree as ET
from pathlib import Path

from .lazy import pd

LIMIT = 12000


def load_df(path: Path):
    e = path.suffix.lower()
    if e == ".csv":
        return pd.read_csv(path, sep=None, engine="python")
    if e == ".tsv":
        return pd.read_csv(path, sep="\t")
    if e in (".xlsx", ".xls"):
        return pd.read_excel(path)
    if e == ".parquet":
        return pd.read_parquet(path)
    if e == ".json":
        try:
            return pd.read_json(path)
        except ValueError:
            data = json.loads(path.read_text(encoding="utf-8"))
            return pd.json_normalize(data)
    if e == ".jsonl":
        return pd.read_json(path, lines=True)
    if e == ".xml":
        return pd.read_xml(path)
    if e == ".pkl":
        obj = pd.read_pickle(path)
        if isinstance(obj, pd.DataFrame):
            return obj
    raise ValueError(f"Not a table file: {path.name}")


def df_summary(df: pd.DataFrame) -> str:
    out = f"Rows: {len(df)}\nColumns: {list(df.columns)}\n\nFirst 20 rows:\n{df.head(20).to_string()}"
    try:
        out += f"\n\nStatistics:\n{df.describe(include='all').to_string()}"
    except Exception:
        pass
    return out[:LIMIT]


def pdf_text(path: Path, max_pages=40) -> str:
    from pypdf import PdfReader
    reader = PdfReader(str(path))
    parts = []
    for page in reader.pages[:max_pages]:
        parts.append(page.extract_text() or "")
    return "\n".join(parts)


def docx_text(path: Path) -> str:
    import docx
    d = docx.Document(str(path))
    lines = [p.text for p in d.paragraphs]
    for t in d.tables:
        for row in t.rows:
            lines.append(" | ".join(c.text for c in row.cells))
    return "\n".join(lines)


def read_for_ai(path: Path):
    """Returns (text, df_or_None)."""
    path = Path(path)
    e = path.suffix.lower()
    df = None
    if e in (".csv", ".tsv", ".xlsx", ".xls", ".parquet", ".jsonl", ".pkl"):
        df = load_df(path)
        return df_summary(df), df
    if e == ".json":
        raw = path.read_text(encoding="utf-8", errors="ignore")
        try:
            df = load_df(path)
            return df_summary(df), df
        except Exception:
            return f"JSON:\n{raw[:LIMIT]}", None
    if e == ".xml":
        try:
            df = load_df(path)
            return df_summary(df), df
        except Exception:
            root = ET.fromstring(path.read_text(encoding="utf-8", errors="ignore"))
            return f"XML root: {root.tag}\n{ET.tostring(root, encoding='unicode')[:LIMIT]}", None
    if e in (".db", ".sqlite"):
        conn = sqlite3.connect(str(path))
        cur = conn.cursor()
        tables = [t[0] for t in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
        text = f"Tables: {tables}\n\n"
        for t in tables[:8]:
            rows = cur.execute(f'SELECT * FROM "{t}" LIMIT 20').fetchall()
            cols = [d[0] for d in cur.description]
            text += f"Table '{t}' columns {cols}\n" + "\n".join(str(r) for r in rows) + "\n\n"
        conn.close()
        return text[:LIMIT], None
    if e == ".pdf":
        return pdf_text(path)[:LIMIT], None
    if e == ".docx":
        return docx_text(path)[:LIMIT], None
    if e in (".html", ".htm"):
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "html.parser")
        return soup.get_text("\n", strip=True)[:LIMIT], None
    # plain text fallbacks
    try:
        return path.read_text(encoding="utf-8")[:LIMIT], None
    except UnicodeDecodeError:
        raise ValueError(f"Can't read {path.name} as text. Use the media/image tools for this file type.")
