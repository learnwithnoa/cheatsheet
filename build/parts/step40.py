# 40) translator: auto-detect + pronunciation + save under the result; flashcard word picking;
#     browser back button; no Star on the top pages; translation marked optional
# --- translator markup
R('''        <button class="linkbtn save-link" id="trSave" type="button">+ Save to my words</button>
      </div>''', '''      </div>''')
R('''      <div class="out placeholder" id="trOut" aria-live="polite">Your translation shows up here.</div>
    </div>''', '''      <div class="out placeholder" id="trOut" aria-live="polite">Your translation shows up here.</div>
      <p class="tr-note" id="trNote" hidden></p>
      <div class="tr-say" id="trSay" hidden><span class="tr-say-l">How to say it</span><span class="tr-say-p" id="trSayP"></span><button class="say" type="button" id="trSayBtn" aria-label="Listen">🔊</button></div>
      <div class="note-actions" style="margin-top:12px"><button class="pill-btn pill-green" id="trSave" type="button">+ Save to my words</button></div>
    </div>''')
R('<p class="lede">Write a word or sentence and tap <b>Translate here</b>, or open it in Google Translate or DeepL. For single words, WordReference gives you examples and every meaning.</p>',
  '<p class="lede">Write a word or sentence in Spanish <i>or</i> English and tap <b>Translate here</b>. It figures out the language for you, and shows you how to say the English part. You can also open it in Google Translate or DeepL.</p>')
# --- translator logic: JSON answer with detected language + pronunciation
R('''  const t=trIn.value.trim(); if(!t||!sample) { trIn.focus(); return; }
  const [sl,tl]=dir.split("-"); const from= sl==="es"?"Spanish (Chilean)":"English", to= tl==="es"?"Chilean Spanish":"natural, everyday English";
  if(ctrl) ctrl.abort(); ctrl=new AbortController();
  trOut.classList.remove("placeholder"); trOut.textContent="Translating…"; trBtn.disabled=true;
  const prompt="You are a translator for an English learner. Translate the text below from "+from+" into "+to+". Reply with the translation only, no quotes or notes. If there is a more natural or common alternative, add it on a new line starting with 'Also: '.\\n\\nText:\\n"+t;
  try{
    const r=await sample(prompt,{modelTier:"quick",signal:ctrl.signal,onText:({text})=>{trOut.textContent=text;}});
    trOut.textContent=r.text;
  }catch(e){''', '''  const t=trIn.value.trim(); if(!t||!sample) { trIn.focus(); return; }
  if(ctrl) ctrl.abort(); ctrl=new AbortController();
  trOut.classList.remove("placeholder"); trOut.textContent="Translating…"; trBtn.disabled=true; trOut.dataset.tr=""; trOut.dataset.en="";
  document.getElementById("trNote").hidden=true; document.getElementById("trSay").hidden=true;
  const prompt="You help a Spanish-speaking (Chilean) English learner. The text below is in Spanish or English. The learner chose "+(dir==="es-en"?"Spanish → English":"English → Spanish")+", but they may have written in the other language: detect the real language yourself.\\n"+
    "Translate it into the other language: Spanish into natural, everyday English; English into natural Chilean Spanish.\\n"+
    "Reply with ONLY a JSON object, no code fences:\\n"+
    "{\\"from\\": \\"es\\" or \\"en\\", \\"translation\\": \\"the translation\\", \\"also\\": \\"a more natural or common alternative, or an empty string\\", \\"say\\": \\"a learner-friendly American English pronunciation respelling of the ENGLISH text (the original if it is English, otherwise the translation), with the stressed syllable in CAPITALS and hyphens between syllables, like KUMF-ter-buhl for comfortable or ai-m LUK-ing FOR-werd tuh it. Use simple English spelling, no IPA. Empty string if the English text is longer than 10 words.\\"}\\n\\nText:\\n"+t;
  try{
    const r=await sample(prompt,{modelTier:"quick",signal:ctrl.signal});
    let j=null; try{ j=JSON.parse(String(r.text||"").replace(/^[^{]*/,"").replace(/[^}]*$/,"")); }catch(er){}
    if(!j||!j.translation){ trOut.textContent=r.text; trOut.dataset.tr=String(r.text||"").split("\\n")[0]; return; }
    const from=j.from==="en"?"en":"es";
    if((from==="en")!==(dir==="en-es")){ dir=from==="en"?"en-es":"es-en"; updateLinks(); const n=document.getElementById("trNote"); n.hidden=false; n.textContent=from==="en"?"✨ That looks like English, so I translated it into Spanish.":"✨ That looks like Spanish, so I translated it into English."; }
    trOut.innerHTML=esc(j.translation)+(j.also&&String(j.also).trim()?'<span class="tr-also">Also: '+esc(j.also)+'</span>':"");
    trOut.dataset.tr=j.translation; trOut.dataset.en= from==="en"? t : j.translation;
    if(j.say&&String(j.say).trim()){ document.getElementById("trSayP").textContent=j.say; document.getElementById("trSay").hidden=false; }
  }catch(e){''')
