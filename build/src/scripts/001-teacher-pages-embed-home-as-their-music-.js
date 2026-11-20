
/* teacher pages embed Home as their music / bell / profile buttons (index.html?tb=1) */
(function(){ if(!/[?&]tb=1/.test(location.search)||window.parent===window) return; document.documentElement.classList.add("tb-mode"); window.__csTB=true;
  const b=document.createElement("base"); b.target="_top"; document.head.appendChild(b); })();
