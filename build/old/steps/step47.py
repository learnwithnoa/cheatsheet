# 47) look up any word + cursor note in What's new
R('/* ---------------- import words', open('parts/lookup.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
.lk-box{position:fixed;z-index:70;padding:14px 16px 12px;border-radius:16px;box-shadow:0 12px 30px rgba(0,0,0,.35);max-width:calc(100vw - 24px)}
.lk-x{all:unset;cursor:pointer;position:absolute;top:6px;right:10px;font-size:22px;color:var(--muted)}
.lk-w{font-size:20px;font-weight:800;padding-right:24px}
.lk-w .pos{font-size:12px;font-weight:700;color:var(--muted);margin-left:4px}
.lk-p{margin:6px 0}
.lk-es{margin:6px 0;color:var(--green);font-weight:700}
.lk-ex{margin:6px 0;color:var(--muted);font-style:italic}
.lk-acts{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}
.lk-acts a{text-decoration:none}
.lk-have{color:var(--green);font-weight:700;font-size:14px}
.lk-chip{all:unset;position:fixed;z-index:70;cursor:pointer;padding:6px 12px;border-radius:99px;background:var(--bright);color:#fff;font-size:14px;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,.3);white-space:nowrap}
.lk-chip:focus-visible{outline:3px solid #fff}
'''
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-lookup", date:"November 6, 2026", title:"Look up any word 🔎", items:[\n'
  '    ["🔎","Look up any word","<b>double-click</b> a word, or select a few words for phrases like <i>figure out</i> (on your phone, <b>press and hold</b>), anywhere on the site to see what it means, in English and Spanish, and save it to My words."],\n'
  '    ["🐾","Fun mouse cursors","on a computer, choose a paw, pencil, star or a big cursor in <b>Settings</b>."]\n'
  '  ]},\n')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-contrast", date:"November 7, 2026", title:"High contrast", items:[\n'
  '    ["🔆","High contrast","stronger text and borders, with any theme. Turn it on in <b>Settings</b>. If your phone or computer already uses <i>Increase contrast</i>, it turns on by itself."]\n'
  '  ]},\n')
