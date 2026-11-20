# step64: profile photo options tidy-up
css64 = '''
/* step64 */
.ap-chg{margin-left:6px;font:700 12.5px var(--body);color:var(--royal,#3b82f6);text-decoration:underline;cursor:pointer}
.ap-prev .ap-bd{display:grid;place-items:center}
'''
_i = s.index('</style>'); s = s[:_i] + css64 + s[_i:]
R('''await saveMe({photo:(e.detail&&e.detail.photo)||"",pk:(e.detail&&e.detail.k)||"buddy"});''','''await saveMe({photo:(e.detail&&e.detail.photo)||"",pk:(e.detail&&e.detail.k)||"buddy",pbg:(e.detail&&e.detail.bg)||""});''')
R('''watched:cur.watched||[],photo:cur.photo||"",pk:cur.pk||""};''','''watched:cur.watched||[],photo:cur.photo||"",pk:cur.pk||"",pbg:cur.pbg||""};''')
R('''if(svg) return `<span class="cs-av cs-avb" aria-hidden="true">${svg}''','''if(svg) return `<span class="cs-av cs-avb" aria-hidden="true"${pp&&/^#[0-9A-Fa-f]{6}$/.test(pp.pbg||"")?` style="background:${pp.pbg}"`:""}>${svg}''')
R('''const sv=window.csBuddy.portrait(); if(sv) return `<span class="cs-av cs-avb" aria-hidden="true">${sv}''','''const sv=window.csBuddy.portrait(), mb=window.csMyPhotoBg?window.csMyPhotoBg():""; if(sv) return `<span class="cs-av cs-avb" aria-hidden="true"${mb?` style="background:${mb}"`:""}>${sv}''')
s = s.replace("/* step64 */", """/* step64 */
.ap-bgs{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 2px}
.ap-bg{all:unset;cursor:pointer;width:24px;height:24px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;font-size:12px;color:var(--muted);box-sizing:border-box}
.ap-bg.on{border-color:var(--royal,#3b82f6);box-shadow:0 0 0 2px color-mix(in srgb,var(--royal,#3b82f6) 35%,transparent)}
.ap-bg:focus-visible{outline:3px solid var(--bright,#4F9DF0)}""",1)
