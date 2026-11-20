/* step198: report page errors to Noa (no words or notes, just where it broke) */
(function(){
  if(window.__csPreview||window.__csGuest) return;
  const API="https://hibi-pay.learnwithnoa.workers.dev/api/err", seen=new Set(); let sent=0;
  const dev=()=>{ const u=navigator.userAgent; const os=/iPhone/.test(u)?"iPhone":/iPad/.test(u)?"iPad":/Android/.test(u)?"Android":/Mac OS X/.test(u)?"Mac":/Windows/.test(u)?"Windows":"other";
    const br=/CriOS|Chrome\//.test(u)&&!/Edg\//.test(u)?"Chrome":/Edg\//.test(u)?"Edge":/Firefox|FxiOS/.test(u)?"Firefox":/Safari\//.test(u)?"Safari":"browser"; return os+" · "+br+(window.matchMedia&&matchMedia("(display-mode: standalone)").matches?" · app":""); };
  const view=()=>{ const v=[...document.querySelectorAll("section.view")].find(x=>x.offsetParent); return (location.hash||"").slice(0,30)||(v&&v.id)||"home"; };
  async function send(msg,src,line){
    msg=String(msg||"").slice(0,300); src=String(src||"");
    if(!msg||/^Script error\.?$/.test(msg)||/ResizeObserver loop/.test(msg)||/extension:\/\//.test(src)) return;
    if(src&&!/hibi\.cl|localhost|github\.io|^$/.test(src)&&!/^https?:\/\/[^/]*hibi/.test(src)) return;   /* only Hibi's own code */
    const k=msg+"|"+src+"|"+line; if(seen.has(k)||sent>=5) return; seen.add(k); sent++;
    try{ const F=window.__csFire; if(!F||!F.token) return; const tok=await F.token(); if(!tok) return;
      let v=""; try{ v=(window.__csVer||"")+""; }catch(e){}
      fetch(API,{method:"POST",headers:{authorization:"Bearer "+tok,"content-type":"application/json"},body:JSON.stringify({msg,src:src.replace(/^https?:\/\/[^/]+/,""),line:line|0,view:view(),dev:dev(),v}),keepalive:true}).catch(()=>{}); }catch(e){}
  }
  window.addEventListener("error",e=>{ if(e&&e.message) send(e.message,e.filename,e.lineno); });
  window.addEventListener("unhandledrejection",e=>{ const r=e&&e.reason; const m=r&&(r.message||String(r)); if(m&&!/network|Failed to fetch|Load failed|NetworkError|aborted|offline|permission|PERMISSION|unauthenticated|signin|Please sign in/i.test(m)) send("Unhandled: "+m,r&&r.stack&&(String(r.stack).match(/https?:\/\/[^\s)]+/)||[""])[0],0); });
})();
