/* Nov 20 2026: Noa's two admin pages are one menu item, "Students", with two tabs (Private students / Hibi members).
   The menu remembers the tab you used last. */
(function(){
  const LAST="cs-adm-last";
  const go=k=>{ try{ localStorage.setItem(LAST,k); }catch(e){} const b=document.querySelector(`.navbtn[data-go="${k}"]`); if(b) b.click(); };
  document.addEventListener("click",e=>{
    const t=e.target.closest("[data-admgo]"); if(t){ e.preventDefault(); go(t.dataset.admgo); return; }
    /* the menu's "Students": open the tab used last (Hibi members or Private students) */
    if(!e.target.closest("#navStudents")) return;
    let last="students"; try{ last=localStorage.getItem(LAST)||"students"; }catch(er){}
    if(last==="members"&&!document.querySelector("#v-members:not([hidden])")){ e.preventDefault(); e.stopImmediatePropagation(); const m=document.querySelector('.navbtn[data-go="members"]'); if(m) m.click(); }
  },true);
})();