R('''  const out=(trOut.classList.contains("placeholder")?"":trOut.textContent.split("\\n")[0].replace(/^Also:\\s*/i,"")).trim();''',
  '''  const out=(trOut.classList.contains("placeholder")?"":(trOut.dataset.tr||trOut.textContent.split("\\n")[0].replace(/^Also:\\s*/i,""))).trim();''')
R('''window.addEventListener("cs-sample-ready",useCsSample); useCsSample();''', '''window.addEventListener("cs-sample-ready",useCsSample); useCsSample();
/* without the AI, the save button lives next to the links instead */
setTimeout(()=>{ if(!sample){ const s=document.getElementById("trSave"), l=document.querySelector("#v-translate .links"); if(s&&l){ s.className="linkbtn save-link"; l.appendChild(s); } } },4000);
document.getElementById("trSayBtn").addEventListener("click",()=>{ const t=trOut.dataset.en; if(t&&window.csSpeak) window.csSpeak(t); });''')
# --- flashcards: tap words on the back of the card to save them
R('''  fcBack.innerHTML= (fcSpanishFirst? en : es) + ex;''', '''  fcBack.innerHTML= (fcSpanishFirst? en : es) + ex.replace(/(<small class="fc-def">(?:<span class="pos">[^<]*<\\/span> )?)([^<]*)(<\\/small>)/,(m,a,b,c)=>a+fcToks(b)+c).replace(/<i>([^<]*)<\\/i>/,(m,b)=>'<i>'+fcToks(b)+'</i>') + '<span class="fc-pickbar" id="fcPickBar" hidden></span>';
  fcSel=[];''')
