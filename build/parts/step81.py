# step81: no header jump on load (Noa's empty notifications slot took space), Club in the menu remembered for non-members too
R('''if(f) localStorage.setItem("cs-club-nav","1");''','''if(f) localStorage.setItem("cs-club-nav","1"); else if(signed&&window.__csClubKnown&&!window.__csPreview) localStorage.setItem("cs-club-nav","2");''')
css81 = '''
/* step81 */
.top-in .tn-wrap:empty{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + css81 + s[_i:]
# the buttons on the right of the top bar are added by scripts one after another: show them together, once they're all there
s = s.replace('.top-in .tn-wrap:empty{display:none!important}', '''.top-in .tn-wrap:empty{display:none!important}
html:not(.hdr-ok) .top-in>:not(.brand):not(#searchWrap):not(.spacer){opacity:0}
html.hdr-ok .top-in>*{transition:opacity .15s ease}''', 1)
_k = s.rfind('</body>')
_hdr = '''<script>(function(){var t0=Date.now();(function w(){var ok=document.getElementById("tmWrap")&&document.getElementById("csWrap")&&document.getElementById("csWrap").offsetWidth>0;if(ok||Date.now()-t0>1200){document.documentElement.classList.add("hdr-ok");return;}requestAnimationFrame(w);})();})();</script>
'''
s = (s[:_k] + _hdr + s[_k:]) if _k >= 0 else (s + _hdr)
# Noa: keep the space for his 🔔 while it loads (so nothing jumps when it appears)
s = s.replace('html:not(.hdr-ok) .top-in>', 'html.t-hint .top-in .tn-wrap:empty{display:block!important;width:38px;height:38px}\nhtml:not(.hdr-ok) .top-in>', 1)
s = s.replace('<script>(function(){var t0=Date.now();', '<script>try{var _h=JSON.parse(localStorage.getItem("cs-auth-hint")||"null");if(_h&&_h.t)document.documentElement.classList.add("t-hint");}catch(e){}\n(function(){var t0=Date.now();', 1)
s = s.replace('.auth-name{display:flex;flex-wrap:wrap;gap:4px 12px;margin:-2px 0 10px}', '''.auth-name{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 12px}
.auth-npill{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;border:1.5px solid var(--line);background:transparent;color:var(--ink);font:700 13.5px var(--body);cursor:pointer;text-decoration:none}
.auth-npill:hover{border-color:var(--accent,#5b8def);background:color-mix(in srgb,var(--accent,#5b8def) 10%,transparent)}
.auth-name button.ap-chg{background:none;border:0;padding:0;font:inherit;font-weight:700;color:var(--accent,#5b8def);cursor:pointer;text-decoration:underline;text-underline-offset:3px}''', 1)
