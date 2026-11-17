# step170 (Nov 17 2026): monthly members can switch to the yearly plan from "Your membership" (a small, quiet pill, not an ad).
# The yearly subscription starts the day their paid month ends, and the monthly one stops once they approve it (pay/worker.js: upgrade).
R('''    let min=false; try{ min=localStorage.getItem("hibi-mem-min")==="1"; }catch(e){}
    el.innerHTML=''', '''    const upAmt=m.currency==="USD"?210:210000, upPct=m.amount?Math.round((1-upAmt/(12*m.amount))*100):0;
    const upHTML=m.status==="active"&&m.kind==="m"&&payOn()&&upPct>=5?`<div class="hb-up"><button class="hb-up-pill" data-hbup="1" aria-expanded="false">📅 Switch to yearly <span>· ${upPct}% off</span></button></div>`:"";
    let min=false; try{ min=localStorage.getItem("hibi-mem-min")==="1"; }catch(e){}
    el.innerHTML=''')
R('''      ${cta}${links.length?`<div class="hb-mem-links">${links.join("")}</div>`:""}</div>`;''', '''      ${cta}${upHTML}${links.length?`<div class="hb-mem-links">${links.join("")}</div>`:""}</div>`;''')
R('''    if(b.dataset.hbmem==="min"){''', '''    if(b.dataset.hbmem==="upno"){ const x=document.querySelector(".hb-upbox"); if(x) x.remove(); const p=document.querySelector("[data-hbup]"); if(p) p.setAttribute("aria-expanded","false"); return; }
    if(b.dataset.hbmem==="min"){''')
R('''  /* ---- coming back from Flow ---- */''', '''  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-hbup]"); if(!b) return; e.preventDefault();
    const old=document.querySelector(".hb-upbox"); if(old){ old.remove(); b.setAttribute("aria-expanded","false"); return; }
    const m=MEM||{}, usd=m.currency==="USD", yr=usd?"US$210":clp(210000), mo=usd?"US$"+m.amount:clp(m.amount), pct=Math.round((1-(usd?210:210000)/(12*m.amount))*100);
    const when=m.paidThrough?day(m.paidThrough):"the end of your paid month";
    const box=document.createElement("div"); box.className="hb-upbox";
    box.innerHTML=`<p><b>${yr} once a year</b> instead of ${mo} a month: ${pct}% less than paying monthly.</p>
      <p class="hb-pay-note">Your current month is already paid, so nothing changes until <b>${when}</b>. That day the yearly payment starts and the monthly ones stop. You approve it once in ${m.provider==="paypal"?"PayPal":"Mercado Pago"}.</p>
      <div class="hb-up-row"><button class="hb-pay-btn" data-hbjoin="yearly" data-up="1"${m.provider==="paypal"?' data-pp="1"':""}>Switch to yearly</button><button class="hb-up-no" data-hbmem="upno">Not now</button></div>`;
    b.parentNode.after(box); b.setAttribute("aria-expanded","true");
  });

  /* ---- coming back from Flow ---- */''')
R('''{plan:b.dataset.hbjoin,provider:b.dataset.pp?"paypal":"mp",payerEmail:b.dataset.mpemail||""}''', '''{plan:b.dataset.hbjoin,provider:b.dataset.pp?"paypal":"mp",payerEmail:b.dataset.mpemail||"",upgrade:!!b.dataset.up}''')
R('''say(st==="ok"?"Welcome to Noa’s English Club! 💛 Your membership is active.":''', '''say(st==="yearly"?"Done! You’re on the yearly plan now. 💛 It starts when your paid month ends, and the monthly payments stop.":st==="ok"?"Welcome to Noa’s English Club! 💛 Your membership is active.":''')
_css = r'''
/* step170: switch to yearly (quiet) */
#hbMem .hb-up{margin-top:2px}
#hbMem .hb-up-pill{background:none;border:1.5px dashed color-mix(in srgb,#3FB37F 55%,var(--line));border-radius:999px;padding:4px 12px;font:700 12.5px var(--body);color:var(--ink);cursor:pointer}
#hbMem .hb-up-pill span{color:var(--muted);font-weight:600}
#hbMem .hb-up-pill:hover{border-style:solid}
#hbMem .hb-upbox{border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface);display:flex;flex-direction:column;gap:6px}
#hbMem .hb-up-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#hbMem .hb-up-row .hb-pay-btn{flex:none}
#hbMem .hb-up-no{background:none;border:0;padding:0;font:700 13px var(--body);color:var(--muted);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
