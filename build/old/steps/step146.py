# step146 (Nov 16 2026): club payments go live for everyone (Skool -> Hibi). Footer v1.0 -> v2.0.
# Also: Skool members who aren't in the club on Hibi yet (they see the locked card with "Join now") get THEIR price on the
# monthly buttons, and the first-payment date when Skool's date is known (the pay helper already charges that price).
R('''  const PAY_LIVE=window.__hbPayLive=false;''', '''  const PAY_LIVE=window.__hbPayLive=true;''')
R('''title="What's new in this version">v1.0</button>''', '''title="What's new in this version">v2.0</button>''')
R('''  function draw(){
    const main=document.getElementById("clubMain"); let el=document.getElementById("hbMove");''',
  '''  function personalJoin(){
    if(!P||!P.onList||!P.legacy||P.free||P.annual||window.__csClub||preview()) return;
    const box=document.querySelector("#v-club .cl-lock .hb-pay"); if(!box||box.dataset.mine) return;
    box.dataset.mine="1";
    const mp=box.querySelector('[data-hbjoin="monthly"]:not([data-pp]) small'); if(mp) mp.textContent=clp(P.clp)+" a month · your same price";
    const pp=box.querySelector('.hb-pp-btn[data-hbjoin="monthly"]'); if(pp) pp.textContent="US$"+P.usd+" a month";
    const n=document.createElement("p"); n.className="hb-pay-note hb-mine";
    n.innerHTML=`💛 You keep your Skool price: <b>${clp(P.clp)} a month</b>. `+(P.start?`Nothing is charged today: your first payment is on <b>${day(P.start)}</b>.`:"");
    box.insertBefore(n,box.firstChild);
  }
  function draw(){
    personalJoin();
    const main=document.getElementById("clubMain"); let el=document.getElementById("hbMove");''')
R('''  new MutationObserver(()=>{ if(window.__hbMemInfo&&!document.getElementById("hbMove")&&document.getElementById("clubMain")) draw(); })''',
  '''  new MutationObserver(()=>{ const pj=document.querySelector("#v-club .cl-lock .hb-pay:not([data-mine])"); if(pj&&P) personalJoin(); if(window.__hbMemInfo&&!document.getElementById("hbMove")&&document.getElementById("clubMain")) draw(); })''')
_css = r'''
.hb-pay .hb-mine{margin:0 0 8px;font-size:14px;color:var(--ink)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
