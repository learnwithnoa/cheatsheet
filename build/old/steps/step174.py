# step174 (Nov 17 2026): weekly goal 2.0
# - students choose their goal size: Easy (3 rounds), Steady (5), Strong (8), with bigger rewards for bigger goals
# - streak: the goal done 4 weeks in a row unlocks a 🔥 campfire for the study buddy
# - more things count: reading a "Learn it first" lesson (once per module a week) and practising out loud (every 5 phrases)
# - Translator starred by default for everyone (once; they can un-star it)
R('''  const GOAL=3, PASS=7, TOPASS=15;''', '''  let GOAL=(()=>{ const g=+LS.get("ncs-wkgoal",3); return [3,5,8].includes(g)?g:3; })(); const PASS=7, TOPASS=15;
  const GOALS={3:{k:"Easy",r:5},5:{k:"Steady",r:8},8:{k:"Strong",r:12}};''')
R('''  function bumpWeek(){
    const w=week(); w.n++; let hit=false;
    if(w.n>=GOAL&&!w.got){ w.got=true; hit=true; }
    LS.set("ncs-wk",w);
    if(hit){ document.dispatchEvent(new CustomEvent("cs-weekgoal")); setTimeout(()=>toast("🎯 Weekly goal done! Your buddy got +5 🍪 and +5 friendship."),1200); }
    renderHub();
  }''', '''  const prevWeekKey=()=>{ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)-7); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const streak=()=>{ const s=LS.get("ncs-wkstreak",null)||{last:"",n:0,best:0}; if(s.last!==weekKey()&&s.last!==prevWeekKey()) s.n=0; return s; };
  function award(w){
    w.got=true; LS.set("ncs-wk",w);
    const s=LS.get("ncs-wkstreak",null)||{last:"",n:0,best:0}; if(s.last!==weekKey()){ s.n=s.last===prevWeekKey()?(s.n|0)+1:1; s.last=weekKey(); } const was=s.best|0; s.best=Math.max(was,s.n); LS.set("ncs-wkstreak",s);
    const r=(GOALS[GOAL]||GOALS[3]).r;
    document.dispatchEvent(new CustomEvent("cs-weekgoal",{detail:{t:r,f:r,streak:s.n,campfire:was<4&&s.best>=4}}));
    setTimeout(()=>toast(was<4&&s.best>=4?"🔥 4 weeks in a row! Your buddy got a campfire.":"🎯 Weekly goal done! Your buddy got +"+r+" 🍪 and +"+r+" friendship."+(s.n>1?" 🔥 "+s.n+" weeks in a row.":"")),1200);
  }
  function bumpWeek(){
    const w=week(); w.n++; LS.set("ncs-wk",w);
    if(w.n>=GOAL&&!w.got) award(w);
    renderHub();
  }
  window.__prBumpWeek=bumpWeek;
  /* more things count: practising out loud (every 5 phrases you say right) and reading a "Learn it first" lesson (once per module a week) */
  document.addEventListener("cs-said",()=>{ const w=week(); w.say=(w.say|0)+1; LS.set("ncs-wk",w); if(w.say%5===0) bumpWeek(); });
  let lesT=null;
  document.addEventListener("toggle",e=>{ const d=e.target; if(!d||!d.matches||!d.matches(".ps-lesson")) return; clearTimeout(lesT); if(!d.open) return;
    lesT=setTimeout(()=>{ if(!d.open||!d.isConnected||document.hidden) return; const w=week(), id=d.dataset.plid; w.les=w.les||[]; if(w.les.includes(id)) return; w.les.push(id); LS.set("ncs-wk",w); bumpWeek(); toast("📖 Lesson read: it counts for your weekly goal"); },40000); },true);''')
