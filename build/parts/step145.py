# step145 (Nov 16 2026): "Move your membership to Hibi" card for club members who still pay on Skool.
# They already have club access, so they never saw the Join buttons (those are on the locked card for non-members).
# The card shows THEIR price (from the pay helper: /api/my-price, which reads Noa's club list) and, when Skool's next payment
# date is known, says the first Hibi payment waits until that day (the pay helper sets the subscription's start date).
# Annual members see that their year is already paid. Free members and people not on the club list see nothing.
# Shown when payments are on (PAY_LIVE or ?pay=1). Can be minimized like "Your membership".
R('''  const PAY_LIVE=false;''', '''  const PAY_LIVE=window.__hbPayLive=false;''')
R('''    memReady=true; drawMem(); decorateTrial();''', '''    memReady=true; drawMem(); decorateTrial(); window.__hbMemInfo=MEM||{}; document.dispatchEvent(new Event("hb-mem"));''')
R('''      if(!r.ok){ memReady=r.status===404; if(memReady) decorateTrial(); return; }''',
  '''      if(!r.ok){ memReady=r.status===404; if(memReady){ decorateTrial(); window.__hbMemInfo={}; document.dispatchEvent(new Event("hb-mem")); } return; }''')
_css = r'''
#hbMove{margin:0 0 14px}
#hbMove .hb-mem{border:1.5px solid color-mix(in srgb,#3FB37F 35%,var(--line));background:color-mix(in srgb,#3FB37F 8%,var(--surface));border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:6px}
#hbMove .hb-mem.warn{border-color:color-mix(in srgb,#E26A3D 50%,var(--line));background:color-mix(in srgb,#E26A3D 9%,var(--surface))}
#hbMove .hb-mem-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#hbMove .hb-mem-h b{font:800 15px var(--body)}
#hbMove .hb-tag{font:700 11.5px var(--mono);letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,#3FB37F 22%,var(--surface))}
#hbMove .warn .hb-tag{background:color-mix(in srgb,#E26A3D 25%,var(--surface))}
#hbMove p{margin:0;font-size:14px}
#hbMove .hb-mem-links{display:flex;gap:14px;flex-wrap:wrap;margin-top:2px}
#hbMove .hb-mem-links button{background:none;border:0;padding:0;font:700 13.5px var(--body);color:var(--accent,#2E6FD8);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
#hbMove .hb-mem-links button.danger{color:var(--muted)}
#hbMove .hb-mem-min{margin-left:auto;background:none;border:1.5px solid var(--line);border-radius:999px;padding:4px 11px;font:700 12.5px var(--body);color:var(--muted);cursor:pointer}
#hbMove .hb-mem-min:hover{color:var(--ink)}
#hbMove .hb-mem.min{padding:10px 16px}
#hbMove .hb-mem.min>:not(.hb-mem-h){display:none}
#hbMove .hb-mem{border-color:color-mix(in srgb,#F0A63A 50%,var(--line));background:color-mix(in srgb,#F0A63A 9%,var(--surface))}
#hbMove .hb-tag{background:color-mix(in srgb,#F0A63A 28%,var(--surface))}
#hbMove .hb-mem-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
#hbMove .hb-mem-cta .hb-pay-btn{padding:10px 18px}
#hbMove .hb-mv-steps{margin:2px 0 0;padding-left:20px;font-size:14px;display:flex;flex-direction:column;gap:3px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step145: club members still paying on Skool move their membership to Hibi, at their same price */
(function(){
  const API="https://hibi-pay.learnwithnoa.workers.dev";
  const F=()=>window.__csFire||{};
  const payOn=()=>{ try{ return window.__hbPayLive||localStorage.getItem("hibi-pay")==="1"; }catch(e){ return !!window.__hbPayLive; } };
  const preview=()=>!!(window.__csPreview||(F().readOnly&&F().readOnly()));
  const clp=n=>"$"+Number(n||0).toLocaleString("es-CL");
  const day=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}); }catch(e){ return d; } };
  let P=null, asked=false;
  async function load(){
    asked=true; const tok=F().token&&await F().token(); if(!tok) { asked=false; return; }
    try{ const r=await fetch(API+"/api/my-price",{method:"POST",headers:{authorization:"Bearer "+tok,"content-type":"application/json"},body:"{}"}); if(r.ok) P=await r.json(); }catch(e){}
    draw();
  }
  function draw(){
    const main=document.getElementById("clubMain"); let el=document.getElementById("hbMove");
    const m=window.__hbMemInfo, busy=m&&["active","grace","canceling","trial"].includes(m.status);
    const show=main&&window.__csClub&&payOn()&&(preview()||(P&&P.onList&&!P.free))&&m&&!busy;
    if(!show){ if(el) el.remove(); return; }
    if(!el){ el=document.createElement("div"); el.id="hbMove"; main.parentNode.insertBefore(el,main); }
    let min=false; try{ min=localStorage.getItem("hibi-move-min")==="1"; }catch(e){}
    const head=(tag)=>`<div class="hb-mem-h"><b>💛 Your membership is moving to Hibi</b><span class="hb-tag">${tag}</span><button class="hb-mem-min" data-hbmove="min" aria-expanded="${!min}">${min?"Show ▾":"Minimize ▴"}</button></div>`;
    let body;
    if(preview()) body=`${head("Same price")}<p>Members who still pay on Skool see <b>their own price</b> here, with a button to switch. Their first Hibi payment waits until the day Skool would have charged them.</p>`;
    else if(P.annual) body=`${head("Paid")}<p>Your year is <b>already paid</b>${P.renew?` until <b>${/^\d{4}-\d\d-\d\d$/.test(P.renew)?new Date(P.renew+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):String(P.renew).replace(/[<>&]/g,"")}</b>`:""}. Nothing to do now: you keep the club, and Noa will remind you before it ends.</p>`;
    else { const usdOnly=P.usdOnly, price=usdOnly?`US$${P.usd} a month`:`${clp(P.clp)} a month`;
      const when=P.start?`Nothing is charged today. Your first payment on Hibi is on <b>${day(P.start)}</b>, the day Skool would have charged you.`:`Your first payment is today, and then once a month.`;
      body=`${head("Same price")}<p>You keep your price: <b>${price}</b>. ${when}</p>
        <ol class="hb-mv-steps"><li>Tap the button and confirm with ${usdOnly?"PayPal":"Mercado Pago"}.</li><li>Noa cancels your Skool membership, so you never pay twice.</li><li>That’s it. You can see, change or cancel it right here on Hibi.</li></ol>
        <div class="hb-mem-cta">${usdOnly?`<button class="hb-pay-btn" data-hbjoin="monthly" data-pp="1">💛 Switch with PayPal<small>US$${P.usd} a month</small></button>`:`<button class="hb-pay-btn" data-hbjoin="monthly">💛 Switch to Hibi<small>${price} · Mercado Pago</small></button>`}</div>
        ${usdOnly?"":`<p class="hb-pay-note hb-pp">Outside Chile? Pay in US dollars with PayPal: <button class="hb-pp-btn" data-hbjoin="monthly" data-pp="1">US$${P.usd} a month</button></p>`}
        <p class="hb-pay-note">Questions? <a href="#" data-joindm="ask">Message Noa</a>.</p>`; }
    el.innerHTML=`<div class="hb-mem${min?" min":""}">${body}</div>`;
  }
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-hbmove]"); if(!b) return; e.preventDefault();
    const on=!b.closest(".hb-mem").classList.contains("min"); try{ localStorage.setItem("hibi-move-min",on?"1":"0"); }catch(err){} draw(); });
  document.addEventListener("cs-club",()=>draw());
  document.addEventListener("hb-mem",()=>{ if(!asked&&payOn()&&!preview()) load(); else draw(); });
  new MutationObserver(()=>{ if(window.__hbMemInfo&&!document.getElementById("hbMove")&&document.getElementById("clubMain")) draw(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)

# tour: the move card
R('''Little notes from Noa show up in the 🔔 too.''', '''Little notes from Noa show up in the 🔔 too. Paying for the club now happens right here on Hibi, at the top of the Club page.''')
