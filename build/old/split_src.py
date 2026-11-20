# One-time tool (Nov 20 2026): turned the ~200 chained patch steps into organized source files in build/src.
# python3 old/split_src.py /tmp/page_snapshot.html <build id in the snapshot>
import os, re, sys
B = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(sys.argv[1], encoding="utf-8").read()
bid = sys.argv[2]
assert s.count(bid) == 1
s = s.replace(bid, "⟦build⟧")
src = os.path.join(B, "src"); os.makedirs(os.path.join(src, "scripts"), exist_ok=True); os.makedirs(os.path.join(src, "views"), exist_ok=True)
w = lambda p, t: open(os.path.join(src, p), "w", encoding="utf-8").write(t)

# 1) parts that are still used word for word become includes (longest first)
parts = []
for f in os.listdir(os.path.join(B, "parts")):
    p = os.path.join(B, "parts", f)
    if f.endswith(".py") or os.path.isdir(p): continue
    c = open(p, encoding="utf-8").read()
    if c and s.count(c) == 1: parts.append((len(c), f, c))
for _, f, c in sorted(parts, reverse=True):
    if s.count(c) == 1: s = s.replace(c, f"⟦include:parts/{f}⟧")

# 2) the style block
a = s.index("<style>") + len("<style>"); e = s.index("</style>", a)
w("style.css", s[a:e]); s = s[:a] + "⟦style⟧" + s[e:]

# 3) every top-level <script> block gets its own file, named after its first comment
out, i, n, names = [], 0, 0, set()
def slug(body):
    m = re.search(r"/\*\s*(.+?)\*/|//\s*(.+)", body[:400])
    t = (m.group(1) or m.group(2)) if m else "script"
    t = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")[:40] or "script"
    return t
while True:
    a = s.find("<script", i)
    if a < 0: out.append(s[i:]); break
    g = s.find(">", a) + 1; c = s.find("</script>", g)
    out.append(s[i:g]); body = s[g:c]
    if len(body.strip()) > 0:
        n += 1; nm = f"{n:03d}-{slug(body)}"
        while nm in names: nm += "x"
        names.add(nm); w(f"scripts/{nm}.js", body); out.append(f"⟦script:{nm}⟧")
    else:
        out.append(body)
    out.append("</script>"); i = c + len("</script>")
s = "".join(out)

# 4) every page of the site (<section class="view" id="...">…</section>) gets its own file
def sect_end(t, start):
    depth, j = 0, start
    rx = re.compile(r"<(/?)section\b")
    for m in rx.finditer(t, start):
        depth += -1 if m.group(1) else 1
        if depth == 0: return t.index(">", m.end()) + 1
    raise SystemExit("unbalanced section")
for m in list(re.finditer(r'<section class="view[^"]*" id="([^"]+)"', s))[::-1]:
    st = m.start(); en = sect_end(s, st)
    w(f"views/{m.group(1)}.html", s[st:en]); s = s[:st] + f"⟦view:{m.group(1)}⟧" + s[en:]
w("page.html", s)
print("ok", n, "scripts")
