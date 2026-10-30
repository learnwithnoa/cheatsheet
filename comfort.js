/* ===== Cheat Sheet · Reading & comfort settings =====
   Shared by the Cheat Sheet (index.html) and the teacher view (teacher.html).
   Settings live in localStorage "ncs-comfort" (synced to the student's account on the Cheat Sheet). */
(function () {
  "use strict";
  const KEY = "ncs-comfort";
  const DEF = { size: 1, font: "default", space: false, bionic: false, ruler: false, focus: false, calm: false, inshort: true, read: true };
  const root = document.documentElement;
  const isMain = !!document.getElementById("v-notes");
  let S = Object.assign({}, DEF);
  try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  if (S.font === "lexend") S.font = "default"; // Lexend is the default now

  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    try { window.__csOnSet && window.__csOnSet(KEY); } catch (e) {}
  }
  let toastT;
  function toast(t) {
    let el = $("csToast"); if (!el) { el = document.createElement("div"); el.id = "csToast"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite"); document.body.appendChild(el); }
    el.textContent = t; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2800);
  }

  /* ---------- fonts (loaded only when chosen) ---------- */
  const FONTS = {
    atkinson: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap",
    classic: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,800;0,900;1,600&display=swap"
  };
  function loadFont(f) {
    if (!FONTS[f] || document.querySelector('link[data-csfontlink="' + f + '"]')) return;
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = FONTS[f]; l.dataset.csfontlink = f; document.head.appendChild(l);
  }

  /* ---------- theme ---------- */
  const THEME_LIST = [["dark", "☾", "Dark"], ["light", "☀", "Light"], ["sepia", "📖", "Sepia"], ["unicorn", "🦄", "Unicorn"]];
  function curTheme() { return root.getAttribute("data-theme") || "dark"; }
  function sepiaFont() { if (curTheme() === "sepia" && !document.querySelector('link[data-csfontlink="literata"]')) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&display=swap"; l.dataset.csfontlink = "literata"; document.head.appendChild(l); } }
  function setTheme(t) {
    if (typeof window.csSetTheme === "function") window.csSetTheme(t);
    else { root.setAttribute("data-theme", t); try { localStorage.setItem("ncs-theme", t); } catch (e) {} }
    paintPanel(); sepiaFont();
    window.dispatchEvent(new Event("cs-theme"));
  }

  /* ---------- bionic reading ---------- */
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "BUTTON", "CODE", "KBD", "PRE", "SVG", "NOSCRIPT"]);
  const WORD = /[\p{L}\p{M}][\p{L}\p{M}'’-]*/gu;
  let bioObs = null, bioBusy = false;
  function boldLen(n) { return n <= 3 ? 1 : n <= 5 ? 2 : Math.ceil(n * 0.45); }
  function skipEl(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (SKIP.has(e.tagName) || e.isContentEditable || (e.classList && (e.classList.contains("bw") || e.classList.contains("no-bio") || e.classList.contains("mono")))) return true;
    }
    return false;
  }
  function bionicNode(tn) {
    const txt = tn.nodeValue; WORD.lastIndex = 0;
    if (!WORD.test(txt)) return; WORD.lastIndex = 0;
    const frag = document.createDocumentFragment(); let last = 0, m;
    while ((m = WORD.exec(txt))) {
      if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
      const w = m[0], k = boldLen([...w].length), chars = [...w];
      const span = document.createElement("span"); span.className = "bw";
      const b = document.createElement("b"); b.textContent = chars.slice(0, k).join("");
      span.appendChild(b); if (chars.length > k) span.appendChild(document.createTextNode(chars.slice(k).join("")));
      frag.appendChild(span); last = m.index + w.length;
    }
    if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    tn.parentNode.replaceChild(frag, tn);
  }
  function bionicIn(scope) {
    if (!scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.nodeValue.trim() && n.parentElement && !skipEl(n.parentElement)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const list = []; while (walker.nextNode()) list.push(walker.currentNode);
    list.forEach(bionicNode);
  }
  function bionicOff() {
    document.querySelectorAll("span.bw").forEach(s => { const p = s.parentNode; p.replaceChild(document.createTextNode(s.textContent), s); p.normalize && p.normalize(); });
  }
  function bionicScope() { return document.querySelector("main"); }
  function bionicRun() {
    if (bioBusy) return; bioBusy = true;
    if (bioObs) bioObs.disconnect();
    try { bionicIn(bionicScope()); } finally {
      bioBusy = false;
      if (S.bionic && bioObs) bioObs.observe(bionicScope(), { childList: true, subtree: true, characterData: true });
    }
  }
  let bioT = null;
  function applyBionic() {
    if (S.bionic) {
      if (!bioObs) bioObs = new MutationObserver(() => { clearTimeout(bioT); bioT = setTimeout(bionicRun, 60); });
      bionicRun();
    } else {
      if (bioObs) { bioObs.disconnect(); }
      bionicOff();
    }
    root.classList.toggle("cs-bionic", !!S.bionic);
  }

  /* ---------- reading ruler ---------- */
  let ruler = null, rulerY = -200;
  function moveRuler(y) { rulerY = y; if (ruler) ruler.style.top = (y - ruler.offsetHeight / 2) + "px"; }
  function onMove(e) { const t = e.touches ? e.touches[0] : e; if (t) moveRuler(t.clientY); }
  function applyRuler() {
    if (S.ruler) {
      if (!ruler) { ruler = document.createElement("div"); ruler.id = "csRuler"; ruler.setAttribute("aria-hidden", "true"); root.appendChild(ruler); }
      ruler.hidden = false; moveRuler(rulerY < 0 ? innerHeight / 2 : rulerY);
      addEventListener("mousemove", onMove, { passive: true }); addEventListener("touchmove", onMove, { passive: true }); addEventListener("touchstart", onMove, { passive: true });
    } else {
      if (ruler) ruler.hidden = true;
      removeEventListener("mousemove", onMove); removeEventListener("touchmove", onMove); removeEventListener("touchstart", onMove);
    }
  }

  /* ---------- focus mode ---------- */
  // the teacher view keeps its own focus setting, so focus mode on the Cheat Sheet doesn't hide the student list
  let tFocus = false; try { tFocus = localStorage.getItem("cs-tfocus") === "1"; } catch (e) {}
  const focusOn = () => isMain ? !!S.focus : tFocus;
  function setFocus(v) { if (isMain) { S.focus = v; save(); } else { tFocus = v; try { localStorage.setItem("cs-tfocus", v ? "1" : "0"); } catch (e) {} } }
  function applyFocus() {
    const on = focusOn();
    root.classList.toggle("cs-focus", on);
    let b = $("csFocusExit");
    if (on) {
      if (!b) { b = document.createElement("button"); b.id = "csFocusExit"; b.type = "button"; b.textContent = "✕ Exit focus mode"; b.onclick = () => { setFocus(false); applyAll(); toast("Focus mode off"); }; document.body.appendChild(b); }
      b.hidden = false;
    } else if (b) b.hidden = true;
  }

  /* ---------- read aloud (Cheat Sheet only) ---------- */
  let speaking = null;
  const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  function voices() { try { return speechSynthesis.getVoices() || []; } catch (e) { return []; } }
  function bestVoice() {
    const v = voices(), us = v.filter(x => /^en[-_]US/i.test(x.lang)), en = v.filter(x => /^en/i.test(x.lang));
    // voices that live on the device are much more reliable than online ones
    return us.find(x => x.localService) || en.find(x => x.localService) || us[0] || en[0] || null;
  }
  if (canSpeak) { try { voices(); speechSynthesis.addEventListener("voiceschanged", voices); } catch (e) {} }
  let speakId = 0;
  /* Speak text reliably: waits a moment after cancelling (Chrome drops speech started right after cancel),
     un-pauses a stuck engine, and retries with the default voice if the chosen one stays silent. */
  function csSpeak(text, o) {
    o = o || {};
    if (!canSpeak || !text) { o.onend && o.onend(); return false; }
    const synth = speechSynthesis, id = ++speakId;
    const busy = synth.speaking || synth.pending;
    try { synth.cancel(); } catch (e) {}
    const go = (withVoice, tries) => {
      if (id !== speakId) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = o.rate || .9;
      const v = withVoice ? bestVoice() : null; if (v) u.voice = v;
      let started = false, done = false;
      const finish = () => { if (done) return; done = true; if (id === speakId) o.onend && o.onend(); };
      u.onstart = () => { started = true; };
      u.onend = finish;
      u.onerror = e => {
        if (id !== speakId || e.error === "interrupted" || e.error === "canceled") return finish();
        if (!started && tries < 1) { done = true; go(false, tries + 1); } else finish();
      };
      try { synth.resume(); } catch (e) {}
      synth.speak(u);
      setTimeout(() => {
        if (id !== speakId || started || done || synth.speaking) return;
        done = true; try { synth.cancel(); } catch (e) {}
        if (tries < 1) setTimeout(() => go(false, tries + 1), 80);
        else { (o.onfail || o.onend || (() => {}))(); toast(voices().length ? "The voice isn't playing. Check your volume, or try Chrome or Safari." : "Your browser doesn't have a voice for reading aloud. Try Chrome, Safari or Edge."); }
      }, 1300);
    };
    setTimeout(() => go(true, 0), busy ? 150 : 40);
    return true;
  }
  window.csSpeak = csSpeak;
  window.csStopSpeaking = () => { speakId++; try { speechSynthesis.cancel(); } catch (e) {} };
  function textOf(view) {
    const clone = view.cloneNode(true);
    clone.querySelectorAll("button,input,select,textarea,script,style,.es,.no-read,.tip-x,.star-btn,.cs-read-row,[hidden],svg").forEach(n => n.remove());
    clone.querySelectorAll("td,th,li,p,h1,h2,h3,div").forEach(n => n.append(". "));
    return clone.textContent.replace(/\s+/g, " ").replace(/(\.\s*){2,}/g, ". ").replace(/\s+\./g, ".").trim();
  }
  function stopReading() { if (speaking) { window.csStopSpeaking(); speaking.classList.remove("on"); speaking.innerHTML = "🔊 Listen"; speaking = null; } }
  function readAloud(btn, view) {
    if (speaking === btn) { stopReading(); return; }
    stopReading();
    const sel = String(getSelection && getSelection()).trim();
    const text = sel.length > 2 ? sel : textOf(view);
    if (!text) return;
    const parts = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
    const chunks = []; let cur = "";
    parts.forEach(p => { if ((cur + p).length > 220) { if (cur) chunks.push(cur); cur = p; } else cur += p; }); if (cur) chunks.push(cur);
    speaking = btn; btn.classList.add("on"); btn.innerHTML = "■ Stop";
    let i = 0;
    const next = () => {
      if (speaking !== btn) return;
      if (i >= chunks.length) { stopReading(); return; }
      csSpeak(chunks[i++], { rate: .9, onend: next, onfail: stopReading });
    };
    next();
  }
  function addReadButtons() {
    if (!isMain || !canSpeak) return;
    document.querySelectorAll("main section.view").forEach(v => {
      if (v.querySelector(".cs-read") || ["v-feedback", "v-backup", "v-changelog", "v-notes", "v-words", "v-translate", "v-quiz"].includes(v.id)) return;
      const btn = document.createElement("button"); btn.type = "button"; btn.className = "cs-read"; btn.innerHTML = "🔊 Listen";
      btn.title = "Read this page aloud (or select some text first to hear just that part)";
      btn.setAttribute("aria-label", "Read this page aloud");
      btn.onclick = () => readAloud(btn, v);
      const head = v.querySelector(".vhead");
      if (head) { const row = document.createElement("div"); row.className = "cs-read-row"; const star = head.querySelector(".star-btn"); if (star) { head.insertBefore(row, star); row.appendChild(btn); row.appendChild(star); } else { row.appendChild(btn); head.appendChild(row); } }
      else { const h1 = v.querySelector("h1"); if (h1) h1.insertAdjacentElement("afterend", btn); }
    });
    document.addEventListener("click", e => { if (e.target.closest("[data-go], .navbtn")) stopReading(); }, true);
  }

  /* ---------- study timer (Cheat Sheet only) ---------- */
  let tLen = 25 * 60, tLeft = 25 * 60, tEnd = 0, tInt = null, tRun = false;
  try { const t = JSON.parse(sessionStorage.getItem("cs-timer") || "null"); if (t) { tLen = t.len; if (t.end && t.end > Date.now()) { tEnd = t.end; tRun = true; } else tLeft = t.left ?? t.len; } } catch (e) {}
  const fmt = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  function tSave() { try { sessionStorage.setItem("cs-timer", JSON.stringify({ len: tLen, left: tLeft, end: tRun ? tEnd : 0 })); } catch (e) {} }
  function chime() {
    try {
      const A = window.AudioContext || window.webkitAudioContext; const ac = new A(); const t0 = ac.currentTime;
      [[660, 0], [880, .35], [990, .7]].forEach(([f, d]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, t0 + d); g.gain.linearRampToValueAtTime(.18, t0 + d + .03); g.gain.exponentialRampToValueAtTime(.0001, t0 + d + 1.6); o.connect(g); g.connect(ac.destination); o.start(t0 + d); o.stop(t0 + d + 1.7); });
      setTimeout(() => ac.close(), 3000);
    } catch (e) {}
  }
  function tTick() {
    if (tRun) { tLeft = Math.max(0, Math.round((tEnd - Date.now()) / 1000)); if (tLeft <= 0) { tRun = false; clearInterval(tInt); tInt = null; tLeft = tLen; tSave(); chime(); toast("⏱ Time's up! Nice work. Take a 5-minute break 🌱"); } }
    paintTimer();
  }
  function tStart() { if (tRun) return; tEnd = Date.now() + tLeft * 1000; tRun = true; tSave(); clearInterval(tInt); tInt = setInterval(tTick, 1000); tTick(); }
  function tPause() { if (!tRun) return; tLeft = Math.max(0, Math.round((tEnd - Date.now()) / 1000)); tRun = false; clearInterval(tInt); tInt = null; tSave(); paintTimer(); }
  function tReset() { tRun = false; clearInterval(tInt); tInt = null; tLeft = tLen; tSave(); paintTimer(); }
  function tSet(min) { tLen = min * 60; tReset(); }
  function paintTimer() {
    const d = $("csTime"); if (d) d.textContent = fmt(tLeft);
    const go = $("csTGo"); if (go) go.textContent = tRun ? "Pause" : (tLeft < tLen ? "Resume" : "Start");
    document.querySelectorAll("[data-tmin]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.tmin * 60 === tLen)));
    const chip = $("csTimerChip");
    if (chip) { chip.hidden = !tRun && tLeft === tLen; chip.textContent = (tRun ? "⏱ " : "⏸ ") + fmt(tLeft); }
  }

  /* ---------- calm mode: no surprise pop-ups ---------- */
  function applyCalm() {
    root.classList.toggle("cs-calm", !!S.calm);
  }

  /* ---------- apply everything ---------- */
  function applyAll() {
    root.style.setProperty("--cs-zoom", String(S.size));
    root.classList.remove("cs-font-atkinson", "cs-font-lexend", "cs-font-classic");
    if (S.font !== "default") { loadFont(S.font); root.classList.add("cs-font-" + S.font); }
    root.classList.toggle("cs-space", !!S.space);
    root.classList.toggle("cs-no-inshort", !S.inshort);
    root.classList.toggle("cs-no-read", !S.read);
    applyCalm(); applyFocus(); applyRuler(); applyBionic();
    paintPanel();
  }
  window.csComfort = { get: () => Object.assign({}, S), apply: applyAll };

  /* ---------- the panel ---------- */
  function tog(id, label, sub) { return `<label class="cs-tog"><input type="checkbox" id="${id}"><span><b>${label}</b>${sub ? `<small>${sub}</small>` : ""}</span></label>`; }
  function buildPanel() {
    const host = $("csWrap"); if (!host) return;
    host.innerHTML = `<button class="cs-btn" id="csBtn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="csPanel" title="Reading & comfort settings"><span class="cs-ico" aria-hidden="true">⚙</span><span class="cs-txt">Settings</span></button>
      <div class="cs-panel" id="csPanel" role="dialog" aria-label="Reading and comfort settings" hidden>
        <div class="cs-head"><h3>Reading &amp; comfort</h3><button class="cs-x" id="csClose" type="button" aria-label="Close">×</button></div>
        <div class="cs-sec"><h4>Look</h4><div class="cs-seg" id="csThemes">${THEME_LIST.map(([v, i, l]) => `<button type="button" data-cstheme="${v}"><span aria-hidden="true">${i}</span> ${l}</button>`).join("")}</div></div>
        <div class="cs-sec"><h4>Reading</h4>
          <div class="cs-size"><button type="button" id="csSmaller" aria-label="Smaller text">A−</button><span id="csSizeTxt">100%</span><button type="button" id="csBigger" aria-label="Bigger text">A+</button></div>
          <div class="cs-seg three" id="csFonts"><button type="button" data-csfont="default" style="font-family:'Lexend',sans-serif">Lexend</button><button type="button" data-csfont="atkinson" style="font-family:'Atkinson Hyperlegible',sans-serif">Atkinson</button><button type="button" data-csfont="classic" style="font-family:'Nunito',sans-serif">Classic</button></div>
          <small style="color:var(--muted);font-size:12.5px;margin-top:-2px">Lexend (the default) and Atkinson Hyperlegible were designed to be easier to read. Classic is the Cheat Sheet's original font.</small>
          ${tog("csSpace", "More space", "Extra room between lines, words and paragraphs.")}
          ${tog("csBionic", "Bionic reading", "Bolds the start of each word. Some people find it easier to read; try it and see.")}
          ${tog("csRulerT", "Reading ruler", "A highlighted band that follows your mouse or finger, to keep your place.")}
        </div>
        <div class="cs-sec"><h4>Focus</h4>
          ${tog("csFocus", "Focus mode", isMain ? "Hides the menu and extras so you only see the page you're on." : "Hides the student list so you only see one student.")}
          ${isMain ? tog("csInshort", "“In short” boxes", "A one-line summary at the top of each grammar page.") : ""}
          ${isMain && canSpeak ? tog("csRead", "Listen buttons", "A 🔊 Listen button on each page reads it aloud. Select text first to hear just that part.") : ""}
          ${isMain ? `<div class="cs-timer"><b style="font-weight:800">Study timer</b>
            <div class="cs-trow">${[10, 15, 25, 45].map(m => `<button type="button" data-tmin="${m}">${m} min</button>`).join("")}</div>
            <div class="cs-time" id="csTime" aria-live="off">25:00</div>
            <div class="cs-trow"><button type="button" class="go" id="csTGo">Start</button><button type="button" id="csTReset">Reset</button></div>
            <small style="color:var(--muted);font-size:12.5px;text-align:center">A soft chime plays when the time is up. Keep the tab open.</small></div>` : ""}
        </div>
        <div class="cs-sec"><h4>Calm</h4>
          ${tog("csCalm", "Calm mode", "No animations, softer colors, and no pop-ups" + (isMain ? " (new updates show as a small dot on “What's new” instead)" : "") + ".")}
        </div>
        <div class="cs-sec"><button class="cs-reset" type="button" id="csResetAll">Reset all settings</button>
          <small style="color:var(--muted);font-size:12.5px">${isMain ? "Signed in? These settings follow you to your other devices." : "Saved in this browser."}</small></div>
      </div>`;
    const btn = $("csBtn"), panel = $("csPanel");
    const open = o => { panel.hidden = !o; btn.setAttribute("aria-expanded", String(o)); if (o) { paintPanel(); loadFont("atkinson"); loadFont("classic"); } };
    btn.onclick = () => open(panel.hidden);
    $("csClose").onclick = () => { open(false); btn.focus(); };
    panel.addEventListener("keydown", e => { if (e.key === "Escape") { open(false); btn.focus(); } });
    document.addEventListener("click", e => { if (!panel.hidden && !e.target.closest("#csWrap") && !e.target.closest("#csTimerChip")) open(false); });
    $("csThemes").onclick = e => { const b = e.target.closest("[data-cstheme]"); if (b) setTheme(b.dataset.cstheme); };
    $("csFonts").onclick = e => { const b = e.target.closest("[data-csfont]"); if (!b) return; S.font = b.dataset.csfont; save(); applyAll(); };
    const SIZES = [.9, 1, 1.1, 1.2, 1.35, 1.5];
    const step = d => { let i = SIZES.findIndex(x => Math.abs(x - S.size) < .01); if (i < 0) i = 1; i = Math.min(SIZES.length - 1, Math.max(0, i + d)); S.size = SIZES[i]; save(); applyAll(); };
    $("csSmaller").onclick = () => step(-1); $("csBigger").onclick = () => step(1);
    const bind = (id, k) => { const el = $(id); if (el) el.onchange = () => { S[k] = el.checked; save(); applyAll(); }; };
    bind("csSpace", "space"); bind("csBionic", "bionic"); bind("csRulerT", "ruler"); bind("csInshort", "inshort"); bind("csRead", "read"); bind("csCalm", "calm");
    if ($("csFocus")) $("csFocus").addEventListener("change", () => { setFocus($("csFocus").checked); applyAll(); if (focusOn()) { open(false); toast("Focus mode on. Tap “Exit focus mode” at the bottom to leave."); } });
    if ($("csRead")) $("csRead").addEventListener("change", () => { if (!S.read) stopReading(); });
    $("csResetAll").onclick = () => { S = Object.assign({}, DEF); save(); applyAll(); toast("Settings reset"); };
    if (isMain) {
      panel.querySelector(".cs-timer").addEventListener("click", e => { const b = e.target.closest("[data-tmin]"); if (b) tSet(+b.dataset.tmin); });
      $("csTGo").onclick = () => tRun ? tPause() : tStart();
      $("csTReset").onclick = tReset;
      const chip = $("csTimerChip"); if (chip) chip.onclick = e => { e.stopPropagation(); open(true); };
    }
  }
  function paintPanel() {
    if (!$("csPanel")) return;
    const th = curTheme();
    document.querySelectorAll("[data-cstheme]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cstheme === th)));
    document.querySelectorAll("#csFonts [data-csfont]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.csfont === S.font)));
    $("csSizeTxt").textContent = Math.round(S.size * 100) + "%";
    const set = (id, v) => { const el = $(id); if (el) el.checked = !!v; };
    set("csSpace", S.space); set("csBionic", S.bionic); set("csRulerT", S.ruler); set("csFocus", focusOn()); set("csInshort", S.inshort); set("csRead", S.read); set("csCalm", S.calm);
    paintTimer();
  }

  /* settings changed on another device (cloud sync reloads the page, but just in case) */
  addEventListener("storage", e => { if (e.key === KEY) { try { S = Object.assign({}, DEF, JSON.parse(e.newValue || "{}")); } catch (_) {} applyAll(); } });
  new MutationObserver(paintPanel).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  function init() {
    sepiaFont();
    buildPanel(); addReadButtons(); applyAll();
    if (tRun) { clearInterval(tInt); tInt = setInterval(tTick, 1000); tTick(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
