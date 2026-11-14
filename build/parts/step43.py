# 43) new welcome tour: what's here, your level, My words, Practice, study buddy, make it yours
_wi = s.index('  <div class="wl-step" data-step="0">'); _wj = s.index('  <div class="wl-nav">', _wi)
_steps = '''  <div class="wl-step" data-step="0">
    <h2 id="wlTitle">Welcome to your <em>Cheat Sheet</em> 👋</h2>
    <p class="wl-lede">Your English companion from <b>Learn with Noa</b>. It does three jobs:</p>
    <ul class="wl-list">
      <li><span class="wl-ico" aria-hidden="true">📚</span><div><b>A quick reference while you speak.</b> Verb tenses, irregular verbs, grammar and phrases for when you're stuck, all short and clear. Keep it open next to Zoom during class.</div></li>
      <li><span class="wl-ico wl-green" aria-hidden="true">📝</span><div><b>Your own English notebook.</b> Save the new words and class notes that matter to <i>you</i>.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🎯</span><div><b>A place to practice.</b> Grammar step by step, vocabulary sets and flashcards with your own words.</div></li>
    </ul>
    <p class="esb">Tu compañero de inglés: referencia rápida, cuaderno personal y práctica.</p>
  </div>

  <div class="wl-step" data-step="1" hidden>
    <h2>Your <em>level</em> 🌱</h2>
    <p class="wl-lede">Do you want more help in Spanish? You can change this anytime in <b>Settings</b>.</p>
    <div class="wl-choice">
      <button class="wl-opt" type="button" data-wllevel="beginner"><b>🌱 Yes, please</b><span>I'm a beginner. Más ayuda en español, ejemplos más simples y una voz más lenta.</span></button>
      <button class="wl-opt" type="button" data-wllevel="normal"><b>🚀 I'm OK in English</b><span>Show me everything in English, with Spanish only where it helps.</span></button>
    </div>
  </div>

  <div class="wl-step" data-step="2" hidden>
    <h2><em>My words</em>: the heart of it 💛</h2>
    <p class="wl-lede">The words you save are the most important part of the Cheat Sheet. Everything else builds on them.</p>
    <ul class="wl-list">
      <li><span class="wl-ico wl-green" aria-hidden="true">+</span><div><b>Save every new word</b> from class with the green <b>+ word</b> button. It's on every page. You don't even need the translation: it's added for you.</div></li>
      <li><span class="wl-ico" aria-hidden="true">📋</span><div><b>Got a list?</b> Paste it in <b>My words</b> and it's organized for you, with meanings and examples.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🃏</span><div><b>Practice them with flashcards.</b> The ones you miss come back sooner, so you spend your time on the hard ones.</div></li>
      <li><span class="wl-ico" aria-hidden="true">✨</span><div><b>Words grow your buddy,</b> too: more words unlock clothes and colors, and words you learn unlock toys.</div></li>
    </ul>
  </div>

  <div class="wl-step" data-step="3" hidden>
    <h2>Time to <em>practice</em> 🎯</h2>
    <p class="wl-lede">Open <b>Practice</b> in the menu. You'll find three parts:</p>
    <ul class="wl-list">
      <li><span class="wl-ico" aria-hidden="true">🧩</span><div><b>Grammar:</b> modules like the <b>past simple</b> and the <b>present perfect</b>, in stages from easy to harder. Get 7/10 to open the next stage and earn up to ⭐⭐⭐. Already good at it? Take the <b>test out</b> exam.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🗂️</span><div><b>Vocabulary:</b> useful word sets by Noa (phrasal verbs, work, travel, everyday expressions), with flashcards and a quiz.</div></li>
      <li><span class="wl-ico wl-green" aria-hidden="true">📚</span><div><b>Your words:</b> flashcards, writing sentences and saying words out loud.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🎯</span><div><b>Weekly goal:</b> 3 practice rounds a week. Questions you miss go to <b>My mistakes</b> so you can try them again.</div></li>
    </ul>
  </div>

  <div class="wl-step" data-step="4" hidden>
    <h2>Your <em>study buddy</em> 🐾</h2>
    <p class="wl-lede">A little friend in the corner of the screen that grows as you study.</p>
    <ul class="wl-list">
      <li><span class="wl-ico" aria-hidden="true">🍪</span><div><b>Earn treats by studying:</b> saving words, flashcard rounds, grammar rounds, writing sentences and more. Then <b>feed</b> your buddy (up to 5 a day).</div></li>
      <li><span class="wl-ico" aria-hidden="true">💛</span><div><b>Friendship levels:</b> feeding, petting and visiting raise its level. Each level unlocks a new trick, and in the <b>Buddy park</b> it starts to glow: silver, gold and rainbow.</div></li>
      <li><span class="wl-ico" aria-hidden="true">👕</span><div><b>Clothes, colors and toys</b> unlock as you save and learn words. Finish grammar modules for special magic toys.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🌳</span><div><b>Buddy park:</b> see everyone's buddies and send them love. It never gets sick or sad if you're away, it just naps.</div></li>
    </ul>
    <div class="note-actions wl-adopt" id="wlAdoptRow"><button class="pill-btn pill-green" type="button" data-wladopt>🐾 Choose my buddy</button></div>
  </div>

  <div class="wl-step" data-step="5" hidden>
    <h2>Make it <em>yours</em> ⚙️</h2>
    <ul class="wl-list">
      <li class="when-in"><span class="wl-ico wl-green" aria-hidden="true">☁</span><div><b>You're signed in.</b> Your words, notes, progress and buddy save to your Google account and follow you to every device.</div></li>
      <li><span class="wl-ico" aria-hidden="true">⚙</span><div><b>Settings</b> (top right): themes, bigger text, easier fonts, bionic reading, calm mode, a study timer and more.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🎵</span><div><b>Music:</b> lo-fi, piano, rain or calm noise while you study.</div></li>
      <li><span class="wl-ico" aria-hidden="true">📲</span><div><b>Install it</b> on your phone like an app, and press <kbd>/</kbd> on a computer to search everything.</div></li>
      <li><span class="wl-ico" aria-hidden="true">💬</span><div><b>Something missing?</b> Use “Tell Noa” at the bottom of any page.</div></li>
    </ul>
    <div class="wl-warn wl-sign when-out">
      <h3>Sign in so you never lose your notes</h3>
      <p>Until you sign in, your words and notes are only saved <b>in this browser, on this device</b>. <button class="foot-link" type="button" data-signin>Sign in with Google</button> and everything saves to your account, on your phone and computer.</p>
    </div>
  </div>

'''
s = s[:_wi] + _steps + s[_wj:]
R('<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>', '<div class="wl-dots" id="wlDots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>')
R('wl.addEventListener("keydown",e=>{ if(e.key==="ArrowRight"&&wlAt<3) wlShow(wlAt+1); if(e.key==="ArrowLeft"&&wlAt>0) wlShow(wlAt-1); });',
  '''wl.addEventListener("keydown",e=>{ const n=wl.querySelectorAll(".wl-step").length; if(e.key==="ArrowRight"&&wlAt<n-1) wlShow(wlAt+1); if(e.key==="ArrowLeft"&&wlAt>0) wlShow(wlAt-1); });
wl.addEventListener("click",e=>{
  const lv=e.target.closest("[data-wllevel]");
  if(lv){ wl.querySelectorAll("[data-wllevel]").forEach(b=>b.setAttribute("aria-pressed",String(b===lv))); try{ if(typeof csSetLevel==="function") csSetLevel(lv.dataset.wllevel==="beginner"); }catch(er){} setTimeout(()=>wlShow(wlAt+1),350); return; }
  if(e.target.closest("[data-wladopt]")){ closeWelcome(); setTimeout(()=>{ if(window.csBuddy) window.csBuddy.open("adopt"); },200); }
});''')
R('function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0); }',
  '''function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0);
  const lvl=LS.get("ncs-level","normal"); wl.querySelectorAll("[data-wllevel]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.wllevel===(lvl==="beginner"?"beginner":"normal"))));
  const bd=LS.get("ncs-buddy",{})||{}; const ar=document.getElementById("wlAdoptRow"); if(ar) ar.hidden=bd.on===true; }''')
TODAY_CSS += '''
.wl-choice{display:grid;gap:10px;margin-top:12px}
.wl-opt{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:14px;border:2px solid var(--line);background:var(--surface-2)}
.wl-opt:hover{border-color:var(--bright)}
.wl-opt:focus-visible{outline:3px solid var(--bright);outline-offset:2px}
.wl-opt[aria-pressed="true"]{border-color:var(--green);background:var(--green-soft)}
.wl-opt span{color:var(--muted);font-size:14px}
.wl-adopt{margin-top:12px}
'''
