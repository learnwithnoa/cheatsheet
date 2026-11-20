/* step194: tap the buddy on a club profile to open/close its card (hover does it on a computer) */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-ppet]"); document.querySelectorAll(".cl-prof-pic.tip-on").forEach(x=>{ if(!b||x!==b.parentElement){ x.classList.remove("tip-on"); const k=x.querySelector("[data-ppet]"); k&&k.setAttribute("aria-expanded","false"); } });
  if(b){ const on=b.parentElement.classList.toggle("tip-on"); b.setAttribute("aria-expanded",on?"true":"false"); } });
