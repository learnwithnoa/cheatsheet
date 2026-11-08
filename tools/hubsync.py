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
"""
import json, os, sys, random, string, datetime, urllib.request, urllib.error

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


def login():
    pw = os.environ.get("HUB_PASSWORD")
    if not pw:
        raise SystemExit("Set HUB_PASSWORD")
    r = http("POST", f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}",
             {"email": EMAIL, "password": pw, "returnSecureToken": True})
    return r["idToken"]


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
    pri = (sum(1 for c in cl if c.get("hour") == "Priority") > len(cl) / 2) if cl else False
    per = (4 if pri else 3) if p.get("unit") == "credits" else 1
    return {"done": len(cl), "used": used, "size": size, "left": left, "first": first, "per": per,
            "classesLeft": None if left is None else max(0, left) // per}


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


def make_view(s):
    packs = []
    for p in s.get("packs", []):
        st = pack_stats(s, p)
        packs.append({"id": p["id"], "label": p.get("label", ""), "size": p.get("size"), "unit": p.get("unit"), "used": st["used"], "done": st["done"],
                      "left": st["left"], "deadline": deadline(p, st["first"]), "paid": p.get("paid"), "current": not p.get("archived"), "color": p.get("color", "")})
    return {"v": 1, "name": s["name"], "level": s.get("level", ""), "schedule": s.get("schedule", ""), "objective": s.get("objective", ""), "kind": s.get("kind", "pack"),
            "packs": packs,
            "classes": [{k: c.get(k, "" if k != "credits" else None) for k in ("date", "dateText", "topics", "homework", "att", "hour", "credits", "pack")}
                        for c in s.get("classes", []) if c.get("kind") != "note"],
            "payments": [{"date": p.get("date", ""), "what": p.get("what", ""), "amount": p.get("amount", "")} for p in s.get("payments", [])],
            "words": [{"w": w.get("w", ""), "tr": w.get("tr", ""), "ex": w.get("ex", ""), "i": i} for i, w in enumerate(s.get("words", []))],
            "updated": int(datetime.datetime.now().timestamp() * 1000)}


def save(tok, tu, s):
    s["updatedAt"] = int(datetime.datetime.now().timestamp() * 1000)
    set_doc(tok, tu, "t-hub-" + s["id"], s)
    if s.get("uid"):
        set_doc(tok, s["uid"], "hub-view", make_view(s))


def rid():
    return "".join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))


def summary(s):
    p = cur_pack(s)
    st = pack_stats(s, p) if p else None
    last = max([c["date"] for c in s.get("classes", []) if c.get("kind") != "note" and c.get("date")] or [""])
    return {"id": s["id"], "name": s["name"], "status": s.get("status"), "kind": s.get("kind"), "email": s.get("email", ""), "zoomKey": s.get("zoomKey", ""),
            "lastClass": last, "pack": p and {"id": p["id"], "label": p.get("label"), "paid": p.get("paid"), "allStd": p.get("allStd", False), **(st or {}),
                                              "deadline": deadline(p, st["first"]) if st else ""}}


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
        print(json.dumps([summary(s) for s in list_students(tok, tu)], ensure_ascii=False, indent=1)); return
    if cmd == "set-meta":
        m = get_doc(tok, tu, "t-hubmeta") or {}
        m.update(json.loads(a[1])); m["at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        set_doc(tok, tu, "t-hubmeta", m); print("ok"); return
    sid = a[1]
    s = get_doc(tok, tu, "t-hub-" + sid)
    if s is None:
        raise SystemExit(f"No hub student '{sid}'")
    if cmd == "get":
        print(json.dumps(s, ensure_ascii=False, indent=1)); return
    data = json.loads(a[2]) if len(a) > 2 else {}
    if cmd == "merge":
        s.update(data); save(tok, tu, s); print("ok"); return
    if cmd in ("add-class", "add-note"):
        if cmd == "add-class":
            if any(c.get("kind") != "note" and c.get("date") == data["date"] for c in s.get("classes", [])):
                print("skip: a class on", data["date"], "is already logged"); return
            p = cur_pack(s)
            pack = data.get("pack") or (p["id"] if p else "")
            pk = next((x for x in s.get("packs", []) if x["id"] == pack), None)
            hour = data.get("hour", "")
            if pk and pk.get("allStd") and hour:
                hour = "Standard"
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
