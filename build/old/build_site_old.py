import re, sys
src=open('english-pack.html').read()
s=src
def R(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:80]); s=s.replace(old,new)

# 0) the "moved" banner belongs only on the old Claude page
s,n=re.subn(r'  <div class="move-banner" id="moveBanner">.*?\n  </div>\n','',s,count=1,flags=re.S); assert n==1
s,n=re.subn(r'\(function\(\)\{\n  const NEW="https://learnwithnoa.github.io/cheatsheet/";.*?\n\}\)\(\);\n','',s,count=1,flags=re.S); assert n==1
s,n=re.subn(r'\.move-banner[^\n]*\n','',s,flags=re.S); assert n==2

# 1) storage hook for cloud sync
R('set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}}};',
  'set(k,v){try{localStorage.setItem(k,JSON.stringify(v));try{window.__csOnSet&&window.__csOnSet(k);}catch(_){}return true;}catch(e){return false;}}};')

# 2) remove Claude-only translator note
s,n=re.subn(r'  <div class="note tr-info dismissible">.*?</div>\n','',s,count=1,flags=re.S); assert n==1

# 3) storage messages: only when signed out; add signed-in versions + sign-in prompts
signin_btn='<button class="foot-link" type="button" data-signin>Sign in with Google</button> to save them in the cloud instead.'
R('''  <div class="store-info dismissible">
    <span class="store-ico" aria-hidden="true">!</span>
    <div><b>Your words and class notes are saved only in this browser, on this device.</b>''','''  <div class="sync-info when-in"><span class="sync-ico" aria-hidden="true">✓</span><div><b>Saved to your Google account.</b> Your words, class notes and starred sections sync automatically to any device where you sign in.</div></div>
  <div class="store-info dismissible when-out">
    <span class="store-ico" aria-hidden="true">!</span>
    <div>'''+signin_btn.replace(' to save them in the cloud instead.','')+''' to save everything in the cloud and see it on any device. Without signing in: <b>your words and class notes are saved only in this browser, on this device.</b>''')
R('''  <div class="store-info dismissible">
    <span class="store-ico" aria-hidden="true">!</span>
    <div><b>These notes are saved only in this browser, on this device.</b>''','''  <div class="sync-info when-in"><span class="sync-ico" aria-hidden="true">✓</span><div><b>Saved to your Google account.</b> Your class notes sync automatically to any device where you sign in.</div></div>
  <div class="store-info dismissible when-out">
    <span class="store-ico" aria-hidden="true">!</span>
    <div><b>These notes are saved only in this browser, on this device</b> ('''+signin_btn+''')''')
R('<p class="cn-warn dismissible">','<p class="cn-warn dismissible when-out">')
R('<div class="nudge" id="nudge" hidden>','<div class="nudge when-out" id="nudge" hidden>')
R('  <div class="wl-warn">','  <div class="wl-warn when-out">')
R('''  <ul class="wl-list">
''','''  <ul class="wl-list">
    <li><span class="wl-ico wl-green" aria-hidden="true">☁</span><div><b>Sign in with Google</b> (top right) so your words and notes save in the cloud and follow you to any device. <button class="foot-link" type="button" data-signin>Sign in now</button></div></li>
''')
R('''  <p class="lede">Your words, class notes and starred sections live only in this browser. Use this page to save a backup, or to move everything to another computer, browser or your phone.</p>''','''  <div class="sync-info when-in" style="margin-bottom:14px"><span class="sync-ico" aria-hidden="true">✓</span><div><b>You're signed in, so you don't need this page.</b> Everything already syncs to any device where you sign in with Google.</div></div>
  <p class="lede">Not signed in? Your words, class notes and starred sections live only in this browser. Use this page to save a backup, or to move everything to another computer, browser or your phone. Or just <button class="foot-link" type="button" data-signin>sign in with Google</button> and it all syncs on its own.</p>''')

