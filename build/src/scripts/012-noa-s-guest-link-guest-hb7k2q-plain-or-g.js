
/* Noa's guest link: ?guest=hb7k2q (plain) or ?guest=hb7k2q&as=club (club member with a sample week) skips the sign-in screen in that tab */
(function(){
  const K="cs-guest";
  try{ const q=new URLSearchParams(location.search); if(q.get("guest")==="hb7k2q"){ sessionStorage.setItem(K,q.get("as")==="club"?"club":"plain"); history.replaceState(null,"",location.pathname+(location.hash||"")); } }catch(e){}
  let g=null; try{ g=sessionStorage.getItem(K); }catch(e){}
  if(g&&window.__csViewAsMode){ try{ sessionStorage.removeItem(K); }catch(e){} g=null; }  /* "View as" a real student = their real data, never the guest samples */
  if(!g) return;
  window.__csGuest=g;
  const SAMPLE_CLUB={info:{schedule:[{wd:1,ico:"🧠",name:"Deep Dive Monday",time:"20:00",dur:90,desc:"A thought-provoking topic, usually with a short video, then we talk about it."},{wd:3,ico:"🃏",name:"Wildcard Wednesday",time:"20:00",dur:90,desc:"Games and activities, pure speaking, no formal teaching."},{wd:4,ico:"💬",name:"Word Up Thursday",time:"20:00",dur:90,desc:"About 6 phrasal verbs, idioms or expressions on a theme, then conversation using them."},{wd:5,ico:"😎",name:"Free Talk Friday",time:"14:30",dur:60,host:"Laura",desc:"Relaxed conversation to close the week."}],links:[]},
    posts:[{id:"wsample",week:(()=>{ const d=new Date(), m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7)); return m.getFullYear()+"-"+String(m.getMonth()+1).padStart(2,"0")+"-"+String(m.getDate()).padStart(2,"0"); })(),title:"✨ This week in the club (sample)",intro:"This is a sample week, so you can see how the Club page looks. Real members see the real post and Zoom links here.",
      classes:[{day:"Mon",ico:"🐾",name:"Deep Dive Monday",title:"A sample topic",teaser:"One or two lines about the class."},{day:"Wed",ico:"🎤",name:"Wildcard Wednesday",title:"A sample game",teaser:"One or two lines about the class."},{day:"Thu",ico:"🐴",name:"Word Up Thursday",title:"Sample expressions",teaser:"One or two lines about the class."},{day:"Fri",ico:"😎",name:"Free Talk Friday",title:"with Laura",teaser:"Relaxed conversation to close the week."}],closing:"See you in class! 🫰🏻",
      challenge:{title:"The best advice you ever got",prompt:"In 3–5 sentences: what's the best advice someone gave you, and how did it change something for you? Try to use the past simple."},
      recap:{recordings:[{wd:1,title:"Deep Dive Monday",url:"https://zoom.us/",summary:"We watched a short video on why pets make us feel safe, then shared stories about our own animals (and a few dream pets)."}],notes:"Great energy on Monday! We talked about pets and why animals make us feel safe.",vocab:[{w:"to look after",tr:"cuidar",ex:"My sister looks after my dog when I travel."},{w:"down to earth",tr:"con los pies en la tierra",ex:"She's very down to earth."}],phrases:["It makes me feel…","I can relate to that","That's a good point"]}},
      {id:"wsample0",week:(()=>{ const d=new Date(), m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7)-7); return m.getFullYear()+"-"+String(m.getMonth()+1).padStart(2,"0")+"-"+String(m.getDate()).padStart(2,"0"); })(),title:"Last week (sample)",classes:[{day:"Mon",ico:"🧠",name:"Deep Dive Monday",title:"Habits"},{day:"Fri",ico:"😎",name:"Free Talk Friday",title:"with Laura"}],
      recap:{recordings:[{wd:5,title:"Free Talk Friday",url:"https://zoom.us/"}],vocab:[{w:"to make a habit of",tr:"acostumbrarse a",ex:"I'm trying to make a habit of reading at night."}]}}]};
  if(g==="club"){ const put=()=>{ if(!window.__csClub){ window.__csClub=SAMPLE_CLUB; document.dispatchEvent(new CustomEvent("cs-club")); } }; document.addEventListener("cs-club",()=>setTimeout(put,0)); setTimeout(put,300); }
  const bar=()=>{ if(document.getElementById("guestBar")) return; const d=document.createElement("div"); d.id="guestBar"; d.setAttribute("role","status");
    d.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:99999;background:#1f2937;color:#fff;font:600 13px system-ui,sans-serif;padding:8px 10px 8px 14px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.3);display:flex;gap:10px;align-items:center;max-width:calc(100vw - 24px)";
    d.innerHTML=`<span>👀 Guest preview${g==="club"?" · club member (sample week)":""} · nothing is saved to an account</span><button type="button" style="all:unset;cursor:pointer;background:rgba(255,255,255,.18);padding:4px 10px;border-radius:999px">Exit</button>`;
    d.querySelector("button").onclick=()=>{ try{ sessionStorage.removeItem(K); }catch(e){} location.reload(); }; document.body.appendChild(d); };
  if(document.body) bar(); else document.addEventListener("DOMContentLoaded",bar);
})();
/* Hibi is invite-only: people ask for access (name + email, no Google yet), Noa approves, then they sign in with Google.
   Signed in but not approved yet → a "waiting for Noa" screen. Approved = access/{email} exists (or a teacher). */
