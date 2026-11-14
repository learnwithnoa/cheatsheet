# 34) Buddy park: names only (details on hover/tap), zoom, wandering buddies
TODAY_CSS += '''
.park{overflow:hidden}
.park-vp{position:absolute;inset:0;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:thin}
.park-world{position:relative;width:calc(100% * var(--zw,1));height:calc(100% * var(--zw,1));min-width:100%;min-height:100%;
  background:radial-gradient(ellipse 34% 30% at 50% 52%,color-mix(in srgb,#F5C842 22%,#9BD88A) 0 98%,transparent 100%),linear-gradient(180deg,#BFE6FF 0 14%,#9BD88A 14% 100%)}
:root[data-theme="dark"] .park-world{background:radial-gradient(ellipse 34% 30% at 50% 52%,#3E6B3A 0 98%,transparent 100%),linear-gradient(180deg,#22305A 0 14%,#2E5230 14% 100%)}
:root[data-theme="midnight"] .park-world{background:radial-gradient(ellipse 34% 30% at 50% 52%,#1E3A1E 0 98%,transparent 100%),linear-gradient(180deg,#05070D 0 14%,#0F1F10 14% 100%)}
.park-world .park-deco{font-size:calc(26px * var(--z,1))}
.park-b{transition:left 2.8s linear,top 2.8s linear;width:auto;min-width:70px}
.park-b .pb-flip{display:block;transition:transform .25s}
.park-b .pb-flip.left{transform:scaleX(-1)}
.park-b svg{width:calc(64px * var(--z,1));height:calc(70px * var(--z,1))}
.park-b .pn{font-size:calc(12.5px * max(.72,min(var(--z,1),1.2)));padding:1px 7px}
.park-b.walking svg{animation:parkWalk .45s steps(2) infinite}
@keyframes parkWalk{50%{transform:translateY(-3px)}}
.park-b.p-yawn svg{animation:pYawn 1.6s steps(4) 1;transform-origin:50% 100%}
@keyframes pYawn{30%{transform:scale(1.07,.93)}60%{transform:scale(.95,1.08)}}
.park-b.p-dance svg{animation:pDance 1.3s steps(1) 1}
@keyframes pDance{16%{transform:rotate(-10deg) translateY(-4px)}33%{transform:rotate(10deg)}50%{transform:rotate(-10deg) translateY(-4px)}66%{transform:rotate(10deg)}83%{transform:translateY(-6px)}}
.park-b.p-look .pb-flip{animation:pLook 2s steps(1) 1}
@keyframes pLook{25%{transform:scaleX(-1)}50%{transform:scaleX(1)}75%{transform:scaleX(-1)}}
.park-b.p-spin svg{animation:pSpin .9s steps(6) 1}
@keyframes pSpin{25%{transform:scaleX(0) translateY(-6px)}50%{transform:scaleX(-1) translateY(-10px)}75%{transform:scaleX(0) translateY(-6px)}}
.park-b .pinfo{position:absolute;bottom:calc(100% - 4px);left:50%;transform:translateX(-50%);background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:10px;padding:5px 10px;font:600 12px/1.4 var(--body);white-space:nowrap;box-shadow:0 6px 16px rgba(0,0,0,.2);opacity:0;pointer-events:none;transition:opacity .15s;z-index:4;text-align:center}
.park-b:hover .pinfo,.park-b:focus-visible .pinfo,.park-b.show-info .pinfo{opacity:1}
.park-b:hover,.park-b:focus-visible,.park-b.show-info{z-index:5}
.park-world .park-fx{position:absolute;transform:translateX(-50%);z-index:6}
.park-fx.pf-fly{animation:pfFly 2.4s ease-in-out forwards}
@keyframes pfFly{0%{transform:translate(-90px,10px)}30%{transform:translate(-40px,-16px)}60%{transform:translate(10px,4px)}100%{transform:translate(70px,-40px);opacity:0}}
.park-fx.pf-ball{animation:pfBall 2s ease-out forwards}
@keyframes pfBall{0%{transform:translate(-40px,40px)}30%{transform:translate(-20px,10px)}60%{transform:translate(0,40px)}100%{transform:translate(20px,40px);opacity:0}}
.park-fx.pf-book{animation:pfBook 2.4s ease forwards}
@keyframes pfBook{0%,90%{opacity:1;transform:translate(24px,30px) rotate(-6deg)}100%{opacity:0}}
.park-fx.pf-small{font-size:13px}
.park-zoom{position:absolute;right:10px;top:10px;z-index:7;display:flex;gap:4px}
.park-zoom button{width:36px;height:36px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:800 17px var(--body);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.park-zoom button:disabled{opacity:.4;cursor:default}
.park-zoom button:focus-visible{outline:3px solid var(--bright)}
html.cs-calm .park-b{transition:none}
@media (prefers-reduced-motion:reduce){.park-b{transition:none}}
@media (max-width:640px){.park-b svg{width:calc(50px * var(--z,1));height:calc(55px * var(--z,1))}.park-b{min-width:56px}}
'''
R("<p class=\"lede\">Everyone's study buddies, hanging out together. Tap someone's buddy to send it love: it gets <b>+2 friendship</b> (once a day per buddy).</p>",
  "<p class=\"lede\">Everyone's study buddies, hanging out together. Tap a buddy to see whose it is and send it love: it gets <b>+2 friendship</b> (once a day per buddy). Use <b>− / +</b> to zoom out or in.</p>")
R('<script src="buddy.js?v=10" defer></script>', '<script src="buddy.js?v=11" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-parklife", date:"November 5, 2026", title:"A livelier Buddy park 🌳", items:[\n'
  '    ["🚶","Buddies on the move","in the <b>Buddy park</b>, buddies now walk around, say hi to each other and show off the moves they have unlocked.","park"],\n'
  '    ["🔍","Zoom in and out","use <b>− / +</b> in the park for a wide view or a close-up. Tap a buddy to see whose it is.","park"]\n'
  '  ]},\n')
