
/* step174: change the weekly goal size */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-wkgoal]"); if(!b) return; if(window.__prGoalSet) window.__prGoalSet(+b.dataset.wkgoal); });
/* step174: Translator starred by default (once per account; they can un-star it) */
(function(){ function go(){ try{ if(localStorage.getItem("ncs-star-tr")) return; if(!document.getElementById("v-translate")) return;
    const put=(k,v)=>{ localStorage.setItem(k,JSON.stringify(v)); try{ window.__csOnSet&&window.__csOnSet(k); }catch(er){} };
    put("ncs-star-tr",1); let st=[]; try{ st=JSON.parse(localStorage.getItem("ncs-stars")||"[]")||[]; }catch(er){}
    if(!st.includes("translate")){ st.push("translate"); put("ncs-stars",st); if(window.__csListsReload) window.__csListsReload(); } }catch(e){} }
  document.addEventListener("cs-auth",()=>setTimeout(go,4000)); setTimeout(go,6000); })();
