/* ---------- Cheat Sheet cloud sync (Firebase Auth + Firestore) ----------
   Every "ncs-*" key in localStorage is mirrored to users/{uid}/data/{key}.
   First sign-in on a device: local + cloud are merged (nothing lost).
   After that: the cloud is the source of truth, local edits are pushed right away. */
import { initializeApp, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut,
  getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, serverTimestamp,
  initializeAppCheck, ReCaptchaEnterpriseProvider, getAI, GoogleAIBackend, AgentPlatformBackend, getGenerativeModel } from "./fb.js?v=12.19.0d";
import { makeView, tzReminders } from "./hubview.js?v=17";
window.__csTzRem = tzReminders;

const firebaseConfig = {
  apiKey: "AIzaSyAPhkFh-6mMzlILQh_-RVq6aJJ2o2Q7Raw",
  authDomain: "learnwithnoa-cheatsheet.firebaseapp.com",
  projectId: "learnwithnoa-cheatsheet",
  storageBucket: "learnwithnoa-cheatsheet.firebasestorage.app",
  messagingSenderId: "619847241160",
  appId: "1:619847241160:web:d66edc58b7b143b9ab04fd"
};
const app = initializeApp(firebaseConfig);
/* App Check (Fraud Defense key): only this website may use the translator */
try { initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider("6Lf_6wUuAAAAABPRQ2tI35UPj2oKPzo5P1wSfqjT"), isTokenAutoRefreshEnabled: true }); }
catch (e) { console.warn("App Check not started", e); }
const auth = getAuth(app);
const db = getFirestore(app);

const LOCAL_ONLY = new Set(["ncs-sync-uid", "ncs-theme"]);
const KEEP_ON_SIGNOUT = new Set(["ncs-comfort", "ncs-theme", "ncs-welcomed", "ncs-seen-version", "ncs-music-mode", "ncs-music-vol", "ncs-music-bal"]);
/* progress kept under older "cs-" names that should follow the person too (the rest of "cs-" is device-only: layout, tabs, caches) */
const EXTRA = new Set(["cs-club-watched", "cs-rep-read", "cs-coach-seen", "cs-club-seen", "cs-wall-seen", "cs-club-welcomed", "cs-today5", "cs-pomo-today"]);
const isSynced = k => typeof k === "string" && ((k.startsWith("ncs-") && !LOCAL_ONLY.has(k)) || EXTRA.has(k));
/* in the account every key is saved as "ncs-…" (so "cs-today5" is "ncs-cs-today5") */
const cloudId = k => k.startsWith("ncs-") ? k : "ncs-" + k;
const localId = id => id.startsWith("ncs-cs-") ? id.slice(4) : id;
let user = null, ready = false, timer = null;
/* the name people chose for Hibi (their profile), instead of their full Google name */
let NICK = "";
const nickKey = u => "cs-nick-" + u;
const gName = () => NICK || (user && user.displayName) || "";
let nickDone = null; window.__csNickReady = new Promise(r => { nickDone = r; });
function loadNick(u) {
  try { NICK = (u && localStorage.getItem(nickKey(u.uid))) || ""; } catch (e) { NICK = ""; }
  if (!u) { nickDone && nickDone(); return; }
  getDoc(doc(db, "users", u.uid)).then(sn => { const n = String((sn.exists() && (sn.data() || {}).nick) || "").trim();
    if (n !== NICK) { NICK = n; try { if (n) localStorage.setItem(nickKey(u.uid), n); else localStorage.removeItem(nickKey(u.uid)); } catch (e) {} renderUser(); document.dispatchEvent(new CustomEvent("cs-nick")); }
  }).catch(() => {}).finally(() => nickDone && nickDone());
}
window.__csSetNick = async n => {
  if (!user || VA) return; n = String(n || "").replace(/\s+/g, " ").trim().slice(0, 40);
  await setDoc(doc(db, "users", user.uid), { nick: n }, { merge: true });
  NICK = n; try { if (n) localStorage.setItem(nickKey(user.uid), n); else localStorage.removeItem(nickKey(user.uid)); } catch (e) {}
  renderUser(); document.dispatchEvent(new CustomEvent("cs-nick"));
};
window.__csGoogleName = () => (user && user.displayName) || "";
/* birthday: kept private in the person's own users/{uid} doc. The club profile only gets what they choose to show */
window.__csGetBday = async () => { if (!user) return ""; try { const sn = await getDoc(doc(db, "users", user.uid)); return String((sn.exists() && (sn.data() || {}).bday) || ""); } catch (e) { return ""; } };
window.__csSetBday = async v => { if (!user || VA) return; await setDoc(doc(db, "users", user.uid), { bday: String(v || "") }, { merge: true }); };
const pending = new Set();

const $ = id => document.getElementById(id);
const btn = $("authBtn"), panel = $("authPanel");

function lsKeys() { const out = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (isSynced(k)) out.push(k); } } catch (e) {} return out; }
function getRaw(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
let rawW = false;
function setRaw(k, v) { rawW = true; try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} finally { rawW = false; } }
/* "dirty": saved on this device but not in the account yet. Kept on the device, so it survives a closed tab or a reload,
   and a sync never replaces it with an older copy from the account */
const DIRTY = "cs-sync-dirty";
function dirty() { try { return new Set(JSON.parse(localStorage.getItem(DIRTY) || "[]")); } catch (e) { return new Set(); } }
function setDirty(k, on) { const d = dirty(); if (on === d.has(k)) return; on ? d.add(k) : d.delete(k); rawW = true; try { localStorage.setItem(DIRTY, JSON.stringify([...d])); } catch (e) {} finally { rawW = false; } }
/* every save of someone's data, from anywhere on the site, goes to their account (no section has to remember to ask) */
(function () {
  const P = Storage.prototype, si = P.setItem, ri = P.removeItem;
  const hit = (st, k) => { if (rawW || st !== window.localStorage || !isSynced(k) || window.__csViewAsMode) return;
    setDirty(k, true); try { window.__csOnSet && window.__csOnSet(k); } catch (e) {} };
  P.setItem = function (k, v) { const r = si.call(this, k, v); hit(this, k); return r; };
  P.removeItem = function (k) { const r = ri.call(this, k); hit(this, k); return r; };
})();

