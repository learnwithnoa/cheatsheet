/* Shared hub maths + the read-only copy a private student sees ("hub-view").
   Used by hub.html (teacher) and teacher.html (when linking a student). */
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

/* What the student sees: no private notes, no boleta, no email, no "about them". */
export function makeView(s) {
  const packs = (s.packs || []).map(p => {
    const st = packStats(s, p);
    return { id: p.id, label: p.label, size: p.size || null, unit: p.unit, used: st.used, done: st.done, left: st.left, deadline: deadline(p, st.first), paid: p.paid, current: !p.archived, color: p.color || "" };
  });
  return {
    v: 1, name: s.name, level: s.level || "", schedule: s.schedule || "", objective: s.objective || "", kind: s.kind || "pack",
    packs,
    classes: (s.classes || []).filter(c => c.kind !== "note").map(c => ({ date: c.date || "", dateText: c.dateText || "", topics: c.topics || "", homework: c.homework || "", att: c.att || "", hour: c.hour || "", credits: c.credits ?? null, pack: c.pack || "" })),
    payments: (s.payments || []).map(p => ({ date: p.date || "", what: p.what || "", amount: p.amount || "" })),
    words: (s.words || []).map((w, i) => ({ w: w.w, tr: w.tr || "", ex: w.ex || "", i })),
    updated: Date.now()
  };
}
