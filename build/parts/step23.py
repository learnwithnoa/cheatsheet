# 23) flashcards: choose which words (all / newest 20 / this week / hard ones / my pick) + select words in My words
R('<div id="fcBox">\n', '<div class="fc-set" role="group" aria-label="Which words to practice"><span class="fc-set-l">Which words?</span>'
  '<button type="button" data-fcset="all">All</button><button type="button" data-fcset="new20">Newest 20</button>'
  '<button type="button" data-fcset="week">This week</button><button type="button" data-fcset="hard">Hard ones</button>'
  '<button type="button" data-fcset="pick">My pick <span id="fcPickN"></span></button></div>\n'
  '    <div id="fcSetEmpty" class="fc-set-empty" hidden></div>\n    <div id="fcBox">\n')
R('function fcShuffle(){ const l=allWords().filter(x=>x.w);', '''let fcSet="all"; try{ fcSet=localStorage.getItem("cs-fcset")||"all"; }catch(e){}
function fcList(){
  const l=allWords().filter(x=>x.w);
  if(fcSet==="new20") return l.slice().sort((a,b)=>(b.t||0)-(a.t||0)).slice(0,20);
  if(fcSet==="week"){ const c=Date.now()-7*864e5; return l.filter(x=>(x.t||0)>=c); }
  if(fcSet==="hard") return l.filter(x=>x.id in fcStats && fcStats[x.id]<=1);
  if(fcSet==="pick"){ const p=new Set(fcPick); return l.filter(x=>p.has(x.id)); }
  return l;
}
function fcSetMode(m){ fcSet=m; try{ localStorage.setItem("cs-fcset",m); }catch(e){} fcOrder=[]; fcShuffle(); renderFlash(); }
const FC_EMPTY={new20:"",week:"You haven't saved any words in the last 7 days. Add a few on your <b>Home</b> page, or practice a different set.",
  hard:"No hard words yet. Words you mark <b>✗ Didn't know</b> show up here, so you can practice just those.",
  pick:"You haven't picked any words yet. Go to <b>My words</b>, tap <b>Choose words</b>, tick the ones you want and press <b>Practice these</b>."};
function fcShuffle(){ const l=fcList();''')
R('''function renderFlash(){
  const list=allWords().filter(x=>x.w);
  fcEmpty.hidden=list.length>0; fcBox.hidden=!list.length;
  if(!list.length) return;''', '''function renderFlash(){
  const all=allWords().filter(x=>x.w), list=fcList();
  document.querySelectorAll("[data-fcset]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.fcset===fcSet)));
  const pn=new Set(all.map(x=>x.id)); document.getElementById("fcPickN").textContent=fcPick.filter(i=>pn.has(i)).length?"("+fcPick.filter(i=>pn.has(i)).length+")":"";
  document.querySelector(".fc-set").hidden=!all.length;
  fcEmpty.hidden=all.length>0;
  const se=document.getElementById("fcSetEmpty");
  se.hidden=!(all.length&&!list.length);
  if(all.length&&!list.length) se.innerHTML='<p style="margin:0 0 10px">'+(FC_EMPTY[fcSet]||"No words in this set.")+'</p><div class="note-actions">'+(fcSet==="pick"?'<button class="pill-btn pill-green" type="button" id="fcGoPick">Choose words</button>':'')+'<button class="swap" type="button" data-fcset="all">Practice all my words</button></div>';
  fcBox.hidden=!list.length;
  if(!list.length) return;''')
R('const learned=list.filter(', 'const learned=list.filter(')  # sanity
R('if(fcIdx>=fcOrder.length){ fcShuffle(); toast("Round done! New round, hardest words first."); }',
  'if(fcIdx>=fcOrder.length){ fcShuffle(); toast("Round done! New round, hardest words first."); document.dispatchEvent(new CustomEvent("cs-fcround")); }')
R('fcShuffle();\n\n\n/* ---------------- import words', '''document.querySelector("#v-quiz").addEventListener("click",e=>{
  const b=e.target.closest("[data-fcset]"); if(b){ fcSetMode(b.dataset.fcset); return; }
  if(e.target.closest("#fcGoPick")){ wSel=true; go("words"); renderWords(); setTimeout(()=>{ const t=document.getElementById("wSelBar"); if(t) t.scrollIntoView({block:"center"}); },80); }
});
fcShuffle();


/* ---------------- import words''')
# My words: choose words for flashcards
R('''      <button class="pill-btn" type="button" id="copyNew">Copy new words</button>''',
  '''      <button class="swap" type="button" id="wSelBtn" aria-pressed="false">Choose words</button>
      <button class="pill-btn" type="button" id="copyNew">Copy new words</button>''')
