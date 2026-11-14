# step55: music keeps going between pages, clearer study-guide cards, word tools order, Practice under My words,
# popovers below the view-as banner, club page for non-members (schedule in Chile time, message Noa on Hibi, sample class)
import re as _re
# 1) Practice right under My words in the menu
_m = _re.search(r'      <button class="navbtn cn-nav" data-go="quiz">.*?</button>\n', s)
_q = _m.group(0); s = s.replace(_q, '', 1)
_w = s.index('      <button class="navbtn cn-nav" data-go="words">'); _we = s.index('</button>\n', _w) + len('</button>\n')
s = s[:_we] + _q + s[_we:]
# 2) word tools: Add many · Clean up · Complete · (Undo) · Practice
R('''<button class="swap" type="button" id="aiFill" title="Fill in missing translations, meanings, word types and examples">✨ Complete my words</button><button class="swap" type="button" id="aiClean" title="Fix spelling, punctuation and capital letters, and find repeated words">🧹 Clean up my words</button><button class="swap" type="button" id="wGoFlash">Practice with flashcards →</button>''',
  '''<button class="swap" type="button" id="aiClean" title="Step 1: fix spelling, punctuation and capital letters, and find repeated words">🧹 Clean up my words</button><button class="swap" type="button" id="aiFill" title="Step 2: fill in missing translations, meanings, word types and examples">✨ Complete my words</button><button class="swap w-goflash" type="button" id="wGoFlash">Practice with flashcards →</button>''')
R('''const u=undoInfo(), anchor=document.getElementById("aiClean");''','''const u=undoInfo(), anchor=document.getElementById("aiFill");''')
# 3) music: keep playing when you move to another Hibi page (teacher pages too)
R('''  playB.addEventListener("click",()=> playing?pause():play());''','''  playB.addEventListener("click",()=> playing?pause():play());
  /* keep the music going between Hibi pages: remember it was on, start again on the next page
     (browsers only allow sound after a tap, so if it can't start by itself the first tap anywhere starts it) */
  window.addEventListener("pagehide",()=>{ try{ if(playing) localStorage.setItem("cs-music-on",String(Date.now())); else localStorage.removeItem("cs-music-on"); }catch(e){} });
  (function(){ let t=0; try{ t=+localStorage.getItem("cs-music-on")||0; localStorage.removeItem("cs-music-on"); }catch(e){} if(!t||Date.now()-t>180000) return;
    const go=()=>{ ["pointerdown","keydown","touchstart"].forEach(ev=>window.removeEventListener(ev,go,true)); btn.classList.remove("mu-wait"); btn.removeAttribute("data-wait"); if(!(ac&&ac.state==="running")) play(); };
    setTimeout(()=>{ play().then(()=>{ if(ac&&ac.state==="running") return; btn.classList.add("mu-wait"); btn.setAttribute("data-wait","Tap anywhere to keep the music going"); ["pointerdown","keydown","touchstart"].forEach(ev=>window.addEventListener(ev,go,true)); }); },300); })();''')
css55 = '''
/* step55 */
.mu-wait{animation:muWait 1.4s ease-in-out infinite;position:relative}
.mu-wait::after{content:attr(data-wait);position:absolute;top:calc(100% + 8px);right:0;white-space:nowrap;font:600 12px var(--sans,inherit);padding:5px 10px;border-radius:9px;background:var(--ink);color:var(--bg);pointer-events:none;z-index:40}
@keyframes muWait{50%{box-shadow:0 0 0 4px color-mix(in srgb,#3b82f6 35%,transparent)}}
@media (prefers-reduced-motion:reduce){.mu-wait{animation:none}}
.ch-gl{border:1.5px solid color-mix(in srgb,var(--k,#3b82f6) 35%,var(--line))!important;background:color-mix(in srgb,var(--bg) 55%,transparent)}
.ch-gl:hover{border-color:var(--k,#3b82f6)!important}
.w-goflash{margin-left:auto}
@media (max-width:640px){.w-goflash{margin-left:0}}
html .qa{top:calc(env(safe-area-inset-top,0px) + var(--hdr-h,61px) + var(--va-h,0px) + 8px)!important;max-height:calc(100dvh - var(--hdr-h,61px) - var(--va-h,0px) - 24px);overflow:auto}
@media (max-width:700px){.music-panel{top:calc(env(safe-area-inset-top,0px) + 66px + var(--va-h,0px))!important;max-height:calc(100dvh - 90px - var(--va-h,0px));overflow:auto}}
.cl-lock-when{font:600 12.5px var(--mono);color:var(--muted)}
.cl-lock-sched{display:grid;gap:4px;margin:4px 0 10px;padding:0;list-style:none}
.cl-lock-sched li{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.cl-lock-sched .t{font:700 12.5px var(--mono);color:var(--muted);white-space:nowrap}
.cl-sample{display:flex;gap:12px;align-items:center;margin:12px 0 4px;padding:12px 14px;border-radius:14px;border:1.5px solid color-mix(in srgb,#E5533D 35%,var(--line));background:color-mix(in srgb,#E5533D 7%,var(--surface));color:var(--ink);text-decoration:none}
.cl-sample:hover{border-color:#E5533D}
.cl-sample .i{font-size:26px}.cl-sample b{display:block}.cl-sample small{color:var(--muted)}
.cl-join-alt{background:none;border:0;padding:0;font:inherit;color:var(--royal,#2563eb);text-decoration:underline;cursor:pointer}
'''
_i = s.index('</style>'); s = s[:_i] + css55 + s[_i:]
# 4) club page for people who aren't members yet
R('''      <ul class="cl-lock-list"><li>🧠 <b>Deep Dive Monday</b> · a thought-provoking topic, often with a short video</li><li>🃏 <b>Wildcard Wednesday</b> · games and activities, pure speaking</li><li>💬 <b>Word Up Thursday</b> · useful expressions, then conversation</li><li>😎 <b>Free Talk Friday</b> · relaxed conversation to close the week</li></ul>''',
  '''      <ul class="cl-lock-list">${lockSched().map(c=>`<li>${c.ico} <b>${esc(c.name)}</b> · ${esc(c.what)}<br><span class="cl-lock-when">${esc(c.when)}</span></li>`).join("")}</ul>
      <p class="cl-lock-small">🕐 All times are <b>Chile time</b> (Santiago). On Zoom, from anywhere.</p>
      ${SAMPLE&&SAMPLE.url?`<a class="cl-sample" href="${esc(SAMPLE.url)}" target="_blank" rel="noopener"><span class="i" aria-hidden="true">🎬</span><span><b>${esc(SAMPLE.title||"Watch a real class")}</b><small>${esc(SAMPLE.note||"See what a club class looks like before you join.")}</small></span></a>`:""}''')
