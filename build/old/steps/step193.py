# step193 (Nov 19 2026): duels you can follow — "⚔️ Your duels" card at the top of Home (collapsed),
# a ⚔️ Duels section in the 🔔, a badge on Buddy park, a score line after practice, a duel history (buddy.js fills these)
R('''<button type="button" class="hm-arr" id="hmArrange" aria-haspopup="dialog">✏️ Arrange</button></p>''',
  '''<button type="button" class="hm-arr" id="hmArrange" aria-haspopup="dialog">✏️ Arrange</button></p>
  <details class="card dz" id="dzBox" hidden></details>''')
R('''const K="ncs-homeorder", DEF=["stoic","club","today","world","review"];''', '''const K="ncs-homeorder", DEF=["duels","stoic","club","today","world","review"];''')
R('''const avail=k=>{ const el=document.getElementById(S[k][0]); if(!el) return false;''', '''const avail=k=>{ const el=document.getElementById(S[k][0]); if(!el) return false; if(k==="duels") return !el.hidden||get().hide.includes(k);''')
# the S map: add duels as the first entry
import re as _re
_m = _re.search(r'const S=\{(stoic:\[)', s); assert _m and s.count(_m.group(0)) == 1
s = s.replace(_m.group(0), 'const S={duels:["dzBox","⚔️ Your duels"],' + _m.group(1))
# 🔔: duel notes (club members); they count as new until the bell is opened
R('''n=(club?NOTES.filter(x=>x.kind!=="dm"&&x.at>seen).length:0)+CN.length+KDN().filter(m=>(m.at||0)>seen).length;''',
  '''n=(club?NOTES.filter(x=>x.kind!=="dm"&&x.at>seen).length:0)+CN.length+KDN().filter(m=>(m.at||0)>seen).length+DZN().filter(m=>(m.at||0)>seen).length;''')
R('''  function KDN(){''', '''  function DZN(){ try{ return window.__bdDuelNotes?window.__bdDuelNotes():[]; }catch(e){ return []; } }
  function dzHTML(pn){ const l=DZN(); return l.length?`<h4 class="clb-sec">⚔️ ${L("Duels","Duelos")}</h4><ul>${l.map(m=>`<li><button type="button" class="clb-i${(m.at||0)>(+pn.dataset.seen||0)?" new":""}" data-dzgo="1"><span>${m.t}</span><em>${typeof ago==="function"?ago(m.at):""}</em></button></li>`).join("")}</ul>`:""; }
  document.addEventListener("cs-duelnote",()=>{ try{ paintBell(); }catch(e){} });
  function KDN(){''')
assert s.count('<b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+kdHTML+') == 2
s = s.replace('<b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+kdHTML+', '<b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+kdHTML+dzHTML(pn)+')
R('''+kdHTML+dzHTML(pn)+(coachHTML||kdHTML&&" "||''', '''+kdHTML+dzHTML(pn)+(coachHTML||(kdHTML||dzHTML(pn))&&" "||''')
# tour
R('''<b>Duels</b> (club members): challenge someone in the park to a friendly 7-day duel. Winners get treats and prizes, including clothes your buddy can wear.</div></li>''',
  '''<b>Duels</b> (club members): challenge someone in the park to a friendly 7-day duel. Winners get treats and prizes, including clothes your buddy can wear. While you have a duel, <b>⚔️ Your duels</b> sits at the top of Home (tap it to see the score), the 🔔 tells you about new challenges, lead changes and results, and your past duels are in <b>📜 Your duels</b> in the park.</div></li>''')
_css = r'''
/* step193: ⚔️ Your duels (Home) */
#dzBox{margin:0 0 18px;padding:0;overflow:hidden}
#dzBox>summary{display:block;padding:13px 16px;cursor:pointer}
#dzBox .dz-h{font-weight:900;font-size:16px}
#dzBox .dz-sum{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-size:13px;color:var(--muted)}
#dzBox .dz-sum span{background:var(--surface-2,rgba(127,127,127,.1));border-radius:999px;padding:2px 9px;white-space:nowrap}
#dzBox .dz-sum .dz-new{background:#FFB020;color:#3a2600;font-weight:800}
#dzBox .dz-body{padding:0 16px 14px}
#dzBox .dz-row{padding:11px 0;border-top:1px dashed var(--line)}
#dzBox .dz-t{font-size:14.5px;line-height:1.4}
#dzBox .dz-t small{color:var(--muted)}
#dzBox .dz-btns{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
#dzBox .dz-btns button{all:unset;cursor:pointer;padding:6px 14px;border-radius:999px;border:1.5px solid var(--line);font-weight:800;font-size:13.5px}
#dzBox .dz-btns button.go{background:var(--c2,#5AB8FF);border-color:transparent;color:#fff}
#dzBox .dz-bars{display:grid;max-width:560px;grid-template-columns:auto 1fr auto;gap:5px 10px;align-items:center;margin-top:8px;font-size:13.5px}
#dzBox .dz-bars>span:nth-child(3n+1){max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#dzBox .dz-bar{height:9px;border-radius:9px;background:var(--surface-2,rgba(127,127,127,.15));overflow:hidden}
#dzBox .dz-bar i{display:block;height:100%;border-radius:9px;background:#9aa7b8}
#dzBox .dz-bar.me i{background:var(--c2,#5AB8FF)}
#dzBox .dz-msg{margin-top:6px;font-size:13.5px;font-weight:700}
#dzBox .dz-wait{font-size:14px;color:var(--muted)}
#dzBox .dz-foot{padding-top:10px;border-top:1px dashed var(--line);text-align:right}
#dzBox .dz-park{all:unset;cursor:pointer;font-weight:800;font-size:14px;color:var(--c2,#5AB8FF)}
.duel-hist{margin:14px 0 4px}
.duel-hist>summary{cursor:pointer;font-weight:800}
.navbtn .dz-badge[hidden]{display:none}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