R('<div id="wordList"', '<div class="w-selbar" id="wSelBar" hidden><span id="wSelN">0 chosen</span><button class="swap" type="button" id="wSelAll">Choose all shown</button><button class="swap" type="button" id="wSelNone">Clear</button><button class="pill-btn pill-green" type="button" id="wSelGo">Practice these →</button><button class="swap" type="button" id="wSelDone">Done</button></div>\n<div id="wordList"')
R('''function renderWords(){
  const list=sortWords(allWords().slice());''','''let wSel=false, fcPick=LS.get("ncs-fcpick",[]); if(!Array.isArray(fcPick)) fcPick=[];
function renderSelBar(){
  const bar=document.getElementById("wSelBar"); bar.hidden=!wSel;
  const btn=document.getElementById("wSelBtn"); btn.setAttribute("aria-pressed",String(wSel)); btn.textContent=wSel?"Done choosing":"Choose words";
  const n=fcPick.length; document.getElementById("wSelN").textContent=n+(n===1?" word":" words")+" chosen";
  document.getElementById("wSelGo").disabled=!n;
}
function renderWords(){
  const list=sortWords(allWords().slice());
  if(typeof renderSelBar==="function") renderSelBar();''')
R('''    return '<article class="card wcard">'+sayBtn(x.w.replace(/\\(.*?\\)/g,""))+''',
  '''    const picked=wSel&&fcPick.includes(x.id);
    return '<article class="card wcard'+(wSel?' wsel':'')+(picked?' picked':'')+'"'+(wSel?' data-pick="'+x.id+'"':'')+'>'+(wSel?'<input type="checkbox" class="w-chk" aria-label="Choose '+esc(x.w)+'"'+(picked?' checked':'')+'>':sayBtn(x.w.replace(/\\(.*?\\)/g,"")))+''')
R('''wList.addEventListener("click",e=>{''','''function savePick(){ LS.set("ncs-fcpick",fcPick); renderWords(); }
wList.addEventListener("click",e=>{
  const pc=wSel&&e.target.closest("[data-pick]");
  if(pc){ const id=pc.dataset.pick; fcPick=fcPick.includes(id)?fcPick.filter(i=>i!==id):fcPick.concat(id); savePick(); return; }''')
R('/* flashcards: practice my words (missed cards come back sooner) */', '''document.getElementById("wSelBtn").addEventListener("click",()=>{ wSel=!wSel; renderWords(); });
document.getElementById("wSelDone").addEventListener("click",()=>{ wSel=false; renderWords(); });
document.getElementById("wSelNone").addEventListener("click",()=>{ fcPick=[]; savePick(); });
document.getElementById("wSelAll").addEventListener("click",()=>{ const q=norm(wSearch.value.trim()); const ids=allWords().filter(x=>x.w&&!x.sample&&(!q||[x.w,x.m,x.e].some(s=>norm(s||"").includes(q)))).map(x=>x.id); fcPick=Array.from(new Set(fcPick.concat(ids))); savePick(); });
document.getElementById("wSelGo").addEventListener("click",()=>{ wSel=false; renderWords(); fcSetMode("pick"); go("quiz"); });
/* flashcards: practice my words (missed cards come back sooner) */''', 1)
TODAY_CSS += '''
.fc-set{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 12px}
.fc-set-l{font:700 11px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-right:4px}
.fc-set button{font:700 13.5px var(--body);color:var(--ink);background:var(--surface);border:1.5px solid var(--line);border-radius:999px;padding:6px 12px;cursor:pointer}
.fc-set button[aria-pressed="true"]{background:color-mix(in srgb,var(--green) 22%,var(--surface));border-color:var(--green);color:var(--ink)}
.fc-set-empty{border:1.5px dashed var(--line);border-radius:14px;padding:16px;margin-bottom:6px}
.w-selbar{position:sticky;top:70px;z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 12px;margin:0 0 10px;border-radius:14px;background:var(--surface);border:1.5px solid var(--green);box-shadow:0 6px 18px rgba(0,0,0,.08)}
.w-selbar #wSelN{font-weight:800;margin-right:auto}
.w-selbar button:disabled{opacity:.45;cursor:not-allowed}
.wcard.wsel{cursor:pointer}
.wcard.wsel .wbtns{display:none}
.wcard.picked{border-color:var(--green);background:color-mix(in srgb,var(--green) 8%,var(--surface))}
.w-chk{width:22px;height:22px;margin:4px 6px 0 2px;accent-color:var(--green);pointer-events:none}
#wSelBtn[aria-pressed="true"]{border-color:var(--green);color:var(--green)}
'''
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-fcsets", date:"November 2, 2026", title:"Practice just some of your words 🃏", items:[\n'
  '    ["🎯","Choose which words","in <b>Practice</b>, pick <b>Newest 20</b>, <b>This week</b>, <b>Hard ones</b> or <b>My pick</b> instead of your whole list.","quiz"],\n'
  '    ["☑","Pick your own","in <b>My words</b>, tap <b>Choose words</b>, tick the ones you want and press <b>Practice these</b>.","words"],\n'
  '    ["Aa","New font: Book","a calm, book-style font in <b>Settings</b>. It looks lovely with the Sepia look.",null]\n'
  '  ]},\n')
