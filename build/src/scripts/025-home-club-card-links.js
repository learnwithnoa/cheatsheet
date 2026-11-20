
document.addEventListener("cs-club-pods",()=>{ try{ document.dispatchEvent(new CustomEvent("cs-club")); }catch(e){} },{once:true});
document.addEventListener("click",e=>{ const b=e.target.closest("[data-hcgo]"); if(!b) return; const n=document.querySelector('.navbtn[data-go="club"]'); if(n) n.click(); else location.hash="#club"; setTimeout(()=>{ window.__clubTab&&window.__clubTab(b.dataset.hcgo); },120); });
