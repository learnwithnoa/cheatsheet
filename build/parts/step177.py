# step177 (Nov 17 2026):
# 1) 🌍 "Around the world today" on Home (below the Daily Stoic): 3 light, positive pieces a day (world.json in the repo:
#    written each morning by Claude's scheduled task, or by the GitHub fallback). Random pixel buddies present them,
#    one word to learn each (tap → meaning + save), a "talk about it" question, Spanish line in beginner mode,
#    shared reactions 💛 🤯 😂 that everyone can see (pay helper: /api/world-reacts, /api/world-react), past days with arrows.
# 2) Club: see WHO is going, who enjoyed a class, who reacted to a post/comment (tap the faces / 👀), on phones too.

# --- club: who lists ---
R('''<span class="cl-gwho" title="${esc(going.map(v=>v.name).join(", "))}">''',
  '''<button type="button" class="cl-gwho" data-whot="${esc(L("🙋 Going","🙋 Van"))}" data-who="${esc(JSON.stringify(going.map(v=>({n:v.name}))))}" aria-label="${esc(L("See who's going","Ver quién va"))}">''')
R('''${L("going","van")}</small></span>''', '''${L("going","van")}</small></button>''')
R('''">✨ ${L("I enjoyed this class","Me gustó esta clase")}${vs.length?` · ${vs.length}`:""}</button>`; }));''',
  '''">✨ ${L("I enjoyed this class","Me gustó esta clase")}${vs.length?` · ${vs.length}`:""}</button>${vs.length?`<button type="button" class="cl-gwho cs-whob" data-whot="${esc(L("✨ Enjoyed this class","✨ Les gustó esta clase"))}" data-who="${esc(JSON.stringify(vs.map(v=>({n:v.name}))))}" aria-label="${esc(L("See who enjoyed it","Ver a quién le gustó"))}">${vs.slice(0,4).map(v=>av(v.uid,v.name)).join("")}</button>`:""}`; }));''')
R('''toast(L("✨ Thanks! Noa will see it.","✨ ¡Gracias! Noa lo verá."))''', '''toast(L("✨ Thanks! Noa and the club can see it.","✨ ¡Gracias! Noa y el club lo pueden ver."))''')
R('''.join("")}<span class="cs-rxadd">''', '''.join("")}${(x.likes||[]).length?`<button type="button" class="cs-act cs-rxwho" data-rxwho="${esc(JSON.stringify((x.likes||[]).map(rxOf)))}" aria-label="${esc(L("Who reacted?","¿Quién reaccionó?"))}" title="${esc(L("Who reacted?","¿Quién reaccionó?"))}">👀</button>`:""}<span class="cs-rxadd">''')
R('''const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;''', '''const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;
  window.__clubWho=async list=>{ try{ await loadProfs(); }catch(e){} return list.map(([u,e])=>({n:u===me()?L("You","Tú"):((profOf(u)||{}).name||L("A member","Un miembro")),e})); };''')

# --- Home: the card's place ---
R('''  <div id="tStoic" class="t-stoic" hidden></div>''', '''  <div id="tStoic" class="t-stoic" hidden></div>
  <section class="card aw" id="awBox" hidden aria-labelledby="awTitle"></section>''')

