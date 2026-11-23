# Runs after parts/ext patches (the live board code arrives in a patch): board as a big pop-up, × + "Add all", working "＋ My words"
import sys
p=sys.argv[1]; s=open(p,encoding="utf-8").read()
def R(a,b):
    global s
    assert s.count(a)==1, a[:80]; s=s.replace(a,b)
# 1) the board opens as a large window over a dimmed page, not the whole screen
R('.lb-ov{position:fixed;inset:0;z-index:9999;overflow:auto;-webkit-overflow-scrolling:touch;color:#141b3a;font-family:"Nunito","Lexend",system-ui,sans-serif;\n  background-color:#fbfcff;',
  '.lb-ov{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:clamp(10px,3vh,32px) clamp(8px,3vw,40px);background:rgba(6,10,26,.62);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}\n.lb-box{position:relative;width:100%;max-width:1240px;height:100%;max-height:100%;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;border-radius:26px;box-shadow:0 30px 80px rgba(0,0,0,.45);color:#141b3a;font-family:"Nunito","Lexend",system-ui,sans-serif;\n  background-color:#fbfcff;')
R('.lb-ov.dark{color:#f1f5ff;','.lb-ov.dark .lb-box{color:#f1f5ff;')
# top bar inside the window: big round × on the right, "Add all" next to it
R('.lb-x{position:sticky;top:10px;float:right;z-index:2;border:1.5px solid #dfe5f3;background:#fff;color:#141b3a;border-radius:999px;padding:8px 16px;font:800 15px/1 "Nunito","Lexend",sans-serif;cursor:pointer;box-shadow:0 6px 16px rgba(20,27,58,.10)}',
  '''.lb-bar{position:sticky;top:0;z-index:3;display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:12px 14px 0;pointer-events:none}
.lb-bar>*{pointer-events:auto}
.lb-bar{padding-bottom:12px;background:linear-gradient(rgba(251,252,255,.97) 72%,rgba(251,252,255,0))}
.lb-ov.dark .lb-bar{background:linear-gradient(rgba(11,20,48,.97) 72%,rgba(11,20,48,0))}
.lb-x{width:46px;height:46px;flex:none;display:grid;place-items:center;border:1.5px solid #dfe5f3;background:#fff;color:#141b3a;border-radius:50%;padding:0;font:400 30px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 6px 16px rgba(20,27,58,.14)}
.lb-all{border:0;border-radius:999px;padding:12px 18px;font:900 15px/1 "Nunito","Lexend",sans-serif;cursor:pointer;color:#fff;background:linear-gradient(135deg,#2563eb,#16a34a);box-shadow:0 8px 20px rgba(37,99,235,.28)}
.lb-all:disabled{opacity:.75;cursor:default}
.lb-wrap{padding-top:0!important;margin-top:-14px}
.lb-save.cl-addw{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:8px 15px;border-radius:12px;font:900 14px/1.1 "Nunito","Lexend",sans-serif;color:#fff;background:#141b3a;border:1.5px solid #141b3a;box-shadow:0 4px 10px rgba(20,27,58,.18)}
.lb-save.cl-addw:hover{background:#2a3566}
.lb-save.cl-addw:disabled{cursor:default;color:#4a5170;background:transparent;border:1.5px dashed #b8c2dc;box-shadow:none}
.lb-ov.dark .lb-save.cl-addw{color:#0b1430;background:#fff;border-color:#fff}
.lb-ov.dark .lb-save.cl-addw:disabled{color:#b6c2e2;background:transparent;border:1.5px dashed #3b4c80}
.lb-pop{position:absolute;z-index:4;transform:translate(-50%,0);margin-top:10px;white-space:nowrap;background:#141b3a;color:#fff;font:800 13.5px/1.2 "Nunito","Lexend",sans-serif;padding:8px 12px;border-radius:12px;box-shadow:0 10px 24px rgba(0,0,0,.25);pointer-events:none;animation:lbPop 1.8s ease forwards}
.lb-pop a{color:#93c5fd}
@keyframes lbPop{0%{opacity:0;transform:translate(-50%,-6px)}12%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0}}
@media (max-width:600px){.lb-ov{padding:10px 6px}.lb-box{border-radius:20px}.lb-all{padding:11px 14px;font-size:14px}}''')
R('.lb-ov.dark .lb-x{background:#111c42;border-color:#2b3b6e;color:#fff}','.lb-ov.dark .lb-x{background:#111c42;border-color:#2b3b6e;color:#fff}.lb-ov.dark .lb-pop{background:#fff;color:#0b1430}')
R('''<div class="lb-wrap"><button type="button" class="lb-x" data-boardx="1" aria-label="${L("Close","Cerrar")}">✕ ${L("Close","Cerrar")}</button>${boardHTML(bd)}</div></div>`);''',
  '''<div class="lb-box"><div class="lb-bar">${(bd.cards||[]).some(c=>!c.hidden&&(window.__lbSav(c)||window.__lbItemSav(c)))?`<button type="button" class="lb-all" data-lball="1">＋ <span class="lb-long">${L("Save all to My words","Guardar todas en Mis palabras")}</span><span class="lb-short">${L("Save all","Guardar todas")}</span></button>`:""}<button type="button" class="lb-x" data-boardx="1" aria-label="${L("Close","Cerrar")}">×</button></div><div class="lb-wrap">${boardHTML(bd)}</div></div></div>`);''')