R('''function renderFlash(){''', '''/* tap words on the back of a flashcard to save them (tap neighbours to make a phrase) */
let fcSel=[];
function fcToks(t){ return t.split(/(\\s+)/).map(p=>/\\S/.test(p)?'<span class="fc-tok" data-tok>'+p+'</span>':p).join(""); }
function fcClean(w){ return w.replace(/^[^\\p{L}\\p{N}']+|[^\\p{L}\\p{N}']+$/gu,""); }
function fcPaintSel(){
  const toks=[...fcBack.querySelectorAll(".fc-tok")]; toks.forEach((t,i)=>t.classList.toggle("on",fcSel.includes(i)));
  const bar=document.getElementById("fcPickBar"); if(!bar) return;
  if(!fcSel.length){ bar.hidden=true; return; }
  const phrase=fcSel.slice().sort((a,b)=>a-b).map(i=>toks[i].textContent).join(" ");
  bar.hidden=false; bar.innerHTML='<span class="fc-pick-w">“'+esc(fcClean(phrase))+'”</span><span role="button" tabindex="0" class="fc-pick-add" data-fcadd>+ Save to My words</span><span role="button" tabindex="0" class="fc-pick-x" data-fcclear aria-label="Clear">×</span>';
}
fcBack.addEventListener("click",e=>{
  const tok=e.target.closest("[data-tok]"), add=e.target.closest("[data-fcadd]"), clr=e.target.closest("[data-fcclear]");
  if(!tok&&!add&&!clr) return;
  e.stopPropagation(); e.preventDefault();
  if(clr){ fcSel=[]; fcPaintSel(); return; }
  const toks=[...fcBack.querySelectorAll(".fc-tok")];
  if(add){ const phrase=fcClean(fcSel.slice().sort((a,b)=>a-b).map(i=>toks[i].textContent).join(" ")); if(phrase){ const ctx=(toks[fcSel[0]].closest("i")||toks[fcSel[0]].closest("small")||{}).textContent||""; openQA(phrase,"",toks[fcSel[0]].closest("i")?ctx:""); } fcSel=[]; fcPaintSel(); return; }
  const i=toks.indexOf(tok);
  const sameLine=fcSel.length&&toks[fcSel[0]].parentNode===tok.parentNode;
  if(fcSel.includes(i)) fcSel=fcSel.filter(x=>x!==i);
  else if(sameLine&&(i===Math.min(...fcSel)-1||i===Math.max(...fcSel)+1)) fcSel.push(i);
  else fcSel=[i];
  fcPaintSel();
},true);
function renderFlash(){''')
# --- optional translation
R('<div class="field"><label for="nMeaning">Spanish translation</label><input id="nMeaning" type="text" placeholder="e.g. entender, resolver"></div>',
  '<div class="field"><label for="nMeaning">Spanish translation <span class="opt">(optional)</span></label><input id="nMeaning" type="text" placeholder="Leave it empty and we’ll add it for you"></div>')
R('<div class="field"><label for="qaMeaning">Spanish translation</label><input id="qaMeaning" type="text"></div>',
  '<div class="field"><label for="qaMeaning">Spanish translation <span class="opt">(optional)</span></label><input id="qaMeaning" type="text" placeholder="Leave it empty and we’ll add it for you"></div>')
R('''  const first=[ "qaWord","qaMeaning","qaExample"].map(i=>document.getElementById(i)).find(i=>!i.value)||document.getElementById("qaWord");''',
  '''  const first=document.getElementById("qaWord").value?(document.getElementById("qaExample").value?document.getElementById("qaMeaning"):document.getElementById("qaMeaning")):document.getElementById("qaWord");''')
# --- no Star on the pages that are already at the top of the menu
R('''  const id=v.id.slice(2); if(id==="notes"||id==="classnotes"||id==="notebook"||id==="feedback"||id==="words"||id==="backup"||id==="changelog") return;''',
  '''  const id=v.id.slice(2); if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","translate","park"].includes(id)) return;''')
R('''  stars=stars.filter(id=>document.getElementById("v-"+id));''', '''  stars=stars.filter(id=>document.getElementById("v-"+id)&&!["quiz","translate","park"].includes(id));''')
# --- back link label without the icon
R('''    const name= prev.id==="notes"?"Home":prev.id==="classnotes"?"My class notes":prev.id==="words"?"My words":prev.id==="changelog"?"What's new":(nb?nb.textContent.trim():prev.id);''',
  '''    const nbt=nb?(()=>{ const c=nb.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl,svg').forEach(x=>x.remove()); return c.textContent.trim(); })():"";
    const name= prev.id==="notes"?"Home":prev.id==="classnotes"?"My class notes":prev.id==="words"?"My words":prev.id==="changelog"?"What's new":(nbt||prev.id);''')