/* ---------- merge (first sign-in on a device) ---------- */
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
function mergeKey(k, l, c) {
  if (c == null) return l;
  if (l == null) return c;
  let L, C; try { L = JSON.parse(l); C = JSON.parse(c); } catch (e) { return c; }
  if (k === "ncs-words" && Array.isArray(L) && Array.isArray(C)) {
    const seen = new Set(C.map(x => norm(x && x.w)));
    return JSON.stringify(C.concat(L.filter(x => x && x.w && !seen.has(norm(x.w)))));
  }
  if (k === "ncs-classnotes" && Array.isArray(L) && Array.isArray(C)) {
    const ids = new Set(C.map(x => x && x.id));
    return JSON.stringify(C.concat(L.filter(x => x && !ids.has(x.id))));
  }
  if ((k === "ncs-stars" || k === "ncs-hidden-tips") && Array.isArray(L) && Array.isArray(C)) {
    return JSON.stringify([...new Set(C.concat(L))]);
  }
  if (k === "ncs-fc" && L && C && typeof L === "object" && typeof C === "object") {
    const o = Object.assign({}, L); for (const [id, b] of Object.entries(C)) o[id] = Math.max(o[id] || 0, b || 0); return JSON.stringify(o);
  }
  /* class recap exercises: never lose a right answer from either copy */
  if (k === "ncs-lesson-prog" && L && C && typeof L === "object" && typeof C === "object") return JSON.stringify(mergeLes(L, C));
  if (MERGERS[k] && k !== "ncs-lesson-prog") return mergeDirty(k, l, c);
  if (k === "ncs-lastcopy") return JSON.stringify(Math.max(+L || 0, +C || 0));
  if (k === "ncs-freenotes") return (typeof L === "string" && L.trim()) ? l : c;
  return c;
}

function mergeLes(L, C) {
  const o = Object.assign({}, C);
  for (const [id, a] of Object.entries(L)) { const b = C[id]; if (!a || typeof a !== "object") continue; if (!b || typeof b !== "object") { o[id] = a; continue; }
    const m = { ans: Object.assign({}, b.ans, a.ans), ok: Object.assign({}, b.ok, a.ok), show: Object.assign({}, b.show, a.show), done: !!(a.done || b.done) };
    for (const k of Object.keys(b.ok || {})) if (b.ok[k] === true && m.ok[k] !== true) { m.ok[k] = true; m.ans[k] = (b.ans || {})[k]; }
    o[id] = m; }
  return o;
}
/* progress that two devices can add to at the same time: combine both copies instead of one replacing the other */
const isObj = x => x && typeof x === "object" && !Array.isArray(x);
function deepMax(L, C) {   /* counters and totals: the bigger number wins, lists are joined, anything else keeps this device's */
  if (typeof L === "number" && typeof C === "number") return Math.max(L, C);
  if (typeof L === "boolean" && typeof C === "boolean") return L || C;
  if (Array.isArray(L) && Array.isArray(C)) return [...new Set(C.concat(L).map(x => JSON.stringify(x)))].map(x => JSON.parse(x));
  if (isObj(L) && isObj(C)) { const o = Object.assign({}, C); for (const k of Object.keys(L)) o[k] = k in C ? deepMax(L[k], C[k]) : L[k]; return o; }
  return L === undefined ? C : L;
}
const MERGERS = {
  "ncs-lesson-prog": (L, C) => isObj(L) && isObj(C) ? mergeLes(L, C) : L,
  "ncs-mods": (L, C) => isObj(L) && isObj(C) ? Object.assign({}, C, L) : L,          /* each module's own progress; this device's wins for a module done on both */
  "ncs-fc": deepMax, "ncs-mst": deepMax, "ncs-usage": deepMax, "ncs-ptime": deepMax, "ncs-kudos": deepMax,
  "ncs-wk": (L, C) => isObj(L) && isObj(C) ? (L.w === C.w ? deepMax(L, C) : (String(L.w) > String(C.w) ? L : C)) : L,
  "cs-wall-seen": (L, C) => Math.max(+L || 0, +C || 0),
  "cs-rep-read": deepMax, "ncs-tnotif-read": deepMax
};
const MERGED = new Set(Object.keys(MERGERS));
/* practice progress: before saving, also add what another device saved meanwhile (one extra read per save, so only these) */
const PUSH_MERGE = new Set(["ncs-lesson-prog", "ncs-mods", "ncs-fc", "ncs-usage", "ncs-mst", "ncs-wk"]);
/* this device changed k since the last sync: keep its changes, and add what another device saved */
function mergeDirty(k, l, c) {
  if (l == null || c == null || l === c) return l;
  const f = MERGERS[k]; if (!f) return l;
  try { const m = f(JSON.parse(l), JSON.parse(c)); return m === undefined ? l : JSON.stringify(m); } catch (e) { return l; }
}
/* ---------- lists that can change on two devices at once (words, class notes, stars) ----------
   Before: the last device to save won, so a phone could add 3 words and an old tab on the laptop
   could save its older list over them. Now: a 3-way merge with what this device last saw in the cloud
   ("base"): words added anywhere are kept, words deleted anywhere stay deleted, local edits win. */
const LISTS = { "ncs-words": x => norm(x && x.w), "ncs-classnotes": x => x && x.id, "ncs-stars": x => x };
const BASE = k => "cs-base-" + k;
function merge3(k, b, l, c) {
  const key = LISTS[k]; if (!key) return c != null ? c : l;
  if (c == null) return l; if (l == null) return c;
  let B, L, C; try { L = JSON.parse(l); C = JSON.parse(c); B = b ? JSON.parse(b) : null; } catch (e) { return c; }
  if (!Array.isArray(L) || !Array.isArray(C)) return c;
  if (!Array.isArray(B)) return mergeKey(k, l, c);   /* no base yet on this device: keep everything from both */
  const id = x => String(key(x) || ""), Bm = new Map(B.map(x => [id(x), JSON.stringify(x)])), Lm = new Map(L.map(x => [id(x), x])), Cm = new Map(C.map(x => [id(x), x]));
  const out = [], done = new Set();
  for (const x of L) { const i = id(x); if (!i || done.has(i)) continue; done.add(i);
    const inB = Bm.has(i), inC = Cm.has(i);
    if (inB && !inC) continue;                                  /* deleted on another device */
    if (inC && inB && JSON.stringify(x) === Bm.get(i)) out.push(Cm.get(i));   /* unchanged here: take the cloud's version */
    else out.push(x); }                                         /* new or edited here */
  for (const x of C) { const i = id(x); if (!i || done.has(i)) continue; done.add(i);
    if (!Bm.has(i)) out.push(x); }                              /* added on another device (if it was in base and not here, it was deleted here) */
  return JSON.stringify(out);
}
/* ---------- cloud I/O ---------- */
async function pushKey(k) {
  let v = getRaw(k); const id = cloudId(k);
  if (PUSH_MERGE.has(k) && v != null) {
    try { const d = await getDoc(doc(db, "users", user.uid, "data", id)); const c = d.exists() && !d.data().deleted && typeof d.data().json === "string" ? d.data().json : null;
      const m = mergeDirty(k, v, c); if (m !== v) { setRaw(k, m); v = m; } } catch (e) { console.warn("merge", k, e); }
  }
  if (LISTS[k] && v != null) {
    try { const d = await getDoc(doc(db, "users", user.uid, "data", id)); const c = d.exists() && !d.data().deleted && typeof d.data().json === "string" ? d.data().json : null;
      const m = merge3(k, getRaw(BASE(k)), v, c);
      if (m !== v) { setRaw(k, m); v = m; mergedNeedsReload(true); } } catch (e) { console.warn("merge", k, e); }
  }
  await setDoc(doc(db, "users", user.uid, "data", id), { json: v, deleted: v == null, at: serverTimestamp() });
  if (LISTS[k]) setRaw(BASE(k), v);
  if (getRaw(k) === v) setDirty(k, false);   /* saved (unless it changed again while saving: then it's still waiting) */
}
/* the page keeps lists in memory: after a merge brought in something from another device, reload it (not while typing) */
let reloadWanted = false;
/* counters, "seen" markers and progress the page re-reads anyway: never worth reloading the page for (usage minutes went back and forth between devices and reloaded the page every few seconds) */
const QUIET = new Set(["ncs-lesson-prog", "ncs-usage", "ncs-ptime", "ncs-tnotif-read", "ncs-seen-version", "ncs-mst", "ncs-fc", "ncs-wk", "ncs-buddy"]);
const canon = x => Array.isArray(x) ? x.map(canon) : (x && typeof x === "object") ? Object.keys(x).sort().reduce((o, k) => (o[k] = canon(x[k]), o), {}) : x;
function sameJSON(a, b) { try { return JSON.stringify(canon(JSON.parse(a))) === JSON.stringify(canon(JSON.parse(b))); } catch (e) { return a === b; } }
/* saved words, class notes and stars are redrawn in place (a full reload in the middle of browsing felt like the page "jumping") */
function mergedNeedsReload(listsOnly) { if (listsOnly && window.__csListsReload) { try { if (window.__csListsReload()) return; } catch (e) {} } reloadWanted = true; tryReload(); }
function tryReload() { if (!reloadWanted) return; const a = document.activeElement; if ((a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && a.value) || document.querySelector("dialog[open], .cs-dlg")) { setTimeout(tryReload, 4000); return; }
  const last = +(sessionStorage.getItem("ncs-reload-at") || 0); if (Date.now() - last < 120000) { reloadWanted = false; return; }   /* at most one automatic reload every 2 minutes, never a loop */
  sessionStorage.setItem("ncs-reload-at", String(Date.now())); location.reload(); }
