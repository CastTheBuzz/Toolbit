"""Data + document tools: preview tables, convert table formats, convert documents, AI table transform."""
from __future__ import annotations
import html
import re
import traceback
from pathlib import Path

from ..core.lazy import pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..core import ai, files
from ..core.parse import docx_text, load_df, read_for_ai

router = APIRouter(prefix="/api/data", tags=["data"])

TABLE_FORMATS = ["csv", "xlsx", "json", "jsonl", "parquet", "tsv", "html", "md", "xml"]
DOC_FORMATS = ["pdf", "docx", "txt", "md", "html"]


def write_df(df: pd.DataFrame, out: Path, fmt: str):
    if fmt == "csv":
        df.to_csv(out, index=False, encoding="utf-8-sig")
    elif fmt == "tsv":
        df.to_csv(out, index=False, sep="\t")
    elif fmt == "xlsx":
        df.to_excel(out, index=False)
    elif fmt == "json":
        df.to_json(out, orient="records", indent=2, force_ascii=False, date_format="iso")
    elif fmt == "jsonl":
        df.to_json(out, orient="records", lines=True, force_ascii=False, date_format="iso")
    elif fmt == "parquet":
        df.to_parquet(out, index=False)
    elif fmt == "html":
        out.write_text(df.to_html(index=False), encoding="utf-8")
    elif fmt == "md":
        out.write_text(df.to_markdown(index=False) if _has_tabulate() else df.to_string(index=False), encoding="utf-8")
    elif fmt == "xml":
        df.columns = [re.sub(r"\W+", "_", str(c)) or "col" for c in df.columns]
        df.to_xml(out, index=False, parser="etree")
    else:
        raise HTTPException(400, f"Unsupported table format {fmt}")


def _has_tabulate():
    try:
        import tabulate  # noqa
        return True
    except ImportError:
        return False


@router.get("/{fid}/preview")
def preview(fid: str, rows: int = 200):
    f = files.get_file(fid)
    try:
        df = load_df(Path(f["path"]))
    except Exception as e:
        raise HTTPException(400, str(e))
    head = df.head(rows).astype(object).where(pd.notna(df.head(rows)), None)
    return {"columns": [str(c) for c in df.columns], "rows": head.astype(str).values.tolist(),
            "total_rows": len(df), "dtypes": {str(c): str(t) for c, t in df.dtypes.items()}}


class ConvertReq(BaseModel):
    file_id: str
    format: str


def convert_table(r: ConvertReq):
    f = files.get_file(r.file_id)
    fmt = r.format.lower().lstrip(".")
    try:
        df = load_df(Path(f["path"]))
    except Exception as e:
        raise HTTPException(400, f"Couldn't read table: {e}")
    out = files.output_path(files.stem(f["name"]), fmt, "Data")
    write_df(df, out, fmt)
    return files.register_output(out, "data.convert")


def text_to_pdf(text: str, out: Path, title: str = ""):
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
    styles = getSampleStyleSheet()
    story = []
    if title:
        story += [Paragraph(html.escape(title), styles["Heading1"]), Spacer(1, 12)]
    for block in text.split("\n"):
        if block.strip():
            story.append(Paragraph(html.escape(block), styles["BodyText"]))
        else:
            story.append(Spacer(1, 8))
    SimpleDocTemplate(str(out), pagesize=A4, leftMargin=50, rightMargin=50).build(story)


def convert_document(r: ConvertReq):
    f = files.get_file(r.file_id)
    fmt = r.format.lower().lstrip(".")
    if fmt not in DOC_FORMATS:
        raise HTTPException(400, f"Unsupported document format {fmt}")
    src = Path(f["path"])
    e = src.suffix.lower()
    if e == ".docx":
        text = docx_text(src)
    elif e == ".pdf":
        from ..core.parse import pdf_text
        text = pdf_text(src, 2000)
    else:
        text, _ = read_for_ai(src)
        if e not in (".html", ".htm"):
            text = src.read_text(encoding="utf-8", errors="ignore")
    out = files.output_path(files.stem(f["name"]), fmt, "Documents")
    if fmt == "pdf":
        text_to_pdf(text, out)
    elif fmt == "docx":
        import docx
        d = docx.Document()
        for line in text.split("\n"):
            m = re.match(r"^(#{1,3})\s+(.*)", line)
            if m and e == ".md":
                d.add_heading(m.group(2), level=len(m.group(1)))
            else:
                d.add_paragraph(line)
        d.save(out)
    elif fmt == "html":
        body = "".join(f"<p>{html.escape(l)}</p>" for l in text.split("\n"))
        out.write_text(f"<!doctype html><meta charset='utf-8'><body>{body}</body>", encoding="utf-8")
    else:
        out.write_text(text, encoding="utf-8")
    return files.register_output(out, "doc.convert")


@router.post("/convert")
def r_convert(r: ConvertReq):
    f = files.get_file(r.file_id)
    if f["kind"] == "data":
        return {"file": convert_table(r)}
    return {"file": convert_document(r)}


class TransformReq(BaseModel):
    file_id: str
    instruction: str
    format: str | None = None


def ai_transform(r: TransformReq):
    """Claude writes pandas code for the instruction; we run it on a copy of the table."""
    f = files.get_file(r.file_id)
    df = load_df(Path(f["path"]))
    sample = df.head(15).to_string()
    prompt = (f"You transform a pandas DataFrame named df.\nColumns and dtypes:\n{df.dtypes.to_string()}\n"
              f"Rows: {len(df)}\nSample:\n{sample}\n\nInstruction: {r.instruction}\n\n"
              "Reply with ONLY Python code (no markdown fences) that modifies df or assigns a new DataFrame to df. "
              "pandas is available as pd and numpy as np. Do not read or write files, do not import anything else.")
    code = ai.ask(prompt, 1500).strip()
    code = re.sub(r"^```(?:python)?\s*|\s*```$", "", code).strip()
    if re.search(r"\b(open|exec|eval|__import__|subprocess|os\.|sys\.|shutil|socket|requests)\b", code):
        raise HTTPException(400, f"Generated code was blocked for safety:\n{code}")
    from ..core.lazy import np
    scope = {"pd": pd, "np": np, "df": df.copy()}
    try:
        exec(code, {"__builtins__": {"len": len, "range": range, "min": min, "max": max, "sum": sum,
                                      "str": str, "int": int, "float": float, "round": round, "abs": abs,
                                      "list": list, "dict": dict, "set": set, "sorted": sorted, "zip": zip,
                                      "enumerate": enumerate, "isinstance": isinstance, "any": any, "all": all,
                                      "bool": bool, "tuple": tuple, "print": lambda *a, **k: None}}, scope)
    except Exception:
        raise HTTPException(400, f"Transform failed:\n{traceback.format_exc(limit=1)}\n\nCode:\n{code}")
    new = scope["df"]
    if not isinstance(new, pd.DataFrame):
        raise HTTPException(400, f"Result wasn't a table.\n\nCode:\n{code}")
    fmt = (r.format or files.ext_of(f["name"])).lower()
    if fmt not in TABLE_FORMATS:
        fmt = "csv"
    out = files.output_path(f"{files.stem(f['name'])} - transformed", fmt, "Data")
    write_df(new, out, fmt)
    return files.register_output(out, "data.ai_transform"), code, len(new)


@router.post("/ai-transform")
def r_transform(r: TransformReq):
    fo, code, n = ai_transform(r)
    return {"file": fo, "code": code, "rows": n}
