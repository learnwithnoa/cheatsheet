
/* step154: Daily Stoic on Home for members who turn it on in Settings (Noa always has his own) */
(function(){
  const K="ncs-stoic", CK="cs-stoic-pub";
  const isOn=()=>{ try{ return JSON.parse(localStorage.getItem(K)||'"off"')==="on"; }catch(e){ return false; } };
  const teacher=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const today=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
  const short=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}); }catch(e){ return d; } };
  let LIST=null, loading=false;
  function cached(){ try{ const c=JSON.parse(localStorage.getItem(CK)||"null"); return c&&Date.now()-c.at<6*36e5?c.list:null; }catch(e){ return null; } }
  async function load(){ if(LIST||loading) return; LIST=cached(); if(LIST){ paint(); return; } loading=true;
    try{ const F=window.__csFire; if(!F||!F.token) return; const tok=await F.token(); if(!tok) return;
      const r=await fetch(F.base+"/clubPublic/stoic",{headers:{Authorization:"Bearer "+tok}}); if(!r.ok) return; const d=await r.json();
      LIST=(JSON.parse(d.fields.json.stringValue)||{}).list||[]; try{ localStorage.setItem(CK,JSON.stringify({at:Date.now(),list:LIST})); }catch(e){} paint(); }
    catch(e){} finally{ loading=false; } }
  function paint(){
    const b=document.getElementById("tStoic"); if(!b||teacher()) return;
    if(!isOn()||window.__csGuest){ b.hidden=true; return; }
    if(!LIST){ load(); return; }
    const td=today(), e=LIST.slice().sort((a,c)=>String(a.d).localeCompare(String(c.d))).filter(x=>x.d<=td).pop();
    if(!e){ b.hidden=true; return; }
    b.innerHTML=`<span class="st-k">🏛️ Daily Stoic${e.d===td?"":" · "+esc(short(e.d))}</span><b>${esc(e.title)}</b><span class="st-i">${esc(e.idea)}</span>${e.todo?`<span class="st-t">✔︎ ${esc(e.todo)}</span>`:""}`;
    b.hidden=false;
  }
  window.__csStoicPaint=paint;
  setTimeout(paint,600); setTimeout(paint,2500);
  ["cs-teacher","cs-preview","cs-hubview"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(paint,50)));
  addEventListener("cs-auth",()=>{ setTimeout(paint,300); setTimeout(paint,3000); });
  addEventListener("storage",e=>{ if(e.key===K) paint(); });

  /* Settings switch */
  function add(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csStoicT")) return;
    const F=window.__csFire; if(!F||!F.uid||!F.uid()||window.__csGuest||teacher()) return;
    const anchor=document.getElementById("csResetAll"); if(!anchor) return;
    const box=document.createElement("div"); box.className="cs-sec cs-stoicsec";
    box.innerHTML=`<h4>Daily Stoic</h4><label class="cs-tog"><input type="checkbox" id="csStoicT"><span><b>🏛️ Daily Stoic on Home</b><small>One short idea from the Stoics each day, with a small thing to try, at the top of Home. In easy English.</small></span></label>`;
    const host=document.querySelector(".cs-mailn")||document.getElementById("csInstallSec")||anchor.closest(".cs-sec")||anchor.parentNode; host.parentNode.insertBefore(box,host);
    const cb=box.querySelector("input"); cb.checked=isOn();
    cb.addEventListener("change",()=>{
      if(window.__csPreview||(F.readOnly&&F.readOnly())){ cb.checked=isOn(); if(typeof window.toast==="function") window.toast("In View as nothing changes."); return; }
      try{ localStorage.setItem(K,JSON.stringify(cb.checked?"on":"off")); }catch(e){}
      paint(); if(typeof window.toast==="function") window.toast(cb.checked?"🏛️ The Daily Stoic is on your Home page now.":"Got it: no Daily Stoic on Home.");
    });
  }
  document.addEventListener("click",e=>{ if(e.target.closest("#csBtn")) setTimeout(add,40); },true);
  new MutationObserver(()=>{ const p=document.getElementById("csPanel"); if(p&&!p.hidden) add(); }).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["hidden"]});
})();
