#!/bin/bash
# Builds Hibi's index.html from the sources in build/ and writes it to the repo root (index.html, music.js, version.json).
# Run from anywhere:  bash build/build.sh
set -e
B="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$B")"
cd "$B"
mkdir -p site
python3 build_site.py >/dev/null      # english-pack.html + parts/step*.py + cloud.js -> site/index.html (+ ../version.json)
python3 gen_music.py >/dev/null       # writes ../music.js
cp site/index.html "$ROOT/index.html"
cd "$ROOT"
for p in "$B"/parts/ext/*.patch; do [ -e "$p" ] || continue; git apply --whitespace=nowarn "$p" || { echo "PATCH FAILED: $p"; exit 1; }; done
for p in "$B"/parts/post_*.py; do python3 "$p" "$ROOT/index.html"; done
echo "built $(wc -c < "$ROOT/index.html") bytes"
