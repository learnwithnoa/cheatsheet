# 39) fair rewards (flashcard round size), story stage, vocabulary, recap, listen buttons
R('  if(fcIdx>=fcOrder.length){ fcShuffle(); toast("Round done! New round, hardest words first."); document.dispatchEvent(new CustomEvent("cs-fcround")); }',
  '  if(fcIdx>=fcOrder.length){ const _n=fcOrder.length; fcShuffle(); toast("Round done! New round, hardest words first."); document.dispatchEvent(new CustomEvent("cs-fcround",{detail:{n:_n}})); }')
_back = '<button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button>'
R('<span class="esb">Tus palabras</span></button>', '<span class="esb">Tus palabras</span></button>'
  '<button class="pr-bigbtn pb-vocab" type="button" data-pr="vocab"><span class="pr-ico" aria-hidden="true">🗂️</span><b>Vocabulary</b><span>Word sets by Noa: phrasal verbs, work, travel and more</span><span class="esb">Vocabulario</span></button>')
R('<div class="pr-panel" data-pp="ps" hidden>', '<div class="pr-panel" data-pp="vocab" hidden>' + _back + '<h1><em>Vocabulary</em></h1><p class="lede">Useful words and expressions, in sets. Learn them with flashcards, then take the quiz.</p><div id="vocArea"></div></div>\n'
  '<div class="pr-panel" data-pp="vset" hidden>' + _back + '<h1 id="vsetTitle">Vocabulary</h1><div id="vsetArea"></div></div>\n'
  '<div class="pr-panel" data-pp="ps" hidden>')
TODAY_CSS += '''
.pr-big{max-width:1060px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.pb-vocab{border-top:5px solid #A57CF0}.pb-vocab:hover{border-color:#A57CF0}
.vs-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;max-width:720px;margin-bottom:14px}
.vs-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;max-width:1000px}
.vs-item{padding:14px 16px}
.vs-item p{margin:6px 0 0}
.vs-item-top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.vs-item-top b{font-size:18px}
.vs-ex{color:var(--muted);font-style:italic}
.vs-ex b{color:var(--ink);font-style:normal}
.vs-card{max-width:620px}
.vs-face{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;min-height:190px;width:100%;margin:12px 0;padding:20px;border-radius:16px;background:var(--surface-2);border:2px dashed var(--line)}
.vs-face:focus-visible{outline:3px solid var(--bright)}
.vs-w{font-size:30px;font-weight:800;font-family:var(--display)}
.vs-def{font-size:18px}
'''
TODAY_CSS += '''
.park-b .pb-aura{position:absolute;left:50%;top:52%;width:120%;height:40px;transform:translate(-50%,0);border-radius:50%;pointer-events:none;z-index:-1}
.park-b.tier-1 .pb-aura{background:radial-gradient(closest-side,rgba(225,236,255,.95),rgba(225,236,255,0));}
.park-b.tier-2 .pb-aura{background:radial-gradient(closest-side,rgba(255,200,40,1),rgba(255,200,40,0));animation:auraPulse 2.6s ease-in-out infinite}
.park-b.tier-3 .pb-aura{background:radial-gradient(closest-side,rgba(255,255,255,.9),rgba(255,110,200,.75) 40%,rgba(110,200,255,.6) 70%,rgba(140,255,170,0));animation:auraPulse 2.2s ease-in-out infinite,auraHue 6s linear infinite}
.park-b .pb-aura i{position:absolute;font-style:normal;font-size:14px;color:#FFE27A;text-shadow:0 0 4px rgba(255,220,100,.9);animation:auraTw 1.8s ease-in-out infinite}
.park-b .pb-aura i:nth-child(1){left:-4%;top:-58px}.park-b .pb-aura i:nth-child(2){right:-2%;top:-40px;animation-delay:.6s}.park-b .pb-aura i:nth-child(3){left:46%;top:-74px;animation-delay:1.2s}
.park-b.tier-2 .pb-aura i{right:0;top:-50px}
@keyframes auraPulse{50%{opacity:.6;transform:translate(-50%,0) scale(1.08)}}
@keyframes auraHue{to{filter:hue-rotate(360deg)}}
@keyframes auraTw{0%,100%{opacity:0;transform:scale(.6)}50%{opacity:1;transform:scale(1.1)}}
html.cs-calm .park-b .pb-aura,html.cs-calm .park-b .pb-aura i{animation:none}
.park-legend{display:block;gap:0;font-size:13px;color:var(--muted);margin:0 0 8px}
.park-legend .lg1{color:#B8C7E6;font-weight:700}.park-legend .lg2{color:#E0A100;font-weight:700}
.park-legend .lg3{font-weight:700;background:linear-gradient(90deg,#ff6fb5,#ffb347,#6fd3ff,#8cff9e);-webkit-background-clip:text;background-clip:text;color:transparent}
'''
R('/* ---------------- import words', open('parts/recap.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
.rc-dlg{max-width:380px;text-align:center}
'''
R('<script src="buddy.js?v=16" defer></script>', '<script src="buddy.js?v=17" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-vocab", date:"November 6, 2026", title:"Vocabulary, stories and a new buddy window 🗂️", items:[\n'
  '    ["🗂️","Vocabulary","a new part of <b>Practice</b>: word sets made by Noa (phrasal verbs, work, travel and everyday expressions), with flashcards and a quiz.","quiz"],\n'
  '    ["📖","Past simple stories","a new stage 7, <b>Tell the story</b>, plus lots of new questions in every stage.","quiz"],\n'
  '    ["🐾","A new buddy window","everything is in little sections now. Tap <b>Save</b> to keep your changes."],\n'
  '    ["✨","Glow in the park","buddies glow in the park as their friendship grows: silver, gold and rainbow.","park"],\n'
  '    ["🦄","Glitter is now rare","the unicorn unlocks when you have learned 150 words. If you already have her, she stays!"],\n'
  '    ["📸","Your monthly recap","tap your name at the top right for a picture of your month to share."]\n'
  '  ]},\n')
