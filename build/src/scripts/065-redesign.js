/* Nov 26 2026: the Tech Grunge redesign — Noa only for now.
   cs-rd = "1" on this device → html.rd (set early in 002-theme-early). Only Noa sees the 🧪 button in the top bar to switch.
   Inside the redesign: themes Light / Night / Unicorn (cs-rd-theme, this device) and a pop color (ncs-pop, synced to the account).
   Styles: build/parts/redesign.css. Home gets the "combo" block (#rdHome) on top of the usual Home cards. */
(function(){
  const root=document.documentElement, RD=root.classList.contains("rd");
  const CARDS=[["dzBox","duels","Duels"],["tStoic","stoic","Stoic"],["homeClub","club","Club"],["todayBox","word","Word"],["awBox","world","World"],["rvBox","review","Review"]];
  const CAT_OF={dzBox:"duels",tStoic:"stoic","club:week":"club",club:"club",homeClub:"club",todayBox:"word",awBox:"world",rvBox:"review",park:"buddy",buddy:"buddy"};
  const POPS=[["yellow","Yellow","#F2D21B","#1A1A1A"],["fuchsia","Fuchsia","#FF3EA5","#1A1A1A"],["lime","Lime","#C6FF00","#1A1A1A"],["blue","Blue","#7D96FF","#1A1A1A"],["orange","Orange","#FF7A2F","#1A1A1A"],["mint","Mint","#5CE0B0","#1A1A1A"]];
  const RDT=[["light","☀","Light"],["night","☾","Night"],["sepia","📖","Sepia"],["unicorn","🦄","Unicorn"]];
  const get=(k,d)=>{ try{ const v=localStorage.getItem(k); if(v==null) return d; try{ const j=JSON.parse(v); return typeof j==="string"?j:v; }catch(e){ return v; } }catch(e){ return d; } };
  const set=(k,v)=>{ try{ localStorage.setItem(k,v); }catch(e){} };
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const noa=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  const pop=()=>{ const id=get("ncs-pop","yellow"); return POPS.find(p=>p[0]===id)||POPS[0]; };

  /* Cursors in the redesign (Nov 27 2026): pixel-style, in your pop color; over anything clickable they flip to ink.
     Normal = the computer's own; Big / Paw / Star are redrawn here; Pencil is hidden in the redesign (code kept in comfort.css). */
  function rdCursors(popHex){
    if(!RD) return; const P=popHex||"#F2D21B", K="#1A1A1A";
    const u=(svg,x,y)=>`url("data:image/svg+xml,${encodeURIComponent(svg)}") ${x} ${y}`;
    const arrow=(f,st,w)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 24 24" shape-rendering="crispEdges"><path d="M2 1h2v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h-5v1h1v2h1v2h1v2h-2v1h-2v-2h-1v-2h-1v-2h-1v1h-1v1h-1v1h-2z" fill="${f}" stroke="${st}" stroke-width="1.6" paint-order="stroke"/></svg>`;
    const paw=(f,st)=>`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 17 17" shape-rendering="crispEdges"><g fill="${f}" stroke="${st}" stroke-width=".9" paint-order="stroke"><path d="M5 9h7v1h1v3h-1v1h-2v1h-3v-1h-2v-1h-1v-3h1z"/><rect x="1.5" y="5.5" width="2.5" height="3"/><rect x="5" y="2" width="2.5" height="3.5"/><rect x="9.5" y="2" width="2.5" height="3.5"/><rect x="13" y="5.5" width="2.5" height="3"/></g></svg>`;
    const star=(f,st)=>`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><path d="M17 2C18.6 13 21 15.4 32 17 21 18.6 18.6 21 17 32 15.4 21 13 18.6 2 17 13 15.4 15.4 13 17 2Z" fill="${f}" stroke="${st}" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
    const CL=':is(a,button,label,summary,select,[role=button],[data-go],[data-tok],.park-b,.bd-pet,.flashcard,.rdh-art)';
    const rule=(k,n,h,x,y)=>`html.rd.cs-cur-${k},html.rd.cs-cur-${k} *{cursor:${u(n,x,y)},auto!important}html.rd.cs-cur-${k} ${CL},html.rd.cs-cur-${k} ${CL} *{cursor:${u(h,x,y)},pointer!important}`;
    const css=rule("big",arrow(P,K,40),arrow(K,P,40),3,2)+rule("paw",paw(P,K),paw(K,P),8,8)+rule("star",star(P,K),star(K,P),17,17)
      +'html.rd.cs-cur-pencil,html.rd.cs-cur-pencil *{cursor:auto!important}html.rd.cs-cur-pencil '+CL+'{cursor:pointer!important}'
      +'html.rd [class*="cs-cur-"] :is(input[type=text],input[type=search],input:not([type]),textarea,[contenteditable=true]),html.rd[class*="cs-cur-"] :is(input[type=text],input[type=search],input:not([type]),textarea,[contenteditable=true]){cursor:text!important}'
      +'html.rd [data-cscur="pencil"]{display:none!important}';
    let st=document.getElementById("rdCur"); if(!st){ st=document.createElement("style"); st.id="rdCur"; document.head.appendChild(st); } if(st.textContent!==css) st.textContent=css;
  }
  function applyPop(){ const p=pop(); root.style.setProperty("--pop",p[2]); root.style.setProperty("--pop-ink",p[3]); try{ rdCursors(p[2]); }catch(e){}
    /* two extra colors that always go with the pop color (the lime tape, the fuchsia marker, the blue pixels) */
    root.style.setProperty("--hl1",p[0]==="lime"?"#F2D21B":"#C6FF00"); root.style.setProperty("--hl2",p[0]==="fuchsia"?"#7D96FF":"#FF3EA5"); root.style.setProperty("--hl3",p[0]==="blue"?"#5CE0B0":"#4F73FF"); }
  /* no theme picked yet: follow the device (dark mode on the phone/computer → Night), Nov 27 2026 */
  const sysT=()=>window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"night":"light";
  const rdt=()=>{ const t=get("cs-rd-theme",""); return RDT.some(x=>x[0]===t)?t:sysT(); };
  if(RD&&window.matchMedia) try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{ if(get("cs-rd-theme","")) return; root.setAttribute("data-rdt",rdt()); try{ paintBtn(); }catch(e){} }); }catch(e){}
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
    if(v&&v.recap&&v.recap.summary) return {k:"LATEST CLASS RECAP ✉",x:(String(v.recap.summary).match(/^[\s\S]*?[.!?](?=\s|$)/)||[String(v.recap.summary)])[0],go:"coaching"};
    return null;
  }
  /* The Home star (Nov 27 2026, Noa): click it to switch between 7 designs; the last one is remembered (ncs-rdstar).
     Ink = currentColor (dark in light themes, light at night), accent = the pop color. */
  const STARS=[
    ["starburst",'<polygon points="50,3 57,33 82,12 66,38 97,44 66,52 84,80 58,62 50,97 42,62 16,80 34,52 3,44 34,38 18,12 43,33" fill="url(#rdpX)" stroke="var(--pop)" stroke-width="3.2" stroke-linejoin="miter"/>'],
    ["sparkle",'<path d="M46 6C50 36 56 42 86 50 56 58 50 64 46 94 42 64 36 58 6 50 36 42 42 36 46 6Z" fill="url(#rdpX)" stroke="var(--pop)" stroke-width="3.2"/><path d="M84 6C85 15 87 17 95 18 87 19 85 21 84 30 83 21 81 19 73 18 81 17 83 15 84 6Z" fill="currentColor" stroke="var(--pop)" stroke-width="2"/>'],
    ["sun",'<circle cx="50" cy="50" r="23" fill="url(#rdpD)" stroke="var(--pop)" stroke-width="3.5"/><path d="M50 4v12M50 84v12M4 50h12M84 50h12M17 17l8 8M75 75l8 8M17 83l8-8M75 25l8-8" stroke="currentColor" stroke-width="5"/>'],
    ["planet",'<circle cx="50" cy="50" r="25" fill="url(#rdpL)" stroke="currentColor" stroke-width="2.5"/><ellipse cx="50" cy="52" rx="47" ry="11" fill="none" stroke="var(--pop)" stroke-width="4.5" transform="rotate(-18 50 52)"/><path d="M26 42a25 25 0 0 1 48 0" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="88" cy="14" r="2.6" fill="currentColor"/><circle cx="12" cy="86" r="1.8" fill="currentColor"/>'],
    ["seal",'<circle cx="50" cy="50" r="44" fill="var(--pop)" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="50" r="36" fill="none" stroke="var(--pop-ink,#1A1A1A)" stroke-width="1.3" stroke-dasharray="3 3"/><text x="50" y="62" text-anchor="middle" font-size="34" font-family="serif" font-weight="700" fill="var(--pop-ink,#1A1A1A)">日々</text><path id="rdSealArc" d="M15 50a35 35 0 0 1 70 0" fill="none"/><text font-size="7" font-family="monospace" font-weight="700" letter-spacing="2" fill="var(--pop-ink,#1A1A1A)"><textPath href="#rdSealArc" startOffset="50%" text-anchor="middle">DAY · BY · DAY</textPath></text>'],
    ["spiral",'<path d="M50 50a3.5 3.5 0 0 1 7 0a7 7 0 0 1-14 0a10.5 10.5 0 0 1 21 0a14 14 0 0 1-28 0a17.5 17.5 0 0 1 35 0a21 21 0 0 1-42 0a24.5 24.5 0 0 1 49 0a28 28 0 0 1-56 0a31.5 31.5 0 0 1 63 0" fill="none" stroke="currentColor" stroke-width="3.6"/><circle cx="50" cy="50" r="45" fill="none" stroke="var(--pop)" stroke-width="2.6" stroke-dasharray="2 4.5"/>'],
    ["flower",'<g fill="url(#rdpX)" stroke="var(--pop)" stroke-width="2.8"><ellipse cx="50" cy="20" rx="10" ry="17"/><ellipse cx="50" cy="80" rx="10" ry="17"/><ellipse cx="20" cy="50" rx="17" ry="10"/><ellipse cx="80" cy="50" rx="17" ry="10"/><ellipse cx="29" cy="29" rx="9" ry="15" transform="rotate(-45 29 29)"/><ellipse cx="71" cy="71" rx="9" ry="15" transform="rotate(-45 71 71)"/><ellipse cx="71" cy="29" rx="9" ry="15" transform="rotate(45 71 29)"/><ellipse cx="29" cy="71" rx="9" ry="15" transform="rotate(45 29 71)"/></g><circle cx="50" cy="50" r="12" fill="var(--pop)" stroke="currentColor" stroke-width="2.5"/><circle cx="45.5" cy="48" r="1.7" fill="currentColor"/><circle cx="54.5" cy="48" r="1.7" fill="currentColor"/><path d="M45 53q5 4 10 0" fill="none" stroke="currentColor" stroke-width="1.8"/>']];
  const STAR_DEFS='<defs><pattern id="rdpX" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="var(--bg)"/><rect width="1" height="1" fill="currentColor"/><rect x="1" y="1" width="1" height="1" fill="currentColor"/></pattern><pattern id="rdpD" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="var(--bg)"/><circle cx="2.5" cy="2.5" r="1.1" fill="currentColor"/></pattern><pattern id="rdpL" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="var(--bg)"/><rect width="1.8" height="5" fill="currentColor"/></pattern></defs>';
  const starIx=()=>{ let k=""; try{ k=(localStorage.getItem("ncs-rdstar")||"").replace(/"/g,""); }catch(e){} const i=STARS.findIndex(x=>x[0]===k); return i<0?0:i; };
  const starSVG=()=>`<svg class="rdh-art rdh-blob" viewBox="0 0 100 100" aria-hidden="true" data-rdstar="${STARS[starIx()][0]}">${STAR_DEFS}<g class="rdh-art-g">${STARS[starIx()][1]}</g></svg>`;
  document.addEventListener("click",e=>{ const a=e.target.closest&&e.target.closest("#rdHome .rdh-art"); if(!a) return;
    const n=(starIx()+1)%STARS.length; try{ localStorage.setItem("ncs-rdstar",JSON.stringify(STARS[n][0])); }catch(er){}
    const g=a.querySelector(".rdh-art-g"); if(g){ g.innerHTML=STARS[n][1]; g.classList.remove("rd-swap"); void g.getBoundingClientRect(); g.classList.add("rd-swap"); } a.dataset.rdstar=STARS[n][0]; });
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
    /* Nov 27 2026 (Noa): nobody gets an empty ticket. Past students: come back; Hibi only (no club, no classes): try the club; anyone else with nothing scheduled: words to review */
    const tk=(k1,k2,when,sub,btn,attrs)=>`<section class="rdh-ticket"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>${k1}</span><span>${k2}</span></span><span class="rdh-when small">${when}</span><span class="rdh-k"><span>${sub}</span></span></div><button type="button" class="rdh-join" ${attrs} style="all:unset;cursor:pointer;width:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px">${BARS}<span style="font:700 13px var(--mono);border:1px solid currentColor;padding:7px 10px">${btn}</span></button></section>`;
    const hv=window.__csHubView, rvN=((document.getElementById("rvList")||{}).children||[]).length;
    if(!N.first&&!N.book){
      if(hv&&hv.past) ticket=tk("001 / MISS YOUR CLASSES?","W/ NOA","WANT TO COME BACK?","WRITE TO NOA, ANY TIME","WRITE→",'data-joindm="back"');
      else if(!hv&&(document.getElementById("navClub")||{classList:{contains:()=>true}}).classList.contains("locked")&&window.__csClubKnown) ticket=tk("001 / NOA'S ENGLISH CLUB","FREE TRIAL","TRY THE CLUB FREE","2 WEEKS OF LIVE CLASSES","TRY→",'data-rdgo="club"');
      else if(rvN) ticket=tk("001 / TODAY","MY NOTEBOOK",rvN+" "+(rvN===1?"WORD":"WORDS")+" TO REVIEW","A FEW MINUTES IS ENOUGH","REVIEW→",'data-rdscroll="rvBox"');
    }
    else if(N.book&&!N.first){ ticket=`<section class="rdh-ticket" aria-label="Book a class"><span class="rdh-tape" aria-hidden="true"></span><div class="rdh-tk"><span class="rdh-k"><span>001 / NEXT CLASS</span><span>W/ NOA</span></span><span class="rdh-when small">BOOK YOUR NEXT CLASS</span><span class="rdh-k"><span>WHENEVER IT SUITS YOU</span></span></div><a class="rdh-join" href="${esc(N.book)}" target="_blank" rel="noopener">${BARS}<span>BOOK→</span></a></section>`; }
    const dots=`<div class="rdh-dots" role="radiogroup" aria-label="Pop color"><span>POP COLOR</span>${POPS.map(p=>`<button type="button" class="rdh-dot" role="radio" data-rdpop="${p[0]}" aria-checked="${p[0]===pop()[0]}" aria-label="${p[1]}" title="${p[1]}" style="background:${p[2]}"></button>`).join("")}</div>`;
    const html=`${DEFS}${starSVG()}
      <div class="rdh-top"><p class="rdh-blurb">Hibi — not just an app, but a daily habit. English you actually use: words you saved, classes you took, mistakes you made on purpose.</p></div>
      <div><div class="rdh-meta"><b>${role}</b><span>--EN--</span><span>--ES--</span><span>${dd(now)}</span></div>
      <div class="rdh-title"><span class="rdh-hl">HIBI</span><small>日々</small></div>${nm?`<div class="rdh-name" aria-label="${esc(nm)}">${[...nm.toUpperCase()].slice(0,10).map(c=>`<span aria-hidden="true">${esc(c)}</span>`).join("")}</div>`:""}</div>
      <div class="rdh-row"><div class="rdh-tkw">${ticket}${dots}</div><div class="rdh-side"><form class="rdh-tr" data-rdtr="1" role="search"><span class="p" aria-hidden="true">&gt;</span><label class="sr" for="rdTrIn">Translator</label><input type="text" id="rdTrIn" placeholder="translate a word or phrase_" autocomplete="off"><button type="submit">EN⇄ES</button></form>
      ${nt?`<div class="rdh-note"><span class="rdh-tape" aria-hidden="true"></span><b>${esc(nt.k)}</b><span>${esc(nt.x.length>160?nt.x.slice(0,158)+"…":nt.x)}</span>${nt.love?`<button type="button" class="rdh-love" data-rdlove="1" aria-pressed="${nt.love.on}"><span aria-hidden="true">💛</span> ${esc(nt.love.txt)}</button>`:nt.go?`<button type="button" class="rdh-love" data-rdgo="${nt.go}">OPEN →</button>`:""}</div>`:""}</div></div>
      <div class="rdh-stw"><div class="rdh-lab"><span>Stamps ··· where to?</span><span>002—00${st.length+1}</span></div>
      <div class="rdh-stamps">${st.map((x,i)=>`<button type="button" class="rdh-st${x[0]==="sheet"?" dark":""}" data-rd${x[0]==="sheet"?"sheet":"go"}="${x[0]}"${x[0]==="sheet"?' aria-haspopup="dialog"':""}><svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true">${ICO[x[0]]}</svg><span><i>${String(i+2).padStart(3,"0")}</i><b>${x[1]}${x[0]==="sheet"?'<em class="rdh-st-more" aria-hidden="true"> ▾</em>':""}</b></span></button>`).join("")}</div></div>
      <div class="rdh-bot"><div class="rdh-logw"><div class="rdh-lab"><span>Today.log</span><span>${dd(now)} ▮</span></div><div class="rdh-log">${lines.map(l=>`<button type="button" data-rd${l.go?"go":"scroll"}="${l.go||l.scroll}"><span class="t"><i class="rd-catsq" data-cat="${esc(CAT_OF[l.scroll||l.go]||"")}" aria-hidden="true"></i>${esc(l.t)}</span><span class="x">${esc(l.x)}</span>${l.isNew?'<span class="new">NEW</span>':'<span class="ar" aria-hidden="true">→</span>'}</button>`).join("")}</div></div>
      <button type="button" class="rdh-stuck" data-rdgo="stuck"><svg viewBox="0 0 100 80" aria-hidden="true"><path d="M50 2 58 20 78 8 74 28 98 30 80 44 96 62 72 60 66 78 50 64 34 78 28 60 4 62 20 44 2 30 26 28 22 8 42 20z" fill="#D9442B" stroke="#1A1A1A" stroke-width=".8"/></svg><span><i>HELP</i>I'M<br>STUCK!</span></button></div>`;
    if(!document.getElementById("rdMore")){ const m=document.createElement("div"); m.id="rdMore"; m.className="rdh-lab rd-more"; m.innerHTML="<span>More for today</span><span class=\"rd-more-l\"></span>"; const a=box.nextElementSibling&&box.nextElementSibling.classList.contains("rd-arr")?box.nextElementSibling:box; a.after(m); }
    moreCards();
    if(html===lastHTML) return; const keep=document.activeElement&&document.activeElement.id==="rdTrIn"; if(keep) return; lastHTML=html; box.innerHTML=html; { const st=box.querySelector(".rdh-art"), r=window.__rdStarRot?window.__rdStarRot():0; if(st&&Math.abs(r)>.05) st.style.transform=`rotate(${r.toFixed(2)}deg)`; }
  }
  /* Nov 27 2026 (Noa): the cards under "More for today" each have one color that means something, the same color as their
     square in TODAY.LOG; the label lists the cards that are really there, in their order; Words to review starts folded. */
  function moreCards(){
    const vis=CARDS.map(c=>[document.getElementById(c[0]),c]).filter(([el])=>el&&!el.hidden&&el.getClientRects().length);
    vis.forEach(([el,c])=>{ if(el.dataset.rdcat!==c[1]) el.dataset.rdcat=c[1]; });
    vis.sort((a,b)=>a[0].getBoundingClientRect().top-b[0].getBoundingClientRect().top);
    const l=document.querySelector("#rdMore .rd-more-l"); if(l){ const h=vis.map(([,c])=>`<span><i class="rd-catsq" data-cat="${c[1]}" aria-hidden="true"></i>${c[2]}</span>`).join(" · "); if(l.innerHTML!==h) l.innerHTML=h; }
    /* every card: the same header strip with a fold/unfold button in the same spot (Nov 27 2026, Noa). Remembered per kind (ncs-rdfold);
       Words to review starts folded. */
    let st={}; try{ st=JSON.parse(localStorage.getItem("ncs-rdfold")||"{}")||{}; }catch(e){}
    vis.forEach(([el,c])=>{ if(el.querySelector(":scope > .rd-cbar")) return;
      const own=c[1]==="club"&&el.querySelector(".hc-h b"); const nm=own?own.firstChild.textContent.replace(/^[^A-Za-z]+/,"").trim():{duels:"Your duels",stoic:"Daily Stoic",club:"This week in the club",word:"Word of the day",world:"Around the world today",review:"Words to review"}[c[1]]||c[2];
      const bar=document.createElement("button"); bar.type="button"; bar.className="rd-cbar"; bar.innerHTML=`<i class="rd-catsq" data-cat="${c[1]}" aria-hidden="true"></i><span class="rd-cbar-t">${nm}</span><span class="rd-cbar-n"></span><span class="rd-cbar-x" aria-hidden="true"></span>`;
      const cs=getComputedStyle(el); el.style.setProperty("--cpad",cs.paddingLeft); el.style.setProperty("--cpadt",cs.paddingTop);
      el.prepend(bar); const fold=(c[1] in st)?!!st[c[1]]:c[1]==="review"; el.classList.toggle("rd-fold",fold); bar.setAttribute("aria-expanded",String(!fold));
      bar.addEventListener("click",()=>{ const f=!el.classList.contains("rd-fold"); el.classList.toggle("rd-fold",f); bar.setAttribute("aria-expanded",String(!f)); let s2={}; try{ s2=JSON.parse(localStorage.getItem("ncs-rdfold")||"{}")||{}; }catch(e){} s2[c[1]]=f?1:0; try{ localStorage.setItem("ncs-rdfold",JSON.stringify(s2)); }catch(e){} });
      new MutationObserver(()=>bar.setAttribute("aria-expanded",String(!el.classList.contains("rd-fold")))).observe(el,{attributes:true,attributeFilter:["class"]}); });
    const rv=document.getElementById("rvBox");
    if(rv){ const n=(document.getElementById("rvList")||{children:[]}).children.length, b=rv.querySelector(":scope > .rd-cbar .rd-cbar-n"); if(b){ const t=n?String(n):""; if(b.textContent!==t) b.textContent=t; } }   /* only write when it changed: writing it every time re-triggered the watcher above and froze the page (Nov 27 2026) */
  }
  if(RD){ setInterval(()=>{ if(document.getElementById("rdMore")) moreCards(); },1500);
    /* a card that redraws itself (e.g. Around the world → Yesterday) loses its strip: put it back in the same frame, so nothing jumps */
    let mq=0; const mo=new MutationObserver(()=>{ if(mq) return; mq=1; queueMicrotask(()=>{ mq=0; if(document.getElementById("rdMore")) moreCards(); }); });
    const watch=()=>{ const v=document.getElementById("v-notes"); if(v){ mo.observe(v,{childList:true,subtree:true}); } else setTimeout(watch,500); }; watch(); }
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
    if(t.dataset.rdscroll){ const el=document.getElementById(t.dataset.rdscroll); if(el){ el.classList.remove("rd-fold"); el.scrollIntoView({behavior:"smooth",block:"start"}); glow(el); /* parts above can change height while scrolling: land again on the card */ [500,900].forEach(ms=>setTimeout(()=>{ const t=el.getBoundingClientRect().top; if(Math.abs(t-96)>16) scrollBy({top:t-96,behavior:"smooth"}); },ms)); } return; }
    if(t.dataset.rdsheet){ openTopics(t); }
  });
  document.addEventListener("submit",e=>{
    const f=e.target.closest&&e.target.closest("[data-rdtr]"); if(!f) return; e.preventDefault();
    const q=(document.getElementById("rdTrIn")||{}).value||""; if(openTranslator(q)) return; go("translate");
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
    const list=sh.querySelector(".rdt-in").innerHTML; let lent=null;
    const close=()=>{ if(lent) lent(); sh.remove(); document.documentElement.classList.remove("rd-lock"); if(from) from.focus(); };
    sh.addEventListener("click",e=>{ if(e.target===sh||e.target.closest(".rdt-x")) { close(); return; }
      if(e.target.closest("[data-rdtback]")){ if(lent) lent(); lent=null; sh.querySelector(".rdt-in").innerHTML=list; sh.scrollTop=0; const t=sh.querySelector(".rdt-x"); if(t) t.focus(); return; }
      const full=e.target.closest("[data-rdtfull]"); if(full){ const id=full.dataset.rdtfull; close(); go(id); return; }
      const b=e.target.closest("[data-rdtopic]"); if(b){ const id=b.dataset.rdtopic; lent=readIn(sh,id,b.querySelector("span")?b.querySelector("span").textContent:id,true); if(!lent){ close(); go(id); } } });
    sh.addEventListener("keydown",e=>{ if(e.key==="Escape") close(); });
    const f=sh.querySelector(".rdt-x"); if(f) f.focus();
  }
  /* Nov 27 2026 (Noa): a topic (or the Translator) opens right inside the pop-up. The page itself is borrowed:
     moved into the pop-up while it's open, then put back exactly where it was. "Full page ↗" goes to the real page. */
  function readIn(sh,id,title,back){
    const v=document.getElementById("v-"+id); if(!v) return null;
    const home=document.createComment("rd-borrowed"), wasHidden=v.hidden; v.parentNode.insertBefore(home,v);
    const box=sh.querySelector(".rdt-in");
    box.innerHTML=`<div class="rdt-head rdt-rhead">${back?`<button type="button" class="rdt-back" data-rdtback>← All topics</button>`:"<span></span>"}<span class="rdt-rt">${esc(title)}</span><span class="rdt-acts"><button type="button" class="rdt-full" data-rdtfull="${esc(id)}">Full page ↗</button><button type="button" class="rdt-x" aria-label="Close">✕</button></span></div><div class="rdt-read"></div>`;
    v.hidden=false; v.classList.add("rd-lent"); box.querySelector(".rdt-read").appendChild(v); sh.scrollTop=0;
    const bk=box.querySelector("[data-rdtback]")||box.querySelector(".rdt-x"); if(bk) bk.focus();
    return ()=>{ v.classList.remove("rd-lent"); v.hidden=wasHidden; if(home.parentNode){ home.parentNode.insertBefore(v,home); home.remove(); } };
  }
  function openTranslator(q){
    let sh=document.getElementById("rdTopics"); if(sh) sh.remove();
    sh=document.createElement("div"); sh.id="rdTopics"; sh.className="rd-topics"; sh.setAttribute("role","dialog"); sh.setAttribute("aria-modal","true"); sh.setAttribute("aria-label","Translator");
    sh.innerHTML='<div class="rdt-in"></div>'; document.body.appendChild(sh); document.documentElement.classList.add("rd-lock");
    const lent=readIn(sh,"translate","Translator",false); if(!lent){ sh.remove(); document.documentElement.classList.remove("rd-lock"); return false; }
    const close=()=>{ lent(); sh.remove(); document.documentElement.classList.remove("rd-lock"); const i=document.getElementById("rdTrIn"); if(i) i.focus(); };
    sh.addEventListener("click",e=>{ if(e.target===sh||e.target.closest(".rdt-x")){ close(); return; } const full=e.target.closest("[data-rdtfull]"); if(full){ const tq=(document.getElementById("trIn")||{}).value||""; close(); go("translate"); setTimeout(()=>{ const i=document.getElementById("trIn"); if(i&&tq&&!i.value) i.value=tq; },150); } });
    sh.addEventListener("keydown",e=>{ if(e.key==="Escape") close(); });
    setTimeout(()=>{ const i=document.getElementById("trIn"), b=document.getElementById("trBtn"); if(i){ i.value=q; i.dispatchEvent(new Event("input",{bubbles:true})); if(q.trim()&&b) b.click(); i.focus(); } },60);
    return true;
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
  /* the Home star follows the mouse (Nov 27 2026, Noa): while the mouse is over it, it turns with the mouse around its middle,
     clockwise or counterclockwise. The "over it" area is a fixed circle, so the turning star never slips away from the mouse. */
  (function(){ if(!matchMedia("(hover:hover)").matches||matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    let rot=0, want=0, last=null, raf=0, hot=false; window.__rdStarRot=()=>rot;
    const star=()=>document.querySelector("#rdHome .rdh-art");
    const tick=()=>{ raf=0; const a=star(); if(!a) return; if(!hot) want*=0.96; rot+=(want-rot)*0.18; a.style.transform=`rotate(${rot.toFixed(2)}deg)`; a.classList.toggle("rd-hot",hot);
      if(Math.abs(want-rot)>.05||(!hot&&Math.abs(want)>.05)) raf=requestAnimationFrame(tick); else if(!hot){ rot=want=0; a.style.transform=""; } };
    const go=()=>{ if(!raf) raf=requestAnimationFrame(tick); };
    document.addEventListener("mousemove",e=>{ const a=star(); if(!a||!a.getClientRects().length){ hot=false; return; }
      const prev=a.style.transform; a.style.transform=""; const r=a.getBoundingClientRect(); a.style.transform=prev;
      const cx=r.left+r.width/2, cy=r.top+r.height/2, dx=e.clientX-cx, dy=e.clientY-cy, inside=Math.hypot(dx,dy)<r.width*0.46;
      if(!inside){ if(hot){ hot=false; last=null; go(); } return; }
      const ang=Math.atan2(dy,dx)*180/Math.PI; if(!hot){ hot=true; last=ang; want=rot; return; }
      let d=ang-last; if(d>180) d-=360; if(d<-180) d+=360; last=ang; if(Math.hypot(dx,dy)>12) want+=d; go(); },{passive:true});
  })();
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