async function flush() {
  clearTimeout(timer);
  if (!user || !ready || !pending.size) return;
  const ks = [...pending]; pending.clear();
  status("saving");
  try { await Promise.all(ks.map(pushKey)); status("synced"); }
  catch (e) { ks.forEach(k => pending.add(k)); status("error"); timer = setTimeout(flush, 5000); }
}
/* Noa's "View as": a student's saved data, read-only, nothing is synced or written */
const VA = window.__csViewAsMode || null;
window.__csOnSet = k => {
  if (VA) return;
  if (!user || !ready || !isSynced(k)) return;
  pending.add(k); status("saving");
  clearTimeout(timer); timer = setTimeout(flush, 700);
};

let syncing = false;
async function syncDown() {
  if (!user || syncing) return;
  syncing = true; status("syncing");
  try {
    const snap = await getDocs(collection(db, "users", user.uid, "data"));
    const cloud = {};
    snap.forEach(d => { const x = d.data(); if (!x.deleted && typeof x.json === "string") cloud[localId(d.id)] = x.json; });
    const dz = dirty();
    const first = getRaw("ncs-sync-uid") !== user.uid;
    const keys = new Set([...Object.keys(cloud), ...lsKeys()]);
    let changed = false, changedOther = false; const toPush = [];
    for (const k of keys) {
      if (!isSynced(k)) continue;
      const l = getRaw(k), c = (k in cloud) ? cloud[k] : null;
      let v = first ? mergeKey(k, l, c) : LISTS[k] ? merge3(k, getRaw(BASE(k)), l, c) : dz.has(k) ? mergeDirty(k, l, c) : (c != null ? c : l);
      /* never bring back an older "What's new" version: that made the pop-up show again (and again) after closing it */
      if (k === "ncs-seen-version" && l != null && window.__csClLatest && l === JSON.stringify(window.__csClLatest)) v = l;
      if (v !== l) { setRaw(k, v); if (!QUIET.has(k) && !/^ncs-cs-/.test(k) && !sameJSON(v, l)) { changed = true; if (!LISTS[k]) changedOther = true; } }
      if (v === c) setDirty(k, false);
      if (v != null && v !== c) toPush.push(k);
      else if (LISTS[k] && v != null) setRaw(BASE(k), v);
    }
    setRaw("ncs-sync-uid", user.uid);
    ready = true;
    // so the teacher can tell whose data is whose in the Firebase console
    getDoc(doc(db, "users", user.uid)).then(sn => {
      const x = sn.exists() ? (sn.data() || {}) : {};
      const patch = { name: user.displayName || "", email: user.email || "", lastSeen: serverTimestamp() };
      if (!x.firstSeen) patch.firstSeen = serverTimestamp();   // when they first joined (for the teacher's notifications)
      return setDoc(doc(db, "users", user.uid), patch, { merge: true });
    }).catch(() => {});
    if (toPush.length) await Promise.all(toPush.map(pushKey));
    status("synced");
    checkInbox();
    if (changed) mergedNeedsReload(!changedOther);   /* show what came from another device (waits while they're typing or doing a recap) */
  } catch (e) {
    console.warn("Cheat Sheet sync failed", e);
    status("error");
  } finally { syncing = false; }
}

/* ---------- messages from Noa (inbox/{uid}/msgs) ---------- */
async function checkInbox() {
  if (VA) return;
  if (!user || !window.csShowKudos) return;
  try {
    const snap = await getDocs(collection(db, "inbox", user.uid, "msgs"));
    const list = []; const refs = {};
    snap.forEach(d => { const x = d.data() || {}; refs[d.id] = d.ref; const kd = String(x.kind || ""); list.push({ id: d.id, text: x.text || "", kind: kd.startsWith("rec") ? "rec" : kd, go: kd.startsWith("rec:") ? kd.slice(4, 44) : "", at: x.at && x.at.toMillis ? x.at.toMillis() : Date.now() }); });
    list.sort((a, b) => a.at - b.at);
    if (list.length) window.csShowKudos(list, id => { if (refs[id]) deleteDoc(refs[id]).catch(() => {}); });
  } catch (e) { console.warn("inbox", e); }
}

/* ---------- sign in / out ---------- */
/* Google's "redirect" sign-in breaks on iPhones (Safari keeps the two sites' storage apart: "missing initial state"),
   and inside Instagram/WhatsApp/Facebook browsers. So: always the pop-up; if it's blocked, ask for one more tap;
   in an app's built-in browser, explain how to open Hibi in Safari/Chrome. Redirect only as a last resort off iOS. */
