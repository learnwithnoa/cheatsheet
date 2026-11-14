# 33) smarter words, paste-anything import, words from notes, clean-up, beginner mode, Midnight theme
# --- import card: paste anything first, sheet import second
_a = s.index('  <div class="card import-card" id="importCard" hidden>')
_b = s.index('    <p class="imp-preview" id="impPreview" aria-live="polite"></p>\n  </div>', _a) + len('    <p class="imp-preview" id="impPreview" aria-live="polite"></p>\n  </div>')
s = s[:_a] + '''  <div class="card import-card" id="importCard" hidden>
    <div class="qa-top"><h3>Add many words at once</h3><button class="qa-x" type="button" id="impClose" aria-label="Close">×</button></div>
    <p class="imp-lede">Paste your words in <b>any format</b>: a list, a message, notes from class, a copy from a document… ✨ The AI finds the words, adds the Spanish and skips the ones you already have. You'll see the list before anything is added.</p>
    <label for="impText" class="sr">Paste your words</label>
    <textarea id="impText" spellcheck="false" placeholder="Paste here. For example:&#10;figure out&#10;run into = toparse con&#10;Today I learned &quot;break the ice&quot; and &quot;call it a day&quot;"></textarea>
    <div class="note-actions">
      <button class="pill-btn pill-green" type="button" id="impAI">✨ Find my words</button>
      <label class="swap file-btn" for="impFile">Or choose a file (.csv, .txt)</label>
      <input type="file" id="impFile" accept=".csv,.tsv,.txt,text/csv,text/plain,text/tab-separated-values" class="sr">
    </div>
    <div id="impPick" aria-live="polite"></div>
    <p class="imp-preview" id="impPreview" aria-live="polite"></p>
    <details class="imp-sheet">
      <summary>Copying from your English Journey sheet? You can also import it exactly as it is</summary>
      <ol class="imp-steps">
        <li>Open the sheet where you keep your words. <span class="es">1:1 students: the <b>My Word Bank</b> tab in your English Journey sheet.</span></li>
        <li>Select the rows with your words (the English, Spanish and example columns) and copy them (Ctrl+C / ⌘C).</li>
        <li>Paste them in the box above and press <b>Import exactly as pasted</b>. No AI, every row becomes one word.</li>
      </ol>
      <button class="pill-btn" type="button" id="impBtn">Import exactly as pasted</button>
    </details>
  </div>''' + s[_b:]
R('impPrev.innerHTML= list.length ? "Found <b>"+fresh+"</b> new "', 'impPrev.innerHTML= list.length ? "Exactly as pasted: <b>"+fresh+"</b> new "')
R('list.forEach((x,i)=>{ const k=norm(x.w); if(have.has(k)) return; have.add(k); words.push({id:(base+i).toString(36)+Math.random().toString(36).slice(2,6),w:x.w,m:x.m,e:x.e,t:base-(list.length-i),imp:true}); n++; });',
  'const newIds=[]; list.forEach((x,i)=>{ const k=norm(x.w); if(have.has(k)) return; have.add(k); const id=(base+i).toString(36)+Math.random().toString(36).slice(2,6); newIds.push(id); words.push({id,w:x.w,m:x.m,e:x.e,t:base-(list.length-i),imp:true}); n++; }); setTimeout(()=>{ if(window.queueEnrich) window.queueEnrich(newIds); },50);')
# --- My words toolbar
R('<button class="pill-btn pill-green" type="button" id="impOpen" aria-expanded="false" aria-controls="importCard">Import a list of words</button>',
  '<button class="pill-btn pill-green" type="button" id="impOpen" aria-expanded="false" aria-controls="importCard">+ Add many words</button><button class="swap" type="button" id="aiFill" title="Fill in missing translations, meanings, word types and examples">✨ Complete my words</button><button class="swap" type="button" id="aiClean" title="Fix spelling, punctuation and capital letters, and find repeated words">🧹 Clean up my words</button>')
R('  <div id="slotAwPage" class="page-slot"></div>\n  <div class="card import-card"', '  <p class="ai-status" id="aiStatus" hidden aria-live="polite"></p>\n  <div id="slotAwPage" class="page-slot"></div>\n  <div class="card import-card"')
# --- word cards: type badge + simple meaning
R('''      '<div><div class="w">'+esc(x.w)+'</div>'+(x.m?'<div class="m">'+esc(x.m)+'</div>':'')''',
  '''      '<div><div class="w">'+esc(x.w)+(x.pos?' <span class="pos">'+esc(x.pos)+'</span>':'')+'</div>'+(x.m?'<div class="m">'+esc(x.m)+'</div>':'')+(x.def?'<div class="wdef">'+esc(x.def)+'</div>':'')''')
