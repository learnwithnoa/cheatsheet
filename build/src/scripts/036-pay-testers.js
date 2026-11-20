
(function(){
  const TESTERS=["J8D2tjQmBaaA2QN730tSfSrjfm73","Bh1mtEtTgxg6DJagqNddDyqKeiH2"];
  function add(){
    let on=false; try{ on=localStorage.getItem("hibi-pay")==="1"; }catch(e){}
    const F=window.__csFire, uid=F&&F.uid&&F.uid(); if(!on||!uid||!TESTERS.includes(uid)) return;
    if(F.readOnly&&F.readOnly()) return;
    const main=document.getElementById("clubMain"), lock=document.querySelector("#v-club .cl-lock");
    const host=main||lock; if(!host||document.getElementById("hbTestPay")) return;
    const d=document.createElement("div"); d.id="hbTestPay";
    d.style.cssText="margin:0 0 12px;padding:10px 14px;border:1.5px dashed var(--line);border-radius:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:13.5px";
    d.innerHTML='<span>🧪 Only you see this: try a <b>real</b> payment (Mercado Pago in pesos, or PayPal in dollars).</span><button class="hb-pay-btn alt" data-hbjoin="test" style="padding:7px 14px;font-size:13.5px">Test payment · $1.000/month</button><button class="hb-pay-btn alt" data-hbjoin="test" data-pp="1" style="padding:7px 14px;font-size:13.5px">PayPal test · US$1/month</button><span class="muted">Cancel it afterwards from the membership card.</span>';
    host.parentNode.insertBefore(d,host);
  }
  new MutationObserver(add).observe(document.documentElement,{childList:true,subtree:true}); setTimeout(add,2000);
})();
