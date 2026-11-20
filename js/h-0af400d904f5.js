
/* My English level: a quick level check (20 questions, A1 to C1) or choose it yourself */
(function lvlInit(){
  const box=document.getElementById("lvlBox"); if(!box){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",lvlInit); return; }
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const BANDS=["A1","A2","B1","B2","C1"];
  const Q=[
    ["A1","She ___ a teacher.",["am","is","are"],1],["A1","I ___ coffee every morning.",["drink","drinks","drinking"],0],["A1","There ___ two cats in the garden.",["is","are","be"],1],["A1","___ you like pizza?",["Do","Does","Are"],0],
    ["A2","Yesterday we ___ to the beach.",["go","went","gone"],1],["A2","My sister is ___ than me.",["more tall","taller","tallest"],1],["A2","I'm ___ to visit my parents this weekend.",["going","go","will"],0],["A2","How ___ money do you have?",["many","much","lot"],1],
    ["B1","I ___ here since 2020.",["live","have lived","am living"],1],["B1","If it rains tomorrow, we ___ at home.",["stay","will stay","would stay"],1],["B1","The movie was so ___ that I fell asleep.",["bored","boring","bore"],1],["B1","I'm not used to ___ up so early.",["get","getting","got"],1],
    ["B2","If I ___ more time, I would learn Japanese.",["have","had","would have"],1],["B2","The report ___ by the end of the day.",["will finish","will be finished","is finishing"],1],["B2","She suggested ___ a taxi.",["to take","taking","take"],1],["B2","I wish I ___ said that. It was a mistake.",["didn't","hadn't","wouldn't"],1],
    ["C1","No sooner ___ arrived than it started to rain.",["I had","had I","did I"],1],["C1","By this time next year, I ___ my degree.",["have finished","will have finished","finish"],1],["C1","The project was a success ___ the tight budget.",["despite","although","even though"],0],["C1","He's the colleague ___ advice I always follow.",["who","whose","whom"],1]
  ];
  const get=k=>{ try{ return JSON.parse(localStorage.getItem(k)||"null"); }catch(e){ return null; } };
  const setMy=v=>{ const j=JSON.stringify(v); try{ localStorage.setItem("ncs-mylevel",j); }catch(e){} if(window.__csOnSet) try{ window.__csOnSet("ncs-mylevel"); }catch(e){} paintNow(); };
  const fd=t=>new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric"});
  let run=null;
  function paintNow(){ const el=document.getElementById("prLvlNow"); if(!el) return; const L=window.csLevel?window.csLevel():{lv:""}; el.textContent=L.lv?"· "+L.lv:""; }
  function home(){
    const L=window.csLevel?window.csLevel():{lv:""}, my=get("ncs-mylevel"), noa=get("cs-cefr"), v=window.__csHubView;
    const src={coach:"Noa set this as your coach",test:"from your level check"+(my&&my.at?" on "+fd(my.at):""),self:"you chose it",club:"Noa's estimate from the club classes"}[L.src]||"";
    box.innerHTML=`<div class="card lvl-now"><div class="lvl-big">${L.lv?esc(L.lv):"?"}</div><div><b>${L.lv?"Your level":"No level yet"}</b><div class="muted">${L.lv?esc(src):"Take the level check or choose your level below. Until then, Hibi assumes about B1."}</div>
      ${noa&&noa.lv&&L.src!=="club"&&!(v&&v.level)?`<div class="lvl-rec">💡 Noa's estimate from the Free Talk Friday classes: <b>${esc(noa.lv)}</b> <button type="button" class="swap" data-lvset="${esc(noa.lv)}" data-lvsrc="club">Use this</button></div>`:""}
      ${v&&v.level?`<div class="lvl-rec">🎓 As a private student, Noa's level for you is used for feedback. Your check still shows him how you're doing.</div>`:""}</div></div>
      <div class="lvl-opts"><div class="card"><h3>⏱ Level check</h3><p class="muted">20 quick questions, from easy to hard. About 5 minutes. Tap “I don't know” instead of guessing.</p><button class="pill-btn pill-green" type="button" data-lvstart>Start the level check</button>${my&&my.src==="test"&&my.score!=null?`<p class="muted small" style="margin:8px 0 0">Last time: ${my.score}/20 → ${esc(my.lv)}</p>`:""}</div>
      <div class="card"><h3>✋ Choose it yourself</h3><p class="muted">Not sure? A2 = simple everyday talk · B1 = you can explain and tell stories · B2 = you discuss most topics with some mistakes · C1 = you're fluent and precise.</p><div class="lvl-chips">${["A1","A2","A2-B1","B1","B1-B2","B2","C1","C2"].map(x=>`<button type="button" class="lvl-chip" data-lvset="${x}" data-lvsrc="self" aria-pressed="${my&&my.src==="self"&&my.lv===x}">${x}</button>`).join("")}</div>${my?`<button type="button" class="foot-link" data-lvclear>Clear my choice</button>`:""}</div></div>`;
  }
  function q(){
    const i=run.i, it=Q[i];
    box.innerHTML=`<div class="card lvl-q"><div class="quiz-top"><span class="tag">Question ${i+1} of ${Q.length}</span><button class="swap" type="button" data-lvquit>Stop</button></div><div class="lvl-bar"><i style="width:${i/Q.length*100}%"></i></div>
      <p class="lvl-qt">${esc(it[1]).replace("___","<span class=\"lvl-gap\">___</span>")}</p><div class="lvl-ans">${it[2].map((a,k)=>`<button type="button" class="ps-opt" data-lva="${k}">${esc(a)}</button>`).join("")}<button type="button" class="ps-opt lvl-idk" data-lva="-1">I don't know</button></div></div>`;
  }
  function finish(){
    const c=BANDS.map(b=>Q.filter((x,i)=>x[0]===b&&run.a[i]===x[3]).length), score=c.reduce((n,x)=>n+x,0);
    let k=-1; for(let i=0;i<BANDS.length;i++){ if(c[i]>=3) k=i; else break; }
    let lv=k<0?"A1":BANDS[k]; if(k>=0&&k<BANDS.length-1&&c[k+1]===2) lv=BANDS[k]+"-"+BANDS[k+1]; if(k<0&&c[0]===2) lv="A1";
    setMy({lv,src:"test",score,at:Date.now()}); run=null;
    try{ document.dispatchEvent(new CustomEvent("cs-leveltest",{detail:{lv,score}})); if(window.csUse) window.csUse("gram"); }catch(e){}
    box.innerHTML=`<div class="card lvl-now"><div class="lvl-big">${esc(lv)}</div><div><b>Your level check: ${score}/20</b><div class="muted">${BANDS.map((b,i)=>`${b} ${c[i]}/4`).join(" · ")}</div><p style="margin:8px 0 0">Saved! Hibi now gives you feedback for <b>${esc(lv)}</b>. This was a quick grammar check, so if it feels too high or too low, just choose your level yourself.</p>
      <div class="note-actions" style="margin-top:10px"><button class="pill-btn pill-green" type="button" data-pr="sent">Practice sentences at my level →</button><button class="swap" type="button" data-lvhome>Back</button></div></div></div>`;
  }
  box.addEventListener("click",e=>{
    const t=e.target;
    if(t.closest("[data-lvstart]")){ run={i:0,a:[]}; q(); return; }
    if(t.closest("[data-lvquit]")||t.closest("[data-lvhome]")){ run=null; home(); return; }
    const a=t.closest("[data-lva]"); if(a&&run){ run.a[run.i]=+a.dataset.lva; run.i++; if(run.i>=Q.length) finish(); else q(); return; }
    const s=t.closest("[data-lvset]"); if(s){ setMy({lv:s.dataset.lvset,src:s.dataset.lvsrc,at:Date.now()}); if(typeof window.toast==="function") window.toast("📊 Level saved: "+s.dataset.lvset); home(); return; }
    if(t.closest("[data-lvclear]")){ try{ localStorage.removeItem("ncs-mylevel"); }catch(er){} if(window.__csOnSet) try{ window.__csOnSet("ncs-mylevel"); }catch(er){} home(); paintNow(); return; }
  });
  const v=document.getElementById("v-quiz"), panel=document.querySelector('[data-pp="level"]');
  if(panel) new MutationObserver(()=>{ if(!panel.hidden&&!run) home(); }).observe(panel,{attributes:true,attributeFilter:["hidden"]});
  document.addEventListener("cs-hubview",paintNow); setTimeout(paintNow,1500); paintNow();
})();
