# 27) My notebook (AI weekly summaries) + Use it in a sentence (AI feedback)
R('<span>My class notes</span><span id="cnNavCount" hidden></span></button>\n',
  '<span>My class notes</span><span id="cnNavCount" hidden></span></button>\n'
  '      <button class="navbtn cn-nav" data-go="notebook"><span class="w-ico" aria-hidden="true">📓</span><span>My notebook</span></button>\n')
R('<section class="view" id="v-park" hidden>', '''<section class="view" id="v-notebook" hidden>
  <h1>My <em>notebook</em></h1>
  <p class="lede">Your class notes, grouped by week, with a short summary of each week: the main topics, corrections to remember and new expressions. Tap <b>+ save</b> to add an expression to your words.</p>
  <div class="note-actions" style="margin-bottom:12px"><button class="pill-btn" type="button" id="nbMonthBtn" hidden>✨ Summarize this month</button><button class="swap" type="button" data-go="classnotes">All my class notes →</button></div>
  <p class="muted" id="nbAiMsg" hidden style="font-size:14px">The summaries use AI, which is still loading or isn't available right now. Your notes are below.</p>
  <div id="nbMonth"></div>
  <div id="nbList"></div>
  <p class="muted" style="font-size:13px;margin-top:14px">Summaries are written by AI from your own notes, so double-check anything that looks odd. Noa's notes always win.</p>
</section>

<section class="view" id="v-park" hidden>''')
R('''    </div>
  </div>
  <h2>Irregular verbs</h2>''', '''    </div>
  </div>
  <h2>Use it in a sentence</h2>
  <p>Write your own sentence with one of your words, and get quick feedback. It uses the same words you chose above.</p>
  <div class="card sn-card" id="snCard" style="max-width:560px">
    <div class="quiz-top"><span class="tag">✍️ Your word</span><button class="swap" type="button" id="snNext">Another word →</button></div>
    <div class="sn-word"><b id="snWord"></b><span id="snMean"></span></div>
    <label class="sr" for="snText">Your sentence</label>
    <textarea id="snText" rows="2" placeholder="Write a sentence with this word…" spellcheck="true"></textarea>
    <div class="note-actions"><button class="pill-btn pill-green" type="button" id="snCheck">Check my sentence</button><span class="muted" id="snOff" hidden style="font-size:13px">The checker is loading…</span></div>
    <div class="sn-out" id="snOut" hidden aria-live="polite"></div>
  </div>
  <h2>Irregular verbs</h2>''')
R('/* ---------------- import words', open('parts/notebook.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
.nb-week{margin-bottom:14px}
.nb-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:6px}
.nb-head h3{margin:0;font-family:var(--display);font-size:19px}
.nb-sum h4{margin:12px 0 4px;font:700 11px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--green)}
.nb-sum h4:first-child{margin-top:4px}
.nb-sum ul{margin:0;padding-left:20px}
.nb-sum li{margin:3px 0}
.nb-sum p{margin:6px 0}
.nb-loading{color:var(--muted);padding:6px 0}
.nb-add{font:800 11.5px var(--body);color:var(--green);background:transparent;border:1.5px solid color-mix(in srgb,var(--green) 50%,var(--line));border-radius:999px;padding:1px 8px;margin-left:4px;cursor:pointer;vertical-align:1px}
.nb-add:disabled{opacity:.6;cursor:default}
.nb-stale{font-size:13.5px;color:var(--muted);margin:8px 0 0}
.nb-orig{margin-top:10px;border-top:1px dashed var(--line);padding-top:8px}
.nb-orig summary{cursor:pointer;font-weight:700;font-size:14px;color:var(--muted)}
.nb-note{margin:8px 0}
.nb-day{font:700 11px var(--mono);color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
.nb-txt{white-space:pre-wrap;font-size:14.5px}
.nb-monthcard{border-color:color-mix(in srgb,#F5B800 45%,var(--line))}
.sn-word{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:10px 0}
.sn-word b{font-family:var(--display);font-size:26px}
.sn-word span{color:var(--green);font-weight:800}
.sn-card textarea{width:100%;box-sizing:border-box;font:500 16px var(--body);color:var(--ink);background:var(--surface-2);border:1.5px solid var(--line);border-radius:12px;padding:10px 12px;resize:vertical;margin-bottom:10px}
.sn-out{margin-top:12px;border-top:1px dashed var(--line);padding-top:10px}
.sn-res{display:inline-block;border-radius:999px;padding:3px 12px;font-size:14px}
.sn-great{background:color-mix(in srgb,var(--green) 20%,var(--surface))}
.sn-almost{background:color-mix(in srgb,#F5B800 22%,var(--surface))}
.sn-try{background:color-mix(in srgb,#E5533D 18%,var(--surface))}
.sn-better{margin-top:8px;background:var(--surface-2);border-radius:10px;padding:8px 10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.sn-lbl{font-weight:800;color:var(--muted);font-size:13px}
'''
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-notebook", date:"November 2, 2026", title:"Your notebook & sentence practice ✍️", items:[\n'
  '    ["📓","My notebook","your class notes grouped by week, with a short AI summary: main topics, corrections to remember and new expressions.","notebook"],\n'
  '    ["✍️","Use it in a sentence","in <b>Practice</b>, write a sentence with one of your words and get quick, friendly feedback.","quiz"]\n'
  '  ]},\n')
R('<script src="buddy.js?v=6" defer></script>', '<script src="buddy.js?v=7" defer></script>')
