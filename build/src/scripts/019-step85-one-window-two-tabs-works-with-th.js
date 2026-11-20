
/* step85: one 🔔 window, two tabs. Works with the club bell (members) and Noa's bell, and the 💬 Messages pop-up. */
(function(){
  const dmBtn=()=>document.getElementById("dmTopBtn");
  const hasDM=()=>{ const m=dmBtn(); return !!m&&!m.hidden; };
  function bell(){ const w=document.getElementById("clBellWrap"); if(w&&!w.hidden){ const b=document.getElementById("clBell"); if(b) return {k:"c",btn:b}; }
    const t=document.querySelector("#tNotif .tn-bell"); return t?{k:"t",btn:t}:null; }
  const on=()=>document.documentElement.classList.contains("nm-on");
  window.__nmAnchor=()=>{ const b=bell(); return on()&&b?b.btn:dmBtn(); };
  const dmCount=()=>{ const n=document.querySelector("#dmTopBtn .cl-dmn"); return n&&!n.hidden?(parseInt(n.textContent,10)||0):0; };
  const mLabel=n=>`💬 Messages${n?` <span class="nm-c">${n}</span>`:""}`;
  const tabs=cur=>`<div class="nm-tabs" role="tablist" aria-label="Notifications and messages"><button type="button" role="tab" data-nm="n" aria-selected="${cur==="n"}">🔔 Notifications</button><button type="button" role="tab" data-nm="m" aria-selected="${cur==="m"}">${mLabel(dmCount())}</button></div>`;
  function openNotif(){ const b=bell(); if(!b) return; if(b.k==="c"){ const pn=document.getElementById("clBellPanel"); if(pn&&pn.hidden) b.btn.click(); } else if(!document.querySelector("#tNotif .tn-box")) b.btn.click(); }
  function closeNotif(){ const b=bell(); if(!b) return; if(b.k==="c"){ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden) b.btn.click(); } else { const x=document.querySelector('#tNotif [data-tn="hide"]'); if(x) x.click(); } }
  document.addEventListener("click",e=>{ if(e.target.closest("[data-nmclose]")){ e.preventDefault(); e.stopPropagation(); closeNotif(); const b=bell(); if(b) b.btn.focus(); return; } },true);
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-nm]"); if(!t) return; e.preventDefault(); e.stopPropagation();
    if(t.getAttribute("aria-selected")==="true") return;
    try{ localStorage.setItem("cs-nmtab",t.dataset.nm); }catch(er){}
    if(t.dataset.nm==="m"){ if(window.__clubInbox) window.__clubInbox(); const t0=Date.now(); (function w(){ if(document.getElementById("clDm")||Date.now()-t0>1500){ requestAnimationFrame(()=>{ window.__nmProg=true; try{ closeNotif(); }finally{ window.__nmProg=false; } }); return; } requestAnimationFrame(w); })(); }
    else { window.__nmProg=true; try{ openNotif(); }finally{ window.__nmProg=false; } requestAnimationFrame(()=>{ if(document.getElementById("clDm")){ if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); } }); } },true);
  /* Messages is a drop-down now: a click outside closes it, and the bell closes it (like the profile window) */
  const dmClose=()=>{ if(window.__clubDmClose) window.__clubDmClose(); else { const o=document.getElementById("clDm"); if(o) o.remove(); } };
  document.addEventListener("click",e=>{ if(!on()||window.__nmProg) return; const o=document.getElementById("clDm"); if(!o) return; const b=bell();
    if(b&&b.btn.contains(e.target)){ if(window.__nmProg) return; e.preventDefault(); e.stopPropagation(); dmClose(); return; }
    if(!e.target.closest(".cl-dm,[data-nm],.csc-bd,.cs-lb,[role=alertdialog],[role=dialog]:not(#clDm)")&&document.contains(e.target)) dmClose(); },true);
  /* tapping the bell opens the tab you used last */
  document.addEventListener("click",e=>{ if(!on()||window.__nmProg||document.getElementById("clDm")) return; const b=bell(); if(!b||!b.btn.contains(e.target)) return;
    let last="n"; try{ last=localStorage.getItem("cs-nmtab")||"n"; }catch(er){} if(last!=="m"||!window.__clubInbox) return;
    const open=b.k==="c"?!document.getElementById("clBellPanel").hidden:!!document.querySelector("#tNotif .tn-box"); if(open) return;
    e.preventDefault(); e.stopPropagation(); window.__clubInbox(); },true);
  let q=0;
  function decorate(){ q=0;
    const b=bell(), want=hasDM()&&!!b; if(on()!==want) document.documentElement.classList.toggle("nm-on",want); if(!want) return;
    const ch=document.querySelector("#clBellPanel .clb-h"); if(ch&&!ch.querySelector(".nm-tabs")) ch.innerHTML=tabs("n")+'<button type="button" class="nm-x" data-nmclose="1" aria-label="Close">×</button>';
    const th=document.querySelector("#tNotif .tn-h"); if(th&&!th.querySelector(".nm-tabs")){ const t=th.querySelector(":scope > b"); if(t) t.outerHTML=tabs("n"); }
    const dh=document.querySelector("#clDm .cl-dmh"); if(dh){ const bk=dh.querySelector(".cl-dmback"), inbox=!bk||bk.hidden, tb=dh.querySelector(".nm-tabs");
      if(inbox&&!tb) dh.insertAdjacentHTML("afterbegin",tabs("m")); else if(!inbox&&tb) tb.remove(); if(dh.classList.contains("nm-hasTabs")!==inbox) dh.classList.toggle("nm-hasTabs",inbox); }
    const n=dmCount(), lab=mLabel(n); document.querySelectorAll('.nm-tabs [data-nm="m"]').forEach(x=>{ if(x.innerHTML!==lab) x.innerHTML=lab; });
    const nat=(()=>{ const e=b.k==="c"?b.btn.querySelector(".clb-n"):b.btn.querySelector(".tn-num"); if(!e||e.hidden) return 0; const t=e.textContent.trim(); return t.endsWith("+")?10:(parseInt(t,10)||0); })();
    if(document.documentElement.classList.contains("nm-t")!==(b.k==="t")) document.documentElement.classList.toggle("nm-t",b.k==="t");
    const dmo=document.getElementById("clDm"); if(dmo&&dmo.getAttribute("aria-modal")!=="false") dmo.setAttribute("aria-modal","false");
    const tot=nat+n, tt=tot>9?"9+":String(tot);
    let bd=b.btn.querySelector(".nm-n"); if(tot){ if(!bd){ bd=document.createElement("span"); bd.className="nm-n"; bd.setAttribute("aria-hidden","true"); b.btn.appendChild(bd); } if(bd.textContent!==tt) bd.textContent=tt; } else if(bd) bd.remove();
    if(n) b.btn.setAttribute("aria-description",n+" new message"+(n===1?"":"s")); else b.btn.removeAttribute("aria-description");
  }
  const kick=()=>{ if(!q) q=requestAnimationFrame(decorate); };
  const start=()=>{ new MutationObserver(kick).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden"]}); kick(); };
  if(document.body) start(); else document.addEventListener("DOMContentLoaded",start);
})();
