# builds music.js (Study music for the teacher pages) from the player inside site/index.html, so both always match
import re
s=open('site/index.html').read()
i=s.find('<div class="music-wrap">'); depth=0
for m in re.finditer(r'<div\b|</div>',s[i:]):
    depth+= 1 if m.group(0)=='<div' else -1
    if depth==0: end=i+m.end(); break
html=s[i:end]
a=s.find('/* ---------------- study music'); b=s.find('(function(){',a)
# find the end of this IIFE: the first "\n})();" at column 0 after b
e=s.find('\n})();',b)+len('\n})();')
js=s[b:e]
css='''
.music-wrap{position:relative;display:inline-flex}
.music-wrap .music-btn{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 13px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:700 14px var(--body);cursor:pointer}
.music-wrap .music-btn:hover{border-color:var(--royal)}
.music-wrap .eq{display:inline-flex;gap:2px;align-items:flex-end;height:13px}
.music-wrap .eq i{width:3px;border-radius:2px;height:6px;background:#7CC4FF}.music-wrap .eq i:nth-child(2){height:12px;background:#2F8CF0}.music-wrap .eq i:nth-child(3){height:9px;background:#1D4ED8}
.music-wrap .music-btn.on .eq i{animation:tmEq .9s ease-in-out infinite alternate}.music-wrap .music-btn.on .eq i:nth-child(2){animation-delay:.25s}.music-wrap .music-btn.on .eq i:nth-child(3){animation-delay:.5s}
@keyframes tmEq{from{transform:scaleY(.45)}to{transform:scaleY(1)}}
.cs-calm .music-wrap .eq i{animation:none!important}
#musicPanel{position:absolute;right:0;top:44px;width:min(340px,calc(100vw - 24px));z-index:80;background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:16px;padding:14px;box-shadow:0 14px 40px rgba(0,0,0,.28);text-align:left}
#musicPanel[hidden]{display:none}
#musicPanel .qa-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}#musicPanel h3{margin:0;font:800 17px var(--display,var(--body))}
#musicPanel .qa-x{background:none;border:0;font-size:22px;line-height:1;color:var(--muted);cursor:pointer}
#musicPanel .music-play{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px;border-radius:12px;border:0;background:var(--royal);color:#fff;font:800 15px var(--body);cursor:pointer;margin-bottom:10px}
#musicPanel .chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
#musicPanel .chip{padding:6px 11px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface-2);color:var(--ink);font:700 13px var(--body);cursor:pointer}
#musicPanel .chip[aria-checked="true"]{background:var(--royal);border-color:var(--royal);color:#fff}
#musicPanel .vol{display:flex;align-items:center;gap:8px;font-size:13px;margin:6px 0}#musicPanel .vol input{flex:1}#musicPanel .vol[hidden]{display:none}
#musicPanel .vol-lbl{font-weight:800;min-width:52px}#musicPanel .bal-end{font-size:12px;color:var(--muted)}
#musicPanel .music-note{font-size:13px;color:var(--muted);margin:8px 0 0}#musicPanel .music-note[hidden]{display:none}
@media (max-width:640px){.music-wrap .music-btn .theme-txt{display:none}}
'''
shim='''if(!window.LS) window.LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
  const LS=window.LS; const toast=window.toast||function(t){ console.log(t); };'''