const UA = navigator.userAgent || "";
const IS_IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Line\/|WhatsApp|Snapchat|TikTok|musical_ly|; wv\)/i.test(UA);
let popupTries = 0;
async function signIn() {
  if (IN_APP) { alertMsg(IS_IOS ? "Google sign-in doesn't work inside this app's browser. Tap ··· or the share icon and choose \"Open in Safari\" (or copy the link into Safari), then sign in there." : "Google sign-in doesn't work inside this app's browser. Tap ⋮ and choose \"Open in Chrome\" (or copy the link into Chrome), then sign in there."); return; }
  const p = new GoogleAuthProvider(); p.setCustomParameters({ prompt: "select_account" });
  try { await signInWithPopup(auth, p); popupTries = 0; }
  catch (e) {
    const blocked = e && e.code === "auth/popup-blocked", unsupported = e && e.code === "auth/operation-not-supported-in-this-environment";
    if (blocked && ++popupTries < 3) { alertMsg("Your browser stopped the Google window. Tap \"Continue with Google\" once more."); }
    else if ((blocked || unsupported) && !IS_IOS) { await signInWithRedirect(auth, p); }
    else if (blocked || unsupported) { alertMsg("Your browser blocked the Google window. Allow pop-ups for this site (Settings → Safari → turn off Block Pop-ups), or open Hibi in Safari, then try again."); }
    else if (e && e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") { alertMsg("Sign-in didn't work. Please try again in a moment."); console.warn(e); }
  }
}
window.csSignIn = signIn;
/* for the Club wall: the member's own sign-in token (every read/write still goes through the database's security rules) */
window.__csFire = {
  base: "https://firestore.googleapis.com/v1/projects/" + firebaseConfig.projectId + "/databases/(default)/documents",
  token: async () => auth.currentUser ? auth.currentUser.getIdToken() : null,
  /* in Noa's "View as", the club shows things as that member sees them (reads only: the club refuses every write) */
  uid: () => VA && VA.uid ? VA.uid : auth.currentUser ? auth.currentUser.uid : null,
  name: () => VA && VA.uid ? String(VA.name || VA.label || "").split(" · ")[0].replace(/\s*\((?:private \+ club|private|club)\)\s*$/, "") : auth.currentUser ? (NICK || auth.currentUser.displayName || (auth.currentUser.email || "").split("@")[0]) : "",
  readOnly: () => !!VA,
  email: () => auth.currentUser ? String(auth.currentUser.email || "").toLowerCase() : "",
  key: firebaseConfig.apiKey
};
async function doSignOut() {
  await flush();
  for (const k of lsKeys()) if (!KEEP_ON_SIGNOUT.has(k)) setRaw(k, null);
  setRaw(DIRTY, null);
  setRaw("ncs-sync-uid", null);
  try { localStorage.removeItem("cs-auth-hint"); Object.keys(localStorage).filter(k => k.indexOf("cs-hv-cache-") === 0).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  await signOut(auth);
  location.reload();
}
getRedirectResult(auth).catch(() => {});

/* ---------- UI ---------- */
function alertMsg(t) { const el = $("authStatus"); if (el) el.textContent = t; const ag = document.getElementById("agMsg"); if (ag) { ag.textContent = t; ag.hidden = false; } try { const tst = document.getElementById("toast"); tst.textContent = t; tst.classList.add("show"); setTimeout(() => tst.classList.remove("show"), 3000); } catch (e) {} }
let lastStatus = "out";
function status(st) {
  lastStatus = st;
  const txt = { syncing: "Syncing…", saving: "Saving…", synced: "Saved", error: "Offline", out: "Sign in" }[st] || "Saved";
  const t = $("authTxt"); if (t) t.textContent = user ? (st === "error" ? "Offline" : "Me") : "Sign in";
  if (btn) { btn.classList.toggle("st-busy", !!user && (st === "saving" || st === "syncing")); btn.classList.toggle("st-err", !!user && st === "error"); btn.classList.toggle("st-ok", !!user && st !== "saving" && st !== "syncing" && st !== "error"); btn.title = user ? txt : ""; }
  document.documentElement.classList.toggle("cs-signed", !!user);
  const s = $("authStatus");
  if (s) s.textContent = { syncing: "Getting your notes from the cloud…", saving: "Saving your changes…", synced: "✓ Everything is saved to your account.", error: "Couldn't reach the cloud. Your changes are kept here and will save when you're back online." }[st] || "";
  let dot = btn && btn.querySelector(".dot");
  if (user && btn) { if (!dot) { dot = document.createElement("span"); dot.className = "dot"; btn.appendChild(dot); } dot.className = "dot" + (st === "error" ? " err" : (st === "synced" ? "" : " busy")); }
  else if (dot) dot.remove();
}
/* profile photo: the Google one, one they upload, or none (their buddy shows in the club) */
/* the buddy is the default photo, but only once the egg has hatched; until then the Google photo is used */
const buddyOut = () => { try { const s = window.csBuddy && window.csBuddy.state; return !!(s && s.on === true && s.a); } catch (e) { return false; } };
function photoPref() { try { const v = JSON.parse(localStorage.getItem("ncs-photo") || "null"); if (v && typeof v === "object") return v; } catch (e) {} return { k: buddyOut() || !(user && user.photoURL) ? "buddy" : "google" }; }
window.csMyPhotoKind = () => photoPref().k || "buddy";
/* the buddy as a photo: "face" zooms in on the head (small round buttons), "full" is the whole buddy, centered */
window.csBuddyPic = (mode) => { try { const s = window.csBuddy && window.csBuddy.portrait ? window.csBuddy.portrait() : ""; if (mode === "face" && window.csBuddy.face) return window.csBuddy.face() || s; return s.replace(/viewBox="0 0 20 22"/, mode === "face" ? 'viewBox="2.5 2 15 15"' : 'viewBox="-0.5 2.2 21 20"'); } catch (e) { return ""; } };
function myPhoto() { const p = photoPref(); if (p.k === "custom" && p.d) return p.d; if (p.k === "google" && user && user.photoURL) return user.photoURL; if (p.k === "buddy" && !buddyOut() && user && user.photoURL) return user.photoURL; return ""; }
window.csMyPhoto = () => myPhoto();
document.addEventListener("cs-buddy-hatched", () => { try { renderUser(); } catch (e) {} });
function setPhoto(v) { if (VA) { alertMsg("👁 View as is read-only: nothing is saved"); return; } try { localStorage.setItem("ncs-photo", JSON.stringify(v)); } catch (e) {} try { window.__csOnSet && window.__csOnSet("ncs-photo"); } catch (e) {} renderUser(); document.dispatchEvent(new CustomEvent("cs-photo", { detail: { photo: myPhoto(), k: v.k, bg: v.bg || "" } })); }
window.csMyPhotoBg = () => (photoPref().k === "buddy" && photoPref().bg) || "";
function shrinkPhoto(file) { return new Promise((res, rej) => { const u = URL.createObjectURL(file), im = new Image(); im.onload = () => { const S = 192, c = document.createElement("canvas"); c.width = c.height = S; const k = Math.max(S / im.naturalWidth, S / im.naturalHeight), w = im.naturalWidth * k, h = im.naturalHeight * k; c.getContext("2d").drawImage(im, (S - w) / 2, (S - h) / 2, w, h); URL.revokeObjectURL(u); res(c.toDataURL("image/jpeg", .82)); }; im.onerror = rej; im.src = u; }); }
function photoBox() {
  if (!panel || !user) return; let b = document.getElementById("authPhoto");
  if (!b) { b = document.createElement("div"); b.id = "authPhoto"; b.className = "auth-photo"; const who = $("authWho"); (who || panel.firstChild).insertAdjacentElement("afterend", b);
    b.addEventListener("click", e => { if (e.target.closest("[data-apchg]")) { e.preventDefault(); b.querySelector("input[type=file]").click(); return; }
      const g = e.target.closest("[data-apbg]"); if (g) { e.stopPropagation(); setPhoto(Object.assign({}, photoPref(), { bg: g.dataset.apbg })); } });
    b.addEventListener("change", async e => { const r = e.target.closest("[name=phk]"); if (r) { if (r.value === "custom" && !(photoPref().d)) { b.querySelector("input[type=file]").click(); return; } setPhoto(Object.assign({}, photoPref(), { k: r.value })); return; }
      const f = e.target.closest("input[type=file]"); if (f && f.files[0]) { try { const d = await shrinkPhoto(f.files[0]); setPhoto({ k: "custom", d }); alertMsg("✓ Photo saved"); } catch (er) { alertMsg("Couldn't use that photo. Try another one."); } f.value = ""; } }); }
  const p = photoPref(), ph = myPhoto();
  const nm0 = String(gName() || user.email || "?").trim(), ini = (nm0.split(/\s+/).slice(0, 2).map(w => w[0] || "").join("") || "?").toUpperCase();
  const prev = ph ? `<img src="${ph.replace(/"/g, "%22")}" alt="" referrerpolicy="no-referrer">` : p.k === "none" ? `<span class="ap-ini">${ini}</span>` : (window.csBuddy && window.csBuddy.portrait ? `<span class="ap-bd">${window.csBuddyPic("full")}</span>` : `<span>🐾</span>`);
  const BGS = [["", "Default"], ["#BFE9D2", "Mint"], ["#C6E2FF", "Sky"], ["#FFD8C2", "Peach"], ["#E2D4FF", "Lavender"], ["#FFF0B3", "Butter"], ["#1F2A44", "Night"]];
  const bgRow = p.k === "buddy" ? `<div class="ap-bgs" role="radiogroup" aria-label="Background color">${BGS.map(([v, n]) => `<button type="button" class="ap-bg${(p.bg || "") === v ? " on" : ""}" data-apbg="${v}" role="radio" aria-checked="${(p.bg || "") === v}" title="${n}" aria-label="${n}" style="background:${v || "var(--surface-2)"}">${v ? "" : "∅"}</button>`).join("")}</div>` : "";
  b.innerHTML = `<div class="ap-prev"${p.k === "buddy" && p.bg ? ` style="background:${p.bg}"` : ""}>${prev}</div><div class="ap-opts"><b>Profile photo</b><small>Shows in the club next to your posts and messages.</small>
    <label><input type="radio" name="phk" value="buddy" ${p.k === "buddy" ? "checked" : ""}> My buddy 🐾</label>
    <label><input type="radio" name="phk" value="google" ${p.k === "google" ? "checked" : ""} ${user.photoURL ? "" : "disabled"}> My Google photo</label>
    <label><input type="radio" name="phk" value="custom" ${p.k === "custom" ? "checked" : ""}> ${p.d ? "My own photo" : "Upload my own photo"}${p.d ? ` <span class="ap-chg" role="button" tabindex="0" data-apchg="1">Change</span>` : ""}</label>
    <label><input type="radio" name="phk" value="none" ${p.k === "none" ? "checked" : ""}> No photo (my initials)</label>
    ${p.k === "buddy" && !buddyOut() ? `<p class="ap-note">🥚 Your buddy shows here once your egg hatches. Until then, it uses your Google photo.</p>` : ""}
    ${bgRow}<input type="file" accept="image/*" hidden></div>`;
  let lk = document.getElementById("authLinks"); if (!lk) { lk = document.createElement("div"); lk.id = "authLinks"; lk.className = "auth-links"; b.insertAdjacentElement("afterend", lk);
    lk.addEventListener("click", e => { const x = e.target.closest("[data-al]"); if (!x) return; panel.hidden = true; const k = x.dataset.al; if (k === "club") { window.__clubMyProfile && window.__clubMyProfile(); } else if (k === "dm") { window.__clubInbox && window.__clubInbox(); } else if (k === "level") { location.hash = "#quiz"; setTimeout(() => document.querySelector('[data-pr="level"]')?.click(), 300); } else location.hash = "#" + k; }); }
  let nW = 0; try { nW = (JSON.parse(localStorage.getItem("ncs-words") || "[]") || []).filter(x => x && !x.sample).length; } catch (e) {}
  const lv = (() => { try { return window.csLevel ? (window.csLevel().lv || "") : ""; } catch (e) { return ""; } })(), club = !!window.__clubInbox && !!document.getElementById("dmTopBtn") && !document.getElementById("dmTopBtn").hidden;
  lk.innerHTML = `${club ? `<button type="button" data-al="club">🙂 My club profile</button>` : ""}<button type="button" data-al="words">📚 ${nW} ${nW === 1 ? "word" : "words"}</button><button type="button" data-al="level">📊 ${lv ? "Level " + lv : "My level"}</button>`;
}
/* change my name (and, for club members, a shortcut to the full club profile) right from the profile panel */
const escN = v => String(v == null ? "" : v).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function nameBox() {
  const who = $("authWho"); if (!who || VA) return;
  let nb = $("authName");
  if (!nb) { nb = document.createElement("div"); nb.id = "authName"; nb.className = "auth-name"; who.insertAdjacentElement("afterend", nb);
    nb.addEventListener("click", async e => {
      if (e.target.closest("[data-nmedit]")) { e.stopPropagation(); nb.dataset.edit = "1"; nameBox(); const i = nb.querySelector("input"); if (i) { i.focus(); i.select(); } return; }
      if (e.target.closest("[data-nmx]")) { e.stopPropagation(); delete nb.dataset.edit; nameBox(); return; }
      if (e.target.closest("[data-nmgoogle]")) { e.stopPropagation(); const i = nb.querySelector("input"); if (i) i.value = (user && user.displayName) || ""; return; }
      if (e.target.closest("[data-nmclub]")) { e.stopPropagation(); panel.hidden = true; try { await window.__clubMyProfile(); setTimeout(() => document.querySelector(".cl-prof-ov [data-pedit]")?.click(), 60); } catch (er) {} return; }
    });
    nb.addEventListener("submit", async e => { e.preventDefault(); e.stopPropagation(); const i = nb.querySelector("input"), m = nb.querySelector(".auth-nmsg"), v = i.value.replace(/\s+/g, " ").trim();
      if (!v) { m.textContent = "Write a name first."; return; }
      try { await window.__csSetNick(v === ((user && user.displayName) || "") ? "" : v); delete nb.dataset.edit; renderUser();
        try { window.__clubSocial && window.__clubSocial.refreshMe && window.__clubSocial.refreshMe(); } catch (er) {} }
      catch (er) { m.textContent = "Couldn't save. Try again."; } });
  }
  const club = !!(window.__clubFeed && window.__clubFeed());
  if (nb.dataset.edit) {
    nb.innerHTML = `<form class="auth-nform"><label for="authNmIn">My name on Hibi</label><input id="authNmIn" maxlength="40" autocomplete="off" value="${escN(gName())}"><small>How everyone sees you. For example, just your first name.${user && user.displayName && user.displayName !== gName() ? ` <button type="button" class="ap-chg" data-nmgoogle>Use my Google name</button>` : ""}</small><div class="auth-nrow"><button type="submit" class="auth-nsave">Save</button><button type="button" class="ap-chg" data-nmx>Cancel</button><span class="auth-nmsg" role="status"></span></div></form>`;
  } else nb.innerHTML = `<button type="button" class="auth-npill" data-nmedit>✏️ Change my name</button>`;
}
function renderUser() {
  document.body.dataset.auth = user ? "in" : "out";
  btn.classList.toggle("in", !!user);
  btn.setAttribute("aria-label", user ? "Your account" : "Sign in with Google");
  const ico = $("authIco");
  if (user) {
    const name = gName() || user.email || "You";
    const ph = myPhoto();
    ico.style.background = "";
    if (ph) { ico.innerHTML = ""; const img = new Image(); img.alt = ""; img.referrerPolicy = "no-referrer"; img.src = ph; img.onerror = () => { ico.textContent = name.charAt(0).toUpperCase(); }; ico.appendChild(img); }
    else if (photoPref().k !== "none" && window.csBuddy && window.csBuddy.portrait) { try { ico.innerHTML = window.csBuddyPic("face"); ico.style.background = photoPref().bg || ""; } catch (e) { ico.textContent = name.charAt(0).toUpperCase(); } }
    else ico.textContent = name.charAt(0).toUpperCase();
    photoBox();
    $("authWho").textContent = name + (user.email && user.displayName ? " · " + user.email : "");
    nameBox();
    const tl = $("teacherLink"); if (tl) tl.hidden = (user.email || "").toLowerCase() !== "learnwithnoa@gmail.com";
    const isT = (user.email || "").toLowerCase() === "learnwithnoa@gmail.com" && user.emailVerified;
    /* remembered for the next page load, so the top bar shows "you" right away instead of "Sign in" first */
    if (!VA) try { localStorage.setItem("cs-auth-hint", JSON.stringify({ u: user.uid, n: name, p: user.photoURL || "", t: isT })); } catch (e) {} if (window.__csTeacher !== isT) { window.__csTeacher = isT; document.dispatchEvent(new CustomEvent("cs-teacher")); }
  } else { if (ready || auth.currentUser === null) { try { localStorage.removeItem("cs-auth-hint"); } catch (e) {} } ico.textContent = "G"; panel.hidden = true; const tl = $("teacherLink"); if (tl) tl.hidden = true; if (window.__csTeacher) { window.__csTeacher = false; document.dispatchEvent(new CustomEvent("cs-teacher")); } }
  status(user ? lastStatus === "out" ? "syncing" : lastStatus : "out");
}
/* one window, two tabs: 👤 Profile (this panel) and ⚙ Settings (the comfort panel, moved in next to it). Signed out, the gear stays as before. */
const PT = { tab() { try { return localStorage.getItem("cs-ptab") === "s" ? "s" : "p"; } catch (e) { return "p"; } } };
function ptSetup() {
  const sp = $("csPanel"); if (!sp || !panel) return null;
  if (!sp.dataset.pt) {
    sp.dataset.pt = "1"; document.documentElement.classList.add("pt-on");
    panel.insertAdjacentElement("afterend", sp);
    const mk = () => { const t = document.createElement("div"); t.className = "pt-tabs"; t.setAttribute("role", "tablist"); t.setAttribute("aria-label", "Profile and settings");
      t.innerHTML = '<button type="button" role="tab" data-pt="p">👤 Profile</button><button type="button" role="tab" data-pt="s">⚙ Settings</button>';
      t.addEventListener("click", e => { const b = e.target.closest("[data-pt]"); if (b) { e.stopPropagation(); ptShow(b.dataset.pt, true); } }); return t; };
    const h1 = panel.querySelector(".qa-top"), h2 = sp.querySelector(".cs-head");
    if (h1) h1.insertBefore(mk(), h1.firstChild); if (h2) h2.insertBefore(mk(), h2.firstChild);
  }
  return sp;
}
function ptShow(t, focus) {
  const sp = ptSetup(); if (!sp) { panel.hidden = false; btn.setAttribute("aria-expanded", "true"); return; }
  try { localStorage.setItem("cs-ptab", t); } catch (e) {}
  panel.hidden = t !== "p";
  if (window.__csSettingsOpen) window.__csSettingsOpen(t === "s"); else sp.hidden = t !== "s";
  document.querySelectorAll(".pt-tabs [data-pt]").forEach(b => b.setAttribute("aria-selected", String(b.dataset.pt === t)));
  btn.setAttribute("aria-expanded", "true");
  if (focus) { const b = (t === "p" ? panel : sp).querySelector('.pt-tabs [data-pt="' + t + '"]'); if (b) b.focus(); }
}
function ptOpen() { const sp = $("csPanel"); return !panel.hidden || !!(sp && sp.dataset.pt && !sp.hidden); }
function ptClose() { panel.hidden = true; const sp = $("csPanel"); if (sp && sp.dataset.pt && !sp.hidden) { if (window.__csSettingsOpen) window.__csSettingsOpen(false); else sp.hidden = true; } btn.setAttribute("aria-expanded", "false"); }
btn.addEventListener("click", () => {
  if (!user) { signIn(); return; }
  if (ptOpen()) ptClose(); else ptShow(PT.tab());
});
$("authClose").addEventListener("click", () => { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.focus(); });
panel.addEventListener("keydown", e => { if (e.key === "Escape") { panel.hidden = true; btn.focus(); } });
document.addEventListener("click", e => { if (!panel.hidden && !e.target.closest(".auth-wrap")) panel.hidden = true; });
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(ptSetup, 0)); else setTimeout(ptSetup, 0);
$("authOut").addEventListener("click", async () => {
  if (!window.csConfirm) { $("authOutConfirm").hidden = false; $("authOutBox").hidden = true; return; }
  if (await window.csConfirm("Sign out?", "<p>Your words, notes and buddy are saved in your account. Sign back in with Google anytime to get them back.</p>", "Sign out")) doSignOut();
});
$("authOutNo").addEventListener("click", () => { $("authOutConfirm").hidden = true; $("authOutBox").hidden = false; });
$("authOutYes").addEventListener("click", doSignOut);
window.csSignOut = doSignOut;
document.addEventListener("click", e => { if (e.target.closest("[data-signin]")) { e.preventDefault(); signIn(); } });

window.addEventListener("pagehide", () => { flush(); });
/* coming back to the tab only re-reads after a real break (each read counts toward the daily database limit) */
let hiddenAt = 0; window.__csAway = ms => !!hiddenAt && Date.now() - hiddenAt > ms;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { hiddenAt = Date.now(); flush(); return; }
  if (user && ready && !pending.size && window.__csAway(90000)) syncDown();   // pick up changes made on another device
});

