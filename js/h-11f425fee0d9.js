/* 🖨️ Print or save as PDF (Nov 23 2026, for students who like paper, like Laura).
   On a module page (Practice → Grammar, and English for Specific Purposes), one button prints the WHOLE module:
   the 📖 Learn it lesson (Basics + Advanced), every stage with its rule and all its sentences (with a/b/c/d options),
   the final test and an answer key at the end. Built from the same lesson + question banks Hibi uses, so new modules get it automatically.
   Not for pronunciation modules (NOPRINT), word packs, your words or the practice interview. */
(function(){
  const NOPRINT = ["ed"];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const en = x => (x && x.en != null ? x.en : x) || "", es = x => (x && x.es) || "";
  const ok = it => (it.a || []).filter(a => !String(a).startsWith("~"));
  const also = it => (it.a || []).filter(a => String(a).startsWith("~")).map(a => a.slice(1));
  const shuf = (arr, seed) => { const a = arr.slice(); let h = 0; for (const c of String(seed)) h = (h * 31 + c.charCodeAt(0)) >>> 0; for (let i = a.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const blank = q => { const s = esc(q); return s.includes("___") ? s.replace("___", '<span class="bl"></span>') : s + ' <span class="bl"></span>'; };

  function lessonBlock(b) {
    let h = `<div class="lb${b.key ? " key" : ""}"><h4>${en(b.h)}${b.stage ? ` <span class="tag">Stage ${b.stage}</span>` : ""}</h4>`;
    if (b.p) h += `<p>${en(b.p)}</p>${es(b.p) ? `<p class="es">${es(b.p)}</p>` : ""}`;
    if (b.table) h += `<table class="lt">${b.table.map(r => `<tr><th>${en(r[0])}</th><td>${en(r[1])}</td><td>${en(r[2])}</td></tr>`).join("")}</table>`;
    if (b.note) h += `<p class="note">✏️ ${en(b.note)}</p>`;
    if (b.ex) h += `<ul class="ex">${b.ex.map(e => `<li><b>${esc(e[0])}</b>${e[1] ? `<span>${esc(e[1])}</span>` : ""}</li>`).join("")}</ul>`;
    if (b.mis) h += `<ul class="mis">${b.mis.map(m => `<li><s>${esc(m[0])}</s> → <b>${esc(m[1])}</b> <span>${esc(en(m[2]))}</span></li>`).join("")}</ul>`;
    if (b.quiz) h += `<ol class="qq">${b.quiz.map(q => `<li>${blank(q[0])}</li>`).join("")}</ol><p class="small">Answers: ${b.quiz.map((q, i) => `${i + 1}. ${esc(q[1])}`).join(" · ")}</p>`;
    return h + "</div>";
  }
  function build(md) {
    const L = (window.PS_LESSONS || {})[md.id];
    const stages = md.stages || [], test = Array.isArray(md.test) ? md.test : [];
    const nEx = stages.reduce((n, s) => n + (s.items || []).length, 0);
    let key = "";
    const qline = it => {
      if (it.mco) return `<li class="mc"><div class="q">${esc(it.q).replace(/\s*___\s*$/, "").replace("___", "…")}</div><div class="mco">${shuf([ok(it)[0], ...(it.o || [])], it.id).map((o, k) => `<span>◯ ${"abcd"[k]}) ${esc(o)}</span>`).join("")}</div></li>`;
      const opts = shuf([ok(it)[0], ...(it.o || [])], it.id);
      return `<li><div class="q">${blank(it.q)}</div>${(it.o || []).length ? `<div class="opts">${opts.map((o, k) => `<span>${"abcd"[k]}) ${esc(o)}</span>`).join("")}</div>` : ""}</li>`;
    };
    const stageHtml = stages.map(st => {
      const items = st.items || [];
      let h = `<section class="stage"><div class="sh"><span class="sn">${st.adv ? "⭐" : st.n}</span><div><h3>${st.adv ? "Advanced · " : "Stage " + st.n + " · "}${esc(st.t)}</h3><p class="sub">${esc(st.sub || "")}</p></div></div>
        ${st.why ? `<div class="rule"><b>Remember:</b> ${esc(st.why)}${st.es ? `<br><span class="es">${esc(st.es)}</span>` : ""}</div>` : ""}`;
      if (st.stories && st.stories.length) h += st.stories.map(s => `<h4 class="story">📖 ${esc(s.title)}</h4><ol class="qs" start="${items.indexOf(s.items[0]) + 1}">${s.items.map(qline).join("")}</ol>`).join("");
      else h += `<ol class="qs">${items.map(qline).join("")}</ol>`;
      key += `<div class="kb"><h4>${st.adv ? "⭐ Advanced" : "Stage " + st.n}</h4><ol>${items.map(it => `<li><b>${esc(ok(it).join(" / "))}</b>${also(it).length ? ` <i>(also OK: ${esc(also(it).join(", "))})</i>` : ""}</li>`).join("")}</ol></div>`;
      return h + "</section>";
    }).join("");
    if (test.length) key += `<div class="kb"><h4>🏁 Final test</h4><ol>${test.map(t => `<li><b>${esc(ok(t).join(" / "))}</b></li>`).join("")}</ol></div>`;
    const css = `@page{size:A4;margin:15mm 14mm}
:root{--ink:#0F2341;--muted:#52667F;--line:#D6E3F2;--royal:#1D4ED8;--bright:#1E8CF0;--sky:#E6F1FD;--green:#1F9D5C;--gsoft:#E3F7EB;--red:#C2413A;--sun:#FFF4D6}
*{box-sizing:border-box}html,body{background:#fff}body{font-family:Lexend,system-ui,sans-serif;color:var(--ink);font-size:10.5pt;line-height:1.45;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.cover{border-radius:22px;padding:22px 26px;background:linear-gradient(135deg,#E9F3FF,#F3FBF6);border:1.5px solid var(--line);display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:16px}
.brand{font-weight:700;font-size:15pt;color:var(--bright)}.brand small{font-family:'Space Mono',monospace;font-size:7.5pt;color:var(--muted);letter-spacing:.08em;margin-left:6px}
h1{font-size:28pt;margin:6px 0 2px;line-height:1.05}.lede{color:var(--muted);margin:4px 0 0}
.who{min-width:190px;font-size:9.5pt;color:var(--muted)}.who div{border-bottom:1.5px dashed #AFC4DD;padding:14px 0 3px}
.toc{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}.toc span{font-size:8.5pt;padding:3px 9px;border-radius:99px;background:#fff;border:1.2px solid var(--line)}
h2{font-size:16pt;margin:22px 0 10px;display:flex;align-items:center;gap:8px}h2 .pill{font-family:'Space Mono',monospace;font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;background:var(--sky);color:var(--royal);padding:3px 9px;border-radius:99px}
.lb{border:1.5px solid var(--line);border-radius:16px;padding:10px 14px;margin:0 0 9px;break-inside:avoid}.lb.key{background:var(--sun);border-color:#F1D98A}
.lb h4{margin:0 0 4px;font-size:11.5pt}.tag{font-family:'Space Mono',monospace;font-size:7pt;color:var(--royal);background:var(--sky);border-radius:99px;padding:2px 7px;vertical-align:middle}
.lb p{margin:2px 0}.es{color:var(--muted);font-size:9pt}.note{background:#F6F9FE;border-radius:10px;padding:5px 9px;font-size:9.5pt}
.lt{border-collapse:collapse;width:100%;margin:6px 0;font-size:10pt}.lt th{width:26px;color:var(--royal)}.lt td,.lt th{padding:5px 8px;border-top:1px solid var(--line);text-align:left}
.ex,.mis{margin:4px 0 0;padding-left:18px}.ex li span{display:block;color:var(--muted);font-size:9pt}.mis s{color:var(--red)}.mis b{color:var(--green)}.mis span{color:var(--muted);font-size:9pt}
.qq{margin:4px 0;padding-left:20px}.small{font-size:8.5pt;color:var(--muted);margin-top:4px}
.stage{break-before:page}.first{break-before:auto}
.sh{display:flex;gap:12px;align-items:center;margin-bottom:8px}.sn{width:38px;height:38px;border-radius:12px;background:linear-gradient(180deg,#5FB4FF,#1D4ED8);color:#fff;font-weight:700;font-size:15pt;display:flex;align-items:center;justify-content:center;flex:none}
.sh h3{margin:0;font-size:14pt}.sub{margin:0;color:var(--muted);font-size:9.5pt}
.rule{background:var(--gsoft);border-radius:14px;padding:8px 12px;margin-bottom:10px;font-size:10pt}
.qs{padding-left:34px;margin:0}.qs li{padding:6px 0 7px;border-bottom:1px dashed var(--line);break-inside:avoid}.qs li::marker{font-family:'Space Mono',monospace;font-size:9pt;color:var(--bright)}
.q{font-size:11pt}.bl{display:inline-block;min-width:110px;border-bottom:1.6px solid var(--ink);margin:0 3px;transform:translateY(-3px)}
.opts{display:flex;gap:16px;flex-wrap:wrap;font-size:9pt;color:var(--muted);margin-top:2px}.mco{display:grid;gap:3px;margin-top:4px;font-size:10pt}
.story{margin:10px 0 4px;font-size:11pt;color:var(--royal)}
.keyp{break-before:page}.kgrid{columns:3;column-gap:14px}.kb{break-inside:avoid;margin-bottom:10px;border:1.3px solid var(--line);border-radius:12px;padding:7px 10px}.kb h4{margin:0 0 3px;font-size:10pt;color:var(--green)}.kb ol{margin:0;padding-left:20px;font-size:8.5pt}.kb i{color:var(--muted)}
.foot{margin-top:18px;text-align:center;color:var(--muted);font-size:8.5pt}
.noprint{position:sticky;top:0;background:#fff;padding:10px 0;margin-bottom:10px;border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:center;font-size:11pt}
.noprint button{font:700 12pt Lexend,sans-serif;padding:8px 16px;border-radius:99px;border:0;background:#1E8CF0;color:#fff;cursor:pointer}
@media screen{body{max-width:820px;margin:0 auto;padding:14px}}@media print{.noprint{display:none}}`;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(md.name)} · Hibi</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&family=Space+Mono:wght@700&display=swap"><style>${css}</style></head><body>
<div class="noprint"><button type="button" onclick="print()">🖨️ Print or save as PDF</button><span>In the print window, choose your printer or <b>Save as PDF</b>.</span></div>
<div class="cover"><div><div class="brand">Hibi 日々<small>DAY BY DAY</small></div><h1>${esc(md.name)} ${esc(md.ico || "")}</h1>
<div class="toc">${L ? "<span>📖 Learn it first</span>" : ""}${L && L.adv ? "<span>⭐ Advanced lesson</span>" : ""}<span>✍️ ${stages.length} stages · ${nEx} exercises</span>${test.length ? "<span>🏁 Final test</span>" : ""}<span>✅ Answer key</span></div></div>
<div class="who"><div>Name</div><div>Date</div></div></div>
${L ? `<h2>📖 Learn it first <span class="pill">Basics</span></h2>${(L.basics || []).map(lessonBlock).join("")}` : ""}
${L && L.adv ? `<h2>⭐ Learn it first <span class="pill">Advanced</span></h2>${L.adv.map(lessonBlock).join("")}` : ""}
<section class="stage${L ? "" : " first"}"><h2>✍️ Practice</h2><p class="lede" style="margin-top:-6px">Write the answer on the line. The options under each sentence help if you get stuck. For ◯ questions, circle the best answer.</p></section>
${stageHtml.replace('<section class="stage">', '<section class="stage first">')}
${test.length ? `<section class="stage"><div class="sh"><span class="sn">🏁</span><div><h3>Final test</h3><p class="sub">No options this time. Just write it!</p></div></div><ol class="qs">${test.map(t => `<li><div class="q">${blank(t.q)}</div></li>`).join("")}</ol></section>` : ""}
<section class="keyp"><h2>✅ Answer key</h2><div class="kgrid">${key}</div><p class="foot">Made with 💙 on Hibi · hibi.cl · Practice it online for instant feedback and buddy prizes.</p></section>
</body></html>`;
  }
  window.__printModuleHTML = id => { const md = window.__prModFull && window.__prModFull(); return md && (!id || md.id === id) ? build(md) : ""; };

  function doPrint() {
    const md = window.__prModFull && window.__prModFull(); if (!md) return;
    const html = build(md);
    let w = null; try { w = window.open("", "_blank"); } catch (e) {}
    if (w) {
      w.document.open(); w.document.write(html); w.document.close();
      const go = () => { try { w.focus(); w.print(); } catch (e) {} };
      if (w.document.fonts && w.document.fonts.ready) w.document.fonts.ready.then(() => setTimeout(go, 300)); else setTimeout(go, 800);
      return;
    }
    /* pop-ups blocked: print from a hidden frame instead */
    const f = document.createElement("iframe"); f.setAttribute("aria-hidden", "true"); f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(f); const d = f.contentWindow.document; d.open(); d.write(html); d.close();
    setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(() => f.remove(), 60000); }, 900);
  }

  function place() {
    const pan = document.querySelector('#v-quiz .pr-panel[data-pp="ps"]'); if (!pan) return;
    const h = pan.querySelector("#psTitle"); if (!h) return;
    let head = pan.querySelector(".ps-head");
    if (!head) { head = document.createElement("div"); head.className = "ps-head"; h.parentNode.insertBefore(head, h); head.appendChild(h); }
    let b = head.querySelector(".prt-btn");
    if (!b) { b = document.createElement("button"); b.type = "button"; b.className = "prt-btn"; head.appendChild(b); }
    const md = window.__prModFull && window.__prModFull();
    const on = !!md && !NOPRINT.includes(md.id);
    b.hidden = !on; if (!on) return;
    const n = (md.stages || []).length, lesson = !!(window.PS_LESSONS || {})[md.id];
    b.innerHTML = `<span class="pi" aria-hidden="true">🖨️</span><span class="pt">Print or save as PDF<small>${lesson ? "Lesson + " : ""}all ${n} stages + answers</small></span>`;
    b.title = "Print the whole module: " + (lesson ? "the lesson, " : "") + "every stage and the answers";
  }
  document.addEventListener("click", e => { if (e.target.closest(".prt-btn")) { e.preventDefault(); doPrint(); } });
  /* the module page is re-drawn when you open a module: keep the button in step */
  const obs = () => { const a = document.getElementById("psArea"); if (!a) return setTimeout(obs, 500); new MutationObserver(place).observe(a, { childList: true }); place(); };
  obs();
})();
