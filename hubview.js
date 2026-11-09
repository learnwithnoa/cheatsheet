/* Shared hub maths + the read-only copy a private student sees ("hub-view").
   Used by coaching.html (Private students) and members.html (when linking a student). */
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
    v: 1, name: s.name, level: s.level || "", schedule: s.schedule || "", objective: s.objective || "", kind: s.kind || "pack",
    packs,
    classes: (s.classes || []).filter(c => c.kind !== "note").map(c => ({ date: c.date || "", dateText: c.dateText || "", topics: c.topics || "", homework: c.homework || "", att: c.att || "", hour: c.hour || "", credits: c.credits ?? null, pack: c.pack || "" })),
    payments: (s.payments || []).map(p => ({ date: p.date || "", what: p.what || "", amount: p.amount || "" })),
    focus: s.focus || "", next: up ? up.start : "", due,
    guides: (s.guides || []).filter(g => g && g.url).map(g => ({ title: g.title || "Guide", url: g.url, date: g.date || "" })),
    tips: (meta.recs || []).filter(r => r && r.hub === s.id && !r.done).slice(-5).map(r => ({ title: r.title || "", mod: r.mod || "", stage: r.stage || null, page: r.page || "", why: r.why || "", date: r.date || "" })),
    words: (s.words || []).map((w, i) => ({ w: w.w, tr: w.tr || "", ex: w.ex || "", i })),
    updated: Date.now()
  };
}

/* ---------- linking Cheat Sheet accounts to hub students ---------- */
export const normEmail = e => { e = String(e || "").trim().toLowerCase(); const [u, d] = e.split("@"); if (!d) return e; return (d === "gmail.com" || d === "googlemail.com" ? u.split("+")[0].replace(/\./g, "") + "@gmail.com" : e); };
export const normName = n => String(n || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
export const BOTH_DEFAULT = ["laura", "felipe-torres"];
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
