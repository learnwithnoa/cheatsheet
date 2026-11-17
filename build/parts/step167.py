# step167 (Nov 17 2026): new grammar module "Indirect questions" (iq, B1+ to B2): 6 stages + ⭐ Advanced, lesson, test out
R(open('parts/coubank.js').read(), open('parts/coubank.js').read() + '\n' + open('parts/iqbank.js').read())
R('''    cou:{id:"cou",name:"Could vs was able to",lname:"“could vs was able to”",the:"",stages:COU_STAGES,test:COU_TEST,toy:"🔑 Golden key",toyName:"Golden key",ico:"💪"},''',
  '''    cou:{id:"cou",name:"Could vs was able to",lname:"“could vs was able to”",the:"",stages:COU_STAGES,test:COU_TEST,toy:"🔑 Golden key",toyName:"Golden key",ico:"💪"},
    iq:{id:"iq",name:"Indirect questions",lname:"indirect questions",the:"",stages:IQ_STAGES,test:IQ_TEST,toy:"🧭 Compass",toyName:"Compass",ico:"❓"},''')
# tile: after Could vs was able to; the NEW badge moves to it
_i = s.index('id="prCouTile"'); _i = s.rindex('<button', 0, _i); _j = s.index('</button>', _i) + 9
_cou = s[_i:_j]
_iq = _cou.replace('id="prCouTile" data-modtile="cou"', 'id="prIqTile" data-modtile="iq"').replace('💪', '❓').replace('<b>Could vs was able to</b>', '<b>Indirect questions</b>').replace('0 / 21 ★', '0 / 18 ★')
assert _iq != _cou and 'data-modtile="iq"' in _iq and 'pr-newb' in _iq
s = s[:_i] + _cou.replace(' <span class="pr-newb">NEW</span>', '') + _iq + s[_j:]
R('''const ORDER=["prs","th","ps","cou","pp","ing"];''', '''const ORDER=["prs","th","ps","cou","pp","ing","iq"];''')
# names everywhere
assert s.count('cou:"Could vs was able to",ed:"-ed endings"') >= 3
s = s.replace('cou:"Could vs was able to",ed:"-ed endings"', 'cou:"Could vs was able to",iq:"Indirect questions",ed:"-ed endings"')
R('''modules like <b>there is / there are</b> and <b>could vs was able to</b>, plus''', '''modules like <b>there is / there are</b>, <b>could vs was able to</b> and <b>indirect questions</b>, plus''')
# modules can have any number of stages now: the intro doesn't say "Seven"
R('''<p class="lede">Seven stages, from easy to harder.''', '''<p class="lede">Short stages, from easy to harder.''')
R('''<span class="esb">Siete etapas, de fácil a más difícil.''', '''<span class="esb">Etapas cortas, de fácil a más difícil.''')
