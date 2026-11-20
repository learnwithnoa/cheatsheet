# step197 (Nov 20 2026): sign-in gate is strict.
# - approved only if access/{email} exists and isn't marked "gone"; if Hibi can't check (network), it tries again and,
#   without a recent OK on this device, shows "Couldn't connect" instead of letting them in
# - Hibi's sync waits for the gate: nothing is copied into an account (and no buddy goes to the park) until it's approved
_a = s.index('  async function approved(){ const F=window.__csFire;')
_b = s.index('if(ok) hide(); else show("pending"); }', _a) + len('if(ok) hide(); else show("pending"); }')
_old = s[_a:_b]
assert _old.count('async function check()') == 1
_teach = [l for l in _old.split('\n') if 'window.__csTeacher===true' in l][0].strip()   # the teacher line, kept as it was
_teach = _teach.replace('return true;', 'return "yes";')
_new = '''  /* "yes" | "no" | "unknown" (couldn't reach the database) */
  async function approved(){ const F=window.__csFire; if(!F||!F.email) return "unknown"; const em=String(F.email()||"").toLowerCase(); if(!em) return "unknown";
    ''' + _teach + '''
    for(let i=0;i<3;i++){
      try{ const tok=await F.token(); const r=await fetch(F.base+"/access/"+encodeURIComponent(em),{headers:{Authorization:"Bearer "+tok}});
        if(r.status===404) return "no";
        if(r.ok){ const d=await r.json().catch(()=>({})); const g=d&&d.fields&&d.fields.gone; return g&&g.booleanValue?"no":"yes"; }
        if(r.status===403) return "no";
      }catch(e){}
      await new Promise(f=>setTimeout(f,1500*(i+1)));
    }
    return "unknown"; }
  /* the sync (cloud.js) waits for this before touching anyone's data: window.__csGateWait(uid) -> true/false */
  const GW={}; const gw=uid=>GW[uid]||(GW[uid]=(()=>{ let res; const p=new Promise(f=>res=f); p.res=res; return p; })());
  window.__csGateWait=uid=>{ const p=gw(uid); return Promise.race([p,new Promise(f=>setTimeout(()=>f(false),30000))]); };
  async function check(){ const F=window.__csFire, uid=F&&F.uid?F.uid():""; let cached=false; try{ const c=+localStorage.getItem(OKK(uid)); cached=c===1||(c>1&&Date.now()-c<30*864e5); }catch(e){}
    if(cached) hide();
    const st=await approved();
    if(st==="yes"){ try{ localStorage.setItem(OKK(uid),String(Date.now())); }catch(e){} hide(); gw(uid).res(true); return; }
    if(st==="no"){ try{ localStorage.removeItem(OKK(uid)); }catch(e){} show("pending"); gw(uid).res(false); return; }
    /* couldn't check: someone approved on this device recently keeps going; anyone else waits */
    if(cached){ gw(uid).res(true); return; }
    show("retry"); gw(uid).res(false); }'''
s = s[:_a] + _new + s[_b:]
R('''    if(m==="sent") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>''',
'''    if(m==="retry") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>
      <h2 id="agTitle">Hmm, Hibi couldn’t connect</h2><p>Check your internet connection and try again.</p>
      <p class="ag-es" lang="es">Hibi no pudo conectarse. Revisa tu conexión a internet e inténtalo de nuevo.</p>
      <button type="button" class="ag-btn" data-agretry>Try again</button>
      <button type="button" class="ag-link" data-agout>Use another Google account</button>`;
    if(m==="sent") return `<div class="ag-logo" aria-hidden="true">Hibi <small lang="ja">日々</small></div>''')
R('''  const on=s=>{ if(s) check(); else show(mode==="sent"?"sent":"out"); };''', '''  const on=s=>{ if(s) check(); else show(mode==="sent"?"sent":"out"); };
  document.addEventListener("click",e=>{ if(e.target.closest("[data-agretry]")) location.reload(); });''')
