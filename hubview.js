/* Shared hub maths + the read-only copy a private student sees ("hub-view").
   Used by private-students.html (Private students) and members.html (when linking a student). */
export const COUNTS = new Set(["Present", "Late cancellation", "Absent"]);
export const STD_PRICE = { 12: 100000, 36: 264000, 72: 480000 };
export const MES = { enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12 };
export const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
export const addDays = (iso, n) => { const [y, m, d] = iso.split("-").map(Number); const t = new Date(y, m - 1, d + n); return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0"); };
export const days = (a, b) => Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 864e5);

export function packClasses(s, p) { return (s.classes || []).filter(c => c.kind !== "note" && c.pack === p.id); }
export function packStats(s, p) {
  const cl = packClasses(s, p).filter(c => COUNTS.has(c.att || "Present"));
  const used = p.unit === "credits" ? cl.reduce((n, c) => n + (+c.credits || 0), 0) : cl.length;
  const size = p.size || 0, left = size ? size - used : null;
  const first = cl.map(c => c.date).filter(Boolean).sort()[0] || "";
  const pri = cl.length ? cl.filter(c => c.hour === "Priority").length > cl.length / 2 : /priority/i.test(p.label || "");
  const per = p.unit === "credits" ? (pri ? 4 : 3) : 1;
  return { done: cl.length, used, size, left, first, per, classesLeft: left == null ? null : Math.floor(Math.max(0, left) / per), pri };
}
export function deadline(p, first) {
  if (p.deadlineISO) return p.deadlineISO;
  const m = /(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)/i.exec(p.deadline || ""); if (!m || !MES[m[2].toLowerCase()]) return "";
  const base = first || p.created || today(); const y = +base.slice(0, 4); const mo = MES[m[2].toLowerCase()];
  let iso = y + "-" + String(mo).padStart(2, "0") + "-" + String(+m[1]).padStart(2, "0");
  if (iso < base) iso = (y + 1) + iso.slice(4);
  return iso;
}
export function curPack(s) { const ps = (s.packs || []).filter(p => !p.archived); return ps[ps.length - 1] || null; }
export function lastClass(s) { return (s.classes || []).filter(c => c.kind !== "note" && c.date && COUNTS.has(c.att || "Present")).map(c => c.date).sort().pop() || ""; }

export function instAt(p, st) { if (p.size === 36) return st.pri ? 5 : 7; if (p.size === 72) return st.pri ? 9 : 12; return null; }
/* What the student sees: no private notes, no boleta, no email, no "about them".
   meta (optional) = Noa's t-hubmeta: next class from his calendar + practice tips. */
