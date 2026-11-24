(function(){var t="dark";try{t=localStorage.getItem("ncs-theme")||"dark";if(t==="soft"){t="sepia";localStorage.setItem("ncs-theme",t);}}catch(e){}document.documentElement.setAttribute("data-theme",t);
/* Nov 24 2026: nobody has signed in on this device (no ncs-sync-uid) → probably a visitor: hide Hibi until we know, so the landing page shows
   straight away instead of Hibi flashing first. 012 shows the landing page right away and removes the class if they turn out to be signed in. */
try{var q=location.search||"";if(!localStorage.getItem("ncs-sync-uid")&&!/[?&](guest|preview|tb)=/.test(q)&&!sessionStorage.getItem("cs-guest")&&window.top===window){var d=document.documentElement;d.classList.add("cs-out-guess");var lt=localStorage.getItem("ncs-theme");d.style.background=(lt&&["light","unicorn","sepia"].indexOf(lt)<0)?"#0A1424":"#EEF5FC";}}catch(e){}
})();
