# 36) Practice home page + Past simple module + My mistakes + weekly goal
_a = s.index('<section class="view" id="v-quiz" hidden>')
_b = s.index('</section>', _a)
_sec = s[_a:_b]
def _cut(start, end=None):
    i = _sec.index(start); j = _sec.index(end, i) if end else len(_sec)
    return _sec[i:j]
_flash = _cut('<div class="card flash-wrap"', '<h2>Use it in a sentence</h2>')
_sent = _cut('<h2>Use it in a sentence</h2>', '<h2>Say it out loud</h2>').replace('<h2>Use it in a sentence</h2>', '').replace(' It uses the same words you chose above.', ' It uses the words from your flashcards.')
_say = _cut('<h2>Say it out loud</h2>', '<h2>Irregular verbs</h2>').replace('<h2>Say it out loud</h2>', '')
_irr = _cut('<h2>Irregular verbs</h2>').replace('<h2>Irregular verbs</h2>', '')
_back = '<button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> All practice</button>'
def _panel(pid, title, lede, body):
    return '<div class="pr-panel" data-pp="' + pid + '" hidden>' + _back + '<h1>' + title + '</h1>' + ('<p class="lede">' + lede + '</p>' if lede else '') + body + '</div>\n'
def _tile(pid, ico, t, sub, extra=''):
    return '<button class="pr-tile" type="button" data-pr="' + pid + '"' + extra + '><span class="pr-ico" aria-hidden="true">' + ico + '</span><b>' + t + '</b><span class="pr-sub">' + sub + '</span></button>'
