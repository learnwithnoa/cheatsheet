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
  function applyPop(){ const p=pop(); root.style.setProperty("--pop",p[2]); root.style.setProperty("--pop-ink",p[3]); }
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
  new MutationObserver(paintBtn).observe(root,{attributes:true,attributeFilter:["data-theme"]}); paintBtn();
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
    const c=typeof window.__csClubNext==="function"?window.__csClubNext():null; if(c&&c.post&&c.post.title&&vis("navClub")) L.push({t:"CLUB",x:"This week: "+c.post.title,go:"club"});
    if(vis("awBox")) L.push({t:"WORLD",x:"Around the world today",scroll:"awBox"});
    L.push({t:"BUDDY",x:"Say hi to your study buddy",go:"park"});
    return L.slice(0,5);
  }
  function note(){
    const v=window.__csHubView;
    try{ const n=window.__csCoachNews&&window.__csCoachNews.list(); if(n&&n[0]) return {k:"NOTE FROM NOA ✉",x:String(n[0].t||"").replace(/<[^>]+>/g,""),go:"coaching"}; }catch(e){}
    if(v&&v.recap&&v.recap.summary) return {k:"LATEST CLASS RECAP ✉",x:String(v.recap.summary).split(/(?<=[.!?])\s/)[0],go:"coaching"};
    const tt=document.getElementById("ttText"); if(tt&&tt.textContent.trim()) return {k:"THOUGHT FOR TODAY ✶",x:tt.textContent.trim(),scroll:"todayBox"};
    return null;
  }
  let lastHTML="";
  function paint(){
    const view=document.getElementById("v-notes"); if(!view) return;
    let box=document.getElementById("rdHome"); if(!box){ box=document.createElement("div"); box.id="rdHome"; const h=view.querySelector("h1"); view.insertBefore(box,h?h.nextSibling:view.firstChild);
      const arr=document.getElementById("hmArrange"); if(arr){ const w=document.createElement("div"); w.className="rd-arr"; box.after(w); w.appendChild(arr); } }
    const now=new Date(), nm=firstName(), N=nextClass(), lines=logLines(), nt=note();
    const role=window.__csHubView?"PRIVATE 1:1":vis("navClub")?"CLUB":"STUDENT";
    const st=[["coaching","My coaching",vis("navCoaching")],["club","Club",vis("navClub")],["words","My notebook",1],["quiz","Practice",1],["sheet","Cheat sheet",1],["park","Buddy park",1]].filter(x=>x[2]);
    let ticket="";
    if(N.first){ const f=N.first, today=f.d.toDateString()===now.toDateString(), live=Date.now()>=f.d.getTime()-10*60000;
      ticket=`<section class="rdh-ticket" aria-label="Next class"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>001 / ${live?"● LIVE NOW":"NEXT CLASS"}${today&&!live?" · TODAY":""}</span><span>${esc(f.k)}</span></span><span class="rdh-when">${DOW[f.d.getDay()]} ${hm(f.d)}</span><span class="rdh-k"><span>${esc(f.what)}</span></span></div>${f.zoom?`<a class="rdh-join" href="${esc(f.zoom)}" target="_blank" rel="noopener">${BARS}<span>JOIN→</span></a>`:`<button type="button" class="rdh-join" data-rdgo="${f.go}" style="all:unset;cursor:pointer;width:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px">${BARS}<span style="font:700 13px var(--mono);border:1px solid currentColor;padding:7px 10px">OPEN→</span></button>`}</section>`; }
    else if(N.book){ ticket=`<section class="rdh-ticket" aria-label="Book a class"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>001 / NEXT CLASS</span><span>W/ NOA</span></span><span class="rdh-when small">BOOK YOUR NEXT CLASS</span><span class="rdh-k"><span>WHENEVER IT SUITS YOU</span></span></div><a class="rdh-join" href="${esc(N.book)}" target="_blank" rel="noopener">${BARS}<span>BOOK→</span></a></section>`; }
    const html=`${DEFS}${STAR}
      <div class="rdh-top"><p class="rdh-blurb">Hibi — not just an app, but a daily habit. English you actually use: words you saved, classes you took, mistakes you made on purpose.</p></div>
      <div><div class="rdh-meta"><b>${role}</b><span>--EN--</span><span>--ES--</span><span>${dd(now)}</span></div>
      <div class="rdh-title">HIBI<small>日々</small></div>${nm?`<div class="rdh-name" aria-label="${esc(nm)}">${[...nm.toUpperCase()].slice(0,10).map(c=>`<span aria-hidden="true">${esc(c)}</span>`).join("")}</div>`:""}</div>
      <div class="rdh-row">${ticket}<div class="rdh-side"><form class="rdh-tr" data-rdtr="1" role="search"><span class="p" aria-hidden="true">&gt;</span><label class="sr" for="rdTrIn">Translator</label><input type="text" id="rdTrIn" placeholder="translate a word or phrase_" autocomplete="off"><button type="submit">EN⇄ES</button></form>
      ${nt?`<a href="#" class="rdh-note" data-rd${nt.go?"go":"scroll"}="${nt.go||nt.scroll}"><span class="rdh-tape" aria-hidden="true"></span><b>${esc(nt.k)}</b><span>${esc(nt.x.length>120?nt.x.slice(0,118)+"…":nt.x)}</span></a>`:""}</div></div>
      <div class="rdh-stw"><div class="rdh-lab"><span>Stamps ··· where to?</span><span>002—00${st.length+1}</span></div>
      <div class="rdh-stamps">${st.map((x,i)=>`<button type="button" class="rdh-st${x[0]==="sheet"?" dark":""}" data-rd${x[0]==="sheet"?"sheet":"go"}="${x[0]}"><svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${ICO[x[0]]}</svg><span><i>${String(i+2).padStart(3,"0")}</i><b>${x[1]}</b></span></button>`).join("")}</div></div>
      <div class="rdh-bot"><div class="rdh-logw"><div class="rdh-lab"><span>Today.log</span><span>${dd(now)} ▮</span></div><div class="rdh-log">${lines.map(l=>`<button type="button" data-rd${l.go?"go":"scroll"}="${l.go||l.scroll}"><span class="t">${esc(l.t)}</span><span class="x">${esc(l.x)}</span>${l.isNew?'<span class="new">NEW</span>':'<span class="ar" aria-hidden="true">→</span>'}</button>`).join("")}</div></div>
      <button type="button" class="rdh-stuck" data-rdgo="stuck"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M50 2 58 20 78 8 74 28 98 30 80 44 96 62 72 60 66 78 50 64 34 78 28 60 4 62 20 44 2 30 26 28 22 8 42 20z" fill="#D9442B" stroke="#1A1A1A" stroke-width=".8"/></svg><span><i>HELP</i>I'M<br>STUCK!</span></button></div>`;
    if(html===lastHTML) return; const keep=document.activeElement&&document.activeElement.id==="rdTrIn"; if(keep) return; lastHTML=html; box.innerHTML=html;
  }
  document.addEventListener("click",e=>{
    const t=e.target.closest&&e.target.closest("#rdHome [data-rdgo],#rdHome [data-rdscroll],#rdHome [data-rdsheet]"); if(!t) return; e.preventDefault();
    if(t.dataset.rdgo){ go(t.dataset.rdgo); return; }
    if(t.dataset.rdscroll){ const el=document.getElementById(t.dataset.rdscroll); if(el){ el.scrollIntoView({behavior:"smooth",block:"start"}); } return; }
    if(t.dataset.rdsheet){ const g=document.querySelector(".side .ng-start"); if(g){ g.scrollIntoView({behavior:"smooth",block:"start"}); const b=g.querySelector(".navbtn"); if(b) setTimeout(()=>b.focus({preventScroll:true}),400); } }
  });
  document.addEventListener("submit",e=>{
    const f=e.target.closest&&e.target.closest("[data-rdtr]"); if(!f) return; e.preventDefault();
    const q=(document.getElementById("rdTrIn")||{}).value||""; go("translate");
    setTimeout(()=>{ const i=document.getElementById("trIn"), b=document.getElementById("trBtn"); if(i){ i.value=q; i.dispatchEvent(new Event("input",{bubbles:true})); if(q.trim()&&b) b.click(); i.focus(); } },120);
  });
  const tick=()=>{ try{ paint(); }catch(e){ if(window.console) console.warn("rdHome",e); } };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",tick); else tick();
  window.addEventListener("cs-auth",()=>setTimeout(tick,300)); setInterval(tick,8000); setTimeout(tick,1500); setTimeout(tick,4000);
  window.__csRdPaint=tick;
})();
