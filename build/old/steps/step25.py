# 25) word notes, thought-for-today sparkle, buddy park page
NOTE_PH = 'e.g. Informal. Similar to &quot;work out&quot;.'
R('<div class="field wide"><label for="nExample">Example sentence <span class="opt">(optional)</span></label><input id="nExample" type="text" placeholder="e.g. I couldn\'t figure out the answer."></div>',
  '<div class="field wide"><label for="nExample">Example sentence <span class="opt">(optional)</span></label><input id="nExample" type="text" placeholder="e.g. I couldn\'t figure out the answer."></div>\n'
  '    <div class="field wide"><label for="nNote">Notes <span class="opt">(optional)</span></label><input id="nNote" type="text" placeholder="' + NOTE_PH + '"></div>')
R('<div class="field"><label for="qaExample">Example sentence <span class="opt">(optional)</span></label><input id="qaExample" type="text"></div>',
  '<div class="field"><label for="qaExample">Example sentence <span class="opt">(optional)</span></label><input id="qaExample" type="text"></div>\n'
  '  <div class="field"><label for="qaNote">Notes <span class="opt">(optional)</span></label><input id="qaNote" type="text" placeholder="' + NOTE_PH + '"></div>')
R('''function addWord(w,m,e){
  w=(w||"").trim(); m=(m||"").trim(); e=(e||"").trim();''','''function addWord(w,m,e,n){
  w=(w||"").trim(); m=(m||"").trim(); e=(e||"").trim(); n=(n||"").trim();''')
R('words.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),w,m,e,t:Date.now()});',
  'words.push(Object.assign({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),w,m,e,t:Date.now()},n?{n}:{}));')
R('''  const w=document.getElementById("nWord"), m=document.getElementById("nMeaning"), ex=document.getElementById("nExample");
  if(!w.value.trim()){ w.focus(); return; }
  addWord(w.value,m.value,ex.value);
  w.value=""; m.value=""; ex.value=""; w.focus();''','''  const w=document.getElementById("nWord"), m=document.getElementById("nMeaning"), ex=document.getElementById("nExample"), nn=document.getElementById("nNote");
  if(!w.value.trim()){ w.focus(); return; }
  addWord(w.value,m.value,ex.value,nn.value);
  w.value=""; m.value=""; ex.value=""; nn.value=""; w.focus();''')
R('document.getElementById("qaExample").value=e||"";','document.getElementById("qaExample").value=e||""; document.getElementById("qaNote").value="";')
R('addWord(w.value,document.getElementById("qaMeaning").value,document.getElementById("qaExample").value);',
  'addWord(w.value,document.getElementById("qaMeaning").value,document.getElementById("qaExample").value,document.getElementById("qaNote").value);')
R('''      '<div class="field wide"><label for="ed-e">Example sentence</label><input id="ed-e" type="text" value="'+esc(x.e||"")+'"></div>'+''',
  '''      '<div class="field wide"><label for="ed-e">Example sentence</label><input id="ed-e" type="text" value="'+esc(x.e||"")+'"></div>'+
      '<div class="field wide"><label for="ed-n">Notes</label><input id="ed-n" type="text" value="'+esc(x.n||"")+'"></div>'+''')
