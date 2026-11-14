/* ---------- look up any word: double-click (computer) or press and hold (phone) ---------- */
(function(){
  const on=()=>{ try{ return !window.csComfort||window.csComfort.get().lookup!==false; }catch(e){ return true; } };
  const fine=matchMedia("(pointer:fine)").matches;
  const cache={};
  let box=null, cur="";
  function skip(el){ return !el||!!el.closest("input,textarea,select,button,a,[contenteditable=true],.lk-box,.cs-panel,.music-panel,.bd-modal,.bd-bub,.qa,#welcome,#whatsnew,.cs-dlg,.flashcard,.park-b,nav.side,header.top"); }
  function pickText(){
    const sel=window.getSelection(); if(!sel||sel.isCollapsed) return null;
    /* snap to whole words, so "Looking forwar" becomes "Looking forward" */
    let raw=String(sel.toString());
    try{ const rg=sel.getRangeAt(0).cloneRange(), L=/[\p{L}'’-]/u;
      if(rg.startContainer.nodeType===3){ const tx=rg.startContainer.nodeValue; let i=rg.startOffset; while(i>0&&L.test(tx[i-1])) i--; rg.setStart(rg.startContainer,i); }
      if(rg.endContainer.nodeType===3){ const tx=rg.endContainer.nodeValue; let j=rg.endOffset; while(j<tx.length&&L.test(tx[j])) j++; rg.setEnd(rg.endContainer,j); }
      raw=rg.toString(); }catch(e){}
    const t=raw.replace(/\s+/g," ").trim().replace(/^[^\p{L}']+|[^\p{L}']+$/gu,"");
    if(!t||t.length>40||t.split(" ").length>4||!/\p{L}/u.test(t)) return null;
    const node=sel.anchorNode&&(sel.anchorNode.nodeType===1?sel.anchorNode:sel.anchorNode.parentElement);
    if(skip(node)) return null;
    let r=null; try{ r=sel.getRangeAt(0).getBoundingClientRect(); }catch(e){}
    const ctx=(node&&node.closest("p,li,td,.ps-sent,.vs-ex,div")||{}).textContent||"";
    return {t, r, ctx:ctx.replace(/\s+/g," ").trim().slice(0,220)};
  }
  let chip=null;
  function closeChip(){ if(chip){ chip.remove(); chip=null; } }
  function close(){ closeChip(); if(box){ box.remove(); box=null; cur=""; } }
  /* drag across a few words: offer a small "Look up" button (it doesn't open by itself, so copying still works) */
  function offer(p){
    closeChip(); if(!on()) return;
    chip=document.createElement("button"); chip.type="button"; chip.className="lk-chip"; chip.innerHTML="🔎 Look up <b>"+esc(p.t.length>24?p.t.slice(0,22)+"…":p.t)+"</b>";
    document.body.appendChild(chip);
    const r=p.r, w=chip.offsetWidth; chip.style.left=Math.max(8,Math.min(innerWidth-w-8,(r?r.left+r.width/2:innerWidth/2)-w/2))+"px"; chip.style.top=Math.max(8,(r?r.top:100)-chip.offsetHeight-8)+"px";
    chip.addEventListener("mousedown",e=>e.preventDefault());
    chip.addEventListener("click",e=>{ e.stopPropagation(); closeChip(); open(p); });
  }
  function place(r){
    if(!box) return; const w=Math.min(320,innerWidth-24); box.style.width=w+"px";
    let x=r?Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2)):(innerWidth-w)/2, y=r?r.bottom+10:120;
    box.style.left=x+"px"; box.style.top=y+"px";
    requestAnimationFrame(()=>{ if(!box) return; const h=box.offsetHeight; if(y+h>innerHeight-12&&r) box.style.top=Math.max(12,r.top-h-10)+"px"; });
  }
  function paint(d){
    if(!box) return;
    const have=(LS.get("ncs-words",[])||[]).some(x=>norm(x.w)===norm(d.w||cur));
    box.innerHTML='<button class="lk-x" type="button" aria-label="Close" data-lkx>×</button><div class="lk-w">'+esc(d.w||cur)+(d.pos?' <span class="pos">'+esc(d.pos)+'</span>':"")+'</div>'+
      (d.loading?'<p class="muted lk-p">Looking it up…</p>':
       d.err?'<p class="muted lk-p">'+esc(d.err)+'</p>':
       (d.meaning?'<p class="lk-p">'+esc(d.meaning)+'</p>':"")+(d.es?'<p class="lk-es">🇪🇸 '+esc(d.es)+'</p>':"")+(d.ex?'<p class="lk-ex">“'+esc(d.ex)+'”</p>':""))+
      '<div class="lk-acts">'+(have?'<span class="lk-have">✓ In My words</span>':'<button class="pill-btn pill-green" type="button" data-lksave>+ Save to My words</button>')+
      (window.csSpeak?'<button class="swap" type="button" data-lksay aria-label="Listen">🔊</button>':"")+
      '<a class="swap" href="https://www.wordreference.com/es/translation.asp?tranword='+encodeURIComponent(d.w||cur)+'" target="_blank" rel="noopener">WordReference ↗</a></div>';
    box._d=d;
  }
  async function open(p){
    if(!on()) return;
    close(); cur=p.t;
    box=document.createElement("div"); box.className="lk-box card"; box.setAttribute("role","dialog"); box.setAttribute("aria-label","Word lookup");
    document.body.appendChild(box); place(p.r);
    if(window.csUse) csUse("lookup");
    const key=p.t.toLowerCase();
    if(cache[key]){ paint(cache[key]); place(p.r); return; }
    if(!window.__csSample){ paint({w:p.t, err:"The dictionary needs internet right now. You can still save the word."}); place(p.r); return; }
    paint({w:p.t, loading:true}); place(p.r);
    const prompt="A Spanish-speaking (Chilean) English learner selected this word or expression on an English learning website: \""+p.t+"\". The sentence around it: \""+p.ctx+"\".\n"+
      "If it's English, explain it as used in that sentence. IMPORTANT: if the selected word is part of a phrasal verb, idiom or fixed expression in that sentence (for example \"figure\" in \"I can't figure out the answer\", or \"look\" in \"I'm looking forward to it\"), explain the WHOLE expression (\"figure out\", \"look forward to\") and use it as w. If it's Spanish, give the English for it.\n"+
      "Reply with ONLY a JSON object, no code fences: {\"w\": \"the English word or expression in its dictionary form (e.g. 'go' for 'went')\", \"pos\": \"noun, verb, adjective, phrasal verb, expression…\", \"meaning\": \"a short, simple English definition (A2-B1 level, max 15 words)\", \"es\": \"a natural Spanish translation\", \"ex\": \"a short, natural example sentence\"}";
    try{
      const r=await window.__csSample(prompt,{modelTier:"quick"});
      let j=null; try{ j=JSON.parse(String(r.text||"").replace(/^[^{]*/,"").replace(/[^}]*$/,"")); }catch(e){}
      if(!j||!j.meaning) throw new Error("bad");
      j.w=String(j.w||p.t).trim(); cache[key]=j; if(cur===p.t){ paint(j); place(p.r); }
    }catch(e){ if(cur===p.t){ paint({w:p.t, err:"Couldn't look it up right now. Try again in a moment."}); } }
  }
  if(fine){
    document.addEventListener("dblclick",e=>{ if(skip(e.target)) return; closeChip(); setTimeout(()=>{ const p=pickText(); if(p) open(p); },10); });
    document.addEventListener("mouseup",e=>{ if(e.detail>1||skip(e.target)||e.target.closest(".lk-chip")) return; setTimeout(()=>{ const p=pickText(); if(p&&p.t.includes(" ")) offer(p); else closeChip(); },10); });
  } else {
    let st=null;
    document.addEventListener("selectionchange",()=>{ clearTimeout(st); st=setTimeout(()=>{ const p=pickText(); if(p&&p.t!==cur) open(p); },700); });
  }
  document.addEventListener("click",e=>{
    if(chip&&!e.target.closest(".lk-chip")){ const sel=window.getSelection(); if(!sel||sel.isCollapsed) closeChip(); }
    if(!box) return;
    if(e.target.closest("[data-lkx]")){ close(); return; }
    if(e.target.closest("[data-lksay]")){ const d=box._d||{}; if(window.csSpeak) csSpeak(d.w||cur); return; }
    if(e.target.closest("[data-lksave]")){ const d=box._d||{}; if(typeof addWord==="function"&&addWord(d.w||cur,d.es||"",d.ex||"")){ paint(d); } return; }
    if(!e.target.closest(".lk-box")) close();
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&box) close(); });
  window.addEventListener("scroll",()=>{ if((box||chip)&&fine) close(); },{passive:true});
})();
