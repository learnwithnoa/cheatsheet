# step108: My coaching hierarchy: next class (+ pack at a glance) → last class → Noa recommends → recent guides/recaps → recordings → resources (+ Drive) → journey stats
# each box its own color; "latest" guides/recaps only when they're from the last 30 days (all of them stay in the tabs below)
R('''${esc(lastHw)}</div>`:""}</div>''','''${esc(lastHw)}</div>`:""}${packLine}</div>''')
R('''    const top=`<div class="ch-top">''','''    const packLine=cur&&cur.size?`<div class="ch-pkmini"><span>💳 <b>${left}</b> ${esc(cur.unit)} left</span><span>≈ <b>${Math.floor(left/per)}</b> ${Math.floor(left/per)===1?"class":"classes"} left</span>${cur.deadline?`<span>pack ends <b>${fs(cur.deadline)}</b></span>`:""}</div>`:"";
    const top=`<div class="ch-top">''')
# the pack numbers moved up into "Next class"; the stats row is now just the journey
R('''      <div class="ch-tint ch-g ch-stat"><b>${left}</b><span>${cur.unit} left</span></div>
      <div class="ch-tint ch-a ch-stat"><b>${Math.floor(left/per)}</b><span>${Math.floor(left/per)===1?"class":"classes"} left (about)</span></div>
      ${cur.deadline?`<div class="ch-tint ch-p ch-stat"><b>${fs(cur.deadline)}</b><span>your pack ends</span></div>`:""}
''','')
# last class: green, and "Save all" sits with the words
R('''<div class="ch-recap ch-tint ch-s" id="chRecap">''','''<div class="ch-recap ch-tint ch-g" id="chRecap">''')
R('''${voc.length&&unsaved?`<button type="button" class="ch-go" data-rcall="1">＋ Save all ${unsaved} ${unsaved===1?"word":"words"}</button>`:""}</div>''','''</div>''')
R('''<h4>✨ New words <span class="muted">(${voc.length})</span>${voc.length>2?'<span class="ch-rc-hint">scroll →</span>':""}</h4>''',
'''<h4>✨ New words <span class="muted">(${voc.length})</span>${unsaved?`<button type="button" class="ch-go ch-rc-all" data-rcall="1">＋ Save all ${unsaved} to My words</button>`:""}${voc.length>2?'<span class="ch-rc-hint">scroll →</span>':""}</h4>''')
# recordings: violet; the Drive folder moves to the resources box
R('''const zBox=zr.length||v.folder?`<div class="ch-res ch-tint ch-s" id="chZrecs">''','''const zBox=zr.length?`<div class="ch-res ch-tint ch-v" id="chZrecs">''')
R('''${v.folder?`<p style="margin:10px 0 0"><a class="ch-go" href="https://drive.google.com/drive/folders/${esc(v.folder)}" target="_blank" rel="noopener">📁 Your Drive folder ↗</a></p>`:""}</div>`:"";''','''</div>`:"";''')
R('''const resBox=res.length?`<div class="ch-res ch-tint ch-a"><div class="ch-k">🧰 Class resources</div><p class="muted" style="margin:2px 0 8px;font-size:13.5px">The websites we use in class. Tap one to open it.</p><div class="ch-resl">''',
'''const resBox=res.length||v.folder?`<div class="ch-res ch-tint ch-n"><div class="ch-k">🧰 Class resources</div><p class="muted" style="margin:2px 0 8px;font-size:13.5px">${res.length?"The websites we use in class, and your own folder. Tap one to open it.":"Your own folder with Noa."}</p><div class="ch-resl">${v.folder?`<a class="ch-resb" href="https://drive.google.com/drive/folders/${esc(v.folder)}" target="_blank" rel="noopener"><span class="i">📁</span><span><b>Your Drive folder</b><small>Files and materials from your classes</small></span></a>`:""}''')
# guides / recaps box: only recent ones up here (pink, so it isn't another amber box)
R('''const guideBox=gAll.length?`<div class="ch-gbox ch-tint ch-a"><div class="ch-gcols">''','''const RECENT=g=>!!g.date&&Date.now()-Date.parse(g.date+"T12:00")<30*864e5, gS2=gStudy.filter(RECENT), gR2=gRecap.filter(RECENT);
    const guideBox=gS2.length||gR2.length?`<div class="ch-gbox ch-tint ch-p"><div class="ch-gcols">''')
R('''${gStudy.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="guides"''','''${gS2.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="guides"''')
R('''<div class="ch-glist">${gRow(gStudy,"📄")}</div>''','''<div class="ch-glist">${gRow(gS2,"📄")}</div>''')
R('''${gRecap.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="recaps"''','''${gR2.length?`<div><button type="button" class="ch-k ch-khead" data-ctgo="recaps"''')
R('''<div class="ch-glist">${gRow(gRecap,"📼")}</div>''','''<div class="ch-glist">${gRow(gR2,"📼")}</div>''')
R('''box.innerHTML=newsBox+top+mapBox+recapBox+zBox+tipsBox+guideBox+resBox+stats+''','''box.innerHTML=newsBox+top+mapBox+recapBox+tipsBox+guideBox+zBox+resBox+stats+''')
_i=s.index('</style>'); s=s[:_i]+'''
/* step108: My coaching hierarchy */
.ch-n{--k:var(--muted)}
.ch-pkmini{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;padding-top:10px;border-top:1px dashed color-mix(in srgb,var(--k) 35%,transparent);font-size:13.5px;color:var(--muted)}
.ch-pkmini b{color:var(--ink)}
.ch-rc-wbox h4{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.ch-rc-wbox h4 .ch-rc-hint{margin-left:auto}
.ch-rc-all{font-size:12.5px;padding:4px 11px}
'''+s[_i:]
s=s.replace('''.ch-n{--k:var(--muted)}''','''.ch-n{--k:var(--muted)}
.ch-res.ch-tint.ch-n{background:var(--surface-2,rgba(255,255,255,.04))!important;border-color:var(--line)!important}''',1)
R('''    ["☁️","Your progress always follows you",''','''    ["🎓","My coaching, tidier","your next class now shows how much is left in your pack, your last class has the <b>Save all</b> button right next to its new words, and each box has its own color so it's easier to find things.","coaching"],
    ["☁️","Your progress always follows you",''')
