/* ---------- "📖 Learn it" lessons for Practice → Grammar (pilot: present perfect, Nov 2026) ----------
   Each topic can have a short lesson above its stages, with two tabs (Basics A1–B1 / Advanced B2–C1)
   and a full Spanish version you can switch to. English examples always stay in English (with 🔊 and a translation). */
window.PS_LESSONS = {
pp: {
  name: { en: "Present perfect", es: "Present perfect" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "The present perfect connects the past with <b>now</b>. Something happened before now, and it still matters now. We don’t say exactly when it happened.",
           es: "El present perfect conecta el pasado con el <b>ahora</b>. Algo pasó antes de ahora y todavía importa ahora. No decimos exactamente cuándo pasó." } },
    { h: { en: "How to make it", es: "Cómo se forma" }, stage: 1,
      p: { en: "<b>have / has</b> + the past participle (the verb’s 3rd form). Use <b>has</b> with he, she and it.",
           es: "<b>have / has</b> + el participio pasado (la 3ª forma del verbo). Con he, she e it se usa <b>has</b>." },
      table: [
        ["+", "I / you / we / they <b>have</b> (’ve) worked", "He / she / it <b>has</b> (’s) worked"],
        ["−", "I <b>haven’t</b> seen it.", "She <b>hasn’t</b> called."],
        ["?", "<b>Have</b> you seen it? Yes, I have.", "<b>Has</b> she called? No, she hasn’t."]
      ],
      note: { en: "Regular verbs end in <b>-ed</b> (worked, played). Many common verbs are irregular: go → <b>gone</b>, see → <b>seen</b>, eat → <b>eaten</b>, be → <b>been</b>, do → <b>done</b>, write → <b>written</b>. Stage 2 practices these.",
              es: "Los verbos regulares terminan en <b>-ed</b> (worked, played). Muchos verbos comunes son irregulares: go → <b>gone</b>, see → <b>seen</b>, eat → <b>eaten</b>, be → <b>been</b>, do → <b>done</b>, write → <b>written</b>. La etapa 2 practica estos." } },
    { h: { en: "1. Life experiences", es: "1. Experiencias de vida" }, stage: 4,
      p: { en: "Things you have (or haven’t) done in your life, at some time. When doesn’t matter. Often with <b>ever</b> and <b>never</b>.",
           es: "Cosas que has hecho (o no) en tu vida, en algún momento. No importa cuándo. Se usa mucho con <b>ever</b> y <b>never</b>." },
      ex: [["I’ve been to Mexico twice.", "He ido a México dos veces."], ["Have you ever tried sushi?", "¿Alguna vez has probado el sushi?"], ["She’s never seen snow.", "Ella nunca ha visto la nieve."]] },
    { h: { en: "2. Started in the past, still true now", es: "2. Empezó en el pasado y sigue ahora" }, stage: 5,
      p: { en: "With <b>for</b> (a length of time) and <b>since</b> (the starting point). Spanish uses the present here, English doesn’t.",
           es: "Con <b>for</b> (cuánto tiempo) y <b>since</b> (desde cuándo). En español aquí usamos el presente; en inglés, no." },
      ex: [["I’ve lived in Santiago for five years.", "Vivo en Santiago hace cinco años."], ["She’s worked here since 2020.", "Ella trabaja aquí desde 2020."], ["How long have you known him?", "¿Hace cuánto lo conoces?"]] },
    { h: { en: "3. Recent news and results", es: "3. Noticias recientes y resultados" }, stage: 4,
      p: { en: "Something just happened and you can see the result now. Often with <b>just</b>, <b>already</b> and <b>yet</b>.",
           es: "Algo acaba de pasar y el resultado se ve ahora. Se usa mucho con <b>just</b>, <b>already</b> y <b>yet</b>." },
      ex: [["I’ve lost my keys! (I can’t find them now)", "¡Perdí mis llaves! (no las encuentro)"], ["He’s just arrived.", "Acaba de llegar."], ["Have you finished yet? I’ve already eaten.", "¿Ya terminaste? Yo ya comí."]] },
    { h: { en: "4. A time that isn’t over yet", es: "4. Un período que todavía no termina" },
      p: { en: "With <b>today</b>, <b>this week</b>, <b>this year</b>… while that time is still going.",
           es: "Con <b>today</b>, <b>this week</b>, <b>this year</b>… mientras ese período sigue." },
      ex: [["I’ve had three coffees today.", "Hoy me he tomado tres cafés."], ["We haven’t seen him this week.", "No lo hemos visto esta semana."]] },
    { h: { en: "Present perfect or past simple?", es: "¿Present perfect o past simple?" }, stage: 6, key: true,
      p: { en: "If you say <b>when</b> (yesterday, last week, in 2019, two days ago, when I was a kid), use the <b>past simple</b>. If there’s no finished time, or it connects to now, use the <b>present perfect</b>.",
           es: "Si dices <b>cuándo</b> (yesterday, last week, in 2019, two days ago, when I was a kid), usa el <b>past simple</b>. Si no hay un momento terminado, o se conecta con el ahora, usa el <b>present perfect</b>." },
      ex: [["I’ve seen that movie. (some time in my life)", "He visto esa película. (alguna vez)"], ["I saw that movie last Friday. (finished time)", "Vi esa película el viernes pasado. (momento terminado)"]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I have seen him yesterday.", "I saw him yesterday.", { en: "‘Yesterday’ is a finished time → past simple.", es: "‘Yesterday’ es un momento terminado → past simple." }],
        ["I live here since 2020.", "I’ve lived here since 2020.", { en: "Since/for + still true now → present perfect.", es: "Since/for + sigue siendo verdad → present perfect." }],
        ["She have finished.", "She has finished.", { en: "he / she / it → has.", es: "he / she / it → has." }],
        ["I’ve went there.", "I’ve gone there. / I’ve been there.", { en: "Use the 3rd form (gone), not the past (went).", es: "Usa la 3ª forma (gone), no el pasado (went)." }],
        ["How long are you here?", "How long have you been here?", { en: "‘How long…’ about until now → present perfect.", es: "‘How long…’ hasta ahora → present perfect." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["I ___ (see) that movie three times.", "’ve seen", { en: "No finished time → present perfect.", es: "Sin momento terminado → present perfect." }],
        ["She ___ (work) here since March.", "’s worked / has worked", { en: "Since + still true now.", es: "Since + sigue siendo verdad." }],
        ["We ___ (go) to the beach last weekend.", "went", { en: "‘Last weekend’ is finished → past simple.", es: "‘Last weekend’ terminó → past simple." }]
      ] }
  ],
  adv: [
    { h: { en: "been to vs gone to", es: "been to vs gone to" },
      p: { en: "<b>been to</b> = went and came back. <b>gone to</b> = went and is still there.",
           es: "<b>been to</b> = fue y volvió. <b>gone to</b> = fue y todavía está allá." },
      ex: [["She’s been to Paris. (she’s back now)", "Ha estado en París. (ya volvió)"], ["She’s gone to Paris. (she’s there now)", "Se fue a París. (está allá ahora)"]] },
    { h: { en: "Present perfect continuous", es: "Present perfect continuous" },
      p: { en: "<b>have / has been + -ing</b>. It’s about the activity and how long it’s been going on, often with a result you can see. The simple form is about what’s finished or how many.",
           es: "<b>have / has been + -ing</b>. Habla de la actividad y de cuánto tiempo lleva, muchas veces con un resultado que se nota. La forma simple habla de lo terminado o de cuántos." },
      ex: [["I’ve been studying all day. (I’m tired)", "Llevo todo el día estudiando. (estoy cansado)"], ["I’ve studied three chapters. (finished, how many)", "He estudiado tres capítulos. (terminado, cuántos)"], ["It’s been raining. The streets are wet.", "Ha estado lloviendo. Las calles están mojadas."]] },
    { h: { en: "Verbs that don’t take -ing", es: "Verbos que no van con -ing" },
      p: { en: "State verbs (know, love, like, believe, own, understand, belong) use the simple form, even for ‘how long’.",
           es: "Los verbos de estado (know, love, like, believe, own, understand, belong) usan la forma simple, incluso para ‘cuánto tiempo’." },
      ex: [["I’ve known her for ten years. (not ‘I’ve been knowing’)", "La conozco hace diez años."], ["They’ve owned that car since 2015.", "Tienen ese auto desde 2015."]] },
    { h: { en: "It’s the first time… / the best… ever", es: "Es la primera vez… / lo mejor… que he…" },
      p: { en: "After <b>It’s the first (second…) time</b> and <b>the best / worst … ever</b>, English uses the present perfect. Spanish often uses the present.",
           es: "Después de <b>It’s the first (second…) time</b> y <b>the best / worst … ever</b>, el inglés usa present perfect. En español muchas veces usamos el presente." },
      ex: [["It’s the first time I’ve eaten octopus.", "Es la primera vez que como pulpo."], ["That’s the best movie I’ve ever seen.", "Es la mejor película que he visto."]] },
    { h: { en: "Since + a past moment or a sentence", es: "Since + un momento o una oración en pasado" },
      p: { en: "After since you can put a past simple sentence. And <b>It’s been … since</b> is a natural way to talk about time passing.",
           es: "Después de since puedes poner una oración en past simple. Y <b>It’s been … since</b> es una forma natural de hablar del tiempo que ha pasado." },
      ex: [["I’ve lived here since I was a kid.", "Vivo aquí desde que era niño."], ["It’s been two years since we met.", "Han pasado dos años desde que nos conocimos."]] },
    { h: { en: "News: present perfect first, then past simple", es: "Noticias: primero present perfect, después past simple" },
      p: { en: "We announce news with the present perfect, then give the details (when, where, how) in the past simple.",
           es: "Anunciamos la noticia con present perfect y después damos los detalles (cuándo, dónde, cómo) en past simple." },
      ex: [["Guess what? I’ve got a new job! I signed the contract on Monday.", "¿Adivina qué? ¡Tengo trabajo nuevo! Firmé el contrato el lunes."]] },
    { h: { en: "After when, after, as soon as", es: "Después de when, after, as soon as" },
      p: { en: "To talk about the future, the present perfect can show something will be finished first.",
           es: "Para hablar del futuro, el present perfect muestra que algo va a estar terminado antes." },
      ex: [["Call me when you’ve finished.", "Llámame cuando hayas terminado."], ["I’ll send it as soon as I’ve checked it.", "Lo envío apenas lo haya revisado."]] },
    { h: { en: "US vs UK", es: "Estados Unidos vs Reino Unido" },
      p: { en: "In everyday American English, people often use the past simple with <b>just</b>, <b>already</b> and <b>yet</b>. Both are correct; British English prefers the present perfect.",
           es: "En el inglés de Estados Unidos, en lo cotidiano, muchas veces se usa el past simple con <b>just</b>, <b>already</b> y <b>yet</b>. Las dos formas son correctas; el inglés británico prefiere el present perfect." },
      ex: [["Did you eat yet? (US, everyday)", "¿Ya comiste? (EE. UU., informal)"], ["Have you eaten yet? (UK and US)", "¿Ya comiste? (Reino Unido y EE. UU.)"]] }
  ]
}
};

