# step135 (Nov 15 2026): club payments with Flow (through the pay helper, pay/worker.js).
# - Non-members: "Join" buttons (monthly / yearly) on the Club card, which open Flow to add a card.
# - Members who pay on Hibi: a "Your membership" card at the top of the Club page (status, price, renewal, card,
#   update card, cancel).
# - Coming back from Flow: a message (welcome / card updated / didn't go through).
# Payments stay hidden until they're switched on: PAY_LIVE below, or ?pay=1 on a device for testing (?pay=0 turns it off).
_css = r'''
.hb-pay{display:flex;flex-direction:column;gap:8px;margin-top:4px}
.hb-pay-row{display:flex;flex-wrap:wrap;gap:8px}
.hb-pay-btn{font:800 15px var(--body);padding:11px 18px;border-radius:999px;border:0;cursor:pointer;background:linear-gradient(100deg,#F7C65A,#E79A1E 60%,#E26A8D);color:#2a1d00;box-shadow:0 4px 14px rgba(231,154,30,.35);text-align:left;line-height:1.2}
.hb-pay-btn small{display:block;font:600 12px var(--body);opacity:.8}
.hb-pay-btn.alt{background:var(--surface);color:var(--ink);border:1.5px solid color-mix(in srgb,#F0A63A 55%,var(--line));box-shadow:none}
.hb-pay-btn[disabled]{opacity:.6;cursor:wait}
.hb-pay-note{font-size:13px;color:var(--muted);margin:0}
#hbMem{margin:0 0 14px}
#hbMem .hb-mem{border:1.5px solid color-mix(in srgb,#3FB37F 35%,var(--line));background:color-mix(in srgb,#3FB37F 8%,var(--surface));border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:6px}
#hbMem .hb-mem.warn{border-color:color-mix(in srgb,#E26A3D 50%,var(--line));background:color-mix(in srgb,#E26A3D 9%,var(--surface))}
#hbMem .hb-mem-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#hbMem .hb-mem-h b{font:800 15px var(--body)}
#hbMem .hb-tag{font:700 11.5px var(--mono);letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,#3FB37F 22%,var(--surface))}
#hbMem .warn .hb-tag{background:color-mix(in srgb,#E26A3D 25%,var(--surface))}
#hbMem p{margin:0;font-size:14px}
#hbMem .hb-mem-links{display:flex;gap:14px;flex-wrap:wrap;margin-top:2px}
#hbMem .hb-mem-links button{background:none;border:0;padding:0;font:700 13.5px var(--body);color:var(--accent,#2E6FD8);cursor:pointer;text-decoration:underline;text-underline-offset:3px}
#hbMem .hb-mem-links button.danger{color:var(--muted)}
#hbMem .hb-mem-min{margin-left:auto;background:none;border:1.5px solid var(--line);border-radius:999px;padding:4px 11px;font:700 12.5px var(--body);color:var(--muted);cursor:pointer}
#hbMem .hb-mem-min:hover{color:var(--ink)}
#hbMem .hb-mem.min{padding:10px 16px}
#hbMem .hb-mem.min>:not(.hb-mem-h){display:none}
/* the join buttons sit in the middle of the card */
.hb-pay{align-items:center;text-align:center}
.hb-pay-row{justify-content:center}
.cl-lock .cl-join-btn{align-self:center}
.cl-lock .cl-join-btn+.cl-lock-small{text-align:center}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step135: club payments (Flow) through the Hibi pay helper */
(function(){
  const PAY_LIVE=false;                     /* switch on when Flow is live for everyone */
  const API="https://hibi-pay.learnwithnoa.workers.dev";
  try{ const q=new URLSearchParams(location.search).get("pay"); if(q==="1") localStorage.setItem("hibi-pay","1"); if(q==="0") localStorage.removeItem("hibi-pay"); }catch(e){}
  const payOn=()=>{ try{ return PAY_LIVE||localStorage.getItem("hibi-pay")==="1"; }catch(e){ return PAY_LIVE; } };
  const F=()=>window.__csFire||{};
  const preview=()=>!!(window.__csPreview||(F().readOnly&&F().readOnly()));
  const say=t=>{ if(typeof window.toast==="function") window.toast(t); };
  const clp=n=>"$"+Number(n||0).toLocaleString("es-CL");
  const day=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}); }catch(e){ return d; } };
  async function call(path,body){
    const tok=F().token&&await F().token(); if(!tok) throw new Error("Please sign in first.");
    const r=await fetch(API+path,{method:"POST",headers:{authorization:"Bearer "+tok,"content-type":"application/json"},body:JSON.stringify(body||{})});
    const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||"Something went wrong. Please try again."); return d;
  }

  /* ---- join buttons on the members-only card ---- */
  function decorateJoin(){
    if(!payOn()) return;
    const row=document.querySelector("#v-club .cl-lock .cl-join-row"); if(!row||row.dataset.hbPay) return;
    row.dataset.hbPay="1";
    const wrap=document.createElement("div"); wrap.className="hb-pay";
    wrap.innerHTML=`<div class="hb-pay-row">
        <button class="hb-pay-btn" data-hbjoin="monthly">💛 Join now<small>${clp(35000)} a month · cancel anytime</small></button>
        <button class="hb-pay-btn alt" data-hbjoin="yearly">Join for a year<small>${clp(210000)} · half price</small></button></div>
      <p class="hb-pay-note">Secure card payment with Flow. You can cancel anytime, right here on Hibi.</p>`;
    row.parentNode.insertBefore(wrap,row);
    const jb=row.querySelector(".cl-join-btn"); if(jb) jb.hidden=true;                    /* the pay buttons replace "I want to join" */
    const ab=row.querySelector(".cl-ask-btn"); if(ab) ab.textContent="💬 Questions first? Message Noa";
    const note=row.nextElementSibling; if(note&&note.classList.contains("cl-join-note")) note.hidden=true;
  }
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-hbjoin]"); if(!b) return; e.preventDefault();
    if(preview()){ say("In View as nothing is paid. Members go to Flow to add their card."); return; }
    const all=document.querySelectorAll("[data-hbjoin]"); all.forEach(x=>x.disabled=true);
    try{ const d=await call("/api/subscribe",{plan:b.dataset.hbjoin}); location.href=d.url; }
    catch(err){ say(err.message); all.forEach(x=>x.disabled=false); }
  });

  /* ---- "Your membership" card for members who pay on Hibi ---- */
  let MEM=null, loaded=false;
  async function loadMem(){
    loaded=true; const uid=F().uid&&F().uid(); const tok=F().token&&await F().token(); if(!uid||!tok||!F().base) return;
    try{ const r=await fetch(`${F().base}/users/${uid}/data/membership`,{headers:{authorization:"Bearer "+tok}});
      if(!r.ok) return; const d=await r.json(); const f=d.fields||{};
      MEM=f.deleted&&f.deleted.booleanValue?null:JSON.parse((f.json&&f.json.stringValue)||"null"); }catch(e){}
    drawMem();
  }
  function drawMem(){
    const main=document.getElementById("clubMain"); if(!main) return;
    let el=document.getElementById("hbMem");
    const m=MEM; if(!m||!m.status||m.status==="none"){ if(el) el.remove(); return; }
    if(!el){ el=document.createElement("div"); el.id="hbMem"; main.parentNode.insertBefore(el,main); }
    const price=m.amount?`${clp(m.amount)} ${m.kind==="y"?"a year":"a month"}`:"";
    let tag="Active", warn=false, line="";
    if(m.status==="active") line=`${price}${m.paidThrough?` · renews on ${day(m.paidThrough)}`:""}`;
    else if(m.status==="canceling"){ tag="Ending"; line=`You cancelled. You keep everything until ${day(m.paidThrough)}.`; }
    else if(m.status==="grace"){ tag="Payment failed"; warn=true; line=`Your last payment didn’t go through. Update your card before ${day(m.graceUntil)} to keep your club access.`; }
    else if(m.status==="ended"){ tag="Ended"; warn=true; line=`Your membership ended${m.paidThrough?` on ${day(m.paidThrough)}`:""}. You can join again anytime below.`; }
    const links=[];
    if(m.status==="active"||m.status==="grace") links.push(`<button data-hbmem="card">${m.status==="grace"?"Update my card":"Change card"}</button>`);
    if(m.status==="active") links.push(`<button class="danger" data-hbmem="cancel">Cancel membership</button>`);
    let min=false; try{ min=localStorage.getItem("hibi-mem-min")==="1"; }catch(e){}
    el.innerHTML=`<div class="hb-mem${warn?" warn":""}${min?" min":""}"><div class="hb-mem-h"><b>💛 Your membership</b><span class="hb-tag">${tag}</span><button class="hb-mem-min" data-hbmem="min" aria-expanded="${!min}" title="${min?"Show details":"Minimize"}">${min?"Show ▾":"Minimize ▴"}</button></div>
      <p>${line}</p>${m.card&&m.status!=="ended"?`<p class="hb-pay-note">Card: ${String(m.card).replace(/[<>&]/g,"")}</p>`:""}
      ${links.length?`<div class="hb-mem-links">${links.join("")}</div>`:""}</div>`;
  }
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-hbmem]"); if(!b) return; e.preventDefault();
    if(preview()&&b.dataset.hbmem!=="min"){ say("In View as nothing changes."); return; }
    if(b.dataset.hbmem==="min"){ const box=b.closest(".hb-mem"), on=!box.classList.contains("min"); try{ localStorage.setItem("hibi-mem-min",on?"1":"0"); }catch(e){} drawMem(); return; }
    if(b.dataset.hbmem==="card"){ b.disabled=true; try{ const d=await call("/api/update-card"); location.href=d.url; }catch(err){ say(err.message); b.disabled=false; } return; }
    if(b.dataset.hbmem==="cancel"){
      if(!b.dataset.sure){ b.dataset.sure="1"; b.textContent="Tap again to cancel"; setTimeout(()=>{ if(b.isConnected){ delete b.dataset.sure; b.textContent="Cancel membership"; } },5000); return; }
      b.disabled=true; try{ await call("/api/cancel"); MEM=Object.assign({},MEM,{status:"canceling"}); drawMem(); say("Cancelled. You keep the club until your paid time ends."); }catch(err){ say(err.message); b.disabled=false; }
    }
  });

  /* ---- coming back from Flow ---- */
  try{ const q=new URLSearchParams(location.search), st=q.get("membership");
    if(st){ setTimeout(()=>say(st==="ok"?"Welcome to Noa’s English Club! 💛 Your membership is active.":st==="card"?"Your card is updated. 💳":"The payment didn’t go through, so nothing was charged. You can try again, or message Noa."),1200);
      q.delete("membership"); q.delete("why"); history.replaceState(null,"",location.pathname+(q.toString()?"?"+q:"")+location.hash); } }catch(e){}

  const tick=()=>{ decorateJoin(); if(!loaded&&F().uid&&F().uid()) loadMem(); else if(MEM&&!document.getElementById("hbMem")) drawMem(); };
  new MutationObserver(tick).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(tick,1500);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
