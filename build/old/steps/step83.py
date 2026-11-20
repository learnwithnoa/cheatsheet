# step83: profile + settings in one window with two tabs; the gear button goes away when signed in
_css = '''
/* step83: one window, two tabs (👤 Profile · ⚙ Settings) */
html.pt-on.cs-signed .top-in #csBtn{display:none}
html.pt-on .auth-wrap .auth-panel{width:min(380px,calc(100vw - 32px))}
html.pt-on .auth-wrap > .cs-panel{z-index:36}
.pt-tabs{display:none}
html.pt-on.cs-signed .pt-tabs{flex:1;display:flex;gap:4px;min-width:0;background:var(--surface-2,color-mix(in srgb,var(--ink) 5%,transparent));border:1px solid var(--line);border-radius:999px;padding:4px;margin-right:10px}
.pt-tabs button{all:unset;box-sizing:border-box;flex:1;text-align:center;cursor:pointer;font:700 14.5px var(--display,inherit);color:var(--muted);padding:8px 10px;border-radius:999px;white-space:nowrap;transition:background .15s,color .15s}
.pt-tabs button:hover{color:var(--ink)}
.pt-tabs button:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
.pt-tabs button[aria-selected="true"]{background:var(--gloss,var(--royal));color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 8px rgba(5,15,30,.25);text-shadow:0 1px 2px rgba(5,15,30,.35)}
html.pt-on.cs-signed #authPanel .qa-top > h3,html.pt-on.cs-signed #csPanel .cs-head > h3{display:none}
html.pt-on.cs-signed .cs-panel .cs-head{margin-bottom:4px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('<li><span class="wl-ico" aria-hidden="true">⚙</span><div><b>Settings</b> (top right): themes,',
  '<li><span class="wl-ico" aria-hidden="true">⚙</span><div><b>Settings</b> (tap your photo, top right, then <b>⚙ Settings</b>): themes,')
R('''const CHANGELOG=[
''', '''const CHANGELOG=[
  {id:"2026-1112", date:"November 12, 2026", title:"Profile and settings together", items:[
    ["⚙️","One button for you","tap <b>your photo</b> at the top right: <b>👤 Profile</b> has your name, photo and club profile, and <b>⚙ Settings</b> has themes, text size, fonts, focus and calm mode, your buddy and the rest. Hibi remembers which tab you used last."]
  ]},
''')
