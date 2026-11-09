#!/usr/bin/env python3
"""Nightly helper for Noa's student hub (no secrets in this file).

Signs in as the nightly helper account (password from the HUB_PASSWORD env var)
and reads/writes ONLY the hub documents the Firestore rules allow:
users/{teacher}/data/t-hub-<student>, users/{teacher}/data/t-hubmeta and
users/{student}/data/hub-view (the student's read-only copy).

Usage:
  HUB_PASSWORD=... python3 hubsync.py list
  HUB_PASSWORD=... python3 hubsync.py get <student-id>
  HUB_PASSWORD=... python3 hubsync.py add-class <student-id> '<json>'
      json: {"date":"2026-11-09","topics":"...","homework":"...","att":"Present",
             "hour":"Standard"|"Priority"|"", "credits":3 (optional), "pack":"<id>" (optional)}
  HUB_PASSWORD=... python3 hubsync.py add-note <student-id> '<json>'   {"date":..., "topics":...}
  HUB_PASSWORD=... python3 hubsync.py merge <student-id> '<json>'      shallow-merge profile fields
  HUB_PASSWORD=... python3 hubsync.py set-meta '<json>'                e.g. {"upcoming":[{"start":ISO,"student":id,"name":..}]}
  HUB_PASSWORD=... python3 hubsync.py add-words <student-id> '[{"w":"word","tr":"meaning","ex":"example"}, ...]'   (skips words already there)
  HUB_PASSWORD=... python3 hubsync.py club <student-id> on|off   (on = private + club member, sits in the middle of the park)
  HUB_PASSWORD=... python3 hubsync.py recommend '{"hub":"laura","name":"Laura Porcile","mod":"pp","stage":6,"title":"Present perfect or past simple?","why":"said 'I have seen it yesterday' twice","from":"private class Nov 9"}'
      mod: "ps" (Past simple: 1 Regular verbs, 2 Irregular verbs, 3 Was/were, 4 Negatives, 5 Questions, 6 Mix it up, 7 Tell the story)
           "pp" (Present perfect: 1 Have/has + verb, 2 Irregular participles, 3 Negatives & questions, 4 Ever/never/already/yet/just, 5 For & since, 6 PP or past simple?, 7 Tell the story)
      or instead of mod/stage use "pack": a word pack (expr = Everyday expressions, phrasal = Everyday phrasal verbs, travel = Travel, work = English at work)
      or instead of mod/stage use "page": a Cheat Sheet page id (basics, be, tenses, verbs, mistakes, pronouns, time, place, tofor, quantity, frequency,
           compare, gerund, usedto, perfect, modals, conditionals, passive, reported, phrasal, domake, false, pronunciation, numbers, email, interview, linking, opinions)
  HUB_PASSWORD=... python3 hubsync.py club-post @/tmp/club-post.json   this week's club post, straight to club members' Hibi (Club page + Home card):
      {"week":"2026-11-09" (the Monday),"title":"...","intro":"short hello + announcements (plain text)",
       "classes":[{"day":"Mon","ico":"🐾","name":"Deep Dive Monday","title":"Pets, People & Why Animals Feel Safe","teaser":"1-2 lines"}, ...],
       "closing":"light closing line"}   (times and Zoom links come from club-info; add "date"/"time"/"zoom" to a class only if it's different that week)
  HUB_PASSWORD=... python3 hubsync.py club-info '{"schedule":[{"wd":1,"ico":"🧠","name":"Deep Dive Monday","time":"20:00","dur":90,"desc":"...","zoom":"https://..."}],"links":[{"title":"...","url":"https://...","note":"..."}]}'
  HUB_PASSWORD=... python3 hubsync.py club-activity [hours]   new club wall posts/comments/photos (default: last 24 h)
  HUB_PASSWORD=... python3 hubsync.py club-sync   give/remove club page access (new sign-ups who match the Skool roster, role changes)
  HUB_PASSWORD=... python3 hubsync.py idea '{"kind":"grammar"|"words","title":"Future: will vs going to","why":"what keeps coming up","example":"I will go tomorrow (planned)","student":"Laura Porcile"}'
      an idea for a NEW grammar module / word pack Hibi doesn't have yet; the same title again adds +1 and the student
  HUB_PASSWORD=... python3 hubsync.py ideas      list them
  HUB_PASSWORD=... python3 hubsync.py add-payment <student-id> '{"date":"2026-11-09","what":"2nd half of Pack 36","clp":112200,"pack":"p1","paid":"full"}'
  HUB_PASSWORD=... python3 hubsync.py add-guide <student-id> '{"title":"Past simple guide","url":"https://docs.google.com/...","date":"2026-11-09"}'
  HUB_PASSWORD=... python3 hubsync.py set-focus <student-id> '{"focus":"what we're working on (the student sees it, written to them)","objective":"(optional) new goal"}'
  HUB_PASSWORD=... python3 hubsync.py set-recap <student-id> '{"date":"2026-11-09","summary":"2-3 sentences to the student","talked":["topic",...],
      "vocab":[{"w":"word","tr":"meaning","ex":"example"}],"homework":"...","heads":["reminder",...]}'   (mini recap on My coaching; keeps only the newest class)
  HUB_PASSWORD=... python3 hubsync.py resources <student-id> add|remove fabulang|chatterbox|simplified|tedideas|tedtalks|slow
      (class resources on My coaching; until Noa or this sets them, they're guessed from the recent class notes)
  HUB_PASSWORD=... python3 hubsync.py set-level '<Hibi name or email>' B1 ['short reason']   club member's level from club recordings
  HUB_PASSWORD=... python3 hubsync.py add-doc <student-id> '{"title":"Session Zero plan","url":"https://www.notion.so/..."}'   (only Noa sees these)
  HUB_PASSWORD=... python3 hubsync.py add-report <student-id> @/tmp/report.json   progress report on the student's My coaching page (see REPORT below);
      prints the link to put in the student's email. Same "to" date again = replaces that report.
  HUB_PASSWORD=... python3 hubsync.py reports <student-id>             list a student's reports (id, period)
  HUB_PASSWORD=... python3 hubsync.py del-report <student-id> <report-id>
  HUB_PASSWORD=... python3 hubsync.py link-new     link new Cheat Sheet accounts to hub students (email / full name); prints unsure ones

Any '<json>' argument can also be @/path/to/file.json or - (read from stdin).

REPORT json (write everything TO the student, "you", at their level; plain text, no markdown):
  {"from":"2026-10-19","to":"2026-11-09","sessions":5,
   "snapshot":"2-3 sentences",
   "clicking":[{"win":"what's working","example":"real example from class"}, ...]   (3-4),
   "topics":["...", ...],
   "patterns":["...", ...],
   "focus":[{"area":"...","tip":"one concrete tip"}, ...]   (2-3),
   "resource":{"title":"...","url":"https://...","why":"..."},
   "recordings":[{"date":"2026-10-21","url":"https://zoom.us/rec/share/..."}, ...],
   "month":"(optional) Zooming out: your month at a glance",
   "closing":"short warm note"}
"""
import json, os, re, sys, random, string, datetime, urllib.request, urllib.error

