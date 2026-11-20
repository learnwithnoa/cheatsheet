# step180 (Nov 17 2026):
# 1) What's new pop-ups: Every update / Once a week / Never (Settings), and "See fewer of these" on the pop-up (→ once a week)
# 2) Settings in a clearer order: Make Hibi easier · Look & feel · Text & reading · Focus & comfort · Home & notifications · App
# 3) Coming back to the tab doesn't reload Hibi by itself any more (an update waits for the Refresh pill unless you were away 8+ hours)
R('''  if(document.documentElement.classList.contains("cs-calm")){ const f=document.querySelector('footer [data-go="changelog"]'); if(f) f.classList.add("cs-new"); }
  else setTimeout(openWN,500);''',
  '''  const wnPref=String(LS.get("ncs-wnpref","all")), wnLast=+LS.get("ncs-wnlast",0)||0;
  if(document.documentElement.classList.contains("cs-calm")||wnPref==="none"||(wnPref==="week"&&Date.now()-wnLast<7*864e5)){ const f=document.querySelector('footer [data-go="changelog"]'); if(f) f.classList.add("cs-new"); }
  else { if(wnPref==="week") wnWeekly(); setTimeout(openWN,500); }''')
# the weekly pop-up shows everything new since they last saw one (not just the latest update)
R('''function openWN(){ wn.hidden=false; wnBd.hidden=false;''', '''function wnWeekly(){ const seen=String(LS.get("ncs-seen-version","")); const out=[]; for(const e of CHANGELOG){ if(e.id===seen) break; if(!e.quiet) out.push(e); if(out.length>=8) break; }
  if(out.length>1) document.getElementById("wnBody").innerHTML='<p class="cl-date" style="margin:0 0 8px">Your weekly summary · '+out.length+' updates</p>'+out.map(e=>'<h3 class="wn-wk-h">'+e.title+' <small>'+e.date+'</small></h3>'+clItems(e)).join(""); }
function openWN(){ LS.set("ncs-wnlast",Date.now()); const l=document.getElementById("wnLess"); if(l){ const p=String(LS.get("ncs-wnpref","all")); l.textContent=p==="week"?"Turn these pop-ups off":"See fewer of these"; l.dataset.to=p==="week"?"none":"week"; } wn.hidden=false; wnBd.hidden=false;''')
R('''<div class="note-actions"><button class="pill-btn" type="button" id="wnOk">Got it</button><button class="swap" type="button" data-go="changelog" id="wnAll">See all updates</button></div>''',
  '''<div class="note-actions"><button class="pill-btn" type="button" id="wnOk">Got it</button><button class="swap" type="button" data-go="changelog" id="wnAll">See all updates</button></div>
  <button type="button" class="wn-less" id="wnLess" data-to="week">See fewer of these</button>''')
R('''document.getElementById("wnOk").addEventListener("click",closeWN);''', '''document.getElementById("wnOk").addEventListener("click",closeWN);
document.getElementById("wnLess").addEventListener("click",e=>{ const to=e.currentTarget.dataset.to||"week"; LS.set("ncs-wnpref",to); LS.set("ncs-wnlast",Date.now()); closeWN();
  const t=to==="week"?"OK! You'll get one summary a week instead. Change it anytime in Settings → Home & notifications.":"OK, no more pop-ups. New things show as a dot on “What's new”. Change it in Settings → Home & notifications.";
  if(typeof window.toast==="function") window.toast(t); });''')
