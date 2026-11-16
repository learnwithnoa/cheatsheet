// Hibi pay helper: a small Cloudflare Worker between Hibi and Flow (Chile).
// It holds the secret keys (as Cloudflare secrets, never in this file), starts club subscriptions,
// gives/removes club access in Hibi's database, and checks payments every night (5-day grace).
// Deployed by .github/workflows/pay-helper.yml.

const PROJECT = "learnwithnoa-cheatsheet";
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const TEACHER = "J8D2tjQmBaaA2QN730tSfSrjfm73";
const GRACE_DAYS = 5;
const SITE = "https://hibi.cl/";
const ORIGINS = ["https://learnwithnoa.github.io", "https://hibi.cl", "https://www.hibi.cl", "http://localhost:8768"];

// Plans: standard prices plus each legacy member's monthly price (in CLP).
const STD_MONTH = 35000, STD_YEAR = 210000;
const planId = (kind, amount) => `hibi-club-${kind}-${amount}`;

// ---------- small helpers ----------
const json = (obj, status = 200, req) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", ...cors(req) } });
function cors(req) {
  const o = req && req.headers.get("origin");
  return o && ORIGINS.includes(o) ? { "access-control-allow-origin": o, "access-control-allow-headers": "authorization, content-type", "access-control-allow-methods": "GET, POST, OPTIONS", vary: "origin" } : {};
}
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const b64url = (data) => btoa(typeof data === "string" ? data : String.fromCharCode(...new Uint8Array(data))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d + "T12:00:00Z"); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const normEmail = (e) => String(e || "").trim().toLowerCase();