API_KEY = "AIzaSyAPhkFh-6mMzlILQh_-RVq6aJJ2o2Q7Raw"
PROJECT = "learnwithnoa-cheatsheet"
EMAIL = "nightly-helper@learnwithnoa-cheatsheet.firebaseapp.com"
TEACHER_FIRST = "Noa"
BASE = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents"
COUNTS = {"Present", "Late cancellation", "Absent"}
MES = {"enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6, "julio": 7, "agosto": 8, "septiembre": 9, "setiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12}


def http(method, url, body=None, token=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={"Content-Type": "application/json"})
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise SystemExit(f"HTTP {e.code} on {method} {url.split('?')[0]}: {e.read().decode()[:400]}")


TOKEN_CACHE = os.path.join(os.environ.get("TMPDIR", "/tmp"), "hubsync-token.json")


def login():
    """Sign in once and reuse the token (~55 min) so many commands in a row don't hit Firebase's sign-in limit."""
    import time
    try:
        with open(TOKEN_CACHE) as f:
            c = json.load(f)
        if c.get("exp", 0) > time.time() + 60:
            return c["tok"]
        if c.get("refresh"):
            r = http("POST", f"https://securetoken.googleapis.com/v1/token?key={API_KEY}", {"grant_type": "refresh_token", "refresh_token": c["refresh"]})
            if r and r.get("id_token"):
                _cache(r["id_token"], r.get("refresh_token", c["refresh"]), int(r.get("expires_in", 3600)))
                return r["id_token"]
    except (OSError, ValueError, SystemExit):
        pass
    pw = os.environ.get("HUB_PASSWORD")
    if not pw:
        raise SystemExit("Set HUB_PASSWORD")
    r = http("POST", f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}",
             {"email": EMAIL, "password": pw, "returnSecureToken": True})
    _cache(r["idToken"], r.get("refreshToken", ""), int(r.get("expiresIn", 3600)))
    return r["idToken"]


