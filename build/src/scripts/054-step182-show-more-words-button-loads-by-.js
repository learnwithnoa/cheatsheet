
/* step182: show more words (button + loads by itself when you scroll to it) */
(function(){
  const STEP=60; let io=null;
  const more=()=>{ window.__wLim=(window.__wLim||STEP)+STEP; if(window.__wRender) window.__wRender(); };
  document.addEventListener("click",e=>{ if(e.target.closest("#wMore")){ e.preventDefault(); more(); } });
  /* a new search or sort starts again from the top */
  document.addEventListener("input",e=>{ if(e.target&&e.target.id==="wSearch") window.__wLim=STEP; },true);
  document.addEventListener("change",e=>{ if(e.target&&e.target.closest&&e.target.closest("#v-words select")) window.__wLim=STEP; },true);
  window.__wMoreWatch=function(){
    if(!("IntersectionObserver" in window)) return;
    if(io) io.disconnect();
    const b=document.getElementById("wMore"); if(!b) return;
    io=new IntersectionObserver(es=>{ if(es.some(x=>x.isIntersecting)&&!document.getElementById("v-words").hidden){ io.disconnect(); setTimeout(more,120); } },{rootMargin:"300px 0px"});
    io.observe(b);
  };
})();
