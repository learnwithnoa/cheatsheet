# step59: music continues where it was between pages, Noa's club notes in his notifications + ?notif=1 deep link,
# harmonized round header buttons, access-gate spacing, no star on the club page, club subtitle spacing
# 1) music keeps its place in the song between pages
R('''  window.addEventListener("pagehide",()=>{ try{ if(playing) localStorage.setItem("cs-music-on",String(Date.now())); else localStorage.removeItem("cs-music-on"); }catch(e){} });
  (function(){ let t=0; try{ t=+localStorage.getItem("cs-music-on")||0; localStorage.removeItem("cs-music-on"); }catch(e){} if(!t||Date.now()-t>180000) return;''','''  let RESUME=null;
  window.addEventListener("pagehide",()=>{ try{ if(playing) localStorage.setItem("cs-music-on",JSON.stringify({t:Date.now(),step,bar})); else localStorage.removeItem("cs-music-on"); }catch(e){} });
  (function(){ let t=0; try{ const v=JSON.parse(localStorage.getItem("cs-music-on")||"null"); localStorage.removeItem("cs-music-on"); if(v&&typeof v==="object"){ t=v.t; RESUME={step:v.step|0,bar:v.bar|0}; } else t=+v||0; }catch(e){} if(!t||Date.now()-t>180000){ RESUME=null; return; }''')
R('''    playing=true; nextTime=ac.currentTime+0.1; step=0;''','''    playing=true; nextTime=ac.currentTime+0.1; step=0; if(RESUME){ step=RESUME.step; bar=RESUME.bar; RESUME=null; }''')
# 2) Noa's own club notes (reactions, mentions) in his notifications; open the list with index.html?notif=1
R('''  window.__clubSocial={ mount, dms:loadThreads, recent,''','''  async function myNotes(){ await loadNotes(); return (NOTES||[]).filter(n=>n.kind!=="dm"&&n.kind!=="comment").map(n=>Object.assign({},n,{html:noteTxt(n)})); }
  window.__clubSocial={ mount, dms:loadThreads, recent, myNotes,''')
R('''      let areq=[]; try{ areq=await accessReqs(); }catch(e){}
      data={acc,priv,club,reps,areq}; paint();''','''      let areq=[]; try{ areq=await accessReqs(); }catch(e){}
      let mine=[]; try{ mine=window.__clubSocial&&window.__clubSocial.myNotes?await window.__clubSocial.myNotes():[]; }catch(e){}
      data={acc,priv,club,reps,areq,mine};
      try{ if(new URLSearchParams(location.search).get("notif")){ open=true; history.replaceState(null,"",location.pathname+location.hash); } }catch(e){}
      paint();''')
R('''    const cnt=areq.length+joins.length+packs.length+clocks.length+(unl?1:0)+clubNew.length+reps.length;''','''    const mineNew=(data.mine||[]).filter(n=>n.at>since);
    const cnt=areq.length+joins.length+packs.length+clocks.length+(unl?1:0)+clubNew.length+reps.length+mineNew.length;
    try{ localStorage.setItem("cs-tn-count",String(cnt)); }catch(e){}''')
R('''      ${packs.length?`<h4>Packs</h4>''','''      ${mineNew.length?`<h4>💛 About you in the club</h4><ul>${mineNew.map(n=>`<li>${n.html}${n.text&&!/^react/.test(n.kind)?` <span class="muted">“${esc(n.text)}”</span>`:""} <span class="muted">· ${ago(n.at)}</span></li>`).join("")}</ul>`:""}
      ${packs.length?`<h4>Packs</h4>''')
# 3) no star on the club page (it's always pinned)
R('''stars=stars.filter(id=>document.getElementById("v-"+id)&&!["quiz","park","coaching"].includes(id));''','''stars=stars.filter(id=>document.getElementById("v-"+id)&&!["quiz","park","coaching","club"].includes(id));''')
css59 = '''
/* step59: one size and shape for every round button in the top bar */
.top-in .cs-btn,.top-in .theme-btn:not(#hdrWord),.top-in #dmTopBtn,.top-in>#tNotif .tn-bell,.top-in #clBell,.top-in #navTeacher,.top-in #navHub{
  width:38px!important;min-width:38px!important;height:38px!important;padding:0!important;border-radius:50%!important;border-width:1.5px!important;
  align-items:center;justify-content:center;gap:0!important;box-sizing:border-box;flex:none}
.top-in #tmBtn:has(.tm-time:not([hidden])){width:auto!important;padding:0 11px!important;border-radius:999px!important;gap:6px!important}
.top-in #hdrWord{height:38px!important;box-sizing:border-box}
.top-in #csBtn{font-size:20px}
.top-in #csBtn svg{width:20px;height:20px}
.top-in #tmBtn .tm-ico{width:19px;height:19px}
.top-in #musicBtn .mu-ico svg{width:19px;height:19px}
@media (max-width:520px){
  .top-in .cs-btn,.top-in .theme-btn:not(#hdrWord),.top-in #dmTopBtn,.top-in>#tNotif .tn-bell,.top-in #clBell,.top-in #navTeacher,.top-in #navHub{width:34px!important;min-width:34px!important;height:34px!important}
  .top-in #hdrWord{height:34px!important}
}
@media (max-width:380px){
  .top-in .cs-btn,.top-in .theme-btn:not(#hdrWord),.top-in #dmTopBtn,.top-in>#tNotif .tn-bell,.top-in #clBell,.top-in #navTeacher,.top-in #navHub{width:31px!important;min-width:31px!important;height:31px!important}
}
html .top-in #themeBtn,html .top-in [hidden]{display:none!important}
/* profile: the photo fills the round button, one ring only (green = saved) */
html.cs-signed .top-in #authBtn{padding:0!important;border-width:2px!important;overflow:hidden}
html.cs-signed .top-in #authBtn .g-ico{width:100%;height:100%;border:0!important;font-size:15px}
/* access gate: no empty gap under "Ask for access" */
.ag-fmsg:empty{display:none}
.ag-or{margin:14px 0 8px!important}
/* club page: a bit of air between the buttons and the subtitle */
#v-club .vhead{margin-bottom:10px}
#v-club .lede{margin-top:6px}
'''
_i = s.index('</style>'); s = s[:_i] + css59 + s[_i:]