def _cache(tok, refresh, ttl):
    import time
    try:
        fd = os.open(TOKEN_CACHE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w") as f:
            json.dump({"tok": tok, "refresh": refresh, "exp": time.time() + ttl - 300}, f)
    except OSError:
        pass


def teacher_uid(tok):
    if os.environ.get("HUB_TEACHER_UID"):
        return os.environ["HUB_TEACHER_UID"]
    r = http("GET", f"{BASE}/park?pageSize=300&mask.fieldPaths=first", token=tok) or {}
    for d in r.get("documents", []):
        uid = d["name"].rsplit("/", 1)[1]
        if d.get("fields", {}).get("first", {}).get("stringValue") == TEACHER_FIRST:
            if get_doc(tok, uid, "t-hub-laura") is not None or get_doc(tok, uid, "t-hubmeta") is not None:
                return uid
    raise SystemExit("Couldn't find the teacher's hub. Set HUB_TEACHER_UID.")


def get_doc(tok, uid, key):
    r = http("GET", f"{BASE}/users/{uid}/data/{key}", token=tok)
    if not r:
        return None
    f = r.get("fields", {})
    if f.get("deleted", {}).get("booleanValue"):
        return None
    return json.loads(f.get("json", {}).get("stringValue", "null"))


def set_doc(tok, uid, key, obj):
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    http("PATCH", f"{BASE}/users/{uid}/data/{key}", {"fields": {
        "json": {"stringValue": json.dumps(obj, ensure_ascii=False)},
        "deleted": {"booleanValue": False},
        "at": {"timestampValue": now}}}, token=tok)


def list_students(tok, tu):
    # the hub keeps its student ids in t-hubmeta (the helper can't list the whole folder)
    m = get_doc(tok, tu, "t-hubmeta") or {}
    out = []
    for sid in m.get("ids", []):
        s = get_doc(tok, tu, "t-hub-" + sid)
        if s:
            out.append(s)
    return out


# ---- pack maths (same as hubview.js) ----
def pack_stats(s, p):
    cl = [c for c in s.get("classes", []) if c.get("kind") != "note" and c.get("pack") == p["id"] and (c.get("att") or "Present") in COUNTS]
    used = sum(int(c.get("credits") or 0) for c in cl) if p.get("unit") == "credits" else len(cl)
    size = p.get("size") or 0
    left = size - used if size else None
    first = min([c["date"] for c in cl if c.get("date")] or [""])
    pri = (sum(1 for c in cl if c.get("hour") == "Priority") > len(cl) / 2) if cl else ("priority" in (p.get("label") or "").lower())
    per = (4 if pri else 3) if p.get("unit") == "credits" else 1
    return {"done": len(cl), "used": used, "size": size, "left": left, "first": first, "per": per,
            "classesLeft": None if left is None else max(0, left) // per, "pri": pri}


def deadline(p, first):
    if p.get("deadlineISO"):
        return p["deadlineISO"]
    import re
    m = re.search(r"(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)", (p.get("deadline") or "").lower())
    if not m or m.group(2) not in MES:
        return ""
    base = first or p.get("created") or datetime.date.today().isoformat()
    iso = f"{base[:4]}-{MES[m.group(2)]:02d}-{int(m.group(1)):02d}"
    if iso < base:
        iso = f"{int(base[:4]) + 1}{iso[4:]}"
    return iso


def cur_pack(s):
    ps = [p for p in s.get("packs", []) if not p.get("archived")]
    return ps[-1] if ps else None


def inst_at(p, st):
    if p.get("size") == 36:
        return 5 if st["pri"] else 7
    if p.get("size") == 72:
        return 9 if st["pri"] else 12
    return None


def _recent_text(s):
    return " | ".join((c.get("topics") or "") + " " + (c.get("homework") or "") for c in [c for c in s.get("classes", []) if c and c.get("kind") != "note"][-12:]).lower()


RES_KEYS = ["fabulang", "chatterbox", "simplified", "tedideas", "tedtalks", "slow"]


def res_detect(s):
    t = _recent_text(s); out = []
    if "fabulang" in t: out.append("fabulang")
    if re.search(r"chatter ?box", t): out.append("chatterbox")
    if "simplified" in t or ("culips" in t and not re.search(r"chatter ?box", t)): out.append("simplified")
    if re.search(r"ideas\.?\s?ted|ted ideas", t): out.append("tedideas")
    if re.search(r"ted talk|\bted\.com/talks", t): out.append("tedtalks")
    if "slow english" in t or s.get("slowUrl"): out.append("slow")
    return out


def res_keys(s):
    return list(s["res"]) if isinstance(s.get("res"), list) else res_detect(s)


def fab_level(s):
    def lv(x):
        m = re.search(r"\b([abc][12])\b", str(x or ""), re.I)
        return m.group(1).lower() if m else ""
    if s.get("fabLevel"):
        return lv(s["fabLevel"])
    said = re.findall(r"fabulang\s*\(?\s*([abc][12])\b", _recent_text(s))
    return said[-1] if said else lv(s.get("cefr") or s.get("level"))


def res_for(s):
    lv = fab_level(s); keep = set(res_keys(s))
    out = [
        {"k": "fabulang", "ico": "📖", "name": "Fabulang", "note": ("Stories at your level (" + lv.upper() + ")") if lv else "Short stories to read and listen to", "url": "https://www.fabulang.com/en/en" + ("/" + lv if lv else "")},
        {"k": "chatterbox", "ico": "🎧", "name": "Culips · Chatterbox", "note": "Natural conversations", "url": "https://esl.culips.com/category/chatter-box/"},
        {"k": "simplified", "ico": "🎧", "name": "Culips · Simplified Speech", "note": "Clear, slower English", "url": "https://esl.culips.com/category/simplified-speech/"},
        {"k": "tedideas", "ico": "💡", "name": "TED Ideas", "note": "Short articles", "url": "https://ideas.ted.com/"},
        {"k": "tedtalks", "ico": "🎤", "name": "TED Talks", "note": "Talks with subtitles", "url": "https://www.ted.com/talks"},
        {"k": "slow", "ico": "🐢", "name": "Slow English Podcast", "note": "Your playlist" if s.get("slowUrl") else "Pick the playlist for your level", "url": s.get("slowUrl") or "https://www.youtube.com/@Slow_English_Podcast/playlists"},
    ]
    return [r for r in out if r["k"] in keep]


def make_view(s, meta=None):
    meta = meta or {}
    cp = cur_pack(s)
    cst = pack_stats(s, cp) if cp else None
    due = None
    if cp and cst and s.get("kind") != "trueque" and cp.get("size"):
        due = {"label": cp.get("label", ""), "half": cp.get("paid") == "half", "pending": cp.get("paid") == "pending",
               "instAt": inst_at(cp, cst) if cp.get("paid") == "half" else None, "nextNo": cst["done"] + 1,
               "left": cst["left"], "classesLeft": cst["classesLeft"], "unit": cp.get("unit")}
    now = datetime.datetime.now(datetime.timezone.utc)
    def ts(x):
        try:
            return datetime.datetime.fromisoformat(x.replace("Z", "+00:00"))
        except Exception:
            return None
    ups = sorted([u for u in meta.get("upcoming", []) if u and u.get("student") == s["id"] and ts(u.get("start", "")) and ts(u["start"]) > now - datetime.timedelta(hours=1)], key=lambda u: ts(u["start"]))
    tips = [r for r in meta.get("recs", []) if r and r.get("hub") == s["id"] and not r.get("done")][-5:]
    packs = []
    for p in s.get("packs", []):
        st = pack_stats(s, p)
        packs.append({"id": p["id"], "label": p.get("label", ""), "size": p.get("size"), "unit": p.get("unit"), "used": st["used"], "done": st["done"],
                      "left": st["left"], "deadline": deadline(p, st["first"]), "paid": p.get("paid"), "current": not p.get("archived"), "color": p.get("color", "")})
    return {"v": 1, "name": s["name"], "level": s.get("cefr") or s.get("level", ""), "schedule": s.get("schedule", ""), "objective": s.get("objective", ""), "kind": s.get("kind", "pack"),
            "packs": packs,
            "classes": [{k: c.get(k, "" if k != "credits" else None) for k in ("date", "dateText", "topics", "homework", "att", "hour", "credits", "pack")}
                        for c in s.get("classes", []) if c.get("kind") != "note"],
            "payments": [{"date": p.get("date", ""), "what": p.get("what", ""), "amount": p.get("amount", "")} for p in s.get("payments", [])],
            "words": [{"w": w.get("w", ""), "tr": w.get("tr", ""), "ex": w.get("ex", ""), "i": i} for i, w in enumerate(s.get("words", []))],
            "focus": s.get("focus", ""), "recap": s.get("recap") or None, "resources": res_for(s), "tz": s.get("tz", ""), "country": s.get("country", ""), "next": ups[0]["start"] if ups else "", "due": due,
            "club": (meta.get("clubFeed") or None) if s.get("uid") and s.get("uid") in (meta.get("clubUids") or []) else None,
            "reports": [view_report(r) for r in (s.get("reports") or [])[-12:] if r and r.get("id")],
            "guides": [{"title": g.get("title") or "Guide", "url": g["url"], "date": g.get("date", "")} for g in s.get("guides", []) if g and g.get("url")],
            "tips": [{"title": r.get("title", ""), "mod": r.get("mod", ""), "stage": r.get("stage"), "page": r.get("page", ""), "pack": r.get("pack", ""), "why": r.get("why", ""), "date": r.get("date", "")} for r in tips],
            "updated": int(datetime.datetime.now().timestamp() * 1000)}


SITE = "https://learnwithnoa.github.io/cheatsheet/"
PACKS = ["expr", "phrasal", "travel", "work"]   # word packs on Hibi (Practice → Word packs)


def _txt(x, n=1200):
    return re.sub(r"[ \t]+", " ", str(x or "")).strip()[:n]


def _url(x):
    x = str(x or "").strip()
    return x if re.match(r"^https://", x) else ""


def clean_report(d):
    def day(x):
        x = str(x or "").strip()[:10]
        datetime.date.fromisoformat(x)  # raises on a bad date
        return x
    out = {"id": "r" + day(d["to"]).replace("-", ""), "from": day(d["from"]), "to": day(d["to"]),
           "sessions": int(d.get("sessions") or len(d.get("recordings") or [])),
           "snapshot": _txt(d.get("snapshot"), 900),
           "clicking": [], "topics": [_txt(x, 200) for x in (d.get("topics") or []) if _txt(x)][:12],
           "patterns": [_txt(x, 500) for x in (d.get("patterns") or []) if _txt(x)][:6],
           "focus": [], "resource": None, "recordings": [],
           "month": _txt(d.get("month"), 1500), "closing": _txt(d.get("closing"), 600),
           "at": datetime.date.today().isoformat()}
    for c in (d.get("clicking") or [])[:6]:
        c = c if isinstance(c, dict) else {"win": c}
        if _txt(c.get("win")):
            out["clicking"].append({"win": _txt(c.get("win"), 400), "example": _txt(c.get("example"), 400)})
    for f in (d.get("focus") or [])[:4]:
        f = f if isinstance(f, dict) else {"area": f}
        if _txt(f.get("area")):
            out["focus"].append({"area": _txt(f.get("area"), 300), "tip": _txt(f.get("tip"), 500)})
    r = d.get("resource") or {}
    if isinstance(r, dict) and _txt(r.get("title")):
        out["resource"] = {"title": _txt(r.get("title"), 200), "url": _url(r.get("url")), "why": _txt(r.get("why"), 400)}
    for x in (d.get("recordings") or [])[:20]:
        if isinstance(x, dict) and _url(x.get("url")):
            out["recordings"].append({"date": str(x.get("date") or "")[:10], "url": _url(x["url"]), "label": _txt(x.get("label"), 80)})
    if not out["snapshot"]:
        raise SystemExit("A report needs at least a snapshot.")
    if out["from"] > out["to"]:
        raise SystemExit("from is after to")
    return out


def view_report(r):
    return {k: r.get(k) for k in ("id", "from", "to", "sessions", "snapshot", "clicking", "topics", "patterns", "focus", "resource", "recordings", "month", "closing", "at")}


def club_member_uids(tok, tu, m, students=None):
    """Who gets the club page: explicit club role, 'both' private students, or a Hibi account matching the Skool roster. Noa too."""
    roles, accounts = get_roles(tok), get_accounts(tok)
    roster = (m.get("club") or {}).get("members") or []
    r_emails = {norm_email(x.get("email", "")) for x in roster if x.get("email")}
    r_names = {norm_name(x.get("name", "")) for x in roster if x.get("name")}
    out = {tu}
    for acc in accounts:
        uid = acc["uid"]; r = roles.get(uid) or {}
        if r.get("club") is True:
            out.add(uid); continue
        if r.get("club") is False:
            continue
        if r.get("hub"):
            if r["hub"] in BOTH_DEFAULT:
                out.add(uid)
            continue
        if (acc.get("email") and norm_email(acc["email"]) in r_emails) or (acc.get("name") and len(norm_name(acc["name"]).split()) >= 2 and norm_name(acc["name"]) in r_names):
            out.add(uid)
    return sorted(out), roles


def club_sync(tok, tu, m=None, quiet=False):
    m = m or get_doc(tok, tu, "t-hubmeta") or {}
    uids, roles = club_member_uids(tok, tu, m)
    before = set(m.get("clubUids") or [])
    m["clubUids"] = uids; set_doc(tok, tu, "t-hubmeta", m)
    feed = m.get("clubFeed") or {}
    hub_of = {u: (r or {}).get("hub") for u, r in roles.items() if (r or {}).get("hub")}
    now = int(datetime.datetime.now().timestamp() * 1000)
    added, removed = [], []
    for uid in sorted(set(uids) | before):
        on = uid in uids
        if hub_of.get(uid):
            s = get_doc(tok, tu, "t-hub-" + hub_of[uid])
            if s and s.get("uid") == uid:
                publish(tok, tu, s, m)
                (added if on and uid not in before else removed if not on else []).append(uid)
                continue
        if on:
            set_doc(tok, uid, "hub-view", {"v": 1, "clubOnly": True, "club": feed, "updated": now})
            if uid not in before: added.append(uid)
        else:
            now_s = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            http("PATCH", f"{BASE}/users/{uid}/data/hub-view", {"fields": {"json": {"stringValue": "null"}, "deleted": {"booleanValue": True}, "at": {"timestampValue": now_s}}}, token=tok)
            removed.append(uid)
    # a members-only-safe preview for everyone else on Hibi: this week's topics + schedule, never Zoom links
    try:
        ps = sorted(feed.get("posts") or [], key=lambda x: x.get("week", ""))
        last = ps[-1] if ps else None
        pub = {"info": {"schedule": [{k: v for k, v in s.items() if k != "zoom"} for s in ((feed.get("info") or {}).get("schedule") or [])]},
               "post": {"week": last["week"], "title": last.get("title", ""), "classes": [{k: v for k, v in c.items() if k != "zoom"} for c in last.get("classes", [])]} if last else None}
        http("PATCH", f"{BASE}/clubPublic/week", {"fields": {"json": {"stringValue": json.dumps(pub, ensure_ascii=False)}}}, token=tok)
    except SystemExit:
        pass
    # the club list the database's security rules check for the community wall (clubAccess/{uid})
    acc_note = "ok"
    try:
        accts = {a["uid"]: a for a in get_accounts(tok)}
        for uid in uids:
            http("PATCH", f"{BASE}/clubAccess/{uid}", {"fields": {"on": {"booleanValue": True}, "name": {"stringValue": (accts.get(uid) or {}).get("name", "")}}}, token=tok)
        for uid in before - set(uids):
            try:
                http("DELETE", f"{BASE}/clubAccess/{uid}", token=tok)
            except SystemExit:
                pass
    except SystemExit as e:
        acc_note = "community wall not switched on yet (database rules missing): " + str(e)[:80]
    if not quiet:
        print(json.dumps({"members": len(uids), "added": len(added), "removed": len(removed), "wall": acc_note}))
    return uids


def clean_club_post(d):
    week = str(d.get("week") or "")[:10]; datetime.date.fromisoformat(week)
    cls = []
    for c in (d.get("classes") or [])[:8]:
        if not isinstance(c, dict):
            continue
        x = {"day": _txt(c.get("day"), 10), "ico": _txt(c.get("ico"), 8), "name": _txt(c.get("name"), 80), "title": _txt(c.get("title"), 140), "teaser": _txt(c.get("teaser"), 600)}
        if c.get("date"):
            x["date"] = str(c["date"])[:10]; datetime.date.fromisoformat(x["date"])
        if c.get("time"):
            x["time"] = _txt(c["time"], 5)
        if c.get("wd") is not None:
            x["wd"] = int(c["wd"])
        if _url(c.get("zoom")):
            x["zoom"] = _url(c["zoom"])
        cls.append(x)
    return {"id": "w" + week.replace("-", ""), "week": week, "title": _txt(d.get("title"), 160), "intro": str(d.get("intro") or "").strip()[:2500],
            "classes": cls, "closing": str(d.get("closing") or "").strip()[:800], "at": datetime.date.today().isoformat()}


def report_link(rid):
    return SITE + "?report=" + rid + "#coaching"


def save(tok, tu, s, meta=None):
    s["updatedAt"] = int(datetime.datetime.now().timestamp() * 1000)
    set_doc(tok, tu, "t-hub-" + s["id"], s)
    publish(tok, tu, s, meta)


def publish(tok, tu, s, meta=None):
    """Refresh the student's read-only copy (needs Noa's meta for next class + tips)."""
    if s.get("uid"):
        if meta is None:
            meta = get_doc(tok, tu, "t-hubmeta") or {}
        set_doc(tok, s["uid"], "hub-view", make_view(s, meta))


def publish_all(tok, tu, meta, only=None):
    for sid in (meta.get("ids") or []):
        if only and sid not in only:
            continue
        s = get_doc(tok, tu, "t-hub-" + sid)
        if s and s.get("uid"):
            publish(tok, tu, s, meta)


def rid():
    return "".join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))


