# Runs last (Nov 20 2026): makes Hibi lighter on phones.
# The big inline <script> blocks of index.html are moved into their own files named after their content
# (js/h-<hash>.js; module scripts go next to index.html as m-<hash>.js so their imports still work).
# A file only gets a new name when its content changes, so phones keep the unchanged parts after an update
# and only download what's new. sw.js serves these files from its cache once it has them.
import sys, os, re, hashlib, glob
path = sys.argv[1]
root = os.path.dirname(os.path.abspath(path))
s = open(path, encoding="utf-8").read()
os.makedirs(os.path.join(root, "js"), exist_ok=True)
out, i, keep = [], 0, set()
MIN = 4000
while True:
    a = s.find("<script", i)
    if a < 0:
        out.append(s[i:]); break
    e = s.find(">", a)
    tag = s[a:e + 1]
    c = s.lower().find("</script", e)
    end = s.find(">", c) + 1
    body = s[e + 1:c]
    out.append(s[i:a])
    kind = "classic" if tag == "<script>" else "module" if tag == '<script type="module">' else None
    if kind and len(body) >= MIN and "</script" not in body.lower():
        h = hashlib.sha256(body.encode("utf-8")).hexdigest()[:12]
        if kind == "classic":
            name = f"js/h-{h}.js"; ref = f'<script src="{name}"></script>'
        else:
            name = f"m-{h}.js"; ref = f'<script type="module" src="{name}"></script>'
        fp = os.path.join(root, name)
        if not os.path.exists(fp):
            open(fp, "w", encoding="utf-8").write(body)
        keep.add(os.path.abspath(fp)); out.append(ref)
    else:
        out.append(s[a:end])
    i = end
s2 = "".join(out)
# the files from older builds are no longer used
for f in glob.glob(os.path.join(root, "js", "h-*.js")) + glob.glob(os.path.join(root, "m-*.js")):
    if os.path.abspath(f) not in keep:
        os.remove(f)
open(path, "w", encoding="utf-8").write(s2)
print(f"split: index.html {len(s.encode())//1024} KB -> {len(s2.encode())//1024} KB, {len(keep)} cached pieces")