R('<p class="lede">Your class notes and new words, all in one place. Copy your words somewhere safe once a week.</p>','<p class="lede">Your class notes and new words, all in one place.<span class="when-out"> Copy your words somewhere safe once a week.</span></p>')
# 3b) import notes moved from the old Claude page (#import=CODE)
s=s.replace("\nbkRender();\n", """
bkRender();
(function(){
  const h=location.hash||"";
  if(!h.startsWith("#import=")) return;
  let code=h.slice(8);
  for(let i=0;i<3 && /%[0-9A-Fa-f]{2}/.test(code);i++){ try{ code=decodeURIComponent(code); }catch(e){ break; } }
  code=code.replace(/ /g,"+");   // some apps turn + into spaces
  try{ history.replaceState(null,"",location.pathname); }catch(e){}
  try{ localStorage.removeItem("ncs-sync-uid"); }catch(e){}   // next sign-in merges instead of overwriting
  const inp=document.getElementById("bkIn"); inp.value=code;
  document.getElementById("bkRestore").click();
  const msg=document.getElementById("bkMsg").textContent;
  go("notes");
  setTimeout(()=>toast(msg.indexOf("Restored")>-1 ? "Your notes moved here! Sign in (top right) to save them in the cloud." : "Couldn't move your notes. Try the Back up & move page."),300);
})();
""",1)
# 4) header: account button
R('    <div class="music-wrap">','''    <div class="music-wrap auth-wrap">
      <button class="theme-btn auth-btn" id="authBtn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="authPanel"><span class="g-ico" id="authIco" aria-hidden="true">G</span><span class="theme-txt" id="authTxt">Sign in</span></button>
      <div class="music-panel card auth-panel" id="authPanel" role="dialog" aria-label="Your account" hidden>
        <div class="qa-top"><h3>Your profile</h3><button class="qa-x" type="button" id="authClose" aria-label="Close">×</button></div>
        <p class="auth-who" id="authWho"></p>
        <p class="auth-status" id="authStatus"></p>
        <p class="music-note">Your words, class notes, stars and flashcard progress save to your Google account automatically. Sign in with the same account on your phone or another computer to see them there.</p>
        <div id="authOutBox"><button class="swap" type="button" id="authOut">Sign out</button></div>
        <div class="confirm-bar" id="authOutConfirm" hidden><p><b>Sign out?</b> Your notes stay safe in your Google account. They'll be removed from this device until you sign in again.</p><div class="note-actions"><button class="pill-btn" type="button" id="authOutYes">Sign out</button><button class="swap" type="button" id="authOutNo">Cancel</button></div></div>
      </div>
    </div>
    <div class="music-wrap">''')

# 5) changelog entry for the move
R('''const CHANGELOG=[
''','''const CHANGELOG=[
  {id:"2026-cloud", date:"October 29, 2026", title:"Your notes, now in the cloud ☁️", items:[
    ["☁️","Sign in with Google","tap <b>Sign in</b> at the top right and your words, class notes, stars and flashcard progress save to your Google account.",null],
    ["📱","On every device","sign in on your phone or another computer and everything is there. No more copying or backup codes.",null],
    ["📦","Nothing lost","the first time you sign in, everything already saved in this browser moves to your account.",null]
  ]},
''')

# 6) cloud-first wording everywhere (Oct 28 2026)
SI='<button class="foot-link" type="button" data-signin>Sign in with Google</button>'
s,n=re.subn(r'  <div class="wl-warn when-out">.*?\n  </div>\n','''  <div class="wl-warn wl-sign when-out">
    <h3>Sign in so you never lose your notes</h3>
    <p>You're not signed in yet, so for now your words, class notes and starred sections are only saved <b>in this browser, on this device</b>. Clearing your browsing data or using a private window erases them.</p>
    <p>'''+SI+''' (top right) and everything saves to your account automatically. Sign in with the same account on your phone or computer and it's all there.</p>
  </div>
''',s,count=1,flags=re.S); assert n==1
R('''    <li><span class="wl-ico wl-green" aria-hidden="true">☁</span><div><b>Sign in with Google</b> (top right) so your words and notes save in the cloud and follow you to any device. <button class="foot-link" type="button" data-signin>Sign in now</button></div></li>''',
  '''    <li class="when-in"><span class="wl-ico wl-green" aria-hidden="true">☁</span><div><b>You're signed in.</b> Your words, class notes and stars save to your Google account automatically, on every device where you sign in.</div></li>''')
R('<span class="when-out"> Copy your words somewhere safe once a week.</span>','')
s,n=re.subn(r'(<div class="store-info dismissible when-out">\s*<span class="store-ico" aria-hidden="true">!</span>\s*)<div>'+re.escape(SI)+r' to save everything in the cloud.*?</div>\n',
  lambda m: m.group(1)+'<div><b>You\'re not signed in.</b> For now, your words and class notes are only saved in this browser. '+SI+' to save them to your account and see them on any device.</div>\n',s,count=1,flags=re.S); assert n==1
s,n=re.subn(r'(<div class="store-info dismissible when-out">\s*<span class="store-ico" aria-hidden="true">!</span>\s*)<div><b>These notes are saved only in this browser.*?</div>\n',
  lambda m: m.group(1)+'<div><b>You\'re not signed in.</b> For now, these notes are only saved in this browser. '+SI+' to save them to your account and see them on any device.</div>\n',s,count=1,flags=re.S); assert n==1