def summary(s):
    p = cur_pack(s)
    st = pack_stats(s, p) if p else None
    last = max([c["date"] for c in s.get("classes", []) if c.get("kind") != "note" and c.get("date")] or [""])
    return {"id": s["id"], "name": s["name"], "status": s.get("status"), "kind": s.get("kind"), "email": s.get("email", ""), "zoomKey": s.get("zoomKey", ""),
            "lastClass": last, "pack": p and {"id": p["id"], "label": p.get("label"), "paid": p.get("paid"), "allStd": p.get("allStd", False), **(st or {}),
                                              "deadline": deadline(p, st["first"]) if st else ""}}


# ---- linking (same rules as hubview.js matchAccounts) ----
import unicodedata, re as _re
BOTH_DEFAULT = ["laura", "felipe-torres", "belen"]
HELPER_EMAIL = EMAIL


def norm_email(e):
    e = (e or "").strip().lower()
    if "@" not in e:
        return e
    u, d = e.split("@", 1)
    return u.split("+")[0].replace(".", "") + "@gmail.com" if d in ("gmail.com", "googlemail.com") else e


def norm_name(n):
    n = unicodedata.normalize("NFD", (n or "").lower())
    n = "".join(c for c in n if not unicodedata.combining(c))
    return _re.sub(r"\s+", " ", _re.sub(r"[^a-z ]", " ", n)).strip()


