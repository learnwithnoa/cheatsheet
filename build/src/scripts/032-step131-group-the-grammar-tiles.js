
/* step131: group the grammar tiles */
(function(){
  function go(){ const pan=document.querySelector('.pr-panel[data-pp="gram"]'); if(!pan) return; const grid=pan.querySelector(".pr-tiles"); if(!grid||grid.dataset.grouped) return;
    const ORDER=["prs","th","ps","cou","pp","ing","fut","iq"];   /* easiest first */
    ORDER.forEach(k=>{ const t=grid.querySelector('[data-modtile="'+k+'"]'); if(t) grid.appendChild(t); if(k==="prs"){ const ir=grid.querySelector('[data-pr="irr"]'); if(ir) grid.appendChild(ir); } });   /* step187: Irregular verbs sits right after the Verb tenses folder (which takes prs/ps/pp) */
    const tools=[grid.querySelector('[data-pr="mis"]')].filter(Boolean); if(!tools.length) return;
    const h1=document.createElement("div"); h1.className="pr-grp"; h1.textContent="Topics"; grid.before(h1);
    const h2=document.createElement("div"); h2.className="pr-grp pr-grp-tools"; h2.textContent="Tools · review and drills";
    const g2=document.createElement("div"); g2.className="pr-tiles pr-tools"; tools.forEach(t=>g2.appendChild(t));
    grid.after(h2); h2.after(g2); grid.dataset.grouped="1"; }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go(); setTimeout(go,1500);
})();
