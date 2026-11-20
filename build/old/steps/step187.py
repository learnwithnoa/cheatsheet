# step187 (Nov 19 2026): Irregular verbs practice in ONE place (Practice → Grammar, right after the Verb tenses folder):
# choose Essential (60) or All (121), then 🃏 Flashcards (random order, ✓ I knew it / ✗ Didn't know, progress saved),
# ✏️ Quiz (10 questions, wrong options = believable mistakes), ⌨️ Writing drill (the old drill), 📌 Review (the ones you missed).
# Progress lives in ncs-irr ({verb: {n: right in a row, m: 1 = to review}}), synced like the other ncs- keys.
import re as _re, json as _json
_irr = _json.loads(_re.search(r'const IRR = (\[.*?\]);', s, _re.S).group(1))
_ESS = ["be","have","do","go","get","make","say","see","know","take","come","think","give","find","tell","become","leave","feel","put","bring",
        "begin","keep","hold","write","stand","hear","let","mean","meet","run","pay","sit","speak","read","lose","grow","fall","send","build","understand",
        "spend","buy","eat","drink","sleep","sell","teach","catch","choose","drive","forget","wear","win","break","swim","sing","fly","wake","cut","hurt"]
_ESS = [w for w in _ESS if any(v[0] == w for v in _irr)]
# the old drill's "common verbs" = the same essential list
s, _n = _re.subn(r'const COMMON=\[[^\]]*\];', 'const COMMON=' + _json.dumps(_ESS) + ';', s, count=1)
assert _n == 1
# the tile: one "Irregular verbs" place, in Topics right after Past simple
R('''<span class="pr-ico" aria-hidden="true">🔁</span><b>Irregular verbs</b><span class="pr-sub">Past simple and past participle</span>''',
  '''<span class="pr-ico" aria-hidden="true">🔁</span><b>Irregular verbs</b><span class="pr-sub">Flashcards, quiz and writing drill</span>''')
R('''    ORDER.forEach(k=>{ const t=grid.querySelector('[data-modtile="'+k+'"]'); if(t) grid.appendChild(t); });
    const tools=[grid.querySelector('[data-pr="irr"]'),grid.querySelector('[data-pr="mis"]')].filter(Boolean); if(!tools.length) return;''',
  '''    ORDER.forEach(k=>{ const t=grid.querySelector('[data-modtile="'+k+'"]'); if(t) grid.appendChild(t); if(k==="prs"){ const ir=grid.querySelector('[data-pr="irr"]'); if(ir) grid.appendChild(ir); } });   /* step187: Irregular verbs sits right after the Verb tenses folder (which takes prs/ps/pp) */
    const tools=[grid.querySelector('[data-pr="mis"]')].filter(Boolean); if(!tools.length) return;''')
# the panel: hub on top, the old drill becomes the "Writing drill" method
R('''<h1>Irregular <em>verbs</em></h1>
  <p class="lede" style="margin-bottom:12px">Write the past simple and the past participle. Press Enter to check.</p>
  <div class="card quiz" style="max-width:560px">''', '''<h1>Irregular <em>verbs</em></h1>
  <p class="lede" style="margin-bottom:12px">Learn them with flashcards, check yourself with a quiz, then write them from memory.</p>
  <div id="irrHub"></div>
  <div id="irrArea"></div>
  <div id="irrDrill" hidden><p class="muted" style="margin:0 0 10px">Write the past simple and the past participle. Press Enter to check.</p>
  <div class="card quiz" style="max-width:560px">''')
