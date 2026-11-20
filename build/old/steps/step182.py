# step182 (Nov 17 2026): long word lists load in batches of 60: "Show more words" at the bottom,
# and it also loads the next batch by itself when you scroll down to it. Search and "Choose all shown" still use every word.
R('''  wList.innerHTML=shown.map(x=>{
    if(x.id===editingId)''', '''  let wLim=window.__wLim||60; if(editingId){ const ix=shown.findIndex(x=>x.id===editingId); if(ix>=wLim) wLim=window.__wLim=ix+1; }
  const wLeft=shown.length-wLim;
  wList.innerHTML=shown.slice(0,wLim).map(x=>{
    if(x.id===editingId)''')
R('''  }).join("");
}
function isPending(x){''', '''  }).join("")+(wLeft>0?'<div class="w-more"><button class="pill-btn" type="button" id="wMore">Show more words <small>('+wLeft+' more)</small></button></div>':"");
  if(window.__wMoreWatch) window.__wMoreWatch();
}
window.__wRender=renderWords;
function isPending(x){''')
_css = r'''
/* step182: long word lists in batches */
.w-more{display:flex;justify-content:center;padding:14px 0 6px}
.w-more .pill-btn small{font-weight:600;opacity:.8;margin-left:4px}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
_js = r'''<script>
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
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
