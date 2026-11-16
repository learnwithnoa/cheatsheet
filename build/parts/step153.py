# step153 (Nov 16 2026): Noa's private students get a free MONTH in the club instead of 2 weeks (a thank-you for being a
# private student). The pay helper decides (role.hub / role.private → 30 days, sends the matching welcome message);
# here the button, the Home teaser and the "Your free trial" card say "a month" for them.
R('''  function decorateTrial(){''', '''  const PRIVT=()=>{ const v=window.__csHubView; return !!(v&&!v.clubOnly); };
  const trialTxt=()=>PRIVT()?{btn:"🎁 Try it free for a month",tz:"🎁 Try the club free for a month →",note:"A thank-you for being one of Noa’s private students: one free month in the club. No card needed."}
    :{btn:"🎁 Try it free for 2 weeks",tz:"🎁 Try the club free for 2 weeks →",note:"No card needed. Come to the classes, then decide if you want to stay."};
  document.addEventListener("cs-hubview",()=>{ const T=trialTxt(); const b=document.querySelector("#v-club .hb-trial-btn"); if(b&&!b.disabled) b.textContent=T.btn;
    const n=document.querySelector("#v-club .hb-trial .hb-pay-note"); if(n) n.textContent=T.note; const tz=document.querySelector("#homeClub .hc-join[data-hb-trial]"); if(tz) tz.textContent=T.tz; });
  function decorateTrial(){''')
R('''tz.dataset.hbTrial="1"; tz.textContent="🎁 Try the club free for 2 weeks →"; }''', '''tz.dataset.hbTrial="1"; tz.textContent=trialTxt().tz; }''')
R('''    t.innerHTML=`<button class="hb-trial-btn" data-hbtrial="1">🎁 Try it free for 2 weeks</button><p class="hb-pay-note">No card needed. Come to the classes, then decide if you want to stay.</p>`;''',
  '''    t.innerHTML=`<button class="hb-trial-btn" data-hbtrial="1">${trialTxt().btn}</button><p class="hb-pay-note">${trialTxt().note}</p>`;''')
R('''line=`You’re on your <b>free 2-week trial</b> until ${day(m.trialUntil)}. Enjoy the classes!`; }''',
  '''line=`You’re on your <b>${m.trialLen==="month"?"free month in the club":"free 2-week trial"}</b> until ${day(m.trialUntil)}. Enjoy the classes!`; }''')
R('''Not in the club yet? Try it <b>free for 2 weeks</b> from the Club page, no card needed.''',
  '''Not in the club yet? Try it <b>free for 2 weeks</b> from the Club page, no card needed (Noa’s private students get a free month).''')