_css = r'''
/* step177: 🌍 Around the world today */
.aw{margin:0 0 18px;padding:16px 18px}
.aw-top{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:6px}
.aw-top h2{margin:0;font-size:19px}
.aw-nav{display:flex;align-items:center;gap:6px;font:600 13px var(--body);color:var(--muted)}
.aw-nav button{all:unset;cursor:pointer;font:800 13px var(--body);padding:4px 10px;border-radius:999px;border:1.5px solid var(--line)}
.aw-nav button[disabled]{opacity:.35;cursor:default}
.aw-nav button:focus-visible{outline:3px solid var(--bright)}
.aw-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:8px}
.aw-it{display:flex;flex-direction:column;gap:4px;padding:12px;border:1.5px solid var(--line);border-radius:16px;min-width:0}
.aw-head{display:flex;align-items:center;gap:8px}
.aw-bud{width:34px;height:34px;flex:none;border-radius:11px;background:color-mix(in srgb,var(--royal) 12%,var(--surface));display:grid;place-items:center;overflow:hidden;font-size:18px}
.aw-bud svg{width:34px;height:34px;display:block;image-rendering:pixelated}
.aw-k{flex:1;font:800 10.5px var(--mono,monospace);letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.aw-it h3{margin:2px 0 0;font-size:15.5px;line-height:1.3}
.aw-it h3 a{color:var(--ink);text-decoration:none}
.aw-it h3 a:hover{text-decoration:underline}
.aw-ext{color:var(--royal);font-size:.9em}
.aw-say{all:unset;cursor:pointer;font-size:14px;padding:0 4px;border-radius:8px}
.aw-say:focus-visible{outline:3px solid var(--bright)}
.aw-t{margin:0;font-size:14px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
.aw-t.open{display:block;-webkit-line-clamp:unset}
.aw-w{all:unset;cursor:pointer;font-weight:800;border-bottom:2px dotted var(--royal);color:var(--ink)}
.aw-w:focus-visible{outline:3px solid var(--bright);border-radius:4px}
.aw-rx{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin-top:auto;padding-top:6px}
.aw-rx button{all:unset;cursor:pointer;font:700 12.5px var(--body);padding:2px 8px;border-radius:999px;border:1.5px solid var(--line)}
.aw-rx button[aria-pressed="true"]{border-color:var(--royal);background:color-mix(in srgb,var(--royal) 16%,var(--surface))}
.aw-rx button:focus-visible{outline:3px solid var(--bright)}
.aw-rx .aw-who{border:0;padding:2px 3px;color:var(--muted);font-weight:600;text-decoration:underline dotted}
.aw-x{all:unset;cursor:pointer;font-size:11.5px;color:var(--muted);padding:2px 8px;border-radius:8px;border:1px dashed var(--line);align-self:flex-start}
.aw-hid{opacity:.45}
.aw-wd h3{margin:0 0 4px}.aw-wd p{margin:4px 0}
@media (max-width:900px){.aw-list{grid-template-columns:minmax(0,1fr);gap:8px}.aw-it{padding:10px 12px}}
@media (max-width:600px){.aw{padding:14px}.aw-top h2{font-size:17.5px}}
/* club: who lists */
button.cl-gwho{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:1px 4px}
button.cl-gwho:focus-visible,.cs-rxwho:focus-visible{outline:3px solid var(--bright)}
.cs-whob{margin-left:6px}.cs-whob .cs-av{width:24px;height:24px;font-size:10px;margin-left:-6px;border:2px solid var(--surface)}.cs-whob .cs-av:first-child{margin-left:0}
.cs-wholist{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:6px;max-height:55vh;overflow:auto}
.cs-wholist li{display:flex;gap:8px;align-items:center;font-size:15px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]

_js = r'''<script>
/* step177: "who" lists (club going / enjoyed / reactions, and the world card) */
window.csWho=function(title,rows){ const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  if(!window.csDialog) return; window.csDialog(`<h3 style="margin:0 0 4px">${esc(title)}</h3><ul class="cs-wholist">${rows.map(r=>`<li>${r.e?`<span aria-hidden="true">${esc(r.e)}</span>`:"•"} ${esc(r.n||"Someone")}</li>`).join("")||"<li>Nobody yet</li>"}</ul>`); };
document.addEventListener("click",async e=>{
  const w=e.target.closest("[data-who]"); if(w){ e.preventDefault(); e.stopPropagation(); let l=[]; try{ l=JSON.parse(w.dataset.who); }catch(er){} window.csWho(w.dataset.whot||"Who",l); return; }
  const r=e.target.closest("[data-rxwho]"); if(r){ e.preventDefault(); e.stopPropagation(); let l=[]; try{ l=JSON.parse(r.dataset.rxwho); }catch(er){} const rows=window.__clubWho?await window.__clubWho(l):l.map(([u,x])=>({n:"A member",e:x})); window.csWho("👀 Reactions",rows); }
},true);

