/* ---------- small dialog used by install + kudos ---------- */
function csDialog(html,opts){
  opts=opts||{};
  const bd=document.createElement("div"); bd.className="cs-dlg-bd";
  const d=document.createElement("div"); d.className="cs-dlg card"+(opts.cls?" "+opts.cls:""); d.setAttribute("role","dialog"); d.setAttribute("aria-modal","true");
  d.innerHTML='<button class="qa-x cs-dlg-x" type="button" aria-label="Close">×</button>'+html;
  const back=document.activeElement;
  const close=()=>{ bd.remove(); d.remove(); if(opts.onClose) opts.onClose(); if(back&&back.focus) try{ back.focus(); }catch(e){} };
  bd.addEventListener("click",close); d.querySelector(".cs-dlg-x").addEventListener("click",close);
  d.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); close(); } });
  document.body.append(bd,d);
  setTimeout(()=>{ const f=d.querySelector("[data-autofocus]")||d.querySelector("button:not(.cs-dlg-x)")||d.querySelector(".cs-dlg-x"); if(f) f.focus(); },30);
  return {el:d,close};
}
window.csDialog=csDialog; /* buddy.js (duels) uses it too */

/* ---------- install as an app ---------- */
(function(){
  let deferred=null;
  const standalone=()=>window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
  window.addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); deferred=e; });
  window.addEventListener("appinstalled",()=>{ deferred=null; toast("🎉 Installed! Find the Cheat Sheet on your home screen."); });
  function how(){
    const ua=navigator.userAgent||"", ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1), android=/Android/i.test(ua), safariMac=/Macintosh/.test(ua)&&/Safari/.test(ua)&&!/Chrome|Edg|Firefox/.test(ua);
    if(ios) return "<ol><li>Tap the <b>Share</b> button <span aria-hidden=\"true\">⬆︎</span> (at the bottom in Safari, or at the top in Chrome).</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. That's it!</li></ol>";
    if(android) return "<ol><li>Tap your browser's menu <b>⋮</b> (top right).</li><li>Tap <b>Install app</b> or <b>Add to Home screen</b>.</li><li>Tap <b>Install</b>.</li></ol>";
    if(safariMac) return "<ol><li>In the menu bar, click <b>File</b>.</li><li>Click <b>Add to Dock…</b></li></ol>";
    return "<ol><li>Look for the install icon <b>⊕</b> at the right end of the address bar and click it.</li><li>Or open the browser menu <b>⋮</b> and choose <b>Install Cheat Sheet</b> (in Edge: <b>Apps → Install this site as an app</b>).</li></ol>";
  }
  window.csInstall=async function(){
    if(standalone()){ csDialog('<h3 style="margin-top:0">📲 You\'re already in the app 🎉</h3><p>You opened the Cheat Sheet from your home screen. Nothing else to do!</p>'); return; }
    if(deferred){ try{ deferred.prompt(); const r=await deferred.userChoice; deferred=null; if(r&&r.outcome==="accepted") return; }catch(e){} }
    csDialog('<h3 style="margin-top:0">📲 Get the Cheat Sheet app</h3><p>Add the Cheat Sheet to your home screen. It opens like an app, full screen, with your words and notes right there.</p>'+how()+'<p class="muted" style="font-size:13.5px;margin-bottom:0">It\'s free and takes no space. Your words and notes stay synced with your account.</p>');
  };
  document.addEventListener("click",e=>{ if(e.target.closest("[data-install]")){ e.preventDefault(); window.csInstall(); } });
  // Settings panel: add an "Install the app" button
  function inject(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csInstallSec")) return;
    const secs=p.querySelectorAll(".cs-sec"), last=secs[secs.length-1]; if(!last) return;
    const sec=document.createElement("div"); sec.className="cs-sec"; sec.id="csInstallSec";
    sec.innerHTML='<h4>App</h4><button class="cs-reset" type="button" data-install style="text-align:left">📲 Install the Cheat Sheet as an app</button><small style="color:var(--muted);font-size:12.5px">Opens from your home screen like a normal app.</small>';
    p.insertBefore(sec,last);
  }
  new MutationObserver(inject).observe(document.body,{childList:true,subtree:true}); inject();
})();

