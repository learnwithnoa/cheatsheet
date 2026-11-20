
/* the logo always takes you Home and refreshes the page (even if you're already there) */
document.addEventListener("click",e=>{ const a=e.target.closest("a.brand"); if(!a||e.metaKey||e.ctrlKey||e.shiftKey) return; e.preventDefault(); e.stopPropagation(); try{ localStorage.setItem("eep-view","notes"); }catch(er){} history.replaceState(null,"",location.pathname); location.reload(); },true);
