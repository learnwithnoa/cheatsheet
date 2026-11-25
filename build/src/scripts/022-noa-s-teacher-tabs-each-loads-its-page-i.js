
/* Noa's teacher tabs: each loads its page inside Home (quietly in the background too, so they open instantly and the menu can show LIVE) */
(function(){
  const ok=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  const T={students:document.getElementById("stFrame"),members:document.getElementById("mbFrame")};
  const sec=k=>document.getElementById("v-"+k);
  function load(k,bg){ const box=T[k]; if(!box||box.dataset.on) return; const sc=sec(k); if(sc.hidden&&bg!==true) return;
    if(!ok()){ if(!sc.hidden&&window.__csTeacher===false) notMine(); return; }
    box.dataset.on="1"; box.innerHTML=`<iframe src="${box.id==="stFrame"?(()=>{ let v="overview"; try{ v=localStorage.getItem("cs-hub-view")||"overview"; }catch(er){} if(!["overview","students","money"].includes(v)) v="overview"; return box.dataset.src.split("#")[0]+"#"+(PEND.students||v); })():(PEND.members?box.dataset.src.split("#")[0]+"#"+PEND.members:box.dataset.src)}" title="${box.dataset.ttl}" scrolling="no" allow="clipboard-write"></iframe>`; }
  ["students","members"].forEach(k=>{ const sc=sec(k); if(sc) new MutationObserver(()=>load(k)).observe(sc,{attributes:true,attributeFilter:["hidden"]}); });
  const bgAll=()=>{ if(window.__csTeacher===true){ load("students",true); setTimeout(()=>load("members",true),1500); } };
  document.addEventListener("cs-teacher",()=>setTimeout(bgAll,2500)); setTimeout(()=>{ load("students"); load("members"); },800); setTimeout(bgAll,3000);
  addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data) return; const d=e.data;
    if(d.stLive!==undefined){ const x=document.getElementById("stLiveDot"); if(x) x.hidden=!d.stLive; }
    /* one scrollbar: the frame is as tall as its page */
    if(d.embH&&T[d.emb]){ const f=T[d.emb].querySelector("iframe"); if(f) f.style.height=d.embH+"px"; }
    /* a link to the other teacher page: switch tabs here */
    if(d.embGo&&T[d.embGo]){ openTab(d.embGo,d.hash||""); } });
  const PEND={}; window.__csDeep=window.__csDeep||{};
  const fhash=k=>{ try{ const f=T[k]&&T[k].querySelector("iframe"); return f&&f.contentWindow?f.contentWindow.location.hash.slice(1):""; }catch(e){ return ""; } };
  ["students","members"].forEach(k=>{ window.__csDeep[k]={hash:()=>{ const h=PEND[k]||fhash(k); return "#"+k+(h?"/"+h:""); },open:p=>{ const h="#"+p.join("/"); const f=T[k]&&T[k].querySelector("iframe"); if(f){ openTab(k,h); } else PEND[k]=p.join("/"); }}; });
  const ds=window.__csDeepStart; if(ds&&T[ds.id]) PEND[ds.id]=ds.parts.join("/");
  function watch(k){ const f=T[k]&&T[k].querySelector("iframe"); if(!f||f.dataset.watch) return; f.dataset.watch="1";
    const hook=()=>{ try{ if(PEND[k]){ const h="#"+PEND[k]; delete PEND[k]; if(f.contentWindow.location.hash!==h) f.contentWindow.location.hash=h; } f.contentWindow.addEventListener("hashchange",()=>window.__csSyncUrl&&window.__csSyncUrl(k)); window.__csSyncUrl&&window.__csSyncUrl(k); }catch(e){} };
    f.addEventListener("load",hook); try{ if(f.contentDocument&&f.contentDocument.readyState==="complete"&&f.contentWindow.location.href!=="about:blank") hook(); }catch(e){} }
  /* Nov 25 2026 (sweep): a student who opens #students or #members by link goes back Home once we know they aren't Noa */
  const notMine=()=>{ if(window.__csTeacher!==false||window.__csViewAsMode||window.__csPreview) return; if(["students","members"].some(k=>{ const sc=sec(k); return sc&&!sc.hidden; })){ if(window.csGo) window.csGo("notes"); else location.replace("#notes"); } };
  document.addEventListener("cs-teacher",notMine);
  setInterval(()=>{ watch("students"); watch("members"); notMine(); },700);
  function openTab(k,hash){ const b=document.querySelector(`.navbtn[data-go="${k}"]`); if(b) b.click(); load(k); const f=T[k]&&T[k].querySelector("iframe");
    if(f&&hash){ try{ if(f.contentWindow.location.hash!==hash) f.contentWindow.location.hash=hash; }catch(er){ f.src=T[k].dataset.src.split("#")[0]+hash; } } }
  /* links on Home to the teacher pages (notifications…) open the tabs instead */
  document.addEventListener("click",e=>{ const a=e.target.closest('a[href^="private-students.html"],a[href^="members.html"]'); if(!a||!ok()||a.target==="_blank"||e.metaKey||e.ctrlKey) return;
    const h=a.getAttribute("href"), k=h.indexOf("members.html")===0?"members":"students"; e.preventDefault(); openTab(k,(h.split("#")[1]?"#"+h.split("#")[1]:"")); });
})();
