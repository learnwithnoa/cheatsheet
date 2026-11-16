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
const TESTERS = [TEACHER, "Bh1mtEtTgxg6DJagqNddDyqKeiH2"];   // Noa + his test account can buy a hidden $1.000/month test plan
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
const curEnv = (env) => (env.FLOW_ENV === "live" ? "live" : "sandbox");   // ids from sandbox Flow mean nothing to live Flow
const sameEnv = (env, b) => (b.flowEnv || "sandbox") === curEnv(env);
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
    status: all.status || "none", kind: all.kind || null, amount: all.amount || null, currency: all.currency || "CLP",
    paidThrough: all.paidThrough || null, graceUntil: all.graceUntil || null, card: all.card || null, provider: all.provider || null,
    trialUntil: all.trialUntil || null, trialUsed: !!all.trialUsed, updated: new Date().toISOString(),
  });
}

// the member's monthly price: a legacy price Noa set (t-hubmeta.clubPrices, by email) or the standard one
// legacy prices: a price Noa typed on the Members page (t-hubmeta.clubPrices, by email) wins;
// otherwise their Skool price from the club list (US$24 → $24.000, or US$24 on PayPal); otherwise the standard price
const nn = (x) => String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
async function legacyPrice(env, email, name) {
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  const o = (meta.clubPrices || {})[normEmail(email)];
  if (o) return typeof o === "number" ? { clp: o } : o;
  const ms = (meta.club && meta.club.members) || [];
  const m = ms.find((x) => x.email && normEmail(x.email) === normEmail(email)) || (nn(name) ? ms.find((x) => nn(x.name) === nn(name)) : null);
  if (m && Number(m.price) > 0 && m.per !== "year") return { clp: Number(m.price) * 1000, usd: Number(m.price) };
  return null;
}
// Skool members moving over: their first Hibi payment waits until the day Skool would have charged them (from the club list),
// so nobody pays twice for the same month. Only dates 2–70 days ahead count; otherwise the first payment is today.
const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12, ene: 1, abr: 4, ago: 8, dic: 12 };
function parseRenew(s) {
  s = String(s || "").trim().toLowerCase(); if (!s) return null;
  let y, mo, d, x;
  if ((x = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) [y, mo, d] = [+x[1], +x[2], +x[3]];
  else if ((x = s.match(/^(\d{1,2})[\/.-](\d{1,2})(?:[\/.-](\d{2,4}))?$/))) [d, mo, y] = [+x[1], +x[2], x[3] ? +x[3] : 0];
  else if ((x = s.match(/([a-zñ]{3})[a-zñ]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})?/))) [mo, d, y] = [MONTHS[x[1]], +x[2], x[3] ? +x[3] : 0];
  else if ((x = s.match(/(\d{1,2})\s*(?:de\s+)?([a-zñ]{3})[a-zñ]*\.?(?:\s*(?:de\s+)?(\d{4}))?/))) [d, mo, y] = [+x[1], MONTHS[x[2]], x[3] ? +x[3] : 0];
  if (!mo || !d || mo > 12 || d > 31) return null;
  if (y && y < 100) y += 2000;
  const t = today(), ty = +t.slice(0, 4);
  const iso = (yy) => `${yy}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  let r = iso(y || ty); if (!y && r < t) r = iso(ty + 1);
  // a date that already passed means Skool already charged that month: the next charge is a month later (same day)
  for (let i = 0; i < 24 && r < addDays(t, 2); i++) { let [yy, mm] = r.split("-").map(Number); mm += 1; if (mm > 12) { mm = 1; yy += 1; } const last = new Date(Date.UTC(yy, mm, 0)).getUTCDate(); r = `${yy}-${String(mm).padStart(2, "0")}-${String(Math.min(d, last)).padStart(2, "0")}`; }
  return r;
}
async function rosterFor(env, me) {
  const meta = (await getJ(env, TEACHER, "t-hubmeta")) || {};
  const ms = (meta.club && meta.club.members) || [];
  return ms.find((x) => x.email && normEmail(x.email) === normEmail(me.email)) || (nn(me.name) ? ms.find((x) => nn(x.name) === nn(me.name)) : null);
}
async function firstCharge(env, me) {
  const m = await rosterFor(env, me); if (!m || m.per === "year") return null;
  const r = parseRenew(m.renew); if (!r) return null;
  return r >= addDays(today(), 2) && r <= addDays(today(), 70) ? r : null;
}
// what a club member who still pays on Skool will pay on Hibi (for the "Move your membership to Hibi" card)
async function myPrice(env, req) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const m = await rosterFor(env, me);
  const p = await legacyPrice(env, me.email, me.name);
  const o = { clp: Number(p && p.clp) || STD_MONTH, usd: Number(p && p.usd) || STD_MONTH_USD, legacy: !!p, onList: !!m, renew: (m && m.renew) || null, start: await firstCharge(env, me) };
  if (p && p.usd && !p.clp) o.usdOnly = true;
  if (m && m.per === "year") o.annual = true;
  if (m && !(Number(m.price) > 0) && !p) o.free = true;
  return json(o, 200, req);
}
async function priceFor(env, email, name) { const p = await legacyPrice(env, email, name); return Number(p && p.clp) || STD_MONTH; }

// ---------- PayPal (US dollars, for members outside Chile) ----------
const STD_MONTH_USD = 35, STD_YEAR_USD = 210;
const ppBase = (env) => (env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com");
const ppEnv = (env) => (env.PAYPAL_ENV === "live" ? "live" : "sandbox");
let ppTok = null;
async function pp(env, method, path, body) {
  if (!ppTok || ppTok.exp < Date.now() + 60000) {
    const r = await fetch(ppBase(env) + "/v1/oauth2/token", { method: "POST", headers: { authorization: "Basic " + btoa(env.PAYPAL_CLIENT_ID + ":" + env.PAYPAL_SECRET), "content-type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials" });
    const d = await r.json().catch(() => ({})); if (!d.access_token) throw new Error("PayPal keys: " + (d.error_description || d.error || r.status));
    ppTok = { tok: d.access_token, exp: Date.now() + d.expires_in * 1000 };
  }
  const r = await fetch(ppBase(env) + path, { method, headers: { authorization: "Bearer " + ppTok.tok, "content-type": "application/json", prefer: "return=representation" }, body: body ? JSON.stringify(body) : undefined });
  if (r.status === 204) return {};
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error("PayPal " + path.split("?")[0] + ": " + (d.message || d.name || r.status)); e.status = r.status; throw e; }
  return d;
}
async function usdFor(env, email, name) { const p = await legacyPrice(env, email, name); return Number(p && p.usd) || STD_MONTH_USD; }
async function ppPlan(env, kind, usd) {           // PayPal makes its own plan ids: remember them in billingConfig/paypal-<env>
  const cfgPath = `billingConfig/paypal-${ppEnv(env)}`, cfg = plain(await fs(env, "GET", cfgPath)) || {};
  const key = `plan_${kind}_${String(usd).replace(".", "_")}`;
  if (cfg[key]) return cfg[key];
  let product = cfg.product;
  if (!product) { const pr = await pp(env, "POST", "/v1/catalogs/products", { name: "Noa's English Club", type: "SERVICE", category: "EDUCATIONAL_AND_TEXTBOOKS" }); product = pr.id; await patch(env, cfgPath, { product }); }
  const plan = await pp(env, "POST", "/v1/billing/plans", { product_id: product, name: `Noa's English Club (${kind === "y" ? "yearly" : "monthly"}, US$${usd})`, status: "ACTIVE",
    billing_cycles: [{ frequency: { interval_unit: kind === "y" ? "YEAR" : "MONTH", interval_count: 1 }, tenure_type: "REGULAR", sequence: 1, total_cycles: 0, pricing_scheme: { fixed_price: { value: String(usd), currency_code: "USD" } } }],
    payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 2, setup_fee_failure_action: "CANCEL" } });
  await patch(env, cfgPath, { [key]: plan.id });
  return plan.id;
}
async function ppSubscribe(env, req, url, me, body) {
  if (!env.PAYPAL_CLIENT_ID) return json({ error: "PayPal isn't set up yet." }, 400, req);
  const kind = body.plan === "yearly" ? "y" : "m";
  const usd = body.plan === "test" && TESTERS.includes(me.uid) ? 1 : kind === "y" ? STD_YEAR_USD : await usdFor(env, me.email, me.name);
  const b = await getBill(env, me.uid);
  if (["active", "grace", "canceling"].includes(b.status) && ((b.provider === "paypal" && b.ppEnv === ppEnv(env)) || (b.provider !== "paypal" && b.subscriptionId && sameEnv(env, b)))) return json({ error: "You already have an active membership." }, 400, req);
  const plan = await ppPlan(env, kind, usd);
  const start = kind === "m" && usd > 1 ? await firstCharge(env, me) : null;
  const sub = await pp(env, "POST", "/v1/billing/subscriptions", Object.assign(start ? { start_time: start + "T15:00:00Z" } : {}, { plan_id: plan, custom_id: me.uid,
    application_context: { brand_name: "Noa's English Club", user_action: "SUBSCRIBE_NOW", shipping_preference: "NO_SHIPPING", return_url: url.origin + "/api/paypal-return", cancel_url: SITE + "?membership=fail#club" } }));
  const link = (sub.links || []).find((l) => l.rel === "approve");
  await patch(env, `billing/${me.uid}`, { email: me.email, name: me.name, ppPending: sub.id, ppPendingKind: kind, ppPendingUsd: usd });
  return json({ url: link && link.href }, 200, req);
}
async function ppReturn(env, req, url) {
  const id = url.searchParams.get("subscription_id");
  if (!id) return Response.redirect(SITE + "?membership=fail#club", 303);
  let sub = await pp(env, "GET", `/v1/billing/subscriptions/${id}`);
  const uid = sub.custom_id; if (!uid) return Response.redirect(SITE + "?membership=fail#club", 303);
  for (let i = 0; i < 4 && sub.status === "APPROVED"; i++) { await new Promise((r) => setTimeout(r, 1500)); sub = await pp(env, "GET", `/v1/billing/subscriptions/${id}`); }
  if (!["ACTIVE", "APPROVED"].includes(sub.status)) return Response.redirect(SITE + "?membership=fail#club", 303);
  const b = await getBill(env, uid);
  const kind = b.ppPendingKind || "m", usd = Number(b.ppPendingUsd) || STD_MONTH_USD;
  const next = sub.billing_info && sub.billing_info.next_billing_time;
  await saveBill(env, uid, { provider: "paypal", ppSubId: id, ppEnv: ppEnv(env), kind, amount: usd, currency: "USD", card: "PayPal", status: "active",
    paidThrough: next ? next.slice(0, 10) : addDays(today(), kind === "y" ? 365 : 31), graceUntil: null, since: b.since || today(), ppPending: null });
  await grantClub(env, uid, b.name || "");
  if (b.trialUsed) { await trialLog(env, uid, { status: "joined", joined: Date.now() }).catch(() => {}); await trackerRow(env, { email: b.email, status: "joined" }); }
  return Response.redirect(SITE + "?membership=ok#club", 303);
}
async function ppNightly(env, uid, b) {
  if (b.ppEnv !== ppEnv(env)) return null;
  const sub = await pp(env, "GET", `/v1/billing/subscriptions/${b.ppSubId}`);
  const bi = sub.billing_info || {}, next = (bi.next_billing_time || "").slice(0, 10);
  const failed = bi.last_failed_payment && bi.last_failed_payment.time ? bi.last_failed_payment.time.slice(0, 10) : null;
  const lastPaid = bi.last_payment && bi.last_payment.time ? bi.last_payment.time.slice(0, 10) : null;
  let status, graceUntil = null, paidThrough = b.paidThrough || null;
  if (sub.status === "ACTIVE" && !(failed && (!lastPaid || failed > lastPaid))) { status = "active"; paidThrough = next || paidThrough; }
  else if (sub.status === "CANCELLED" || sub.status === "EXPIRED" || b.status === "canceling") { status = paidThrough && paidThrough >= today() ? "canceling" : "ended"; }
  else { graceUntil = addDays(failed || today(), GRACE_DAYS); status = today() <= graceUntil ? "grace" : "ended"; }
  await saveBill(env, uid, { status, graceUntil, paidThrough });
  if (status === "ended" && b.status !== "ended") { await removeClub(env, uid); if (!["CANCELLED", "EXPIRED"].includes(sub.status)) await pp(env, "POST", `/v1/billing/subscriptions/${b.ppSubId}/cancel`, { reason: "Payment didn't go through" }).catch(() => {}); }
  return status;
}

