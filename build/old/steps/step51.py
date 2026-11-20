# 51) audit: tour refresh (steady buttons, classes step, buddy preview), no backup link in the footer, pick words for flashcards right in My words
# --- footer: the backup page stays reachable from old links, but isn't advertised anymore
R('<button class="foot-link" type="button" data-go="backup">Back up or move your notes</button>', '')
# --- My words: tick boxes are always there (no "Choose words" mode)
R('''  const pc=wSel&&e.target.closest("[data-pick]");
  if(pc){ const id=pc.dataset.pick;''', '''  const pc=e.target.closest("[data-wpick]");
  if(pc){ const id=pc.dataset.wpick;''')
R('let wSel=false, fcPick=', 'let wSel=true, fcPick=')
R('''const bar=document.getElementById("wSelBar"); bar.hidden=!wSel;''', '''const bar=document.getElementById("wSelBar"); bar.hidden=!fcPick.length;''')
R('''<button class="swap" type="button" id="wSelBtn" aria-pressed="false">Choose words</button>''', '''<button class="swap" type="button" id="wSelBtn" aria-pressed="false" hidden>Choose words</button>''')
R('''return '<article class="card wcard'+(wSel?' wsel':'')+(picked?' picked':'')+'"'+(wSel?' data-pick="'+x.id+'"':'')+'>'+(wSel?'<input type="checkbox" class="w-chk" aria-label="Choose '+esc(x.w)+'"'+(picked?' checked':'')+'>':sayBtn(x.w.replace(/\\(.*?\\)/g,"")))+''', '''return '<article class="card wcard'+(picked?' picked':'')+'">'+'<span class="w-lead">'+(x.sample?'':'<label class="w-chkw" title="Pick for flashcards"><input type="checkbox" class="w-chk" data-wpick="'+x.id+'" aria-label="Pick '+esc(x.w)+' for flashcards"'+(picked?' checked':'')+'></label>')+sayBtn(x.w.replace(/\\(.*?\\)/g,""))+'</span>'+''')
R('<button class="swap" type="button" id="wSelDone">Done</button>', '<button class="swap" type="button" id="wSelDone" hidden>Done</button>')
R('<button class="pill-btn pill-green" type="button" id="wSelGo">Practice these →</button>', '<button class="pill-btn pill-green" type="button" id="wSelGo">🃏 Practice these with flashcards →</button>')
css51 = '''
.w-lead{display:flex;flex-direction:column;align-items:center;gap:4px}.w-chkw{display:flex;align-items:flex-start;cursor:pointer;padding:2px}.wcard .w-chk{pointer-events:auto;cursor:pointer;margin:6px 4px 0 0}
.wcard.picked{border-color:color-mix(in srgb,var(--green) 55%,var(--line))}
.w-selbar{position:sticky;top:64px;z-index:5}
/* tour: same size on every step, so Next never jumps */
#welcome{display:flex;flex-direction:column;height:min(660px,calc(100vh - 40px));max-height:none}
#welcome .wl-step{flex:1 1 auto;min-height:0;overflow:auto;padding-right:4px}
#welcome .wl-nav{flex:none;margin-top:auto}
#wlNotes{display:none!important}
.wl-bdprev{display:flex;align-items:center;gap:14px;padding:10px 14px;border-radius:14px;background:color-mix(in srgb,#F5C842 10%,var(--surface));border:1px solid color-mix(in srgb,#F5C842 35%,var(--line))}
.wl-bdprev .wl-bdimg{position:relative;flex:none;width:88px;height:88px}.wl-bdprev .wl-bdimg svg{width:100%;height:100%;image-rendering:pixelated}
.wl-bdprev .wl-bdimg i{position:absolute;font-style:normal;color:#F5C842;animation:wlTw 1.6s ease-in-out infinite}.wl-bdprev .wl-bdimg i:nth-child(2){top:2px;left:4px}.wl-bdprev .wl-bdimg i:nth-child(3){top:18px;right:0;animation-delay:.5s}.wl-bdprev .wl-bdimg i:nth-child(4){bottom:8px;left:0;animation-delay:1s}
@keyframes wlTw{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1.1)}}
@media (prefers-reduced-motion:reduce){.wl-bdprev .wl-bdimg i{animation:none;opacity:.8}}
'''
_i = s.index('</style>'); s = s[:_i] + css51 + s[_i:]
# --- tour content
R('''      <li><span class="wl-ico" aria-hidden="true">🧩</span><div><b>Grammar:</b> modules like the <b>past simple</b> and the <b>present perfect</b>, in stages from easy to harder.''', '''      <li><span class="wl-ico" aria-hidden="true">🧩</span><div><b>Grammar:</b> modules like the <b>present simple</b>, <b>past simple</b> and <b>present perfect</b>, in stages from easy to harder.''')
R('''      <li><span class="wl-ico wl-green" aria-hidden="true">📚</span><div><b>Your words:</b> flashcards, writing sentences and saying words out loud.</div></li>''', '''      <li><span class="wl-ico" aria-hidden="true">🗣️</span><div><b>Pronunciation:</b> hear the difference and choose, starting with <b>-ed endings</b> (worked, played, wanted).</div></li>
      <li><span class="wl-ico wl-green" aria-hidden="true">📚</span><div><b>Your words:</b> flashcards, writing sentences and saying words out loud. Tick words in <b>My words</b> to practice just those.</div></li>''')