/* ---------- private students: "My coaching" (read-only copy written by Noa's student hub) ---------- */
async function loadHubView() {
  let v = null;
  if (user) { try { const d = await getDoc(doc(db, "users", user.uid, "data", "hub-view")); if (d.exists() && !d.data().deleted) v = JSON.parse(d.data().json || "null"); } catch (e) { console.warn("hub view", e); } }
  setHubView(v);
}
/* one private copy per person: private students get "My coaching" in it, club members get the club feed (club-only members get just that) */
function setHubView(v) {
  /* keep a copy on this device so the next page load shows the club and My coaching instantly (then it refreshes) */
  if (!VA && user) try { if (v) localStorage.setItem("cs-hv-cache-" + user.uid, JSON.stringify(v)); else localStorage.removeItem("cs-hv-cache-" + user.uid); } catch (e) {}
  window.__csClub = v && v.club ? v.club : null; window.__csClubKnown = true;
  window.__csHubView = v && !v.clubOnly ? v : null;
  document.dispatchEvent(new CustomEvent("cs-club"));
  document.dispatchEvent(new CustomEvent("cs-hubview"));
}
document.addEventListener("visibilitychange", () => { if (!document.hidden && user && !window.__csPreview && window.__csAway(90000)) loadHubView(); });
/* teacher only: see the site as a student (their "My coaching" copy) */
/* Noa only: recommend a page to students (it pops up for them, with an "Open it" button) */
window.__csTeach = {
  async people() {
    if (!window.__csTeacher || !user) return [];
    const roles = {}; try { (await getDocs(collection(db, "roles"))).forEach(d => roles[d.id] = d.data() || {}); } catch (e) {}
    const out = []; (await getDocs(collection(db, "users"))).forEach(d => { const p = d.data() || {}, r = roles[d.id] || {}; if (d.id === user.uid || r.hidden) return;
      out.push({ uid: d.id, name: p.name || p.email || "(no name)", kind: r.private ? (r.club === false ? "private" : "both") : "club" }); });
    return out.sort((a, b) => a.name.localeCompare(b.name));
  },
  /* Home notifications: every account with when it joined / was last here, plus its role */
  async accounts() {
    if (!window.__csTeacher || !user) return [];
    if (this._acc && Date.now() - this._accAt < 180000) return this._acc;
    const res = await this._accounts(); this._acc = res; this._accAt = Date.now(); return res;
  },
  async _accounts() {
    const roles = {}; try { (await getDocs(collection(db, "roles"))).forEach(d => roles[d.id] = d.data() || {}); } catch (e) {}
    const ms = t => t && t.toMillis ? t.toMillis() : 0, out = [];
    (await getDocs(collection(db, "users"))).forEach(d => { const p = d.data() || {}, r = roles[d.id] || {}; if (d.id === user.uid || r.hidden) return;
      out.push({ uid: d.id, name: p.name || p.email || "(no name)", email: p.email || "", first: ms(p.firstSeen), last: ms(p.lastSeen),
        kind: r.hub || r.private ? (r.club === false ? "private" : "both") : (r.club === false ? "new" : "club") }); });
    return out;
  },
  async send(uid, text, go) { await setDoc(doc(collection(db, "inbox", uid, "msgs")), { text: String(text).slice(0, 1000), kind: go ? "rec:" + go : "rec", at: serverTimestamp() }); }
};
window.__csViewAs = {
  /* every private student (from Noa's Coaching data) and every Cheat Sheet member */
  async students() {
    if ((!window.__csTeacher && !VA) || !user) return { priv: [], club: [] };   /* also while viewing as someone (to switch to someone else) */
    if (this._st && Date.now() - this._stAt < 180000) return this._st;
    const res = await this._students(); this._st = res; this._stAt = Date.now(); return res;
  },
  async _students() {
    const roles = {}, hubUid = {};
    try { (await getDocs(collection(db, "roles"))).forEach(d => { const r = d.data() || {}; roles[d.id] = r; if (r.hub) hubUid[r.hub] = d.id; }); } catch (e) {}
    let meta = {}; const priv = [];
    try {
      const ds = await getDocs(collection(db, "users", user.uid, "data"));
      ds.forEach(d => { const v = d.data() || {}; if (v.deleted || typeof v.json !== "string") return; if (d.id === "t-hubmeta") { try { meta = JSON.parse(v.json) || {}; } catch (e) {} } });
      ds.forEach(d => { const v = d.data() || {}; if (!d.id.startsWith("t-hub-") || v.deleted || typeof v.json !== "string") return;
        try { const s = JSON.parse(v.json); if (!s || !s.name) return; const uid = hubUid[s.id] || s.uid || ""; const r = roles[uid] || {};
          priv.push({ key: "hub:" + s.id, uid, both: !!(uid && r.club === true), status: s.status || "active", view: makeView(s, meta) }); } catch (e) {} });
    } catch (e) { console.warn("view as: students", e); }
    const club = [];
    try { (await getDocs(collection(db, "users"))).forEach(d => { const p = d.data() || {}, r = roles[d.id] || {};
      if (d.id === user.uid || r.private || r.hub || r.hidden) return; club.push({ key: "uid:" + d.id, uid: d.id, name: p.name || p.email || "(no name)" }); }); } catch (e) {}
    const by = (a, b) => a.localeCompare(b);
    return { priv: priv.sort((a, b) => by(a.view.name, b.view.name)), club: club.sort((a, b) => by(a.name, b.name)) };
  },
  restore() { loadHubView(); },
  /* everything a student saved on Hibi (words, notes, buddy…), to look at it read-only */
  async data(uid) {
    if ((!window.__csTeacher && !VA) || !user || !uid) return {};
    const out = {};
    (await getDocs(collection(db, "users", uid, "data"))).forEach(d => { const x = d.data() || {}; if (d.id.startsWith("ncs-") && !x.deleted && typeof x.json === "string") out[localId(d.id)] = x.json;
      if (d.id === "hub-view" && !x.deleted && typeof x.json === "string") out.__hubview = x.json; });  /* their real copy: My coaching + the club, exactly as they see it */
    try { const r = await getDoc(doc(db, "roles", uid)); const lv = r.exists() && (r.data() || {}).lv; if (lv) out["cs-cefr"] = JSON.stringify({ lv }); } catch (e) {}
    return out;
  }
};
onAuthStateChanged(auth, u => {
  user = u; ready = false; loadNick(u);
  renderUser();
  if (VA) { let hv = null; try { hv = VA.data && VA.data.__hubview ? JSON.parse(VA.data.__hubview) : null; } catch (e) {} setHubView(hv || VA.view || null); window.__csAuth = !!u; window.dispatchEvent(new CustomEvent("cs-auth", { detail: { signedIn: !!u } })); return; }
  loadHubView();
  /* the English level Noa set for club members (from club class recordings), for level-adapted feedback */
  if (u) getDoc(doc(db, "roles", u.uid)).then(d => { const r = d.exists() ? d.data() || {} : {}; try { if (r.lv) localStorage.setItem("cs-cefr", JSON.stringify({ lv: r.lv })); else localStorage.removeItem("cs-cefr"); } catch (e) {}
      /* A1/A2 set by Noa and they never chose a mode themselves: beginner mode on (more Spanish, simpler examples); they can still turn it off */
      if (/^A[12]/.test(String(r.lv || "")) && !VA) setTimeout(() => { try { if (localStorage.getItem("ncs-level") == null && window.csSetLevel) window.csSetLevel(true); } catch (e) {} }, 6000); }).catch(() => {});
  if (u) syncDown();
  window.__csAuth = !!u; window.dispatchEvent(new CustomEvent("cs-auth", { detail: { signedIn: !!u } }));
});