/* ---------- words to review today ---------- */
function todays5(){
  const day=new Date().toDateString();
  const saved=LS.get("cs-today5",null), all=allWords().filter(x=>x&&x.w&&!x.sample), ids=new Set(all.map(x=>x.id));
  if(saved&&saved.day===day&&saved.ids.every(i=>ids.has(i))&&saved.ids.length===Math.min(5,all.length)) return saved.ids;
  const st=LS.get("ncs-fc",{})||{};
  let seed=0; for(const ch of day) seed=(seed*31+ch.charCodeAt(0))>>>0;
  const rnd=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
  const score=x=>{ const b=st[x.id]; const base= b===0?0 : b===1?1 : b===2?2 : b==null?3 : b===3?4 : 5; return base+rnd()*0.9; };
  const pick=all.slice().sort((a,b)=>score(a)-score(b)).slice(0,5).map(x=>x.id);
  LS.set("cs-today5",{day,ids:pick});
  return pick;
}
(function(){
  const box=document.getElementById("rvBox"); if(!box) return;
  function paint(){
    const all=allWords().filter(x=>x&&x.w&&!x.sample);
    if(all.length<3){ box.hidden=true; return; }
    box.hidden=false;
    const ids=todays5(), st=LS.get("ncs-fc",{})||{}, list=ids.map(i=>all.find(x=>x.id===i)).filter(Boolean);
    document.getElementById("rvList").innerHTML=list.map(x=>'<button class="rv-chip" type="button" aria-expanded="false" data-rv="'+esc(x.id)+'"><span class="rv-w">'+esc(x.w)+'</span><span class="rv-m">'+esc(x.m||"(no translation yet)")+'</span>'+(st[x.id]===0?'<span class="rv-tag">missed</span>':'')+'</button>').join("");
  }
  box.addEventListener("click",e=>{
    const c=e.target.closest("[data-rv]"); if(c){ c.setAttribute("aria-expanded",c.getAttribute("aria-expanded")==="true"?"false":"true"); return; }
    if(e.target.closest("#rvGo")){ if(typeof fcSetMode==="function") fcSetMode("today"); go("quiz"); }
  });
  paint();
  window.addEventListener("storage",paint);
  const v=document.getElementById("v-notes"); if(v) new MutationObserver(()=>{ if(!v.hidden) paint(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
})();

/* ---------- say it out loud (speech recognition) ---------- */
(function(){
  const card=document.getElementById("spCard"); if(!card) return;
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const tgt=document.getElementById("spTarget"), mean=document.getElementById("spMean"), mic=document.getElementById("spMic"), out=document.getElementById("spOut"), modeB=document.getElementById("spMode"), nextB=document.getElementById("spNext"), hear=document.getElementById("spHear");
  if(!SR){ document.getElementById("spNo").hidden=false; mic.disabled=true; }
  let cur=null, lastId=null, useEx=false, rec=null, listening=false;
  const norm2=s=>String(s||"").toLowerCase().replace(/\(.*?\)/g," ").replace(/[’']/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim();
  function pool(){ let l=[]; try{ l=typeof fcList==="function"?fcList():allWords(); }catch(e){ l=allWords(); } l=l.filter(x=>x&&x.w); return l.length?l:allWords().filter(x=>x&&x.w); }
  function text(){ return useEx&&cur&&cur.e? cur.e : (cur? cur.w.replace(/\(.*?\)/g,"").trim() : ""); }
  function pick(){
    const l=pool(); if(!l.length){ cur=null; tgt.textContent="Save a few words first"; mean.textContent=""; mic.disabled=true; return; }
    let x=l[Math.floor(Math.random()*l.length)]; if(l.length>1&&x.id===lastId) x=l.find(y=>y.id!==lastId);
    cur=x; lastId=x.id; paint(); out.hidden=true; out.innerHTML="";
  }
  function paint(){
    if(!cur) return;
    tgt.textContent=text(); mean.textContent=useEx&&cur.e? "" : (cur.m||"");
    modeB.hidden=!cur.e; modeB.textContent=useEx?"Say the word instead":"Say the example sentence";
    mic.disabled=!SR;
  }
  function judge(alts){
    const t=norm2(text()), tw=t.split(" ").filter(Boolean);
    let best="", bestScore=0;
    alts.forEach(a=>{ const n=norm2(a); if(!n) return; let sc;
      if(n===t||(" "+n+" ").includes(" "+t+" ")) sc=1;
      else { const nw=n.split(" "); const hit=tw.filter(w=>nw.includes(w)).length; sc=hit/Math.max(tw.length,1); }
      if(sc>bestScore||!best){ bestScore=sc; best=a; } });
    return {heard:best,score:bestScore};
  }
  function show(r){
    out.hidden=false;
    const ok=r.score>=(useEx?0.8:1), close=!ok&&r.score>=0.5;
    out.innerHTML='<div class="sn-res '+(ok?"sn-great":close?"sn-almost":"sn-try")+'"><b>'+(ok?"🎉 Great, I understood you!":close?"👍 Almost!":"🤔 Not quite")+'</b></div>'+
      '<p style="margin:6px 0 0">I heard: <i>“'+esc(r.heard||"…")+'”</i></p>'+
      (ok?"":'<p class="muted" style="margin:4px 0 0;font-size:14px">Tap <b>🔊 Listen</b> to hear it, then try again. Speak a little slower and clearer than normal.</p>');
    if(ok) document.dispatchEvent(new CustomEvent("cs-said"));
  }
  function stop(){ listening=false; mic.classList.remove("on"); mic.innerHTML='🎤 <span>Tap and say it</span>'; }
  mic.addEventListener("click",()=>{
    if(!SR||!cur) return;
    if(listening){ try{ rec.stop(); }catch(e){} return; }
    rec=new SR(); rec.lang="en-US"; rec.interimResults=false; rec.maxAlternatives=5; rec.continuous=false;
    let got=false;
    rec.onresult=e=>{ got=true; const res=e.results[0]; const alts=[]; for(let i=0;i<res.length;i++) alts.push(res[i].transcript); show(judge(alts)); };
    rec.onerror=e=>{ stop(); out.hidden=false;
      out.innerHTML='<p style="margin:0">'+(e.error==="not-allowed"||e.error==="service-not-allowed"?"🎤 Your browser blocked the microphone. Allow it (the 🔒 or 🎤 icon in the address bar) and try again.":e.error==="no-speech"?"I didn't hear anything. Tap the mic and speak a bit louder.":e.error==="network"?"Speech recognition needs an internet connection. Try again in a moment.":"Something went wrong with the microphone. Try again.")+'</p>'; };
    rec.onend=()=>{ stop(); if(!got&&out.hidden){ out.hidden=false; out.innerHTML='<p style="margin:0">I didn\'t hear anything. Tap the mic and try again.</p>'; } };
    try{ rec.start(); listening=true; mic.classList.add("on"); mic.innerHTML='⏺ <span>Listening… tap to stop</span>'; out.hidden=true; }catch(e){ stop(); }
  });
  hear.addEventListener("click",()=>{ if(cur) say(text(),hear); });
  modeB.addEventListener("click",()=>{ useEx=!useEx; paint(); out.hidden=true; });
  nextB.addEventListener("click",()=>{ useEx=false; pick(); });
  if(!canSpeak) hear.hidden=true;
  const v=document.getElementById("v-quiz");
  new MutationObserver(()=>{ if(!v.hidden&&!cur) pick(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
  document.addEventListener("click",e=>{ if(e.target.closest("[data-fcset]")) setTimeout(()=>{ useEx=false; pick(); },60); });
  pick();
})();

/* ---------- kudos: messages from Noa ---------- */
(function(){
  const fmt=t=>{ try{ return new Date(t).toLocaleDateString("en-US",{month:"long",day:"numeric"}); }catch(e){ return ""; } };
  function confetti(el){
    if(document.documentElement.classList.contains("cs-calm")) return;
    const em=["🎉","✨","💛","🎊","⭐"];
    for(let i=0;i<14;i++){ const s=document.createElement("span"); s.className="kd-conf"; s.textContent=em[i%em.length]; s.style.left=(6+Math.random()*88)+"%"; s.style.animationDelay=(Math.random()*.5)+"s"; s.style.setProperty("--r",(Math.random()*80-40)+"deg"); el.appendChild(s); setTimeout(()=>s.remove(),2600); }
  }
  function paintLink(){ const n=(LS.get("ncs-kudos",[])||[]).length, a=document.getElementById("kdLink"); if(a){ a.hidden=!n; a.textContent="💌 Messages from Noa ("+n+")"; } }
  window.csShowKudos=function(list,done){
    list=(list||[]).filter(m=>m&&m.text);
    if(!list.length) return;
    const hist=LS.get("ncs-kudos",[])||[];
    list.forEach(m=>{ if(!hist.some(h=>h.id===m.id)) hist.unshift({id:m.id,text:m.text,kind:m.kind||"",go:m.go||"",at:m.at||Date.now()}); });
    LS.set("ncs-kudos",hist.slice(0,60)); paintLink();
    let i=0;
    const next=()=>{
      if(i>=list.length) return;
      const m=list[i++];
      const title=m.kind==="welcome"?"👋 Welcome from Noa":m.kind==="kudos"?"🎉 Kudos from Noa":m.kind==="rec"?"⭐ Noa recommends":"💌 A message from Noa";
      const dl=csDialog('<div class="kd-top">'+title+'</div><p class="kd-text">'+esc(m.text).replace(/\n/g,"<br>")+'</p><div class="kd-date">'+fmt(m.at)+'</div><div class="note-actions" style="justify-content:flex-end;margin-top:14px">'+(m.go?'<button class="pill-btn pill-green" type="button" data-autofocus id="kdGo">Open it →</button><button class="swap" type="button" id="kdOk">Later</button>':'<button class="pill-btn pill-green" type="button" data-autofocus id="kdOk">Thanks, Noa! 💛</button>')+'</div>',{cls:"kd",onClose:()=>{ if(done) done(m.id); document.dispatchEvent(new CustomEvent("cs-kudos",{detail:{kind:m.kind}})); setTimeout(next,400); }});
      confetti(dl.el);
      dl.el.querySelector("#kdOk").addEventListener("click",dl.close);
      const g=dl.el.querySelector("#kdGo"); if(g) g.addEventListener("click",()=>{ dl.close(); if(window.csGo) window.csGo(m.go); });
    };
    setTimeout(next,1200);
  };
  document.addEventListener("click",e=>{
    if(!e.target.closest("#kdLink")) return;
    const hist=LS.get("ncs-kudos",[])||[];
    csDialog('<h3 style="margin-top:0">💌 Messages from Noa</h3>'+(hist.length?hist.map(m=>'<div class="kd-item"><div class="kd-date">'+fmt(m.at)+'</div><div>'+esc(m.text).replace(/\n/g,"<br>")+'</div></div>').join(""):'<p>No messages yet.</p>'));
  });
  paintLink();
})();
