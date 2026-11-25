#!/usr/bin/env python3
"""
Builds a 100% Offline Single-File HTML bundle (`offline-singlefile.html`) for Aviation Ops Sim JP Pro.
- Inlines `src/styles/app.css` into `<style>`.
- Inlines `vendor/three.module.min.js` + every `src/**/*.js` ES module as native `data:text/javascript;base64,...`
  entries inside a static `<script type="importmap">`, rewriting relative imports to canonical `@app/...` keys.
- Strips external font links gracefully (falls back cleanly to system JP/VN/sans fonts when offline) and removes
  Service Worker registration in the standalone offline file.
- Zero external network requests, zero server required — works by double-clicking `offline-singlefile.html`!
"""
import base64
import json
import os
import posixpath
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_FILE = ROOT / "offline-singlefile.html"

IMPORT_RE = re.compile(
    r"""(?P<prefix>(?:from|import)\s*\(?\s*)(?P<q>['"])(?P<spec>\.\.?/[^'"]+)(?P=q)"""
)


def rewrite_imports(code: str, rel_posix: str) -> str:
    base_dir = posixpath.dirname(rel_posix)

    def _repl(m: re.Match) -> str:
        spec = m.group("spec")
        resolved = posixpath.normpath(posixpath.join(base_dir, spec))
        return f"{m.group('prefix')}{m.group('q')}@app/{resolved}{m.group('q')}"

    return IMPORT_RE.sub(_repl, code)


def to_data_uri(js_text: str) -> str:
    b64 = base64.b64encode(js_text.encode("utf-8")).decode("ascii")
    return f"data:text/javascript;base64,{b64}"


def build():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "src/styles/app.css").read_text(encoding="utf-8")
    three_js = (ROOT / "vendor/three.module.min.js").read_text(encoding="utf-8")

    import_map = {
        "three": to_data_uri(three_js),
    }

    js_files = sorted((ROOT / "src").rglob("*.js"))
    for jf in js_files:
        rel = jf.relative_to(ROOT).as_posix()
        raw = jf.read_text(encoding="utf-8")
        rewritten = rewrite_imports(raw, rel)
        import_map[f"@app/{rel}"] = to_data_uri(rewritten)

    # Inline CSS & remove external Google Fonts / manifest / stylesheet links for 100% offline zero-request load
    html = re.sub(r'<link[^>]+href="https://fonts\.[^"]*"[^>]*/?>\s*', "", html)
    html = re.sub(r'<link[^>]+rel="(?:manifest|icon|apple-touch-icon)"[^>]*/?>\s*', "", html)
    html = html.replace(
        '<link rel="stylesheet" href="./src/styles/app.css" />',
        f"<style>\n{css}\n</style>",
    )

    # Replace importmap with self-contained base64 importmap
    map_json = json.dumps({"imports": import_map}, separators=(",", ":"))
    html = re.sub(
        r'<script type="importmap">[\s\S]*?</script>',
        f'<script type="importmap">{map_json}</script>',
        html,
        count=1,
    )

    # Replace entry module script tag
    html = html.replace(
        '<script type="module" src="./src/main.js"></script>',
        '<script type="module">import "@app/src/main.js";</script>',
    )

    OUT_FILE.write_text(html, encoding="utf-8")
    size_kb = OUT_FILE.stat().st_size / 1024
    print(f"Built {OUT_FILE} ({size_kb:.1f} KB, {len(import_map)} inline ES modules, 100% offline)")


if __name__ == "__main__":
    build()
