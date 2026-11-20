
/* step137: a real window.toast (before, window.toast was just the #toast element, so these messages never showed) */
(function(){
  let t=null;
  window.toast=function(msg){ const el=document.getElementById("toast"); if(!el) return;
    el.textContent=String(msg||""); el.classList.add("show"); clearTimeout(t);
    t=setTimeout(()=>el.classList.remove("show"),Math.min(6500,2400+String(msg||"").length*35)); };
})();