// ---------- Flow ----------
function flowBase(env) { return env.FLOW_ENV === "live" ? "https://www.flow.cl/api" : "https://sandbox.flow.cl/api"; }
async function flowSign(env, params) {
  const keys = Object.keys(params).sort();
  const toSign = keys.map((k) => k + params[k]).join("");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.FLOW_SECRET_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(toSign)));
}
async function flow(env, method, path, params = {}) {
  const p = { apiKey: env.FLOW_API_KEY, ...params };
  for (const k of Object.keys(p)) if (p[k] === undefined || p[k] === null) delete p[k]; else p[k] = String(p[k]);
  p.s = await flowSign(env, p);
  const body = new URLSearchParams(p).toString();
  const r = method === "GET"
    ? await fetch(`${flowBase(env)}${path}?${body}`)
    : await fetch(`${flowBase(env)}${path}`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
  const t = await r.text(); let d; try { d = JSON.parse(t); } catch { d = { raw: t.slice(0, 300) }; }
  if (!r.ok) { const e = new Error(`Flow ${path}: ${d.message || d.raw || r.status}`); e.flow = d; e.status = r.status; throw e; }
  return d;
}
async function ensurePlan(env, kind, amount, workerUrl) {
  const id = planId(kind, amount);
  try { await flow(env, "GET", "/plans/get", { planId: id }); return id; } catch (e) { if (!/not found/i.test(e.message)) throw e; }
  await flow(env, "POST", "/plans/create", {
    planId: id, name: kind === "y" ? "Noa's English Club (yearly)" : "Noa's English Club (monthly)",
    currency: "CLP", amount, interval: kind === "y" ? 4 : 3, interval_count: 1, trial_period_days: 0,
    days_until_due: GRACE_DAYS, charges_retries_number: 3, urlCallback: workerUrl + "/api/flow-callback",
  });
  return id;
}

// ---------- Firebase (service account) ----------
let tokenCache = null;
async function gToken(env) {
  if (tokenCache && tokenCache.exp > Date.now() + 60000) return tokenCache.tok;
  const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/identitytoolkit", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(head + "." + claim));
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: head + "." + claim + "." + b64url(sig) }) });
  const d = await r.json(); if (!d.access_token) throw new Error("Google sign-in failed: " + (d.error_description || d.error));
  tokenCache = { tok: d.access_token, exp: Date.now() + d.expires_in * 1000 };
  return d.access_token;
}
async function fs(env, method, path, body) {
  const r = await fetch(path.startsWith("http") ? path : `${FS}/${path}`, { method, headers: { authorization: "Bearer " + (await gToken(env)), "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (r.status === 404) return null;
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Database ${method} ${path.split("?")[0]}: ${(d.error && d.error.message) || r.status}`);
  return d;
}
const val = (v) => v === null || v === undefined ? { nullValue: null } : typeof v === "boolean" ? { booleanValue: v } : typeof v === "number" ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }) : { stringValue: String(v) };
const unval = (v) => !v ? undefined : "stringValue" in v ? v.stringValue : "booleanValue" in v ? v.booleanValue : "integerValue" in v ? Number(v.integerValue) : "doubleValue" in v ? v.doubleValue : "timestampValue" in v ? v.timestampValue : null;
const fields = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, val(v)]));
const plain = (d) => d && d.fields ? Object.fromEntries(Object.entries(d.fields).map(([k, v]) => [k, unval(v)])) : null;
async function patch(env, path, obj) {
  const mask = Object.keys(obj).map((k) => "updateMask.fieldPaths=" + encodeURIComponent(k)).join("&");
  return fs(env, "PATCH", `${path}?${mask}`, { fields: fields(obj) });
}
// Hibi keeps most data as { json, deleted, at } documents under users/{uid}/data/{key}
async function getJ(env, uid, key) { const d = plain(await fs(env, "GET", `users/${uid}/data/${key}`)); return !d || d.deleted ? null : JSON.parse(d.json || "null"); }
async function setJ(env, uid, key, obj) {
  return fs(env, "PATCH", `users/${uid}/data/${key}`, { fields: { json: { stringValue: obj === null ? "null" : JSON.stringify(obj) }, deleted: { booleanValue: obj === null }, at: { timestampValue: new Date().toISOString() } } });
}

// who is calling (Hibi sends the member's sign-in token)
async function whoIs(env, req) {
  const tok = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!tok) return null;
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ idToken: tok }) });
  const d = await r.json().catch(() => ({}));
  const u = d.users && d.users[0];
  return u ? { uid: u.localId, email: normEmail(u.email), name: u.displayName || "" } : null;
}

// ---------- club access (same steps as the Members page's "Club" setting) ----------
async function grantClub(env, uid, name) {
  await patch(env, `roles/${uid}`, { club: true });
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  const ids = new Set(meta.clubUids || []);
  if (!ids.has(uid)) { ids.add(uid); meta.clubUids = [...ids].sort(); await setJ(env, TEACHER, "t-hubmeta", meta); }
  await patch(env, `clubAccess/${uid}`, { on: true, name: name || "" });
  const role = plain(await fs(env, "GET", `roles/${uid}`)) || {};
  if (!role.hub && meta.clubFeed) await setJ(env, uid, "hub-view", { v: 1, clubOnly: true, club: meta.clubFeed, updated: new Date().toISOString() });
}
async function removeClub(env, uid) {
  if (uid === TEACHER) return;
  await patch(env, `roles/${uid}`, { club: false });
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  if ((meta.clubUids || []).includes(uid)) { meta.clubUids = meta.clubUids.filter((x) => x !== uid); await setJ(env, TEACHER, "t-hubmeta", meta); }
  await fs(env, "DELETE", `clubAccess/${uid}`).catch(() => {});
  const role = plain(await fs(env, "GET", `roles/${uid}`)) || {};
  if (!role.hub) await setJ(env, uid, "hub-view", null);
}

// billing/{uid} is private (only this helper can read it); users/{uid}/data/membership is what the member sees
async function getBill(env, uid) { return plain(await fs(env, "GET", `billing/${uid}`)) || {}; }
async function saveBill(env, uid, b) {
  await patch(env, `billing/${uid}`, { ...b, updated: new Date().toISOString() });
  const all = await getBill(env, uid);
  await setJ(env, uid, "membership", {
    status: all.status || "none", kind: all.kind || null, amount: all.amount || null, currency: "CLP",
    paidThrough: all.paidThrough || null, graceUntil: all.graceUntil || null, card: all.card || null, provider: all.provider || null,
    trialUntil: all.trialUntil || null, trialUsed: !!all.trialUsed, updated: new Date().toISOString(),
  });
}

// the member's monthly price: a legacy price Noa set (t-hubmeta.clubPrices, by email) or the standard one
async function priceFor(env, email) {
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  const p = (meta.clubPrices || {})[normEmail(email)];
  return Number(p && (p.clp || p)) || STD_MONTH;
}

// ---------- routes ----------
async function subscribe(env, req, url) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const body = await req.json().catch(() => ({}));
  const kind = body.plan === "yearly" ? "y" : "m";
  const amount = kind === "y" ? STD_YEAR : await priceFor(env, me.email);
  const b = await getBill(env, me.uid);
  if (["active", "grace", "canceling"].includes(b.status) && b.subscriptionId) return json({ error: "You already have an active membership." }, 400, req);
  let customerId = b.customerId;
  if (!customerId) {
    const c = await flow(env, "POST", "/customer/create", { name: me.name || me.email, email: me.email, externalId: me.uid });
    customerId = c.customerId;
  }
  await saveBill(env, me.uid, { customerId, email: me.email, name: me.name, pendingKind: kind, pendingAmount: amount, provider: "flow", status: b.status || "none" });
  const reg = await flow(env, "POST", "/customer/register", { customerId, url_return: url.origin + "/api/card-return" });
  return json({ url: reg.url + "?token=" + reg.token }, 200, req);
}

async function cardReturn(env, req, url) {
  const form = req.method === "POST" ? await req.formData().catch(() => null) : null;
  const token = (form && form.get("token")) || url.searchParams.get("token");
  const back = (ok, why) => Response.redirect(SITE + "?membership=" + (ok ? "ok" : "fail" + (why ? "&why=" + encodeURIComponent(why) : "")) + "#club", 303);
  if (!token) return back(false, "no-token");
  const st = await flow(env, "GET", "/customer/getRegisterStatus", { token });
  if (String(st.status) !== "1") return back(false, "card");
  const cust = await flow(env, "GET", "/customer/get", { customerId: st.customerId });
  const uid = cust.externalId; if (!uid) return back(false, "who");
  const b = await getBill(env, uid);
  const card = st.creditCardType ? `${st.creditCardType} ···${st.last4CardDigits || ""}` : null;
  if (b.pendingKind === "card" && b.subscriptionId) {       // just a new card for an existing membership
    await saveBill(env, uid, { card, pendingKind: null });
    return Response.redirect(SITE + "?membership=card#club", 303);
  }
  const kind = b.pendingKind || "m", amount = Number(b.pendingAmount) || STD_MONTH;
  const plan = await ensurePlan(env, kind, amount, url.origin);
  const sub = await flow(env, "POST", "/subscription/create", { planId: plan, customerId: st.customerId });
  const paidThrough = (sub.period_end || "").slice(0, 10) || addDays(today(), kind === "y" ? 365 : 31);
  await saveBill(env, uid, { subscriptionId: sub.subscriptionId, planId: plan, kind, amount, card, status: "active", paidThrough, graceUntil: null, since: b.since || today(), pendingKind: null });
  await grantClub(env, uid, b.name || cust.name);
  if (b.trialUsed) await trialLog(env, uid, { status: "joined", joined: Date.now() }).catch(() => {});
  return back(true);
}

async function updateCard(env, req, url) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const b = await getBill(env, me.uid);
  if (!b.customerId || !b.subscriptionId) return json({ error: "No membership found." }, 400, req);
  await patch(env, `billing/${me.uid}`, { pendingKind: "card" });
  const reg = await flow(env, "POST", "/customer/register", { customerId: b.customerId, url_return: url.origin + "/api/card-return" });
  return json({ url: reg.url + "?token=" + reg.token }, 200, req);
}

// ---------- free 2-week club trial (no card) ----------
const TRIAL_DAYS = 14;
async function trialLog(env, uid, entry) {          // Noa's list (users/{Noa}/data/t-trials): his bell + the nightly summary read it
  const list = (await getJ(env, TEACHER, "t-trials")) || [];
  const i = list.findIndex((x) => x.uid === uid);
  if (i >= 0) list[i] = { ...list[i], ...entry }; else list.unshift({ uid, ...entry });
  await setJ(env, TEACHER, "t-trials", list.slice(0, 200));
}
async function startTrial(env, req) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const b = await getBill(env, me.uid);
  if (b.trialUsed) return json({ error: "You’ve already had your free trial. You can join anytime, or message Noa." }, 400, req);
  const role = plain(await fs(env, "GET", `roles/${me.uid}`)) || {};
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  if (role.club === true || (meta.clubUids || []).includes(me.uid)) return json({ error: "You’re already in the club! Refresh the page." }, 400, req);
  const until = addDays(today(), TRIAL_DAYS);
  await saveBill(env, me.uid, { status: "trial", trialUsed: true, trialStart: new Date().toISOString(), trialUntil: until, email: me.email, name: me.name });
  await grantClub(env, me.uid, me.name);
  await trialLog(env, me.uid, { name: me.name, email: me.email, start: Date.now(), until, status: "trial" });
  return json({ ok: true, until }, 200, req);
}

async function cancel(env, req) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const b = await getBill(env, me.uid);
  if (!b.subscriptionId) return json({ error: "No active membership found." }, 400, req);
  await flow(env, "POST", "/subscription/cancel", { subscriptionId: b.subscriptionId, at_period_end: 1 });
  await saveBill(env, me.uid, { status: "canceling" });
  return json({ ok: true, paidThrough: b.paidThrough }, 200, req);
}

// nightly: read every subscription from Flow, keep paid members in, give 5 days after a failed payment, then remove access
async function nightly(env) {
  const list = await fs(env, "GET", "billing?pageSize=300");
  const out = [];
  for (const d of (list && list.documents) || []) {
    const uid = d.name.split("/").pop(); const b = plain(d);
    try {
      if (b.status === "trial" && !b.subscriptionId) {
        if (b.trialUntil && today() > b.trialUntil) {
          // if Noa changed this person's club setting himself after the trial began (e.g. they paid another way), leave it
          const role = plain(await fs(env, "GET", `roles/${uid}`)) || {};
          const kept = role.at && b.trialStart && role.at > b.trialStart && role.club === true;
          if (!kept) await removeClub(env, uid);
          const status = kept ? "trial-kept" : "trial-ended";
          await saveBill(env, uid, { status });
          await trialLog(env, uid, { status, ended: Date.now() });
          out.push({ uid, status });
        }
        continue;
      }
      if (!b.subscriptionId) continue;
      const sub = await flow(env, "GET", "/subscription/get", { subscriptionId: b.subscriptionId });
      const end = (sub.period_end || b.paidThrough || "").slice(0, 10);
      const unpaid = (sub.invoices || []).filter((i) => String(i.status) !== "1" && i.due_date && i.due_date.slice(0, 10) <= today());
      let status = b.status, graceUntil = b.graceUntil || null;
      if (String(sub.status) === "4" || b.status === "canceling") {        // cancelled: access until the paid period ends
        status = end && end >= today() ? "canceling" : "ended";
      } else if (unpaid.length) {                                       // a payment failed: 5 days of grace
        const firstDue = unpaid.map((i) => i.due_date.slice(0, 10)).sort()[0];
        graceUntil = addDays(firstDue, GRACE_DAYS);
        status = today() <= graceUntil ? "grace" : "ended";
      } else { status = "active"; graceUntil = null; }
      await saveBill(env, uid, { status, graceUntil, paidThrough: end || b.paidThrough || null });
      if (status === "ended" && b.status !== "ended") { await removeClub(env, uid); if (String(sub.status) !== "4") await flow(env, "POST", "/subscription/cancel", { subscriptionId: b.subscriptionId, at_period_end: 0 }).catch(() => {}); }
      out.push({ uid, status });
    } catch (e) { out.push({ uid, error: String(e.message).slice(0, 120) }); }
  }
  return out;
}

async function health(env) {
  const r = { ok: true, flow: env.FLOW_ENV === "live" ? "live" : "sandbox", flowKeys: !!(env.FLOW_API_KEY && env.FLOW_SECRET_KEY), firebaseKey: !!env.FIREBASE_SERVICE_ACCOUNT };
  try { await flow(env, "GET", "/plans/get", { planId: "hibi-health-check" }); r.flowApi = "ok"; } catch (e) { if (/not found/i.test(e.message)) r.flowApi = "ok"; else { r.flowApi = "problem"; r.flowSays = String((e.flow && (e.flow.code + " " + e.flow.message)) || e.message).slice(0, 120); r.ok = false; } }
  try { await fs(env, "GET", "roles?pageSize=1"); r.database = "ok"; } catch (e) { r.database = String(e.message).slice(0, 120); r.ok = false; }
  return r;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors(req) });
    try {
      switch (url.pathname) {
        case "/robots.txt": return new Response("User-agent: *\nAllow: /api/health\nDisallow: /\n");
        case "/api/health": return json(await health(env), 200, req);
        case "/api/subscribe": return await subscribe(env, req, url);
        case "/api/card-return": return await cardReturn(env, req, url);
        case "/api/cancel": return await cancel(env, req);
        case "/api/update-card": return await updateCard(env, req, url);
        case "/api/trial": return await startTrial(env, req);
        case "/api/flow-callback": await nightly(env); return new Response("ok");
        case "/api/nightly": {
          const me = await whoIs(env, req); if (!me || me.uid !== TEACHER) return json({ error: "Only Noa can do this." }, 403, req);
          return json(await nightly(env), 200, req);
        }
        default: return new Response("Hibi pay helper", { status: 404 });
      }
    } catch (e) {
      console.log("error", url.pathname, e.message);
      if (url.pathname === "/api/card-return") return Response.redirect(SITE + "?membership=fail#club", 303);
      return json({ error: "Something went wrong with the payment helper. Please try again, or message Noa." , detail: String(e.message).slice(0, 200) }, 500, req);
    }
  },
  async scheduled(event, env, ctx) { ctx.waitUntil(nightly(env)); },
};
