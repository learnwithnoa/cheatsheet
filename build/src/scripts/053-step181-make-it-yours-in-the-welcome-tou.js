
/* step181: "Make it yours" in the welcome tour uses the same switches as Settings */
(function(){
  const wl=document.getElementById("welcome"); if(!wl) return;
  const $=id=>document.getElementById(id);
  const theme=()=>{ try{ const v=JSON.parse(localStorage.getItem("ncs-theme")||'"dark"'); return v||"dark"; }catch(e){ return localStorage.getItem("ncs-theme")||"dark"; } };
  const size=()=>{ try{ return +(window.csComfort&&window.csComfort.get().size)||1; }catch(e){ return 1; } };
  /* Nov 26 2026: the color buttons copy the real ones from Settings (the old fixed list didn't match them anymore and did nothing).
     In the redesign: Light / Night / Unicorn + the pop colors, from Settings → Look & feel. */
  const RD=()=>document.documentElement.classList.contains("rd");
  function build(){
    const box=$("wlmTheme"); if(!box) return; let h="";
    if(RD()){ document.querySelectorAll(".rd-look [data-rdt]").forEach(b=>{ h+=`<button type="button" data-wlrdt="${b.dataset.rdt}">${b.innerHTML}</button>`; });
      const pr=$("wlmPopRow"), pb=$("wlmPop"); if(pr&&pb){ let p=""; document.querySelectorAll(".rd-look [data-pop]").forEach(b=>{ p+=`<button type="button" class="wlm-dot" data-wlpop="${b.dataset.pop}" aria-label="${b.getAttribute("aria-label")||b.dataset.pop}" title="${b.getAttribute("title")||""}" style="background:${b.style.background}"></button>`; }); if(pb.innerHTML!==p) pb.innerHTML=p; if(pr.hidden!==!p) pr.hidden=!p; } }
    else document.querySelectorAll("#csThemes [data-cstheme]").forEach(b=>{ h+=`<button type="button" data-wlth="${b.dataset.cstheme}">${b.innerHTML}</button>`; });
    if(box.innerHTML!==h) box.innerHTML=h;
  }
  function paint(){
    if(!wl.querySelector("#wlmTheme button")) build();
    wl.querySelectorAll("[data-wlth]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.wlth===theme())));
    wl.querySelectorAll("[data-wlrdt]").forEach(b=>{ const o=document.querySelector('.rd-look [data-rdt="'+b.dataset.wlrdt+'"]'); b.setAttribute("aria-pressed",String(!!o&&o.getAttribute("aria-checked")==="true")); });
    wl.querySelectorAll("[data-wlpop]").forEach(b=>{ const o=document.querySelector('.rd-look [data-pop="'+b.dataset.wlpop+'"]'); b.setAttribute("aria-pressed",String(!!o&&o.getAttribute("aria-checked")==="true")); });
    const sz=size(); wl.querySelectorAll("[data-wlsz]").forEach(b=>b.setAttribute("aria-pressed",String(Math.abs(+b.dataset.wlsz-sz)<.06||(b.dataset.wlsz==="1.35"&&sz>1.3)||(b.dataset.wlsz==="1"&&sz<1.05))));
    const s=$("wlmSimple"); if(s) s.checked=!!(window.csSimple&&window.csSimple.on());
    const c=$("wlmCalm"); if(c) c.checked=document.documentElement.classList.contains("cs-calm");
  }
  function setSize(t){ const SIZES=[.8,.9,1,1.1,1.2,1.35,1.5]; let n=0; const go=()=>{ const cur=size(); if(Math.abs(cur-t)<.01||n++>8) return paint(); const b=$(cur<t?"csBigger":"csSmaller"); if(!b) return paint(); b.click(); setTimeout(go,0); }; go(); }
  wl.addEventListener("click",e=>{
    const rt=e.target.closest("[data-wlrdt]"); if(rt){ const o=document.querySelector('.rd-look [data-rdt="'+rt.dataset.wlrdt+'"]'); if(o) o.click(); setTimeout(paint,80); return; }
    const pp=e.target.closest("[data-wlpop]"); if(pp){ const o=document.querySelector('.rd-look [data-pop="'+pp.dataset.wlpop+'"]'); if(o) o.click(); setTimeout(paint,80); return; }
    const th=e.target.closest("[data-wlth]"); if(th){ const b=document.querySelector('#csThemes [data-cstheme="'+th.dataset.wlth+'"]'); if(b) b.click(); setTimeout(paint,50); return; }
    const sz=e.target.closest("[data-wlsz]"); if(sz){ setSize(+sz.dataset.wlsz); return; }
  });
  wl.addEventListener("change",e=>{
    if(e.target.id==="wlmSimple"){ if(window.csSimple) window.csSimple.set(e.target.checked); }
    if(e.target.id==="wlmCalm"){ const c=$("csCalm"); if(c){ c.checked=e.target.checked; c.dispatchEvent(new Event("change",{bubbles:true})); } }
    setTimeout(paint,50);
  });
  let busy=false; new MutationObserver(()=>{ if(wl.hidden||busy) return; busy=true; try{ build(); paint(); }finally{ setTimeout(()=>{busy=false;},0); } }).observe(wl,{attributes:true,attributeFilter:["hidden"],subtree:true});
})();