R('const shown=list.filter(x=>!q||[x.w,x.m,x.e,x.n].some(s=>norm(s||"").includes(q)));', 'const shown=list.filter(x=>!q||[x.w,x.m,x.e,x.n,x.def,x.pos].some(s=>norm(s||"").includes(q)));')
R("const ex=(x.e?'<i>'+esc(x.e)+'</i>':'')", "const ex=(x.def?'<small class=\"fc-def\">'+(x.pos?'<span class=\"pos\">'+esc(x.pos)+'</span> ':'')+esc(x.def)+'</small>':'')+(x.e?'<i>'+esc(x.e)+'</i>':'')")
# --- class notes: suggest words after saving
R('    <p class="cn-warn dismissible when-out">', '    <div id="cnSuggest" class="cn-sug" hidden aria-live="polite"></div>\n    <p class="cn-warn dismissible when-out">', 1)
R('  cnotes.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text,t:Date.now()});',
  '  cnotes.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text,t:Date.now()});\n  setTimeout(()=>{ if(window.csSuggestWords) window.csSuggestWords(text); },400);')
# --- slower voice in beginner mode
R("window.csSpeak(text,{rate:.85,", "window.csSpeak(text,{rate:(window.csBeginnerOn&&window.csBeginnerOn())?.72:.85,")
# --- star names ignore level badges
R('''const navLabel=id=>{ const b=document.querySelector('nav.side .navgroup:not(.starred) .navbtn[data-go="'+id+'"]'); if(!b) return id; const sp=[...b.querySelectorAll("span")].filter(x=>!x.getAttribute("aria-hidden")&&!x.classList.contains("cn-count")); return (sp[0]||b).textContent.trim(); };''',
  '''const navLabel=id=>{ const b=document.querySelector('nav.side .navgroup:not(.starred) .navbtn[data-go="'+id+'"]'); if(!b) return id; const c=b.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl').forEach(x=>x.remove()); return c.textContent.trim(); };''')
# --- AI feedback in beginner mode
R('const p="You are a kind, encouraging English coach for a Spanish-speaking learner (level B1 to B2). The student',
  'const p="You are a kind, encouraging English coach for a Spanish-speaking learner "+((window.csBeginnerOn&&window.csBeginnerOn())?"who is a BEGINNER (level A1 to A2): use very simple, short English, and end the feedback with one short sentence in Spanish that repeats the main point":"(level B1 to B2)")+". The student')
R('return "You are helping a Spanish-speaking student of English (level B1 to B2) review',
  'return "You are helping a Spanish-speaking student of English "+((window.csBeginnerOn&&window.csBeginnerOn())?"who is a beginner (level A1 to A2; write in very simple English and add the Spanish meaning in brackets after hard words)":"(level B1 to B2)")+" review')
