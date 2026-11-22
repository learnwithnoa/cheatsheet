
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
  function personalJoin(){
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
    const main=document.getElementById("clubMain"); let el=document.getElementById("hbMove");
    const m=window.__hbMemInfo, busy=m&&["active","grace","canceling","trial"].includes(m.status);
    const show=main&&window.__csClub&&payOn()&&((preview()&&!window.__csViewAsMode)||(P&&P.onList&&!P.free))&&m&&!busy;
    if(!show){ if(el) el.remove(); return; }
    if(!el){ el=document.createElement("div"); el.id="hbMove"; main.parentNode.insertBefore(el,main); }
    let min=false; try{ min=localStorage.getItem("hibi-move-min")==="1"; }catch(e){}
    const head=(tag)=>`<div class="hb-mem-h"><b>💛 Your membership is moving to Hibi</b><span class="hb-tag">${tag}</span><button class="hb-mem-min" data-hbmove="min" aria-expanded="${!min}">${min?"Show ▾":"Minimize ▴"}</button></div>`;
    let body;
    if(preview()) body=`${head("Same price")}<p>Members who still pay on Skool see <b>their own price</b> here, with a button to switch. Their first Hibi payment waits until the day Skool would have charged them.</p>`;
    else if(P.annual) body=`${head("Paid")}<p>Your year is <b>already paid</b>${P.renew?` until <b>${/^\d{4}-\d\d-\d\d$/.test(P.renew)?new Date(P.renew+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):String(P.renew).replace(/[<>&]/g,"")}</b>`:""}. Nothing to do now: you keep the club, and Noa will remind you before it ends.</p>`;
    else { const usdOnly=P.usdOnly, price=usdOnly?`US$${P.usd} a month`:`${clp(P.clp)} a month`;
      const when=P.start?`Nothing is charged today. Your first payment on Hibi is on <b>${day(P.start)}</b>, when your Skool month ends. Your Skool subscription is already cancelled, so you never pay twice.<br><span class="hb-mv-warn">Switch before then to keep your spot. If you haven’t switched by ${day(P.start)}, your club access pauses the next morning (the rest of Hibi stays).</span>`
        :P.ended?`Your Skool membership ends <b>today</b>. Switch today to keep your club access: tomorrow morning it pauses until you do. Your first payment is today, and then once a month.`
        :`Your first payment is today, and then once a month.`;
      body=`${head("Same price")}<p>You keep your price: <b>${price}</b>. ${when}</p>
        <ol class="hb-mv-steps"><li>Tap the button and confirm with ${usdOnly?"PayPal":"Mercado Pago"}.</li><li>That’s it. You can see, change or cancel it right here on Hibi.</li></ol>
        <div class="hb-mem-cta">${usdOnly?`<button class="hb-pay-btn" data-hbjoin="monthly" data-pp="1">💛 Switch with PayPal<small>US$${P.usd} a month</small></button>`:`<button class="hb-pay-btn" data-hbjoin="monthly">💛 Switch to Hibi<small>${price} · Mercado Pago</small></button>`}</div>
        ${usdOnly?"":`<p class="hb-pay-note hb-pp">Outside Chile? Pay in US dollars with PayPal: <button class="hb-pp-btn" data-hbjoin="monthly" data-pp="1">US$${P.usd} a month</button></p>`}
        <p class="hb-pay-note">Questions? <a href="#" data-joindm="ask">Message Noa</a>.</p>`; }
    el.innerHTML=`<div class="hb-mem${min?" min":""}">${body}</div>`;
  }
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-hbmove]"); if(!b) return; e.preventDefault();
    const on=!b.closest(".hb-mem").classList.contains("min"); try{ localStorage.setItem("hibi-move-min",on?"1":"0"); }catch(err){} draw(); });
  document.addEventListener("cs-club",()=>draw());
  document.addEventListener("hb-mem",()=>{ if(!asked&&payOn()&&!preview()) load(); else draw(); });
  new MutationObserver(()=>{ const pj=document.querySelector("#v-club .cl-lock .hb-pay:not([data-mine])"); if(pj&&P) personalJoin(); if(window.__hbMemInfo&&!document.getElementById("hbMove")&&document.getElementById("clubMain")) draw(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