/* the websites Noa uses in class (shown to the student on My coaching and to Noa on their page) */
/* which sites a student uses: Noa's explicit list (s.res), or else what recent class notes mention */
const recentText = s => ((s && s.classes) || []).filter(c => c && c.kind !== "note").slice(-12).map(c => (c.topics || "") + " " + (c.homework || "")).join(" | ").toLowerCase();
export function resDetect(s) {
  const t = recentText(s), out = [];
  if (/fabulang/.test(t)) out.push("fabulang");
  if (/chatter ?box/.test(t)) out.push("chatterbox");
  if (/simplified/.test(t) || (/culips/.test(t) && !/chatter ?box/.test(t))) out.push("simplified");
  if (/ideas\.?\s?ted|ted ideas|ideas\.ted/.test(t)) out.push("tedideas");
  if (/ted talk|\bted\.com\/talks/.test(t)) out.push("tedtalks");
  if (/slow english/.test(t) || (s && s.slowUrl)) out.push("slow");
  return out;
}
export function resKeys(s) { return Array.isArray(s && s.res) ? s.res.slice() : resDetect(s); }
export function fabLevel(s) {
  const lv = x => { const m = String(x || "").match(/\b([abc][12])\b/i); return m ? m[1].toLowerCase() : ""; };
  if (s && s.fabLevel) return lv(s.fabLevel);
  const said = [...recentText(s).matchAll(/fabulang\s*\(?\s*([abc][12])\b/g)].pop();
  return said ? said[1] : lv(s && (s.cefr || s.level));
}
export const RES_ALL = s => {
  const lv = fabLevel(s);
  return [
    { k: "fabulang", ico: "📖", name: "Fabulang", note: lv ? "Stories at your level (" + lv.toUpperCase() + ")" : "Short stories to read and listen to", url: "https://www.fabulang.com/en/en" + (lv ? "/" + lv : "") },
    { k: "chatterbox", ico: "🎧", name: "Culips · Chatterbox", note: "Natural conversations", url: "https://esl.culips.com/category/chatter-box/" },
    { k: "simplified", ico: "🎧", name: "Culips · Simplified Speech", note: "Clear, slower English", url: "https://esl.culips.com/category/simplified-speech/" },
    { k: "tedideas", ico: "💡", name: "TED Ideas", note: "Short articles", url: "https://ideas.ted.com/" },
    { k: "tedtalks", ico: "🎤", name: "TED Talks", note: "Talks with subtitles", url: "https://www.ted.com/talks" },
    { k: "slow", ico: "🐢", name: "Slow English Podcast", note: s && s.slowUrl ? "Your playlist" : "Pick the playlist for your level", url: (s && s.slowUrl) || "https://www.youtube.com/@Slow_English_Podcast/playlists" }
  ];
};
export function resFor(s) { const k = new Set(resKeys(s)); return RES_ALL(s).filter(r => k.has(r.k)); }
/* clock changes: Chile and a foreign student's own country (so Noa remembers to talk about the class time) */
export const NOA_TZ = "America/Santiago";
export function tzOffset(tz, t) {
  try { const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(new Date(t)).find(x => x.type === "timeZoneName").value;
    const m = p.match(/GMT([+-])(\d{1,2}):?(\d{2})?/); return m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +(m[3] || 0)) : 0; } catch (e) { return 0; }
}
export function tzChanges(tz, from, daysAhead) {
  const out = [], start = new Date(from + "T12:00:00Z").getTime();
  let prev = tzOffset(tz, start);
  for (let i = 1; i <= daysAhead; i++) { const t = start + i * 864e5, o = tzOffset(tz, t); if (o !== prev) { out.push({ date: new Date(t).toISOString().slice(0, 10), from: prev, to: o }); prev = o; } }
  return out;
}
const hm = m => { const a = Math.abs(m), h = Math.floor(a / 60), r = a % 60; return h + (r ? ":" + String(r).padStart(2, "0") : "") + (h === 1 && !r ? " hour" : " hours"); };
const gap = m => m === 0 ? "the same time as Chile" : hm(m) + (m > 0 ? " ahead of Chile" : " behind Chile");
/* reminders for one student: changes from `back` days ago to `ahead` days from `today` */
export function tzReminders(s, todayIso, ahead, back) {
  const tz = s && s.tz; if (!tz || tz === NOA_TZ) return [];
  const from = new Date(new Date(todayIso + "T12:00:00Z").getTime() - (back || 0) * 864e5).toISOString().slice(0, 10), n = (ahead || 21) + (back || 0);
  const ev = tzChanges(NOA_TZ, from, n).map(c => ({ ...c, where: "Chile" })).concat(tzChanges(tz, from, n).map(c => ({ ...c, where: s.country || tz.split("/").pop().replace(/_/g, " ") })));
  const seen = new Set(), out = [];
  ev.sort((a, b) => a.date.localeCompare(b.date)).forEach(c => {
    const t = new Date(c.date + "T12:00:00Z").getTime(), before = tzOffset(tz, t - 864e5) - tzOffset(NOA_TZ, t - 864e5), after = tzOffset(tz, t + 2 * 864e5) - tzOffset(NOA_TZ, t + 2 * 864e5);
    const k = c.date + c.where; if (seen.has(k)) return; seen.add(k);
    out.push({ date: c.date, where: c.where, before, after, same: before === after,
      text: `Clocks change in ${c.where} on ${new Date(c.date + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" })}` + (before === after ? "" : `: ${(s.name || "").split(" ")[0]} goes from ${gap(before)} to ${gap(after)}. Check your class time with ${(s.name || "").split(" ")[0]}.`) });
  });
  return out.filter(x => !x.same);
}
export function makeView(s, meta) {
  meta = meta || {};
  const cp = curPack(s), cst = cp ? packStats(s, cp) : null, now = Date.now();
  const due = cp && cst && s.kind !== "trueque" && cp.size ? { label: cp.label, half: cp.paid === "half", pending: cp.paid === "pending", instAt: cp.paid === "half" ? instAt(cp, cst) : null, nextNo: cst.done + 1, left: cst.left, classesLeft: cst.classesLeft, unit: cp.unit } : null;
  const up = (meta.upcoming || []).filter(u => u && u.student === s.id && Date.parse(u.start) > now - 36e5).sort((a, b) => Date.parse(a.start) - Date.parse(b.start))[0];
  const packs = (s.packs || []).map(p => {
    const st = packStats(s, p);
    return { id: p.id, label: p.label, size: p.size || null, unit: p.unit, used: st.used, done: st.done, left: st.left, deadline: deadline(p, st.first), paid: p.paid, current: !p.archived, color: p.color || "" };
  });
  return {
    v: 1, name: s.name, level: s.cefr || s.level || "", schedule: s.schedule || "", objective: s.objective || "", kind: s.kind || "pack",
    packs,
    classes: (s.classes || []).filter(c => c.kind !== "note").map(c => ({ date: c.date || "", dateText: c.dateText || "", topics: c.topics || "", homework: c.homework || "", att: c.att || "", hour: c.hour || "", credits: c.credits ?? null, pack: c.pack || "" })),
    payments: (s.payments || []).map(p => ({ date: p.date || "", what: p.what || "", amount: p.amount || "" })),
    focus: s.focus || "", recap: s.recap || null, resources: resFor(s), tz: s.tz || "", country: s.country || "", next: up ? up.start : "", due,
    club: s.uid && (meta.clubUids || []).includes(s.uid) ? (meta.clubFeed || null) : null,
    reports: (s.reports || []).filter(r => r && r.id).slice(-12).map(r => ({ id: r.id, from: r.from || "", to: r.to || "", sessions: r.sessions || 0, snapshot: r.snapshot || "", clicking: r.clicking || [], topics: r.topics || [], patterns: r.patterns || [], focus: r.focus || [], resource: r.resource || null, recordings: r.recordings || [], month: r.month || "", closing: r.closing || "", at: r.at || "" })),
    guides: (s.guides || []).filter(g => g && g.url).map(g => ({ title: g.title || "Guide", url: g.url, date: g.date || "" })),
    tips: (meta.recs || []).filter(r => r && r.hub === s.id && !r.done).slice(-5).map(r => ({ title: r.title || "", mod: r.mod || "", stage: r.stage || null, page: r.page || "", pack: r.pack || "", why: r.why || "", date: r.date || "" })),
    words: (s.words || []).map((w, i) => ({ w: w.w, tr: w.tr || "", ex: w.ex || "", i })),
    updated: Date.now()
  };
}

