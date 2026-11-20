# step194 (Nov 19 2026): club profile shows the same photo as the members list; their buddy sits in the corner,
# hover (or tap) it for a little card about the pet. No buddy yet (egg not opened) → nothing there.
R('''<div class="cl-prof-top">${svg?`<div class="cl-prof-bd">${svg}</div>`:`<div class="cl-prof-bd cl-prof-ini">${av(u,p.name||nm)}</div>`}''',
  '''<div class="cl-prof-top"><div class="cl-prof-pic">${av(u,p.name||nm)}${svg&&bd&&bd.on!==false&&bd.a?(()=>{ const I=window.csBuddy&&window.csBuddy.info?window.csBuddy.info(bd):null, nmB=bn||(I&&I.species)||L("Buddy","Buddy");
          return `<button type="button" class="cl-prof-pet" data-ppet="1" aria-label="${esc(L("About ","Sobre ")+nmB)}" aria-expanded="false">${svg}</button><div class="cl-prof-tip" role="tooltip"><b>${esc(nmB)}</b>${I&&I.species&&bn?` <span>${L("the","")} ${esc(I.species)}</span>`:""}${I&&I.shiny?" ✨":""}
            <ul><li>💛 ${L("Friendship level","Nivel de amistad")} ${I?I.lvl:(bd.lvl|0||1)}</li>${I&&I.wearing.length?`<li>👕 ${L("Wearing","Lleva")}: ${esc(I.wearing.join(", "))}</li>`:""}${I&&I.words?`<li>📚 ${I.words} ${L("words saved","palabras guardadas")}</li>`:""}${I&&I.dw?`<li>⚔️ ${I.dw} ${I.dw===1?L("duel win","duelo ganado"):L("duel wins","duelos ganados")}</li>`:""}</ul></div>`; })():""}</div>''')
R('''        ${bn?`<p class="cl-prof-bn">${L("Buddy:","Buddy:")} <b>${esc(bn)}</b>${bd&&bd.lvl>1?` · 💛 ${bd.lvl|0}`:""}</p>`:""}</div></div>''', '''</div></div>''')
_js = r'''<script>/* step194: tap the buddy on a club profile to open/close its card (hover does it on a computer) */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-ppet]"); document.querySelectorAll(".cl-prof-pic.tip-on").forEach(x=>{ if(!b||x!==b.parentElement){ x.classList.remove("tip-on"); const k=x.querySelector("[data-ppet]"); k&&k.setAttribute("aria-expanded","false"); } });
  if(b){ const on=b.parentElement.classList.toggle("tip-on"); b.setAttribute("aria-expanded",on?"true":"false"); } });
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
/* step194: club profile photo + buddy corner */
.cl-prof-pic{position:relative;flex:none;width:92px;height:92px}
.cl-prof-pic>.cs-av{width:92px;height:92px;font-size:32px;border-radius:50%}
.cl-prof-pet{all:unset;cursor:pointer;position:absolute;right:-10px;bottom:-8px;width:44px;height:44px;border-radius:14px;background:linear-gradient(#BFE3FF,#DFF3D8);border:2.5px solid var(--surface,#fff);box-shadow:0 2px 8px rgba(0,0,0,.25);display:grid;place-items:center;overflow:hidden;transition:transform .15s}
.cl-prof-pet svg{width:100%;height:100%}
.cl-prof-pet:hover,.cl-prof-pet:focus-visible{transform:scale(1.08)}
.cl-prof-pet:focus-visible{outline:2px solid var(--c2,#5AB8FF);outline-offset:2px}
.cl-prof-tip{position:absolute;left:0;top:calc(100% + 14px);z-index:5;width:max-content;max-width:min(260px,70vw);padding:11px 14px;border-radius:14px;background:var(--surface,#fff);border:1.5px solid var(--line);box-shadow:0 8px 24px rgba(0,0,0,.25);font-size:13.5px;line-height:1.45;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .15s,transform .15s,visibility .15s;pointer-events:none}
.cl-prof-tip b{font-size:15px}
.cl-prof-tip span{color:var(--muted)}
.cl-prof-tip ul{list-style:none;margin:6px 0 0;padding:0}
.cl-prof-tip li{margin:2px 0}
@media (hover:hover){.cl-prof-pet:hover+.cl-prof-tip{opacity:1;visibility:visible;transform:none}}
.cl-prof-pic.tip-on .cl-prof-tip,.cl-prof-pet:focus-visible+.cl-prof-tip{opacity:1;visibility:visible;transform:none}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
