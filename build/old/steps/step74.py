# step74: Messages opens as a pop-up under its button (like the notifications), not a side drawer
R('''  async function openInbox(){ const o=dmPanel(), b=o.querySelector(".cl-dmb");''','''  function dmPlace(o){ try{ const bt=document.getElementById("dmTopBtn"), r=bt&&!bt.hidden?bt.getBoundingClientRect():null;
      o.style.setProperty("--dmtop",Math.round(r&&r.bottom>0?r.bottom+8:64)+"px"); o.style.setProperty("--dmright",Math.round(r?Math.max(8,innerWidth-r.right-60):12)+"px"); }catch(e){} }
  async function openInbox(){ const o=dmPanel(), b=o.querySelector(".cl-dmb"); dmPlace(o);''')
R('''    document.body.appendChild(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-dmx]")) closeDm(); }); return o; }''','''    document.body.appendChild(o); dmPlace(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-dmx]")) closeDm(); }); return o; }''')
css74 = '''
/* step74: messages as a pop-up */
.cl-dm-ov{background:rgba(5,10,25,.18);justify-content:flex-end;align-items:flex-start;padding:var(--dmtop,64px) var(--dmright,12px) 12px 12px;box-sizing:border-box}
.cl-dm{width:min(420px,100%);height:auto;max-height:min(640px,calc(100vh - var(--dmtop,64px) - 12px));max-height:min(640px,calc(100dvh - var(--dmtop,64px) - 12px));border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.4);animation:dmPop .16s ease-out}
.cl-dmb{min-height:120px}
@keyframes dmPop{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:none}}
@media (max-width:560px){.cl-dm-ov{padding:var(--dmtop,64px) 8px 8px}.cl-dm{width:100%}}
@media (prefers-reduced-motion:reduce){.cl-dm{animation:none}}
'''
_i = s.index('</style>'); s = s[:_i] + css74 + s[_i:]
s = s.replace('.cl-bdcard>div{flex:1 1 180px;display:grid;gap:2px}', '.cl-bdcard>div{flex:1 1 180px;display:grid;gap:2px;justify-items:start;text-align:left}', 1)
