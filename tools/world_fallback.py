#!/usr/bin/env python3
"""Fallback for Hibi's "Around the world today" card (world.json).
Runs from GitHub Actions every morning. If Claude's daily task didn't add today's pieces (Chile date),
it adds 3 simple, safe ones: a public holiday somewhere in the world (date.nager.at), NASA's astronomy picture of the day,
and a fun fact from tools/world_facts.json. No AI, no keys. Keeps the last 14 days."""
import json, os, sys, urllib.request, datetime, zoneinfo, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "world.json")
today = datetime.datetime.now(zoneinfo.ZoneInfo("America/Santiago")).date()
DAY = today.isoformat()

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "hibi-world-fallback"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))

data = {"days": []}
if os.path.exists(PATH):
    with open(PATH, encoding="utf-8") as f:
        data = json.load(f)
if any(d.get("date") == DAY and d.get("items") for d in data.get("days", [])):
    print("today is already there:", DAY); sys.exit(0)

items = []
# 1) a public holiday somewhere today
try:
    hs = [h for h in get("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide") if h.get("date") == DAY]
    names = {}
    try:
        names = {c["countryCode"]: c["name"] for c in get("https://date.nager.at/api/v3/AvailableCountries")}
    except Exception:
        pass
    if hs:
        h = sorted(hs, key=lambda x: x.get("countryCode", ""))[today.toordinal() % len(hs)]
        country = names.get(h.get("countryCode"), h.get("countryCode", ""))
        nm = h.get("name") or h.get("localName")
        items.append({"k": "celebrate", "emoji": "🎉", "title": f"Today in {country}: {nm}",
            "text": f"Today is a public holiday in {country}: {nm}. Many people don't go to work or school, and families get together to celebrate.",
            "word": "holiday", "mean": "a special day when most people don't work", "tr": "feriado",
            "es": f"Hoy es feriado en {country}.",
            "q": "What's your favorite holiday of the year, and how do you celebrate it?",
            "link": "https://en.wikipedia.org/wiki/Special:Search?search=" + urllib.parse.quote(f"{nm} {country}"), "src": "Wikipedia", "kind": "read"})
except Exception as e:
    print("holidays:", e)

# 2) NASA's astronomy picture of the day
try:
    a = get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    ex = (a.get("explanation") or "").split(". ")
    text = ". ".join(ex[:2]).strip()
    if text and not text.endswith("."): text += "."
    if len(text) > 260: text = text[:257].rsplit(" ", 1)[0] + "…"
    d = (a.get("date") or DAY).replace("-", "")[2:]
    items.append({"k": "space", "emoji": "🔭", "title": "NASA's picture of the day: " + (a.get("title") or "Space"),
        "text": text, "word": "", "q": "If you could take a photo of anything in space, what would it be?",
        "link": f"https://apod.nasa.gov/apod/ap{d}.html", "src": "NASA", "kind": "watch" if a.get("media_type") == "video" else "read"})
except Exception as e:
    print("apod:", e)

# 3) a fun fact (different every day)
with open(os.path.join(ROOT, "tools", "world_facts.json"), encoding="utf-8") as f:
    facts = json.load(f)
fact = dict(facts[today.toordinal() % len(facts)]); fact.update({"k": "good", "kind": "read"})
items.append(fact)
# with no holiday or no NASA, add another fun fact so there are always 3
i = 1
while len(items) < 3:
    x = dict(facts[(today.toordinal() + i * 7) % len(facts)]); x.update({"k": "good", "kind": "read"}); items.append(x); i += 1

order = {"celebrate": 0, "space": 1, "good": 2}
items.sort(key=lambda x: order.get(x["k"], 3))
days = [d for d in data.get("days", []) if d.get("date") != DAY]
days.insert(0, {"date": DAY, "by": "auto", "items": items[:3]})
days.sort(key=lambda d: d["date"], reverse=True)
data["days"] = days[:14]
with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2); f.write("\n")
print("added fallback for", DAY)