/* ---------- buddy park: everyone's buddy look (no words or notes) at park/{uid} ---------- */
let parkTimer = null;
window.__csPark = {
  signedIn: () => !!user,
  uid: () => user ? user.uid : "",
  publish(b) {
    if (!user || VA) return;
    clearTimeout(parkTimer);
    parkTimer = setTimeout(() => {
      const first = String(gName()).trim().split(/\s+/)[0] || "";
      setDoc(doc(db, "park", user.uid), Object.assign({ first, at: serverTimestamp() }, b)).then(() => { window.__csParkErr = ""; }).catch(e => { window.__csParkErr = String(e && (e.code || e.message)); console.warn("park", e); });
    }, 1500);
  },
  async list() {
    if (!user) { const e = new Error("signed out"); e.code = "signed-out"; throw e; }
    const [p, r] = await Promise.all([getDocs(collection(db, "park")), getDocs(collection(db, "roles")).catch(() => null)]);
    const roles = {}; if (r) r.forEach(d => { roles[d.id] = d.data() || {}; });
    const out = []; p.forEach(d => out.push(Object.assign({}, d.data(), { uid: d.id, me: d.id === user.uid, role: roles[d.id] || {} })));
    return out;
  },
  /* send love to someone else's buddy: one per person per day (the rules enforce it) */
  async heart(uid, a) {
    if (!user || VA || uid === user.uid) return false;
    const d = new Date(), day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const first = String(gName()).trim().split(/\s+/)[0] || "";
    await setDoc(doc(db, "park", uid, "hearts", user.uid + "_" + day), { from: user.uid, first, a: a || "", at: serverTimestamp() });
    return true;
  },
  /* feed someone else's buddy: one treat per person per day */
  async feed(uid, a) {
    if (!user || VA || uid === user.uid) return false;
    const d = new Date(), day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const first = String(gName()).trim().split(/\s+/)[0] || "";
    await setDoc(doc(db, "park", uid, "hearts", user.uid + "_feed_" + day), { from: user.uid, first, a: a || "", kind: "feed", at: serverTimestamp() });
    return true;
  },
  /* collect the love other people sent to my buddy, then clear it */
  async claim() {
    if (!user || VA) return [];
    const snap = await getDocs(collection(db, "park", user.uid, "hearts"));
    const out = [];
    await Promise.all(snap.docs.map(async d => { out.push(d.data() || {}); try { await deleteDoc(d.ref); } catch (e) {} }));
    return out;
  }
};