def get_accounts(tok):
    out, page = [], ""
    while True:
        r = http("GET", f"{BASE}/users?pageSize=300" + (f"&pageToken={page}" if page else ""), token=tok) or {}
        for d in r.get("documents", []):
            f = d.get("fields", {})
            out.append({"uid": d["name"].rsplit("/", 1)[1], "name": f.get("name", {}).get("stringValue", ""), "email": f.get("email", {}).get("stringValue", "")})
        page = r.get("nextPageToken")
        if not page:
            return out


def get_roles(tok):
    r = http("GET", f"{BASE}/roles?pageSize=300", token=tok) or {}
    out = {}
    for d in r.get("documents", []):
        f = d.get("fields", {})
        out[d["name"].rsplit("/", 1)[1]] = {k: list(v.values())[0] for k, v in f.items() if k != "at"}
    return out


def match_accounts(students, accounts, roles):
    linked = {r.get("hub") for r in roles.values() if r.get("hub")}
    free = [s for s in students if s["id"] not in linked and s.get("status") != "inactive"]
    sure, maybe = [], []
    for a in accounts:
        if (roles.get(a["uid"]) or {}).get("hub") or norm_email(a["email"]) == "learnwithnoa@gmail.com":
            continue
        em, nm = norm_email(a["email"]), norm_name(a["name"])
        by_e = [s for s in free if any(norm_email(e) == em for e in [s.get("email")] + (s.get("emails") or []) if e)]
        if len(by_e) == 1:
            sure.append({"uid": a["uid"], "hub": by_e[0]["id"], "why": "email"}); continue
        def full(s):
            sn = norm_name(s["name"])
            return sn and nm and (sn == nm or (len(sn.split()) > 1 and sn in nm) or (len(nm.split()) > 1 and nm in sn))
        f = [s for s in free if full(s)]
        if len(f) == 1:
            sure.append({"uid": a["uid"], "hub": f[0]["id"], "why": "name"}); continue
        first = nm.split(" ")[0] if nm else ""
        for s in free:
            if first and norm_name(s["name"]).split(" ")[0] == first:
                maybe.append({"uid": a["uid"], "hub": s["id"], "name": a["name"], "email": a["email"]})
    cnt = {}
    for x in sure:
        cnt[x["hub"]] = cnt.get(x["hub"], 0) + 1
    return [x for x in sure if cnt[x["hub"]] == 1], maybe + [x for x in sure if cnt[x["hub"]] > 1]


