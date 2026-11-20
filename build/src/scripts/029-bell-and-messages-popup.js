
/* step119: 🔔 Notifications + 💬 Messages behave like one pop-up with two tabs (like Profile / Settings).
   This runs first on every click on the bell or a tab and does the whole job itself, so the older handlers can't undo it. */
(function(){
  const on=()=>document.documentElement.classList.contains("nm-on");
  function bell(){ const w=document.getElementById("clBellWrap"); if(w&&!w.hidden){ const b=document.getElementById("clBell"); if(b) return {k:"c",btn:b}; }
    const t=document.querySelector("#tNotif .tn-bell"); return t?{k:"t",btn:t}:null; }
  const vis=e=>!!e&&!e.hidden&&e.getClientRects().length>0;
  const notifOpen=()=>!!document.querySelector("#tNotif .tn-box")||vis(document.getElementById("clBellPanel"));
  const dmOpen=()=>!!document.getElementById("clDm");
  let last="n", passing=false;
  function pass(fn){ passing=true; window.__nmProg=true; try{ fn(); }finally{ passing=false; window.__nmProg=false; } }
  function openNotif(){ const b=bell(); if(!b||notifOpen()) return; pass(()=>b.btn.click()); }
  function closeNotif(){ if(!notifOpen()) return; const x=document.querySelector('#tNotif [data-tn="hide"]'); if(x) return pass(()=>x.click()); const b=bell(); if(b&&b.k==="c") pass(()=>b.btn.click()); }
  function closeDm(){ if(!dmOpen()) return; if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); }
  function openDm(){ if(dmOpen()||!window.__clubInbox) return; window.__clubInbox(); }
  function show(t){ last=t; if(t==="m"){ closeNotif(); openDm(); } else { closeDm(); openNotif(); } }   /* both happen before the next paint, so the page never shows through */
  function closeAll(){ closeDm(); closeNotif(); }
  window.addEventListener("click",e=>{ if(passing||!on()||!e.target.closest) return;
    const tab=e.target.closest("[data-nm]"), x=e.target.closest("[data-nmclose]"), b=bell(), onBell=b&&b.btn.contains(e.target);
    if(!tab&&!x&&!onBell) return;
    e.preventDefault(); e.stopImmediatePropagation();
    ["authPanel:authClose","csPanel:csClose","musicPanel:musicClose","tmPanel:tmClose"].forEach(p=>{ const [pid,cid]=p.split(":"); if(vis(document.getElementById(pid))){ const c=document.getElementById(cid); if(c) pass(()=>c.click()); } });
    if(x){ closeAll(); if(b) b.btn.focus(); return; }
    if(tab){ if(tab.getAttribute("aria-selected")!=="true") show(tab.dataset.nm); return; }
    if(notifOpen()||dmOpen()) closeAll(); else show(last);
  },true);
  /* the 💬 inside a profile or post ("Send a message") still opens Messages directly; remember it as the last tab */
  document.addEventListener("click",e=>{ if(e.target.closest&&e.target.closest("[data-dminbox],[data-dmto]")) last="m"; },true);
})();
