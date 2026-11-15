# step133 (Nov 15 2026): Noa's own bell window (teacher notifications) opens in the same spot and width as Messages and Profile
_css = '''
/* step133: teacher notifications in the same place as the other top windows */
@media (min-width:601px){
  html body #tNotif .tn-box, html.nm-on body #tNotif .tn-box, html.nm-on.nm-t body #tNotif .tn-box{position:fixed!important;top:calc(env(safe-area-inset-top,0px) + var(--hdr-h,61px) + var(--va-h,0px) - 1px)!important;
    right:calc(16px + env(safe-area-inset-right,0px))!important;left:auto!important;width:380px!important;max-width:calc(100vw - 32px)!important;margin:0!important}
}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
