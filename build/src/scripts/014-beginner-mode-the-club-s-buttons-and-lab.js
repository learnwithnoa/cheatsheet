
(function(){
  const box=document.getElementById("clubMain"); if(!box) return;
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const TZ="America/Santiago", WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const SEEN="cs-club-seen";
  /* beginner mode: the club's buttons and labels in Spanish */
  const isBeg=()=>{ try{ const v=localStorage.getItem("ncs-level")||""; return v==="beginner"||v==='"beginner"'; }catch(e){ return false; } };
  const L=(en,es)=>isBeg()?es:en; window.__clL=L;
  let tab=(()=>{ try{ return sessionStorage.getItem("cs-club-tab")||"week"; }catch(e){ return "week"; } })();
  window.__csDeep=window.__csDeep||{}; const CLS={wall:"community",recordings:"library"}, CLI={community:"wall",library:"recordings"};
  window.__csDeep.club={hash:()=>"#club"+(tab&&tab!=="week"?"/"+(CLS[tab]||tab):""),open:p=>{ const nt=p[0]?(CLI[p[0]]||p[0]):null; if(document.querySelector("#v-club .cl-pplay.on")&&(!nt||nt===tab)) return;  /* never cut off a podcast that's playing */
    if(nt){ tab=nt; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(e){} } setTimeout(()=>{ render(); },0); }};
  const feed=()=>{ if(window.__csPreview&&window.__csPreview.kind==="private") return null; return window.__csClub||null; };
  const posts=f=>((f&&f.posts)||[]).filter(p=>p&&p.week).slice().sort((a,b)=>b.week.localeCompare(a.week));
  const seen=()=>{ try{ return localStorage.getItem(SEEN)||""; }catch(e){ return ""; } };
  const markSeen=id=>{ try{ localStorage.setItem(SEEN,id); }catch(e){} };
  /* class times are Chile time; show the member's own time too when it's different */
  function tzOff(tz,d){ const p=new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).formatToParts(d).reduce((o,x)=>(o[x.type]=x.value,o),{}); return (Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute)-d.getTime())/60000; }
  function chileAt(iso,hm){ const [y,m,d]=iso.split("-").map(Number), [h,mi]=String(hm||"20:00").split(":").map(Number); let t=Date.UTC(y,m-1,d,h,mi); t-=tzOff(TZ,new Date(t))*60000; t=Date.UTC(y,m-1,d,h,mi)-tzOff(TZ,new Date(t))*60000; return new Date(t); }
  const fmtT=(d,tz)=>d.toLocaleTimeString("en-US",Object.assign({hour:"numeric",minute:"2-digit"},tz?{timeZone:tz}:{}));
  const myTz=(()=>{ try{ return Intl.DateTimeFormat().resolvedOptions().timeZone||TZ; }catch(e){ return TZ; } })();
  function timeTxt(d){ const ch=fmtT(d,TZ); if(tzOff(myTz,d)===tzOff(TZ,d)) return ch+" (Chile)"; return ch+" Chile · "+fmtT(d)+" your time"; }
  const fd=iso=>{ const [y,m,d]=iso.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}); };
  function sched(f,wd){ return ((f&&f.info&&f.info.schedule)||[]).find(s=>s.wd===wd)||null; }
  function weekDates(week){ const [y,m,d]=week.split("-").map(Number); return i=>{ const x=new Date(y,m-1,d+i); return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); }; }
  /* Nov 26 2026: the redesigned Home (065-redesign.js) reads the club's next class + this week's post from here */
  window.__csClubNext=function(){ try{ const f=feed(); if(!f) return null; const ps=posts(f); if(!ps[0]) return null; const now=Date.now(); let c=classesOf(f,ps[0]).find(x=>now<=x.end.getTime());
    /* Nov 27 2026 (Noa): after the week's last class (Friday afternoon to Monday's new post) the Home ticket was empty: fall back to the club's weekly schedule */
    if(!c){ const sch=(f.info&&f.info.schedule)||[]; for(let i=0;i<8&&!c;i++){ const iso=new Date(now+i*864e5).toLocaleDateString("en-CA",{timeZone:TZ}), wd=new Date(iso+"T12:00:00").getDay();
      sch.filter(s=>s.wd===wd).forEach(s=>{ if(c) return; const start=chileAt(iso,s.time||"20:00"), end=new Date(start.getTime()+(s.dur||90)*60000); if(now<=end.getTime()) c={start,end,name:s.name||"",title:"",zoom:s.zoom||""}; }); } }
    return {next:c?{start:c.start,end:c.end,name:c.name||"",title:c.title||"",zoom:c.zoom||""}:null,post:{title:ps[0].title||"",week:ps[0].week}}; }catch(e){ return null; } };
  function classesOf(f,p){
    const at=weekDates(p.week);
    return (p.classes||[]).map((c,i)=>{ const wd=c.wd!=null?c.wd:Math.max(0,WD.indexOf(String(c.day||"").slice(0,3))); const s=sched(f,wd)||{}; const date=c.date||at((wd+6)%7); const start=chileAt(date,c.time||s.time||"20:00"); const end=new Date(start.getTime()+((c.dur||s.dur||90)*60000));
      return Object.assign({},s,c,{wd,date,start,end,ico:c.ico||s.ico||"📅",name:c.name||s.name||"",zoom:c.zoom||s.zoom||"",k:"k"+(((wd===1?1:wd===3?2:wd===4?3:4)))}); });
  }
  const planBtn=(date,wd)=>{ const d=new Date(date+"T12:00:00"); d.setDate(d.getDate()-((d.getDay()+6)%7)); const wk=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    return ((window.__clubPlans||{})[wk]||[]).includes(Number(wd))?`<button type="button" class="cs-act cl-planb" data-plan="${wk}|${wd}" aria-expanded="false">📄 ${L("Class material","Material de la clase")}</button>`:""; };
  function clsCard(c,now,rs){
    const live=now>=c.start.getTime()-10*60000&&now<=c.end.getTime(), past=now>c.end.getTime(), today=new Date(c.start).toDateString()===new Date(now).toDateString();
    return `<div class="cl-cls ${c.k}${past?" past":""}"><div class="cl-when"><b>${c.ico} ${esc(fd(c.date))}</b><span>${esc(timeTxt(c.start))}</span>${live?'<span class="cl-live">● Live now</span>':today&&!past?'<span class="cl-today">Today</span>':""}</div>
      <h3>${esc(c.name)}${c.title?`: ${esc(c.title)}`:""}</h3>${c.teaser?`<p>${esc(c.teaser)}</p>`:""}
      <div class="cl-cact">${c.zoom&&!past?`<a class="cl-join" href="${esc(c.zoom)}" target="_blank" rel="noopener">${live?L("🎥 Join now","🎥 Entrar ahora"):"🎥 Zoom link"}</a>`:""}${rs&&!past?`<span class="cl-rsvp" data-rsvp="${esc(rs)}" data-wd="${c.wd}"></span>`:""}${past?planBtn(c.date,c.wd):""}</div></div>`;
  }
  function postHTML(f,p,now,head,cur){
    return `<article class="cl-post">${head?`<div class="cl-meta">${L("Week of","Semana del")} ${esc(fd(p.week))}</div>`:""}${p.title?`<h2>${esc(p.title)}</h2>`:""}${p.intro?`<p class="cl-intro">${esc(p.intro)}</p>`:""}
      ${(p.classes||[]).length?`<div class="cl-classes">${classesOf(f,p).map(c=>clsCard(c,now,cur?p.week:"")).join("")}</div>`:""}${p.closing?`<p class="cl-closing">${esc(p.closing)}</p>`:""}${recapHTML(p)}${chalHTML(p,cur)}</article>`;
  }
  /* after class: recordings, notes and words (added by Noa's nightly helper) */
  function recapHTML(p){ const r=p.recap; if(!r) return ""; const recs=r.recordings||[], voc=r.vocab||[]; if(!recs.length&&!voc.length&&!r.notes) return "";
    return `<div class="cl-recap"><h3>🎬 ${L("After class","Después de clase")}</h3>${recs.length?`<div class="cl-recs">${recs.map(x=>`<a class="cl-rec" href="${esc(x.url)}" target="_blank" rel="noopener"><span>▶</span><b>${esc(x.title||L("Recording","Grabación"))}</b>${x.wd!=null?`<small>${WD[x.wd]}</small>`:""}</a>`).join("")}</div>`:""}
      ${r.notes?`<p class="cl-rnote">${esc(r.notes)}</p>`:""}
      ${voc.length?`<h4>📚 ${L("Words from class","Palabras de la clase")}</h4><ul class="cl-voc">${voc.map((v,i)=>`<li><span><b>${esc(v.w)}</b>${v.tr?` <i>· ${esc(v.tr)}</i>`:""}${v.ex?`<br><small>“${esc(v.ex)}”</small>`:""}</span><button type="button" class="cl-addw" data-clw="${esc(JSON.stringify({w:v.w,tr:v.tr||"",ex:v.ex||""}))}">＋ ${L("My notebook","Mi cuaderno")}</button></li>`).join("")}</ul>`:""}
</div>`; }
  /* weekly challenge: Noa's prompt + members' answers (filled by the community script) */
  function chalHTML(p,cur){ const c=p.challenge; if(!c||!(c.title||c.prompt)) return "";
    return `<div class="cl-chal"><div class="cl-chal-h"><span class="cl-chal-ic" aria-hidden="true">✍️</span><div><div class="cl-meta">${L("Weekly challenge","Desafío semanal")}</div><h3>${esc(c.title||"")}</h3></div></div>${c.prompt?`<p>${esc(c.prompt)}</p>`:""}<div class="cl-chal-list" data-chal="${esc(p.id)}" data-cur="${cur?1:""}"></div></div>`; }
  function nav(){
    const f=feed(), b=document.getElementById("navClub"); if(b){ const signed=window.__csAuth===true||!!window.__csGuest||!!window.__csPreview; b.hidden=!f&&!signed; b.classList.toggle("locked",!f); try{ if(f) localStorage.setItem("cs-club-nav","1"); else if(signed&&window.__csClubKnown&&!window.__csPreview) localStorage.setItem("cs-club-nav","2"); else if(window.__csAuth===false) localStorage.removeItem("cs-club-nav"); }catch(e){} b.title=f?"":"Club members only"; const ps=posts(f); let dot=b.querySelector(".club-dot"); const n=ps[0]&&ps[0].id!==seen()&&!window.__csPreview; if(n&&!dot){ dot=document.createElement("span"); dot.className="club-dot"; dot.title="New this week"; b.appendChild(dot); } else if(!n&&dot) dot.remove(); }
    home();
  }
  function home(){
    const hc=document.getElementById("homeClub"); if(!hc) return; const f=feed(), p=posts(f)[0];
    if(!f){ const signed=window.__csAuth===true||!!window.__csPreview; let hid=false; try{ hid=!window.__csPreview&&Date.now()<+(localStorage.getItem("cs-hc-tease-hide")||0); }catch(e){}
      if(signed&&window.__csClubKnown&&!window.__csGuest&&!hid){ hc.hidden=false; hc.className="hc-club hc-tease"; hc.innerHTML=teaseHTML(); homeSpot(hc,true); } else hc.hidden=true; return; }
    if(!p){ hc.hidden=true; return; }
    homeSpot(hc,false);
    const now=Date.now(), cl=classesOf(f,p), isNew=p.id!==seen();
    const next=cl.find(c=>now<=c.end.getTime());
    hc.hidden=false; hc.className="hc-club"; setTimeout(homeWall,0);
    const pod=(()=>{ const e=window.__clubLatestPod&&window.__clubLatestPod(); return e&&e.date&&Date.now()-new Date(String(e.date).slice(0,10)+"T12:00:00").getTime()<14*864e5?e:null; })();
    hc.innerHTML=`<div class="hc-h"><b>🌼 This week in the club${isNew&&!window.__csPreview?'<span class="hc-new">NEW</span>':""}</b><button type="button" class="hc-go" data-go="club">Open →</button></div>
      <div class="hc-list">${(()=>{ const rl=recList(f); return cl.map(c=>{ const past=now>c.end.getTime(), r=past?rl.find(it=>it.week===p.week&&it.x&&it.x.wd===c.wd):null; return `<div class="${past?"past":""}"><span class="d">${c.ico} ${WD[c.wd]} ${esc(fmtT(c.start,TZ).replace(":00",""))}</span><span>${esc(c.name)}${c.title?`: ${esc(c.title)}`:""}</span>${r?`<button type="button" class="hc-rec" data-recgo="${esc(r.id)}" title="${L("Watch the recording","Ver la grabación")}">🎬 ${L("Recording","Grabación")}</button>`:""}</div>`; }).join(""); })()}</div>
      <button type="button" class="hc-wall" data-hcwall="1" hidden></button>${pod?`<button type="button" class="hc-wall" data-hcgo="recordings">🎧 ${L("This week's club podcast","El podcast de esta semana")}${pod.title?`: ${esc(pod.title)}`:""} →</button>`:""}${(()=>{ const r=[recList(f).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)))[0]].filter(it=>it&&!watched().includes(it.id)&&Date.now()-new Date(it.date+"T12:00:00").getTime()<8*864e5)[0]; if(!r) return ""; const rd=new Date(r.date+"T12:00:00").toLocaleDateString(L("en-US","es-CL"),{month:"short",day:"numeric"}), rt=r.x&&r.x.title&&r.x.title!==r.c.name?r.x.title:"";
      return `<button type="button" class="hc-wall" data-recgo="${esc(r.id)}">🎬 ${L("Watch","Ver")} ${esc(r.c.name||rt||"")}${rt&&r.c.name?`: ${esc(rt)}`:""} <span style="white-space:nowrap">(${esc(rd)})&nbsp;→</span></button>`; })()}
      ${next&&next.zoom&&now>=next.start.getTime()-10*60000?`<a class="cl-join" style="--k:#E5533D" href="${esc(next.zoom)}" target="_blank" rel="noopener">🎥 ${esc(next.name)} is live: join now</a>`:""}`;
  }
  /* not a club member: a locked page with what the club is, how to join, and this week's topics (no Zoom links) */
  let PUB=null, pubTried=false;
  async function loadPublic(){ if(pubTried) return; pubTried=true;
    try{ const F=window.__csFire; if(!F) return; const tok=await F.token(); if(!tok) return;
      const r=await fetch(F.base+"/clubPublic/week",{headers:{Authorization:"Bearer "+tok}}); if(!r.ok) return; const d=await r.json(); PUB=JSON.parse(d.fields.json.stringValue); render(); }catch(e){} }
  let SAMPLE=null, sampleTried=false;
  async function loadSample(){ if(sampleTried) return; sampleTried=true;
    try{ const F=window.__csFire; if(!F) return; const tok=await F.token(); if(!tok) return;
      const r=await fetch(F.base+"/clubPublic/sample",{headers:{Authorization:"Bearer "+tok}}); if(!r.ok) return; const d=await r.json(); SAMPLE=JSON.parse(d.fields.json.stringValue)||null; if(SAMPLE&&SAMPLE.url) render(); }catch(e){} }
  /* the weekly classes with their day and time (from the club's schedule when we have it) */
  function homeSpot(hc,low){ if(!hc.__anchor){ hc.__anchor=document.createComment("homeClub"); hc.before(hc.__anchor); }
    const tb=document.getElementById("todayBox");
    if(low&&tb&&tb.parentNode){ if(tb.nextElementSibling!==hc) tb.after(hc); } else if(!low&&hc.__anchor.nextSibling!==hc) hc.__anchor.after(hc); }
  function teaseHTML(){
    return `<div class="hc-h"><b>🌼 Noa's English Club</b><button type="button" class="hc-tx" data-hctx="1" aria-label="Hide this for now" title="Hide this for now">×</button></div>
      <p class="hc-sub">Every week, club members practice speaking English in a small, friendly group. This is their week:</p>
      <div class="hc-list">${lockSched().map(c=>{ const [d,t]=c.when.split(" · "); return `<div><span class="d">${c.ico} ${esc(d.slice(0,3))} ${esc(t||"")}</span><span><b>${esc(c.name)}</b> · ${esc(c.what)}</span></div>`; }).join("")}</div>
      <div class="hc-locks"><span>🎧 Weekly club podcast</span><span>🎬 Every class recorded</span><span>💬 Community wall</span></div>
      <button type="button" class="hc-join" data-go="club">💛 See the club →</button>`; }
  document.addEventListener("click",e=>{ const x=e.target.closest("[data-hctx]"); if(!x) return; const hc=document.getElementById("homeClub"); if(hc) hc.hidden=true;
    if(!window.__csPreview){ try{ localStorage.setItem("cs-hc-tease-hide",String(Date.now()+30*864e5)); }catch(e){} } });
  function lockSched(){ const WDN=["Sundays","Mondays","Tuesdays","Wednesdays","Thursdays","Fridays","Saturdays"];
    const what={1:"a thought-provoking topic, often with a short video",3:"games and activities, pure speaking",4:"useful expressions, then conversation",5:"relaxed conversation to close the week"};
    const def=[{wd:1,ico:"🧠",name:"Deep Dive Monday",time:"20:00",dur:90},{wd:3,ico:"🃏",name:"Wildcard Wednesday",time:"20:00",dur:90},{wd:4,ico:"💬",name:"Word Up Thursday",time:"20:00",dur:90},{wd:5,ico:"😎",name:"Free Talk Friday",time:"14:30",dur:60}];
    const list=(PUB&&PUB.info&&PUB.info.schedule&&PUB.info.schedule.length)?PUB.info.schedule:def;
    const t12=t=>{ const [h,m]=String(t||"").split(":").map(Number); if(isNaN(h)) return ""; return ((h%12)||12)+(m?":"+String(m).padStart(2,"0"):"")+(h<12?"am":"pm"); };
    return list.map(c=>({ico:c.ico||"",name:c.name,what:what[c.wd]||c.desc||"",when:`${WDN[c.wd]} · ${t12(c.time)}${c.dur?` · ${c.dur} min`:""}`})); }
  document.addEventListener("click",e=>{ const j=e.target.closest("[data-joindm]"); if(!j) return;
    const ask=j.dataset.joindm==="ask";
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ e.preventDefault(); window.toast(ask?"In View as nothing is sent. Students get an empty chat with you, to ask anything.":"In View as nothing is sent. Students get a message to you, ready to send: “Hi Noa! I’m interested in joining…”"); return; }
    if(window.__csGuest){ e.preventDefault(); window.toast("This is a preview: sign in to message Noa."); return; }
    const uid=window.__csFire&&window.__csFire.uid&&window.__csFire.uid(); if(!uid||window.__csGuest||typeof window.__clubDM!=="function") return; e.preventDefault();
    window.__clubDM("J8D2tjQmBaaA2QN730tSfSrjfm73","Noa");   /* Noa's account */
    if(!ask) setTimeout(()=>{ const ta=document.querySelector("#clDm textarea"); if(ta&&!ta.value.trim()){ ta.value=j.dataset.joindm==="back"?"Hi Noa! 👋 I’d like to start my classes with you again. When could we talk about it?":j.dataset.joindm==="stay"?"Hi Noa! 👋 I’m enjoying my free trial and I’d like to stay in the club. How do I join?":"Hi Noa! 👋 I’m interested in joining Noa’s English Club. Can you tell me how it works?"; ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); } },700); });
  function locked(){ loadSample(); document.querySelectorAll("#v-club .cl-igtop").forEach(x=>x.hidden=true);
    const lede=document.querySelector("#v-club .lede"); if(lede) lede.hidden=true;
    const now=Date.now(), p=PUB&&PUB.post, f2=PUB?{info:PUB.info||{}}:null;
    box.innerHTML=`<div class="cl-lock"><div class="cl-lock-h"><h2>Practice speaking English, every week</h2><span class="cl-lock-tag">🔒 Members only</span></div>
      <p>Live conversation classes on Zoom with other learners, in a relaxed, friendly group.</p>
      <div class="cl-pills"><span>🎯 B1 to C1</span><span>🗣️ Fluency first, grammar second</span><span>💻 On Zoom, from anywhere</span></div>
      <div class="cl-lock-sub">Every week</div>
      <div class="cl-tiles">${lockSched().map(c=>`<div class="cl-tile"><div class="cl-tile-h"><span class="cl-tile-i" aria-hidden="true">${c.ico}</span><b>${esc(c.name)}</b></div><p>${esc(c.what)}</p><span class="cl-tile-when">${esc(c.when)}</span></div>`).join("")}</div>
      <p class="cl-lock-small">🕐 All times are <b>Chile time</b> (Santiago).</p>
      <div class="cl-good">
        <div><span aria-hidden="true">🎬</span><p><b>Every class is recorded</b>Missed one? Watch it later.</p></div>
        <div><span aria-hidden="true">🙌</span><p><b>Come when you can</b>Join the classes that fit your week.</p></div>
        <div><span aria-hidden="true">💬</span><p><b>A community wall</b>Chat with the group between classes.</p></div>
        <div><span aria-hidden="true">🎧</span><p><b>A weekly club podcast</b>Short episodes to keep listening all week.</p></div>
      </div>
      ${SAMPLE&&SAMPLE.url?`<a class="cl-sample" href="${esc(SAMPLE.url)}" target="_blank" rel="noopener"><span class="i" aria-hidden="true">🎬</span><span><b>${esc(SAMPLE.title||"Watch a real class")}</b><small>${esc(SAMPLE.note||"See what a club class looks like before you join.")}</small></span></a>`:""}
      <div class="cl-join-row"><a class="cl-join-btn" href="mailto:learnwithnoa@gmail.com?subject=${encodeURIComponent("I want to join Noa's English Club 💛")}" data-joindm="1">💛 I want to join</a><a class="cl-ask-btn" href="mailto:learnwithnoa@gmail.com" data-joindm="ask">💬 Message Noa</a></div><p class="cl-lock-small cl-join-note">Both open a chat with Noa here on Hibi. He’ll send you everything you need to get started.</p></div>
      ${p?`<div class="cl-lock-week"><div class="cl-meta">${L("This week’s classes · preview","Clases de esta semana · vista previa")}</div>${p.title?`<h2>${esc(p.title)}</h2>`:""}<div class="cl-classes">${classesOf(f2,p).map(c=>clsCard(Object.assign({},c,{zoom:""}),now)).join("")}</div></div>`:""}`;
    loadPublic();
  }
  /* ---------- 🎬 recordings library: every recorded class, with its class page ---------- */
  const WKEY="cs-club-watched";
  const watched=()=>{ try{ return JSON.parse(localStorage.getItem(WKEY)||"[]"); }catch(e){ return []; } };
  function setWatched(id,on){ let w=watched().filter(x=>x!==id); if(on) w.push(id); try{ localStorage.setItem(WKEY,JSON.stringify(w)); }catch(e){} try{ window.__clubSocial&&window.__clubSocial.watched&&window.__clubSocial.watched(w); }catch(e){} }
  function recList(f){ const out=[]; posts(f).forEach(p=>{ const r=p.recap||{}, cl=classesOf(f,p); (r.recordings||[]).forEach((x,i)=>{ const c=cl.find(y=>y.wd===x.wd)||(x.wd!=null?(()=>{ const s=sched(f,x.wd)||{}; return {name:s.name,ico:s.ico,date:weekDates(p.week)((x.wd+6)%7)}; })():{});
      out.push({id:p.week+"_"+(x.wd!=null?x.wd:"r"+i),week:p.week,p,x,c:Object.assign({},c,{ico:(sched(f,x.wd)||{}).ico||c.ico}),date:c.date||p.week}); }); });
    /* recordings Noa added by hand (YouTube links), with or without a weekly post */
    (window.__clubRecs||[]).forEach(r=>{ if(!r||!r.url||!r.date) return; const d=new Date(r.date+"T12:00:00"), wd=d.getDay(), mon=new Date(d); mon.setDate(d.getDate()-((wd+6)%7)); const wk=mon.getFullYear()+"-"+String(mon.getMonth()+1).padStart(2,"0")+"-"+String(mon.getDate()).padStart(2,"0");
      const p=posts(f).find(x=>x.week===wk), s=sched(f,r.wd!=null?r.wd:wd)||{}, pc=p?classesOf(f,p).find(y=>y.wd===(r.wd!=null?r.wd:wd)):null;
      const id="yt_"+r.id; if(out.some(o=>o.x.url===r.url)) return;
      const rwd=r.wd!=null?+r.wd:wd; let psum="";
      for(let k=out.length-1;k>=0;k--){ const o=out[k]; if(!String(o.id).startsWith("yt_")&&o.week===wk&&+o.x.wd===rwd&&!/youtu\.?be/.test(String(o.x.url||""))){ psum=psum||o.x.summary||""; out.splice(k,1); } }
      out.push({id,week:wk,p:p||{recap:{},title:""},x:{url:r.url,title:r.name||s.name,summary:r.summary||psum||"",wd:r.wd!=null?r.wd:wd,rid:r.id,diff:r.diff,diffWhy:r.diffWhy,vocab:r.vocab},c:{name:r.name||(pc&&pc.name)||s.name||"",title:r.topic||(pc&&pc.title)||"",ico:s.ico||(pc&&pc.ico)||"🎬",teaser:pc&&pc.teaser,date:r.date},date:r.date}); });
    return out.sort((a,b)=>b.date.localeCompare(a.date)); }
  /* difficulty 1-10 for club material (1 ≈ A2+, 10 ≈ C1) */
  const DLV=n=>n<=2?"A2+":n<=4?"B1":n<=6?"B1+":n<=8?"B2":n<=9?"B2+":"C1";
  function diffHTML(o){ const n=+(o&&o.diff)||0; if(!n) return ""; return `<span class="cl-diff" title="${esc((o.diffWhy?o.diffWhy+" · ":"")+L("Difficulty for club members: 1 is about A2+, 10 is about C1","Dificultad para el club: 1 es como A2+, 10 es como C1"))}"><span class="cl-dbar" aria-hidden="true">${Array.from({length:10},(_,i)=>`<i class="${i<n?"on":""}"></i>`).join("")}</span><b>${n}/10</b><small>${DLV(n)}</small><span class="sr">${L("Difficulty","Dificultad")} ${n} ${L("of","de")} 10</span></span>`; }
  const ytId=u=>{ const m=String(u||"").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/); return m?m[1]:""; };
  function recCard(it,open){ const x=it.x, c=it.c, r=it.p.recap||{}, w=watched().includes(it.id), voc=(r.vocab||[]).concat(x.vocab||[]);
    /* word cards: this recording's own words, or the week's after-class words when this class is the only one they came from (no "Useful phrases": Noa, Nov 28 2026) */
    const rr=r.recordings||[], bv=(x.vocab&&x.vocab.length)?x.vocab:(r.vocab&&r.vocab.length&&rr.length===1&&x.wd!=null&&+rr[0].wd===+x.wd)?r.vocab:[];
    const name=c.name||x.title||L("Class","Clase"), topic=c.title&&c.name?c.title:"", q=[name,topic,x.title,x.summary,c.teaser,it.p.title,voc.map(v=>v.w).join(" ")].join(" ").toLowerCase();
    return `<details class="cl-rcard${w?" seen":""}" data-rid="${esc(it.id)}" data-q="${esc(q)}" data-cls="${esc(c.name||"")}"${open?" open":""}><summary><span class="cl-rico" aria-hidden="true">${esc(c.ico||"🎬")}</span><span class="cl-rt"><b>${esc(name)}${topic?`: ${esc(topic)}`:""}</b><small>${esc(fd(it.date))}${x.diff?` · ${L("Level","Nivel")} ${+x.diff}/10`:""}</small></span>${w?`<span class="cl-wtick" title="${L("Watched","Vista")}">✓</span>`:""}</summary>
      <div class="cl-rbody">${ytId(x.url)?`<button type="button" class="cl-yt" data-yt="${ytId(x.url)}" data-watched="${esc(it.id)}" aria-label="${L("Play the recording","Reproducir la grabación")}"><img src="https://i.ytimg.com/vi/${ytId(x.url)}/hqdefault.jpg" alt="" loading="lazy"><span class="cl-ytp" aria-hidden="true">▶</span></button>`:""}<div class="cl-ract"><span class="cl-recfav" data-recfav="rec_${esc(it.id)}"></span>${ytId(x.url)?"":`<a class="cl-watch" href="${esc(x.url)}" target="_blank" rel="noopener" data-watched="${esc(it.id)}">${L("Open the recording","Abrir la grabación")}<span class="cl-ext" aria-hidden="true">↗</span></a>`}${planBtn(it.date,x.wd)}<button type="button" class="cs-act" data-wtoggle="${esc(it.id)}" aria-pressed="${w}">${w?L("✓ Watched","✓ Vista"):L("Mark as watched","Marcar como vista")}</button>${x.rid&&isNoaNow()?`<button type="button" class="cs-act" data-recdel="${esc(x.rid)}">✕ Remove</button>`:""}</div>
        ${diffHTML(x)}${x.summary||c.teaser?`<p>${esc(x.summary||c.teaser)}</p>`:`<p class="cl-planintro" data-pintro="${esc(it.date)}"></p>`}
        ${bv.length&&window.__clVocCards?`<div class="cl-bwords">${window.__clVocCards(bv,`📚 ${L("Words from this class","Palabras de esta clase")}`)}</div>`:x.wd!=null?`<div class="cl-bwords" data-bw="${esc(it.week)}|${+x.wd}"></div>`:""}</div></details>`; }
  let RFOCUS=null;
  /* ---------- 🎧 the weekly club podcast (episodes stored in clubStats/_podcast: Noa adds, members listen) ---------- */
  const pods=()=>(window.__clubPods||[]).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))||(b.at||0)-(a.at||0));
  function podPlayer(u){ u=String(u||""); const yt=ytId(u); { const dm=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{20,})/); if(dm) return `<div class="cl-pplay" data-drive="${dm[1]}"><button type="button" class="cl-pbtn" data-pplay="1" aria-label="${L("Play","Reproducir")}">▶</button><div class="cl-pmid"><input type="range" class="cl-pbar" min="0" max="1000" value="0" aria-label="${L("Position","Posición")}"><div class="cl-ptime"><span data-pt="cur">0:00</span><span data-pt="dur">–:––</span></div></div><button type="button" class="cs-act cl-pskip" data-pskip="-15" aria-label="${L("Back 15 seconds","Atrás 15 segundos")}">↺ 15</button><button type="button" class="cs-act cl-pskip" data-pskip="15" aria-label="${L("Forward 15 seconds","Adelante 15 segundos")}">15 ↻</button><button type="button" class="cs-act cl-pspeed" data-pspeed="1">1×</button><label class="cl-pvolw" title="${L("Volume","Volumen")}"><button type="button" class="cl-pmute" data-pmute="1" aria-label="${L("Mute","Silenciar")}">🔊</button><input type="range" class="cl-pvol" min="0" max="100" value="100" aria-label="${L("Volume","Volumen")}"></label><audio preload="metadata" src="pod/${dm[1]}.mp3" data-alt="https://drive.usercontent.google.com/download?id=${dm[1]}&export=download&confirm=t"></audio></div>`; } if(yt) return `<button type="button" class="cl-yt" data-yt="${yt}" data-watched="pod_${yt}" aria-label="${L("Play the episode","Reproducir el episodio")}"><img src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt="" loading="lazy"><span class="cl-ytp" aria-hidden="true">▶</span></button>`;
    let m=u.match(/open\.spotify\.com\/(episode|show)\/([\w]+)/); if(m) return `<iframe class="cl-podsp" src="https://open.spotify.com/embed/${m[1]}/${m[2]}" title="Podcast episode" loading="lazy" allow="encrypted-media; clipboard-write; fullscreen; picture-in-picture"></iframe>`;
    m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{20,})/); if(m) return `<iframe class="cl-poddr" src="https://drive.google.com/file/d/${m[1]}/preview" title="Podcast episode" loading="lazy" allow="autoplay"></iframe>`;
    if(/\.(mp3|m4a|wav|ogg|aac)(\?|$)/i.test(u)) return `<audio class="cl-podau" controls preload="none" src="${esc(u)}"></audio>`;
    return `<a class="cl-watch" href="${esc(u)}" target="_blank" rel="noopener">🎧 ${L("Listen","Escuchar")}</a>`; }
  window.__clubLatestRec=()=>{ try{ const f=window.__csClub; return f?recList(f)[0]||null:null; }catch(e){ return null; } };
  window.__clubLatestPod=()=>{ try{ return pods()[0]||null; }catch(e){ return null; } };
  function podHTML(f){ const ps=pods(), noa=isNoaNow();
    const add=noa?`<details class="cl-podadd"><summary>＋ Add an episode <span class="muted">(only you see this)</span></summary><form class="cl-recform" data-podform="1"><label>Link to the episode<input name="url" type="url" required placeholder="Google Drive, YouTube or Spotify link"></label><div class="cl-rf2"><label>Week of (Monday)<input name="date" type="date" required value="${weekOf(Date.now())}"></label><label>Title<input name="title" maxlength="120" placeholder="e.g. Pets, interviews & animal verbs"></label></div><label>Show notes <span class="muted">(optional: what we cover, new words)</span><textarea name="notes" rows="3" maxlength="1500"></textarea></label><div class="cs-row"><span class="cs-msg" role="status"></span><button type="submit" class="cs-send">Add the episode</button></div><p class="cl-note">Google Drive: share the audio file as “Anyone with the link can view”, then paste its link.</p></form></details>`:"";
    if(!ps.length) return `<div class="cl-sec cl-pod"><div class="cl-podh"><span class="cl-podic" aria-hidden="true">🎧</span><div><h2>${L("The club podcast","El podcast del club")}</h2><p class="cl-note">${L("Coming soon: a short weekly recap of our classes, with the topics and new words, to listen to on the bus, at the gym or while you cook.","Muy pronto: un resumen semanal corto de nuestras clases, con los temas y las palabras nuevas, para escuchar en la micro, en el gym o mientras cocinas.")}</p></div><span class="cl-soonb">${L("Coming soon","Muy pronto")}</span></div>${add}</div>`;
    const [e,...older]=ps;
    return `<div class="cl-sec cl-pod"><div class="cl-podh"><span class="cl-podic" aria-hidden="true">🎧</span><div><div class="cl-meta">${L("The club podcast","El podcast del club")} · ${L("Week of","Semana del")} ${esc(fd(e.date))}</div><h2>${esc(e.title||L("This week in the club","Esta semana en el club"))}</h2>${diffHTML(e)}</div>${noa?`<button type="button" class="cl-podx" data-poddel="${esc(e.id)}" title="Remove this episode (only you see this)" aria-label="Remove this episode">🗑</button>`:""}</div>
      <div class="cl-podp">${podPlayer(e.url)}</div><div class="cl-stars" data-stars="pr_${esc(e.id)}"></div>${podNotes(e)}
      ${older.length?`<details class="cl-podold"><summary>${L("Earlier episodes","Episodios anteriores")} (${older.length})</summary>${older.map(x=>`<details class="cl-rcard"><summary><span class="cl-rico" aria-hidden="true">🎧</span><span class="cl-rt"><b>${esc(x.title||L("Club podcast","Podcast del club"))}</b><small>${L("Week of","Semana del")} ${esc(fd(x.date))}${x.diff?` · ${L("Level","Nivel")} ${+x.diff}/10`:""}</small></span></summary><div class="cl-rbody">${diffHTML(x)}${podPlayer(x.url)}<div class="cl-stars" data-stars="pr_${esc(x.id)}"></div>${podNotes(x)}${noa?`<button type="button" class="cs-act" data-poddel="${esc(x.id)}">✕ Remove</button>`:""}</div></details>`).join("")}</details>`:""}${add}</div>`; }
  function podNotes(e){ return e.notes||(e.vocab||[]).length?`<details class="cl-podn"><summary>📝 ${L("Show notes","Notas del episodio")}${(e.vocab||[]).length?` <span class="muted">· ${e.vocab.length} ${L("words","palabras")}</span>`:""}</summary>${e.notes?`<p>${esc(e.notes).replace(/\n/g,"<br>")}</p>`:""}${podVocab(e)}</details>`:""; }
  /* word cards you swipe (podcast + library): the color shows the part of speech, in rainbow order (Nov 23 2026).
     Board/podcast words don't store it, so it's worked out from the card: "(noun)" in the text, "To …", the meaning ("To …" / "A …"), or a longer saying. */
  const POS=[["noun","noun"],["verb","verb"],["phrasal","phrasal verb"],["adj","adjective"],["adv","adverb"],["expr","expression"],["slang","slang"],["other","word"]];
  function vocPos(x){ const t=String(x.w||""), m=String(x.tr||"").trim(), lp=String(x.pos||"").toLowerCase();
    const tag=(lp||(t.match(/\(([^)]*)\)\s*$/)||[])[1]||(m.match(/^\(([^)]*)\)/)||[])[1]||"").toLowerCase();
    if(/phrasal/.test(tag)) return "phrasal"; if(/\bverb/.test(tag)) return "verb"; if(/noun/.test(tag)) return "noun"; if(/adj/.test(tag)) return "adj"; if(/adv/.test(tag)) return "adv"; if(/slang/.test(tag)) return "slang"; if(/idiom|expression|phrase|saying/.test(tag)) return "expr";
    const w=t.replace(/\([^)]*\)/g," ").replace(/\s+/g," ").trim(), n=w.split(" ").length;
    if(/[áéíóúñ¿¡]|\b(que|la|los|las|el|se|me|como|una|del|al|pal|hacer|andar|estar|tirarle|echar)\b/i.test(w)) return "expr";   /* a Spanish saying */
    if(/^to\s/i.test(w)) return /^to\s+\S+\s+(up|down|out|off|on|in|over|away|back|around|round|through|into|along|after|by|for|with)\b/i.test(w)&&n<=4?"phrasal":n<=3?"verb":"expr";
    if(/^(a|an|the)\s/i.test(w)&&n<=4) return "noun";
    if(n>=2&&(/['’]/.test(w)||/^(i|it|you|we|they|he|she|that|this|no|not|on|in|at|so|how|what|sounds?|let)\b/i.test(w))) return "expr";   /* a whole little sentence: "I'm in", "it depends", "no big deal" */
    if(n===2&&/\s(up|down|out|off|on|in|over|away|back|around|round|through|along)$/i.test(w)) return "phrasal";
    if(n>=3) return "expr";
    if(/^to\s/i.test(m)) return n===2&&/\s(up|down|out|off|on|in|over|away|back|around)$/i.test(w)?"phrasal":"verb";
    if(n===1&&/^(a|an|the|someone who|something that|a person)\s/i.test(m)) return "noun";
    if(n===1&&/ly$/i.test(w)) return "adv";
    if(n===2) return "expr";
    return "other"; }
  window.__clVocPos=x=>vocPos(x||{}); window.__clPosLabels=Object.fromEntries(POS);   /* also used by 063-pos-colors.js (word packs) */
  window.__clVocCards=function(v,title){ v=(v||[]).filter(x=>x&&x.w); if(!v.length) return "";
    const ord=k=>POS.findIndex(p=>p[0]===k), cards=v.map((x,i)=>({x,i,k:vocPos(x)})).sort((a,b)=>ord(a.k)-ord(b.k)||a.i-b.i);
    return `<div class="cl-pvh"><b>${title} <span class="muted">· ${v.length}</span></b><button type="button" class="cs-act" data-clwall="${esc(JSON.stringify(v.map(x=>({w:x.w,tr:x.tr||"",ex:x.ex||""}))))}">＋ ${L("Save all to My notebook","Guardar todas en Mi cuaderno")}</button></div><div class="cl-pvrow">${cards.map(({x,k})=>{ const lbl=(POS.find(p=>p[0]===k)||[])[1]||"";
      return `<div class="cl-pvc pos-${k}">${lbl?`<span class="cl-pos">${lbl}</span>`:""}<b>${esc(x.w)}</b>${x.tr?(()=>{ /* "🇨🇱 Spanish · English meaning": Windows shows the flag as the letters "CL", so drop it and show the Spanish and the meaning in their own styles (Nov 27 2026, Noa) */
        let t=String(x.tr).replace(/^\((noun|verb|phrasal verb|adjective|adverb|idiom|expression|slang)\)\s*/i,""); const fl=/^\s*(?:\uD83C[\uDDE6-\uDDFF]){2}\s*/.test(t); t=t.replace(/^\s*(?:\uD83C[\uDDE6-\uDDFF]){2}\s*/,"");
        const i=t.indexOf(" · "); if(fl&&i>0) return `<i class="cl-es" lang="es">${esc(t.slice(0,i))}</i><span class="cl-mean">${esc(t.slice(i+3))}</span>`;
        return `<i>${esc(t)}</i>`; })():""}${x.ex?`<small>“${esc(x.ex)}”</small>`:""}<button type="button" class="cl-addw" data-clw="${esc(JSON.stringify({w:x.w,tr:x.tr||"",ex:x.ex||""}))}">＋ ${L("My notebook","Mi cuaderno")}</button></div>`; }).join("")}</div>`; };
  function podVocab(e){ return window.__clVocCards(e.vocab, `📚 ${L("Words from this episode","Palabras de este episodio")}`); }
  function weekOf(t){ const d=new Date(t); d.setDate(d.getDate()-((d.getDay()+6)%7)); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
  function podNewHTML(){ const e=pods()[0]; if(!e||Date.now()-new Date(e.date+"T12:00:00").getTime()>10*864e5) return "";
    return `<button type="button" class="cl-catch cl-podnew" data-clt="recordings"><span aria-hidden="true">🎧</span><span><b>${L("New podcast episode:","Nuevo episodio del podcast:")}</b> ${esc(e.title||L("this week in the club","esta semana en el club"))}</span><span class="cl-mego">→</span></button>`; }
  const isNoaNow=()=>!window.__csPreview&&!window.__csGuest&&window.__csFire&&window.__csFire.uid&&window.__csFire.uid()==="J8D2tjQmBaaA2QN730tSfSrjfm73";
  function recAddHTML(f){ if(!isNoaNow()) return ""; const sc=((f.info||{}).schedule||[]).slice().sort((a,b)=>((a.wd+6)%7)-((b.wd+6)%7)); const d=new Date(), iso=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    return `<details class="cl-sec cl-recadd"><summary>＋ Add a recording <span class="muted">(only you see this)</span></summary><form class="cl-recform" data-recform="1">
      <label>YouTube link<input name="url" type="url" required placeholder="https://youtu.be/…"></label>
      <div class="cl-rf2"><label>Class date<input name="date" type="date" required value="${iso}"></label><label>Class<select name="wd">${sc.map(s=>`<option value="${s.wd}">${esc((s.ico||"")+" "+s.name)}</option>`).join("")}<option value="">Other</option></select></label></div>
      <label>Topic <span class="muted">(optional: filled in from that week’s post)</span><input name="topic" maxlength="120" placeholder="e.g. Pets, People & Why Animals Feel Safe"></label>
      <label>Short summary <span class="muted">(optional)</span><textarea name="summary" rows="2" maxlength="500" placeholder="1–2 lines on what we did"></textarea></label>
      <div class="cs-row"><span class="cs-msg" role="status"></span><button type="submit" class="cs-send">Add to the Library</button></div>
      <p class="cl-note">Upload the class to YouTube as <b>Unlisted</b>, then paste the link here. Members watch it inside Hibi.</p></form></details>`; }
  function recTab(f){ const list=recList(f), n=list.filter(x=>watched().includes(x.id)).length;
    if(!list.length) return recAddHTML(f)+`<p class="cl-empty">${L("Class recordings will collect here: each one with its words and expressions. Free Talk Friday usually appears the day after class.","Aquí se juntan las grabaciones de las clases, cada una con sus palabras y expresiones. Free Talk Friday normalmente aparece el día después de la clase.")}</p>`;
    const open=RFOCUS; RFOCUS=null;
    const sorted=list.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    const names=[]; ((f.info||{}).schedule||[]).slice().sort((a,b)=>((a.wd+6)%7)-((b.wd+6)%7)).forEach(s=>{ if(s.name&&!names.some(x=>x.name===s.name)) names.push({name:s.name,ico:s.ico||""}); });
    sorted.forEach(it=>{ const nm=it.c.name; if(nm&&!names.some(x=>x.name===nm)) names.push({name:nm,ico:it.c.ico||""}); });
    if(RCLS&&!names.some(x=>x.name===RCLS)) RCLS="";
    const shown=RCLS?sorted.filter(it=>it.c.name===RCLS):sorted;
    if(open){ const k=shown.findIndex(it=>it.id===open); if(k>=RSHOW) RSHOW=Math.ceil((k+1)/8)*8; }
    const vis=shown.slice(0,RSHOW), more=shown.length-vis.length;
    const pill=(v,lab,cnt)=>`<button type="button" class="cl-rpill" data-rcls="${esc(v)}" aria-pressed="${RCLS===v}"${cnt===0?" disabled":""}>${lab}${cnt!=null?` <span class="cl-rpn">${cnt}</span>`:""}</button>`;
    const pills=names.length>1?`<div class="cl-rpills" role="group" aria-label="${L("Filter by class","Filtrar por clase")}">${pill("",L("All","Todas"),null)}${names.map(x=>pill(x.name,`${x.ico?`<span aria-hidden="true">${esc(x.ico)}</span> `:""}${esc(x.name)}`,sorted.filter(it=>it.c.name===x.name).length)).join("")}</div>`:"";
    return recAddHTML(f)+`<div class="cl-rhead">${pills}<span class="cl-rcount">${n}/${list.length} ${L("watched","vistas")}</span></div>
      <div class="cl-rlist">${vis.map(it=>recCard(it,open===it.id)).join("")}</div>${more>0||RSHOW>8?`<div class="cl-rmrow">${more>0?`<button type="button" class="cl-rmore" data-rmore="1">${L("Show more","Ver más")} <span class="muted">(${more})</span></button>`:""}${RSHOW>8?`<button type="button" class="cl-rmore" data-rless="1">${L("Show less","Ver menos")}</button>`:""}</div>`:""}${shown.length?"":`<p class="cl-empty">${L("No recordings of this class yet.","Todavía no hay grabaciones de esta clase.")}</p>`}`; }
  let RCLS="", RSHOW=8;
  document.addEventListener("click",e=>{ const pc=e.target.closest("[data-rcls]"); const keep=fn=>{ const y=window.scrollY; fn(); render(); window.scrollTo(0,y); }; if(pc){ keep(()=>{ RCLS=pc.dataset.rcls; RSHOW=8; }); return; } if(e.target.closest("[data-rmore]")) keep(()=>{ RSHOW+=8; });
    if(e.target.closest("[data-rless]")){ RSHOW=8; render(); const h=document.querySelector("#v-club .cl-rhead"); if(h) h.scrollIntoView({block:"start"}); } });
  /* missed a class this week? */
  function catchHTML(f,p,now){ const list=recList(f).filter(it=>it.week===p.week&&!watched().includes(it.id)); if(!list.length) return "";
    const it=list[0], voc=((p.recap||{}).vocab||[]).length;
    return `<button type="button" class="cl-catch" data-recgo="${esc(it.id)}"><span aria-hidden="true">🎬</span><span><b>${L("Missed","¿Te perdiste")} ${esc(it.c.name||it.x.title||"")}${L("?","?")}</b> ${L("Watch the recording","Mira la grabación")}${voc?` ${L("and save","y guarda")} ${voc} ${L("new words","palabras nuevas")}`:""}.</span><span class="cl-mego">→</span></button>`; }
  /* ---------- 📅 calendar ---------- */
  let CALM=0, CALD=null, CALPOP=false;
  const isoD=x=>x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");
  function eventsIn(f,y,m){ const ev=[], ps=posts(f), info=f.info||{}, covered=new Set();
    ps.forEach(p=>{ const at=weekDates(p.week); for(let i=0;i<7;i++) covered.add(at(i)); classesOf(f,p).forEach(c=>{ const d=new Date(c.date+"T12:00:00"); if(d.getFullYear()===y&&d.getMonth()===m) ev.push(Object.assign({},c,{post:p})); }); });
    const days=new Date(y,m+1,0).getDate();
    for(let i=1;i<=days;i++){ const d=new Date(y,m,i), iso=isoD(d); if(covered.has(iso)) continue;
      (info.schedule||[]).filter(s=>s.wd===d.getDay()).forEach(s=>{ const start=chileAt(iso,s.time||"20:00"); ev.push(Object.assign({},s,{date:iso,start,end:new Date(start.getTime()+(s.dur||90)*60000),title:"",teaser:s.desc||""})); }); }
    const recs=recList(f); ev.forEach(e=>{ e.rec=recs.find(r=>r.date===e.date&&(r.c.name===e.name||r.x.wd===e.wd)); });
    return ev.sort((a,b)=>a.start-b.start); }
  const icsT=d=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  function gcal(e){ const q=new URLSearchParams({action:"TEMPLATE",text:`${e.name}${e.title?": "+e.title:""} · Noa's English Club`,dates:icsT(e.start)+"/"+icsT(e.end),details:(e.teaser?e.teaser+"\n\n":"")+(e.zoom?"Zoom: "+e.zoom:"")}); return "https://calendar.google.com/calendar/render?"+q.toString(); }
  function icsFile(list,weekly){ const L2=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Hibi//Club//EN","CALSCALE:GREGORIAN"];
    list.forEach((e,i)=>{ L2.push("BEGIN:VEVENT","UID:hibi-club-"+(weekly?"w"+e.wd:icsT(e.start))+"-"+i+"@learnwithnoa","DTSTAMP:"+icsT(new Date()),"DTSTART:"+icsT(e.start),"DTEND:"+icsT(e.end));
      if(weekly) L2.push("RRULE:FREQ=WEEKLY");
      L2.push("SUMMARY:"+(e.name+(e.title?": "+e.title:"")+" · Noa's English Club").replace(/[,;]/g,"\\$&"),"DESCRIPTION:"+((e.teaser||"")+(e.zoom?" Zoom: "+e.zoom:"")).replace(/[,;]/g,"\\$&").replace(/\n/g,"\\n"));
      if(e.zoom) L2.push("URL:"+e.zoom); L2.push("BEGIN:VALARM","TRIGGER:-PT30M","ACTION:DISPLAY","DESCRIPTION:Club class in 30 minutes","END:VALARM","END:VEVENT"); });
    L2.push("END:VCALENDAR"); return "data:text/calendar;charset=utf-8,"+encodeURIComponent(L2.join("\r\n")); }
  function calTab(f,now){ const base=new Date(); const y0=new Date(base.getFullYear(),base.getMonth()+CALM,1), y=y0.getFullYear(), m=y0.getMonth();
    const bds=((window.__clubBdays&&window.__clubBdays())||[]).filter(b=>+b.bd.slice(0,2)===m+1).map(b=>{ let d=+b.bd.slice(3); if(m===1&&d===29&&new Date(y,1,29).getMonth()!==1) d=28; return {bday:1,date:isoD(new Date(y,m,d)),name:b.name,uid:b.uid,by:b.by,ico:"🎂",k:"bday"}; });
    const ev=eventsIn(f,y,m).concat(bds).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0), today=isoD(new Date());
    if(window.__clubLoadProfs&&!window.__clubBdLoaded){ window.__clubBdLoaded=1; setTimeout(window.__clubLoadProfs,0); }
    const bdHTML=e=>{ const a=e.by?(new Date(e.date+"T12:00").getFullYear()-(+e.by)):0; return `<div class="cl-cev bday"><div><b>🎂 ${L("","Cumpleaños de ")}<button type="button" class="cs-nameb" data-prof="${esc(e.uid)}" data-pname="${esc(e.name)}">${esc(e.name)}</button>${L("’s birthday","")}</b>${a>0?`<span>${L("Turning","Cumple")} ${a} 🎈</span>`:""}</div>${e.uid!==(window.__csFire&&window.__csFire.uid&&window.__csFire.uid())&&e.date===today?`<div class="cl-cact"><button type="button" class="cs-send cl-dmbtn" data-dmto="${esc(e.uid)}" data-dmname="${esc(e.name)}">💬 ${L("Say happy birthday","Saludar")}</button></div>`:""}</div>`; }; if(!CALD||CALD.slice(0,7)!==isoD(y0).slice(0,7)){ const nx=ev.find(e=>e.date>=(CALM===0?today:isoD(y0))); CALD=CALM===0?(ev.some(e=>e.date===today)?today:(nx?nx.date:today)):(nx?nx.date:isoD(y0)); }
    const first=(y0.getDay()+6)%7, days=new Date(y,m+1,0).getDate(), cells=[];
    for(let i=0;i<first;i++) cells.push('<span class="cl-cd empty"></span>');
    for(let i=1;i<=days;i++){ const iso=isoD(new Date(y,m,i)), es=ev.filter(e=>e.date===iso);
      cells.push(`<button type="button" class="cl-cd${iso===today?" today":""}${iso===CALD?" sel":""}${iso<today?" past":""}" data-cald="${iso}" aria-label="${esc(fd(iso))}${es.length?": "+es.map(e=>e.name).join(", "):""}" aria-pressed="${iso===CALD}"><span class="n">${i}</span><span class="e">${es.map(e=>`<i class="${e.k||""}">${esc(e.ico||"📅")}</i>`).join("")}</span></button>`); }
    const sel=ev.filter(e=>e.date===CALD), sched2=((f.info||{}).schedule||[]).map(s=>{ const d=new Date(); for(let i=0;i<8;i++){ const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+i); if(x.getDay()===s.wd){ const st=chileAt(isoD(x),s.time||"20:00"); return Object.assign({},s,{start:st,end:new Date(st.getTime()+(s.dur||90)*60000),title:"",teaser:s.desc||""}); } } }).filter(Boolean);
    const mname=y0.toLocaleDateString(L("en-US","es-CL"),{month:"long",year:"numeric"}), wds=L("Mon Tue Wed Thu Fri Sat Sun","Lun Mar Mié Jue Vie Sáb Dom").split(" ");
    const allBox=sched2.length?`<div class="cl-calall"><p>${L("Want every class in your calendar, with a reminder 30 minutes before?","¿Quieres todas las clases en tu calendario, con un recordatorio 30 minutos antes?")}</p><a class="cl-join" style="--k:var(--c4)" href="${icsFile(sched2,true)}" download="noas-english-club.ics">⬇ ${L("Add all weekly classes to my calendar","Agregar todas las clases semanales a mi calendario")}</a><small>${L("Opens in Google Calendar, Apple Calendar or Outlook. Moved or cancelled classes show up here and on the weekly post.","Se abre en Google Calendar, Apple Calendar u Outlook. Las clases cambiadas o canceladas aparecen aquí y en el post semanal.")}</small></div>`:"";
    const pop=CALPOP?`<div class="cl-cpop" role="dialog" aria-label="${esc(fd(CALD))}"><div class="cl-cpoph"><h3>${esc(fd(CALD))}</h3><button type="button" class="cs-act" data-calx="1" aria-label="${L("Close","Cerrar")}">✕</button></div>${sel.length?sel.map(e=>{ if(e.bday) return bdHTML(e); const past=now>e.end.getTime(); return `<div class="cl-cev ${e.k||""}${past?" past":""}"><div><b>${esc(e.ico||"📅")} ${esc(e.name)}${e.title?`: ${esc(e.title)}`:""}</b><span>${esc(timeTxt(e.start))}${e.dur?" · "+e.dur+" min":""}${e.host?" · "+L("with","con")+" "+esc(e.host):""}</span>${e.teaser?`<p>${esc(e.teaser)}</p>`:""}</div>
        <div class="cl-cact">${past?(e.rec?`<button type="button" class="cl-join" style="--k:#E5533D" data-recgo="${esc(e.rec.id)}">🎬 ${L("Recording","Grabación")}</button>`:`<span class="muted">${L("This class already happened.","Esta clase ya pasó.")}</span>`):`${e.zoom?`<a class="cs-act cl-zoomb" href="${esc(e.zoom)}" target="_blank" rel="noopener">🎥 Zoom</a>`:""}<a class="cs-act" href="${esc(gcal(e))}" target="_blank" rel="noopener">📅 Google Calendar</a><a class="cs-act" href="${icsFile([e],false)}" download="club-class.ics">⬇ .ics</a>`}</div></div>`; }).join(""):`<p class="cl-empty">${L("No club classes this day.","No hay clases del club este día.")}</p>`}</div>`:"";
    return `<div class="cl-cal"><div class="cl-calh"><button type="button" class="cs-act" data-calm="-1" aria-label="${L("Previous month","Mes anterior")}">‹</button><b>${esc(mname)}</b><button type="button" class="cs-act" data-calm="1" aria-label="${L("Next month","Mes siguiente")}">›</button></div>
      <div class="cl-cgrid">${wds.map(w=>`<span class="cl-cw">${w}</span>`).join("")}${cells.join("")}</div>${pop}<p class="cl-chint">${L("Tap a day to see its classes and Zoom links. 🎂 = a member’s birthday.","Toca un día para ver sus clases y links de Zoom. 🎂 = cumpleaños de alguien del club.")}</p></div>${allBox}
      <div class="cl-cday" hidden><h3>${esc(fd(CALD))}</h3>${sel.length?sel.map(e=>{ if(e.bday) return bdHTML(e); const past=now>e.end.getTime(); return `<div class="cl-cev ${e.k||""}${past?" past":""}"><div><b>${esc(e.ico||"📅")} ${esc(e.name)}${e.title?`: ${esc(e.title)}`:""}</b><span>${esc(timeTxt(e.start))}</span>${e.teaser?`<p>${esc(e.teaser)}</p>`:""}</div>
        <div class="cl-cact">${past?(e.rec?`<button type="button" class="cl-join" style="--k:#E5533D" data-recgo="${esc(e.rec.id)}">🎬 ${L("Recording","Grabación")}</button>`:""):`${e.zoom?`<a class="cl-join" href="${esc(e.zoom)}" target="_blank" rel="noopener">🎥 Zoom</a>`:""}<a class="cs-act" href="${esc(gcal(e))}" target="_blank" rel="noopener">📅 Google Calendar</a><a class="cs-act" href="${icsFile([e],false)}" download="club-class.ics">⬇ .ics</a>`}</div></div>`; }).join(""):`<p class="cl-empty">${L("No club classes this day.","No hay clases del club este día.")}</p>`}</div>
      `; }
  /* past weeks: under the recordings in the Library tab */
  function pastHTML(f,ps,now){ const old=ps.slice(1); if(!old.length) return "";
    return `<div class="cl-sec cl-pastw"><h2>🗂 ${L("Past weeks","Semanas anteriores")} <small>(${old.length})</small></h2><p class="cl-note">${L("Every weekly post, with its topics, words and comments.","Cada post semanal, con sus temas, palabras y comentarios.")}</p>${old.map(p=>`<details class="cl-past"><summary>${esc(p.title||"Week of "+fd(p.week))}<span>${p.recap&&(p.recap.recordings||[]).length?"🎬 ":""}${L("Week of","Semana del")} ${esc(fd(p.week))}</span></summary>${postHTML(f,p,now,false)}<div class="cl-thread" data-thread="${esc(p.id)}" data-lazy="1"></div></details>`).join("")}</div>`; }
  /* the next class, first thing on "This week" */
  function nextHTML(f,p,now){ const cl=classesOf(f,p), c=cl.find(x=>now<=x.end.getTime()); if(!c) return "";
    const live=now>=c.start.getTime()-10*60000, today=new Date(c.start).toDateString()===new Date(now).toDateString();
    return `<div class="cl-next ${c.k}"><div class="cl-next-k">${live?`<span class="cl-live">● ${L("Live now","En vivo")}</span>`:`⏭ ${L("Next class","Próxima clase")}${today?` · <b>${L("today","hoy")}</b>`:""}`}</div>
      <div class="cl-next-b"><span class="cl-next-ic" aria-hidden="true">${esc(c.ico)}</span><div><h3>${esc(c.name)}${c.title?`: ${esc(c.title)}`:""}</h3><span>${esc(fd(c.date))} · ${esc(timeTxt(c.start))}</span></div></div>
      <div class="cl-cact">${c.zoom?`<a class="cl-join" href="${esc(c.zoom)}" target="_blank" rel="noopener">${live?L("🎥 Join now","🎥 Entrar ahora"):"🎥 Zoom link"}</a>`:""}<span class="cl-rsvp" data-rsvp="${esc(p.week)}" data-wd="${c.wd}"></span></div></div>`; }
  /* weekly schedule + useful links (shown under the calendar) */
  function linksHTML(f){ const info=f.info||{};
      const sc=(info.schedule||[]).slice().sort((a,b)=>((a.wd+6)%7)-((b.wd+6)%7));
      const nextDate=wd=>{ const d=new Date(); for(let i=0;i<8;i++){ const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+i); if(x.getDay()===wd) return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); } };
      return `<div class="cl-sec" hidden><h2>🗓 ${L("Every week","Todas las semanas")}</h2>${sc.map(s=>{ const st=chileAt(nextDate(s.wd),s.time); return `<div class="cl-row"><span class="i">${s.ico||"📅"}</span><span class="t"><b>${esc(s.name)}</b><span>${["Sundays","Mondays","Tuesdays","Wednesdays","Thursdays","Fridays","Saturdays"][s.wd]} · ${esc(timeTxt(st))} · ${s.dur||90} min${s.host?" · with "+esc(s.host):""}</span>${s.desc?`<br><span>${esc(s.desc)}</span>`:""}</span>${s.zoom?`<a class="cl-join" style="--k:var(--c2)" href="${esc(s.zoom)}" target="_blank" rel="noopener">🎥 Zoom link</a>`:""}</div>`; }).join("")}
        <p class="cl-note">${L("All classes are optional and open to every level. The Zoom links stay the same every week.","Todas las clases son opcionales y abiertas a todos los niveles. Los links de Zoom son los mismos cada semana.")}</p></div>
        ${(info.links||[]).length?`<div class="cl-sec"><h2>🔗 ${L("Useful links","Links útiles")}</h2>${info.links.map(l=>`<div class="cl-row"><span class="i">${esc(l.ico||"🔗")}</span><span class="t"><b>${esc(l.title)}</b>${l.note?`<span>${esc(l.note)}</span>`:""}</span><a class="cl-join" style="--k:var(--c4)" href="${esc(l.url)}" target="_blank" rel="noopener">Open ↗</a></div>`).join("")}</div>`:""}`;
  }
  /* ---------- 👋 welcome + guidelines ---------- */
  const RULES_EN=["✔️ Respect everyone, whatever their level. Laugh with people, never at them.","💡 Mistakes are welcome here. That’s how we learn.","💬 Bring positive energy, and stick to English as much as you can (a little Spanish to get unstuck is fine).","🔒 What’s shared in the club stays in the club.","🚫 No spam, no self-promotion.","🛟 Questions? Just ask, we’ve got you."];
  const RULES_ES=["✔️ Respeta a todos, sin importar su nivel. Ríete con las personas, nunca de ellas.","💡 Aquí los errores son bienvenidos. Así se aprende.","💬 Trae buena energía y usa el inglés lo más que puedas (un poco de español para destrabarte está bien).","🔒 Lo que se comparte en el club, queda en el club.","🚫 Nada de spam ni autopromoción.","🛟 ¿Dudas? Solo pregunta, aquí te ayudamos."];
  const IG_GROUP="https://www.instagram.com/j/AbYEKteyhp-zyxxc/";
  let igAsk=false;
  const igDone=()=>{ try{ return !!(localStorage.getItem("ncs-ig-nudged")||localStorage.getItem("cs-ig-nudged")); }catch(e){ return true; } };
  function igNudge(){ try{ if(igAsk||!localStorage.getItem(WELC)||igDone()||window.__csPreview||window.__csTeacher===true||!feed()) return; }catch(e){ return; }
    igAsk=true;
    setTimeout(()=>{ igAsk=false; if(!window.csDialog||igDone()||window.__csTeacher===true||window.__csPreview) return; try{ localStorage.setItem("ncs-ig-nudged",JSON.stringify(Date.now())); localStorage.setItem("cs-ig-nudged","1"); }catch(e){} const d=window.csDialog(`<h3 style="margin-top:0">📸 ${L("Join our Instagram group","Únete a nuestro grupo de Instagram")}</h3><p>${L("Class reminders, memes and chats with the club between classes. It’s where the club hangs out during the week.","Recordatorios de clases, memes y conversación con el club entre clases. Ahí se junta el club durante la semana.")}</p><div class="note-actions"><a class="pill-btn pill-green" href="${IG_GROUP}" target="_blank" rel="noopener" data-a="go">${L("Join the group","Unirme al grupo")}</a><button class="swap" type="button" data-a="x">${L("Maybe later","Más tarde")}</button></div><p class="muted" style="font-size:13px;margin:10px 0 0">${L("It’s always at the top of the club page too.","También está siempre arriba en la página del club.")}</p>`); d.el.addEventListener("click",ev=>{ if(ev.target.closest("[data-a]")) setTimeout(d.close,50); }); },6000); }
  function dmTop(){ const aw=document.querySelector(".top-in .auth-wrap"); if(!aw) return; let m=document.getElementById("dmTopBtn"); if(!m){ m=document.createElement("button"); m.type="button"; m.id="dmTopBtn"; m.className="theme-btn cl-dmtop"; m.dataset.dminbox="1"; m.title=L("Messages","Mensajes"); m.setAttribute("aria-label",L("Messages","Mensajes")); m.innerHTML=`<span aria-hidden="true">💬</span><span class="cl-dmn" hidden></span>`; aw.parentNode.insertBefore(m,aw); } m.hidden=!feed(); try{ window.__clubSocial&&window.__clubSocial.dms&&window.__clubSocial.dms(); }catch(e){} }
  document.addEventListener("cs-club",()=>setTimeout(dmTop,50)); window.addEventListener("load",()=>setTimeout(dmTop,1500));
  function igTop(){ const v=document.getElementById("v-club"); if(!v) return; const put=()=>{ const h1=v.querySelector(":scope > h1, :scope > .cl-h1row > h1"); if(!h1) return false; let row=h1.parentElement.classList.contains("cl-h1row")?h1.parentElement:null; if(!row){ row=document.createElement("div"); row.className="cl-h1row"; h1.parentNode.insertBefore(row,h1); row.appendChild(h1); } let a=row.querySelector(".cl-igtop"); if(!a){ document.querySelectorAll("#v-club .cl-igtop").forEach(x=>x.remove()); a=document.createElement("a"); a.className="cl-igtop"; a.href=IG_GROUP; a.target="_blank"; a.rel="noopener"; row.appendChild(a); } a.innerHTML=`<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg><span class="cl-igl">${L("Instagram group","Grupo de Instagram")}</span>`; a.title=L("Join our Instagram group","Únete a nuestro grupo de Instagram"); a.hidden=!feed(); dmTop(); try{ window.__clubSocial&&window.__clubSocial.dms&&window.__clubSocial.dms(); }catch(e){} return true; }; if(!put()){ let n=0; const t=setInterval(()=>{ if(put()||++n>20) clearInterval(t); },250); } }
  function igHTML(compact){ return `<a class="cl-ig${compact?" compact":""}" href="${IG_GROUP}" target="_blank" rel="noopener"><span class="cl-ig-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></span><span><b>${L("Join our Instagram group","Únete a nuestro grupo de Instagram")}</b>${compact?"":`<small>${L("Reminders, memes and chats with the club between classes.","Recordatorios, memes y conversación con el club entre clases.")}</small>`}</span><span class="cl-ig-go">→</span></a>`; }
  /* good to know: how the classes work */
  function faqHTML(){ const Q=[
      ["📅",["Can I come to more than one class a week?","¿Puedo ir a más de una clase por semana?"],["Absolutely! All classes are open to everyone, so join as many as you like in the same week. You can also just listen quietly if you’re not up to talking that day. No pressure.","¡Claro! Todas las clases están abiertas para todos, así que ven a las que quieras en la misma semana. También puedes solo escuchar si ese día no tienes ganas de hablar. Sin presión."]],
      ["📚",["Do I need to prepare?","¿Tengo que preparar algo?"],["Usually no: all classes are drop-in. Sometimes there’s a little homework, and it’s always in the weekly post (the This week tab), so you’ll know in advance. It’s never anything too time-consuming.","Normalmente no: todas las clases son sin preparación. A veces hay una pequeña tarea, y siempre está en el post semanal (pestaña Esta semana), para que lo sepas antes. Nunca es algo que tome mucho tiempo."]]];
    const T=L(["💻 Use a computer if you can: it’s easier to see the materials and your classmates.","📷 Keep your camera on: it makes the conversation feel more natural.","🎧 Use headphones if possible: better audio for everyone.","🔇 Only mute yourself if there’s background noise. No need to be on mute the whole time."],["💻 Usa un computador si puedes: es más fácil ver los materiales y a tus compañeros.","📷 Deja tu cámara encendida: la conversación se siente más natural.","🎧 Usa audífonos si puedes: mejor audio para todos.","🔇 Silénciate solo si hay ruido de fondo. No hace falta estar en silencio todo el rato."]);
    return `<div class="cl-sec cl-faq"><h2>🙋 ${L("Good to know","Bueno saber")}</h2>${Q.map(q=>`<details><summary>${q[0]} ${esc(L(q[1][0],q[1][1]))}</summary><p>${esc(L(q[2][0],q[2][1]))}</p></details>`).join("")}<h3>🎧 ${L("A few tips","Algunos consejos")}</h3><ul>${T.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`; }
  function rulesHTML(f,inWelcome){ const r=((f.info||{}).rules||[]).length?f.info.rules:L(RULES_EN,RULES_ES);
    return `<div class="cl-sec cl-rules">${inWelcome?"":`<h2>🤝 ${L("Club guidelines","Normas del club")}</h2>`}<ol>${r.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`; }
  const WELC="cs-club-welcomed";
  function welcomeHTML(f){ try{ if(localStorage.getItem(WELC)) return ""; }catch(e){ return ""; } if((window.__csPreview&&!window.__csGuest)||window.__csViewAsMode) return "";
    const nm=(window.__csFire&&window.__csFire.name&&window.__csFire.name()||"").split(" ")[0];
    return `<div class="cl-welc"><button type="button" class="cl-welc-x" data-welcx="1" aria-label="${L("Close","Cerrar")}">✕</button><h2>👋 ${L("Welcome to the club","Bienvenido al club")}${nm?", "+esc(nm):""}!</h2><p>${L("A few small things to get started:","Unas cositas para empezar:")}</p>
      <ol class="cl-steps"><li><b>${L("Say hi on the wall","Saluda en el muro")}</b><span>${L("Tell us your name, where you’re from and why you’re learning English.","Cuéntanos tu nombre, de dónde eres y por qué aprendes inglés.")}</span><button type="button" class="cl-join" style="--k:var(--c2)" data-intro="1">👋 ${L("Introduce yourself","Preséntate")}</button></li>
        <li><b>${L("Read the club guidelines","Lee las normas del club")}</b><details><summary>${L("Show them","Mostrar")}</summary>${rulesHTML(f,true)}</details></li>
        <li><b>${L("Join our Instagram group","Únete al grupo de Instagram")}</b><span>${L("Reminders and chats with the club between classes.","Recordatorios y conversación con el club entre clases.")}</span><a class="cl-join" style="--k:#E1306C" href="${IG_GROUP}" target="_blank" rel="noopener">📸 ${L("Join the group","Unirme al grupo")}</a></li>
        <li><b>${L("Come to a class","Ven a una clase")}</b><span>${L("Tap “🙋 I’m going” on a class below. All levels, camera optional.","Toca “🙋 Voy” en una clase de abajo. Todos los niveles, cámara opcional.")}</span></li></ol>
      <button type="button" class="cs-act" data-welcx="1">${L("Got it","Entendido")} ✓</button></div>`; }
  /* ---------- 🚀 coming soon (members vote; filled by the community script) ---------- */
  const SOON=[["dm","💬",["Direct messages","Mensajes directos"],["Chat privately with other members.","Chatea en privado con otros miembros."]],["digest","📧",["Weekly email digest","Resumen semanal por email"],["What you missed in the club, once a week.","Lo que te perdiste en el club, una vez por semana."]],["courses","🎓",["Club courses","Cursos del club"],["Short courses only for members, e.g. speaking confidence.","Cursos cortos solo para miembros, por ejemplo seguridad al hablar."]],["join","💳",["Join and pay on Hibi","Unirse y pagar en Hibi"],["Membership right here, no Skool needed.","La membresía aquí mismo, sin Skool."]]];
  function soonHTML(){ return `<div class="cl-sec cl-soon"><h2>🚀 ${L("Coming soon","Muy pronto")}</h2><p class="cl-note">${L("Vote for what you want first. Noa sees the votes.","Vota por lo que quieres primero. Noa ve los votos.")}</p><div class="cl-soonl">${SOON.map(s=>`<div class="cl-soonc"><span class="i" aria-hidden="true">${s[1]}</span><span class="t"><b>${esc(L(s[2][0],s[2][1]))}</b><span>${esc(L(s[3][0],s[3][1]))}</span></span><span class="cl-soonv" data-soon="${s[0]}"></span></div>`).join("")}</div></div>`; }
  async function homeWall(){ const b=document.querySelector("#homeClub [data-hcwall]"); if(!b||!window.__clubSocial) return; const n=await window.__clubSocial.unread(); b.hidden=!n; b.textContent=`💬 ${n} new on the community wall →`;
    try{ const pid=window.__clubSocial.unreadPid&&window.__clubSocial.unreadPid(); if(pid) b.dataset.bgo=pid; else delete b.dataset.bgo; }catch(e){} }
  document.addEventListener("click",e=>{ if(e.target.closest("[data-hcwall]")){ tab="wall"; location.hash="#club"; setTimeout(render,0); } });
  function render(){
    { const lede=document.querySelector("#v-club .lede"); if(lede) lede.hidden=!feed(); }
    nav(); const f=feed();
    if(!f){ locked(); return; }
    const ps=posts(f), now=Date.now(), info=f.info||{};
    const nRec=recList(f).length, isNoa=window.__csFire&&window.__csFire.uid&&window.__csFire.uid()==="J8D2tjQmBaaA2QN730tSfSrjfm73"&&!window.__csPreview;
    const tabs=[["week",L("This week","Esta semana")],["wall",L("Community","Comunidad")+' <span class="cl-unread" data-unread hidden></span>'],["recordings",`🎬 ${L("Library","Biblioteca")}${nRec?" ("+nRec+")":""}`],["calendar",`📅 ${L("Calendar","Calendario")}`],["members",L("Members","Miembros")]].concat(isNoa?[["insights","📈 Insights"]]:[]);
    let body="";
    if(tab==="wall"||tab==="say"){ tab="wall"; body='<div class="cl-say" data-say="1"></div><div class="cl-wallbar" data-wallbar hidden><span data-wallbar-n></span><button type="button" class="cl-wallread" data-wallread="1">✓ '+L("Mark all as read","Marcar todo como leído")+'</button></div><div class="cl-wall" data-wall="1"></div>'; }
    else if(tab==="members"){ body='<div class="cl-members" data-members="1"></div>'; }
    else if(tab==="insights"){ body='<div class="cl-insights" data-insights="1"></div>'; }
    else if(tab==="recordings"||tab==="past"){ tab="recordings"; body=podHTML(f)+recTab(f)+pastHTML(f,ps,now); }
    else if(tab==="calendar"||tab==="links"){ tab="calendar"; body=`<div class="cl-keyinfo"><span>✅ ${L("All classes are optional and open to every level","Todas las clases son opcionales y para todos los niveles")}</span><span>🔗 ${L("The Zoom links stay the same every week","Los links de Zoom son los mismos cada semana")}</span><span>🙋 ${L("Come to as many as you like","Ven a todas las que quieras")}</span></div>`+calTab(f,now)+`<div class="cl-infogrid">${faqHTML()}${rulesHTML(f,false)}</div>`+linksHTML(f); }
    else if(tab==="week"){ body=ps[0]?welcomeHTML(f)+'<div class="cl-bdays" hidden></div>'+nextHTML(f,ps[0],now)+catchHTML(f,ps[0],now)+podNewHTML()+postHTML(f,ps[0],now,true,true)+`<p class="cl-towall">💬 ${L("Questions or something to share?","¿Preguntas o algo que compartir?")} <button type="button" class="cs-act" data-clt="wall">${L("Post it in Community","Publícalo en Comunidad")} →</button></p>`:`<p class="cl-empty">${L("This week’s post isn’t up yet. It usually arrives on Monday.","El post de esta semana aún no está. Normalmente llega el lunes.")}</p>`; if(ps[0]&&!window.__csPreview&&document.getElementById("v-club")&&!document.getElementById("v-club").hidden){ markSeen(ps[0].id); setTimeout(nav,0); } }
    igTop(); igNudge();
    box.innerHTML=`<div class="cl-tabs" role="group" aria-label="${L("Club sections","Secciones del club")}">${tabs.map(([k,l])=>`<button type="button" class="cl-tab" data-clt="${k}" aria-pressed="${tab===k}">${l}</button>`).join("")}</div>`+body;
    if(window.__clubSocial){ window.__clubSocial.mount(box); if(tab!=="wall") window.__clubSocial.refreshBadge(); }
    if(window.__csSyncUrl) window.__csSyncUrl("club");
  }
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-recgo]"); if(!g) return; const id=g.dataset.recgo, away=location.hash!=="#club";
    const apply=()=>{ RFOCUS=id; tab="recordings"; render(); setTimeout(()=>{ const c=document.querySelector(`.cl-rcard[open]`); if(c){ c.scrollIntoView({block:"center",behavior:"smooth"}); c.classList.add("cs-flash"); } },120); };
    if(away){ const n=document.querySelector('.navbtn[data-go="club"]'); if(n) n.click(); else location.hash="#club"; setTimeout(apply,300); } else setTimeout(apply,0); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&CALPOP){ CALPOP=false; render(); } });
  document.addEventListener("cs-club-bdays",()=>{ const v=document.getElementById("v-club"); if(tab==="calendar"&&v&&!v.hidden&&!CALPOP) render(); });
  box.addEventListener("input",e=>{ const q=e.target.closest("[data-recq]"); if(!q) return; const v=q.value.trim().toLowerCase(); let n=0; box.querySelectorAll(".cl-rcard").forEach(c=>{ const hit=!v||v.split(/\s+/).every(w=>c.dataset.q.includes(w)); c.hidden=!hit; if(hit) n++; }); const no=box.querySelector("[data-rnone]"); if(no) no.hidden=!!n; });
  box.addEventListener("click",e=>{ const t=e.target.closest("[data-clt]"); if(t){ tab=t.dataset.clt; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(er){} render(); return; }
    const cm=e.target.closest("[data-calm]"); if(cm){ CALM+=+cm.dataset.calm; CALD=null; CALPOP=false; render(); return; }
    const cd=e.target.closest("[data-cald]"); if(cd){ CALD=cd.dataset.cald; CALPOP=true; render(); return; }
    if(e.target.closest("[data-calx]")){ CALPOP=false; render(); return; }
    if(CALPOP&&e.target.closest(".cl-cal")&&!e.target.closest(".cl-cpop")){ CALPOP=false; render(); return; }
    const wt=e.target.closest("[data-wtoggle]"); if(wt){ const id=wt.dataset.wtoggle, on=!watched().includes(id); setWatched(id,on); RFOCUS=id; render(); return; }
    const yt=e.target.closest("[data-yt]"); if(yt){ const id=yt.dataset.yt; if(!watched().includes(yt.dataset.watched)) setWatched(yt.dataset.watched,true); yt.outerHTML=`<div class="cl-ytf"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1" title="Class recording" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`; return; }
    const wa=e.target.closest("[data-watched]"); if(wa){ if(!watched().includes(wa.dataset.watched)){ setWatched(wa.dataset.watched,true); const id=wa.dataset.watched; setTimeout(()=>{ RFOCUS=id; render(); },300); } return; }
    if(e.target.closest("[data-welcx]")){ try{ localStorage.setItem(WELC,"1"); }catch(er){} render(); return; }
    if(e.target.closest("[data-intro]")){ try{ localStorage.setItem(WELC,"1"); }catch(er){} window.__clubIntro=true; tab="wall"; render(); return; }
    const wAll=e.target.closest("[data-clwall]"); if(wAll){ let arr=[]; try{ arr=JSON.parse(wAll.dataset.clwall); }catch(er){} let n=0; arr.forEach(x=>{ try{ if(typeof window.csAddWord==="function"&&window.csAddWord(x.w,x.tr||"",x.ex||"")) n++; }catch(er){} }); wAll.closest(".cl-podn,.cl-recap,details")?.querySelectorAll("[data-clw]").forEach(b=>{ b.disabled=true; b.textContent=L("✓ Saved","✓ Guardada"); }); wAll.disabled=true; wAll.textContent=n?L(`✓ ${n} added`,`✓ ${n} agregadas`):L("✓ Already in your words","✓ Ya están en tus palabras"); return; }
    const pp=e.target.closest(".cl-pplay"); if(pp){ const au=pp.querySelector("audio"); if(e.target.closest("[data-pplay]")){ if(au.paused){ au.play().catch(()=>podFallback(pp)); } else au.pause(); return; } const sk=e.target.closest("[data-pskip]"); if(sk){ au.currentTime=Math.max(0,(au.currentTime||0)+ +sk.dataset.pskip); return; } const sp=e.target.closest("[data-pspeed]"); if(sp){ const R2=[1,1.25,1.5,0.75], nx=R2[(R2.indexOf(au.playbackRate||1)+1)%R2.length]; au.playbackRate=nx; sp.textContent=nx+"×"; return; } }
    const w=e.target.closest("[data-clw]"); if(w){ let x={}; try{ x=JSON.parse(w.dataset.clw); }catch(er){} let ok=false; try{ ok=typeof window.csAddWord==="function"&&window.csAddWord(x.w,x.tr||"",x.ex||""); }catch(er){} w.disabled=true; w.textContent=ok?L("✓ Saved","✓ Guardada"):L("✓ In your words","✓ Ya está en tus palabras"); } });
  document.addEventListener("cs-level",()=>{ const v=document.getElementById("v-club"); if(v&&!v.hidden) render(); });
  /* data updates never wipe something half-typed: they wait until the text is sent or cleared */
  let pend=false; const typing=()=>[...box.querySelectorAll("textarea,input[type=text]")].some(x=>x.value.trim());
  const soft=()=>{ if(typing()||(box.querySelector(".cl-pplay.on"))){ pend=true; nav(); return; } pend=false; render(); };
  document.addEventListener("cs-club",soft); box.addEventListener("focusout",()=>setTimeout(()=>{ if(pend&&!typing()) soft(); },200)); document.addEventListener("submit",()=>setTimeout(()=>{ if(pend&&!typing()) soft(); },1500)); document.addEventListener("cs-hubview",nav); window.addEventListener("cs-auth",()=>{ pubTried=false; setTimeout(soft,0); });
  /* a podcast that's playing is never interrupted by coming back to the Club page */
  const podOn=()=>!!box.querySelector(".cl-pplay.on");
  window.addEventListener("hashchange",()=>{ if(location.hash==="#club"&&!podOn()){ tab="week"; setTimeout(render,0); } });
  document.addEventListener("click",e=>{ if(e.target.closest('[data-go="club"]')&&!podOn()) setTimeout(render,0); });
  /* remember where each person stopped in each episode (this device), and pick up from there */
  const PPK="cs-podpos", ppGet=()=>{ try{ return JSON.parse(localStorage.getItem(PPK)||"{}")||{}; }catch(e){ return {}; } }, ppSet=o=>{ try{ localStorage.setItem(PPK,JSON.stringify(o)); }catch(e){} };
  const ppId=au=>{ const pp=au.closest(".cl-pplay"); return (pp&&pp.dataset.drive)||String(au.getAttribute("src")||"").slice(-80); };
  let ppLast=0;
  document.addEventListener("timeupdate",e=>{ const au=e.target; if(!au||au.tagName!=="AUDIO"||!au.closest(".cl-pplay")||!au.duration) return; if(Date.now()-ppLast<4000) return; ppLast=Date.now(); const o=ppGet(), id=ppId(au), t=au.currentTime||0;
    if(t>5&&t<au.duration-15) o[id]=Math.round(t); else delete o[id]; const ks=Object.keys(o); if(ks.length>20) delete o[ks[0]]; ppSet(o); },true);
  document.addEventListener("pause",e=>{ const au=e.target; if(!au||au.tagName!=="AUDIO"||!au.closest(".cl-pplay")||!au.duration) return; const o=ppGet(), t=au.currentTime||0; if(t>5&&t<au.duration-15) o[ppId(au)]=Math.round(t); ppSet(o); },true);
  document.addEventListener("ended",e=>{ const au=e.target; if(!au||au.tagName!=="AUDIO"||!au.closest(".cl-pplay")) return; const o=ppGet(); delete o[ppId(au)]; ppSet(o); },true);
  document.addEventListener("loadedmetadata",e=>{ const au=e.target; if(!au||au.tagName!=="AUDIO"||!au.closest(".cl-pplay")||au.dataset.resumed) return; au.dataset.resumed="1"; const t=+ppGet()[ppId(au)]||0; if(t>5&&au.duration&&t<au.duration-15) au.currentTime=t; },true);
  /* keep "Live now" fresh, but never while someone is typing a comment */
  setInterval(()=>{ if(feed()&&!document.hidden){ const v=document.getElementById("v-club"), typing=[...box.querySelectorAll("textarea")].some(x=>x.value.trim())||box.contains(document.activeElement)&&document.activeElement.tagName==="TEXTAREA"; if(v&&!v.hidden&&tab==="week"&&!typing&&!podOn()) render(); else home(); } },60000);
  window.__clubTab=k=>{ tab=k; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(er){} render(); };
  document.addEventListener("cs-club-plans",()=>{ const v=document.getElementById("v-club"); if(v&&!v.hidden&&(tab==="recordings"||tab==="week")&&!box.querySelector(".cl-ytf,.cl-plan,iframe,audio,textarea:focus,input:focus")) render(); });
  const fmtPT=t=>!isFinite(t)?"–:––":Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0");
  function podFallback(pp){ if(!pp||!pp.isConnected||pp.dataset.fb) return; pp.dataset.fb="1"; pp.outerHTML=`<iframe class="cl-poddr" src="https://drive.google.com/file/d/${pp.dataset.drive}/preview" title="Podcast episode" loading="lazy" allow="autoplay"></iframe>`; }
  ["play","pause","timeupdate","loadedmetadata","error","ended"].forEach(ev=>document.addEventListener(ev,e=>{ const au=e.target; if(!au||au.tagName!=="AUDIO") return; const pp=au.closest(".cl-pplay"); if(!pp) return;
    if(ev==="error"){ if(au.dataset.alt&&!au.dataset.tried){ au.dataset.tried="1"; au.src=au.dataset.alt; au.load(); return; } podFallback(pp); return; } const b=pp.querySelector("[data-pplay]"); b.textContent=au.paused?"▶":"❚❚"; b.setAttribute("aria-label",au.paused?L("Play","Reproducir"):L("Pause","Pausa")); pp.classList.toggle("on",!au.paused);
    pp.querySelector('[data-pt="cur"]').textContent=fmtPT(au.currentTime||0); pp.querySelector('[data-pt="dur"]').textContent=fmtPT(au.duration); if(au.duration&&!pp._drag) pp.querySelector(".cl-pbar").value=Math.round((au.currentTime/au.duration)*1000); },true));
  document.addEventListener("input",e=>{ const v=e.target.closest(".cl-pplay .cl-pvol"); if(!v) return; const pp=v.closest(".cl-pplay"), au=pp.querySelector("audio"); au.volume=v.value/100; au.muted=false; pp.querySelector("[data-pmute]").textContent=v.value==0?"🔇":v.value<50?"🔉":"🔊"; });
  document.addEventListener("click",e=>{ const m=e.target.closest(".cl-pplay [data-pmute]"); if(!m) return; e.preventDefault(); const pp=m.closest(".cl-pplay"), au=pp.querySelector("audio"); au.muted=!au.muted; m.textContent=au.muted?"🔇":"🔊"; });
  document.addEventListener("input",e=>{ const r=e.target.closest(".cl-pplay .cl-pbar"); if(!r) return; const au=r.closest(".cl-pplay").querySelector("audio"); if(au.duration) au.currentTime=r.value/1000*au.duration; });
  document.addEventListener("cs-club-pods",()=>{ const v=document.getElementById("v-club"); if(v&&!v.hidden&&(tab==="recordings"||tab==="week")&&!box.querySelector(".cl-ytf,iframe,.cl-pplay.on,textarea:focus,input:focus")) render(); });
  document.addEventListener("cs-club-recs",()=>{ const v=document.getElementById("v-club"); if(v&&!v.hidden&&(tab==="recordings"||tab==="week")&&!box.querySelector(".cl-ytf,.cl-pplay.on,textarea:focus,input:focus")) render(); else home(); });
  window.__clubFeed=feed;
  render();
})();
