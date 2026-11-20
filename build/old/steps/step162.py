# step162 (Nov 17 2026): every grammar module gets a Stage 8 "Advanced" (B2–C1). It's a bonus: it opens like the others
# (after stage 7, or after testing out), but it isn't needed to finish the module or get the buddy toy, and it doesn't
# count in the module's star total.
R('''  const totalStars=(id)=>{ const p=ps(id); return MODS[id||M].stages.reduce((t,st)=>t+(p.s[st.n]|0),0); };
  const allDone=(id)=>{ const p=ps(id); return testedOut(id)||MODS[id||M].stages.every(st=>(p.b[st.n]|0)>=PASS); };''',
  '''  const core=(id)=>MODS[id||M].stages.filter(st=>!st.adv);
  const totalStars=(id)=>{ const p=ps(id); return core(id).reduce((t,st)=>t+(p.s[st.n]|0),0); };
  const allDone=(id)=>{ const p=ps(id); return testedOut(id)||core(id).every(st=>(p.b[st.n]|0)>=PASS); };''')
R('''window.__csModInfo=()=>Object.values(MODS).map(md=>[md.id,md.stages.length]);''', '''window.__csModInfo=()=>Object.values(MODS).map(md=>[md.id,md.stages.filter(st=>!st.adv).length]);''')
R('''tot=md.stages.length*3''', '''tot=md.stages.filter(st=>!st.adv).length*3''')
R('''"Finish all "+md.stages.length''', '''"Finish all "+md.stages.filter(st=>!st.adv).length''')
R('''md.stages.forEach(st=>{ p.s[st.n]=Math.max(p.s[st.n]|0,3); }); }''', '''md.stages.forEach(st=>{ if(!st.adv) p.s[st.n]=Math.max(p.s[st.n]|0,3); }); }''')
R('''      const open=unlocked(st.n), best=p.b[st.n];''', '''      const open=unlocked(st.n), best=p.b[st.n];
      if(st.adv) return '<div class="ps-advhd"><b>⭐ Advanced</b><span>B2–C1 · a bonus stage. You don’t need it to finish the module.</span></div><div class="card ps-stage ps-adv'+(open?"":" locked")+(r===st.n?" rec":"")+'"><div class="ps-num">'+(open?"⭐":"🔒")+'</div><div class="ps-info"><b>Stage '+st.n+' · '+esc(st.t)+'</b><span>'+esc(st.sub)+'</span>'+
        (r===st.n?'<span class="pr-rec">⭐ Noa recommends this one</span>':"")+'</div><div class="ps-side">'+stars(p.s[st.n]|0)+'<small>'+(best!=null?"best "+best+"/10":open?"not tried yet":"pass stage "+(st.n-1)+" or test out")+'</small>'+
        (open?'<button class="pill-btn'+(best==null?" pill-green":"")+'" type="button" data-psstart="'+st.n+'">'+(best==null?"Start":"Practice")+'</button>':"")+'</div></div>';''')
_css = r'''
/* step162: advanced bonus stage */
.ps-advhd{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;margin:10px 2px 0}
.ps-advhd b{font-size:15px}.ps-advhd span{color:var(--muted);font-size:13px}
.ps-stage.ps-adv{border:1.5px solid color-mix(in srgb,#f59e0b 55%,transparent);background:linear-gradient(160deg,color-mix(in srgb,#f59e0b 12%,var(--surface)),var(--surface))}
.ps-stage.ps-adv .ps-num{background:color-mix(in srgb,#f59e0b 22%,transparent)}
.ps-stage.ps-adv.locked{opacity:.75}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
