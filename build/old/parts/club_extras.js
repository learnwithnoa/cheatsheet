  /* ================= club extras: buddies as avatars, profiles & badges, member bell, @mentions, polls, RSVPs, weekly challenge, reports ================= */
  let FOCUS=null, PICKS={};
  const LSG=(k,d)=>{ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v); }catch(e){ return d; } };
  const LSS=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
  const toast=m=>{ if(typeof window.toast==="function") window.toast(m); };
  const first=n=>String(n||"").trim().split(/\s+/)[0]||"";
  /* everyone's buddy, from the Buddy park */
  let PARK=null, parkP=null;
  function loadPark(){ if(PARK) return Promise.resolve(PARK); if(parkP) return parkP;
    parkP=(async()=>{ try{ const P=window.__csPark; const list=P&&P.list?await Promise.race([P.list(),new Promise(r=>setTimeout(()=>r(null),4000))]):null; PARK=list||[]; }catch(e){ PARK=[]; }
      const myU=me(); PARK.forEach(x=>{ const u=x.me?myU:x.uid; if(u&&x.a&&x.on!==false) PARKMAP[u]=x; }); parkP=null; return PARK; })(); return parkP; }
  /* ---------- profiles (clubProfiles/{uid}) and attendance (clubStats/{uid}, written by Noa's nightly helper) ---------- */
  const SAMPLE_PROFS=[{id:NOA,uid:NOA,name:"Noa",about:"Your English coach 🌼 Coffee, dogs and bad puns.",country:"Chile",since:Date.now()-200*864e5,posts:12,comments:40,ch:0},{id:"x3",uid:"x3",name:"Laura P.",about:"Day-one member. I love travel podcasts.",country:"Chile",since:Date.now()-180*864e5,posts:6,comments:22,ch:3},{id:"x2",uid:"x2",name:"Daniel S.",about:"Engineer, learning for work.",country:"Chile",since:Date.now()-60*864e5,posts:2,comments:11,ch:1},{id:"x1",uid:"x1",name:"Valentina R.",about:"",country:"Argentina",since:Date.now()-9*864e5,posts:1,comments:2,ch:0}];
  const SAMPLE_STATS={x3:{weeks:wk(-5,0)},x2:{weeks:wk(-2,0)},x1:{weeks:wk(0,0)}};
  function wk(a,b){ const out=[], d=new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); for(let i=a;i<=b;i++){ const x=new Date(d); x.setDate(d.getDate()+7*i); out.push(iso(x)); } return out; }
  function iso(x){ return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); }
  let PROFS=null, STATS=null, profOK=true;
  async function loadProfs(force){ if(G()){ PROFS=SAMPLE_PROFS; STATS=SAMPLE_STATS; return PROFS; } if(PROFS&&!force) return PROFS;
    try{ const r=await api("GET","/clubProfiles?pageSize=300"); PROFS=((r&&r.documents)||[]).map(fromDoc); profOK=true; }catch(e){ PROFS=PROFS||[]; profOK=false; }
    try{ const r=await api("GET","/clubStats?pageSize=300"); STATS={}; ((r&&r.documents)||[]).forEach(d=>{ const o=fromDoc(d); STATS[o.id]=o; }); }catch(e){ STATS=STATS||{}; }
    return PROFS; }
  const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;
  async function saveMe(patch){ if(G()||!me()) return; const cur=profOf(me())||{};
    const data={about:cur.about||"",country:cur.country||"",since:cur.since||Date.now(),badges:cur.badges||[],posts:cur.posts|0,comments:cur.comments|0,ch:cur.ch|0};
    Object.assign(data,patch||{});
    await api("PATCH","/clubProfiles/"+me(),{fields:{uid:S(me()),name:S(F().name()||""),at:I(Date.now()),json:S(JSON.stringify(data))}});
    const o=Object.assign({id:me(),uid:me(),name:F().name()},data); PROFS=(PROFS||[]).filter(x=>x.id!==me()).concat([o]); return o; }
  async function bump(d){ if(G()||!me()) return; try{ await loadProfs(); const cur=profOf(me())||{}; const p={}; for(const k in d) p[k]=(cur[k]|0)+d[k]; await saveMe(p); checkBadges(); }catch(e){} }
  let meDone=false;
  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;
    try{ await loadProfs(); const cur=profOf(me()); if(!profOK) return;
      const posts=(POSTS||[]).filter(p=>p.uid===me()).length;
      if(!cur||cur.name!==F().name()||posts>(cur.posts|0)) await saveMe(posts>((cur&&cur.posts)|0)?{posts}:{});
      checkBadges(); }catch(e){} }
  function treat(n,why){ try{ if(window.csBuddy&&window.csBuddy.treat&&window.csBuddy.treat(n,why)) return; }catch(e){} toast(why); }
  /* streaks: weeks in a row with at least one class */
  function weekStats(weeks){ const ws=[...new Set(weeks||[])].sort(); let best=0, run=0, prev=null;
    ws.forEach(w=>{ const t=new Date(w+"T12:00:00").getTime(); run=prev!=null&&Math.round((t-prev)/(7*864e5))===1?run+1:1; best=Math.max(best,run); prev=t; });
    const thisW=wk(0,0)[0], lastW=wk(-1,-1)[0], cur=ws.length&&(ws[ws.length-1]===thisW||ws[ws.length-1]===lastW)?run:0;
    return {classes:ws.length,best,cur}; }
  function statsOf(u){ const p=profOf(u)||{}, st=weekStats(((STATS||{})[u]||{}).weeks); const pick=Object.values(PICKS).filter(id=>{ const x=(POSTS||[]).find(y=>y.id===id); return x&&x.uid===u; }).length;
    const posts=Math.max(p.posts|0,(POSTS||[]).filter(x=>x.uid===u).length);
    return Object.assign({posts,comments:p.comments|0,ch:p.ch|0,pick},st); }
  const BADGES=[
    ["hello","👋","First post","Primer post","Wrote your first post on the wall","Tu primer post en el muro",s=>s.posts>=1],
    ["chat","💬","Chatterbox","Conversador","10 comments","10 comentarios",s=>s.comments>=10],
    ["chal","✍️","Challenger","Desafiante","Took a weekly challenge","Hiciste un desafío semanal",s=>s.ch>=1],
    ["chal5","🖋️","Writer","Escritor","5 weekly challenges","5 desafíos semanales",s=>s.ch>=5],
    ["star","⭐","Noa’s pick","Elegido por Noa","Noa picked your challenge answer","Noa eligió tu respuesta",s=>s.pick>=1],
    ["first","🎟️","First class","Primera clase","Came to your first club class","Viniste a tu primera clase",s=>s.classes>=1],
    ["fire","🔥","On fire","En racha","3 weeks of classes in a row","3 semanas seguidas de clases",s=>s.best>=3],
    ["medal","🏅","Regular","Habitual","4 weeks in a row","4 semanas seguidas",s=>s.best>=4],
    ["grad","🎓","Ten weeks","Diez semanas","Classes in 10 different weeks","Clases en 10 semanas distintas",s=>s.classes>=10]];
  const earned=u=>{ const s=statsOf(u); return BADGES.filter(b=>b[6](s)); };
  function checkBadges(){ if(G()||!me()) return; const got=earned(me()).map(b=>b[0]), key="cs-club-badges-"+me(), had=LSG(key,null);
    if(had===null){ LSS(key,got); syncBadges(got); return; }  /* first time on this device: no fanfare for old badges */
    const fresh=got.filter(b=>!had.includes(b)); if(!fresh.length){ syncBadges(got); return; }
    LSS(key,got); syncBadges(got);
    fresh.forEach((id,i)=>{ const b=BADGES.find(x=>x[0]===id); setTimeout(()=>treat(5,`${b[1]} ${L("New badge:","Nueva insignia:")} <b>${esc(L(b[2],b[3]))}</b>!`),400+i*2500); }); }
  function syncBadges(got){ const cur=profOf(me()); if(cur&&JSON.stringify(cur.badges||[])!==JSON.stringify(got)) saveMe({badges:got}).catch(()=>{}); }
  /* your little strip on "This week": streak + badges */
  async function mountMe(el){ el.dataset.on="1"; if(!me()&&!G()) return; await Promise.all([loadProfs(),POSTS?null:listPosts().then(p=>{ POSTS=p; }).catch(()=>{}),loadPins()]);
    const u=G()?"x3":me(), s=statsOf(u), bs=earned(u);
    el.innerHTML=`<button type="button" class="cl-mestrip" data-prof="${esc(u)}">${s.cur>=2?`<span class="cl-streak">🔥 ${s.cur} ${L("weeks in a row","semanas seguidas")}</span>`:s.classes?`<span>🎟️ ${s.classes} ${s.classes===1?L("week of classes","semana de clases"):L("weeks of classes","semanas de clases")}</span>`:`<span>👋 ${L("Come to a class this week to start your streak","Ven a una clase esta semana y empieza tu racha")}</span>`}<span class="cl-mebadges">${bs.map(b=>`<i title="${esc(L(b[2],b[3]))}">${b[1]}</i>`).join("")||`<small>${L("No badges yet","Aún sin insignias")}</small>`}</span><span class="cl-mego">${L("My profile","Mi perfil")} →</span></button>`; }
  /* ---------- Members tab: directory ---------- */
  async function mountMembers(el){ el.dataset.on="1"; el.innerHTML=`<p class="cs-load">${L("Loading…","Cargando…")}</p>`;
    await Promise.all([loadProfs(true),loadPark(),loadPins(),POSTS?null:listPosts().then(p=>{ POSTS=p; }).catch(()=>{})]);
    let list=(PROFS||[]).slice();
    (POSTS||[]).forEach(p=>{ if(p.uid&&!list.some(x=>x.id===p.uid)) list.push({id:p.uid,uid:p.uid,name:p.name}); });
    list.sort((a,b)=>(b.id===NOA)-(a.id===NOA)||(b.id===me())-(a.id===me())||String(a.name).localeCompare(String(b.name)));
    el.innerHTML=`<p class="cl-mintro">${L("Everyone in the club on Hibi. Tap someone to see their profile, buddy and badges.","Todos los del club en Hibi. Toca a alguien para ver su perfil, su buddy y sus insignias.")}</p>
      ${!profOK&&!G()?`<p class="cs-off">${L("Profiles are almost ready. They’ll switch on very soon.","Los perfiles están casi listos. Se activan muy pronto.")}</p>`:""}
      <div class="cl-mgrid">${list.map(x=>{ const s=statsOf(x.id), bs=earned(x.id), bd=PARKMAP[x.id];
        return `<button type="button" class="cl-mcard${x.id===me()?" me":""}" data-prof="${esc(x.id)}" data-pname="${esc(x.name||"")}"><span class="cl-mav">${av(x.id,x.name)}</span><b>${esc(x.name||L("Member","Miembro"))}${x.id===me()?` <small>(${L("you","tú")})</small>`:""}</b>
          <span class="cl-msub">${x.id===NOA?L("Teacher","Profe"):[bd&&(bd.cefr||(bd.role&&bd.role.lv))?"📊 "+esc(String(bd.cefr||bd.role.lv).slice(0,7)):"",x.country?esc(x.country):""].filter(Boolean).join(" · ")}</span>
          ${s.cur>=2?`<span class="cl-mstreak">🔥 ${s.cur}</span>`:""}<span class="cl-mbadges">${bs.slice(-5).map(b=>`<i title="${esc(L(b[2],b[3]))}">${b[1]}</i>`).join("")}</span></button>`; }).join("")}</div>`; }
  /* ---------- profile popup ---------- */
  async function openProfile(u,nm){ if(!u) return; await Promise.all([loadProfs(),loadPark()]);
    const p=profOf(u)||{name:nm}, bd=PARKMAP[u], s=statsOf(u), got=earned(u).map(b=>b[0]), mine=u===(G()?"":me());
    const svg=bd&&window.csBuddy?(bd.me&&window.csBuddy.portrait?window.csBuddy.portrait():window.csBuddy.of(bd)):"";
    const bn=bd?(bd.n&&String(bd.n).trim())||"":"";
    const lv=bd&&(bd.cefr||(bd.role&&bd.role.lv));
    const since=p.since?new Date(p.since).toLocaleDateString(L("en-US","es-CL"),{month:"long",year:"numeric"}):"";
    const o=document.createElement("div"); o.className="cl-prof-ov"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label",L("Profile","Perfil"));
    o.innerHTML=`<div class="cl-prof"><button type="button" class="cl-prof-x" data-pclose="1" aria-label="${L("Close","Cerrar")}">✕</button>
      <div class="cl-prof-top">${svg?`<div class="cl-prof-bd">${svg}</div>`:`<div class="cl-prof-bd cl-prof-ini">${av(u,p.name||nm)}</div>`}<div><h2>${esc(p.name||nm||L("Member","Miembro"))}</h2>
        <p class="cl-prof-meta">${u===NOA?`<span class="cs-noa">${L("Teacher","Profe")}</span>`:""}${lv?`<span>📊 ${esc(String(lv).slice(0,7))}</span>`:""}${p.country?`<span>📍 ${esc(p.country)}</span>`:""}${since?`<span>🌼 ${L("Member since","Miembro desde")} ${esc(since)}</span>`:""}</p>
        ${bn?`<p class="cl-prof-bn">${L("Buddy:","Buddy:")} <b>${esc(bn)}</b>${bd&&bd.lvl>1?` · 💛 ${bd.lvl|0}`:""}</p>`:""}</div></div>
      <div class="cl-prof-about" data-pabout>${p.about?`<p>${esc(p.about)}</p>`:mine?`<p class="muted">${L("Tell the club a bit about you.","Cuéntale al club un poco sobre ti.")}</p>`:""}</div>
      ${mine?`<button type="button" class="cs-act" data-pedit="1">✏️ ${L("Edit my profile","Editar mi perfil")}</button>`:""}
      <div class="cl-prof-stats"><div><b>${s.cur||0}</b><span>🔥 ${L("week streak","semanas seguidas")}</span></div><div><b>${s.classes}</b><span>🎟️ ${L("weeks of classes","semanas con clases")}</span></div><div><b>${s.posts}</b><span>📝 ${L("posts","posts")}</span></div><div><b>${s.comments}</b><span>💬 ${L("comments","comentarios")}</span></div><div><b>${s.ch}</b><span>✍️ ${L("challenges","desafíos")}</span></div></div>
      <h3>${L("Badges","Insignias")}</h3><div class="cl-prof-badges">${BADGES.filter(b=>mine||got.includes(b[0])).map(b=>`<div class="cl-badge${got.includes(b[0])?"":" off"}"><span>${b[1]}</span><b>${esc(L(b[2],b[3]))}</b><small>${esc(L(b[4],b[5]))}</small></div>`).join("")||`<p class="muted">${L("No badges yet.","Aún no tiene insignias.")}</p>`}</div>
      ${mine?`<p class="cl-prof-tip">${L("Each new badge gives your buddy 5 treats 🍪","Cada insignia nueva le da 5 galletas a tu buddy 🍪")}</p>`:""}</div>`;
    document.body.appendChild(o); o.querySelector(".cl-prof-x").focus();
    o.addEventListener("click",async e=>{ if(e.target===o||e.target.closest("[data-pclose]")){ o.remove(); return; }
      if(e.target.closest("[data-pedit]")){ const box=o.querySelector("[data-pabout]"), cur=profOf(me())||{}; e.target.closest("[data-pedit]").hidden=true;
        box.innerHTML=`<label class="cl-pf">${L("About me","Sobre mí")}<textarea maxlength="200" rows="3">${esc(cur.about||"")}</textarea></label><label class="cl-pf">${L("Where are you from?","¿De dónde eres?")}<input type="text" maxlength="40" value="${esc(cur.country||"")}"></label><div class="cs-row"><span class="cs-msg" role="status"></span><button type="button" class="cs-send" data-psave="1">${L("Save","Guardar")}</button></div>`; box.querySelector("textarea").focus(); return; }
      if(e.target.closest("[data-psave]")){ const box=o.querySelector("[data-pabout]"); const about=box.querySelector("textarea").value.trim(), country=box.querySelector("input").value.trim();
        try{ await saveMe({about,country}); }catch(er){ box.querySelector(".cs-msg").textContent=L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo."); return; }
        o.remove(); openProfile(me()); toast(L("Profile saved ✓","Perfil guardado ✓")); document.querySelectorAll(".cl-members[data-on='1']").forEach(x=>{ x.dataset.on=""; mountMembers(x); }); } });
  }
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ document.querySelector(".cl-prof-ov")?.remove(); document.getElementById("clBellPanel")?.setAttribute("hidden",""); } });
  /* ---------- notifications for members (clubNotes, addressed to one person) ---------- */
  async function note(to,kind,pid,text){ if(!to||to===me()||G()||!me()) return; try{ await api("POST","/clubNotes?documentId="+rid(),{fields:{uid:S(me()),name:S(F().name()||""),to:S(to),kind:S(kind),pid:S(pid||""),text:S(String(text||"").slice(0,120)),at:I(Date.now())}}); }catch(e){} }
  const BSEEN="cs-clbell-seen";
  let NOTES=[], bellT=0;
  const SAMPLE_NOTES=[{id:"n1",name:"Laura P.",kind:"comment",pid:"s1",text:"Great question! I use Culips.",at:H(1)},{id:"n2",name:"Daniel S.",kind:"react",pid:"s1",text:"❤️",at:H(4)},{id:"n3",name:"Noa",kind:"mention",pid:"s2",text:"@Valentina welcome to the club!",at:H(30)}];
  async function loadNotes(){ if(G()){ NOTES=SAMPLE_NOTES; return; } if(!me()) return;
    try{ const res=await api("POST",":runQuery",{structuredQuery:{from:[{collectionId:"clubNotes"}],where:{fieldFilter:{field:{fieldPath:"to"},op:"EQUAL",value:S(me())}},limit:200}});
      const all=(res||[]).filter(x=>x.document).map(x=>fromDoc(x.document)); const old=Date.now()-30*864e5;
      all.filter(n=>n.at<old).slice(0,20).forEach(n=>api("DELETE","/clubNotes/"+n.id).catch(()=>{}));  /* tidy up after a month */
      NOTES=all.filter(n=>n.at>=old).sort((a,b)=>b.at-a.at).slice(0,40); }catch(e){ NOTES=NOTES||[]; } }
  function noteTxt(n){ const nm=`<b>${esc(n.name||L("Someone","Alguien"))}</b>`, weekly=/^w\d{8}$/.test(n.pid||"");
    if(n.kind==="comment") return `💬 ${nm} ${L("commented on your post","comentó tu post")}`;
    if(n.kind==="react") return `${esc(String(n.text||"").split(" ")[0]||"❤️")} ${nm} ${L("reacted to your post","reaccionó a tu post")}`;
    if(n.kind==="reactc") return `${esc(String(n.text||"").split(" ")[0]||"❤️")} ${nm} ${L("reacted to your comment","reaccionó a tu comentario")}`;
    if(n.kind==="mention") return `@ ${nm} ${L("mentioned you","te mencionó")}${weekly?L(" on the weekly post"," en el post semanal"):""}`;
    return `🔔 ${nm}`; }
  function paintBell(){ const b=document.getElementById("clBell"); if(!b) return; const seen=+LSG(BSEEN,0)||0, n=NOTES.filter(x=>x.at>seen).length;
    b.classList.toggle("has",!!n); const c=b.querySelector(".clb-n"); c.hidden=!n; c.textContent=n>9?"9+":String(n);
    b.setAttribute("aria-label",L("Club notifications","Notificaciones del club")+(n?` (${n})`:""));
    const pn=document.getElementById("clBellPanel"); if(!pn||pn.hidden) return;
    pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Club notifications","Notificaciones del club")}</b></div>${NOTES.length?`<ul>${NOTES.map(x=>`<li><button type="button" class="clb-i${x.at>(+pn.dataset.seen||0)?" new":""}" data-bgo="${esc(x.pid||"")}"><span>${noteTxt(x)}${x.text&&!/^react/.test(x.kind)?`<small>“${esc(x.text)}”</small>`:""}</span><em>${ago(x.at)}</em></button></li>`).join("")}</ul>`:`<p class="clb-e">${L("Nothing yet. When someone replies to you, reacts to your posts or mentions you, it shows up here.","Nada aún. Cuando alguien te responda, reaccione a tus posts o te mencione, aparece aquí.")}</p>`}`; }
  function buildBell(){ if(document.getElementById("clBellWrap")) return; const anchor=document.getElementById("tmWrap")||document.getElementById("csWrap"); if(!anchor||!anchor.parentNode) return;
    const w=document.createElement("div"); w.id="clBellWrap"; w.className="clb-wrap"; w.hidden=true;
    w.innerHTML=`<button type="button" id="clBell" class="clb-btn" aria-expanded="false" aria-controls="clBellPanel" title="${L("Club notifications","Notificaciones del club")}">🔔<span class="clb-n" hidden></span></button><div id="clBellPanel" class="clb-panel" hidden></div>`;
    anchor.parentNode.insertBefore(w,anchor);
    w.querySelector("#clBell").addEventListener("click",async()=>{ const pn=document.getElementById("clBellPanel"), open=pn.hidden; pn.hidden=!open; w.querySelector("#clBell").setAttribute("aria-expanded",String(open));
      if(open){ pn.dataset.seen=String(+LSG(BSEEN,0)||0); paintBell(); await loadNotes(); paintBell(); if(!G()) LSS(BSEEN,Date.now()); setTimeout(paintBell,0); } else paintBell(); });
    document.addEventListener("click",e=>{ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden&&!e.target.closest("#clBellWrap")){ pn.hidden=true; document.getElementById("clBell")?.setAttribute("aria-expanded","false"); paintBell(); } }); }
  function bellCheck(){ const fd=window.__clubFeed&&window.__clubFeed(), on=!!fd&&(G()||(!!me()&&me()!==NOA))&&!window.__csPreview; buildBell(); const w=document.getElementById("clBellWrap"); if(!w) return; w.hidden=!on;
    if(on&&Date.now()-bellT>150000){ bellT=Date.now(); loadNotes().then(paintBell); } }
  ["cs-club","cs-hubview"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(bellCheck,50))); window.addEventListener("cs-auth",()=>setTimeout(bellCheck,300));
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden) bellCheck(); }); setInterval(()=>{ if(!document.hidden) bellCheck(); },60000); setTimeout(bellCheck,800);
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-bgo]"); if(!g) return; const pid=g.dataset.bgo; document.getElementById("clBellPanel").hidden=true; paintBell();
    if(location.hash!=="#club") location.hash="#club";
    setTimeout(()=>{ if(/^w\d{8}$/.test(pid)||!pid){ window.__clubTab&&window.__clubTab("week"); setTimeout(()=>document.querySelector(".cl-thread")?.scrollIntoView({block:"start",behavior:"smooth"}),500); } else { FOCUS=pid; window.__clubTab&&window.__clubTab("wall"); } },60); });
  /* ---------- @mentions: suggestions while typing, and who to notify ---------- */
  function people(){ const m=new Map(); (PROFS||[]).forEach(p=>m.set(p.id,p.name)); (POSTS||[]).forEach(p=>{ if(p.uid&&!m.has(p.uid)) m.set(p.uid,p.name); }); Object.values(COMM).flat().forEach(c=>{ if(c.uid&&!m.has(c.uid)) m.set(c.uid,c.name); }); m.delete(me()); return [...m].map(([uid,name])=>({uid,name})).filter(x=>x.name); }
  function mentionsIn(form,text){ const at=form._at||{}, out=new Set(), ppl=people();
    (String(text).match(/(^|\s)@([A-Za-zÁÉÍÓÚÑáéíóúñü]+)/g)||[]).forEach(m=>{ const w=m.trim().slice(1); if(at[w]){ out.add(at[w]); return; } const hit=ppl.filter(p=>first(p.name).toLowerCase()===w.toLowerCase()); if(hit.length===1) out.add(hit[0].uid); });
    out.delete(me()); return [...out]; }
  document.addEventListener("input",async e=>{ const ta=e.target.closest(".cs-comp textarea"); if(!ta) return; const box=ta.parentElement.querySelector(".cs-ment"); if(!box) return;
    const before=ta.value.slice(0,ta.selectionStart), m=before.match(/(^|\s)@([A-Za-zÁÉÍÓÚÑáéíóúñü]*)$/); if(!m){ box.hidden=true; return; }
    if(!PROFS) await loadProfs(); const q=m[2].toLowerCase(), list=people().filter(p=>p.name.toLowerCase().split(/\s+/).some(w=>w.startsWith(q))).slice(0,6);
    if(!list.length){ box.hidden=true; return; } box._q=m[2]; box.innerHTML=list.map((p,i)=>`<button type="button" role="option" class="cs-mi${i?"":" on"}" data-mpick="${esc(p.uid)}" data-mname="${esc(first(p.name))}">${av(p.uid,p.name)}<span>${esc(p.name)}</span></button>`).join(""); box.hidden=false; });
  function pickMention(btn){ const box=btn.closest(".cs-ment"), ta=box.parentElement.querySelector("textarea"), form=ta.closest("form"), nm=btn.dataset.mname;
    const pos=ta.selectionStart, before=ta.value.slice(0,pos).replace(/@([A-Za-zÁÉÍÓÚÑáéíóúñü]*)$/,"@"+nm+" "); ta.value=before+ta.value.slice(pos); ta.focus(); ta.setSelectionRange(before.length,before.length);
    form._at=form._at||{}; form._at[nm]=btn.dataset.mpick; box.hidden=true; }
  document.addEventListener("keydown",e=>{ const ta=e.target.closest(".cs-comp textarea"); if(!ta) return; const box=ta.parentElement.querySelector(".cs-ment"); if(!box||box.hidden) return;
    const items=[...box.querySelectorAll(".cs-mi")], i=items.findIndex(x=>x.classList.contains("on"));
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){ e.preventDefault(); const j=(i+(e.key==="ArrowDown"?1:-1)+items.length)%items.length; items.forEach((x,k)=>x.classList.toggle("on",k===j)); }
    else if(e.key==="Enter"||e.key==="Tab"){ if(items[i]){ e.preventDefault(); e.stopPropagation(); pickMention(items[i]); } }
    else if(e.key==="Escape"){ box.hidden=true; } },true);
  /* ---------- polls and RSVPs (clubVotes: one doc per person per poll) ---------- */
  const VOTES={};
  const SAMPLE_VOTES={"p_s3":[{uid:"a",opt:"0",name:"Ana"},{uid:"b",opt:"1",name:"Pedro"},{uid:"c",opt:"0",name:"Laura P."},{uid:"d",opt:"2",name:"Gus"}]};
  async function votes(poll,force){ if(G()) return VOTES[poll]||(VOTES[poll]=(SAMPLE_VOTES[poll]||(/^r_/.test(poll)?[{uid:"x3",name:"Laura P.",opt:"1,5"},{uid:"x2",name:"Daniel S.",opt:"1"},{uid:"x1",name:"Valentina R.",opt:"3,5"}]:[])).slice());
    if(VOTES[poll]&&!force) return VOTES[poll];
    const res=await api("POST",":runQuery",{structuredQuery:{from:[{collectionId:"clubVotes"}],where:{fieldFilter:{field:{fieldPath:"poll"},op:"EQUAL",value:S(poll)}},limit:300}});
    return VOTES[poll]=(res||[]).filter(x=>x.document).map(x=>fromDoc(x.document)); }
  async function vote(poll,opt){ const id=poll+"_"+(G()?"me":me()), list=VOTES[poll]||[]; const mine=G()?"me":me();
    VOTES[poll]=list.filter(v=>v.uid!==mine).concat(opt==null||opt===""?[]:[{uid:mine,name:G()?"You":F().name(),opt:String(opt),poll}]);
    if(G()) return;
    if(opt==null||opt==="") await api("DELETE","/clubVotes/"+id); else await api("PATCH","/clubVotes/"+id,{fields:{uid:S(me()),name:S(F().name()||""),poll:S(poll),opt:S(String(opt)),at:I(Date.now())}}); }
  function pollHTML(p,list){ const opts=p.poll.opts, mineU=G()?"me":me(), vs=list||[], tot=vs.length, mine=vs.find(v=>v.uid===mineU), c=opts.map((_,i)=>vs.filter(v=>v.opt===String(i)).length), voted=!!mine;
    return `<div class="cs-pollq">${list==null?`<p class="cs-load">${L("Loading votes…","Cargando votos…")}</p>`:""}${opts.map((o,i)=>{ const pc=tot?Math.round(c[i]*100/tot):0, me_=mine&&mine.opt===String(i);
      return `<button type="button" class="cs-popt${me_?" on":""}${voted?" shown":""}" data-vote="${esc(p.id)}" data-opt="${i}" aria-pressed="${!!me_}"><span class="cs-pbar" style="width:${voted?pc:0}%"></span><span class="cs-ptxt">${me_?"✓ ":""}${esc(o)}</span>${voted?`<span class="cs-ppc">${pc}%</span>`:""}</button>`; }).join("")}
      <div class="cs-pfoot">${tot} ${tot===1?L("vote","voto"):L("votes","votos")}${voted?` · ${L("tap your answer again to undo","toca tu respuesta otra vez para deshacer")}`:` · ${L("vote to see the results","vota para ver los resultados")}`}</div></div>`; }
  function paintPolls(root){ root.querySelectorAll(".cs-poll[data-poll]").forEach(async el=>{ const p=(POSTS||[]).find(x=>x.id===el.dataset.poll); if(!p||!p.poll) return;
    try{ el.innerHTML=pollHTML(p,await votes("p_"+p.id)); }catch(e){ el.innerHTML=pollHTML(p,[]); el.insertAdjacentHTML("beforeend",`<p class="cs-off">${L("Voting opens very soon.","La votación se abre muy pronto.")}</p>`); } }); }
  function readPoll(form){ const pb=form.querySelector(".cs-pollbox"); if(!pb||pb.hidden) return null; const opts=[...pb.querySelectorAll("input")].map(i=>i.value.trim()).filter(Boolean);
    if(opts.length<2) return {err:L("Add at least 2 options.","Agrega al menos 2 opciones.")}; return {opts:opts.slice(0,6)}; }
  const optIn=(i)=>`<input type="text" maxlength="80" placeholder="${L("Option","Opción")} ${i}" aria-label="${L("Option","Opción")} ${i}">`;
  /* RSVPs: "I'm going" on each class of this week */
  function rsvpHTML(week,wd,list){ const mineU=G()?"me":me(), going=list.filter(v=>String(v.opt||"").split(",").includes(String(wd))), on=going.some(v=>v.uid===mineU);
    return `<button type="button" class="cl-going${on?" on":""}" data-rsvpgo="${esc(week)}" data-wd="${wd}" aria-pressed="${on}">${on?L("✓ I’m going","✓ Voy"):L("🙋 I’m going","🙋 Voy")}</button>${going.length?`<span class="cl-gwho" title="${esc(going.map(v=>v.name).join(", "))}">${going.slice(0,4).map(v=>av(v.uid,v.name)).join("")}<small>${going.length} ${L("going","van")}</small></span>`:""}`; }
  async function paintRsvp(root){ const els=[...root.querySelectorAll(".cl-rsvp[data-rsvp]")]; if(!els.length) return; await loadPark();
    const weeks=[...new Set(els.map(e=>e.dataset.rsvp))];
    for(const w of weeks){ let list=[]; try{ list=await votes("r_"+w); }catch(e){ els.filter(x=>x.dataset.rsvp===w).forEach(x=>x.hidden=true); continue; }
      els.filter(x=>x.dataset.rsvp===w).forEach(x=>{ x.hidden=false; x.innerHTML=rsvpHTML(w,x.dataset.wd,list); }); } }
  /* ---------- weekly challenge: answers are wall posts tagged with the week; Noa can pick a favourite ---------- */
  async function mountChal(el){ el.dataset.on="1"; const cid=el.dataset.chal;
    try{ await Promise.all([POSTS?null:listPosts().then(p=>{ POSTS=p; }),loadPins(),loadPark()]); }catch(e){ el.innerHTML=state==="off"?OFF:""; return; }
    const cidG=G()?"wSAMPLE":cid, ans=(POSTS||[]).filter(p=>p.ch===cidG).sort((a,b)=>(PICKS[cidG]===b.id)-(PICKS[cidG]===a.id)||a.at-b.at), done=ans.some(p=>p.uid===me());
    el.innerHTML=`${ans.length?`<div class="cl-chal-ans">${ans.map(p=>`<div class="cl-ans${PICKS[cidG]===p.id?" pick":""}"><div class="cs-top">${who(p)}</div>${PICKS[cidG]===p.id?`<span class="cs-pickf">⭐ ${L("Noa’s pick","Elegido por Noa")}</span>`:""}<p class="cs-txt">${txtHTML(p.text||"")}</p>${imgs(p)}<div class="cs-acts">${likeBtn(p,"clubPosts/"+p.id)}${me()===NOA&&!G()?`<button type="button" class="cs-act" data-pick="${esc(p.id)}" data-ch="${esc(cidG)}">${PICKS[cidG]===p.id?"⭐ Unpick":"⭐ Pick"}</button>`:""}</div></div>`).join("")}</div>`:`<p class="cs-empty">${L("No answers yet. Be the first!","Aún no hay respuestas. ¡Sé el primero!")}</p>`}
      ${el.dataset.cur?(done?`<p class="cl-chal-done">✅ ${L("You took this week’s challenge. Nice!","Hiciste el desafío de esta semana. ¡Bien!")}</p>`:composer("chal",cid,L("Write your answer… (+5 🍪 for your buddy)","Escribe tu respuesta… (+5 🍪 para tu buddy)"))):""}`;
    paintImgs(el);
    /* a little reward when Noa picks your answer */
    if(!G()&&me()){ const won=Object.values(PICKS).filter(id=>{ const x=(POSTS||[]).find(y=>y.id===id); return x&&x.uid===me(); }), seen=LSG("cs-club-picks",[]); const fresh=won.filter(x=>!seen.includes(x));
      if(fresh.length){ LSS("cs-club-picks",seen.concat(fresh)); treat(10,L("⭐ Noa picked your challenge answer!","⭐ ¡Noa eligió tu respuesta del desafío!")); checkBadges(); } } }
  /* ---------- reports (Noa sees them in his bell and the nightly email) ---------- */
  async function reports(){ if(me()!==NOA) return []; try{ const r=await query("","clubReports","DESCENDING",50); return r; }catch(e){ return []; } }
  async function delReport(id){ await api("DELETE","/clubReports/"+id); }
  /* ---------- clicks ---------- */
  document.addEventListener("click",async e=>{ const t=e.target;
    const mp=t.closest("[data-mpick]"); if(mp){ pickMention(mp); return; }
    const pf=t.closest("[data-prof]"); if(pf&&!t.closest(".cl-prof")){ e.preventDefault(); openProfile(pf.dataset.prof,pf.dataset.pname); return; }
    const po=t.closest("[data-pollopen]"); if(po){ const form=po.closest("form"), pb=form.querySelector(".cs-pollbox"), show=pb.hidden; pb.hidden=!show; po.setAttribute("aria-expanded",String(show));
      if(show&&!pb.dataset.ready){ pb.dataset.ready="1"; pb.innerHTML=`<p class="cs-ph2">${L("Your text above is the question. Options:","Tu texto de arriba es la pregunta. Opciones:")}</p><div class="cs-popts">${optIn(1)}${optIn(2)}</div><button type="button" class="cs-act" data-polladd="1">＋ ${L("Option","Opción")}</button>`; }
      if(show) pb.querySelector("input").focus(); return; }
    const pa=t.closest("[data-polladd]"); if(pa){ const box=pa.parentElement.querySelector(".cs-popts"), n=box.querySelectorAll("input").length; if(n<6){ box.insertAdjacentHTML("beforeend",optIn(n+1)); box.lastElementChild.focus(); } if(n+1>=6) pa.hidden=true; return; }
    const vt=t.closest("[data-vote]"); if(vt){ const pid=vt.dataset.vote, p=(POSTS||[]).find(x=>x.id===pid), poll="p_"+pid, mineU=G()?"me":me(); if(!p||(!me()&&!G())) return;
      const cur=(VOTES[poll]||[]).find(v=>v.uid===mineU), opt=cur&&cur.opt===vt.dataset.opt?"":vt.dataset.opt; const el=vt.closest(".cs-poll");
      try{ await vote(poll,opt); }catch(er){ toast(L("Couldn’t vote. Try again.","No se pudo votar. Intenta de nuevo.")); return; } el.innerHTML=pollHTML(p,VOTES[poll]); return; }
    const rg=t.closest("[data-rsvpgo]"); if(rg){ if(!me()&&!G()) return; const w=rg.dataset.rsvpgo, wd=rg.dataset.wd, poll="r_"+w, mineU=G()?"me":me(); const cur=(VOTES[poll]||[]).find(v=>v.uid===mineU);
      let ds=cur?String(cur.opt||"").split(",").filter(Boolean):[]; ds=ds.includes(wd)?ds.filter(x=>x!==wd):ds.concat([wd]);
      rg.disabled=true; try{ await vote(poll,ds.join(",")); }catch(er){ rg.disabled=false; toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); return; }
      if(ds.includes(wd)) toast(L("See you there! 🙌","¡Nos vemos ahí! 🙌"));
      document.querySelectorAll(`.cl-rsvp[data-rsvp="${CSS.escape(w)}"]`).forEach(x=>{ x.innerHTML=rsvpHTML(w,x.dataset.wd,VOTES[poll]); }); return; }
    const pk=t.closest("[data-pick]"); if(pk){ const id=pk.dataset.pick, ch=pk.dataset.ch; if(PICKS[ch]===id) delete PICKS[ch]; else PICKS[ch]=id;
      try{ await savePins(); }catch(er){ toast("Couldn’t save the pick."); return; }
      const w=pk.closest(".cl-wall"); if(w) paintWall(w); document.querySelectorAll(".cl-chal-list[data-on='1']").forEach(x=>mountChal(x)); return; }
    const rp=t.closest("[data-report]"); if(rp){ const path=rp.dataset.report, parts=path.split("/"), id=parts[parts.length-1];
      const item=parts.length>2?(COMM[parts[1]]||[]).find(x=>x.id===id):(POSTS||[]).find(x=>x.id===id); if(!item) return;
      const why=prompt(L("Report this to Noa? Tell him what’s wrong (optional). Only Noa sees reports.","¿Reportar esto a Noa? Cuéntale qué pasa (opcional). Solo Noa ve los reportes."),""); if(why===null) return;
      try{ await api("POST","/clubReports?documentId="+rid(),{fields:{uid:S(me()),name:S(F().name()||""),path:S(path),pid:S(parts[1]),author:S(item.name||""),text:S(String(item.text||"").slice(0,200)),why:S(String(why).slice(0,300)),at:I(Date.now())}}); }
      catch(er){ toast(L("Couldn’t send the report. Try again.","No se pudo enviar el reporte. Intenta de nuevo.")); return; }
      toast(L("Thanks. Noa will take a look 🙏","Gracias. Noa lo va a revisar 🙏")); return; }
  });
