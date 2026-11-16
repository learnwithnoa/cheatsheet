# step151 (Nov 16 2026):
# 1) Polls live inside the "new post" box: a "📊 Poll" button there swaps the box to the poll form (and "← Back to post").
# 2) Community: the number on the tab counts posts/comments you haven't seen yet. A post counts as read once you've
#    scrolled to it (about a second on screen), and "✓ Mark all as read" clears everything. (cs-wall-read, by post)
# 3) Library: "Show less" after "Show more".
# 4) Refresh keeps the tab you were on: Club tabs (sessionStorage cs-club-tab) and 1:1 students (iframe opens on cs-hub-view).

# ---------- 1) poll inside the post box ----------
R('''<div class="cs-row"><label class="cs-act cs-addph">📷 ${L("Photo","Foto")}<input type="file" accept="image/*" multiple hidden></label>''',
  '''<div class="cs-row">${kind==="poll"?`<button type="button" class="cs-act" data-topost="1">← ${L("Back to post","Volver al post")}</button>`:""}<label class="cs-act cs-addph">📷 ${L("Photo","Foto")}<input type="file" accept="image/*" multiple hidden></label>${kind==="post"?`<button type="button" class="cs-act" data-topoll="1">📊 ${L("Poll","Encuesta")}</button>`:""}''')

# ---------- 2) community: read as you scroll + mark all ----------
R('''  const setSeen=v=>{ try{ localStorage.setItem(WSEEN,String(v)); }catch(e){} };''',
  '''  const setSeen=v=>{ try{ localStorage.setItem(WSEEN,String(v)); }catch(e){} };
  const WREAD="cs-wall-read";
  const getRd=()=>{ try{ return JSON.parse(localStorage.getItem(WREAD)||"{}")||{}; }catch(e){ return {}; } };
  const setRd=m=>{ try{ const k=Object.keys(m); if(k.length>300) k.slice(0,k.length-300).forEach(x=>delete m[x]); localStorage.setItem(WREAD,JSON.stringify(m)); }catch(e){} };
  const lastOf=p=>Math.max(p.at||0,p.lastAt||0);
  const isUnread=(p,s,rd)=>isNew(p,s)&&p.uid!==me()&&(rd[p.id]||0)<lastOf(p);
  function paintCount(){ if(G()||!POSTS) return; const s=getSeen()||(Date.now()-7*864e5), rd=getRd(); badge(POSTS.filter(p=>isUnread(p,s,rd)).length); }
  function markRead(id){ const p=(POSTS||[]).find(x=>x.id===id); if(!p) return; const rd=getRd(); if((rd[id]||0)>=lastOf(p)) return; rd[id]=lastOf(p); setRd(rd); paintCount(); }
  function watchRead(el){ if(G()||!window.IntersectionObserver||!el) return; if(el._io) el._io.disconnect();
    const tm=new Map(), io=new IntersectionObserver(es=>es.forEach(en=>{ const id=en.target.dataset.pid, seen=en.isIntersecting&&(en.intersectionRatio>=.5||en.intersectionRect.height>innerHeight*.45);
      if(seen){ if(!tm.has(id)) tm.set(id,setTimeout(()=>{ markRead(id); io.unobserve(en.target); },900)); } else { clearTimeout(tm.get(id)); tm.delete(id); } }),{threshold:[0,.25,.5,.75,1]});
    el._io=io; el.querySelectorAll("article.cs-p.isnew[data-pid]").forEach(a=>io.observe(a)); }''')
R('''return POSTS.filter(p=>isNew(p,s)&&p.uid!==me()).length; }''', '''const rd=getRd(); return POSTS.filter(p=>isUnread(p,s,rd)).length; }''')
R('''    SEEN_AT=getSeen(); NEWIDS=new Set(POSTS.filter(p=>isNew(p,SEEN_AT)).map(p=>p.id)); if(G()) NEWIDS=new Set(["s1"]);
    paintWall(el); if(!G()) setSeen(Date.now()); badge(0);''',
  '''    if(!G()&&!getSeen()) setSeen(Date.now()-7*864e5);
    SEEN_AT=getSeen(); { const rd=getRd(); NEWIDS=new Set(POSTS.filter(p=>isNew(p,SEEN_AT)&&(rd[p.id]||0)<lastOf(p)).map(p=>p.id)); } if(G()) NEWIDS=new Set(["s1"]);
    paintWall(el); paintCount();''')
R('''  function paintWall(el){''', '''  function paintWall(el){ setTimeout(()=>watchRead(el),60);''')
R('''  function badge(n){ document.querySelectorAll("[data-unread]").forEach(b=>{ b.hidden=!n; b.textContent=n>9?"9+":String(n); }); }''',
  '''  function badge(n){ document.querySelectorAll("[data-unread]").forEach(b=>{ b.hidden=!n; b.textContent=n>9?"9+":String(n); });
    document.querySelectorAll("[data-wallbar]").forEach(b=>{ b.hidden=!n; const t=b.querySelector("[data-wallbar-n]"); if(t) t.textContent=n===1?L("1 new post or comment","1 post o comentario nuevo"):L(n+" new posts or comments",n+" posts o comentarios nuevos"); }); }
  document.addEventListener("click",e=>{ if(!e.target.closest("[data-wallread]")) return; e.preventDefault();
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ if(typeof window.toast==="function") window.toast("In View as nothing changes."); return; }
    setSeen(Date.now()); setRd({}); badge(0); if(typeof window.toast==="function") window.toast(L("✓ All caught up","✓ Todo al día")); });''')
