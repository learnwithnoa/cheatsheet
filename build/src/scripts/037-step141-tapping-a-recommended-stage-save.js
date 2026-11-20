
/* step141: tapping a recommended stage saves it as Noa's recommendation, so the module opens it right away */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-tipstage]"); if(!b) return;
  if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())) return;   /* View as never changes anything */
  try{ const k="ncs-modrec", r=JSON.parse(localStorage.getItem(k)||"{}")||{}, st=parseInt(b.dataset.tipstage,10);
    r[b.dataset.gomod]= st>0 ? st : "all"; localStorage.setItem(k,JSON.stringify(r)); if(window.__csOnSet) window.__csOnSet(k); }catch(er){}
},true);