# 2) "＋ My words" inside the board (it lives outside the club page, so it needs its own handler) + "Add all"
R('''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".lb-ov")) closeBoard(); });''',
  '''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".lb-ov")) closeBoard(); });
  function lbPop(btn,msg){ const box=btn.closest(".lb-box"); if(!box) return; box.querySelectorAll(".lb-pop").forEach(p=>p.remove());
    const r=btn.getBoundingClientRect(), br=box.getBoundingClientRect(), p=document.createElement("div"); p.className="lb-pop"; p.textContent=msg;
    p.style.left=Math.min(br.width-130,Math.max(130,r.left-br.left+r.width/2))+"px"; p.style.top=(r.bottom-br.top+box.scrollTop)+"px"; box.appendChild(p); setTimeout(()=>p.remove(),1900); }
  const lbAdd=x=>{ try{ return typeof window.csAddWord==="function"&&!!window.csAddWord(x.w,x.tr||"",x.ex||""); }catch(er){ return false; } };
  document.addEventListener("click",e=>{ const ov=e.target.closest(".lb-ov"); if(!ov) return;
    const one=e.target.closest(".lb-save[data-clw]"); if(one){ e.stopPropagation(); if(one.disabled) return; let x={}; try{ x=JSON.parse(one.dataset.clw); }catch(er){}
      const ok=lbAdd(x); one.disabled=true; one.textContent=one.classList.contains("lb-isave")?"✓":ok?L("✓ Saved","✓ Guardada"):L("✓ In your words","✓ Ya está en tus palabras");
      lbPop(one,ok?L("Saved to My words ✓","Guardada en Mis palabras ✓"):L("Already in My words","Ya está en Mis palabras")); return; }
    const all=e.target.closest("[data-lball]"); if(all){ e.stopPropagation(); if(all.disabled) return; let n=0;
      ov.querySelectorAll(".lb-save[data-clw]").forEach(b=>{ if(b.disabled) return; let x={}; try{ x=JSON.parse(b.dataset.clw); }catch(er){} if(lbAdd(x)) n++; b.disabled=true; b.textContent=b.classList.contains("lb-isave")?"✓":L("✓ Saved","✓ Guardada"); });
      all.disabled=true; all.textContent=n?L(`✓ ${n} added`,`✓ ${n} agregadas`):L("✓ All in your words","✓ Ya están todas");
      lbPop(all,n?L(`${n} ${n===1?"word":"words"} added to My words ✓`,`${n} ${n===1?"palabra agregada":"palabras agregadas"} a Mis palabras ✓`):L("They're all in My words already","Ya estaban todas en Mis palabras")); return; } },true);''')
