/* ---------- My notebook: class notes grouped by week, summarized by AI ---------- */
(function(){
  const box=document.getElementById("nbList"), monthBox=document.getElementById("nbMonth"), monthBtn=document.getElementById("nbMonthBtn"), aiMsg=document.getElementById("nbAiMsg");
  if(!box) return;
  const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const pad=n=>String(n).padStart(2,"0");
  const ymd=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  function weekStart(t){ const d=new Date(t); d.setHours(0,0,0,0); const wd=(d.getDay()+6)%7; d.setDate(d.getDate()-wd); return d; }
  function hash(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0; return String(h); }
  let sums=LS.get("ncs-nbsum",{}); if(!sums||typeof sums!=="object") sums={};
  const busy=new Set();
  const aiReady=()=>!!window.__csSample;
  const notes=()=>(LS.get("ncs-classnotes",[])||[]).filter(n=>n&&n.text&&String(n.text).trim());
  function groups(){
    const g={};
    notes().forEach(n=>{ const ws=weekStart(n.t||Date.now()), k=ymd(ws); (g[k]=g[k]||{key:k,start:ws,list:[]}).list.push(n); });
    return Object.values(g).sort((a,b)=>b.start-a.start).map(x=>{ x.list.sort((a,b)=>(a.t||0)-(b.t||0)); return x; });
  }
  const rangeTxt=ws=>{ const e=new Date(ws); e.setDate(e.getDate()+6); return ws.getMonth()===e.getMonth()? MON[ws.getMonth()]+" "+ws.getDate()+"–"+e.getDate() : MON[ws.getMonth()]+" "+ws.getDate()+" – "+MON[e.getMonth()]+" "+e.getDate(); };
  const dayTxt=t=>{ const d=new Date(t); return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]+" "+MON[d.getMonth()]+" "+d.getDate(); };
  const notesText=list=>list.map(n=>"["+dayTxt(n.t)+"]\n"+String(n.text).trim()).join("\n\n");
  function prompt(label,list){
    return "You are helping a Spanish-speaking student of English (level B1 to B2) review their own class notes from their English coach, Noa. "+
    "Below are the notes from "+label+". Write a short, clean study summary in English, speaking directly to the student (\"you\"). Use simple, friendly English. "+
    "Use exactly these sections, in this order, and skip a section if the notes have nothing for it:\n"+
    "## Main topics\n- (one short line per topic)\n## Corrections to remember\n- wrong → right (very short reason)\n## New words & expressions\n- expression — meaning in Spanish\n## Practice next\n- one or two small, practical suggestions\n\n"+
    "Rules: under 180 words. Only use information that is in the notes, never invent examples or facts. Fix spelling mistakes in the notes. If a correction is about the past simple (was/were, didn't + verb, Did…? questions, -ed endings or irregular past verbs), end its reason with \"(past simple)\". If it is about the present perfect (have/has + participle, for/since, ever/never/already/yet/just, or present perfect vs past simple), end its reason with \"(present perfect)\". No introduction, no closing sentence, no bold titles other than the ## headings.\n\nNOTES:\n"+notesText(list);
  }
  /* which past simple stage fits a correction line (0 = not past simple) */
  function ppStage(t){
    if(!/present perfect/i.test(t)) return 0; const l=t.toLowerCase();
    if(/\b(since|for)\b/.test(l)) return 5;
    if(/\b(ever|never|already|yet|just)\b/.test(l)) return 4;
    if(/\b(haven't|hasn't|have you|has (he|she|it)|have they)\b/.test(l)) return 3;
    if(/\b(yesterday|last|ago|past simple)\b/.test(l)) return 6;
    return 2;
  }
  function psStage(t){
    const ps=/past simple|past tense/i.test(t), l=t.toLowerCase();
    if(/\b(was|were|wasn't|weren't)\b/.test(l)&&(ps||/\bwas (go|went|eat|ate|have|had)\b/.test(l))) return 3;
    if(/\bdid(n't| not)\b/.test(l)) return 4;
    if(/\bdid (you|he|she|they|we|i|it)\b/.test(l)) return 5;
    if(!ps) return 0;
    if(/\b\w+(ed)\b/.test(l)&&/(ed\b|-ed|regular)/.test(l)&&!/irregular/.test(l)) return 1;
    if(/irregular/.test(l)) return 2;
    return 6;
  }
  function render(md){
    let html="", inList=false, sec="";
    const inline=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
    String(md||"").split("\n").forEach(raw=>{
      const line=raw.trim(); if(!line) return;
      if(/^#{1,4}\s/.test(line)){ if(inList){ html+="</ul>"; inList=false; } sec=line.replace(/^#+\s*/,""); html+="<h4>"+inline(sec)+"</h4>"; return; }
      if(/^[-*•]\s+/.test(line)){
        const t=line.replace(/^[-*•]\s+/,"");
        if(!inList){ html+="<ul>"; inList=true; }
        let extra="";
        if(/words|expressions/i.test(sec)){ const m=t.split(/\s+[—–-]\s+/); if(m.length>=2&&m[0].length<60){ const w=m[0].replace(/\*\*/g,"").replace(/^["“]|["”]$/g,"").trim(), mean=m.slice(1).join(" - ").replace(/\*\*/g,"").trim(); extra=' <button class="nb-add" type="button" data-w="'+esc(w)+'" data-m="'+esc(mean)+'">+ save</button>'; } }
        if(/correction/i.test(sec)){ const pp=ppStage(t); const st=pp?0:psStage(t); if(pp) extra+=' <button class="nb-prac" type="button" data-psgo="'+pp+'" data-psmod="pp" title="Practice the present perfect">Practice this →</button>'; else if(st) extra+=' <button class="nb-prac" type="button" data-psgo="'+st+'" title="Practice the past simple">Practice this →</button>'; }
        html+="<li>"+inline(t)+extra+"</li>"; return;
      }
      if(inList){ html+="</ul>"; inList=false; }
      html+="<p>"+inline(line)+"</p>";
    });
    if(inList) html+="</ul>";
    return html;
  }
  const errs={};
  async function summarize(key,label,list,auto){
    if(!aiReady()){ errs[key]="The AI isn't available right now. Refresh the page and try again."; paint(); return; }
    if(busy.has(key)) return;
    busy.add(key); delete errs[key]; paint();
    try{
      const r=await window.__csSample(prompt(label,list));
      const txt=(r&&r.text||"").trim();
      if(txt){ sums[key]={h:hash(notesText(list)),s:txt,at:Date.now()}; LS.set("ncs-nbsum",sums); }
      else errs[key]="The AI sent back an empty answer. Try again in a minute.";
    }catch(e){ console.warn("summary failed",e); errs[key]=(e&&e.code==="timeout")?"The AI took too long. Try again in a minute.":"Couldn't make the summary right now ("+String((e&&(e.code||e.message))||"error").slice(0,60)+"). Try again in a minute."; }
    busy.delete(key); paint();
  }
  function card(g,i){
    const key="w-"+g.key, s=sums[key], h=hash(notesText(g.list)), fresh=s&&s.h===h, label="the week of "+rangeTxt(g.start);
    const head='<div class="nb-head"><h3>'+(i===0&&weekStart(Date.now()).getTime()===g.start.getTime()?"This week · ":"")+rangeTxt(g.start)+'</h3><span class="count">'+g.list.length+(g.list.length===1?" note":" notes")+'</span></div>';
    let body;
    if(busy.has(key)) body='<div class="nb-sum nb-loading">✨ Writing your summary…</div>';
    else if(s) body='<div class="nb-sum">'+render(s.s)+'</div>'+(fresh?"":'<p class="nb-stale">You added or changed notes since this summary. <button class="foot-link" type="button" data-nbsum="'+key+'">Update summary</button></p>');
    else if(errs[key]) body='<p class="nb-err" role="alert">'+esc(errs[key])+'</p><button class="pill-btn" type="button" data-nbsum="'+key+'">Try again</button>';
    else body= aiReady()? '<button class="pill-btn pill-green" type="button" data-nbsum="'+key+'">✨ Summarize this week</button>' : '<p class="muted" style="margin:0">Summaries will appear here when the AI is available.</p>';
    const orig='<details class="nb-orig"><summary>My notes ('+g.list.length+')</summary>'+g.list.map(n=>'<div class="nb-note"><div class="nb-day">'+dayTxt(n.t)+'</div><div class="nb-txt">'+esc(n.text)+'</div></div>').join("")+'</details>';
    return '<article class="card nb-week">'+head+body+orig+'</article>';
  }
  let G=[];
  function paint(){
    G=groups();
    aiMsg.hidden=aiReady();
    if(!G.length){ box.innerHTML='<div class="card empty-notes"><b>No class notes yet.</b><br>Save notes on your Home page or in <b>My class notes</b>, and they\'ll show up here, grouped by week with a summary.</div>'; monthBtn.hidden=true; monthBox.innerHTML=""; return; }
    monthBtn.hidden=!aiReady();
    box.innerHTML=G.map(card).join("");
    const mk="m-30", ms=sums[mk];
    monthBox.innerHTML= busy.has(mk)? '<article class="card nb-week nb-monthcard"><div class="nb-sum nb-loading">✨ Writing a summary of your last 30 days… (this can take up to 20 seconds)</div></article>'
      : errs[mk]? '<p class="nb-err" role="alert">'+esc(errs[mk])+'</p>'
      : ms? '<article class="card nb-week nb-monthcard"><div class="nb-head"><h3>Your last 30 days</h3><button class="foot-link" type="button" id="nbMonthClose">hide</button></div><div class="nb-sum">'+render(ms.s)+'</div></article>' : "";
    monthBtn.textContent= ms? "✨ Update my 30-day summary" : "✨ Summarize my last 30 days";
  }
  function monthList(){ const c=Date.now()-30*864e5; return notes().filter(n=>(n.t||0)>=c).sort((a,b)=>(a.t||0)-(b.t||0)); }
  monthBtn.addEventListener("click",()=>{ const l=monthList(); if(!l.length){ errs["m-30"]="You don't have any class notes from the last 30 days yet."; paint(); return; } summarize("m-30","the last 30 days",l,false); });
  document.getElementById("v-notebook").addEventListener("click",e=>{
    const b=e.target.closest("[data-nbsum]"); if(b){ const k=b.dataset.nbsum, g=G.find(x=>"w-"+x.key===k); if(g) summarize(k,"the week of "+rangeTxt(g.start),g.list,false); return; }
    const a=e.target.closest(".nb-add"); if(a){ if(addWord(a.dataset.w,a.dataset.m)){ a.textContent="✓ saved"; a.disabled=true; } return; }
    if(e.target.closest("#nbMonthClose")){ const mk="m-30"; delete sums[mk]; LS.set("ncs-nbsum",sums); paint(); }
  });
  function onOpen(){
    sums=LS.get("ncs-nbsum",{})||{}; paint();
    // write the newest week's summary automatically (one per visit, to keep it light)
    const g=G[0]; if(g&&aiReady()){ const k="w-"+g.key, s=sums[k]; if(!s||s.h!==hash(notesText(g.list))) summarize(k,"the week of "+rangeTxt(g.start),g.list,true); }
  }
  const v=document.getElementById("v-notebook");
  new MutationObserver(()=>{ if(!v.hidden) onOpen(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
  window.addEventListener("cs-sample-ready",()=>{ if(!v.hidden) onOpen(); });
  if(!v.hidden) onOpen();
})();

/* ---------- Use it in a sentence (AI feedback) ---------- */
(function(){
  const card=document.getElementById("snCard"); if(!card) return;
  const wEl=document.getElementById("snWord"), mEl=document.getElementById("snMean"), ta=document.getElementById("snText"), out=document.getElementById("snOut"), go=document.getElementById("snCheck"), nx=document.getElementById("snNext"), off=document.getElementById("snOff");
  let cur=null, lastId=null;
  function pool(){ let l=[]; try{ l=typeof fcList==="function"? fcList() : allWords(); }catch(e){ l=allWords(); } l=l.filter(x=>x&&x.w); if(!l.length) l=allWords().filter(x=>x&&x.w); return l; }
  function pick(){
    const l=pool(); if(!l.length){ cur=null; wEl.textContent="Save a few words first"; mEl.textContent=""; ta.disabled=true; go.disabled=true; return; }
    /* if the student writes their own examples, words without one come first */
    const bare=l.filter(y=>!y.e||y.aiEx); const from=(typeof window.csNoEx==="function"&&window.csNoEx()&&bare.length&&Math.random()<0.75)?bare:l;
    let x=from[Math.floor(Math.random()*from.length)]; if(from.length>1&&x.id===lastId) x=from.find(y=>y.id!==lastId);
    cur=x; lastId=x.id; wEl.textContent=x.w; mEl.textContent=x.m||""; ta.value=""; ta.disabled=false; out.innerHTML=""; out.hidden=true; paintBtn();
  }
  function paintBtn(){ const ok=!!window.__csSample; go.disabled=!cur||!ok; off.hidden=ok; }
  function parse(t){ const m=String(t||"").match(/\{[\s\S]*\}/); if(!m) return null; try{ return JSON.parse(m[0]); }catch(e){ return null; } }
  go.addEventListener("click",async()=>{
    const s=ta.value.trim(); if(!cur) return; if(s.split(/\s+/).length<3){ toast("Write a full sentence with “"+cur.w+"”"); ta.focus(); return; }
    go.disabled=true; go.textContent="Checking…"; out.hidden=false; out.innerHTML='<p class="muted" style="margin:0">✨ Reading your sentence…</p>';
    const p="You are a kind, encouraging English coach for a Spanish-speaking learner (level B1 to B2). The student is practicing the word or expression \""+cur.w+"\""+(cur.m?" (meaning: "+cur.m+")":"")+".\n"+
      "Their sentence: \""+s+"\"\n\n"+
      "Check two things: 1) is \""+cur.w+"\" used with the right meaning and in a natural way, and 2) is the sentence grammatically correct? Focus on what matters for communication; don't nitpick tiny style choices.\n"+
      "Also rate how rich the sentence is FOR THIS STUDENT'S LEVEL, never in absolute terms: stars 1 = simple and clear, 2 = good for their level (some detail, a linking word, a less basic structure), 3 = ambitious for their level (an extra clause, a less common structure or precise vocabulary). A short sentence from a beginner can earn 3 if it stretches them; a C1 student needs more for 3. Be generous and never discouraging.\n"+
      "Reply with ONLY this JSON, no other text:\n{\"stars\":1 or 2 or 3,\"stretch\":\"one short tip (max 15 words) to make the next sentence a bit richer at their level, e.g. add because + a reason; empty string if stars is 3\",\"result\":\"great\" or \"almost\" or \"try_again\",\"feedback\":\"one or two short, friendly sentences in simple English, speaking to the student as you. Say what's good, and explain the main fix if there is one\",\"better\":\"a corrected or more natural version of THEIR sentence (keep their idea), or an empty string if it's already great\"}\n"+
      "Use \"try_again\" only if the word is used with the wrong meaning or the sentence is very hard to understand.";
    let r=null;
    try{ const res=await window.__csSample(p); r=parse(res&&res.text); }catch(e){ console.warn(e); }
    go.textContent="Check my sentence"; paintBtn();
    if(!r||!r.feedback){ out.innerHTML='<p style="margin:0">Couldn\'t check it right now. Try again in a minute.</p>'; return; }
    const res=String(r.result||"").toLowerCase(), tag= res==="great"?["🎉","Great!","sn-great"]: res==="almost"?["👍","Almost!","sn-almost"]:["💪","Try again","sn-try"];
    const ok=res==="great"||res==="almost", stars=ok?Math.max(1,Math.min(3,parseInt(r.stars,10)||1)):0, SL=["","Clear and correct","Good for your level","Ambitious for your level!"];
    const keep=ok?(res==="great"?s:String(r.better||"").trim()||s):"";
    out.innerHTML='<div class="sn-res '+tag[2]+'"><b>'+tag[0]+' '+tag[1]+'</b>'+(stars?'<span class="sn-stars" title="'+SL[stars]+'">'+"★".repeat(stars)+'<i>'+"★".repeat(3-stars)+'</i></span><span class="sn-sl">'+SL[stars]+'</span>':'')+'</div><p style="margin:6px 0 0">'+esc(r.feedback)+'</p>'+
      (stars&&stars<3&&r.stretch?'<p class="sn-stretch">🚀 <b>Level up:</b> '+esc(r.stretch)+'</p>':'')+
      (keep?'<div class="note-actions" style="margin-top:8px"><button class="swap" type="button" data-sn-keep>📌 Save as my example for “'+esc(cur.w)+'”</button></div>':'')+
      (r.better&&String(r.better).trim()&&res!=="great"?'<div class="sn-better"><span class="sn-lbl">Try it like this:</span> '+esc(r.better)+(canSpeak?' <button class="say" type="button" data-sn-say aria-label="Hear it">🔊</button>':'')+'</div>':'');
    const sb=out.querySelector("[data-sn-say]"); if(sb) sb.addEventListener("click",()=>say(r.better,sb));
    const kb=out.querySelector("[data-sn-keep]"); if(kb) kb.addEventListener("click",()=>{ try{ const w=words.find(y=>y.id===cur.id); if(w){ w.e=keep.slice(0,220); delete w.aiEx; w.ownEx=1; saveWordsNow(); kb.textContent="✓ Saved as your example"; kb.disabled=true; } }catch(e){ console.warn(e); } });
    if(ok) document.dispatchEvent(new CustomEvent("cs-sentence",{detail:{result:res,stars}}));
  });
  ta.addEventListener("keydown",e=>{ if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){ e.preventDefault(); go.click(); } });
  nx.addEventListener("click",pick);
  window.addEventListener("cs-sample-ready",paintBtn);
  const v=document.getElementById("v-quiz");
  new MutationObserver(()=>{ if(!v.hidden&&!cur) pick(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
  document.addEventListener("click",e=>{ if(e.target.closest("[data-fcset]")) setTimeout(pick,50); });
  pick();
})();
