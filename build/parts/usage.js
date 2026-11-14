/* ---------- usage counts (for Noa's teacher view): how often each part of the site is used, per day ---------- */
(function(){
  const DAY=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  let pend={}, timer=null;
  function flush(){
    timer=null; const keys=Object.keys(pend); if(!keys.length) return;
    const u=LS.get("ncs-usage",{})||{}, d=DAY(); u[d]=u[d]||{};
    keys.forEach(k=>{ u[d][k]=(u[d][k]|0)+pend[k]; }); pend={};
    const ds=Object.keys(u).sort((a,b)=>new Date(b)-new Date(a)); ds.slice(35).forEach(k=>delete u[k]);
    LS.set("ncs-usage",u);
  }
  window.csUse=function(k){ pend[k]=(pend[k]|0)+1; if(!timer) timer=setTimeout(flush,45000); };
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) flush(); });
  window.addEventListener("pagehide",flush);
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) csUse("flash"); });
  document.addEventListener("cs-modround",e=>{ const d=e.detail||{}; csUse(d.irr?"irr":d.mod?"gram":"vocab"); });
  document.addEventListener("cs-sentence",()=>csUse("sentence"));
  document.addEventListener("cs-said",()=>csUse("say"));
  document.addEventListener("click",e=>{ if(e.target.closest("#trBtn")) csUse("translate"); if(e.target.closest("[data-vlearn]")) csUse("vcards"); },true);
})();
