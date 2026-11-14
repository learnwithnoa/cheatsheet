# step100: the big sweep (Nov 12)
# 1+2) sign-in is required now: no "not signed in" boxes, no Back up & move page
_css = '''
/* step100: sweep */
.when-out{display:none!important}
#v-backup,[data-go="backup"]{display:none!important}
@media (min-width:701px){#musicPanel,#tmPanel{width:min(380px,calc(100vw - 32px))!important}}
@media (min-width:701px){html body form.qa.qa{top:calc(env(safe-area-inset-top,0px) + var(--hdr-h,61px) + var(--va-h,0px) - 2px)!important}}
.cs-dlg:focus{outline:none}
@media (max-width:560px){.vhead{flex-direction:column;gap:4px}.vhead .cs-read-row{max-width:none;justify-content:flex-start}}
.cl-older{display:block;margin:6px auto 24px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''    document.getElementById("backTxt").textContent=name;''','''    const h1=document.querySelector("#v-"+prev.id+" h1"); const h1t=h1?(()=>{ const c=h1.cloneNode(true); c.querySelectorAll(".lvl,.badge,small,span[class*='lvl']").forEach(x=>x.remove()); return c.textContent.trim(); })():"";
    document.getElementById("backTxt").textContent=(name===prev.id&&h1t)?h1t:name;''')
# someone landing on #backup goes Home
R('''document.addEventListener("click",e=>{ if(e.target.closest('[data-go="backup"]')) bkRender(); });''','''document.addEventListener("click",e=>{ if(e.target.closest('[data-go="backup"]')) bkRender(); });
if(location.hash==="#backup") setTimeout(()=>{ const h=document.querySelector('[data-go="notes"]'); if(h) h.click(); },0);''')
# 3) search label
R('Search the cheat sheet','Search Hibi')
# 4+5) tour
R('''You'll find three parts:</p>''','''You'll find four parts:</p>''')
R('''<div><b>Vocabulary:</b> useful word sets by Noa''','''<div><b>Word packs:</b> useful word sets by Noa''')
R('''bionic reading, calm mode, a study timer and more.</div></li>''','''bionic reading, calm mode and more.</div></li>
      <li><span class="wl-ico" aria-hidden="true">⏱</span><div><b>Study timer</b> (⏱ at the top): focus for 25 minutes, then take a short break.</div></li>''')
R('''<div><b>Music:</b> lo-fi, piano, rain or calm noise while you study.</div>''','''<div><b>Music</b> (🎧 at the top): lo-fi, piano, rain or calm noise while you study.</div>''')
# 6) club subtitle
R('''<p class="lede">This week's classes, the community wall, your Zoom links and past weeks.</p>''','''<p class="lede">This week's classes and Zoom links, the community wall, recordings, the calendar and everyone in the club.</p>''')
# 7) Thought for today: a like, not "Send love" (that's the Buddy park)
R('''<span class="tt-ico" aria-hidden="true">✨</span><span id="ttLoveTxt">Send love</span>''','''<span class="tt-ico" aria-hidden="true">💛</span><span id="ttLoveTxt">I like this</span>''')
R('''document.getElementById("ttLoveTxt").textContent=on?"Love sent":"Send love";''','''document.getElementById("ttLoveTxt").textContent=on?"Liked":"I like this";''')
# 8) profile: no repeated text
R('''        <p class="music-note">Your words, class notes, stars and flashcard progress save to your Google account automatically. Sign in with the same account on your phone or another computer to see them there.</p>''','')
R('''      row("📚","Words saved",ws.length)+''','')
# 9) saving words: one wording
R('''<button class="pill-btn" type="submit">+ Add word</button>''','''<button class="pill-btn" type="submit">+ Save word</button>''')
R('''  <h2>Add a word</h2>''','''  <h2>Save a word</h2>''')
s = s.replace('>+ Save to my words<','>+ Save to My words<')
assert s.count('>+ save<')>=3; s = s.replace('>+ save<','>+ Save<')
s = s.replace('Tap <b>+ save</b>','Tap <b>+ Save</b>')
assert s.count('textContent="✓ saved"')==2; s = s.replace('textContent="✓ saved"','textContent="✓ Saved"')
# 11) What's new: no Back up & move, newest month first, older ones behind a button
R('''return '<ul class="cl-items">'+e.items.map(''','''return '<ul class="cl-items">'+e.items.filter(it=>it[3]!=="backup").map(''')
R('''document.getElementById("clList").innerHTML=CHANGELOG.map((e,i)=>''','''const CL_T=e=>{ const t=Date.parse(e.date); return isNaN(t)?0:t; }, CL_CUT=CL_T(CHANGELOG[0])-14*864e5;
document.getElementById("clList").innerHTML=CHANGELOG.map((e,i)=>(i>0&&CL_T(e)&&CL_T(e)<CL_CUT?'<div class="cl-old" hidden>':'<div>')+''')
R('''<h2 class="cl-title">'+e.title+'</h2>'+clItems(e)+'</article>').join("");''','''<h2 class="cl-title">'+e.title+'</h2>'+clItems(e)+'</article></div>').join("")+'<button type="button" class="swap cl-older" id="clOlder">Show older updates</button>';
(function(){ const b=document.getElementById("clOlder"); if(!document.querySelector("#clList .cl-old")){ b.remove(); return; } b.addEventListener("click",()=>{ document.querySelectorAll("#clList .cl-old").forEach(x=>x.hidden=false); b.remove(); }); })();''')
# 14) dialogs: don't put the focus ring on the close button when there's nothing else to focus
R('''const f=d.querySelector("[data-autofocus]")||d.querySelector("button:not(.cs-dlg-x)")||d.querySelector(".cs-dlg-x"); if(f) f.focus();''','''const f=d.querySelector("[data-autofocus]")||d.querySelector("button:not(.cs-dlg-x)"); if(f) f.focus(); else { d.tabIndex=-1; d.focus({preventScroll:true}); }''')
# 16) grammar stars: every module, real total
R('''st=["ps","pp"].reduce((t,k)=>t+Object.values((mods[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0), outs=["ps","pp"].filter(''','''MI=window.__csModInfo?window.__csModInfo():[["ps",7],["pp",7]], MK=MI.map(x=>x[0]), STT=MI.reduce((t,x)=>t+x[1]*3,0), st=MK.reduce((t,k)=>t+Object.values((mods[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0), outs=MK.filter(''')
R('''row("🧩","Grammar stars",st+" / 42 ★"+(outs?" 🎓":""))''','''row("🧩","Grammar stars",st+" / "+STT+" ★"+(outs?" 🎓":""))''')
R('''  const ITEM={}; Object.values(MODS).forEach(''','''  window.__csModInfo=()=>Object.values(MODS).map(md=>[md.id,md.stages.length]);
  const ITEM={}; Object.values(MODS).forEach(''')
# 17) My coaching is empty for Noa himself (he uses View as)
R('''    const v=window.__csHubView, b=document.getElementById("navCoaching"); if(b) b.hidden=!v;''','''    const v=window.__csHubView, b=document.getElementById("navCoaching"); if(b) b.hidden=!v||(!!window.__csTeacher&&!window.__csPreview&&!window.__csViewAsMode);''')
