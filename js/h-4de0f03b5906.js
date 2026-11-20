
/* step135: club payments (Flow) through the Hibi pay helper */
(function(){
  const PAY_LIVE=window.__hbPayLive=true;                     /* switch on when Flow is live for everyone */
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
      <p class="hb-pay-note">Secure card payment with Mercado Pago. You can cancel anytime, right here on Hibi.</p><p class="hb-pay-note hb-pp">Outside Chile? Pay in US dollars with PayPal: <button class="hb-pp-btn" data-hbjoin="monthly" data-pp="1">US$35 a month</button> · <button class="hb-pp-btn" data-hbjoin="yearly" data-pp="1">US$210 a year</button></p>`;
    row.parentNode.insertBefore(wrap,row);
    const jb=row.querySelector(".cl-join-btn"); if(jb) jb.hidden=true;                    /* the pay buttons replace "I want to join" */
    const ab=row.querySelector(".cl-ask-btn"); if(ab) ab.textContent="💬 Questions first? Message Noa";
    const note=row.nextElementSibling; if(note&&note.classList.contains("cl-join-note")) note.hidden=true;
  }
  const PRIVT=()=>{ const v=window.__csHubView; return !!(v&&!v.clubOnly); };
  const trialTxt=()=>PRIVT()?{btn:"🎁 Try it free for a month",tz:"🎁 Try the club free for a month →",note:"A thank-you for being one of Noa’s private students: one free month in the club. No card needed."}
    :{btn:"🎁 Try it free for 2 weeks",tz:"🎁 Try the club free for 2 weeks →",note:"No card needed. Come to the classes, then decide if you want to stay."};
  document.addEventListener("cs-hubview",()=>{ const T=trialTxt(); const b=document.querySelector("#v-club .hb-trial-btn"); if(b&&!b.disabled) b.textContent=T.btn;
    const n=document.querySelector("#v-club .hb-trial .hb-pay-note"); if(n) n.textContent=T.note; const tz=document.querySelector("#homeClub .hc-join[data-hb-trial]"); if(tz) tz.textContent=T.tz; });
  function decorateTrial(){
    if(!memReady||(MEM&&MEM.trialUsed)) return;
    const tz=document.querySelector("#homeClub .hc-join"); if(tz&&!tz.dataset.hbTrial){ tz.dataset.hbTrial="1"; tz.textContent=trialTxt().tz; }
    const row=document.querySelector("#v-club .cl-lock .cl-join-row"); if(!row||row.dataset.hbTrial) return;
    row.dataset.hbTrial="1";
    const t=document.createElement("div"); t.className="hb-trial";
    t.innerHTML=`<button class="hb-trial-btn" data-hbtrial="1">${trialTxt().btn}</button><p class="hb-pay-note">${trialTxt().note}</p>`;
    const pay=row.parentNode.querySelector(".hb-pay"); row.parentNode.insertBefore(t,pay||row);
    const jb=row.querySelector(".cl-join-btn"); if(jb) jb.hidden=true;
    const ab=row.querySelector(".cl-ask-btn"); if(ab&&!payOn()) ab.textContent="💬 Questions? Message Noa";
    const note=row.nextElementSibling; if(note&&note.classList.contains("cl-join-note")) note.hidden=true;
  }
  function askMp(b){
    document.querySelectorAll(".hb-mpbox").forEach(x=>x.remove());
    const box=document.createElement("div"); box.className="hb-mpbox";
    const em=(F().email&&F().email())||"";
    box.innerHTML=`<label><span>Your <b>Mercado Pago</b> email</span><input type="email" value="${em.replace(/"/g,"")}" autocomplete="email" placeholder="you@example.com"></label><p class="hb-pay-note">Use the email of your Mercado Pago account (often the same as Hibi). You'll confirm the payment there.</p><div class="hb-mp-row"><button type="button" class="hb-pay-btn hb-mp-go">Continue to Mercado Pago →</button><button type="button" class="hb-pp-btn hb-mp-no">Cancel</button></div>`;
    const host=b.closest(".hb-mem-cta,.hb-pay-row,#hbTestPay")||b.parentNode; host.insertAdjacentElement("afterend",box);
    const inp=box.querySelector("input"); inp.focus(); inp.select();
    box.querySelector(".hb-mp-no").onclick=()=>box.remove();
    const go=()=>{ const v=inp.value.trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ inp.focus(); say("Please check that email."); return; }
      const c=b.cloneNode(true); c.dataset.mpgo="1"; c.dataset.mpemail=v; c.hidden=true; box.appendChild(c); box.querySelector(".hb-mp-go").disabled=true; c.click(); };
    box.querySelector(".hb-mp-go").onclick=go; inp.addEventListener("keydown",ev=>{ if(ev.key==="Enter"){ ev.preventDefault(); go(); } });
  }
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-hbtrial]"); if(!b) return; e.preventDefault();
    if(preview()){ say("In View as nothing changes. Students get the club for 2 weeks, free, with one tap."); return; }
    if(window.__csGuest){ say("This is a preview: sign in to start your free trial."); return; }
    b.disabled=true;
    try{ const d=await call("/api/trial"); say("Your 2 free weeks start now! 🎉 Opening the club…"); setTimeout(()=>{ location.hash="#club"; location.reload(); },1800); }
    catch(err){ say(err.message); b.disabled=false; }
  });
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-hbjoin]"); if(!b) return; e.preventDefault();
    /* pesos go through Mercado Pago: first ask which email their Mercado Pago account uses */
    if(!b.dataset.pp&&!b.dataset.mpgo&&!preview()&&!window.__csGuest){ askMp(b); return; }
    if(preview()){ say("In View as nothing is paid. Members go to Flow to add their card."); return; }
    const all=document.querySelectorAll("[data-hbjoin]"); all.forEach(x=>x.disabled=true);
    try{ const d=await call("/api/subscribe",{plan:b.dataset.hbjoin,provider:b.dataset.pp?"paypal":"mp",payerEmail:b.dataset.mpemail||"",upgrade:!!b.dataset.up}); if(!d.url) throw new Error("Something went wrong. Please try again."); location.href=d.url; }
    catch(err){ say(err.message); all.forEach(x=>x.disabled=false);
      /* also show it right under the button, so it can't be missed */
      let n=b.parentNode.querySelector(".hb-pay-err"); if(!n){ n=document.createElement("p"); n.className="hb-pay-err"; n.style.cssText="margin:6px 0 0;font:700 13px var(--body);color:#E5484D;flex-basis:100%"; b.parentNode.appendChild(n); }
      n.textContent="⚠️ "+err.message; }
  });

  /* ---- "Your membership" card for members who pay on Hibi ---- */
  let MEM=null, loaded=false, memReady=false;
  async function loadMem(){
    loaded=true; const uid=F().uid&&F().uid(); const tok=F().token&&await F().token(); if(!uid||!tok||!F().base) return;
    try{ const r=await fetch(`${F().base}/users/${uid}/data/membership`,{headers:{authorization:"Bearer "+tok}});
      if(!r.ok){ memReady=r.status===404; if(memReady){ decorateTrial(); window.__hbMemInfo={}; document.dispatchEvent(new Event("hb-mem")); } return; } const d=await r.json(); const f=d.fields||{};
      MEM=f.deleted&&f.deleted.booleanValue?null:JSON.parse((f.json&&f.json.stringValue)||"null"); }catch(e){}
    memReady=true; drawMem(); decorateTrial(); window.__hbMemInfo=MEM||{}; document.dispatchEvent(new Event("hb-mem"));
  }
  function drawMem(){
    const main=document.getElementById("clubMain"); if(!main) return;
    let el=document.getElementById("hbMem");
    const m=MEM; if(!m||!m.status||m.status==="none"||m.status==="trial-kept"){ if(el) el.remove(); return; }
    if(!el){ el=document.createElement("div"); el.id="hbMem"; main.parentNode.insertBefore(el,main); }
    const price=m.amount?`${m.currency==="USD"?"US$"+m.amount:clp(m.amount)} ${m.kind==="y"?"a year":"a month"}${m.provider==="paypal"?" · PayPal":""}`:"";
    let tag="Active", warn=false, line="";
    if(m.status==="active") line=`${price}${m.paidThrough?` · renews on ${day(m.paidThrough)}`:""}`;
    else if(m.status==="canceling"){ tag="Ending"; line=`You cancelled. You keep everything until ${day(m.paidThrough)}.`; }
    else if(m.status==="grace"){ tag="Payment failed"; warn=true; line=`Your last payment didn’t go through. Update your card before ${day(m.graceUntil)} to keep your club access.`; }
    else if(m.status==="trial"){ const left=Math.max(0,Math.round((new Date(m.trialUntil+"T23:59:00")-Date.now())/864e5));
      tag=left<=1?"Last day":left+" days left"; line=`You’re on your <b>${m.trialLen==="month"?"free month in the club":"free 2-week trial"}</b> until ${day(m.trialUntil)}. Enjoy the classes!`; }
    else if(m.status==="trial-ended"){ tag="Trial ended"; warn=true; line=`Your free trial ended on ${day(m.trialUntil)}. Hope you enjoyed it! You can join anytime below.`; }
    else if(m.status==="ended"){ tag="Ended"; warn=true; line=`Your membership ended${m.paidThrough?` on ${day(m.paidThrough)}`:""}. You can join again anytime below.`; }
    const links=[];
    if(m.status==="active"||m.status==="grace") links.push(m.provider==="paypal"?`<a href="https://www.paypal.com/myaccount/autopay/" target="_blank" rel="noopener" style="font:700 13.5px var(--body);color:var(--accent,#2E6FD8)">${m.status==="grace"?"Fix my payment in PayPal ↗":"Manage in PayPal ↗"}</a>`:`<button data-hbmem="card">${m.status==="grace"?"Update my card":"Change card"}</button>`);
    if(m.status==="active") links.push(`<button class="danger" data-hbmem="cancel">Cancel membership</button>`);
    const cta=m.status==="trial"?(payOn()?`<div class="hb-mem-cta"><button class="hb-pay-btn" data-hbjoin="monthly">💛 Stay in the club<small>${clp(35000)} a month</small></button><button class="hb-pay-btn alt" data-hbjoin="yearly">A year<small>${clp(210000)}</small></button></div><p class="hb-pay-note hb-pp">Outside Chile? Pay in US dollars with PayPal: <button class="hb-pp-btn" data-hbjoin="monthly" data-pp="1">US$35 a month</button> · <button class="hb-pp-btn" data-hbjoin="yearly" data-pp="1">US$210 a year</button></p>`
      :`<div class="hb-mem-cta"><a class="hb-pay-btn" href="#" data-joindm="stay" style="text-decoration:none">💛 I want to stay</a></div>`):"";
    const upAmt=m.currency==="USD"?210:210000, upPct=m.amount?Math.round((1-upAmt/(12*m.amount))*100):0;
    const upHTML=m.status==="active"&&m.kind==="m"&&payOn()&&upPct>=5?`<div class="hb-up"><button class="hb-up-pill" data-hbup="1" aria-expanded="false">📅 Switch to yearly <span>· ${upPct}% off</span></button></div>`:"";
    let min=false; try{ min=localStorage.getItem("hibi-mem-min")==="1"; }catch(e){}
    el.innerHTML=`<div class="hb-mem${warn?" warn":""}${min?" min":""}"><div class="hb-mem-h"><b>${String(m.status).startsWith("trial")?"🎁 Your free trial":"💛 Your membership"}</b><span class="hb-tag">${tag}</span><button class="hb-mem-min" data-hbmem="min" aria-expanded="${!min}" title="${min?"Show details":"Minimize"}">${min?"Show ▾":"Minimize ▴"}</button></div>
      <p>${line}</p>${m.card&&m.status!=="ended"?`<p class="hb-pay-note">Card: ${String(m.card).replace(/[<>&]/g,"")}</p>`:""}
      ${cta}${upHTML}${links.length?`<div class="hb-mem-links">${links.join("")}</div>`:""}</div>`;
    if(m.status==="trial") el.firstElementChild.classList.add("trial");
  }
  document.addEventListener("click",async e=>{
    const b=e.target.closest("[data-hbmem]"); if(!b) return; e.preventDefault();
    if(preview()&&b.dataset.hbmem!=="min"){ say("In View as nothing changes."); return; }
    if(b.dataset.hbmem==="upno"){ const x=document.querySelector(".hb-upbox"); if(x) x.remove(); const p=document.querySelector("[data-hbup]"); if(p) p.setAttribute("aria-expanded","false"); return; }
    if(b.dataset.hbmem==="min"){ const box=b.closest(".hb-mem"), on=!box.classList.contains("min"); try{ localStorage.setItem("hibi-mem-min",on?"1":"0"); }catch(e){} drawMem(); return; }
    if(b.dataset.hbmem==="card"){ b.disabled=true; try{ const d=await call("/api/update-card"); location.href=d.url; }catch(err){ say(err.message); b.disabled=false; } return; }
    if(b.dataset.hbmem==="cancel"){
      if(!b.dataset.sure){ b.dataset.sure="1"; b.textContent="Tap again to cancel"; setTimeout(()=>{ if(b.isConnected){ delete b.dataset.sure; b.textContent="Cancel membership"; } },5000); return; }
      b.disabled=true; try{ await call("/api/cancel"); MEM=Object.assign({},MEM,{status:"canceling"}); drawMem(); say("Cancelled. You keep the club until your paid time ends."); }catch(err){ say(err.message); b.disabled=false; }
    }
  });

  document.addEventListener("click",e=>{
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

  /* ---- coming back from Flow ---- */
  try{ const q=new URLSearchParams(location.search), st=q.get("membership");
    if(st){ setTimeout(()=>say(st==="yearly"?"Done! You’re on the yearly plan now. 💛 It starts when your paid month ends, and the monthly payments stop.":st==="ok"?"Welcome to Noa’s English Club! 💛 Your membership is active.":st==="card"?"Your card is updated. 💳":"The payment didn’t go through, so nothing was charged. You can try again, or message Noa."),1200);
      q.delete("membership"); q.delete("why"); history.replaceState(null,"",location.pathname+(q.toString()?"?"+q:"")+location.hash); } }catch(e){}

  const tick=()=>{ decorateJoin(); decorateTrial(); if(!loaded&&F().uid&&F().uid()) loadMem(); else if(MEM&&!document.getElementById("hbMem")) drawMem(); };
  new MutationObserver(tick).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(tick,1500);
})();
