# step168 (Nov 17 2026): the address bar follows you inside Practice (#quiz/grammar/past-simple, #quiz/my-words/flashcards…),
# and those links open the same place when shared, refreshed or bookmarked.
R('''  function show(p,fromPop){
    cur=p||null;''', '''  const PSLUG={gram:"grammar",words:"my-words",vocab:"word-packs",pron:"pronunciation",mis:"my-mistakes",irr:"irregular-verbs",flash:"flashcards",sent:"sentences",say:"say-it",level:"level-check"};
  const mslug=id=>String(MODS[id].name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function hashFor(c){ if(!c) return "#quiz"; if(c==="vset") c="vocab"; const p=par(c), me=c==="ps"?mslug(M):PSLUG[c]; return "#quiz/"+(p&&PSLUG[p]?PSLUG[p]+"/":"")+(me||""); }
  window.__prHash=()=>hashFor(cur);
  function syncUrl(){ try{ if(view.hidden) return; const h=hashFor(cur); if(location.hash!==h) history.replaceState(Object.assign({},history.state||{cs:1,v:"quiz"},{pp:cur,m:M}),"",h); }catch(e){} }
  window.__prOpenPath=parts=>{ parts=(parts||[]).filter(Boolean); if(!parts.length){ round=null; show(null,true); syncUrl(); return; }
    const inv={}; Object.keys(PSLUG).forEach(k=>inv[PSLUG[k]]=k);
    const last=parts[parts.length-1], mod=Object.keys(MODS).find(id=>mslug(id)===last);
    round=null; if(mod){ setMod(mod); show("ps",true); } else if(inv[last]) show(inv[last],true); else if(inv[parts[0]]) show(inv[parts[0]],true); else show(null,true);
    syncUrl(); };
  function show(p,fromPop){
    cur=p||null;''')
R('''history.pushState({cs:1,v:"quiz",pp:cur,n:(st.n|0)+1},"","#quiz"); }catch(e){} }''', '''history.pushState({cs:1,v:"quiz",pp:cur,m:M,n:(st.n|0)+1},"",hashFor(cur)); }catch(e){} }''')
R('''    if(!cur) renderHub();
    window.scrollTo({top:0});
  }''', '''    if(!cur) renderHub();
    window.scrollTo({top:0});
    syncUrl();
  }''')
R('''  window.__prShow=(p,fromPop)=>{ round=null; show(p,fromPop); };''', '''  window.__prShow=(p,fromPop,m)=>{ round=null; if(m&&MODS[m]) setMod(m); show(p,fromPop); };''')
R('''  if(id===curView){ if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true); return; }''', '''  if(id===curView){ if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true,st.m); return; }''')
R('''  if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true);
  renderBack();''', '''  if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true,st.m);
  renderBack();''')
R('''const U=id==="notes"?location.pathname+location.search:"#"+id;''', '''const U=id==="notes"?location.pathname+location.search:(id==="quiz"&&window.__prHash?window.__prHash():"#"+id);''')
R('''window.addEventListener("hashchange",()=>{ const h=location.hash.slice(1); if(h&&h!==curView&&ids.includes(h)) go(h); });''',
  '''window.addEventListener("hashchange",()=>{ const hp=location.hash.slice(1).split("/"), h=hp[0]; if(h&&h!==curView&&ids.includes(h)) go(h); if(h==="quiz"&&hp.length>1&&window.__prOpenPath&&window.__prHash&&window.__prHash()!==location.hash) window.__prOpenPath(hp.slice(1)); });''')
R('''let start=location.hash.slice(1);
if(!ids.includes(start)){''', '''const deepStart=location.hash.slice(1).split("/").slice(1);
let start=location.hash.slice(1).split("/")[0];
if(!ids.includes(start)){''')
R('''try{ history.replaceState({cs:1,v:curView,n:0},"",curView==="notes"?location.pathname+location.search:"#"+curView); }catch(e){}''',
  '''try{ history.replaceState({cs:1,v:curView,n:0},"",curView==="notes"?location.pathname+location.search:"#"+curView); }catch(e){}
if(curView==="quiz"&&deepStart.length&&window.__prOpenPath) window.__prOpenPath(deepStart);''')
