# 37) music: descriptions, order, piano + rain; A1 badge color; irregular verbs reward
R('''          <button type="button" class="chip" role="radio" data-mm="lofi">Lo-fi beats</button>
          <button type="button" class="chip" role="radio" data-mm="both">Lo-fi + rain</button>
          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>
          <button type="button" class="chip" role="radio" data-mm="piano">Calm piano</button>
          <button type="button" class="chip" role="radio" data-mm="brown">Brown noise</button>
          <button type="button" class="chip" role="radio" data-mm="pink">Pink noise</button>
          <button type="button" class="chip" role="radio" data-mm="white">White noise</button>''','''          <button type="button" class="chip" role="radio" data-mm="lofi">Lo-fi beats</button>
          <button type="button" class="chip" role="radio" data-mm="both">Lo-fi + rain</button>
          <button type="button" class="chip" role="radio" data-mm="piano">Calm piano</button>
          <button type="button" class="chip" role="radio" data-mm="pianorain">Piano + rain</button>
          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>
          <button type="button" class="chip" role="radio" data-mm="brown">Brown noise</button>
          <button type="button" class="chip" role="radio" data-mm="pink">Pink noise</button>
          <button type="button" class="chip" role="radio" data-mm="white">White noise</button>''')
R('''        <p class="music-note" id="mnBrown" hidden><b>Brown noise</b> is a deep, steady sound that blocks out distractions.</p>
        <p class="music-note" id="mnPink" hidden><b>Pink noise</b> is softer than white noise and sounds like steady rain or wind. Many people find it calming.</p>
        <p class="music-note" id="mnWhite" hidden><b>White noise</b> is a bright, even hiss, like a fan. Good for covering voices and sudden sounds.</p>''','''        <p class="music-note" id="mnDesc"></p>''')
R('if(mode==="piano"){\n      const pc=PIANO', 'if(mode==="piano"||mode==="pianorain"){\n      const pc=PIANO')
R('''    const mus= mode==="lofi"?1 : mode==="both"? Math.cos(b*Math.PI/2)*1.15 : 0;
    const rn= mode==="rain"?0.75 : mode==="both"? Math.sin(b*Math.PI/2)*0.75 : 0;''','''    const mix2= mode==="both"||mode==="pianorain";
    const mus= mode==="lofi"?1 : mode==="both"? Math.cos(b*Math.PI/2)*1.15 : 0;
    const rn= mode==="rain"?0.75 : mix2? Math.sin(b*Math.PI/2)*0.75 : 0;''')
R('pianoBus.gain.setTargetAtTime(mode==="piano"?1:0, t, 0.3);', 'pianoBus.gain.setTargetAtTime(mode==="piano"?1 : mode==="pianorain"? Math.cos(b*Math.PI/2)*1.1 : 0, t, 0.3);')
R('''    balRow.hidden= mode!=="both";
    document.getElementById("mnBrown").hidden= mode!=="brown";
    document.getElementById("mnPink").hidden= mode!=="pink";
    document.getElementById("mnWhite").hidden= mode!=="white";''','''    balRow.hidden= !(mode==="both"||mode==="pianorain");
    const MDESC={lofi:"<b>Lo-fi beats</b>: relaxed hip-hop beats with soft keys. A classic for studying.",
      both:"<b>Lo-fi + rain</b>: lo-fi beats with rain in the background. Use <b>Mix</b> to choose how much of each.",
      piano:"<b>Calm piano</b>: slow, gentle piano chords. Good when you need to focus or relax.",
      pianorain:"<b>Piano + rain</b>: calm piano with soft rain. Use <b>Mix</b> to choose how much of each.",
      rain:"<b>Just rain</b>: steady rain, no music. Nice for reading.",
      brown:"<b>Brown noise</b>: a deep, steady sound that blocks out distractions.",
      pink:"<b>Pink noise</b>: softer than white noise, like steady rain or wind. Many people find it calming.",
      white:"<b>White noise</b>: a bright, even hiss, like a fan. Good for covering voices and sudden sounds."};
    document.getElementById("mnDesc").innerHTML= MDESC[mode]||"";''')
TODAY_CSS += '''
html.cs-beginner .nav-lvl.lvl-a1{background:#2E9A62}
'''
# irregular verbs: every 10 right answers counts as a practice round
R("  if(a&&b){ qRight++; qStreak++;", "  if(a&&b){ qRight++; qStreak++; if(qRight%10===0){ document.dispatchEvent(new CustomEvent(\"cs-modround\",{detail:{score:10,perfect:false,finished:false,irr:true}})); document.dispatchEvent(new CustomEvent(\"cs-irrround\")); }")
R('document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bumpWeek(); });', 'document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bumpWeek(); }); document.addEventListener("cs-irrround",bumpWeek);')
R('<script src="buddy.js?v=13" defer></script>', '<script src="buddy.js?v=14" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-testout", date:"November 5, 2026", title:"Test out, buddy sounds, piano + rain and more 🎓", items:[\n'
  '    ["🎹","Piano + rain","a new <b>Music</b> option: calm piano with soft rain, with a slider to mix them. Every sound now has a short description too.","music"],\n'
  '    ["🐾","Pet your buddy","your buddy now has a <b>Pet</b> button next to <b>Feed</b>."],\n'
  '    ["🔁","Irregular verbs count","every 10 right answers in <b>Irregular verbs</b> now counts as a practice round for your buddy and your weekly goal.","quiz"],\n'
  '    ["✨","New default names","the cat, llama, unicorn, chicken, pudú, capybara and axolotl now have names. If you already named yours, it keeps its name."],\n'
  '    ["🎓","Test out of the past simple","already good at it? Take the 15-question <b>test out</b> exam on the Past simple page. Get all 15 right and the whole module is done.","quiz"],\n'
  '    ["🔊","Buddy sounds","sometimes buddies make a little sound when you tap them, in your corner and in the park. You can turn it off in the buddy window."],\n'
  '    ["📊","Your stats","tap your name at the top right to see your words, study days, practice time and more."]\n'
  '  ]},\n')

R('<p class="auth-status" id="authStatus"></p>', '<p class="auth-status" id="authStatus"></p>\n        <div class="auth-stats" id="authStats"></div>')
R('/* ---------------- import words', open('parts/stats.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
.auth-stats{border-top:1px solid var(--line);margin-top:8px;padding-top:8px}
.auth-stats h4{margin:0 0 6px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.as-row{display:flex;justify-content:space-between;gap:12px;padding:3px 0;font-size:14px}
.as-row span{color:var(--muted)}
.as-row b{text-align:right}
.as-row small{display:block;font-weight:400;font-size:11px;color:var(--muted)}
.ps-to{display:flex;align-items:center;gap:14px;justify-content:space-between;max-width:680px;margin-bottom:14px;border-color:#8E5CD9}
.ps-to>div,.ps-to.done{display:flex;flex-direction:column;gap:4px}
.ps-to span{color:var(--muted);font-size:14px}
.ps-to .esb{color:var(--muted)}
.ps-to.done{border-color:var(--green)}
.ps-miss{text-align:left;margin:12px 0}
.ps-miss ul{padding-left:20px;margin:6px 0}
.ps-miss li{margin:8px 0}
@media (max-width:560px){.ps-to{flex-direction:column;align-items:stretch}}
'''
