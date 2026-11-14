# step90: find people by their current name; centered avatars everywhere; initials only from letters; GIFs in messages play; GIF picker cells don't overlap; tap a photo to see it big + download
R('''const ini=String(name||"?").trim().split(/\\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();''',
  '''const ini=String(name||"?").trim().split(/\\s+/).map(w=>(w.match(/[\\p{L}\\p{N}]/u)||[""])[0]).filter(Boolean).slice(0,2).join("").toUpperCase();''')
R('''function dmPeople(){ const out=new Map(), add=(u,n)=>{ if(!u||u===me()||out.has(u)) return; out.set(u,n||(profOf(u)||{}).name||""); };''',
  '''function dmPeople(){ const out=new Map(), add=(u,n)=>{ if(!u||u===me()) return; if(n){ const al=DMALIAS.get(u)||new Set(); al.add(n); DMALIAS.set(u,al); } if(out.has(u)) return; out.set(u,(profOf(u)||{}).name||n||""); };''')
R('''  async function openInbox(){ const o=dmPanel()''','''  const DMALIAS=new Map();  /* every name we've seen for a person (club profile, roster, old posts), so the search finds them by any of them */
  async function openInbox(){ if(!PROFS) loadProfs().then(()=>{ const i=document.getElementById("dmFind"); if(i&&i.value.trim()) i.dispatchEvent(new Event("input",{bubbles:true})); }).catch(()=>{}); const o=dmPanel()''')
R('''const hits=dmPeople().filter(([,n])=>fold(n).split(/\\s+/).some(w=>w.startsWith(q))||fold(n).includes(q))''',
  '''const hits=dmPeople().filter(([u,n])=>[n,...(DMALIAS.get(u)||[])].some(x=>fold(x).split(/\\s+/).some(w=>w.startsWith(q))||fold(x).includes(q)))''')
R('''nm=(t.names||{})[u]||(profOf(u)||{}).name||L("Member","Miembro");''','''nm=(profOf(u)||{}).name||(t.names||{})[u]||L("Member","Miembro");''')
R('''${(m.gifs||[]).map(g=>`<img src="${esc(g.url||g)}" alt="GIF" class="cl-msgimg">`).join("")}''',
  '''${(m.gifs||[]).map(g=>{ const s=typeof g==="string"?g:(g&&(g.u||g.url||g.s))||""; return /^https:\\/\\/media\\d*\\.giphy\\.com\\//.test(s)?`<img src="${esc(s)}" alt="${esc((g&&g.t)||"GIF")}" class="cl-msgimg cl-msggif" loading="lazy">`:""; }).join("")}''')
# the wall's photo viewer gets the same Download button
R('''const o=document.createElement("div"); o.className="cs-lb"; o.setAttribute("role","dialog"); o.setAttribute("aria-label","Photo"); o.innerHTML=`<img src="${d}" alt="Photo"><button type="button" aria-label="Close">✕</button>`; o.addEventListener("click",()=>o.remove()); document.body.appendChild(o); o.querySelector("button").focus(); return; }''',
  '''if(window.__csLightbox) window.__csLightbox(d); return; }''')
_css = '''
/* step90 */
span.cs-av{display:grid!important;place-items:center!important;flex-direction:row!important;line-height:1!important;text-align:center;overflow:hidden}
.cs-gg{grid-auto-rows:104px;flex:none}
.cs-gi{display:block!important;position:relative;aspect-ratio:auto!important;height:100%;background:color-mix(in srgb,var(--ink) 6%,transparent)}
.cs-gi img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}
.cl-msgimg{cursor:zoom-in}
.cs-lb{flex-direction:column;gap:12px}
.cs-lb img{max-height:calc(100% - 64px)}
.cs-lb .cs-lbdl{all:unset;position:fixed;top:14px;right:64px;height:40px;padding:0 16px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;font:700 14.5px var(--body,inherit);display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.cs-lb .cs-lbdl:hover,.cs-lb .cs-lbdl:focus-visible{background:rgba(255,255,255,.3)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step90: tap any photo in messages to see it big, with a Download button (the wall uses the same viewer) */
(function(){
  function ext(src){ const m=/^data:image\/(\w+)/.exec(src); if(m) return m[1]==="jpeg"?"jpg":m[1]; const n=/\.(gif|png|jpe?g|webp)(\?|$)/i.exec(src); return n?n[1].toLowerCase().replace("jpeg","jpg"):"jpg"; }
  async function dl(src){ const name="hibi-photo-"+new Date().toISOString().slice(0,10)+"."+ext(src);
    try{ let href=src; if(!/^data:|^blob:/.test(src)){ const r=await fetch(src,{mode:"cors"}); href=URL.createObjectURL(await r.blob()); }
      const a=document.createElement("a"); a.href=href; a.download=name; document.body.appendChild(a); window.__nmProg=true; try{ a.click(); }finally{ window.__nmProg=false; } a.remove(); if(href!==src) setTimeout(()=>URL.revokeObjectURL(href),4000);
    }catch(e){ window.open(src,"_blank","noopener"); } }
  window.__csLightbox=function(src){ if(!src) return; const prev=document.activeElement; const o=document.createElement("div"); o.className="cs-lb"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label","Photo");
    o.innerHTML='<img alt="Photo"><button type="button" class="cs-lbdl" aria-label="Download photo">⬇ Download</button><button type="button" class="cs-lbx" aria-label="Close">✕</button>';
    o.querySelector("img").src=src;
    const close=()=>{ o.remove(); window.removeEventListener("keydown",key,true); if(prev&&prev.focus) try{ prev.focus(); }catch(e){} };
    const key=e=>{ if(e.key==="Escape"){ e.stopImmediatePropagation(); e.preventDefault(); close(); } };
    o.addEventListener("click",e=>{ if(e.target.closest(".cs-lbdl")){ e.stopPropagation(); dl(src); return; } close(); });
    window.addEventListener("keydown",key,true); document.body.appendChild(o); o.querySelector(".cs-lbx").focus(); };
  document.addEventListener("click",e=>{ const im=e.target.closest("img.cl-msgimg"); if(!im||!im.src||im.naturalWidth===0) return; e.preventDefault(); e.stopPropagation(); window.__csLightbox(im.currentSrc||im.src); },true);
})();
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
R('''if(!e.target.closest(".cl-dm,[data-nm],.csc-bd,[role=alertdialog],[role=dialog]:not(#clDm)")''','''if(!e.target.closest(".cl-dm,[data-nm],.csc-bd,.cs-lb,[role=alertdialog],[role=dialog]:not(#clDm)")''')
