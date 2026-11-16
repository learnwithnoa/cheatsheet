# step156 (Nov 16 2026): react to messages you receive (like Instagram).
# - Hover (computer) or always-visible small button (phone) next to a received message → 6 emojis. Double-tap = ❤️.
# - Tap your reaction again (or the same emoji) to remove it. The other person sees it under their message.
# - Stored on the thread doc dms/{tid} as rx_<uid> = JSON {msgId: emoji} (both members can already write the thread doc),
#   so no change to message docs or rules. Doesn't change "last message"/unread.
RXS = "❤️ 😂 😮 😢 👍 🔥"
R('''  function msgHTML(m){ const mine=m.from===(G()?"me":me());''',
  '''  const RXE="''' + RXS + '''".split(" ");
  const rxOn=(m,who)=>{ const R=(DMOPEN&&DMOPEN.rx)||{}; return ((R[who]||{})[m.id])||""; };
  function rxHTML(m,mine){ if(!m.id) return ""; const my=G()?"me":me(), other=DMOPEN&&DMOPEN.u;
    const e=mine?rxOn(m,other):rxOn(m,my);
    const chip=e?`<button type="button" class="cl-msgrx${mine?"":" me"}"${mine?" disabled":` data-rxset="${esc(m.id)}" data-rxe="${esc(e)}"`} aria-label="${mine?L("Their reaction","Su reacción"):L("Your reaction (tap to remove)","Tu reacción (toca para quitarla)")}">${e}</button>`:"";
    const btn=mine?"":`<button type="button" class="cl-msgrxb" data-rxpick="${esc(m.id)}" aria-label="${L("React","Reaccionar")}" title="${L("React","Reaccionar")}">☺</button>`;
    return chip+btn; }
  function msgHTML(m){ const mine=m.from===(G()?"me":me());''')
R('''<em>${new Date(m.at).toLocaleString(L("en-US","es-CL"),{hour:"numeric",minute:"2-digit",month:"short",day:"numeric"})}</em></div>`; }''',
  '''<em>${new Date(m.at).toLocaleString(L("en-US","es-CL"),{hour:"numeric",minute:"2-digit",month:"short",day:"numeric"})}</em>${rxHTML(m,mine)}</div>`; }''')
R('''return `<div class="cl-msg${mine?" mine":""}">''', '''return `<div class="cl-msg${mine?" mine":""}${m.id&&((mine&&rxOn(m,DMOPEN&&DMOPEN.u))||(!mine&&rxOn(m,G()?"me":me())))?" has-rx":""}" data-mid="${esc(m.id||"")}">''')
# load the reactions with the messages (1 extra read of the thread doc)
R('''    else { try{ ms=await query("dms/"+tid,"msgs","ASCENDING",300); }catch(e){ ms=[]; } }''',
  '''    else { try{ ms=await query("dms/"+tid,"msgs","ASCENDING",300); }catch(e){ ms=[]; }
      try{ const th=await api("GET","/dms/"+tid), f=(th&&th.fields)||{}, rx={}; Object.keys(f).forEach(k=>{ if(k.startsWith("rx_")) try{ rx[k.slice(3)]=JSON.parse(f[k].stringValue||"{}")||{}; }catch(er){} }); if(DMOPEN&&DMOPEN.tid===tid) DMOPEN.rx=rx; }catch(e){} }
    if(G()){ ms.forEach((m,i)=>{ if(!m.id) m.id="g"+i; }); if(DMOPEN&&!DMOPEN.rx) DMOPEN.rx={}; }''')
