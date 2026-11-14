# step111: wall comments open by default and look like replies; Home's wall / recording shortcuts go to the exact post / comment;
# YouTube icon with a see-through play triangle; Daily Stoic on Home (Noa only); no "Saved to your Google account" banner on Home
R('''    paintImgs(el); paintPolls(el);''','''    paintImgs(el); paintPolls(el);
    /* comments show under each post by default (the first posts with replies), so replies are never hidden behind a button */
    list.filter(p=>(p.n|0)>0).slice(0,12).forEach(p=>{ const art=el.querySelector(`[data-pid="${CSS.escape(p.id)}"]`), sub=art&&art.querySelector(".cs-sub"); if(sub&&sub.hidden) art._subP=openSub(art,p.id); });''')
R('''if(FOCUS){ const id=FOCUS; FOCUS=null; const art=el.querySelector(`[data-pid="${CSS.escape(id)}"]`); if(art){ art.scrollIntoView({block:"center",behavior:"smooth"}); art.classList.add("cs-flash"); openSub(art,id); } }''',
'''if(FOCUS){ const id=FOCUS; FOCUS=null; const art=el.querySelector(`[data-pid="${CSS.escape(id)}"]`); if(art){ art.scrollIntoView({block:"center",behavior:"smooth"}); art.classList.add("cs-flash");
      (async()=>{ const sub=art.querySelector(".cs-sub"); if(art._subP) await art._subP.catch(()=>{}); else if(sub&&sub.hidden) await openSub(art,id);
        /* go down to the newest reply */
        const cs=art.querySelectorAll(".cs-sub .cs-c"), last=cs[cs.length-1]; if(last){ setTimeout(()=>{ last.scrollIntoView({block:"center",behavior:"smooth"}); last.classList.add("cs-flash"); },250); } })(); } }''')
R('''async function unread(){ if(G()) return 1;''','''function unreadPid(){ const s=getSeen()||(Date.now()-7*864e5); const l=(POSTS||[]).filter(p=>isNew(p,s)&&p.uid!==me()).sort((a,b)=>(b.lastAt||b.at||0)-(a.lastAt||a.at||0)); return l[0]?l[0].id:(G()?"s1":""); }
  async function unread(){ if(G()) return 1;''')
R('''refreshBadge, unread, reports, delReport, watched:syncWatched };''','''refreshBadge, unread, unreadPid, reports, delReport, watched:syncWatched };''')
R('''const n=await window.__clubSocial.unread(); b.hidden=!n; b.textContent=`💬 ${n} new on the community wall →`; }''','''const n=await window.__clubSocial.unread(); b.hidden=!n; b.textContent=`💬 ${n} new on the community wall →`;
    try{ const pid=window.__clubSocial.unreadPid&&window.__clubSocial.unreadPid(); if(pid) b.dataset.bgo=pid; else delete b.dataset.bgo; }catch(e){} }''')
s=s.replace('<path fill="currentColor" d="M21.6 7.2a2.5','<path fill="currentColor" fill-rule="evenodd" d="M21.6 7.2a2.5',1)
_css='''
/* step111 */
.cs-sub .cs-c{position:relative;margin-left:22px;padding-left:14px;border-top:0;border-left:2px solid color-mix(in srgb,var(--c-sky,#5AB8FF) 40%,var(--line))}
.cs-sub .cs-c::before{content:"↳";position:absolute;left:-20px;top:9px;color:var(--muted);font-size:15px;line-height:1}
.cs-sub .cs-c+.cs-c{margin-top:6px}
.cs-sub .cs-comp,.cs-sub form{margin-left:22px}
.cl-watch .cl-yt{background:none!important;border:0!important;box-shadow:none!important;filter:none!important;border-radius:0}
#v-notes .sync-info{display:none!important}
.t-stoic{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;padding:10px 16px;margin:14px 0 14px;border-radius:14px;background:linear-gradient(90deg,color-mix(in srgb,#C9A26B 22%,var(--surface)),var(--surface));border:1px solid color-mix(in srgb,#C9A26B 40%,var(--line))}
.t-stoic .st-k{font:700 11px var(--mono);letter-spacing:.05em;text-transform:uppercase;color:#C9A26B}
.t-stoic .st-t{color:var(--muted);font-size:13px}
'''
_i=s.index('</style>'); s=s[:_i]+_css+s[_i:]
R('''  <div id="homeClub" hidden></div>''','''  <div id="tStoic" class="t-stoic" hidden></div>
  <div id="homeClub" hidden></div>''')
_js='''<script>
/* Noa only: the Daily Stoic on Home (it comes from the 1:1 students page, which loads quietly in the background) */
(function(){ const b=document.getElementById("tStoic"); if(!b) return; const K="cs-stoic-cache";
  const show=h=>{ const ok=window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode; b.hidden=!(ok&&h); if(ok&&h) b.innerHTML=h; };
  const cached=()=>{ try{ const c=JSON.parse(localStorage.getItem(K)||"null"); return c&&c.d===new Date().toDateString()?c.h:""; }catch(e){ return ""; } };
  setTimeout(()=>show(cached()),400);
  addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data||e.data.stoicHTML===undefined) return; show(e.data.stoicHTML); try{ localStorage.setItem(K,JSON.stringify({d:new Date().toDateString(),h:e.data.stoicHTML})); }catch(er){} });
  ["cs-teacher","cs-preview"].forEach(ev=>document.addEventListener(ev,()=>{ if(!(window.__csTeacher===true&&!window.__csPreview)) b.hidden=true; else if(b.hidden) show(b.innerHTML||cached()); }));
})();
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
# a recording shortcut from Home: wait until the Club page is open, then open that recording and scroll to it
R('''document.addEventListener("click",e=>{ const g=e.target.closest("[data-recgo]"); if(!g) return; RFOCUS=g.dataset.recgo; tab="recordings"; if(location.hash!=="#club") location.hash="#club"; setTimeout(()=>{ render(); setTimeout(()=>document.querySelector(`.cl-rcard[open]`)?.scrollIntoView({block:"center",behavior:"smooth"}),80); },0); });''',
'''document.addEventListener("click",e=>{ const g=e.target.closest("[data-recgo]"); if(!g) return; const id=g.dataset.recgo, away=location.hash!=="#club";
    const apply=()=>{ RFOCUS=id; tab="recordings"; render(); setTimeout(()=>{ const c=document.querySelector(`.cl-rcard[open]`); if(c){ c.scrollIntoView({block:"center",behavior:"smooth"}); c.classList.add("cs-flash"); } },120); };
    if(away){ const n=document.querySelector('.navbtn[data-go="club"]'); if(n) n.click(); else location.hash="#club"; setTimeout(apply,300); } else setTimeout(apply,0); });''')
# View as: the club's one-time welcome card (with its ×) no longer flashes while the student's view loads
R('''if(window.__csPreview&&!window.__csGuest) return "";''','''if((window.__csPreview&&!window.__csGuest)||window.__csViewAsMode) return "";''')
