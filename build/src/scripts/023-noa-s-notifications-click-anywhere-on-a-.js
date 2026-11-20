
/* Noa's notifications: click anywhere on a notification to open it; × hides one; "joined" opens a welcome message */
(function(){
  const rowOf=t=>t.closest(".tn-box li, .tn-box p.tn-line");
  const act=row=>{ if(row.dataset.tnmail){ const f=String(row.dataset.tnname||"").trim().split(/\s+/)[0]||"";
      const body=`Hi ${f}!\n\nWelcome to Hibi, I'm really happy you're here. 🎉 Have a look around: save new words, practice a bit, and check My coaching for your classes.\n\nIf you need anything, just reply to this email.\n\nNoa`;
      window.open("https://mail.google.com/mail/?authuser=learnwithnoa%40gmail.com&view=cm&fs=1&to="+encodeURIComponent(row.dataset.tnmail)+"&su="+encodeURIComponent("Welcome to Hibi 🎉")+"&body="+encodeURIComponent(body),"_blank"); return true; }
    const go=row.querySelector(":scope > a.tn-go"); if(go){ go.click(); return true; } return false; };
  document.addEventListener("click",e=>{ const d=e.target.closest("[data-tndis]"); if(d){ e.preventDefault(); e.stopPropagation(); let v=[]; try{ v=JSON.parse(localStorage.getItem("ncs-tnotif-dis")||"[]")||[]; }catch(er){}
      v=[...new Set(v.concat(d.dataset.tndis))].slice(-200); try{ localStorage.setItem("ncs-tnotif-dis",JSON.stringify(v)); }catch(er){}
      const row=d.closest("li"); if(row) row.remove(); if(window.toast) window.toast("Hidden. It comes back if something about it changes."); try{ document.dispatchEvent(new CustomEvent("cs-teacher")); }catch(er){} return; }
    const row=rowOf(e.target); if(!row||row.dataset.dmto||e.target.closest("a,button,input,textarea,select,form")) return;
    if(act(row)) e.preventDefault(); },true);
  /* a welcome message: open the chat with it ready to send (Noa can edit it first) */
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-dmdraft]"); if(!t) return; const draft=t.dataset.dmdraft;
    let n=0; const put=()=>{ const ta=document.querySelector("#clDm textarea"); if(ta){ if(!ta.value.trim()){ ta.value=draft; ta.dispatchEvent(new Event("input",{bubbles:true})); } ta.focus(); try{ ta.setSelectionRange(ta.value.length,ta.value.length); }catch(er){} return; } if(++n<20) setTimeout(put,100); }; setTimeout(put,80); });
  /* keyboard: notifications can be reached with Tab and opened with Enter */
  const tag=()=>document.querySelectorAll(".tn-box li[data-dmto], .tn-box li[data-tnmail], .tn-box li:has(> .tn-go), .tn-box p.tn-line:has(> .tn-go)").forEach(r=>{ if(!r.hasAttribute("tabindex")){ r.tabIndex=0; r.setAttribute("role","link"); } });
  new MutationObserver(tag).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("keydown",e=>{ if(e.key!=="Enter"&&e.key!==" ") return; const r=e.target.closest&&e.target.closest(".tn-box li[tabindex], .tn-box p.tn-line[tabindex]"); if(!r||e.target!==r) return; e.preventDefault(); r.click(); });
})();
