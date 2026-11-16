#!/usr/bin/env python3
"""Weekly club Instagram story (light design, 1080x1920 PNG) for Noa's English Club.

  python3 render.py week.json out.png

week.json:
{
  "week": "Nov 23–27",                         // shown as "<week> · live on Zoom"
  "title": "Then, Now",  "title_ul": "& Slang.",  // big headline; title_ul gets the gradient underline (optional)
  "lead": "One short line about the week",
  "classes": [                                 // 3-4 cards, in order (Mon, Wed, Thu, Fri)
    {"kind": "mon", "day": "MON", "n": 23, "ico": "🧠", "name": "Deep Dive Monday", "time": "20:00",
     "topic": "Short topic (max ~22 characters)", "desc": "One line, max ~60 characters"}
  ],
  "highlight": 0,                              // optional: index of the card with the coloured border (default: the first)
  "lang": "en"                                 // optional: "es" for Spanish labels
}
kind is mon / wed / thu / fri (sets the colours). Add "off": true to a class that's cancelled that week.
Needs Python Playwright with its Chromium (preinstalled in Claude's sandbox) and Pillow.
"""
import html, json, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
TXT = {
    "en": {"weekpill": "This week in the club", "label": "THIS WEEK'S CLASSES", "foot": "Chile time · <b>join when you can</b> · no prep needed",
           "cta": "Want in? Message me 👋", "cta_sub": "14 days free · no card needed"},
    "es": {"weekpill": "Esta semana en el club", "label": "CLASES DE ESTA SEMANA", "foot": "Hora de Chile · <b>ven cuando puedas</b> · sin preparación",
           "cta": "Quieres entrar? Escríbeme 👋", "cta_sub": "14 días gratis · sin tarjeta"},
}


def main(src, out):
    d = json.load(open(src, encoding="utf-8"))
    t = dict(TXT.get(d.get("lang", "en"), TXT["en"]))
    for k in ("weekpill", "label", "foot", "cta", "cta_sub"):
        if d.get(k):
            t[k] = html.escape(d[k])
    e = lambda x: html.escape(str(x or ""))
    hl = int(d.get("highlight", 0))
    cards = []
    for i, c in enumerate(d["classes"][:4]):
        cls = f'card {e(c.get("kind","mon"))}' + (" hl" if i == hl else "") + (" off" if c.get("off") else "")
        cards.append(f'''<div class="{cls}"><div class="day"><div class="d">{e(c.get("day"))}</div><div class="n">{e(c.get("n"))}</div></div>
      <div class="body"><div class="top"><span>{e(c.get("ico"))}</span><span class="cls">{e(c.get("name"))}</span><span class="time">{e(c.get("time"))}</span></div>
      <div class="topic">{e(c.get("topic"))}</div><div class="desc">{e(c.get("desc"))}</div></div></div>''')
    title = e(d.get("title")) + (f' <span class="ul">{e(d["title_ul"])}</span>' if d.get("title_ul") else "")
    page = open(os.path.join(HERE, "story.html"), encoding="utf-8").read()
    for k, v in {"WEEKPILL": t["weekpill"], "WEEK": e(d.get("week")), "TITLE": title, "LEAD": e(d.get("lead")), "LABEL": t["label"],
                 "CARDS": "\n".join(cards), "FOOT": t["foot"], "CTA": t["cta"], "CTA_SUB": t["cta_sub"]}.items():
        page = page.replace("{{" + k + "}}", v)
    tmp = os.path.join(HERE, "_render.html")
    open(tmp, "w", encoding="utf-8").write(page)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch()
            pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
            pg.goto("file://" + tmp)
            pg.wait_for_timeout(700)
            check = pg.evaluate("""()=>{const f=document.querySelector('.foot').getBoundingClientRect(), c=document.querySelector('.cta').getBoundingClientRect();
              const cut=[...document.querySelectorAll('.topic,.desc,.top')].filter(x=>x.scrollWidth>x.clientWidth+1).map(x=>x.textContent.trim().slice(0,40));
              return {overlap: f.bottom > c.top - 20, cut}}""")
            big = out + ".2x.png"
            pg.screenshot(path=big)
            b.close()
        Image.open(big).resize((1080, 1920), Image.LANCZOS).save(out)
        os.remove(big)
    finally:
        os.remove(tmp)
    print(json.dumps({"ok": not check["overlap"] and not check["cut"], "out": out, **check}, ensure_ascii=False))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