# --- browser back button = Cheat Sheet back
R('''function goBack(){
  const prev=backStack.pop(); if(!prev) return;
  goingBack=true; go(prev.id,true); goingBack=false;
  setTimeout(()=>window.scrollTo({top:prev.y}),20);
}''', '''function goBack(){
  if(history.state&&history.state.cs&&history.state.n>0){ history.back(); return; }
  const prev=backStack.pop(); if(!prev) return;
  goingBack=true; go(prev.id,true); goingBack=false;
  setTimeout(()=>window.scrollTo({top:prev.y}),20);
}
let histN=0, fromPop=false;
window.addEventListener("popstate",e=>{
  const st=e.state||{}, id=st.v||location.hash.slice(1)||"notes";
  histN=st.n|0;
  if(id===curView){ if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true); return; }
  const top=backStack[backStack.length-1];
  fromPop=true; goingBack=true;
  if(top&&top.id===id){ backStack.pop(); go(id); setTimeout(()=>window.scrollTo({top:top.y}),20); } else go(id);
  goingBack=false; fromPop=false;
  if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true);
  renderBack();
});''')
R('''  if(push){ try{ history.replaceState(null,"","#"+id);}catch(e){} }
}''', '''  if(push&&!fromPop){ try{ if(history.state&&history.state.cs&&history.state.v===id) history.replaceState(history.state,"","#"+id); else if(goingBack) history.replaceState({cs:1,v:id,n:histN},"","#"+id); else history.pushState({cs:1,v:id,n:++histN},"","#"+id);}catch(e){} }
}''')
R('''window.addEventListener("hashchange",()=>go(location.hash.slice(1)));''', '''window.addEventListener("hashchange",()=>{ const h=location.hash.slice(1); if(h&&h!==curView&&ids.includes(h)) go(h); });''')
R('''go(start);

/* ---------------- starred sections ---------------- */''', '''go(start);
try{ history.replaceState({cs:1,v:curView,n:0},"","#"+curView); }catch(e){}

/* ---------------- starred sections ---------------- */''')
TODAY_CSS += '''
.tr-also{display:block;margin-top:8px;font-size:15px;color:var(--muted)}
.tr-note{margin:10px 0 0;font-size:14px;color:var(--bright)}
.tr-say{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;padding:10px 12px;border-radius:12px;background:var(--surface-2)}
.tr-say-l{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.tr-say-p{font-weight:700;font-size:17px;letter-spacing:.02em}
.opt{font-weight:400;color:var(--muted);font-size:.9em}
.fc-tok{cursor:pointer;border-radius:4px;transition:background .12s}
.fc-tok:hover{background:color-mix(in srgb,var(--bright) 22%,transparent)}
.fc-tok.on{background:var(--bright);color:#fff}
.fc-pickbar{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:6px;font-size:14px;font-style:normal}
.fc-pickbar[hidden]{display:none}
.fc-pick-w{font-weight:700;color:var(--ink)}
.fc-pick-add{cursor:pointer;padding:4px 12px;border-radius:99px;background:var(--green);color:#fff;font-weight:700}
.fc-pick-x{cursor:pointer;padding:2px 8px;border-radius:99px;border:1px solid var(--line);color:var(--muted)}
.fc-back .fc-hint-tap{font-size:12px;color:var(--muted)}
'''
R('''fcHint.textContent= fcFlipped? "Did you know it?" : "Tap to flip";''', '''fcHint.textContent= fcFlipped? "Did you know it? · Tap any word to save it" : "Tap to flip";''')
TODAY_CSS += '''
.fc-tok{-webkit-user-select:none;user-select:none}
'''
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-smarttranslate", date:"November 6, 2026", title:"A smarter translator 🗣️", items:[\n'
  '    ["🔁","It knows the language","write in Spanish or English: the translator figures it out by itself.","translate"],\n'
  '    ["🗣️","How to say it","translations now show an easy way to say the English, like <b>KUMF-ter-buhl</b>.","translate"],\n'
  '    ["🃏","Save words from flashcards","tap any word in the meaning or example on a flashcard to save it. Tap the words next to it to save a phrase.","quiz"],\n'
  '    ["↩️","Back button","your browser\\u2019s back button now takes you to the last page you visited on the Cheat Sheet."]\n'
  '  ]},\n')
