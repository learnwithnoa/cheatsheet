
(function(){
  const box=document.getElementById("coachBox"); if(!box) return;
  let tab="classes", cSort=-1, wSort="new", openRep=null;
  window.__csDeep=window.__csDeep||{}; const COS={reports:"progress-reports",pack:"pack-and-payments",goals:"my-goals",guides:"study-guides",recaps:"class-recaps"}, COI={}; Object.keys(COS).forEach(k=>COI[COS[k]]=k);
  window.__csDeep.coaching={hash:()=>"#coaching"+(tab&&tab!=="classes"?"/"+(COS[tab]||tab):""),open:p=>{ if(p[0]) tab=COI[p[0]]||p[0]; setTimeout(()=>{ try{ render(); }catch(e){} },0); }};
  /* progress reports: ?report=<id>#coaching from the email opens that report */
  const REP_P="cs-open-report", REP_READ="cs-rep-read";
  try{ const q=new URLSearchParams(location.search).get("report"); if(q){ sessionStorage.setItem(REP_P,q.replace(/[^\w-]/g,"").slice(0,30)); history.replaceState(null,"",location.pathname+"#coaching"); } }catch(e){}
  const repRead=()=>{ try{ return JSON.parse(localStorage.getItem(REP_READ)||"[]")||[]; }catch(e){ return []; } };
  const markRepRead=id=>{ try{ const r=repRead(); if(!r.includes(id)){ r.push(id); localStorage.setItem(REP_READ,JSON.stringify(r.slice(-40))); } }catch(e){} };
  const repsOf=v=>((v&&v.reports)||[]).filter(r=>r&&r.id).slice().sort((a,b)=>(b.to||"").localeCompare(a.to||""));
  function repHTML(r,forPrint){
    const L=(arr,f)=>(arr||[]).length?arr.map(f).join(""):"", es=r.lang==="es";
    const T=es?{c:"✅ Lo que está funcionando",t:"💬 Temas que vimos",p:"🔎 Patrones al hablar",f:"🎯 En qué enfocarte ahora",r:"📚 Recurso recomendado",m:"🔭 Mirando el mes completo",h:"📱 Tu Hibi",rec:"🎥 Tus grabaciones de clase",cl:"Clase del "}
                :{c:"✅ What’s clicking",t:"💬 Topics we covered",p:"🔎 Speaking patterns worth noting",f:"🎯 What to focus on next",r:"📚 Resource pick",m:"🔭 Zooming out: your month at a glance",h:"📱 Your Hibi",rec:"🎥 Your class recordings",cl:"Class on "};
    return `${r.snapshot?`<p class="ch-rp-snap">${esc(r.snapshot)}</p>`:""}
      ${(r.clicking||[]).length?`<div class="ch-rp-sec"><h4>${T.c}</h4>${L(r.clicking,c=>`<div class="ch-rp-win"><b>${esc(c.win)}</b>${c.example?`<small>${esc(c.example)}</small>`:""}</div>`)}</div>`:""}
      ${(r.topics||[]).length?`<div class="ch-rp-sec"><h4>${T.t}</h4><div class="ch-rp-chips">${L(r.topics,x=>`<span>${esc(x)}</span>`)}</div></div>`:""}
      ${(r.patterns||[]).length?`<div class="ch-rp-sec"><h4>${T.p}</h4><ul>${L(r.patterns,x=>`<li>${esc(x)}</li>`)}</ul></div>`:""}
      ${(r.focus||[]).length?`<div class="ch-rp-sec"><h4>${T.f}</h4>${L(r.focus,f=>`<div class="ch-rp-foc"><b>${esc(f.area)}</b>${f.tip?`<div>💡 ${esc(f.tip)}</div>`:""}</div>`)}</div>`:""}
      ${r.resource?`<div class="ch-rp-sec"><h4>${T.r}</h4>${r.resource.url&&!forPrint?`<a class="ch-rp-res" href="${esc(r.resource.url)}" target="_blank" rel="noopener"><b>${esc(r.resource.title)} ↗</b>${r.resource.why?`<small>${esc(r.resource.why)}</small>`:""}</a>`:`<div class="ch-rp-res"><b>${esc(r.resource.title)}</b>${r.resource.url?`<small>${esc(r.resource.url)}</small>`:""}${r.resource.why?`<small>${esc(r.resource.why)}</small>`:""}</div>`}</div>`:""}
      ${(r.hibi||[]).length?`<div class="ch-rp-sec"><h4>${T.h}</h4><ul>${L(r.hibi,x=>`<li>${esc(x)}</li>`)}</ul></div>`:""}
      ${r.month?`<div class="ch-rp-sec"><h4>${T.m}</h4><p>${esc(r.month)}</p></div>`:""}
      ${r.closing?`<p class="ch-rp-close">${esc(r.closing)}<br>— Noa</p>`:""}
      ${(r.recordings||[]).length&&!forPrint?`<div class="ch-rp-sec"><h4>${T.rec}</h4><div class="ch-rp-recs">${L(r.recordings,x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener">▶ ${esc(x.label||(T.cl+fs(x.date)))}</a>`)}</div></div>`:""}`;
  }
  function printRep(r){
    const w=window.open("","_blank"); if(!w){ if(window.toast) window.toast("Allow pop-ups to print"); return; }
    w.document.write(`<!doctype html><meta charset="utf-8"><title>Progress report · ${esc(fs(r.from))} – ${esc(fs(r.to))}<\/title><style>body{font:15px/1.55 system-ui,sans-serif;color:#111;max-width:720px;margin:32px auto;padding:0 20px}h1{font-size:22px;margin:0 0 4px}h4{margin:18px 0 6px;font-size:15px}.m{color:#555;margin:0 0 14px}.ch-rp-snap{font-size:16px}.ch-rp-win,.ch-rp-foc,.ch-rp-res{margin:0 0 8px}.ch-rp-win small,.ch-rp-res small{display:block;color:#555}.ch-rp-chips span{display:inline-block;border:1px solid #ccc;border-radius:99px;padding:1px 9px;margin:0 4px 4px 0;font-size:13px}.ch-rp-close{font-style:italic;margin-top:20px}<\/style><h1>Your progress report</h1><p class="m">${esc(window.__csHubView&&window.__csHubView.name||"")} · ${esc(fd(r.from))} – ${esc(fd(r.to))} · ${r.sessions} ${r.sessions===1?"class":"classes"}</p>${repHTML(r,true)}`);
    w.document.close(); setTimeout(()=>{ try{ w.focus(); w.print(); }catch(e){} },300);
  }
  /* ===== class recaps & study guides hosted on Hibi, with interactive exercises (?lesson=<id>#coaching opens one) ===== */
  const LES_P="cs-open-lesson", LES_K="ncs-lesson-prog";
  let openLes=null;
  try{ const q=new URLSearchParams(location.search).get("lesson"); if(q){ sessionStorage.setItem(LES_P,q.replace(/[^\w-]/g,"").slice(0,60)); history.replaceState(null,"",location.pathname+"#coaching"); } }catch(e){}
  const lesOf=v=>((v&&v.lessons)||[]).filter(x=>x&&x.id);
  /* ===== English Map (from Session Zero; ?map#coaching opens it) ===== */
  const MAP_P="cs-open-map";
  try{ const sp=new URLSearchParams(location.search); if(sp.has("map")){ sessionStorage.setItem(MAP_P,"1"); history.replaceState(null,"",location.pathname+"#coaching"); } }catch(e){}
  const LV=["A1","A2","B1","B2","C1","C2"];
  const MODNM={prs:"Present simple",th:"There is / there are",ps:"Past simple",pp:"Present perfect",ing:"Verb + -ing",cou:"Could vs was able to",iq:"Indirect questions",fut:"Talking about the future",ed:"-ed endings"};
  function mapHTML(v){ const m=v.map||{}, lv=String(m.level||v.level||"").toUpperCase().match(/[ABC][12]/), cur=lv?lv[0]:"", first=(v.name||"").split(" ")[0];
    const nextRev=(m.reviews||[]).filter(d=>!(m.reviewed||[]).includes(d)).sort()[0];
    const route=(m.route||[]).slice(0,4);
    const RICO={read:"📖",listen:"🎧",words:"📝",watch:"🎬",speak:"🗣️",write:"✍️"};
    return `<div class="em" id="emView"><button type="button" class="ch-tab lx-back" data-mapback="1">← Back to My coaching</button>
    <header class="em-hd"><div><div class="em-k">Your English Map</div><h2>${esc(first)}, here's where you are and where we're going</h2>${m.date?`<p class="em-sub">From Session Zero · ${esc(fd(m.date))}</p>`:""}</div>
      ${cur?`<div class="em-lv" role="img" aria-label="Your level: ${cur}">${LV.map(l=>`<span class="${l===cur?"on":LV.indexOf(l)<LV.indexOf(cur)?"past":""}">${l}${l===cur?"<i>you</i>":""}</span>`).join("")}</div>`:""}</header>
    ${m.where?`<section class="em-sec"><h3>📍 Where you are now</h3><p>${md(m.where)}</p></section>`:""}
    ${m.power?`<section class="em-sec em-power"><h3>⭐ Your superpower: ${esc(m.power.title||"")}</h3>${m.power.quote?`<blockquote>“${esc(m.power.quote)}”</blockquote>`:""}${m.power.note?`<p>${md(m.power.note)}</p>`:""}</section>`:""}
    ${(m.focus||[]).length?`<section class="em-sec"><h3>🎯 Your 3 focus areas</h3><ol class="em-focus">${m.focus.map((f,i)=>`<li><div class="em-fn">${i+1}</div><div><b>${esc(f.t||"")}</b>
      ${f.said||f.fix?`<div class="em-fx">${f.said?`<span class="em-said"><small>You said</small><s>${esc(f.said)}</s></span>`:""}${f.fix?`<span class="em-fix"><small>${f.said?"Try":"Say it like this"}</small>${esc(f.fix)}</span>`:""}</div>`:""}
      ${f.tip?`<p class="em-tip">💡 ${md(f.tip)}</p>`:""}${f.mod&&MODNM[f.mod]?`<button type="button" class="ch-go" data-go="quiz">Practice: ${esc(MODNM[f.mod])}${f.stage?" · stage "+(+f.stage):""} →</button>`:""}</div></li>`).join("")}</ol></section>`:""}
    ${route.length||m.goal?`<section class="em-sec"><h3>🚀 Where we're going</h3><ol class="em-route"><li class="em-now"><span class="em-dot"></span><small>Today</small><b>${cur?cur+" · ":""}your starting point</b></li>${route.map(r=>`<li><span class="em-dot"></span><small>${esc(r.when||"")}</small><b>${esc(r.what||"")}</b></li>`).join("")}${m.goal?`<li class="em-goal"><span class="em-dot">🏁</span><small>Your goal</small><b>${esc(m.goal)}</b></li>`:""}</ol></section>`:""}
    ${(m.routine||[]).length?`<section class="em-sec"><h3>📚 Your routine <span class="em-muted">15–20 minutes a day</span></h3><div class="em-rt">${m.routine.map(r=>{ const ico=RICO[String(r.k||"").toLowerCase()]||"✨", inner=`<span aria-hidden="true">${ico}</span><small>${esc(r.k||"")}</small><b>${esc(r.v||"")}</b>`; return /^https:\/\//.test(r.url||"")?`<a class="em-rc" href="${esc(r.url)}" target="_blank" rel="noopener">${inner}</a>`:`<div class="em-rc">${inner}</div>`; }).join("")}</div></section>`:""}
    ${m.how||m.dayone||nextRev?`<section class="em-sec em-foot">${m.how?`<p><b>🧭 How we get there.</b> ${md(m.how)}</p>`:""}${m.dayone?`<p><b>📸 Your day one.</b> ${md(m.dayone)}</p>`:""}${nextRev?`<p class="em-next">🗓️ We'll look at this map together again around <b>${esc(fd(nextRev))}</b>.</p>`:""}</section>`:""}
    <p class="em-sign">Let's go, ${esc(first)}. Noa</p></div>`; }
  let openMap=false;
  const lprog=()=>{ try{ return JSON.parse(localStorage.getItem(LES_K)||"{}")||{}; }catch(e){ return {}; } };
  const lsave=(id,p)=>{ if(window.__csViewAsMode) return; try{ const all=lprog(); all[id]=p; localStorage.setItem(LES_K,JSON.stringify(all)); }catch(e){} try{ window.__csOnSet&&window.__csOnSet(LES_K); }catch(e){} };
  const md=t=>esc(t).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\*([^*]+)\*/g,"<i>$1</i>");
  const NRM=t=>String(t||"").toLowerCase().replace(/[‘’`´]/g,"'").replace(/[“”]/g,'"')
    .replace(/\bcan't\b/g,"cannot").replace(/\bwon't\b/g,"will not").replace(/n't\b/g," not").replace(/'ve\b/g," have").replace(/'m\b/g," am").replace(/'re\b/g," are").replace(/'ll\b/g," will")
    .replace(/[.,!?;:"()]/g," ").replace(/\s+/g," ").trim();
  const same=(a,b)=>NRM(a)===NRM(b);
  function lesTotal(L){ return (L.exercises||[]).reduce((n,x)=>n+x.items.length,0); }
  function lesScore(L,p){ let ok=0; (L.exercises||[]).forEach((x,i)=>x.items.forEach((_,j)=>{ if((p.ok||{})[i+"-"+j]===true) ok++; })); return ok; }
  function blanks(q){ return String(q).split(/_{2,}/); }
  function exItem(L,x,i,j,p){ const k=i+"-"+j, it=x.items[j], ok=(p.ok||{})[k], ans=(p.ans||{})[k], tried=ok!==undefined, show=(p.show||{})[k];
    const mark=ok===true?'<span class="lx-mark lx-good" aria-label="Correct">✓</span>':tried?'<span class="lx-mark lx-bad" aria-label="Not yet">✗</span>':"";
    const note=it.note&&tried?`<div class="lx-note">💡 ${md(it.note)}</div>`:"";
    if(x.type==="choice"){ const parts=blanks(it.q);
      return `<li class="lx-it${ok===true?" lx-good":tried?" lx-bad":""}" data-k="${k}"><div class="lx-q">${parts.length>1?md(parts[0])+'<span class="lx-blank">'+(ok===true?esc(it.opts[it.a]):"____")+"</span>"+md(parts.slice(1).join("____")):md(it.q)} ${mark}</div>
        <div class="lx-opts">${it.opts.map((o,n)=>`<button type="button" class="lx-opt${ans===n?(n===it.a?" lx-good":" lx-bad"):""}${ok===true&&n===it.a?" lx-good":""}" data-lxopt="${n}" ${ok===true?"disabled":""}>${esc(o)}</button>`).join("")}</div>${note}</li>`; }
    if(x.type==="gap"){ const parts=blanks(it.q), vals=Array.isArray(ans)?ans:[];
      return `<li class="lx-it${ok===true?" lx-good":tried?" lx-bad":""}" data-k="${k}"><div class="lx-q lx-gapq">${parts.map((t,n)=>md(t)+(n<parts.length-1?`<input type="text" class="lx-in" data-b="${n}" value="${esc(vals[n]||"")}" aria-label="Blank ${n+1}" autocomplete="off" autocapitalize="off" spellcheck="false" ${ok===true?"disabled":""} size="${Math.max(8,Math.min(22,((it.a[n]||[""])[0]||"").length+2))}">`:"")).join("")} ${mark}</div>
        ${tried&&ok!==true?`<div class="lx-fb">${show?`<span class="lx-ans">✅ ${it.a.map(a=>esc(a[0])).join(" · ")}</span>`:`<button type="button" class="lx-link" data-lxshow="1">Show the answer</button>`}</div>`:""}${note}</li>`; }
    return `<li class="lx-it${ok===true?" lx-good":tried?" lx-bad":""}" data-k="${k}"><div class="lx-q">${md(it.q)} ${mark}</div>
      <textarea class="lx-in lx-ta" rows="2" aria-label="Your answer" ${ok===true?"disabled":""} spellcheck="false">${esc(ans||"")}</textarea>
      ${tried&&ok!==true?`<div class="lx-fb">${show?`<span class="lx-ans">✅ ${it.a.map(esc).join(" <i>or</i> ")}</span>`:`<span>Not quite yet. Try again, or </span><button type="button" class="lx-link" data-lxshow="1">see a good answer</button>`}</div>`:ok===true&&it.a.length&&!it.a.some(a=>same(a,ans))?`<div class="lx-fb"><span class="lx-ans">Also good: ${esc(it.a[0])}</span></div>`:""}${note}</li>`; }
  function lessonHTML(L){ const p=lprog()[L.id]||{}, tot=lesTotal(L), sc=lesScore(L,p);
    let have=new Set(); try{ have=new Set((JSON.parse(localStorage.getItem("ncs-words")||"[]")||[]).map(x=>String(x&&x.w||"").toLowerCase().trim())); }catch(e){}
    const sec=s=>{ if(s.type==="list") return `<section class="lx-sec"><h3>${esc(s.h)}</h3><ul>${s.items.map(t=>`<li>${md(t)}</li>`).join("")}</ul></section>`;
      if(s.type==="fixes") return `<section class="lx-sec"><h3>${esc(s.h)}</h3><div class="lx-fixes">${s.rows.map(r=>`<div class="lx-fix"><div class="said"><small>You said</small><s>${md(r.said)}</s></div><div class="try"><small>Try instead</small><span>${md(r.try)}</span></div>${r.why?`<div class="why">${md(r.why)}</div>`:""}</div>`).join("")}</div>${s.bonus?`<p class="lx-bonus"><b>Bonus:</b> ${md(s.bonus)}</p>`:""}</section>`;
      if(s.type==="vocab"){ const un=s.items.filter(v=>!have.has(v.w.toLowerCase().trim())).length;
        return `<section class="lx-sec"><div class="lx-sech"><h3>${esc(s.h)}</h3>${un?`<button type="button" class="ch-go" data-lxsaveall="1">＋ Save all ${un} to My notebook</button>`:""}</div><div class="lx-voc">${s.items.map((v,n)=>{ const okw=have.has(v.w.toLowerCase().trim()); return `<div class="lx-w"><div><b>${esc(v.w)}</b>${v.pos?` <span class="lx-pos">${esc(v.pos)}</span>`:""}${v.tr?`<span class="lx-tr">${esc(v.tr)}</span>`:""}${v.ex?`<small>“${esc(v.ex)}”</small>`:""}</div><button type="button" class="ch-rc-save" data-lxw='${esc(JSON.stringify({w:v.w,tr:v.tr||"",ex:v.ex||""}))}' ${okw?"disabled":""}>${okw?"✓ Saved":"＋ Save"}</button></div>`; }).join("")}</div></section>`; }
      return `<section class="lx-sec"><h3>${esc(s.h)}</h3>${String(s.body||"").split(/\n{2,}/).map(par=>{ const ls=par.split("\n"); return ls.every(x=>/^\s*[-•]/.test(x))?`<ul>${ls.map(x=>`<li>${md(x.replace(/^\s*[-•]\s*/,""))}</li>`).join("")}</ul>`:`<p>${ls.map(md).join("<br>")}</p>`; }).join("")}</section>`; };
    return `<div class="lx" data-lesson-id="${esc(L.id)}"><button type="button" class="ch-tab lx-back" data-lxback="1">← Back to My coaching</button>
      <header class="lx-head ch-tint ${L.kind==="guide"?"ch-a":"ch-s"}"><div class="ch-k">${L.kind==="guide"?"📄 Study guide":"📼 Class recap"} · ${fd(L.date)}</div><h2>${esc(L.title)}</h2>${L.topic?`<p class="lx-topic"><b>Topic:</b> ${md(L.topic)}</p>`:""}${L.nutshell?`<p class="lx-nut">${md(L.nutshell)}</p>`:""}
        ${tot?`<div class="lx-prog"><div class="ch-bar"><i style="width:${Math.round(sc*100/tot)}%"></i></div><span>${sc}/${tot} exercises right${p.done?" · ✅ done":""}</span><button type="button" class="ch-go" data-lxjump="1">✏️ Go to the practice</button></div>`:""}</header>
      ${(L.sections||[]).map(sec).join("")}
      ${(L.exercises||[]).length?`<section class="lx-sec lx-practice" id="lxPractice"><h3>✏️ Practice time</h3><p class="muted">Hibi checks your answers as you go. Small differences like contractions (didn’t / did not) are fine.</p>
        ${L.exercises.map((x,i)=>`<div class="lx-part" data-part="${i}"><h4>${esc(x.h||"")}</h4><ol class="lx-items">${x.items.map((_,j)=>exItem(L,x,i,j,p)).join("")}</ol>${x.type!=="choice"?`<button type="button" class="ch-go lx-check" data-lxcheck="${i}">Check my answers</button>`:""}</div>`).join("")}</section>`:""}
      ${L.yourTurn?`<section class="lx-sec lx-turn ch-tint ch-v"><h3>🎤 Your turn</h3><p>${md(L.yourTurn)}</p></section>`:""}
      ${tot&&sc===tot?`<div class="lx-done">🎉 All ${tot} right! Great work.</div>`:""}</div>`; }
  function lesCheck(L,i){ const box2=document.querySelector(`.lx [data-part="${i}"]`); if(!box2) return; const x=L.exercises[i], p=lprog()[L.id]||{}; p.ans=p.ans||{}; p.ok=p.ok||{};
    x.items.forEach((it,j)=>{ const k=i+"-"+j, li=box2.querySelector(`[data-k="${k}"]`); if(!li||p.ok[k]===true) return;
      if(x.type==="gap"){ const vals=[...li.querySelectorAll("input[data-b]")].map(n=>n.value); if(vals.every(v=>!v.trim())) return; p.ans[k]=vals; p.ok[k]=vals.every((v,n)=>(it.a[n]||[]).some(a=>same(a,v))); }
      else { const v=(li.querySelector("textarea")||{}).value||""; if(!v.trim()) return; p.ans[k]=v; p.ok[k]=it.a.some(a=>same(a,v)); } });
    lesFinish(L,p); }
  function lesFinish(L,p){ const tot=lesTotal(L), sc=lesScore(L,p);
    if(tot&&sc===tot&&!p.done){ p.done=true; setTimeout(()=>{ try{ if(window.csBuddy&&window.csBuddy.treat) window.csBuddy.treat(5,"🎉 You finished every exercise!"); else if(window.toast) window.toast("🎉 You finished every exercise!"); }catch(e){} },300); }
    lsave(L.id,p); const y=window.scrollY; render(); window.scrollTo(0,y); }
  box.addEventListener("click",e=>{ const v=window.__csHubView; if(!v) return; const t=e.target;
    if(t.closest("[data-openmap]")){ e.preventDefault(); openMap=true; openLes=null; render(); window.scrollTo({top:0}); return; }
    if(t.closest("[data-mapback]")){ openMap=false; render(); window.scrollTo({top:0}); return; }
    const op=t.closest("[data-lesson]"); if(op){ e.preventDefault(); openLes=op.dataset.lesson; render(); window.scrollTo({top:0}); return; }
    if(!openLes) return; const L=lesOf(v).find(x=>x.id===openLes); if(!L) return;
    if(t.closest("[data-lxback]")){ openLes=null; render(); window.scrollTo({top:0}); return; }
    if(t.closest("[data-lxjump]")){ document.getElementById("lxPractice")?.scrollIntoView({behavior:"smooth",block:"start"}); return; }
    const o=t.closest("[data-lxopt]"); if(o){ const li=o.closest("[data-k]"), k=li.dataset.k, [i,j]=k.split("-").map(Number), it=L.exercises[i].items[j], n=+o.dataset.lxopt, p=lprog()[L.id]||{}; p.ans=p.ans||{}; p.ok=p.ok||{}; if(p.ok[k]===true) return; p.ans[k]=n; p.ok[k]=n===it.a; lesFinish(L,p); return; }
    const c=t.closest("[data-lxcheck]"); if(c){ lesCheck(L,+c.dataset.lxcheck); return; }
    const sh=t.closest("[data-lxshow]"); if(sh){ const k=sh.closest("[data-k]").dataset.k, p=lprog()[L.id]||{}; p.show=p.show||{}; p.show[k]=true; lsave(L.id,p); const y=window.scrollY; render(); window.scrollTo(0,y); return; }
    const w=t.closest("[data-lxw]"); if(w){ let x={}; try{ x=JSON.parse(w.dataset.lxw); }catch(er){} if(window.csAddWord&&window.csAddWord(x.w,x.tr,x.ex)&&window.toast) window.toast("Saved to My notebook ✓"); const y=window.scrollY; render(); window.scrollTo(0,y); return; }
    if(t.closest("[data-lxsaveall]")){ let n=0; (L.sections||[]).filter(s=>s.type==="vocab").forEach(s=>s.items.forEach(x=>{ if(window.csAddWord&&window.csAddWord(x.w,x.tr||"",x.ex||"")) n++; })); if(n&&window.toast) window.toast(`Saved ${n} words to My notebook ✓`); const y=window.scrollY; render(); window.scrollTo(0,y); return; } });
  /* if the page reloads (an update, a sync) while a recap is open, open it again where they were */
  addEventListener("pagehide",()=>{ if(openLes&&location.hash==="#coaching"&&!window.__csViewAsMode) try{ sessionStorage.setItem(LES_P,openLes); sessionStorage.setItem("cs-les-y",String(Math.round(scrollY))); }catch(e){} });
  /* typing keeps the answer even before "Check" (so a re-render never loses it) */
  box.addEventListener("input",e=>{ const v=window.__csHubView; if(!openLes||!v) return; const li=e.target.closest(".lx-it"); if(!li) return; const k=li.dataset.k, p=lprog()[openLes]||{}; p.ans=p.ans||{};
    const ins=li.querySelectorAll("input[data-b]"); p.ans[k]=ins.length?[...ins].map(n=>n.value):e.target.value; lsave(openLes,p); });
  box.addEventListener("keydown",e=>{ if(e.key!=="Enter"||!e.target.matches(".lx input")) return; e.preventDefault(); const part=e.target.closest("[data-part]"); if(part){ const v=window.__csHubView, L=lesOf(v).find(x=>x.id===openLes); if(L) lesCheck(L,+part.dataset.part); } });
  function takePending(v){
    if(v&&v.map){ let mp=null; try{ mp=sessionStorage.getItem(MAP_P); }catch(e){} if(mp){ try{ sessionStorage.removeItem(MAP_P); }catch(e){} openMap=true; if(location.hash!=="#coaching") location.hash="#coaching"; setTimeout(()=>window.scrollTo({top:0}),60); } }
    if(v){ let lp=null; try{ lp=sessionStorage.getItem(LES_P); }catch(e){} if(lp){ try{ sessionStorage.removeItem(LES_P); }catch(e){} if(lesOf(v).some(x=>x.id===lp)){ openLes=lp; if(location.hash!=="#coaching") location.hash="#coaching"; let y0=0; try{ y0=+sessionStorage.getItem("cs-les-y")||0; sessionStorage.removeItem("cs-les-y"); }catch(e){} setTimeout(()=>window.scrollTo({top:y0}),60); } } }
    let p=null; try{ p=sessionStorage.getItem(REP_P); }catch(e){} if(!p) return;
    if(!v){ return; }
    try{ sessionStorage.removeItem(REP_P); }catch(e){}
    const reps=repsOf(v); if(!reps.length) return;
    const r=reps.find(x=>x.id===p)||reps[0]; tab="reports"; openRep=r.id;
    if(location.hash!=="#coaching") location.hash="#coaching";
    setTimeout(()=>{ const el=document.getElementById("rep-"+r.id); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); },120);
  }
  setTimeout(()=>{ let p=null; try{ p=sessionStorage.getItem(REP_P); }catch(e){} if(p&&!window.__csHubView&&typeof window.toast==="function") window.toast("Sign in with Google to see your progress report 📈"); },5000);
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fd=iso=>{ if(!iso) return ""; const [y,m,d]=iso.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}); };
  const fs=iso=>{ if(!iso) return ""; const [y,m,d]=iso.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-US",{month:"short",day:"numeric"}); };
  /* "What's new": guides, classes and tips added since the student last looked */
  const SEEN_K="cs-coach-seen";
  const seenGet=()=>{ try{ return JSON.parse(localStorage.getItem(SEEN_K)||"null"); }catch(e){ return null; } };
  function newsFor(v){
    if(!v) return []; let sn=seenGet(); const wk=new Date(Date.now()-7*864e5).toISOString().slice(0,10);
    const since=sn&&sn.d?sn.d:wk, out=[];
    lesOf(v).forEach(x=>{ if(x.date&&x.date>since) out.push({d:x.date,ico:x.kind==="guide"?"📄":"📼",t:`${x.kind==="guide"?"New study guide":"Your class recap"}: <b>${esc(x.title)}</b> (with exercises)`,tab:x.kind==="guide"?"guides":"recaps"}); });
    (v.guides||[]).forEach(g=>{ const rk=g.kind==="recap"||(!g.kind&&/recap|class notes|notes from|resumen/i.test(g.title||"")); if(g.date&&g.date>since) out.push({d:g.date,ico:rk?"📼":"📄",t:`${rk?"New class recap":"New guide"}: <b>${esc(g.title)}</b>`,tab:rk?"recaps":"guides"}); });
    (v.classes||[]).forEach(c=>{ if(c.date&&c.date>since&&(c.att==="Present"||!c.att)) out.push({d:c.date,ico:"🗓",t:`Your class on ${fd(c.date)} was added${c.homework?`. Homework: ${esc(c.homework)}`:""}`,tab:"classes"}); });
    (v.tips||[]).forEach(t=>{ if(t.date&&t.date>since) out.push({d:t.date,ico:"⭐",t:`Noa recommends: <b>${esc(t.mod?(({ps:"Past simple",pp:"Present perfect",prs:"Present simple",th:"There is / there are",ing:"Verb + -ing",cou:"Could vs was able to",iq:"Indirect questions",fut:"Talking about the future",ed:"-ed endings"})[t.mod]||"Grammar")+(t.stage?" · stage "+t.stage:""):t.pack?(t.title||"a word pack"):(t.title||t.page))}</b>`,tab:"top"}); });
    repsOf(v).forEach(r=>{ if(r.to&&(r.at||r.to)>since&&!repRead().includes(r.id)) out.push({d:r.at||r.to,ico:"📈",t:`Your progress report (${fs(r.from)} – ${fs(r.to)}) is ready`,tab:"reports"}); });
    if(v.recap&&v.recap.date&&v.recap.date>since) out.push({d:v.recap.date,ico:"📼",t:`Your class recap for ${fs(v.recap.date)} is ready`,tab:"top"});
    if(sn&&sn.f!=null&&v.focus&&sn.f!==hsh(v.focus)) out.push({d:today(),ico:"🛠",t:"Noa updated <b>What we're working on</b>",tab:"goals"});
    return out.sort((a,b)=>b.d.localeCompare(a.d)).slice(0,6);
  }
  const hsh=t=>{ let h=0; for(const c of String(t)) h=(h*31+c.charCodeAt(0))|0; return h; };
  const today=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
  function markSeen(v){ try{ localStorage.setItem(SEEN_K,JSON.stringify({d:today(),f:v&&v.focus?hsh(v.focus):0})); }catch(e){} }
  function nav(){
    const v=window.__csHubView, b=document.getElementById("navCoaching"); if(b) b.hidden=!v||(!!window.__csTeacher&&!window.__csPreview&&!window.__csViewAsMode);
    if(b&&v&&!window.__csPreview){ const n=newsFor(v).length; let dot=b.querySelector(".co-dot"); if(n){ if(!dot){ dot=document.createElement("span"); dot.className="co-dot"; b.appendChild(dot); } dot.textContent=n; dot.title=n+" new"; } else if(dot) dot.remove(); }
    const t=!!window.__csTeacher && !window.__csPreview; ["navTeacher","navHub","mnavTeacher","mnavHub"].forEach(id=>{ const e=document.getElementById(id); if(e) e.hidden=true; });
    ["navStudents","navMembers"].forEach(id=>{ const e=document.getElementById(id); if(e) e.hidden=!(t&&!window.__csViewAsMode); });
        if(!v && location.hash.replace("#","")==="coaching" && window.csGo) window.csGo("notes");
  }
  function render(){
    const v=window.__csHubView; nav();
    if(!v){ box.innerHTML='<p class="muted">This page is for Noa’s private students. If you take private classes and don’t see your information, ask Noa to link your account.</p>'; return; }
    takePending(v);
    if(openMap&&v.map){ box.innerHTML=mapHTML(v); return; }
    if(openLes){ const L=lesOf(v).find(x=>x.id===openLes); if(L){ box.innerHTML=lessonHTML(L); return; } openLes=null; }
    const cur=(v.packs||[]).filter(p=>p.current).slice(-1)[0];
    const per=cur&&cur.unit==="credits"?((v.classes||[]).filter(c=>c.pack===cur.id&&c.hour==="Priority").length>(v.classes||[]).filter(c=>c.pack===cur.id).length/2?4:3):1;
    const left=cur&&cur.size?Math.max(0,cur.left):null;
    const held=(v.classes||[]).filter(c=>c.att==="Present"||!c.att);
    let streak=0; for(const c of (v.classes||[]).slice().reverse()){ if(c.att==="Present"||!c.att) streak++; else if(c.att==="Cancelled on time") continue; else break; }
    const stats=cur&&cur.size?`<div class="ch-stats">
      <div class="ch-tint ch-v ch-stat"><b>${(v.classes||[]).length}</b><span>classes with Noa</span></div>
      <div class="ch-tint ch-s ch-stat">${(()=>{ const m=held.length*45; return m<60?`<b>${m}</b><span>minutes of English together</span>`:`<b>${Math.round(m/60*10)/10}</b><span>hours of English together</span>`; })()}</div>
      ${streak>=3?`<div class="ch-tint ch-g ch-stat"><b>🔥 ${streak}</b><span>classes in a row</span></div>`:""}</div>`:`<div class="ch-stats"><div class="ch-tint ch-v ch-stat"><b>${(v.classes||[]).length}</b><span>classes with Noa</span></div></div>`;
    const reps=repsOf(v);
    const gKind=g=>g.kind==="recap"||g.kind==="guide"?g.kind:(/recap|class notes|notes from|resumen/i.test(g.title||"")?"recap":"guide");
    const gAll=(v.guides||[]).concat(lesOf(v).map(x=>({title:x.title,date:x.date,kind:x.kind,lesson:x.id}))).sort((a,b)=>(b.date||"").localeCompare(a.date||"")), gStudy=gAll.filter(g=>gKind(g)==="guide"), gRecap=gAll.filter(g=>gKind(g)==="recap");
    const tabs=[["classes","My classes","ch-s"]].concat(reps.length?[["reports",`Progress reports (${reps.length})`,"ch-v"]]:[]).concat([["pack","Pack & payments","ch-g"],["goals","My goals","ch-v"]]).concat(gStudy.length?[["guides",`Study guides (${gStudy.length})`,"ch-a"]]:[]).concat(gRecap.length?[["recaps",`Class recaps (${gRecap.length})`,"ch-s"]]:[]);
    if((tab==="guides"&&!gStudy.length)||(tab==="recaps"&&!gRecap.length)) tab="classes";
    if(tab==="reports"&&!reps.length) tab="classes";
    const newRep=reps[0]&&!repRead().includes(reps[0].id)&&tab!=="reports"?reps[0]:null;
    /* top: next class + homework, what's due, little stats */
    const lastHw=((v.classes||[]).slice().reverse().find(c=>c.homework)||{}).homework||"";
    let nextTxt=""; if(v.next){ const d=new Date(v.next); if(!isNaN(d)) nextTxt=d.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}); }
    const tzr=(v.tz&&typeof window.__csTzRem==="function")?window.__csTzRem({name:v.name,tz:v.tz,country:v.country},today(),14,1):[];
    const du=v.due; let dueTxt="";
    if(du){ if(du.pending) dueTxt=`Your pack (<b>${esc(du.label)}</b>) isn’t paid yet. Please pay before your next class.`;
      else if(du.left!=null&&du.left<=0) dueTxt=`Your pack is used up. To keep your spot, renew it <b>at least 48 hours before your next class</b>.`;
      else if(du.classesLeft!=null&&du.classesLeft<=1) dueTxt=`You have about <b>${du.classesLeft} ${du.classesLeft===1?"class":"classes"}</b> left. To keep your spot, renew <b>at least 48 hours before your next class</b>.`;
      else if(du.half&&du.instAt) dueTxt=du.nextNo>=du.instAt?`Your <b>2nd payment</b> is due now (class #${du.instAt} of this pack).`:`Your <b>2nd payment</b> is due at class <b>#${du.instAt}</b> of this pack. Your next class is #${du.nextNo}.`; }
    const packLine=cur&&cur.size?`<div class="ch-pkmini"><span>💳 <b>${left}</b> ${esc(cur.unit)} left</span><span>≈ <b>${Math.floor(left/per)}</b> ${Math.floor(left/per)===1?"class":"classes"} left</span>${cur.deadline?`<span>pack ends <b>${fs(cur.deadline)}</b></span>`:""}</div>`:"";
    const top=`<div class="ch-top">
      <div class="ch-tint ch-s ch-card"><div class="ch-k">🗓 Next class</div><b>${nextTxt?esc(nextTxt):v.book?"Book your next class whenever it suits you":"Ask Noa or check your calendar invite"}</b>${v.nextZoom||v.book?`<div class="ch-nacts">${v.nextZoom&&nextTxt?`<a class="ch-go ch-zoom" href="${esc(v.nextZoom)}" target="_blank" rel="noopener">🎥 Join on Zoom ↗</a>`:""}${v.book?`<a class="ch-go" href="${esc(v.book)}" target="_blank" rel="noopener">📅 ${nextTxt?"Book another class":"Book a class"} ↗</a>`:""}</div>`:""}${v.recap&&v.recap.homework?`<div class="ch-hw"><span>📝 Homework for it</span>${esc(v.recap.homework)}</div>`:lastHw?`<div class="ch-hw"><span>📝 Homework for it</span>${esc(lastHw)}</div>`:""}${packLine}</div>
      ${newRep?`<div class="ch-tint ch-v ch-card"><div class="ch-k">📈 New progress report</div><div>Your report for <b>${fs(newRep.from)} – ${fs(newRep.to)}</b> is ready.</div><button type="button" class="ch-go" data-rep="${esc(newRep.id)}" style="margin-top:6px">Read it →</button></div>`:""}
      ${dueTxt?`<div class="ch-tint ch-p ch-card"><div class="ch-k">💳 Coming up</div><div>${dueTxt}</div></div>`:""}
      ${tzr.length?`<div class="ch-tint ch-v ch-card"><div class="ch-k">🕐 Clocks are changing</div>${tzr.map(r=>`<div>Clocks change in <b>${esc(r.where)}</b> on <b>${fs(r.date)}</b>. Your class time with Noa might change, so he’ll check it with you.</div>`).join("")}</div>`:""}
    </div>`;
    /* Noa's practice tips: their own row under the last-class recap (not squeezed into the top row) */
    const tipsBox=`<div class="ch-tipsrow">${(v.tips||[]).length?`<div class="ch-tint ch-a ch-card"><div class="ch-k">⭐ Noa recommends</div>${v.tips.slice().reverse().slice(0,3).map(t=>`<div class="ch-tip">${t.pack?`<button type="button" class="ch-go" data-vsetgo="${esc(t.pack)}">🗂️ ${esc(({expr:"Everyday expressions",phrasal:"Everyday phrasal verbs",travel:"Travel",work:"English at work",pairs:"Confusing word pairs"})[t.pack]||t.title||"Word pack")} (word pack) →</button>`:`<button type="button" class="ch-go" ${t.mod?`data-gomod="${esc(t.mod)}" data-tipstage="${esc(String(t.stage||""))}"`:`data-go="${esc(t.page)}"`}>${esc(t.mod?(({ps:"Past simple",pp:"Present perfect",prs:"Present simple",th:"There is / there are",ing:"Verb + -ing",cou:"Could vs was able to",iq:"Indirect questions",fut:"Talking about the future",ed:"-ed endings"})[t.mod]||"Grammar")+(t.stage?" · stage "+t.stage:"")+(t.title?": "+t.title:""):(t.title||t.page))} →</button>`}${t.why?`<small>You said: “${esc(t.why)}”</small>`:""}</div>`).join("")}</div>`:""}</div>`.replace('<div class="ch-tipsrow"></div>',"");
    const rc=v.recap; let recapBox="";
    if(rc&&(rc.summary||(rc.talked||[]).length||(rc.vocab||[]).length)){
      let have=new Set(); try{ have=new Set((JSON.parse(localStorage.getItem("ncs-words")||"[]")||[]).map(x=>String(x&&x.w||"").toLowerCase().trim())); }catch(e){}
      const voc=(rc.vocab||[]).filter(x=>x&&x.w), unsaved=voc.filter(x=>!have.has(x.w.toLowerCase().trim())).length;
      const rcL=lesOf(v).find(x=>x.kind==="recap"&&x.date===rc.date);
      recapBox=`<div class="ch-recap ch-tint ch-g" id="chRecap"><div class="ch-rc-h"><div><div class="ch-k">📼 Your last class</div><b>${fd(rc.date)}</b></div>${rcL?`<button type="button" class="ch-go" data-lesson="${esc(rcL.id)}">📖 Full recap + exercises →</button>`:""}</div>
        ${rc.summary?`<p class="ch-rc-sum">${esc(rc.summary)}</p>`:""}
        <div class="ch-rc-grid">
        ${(rc.talked||[]).length?`<div><h4>💬 What we talked about</h4><ul>${rc.talked.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}

        ${(rc.heads||[]).length?`<div class="ch-rc-heads"><h4>📌 Don’t forget</h4><ul>${rc.heads.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
        </div>
        ${voc.length?`<div class="ch-rc-wbox"><h4>✨ New words <span class="muted">(${voc.length})</span>${unsaved?`<button type="button" class="ch-go ch-rc-all" data-rcall="1">＋ Save all ${unsaved} to My notebook</button>`:""}${voc.length>2?'<span class="ch-rc-hint">scroll →</span>':""}</h4><div class="ch-rc-words" role="list">${voc.map((x,i)=>{ const ok=have.has(x.w.toLowerCase().trim()); return `<div class="ch-rc-w" role="listitem"><div><b>${esc(x.w)}</b>${x.tr?`<span class="muted">${esc(x.tr)}</span>`:""}${x.ex?`<small>“${esc(x.ex)}”</small>`:""}</div><button type="button" class="ch-rc-save" data-rcw="${i}" ${ok?"disabled":""}>${ok?"✓ Saved":"＋ Save"}</button></div>`; }).join("")}</div></div>`:""}
        </div>`;
    }
    const lpAll=lprog(), lBadge=g=>{ const L=lesOf(v).find(x=>x.id===g.lesson); if(!L) return ""; const tot=lesTotal(L), p=lpAll[L.id]||{}, sc=lesScore(L,p); return tot?(p.done?' <span class="ch-lbadge done">✅ done</span>':sc?` <span class="ch-lbadge">${sc}/${tot}</span>`:` <span class="ch-lbadge new">✏️ ${tot} exercises</span>`):""; };
    const gItem=(g,ico,cls)=>g.lesson?`<button type="button" class="${cls}" data-lesson="${esc(g.lesson)}">${cls==="ch-gl"?`<span aria-hidden="true">${ico}</span><span><b>${esc(g.title)}${lBadge(g)}</b>${g.date?`<small>${fd(g.date)} · on Hibi</small>`:""}</span>`:`<b>${ico} ${esc(g.title)}${lBadge(g)}</b><span>${g.date?fd(g.date):""}</span>`}</button>`
      :`<a class="${cls}" href="${esc(g.url)}" target="_blank" rel="noopener">${cls==="ch-gl"?`<span aria-hidden="true">${ico}</span><span><b>${esc(g.title)}</b>${g.date?`<small>${fd(g.date)}</small>`:""}</span>`:`<b>${ico} ${esc(g.title)}</b><span>${g.date?fd(g.date):""}</span>`}</a>`;
    const gRow=(list,ico)=>list.slice(0,1).map(g=>gItem(g,ico,"ch-gl")).join("");  /* just the newest one here; the tab below has them all */
    const RECENT=g=>!!g.date&&Date.now()-Date.parse(g.date+"T12:00")<30*864e5, gS2=gStudy.filter(RECENT), gR2=gRecap.filter(RECENT);
    const guideBox=gS2.length||gR2.length?`<div class="ch-gbox ch-tint ch-p"><div class="ch-gcols">
      ${gS2.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="guides" title="See all your study guides">📄 ${gStudy.length>1?"Latest study guide":"Study guide"} <span>${gStudy.length>1?`· all ${gStudy.length} →`:"→"}</span></button><div class="ch-glist">${gRow(gS2,"📄")}</div></div>`:""}
      ${gR2.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="recaps" title="See all your class recaps">📼 ${gRecap.length>1?"Latest class recap":"Class recap"} <span>${gRecap.length>1?`· all ${gRecap.length} →`:"→"}</span></button><div class="ch-glist">${gRow(gR2,"📼")}</div></div>`:""}
      </div></div>`:"";
    const res=v.resources||[];
    /* their class recordings (Zoom deletes them after a while) and their Drive folder */
    const zr=(v.zrecs||[]).slice().sort((a,b)=>b.date.localeCompare(a.date)), tdy=new Date().toISOString().slice(0,10);
    const dLeft=u=>u?Math.round((Date.parse(u+"T12:00")-Date.parse(tdy+"T12:00"))/864e5):999;
    const zrRow=r=>{ const n=dLeft(r.until), warn=n<=14; return `<a class="ch-resb ch-zr" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="i">🎥</span><span><b>${fd(r.date)}${r.min?` · ${r.min} min`:""}</b><small class="${warn?"zr-warn":""}">${r.until?(n<=0?"Deleted today":warn?`⚠️ Deleted in ${n} ${n===1?"day":"days"} (${fs(r.until)})`:`Available until ${fs(r.until)}`):""}</small></span></a>`; };
    const zBox=zr.length?`<div class="ch-res ch-tint ch-v" id="chZrecs"><div class="ch-k">🎥 Your class recordings</div><p class="muted" style="margin:2px 0 8px;font-size:13.5px">${zr.length?"Watch our classes again. Zoom deletes each recording after a while, so the date shows how long it stays.":"Recordings of our classes will show up here."}</p>${zr.length?`<div class="ch-resl">${zr.map(zrRow).join("")}</div>`:""}</div>`:"";
    const resBox=res.length||v.folder?`<div class="ch-res ch-tint ch-n"><div class="ch-k">🧰 Class resources</div><p class="muted" style="margin:2px 0 8px;font-size:13.5px">${res.length?"The websites we use in class, and your own folder. Tap one to open it.":"Your own folder with Noa."}</p><div class="ch-resl">${v.folder?`<a class="ch-resb" href="https://drive.google.com/drive/folders/${esc(v.folder)}" target="_blank" rel="noopener"><span class="i">📁</span><span><b>Your Drive folder</b><small>Files and materials from your classes</small></span></a>`:""}${res.map(r=>`<a class="ch-resb" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="i">${r.ico}</span><span><b>${esc(r.name)}</b><small>${esc(r.note)}</small></span></a>`).join("")}</div></div>`:"";
    let body="";
    const pc=id=>((v.packs||[]).find(p=>p.id===id)||{}).color||"";
    if(tab==="classes"){
      const cl=(v.classes||[]).slice(); const pn={}, num=new Map(); cl.forEach(c=>{ const k=c.pack||"_"; pn[k]=(pn[k]||0)+1; num.set(c,pn[k]); }); const multi=Object.keys(pn).length>1; if(cSort<0) cl.reverse();
      body=`<div class="ch-sort">Order: <button type="button" class="ch-tab ch-s" data-cs="-1" aria-pressed="${cSort<0}">Newest first</button><button type="button" class="ch-tab ch-s" data-cs="1" aria-pressed="${cSort>0}">Oldest first</button></div>
      <div class="ch-list">${cl.map(c=>`<div class="ch-cls" style="--pc:${pc(c.pack)}"><div class="d"><span class="ch-no" title="${multi?"Class number in this pack":"Class number"}">#${num.get(c)}</span>${c.date?fd(c.date):esc(c.dateText)}${c.att&&c.att!=="Present"?`<span class="ch-pill">${esc(c.att)}</span>`:""}</div><div class="t">${esc(c.topics)||"<span class='muted'>(no notes)</span>"}</div>${c.homework?`<div class="h">📝 Homework: ${esc(c.homework)}</div>`:""}</div>`).join("")||'<p class="muted">No classes yet.</p>'}</div>`;
    } else if(tab==="reports"){
      if(openRep!=="__none"&&(!openRep||!reps.some(r=>r.id===openRep))) openRep=reps[0].id;
      if(openRep!=="__none") markRepRead(openRep);
      body=`<p class="muted" style="font-size:14px">Every few weeks Noa looks back at your classes: what’s working, what to focus on next, and a resource just for you.</p><div class="ch-reps">${reps.map(r=>{ const o=r.id===openRep; return `<div class="ch-rep ch-tint ch-v" id="rep-${esc(r.id)}"><button type="button" class="ch-rep-h" data-rep="${esc(r.id)}" aria-expanded="${o}"><span><span class="ch-k">📈 ${r.lang==="es"?"Reporte de progreso":"Progress report"}</span><b>${fs(r.from)} – ${fs(r.to)}</b><small>${r.sessions} ${r.lang==="es"?(r.sessions===1?"clase":"clases"):(r.sessions===1?"class":"classes")}</small></span><span class="ch-rep-car" aria-hidden="true">${o?"▾":"▸"}</span></button>${o?`<div class="ch-rep-b">${repHTML(r)}<div class="ch-rep-f"><button type="button" class="ch-go" data-repprint="${esc(r.id)}">🖨 Print or save as PDF</button></div></div>`:""}</div>`; }).join("")}</div>`;
    } else if(tab==="pack"){
      body=(v.packs||[]).slice().reverse().map(p=>{ const pct=p.size?Math.min(100,p.used/p.size*100):0; return `<div class="ch-tint ch-pk" style="--pc:${p.color||"var(--line)"};--k:${p.current?"var(--c-g)":"var(--line)"}"><b>${esc(p.label)}</b>${p.current?' <span class="ch-pill" style="background:color-mix(in srgb,var(--c-g) 20%,transparent);color:var(--c-g)">current</span>':""}${p.paid==="half"?' <span class="ch-pill">½ paid</span>':""}
        ${p.size?`<div class="ch-bar"><i style="width:${pct}%"></i></div>`:""}<div class="muted" style="font-size:13.5px">${p.size?`${p.used} of ${p.size} ${p.unit} used · `:""}${p.done} ${p.done===1?"class":"classes"}${p.deadline?" · ends "+fd(p.deadline):""}</div></div>`; }).join("")
        +((v.payments||[]).length?`<h2 style="margin-top:18px">Payments</h2><div class="ch-scroll"><table class="ch-tbl"><thead><tr><th>Date</th><th>What</th><th>Amount</th></tr></thead><tbody>${(v.payments||[]).slice().sort((a,b)=>(b.date||"").localeCompare(a.date||"")).map(p=>`<tr><td style="white-space:nowrap">${p.date?fs(p.date):""}</td><td>${esc(p.what)}</td><td style="white-space:nowrap">${esc(p.amount)}</td></tr>`).join("")}</tbody></table></div>`:"");
    } else if(tab==="goals"){
      body=`<div class="ch-tint ch-v ch-goal">${v.objective?`<b>🎯 Your goal</b>\n${esc(v.objective)}\n\n`:""}${v.focus?`<b>🛠 What we're working on</b>\n${esc(v.focus)}\n\n`:""}${v.level?`<b>Your level</b>: ${esc(v.level)}\n`:""}${v.schedule?`<b>Your schedule</b>: ${esc(v.schedule)}`:""}</div>`;
    } else if(tab==="guides"||tab==="recaps"){
      const rc2=tab==="recaps";
      body=`<p class="muted" style="font-size:14px">${rc2?"Recaps and notes from your classes.":"Grammar and study guides Noa made for you, with exercises."}</p><div class="ch-guides">${(rc2?gRecap:gStudy).map(g=>gItem(g,rc2?"📼":"📄",`ch-tint ${rc2?"ch-s":"ch-a"} ch-guide`)).join("")}</div>`;
    } else {
      let w=(v.words||[]).slice(); if(wSort==="new") w.reverse(); else if(wSort==="az") w.sort((a,b)=>a.w.localeCompare(b.w,"en",{sensitivity:"base"})); else if(wSort==="za") w.sort((a,b)=>b.w.localeCompare(a.w,"en",{sensitivity:"base"}));
      body=w.length?`<p class="muted" style="font-size:14px">Words from your English Journey sheet. Your own saved words are in <b>My notebook</b>.</p><div class="ch-sort">Order: ${[["new","Newest added"],["old","Oldest added"],["az","A → Z"],["za","Z → A"]].map(([k,l])=>`<button type="button" class="ch-tab ch-a" data-ws="${k}" aria-pressed="${wSort===k}">${l}</button>`).join("")}</div><div class="ch-scroll"><table class="ch-tbl"><thead><tr><th>Word</th><th>Meaning</th><th>Example</th></tr></thead><tbody>${w.map(x=>`<tr><td><b>${esc(x.w)}</b></td><td>${esc(x.tr)}</td><td>${esc(x.ex)}</td></tr>`).join("")}</tbody></table></div>`:'<p class="muted">No words here yet. Your saved words are in <b>My notebook</b>.</p>';
    }
    const news=window.__csPreview?[]:newsFor(v);
    const newsBox=news.length?`<div class="ch-news" role="status"><div class="ch-news-h"><b>🔔 New in your coaching</b><button type="button" class="ch-go" data-cnseen="1">Got it ✓</button></div><ul>${news.map(n=>`<li>${n.ico} ${n.t} <span class="muted">· ${fd(n.d)}</span></li>`).join("")}</ul><small class="muted">You also get an email when Noa sends you something new.</small></div>`:"";
    const mapBox=v.map?`<button type="button" class="em-card ch-s" data-openmap="1"><span class="em-ci" aria-hidden="true">🗺️</span><span><b>Your English Map</b><small>Your level, your superpower, 3 focus areas and the route to ${esc((v.map.goal||"your goal").replace(/\.$/,""))}</small></span><span class="em-cgo" aria-hidden="true">→</span></button>`:"";
    setTimeout(()=>window.__csSyncUrl&&window.__csSyncUrl("coaching"),0);
    box.innerHTML=newsBox+top+mapBox+recapBox+tipsBox+guideBox+zBox+resBox+stats+`<div class="ch-tabs">${tabs.map(([k,l,c])=>`<button type="button" class="ch-tab ${c}" data-ct="${k}" aria-pressed="${tab===k}">${l}</button>`).join("")}</div>`+body;
  }
  box.addEventListener("click",e=>{ const rv=window.__csHubView&&window.__csHubView.recap; if(!rv) return;
    const one=e.target.closest("[data-rcw]"), all=e.target.closest("[data-rcall]"); if(!one&&!all) return;
    if(typeof window.csAddWord!=="function") return; const voc=(rv.vocab||[]).filter(x=>x&&x.w);
    let have=new Set(); try{ have=new Set((JSON.parse(localStorage.getItem("ncs-words")||"[]")||[]).map(x=>String(x&&x.w||"").toLowerCase().trim())); }catch(er){}
    const list=(one?[voc[+one.dataset.rcw]]:voc).filter(x=>x&&!have.has(x.w.toLowerCase().trim())); let n=0;
    list.forEach(x=>{ if(window.csAddWord(x.w,x.tr||"",x.ex||"")) n++; });
    if(n>1&&typeof window.toast==="function") window.toast(`Saved ${n} words to My notebook ✓`);
    render(); });
  box.addEventListener("click",e=>{ const v=window.__csHubView; const pr=e.target.closest("[data-repprint]"); if(pr&&v){ const r=repsOf(v).find(x=>x.id===pr.dataset.repprint); if(r) printRep(r); return; }
    const b=e.target.closest("[data-rep]"); if(!b||!v) return; const id=b.dataset.rep;
    if(tab==="reports"&&openRep===id&&b.classList.contains("ch-rep-h")) openRep="__none"; else { openRep=id; tab="reports"; }
    render(); const el=document.getElementById("rep-"+id); if(el&&!b.classList.contains("ch-rep-h")) el.scrollIntoView({behavior:"smooth",block:"start"}); });
  /* for the 🔔 in the top bar: what's new in your coaching, mark it seen, open a tab */
  window.__csCoachNews={ list:()=>window.__csPreview?[]:newsFor(window.__csHubView), seen:()=>{ if(window.__csPreview) return; markSeen(window.__csHubView); render(); },
    go:t=>{ if(window.csGo) window.csGo("coaching"); else location.hash="#coaching"; setTimeout(()=>{ if(t&&t!=="top"){ tab=t; render(); setTimeout(()=>box.querySelector(".ch-tabs")?.scrollIntoView({behavior:"smooth",block:"start"}),60); } else window.scrollTo({top:0,behavior:"smooth"}); },80); } };
  box.addEventListener("click",e=>{ const g=e.target.closest("[data-ctgo]"); if(!g) return; tab=g.dataset.ctgo; render(); setTimeout(()=>box.querySelector(".ch-tabs")?.scrollIntoView({behavior:"smooth",block:"start"}),30); });
  box.addEventListener("click",e=>{ const t=e.target.closest("[data-ct],[data-cs],[data-ws]"); if(!t) return; if(t.dataset.ct) tab=t.dataset.ct; if(t.dataset.cs) cSort=+t.dataset.cs; if(t.dataset.ws) wSort=t.dataset.ws; render(); if(window.__csSyncUrl) window.__csSyncUrl("coaching"); });
  document.addEventListener("cs-hubview",render); document.addEventListener("cs-teacher",nav);
  /* teacher: shortcuts in the phone menu */
  document.addEventListener("click",e=>{ const m=e.target.closest(".t-mnav[data-href]"); if(m) location.href=m.dataset.href; });
  /* teacher: view the site as a student */
  const SAMPLE={v:1,name:"Alex (example)",level:"B1",schedule:"Tue & Thu 12:00pm",objective:"Speak with more confidence at work and in meetings.",kind:"pack",
    packs:[{id:"x1",label:"Pack Intermedio 36 créditos",size:36,unit:"credits",used:15,done:5,left:21,deadline:"",paid:"half",current:true,color:"#9fc5e8"}],
    classes:[["2026-10-30","session zero","read emails, start fabulang"],["2026-11-04","fabulang: the night bus, convo: weekend plans","reading and listening practice"],["2026-11-06","checked vocab sentences, past simple vs present perfect","5 sentences with new words"]].map(([d,t,h])=>({date:d,dateText:"",topics:t,homework:h,att:"Present",hour:"Standard",credits:3,pack:"x1"})),
    payments:[{date:"2026-10-28",what:"Half of Pack Intermedio 36 créditos",amount:"$132.000"}],words:[{w:"get the hang of",tr:"agarrarle la mano",ex:"I'm getting the hang of it.",i:0}],
    recap:{date:"2026-11-06",summary:"Great class! You told me about your weekend trip and we practised when to use past simple and when to use present perfect. Your sentences with new words were much more natural this time.",talked:["Your weekend trip to the coast","Past simple vs present perfect (“I went” vs “I have been”)","Checking your vocabulary sentences"],vocab:[{w:"get the hang of",tr:"agarrarle la mano",ex:"I'm getting the hang of it."},{w:"worth it",tr:"valer la pena",ex:"The drive was long, but it was worth it."}],homework:"Write 5 sentences with your new words and read chapter 3 of your story.",heads:["Next class is at 1:00pm instead of 12:00pm."]}};
  /* "View as" lives at the top of Settings, only for Noa */
  /* "View as" has its own 👁 button in the header (Noa only), with a drop-down panel */
  function vaSection(){
    const viewing=!!(window.__csPreview||window.__csViewAsMode), t=!!window.__csTeacher||viewing;
    let btn=document.getElementById("vaHdr"), pop=document.getElementById("vaPop");
    if(!t){ if(btn) btn.hidden=true; if(pop) pop.hidden=true; return; }
    if(!btn){ const anchor=document.getElementById("hdrWord"); if(!anchor) return;
      btn=document.createElement("button"); btn.type="button"; btn.id="vaHdr"; btn.className="theme-btn t-ico va-eye"; btn.setAttribute("aria-expanded","false");
      anchor.insertAdjacentElement("beforebegin",btn); }
    btn.innerHTML=viewing?'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10c2.4 3 5.4 4.5 9 4.5s6.6-1.5 9-4.5"/><path d="M6.2 13.1 4.6 15.6M12 14.5v2.9M17.8 13.1l1.6 2.5"/></svg>'; btn.classList.toggle("on",viewing);
    const tt=viewing?"Viewing as someone else: tap to switch to another person":"View the site as a student"; btn.title=tt; btn.setAttribute("aria-label",tt);
    btn.hidden=false;
    if(!pop){ pop=document.createElement("div"); pop.id="vaPop"; pop.className="va-pop card"; pop.hidden=true;
      pop.innerHTML=`<div class="cs-sec va-sec" id="vaSec"><h4>👁 View the site as…</h4>
        <div class="va-guest"><div class="va-h">Guest links</div>
          ${[["New member","https://hibi.cl/?guest=hb7k2q"],["Club member (sample week)","https://hibi.cl/?guest=hb7k2q&as=club#club"],["Private student (sample)","https://hibi.cl/?guest=hb7k2q&as=private#coaching"]].map(([l,u])=>`<div class="va-gl"><span>${l}</span><button type="button" class="va-copy" data-vacopy="${u}">Copy link</button></div>`).join("")}</div>
        <div class="va-list" id="vaList"><div class="va-res"><p class="muted">Loading everyone…</p></div></div></div>`;
      document.body.appendChild(pop); }
  }
  document.addEventListener("cs-teacher",vaSection); document.addEventListener("cs-preview",vaSection); setTimeout(vaSection,1500);
  document.addEventListener("click",e=>{
    const b=e.target.closest("#vaHdr"), pop=document.getElementById("vaPop");
    if(b&&pop){ const open=pop.hidden; pop.hidden=!open; b.setAttribute("aria-expanded",String(open));
      if(open){ const r=b.getBoundingClientRect(); pop.style.top=Math.round(r.bottom+8)+"px"; pop.style.right=Math.max(12,Math.round(window.innerWidth-r.right))+"px"; vaLoad(); }
      return; }
    if(pop&&!pop.hidden&&!e.target.closest("#vaPop")){ pop.hidden=true; const hb=document.getElementById("vaHdr"); if(hb) hb.setAttribute("aria-expanded","false"); }
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ const pop=document.getElementById("vaPop"); if(pop&&!pop.hidden){ pop.hidden=true; const hb=document.getElementById("vaHdr"); if(hb){ hb.setAttribute("aria-expanded","false"); hb.focus(); } } } });
  let vaData=null;
  async function vaLoad(){ if(vaData){ vaRender(""); return; } try{ vaData=window.__csViewAs?await window.__csViewAs.students():{priv:[],club:[]}; }catch(err){ vaData={priv:[],club:[]}; } vaRender(""); }
  function vaRender(q){
    const L=document.getElementById("vaList"); if(!L||!vaData) return; q=(q||"").toLowerCase().trim();
    const m=n=>!q||String(n).toLowerCase().includes(q);
    const pv=vaData.priv.filter(x=>m(x.view.name)), cl=vaData.club.filter(x=>m(x.name));
    const act=pv.filter(x=>x.status!=="inactive"&&x.status!=="past"), old=pv.filter(x=>!act.includes(x));
    const pb=x=>`<button type="button" data-va="${esc(x.key)}">${x.both?"🌳🌼":"🌳"} ${esc(x.view.name)}</button>`;
    L.querySelector(".va-res").innerHTML=(q?"":`<div class="va-h">Generic</div><div class="va-grid"><button type="button" data-va="club">🌼 Club member</button><button type="button" data-va="private" title="A new private student (not in the club), with sample classes: good for kickoff sessions">🌳 New private student</button><button type="button" data-va="both">🌳🌼 Both</button></div>`)+
      (act.length?`<div class="va-h">Private students (${act.length})</div><div class="va-grid">${act.map(pb).join("")}</div>`:"")+
      ((cl.length||old.some(x=>x.both))?`<div class="va-h">Club members (${cl.length+old.filter(x=>x.both).length})</div><div class="va-grid">${old.filter(x=>x.both).map(pb).join("")}${cl.map(x=>`<button type="button" data-va="${esc(x.key)}">🌼 ${esc(x.name)}</button>`).join("")}</div>`:"")+
      (q&&!act.length&&!old.some(x=>x.both)&&!cl.length?`<p class="muted">Nobody called “${esc(q)}”.</p>`:"");
  }
  function banner(label){ let b=document.getElementById("vaBanner"); if(!label){ if(b) b.remove(); return; } if(!b){ b=document.createElement("div"); b.id="vaBanner"; b.className="va-banner"; document.body.prepend(b); } b.innerHTML=`👁 Viewing as ${esc(label)} <button type="button" id="vaExit">Back to my view</button>`; }
  function preview(label,view,kind){ window.__csPreview={label,kind:kind||(view?"private":"club")}; window.__csHubView=view; banner(label); document.dispatchEvent(new CustomEvent("cs-hubview")); document.dispatchEvent(new CustomEvent("cs-preview")); const c=document.getElementById("csClose"); if(c) c.click(); const vp=document.getElementById("vaPop"); if(vp) vp.hidden=true; if(view){ const b=document.getElementById("navCoaching"); if(b) b.click(); } else { const h=document.querySelector('[data-go="notes"]'); if(h) h.click(); } }
  /* a real student: load what they saved (words, notes, buddy…) and reload the page showing it, read-only */
  async function realView(label,view,kind,uid,btn){
    if(btn){ btn.disabled=true; btn.textContent="Loading…"; }
    let data={}; try{ data=window.__csViewAs&&window.__csViewAs.data?await window.__csViewAs.data(uid):{}; }catch(err){ console.warn(err); }
    try{ sessionStorage.setItem("cs-viewas",JSON.stringify({label,kind,view,uid,data,at:Date.now()})); }catch(err){ if(typeof window.toast==="function") window.toast("Their data is too big to preview here"); preview(label,view,kind); return; }
    location.hash=view?"#coaching":"#notes"; location.reload();
  }
  /* shortcut from Private students: index.html?viewas=<hub id> opens that student's My coaching, viewed as them */
  (function(){ let want=null; try{ const sp=new URLSearchParams(location.search); want=sp.get("viewas"); if(want){ sessionStorage.setItem("cs-va-want",want); history.replaceState(null,"",location.pathname+"#coaching"); } else want=sessionStorage.getItem("cs-va-want"); }catch(e){}
    if(!want) return; if(window.__csViewAsMode){ try{ sessionStorage.removeItem("cs-va-want"); }catch(e){} return; }
    let tries=0; const go=async()=>{ const F=window.__csFire; if(!(window.__csTeacher===true&&window.__csViewAs&&F&&F.uid&&F.uid())){ if(++tries<60) setTimeout(go,500); else { try{ sessionStorage.removeItem("cs-va-want"); }catch(e){} } return; }
      try{ sessionStorage.removeItem("cs-va-want"); }catch(e){}
      let d={priv:[]}; try{ d=await window.__csViewAs.students(); }catch(e){}
      const x=(d.priv||[]).find(p=>p.key==="hub:"+want); if(!x){ if(typeof window.toast==="function") window.toast("Couldn’t find that student"); return; }
      const lb=x.view.name+(x.both?" (private + club)":" (private)");
      if(x.uid) realView(lb,x.view,x.both?"both":"private",x.uid,null); else { preview(lb+" · not on Hibi yet, so no words or notes",x.view,x.both?"both":"private"); location.hash="#coaching"; } };
    go(); })();
  if(window.__csViewAsMode){ const va=window.__csViewAsMode; window.__csPreview={label:va.label,kind:va.kind||(va.view?"private":"club"),real:true}; window.__csHubView=va.view||null;
    const show=()=>{ banner(va.label+" · exactly what they see · nothing you do here is saved"); nav(); document.dispatchEvent(new CustomEvent("cs-preview")); };
    if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",show); else show(); }
  document.addEventListener("input",e=>{ if(e.target.id==="vaQ") vaRender(e.target.value); });
  document.addEventListener("click",async e=>{
    if(e.target.closest("#vaExit")&&window.__csViewAsMode){ try{ sessionStorage.removeItem("cs-viewas"); }catch(er){} location.hash="#notes"; location.reload(); return; }
    if(e.target.closest("#vaExit")){ window.__csPreview=null; banner(null); if(window.__csViewAs) window.__csViewAs.restore(); document.dispatchEvent(new CustomEvent("cs-preview")); nav(); const h=document.querySelector('[data-go="notes"]'); if(h) h.click(); return; }
    const cp=e.target.closest("[data-vacopy]"); if(cp){ const u=cp.dataset.vacopy; (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>{ cp.textContent="Copied ✓"; setTimeout(()=>cp.textContent="Copy link",1800); }).catch(()=>{ window.prompt("Copy this link:",u); }); return; }
    const pick=e.target.closest("[data-va]"); if(pick){ const k=pick.dataset.va;
      if(k==="club") preview("a club member",null,"club");
      else if(k==="private"){ /* a brand-new private student (not in the club): sample classes, map and report, an empty notebook and a fresh buddy, read-only (for kickoff sessions) */
        pick.disabled=true; pick.textContent="Loading…";
        const go=v=>{ try{ sessionStorage.setItem("cs-viewas",JSON.stringify({label:"a new private student (sample)",kind:"private",view:v,uid:null,data:{},sample:true,at:Date.now()})); location.hash="#coaching"; location.reload(); }catch(er){ preview("a private student (example)",v,"private"); } };
        (window.__csSampleView?window.__csSampleView():Promise.reject()).then(go,()=>go(SAMPLE)); } else if(k==="both") preview("a private student who's also in the club (example)",SAMPLE,"both");
      else if(k.startsWith("hub:")){ const x=vaData.priv.find(x=>x.key===k); if(x){ const lb=x.view.name+(x.both?" (private + club)":" (private)"); if(x.uid) realView(lb,x.view,x.both?"both":"private",x.uid,pick); else preview(lb+" · not on Hibi yet, so no words or notes",x.view,x.both?"both":"private"); } }
      else { const x=vaData.club.find(x=>x.key===k); if(x) realView(x.name+(x.inClub===false?" (not in the club yet)":" (club)"),null,"club",x.uid,pick); }
      return; }
    const op=e.target.closest("#vaOpen"); if(op){ const L=document.getElementById("vaList"); L.hidden=!L.hidden; op.setAttribute("aria-expanded",L.hidden?"false":"true"); if(L.hidden) return;
      L.innerHTML=`<input type="search" id="vaQ" placeholder="Search a name…" autocomplete="off"><div class="va-res"><p class="muted">Loading everyone…</p></div>`;
      try{ vaData=window.__csViewAs?await window.__csViewAs.students():{priv:[],club:[]}; }catch(err){ vaData={priv:[],club:[]}; }
      vaRender(""); const q=document.getElementById("vaQ"); if(q) q.focus(); return; }
  });
  /* ---------- Noa only: ⭐ Recommend this page to students ---------- */
  const REC_GROUPS=".ng-start,.ng-speaking,.ng-grammar,.ng-words,.ng-work";
  function recButtons(){
    const on=!!window.__csTeacher&&!(window.__csPreview);
    document.querySelectorAll(".rec-bar").forEach(b=>{ if(!on) b.remove(); });
    if(!on) return;
    document.querySelectorAll(REC_GROUPS).forEach(g=>g.querySelectorAll("[data-go]").forEach(n=>{
      const id=n.dataset.go, v=document.getElementById("v-"+id); if(!v||v.querySelector(".rec-bar")) return;
      const bar=document.createElement("button"); bar.type="button"; bar.className="star-btn rec-bar"; bar.dataset.recpage=id; bar.title="Recommend this page to a student (only you see this button)";
      bar.innerHTML=`<span aria-hidden="true">💡</span><span class="star-txt">Recommend</span>`;
      const lb=v.querySelector(".vhead .cs-read"), sb=v.querySelector(".vhead .star-btn"); if(lb) lb.insertAdjacentElement("beforebegin",bar); else if(sb) sb.insertAdjacentElement("beforebegin",bar); else { const h=v.querySelector("h1"); if(h) h.insertAdjacentElement("afterend",bar); else v.prepend(bar); }
    }));
  }
  /* keep 💡 Recommend first, then 🔊 Listen, then ☆ Star (Listen can arrive a moment later) */
  setInterval(()=>{ document.querySelectorAll(".vhead .rec-bar").forEach(r=>{ const l=r.closest(".vhead").querySelector(".cs-read"); if(l&&(r.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_PRECEDING)) l.insertAdjacentElement("beforebegin",r); }); },1500);
  document.addEventListener("cs-teacher",recButtons); document.addEventListener("cs-preview",recButtons); setTimeout(recButtons,1600);
  let recPeople=null;
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-recpage]"); if(!b||!window.__csTeach) return;
    const id=b.dataset.recpage, v=document.getElementById("v-"+id), h1=v&&v.querySelector("h1"), title=h1?(()=>{ const c=h1.cloneNode(true); c.querySelectorAll("span,small,.lvl,button").forEach(x=>x.remove()); return c.textContent.trim(); })():id;
    const dlg=window.csDialog(`<h3 style="margin-top:0">⭐ Recommend “${esc(title.trim())}”</h3>
      <div class="rec-f"><input type="search" id="recQ" placeholder="Search a name…" autocomplete="off"><div class="rec-chips">${[["all","All"],["private","🌳 Private"],["both","🌳🌼 Both"],["club","🌼 Club"]].map(([k,l],i)=>`<button type="button" data-rk="${k}" aria-pressed="${i?"false":"true"}">${l}</button>`).join("")}</div></div>
      <div class="rec-list" id="recList"><p class="muted">Loading everyone…</p></div>
      <label class="muted" for="recMsg" style="font-size:13px;display:block;margin-top:10px">Message (“{name}” becomes their first name). It pops up with an <b>Open it →</b> button:</label>
      <textarea id="recMsg" rows="3" style="width:100%;box-sizing:border-box">Hi {name}! 💡 Have a look at the “${esc(title.trim())}” page in Hibi. I think it'll really help you. – Noa</textarea>
      <div class="note-actions" style="margin-top:10px"><button class="pill-btn pill-green" type="button" id="recSend" disabled>Send ⭐</button><span class="muted" id="recN" style="font-size:13px">Pick at least one student</span></div>`,{cls:"rec-dlg"});
    const el=dlg.el; let kind="all", q="";
    try{ recPeople=recPeople||await window.__csTeach.people(); }catch(err){ recPeople=[]; }
    const draw=()=>{ const L=el.querySelector("#recList"); const sel=new Set([...L.querySelectorAll("input:checked")].map(i=>i.value));
      const ps=recPeople.filter(p=>(kind==="all"||p.kind===kind)&&(!q||p.name.toLowerCase().includes(q)));
      L.innerHTML=ps.map(p=>`<label class="rec-p"><input type="checkbox" value="${esc(p.uid)}" ${sel.has(p.uid)?"checked":""}> ${p.kind==="private"?"🌳":p.kind==="both"?"🌳🌼":"🌼"} ${esc(p.name)}</label>`).join("")||`<p class="muted">Nobody here.</p>`; count(); };
    const count=()=>{ const n=el.querySelectorAll("#recList input:checked").length; el.querySelector("#recSend").disabled=!n; el.querySelector("#recN").textContent=n?n+(n===1?" student":" students"):"Pick at least one student"; };
    draw();
    el.addEventListener("input",ev=>{ if(ev.target.id==="recQ"){ q=ev.target.value.toLowerCase().trim(); draw(); } });
    el.addEventListener("change",ev=>{ if(ev.target.matches("#recList input")) count(); });
    el.addEventListener("click",async ev=>{
      const c=ev.target.closest("[data-rk]"); if(c){ kind=c.dataset.rk; el.querySelectorAll("[data-rk]").forEach(x=>x.setAttribute("aria-pressed",x===c)); draw(); return; }
      if(!ev.target.closest("#recSend")) return;
      const uids=[...el.querySelectorAll("#recList input:checked")].map(i=>i.value), tpl=el.querySelector("#recMsg").value.trim(); let ok=0;
      ev.target.disabled=true;
      for(const u of uids){ const p=recPeople.find(x=>x.uid===u); try{ await window.__csTeach.send(u,tpl.replace(/\{name\}/g,(p&&p.name||"").split(" ")[0]),id); ok++; }catch(err){ console.warn(err); } }
      dlg.close(); if(typeof window.toast==="function") window.toast(ok?`⭐ Sent to ${ok} ${ok===1?"student":"students"}`:"Couldn't send. Try again.");
    });
  });
  document.addEventListener("click",e=>{ if(e.target.closest("[data-cnseen]")){ markSeen(window.__csHubView); render(); } });
  /* ---------- ⏱ study timer card on the Practice page ---------- */
  const TIPS=[
    "Short, focused sessions beat long ones: your attention drops after about 20–30 minutes. Try 25 minutes, then a 5-minute break.",
    "Practising a little every day helps you remember more than one long session a week. Scientists call it the spacing effect.",
    "Testing yourself (flashcards, practice rounds) makes words stick better than re-reading them. It's called retrieval practice.",
    "Mixing different topics in one session (a bit of grammar, a bit of vocabulary) helps you learn them better than one topic at a time.",
    "Put your phone in another room while the timer runs. Even a phone face-down on the desk pulls some of your attention."];
  function timerCard(){
    const hub=document.getElementById("prHub"); if(!hub) return;
    let c=document.getElementById("prTimer");
    if(!c){ c=document.createElement("div"); c.id="prTimer"; c.className="pr-timer card"; const l=hub.querySelector(".esb")||hub.querySelector(".lede"); if(l) l.insertAdjacentElement("afterend",c); else hub.prepend(c); }
    const T=window.csTimer, st=T?T.state():{run:false,left:0,len:0}, fmt=x=>Math.floor(x/60)+":"+String(x%60).padStart(2,"0");
    const tip=TIPS[new Date().getDate()%TIPS.length], hide=(()=>{ try{ return localStorage.getItem("cs-prtimer-hide")===new Date().toDateString(); }catch(e){ return false; } })();
    if(!T){ c.hidden=true; return; }
    const paused=!st.run&&st.left<st.len;
    if(hide&&!st.run&&!paused){ c.hidden=true; return; }
    c.hidden=false;
    c.innerHTML=st.run||paused?`<div class="prt-row"><span class="prt-big">⏱ ${fmt(st.left)}</span><span class="muted">${st.run?"left in your study session. It keeps going on every page.":"paused"}</span><span class="prt-btns"><button type="button" class="prt-b" data-prt="${st.run?"pause":"resume"}">${st.run?"Pause":"Resume"}</button><button type="button" class="prt-b" data-prt="reset">Stop</button></span></div>`
      :`<div class="prt-row"><b>⏱ Want to study with a timer?</b><span class="prt-btns">${[10,15,25].map(m=>`<button type="button" class="prt-b${m===25?" rec":""}" data-prt="${m}">${m} min</button>`).join("")}<button type="button" class="prt-x" data-prt="hide" aria-label="Hide for today" title="Hide for today">×</button></span></div><p class="prt-tip">💡 ${esc(tip)}</p>`;
  }
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-prt]"); if(!b||!window.csTimer) return; const k=b.dataset.prt;
    if(k==="hide"){ try{ localStorage.setItem("cs-prtimer-hide",new Date().toDateString()); }catch(er){} timerCard(); return; }
    if(k==="pause") window.csTimer.pause(); else if(k==="resume") window.csTimer.resume(); else if(k==="reset") window.csTimer.reset(); else window.csTimer.start(+k);
    timerCard(); });
  let tcT=0; document.addEventListener("cs-timer",()=>{ const now=Date.now(); if(now-tcT<900) return; tcT=now; const v=document.getElementById("v-quiz"); if(v&&!v.hidden) timerCard(); });
  setTimeout(timerCard,1200); window.addEventListener("hashchange",()=>setTimeout(timerCard,50));
  render();
})();
