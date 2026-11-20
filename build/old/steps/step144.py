# step144 (Nov 16 2026): ✕ to dismiss a note from Noa in the 🔔 (it stays under "See all"), and the footer link "Messages from Noa" is hidden.
# Dismissed notes are kept in ncs-kudos-hid (list of their times), synced like other ncs- keys. Not in View as.
R('''  function KDN(){ try{ const h=JSON.parse(localStorage.getItem("ncs-kudos")||"[]"); return Array.isArray(h)?h.filter(m=>m&&m.text):[]; }catch(e){ return []; } }''',
  '''  function KDH(){ try{ const h=JSON.parse(localStorage.getItem("ncs-kudos-hid")||"[]"); return Array.isArray(h)?h:[]; }catch(e){ return []; } }
  function KDN(){ try{ const h=JSON.parse(localStorage.getItem("ncs-kudos")||"[]"), hid=KDH(); return Array.isArray(h)?h.filter(m=>m&&m.text&&!hid.includes(m.at||0)):[]; }catch(e){ return []; } }
  document.addEventListener("click",e=>{ const x=e.target.closest("[data-kdhide]"); if(!x) return; e.preventDefault(); e.stopPropagation();
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ if(typeof window.toast==="function") window.toast("In View as nothing changes. Members can hide a note here."); return; }
    const at=+x.dataset.kdhide||0, h=KDH(); if(!h.includes(at)){ h.push(at); try{ localStorage.setItem("ncs-kudos-hid",JSON.stringify(h.slice(-200))); }catch(err){} }
    const li=x.closest("li"), ul=li&&li.parentElement; if(li) li.remove();
    if(ul&&!ul.querySelector("li")){ const h4=ul.previousElementSibling, r=ul.nextElementSibling; if(r&&r.classList.contains("clb-kdr")) r.remove(); if(h4&&h4.tagName==="H4") h4.remove(); ul.remove(); }
    if(typeof window.toast==="function") window.toast("Hidden. You can still find it under See all.");
    try{ paintBell(); }catch(err){} }, true);''')
R('''${kdl.map(m=>`<li><button type="button" class="clb-i''', '''${kdl.map(m=>`<li class="clb-kdli"><button type="button" class="clb-i''')
R('''<em>${kfmt(m.at)}</em></button></li>`).join("")}</ul><div class="clb-kdr">''',
  '''<em>${kfmt(m.at)}</em></button><button type="button" class="clb-kdx" data-kdhide="${m.at||0}" title="${L("Hide this note","Ocultar esta nota")}" aria-label="${L("Hide this note","Ocultar esta nota")}">✕</button></li>`).join("")}</ul><div class="clb-kdr">''')
_css = r'''
.clb-kdli{display:flex;align-items:stretch;gap:4px}
.clb-kdli .clb-i{flex:1;min-width:0}
.clb-kdx{flex:none;width:30px;border:0;border-radius:10px;background:transparent;color:var(--muted);font:700 13px var(--body);cursor:pointer}
.clb-kdx:hover{background:var(--surface-2);color:var(--ink)}
/* the footer link "Messages from Noa" is gone: the notes live in the 🔔 now ("See all" still opens the full list through it) */
#kdLink{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
