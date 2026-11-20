
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
    /* the Translator is one of the main buttons too (a copy that only shows in Simple mode) */
    if(!document.getElementById("smTr")&&document.querySelector('nav.side .navbtn[data-go="translate"]')){
      const t=document.createElement("button"); t.type="button"; t.id="smTr"; t.className="navbtn cn-nav sm-keep sm-only"; t.dataset.smgo="translate"; t.onclick=()=>{ if(window.csGo) window.csGo("translate"); else location.hash="#translate"; };
      t.innerHTML='<span class="w-ico tr-ico" aria-hidden="true">⇄</span><span>Translator</span>';
      const q=mine.querySelector('.navbtn[data-go="quiz"]'); if(q) q.after(t); else mine.appendChild(t);
    }
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
    if(document.getElementById("v-translate")) D.push(["translate","⇄","Translator","Spanish ↔ English, with examples you can save","#A78BFA"]);
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
    let beg=false; try{ const lv=localStorage.getItem("ncs-level")||""; beg=lv==="beginner"||lv==='"beginner"'; }catch(e){}
    bd.innerHTML=`<div class="csc" role="alertdialog" aria-modal="true" aria-labelledby="smAskT"><h3 id="smAskT">Hibi, made simpler 🧩</h3><div class="csc-b"><p>Noa turned on <b>Simple mode</b> for you: just the main pages, with bigger buttons. Everything else is still here, under <b>☰ More</b>.</p><p class="es">Noa activó el modo simple: solo lo principal, con botones más grandes. Lo demás sigue en <b>☰ More</b>.</p></div>${beg?"":'<label class="sm-beg"><input type="checkbox" id="smBeg"><span>🌱 Also turn on <b>Spanish help</b> (Beginner mode)<br><span class="es">Activar ayuda en español</span></span></label>'}<div class="csc-a"><button type="button" data-c="0">Show me everything</button><button type="button" data-c="1" class="csc-y">Keep it simple</button></div></div>`;
    const done=keep=>{ const bx=bd.querySelector("#smBeg"), bg=!!(bx&&bx.checked&&window.csSetLevel); if(bg){ try{ window.csSetLevel(true); }catch(e){} } bd.remove(); document.removeEventListener("keydown",key,true); put(Object.assign({},get(),{on:keep,asked:true})); if(!keep) setMore(false); apply(); if(!bg) toast(keep?"Simple mode is on. Change it anytime in Settings.":"Simple mode off. You can turn it back on in Settings."); };
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
  /* Noa's switch arrives with the first sync after sign-in: apply it (and ask) right away, no reload needed */
  addEventListener("cs-synced",()=>{ apply(); try{ window.csComfort&&window.csComfort.apply&&window.csComfort.apply(); }catch(e){} ask(0); });
  setTimeout(()=>ask(0),3000);
})();
