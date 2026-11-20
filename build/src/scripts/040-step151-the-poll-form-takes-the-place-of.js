
/* step151: the poll form takes the place of the post box (and back) */
document.addEventListener("click",e=>{
  const tp=e.target.closest("[data-topoll]"), bk=e.target.closest("[data-topost]"); if(!tp&&!bk) return; e.preventDefault();
  if(tp){ const f=tp.closest("form"), d=document.querySelector("#v-club .cl-newpoll"); if(!f||!d) return;
    d.classList.add("in-comp"); f.parentNode.insertBefore(d,f); d.open=true; f.hidden=true; const ta=d.querySelector("textarea"); if(ta) ta.focus(); }
  else { const d=bk.closest(".cl-newpoll"), f=d&&d.nextElementSibling; if(d) d.open=false; if(f&&f.matches("form")) f.hidden=false; }
});
