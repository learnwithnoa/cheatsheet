# step160 (Nov 17 2026): "📖 Learn it first" lessons above a grammar module's stages (pilot: present perfect).
# Two tabs (Basics A1–B1 / Advanced B2–C1) and an English/Español switch. Content in parts/lesson_pp.js.
R('''    box.innerHTML=toCard+'<div class="ps-list">'+md.stages.map(st=>{''',
  '''    box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+toCard+'<div class="ps-list">'+md.stages.map(st=>{''')
R('''modules like the <b>present simple</b>, <b>past simple</b> and <b>present perfect</b>, in stages from easy to harder.''',
  '''modules like the <b>present simple</b>, <b>past simple</b> and <b>present perfect</b>, in stages from easy to harder. Some start with a short <b>📖 Learn it first</b> lesson (basics and advanced, in English or Spanish).''')
_js = '<script>\n' + open('parts/lesson_pp.js', encoding='utf-8').read() + '\n</script>\n'
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
/* step160: grammar lessons */
.ps-lesson{padding:0;overflow:hidden}
.ps-lesson>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 16px}
.ps-lesson>summary::-webkit-details-marker{display:none}
.ps-lesson>summary::after{content:"▾";margin-left:auto;color:var(--muted);transition:transform .2s}
.ps-lesson[open]>summary::after{transform:rotate(180deg)}
.pl-ico{width:40px;height:40px;flex:none;display:grid;place-items:center;border-radius:12px;font-size:20px;background:color-mix(in srgb,var(--royal) 14%,transparent)}
.pl-sum{display:flex;flex-direction:column;gap:2px}.pl-sum small{color:var(--muted);font-size:12.5px;font-weight:600}
.pl-in{padding:0 16px 16px;border-top:1px solid var(--line)}
.pl-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin:14px 0 6px}
.pl-tabs,.pl-lang{display:inline-flex;padding:3px;border-radius:999px;background:var(--surface-2);border:1px solid var(--line)}
.pl-tabs button,.pl-lang button{all:unset;cursor:pointer;padding:7px 14px;border-radius:999px;font:700 13.5px var(--body);color:var(--muted)}
.pl-tabs button small{font-weight:600;opacity:.8;margin-left:3px;font-size:11.5px}
.pl-tabs button.on,.pl-lang button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.12)}
.pl-lang button{padding:7px 12px;font-size:12.5px}
.pl-hint{margin:6px 0 4px;color:var(--muted);font-size:13.5px}
.pl-b{padding:12px 0;border-top:1px dashed var(--line)}.pl-b:first-of-type{border-top:0}
.pl-b.key{margin:6px -8px;padding:12px 8px;border:0;border-radius:12px;background:color-mix(in srgb,#f59e0b 12%,transparent)}
.pl-b h4{margin:0 0 6px;font-size:15.5px;display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.pl-st{font:700 11.5px var(--body);color:var(--royal);background:color-mix(in srgb,var(--royal) 12%,transparent);padding:3px 9px;border-radius:999px}
.pl-b p{margin:0 0 8px;line-height:1.5}
.pl-note{font-size:14px;color:var(--muted)}
.pl-tbl{display:grid;gap:6px;margin:8px 0}
.pl-tr{display:grid;grid-template-columns:28px 1fr 1fr;gap:8px;align-items:center;padding:8px 10px;border-radius:10px;background:var(--surface-2);font-size:14px}
.pl-sign{font-weight:900;font-size:16px;text-align:center;color:var(--royal)}
@media (max-width:560px){.pl-tr{grid-template-columns:24px 1fr}.pl-tr>span:last-child{grid-column:2}}
.pl-ex,.pl-mis,.pl-quiz{margin:6px 0 0;padding:0;list-style:none;display:grid;gap:6px}
.pl-ex li{display:flex;gap:10px;align-items:flex-start}
.pl-ex li>span{display:flex;flex-direction:column;gap:1px;padding-top:4px}.pl-ex small{color:var(--muted);font-size:13px}
.pl-say{all:unset;cursor:pointer;flex:none;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;border:1.5px solid var(--line);background:var(--surface);font-size:14px}
.pl-say:hover{border-color:var(--royal)}
.pl-mis li{display:flex;flex-direction:column;gap:2px;padding:8px 10px;border-radius:10px;background:var(--surface-2);font-size:14px}
.pl-x{color:#dc2626}.pl-x s{text-decoration-thickness:1.5px}.pl-ok{color:#16a34a}.pl-mis small{color:var(--muted)}
.pl-quiz{list-style:decimal inside;gap:8px}.pl-quiz li{font-size:14.5px}
.pl-show{all:unset;cursor:pointer;margin-left:8px;font:700 12.5px var(--body);color:var(--royal);padding:3px 10px;border-radius:999px;border:1.5px solid var(--line)}
.pl-ans{display:block;margin-top:4px;color:#16a34a;font-size:13.5px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
