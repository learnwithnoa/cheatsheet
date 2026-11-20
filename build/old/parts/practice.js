/* ---------- Practice home page, grammar modules, My mistakes, weekly goal ---------- */
(function(){
  const view=document.getElementById("v-quiz"), hub=document.getElementById("prHub"); if(!view||!hub) return;
  const panels=[...view.querySelectorAll(".pr-panel")];
  const $=id=>document.getElementById(id);
  const beg=()=>typeof csBeginner==="function"&&csBeginner();
  const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const MODS={
    ps:{id:"ps",name:"Past simple",lname:"past simple",stages:PS_STAGES,test:PS_TEST,toy:"⏳ Magic hourglass",toyName:"Magic hourglass",ico:"⏪"},
    pp:{id:"pp",name:"Present perfect",lname:"present perfect",stages:PP_STAGES,test:PP_TEST,toy:"🌍 Little globe",toyName:"Little globe",ico:"🌍"}
  };
  let M="ps"; const MD=()=>MODS[M];
  const ITEM={}; Object.values(MODS).forEach(md=>md.stages.forEach(st=>st.items.forEach(q=>{ q.mod=md.id; ITEM[q.id]=q; }))); VOC_SETS.forEach(v=>v.qs.forEach(q=>ITEM[q.id]=q));
  const VSET={}; VOC_SETS.forEach(v=>VSET[v.id]=v);
  const vprog=()=>{ const v=LS.get("ncs-vocab",{}); return v&&typeof v==="object"?v:{}; };
  const GOAL=3, PASS=7, TOPASS=15;

  /* ---- saved progress ---- */
  const mods=()=>{ const m=LS.get("ncs-mods",{}); return m&&typeof m==="object"?m:{}; };
  const ps=(id)=>{ const m=mods(); const p=m[id||M]||{}; p.b=p.b||{}; p.s=p.s||{}; p.r=p.r|0; return p; };
  const rec=()=>{ const r=LS.get("ncs-modrec",{}); return r&&typeof r==="object"?r:{}; };
  const starsFor=sc=>sc>=10?3:sc>=9?2:sc>=PASS?1:0;
  const testedOut=(id)=>{ const p=ps(id); return !!(p.to&&p.to.sc>=TOPASS); };
  const today=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const unlocked=n=>{ const p=ps(); return n===1||testedOut()||(p.b[n-1]|0)>=PASS||rec()[M]===n; };
  const totalStars=(id)=>{ const p=ps(id); return MODS[id||M].stages.reduce((t,st)=>t+(p.s[st.n]|0),0); };
  const allDone=(id)=>{ const p=ps(id); return testedOut(id)||MODS[id||M].stages.every(st=>(p.b[st.n]|0)>=PASS); };
  const mis=()=>{ const m=LS.get("ncs-mymis",{}); return m&&typeof m==="object"?m:{}; };
  const misList=()=>{ const m=mis(); return Object.keys(m).filter(id=>ITEM[id]).sort((a,b)=>(m[b].n-m[a].n)||(m[b].t-m[a].t)); };
  function noteAnswer(id,ok){
    const m=mis();
    if(ok){ if(m[id]){ m[id].ok=(m[id].ok|0)+1; if(m[id].ok>=2) delete m[id]; } else return; }
    else { m[id]=m[id]||{n:0,ok:0,t:0}; m[id].n++; m[id].ok=0; m[id].t=Date.now(); }
    LS.set("ncs-mymis",m);
  }
  const weekKey=()=>{ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const week=()=>{ const w=LS.get("ncs-wk",null); return w&&w.w===weekKey()?w:{w:weekKey(),n:0,got:false}; };
  function bumpWeek(){
    const w=week(); w.n++; let hit=false;
    if(w.n>=GOAL&&!w.got){ w.got=true; hit=true; }
    LS.set("ncs-wk",w);
    if(hit){ document.dispatchEvent(new CustomEvent("cs-weekgoal")); setTimeout(()=>toast("🎯 Weekly goal done! Your buddy got +5 🍪 and +5 friendship."),1200); }
    renderHub();
  }
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bumpWeek(); });

  /* ---- home page ---- */
  function renderHub(){
    const w=week(), g=$("prGoal");
    if(g) g.innerHTML='<div class="pr-goal-top"><b>🎯 This week\'s goal</b><span>'+Math.min(w.n,GOAL)+' / '+GOAL+' rounds</span></div>'+
      '<div class="pr-dots" aria-hidden="true">'+Array.from({length:GOAL},(_,i)=>'<i class="'+(i<w.n?"on":"")+'"></i>').join("")+'</div>'+
      '<p>'+(w.got?"Done for this week! 🎉 Your buddy got its reward. Keep going if you want, a new goal starts on Monday.":"Finish "+GOAL+" practice rounds this week (grammar or flashcards). Your buddy gets <b>+5 🍪</b> and <b>+5 friendship</b>.")+'</p>'+
      '<p class="esb">Meta semanal: termina '+GOAL+' rondas de práctica esta semana.</p>';
    view.querySelectorAll("[data-modtile]").forEach(ts=>{ const id=ts.dataset.modtile, md=MODS[id], t=totalStars(id), r=rec()[id], tot=md.stages.length*3; ts.querySelector(".pr-sub").innerHTML=(testedOut(id)?"🎓 ":"")+t+" / "+tot+" ★"+(r?' · <span class="pr-rec">'+(r==="all"?"⭐ Noa recommends this module":"Noa recommends stage "+r)+'</span>':""); ts.querySelector(".pr-bar i").style.width=Math.round(t/tot*100)+"%"; });
    const sc=$("prShortCount"); if(sc){ sc.textContent=Math.min(w.n,GOAL)+"/"+GOAL; sc.parentElement.classList.toggle("done",!!w.got); }
    const tm=$("prMisTile"); if(tm){ const n=misList().length; tm.querySelector(".pr-sub").textContent=n?n+(n===1?" question to review":" questions to review"):"Nothing to review yet"; }
  }
  let cur=null;
  function setMod(id){ if(!MODS[id]) return; M=id; const h=$("psTitle"); if(h) h.innerHTML="<em>"+esc(MODS[id].name)+"</em>"; try{ sessionStorage.setItem("cs-mod",id); }catch(e){} }
  try{ const sm=sessionStorage.getItem("cs-mod"); if(MODS[sm]) M=sm; }catch(e){}
  const PARENT={ps:"gram",mis:"gram",irr:"gram",flash:"words",sent:"words",say:"words",vset:"vocab"};
  const PNAME={gram:"Grammar",words:"Your words",vocab:"Vocabulary"};
  function show(p,fromPop){
    cur=p||null;
    if(!fromPop&&!view.hidden){ try{ const st=history.state||{}; if(st.cs&&st.v==="quiz"&&(st.pp||null)!==cur) history.pushState({cs:1,v:"quiz",pp:cur,n:(st.n|0)+1},"","#quiz"); }catch(e){} }
    view.querySelectorAll(".pr-back-t").forEach(t=>t.textContent=PNAME[PARENT[cur]]||"All practice");
    hub.hidden=!!cur; panels.forEach(x=>x.hidden=x.dataset.pp!==cur);
    if(cur==="ps"&&!round) renderStages();
    if(cur==="mis"&&!round) renderMis();
    if(cur==="vocab") renderVocab();
    if(cur==="vset"&&!round) renderSet();
    if(!cur) renderHub();
    window.scrollTo({top:0});
  }
  view.addEventListener("click",e=>{
    const t=e.target.closest("[data-pr]"); if(t){ round=null; if(t.dataset.modtile) setMod(t.dataset.modtile); show(t.dataset.pr); return; }
    if(e.target.closest("[data-prback]")){ round=null; show(PARENT[cur]||null); }
  });
  document.addEventListener("click",e=>{ const b=e.target.closest('[data-go="quiz"]'); if(b&&!b.closest("#v-quiz")){ round=null; setTimeout(()=>show(null),0); } });

  /* ---- past simple: stage list ---- */
  const stars=n=>'<span class="ps-stars" aria-label="'+n+' of 3 stars">'+"★★★".slice(0,n)+'<s>'+"★★★".slice(0,3-n)+'</s></span>';
  function renderStages(){
    const box=$("psArea"); if(!box) return; const p=ps(), r=rec()[M], md=MD(); setMod(M);
    const to=p.to, triedToday=p.tod===today();
    const toCard=testedOut()?'<div class="card ps-to done"><b>🎓 You tested out of the '+esc(md.lname)+'</b><span>'+to.sc+'/15 on '+new Date(to.t).toLocaleDateString("en-US",{month:"long",day:"numeric"})+'. You can still practice any stage.</span></div>'
      :allDone()?"":'<div class="card ps-to"><div><b>🎓 Already good at the '+esc(md.lname)+'?</b><span>Take the <b>test out</b> exam: 15 tricky questions, no multiple choice. Get <b>all 15 right</b> and you pass the whole module, with all the rewards. One try a day.</span><span class="esb">Examen para eximirte: 15 preguntas difíciles. Con las 15 correctas apruebas todo el módulo.</span></div>'+
        (triedToday?'<button class="pill-btn" type="button" disabled>Try again tomorrow</button>':'<button class="pill-btn pill-green" type="button" data-tostart>Take the test</button>')+'</div>';
    box.innerHTML=toCard+'<div class="ps-list">'+md.stages.map(st=>{
      const open=unlocked(st.n), best=p.b[st.n];
      return '<div class="card ps-stage'+(open?"":" locked")+(r===st.n?" rec":"")+'"><div class="ps-num">'+(open?st.n:"🔒")+'</div><div class="ps-info"><b>Stage '+st.n+' · '+esc(st.t)+'</b><span>'+esc(st.sub)+'</span>'+
        (r===st.n?'<span class="pr-rec">⭐ Noa recommends this one</span>':"")+'</div><div class="ps-side">'+stars(p.s[st.n]|0)+'<small>'+(best!=null?"best "+best+"/10":testedOut()?"🎓 tested out":open?"not tried yet":"get "+PASS+"/10 in stage "+(st.n-1))+'</small>'+
        (open?'<button class="pill-btn'+(best==null?" pill-green":"")+'" type="button" data-psstart="'+st.n+'">'+(best==null?"Start":"Practice")+'</button>':"")+'</div></div>';
    }).join("")+'</div>'+
    '<p class="ps-goal">'+(allDone()?md.toy.split(" ")[0]+" You finished every stage! Your buddy has the <b>"+md.toyName+"</b>.":"Finish all "+md.stages.length+" stages ("+PASS+"/10 or more) to unlock the "+md.toy.split(" ")[0]+" <b>"+md.toyName+"</b> for your buddy.")+'</p>';
  }

  /* ---- a round ---- */
  let round=null;
  const nrm=s=>String(s||"").toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.?!,]+$/g,"").replace(/\bdidn't\b/g,"did not").replace(/\bwasn't\b/g,"was not").replace(/\bweren't\b/g,"were not").replace(/\bhaven't\b/g,"have not").replace(/\bhasn't\b/g,"has not").replace(/\s+/g," ").trim();
  function start(kind,stage){
    let pool, title;
    let story=null;
    if(kind==="ps"){ const st=MD().stages[stage-1];
      if(st.story){ let last=""; try{ last=sessionStorage.getItem("cs-"+M+"-story")||""; }catch(e){} const opts=st.stories.filter(x=>x.title!==last); story=opts[Math.floor(Math.random()*opts.length)]||st.stories[0]; try{ sessionStorage.setItem("cs-"+M+"-story",story.title); }catch(e){} pool=story.items.slice(); }
      else pool=shuffle(st.items).slice(0,10);
      title="Stage "+st.n+" · "+st.t; }
    else if(kind==="test"){ if(ps().tod===today()) { renderStages(); return; } pool=shuffle(MD().test).slice(0,15); title="🎓 Test out"; round={kind,stage:0,title,list:pool.map(q=>({q,mc:false})),i:0,score:0,missed:[],retry:false,answered:false,test:true}; const p=ps(), m=mods(); p.tod=today(); m[M]=p; LS.set("ncs-mods",m); show("ps"); paintQ(); return; }
    else if(kind==="voc"){ const v=VSET[stage]; vsCur=v.id; const mq=shuffle(v.qs.filter(q=>q.mco)).slice(0,5), cq=shuffle(v.qs.filter(q=>!q.mco)).slice(0,5); pool=mq.concat(cq); title=v.ico+" "+v.t; }
    else { const ids=misList().slice(0,10); if(!ids.length){ renderMis(); return; } pool=shuffle(ids.map(id=>ITEM[id])); title="My mistakes"; }
    const half=Math.ceil(pool.length/2);
    round={kind,stage,title,list:pool.map((q,i)=>({q,mc:!!q.mco||i<half})),i:0,score:0,missed:[],retry:false,answered:false,story};
    show(kind==="ps"?"ps":kind==="voc"?"vset":"mis"); paintQ();
  }
  const area=()=>$(round&&round.kind==="voc"?"vsetArea":round&&round.kind!=="mis"?"psArea":"misArea");
  function sentence(q,inner){ return esc(q.q).replace("___",inner); }
  function paintQ(){
    const R=round, it=R.list[R.i], q=it.q, n=R.list.length, box=area(); if(!box) return;
    R.answered=false;
    const blank=it.mc?'<span class="ps-blank">___</span>':'<input class="ps-in" id="psIn" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer">';
    box.innerHTML='<div class="card ps-q"><div class="quiz-top"><span class="tag">'+esc(R.title)+'</span><span class="count">'+(R.retry?"Try again · "+(R.i+1)+" / "+n:(R.i+1)+" / "+n)+'</span></div>'+
      '<div class="ps-bar" aria-hidden="true"><i style="width:'+Math.round(R.i/n*100)+'%"></i></div>'+
      '<p class="ps-kind">'+(it.mc?"Choose the right answer":"Write the missing words")+(R.test?" · you'll see your results at the end":"")+'</p>'+
      (R.story&&!R.retry?'<div class="ps-story"><b>📖 '+esc(R.story.title)+'</b>'+(R.i?'<p>'+R.list.slice(0,R.i).map(x=>esc(x.q.q.replace(/\s*\([^)]*\)\s*$/,"")).replace("___","<span>"+esc(x.q.a[0])+"</span>")).join(" ")+'</p>':'<p class="muted">The story starts here…</p>')+'</div>':"")+
      '<p class="ps-sent">'+sentence(q,blank)+'</p>'+
      (it.mc?'<div class="ps-opts">'+shuffle([q.a[0]].concat(q.o.slice(0,3))).map(o=>'<button type="button" class="ps-opt" data-psopt="'+esc(o)+'">'+esc(o)+'</button>').join("")+'</div>'
            :'<div class="note-actions"><button class="pill-btn" type="button" id="psCheck">'+(R.test?"Next →":"Check")+'</button><button class="swap" type="button" id="psDunno">'+(R.test?"Skip":"I don\'t know")+'</button></div>')+
      '<div class="ps-fb" id="psFb" aria-live="polite"></div></div>'+
      '<p class="ps-quit"><button class="foot-link" type="button" data-psquit>Stop this round</button></p>';
    const inp=$("psIn"); if(inp){ inp.focus({preventScroll:true}); inp.addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); if(R.answered) next(); else check(inp.value); } }); }
  }
  function check(val,btn){
    const R=round; if(!R||R.answered) return; const it=R.list[R.i], q=it.q;
    if(!it.mc&&!String(val||"").trim()&&val!==null) { const i=$("psIn"); if(i) i.focus(); return; }
    R.answered=true;
    const ok=val!==null&&q.a.some(a=>nrm(a)===nrm(val));
    if(R.test){ if(ok) R.score++; else R.missed.push({q,val}); R.i++; if(R.i<R.list.length) paintQ(); else finishTest(); return; }
    if(!R.retry){ if(ok) R.score++; else R.missed.push(it); noteAnswer(q.id,ok); }
    else if(ok) noteAnswer(q.id,true);
    const box=area();
    if(it.mc){ box.querySelectorAll(".ps-opt").forEach(b=>{ b.disabled=true; if(nrm(b.dataset.psopt)===nrm(q.a[0])) b.classList.add("right"); }); if(btn&&!ok) btn.classList.add("wrong"); }
    else { const i=$("psIn"); if(i){ i.readOnly=true; i.classList.add(ok?"right":"wrong"); } const c=$("psCheck"), d=$("psDunno"); if(c) c.remove(); if(d) d.remove(); }
    const fb=$("psFb");
    fb.className="ps-fb "+(ok?"ok":"no");
    fb.innerHTML=(ok?'<b>✓ '+["Correct!","Nice!","That's it!","Exactly!"][Math.floor(Math.random()*4)]+'</b>':'<b>✗ The answer is: '+esc(q.a[0])+'</b>')+
      '<p>'+esc(q.why)+'</p>'+(q.es&&(beg()||!ok)?'<p class="es">'+esc(q.es)+'</p>':"")+
      '<button class="pill-btn pill-green" type="button" id="psNext">'+(R.i+1<R.list.length?"Next →":R.retry||!R.missed.length?"See my results":"Next →")+'</button>';
    const nb=$("psNext"); if(nb) nb.focus({preventScroll:true});
  }
  function next(){
    const R=round; if(!R) return;
    R.i++;
    if(R.i<R.list.length){ paintQ(); return; }
    if(!R.retry&&R.missed.length){ R.retry=true; R.list=R.missed.map(x=>({q:x.q,mc:x.mc})); R.i=0; const box=area(); box.innerHTML='<div class="card ps-q ps-mid"><p class="ps-sent">Let\'s try the '+(R.list.length===1?"one you missed":R.list.length+" you missed")+' one more time 💪</p><p class="muted">This part doesn\'t change your score.</p><button class="pill-btn pill-green" type="button" id="psGo">Let\'s go</button></div>'; $("psGo").focus({preventScroll:true}); return; }
    finish();
  }
  function finish(){
    const R=round, n=R.list.length; let html="";
    const perfect=!R.missed.length;
    if(R.kind==="voc"){
      const vp=vprog(), id=R.stage, o=vp[id]||{}; if(o.b==null||R.score>o.b) o.b=R.score; o.s=Math.max(o.s|0,starsFor(R.score)); o.r=(o.r|0)+1; o.last=Date.now(); vp[id]=o; LS.set("ncs-vocab",vp);
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / 10</div>'+stars(starsFor(R.score))+'<p class="ps-sent">'+(R.score===10?"Perfect! 🎉":R.score>=PASS?"Well done! 👍":"Good practice! Look at the words again and try once more 💪")+'</p>'+
        (R.missed.length?'<p class="muted">The ones you missed are saved in <b>My mistakes</b>.</p>':"")+
        '<div class="note-actions" style="justify-content:center"><button class="pill-btn pill-green" type="button" data-vqstart="'+id+'">Try again</button><button class="swap" type="button" data-vlearn="'+id+'">See the words</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect,finished:false}}));
    } else if(R.kind==="ps"){
      const m=mods(), p=ps(), md=MD(), st=R.stage, oldBest=p.b[st], wasDone=allDone(), wasOpen=md.stages[st]?unlocked(st+1):true;
      if(oldBest==null||R.score>oldBest) p.b[st]=R.score;
      p.s[st]=Math.max(p.s[st]|0,starsFor(R.score)); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
      const nowOpen=md.stages[st]?unlocked(st+1):false, finishedAll=!wasDone&&allDone();
      const sg=starsFor(R.score);
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / 10</div>'+stars(sg)+
        '<p class="ps-sent">'+(R.score===10?"Perfect round! 🎉":R.score>=9?"Excellent! 🌟":R.score>=PASS?"Well done! You passed this stage. 👍":"Good practice! Get "+PASS+"/10 to pass this stage. You can do it 💪")+'</p>'+
        (nowOpen&&!wasOpen?'<p class="ps-unlock">🔓 Stage '+(st+1)+' is open!</p>':"")+
        (finishedAll?'<p class="ps-unlock">'+md.toy.split(" ")[0]+' You finished the whole '+esc(md.lname)+' module! Your buddy got the <b>'+md.toyName+'</b>.</p>':"")+
        (R.missed.length?'<p class="muted">The questions you missed are saved in <b>My mistakes</b>, so you can review them later.</p>':"")+
        '<div class="note-actions" style="justify-content:center">'+(nowOpen&&md.stages[st]?'<button class="pill-btn pill-green" type="button" data-psstart="'+(st+1)+'">Next stage →</button>':"")+
        '<button class="pill-btn'+(nowOpen?"":" pill-green")+'" type="button" data-psstart="'+st+'">Try again</button><button class="swap" type="button" data-psall>All stages</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect,finished:finishedAll,mod:M,toy:md.toy}}));
    } else {
      const left=misList().length;
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / '+n+'</div><p class="ps-sent">'+(perfect?"All correct! 🎉":"Good review! 👍")+'</p><p class="muted">'+(left?left+(left===1?" question is":" questions are")+" still on your list. A question leaves the list when you get it right twice in a row.":"Your list is empty. Nothing left to review! 🎉")+'</p>'+
        '<div class="note-actions" style="justify-content:center">'+(left?'<button class="pill-btn pill-green" type="button" data-misstart>Review again</button>':"")+'<button class="swap" type="button" data-prback>All practice</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect:perfect&&n>=5,finished:false}}));
    }
    const box=area(); round=null; box.innerHTML=html; bumpWeek();
  }
  view.addEventListener("click",e=>{
    const o=e.target.closest("[data-psopt]"); if(o&&round){ check(o.dataset.psopt,o); return; }
    if(e.target.closest("#psCheck")){ const i=$("psIn"); check(i?i.value:""); return; }
    if(e.target.closest("#psDunno")){ check(null); return; }
    if(e.target.closest("#psNext")||e.target.closest("#psGo")){ if(e.target.closest("#psGo")) paintQ(); else next(); return; }
    const s=e.target.closest("[data-psstart]"); if(s){ start("ps",+s.dataset.psstart); return; }
    if(e.target.closest("[data-misstart]")){ start("mis"); return; }
    if(e.target.closest("[data-tostart]")){ start("test"); return; }
    if(e.target.closest("[data-psall]")){ round=null; renderStages(); window.scrollTo({top:0}); return; }
    if(e.target.closest("[data-psquit]")){ const k=round&&round.kind; round=null; if(k==="mis") renderMis(); else if(k==="voc") renderSet(); else renderStages(); return; }
    const vs=e.target.closest("[data-vset]"); if(vs){ round=null; vsCur=vs.dataset.vset; vsMode="list"; show("vset"); return; }
    const vq=e.target.closest("[data-vqstart]"); if(vq){ start("voc",vq.dataset.vqstart); return; }
    const vl=e.target.closest("[data-vlearn]"); if(vl){ round=null; vsCur=vl.dataset.vlearn; vsMode="cards"; vsI=0; vsFlip=false; renderSet(); return; }
    if(e.target.closest("[data-vflip]")){ vsFlip=!vsFlip; renderSet(); return; }
    const vn=e.target.closest("[data-vnav]"); if(vn){ const n=VSET[vsCur].items.length; vsI=(vsI+(+vn.dataset.vnav)+n)%n; vsFlip=false; renderSet(); return; }
    if(e.target.closest("[data-vlist]")){ vsMode="list"; renderSet(); return; }
    const sv=e.target.closest("[data-vsave]"); if(sv){ const it=VSET[vsCur].items[+sv.dataset.vsave]; if(typeof addWord==="function"&&addWord(it.w,it.def,it.ex.replace(/[\[\]]/g,""))){ sv.textContent="✓ Saved"; sv.disabled=true; } return; }
    const sp=e.target.closest("[data-vsay]"); if(sp){ if(window.csSpeak) window.csSpeak(sp.dataset.vsay); return; }
  });

  function finishTest(){
    const R=round, sc=R.score, pass=sc>=TOPASS, m=mods(), p=ps(), md=MD(), wasDone=allDone();
    if(pass){ if(!p.to||sc>p.to.sc) p.to={sc,t:Date.now()}; md.stages.forEach(st=>{ p.s[st.n]=Math.max(p.s[st.n]|0,3); }); }
    p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
    const finished=pass&&!wasDone;
    const box=area(); round=null;
    box.innerHTML='<div class="card ps-res"><div class="ps-big">'+sc+' / 15</div>'+(pass?stars(3):"")+
      '<p class="ps-sent">'+(pass?"Perfect! 🎓 You tested out of the "+md.lname+".":sc>=13?"So close! You need 15/15 to test out. 💪":"Good try! You need 15/15 to test out. 💪")+'</p>'+
      (finished?'<p class="ps-unlock">'+md.toy.split(" ")[0]+' Every stage is done, and your buddy got the <b>'+md.toyName+'</b>!</p>':"")+
      (pass?"":'<p class="muted">You can try the test again tomorrow, or practice the stages to get there step by step.</p>')+
      (R.missed.length?'<div class="ps-miss"><b>'+(R.missed.length===1?"The one you missed":"The ones you missed")+'</b><ul>'+R.missed.map(x=>'<li>'+esc(x.q.q).replace("___","<b>"+esc(x.q.a[0])+"</b>")+(x.val?' <small>(you wrote: '+esc(x.val)+')</small>':"")+'<br><span class="muted">'+esc(x.q.why)+'</span></li>').join("")+'</ul></div>':"")+
      '<div class="note-actions" style="justify-content:center"><button class="pill-btn pill-green" type="button" data-psall>See the stages</button></div></div>';
    document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:sc,perfect:sc===15,finished,mod:M,toy:md.toy}}));
    bumpWeek();
  }
  /* ---- Vocabulary ---- */
  let vsCur=null, vsMode="list", vsI=0, vsFlip=false;
  const haveW=()=>{ try{ return new Set((LS.get("ncs-words",[])||[]).map(x=>String(x.w||"").toLowerCase().trim())); }catch(e){ return new Set(); } };
  function renderVocab(){
    const box=$("vocArea"); if(!box) return; const vp=vprog();
    box.innerHTML='<div class="pr-tiles">'+VOC_SETS.map(v=>{ const o=vp[v.id]||{}; return '<button class="pr-tile" type="button" data-vset="'+v.id+'"><span class="pr-ico" aria-hidden="true">'+v.ico+'</span><b>'+esc(v.t)+'</b><span class="pr-sub">'+esc(v.sub)+'</span><span class="pr-sub">'+v.items.length+' words · '+stars(o.s|0)+'</span></button>'; }).join("")+'</div>';
  }
  function renderSet(){
    const box=$("vsetArea"), v=VSET[vsCur]; if(!box||!v) return; const o=vprog()[v.id]||{}, have=haveW();
    const ttl=$("vsetTitle"); if(ttl) ttl.innerHTML=v.ico+" <em>"+esc(v.t)+"</em>";
    const saveBtn=i=>{ const it=v.items[i], on=have.has(it.w.toLowerCase()); return '<button class="swap" type="button" data-vsave="'+i+'"'+(on?" disabled":"")+'>'+(on?"✓ In My words":"+ Save to My words")+'</button>'; };
    const top='<div class="card vs-top"><div><b>'+v.items.length+' words</b> · '+stars(o.s|0)+(o.b!=null?' <span class="muted">best '+o.b+'/10</span>':"")+'</div><div class="note-actions"><button class="pill-btn pill-green" type="button" data-vqstart="'+v.id+'">✏️ Quiz · 10 questions</button>'+(vsMode==="cards"?'<button class="swap" type="button" data-vlist>☰ See the list</button>':'<button class="swap" type="button" data-vlearn="'+v.id+'">🃏 Flashcards</button>')+'</div></div>';
    if(vsMode==="cards"){
      const it=v.items[vsI];
      box.innerHTML=top+'<div class="card vs-card"><div class="quiz-top"><span class="tag">Flashcards</span><span class="count">'+(vsI+1)+' / '+v.items.length+'</span></div>'+
        '<button class="vs-face" type="button" data-vflip aria-label="Flip the card"><span class="vs-w">'+esc(it.w)+'</span>'+(vsFlip?'<span class="vs-def">'+esc(it.def)+'</span><span class="vs-ex">'+esc(it.ex).replace(/\[([^\]]+)\]/,"<b>$1</b>")+'</span>':'<span class="muted">Tap to see the meaning</span>')+'</button>'+
        '<div class="note-actions" style="justify-content:space-between"><button class="swap" type="button" data-vnav="-1">← Back</button><span class="note-actions"><button class="swap" type="button" data-vsay="'+esc(it.w+". "+it.ex.replace(/[\[\]]/g,""))+'" aria-label="Listen">🔊</button>'+saveBtn(vsI)+'</span><button class="pill-btn" type="button" data-vnav="1">Next →</button></div></div>';
      return;
    }
    box.innerHTML=top+'<div class="vs-list">'+v.items.map((it,i)=>'<div class="card vs-item"><div class="vs-item-top"><b>'+esc(it.w)+'</b><span class="note-actions"><button class="swap" type="button" data-vsay="'+esc(it.w+". "+it.ex.replace(/[\[\]]/g,""))+'" aria-label="Listen to '+esc(it.w)+'">🔊</button>'+saveBtn(i)+'</span></div><p>'+esc(it.def)+'</p><p class="vs-ex">'+esc(it.ex).replace(/\[([^\]]+)\]/,"<b>$1</b>")+'</p></div>').join("")+'</div>';
  }
  /* ---- My mistakes ---- */
  function renderMis(){
    const box=$("misArea"); if(!box) return; const ids=misList(), m=mis();
    if(!ids.length){ box.innerHTML='<div class="card"><p style="margin:0 0 10px"><b>Nothing to review yet 🎉</b></p><p class="muted" style="margin:0 0 12px">When you miss a question in a grammar stage, it shows up here so you can practice it again later.</p><button class="pill-btn" type="button" data-pr="gram">Go to Grammar</button></div>'; return; }
    box.innerHTML='<div class="card"><p style="margin:0 0 12px">You have <b>'+ids.length+'</b> '+(ids.length===1?"question":"questions")+' to review. Get one right twice in a row and it leaves the list.</p>'+
      '<ul class="mis-list">'+ids.slice(0,8).map(id=>'<li>'+esc(ITEM[id].q).replace("___","<b>"+esc(ITEM[id].a[0])+"</b>")+(m[id].n>1?' <small>missed '+m[id].n+'×</small>':"")+'</li>').join("")+(ids.length>8?'<li class="muted">…and '+(ids.length-8)+' more</li>':"")+'</ul>'+
      '<button class="pill-btn pill-green" type="button" data-misstart>Review '+Math.min(10,ids.length)+(ids.length===1?" question":" questions")+'</button></div>';
  }

  /* ---- open from elsewhere (notebook "Practice this") ---- */
  window.__prShow=(p,fromPop)=>{ round=null; show(p,fromPop); };
  window.csVocSet=function(id){ if(!VSET[id]) return; go("quiz",true); round=null; vsCur=id; vsMode="list"; show("vset"); window.scrollTo({top:0}); };
  window.csPractice=function(p,stage,mod){ go("quiz",true); round=null; if(mod) setMod(mod); if(p==="ps"&&stage){ start("ps",stage); } else show(p); };
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-psgo]"); if(!b) return; e.preventDefault(); window.csPractice("ps",+b.dataset.psgo||0,b.dataset.psmod||"ps"); });
  renderHub();
})();
