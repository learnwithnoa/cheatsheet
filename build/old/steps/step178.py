# step178 (Nov 17 2026): Home order + "✏️ Arrange" (move sections up/down, hide them; saved to the account: ncs-homeorder)
# default: Daily Stoic → This week in the club → Word of the day + Thought → Around the world → Words to review
R('''  <p class="lede">Your word of the day, a thought for today and what's new in the club.</p>''',
  '''  <p class="lede hm-lede"><span>Your word of the day, a thought for today, little news from around the world and what's new in the club.</span><button type="button" class="hm-arr" id="hmArrange" aria-haspopup="dialog">✏️ Arrange</button></p>''')
_css = r'''
/* step178: arrange Home */
.hm-lede{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.hm-arr{all:unset;cursor:pointer;flex:none;font:700 13px var(--body);padding:4px 11px;border-radius:999px;border:1.5px solid var(--line);color:var(--ink)}
.hm-arr:focus-visible{outline:3px solid var(--bright)}
.hm-off{display:none!important}
.hm-list{list-style:none;margin:10px 0;padding:0;display:grid;gap:6px}
.hm-list li{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1.5px solid var(--line);border-radius:12px}
.hm-list li.off span{opacity:.45;text-decoration:line-through}
.hm-list span{flex:1;font-weight:700}
.hm-list button{all:unset;cursor:pointer;width:32px;height:32px;display:grid;place-items:center;border-radius:9px;border:1.5px solid var(--line);font-size:14px}
.hm-list button[disabled]{opacity:.3;cursor:default}
.hm-list button:focus-visible{outline:3px solid var(--bright)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step178: Home order + ✏️ Arrange */
(function(){
  const K="ncs-homeorder", DEF=["stoic","club","today","world","review"];
  const S={stoic:["tStoic","🏛️ Daily Stoic"],club:["homeClub","💬 This week in the club"],today:["todayBox","📖 Word of the day + Thought for today"],world:["awBox","🌍 Around the world today"],review:["rvBox","🔁 Words to review today"]};
  const get=()=>{ let v=null; try{ v=JSON.parse(localStorage.getItem(K)||"null"); }catch(e){} v=v&&typeof v==="object"?v:{}; const o=(Array.isArray(v.order)?v.order:[]).filter(k=>S[k]); DEF.forEach(k=>{ if(!o.includes(k)) o.splice(DEF.indexOf(k),0,k); }); return {order:o,hide:(Array.isArray(v.hide)?v.hide:[]).filter(k=>S[k])}; };
  const put=v=>{ try{ localStorage.setItem(K,JSON.stringify(v)); }catch(e){} try{ window.__csOnSet&&window.__csOnSet(K); }catch(e){} };
  function apply(){
    const v=get(), view=document.getElementById("v-notes"); if(!view) return;
    const anchor=view.querySelector(".lede-es")||view.querySelector(".hm-lede"); if(!anchor) return;
    let after=anchor;
    v.order.forEach(k=>{ const el=document.getElementById(S[k][0]); if(!el) return; if(after.nextElementSibling!==el) after.insertAdjacentElement("afterend",el); after=el; el.classList.toggle("hm-off",v.hide.includes(k)); });
  }
  const avail=k=>{ const el=document.getElementById(S[k][0]); if(!el) return false; if(k==="stoic") return !el.hidden||get().hide.includes(k); if(k==="club") return !!window.__csClub||get().hide.includes(k); return true; };
  function open(){
    if(!window.csDialog) return;
    const dl=window.csDialog(`<h3 style="margin:0 0 4px">✏️ Arrange your Home</h3><p class="muted" style="margin:0;font-size:14px">Move sections up or down, or hide the ones you don't need. Only you see this order.</p><ul class="hm-list" id="hmList"></ul><div class="note-actions"><button type="button" class="pill-btn pill-green" data-hmdone>Done</button><button type="button" class="swap" data-hmreset>Back to default</button></div>`);
    const L=dl.el.querySelector("#hmList");
    const draw=()=>{ const v=get(), ks=v.order.filter(avail);
      L.innerHTML=ks.map((k,i)=>{ const off=v.hide.includes(k); return `<li class="${off?"off":""}"><span>${S[k][1]}</span><button type="button" data-hmup="${k}" ${i?"":"disabled"} aria-label="Move up">↑</button><button type="button" data-hmdn="${k}" ${i<ks.length-1?"":"disabled"} aria-label="Move down">↓</button><button type="button" data-hmhide="${k}" aria-pressed="${off}" aria-label="${off?"Show":"Hide"}" title="${off?"Show":"Hide"}">${off?"🙈":"👁"}</button></li>`; }).join(""); };
    draw();
    dl.el.addEventListener("click",e=>{
      const v=get(), ks=v.order.filter(avail);
      const mv=(k,d)=>{ const a=ks.indexOf(k), b=a+d; if(b<0||b>=ks.length) return; const x=ks[b]; const i1=v.order.indexOf(k), i2=v.order.indexOf(x); v.order[i1]=x; v.order[i2]=k; put(v); apply(); draw(); const f=L.querySelector(`[data-hm${d<0?"up":"dn"}="${k}"]`); if(f&&!f.disabled) f.focus(); };
      const u=e.target.closest("[data-hmup]"); if(u) return mv(u.dataset.hmup,-1);
      const dn=e.target.closest("[data-hmdn]"); if(dn) return mv(dn.dataset.hmdn,1);
      const h=e.target.closest("[data-hmhide]"); if(h){ const k=h.dataset.hmhide; v.hide=v.hide.includes(k)?v.hide.filter(x=>x!==k):v.hide.concat(k); put(v); apply(); draw(); return; }
      if(e.target.closest("[data-hmreset]")){ put({order:DEF.slice(),hide:[]}); apply(); draw(); return; }
      if(e.target.closest("[data-hmdone]")) dl.close();
    });
  }
  document.addEventListener("click",e=>{ if(e.target.closest("#hmArrange")){ e.preventDefault(); open(); } });
  apply(); document.addEventListener("DOMContentLoaded",apply);
  window.addEventListener("cs-auth",()=>setTimeout(apply,1500)); document.addEventListener("cs-club",apply);
  window.addEventListener("storage",e=>{ if(e.key===K) apply(); });
  window.__csHomeApply=apply;
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
# tour line
R('''      <li><span class="wl-ico" aria-hidden="true">🌍</span><div><b>Around the world today</b>''',
  '''      <li><span class="wl-ico" aria-hidden="true">✏️</span><div><b>Make Home yours:</b> tap <b>✏️ Arrange</b> at the top of Home to move sections up or down, or hide the ones you don't need.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🌍</span><div><b>Around the world today</b>''')