R('''  <div class="chips" style="margin-top:14px"><button class="chip" type="button" data-ql="common" aria-pressed="true">Common verbs</button><button class="chip" type="button" data-ql="all" aria-pressed="false">All verbs</button></div>
</div>''', '''  <div class="chips" style="margin-top:14px" hidden><button class="chip" type="button" data-ql="common" aria-pressed="true">Common verbs</button><button class="chip" type="button" data-ql="all" aria-pressed="false">All verbs</button></div>
  </div>
</div>''')
_css = r'''
/* step187: Irregular verbs practice */
#irrHub{max-width:640px}
.irr-sets{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}
.irr-prog{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 14px;font-weight:700;font-size:14.5px}
.irr-bar{flex:1 1 160px;height:8px;border-radius:99px;background:var(--surface-2,#e9eef7);overflow:hidden;min-width:120px}
.irr-bar i{display:block;height:100%;background:var(--green,#16a34a);border-radius:99px}
.irr-modes{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 16px}
.irr-mode{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:10px 12px;border-radius:14px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font:inherit}
.irr-mode b{font-size:15px}.irr-mode small{color:var(--muted);font-size:12.5px;line-height:1.25}
.irr-mode[aria-pressed="true"]{border-color:var(--accent,#2b6cff);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent,#2b6cff) 20%,transparent)}
.irr-mode:disabled{opacity:.5;cursor:default}
@media (max-width:620px){.irr-modes{grid-template-columns:1fr 1fr}}
#irrArea .card{max-width:560px}
.irr-card{width:100%;min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border:1.5px dashed var(--line);border-radius:16px;background:transparent;color:var(--ink);cursor:pointer;font:inherit;padding:18px;margin:6px 0 12px}
.irr-card .w{font-size:34px;font-weight:900;line-height:1.1}
.irr-card .f{font-size:22px;font-weight:700}
.irr-card .es{font-style:italic;color:var(--muted)}
.irr-card .h{font:400 11.5px var(--mono);color:var(--muted)}
.irr-row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.irr-done{text-align:center;padding:10px 0}
.irr-done b{font-size:20px}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
_js = r'''<script>
/* step187: Irregular verbs practice hub */
(function(){
  const V=__IRR__, ESS=__ESS__, BY={}; V.forEach(v=>BY[v[0]]=v);
  const LSg=(k,d)=>{ try{ const x=localStorage.getItem(k); return x==null?d:JSON.parse(x); }catch(e){ return d; } };
  const LSs=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); window.__csOnSet&&window.__csOnSet(k); }catch(e){} };
  const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const sp=f=>String(f).split("/").map(x=>x.trim()).filter(Boolean);
  const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const KNOWN=3;   /* right 3 times in a row = you know it (like My notebook flashcards) */
  let set=LSg("ncs-irrset","ess")==="all"?"all":"ess", mode="cards", deck=[], di=0, flip=false, tally=null, quiz=null;
  const verbs=()=>set==="all"?V.map(v=>v[0]):ESS;
  const rec=()=>LSg("ncs-irr",{})||{};
  function mark(w,ok){ const r=rec(), x=r[w]||{n:0}; if(ok){ x.n=(x.n||0)+1; if(x.n>=2) delete x.m; } else { x.n=0; x.m=1; } r[w]=x; LSs("ncs-irr",r); }
  const known=w=>((rec()[w]||{}).n||0)>=KNOWN, toReview=()=>{ const r=rec(); return verbs().filter(w=>r[w]&&r[w].m); };
  function hub(){
    const box=document.getElementById("irrHub"); if(!box) return; const vs=verbs(), k=vs.filter(known).length, rv=toReview().length;
    box.innerHTML=`<div class="irr-sets">${[["ess","⭐ Essential ("+ESS.length+")"],["all","🔁 All ("+V.length+")"]].map(([id,l])=>`<button type="button" class="chip" data-irrset="${id}" aria-pressed="${set===id}">${l}</button>`).join("")}</div>
      <div class="irr-prog"><span>You know <b>${k}</b> of ${vs.length}</span><span class="irr-bar"><i style="width:${Math.round(100*k/vs.length)}%"></i></span>${rv?`<span>📌 ${rv} to review</span>`:""}</div>
      <div class="irr-modes">${[["cards","🃏 Flashcards","learn them"],["quiz","✏️ Quiz","10 questions"],["write","⌨️ Writing drill","type both forms"],["review","📌 Review",rv?rv+" you missed":"nothing yet"]].map(([id,t,sub])=>`<button type="button" class="irr-mode" data-irrmode="${id}" aria-pressed="${mode===id}"${id==="review"&&!rv?" disabled":""}><b>${t}</b><small>${sub}</small></button>`).join("")}</div>`;
  }
  const area=()=>document.getElementById("irrArea");
  function start(m){
    mode=m; flip=false; quiz=null; const dr=document.getElementById("irrDrill"); if(dr) dr.hidden=m!=="write";
    if(m==="write"){ area().innerHTML=""; const b=document.querySelector('[data-ql="'+(set==="all"?"all":"common")+'"]'); if(b) b.click(); hub(); return; }
    if(m==="quiz"){ quiz=newQuiz(); hub(); drawQuiz(); return; }
    deck=shuffle(m==="review"?toReview():verbs()); di=0; tally={k:0,m:0}; hub(); drawCard();
  }
  function drawCard(){
    const a=area(); if(!a) return;
    if(di>=deck.length){ const rv=toReview().length;
      a.innerHTML=`<div class="card irr-done"><b>${mode==="review"?"Review done":"Deck done"} 🎉</b><p>You knew <b>${tally.k}</b> of ${tally.k+tally.m}.</p><div class="note-actions" style="justify-content:center">${rv?`<button type="button" class="pill-btn pill-green" data-irrgo="review">📌 Review the ${rv} you missed</button>`:""}<button type="button" class="swap" data-irrgo="${mode}">↻ Again (new order)</button></div></div>`;
      if(tally.k+tally.m>=5) document.dispatchEvent(new CustomEvent("cs-irrround")); hub(); return; }
    const v=BY[deck[di]], st=rec()[v[0]]||{};
    a.innerHTML=`<div class="card"><div class="irr-row"><span class="tag">${mode==="review"?"📌 Review":"🃏 Flashcards · "+(set==="all"?"all verbs":"essential")}</span><span class="count">${di+1} / ${deck.length}</span></div>
      <button type="button" class="irr-card" data-irrflip>${flip?`<span class="w">${esc(v[0])}</span><span class="f">${esc(v[1])} · ${esc(v[2])}</span><span class="es">${esc(v[3])}</span>`:`<span class="w">${esc(v[0])}</span><span class="es">${esc(v[3])}</span><span class="h">Past simple and past participle? Tap to check</span>`}</button>
      ${flip?`<div class="fc-answer"><button class="fc-no" type="button" data-irrans="0">✗ Didn't know</button><button class="fc-yes" type="button" data-irrans="1">✓ I knew it</button></div>`:""}
      <div class="irr-row"><button type="button" class="swap" data-irrsay="${esc(v[0]+", "+sp(v[1]).join(" or ")+", "+sp(v[2]).join(" or "))}" aria-label="Listen">🔊 Listen</button><span class="fc-stats" style="margin:0">${known(v[0])?"✓ you know this one":st.m?"📌 one to review":""}</span><button type="button" class="swap" data-irrskip>Skip →</button></div></div>`;
  }
  /* quiz: believable mistakes with the same verb (gived, gone for went, go…) */
  const reg=w=>/e$/.test(w)?w+"d":/[^aeiou]y$/.test(w)?w.slice(0,-1)+"ied":w+"ed", en=w=>/e$/.test(w)?w+"n":w+"en";
  function wrongs(v,col){ const ok=sp(v[col]), other=sp(v[col===1?2:1])[0], P=sp(v[1])[0], out=[];
    const c=col===1?[other,reg(v[0]),v[0],reg(P),en(v[0])]:[other,reg(v[0]),en(v[0]),reg(P),v[0]];
    for(const x of c){ if(x&&!ok.includes(x)&&!out.includes(x)) out.push(x); if(out.length===3) break; }
    for(let k=1;out.length<3&&k<V.length;k++){ const o=sp(V[(V.indexOf(v)+k*7)%V.length][col])[0]; if(!ok.includes(o)&&!out.includes(o)) out.push(o); }
    return out; }
  window.__irrWrongs=(w,col)=>wrongs(BY[w],col);
  function newQuiz(){ const qs=shuffle(verbs()).slice(0,10).map(w=>{ const v=BY[w], col=Math.random()<.5?1:2; return {v,col,a:sp(v[col]),o:shuffle([sp(v[col])[0]].concat(wrongs(v,col)))}; }); return {qs,i:0,score:0,picked:null}; }
  function drawQuiz(){
    const a=area(), q=quiz; if(!a||!q) return;
    if(q.i>=q.qs.length){ a.innerHTML=`<div class="card irr-done"><b>${q.score} / ${q.qs.length}</b><p>${q.score===q.qs.length?"Perfect! 🎉":q.score>=7?"Nice work!":"Keep going, you'll get there."}</p><div class="note-actions" style="justify-content:center">${toReview().length?`<button type="button" class="pill-btn pill-green" data-irrgo="review">📌 Review the ones you missed</button>`:""}<button type="button" class="swap" data-irrgo="quiz">↻ New quiz</button></div></div>`;
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:q.score,perfect:q.score===q.qs.length,finished:true,irr:true}})); hub(); return; }
    const x=q.qs[q.i], lbl=x.col===1?"Past simple":"Past participle", ans=q.picked;
    a.innerHTML=`<div class="card"><div class="irr-row"><span class="tag">✏️ Quiz</span><span class="count">${q.i+1} / ${q.qs.length}</span></div>
      <p style="font-size:19px;margin:12px 0 4px">${lbl} of <b>${esc(x.v[0])}</b> <span class="muted" style="font-size:15px">(${esc(x.v[3])})</span>${x.col===2?` <span class="muted" style="font-size:15px">· I have ___</span>`:""}</p>
      <div class="irr-modes" style="grid-template-columns:1fr 1fr;margin:10px 0">${x.o.map(o=>{ const right=x.a.includes(o); const st=ans==null?"":right?' style="opacity:1;border-color:var(--green);background:var(--green-soft)"':o===ans?' style="opacity:1;border-color:var(--red);background:var(--red-soft)"':""; return `<button type="button" class="irr-mode" data-irrpick="${esc(o)}"${ans!=null?" disabled":""}${st}><b style="font-size:17px;margin:auto">${esc(o)}</b></button>`; }).join("")}</div>
      ${ans!=null?`<div class="irr-row"><span>${x.a.includes(ans)?"✓ Right!":"✗ It's <b>"+esc(x.a.join(" / "))+"</b>"} · <span class="muted">${esc(x.v[0])} → ${esc(x.v[1])} → ${esc(x.v[2])}</span></span><button type="button" class="pill-btn" data-irrnext>Next →</button></div>`:""}</div>`;
  }
  document.addEventListener("click",e=>{
    const t=e.target.closest("[data-irrset],[data-irrmode],[data-irrflip],[data-irrans],[data-irrskip],[data-irrgo],[data-irrpick],[data-irrnext],[data-irrsay]"); if(!t||!t.closest('.pr-panel[data-pp="irr"]')) return;
    if(t.dataset.irrset){ set=t.dataset.irrset; LSs("ncs-irrset",set); start(mode==="review"?"cards":mode); return; }
    if(t.dataset.irrmode){ start(t.dataset.irrmode); return; }
    if(t.dataset.irrgo){ start(t.dataset.irrgo); return; }
    if(t.hasAttribute("data-irrflip")){ flip=!flip; drawCard(); return; }
    if(t.dataset.irrans!=null){ const ok=t.dataset.irrans==="1"; mark(deck[di],ok); tally[ok?"k":"m"]++; di++; flip=false; drawCard(); hub(); return; }
    if(t.hasAttribute("data-irrskip")){ di++; flip=false; drawCard(); return; }
    if(t.dataset.irrsay){ try{ const u=new SpeechSynthesisUtterance(t.dataset.irrsay); u.lang="en-US"; u.rate=.9; speechSynthesis.cancel(); speechSynthesis.speak(u); }catch(er){} return; }
    if(t.dataset.irrpick!=null&&quiz&&quiz.picked==null){ const x=quiz.qs[quiz.i]; quiz.picked=t.dataset.irrpick; const ok=x.a.includes(quiz.picked); if(ok) quiz.score++; mark(x.v[0],ok); drawQuiz(); hub(); return; }
    if(t.hasAttribute("data-irrnext")&&quiz){ quiz.i++; quiz.picked=null; drawQuiz(); return; }
  });
  /* the writing drill counts too: both forms right = right, anything else = one to review */
  const form=document.getElementById("qzForm"); let lastV="";
  if(form) form.addEventListener("submit",()=>{ setTimeout(()=>{ const p=document.getElementById("qzPast"), pp=document.getElementById("qzPP"), w=(document.getElementById("qzVerb")||{}).textContent;
    if(!p||!p.className||!w||w===lastV||!BY[w]) return; lastV=w; mark(w,p.className==="right"&&pp.className==="right"); hub(); },0); });
  const nx=document.getElementById("qzNext"); if(nx) nx.addEventListener("click",()=>{ lastV=""; });
  const sh=document.getElementById("qzShow"); if(sh) sh.addEventListener("click",()=>{ const w=(document.getElementById("qzVerb")||{}).textContent; if(BY[w]&&w!==lastV){ lastV=w; mark(w,false); hub(); } });
  /* open it from anywhere (the Irregular verbs page buttons) */
  window.__irrGo=function(m){ if(window.csPractice) window.csPractice("irr"); setTimeout(()=>start(m||"cards"),30); };
  function init(){ if(!document.getElementById("irrHub")) return; hub(); start("cards"); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
  document.addEventListener("cs-synced",()=>hub());
})();
</script>
'''
_js = _js.replace('__IRR__', _json.dumps(_irr, ensure_ascii=False)).replace('__ESS__', _json.dumps(_ESS))
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
# word pack lists: word on the left, small buttons on the right, nothing wraps into a mess
_k = s.index('</style>'); s = s[:_k] + '''
.vs-item-top{align-items:flex-start}
.vs-item-top b{flex:1 1 auto;min-width:0;overflow-wrap:anywhere;padding-top:4px}
.vs-item-top .note-actions{flex:none;flex-wrap:nowrap;gap:6px;margin:0}
.vs-item-top .swap{padding:6px 10px;font-size:13px;white-space:nowrap}
''' + s[_k:]
R('''plus a <b>Verb tenses</b> folder (present simple, past simple, present perfect), in stages from easy to harder.''', '''plus a <b>Verb tenses</b> folder (present simple, past simple, present perfect), in stages from easy to harder. <b>🔁 Irregular verbs</b> has flashcards, a quiz, a writing drill and a review of the ones you missed.''')
