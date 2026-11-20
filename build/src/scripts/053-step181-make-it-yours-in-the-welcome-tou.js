
/* step181: "Make it yours" in the welcome tour uses the same switches as Settings */
(function(){
  const wl=document.getElementById("welcome"); if(!wl) return;
  const $=id=>document.getElementById(id);
  const theme=()=>{ try{ const v=JSON.parse(localStorage.getItem("ncs-theme")||'"dark"'); return v||"dark"; }catch(e){ return localStorage.getItem("ncs-theme")||"dark"; } };
  const size=()=>{ try{ return +(window.csComfort&&window.csComfort.get().size)||1; }catch(e){ return 1; } };
  function paint(){
    wl.querySelectorAll("[data-wlth]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.wlth===theme())));
    const sz=size(); wl.querySelectorAll("[data-wlsz]").forEach(b=>b.setAttribute("aria-pressed",String(Math.abs(+b.dataset.wlsz-sz)<.06||(b.dataset.wlsz==="1.35"&&sz>1.3)||(b.dataset.wlsz==="1"&&sz<1.05))));
    const s=$("wlmSimple"); if(s) s.checked=!!(window.csSimple&&window.csSimple.on());
    const c=$("wlmCalm"); if(c) c.checked=document.documentElement.classList.contains("cs-calm");
  }
  function setSize(t){ const SIZES=[.8,.9,1,1.1,1.2,1.35,1.5]; let n=0; const go=()=>{ const cur=size(); if(Math.abs(cur-t)<.01||n++>8) return paint(); const b=$(cur<t?"csBigger":"csSmaller"); if(!b) return paint(); b.click(); setTimeout(go,0); }; go(); }
  wl.addEventListener("click",e=>{
    const th=e.target.closest("[data-wlth]"); if(th){ const b=document.querySelector('#csThemes [data-cstheme="'+th.dataset.wlth+'"]'); if(b) b.click(); setTimeout(paint,50); return; }
    const sz=e.target.closest("[data-wlsz]"); if(sz){ setSize(+sz.dataset.wlsz); return; }
  });
  wl.addEventListener("change",e=>{
    if(e.target.id==="wlmSimple"){ if(window.csSimple) window.csSimple.set(e.target.checked); }
    if(e.target.id==="wlmCalm"){ const c=$("csCalm"); if(c){ c.checked=e.target.checked; c.dispatchEvent(new Event("change",{bubbles:true})); } }
    setTimeout(paint,50);
  });
  new MutationObserver(()=>{ if(!wl.hidden) paint(); }).observe(wl,{attributes:true,attributeFilter:["hidden"],subtree:true});
})();
