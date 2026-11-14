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
  '''<div class="lb-box"><div class="lb-bar">${(bd.cards||[]).some(c=>!c.hidden&&c.style!=="wrap"&&(c.english||c.meaning))?`<button type="button" class="lb-all" data-lball="1">＋ <span class="lb-long">${L("Add all to My words","Agregar todas a Mis palabras")}</span><span class="lb-short">${L("Add all","Agregar todas")}</span></button>`:""}<button type="button" class="lb-x" data-boardx="1" aria-label="${L("Close","Cerrar")}">×</button></div><div class="lb-wrap">${boardHTML(bd)}</div></div></div>`);''')
# 2) "＋ My words" inside the board (it lives outside the club page, so it needs its own handler) + "Add all"
R('''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".lb-ov")) closeBoard(); });''',
  '''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".lb-ov")) closeBoard(); });
  function lbPop(btn,msg){ const box=btn.closest(".lb-box"); if(!box) return; box.querySelectorAll(".lb-pop").forEach(p=>p.remove());
    const r=btn.getBoundingClientRect(), br=box.getBoundingClientRect(), p=document.createElement("div"); p.className="lb-pop"; p.textContent=msg;
    p.style.left=Math.min(br.width-130,Math.max(130,r.left-br.left+r.width/2))+"px"; p.style.top=(r.bottom-br.top+box.scrollTop)+"px"; box.appendChild(p); setTimeout(()=>p.remove(),1900); }
  const lbAdd=x=>{ try{ return typeof window.csAddWord==="function"&&!!window.csAddWord(x.w,x.tr||"",x.ex||""); }catch(er){ return false; } };
  document.addEventListener("click",e=>{ const ov=e.target.closest(".lb-ov"); if(!ov) return;
    const one=e.target.closest(".lb-save[data-clw]"); if(one){ e.stopPropagation(); if(one.disabled) return; let x={}; try{ x=JSON.parse(one.dataset.clw); }catch(er){}
      const ok=lbAdd(x); one.disabled=true; one.textContent=ok?L("✓ Saved","✓ Guardada"):L("✓ In your words","✓ Ya está en tus palabras");
      lbPop(one,ok?L("Added to My words ✓","Agregada a Mis palabras ✓"):L("Already in My words","Ya está en Mis palabras")); return; }
    const all=e.target.closest("[data-lball]"); if(all){ e.stopPropagation(); if(all.disabled) return; let n=0;
      ov.querySelectorAll(".lb-save[data-clw]").forEach(b=>{ if(b.disabled) return; let x={}; try{ x=JSON.parse(b.dataset.clw); }catch(er){} if(lbAdd(x)) n++; b.disabled=true; b.textContent=L("✓ Saved","✓ Guardada"); });
      all.disabled=true; all.textContent=n?L(`✓ ${n} added`,`✓ ${n} agregadas`):L("✓ All in your words","✓ Ya están todas");
      lbPop(all,n?L(`${n} ${n===1?"word":"words"} added to My words ✓`,`${n} ${n===1?"palabra agregada":"palabras agregadas"} a Mis palabras ✓`):L("They're all in My words already","Ya estaban todas en Mis palabras")); return; } },true);''')
open(p,"w",encoding="utf-8").write(s)
s=open(p,encoding="utf-8").read()
a='and save any expression to <b>My words</b>."'
if s.count(a)==1: s=s.replace(a,'and save any expression (or all of them at once with <b>＋ Add all</b>) to <b>My words</b>."')
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
a='(or all of them at once with <b>＋ Add all</b>) to <b>My words</b>."'
if s.count(a)==1: s=s.replace(a,'(or all of them at once with <b>＋ Add all</b>) to <b>My words</b>. The full class material is inside it too: tap <b>📄 Full class material</b> at the top (and <b>← Back to the board</b> to return)."')
open(p,"w",encoding="utf-8").write(s)
# word look-up (double-click / press and hold → save to My words) also works on the live board and its class material: show it above the board
s=open(p,encoding="utf-8").read()
k='.lk-box[hidden]{display:none}'
if '.lb-ov~.lk-box' not in s:
    i=s.index('</style>'); s=s[:i]+'\nhtml.lb-lock .lk-box,html.lb-lock .lk-chip{z-index:10060!important}\n.lb-ov .lb-box{-webkit-user-select:text;user-select:text}\n'+s[i:]
open(p,"w",encoding="utf-8").write(s)