R('''    if(g) g.innerHTML='<div class="pr-goal-top"><b>🎯 This week\\'s goal</b><span>'+Math.min(w.n,GOAL)+' / '+GOAL+' rounds</span></div>'+
      '<div class="pr-dots" aria-hidden="true">'+Array.from({length:GOAL},(_,i)=>'<i class="'+(i<w.n?"on":"")+'"></i>').join("")+'</div>'+
      '<p>'+(w.got?"Done for this week! 🎉 Your buddy got its reward. Keep going if you want, a new goal starts on Monday.":"Finish "+GOAL+" practice rounds this week (grammar or flashcards). Your buddy gets <b>+5 🍪</b> and <b>+5 friendship</b>.")+'</p>'+
      '<p class="esb">Meta semanal: termina '+GOAL+' rondas de práctica esta semana.</p>';''',
'''    const sk=streak(), rw=(GOALS[GOAL]||GOALS[3]).r;
    if(g) g.innerHTML='<div class="pr-goal-top"><b>🎯 This week\\'s goal</b><span>'+Math.min(w.n,GOAL)+' / '+GOAL+' rounds</span></div>'+
      '<div class="pr-dots" aria-hidden="true">'+Array.from({length:GOAL},(_,i)=>'<i class="'+(i<w.n?"on":"")+'"></i>').join("")+'</div>'+
      '<p>'+(w.got?"Done for this week! 🎉 Your buddy got its reward. Keep going if you want, a new goal starts on Monday.":"Finish "+GOAL+" rounds this week: grammar, flashcards, word packs, pronunciation, reading a lesson or saying phrases out loud. Your buddy gets <b>+"+rw+" 🍪</b> and <b>+"+rw+" friendship</b>.")+'</p>'+
      '<div class="pr-gsize" role="group" aria-label="Goal size"><span class="muted">Goal:</span>'+[3,5,8].map(n=>'<button type="button" class="pr-gs" data-wkgoal="'+n+'" aria-pressed="'+(GOAL===n)+'">'+GOALS[n].k+' · '+n+'</button>').join("")+'</div>'+
      '<p class="pr-streak">'+(sk.n>=1?"🔥 <b>"+sk.n+(sk.n===1?" week":" weeks")+"</b> in a row. ":"")+((sk.best|0)>=4?"Your buddy has the 🔥 campfire.":"Do your goal 4 weeks in a row to unlock a 🔥 <b>campfire</b> for your buddy.")+'</p>'+
      '<p class="esb">Meta semanal: termina '+GOAL+' rondas esta semana. Elige el tamaño de tu meta: más rondas, más premio.</p>';''')
_js = r'''<script>
/* step174: change the weekly goal size */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-wkgoal]"); if(!b) return; if(window.__prGoalSet) window.__prGoalSet(+b.dataset.wkgoal); });
/* step174: Translator starred by default (once per account; they can un-star it) */
(function(){ function go(){ try{ if(localStorage.getItem("ncs-star-tr")) return; if(!document.getElementById("v-translate")) return;
    const put=(k,v)=>{ localStorage.setItem(k,JSON.stringify(v)); try{ window.__csOnSet&&window.__csOnSet(k); }catch(er){} };
    put("ncs-star-tr",1); let st=[]; try{ st=JSON.parse(localStorage.getItem("ncs-stars")||"[]")||[]; }catch(er){}
    if(!st.includes("translate")){ st.push("translate"); put("ncs-stars",st); if(window.__csListsReload) window.__csListsReload(); } }catch(e){} }
  document.addEventListener("cs-auth",()=>setTimeout(go,4000)); setTimeout(go,6000); })();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
R('''  window.__prBumpWeek=bumpWeek;''', '''  window.__prBumpWeek=bumpWeek;
  window.__prGoalSet=n=>{ if(![3,5,8].includes(n)) return; GOAL=n; LS.set("ncs-wkgoal",n); const w=week(); if(w.n>=GOAL&&!w.got) award(w); renderHub(); };''')
_css = r'''
/* step174: weekly goal size + streak */
.pr-gsize{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0 2px;font-size:13px}
.pr-gs{all:unset;cursor:pointer;font:700 12.5px var(--body);padding:4px 11px;border-radius:999px;border:1.5px solid var(--line)}
.pr-gs[aria-pressed="true"]{background:color-mix(in srgb,var(--royal) 18%,var(--surface));border-color:var(--royal)}
.pr-streak{font-size:13.5px;margin:6px 0 0;color:var(--muted)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''<b>Weekly goal:</b> 3 practice rounds a week.''', '''<b>Weekly goal:</b> pick 3, 5 or 8 rounds a week (bigger goal, bigger reward for your buddy). Lessons and saying phrases out loud count too, and 4 weeks in a row unlock a 🔥 campfire.''')
