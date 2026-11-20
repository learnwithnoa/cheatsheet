# step126 (Nov 15 2026): the top windows (music, timer, bell/messages, profile/settings, + Word) all open in the same spot,
# same width, and only one is open at a time (opening one closes the others).
_css = '''
/* step126: every top window in the same place (desktop/tablet) */
@media (min-width:601px){
  html body #musicPanel, html body #tmPanel, html body #clBellPanel, html body #authPanel, html body #csPanel, html body form.qa.qa.qa, html body .cl-dm-ov .cl-dm{
    position:fixed!important; top:calc(env(safe-area-inset-top,0px) + var(--hdr-h,61px) + var(--va-h,0px) - 1px)!important;
    right:calc(16px + env(safe-area-inset-right,0px))!important; left:auto!important; bottom:auto!important; width:380px!important; max-width:calc(100vw - 32px)!important; margin:0!important}
}
@media (max-width:600px){ html body #tmPanel{left:max(16px,env(safe-area-inset-left,0px))!important;right:max(16px,env(safe-area-inset-right,0px))!important;width:auto!important} }
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step126: only one top window open at a time */
(function(){
  const P=[["#musicPanel","#musicBtn"],["#tmPanel","#tmBtn"],["#clBellPanel","#clBell,#dmTopBtn"],[".cl-dm-ov","#clBell,#dmTopBtn"],["#authPanel","#authBtn"],["#csPanel","#authBtn"],["#qa","#hdrWord,#fab"]];
  const vis=e=>!!e&&e.getClientRects().length>0;
  const closeIt=sel=>{ const e=document.querySelector(sel); if(!vis(e)) return;
    const x=[...e.querySelectorAll("button")].find(b=>vis(b)&&(/close|cerrar/i.test(b.getAttribute("aria-label")||"")||/^[×✕]$/.test(b.textContent.trim())));
    if(x) x.click(); else e.hidden=true; };
  document.addEventListener("click",ev=>{ const b=ev.target.closest&&ev.target.closest("#musicBtn,#tmBtn,#clBell,#dmTopBtn,#authBtn,#hdrWord,#fab"); if(!b) return;
    setTimeout(()=>{ P.forEach(([sel,own])=>{ if(!b.matches(own)) closeIt(sel); }); },0); },true);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
R('''["authPanel:authClose","musicPanel:musicClose","tmPanel:tmClose"].forEach(p=>{''',
  '''["authPanel:authClose","csPanel:csClose","musicPanel:musicClose","tmPanel:tmClose"].forEach(p=>{''')
