# step62: the teacher pages open the same notifications pop-up in place (index.html?np=1 inside a small frame)
R('''/* Noa only: notifications at the top of Home (new sign-ups, packs that need attention) */
(function(){''','''/* Noa only: notifications at the top of Home (new sign-ups, packs that need attention) */
(function(){
  const NP=/[?&]np=1/.test(location.search);   /* shown inside the 🔔 pop-up on the teacher pages */
  if(NP){ document.documentElement.classList.add("np-mode"); const bs=document.createElement("base"); bs.target="_top"; document.head.appendChild(bs); }
  const npSay=m=>{ if(NP&&window.parent!==window) try{ window.parent.postMessage(Object.assign({tn:1},m),location.origin); }catch(e){} };''')
R('''      data={acc,priv,club,reps,areq,mine};''','''      data={acc,priv,club,reps,areq,mine}; if(NP) open=true;''')
R('''    try{ localStorage.setItem("cs-tn-count",String(cnt)); }catch(e){}''','''    try{ localStorage.setItem("cs-tn-count",String(cnt)); }catch(e){} npSay({n:cnt});''')
R('''    else if(k==="hide"){ open=false; undoPrev=null; }''','''    else if(k==="hide"){ if(NP){ npSay({close:1}); return; } open=false; undoPrev=null; }''')
R('''  document.addEventListener("click",e=>{ if(open&&e.target.isConnected&&!e.target.closest("#tNotif")){''','''  document.addEventListener("click",e=>{ if(NP) return; if(open&&e.target.isConnected&&!e.target.closest("#tNotif")){''')
# no music, no pop-ups of their own inside the frame
R('''  (function(){ let t=0; try{ const v=JSON.parse(localStorage.getItem("cs-music-on")||"null");''','''  (function(){ if(/[?&]np=1/.test(location.search)) return; let t=0; try{ const v=JSON.parse(localStorage.getItem("cs-music-on")||"null");''')
css62 = '''
/* step62: notifications-only mode for the teacher pages' pop-up */
html.np-mode,html.np-mode body{background:var(--surface)!important;overflow:hidden!important}
html.np-mode body *{visibility:hidden!important}
html.np-mode #tNotif .tn-box,html.np-mode #tNotif .tn-box *{visibility:visible!important}
html.np-mode #tNotif .tn-box{position:fixed!important;inset:0!important;width:auto!important;max-height:none!important;height:100%!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:auto!important;z-index:2147483647}
html.np-mode dialog,html.np-mode .toast{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + css62 + s[_i:]