// ---------- Mercado Pago (pesos, automatic monthly/yearly card charge; works for a persona natural) ----------
async function mp(env, method, path, body) {
  const r = await fetch("https://api.mercadopago.com" + path, { method, headers: { authorization: "Bearer " + env.MP_ACCESS_TOKEN, "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error("Mercado Pago " + path.split("?")[0].replace(/\/[\w-]{12,}/, "/…") + ": " + (d.message || d.error || r.status)); e.status = r.status; throw e; }
  return d;
}
const mpEnv = (env) => (String(env.MP_ACCESS_TOKEN || "").startsWith("TEST-") ? "test" : "live");
async function mpSubscribe(env, req, url, me, body) {
  if (!env.MP_ACCESS_TOKEN) return json({ error: "Payments aren't set up yet." }, 400, req);
  const test = body.plan === "test" && TESTERS.includes(me.uid);
  const kind = body.plan === "yearly" ? "y" : "m";
  const amount = test ? 1000 : kind === "y" ? STD_YEAR : await priceFor(env, me.email, me.name);
  const b = await getBill(env, me.uid);
  if (["active", "grace", "canceling"].includes(b.status) && ((b.provider === "mp" && b.mpEnv === mpEnv(env)) || (b.provider === "paypal" && b.ppEnv === ppEnv(env)))) return json({ error: "You already have an active membership." }, 400, req);
  const start = !test && kind === "m" ? await firstCharge(env, me) : null;   // moving from Skool: first payment on their Skool date
  const payer = normEmail(body.payerEmail || me.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payer)) return json({ error: "Please check the email of your Mercado Pago account." }, 400, req);
  const sub = await mp(env, "POST", "/preapproval", { reason: kind === "y" ? "Noa's English Club (yearly)" : "Noa's English Club (monthly)", external_reference: me.uid, payer_email: payer,
    auto_recurring: Object.assign({ frequency: kind === "y" ? 12 : 1, frequency_type: "months", transaction_amount: amount, currency_id: "CLP" }, start ? { start_date: start + "T12:00:00.000-03:00" } : {}), back_url: url.origin + "/api/mp-return", status: "pending" });
  await patch(env, `billing/${me.uid}`, { email: me.email, name: me.name, mpPending: sub.id, mpPendingKind: kind, mpPendingAmount: amount });
  return json({ url: sub.init_point }, 200, req);
}
async function mpReturn(env, req, url) {
  const id = url.searchParams.get("preapproval_id");
  if (!id) return Response.redirect(SITE + "?membership=fail#club", 303);
  let sub = await mp(env, "GET", `/preapproval/${id}`);
  for (let i = 0; i < 4 && sub.status === "pending"; i++) { await new Promise((r) => setTimeout(r, 1500)); sub = await mp(env, "GET", `/preapproval/${id}`); }
  const uid = sub.external_reference;
  if (!uid || sub.status !== "authorized") return Response.redirect(SITE + "?membership=fail#club", 303);
  const b = await getBill(env, uid);
  const kind = b.mpPendingKind || "m", amount = Number(b.mpPendingAmount) || (sub.auto_recurring && sub.auto_recurring.transaction_amount) || STD_MONTH;
  await saveBill(env, uid, { provider: "mp", mpId: id, mpEnv: mpEnv(env), kind, amount, currency: "CLP", card: "Mercado Pago", status: "active",
    paidThrough: (sub.next_payment_date || "").slice(0, 10) || addDays(today(), kind === "y" ? 365 : 31), graceUntil: null, since: b.since || today(), mpPending: null });
  await grantClub(env, uid, b.name || "");
  if (b.trialUsed) { await trialLog(env, uid, { status: "joined", joined: Date.now() }).catch(() => {}); await trackerRow(env, { email: b.email, status: "joined" }); }
  return Response.redirect(SITE + "?membership=ok#club", 303);
}
async function mpNightly(env, uid, b) {
  if (b.mpEnv !== mpEnv(env)) return null;
  const sub = await mp(env, "GET", `/preapproval/${b.mpId}`);
  const next = (sub.next_payment_date || "").slice(0, 10);
  let pays = [];
  try { const r = await mp(env, "GET", `/authorized_payments/search?preapproval_id=${b.mpId}&sort=date_created&criteria=desc&limit=5`); pays = r.results || []; } catch (e) {}
  const last = pays[0], lastBad = last && /rejected|recycling|cancelled/.test(String((last.payment && last.payment.status) || last.status || "")) ? (last.date_created || last.debit_date || "").slice(0, 10) : null;
  let status, graceUntil = null, paidThrough = b.paidThrough || null;
  if (sub.status === "authorized" && !lastBad) { status = "active"; paidThrough = next || paidThrough; }
  else if (sub.status === "cancelled" || b.status === "canceling") { status = paidThrough && paidThrough >= today() ? "canceling" : "ended"; }
  else { graceUntil = addDays(lastBad || today(), GRACE_DAYS); status = today() <= graceUntil ? "grace" : "ended"; }
  await saveBill(env, uid, { status, graceUntil, paidThrough });
  if (status === "ended" && b.status !== "ended") { await removeClub(env, uid); if (sub.status !== "cancelled") await mp(env, "PUT", `/preapproval/${b.mpId}`, { status: "cancelled" }).catch(() => {}); }
  return status;
}

// ---------- routes ----------
async function subscribe(env, req, url) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const body = await req.json().catch(() => ({}));
  if (body.provider === "paypal") return await ppSubscribe(env, req, url, me, body);
  if (body.provider === "mp") return await mpSubscribe(env, req, url, me, body);
  const test = body.plan === "test";
  if (test && !TESTERS.includes(me.uid)) return json({ error: "Not available." }, 403, req);
  const kind = body.plan === "yearly" ? "y" : "m";
  const amount = test ? 1000 : kind === "y" ? STD_YEAR : await priceFor(env, me.email, me.name);
  const b = await getBill(env, me.uid);
  if (["active", "grace", "canceling"].includes(b.status) && b.subscriptionId && sameEnv(env, b)) return json({ error: "You already have an active membership." }, 400, req);
  let customerId = sameEnv(env, b) ? b.customerId : null;
  if (!customerId) {
    const c = await flow(env, "POST", "/customer/create", { name: me.name || me.email, email: me.email, externalId: me.uid });
    customerId = c.customerId;
  }
  await saveBill(env, me.uid, { customerId, flowEnv: curEnv(env), email: me.email, name: me.name, pendingKind: kind, pendingAmount: amount, provider: "flow", status: sameEnv(env, b) ? (b.status || "none") : (b.status && b.status.startsWith("trial") ? b.status : "none") });
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
  await saveBill(env, uid, { subscriptionId: sub.subscriptionId, planId: plan, kind, amount, card, status: "active", paidThrough, graceUntil: null, since: b.since || today(), pendingKind: null, provider: "flow", currency: "CLP" });
  await grantClub(env, uid, b.name || cust.name);
  if (b.trialUsed) { await trialLog(env, uid, { status: "joined", joined: Date.now() }).catch(() => {}); await trackerRow(env, { email: b.email, status: "joined" }); }
  return back(true);
}

async function updateCard(env, req, url) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const b = await getBill(env, me.uid);
  if (!b.customerId || !b.subscriptionId || !sameEnv(env, b)) return json({ error: "No membership found." }, 400, req);
  await patch(env, `billing/${me.uid}`, { pendingKind: "card" });
  const reg = await flow(env, "POST", "/customer/register", { customerId: b.customerId, url_return: url.origin + "/api/card-return" });
  return json({ url: reg.url + "?token=" + reg.token }, 200, req);
}

