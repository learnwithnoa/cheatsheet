
/* step149: Settings switch for the unread-message emails */
(function(){
  const K="ncs-mailnotif";
  const isOn=()=>{ try{ return JSON.parse(localStorage.getItem(K)||'"on"')!=="off"; }catch(e){ return true; } };
  function add(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csMailN")) return;
    const F=window.__csFire; if(!F||!F.uid||!F.uid()||window.__csGuest) return;
    const anchor=document.getElementById("csResetAll"); if(!anchor) return;
    const box=document.createElement("div"); box.className="cs-sec cs-mailn";
    box.innerHTML=`<h4>Messages</h4><label class="cs-tog"><input type="checkbox" id="csMailN"><span><b>Email me about unread messages</b><small>If a message waits 12 hours, Hibi sends one short email. Never more than one a day, and no reminders while that message is still unread.</small></span></label>`;
    const host=document.getElementById("csInstallSec")||anchor.closest(".cs-sec")||anchor.parentNode; host.parentNode.insertBefore(box,host);
    const cb=box.querySelector("input"); cb.checked=isOn();
    cb.addEventListener("change",()=>{
      if(window.__csPreview||(F.readOnly&&F.readOnly())){ cb.checked=isOn(); if(typeof window.toast==="function") window.toast("In View as nothing changes."); return; }
      try{ localStorage.setItem(K,JSON.stringify(cb.checked?"on":"off")); }catch(e){}
      if(typeof window.toast==="function") window.toast(cb.checked?"✓ You'll get an email if a message waits 12 hours.":"Got it: no emails about messages.");
    });
  }
  document.addEventListener("click",e=>{ if(e.target.closest("#csBtn")) setTimeout(add,30); },true);
  new MutationObserver(()=>{ const p=document.getElementById("csPanel"); if(p&&!p.hidden) add(); }).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["hidden"]});
})();
