# step60: one 🔔 for everyone (private-student updates + club), profile button option B
R('''  box.addEventListener("click",e=>{ const g=e.target.closest("[data-ctgo]"); if(!g) return;''','''  /* for the 🔔 in the top bar: what's new in your coaching, mark it seen, open a tab */
  window.__csCoachNews={ list:()=>window.__csPreview?[]:newsFor(window.__csHubView), seen:()=>{ if(window.__csPreview) return; markSeen(window.__csHubView); render(); },
    go:t=>{ if(window.csGo) window.csGo("coaching"); else location.hash="#coaching"; setTimeout(()=>{ if(t&&t!=="top"){ tab=t; render(); setTimeout(()=>box.querySelector(".ch-tabs")?.scrollIntoView({behavior:"smooth",block:"start"}),60); } else window.scrollTo({top:0,behavior:"smooth"}); },80); } };
  box.addEventListener("click",e=>{ const g=e.target.closest("[data-ctgo]"); if(!g) return;''')
# bell: count and list coaching news + club notes
R('''  function paintBell(){ const b=document.getElementById("clBell"); if(!b) return; const seen=+LSG(BSEEN,0)||0, n=NOTES.filter(x=>x.at>seen).length;''','''  let CNSNAP=null;
  const isClubber=()=>{ const fd=window.__clubFeed&&window.__clubFeed(); return !!fd; };
  function paintBell(){ const b=document.getElementById("clBell"); if(!b) return; const CN=window.__csCoachNews?window.__csCoachNews.list():[], club=isClubber(), seen=+LSG(BSEEN,0)||0, n=(club?NOTES.filter(x=>x.at>seen).length:0)+CN.length;''')
R('''    b.setAttribute("aria-label",L("Club notifications","Notificaciones del club")+(n?` (${n})`:""));
    const pn=document.getElementById("clBellPanel"); if(!pn||pn.hidden) return;
    pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Club notifications","Notificaciones del club")}</b></div>${NOTES.length?''','''    b.setAttribute("aria-label",L("Notifications","Notificaciones")+(n?` (${n})`:""));
    const pn=document.getElementById("clBellPanel"); if(!pn||pn.hidden) return;
    const cn=CNSNAP||CN, fdt=d=>{ try{ return new Date(d+"T12:00").toLocaleDateString(L("en-US","es-CL"),{month:"short",day:"numeric"}); }catch(e){ return d; } };
    const coachHTML=cn.length?`<h4 class="clb-sec">📚 ${L("Your classes","Tus clases")}</h4><ul>${cn.map(x=>`<li><button type="button" class="clb-i new" data-cngo="${esc(x.tab||"top")}"><span>${x.ico} ${x.t}</span><em>${fdt(x.d)}</em></button></li>`).join("")}</ul>`:"";
    if(!club){ pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+(coachHTML||`<p class="clb-e">${L("Nothing new right now. When Noa adds a class recap, a recommendation or a progress report, you’ll see it here.","Nada nuevo por ahora. Cuando Noa suba un resumen de clase, una recomendación o un informe de progreso, lo verás aquí.")}</p>`); return; }
    pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+coachHTML+(coachHTML?`<h4 class="clb-sec">🌼 ${L("Club","Club")}</h4>`:"")+`${NOTES.length?''')
R('''      if(open){ pn.dataset.seen=String(+LSG(BSEEN,0)||0); paintBell(); await loadNotes(); paintBell(); if(!G()&&!window.__csViewAsMode) LSS(BSEEN,Date.now()); setTimeout(paintBell,0); } else paintBell(); });''','''      if(open){ CNSNAP=window.__csCoachNews?window.__csCoachNews.list():[]; pn.dataset.seen=String(+LSG(BSEEN,0)||0); paintBell(); if(isClubber()){ await loadNotes(); paintBell(); } if(!G()&&!window.__csViewAsMode){ LSS(BSEEN,Date.now()); if(CNSNAP.length&&window.__csCoachNews) window.__csCoachNews.seen(); } setTimeout(paintBell,0); } else { CNSNAP=null; paintBell(); } });''')
R('''    document.addEventListener("click",e=>{ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden&&!e.target.closest("#clBellWrap")){ pn.hidden=true; document.getElementById("clBell")?.setAttribute("aria-expanded","false"); paintBell(); } }); }''','''    document.addEventListener("click",e=>{ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden&&!e.target.closest("#clBellWrap")){ pn.hidden=true; CNSNAP=null; document.getElementById("clBell")?.setAttribute("aria-expanded","false"); paintBell(); } }); }
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-cngo]"); if(!g) return; const pn=document.getElementById("clBellPanel"); if(pn) pn.hidden=true; CNSNAP=null; paintBell(); window.__csCoachNews&&window.__csCoachNews.go(g.dataset.cngo); });''')
R('''  function bellCheck(){ const fd=window.__clubFeed&&window.__clubFeed(), on=!!fd&&(G()||(!!me()&&me()!==NOA))&&(!window.__csPreview||!!window.__csViewAsMode); buildBell(); const w=document.getElementById("clBellWrap"); if(!w) return; w.hidden=!on;
    if(on&&Date.now()-bellT>600000){ bellT=Date.now(); loadNotes().then(paintBell); } }''','''  function bellCheck(){ const fd=window.__clubFeed&&window.__clubFeed(), coach=!!window.__csHubView&&!window.__csTeacher, on=(!!fd||coach)&&(G()||(!!me()&&me()!==NOA))&&(!window.__csPreview||!!window.__csViewAsMode); buildBell(); const w=document.getElementById("clBellWrap"); if(!w) return; w.hidden=!on;
    if(on&&fd&&Date.now()-bellT>600000){ bellT=Date.now(); loadNotes().then(paintBell); } else if(on) paintBell(); }''')
R('''title="${L("Club notifications","Notificaciones del club")}"><span aria-hidden="true">🔔</span>''','''title="${L("Notifications","Notificaciones")}"><span aria-hidden="true">🔔</span>''')
css60 = '''
/* step60 */
.clb-sec{margin:10px 2px 4px;font:800 11.5px var(--mono,monospace);letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
.clb-panel ul+.clb-sec{margin-top:14px}
html:not(.cs-signed) .top-in #authBtn{width:auto!important;min-width:0!important;padding:0 13px!important;border-radius:999px!important;gap:7px!important}
/* profile button, option B: same thin border as the other buttons, photo inside, small status dot */
html.cs-signed .top-in #authBtn{padding:0!important;border-width:1.5px!important;border-color:var(--line)!important;box-shadow:none!important;overflow:visible!important;position:relative}
html.cs-signed .top-in #authBtn .g-ico{width:calc(100% - 7px)!important;height:calc(100% - 7px)!important;border:0!important}
html.cs-signed .top-in #authBtn::after{content:"";position:absolute;right:-2px;bottom:-2px;width:10px;height:10px;border-radius:50%;background:var(--green);border:2px solid var(--bg);box-sizing:content-box}
html.cs-signed .top-in #authBtn.st-busy::after{background:#E0A100}
html.cs-signed .top-in #authBtn.st-err::after{background:var(--red,#E5533D)}
html.cs-signed .top-in #authBtn:hover{border-color:var(--royal,#3b82f6)!important}
'''
_i = s.index('</style>'); s = s[:_i] + css60 + s[_i:]
R('''    ["🗑️","Delete messages and chats",''','''    ["🔔","Notifications for everyone","the 🔔 at the top now shows everything new for you: class recaps, recommendations, progress reports and new classes from Noa, plus replies and reactions in the club. Tap one to go straight there."],
    ["🗑️","Delete messages and chats",''')