_new = ('<section class="view" id="v-quiz" hidden>\n'
  '<div id="prHub">\n  <h1><em>Practice</em></h1>\n'
  '  <p class="lede">Pick what you want to practice today. Every round you finish helps your buddy and your weekly goal.</p>\n'
  '  <p class="esb">Elige qué quieres practicar hoy.</p>\n'
  '  <div class="card pr-goal" id="prGoal"></div>\n'
  '  <h2>Grammar</h2>\n  <div class="pr-tiles">'
  + _tile('ps', '⏪', 'Past simple', '0 / 21 ★', ' id="prPsTile"').replace('</span></button>', '</span><span class="pr-bar" aria-hidden="true"><i></i></span></button>')
  + _tile('mis', '📌', 'My mistakes', 'Nothing to review yet', ' id="prMisTile"')
  + '</div>\n  <h2>Your words</h2>\n  <div class="pr-tiles">'
  + _tile('flash', '🃏', 'Flashcards', 'Review the words you saved')
  + _tile('sent', '✍️', 'Use it in a sentence', 'Write a sentence and get feedback')
  + _tile('say', '🎤', 'Say it out loud', 'Practice your pronunciation')
  + _tile('irr', '🔁', 'Irregular verbs', 'Past simple and past participle')
  + '</div>\n</div>\n'
  + _panel('ps', '<em>Past simple</em>', 'Seven stages, from easy to harder. Each round has 10 questions: first you choose the answer, then you write it. Get ' + '7/10 to open the next stage.<span class="esb">Siete etapas, de fácil a más difícil. Saca 7/10 para abrir la siguiente.</span>', '<div id="psArea"></div>')
  + _panel('mis', '<em>My mistakes</em>', 'The grammar questions you missed, saved so you can practice them again.', '<div id="misArea"></div>')
  + _panel('flash', '<em>Flashcards</em>', 'Flip each card and tell it if you knew the word: the ones you miss come back sooner, so you spend your time on the hard ones.', _flash)
  + _panel('sent', 'Use it in a <em>sentence</em>', '', _sent)
  + _panel('say', 'Say it <em>out loud</em>', '', _say)
  + _panel('irr', 'Irregular <em>verbs</em>', '', _irr)
)
s = s[:_a] + _new + s[_b:]
R('/* ---------------- import words', open('parts/psbank.js').read() + '\n' + open('parts/vocbank.js').read() + '\n' + open('parts/practice.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
#prHub h2{margin-top:22px}
.pr-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.pr-tile{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:4px;padding:16px;border-radius:16px;background:var(--surface);border:1px solid var(--line);box-shadow:var(--shadow);transition:transform .15s,border-color .15s}
.pr-tile:hover{transform:translateY(-2px);border-color:var(--bright)}
.pr-tile:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
.pr-tile b{font-size:17px;color:var(--ink)}
.pr-ico{font-size:28px;line-height:1}
.pr-sub{color:var(--muted);font-size:14px}
.pr-bar,.ps-bar{display:block;height:6px;border-radius:9px;background:var(--surface-2);overflow:hidden;margin-top:6px}
.pr-bar i,.ps-bar i{display:block;height:100%;width:0;background:var(--green);border-radius:9px;transition:width .3s}
.pr-rec{color:#E0A100;font-weight:700}
:root[data-theme="light"] .pr-rec,:root[data-theme="sepia"] .pr-rec{color:#A46A00}
.pr-goal{max-width:620px}
.pr-goal-top{display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.pr-goal-top span{color:var(--muted);font-size:14px}
.pr-goal p{margin:8px 0 0}
.pr-dots{display:flex;gap:8px;margin-top:10px}
.pr-dots i{width:22px;height:22px;border-radius:50%;border:2px solid var(--line);background:var(--surface-2)}
.pr-dots i.on{background:var(--green);border-color:var(--green)}
.pr-back{all:unset;cursor:pointer;color:var(--bright);font-weight:700;font-size:15px;margin-bottom:6px;display:inline-block}
.pr-back:focus-visible{outline:2px solid var(--bright);border-radius:6px}
.pr-panel>.card{max-width:620px}
.ps-list{display:flex;flex-direction:column;gap:10px;max-width:680px}
.ps-stage{display:flex;align-items:center;gap:14px;padding:14px 16px}
.ps-stage.locked{opacity:.6}
.ps-stage.rec{border-color:#E0A100;box-shadow:0 0 0 2px rgba(224,161,0,.35)}
.ps-num{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:var(--surface-2);color:var(--ink)}
.ps-info{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.ps-info span{color:var(--muted);font-size:14px}
.ps-side{display:flex;flex-direction:column;align-items:flex-end;gap:4px;text-align:right}
.ps-side small{color:var(--muted)}
.ps-stars{color:#F5B301;letter-spacing:2px;font-size:18px}
.ps-stars s{text-decoration:none;color:var(--line)}
.ps-goal{max-width:680px}
.ps-q{max-width:620px}
.ps-kind{color:var(--muted);font-size:14px;margin:12px 0 4px}
.ps-sent{font-size:20px;line-height:1.5;margin:4px 0 14px}
.ps-blank{display:inline-block;min-width:70px;border-bottom:3px solid var(--bright);text-align:center;color:var(--bright)}
.ps-in{font:inherit;font-size:19px;width:11em;max-width:100%;padding:4px 8px;border-radius:8px;border:2px solid var(--line);background:var(--surface-2);color:var(--ink)}
.ps-in:focus{outline:none;border-color:var(--bright)}
.ps-in.right{border-color:var(--green)}.ps-in.wrong{border-color:var(--red)}
.ps-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ps-opt{all:unset;box-sizing:border-box;cursor:pointer;text-align:center;padding:12px;border-radius:12px;border:2px solid var(--line);background:var(--surface-2);color:var(--ink);font-weight:600;font-size:17px}
.ps-opt:hover:not(:disabled){border-color:var(--bright)}
.ps-opt:focus-visible{outline:3px solid var(--bright)}
.ps-opt:disabled{cursor:default}
.ps-opt.right{border-color:var(--green);background:var(--green-soft)}
.ps-opt.wrong{border-color:var(--red);background:var(--red-soft)}
.ps-fb:empty{display:none}
.ps-fb{margin-top:14px;padding:12px 14px;border-radius:12px}
.ps-fb.ok{background:var(--green-soft)}.ps-fb.no{background:var(--red-soft)}
.ps-fb p{margin:6px 0}
.ps-fb .es{display:block}
.ps-quit{max-width:620px;text-align:right;margin-top:8px}
.ps-res,.ps-mid{text-align:center}
.ps-big{font-size:44px;font-weight:800;font-family:var(--display)}
.ps-res .ps-stars{font-size:30px}
.ps-unlock{font-weight:700;color:var(--green)}
.mis-list{margin:0 0 14px;padding-left:20px}
.mis-list li{margin:4px 0}
.mis-list small{color:var(--muted)}
.ps-story{background:var(--surface-2);border-radius:12px;padding:10px 14px;margin:10px 0 4px;font-size:15px;line-height:1.6}
.ps-story p{margin:4px 0 0}
.ps-story span{color:var(--green);font-weight:700}
.nb-prac{all:unset;cursor:pointer;margin-left:6px;font-size:13px;font-weight:700;color:var(--bright);border:1px solid var(--bright);border-radius:99px;padding:1px 9px}
@media (max-width:560px){.ps-opts{grid-template-columns:1fr}.ps-stage{flex-wrap:wrap}.ps-side{flex-direction:row;align-items:center;width:100%;justify-content:space-between}}
'''
R('<script src="buddy.js?v=12" defer></script>', '<script src="buddy.js?v=13" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-pastsimple", date:"November 5, 2026", title:"A new Practice page + the past simple ⏪", items:[\n'
  '    ["🧩","A new Practice page","<b>Practice</b> now has its own home page: pick flashcards, sentences, pronunciation, irregular verbs or grammar.","quiz"],\n'
  '    ["⏪","Past simple, step by step","six stages from easy to harder: regular verbs, irregular verbs, was / were, negatives, questions and a final mix. Get 7/10 to open the next stage, and finish them all to get a ⏳ magic hourglass for your buddy.","quiz"],\n'
  '    ["📌","My mistakes","the questions you miss are saved so you can review them later. A question leaves the list when you get it right twice in a row.","quiz"],\n'
  '    ["🎯","A weekly goal","finish 3 practice rounds in a week and your buddy gets +5 🍪 and +5 friendship.","quiz"],\n'
  '    ["📓","Practice this","in your weekly summaries, past simple corrections now have a <b>Practice this</b> button.","notebook"]\n'
  '  ]},\n')
