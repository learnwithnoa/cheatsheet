
/* Noa only: the Daily Stoic on Home (it comes from the 1:1 students page, which loads quietly in the background) */
(function(){ const b=document.getElementById("tStoic"); if(!b) return; const K="cs-stoic-cache";
  const show=h=>{ const ok=window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode; b.hidden=!(ok&&h); if(ok&&h) b.innerHTML=h; };
  const cached=()=>{ try{ const c=JSON.parse(localStorage.getItem(K)||"null"); return c&&c.d===new Date().toDateString()?c.h:""; }catch(e){ return ""; } };
  setTimeout(()=>show(cached()),400);
  addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data||e.data.stoicHTML===undefined) return; show(e.data.stoicHTML); try{ localStorage.setItem(K,JSON.stringify({d:new Date().toDateString(),h:e.data.stoicHTML})); }catch(er){} });
  ["cs-teacher","cs-preview"].forEach(ev=>document.addEventListener(ev,()=>{ if(!(window.__csTeacher===true&&!window.__csPreview)) b.hidden=true; else if(b.hidden) show(b.innerHTML||cached()); }));
})();
