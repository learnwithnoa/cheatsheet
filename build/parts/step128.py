# step128 (Nov 15 2026): Home shows non-members a preview of the club card (classes, what members get, a button to the club page).
# Weekly topics, podcast and recordings stay members-only (non-members can't read them anyway). Hideable for 30 days.
R('''    if(!f||!p){ hc.hidden=true; return; }
    const now=Date.now(), cl=classesOf(f,p), isNew=p.id!==seen();''',
  '''    if(!f){ const signed=window.__csAuth===true||!!window.__csPreview; let hid=false; try{ hid=!window.__csPreview&&Date.now()<+(localStorage.getItem("cs-hc-tease-hide")||0); }catch(e){}
      if(signed&&window.__csClubKnown&&!window.__csGuest&&!hid){ hc.hidden=false; hc.className="hc-club hc-tease"; hc.innerHTML=teaseHTML(); } else hc.hidden=true; return; }
    if(!p){ hc.hidden=true; return; }
    const now=Date.now(), cl=classesOf(f,p), isNew=p.id!==seen();''')
R('''  function lockSched(){''',
  '''  function teaseHTML(){
    return `<div class="hc-h"><b>🌼 Noa's English Club</b><button type="button" class="hc-tx" data-hctx="1" aria-label="Hide this for now" title="Hide this for now">×</button></div>
      <p class="hc-sub">Every week, club members practice speaking English in a small, friendly group. This is their week:</p>
      <div class="hc-list">${lockSched().map(c=>{ const [d,t]=c.when.split(" · "); return `<div><span class="d">${c.ico} ${esc(d.slice(0,3))} ${esc(t||"")}</span><span><b>${esc(c.name)}</b> · ${esc(c.what)}</span></div>`; }).join("")}</div>
      <div class="hc-locks"><span>🎧 Weekly club podcast</span><span>🎬 Every class recorded</span><span>💬 Community wall</span></div>
      <button type="button" class="hc-join" data-go="club">💛 See the club →</button>`; }
  document.addEventListener("click",e=>{ const x=e.target.closest("[data-hctx]"); if(!x) return; const hc=document.getElementById("homeClub"); if(hc) hc.hidden=true;
    if(!window.__csPreview){ try{ localStorage.setItem("cs-hc-tease-hide",String(Date.now()+30*864e5)); }catch(e){} } });
  function lockSched(){''')
_css = '''
/* step128: club preview on Home for non-members */
.hc-tease .hc-sub{margin:0;font-size:14px;line-height:1.45;color:var(--muted)}
.hc-tease .hc-list .d{text-transform:uppercase}
.hc-tx{all:unset;cursor:pointer;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;font-size:20px;line-height:1;color:var(--muted)}
.hc-tx:hover,.hc-tx:focus-visible{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}
.hc-locks{display:flex;flex-wrap:wrap;gap:6px}
.hc-locks span{font:700 12.5px var(--body);padding:4px 10px;border-radius:999px;background:var(--surface);border:1.5px dashed color-mix(in srgb,#F0A63A 45%,var(--line))}
.hc-locks span::after{content:" 🔒";font-size:11px}
.hc-join{all:unset;cursor:pointer;align-self:flex-start;font:800 14px var(--body);padding:8px 16px;border-radius:999px;color:#1f1300;background:linear-gradient(135deg,#F7C548,#F0A63A);box-shadow:0 2px 0 color-mix(in srgb,#F0A63A 60%,#000)}
.hc-join:hover,.hc-join:focus-visible{filter:brightness(1.05)}
@media (max-width:480px){ .hc-tease .hc-list div{flex-direction:column;gap:0} .hc-tease .hc-list .d{width:auto} }
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
