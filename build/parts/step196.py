# step196 (Nov 19 2026): editing a club post/comment/challenge answer can also remove or change its GIF and remove photos
# (Laura posted a challenge answer with a GIF she wanted to change). Also: editing keeps everything else about the post
# (challenge week, category, poll, idea) — before, an edit saved only the text, GIF and photos.
R('''  async function editDoc(path,item,text){ const data={text,imgs:item.imgs||[],edited:Date.now()}; if(item.gifs) data.gifs=item.gifs;
    await api("PATCH","/"+path+"?updateMask.fieldPaths=json",{fields:{json:S(JSON.stringify(data))}}); item.text=text; item.edited=data.edited; }''',
  '''  async function editDoc(path,item,text,media){ let data={}; try{ data=JSON.parse(item.json||"{}")||{}; }catch(e){ data={}; } ["ch","cat","poll","idea"].forEach(k=>{ if(item[k]!=null&&data[k]==null) data[k]=item[k]; });
    data.text=text; data.edited=Date.now(); const imgs=media?media.imgs:(item.imgs||[]), gifs=media?media.gifs:(item.gifs||[]);
    data.imgs=imgs; if(gifs&&gifs.length) data.gifs=gifs; else delete data.gifs;
    const js=JSON.stringify(data); await api("PATCH","/"+path+"?updateMask.fieldPaths=json",{fields:{json:S(js)}});
    item.json=js; item.text=text; item.edited=data.edited; item.imgs=imgs; if(data.gifs) item.gifs=data.gifs; else delete item.gifs; }''')
R('''      p.hidden=true; p.insertAdjacentHTML("afterend",`<div class="cs-edit"><textarea rows="3" maxlength="3000" aria-label="Edit">${esc(item.text||"")}</textarea><div class="cs-row"><span class="cs-msg" role="status"></span><button type="button" class="cs-act" data-edcancel="1">Cancel</button><button type="button" class="cs-send" data-edsave="${esc(path)}">Save</button></div></div>`);
      const ta=card.querySelector(".cs-edit textarea"); ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); return; }''',
  '''      p.hidden=true; const media=card.querySelector(":scope > .cs-gif, :scope > .cs-imgs"); if(media) card.querySelectorAll(":scope > .cs-gif, :scope > .cs-imgs").forEach(x=>x.hidden=true);
      p.insertAdjacentHTML("afterend",`<form class="cs-edit" novalidate><textarea rows="3" maxlength="3000" aria-label="Edit">${esc(item.text||"")}</textarea><div class="cs-prev"></div><div class="cs-gifpick" hidden></div><div class="cs-row"><button type="button" class="cs-act cs-gifbtn" data-gifopen="1" aria-expanded="false">GIF</button><span class="cs-msg" role="status"></span><button type="button" class="cs-act" data-edcancel="1">${L("Cancel","Cancelar")}</button><button type="button" class="cs-send" data-edsave="${esc(path)}">${L("Save","Guardar")}</button></div></form>`);
      const fm=card.querySelector(".cs-edit"); fm._imgs=(item.imgs||[]).slice(); const g0=(item.gifs||[])[0]; if(g0) GIF.set(fm,g0); edPrev(fm);
      const ta=fm.querySelector("textarea"); ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); return; }
    const ui=t.closest("[data-edunimg]"); if(ui){ const fm=ui.closest(".cs-edit"); fm._imgs=fm._imgs.filter(x=>x!==ui.dataset.edunimg); edPrev(fm); return; }''')
R('''    const ec=t.closest("[data-edcancel]"); if(ec){ const card=ec.closest(".cs-c,.cs-p"); card.querySelector(".cs-edit").remove(); const p=card.querySelector(":scope > .cs-txt"); p.hidden=!p.textContent.trim(); return; }''',
  '''    const ec=t.closest("[data-edcancel]"); if(ec){ const card=ec.closest(".cs-c,.cs-p"); card.querySelector(".cs-edit").remove(); card.querySelectorAll(":scope > .cs-gif, :scope > .cs-imgs").forEach(x=>x.hidden=false); const p=card.querySelector(":scope > .cs-txt"); p.hidden=!p.textContent.trim(); return; }''')
R('''      if(!text&&!(item.imgs||[]).length&&!(item.gifs||[]).length){ box.querySelector(".cs-msg").textContent="Write something first."; return; }
      es.disabled=true; try{ await editDoc(path,item,text); }''',
  '''      const g=GIF.get(box), nm={imgs:(box._imgs||item.imgs||[]).slice(),gifs:g?[{u:g.u,w:g.w||0,h:g.h||0,t:g.t||"GIF"}]:[]};
      if(!text&&!nm.imgs.length&&!nm.gifs.length){ box.querySelector(".cs-msg").textContent=L("Write something first.","Escribe algo primero."); return; }
      es.disabled=true; try{ await editDoc(path,item,text,nm); }''')
# the edit box's preview: the GIF (✕ removes it, GIF button picks another) and the photos (✕ removes one)
R('''  let gTimer=null;''', '''  function edPrev(fm){ const pv=fm.querySelector(".cs-prev"); pv.innerHTML=(fm._imgs||[]).map(id=>`<span class="cs-pv"><img data-img="${esc(id)}" alt=""><button type="button" data-edunimg="${esc(id)}" aria-label="${L("Remove photo","Quitar foto")}">✕</button></span>`).join(""); gifShow(fm); paintImgs(pv); }
  let gTimer=null;''')
# tour line about editing
_css = r'''
/* step196: edit box with media */
.cs-edit .cs-prev:empty{display:none}
.cs-edit .cs-prev{margin:8px 0 0}
.cs-edit .cs-row{flex-wrap:wrap}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
# weekly challenge answers: their author can edit/delete them right there (✏️ / 🗑 like on the wall)
R('''<div class="cl-ans${PICKS[cidG]===p.id?" pick":""}"><div class="cs-top">${who(p)}</div>''', '''<div class="cl-ans${PICKS[cidG]===p.id?" pick":""}" data-pid="${esc(p.id)}"><div class="cs-top">${who(p)}${G()?"":tools(p,"clubPosts/"+p.id,true)}</div>''')
assert s.count('closest(".cs-c,.cs-p")') == 3
s = s.replace('closest(".cs-c,.cs-p")', 'closest(".cs-c,.cs-p,.cl-ans")')
R('''const fresh=parts.length>2?commentHTML(parts[1],item):postHTML(item); card.outerHTML=fresh;''',
  '''if(card.classList.contains("cl-ans")){ const cl=card.closest(".cl-chal-list"); if(cl){ cl.dataset.on=""; mountChal(cl); } return; } const fresh=parts.length>2?commentHTML(parts[1],item):postHTML(item); card.outerHTML=fresh;''')
R('''dl.closest(".cs-p").remove();''', '''(dl.closest(".cs-p,.cl-ans")||{remove(){}}).remove();''')