(function(){
  const LK = "cs-lesson-lang", esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const get = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const lang = () => get(LK, "en") === "es" ? "es" : "en";
  const T = o => o == null ? "" : typeof o === "string" ? o : (o[lang()] || o.en || "");
  const strip = h => String(h).replace(/<[^>]+>/g, "").replace(/\s*\([^)]*\)\s*$/, "");
  const UI = {
    learn: { en: "Learn it first", es: "Apréndelo primero" },
    basics: { en: "Basics", es: "Lo básico" }, adv: { en: "Advanced", es: "Avanzado" },
    hint: { en: "Read this first, then practice the stages below.", es: "Lee esto primero y después practica las etapas de abajo." },
    stage: { en: "Practice: Stage", es: "Practica: etapa" },
    wrong: { en: "Not", es: "No" }, right: { en: "Say", es: "Mejor" },
    show: { en: "Show answer", es: "Ver respuesta" },
    advNote: { en: "For B2–C1. You don’t need it for stages 1–7, but it helps you sound natural. Stage 8 (Advanced) practices it once you pass stage 7 or test out.", es: "Para nivel B2–C1. No lo necesitas para las etapas 1–7, pero te ayuda a sonar natural. La etapa 8 (Avanzado) lo practica cuando apruebes la etapa 7 o des el examen para eximirte." },
    listen: { en: "Listen", es: "Escuchar" }
  };
  function block(b) {
    let h = `<div class="pl-b${b.key ? " key" : ""}"><h4>${T(b.h)}${b.stage ? `<span class="pl-st">${T(UI.stage)} ${b.stage}</span>` : ""}</h4>`;
    if (b.p) h += `<p>${T(b.p)}</p>`;
    if (b.table) h += `<div class="pl-tbl">${b.table.map(r => `<div class="pl-tr"><span class="pl-sign">${T(r[0])}</span><span>${T(r[1])}</span><span>${T(r[2])}</span></div>`).join("")}</div>`;
    if (b.note) h += `<p class="pl-note">💡 ${T(b.note)}</p>`;
    if (b.ex) h += `<ul class="pl-ex">${b.ex.map(e => `<li><button type="button" class="pl-say" data-plsay="${esc(strip(e[0]))}" aria-label="${T(UI.listen)}" title="${T(UI.listen)}">🔊</button><span><b>${esc(e[0])}</b>${lang() === "es" ? `<small>${esc(e[1])}</small>` : ""}</span></li>`).join("")}</ul>`;
    if (b.mis) h += `<ul class="pl-mis">${b.mis.map(m => `<li><span class="pl-x">✗ <s>${esc(m[0])}</s></span><span class="pl-ok">✓ <b>${esc(m[1])}</b></span><small>${esc(T(m[2]))}</small></li>`).join("")}</ul>`;
    if (b.quiz) h += `<ol class="pl-quiz">${b.quiz.map((q, i) => `<li><span>${esc(q[0])}</span><button type="button" class="pl-show" data-plshow="${i}">${T(UI.show)}</button><span class="pl-ans" hidden>✓ <b>${esc(q[1])}</b> · ${esc(T(q[2]))}</span></li>`).join("")}</ol>`;
    return h + "</div>";
  }
  function inner(id) {
    const L = window.PS_LESSONS[id], tab = get("cs-lesson-tab-" + id, "basics") === "adv" ? "adv" : "basics";
    return `<div class="pl-bar"><div class="pl-tabs" role="tablist">
        <button type="button" role="tab" aria-selected="${tab === "basics"}" class="${tab === "basics" ? "on" : ""}" data-pltab="basics">${T(UI.basics)} <small>A1–B1</small></button>
        <button type="button" role="tab" aria-selected="${tab === "adv"}" class="${tab === "adv" ? "on" : ""}" data-pltab="adv">${T(UI.adv)} <small>B2–C1</small></button></div>
      <div class="pl-lang" role="group" aria-label="Language"><button type="button" class="${lang() === "en" ? "on" : ""}" data-pllang="en">English</button><button type="button" class="${lang() === "es" ? "on" : ""}" data-pllang="es">Español</button></div></div>
      <p class="pl-hint">${tab === "adv" ? T(UI.advNote) : T(UI.hint)}</p>${L[tab].map(block).join("")}`;
  }
  const sum = id => `<b>${T(UI.learn)}: ${esc(T(window.PS_LESSONS[id].name))}</b><small>${T(UI.basics)} · ${T(UI.adv)}</small>`;
  window.__psLesson = function (id) {
    const L = window.PS_LESSONS && window.PS_LESSONS[id]; if (!L) return "";
    const seen = get("cs-lesson-seen-" + id, ""); if (!seen) set("cs-lesson-seen-" + id, "1");
    return `<details class="card ps-lesson" data-plid="${esc(id)}"${seen ? "" : " open"}><summary><span class="pl-ico" aria-hidden="true">📖</span><span class="pl-sum">${sum(id)}</span></summary><div class="pl-in">${inner(id)}</div></details>`;
  };
  const repaint = el => { const d = el.closest(".ps-lesson"); if (!d) return; d.querySelector(".pl-in").innerHTML = inner(d.dataset.plid); d.querySelector(".pl-sum").innerHTML = sum(d.dataset.plid); };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-pltab],[data-pllang],[data-plsay],[data-plshow]"); if (!t || !t.closest(".ps-lesson")) return;
    const id = t.closest(".ps-lesson").dataset.plid;
    if (t.dataset.pltab) { set("cs-lesson-tab-" + id, t.dataset.pltab); repaint(t); }
    else if (t.dataset.pllang) { set(LK, t.dataset.pllang); repaint(t); }
    else if (t.dataset.plsay) { if (window.csSpeak) window.csSpeak(t.dataset.plsay, { lang: "en-US" }); }
    else if (t.dataset.plshow != null) { const a = t.nextElementSibling; if (a) a.hidden = false; t.hidden = true; }
  });
})();