open(p,"w",encoding="utf-8").write(s)
s=open(p,encoding="utf-8").read()
a='and save any expression to <b>My words</b>."'
if s.count(a)==1: s=s.replace(a,'and save any expression (or all of them at once with <b>＋ Save all</b>) to <b>My words</b>."')
open(p,"w",encoding="utf-8").write(s)
# one button per class: when a class has a live board, its "Class material" pill is hidden and the board's top bar links to it
s=open(p,encoding="utf-8").read()
a='class="cs-act cl-planb" data-plan="${wk}|${wd}" aria-expanded="false">'
if s.count(a)==1:
    s=s.replace(a,'class="cs-act cl-planb" data-plan="${wk}|${wd}" aria-expanded="false"${(((window.__clubBoards||{})[wk]||[]).includes(Number(wd)))?" hidden":""}>')
b='class="cs-act cl-planb cl-boardb" data-board="${wk}|${wd}">'
if s.count(b)==1:
    s=s.replace(b,'class="cs-act cl-planb cl-boardb" data-board="${wk}|${wd}"${(((window.__clubPlans||{})[wk]||[]).includes(Number(wd)))?" data-hasplan=\\"1\\"":""}>')
c='<div class="lb-box"><div class="lb-bar">'
if s.count(c)==1:
    s=s.replace(c,'<div class="lb-box"><div class="lb-bar">${b.dataset.hasplan?`<button type="button" class="lb-mat" data-lbplan="${esc(b.dataset.board)}">📄 <span class="lb-long">${L("Full class material","Material completo de la clase")}</span><span class="lb-short">${L("Material","Material")}</span></button>`:""}')
d='      const x=document.querySelector(".lb-x"); if(x) x.focus();'
if s.count(d)==1:
    s=s.replace(d,d+'\n      window.__lbFrom=b;')
e='  function lbPop(btn,msg){'
if s.count(e)==1 and 'data-lbplan' not in s.split(e)[1][:400]:
    s=s.replace(e,'''  /* 📄 the class material opens on top of the board (← back returns to the board where you were) */
  document.addEventListener("click",async e=>{ const m=e.target.closest("[data-lbplan]"); if(!m) return; e.preventDefault(); e.stopPropagation();
    const ov=m.closest(".lb-ov"), box=m.closest(".lb-box"); if(!ov||!box) return; const [wk,wd]=m.dataset.lbplan.split("|");
    try{ if(!PLANDOC[wk]){ const r=await api("GET","/clubStats/_plans_"+wk.replace(/-/g,"")); PLANDOC[wk]=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; }
      const pl=(PLANDOC[wk].plans||{})[wd]; if(!pl){ toast(L("Couldn’t find it.","No lo encontré.")); return; }
      ov.querySelectorAll(".lb-matbox").forEach(x=>x.remove()); box.hidden=true;
      ov.insertAdjacentHTML("beforeend",`<div class="lb-box lb-matbox"><div class="lb-bar"><button type="button" class="lb-mat" data-lbback="1">← <span class="lb-long">${L("Back to the board","Volver a la pizarra")}</span><span class="lb-short">${L("Board","Pizarra")}</span></button><button type="button" class="lb-x" data-boardx="1" aria-label="${L("Close","Cerrar")}">×</button></div><div class="lb-matc"><div class="lb-lbl">📄 ${L("Class material","Material de la clase")}</div><h2>${esc(pl.title||"")}</h2>${mdHTML(pl.md)}</div></div>`);
      const bk=ov.querySelector("[data-lbback]"); if(bk) bk.focus();
    }catch(er){ toast(L("Couldn’t open it. Try again.","No se pudo abrir. Intenta de nuevo.")); } },true);
  document.addEventListener("click",e=>{ const bk=e.target.closest("[data-lbback]"); if(!bk) return; e.stopPropagation(); const ov=bk.closest(".lb-ov"); bk.closest(".lb-matbox").remove(); const b0=ov&&ov.querySelector(".lb-box"); if(b0) b0.hidden=false; },true);
'''+e)
f='.lb-all:disabled{opacity:.75;cursor:default}'
if s.count(f)==1:
    s=s.replace(f,f+'\n.lb-mat{margin-right:auto;border:1.5px solid #dfe5f3;border-radius:999px;padding:11px 16px;font:900 14.5px/1 "Nunito","Lexend",sans-serif;cursor:pointer;color:#141b3a;background:#fff;box-shadow:0 6px 16px rgba(20,27,58,.10)}\n.lb-ov.dark .lb-mat{background:#111c42;border-color:#2b3b6e;color:#fff}\n.lb-box[hidden]{display:none}.lb-matc{max-width:820px;margin:0 auto;padding:6px clamp(16px,4vw,44px) 50px;font-size:17px;line-height:1.55}.lb-matc h2{font-weight:900;font-size:clamp(26px,3.4vw,38px);line-height:1.1;margin:4px 0 16px}.lb-matc h3,.lb-matc h4{font-weight:900;margin:22px 0 8px}.lb-matc a{color:#2563eb}.lb-ov.dark .lb-matc a{color:#7dd3fc}.lb-matc blockquote{margin:12px 0;padding:8px 14px;border-left:3px solid #93c5fd;background:rgba(147,197,253,.12);border-radius:8px}.lb-matc li{margin:4px 0}\n.lb-short{display:none}\n@media (max-width:600px){.lb-long{display:none}.lb-short{display:inline}.lb-mat{padding:11px 14px;font-size:14px}}')