css += '''
#musicBtn .mu-ico{display:inline-flex;color:#2F8CF0}#musicBtn .eq{display:none}#musicBtn.used .mu-ico{display:none}#musicBtn.used .eq{display:inline-flex}
.music-wrap .music-btn{width:36px;padding:0;justify-content:center}
.music-wrap .sr-only{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.mu-wait{animation:muWait 1.4s ease-in-out infinite}@keyframes muWait{50%{box-shadow:0 0 0 4px rgba(59,130,246,.35)}}
#musicModes .mm-cat{flex-basis:100%;margin:6px 0 0;font:800 11.5px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}#musicModes .mm-cat:first-child{margin-top:0}
.music-panel .qa-x{all:unset;box-sizing:border-box;cursor:pointer;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;font-size:24px;line-height:1;color:var(--muted)}.music-panel .qa-x:hover{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}
.tb-bw{position:relative;display:inline-flex}
.tb-bell{position:relative;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;border:1.5px solid var(--line);background:var(--surface);text-decoration:none;font-size:16px;flex:none;cursor:pointer;padding:0}
.tb-pop{position:absolute;top:calc(100% + 10px);right:0;z-index:60;width:min(480px,calc(100vw - 24px));height:min(72vh,640px);border-radius:16px;border:1.5px solid var(--line);background:var(--surface);box-shadow:0 18px 44px rgba(5,15,30,.35);overflow:hidden}
.tb-pop[hidden]{display:none}
.tb-pop iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:transparent}
.tb-load{position:absolute;inset:0;margin:0;padding:18px;color:var(--muted);background:var(--surface);z-index:1}.tb-load a{color:var(--royal,#3b82f6)}
@media (max-width:640px){.tb-pop{position:fixed;left:12px;right:12px;width:auto;top:64px}}
.tb-bell:hover{border-color:var(--royal,#3b82f6)}
.tb-bell b{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:999px;background:#E5533D;color:#fff;font:800 11px/18px system-ui,sans-serif;text-align:center}
'''
bell='''/* 🔔 your notifications: the same pop-up as on Home, opened right here */
  (function(){ let n=0; try{ n=+localStorage.getItem("cs-tn-count")||0; }catch(e){}
    const w=document.createElement("div"); w.className="tb-bw";
    w.innerHTML='<button type="button" class="tb-bell" aria-expanded="false" aria-haspopup="dialog" title="Notifications">🔔</button><div class="tb-pop" hidden><p class="tb-load">Loading…</p></div>';
    const btn=w.querySelector(".tb-bell"), pop=w.querySelector(".tb-pop");
    const badge=k=>{ let b=btn.querySelector("b"); if(k){ if(!b){ b=document.createElement("b"); btn.appendChild(b); } b.textContent=k>9?"9+":k; } else if(b) b.remove(); btn.setAttribute("aria-label","Notifications"+(k?" ("+k+" new)":"")); };
    badge(n);
    const close=()=>{ pop.hidden=true; btn.setAttribute("aria-expanded","false"); };
    btn.addEventListener("click",()=>{ if(!pop.hidden){ close(); return; } pop.hidden=false; btn.setAttribute("aria-expanded","true");
      if(!pop.querySelector("iframe")){ const f=document.createElement("iframe"); f.src="index.html?np=1"; f.title="Notifications"; pop.appendChild(f); setTimeout(()=>{ const l=pop.querySelector(".tb-load"); if(l) l.innerHTML='Still loading… <a href="index.html?notif=1">Open on Home →</a>'; },12000); } });
    document.addEventListener("click",e=>{ if(!pop.hidden&&!w.contains(e.target)) close(); });
    document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!pop.hidden) close(); });
    window.addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data||!e.data.tn) return; if(e.data.close) close(); if(typeof e.data.n==="number"){ const l=pop.querySelector(".tb-load"); if(l) l.remove(); badge(e.data.n); try{ localStorage.setItem("cs-tn-count",String(e.data.n)); }catch(er){} } });
    const mw=document.querySelector(".music-wrap"); if(mw) mw.insertAdjacentElement("afterend",w); })();'''
out='''/* Study music for the teacher pages (Hibi members, Private students).
   GENERATED from the player in index.html by gen_music.py, so both always sound and work the same. Don't edit by hand. */
(function(){
  if(document.getElementById("musicBtn")) return;
  const st=document.createElement("style"); st.textContent=%s; document.head.appendChild(st);
  const host=document.getElementById("csWrap"); if(!host) return;
  host.insertAdjacentHTML("beforebegin",%s);
  %s
  %s
  %s
})();
''' % (repr(css).replace("\\n","\\n"), repr(html), shim, js, bell)
open('../music.js','w').write(out)
print('music.js', len(out))
