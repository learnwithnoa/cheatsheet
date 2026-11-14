# step85: notifications + messages in one 🔔 window with two tabs (opens on Notifications); the 💬 button goes away
R('  function closeDm(){ const o=document.getElementById("clDm");', '  window.__clubDmClose=()=>closeDm();\n  function closeDm(){ const o=document.getElementById("clDm");')
R('function dmPlace(o){ try{ const bt=document.getElementById("dmTopBtn"), r=bt&&!bt.hidden?bt.getBoundingClientRect():null;',
  'function dmPlace(o){ try{ const bt=window.__nmAnchor?window.__nmAnchor():document.getElementById("dmTopBtn"), r=bt&&bt.offsetParent!==null?bt.getBoundingClientRect():null;')
R('o.style.setProperty("--dmright",Math.round(r?Math.max(8,innerWidth-r.right-60):12)+"px");','o.style.setProperty("--dmright",Math.round(r?Math.max(8,innerWidth-r.right-(bt&&bt.id==="dmTopBtn"?60:0)):12)+"px");')
R('and <b>Messages</b> to chat with other members.', 'and <b>Messages</b> to chat with other members (tap the 🔔 at the top, then <b>💬 Messages</b>).')
R('<b>Profile</b> (top right): pick your photo', '<b>Profile</b> (your photo, top right): pick your photo')
R('''your buddy and the rest. Hibi remembers which tab you used last."]''', '''your buddy and the rest. Hibi remembers which tab you used last."],
    ["🔔","Notifications and messages together","the 🔔 at the top now has two tabs: <b>🔔 Notifications</b> and <b>💬 Messages</b>. New messages show as a little green number on the bell."]''')