R('x.e=document.getElementById("ed-e").value.trim();','x.e=document.getElementById("ed-e").value.trim(); { const nv=document.getElementById("ed-n").value.trim(); if(nv) x.n=nv; else delete x.n; }')
R("(x.e?'<div class=\"ex\">'+esc(x.e)+'</div>':'')+", "(x.e?'<div class=\"ex\">'+esc(x.e)+'</div>':'')+(x.n?'<div class=\"wn\">📝 '+esc(x.n)+'</div>':'')+")
R('const shown=list.filter(x=>!q||[x.w,x.m,x.e].some(s=>norm(s||"").includes(q)));','const shown=list.filter(x=>!q||[x.w,x.m,x.e,x.n].some(s=>norm(s||"").includes(q)));')
R("const ex=x.e?'<i>'+esc(x.e)+'</i>':'';","const ex=(x.e?'<i>'+esc(x.e)+'</i>':'')+(x.n?'<small class=\"fc-note\">📝 '+esc(x.n)+'</small>':'');")
TODAY_CSS += '''
.wcard .wn{font-size:14px;color:var(--ink);background:color-mix(in srgb,var(--green) 9%,var(--surface));border-radius:8px;padding:4px 8px;margin-top:5px;display:inline-block}
.fc-note{display:block;margin-top:8px;font-size:14px;color:var(--muted)}
.tt-row{display:flex;justify-content:flex-end;margin-top:10px}
.tt-love{position:relative;font:800 14px var(--body);color:var(--ink);background:var(--surface);border:1.5px solid var(--line);border-radius:999px;padding:7px 14px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.tt-love:hover{border-color:#E0A100}
.tt-love[aria-pressed="true"]{background:color-mix(in srgb,#F5B800 18%,var(--surface));border-color:#E0A100}
.tt-love .tt-ico{display:inline-block}
.tt-love.pop .tt-ico{animation:ttPop .6s ease-out}
@keyframes ttPop{0%{transform:scale(1)}40%{transform:scale(1.7) rotate(-15deg)}100%{transform:scale(1)}}
.tt-spark{position:absolute;left:22px;top:50%;pointer-events:none;font-size:14px;animation:ttSpark .9s ease-out forwards}
@keyframes ttSpark{from{opacity:1;transform:translate(0,-50%) scale(.6)}to{opacity:0;transform:translate(var(--dx),calc(-50% + var(--dy))) scale(1.2)}}
html.cs-calm .tt-love.pop .tt-ico,html.cs-calm .tt-spark{animation:none;display:none}
html.cs-calm .tt-love.pop .tt-ico{display:inline-block}
.park{position:relative;width:100%;height:min(70vh,560px);min-height:380px;border-radius:20px;overflow:hidden;border:1.5px solid var(--line);
  background:radial-gradient(ellipse 34% 30% at 50% 52%,color-mix(in srgb,#F5C842 22%,#9BD88A) 0 98%,transparent 100%),linear-gradient(180deg,#BFE6FF 0 14%,#9BD88A 14% 100%)}
:root[data-theme="dark"] .park,:root:not([data-theme]) .park{background:radial-gradient(ellipse 34% 30% at 50% 52%,#3E6B3A 0 98%,transparent 100%),linear-gradient(180deg,#22305A 0 14%,#2E5230 14% 100%)}
.park-deco{position:absolute;font-size:26px;pointer-events:none;opacity:.9}
.park-b{all:unset;position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;cursor:pointer;width:96px}
.park-b svg{width:64px;height:70px;image-rendering:pixelated;animation:parkBob 1.8s steps(1) infinite;filter:drop-shadow(0 3px 0 rgba(0,0,0,.15))}
.park-b:nth-child(3n) svg{animation-delay:.6s}.park-b:nth-child(3n+1) svg{animation-delay:1.1s}
@keyframes parkBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.park-b.hop svg{animation:parkHop .45s steps(2) 2}
@keyframes parkHop{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.park-b .pn{font:800 12.5px var(--body);color:#1F2A44;background:rgba(255,255,255,.88);border-radius:999px;padding:2px 9px;margin-top:2px;white-space:nowrap;max-width:110px;overflow:hidden;text-overflow:ellipsis}
.park-b .po{font:600 11px var(--body);color:#1F2A44;background:rgba(255,255,255,.7);border-radius:999px;padding:1px 7px;margin-top:2px;white-space:nowrap}
.park-b.me .pn{background:#2E8B57;color:#fff}
.park-b:focus-visible .pn{outline:3px solid #5BD38E}
.park-fx{position:absolute;pointer-events:none;font-size:18px;animation:bdFloat 1.2s ease-out forwards}
.park-msg{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:20px}
.park-msg div{background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:16px;padding:16px 18px;max-width:360px}
.park-legend{display:flex;flex-wrap:wrap;gap:14px;margin:10px 0 0;font-size:13.5px;color:var(--muted)}
html.cs-calm .park-b svg{animation:none}
@media (max-width:640px){.park{height:min(78vh,620px)}.park-b{width:78px}.park-b svg{width:50px;height:55px}.park-b .po{display:none}}
'''
R('    <div class="card today-thought">\n      <span class="tag td-tag2">Thought for today</span>\n      <p class="tt" id="ttText"></p>\n',
  '    <div class="card today-thought">\n      <span class="tag td-tag2">Thought for today</span>\n      <p class="tt" id="ttText"></p>\n'
  '      <div class="tt-row"><button class="tt-love" type="button" id="ttLove" aria-pressed="false"><span class="tt-ico" aria-hidden="true">✨</span><span id="ttLoveTxt">Send love</span></button></div>\n')
