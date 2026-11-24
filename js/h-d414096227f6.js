
/* Noa's guest link: ?guest=hb7k2q (plain) or ?guest=hb7k2q&as=club (club member with a sample week) skips the sign-in screen in that tab */
(function(){
  const K="cs-guest";
  try{ const q=new URLSearchParams(location.search); if(q.get("guest")==="hb7k2q"){ const a=q.get("as"); sessionStorage.setItem(K,a==="club"?"club":a==="private"?"private":"plain"); history.replaceState(null,"",location.pathname+(location.hash||"")); } }catch(e){}
  let g=null; try{ g=sessionStorage.getItem(K); }catch(e){}
  if(g&&window.__csViewAsMode){ try{ sessionStorage.removeItem(K); }catch(e){} g=null; }  /* "View as" a real student = their real data, never the guest samples */
  /* Nov 20 2026: a sample private student (not in the club), so Noa can show a new student what Hibi looks like for them (kickoff).
     Used by the guest link ?guest=hb7k2q&as=private and by View as → Generic → Private student. */
  window.__csSampleView=()=>import(new URL("hubview.js?v=18",document.baseURI).href).then(m=>m.makeView(sampleHub(),{}));
  function sampleHub(){
    const D=n=>{ const d=new Date(); d.setDate(d.getDate()+n); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
    const hub={ id:"sample", name:"Alex Sample", cefr:"B1", schedule:"Tuesdays and Thursdays, 7:00 PM", objective:"Feel confident speaking English in work meetings", kind:"pack",
      packs:[{ id:"p1", label:"Pack 36 créditos", size:36, unit:"credits", paid:"full", deadline:"in 3 months" }],
      classes:[
        { date:D(-21), topics:"Session Zero: getting to know you, your goals, your English Map", att:"Present", hour:"Standard", credits:3, pack:"p1" },
        { date:D(-17), topics:"Talking about your job: what you do, your team, a typical day", homework:"Write 5 sentences about your typical workday", att:"Present", hour:"Standard", credits:3, pack:"p1" },
        { date:D(-14), topics:"Past simple stories: your last weekend, regular and irregular verbs", homework:"Practice: Past simple, stage 1 on Hibi", att:"Present", hour:"Standard", credits:3, pack:"p1" },
        { date:D(-10), topics:"Meetings: giving your opinion politely (I think…, In my opinion…, I see your point, but…)", homework:"Watch a 5-minute video and write 3 opinions about it", att:"Present", hour:"Standard", credits:3, pack:"p1" },
        { date:D(-7), topics:"Role play: a short status update in a team meeting", att:"Present", hour:"Standard", credits:3, pack:"p1" },
        { date:D(-3), topics:"Small talk before a meeting: weekend plans, the weather, follow-up questions", homework:"Save 5 new expressions in My notebook", att:"Present", hour:"Standard", credits:3, pack:"p1" }],
      payments:[{ date:D(-22), what:"Pack 36 créditos", amount:"$264.000" }],
      focus:"1. Past simple in stories (I went, I saw, I didn't go)\n2. Asking follow-up questions in small talk\n3. Sounding polite when you disagree in meetings",
      words:[{ w:"to catch up", tr:"ponerse al día", ex:"Let's catch up after the meeting." },{ w:"to run late", tr:"ir atrasado", ex:"Sorry, I'm running a bit late." },{ w:"a heads-up", tr:"un aviso", ex:"Just a heads-up: the meeting moved to 3." },{ w:"to touch base", tr:"conversar brevemente", ex:"Let's touch base on Friday." },{ w:"to wrap up", tr:"terminar, cerrar", ex:"Let's wrap up with next steps." }],
      reports:[{ id:"rsample", from:D(-21), to:D(-3), sessions:6, snapshot:"Three weeks in and you already talk about your job for minutes at a time, without stopping to translate.",
        clicking:[{ win:"You tell stories with more past simple", example:"\"Last weekend I went to the beach and we ate seafood.\"" },{ win:"You ask more questions back", example:"\"And you? What did you do?\"" }],
        topics:["Your job","Past weekend stories","Meetings and opinions","Small talk"], patterns:["Sometimes \"I go\" instead of \"I went\" when you're telling a story fast."],
        focus:[{ area:"Irregular past verbs", tip:"Do the Irregular verbs flashcards for 5 minutes a day." }], closing:"Great start. Keep the 5-minutes-a-day habit and you'll feel the difference in a month.", lang:"en", at:D(-3) }],
      map:{ level:"B1", date:D(-21), where:"You can hold a real conversation about your work and your life. You understand most of what people say, and you get your message across, even when the grammar wobbles.",
        power:{ title:"You're not afraid to speak", quote:"I don't know the word, but it's like a meeting where everybody talks at the same time.", note:"When you don't know a word, you explain it. That's exactly what fluent speakers do." },
        focus:[{ t:"Past simple in stories", said:"Yesterday I go to the office", fix:"Yesterday I went to the office", tip:"Story about the past? Put the verb in the past. Every time.", mod:"ps", stage:1 },
          { t:"Follow-up questions", said:"Ok. Nice.", fix:"Oh nice! How was it?", tip:"Answer + one question back keeps any conversation going." },
          { t:"Polite disagreement", said:"No, that's wrong.", fix:"I see your point, but I think…", tip:"Soften first, then say what you think." }],
        route:[{ when:"In 1 month", what:"Tell a story about your weekend without stopping to translate" },{ when:"In 3 months", what:"Give your opinion in a team meeting with confidence" },{ when:"In 6 months", what:"Lead a short meeting in English" }],
        goal:"feel confident speaking English at work",
        routine:[{ k:"Read", v:"A short story at your level, 10 minutes" },{ k:"Listen", v:"A podcast on your way to work" },{ k:"Words", v:"5 new words in My notebook" },{ k:"Watch", v:"Your favorite series with English subtitles" }],
        how:"Two classes a week with a pack of 36 credits.", dayone:"Your first class is recorded as your starting point. In 3 months we'll listen to it together." } };
    return hub;
  }
  if(!g) return;
  window.__csGuest=g;
  if(g==="private"){ let sv=null;
    /* keep the sample in place even when the page later says "no account, no coaching" */
    const put=()=>{ if(!sv||window.__csHubView===sv) return; window.__csHubView=sv; window.__csClub=null; window.__csClubKnown=true; document.dispatchEvent(new CustomEvent("cs-hubview")); };
    window.__csSampleView().then(v=>{ sv=v; put(); }).catch(e=>console.warn("sample coaching",e));
    document.addEventListener("cs-hubview",()=>setTimeout(put,0)); }
  const SAMPLE_CLUB={info:{schedule:[{wd:1,ico:"🧠",name:"Deep Dive Monday",time:"20:00",dur:90,desc:"A thought-provoking topic, usually with a short video, then we talk about it."},{wd:3,ico:"🃏",name:"Wildcard Wednesday",time:"20:00",dur:90,desc:"Games and activities, pure speaking, no formal teaching."},{wd:4,ico:"💬",name:"Word Up Thursday",time:"20:00",dur:90,desc:"About 6 phrasal verbs, idioms or expressions on a theme, then conversation using them."},{wd:5,ico:"😎",name:"Free Talk Friday",time:"14:30",dur:60,host:"Laura",desc:"Relaxed conversation to close the week."}],links:[]},
    posts:[{id:"wsample",week:(()=>{ const d=new Date(), m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7)); return m.getFullYear()+"-"+String(m.getMonth()+1).padStart(2,"0")+"-"+String(m.getDate()).padStart(2,"0"); })(),title:"✨ This week in the club (sample)",intro:"This is a sample week, so you can see how the Club page looks. Real members see the real post and Zoom links here.",
      classes:[{day:"Mon",ico:"🐾",name:"Deep Dive Monday",title:"A sample topic",teaser:"One or two lines about the class."},{day:"Wed",ico:"🎤",name:"Wildcard Wednesday",title:"A sample game",teaser:"One or two lines about the class."},{day:"Thu",ico:"🐴",name:"Word Up Thursday",title:"Sample expressions",teaser:"One or two lines about the class."},{day:"Fri",ico:"😎",name:"Free Talk Friday",title:"with Laura",teaser:"Relaxed conversation to close the week."}],closing:"See you in class! 🫰🏻",
      challenge:{title:"The best advice you ever got",prompt:"In 3–5 sentences: what's the best advice someone gave you, and how did it change something for you? Try to use the past simple."},
      recap:{recordings:[{wd:1,title:"Deep Dive Monday",url:"https://zoom.us/",summary:"We watched a short video on why pets make us feel safe, then shared stories about our own animals (and a few dream pets)."}],notes:"Great energy on Monday! We talked about pets and why animals make us feel safe.",vocab:[{w:"to look after",tr:"cuidar",ex:"My sister looks after my dog when I travel."},{w:"down to earth",tr:"con los pies en la tierra",ex:"She's very down to earth."}],phrases:["It makes me feel…","I can relate to that","That's a good point"]}},
      {id:"wsample0",week:(()=>{ const d=new Date(), m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7)-7); return m.getFullYear()+"-"+String(m.getMonth()+1).padStart(2,"0")+"-"+String(m.getDate()).padStart(2,"0"); })(),title:"Last week (sample)",classes:[{day:"Mon",ico:"🧠",name:"Deep Dive Monday",title:"Habits"},{day:"Fri",ico:"😎",name:"Free Talk Friday",title:"with Laura"}],
      recap:{recordings:[{wd:5,title:"Free Talk Friday",url:"https://zoom.us/"}],vocab:[{w:"to make a habit of",tr:"acostumbrarse a",ex:"I'm trying to make a habit of reading at night."}]}}]};
  if(g==="club"){ const put=()=>{ if(!window.__csClub){ window.__csClub=SAMPLE_CLUB; document.dispatchEvent(new CustomEvent("cs-club")); } }; document.addEventListener("cs-club",()=>setTimeout(put,0)); setTimeout(put,300); }
  const bar=()=>{ if(document.getElementById("guestBar")) return; const d=document.createElement("div"); d.id="guestBar"; d.setAttribute("role","status");
    /* a slim strip at the very top of the page (not floating), so it never covers the buddy or anything else (Nov 22 2026) */
    d.style.cssText="position:relative;z-index:5;background:#1f2937;color:#fff;font:600 13px/1.35 system-ui,sans-serif;padding:7px 12px calc(7px);padding-top:calc(7px + env(safe-area-inset-top,0px));display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;text-align:center";
    d.innerHTML=`<style>#guestBar{flex-wrap:nowrap!important}@media(max-width:560px){#guestBar .gb-ns{display:none}}</style><span>👀 Preview${g==="club"?": club member (sample week)":g==="private"?": private student (sample)":""}<span class="gb-ns"> · nothing is saved</span></span><button type="button" style="all:unset;cursor:pointer;background:rgba(255,255,255,.18);padding:4px 10px;border-radius:999px">Exit</button>`;
    d.querySelector("button").onclick=()=>{ try{ sessionStorage.removeItem(K); }catch(e){} location.reload(); }; document.body.prepend(d); };
  if(document.body) bar(); else document.addEventListener("DOMContentLoaded",bar);
})();
/* Hibi is invite-only: people ask for access (name + email, no Google yet), Noa approves, then they sign in with Google.
   Signed in but not approved yet → a "waiting for Noa" screen. Approved = access/{email} exists (or a teacher). */