(function(){
  if(window.__csPreview||window.__csGuest) return;
  const G='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  const REQ_HOOK="https://formspree.io/f/xdegnkpp";   /* optional: a Formspree endpoint (https://formspree.io/f/xxxx) to also email Noa instantly */
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const OKK=u=>"cs-ok-"+u;
  let gate=null, mode="";
  function card(m){ const F=window.__csFire, em=F&&F.email?F.email():"";
    if(m==="pending") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>
      <h2 id="agTitle">Almost there!</h2>
      <p>You’re signed in as <b>${esc(em)}</b>, but Noa hasn’t opened Hibi for this email yet.</p>
      <p class="ag-es" lang="es">Iniciaste sesión, pero Noa aún no ha aprobado este correo.</p>
      ${reqForm(em,true)}
      <button type="button" class="ag-link" data-agout>Use another Google account</button>`;
    if(m==="retry") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>
      <h2 id="agTitle">Hmm, Hibi couldn’t connect</h2><p>Check your internet connection and try again.</p>
      <p class="ag-es" lang="es">Hibi no pudo conectarse. Revisa tu conexión a internet e inténtalo de nuevo.</p>
      <button type="button" class="ag-btn" data-agretry>Try again</button>
      <button type="button" class="ag-link" data-agout>Use another Google account</button>`;
    if(m==="sent") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>
      <h2 id="agTitle">Thanks! 🙌</h2><p>Noa got your request. He’ll email you as soon as you’re in (usually within a day). Then come back and sign in with Google using <b>the same email</b>.</p>
      <p class="ag-es" lang="es">¡Gracias! Noa recibió tu solicitud y te escribirá cuando estés dentro. Luego vuelve e inicia sesión con Google usando el mismo correo.</p>
      <button type="button" class="ag-btn ag-alt" data-signin>${G}<span>I’m approved: continue with Google</span></button>`;
    return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>
      <h2 id="agTitle">Hibi is for Noa’s students</h2>
      <p><b>Already a student or club member?</b> Just sign in with the Google account Noa added.</p>
      <p class="ag-es" lang="es">¿Ya eres alumno o del club? Entra con tu cuenta de Google.</p>
      <button type="button" class="ag-btn" data-signin>${G}<span>Continue with Google</span></button>
      <p class="ag-msg" id="agMsg" role="alert" hidden></p>
      <details class="ag-new"><summary>New here? Ask Noa for access</summary>
      <p>Noa will email you when you’re in, and then you sign in with Google.</p>
      <p class="ag-es" lang="es">¿Eres nuevo? Pide acceso aquí: Noa te escribirá cuando estés dentro.</p>
      ${reqForm("",false)}</details>
      <p class="ag-small">Hibi only uses your name and email to save your progress. Noa never sees your password.</p>`; }
  function reqForm(em,signed){ return `<form class="ag-form" data-agreq>
      <label>Your name<input name="name" required maxlength="80" autocomplete="name"></label>
      <label>Your email <small>(the Google account you’ll sign in with)</small><input name="email" type="email" required maxlength="120" autocomplete="email" value="${esc(em)}" ${signed?"readonly":""}></label>
      <label>I’m…<select name="who" required><option value="" disabled selected>Choose one</option><option value="club">In Noa’s English Club</option><option value="private">Taking private classes with Noa</option><option value="joining">Interested in joining</option><option value="other">Other</option></select></label>
      <label>Anything to add? <small>(optional)</small><textarea name="msg" rows="2" maxlength="500"></textarea></label>
      <button type="submit" class="ag-btn ag-send">Ask for access</button><p class="ag-fmsg" role="status"></p></form>`; }
  function show(m){
    if(window.__csPreview) return;
    if(!gate){ gate=document.createElement("div"); gate.id="authGate"; gate.setAttribute("role","dialog"); gate.setAttribute("aria-modal","true"); gate.setAttribute("aria-labelledby","agTitle"); document.body.appendChild(gate); }
    if(mode!==m||!gate.innerHTML){ mode=m; gate.innerHTML=`<div class="ag-card">${card(m)}</div>`; }
    gate.hidden=false; document.documentElement.classList.add("ag-lock");
    [...document.body.children].forEach(el=>{ if(el!==gate&&!el.matches("script")) el.inert=true; });
  }
  function hide(){
    if(gate) gate.hidden=true; document.documentElement.classList.remove("ag-lock");
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
  document.addEventListener("click",e=>{ if(e.target.closest("[data-agretry]")) location.reload(); });
  window.addEventListener("cs-auth",e=>on(!!(e.detail&&e.detail.signedIn)));
  if(window.__csAuth!=null) on(window.__csAuth);
  document.addEventListener("submit",async e=>{ const f=e.target.closest("[data-agreq]"); if(!f) return; e.preventDefault(); const F=window.__csFire, msg=f.querySelector(".ag-fmsg"), btn=f.querySelector("button");
    const d={name:f.name.value.trim(),email:f.email.value.trim().toLowerCase(),who:f.who.value,msg:f.msg.value.trim()};
    if(!d.name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){ msg.textContent="Please add your name and a valid email."; return; }
    if(!F||!F.base){ msg.textContent="Hibi is still loading. Try again in a moment."; return; }
    const ALREADY="You already asked with this email 🙌 Noa will email you as soon as you’re in, so there’s no need to send it again. / Ya enviaste tu solicitud con este correo: Noa te escribirá apenas estés dentro.";
    let asked=[]; try{ asked=JSON.parse(localStorage.getItem("cs-areq")||"[]")||[]; }catch(er){}
    if(asked.includes(d.email)){ msg.textContent=ALREADY; return; }
    btn.disabled=true; msg.textContent="Sending…";
    const S=v=>({stringValue:String(v)}), body=JSON.stringify({fields:{name:S(d.name),email:S(d.email),who:S(d.who),msg:S(d.msg),at:{integerValue:String(Date.now())}}});
    const remember=()=>{ try{ localStorage.setItem("cs-areq",JSON.stringify(asked.concat(d.email).slice(-5))); }catch(er){} };
    try{ /* one request per email: the email is the document id, so asking twice is refused by the database */
      let r=await fetch(F.base+"/accessRequests?documentId="+encodeURIComponent(d.email)+"&key="+encodeURIComponent(F.key||""),{method:"POST",headers:{"Content-Type":"application/json"},body});
      if(r.status===409){ remember(); btn.disabled=false; msg.textContent=ALREADY; return; }
      if(!r.ok) r=await fetch(F.base+"/accessRequests?key="+encodeURIComponent(F.key||""),{method:"POST",headers:{"Content-Type":"application/json"},body});
      if(!r.ok) throw new Error(r.status); }
    catch(er){ btn.disabled=false; msg.textContent="That didn’t go through. Try again, or message Noa on Instagram (@learnwithnoa)."; return; }
    remember();
    if(REQ_HOOK) fetch(REQ_HOOK,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.assign({_subject:"🙋 Hibi access request: "+d.name},d))}).catch(()=>{});
    mode=""; show("sent"); });
  document.addEventListener("click",async e=>{ if(!e.target.closest("[data-agout]")) return; try{ const b=document.getElementById("signOut")||document.querySelector("[data-signout]"); if(b){ b.click(); return; } }catch(er){} if(window.csSignOut) window.csSignOut(); });
})();
