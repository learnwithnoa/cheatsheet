# step118: two new grammar modules, "Could vs was able to" (cou, B1) and "There is / there are" (th, A1-A2, Spanish help)
R(open('parts/ingbank.js').read(), open('parts/ingbank.js').read() + '\n' + open('parts/coubank.js').read() + '\n' + open('parts/thbank.js').read())
R('''    ing:{id:"ing",name:"Verb + -ing",lname:"verb + -ing",stages:ING_STAGES,test:ING_TEST,toy:"🛹 Skateboard",toyName:"Skateboard",ico:"🏃"},''','''    ing:{id:"ing",name:"Verb + -ing",lname:"verb + -ing",stages:ING_STAGES,test:ING_TEST,toy:"🛹 Skateboard",toyName:"Skateboard",ico:"🏃"},
    th:{id:"th",name:"There is / there are",lname:"there is / there are",stages:TH_STAGES,test:TH_TEST,toy:"🏠 Little house",toyName:"Little house",ico:"🏠"},
    cou:{id:"cou",name:"Could vs was able to",lname:"could vs was able to",stages:COU_STAGES,test:COU_TEST,toy:"🔑 Golden key",toyName:"Golden key",ico:"💪"},''')
# Grammar tiles: There is next to Present simple (beginner), Could after Verb + -ing
_ing = '<button class="pr-tile" type="button" data-pr="ps" id="prIngTile" data-modtile="ing"><span class="pr-ico" aria-hidden="true">🏃</span><b>Verb + -ing</b> <span class="pr-newb">NEW</span><span class="pr-sub">0 / 21 ★</span><span class="pr-bar" aria-hidden="true"><i></i></span></button>'
R(_ing, _ing.replace(' <span class="pr-newb">NEW</span>','') + '<button class="pr-tile" type="button" data-pr="ps" id="prCouTile" data-modtile="cou"><span class="pr-ico" aria-hidden="true">💪</span><b>Could vs was able to</b> <span class="pr-newb">NEW</span><span class="pr-sub">0 / 21 ★</span><span class="pr-bar" aria-hidden="true"><i></i></span></button>')
_t_i = s.index('id="prPrsTile"'); _t_i = s.rindex('<button', 0, _t_i); _t_j = s.index('</button>', _t_i) + 9
_prs = s[_t_i:_t_j]
_th = _prs.replace('id="prPrsTile" data-modtile="prs"', 'id="prThTile" data-modtile="th"').replace('☀️', '🏠').replace('<b>Present simple</b>', '<b>There is / there are</b> <span class="pr-newb">NEW</span>')
assert _th != _prs and 'data-modtile="th"' in _th
s = s[:_t_j] + _th + s[_t_j:]
# names everywhere
R('''const MODNM={prs:"Present simple",ps:"Past simple",pp:"Present perfect",ing:"Verb + -ing",ed:"-ed endings"};''','''const MODNM={prs:"Present simple",th:"There is / there are",ps:"Past simple",pp:"Present perfect",ing:"Verb + -ing",cou:"Could vs was able to",ed:"-ed endings"};''')
assert s.count('ps:"Past simple",pp:"Present perfect",prs:"Present simple",ing:"Verb + -ing",ed:"-ed endings"') >= 2
s = s.replace('ps:"Past simple",pp:"Present perfect",prs:"Present simple",ing:"Verb + -ing",ed:"-ed endings"', 'ps:"Past simple",pp:"Present perfect",prs:"Present simple",th:"There is / there are",ing:"Verb + -ing",cou:"Could vs was able to",ed:"-ed endings"')
# "Already good at the past simple?" reads badly with these names → no "the" for them (md.the = "")
s = s.replace('th:{id:"th",name:"There is / there are",lname:"there is / there are",', 'th:{id:"th",name:"There is / there are",lname:"“there is / there are”",the:"",', 1)
s = s.replace('cou:{id:"cou",name:"Could vs was able to",lname:"could vs was able to",', 'cou:{id:"cou",name:"Could vs was able to",lname:"“could vs was able to”",the:"",', 1)
R('''<b>🎓 You tested out of the \'+esc(md.lname)''', '''<b>🎓 You tested out of \'+(md.the!=null?md.the:"the ")+esc(md.lname)''')
R('''<b>🎓 Already good at the \'+esc(md.lname)''', '''<b>🎓 Already good at \'+(md.the!=null?md.the:"the ")+esc(md.lname)''')
R('''You tested out of the "+md.lname+".''', '''You tested out of "+(md.the!=null?md.the:"the ")+md.lname+".''')
_i = s.index('</style>'); s = s[:_i] + '\n#v-quiz .pr-tile .pr-newb{justify-self:start;align-self:start;width:max-content;display:inline-block;margin-left:6px}\n' + s[_i:]