R('''  <div class="wl-step" data-step="4" hidden>
    <h2>Your <em>study buddy</em> 🐾</h2>
    <p class="wl-lede">A little friend in the corner of the screen that grows as you study.</p>''', '''  <div class="wl-step" data-step="4" hidden>
    <h2>Your <em>classes</em>, all in one place 🎓</h2>
    <p class="wl-lede">Depending on how you study with Noa, you'll see one or both of these in the menu:</p>
    <ul class="wl-list">
      <li><span class="wl-ico" aria-hidden="true">🎓</span><div><b>My coaching</b> (private classes): your class recaps with exercises Hibi checks for you, the new words from each class (save them with one tap), your progress reports and what Noa recommends you practice.</div></li>
      <li><span class="wl-ico" aria-hidden="true">💬</span><div><b>Noa's English Club</b>: this week's classes and Zoom links, the <b>Community</b> wall (photos, polls and ideas for classes), the <b>Library</b> with class recordings, class materials and the weekly podcast 🎧, a <b>Calendar</b>, and <b>Messages</b> to chat with other members.</div></li>
      <li><span class="wl-ico" aria-hidden="true">📸</span><div><b>Club Instagram group:</b> reminders and chats between classes. The button is always at the top of the Club page.</div></li>
    </ul>
  </div>

  <div class="wl-step" data-step="5" hidden>
    <h2>Your <em>study buddy</em> 🐾</h2>
    <div class="wl-bdprev"><div class="wl-bdimg" id="wlBdImg"><span></span><i>✦</i><i>✦</i><i>✦</i></div><div><b>Meet Miki</b>, Noa's buddy, with her crown and sparkles. Yours starts as an egg 🥚: <b>tap the egg in the bottom-right corner</b> of any page to hatch it.</div></div>''')
R('''      <li><span class="wl-ico" aria-hidden="true">🌳</span><div><b>Buddy park:</b> see everyone's buddies and send them love. It never gets sick or sad if you're away, it just naps.</div></li>''', '''      <li><span class="wl-ico" aria-hidden="true">✋</span><div><b>Move it anywhere:</b> drag your buddy around the screen, and tap it to pet it, feed it or dress it up.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🌳</span><div><b>Buddy park:</b> see everyone's buddies and send them love. It never gets sick or sad if you're away, it just naps.</div></li>
      <li><span class="wl-ico" aria-hidden="true">⚔️</span><div><b>Duels</b> (club members): challenge someone in the park to a friendly 7-day duel. Winners get treats and prizes, including clothes your buddy can wear.</div></li>''')
R('''  <div class="wl-step" data-step="5" hidden>
    <h2>Make it <em>yours</em> ⚙️</h2>''', '''  <div class="wl-step" data-step="6" hidden>
    <h2>Make it <em>yours</em> ⚙️</h2>''')
R('''      <li><span class="wl-ico" aria-hidden="true">⚙</span><div><b>Settings</b> (top right):''', '''      <li class="when-in"><span class="wl-ico" aria-hidden="true">🙂</span><div><b>Profile</b> (top right): pick your photo (your Google one or your own). The button turns <b>yellow</b> while it saves and <b>green</b> when everything is saved.</div></li>
      <li><span class="wl-ico" aria-hidden="true">⚙</span><div><b>Settings</b> (top right):''')
R('''<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>''', '''<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>''')
# Miki preview, drawn by the buddy script when the tour opens
R('''function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0);''', '''function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0);
  try{ const im=document.getElementById("wlBdImg"); if(im&&window.csBuddy&&window.csBuddy.of&&!im.dataset.done){ const svg=window.csBuddy.of({a:"miki",c:0,head:"crown"}); if(svg){ im.firstElementChild.outerHTML=svg; im.dataset.done="1"; } } }catch(e){}''')
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-dm", date:"November 10, 2026", title:"Messages, photos and more 💬", items:[
    ["💬","Messages","club members can now chat privately: open someone's profile (or tap their buddy in the park) and press <b>💬 Message</b>. Text, photos and GIFs.","club"],
    ["🙂","Your profile photo","tap <b>Profile</b> at the top right to use your Google photo or upload your own. It shows next to your posts and messages."],
    ["🎧","The club podcast","listen right on Hibi, at your speed, and save the episode's words with one tap (Club → Library)."],
    ["☑","Pick words faster","in <b>My words</b>, tick the words you want and practice just those with flashcards."]
  ]},''')
R('<script src="buddy.js?v=42" defer></script>', '<script src="buddy.js?v=43" defer></script>')
