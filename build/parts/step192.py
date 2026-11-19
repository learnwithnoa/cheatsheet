# step192 (Nov 19 2026): grammar modules show what you've done, even without stars (Fernanda saw "nothing saved"):
# 1 test out: the last score ("Last try: 11/15 on Nov 16 · 4 more to pass")
# 2 stages without stars: "best 5/10 · 2 tries · last yesterday" + "Try again"
# 3 "Stop this round" keeps your place: "⏸ stopped at question 6" + Continue
# 4 tiles: "0 / 21 ★ · started · practiced yesterday"
# 5 "📜 Your tries" history in each module (last 20)
# 6 the star rules on the page: ★ 7/10 · ★★ 9/10 · ★★★ 10/10
# Saved in ncs-mods[mod]: tr {stage: tries}, ls {stage: {sc,t}}, lt {sc,t,at?} last test, pause {n,ids,mc,i,score,missed,t}, h [{k:"st"|"to"|"stop",n,sc,of,at,t}]

# helpers (inside the practice code)
R('''const starsFor=sc=>''', '''const hist=(p,e)=>{ e.t=Date.now(); p.h=Array.isArray(p.h)?p.h:[]; p.h.unshift(e); p.h=p.h.slice(0,20); };
  const relD=t=>{ const d=new Date(t); if(isNaN(d)) return ""; const a=new Date(); a.setHours(0,0,0,0); const b=new Date(d); b.setHours(0,0,0,0); const n=Math.round((a-b)/864e5); return n<=0?"today":n===1?"yesterday":n<7?n+" days ago":"on "+d.toLocaleDateString("en-US",{month:"short",day:"numeric"}); };
  const todT=s=>{ const m=String(s||"").match(/^(\\d+)-(\\d+)-(\\d+)$/); return m?new Date(+m[1],+m[2]-1,+m[3],12).getTime():0; };
  const triedTxt=(p,n,best)=>{ const tr=(p.tr||{})[n]|0, ls=(p.ls||{})[n]; return "best "+best+"/10"+(tr>1?" · "+tr+" tries":"")+(ls&&ls.t?" · last "+relD(ls.t)+(ls.sc!==best?" ("+ls.sc+"/10)":""):""); };
  const stBtn=(p,n,best,open)=>{ if(!open) return ""; const pz=p.pause&&p.pause.n===n?p.pause:null;
    if(pz) return '<small class="ps-pz">⏸ '+pz.i+'/'+pz.ids.length+' done</small><button class="pill-btn pill-green" type="button" data-pscont="'+n+'">Continue</button><button class="ps-over" type="button" data-psstart="'+n+'">Start over</button>';
    return '<button class="pill-btn'+(best==null||best<PASS?" pill-green":"")+'" type="button" data-psstart="'+n+'">'+(best==null?"Start":best<PASS?"Try again":"Practice")+'</button>'; };
  const lastTest=p=>{ if(p.lt&&p.lt.t) return "Last try: <b>"+p.lt.sc+"/15</b> "+relD(p.lt.t)+(p.lt.at?" (stopped after "+p.lt.at+" questions)":p.lt.sc<TOPASS?" · "+(TOPASS-p.lt.sc)+" more to pass":""); const t=todT(p.tod); return t?"Last try: "+relD(t)+" (no score saved for that one)":""; };
  const histHTML=(p,md)=>{ const h=Array.isArray(p.h)?p.h:[]; if(!h.length) return "";
    const nm=n=>{ const st=md.stages.find(x=>x.n===n); return st?(st.adv?"⭐ Advanced":"Stage "+n):"Stage "+n; };
    return '<details class="ps-hist"><summary>📜 Your tries ('+h.length+')</summary><ul>'+h.map(e=>'<li><span class="ps-hd">'+new Date(e.t).toLocaleDateString("en-US",{month:"short",day:"numeric"})+' · '+new Date(e.t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})+'</span><span>'+
      (e.k==="to"?"🎓 Test out: <b>"+e.sc+"/15</b>"+(e.at?" (stopped after "+e.at+" questions)":e.sc>=TOPASS?" · passed 🎉":""):e.k==="stop"?"⏸ "+nm(e.n)+": stopped after "+e.at+" questions ("+e.sc+" right)":nm(e.n)+": <b>"+e.sc+"/10</b> "+stars(starsFor(e.sc)))+'</span></li>').join("")+'</ul></details>'; };
  const starsFor=sc=>''')
# a finished stage round: count tries, last score, history; a new start forgets the paused one
R('''p.s[st]=Math.max(p.s[st]|0,starsFor(R.score)); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);''',
  '''p.s[st]=Math.max(p.s[st]|0,starsFor(R.score)); p.tr=p.tr||{}; p.tr[st]=(p.tr[st]|0)+1; p.ls=p.ls||{}; p.ls[st]={sc:R.score,t:Date.now()}; if(p.pause&&p.pause.n===st) delete p.pause; hist(p,{k:"st",n:st,sc:R.score}); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);''')
R('''if(kind==="ps"){ const st=MD().stages[stage-1];''', '''if(kind==="ps"){ const st=MD().stages[stage-1]; { const m0=mods(), p0=ps(); if(p0.pause&&p0.pause.n===stage){ delete p0.pause; m0[M]=p0; LS.set("ncs-mods",m0); } }''')
# the test out: keep the score
R('''    p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
    const finished=pass&&!wasDone;''', '''    p.lt={sc,t:Date.now()}; hist(p,{k:"to",sc}); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
    const finished=pass&&!wasDone;''')
R('''<span class="esb">Examen para eximirte: 15 preguntas difíciles. Con las 15 correctas apruebas todo el módulo.</span></div>'+''',
  '''<span class="esb">Examen para eximirte: 15 preguntas difíciles. Con las 15 correctas apruebas todo el módulo.</span>'+(lastTest(p)?'<span class="ps-last">'+lastTest(p)+'</span>':"")+'</div>'+''')