R('''  async function refreshBadge(){ const n=await unread(); const onWall=document.querySelector(".cl-wall[data-on='1']"); badge(onWall?0:n); return n; }''',
  '''  async function refreshBadge(){ const n=await unread(); badge(n); return n; }''')
R('''body='<div class="cl-say" data-say="1"></div><div class="cl-wall" data-wall="1"></div>';''',
  '''body='<div class="cl-say" data-say="1"></div><div class="cl-wallbar" data-wallbar hidden><span data-wallbar-n></span><button type="button" class="cl-wallread" data-wallread="1">✓ '+L("Mark all as read","Marcar todo como leído")+'</button></div><div class="cl-wall" data-wall="1"></div>';''')

# ---------- 3) library: show less ----------
R('''${more>0?`<button type="button" class="cl-rmore" data-rmore="1">${L("Show more","Ver más")} <span class="muted">(${more})</span></button>`:""}''',
  '''${more>0||RSHOW>8?`<div class="cl-rmrow">${more>0?`<button type="button" class="cl-rmore" data-rmore="1">${L("Show more","Ver más")} <span class="muted">(${more})</span></button>`:""}${RSHOW>8?`<button type="button" class="cl-rmore" data-rless="1">${L("Show less","Ver menos")}</button>`:""}</div>`:""}''')
R('''if(e.target.closest("[data-rmore]")) keep(()=>{ RSHOW+=8; }); });''',
  '''if(e.target.closest("[data-rmore]")) keep(()=>{ RSHOW+=8; });
    if(e.target.closest("[data-rless]")){ RSHOW=8; render(); const h=document.querySelector("#v-club .cl-rhead"); if(h) h.scrollIntoView({block:"start"}); } });''')

# ---------- 4) keep the tab after a refresh ----------
R('''let tab="week";''', '''let tab=(()=>{ try{ return sessionStorage.getItem("cs-club-tab")||"week"; }catch(e){ return "week"; } })();''')
R('''tab=t.dataset.clt; render(); return; }''', '''tab=t.dataset.clt; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(er){} render(); return; }''')
R('''window.__clubTab=k=>{ tab=k; render();''', '''window.__clubTab=k=>{ tab=k; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(er){} render();''')
R('''box.dataset.on="1"; box.innerHTML=`<iframe src="${box.dataset.src}"''',
  '''box.dataset.on="1"; box.innerHTML=`<iframe src="${box.id==="stFrame"?(()=>{ let v="overview"; try{ v=localStorage.getItem("cs-hub-view")||"overview"; }catch(er){} if(!["overview","students","money"].includes(v)) v="overview"; return box.dataset.src.split("#")[0]+"#"+v; })():box.dataset.src}"''')

_css = r'''
/* step151 */
.cl-wallbar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px;padding:8px 10px 8px 14px;border-radius:14px;border:1.5px solid color-mix(in srgb,var(--royal) 35%,var(--line));background:color-mix(in srgb,var(--royal) 8%,var(--surface));font:700 13.5px var(--body)}
.cl-wallread{all:unset;cursor:pointer;flex:none;padding:6px 12px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:700 13px var(--body)}
.cl-wallread:hover{border-color:var(--royal)}
#v-club .cl-rmrow{display:flex;gap:8px;margin-top:10px}
#v-club .cl-rmrow .cl-rmore{margin:0;flex:1}
.cl-newpoll>summary{display:none}
#v-club .cl-polls.empty{display:none}   /* no polls yet: the box was left empty once "Start a poll" moved into the post box */
.cl-newpoll.in-comp{margin:0 0 10px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step151: the poll form takes the place of the post box (and back) */
document.addEventListener("click",e=>{
  const tp=e.target.closest("[data-topoll]"), bk=e.target.closest("[data-topost]"); if(!tp&&!bk) return; e.preventDefault();
  if(tp){ const f=tp.closest("form"), d=document.querySelector("#v-club .cl-newpoll"); if(!f||!d) return;
    d.classList.add("in-comp"); f.parentNode.insertBefore(d,f); d.open=true; f.hidden=true; const ta=d.querySelector("textarea"); if(ta) ta.focus(); }
  else { const d=bk.closest(".cl-newpoll"), f=d&&d.nextElementSibling; if(d) d.open=false; if(f&&f.matches("form")) f.hidden=false; }
});
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)

# ---------- fix: the birthday row called window.__csFire() (it's an object, not a function) ----------
R('''e.uid!==(window.__csFire&&window.__csFire().uid&&window.__csFire().uid())''', '''e.uid!==(window.__csFire&&window.__csFire.uid&&window.__csFire.uid())''')
