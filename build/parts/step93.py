# step93: "?tb=1" = Home shown as just its top-right buttons (music, bell, profile) with their windows. The teacher pages embed it, so they always match Home.
_early = '''<script>
/* teacher pages embed Home as their music / bell / profile buttons (index.html?tb=1) */
(function(){ if(!/[?&]tb=1/.test(location.search)||window.parent===window) return; document.documentElement.classList.add("tb-mode"); window.__csTB=true;
  const b=document.createElement("base"); b.target="_top"; document.head.appendChild(b); })();
</script>
'''
_h = s.index('<title>'); s = s[:_h] + _early + s[_h:]
_css = '''
/* step93: Home as the teacher pages' top-right buttons */
html.tb-mode,html.tb-mode body{background:transparent!important;overflow:hidden!important;min-height:0!important}
html.tb-mode body>*:not(header.top):not(#clDm):not(.cs-lb):not(.csc-bd):not(.cl-prof-ov):not(script):not(style){display:none!important}
html.tb-mode header.top{position:fixed!important;top:0!important;right:0!important;left:auto!important;width:auto!important;background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;padding:0!important;margin:0!important;opacity:1!important}
html.tb-mode .top-in{padding:6px 0 6px 6px!important;max-width:none!important;margin:0!important;width:auto!important;min-height:0!important}
html.tb-mode .top-in>*:not(.music-wrap):not(#clBellWrap):not(#tNotif):not(#dmTopBtn){display:none!important}
html.tb-mode .top-in>*{order:0!important}
html.tb-mode .top-in>.music-wrap:not(.auth-wrap){order:1!important}
html.tb-mode .top-in>#clBellWrap,html.tb-mode .top-in>#tNotif{order:2!important}
html.tb-mode .top-in>.auth-wrap{order:3!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
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
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