# coming back to the tab: no automatic reload for an update unless they were away a long time
R('''check(away>20*60*1000); });''', '''check(away>8*60*60*1000); });''')
_css = r'''
/* step180: What's new: see fewer */
.wn-less{all:unset;cursor:pointer;display:block;margin:12px auto 0;font:600 13.5px var(--body);color:var(--muted);text-decoration:underline;text-underline-offset:3px}
.wn-less:focus-visible{outline:3px solid var(--bright);border-radius:6px}
.wn-wk-h{margin:14px 0 4px;font-size:16px}.wn-wk-h small{font-weight:600;color:var(--muted);font-size:12.5px;margin-left:6px}
#whatsnew #wnBody{max-height:min(60vh,520px);overflow:auto}
.cs-wnp{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 2px}
.cs-wnp button{all:unset;cursor:pointer;font:700 13px var(--body);padding:6px 11px;border-radius:999px;border:1.5px solid var(--line)}
.cs-wnp button[aria-pressed="true"]{border-color:var(--royal);background:color-mix(in srgb,var(--royal) 18%,var(--surface))}
.cs-wnp button:focus-visible{outline:3px solid var(--bright)}
.cs-wnp-box{padding:4px 0 6px}.cs-wnp-box b{display:block;font-weight:800}.cs-wnp-box small{display:block;color:var(--muted);font-size:13px;margin-top:2px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step180: Settings in a clearer order, plus "What's new pop-ups" */
(function(){
  const $=id=>document.getElementById(id);
  const lab=id=>{ const x=$(id); return x?(x.closest(".cs-tog")||x.closest("label")||x):null; };
  const secOf=t=>[...document.querySelectorAll("#csPanel > .cs-sec")].find(s=>{ const h=s.querySelector(":scope > h4"); return h&&h.textContent.trim()===t; });
  const mk=(key,title)=>{ let s=document.querySelector('#csPanel > .cs-sec[data-sx="'+key+'"]'); if(!s){ s=document.createElement("div"); s.className="cs-sec"; s.dataset.sx=key; s.innerHTML="<h4></h4>"; } s.querySelector(":scope > h4").textContent=title; return s; };
  const getP=()=>{ try{ const v=JSON.parse(localStorage.getItem("ncs-wnpref")||'"all"'); return ["all","week","none"].includes(v)?v:"all"; }catch(e){ return "all"; } };
  const setP=v=>{ try{ localStorage.setItem("ncs-wnpref",JSON.stringify(v)); if(v!=="all") localStorage.setItem("ncs-wnlast",JSON.stringify(Date.now())); }catch(e){} try{ window.__csOnSet&&window.__csOnSet("ncs-wnpref"); }catch(e){} };
  function wnBox(){ let b=$("csWnPref"); if(b) return b; b=document.createElement("div"); b.className="cs-wnp-box"; b.id="csWnPref";
    b.innerHTML='<b>What\'s new pop-ups</b><small>When Hibi gets something new. Every update is always listed in “What\'s new”.</small><div class="cs-wnp" role="group" aria-label="What\'s new pop-ups">'+[["all","Every update"],["week","Once a week"],["none","Never (just a dot)"]].map(([v,l])=>'<button type="button" data-wnp="'+v+'">'+l+'</button>').join("")+'</div>';
    b.addEventListener("click",e=>{ const x=e.target.closest("[data-wnp]"); if(!x) return; setP(x.dataset.wnp); paint(); });
    return b; }
  function paint(){ const p=getP(); document.querySelectorAll("[data-wnp]").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.wnp===p))); }
  function arrange(){
    const P=$("csPanel"); if(!P||!$("csSimple")) return;   /* only on Hibi's main page */
    const head=P.querySelector(".cs-head"), reset=$("csResetAll")&&$("csResetAll").closest(".cs-sec");
    const lv=$("csLevelSec"); if(lv){ lv.dataset.sx="easy"; const h=lv.querySelector(":scope > h4"); if(h) h.textContent="Make Hibi easier"; }
    const easy=lv||mk("easy","Make Hibi easier"), look=secOf("Look & feel")||mk("look","Look & feel"), text=secOf("Text & reading")||mk("text","Text & reading"),
      focus=mk("focus","Focus & comfort"), home=mk("home","Home & notifications"), app=$("csInstallSec")||mk("app","App");
    const put=(sec,id)=>{ const l=lab(id); if(l&&l.parentNode!==sec) sec.appendChild(l); };
    /* Make Hibi easier: Beginner mode (with its note) + Simple mode */
    put(easy,"csSimple");
    ["csRead","csInshort"].forEach(id=>put(text,id));
    ["csFocus","csCalm","csContrast"].forEach(id=>put(focus,id));
    const want=[lab("csBuddyT"),lab("csStoicT"),wnBox(),lab("csMailN")].filter(Boolean), cur=[...home.children].filter(c=>c.tagName!=="H4");
    if(want.length!==cur.length||want.some((w,i)=>cur[i]!==w)) want.forEach(w=>home.appendChild(w));
    if(app.querySelector(":scope > h4")) app.querySelector(":scope > h4").textContent="App";
    /* order */
    const hasEasy=!!easy.querySelector(".cs-tog");
    let after=head; [hasEasy?easy:null,look,text,focus,home,app,reset].forEach(s=>{ if(!s) return; if(after.nextElementSibling!==s) after.after(s); after=s; });
    /* old sections that are now empty */
    [...P.querySelectorAll(":scope > .cs-sec")].forEach(s=>{ if(s.dataset.sx||s===look||s===text||s===app||s===reset) return; if(![...s.children].some(c=>c.tagName!=="H4")) s.remove(); });
    if(!hasEasy&&easy.parentNode) easy.remove();
    paint();
  }
  window.__csArrangeSettings=arrange;
  /* the panel fills in over a few seconds (buddy, Daily Stoic, emails…): tidy it whenever it opens or changes */
  function hook(){ const P=$("csPanel"); if(!P){ setTimeout(hook,800); return; } let t=0; new MutationObserver(()=>{ clearTimeout(t); t=setTimeout(arrange,30); }).observe(P,{childList:true,attributes:true,attributeFilter:["hidden"]}); arrange(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",hook); else hook();
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
