/* Nov 25 2026 (sweep): tables wider than a phone screen scroll sideways; show a soft fade and a "swipe →" hint until the student scrolls to the end */
(function(){
  const L=(en,es)=>document.documentElement.classList.contains("cs-beginner")?es:en;
  function mark(w){ const more=w.scrollWidth-w.clientWidth>4, end=w.scrollLeft+w.clientWidth>=w.scrollWidth-4;
    w.classList.toggle("tbl-more",more&&!end);
    let h=w.previousElementSibling; if(!(h&&h.classList.contains("tbl-hint"))){ if(!more) return; h=document.createElement("div"); h.className="tbl-hint"; h.setAttribute("aria-hidden","true"); w.parentNode.insertBefore(h,w); }
    h.textContent=L("Swipe the table →","Desliza la tabla →"); h.hidden=!more||w.dataset.swiped==="1"; }
  function all(){ document.querySelectorAll(".tbl-wrap").forEach(w=>{ if(!w.dataset.th){ w.dataset.th="1"; w.addEventListener("scroll",()=>{ if(w.scrollLeft>20) w.dataset.swiped="1"; mark(w); },{passive:true}); } if(w.offsetParent) mark(w); }); }
  addEventListener("resize",all); addEventListener("hashchange",()=>setTimeout(all,150)); setTimeout(all,1200); setInterval(all,3000);
})();
/* Nov 25 2026 (sweep): on phones the floating study buddy sat on top of lesson text: it fades out while you scroll and comes back when you stop */
(function(){ let t=0; const d=document.documentElement;
  addEventListener("scroll",()=>{ if(innerWidth>700) return; d.classList.add("cs-scrolling"); clearTimeout(t); t=setTimeout(()=>d.classList.remove("cs-scrolling"),900); },{passive:true});
})();
