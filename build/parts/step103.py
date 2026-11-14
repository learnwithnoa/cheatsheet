# step103: Noa's notifications: whole rows are clickable, "joined" rows send a welcome, pack/clock rows can be dismissed
R('''  const dkey=()=>new Date().toDateString();
  let busy=false, data=null;''','''  const dkey=()=>new Date().toDateString();
  /* notifications Noa dismissed with × (they come back if anything about them changes) */
  const DISK="ncs-tnotif-dis"; const DIS=()=>{ try{ const v=JSON.parse(localStorage.getItem(DISK)||"[]"); return Array.isArray(v)?v:[]; }catch(e){ return []; } };
  const welcome=n=>{ const f=String(n||"").trim().split(/\\s+/)[0]||""; return `Hi ${f}! 👋 Welcome to Hibi, I'm really happy you're here. Have a look around: save new words, practice a bit, and say hi in the club. If you need anything, just write me here. Noa`; };
  let busy=false, data=null;''')
R('''      if(t) packs.push(`<li>💳 ${t} <a class="tn-go" href="private-students.html#s/${id}">Open →</a></li>`); });''',
'''      const dk="p:"+id+"|"+t.replace(/<[^>]+>/g,"")+"|"+JSON.stringify(du); if(t&&!DIS().includes(dk)) packs.push(`<li>💳 ${t} <a class="tn-go" href="private-students.html#s/${id}">Open →</a><button type="button" class="tn-dis" data-tndis="${esc(dk)}" aria-label="Hide this notification" title="Hide this (it comes back if something changes)">×</button></li>`); });''')
R('''forEach(r=>clocks.push(`<li>🕐 ${esc(r.text)} <a class="tn-go" href="private-students.html#s/${esc(p.key.slice(4))}">Open →</a></li>`))); }''',
'''forEach(r=>{ const dk="c:"+p.key+"|"+r.text; if(!DIS().includes(dk)) clocks.push(`<li>🕐 ${esc(r.text)} <a class="tn-go" href="private-students.html#s/${esc(p.key.slice(4))}">Open →</a><button type="button" class="tn-dis" data-tndis="${esc(dk)}" aria-label="Hide this notification" title="Hide this">×</button></li>`); })); }''')
# joined: club members get a Hibi message with a welcome ready to send; private-only ones get an email
R('''    const li=(a,old)=>`<li class="${old?"tn-old":""}">🎉 <b>${esc(a.name)}</b> joined <span class="muted">· ${ago(a.first)}</span> <span class="tn-k ${KIND[a.kind][1]}">${KIND[a.kind][0]}</span></li>`;''',
'''    const li=(a,old)=>{ const dm=a.kind==="club"||a.kind==="both", act=dm?`data-dmto="${esc(a.uid)}" data-dmname="${esc(a.name)}" data-dmdraft="${esc(welcome(a.name))}"`:a.email?`data-tnmail="${esc(a.email)}" data-tnname="${esc(a.name)}"`:"";
      return `<li class="${old?"tn-old":""}" ${act}>🎉 <b>${esc(a.name)}</b> joined <span class="muted">· ${ago(a.first)}</span> <span class="tn-k ${KIND[a.kind][1]}">${KIND[a.kind][0]}</span>${act?`<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>`:""}</li>`; };''')