# picker + saving
R('''  window.__clubMyProfile=()=>{''', '''  async function setRx(mid,emo){ if(!DMOPEN) return; const my=G()?"me":me(); DMOPEN.rx=DMOPEN.rx||{}; const mine=Object.assign({},DMOPEN.rx[my]||{});
    if(!emo||mine[mid]===emo) delete mine[mid]; else mine[mid]=emo;
    const ks=Object.keys(mine); if(ks.length>200) ks.slice(0,ks.length-200).forEach(k=>delete mine[k]);
    const prev=DMOPEN.rx[my]; DMOPEN.rx[my]=mine; paintRx(mid);
    if(G()) return;
    if(window.__csPreview||(F().readOnly&&F().readOnly())){ DMOPEN.rx[my]=prev; paintRx(mid); toast("In View as nothing changes."); return; }
    try{ await api("PATCH",`/dms/${DMOPEN.tid}?updateMask.fieldPaths=rx_${me()}`,{fields:{["rx_"+me()]:S(JSON.stringify(mine))}}); }
    catch(e){ DMOPEN.rx[my]=prev; paintRx(mid); toast(L("Couldn’t save that reaction. Try again.","No se pudo guardar la reacción. Intenta de nuevo.")); } }
  function paintRx(mid){ const el=document.querySelector(`#clDm .cl-msg[data-mid="${CSS.escape(mid)}"]`); if(!el) return; const mine=el.classList.contains("mine");
    el.querySelectorAll(".cl-msgrx,.cl-msgrxb").forEach(x=>x.remove()); const tmp=document.createElement("div"); tmp.innerHTML=rxHTML({id:mid},mine); [...tmp.children].forEach(c=>el.appendChild(c));
    el.classList.toggle("has-rx",!!el.querySelector(".cl-msgrx")); }
  function closePick(){ document.querySelectorAll(".cl-rxpick").forEach(p=>p.remove()); }
  document.addEventListener("click",e=>{
    const pk=e.target.closest("[data-rxpick]"); if(pk){ e.preventDefault(); e.stopPropagation(); const open=document.querySelector(`.cl-rxpick[data-for="${CSS.escape(pk.dataset.rxpick)}"]`); closePick(); if(open) return;
      const msg=pk.closest(".cl-msg"), cur=rxOn({id:pk.dataset.rxpick},G()?"me":me()), p=document.createElement("div"); p.className="cl-rxpick"; p.dataset.for=pk.dataset.rxpick; p.setAttribute("role","menu");
      p.innerHTML=RXE.map(x=>`<button type="button" role="menuitem" data-rxset="${esc(pk.dataset.rxpick)}" data-rxe="${x}" class="${x===cur?"on":""}" aria-label="${L("React with","Reaccionar con")} ${x}">${x}</button>`).join("");
      msg.appendChild(p); const r=p.getBoundingClientRect(), box=msg.closest(".cl-msgs").getBoundingClientRect(); if(r.right>box.right-4) p.style.left="auto", p.style.right="0"; if(r.top<box.top) p.classList.add("below"); return; }
    const st=e.target.closest("[data-rxset]"); if(st){ e.preventDefault(); e.stopPropagation(); closePick(); setRx(st.dataset.rxset,st.dataset.rxe); return; }
    if(!e.target.closest(".cl-rxpick")) closePick(); });
  /* double-tap / double-click a message you received = ❤️ */
  document.addEventListener("dblclick",e=>{ const m=e.target.closest("#clDm .cl-msg:not(.mine)[data-mid]"); if(!m||!m.dataset.mid||e.target.closest("button,img,a")) return; e.preventDefault(); try{ window.getSelection().removeAllRanges(); }catch(er){} setRx(m.dataset.mid,"❤️"); });
  let lastTap={id:"",t:0};
  document.addEventListener("touchend",e=>{ const m=e.target.closest("#clDm .cl-msg:not(.mine)[data-mid]"); if(!m||e.target.closest("button,img,a")) return; const now=Date.now();
    if(lastTap.id===m.dataset.mid&&now-lastTap.t<320){ e.preventDefault(); lastTap={id:"",t:0}; setRx(m.dataset.mid,"❤️"); } else lastTap={id:m.dataset.mid,t:now}; },{passive:false});
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".cl-rxpick")){ e.stopPropagation(); closePick(); } },true);
  window.__clubMyProfile=()=>{''')

_css = r'''
/* step156: message reactions */
.cl-msg.has-rx{margin-bottom:12px}
.cl-msgrx{all:unset;position:absolute;bottom:-13px;right:8px;min-width:22px;height:22px;padding:0 4px;display:grid;place-items:center;border-radius:999px;font-size:13px;line-height:1;background:var(--surface);border:1px solid var(--line);box-shadow:0 2px 6px rgba(0,0,0,.12);cursor:default}
.cl-msgrx.me{left:8px;right:auto;cursor:pointer}
.cl-msgrx.me:hover{border-color:var(--royal,#3b82f6)}
.cl-msgrxb{all:unset;position:absolute;top:50%;right:-34px;transform:translateY(-50%);width:26px;height:26px;display:grid;place-items:center;border-radius:50%;font-size:15px;line-height:1;color:var(--muted);background:var(--surface);border:1px solid var(--line);cursor:pointer;opacity:0;transition:opacity .15s}
.cl-msg:hover .cl-msgrxb,.cl-msgrxb:focus-visible{opacity:1}
@media (hover:none){.cl-msgrxb{opacity:.55}}
.cl-msgrxb:hover{color:var(--ink);border-color:var(--royal,#3b82f6)}
.cl-msg:not(.mine){margin-right:36px}
.cl-rxpick{position:absolute;left:0;bottom:calc(100% + 6px);z-index:5;display:flex;gap:2px;padding:5px 6px;border-radius:999px;background:var(--surface);border:1px solid var(--line);box-shadow:0 8px 24px rgba(0,0,0,.18);animation:clRxIn .14s ease-out}
.cl-rxpick.below{bottom:auto;top:calc(100% + 6px)}
.cl-rxpick button{all:unset;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;font-size:21px;line-height:1;cursor:pointer;transition:transform .12s}
.cl-rxpick button:hover,.cl-rxpick button:focus-visible{transform:scale(1.22);background:var(--surface-2)}
.cl-rxpick button.on{background:color-mix(in srgb,var(--royal,#3b82f6) 18%,transparent)}
@keyframes clRxIn{from{opacity:0;transform:translateY(4px) scale(.96)}to{opacity:1;transform:none}}
html.cs-calm .cl-rxpick{animation:none}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
# tour line
R('''Little notes from Noa show up in the 🔔 too.''', '''Little notes from Noa show up in the 🔔 too. To react to a message someone sends you, tap ☺ next to it (or double-tap it for a ❤️).''')