/* ---------- linking Hibi accounts to hub students ---------- */
export const normEmail = e => { e = String(e || "").trim().toLowerCase(); const [u, d] = e.split("@"); if (!d) return e; return (d === "gmail.com" || d === "googlemail.com" ? u.split("+")[0].replace(/\./g, "") + "@gmail.com" : e); };
export const normName = n => String(n || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
export const BOTH_DEFAULT = ["laura", "felipe-torres", "belen"];
/* accounts: [{uid,name,email}], roles: {uid:{...}} → {sure:[{uid,hub}], maybe:[{uid,hub,why}]} */
export function matchAccounts(students, accounts, roles) {
  const linkedHubs = new Set(Object.values(roles).map(r => r && r.hub).filter(Boolean));
  const free = students.filter(s => !linkedHubs.has(s.id) && s.status !== "inactive");
  const sure = [], maybe = [];
  accounts.forEach(a => {
    if (!a || !a.uid || (roles[a.uid] && roles[a.uid].hub) || normEmail(a.email) === "learnwithnoa@gmail.com") return;
    const em = normEmail(a.email), nm = normName(a.name);
    const byEmail = free.filter(s => [s.email].concat(s.emails || []).filter(Boolean).some(e => normEmail(e) === em));
    if (byEmail.length === 1) { sure.push({ uid: a.uid, hub: byEmail[0].id, why: "email" }); return; }
    const full = free.filter(s => { const sn = normName(s.name); return sn && nm && (sn === nm || (sn.split(" ").length > 1 && nm.includes(sn)) || (nm.split(" ").length > 1 && sn.includes(nm))); });
    if (full.length === 1) { sure.push({ uid: a.uid, hub: full[0].id, why: "name" }); return; }
    const first = nm.split(" ")[0]; const f1 = first ? free.filter(s => normName(s.name).split(" ")[0] === first) : [];
    if (f1.length >= 1) f1.forEach(s => maybe.push({ uid: a.uid, hub: s.id, why: "first name" }));
  });
  // never two accounts on the same student automatically
  const seen = {}; sure.forEach(x => seen[x.hub] = (seen[x.hub] || 0) + 1);
  return { sure: sure.filter(x => seen[x.hub] === 1), maybe: maybe.concat(sure.filter(x => seen[x.hub] > 1)) };
}
export function roleFor(hubId, old) {
  old = old || {};
  const club = old.club === true ? true : old.club === false ? false : BOTH_DEFAULT.includes(hubId);
  return { club, private: true, hub: hubId };
}