/* ---------- translator (Gemini via Firebase AI Logic, free tier) ----------
   Same shape as the Claude page's sample(): sample(prompt,{onText}) -> {text} */
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
/* paid service first (Agent Platform, on the Blaze plan), the free Gemini Developer API as a backup */
let ai = null, aiPaid = null;
try { ai = getAI(app, { backend: new GoogleAIBackend() }); } catch (e) { console.warn("AI Logic not available", e); }
try { aiPaid = getAI(app, { backend: new AgentPlatformBackend("global") }); } catch (e) { aiPaid = null; }
const aiCount = k => { try { window.csUse && window.csUse(k); } catch (e) {} };
async function geminiSample(prompt, opts = {}) {
  let lastErr, limited = false; aiCount("ai");
  const tries = []; if (aiPaid && !window.__csNoPaidAI) MODELS.forEach(m => tries.push([aiPaid, m, true])); MODELS.forEach(m => tries.push([ai, m, false]));
  for (const [inst, name, paid] of tries) {
    try {
      const model = getGenerativeModel(inst, { model: name, generationConfig: { temperature: 0.2 } });
      const res = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of res.stream) {
        if (opts.signal && opts.signal.aborted) { const err = new Error("aborted"); err.name = "AbortError"; throw err; }
        text += chunk.text() || "";
        if (opts.onText) opts.onText({ text });
      }
      return { text: text.trim() };
    } catch (e) {
      if (e && e.name === "AbortError") throw e;
      lastErr = e;
      const msg = String((e && (e.message || e.code)) || "");
      /* the paid service isn't switched on yet (or not allowed): use the free one for the rest of this visit */
      if (paid && /403|permission|disabled|not been used|not enabled|billing|PERMISSION_DENIED|api-not-enabled/i.test(msg)) { window.__csNoPaidAI = true; continue; }
      if (paid) continue;   /* any other trouble with the paid service: try the next option */
      /* busy or out of quota: each model has its own limit, so try the next one before giving up */
      if (/429|quota|exhaust|rate/i.test(msg)) { aiCount("ai-limit"); limited = true; continue; }
      if (!/not found|404|unsupported|not supported|503|overloaded|unavailable/i.test(msg)) break;   // try the next model if this one doesn't exist or is overloaded
    }
  }
  if (limited) { const err = new Error("rate limited"); err.code = "rate_limited"; throw err; }
  console.warn("Translator failed", lastErr); aiCount("ai-fail");
  throw lastErr || new Error("failed");
}
function withTimeout(prompt, opts = {}) {
  return Promise.race([
    geminiSample(prompt, opts),
    new Promise((_, rej) => setTimeout(() => { const e = new Error("timeout"); e.code = "timeout"; rej(e); }, 20000))
  ]);
}
if (ai) { window.__csSample = withTimeout; window.dispatchEvent(new Event("cs-sample-ready")); }

