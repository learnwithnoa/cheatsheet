# step134 (Nov 15 2026): top windows open under their OWN icon (Noa's call), all at the same height and width:
# music under 🎧, timer under ⏱, + Word under its button, Notifications + Messages under the bell, Profile + Settings under the photo.
_css = '''
/* step134: each top window under its own icon */
@media (min-width:601px){
  html body #musicPanel{right:var(--ar-music,16px)!important}
  html body #tmPanel{right:var(--ar-tm,16px)!important}
  html body form.qa.qa.qa{right:var(--ar-word,16px)!important}
  html body #clBellPanel, html body .cl-dm-ov .cl-dm{right:var(--ar-bell,16px)!important}
  html body #tNotif .tn-box, html.nm-on body #tNotif .tn-box, html.nm-on.nm-t body #tNotif .tn-box{right:var(--ar-bell,16px)!important}
  html body #authPanel, html body #csPanel{right:var(--ar-auth,16px)!important}
}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step134: line each top window up under its own button (right edges match), never closer than 16px to either side */
(function(){
  const A={music:"#musicBtn",tm:"#tmBtn",word:"#hdrWord",bell:"#clBell, #tNotif .tn-bell",auth:"#authBtn"};
  const vis=e=>!!e&&e.getClientRects().length>0;
  function place(){ const W=window.innerWidth, root=document.documentElement.style;
    for(const k in A){ const b=[...document.querySelectorAll(A[k])].find(vis); if(!b){ root.removeProperty("--ar-"+k); continue; }
      let r=Math.round(W-b.getBoundingClientRect().right); r=Math.max(16,Math.min(r,W-380-16)); root.setProperty("--ar-"+k,r+"px"); } }
  addEventListener("resize",place); addEventListener("pointerdown",place,true); addEventListener("keydown",place,true);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",place); else place();
  setTimeout(place,1500); setTimeout(place,4000);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
