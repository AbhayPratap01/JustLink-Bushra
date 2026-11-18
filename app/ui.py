"""Web UI template shared by the FastAPI app and Vercel static deployment."""

from pathlib import Path


_TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "frontend" / "index.html"
_API_URL_PLACEHOLDER = "'__RENDER_API_URL__'"

HTML_PAGE = _TEMPLATE_PATH.read_text(encoding="utf-8").replace(
    _API_URL_PLACEHOLDER,
    "''",
)