# stages: what you did + the right button
assert s.count('''(best!=null?"best "+best+"/10":''') == 2
s = s.replace('''(best!=null?"best "+best+"/10":''', '''(best!=null?triedTxt(p,st.n,best):''')
_b = '''(open?'<button class="pill-btn'+(best==null?" pill-green":"")+'" type="button" data-psstart="'+st.n+'">'+(best==null?"Start":"Practice")+'</button>':"")'''
assert s.count(_b) == 2
s = s.replace(_b, '''stBtn(p,st.n,best,open)''')
assert s.count('''open?"not tried yet":''') == 2
s = s.replace('''open?"not tried yet":''', '''open?(p.pause&&p.pause.n===st.n?"":"not tried yet"):''')
# top: the star rules + a paused round; bottom: the history
R('''box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+'<div class="ps-cols''', '''box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+'<p class="ps-legend">Stars: ★ 7/10 · ★★ 9/10 · ★★★ 10/10. Below 7, your best score and tries are still saved.</p>'+
      (p.pause&&md.stages.find(x=>x.n===p.pause.n)?'<div class="card ps-pause"><span>⏸ You stopped <b>Stage '+p.pause.n+'</b> after '+p.pause.i+' of '+p.pause.ids.length+' questions ('+p.pause.score+' right) '+relD(p.pause.t)+'. Pick up where you left off:</span><button class="pill-btn pill-green" type="button" data-pscont="'+p.pause.n+'">Continue</button></div>':"")+'<div class="ps-cols''')
R('''+'</p></div>'+(toCard?''', '''+'</p>'+histHTML(p,md)+'</div>'+(toCard?''')
# stopping a round keeps your place (stage rounds), or uses up the test (test out)
R('''if(e.target.closest("[data-psquit]")){ const k=round&&round.kind; round=null;''', '''if(e.target.closest("[data-psquit]")&&round&&(round.kind==="ps"||round.kind==="test")){ const R=round, at=R.answered?R.i+1:R.i;
      if(R.kind==="test"){ if(at>0){ const m=mods(), p=ps(); p.lt={sc:R.score,t:Date.now(),at:at}; hist(p,{k:"to",sc:R.score,at}); p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m); } round=null; renderStages(); return; }
      if(R.retry||at>=R.list.length){ finish(); return; }
      if(at>0&&!R.story&&R.list.every(x=>x.q&&ITEM[x.q.id])){ const m=mods(), p=ps(); p.pause={n:R.stage,ids:R.list.map(x=>x.q.id),mc:R.list.map(x=>!!x.mc),i:at,score:R.score,missed:R.missed.map(x=>x.q.id),t:Date.now()}; const h0=(p.h||[])[0]; if(!(h0&&h0.k==="stop"&&h0.n===R.stage&&h0.at===at)) hist(p,{k:"stop",n:R.stage,sc:R.score,at}); p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m); }
      round=null; renderStages(); return; }
    const pc=e.target.closest("[data-pscont]"); if(pc){ const p=ps(), pz=p.pause, st=pz&&MD().stages.find(x=>x.n===pz.n);
      if(!pz||!st||!pz.ids.every(id=>ITEM[id])){ if(pz){ const m=mods(); delete p.pause; m[M]=p; LS.set("ncs-mods",m); } renderStages(); return; }
      const list=pz.ids.map((id,j)=>({q:ITEM[id],mc:!!pz.mc[j]}));
      round={kind:"ps",stage:pz.n,title:"Stage "+st.n+" · "+st.t,list,i:pz.i,score:pz.score|0,missed:(pz.missed||[]).map(id=>list.find(x=>x.q.id===id)).filter(Boolean),retry:false,answered:false,story:null};
      show("ps"); paintQ(); return; }
    if(e.target.closest("[data-psquit]")){ const k=round&&round.kind; round=null;''')
# tiles: show effort, not only stars
R('''ts.querySelector(".pr-sub").innerHTML=(testedOut(id)?"🎓 ":"")+t+" / "+tot+" ★"+''', '''const pp=ps(id); ts.querySelector(".pr-sub").innerHTML=(testedOut(id)?"🎓 ":"")+t+" / "+tot+" ★"+(!t&&(pp.r||pp.tod||pp.pause)?" · started":"")+((pp.last||todT(pp.tod))?' · <span class="pr-when">practiced '+relD(pp.last||todT(pp.tod))+'</span>':"")+''')
_css = r'''
/* step192: what you've done in a module */
.ps-legend{margin:-4px 0 14px;font-size:13.5px;color:var(--muted)}
.ps-pause{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:12px 16px;margin:0 0 14px;border:1.5px solid var(--c2,#5AB8FF)}
.ps-last{display:block;margin-top:8px;font-weight:700;font-size:14px;color:var(--ink)}
.ps-side .ps-pz{color:var(--c2,#5AB8FF);font-weight:700;white-space:nowrap}
.ps-over{all:unset;cursor:pointer;white-space:nowrap;font-size:12.5px;color:var(--muted);text-decoration:underline;text-underline-offset:2px}
.ps-hist{margin:14px 0 0;border:1.5px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--surface)}
.ps-hist summary{font-weight:800}
.ps-hist ul{list-style:none;margin:10px 0 0;padding:0}
.ps-hist li{display:flex;gap:12px;flex-wrap:wrap;padding:6px 0;border-top:1px dashed var(--line);font-size:14.5px}
.ps-hist li:first-child{border-top:none}
.ps-hd{color:var(--muted);font-size:13px;min-width:120px}
.ps-hist .ps-stars{font-size:13px}
.pr-when{white-space:nowrap}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
