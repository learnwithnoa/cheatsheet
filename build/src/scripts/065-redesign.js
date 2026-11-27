/* Nov 26 2026: the Tech Grunge redesign — Noa only for now.
   cs-rd = "1" on this device → html.rd (set early in 002-theme-early). Only Noa sees the 🧪 button in the top bar to switch.
   Inside the redesign: themes Light / Night / Unicorn (cs-rd-theme, this device) and a pop color (ncs-pop, synced to the account).
   Styles: build/parts/redesign.css. Home gets the "combo" block (#rdHome) on top of the usual Home cards. */
(function(){
  const root=document.documentElement, RD=root.classList.contains("rd");
  const POPS=[["yellow","Yellow","#F2D21B","#1A1A1A"],["fuchsia","Fuchsia","#FF3EA5","#1A1A1A"],["lime","Lime","#C6FF00","#1A1A1A"],["blue","Blue","#7D96FF","#1A1A1A"],["orange","Orange","#FF7A2F","#1A1A1A"],["mint","Mint","#5CE0B0","#1A1A1A"]];
  const RDT=[["light","☀","Light"],["night","☾","Night"],["unicorn","🦄","Unicorn"]];
  const get=(k,d)=>{ try{ const v=localStorage.getItem(k); if(v==null) return d; try{ const j=JSON.parse(v); return typeof j==="string"?j:v; }catch(e){ return v; } }catch(e){ return d; } };
  const set=(k,v)=>{ try{ localStorage.setItem(k,v); }catch(e){} };
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const noa=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  const pop=()=>{ const id=get("ncs-pop","yellow"); return POPS.find(p=>p[0]===id)||POPS[0]; };
  function applyPop(){ const p=pop(); root.style.setProperty("--pop",p[2]); root.style.setProperty("--pop-ink",p[3]);
    /* two extra colors that always go with the pop color (the lime tape, the fuchsia marker, the blue pixels) */
    root.style.setProperty("--hl1",p[0]==="lime"?"#F2D21B":"#C6FF00"); root.style.setProperty("--hl2",p[0]==="fuchsia"?"#7D96FF":"#FF3EA5"); root.style.setProperty("--hl3",p[0]==="blue"?"#5CE0B0":"#4F73FF"); }
  const rdt=()=>{ const t=get("cs-rd-theme","light"); return RDT.some(x=>x[0]===t)?t:"light"; };
  function setRdt(t){ set("cs-rd-theme",t); root.setAttribute("data-rdt",t); if(typeof window.csSetTheme==="function") window.csSetTheme(t==="night"?"dark":"light"); paintBtn(); }
  function paintBtn(){ if(!RD) return; const t=RDT.find(x=>x[0]===rdt()); const i=document.getElementById("themeIcon"), x=document.getElementById("themeTxt"); if(i) i.textContent=t[1]; if(x) x.textContent=t[2]; }

  /* ---- the menu: redesign on/off (Noa), theme, pop color ---- */
  let menu=null;
  function closeMenu(){ if(menu){ menu.remove(); menu=null; } }
  function openMenu(anchor){
    closeMenu(); menu=document.createElement("div"); menu.className="rd-menu"; menu.setAttribute("role","dialog"); menu.setAttribute("aria-label","Hibi's look");
    const cur=pop()[0], th=rdt();
    menu.innerHTML=(noa()?`<h4>🧪 Redesign (only you see this)</h4><button type="button" class="rdm-big" data-rdsw="1">${RD?"← Back to the live Hibi":"Try the new Hibi →"}</button>`:"")
      +(RD?`<h4>Theme</h4><div class="rdm-row" role="radiogroup" aria-label="Theme">${RDT.map(t=>`<button type="button" role="radio" data-rdt="${t[0]}" aria-checked="${t[0]===th}">${t[1]} ${t[2]}</button>`).join("")}</div>
      <h4>Pop color</h4><div class="rdm-row" role="radiogroup" aria-label="Pop color">${POPS.map(p=>`<button type="button" class="sw" role="radio" data-pop="${p[0]}" aria-checked="${p[0]===cur}" aria-label="${p[1]}" title="${p[1]}" style="background:${p[2]}"></button>`).join("")}</div>
      <p>Your pop color is saved to your account.</p>`:`<p>Members don't see this button. Switching only changes this device.</p>`);
    document.body.appendChild(menu);
    const r=anchor.getBoundingClientRect(); menu.style.top=(r.bottom+6)+"px"; menu.style.left=Math.max(8,Math.min(window.innerWidth-268,r.right-260))+"px";
    const f=menu.querySelector('[aria-checked="true"]')||menu.querySelector("button"); if(f) f.focus();
  }
  document.addEventListener("click",e=>{
    const b=e.target.closest&&e.target.closest("[data-rdsw],[data-rdt],[data-pop]");
    if(b&&menu&&menu.contains(b)){
      if(b.dataset.rdsw){ if(RD){ set("cs-rd",""); try{ localStorage.removeItem("cs-rd"); }catch(er){} const prev=get("cs-rd-prev",""); if(prev&&typeof window.csSetTheme==="function") window.csSetTheme(prev); }
        else { set("cs-rd-prev",get("ncs-theme","dark")); set("cs-rd","1"); if(typeof window.csSetTheme==="function") window.csSetTheme(rdt()==="night"?"dark":"light"); }
        location.reload(); return; }
      if(b.dataset.rdt){ setRdt(b.dataset.rdt); menu.querySelectorAll("[data-rdt]").forEach(x=>x.setAttribute("aria-checked",String(x===b))); return; }
      if(b.dataset.pop){ set("ncs-pop",JSON.stringify(b.dataset.pop)); applyPop(); menu.querySelectorAll("[data-pop]").forEach(x=>x.setAttribute("aria-checked",String(x===b))); return; }
    }
    if(menu&&!menu.contains(e.target)&&!e.target.closest("#rdBtn")) closeMenu();
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&menu){ closeMenu(); } });
  window.addEventListener("resize",closeMenu);

  /* the 🧪 button: Noa only */
  const btn=document.getElementById("rdBtn");
  function showBtn(){ if(btn) btn.hidden=!noa(); }
  if(btn){ btn.addEventListener("click",e=>{ e.stopPropagation(); if(menu){ closeMenu(); return; } openMenu(btn); }); }
  showBtn(); window.addEventListener("cs-auth",()=>setTimeout(showBtn,50)); setTimeout(showBtn,1500); setTimeout(showBtn,4000);

  if(!RD) return;
  applyPop(); root.setAttribute("data-rdt",rdt());
  /* keep Hibi's own theme in step with the redesign theme (night = dark, light/unicorn = light) */
  const want=()=>rdt()==="night"?"dark":"light";
  const sync=()=>{ if(root.getAttribute("data-theme")!==want()&&typeof window.csSetTheme==="function") window.csSetTheme(want()); };
  setTimeout(sync,0); setTimeout(sync,1500);
  /* the normal theme button opens the redesign's look menu instead of the old 5 themes */
  const tb=document.getElementById("themeBtn");
  if(tb){ tb.addEventListener("click",e=>{ e.stopImmediatePropagation(); e.preventDefault(); if(menu){ closeMenu(); return; } openMenu(tb); },true); }
  let fixes=0; new MutationObserver(()=>{ paintBtn(); /* while the redesign is on, its own theme wins (the synced Hibi theme can arrive later and bring back the old navy) */ if(RD&&root.getAttribute("data-theme")!==want()&&fixes<20){ fixes++; setTimeout(sync,0); } }).observe(root,{attributes:true,attributeFilter:["data-theme"]}); paintBtn();
  window.addEventListener("storage",e=>{ if(e.key==="ncs-pop") applyPop(); });
  setInterval(applyPop,5000); /* picks up the synced pop color after sign-in */

  /* ---- Home: the combo ---- */
  const go=id=>{ const b=document.querySelector(`.side [data-go="${id}"]`)||document.querySelector(`[data-go="${id}"]`); if(b) b.click(); };
  const vis=id=>{ const e=document.getElementById(id); return !!e&&!e.hidden; };
  const DOW=["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const dd=d=>DOW[d.getDay()]+" "+String(d.getDate()).padStart(2,"0")+"."+String(d.getMonth()+1).padStart(2,"0");
  const hm=d=>String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
  function firstName(){
    const v=window.__csHubView; if(v&&v.name) return String(v.name).trim().split(/\s+/)[0];
    const w=document.getElementById("authWho"); const t=w&&w.textContent.trim(); if(t){ const m=t.replace(/^(signed in as|hi,?)\s*/i,"").split(/[\s·,@\n]+/)[0]; if(m&&m.length<20) return m; }
    return "";
  }
  function nextClass(){
    const out=[]; const v=window.__csHubView;
    if(v&&v.next&&!v.past){ const d=new Date(v.next); if(!isNaN(d)&&d.getTime()>Date.now()-60*60000) out.push({d,k:"PRIVATE 1:1 W/ NOA",what:"YOUR CLASS W/ NOA",zoom:v.nextZoom||"",go:"coaching"}); }
    const c=typeof window.__csClubNext==="function"?window.__csClubNext():null;
    if(c&&c.next){ const d=new Date(c.next.start); out.push({d,k:"CLUB · "+(c.next.name||"CLASS"),what:(c.next.title||c.next.name||"Club class"),zoom:c.next.zoom||"",go:"club"}); }
    out.sort((a,b)=>a.d-b.d); return {first:out[0]||null,book:v&&v.book&&!v.next?v.book:""};
  }
  const ICO={
    coaching:'<path d="M2 9l10-5 10 5-10 5z" fill="url(#rdpB)" stroke="currentColor" stroke-width=".6"/><path d="M6 12v5c3 2 9 2 12 0v-5l-6 3z" fill="url(#rdpK)"/>',
    club:'<path d="M2 4h16v10H8l-4 4v-4H2z" fill="url(#rdpG)" stroke="currentColor" stroke-width=".6"/><path d="M12 10h10v8h-2v3l-3-3h-5z" fill="url(#rdpK)"/>',
    words:'<path d="M5 2h13v20H5z" fill="url(#rdpY)" stroke="currentColor" stroke-width=".6"/><path d="M8 6h7v2H8zM8 10h7v2H8z" fill="currentColor"/>',
    quiz:'<circle cx="12" cy="12" r="10" fill="url(#rdpR)" stroke="currentColor" stroke-width=".6"/><circle cx="12" cy="12" r="5" fill="url(#rdpK)"/>',
    sheet:'<path d="M4 2h11l5 5v15H4z" fill="currentColor"/><path d="M7 9h10v2H7zM7 13h10v2H7z" fill="var(--pop)"/>',
    park:'<path d="M10 2h4v2h2v2h2v6h-5v10h-2V12H6V6h2V4h2z" fill="url(#rdpG)" stroke="currentColor" stroke-width=".6"/>'
  };
  const DEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="rdpK" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="currentColor"/><rect x="1" y="1" width="1" height="1" fill="currentColor"/></pattern><pattern id="rdpY" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#F2D21B"/><rect width="1" height="1" fill="#1A1A1A"/></pattern><pattern id="rdpB" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#8FB3E8"/><rect width="1" height="1" fill="#2F5FD0"/></pattern><pattern id="rdpG" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#9ED9A8"/><rect width="1" height="1" fill="#3FA65A"/></pattern><pattern id="rdpR" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#F0A493"/><rect width="1" height="1" fill="#D9442B"/></pattern></defs></svg>';
  const STAR='<svg class="rdh-star" viewBox="0 0 100 100" shape-rendering="crispEdges" aria-hidden="true"><defs><pattern id="rdpS" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="currentColor"/><rect x="1" y="1" width="1" height="1" fill="currentColor"/><rect x="1" width="1" height="1" fill="#888"/></pattern></defs><path d="M50 4 56 38 88 14 64 44 98 52 62 58 84 92 52 66 44 98 40 62 8 84 34 54 2 40 38 40 20 10z" fill="url(#rdpS)" stroke="var(--pop)" stroke-width="2.5"/></svg>';
  const BARS='<svg aria-hidden="true" width="54" height="42" viewBox="0 0 28 22" shape-rendering="crispEdges"><path d="M0 0h1v22H0zM2 0h2v22H2zM5 0h1v22H5zM7 0h3v22H7zM11 0h1v22h-1zM13 0h1v22h-1zM15 0h3v22h-3zM19 0h1v22h-1zM21 0h2v22h-2zM24 0h1v22h-1zM26 0h2v22h-2z" fill="currentColor"/></svg>';
  function logLines(){
    const L=[];
    try{ const n=window.__csCoachNews&&window.__csCoachNews.list(); (n||[]).slice(0,2).forEach(x=>L.push({t:x.d?dd(new Date(x.d+"T12:00:00")):"COACHING",x:String(x.t||"").replace(/<[^>]+>/g,""),go:"coaching",isNew:true})); }catch(e){}
    const tw=document.getElementById("twWord"); if(tw&&tw.textContent.trim()) L.push({t:"WORD",x:"Word of the day: "+tw.textContent.trim(),scroll:"todayBox"});
    const rv=document.getElementById("rvList"); if(vis("rvBox")&&rv&&rv.children.length) L.push({t:"NOTEBOOK",x:rv.children.length+" "+(rv.children.length===1?"word":"words")+" to review",scroll:"rvBox"});
    const c=typeof window.__csClubNext==="function"?window.__csClubNext():null; if(c&&c.post&&c.post.title&&vis("navClub")) L.push({t:"CLUB",x:"This week: "+c.post.title,go:"club:week"});
    if(vis("awBox")) L.push({t:"WORLD",x:"Around the world today",scroll:"awBox"});
    L.push({t:"BUDDY",x:"Say hi to your study buddy",go:"buddy"});
    return L.slice(0,5);
  }
  function note(){
    const tt=document.getElementById("ttText"); if(tt&&tt.textContent.trim()){ const lv=document.getElementById("ttLove"), lt=document.getElementById("ttLoveTxt");
      return {k:"THOUGHT FOR TODAY ✶",x:tt.textContent.trim(),love:lv?{on:lv.getAttribute("aria-pressed")==="true",txt:(lt&&lt.textContent.trim())||"I like this"}:null}; }
    const v=window.__csHubView;
    try{ const n=window.__csCoachNews&&window.__csCoachNews.list(); if(n&&n[0]) return {k:"NOTE FROM NOA ✉",x:String(n[0].t||"").replace(/<[^>]+>/g,""),go:"coaching"}; }catch(e){}
    if(v&&v.recap&&v.recap.summary) return {k:"LATEST CLASS RECAP ✉",x:String(v.recap.summary).split(/(?<=[.!?])\s/)[0],go:"coaching"};
    return null;
  }
  const ART_DAY='<svg class="rdh-art rdh-blob" viewBox="0 0 100 100" shape-rendering="crispEdges" aria-hidden="true"><defs><pattern id="rdpS" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#1A1A1A"/><rect x="1" y="1" width="1" height="1" fill="#1A1A1A"/><rect x="1" width="1" height="1" fill="#888"/></pattern></defs><path d="M50 4 56 38 88 14 64 44 98 52 62 58 84 92 52 66 44 98 40 62 8 84 34 54 2 40 38 40 20 10z" fill="url(#rdpS)" stroke="var(--pop)" stroke-width="2.5"/></svg>';
  const ART_NIGHT='<svg class="rdh-art rdh-blob" viewBox="0 0 100 100" shape-rendering="crispEdges" aria-hidden="true"><defs><pattern id="rdpN" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#ECECE4"/><rect x="1" y="1" width="1" height="1" fill="#6E6E6E"/></pattern></defs><path d="M50 4 56 38 88 14 64 44 98 52 62 58 84 92 52 66 44 98 40 62 8 84 34 54 2 40 38 40 20 10z" fill="url(#rdpN)" stroke="var(--hl1)" stroke-width="2.5"/></svg>';
  let lastHTML="";
  function paint(){
    const view=document.getElementById("v-notes"); if(!view) return;
    let box=document.getElementById("rdHome"); if(!box){ box=document.createElement("div"); box.id="rdHome"; const h=view.querySelector("h1"); view.insertBefore(box,h?h.nextSibling:view.firstChild);
      const arr=document.getElementById("hmArrange"); if(arr){ const w=document.createElement("div"); w.className="rd-arr"; box.after(w); w.appendChild(arr); } }
    const now=new Date(), nm=firstName(), N=nextClass(), lines=logLines(), nt=note();
    const role=window.__csHubView?"PRIVATE 1:1":vis("navClub")?"CLUB":"STUDENT";
    const st=[["coaching","My coaching",vis("navCoaching")],["club","Club",vis("navClub")],["words","My notebook",1],["quiz","Practice",1],["sheet","Grammar notes",1],["park","Buddy park",1]].filter(x=>x[2]);
    let ticket="";
    if(N.first){ const f=N.first, today=f.d.toDateString()===now.toDateString(), live=Date.now()>=f.d.getTime()-10*60000;
      ticket=`<section class="rdh-ticket" aria-label="Next class"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>001 / ${live?"● LIVE NOW":"NEXT CLASS"}${today&&!live?" · TODAY":""}</span><span>${esc(f.k)}</span></span><span class="rdh-when">${DOW[f.d.getDay()]} ${hm(f.d)}</span><span class="rdh-k"><span>${esc(f.what)}</span></span></div>${f.zoom?`<a class="rdh-join" href="${esc(f.zoom)}" target="_blank" rel="noopener">${BARS}<span>JOIN→</span></a>`:`<button type="button" class="rdh-join" data-rdgo="${f.go}" style="all:unset;cursor:pointer;width:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px">${BARS}<span style="font:700 13px var(--mono);border:1px solid currentColor;padding:7px 10px">OPEN→</span></button>`}</section>`; }
    else if(N.book){ ticket=`<section class="rdh-ticket" aria-label="Book a class"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>001 / NEXT CLASS</span><span>W/ NOA</span></span><span class="rdh-when small">BOOK YOUR NEXT CLASS</span><span class="rdh-k"><span>WHENEVER IT SUITS YOU</span></span></div><a class="rdh-join" href="${esc(N.book)}" target="_blank" rel="noopener">${BARS}<span>BOOK→</span></a></section>`; }
    const dots=`<div class="rdh-dots" role="radiogroup" aria-label="Pop color"><span>POP COLOR</span>${POPS.map(p=>`<button type="button" class="rdh-dot" role="radio" data-rdpop="${p[0]}" aria-checked="${p[0]===pop()[0]}" aria-label="${p[1]}" title="${p[1]}" style="background:${p[2]}"></button>`).join("")}</div>`;
    const html=`${DEFS}${rdt()==="night"?ART_NIGHT:ART_DAY}
      <div class="rdh-top"><p class="rdh-blurb">Hibi — not just an app, but a daily habit. English you actually use: words you saved, classes you took, mistakes you made on purpose.</p></div>
      <div><div class="rdh-meta"><b>${role}</b><span>--EN--</span><span>--ES--</span><span>${dd(now)}</span></div>
      <div class="rdh-title"><span class="rdh-hl">HIBI</span><small>日々</small></div>${nm?`<div class="rdh-name" aria-label="${esc(nm)}">${[...nm.toUpperCase()].slice(0,10).map(c=>`<span aria-hidden="true">${esc(c)}</span>`).join("")}</div>`:""}</div>
      <div class="rdh-row"><div class="rdh-tkw">${ticket}${dots}</div><div class="rdh-side"><form class="rdh-tr" data-rdtr="1" role="search"><span class="p" aria-hidden="true">&gt;</span><label class="sr" for="rdTrIn">Translator</label><input type="text" id="rdTrIn" placeholder="translate a word or phrase_" autocomplete="off"><button type="submit">EN⇄ES</button></form>
      ${nt?`<div class="rdh-note"><span class="rdh-tape" aria-hidden="true"></span><b>${esc(nt.k)}</b><span>${esc(nt.x.length>160?nt.x.slice(0,158)+"…":nt.x)}</span>${nt.love?`<button type="button" class="rdh-love" data-rdlove="1" aria-pressed="${nt.love.on}"><span aria-hidden="true">💛</span> ${esc(nt.love.txt)}</button>`:nt.go?`<button type="button" class="rdh-love" data-rdgo="${nt.go}">OPEN →</button>`:""}</div>`:""}</div></div>
      <div class="rdh-stw"><div class="rdh-lab"><span>Stamps ··· where to?</span><span>002—00${st.length+1}</span></div>
      <div class="rdh-stamps">${st.map((x,i)=>`<button type="button" class="rdh-st${x[0]==="sheet"?" dark":""}" data-rd${x[0]==="sheet"?"sheet":"go"}="${x[0]}"${x[0]==="sheet"?' aria-haspopup="dialog"':""}><svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${ICO[x[0]]}</svg><span><i>${String(i+2).padStart(3,"0")}</i><b>${x[1]}</b></span></button>`).join("")}</div></div>
      <div class="rdh-bot"><div class="rdh-logw"><div class="rdh-lab"><span>Today.log</span><span>${dd(now)} ▮</span></div><div class="rdh-log">${lines.map(l=>`<button type="button" data-rd${l.go?"go":"scroll"}="${l.go||l.scroll}"><span class="t">${esc(l.t)}</span><span class="x">${esc(l.x)}</span>${l.isNew?'<span class="new">NEW</span>':'<span class="ar" aria-hidden="true">→</span>'}</button>`).join("")}</div></div>
      <button type="button" class="rdh-stuck" data-rdgo="stuck"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M50 2 58 20 78 8 74 28 98 30 80 44 96 62 72 60 66 78 50 64 34 78 28 60 4 62 20 44 2 30 26 28 22 8 42 20z" fill="#D9442B" stroke="#1A1A1A" stroke-width=".8"/></svg><span><i>HELP</i>I'M<br>STUCK!</span></button></div>`;
    if(!document.getElementById("rdMore")){ const m=document.createElement("div"); m.id="rdMore"; m.className="rdh-lab rd-more"; m.innerHTML="<span>More for today</span><span>Word · review · club · notes</span>"; const a=box.nextElementSibling&&box.nextElementSibling.classList.contains("rd-arr")?box.nextElementSibling:box; a.after(m); }
    if(html===lastHTML) return; const keep=document.activeElement&&document.activeElement.id==="rdTrIn"; if(keep) return; lastHTML=html; box.innerHTML=html;
  }
  /* the card you jump to lights up for a moment so you can see where you landed */
  /* pocket pet shell color (Settings in the buddy's home), synced like the pop color */
  const TAMA={pink:"#FF6FB5",lime:"#B8E62E",yellow:"#F2D21B",orange:"#FF8A3D",mint:"#5CE0B0",purple:"#A98BFF",black:"#2A2A2E",white:"#F2F0E8"};
  function applyTama(){ let k=""; try{ k=(localStorage.getItem("ncs-tama")||"").replace(/"/g,""); }catch(e){} if(TAMA[k]) root.style.setProperty("--tama",TAMA[k]); else root.style.removeProperty("--tama"); root.toggleAttribute("data-tama-dark",k==="black"); let c=""; try{ c=localStorage.getItem("ncs-tama-clear")||""; }catch(e){} root.toggleAttribute("data-tama-clear",/1/.test(c)); }
  applyTama(); setTimeout(applyTama,2500); window.addEventListener("storage",e=>{ if(e.key==="ncs-tama"||e.key==="ncs-tama-clear") applyTama(); });
  document.addEventListener("change",e=>{ const t=e.target; if(!t||!t.matches||!t.matches("[data-tamaclear]")) return; try{ localStorage.setItem("ncs-tama-clear",JSON.stringify(t.checked?"1":"")); }catch(er){} applyTama(); });
  document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-tamac]"); if(!b) return; try{ localStorage.setItem("ncs-tama",JSON.stringify(b.dataset.tamac)); }catch(er){} applyTama(); b.parentElement.querySelectorAll("[data-tamac]").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); });
  function glow(el){ el.classList.remove("rd-glow"); void el.offsetWidth; el.classList.add("rd-glow"); setTimeout(()=>el.classList.remove("rd-glow"),2200); }
  document.addEventListener("click",e=>{
    const t=e.target.closest&&e.target.closest("#rdHome [data-rdgo],#rdHome [data-rdscroll],#rdHome [data-rdsheet],#rdHome [data-rdlove],#rdHome [data-rdpop]"); if(!t) return; e.preventDefault();
    if(t.dataset.rdlove){ const lv=document.getElementById("ttLove"); if(lv){ lv.click(); setTimeout(tick,60); } return; }
    if(t.dataset.rdpop){ set("ncs-pop",JSON.stringify(t.dataset.rdpop)); applyPop(); lastHTML=""; tick(); return; }
    if(t.dataset.rdgo==="buddy"){ if(window.csBuddy&&window.csBuddy.open) window.csBuddy.open(); else go("park"); return; }
    if(t.dataset.rdgo==="club:week"){ go("club"); setTimeout(()=>{ if(window.__clubTab) window.__clubTab("week"); setTimeout(()=>{ const v=document.getElementById("v-club"); const el=v&&([...v.querySelectorAll(".cl-next,.cl-sec,h2")].find(x=>x.offsetParent)); if(el){ el.scrollIntoView({behavior:"smooth",block:"start"}); glow(el); } },200); },150); return; }
    if(t.dataset.rdgo){ go(t.dataset.rdgo); return; }
    if(t.dataset.rdscroll){ const el=document.getElementById(t.dataset.rdscroll); if(el){ el.scrollIntoView({behavior:"smooth",block:"start"}); glow(el); } return; }
    if(t.dataset.rdsheet){ openTopics(t); }
  });
  document.addEventListener("submit",e=>{
    const f=e.target.closest&&e.target.closest("[data-rdtr]"); if(!f) return; e.preventDefault();
    const q=(document.getElementById("rdTrIn")||{}).value||""; go("translate");
    setTimeout(()=>{ const i=document.getElementById("trIn"), b=document.getElementById("trBtn"); if(i){ i.value=q; i.dispatchEvent(new Event("input",{bubbles:true})); if(q.trim()&&b) b.click(); i.focus(); } },120);
  });
  /* "Grammar notes" stamp: a sheet with every topic from the side menu, grouped */
  function openTopics(from){
    let sh=document.getElementById("rdTopics"); if(sh) sh.remove();
    const groups=[...document.querySelectorAll(".side .navgroup")].filter(g=>!g.classList.contains("mine")&&g.querySelector("[data-go]"));
    sh=document.createElement("div"); sh.id="rdTopics"; sh.className="rd-topics"; sh.setAttribute("role","dialog"); sh.setAttribute("aria-modal","true"); sh.setAttribute("aria-label","Grammar notes and topics");
    sh.innerHTML=`<div class="rdt-in"><div class="rdt-head"><div><div class="rdh-k"><span>GRAMMAR NOTES · EVERY TOPIC</span></div><div class="rdt-title">Grammar <span class="rdh-hl">notes</span></div><p>Short explanations with examples. Pick a topic.</p></div><button type="button" class="rdt-x" aria-label="Close">✕</button></div>
      ${groups.map((g,gi)=>{ const h=g.querySelector("h4"); const name=h?h.textContent.replace(/\d+\s*[▸▾▼▶]?\s*$/,"").replace(/^[\/\s★⭐]+/,"").trim():"Topics";
        const bs=[...g.querySelectorAll("[data-go]")].filter(b=>!b.hidden);
        return `<section><div class="rdh-lab"><span>${String(gi+1).padStart(2,"0")} / ${esc(name)}</span><span>${bs.length}</span></div><div class="rdt-grid">${bs.map(b=>`${(()=>{ const t=b.textContent.replace(/\s+/g," ").trim(); const m=t.match(/^(.*?)\s*((?:A1|A2|B1|B2|C1|C2)(?:[–-](?:A1|A2|B1|B2|C1|C2))?)$/); return `<button type="button" data-rdtopic="${esc(b.dataset.go)}"><span>${esc(m?m[1]:t)}</span>${m?`<i>${esc(m[2])}</i>`:""}</button>`; })()}`).join("")}</div></section>`; }).join("")}</div>`;
    document.body.appendChild(sh); document.documentElement.classList.add("rd-lock");
    const close=()=>{ sh.remove(); document.documentElement.classList.remove("rd-lock"); if(from) from.focus(); };
    sh.addEventListener("click",e=>{ if(e.target===sh||e.target.closest(".rdt-x")) { close(); return; } const b=e.target.closest("[data-rdtopic]"); if(b){ close(); go(b.dataset.rdtopic); } });
    sh.addEventListener("keydown",e=>{ if(e.key==="Escape") close(); });
    const f=sh.querySelector(".rdt-x"); if(f) f.focus();
  }

  /* the floating study buddy lives in a little pocket-pet device (pet / feed / settings) */
  function tama(){
    const root=document.getElementById("buddy"), pet=document.getElementById("bdPet"); if(!root||!pet) return false;
    if(document.getElementById("rdTama")) return true;
    const w=document.createElement("div"); w.id="rdTama"; w.className="rd-tama";
    w.innerHTML='<div class="rdtm-scr"></div><div class="rdtm-btns"><button type="button" data-tm="pet" aria-label="Pet your buddy">PET</button><button type="button" data-tm="feed" aria-label="Feed your buddy">FEED</button><button type="button" data-tm="set" aria-label="Buddy settings">⚙</button></div>';
    pet.parentNode.insertBefore(w,pet); w.querySelector(".rdtm-scr").appendChild(pet);
    w.addEventListener("click",e=>{ const b=e.target.closest("[data-tm]"); if(!b||!window.csBuddy) return; e.stopPropagation();
      if(b.dataset.tm==="pet"){ if(window.csBuddy.pet) window.csBuddy.pet(); else pet.click(); }
      else if(b.dataset.tm==="feed"){ if(window.csBuddy.feed) window.csBuddy.feed(); }
      else if(window.csBuddy.open) window.csBuddy.open(); });
    return true;
  }
  (function waitTama(n){ if(tama()){ peek(); return; } if(n>60) return; setTimeout(()=>waitTama(n+1),500); })(0);
  /* Nov 27 2026 (Noa): on narrower windows the pocket pet hides behind the screen edge and only peeks out.
     Hover (or tap) slides it out; a click while it's out keeps it there until you click somewhere else. */
  function peek(){
    const root=document.getElementById("buddy"), w=document.getElementById("rdTama"); if(!root||!w) return;
    const narrow=()=>innerWidth<1500;
    const left=()=>root.classList.contains("at-ml")||root.classList.contains("at-bl");
    const upd=()=>{ root.style.setProperty("--tw",(w.offsetWidth||140)+"px"); const on=narrow()&&!document.documentElement.classList.contains("cs-simple"); const cl=root.classList, set=(c,v)=>{ if(cl.contains(c)!==v) cl.toggle(c,v); }; /* only touch the class when it really changes (the observer below would loop forever otherwise) */
      set("rd-peek",on); set("rd-peek-l",on&&left()); if(!on){ set("rd-out",false); set("rd-pin",false); } };
    upd(); addEventListener("resize",upd); new MutationObserver(upd).observe(root,{attributes:true,attributeFilter:["class"]});
    const out=v=>{ if(root.classList.contains("rd-out")!==v) root.classList.toggle("rd-out",v); };
    w.addEventListener("mouseenter",()=>{ if(root.classList.contains("rd-peek")) out(true); });
    root.addEventListener("mouseleave",()=>{ if(!root.classList.contains("rd-pin")) out(false); });
    w.addEventListener("click",e=>{ if(!root.classList.contains("rd-peek")) return;
      if(!root.classList.contains("rd-out")){ e.preventDefault(); e.stopPropagation(); out(true); root.classList.add("rd-pin"); return; }
      root.classList.add("rd-pin"); },true);
    document.addEventListener("pointerdown",e=>{ if(root.classList.contains("rd-pin")&&!root.contains(e.target)&&!e.target.closest(".bd-modal")){ root.classList.remove("rd-pin"); out(false); } });
  }

  /* a posterize filter: Buddy park scenes, rooms, toys and the buddy in its settings get flat print colors (+ a dot screen in CSS) */
  if(!document.getElementById("rdFx")){ const f=document.createElement("div"); f.id="rdFx"; f.setAttribute("aria-hidden","true"); f.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
    f.innerHTML='<svg width="0" height="0"><filter id="rdPoster" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="discrete" tableValues="0 .22 .45 .7 .9 1"/><feFuncG type="discrete" tableValues="0 .22 .45 .7 .9 1"/><feFuncB type="discrete" tableValues="0 .22 .45 .7 .9 1"/></feComponentTransfer></filter></svg>'; document.body.appendChild(f); }

  /* Settings → Look & feel: theme + pop color dots */
  function lookBox(){
    const P=document.getElementById("csPanel"); if(!P) return;
    const sec=[...P.querySelectorAll(".cs-sec")].find(s=>{ const h=s.querySelector(":scope > h4"); return h&&/look/i.test(h.textContent); })||P.querySelector(".cs-sec"); if(!sec) return;
    let b=document.getElementById("rdLook");
    const html=`<b>Theme</b><div class="rdl-row" role="radiogroup" aria-label="Theme">${RDT.map(t=>`<button type="button" role="radio" data-rdt="${t[0]}" aria-checked="${t[0]===rdt()}">${t[1]} ${t[2]}</button>`).join("")}</div><b>Pop color</b><small>Your highlight color. Saved to your account.</small><div class="rdl-row" role="radiogroup" aria-label="Pop color">${POPS.map(p=>`<button type="button" class="rdh-dot big" role="radio" data-pop="${p[0]}" aria-checked="${p[0]===pop()[0]}" aria-label="${p[1]}" title="${p[1]}" style="background:${p[2]}"></button>`).join("")}</div>`;
    if(!b){ b=document.createElement("div"); b.id="rdLook"; b.className="rd-look"; const h=sec.querySelector(":scope > h4"); (h||sec.firstChild)&&(h?h.after(b):sec.prepend(b));
      b.addEventListener("click",e=>{ const x=e.target.closest("[data-rdt],[data-pop]"); if(!x) return; if(x.dataset.rdt) setRdt(x.dataset.rdt); else { set("ncs-pop",JSON.stringify(x.dataset.pop)); applyPop(); } lastHTML=""; tick(); b.innerHTML=""; lookBox(); }); }
    if(b.innerHTML!==html) b.innerHTML=html;
    /* hide the old 5-theme picker inside Settings while the redesign is on */
    const old=[...P.querySelectorAll("button")].find(x=>!b.contains(x)&&/Sepia/.test(x.textContent));
    if(old){ const g=old.parentElement; if(g&&!g.classList.contains("rd-hide")){ g.classList.add("rd-hide"); const lab=g.previousElementSibling; if(lab&&lab.textContent.length<40&&!lab.contains(b)&&lab!==b) lab.classList.add("rd-hide"); } }
  }
  setInterval(lookBox,1500);

  const tick=()=>{ try{ paint(); }catch(e){ if(window.console) console.warn("rdHome",e); } };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",tick); else tick();
  window.addEventListener("cs-auth",()=>setTimeout(tick,300)); setInterval(tick,8000); setTimeout(tick,1500); setTimeout(tick,4000);
  window.__csRdPaint=tick;
})();
