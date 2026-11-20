# step89: bell tabs = profile/settings tabs (same size, same window width); no see-through moment when switching tabs; menu pills all the same height
R('.nm-tabs button{all:unset;box-sizing:border-box;flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;cursor:pointer;font:700 14px var(--display,inherit);color:var(--muted);padding:7px 10px;',
  '.nm-tabs button{all:unset;box-sizing:border-box;flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;cursor:pointer;font:700 14.5px var(--display,inherit);color:var(--muted);padding:8px 10px;')
R('html.nm-on.nm-t{--nmW:min(480px,calc(100vw - 32px))}', 'html.nm-on.nm-t{--nmW:min(380px,calc(100vw - 32px))}\nhtml.nm-on #tNotif .tn-box{width:var(--nmW)!important}')
# switching tabs: open the new one first, then close the old one (they overlap for a moment, so you never see the page behind)
R('''    if(t.dataset.nm==="m"){ closeNotif(); setTimeout(()=>{ window.__clubInbox&&window.__clubInbox(); },0); }
    else { if(document.getElementById("clDm")){ if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); } setTimeout(openNotif,0); } },true);''',
  '''    if(t.dataset.nm==="m"){ if(window.__clubInbox) window.__clubInbox(); const t0=Date.now(); (function w(){ if(document.getElementById("clDm")||Date.now()-t0>1500){ requestAnimationFrame(()=>{ window.__nmProg=true; try{ closeNotif(); }finally{ window.__nmProg=false; } }); return; } requestAnimationFrame(w); })(); }
    else { window.__nmProg=true; try{ openNotif(); }finally{ window.__nmProg=false; } requestAnimationFrame(()=>{ if(document.getElementById("clDm")){ if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); } }); } },true);''')
R('''    if(b&&b.btn.contains(e.target)){ e.preventDefault();''','''    if(b&&b.btn.contains(e.target)){ if(window.__nmProg) return; e.preventDefault();''')
_css = '''
html.nm-on .cl-dm-ov .cl-dmh.nm-hasTabs .cl-prof-x,html.nm-on #tNotif .tn-h:has(.nm-tabs) .tn-x{width:36px!important;height:36px!important}
/* step89: in the top menu row, every pill is the same height */
@media (max-width:900px){nav.side .navbtn{box-sizing:border-box;height:40px;min-height:40px;padding-top:0!important;padding-bottom:0!important;align-items:center}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''  document.addEventListener("click",e=>{ if(!on()) return; const o=document.getElementById("clDm"); if(!o) return;''','''  document.addEventListener("click",e=>{ if(!on()||window.__nmProg) return; const o=document.getElementById("clDm"); if(!o) return;''')
R('.nm-x{all:unset;box-sizing:border-box;cursor:pointer;flex:none;width:34px;height:34px;','.nm-x{all:unset;box-sizing:border-box;cursor:pointer;flex:none;width:36px;height:36px;')
_css2 = '''
/* the flashcards pill flows with the other pills (no lonely pill stuck to the right when the row wraps) */
.w-goflash{margin-left:0!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css2 + s[_i:]
