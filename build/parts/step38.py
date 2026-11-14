# 38) Practice up top, Essentials, 🎯 header shortcut, Practice home = Grammar / Your words
R('''    <div class="navgroup ng-practice"><h4>Practice</h4>
      <button class="navbtn" data-go="quiz">Practice</button>
    </div>
''', '')
R('''<span>Home</span></button>''', '''<span>Home</span></button>
      <button class="navbtn cn-nav" data-go="quiz"><svg class="home-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg><span>Practice</span></button>''')
R('<div class="navgroup ng-start"><h4>Start here</h4>', '<div class="navgroup ng-start"><h4>Essentials</h4>')
# Practice home: two big buttons
_i = s.index('  <h2>Grammar</h2>\n  <div class="pr-tiles">')
_j = s.index('</div>\n</div>\n', _i)
_old = s[_i:_j]
_tiles = _old.split('<div class="pr-tiles">')
_gram = _tiles[1].split('</div>')[0]
_words = _tiles[2]
_irr = '<button class="pr-tile" type="button" data-pr="irr"><span class="pr-ico" aria-hidden="true">🔁</span><b>Irregular verbs</b><span class="pr-sub">Past simple and past participle</span></button>'
assert _irr in _words
_words = _words.replace(_irr, '')
_gram = _gram + _irr
s = s[:_i] + ('  <div class="pr-big">'
  '<button class="pr-bigbtn pb-gram" type="button" data-pr="gram"><span class="pr-ico" aria-hidden="true">🧩</span><b>Grammar</b><span>Step-by-step modules with stars and rewards</span><span class="esb">Gramática</span></button>'
  '<button class="pr-bigbtn pb-words" type="button" data-pr="words"><span class="pr-ico" aria-hidden="true">📚</span><b>Your words</b><span>Flashcards, sentences and pronunciation</span><span class="esb">Tus palabras</span></button>'
  '</div>') + s[_j+len('</div>\n'):]
_back = '<button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button>'
R('<div class="pr-panel" data-pp="ps" hidden>', '<div class="pr-panel" data-pp="gram" hidden>' + _back + '<h1><em>Grammar</em></h1><p class="lede">Pick a topic. More grammar modules are on the way!</p><div class="pr-tiles">' + _gram + '</div></div>\n'
  '<div class="pr-panel" data-pp="words" hidden>' + _back + '<h1>Your <em>words</em></h1><p class="lede">Practice the words you saved in <b>My words</b>.</p><div class="pr-tiles">' + _words + '</div></div>\n'
  '<div class="pr-panel" data-pp="ps" hidden>')
s = s.replace('<button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> All practice</button>', _back)
TODAY_CSS += '''
#themeBtn{display:none!important}
.pr-short b{font-size:12px;padding:1px 7px;border-radius:99px;background:var(--surface-2);margin-left:2px}
.pr-short.done b{background:var(--green);color:#fff}
.pr-big{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:18px;max-width:820px}
.pr-bigbtn{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:6px;padding:26px 22px;border-radius:20px;border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow);transition:transform .15s,border-color .15s;min-height:170px}
.pr-bigbtn:hover{transform:translateY(-3px)}
.pr-bigbtn:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
.pr-bigbtn .pr-ico{font-size:40px}
.pr-bigbtn b{font-size:24px;font-family:var(--display);color:var(--ink)}
.pr-bigbtn>span:not(.pr-ico){color:var(--muted)}
.pb-gram{border-top:5px solid #4F9DF0}.pb-gram:hover{border-color:#4F9DF0}
.pb-words{border-top:5px solid #F2994A}.pb-words:hover{border-color:#F2994A}
.pr-soon{color:var(--muted)}
'''
R('<script src="buddy.js?v=14" defer></script>', '<script src="buddy.js?v=16" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-practicefirst", date:"November 6, 2026", title:"Practice moves up 🎯", items:[\n'
  '    ["🎯","Practice is easier to find","it is now right under <b>Home</b> in the menu. You can change the theme in <b>Settings</b>.","quiz"],\n'
  '    ["🐾","Move your buddy","drag your buddy to another spot on the screen. It stays where you leave it."],\n'
  '    ["💛","More about your buddy","tap your buddy to see its level, mood and treats at a glance."]\n'
  '  ]},\n')
