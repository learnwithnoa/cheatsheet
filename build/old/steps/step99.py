# step99: chat header opens the person's profile; after sending, the chat stays at the newest message (even when photos/GIFs load); messages live only in the Messages tab (no double count)
R('''o.querySelector(".cl-dmback").hidden=false; o.querySelector(".cl-dmt").innerHTML=`${av(u,nm)} ${esc(nm||L("Member","Miembro"))}`;''',
  '''o.querySelector(".cl-dmback").hidden=false; o.querySelector(".cl-dmt").innerHTML=`<button type="button" class="cl-dmwho" data-prof="${esc(u)}" data-pname="${esc(nm||"")}" title="${L("See profile","Ver perfil")}">${av(u,nm)}<span>${esc(nm||L("Member","Miembro"))}</span></button>`;''')
R('''box.innerHTML=ms.length?ms.map(msgHTML).join(""):`<p class="cl-empty">${L("Say hi 👋","Saluda 👋")}</p>`; paintImgs(box); if(scroll||near) box.scrollTop=box.scrollHeight;''',
  '''box.innerHTML=ms.length?ms.map(msgHTML).join(""):`<p class="cl-empty">${L("Say hi 👋","Saluda 👋")}</p>`; paintImgs(box);
    if(scroll||near){ const down=()=>{ box.scrollTop=box.scrollHeight; }; down(); requestAnimationFrame(down);
      /* photos and GIFs load a moment later and make the chat taller: keep it at the bottom while they do */
      box.querySelectorAll("img").forEach(im=>{ if(!im.complete) im.addEventListener("load",()=>{ if(box.scrollHeight-box.scrollTop-box.clientHeight<400) down(); },{once:true}); });
      const mo=new MutationObserver(()=>down()); mo.observe(box,{subtree:true,attributes:true,attributeFilter:["src"]}); setTimeout(()=>mo.disconnect(),2500); }''')
R('''n=(club?NOTES.filter(x=>x.at>seen).length:0)+CN.length;''','''n=(club?NOTES.filter(x=>x.kind!=="dm"&&x.at>seen).length:0)+CN.length;''')
R('''${NOTES.length?`<ul>${NOTES.map(x=>`<li><button type="button" class="clb-i''','''${NOTES.some(x=>x.kind!=="dm")?`<ul>${NOTES.filter(x=>x.kind!=="dm").map(x=>`<li><button type="button" class="clb-i''')
_css = '''
/* step99: the chat header is a button to the person's profile */
.cl-dmwho{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:10px;max-width:100%;padding:4px 10px 4px 4px;border-radius:999px;font:inherit;font-weight:800}
.cl-dmwho:hover{background:color-mix(in srgb,var(--ink) 7%,transparent)}
.cl-dmwho:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
.cl-dmwho span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
