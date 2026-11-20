#!/usr/bin/env python3
"""Hibi's Firestore security rules, kept in this repo (firestore.rules).

Run by .github/workflows/firestore-rules.yml with the FIREBASE_SERVICE_ACCOUNT secret:
  python3 tools/rules_sync.py fetch    -> writes the rules that are live now into firestore.rules (if the file is missing)
  python3 tools/rules_sync.py deploy   -> publishes firestore.rules (only if it differs from what's live)
Writes a short report to tools/rules-log.txt (no secrets)."""
import json, os, sys, datetime
import google.auth.transport.requests
from google.oauth2 import service_account

sa = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
proj = sa["project_id"]
cred = service_account.Credentials.from_service_account_info(sa, scopes=["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/firebase"])
sess = google.auth.transport.requests.AuthorizedSession(cred)
API = "https://firebaserules.googleapis.com/v1"
log = [f"{datetime.datetime.utcnow().isoformat()}Z {sys.argv[1]}"]

def live():
    r = sess.get(f"{API}/projects/{proj}/releases/cloud.firestore"); r.raise_for_status()
    rs = r.json()["rulesetName"]
    r2 = sess.get(f"{API}/{rs}"); r2.raise_for_status()
    files = r2.json()["source"]["files"]
    return rs, files[0]["content"]

try:
    rs, cur = live()
    log.append(f"live ruleset: {rs.rsplit('/', 1)[-1]} ({len(cur)} chars)")
    if sys.argv[1] == "fetch":
        if not os.path.exists("firestore.rules"):
            open("firestore.rules", "w").write(cur); log.append("saved live rules to firestore.rules")
        else:
            log.append("firestore.rules already in the repo: " + ("same as live" if open("firestore.rules").read() == cur else "DIFFERENT from live"))
    elif sys.argv[1] == "deploy":
        new = open("firestore.rules").read()
        if new == cur:
            log.append("no change")
        else:
            open("firestore.rules.previous", "w").write(cur)   # the rules that were live before, to roll back
            r = sess.post(f"{API}/projects/{proj}/rulesets", json={"source": {"files": [{"name": "firestore.rules", "content": new}]}})
            if r.status_code >= 300:
                log.append("REJECTED (rules not published): " + r.text[:1500])
            else:
                name = r.json()["name"]
                r2 = sess.patch(f"{API}/projects/{proj}/releases/cloud.firestore", json={"release": {"name": f"projects/{proj}/releases/cloud.firestore", "rulesetName": name}})
                log.append(("published " + name.rsplit('/', 1)[-1]) if r2.status_code < 300 else ("release failed: " + r2.text[:800]))
except Exception as e:
    log.append("ERROR: " + str(e)[:1500])
open("tools/rules-log.txt", "w").write("\n".join(log) + "\n")
print("\n".join(log))
