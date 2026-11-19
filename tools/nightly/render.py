"""Turns the nightly wrap-up summary into a PNG for Noa's email.

    python3 tools/nightly/render.py summary.json nightly.png

summary.json:
{"date": "Thu, Nov 19",
 "forYou":  [{"t": "action, one line", "d": "detail (optional)", "link": "url (optional)"}],
 "failed":  [{"t": "step", "d": "what went wrong"}],
 "coming":  [{"t": "heads-up", "when": "Fri"}],
 "done":    [{"k": "Classes", "v": "3 logged (Pascal, Laura, Jhon)"}],
 "checked": ["payments", "access requests"]}
Empty lists are left out of the picture (except Done).
"""
import json, os, sys
from playwright.sync_api import sync_playwright

here = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(sys.argv[1], encoding="utf-8"))
out = os.path.abspath(sys.argv[2])
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 600, "height": 400}, device_scale_factor=2)
    pg.add_init_script("window.DATA = " + json.dumps(data, ensure_ascii=False) + ";")
    pg.goto("file://" + os.path.join(here, "card.html"))
    pg.wait_for_function("document.fonts.status === 'loaded'")
    pg.wait_for_timeout(200)
    pg.screenshot(path=out, full_page=True)
    b.close()
print("ok:", out)
