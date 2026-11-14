# 17) Reading & comfort settings, soft theme, In short boxes, calm what's-new
import json as _json
R('<button class="theme-btn" id="themeBtn"',
  '<button id="csTimerChip" type="button" hidden aria-label="Study timer"></button>\n    <div class="cs-wrap" id="csWrap"></div>\n    <button class="theme-btn cs-hide-phone" id="themeBtn"')
R('const THEMES=["dark","light","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};',
  'const THEMES=["dark","light","soft","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["🌿","Soft","soft mode"],soft:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};')
R('let chosenTheme="dark";',
  'let chosenTheme="dark";\n'
  'window.csSetTheme=t=>{ chosenTheme=t; try{localStorage.setItem("ncs-theme",t);}catch(e){} document.documentElement.setAttribute("data-theme",t); paintThemeBtn(); if(t==="unicorn") toast("🦄 Unicorn mode!"); };')
R('else if(LS.get("ncs-seen-version","")!==CL_LATEST) setTimeout(openWN,500);',
  'else if(LS.get("ncs-seen-version","")!==CL_LATEST){\n'
  '  if(document.documentElement.classList.contains("cs-calm")){ const f=document.querySelector(\'footer [data-go="changelog"]\'); if(f) f.classList.add("cs-new"); }\n'
  '  else setTimeout(openWN,500);\n'
  '}\n'
  'document.addEventListener("click",e=>{ if(e.target.closest(\'[data-go="changelog"]\')){ LS.set("ncs-seen-version",CL_LATEST); document.querySelectorAll(".cs-new").forEach(x=>x.classList.remove("cs-new")); } });')
_IS = _json.load(open('parts/inshort.json'))
for _vid, _txt in _IS.items():
    _m = re.search(r'<section class="view" id="v-' + _vid + r'"[^>]*>.*?<p class="lede"[^>]*>.*?</p>', s, re.S)
    assert _m, _vid
    assert _m.end() < s.find('</section>', _m.start()), _vid
    s = s[:_m.end()] + '\n  <div class="in-short"><span class="is-tag">In short</span><div>' + _txt + '</div></div>' + s[_m.end():]
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-comfort", date:"October 30, 2026", title:"Make it comfortable for you ⚙️", items:[\n'
  '    ["⚙","Reading &amp; comfort settings","tap <b>Settings</b> at the top: bigger text, easier-to-read fonts, more space, bionic reading and a reading ruler.",null],\n'
  '    ["🎯","Focus mode &amp; study timer","hide everything except the page you\'re on, and time your study sessions with a gentle chime.",null],\n'
  '    ["🌿","Calm mode &amp; Soft look","no animations, softer colors and no pop-ups. Plus a new warm, low-contrast <b>Soft</b> theme.",null],\n'
  '    ["🔊","Listen &amp; In short","a 🔊 Listen button reads any page aloud, and grammar pages start with a one-line summary.","perfect"]\n'
  '  ]},\n')
# 18) every 🔊 button uses the sturdier speech from comfort.js
R('function say(text,btn){\n  if(!canSpeak) return;\n',
  'function say(text,btn){\n  if(!canSpeak) return;\n'
  '  if(window.csSpeak){ document.querySelectorAll(".say.playing").forEach(x=>x.classList.remove("playing")); if(btn) btn.classList.add("playing"); window.csSpeak(text,{rate:.85,onend:()=>{ if(btn) btn.classList.remove("playing"); }}); return; }\n')
