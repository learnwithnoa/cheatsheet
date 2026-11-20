
/* step180: Settings in a clearer order, plus "What's new pop-ups" */
(function(){
  const $=id=>document.getElementById(id);
  const lab=id=>{ const x=$(id); return x?(x.closest(".cs-tog")||x.closest("label")||x):null; };
  const secOf=t=>[...document.querySelectorAll("#csPanel > .cs-sec")].find(s=>{ const h=s.querySelector(":scope > h4"); return h&&h.textContent.trim()===t; });
  const mk=(key,title)=>{ let s=document.querySelector('#csPanel > .cs-sec[data-sx="'+key+'"]'); if(!s){ s=document.createElement("div"); s.className="cs-sec"; s.dataset.sx=key; s.innerHTML="<h4></h4>"; } s.querySelector(":scope > h4").textContent=title; return s; };
  const getP=()=>{ try{ const v=JSON.parse(localStorage.getItem("ncs-wnpref")||'"all"'); return ["all","week","none"].includes(v)?v:"all"; }catch(e){ return "all"; } };
  const setP=v=>{ try{ localStorage.setItem("ncs-wnpref",JSON.stringify(v)); if(v!=="all") localStorage.setItem("ncs-wnlast",JSON.stringify(Date.now())); }catch(e){} try{ window.__csOnSet&&window.__csOnSet("ncs-wnpref"); }catch(e){} };
  function wnBox(){ let b=$("csWnPref"); if(b) return b; b=document.createElement("div"); b.className="cs-wnp-box"; b.id="csWnPref";
    b.innerHTML='<b>What\'s new pop-ups</b><small>When Hibi gets something new. Every update is always listed in “What\'s new”.</small><div class="cs-wnp" role="group" aria-label="What\'s new pop-ups">'+[["all","Every update"],["week","Once a week"],["none","Never (just a dot)"]].map(([v,l])=>'<button type="button" data-wnp="'+v+'">'+l+'</button>').join("")+'</div>';
    b.addEventListener("click",e=>{ const x=e.target.closest("[data-wnp]"); if(!x) return; setP(x.dataset.wnp); paint(); });
    return b; }
  function paint(){ const p=getP(); document.querySelectorAll("[data-wnp]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.wnp===p))); }
  function arrange(){
    const P=$("csPanel"); if(!P||!$("csSimple")) return;   /* only on Hibi's main page */
    const head=P.querySelector(".cs-head"), reset=$("csResetAll")&&$("csResetAll").closest(".cs-sec");
    const lv=$("csLevelSec"); if(lv){ lv.dataset.sx="easy"; const h=lv.querySelector(":scope > h4"); if(h) h.textContent="Make Hibi easier"; }
    const easy=lv||mk("easy","Make Hibi easier"), look=secOf("Look & feel")||mk("look","Look & feel"), text=secOf("Text & reading")||mk("text","Text & reading"),
      focus=mk("focus","Focus & comfort"), home=mk("home","Home & notifications"), app=$("csInstallSec")||mk("app","App");
    const put=(sec,id)=>{ const l=lab(id); if(l&&l.parentNode!==sec) sec.appendChild(l); };
    /* Make Hibi easier: Beginner mode (with its note) + Simple mode */
    put(easy,"csSimple");
    ["csRead","csInshort"].forEach(id=>put(text,id));
    ["csFocus","csCalm","csContrast"].forEach(id=>put(focus,id));
    const want=[lab("csBuddyT"),lab("csStoicT"),wnBox(),lab("csMailN")].filter(Boolean), cur=[...home.children].filter(c=>c.tagName!=="H4");
    if(want.length!==cur.length||want.some((w,i)=>cur[i]!==w)) want.forEach(w=>home.appendChild(w));
    if(app.querySelector(":scope > h4")) app.querySelector(":scope > h4").textContent="App";
    /* order */
    const hasEasy=!!easy.querySelector(".cs-tog");
    let after=head; [hasEasy?easy:null,look,text,focus,home,app,reset].forEach(s=>{ if(!s) return; if(after.nextElementSibling!==s) after.after(s); after=s; });
    /* old sections that are now empty */
    [...P.querySelectorAll(":scope > .cs-sec")].forEach(s=>{ if(s.dataset.sx||s===look||s===text||s===app||s===reset) return; if(![...s.children].some(c=>c.tagName!=="H4")) s.remove(); });
    if(!hasEasy&&easy.parentNode) easy.remove();
    paint();
  }
  window.__csArrangeSettings=arrange;
  /* the panel fills in over a few seconds (buddy, Daily Stoic, emails…): tidy it whenever it opens or changes */
  function hook(){ const P=$("csPanel"); if(!P){ setTimeout(hook,800); return; } let t=0; new MutationObserver(()=>{ clearTimeout(t); t=setTimeout(arrange,30); }).observe(P,{childList:true,attributes:true,attributeFilter:["hidden"]}); arrange(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",hook); else hook();
})();