open(p,"w",encoding="utf-8").write(s)
s=open(p,encoding="utf-8").read()
a='(or all of them at once with <b>＋ Save all</b>) to <b>My words</b>."'
if s.count(a)==1: s=s.replace(a,'(or all of them at once with <b>＋ Save all</b>) to <b>My words</b>. The full class material is inside it too: tap <b>📄 Full class material</b> at the top (and <b>← Back to the board</b> to return)."')
open(p,"w",encoding="utf-8").write(s)
# word look-up (double-click / press and hold → save to My words) also works on the live board and its class material: show it above the board
s=open(p,encoding="utf-8").read()
k='.lk-box[hidden]{display:none}'
if '.lb-ov~.lk-box' not in s:
    i=s.index('</style>'); s=s[:i]+'\nhtml.lb-lock .lk-box,html.lb-lock .lk-chip{z-index:10060!important}\n.lb-ov .lb-box{-webkit-user-select:text;user-select:text}\n'+s[i:]
open(p,"w",encoding="utf-8").write(s)
# Nov 16 2026: "chip" cards (members' one-word answers as small pills in a "✨ Your words" panel next to the section's first card)
# and the board's counter rules from the live board: the closing card, question-only prompt cards and cards marked nocount don't count
# (and when a board lists its sections, only the "✍️ Your ideas" sections count).
s=open(p,encoding="utf-8").read()
a='    const n=cards.filter(c=>c.style!=="wrap").length;'
if s.count(a)==1:
    s=s.replace(a,'''    const inp=Array.isArray(b.sections)&&b.sections.length?new Set(b.sections.filter(x=>x&&x.input).map(x=>x.name)):null;
    const n=cards.filter(c=>c.style!=="wrap"&&!c.nocount&&(!(Array.isArray(c.questions)&&c.questions.length)||c.example||c.english)&&(!inp||inp.has(c.section||""))).length;   /* Nov 20 2026: lesson expressions (example + "Let's use it!" questions) count too; prompt cards (questions only) don't */''')
a='return `<div class="lb-card${qs?" wide":""}${c.style==="wrap"?" wrap":""}">'
if s.count(a)==1:
    s=s.replace(a,'return `<div class="lb-card${qs?" wide":""}${c.style==="wrap"?" wrap":""}${c.style==="chip"?" chip":""}">')
