# 28) class notes + weekly summaries as two tabs of one place
R('      <button class="navbtn cn-nav" data-go="notebook"><span class="w-ico" aria-hidden="true">📓</span><span>My notebook</span></button>\n', '')
_tabs = lambda on: ('  <div class="cn-tabs" role="tablist" aria-label="Class notes">'
  '<button type="button" role="tab" data-go="classnotes" aria-selected="' + ('true' if on == 'c' else 'false') + '">✏️ My notes</button>'
  '<button type="button" role="tab" data-go="notebook" aria-selected="' + ('true' if on == 'n' else 'false') + '">📓 Weekly summaries</button></div>\n')
R('  <h1>My class <em>notes</em></h1>\n', '  <h1>My class <em>notes</em></h1>\n' + _tabs('c'))
R('  <h1>My <em>notebook</em></h1>\n', '  <h1>My class <em>notes</em></h1>\n' + _tabs('n'))
R('<p class="lede">Your class notes, grouped by week, with a short summary of each week: the main topics, corrections to remember and new expressions. Tap <b>+ save</b> to add an expression to your words.</p>',
  '<p class="lede">The same notes, grouped by week, with a short summary of each week: the main topics, corrections to remember and new expressions. Tap <b>+ save</b> to add an expression to your words. To write a new note, go to <b>✏️ My notes</b>.</p>')
R('<button class="swap" type="button" data-go="classnotes">All my class notes →</button></div>\n  <p class="muted" id="nbAiMsg"', '</div>\n  <p class="muted" id="nbAiMsg"')
R("Summaries are written by AI from your own notes, so double-check anything that looks odd. Noa's notes always win.", "Summaries are written by AI from your own notes, so double-check anything that looks odd.")
R('document.querySelectorAll(".navbtn").forEach(b=>b.setAttribute("aria-current", b.dataset.go===id?"true":"false"));',
  'document.querySelectorAll(".navbtn").forEach(b=>b.setAttribute("aria-current", (b.dataset.go===id||(id==="notebook"&&b.dataset.go==="classnotes"))?"true":"false"));')
R('["📓","My notebook","your class notes grouped by week, with a short AI summary: main topics, corrections to remember and new expressions.","notebook"]',
  '["📓","Weekly summaries","in <b>My class notes</b>, a new tab groups your notes by week with a short AI summary: main topics, corrections to remember and new expressions.","notebook"]')
TODAY_CSS += '''
.cn-tabs{display:flex;gap:6px;margin:4px 0 14px;border-bottom:1.5px solid var(--line);flex-wrap:wrap}
.cn-tabs button{all:unset;cursor:pointer;font:800 15px var(--body);color:var(--muted);padding:9px 14px;border-radius:12px 12px 0 0;border:1.5px solid transparent;border-bottom:0;margin-bottom:-1.5px}
.cn-tabs button[aria-selected="true"]{color:var(--ink);background:var(--surface);border-color:var(--line)}
.cn-tabs button:hover{color:var(--ink)}
.cn-tabs button:focus-visible{outline:3px solid var(--bright)}
'''
R('<script src="buddy.js?v=7" defer></script>', '<script src="buddy.js?v=8" defer></script>')
R('if(id==="notes"||id==="classnotes"||id==="feedback"||id==="words"||id==="backup"', 'if(id==="notes"||id==="classnotes"||id==="notebook"||id==="feedback"||id==="words"||id==="backup"')