R('/* flashcards: practice my words (missed cards come back sooner) */', '''(function(){
  const b=document.getElementById("ttLove"); if(!b) return;
  const day=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const paint=()=>{ const on=LS.get("ncs-ttlove","")===day(); b.setAttribute("aria-pressed",String(on)); document.getElementById("ttLoveTxt").textContent=on?"Love sent":"Send love"; };
  paint();
  b.addEventListener("click",()=>{
    const first=LS.get("ncs-ttlove","")!==day();
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
    for(let i=0;i<8;i++){ const s=document.createElement("span"); s.className="tt-spark"; s.textContent=i%2?"✦":"✨"; const a=i/8*Math.PI*2; s.style.setProperty("--dx",Math.round(Math.cos(a)*38)+"px"); s.style.setProperty("--dy",Math.round(Math.sin(a)*30)+"px"); b.appendChild(s); setTimeout(()=>s.remove(),1000); }
    if(first){ LS.set("ncs-ttlove",day()); paint(); if(window.csBuddy&&window.csBuddy.love) window.csBuddy.love(); }
  });
})();
/* flashcards: practice my words (missed cards come back sooner) */''')
R('      <button class="navbtn cn-nav" data-go="translate"><span class="w-ico tr-ico" aria-hidden="true">⇄</span><span>Translator</span></button>\n',
  '      <button class="navbtn cn-nav" data-go="translate"><span class="w-ico tr-ico" aria-hidden="true">⇄</span><span>Translator</span></button>\n'
  '      <button class="navbtn cn-nav" data-go="park"><span class="w-ico" aria-hidden="true">🌳</span><span>Buddy park</span></button>\n')
R('<section class="view" id="v-translate" hidden>', '''<section class="view" id="v-park" hidden>
  <h1>Buddy <em>park</em></h1>
  <p class="lede">Everyone's study buddies, hanging out together. Tap a buddy to say hi.</p>
  <div class="park" id="parkArea" aria-live="polite"></div>
  <div class="park-legend"><span>🌼 In the middle: Noa's English Club</span><span>🌳 Around the edges: private students</span></div>
</section>

<section class="view" id="v-translate" hidden>''')
R('<script src="buddy.js?v=4" defer></script>', '<script src="buddy.js?v=5" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-park", date:"November 2, 2026", title:"The Buddy park 🌳", items:[\n'
  '    ["🌳","Buddy park","see everyone\'s study buddies hanging out together in the new <b>Buddy park</b> (in the green menu). Club members are in the middle, private students around the edges.","park"],\n'
  '    ["📝","Notes for your words","add an optional note to any word: when to use it, a similar word, a tip from class.","words"],\n'
  '    ["✨","Send love","tap ✨ on the <b>Thought for today</b> to send some love (and give your buddy +1 friendship).","notes"],\n'
  '    ["💛","Each buddy, its own friendship","every animal has its own friendship level now. Your words, outfits and colors are shared. Two colors are free, and the rest unlock at 10, 20 and 35 words.",null]\n'
  '  ]},\n')
