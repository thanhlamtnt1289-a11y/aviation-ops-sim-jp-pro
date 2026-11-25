#!/usr/bin/env python3
"""
Builds a 100% Offline Single-File HTML bundle (`offline-singlefile.html`) for Aviation Ops Sim JP Pro.
- Inlines `src/styles/app.css` into `<style>`.
- Inlines `vendor/three.module.min.js`, `vendor/GLTFLoader.js`, `vendor/BufferGeometryUtils.js`, and every
  `src/**/*.js` ES module using `data:text/javascript;charset=utf-8;base64,...` (explicit UTF-8 charset so
  Japanese & Vietnamese text in 3D CanvasTextures & HUDs NEVER garbles!).
- Embeds all 4 CC-BY 4.0 real `.glb` commercial airliner 3D models (`B787`, `A350`, `A320`, `B737`) inline
  as base64 inside `window.__APP_GLB_BASE64__` so realistic 3D models work 100% offline with zero network!
"""
import base64
import json
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
    # CRITICAL: charset=utf-8 prevents Chrome/Safari from decoding JS modules as Latin-1 mojibake!
    b64 = base64.b64encode(js_text.encode("utf-8")).decode("ascii")
    return f"data:text/javascript;charset=utf-8;base64,{b64}"


def build():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "src/styles/app.css").read_text(encoding="utf-8")
    three_js = (ROOT / "vendor/three.module.min.js").read_text(encoding="utf-8")
    buf_utils_js = (ROOT / "vendor/BufferGeometryUtils.js").read_text(encoding="utf-8")
    gltf_loader_js = rewrite_imports(
        (ROOT / "vendor/GLTFLoader.js").read_text(encoding="utf-8"),
        "vendor/GLTFLoader.js",
    )

    import_map = {
        "three": to_data_uri(three_js),
        "@app/vendor/BufferGeometryUtils.js": to_data_uri(buf_utils_js),
        "three/addons/loaders/GLTFLoader.js": to_data_uri(gltf_loader_js),
    }

    js_files = sorted((ROOT / "src").rglob("*.js"))
    for jf in js_files:
        rel = jf.relative_to(ROOT).as_posix()
        raw = jf.read_text(encoding="utf-8")
        rewritten = rewrite_imports(raw, rel)
        import_map[f"@app/{rel}"] = to_data_uri(rewritten)

    # Embed real .glb commercial airliner models (amvlab/aircraft-models, CC-BY 4.0) inline for 100% offline use!
    glb_map = {}
    models_dir = ROOT / "vendor/models"
    if models_dir.exists():
        for glb in sorted(models_dir.glob("*.glb")):
            glb_map[glb.name] = base64.b64encode(glb.read_bytes()).decode("ascii")

    # Inline CSS & remove external font/manifest links for 100% offline zero-request load
    html = re.sub(r'<link[^>]+href="https://fonts\.[^"]*"[^>]*/?>\s*', "", html)
    html = re.sub(r'<link[^>]+rel="(?:manifest|icon|apple-touch-icon)"[^>]*/?>\s*', "", html)
    html = html.replace(
        '<link rel="stylesheet" href="./src/styles/app.css" />',
        f"<style>\n{css}\n</style>",
    )

    # Inject inline GLB binary map + self-contained UTF-8 base64 importmap
    glb_script = f"<script>window.__APP_GLB_BASE64__={json.dumps(glb_map, separators=(',', ':'))};</script>"
    map_json = json.dumps({"imports": import_map}, separators=(",", ":"))
    html = re.sub(
        r'<script type="importmap">[\s\S]*?</script>',
        f'{glb_script}\n  <script type="importmap">{map_json}</script>',
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
    print(f"Built {OUT_FILE} ({size_kb:.1f} KB, {len(import_map)} UTF-8 ES modules, {len(glb_map)} embedded GLB airliners)")


if __name__ == "__main__":
    build()
