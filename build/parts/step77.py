# step77: open tabs find out when Hibi was updated (so nobody keeps using an old version for hours)
import time as _t, json as _j
_bid = _t.strftime("%Y%m%d%H%M%S")
open('../version.json','w').write(_j.dumps({"v":_bid})+"\n")
upd = '''<script>
/* ---- a newer Hibi is online: refresh quietly when it's safe, or offer a button ---- */
(function(){ const BUILD="''' + _bid + '''"; let hiddenAt=0, shown=false;
  const busy=()=>{ const a=document.activeElement; return !!(a&&(a.matches("textarea,input[type=text],input:not([type]),[contenteditable=true]")&&String(a.value||a.textContent||"").trim())) || !!document.querySelector(".ps-q:not([hidden]) input, dialog[open], .cs-dlg"); };
  async function latest(){ try{ const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"}); if(!r.ok) return null; const j=await r.json(); return j&&j.v||null; }catch(e){ return null; } }
  function offer(){ if(shown) return; shown=true; const b=document.createElement("div"); b.className="cs-upd"; b.setAttribute("role","status");
    b.innerHTML='<span>✨ Hibi just got an update.</span><button type="button" class="cs-upd-go">Refresh</button><button type="button" class="cs-upd-x" aria-label="Later">×</button>';
    b.querySelector(".cs-upd-go").onclick=()=>location.reload(); b.querySelector(".cs-upd-x").onclick=()=>b.remove(); document.body.appendChild(b); }
  async function check(back){ const v=await latest(); if(!v||v<=BUILD) return; if(back&&!busy()) { location.reload(); return; } offer(); }
  window.csCheckUpdate=()=>check(false);
  document.addEventListener("visibilitychange",()=>{ if(document.hidden){ hiddenAt=Date.now(); return; } const away=hiddenAt?Date.now()-hiddenAt:0; check(away>20*60*1000); });
  setInterval(()=>{ if(!document.hidden) check(false); },30*60*1000);
  setTimeout(()=>check(false),60*1000);
})();
</script>
'''
css77 = '''.cs-upd{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 16px;border-radius:999px;background:var(--surface,#16203a);color:inherit;border:1.5px solid var(--accent,#5b8def);box-shadow:0 10px 30px rgba(0,0,0,.35);font:600 14.5px var(--body,inherit);max-width:calc(100vw - 24px)}
.cs-upd-go{border:0;border-radius:999px;padding:6px 14px;font:700 14px var(--body,inherit);background:var(--accent,#5b8def);color:#fff;cursor:pointer}
.cs-upd-x{border:0;background:none;color:var(--muted);font-size:20px;line-height:1;cursor:pointer;padding:2px 6px}
'''
_k = s.index('</style>'); s = s[:_k] + css77 + s[_k:]
_i = s.rfind('</body>'); s = (s[:_i] + upd + s[_i:]) if _i >= 0 else (s + upd)
R('''    if(e&&e.code==="rate_limited"){ trOut.textContent="The translator is busy right now.''','''    if(window.csCheckUpdate) window.csCheckUpdate();
    if(e&&e.code==="rate_limited"){ trOut.textContent="The translator is busy right now.''')
