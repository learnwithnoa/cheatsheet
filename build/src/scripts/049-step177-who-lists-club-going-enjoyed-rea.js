
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
      const ex=(String(it.text||"").match(/[^.!?]+[.!?]*/g).map(x=>x.trim()).find(x=>new RegExp("\\b"+word+"\\b","i").test(x))||"");
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