(function(){
  const unguess=()=>{ const d=document.documentElement; if(d.classList.contains("cs-out-guess")){ d.classList.remove("cs-out-guess"); d.style.background=""; } };
  if(window.__csPreview||window.__csGuest){ unguess(); return; }
  const G='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  /* the "Agenda tu Kickoff Session gratuita" Google Form (Nov 24 2026: so hibi.cl can be the only link in Noa's bios) */
  const BOOK_FORM="https://docs.google.com/forms/d/e/1FAIpQLSeCViQyPVfaAkFKJMKQ7NeCdHHDpIJU7-i5FAOT7WmqyrnXtw/viewform";
  const REQ_HOOK="https://formspree.io/f/xdegnkpp";   /* optional: a Formspree endpoint (https://formspree.io/f/xxxx) to also email Noa instantly */
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const OKK=u=>"cs-ok-"+u;
  let gate=null, mode="";
  /* Nov 24 2026: hibi.cl is now the only link in Noa's bios, so the sign-in window speaks to newcomers first (what Hibi is, book a kickoff,
     the club), then to students. EN / ES switch at the top right: everything shows in one language at a time (remembered on this device). */
  let LANG="en"; try{ LANG=localStorage.getItem("cs-gate-lang")||"en"; }catch(e){}
  const L=(en,es)=>LANG==="es"?es:en;
  const langSw=()=>`<div class="ag-lang" role="group" aria-label="Language / Idioma"><button type="button" data-aglang="en" aria-pressed="${LANG==="en"}">EN</button><button type="button" data-aglang="es" aria-pressed="${LANG==="es"}">ES</button></div>`;
  const LOGO=`<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>`;
  function card(m){ const F=window.__csFire, em=F&&F.email?F.email():"";
    if(m==="pending") return `${langSw()}${LOGO}
      <h2 id="agTitle">${L("Almost there!","¡Ya casi!")}</h2>
      <p>${L(`You’re signed in as <b>${esc(em)}</b>, but Noa hasn’t opened Hibi for this email yet.`,`Iniciaste sesión como <b>${esc(em)}</b>, pero Noa aún no ha abierto Hibi para este correo.`)}</p>
      ${reqForm(em,true)}
      <button type="button" class="ag-link" data-agout>${L("Use another Google account","Usar otra cuenta de Google")}</button>`;
    if(m==="retry") return `${langSw()}${LOGO}
      <h2 id="agTitle">${L("Hmm, Hibi couldn’t connect","Hmm, Hibi no pudo conectarse")}</h2><p>${L("Check your internet connection and try again.","Revisa tu conexión a internet e inténtalo de nuevo.")}</p>
      <button type="button" class="ag-btn" data-agretry>${L("Try again","Intentar de nuevo")}</button>
      <button type="button" class="ag-link" data-agout>${L("Use another Google account","Usar otra cuenta de Google")}</button>`;
    if(m==="sent") return `${langSw()}${LOGO}
      <h2 id="agTitle">${L("Thanks! 🙌","¡Gracias! 🙌")}</h2><p>${L("Noa got your request. He’ll email you as soon as you’re in (usually within a day). Then come back and sign in with Google using <b>the same email</b>.","Noa recibió tu solicitud. Te escribirá apenas estés dentro (normalmente en menos de un día). Luego vuelve e inicia sesión con Google usando <b>el mismo correo</b>.")}</p>
      <button type="button" class="ag-btn ag-alt" data-signin>${G}<span>${L("I’m approved: continue with Google","Ya me aprobaron: continuar con Google")}</span></button>`;
    return landing(); }
  /* Nov 24 2026: the signed-out page is a real landing page (option D, "Noa first"): hibi.cl is the only link in Noa's bios, so it sells
     the classes first (who Noa is, the free kickoff, the club), shows Hibi, real student quotes, then sign-in and "ask for access".
     Same buttons as before: data-signin, data-agjoin (access form with "joining the club" picked), #agNew + reqForm, the EN/ES switch. */
  const IMG=n=>new URL("img/lp/"+n+".jpg",document.baseURI).href;
  const IG="https://instagram.com/learnwithnoa";
  /* light by default (Noa, Nov 24 2026); dark only if this device already chose a dark Hibi theme, or the visitor taps 🌙 */
  function lpDark(){ let th=""; try{ th=localStorage.getItem("ncs-theme")||""; }catch(e){} return !!th&&!["light","unicorn","sepia"].includes(th); }
  document.addEventListener("click",e=>{ if(!e.target.closest("[data-lpmode]")||!gate) return; const t=lpDark()?"light":"dark";
    try{ localStorage.setItem("ncs-theme",t); }catch(er){} document.documentElement.setAttribute("data-theme",t);
    const st=gate.scrollTop, det=gate.querySelector("#agNew"), op=det&&det.open; const cur=mode; mode=""; show(cur); gate.scrollTop=st; const d2=gate.querySelector("#agNew"); if(d2&&op) d2.open=true; });
  function landing(){
    const quote=(img,name,sub,story,q,c)=>`<figure class="lp-q lp-glass" style="--c:${c}"><figcaption class="lp-who"><img src="${IMG(img)}" alt="" loading="lazy" width="56" height="56"><span><b>${name}</b><small>${sub}</small></span></figcaption><p class="lp-story">${story}</p><blockquote>${q}</blockquote></figure>`;
    const feat=(e,c,t,d)=>`<div class="lp-shot lp-glass" style="--c:${c}"><div class="lp-scr" aria-hidden="true">${e}</div><b>${t}</b><span>${d}</span></div>`;
    const faq=(q,a)=>`<details class="lp-faq lp-glass"><summary>${q}</summary><p>${a}</p></details>`;
    const dark=lpDark();
    return `<div class="lp${dark?" lp-dark":""}">
    <span class="lp-blob" style="left:-120px;top:40px;background:#60A5FA"></span><span class="lp-blob" style="right:-140px;top:560px;background:#5EEAD4"></span><span class="lp-blob" style="left:-150px;top:1700px;background:#FBBF24"></span>
    <header class="lp-top"><span class="lp-logo">Hibi<small lang="ja">日々</small></span><span class="lp-sp"></span>${langSw()}<button type="button" class="lp-mode" data-lpmode aria-label="${dark?L("Switch to light mode","Cambiar a modo claro"):L("Switch to dark mode","Cambiar a modo oscuro")}" title="${dark?L("Light mode","Modo claro"):L("Dark mode","Modo oscuro")}">${dark?"☀️":"🌙"}</button><button type="button" class="lp-pill lp-go" data-signin>${L("Student sign in","Entrar")}</button></header>
    <main class="lp-main">
    <section class="lp-hero">
      <div class="lp-hero-pic"><div class="lp-face"><img src="${IMG("noa")}" alt="${L("Noa at his desk","Noa en su escritorio")}" width="240" height="240"><span class="lp-bubble lp-glass" aria-hidden="true">hi! 👋</span></div></div>
      <div class="lp-hero-txt">
      <h1 id="agTitle">${L(`Speak English without <span class="lp-ul">freezing.</span>`,`Habla inglés sin <span class="lp-ul">congelarte.</span>`)}</h1>
      <p class="lp-lede">${L("I’m Noa, an English coach from Florida living in Santiago. 1:1 classes, a conversation club, and Hibi, my own app to practice a little every day.","Soy Noa, coach de inglés de Florida y vivo en Santiago. Clases 1:1, un club de conversación y Hibi, mi propia app para practicar un poco cada día.")}</p>
      <a class="lp-btn lp-amber" href="${BOOK_FORM}" target="_blank" rel="noopener">${L("Book a free 30-minute kickoff","Agenda tu kickoff gratis de 30 minutos")}</a>
      <p class="lp-small">${L("For 1:1 classes. On Zoom, no cost, no commitment.","Para clases 1:1. Por Zoom, sin costo y sin compromiso.")}</p>
      <p class="lp-proof"><span class="lp-faces" aria-hidden="true"><img src="${IMG("mel")}" alt=""><img src="${IMG("kiki")}" alt=""><img src="${IMG("gia")}" alt=""><img src="${IMG("lau")}" alt=""></span>${L("Students in Chile and abroad","Estudiantes en Chile y otros países")}</p>
      </div>
    </section>
    <div class="lp-stats lp-glass" aria-label="${L("About Noa","Sobre Noa")}"><div><b>10+ ${L("years","años")}</b><span>${L("coaching English, since 2014","como coach de inglés, desde 2014")}</span></div><div><b>TEFL</b><span>${L("certified coach","coach certificado")}</span></div><div><b>AuDHD</b><span>${L("neurodivergent-friendly classes","clases amigables con la neurodivergencia")}</span></div></div>

    <section class="lp-sec"><h2>${L("Sound familiar?","¿Te suena?")}</h2>
      <div class="lp-pains">
        <div class="lp-pain lp-glass"><i aria-hidden="true">😶</i><span>${L("You understand everything, but when it’s your turn to talk, nothing comes out.","Entiendes todo, pero cuando te toca hablar, no te sale nada.")}</span></div>
        <div class="lp-pain lp-glass"><i aria-hidden="true">📝</i><span>${L("Years of grammar classes, and you still translate in your head.","Años de clases de gramática, y todavía traduces en tu cabeza.")}</span></div>
        <div class="lp-pain lp-glass"><i aria-hidden="true">⏰</i><span>${L("An interview, an exam or a trip is coming, and you need it now.","Se viene una entrevista, un examen o un viaje, y lo necesitas ya.")}</span></div>
      </div>
      <div class="lp-fix"><b>${L("That’s what we fix.","Eso es lo que arreglamos.")}</b>${L("Lots of speaking, the grammar you actually need, and a little practice every day on Hibi so it sticks. And if your brain works a little differently, mine does too: we’ll find the way that works for you.","Mucha conversación, la gramática que de verdad necesitas y un poco de práctica cada día en Hibi para que se quede. Y si tu cerebro funciona un poco distinto, el mío también: vamos a encontrar la forma que funcione para ti.")}</div>
    </section>

    <section class="lp-sec"><h2>${L("Pick your way in","Elige cómo empezar")}</h2>
      <div class="lp-progs">
      <div class="lp-prog lp-glass" style="--c:var(--lp-orange);--g:linear-gradient(90deg,#FBBF24,#F97316)"><span class="lp-tag">${L("1:1 COACHING","COACHING 1:1")}</span><h3>${L("Classes built around you","Clases hechas para ti")}</h3>
        <p class="lp-for">${L("For a goal (a job interview, a move abroad, IELTS or TOEFL) or just to speak with more fluency and confidence. Beginners welcome.","Para una meta (una entrevista de trabajo, irte a vivir afuera, el IELTS o el TOEFL) o simplemente para hablar con más fluidez y seguridad. Desde nivel principiante.")}</p>
        <ul><li>${L("45-minute classes on Zoom, all recorded","Clases de 45 minutos por Zoom, todas grabadas")}</li><li>${L("Test prep for IELTS, TOEFL and other exams","Preparación para IELTS, TOEFL y otros exámenes")}</li><li>${L("A recap with exercises on Hibi after every class","Un resumen con ejercicios en Hibi después de cada clase")}</li><li>${L("A progress report every 3 weeks","Un reporte de progreso cada 3 semanas")}</li></ul>
        <div class="lp-wk lp-steps"><span class="d">1</span><span>📅 ${L("Free kickoff","Kickoff gratis")}</span><span class="t">30 min</span><span class="d">2</span><span>🎯 ${L("Your goal and your plan","Tu meta y tu plan")}</span><span class="t">${L("together","juntos")}</span><span class="d">3</span><span>🎓 ${L("Classes at your own times","Clases en tus horarios")}</span><span class="t">${L("Mon–Fri","lun–vie")}</span><span class="d">4</span><span>📱 ${L("Practice between classes","Práctica entre clases")}</span><span class="t">Hibi</span></div>
        <a class="lp-btn lp-amber" href="${BOOK_FORM}" target="_blank" rel="noopener">${L("Book a free kickoff","Agenda tu kickoff gratis")}</a>
        <p class="lp-price">${L("From $100.000 CLP / US$110 a month · 15% off your first pack","Desde $100.000 CLP / US$110 al mes · 15% de descuento en tu primer pack")}</p></div>
      <div class="lp-prog lp-glass" style="--c:var(--lp-teal);--g:linear-gradient(90deg,#34D399,#0D9488)"><span class="lp-tag">NOA’S ENGLISH CLUB</span><h3>${L("Speak more, every week","Habla más, cada semana")}</h3>
        <p class="lp-for">${L("Live conversation classes on Zoom with people at your level (B1 to C1). Chile time.","Clases de conversación en vivo por Zoom con gente de tu nivel (B1 a C1). Hora de Chile.")}</p>
        <ul><li>${L("4 live classes a week, with breakout rooms so everyone talks","4 clases en vivo por semana, con breakout rooms para que todos hablen")}</li><li>${L("Every class recorded, in the club Library on Hibi","Cada clase grabada, en la Biblioteca del club en Hibi")}</li><li>${L("The new words from each class, ready to save in your notebook","Las palabras nuevas de cada clase, listas para guardar en tu cuaderno")}</li><li>${L("A weekly podcast that recaps the club’s classes","Un podcast semanal que resume las clases del club")}</li></ul>
        <div class="lp-wk lp-wk4"><span class="d">${L("MON","LUN")}</span><span>🧠 Deep Dive</span><span class="t">8:00 pm</span><span class="m">90 min</span><span class="d">${L("WED","MIÉ")}</span><span>🃏 Wildcard</span><span class="t">8:00 pm</span><span class="m">90 min</span><span class="d">${L("THU","JUE")}</span><span>💬 Word Up</span><span class="t">8:00 pm</span><span class="m">90 min</span><span class="d">${L("FRI","VIE")}</span><span>😎 Free Talk</span><span class="t">2:30 pm</span><span class="m">60 min</span></div>
        <button type="button" class="lp-btn lp-green" data-agjoin>${L("Try the club free for 2 weeks","Prueba el club gratis por 2 semanas")}</button>
        <p class="lp-price">${L("Then $35.000 CLP / US$35 a month · cancel anytime","Después $35.000 CLP / US$35 al mes · cancelas cuando quieras")}</p></div>
      </div>
    </section>

    <section class="lp-sec"><h2>${L("And between classes: Hibi","Y entre clases: Hibi")}</h2><p class="lp-sub">${L("Included for every student and club member.","Incluido para cada estudiante y miembro del club.")}</p>
      <div class="lp-show">
        ${feat("📒","#3B82F6",L("My notebook","Mi cuaderno"),L("Save any word from class. Hibi fills in the meaning and turns them into flashcards.","Guarda cualquier palabra de la clase. Hibi completa el significado y la convierte en flashcards."))}
        ${feat("🧩","#14B8A6",L("Grammar in stages","Gramática por etapas"),L("Short rounds that start easy and get harder, explained in English and Spanish.","Rondas cortas que empiezan fácil y se ponen más difíciles, explicadas en inglés y español."))}
        ${feat("🎓","#F59E0B",L("Your classes","Tus clases"),L("Recaps, homework and recordings, all in one place.","Resúmenes, tareas y grabaciones, todo en un solo lugar."))}
        ${feat("🐣","#A78BFA",L("A study buddy","Un compañero de estudio"),L("Practice and it grows, earns toys and decorates its room.","Practica y crece, gana juguetes y decora su pieza."))}
      </div>
    </section>

    <section class="lp-sec"><h2>${L("Don’t take my word for it","No me creas a mí")}</h2>
      <div class="lp-quotes">
        ${quote("mel","Melissa",L("1:1 classes + the club","Clases 1:1 + el club"),
          L("Came in at an A2 level needing a 4.5 on the IELTS to move abroad. Eight 1:1 classes and a lot of club practice later, she got a 6.0.","Llegó con nivel A2 y necesitaba un 4.5 en el IELTS para irse a vivir afuera. Ocho clases 1:1 y mucha práctica en el club después, sacó un 6.0."),
          L("Thank you for everything. I haven’t stopped crying, I’m so, so happy!","Gracias por tanto, no he parado de llorar, estoy más feliz que la cresta."),"var(--lp-orange)")}
        ${quote("kiki","Kiki",L("1:1 classes","Clases 1:1"),
          L("Takes 1:1 classes around a busy work schedule.","Toma clases 1:1 entre un trabajo con mucha pega."),
          L("What I value most about Noa’s classes is his patience. Because of work I sometimes can’t do the homework, and he always says, in the best way: “No problem, today we can do something else.” That makes me feel supported. He knows so much: grammar, how to use words, pronunciation… and he explains things really clearly. I’ve had soooo many English teachers, but Noa is the best. Totally recommended!",
            "Lo que más valoro de las clases con Noa es su paciencia y tolerancia. Por motivos laborales a veces no puedo hacer las tareas, pero él siempre me dice con toda la buena onda: “No hay problema, hoy podemos hacer otra cosa”. Eso lo agradezco un montón porque me hace sentir acompañada en el proceso. Además, sabe muchísimo inglés… tiene una forma muy clara de explicar. He tenido muuuchos profes de inglés pero Noa el mejor, ¡totalmente recomendable!"),"var(--lp-pink)")}
        ${quote("gia","Giacomo","Noa’s English Club",
          L("Joined the club to speak more, and has even guest-hosted a Deep Dive Monday.","Se unió al club para hablar más, y hasta ha sido anfitrión invitado de un Deep Dive Monday."),
          L("I’ve been able to improve my fluency and have long conversations.","He podido mejorar mi fluidez y tener conversaciones largas."),"var(--lp-royal)")}
        ${quote("lau","Laura",L("1:1 classes + the club","Clases 1:1 + el club"),
          L("Hadn’t spoken English in years. Today she hosts Free Talk Friday for the club.","No hablaba inglés hace años. Hoy dirige Free Talk Friday en el club."),
          L("I felt kind of rusty. Sometimes I felt stuck. One day, I made up my mind… I think that I pushed the on button. In the club you forget that everything is being recorded: we are all on the same page. Nowadays I feel confident. My advice? Try to explain it with the words you already know.",
            "Me sentía un poco oxidada. A veces me quedaba pegada. Un día me decidí… creo que apreté el botón de encendido. En el club te olvidas de que todo se está grabando: todos estamos en la misma. Hoy me siento segura. ¿Mi consejo? Trata de explicarlo con las palabras que ya sabes."),"var(--lp-teal)")}
      </div>
    </section>

    <section class="lp-sec lp-faqs"><h2>${L("Questions","Preguntas")}</h2>
      ${faq(L("How much do classes cost?","¿Cuánto cuestan las clases?"),L("<b>1:1 coaching:</b> plans start at $100.000 CLP or US$110 a month, depending on how many classes a week you take, and you get 15% off your first pack. We pick the right plan together in your free kickoff.<br><br><b>Noa’s English Club:</b> your first 2 weeks are free, no card needed. After that it’s $35.000 CLP or US$35 a month (or $210.000 CLP / US$210 for a whole year). You pay on Hibi with Mercado Pago or PayPal, and you can cancel anytime: you keep the club until the end of the month you paid for.","<b>Coaching 1:1:</b> los planes parten en $100.000 CLP o US$110 al mes, según cuántas clases por semana tomes, y tienes 15% de descuento en tu primer pack. Elegimos el plan juntos en tu kickoff gratis.<br><br><b>Noa’s English Club:</b> tus primeras 2 semanas son gratis, sin tarjeta. Después son $35.000 CLP o US$35 al mes (o $210.000 CLP / US$210 por todo el año). Pagas en Hibi con Mercado Pago o PayPal, y cancelas cuando quieras: sigues en el club hasta el final del mes que pagaste."))}
      ${faq(L("Do I need a good level to start?","¿Necesito un buen nivel para empezar?"),L("No. 1:1 classes work for every level, beginners included: we start exactly where you are and go at your pace. The club is best from B1, when you can already hold a simple conversation. Not sure where you are? That’s one of the things we figure out in the kickoff.","No. Las clases 1:1 sirven para todos los niveles, también principiante: partimos justo donde estás y vamos a tu ritmo. El club es ideal desde B1, cuando ya puedes mantener una conversación simple. ¿No sabes en qué nivel estás? Eso es una de las cosas que vemos en el kickoff."))}
      ${faq(L("What happens in the kickoff?","¿Qué pasa en el kickoff?"),L("It’s a relaxed 30-minute chat on Zoom. You tell me what you want English for (a job, an exam, a trip, or just feeling comfortable speaking), I hear where your English is right now, and I explain how I’d help you get there. Then you decide if it’s for you. It’s free and you don’t need to prepare anything.","Es una conversación relajada de 30 minutos por Zoom. Me cuentas para qué quieres el inglés (un trabajo, un examen, un viaje o simplemente sentirte cómodo hablando), escucho cómo está tu inglés hoy y te explico cómo te ayudaría a llegar. Después tú decides si es para ti. Es gratis y no necesitas preparar nada."))}
      ${faq(L("Where are the classes, and what do I need?","¿Dónde son las clases y qué necesito?"),L("Everything is online, on Zoom, so you can join from anywhere: students take classes from Chile and from abroad. A computer is best, but a phone works too. Club classes run on Chile time, and 1:1 classes are at times that work for you, Monday to Friday.","Todo es online, por Zoom, así que te puedes unir desde donde estés: hay estudiantes en Chile y en otros países. Lo ideal es un computador, pero un celular también sirve. Las clases del club son en hora de Chile, y las clases 1:1 son en los horarios que te acomoden, de lunes a viernes."))}
      ${faq(L("What’s Hibi, and can I sign up myself?","¿Qué es Hibi y puedo registrarme yo?"),L("Hibi is the study app I made for my students: your saved words and flashcards, grammar practice in short stages, your class recaps and recordings, the club’s schedule and Library, and a study buddy that grows when you practice. It’s included with 1:1 classes and the club. For now it’s invite-only: ask for an account below and I open it, usually the same day.","Hibi es la app de estudio que hice para mis estudiantes: tus palabras guardadas y flashcards, práctica de gramática en etapas cortas, los resúmenes y grabaciones de tus clases, el horario y la Biblioteca del club, y un compañero de estudio que crece cuando practicas. Viene incluida con las clases 1:1 y el club. Por ahora es solo por invitación: pide una cuenta más abajo y la abro, normalmente el mismo día."))}
    </section>

    <section class="lp-end lp-glass"><h2>${L("Your first step is free","Tu primer paso es gratis")}</h2><p>${L("30 minutes on Zoom. Bring your goal, I’ll bring the plan.","30 minutos por Zoom. Tú traes tu meta, yo traigo el plan.")}</p>
      <a class="lp-btn lp-amber" href="${BOOK_FORM}" target="_blank" rel="noopener">${L("Book a free kickoff","Agenda tu kickoff gratis")}</a></section>

    <section class="lp-in lp-glass"><h2>${L("Already a student?","¿Ya eres estudiante?")}</h2><p>${L("Sign in with Google and pick up where you left off.","Entra con Google y sigue donde quedaste.")}</p>
      <button type="button" class="ag-btn lp-g" data-signin>${G}<span>${L("Continue with Google","Continuar con Google")}</span></button>
      <p class="ag-msg" id="agMsg" role="alert" hidden></p>
      <details class="ag-new" id="agNew"><summary>${L("New here? Ask Noa for access","¿Eres nuevo? Pide acceso a Noa")}</summary>
      <p>${L("Noa will email you when you’re in, and then you sign in with Google.","Noa te escribirá cuando estés dentro, y luego entras con Google.")}</p>
      ${reqForm("",false)}</details>
      <p class="ag-small">${L("Hibi only uses your name and email to save your progress. Noa never sees your password.","Hibi solo usa tu nombre y correo para guardar tu progreso. Noa nunca ve tu contraseña.")}</p></section>
    </main>
    <footer class="lp-foot">Hibi <span lang="ja">日々</span> · ${L("made by Noa","hecho por Noa")} · <a href="${IG}" target="_blank" rel="noopener">@learnwithnoa</a></footer>
    </div>`; }
  function reqForm(em,signed){ return `<form class="ag-form" data-agreq>
      <label>${L("Your name","Tu nombre")}<input name="name" required maxlength="80" autocomplete="name"></label>
      <label>${L("Your email","Tu correo")} <small>${L("(the Google account you’ll sign in with)","(la cuenta de Google con la que entrarás)")}</small><input name="email" type="email" required maxlength="120" autocomplete="email" value="${esc(em)}" ${signed?"readonly":""}></label>
      <label>${L("I’m…","Soy…")}<select name="who" required><option value="" disabled selected>${L("Choose one","Elige una opción")}</option><option value="club">${L("In Noa’s English Club","Del Noa’s English Club")}</option><option value="private">${L("Taking private classes with Noa","Alumno de clases privadas con Noa")}</option><option value="joining">${L("Interested in joining the club","Me interesa unirme al club")}</option><option value="other">${L("Other","Otro")}</option></select></label>
      <label>${L("Anything to add?","¿Algo más?")} <small>${L("(optional)","(opcional)")}</small><textarea name="msg" rows="2" maxlength="500"></textarea></label>
      <button type="submit" class="ag-btn ag-send">${L("Ask for access","Pedir acceso")}</button><p class="ag-fmsg" role="status"></p></form>`; }
  /* EN / ES */
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-aglang]"); if(!b||!gate) return; LANG=b.dataset.aglang; try{ localStorage.setItem("cs-gate-lang",LANG); }catch(er){}
    const det=gate.querySelector("#agNew"), op=det&&det.open; const cur=mode; mode=""; show(cur); const d2=gate.querySelector("#agNew"); if(d2&&op) d2.open=true; });
  /* "Ask to join →": open the access form with "Interested in joining the club" already picked */
  document.addEventListener("click",e=>{ if(!e.target.closest("[data-agjoin]")||!gate) return; const d=gate.querySelector("#agNew"); if(!d) return; d.open=true; const sel=d.querySelector('select[name="who"]'); if(sel) sel.value="joining"; d.scrollIntoView({behavior:"smooth",block:"start"}); const n=d.querySelector('input[name="name"]'); if(n) setTimeout(()=>n.focus({preventScroll:true}),350); });
  function show(m){
    if(window.__csPreview) return;
    if(!gate){ gate=document.createElement("div"); gate.id="authGate"; gate.setAttribute("role","dialog"); gate.setAttribute("aria-modal","true"); gate.setAttribute("aria-labelledby","agTitle"); document.body.appendChild(gate); }
    if(mode!==m||!gate.innerHTML){ mode=m; const lp=!["pending","retry","sent"].includes(m); gate.classList.toggle("ag-lp",lp); gate.innerHTML=lp?card(m):`<div class="ag-card">${card(m)}</div>`; }
    gate.hidden=false; document.documentElement.classList.add("ag-lock");
    [...document.body.children].forEach(el=>{ if(el!==gate&&!el.matches("script")) el.inert=true; });
  }
  function hide(){
    unguess(); if(gate) gate.hidden=true; document.documentElement.classList.remove("ag-lock");
    [...document.body.children].forEach(el=>{ if(el!==gate) el.inert=false; });
  }
  /* approved? (access/{email}); if the database can't say (e.g. rules not set up yet), let them in */
  /* "yes" | "no" | "unknown" (couldn't reach the database) */
  async function approved(){ const F=window.__csFire; if(!F||!F.email) return "unknown"; const em=String(F.email()||"").toLowerCase(); if(!em) return "unknown";
    if(window.__csTeacher===true||em==="learnwithnoa@gmail.com") return "yes";
    for(let i=0;i<3;i++){
      try{ const tok=await F.token(); const r=await fetch(F.base+"/access/"+encodeURIComponent(em),{headers:{Authorization:"Bearer "+tok}});
        if(r.status===404) return "no";
        if(r.ok){ const d=await r.json().catch(()=>({})); const g=d&&d.fields&&d.fields.gone; return g&&g.booleanValue?"no":"yes"; }
        if(r.status===403) return "no";
      }catch(e){}
      await new Promise(f=>setTimeout(f,1500*(i+1)));
    }
    return "unknown"; }
  /* the sync (cloud.js) waits for this before touching anyone's data: window.__csGateWait(uid) -> true/false */
  const GW={}; const gw=uid=>GW[uid]||(GW[uid]=(()=>{ let res; const p=new Promise(f=>res=f); p.res=res; return p; })());
  window.__csGateWait=uid=>{ const p=gw(uid); return Promise.race([p,new Promise(f=>setTimeout(()=>f(false),30000))]); };
  async function check(){ const F=window.__csFire, uid=F&&F.uid?F.uid():""; let cached=false; try{ const c=+localStorage.getItem(OKK(uid)); cached=c===1||(c>1&&Date.now()-c<30*864e5); }catch(e){}
    if(cached) hide();
    const st=await approved();
    if(st==="yes"){ try{ localStorage.setItem(OKK(uid),String(Date.now())); }catch(e){} hide(); gw(uid).res(true); return; }
    if(st==="no"){ try{ localStorage.removeItem(OKK(uid)); }catch(e){} show("pending"); gw(uid).res(false); return; }
    /* couldn't check: someone approved on this device recently keeps going; anyone else waits */
    if(cached){ gw(uid).res(true); return; }
    show("retry"); gw(uid).res(false); }
  const on=s=>{ if(s) check(); else show(mode==="sent"?"sent":"out"); };
  if(document.documentElement.classList.contains("cs-out-guess")&&window.__csAuth==null){ const go=()=>{ if(window.__csAuth==null&&!mode) show("out"); }; if(document.body) go(); else document.addEventListener("DOMContentLoaded",go); }
  document.addEventListener("click",e=>{ if(e.target.closest("[data-agretry]")) location.reload(); });
  window.addEventListener("cs-auth",e=>on(!!(e.detail&&e.detail.signedIn)));
  if(window.__csAuth!=null) on(window.__csAuth);
  document.addEventListener("submit",async e=>{ const f=e.target.closest("[data-agreq]"); if(!f) return; e.preventDefault(); const F=window.__csFire, msg=f.querySelector(".ag-fmsg"), btn=f.querySelector("button");
    const d={name:f.name.value.trim(),email:f.email.value.trim().toLowerCase(),who:f.who.value,msg:f.msg.value.trim()};
    if(!d.name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){ msg.textContent=L("Please add your name and a valid email.","Agrega tu nombre y un correo válido."); return; }
    if(!F||!F.base){ msg.textContent=L("Hibi is still loading. Try again in a moment.","Hibi todavía está cargando. Inténtalo en un momento."); return; }
    const ALREADY=L("You already asked with this email 🙌 Noa will email you as soon as you’re in, so there’s no need to send it again.","Ya enviaste tu solicitud con este correo 🙌 Noa te escribirá apenas estés dentro, así que no hace falta enviarla de nuevo.");
    let asked=[]; try{ asked=JSON.parse(localStorage.getItem("cs-areq")||"[]")||[]; }catch(er){}
    if(asked.includes(d.email)){ msg.textContent=ALREADY; return; }
    btn.disabled=true; msg.textContent=L("Sending…","Enviando…");
    const S=v=>({stringValue:String(v)}), body=JSON.stringify({fields:{name:S(d.name),email:S(d.email),who:S(d.who),msg:S(d.msg),at:{integerValue:String(Date.now())}}});
    const remember=()=>{ try{ localStorage.setItem("cs-areq",JSON.stringify(asked.concat(d.email).slice(-5))); }catch(er){} };
    try{ /* one request per email: the email is the document id, so asking twice is refused by the database */
      let r=await fetch(F.base+"/accessRequests?documentId="+encodeURIComponent(d.email)+"&key="+encodeURIComponent(F.key||""),{method:"POST",headers:{"Content-Type":"application/json"},body});
      if(r.status===409){ remember(); btn.disabled=false; msg.textContent=ALREADY; return; }
      if(!r.ok) r=await fetch(F.base+"/accessRequests?key="+encodeURIComponent(F.key||""),{method:"POST",headers:{"Content-Type":"application/json"},body});
      if(!r.ok) throw new Error(r.status); }
    catch(er){ btn.disabled=false; msg.textContent=L("That didn’t go through. Try again, or message Noa on Instagram (@learnwithnoa).","No se pudo enviar. Inténtalo de nuevo o escríbele a Noa por Instagram (@learnwithnoa)."); return; }
    remember();
    if(REQ_HOOK) fetch(REQ_HOOK,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.assign({_subject:"🙋 Hibi access request: "+d.name},d))}).catch(()=>{});
    mode=""; show("sent"); });
  document.addEventListener("click",async e=>{ if(!e.target.closest("[data-agout]")) return; try{ const b=document.getElementById("signOut")||document.querySelector("[data-signout]"); if(b){ b.click(); return; } }catch(er){} if(window.csSignOut) window.csSignOut(); });
})();