R('''">💛 I want to join</a><p class="cl-lock-small">Tap the button to email Noa, and he’ll send you everything you need. Prefer Instagram? <a href="https://ig.me/m/learnwithnoa" target="_blank" rel="noopener">Message @learnwithnoa</a>.</p></div>''',
  '''" data-joindm="1">💛 I want to join</a><p class="cl-lock-small">Tap the button to send Noa a message here on Hibi, and he’ll send you everything you need. Prefer email? <a href="mailto:learnwithnoa@gmail.com?subject=${encodeURIComponent("I want to join Noa's English Club 💛")}">Email Noa</a>.</p></div>''')
R('''  function locked(){''','''  let SAMPLE=null, sampleTried=false;
  async function loadSample(){ if(sampleTried) return; sampleTried=true;
    try{ const F=window.__csFire; if(!F) return; const tok=await F.token(); if(!tok) return;
      const r=await fetch(F.base+"/clubPublic/sample",{headers:{Authorization:"Bearer "+tok}}); if(!r.ok) return; const d=await r.json(); SAMPLE=JSON.parse(d.fields.json.stringValue)||null; if(SAMPLE&&SAMPLE.url) render(); }catch(e){} }
  /* the weekly classes with their day and time (from the club's schedule when we have it) */
  function lockSched(){ const WDN=["Sundays","Mondays","Tuesdays","Wednesdays","Thursdays","Fridays","Saturdays"];
    const what={1:"a thought-provoking topic, often with a short video",3:"games and activities, pure speaking",4:"useful expressions, then conversation",5:"relaxed conversation to close the week"};
    const def=[{wd:1,ico:"🧠",name:"Deep Dive Monday",time:"20:00",dur:90},{wd:3,ico:"🃏",name:"Wildcard Wednesday",time:"20:00",dur:90},{wd:4,ico:"💬",name:"Word Up Thursday",time:"20:00",dur:90},{wd:5,ico:"😎",name:"Free Talk Friday",time:"14:30",dur:60}];
    const list=(PUB&&PUB.info&&PUB.info.schedule&&PUB.info.schedule.length)?PUB.info.schedule:def;
    const t12=t=>{ const [h,m]=String(t||"").split(":").map(Number); if(isNaN(h)) return ""; return ((h%12)||12)+(m?":"+String(m).padStart(2,"0"):"")+(h<12?"am":"pm"); };
    return list.map(c=>({ico:c.ico||"",name:c.name,what:what[c.wd]||c.desc||"",when:`${WDN[c.wd]} · ${t12(c.time)}${c.dur?` · ${c.dur} min`:""}`})); }
  document.addEventListener("click",e=>{ const j=e.target.closest("[data-joindm]"); if(!j||!me()||G()) return; e.preventDefault();
    window.__clubDM&&window.__clubDM(NOA,"Noa");
    setTimeout(()=>{ const ta=document.querySelector("#clDm textarea"); if(ta&&!ta.value.trim()){ ta.value="Hi Noa! 👋 I’m interested in joining Noa’s English Club. Can you tell me how it works?"; ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); } },700); });
  function locked(){ loadSample();''')
# 5) What's new
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-1111", date:"November 11, 2026", title:"Small things, smoother", items:[
    ["🧹","Word tools in order","in <b>My words</b> the buttons now follow the steps: <b>Clean up</b> first, then <b>Complete</b>, then practice.","words"],
    ["🎯","Practice next to My words","<b>Practice</b> moved right under <b>My words</b> in the menu, since that’s where your flashcards come from.","quiz"],
    ["📄","Easier to spot","your latest study guide and class recap in <b>My coaching</b> have a clear border now, so they’re easy to see in every theme."],
    ["🎵","Music that keeps going","if Study music is on, it keeps playing when Hibi opens another page. If your browser pauses it, one tap anywhere starts it again."]]},''')
