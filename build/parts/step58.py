# step58: opening a chat always clears its unread dot, delete your own messages, delete (hide) a chat, no sideways scroll on phones
R('''    if(!G()&&ms.length&&ms[ms.length-1].from!==me()){''','''    const thr=(THREADS||[]).find(x=>x.id===tid);
    if(!G()&&((thr&&thr.unread)||(ms.length&&ms[ms.length-1].from!==me()))){''')
R('''o.unread=o.last&&o.last.from!==me()&&(o["r_"+me()]||0)<(o.at||0); return o; }).sort(''','''o.unread=o.last&&o.last.from!==me()&&(o["r_"+me()]||0)<(o.at||0); return o; }).filter(o=>!((o["h_"+me()]||0)>=(o.at||0))).sort(''')
R('''  function msgHTML(m){ const mine=m.from===(G()?"me":me());
    return `<div class="cl-msg${mine?" mine":""}">''','''  function msgHTML(m){ const mine=m.from===(G()?"me":me());
    return `<div class="cl-msg${mine?" mine":""}">${mine&&m.id&&!G()?`<button type="button" class="cl-msgdel" data-msgdel="${esc(m.id)}" aria-label="${L("Delete this message","Borrar este mensaje")}" title="${L("Delete","Borrar")}">✕</button>`:""}''')
R('''      return `<li><button type="button" class="cl-dmi${t.unread?" new":""}" data-dmto="${esc(u)}" data-dmname="${esc(nm)}">''','''      return `<li class="cl-dmli">${G()?"":`<button type="button" class="cl-dmdel" data-dmhide="${esc(t.id)}" data-dmname="${esc(nm)}" aria-label="${L("Delete chat with","Borrar chat con")} ${esc(nm)}" title="${L("Delete chat","Borrar chat")}">✕</button>`}<button type="button" class="cl-dmi${t.unread?" new":""}" data-dmto="${esc(u)}" data-dmname="${esc(nm)}">''')
R('''  function closeDm(){''','''  const askDel=async(t,b,ok)=> window.csConfirm?window.csConfirm(t,b,ok):confirm(t);
  document.addEventListener("click",async e=>{
    const d=e.target.closest("[data-msgdel]");
    if(d&&DMOPEN){ e.preventDefault(); e.stopPropagation(); const tid=DMOPEN.tid;
      if(!(await askDel(L("Delete this message?","¿Borrar este mensaje?"),`<p>${L("It’s deleted for both of you. This can’t be undone.","Se borra para los dos. No se puede deshacer.")}</p>`,L("Delete","Borrar")))) return;
      try{ await api("DELETE",`/dms/${tid}/msgs/${d.dataset.msgdel}`); toast(L("Message deleted.","Mensaje borrado.")); DMOPEN&&(DMOPEN.lastAt=0); paintChat(false); }catch(err){ toast(L("Couldn’t delete it. Try again.","No se pudo borrar. Intenta de nuevo.")); } return; }
    const h=e.target.closest("[data-dmhide]");
    if(h){ e.preventDefault(); e.stopPropagation(); const tid=h.dataset.dmhide, nm=h.dataset.dmname||"";
      if(!(await askDel(L("Delete this chat?","¿Borrar este chat?"),`<p>${L(`Your chat with <b>${esc(nm)}</b> disappears from your messages. If they write to you again, it comes back.`,`Tu chat con <b>${esc(nm)}</b> desaparece de tus mensajes. Si te vuelve a escribir, aparece de nuevo.`)}</p>`,L("Delete","Borrar")))) return;
      const now=Date.now();
      try{ await api("PATCH",`/dms/${tid}?updateMask.fieldPaths=h_${me()}&updateMask.fieldPaths=r_${me()}`,{fields:{["h_"+me()]:I(now),["r_"+me()]:I(now)}}); THREADS=(THREADS||[]).filter(x=>x.id!==tid); dmBadge(); openInbox(); toast(L("Chat deleted.","Chat borrado.")); }catch(err){ toast(L("Couldn’t delete it. Try again.","No se pudo borrar. Intenta de nuevo.")); } } },true);
  function closeDm(){''')
css58 = '''
/* step58 */
.cl-dmli{position:relative}
.cl-dmdel{all:unset;position:absolute;top:50%;right:8px;transform:translateY(-50%);z-index:2;width:28px;height:28px;display:grid;place-items:center;border-radius:50%;font-size:13px;color:var(--muted);cursor:pointer;opacity:.55}
.cl-dmdel:hover,.cl-dmdel:focus-visible{opacity:1;background:color-mix(in srgb,#E5533D 14%,transparent);color:#E5533D}
.cl-dmli .cl-dmi{padding-right:44px!important}
.cl-dmli .cl-dmi em{margin-right:4px}
.cl-msg{position:relative}
.cl-msgdel{all:unset;position:absolute;top:-8px;left:-8px;width:22px;height:22px;display:grid;place-items:center;border-radius:50%;font-size:11px;background:var(--surface);border:1px solid var(--line);color:var(--muted);cursor:pointer;opacity:0;transition:opacity .15s}
.cl-msg:hover .cl-msgdel,.cl-msgdel:focus-visible{opacity:1}
@media (hover:none){.cl-msgdel{opacity:.7}}
.cl-msgdel:hover{color:#E5533D;border-color:#E5533D}
/* phones: the page only scrolls up and down */
html,body{overflow-x:hidden;overflow-x:clip;max-width:100%}
@media (max-width:520px){
  .top-in{gap:4px!important;padding-inline:10px!important}
  .top-in .theme-btn,.top-in #dmTopBtn,.top-in>#tNotif .tn-bell{width:34px!important;min-width:34px!important;height:34px!important;padding:0!important;justify-content:center}
  .top-in .brand{font-size:24px}
  .top-in .brand-sub,.top-in .brand .jp{display:none}
}
@media (max-width:380px){
  .top-in .theme-btn,.top-in #dmTopBtn,.top-in>#tNotif .tn-bell{width:31px!important;min-width:31px!important;height:31px!important}
  .top-in{gap:3px!important}
}
'''
_i = s.index('</style>'); s = s[:_i] + css58 + s[_i:]
R('''    ["🎧","A tidier top bar",''','''    ["🗑️","Delete messages and chats","in <b>Messages</b>, tap the ✕ on a message you sent to delete it, or the ✕ next to a chat to remove it from your list. Hibi always asks first."],
    ["🎧","A tidier top bar",''')
