# step184 (Nov 18 2026): new grammar module "Talking about the future" (fut, B1 to B2): will, going to,
# present continuous, present simple for timetables. 6 stages + ⭐ Advanced, lesson, test out. Built from Noa's 🧱 Ideas to build.
R(open('parts/iqbank.js').read(), open('parts/iqbank.js').read() + '\n' + open('parts/futbank.js').read())
R('''    iq:{id:"iq",name:"Indirect questions",lname:"indirect questions",the:"",stages:IQ_STAGES,test:IQ_TEST,toy:"🧭 Compass",toyName:"Compass",ico:"❓"},''',
  '''    iq:{id:"iq",name:"Indirect questions",lname:"indirect questions",the:"",stages:IQ_STAGES,test:IQ_TEST,toy:"🧭 Compass",toyName:"Compass",ico:"❓"},
    fut:{id:"fut",name:"Talking about the future",lname:"future",the:"the ",stages:FUT_STAGES,test:FUT_TEST,toy:"🔮 Crystal ball",toyName:"Crystal ball",ico:"🔮"},''')
# tile: before Indirect questions (it's B1, iq is B1+), with a NEW badge
_i = s.index('id="prIqTile"'); _i = s.rindex('<button', 0, _i); _j = s.index('</button>', _i) + 9
_iq = s[_i:_j]
_fut = _iq.replace('id="prIqTile" data-modtile="iq"', 'id="prFutTile" data-modtile="fut"').replace('❓', '🔮').replace('<b>Indirect questions</b>', '<b>Talking about the future</b>')
assert _fut != _iq and 'data-modtile="fut"' in _fut and 'pr-newb' in _fut and '0 / 18 ★' in _fut
s = s[:_i] + _fut + _iq + s[_j:]
R('''const ORDER=["prs","th","ps","cou","pp","ing","iq"];''', '''const ORDER=["prs","th","ps","cou","pp","ing","fut","iq"];''')
assert s.count('iq:"Indirect questions",ed:"-ed endings"') >= 3
s = s.replace('iq:"Indirect questions",ed:"-ed endings"', 'iq:"Indirect questions",fut:"Talking about the future",ed:"-ed endings"')
R('''<b>could vs was able to</b> and <b>indirect questions</b>, plus''', '''<b>could vs was able to</b>, <b>indirect questions</b> and <b>talking about the future</b>, plus''')
# word pack "Confusing word pairs" (parts/vocbank.js): mention it in the tour
R('''useful word sets by Noa (phrasal verbs, work, travel, everyday expressions), with''', '''useful word sets by Noa (phrasal verbs, work, travel, everyday expressions, confusing word pairs like <i>fun / funny</i>), with''')
