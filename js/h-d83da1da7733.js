
/* English for Specific Purposes → 🎤 Practice interview (Nov 21 2026)
   Real interview questions, sentence starters, the student writes an answer and Hibi's AI checks the ENGLISH only (never the content).
   Answers + feedback are kept in ncs-intv (synced like the other ncs- keys). Shown from the Practice tab: #quiz/specific-purposes/practice-interview */
(function(){
  const Q=[
    {k:"about", q:"Tell me about yourself.", es:"Háblame de ti.", s:["I'm a … with … years of experience in …","Currently, I work as …","I've been working in … since …","I'm especially interested in …"]},
    {k:"why", q:"Why do you want to work here?", es:"¿Por qué quieres trabajar aquí?", s:["I'm really interested in …","What attracts me to this role is …","I'd love to be part of a team that …","I believe I could contribute by …"]},
    {k:"strength", q:"What are your main strengths?", es:"¿Cuáles son tus principales fortalezas?", s:["One of my main strengths is …","I'm good at …","I work well under pressure. For example, …","My colleagues would describe me as …"]},
    {k:"weak", q:"What is your biggest weakness?", es:"¿Cuál es tu mayor debilidad?", s:["Sometimes I find it hard to …","I tend to …, but I'm learning to …","I've been working on …","To improve this, I …"]},
    {k:"challenge", q:"Tell me about a challenge you faced at work and how you handled it.", es:"Cuéntame de un desafío en el trabajo y cómo lo manejaste.", s:["At the time, I was working as …","We had a problem: …","First, I … Then, I …","As a result, …"]},
    {k:"team", q:"Tell me about a time you worked in a team.", es:"Cuéntame de una vez que trabajaste en equipo.", s:["In my last job, I worked with …","My role in the team was to …","We had to … by …","In the end, we …"]},
    {k:"five", q:"Where do you see yourself in five years?", es:"¿Dónde te ves en cinco años?", s:["In five years, I'd like to …","I see myself …ing …","I'm hoping to …","Long term, my goal is to …"]},
    {k:"leave", q:"Why are you leaving your current job?", es:"¿Por qué dejas tu trabajo actual?", s:["I've learned a lot in my current job, but …","I'm looking for a new challenge where …","I'd like to grow in …","I'm ready to take on more …"]},
    {k:"if", q:"What would you do if you disagreed with your manager?", es:"¿Qué harías si no estuvieras de acuerdo con tu jefe?", s:["If I disagreed with my manager, I would …","First, I would …","I'd try to understand …","In the end, I would …"]},
    {k:"pressure", q:"How do you handle stress and tight deadlines?", es:"¿Cómo manejas el estrés y los plazos ajustados?", s:["When I have a tight deadline, I …","I usually start by …","For example, last year …","This helps me …"]},
    {k:"achieve", q:"What is an achievement you're proud of?", es:"¿De qué logro estás orgulloso?", s:["I'm really proud of …","In my last job, I managed to …","We increased … by …%","It taught me …"]},
    {k:"ask", q:"Do you have any questions for us?", es:"¿Tienes alguna pregunta para nosotros?", s:["Yes, thank you. Could you tell me what … looks like?","I'd like to know how the team …","I was wondering if …","What do you enjoy most about …?"]}
  ];
  const K="ncs-intv";
  const get=()=>{ try{ const v=JSON.parse(localStorage.getItem(K)||"{}"); return v&&typeof v==="object"?v:{}; }catch(e){ return {}; } };
  const put=v=>{ try{ localStorage.setItem(K,JSON.stringify(v)); window.__csOnSet&&window.__csOnSet(K); }catch(e){} };
  const toJSON=t=>{ const m=String(t||"").match(/\{[\s\S]*\}/); return m?JSON.parse(m[0]):null; };
  const say=m=>{ if(typeof window.toast==="function") window.toast(m); };
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let i=0, fb=null, busy=false;
  const area=()=>document.getElementById("intvArea");
  const lvl=()=>{ try{ const L=window.csLevel&&window.csLevel(); return (L&&L.lv)||"B1"; }catch(e){ return "B1"; } };
  function sub(){ const t=document.getElementById("prIntvSub"); if(!t) return; const n=Object.keys(get().a||{}).length; t.textContent=n?n+(n===1?" answer checked":" answers checked")+" · keep going":"Write your answers, get feedback"; }
  function render(){ const box=area(); if(!box) return; sub();
    const d=get(), q=Q[i], saved=(d.a||{})[q.k];
    box.innerHTML='<div class="card intv-q"><div class="intv-top"><span class="intv-n">Question '+(i+1)+' of '+Q.length+'</span><span class="note-actions" style="margin:0"><button class="swap" type="button" data-intv="prev"'+(i?"":" disabled")+'>← Back</button><button class="swap" type="button" data-intv="skip">'+(i<Q.length-1?"Next question →":"First question ↺")+'</button></span></div>'+
      '<p class="intv-ask">'+esc(q.q)+'</p><p class="esb" style="margin:-6px 0 0">'+esc(q.es)+'</p>'+
      '<div><button class="swap" type="button" data-intv="say">🔊 Hear the question</button></div>'+
      '<div><p class="muted" style="margin:0 0 6px;font-size:14px">Need a start? Tap one:</p><div class="intv-starts">'+q.s.map((s,j)=>'<button type="button" data-intvs="'+j+'">'+esc(s)+'</button>').join("")+'</div></div>'+
      '<textarea id="intvTxt" placeholder="Write your answer in English, like you would say it (3 to 6 sentences is perfect)." aria-label="Your answer">'+esc(fb&&fb.k===q.k?fb.txt:saved?saved.txt:"")+'</textarea>'+
      '<div class="note-actions" style="margin:0"><button class="pill-btn pill-green" type="button" data-intv="check"'+(busy?" disabled":"")+'>'+(busy?"Checking your English…":"✨ Check my English")+'</button></div>'+
      '<div id="intvFb">'+(fb&&fb.k===q.k?fbHTML(fb.r):saved&&saved.r?'<p class="muted" style="margin:0 0 6px">Your last check ('+new Date(saved.t).toLocaleDateString("en-US",{month:"short",day:"numeric"})+'):</p>'+fbHTML(saved.r):"")+'</div></div>'+
      listHTML(d);
  }
  function fbHTML(r){ if(!r) return "";
    return '<div class="intv-fb">'+(r.good?'<p class="intv-good">👍 '+esc(r.good)+'</p>':"")+
      ((r.fixes||[]).length?'<h3>Fix these</h3>'+r.fixes.map(f=>'<div class="intv-fix"><s>'+esc(f.from)+'</s> → <b>'+esc(f.to)+'</b>'+(f.why?'<br><span class="muted" style="font-size:13.5px">'+esc(f.why)+'</span>':"")+'</div>').join(""):'<p class="intv-good">✓ No grammar mistakes. Nice!</p>')+
      (r.better?'<h3>A more natural version</h3><div class="intv-better">'+esc(r.better)+'</div><div class="note-actions" style="margin:0"><button class="swap" type="button" data-intv="say-better">🔊 Listen</button><button class="swap" type="button" data-intv="copy">Copy</button></div>':"")+
      ((r.phrases||[]).length?'<h3>Useful phrases for this answer</h3><div class="note-actions" style="margin:0;flex-wrap:wrap">'+r.phrases.map((p,j)=>'<button class="swap" type="button" data-intvp="'+j+'" title="Save to My notebook">+ '+esc(p)+'</button>').join("")+'</div>':"")+'</div>'; }
  function listHTML(d){ const a=d.a||{}, ks=Q.filter(q=>a[q.k]);
    return ks.length?'<details class="card" style="margin-top:14px"><summary><b>📁 My answers</b> ('+ks.length+')</summary><div class="intv-list">'+ks.map(q=>'<details><summary>'+esc(q.q)+'</summary><p style="margin:8px 0 0">'+esc((a[q.k].r&&a[q.k].r.better)||a[q.k].txt)+'</p><button class="swap" type="button" data-intvgo="'+q.k+'" style="margin-top:8px">Practice it again</button></details>').join("")+'</div></details>':""; }
  async function check(){ const t=document.getElementById("intvTxt"), txt=(t&&t.value||"").trim(), q=Q[i];
    if(txt.split(/\s+/).length<5){ say("Write at least one full sentence first 🙂"); return; }
    if(typeof window.__csSample!=="function"){ say("The English check isn't available right now. Try again in a minute."); return; }
    busy=true; fb={k:q.k,txt,r:null}; render();
    const p="You are an English coach for a Spanish-speaking adult (level about "+lvl()+") practicing for a job interview in English.\n"+
      "Interview question: \""+q.q+"\"\nTheir answer: \""+txt.replace(/"/g,"'")+"\"\n\n"+
      "Check ONLY the English: grammar, word choice, Spanglish (false friends, Spanish word order), natural and professional phrasing. Do NOT judge or change the content, the facts, the job, or whether it's a good answer for the interview. Keep their ideas.\n"+
      "Reply with ONLY JSON: {\"good\":\"one short, specific compliment about their English\",\"fixes\":[{\"from\":\"exact words they wrote\",\"to\":\"corrected words\",\"why\":\"very short reason in simple English\"}],\"better\":\"their same answer rewritten in natural, professional English at about "+lvl()+" level, same ideas, similar length\",\"phrases\":[\"2 or 3 useful interview phrases they could reuse, each under 8 words\"]}\n"+
      "Max 6 fixes, the most important ones. If there are no mistakes, use an empty fixes list.";
    let r=null; try{ const res=await window.__csSample(p); r=toJSON(res&&res.text); }catch(e){ console.warn("intv",e); }
    busy=false;
    if(!r||typeof r!=="object"||Array.isArray(r)){ fb=null; render(); const t2=document.getElementById("intvTxt"); if(t2) t2.value=txt; say("Couldn't check it this time. Try again."); return; }
    r.fixes=(Array.isArray(r.fixes)?r.fixes:[]).filter(f=>f&&f.from&&f.to).slice(0,6); r.phrases=(Array.isArray(r.phrases)?r.phrases:[]).map(String).slice(0,3);
    fb={k:q.k,txt,r}; const d=get(); d.a=d.a||{}; d.a[q.k]={txt,r,t:Date.now()}; put(d);
    render(); document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:10,perfect:false,finished:false,mod:"intv"}}));
    /* weekly goal: each question checked counts as one round, once per question per week (Nov 22 2026 sweep) */
    try{ const mon=new Date(); mon.setHours(0,0,0,0); mon.setDate(mon.getDate()-((mon.getDay()+6)%7)); const wk=mon.toISOString().slice(0,10);
      let g=JSON.parse(localStorage.getItem("ncs-intv-wk")||"{}"); if(g.w!==wk) g={w:wk,ks:[]};
      if(!g.ks.includes(q.k)){ g.ks.push(q.k); localStorage.setItem("ncs-intv-wk",JSON.stringify(g)); if(typeof window.__prBumpWeek==="function") window.__prBumpWeek(); } }catch(e){}
    const f=document.getElementById("intvFb"); if(f) f.scrollIntoView({behavior:"smooth",block:"nearest"}); }
  document.addEventListener("click",e=>{ const box=area(); if(!box||!box.contains(e.target)&&!e.target.closest('[data-pp="intv"]')) return;
    const s=e.target.closest("[data-intvs]"); if(s){ const t=document.getElementById("intvTxt"); if(t){ const v=Q[i].s[+s.dataset.intvs].split("…")[0].trimEnd()+" "; t.value=(t.value.trim()?t.value.trim()+" ":"")+v; t.focus(); t.setSelectionRange(t.value.length,t.value.length); } return; }
    const ph=e.target.closest("[data-intvp]"); if(ph&&fb&&fb.r){ const w=fb.r.phrases[+ph.dataset.intvp]; if(w&&window.csAddWord&&window.csAddWord(w,"","")){ ph.textContent="✓ Saved"; ph.disabled=true; } return; }
    const g=e.target.closest("[data-intvgo]"); if(g){ const j=Q.findIndex(q=>q.k===g.dataset.intvgo); if(j>=0){ i=j; fb=null; render(); window.scrollTo({top:0,behavior:"smooth"}); } return; }
    const b=e.target.closest("[data-intv]"); if(!b) return; const a=b.dataset.intv;
    if(a==="check"){ if(!busy) check(); return; }
    if(a==="skip"){ i=(i+1)%Q.length; fb=null; render(); return; }
    if(a==="prev"){ i=Math.max(0,i-1); fb=null; render(); return; }
    if(a==="say"){ if(window.csSpeak) window.csSpeak(Q[i].q); return; }
    if(a==="say-better"){ if(window.csSpeak&&fb&&fb.r) window.csSpeak(fb.r.better); else { const d=get(), s2=(d.a||{})[Q[i].k]; if(window.csSpeak&&s2&&s2.r) window.csSpeak(s2.r.better); } return; }
    if(a==="copy"){ const d=get(), s2=(fb&&fb.r)||(((d.a||{})[Q[i].k]||{}).r); if(s2&&navigator.clipboard) navigator.clipboard.writeText(s2.better).then(()=>say("Copied")).catch(()=>{}); return; }
  });
  window.__intvRender=()=>{ fb=null; render(); };
  /* opened straight from a link (#quiz/specific-purposes/practice-interview) before this script loaded */
  const init=()=>{ sub(); const pn=document.querySelector('#v-quiz [data-pp="intv"]'); if(pn&&!pn.hidden&&area()&&!area().innerHTML) render(); };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init(); setTimeout(init,1500);
})();
