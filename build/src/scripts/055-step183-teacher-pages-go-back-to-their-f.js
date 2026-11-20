
/* step183: teacher pages go back to their first tab when you leave them */
(function(){
  function reset(id){
    const f=document.querySelector("#"+(id==="students"?"stFrame":"mbFrame")+" iframe"); if(!f) return;
    try{ const w=f.contentWindow;
      if(id==="students"){ if(w.location.hash!=="#overview") w.location.hash="#overview"; }
      else if(w.__mFirstTab) w.__mFirstTab();
    }catch(er){}
  }
  ["students","members"].forEach(id=>{
    const v=document.getElementById("v-"+id); if(!v) return;
    let was=v.hidden;
    new MutationObserver(()=>{ if(v.hidden&&!was) reset(id); was=v.hidden; }).observe(v,{attributes:true,attributeFilter:["hidden"]});
  });
})();
