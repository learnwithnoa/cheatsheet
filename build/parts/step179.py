# step179 (Nov 17 2026): Simple mode — only the main pages (Home, My coaching, Club, My notebook, Practice),
# bigger buttons, a "☰ More" button for everything else, and a "Where do you want to go?" box on Home.
# Saved per account in ncs-simple: {on, by:"noa"|"me", asked}. Noa turns it on from Hibi members (by:"noa", asked:false):
# the member is asked once if they want to keep it.
_css = r'''
/* step179: Simple mode */
#smDoors{display:none}
html.cs-simple:not(.cs-smore) nav.side .navbtn:not(.sm-keep):not(.t-mnav):not(.t-tab),
html.cs-simple:not(.cs-smore) nav.side .navbtn.locked,
html.cs-simple:not(.cs-smore) nav.side .navgroup:not(.mine){display:none!important}
html.cs-simple #searchWrap,html.cs-simple #searchToggle,html.cs-simple #hdrWord,html.cs-simple #musicBtn,html.cs-simple #tmWrap,html.cs-simple #hmArrange,
html.cs-simple #awBox,html.cs-simple #homeClub.hc-tease,html.cs-simple #tStoic,html.cs-simple #v-notes .hm-lede,html.cs-simple #v-notes .lede-es{display:none!important}
html.cs-simple:not(.cs-smore) #smMore,html.cs-simple.cs-smore #smLess{display:inline-flex!important}
html.cs-simple #smDoors{display:block}
#smMore,#smLess{all:unset;box-sizing:border-box;cursor:pointer;align-items:center;justify-content:center;gap:8px;border-radius:14px;border:1.5px dashed var(--line);color:var(--ink);font:800 15px var(--body);background:var(--surface)}
#smMore,#smLess{display:none}
#smMore:focus-visible,#smLess:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
#smMore svg,#smLess svg{width:20px;height:20px;flex:none}
html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep{min-height:54px;font-size:17px!important}
#smMore{width:100%;min-height:54px;margin-top:6px}
#smLess{min-height:44px;padding:0 16px;margin-bottom:6px;width:100%}
@media (max-width:900px){
  html.cs-simple:not(.cs-smore) nav.side{position:static!important;overflow:visible!important;display:block!important}
  html.cs-simple:not(.cs-smore) nav.side .navgroup.mine{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%;border:0!important;padding:0!important;margin:0!important}
  html.cs-simple:not(.cs-smore) nav.side .navgroup.mine .navbtn.sm-keep:not([hidden]),html.cs-simple:not(.cs-smore) #smMore{flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:4px!important;height:auto!important;min-height:66px!important;padding:8px 4px!important;margin:0!important;width:auto!important;text-align:center;white-space:normal!important;font-size:14.5px!important;line-height:1.15!important;border-radius:16px!important}
  html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep .home-ico,html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep .nb-ico{width:22px!important;height:22px!important;margin:0!important}
  html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep .cn-count{display:none!important}
  html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep .club-dot{position:absolute;top:8px;right:10px;margin:0}
  html.cs-simple:not(.cs-smore) nav.side .navbtn.sm-keep{position:relative}
  html.cs-simple.cs-smore #smLess{width:auto;flex:none;height:40px;min-height:40px;margin:0;border-radius:999px;font-size:14px}
}
.sm-doors{margin:4px 0 18px}
.sm-doors h2{margin:0 0 4px;font-size:22px}
.sm-doors .sm-sub{margin:0 0 12px;color:var(--muted)}
.sm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.sm-door{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:14px;padding:16px;border-radius:18px;border:2px solid color-mix(in srgb,var(--dc) 55%,var(--line));background:color-mix(in srgb,var(--dc) 10%,var(--surface));color:var(--ink);min-height:78px}
.sm-door:hover{background:color-mix(in srgb,var(--dc) 18%,var(--surface))}
.sm-door:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
.sm-door .sm-ic{flex:none;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:24px;background:color-mix(in srgb,var(--dc) 22%,transparent)}
.sm-door b{display:block;font:800 18px var(--body)}
.sm-door small{display:block;font-size:14.5px;color:var(--muted);margin-top:2px;line-height:1.3}
.sm-door .sm-go{margin-left:auto;font-size:20px;color:var(--dc);font-weight:800}
.sm-off{all:unset;cursor:pointer;display:inline-block;margin-top:12px;font:700 14px var(--body);color:var(--muted);text-decoration:underline;text-underline-offset:3px}
.sm-off:focus-visible{outline:3px solid var(--bright)}
.sm-ask .csc{max-width:420px}
.sm-ask .csc-b p{margin:0 0 8px}
.sm-ask .csc-b .es{color:var(--muted);font-size:14px}
@media (max-width:900px){.sm-door{padding:12px 14px;min-height:68px;gap:12px}.sm-door .sm-ic{width:40px;height:40px;font-size:21px}.sm-door b{font-size:17px}.sm-door small{font-size:14px}.sm-doors .sm-sub{display:none}.sm-doors h2{margin-bottom:10px}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
# Home: the "Where do you want to go?" box, right under the title
R('''<div id="tStoic" class="t-stoic" hidden>''', '''<div id="smDoors" class="sm-doors" aria-labelledby="smDoorsT"></div><div id="tStoic" class="t-stoic" hidden>''')
_js = r'''<script>
/* step179: Simple mode */
(function(){
  const K="ncs-simple", root=document.documentElement, MK="cs-smore";
  const KEEP=["notes","coaching","club","classnotes","words","quiz"];
  const get=()=>{ let v=null; try{ v=JSON.parse(localStorage.getItem(K)||"null"); }catch(e){} return v&&typeof v==="object"?v:{}; };
  const put=v=>{ try{ localStorage.setItem(K,JSON.stringify(v)); }catch(e){} try{ window.__csOnSet&&window.__csOnSet(K); }catch(e){} };
  const on=()=>!!get().on;
  const more=()=>{ try{ return sessionStorage.getItem(MK)==="1"; }catch(e){ return false; } };
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const vis=id=>{ const b=document.getElementById(id); return !!(b&&!b.hidden&&!b.classList.contains("locked")); };
  const ICO_MORE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>';
  function setupNav(){
    const nav=document.querySelector("nav.side"), mine=nav&&nav.querySelector(".navgroup.mine"); if(!mine) return;
    mine.querySelectorAll(".navbtn[data-go]").forEach(b=>b.classList.toggle("sm-keep",KEEP.includes(b.dataset.go)));
    if(!document.getElementById("smMore")){
      const m=document.createElement("button"); m.type="button"; m.id="smMore"; m.innerHTML=ICO_MORE+"<span>More</span>"; m.setAttribute("aria-label","More pages: show the whole menu");
      m.onclick=()=>{ setMore(true); const l=document.getElementById("smLess"); l&&l.focus(); };
      mine.appendChild(m);
      const l=document.createElement("button"); l.type="button"; l.id="smLess"; l.innerHTML="<span aria-hidden=\"true\">✕</span><span>Simple menu</span>"; l.setAttribute("aria-label","Back to the simple menu");
      l.onclick=()=>{ setMore(false); const x=document.getElementById("smMore"); x&&x.focus(); };
      mine.insertBefore(l,mine.firstChild);
    }
  }
  function setMore(v){ try{ v?sessionStorage.setItem(MK,"1"):sessionStorage.removeItem(MK); }catch(e){} root.classList.toggle("cs-smore",!!v&&on()); }
  function doors(){
    const box=document.getElementById("smDoors"); if(!box) return;
    const h1=document.querySelector("#v-notes > h1"); if(h1&&box.previousElementSibling!==h1) h1.after(box);
    if(!on()){ box.innerHTML=""; return; }
    const D=[];
    if(vis("navCoaching")) D.push(["coaching","🎓","My coaching","Your classes, homework and what Noa recommends","#4DA3FF"]);
    if(vis("navClub")) D.push(["club","💬","Club","This week's classes, Zoom links and recordings","#F5B83D"]);
    D.push(["words","📒","My notebook","Your words and class notes","#2DD4BF"]);
    D.push(["quiz","🎯","Practice","Short exercises and flashcards with your words","#FF7A45"]);
    const html='<h2 id="smDoorsT">Where do you want to go? 👋</h2><p class="sm-sub">Tap one to start.</p><div class="sm-grid">'+D.map(([go,ic,t,sub,c])=>'<button type="button" class="sm-door" data-go="'+go+'" style="--dc:'+c+'"><span class="sm-ic" aria-hidden="true">'+ic+'</span><span><b>'+esc(t)+'</b><small>'+esc(sub)+'</small></span><span class="sm-go" aria-hidden="true">›</span></button>').join("")+'</div><button type="button" class="sm-off" id="smOff">Show me everything (turn off Simple mode)</button>';
    if(box.dataset.h!==html){ box.innerHTML=html; box.dataset.h=html; const o=document.getElementById("smOff"); if(o) o.onclick=()=>{ set(false); toast("Simple mode off. You can turn it back on in Settings."); }; }
  }
  function toast(t){ let el=document.getElementById("csToast"); if(!el){ el=document.createElement("div"); el.id="csToast"; el.setAttribute("role","status"); el.setAttribute("aria-live","polite"); document.body.appendChild(el); } el.textContent=t; el.classList.add("show"); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove("show"),3200); }
  function apply(){ const v=on(); root.classList.toggle("cs-simple",v); root.classList.toggle("cs-smore",v&&more()); setupNav(); doors(); }
  function set(v){ const o=get(); put(Object.assign({},o,{on:!!v,by:"me",asked:true})); if(!v) setMore(false); apply(); try{ window.csComfort&&window.csComfort.apply(); }catch(e){} }
  window.csSimple={ on, set, apply };
  /* Noa turned it on for them: ask once if they want to keep it (never in View as / preview) */
  function ask(tries){
    const v=get(); if(!v.on||v.asked||v.by!=="noa"||window.__csViewAsMode||window.__csPreview) return;
    const busy=[...document.querySelectorAll(".cs-dlg,.bd-modal,#whatsnew,#welcome,.wl-backdrop,.qa-backdrop,.csc-bd,dialog[open]")].some(x=>!x.hidden&&x.getClientRects().length)||(window.__csBusy&&window.__csBusy());
    if(busy||window.__csAuth!==true){ if((tries||0)<40) setTimeout(()=>ask((tries||0)+1),2500); return; }
    const bd=document.createElement("div"); bd.className="csc-bd sm-ask";
    bd.innerHTML='<div class="csc" role="alertdialog" aria-modal="true" aria-labelledby="smAskT"><h3 id="smAskT">Hibi, made simpler 🧩</h3><div class="csc-b"><p>Noa turned on <b>Simple mode</b> for you: just the main pages, with bigger buttons. Everything else is still here, under <b>☰ More</b>.</p><p class="es">Noa activó el modo simple: solo lo principal, con botones más grandes. Lo demás sigue en <b>☰ More</b>.</p></div><div class="csc-a"><button type="button" data-c="0">Show me everything</button><button type="button" data-c="1" class="csc-y">Keep it simple</button></div></div>';
    const done=keep=>{ bd.remove(); document.removeEventListener("keydown",key,true); put(Object.assign({},get(),{on:keep,asked:true})); if(!keep) setMore(false); apply(); toast(keep?"Simple mode is on. Change it anytime in Settings.":"Simple mode off. You can turn it back on in Settings."); };
    const key=e=>{ if(e.key==="Escape"){ e.preventDefault(); done(true); } };
    bd.addEventListener("click",e=>{ const b=e.target.closest("[data-c]"); if(b) done(b.dataset.c==="1"); });
    /* other one-time pop-ups wait while this one is open */
    const ob=window.__csBusy; window.__csBusy=function(){ return !!document.querySelector(".sm-ask")||(typeof ob==="function"&&ob.apply(this,arguments)); };
    document.addEventListener("keydown",key,true); document.body.appendChild(bd); setTimeout(()=>{ const b=bd.querySelector(".csc-y"); b&&b.focus(); },30);
  }
  apply();
  ["cs-hubview","cs-club"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,0)));
  /* the Club / My coaching buttons appear a moment after sign-in */
  const nb=document.querySelector("nav.side .navgroup.mine"); if(nb) new MutationObserver(()=>{ if(on()) doors(); }).observe(nb,{subtree:true,attributes:true,attributeFilter:["hidden","class"]});
  addEventListener("storage",e=>{ if(e.key===K) apply(); });
  setTimeout(()=>ask(0),3000);
})();
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
# the tour mentions it
R('''themes, bigger text, easier fonts, bionic reading, calm mode and more.''', '''themes, bigger text, easier fonts, bionic reading, calm mode and more. Too much on the screen? Turn on <b>🧩 Simple mode</b>: just the main pages with bigger buttons (everything else is under <b>☰ More</b>).''')
