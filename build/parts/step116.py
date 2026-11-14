# step116: top-bar pop-ups: one open at a time; the 🔔 always closes the Notifications/Messages window (also on Messages); Messages × matches the others
R('''aria-label="${L("Close","Cerrar")}">✕</button></div><div class="cl-dmb"></div>''','''aria-label="${L("Close","Cerrar")}">×</button></div><div class="cl-dmb"></div>''')
_js = r'''<script>
/* step116: the buttons in the top bar each open one pop-up; opening one closes the others, and the 🔔 closes its own window from either tab */
(function(){
  const BELL='#tNotif .tn-bell,#clBell', BTN=BELL+',#authBtn,#musicBtn,#tmBtn,#searchToggle,#vaHdr,#dmTopBtn';
  const vis=id=>{ const e=document.getElementById(id); return !!e&&!e.hidden&&e.getClientRects().length>0; };
  let busy=false; const press=el=>{ if(!el) return; busy=true; try{ el.click(); }finally{ busy=false; } };
  function notifOpen(){ return !!document.querySelector("#tNotif .tn-box")||vis("clBellPanel"); }
  function closeNotif(){ const x=document.querySelector('#tNotif [data-tn="hide"]'); if(x) return press(x); if(vis("clBellPanel")) press(document.getElementById("clBell")); }
  function closeDm(){ if(!document.getElementById("clDm")) return false; if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); return true; }
  window.addEventListener("click",e=>{ if(busy) return; const b=e.target.closest&&e.target.closest(BTN); if(!b) return;
    const isBell=b.matches(BELL);
    if(closeDm()&&isBell){ e.preventDefault(); e.stopImmediatePropagation(); return; }   /* 🔔 on the Messages tab = close */
    if(!b.matches("#authBtn")&&vis("authPanel")) press(document.getElementById("authClose"));
    if(!b.matches("#musicBtn")&&vis("musicPanel")) press(document.getElementById("musicClose"));
    if(!b.matches("#tmBtn")&&vis("tmPanel")) press(document.getElementById("tmClose"));
    if(!isBell&&notifOpen()) closeNotif();
  },true);
})();
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
# profile pop-up: less empty space under "Change my name"
_i=s.index('</style>')
s=s[:_i]+'''
#authPanel #authName{margin-bottom:0!important}
#authPanel #authPhoto{margin-top:4px!important}
'''+s[_i:]
