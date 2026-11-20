
/* ---- a newer Hibi is online: refresh quietly when it's safe, or offer a button ---- */
(function(){ const BUILD="⟦build⟧"; let hiddenAt=0, shown=false;
  const busy=()=>!!(window.__csBusy&&window.__csBusy());
  async function latest(){ try{ const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"}); if(!r.ok) return null; const j=await r.json(); return j&&j.v||null; }catch(e){ return null; } }
  function offer(){ if(shown) return; shown=true; const b=document.createElement("div"); b.className="cs-upd"; b.setAttribute("role","status");
    b.innerHTML='<span>✨ Hibi just got an update.</span><button type="button" class="cs-upd-go">Refresh</button><button type="button" class="cs-upd-x" aria-label="Later">×</button>';
    b.querySelector(".cs-upd-go").onclick=()=>location.reload(); b.querySelector(".cs-upd-x").onclick=()=>b.remove(); document.body.appendChild(b); }
  async function check(back){ const v=await latest(); if(!v||v<=BUILD) return; if(back&&!busy()) { location.reload(); return; } offer(); }
  window.csCheckUpdate=()=>check(false);
  document.addEventListener("visibilitychange",()=>{ if(document.hidden){ hiddenAt=Date.now(); return; } const away=hiddenAt?Date.now()-hiddenAt:0; check(away>8*60*60*1000); });
  setInterval(()=>{ if(!document.hidden) check(false); },30*60*1000);
  setTimeout(()=>check(false),60*1000);
})();
