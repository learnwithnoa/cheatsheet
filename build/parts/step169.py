# step169 (Nov 17 2026): every section gets its own link: Club tabs (#club/wall), My coaching tabs (#coaching/pack),
# Noa's teacher pages (#students/<their page>, #members/<their page>). Uses the router's __csDeep registry (step168).
# ---- Club ----
R('''  let tab=(()=>{ try{ return sessionStorage.getItem("cs-club-tab")||"week"; }catch(e){ return "week"; } })();''',
  '''  let tab=(()=>{ try{ return sessionStorage.getItem("cs-club-tab")||"week"; }catch(e){ return "week"; } })();
  window.__csDeep=window.__csDeep||{}; window.__csDeep.club={hash:()=>"#club"+(tab&&tab!=="week"?"/"+tab:""),open:p=>{ if(p[0]){ tab=p[0]; try{ sessionStorage.setItem("cs-club-tab",tab); }catch(e){} } setTimeout(()=>{ render(); },0); }};''')
R('''    if(window.__clubSocial){ window.__clubSocial.mount(box); if(tab!=="wall") window.__clubSocial.refreshBadge(); }''',
  '''    if(window.__clubSocial){ window.__clubSocial.mount(box); if(tab!=="wall") window.__clubSocial.refreshBadge(); }
    if(window.__csSyncUrl) window.__csSyncUrl("club");''')
R('''  window.addEventListener("hashchange",()=>{ if(location.hash==="#club") setTimeout(render,0); });''',
  '''  window.addEventListener("hashchange",()=>{ if(location.hash==="#club"){ tab="week"; setTimeout(render,0); } });''')
# ---- My coaching ----
R('''  let tab="classes", cSort=-1, wSort="new", openRep=null;''',
  '''  let tab="classes", cSort=-1, wSort="new", openRep=null;
  window.__csDeep=window.__csDeep||{}; window.__csDeep.coaching={hash:()=>"#coaching"+(tab&&tab!=="classes"?"/"+tab:""),open:p=>{ if(p[0]) tab=p[0]; setTimeout(()=>{ try{ render(); }catch(e){} },0); }};''')
R('''if(t.dataset.ws) wSort=t.dataset.ws; render(); });''', '''if(t.dataset.ws) wSort=t.dataset.ws; render(); if(window.__csSyncUrl) window.__csSyncUrl("coaching"); });''')
# ---- Noa's teacher pages: the page inside keeps its own address (#overview, #<student>…); Home shows it as #students/… ----
R('''  function openTab(k,hash){''', '''  const PEND={}; window.__csDeep=window.__csDeep||{};
  const fhash=k=>{ try{ const f=T[k]&&T[k].querySelector("iframe"); return f&&f.contentWindow?f.contentWindow.location.hash.slice(1):""; }catch(e){ return ""; } };
  ["students","members"].forEach(k=>{ window.__csDeep[k]={hash:()=>{ const h=PEND[k]||fhash(k); return "#"+k+(h?"/"+h:""); },open:p=>{ const h="#"+p.join("/"); const f=T[k]&&T[k].querySelector("iframe"); if(f){ openTab(k,h); } else PEND[k]=p.join("/"); }}; });
  const ds=window.__csDeepStart; if(ds&&T[ds.id]) PEND[ds.id]=ds.parts.join("/");
  function watch(k){ const f=T[k]&&T[k].querySelector("iframe"); if(!f||f.dataset.watch) return; f.dataset.watch="1";
    const hook=()=>{ try{ if(PEND[k]){ const h="#"+PEND[k]; delete PEND[k]; if(f.contentWindow.location.hash!==h) f.contentWindow.location.hash=h; } f.contentWindow.addEventListener("hashchange",()=>window.__csSyncUrl&&window.__csSyncUrl(k)); window.__csSyncUrl&&window.__csSyncUrl(k); }catch(e){} };
    f.addEventListener("load",hook); try{ if(f.contentDocument&&f.contentDocument.readyState==="complete"&&f.contentWindow.location.href!=="about:blank") hook(); }catch(e){} }
  setInterval(()=>{ watch("students"); watch("members"); },700);
  function openTab(k,hash){''')
R('''return box.dataset.src.split("#")[0]+"#"+v; })():box.dataset.src}''', '''return box.dataset.src.split("#")[0]+"#"+(PEND.students||v); })():(PEND.members?box.dataset.src.split("#")[0]+"#"+PEND.members:box.dataset.src)}''')
R('''    box.innerHTML=newsBox+top+mapBox+''', '''    setTimeout(()=>window.__csSyncUrl&&window.__csSyncUrl("coaching"),0);
    box.innerHTML=newsBox+top+mapBox+''')
