# 50) Practice: Present simple module (Grammar), new Pronunciation section with the -ed endings module, 🔊 on questions, toys for the buddy
R(open('parts/ppbank.js').read(), open('parts/ppbank.js').read() + '\n' + open('parts/edbank.js').read() + '\n' + open('parts/presbank.js').read())
R('''    pp:{id:"pp",name:"Present perfect",lname:"present perfect",stages:PP_STAGES,test:PP_TEST,toy:"🌍 Little globe",toyName:"Little globe",ico:"🌍"}
  };''', '''    pp:{id:"pp",name:"Present perfect",lname:"present perfect",stages:PP_STAGES,test:PP_TEST,toy:"🌍 Little globe",toyName:"Little globe",ico:"🌍"},
    prs:{id:"prs",name:"Present simple",lname:"present simple",stages:PRS_STAGES,test:PRS_TEST,toy:"☕ Coffee mug",toyName:"Coffee mug",ico:"☀️"},
    ed:{id:"ed",name:"-ed endings",lname:"-ed endings",stages:ED_STAGES,test:ED_TEST,toy:"🔔 Little bell",toyName:"Little bell",ico:"🔊"}
  };''')
# Grammar: Present simple first (it's the most basic), then past simple, present perfect
_t_i = s.index('id="prPsTile"'); _t_i = s.rindex('<button', 0, _t_i); _t_j = s.index('</button>', _t_i) + 9
_base = s[_t_i:_t_j]
_prs_tile = _base.replace('id="prPsTile" data-modtile="ps"', 'id="prPrsTile" data-modtile="prs"').replace('⏪', '☀️').replace('<b>Past simple</b>', '<b>Present simple</b> <span class="pr-newb">NEW</span>')
s = s[:_t_i] + _prs_tile + s[_t_i:]
_ed_tile = _base.replace('id="prPsTile" data-modtile="ps"', 'id="prEdTile" data-modtile="ed"').replace('⏪', '🔊').replace('<b>Past simple</b>', '<b>-ed endings</b> <span class="pr-newb">NEW</span>')
# Pronunciation: its own section on the Practice home page
_g = s.index('<div class="pr-panel" data-pp="gram" hidden>')
s = s[:_g] + '<div class="pr-panel" data-pp="pron" hidden><button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button><h1><em>Pronunciation</em></h1><p class="lede">Hear it, choose it, then say it out loud. More sounds are on the way!</p><p class="esb">Pronunciación: escucha, elige y dilo en voz alta.</p><div class="pr-tiles">' + _ed_tile + '</div></div>\n' + s[_g:]
R('''<button class="pr-bigbtn pb-vocab" type="button" data-pr="vocab">''', '''<button class="pr-bigbtn pb-pron" type="button" data-pr="pron"><span class="pr-ico" aria-hidden="true">🗣️</span><b>Pronunciation</b><span>Hear the difference and sound more natural, starting with -ed endings</span><span class="esb">Pronunciación</span></button><button class="pr-bigbtn pb-vocab" type="button" data-pr="vocab">''')
R('''const PARENT={ps:"gram",mis:"gram",irr:"gram",flash:"words",sent:"words",say:"words",vset:"vocab"};''', '''const PARENT={ps:"gram",mis:"gram",irr:"gram",flash:"words",sent:"words",say:"words",vset:"vocab"};
  const par=c=>c==="ps"&&M==="ed"?"pron":PARENT[c];''')
R('''const PNAME={gram:"Grammar",words:"My words",vocab:"Word packs"};''', '''const PNAME={gram:"Grammar",words:"My words",vocab:"Word packs",pron:"Pronunciation"};''')
R('''PNAME[PARENT[cur]]||"All practice")''', '''PNAME[par(cur)]||"All practice")''')
R('''show(PARENT[cur]||null)''', '''show(par(cur)||null)''')
# a listen button under the question (the -ed module, where hearing it is the point)
R('''      '<p class="ps-sent">'+sentence(q,blank)+'</p>'+''', '''      '<p class="ps-sent">'+sentence(q,blank)+'</p>'+(q.say&&window.csSpeak?'<p class="ps-say"><button class="swap" type="button" data-vsay="'+esc(q.say)+'" aria-label="Listen">🔊 Listen</button></p>':"")+''')
R('''      '<p class="ps-kind">'+(it.mc?"Choose the right answer":"Write the missing words")''', '''      '<p class="ps-kind">'+(it.mc?"Choose the right answer":M==="ed"&&R.test?"Write t, d or id":"Write the missing words")''')
css_ed = '''
.pr-newb{font:800 10.5px var(--body);letter-spacing:.04em;background:var(--green);color:#fff;border-radius:999px;padding:2px 7px;vertical-align:middle}
.ps-say{margin:-4px 0 10px}
#v-quiz .pb-pron{border-top:5px solid #E0699A}#v-quiz .pb-pron:hover{border-color:#E0699A}
#v-quiz .pr-big{grid-template-columns:repeat(2,minmax(0,1fr));max-width:880px}
@media (max-width:600px){#v-quiz .pr-big{grid-template-columns:1fr}}
#v-quiz .pr-big .pr-bigbtn{min-height:150px}
'''
if '.ps-say{' not in s:
    _i = s.index('</style>'); s = s[:_i] + css_ed + s[_i:]
R('<script src="buddy.js?v=40" defer></script>', '<script src="buddy.js?v=42" defer></script>')
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-prs", date:"November 10, 2026", title:"Present simple + pronunciation ☀️", items:[
    ["☀️","New: Present simple","I work, she works, I don't, does he…? 7 short stages with a little Spanish help on every question, in Practice → Grammar.","quiz"],
    ["🗣️","New: Pronunciation","its own section in Practice, starting with -ed endings: worked, played or wanted? A 🔊 button on every word.","quiz"],
    ["🎁","New prizes for your buddy","☕ a coffee mug for Present simple, 🔔 a little bell for -ed endings, and new duel prizes your buddy can wear (headband, medal, shades, laurel)."]
  ]},''')