a='<div class="lb-grid">${groups[k].map(card).join("")}</div>'
if s.count(a)==1:
    s=s.replace(a,'''${(g=>{ const ch=g.filter(c=>c.style==="chip"), rest=g.filter(c=>c.style!=="chip");
        return ch.length?`<div class="lb-grid flow">${rest.map(card).join("")}<div class="lb-chipbox"><div class="lb-chiphd">✨ ${L("Your words","Sus palabras")} · ${ch.length}</div><div class="lb-chips">${ch.map(card).join("")}</div></div></div>`:`<div class="lb-grid">${g.map(card).join("")}</div>`; })(groups[k])}''')
i=s.index('</style>'); s=s[:i]+'''
/* live board: chip cards in a "Your words" panel */
.lb-grid.flow{grid-template-columns:minmax(0,clamp(240px,30%,360px)) minmax(0,1fr);align-items:stretch}
.lb-grid.flow>.lb-card{grid-column:1}
.lb-chipbox{grid-column:2;grid-row:1;border-radius:20px;padding:clamp(14px,1.8vw,22px);border:1.5px dashed #dfe5f3;background:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:12px}
.lb-chiphd{font-family:"Space Mono",monospace;font-weight:700;text-transform:uppercase;letter-spacing:.24em;font-size:12px;color:#4a5170}
.lb-chips{display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:10px;flex:1}
.lb-card.chip{--h:59,130,246;display:inline-flex;align-items:center;padding:8px 16px;border-radius:999px;background:rgba(var(--h),.12)!important;border:1.5px solid rgba(var(--h),.45)!important;box-shadow:0 6px 16px rgba(var(--h),.15)}
.lb-chips .lb-card.chip:nth-child(5n+2){--h:45,212,191}.lb-chips .lb-card.chip:nth-child(5n+3){--h:168,85,247}.lb-chips .lb-card.chip:nth-child(5n+4){--h:236,72,153}.lb-chips .lb-card.chip:nth-child(5n+5){--h:234,179,8}
.lb-chips .lb-card.chip:nth-child(odd){transform:rotate(-1.2deg)}.lb-chips .lb-card.chip:nth-child(even){transform:rotate(1.2deg)}
.lb-card.chip .lb-top{gap:8px;margin:0;align-items:center}.lb-card.chip .lb-emo{font-size:20px}.lb-card.chip .lb-id{font-size:clamp(17px,1.7vw,22px);line-height:1.1}
.lb-ov.dark .lb-chipbox{background:rgba(11,20,48,.45);border-color:#2b3b6e}.lb-ov.dark .lb-chiphd{color:#facc15}.lb-ov.dark .lb-card.chip{background:rgba(var(--h),.16)!important}
@media (max-width:720px){.lb-grid.flow{grid-template-columns:minmax(0,1fr)}.lb-chipbox{grid-column:1;grid-row:auto}}
'''+s[i:]
# 2026-11-18: cards can carry "items" (a bullet list, one item per line), shown under the meaning like on the live board
R('${c.meaning?`<div class="lb-mean">${esc(c.meaning)}</div>`:""}${c.example?', '${c.meaning?`<div class="lb-mean">${esc(c.meaning)}</div>`:""}${Array.isArray(c.items)&&c.items.length?`<ul class="lb-items">${c.items.map(t=>`<li>${esc(t)}${window.__lbItemSav(c)?`<button type="button" class="lb-save lb-isave" title="${L("Save to My notebook","Guardar en Mi cuaderno")}" data-clw="${esc(JSON.stringify({w:t,tr:c.text||"",ex:""}))}">＋</button>`:""}</li>`).join("")}</ul>`:""}${c.example?')
i=s.index('</style>')
s=s[:i]+'''.lb-items{list-style:none;margin:8px 0 0;padding:0;font-weight:700;font-size:16px;line-height:1.35;color:#4a5170}
.lb-items li{position:relative;padding-left:20px;margin-top:4px}.lb-items li::before{content:"";position:absolute;left:4px;top:.5em;width:8px;height:8px;border-radius:50%;background:#f97316}
.lb-ov.dark .lb-items{color:#b6c2e2}.lb-ov.dark .lb-items li::before{background:#facc15}
.lb-card.wrap .lb-items{color:rgba(255,255,255,.93);display:inline-block;text-align:left}.lb-card.wrap .lb-items li::before{background:#fff}
'''+s[i:]
# 2026-11-19: "+ My notebook" only where it makes sense (language, not rules, instructions or members' answers);
# phrases in a list get their own small ＋. A card can force it with "save": true / false.
R('save=c.style!=="wrap"&&(c.english||c.meaning);','save=window.__lbSav(c);')
_j=s.rfind('</body>')
s=s[:_j]+'''<script>
/* live board: which cards get "+ My notebook" */
(function(){
  const LANG=/language|vocab|expression|idiom|phras|slang|word|lexi|vocabulario|expresiones/i;
  window.__lbSav=c=>{ if(!c||c.style==="wrap"||c.save===false) return false; if(c.save===true) return true;
    if(c.english||c.uk) return true;
    if(!c.section) return !!c.meaning;                     /* older boards without sections: as before */
    return LANG.test(c.section)&&!!(c.meaning||c.example); };
  window.__lbItemSav=c=>!!(c&&Array.isArray(c.items)&&c.items.length&&c.style!=="wrap"&&c.save!==false&&(c.save===true||LANG.test(c.section||"")));
})();
</script>
'''+s[_j:]
i=s.index('</style>')
s=s[:i]+'''.lb-items li .lb-isave{margin-left:8px;width:26px;height:26px;padding:0;border-radius:50%;border:1.5px solid currentColor;background:transparent;color:#2b6cff;font-weight:900;font-size:15px;line-height:1;cursor:pointer;vertical-align:middle;opacity:.8}
.lb-items li .lb-isave:hover{opacity:1}.lb-items li .lb-isave:disabled{opacity:.6;cursor:default}
.lb-ov.dark .lb-items li .lb-isave{color:#facc15}
'''+s[i:]
open(p,"w",encoding="utf-8").write(s)
# Nov 23 2026: "Save all" shows a pop-up with exactly which words were added, and an Undo button
s=open(p,encoding="utf-8").read()
if 'lb-addpop' not in s:
    i=s.index('</style>')
    s=s[:i]+'''.lb-addpop{position:sticky;top:64px;z-index:5;margin:0 clamp(10px,2vw,22px) 12px auto;max-width:420px;background:#fff;color:#141b3a;border:1.5px solid #dfe5f3;border-radius:20px;padding:14px 16px 14px;box-shadow:0 14px 34px rgba(20,27,58,.18);font:600 15px/1.4 "Nunito","Lexend",sans-serif;animation:lbPopIn .18s ease-out}
@keyframes lbPopIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.lb-addpop .ap-h{display:flex;align-items:center;gap:10px;font-weight:900;font-size:16px}
.lb-addpop .ap-h b{flex:1}.lb-addpop .ap-x{border:0;background:transparent;font-size:22px;line-height:1;cursor:pointer;color:#6b7394;padding:2px 4px}
.lb-addpop .ap-list{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 12px;max-height:180px;overflow:auto}
.lb-addpop .ap-list span{padding:4px 11px;border-radius:999px;background:#eaf2ff;color:#1d4ed8;font-weight:800;font-size:13.5px}
.lb-addpop .ap-row{display:flex;gap:8px;flex-wrap:wrap}
.lb-addpop .ap-row button{border-radius:999px;padding:9px 15px;font:900 14px/1 "Nunito","Lexend",sans-serif;cursor:pointer}
.lb-addpop .ap-undo{border:1.5px solid #dfe5f3;background:#fff;color:#141b3a}
.lb-addpop .ap-ok{border:0;color:#fff;background:linear-gradient(135deg,#2563eb,#16a34a)}
.lb-addpop .ap-note{margin:6px 0 0;color:#6b7394;font-size:13px}
.lb-ov.dark .lb-addpop{background:#111c42;border-color:#2b3b6e;color:#fff}.lb-ov.dark .lb-addpop .ap-list span{background:#1d2c5e;color:#bcd2ff}.lb-ov.dark .lb-addpop .ap-undo{background:#0b1430;border-color:#2b3b6e;color:#fff}.lb-ov.dark .lb-addpop .ap-x{color:#b6c2e2}
@media (max-width:600px){.lb-addpop{margin:0 8px 10px;max-width:none;top:58px}}
'''+s[i:]
    _j=s.rfind('</body>')
    s=s[:_j]+'''<script>
/* live board "Save all": say exactly what was added, with Undo (runs before the older handler and replaces it) */
(function(){
  const L=(en,es)=>{ try{ return (document.documentElement.lang||"").startsWith("es")&&window.__clubLang==="es"?es:en; }catch(e){ return en; } };
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  function pop(box,html){ box.querySelectorAll(".lb-addpop").forEach(x=>x.remove()); const d=document.createElement("div"); d.className="lb-addpop"; d.setAttribute("role","status"); d.innerHTML=html;
    const bar=box.querySelector(".lb-bar"); (bar?bar:box.firstChild).insertAdjacentElement(bar?"afterend":"beforebegin",d); return d; }
  window.addEventListener("click",e=>{
    const all=e.target.closest("[data-lball]"); if(!all||!all.closest(".lb-ov")) return;
    e.stopImmediatePropagation(); e.preventDefault(); if(all.disabled) return;
    const ov=all.closest(".lb-ov"), box=all.closest(".lb-box")||ov;
    const ids0=new Set(typeof window.csWordIds==="function"?window.csWordIds():[]), touched=[];
    ov.querySelectorAll(".lb-save[data-clw]").forEach(b=>{ if(b.disabled) return; let x={}; try{ x=JSON.parse(b.dataset.clw); }catch(er){}
      try{ if(typeof window.csAddWord==="function") window.csAddWord(x.w,x.tr||"",x.ex||""); }catch(er){}
      touched.push([b,b.innerHTML]); b.disabled=true; b.textContent=b.classList.contains("lb-isave")?"✓":"✓ Saved"; });
    const added=(typeof window.csWordIds==="function"?window.csWordIds():[]).filter(id=>!ids0.has(id));
    const ws=added.map(id=>window.csWordById&&window.csWordById(id)).filter(Boolean);
    const allTxt=all.innerHTML; all.disabled=true; all.textContent=ws.length?`✓ ${ws.length} added`:"✓ All in your words";
    if(!ws.length){ const d=pop(box,`<div class="ap-h"><span aria-hidden="true">👍</span><b>They're all in My notebook already</b><button type="button" class="ap-x" aria-label="Close">×</button></div>`); d.querySelector(".ap-x").onclick=()=>d.remove(); setTimeout(()=>d.remove(),4000); return; }
    const d=pop(box,`<div class="ap-h"><span aria-hidden="true">✅</span><b>${ws.length} ${ws.length===1?"word":"words"} added to My notebook</b><button type="button" class="ap-x" aria-label="Close">×</button></div>
      <div class="ap-list">${ws.map(w=>`<span>${esc(w.w)}</span>`).join("")}</div>
      <div class="ap-row"><button type="button" class="ap-undo">↩ Undo</button><button type="button" class="ap-ok">Got it</button></div>`);
    d.querySelector(".ap-x").onclick=d.querySelector(".ap-ok").onclick=()=>d.remove();
    d.querySelector(".ap-undo").onclick=()=>{ const n=window.csRemoveWords?window.csRemoveWords(added):0;
      touched.forEach(([b,h])=>{ b.disabled=false; b.innerHTML=h; }); all.disabled=false; all.innerHTML=allTxt;
      d.innerHTML=`<div class="ap-h"><span aria-hidden="true">↩</span><b>Undone: ${n} ${n===1?"word":"words"} taken out of My notebook</b><button type="button" class="ap-x" aria-label="Close">×</button></div>`;
      d.querySelector(".ap-x").onclick=()=>d.remove(); setTimeout(()=>d.remove(),3500); };
  },true);
})();
</script>
'''+s[_j:]
open(p,"w",encoding="utf-8").write(s)