_css = '''
/* step85: 🔔 Notifications · 💬 Messages tabs */
html.nm-on .top-in #dmTopBtn{display:none!important}
.nm-tabs{flex:1;display:flex;gap:4px;min-width:0;background:var(--surface-2,color-mix(in srgb,var(--ink) 5%,transparent));border:1px solid var(--line);border-radius:999px;padding:4px}
.nm-tabs button{all:unset;box-sizing:border-box;flex:1;display:inline-flex;align-items:center;justify-content:center;gap:5px;cursor:pointer;font:700 14px var(--display,inherit);color:var(--muted);padding:7px 10px;border-radius:999px;white-space:nowrap;transition:background .15s,color .15s}
.nm-tabs button:hover{color:var(--ink)}
.nm-tabs button:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
.nm-tabs button[aria-selected="true"]{background:var(--gloss,var(--royal));color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 8px rgba(5,15,30,.25);text-shadow:0 1px 2px rgba(5,15,30,.35)}
.nm-c{display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#22a06b;color:#fff;font-size:11.5px;font-weight:800;text-shadow:none;box-sizing:border-box}
#clBellPanel .clb-h:has(.nm-tabs){display:flex;margin-bottom:8px}
#tNotif .tn-h .nm-tabs{flex:0 1 330px}
#clDm .cl-dmh.nm-hasTabs .cl-dmt{display:none}
#clDm .cl-dmh .nm-tabs{margin-right:8px}
.nm-n{position:absolute;bottom:-5px;right:-5px;min-width:17px;height:17px;padding:0 4px;box-sizing:border-box;border-radius:999px;background:#22a06b;color:#fff;font:800 10.5px/17px var(--display,inherit);text-align:center;box-shadow:0 0 0 2px var(--bg,#0d1424);pointer-events:none;z-index:2}
#clBell,#tNotif .tn-bell{position:relative}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step85: one 🔔 window, two tabs. Works with the club bell (members) and Noa's bell, and the 💬 Messages pop-up. */
(function(){
  const dmBtn=()=>document.getElementById("dmTopBtn");
  const hasDM=()=>{ const m=dmBtn(); return !!m&&!m.hidden; };
  function bell(){ const w=document.getElementById("clBellWrap"); if(w&&!w.hidden){ const b=document.getElementById("clBell"); if(b) return {k:"c",btn:b}; }
    const t=document.querySelector("#tNotif .tn-bell"); return t?{k:"t",btn:t}:null; }
  const on=()=>document.documentElement.classList.contains("nm-on");
  window.__nmAnchor=()=>{ const b=bell(); return on()&&b?b.btn:dmBtn(); };
  const dmCount=()=>{ const n=document.querySelector("#dmTopBtn .cl-dmn"); return n&&!n.hidden?(parseInt(n.textContent,10)||0):0; };
  const mLabel=n=>`💬 Messages${n?` <span class="nm-c">${n}</span>`:""}`;
  const tabs=cur=>`<div class="nm-tabs" role="tablist" aria-label="Notifications and messages"><button type="button" role="tab" data-nm="n" aria-selected="${cur==="n"}">🔔 Notifications</button><button type="button" role="tab" data-nm="m" aria-selected="${cur==="m"}">${mLabel(dmCount())}</button></div>`;
  function openNotif(){ const b=bell(); if(!b) return; if(b.k==="c"){ const pn=document.getElementById("clBellPanel"); if(pn&&pn.hidden) b.btn.click(); } else if(!document.querySelector("#tNotif .tn-box")) b.btn.click(); }
  function closeNotif(){ const b=bell(); if(!b) return; if(b.k==="c"){ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden) b.btn.click(); } else { const x=document.querySelector('#tNotif [data-tn="hide"]'); if(x) x.click(); } }
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-nm]"); if(!t) return; e.preventDefault(); e.stopPropagation();
    if(t.getAttribute("aria-selected")==="true") return;
    if(t.dataset.nm==="m"){ closeNotif(); setTimeout(()=>{ window.__clubInbox&&window.__clubInbox(); },0); }
    else { if(document.getElementById("clDm")){ if(window.__clubDmClose) window.__clubDmClose(); else document.getElementById("clDm").remove(); } setTimeout(openNotif,0); } },true);
  let q=0;
  function decorate(){ q=0;
    const b=bell(), want=hasDM()&&!!b; if(on()!==want) document.documentElement.classList.toggle("nm-on",want); if(!want) return;
    const ch=document.querySelector("#clBellPanel .clb-h"); if(ch&&!ch.querySelector(".nm-tabs")) ch.innerHTML=tabs("n");
    const th=document.querySelector("#tNotif .tn-h"); if(th&&!th.querySelector(".nm-tabs")){ const t=th.querySelector(":scope > b"); if(t) t.outerHTML=tabs("n"); }
    const dh=document.querySelector("#clDm .cl-dmh"); if(dh){ const bk=dh.querySelector(".cl-dmback"), inbox=!bk||bk.hidden, tb=dh.querySelector(".nm-tabs");
      if(inbox&&!tb) dh.insertAdjacentHTML("afterbegin",tabs("m")); else if(!inbox&&tb) tb.remove(); if(dh.classList.contains("nm-hasTabs")!==inbox) dh.classList.toggle("nm-hasTabs",inbox); }
    const n=dmCount(), lab=mLabel(n); document.querySelectorAll('.nm-tabs [data-nm="m"]').forEach(x=>{ if(x.innerHTML!==lab) x.innerHTML=lab; });
    let bd=b.btn.querySelector(".nm-n"); if(n){ if(!bd){ bd=document.createElement("span"); bd.className="nm-n"; bd.setAttribute("aria-hidden","true"); b.btn.appendChild(bd); } if(bd.textContent!==String(n)) bd.textContent=String(n); b.btn.setAttribute("aria-description",n+" new message"+(n===1?"":"s")); } else if(bd){ bd.remove(); b.btn.removeAttribute("aria-description"); }
  }
  const kick=()=>{ if(!q) q=requestAnimationFrame(decorate); };
  const start=()=>{ new MutationObserver(kick).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden"]}); kick(); };
  if(document.body) start(); else document.addEventListener("DOMContentLoaded",start);
})();
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
