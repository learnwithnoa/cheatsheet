
document.addEventListener("click",e=>{ const b=e.target.closest("[data-tnrd]"); if(!b) return; e.preventDefault(); e.stopPropagation();
  let v=[]; try{ v=JSON.parse(localStorage.getItem("ncs-tnotif-read")||"[]")||[]; }catch(er){} const k=b.dataset.tnrd; if(!v.includes(k)) v.push(k);
  try{ localStorage.setItem("ncs-tnotif-read",JSON.stringify(v.slice(-300))); }catch(er){}
  const li=b.closest("li"); if(li){ li.classList.add("tn-read"); b.remove(); }
  try{ const n=Math.max(0,(+localStorage.getItem("cs-tn-count")||0)-1); localStorage.setItem("cs-tn-count",String(n)); }catch(er){}
  try{ document.dispatchEvent(new CustomEvent("cs-teacher")); }catch(er){} },true);
