# 19) welcome tour (4 steps) + Sepia replaces Soft
s, _n = re.subn(r'<section class="welcome card" id="welcome".*?</section>\n', lambda m: open('parts/welcome.html').read(), s, count=1, flags=re.S)
assert _n == 1
R('function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; setTimeout(()=>document.getElementById("wlOk").focus(),30); }',
  'let wlAt=0;\n'
  'function wlShow(i){ const steps=wl.querySelectorAll(".wl-step"); wlAt=Math.max(0,Math.min(steps.length-1,i));\n'
  '  steps.forEach((st,k)=>st.hidden=k!==wlAt); const last=wlAt===steps.length-1;\n'
  '  document.getElementById("wlCount").textContent=(wlAt+1)+" of "+steps.length;\n'
  '  document.querySelectorAll("#wlDots i").forEach((d,k)=>d.classList.toggle("on",k===wlAt));\n'
  '  document.getElementById("wlBack").hidden=wlAt===0; document.getElementById("wlNext").hidden=last;\n'
  '  document.getElementById("wlOk").hidden=!last; document.getElementById("wlNotes").hidden=!last;\n'
  '  wl.scrollTop=0; const h=steps[wlAt].querySelector("h2"); if(h){ h.setAttribute("tabindex","-1"); }\n'
  '  setTimeout(()=>document.getElementById(last?"wlOk":"wlNext").focus(),30); }\n'
  'function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0); }\n'
  'document.getElementById("wlNext").addEventListener("click",()=>wlShow(wlAt+1));\n'
  'document.getElementById("wlBack").addEventListener("click",()=>wlShow(wlAt-1));\n'
  'document.getElementById("wlSkip").addEventListener("click",()=>closeWelcome());\n'
  'wl.addEventListener("keydown",e=>{ if(e.key==="ArrowRight"&&wlAt<3) wlShow(wlAt+1); if(e.key==="ArrowLeft"&&wlAt>0) wlShow(wlAt-1); });')
# Sepia (Kindle-like) instead of Soft
R('@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]){',
  '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]):not([data-theme="sepia"]){')
R('const THEMES=["dark","light","soft","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["🌿","Soft","soft mode"],soft:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};',
  'const THEMES=["dark","light","sepia","unicorn"], TNEXT={dark:["☀","Light","light mode"],light:["📖","Sepia","sepia mode"],sepia:["🦄","Unicorn","unicorn mode"],unicorn:["☾","Dark","dark mode"]};')
R('try{chosenTheme=localStorage.getItem("ncs-theme")||"dark";}catch(e){}',
  'try{chosenTheme=localStorage.getItem("ncs-theme")||"dark"; if(chosenTheme==="soft") chosenTheme="sepia";}catch(e){}')
R('["🌿","Calm mode &amp; Soft look","no animations, softer colors and no pop-ups. Plus a new warm, low-contrast <b>Soft</b> theme.",null]',
  '["📖","Calm mode &amp; Sepia","no animations, softer colors and no pop-ups. Plus a new <b>Sepia</b> look, like reading on a Kindle.",null]')
TODAY_CSS += '''
.wl-top{display:flex;justify-content:space-between;align-items:center;margin:-6px -6px -4px 0}
.wl-count{font:700 11px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.wl-step{display:flex;flex-direction:column;gap:12px}
.wl-step h2:focus{outline:none}
.wl-tip{margin:0;font-size:14.5px;color:var(--muted)}
.wl-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;border-top:1px dashed var(--line);padding-top:12px}
.wl-dots{display:flex;gap:7px}
.wl-dots i{width:9px;height:9px;border-radius:50%;background:var(--line);display:block}
.wl-dots i.on{background:var(--royal);width:22px;border-radius:999px}
.wl-btns{margin-left:auto}
'''
R('<script>(function(){var t="dark";try{t=localStorage.getItem("ncs-theme")||"dark";}catch(e){}document.documentElement.setAttribute("data-theme",t);})();</script>',
  '<script>(function(){var t="dark";try{t=localStorage.getItem("ncs-theme")||"dark";if(t==="soft"){t="sepia";localStorage.setItem("ncs-theme",t);}}catch(e){}document.documentElement.setAttribute("data-theme",t);})();</script>')