# --- the new JS
R('/* ---------------- delete all words ---------------- */', open('parts/wordai.js').read() + '\nwindow.queueEnrich=queueEnrich; window.csBeginnerOn=csBeginner;\n' + open('parts/beginner.js').read() + '\n/* ---------------- delete all words ---------------- */')
# --- Midnight theme + theme menu
R('@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]):not([data-theme="sepia"]){',
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]):not([data-theme="sepia"]):not([data-theme="midnight"]){')
R('const THEMES=["dark","light","sepia","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["📖","Sepia","sepia mode"],sepia:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};',
  'const THEMES=["dark","light","sepia","midnight","unicorn"], TINFO={dark:["☾","Dark"],midnight:["🌑","Midnight"],light:["☀","Light"],sepia:["📖","Sepia"],unicorn:["🦄","Unicorn"]};')
_a = s.index('function paintThemeBtn(){')
_b = s.index('});', s.index('themeBtn.addEventListener("click",()=>{', _a)) + 3
s = s[:_a] + '''function paintThemeBtn(){
  const cur=THEMES.includes(document.documentElement.getAttribute("data-theme"))?document.documentElement.getAttribute("data-theme"):"dark";
  document.getElementById("themeIcon").textContent=TINFO[cur][0];
  document.getElementById("themeTxt").textContent=TINFO[cur][1];
  themeBtn.setAttribute("aria-label","Theme: "+TINFO[cur][1]+". Change theme");
  themeBtn.title="Change theme";
  themeBtn.setAttribute("aria-haspopup","menu");
  document.querySelectorAll("#themeMenu [data-th]").forEach(b=>b.setAttribute("aria-checked",String(b.dataset.th===cur)));
}
(function(){
  const m=document.createElement("div"); m.id="themeMenu"; m.className="theme-menu"; m.setAttribute("role","menu"); m.hidden=true;
  m.innerHTML=THEMES.map(t=>'<button type="button" role="menuitemradio" data-th="'+t+'" aria-checked="false"><span aria-hidden="true">'+TINFO[t][0]+'</span> '+TINFO[t][1]+'</button>').join("");
  document.body.appendChild(m);
  const close=()=>{ m.hidden=true; themeBtn.setAttribute("aria-expanded","false"); };
  themeBtn.addEventListener("click",e=>{
    e.stopPropagation();
    if(!m.hidden){ close(); return; }
    paintThemeBtn();
    const r=themeBtn.getBoundingClientRect(); m.style.top=(r.bottom+6)+"px"; m.style.left=Math.max(8,Math.min(window.innerWidth-200,r.left))+"px";
    m.hidden=false; themeBtn.setAttribute("aria-expanded","true");
    const on=m.querySelector('[aria-checked="true"]')||m.querySelector("button"); on.focus();
  });
  m.addEventListener("click",e=>{ const b=e.target.closest("[data-th]"); if(!b) return; window.csSetTheme(b.dataset.th); close(); themeBtn.focus(); });
  m.addEventListener("keydown",e=>{ const bs=[...m.querySelectorAll("button")], i=bs.indexOf(document.activeElement);
    if(e.key==="Escape"){ close(); themeBtn.focus(); } else if(e.key==="ArrowDown"){ e.preventDefault(); bs[(i+1)%bs.length].focus(); } else if(e.key==="ArrowUp"){ e.preventDefault(); bs[(i-1+bs.length)%bs.length].focus(); } });
  document.addEventListener("click",e=>{ if(!m.hidden&&!e.target.closest("#themeMenu")) close(); });
  window.addEventListener("resize",close);
})();''' + s[_b:]
TODAY_CSS += '''
.theme-menu{position:fixed;z-index:80;min-width:170px;background:var(--surface);border:1.5px solid var(--line);border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.25);padding:6px;display:flex;flex-direction:column;gap:2px}
.theme-menu[hidden]{display:none}
.theme-menu button{all:unset;cursor:pointer;padding:8px 10px;border-radius:9px;font:700 14px var(--body);color:var(--ink);display:flex;gap:8px;align-items:center}
.theme-menu button:hover,.theme-menu button:focus-visible{background:var(--surface-2);outline:none}
.theme-menu button[aria-checked="true"]{background:color-mix(in srgb,var(--green) 18%,var(--surface))}
:root[data-theme="midnight"] .td-tag2{color:#F5C842}
:root[data-theme="midnight"] .park{background:radial-gradient(ellipse 34% 30% at 50% 52%,#1E3A1E 0 98%,transparent 100%),linear-gradient(180deg,#05070D 0 14%,#0F1F10 14% 100%)}
/* smarter words */
.wcard .pos,.fc-def .pos,.imp-row .pos,.cn-sug .pos{display:inline-block;font:700 10.5px var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--royal);background:color-mix(in srgb,var(--royal) 12%,var(--surface));border-radius:6px;padding:1px 6px;vertical-align:2px;margin-left:4px}
.wcard .wdef{font-size:14px;color:var(--muted);margin-top:2px}
.fc-def{display:block;margin:6px 0;font-size:14.5px;color:var(--muted)}
.ai-status{font-size:14px;background:color-mix(in srgb,var(--green) 10%,var(--surface));border:1.5px solid var(--line);border-radius:12px;padding:8px 12px;margin:0 0 12px}
.imp-lede{margin:4px 0 10px;font-size:14.5px}
.imp-sheet{margin-top:14px;border-top:1px dashed var(--line);padding-top:10px}
.imp-sheet summary{cursor:pointer;font-weight:700;font-size:14px;color:var(--muted)}
.imp-found{margin:12px 0 6px;font-size:14.5px}
.imp-list{display:flex;flex-direction:column;gap:4px;max-height:320px;overflow:auto;border:1.5px solid var(--line);border-radius:12px;padding:6px}
.imp-row{display:flex;gap:10px;align-items:flex-start;padding:6px 8px;border-radius:8px;cursor:pointer;font-size:14.5px}
.imp-row:hover{background:var(--surface-2)}
.imp-row input{margin-top:3px;accent-color:var(--green);width:17px;height:17px;flex:none}
.imp-row small{display:block;color:var(--muted);font-size:13px}
.imp-row.dup{opacity:.55;cursor:default}
.cn-sug{margin:12px 0 4px;border:1.5px solid color-mix(in srgb,var(--green) 45%,var(--line));background:color-mix(in srgb,var(--green) 7%,var(--surface));border-radius:14px;padding:10px 12px}
.cn-sug-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
.cn-sug-top .tip-x{position:static}
.cu-dlg{width:min(560px,calc(100vw - 28px))}
.cu-list{display:flex;flex-direction:column;gap:4px;max-height:42vh;overflow:auto}
.cu-row{display:flex;gap:10px;align-items:flex-start;padding:6px 4px;border-bottom:1px dashed var(--line);font-size:14px;cursor:pointer}
.cu-row input{margin-top:3px;accent-color:var(--green);width:17px;height:17px;flex:none}
.cu-row del{color:var(--red);text-decoration:line-through}
.cu-row ins{color:var(--green);text-decoration:none;font-weight:700}
.cu-dlg h4{margin:14px 0 6px}
/* beginner mode */
.esb{display:none}
html.cs-beginner .esb{display:block;font:600 .86em var(--body);color:var(--muted);font-style:normal;letter-spacing:0;text-transform:none;margin-top:3px}
html.cs-beginner .esb.esb-in{font-size:11.5px;opacity:.85;margin-top:1px;line-height:1.2}
html.cs-beginner label .esb.esb-in{display:inline;margin-left:6px}
html.cs-beginner label .esb.esb-in::before{content:"· "}
html.cs-beginner .tag .esb.esb-in,html.cs-beginner .td-tag2 .esb.esb-in{display:inline;margin-left:6px;font-size:10.5px}
.lvl-chip{display:inline-block;vertical-align:middle;margin-left:10px;font:800 12px var(--mono);letter-spacing:.04em;padding:3px 8px;border-radius:8px;color:#fff;background:#3BA776;-webkit-text-fill-color:#fff}
.lvl-a2{background:#2F8FD9}.lvl-b1{background:#8E5CD9}.lvl-b2{background:#D9527F}
.nav-lvl{display:none}
html.cs-beginner .nav-lvl{display:inline-block;margin-left:6px;font:800 9.5px var(--mono);padding:1px 5px;border-radius:5px;color:#fff;vertical-align:1px}
.is-es{display:none}
html.cs-beginner .is-es{display:inline-block;margin-top:8px;font:700 12.5px var(--body);color:var(--royal);background:transparent;border:1.5px solid var(--line);border-radius:999px;padding:3px 10px;cursor:pointer}
.is-es-txt{margin-top:6px;font-size:14.5px;color:var(--ink);border-left:3px solid var(--green);padding-left:10px}
'''
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-smartwords", date:"November 5, 2026", title:"Smarter words 🧠", items:[\n'
  '    ["✨","Every word explained","new words now get their type (noun, verb, phrasal verb…), a simple meaning and an example sentence, all by themselves. Tap <b>✨ Complete my words</b> to do it for the ones you already have.","words"],\n'
  '    ["📋","Paste anything","<b>+ Add many words</b> now understands any list: a message, notes, a document. You check the words before they\'re added.","words"],\n'
  '    ["📝","Words from your notes","when you save a class note, the Cheat Sheet suggests the new words and expressions in it.","notes"],\n'
  '    ["🧹","Clean up my words","fixes spelling, punctuation and capital letters, fills in what\'s missing and finds repeated words. Nothing changes until you say yes.","words"],\n'
  '    ["🌱","Beginner mode","in <b>Settings</b>: more Spanish help, simpler examples and a slower voice. ¡Ideal para empezar!",null],\n'
  '    ["🌑","Midnight & a new friend","a pure black <b>Midnight</b> theme, and Kero the frog 🐸 joined the study buddies.",null]\n'
  '  ]},\n')
R('<script src="buddy.js?v=9" defer></script>', '<script src="buddy.js?v=10" defer></script>')
