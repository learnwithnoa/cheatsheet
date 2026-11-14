# 29) app install, words to review today, say it out loud, kudos from Noa
R('''      <div class="tt-row"><button class="tt-love" type="button" id="ttLove" aria-pressed="false"><span class="tt-ico" aria-hidden="true">✨</span><span id="ttLoveTxt">Send love</span></button></div>
    </div>
  </div>
''', '''      <div class="tt-row"><button class="tt-love" type="button" id="ttLove" aria-pressed="false"><span class="tt-ico" aria-hidden="true">✨</span><span id="ttLoveTxt">Send love</span></button></div>
    </div>
  </div>
  <div class="card rv-card" id="rvBox" hidden>
    <div class="td-top"><span class="tag td-tag">🔁 Words to review today</span></div>
    <p class="muted" style="margin:6px 0 10px;font-size:14px">5 of your words that need a little love today. Tap a word to see what it means.</p>
    <div class="rv-list" id="rvList"></div>
    <div class="note-actions" style="margin-top:10px"><button class="pill-btn pill-green" type="button" id="rvGo">Practice these 5 →</button></div>
  </div>
''')
# today's 5 as a flashcard set
R('<button type="button" data-fcset="all">All</button>', '<button type="button" data-fcset="all">All</button><button type="button" data-fcset="today">Today&#39;s 5</button>')
R('''  if(fcSet==="new20")''', '''  if(fcSet==="today"){ const t=new Set(todays5()); return l.filter(x=>t.has(x.id)); }
  if(fcSet==="new20")''')
# say it out loud card
R('''    <div class="sn-out" id="snOut" hidden aria-live="polite"></div>
  </div>
''', '''    <div class="sn-out" id="snOut" hidden aria-live="polite"></div>
  </div>
  <h2>Say it out loud</h2>
  <p>Practice your pronunciation: say one of your words (or its example sentence) and see if the computer understands you.</p>
  <div class="card sn-card" id="spCard" style="max-width:560px">
    <div class="quiz-top"><span class="tag">🎤 Say this</span><button class="swap" type="button" id="spNext">Another word →</button></div>
    <div class="sn-word"><b id="spTarget"></b><span id="spMean"></span></div>
    <div class="note-actions"><button class="sp-mic" type="button" id="spMic">🎤 <span>Tap and say it</span></button><button class="swap" type="button" id="spHear">🔊 Listen</button><button class="swap" type="button" id="spMode" hidden>Say the example sentence</button></div>
    <p class="muted" id="spNo" hidden style="font-size:14px;margin:8px 0 0">Your browser can't listen to you. Try Chrome, Edge or Safari.</p>
    <div class="sn-out" id="spOut" hidden aria-live="polite"></div>
  </div>
''')
R('<button class="foot-link" type="button" data-go="feedback">Something missing or broken? Tell Noa</button></div>',
  '<button class="foot-link" type="button" data-go="feedback">Something missing or broken? Tell Noa</button><button class="foot-link" type="button" data-install>📲 Install the app</button><button class="foot-link" type="button" id="kdLink" hidden>💌 Messages from Noa</button></div>')
R('/* ---------------- import words', open('parts/extras.js').read() + '\n/* ---------------- import words')
TODAY_CSS += '''
.rv-card{margin:14px 0 4px}
.rv-list{display:flex;flex-wrap:wrap;gap:8px}
.rv-chip{all:unset;box-sizing:border-box;cursor:pointer;border:1.5px solid var(--line);background:var(--surface-2);border-radius:14px;padding:8px 12px;display:flex;flex-direction:column;gap:2px;min-width:110px}
.rv-chip:hover{border-color:var(--green)}
.rv-chip:focus-visible{outline:3px solid var(--bright)}
.rv-w{font-weight:800}
.rv-m{font-size:13.5px;color:var(--green);font-weight:700;display:none}
.rv-chip[aria-expanded="true"] .rv-m{display:block}
.rv-tag{font:700 9.5px var(--mono);text-transform:uppercase;letter-spacing:.06em;color:#E5533D}
.sp-mic{font:800 15px var(--body);color:#fff;background:linear-gradient(180deg,#4FD18B 0%,#1F9D5C 60%,#167A47 100%);border:0;border-radius:999px;padding:10px 18px;cursor:pointer}
.sp-mic.on{background:linear-gradient(180deg,#F2716B,#C9372C);animation:spPulse 1.2s ease-in-out infinite}
@keyframes spPulse{50%{box-shadow:0 0 0 8px color-mix(in srgb,#E5533D 25%,transparent)}}
.sp-mic:disabled{opacity:.5;cursor:not-allowed}
.cs-dlg-bd{position:fixed;inset:0;background:rgba(10,14,30,.5);z-index:70}
.cs-dlg{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:71;width:min(440px,calc(100vw - 28px));max-height:calc(100dvh - 40px);overflow:auto;padding:20px 20px 18px}
.cs-dlg-x{position:absolute;top:10px;right:10px}
.cs-dlg ol{padding-left:22px}.cs-dlg li{margin:6px 0}
.kd{text-align:center;overflow:hidden}
.kd-top{font:800 21px var(--display);margin:6px 0 10px}
.kd-text{font-size:17px;line-height:1.5;margin:0}
.kd-date{font-size:12.5px;color:var(--muted);margin-top:8px}
.kd-item{border-top:1px dashed var(--line);padding:10px 0;text-align:left}
.kd-conf{position:absolute;top:-10px;font-size:20px;pointer-events:none;animation:kdFall 2.4s ease-in forwards}
@keyframes kdFall{to{transform:translateY(300px) rotate(var(--r));opacity:0}}
.nb-err{background:color-mix(in srgb,#E5533D 12%,var(--surface));border-radius:10px;padding:8px 12px;font-size:14px;margin:6px 0}
'''
R('["✍️","Use it in a sentence","in <b>Practice</b>, write a sentence with one of your words and get quick, friendly feedback.","quiz"]',
  '["✍️","Use it in a sentence","in <b>Practice</b>, write a sentence with one of your words and get quick, friendly feedback.","quiz"]')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-app", date:"November 2, 2026", title:"Practice more, and get the app 📲", items:[\n'
  '    ["🔁","Words to review today","a new card on your Home page with 5 of your words that need practice. Tap <b>Practice these 5</b>.","notes"],\n'
  '    ["🎤","Say it out loud","in <b>Practice</b>, say one of your words and see if the computer understands you.","quiz"],\n'
  '    ["📲","Install the app","put the Cheat Sheet on your phone\'s home screen: tap <b>📲 Install the app</b> at the bottom of the page.",null],\n'
  '    ["💌","Messages from Noa","Noa can now send you a little message right here in the Cheat Sheet.",null]\n'
  '  ]},\n')
R('<script src="buddy.js?v=8" defer></script>', '<script src="buddy.js?v=9" defer></script>')
