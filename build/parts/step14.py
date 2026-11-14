# 14) header: no Home pill / Translator link; Translator pinned in the green group; Today card on Home
R('    <a class="pill-btn pill-green" href="#notes" data-go="notes">Home</a>\n', '')
R('    <a class="hdr-link" href="#translate" data-go="translate">Translator</a>\n', '')
R('      <button class="navbtn" data-go="translate">Translator</button>\n', '')
R('<span>My words</span><span class="cn-count" id="wNavCount"></span></button>\n',
  '<span>My words</span><span class="cn-count" id="wNavCount"></span></button>\n'
  '      <button class="navbtn cn-nav" data-go="translate"><span class="w-ico tr-ico" aria-hidden="true">⇄</span><span>Translator</span></button>\n')
R('<p class="lede">Your class notes and new words, all in one place.</p>', open('parts/today.html').read())
R('/* flashcards: practice my words (missed cards come back sooner) */',
  open('parts/daily.js').read() + '/* flashcards: practice my words (missed cards come back sooner) */')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-today", date:"October 29, 2026", title:"Something new every day ☀️", items:[\n'
  '    ["📖","Word of the day","a useful word or expression on your Home page every day, with an example. Tap <b>+ Save to my words</b> to keep it.","notes"],\n'
  '    ["🌱","Thought for today","a short daily reminder about patience, progress and learning at your own pace.","notes"],\n'
  '    ["⇄","Translator, pinned","it now sits in the green menu with Home, My class notes and My words.","translate"]\n'
  '  ]},\n')
TODAY_CSS = open('parts/today.css').read()
# (the Cheat Sheet members link moved to the header icons)
# 15) unicorn mode: dark -> light -> unicorn
R('@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){','@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]){')
R('''function paintThemeBtn(){
  const dark=document.documentElement.getAttribute("data-theme")!=="light";
  document.getElementById("themeIcon").textContent= dark?"☀":"☾";
  document.getElementById("themeTxt").textContent= dark?"Light":"Dark";
  themeBtn.setAttribute("aria-label", dark?"Switch to light mode":"Switch to dark mode");
}
themeBtn.addEventListener("click",()=>{
  const next=document.documentElement.getAttribute("data-theme")==="light"?"dark":"light";''','''const THEMES=["dark","light","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};
function paintThemeBtn(){
  const cur=THEMES.includes(document.documentElement.getAttribute("data-theme"))?document.documentElement.getAttribute("data-theme"):"dark";
  const n=TNEXT[cur];
  document.getElementById("themeIcon").textContent=n[0];
  document.getElementById("themeTxt").textContent=n[1];
  themeBtn.setAttribute("aria-label","Switch to "+n[2]);
  themeBtn.title="Switch to "+n[2];
}
themeBtn.addEventListener("click",()=>{
  const cur=document.documentElement.getAttribute("data-theme");
  const next=THEMES[(THEMES.indexOf(cur)+1)%THEMES.length]||"light";
  if(next==="unicorn") setTimeout(()=>toast("🦄 Unicorn mode!"),50);''')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-unicorn", date:"October 29, 2026", title:"Unicorn mode 🦄", items:[\n'
  '    ["🌈","A third look","tap the theme button at the top (next to Music) to switch between dark, light and a bright rainbow <b>Unicorn</b> mode.",null]\n'
  '  ]},\n')
TODAY_CSS += open('parts/unicorn.css').read()
# 16) sort My words: newest / oldest / A-Z / Z-A
R('<input id="wSearch" type="search" placeholder="Search my words…" aria-label="Search my words" autocomplete="off">',
  '<input id="wSearch" type="search" placeholder="Search my words…" aria-label="Search my words" autocomplete="off">\n      <select id="wSort" class="w-sort" aria-label="Sort my words"><option value="new">Newest first</option><option value="old">Oldest first</option><option value="az">A → Z</option><option value="za">Z → A</option></select>')
R('function renderWords(){\n  const list=allWords().slice().sort((a,b)=>b.t-a.t);',
  '''let wSortMode="new"; try{ wSortMode=localStorage.getItem("cs-wsort")||"new"; }catch(e){}
const wKey=x=>String(x.w||"").toLowerCase().replace(/^(to|a|an|the)\\s+/,"").trim();
function sortWords(l){
  if(wSortMode==="old") return l.sort((a,b)=>(a.t||0)-(b.t||0));
  if(wSortMode==="az"||wSortMode==="za"){ l.sort((a,b)=>wKey(a).localeCompare(wKey(b),"en",{sensitivity:"base"})); return wSortMode==="za"?l.reverse():l; }
  return l.sort((a,b)=>(b.t||0)-(a.t||0));
}
function renderWords(){
  const list=sortWords(allWords().slice());''')
R('/* flashcards: practice my words (missed cards come back sooner) */','''(function(){ const s=document.getElementById("wSort"); if(!s) return; s.value=wSortMode; s.addEventListener("change",()=>{ wSortMode=s.value; try{ localStorage.setItem("cs-wsort",wSortMode); }catch(e){} renderWords(); }); })();
/* flashcards: practice my words (missed cards come back sooner) */''')
TODAY_CSS += '.w-sort{font:700 14px var(--body);color:var(--ink);background:var(--surface);border:1.5px solid var(--line);border-radius:999px;padding:7px 12px;cursor:pointer}\n'
exec(open('parts/step17.py').read())
exec(open('parts/step19.py').read())