def set_role(tok, uid, role):
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    fields = {"club": {"booleanValue": role["club"]}, "private": {"booleanValue": True}, "hub": {"stringValue": role["hub"]}, "at": {"timestampValue": now}}
    mask = "&".join("updateMask.fieldPaths=" + k for k in fields)
    http("PATCH", f"{BASE}/roles/{uid}?{mask}", {"fields": fields}, token=tok)


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__); return
    tok = login()
    tu = teacher_uid(tok)
    cmd = a[0]
    if cmd == "whoami":
        print(json.dumps({"teacherUid": tu})); return
    if cmd == "list":
        roles = get_roles(tok); by_hub = {r.get("hub"): (u, r) for u, r in roles.items() if r.get("hub")}
        out = []
        for s in list_students(tok, tu):
            x = summary(s); u, r = by_hub.get(s["id"], (None, {}))
            x["cheatSheet"] = bool(u); x["role"] = ("both" if r.get("club") else "private") if u else None
            out.append(x)
        print(json.dumps(out, ensure_ascii=False, indent=1)); return
    if cmd == "club":
        sid, on = a[1], a[2] == "on"
        roles = get_roles(tok); u = next((u for u, r in roles.items() if r.get("hub") == sid), None)
        if not u:
            raise SystemExit(f"{sid} isn't linked to a Cheat Sheet account")
        set_role(tok, u, {"club": on, "hub": sid}); print("ok"); return
    if cmd == "link-new":
        students = list_students(tok, tu)
        accounts, roles = get_accounts(tok), get_roles(tok)
        sure, maybe = match_accounts(students, accounts, roles)
        done = []
        for x in sure:
            s = next(s for s in students if s["id"] == x["hub"])
            old = roles.get(x["uid"]) or {}
            club = old["club"] if isinstance(old.get("club"), bool) else (s["id"] in BOTH_DEFAULT)
            set_role(tok, x["uid"], {"club": club, "hub": s["id"]})
            s["uid"] = x["uid"]
            acc = next(a for a in accounts if a["uid"] == x["uid"])
            if acc["email"] and acc["email"].lower() not in [e.lower() for e in [s.get("email")] + (s.get("emails") or []) if e]:
                if not s.get("email"): s["email"] = acc["email"]
                else: s["emails"] = (s.get("emails") or []) + [acc["email"]]
            save(tok, tu, s)
            done.append({"student": s["name"], "account": acc["email"], "by": x["why"]})
        linked = {r.get("hub") for r in roles.values() if r.get("hub")} | {d["student"] for d in done}
        m = get_doc(tok, tu, "t-hubmeta") or {}
        dism = set(m.get("dismissed", []))
        unsure = [x for x in maybe if x["uid"] not in dism]
        print(json.dumps({"linked": done, "needs_noa": unsure}, ensure_ascii=False, indent=1)); return
    if cmd == "recommend":
        r = json.loads(a[1]); m = get_doc(tok, tu, "t-hubmeta") or {}
        recs = m.get("recs", []); today_s = datetime.date.today().isoformat()
        cutoff = (datetime.date.today() - datetime.timedelta(days=14)).isoformat()
        if r.get("pack") and r["pack"] not in PACKS:
            print("unknown word pack; use one of", PACKS); return
        dup = any(x.get("hub") == r.get("hub") and x.get("mod") == r.get("mod") and x.get("page") == r.get("page") and x.get("pack") == r.get("pack") and x.get("date", "") >= cutoff for x in recs)
        if dup:
            print("skip: same tip given in the last 14 days"); return
        r.update({"id": rid(), "date": today_s}); recs.append(r); m["recs"] = recs[-120:]
        set_doc(tok, tu, "t-hubmeta", m)
        if r.get("hub"):
            publish_all(tok, tu, m, only={r["hub"]})
        print("ok"); return
    if cmd == "club-info":
        # the weekly schedule (with Zoom links) and useful links on the club page
        d = json.loads(a[1]) if not a[1].startswith("@") else json.load(open(a[1][1:], encoding="utf-8"))
        m = get_doc(tok, tu, "t-hubmeta") or {}
        feed = m.get("clubFeed") or {}
        info = feed.get("info") or {}
        if "schedule" in d:
            info["schedule"] = [{"wd": int(x["wd"]), "ico": _txt(x.get("ico"), 8), "name": _txt(x.get("name"), 80), "time": _txt(x.get("time") or "20:00", 5), "dur": int(x.get("dur") or 90),
                                 "host": _txt(x.get("host"), 60), "desc": _txt(x.get("desc"), 300), "zoom": _url(x.get("zoom"))} for x in d["schedule"]]
        if "links" in d:
            info["links"] = [{"ico": _txt(x.get("ico"), 8), "title": _txt(x.get("title"), 80), "url": _url(x.get("url")), "note": _txt(x.get("note"), 200)} for x in d["links"] if _url(x.get("url"))]
        feed["info"] = info; m["clubFeed"] = feed
        club_sync(tok, tu, m); return
    if cmd == "club-post":
        # this week's post, straight to every club member's Hibi (Club page + Home card). Same week again = replaces it.
        raw = a[1]
        d = json.load(sys.stdin) if raw == "-" else json.load(open(raw[1:], encoding="utf-8")) if raw.startswith("@") else json.loads(raw)
        post = clean_club_post(d)
        m = get_doc(tok, tu, "t-hubmeta") or {}
        feed = m.get("clubFeed") or {}
        ps = [x for x in (feed.get("posts") or []) if x.get("id") != post["id"]]
        replaced = len(ps) != len(feed.get("posts") or [])
        ps.append(post); ps.sort(key=lambda x: x.get("week", "")); feed["posts"] = ps[-12:]
        m["clubFeed"] = feed
        uids = club_sync(tok, tu, m, quiet=True)
        print(json.dumps({"ok": True, "replaced": replaced, "id": post["id"], "members": len(uids), "link": SITE + "#club"})); return
    if cmd == "club-sync":
        club_sync(tok, tu); return
    if cmd == "club-activity":
        # new posts/comments/photos on the club community wall in the last N hours (default 24), for the nightly email
        hours = float(a[1]) if len(a) > 1 else 24
        since = int((datetime.datetime.now().timestamp() - hours * 3600) * 1000)
        q = {"structuredQuery": {"from": [{"collectionId": "clubActivity"}], "where": {"fieldFilter": {"field": {"fieldPath": "at"}, "op": "GREATER_THAN", "value": {"integerValue": str(since)}}},
                                 "orderBy": [{"field": {"fieldPath": "at"}, "direction": "DESCENDING"}], "limit": 100}}
        try:
            res = http("POST", f"{BASE}:runQuery", q, token=tok) or []
        except SystemExit as e:
            print(json.dumps({"error": "can't read the club wall yet (database rules missing?)", "detail": str(e)[:120]})); return
        out = []
        for r in res:
            d = r.get("document")
            if not d:
                continue
            f = {k: (v.get("stringValue") if "stringValue" in v else v.get("integerValue") if "integerValue" in v else v.get("booleanValue")) for k, v in d.get("fields", {}).items()}
            out.append({"when": datetime.datetime.fromtimestamp(int(f.get("at") or 0) / 1000).strftime("%a %b %d %H:%M"), "who": f.get("name"), "kind": f.get("kind"),
                        "where": "weekly post" if re.match(r"^w\d{8}$", f.get("pid") or "") else "wall", "photo": bool(f.get("img")), "text": f.get("text")})
        print(json.dumps(out, ensure_ascii=False)); return
    if cmd == "idea":
        # an idea for a NEW grammar module or word pack, from what keeps coming up in classes (Noa sees them on Hibi members)
        d = json.loads(a[1]); m = get_doc(tok, tu, "t-hubmeta") or {}
        kind = d.get("kind") if d.get("kind") in ("grammar", "words") else "grammar"
        title = _txt(d.get("title"), 80)
        if not title:
            raise SystemExit("idea needs a title")
        key = norm_name(title).replace(" ", "")
        ideas = m.get("ideas", [])
        cur = next((x for x in ideas if x.get("key") == key), None)
        who = _txt(d.get("student"), 60); today_s = datetime.date.today().isoformat()
        if cur:
            if cur.get("status") == "no":
                print("skip: Noa said not now to this one"); return
            if who and who not in cur.get("students", []):
                cur.setdefault("students", []).append(who)
            ex = _txt(d.get("example"), 160)
            if ex and ex not in cur.get("examples", []):
                cur.setdefault("examples", []).append(ex); cur["examples"] = cur["examples"][-6:]
            cur["count"] = cur.get("count", 1) + 1; cur["last"] = today_s
            print("ok: +1 for", cur["title"], "(", cur["count"], ")")
        else:
            ideas.append({"id": rid(), "key": key, "kind": kind, "title": title, "why": _txt(d.get("why"), 300),
                          "examples": [x for x in [_txt(d.get("example"), 160)] if x], "students": [who] if who else [],
                          "count": 1, "first": today_s, "last": today_s, "status": "new"})
            print("ok: new idea", title)
        m["ideas"] = ideas[-80:]; set_doc(tok, tu, "t-hubmeta", m); return
    if cmd == "ideas":
        m = get_doc(tok, tu, "t-hubmeta") or {}
        print(json.dumps([{k: x.get(k) for k in ("kind", "title", "count", "students", "status")} for x in m.get("ideas", [])], ensure_ascii=False)); return
    if cmd == "set-level":
        # set-level '<name or email>' B1 ['why']   club member's English level (from club class recordings); their Hibi adapts feedback to it
        who, lv = a[1], a[2].upper().replace(" ", "")
        if not re.fullmatch(r"[ABC][12]([–-][ABC][12])?", lv):
            print("level must look like B1 or A2-B1"); return
        accts = get_accounts(tok); w = who.lower().strip()
        hit = [x for x in accts if (x.get("email") or "").lower() == w] or [x for x in accts if norm_name(x.get("name")) == norm_name(who)]
        if not hit:
            fn = norm_name(who).split(" ")
            hit = [x for x in accts if fn and norm_name(x.get("name")).split(" ")[:len(fn)] == fn]
        if len(hit) != 1:
            print(json.dumps({"error": "no single Hibi account matches", "candidates": [{"name": x.get("name"), "email": x.get("email")} for x in hit][:8]}, ensure_ascii=False)); return
        u = hit[0]
        now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        fields = {"lv": {"stringValue": lv}, "lvWhy": {"stringValue": (a[3] if len(a) > 3 else "")[:200]}, "lvAt": {"stringValue": datetime.date.today().isoformat()}, "at": {"timestampValue": now}}
        mask = "&".join("updateMask.fieldPaths=" + k for k in fields)
        http("PATCH", f"{BASE}/roles/{u['uid']}?{mask}", {"fields": fields}, token=tok)
        print("ok", u.get("name"), lv); return
    if cmd == "tz-check":
        # clock changes in Chile or a foreign student's country in the next 21 days (for the nightly Heads-up)
        from zoneinfo import ZoneInfo
        meta = get_doc(tok, tu, "t-hubmeta") or {}
        today = datetime.datetime.now(ZoneInfo("America/Santiago")).date()
        def off(tz, d):
            return datetime.datetime(d.year, d.month, d.day, 12, tzinfo=datetime.timezone.utc).astimezone(ZoneInfo(tz)).utcoffset().total_seconds() / 60
        out = []
        for sid in meta.get("ids") or []:
            s = get_doc(tok, tu, "t-hub-" + sid)
            if not s or s.get("status") != "active" or not s.get("tz") or s["tz"] == "America/Santiago":
                continue
            for i in range(1, 22):
                d = today + datetime.timedelta(days=i); p_ = d - datetime.timedelta(days=1)
                for where, z in (("Chile", "America/Santiago"), (s.get("country") or s["tz"].split("/")[-1].replace("_", " "), s["tz"])):
                    if off(z, d) != off(z, p_):
                        b4 = off(s["tz"], p_) - off("America/Santiago", p_); af = off(s["tz"], d + datetime.timedelta(days=1)) - off("America/Santiago", d + datetime.timedelta(days=1))
                        if b4 != af:
                            out.append({"student": s["name"], "date": d.isoformat(), "where": where, "hours_ahead_of_chile_before": b4 / 60, "after": af / 60})
        print(json.dumps(out, ensure_ascii=False, indent=1)); return
    if cmd == "set-meta":
        m = get_doc(tok, tu, "t-hubmeta") or {}
        upd = json.loads(a[1]); m.update(upd); m["at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        set_doc(tok, tu, "t-hubmeta", m)
        if "upcoming" in upd:
            publish_all(tok, tu, m)  # students see their next class
        print("ok"); return
    sid = a[1]
    s = get_doc(tok, tu, "t-hub-" + sid)
    if s is None:
        raise SystemExit(f"No hub student '{sid}'")
    if cmd == "get":
        print(json.dumps(s, ensure_ascii=False, indent=1)); return
    raw = a[2] if len(a) > 2 and cmd not in ("resources", "del-report") else ""
    if raw == "-":
        raw = sys.stdin.read()          # json from stdin (avoids shell quoting trouble with apostrophes)
    elif raw.startswith("@"):
        raw = open(raw[1:], encoding="utf-8").read()   # json from a file: @/tmp/report.json
    data = json.loads(raw) if raw else {}
    if cmd == "merge":
        s.update(data); save(tok, tu, s); print("ok"); return
    if cmd == "add-payment":
        # {"date":"YYYY-MM-DD","what":"2nd half of pack 36","clp":112200,"usd":null,"method":"transfer","pack":"<pack id or empty>","paid":"full|half|"}
        amt = data.get("clp")
        if any(p.get("date") == data["date"] and (p.get("clp") == amt or not amt) for p in s.get("payments", [])):
            print("skip: a payment on that date with that amount is already there"); return
        pay = {"id": rid(), "date": data["date"], "what": data.get("what", "Payment"), "clp": amt,
               "amount": ("$" + format(int(amt), ",").replace(",", ".")) if amt else (("US$" + str(data["usd"])) if data.get("usd") else ""),
               "cur": "USD" if data.get("usd") and not amt else "CLP", "method": data.get("method", "transfer"), "src": "nightly"}
        if data.get("usd") and not amt:
            pay["usd"] = data["usd"]
        s.setdefault("payments", []).append(pay)
        if data.get("pack") and data.get("paid"):
            for p in s.get("packs", []):
                if p.get("id") == data["pack"]:
                    p["paid"] = data["paid"]
        save(tok, tu, s); print("ok"); return
    if cmd == "add-guide":
        g = {"title": data.get("title", "Guide"), "url": data["url"], "date": data.get("date") or datetime.date.today().isoformat()}
        if any(x.get("url") == g["url"] for x in s.get("guides", [])):
            print("skip: guide already listed"); return
        s.setdefault("guides", []).append(g); save(tok, tu, s); print("ok"); return
    if cmd == "set-recap":
        # mini recap of the latest class, shown on the student's My coaching page
        if s.get("recap") and (s["recap"].get("date") or "") > data.get("date", ""):
            print("skip: a newer recap is already there"); return
        s["recap"] = {"date": data["date"], "summary": data.get("summary", ""),
                      "talked": [t for t in data.get("talked", []) if t][:6],
                      "vocab": [{"w": w["w"], "tr": w.get("tr", ""), "ex": w.get("ex", "")} for w in data.get("vocab", []) if w.get("w")][:10],
                      "homework": data.get("homework", ""), "heads": [t for t in data.get("heads", []) if t][:4]}
        save(tok, tu, s); print("ok"); return
    if cmd == "resources":
        # resources <id> add|remove <key>   (keys: fabulang chatterbox simplified tedideas tedtalks slow)
        op, key = a[2], a[3]
        if key not in RES_KEYS:
            print("unknown key; use one of", RES_KEYS); return
        cur = res_keys(s)
        if op == "add" and key not in cur: cur.append(key)
        elif op == "remove" and key in cur: cur.remove(key)
        else:
            print("no change:", cur); return
        s["res"] = [k for k in RES_KEYS if k in cur]; save(tok, tu, s); print("ok", s["res"]); return
    if cmd == "add-report":
        r = clean_report(data)
        reps = [x for x in (s.get("reports") or []) if x.get("id") != r["id"]]
        replaced = len(reps) != len(s.get("reports") or [])
        reps.append(r); reps.sort(key=lambda x: x.get("to", ""))
        s["reports"] = reps; save(tok, tu, s)
        print(json.dumps({"ok": True, "replaced": replaced, "id": r["id"], "link": report_link(r["id"]),
                          "onHibi": bool(s.get("uid")),
                          "note": "" if s.get("uid") else "This student isn't linked to a Hibi account yet, so they can't see it until they sign in. Use the Google Doc fallback for the email."}, ensure_ascii=False)); return
    if cmd == "reports":
        print(json.dumps([{"id": x["id"], "from": x.get("from"), "to": x.get("to"), "sessions": x.get("sessions"), "link": report_link(x["id"])} for x in s.get("reports") or []], ensure_ascii=False)); return
    if cmd == "del-report":
        before = len(s.get("reports") or [])
        s["reports"] = [x for x in (s.get("reports") or []) if x.get("id") != a[2]]
        if len(s["reports"]) == before:
            print("no report with id", a[2]); return
        save(tok, tu, s); print("ok"); return
    if cmd == "add-doc":
        # Noa-only document link (Notion lesson plan etc.) on the student's hub page; students never see these
        d = {"title": data.get("title", "Document"), "url": data["url"], "date": data.get("date") or datetime.date.today().isoformat()}
        if any(x.get("url") == d["url"] for x in s.get("docs", [])):
            print("skip: already listed"); return
        s.setdefault("docs", []).append(d); save(tok, tu, s); print("ok"); return
    if cmd == "set-focus":
        s["focus"] = data.get("focus", s.get("focus", ""))
        if data.get("objective"):
            s["objective"] = data["objective"]
        save(tok, tu, s); print("ok"); return
    if cmd == "add-words":
        have = {norm_name(w.get("w", "")).replace(" ", "") for w in s.get("words", [])}
        now = int(datetime.datetime.now().timestamp() * 1000)
        added = []
        for w in data:
            k = norm_name(w.get("w", "")).replace(" ", "")
            if not k or k in have:
                continue
            have.add(k)
            s.setdefault("words", []).append({"w": w["w"].strip(), "tr": (w.get("tr") or "").strip(), "ex": (w.get("ex") or "").strip(), "t": now})
            added.append(w["w"])
        if added:
            save(tok, tu, s)
        print(json.dumps({"added": added}, ensure_ascii=False)); return
    if cmd in ("add-class", "add-note"):
        if cmd == "add-class":
            if any(c.get("kind") != "note" and c.get("date") == data["date"] for c in s.get("classes", [])):
                print("skip: a class on", data["date"], "is already logged"); return
            p = cur_pack(s)
            pack = data.get("pack") or (p["id"] if p else "")
            pk = next((x for x in s.get("packs", []) if x["id"] == pack), None)
            hour = data.get("hour", "")
            if (pk and pk.get("allStd") or s.get("alwaysStd")) and hour:
                hour = "Standard"  # first Pack Básico, or a student who always pays standard (Laura, José)
                if data.get("credits") == 4:
                    data["credits"] = 3
            att = data.get("att") or "Present"
            cr = data.get("credits")
            if cr is None and s.get("kind") != "trueque" and att in COUNTS and not (pk and pk.get("unit") == "classes"):
                cr = 4 if hour == "Priority" else 3 if hour == "Standard" else None
            if att == "Cancelled on time":
                cr = 0
            item = {"id": rid(), "kind": "class", "date": data["date"], "dateText": "", "topics": data.get("topics", ""), "homework": data.get("homework", ""),
                    "att": att, "hour": hour, "credits": cr, "pack": pack, "tab": "Class Log", "by": "nightly"}
        else:
            item = {"id": rid(), "kind": "note", "date": data.get("date", ""), "topics": data.get("topics", ""), "homework": "", "by": "nightly"}
        s.setdefault("classes", []).append(item)
        s["classes"].sort(key=lambda c: c.get("date") or "0")
        save(tok, tu, s)
        print(json.dumps({"ok": True, "student": summary(s)}, ensure_ascii=False)); return
    raise SystemExit("Unknown command " + cmd)


if __name__ == "__main__":
    main()
