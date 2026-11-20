# 35) find words in saved notes, no more English Journey linking, colored menu
R('''<div class="wbtns"><button class="del edit" type="button" data-cncopy="'+x.id+'">Copy</button>''','''<div class="wbtns"><button class="del edit" type="button" data-cnwords="'+x.id+'" title="Find new words and expressions in this note">✨ Find words</button><button class="del edit" type="button" data-cncopy="'+x.id+'">Copy</button>''')
R('''  const c=e.target.closest("[data-cncopy]"); if(c){''','''  const fw=e.target.closest("[data-cnwords]"); if(fw){ const x=cnotes.find(y=>y.id===fw.dataset.cnwords); const card=fw.closest(".cn-card"); if(!x||!card) return; let box=card.querySelector(".cn-sug"); if(!box){ box=document.createElement("div"); box.className="cn-sug"; box.setAttribute("aria-live","polite"); card.appendChild(box); } if(window.csSuggestWords) window.csSuggestWords(x.text,box,true); return; }
  const c=e.target.closest("[data-cncopy]"); if(c){''')
# English Journey linking card gone (kept in the page, hidden, so nothing else breaks)
R('<div class="card sheet-card" style="margin-bottom:18px">', '<div class="card sheet-card" style="margin-bottom:18px" hidden>')
R("(isNew?'<span class=\"badge new\">not copied yet</span>':'')", "''")
R('" copied. Now paste in your sheet."', '" copied. Paste them anywhere you like."')
R('<summary>Copying from your English Journey sheet? You can also import it exactly as it is</summary>', '<summary>Copying from a spreadsheet? You can also import it exactly as it is</summary>')
R('<li>Open the sheet where you keep your words. <span class="es">1:1 students: the <b>My Word Bank</b> tab in your English Journey sheet.</span></li>', '<li>Open the spreadsheet or document where you keep your words.</li>')
# colored menu groups
for _cls, _name in [("ng-start","Start here"),("ng-practice","Practice"),("ng-speaking","Speaking"),("ng-grammar","Grammar"),("ng-words","Words &amp; sounds"),("ng-work","Work"),("ng-help","Help")]:
    R('<div class="navgroup"><h4>' + _name + '</h4>', '<div class="navgroup ' + _cls + '"><h4>' + _name + '</h4>')
TODAY_CSS += '''
#copyNew{display:none!important}
.navgroup{--ng:var(--muted)}
.ng-start{--ng:#3BB273}.ng-practice{--ng:#F2994A}.ng-speaking{--ng:#E86BA0}.ng-grammar{--ng:#4F9DF0}.ng-words{--ng:#A57CF0}.ng-work{--ng:#2BB5B0}.ng-help{--ng:#9AA3B2}
:root[data-theme="light"] .ng-start,:root[data-theme="sepia"] .ng-start{--ng:#1F8A55}
:root[data-theme="light"] .ng-practice,:root[data-theme="sepia"] .ng-practice{--ng:#C46A12}
:root[data-theme="light"] .ng-speaking,:root[data-theme="sepia"] .ng-speaking{--ng:#C2417A}
:root[data-theme="light"] .ng-grammar,:root[data-theme="sepia"] .ng-grammar{--ng:#1F6FD0}
:root[data-theme="light"] .ng-words,:root[data-theme="sepia"] .ng-words{--ng:#7A4FD0}
:root[data-theme="light"] .ng-work,:root[data-theme="sepia"] .ng-work{--ng:#138A86}
nav.side .navgroup h4{color:var(--ng)}
@media (min-width:901px){
  nav.side .navgroup .navbtn{position:relative;padding-left:22px}
  nav.side .navgroup .navbtn::before{content:"";position:absolute;left:9px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:var(--ng)}
  nav.side .navgroup:not([class*="ng-"]) .navbtn{padding-left:revert-layer}
  nav.side .navgroup:not([class*="ng-"]) .navbtn::before{display:none}
  nav.side .navgroup .navbtn:hover{background:color-mix(in srgb,var(--ng) 14%,transparent)}
  nav.side .navgroup .navbtn[aria-current="true"]{background:color-mix(in srgb,var(--ng) 30%,var(--surface));color:var(--ink);box-shadow:inset 3px 0 0 var(--ng);text-shadow:none}
}
@media (max-width:900px){ nav.side .navgroup .navbtn{border-color:color-mix(in srgb,var(--ng) 55%,var(--line))} nav.side .navgroup .navbtn[aria-current="true"]{background:var(--ng);border-color:var(--ng);color:#fff} }
.cn-card .cn-sug{margin-top:10px}
.park-treat{all:unset;position:absolute;transform:translate(-50%,-50%);cursor:pointer;font-size:calc(24px * var(--z,1));z-index:3;animation:ptBob 1.6s ease-in-out infinite;filter:drop-shadow(0 2px 0 rgba(0,0,0,.25))}
.park-treat:focus-visible{outline:3px solid var(--bright);border-radius:8px}
@keyframes ptBob{50%{transform:translate(-50%,calc(-50% - 4px))}}
html.cs-calm .park-treat{animation:none}
'''
R('<script src="buddy.js?v=11" defer></script>', '<script src="buddy.js?v=12" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-findwords", date:"November 5, 2026", title:"Find words, park treats and a colorful menu 🍪", items:[\n'
  '    ["✨","Find words in any saved note","in <b>My class notes</b>, tap <b>✨ Find words</b> on a saved note to see new words and expressions you can add to My words.","classnotes"],\n'
  '    ["🍪","Treats in the park","sometimes a treat is hiding in the <b>Buddy park</b>. If you see one, tap it to pick it up! It doesn\'t happen every day.","park"],\n'
  '    ["🎨","A colorful menu","each part of the menu now has its own color, so it\'s easier to find what you need."]\n'
  '  ]},\n')
