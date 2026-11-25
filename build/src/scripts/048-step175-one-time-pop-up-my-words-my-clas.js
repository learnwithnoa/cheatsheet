
/* step175: one-time pop-up: My words + My class notes are now My notebook */
(function(){ const K="ncs-nb-intro";
  const seen=()=>{ if(window.__csGuest||(window.__csViewAsMode&&window.__csViewAsMode.sample)) return true; /* previews: nothing to migrate */ try{ return !!localStorage.getItem(K); }catch(e){ return true; } };
  const mark=()=>{ try{ localStorage.setItem(K,JSON.stringify(1)); window.__csOnSet&&window.__csOnSet(K); }catch(e){} };
  const busy=()=>[...document.querySelectorAll('.cs-dlg,.bd-modal,#whatsnew,#welcome')].some(x=>!x.hidden&&x.getClientRects().length)||(window.__csBusy&&window.__csBusy())||!!document.querySelector('#bdBub:not([hidden]) [data-bd="adopt"]');  /* Nov 25 2026: never on top of the buddy's egg bubble */
  let tries=0;
  function show(){
    if(seen()||window.__csViewAsMode||window.__csPreview) return;
    if(!localStorage.getItem("ncs-welcomed")){ mark(); return; }   /* new here: nothing was renamed for them */
    /* Nov 24 2026: on a slow phone the part of Hibi that draws pop-ups (csDialog) can still be loading: wait for it instead of crashing */
    if(busy()||document.hidden||typeof window.csDialog!=="function"){ if(++tries<60) setTimeout(show,3000); return; }
    mark();
    const d=window.csDialog(`<div class="nb-intro"><h3>📒 Meet <em>My notebook</em></h3>
      <p style="margin:0">Your <b>words</b> and your <b>class notes</b> are now together in one place: <b>My notebook</b> in the menu (it used to be <b>My words</b> and <b>My class notes</b>).</p>
      <p style="margin:10px 0 4px">It has three tabs:</p>
      <ul><li><span><b>Aa Words:</b> every word you save, same as before.</span></li>
      <li><span><b>✏️ Class notes:</b> write during class and ✨ Hibi finds the new words for you.</span></li>
      <li><span><b>📓 Summaries:</b> each week of notes, summed up.</span></li></ul>
      <p class="muted" style="margin:0 0 4px;font-size:14px">Nothing was lost: all your words and notes are right where you left them.</p>
      <p class="esb" style="margin:0">Tus palabras y tus apuntes de clase ahora están juntos en <b>My notebook</b>. ¡No se perdió nada!</p>
      <div class="note-actions" style="margin-top:12px"><button class="pill-btn pill-green" type="button" data-nbgo>Open My notebook</button><button class="swap" type="button" data-nbok>Got it</button></div></div>`,{cls:"nb-intro-dlg"});
    d.el.querySelector("[data-nbgo]").addEventListener("click",()=>{ d.close(); if(window.csGo) window.csGo("words"); else location.hash="#words"; });
    d.el.querySelector("[data-nbok]").addEventListener("click",()=>d.close());
  }
  let started=false; const start=()=>{ if(started) return; started=true; setTimeout(show,5000); };
  window.addEventListener("cs-auth",e=>{ if(e.detail&&e.detail.signedIn) start(); });
  if(window.__csAuth) start();
})();
