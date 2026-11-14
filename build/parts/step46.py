# 46) welcome order, My words buttons, WordReference always, feedback link, Job interviews, icon, footer order
# welcome: buddy only appears in its own step
R('''      <li><span class="wl-ico" aria-hidden="true">✨</span><div><b>Words grow your buddy,</b> too: more words unlock clothes and colors, and words you learn unlock toys.</div></li>
''', '')
# My words: the add-a-word panel first, the tools under it
_i = s.index('<section class="view" id="v-words" hidden>')
_a = s.index('  <div class="note-actions" style="margin-bottom:14px"><button class="pill-btn pill-green" type="button" id="impOpen"', _i)
_b = s.index('</div>\n', _a) + 7
_tools = s[_a:_b]
s = s[:_a] + s[_b:]
_slot = '  <div id="slotAwPage" class="page-slot"></div>\n'
_k = s.index(_slot, _i)
s = s[:_k] + _slot + _tools.replace('style="margin-bottom:14px"', 'style="margin:4px 0 14px"') + s[_k + len(_slot):]
# translator: WordReference for words and phrases
R('''  const single=/^[\\p{L}'-]+$/u.test(t);
  lnkW.hidden=!single;
  if(single) lnkW.href = sl==="es" ? "https://www.wordreference.com/es/en/translation.asp?spen="+encodeURIComponent(t) : "https://www.wordreference.com/es/translation.asp?tranword="+encodeURIComponent(t);''',
  '''  lnkW.hidden=false;
  lnkW.href = !t ? (sl==="es" ? "https://www.wordreference.com/es/en/" : "https://www.wordreference.com/es/") : sl==="es" ? "https://www.wordreference.com/es/en/translation.asp?spen="+encodeURIComponent(t) : "https://www.wordreference.com/es/translation.asp?tranword="+encodeURIComponent(t);''')
R('<a class="linkbtn" id="lnkWR" href="https://www.wordreference.com/" target="_blank" rel="noopener" hidden>WordReference ↗</a>', '<a class="linkbtn" id="lnkWR" href="https://www.wordreference.com/" target="_blank" rel="noopener">WordReference ↗</a>')
# feedback: keep the link at the bottom of every page, drop the menu copy
R('''    <div class="navgroup ng-help"><h4>Help</h4>
      <button class="navbtn fb-nav" data-go="feedback">Send feedback</button>
    </div>
''', '')
# Work: a second page
R('''      <button class="navbtn" data-go="email">Emails &amp; meetings</button>''', '''      <button class="navbtn" data-go="email">Emails &amp; meetings</button>
      <button class="navbtn" data-go="interview">Job interviews</button>''')