# "about you in the club" rows open the club
R('''${mineNew.map(n=>`<li>${n.html}${n.text&&!/^react/.test(n.kind)?` <span class="muted">“${esc(n.text)}”</span>`:""} <span class="muted">· ${ago(n.at)}</span></li>`).join("")}''',
'''${mineNew.map(n=>`<li>${n.html}${n.text&&!/^react/.test(n.kind)?` <span class="muted">“${esc(n.text)}”</span>`:""} <span class="muted">· ${ago(n.at)}</span> <a class="tn-go" href="#club" data-go="club"${n.pid?` data-bgo="${esc(n.pid)}"`:""}>Open →</a></li>`).join("")}''')
_css='''
/* step103: whole notifications are clickable */
.tn-box li[data-dmto],.tn-box li[data-tnmail],.tn-box li:has(> .tn-go),.tn-box p.tn-line:has(> .tn-go){cursor:pointer;border-radius:10px;transition:background .15s,box-shadow .15s;position:relative}
.tn-box li[data-dmto]:hover,.tn-box li[data-tnmail]:hover,.tn-box li:has(> .tn-go):hover,.tn-box p.tn-line:has(> .tn-go):hover,
.tn-box li[data-dmto]:focus-visible,.tn-box li[data-tnmail]:focus-visible,.tn-box li:has(> .tn-go):focus-visible,.tn-box p.tn-line:has(> .tn-go):focus-visible{background:color-mix(in srgb,var(--c-sky,#5AB8FF) 14%,transparent);box-shadow:inset 3px 0 0 var(--c-sky,#5AB8FF);outline:none}
.tn-box li > .tn-go,.tn-box p.tn-line > .tn-go{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tn-box li:has(> .tn-dis){padding-right:34px}
.tn-dis{position:absolute;top:50%;right:6px;transform:translateY(-50%);width:26px;height:26px;border-radius:999px;border:0;background:transparent;color:var(--muted);font-size:17px;line-height:1;cursor:pointer;opacity:.55}
.tn-dis:hover,.tn-dis:focus-visible{opacity:1;background:var(--surface-2)}
.tn-hint{display:block;font:700 12px var(--body);color:var(--c-sky,#5AB8FF);margin-top:2px;opacity:0;transition:opacity .15s}
.tn-box li:hover .tn-hint,.tn-box li:focus-visible .tn-hint{opacity:1}
@media (hover:none){.tn-hint{opacity:.85}}
'''
_i=s.index('</style>'); s=s[:_i]+_css+s[_i:]
_js='''<script>
/* Noa's notifications: click anywhere on a notification to open it; × hides one; "joined" opens a welcome message */
(function(){
  const rowOf=t=>t.closest(".tn-box li, .tn-box p.tn-line");
  const act=row=>{ if(row.dataset.tnmail){ const f=String(row.dataset.tnname||"").trim().split(/\\s+/)[0]||"";
      const body=`Hi ${f}!\\n\\nWelcome to Hibi, I'm really happy you're here. 🎉 Have a look around: save new words, practice a bit, and check My coaching for your classes.\\n\\nIf you need anything, just reply to this email.\\n\\nNoa`;
      window.open("https://mail.google.com/mail/?authuser=learnwithnoa%40gmail.com&view=cm&fs=1&to="+encodeURIComponent(row.dataset.tnmail)+"&su="+encodeURIComponent("Welcome to Hibi 🎉")+"&body="+encodeURIComponent(body),"_blank"); return true; }
    const go=row.querySelector(":scope > a.tn-go"); if(go){ go.click(); return true; } return false; };
  document.addEventListener("click",e=>{ const d=e.target.closest("[data-tndis]"); if(d){ e.preventDefault(); e.stopPropagation(); let v=[]; try{ v=JSON.parse(localStorage.getItem("ncs-tnotif-dis")||"[]")||[]; }catch(er){}
      v=[...new Set(v.concat(d.dataset.tndis))].slice(-200); try{ localStorage.setItem("ncs-tnotif-dis",JSON.stringify(v)); }catch(er){}
      const row=d.closest("li"); if(row) row.remove(); if(window.toast) window.toast("Hidden. It comes back if something about it changes."); try{ document.dispatchEvent(new CustomEvent("cs-teacher")); }catch(er){} return; }
    const row=rowOf(e.target); if(!row||row.dataset.dmto||e.target.closest("a,button,input,textarea,select,form")) return;
    if(act(row)) e.preventDefault(); },true);
  /* a welcome message: open the chat with it ready to send (Noa can edit it first) */
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-dmdraft]"); if(!t) return; const draft=t.dataset.dmdraft;
    let n=0; const put=()=>{ const ta=document.querySelector("#clDm textarea"); if(ta){ if(!ta.value.trim()){ ta.value=draft; ta.dispatchEvent(new Event("input",{bubbles:true})); } ta.focus(); try{ ta.setSelectionRange(ta.value.length,ta.value.length); }catch(er){} return; } if(++n<20) setTimeout(put,100); }; setTimeout(put,80); });
  /* keyboard: notifications can be reached with Tab and opened with Enter */
  const tag=()=>document.querySelectorAll(".tn-box li[data-dmto], .tn-box li[data-tnmail], .tn-box li:has(> .tn-go), .tn-box p.tn-line:has(> .tn-go)").forEach(r=>{ if(!r.hasAttribute("tabindex")){ r.tabIndex=0; r.setAttribute("role","link"); } });
  new MutationObserver(tag).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("keydown",e=>{ if(e.key!=="Enter"&&e.key!==" ") return; const r=e.target.closest&&e.target.closest(".tn-box li[tabindex], .tn-box p.tn-line[tabindex]"); if(!r||e.target!==r) return; e.preventDefault(); r.click(); });
})();
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
