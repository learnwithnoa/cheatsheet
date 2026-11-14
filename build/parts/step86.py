# step86: messages count toward the bell's number; the Messages tab is a plain drop-down like Notifications (no dark page, same width)
R('o.style.setProperty("--dmtop",Math.round(r&&r.bottom>0?r.bottom+8:64)+"px");','o.style.setProperty("--dmtop",Math.round(r&&r.bottom>0?r.bottom+(bt&&bt.id==="dmTopBtn"?8:10):64)+"px");')
_css = '''
/* step86: one red number on the bell (notifications + new messages); Messages opens as a drop-down, no dark page */
html.nm-on #clBell .clb-n,html.nm-on #tNotif .tn-bell .tn-num{display:none!important}
.nm-n{top:-5px;bottom:auto;right:-5px;min-width:18px;height:18px;padding:0 4px;background:#E5533D;font:800 11px/18px var(--body,inherit);box-shadow:none}
.nm-c{background:#E5533D}
html.nm-on .cl-dm-ov{background:transparent!important;pointer-events:none}
html.nm-on .cl-dm-ov .cl-dm{pointer-events:auto;width:var(--nmw,min(360px,calc(100vw - 24px)));animation:none;box-shadow:0 18px 44px rgba(5,15,30,.35)}
html.nm-on.nm-t .cl-dm-ov .cl-dm{width:min(480px,calc(100vw - 32px))}
@media (max-width:700px){html.nm-on .cl-dm-ov{justify-content:stretch;padding:calc(env(safe-area-inset-top,0px) + 66px) max(16px,env(safe-area-inset-right,0px)) 8px max(16px,env(safe-area-inset-left,0px))!important}html.nm-on .cl-dm-ov .cl-dm,html.nm-on.nm-t .cl-dm-ov .cl-dm{width:100%}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
# the bell's own script: count messages in the number, close Messages on outside clicks / bell click
R('''    let bd=b.btn.querySelector(".nm-n"); if(n){ if(!bd){ bd=document.createElement("span"); bd.className="nm-n"; bd.setAttribute("aria-hidden","true"); b.btn.appendChild(bd); } if(bd.textContent!==String(n)) bd.textContent=String(n); b.btn.setAttribute("aria-description",n+" new message"+(n===1?"":"s")); } else if(bd){ bd.remove(); b.btn.removeAttribute("aria-description"); }''','''    const nat=(()=>{ const e=b.k==="c"?b.btn.querySelector(".clb-n"):b.btn.querySelector(".tn-num"); if(!e||e.hidden) return 0; const t=e.textContent.trim(); return t.endsWith("+")?10:(parseInt(t,10)||0); })();
    if(document.documentElement.classList.contains("nm-t")!==(b.k==="t")) document.documentElement.classList.toggle("nm-t",b.k==="t");
    const dmo=document.getElementById("clDm"); if(dmo&&dmo.getAttribute("aria-modal")!=="false") dmo.setAttribute("aria-modal","false");
    const tot=nat+n, tt=tot>9?"9+":String(tot);
    let bd=b.btn.querySelector(".nm-n"); if(tot){ if(!bd){ bd=document.createElement("span"); bd.className="nm-n"; bd.setAttribute("aria-hidden","true"); b.btn.appendChild(bd); } if(bd.textContent!==tt) bd.textContent=tt; } else if(bd) bd.remove();
    if(n) b.btn.setAttribute("aria-description",n+" new message"+(n===1?"":"s")); else b.btn.removeAttribute("aria-description");''')
R('''  let q=0;
  function decorate(){''','''  /* Messages is a drop-down now: a click outside closes it, and the bell closes it (like the profile window) */
  const dmClose=()=>{ if(window.__clubDmClose) window.__clubDmClose(); else { const o=document.getElementById("clDm"); if(o) o.remove(); } };
  document.addEventListener("click",e=>{ if(!on()) return; const o=document.getElementById("clDm"); if(!o) return; const b=bell();
    if(b&&b.btn.contains(e.target)){ e.preventDefault(); e.stopPropagation(); dmClose(); return; }
    if(!e.target.closest(".cl-dm,[data-nm],.csc-bd,[role=alertdialog],[role=dialog]:not(#clDm)")&&document.contains(e.target)) dmClose(); },true);
  let q=0;
  function decorate(){''')
