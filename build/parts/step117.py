# step117: saved words / class notes / stars that came in from another device are redrawn in place (cloud.js calls this instead of reloading the page)
R('''document.getElementById("bkRestore").addEventListener("click",()=>{''','''window.__csListsReload=function(){ words=LS.get("ncs-words",[])||[]; cnotes=LS.get("ncs-classnotes",[])||[]; stars=LS.get("ncs-stars",[])||[];
  renderStars(); renderSheet(); renderWords(); renderCN(); fcShuffle(); renderFlash(); return true; };
document.getElementById("bkRestore").addEventListener("click",()=>{''')
