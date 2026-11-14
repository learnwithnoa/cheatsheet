# step91: buddy.js v52 (2 sounds per pet); View as: no past private students; the bell remembers your last tab
R('<script src="buddy.js?v=51" defer></script>','<script src="buddy.js?v=52" defer></script>')
R('''      (old.length?`<div class="va-h">Past private students (${old.length})</div><div class="va-grid">${old.map(pb).join("")}</div>`:"")+
      (cl.length?`<div class="va-h">Club members (${cl.length})</div><div class="va-grid">${cl.map(x=>`<button type="button" data-va="${esc(x.key)}">🌼 ${esc(x.name)}</button>`).join("")}</div>`:"")+''',
  '''      ((cl.length||old.some(x=>x.both))?`<div class="va-h">Club members (${cl.length+old.filter(x=>x.both).length})</div><div class="va-grid">${old.filter(x=>x.both).map(pb).join("")}${cl.map(x=>`<button type="button" data-va="${esc(x.key)}">🌼 ${esc(x.name)}</button>`).join("")}</div>`:"")+''')
R('''      (q&&!pv.length&&!cl.length?''','''      (q&&!act.length&&!old.some(x=>x.both)&&!cl.length?''')
# bell: remember the last tab (like Profile / Settings)
R('''    if(t.getAttribute("aria-selected")==="true") return;
    if(t.dataset.nm==="m"){''','''    if(t.getAttribute("aria-selected")==="true") return;
    try{ localStorage.setItem("cs-nmtab",t.dataset.nm); }catch(er){}
    if(t.dataset.nm==="m"){''')
R('''    if(b&&b.btn.contains(e.target)){ if(window.__nmProg) return; e.preventDefault();''','''    if(b&&b.btn.contains(e.target)){ if(window.__nmProg) return; e.preventDefault();''')
R('''  let q=0;
  function decorate(){''','''  /* tapping the bell opens the tab you used last */
  document.addEventListener("click",e=>{ if(!on()||window.__nmProg||document.getElementById("clDm")) return; const b=bell(); if(!b||!b.btn.contains(e.target)) return;
    let last="n"; try{ last=localStorage.getItem("cs-nmtab")||"n"; }catch(er){} if(last!=="m"||!window.__clubInbox) return;
    const open=b.k==="c"?!document.getElementById("clBellPanel").hidden:!!document.querySelector("#tNotif .tn-box"); if(open) return;
    e.preventDefault(); e.stopPropagation(); window.__clubInbox(); },true);
  let q=0;
  function decorate(){''')
R('''New messages show as a little green number on the bell."]''','''New messages count in the bell's number, and the bell opens on the tab you used last."],
    ["📸","Photos in messages","tap a photo to see it big, with a <b>⬇ Download</b> button. GIFs in messages play now too."],
    ["🐾","Your buddy has more to say","every pet now has two sounds, and you'll hear one every time you pet or feed them (if buddy sounds are on)."]''')
