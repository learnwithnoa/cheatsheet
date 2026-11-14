# step88: the 🔔 window looks the same on both tabs and like the other top-right windows (no blue outline, same tab bar width, same header)
_css = '''
/* step88: one look for Notifications and Messages */
html.nm-on #tNotif .tn-box,html.nm-on #clBellPanel,html.nm-on .cl-dm-ov .cl-dm{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:16px!important;box-shadow:0 18px 44px rgba(5,15,30,.35)!important;outline:none!important}
html.nm-on #tNotif .tn-box:focus,html.nm-on #tNotif .tn-box:focus-visible,html.nm-on #tNotif .tn-box:focus-within{outline:none!important;box-shadow:0 18px 44px rgba(5,15,30,.35)!important;border-color:var(--line)!important}
/* header row: tabs fill the row, × on the right; Noa's "Mark all as read"/"Undo" drop to their own line */
.nm-tabs{flex:1 1 0;margin:0!important}
html.nm-on #tNotif .tn-h:has(.nm-tabs){gap:8px;flex-wrap:wrap}
html.nm-on #tNotif .tn-h:has(.nm-tabs)>span[style]{display:none}
html.nm-on #tNotif .tn-h:has(.nm-tabs) .nm-tabs{flex:1 1 calc(100% - 50px);order:0}
html.nm-on #tNotif .tn-h:has(.nm-tabs) .tn-x{order:1;margin:0}
html.nm-on #tNotif .tn-h:has(.nm-tabs) .tn-btn{order:2}
html.nm-on #clBellPanel .clb-h:has(.nm-tabs){display:flex;align-items:center;gap:8px;padding:0;margin:0 0 10px}
.nm-x{all:unset;box-sizing:border-box;cursor:pointer;flex:none;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;font-size:24px;line-height:1;color:var(--muted)}
.nm-x:hover,.nm-x:focus-visible{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}
html.nm-on .cl-dm-ov .cl-dmh.nm-hasTabs{gap:8px;border-bottom:0;padding:16px 18px 6px}
html.nm-on .cl-dm-ov .cl-dmh.nm-hasTabs .cl-prof-x{position:static;flex:none;width:34px;height:34px;font-size:24px!important;color:var(--muted)}
html.nm-on .cl-dm-ov .cl-dmh.nm-hasTabs+.cl-dmb{padding-top:6px}
html.nm-on #clBellPanel{padding:16px 18px!important}
html.nm-on.nm-t .cl-dm-ov .cl-dm,html.nm-on #clBellPanel{width:var(--nmW)!important}
html.nm-on{--nmW:min(380px,calc(100vw - 32px))}
html.nm-on.nm-t{--nmW:min(480px,calc(100vw - 32px))}
html.nm-on .cl-dm-ov .cl-dm{width:var(--nmW)!important}
html.nm-on #tNotif .tn-box{padding-top:16px!important}
@media (max-width:700px){html.nm-on #tNotif .tn-box{top:calc(env(safe-area-inset-top,0px) + 66px)!important}html.nm-on .cl-dm-ov .cl-dm,html.nm-on #clBellPanel{width:auto!important}html.nm-on .cl-dm-ov .cl-dm{width:100%!important}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
# the members' bell gets a × like the other windows, so its tab bar is as wide as on the Messages tab
R('''const ch=document.querySelector("#clBellPanel .clb-h"); if(ch&&!ch.querySelector(".nm-tabs")) ch.innerHTML=tabs("n");''',
  '''const ch=document.querySelector("#clBellPanel .clb-h"); if(ch&&!ch.querySelector(".nm-tabs")) ch.innerHTML=tabs("n")+'<button type="button" class="nm-x" data-nmclose="1" aria-label="Close">×</button>';''')
R('''  document.addEventListener("click",e=>{ const t=e.target.closest("[data-nm]"); if(!t) return;''','''  document.addEventListener("click",e=>{ if(e.target.closest("[data-nmclose]")){ e.preventDefault(); e.stopPropagation(); closeNotif(); const b=bell(); if(b) b.btn.focus(); return; } },true);
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-nm]"); if(!t) return;''')