R('<!-- ============ QUIZ ============ -->', '''<!-- ============ JOB INTERVIEWS ============ -->
<section class="view" id="v-interview" hidden>
  <h1>Job <em>interviews</em></h1>
  <p class="lede">The questions you'll almost always hear, how to start your answers, and phrases that give you a few seconds to think.</p>
  <div class="in-short"><span class="is-tag">In short</span><div><b>Answer</b> the question, give <b>one real example</b>, and <b>connect it</b> to the job. Short and specific beats long and perfect.</div></div>
  <h2>The classic questions</h2>
  <div class="grid">
    <div class="card"><h3>Tell me about yourself.</h3><ul class="clean"><li>I'm a… with five years of experience in…</li><li>Right now, I work at… where I…</li><li>I'm especially good at…</li><li>That's why this role caught my attention.</li></ul></div>
    <div class="card"><h3>Why do you want this job?</h3><ul class="clean"><li>I've followed your company for a while, and…</li><li>This role is a great fit for my experience in…</li><li>I'm looking for a place where I can…</li></ul></div>
    <div class="card"><h3>What are your strengths?</h3><ul class="clean"><li>I'm very organized. For example, …</li><li>People often tell me I'm good at…</li><li>One of my strengths is…</li></ul></div>
    <div class="card"><h3>What's your biggest weakness?</h3><ul class="clean"><li>I used to…, but now I…</li><li>I'm working on… by…</li><li>Sometimes I…, so I've started to…</li></ul></div>
    <div class="card"><h3>Where do you see yourself in five years?</h3><ul class="clean"><li>I'd like to grow into a role where I…</li><li>I see myself leading…</li><li>I want to keep learning about…</li></ul></div>
    <div class="card"><h3>Why should we hire you?</h3><ul class="clean"><li>I have the experience you need in…</li><li>I can bring…</li><li>I've already done this kind of work at…</li></ul></div>
  </div>
  <h2>Tell a story: the STAR method</h2>
  <p class="lede">For "Tell me about a time when…" questions. Use the <b>past simple</b> for the story.</p>
  <div class="grid">
    <div class="card"><h3>S · Situation</h3><ul class="clean"><li>At my last job, we had a problem with…</li><li>A few months ago, …</li></ul></div>
    <div class="card"><h3>T · Task</h3><ul class="clean"><li>My job was to…</li><li>I needed to…</li></ul></div>
    <div class="card"><h3>A · Action</h3><ul class="clean"><li>First, I… Then, I…</li><li>I decided to…</li><li>I talked to… and we…</li></ul></div>
    <div class="card"><h3>R · Result</h3><ul class="clean"><li>In the end, we…</li><li>As a result, sales went up 20%.</li><li>I learned that…</li></ul></div>
  </div>
  <h2>Talk about your experience</h2>
  <div class="grid">
    <div class="card"><h3>Until now</h3><ul class="clean"><li>I've worked in sales for six years.</li><li>I've been at my company since 2021.</li><li>I've led teams of up to ten people.</li></ul></div>
    <div class="card"><h3>In the past</h3><ul class="clean"><li>I was responsible for…</li><li>I managed a budget of…</li><li>I worked closely with…</li></ul></div>
  </div>
  <h2>Buy some time</h2>
  <div class="grid">
    <div class="card"><h3>Think</h3><ul class="clean"><li>That's a great question.</li><li>Let me think about that for a second.</li><li>Good question. Let me give you an example.</li></ul></div>
    <div class="card"><h3>Check</h3><ul class="clean"><li>Sorry, could you repeat the question?</li><li>Do you mean…?</li><li>Just to make sure I understand, …</li></ul></div>
  </div>
  <h2>Your questions for them</h2>
  <div class="grid">
    <div class="card"><h3>Ask</h3><ul class="clean"><li>What does a typical day look like in this role?</li><li>How do you measure success in this position?</li><li>What are the next steps in the process?</li></ul></div>
    <div class="card"><h3>Finish</h3><ul class="clean"><li>Thank you for your time.</li><li>I really enjoyed our conversation.</li><li>I look forward to hearing from you.</li></ul></div>
  </div>
  <div class="note warn dismissible"><span class="no">I work here since 2021</span> → <span class="ok">I've worked here since 2021</span>. And <span class="no">I'm agree</span> → <span class="ok">I agree</span>. Two classics in interviews!</div>
</section>

<!-- ============ QUIZ ============ -->''')
# translator icon centered in its box
TODAY_CSS += '''
nav.side .tr-ico{display:inline-flex;align-items:center;justify-content:center;height:18px;box-sizing:border-box;line-height:1;padding:0 0 2px;font-size:12px}
.park-b .pinfo .pb-feed{display:inline-block;margin-top:6px;padding:3px 10px;border-radius:99px;background:var(--green);color:#fff;font-weight:800;cursor:pointer;pointer-events:auto}
.park-b .pinfo .pb-feed:focus-visible{outline:3px solid #fff}
'''
# footer: help first, extras in the middle, feedback last
R('''<div class="foot-row"><button class="foot-link" type="button" data-go="changelog">What's new</button><button class="foot-link" type="button" data-welcome>How this page works</button><button class="foot-link" type="button" id="restoreTips">Show all hidden tips again</button><button class="foot-link" type="button" data-go="backup">Back up or move your notes</button><button class="foot-link" type="button" data-go="feedback">Something missing or broken? Tell Noa</button><button class="foot-link" type="button" data-install>📲 Install the app</button><button class="foot-link" type="button" id="kdLink" hidden>💌 Messages from Noa</button></div>''',
  '''<div class="foot-row"><button class="foot-link" type="button" data-welcome>How this page works</button><button class="foot-link" type="button" data-go="changelog">What's new</button><button class="foot-link" type="button" id="kdLink" hidden>💌 Messages from Noa</button><button class="foot-link" type="button" data-install>📲 Install the app</button><button class="foot-link" type="button" data-go="backup">Back up or move your notes</button><button class="foot-link" type="button" id="restoreTips">Show all hidden tips again</button><button class="foot-link" type="button" data-go="feedback">Something missing or broken? Tell Noa</button></div>''')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-interviews", date:"November 6, 2026", title:"Job interviews and feeding friends 🍪", items:[\n'
  '    ["💼","Job interviews","a new page in <b>Work</b>: the classic questions, the STAR method, phrases to buy time and questions to ask.","interview"],\n'
  '    ["🍪","Feed other buddies","in the <b>Buddy park</b>, tap someone else\\u2019s buddy and give it one of your treats (once a day). It gives them +3 friendship.","park"],\n'
  '    ["🎨","More colors","every buddy now has 5 colors to unlock, with some new fun ones."],\n'
  '    ["🦄","Peek at Glitter","you can now preview the unicorn before you unlock her."]\n'
  '  ]},\n')
R('<script src="buddy.js?v=18" defer></script>', '<script src="buddy.js?v=21" defer></script>')
