# step92: profile saves run one after another (a name change no longer erases the title); the editor and message search use fresh profiles; GIF picker cells stay in their box
R('''  async function saveMe(patch){ if(G()||!me()) return;''','''  let SAVEQ=Promise.resolve();
  function saveMe(patch){ const run=()=>saveMe0(patch); const r=SAVEQ.then(run,run); SAVEQ=r.catch(()=>{}); return r; }  /* one save at a time: each one starts from the result of the one before */
  async function saveMe0(patch){ if(G()||!me()) return;''')
R('''      if(e.target.closest("[data-pedit]")){ const box=o.querySelector("[data-pabout]"), cur=profOf(me())||{}; e.target.closest("[data-pedit]").hidden=true;''',
  '''      if(e.target.closest("[data-pedit]")){ const box=o.querySelector("[data-pabout]"); e.target.closest("[data-pedit]").hidden=true;
        let cur=profOf(me())||{}; try{ await SAVEQ; const d0=await api("GET","/clubProfiles/"+me()); if(d0&&d0.fields) cur=fromDoc(d0); }catch(er){}''')
R('''  async function openInbox(){ if(!PROFS) loadProfs().then(''','''  async function openInbox(){ loadProfs(true).then(''')
_css = '''
/* step92: an older rule ("all:unset") was undoing the GIF box, so each GIF filled the screen */
.cs-gg .cs-gi{position:relative!important;display:block!important;height:100%!important;aspect-ratio:auto!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