// ---------- Notion: Noa's "Free Trial Tracker" (inside "Reto 14 Días — Free Trials") ----------
const TRACKER = "09ba72fbc0844ec09b6b239f0b4d0d1f";
const ESTADO = { trial: "En trial", joined: "Se unió 🎉", "trial-ended": "No se unió" };
async function notion(env, method, path, body) {
  const r = await fetch("https://api.notion.com/v1" + path, { method, headers: { authorization: "Bearer " + env.NOTION_TOKEN, "notion-version": "2022-06-28", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("Notion: " + (d.message || r.status));
  return d;
}
const niceDay = (d) => { try { return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }); } catch { return d; } };
async function trackerRow(env, t) {        // t: {name,email,start(date),until,status,note?}; never throws (Notion is a nice-to-have)
  if (!env.NOTION_TOKEN || !t.email) return;
  try {
    const q = await notion(env, "POST", `/databases/${TRACKER}/query`, { filter: { property: "Email", email: { equals: t.email } }, page_size: 1 });
    const row = q.results && q.results[0];
    const props = {};
    if (ESTADO[t.status]) props.Estado = { select: { name: ESTADO[t.status] } };
    if (!row) {
      if (t.status !== "trial") return;      // only Hibi trials start rows; never touch Noa's manual ones otherwise
      props.Nombre = { title: [{ text: { content: t.name || t.email } }] };
      props.Email = { email: t.email };
      props.Inicio = { date: { start: t.start } };
      props.Notas = { rich_text: [{ text: { content: `Started on Hibi (free 2-week trial, no card). Ends ${niceDay(t.until)}.` } }] };
      await notion(env, "POST", "/pages", { parent: { database_id: TRACKER }, properties: props });
    } else {
      const notes = ((row.properties.Notas && row.properties.Notas.rich_text) || []).map((x) => x.plain_text).join("");
      if (!/Started on Hibi/.test(notes)) return;   // a row Noa made by hand: leave it alone
      if (t.note) props.Notas = { rich_text: [{ text: { content: (notes + " " + t.note).trim().slice(0, 1900) } }] };
      if (Object.keys(props).length) await notion(env, "PATCH", `/pages/${row.id}`, { properties: props });
    }
  } catch (e) { console.log("notion", e.message); }
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
  await trackerRow(env, { name: me.name, email: me.email, start: today(), until, status: "trial" });
  return json({ ok: true, until }, 200, req);
}

async function cancel(env, req) {
  const me = await whoIs(env, req); if (!me) return json({ error: "Please sign in again." }, 401, req);
  const b = await getBill(env, me.uid);
  if (b.provider === "mp" && b.mpId && b.mpEnv === mpEnv(env)) {   // stops future charges; access stays until the paid time ends
    await mp(env, "PUT", `/preapproval/${b.mpId}`, { status: "cancelled" });
    await saveBill(env, me.uid, { status: "canceling" });
    return json({ ok: true, paidThrough: b.paidThrough }, 200, req);
  }
  if (b.provider === "paypal" && b.ppSubId && b.ppEnv === ppEnv(env)) {   // PayPal stops future payments; access stays until the paid time ends
    await pp(env, "POST", `/v1/billing/subscriptions/${b.ppSubId}/cancel`, { reason: "Cancelled on Hibi" });
    await saveBill(env, me.uid, { status: "canceling" });
    return json({ ok: true, paidThrough: b.paidThrough }, 200, req);
  }
  if (!b.subscriptionId || !sameEnv(env, b)) return json({ error: "No active membership found." }, 400, req);
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
          await trackerRow(env, { email: b.email, status, note: kept ? "Kept in the club by Noa." : "" });
          out.push({ uid, status });
        }
        continue;
      }
      if (b.provider !== "paypal" && b.subscriptionId && !sameEnv(env, b)) {   // a Flow sandbox test from before going live: clear it so no fake membership shows
        if (b.status !== "none") { await saveBill(env, uid, { status: "none", subscriptionId: null, card: null, paidThrough: null }); out.push({ uid, status: "test cleared" }); }
        continue;
      }
      if (b.provider === "mp" && b.mpId) { const st = await mpNightly(env, uid, b); if (st) out.push({ uid, status: st }); continue; }
      if (b.provider === "paypal" && b.ppSubId) { const st = await ppNightly(env, uid, b); if (st) out.push({ uid, status: st }); continue; }
      if (!b.subscriptionId || !sameEnv(env, b)) continue;
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
  if (env.MP_ACCESS_TOKEN) { r.mercadopago = mpEnv(env); try { await mp(env, "GET", "/users/me"); r.mercadopagoApi = "ok"; } catch (e) { r.mercadopagoApi = String(e.message).slice(0, 120); r.ok = false; } } else r.mercadopago = "not set up";
  if (env.PAYPAL_CLIENT_ID) { r.paypal = ppEnv(env); try { await pp(env, "GET", "/v1/catalogs/products?page_size=1"); r.paypalApi = "ok"; } catch (e) { r.paypalApi = String(e.message).slice(0, 120); r.ok = false; } } else r.paypal = "not set up";
  if (env.NOTION_TOKEN) { try { await notion(env, "GET", `/databases/${TRACKER}`); r.notion = "ok"; } catch (e) { r.notion = String(e.message).slice(0, 120); } } else r.notion = "not set up";
  try { const er = plain(await fs(env, "GET", "billingConfig/errors")); if (er && er.list) r.recentErrors = JSON.parse(er.list); } catch (e) {}
  try { await fs(env, "GET", "roles?pageSize=1"); r.database = "ok"; } catch (e) { r.database = String(e.message).slice(0, 120); r.ok = false; }
  return r;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors(req) });
    try {
      switch (url.pathname) {
        case "/robots.txt": return new Response("User-agent: *\nAllow: /api/health\nAllow: /api/flow-callback\nDisallow: /\n");
        case "/api/health": return json(await health(env), 200, req);
        case "/api/subscribe": return await subscribe(env, req, url);
        case "/api/card-return": return await cardReturn(env, req, url);
        case "/api/cancel": return await cancel(env, req);
        case "/api/update-card": return await updateCard(env, req, url);
        case "/api/trial": return await startTrial(env, req);
        case "/api/my-price": return await myPrice(env, req);
        case "/api/paypal-return": return await ppReturn(env, req, url);
        case "/api/mp-return": return await mpReturn(env, req, url);
        case "/api/flow-callback": await nightly(env); return new Response("ok");
        case "/api/nightly": {
          const me = await whoIs(env, req); if (!me || me.uid !== TEACHER) return json({ error: "Only Noa can do this." }, 403, req);
          return json(await nightly(env), 200, req);
        }
        default: return new Response("Hibi pay helper", { status: 404 });
      }
    } catch (e) {
      console.log("error", url.pathname, e.message);
      // keep the last few errors (no personal data: just where and Flow/PayPal's message) so Claude can read them in /api/health
      try { const cur = plain(await fs(env, "GET", "billingConfig/errors")) || {}; const list = JSON.parse(cur.list || "[]");
        list.unshift({ at: new Date().toISOString(), where: url.pathname, msg: String(e.message).replace(/[\w.+-]+@[\w.-]+/g, "<email>").slice(0, 160) });
        await patch(env, "billingConfig/errors", { list: JSON.stringify(list.slice(0, 5)) }); } catch (er) {}
      if (url.pathname === "/api/card-return") return Response.redirect(SITE + "?membership=fail#club", 303);
      return json({ error: "Something went wrong with the payment helper. Please try again, or message Noa." , detail: String(e.message).slice(0, 200) }, 500, req);
    }
  },
  async scheduled(event, env, ctx) { ctx.waitUntil(nightly(env)); },
};