R('<span>They only live in this browser. Copy them to your sheet or notes now so you never lose them.</span>',
  '<span>Copy them to your sheet now. Tip: sign in (top right) so your words are also saved to your account.</span>')
s,n=re.subn(r'<p class="cn-warn dismissible when-out">.*?</p>','<p class="cn-warn dismissible when-out">Saved notes go to <b>My class notes</b>, sorted by date. '+SI+' to keep them in your account. Until then, they\'re only saved in this browser.</p>',s,count=1,flags=re.S); assert n==1
R('Every word you save, newest first. Copy them to your sheet once a week, import a list you already have, or practice them with flashcards.',
  'Every word you save, newest first. Practice them with flashcards, import a list you already have, or copy them to your sheet.')
R('      <button class="navbtn" data-go="backup">Back up &amp; move</button>\n','')
R('come to this page (Help → Back up &amp; move) and paste the code.','come to this page (<b>Back up or move your notes</b>, at the bottom of any page) and paste the code.')

# 7) My words: drop "copy elsewhere" nags + club-member copy tips; sync bubbles can be closed (Oct 28 2026)
R('Every word you save, newest first. Practice them with flashcards, import a list you already have, or copy them to your sheet.',
  'Every word you save, newest first. Practice them with flashcards or import a list you already have.')
R('<h3>Link where you keep your vocabulary</h3>','<h3>Link your English Journey sheet <span class="opt">(1:1 students)</span></h3>')
s,n=re.subn(r'<p class="sheet-help"><b>Private 1:1 students:</b>.*?</p>',
  '<p class="sheet-help">Open your <b>English Journey</b> Google Sheet in your Drive folder, copy the link from the address bar and paste it here, so your sheet is always one click away. You only do this once.</p>',s,count=1,flags=re.S); assert n==1
s,n=re.subn(r'  <p class="copy-help dismissible">.*?</p>\n','',s,count=1,flags=re.S); assert n==1
R('function nudgeState(){\n','function nudgeState(){\n  return null; // copy-to-sheet reminder retired: words save to the Google account now\n')
s=s.replace('<div class="sync-info when-in">','<div class="sync-info dismissible when-in">')

# 8) backup page: say where the old page's code goes
R('<h3>Paste it here</h3>','<h3>Paste it here</h3>\n      <p class="fb-help" style="margin:0"><b>Coming from the old Cheat Sheet?</b> Paste what you copied with <b>Copy my notes</b> there.</p>')

# 9) translator on the website: Gemini (cloud.js sets window.__csSample)
R('(async()=>{ try{ if(window.claude && window.claude.use){ const s=await window.claude.use("sample"); if(s){ sample=s; trBtn.hidden=false; outCard.hidden=false; } } }catch(e){} })();',
  'function useCsSample(){ if(!sample && window.__csSample){ sample=window.__csSample; trBtn.hidden=false; outCard.hidden=false; } }\nwindow.addEventListener("cs-sample-ready",useCsSample); useCsSample();')
R("if(e&&e.code===\"not_granted\"){ trBtn.hidden=true; outCard.hidden=true; }\n    else ","")
R('Write a word or sentence and open it in your favorite translator with one tap.','Write a word or sentence and tap <b>Translate here</b>, or open it in Google Translate or DeepL.')
trIdx=0

R('const CHANGELOG=[\n','const CHANGELOG=[\n  {id:"2026-translate", date:"October 29, 2026", title:"Translate right on the page 🌎", items:[\n    ["🌎","Translate here","write a word or sentence in the Translator and get a natural translation right on the page, no new tab needed.","translate"],\n    ["↗️","Backups still there","Google Translate and DeepL are one tap away if you want a second opinion.",null]\n  ]},\n')

# 10) no counter on "My class notes"; "My words" keeps its total
R('<span>My class notes</span><span class="cn-count" id="cnNavCount"></span>','<span>My class notes</span><span id="cnNavCount" hidden></span>')

# 11) music panel: only the note that fits the chosen sound
s,n=re.subn(r'<p class="music-note"><b>Brown noise</b>.*?</p>',
  '<p class="music-note" id="mnBrown" hidden><b>Brown noise</b> is a deep, steady sound that blocks out distractions.</p>\n        <p class="music-note" id="mnLofi" hidden>Want real tracks? <a href="https://www.youtube.com/@LofiGirl" target="_blank" rel="noopener">Lofi Girl on YouTube ↗</a></p>',s,count=1,flags=re.S); assert n==1
