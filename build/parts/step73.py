# step73: new grammar module "Verb + -ing" (before leaving, recommend going)
R(open('parts/presbank.js').read(), open('parts/presbank.js').read() + '\n' + open('parts/ingbank.js').read())
R('''    prs:{id:"prs",name:"Present simple",lname:"present simple",stages:PRS_STAGES,test:PRS_TEST,toy:"☕ Coffee mug",toyName:"Coffee mug",ico:"☀️"},''','''    prs:{id:"prs",name:"Present simple",lname:"present simple",stages:PRS_STAGES,test:PRS_TEST,toy:"☕ Coffee mug",toyName:"Coffee mug",ico:"☀️"},
    ing:{id:"ing",name:"Verb + -ing",lname:"verb + -ing",stages:ING_STAGES,test:ING_TEST,toy:"🛹 Skateboard",toyName:"Skateboard",ico:"🏃"},''')
# Grammar tile, after Present perfect
R('''<span class="pr-ico" aria-hidden="true">🌍</span><b>Present perfect</b><span class="pr-sub">0 / 21 ★</span><span class="pr-bar" aria-hidden="true"><i></i></span></button>''','''<span class="pr-ico" aria-hidden="true">🌍</span><b>Present perfect</b><span class="pr-sub">0 / 21 ★</span><span class="pr-bar" aria-hidden="true"><i></i></span></button><button class="pr-tile" type="button" data-pr="ps" id="prIngTile" data-modtile="ing"><span class="pr-ico" aria-hidden="true">🏃</span><b>Verb + -ing</b> <span class="pr-newb">NEW</span><span class="pr-sub">0 / 21 ★</span><span class="pr-bar" aria-hidden="true"><i></i></span></button>''')
s = s.replace('<b>Present simple</b> <span class="pr-newb">NEW</span>', '<b>Present simple</b>', 1)
# names everywhere
R('''const MODNM={prs:"Present simple",ps:"Past simple",pp:"Present perfect",ed:"-ed endings"};''','''const MODNM={prs:"Present simple",ps:"Past simple",pp:"Present perfect",ing:"Verb + -ing",ed:"-ed endings"};''')
n = s.count('ps:"Past simple",pp:"Present perfect",prs:"Present simple",ed:"-ed endings"')
assert n >= 1, n
s = s.replace('ps:"Past simple",pp:"Present perfect",prs:"Present simple",ed:"-ed endings"', 'ps:"Past simple",pp:"Present perfect",prs:"Present simple",ing:"Verb + -ing",ed:"-ed endings"')
# the -ing or to? page: a way into the practice
R('''  <div class="in-short"><span class="is-tag">In short</span><div><b>-ing</b> after prepositions and verbs like enjoy, avoid, finish · <b>to + verb</b> after want, need, decide, hope.</div></div>''','''  <div class="in-short"><span class="is-tag">In short</span><div><b>-ing</b> after prepositions and verbs like enjoy, avoid, finish · <b>to + verb</b> after want, need, decide, hope.</div></div>
  <div class="ger-prac"><span aria-hidden="true">🏃</span><div><b>Practice it</b><span>7 short stages: before leaving, I recommend going, looking forward to seeing you, -ing or to…</span></div><button type="button" class="pill-btn pill-green" data-gomod="ing">Start practicing →</button></div>''')
R('''/* ---------------- gerund / infinitive ---------------- */''','''/* ---------------- gerund / infinitive ---------------- */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-gomod]"); if(!b) return; const id=b.dataset.gomod;
  try{ sessionStorage.setItem("cs-mod",id); }catch(er){} if(typeof go==="function") go("quiz",true); else location.hash="#quiz";
  setTimeout(()=>{ const g=document.querySelector('#v-quiz [data-pr="gram"]'); if(g) g.click(); setTimeout(()=>{ const t=document.querySelector('#v-quiz [data-modtile="'+id+'"]'); if(t) t.click(); },60); },180); });''')
css73 = '''
/* step73 */
.ger-prac{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 16px;padding:12px 14px;border-radius:14px;border:1.5px solid var(--green);background:color-mix(in srgb,var(--green) 8%,var(--surface))}
.ger-prac>span{font-size:26px;line-height:1}.ger-prac>div{flex:1 1 220px;display:grid;gap:2px}.ger-prac>div span{font-size:14px;color:var(--muted)}
'''
_i = s.index('</style>'); s = s[:_i] + css73 + s[_i:]
R('<script src="buddy.js?v=49" defer></script>','<script src="buddy.js?v=50" defer></script>')
R('''    ["🎂","Your name, job and birthday",''','''    ["🏃","New: Verb + -ing","<b>before leaving</b>, <b>I recommend going</b>, <b>looking forward to seeing you</b>, and when it's <b>to</b> instead. 7 stages in <b>Practice → Grammar</b>. Finish it for a 🛹 skateboard for your buddy.","quiz"],
    ["🎂","Your name, job and birthday",''')
