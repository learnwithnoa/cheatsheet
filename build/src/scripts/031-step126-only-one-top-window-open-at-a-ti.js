
/* step126: only one top window open at a time */
(function(){
  const P=[["#musicPanel","#musicBtn"],["#tmPanel","#tmBtn"],["#clBellPanel","#clBell,#dmTopBtn"],[".cl-dm-ov","#clBell,#dmTopBtn"],["#authPanel","#authBtn"],["#csPanel","#authBtn"],["#qa","#hdrWord,#fab"]];
  const vis=e=>!!e&&e.getClientRects().length>0;
  const closeIt=sel=>{ const e=document.querySelector(sel); if(!vis(e)) return;
    const x=[...e.querySelectorAll("button")].find(b=>vis(b)&&(/close|cerrar/i.test(b.getAttribute("aria-label")||"")||/^[×✕]$/.test(b.textContent.trim())));
    if(x) x.click(); else e.hidden=true; };
  document.addEventListener("click",ev=>{ const b=ev.target.closest&&ev.target.closest("#musicBtn,#tmBtn,#clBell,#dmTopBtn,#authBtn,#hdrWord,#fab"); if(!b) return;
    setTimeout(()=>{ P.forEach(([sel,own])=>{ if(!b.matches(own)) closeIt(sel); }); },0); },true);
})();
