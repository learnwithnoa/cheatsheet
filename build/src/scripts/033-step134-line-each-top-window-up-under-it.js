
/* step134: line each top window up under its own button (right edges match), never closer than 16px to either side */
(function(){
  const A={music:"#musicBtn",tm:"#tmBtn",word:"#hdrWord",bell:"#clBell, #tNotif .tn-bell",auth:"#authBtn"};
  const vis=e=>!!e&&e.getClientRects().length>0;
  function place(){ const W=window.innerWidth, root=document.documentElement.style;
    for(const k in A){ const b=[...document.querySelectorAll(A[k])].find(vis); if(!b){ root.removeProperty("--ar-"+k); continue; }
      let r=Math.round(W-b.getBoundingClientRect().right); r=Math.max(16,Math.min(r,W-380-16)); root.setProperty("--ar-"+k,r+"px"); } }
  addEventListener("resize",place); addEventListener("pointerdown",place,true); addEventListener("keydown",place,true);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",place); else place();
  setTimeout(place,1500); setTimeout(place,4000);
})();
