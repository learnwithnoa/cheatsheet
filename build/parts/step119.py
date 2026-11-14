# step119 (Nov 13 2026):
#  1) 🔔 Notifications / 💬 Messages work like the Profile / Settings pop-up: one window, the tabs always switch, the bell opens/closes it
#  2) Club Library: no search box; filter pills by class (Deep Dive Monday, Wildcard Wednesday...), 8 at a time + "Show more"
#  3) 📸 Instagram group button back at the top right of the club page (next to "Noa's English Club"), on every tab

# ---------- 2) library ----------
R('''data-q="${esc(q)}"${open?" open":""}>''', '''data-q="${esc(q)}" data-cls="${esc(c.name||"")}"${open?" open":""}>''')
R('''    return recAddHTML(f)+`<div class="cl-rhead"><input type="search" class="cl-rsearch" data-recq="1" placeholder="${L("Search by topic, class or word…","Busca por tema, clase o palabra…")}" aria-label="${L("Search recordings","Buscar grabaciones")}"><span class="cl-rcount">${n}/${list.length} ${L("watched","vistas")}</span></div>
      <div class="cl-rlist">${list.map(it=>recCard(it,open===it.id)).join("")}</div><p class="cl-empty" data-rnone hidden>${L("No recordings match that.","Ninguna grabación coincide.")}</p>`; }''',
'''    const sorted=list.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    const names=[]; ((f.info||{}).schedule||[]).slice().sort((a,b)=>((a.wd+6)%7)-((b.wd+6)%7)).forEach(s=>{ if(s.name&&!names.some(x=>x.name===s.name)) names.push({name:s.name,ico:s.ico||""}); });
    sorted.forEach(it=>{ const nm=it.c.name; if(nm&&!names.some(x=>x.name===nm)) names.push({name:nm,ico:it.c.ico||""}); });
    if(RCLS&&!names.some(x=>x.name===RCLS)) RCLS="";
    const shown=RCLS?sorted.filter(it=>it.c.name===RCLS):sorted;
    if(open){ const k=shown.findIndex(it=>it.id===open); if(k>=RSHOW) RSHOW=Math.ceil((k+1)/8)*8; }
    const vis=shown.slice(0,RSHOW), more=shown.length-vis.length;
    const pill=(v,lab,cnt)=>`<button type="button" class="cl-rpill" data-rcls="${esc(v)}" aria-pressed="${RCLS===v}"${cnt===0?" disabled":""}>${lab}${cnt!=null?` <span class="cl-rpn">${cnt}</span>`:""}</button>`;
    const pills=names.length>1?`<div class="cl-rpills" role="group" aria-label="${L("Filter by class","Filtrar por clase")}">${pill("",L("All","Todas"),null)}${names.map(x=>pill(x.name,`${x.ico?`<span aria-hidden="true">${esc(x.ico)}</span> `:""}${esc(x.name)}`,sorted.filter(it=>it.c.name===x.name).length)).join("")}</div>`:"";
    return recAddHTML(f)+`<div class="cl-rhead">${pills}<span class="cl-rcount">${n}/${list.length} ${L("watched","vistas")}</span></div>
      <div class="cl-rlist">${vis.map(it=>recCard(it,open===it.id)).join("")}</div>${more>0?`<button type="button" class="cl-rmore" data-rmore="1">${L("Show more","Ver más")} <span class="muted">(${more})</span></button>`:""}${shown.length?"":`<p class="cl-empty">${L("No recordings of this class yet.","Todavía no hay grabaciones de esta clase.")}</p>`}`; }
  let RCLS="", RSHOW=8;
  document.addEventListener("click",e=>{ const pc=e.target.closest("[data-rcls]"); const keep=fn=>{ const y=window.scrollY; fn(); render(); window.scrollTo(0,y); }; if(pc){ keep(()=>{ RCLS=pc.dataset.rcls; RSHOW=8; }); return; } if(e.target.closest("[data-rmore]")) keep(()=>{ RSHOW+=8; }); });''')
