# step98: narrow menu row: each section (Essentials, Grammar notes…) is one pill that opens/closes it (same folding as the sidebar)
_css = '''
/* step98 */
@media (max-width:900px){
  nav.side .nfg>h4{display:flex!important;align-items:center;margin:0!important;padding:0!important;border:0!important;flex:none}
  nav.side .nfg-h{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 14px;border-radius:999px;border:1.5px dashed color-mix(in srgb,var(--ng,var(--royal)) 60%,var(--line));background:color-mix(in srgb,var(--ng,var(--royal)) 10%,var(--surface));color:var(--ng,var(--ink));font:800 13px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
  nav.side .nfg-h:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
  nav.side .nfg-h .nfg-n{display:inline!important;opacity:.75}
  nav.side .nfg-h .nfg-c{display:inline-block;transition:transform .15s}
  nav.side .nfg.folded .nfg-h .nfg-c{transform:rotate(-90deg)}
  nav.side .nfg:not(.folded) .nfg-h{border-style:solid}
  nav.side .nfg.folded .navbtn:not([aria-current="true"]){display:none!important}
}
'''
R('''    ["📸","Photos in messages",''','''    ["🗂️","A shorter menu on small screens","when the window is narrow, the menu sections (Essentials, Grammar notes…) are pills you can open and close, so there's much less scrolling."],
    ["📸","Photos in messages",''')
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