/* Gemini voice (used on iPhone, where the built-in voice is muted in silent mode) */
const TTS_MODELS = ["gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts"];
let ttsIdx = 0;
async function ttsOnce(text) {
  let last; aiCount("ai-voice");
  for (let i = ttsIdx; i < TTS_MODELS.length; i++) {
    try {
      const m = getGenerativeModel(ai, { model: TTS_MODELS[i], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } } });
      const r = await m.generateContent("Say clearly and naturally, in a friendly American English voice, at a slightly slow pace for an English learner: " + text);
      const parts = r.response.inlineDataParts ? r.response.inlineDataParts() : [];
      const d = parts && parts[0] && parts[0].inlineData;
      if (!d || !d.data) throw new Error("no audio in reply");
      ttsIdx = i; return { data: d.data, mime: d.mimeType || "" };
    } catch (e) { last = e; if (!/not.?found|404|not supported|unsupported|invalid model/i.test(String((e && e.message) || ""))) { aiCount(/429|quota|exhaust|rate/i.test(String((e && e.message) || "")) ? "ai-limit" : "ai-fail"); throw e; } }
  }
  throw last;
}
if (ai) window.__csTTS = text => Promise.race([ttsOnce(text), new Promise((_, rej) => setTimeout(() => { const e = new Error("timeout"); e.code = "timeout"; rej(e); }, 15000))]);