# 20) Lexend is the default text font (Nunito becomes "Classic" in Settings)
R('family=Nunito:ital,wght@0,400;0,600;0,800;0,900;1,600','family=Lexend:wght@400;500;600;700;800;900')
R('--body:"Nunito",system-ui','--body:"Lexend",system-ui')
# 21) titles in Lexend too; header order: Music · Theme · Settings · Account
R('family=Sour+Gummy:wght@500;700&','')
s = s.replace('--display:"Sour Gummy","Nunito","Trebuchet MS",system-ui,sans-serif', '--display:"Lexend",system-ui,-apple-system,"Segoe UI",sans-serif', 1)
_a = s.index('    <div class="music-wrap auth-wrap">')
_b = s.index('    <div class="music-wrap">', _a)
_auth = s[_a:_b]; s = s[:_a] + s[_b:]
R('    <div class="cs-wrap" id="csWrap"></div>\n', '')
_t = s.index('<button class="theme-btn cs-hide-phone" id="themeBtn"')
_e = s.index('</button>', _t) + len('</button>\n')
s = s[:_e] + '    <div class="cs-wrap" id="csWrap"></div>\n' + _auth + s[_e:]
# 22) footer without the handle; Sentence basics moves to Start here; comfort files v5
R('<div>Cheat Sheet · by Learn with Noa · @learnwithnoa</div>', '<div>Cheat Sheet · by Learn with Noa</div>')
R('      <button class="navbtn" data-go="basics">Sentence basics</button>\n', '')
R('    <div class="navgroup"><h4>Start here</h4>\n', '    <div class="navgroup"><h4>Start here</h4>\n      <button class="navbtn" data-go="basics">Sentence basics</button>\n')
s = s.replace('comfort.css?v=4', 'comfort.css?v=6').replace('comfort.js?v=4', 'comfort.js?v=6')
exec(open('parts/step23.py').read())
exec(open('parts/step24.py').read())
exec(open('parts/step25.py').read())
exec(open('parts/step26.py').read())
exec(open('parts/step27.py').read())
exec(open('parts/step28.py').read())
exec(open('parts/step29.py').read())
exec(open('parts/step30.py').read())
exec(open('parts/step31.py').read())
exec(open('parts/step32.py').read())
exec(open('parts/step33.py').read())
exec(open('parts/step34.py').read())
exec(open('parts/step35.py').read())
exec(open('parts/step36.py').read())
exec(open('parts/step37.py').read())
exec(open('parts/step38.py').read())
exec(open('parts/step39.py').read())
exec(open('parts/step40.py').read())
exec(open('parts/step41.py').read())
exec(open('parts/step42.py').read())
exec(open('parts/step43.py').read())
exec(open('parts/step44.py').read())
exec(open('parts/step45.py').read())
exec(open('parts/step46.py').read())
exec(open('parts/step47.py').read())
exec(open('parts/step48.py').read())
exec(open('parts/step49.py').read())
exec(open('parts/step50.py').read())
exec(open('parts/step51.py').read())
exec(open('parts/step52.py').read())
exec(open('parts/step53.py').read())
exec(open('parts/step54.py').read())
exec(open('parts/step55.py').read())
exec(open('parts/step56.py').read())
exec(open('parts/step57.py').read())
exec(open('parts/step58.py').read())
exec(open('parts/step59.py').read())
exec(open('parts/step60.py').read())
exec(open('parts/step61.py').read())
exec(open('parts/step62.py').read())
exec(open('parts/step63.py').read())
exec(open('parts/step64.py').read())
exec(open('parts/step65.py').read())
exec(open('parts/step66.py').read())
exec(open('parts/step67.py').read())
exec(open('parts/step68.py').read())
exec(open('parts/step69.py').read())
exec(open('parts/step70.py').read())
exec(open('parts/step71.py').read())
exec(open('parts/step72.py').read())
exec(open('parts/step73.py').read())
exec(open('parts/step74.py').read())
exec(open('parts/step75.py').read())
exec(open('parts/step76.py').read())
exec(open('parts/step77.py').read())
exec(open('parts/step78.py').read())
exec(open('parts/step79.py').read())
exec(open('parts/step80.py').read())
exec(open('parts/step81.py').read())
exec(open('parts/step82.py').read())
exec(open("parts/step83.py").read())
exec(open("parts/step84.py").read())
exec(open("parts/step85.py").read())
exec(open("parts/step86.py").read())
exec(open("parts/step87.py").read())
exec(open("parts/step88.py").read())
exec(open("parts/step89.py").read())
exec(open("parts/step90.py").read())
exec(open("parts/step91.py").read())
exec(open("parts/step92.py").read())
exec(open("parts/step93.py").read())
exec(open("parts/step94.py").read())
exec(open("parts/step95.py").read())
exec(open("parts/step96.py").read())
exec(open("parts/step97.py").read())
exec(open("parts/step98.py").read())
exec(open("parts/step99.py").read())
exec(open("parts/step100.py").read())
exec(open("parts/step101.py").read())
exec(open("parts/step102.py").read())
exec(open("parts/step103.py").read())
exec(open("parts/step104.py").read())
exec(open("parts/step105.py").read())
exec(open("parts/step106.py").read())
exec(open("parts/step107.py").read())
exec(open("parts/step108.py").read())
exec(open("parts/step109.py").read())
exec(open("parts/step110.py").read())
exec(open("parts/step111.py").read())
exec(open("parts/step112.py").read())
exec(open("parts/step113.py").read())
exec(open("parts/step114.py").read())
exec(open("parts/step115.py").read())
exec(open("parts/step116.py").read())
exec(open("parts/step117.py").read())
exec(open("parts/step118.py").read())
exec(open("parts/step119.py").read())
