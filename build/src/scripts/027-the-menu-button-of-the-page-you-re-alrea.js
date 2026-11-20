
/* the menu button of the page you're already on: back to that page's first tab */
document.addEventListener("click",e=>{ const b=e.target.closest("nav .navbtn[data-go]"); if(!b||b.getAttribute("aria-current")!=="true") return; const k=b.dataset.go;
  setTimeout(()=>{ try{
    if(k==="club"&&window.__clubTab) window.__clubTab("week");
    else if(k==="students"){ const f=document.querySelector("#stFrame iframe"); if(f) f.contentWindow.location.hash="#overview"; }
    else if(k==="members"){ const f=document.querySelector("#mbFrame iframe"), t=f&&f.contentDocument.querySelector("#mTabs [data-mtab]"); if(t) t.click(); }
    scrollTo({top:0});
  }catch(er){} },30); },true);