_css = '''
/* step119: club Library filter pills + Show more */
#v-club .cl-rhead{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;flex-wrap:nowrap;margin:0 0 12px}
#v-club .cl-rpills{display:flex;flex-wrap:wrap;gap:6px;min-width:0}
#v-club .cl-rpill{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:700 13.5px var(--body);line-height:1.2;white-space:nowrap}
#v-club .cl-rpill:hover{border-color:var(--royal)}
#v-club .cl-rpill:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
#v-club .cl-rpill[aria-pressed="true"]{background:var(--gloss,var(--royal));border-color:transparent;color:#fff;text-shadow:0 1px 2px rgba(5,15,30,.35)}
#v-club .cl-rpill[disabled]{opacity:.45;cursor:default}
#v-club .cl-rpn{font:800 11.5px var(--body);opacity:.7}
#v-club .cl-rcount{flex:none;padding-top:7px;white-space:nowrap}
#v-club .cl-rmore{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;text-align:center;margin:10px 0 0;padding:10px 14px;border-radius:999px;border:1.5px dashed var(--line);font:700 14px var(--body);color:var(--ink)}
#v-club .cl-rmore:hover{border-color:var(--royal)}
@media (max-width:560px){#v-club .cl-rhead{flex-direction:column-reverse;gap:6px}#v-club .cl-rcount{padding-top:0;align-self:flex-end}
 #v-club .cl-rpills{flex-wrap:nowrap;overflow-x:auto;width:100%;scrollbar-width:none;padding-bottom:2px}#v-club .cl-rpills::-webkit-scrollbar{display:none}}
/* step119: Instagram group button at the top right of the club page */
#v-club .cl-h1row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
#v-club .cl-h1row>h1{margin-right:auto}
#v-club .cl-h1row>.cl-igtop{flex:none;margin:0}
@media (max-width:560px){#v-club .cl-h1row{flex-wrap:nowrap}#v-club .cl-h1row>.cl-igtop{width:40px;height:40px;padding:0;justify-content:center;border-radius:50%}#v-club .cl-h1row>.cl-igtop .cl-igl{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}#v-club .cl-h1row>.cl-igtop svg{width:19px;height:19px}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]

# ---------- 3) Instagram button ----------
R('''const row=v.querySelector(".cs-read-row"); if(!row) return false; let a=row.querySelector(".cl-igtop"); if(!a){ a=document.createElement("a"); a.className="cl-igtop"; a.href=IG_GROUP; a.target="_blank"; a.rel="noopener"; row.insertBefore(a,row.firstChild); }''',
  '''const h1=v.querySelector(":scope > h1, :scope > .cl-h1row > h1"); if(!h1) return false; let row=h1.parentElement.classList.contains("cl-h1row")?h1.parentElement:null; if(!row){ row=document.createElement("div"); row.className="cl-h1row"; h1.parentNode.insertBefore(row,h1); row.appendChild(h1); } let a=row.querySelector(".cl-igtop"); if(!a){ document.querySelectorAll("#v-club .cl-igtop").forEach(x=>x.remove()); a=document.createElement("a"); a.className="cl-igtop"; a.href=IG_GROUP; a.target="_blank"; a.rel="noopener"; row.appendChild(a); }''')

# ---------- 1) one Notifications / Messages window ----------
_js = r'''<script>
/* step119: 🔔 Notifications + 💬 Messages behave like one pop-up with two tabs (like Profile / Settings).
   This runs first on every click on the bell or a tab and does the whole job itself, so the older handlers can't undo it. */
(function(){
  const on=()=>document.documentElement.classList.contains("nm-on");
  function bell(){ const w=document.getElementById("clBellWrap"); if(w&&!w.hidden){ const b=document.getElementById("clBell"); if(b) return {k:"c",btn:b}; }
    const t=document.querySelector("#tNotif .tn-bell"); return t?{k:"t",btn:t}:null; }
  const vis=e=>!!e&&!e.hidden&&e.getClientRects().length>0;
  const notifOpen=()=>!!document.querySelector("#tNotif .tn-box")||vis(document.getElementById("clBellPanel"));
  const dmOpen=()=>!!document.getElementById("clDm");
  let last="n", passing=false;
  function pass(fn){ passing=true; window.__nmProg=true; try{ fn(); }finally{ passing=false; window.__nmProg=false; } }
  function openNotif(){ const b=bell(); if(!b||notifOpen()) return; pass(()=>b.btn.click()); }
  function closeNotif(){ if(!notifOpen()) return; const x=document.querySelector('#tNotif [data-tn="hide"]'); if(x) return pass(()=>x.click()); const b=bell(); if(b&&b.k==="c") pass(()=>b.btn.click()); }
  function closeDm(){ if(!dmOpen()) return; if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); }
  function openDm(){ if(dmOpen()||!window.__clubInbox) return; window.__clubInbox(); }
  function show(t){ last=t; if(t==="m"){ closeNotif(); openDm(); } else { closeDm(); openNotif(); } }   /* both happen before the next paint, so the page never shows through */
  function closeAll(){ closeDm(); closeNotif(); }
  window.addEventListener("click",e=>{ if(passing||!on()||!e.target.closest) return;
    const tab=e.target.closest("[data-nm]"), x=e.target.closest("[data-nmclose]"), b=bell(), onBell=b&&b.btn.contains(e.target);
    if(!tab&&!x&&!onBell) return;
    e.preventDefault(); e.stopImmediatePropagation();
    ["authPanel:authClose","musicPanel:musicClose","tmPanel:tmClose"].forEach(p=>{ const [pid,cid]=p.split(":"); if(vis(document.getElementById(pid))){ const c=document.getElementById(cid); if(c) pass(()=>c.click()); } });
    if(x){ closeAll(); if(b) b.btn.focus(); return; }
    if(tab){ if(tab.getAttribute("aria-selected")!=="true") show(tab.dataset.nm); return; }
    if(notifOpen()||dmOpen()) closeAll(); else show(last);
  },true);
  /* the 💬 inside a profile or post ("Send a message") still opens Messages directly; remember it as the last tab */
  document.addEventListener("click",e=>{ if(e.target.closest&&e.target.closest("[data-dminbox],[data-dmto]")) last="m"; },true);
})();
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
R('''${L("Instagram group","Grupo de Instagram")}`; a.hidden=!feed();''', '''<span class="cl-igl">${L("Instagram group","Grupo de Instagram")}</span>`; a.title=L("Join our Instagram group","Únete a nuestro grupo de Instagram"); a.hidden=!feed();''')
