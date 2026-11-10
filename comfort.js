/* ===== Hibi · Reading & comfort settings =====
   Shared by Hibi (index.html) and Hibi members (members.html).
   Settings live in localStorage "ncs-comfort" (synced to the student's account on Hibi). */
(function () {
  "use strict";
  const KEY = "ncs-comfort";
  /* high contrast: follows the device's "Increase contrast" setting until the student chooses */
  const sysContrast = () => { try { return matchMedia("(prefers-contrast: more)").matches; } catch (e) { return false; } };
  const contrastOn = () => (S.contrast == null ? sysContrast() : !!S.contrast);
  try { matchMedia("(prefers-contrast: more)").addEventListener("change", () => { if (S.contrast == null) applyAll(); }); } catch (e) {}
  const DEF = { size: 1, font: "default", space: false, bionic: false, ruler: false, focus: false, calm: false, inshort: true, read: true, cursor: "default", lookup: true, contrast: null, accent: "blue", menu: "grouped" };
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

  const FONT_DESC = {
    default: "<b>Lexend</b> (the default): clean and round, with a little extra space between letters. It was designed to make reading easier and faster.",
    atkinson: "<b>Atkinson Hyperlegible</b>: made for people with low vision. Letters that look alike, like I, l and 1, are easy to tell apart.",
    book: "<b>Book</b> (Literata): a calm, classic font like the ones in printed books and e-readers. Lovely with the Sepia look.",
    classic: "<b>Classic</b>: Hibi's original look, with Nunito for text and playful Sour Gummy for titles. Soft, round and friendly."
  };
  /* ---------- fonts (loaded only when chosen) ---------- */
  const FONTS = {
    atkinson: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap",
    book: "https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400&display=swap",
    classic: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,800;0,900;1,600&family=Sour+Gummy:wght@500;700&display=swap"
  };
  function loadFont(f) {
    if (!FONTS[f] || document.querySelector('link[data-csfontlink="' + f + '"]')) return;
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = FONTS[f]; l.dataset.csfontlink = f; document.head.appendChild(l);
  }

  /* ---------- theme ---------- */
  const THEME_LIST = [["dark", "☾", "Dark"], ["light", "☀", "Light"], ["sepia", "📖", "Sepia"], ["midnight", "🌑", "Midnight"], ["unicorn", "🦄", "Unicorn"]];
  function curTheme() { return root.getAttribute("data-theme") || "dark"; }
  function setTheme(t) {
    if (typeof window.csSetTheme === "function") window.csSetTheme(t);
    else { root.setAttribute("data-theme", t); try { localStorage.setItem("ncs-theme", t); } catch (e) {} }
    paintPanel();
    window.dispatchEvent(new Event("cs-theme"));
  }

  /* ---------- bionic reading ---------- */
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION", "BUTTON", "CODE", "KBD", "PRE", "SVG", "NOSCRIPT"]);
  const WORD = /[\p{L}\p{M}][\p{L}\p{M}'’-]*/gu;
  let bioObs = null, bioBusy = false;
  function boldLen(n) { return n <= 3 ? 1 : n <= 5 ? 2 : Math.ceil(n * 0.45); }
  function skipEl(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (SKIP.has(e.tagName) || e.isContentEditable || (e.classList && (e.classList.contains("bw") || e.classList.contains("bw-line") || e.classList.contains("no-bio") || e.classList.contains("mono")))) return true;
    }
    return false;
  }
  function bionicNode(tn, pd) {
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
    /* in a flex or grid box, keep the line together as one piece so the layout doesn't change */
    if (/flex|grid/.test(pd)) { const w = document.createElement("span"); w.className = "bw-line"; w.appendChild(frag); tn.parentNode.replaceChild(w, tn); return; }
    tn.parentNode.replaceChild(frag, tn);
  }
  /* Only what's on screen gets processed: hidden views, closed panels and closed <details> are
     skipped, then picked up when they open. Work is done in small batches so the page never freezes. */
  function rejectEl(el) {
    if (SKIP.has(el.tagName) || el.hidden || el.isContentEditable) return true;
    const c = el.classList; if (c && (c.contains("bw") || c.contains("bw-line") || c.contains("no-bio") || c.contains("mono"))) return true;
    const p = el.parentElement; if (p && p.tagName === "DETAILS" && !p.open && el.tagName !== "SUMMARY") return true;
    return false;
  }
  function hiddenUp(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (rejectEl(e)) return true;
    }
    return false;
  }
  function collect(scope, out) {
    if (!scope || scope.nodeType !== 1 || !scope.isConnected || hiddenUp(scope)) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.nodeType === 1 ? (rejectEl(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP)
        : (n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
    });
    while (walker.nextNode()) out.push(walker.currentNode);
  }
  let bioQueue = [], bioRAF = 0;
  function bionicFlush() {
    bioRAF = 0;
    if (!S.bionic) { bioQueue = []; return; }
    if (bioObs) bioObs.disconnect();
    const t0 = performance.now();
    try {
      while (bioQueue.length && performance.now() - t0 < 12) {
        const batch = bioQueue.splice(0, 250).filter(n => n.isConnected && n.parentNode);
        const disp = batch.map(n => getComputedStyle(n.parentNode).display);  /* all reads first, then all writes */
        batch.forEach((n, i) => bionicNode(n, disp[i]));
      }
    } finally {
      if (S.bionic && bioObs) bioObs.observe(document.body, BIO_OBS);
    }
    if (bioQueue.length) bioRAF = requestAnimationFrame(bionicFlush);
  }
  function bionicIn(scope) { collect(scope, bioQueue); if (bioQueue.length && !bioRAF) bioRAF = requestAnimationFrame(bionicFlush); }
  function bionicOff() {
    if (bioRAF) { cancelAnimationFrame(bioRAF); bioRAF = 0; } bioQueue = [];
    const parents = new Set();
    document.querySelectorAll("span.bw-line").forEach(s => { parents.add(s.parentNode); s.replaceWith(document.createTextNode(s.textContent)); });
    document.querySelectorAll("span.bw").forEach(s => { parents.add(s.parentNode); s.replaceWith(document.createTextNode(s.textContent)); });
    parents.forEach(p => p && p.isConnected && p.normalize());
  }
  const BIO_OBS = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["hidden", "open"] };
  let bioPending = new Set(), bioT = null;
  function onBioMut(muts) {
    for (const m of muts) {
      const t = m.type === "characterData" ? m.target.parentElement : m.target;
      if (t) bioPending.add(t);
    }
    clearTimeout(bioT);
    bioT = setTimeout(() => {
      const list = [...bioPending]; bioPending = new Set();
      /* drop nodes inside another pending node so nothing is walked twice */
      list.filter(el => !list.some(o => o !== el && o.contains(el))).forEach(bionicIn);
    }, 60);
  }
  function applyBionic() {
    if (S.bionic) {
      if (!bioObs) bioObs = new MutationObserver(onBioMut);
      bioObs.observe(document.body, BIO_OBS);
      bionicIn(document.body);
    } else {
      if (bioObs) { bioObs.disconnect(); }
      clearTimeout(bioT); bioPending = new Set();
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
  // the teacher view keeps its own focus setting, so focus mode on Hibi doesn't hide the student list
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

  /* ---------- read aloud (Hibi only) ---------- */
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
  let tipShown = false;
  function silentTip() {
    if (tipShown) return; tipShown = true;
    try { if (sessionStorage.getItem("cs-silenttip")) return; sessionStorage.setItem("cs-silenttip", "1"); } catch (e) {}
    toast("No sound? Turn off silent mode on your iPhone to hear the voice.");
  }
  function csSpeak(text, o) {
    if (window.csUnlockAudio) window.csUnlockAudio(false);
    o = o || {};
    if (!text) { o.onend && o.onend(); return false; }
    /* iPhone: the built-in voice is muted in silent mode, so use the Gemini voice (played like music) */
    if (window.csVoice && window.csVoice.active()) {
      const id = ++speakId;
      try { if (canSpeak) speechSynthesis.cancel(); } catch (e) {}
      window.csVoice.speak(text).then(r => { if (id === speakId && r !== "stopped") o.onend && o.onend(); })
        .catch(err => { console.warn("Gemini voice failed, using the built-in voice", err); if (id !== speakId) return; silentTip(); speakNative(text, o, id); });
      return true;
    }
    if (!canSpeak) { o.onend && o.onend(); return false; }
    return speakNative(text, o, ++speakId);
  }
  function speakNative(text, o, id) {
    if (!canSpeak) { o.onend && o.onend(); return false; }
    const synth = speechSynthesis;
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
  window.csStopSpeaking = () => { speakId++; try { if (window.csVoice) window.csVoice.stop(); } catch (e) {} try { speechSynthesis.cancel(); } catch (e) {} };
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
      if (window.csVoice && window.csVoice.active() && chunks[i + 1]) window.csVoice.prefetch(chunks[i + 1]);
      csSpeak(chunks[i++], { rate: .9, onend: next, onfail: stopReading });
    };
    next();
  }
  function addReadButtons() {
    if (!isMain || !(canSpeak || window.csVoice)) return;
    document.querySelectorAll("main section.view").forEach(v => {
      if (v.querySelector(".cs-read") || ["v-feedback", "v-backup", "v-changelog", "v-notes", "v-words", "v-quiz"].includes(v.id)) return;
      const btn = document.createElement("button"); btn.type = "button"; btn.className = "cs-read"; btn.innerHTML = "🔊 Listen";
      btn.title = "Read this page aloud (or select some text first to hear just that part)";
      btn.setAttribute("aria-label", "Read this page aloud");
      btn.onclick = () => readAloud(btn, v);
      const head = v.querySelector(".vhead");
      if (head) { const row = document.createElement("div"); row.className = "cs-read-row"; const star = head.querySelector(".star-btn"); if (star) { head.insertBefore(row, star); row.appendChild(btn); row.appendChild(star); } else { row.appendChild(btn); head.appendChild(row); } }
      else { const h1 = v.querySelector("h1"); if (h1) { const wrap = document.createElement("div"); wrap.className = "vhead"; h1.parentNode.insertBefore(wrap, h1); wrap.appendChild(h1); const row = document.createElement("div"); row.className = "cs-read-row"; row.appendChild(btn); wrap.appendChild(row); } }
    });
    document.addEventListener("click", e => { if (e.target.closest("[data-go], .navbtn")) stopReading(); }, true);
  }

  /* ---------- study timer: Pomodoro (Hibi only) ----------
     Focus → short break, and a long break after every 4 focus sessions. Breaks start by themselves; focus waits for you. */
  const PRESETS = { classic: { f: 25, s: 5, l: 15, n: "25 / 5" }, short: { f: 15, s: 3, l: 10, n: "15 / 3" }, long: { f: 50, s: 10, l: 20, n: "50 / 10" } };
  let P = { preset: "classic", auto: true };
  try { Object.assign(P, JSON.parse(localStorage.getItem("cs-pomo") || "{}")); } catch (e) {}
  const savePrefs = () => { try { localStorage.setItem("cs-pomo", JSON.stringify(P)); } catch (e) {} };
  const len = m => (PRESETS[P.preset] || PRESETS.classic)[m === "focus" ? "f" : m === "short" ? "s" : "l"] * 60;
  let tMode = "focus", tDone = 0, tLen = len("focus"), tLeft = tLen, tEnd = 0, tInt = null, tRun = false, tCustom = 0;
  const dayKey = () => new Date().toDateString();
  let today = { d: dayKey(), n: 0 };
  try { const x = JSON.parse(localStorage.getItem("cs-pomo-today") || "null"); if (x && x.d === dayKey()) today = x; } catch (e) {}
  const bumpToday = () => { if (today.d !== dayKey()) today = { d: dayKey(), n: 0 }; today.n++; try { localStorage.setItem("cs-pomo-today", JSON.stringify(today)); } catch (e) {} };
  try { const t = JSON.parse(sessionStorage.getItem("cs-timer") || "null"); if (t && t.mode) { tMode = t.mode; tDone = t.done || 0; tLen = t.len; tCustom = t.custom || 0; if (t.end && t.end > Date.now()) { tEnd = t.end; tRun = true; } else tLeft = t.left ?? t.len; } } catch (e) {}
  const fmt = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  function tSave() { try { sessionStorage.setItem("cs-timer", JSON.stringify({ mode: tMode, done: tDone, len: tLen, left: tLeft, end: tRun ? tEnd : 0, custom: tCustom })); } catch (e) {} }
  function chime() {
    if (window.csUnlockAudio) window.csUnlockAudio(false);
    try {
      const A = window.AudioContext || window.webkitAudioContext; const ac = new A(); const t0 = ac.currentTime;
      [[660, 0], [880, .35], [990, .7]].forEach(([f, d]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, t0 + d); g.gain.linearRampToValueAtTime(.18, t0 + d + .03); g.gain.exponentialRampToValueAtTime(.0001, t0 + d + 1.6); o.connect(g); g.connect(ac.destination); o.start(t0 + d); o.stop(t0 + d + 1.7); });
      setTimeout(() => ac.close(), 3000);
    } catch (e) {}
  }
  function setMode(m, autostart) { tMode = m; tLen = m === "focus" && tCustom ? tCustom : len(m); tLeft = tLen; tRun = false; clearInterval(tInt); tInt = null; tSave(); if (autostart) tStart(); else paintTimer(); }
  function finished() {
    tRun = false; clearInterval(tInt); tInt = null; chime();
    if (tMode === "focus") { tDone++; bumpToday(); const longB = tDone % 4 === 0; toast(longB ? "🍅 4 focus sessions! Take a longer break 🌿" : "🍅 Focus session done! Time for a short break ☕"); setMode(longB ? "long" : "short", P.auto); }
    else { toast("Break's over. Ready for the next focus session? 🍅"); setMode("focus", false); }
  }
  function tTick() {
    if (tRun) { tLeft = Math.max(0, Math.round((tEnd - Date.now()) / 1000)); if (tLeft <= 0) { finished(); return; } }
    paintTimer();
  }
  function tStart() { if (tRun) return; tEnd = Date.now() + tLeft * 1000; tRun = true; tSave(); clearInterval(tInt); tInt = setInterval(tTick, 1000); tTick(); }
  function tPause() { if (!tRun) return; tLeft = Math.max(0, Math.round((tEnd - Date.now()) / 1000)); tRun = false; clearInterval(tInt); tInt = null; tSave(); paintTimer(); }
  function tReset() { tRun = false; clearInterval(tInt); tInt = null; tLeft = tLen; tSave(); paintTimer(); }
  function tSkip() { if (tMode === "focus") { tRun = false; clearInterval(tInt); tInt = null; const longB = (tDone + 1) % 4 === 0; tDone++; setMode(longB ? "long" : "short", false); } else setMode("focus", false); }
  if (tRun) { tInt = setInterval(tTick, 1000); }
  /* other parts of the site (Practice page) can start the timer too: a custom focus length */
  window.csTimer = { start(min) { tCustom = min * 60; setMode("focus", true); }, pause: () => tPause(), resume: () => tStart(), reset: () => tReset(), state: () => ({ run: tRun, left: tRun ? Math.max(0, Math.round((tEnd - Date.now()) / 1000)) : tLeft, len: tLen, mode: tMode }) };
  const MODE_TXT = { focus: ["🍅", "Focus"], short: ["☕", "Short break"], long: ["🌿", "Long break"] };
  function paintTimer() {
    const d = $("csTime"); if (d) d.textContent = fmt(tLeft);
    const go = $("csTGo"); if (go) go.textContent = tRun ? "Pause" : (tLeft < tLen ? "Resume" : "Start");
    document.querySelectorAll("[data-tmode]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tmode === tMode)));
    document.querySelectorAll("[data-tpre]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tpre === P.preset)));
    const dots = $("tmDots"); if (dots) { const k = tDone % 4; dots.innerHTML = [0, 1, 2, 3].map(i => `<span class="${i < k ? "on" : ""}"></span>`).join(""); dots.title = k + " of 4 before the long break"; }
    const td = $("tmToday"); if (td) { if (today.d !== dayKey()) today = { d: dayKey(), n: 0 }; td.textContent = today.n ? `🍅 ${today.n} focus ${today.n === 1 ? "session" : "sessions"} today` : "No focus sessions yet today"; }
    const ring = $("tmRing"); if (ring) ring.style.setProperty("--p", String(1 - tLeft / Math.max(1, tLen)));
    const pnl = $("tmPanel"); if (pnl) pnl.dataset.mode = tMode;
    const au = $("tmAuto"); if (au) au.checked = !!P.auto;
    const tt = $("tmTime"), tb = $("tmBtn");
    if (tt) { const on = tRun || tLeft !== tLen; tt.hidden = !on; tt.textContent = (tRun ? MODE_TXT[tMode][0] + " " : "⏸ ") + fmt(tLeft); if (tb) { tb.classList.toggle("on", on); tb.classList.toggle("brk", on && tMode !== "focus"); } }
    document.dispatchEvent(new CustomEvent("cs-timer"));
  }

  /* ---------- calm mode: no surprise pop-ups ---------- */
  function applyCalm() {
    root.classList.toggle("cs-calm", !!S.calm);
  }

  /* ---------- apply everything ---------- */
  function applyAll() {
    root.style.setProperty("--cs-zoom", String(S.size));
    root.classList.remove("cs-font-atkinson", "cs-font-lexend", "cs-font-classic", "cs-font-book");
    if (S.font !== "default") { loadFont(S.font); root.classList.add("cs-font-" + S.font); }
    root.classList.toggle("cs-space", !!S.space);
    root.classList.toggle("cs-contrast", contrastOn());
    ["big", "paw", "pencil", "star"].forEach(c => root.classList.toggle("cs-cur-" + c, S.cursor === c));
    root.classList.toggle("cs-no-inshort", !S.inshort);
    root.classList.toggle("cs-no-read", !S.read);
    root.classList.remove("cs-green"); /* one look for everyone: blue buttons */
    applyCalm(); applyFocus(); applyRuler(); applyBionic();
    paintPanel();
  }
  window.csComfort = { get: () => Object.assign({}, S), apply: applyAll };

  /* ---------- menu: topic pages in folding groups (Settings → Menu layout → Classic list undoes it) ---------- */
  const NAV_GROUPS = [
    ["start", "Essentials", "ng-start", ["basics", "be", "tenses", "verbs", "mistakes"]],
    ["grammar", "Grammar notes", "ng-grammar", ["pronouns", "time", "place", "tofor", "quantity", "frequency", "compare", "gerund", "usedto", "perfect", "modals", "conditionals", "passive", "reported"]],
    ["words", "Words & sounds", "ng-words", ["phrasal", "domake", "false", "linking", "pronunciation", "numbers"]],
    ["life", "Real life", "ng-work", ["conversation", "opinions", "email", "interview"]],
    ["tools", "Tools", "ng-speaking", ["translate", "summary", "stuck"]]
  ];
  const FOLD_K = "cs-nav-fold", FOLD_DEF = { grammar: true, words: true, life: false, tools: false, start: false };
  function navFold() { try { return Object.assign({}, FOLD_DEF, JSON.parse(localStorage.getItem(FOLD_K) || "{}")); } catch (e) { return Object.assign({}, FOLD_DEF); } }
  function groupMenu() {
    /* folding groups for everyone (the old "Classic list" option is gone) */
    const nav = document.querySelector("nav.side"); if (!nav || nav.dataset.grouped) return;
    const btn = id => nav.querySelector(`.navgroup:not(.starred) .navbtn[data-go="${id}"]`);
    if (!btn("basics")) return;
    nav.dataset.grouped = "1"; document.documentElement.classList.add("cs-navg");
    const tr = btn("translate"); if (tr) tr.classList.remove("cn-nav");
    const old = [...nav.querySelectorAll(".navgroup[class*='ng-']")];
    const fold = navFold();
    NAV_GROUPS.forEach(([k, label, cls, ids]) => {
      const g = document.createElement("div"); g.className = "navgroup nfg " + cls; g.dataset.ng = k;
      const items = ids.map(btn).filter(Boolean);
      g.innerHTML = `<h4><button type="button" class="nfg-h" aria-expanded="true"><span>${label}</span><span class="nfg-n">${items.length}</span><span class="nfg-c" aria-hidden="true">▾</span></button></h4>`;
      items.forEach(b => g.appendChild(b));
      g.classList.toggle("folded", !!fold[k]); g.querySelector(".nfg-h").setAttribute("aria-expanded", String(!fold[k]));
      nav.appendChild(g);
    });
    old.forEach(g => { [...g.querySelectorAll(".navbtn")].forEach(b => nav.querySelector(".nfg[data-ng='start']").appendChild(b)); g.remove(); });
    nav.addEventListener("click", e => { const h = e.target.closest(".nfg-h"); if (!h) return; e.preventDefault(); e.stopPropagation();
      const g = h.closest(".nfg"), k = g.dataset.ng, f = navFold(); f[k] = !g.classList.contains("folded"); g.classList.toggle("folded", f[k]); h.setAttribute("aria-expanded", String(!f[k]));
      try { localStorage.setItem(FOLD_K, JSON.stringify(f)); } catch (er) {} });
    /* open the group of the page you're on */
    const openCur = () => { const c = nav.querySelector(".nfg .navbtn[aria-current='true']"); const g = c && c.closest(".nfg.folded"); if (g) { g.classList.remove("folded"); g.querySelector(".nfg-h").setAttribute("aria-expanded", "true"); } };
    new MutationObserver(openCur).observe(nav, { subtree: true, attributes: true, attributeFilter: ["aria-current"] }); openCur();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", groupMenu); else groupMenu();

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
          <div class="cs-seg two" id="csFonts"><button type="button" data-csfont="default" style="font-family:'Lexend',sans-serif">Lexend</button><button type="button" data-csfont="atkinson" style="font-family:'Atkinson Hyperlegible',sans-serif">Atkinson</button><button type="button" data-csfont="book" style="font-family:'Literata',Georgia,serif">Book</button><button type="button" data-csfont="classic" style="font-family:'Nunito',sans-serif">Classic</button></div>
          <small class="cs-fdesc" id="csFontDesc" aria-live="polite"></small>
          ${tog("csSpace", "More space", "Extra room between lines, words and paragraphs.")}
          ${tog("csBionic", "Bionic reading", "Bolds the start of each word. Some people find it easier to read; try it and see.")}
          ${tog("csRulerT", "Reading ruler", "A highlighted band that follows your mouse or finger, to keep your place.")}
          ${isMain ? tog("csLookup", "Look up words", (matchMedia("(pointer:fine)").matches ? "Double-click a word, or select a few words," : "Press and hold a word") + " to see what it means and save it to My words.") : ""}
          ${matchMedia("(pointer:fine)").matches ? `<div class="cs-curl"><b style="font-weight:800">Mouse cursor</b><div class="cs-seg" id="csCursors">${[["default", "↖", "Normal"], ["big", "⬉", "Big"], ["paw", "🐾", "Paw"], ["pencil", "✏️", "Pencil"], ["star", "⭐", "Star"]].map(([v, i, l]) => `<button type="button" data-cscur="${v}"><span aria-hidden="true">${i}</span> ${l}</button>`).join("")}</div></div>` : ""}
        </div>
        <div class="cs-sec"><h4>Focus</h4>
          ${tog("csFocus", "Focus mode", isMain ? "Hides the menu and extras so you only see the page you're on." : "Hides the student list so you only see one student.")}
          ${isMain ? tog("csInshort", "“In short” boxes", "A one-line summary at the top of each grammar page.") : ""}
          ${isMain && canSpeak ? tog("csRead", "Listen buttons", "A 🔊 Listen button on each page reads it aloud. Select text first to hear just that part.") : ""}

        </div>
        <div class="cs-sec"><h4>Calm</h4>
          ${tog("csContrast", "High contrast", "Stronger text and borders, easier to read in bright light or with low vision. Works with any theme.")}
          ${tog("csCalm", "Calm mode", "No animations, softer colors, and no pop-ups" + (isMain ? " (new updates show as a small dot on “What's new” instead)" : "") + ".")}
        </div>
        <div class="cs-sec"><button class="cs-reset" type="button" id="csResetAll">Reset all settings</button>
          <small style="color:var(--muted);font-size:12.5px">${isMain ? "Signed in? These settings follow you to your other devices." : "Saved in this browser."}</small></div>
      </div>`;
    const btn = $("csBtn"), panel = $("csPanel");
    const open = o => { panel.hidden = !o; btn.setAttribute("aria-expanded", String(o)); if (o) { paintPanel(); loadFont("atkinson"); loadFont("book"); loadFont("classic"); } };
    btn.onclick = () => open(panel.hidden);
    $("csClose").onclick = () => { open(false); btn.focus(); };
    panel.addEventListener("keydown", e => { if (e.key === "Escape") { open(false); btn.focus(); } });
    document.addEventListener("click", e => { if (!panel.hidden && !e.target.closest("#csWrap")) open(false); });
    $("csThemes").onclick = e => { const b = e.target.closest("[data-cstheme]"); if (b) setTheme(b.dataset.cstheme); };
    $("csFonts").onclick = e => { const b = e.target.closest("[data-csfont]"); if (!b) return; S.font = b.dataset.csfont; save(); applyAll(); };
    const SIZES = [.8, .9, 1, 1.1, 1.2, 1.35, 1.5];
    const step = d => { let i = SIZES.findIndex(x => Math.abs(x - S.size) < .01); if (i < 0) i = 2; i = Math.min(SIZES.length - 1, Math.max(0, i + d)); S.size = SIZES[i]; save(); applyAll(); };
    $("csSmaller").onclick = () => step(-1); $("csBigger").onclick = () => step(1);
    const bind = (id, k) => { const el = $(id); if (el) el.onchange = () => { S[k] = el.checked; save(); applyAll(); }; };
    bind("csLookup", "lookup");
    if ($("csContrast")) $("csContrast").onchange = e => { S.contrast = e.target.checked; save(); applyAll(); };
    if ($("csMenu")) $("csMenu").onclick = e => { const b = e.target.closest("[data-csmenu]"); if (!b || b.dataset.csmenu === (S.menu || "grouped")) return; S.menu = b.dataset.csmenu; save(); location.reload(); };
    if ($("csAccent")) $("csAccent").onclick = e => { const b = e.target.closest("[data-csacc]"); if (!b) return; S.accent = b.dataset.csacc; save(); applyAll(); paintPanel(); };
    if ($("csCursors")) $("csCursors").onclick = e => { const b = e.target.closest("[data-cscur]"); if (!b) return; S.cursor = b.dataset.cscur; save(); applyAll(); };
    bind("csSpace", "space"); bind("csBionic", "bionic"); bind("csRulerT", "ruler"); bind("csInshort", "inshort"); bind("csRead", "read"); bind("csCalm", "calm");
    if ($("csFocus")) $("csFocus").addEventListener("change", () => { setFocus($("csFocus").checked); applyAll(); if (focusOn()) { open(false); toast("Focus mode on. Tap “Exit focus mode” at the bottom to leave."); } });
    if ($("csRead")) $("csRead").addEventListener("change", () => { if (!S.read) stopReading(); });
    $("csResetAll").onclick = () => { S = Object.assign({}, DEF); save(); applyAll(); toast("Settings reset"); };
    if (isMain) {
      buildTimer();
    }
  }
  /* ---------- study timer: its own clock button left of the gear, with a pop-up like Music ---------- */
  function buildTimer() {
    const host = $("csWrap"); if (!host || $("tmWrap")) return;
    const w = document.createElement("div"); w.className = "cs-wrap tm-wrap"; w.id = "tmWrap";
    w.innerHTML = `<button class="cs-btn tm-btn" id="tmBtn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="tmPanel" title="Study timer"><svg class="tm-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4.2l2.6 1.6M9.5 2.5h5M19 6l1.5-1.5"/></svg><span class="tm-time" id="tmTime" hidden></span><span class="cs-txt">Study timer</span></button>
      <div class="cs-panel tm-panel" id="tmPanel" role="dialog" aria-label="Study timer" hidden>
        <div class="cs-head"><h3>Study timer</h3><button class="cs-x" id="tmClose" type="button" aria-label="Close">×</button></div>
        <div class="cs-timer tm-pomo">
          <div class="tm-modes" role="group" aria-label="Timer mode">${Object.entries(MODE_TXT).map(([k, [i, l]]) => `<button type="button" data-tmode="${k}">${i} ${l}</button>`).join("")}</div>
          <div class="tm-ring" id="tmRing"><div class="cs-time" id="csTime" aria-live="off">25:00</div><div class="tm-dots" id="tmDots" aria-label="Focus sessions before the long break"></div></div>
          <div class="cs-trow"><button type="button" class="go" id="csTGo">Start</button><button type="button" id="csTReset">Reset</button><button type="button" id="tmSkip" title="Skip to the next part">Skip ⏭</button></div>
          <p class="tm-today" id="tmToday"></p>
          <div class="tm-set"><b>Rhythm</b> <span class="tm-pre">${Object.entries(PRESETS).map(([k, x]) => `<button type="button" data-tpre="${k}">${x.n}</button>`).join("")}</span></div>
          <label class="tm-auto"><input type="checkbox" id="tmAuto"> Start breaks by themselves</label>
          <small style="color:var(--muted);font-size:12.5px;text-align:center">Focus, take a short break, and after 4 rounds a longer one. A soft chime plays at each change. Keep the tab open.</small>
        </div>
      </div>`;
    host.parentNode.insertBefore(w, host);
    const old = $("csTimerChip"); if (old) old.remove();
    const b = $("tmBtn"), p = $("tmPanel");
    const open = o => { p.hidden = !o; b.setAttribute("aria-expanded", String(o)); if (o) paintTimer(); };
    b.onclick = () => open(p.hidden);
    $("tmClose").onclick = () => { open(false); b.focus(); };
    p.addEventListener("keydown", e => { if (e.key === "Escape") { open(false); b.focus(); } });
    document.addEventListener("click", e => { if (!p.hidden && !e.target.closest("#tmWrap")) open(false); });
    p.querySelector(".cs-timer").addEventListener("click", e => {
      const m = e.target.closest("[data-tmode]"); if (m) { if (m.dataset.tmode === "focus") tCustom = 0; setMode(m.dataset.tmode, false); return; }
      const pr = e.target.closest("[data-tpre]"); if (pr) { P.preset = pr.dataset.tpre; savePrefs(); tCustom = 0; if (!tRun) setMode(tMode, false); else paintTimer(); return; } });
    $("csTGo").onclick = () => tRun ? tPause() : tStart();
    $("csTReset").onclick = tReset;
    $("tmSkip").onclick = tSkip;
    $("tmAuto").onchange = e => { P.auto = e.target.checked; savePrefs(); };
    paintTimer();
  }
  function paintPanel() {
    if (!$("csPanel")) return;
    const th = curTheme();
    document.querySelectorAll("[data-cstheme]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cstheme === th)));
    document.querySelectorAll("#csFonts [data-csfont]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.csfont === S.font)));
    $("csFontDesc").innerHTML = FONT_DESC[S.font] || FONT_DESC.default;
    $("csSizeTxt").textContent = Math.round(S.size * 100) + "%";
    const set = (id, v) => { const el = $(id); if (el) el.checked = !!v; };
    set("csLookup", S.lookup !== false); set("csContrast", contrastOn());
    document.querySelectorAll("[data-csmenu]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.csmenu === (S.menu || "grouped"))));
    document.querySelectorAll("[data-csacc]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.csacc === (S.accent || "blue"))));
    document.querySelectorAll("[data-cscur]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cscur === (S.cursor || "default"))));
    set("csSpace", S.space); set("csBionic", S.bionic); set("csRulerT", S.ruler); set("csFocus", focusOn()); set("csInshort", S.inshort); set("csRead", S.read); set("csCalm", S.calm);
    paintTimer();
  }

  /* settings changed on another device (cloud sync reloads the page, but just in case) */
  addEventListener("storage", e => { if (e.key === KEY) { try { S = Object.assign({}, DEF, JSON.parse(e.newValue || "{}")); } catch (_) {} applyAll(); } });
  new MutationObserver(paintPanel).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  function init() {
    buildPanel(); addReadButtons(); applyAll();
    if (tRun) { clearInterval(tInt); tInt = setInterval(tTick, 1000); tTick(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Small "are you sure?" pop-up shared by every page: csConfirm(title, html, yesLabel) -> Promise<boolean> */
window.csConfirm = function (title, html, yes, no) {
  return new Promise(res => {
    const bd = document.createElement("div"); bd.className = "csc-bd";
    bd.innerHTML = `<div class="csc" role="alertdialog" aria-modal="true" aria-labelledby="cscT"><h3 id="cscT">${title}</h3><div class="csc-b">${html || ""}</div><div class="csc-a"><button type="button" data-c="0">${no || "Cancel"}</button><button type="button" data-c="1" class="csc-y">${yes || "Yes"}</button></div></div>`;
    const back = document.activeElement;
    const done = v => { bd.remove(); document.removeEventListener("keydown", key, true); if (back && back.focus) try { back.focus(); } catch (e) {} res(v); };
    const key = e => { if (e.key === "Escape") { e.preventDefault(); done(false); } };
    bd.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b) done(b.dataset.c === "1"); else if (e.target === bd) done(false); });
    document.addEventListener("keydown", key, true);
    document.body.appendChild(bd); setTimeout(() => { const b = bd.querySelector('[data-c="0"]'); if (b) b.focus(); }, 30);
  });
};
