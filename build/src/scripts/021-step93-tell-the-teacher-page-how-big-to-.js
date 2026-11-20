
/* step93: tell the teacher page how big to make this frame (just the buttons, or room for an open window) */
(function(){ if(!window.__csTB) return;
  const vis=el=>!!el&&!el.hidden&&el.offsetParent!==null;
  let last="";
  function state(){
    const full=!!document.querySelector(".cs-lb,.csc-bd,.cl-prof-ov");
    const open=full||vis(document.getElementById("musicPanel"))||vis(document.getElementById("authPanel"))||vis(document.getElementById("csPanel"))||vis(document.getElementById("clBellPanel"))||!!document.querySelector("#tNotif .tn-box")||!!document.getElementById("clDm");
    const h=document.querySelector("header.top"), r=h?h.getBoundingClientRect():{width:0,height:0};
    const cs=getComputedStyle(document.documentElement).colorScheme||"normal";
    return {tbx:1,open,full,w:Math.ceil(r.width),h:Math.ceil(r.height),cs};
  }
  function send(){ q=0; const st=state(), k=JSON.stringify(st); if(k===last) return; last=k; try{ parent.postMessage(st,location.origin); }catch(e){} }
  let q=0; const kick=()=>{ if(!q) q=requestAnimationFrame(send); };
  const go=()=>{ new MutationObserver(kick).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["hidden","class","style"]}); addEventListener("resize",kick); kick(); setInterval(kick,1500); };
  if(document.body) go(); else document.addEventListener("DOMContentLoaded",go);
  /* the teacher page asks us to close everything (a click outside the frame) */
  addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data||!e.data.tbClose) return;
    document.querySelectorAll("#musicPanel,#authPanel,#csPanel,#clBellPanel").forEach(p=>{ if(!p.hidden){ const x=p.querySelector(".qa-x,.cs-x,#csClose,#musicClose,[data-nmclose],#authClose"); if(x) x.click(); else p.hidden=true; } });
    const tx=document.querySelector('#tNotif [data-tn="hide"]'); if(tx) tx.click();
    if(document.getElementById("clDm")&&window.__clubDmClose) window.__clubDmClose(); });
})();