R('    balRow.hidden= mode!=="both";\n','    balRow.hidden= mode!=="both";\n    document.getElementById("mnBrown").hidden= mode!=="brown";\n    document.getElementById("mnLofi").hidden= !(mode==="lofi"||mode==="both");\n')

# 12) music chips: Just rain before Calm piano
R('<button type="button" class="chip" role="radio" data-mm="piano">Calm piano</button>\n          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>',
  '<button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>\n          <button type="button" class="chip" role="radio" data-mm="piano">Calm piano</button>')

# 13) logo goes Home
R('<div class="brand"><small>Learn with Noa</small><span>Cheat Sheet</span></div>','<a class="brand" href="#notes" data-go="notes" aria-label="Cheat Sheet, go to Home"><small>Learn with Noa</small><span>Cheat Sheet</span></a>')

exec(open('parts/step14.py').read())
css=r'''
/* ---------- cloud sync ---------- */
a.brand{text-decoration:none;color:inherit;border-radius:8px}
a.brand:hover span{filter:brightness(1.15)}
#wNavCount:not(:empty){background:color-mix(in srgb,var(--green) 22%,transparent);color:var(--green);border-radius:999px;padding:1px 8px;font:800 12px var(--body);min-width:22px;text-align:center}
.cn-nav[aria-current="true"] #wNavCount{background:rgba(255,255,255,.25);color:#fff}
.wl-warn.wl-sign{border-color:color-mix(in srgb,var(--green) 45%,transparent);background:var(--green-soft)}
.wl-warn.wl-sign h3{color:var(--green)}
@media (max-width:480px){.top-in > .pill-btn[data-go="notes"]{display:none}.brand span{white-space:nowrap;font-size:19px}.top-in{gap:8px}}
body[data-auth="in"] .when-out{display:none!important}
body:not([data-auth="in"]) .when-in{display:none!important}
.sync-info{display:flex;gap:10px;align-items:flex-start;background:var(--green-soft);border:1px solid color-mix(in srgb,var(--green) 40%,transparent);border-radius:12px;padding:10px 14px;margin:-6px 0 18px;max-width:80ch;font-size:14.5px}
.sync-ico{flex:none;width:22px;height:22px;border-radius:50%;background:var(--green);color:#fff;font-weight:900;display:inline-flex;align-items:center;justify-content:center;font-size:13px}
.auth-btn{gap:7px}
.g-ico{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#fff;color:#1a73e8;font:900 12px var(--body);border:1px solid var(--line);overflow:hidden;flex:none}
.g-ico img{width:100%;height:100%;object-fit:cover}
.auth-btn.in .g-ico{background:var(--green);color:#fff;border-color:transparent}
.auth-btn .dot{width:8px;height:8px;border-radius:50%;background:var(--green);flex:none}
.auth-btn .dot.busy{background:#E0A100}
.auth-btn .dot.err{background:var(--red)}
.auth-who{margin:0;font-weight:800;overflow-wrap:anywhere}
.auth-status{margin:0;font-size:13.5px;color:var(--muted)}
@media (max-width:700px){.auth-panel{position:fixed}}
'''
R('</style>',css+TODAY_CSS+'</style>')

page=s
head='''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Your English Cheat Sheet: verb tenses, irregular verbs, grammar, your words and class notes, by Learn with Noa.">
<link rel="icon" href="favicon.svg?v=2" type="image/svg+xml">
<link rel="icon" href="favicon-32.png?v=2" sizes="32x32" type="image/png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body data-auth="out">
<script>try{if(localStorage.getItem("ncs-sync-uid"))document.body.dataset.auth="in";}catch(e){}</script>
'''
cloud=open('cloud.js').read()
head=head.replace('</head>',open('parts/comfort_early.html').read()+'</head>')
out=head+page+'\n<script type="module">\n'+cloud+'\n</script>\n</body>\n</html>\n'
import hibi
out = hibi.rename(out)
out = out.replace('</style>', '.brand-row{font-style:normal;display:flex;align-items:baseline;gap:7px;min-width:0}.kj{font:700 15px "Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;color:var(--muted);letter-spacing:.06em;white-space:nowrap}footer .kj{font-size:inherit;font-weight:600}.brand .brand-row>span{font-size:26px}.brand .kj{font-size:17px}@media (max-width:480px){.brand .brand-row>span{font-size:21px}.brand .kj{font-size:14px}}\n</style>', 1)
open('site/index.html','w').write(out)
print("ok", len(out))