/* step177: 🌍 Around the world today */
(function(){
  const box=document.getElementById("awBox"); if(!box) return;
  const API="https://hibi-pay.learnwithnoa.workers.dev", RX=["💛","🤯","😂"];
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const chileDay=()=>{ try{ return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Santiago",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()); }catch(e){ return new Date().toISOString().slice(0,10); } };
  const nice=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}); }catch(e){ return d; } };
  const K={celebrate:"🎉 Celebrated today",space:"🚀 Space, science & tech",good:"😊 Good news"};
  let DAYS=[], at=0, RXD={}, busy=false;
  const F=()=>window.__csFire||null;
  const teacher=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  /* a random pixel buddy for each piece, the same all day */
  const HEAD=["party","flowers","beanie","gradcap","crown","wizard","laurel","","",""], FACE=["sunglasses","hearts","","",""];
  function rnd(seed){ let h=2166136261; for(const c of seed){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return ()=>{ h^=h<<13; h^=h>>>17; h^=h<<5; return ((h>>>0)%10000)/10000; }; }
  function buddy(day,i,emoji){ try{ const SP=window.BUDDY_SPRITES; if(!SP||!window.csBuddyFace) return esc(emoji);
      const ks=Object.keys(SP), r=rnd(day+"#"+i); let a=ks[Math.floor(r()*ks.length)];
      const used=new Set(); for(let j=0;j<i;j++){ const rr=rnd(day+"#"+j); used.add(ks[Math.floor(rr()*ks.length)]); } let t=0; while(used.has(a)&&t++<10) a=ks[(ks.indexOf(a)+1)%ks.length];
      const c=Math.floor(r()*((SP[a].colors||[1]).length)); const f=window.csBuddyFace({a,c,head:HEAD[Math.floor(r()*HEAD.length)],face:FACE[Math.floor(r()*FACE.length)]}); return f||esc(emoji); }catch(e){ return esc(emoji); } }
  function withWord(it){ const t=esc(it.text||""), w=String(it.word||""); if(!w) return t; const re=new RegExp("\\b("+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")\\b","i");
    return re.test(t)?t.replace(re,'<button type="button" class="aw-w" data-aww="$1">$1</button>'):t; }
  function rxRow(day,i){ const d=RXD[day]; if(!d) return ""; const list=(d.rx&&d.rx[i])||[]; const c={}; let mine="";
    list.forEach(v=>{ c[v.e]=(c[v.e]||0)+1; if(v.me) mine=v.e; });
    const names=list.map(v=>v.me?"You":v.n), who=names.length?(names.length<=2?names.join(" and "):names.slice(0,2).join(", ")+" and "+(names.length-2)+" more"):"";
    return `<div class="aw-rx" role="group" aria-label="Reactions">${RX.map(e=>`<button type="button" data-awrx="${e}" data-i="${i}" aria-pressed="${mine===e}" aria-label="${e} ${c[e]||0}">${e}${c[e]?" "+c[e]:""}</button>`).join("")}${who?`<button type="button" class="aw-who" data-awwho="${i}">${esc(who)}</button>`:""}</div>`; }
  function draw(){
    const d=DAYS[at]; if(!d){ box.hidden=true; return; }
    const today=chileDay(), hid=(RXD[d.date]&&RXD[d.date].hidden)||[], T=teacher();
    const items=(d.items||[]).map((it,i)=>({it,i})).filter(x=>T||!hid.includes(x.i));
    box.hidden=!items.length; if(!items.length) return;
    box.innerHTML=`<div class="aw-top"><h2 id="awTitle">🌍 Around the world ${d.date===today?"today":""}</h2><div class="aw-nav"><button type="button" data-awnav="1" ${at>=DAYS.length-1?"disabled":""} aria-label="Earlier day">‹ ${at===0&&d.date===today?"Yesterday":"Earlier"}</button><span>${d.date===today?"Today":esc(nice(d.date))}</span><button type="button" data-awnav="-1" ${at===0?"disabled":""} aria-label="Later day">${at===1&&DAYS[0].date===today?"Today":"Later"} ›</button></div></div>
      <div class="aw-list">${items.map(({it,i})=>{ const ok=it.link&&/^https:\/\//.test(it.link); return `<article class="aw-it${hid.includes(i)?" aw-hid":""}"><div class="aw-head"><div class="aw-bud" aria-hidden="true">${buddy(d.date,i,it.emoji)}</div><span class="aw-k">${esc(K[it.k]||"")}</span><button type="button" class="aw-say" data-awsay="${i}" aria-label="Listen">🔊</button></div>
        <h3>${ok?`<a href="${esc(it.link)}" target="_blank" rel="noopener" title="${esc((it.kind==="watch"?"Watch on ":"Read on ")+(it.src||"the website"))}">${esc(it.title)}<span class="aw-ext" aria-hidden="true"> ${it.kind==="watch"?"▶":"↗"}</span></a>`:esc(it.title)}</h3>
        <p class="aw-t" data-awmore="${i}">${withWord(it)}</p>${it.es?`<p class="esb" lang="es">${esc(it.es)}</p>`:""}
        ${rxRow(d.date,i)}${T?`<button type="button" class="aw-x" data-awhide="${i}" data-on="${hid.includes(i)?0:1}">${hid.includes(i)?"Show it again":"✕ Hide for everyone"}</button>`:""}
      </article>`; }).join("")}</div>`;
  }
  async function tok(){ try{ const f=F(); return f&&f.token?await f.token():null; }catch(e){ return null; } }
  async function loadRx(day){ const t=await tok(); if(!t) return; try{ const r=await fetch(API+"/api/world-reacts?day="+day,{headers:{authorization:"Bearer "+t}}); if(r.ok){ RXD[day]=await r.json(); draw(); } }catch(e){} }
  async function load(){
    try{ const h=new Date(); const r=await fetch("world.json?h="+chileDay()+"-"+h.getHours(),{cache:"no-store"}); if(!r.ok) return; const j=await r.json();
      const today=chileDay(); DAYS=(j.days||[]).filter(d=>d&&d.date&&d.date<=today&&(d.items||[]).length).sort((a,b)=>a.date<b.date?1:-1).slice(0,8); at=0; draw(); if(DAYS[0]) loadRx(DAYS[0].date); }catch(e){}
  }
  box.addEventListener("click",async e=>{
    const n=e.target.closest("[data-awnav]"); if(n){ at=Math.max(0,Math.min(DAYS.length-1,at+(+n.dataset.awnav))); draw(); const d=DAYS[at]; if(d&&!RXD[d.date]) loadRx(d.date); return; }
    const d=DAYS[at]; if(!d) return;
    const mo=e.target.closest("[data-awmore]"); if(mo&&!e.target.closest("[data-aww]")){ mo.classList.toggle("open"); return; }
    const s=e.target.closest("[data-awsay]"); if(s){ const it=d.items[+s.dataset.awsay]; if(window.csSpeak) window.csSpeak(it.title+". "+it.text); return; }
    const w=e.target.closest("[data-aww]"); if(w){ const it=(d.items||[]).find(x=>new RegExp("^"+String(x.word||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"$","i").test(w.dataset.aww))||{}; const word=it.word||w.dataset.aww;
      const ex=(String(it.text||"").split(/(?<=[.!?])\s+/).find(x=>new RegExp("\\b"+word+"\\b","i").test(x))||"");
      const dl=window.csDialog(`<div class="aw-wd"><h3>${esc(word)} <button type="button" class="aw-say" data-sayw aria-label="Hear it">🔊</button></h3><p>${esc(it.mean||"")}</p>${it.tr?`<p class="muted" lang="es">🇪🇸 ${esc(it.tr)}</p>`:""}${ex?`<p class="muted"><i>“${esc(ex)}”</i></p>`:""}<div class="note-actions"><button class="pill-btn pill-green" type="button" data-savew>+ Save to My notebook</button></div></div>`);
      dl.el.querySelector("[data-sayw]").onclick=()=>{ if(window.csSpeak) window.csSpeak(word); };
      dl.el.querySelector("[data-savew]").onclick=()=>{ let ok=false; try{ ok=window.csAddWord&&window.csAddWord(word,it.tr||"",ex); }catch(er){} dl.close(); if(window.toast) window.toast(ok?"Saved to My notebook ✓":"Already in My notebook"); };
      return; }
    const wh=e.target.closest("[data-awwho]"); if(wh){ const list=((RXD[d.date]||{}).rx||{})[wh.dataset.awwho]||[]; window.csWho("Reactions",list.map(v=>({n:v.me?"You":v.n,e:v.e}))); return; }
    const rx=e.target.closest("[data-awrx]"), hd=e.target.closest("[data-awhide]"); if(!rx&&!hd) return;
    if(window.__csViewAsMode||window.__csPreview){ if(window.toast) window.toast("👁 View as: this isn't saved anywhere"); return; }
    if(busy) return; const t=await tok(); if(!t){ if(window.toast) window.toast("Sign in to react"); return; } busy=true;
    const body=hd?{day:d.date,i:+hd.dataset.awhide,hide:hd.dataset.on==="1"}:{day:d.date,i:+rx.dataset.i,e:rx.dataset.awrx,name:(F()&&F().name&&F().name())||""};
    try{ const r=await fetch(API+"/api/world-react",{method:"POST",headers:{authorization:"Bearer "+t,"content-type":"application/json"},body:JSON.stringify(body)}); if(r.ok){ RXD[d.date]=await r.json(); draw(); } else if(window.toast) window.toast("Couldn't save. Try again."); }catch(er){ if(window.toast) window.toast("Couldn't save. Try again."); }
    busy=false;
  });
  load();
  window.addEventListener("cs-auth",()=>{ const d=DAYS[at]; if(d) loadRx(d.date); });
  document.addEventListener("cs-teacher",draw);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)

# tour
R('''      <li><span class="wl-ico" aria-hidden="true">✏️</span><div><b>Class notes</b> live in <b>My notebook</b> too:''',
  '''      <li><span class="wl-ico" aria-hidden="true">🌍</span><div><b>Around the world today</b> on Home: three little good-news pieces every day (a celebration, space or tech, and good news), each with a word to learn and reactions everyone can see. Tap a title to open the full story.</div></li>
      <li><span class="wl-ico" aria-hidden="true">✏️</span><div><b>Class notes</b> live in <b>My notebook</b> too:''')
