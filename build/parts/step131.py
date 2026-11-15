# step131 (Nov 15 2026): Practice → Grammar: topics in a row, easiest first; Irregular verbs + My mistakes in their own "Tools" row
_css = '''
/* step131: grammar topics + tools */
.pr-grp{font:700 12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:4px 0 10px}
.pr-grp.pr-grp-tools{margin-top:22px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step131: group the grammar tiles */
(function(){
  function go(){ const pan=document.querySelector('.pr-panel[data-pp="gram"]'); if(!pan) return; const grid=pan.querySelector(".pr-tiles"); if(!grid||grid.dataset.grouped) return;
    const ORDER=["prs","th","ps","cou","pp","ing"];   /* easiest first */
    ORDER.forEach(k=>{ const t=grid.querySelector('[data-modtile="'+k+'"]'); if(t) grid.appendChild(t); });
    const tools=[grid.querySelector('[data-pr="irr"]'),grid.querySelector('[data-pr="mis"]')].filter(Boolean); if(!tools.length) return;
    const h1=document.createElement("div"); h1.className="pr-grp"; h1.textContent="Topics"; grid.before(h1);
    const h2=document.createElement("div"); h2.className="pr-grp pr-grp-tools"; h2.textContent="Tools · review and drills";
    const g2=document.createElement("div"); g2.className="pr-tiles pr-tools"; tools.forEach(t=>g2.appendChild(t));
    grid.after(h2); h2.after(g2); grid.dataset.grouped="1"; }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go(); setTimeout(go,1500);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
