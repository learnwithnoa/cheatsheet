# step172 (Nov 17 2026):
# - Practice → Grammar always opens on all topics (the Verb tenses folder only stays open when you come back from one of its modules)
# - Noa only: a 💡 Recommend pill inside each module: the whole module or one stage, to any members, with a message
# - recommendation messages can link straight to a module (#quiz/grammar/past-simple)
R('''  window.__prHash=()=>hashFor(cur);''', '''  window.__prHash=()=>hashFor(cur);
  window.__prMod=()=>({id:M,name:MODS[M].name,stages:MODS[M].stages.map(st=>({n:st.n,t:st.t,adv:!!st.adv})),path:hashFor("ps").slice(1)});''')
R('''if(g) g.addEventListener("click",()=>{ dl.close(); if(window.csGo) window.csGo(m.go); });''',
  '''if(g) g.addEventListener("click",()=>{ dl.close(); if(String(m.go).includes("/")) location.hash="#"+m.go; else if(window.csGo) window.csGo(m.go); });''')
_js = r'''<script>
/* step172: Grammar opens on all topics */
document.addEventListener("click",e=>{ const g=e.target.closest('[data-pr="gram"]'); if(!g||g.closest('.pr-panel[data-pp="gram"]')) return;
  const b=document.querySelector('.pr-panel[data-pp="gram"] [data-gfback]'), box=b&&b.closest(".pr-fbox"); if(box&&!box.hidden) b.click(); },true);
/* step172: Noa only, 💡 Recommend a module (or one stage) from inside it */
(function(){
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  function place(){
    const pan=document.querySelector('#v-quiz .pr-panel[data-pp="ps"]'); if(!pan) return; const h=pan.querySelector("#psTitle");
    let b=pan.querySelector(".ps-recbtn"); const on=!!window.__csTeacher&&!window.__csPreview&&!window.__csViewAsMode;
    if(!on){ if(b) b.remove(); return; }
    if(!b&&h){ b=document.createElement("button"); b.type="button"; b.className="star-btn ps-recbtn"; b.title="Recommend this module or one stage to members (only you see this)";
      b.innerHTML='<span aria-hidden="true">💡</span><span class="star-txt">Recommend</span>'; h.insertAdjacentElement("beforebegin",b); }
  }
  document.addEventListener("cs-teacher",place); document.addEventListener("cs-preview",place); setInterval(place,1500); setTimeout(place,1200);
  let people=null;
  document.addEventListener("click",async e=>{
    if(!e.target.closest(".ps-recbtn")||!window.__csTeach||!window.__prMod) return; e.preventDefault();
    const md=window.__prMod();
    const dlg=window.csDialog(`<h3 style="margin-top:0">💡 Recommend “${esc(md.name)}”</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">What should they practise?</p>
      <div class="rec-chips ps-recscope"><button type="button" data-rs="all" aria-pressed="true">The whole module</button>${md.stages.map(s=>`<button type="button" data-rs="${s.n}" aria-pressed="false">${s.adv?"⭐ ":""}Stage ${s.n} · ${esc(s.t)}</button>`).join("")}</div>
      <div class="rec-f" style="margin-top:12px"><input type="search" id="psrQ" placeholder="Search a name…" autocomplete="off"><div class="rec-chips">${[["all","All"],["private","🌳 Private"],["both","🌳🌼 Both"],["club","🌼 Club"]].map(([k,l],i)=>`<button type="button" data-rk="${k}" aria-pressed="${i?"false":"true"}">${l}</button>`).join("")}</div></div>
      <div class="rec-list" id="psrList"><p class="muted">Loading everyone…</p></div>
      <label class="muted" for="psrMsg" style="font-size:13px;display:block;margin-top:10px">Message (“{name}” becomes their first name). It pops up with an <b>Open it →</b> button, and it also shows under “Noa recommends” in their Practice:</label>
      <textarea id="psrMsg" rows="3" style="width:100%;box-sizing:border-box"></textarea>
      <div class="note-actions" style="margin-top:10px"><button class="pill-btn pill-green" type="button" id="psrSend" disabled>Send 💡</button><span class="muted" id="psrN" style="font-size:13px">Pick at least one person</span></div>`,{cls:"rec-dlg"});
    const el=dlg.el; let kind="all", q="", scope="all";
    const msgFor=()=>scope==="all"?`Hi {name}! 💡 Try the “${md.name}” module in Practice on Hibi. I think it'll really help you. – Noa`:`Hi {name}! 💡 Try stage ${scope} of “${md.name}” in Practice on Hibi (${(md.stages.find(s=>String(s.n)===String(scope))||{}).t||""}). I think it'll really help you. – Noa`;
    let edited=false; const ta=el.querySelector("#psrMsg"); ta.value=msgFor(); ta.addEventListener("input",()=>{ edited=true; });
    try{ people=people||await window.__csTeach.people(); }catch(err){ people=[]; }
    const count=()=>{ const n=el.querySelectorAll("#psrList input:checked").length; el.querySelector("#psrSend").disabled=!n; el.querySelector("#psrN").textContent=n?n+(n===1?" person":" people"):"Pick at least one person"; };
    const draw=()=>{ const L=el.querySelector("#psrList"), sel=new Set([...L.querySelectorAll("input:checked")].map(i=>i.value));
      const ps=people.filter(p=>(kind==="all"||p.kind===kind)&&(!q||p.name.toLowerCase().includes(q)));
      L.innerHTML=ps.map(p=>`<label class="rec-p"><input type="checkbox" value="${esc(p.uid)}" ${sel.has(p.uid)?"checked":""}> ${p.kind==="private"?"🌳":p.kind==="both"?"🌳🌼":"🌼"} ${esc(p.name)}</label>`).join("")||`<p class="muted">Nobody here.</p>`; count(); };
    draw();
    el.addEventListener("input",ev=>{ if(ev.target.id==="psrQ"){ q=ev.target.value.toLowerCase().trim(); draw(); } });
    el.addEventListener("change",ev=>{ if(ev.target.matches("#psrList input")) count(); });
    el.addEventListener("click",async ev=>{
      const s=ev.target.closest("[data-rs]"); if(s){ scope=s.dataset.rs; el.querySelectorAll("[data-rs]").forEach(x=>x.setAttribute("aria-pressed",x===s)); if(!edited) ta.value=msgFor(); return; }
      const c=ev.target.closest("[data-rk]"); if(c){ kind=c.dataset.rk; el.querySelectorAll("[data-rk]").forEach(x=>x.setAttribute("aria-pressed",x===c)); draw(); return; }
      if(!ev.target.closest("#psrSend")) return;
      const uids=[...el.querySelectorAll("#psrList input:checked")].map(i=>i.value), tpl=ta.value.trim(), n=scope==="all"?"all":+scope; let ok=0;
      ev.target.disabled=true;
      for(const u of uids){ const p=people.find(x=>x.uid===u); try{ await window.__csTeach.modrec(u,md.id,n); if(tpl) await window.__csTeach.send(u,tpl.replace(/\{name\}/g,(p&&p.name||"").split(" ")[0]),md.path); ok++; }catch(err){ console.warn(err); } }
      dlg.close(); if(typeof window.toast==="function") window.toast(ok?`💡 Recommended to ${ok} ${ok===1?"person":"people"}`:"Couldn't send. Try again.");
    });
  });
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
/* step172: Recommend pill inside a module (Noa only) */
#v-quiz .ps-recbtn{float:right;margin:6px 0 0 10px}
.ps-recscope{display:flex;flex-wrap:wrap;gap:6px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
