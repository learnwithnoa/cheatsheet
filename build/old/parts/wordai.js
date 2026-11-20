/* ---------- level: beginner mode (more Spanish, simpler examples) ---------- */
const csBeginner=()=>LS.get("ncs-level","normal")==="beginner";
function applyLevel(){ document.documentElement.classList.toggle("cs-beginner",csBeginner()); }
applyLevel();
if(csBeginner()){ try{ fcSpanishFirst=true; }catch(e){} }
window.csSetLevel=function(on){
  LS.set("ncs-level",on?"beginner":"normal"); applyLevel();
  try{ fcSpanishFirst=!!on; fcFlipped=false; renderFlash(); }catch(e){}
  toast(on?"🌱 Modo principiante activado · Beginner mode on":"Beginner mode off");
  try{ document.dispatchEvent(new Event("cs-level")); }catch(e){}
};

/* ---------- AI helpers ---------- */
const aiOK=()=>typeof window.__csSample==="function";
function aiJSON(t){
  t=String(t||"").replace(/```(?:json)?/gi,"");
  const a=t.indexOf("["), o=t.indexOf("{");
  const s= a>=0&&(o<0||a<o) ? t.slice(a,t.lastIndexOf("]")+1) : t.slice(o,t.lastIndexOf("}")+1);
  try{ return JSON.parse(s); }catch(e){ return null; }
}
const POS_LIST=["noun","verb","adjective","adverb","phrasal verb","idiom","expression","collocation","preposition","conjunction","pronoun","interjection"];
const exampleRule=()=>csBeginner()
  ? "Example sentences: very short and simple, A1 to A2 level, 4 to 8 words, everyday topics."
  : "Example sentences: natural and useful, B1 to B2 level, 8 to 15 words.";
/* students can write their own example sentences: then the AI leaves them empty */
const noEx=()=>LS.get("ncs-noex",false)===true;
window.csNoEx=noEx;
const FILLF=["m","def","pos","e","pr"];
/* pronunciation only for single words, phrasal verbs and short expressions */
const isShort=x=>{ const w=String(x&&x.w||"").trim(); return !!w&&w.length<=32&&w.split(/\s+/).length<=3&&!/[.?!]$/.test(w); };
const fillF=()=>{ const v=LS.get("ncs-fillf",null); if(!Array.isArray(v)) return FILLF.filter(f=>f!=="e"||!noEx()); const o=v.filter(f=>FILLF.includes(f)); if(LS.get("ncs-fillf-v",0)<2&&!o.includes("pr")) o.push("pr"); return o; };
const missF=(x,fs)=>x&&x.w&&!x.sample&&fs.some(f=>f==="pr"?(isShort(x)&&!x.pr&&!x.prTried):!x[f]);
const PR_RULE="an easy pronunciation guide for a Spanish speaker: split the syllables with hyphens, write the STRESSED syllable in CAPITALS, use plain letters read the English way (no IPA symbols), keep phrasal verbs as separate words. Examples: leverage → LEV-er-ij, drawback → DRAW-bak, give up → giv UP, thought → thawt, comfortable → KUMF-ter-bul, schedule → SKEJ-ool";
const cleanPos=p=>{ p=String(p||"").toLowerCase().trim(); return POS_LIST.includes(p)?p:(p.includes("phrasal")?"phrasal verb":p.slice(0,20)); };
function saveWordsNow(){ LS.set("ncs-words",words); try{ renderWords(); fcShuffle(); renderFlash(); }catch(e){} }

/* ---------- fill in the details of each word (part of speech, meaning, translation, example) ---------- */
async function enrichBatch(list,fs){
  fs=fs||FILLF.filter(f=>f!=="e"||!noEx()); const want=f=>fs.includes(f);
  const items=list.map(x=>({id:x.id,word:x.w,spanish:x.m||"",example:x.e||"",short:isShort(x)}));
  const p="You help a Spanish-speaking learner of English (from Chile) build their vocabulary list. For EACH item return:\n"+
    (want("pos")?"- pos: the part of speech, one of: "+POS_LIST.join(", ")+"\n":"- pos: always an empty string\n")+
    (want("def")?"- def: a very short, simple English meaning (max 10 words, no quotes)\n":"- def: always an empty string\n")+
    (want("m")?"- es: a natural Spanish translation ONLY if \"spanish\" is empty, otherwise an empty string\n":"- es: always an empty string\n")+
    (!want("e")?"- ex: always an empty string (the student writes their own examples)\n":"- ex: an example sentence using the word ONLY if \"example\" is empty, otherwise an empty string. "+exampleRule()+"\n")+
    (want("pr")?"- pr: ONLY if \"short\" is true, "+PR_RULE+". If \"short\" is false: an empty string\n":"- pr: always an empty string\n")+
    "Use American English. Never change the student's word. Reply with ONLY a JSON array like [{\"id\":\"...\",\"pos\":\"...\",\"def\":\"...\",\"es\":\"...\",\"ex\":\"...\",\"pr\":\"...\"}].\n\nITEMS:\n"+JSON.stringify(items);
  const r=await window.__csSample(p);
  const arr=aiJSON(r&&r.text); if(!Array.isArray(arr)) throw new Error("The AI's answer didn't make sense");
  let n=0;
  arr.forEach(a=>{ const x=words.find(w=>w.id===a.id); if(!x) return;
    if(want("pos")&&a.pos&&!x.pos) x.pos=cleanPos(a.pos);
    if(want("def")&&a.def&&!x.def) x.def=String(a.def).trim().slice(0,140);
    if(want("m")&&!x.m&&a.es) x.m=String(a.es).trim().slice(0,140);
    if(want("e")&&!x.e&&a.ex){ x.e=String(a.ex).trim().slice(0,220); x.aiEx=1; }
    if(want("pr")&&isShort(x)&&!x.pr){ const v=String(a.pr||"").replace(/[\/\[\]]/g,"").trim().slice(0,60); if(v) x.pr=v; else x.prTried=1; }
    if(!(fs.length===1&&fs[0]==="pr")) x.ai=1; n++; });
  saveWordsNow();
  return n;
}
const needsInfo=x=>x&&x.w&&!x.sample&&(!x.pos||!x.def||!x.m||!x.e)&&!x.ai;
let enrQ=new Set(), enrT=null, enrBusy=false;
function queueEnrich(ids){ ids.forEach(i=>enrQ.add(i)); clearTimeout(enrT); enrT=setTimeout(runEnrich,2200); }
async function runEnrich(){
  if(enrBusy) return; if(!aiOK()){ return; }
  const list=[...enrQ].map(i=>words.find(w=>w.id===i)).filter(needsInfo); enrQ.clear(); if(!list.length) return;
  enrBusy=true;
  try{ for(let i=0;i<list.length;i+=20) await enrichBatch(list.slice(i,i+20)); }catch(e){ console.warn("word details",e); }
  enrBusy=false;
}
window.addEventListener("cs-sample-ready",()=>{ if(enrQ.size) runEnrich(); prBackfill(); });
/* words saved before pronunciation existed get it quietly, a few at a time */
let prRuns=0, prBusy=false;
async function prBackfill(){ if(prBusy||prRuns>=3||!aiOK()) return; const fs=fillF(); if(!fs.includes("pr")) return;
  const list=words.filter(x=>x&&!x.sample&&isShort(x)&&!x.pr&&!x.prTried).slice(0,25); if(!list.length) return;
  prBusy=true; prRuns++; try{ await enrichBatch(list,["pr"]); }catch(e){ console.warn("pronunciation",e); } prBusy=false; if(prRuns<3) setTimeout(prBackfill,4000); }
setTimeout(()=>{ if(aiOK()) prBackfill(); },6000);
/* every word added from now on gets its details */
const _addWordPlain=addWord;
addWord=function(){ const before=words.length, r=_addWordPlain.apply(this,arguments); if(words.length>before) queueEnrich([words[words.length-1].id]); return r; };
window.csAddWord=function(){ return addWord.apply(this,arguments); };

/* ---------- safety net for the AI tools: explain first, then keep an undo copy ---------- */
const UNDO_KEY="cs-words-undo";
function wordsSnapshot(what){ try{ localStorage.setItem(UNDO_KEY,JSON.stringify({t:Date.now(),what,words})); }catch(e){} showUndo(); }
function undoInfo(){ try{ const u=JSON.parse(localStorage.getItem(UNDO_KEY)||"null"); if(u&&Array.isArray(u.words)&&Date.now()-u.t<7*864e5) return u; }catch(e){} return null; }
function showUndo(){
  let b=document.getElementById("aiUndo"); const u=undoInfo(), anchor=document.getElementById("aiClean");
  if(!anchor) return;
  if(!b){ b=document.createElement("button"); b.className="swap"; b.type="button"; b.id="aiUndo"; anchor.insertAdjacentElement("afterend",b); }
  b.hidden=!u; if(u) { b.textContent="↩ Undo "+(u.what==="clean"?"clean up":"complete"); b.title="Put your words back the way they were before "+(u.what==="clean"?"🧹 Clean up my words":"✨ Complete my words")+" ("+new Date(u.t).toLocaleString()+")"; }
}
function undoWords(){
  const u=undoInfo(); if(!u){ toast("Nothing to undo"); return; }
  const d=csDialog('<h3 style="margin-top:0">↩ Undo?</h3><p>Your words go back to how they were on <b>'+esc(new Date(u.t).toLocaleString())+'</b>, before '+(u.what==="clean"?"🧹 <b>Clean up my words</b>":"✨ <b>Complete my words</b>")+'.</p><p class="muted" style="font-size:13.5px">Words you added after that stay in your list.</p><div class="note-actions"><button class="pill-btn pill-green" type="button" data-u="y">Yes, undo</button><button class="swap" type="button" data-u="n">Cancel</button></div>');
  d.el.addEventListener("click",e=>{ const b=e.target.closest("[data-u]"); if(!b) return; d.close(); if(b.dataset.u!=="y") return;
    const old=new Set(u.words.map(x=>x.id)), added=words.filter(x=>!old.has(x.id));
    words=u.words.concat(added); saveWordsNow(); try{ localStorage.removeItem(UNDO_KEY); }catch(er){} showUndo();
    const st=document.getElementById("aiStatus"); if(st){ st.hidden=false; st.textContent="↩ Undone. Your words are back the way they were."; } toast("Undone ↩"); });
}
document.addEventListener("change",e=>{ if(e.target&&e.target.id==="aiNoEx"){ LS.set("ncs-noex",!!e.target.checked); const t=document.getElementById("aiExTxt"); if(t) t.hidden=!!e.target.checked; toast(e.target.checked?"✍️ The AI won't write example sentences for you":"The AI will add example sentences again"); } });
function askFirst(title,html,go,label){
  const d=csDialog('<h3 style="margin-top:0">'+title+'</h3>'+html+'<p class="muted" style="font-size:13.5px">If you don\'t like the result, you can undo it afterwards with <b>↩ Undo</b>.</p><div class="note-actions"><button class="pill-btn pill-green" type="button" data-a="y">'+label+'</button><button class="swap" type="button" data-a="n">Cancel</button></div>');
  d.el.addEventListener("click",e=>{ const b=e.target.closest("[data-a]"); if(!b) return; const el=d.el; if(b.dataset.a==="y"&&el.querySelector("[data-opt]")&&!el.querySelector("[data-opt]:checked")){ toast("Tick at least one thing first"); return; } d.close(); if(b.dataset.a==="y") go(el); });
}
/* checklists in the AI dialogs: "Select all" + live count */
document.addEventListener("change",e=>{
  const t=e.target; if(!t||!t.closest) return; const box=t.closest(".ai-opts"); if(!box) return;
  const opts=[...box.querySelectorAll("[data-opt]")], all=box.querySelector("[data-selall]");
  if(t.hasAttribute("data-selall")) opts.forEach(o=>o.checked=t.checked);
  if(all){ const n=opts.filter(o=>o.checked).length; all.checked=n===opts.length; all.indeterminate=n>0&&n<opts.length; }
  if(box.dataset.kind==="fill"){ const fs=opts.filter(o=>o.checked).map(o=>o.value), n=words.filter(x=>missF(x,fs)).length, c=document.getElementById("aiFillN"); if(c) c.textContent=n+(n===1?" word":" words"); }
});
const optList=(kind,items,on)=>'<div class="ai-opts" data-kind="'+kind+'"><label class="cs-chk ai-all"><input type="checkbox" data-selall'+(items.every(i=>on.includes(i[0]))?' checked':'')+'> <span><b>Select all</b></span></label>'+items.map(i=>'<label class="cs-chk"><input type="checkbox" data-opt value="'+i[0]+'"'+(on.includes(i[0])?' checked':'')+'> <span><b>'+i[1]+'</b>'+(i[2]?'<small>'+i[2]+'</small>':'')+'</span></label>').join("")+'</div>';
const readOpts=el=>[...el.querySelectorAll("[data-opt]:checked")].map(o=>o.value);
const CLEANF=[["spell","Spelling","English and Spanish typos"],["caps","Capital letters & punctuation",""],["es","Wrong Spanish meanings",""],["gram","Grammar in example sentences","Sentences you wrote yourself are only suggested, never changed unless you tick them"],["miss","Missing translations & examples",""],["dups","Repeated words","The same word saved twice: keep one and combine their details"]];
const cleanF=()=>{ const v=LS.get("ncs-cleanf",null); return Array.isArray(v)?v:CLEANF.map(c=>c[0]); };
setTimeout(showUndo,0);

/* "Complete my words": fill in everything that's missing, in small batches */
async function completeAll(btn,fs){
  fs=fs||fillF();
  const list=words.filter(x=>missF(x,fs));
  const st=document.getElementById("aiStatus");
  if(!list.length){ st.hidden=false; st.textContent="✓ All your words already have their details."; return; }
  if(!aiOK()){ st.hidden=false; st.textContent="The AI is still loading. Try again in a few seconds."; return; }
  btn.disabled=true; st.hidden=false; let done=0; wordsSnapshot("complete");
  try{
    for(let i=0;i<list.length;i+=20){ st.textContent="✨ Filling in your words… "+Math.min(i,list.length)+" of "+list.length; done+=await enrichBatch(list.slice(i,i+20),fs); }
    const nm={m:"Spanish translation",def:"simple meaning",pos:"word type",e:"example sentence",pr:"pronunciation"}, li=fs.map(f=>nm[f]);
    st.textContent="✓ Done! Filled in "+(li.length>1?li.slice(0,-1).join(", ")+" and "+li[li.length-1]:li[0])+" for "+done+(done===1?" word":" words")+". Anything you wrote yourself stayed the same.";
  }catch(e){ console.warn(e); st.textContent="Stopped after "+done+" words: the AI didn't answer. Try again in a minute (it continues where it stopped)."; }
  btn.disabled=false;
}

/* ---------- add many words: paste anything ---------- */
let impFound=[];
async function aiImport(){
  const txt=(impText.value||"").trim(), pick=document.getElementById("impPick");
  if(!txt){ impPrev.textContent="Paste your words first."; impText.focus(); return; }
  if(!aiOK()){ impPrev.innerHTML="The AI isn't ready yet. Use <b>Import exactly as pasted</b> below, or try again in a few seconds."; return; }
  const b=document.getElementById("impAI"); b.disabled=true; b.textContent="✨ Reading your list…"; pick.innerHTML=""; impPrev.textContent="";
  const p="A Spanish-speaking learner of English pasted this text to add words to their vocabulary list. It can be in any format: a list, a sheet, a chat message, notes.\n"+
    "Find every English word or expression they want to learn (single words, phrasal verbs, idioms, expressions). Rules:\n"+
    "- w: the English item, lowercase unless it's a name. Fix obvious typos. If they only wrote a Spanish word, translate it to English.\n"+
    "- m: the Spanish meaning: use theirs if they wrote one, otherwise translate.\n"+
    "- e: their example sentence if they wrote one, otherwise an empty string.\n"+
    "- Skip greetings, chit-chat and headings. Don't add items that aren't in the text.\n"+
    "Reply with ONLY a JSON array like [{\"w\":\"...\",\"m\":\"...\",\"e\":\"...\"}].\n\nTEXT:\n"+txt.slice(0,8000);
  let arr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); }
  b.disabled=false; b.textContent="✨ Find my words";
  if(!Array.isArray(arr)){ impPrev.innerHTML="Couldn't read that right now. Try again, or use <b>Import exactly as pasted</b> below."; return; }
  const have=new Set(words.map(x=>norm(x.w))), seen=new Set();
  impFound=arr.filter(x=>x&&x.w&&String(x.w).trim()).map(x=>{ const w=String(x.w).trim().slice(0,120), k=norm(w); const dup=have.has(k)||seen.has(k); seen.add(k); return {w,m:String(x.m||"").trim().slice(0,140),e:String(x.e||"").trim().slice(0,220),dup}; });
  if(!impFound.length){ impPrev.textContent="I couldn't find any English words in that. Check what you pasted."; return; }
  renderImpPick();
}
function renderImpPick(){
  const pick=document.getElementById("impPick"), fresh=impFound.filter(x=>!x.dup).length;
  pick.innerHTML='<p class="imp-found">Found <b>'+impFound.length+'</b> '+(impFound.length===1?"word":"words")+(fresh<impFound.length?" · "+(impFound.length-fresh)+" already in your list":"")+'. Untick anything you don\'t want:</p>'+
    '<div class="imp-list">'+impFound.map((x,i)=>'<label class="imp-row'+(x.dup?" dup":"")+'"><input type="checkbox" data-imp="'+i+'"'+(x.dup?" disabled":" checked")+'><span><b>'+esc(x.w)+'</b>'+(x.m?' · '+esc(x.m):'')+(x.e?'<small>'+esc(x.e)+'</small>':'')+(x.dup?'<small>Already in your list</small>':'')+'</span></label>').join("")+'</div>'+
    '<div class="note-actions"><button class="pill-btn pill-green" type="button" id="impAdd">Add '+fresh+' '+(fresh===1?"word":"words")+'</button><button class="swap" type="button" id="impCancel">Cancel</button></div>';
}
document.getElementById("impAI").addEventListener("click",aiImport);
document.getElementById("impPick").addEventListener("change",()=>{ const n=[...document.querySelectorAll("#impPick [data-imp]:checked")].length, b=document.getElementById("impAdd"); if(b) b.textContent="Add "+n+" "+(n===1?"word":"words"); });
document.getElementById("impPick").addEventListener("click",e=>{
  if(e.target.closest("#impCancel")){ document.getElementById("impPick").innerHTML=""; impFound=[]; return; }
  if(!e.target.closest("#impAdd")) return;
  const idx=[...document.querySelectorAll("#impPick [data-imp]:checked")].map(c=>+c.dataset.imp);
  const have=new Set(words.map(x=>norm(x.w))), base=Date.now(), ids=[];
  idx.forEach((i,k)=>{ const x=impFound[i]; if(!x||have.has(norm(x.w))) return; have.add(norm(x.w)); const id=(base+k).toString(36)+Math.random().toString(36).slice(2,6); words.push({id,w:x.w,m:x.m,e:x.e,t:base-(idx.length-k),imp:true}); ids.push(id); });
  saveWordsNow(); impText.value=""; impFound=[]; document.getElementById("impPick").innerHTML="";
  impPrev.innerHTML= ids.length? "✓ Added <b>"+ids.length+"</b> "+(ids.length===1?"word":"words")+". ✨ Their meanings and examples are being filled in. <button class=\"foot-link\" type=\"button\" data-go=\"quiz\">Practice them →</button>" : "Nothing new to add.";
  toast(ids.length?"Added "+ids.length+(ids.length===1?" word":" words"):"Nothing new to add");
  if(ids.length) queueEnrich(ids);
});

/* ---------- words found in class notes ---------- */
window.csSuggestWords=async function(text,box,manual){
  box=box||document.getElementById("cnSuggest"); if(!box||!text||text.trim().length<12){ if(manual&&box){ box.hidden=false; box.innerHTML='<p class="muted" style="margin:0">This note is too short to find words in.</p>'; } return; }
  if(!aiOK()){ if(manual){ box.hidden=false; box.innerHTML='<p class="muted" style="margin:0">The AI is still loading. Try again in a few seconds.</p>'; } return; }
  box.hidden=false; box.innerHTML='<p class="muted" style="margin:0">✨ Looking for new words in your note…</p>';
  const p="These are class notes written by a Spanish-speaking learner of English (they can mix English and Spanish).\n"+
    "List the useful English vocabulary in them worth saving for study: words, phrasal verbs, idioms, collocations and expressions the student is learning or was corrected on.\n"+
    "Skip very basic words (like house, go, good, days of the week), names, and grammar labels (like 'present perfect'). Maximum 12 items. For each item:\n"+
    "w (the English word or expression, lowercase unless it's a name), m (Spanish meaning), pos (one of: "+POS_LIST.join(", ")+"), def (very short English meaning, max 10 words), e (an example from the notes if there is one, otherwise a new one. "+exampleRule()+"),\n"+
    "mn (the meaning or translation the STUDENT wrote for it in the notes, copied exactly, or \"\"), en (the example sentence the STUDENT wrote with it in the notes, copied exactly, or \"\"), bad (true only if the student's own meaning or example has a real mistake: wrong meaning or a clear grammar error; then m and e must be the corrected versions)\n"+
    "Reply with ONLY a JSON array. If there's nothing worth saving, reply [].\n\nNOTES:\n"+text.slice(0,6000);
  let arr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); }
  if(!Array.isArray(arr)){ if(manual){ box.innerHTML='<p class="muted" style="margin:0">Couldn\'t check this note right now. Try again in a minute.</p>'; } else box.hidden=true; return; }
  const have=new Set(words.map(x=>norm(x.w)));
  const list=arr.filter(x=>x&&x.w&&!have.has(norm(x.w))).slice(0,12);
  if(!list.length){ if(manual){ box.innerHTML='<div class="cn-sug-top"><span>✓ No new words in this note. You already have them all!</span><button class="tip-x" type="button" data-sug="x" aria-label="Close">×</button></div>'; } else box.hidden=true; return; }
  box._list=list;
  const own=list.filter(x=>(x.mn&&String(x.mn).trim())||(x.en&&String(x.en).trim())).length;
  box.innerHTML='<div class="cn-sug-top"><b>✨ I found '+list.length+' new '+(list.length===1?"word":"words")+' in your note</b><button class="tip-x" type="button" data-sug="x" aria-label="Close">×</button></div>'+
    (own?'<label class="cs-chk" style="margin:6px 0 8px"><input type="checkbox" data-sugown checked> <span><b>Keep what I wrote in my notes</b><small>Your own meanings and examples stay as you wrote them ('+own+(own===1?' word':' words')+'). If one has a mistake, you get the corrected version instead.</small></span></label>':'')+
    '<div class="imp-list">'+list.map((x,i)=>{ const mine=(x.mn&&String(x.mn).trim())||(x.en&&String(x.en).trim()), shownM=(!x.bad&&x.mn&&String(x.mn).trim())?x.mn:x.m; return '<label class="imp-row"><input type="checkbox" data-sugi="'+i+'" checked><span><b>'+esc(x.w)+'</b>'+(x.pos?' <span class="pos">'+esc(cleanPos(x.pos))+'</span>':'')+(shownM?' · '+esc(shownM):'')+(x.def?'<small>'+esc(x.def)+'</small>':'')+(mine?'<small class="sug-own">'+(x.bad?'✏️ Your note had a small mistake, so the corrected version will be saved':'📝 Your own '+(x.mn&&x.en?'meaning and example':x.mn?'meaning':'example')+' will be kept')+'</small>':'')+'</span></label>'; }).join("")+'</div>'+
    '<div class="note-actions"><button class="pill-btn pill-green" type="button" data-sug="add">Add to my words</button><button class="swap" type="button" data-sug="x">No thanks</button></div>';
};
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-sug]"); if(!b) return;
  const box=b.closest(".cn-sug")||document.getElementById("cnSuggest");
  if(b.dataset.sug==="x"){ box.hidden=true; box.innerHTML=""; return; }
  const idx=[...box.querySelectorAll("[data-sugi]:checked")].map(c=>+c.dataset.sugi), base=Date.now(), have=new Set(words.map(x=>norm(x.w))); let n=0;
  const ownBox=box.querySelector("[data-sugown]"), keepOwn=!ownBox||ownBox.checked;
  idx.forEach((i,k)=>{ const x=box._list[i]; if(!x||have.has(norm(x.w))) return; have.add(norm(x.w));
    const mn=String(x.mn||"").trim(), en=String(x.en||"").trim(), useOwn=keepOwn&&!x.bad;
    const m=(useOwn&&mn?mn:String(x.m||"").trim()).slice(0,140), ex=(useOwn&&en?en:(noEx()&&!en?"":String(x.e||"").trim())).slice(0,220);
    words.push(Object.assign({id:(base+k).toString(36)+Math.random().toString(36).slice(2,6),w:String(x.w).trim().slice(0,120),m,e:ex,pos:cleanPos(x.pos),def:String(x.def||"").trim().slice(0,140),t:base+k,ai:1,fromNote:1},useOwn&&en?{ownEx:1}:{})); n++; });
  const added=idx.map(i=>box._list[i]).filter(Boolean).map(x=>String(x.w).trim()).slice(0,n);
  saveWordsNow(); box.hidden=true; box.innerHTML="";
  if(!n){ toast("Nothing new to add"); return; }
  if(window.csUse) try{ window.csUse("word"); }catch(er){}
  const d=csDialog('<h3 style="margin-top:0">✅ Added to My words</h3><p>'+n+(n===1?' new word is':' new words are')+' now in <b>My words</b>:</p><ul class="cs-added">'+added.map(w=>'<li>'+esc(w)+'</li>').join("")+'</ul><div class="note-actions"><button class="pill-btn pill-green" type="button" data-a="go">See my words</button><button class="swap" type="button" data-a="ok">OK</button></div>');
  d.el.addEventListener("click",ev=>{ const b2=ev.target.closest("[data-a]"); if(!b2) return; d.close(); if(b2.dataset.a==="go"&&typeof go==="function") go("words",true); });
  try{ document.dispatchEvent(new CustomEvent("cs-wordsadded",{detail:{n}})); }catch(er){}
});

/* ---------- clean up my words ---------- */
const dupKey=w=>norm(String(w||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/^to\s+/,"").replace(/[^\p{L}\p{N}' ]+/gu," ").replace(/\s+/g," ").trim());
async function cleanUp(btn,co){
  co=co||cleanF(); const has=k=>co.includes(k);
  const list=words.filter(x=>x&&x.w&&!x.sample);
  if(!list.length){ toast("You don't have any words yet"); return; }
  const dlg=csDialog('<h3 style="margin-top:0">🧹 Clean up my words</h3><div id="cuBody"><p>Checking your <b>'+list.length+'</b> words for spelling, punctuation, capital letters, missing translations and repeated words…</p><p class="muted" id="cuProg">Starting…</p></div>',{cls:"cu-dlg"});
  const body=dlg.el.querySelector("#cuBody"), prog=()=>dlg.el.querySelector("#cuProg");
  // 1) repeated words (done here, no AI needed)
  const groups={}; if(has("dups")) list.forEach(x=>{ const k=dupKey(x.w); if(k) (groups[k]=groups[k]||[]).push(x); });
  const dups=Object.values(groups).filter(g=>g.length>1).map(g=>{ const score=x=>["m","e","n","pos","def"].filter(f=>x[f]).length; const keep=g.slice().sort((a,b)=>score(b)-score(a)||(a.t||0)-(b.t||0))[0]; return {keep,drop:g.filter(x=>x!==keep)}; });
  // 2) fixes from the AI, 40 words at a time
  const fixes=[]; let failed=false;
  const aiRules=[has("spell")&&"- spelling mistakes (English or Spanish)",has("caps")&&"- capital letters: w lowercase unless it's a name or 'I'; example sentences start with a capital letter\n- punctuation: example sentences end with . ? or !; no stray symbols",has("es")&&"- a wrong Spanish meaning",has("gram")&&"- grammar mistakes in the example",has("miss")&&"- missing m: add the Spanish meaning",has("miss")&&!noEx()&&"- missing e: add a short example. "+exampleRule()].filter(Boolean);
  if(!aiRules.length){}
  else if(aiOK()){
    for(let i=0;i<list.length;i+=40){
      if(!document.body.contains(dlg.el)) return;
      const p2=prog(); if(p2) p2.textContent="✨ Checking words "+(i+1)+"–"+Math.min(i+40,list.length)+" of "+list.length+"…";
      const chunk=list.slice(i,i+40).map(x=>({id:x.id,w:x.w,m:x.m||"",e:x.e||"",own:!!(x.e&&!x.aiEx)}));
      const p="You are checking a Spanish-speaking learner's English vocabulary list. For each item: w = English word/expression, m = Spanish meaning, e = example sentence.\n"+
        "Find ONLY these kinds of problems and suggest fixes (ignore every other kind):\n"+aiRules.join("\n")+"\n"+
        "Example sentences the student wrote themselves (own=true) are theirs: only touch them if they have a clear mistake (wrong word, broken grammar, nonsense). Never rewrite them just to sound nicer.\n"+
        "Do NOT rewrite things that are already correct, and don't change the meaning. Reply with ONLY a JSON array of changes like [{\"id\":\"...\",\"field\":\"w\" or \"m\" or \"e\",\"to\":\"the corrected text\",\"why\":\"very short reason, max 6 words\"}]. If nothing needs fixing, reply [].\n\nWORDS:\n"+JSON.stringify(chunk);
      try{ const r=await window.__csSample(p); const arr=aiJSON(r&&r.text); if(Array.isArray(arr)) arr.forEach(c=>{ const x=words.find(w=>w.id===c.id); if(!x||!["w","m","e"].includes(c.field)) return; const from=String(x[c.field]||""), to=String(c.to||"").trim(); if(!to||to===from) return; fixes.push({id:c.id,field:c.field,from,to:to.slice(0,220),why:String(c.why||"").slice(0,60),own:c.field==="e"&&!!from&&!x.aiEx}); }); else failed=true; }
      catch(e){ console.warn(e); failed=true; }
    }
  } else failed=true;
  if(!document.body.contains(dlg.el)) return;
  if(!fixes.length&&!dups.length){ body.innerHTML='<p>✨ Your word list looks great. Nothing to fix!</p>'+(failed?'<p class="muted">(The AI couldn\'t check everything right now. Try again later for spelling checks.)</p>':''); return; }
  const fieldName={w:"word",m:"Spanish",e:"example"};
  const wName=id=>{ const x=words.find(w=>w.id===id); return x?x.w:""; };
  body.innerHTML='<p>Here\'s what I\'d change. <b>Nothing changes until you press Apply.</b> Untick anything you want to keep as it is.</p>'+
    (fixes.some(f=>!f.own)?'<h4>✏️ Fixes ('+fixes.filter(f=>!f.own).length+')</h4><div class="cu-list">'+fixes.map((f,i)=>f.own?'':'<label class="cu-row"><input type="checkbox" data-fx="'+i+'" checked><span><b>'+esc(wName(f.id))+'</b> · '+fieldName[f.field]+(f.why?' <small>('+esc(f.why)+')</small>':'')+'<br>'+(f.from?'<del>'+esc(f.from)+'</del> → ':'<i>missing</i> → ')+'<ins>'+esc(f.to)+'</ins></span></label>').join("")+'</div>':'')+
    (fixes.some(f=>f.own)?'<h4>✍️ Your own sentences ('+fixes.filter(f=>f.own).length+')</h4><p class="muted" style="font-size:13.5px;margin-top:0">These are sentences you wrote, and it looks like they have a mistake. <b>They stay exactly as you wrote them</b> unless you tick one.</p><div class="cu-list">'+fixes.map((f,i)=>!f.own?'':'<label class="cu-row"><input type="checkbox" data-fx="'+i+'"><span><b>'+esc(wName(f.id))+'</b>'+(f.why?' <small>('+esc(f.why)+')</small>':'')+'<br><del>'+esc(f.from)+'</del> → <ins>'+esc(f.to)+'</ins></span></label>').join("")+'</div>':'')+
    (dups.length?'<h4>🗂 Repeated words ('+dups.length+')</h4><div class="cu-list">'+dups.map((d,i)=>'<label class="cu-row"><input type="checkbox" data-dp="'+i+'" checked><span><b>'+esc(d.keep.w)+'</b> is in your list '+(d.drop.length+1)+' times. Keep one and combine their details.</span></label>').join("")+'</div>':'')+
    (failed?'<p class="muted" style="font-size:13px">The AI couldn\'t check every word right now, so some spelling fixes may be missing.</p>':'')+
    '<div class="note-actions" style="margin-top:12px"><button class="pill-btn pill-green" type="button" id="cuApply">Apply changes</button><button class="swap" type="button" id="cuNo">Cancel</button></div>';
  body.querySelector("#cuNo").addEventListener("click",dlg.close);
  body.querySelector("#cuApply").addEventListener("click",()=>{
    wordsSnapshot("clean");
    let nf=0, nd=0;
    body.querySelectorAll("[data-fx]:checked").forEach(c=>{ const f=fixes[+c.dataset.fx], x=words.find(w=>w.id===f.id); if(x){ x[f.field]=f.to; if(f.field==="w"){ delete x.pos; delete x.def; delete x.ai; } nf++; } });
    const drop=new Set();
    body.querySelectorAll("[data-dp]:checked").forEach(c=>{ const d=dups[+c.dataset.dp]; d.drop.forEach(o=>{ ["m","e","n","pos","def"].forEach(f=>{ if(!d.keep[f]&&o[f]) d.keep[f]=o[f]; }); drop.add(o.id); }); nd+=d.drop.length; });
    words=words.filter(x=>!drop.has(x.id));
    saveWordsNow(); dlg.close();
    const st=document.getElementById("aiStatus"); st.hidden=false;
    st.innerHTML="✓ Cleaned up: "+nf+(nf===1?" fix":" fixes")+(nd?" · "+nd+" repeated "+(nd===1?"word":"words")+" removed":"")+'. Changed your mind? Tap <b>↩ Undo clean up</b>.';
    toast("Your words are cleaned up ✨");
  });
}
document.addEventListener("click",e=>{
  const f=e.target.closest("#aiFill"), c=e.target.closest("#aiClean");
  if(f){ const fs0=fillF(), n=words.filter(x=>missF(x,FILLF)).length;
    if(!n){ const st=document.getElementById("aiStatus"); st.hidden=false; st.textContent="✓ All your words already have their details."; return; }
    const n0=words.filter(x=>missF(x,fs0)).length;
    askFirst("✨ Complete my words",'<p>Choose what the AI fills in. It only fills what\'s <b>missing</b> (<span id="aiFillN">'+n0+(n0===1?" word":" words")+'</span>) and <b>never changes anything you already wrote</b>.</p>'+
      optList("fill",[["m","Spanish translation"],["def","Simple meaning","A short, easy English meaning"],["pos","Word type","noun, verb, phrasal verb…"],["pr","Pronunciation","How to say it, like LEV-er-ij (single words and short expressions)"],["e","Example sentence","Untick it if you like writing your own. New words won\'t get one either"]],fs0),
      el=>{ const fs=readOpts(el); LS.set("ncs-fillf",fs); LS.set("ncs-fillf-v",2); LS.set("ncs-noex",!fs.includes("e")); completeAll(f,fs); },"Complete them"); }
  else if(c) askFirst("🧹 Clean up my words",'<p>Choose what the AI checks. It shows you every change first, and <b>nothing changes until you press Apply</b>. Your own sentences (✍️) are never touched.</p>'+optList("clean",CLEANF,cleanF()),
      el=>{ const co=readOpts(el); LS.set("ncs-cleanf",co); cleanUp(c,co); },"Check my words");
  else if(e.target.closest("#aiUndo")) undoWords();
});
