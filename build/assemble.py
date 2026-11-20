"""Puts Hibi's page together from build/src (used by build_site.py).

build/src/page.html is the page skeleton. It holds tokens that are replaced by files:
  ⟦style⟧                  -> src/style.css
  ⟦script:NAME⟧            -> src/scripts/NAME.js
  ⟦view:ID⟧                -> src/views/ID.html   (one <section class="view"> per page of the site)
  ⟦include:parts/FILE⟧     -> build/parts/FILE   (question banks, lessons… inside the files above)
  ⟦build⟧                  -> the build number (also written to version.json, so open tabs know there's an update)
"""
import os, re

B = os.path.dirname(os.path.abspath(__file__))
TOK = re.compile(r"⟦(style|script|view|include|build)(?::([^⟧]+))?⟧")


def _read(p):
    with open(os.path.join(B, p), encoding="utf-8") as f:
        return f.read()


def assemble(build_id):
    def sub(text, depth=0):
        assert depth < 5, "includes nested too deep"
        def rep(m):
            kind, arg = m.group(1), m.group(2)
            if kind == "build":
                return build_id
            path = {"style": "src/style.css", "script": f"src/scripts/{arg}.js", "view": f"src/views/{arg}.html", "include": arg}[kind]
            return sub(_read(path), depth + 1)
        return TOK.sub(rep, text)
    return sub(_read("src/page.html"))
