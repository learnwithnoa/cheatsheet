# step181 (Nov 17 2026): the welcome tour gets a "Make it yours" step right after "Your level":
# pick a theme, text size, Simple mode and Calm mode (same switches as Settings)
R('''<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>''',
  '''<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>''')
_i = s.index('<div class="wl-step" data-step="2" hidden>')
s = s[:_i] + '''<div class="wl-step" data-step="1b" hidden>
    <h2>Make it <em>yours</em> ✨</h2>
    <p class="wl-lede">Pick what feels good. You can change all of this later in <b>Settings</b> (your picture, top right).</p>
    <div class="wlm-row"><b class="wlm-l">Colors</b><div class="wlm-seg" id="wlmTheme" role="group" aria-label="Colors"><button type="button" data-wlth="dark">☾ Dark</button><button type="button" data-wlth="light">☀ Light</button><button type="button" data-wlth="sepia">📖 Sepia</button><button type="button" data-wlth="midnight">🌑 Midnight</button><button type="button" data-wlth="unicorn">🦄 Unicorn</button></div></div>
    <div class="wlm-row"><b class="wlm-l">Text size</b><div class="wlm-seg" id="wlmSize" role="group" aria-label="Text size"><button type="button" data-wlsz="1">Aa Normal</button><button type="button" data-wlsz="1.2" style="font-size:1.1em">Aa Bigger</button><button type="button" data-wlsz="1.35" style="font-size:1.2em">Aa Biggest</button></div></div>
    <label class="wlm-tog"><input type="checkbox" id="wlmSimple"><span><b>🧩 Simple mode</b><small>Just the main pages, with big buttons. Everything else is under ☰ More. Good if Hibi feels like a lot.</small></span></label>
    <label class="wlm-tog"><input type="checkbox" id="wlmCalm"><span><b>🌙 Calm mode</b><small>No animations, softer colors and fewer pop-ups.</small></span></label>
  </div>

  ''' + s[_i:]
_css = r'''
/* step181: welcome tour, "Make it yours" */
.wlm-row{margin:12px 0}
.wlm-l{display:block;font-weight:800;margin-bottom:6px}
.wlm-seg{display:flex;flex-wrap:wrap;gap:6px}
.wlm-seg button{all:unset;box-sizing:border-box;cursor:pointer;font:700 14px var(--body);padding:8px 12px;border-radius:999px;border:2px solid var(--line);background:var(--surface-2)}
.wlm-seg button[aria-pressed="true"]{border-color:var(--green);background:var(--green-soft)}
.wlm-seg button:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
.wlm-tog{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;margin:8px 0;border-radius:14px;border:2px solid var(--line);background:var(--surface-2);cursor:pointer}
.wlm-tog input{width:20px;height:20px;margin:2px 0 0;flex:none;accent-color:var(--green)}
.wlm-tog b{display:block;font-weight:800}.wlm-tog small{display:block;color:var(--muted);font-size:14px;line-height:1.35;margin-top:2px}
.wlm-tog:has(input:checked){border-color:var(--green);background:var(--green-soft)}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
_js = r'''<script>
/* step181: "Make it yours" in the welcome tour uses the same switches as Settings */
(function(){
  const wl=document.getElementById("welcome"); if(!wl) return;
  const $=id=>document.getElementById(id);
  const theme=()=>{ try{ const v=JSON.parse(localStorage.getItem("ncs-theme")||'"dark"'); return v||"dark"; }catch(e){ return localStorage.getItem("ncs-theme")||"dark"; } };
  const size=()=>{ try{ return +(window.csComfort&&window.csComfort.get().size)||1; }catch(e){ return 1; } };
  function paint(){
    wl.querySelectorAll("[data-wlth]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.wlth===theme())));
    const sz=size(); wl.querySelectorAll("[data-wlsz]").forEach(b=>b.setAttribute("aria-pressed",String(Math.abs(+b.dataset.wlsz-sz)<.06||(b.dataset.wlsz==="1.35"&&sz>1.3)||(b.dataset.wlsz==="1"&&sz<1.05))));
    const s=$("wlmSimple"); if(s) s.checked=!!(window.csSimple&&window.csSimple.on());
    const c=$("wlmCalm"); if(c) c.checked=document.documentElement.classList.contains("cs-calm");
  }
  function setSize(t){ const SIZES=[.8,.9,1,1.1,1.2,1.35,1.5]; let n=0; const go=()=>{ const cur=size(); if(Math.abs(cur-t)<.01||n++>8) return paint(); const b=$(cur<t?"csBigger":"csSmaller"); if(!b) return paint(); b.click(); setTimeout(go,0); }; go(); }
  wl.addEventListener("click",e=>{
    const th=e.target.closest("[data-wlth]"); if(th){ const b=document.querySelector('#csThemes [data-cstheme="'+th.dataset.wlth+'"]'); if(b) b.click(); setTimeout(paint,50); return; }
    const sz=e.target.closest("[data-wlsz]"); if(sz){ setSize(+sz.dataset.wlsz); return; }
  });
  wl.addEventListener("change",e=>{
    if(e.target.id==="wlmSimple"){ if(window.csSimple) window.csSimple.set(e.target.checked); }
    if(e.target.id==="wlmCalm"){ const c=$("csCalm"); if(c){ c.checked=e.target.checked; c.dispatchEvent(new Event("change",{bubbles:true})); } }
    setTimeout(paint,50);
  });
  new MutationObserver(()=>{ if(!wl.hidden) paint(); }).observe(wl,{attributes:true,attributeFilter:["hidden"],subtree:true});
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
