
(function(){
/* ---------------- data ---------------- */
const IRR = [
["arise","arose","arisen","surgir"],["awake","awoke","awoken","despertar(se)"],["be","was / were","been","ser, estar"],["bear","bore","born / borne","soportar; dar a luz"],
["beat","beat","beaten","golpear; vencer"],["become","became","become","convertirse en, llegar a ser"],["begin","began","begun","empezar"],["bend","bent","bent","doblar"],
["bet","bet","bet","apostar"],["bite","bit","bitten","morder"],["bleed","bled","bled","sangrar"],["blow","blew","blown","soplar"],["break","broke","broken","romper"],
["bring","brought","brought","traer"],["broadcast","broadcast","broadcast","transmitir"],["build","built","built","construir"],["burn","burned / burnt","burned / burnt","quemar"],
["burst","burst","burst","reventar"],["buy","bought","bought","comprar"],["catch","caught","caught","atrapar, pillar"],["choose","chose","chosen","elegir"],
["come","came","come","venir"],["cost","cost","cost","costar"],["cut","cut","cut","cortar"],["deal","dealt","dealt","lidiar con, tratar"],["dig","dug","dug","cavar"],
["do","did","done","hacer"],["draw","drew","drawn","dibujar"],["dream","dreamed / dreamt","dreamed / dreamt","soñar"],["drink","drank","drunk","beber, tomar"],
["drive","drove","driven","manejar"],["eat","ate","eaten","comer"],["fall","fell","fallen","caer"],["feed","fed","fed","alimentar"],["feel","felt","felt","sentir"],
["fight","fought","fought","pelear"],["find","found","found","encontrar"],["flee","fled","fled","huir"],["fly","flew","flown","volar"],["forbid","forbade","forbidden","prohibir"],
["forget","forgot","forgotten","olvidar"],["forgive","forgave","forgiven","perdonar"],["freeze","froze","frozen","congelar"],["get","got","gotten / got","conseguir, obtener, llegar"],
["give","gave","given","dar"],["go","went","gone","ir"],["grow","grew","grown","crecer"],["hang","hung","hung","colgar"],["have","had","had","tener"],["hear","heard","heard","oír"],
["hide","hid","hidden","esconder"],["hit","hit","hit","golpear"],["hold","held","held","sostener"],["hurt","hurt","hurt","doler, herir"],["keep","kept","kept","mantener, guardar"],
["know","knew","known","saber, conocer"],["lay","laid","laid","poner, colocar"],["lead","led","led","liderar, guiar"],["learn","learned / learnt","learned / learnt","aprender"],
["leave","left","left","irse, dejar"],["lend","lent","lent","prestar"],["let","let","let","dejar, permitir"],["lie","lay","lain","recostarse (lie = mentir es regular: lied)"],
["light","lit","lit","encender"],["lose","lost","lost","perder"],["make","made","made","hacer, fabricar"],["mean","meant","meant","significar, querer decir"],
["meet","met","met","conocer a alguien, juntarse"],["mistake","mistook","mistaken","confundir"],["overcome","overcame","overcome","superar"],["pay","paid","paid","pagar"],
["put","put","put","poner"],["quit","quit","quit","renunciar, dejar"],["read","read","read","leer (el pasado suena “red”)"],["ride","rode","ridden","andar en (bici, caballo)"],
["ring","rang","rung","sonar"],["rise","rose","risen","subir, levantarse"],["run","ran","run","correr"],["say","said","said","decir"],["see","saw","seen","ver"],
["seek","sought","sought","buscar"],["sell","sold","sold","vender"],["send","sent","sent","enviar"],["set","set","set","poner, establecer"],["shake","shook","shaken","sacudir"],
["shine","shone","shone","brillar"],["shoot","shot","shot","disparar"],["show","showed","shown","mostrar"],["shrink","shrank","shrunk","encoger"],["shut","shut","shut","cerrar"],
["sing","sang","sung","cantar"],["sink","sank","sunk","hundir(se)"],["sit","sat","sat","sentarse"],["sleep","slept","slept","dormir"],["slide","slid","slid","deslizar"],
["speak","spoke","spoken","hablar"],["spend","spent","spent","gastar; pasar (tiempo)"],["spill","spilled / spilt","spilled / spilt","derramar"],["spread","spread","spread","esparcir, untar"],
["stand","stood","stood","estar de pie"],["steal","stole","stolen","robar"],["stick","stuck","stuck","pegar"],["sting","stung","stung","picar"],["strike","struck","struck","golpear"],
["swear","swore","sworn","jurar; decir garabatos"],["sweep","swept","swept","barrer"],["swim","swam","swum","nadar"],["swing","swung","swung","columpiarse"],
["take","took","taken","tomar, llevar"],["teach","taught","taught","enseñar"],["tear","tore","torn","rasgar, romper"],["tell","told","told","decir, contar"],["think","thought","thought","pensar"],
["throw","threw","thrown","lanzar, tirar"],["understand","understood","understood","entender"],["upset","upset","upset","molestar"],["wake","woke","woken","despertar(se)"],
["wear","wore","worn","usar, llevar puesto"],["win","won","won","ganar"],["withdraw","withdrew","withdrawn","retirar"],["write","wrote","written","escribir"]
];
const IRRMAP = {}; IRR.forEach(r=>IRRMAP[r[0]]={past:r[1].split(" / ")[0],pp:r[2].split(" / ")[0]});

const TENSES = {
 present:[
  {k:"ps",n:"Present simple",f:"subject + verb (+s)",u:"Routines, facts, likes.",es:"camino",s:"always, usually, every day"},
  {k:"pc",n:"Present continuous",f:"am/is/are + verb-ing",u:"Right now, or plans you've arranged.",es:"estoy caminando",s:"now, right now, at the moment"},
  {k:"pp",n:"Present perfect",f:"have/has + participle",u:"Experiences and results, no specific time.",es:"he caminado",s:"ever, never, already, yet, just"},
  {k:"ppc",n:"Present perfect continuous",f:"have/has + been + verb-ing",u:"Started in the past and still happening.",es:"llevo caminando",s:"for, since, how long"}],
 past:[
  {k:"pas",n:"Past simple",f:"subject + past verb",u:"Finished actions at a specific time.",es:"caminé",s:"yesterday, last week, ago"},
  {k:"pac",n:"Past continuous",f:"was/were + verb-ing",u:"In progress in the past, often interrupted.",es:"estaba caminando",s:"while, when"},
  {k:"pap",n:"Past perfect",f:"had + participle",u:"Happened before another past moment.",es:"había caminado",s:"before, already, by the time"},
  {k:"papc",n:"Past perfect continuous",f:"had + been + verb-ing",u:"How long, up to a past moment.",es:"había estado caminando",s:"for, since, before"}],
 future:[
  {k:"fs",n:"Future simple",f:"will + verb",u:"Quick decisions, predictions, promises.",es:"caminaré",s:"tomorrow, next week, I think"},
  {k:"fc",n:"Future continuous",f:"will be + verb-ing",u:"In progress at a future moment.",es:"estaré caminando",s:"this time tomorrow"},
  {k:"fp",n:"Future perfect",f:"will have + participle",u:"Finished before a future moment.",es:"habré caminado",s:"by next year, by then"},
  {k:"fpc",n:"Future perfect continuous",f:"will have been + verb-ing",u:"How long, up to a future moment.",es:"habré estado caminando",s:"for … by then"}]
};

/* ---------------- conjugation ---------------- */
const MULTI_DOUBLE = new Set(["begin","prefer","refer","admit","occur","permit","regret","control","commit","forget","upset","transfer","omit","submit","quit","equip"]);
function doubles(v){
  if(MULTI_DOUBLE.has(v)) return true;
  return /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(v);
}
function ing(v){
  if(v==="be") return "being";
  if(/ie$/.test(v)) return v.slice(0,-2)+"ying";
  if(/[^eoy]e$/.test(v) && v!=="be") return v.slice(0,-1)+"ing";
  if(doubles(v)) return v+v.slice(-1)+"ing";
  return v+"ing";
}
function ed(v){
  if(/e$/.test(v)) return v+"d";
  if(/[^aeiou]y$/.test(v)) return v.slice(0,-1)+"ied";
  if(doubles(v)) return v+v.slice(-1)+"ed";
  return v+"ed";
}
function third(v){
  if(v==="have") return "has";
  if(v==="do") return "does";
  if(v==="go") return "goes";
  if(/(s|x|z|ch|sh|o)$/.test(v)) return v+"es";
  if(/[^aeiou]y$/.test(v)) return v.slice(0,-1)+"ies";
  return v+"s";
}
function past(v){ return IRRMAP[v]? IRRMAP[v].past : ed(v); }
function pp(v){ return IRRMAP[v]? IRRMAP[v].pp : ed(v); }

function conj(v, S){
  const t3 = ["he","she","it"].includes(S);
  const isI = S==="I";
  const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
  const s = S; const sq = S; // subject as written
  const B = x=>"<b>"+x+"</b>";
  const be = isI?"am":t3?"is":"are", beN = isI?"'m not":t3?" isn't":" aren't", was = (isI||t3)?"was":"were";
  const has = t3?"has":"have";
  const g = ing(v), p = pp(v);
  const o = {};
  if(v==="be"){
    o.ps=[cap(s)+" "+B(be), cap(s)+B(beN), B(cap(be))+" "+sq+"?"];
    o.pas=[cap(s)+" "+B(was), cap(s)+" "+B(was+"n't"), B(cap(was))+" "+sq+"?"];
  } else {
    o.ps=[cap(s)+" "+B(t3?third(v):v), cap(s)+" "+B(t3?"doesn't":"don't")+" "+B(v), B(t3?"Does":"Do")+" "+sq+" "+B(v)+"?"];
    o.pas=[cap(s)+" "+B(past(v)), cap(s)+" "+B("didn't")+" "+B(v), B("Did")+" "+sq+" "+B(v)+"?"];
  }
  o.pc=[cap(s)+" "+B(be+" "+g), cap(s)+B(beN)+" "+B(g), B(cap(be))+" "+sq+" "+B(g)+"?"];
  o.pp=[cap(s)+" "+B(has+" "+p), cap(s)+" "+B(has+"n't "+p), B(cap(has))+" "+sq+" "+B(p)+"?"];
  o.ppc=[cap(s)+" "+B(has+" been "+g), cap(s)+" "+B(has+"n't been "+g), B(cap(has))+" "+sq+" "+B("been "+g)+"?"];
  o.pac=[cap(s)+" "+B(was+" "+g), cap(s)+" "+B(was+"n't "+g), B(cap(was))+" "+sq+" "+B(g)+"?"];
  o.pap=[cap(s)+" "+B("had "+p), cap(s)+" "+B("hadn't "+p), B("Had")+" "+sq+" "+B(p)+"?"];
  o.papc=[cap(s)+" "+B("had been "+g), cap(s)+" "+B("hadn't been "+g), B("Had")+" "+sq+" "+B("been "+g)+"?"];
  o.fs=[cap(s)+" "+B("will "+v), cap(s)+" "+B("won't "+v), B("Will")+" "+sq+" "+B(v)+"?"];
  o.fc=[cap(s)+" "+B("will be "+g), cap(s)+" "+B("won't be "+g), B("Will")+" "+sq+" "+B("be "+g)+"?"];
  o.fp=[cap(s)+" "+B("will have "+p), cap(s)+" "+B("won't have "+p), B("Will")+" "+sq+" "+B("have "+p)+"?"];
  o.fpc=[cap(s)+" "+B("will have been "+g), cap(s)+" "+B("won't have been "+g), B("Will")+" "+sq+" "+B("have been "+g)+"?"];
  // I'm not fix: "I'm not" (no space before 'm)
  return o;
}

const verbIn=document.getElementById("verbIn"), subjIn=document.getElementById("subjIn"), board=document.getElementById("tenseBoard"), hint=document.getElementById("verbHint");
function esc(x){return x.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function renderTenses(){
  let v = verbIn.value.trim().toLowerCase().replace(/^to\s+/,"").replace(/[^a-z\s-]/g,"");
  if(!v) v="walk";
  v = v.split(/\s+/)[0];
  const S = subjIn.value;
  const o = conj(v,S);
  hint.innerHTML = IRRMAP[v] ? "<b>"+esc(v)+"</b> is irregular: "+esc(IRRMAP[v].past)+" · "+esc(IRRMAP[v].pp)
                             : (v==="be"?"":"<b>"+esc(v)+"</b> is treated as regular: "+esc(ed(v))+". Check the spelling if it looks odd.");
  let html="";
  for(const [time,list] of Object.entries(TENSES)){
    html+='<div class="time-row"><div class="time-label">'+time+'</div><div class="tense-grid">';
    for(const t of list){
      const L=o[t.k];
      html+='<article class="card tense"><h3>'+t.n+'</h3><div class="formula">'+t.f+'</div><div class="lines">'+
        '<div><i>+</i><span>'+L[0]+'.</span></div><div><i>−</i><span>'+L[1]+'.</span></div><div><i>?</i><span>'+L[2]+'</span></div></div>'+
        '<div class="use">'+t.u+' <span class="es">'+t.es+'</span></div><div class="signals">'+t.s+'</div></article>';
    }
    html+='</div></div>';
  }
  board.innerHTML=html;
  document.querySelectorAll("#quickVerbs .chip").forEach(c=>c.setAttribute("aria-pressed", c.dataset.v===v?"true":"false"));
}
const QV=["walk","be","have","go","study","eat","work","stop"];
document.getElementById("quickVerbs").innerHTML=QV.map(q=>'<button type="button" class="chip" data-v="'+q+'">'+q+'</button>').join("");
document.getElementById("quickVerbs").addEventListener("click",e=>{const b=e.target.closest(".chip"); if(!b)return; verbIn.value=b.dataset.v; renderTenses();});
verbIn.addEventListener("input",renderTenses); subjIn.addEventListener("change",renderTenses);
renderTenses();

/* ---------------- irregular verbs table ---------------- */
const tbody=document.querySelector("#verbTable tbody"), vs=document.getElementById("verbSearch"), vc=document.getElementById("verbCount"), ve=document.getElementById("verbEmpty");
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function renderVerbs(){
  const q=norm(vs.value.trim());
  const rows=IRR.filter(r=>!q || r.some(c=>norm(c).includes(q)));
  tbody.innerHTML=rows.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td><div class="rowbtns"><button class="rowbtn" type="button" data-v="'+r[0]+'">see tenses</button><button class="rowbtn save" type="button" data-save data-w="'+esc(r[0]+" · "+r[1]+" · "+r[2])+'" data-m="'+esc(r[3])+'" data-e="">+ Save</button></div></td></tr>').join("");
  ve.hidden = rows.length>0;
  vc.textContent = q ? rows.length+" of "+IRR.length+" verbs" : IRR.length+" verbs";
}
vs.addEventListener("input",renderVerbs);
tbody.addEventListener("click",e=>{const b=e.target.closest("[data-v]"); if(!b)return; verbIn.value=b.dataset.v; renderTenses(); go("tenses"); window.scrollTo({top:0});});
renderVerbs();

/* ---------------- frequency ---------------- */
const FREQ=[[100,"always","I always study after class."],[90,"usually","I usually walk to work."],[80,"normally / generally","I normally sleep 8 hours."],[70,"often / frequently","I often read in bed."],[50,"sometimes","I sometimes sing in the shower."],[30,"occasionally","I occasionally go to bed late."],[10,"seldom / rarely","I rarely eat fast food."],[5,"hardly ever","I hardly ever get angry."],[0,"never","Vegetarians never eat meat."]];
document.getElementById("freqScale").innerHTML=FREQ.map(f=>'<div><span class="mono">'+f[0]+'%</span><b>'+f[1]+'</b><span class="ex">'+f[2]+'</span></div>').join("");

/* ---------------- linking words ---------------- */
const LINK=[
 ["Add an idea","añadir",["and","also","too","as well","in addition","moreover","besides","not only… but also"]],
 ["Contrast","contrastar",["but","however","although","even though","while","on the other hand","despite / in spite of","instead"]],
 ["Cause","causa",["because","since","as","because of","due to","that's why"]],
 ["Result","consecuencia",["so","therefore","as a result","that's why","consequently"]],
 ["Examples","ejemplos",["for example","for instance","such as","like","especially","in particular"]],
 ["Order and time","secuencia",["first","then","after that","finally","meanwhile","as soon as","eventually","until"]],
 ["Condition","condición",["if","unless","as long as","in case","otherwise","provided that"]],
 ["Purpose","propósito",["to","in order to","so that"]],
 ["Clarify","aclarar",["actually","in fact","I mean","in other words","basically"]],
 ["Wrap up","concluir",["in short","overall","to sum up","in conclusion","all in all","at the end of the day"]]
];
document.getElementById("linkGrid").innerHTML=LINK.map(g=>'<div class="card"><h3>'+g[0]+' <span class="es" style="font-weight:600">'+g[1]+'</span></h3><p style="margin:0">'+g[2].map((w,i)=>i<2?'<b>'+w+'</b>':w).join(" · ")+'</p></div>').join("");

/* ---------------- false friends ---------------- */
const FF=[["actually","en realidad","actualmente","currently, nowadays"],["assist","ayudar","asistir (a algo)","attend"],["library","biblioteca","librería","bookstore"],["embarrassed","avergonzado/a","embarazada","pregnant"],["sensible","sensato/a","sensible","sensitive"],["realize","darse cuenta","realizar","do, carry out"],["carpet","alfombra","carpeta","folder"],["exit","salida","éxito","success"],["constipated","estreñido/a","resfriado","have a cold"],["discussion","conversación, debate","discusión (pelea)","argument"],["fabric","tela","fábrica","factory"],["career","carrera profesional","carrera (universidad)","degree, major"],["lecture","clase, charla","lectura","reading"],["eventually","finalmente, con el tiempo","eventualmente","possibly"],["intend","tener la intención","intentar","try"],["attend","asistir","atender","help, serve"],["notice","darse cuenta, notar","noticia","news"],["parents","padres","parientes","relatives"]];
document.getElementById("ffBody").innerHTML=FF.map(r=>'<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td class="no">'+r[2]+'</td><td class="ok">'+r[3]+'</td></tr>').join("");

/* ---------------- translator ---------------- */
let dir="es-en";
const trIn=document.getElementById("trIn"), lnkG=document.getElementById("lnkGoogle"), lnkD=document.getElementById("lnkDeepl"), lnkW=document.getElementById("lnkWR");
const trBtn=document.getElementById("trBtn"), trOut=document.getElementById("trOut"), outCard=document.getElementById("outCard");
function updateLinks(){
  const [sl,tl]=dir.split("-"); const t=trIn.value.trim();
  document.getElementById("fromLbl").textContent= sl==="es"?"Español":"English";
  document.getElementById("toLbl").textContent= tl==="es"?"Español":"English";
  trIn.placeholder = sl==="es" ? "Ej: Me cuesta entender cuando hablan rápido" : "E.g. I'm looking forward to it";
  lnkG.href="https://translate.google.com/?sl="+sl+"&tl="+tl+(t?"&text="+encodeURIComponent(t):"")+"&op=translate";
  lnkD.href="https://www.deepl.com/translator#"+sl+"/"+tl+"/"+(t?encodeURIComponent(t).replace(/%2F/g,"%5C%2F"):"");
  const single=/^[\p{L}'-]+$/u.test(t);
  lnkW.hidden=!single;
  if(single) lnkW.href = sl==="es" ? "https://www.wordreference.com/es/en/translation.asp?spen="+encodeURIComponent(t) : "https://www.wordreference.com/es/translation.asp?tranword="+encodeURIComponent(t);
}
trIn.addEventListener("input",updateLinks);
document.getElementById("swapBtn").addEventListener("click",()=>{dir= dir==="es-en"?"en-es":"es-en"; updateLinks();});
updateLinks();

let sample=null, ctrl=null;
function useCsSample(){ if(!sample && window.__csSample){ sample=window.__csSample; trBtn.hidden=false; outCard.hidden=false; } }
window.addEventListener("cs-sample-ready",useCsSample); useCsSample();
/* without the AI, the save button lives next to the links instead */
setTimeout(()=>{ if(!sample){ const s=document.getElementById("trSave"), l=document.querySelector("#v-translate .links"); if(s&&l){ s.className="linkbtn save-link"; l.appendChild(s); } } },4000);
document.getElementById("trSayBtn").addEventListener("click",()=>{ const t=trOut.dataset.en; if(t&&window.csSpeak) window.csSpeak(t); });
trBtn.addEventListener("click",async()=>{
  const t=trIn.value.trim(); if(!t||!sample) { trIn.focus(); return; }
  if(ctrl) ctrl.abort(); ctrl=new AbortController();
  trOut.classList.remove("placeholder"); trOut.textContent="Translating…"; trBtn.disabled=true; trOut.dataset.tr=""; trOut.dataset.en="";
  document.getElementById("trNote").hidden=true; document.getElementById("trSay").hidden=true;
  const prompt="You help a Spanish-speaking (Chilean) English learner. The text below is in Spanish or English. The learner chose "+(dir==="es-en"?"Spanish → English":"English → Spanish")+", but they may have written in the other language: detect the real language yourself.\n"+
    "Translate it into the other language: Spanish into natural, everyday English; English into natural Chilean Spanish.\n"+
    "Reply with ONLY a JSON object, no code fences:\n"+
    "{\"from\": \"es\" or \"en\", \"translation\": \"the translation\", \"also\": \"a more natural or common alternative, or an empty string\", \"say\": \"a learner-friendly American English pronunciation respelling of the ENGLISH text (the original if it is English, otherwise the translation), with the stressed syllable in CAPITALS and hyphens between syllables, like KUMF-ter-buhl for comfortable or ai-m LUK-ing FOR-werd tuh it. Use simple English spelling, no IPA. Empty string if the English text is longer than 10 words.\"}\n\nText:\n"+t;
  try{
    const r=await sample(prompt,{modelTier:"quick",signal:ctrl.signal});
    let j=null; try{ j=JSON.parse(String(r.text||"").replace(/^[^{]*/,"").replace(/[^}]*$/,"")); }catch(er){}
    if(!j||!j.translation){ trOut.textContent=r.text; trOut.dataset.tr=String(r.text||"").split("\n")[0]; return; }
    const from=j.from==="en"?"en":"es";
    if((from==="en")!==(dir==="en-es")){ dir=from==="en"?"en-es":"es-en"; updateLinks(); const n=document.getElementById("trNote"); n.hidden=false; n.textContent=from==="en"?"✨ That looks like English, so I translated it into Spanish.":"✨ That looks like Spanish, so I translated it into English."; }
    trOut.innerHTML=esc(j.translation)+(j.also&&String(j.also).trim()?'<span class="tr-also">Also: '+esc(j.also)+'</span>':"");
    trOut.dataset.tr=j.translation; trOut.dataset.en= from==="en"? t : j.translation;
    if(j.say&&String(j.say).trim()){ document.getElementById("trSayP").textContent=j.say; document.getElementById("trSay").hidden=false; }
  }catch(e){
    if(window.csCheckUpdate) window.csCheckUpdate();
    if(!(e&&e.name==="AbortError")){
      let ok=false;
      try{ const r2=await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(t.slice(0,480))+"&langpair="+(dir==="es-en"?"es|en":"en|es"),{signal:ctrl.signal});
        const j2=await r2.json(); const tx=j2&&j2.responseData&&j2.responseData.translatedText;
        if(r2.ok&&tx&&!/MYMEMORY WARNING|INVALID|QUERY LENGTH/i.test(tx)){ const clean=String(tx).replace(/&#39;/g,"’").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
          trOut.innerHTML=esc(clean)+'<span class="tr-also">Quick translation (the smart translator is busy). For more options, try Google Translate or DeepL below.</span>';
          trOut.dataset.tr=clean; trOut.dataset.en= dir==="es-en"? clean : t; ok=true; } }catch(er){}
      if(!ok) trOut.textContent=(e&&e.code==="rate_limited")?"The translator is busy right now. Try again in a minute, or use Google Translate or DeepL below.":"That didn't work. Use Google Translate or DeepL below.";
    }
  }finally{ trBtn.disabled=false; }
});

/* ---------------- conditionals ---------------- */
const CPRE=[["it","rain","","I","stay","at home"],["I","have","more time","I","travel","more"],["you","study","every day","you","pass","the exam"],["I","be","rich","I","buy","a house in Chiloé"],["she","be","here","she","help","us"],["we","leave","earlier","we","catch","the bus"]];
const cIds=["c1s","c1v","c1r","c2s","c2v","c2r"].map(i=>document.getElementById(i));
document.getElementById("condPresets").innerHTML=CPRE.map((p,i)=>'<button type="button" class="chip" data-ci="'+i+'">if '+p[0]+' '+p[1]+(p[2]?' '+p[2]:'')+'…</button>').join("");
document.getElementById("condPresets").addEventListener("click",e=>{const b=e.target.closest("[data-ci]"); if(!b)return; CPRE[b.dataset.ci].forEach((v,i)=>cIds[i].value=v); renderCond();});
cIds.forEach(el=>el.addEventListener("input",renderCond));
function isThird(s){ return !["i","you","we","they"].includes(s.toLowerCase()); }
function presentOf(s,v){ if(v==="be") return s.toLowerCase()==="i"?"am":isThird(s)?"is":"are"; return isThird(s)?third(v):v; }
function cleanV(x){ return (x||"").trim().toLowerCase().replace(/^to\s+/,"").split(/\s+/)[0].replace(/[^a-z-]/g,""); }
function subj(x,first){ x=(x||"").trim(); if(!x) return "…"; if(x.toLowerCase()==="i") return "I"; return first? x.charAt(0).toUpperCase()+x.slice(1) : x.charAt(0).toLowerCase()+x.slice(1); }
function renderCond(){
  const s1=subj(cIds[0].value), v1=cleanV(cIds[1].value)||"…", r1=cIds[2].value.trim();
  const s2=subj(cIds[3].value), v2=cleanV(cIds[4].value)||"…", r2=cIds[5].value.trim();
  if(v1==="…"||v2==="…"){ document.getElementById("condOut").innerHTML='<div class="card">Write a verb in both parts to see the four conditionals.</div>'; return; }
  const R=r=>r?" "+esc(r):"";
  const B=x=>"<b>"+esc(x)+"</b>";
  const rows=[
    {n:"Zero conditional",use:"Facts and things that are always true.",es:"Si + presente, presente",f:"If + present, present",
     a:presentOf(s1,v1),b:presentOf(s2,v2)},
    {n:"First conditional",use:"A real possibility in the future.",es:"Si + presente, futuro",f:"If + present, will + verb",
     a:presentOf(s1,v1),b:"will "+v2},
    {n:"Second conditional",use:"Imaginary or unlikely, now or in the future.",es:"Si + lloviera, me quedaría",f:"If + past, would + verb",
     a:(v1==="be"?"were":past(v1)),b:"would "+v2},
    {n:"Third conditional",use:"Imaginary past. Regrets and “what if”.",es:"Si + hubiera…, habría…",f:"If + had + participle, would have + participle",
     a:"had "+pp(v1),b:"would have "+pp(v2)}
  ];
  document.getElementById("condOut").innerHTML=rows.map(r=>'<div class="card cond"><h3>'+r.n+'</h3><div class="formula">'+r.f+'</div>'+
    '<p class="sent">If '+esc(s1)+' '+B(r.a)+R(r1)+', '+esc(s2)+' '+B(r.b)+R(r2)+'.</p>'+
    '<div class="use">'+r.use+' <span class="es">'+r.es+'</span></div></div>').join("");
}
renderCond();

/* ---------------- searchable lists helper ---------------- */
function searchable(inputId,bodyId,countId,emptyId,data,rowFn,label){
  const inp=document.getElementById(inputId), body=document.getElementById(bodyId), cnt=document.getElementById(countId), emp=emptyId?document.getElementById(emptyId):null;
  function r(){
    const q=norm(inp.value.trim());
    const rows=data.filter(d=>!q||d.some(c=>norm(c).includes(q)));
    body.innerHTML=rows.map(rowFn).join("");
    cnt.textContent= q? rows.length+" of "+data.length+" "+label : data.length+" "+label;
    if(emp) emp.hidden=rows.length>0;
  }
  inp.addEventListener("input",r); r();
}

/* ---------------- gerund / infinitive ---------------- */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-gomod]"); if(!b) return; const id=b.dataset.gomod;
  try{ sessionStorage.setItem("cs-mod",id); }catch(er){} if(typeof go==="function") go("quiz",true); else location.hash="#quiz";
  setTimeout(()=>{ const g=document.querySelector('#v-quiz [data-pr="gram"]'); if(g) g.click(); setTimeout(()=>{ const t=document.querySelector('#v-quiz [data-modtile="'+id+'"]'); if(t) t.click(); },60); },180); });
const GER=[
["enjoy","-ing","I enjoy cooking.","disfrutar"],["avoid","-ing","Try to avoid eating late.","evitar"],["finish","-ing","I finished working at 7.","terminar"],
["mind","-ing","Do you mind waiting?","importar"],["consider","-ing","I'm considering moving.","considerar"],["suggest","-ing","She suggested going out.","sugerir"],
["keep","-ing","He keeps interrupting me.","seguir, no parar de"],["practice","-ing","Practice speaking every day.","practicar"],["miss","-ing","I miss living by the beach.","extrañar"],
["imagine","-ing","Imagine living in Japan.","imaginar"],["recommend","-ing","I recommend reading it.","recomendar"],["admit","-ing","He admitted making a mistake.","admitir"],
["deny","-ing","She denied taking it.","negar"],["can't stand","-ing","I can't stand waiting.","no soportar"],["don't mind","-ing","I don't mind driving.","no me molesta"],
["feel like","-ing","I feel like ordering pizza.","tener ganas de"],["look forward to","-ing","I'm looking forward to seeing you.","esperar con ganas"],
["give up","-ing","I gave up drinking soda.","dejar de"],["spend (time)","-ing","I spent the day studying.","pasar (tiempo)"],["it's worth","-ing","It's worth visiting.","vale la pena"],
["want","to","I want to learn.","querer"],["need","to","I need to rest.","necesitar"],["decide","to","She decided to quit.","decidir"],["plan","to","We plan to travel.","planear"],
["hope","to","I hope to see you soon.","esperar (ojalá)"],["learn","to","I'm learning to drive.","aprender"],["agree","to","He agreed to help.","aceptar"],
["promise","to","I promise to call.","prometer"],["manage","to","I managed to finish.","lograr"],["afford","to","I can't afford to buy it.","permitirse (pagar)"],
["offer","to","She offered to help.","ofrecerse"],["refuse","to","He refused to pay.","negarse"],["expect","to","I expect to finish soon.","esperar (prever)"],
["would like","to","I'd like to order.","me gustaría"],["seem","to","It seems to be broken.","parecer"],["tend","to","I tend to forget names.","tender a"],
["pretend","to","He pretended to be sick.","fingir"],["forget","both, different meaning","See the cards below.","olvidar"],
["like","both, same meaning","I like reading. / I like to read.","gustar"],["love","both, same meaning","I love dancing. / I love to dance.","encantar"],
["hate","both, same meaning","I hate waiting. / I hate to wait.","odiar"],["prefer","both, same meaning","I prefer walking. / I prefer to walk.","preferir"],
["start","both, same meaning","It started raining. / It started to rain.","empezar"],["begin","both, same meaning","She began working. / She began to work.","empezar"],
["continue","both, same meaning","He continued talking. / He continued to talk.","continuar"],
["stop","both, different meaning","See the cards below.","parar, dejar de"],["remember","both, different meaning","See the cards below.","recordar"],["try","both, different meaning","See the cards below.","intentar, probar"]
];
searchable("gerSearch","gerBody","gerCount",null,GER,r=>'<tr><td><b>'+r[0]+'</b></td><td>'+(r[1]==="-ing"?'<span class="tag">-ing</span>':r[1]==="to"?'<span class="tag" style="background:var(--green-soft);color:var(--green)">to + verb</span>':'<span class="count">'+r[1]+'</span>')+'</td><td>'+r[2]+'</td><td class="es">'+r[3]+'</td></tr>',"verbs");

/* ---------------- phrasal verbs ---------------- */
const PH=[
["get up","levantarse","I get up at 7."],["wake up","despertarse","I woke up late."],["give up","rendirse; dejar de","Don't give up!"],["look for","buscar","I'm looking for my keys."],
["look after","cuidar","She looks after her little brother."],["look up","buscar (información)","Look it up online."],["look forward to","esperar con ganas","I'm looking forward to the trip."],
["find out","averiguar, enterarse","I found out yesterday."],["figure out","entender, resolver","I can't figure it out."],["turn on","encender","Turn on the lights."],
["turn off","apagar","Turn off your camera."],["turn down","rechazar; bajar (volumen)","She turned down the job."],["turn up","subir (volumen); aparecer","Turn up the music!"],
["put on","ponerse (ropa)","Put on a jacket."],["take off","quitarse; despegar","Take off your shoes. / The plane took off."],["try on","probarse (ropa)","Can I try this on?"],
["pick up","recoger; contestar","I'll pick you up at 8. / Pick up the phone!"],["call back","devolver la llamada","I'll call you back."],["hang out","juntarse, pasar el rato","We hung out at the park."],
["go out","salir","Are you going out tonight?"],["come back","volver","When are you coming back?"],["get back","volver; recuperar","I got back home at 10."],
["get along (with)","llevarse bien","I get along with my boss."],["run into","toparse con","I ran into Pedro at the mall."],["run out of","quedarse sin","We ran out of milk."],
["set up","configurar, organizar","Can you set up the meeting?"],["show up","aparecer, llegar","He showed up late."],["work out","hacer ejercicio; resultar bien","I work out three times a week. / It worked out!"],
["check out","revisar, mirar","Check out this video."],["fill out","rellenar (formulario)","Fill out this form, please."],["carry on","continuar","Carry on, sorry!"],
["end up","terminar (haciendo algo)","We ended up staying home."],["break up","terminar (una relación)","They broke up last year."],["calm down","calmarse","Calm down, it's ok."],
["catch up","ponerse al día","Let's catch up soon!"],["come up with","ocurrírsele (una idea)","She came up with a great idea."],["deal with","lidiar con","I have to deal with a lot of emails."],
["get over","superar","I'm still getting over the flu."],["grow up","crecer, criarse","I grew up in Temuco."],["hold on","esperar un momento","Hold on a second."],
["keep up (with)","seguir el ritmo","It's hard to keep up with native speakers."],["let down","decepcionar","Don't let me down."],["make up","inventar; reconciliarse","He made up an excuse."],
["point out","señalar","She pointed out a mistake."],["put off","posponer","Stop putting it off!"],["sort out","solucionar, ordenar","I need to sort out my papers."],
["take care of","cuidar; encargarse","I'll take care of it."],["take up","empezar (un hobby)","I took up yoga."],["throw away","botar","Don't throw that away!"],
["go on","continuar; pasar","What's going on? / Go on, I'm listening."],["bring up","mencionar (un tema); criar","Don't bring up politics."],["cheer up","animar(se)","Cheer up! It's Friday."]
];
searchable("phSearch","phBody","phCount","phEmpty",PH,r=>'<tr><td><b>'+r[0]+'</b></td><td class="es">'+r[1]+'</td><td>'+r[2]+'</td><td><button class="rowbtn save" type="button" data-save data-w="'+esc(r[0])+'" data-m="'+esc(r[1])+'" data-e="'+esc(r[2])+'">+ Save</button></td></tr>',"phrasal verbs");

/* ---------------- pronunciation ---------------- */
const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance!=="undefined";
let enVoice=null;
function pickVoice(){ if(!canSpeak) return; const vs=speechSynthesis.getVoices(); enVoice=vs.find(v=>/en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null; }
if(canSpeak){ pickVoice(); try{ speechSynthesis.addEventListener("voiceschanged",pickVoice); }catch(e){} }
function say(text,btn){
  if(window.csUnlockAudio) window.csUnlockAudio(false);
  if(!canSpeak) return;
  if(window.csSpeak){ document.querySelectorAll(".say.playing").forEach(x=>x.classList.remove("playing")); if(btn) btn.classList.add("playing"); window.csSpeak(text,{rate:(window.csBeginnerOn&&window.csBeginnerOn())?.72:.85,onend:()=>{ if(btn) btn.classList.remove("playing"); }}); return; }
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=.85; if(enVoice) u.voice=enVoice;
    if(btn){ btn.classList.add("playing"); u.onend=u.onerror=()=>btn.classList.remove("playing"); }
    speechSynthesis.speak(u);
  }catch(e){}
}
const sayBtn=w=> canSpeak ? '<button class="say" type="button" data-say="'+esc(w)+'" aria-label="Hear '+esc(w)+'">🔊</button>' : '';
const TRICKY=[["comfortable","<b>KUMF</b>-ter-bl","3 syllables, not com-for-ta-ble"],["vegetable","<b>VEJ</b>-tuh-bl","3 syllables"],["Wednesday","<b>WENZ</b>-day","the first d is silent"],
["clothes","klohz","sounds like “close”"],["island","<b>EYE</b>-lund","silent s"],["receipt","rih-<b>SEET</b>","silent p"],["chocolate","<b>CHOK</b>-lit","2 syllables"],
["interesting","<b>IN</b>-truh-sting","stress at the start"],["different","<b>DIF</b>-rent","2 syllables"],["every","<b>EV</b>-ree","2 syllables"],
["school","skool","no “e” at the start (not “eschool”)"],["specific","spuh-<b>SIF</b>-ik","no “e” at the start"],["recipe","<b>RES</b>-uh-pee","3 syllables, the e is not silent"],
["women","<b>WIM</b>-in","sounds nothing like “woman”"],["busy","<b>BIZ</b>-ee","u sounds like i"],["develop","dih-<b>VEL</b>-up","stress in the middle"],
["hotel","hoh-<b>TEL</b>","stress at the end"],["photographer","fuh-<b>TOG</b>-ruh-fer","stress moves: PHO-to-graph → pho-TO-gra-pher"]];
document.getElementById("trickyGrid").innerHTML=TRICKY.map(t=>'<div class="card word">'+sayBtn(t[0])+'<div><div class="w">'+t[0]+'</div><div class="h">'+t[1]+' · '+t[2]+'</div></div></div>').join("");
const SILENT=[["<s>k</s>nife · <s>k</s>now","knife, know","silent k before n"],["<s>w</s>rite · <s>w</s>rong","write, wrong","silent w before r"],["lis<s>t</s>en · cas<s>t</s>le","listen, castle","silent t"],
["ha<s>l</s>f · ta<s>l</s>k · cou<s>l</s>d","half, talk, could","silent l"],["dou<s>b</s>t · clim<s>b</s>","doubt, climb","silent b"],["<s>h</s>our · <s>h</s>onest","hour, honest","silent h"],
["forei<s>g</s>n · si<s>g</s>n","foreign, sign","silent g"],["ans<s>w</s>er","answer","silent w"]];
document.getElementById("silentGrid").innerHTML=SILENT.map(t=>'<div class="card word">'+sayBtn(t[1])+'<div><div class="w">'+t[0]+'</div><div class="h">'+t[2]+'</div></div></div>').join("");
const PAIRS=[["ship / sheep","short i vs long ee"],["live / leave","short i vs long ee"],["full / fool","short u vs long oo"],["cap / cup","open a vs short u"],
["walk / work","aw vs er"],["three / tree","th vs t"],["thank / tank","th vs t"],["very / berry","v (teeth on lip) vs b"],["think / sink","th vs s"]];
document.getElementById("pairsGrid").innerHTML=PAIRS.map(t=>'<div class="card word">'+sayBtn(t[0].replace(" / ",". "))+'<div><div class="w">'+t[0]+'</div><div class="h">'+t[1]+'</div></div></div>').join("");
document.getElementById("v-pronunciation").addEventListener("click",e=>{const b=e.target.closest("[data-say]"); if(b) say(b.dataset.say,b);});
if(!canSpeak) document.getElementById("pronLede").innerHTML="Words that trick almost everyone. The <b>bold</b> part is the stressed syllable.";

/* ---------------- quiz ---------------- */
const COMMON=["be", "have", "do", "go", "get", "make", "say", "see", "know", "take", "come", "think", "give", "find", "tell", "become", "leave", "feel", "put", "bring", "begin", "keep", "hold", "write", "stand", "hear", "let", "mean", "meet", "run", "pay", "sit", "speak", "read", "lose", "grow", "fall", "send", "build", "understand", "spend", "buy", "eat", "drink", "sleep", "sell", "teach", "catch", "choose", "drive", "forget", "wear", "win", "break", "swim", "sing", "fly", "wake", "cut", "hurt"];
let qLevel="common", qCur=null, qChecked=false, qRight=0, qStreak=0, qLast="";
const qzPast=document.getElementById("qzPast"), qzPP=document.getElementById("qzPP"), qzFb=document.getElementById("qzFeedback");
function qPool(){ return qLevel==="common" ? IRR.filter(r=>COMMON.includes(r[0])) : IRR; }
function qNext(){
  const pool=qPool(); let r; do{ r=pool[Math.floor(Math.random()*pool.length)]; }while(pool.length>1 && r[0]===qLast);
  qCur=r; qLast=r[0]; qChecked=false;
  document.getElementById("qzVerb").textContent=r[0];
  document.getElementById("qzEs").textContent=r[3];
  qzPast.value=""; qzPP.value=""; qzPast.className=""; qzPP.className=""; qzFb.textContent="";
  document.getElementById("qzLevel").textContent= qLevel==="common"?"common verbs":"all verbs";
}
function okForm(input,answer){
  const opts=answer.toLowerCase().split(" / ").map(s=>s.trim());
  const parts=input.toLowerCase().split(/[\/,]| or /).map(s=>s.trim()).filter(Boolean);
  return parts.length>0 && parts.every(p=>opts.includes(p));
}
function qScore(){ document.getElementById("qzScore").textContent=qRight+" correct · streak "+qStreak; }
document.getElementById("qzForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(qChecked){ qNext(); qzPast.focus(); return; }
  const a=okForm(qzPast.value,qCur[1]), b=okForm(qzPP.value,qCur[2]);
  qzPast.className=a?"right":"wrong"; qzPP.className=b?"right":"wrong";
  qChecked=true;
  if(a&&b){ qRight++; qStreak++; if(qRight%10===0){ document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:10,perfect:false,finished:false,irr:true}})); document.dispatchEvent(new CustomEvent("cs-irrround")); } qzFb.innerHTML='<span class="ok">Nice!</span> '+esc(qCur[0])+' · '+esc(qCur[1])+' · '+esc(qCur[2])+' <span class="count">(Enter for the next one)</span>'; }
  else { qStreak=0; qzFb.innerHTML='Almost. It\'s <b>'+esc(qCur[0])+' · '+esc(qCur[1])+' · '+esc(qCur[2])+'</b> <span class="count">(Enter for the next one)</span>'; }
  qScore();
});
document.getElementById("qzShow").addEventListener("click",()=>{ qzFb.innerHTML='<b>'+esc(qCur[0])+' · '+esc(qCur[1])+' · '+esc(qCur[2])+'</b>'; qStreak=0; qChecked=true; qScore(); });
document.getElementById("qzNext").addEventListener("click",()=>{ qNext(); qzPast.focus(); });
document.querySelectorAll("[data-ql]").forEach(b=>b.addEventListener("click",()=>{ qLevel=b.dataset.ql; document.querySelectorAll("[data-ql]").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false")); qNext(); }));
qNext();

/* ---------------- my notes ---------------- */
const PREVIEW=false;
const LS={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));try{window.__csOnSet&&window.__csOnSet(k);}catch(_){}return true;}catch(e){return false;}}};
const SAMPLE=[
 {id:"s1",w:"figure out",m:"entender, resolver",e:"I couldn't figure out the answer.",t:Date.now()-86400000*1,sample:true},
 {id:"s2",w:"leverage (verb)",m:"hacer uso de, echar mano de",e:"He leveraged his marketing skills to get the job.",t:Date.now()-86400000*3,sample:true},
 {id:"s3",w:"to be on the fence",m:"estar indeciso",e:"I'm still on the fence about the trip.",t:Date.now()-86400000*9,sample:true}
];
let words=LS.get("ncs-words",[]);
let lastCopy=LS.get("ncs-lastcopy",0);
let editingId=null;
const showSamples=()=>PREVIEW && words.length===0;
const allWords=()=>showSamples()?SAMPLE:words;


const toastEl=document.getElementById("toast"); let toastT;
function toast(msg){ toastEl.textContent=msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT=setTimeout(()=>toastEl.classList.remove("show"),2400); }

/* sheet link */
const sheetEmpty=document.getElementById("sheetEmpty"), sheetSet=document.getElementById("sheetSet"), sheetIn=document.getElementById("sheetIn"), sheetErr=document.getElementById("sheetErr"), sheetOpen=document.getElementById("sheetOpen");
function renderSheet(){
  const url=LS.get("ncs-sheet","");
  sheetEmpty.hidden=!!url; sheetSet.hidden=!url;
  if(url){
    sheetOpen.href=url;
    const isSheet=/docs\.google\.com\/spreadsheets\//i.test(url);
    let host=""; try{ host=new URL(url).hostname.replace(/^www\./,""); }catch(e){}
    document.getElementById("sheetTitle").textContent= isSheet?"My vocabulary sheet":"My vocabulary backup";
    document.getElementById("sheetSub").textContent= isSheet?"English Journey · your vocabulary tab":host;
    sheetOpen.textContent= isSheet?"Open my sheet ↗":"Open it ↗";
  }
}
document.getElementById("sheetForm").addEventListener("submit",e=>{
  e.preventDefault();
  const v=sheetIn.value.trim();
  let okUrl=false; try{ okUrl=new URL(v).protocol==="https:"; }catch(e){}
  if(!okUrl){ sheetErr.hidden=false; sheetIn.focus(); return; }
  sheetErr.hidden=true; LS.set("ncs-sheet",v); renderSheet(); toast("Sheet linked");
});
document.getElementById("sheetChange").addEventListener("click",()=>{ sheetIn.value=LS.get("ncs-sheet",""); try{localStorage.removeItem("ncs-sheet");}catch(e){} renderSheet(); sheetIn.focus(); sheetIn.select(); });
renderSheet();

/* words */
const wList=document.getElementById("wordList"), wSearch=document.getElementById("wSearch"), wCount=document.getElementById("wCount"), copyNewBtn=document.getElementById("copyNew");
const fmtDate=t=>{ const d=new Date(t); return d.toLocaleDateString("en-US",{month:"short",day:"numeric"}); };
let wSortMode="new"; try{ wSortMode=localStorage.getItem("cs-wsort")||"new"; }catch(e){}
const wKey=x=>String(x.w||"").toLowerCase().replace(/^(to|a|an|the)\s+/,"").trim();
function sortWords(l){
  if(wSortMode==="old") return l.sort((a,b)=>(a.t||0)-(b.t||0));
  /* 🌈 by type of word, in rainbow order (noun, verb, phrasal verb, adjective, adverb, expression, slang, other); newest first inside each */
  if(wSortMode==="pos"){ const R=["noun","verb","phrasal","adj","adv","expr","slang","other"], k=x=>{ const v=window.__posKey?window.__posKey(x.pos||""):"other"; const i=R.indexOf(x.pos?v:"other"); return i<0?R.length:i; };
    return l.sort((a,b)=>k(a)-k(b)||(b.t||0)-(a.t||0)); }
  if(wSortMode==="az"||wSortMode==="za"){ l.sort((a,b)=>wKey(a).localeCompare(wKey(b),"en",{sensitivity:"base"})); return wSortMode==="za"?l.reverse():l; }
  return l.sort((a,b)=>(b.t||0)-(a.t||0));
}
let wSel=true, fcPick=LS.get("ncs-fcpick",[]); if(!Array.isArray(fcPick)) fcPick=[];
function renderSelBar(){
  const bar=document.getElementById("wSelBar"); bar.hidden=!fcPick.length;
  const btn=document.getElementById("wSelBtn"); btn.setAttribute("aria-pressed",String(wSel)); btn.textContent=wSel?"Done choosing":"Choose words";
  const n=fcPick.length; document.getElementById("wSelN").textContent=n+(n===1?" word":" words")+" chosen";
  document.getElementById("wSelGo").disabled=!n;
}
/* every word gets a number in the order it was added (#1 = the first word), so a student can say "look at #65" */
function wordNums(){ const m=new Map(); words.map((x,i)=>[x,i]).sort((a,b)=>((a[0].t||0)-(b[0].t||0))||(a[1]-b[1])).forEach(([x],i)=>m.set(x.id,i+1)); return m; }
window.__wNums=wordNums;
function renderWords(){
  const list=sortWords(allWords().slice()), nums=wordNums();
  if(typeof renderSelBar==="function") renderSelBar();
  const q=norm(wSearch.value.trim());
  const qn=(wSearch.value.trim().match(/^#\s*(\d+)$/)||[])[1];
  const shown=list.filter(x=>!q||(qn?nums.get(x.id)===+qn:[x.w,x.m,x.e,x.n,x.def,x.pos].some(s=>norm(s||"").includes(q))||String(nums.get(x.id))===q));
  const newCount=words.filter(isPending).length + (showSamples()?SAMPLE.length:0);
  wCount.textContent= list.length? "· "+list.length : "";
  document.getElementById("wNavCount").textContent= words.length? words.length : "";
  document.getElementById("delAll").hidden=!words.length;
  document.getElementById("wAllBtn").textContent= words.length? "All my words ("+words.length+") →" : "All my words →";
  renderNudge();
  if(typeof renderFlash==="function") renderFlash();
  copyNewBtn.textContent= newCount? "Copy new words ("+newCount+")" : "Copy new words";
  copyNewBtn.disabled = !newCount;
  if(!list.length){ wList.innerHTML='<div class="card empty-notes"><b>No words yet.</b><br>When you hear a new word in class, add it above. It takes five seconds.</div>'; return; }
  if(!shown.length){ wList.innerHTML='<div class="card empty-notes">No words match “'+esc(wSearch.value)+'”.</div>'; return; }
  let wLim=window.__wLim||60; if(editingId){ const ix=shown.findIndex(x=>x.id===editingId); if(ix>=wLim) wLim=window.__wLim=ix+1; }
  const wLeft=shown.length-wLim;
  wList.innerHTML=shown.slice(0,wLim).map(x=>{
    if(x.id===editingId) return '<form class="card wcard-edit" data-editform="'+x.id+'" autocomplete="off">'+
      '<div class="field"><label for="ed-w">English word / expression</label><input id="ed-w" type="text" value="'+esc(x.w)+'" spellcheck="false"></div>'+
      '<div class="field"><label for="ed-m">Spanish translation</label><input id="ed-m" type="text" value="'+esc(x.m||"")+'"></div>'+
      '<div class="field wide"><label for="ed-def">English meaning</label><input id="ed-def" type="text" value="'+esc(x.def||"")+'" placeholder="Leave empty and Hibi writes it for you"></div>'+
      (window.csBeginnerOn&&window.csBeginnerOn()?'':'<div class="field wide w-senses-f"><button class="swap" type="button" data-senses="'+x.id+'">🔀 Other meanings</button><div id="ed-senses" aria-live="polite">'+(window.__wSensesOpen===x.id&&Array.isArray(x.senses)?sensesHTML(x):'')+'</div></div>')+
      '<div class="field wide"><label for="ed-e">Example sentence</label><input id="ed-e" type="text" value="'+esc(x.e||"")+'"></div>'+
      '<div class="field"><label for="ed-pr">🗣️ How to say it</label><input id="ed-pr" type="text" value="'+esc(x.pr||"")+'" placeholder="e.g. LEV-er-ij"></div>'+
      '<div class="field wide"><label for="ed-own">✍️ My own sentence</label><input id="ed-own" type="text" value="'+esc(x.own||"")+'" placeholder="Write a sentence of your own with this word"></div>'+
      '<div class="field wide"><label for="ed-n">Notes</label><input id="ed-n" type="text" value="'+esc(x.n||"")+'"></div>'+
      '<div class="note-actions"><button class="pill-btn" type="submit">Save changes</button><button class="swap" type="button" data-cancel>Cancel</button></div></form>';
    const isNew = x.sample || isPending(x);
    const picked=wSel&&fcPick.includes(x.id);
    return '<article class="card wcard'+(picked?' picked':'')+'">'+'<span class="w-lead">'+(x.sample?'':'<label class="w-chkw" title="Pick for flashcards"><input type="checkbox" class="w-chk" data-wpick="'+x.id+'" aria-label="Pick '+esc(x.w)+' for flashcards"'+(picked?' checked':'')+'></label>')+sayBtn(x.w.replace(/\(.*?\)/g,""))+'</span>'+
      '<div><div class="w">'+esc(x.w)+(x.pos?' <span class="pos">'+esc(x.pos)+'</span>':'')+'</div>'+(x.pr?'<div class="wpr" title="How to say it (CAPITALS = the strong part)"><span aria-hidden="true">🗣️</span> '+esc(x.pr)+'</div>':'')+(x.m?'<div class="m">'+esc(x.m)+'</div>':'')+(x.def?'<div class="wdef">'+esc(x.def)+'</div>':'')+(x.e?'<div class="ex">'+esc(x.e)+'</div>':'')+(x.mix&&x.mix.w&&!(window.csBeginnerOn&&window.csBeginnerOn())?'<div class="wmix">💡 <b>Easy to mix up:</b> '+esc(x.mix.w)+(x.mix.es?' = '+esc(x.mix.es):'')+'</div>':'')+(x.own?'<div class="wown">✍️ '+esc(x.own)+'</div>':(x.sample?'':'<button class="wown-add" type="button" data-ownw="'+x.id+'">✍️ Write my own sentence</button>'))+(x.n?'<div class="wn">📝 '+esc(x.n)+'</div>':'')+
      '<div class="meta">'+(x.sample?'<span class="badge ex">example</span>':'<span class="badge wnum" title="Word number (in the order you added them)">#'+nums.get(x.id)+'</span>')+''+(x.imp?'<span class="badge ex">imported</span>':'')+'<span class="badge date">'+fmtDate(x.t)+'</span></div></div>'+
      (x.sample?'<span></span>':'<div class="wbtns"><button class="del edit" type="button" data-edit="'+x.id+'" aria-label="Edit '+esc(x.w)+'">Edit</button><button class="del" type="button" data-del="'+x.id+'" aria-label="Delete '+esc(x.w)+'">Delete</button></div>')+'</article>';
  }).join("")+(wLeft>0?'<div class="w-more"><button class="pill-btn" type="button" id="wMore">Show more words <small>('+wLeft+' more)</small></button></div>':"");
  if(window.__wMoreWatch) window.__wMoreWatch();
}
window.__wRender=renderWords;
function isPending(x){ return !x.imp && x.t>lastCopy; }
function sensesHTML(x){
  const L=x.senses||[]; if(!L.length) return '<p class="muted small">“'+esc(x.w)+'” has just one common meaning. 👍</p>';
  return '<div class="w-senses">'+L.map((s,i)=>'<div class="w-sense"><div><b>'+esc(s.def)+'</b>'+(s.pos?' <span class="pos">'+esc(s.pos)+'</span>':'')+'</div>'+(s.es?'<div class="m">'+esc(s.es)+'</div>':'')+(s.ex?'<div class="ex">'+esc(s.ex)+'</div>':'')+
    '<div class="note-actions"><button class="swap" type="button" data-sense-use="'+i+'">Use this meaning</button><button class="swap" type="button" data-sense-new="'+i+'">Save as a new word</button></div></div>').join("")+'</div>';
}
async function showSenses(id){
  const x=words.find(y=>y.id===id), box=document.getElementById("ed-senses"); if(!x||!box) return;
  window.__wSensesOpen=id;   /* keeps the panel open if the list re-renders (e.g. a sync) */
  if(Array.isArray(x.senses)){ box.innerHTML=sensesHTML(x); return; }
  box.innerHTML='<p class="muted small">Looking up other meanings…</p>';
  try{ x.senses=await window.__wSenses(Object.assign({},x,{w:(document.getElementById("ed-w")||{}).value||x.w,m:(document.getElementById("ed-m")||{}).value||x.m})); LS.set("ncs-words",words); const b=document.getElementById("ed-senses"); if(b) b.innerHTML=sensesHTML(x); }
  catch(e){ const b=document.getElementById("ed-senses"); if(b) b.innerHTML='<p class="muted small">Couldn’t look that up right now. Try again in a moment.</p>'; }
}
function addWord(w,m,e,n){
  w=(w||"").trim(); m=(m||"").trim(); e=(e||"").trim(); n=(n||"").trim();
  if(!w) return false;
  if(words.some(x=>norm(x.w)===norm(w))){ toast("“"+w+"” is already in your words"); return true; }
  if(window.csUse) window.csUse("word");
  words.push(Object.assign({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),w,m,e,t:Date.now()},n?{n}:{}));
  const saved=LS.set("ncs-words",words);
  renderWords(); toast(saved?"Saved to your words":"Saved for now, but this browser blocks storage");
  return true;
}
document.getElementById("noteForm").addEventListener("submit",e=>{
  e.preventDefault();
  const w=document.getElementById("nWord"), m=document.getElementById("nMeaning"), ex=document.getElementById("nExample"), nn=document.getElementById("nNote");
  if(!w.value.trim()){ w.focus(); return; }
  addWord(w.value,m.value,ex.value,nn.value);
  w.value=""; m.value=""; ex.value=""; nn.value=""; w.focus();
});
wSearch.addEventListener("input",renderWords);
wList.addEventListener("submit",e=>{
  const f=e.target.closest("[data-editform]"); if(!f) return; e.preventDefault();
  const x=words.find(y=>y.id===f.dataset.editform); if(!x) return;
  const nw=document.getElementById("ed-w").value.trim(); if(!nw){ document.getElementById("ed-w").focus(); return; }
  /* Nov 27 2026 (Juan Manuel): changing the word or its Spanish translation (e.g. a word with several meanings) refreshes the English meaning and part of speech
     so they match the new sense, unless the student edited the English meaning by hand */
  const oldW=x.w, oldM=x.m||"", oldDef=x.def||"", oldPr=x.pr||""; const dIn=document.getElementById("ed-def"); const newDef=dIn?dIn.value.trim().slice(0,140):oldDef;
  x.w=nw; x.m=document.getElementById("ed-m").value.trim();
  let reFill=false;
  if(newDef!==oldDef){ if(newDef) x.def=newDef; else { delete x.def; reFill=true; } }
  else if(norm(nw)!==norm(oldW)||x.m!==oldM){ delete x.def; delete x.pos; reFill=true; }
  if(norm(nw)!==norm(oldW)){ delete x.pr; delete x.prTried; delete x.mix; delete x.senses; reFill=true; }
  else if(x.m!==oldM) delete x.senses;
  if(f.dataset.pos){ x.pos=f.dataset.pos; }   /* picked one of the 🔀 Other meanings */
  if(reFill){ delete x.ai; setTimeout(()=>{ try{ (window.queueEnrich||queueEnrich)([x.id]); }catch(e){} },0); }
  x.e=document.getElementById("ed-e").value.trim(); { const nv=document.getElementById("ed-n").value.trim(); if(nv) x.n=nv; else delete x.n; } { const ov=document.getElementById("ed-own").value.trim().slice(0,300); if(ov) x.own=ov; else delete x.own; } { const pi=document.getElementById("ed-pr"); if(pi){ const pv=pi.value.trim().slice(0,60); if(pv&&!(norm(nw)!==norm(oldW)&&pv===oldPr)) x.pr=pv; else if(norm(nw)!==norm(oldW)){ delete x.pr; delete x.prTried; } else { delete x.pr; x.prTried=1; } } }
  LS.set("ncs-words",words); editingId=null; renderWords(); toast("Changes saved");
});
wList.addEventListener("keydown",e=>{ if(e.key==="Escape" && editingId){ editingId=null; renderWords(); } });
function savePick(){ LS.set("ncs-fcpick",fcPick); renderWords(); }
wList.addEventListener("click",e=>{
  const pc=e.target.closest("[data-wpick]");
  if(pc){ const id=pc.dataset.wpick; fcPick=fcPick.includes(id)?fcPick.filter(i=>i!==id):fcPick.concat(id); savePick(); return; }
  const s=e.target.closest("[data-say]"); if(s){ say(s.dataset.say,s); return; }
  /* 🔀 Other meanings (edit form): look up once, then "Use this meaning" fills the form or "Save as a new word" adds a second card */
  const sb=e.target.closest("[data-senses]"); if(sb){ showSenses(sb.dataset.senses); return; }
  const su=e.target.closest("[data-sense-use]"); if(su){ const x=words.find(y=>y.id===editingId), sn=x&&x.senses&&x.senses[+su.dataset.senseUse]; if(!sn) return;
    const set=(id,v)=>{ const i=document.getElementById(id); if(i) i.value=v||""; }; set("ed-m",sn.es); set("ed-def",sn.def); set("ed-e",sn.ex);
    const f=su.closest("[data-editform]"); if(f&&sn.pos) f.dataset.pos=sn.pos; toast("Meaning swapped: tap Save changes"); return; }
  const sw=e.target.closest("[data-sense-new]"); if(sw){ const x=words.find(y=>y.id===editingId), sn=x&&x.senses&&x.senses[+sw.dataset.senseNew]; if(!sn) return;
    words.push(Object.assign({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),w:x.w,m:sn.es,def:sn.def,e:sn.ex,t:Date.now(),ai:1},sn.pos?{pos:sn.pos}:{},x.pr?{pr:x.pr}:{}));
    LS.set("ncs-words",words); sw.disabled=true; sw.textContent="✓ Saved as a new word"; toast("Saved as a new word"); return; }
  const ow=e.target.closest("[data-ownw]"); if(ow){ editingId=ow.dataset.ownw; renderWords(); const i=document.getElementById("ed-own"); if(i){ i.focus(); i.scrollIntoView({block:"center",behavior:"smooth"}); } return; }
  const ed=e.target.closest("[data-edit]"); if(ed){ editingId=ed.dataset.edit; renderWords(); const i=document.getElementById("ed-w"); if(i){ i.focus(); } return; }
  if(e.target.closest("[data-cancel]")){ editingId=null; renderWords(); return; }
  const d=e.target.closest("[data-del]"); if(!d) return;
  if(!d.classList.contains("confirm")){ d.classList.add("confirm"); d.textContent="Sure?"; setTimeout(()=>{ if(d.isConnected){ d.classList.remove("confirm"); d.textContent="Delete"; } },3000); return; }
  words=words.filter(x=>x.id!==d.dataset.del); LS.set("ncs-words",words); renderWords(); toast("Deleted");
});

/* copy */
const clean=s=>(s||"").replace(/[\t\r\n]+/g," ").trim();
async function copyText(text){
  try{ await navigator.clipboard.writeText(text); return true; }
  catch(e){
    const ta=document.getElementById("copyFallback"); ta.value=text; ta.select();
    try{ return document.execCommand("copy"); }catch(_){ return false; }
  }
}
async function doCopy(onlyNew){
  const list=allWords().filter(x=>!onlyNew || x.sample || isPending(x)).sort((a,b)=>a.t-b.t);
  if(!list.length){ toast("Nothing new to copy"); return; }
  const tsv=list.map(x=>[clean(x.w),clean(x.m),clean(x.e)].join("\t")).join("\n");
  const ok=await copyText(tsv);
  if(ok){
    if(!showSamples()){ lastCopy=Date.now(); LS.set("ncs-lastcopy",lastCopy); }
    renderWords();
    toast(list.length+(list.length===1?" word":" words")+" copied. Paste them anywhere you like.");
  } else toast("Your browser blocked copying. Select the words and copy them by hand.");
}
copyNewBtn.addEventListener("click",()=>doCopy(true));
document.getElementById("copyAll").addEventListener("click",()=>doCopy(false));


/* copy nudge */
function nudgeState(){
  return null; // copy-to-sheet reminder retired: words save to the Google account now
  const pending=showSamples()?SAMPLE:words.filter(isPending);
  if(!pending.length) return null;
  const oldest=Math.min(...pending.map(x=>x.t));
  const days=Math.floor((Date.now()-oldest)/86400000);
  if(pending.length>=10 || days>=7) return {n:pending.length,days};
  return null;
}
function renderNudge(){
  const st=nudgeState(), box=document.getElementById("nudge");
  const sz=LS.get("ncs-nudge-snooze",null);
  const snoozed= st && sz && st.n < sz.n+5 && (Date.now()-sz.t) < 3*86400000;
  box.hidden=!st || !!snoozed;
  if(st) document.getElementById("nudgeTxt").textContent="You have "+st.n+(st.n===1?" word that isn't":" words that aren't")+" in your sheet yet"+(st.days>=7?" (the oldest is from "+st.days+" days ago).":".");
  document.querySelectorAll(".notes-nav").forEach(b=>{
    let dot=b.querySelector(".nb-dot");
    if(st){ if(!dot){ dot=document.createElement("span"); dot.className="nb-dot"; b.appendChild(dot);} dot.textContent=st.n; dot.setAttribute("aria-label",st.n+" words to copy"); }
    else if(dot) dot.remove();
  });
}
document.getElementById("nudgeCopy").addEventListener("click",()=>doCopy(true));

/* quick add (floating + word) */
const fab=document.getElementById("fab"), qa=document.getElementById("qa"), qaBd=document.getElementById("qaBackdrop");
let qaReturn=null;
function openQA(w,m,e){
  qaReturn=document.activeElement;
  document.getElementById("qaWord").value=w||""; document.getElementById("qaMeaning").value=m||""; document.getElementById("qaExample").value=e||""; document.getElementById("qaNote").value="";
  qa.hidden=false; qaBd.hidden=false; fab.setAttribute("aria-expanded","true");
  const first=document.getElementById("qaWord").value?(document.getElementById("qaExample").value?document.getElementById("qaMeaning"):document.getElementById("qaMeaning")):document.getElementById("qaWord");
  setTimeout(()=>first.focus(),20);
}
function closeQA(){ qa.hidden=true; qaBd.hidden=true; fab.setAttribute("aria-expanded","false"); if(qaReturn&&qaReturn.focus) qaReturn.focus(); }
fab.addEventListener("click",()=>qa.hidden?openQA():closeQA());
document.getElementById("qaClose").addEventListener("click",closeQA);
qaBd.addEventListener("click",closeQA);
qa.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); closeQA(); } });
qa.addEventListener("submit",e=>{
  e.preventDefault();
  const w=document.getElementById("qaWord");
  if(!w.value.trim()){ w.focus(); return; }
  addWord(w.value,document.getElementById("qaMeaning").value,document.getElementById("qaExample").value,document.getElementById("qaNote").value);
  closeQA();
});

/* + save buttons in lists */
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-save]"); if(!b) return;
  if(addWord(b.dataset.w,b.dataset.m,b.dataset.e)){ b.textContent="✓ Saved"; b.classList.add("done"); }
});

/* save from translator */
document.getElementById("trSave").addEventListener("click",()=>{
  const inp=trIn.value.trim();
  const out=(trOut.classList.contains("placeholder")?"":(trOut.dataset.tr||trOut.textContent.split("\n")[0].replace(/^Also:\s*/i,""))).trim();
  const okOut = out && !/^(Translating…|Too many|That didn't work)/.test(out) ? out : "";
  if(dir==="es-en") openQA(okOut,inp,""); else openQA(inp,okOut,"");
});

⟦include:parts/daily.js⟧(function(){ const s=document.getElementById("wSort"); if(!s) return; s.value=wSortMode; s.addEventListener("change",()=>{ wSortMode=s.value; try{ localStorage.setItem("cs-wsort",wSortMode); }catch(e){} renderWords(); }); })();
document.getElementById("wSelBtn").addEventListener("click",()=>{ wSel=!wSel; renderWords(); });
document.getElementById("wSelDone").addEventListener("click",()=>{ wSel=false; renderWords(); });
document.getElementById("wSelNone").addEventListener("click",()=>{ fcPick=[]; savePick(); });
document.getElementById("wSelAll").addEventListener("click",()=>{ const q=norm(wSearch.value.trim()); const ids=allWords().filter(x=>x.w&&!x.sample&&(!q||[x.w,x.m,x.e].some(s=>norm(s||"").includes(q)))).map(x=>x.id); fcPick=Array.from(new Set(fcPick.concat(ids))); savePick(); });
document.getElementById("wSelGo").addEventListener("click",()=>{ wSel=false; renderWords(); fcSetMode("pick"); go("quiz"); setTimeout(()=>{ try{ window.__prOpenPath&&window.__prOpenPath(["my-words","flashcards"]); }catch(_){} },0); });
(function(){
  const b=document.getElementById("ttLove"); if(!b) return;
  const day=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const paint=()=>{ const on=LS.get("ncs-ttlove","")===day(); b.setAttribute("aria-pressed",String(on)); document.getElementById("ttLoveTxt").textContent=on?"Liked":"I like this"; };
  paint();
  b.addEventListener("click",()=>{
    const first=LS.get("ncs-ttlove","")!==day();
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
    for(let i=0;i<8;i++){ const s=document.createElement("span"); s.className="tt-spark"; s.textContent=i%2?"✦":"✨"; const a=i/8*Math.PI*2; s.style.setProperty("--dx",Math.round(Math.cos(a)*38)+"px"); s.style.setProperty("--dy",Math.round(Math.sin(a)*30)+"px"); b.appendChild(s); setTimeout(()=>s.remove(),1000); }
    if(first){ LS.set("ncs-ttlove",day()); const lg=(LS.get("ncs-ttlove-log",[])||[]).filter(x=>x&&x.t>Date.now()-60*864e5); lg.push({t:Date.now(),tt:(document.getElementById("ttText")||{}).textContent||""}); LS.set("ncs-ttlove-log",lg.slice(-40)); paint(); if(window.csBuddy&&window.csBuddy.love) window.csBuddy.love(); }
  });
})();
/* flashcards: practice my words (missed cards come back sooner) */
let fcOrder=[], fcIdx=0, fcFlipped=false, fcSpanishFirst=false;
let fcStats=LS.get("ncs-fc",{});
const fcBoxOf=id=>fcStats[id]||0;
const fcEmpty=document.getElementById("fcEmpty"), fcBox=document.getElementById("fcBox"), fcFront=document.getElementById("fcFront"), fcBack=document.getElementById("fcBack"), fcHint=document.getElementById("fcHint");
let fcSet="all"; try{ fcSet=localStorage.getItem("cs-fcset")||"all"; }catch(e){}
function fcList(){
  const l=allWords().filter(x=>x.w);
  if(fcSet==="today"){ const t=new Set(todays5()); return l.filter(x=>t.has(x.id)); }
  if(fcSet==="new20") return l.slice().sort((a,b)=>(b.t||0)-(a.t||0)).slice(0,20);
  if(fcSet==="week"){ const c=Date.now()-7*864e5; return l.filter(x=>(x.t||0)>=c); }
  if(fcSet==="hard") return l.filter(x=>x.id in fcStats && fcStats[x.id]<=1);
  if(fcSet==="pick"){ const p=new Set(fcPick); return l.filter(x=>p.has(x.id)); }
  return l;
}
function fcSetMode(m){ fcSet=m; try{ localStorage.setItem("cs-fcset",m); }catch(e){} fcOrder=[]; fcShuffle(); renderFlash(); }
const FC_EMPTY={new20:"",week:"You haven't saved any words in the last 7 days. Add a few on your <b>Home</b> page, or practice a different set.",
  hard:"No hard words yet. Words you mark <b>✗ Didn't know</b> show up here, so you can practice just those.",
  pick:"You haven't picked any words yet. Go to <b>My notebook</b>, tap <b>Choose words</b>, tick the ones you want and press <b>Practice these</b>."};
function fcShuffle(){ const l=fcList(); fcOrder=l.map(x=>x.id).sort(()=>Math.random()-.5).sort((a,b)=>fcBoxOf(a)-fcBoxOf(b)); fcIdx=0; fcFlipped=false; }
/* tap words on the back of a flashcard to save them (tap neighbours to make a phrase) */
let fcSel=[];
function fcToks(t){ return t.split(/(\s+)/).map(p=>/\S/.test(p)?'<span class="fc-tok" data-tok>'+p+'</span>':p).join(""); }
function fcClean(w){ return w.replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu,""); }
function fcPaintSel(){
  const toks=[...fcBack.querySelectorAll(".fc-tok")]; toks.forEach((t,i)=>t.classList.toggle("on",fcSel.includes(i)));
  const bar=document.getElementById("fcPickBar"); if(!bar) return;
  if(!fcSel.length){ bar.hidden=true; return; }
  const phrase=fcSel.slice().sort((a,b)=>a-b).map(i=>toks[i].textContent).join(" ");
  bar.hidden=false; bar.innerHTML='<span class="fc-pick-w">“'+esc(fcClean(phrase))+'”</span><span role="button" tabindex="0" class="fc-pick-add" data-fcadd>+ Save to My notebook</span><span role="button" tabindex="0" class="fc-pick-x" data-fcclear aria-label="Clear">×</span>';
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
function renderFlash(){
  const all=allWords().filter(x=>x.w), list=fcList();
  document.querySelectorAll("[data-fcset]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.fcset===fcSet)));
  const pn=new Set(all.map(x=>x.id)); document.getElementById("fcPickN").textContent=fcPick.filter(i=>pn.has(i)).length?"("+fcPick.filter(i=>pn.has(i)).length+")":"";
  document.querySelector(".fc-set").hidden=!all.length;
  fcEmpty.hidden=all.length>0;
  const se=document.getElementById("fcSetEmpty");
  se.hidden=!(all.length&&!list.length);
  if(all.length&&!list.length) se.innerHTML='<p style="margin:0 0 10px">'+(FC_EMPTY[fcSet]||"No words in this set.")+'</p><div class="note-actions">'+(fcSet==="pick"?'<button class="pill-btn pill-green" type="button" id="fcGoPick">Choose words</button>':'')+'<button class="swap" type="button" data-fcset="all">Practice all my words</button></div>';
  fcBox.hidden=!list.length;
  if(!list.length) return;
  const ids=new Set(list.map(x=>x.id));
  fcOrder=fcOrder.filter(i=>ids.has(i)); list.forEach(x=>{ if(!fcOrder.includes(x.id)) fcOrder.push(x.id); });
  if(fcIdx>=fcOrder.length) fcIdx=0;
  const x=list.find(y=>y.id===fcOrder[fcIdx]);
  const en='<b>'+esc(x.w)+'</b>', es='<b>'+esc(x.m||"(no translation yet)")+'</b>';
  const ex=(x.def?'<small class="fc-def">'+(x.pos?'<span class="pos">'+esc(x.pos)+'</span> ':'')+esc(x.def)+'</small>':'')+(x.e?'<i>'+esc(x.e)+'</i>':'')+(x.n?'<small class="fc-note">📝 '+esc(x.n)+'</small>':'');
  fcFront.innerHTML= fcSpanishFirst? es : en;
  fcBack.innerHTML= (fcSpanishFirst? en : es) + ex.replace(/(<small class="fc-def">(?:<span class="pos">[^<]*<\/span> )?)([^<]*)(<\/small>)/,(m,a,b,c)=>a+fcToks(b)+c).replace(/<i>([^<]*)<\/i>/,(m,b)=>'<i>'+fcToks(b)+'</i>') + '<span class="fc-pickbar" id="fcPickBar" hidden></span>';
  fcSel=[];
  fcBack.hidden=!fcFlipped; fcHint.textContent= fcFlipped? "Did you know it? · Tap any word to save it" : "Tap to flip";
  document.getElementById("fcAnswer").hidden=!fcFlipped;
  document.getElementById("fcCount").textContent=(fcIdx+1)+" of "+fcOrder.length;
  const learned=list.filter(y=>fcBoxOf(y.id)>=3).length, learning=list.filter(y=>fcBoxOf(y.id)>0&&fcBoxOf(y.id)<3).length;
  document.getElementById("fcStats").innerHTML='<span class="fs-l">'+learned+' learned</span> · <span class="fs-m">'+learning+' learning</span> · '+(list.length-learned-learning)+' new <button class="foot-link" type="button" id="fcReset">reset</button>';
  document.getElementById("fcDirTag").textContent= fcSpanishFirst? "Español → English" : "English → Español";
  document.getElementById("fcDir").textContent= fcSpanishFirst? "Start in English" : "Start in Spanish";
}
function fcAnswer(knew){
  const id=fcOrder[fcIdx]; if(!id) return;
  if(knew){ fcStats[id]=Math.min(5,fcBoxOf(id)+1); fcIdx++; }
  else { fcStats[id]=0; fcOrder.splice(fcIdx,1); fcOrder.splice(Math.min(fcIdx+3,fcOrder.length),0,id); }
  LS.set("ncs-fc",fcStats);
  if(fcIdx>=fcOrder.length){ const _n=fcOrder.length; fcShuffle(); toast("Round done! New round, hardest words first."); document.dispatchEvent(new CustomEvent("cs-fcround",{detail:{n:_n}})); }
  fcFlipped=false; renderFlash();
}
document.getElementById("fcCard").addEventListener("click",()=>{ fcFlipped=!fcFlipped; renderFlash(); });
document.getElementById("fcKnew").addEventListener("click",()=>fcAnswer(true));
document.getElementById("fcMiss").addEventListener("click",()=>fcAnswer(false));
document.getElementById("fcNext").addEventListener("click",()=>{ fcIdx=(fcIdx+1)%Math.max(fcOrder.length,1); fcFlipped=false; renderFlash(); });
document.getElementById("fcShuffle").addEventListener("click",()=>{ fcShuffle(); renderFlash(); toast("Shuffled, hardest words first"); });
document.getElementById("fcDir").addEventListener("click",()=>{ fcSpanishFirst=!fcSpanishFirst; fcFlipped=false; renderFlash(); });
document.getElementById("fcStats").addEventListener("click",e=>{
  const b=e.target.closest("#fcReset"); if(!b) return;
  if(b.dataset.sure!=="1"){ b.dataset.sure="1"; b.textContent="sure? tap again"; setTimeout(()=>{ if(b.isConnected){ b.dataset.sure=""; b.textContent="reset"; } },3000); return; }
  fcStats={}; LS.set("ncs-fc",fcStats); fcShuffle(); renderFlash(); toast("Progress reset");
});
document.querySelector("#v-quiz").addEventListener("click",e=>{
  const b=e.target.closest("[data-fcset]"); if(b){ fcSetMode(b.dataset.fcset); return; }
  if(e.target.closest("#fcGoPick")){ wSel=true; go("words"); renderWords(); setTimeout(()=>{ const t=document.getElementById("wSelBar"); if(t) t.scrollIntoView({block:"center"}); },80); }
});
fcShuffle();


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
    return "You are helping a Spanish-speaking student of English "+((window.csBeginnerOn&&window.csBeginnerOn())?"who is a beginner (level A1 to A2; write in very simple English and add the Spanish meaning in brackets after hard words)":"(level B1 to B2)")+" review their own class notes from their English coach, Noa. "+
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
        if(/words|expressions/i.test(sec)){ const m=t.split(/\s+[—–-]\s+/); if(m.length>=2&&m[0].length<60){ const w=m[0].replace(/\*\*/g,"").replace(/^["“]|["”]$/g,"").trim(), mean=m.slice(1).join(" - ").replace(/\*\*/g,"").trim(); extra=' <button class="nb-add" type="button" data-w="'+esc(w)+'" data-m="'+esc(mean)+'">+ Save</button>'; } }
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
    if(!G.length){ box.innerHTML='<div class="card empty-notes"><b>No class notes yet.</b><br>Write them at the top of this page (during class too), and they\'ll show up here, grouped by week with a summary.</div>'; monthBtn.hidden=true; monthBox.innerHTML=""; return; }
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
    const a=e.target.closest(".nb-add"); if(a){ if(addWord(a.dataset.w,a.dataset.m)){ a.textContent="✓ Saved"; a.disabled=true; } return; }
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
    const L=typeof window.csLevel==="function"?window.csLevel():{lv:""}, LB=/^A/.test(L.lv||"")||(window.csBeginnerOn&&window.csBeginnerOn());
    const p="You are a kind, encouraging English coach for a Spanish-speaking learner "+(L.lv?"whose English level is "+L.lv+" (CEFR)":"(level not known: assume about B1)")+(LB?": use very simple, short English, and end the feedback with one short sentence in Spanish that repeats the main point":"")+". The student is practicing the word or expression \""+cur.w+"\""+(cur.m?" (meaning: "+cur.m+")":"")+".\n"+
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

/* ---------- small dialog used by install + kudos ---------- */
function csDialog(html,opts){
  opts=opts||{};
  const bd=document.createElement("div"); bd.className="cs-dlg-bd";
  const d=document.createElement("div"); d.className="cs-dlg card"+(opts.cls?" "+opts.cls:""); d.setAttribute("role","dialog"); d.setAttribute("aria-modal","true");
  d.innerHTML='<button class="qa-x cs-dlg-x" type="button" aria-label="Close">×</button>'+html;
  const back=document.activeElement;
  const close=()=>{ bd.remove(); d.remove(); if(opts.onClose) opts.onClose(); if(back&&back.focus) try{ back.focus(); }catch(e){} };
  bd.addEventListener("click",close); d.querySelector(".cs-dlg-x").addEventListener("click",close);
  d.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); close(); } });
  document.body.append(bd,d);
  setTimeout(()=>{ const f=d.querySelector("[data-autofocus]")||d.querySelector("button:not(.cs-dlg-x)"); if(f) f.focus(); else { d.tabIndex=-1; d.focus({preventScroll:true}); } },30);
  return {el:d,close};
}
window.csDialog=csDialog; /* buddy.js (duels) uses it too */

/* ---------- install as an app ---------- */
(function(){
  let deferred=null;
  const standalone=()=>window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
  window.addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); deferred=e; });
  window.addEventListener("appinstalled",()=>{ deferred=null; toast("🎉 Installed! Find the Cheat Sheet on your home screen."); });
  function how(){
    const ua=navigator.userAgent||"", ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1), android=/Android/i.test(ua), safariMac=/Macintosh/.test(ua)&&/Safari/.test(ua)&&!/Chrome|Edg|Firefox/.test(ua);
    if(ios) return "<ol><li>Tap the <b>Share</b> button <span aria-hidden=\"true\">⬆︎</span> (at the bottom in Safari, or at the top in Chrome).</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. That's it!</li></ol>";
    if(android) return "<ol><li>Tap your browser's menu <b>⋮</b> (top right).</li><li>Tap <b>Install app</b> or <b>Add to Home screen</b>.</li><li>Tap <b>Install</b>.</li></ol>";
    if(safariMac) return "<ol><li>In the menu bar, click <b>File</b>.</li><li>Click <b>Add to Dock…</b></li></ol>";
    return "<ol><li>Look for the install icon <b>⊕</b> at the right end of the address bar and click it.</li><li>Or open the browser menu <b>⋮</b> and choose <b>Install Cheat Sheet</b> (in Edge: <b>Apps → Install this site as an app</b>).</li></ol>";
  }
  window.csInstall=async function(){
    if(standalone()){ csDialog('<h3 style="margin-top:0">📲 You\'re already in the app 🎉</h3><p>You opened the Cheat Sheet from your home screen. Nothing else to do!</p>'); return; }
    if(deferred){ try{ deferred.prompt(); const r=await deferred.userChoice; deferred=null; if(r&&r.outcome==="accepted") return; }catch(e){} }
    csDialog('<h3 style="margin-top:0">📲 Get the Cheat Sheet app</h3><p>Add the Cheat Sheet to your home screen. It opens like an app, full screen, with your words and notes right there.</p>'+how()+'<p class="muted" style="font-size:13.5px;margin-bottom:0">It\'s free and takes no space. Your words and notes stay synced with your account.</p>');
  };
  document.addEventListener("click",e=>{ if(e.target.closest("[data-install]")){ e.preventDefault(); window.csInstall(); } });
  // Settings panel: add an "Install the app" button
  function inject(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csInstallSec")) return;
    const secs=p.querySelectorAll(".cs-sec"), last=secs[secs.length-1]; if(!last) return;
    const sec=document.createElement("div"); sec.className="cs-sec"; sec.id="csInstallSec";
    sec.innerHTML='<h4>App</h4><button class="cs-reset" type="button" data-install style="text-align:left">📲 Install the Cheat Sheet as an app</button><small style="color:var(--muted);font-size:12.5px">Opens from your home screen like a normal app.</small>';
    p.insertBefore(sec,last);
  }
  new MutationObserver(inject).observe(document.body,{childList:true,subtree:true}); inject();
})();

/* ---------- words to review today ---------- */
function todays5(){
  const day=new Date().toDateString();
  const saved=LS.get("cs-today5",null), all=allWords().filter(x=>x&&x.w&&!x.sample), ids=new Set(all.map(x=>x.id));
  if(saved&&saved.day===day&&saved.ids.every(i=>ids.has(i))&&saved.ids.length===Math.min(5,all.length)) return saved.ids;
  const st=LS.get("ncs-fc",{})||{};
  let seed=0; for(const ch of day) seed=(seed*31+ch.charCodeAt(0))>>>0;
  const rnd=()=>{ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; };
  const score=x=>{ const b=st[x.id]; const base= b===0?0 : b===1?1 : b===2?2 : b==null?3 : b===3?4 : 5; return base+rnd()*0.9; };
  const pick=all.slice().sort((a,b)=>score(a)-score(b)).slice(0,5).map(x=>x.id);
  LS.set("cs-today5",{day,ids:pick});
  return pick;
}
(function(){
  const box=document.getElementById("rvBox"); if(!box) return;
  function paint(){
    const all=allWords().filter(x=>x&&x.w&&!x.sample);
    if(all.length<3){ box.hidden=true; return; }
    box.hidden=false;
    const ids=todays5(), st=LS.get("ncs-fc",{})||{}, list=ids.map(i=>all.find(x=>x.id===i)).filter(Boolean);
    document.getElementById("rvList").innerHTML=list.map(x=>'<button class="rv-chip" type="button" aria-expanded="false" data-rv="'+esc(x.id)+'"><span class="rv-w">'+esc(x.w)+'</span><span class="rv-m">'+esc(x.m||"(no translation yet)")+'</span>'+(st[x.id]===0?'<span class="rv-tag">missed</span>':'')+'</button>').join("");
  }
  box.addEventListener("click",e=>{
    const c=e.target.closest("[data-rv]"); if(c){ c.setAttribute("aria-expanded",c.getAttribute("aria-expanded")==="true"?"false":"true"); return; }
    if(e.target.closest("#rvGo")){ if(typeof fcSetMode==="function") fcSetMode("today"); go("quiz"); setTimeout(()=>{ try{ window.__prOpenPath&&window.__prOpenPath(["my-words","flashcards"]); }catch(_){} },0); }
  });
  paint();
  window.addEventListener("storage",paint);
  const v=document.getElementById("v-notes"); if(v) new MutationObserver(()=>{ if(!v.hidden) paint(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
})();

/* ---------- say it out loud (speech recognition) ---------- */
(function(){
  const card=document.getElementById("spCard"); if(!card) return;
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const tgt=document.getElementById("spTarget"), mean=document.getElementById("spMean"), mic=document.getElementById("spMic"), out=document.getElementById("spOut"), modeB=document.getElementById("spMode"), nextB=document.getElementById("spNext"), hear=document.getElementById("spHear");
  if(!SR){ document.getElementById("spNo").hidden=false; mic.disabled=true; }
  let cur=null, lastId=null, useEx=false, rec=null, listening=false;
  const norm2=s=>String(s||"").toLowerCase().replace(/\(.*?\)/g," ").replace(/[’']/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim();
  function pool(){ let l=[]; try{ l=typeof fcList==="function"?fcList():allWords(); }catch(e){ l=allWords(); } l=l.filter(x=>x&&x.w); return l.length?l:allWords().filter(x=>x&&x.w); }
  function text(){ return useEx&&cur&&cur.e? cur.e : (cur? cur.w.replace(/\(.*?\)/g,"").trim() : ""); }
  function pick(){
    const l=pool(); if(!l.length){ cur=null; tgt.textContent="Save a few words first"; mean.textContent=""; mic.disabled=true; return; }
    let x=l[Math.floor(Math.random()*l.length)]; if(l.length>1&&x.id===lastId) x=l.find(y=>y.id!==lastId);
    cur=x; lastId=x.id; paint(); out.hidden=true; out.innerHTML="";
  }
  function paint(){
    if(!cur) return;
    tgt.textContent=text(); mean.textContent=useEx&&cur.e? "" : (cur.m||"");
    modeB.hidden=!cur.e; modeB.textContent=useEx?"Say the word instead":"Say the example sentence";
    mic.disabled=!SR;
  }
  function judge(alts){
    const t=norm2(text()), tw=t.split(" ").filter(Boolean);
    let best="", bestScore=0;
    alts.forEach(a=>{ const n=norm2(a); if(!n) return; let sc;
      if(n===t||(" "+n+" ").includes(" "+t+" ")) sc=1;
      else { const nw=n.split(" "); const hit=tw.filter(w=>nw.includes(w)).length; sc=hit/Math.max(tw.length,1); }
      if(sc>bestScore||!best){ bestScore=sc; best=a; } });
    return {heard:best,score:bestScore};
  }
  function show(r){
    out.hidden=false;
    const ok=r.score>=(useEx?0.8:1), close=!ok&&r.score>=0.5;
    out.innerHTML='<div class="sn-res '+(ok?"sn-great":close?"sn-almost":"sn-try")+'"><b>'+(ok?"🎉 Great, I understood you!":close?"👍 Almost!":"🤔 Not quite")+'</b></div>'+
      '<p style="margin:6px 0 0">I heard: <i>“'+esc(r.heard||"…")+'”</i></p>'+
      (ok?"":'<p class="muted" style="margin:4px 0 0;font-size:14px">Tap <b>🔊 Listen</b> to hear it, then try again. Speak a little slower and clearer than normal.</p>');
    if(ok) document.dispatchEvent(new CustomEvent("cs-said"));
  }
  function stop(){ listening=false; mic.classList.remove("on"); mic.innerHTML='🎤 <span>Tap and say it</span>'; }
  mic.addEventListener("click",()=>{
    if(!SR||!cur) return;
    if(listening){ try{ rec.stop(); }catch(e){} return; }
    rec=new SR(); rec.lang="en-US"; rec.interimResults=false; rec.maxAlternatives=5; rec.continuous=false;
    let got=false;
    rec.onresult=e=>{ got=true; const res=e.results[0]; const alts=[]; for(let i=0;i<res.length;i++) alts.push(res[i].transcript); show(judge(alts)); };
    rec.onerror=e=>{ stop(); out.hidden=false;
      out.innerHTML='<p style="margin:0">'+(e.error==="not-allowed"||e.error==="service-not-allowed"?"🎤 Your browser blocked the microphone. Allow it (the 🔒 or 🎤 icon in the address bar) and try again.":e.error==="no-speech"?"I didn't hear anything. Tap the mic and speak a bit louder.":e.error==="network"?"Speech recognition needs an internet connection. Try again in a moment.":"Something went wrong with the microphone. Try again.")+'</p>'; };
    rec.onend=()=>{ stop(); if(!got&&out.hidden){ out.hidden=false; out.innerHTML='<p style="margin:0">I didn\'t hear anything. Tap the mic and try again.</p>'; } };
    try{ rec.start(); listening=true; mic.classList.add("on"); mic.innerHTML='⏺ <span>Listening… tap to stop</span>'; out.hidden=true; }catch(e){ stop(); }
  });
  hear.addEventListener("click",()=>{ if(cur) say(text(),hear); });
  modeB.addEventListener("click",()=>{ useEx=!useEx; paint(); out.hidden=true; });
  nextB.addEventListener("click",()=>{ useEx=false; pick(); });
  if(!canSpeak) hear.hidden=true;
  const v=document.getElementById("v-quiz");
  new MutationObserver(()=>{ if(!v.hidden&&!cur) pick(); }).observe(v,{attributes:true,attributeFilter:["hidden"]});
  document.addEventListener("click",e=>{ if(e.target.closest("[data-fcset]")) setTimeout(()=>{ useEx=false; pick(); },60); });
  pick();
})();

/* ---------- kudos: messages from Noa ---------- */
(function(){
  const fmt=t=>{ try{ return new Date(t).toLocaleDateString("en-US",{month:"long",day:"numeric"}); }catch(e){ return ""; } };
  function confetti(el){
    if(document.documentElement.classList.contains("cs-calm")) return;
    const em=["🎉","✨","💛","🎊","⭐"];
    for(let i=0;i<14;i++){ const s=document.createElement("span"); s.className="kd-conf"; s.textContent=em[i%em.length]; s.style.left=(6+Math.random()*88)+"%"; s.style.animationDelay=(Math.random()*.5)+"s"; s.style.setProperty("--r",(Math.random()*80-40)+"deg"); el.appendChild(s); setTimeout(()=>s.remove(),2600); }
  }
  /* Nov 24 2026: messages lead somewhere. A message's own link (m.go), or the module it recommends ("Try the “Past simple” module") */
  function kdGoOf(m){ if(!m) return ""; if(m.go) return String(m.go); const q=String(m.text||"").match(/[“"]([^”"]+)[”"]/); if(q&&window.__modPathByName) return window.__modPathByName(q[1]); return ""; }
  function kdGoTo(g){ if(!g) return; if(String(g).includes("/")) location.hash="#"+g; else if(window.csGo) window.csGo(g); }
  window.__kdGoOf=kdGoOf; window.__kdGoTo=kdGoTo;
  function paintLink(){ const n=(LS.get("ncs-kudos",[])||[]).length, a=document.getElementById("kdLink"); if(a){ a.hidden=!n; a.textContent="💌 Messages from Noa ("+n+")"; } }
  window.csShowKudos=function(list,done){
    list=(list||[]).filter(m=>m&&m.text);
    if(!list.length) return;
    const hist=LS.get("ncs-kudos",[])||[];
    list.forEach(m=>{ if(!hist.some(h=>h.id===m.id)) hist.unshift({id:m.id,text:m.text,kind:m.kind||"",go:m.go||"",at:m.at||Date.now()}); });
    LS.set("ncs-kudos",hist.slice(0,60)); paintLink();
    let i=0;
    const next=()=>{
      if(i>=list.length) return;
      const m=list[i++];
      const title=m.kind==="welcome"?"👋 Welcome from Noa":m.kind==="kudos"?"🎉 Kudos from Noa":m.kind==="rec"?"⭐ Noa recommends":"💌 A message from Noa";
      const dl=csDialog('<div class="kd-top">'+title+'</div><p class="kd-text">'+esc(m.text).replace(/\n/g,"<br>")+'</p><div class="kd-date">'+fmt(m.at)+'</div><div class="note-actions" style="justify-content:flex-end;margin-top:14px">'+(m.go?'<button class="pill-btn pill-green" type="button" data-autofocus id="kdGo">Open it →</button><button class="swap" type="button" id="kdOk">Later</button>':'<button class="pill-btn pill-green" type="button" data-autofocus id="kdOk">Thanks, Noa! 💛</button>')+'</div>',{cls:"kd",onClose:()=>{ if(done) done(m.id); document.dispatchEvent(new CustomEvent("cs-kudos",{detail:{kind:m.kind}})); setTimeout(next,400); }});
      confetti(dl.el);
      dl.el.querySelector("#kdOk").addEventListener("click",dl.close);
      const g=dl.el.querySelector("#kdGo"); if(g) g.addEventListener("click",()=>{ dl.close(); if(String(m.go).includes("/")) location.hash="#"+m.go; else if(window.csGo) window.csGo(m.go); });
    };
    setTimeout(next,1200);
  };
  document.addEventListener("click",e=>{
    if(!e.target.closest("#kdLink")) return;
    const hist=LS.get("ncs-kudos",[])||[];
    const dl=csDialog('<h3 style="margin-top:0">💌 Messages from Noa</h3>'+(hist.length?hist.map((m,i)=>'<div class="kd-item"><div class="kd-date">'+fmt(m.at)+'</div><div>'+esc(m.text).replace(/\n/g,"<br>")+'</div>'+(kdGoOf(m)?'<button type="button" class="pill-btn pill-green kd-open" data-kdgi="'+i+'">Open it →</button>':"")+'</div>').join(""):'<p>No messages yet.</p>'));
    dl.el.addEventListener("click",ev=>{ const b=ev.target.closest("[data-kdgi]"); if(!b) return; const m=hist[+b.dataset.kdgi]; dl.close(); kdGoTo(kdGoOf(m)); });
  });
  paintLink();
})();

⟦include:parts/psbank.js⟧
⟦include:parts/vocbank.js⟧
⟦include:parts/ppbank.js⟧
⟦include:parts/edbank.js⟧
⟦include:parts/presbank.js⟧
⟦include:parts/ingbank.js⟧
⟦include:parts/coubank.js⟧
⟦include:parts/iqbank.js⟧
⟦include:parts/futbank.js⟧
⟦include:parts/wobank.js⟧
⟦include:parts/thbank.js⟧
⟦include:parts/intbank.js⟧
/* ---------- Practice home page, grammar modules, My mistakes, weekly goal ---------- */
(function(){
  const view=document.getElementById("v-quiz"), hub=document.getElementById("prHub"); if(!view||!hub) return;
  const panels=[...view.querySelectorAll(".pr-panel")];
  const $=id=>document.getElementById(id);
  const beg=()=>typeof csBeginner==="function"&&csBeginner();
  const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const MODS={
    ps:{id:"ps",name:"Past simple",lname:"past simple",stages:PS_STAGES,test:PS_TEST,toy:"⏳ Magic hourglass",toyName:"Magic hourglass",ico:"⏪"},
    pp:{id:"pp",name:"Present perfect",lname:"present perfect",stages:PP_STAGES,test:PP_TEST,toy:"🌍 Little globe",toyName:"Little globe",ico:"🌍"},
    prs:{id:"prs",name:"Present simple",lname:"present simple",stages:PRS_STAGES,test:PRS_TEST,toy:"☕ Coffee mug",toyName:"Coffee mug",ico:"☀️"},
    ing:{id:"ing",name:"Verb + -ing",lname:"verb + -ing",stages:ING_STAGES,test:ING_TEST,toy:"🛹 Skateboard",toyName:"Skateboard",ico:"🏃"},
    th:{id:"th",name:"There is / there are",lname:"“there is / there are”",the:"",stages:TH_STAGES,test:TH_TEST,toy:"🏠 Little house",toyName:"Little house",ico:"🏠"},
    cou:{id:"cou",name:"Could vs was able to",lname:"“could vs was able to”",the:"",stages:COU_STAGES,test:COU_TEST,toy:"🔑 Golden key",toyName:"Golden key",ico:"💪"},
    iq:{id:"iq",name:"Indirect questions",lname:"indirect questions",the:"",stages:IQ_STAGES,test:IQ_TEST,toy:"🧭 Compass",toyName:"Compass",ico:"❓"},
    fut:{id:"fut",name:"Talking about the future",lname:"future",the:"the ",stages:FUT_STAGES,test:FUT_TEST,toy:"🔮 Crystal ball",toyName:"Crystal ball",ico:"🔮"},
    wo:{id:"wo",name:"Word order and object pronouns",lname:"word order and object pronouns",the:"",stages:WO_STAGES,test:WO_TEST,toy:"🧱 Building blocks",toyName:"Building blocks",ico:"🧱"},
    ed:{id:"ed",name:"-ed endings",lname:"-ed endings",stages:ED_STAGES,test:ED_TEST,toy:"🔔 Little bell",toyName:"Little bell",ico:"🔊"},
    /* English for Specific Purposes (Nov 21 2026): same stages engine, no buddy toy, lives in its own Practice section */
    int:{id:"int",name:"Job interviews",lname:"job interview English",the:"",stages:INT_STAGES,test:INT_TEST,esp:true,noToy:true,ico:"👔"}
  };
  let M="ps"; const MD=()=>MODS[M];
  /* grammar totals and buddy toys only count the grammar / pronunciation modules */
  window.__csModInfo=()=>Object.values(MODS).filter(md=>!md.noToy).map(md=>[md.id,md.stages.filter(st=>!st.adv).length]);
  window.__csModAdv=()=>{ const o={}; Object.values(MODS).filter(md=>!md.noToy).forEach(md=>{ const a=md.stages.find(st=>st.adv); if(a) o[md.id]=a.n; }); return o; };
  const ITEM={}; Object.values(MODS).forEach(md=>md.stages.forEach(st=>st.items.forEach(q=>{ q.mod=md.id; ITEM[q.id]=q; }))); VOC_SETS.forEach(v=>v.qs.forEach(q=>ITEM[q.id]=q));
  const VSET={}; VOC_SETS.forEach(v=>VSET[v.id]=v);
  const vprog=()=>{ const v=LS.get("ncs-vocab",{}); return v&&typeof v==="object"?v:{}; };
  let GOAL=(()=>{ const g=+LS.get("ncs-wkgoal",3); return [3,5,8].includes(g)?g:3; })(); const PASS=7, TOPASS=15;
  const GOALS={3:{k:"Easy",r:5},5:{k:"Steady",r:8},8:{k:"Strong",r:12}};

  /* ---- saved progress ---- */
  const mods=()=>{ const m=LS.get("ncs-mods",{}); return m&&typeof m==="object"?m:{}; };
  const ps=(id)=>{ const m=mods(); const p=m[id||M]||{}; p.b=p.b||{}; p.s=p.s||{}; p.r=p.r|0; return p; };
  const rec=()=>{ const r=LS.get("ncs-modrec",{}); return r&&typeof r==="object"?r:{}; };
  const hist=(p,e)=>{ e.t=Date.now(); p.h=Array.isArray(p.h)?p.h:[]; p.h.unshift(e); p.h=p.h.slice(0,20); };
  const relD=t=>{ const d=new Date(t); if(isNaN(d)) return ""; const a=new Date(); a.setHours(0,0,0,0); const b=new Date(d); b.setHours(0,0,0,0); const n=Math.round((a-b)/864e5); return n<=0?"today":n===1?"yesterday":n<7?n+" days ago":"on "+d.toLocaleDateString("en-US",{month:"short",day:"numeric"}); };
  const todT=s=>{ const m=String(s||"").match(/^(\d+)-(\d+)-(\d+)$/); return m?new Date(+m[1],+m[2]-1,+m[3],12).getTime():0; };
  const triedTxt=(p,n,best)=>{ const tr=(p.tr||{})[n]|0, ls=(p.ls||{})[n]; return "best "+best+"/10"+(tr>1?" · "+tr+" tries":"")+(ls&&ls.t?" · last "+relD(ls.t)+(ls.sc!==best?" ("+ls.sc+"/10)":""):""); };
  const stBtn=(p,n,best,open)=>{ if(!open) return ""; const pz=p.pause&&p.pause.n===n?p.pause:null;
    if(pz) return '<small class="ps-pz">⏸ '+pz.i+'/'+pz.ids.length+' done</small><button class="pill-btn pill-green" type="button" data-pscont="'+n+'">Continue</button><button class="ps-over" type="button" data-psstart="'+n+'">Start over</button>';
    return '<button class="pill-btn'+(best==null||best<PASS?" pill-green":"")+'" type="button" data-psstart="'+n+'">'+(best==null?"Start":best<PASS?"Try again":"Practice")+'</button>'; };
  const lastTest=p=>{ if(p.lt&&p.lt.t) return "Last try: <b>"+p.lt.sc+"/15</b> "+relD(p.lt.t)+(p.lt.at?" (stopped after "+p.lt.at+" questions)":p.lt.sc<TOPASS?" · "+(TOPASS-p.lt.sc)+" more to pass":""); const t=todT(p.tod); return t?"Last try: "+relD(t)+" (no score saved for that one)":""; };
  const histHTML=(p,md)=>{ const h=Array.isArray(p.h)?p.h:[]; if(!h.length) return "";
    const nm=n=>{ const st=md.stages.find(x=>x.n===n); return st?(st.adv?"⭐ Advanced":"Stage "+n):"Stage "+n; };
    return '<details class="ps-hist"><summary>📜 Your tries ('+h.length+')</summary><ul>'+h.map(e=>'<li><span class="ps-hd">'+new Date(e.t).toLocaleDateString("en-US",{month:"short",day:"numeric"})+' · '+new Date(e.t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})+'</span><span>'+
      (e.k==="to"?"🎓 Test out: <b>"+e.sc+"/15</b>"+(e.at?" (stopped after "+e.at+" questions)":e.sc>=TOPASS?" · passed 🎉":""):e.k==="stop"?"⏸ "+nm(e.n)+": stopped after "+e.at+" questions ("+e.sc+" right)":nm(e.n)+": <b>"+e.sc+"/10</b> "+stars(starsFor(e.sc)))+'</span></li>').join("")+'</ul></details>'; };
  const starsFor=sc=>sc>=10?3:sc>=9?2:sc>=PASS?1:0;
  const testedOut=(id)=>{ const p=ps(id); return !!(p.to&&p.to.sc>=TOPASS); };
  const today=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const unlocked=n=>{ const p=ps(); return n===1||testedOut()||(p.b[n-1]|0)>=PASS||rec()[M]===n; };
  const core=(id)=>MODS[id||M].stages.filter(st=>!st.adv);
  const totalStars=(id)=>{ const p=ps(id); return core(id).reduce((t,st)=>t+(p.s[st.n]|0),0); };
  const allDone=(id)=>{ const p=ps(id); return testedOut(id)||core(id).every(st=>(p.b[st.n]|0)>=PASS); };
  const mis=()=>{ const m=LS.get("ncs-mymis",{}); return m&&typeof m==="object"?m:{}; };
  const misList=()=>{ const m=mis(); return Object.keys(m).filter(id=>ITEM[id]).sort((a,b)=>(m[b].n-m[a].n)||(m[b].t-m[a].t)); };
  function noteAnswer(id,ok){
    const m=mis();
    if(ok){ if(m[id]){ m[id].ok=(m[id].ok|0)+1; if(m[id].ok>=2) delete m[id]; } else return; }
    else { m[id]=m[id]||{n:0,ok:0,t:0}; m[id].n++; m[id].ok=0; m[id].t=Date.now(); }
    LS.set("ncs-mymis",m);
  }
  const weekKey=()=>{ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const week=()=>{ const w=LS.get("ncs-wk",null); return w&&w.w===weekKey()?w:{w:weekKey(),n:0,got:false}; };
  const prevWeekKey=()=>{ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)-7); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  const streak=()=>{ const s=LS.get("ncs-wkstreak",null)||{last:"",n:0,best:0}; if(s.last!==weekKey()&&s.last!==prevWeekKey()) s.n=0; return s; };
  function award(w){
    w.got=true; LS.set("ncs-wk",w);
    const s=LS.get("ncs-wkstreak",null)||{last:"",n:0,best:0}; if(s.last!==weekKey()){ s.n=s.last===prevWeekKey()?(s.n|0)+1:1; s.last=weekKey(); } const was=s.best|0; s.best=Math.max(was,s.n); LS.set("ncs-wkstreak",s);
    const r=(GOALS[GOAL]||GOALS[3]).r;
    document.dispatchEvent(new CustomEvent("cs-weekgoal",{detail:{t:r,f:r,streak:s.n,campfire:was<4&&s.best>=4}}));
    setTimeout(()=>toast(was<4&&s.best>=4?"🔥 4 weeks in a row! Your buddy got a campfire.":"🎯 Weekly goal done! Your buddy got +"+r+" 🍪 and +"+r+" friendship."+(s.n>1?" 🔥 "+s.n+" weeks in a row.":"")),1200);
  }
  function bumpWeek(){
    const w=week(); w.n++; LS.set("ncs-wk",w);
    if(w.n>=GOAL&&!w.got) award(w);
    renderHub();
  }
  window.__prBumpWeek=bumpWeek;
  window.__prGoalSet=n=>{ if(![3,5,8].includes(n)) return; GOAL=n; LS.set("ncs-wkgoal",n); const w=week(); if(w.n>=GOAL&&!w.got) award(w); renderHub(); };
  /* more things count: practising out loud (every 5 phrases you say right) and reading a "Learn it first" lesson (once per module a week) */
  document.addEventListener("cs-said",()=>{ const w=week(); w.say=(w.say|0)+1; LS.set("ncs-wk",w); if(w.say%5===0) bumpWeek(); });
  let lesT=null;
  document.addEventListener("toggle",e=>{ const d=e.target; if(!d||!d.matches||!d.matches(".ps-lesson")) return; clearTimeout(lesT); if(!d.open) return;
    lesT=setTimeout(()=>{ if(!d.open||!d.isConnected||document.hidden) return; const w=week(), id=d.dataset.plid; w.les=w.les||[]; if(w.les.includes(id)) return; w.les.push(id); LS.set("ncs-wk",w); bumpWeek(); toast("📖 Lesson read: it counts for your weekly goal"); },40000); },true);
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bumpWeek(); }); document.addEventListener("cs-irrround",bumpWeek);

  /* ---- home page ---- */
  function renderHub(){
    const w=week(), g=$("prGoal");
    const sk=streak(), rw=(GOALS[GOAL]||GOALS[3]).r;
    if(g) g.innerHTML='<div class="pr-goal-top"><b>🎯 This week\'s goal</b><span>'+Math.min(w.n,GOAL)+' / '+GOAL+' rounds</span></div>'+
      '<div class="pr-dots" aria-hidden="true">'+Array.from({length:GOAL},(_,i)=>'<i class="'+(i<w.n?"on":"")+'"></i>').join("")+'</div>'+
      '<p>'+(w.got?"Done for this week! 🎉 Your buddy got its reward. Keep going if you want, a new goal starts on Monday.":"Finish "+GOAL+" rounds this week: grammar, flashcards, word packs, pronunciation, job interview practice, reading a lesson or saying phrases out loud. Your buddy gets <b>+"+rw+" 🍪</b> and <b>+"+rw+" friendship</b>.")+'</p>'+
      '<div class="pr-gsize" role="group" aria-label="Goal size"><span class="muted">Goal:</span>'+[3,5,8].map(n=>'<button type="button" class="pr-gs" data-wkgoal="'+n+'" aria-pressed="'+(GOAL===n)+'">'+GOALS[n].k+' · '+n+'</button>').join("")+'</div>'+
      '<p class="pr-streak">'+(sk.n>=1?"🔥 <b>"+sk.n+(sk.n===1?" week":" weeks")+"</b> in a row. ":"")+((sk.best|0)>=4?"Your buddy has the 🔥 campfire.":"Do your goal 4 weeks in a row to unlock a 🔥 <b>campfire</b> for your buddy.")+'</p>'+
      '<p class="esb">Meta semanal: termina '+GOAL+' rondas esta semana. Elige el tamaño de tu meta: más rondas, más premio.</p>';
    view.querySelectorAll("[data-modtile]").forEach(ts=>{ const id=ts.dataset.modtile, md=MODS[id], t=totalStars(id), r=rec()[id], tot=md.stages.filter(st=>!st.adv).length*3; const pp=ps(id); ts.querySelector(".pr-sub").innerHTML=(testedOut(id)?"🎓 ":"")+t+" / "+tot+" ★"+(!t&&(pp.r||pp.tod||pp.pause)?" · started":"")+((pp.last||todT(pp.tod))?' · <span class="pr-when">practiced '+relD(pp.last||todT(pp.tod))+'</span>':"")+(r?'<span class="pr-rec pr-recl">⭐ Noa recommends '+(r==="all"?"this module":"stage "+r)+'</span>':""); ts.querySelector(".pr-bar i").style.width=Math.round(t/tot*100)+"%"; });
    /* Nov 24 2026: everything Noa recommended, in one place at the top of Practice (Belén couldn't find hers inside the Verb tenses folder) */
    const rb=$("prRecs"); if(rb){ const R=rec(), ids=Object.keys(R).filter(id=>MODS[id]);
      rb.hidden=!ids.length;
      if(ids.length) rb.innerHTML='<div class="pr-recs-top"><b>⭐ Noa recommends for you</b><span class="muted">'+ids.length+(ids.length===1?" module":" modules")+'</span></div><ul class="pr-recs-l">'+ids.map(id=>{ const md=MODS[id], r=R[id], t=totalStars(id), tot=md.stages.filter(st=>!st.adv).length*3, st=r!=="all"?md.stages.find(x=>String(x.n)===String(r)):null, sg=st?(ps(id).s||{})[st.n]|0:0;
        return '<li><a class="pr-recs-a" href="'+esc(hashFor(id))+'"><span class="pr-recs-n"><b>'+esc(md.name)+'</b><small>'+(st?"Stage "+st.n+" · "+esc(st.t)+" · "+(sg?"★".repeat(sg)+" done":"not started"):t+" / "+tot+" ★ · whole module")+'</small></span><span class="pr-recs-go">Open →</span></a></li>'; }).join("")+'</ul>'; }
    const sc=$("prShortCount"); if(sc){ sc.textContent=Math.min(w.n,GOAL)+"/"+GOAL; sc.parentElement.classList.toggle("done",!!w.got); }
    const tm=$("prMisTile"); if(tm){ const n=misList().length; tm.querySelector(".pr-sub").textContent=n?n+(n===1?" question to review":" questions to review"):"Nothing to review yet"; }
  }
  let cur=null;
  function setMod(id){ if(!MODS[id]) return; M=id; const h=$("psTitle"); if(h) h.innerHTML="<em>"+esc(MODS[id].name)+"</em>"; try{ sessionStorage.setItem("cs-mod",id); }catch(e){} }
  try{ const sm=sessionStorage.getItem("cs-mod"); if(MODS[sm]) M=sm; }catch(e){}
  const PARENT={ps:"gram",mis:"gram",irr:"gram",flash:"words",sent:"words",say:"words",vset:"vocab",intv:"esp"};
  const par=c=>c==="ps"&&M==="ed"?"pron":c==="ps"&&MODS[M]&&MODS[M].esp?"esp":PARENT[c];
  const PNAME={gram:"Grammar",words:"Your words",vocab:"Word packs",pron:"Pronunciation",esp:"Specific purposes"};
  const PSLUG={gram:"grammar",words:"my-words",vocab:"word-packs",pron:"pronunciation",mis:"my-mistakes",irr:"irregular-verbs",flash:"flashcards",sent:"sentences",say:"say-it",level:"level-check",esp:"specific-purposes",intv:"practice-interview"};
  const mslug=id=>String(MODS[id].name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  function hashFor(c){ if(!c) return "#quiz"; if(c==="vset") c="vocab"; const p=par(c), me=c==="ps"?mslug(M):PSLUG[c]; return "#quiz/"+(p&&PSLUG[p]?PSLUG[p]+"/":"")+(me||""); }
  window.__prHash=()=>hashFor(cur);
  window.__prModFull=()=>MODS[M];   /* 🖨️ print (062-print-module.js) reads the current module's stages and test */
  /* Nov 24 2026: where a module lives, by its name (messages from Noa that recommend a module open it) */
  window.__modPathByName=nm=>{ const id=Object.keys(MODS).find(k=>MODS[k].name.toLowerCase()===String(nm||"").trim().toLowerCase()); return id?hashFor(id).slice(1):""; };
  window.__prMod=()=>({id:M,name:MODS[M].name,stages:MODS[M].stages.map(st=>({n:st.n,t:st.t,adv:!!st.adv})),path:hashFor("ps").slice(1)});
  window.__csDeep=window.__csDeep||{}; window.__csDeep.quiz={hash:()=>hashFor(cur),open:p=>window.__prOpenPath(p)};
  function syncUrl(){ try{ if(view.hidden) return; const h=hashFor(cur); if(location.hash!==h) history.replaceState(Object.assign({},history.state||{cs:1,v:"quiz"},{pp:cur,m:M}),"",h); }catch(e){} }
  window.__prOpenPath=parts=>{ parts=(parts||[]).filter(Boolean); if(!parts.length){ round=null; show(null,true); syncUrl(); return; }
    const inv={}; Object.keys(PSLUG).forEach(k=>inv[PSLUG[k]]=k);
    const last=parts[parts.length-1], mod=Object.keys(MODS).find(id=>mslug(id)===last);
    round=null; if(mod){ setMod(mod); show("ps",true); } else if(inv[last]) show(inv[last],true); else if(inv[parts[0]]) show(inv[parts[0]],true); else show(null,true);
    syncUrl(); };
  function show(p,fromPop){
    cur=p||null;
    if(!fromPop&&!view.hidden){ try{ const st=history.state||{}; if(st.cs&&st.v==="quiz"&&(st.pp||null)!==cur) history.pushState({cs:1,v:"quiz",pp:cur,m:M,n:(st.n|0)+1},"",hashFor(cur)); }catch(e){} }
    view.querySelectorAll(".pr-back-t").forEach(t=>t.textContent=PNAME[par(cur)]||"All practice");
    hub.hidden=!!cur; panels.forEach(x=>x.hidden=x.dataset.pp!==cur);
    if(cur==="ps"&&!round) renderStages();
    if(cur==="mis"&&!round) renderMis();
    if(cur==="vocab") renderVocab();
    if(cur==="vset"&&!round) renderSet();
    if(cur==="intv"&&window.__intvRender) window.__intvRender();
    if(cur==="esp") renderHub();
    if(!cur) renderHub();
    window.scrollTo({top:0});
    syncUrl();
  }
  view.addEventListener("click",e=>{
    const t=e.target.closest("[data-pr]"); if(t){ round=null; if(t.dataset.modtile) setMod(t.dataset.modtile); show(t.dataset.pr); return; }
    if(e.target.closest("[data-prback]")){ round=null; show(par(cur)||null); }
  });
  document.addEventListener("click",e=>{ const b=e.target.closest('[data-go="quiz"]'); if(b&&!b.closest("#v-quiz")){ round=null; setTimeout(()=>show(null),0); } });

  /* ---- past simple: stage list ---- */
  const stars=n=>'<span class="ps-stars" aria-label="'+n+' of 3 stars">'+"★★★".slice(0,n)+'<s>'+"★★★".slice(0,3-n)+'</s></span>';
  let LEDE0=null;
  function psLede(test){ const l=document.querySelector('#v-quiz [data-pp="ps"] .lede'); if(!l) return; if(LEDE0===null) LEDE0=l.innerHTML;
    l.innerHTML=test?'🎓 <b>Test out:</b> 15 questions, no multiple choice, and you see your results at the end. Get <b>all 15 right</b> and you pass the whole module, with all the rewards. One try a day.<span class="esb">Examen: 15 preguntas sin alternativas. Si aciertas las 15, pasas todo el módulo. Un intento al día.</span>':LEDE0; }
  function renderStages(){ psLede(false);
    const box=$("psArea"); if(!box) return; const p=ps(), r=rec()[M], md=MD(); setMod(M);
    const to=p.to, triedToday=p.tod===today();
    const toCard=testedOut()?'<div class="card ps-to done"><b>🎓 You tested out of '+(md.the!=null?md.the:"the ")+esc(md.lname)+'</b><span>'+to.sc+'/15 on '+new Date(to.t).toLocaleDateString("en-US",{month:"long",day:"numeric"})+'. You can still practice any stage.</span></div>'
      :allDone()?"":'<div class="card ps-to"><div><b>🎓 Already good at '+(md.the!=null?md.the:"the ")+esc(md.lname)+'?</b><span>Take the <b>test out</b> exam: 15 tricky questions, no multiple choice. Get <b>all 15 right</b> and you pass the whole module, with all the rewards. One try a day.</span><span class="esb">Examen para eximirte: 15 preguntas difíciles. Con las 15 correctas apruebas todo el módulo.</span>'+(lastTest(p)?'<span class="ps-last">'+lastTest(p)+'</span>':"")+'</div>'+
        (triedToday?'<button class="pill-btn" type="button" disabled>Try again tomorrow</button>':'<button class="pill-btn pill-green" type="button" data-tostart>Take the test</button>')+'</div>';
    box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+'<p class="ps-legend">Stars: ★ 7/10 · ★★ 9/10 · ★★★ 10/10. Below 7, your best score and tries are still saved.</p>'+
      (p.pause&&md.stages.find(x=>x.n===p.pause.n)?'<div class="card ps-pause"><span>⏸ You stopped <b>Stage '+p.pause.n+'</b> after '+p.pause.i+' of '+p.pause.ids.length+' questions ('+p.pause.score+' right) '+relD(p.pause.t)+'. Pick up where you left off:</span><button class="pill-btn pill-green" type="button" data-pscont="'+p.pause.n+'">Continue</button></div>':"")+'<div class="ps-cols'+(toCard?"":" one")+'"><div class="ps-main"><div class="ps-list">'+md.stages.map(st=>{
      const open=unlocked(st.n), best=p.b[st.n];
      if(st.adv) return '<div class="ps-advhd"><b>⭐ Advanced</b><span>B2–C1 · a bonus stage. You don’t need it to finish the module.'+((window.__bdAdvToy&&window.__bdAdvToy(M))?' Pass it to unlock the '+window.__bdAdvToy(M).ico+' <b>'+esc(window.__bdAdvToy(M).name)+'</b> for your study buddy.':"")+'</span></div><div class="card ps-stage ps-adv'+(open?"":" locked")+(r===st.n?" rec":"")+'"><div class="ps-num">'+(open?"⭐":"🔒")+'</div><div class="ps-info"><b>Stage '+st.n+' · '+esc(st.t)+'</b><span>'+esc(st.sub)+'</span>'+
        (r===st.n?'<span class="pr-rec">⭐ Noa recommends this one</span>':"")+'</div><div class="ps-side">'+stars(p.s[st.n]|0)+'<small>'+(best!=null?triedTxt(p,st.n,best):open?(p.pause&&p.pause.n===st.n?"":"not tried yet"):"pass stage "+(st.n-1)+" or test out")+'</small>'+
        stBtn(p,st.n,best,open)+'</div></div>';
      return '<div class="card ps-stage'+(open?"":" locked")+(r===st.n?" rec":"")+'"><div class="ps-num">'+(open?st.n:"🔒")+'</div><div class="ps-info"><b>Stage '+st.n+' · '+esc(st.t)+'</b><span>'+esc(st.sub)+'</span>'+
        (r===st.n?'<span class="pr-rec">⭐ Noa recommends this one</span>':"")+'</div><div class="ps-side">'+stars(p.s[st.n]|0)+'<small>'+(best!=null?triedTxt(p,st.n,best):testedOut()?"🎓 tested out":open?(p.pause&&p.pause.n===st.n?"":"not tried yet"):"get "+PASS+"/10 in stage "+(st.n-1))+'</small>'+
        stBtn(p,st.n,best,open)+'</div></div>';
    }).join("")+'</div>'+
    (md.noToy?'<p class="ps-goal">'+(allDone()?"🎉 You finished every stage!":"Get "+PASS+"/10 or more in each stage to finish the module.")+'</p>':
    '<p class="ps-goal">'+(allDone()?md.toy.split(" ")[0]+" You finished every stage! Your buddy has the <b>"+md.toyName+"</b>.":"Finish all "+md.stages.filter(st=>!st.adv).length+" stages ("+PASS+"/10 or more) to unlock the "+md.toy.split(" ")[0]+" <b>"+md.toyName+"</b> for your buddy.")+'</p>')+
    (M==="int"?'<div class="card ps-to intv-cta"><div><b>🎤 Practice interview</b><span>Answer real interview questions in writing and Hibi checks your <b>English</b>: grammar, more professional words, stronger verbs. Not the content: that depends on your job.</span><span class="esb">Responde preguntas reales de entrevista y Hibi revisa tu inglés (no el contenido).</span></div><button class="pill-btn pill-green" type="button" data-pr="intv">Start a practice interview</button></div>':"")+
    histHTML(p,md)+'</div>'+(toCard?'<aside class="ps-aside">'+toCard+'</aside>':"")+'</div>';
  }

  /* ---- a round ---- */
  let round=null;
  const nrm=s=>String(s||"").toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.?!,]+$/g,"").replace(/\bdidn't\b/g,"did not").replace(/\bwasn't\b/g,"was not").replace(/\bweren't\b/g,"were not").replace(/\bhaven't\b/g,"have not").replace(/\bhasn't\b/g,"has not").replace(/\s+/g," ").trim();
  function start(kind,stage){
    let pool, title;
    let story=null;
    if(kind==="ps"){ const st=MD().stages[stage-1]; { const m0=mods(), p0=ps(); if(p0.pause&&p0.pause.n===stage){ delete p0.pause; m0[M]=p0; LS.set("ncs-mods",m0); } }
      if(st.story){ let last=""; try{ last=sessionStorage.getItem("cs-"+M+"-story")||""; }catch(e){} const opts=st.stories.filter(x=>x.title!==last); story=opts[Math.floor(Math.random()*opts.length)]||st.stories[0]; try{ sessionStorage.setItem("cs-"+M+"-story",story.title); }catch(e){} pool=story.items.slice(); }
      else pool=shuffle(st.items).slice(0,10);
      title="Stage "+st.n+" · "+st.t; }
    else if(kind==="test"){ if(ps().tod===today()) { renderStages(); return; } pool=shuffle(MD().test).slice(0,15); title="🎓 Test out"; round={kind,stage:0,title,list:pool.map(q=>({q,mc:false})),i:0,score:0,missed:[],retry:false,answered:false,test:true}; const p=ps(), m=mods(); p.tod=today(); m[M]=p; LS.set("ncs-mods",m); show("ps"); paintQ(); return; }
    else if(kind==="voc"){ const v=VSET[stage]; vsCur=v.id; const mq=shuffle(v.qs.filter(q=>q.mco)).slice(0,5), cq=shuffle(v.qs.filter(q=>!q.mco)).slice(0,5); pool=mq.concat(cq); title=v.ico+" "+v.t; }
    else { const ids=misList().slice(0,10); if(!ids.length){ renderMis(); return; } pool=shuffle(ids.map(id=>ITEM[id])); title="My mistakes"; }
    const half=Math.ceil(pool.length/2);
    round={kind,stage,title,list:pool.map((q,i)=>({q,mc:!!q.mco||i<half})),i:0,score:0,missed:[],retry:false,answered:false,story};
    show(kind==="ps"?"ps":kind==="voc"?"vset":"mis"); paintQ();
  }
  const area=()=>$(round&&round.kind==="voc"?"vsetArea":round&&round.kind!=="mis"?"psArea":"misArea");
  function sentence(q,inner){ return esc(q.q).replace("___",inner); }
  function paintQ(){ psLede(!!(round&&round.test));
    const R=round, it=R.list[R.i], q=it.q, n=R.list.length, box=area(); if(!box) return;
    R.answered=false;
    const blank=it.mc?'<span class="ps-blank">___</span>':'<input class="ps-in" id="psIn" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer">';
    box.innerHTML='<div class="card ps-q"><div class="quiz-top"><span class="tag">'+esc(R.title)+'</span><span class="count">'+(R.retry?"Try again · "+(R.i+1)+" / "+n:(R.i+1)+" / "+n)+'</span></div>'+
      '<div class="ps-bar" aria-hidden="true"><i style="width:'+Math.round(R.i/n*100)+'%"></i></div>'+
      '<p class="ps-kind">'+(it.mc?"Choose the right answer":M==="ed"&&R.test?"Write t, d or id":"Write the missing words")+(R.test?" · you'll see your results at the end":"")+'</p>'+
      (R.story&&!R.retry?'<div class="ps-story"><b>📖 '+esc(R.story.title)+'</b>'+(R.i?'<p>'+R.list.slice(0,R.i).map(x=>esc(x.q.q.replace(/\s*\([^)]*\)\s*$/,"")).replace("___","<span>"+esc(x.q.a[0])+"</span>")).join(" ")+'</p>':'<p class="muted">The story starts here…</p>')+'</div>':"")+
      '<p class="ps-sent">'+sentence(q,blank)+'</p>'+(q.say&&window.csSpeak?'<p class="ps-say"><button class="swap" type="button" data-vsay="'+esc(q.say)+'" aria-label="Listen">🔊 Listen</button></p>':"")+
      (it.mc?'<div class="ps-opts">'+shuffle([q.a[0]].concat(q.o.slice(0,3))).map(o=>'<button type="button" class="ps-opt" data-psopt="'+esc(o)+'">'+esc(o)+'</button>').join("")+'</div>'
            :'<div class="note-actions"><button class="pill-btn" type="button" id="psCheck">'+(R.test?"Next →":"Check")+'</button><button class="swap" type="button" id="psDunno">'+(R.test?"Skip":"I don\'t know")+'</button></div>')+
      '<div class="ps-fb" id="psFb" aria-live="polite"></div></div>'+
      '<p class="ps-quit"><button class="foot-link" type="button" data-psquit>Stop this round</button></p>';
    const inp=$("psIn"); if(inp){ inp.focus({preventScroll:true}); inp.addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); if(R.answered) next(); else check(inp.value); } }); }
  }
  function check(val,btn){
    const R=round; if(!R||R.answered) return; const it=R.list[R.i], q=it.q;
    if(!it.mc&&!String(val||"").trim()&&val!==null) { const i=$("psIn"); if(i) i.focus(); return; }
    R.answered=true;
    const also=!it.mc&&val!==null&&!q.a.some(a=>a[0]!=="~"&&nrm(a)===nrm(val))&&q.a.some(a=>a[0]==="~"&&nrm(a.slice(1))===nrm(val));
    if(also){ R.answered=false; const f0=$("psFb"); if(f0){ f0.className="ps-fb also"; f0.innerHTML='<b>👍 That\'s also correct English!</b><p>But this exercise practices a different form'+(R.kind==="ps"&&R.title?' (<b>'+esc(R.title)+'</b>)':'')+'. Look at the hint in brackets and try once more.</p><p class="es">También está bien, pero aquí practicamos otra forma. Mira la pista entre paréntesis.</p>'; } const i0=$("psIn"); if(i0){ i0.focus(); i0.select(); } return; }
    const ok=val!==null&&q.a.some(a=>a[0]!=="~"&&nrm(a)===nrm(val));
    if(R.test){ if(ok) R.score++; else R.missed.push({q,val}); R.i++; if(R.i<R.list.length) paintQ(); else finishTest(); return; }
    if(!R.retry){ if(ok) R.score++; else R.missed.push(it); noteAnswer(q.id,ok); }
    else if(ok) noteAnswer(q.id,true);
    const box=area();
    if(it.mc){ box.querySelectorAll(".ps-opt").forEach(b=>{ b.disabled=true; if(nrm(b.dataset.psopt)===nrm(q.a[0])) b.classList.add("right"); }); if(btn&&!ok) btn.classList.add("wrong"); }
    else { const i=$("psIn"); if(i){ i.readOnly=true; i.classList.add(ok?"right":"wrong"); } const c=$("psCheck"), d=$("psDunno"); if(c) c.remove(); if(d) d.remove(); }
    const fb=$("psFb");
    fb.className="ps-fb "+(ok?"ok":"no");
    fb.innerHTML=(ok?'<b>✓ '+["Correct!","Nice!","That's it!","Exactly!"][Math.floor(Math.random()*4)]+'</b>':'<b>✗ The answer is: '+esc(q.a[0])+'</b>')+
      '<p>'+esc(q.why)+'</p>'+(q.es&&(beg()||!ok)?'<p class="es">'+esc(q.es)+'</p>':"")+
      '<button class="pill-btn pill-green" type="button" id="psNext">'+(R.i+1<R.list.length?"Next →":R.retry||!R.missed.length?"See my results":"Next →")+'</button>';
    const nb=$("psNext"); if(nb) nb.focus({preventScroll:true});
  }
  function next(){
    const R=round; if(!R) return;
    R.i++;
    if(R.i<R.list.length){ paintQ(); return; }
    if(!R.retry&&R.missed.length){ R.retry=true; R.list=R.missed.map(x=>({q:x.q,mc:x.mc})); R.i=0; const box=area(); box.innerHTML='<div class="card ps-q ps-mid"><p class="ps-sent">Let\'s try the '+(R.list.length===1?"one you missed":R.list.length+" you missed")+' one more time 💪</p><p class="muted">This part doesn\'t change your score.</p><button class="pill-btn pill-green" type="button" id="psGo">Let\'s go</button></div>'; $("psGo").focus({preventScroll:true}); return; }
    finish();
  }
  function finish(){
    const R=round, n=R.list.length; let html="";
    const perfect=!R.missed.length;
    if(R.kind==="voc"){
      const vp=vprog(), id=R.stage, o=vp[id]||{}; if(o.b==null||R.score>o.b) o.b=R.score; o.s=Math.max(o.s|0,starsFor(R.score)); o.r=(o.r|0)+1; o.last=Date.now(); vp[id]=o; LS.set("ncs-vocab",vp);
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / 10</div>'+stars(starsFor(R.score))+'<p class="ps-sent">'+(R.score===10?"Perfect! 🎉":R.score>=PASS?"Well done! 👍":"Good practice! Look at the words again and try once more 💪")+'</p>'+
        (R.missed.length?'<p class="muted">The ones you missed are saved in <b>My mistakes</b>.</p>':"")+
        '<div class="note-actions" style="justify-content:center"><button class="pill-btn pill-green" type="button" data-vqstart="'+id+'">Try again</button><button class="swap" type="button" data-vlearn="'+id+'">See the words</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect,finished:false}}));
    } else if(R.kind==="ps"){
      const m=mods(), p=ps(), md=MD(), st=R.stage, oldBest=p.b[st], wasDone=allDone(), wasOpen=md.stages[st]?unlocked(st+1):true;
      if(oldBest==null||R.score>oldBest) p.b[st]=R.score;
      p.s[st]=Math.max(p.s[st]|0,starsFor(R.score)); p.tr=p.tr||{}; p.tr[st]=(p.tr[st]|0)+1; p.ls=p.ls||{}; p.ls[st]={sc:R.score,t:Date.now()}; if(p.pause&&p.pause.n===st) delete p.pause; hist(p,{k:"st",n:st,sc:R.score}); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
      const nowOpen=md.stages[st]?unlocked(st+1):false, finishedAll=!wasDone&&allDone();
      const sg=starsFor(R.score);
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / 10</div>'+stars(sg)+
        '<p class="ps-sent">'+(R.score===10?"Perfect round! 🎉":R.score>=9?"Excellent! 🌟":R.score>=PASS?"Well done! You passed this stage. 👍":"Good practice! Get "+PASS+"/10 to pass this stage. You can do it 💪")+'</p>'+
        (nowOpen&&!wasOpen?'<p class="ps-unlock">🔓 Stage '+(st+1)+' is open!</p>':"")+
        (finishedAll?(md.noToy?'<p class="ps-unlock">🎉 You finished the whole '+esc(md.name)+' module!</p>':'<p class="ps-unlock">'+md.toy.split(" ")[0]+' You finished the whole '+esc(md.lname)+' module! Your buddy got the <b>'+md.toyName+'</b>.</p>'):"")+
        ((()=>{ const sa=md.stages.find(x=>x.n===st&&x.adv), ty=sa&&window.__bdAdvToy&&window.__bdAdvToy(M); return ty&&R.score>=PASS&&!(oldBest>=PASS)?'<p class="ps-unlock">'+ty.ico+' You passed the Advanced stage! Your buddy got the <b>'+esc(ty.name)+'</b>.</p>':""; })())+
        (R.missed.length?'<p class="muted">The questions you missed are saved in <b>My mistakes</b>, so you can review them later.</p>':"")+
        '<div class="note-actions" style="justify-content:center">'+(nowOpen&&md.stages[st]?'<button class="pill-btn pill-green" type="button" data-psstart="'+(st+1)+'">Next stage →</button>':"")+
        '<button class="pill-btn'+(nowOpen?"":" pill-green")+'" type="button" data-psstart="'+st+'">Try again</button><button class="swap" type="button" data-psall>All stages</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect,finished:finishedAll&&!md.noToy,mod:M,toy:md.toy}}));
    } else {
      const left=misList().length;
      html='<div class="card ps-res"><div class="ps-big">'+R.score+' / '+n+'</div><p class="ps-sent">'+(perfect?"All correct! 🎉":"Good review! 👍")+'</p><p class="muted">'+(left?left+(left===1?" question is":" questions are")+" still on your list. A question leaves the list when you get it right twice in a row.":"Your list is empty. Nothing left to review! 🎉")+'</p>'+
        '<div class="note-actions" style="justify-content:center">'+(left?'<button class="pill-btn pill-green" type="button" data-misstart>Review again</button>':"")+'<button class="swap" type="button" data-prback>All practice</button></div></div>';
      document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:R.score,perfect:perfect&&n>=5,finished:false}}));
    }
    const box=area(); round=null; box.innerHTML=html; bumpWeek();
  }
  view.addEventListener("click",e=>{
    const o=e.target.closest("[data-psopt]"); if(o&&round){ check(o.dataset.psopt,o); return; }
    if(e.target.closest("#psCheck")){ const i=$("psIn"); check(i?i.value:""); return; }
    if(e.target.closest("#psDunno")){ check(null); return; }
    if(e.target.closest("#psNext")||e.target.closest("#psGo")){ if(e.target.closest("#psGo")) paintQ(); else next(); return; }
    const s=e.target.closest("[data-psstart]"); if(s){ start("ps",+s.dataset.psstart); return; }
    if(e.target.closest("[data-misstart]")){ start("mis"); return; }
    if(e.target.closest("[data-tostart]")){ start("test"); return; }
    if(e.target.closest("[data-psall]")){ round=null; renderStages(); window.scrollTo({top:0}); return; }
    if(e.target.closest("[data-psquit]")&&round&&(round.kind==="ps"||round.kind==="test")){ const R=round, at=R.answered?R.i+1:R.i;
      if(R.kind==="test"){ if(at>0){ const m=mods(), p=ps(); p.lt={sc:R.score,t:Date.now(),at:at}; hist(p,{k:"to",sc:R.score,at}); p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m); } round=null; renderStages(); return; }
      if(R.retry||at>=R.list.length){ finish(); return; }
      if(at>0&&!R.story&&R.list.every(x=>x.q&&ITEM[x.q.id])){ const m=mods(), p=ps(); p.pause={n:R.stage,ids:R.list.map(x=>x.q.id),mc:R.list.map(x=>!!x.mc),i:at,score:R.score,missed:R.missed.map(x=>x.q.id),t:Date.now()}; const h0=(p.h||[])[0]; if(!(h0&&h0.k==="stop"&&h0.n===R.stage&&h0.at===at)) hist(p,{k:"stop",n:R.stage,sc:R.score,at}); p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m); }
      round=null; renderStages(); return; }
    const pc=e.target.closest("[data-pscont]"); if(pc){ const p=ps(), pz=p.pause, st=pz&&MD().stages.find(x=>x.n===pz.n);
      if(!pz||!st||!pz.ids.every(id=>ITEM[id])){ if(pz){ const m=mods(); delete p.pause; m[M]=p; LS.set("ncs-mods",m); } renderStages(); return; }
      const list=pz.ids.map((id,j)=>({q:ITEM[id],mc:!!pz.mc[j]}));
      round={kind:"ps",stage:pz.n,title:"Stage "+st.n+" · "+st.t,list,i:pz.i,score:pz.score|0,missed:(pz.missed||[]).map(id=>list.find(x=>x.q.id===id)).filter(Boolean),retry:false,answered:false,story:null};
      show("ps"); paintQ(); return; }
    if(e.target.closest("[data-psquit]")){ const k=round&&round.kind; round=null; if(k==="mis") renderMis(); else if(k==="voc") renderSet(); else renderStages(); return; }
    const vs=e.target.closest("[data-vset]"); if(vs){ round=null; vsCur=vs.dataset.vset; vsMode="list"; show("vset"); return; }
    const vq=e.target.closest("[data-vqstart]"); if(vq){ start("voc",vq.dataset.vqstart); return; }
    const vl=e.target.closest("[data-vlearn]"); if(vl){ round=null; vsCur=vl.dataset.vlearn; vsMode="cards"; vsI=0; vsFlip=false; renderSet(); return; }
    if(e.target.closest("[data-vflip]")){ vsFlip=!vsFlip; renderSet(); return; }
    const vn=e.target.closest("[data-vnav]"); if(vn){ const n=VSET[vsCur].items.length; vsI=(vsI+(+vn.dataset.vnav)+n)%n; vsFlip=false; renderSet(); return; }
    if(e.target.closest("[data-vlist]")){ vsMode="list"; renderSet(); return; }
    const sv=e.target.closest("[data-vsave]"); if(sv){ const it=VSET[vsCur].items[+sv.dataset.vsave]; if(typeof addWord==="function"&&addWord(it.w,it.def,it.ex.replace(/[\[\]]/g,""))){ sv.textContent="✓ Saved"; sv.disabled=true; } return; }
    const sp=e.target.closest("[data-vsay]"); if(sp){ if(window.csSpeak) window.csSpeak(sp.dataset.vsay); return; }
  });

  function finishTest(){
    const R=round, sc=R.score, pass=sc>=TOPASS, m=mods(), p=ps(), md=MD(), wasDone=allDone();
    if(pass){ if(!p.to||sc>p.to.sc) p.to={sc,t:Date.now()}; md.stages.forEach(st=>{ if(!st.adv) p.s[st.n]=Math.max(p.s[st.n]|0,3); }); }
    p.lt={sc,t:Date.now()}; hist(p,{k:"to",sc}); p.r++; p.last=Date.now(); m[M]=p; LS.set("ncs-mods",m);
    const finished=pass&&!wasDone;
    const box=area(); round=null;
    box.innerHTML='<div class="card ps-res"><div class="ps-big">'+sc+' / 15</div>'+(pass?stars(3):"")+
      '<p class="ps-sent">'+(pass?"Perfect! 🎓 You tested out of "+(md.the!=null?md.the:"the ")+md.lname+".":sc>=13?"So close! You need 15/15 to test out. 💪":"Good try! You need 15/15 to test out. 💪")+'</p>'+
      (finished?(md.noToy?'<p class="ps-unlock">🎉 Every stage is done!</p>':'<p class="ps-unlock">'+md.toy.split(" ")[0]+' Every stage is done, and your buddy got the <b>'+md.toyName+'</b>!</p>'):"")+
      (pass?"":'<p class="muted">You can try the test again tomorrow, or practice the stages to get there step by step.</p>')+
      (R.missed.length?'<div class="ps-miss"><b>'+(R.missed.length===1?"The one you missed":"The ones you missed")+'</b><ul>'+R.missed.map(x=>'<li>'+esc(x.q.q).replace("___","<b>"+esc(x.q.a[0])+"</b>")+(x.val?' <small>(you wrote: '+esc(x.val)+')</small>':"")+'<br><span class="muted">'+esc(x.q.why)+'</span></li>').join("")+'</ul></div>':"")+
      '<div class="note-actions" style="justify-content:center"><button class="pill-btn pill-green" type="button" data-psall>See the stages</button></div></div>';
    document.dispatchEvent(new CustomEvent("cs-modround",{detail:{score:sc,perfect:sc===15,finished:finished&&!md.noToy,mod:M,toy:md.toy}}));
    bumpWeek();
  }
  /* ---- Vocabulary ---- */
  let vsCur=null, vsMode="list", vsI=0, vsFlip=false;
  const haveW=()=>{ try{ return new Set((LS.get("ncs-words",[])||[]).map(x=>String(x.w||"").toLowerCase().trim())); }catch(e){ return new Set(); } };
  function renderVocab(){
    const box=$("vocArea"); if(!box) return; const vp=vprog();
    box.innerHTML='<div class="pr-tiles">'+VOC_SETS.map(v=>{ const o=vp[v.id]||{}; return '<button class="pr-tile" type="button" data-vset="'+v.id+'"><span class="pr-ico" aria-hidden="true">'+v.ico+'</span><b>'+esc(v.t)+'</b><span class="pr-sub">'+esc(v.sub)+'</span><span class="pr-sub">'+v.items.length+' words · '+stars(o.s|0)+'</span></button>'; }).join("")+'</div>'+'<p class="vp-irr">Looking for irregular verbs? <button type="button" class="linkish" onclick="window.__irrGo&&window.__irrGo(\'cards\')">They\'re in Grammar → 🔁 Irregular verbs</button></p>';
  }
  function renderSet(){
    const box=$("vsetArea"), v=VSET[vsCur]; if(!box||!v) return; const o=vprog()[v.id]||{}, have=haveW();
    const ttl=$("vsetTitle"); if(ttl) ttl.innerHTML=v.ico+" <em>"+esc(v.t)+"</em>";
    const saveBtn=i=>{ const it=v.items[i], on=have.has(it.w.toLowerCase()); return '<button class="swap" type="button" data-vsave="'+i+'"'+(on?" disabled":"")+'>'+(on?"✓ In My notebook":"+ Save to My notebook")+'</button>'; };
    const top='<div class="card vs-top"><div><b>'+v.items.length+' words</b> · '+stars(o.s|0)+(o.b!=null?' <span class="muted">best '+o.b+'/10</span>':"")+'</div><div class="note-actions"><button class="pill-btn pill-green" type="button" data-vqstart="'+v.id+'">✏️ Quiz · 10 questions</button>'+(vsMode==="cards"?'<button class="swap" type="button" data-vlist>☰ See the list</button>':'<button class="swap" type="button" data-vlearn="'+v.id+'">🃏 Flashcards</button>')+'</div></div>';
    if(vsMode==="cards"){
      const it=v.items[vsI];
      box.innerHTML=top+'<div class="card vs-card"><div class="quiz-top"><span class="tag">Flashcards</span><span class="count">'+(vsI+1)+' / '+v.items.length+'</span></div>'+
        '<button class="vs-face" type="button" data-vflip aria-label="Flip the card"><span class="vs-w">'+esc(it.w)+'</span>'+(vsFlip?'<span class="vs-def">'+esc(it.def)+'</span><span class="vs-ex">'+esc(it.ex).replace(/\[([^\]]+)\]/,"<b>$1</b>")+'</span>':'<span class="muted">Tap to see the meaning</span>')+'</button>'+
        '<div class="note-actions" style="justify-content:space-between"><button class="swap" type="button" data-vnav="-1">← Back</button><span class="note-actions"><button class="swap" type="button" data-vsay="'+esc(it.w+". "+it.ex.replace(/[\[\]]/g,""))+'" aria-label="Listen">🔊</button>'+saveBtn(vsI)+'</span><button class="pill-btn" type="button" data-vnav="1">Next →</button></div></div>';
      return;
    }
    box.innerHTML=top+'<div class="vs-list">'+v.items.map((it,i)=>'<div class="card vs-item"><div class="vs-item-top"><b>'+esc(it.w)+'</b><span class="note-actions"><button class="swap" type="button" data-vsay="'+esc(it.w+". "+it.ex.replace(/[\[\]]/g,""))+'" aria-label="Listen to '+esc(it.w)+'">🔊</button>'+saveBtn(i)+'</span></div><p>'+esc(it.def)+'</p><p class="vs-ex">'+esc(it.ex).replace(/\[([^\]]+)\]/,"<b>$1</b>")+'</p></div>').join("")+'</div>';
  }
  /* ---- My mistakes ---- */
  function renderMis(){
    const box=$("misArea"); if(!box) return; const ids=misList(), m=mis();
    if(!ids.length){ box.innerHTML='<div class="card"><p style="margin:0 0 10px"><b>Nothing to review yet 🎉</b></p><p class="muted" style="margin:0 0 12px">When you miss a question in a grammar stage, it shows up here so you can practice it again later.</p><button class="pill-btn" type="button" data-pr="gram">Go to Grammar</button></div>'; return; }
    box.innerHTML='<div class="card"><p style="margin:0 0 12px">You have <b>'+ids.length+'</b> '+(ids.length===1?"question":"questions")+' to review. Get one right twice in a row and it leaves the list.</p>'+
      '<ul class="mis-list">'+ids.slice(0,8).map(id=>'<li>'+esc(ITEM[id].q).replace("___","<b>"+esc(ITEM[id].a[0])+"</b>")+(m[id].n>1?' <small>missed '+m[id].n+'×</small>':"")+'</li>').join("")+(ids.length>8?'<li class="muted">…and '+(ids.length-8)+' more</li>':"")+'</ul>'+
      '<button class="pill-btn pill-green" type="button" data-misstart>Review '+Math.min(10,ids.length)+(ids.length===1?" question":" questions")+'</button></div>';
  }

  /* ---- open from elsewhere (notebook "Practice this") ---- */
  window.__prShow=(p,fromPop,m)=>{ round=null; if(m&&MODS[m]) setMod(m); show(p,fromPop); };
  window.csVocSet=function(id){ if(!VSET[id]) return; go("quiz",true); round=null; vsCur=id; vsMode="list"; show("vset"); window.scrollTo({top:0}); };
  window.csPractice=function(p,stage,mod){ go("quiz",true); round=null; if(mod) setMod(mod); if(p==="ps"&&stage){ start("ps",stage); } else show(p); };
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-psgo]"); if(!b) return; e.preventDefault(); window.csPractice("ps",+b.dataset.psgo||0,b.dataset.psmod||"ps"); });
  renderHub();
})();

/* ---------- account stats in the profile panel + approximate practice time ---------- */
(function(){
  /* practice time: count 30-second blocks while the tab is visible and you did something in the last 2 minutes */
  let lastAct=Date.now();
  ["pointerdown","keydown","scroll","touchstart"].forEach(ev=>document.addEventListener(ev,()=>{ lastAct=Date.now(); },{passive:true,capture:true}));
  setInterval(()=>{ if(document.hidden||Date.now()-lastAct>120000) return; const t=LS.get("ncs-ptime",null)||{s:0,since:Date.now()}; t.s=(t.s|0)+30; LS.set("ncs-ptime",t); },30000);
  if(!LS.get("ncs-ptime",null)) LS.set("ncs-ptime",{s:0,since:Date.now()});
  const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmtD=t=>{ const d=new Date(t); return MON[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear(); };
  const fmtT=s=>{ const h=Math.floor(s/3600), m=Math.round((s%3600)/60); return h? h+" h "+(m?m+" min":"") : (m||0)+" min"; };
  function fill(){
    const box=document.getElementById("authStats"); if(!box) return;
    const ws=(LS.get("ncs-words",[])||[]).filter(w=>w&&w.w), ns=(LS.get("ncs-classnotes",[])||[]).filter(n=>n&&n.text);
    const fc=LS.get("ncs-fc",{})||{}, learned=Object.values(fc).filter(v=>v>=3).length;
    const bd=LS.get("ncs-buddy",{})||{}, days=Array.isArray(bd.gd)?bd.gd.length:0;
    const mods=LS.get("ncs-mods",{})||{}, ps=mods.ps||{}, MI=window.__csModInfo?window.__csModInfo():[["ps",7],["pp",7]], MK=MI.map(x=>x[0]), STT=MI.reduce((t,x)=>t+x[1]*3,0), st=MK.reduce((t,k)=>t+Object.values((mods[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0), outs=MK.filter(k=>mods[k]&&mods[k].to&&mods[k].to.sc>=15).length;
    const pt=LS.get("ncs-ptime",null)||{s:0,since:Date.now()};
    const times=[...ws.map(w=>w.t),...ns.map(n=>n.t),LS.get("ncs-joined",0),pt.since].filter(t=>t>1e12);
    const joined=times.length?Math.min(...times):Date.now();
    let buddy="";
    try{ if(window.csBuddy&&bd.on===true) buddy='<div class="as-row"><span>💛 Buddy friendship</span><b>Level '+window.csBuddy.level()+'</b></div>'; }catch(e){}
    const row=(i,l,v)=>'<div class="as-row"><span>'+i+' '+l+'</span><b>'+v+'</b></div>';
    box.innerHTML='<h4>Your Cheat Sheet</h4>'+
      row("📅","Here since",fmtD(joined))+
      row("⏱️","Practice time","≈ "+fmtT(pt.s|0)+'<small>since '+fmtD(pt.since)+'</small>')+
      row("🌱","Study days",days)+

      row("✅","Words learned",learned)+
      row("📝","Class notes",ns.length)+
      row("🧩","Grammar stars",st+" / "+STT+" ★"+(outs?" 🎓":""))+
      buddy+
      '<div class="note-actions" style="margin-top:8px"><button class="swap" type="button" data-recap="now">📸 My monthly recap</button></div>';
  }
  const btn=document.getElementById("authBtn"); if(btn) btn.addEventListener("click",()=>setTimeout(fill,0));
  fill();
})();

⟦include:parts/recap.js⟧
⟦include:parts/usage.js⟧
/* offline support */
if("serviceWorker" in navigator&&location.protocol==="https:"){ window.addEventListener("load",()=>{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }); }
window.addEventListener("offline",()=>toast("You're offline. Your saved words and notes still work, and everything syncs when you're back online."));
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
      '<div class="lk-acts">'+(have?'<span class="lk-have">✓ In My notebook</span>':'<button class="pill-btn pill-green" type="button" data-lksave>+ Save to My notebook</button>')+
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

document.getElementById("wGoFlash").addEventListener("click",()=>{ if(window.csPractice) window.csPractice("flash"); });
/* ---------------- import words ---------------- */
const impCard=document.getElementById("importCard"), impOpen=document.getElementById("impOpen"), impText=document.getElementById("impText"), impPrev=document.getElementById("impPreview");
function parseCSV(text,delim){
  const rows=[]; let row=[], cell="", q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){ cell+='"'; i++; } else q=false; } else cell+=c; }
    else if(c==='"' && cell==="") q=true;
    else if(c===delim){ row.push(cell); cell=""; }
    else if(c==="\n"){ row.push(cell); rows.push(row); row=[]; cell=""; }
    else if(c!=="\r") cell+=c;
  }
  row.push(cell); rows.push(row); return rows;
}
function parseImport(text){
  text=(text||"").replace(/\r\n?/g,"\n");
  let rows;
  if(text.includes("\t")) rows=parseCSV(text,"\t");
  else {
    const lines=text.split("\n").filter(l=>l.trim());
    const csvLike=lines.length && lines.filter(l=>/[,;]/.test(l)).length===lines.length && lines.every(l=>!/ = | - /.test(l));
    if(csvLike){ const semi=(text.match(/;/g)||[]).length, com=(text.match(/,/g)||[]).length; rows=parseCSV(text, semi>com?";":","); }
    else rows=lines.map(l=>{ const m=l.match(/^(.+?)\s+(?:=|-|–|:)\s+(.+)$/); return m?[m[1],m[2]]:[l]; });
  }
  const out=[];
  rows.forEach(r=>{
    const c=r.map(x=>(x||"").replace(/\s+/g," ").trim().slice(0,240));
    const w=c[0]||""; if(!w) return;
    if(/^(english( word)?|word|words|english word \/ expression|spanish translation|be careful)/i.test(w) && /translation|spanish|español|meaning|example|^$/i.test((c[1]||"")+" ")) return;
    if(/^(english word|english word \/ expression)$/i.test(w)) return;
    out.push({w,m:c[1]||"",e:c[2]||""});
  });
  return out;
}
function impSummary(){
  const list=parseImport(impText.value);
  if(!impText.value.trim()){ impPrev.textContent=""; return list; }
  const have=new Set(words.map(x=>norm(x.w))); const seen=new Set();
  let fresh=0, dup=0; list.forEach(x=>{ const k=norm(x.w); if(have.has(k)||seen.has(k)) dup++; else { fresh++; seen.add(k); } });
  impPrev.innerHTML= list.length ? "Exactly as pasted: <b>"+fresh+"</b> new "+(fresh===1?"word":"words")+(dup?" · "+dup+" already in your list (skipped)":"")+"." : "Nothing to import yet. Check that each word is on its own line.";
  return list;
}
function toggleImport(open){ impCard.hidden=!open; impOpen.setAttribute("aria-expanded",open?"true":"false"); if(open) setTimeout(()=>impText.focus(),20); }
impOpen.addEventListener("click",()=>toggleImport(impCard.hidden));
document.getElementById("impClose").addEventListener("click",()=>toggleImport(false));
impText.addEventListener("input",impSummary);
document.getElementById("impFile").addEventListener("change",e=>{
  const f=e.target.files&&e.target.files[0]; if(!f) return;
  const rd=new FileReader(); rd.onload=()=>{ impText.value=String(rd.result||""); impSummary(); }; rd.onerror=()=>toast("Couldn't read that file. Try copying and pasting instead."); rd.readAsText(f); e.target.value="";
});
document.getElementById("impBtn").addEventListener("click",()=>{
  const list=parseImport(impText.value);
  if(!list.length){ impPrev.textContent="Paste your words first."; impText.focus(); return; }
  const have=new Set(words.map(x=>norm(x.w))); let n=0; const base=Date.now();
  const newIds=[]; list.forEach((x,i)=>{ const k=norm(x.w); if(have.has(k)) return; have.add(k); const id=(base+i).toString(36)+Math.random().toString(36).slice(2,6); newIds.push(id); words.push({id,w:x.w,m:x.m,e:x.e,t:base-(list.length-i),imp:true}); n++; }); setTimeout(()=>{ if(window.queueEnrich) window.queueEnrich(newIds); },50);
  const ok=LS.set("ncs-words",words);
  impText.value=""; renderWords(); fcShuffle(); renderFlash();
  impPrev.innerHTML= n ? "✓ Imported <b>"+n+"</b> "+(n===1?"word":"words")+(ok?"":" (but this browser blocks storage, so they won't be kept)")+'. <button class="foot-link" type="button" data-go="quiz">Practice them with flashcards →</button>' : "All of those words were already in your list.";
  toast(n? "Imported "+n+(n===1?" word":" words") : "Nothing new to import");
});


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
function saveWordsNow(){ LS.set("ncs-words",words); try{ renderWords(); fcShuffle(); renderFlash(); }catch(e){} updFill(); }
/* "✨ Fill in missing details" shows only when some words (not the ones auto-fill is still working on) miss something */
function updFill(){ const b=document.getElementById("aiFill"); if(!b) return; let n=0; try{ const fs=fillF(), now=Date.now(); n=fs.length?words.filter(x=>missF(x,fs)&&(x.ai||now-(+x.t||0)>90000)).length:0; }catch(e){} b.hidden=!n; const c=b.querySelector(".aif-n"); if(c) c.textContent=n?"("+n+")":""; }
setInterval(()=>{ const v=document.getElementById("v-words"); if(v&&!v.hidden) updFill(); },5000);

/* ---------- fill in the details of each word (part of speech, meaning, translation, example) ---------- */
async function enrichBatch(list,fs){
  fs=fs||fillF(); const want=f=>fs.includes(f);
  const items=list.map(x=>({id:x.id,word:x.w,spanish:x.m||"",example:x.e||"",short:isShort(x)}));
  const p="You help a Spanish-speaking learner of English (from Chile) build their vocabulary list. For EACH item return:\n"+
    (want("pos")?"- pos: the part of speech, one of: "+POS_LIST.join(", ")+"\n":"- pos: always an empty string\n")+
    (want("def")?"- def: a very short, simple English meaning (max 10 words, no quotes). If \"spanish\" is not empty, give the meaning that matches that Spanish translation (many words have several meanings)\n":"- def: always an empty string\n")+
    (want("m")?"- es: a natural Spanish translation ONLY if \"spanish\" is empty, otherwise an empty string\n":"- es: always an empty string\n")+
    (!want("e")?"- ex: always an empty string (the student writes their own examples)\n":"- ex: an example sentence using the word ONLY if \"example\" is empty, otherwise an empty string. "+exampleRule()+"\n")+
    (want("pr")?"- pr: ONLY if \"short\" is true, "+PR_RULE+". If \"short\" is false: an empty string\n":"- pr: always an empty string\n")+
    (want("def")?"- mix: ONLY when Spanish speakers very often confuse this word with a similar-looking English word or expression (e.g. catch on / catch up, borrow / lend, embarrassed / pregnant): {\"w\":\"the look-alike\",\"es\":\"its Spanish meaning, 2-5 words\"}. Otherwise null. Most words get null.\n":"- mix: always null\n")+
    "Use American English. Never change the student's word. Reply with ONLY a JSON array like [{\"id\":\"...\",\"pos\":\"...\",\"def\":\"...\",\"es\":\"...\",\"ex\":\"...\",\"pr\":\"...\",\"mix\":null}].\n\nITEMS:\n"+JSON.stringify(items);
  const r=await window.__csSample(p);
  const arr=aiJSON(r&&r.text); if(!Array.isArray(arr)) throw new Error("The AI's answer didn't make sense");
  let n=0;
  arr.forEach(a=>{ const x=words.find(w=>w.id===a.id); if(!x) return;
    if(want("pos")&&a.pos&&!x.pos) x.pos=cleanPos(a.pos);
    if(want("def")&&a.def&&!x.def) x.def=String(a.def).trim().slice(0,140);
    if(want("m")&&!x.m&&a.es) x.m=String(a.es).trim().slice(0,140);
    if(want("e")&&!x.e&&a.ex){ x.e=String(a.ex).trim().slice(0,220); x.aiEx=1; }
    if(want("pr")&&isShort(x)&&!x.pr){ const v=String(a.pr||"").replace(/[\/\[\]]/g,"").trim().slice(0,60); if(v) x.pr=v; else x.prTried=1; }
    if(want("def")){ const mx=a.mix&&typeof a.mix==="object"&&a.mix.w?{w:String(a.mix.w).trim().slice(0,40),es:String(a.mix.es||"").trim().slice(0,60)}:null; if(mx&&norm(mx.w)!==norm(x.w)) x.mix=mx; else delete x.mix; }
    if(!(fs.length===1&&fs[0]==="pr")) x.ai=1; n++; });
  saveWordsNow();
  return n;
}
/* Nov 27 2026: 🔀 Other meanings (in a word's edit form): the other common meanings of a word, looked up once and kept on the word (x.senses) */
window.__wSenses=async function(x){
  if(!aiOK()) throw new Error("no AI");
  const p="A Spanish-speaking learner of English (from Chile) saved this word in their vocabulary list:\n"+JSON.stringify({word:x.w,spanish:x.m||"",meaning:x.def||""})+
    "\nList the OTHER common meanings or uses of exactly this word or expression (a different meaning, or the same word as another part of speech), NOT the one that matches their Spanish translation. Max 3, the most useful first; skip rare or technical ones. For each: pos (one of: "+POS_LIST.join(", ")+"), def (a very short, simple English meaning, max 10 words), es (natural Spanish translation, 1-5 words), ex (a natural example sentence, "+(csBeginner()?"A2 level, 4 to 8 words":"B1 to B2 level, 8 to 15 words")+"). If the word really has only one common meaning, return an empty list. Use American English. Reply with ONLY a JSON array like [{\"pos\":\"...\",\"def\":\"...\",\"es\":\"...\",\"ex\":\"...\"}].";
  const r=await window.__csSample(p);
  const arr=aiJSON(r&&r.text); if(!Array.isArray(arr)) throw new Error("The AI's answer didn't make sense");
  return arr.filter(s=>s&&s.def).slice(0,3).map(s=>({pos:cleanPos(s.pos),def:String(s.def).trim().slice(0,140),es:String(s.es||"").trim().slice(0,140),ex:String(s.ex||"").trim().slice(0,220)}));
};
/* auto-fill follows the student's ⚙️ Auto-fill choices (Nov 20 2026) */
const needsInfo=x=>x&&x.w&&!x.sample&&!x.ai&&missF(x,fillF());
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
/* Nov 23 2026: words whose auto-fill failed (AI busy or couldn't connect) try again once each time Hibi opens (newest 20, last 30 days) */
setTimeout(()=>{ if(window.__csViewAsMode||window.__csPreview) return; try{ const ids=words.filter(x=>needsInfo(x)&&Date.now()-(+x.t||0)<30*864e5&&Date.now()-(+x.t||0)>90000).slice(-20).map(x=>x.id); if(ids.length) queueEnrich(ids); }catch(e){} },9000);
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
/* for "Save all" + Undo on live boards: which words exist, and take back the ones just added */
window.csWordIds=()=>words.map(x=>x.id);
window.csWordById=id=>words.find(x=>x.id===id)||null;
window.csRemoveWords=ids=>{ const s=new Set(ids); let n=0; for(let i=words.length-1;i>=0;i--) if(s.has(words[i].id)){ words.splice(i,1); n++; } if(n){ LS.set("ncs-words",words); renderWords(); } return n; };

/* ---------- safety net for the AI tools: explain first, then keep an undo copy ---------- */
const UNDO_KEY="cs-words-undo";
function wordsSnapshot(what){ try{ localStorage.setItem(UNDO_KEY,JSON.stringify({t:Date.now(),what,words})); }catch(e){} showUndo(); }
function undoInfo(){ try{ const u=JSON.parse(localStorage.getItem(UNDO_KEY)||"null"); if(u&&Array.isArray(u.words)&&Date.now()-u.t<7*864e5) return u; }catch(e){} return null; }
function showUndo(){
  let b=document.getElementById("aiUndo"); const u=undoInfo(), anchor=document.getElementById("aiFill");
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
const AUTOF=[["m","Spanish translation"],["def","Simple meaning","A short, easy English meaning"],["pos","Word type","noun, verb, phrasal verb…"],["pr","Pronunciation","How to say it, like LEV-er-ij (single words and short expressions)"],["e","Example sentence","Untick it if you like writing your own"]];
const readOpts=el=>[...el.querySelectorAll("[data-opt]:checked")].map(o=>o.value);
const CLEANF=[["spell","Spelling","English and Spanish typos"],["caps","Capital letters & punctuation",""],["es","Wrong Spanish meanings",""],["gram","Grammar in example sentences","Sentences you wrote yourself are only suggested, never changed unless you tick them"],["miss","Missing translations & examples",""],["dups","Repeated words","The same word saved twice: keep one and combine their details"]];
const cleanF=()=>{ const v=LS.get("ncs-cleanf",null); return Array.isArray(v)?v:CLEANF.map(c=>c[0]); };
setTimeout(showUndo,0); setTimeout(updFill,0);

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
  }catch(e){ console.warn(e);
    /* Nov 23 2026: say clearly that it didn't work (a student thought "nothing happened") */
    st.innerHTML=(done?"✓ Filled in "+done+(done===1?" word":" words")+", then ":"")+"⚠️ "+(done?"the":"The")+" AI helper couldn't connect right now, so "+(done?"the rest weren't":"nothing was")+" filled in. <b>Reload the page and try again in a few minutes.</b> Words that still miss something also fill in by themselves the next time you open Hibi.";
    toast("⚠️ The AI helper couldn't connect. Try again in a few minutes."); }
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
  let aiErr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); aiErr=e; }
  b.disabled=false; b.textContent="✨ Find my words";
  if(!Array.isArray(arr)){ impPrev.innerHTML=window.__csAiWhy(aiErr)+" For now, you can use <b>Import exactly as pasted</b> below."; return; }
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
  impPrev.innerHTML= ids.length? "✓ Saved <b>"+ids.length+"</b> "+(ids.length===1?"word":"words")+". ✨ Their meanings and examples are being filled in. <button class=\"foot-link\" type=\"button\" data-go=\"quiz\">Practice them →</button>" : "Nothing new to add.";
  toast(ids.length?"Saved "+ids.length+(ids.length===1?" word":" words"):"Nothing new to save");
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
  let aiErr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); aiErr=e; }
  if(!Array.isArray(arr)){ if(manual){ box.innerHTML='<p class="muted" style="margin:0">'+window.__csAiWhy(aiErr)+'</p>'; } else box.hidden=true; return; }
  const have=new Set(words.map(x=>norm(x.w)));
  const list=arr.filter(x=>x&&x.w&&!have.has(norm(x.w))).slice(0,12);
  if(!list.length){ if(manual){ box.innerHTML='<div class="cn-sug-top"><span>✓ No new words in this note. You already have them all!</span><button class="tip-x" type="button" data-sug="x" aria-label="Close">×</button></div>'; } else box.hidden=true; return; }
  box._list=list;
  const own=list.filter(x=>(x.mn&&String(x.mn).trim())||(x.en&&String(x.en).trim())).length;
  box.innerHTML='<div class="cn-sug-top"><b>✨ I found '+list.length+' new '+(list.length===1?"word":"words")+' in your note</b><button class="tip-x" type="button" data-sug="x" aria-label="Close">×</button></div>'+
    (own?'<label class="cs-chk" style="margin:6px 0 8px"><input type="checkbox" data-sugown checked> <span><b>Keep what I wrote in my notes</b><small>Your own meanings and examples stay as you wrote them ('+own+(own===1?' word':' words')+'). If one has a mistake, you get the corrected version instead.</small></span></label>':'')+
    '<div class="imp-list">'+list.map((x,i)=>{ const mine=(x.mn&&String(x.mn).trim())||(x.en&&String(x.en).trim()), shownM=(!x.bad&&x.mn&&String(x.mn).trim())?x.mn:x.m; return '<label class="imp-row"><input type="checkbox" data-sugi="'+i+'" checked><span><b>'+esc(x.w)+'</b>'+(x.pos?' <span class="pos">'+esc(cleanPos(x.pos))+'</span>':'')+(shownM?' · '+esc(shownM):'')+(x.def?'<small>'+esc(x.def)+'</small>':'')+(mine?'<small class="sug-own">'+(x.bad?'✏️ Your note had a small mistake, so the corrected version will be saved':'📝 Your own '+(x.mn&&x.en?'meaning and example':x.mn?'meaning':'example')+' will be kept')+'</small>':'')+'</span></label>'; }).join("")+'</div>'+
    '<div class="note-actions"><button class="pill-btn pill-green" type="button" data-sug="add">Save to My notebook</button><button class="swap" type="button" data-sug="x">No thanks</button></div>';
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
  const d=csDialog('<h3 style="margin-top:0">✅ Saved to My notebook</h3><p>'+n+(n===1?' new word is':' new words are')+' now in <b>My notebook</b>:</p><ul class="cs-added">'+added.map(w=>'<li>'+esc(w)+'</li>').join("")+'</ul><div class="note-actions"><button class="pill-btn pill-green" type="button" data-a="go">See my words</button><button class="swap" type="button" data-a="ok">OK</button></div>');
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
  if(f){ const fs0=fillF(), n0=words.filter(x=>missF(x,fs0)).length, nm={m:"the Spanish",def:"a simple meaning",pos:"the word type",pr:"how to say it",e:"an example sentence"}, li=fs0.map(k=>nm[k]);
    if(!n0){ updFill(); const st=document.getElementById("aiStatus"); st.hidden=false; st.textContent="✓ All your words already have their details."; return; }
    askFirst("✨ Fill in missing details",'<p><b>'+n0+(n0===1?" word is":" words are")+'</b> missing something. Hibi fills in '+esc(li.length>1?li.slice(0,-1).join(", ")+" and "+li[li.length-1]:li[0])+' where it\'s missing, and <b>never changes anything you already wrote</b>.</p><p class="muted" style="font-size:13.5px">To change what gets filled in, use <b>⚙️ Auto-fill</b>.</p>',
      ()=>completeAll(f,fs0),"Fill them in"); }
  else if(e.target.closest("#aiAuto")){ const fs0=fillF();
    const d=csDialog('<h3 style="margin-top:0">⚙️ Auto-fill</h3><p>When you save a word, Hibi fills in these by itself. It never changes anything you wrote.</p>'+
      optList("auto",AUTOF,fs0)+'<div class="note-actions"><button class="pill-btn pill-green" type="button" data-af="y">Save</button><button class="swap" type="button" data-af="n">Cancel</button></div>');
    d.el.addEventListener("click",ev=>{ const b=ev.target.closest("[data-af]"); if(!b) return; const fs=readOpts(d.el); d.close(); if(b.dataset.af!=="y") return;
      LS.set("ncs-fillf",fs); LS.set("ncs-fillf-v",2); LS.set("ncs-noex",!fs.includes("e")); updFill();
      toast(fs.length?"✓ Saved. New words get "+fs.length+(fs.length===1?" thing":" things")+" filled in":"✓ Saved. Auto-fill is off"); }); }
  else if(c) askFirst("🧹 Clean up my words",'<p>Choose what the AI checks. It shows you every change first, and <b>nothing changes until you press Apply</b>. Your own sentences (✍️) are never touched.</p>'+optList("clean",CLEANF,cleanF()),
      el=>{ const co=readOpts(el); LS.set("ncs-cleanf",co); cleanUp(c,co); },"Check my words");
  else if(e.target.closest("#aiUndo")) undoWords();
});

window.queueEnrich=queueEnrich; window.csBeginnerOn=csBeginner;
/* ---------- beginner mode: small Spanish helper lines, level badges, Spanish "In short" ---------- */
(function(){
  // [selector, Spanish text, where]  where: "after" = new line under it, "in" = inside (buttons/labels)
  const ES=[
    ['label[for="nWord"]',"Palabra o expresión en inglés","in"],
    ['label[for="nMeaning"]',"Traducción al español","in"],
    ['label[for="nExample"]',"Oración de ejemplo","in"],
    ['label[for="nNote"]',"Notas","in"],
    ["#cnSave","Guardar nota","in"],
    ["#fcKnew","¡Me la sabía!","in"],
    ["#fcMiss","No me la sabía","in"],
    ["#fcNext","Saltar","in"],
    ["#snCheck","Revisar mi oración","in"],
    ["#spMic","Toca y dilo","in"],
    ["#rvGo","Practicar estas 5","in"],
    ["#impOpen","Agregar muchas palabras","in"],
    ["#aiFill","Completar lo que falta","in"],
    ["#aiAuto","Qué se completa solo","in"],
    ["#aiClean","Ordenar mis palabras","in"],
    ["#ttLove","Mandar cariño","in"],
    [".today-word .td-tag","Palabra del día","in"],
    [".today-thought .td-tag2","Pensamiento del día","in"],
    ["#rvBox .td-tag","Palabras para repasar hoy","in"]
  ];
  const H2=[["Use it in a sentence","Úsala en una oración: escribe una oración con tu palabra y recibe comentarios."],["Say it out loud","Dila en voz alta para practicar tu pronunciación."],["Irregular verbs","Verbos irregulares"]];
  function addHints(){
    ES.forEach(([sel,txt,where])=>{ document.querySelectorAll(sel).forEach(el=>{ if(el.dataset.esb) return; el.dataset.esb="1"; const s=document.createElement("span"); s.className="esb"+(where==="in"?" esb-in":""); s.lang="es"; s.textContent=txt; if(where==="in") el.appendChild(s); else el.insertAdjacentElement("afterend",s); }); });
    document.querySelectorAll("#v-quiz h2").forEach(h=>{ const m=H2.find(([en])=>h.textContent.trim().startsWith(en)); if(!m||h.dataset.esb) return; h.dataset.esb="1"; const s=document.createElement("span"); s.className="esb"; s.lang="es"; s.textContent=m[1]; h.insertAdjacentElement("afterend",s); });
  }
  addHints();
  /* beginner mode: each page's description in Spanish (the English one hides) */
  const LEDE_ES={"club": "Las clases de esta semana, tus links de Zoom y las semanas anteriores. Solo los miembros del club ven esta página.", "tenses": "Escribe cualquier verbo y elige un sujeto. Los 12 tiempos se actualizan solos, en afirmativo (+), negativo (−) y pregunta (?).", "verbs": "Busca en inglés o en español. Toca <span class=\"mono\">see tenses</span> para ver un verbo en los 12 tiempos.", "notes": "Tu palabra del día, una idea para hoy y lo nuevo en el club.", "feedback": "¿Falta algo, algo es confuso o no funciona? Cuéntame. Leo todos los mensajes y los uso para mejorar esta página. Escribirlo en inglés es buena práctica, pero en español también está bien.", "words": "Todas las palabras que guardas, las más nuevas primero. Practícalas con tarjetas o agrega una lista que ya tengas.", "classnotes": "Escribe aquí o en tu página de inicio los apuntes de hoy. Cada nota que guardas aparece abajo, la más nueva primero.", "notebook": "Tus mismos apuntes, agrupados por semana, con un resumen corto de cada semana: los temas, las correcciones para recordar y las expresiones nuevas. Toca <b>+ Save</b> para agregar una expresión a tus palabras.", "park": "Las mascotas de estudio de todos, juntas. Toca una para ver de quién es y mandarle cariño: gana <b>+2 de amistad</b> (una vez al día por mascota). Usa <b>− / +</b> para alejar o acercar.", "coaching": "Tus clases privadas con Noa: tu próxima clase, la tarea, tus metas, guías y tu pack. Noa lo actualiza después de cada clase.", "translate": "Escribe una palabra o frase en español <i>o</i> en inglés y toca <b>Translate here</b>. Reconoce el idioma solo y te muestra cómo se pronuncia el inglés. También puedes abrirlo en Google Translate o DeepL.", "mistakes": "Los errores más comunes de quienes hablan español, y cómo corregirlos. Todos los cometemos, así que tranquilo: solo intenta darte cuenta.", "place": "Para lugares, piensa en <b>in</b> como dentro de un espacio, <b>on</b> como sobre una superficie o una línea, y <b>at</b> como un punto en el mapa. Para movimiento, la preposición muestra la dirección.", "usedto": "Se ven casi iguales, pero significan tres cosas distintas. El truco: después de <b>be used to</b> y <b>get used to</b> va un sustantivo o un verbo + -ing.", "passive": "Usa la voz pasiva cuando la acción importa más que quién la hizo, o cuando no sabes quién fue. <b>Estructura: be + participio.</b> Solo el verbo <i>be</i> cambia de tiempo.", "reported": "Cómo contarle a alguien lo que dijo otra persona. Normalmente el verbo da un paso atrás en el pasado.", "backup": "¿No has iniciado sesión? Tus palabras, apuntes y secciones favoritas viven solo en este navegador. Usa esta página para guardar una copia o pasar todo a otro computador, navegador o a tu teléfono. O simplemente inicia sesión con Google y todo se sincroniza solo.", "changelog": "Todo lo que se ha agregado a Hibi, lo más nuevo primero.", "be": "Un verbo con dos significados en español: <b>ser</b> y <b>estar</b>. Se usa para identidad, sentimientos, lugar, edad y descripciones.", "modals": "Modal + verbo base. Sin <b>to</b>, sin <b>-s</b>, sin <b>-ed</b>: <span class=\"ok\">she can swim</span> · <span class=\"no\">she cans swim</span> · <span class=\"no\">she can to swim</span>", "domake": "Los dos significan <b>hacer</b>. La regla rápida: <b>do</b> es para actividades y tareas; <b>make</b> es para crear o producir algo. Después hay combinaciones que simplemente se aprenden.", "time": "Piénsalo de grande a pequeño. <b>In</b> para periodos largos, <b>on</b> para días, <b>at</b> para momentos exactos.", "tofor": "Los dos pueden ser <b>para</b> o <b>a</b> en español, por eso confunden. Aquí ves cuándo se usa cada uno.", "pronouns": "Lee cada fila de izquierda a derecha: la misma persona, con distinta función en la oración.", "quantity": "Primero pregúntate: ¿se puede contar? <i>One apple, two apples</i> = contable. <i>Water, information, advice, money</i> = incontable (siempre en singular).", "frequency": "¿Con qué frecuencia lo haces?", "conversation": "Una conversación no es una entrevista de trabajo. Responde, agrega algo más y haz una pregunta de vuelta. Conectar es más importante que responder perfecto.", "linking": "Los conectores que de verdad vas a usar, agrupados por lo que hacen. Empieza con los dos primeros de cada grupo.", "false": "Parecen palabras en español, pero no lo son.", "basics": "El inglés es estricto con el orden de las palabras. En español puedes moverlas; en inglés casi no.", "summary": "Úsalo cuando me cuentes del podcast, video o historia que escuchaste o leíste. Sigue este orden y no te vas a perder.", "stuck": "No te cambies al español. Usa una de estas frases y sigue. Quedarse pegado es normal; lo importante es salir en inglés.", "opinions": "Formas de decir lo que piensas, estar de acuerdo y no estarlo, sin sonar mal educado.", "conditionals": "Elige un ejemplo o escribe el tuyo. Los cuatro condicionales se actualizan abajo para que los compares lado a lado.", "perfect": "La pregunta clave: <b>¿digo (o sé) cuándo pasó?</b> Si la respuesta es sí, past simple. Si hablas de tu vida hasta ahora, present perfect.", "gerund": "Cuando un verbo va después de otro, el segundo toma una de dos formas: el <b>gerundio</b> (verbo + -ing) o el <b>infinitivo</b> (to + verbo). Depende del primer verbo.", "phrasal": "Verbo + una palabrita = un significado nuevo. Estos son los que vas a escuchar todos los días. Busca en inglés o en español.", "compare": "Comparativo = comparar dos cosas (<i>bigger than</i>). Superlativo = el que más de un grupo (<i>the biggest</i>).", "pronunciation": "Palabras que confunden a casi todos. Toca 🔊 para escucharlas. La parte en <b>negrita</b> es la sílaba acentuada.", "numbers": "El inglés usa el punto y la coma al revés que en Chile. Esto confunde a mucha gente en reuniones.", "email": "Frases listas para copiar y pegar en el trabajo. Neutras y profesionales, sin sonar rígidas.", "interview": "Las preguntas que casi siempre te van a hacer, cómo empezar tus respuestas y frases para ganar unos segundos para pensar.", "quiz": "Elige qué quieres practicar hoy. Cada ronda que terminas ayuda a tu mascota y a tu meta de la semana."};
  document.querySelectorAll("section.view").forEach(v=>{ const id=v.id.replace(/^v-/,""), t=LEDE_ES[id], l=v.querySelector("p.lede:not(.lede-es)"); if(!t||!l||v.querySelector(".lede-es")) return;
    const p=document.createElement("p"); p.className="lede lede-es"; p.lang="es"; p.innerHTML=t; l.insertAdjacentElement("afterend",p); });
  /* Thought for today, in Spanish too (translated once, then remembered) */
  (function(){ const el=document.getElementById("ttText"); if(!el) return; let busy=false;
    const paint=async()=>{ if(!csBeginner()) return; const en=(el.textContent||"").trim(); if(!en) return; let out=document.getElementById("ttEs"); if(!out){ out=document.createElement("p"); out.id="ttEs"; out.className="tt-es"; out.lang="es"; el.insertAdjacentElement("afterend",out); }
      let c={}; try{ c=JSON.parse(localStorage.getItem("cs-tt-es")||"{}")||{}; }catch(e){}
      if(c[en]){ out.textContent=c[en]; return; } if(busy||typeof window.__csSample!=="function") return; busy=true;
      try{ const r=await window.__csSample("Translate this short motivational sentence into natural, simple Latin American Spanish (Chile). Reply with ONLY the translation.\n\n"+en); const t=(r&&r.text||"").trim().replace(/^["“]|["”]$/g,""); if(t){ c[en]=t; try{ localStorage.setItem("cs-tt-es",JSON.stringify(c)); }catch(e){} out.textContent=t; } }catch(e){} busy=false; };
    new MutationObserver(paint).observe(el,{childList:true,characterData:true,subtree:true}); window.addEventListener("cs-sample-ready",paint); setTimeout(paint,1500); paint(); })();
  // level of each lesson page (shown on the page; in the menu only in beginner mode)
  const LV={interview:"B1",basics:"A1",be:"A1",time:"A1",place:"A1",pronouns:"A1",frequency:"A1",numbers:"A1",tenses:"A2",verbs:"A2",mistakes:"A2",stuck:"A2",conversation:"A2",modals:"A2",compare:"A2",usedto:"A2",domake:"A2",tofor:"A2",quantity:"A2",pronunciation:"A2",false:"A2",summary:"B1",opinions:"B1",linking:"B1",conditionals:"B1",perfect:"B1",gerund:"B1",phrasal:"B1",passive:"B1",email:"B1",reported:"B2"};
  Object.keys(LV).forEach(id=>{
    const v=document.getElementById("v-"+id), h=v&&v.querySelector("h1");
    if(h&&!h.querySelector(".lvl-chip")){ const c=document.createElement("span"); c.className="lvl-chip lvl-"+LV[id].toLowerCase(); c.textContent=LV[id]; c.title="Level "+LV[id]; h.appendChild(c); }
    document.querySelectorAll('nav.side .navbtn[data-go="'+id+'"]').forEach(b=>{ if(b.querySelector(".nav-lvl")) return; const c=document.createElement("span"); c.className="nav-lvl lvl-"+LV[id].toLowerCase(); c.setAttribute("aria-hidden","true"); c.textContent=LV[id]; b.appendChild(c); });
  });
  // "In short" boxes: Spanish version on request (beginner mode)
  let isCache=LS.get("cs-is-es",{})||{};
  /* written Spanish versions, shown right away in beginner mode */
  const IS_ES={"tenses": "<b>Simple</b> = hechos y hábitos · <b>continuous</b> (be + -ing) = algo en progreso · <b>perfect</b> (have + participio) = conectado con un momento posterior.", "verbs": "La mayoría de los verbos solo agregan <b>-ed</b>. Los irregulares cambian: go → <b>went</b> → <b>gone</b>. La columna 2 es el pasado (I went); la columna 3 va después de have (I've gone).", "mistakes": "Los más importantes: <b>I'm 30</b> (no \"I have 30\"), <b>I agree</b> (no \"I'm agree\"), <b>explain to me</b> (no \"explain me\"). Fíjate en ellos, sin estrés.", "place": "<b>in</b> = dentro de un espacio · <b>on</b> = sobre una superficie o una línea · <b>at</b> = un punto, o donde pasa algo.", "usedto": "<b>used to + verbo</b> = un hábito del pasado (solía) · <b>be used to + -ing</b> = estar acostumbrado · <b>get used to + -ing</b> = acostumbrarse.", "passive": "<b>be + participio</b>. Úsala cuando la acción importa más que quién la hizo: <i>My phone was stolen.</i> (Me robaron el teléfono.)", "reported": "Mueve el verbo un paso hacia atrás: \"I <b>am</b> tired\" → She said she <b>was</b> tired. <b>Say</b> algo · <b>tell</b> algo a alguien.", "be": "<b>be</b> = ser y estar. También se usa para la edad y las sensaciones: <b>I'm 30</b>, <b>I'm hungry</b> (no \"I have\").", "modals": "Modal + verbo base, sin <i>to</i>, sin <i>-s</i> y sin <i>-ed</i>: <b>She can swim.</b> can = poder/saber · should = consejo · must = obligación · might = quizás.", "domake": "<b>do</b> = actividades y tareas (do homework) · <b>make</b> = crear o producir algo (make dinner, make a decision).", "time": "<b>in</b> = periodos largos (in May) · <b>on</b> = días y fechas (on Monday) · <b>at</b> = horas exactas (at 3:00). Nada antes de next, last, this o every.", "tofor": "<b>to</b> = destino, quién lo recibe, propósito + verbo (I'm here <b>to learn</b>) · <b>for</b> = beneficio, duración, propósito + sustantivo (<b>for dinner</b>).", "pronouns": "La misma persona, distinta función: <b>I · me · my · mine · myself</b>. No confundas your/you're, its/it's, their/they're.", "quantity": "¿Se puede contar? <b>Contable</b> → many, a few. <b>Incontable</b> (water, advice, money) → much, a little. <b>A lot of</b> sirve para los dos.", "frequency": "always, usually, often y never van <b>antes del verbo principal</b> pero <b>después de be</b>: I always study · He is always late.", "conversation": "<b>Responde</b>, <b>agrega un poquito más</b> y <b>haz una pregunta de vuelta</b>. Ese es todo el truco.", "linking": "Aprende uno o dos de cada grupo y úsalos de verdad. Con <b>however</b> o <b>therefore</b>: punto o punto y coma antes, coma después.", "false": "Se parecen al español pero significan otra cosa: <b>actually</b> ≠ actualmente (= en realidad) · <b>embarrassed</b> ≠ embarazada (= avergonzado) · <b>library</b> ≠ librería (= biblioteca).", "basics": "En inglés siempre necesitas un sujeto, y el orden es <b>Sujeto + Verbo + Objeto</b>: <i>It's raining · She reads a book.</i>", "summary": "<b>Qué era</b> → <b>idea principal</b> → <b>2 o 3 detalles</b> → <b>tu opinión</b> → <b>lo que no entendiste</b>.", "stuck": "Quédate en inglés: <b>descríbelo</b> (It's a kind of…), <b>gana tiempo</b> (Let me think…) o <b>pregunta</b> (How do you say…?).", "opinions": "<b>I think…</b> · <b>I see your point, but…</b> · <b>I'm not sure about that.</b> No estés de acuerdo con la idea, no con la persona.", "conditionals": "<b>If + presente, will</b> = futuro real · <b>If + pasado, would</b> = imaginario · <b>If + had done, would have</b> = un pasado que no pasó. Nunca uses <i>will</i> ni <i>would</i> en la parte del if.", "perfect": "¿Dices <b>cuándo</b>? → past simple (I went <b>last year</b>). Tu vida hasta ahora, sin decir cuándo → present perfect (I've been there <b>twice</b>).", "gerund": "<b>-ing</b> después de preposiciones y de verbos como enjoy, avoid, finish · <b>to + verbo</b> después de want, need, decide, hope.", "phrasal": "Verbo + palabrita = un significado nuevo. Apréndelos como una sola palabra: <b>look for</b> = buscar · <b>find out</b> = averiguar.", "compare": "Adjetivos cortos: <b>-er / the -est</b> (cheaper, the cheapest). Largos: <b>more / the most</b>. good → better → the best.", "pronunciation": "La <b>sílaba acentuada</b> es la que suena más fuerte. Si aciertas con el acento, te entienden, aunque tengas acento.", "numbers": "En inglés se usa <b>punto</b> para los decimales y <b>coma</b> para los miles: 1.5 = one point five · 10,000 = ten thousand.", "email": "Empieza amable, di <b>por qué escribes</b>, pide algo <b>con claridad</b> y cierra con un <b>próximo paso</b>.", "interview": "<b>Responde</b> la pregunta, da <b>un ejemplo real</b> y <b>conéctalo</b> con el trabajo. Corto y concreto es mejor que largo y perfecto."};
  document.querySelectorAll(".in-short").forEach(b=>{
    if(b.querySelector(".is-es,.is-es-pre")) return;
    const sec=b.closest("section.view"), id=sec&&sec.id.replace(/^v-/,"");
    if(id&&IS_ES[id]){ const box=b.querySelector(":scope > div")||b; if(!box.querySelector(":scope > .is-en")){ const en=document.createElement("span"); en.className="is-en"; while(box.firstChild) en.appendChild(box.firstChild); box.appendChild(en); } const d=document.createElement("div"); d.className="is-es-pre"; d.lang="es"; d.innerHTML=IS_ES[id]; box.appendChild(d); return; }
    const btn=document.createElement("button"); btn.type="button"; btn.className="is-es"; btn.textContent="Ver en español";
    const out=document.createElement("div"); out.className="is-es-txt"; out.lang="es"; out.hidden=true;
    b.appendChild(btn); b.appendChild(out);
    btn.addEventListener("click",async()=>{
      if(!out.hidden){ out.hidden=true; btn.textContent="Ver en español"; return; }
      const en=(b.querySelector("div")||b).textContent.trim(), k=String(en.length)+en.slice(0,40);
      if(isCache[k]){ out.textContent=isCache[k]; out.hidden=false; btn.textContent="Ocultar español"; return; }
      if(typeof window.__csSample!=="function"){ toast("La traducción no está disponible ahora. Inténtalo en un momento."); return; }
      btn.textContent="Traduciendo…"; btn.disabled=true;
      try{ const r=await window.__csSample("Translate this short English grammar explanation into natural, simple Latin American Spanish (Chile) for a beginner student. Keep English examples in English. Reply with ONLY the translation.\n\n"+en); const t=(r&&r.text||"").trim(); if(t){ isCache[k]=t; LS.set("cs-is-es",isCache); out.textContent=t; out.hidden=false; btn.textContent="Ocultar español"; } else btn.textContent="Ver en español"; }
      catch(e){ btn.textContent="Ver en español"; toast("No se pudo traducir ahora. Inténtalo de nuevo."); }
      btn.disabled=false;
    });
  });
  // Settings: beginner mode switch
  function inject(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csLevelSec")) return;
    const first=p.querySelector(".cs-sec"); if(!first) return;
    const sec=document.createElement("div"); sec.className="cs-sec"; sec.id="csLevelSec";
    sec.innerHTML='<h4>Your level</h4><label class="cs-tog"><input type="checkbox" id="csBeginnerT"><span><b>🌱 Beginner mode · Modo principiante</b><small>Más ayuda en español, ejemplos más simples, tarjetas que empiezan en español y una voz más lenta. More Spanish help, simpler examples and a slower voice.</small></span></label>';
    p.insertBefore(sec,first);
    const t=document.getElementById("csBeginnerT"); t.checked=csBeginner();
    t.addEventListener("change",()=>window.csSetLevel(t.checked));
  }
  new MutationObserver(inject).observe(document.body,{childList:true,subtree:true}); inject();
})();

/* ---------------- delete all words ---------------- */
const delBar=document.getElementById("delAllBar");
document.getElementById("delAll").addEventListener("click",()=>{
  if(!words.length){ toast("You don't have any words yet"); return; }
  document.getElementById("delAllTxt").innerHTML='<b>Delete all '+words.length+(words.length===1?' word':' words')+'?</b> This can\'t be undone. If you want to keep them, copy them first.';
  delBar.hidden=false; document.getElementById("delAllNo").focus();
});
document.getElementById("delAllNo").addEventListener("click",()=>{ delBar.hidden=true; });
document.getElementById("delAllCopy").addEventListener("click",()=>doCopy(false));
document.getElementById("delAllYes").addEventListener("click",()=>{
  const n=words.length; words=[]; LS.set("ncs-words",words); fcStats={}; LS.set("ncs-fc",fcStats);
  delBar.hidden=true; editingId=null; renderWords(); fcShuffle(); renderFlash(); toast(n+(n===1?" word":" words")+" deleted");
});
delBar.addEventListener("keydown",e=>{ if(e.key==="Escape") delBar.hidden=true; });

/* ---------------- common mistakes ---------------- */
const MIS=[
["I have 30 years.","I'm 30 (years old).","Age uses be, not have. Tengo 30 → I'm 30."],
["I am agree.","I agree.","Agree is a verb, so no am."],
["People is very friendly.","People are very friendly.","People is plural."],
["Explain me, please.","Explain it to me, please.","explain something to someone"],
["Say me the answer.","Tell me the answer.","tell + person, say + what"],
["It depends of the price.","It depends on the price.","depend on"],
["She's married with a doctor.","She's married to a doctor.","married to"],
["Is raining.","It's raining.","English always needs a subject."],
["The life is hard.","Life is hard.","No the when you talk in general."],
["I like the dogs.","I like dogs.","No the for things in general."],
["I'm boring in class.","I'm bored in class.","bored = how you feel (aburrido); boring = what causes it (aburridor)"],
["Can I make a question?","Can I ask a question?","ask a question"],
["We discussed about the project.","We discussed the project.","discuss has no about"],
["I want that you come.","I want you to come.","want + person + to"],
["It's more better.","It's better.","-er or more, never both"],
["I live here since 3 years.","I've lived here for 3 years.","for + time period, with the present perfect"],
["I need an advice.","I need some advice.","advice is uncountable"],
["Thanks for the informations.","Thanks for the information.","information is uncountable"],
["Actually I work in a bank.","Currently I work in a bank.","actually = en realidad; actualmente = currently"],
["I assisted to the meeting.","I attended the meeting.","attend = asistir; assist = ayudar"],
["We arrived to Lima.","We arrived in Lima.","arrive in (city) / at (building)"],
["I'm going to home.","I'm going home.","No to before home"],
["How is it called?","What is it called?","What … called?"],
["Did you went?","Did you go?","After did, use the base verb."],
["He don't like it.","He doesn't like it.","he / she / it → doesn't"],
["I lost the bus.","I missed the bus.","miss a bus, a class, a call"],
["Can you borrow me your pen?","Can you lend me your pen?","lend = prestar (dar); borrow = pedir prestado"],
["Remember me to call her.","Remind me to call her.","remind someone = recordarle a alguien"],
["It's depends.","It depends.","Just one verb: it depends."],
["I like very much English.","I like English very much.","very much goes at the end"],
["Open the light, please.","Turn on the light, please.","turn on / turn off"],
["My English is very bad, sorry.","I'm still learning, so bear with me.","Be kind to yourself! (and it sounds better)"],
["I didn't knew.","I didn't know.","After didn't, use the base verb."],
["She has 3 brothers and she is the most young.","She's the youngest.","short adjectives: -est"],
["I'm interesting in music.","I'm interested in music.","interested = what you feel"],
["Make a party","Have / throw a party","have a party · throw a party"],
["I win 1 million pesos per month.","I earn 1 million pesos per month.","earn = ganar (trabajando); win = ganar (un premio)"]
];
searchable("misSearch","misBody","misCount","misEmpty",MIS,r=>'<tr><td class="no">'+esc(r[0])+'</td><td class="ok">'+esc(r[1])+'</td><td class="mis-why">'+esc(r[2])+'</td></tr>',"mistakes");

/* ---------------- backup & move ---------------- */
/* the old "Back up & move" page (for people who weren't signed in) was removed in the Nov 22 2026 sweep: signing in is required and everything syncs */
window.__csListsReload=function(){ words=LS.get("ncs-words",[])||[]; cnotes=LS.get("ncs-classnotes",[])||[]; stars=LS.get("ncs-stars",[])||[];
  renderStars(); renderSheet(); renderWords(); renderCN(); fcShuffle(); renderFlash(); return true; };
if(location.hash==="#backup") setTimeout(()=>{ const h=document.querySelector('[data-go="notes"]'); if(h) h.click(); },0);

/* class notes: draft on Home, saved notes list sorted by date */
const freeNotes=document.getElementById("freeNotes"), freeSaved=document.getElementById("freeSaved"); let freeT;
let cnotes=LS.get("ncs-classnotes",[]), cnEditing=null;
const cnList=document.getElementById("cnList"), cnSearch=document.getElementById("cnSearch");
const fmtLong=t=>new Date(t).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
const fmtTime=t=>new Date(t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});
const fmtMonth=t=>new Date(t).toLocaleDateString("en-US",{month:"long",year:"numeric"});
document.getElementById("cnToday").textContent="Today · "+new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
freeNotes.value=LS.get("ncs-freenotes","");
freeNotes.addEventListener("input",()=>{ clearTimeout(freeT); freeT=setTimeout(()=>{ freeSaved.textContent= LS.set("ncs-freenotes",freeNotes.value)?"Draft saved as you type ✓":"This browser blocks storage, so notes won't be kept"; },500); });
document.getElementById("cnDraft").addEventListener("click",()=>{ clearTimeout(freeT); const ok=LS.set("ncs-freenotes",freeNotes.value); freeSaved.textContent=ok?"Draft saved ✓ "+new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"This browser blocks storage, so notes won't be kept"; toast(ok?"💾 Draft saved. It stays here until you move it to your notes.":"This browser blocks storage"); });
document.getElementById("cnSave").addEventListener("click",()=>{
  const text=freeNotes.value.trim();
  if(!text){ toast("Write something first"); freeNotes.focus(); return; }
  cnotes.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text,t:Date.now()});
  setTimeout(()=>{ if(window.csSuggestWords) window.csSuggestWords(text); },400);
  const ok=LS.set("ncs-classnotes",cnotes);
  freeNotes.value=""; LS.set("ncs-freenotes",""); freeSaved.textContent="Your draft is saved as you type";
  renderCN(); toast(ok?"📥 Moved to your class notes in My notebook":"Saved for now, but this browser blocks storage");
});
function renderCN(){
  const n=cnotes.length;
  document.getElementById("cnAllBtn").textContent= n? "All my class notes ("+n+") →" : "All my class notes →";
  document.getElementById("cnNavCount").textContent= n? n : "";
  document.getElementById("cnCount").textContent= n? "· "+n : "";
  const q=norm(cnSearch.value.trim());
  const list=cnotes.slice().sort((a,b)=>b.t-a.t).filter(x=>!q||norm(x.text).includes(q));
  if(!n){ cnList.innerHTML='<div class="card empty-notes"><b>No class notes yet.</b><br>Write your notes in the box above during class and press <b>Save draft</b> as often as you like. When the class is over, press <b>Move to my notes</b> and they\'ll show up here, sorted by date.</div>'; return; }
  if(!list.length){ cnList.innerHTML='<div class="card empty-notes">No notes match “'+esc(cnSearch.value)+'”.</div>'; return; }
  let html="", month="";
  list.forEach(x=>{
    const m=fmtMonth(x.t);
    if(m!==month){ html+='<h3 class="cn-month">'+m+'</h3>'; month=m; }
    if(x.id===cnEditing){
      html+='<form class="card cn-card" data-cnform="'+x.id+'"><div class="cn-head"><span class="cn-day">'+fmtLong(x.t)+'</span></div><label for="cnEdit" class="sr">Edit note</label><textarea id="cnEdit">'+esc(x.text)+'</textarea><div class="note-actions"><button class="pill-btn" type="submit">Save changes</button><button class="swap" type="button" data-cncancel>Cancel</button></div></form>';
    } else {
      html+='<article class="card cn-card"><div class="cn-head"><span class="cn-day">'+fmtLong(x.t)+'</span><span class="cn-time">'+fmtTime(x.t)+'</span><div class="wbtns"><button class="del edit" type="button" data-cnwords="'+x.id+'" title="Find new words and expressions in this note">✨ Find words</button><button class="del edit" type="button" data-cncopy="'+x.id+'">📋 Copy</button><button class="del edit" type="button" data-cnedit="'+x.id+'">✏️ Edit</button><button class="del cn-delb" type="button" data-cndel="'+x.id+'">🗑️ Delete</button></div></div><div class="cn-text">'+esc(x.text)+'</div></article>';
    }
  });
  cnList.innerHTML=html;
}
const noteToText=x=>fmtLong(x.t)+"\n"+x.text;
cnList.addEventListener("click",async e=>{
  const fw=e.target.closest("[data-cnwords]"); if(fw){ const x=cnotes.find(y=>y.id===fw.dataset.cnwords); const card=fw.closest(".cn-card"); if(!x||!card) return; let box=card.querySelector(".cn-sug"); if(!box){ box=document.createElement("div"); box.className="cn-sug"; box.setAttribute("aria-live","polite"); const hd=card.querySelector(".cn-head"); if(hd) hd.after(box); else card.appendChild(box); } if(window.csSuggestWords) window.csSuggestWords(x.text,box,true); return; }
  const c=e.target.closest("[data-cncopy]"); if(c){ const x=cnotes.find(y=>y.id===c.dataset.cncopy); if(x) toast(await copyText(noteToText(x))?"Note copied":"Your browser blocked copying"); return; }
  const ed=e.target.closest("[data-cnedit]"); if(ed){ cnEditing=ed.dataset.cnedit; renderCN(); const t=document.getElementById("cnEdit"); if(t) t.focus(); return; }
  if(e.target.closest("[data-cncancel]")){ cnEditing=null; renderCN(); return; }
  const d=e.target.closest("[data-cndel]"); if(!d) return;
  if(!d.classList.contains("confirm")){ d.classList.add("confirm"); d.textContent="Sure?"; setTimeout(()=>{ if(d.isConnected){ d.classList.remove("confirm"); d.textContent="Delete"; } },3000); return; }
  cnotes=cnotes.filter(x=>x.id!==d.dataset.cndel); LS.set("ncs-classnotes",cnotes); renderCN(); toast("Note deleted");
});
cnList.addEventListener("submit",e=>{
  const f=e.target.closest("[data-cnform]"); if(!f) return; e.preventDefault();
  const x=cnotes.find(y=>y.id===f.dataset.cnform); const v=document.getElementById("cnEdit").value.trim();
  if(!v){ document.getElementById("cnEdit").focus(); return; }
  if(x){ x.text=v; LS.set("ncs-classnotes",cnotes); } cnEditing=null; renderCN(); toast("Changes saved");
});
cnList.addEventListener("keydown",e=>{ if(e.key==="Escape"&&cnEditing){ cnEditing=null; renderCN(); } });
cnSearch.addEventListener("input",renderCN);
document.getElementById("cnCopyAll").addEventListener("click",async()=>{
  if(!cnotes.length){ toast("No notes to copy yet"); return; }
  const txt=cnotes.slice().sort((a,b)=>a.t-b.t).map(noteToText).join("\n\n");
  toast(await copyText(txt)? cnotes.length+(cnotes.length===1?" note":" notes")+" copied. Paste them into your Doc or notes app.":"Your browser blocked copying");
});
renderCN();
renderWords();

/* ---------------- theme ---------------- */
const themeBtn=document.getElementById("themeBtn");
const THEMES=["dark","light","sepia","midnight","unicorn"], TINFO={dark:["☾","Dark"],midnight:["🌑","Midnight"],light:["☀","Light"],sepia:["📖","Sepia"],unicorn:["🦄","Unicorn"]};
function paintThemeBtn(){
  const cur=THEMES.includes(document.documentElement.getAttribute("data-theme"))?document.documentElement.getAttribute("data-theme"):"dark";
  document.getElementById("themeIcon").textContent=TINFO[cur][0];
  document.getElementById("themeTxt").textContent=TINFO[cur][1];
  themeBtn.setAttribute("aria-label","Theme: "+TINFO[cur][1]+". Change theme");
  themeBtn.title="Change theme";
  themeBtn.setAttribute("aria-haspopup","menu");
  document.querySelectorAll("#themeMenu [data-th]").forEach(b=>b.setAttribute("aria-checked",String(b.dataset.th===cur)));
}
(function(){
  const m=document.createElement("div"); m.id="themeMenu"; m.className="theme-menu"; m.setAttribute("role","menu"); m.hidden=true;
  m.innerHTML=THEMES.map(t=>'<button type="button" role="menuitemradio" data-th="'+t+'" aria-checked="false"><span aria-hidden="true">'+TINFO[t][0]+'</span> '+TINFO[t][1]+'</button>').join("");
  document.body.appendChild(m);
  const close=()=>{ m.hidden=true; themeBtn.setAttribute("aria-expanded","false"); };
  themeBtn.addEventListener("click",e=>{
    e.stopPropagation();
    if(!m.hidden){ close(); return; }
    paintThemeBtn();
    const r=themeBtn.getBoundingClientRect(); m.style.top=(r.bottom+6)+"px"; m.style.left=Math.max(8,Math.min(window.innerWidth-200,r.left))+"px";
    m.hidden=false; themeBtn.setAttribute("aria-expanded","true");
    const on=m.querySelector('[aria-checked="true"]')||m.querySelector("button"); on.focus();
  });
  m.addEventListener("click",e=>{ const b=e.target.closest("[data-th]"); if(!b) return; window.csSetTheme(b.dataset.th); close(); themeBtn.focus(); });
  m.addEventListener("keydown",e=>{ const bs=[...m.querySelectorAll("button")], i=bs.indexOf(document.activeElement);
    if(e.key==="Escape"){ close(); themeBtn.focus(); } else if(e.key==="ArrowDown"){ e.preventDefault(); bs[(i+1)%bs.length].focus(); } else if(e.key==="ArrowUp"){ e.preventDefault(); bs[(i-1+bs.length)%bs.length].focus(); } });
  document.addEventListener("click",e=>{ if(!m.hidden&&!e.target.closest("#themeMenu")) close(); });
  window.addEventListener("resize",close);
})();
let chosenTheme="dark";
window.csSetTheme=t=>{ chosenTheme=t; try{localStorage.setItem("ncs-theme",t);}catch(e){} document.documentElement.setAttribute("data-theme",t); paintThemeBtn(); if(t==="unicorn") toast("🦄 Unicorn mode!"); };
try{chosenTheme=localStorage.getItem("ncs-theme")||"dark"; if(chosenTheme==="soft") chosenTheme="sepia";}catch(e){}
/* keep the student's pick even if the viewer sets its own theme on load */
new MutationObserver(()=>{
  if(document.documentElement.getAttribute("data-theme")!==chosenTheme) document.documentElement.setAttribute("data-theme",chosenTheme);
  paintThemeBtn();
}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
document.documentElement.setAttribute("data-theme",chosenTheme);
paintThemeBtn();

/* ---------------- navigation ---------------- */
const views=[...document.querySelectorAll(".view")];
const ids=views.map(v=>v.id.slice(2));
let curView=null, goingBack=false;
const backStack=[];
function renderBack(){
  const link=document.getElementById("backLink"), fabB=document.getElementById("backFab"), prev=backStack[backStack.length-1];
  link.hidden=!prev; fabB.hidden=!prev;
  const view=document.getElementById("v-"+curView); if(view && link.parentNode!==view) view.prepend(link);
  if(prev){
    const nb=document.querySelector('nav.side .navgroup:not(.starred) .navbtn[data-go="'+prev.id+'"]');
    const nbt=nb?(()=>{ const c=nb.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl,svg').forEach(x=>x.remove()); return c.textContent.trim(); })():"";
    const name= prev.id==="notes"?"Home":prev.id==="classnotes"?"My notebook":prev.id==="words"?"My notebook":prev.id==="changelog"?"What's new":(nbt||prev.id);
    const h1=document.querySelector("#v-"+prev.id+" h1"); const h1t=h1?(()=>{ const c=h1.cloneNode(true); c.querySelectorAll(".lvl,.badge,small,span[class*='lvl']").forEach(x=>x.remove()); return c.textContent.trim(); })():"";
    document.getElementById("backTxt").textContent=(name===prev.id&&h1t)?h1t:name;
    link.setAttribute("aria-label","Back to "+name);
    fabB.setAttribute("aria-label","Back to "+name); fabB.title="Back to "+name;
  }
}
function goBack(){
  if(history.state&&history.state.cs&&history.state.n>0){ history.back(); return; }
  const prev=backStack.pop(); if(!prev) return;
  goingBack=true; go(prev.id,true); goingBack=false;
  setTimeout(()=>window.scrollTo({top:prev.y}),20);
}
let histN=0, fromPop=false;
window.addEventListener("popstate",e=>{
  const st=e.state||{}, id=st.v||location.hash.slice(1)||"notes";
  histN=st.n|0;
  if(id===curView){ if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true,st.m); return; }
  const top=backStack[backStack.length-1];
  fromPop=true; goingBack=true;
  if(top&&top.id===id){ backStack.pop(); go(id); setTimeout(()=>window.scrollTo({top:top.y}),20); } else go(id);
  goingBack=false; fromPop=false;
  if(id==="quiz"&&window.__prShow) window.__prShow(st.pp||null,true,st.m);
  { const hp=location.hash.slice(1).split("/"); if(id!=="quiz"&&hp.length>1&&window.__csDeep&&window.__csDeep[id]) window.__csDeep[id].open(hp.slice(1)); }
  renderBack();
});
function go(id,push){
  if(!ids.includes(id)) id="tenses";
  if(curView && curView!==id && curView!=="feedback") window.__lastView=curView;
  if(curView && curView!==id && !goingBack){ backStack.push({id:curView,y:window.scrollY||0}); if(backStack.length>30) backStack.shift(); }
  if(curView!==id&&window.csUse) window.csUse("p:"+id);
  curView=id;
  renderBack();
  views.forEach(v=>v.hidden = v.id!=="v-"+id);
  const fb=document.getElementById("fab"); if(fb) fb.hidden = id==="notes"||id==="words";
  const cnB=document.getElementById("cnEditorBlock"), awB=document.getElementById("addWordBlock");
  if(cnB){ const to=document.getElementById(id==="classnotes"?"slotCnPage":"slotCnHome"); if(cnB.parentNode!==to) to.appendChild(cnB); }
  if(awB){ const to=document.getElementById(id==="words"?"slotAwPage":"slotAwHome"); if(awB.parentNode!==to) to.appendChild(awB); }
  document.querySelectorAll(".navbtn").forEach(b=>b.setAttribute("aria-current", ((b.dataset.go===id&&!b.classList.contains("nb-merged"))||((id==="notebook"||id==="classnotes")&&b.dataset.go==="words")||(id==="members"&&b.dataset.go==="students"))?"true":"false"));
  const cur=document.querySelector('.navbtn[aria-current="true"]'); if(cur&&cur.scrollIntoView&&window.innerWidth<=900) cur.scrollIntoView({block:"nearest",inline:"center"});
  try{localStorage.setItem("eep-view",id);}catch(e){}
  if(push&&!fromPop){ const U=id==="notes"?location.pathname+location.search:(window.__csDeep&&window.__csDeep[id]?window.__csDeep[id].hash():"#"+id); try{ if(history.state&&history.state.cs&&history.state.v===id) history.replaceState(history.state,"",U); else if(goingBack) history.replaceState({cs:1,v:id,n:histN},"",U); else history.pushState({cs:1,v:id,n:++histN},"",U);}catch(e){} }
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]"); if(!b)return; e.preventDefault(); go(b.dataset.go,true); if(b.closest("nav.side,header.top")){ backStack.length=0; renderBack(); } window.scrollTo({top:0}); if(b.dataset.go==="translate") setTimeout(()=>trIn.focus(),50);});
window.addEventListener("hashchange",()=>{ const hp=location.hash.slice(1).split("/"), h=hp[0]; if(h&&h!==curView&&ids.includes(h)) go(h); const D=window.__csDeep&&window.__csDeep[h]; if(hp.length>1&&D&&D.hash()!==location.hash) D.open(hp.slice(1)); });
window.__csSyncUrl=id=>{ try{ if(curView!==id) return; const D=window.__csDeep&&window.__csDeep[id]; if(!D) return; const h=D.hash(); if(location.hash!==h) history.replaceState(history.state,"",h); }catch(e){} };
document.getElementById("backLink").addEventListener("click",goBack);
document.getElementById("backFab").addEventListener("click",goBack);
const deepStart=location.hash.slice(1).split("/").slice(1);
let start=location.hash.slice(1).split("/")[0];
if(!ids.includes(start)){ try{ start=localStorage.getItem("eep-view")||"notes"; }catch(e){ start="notes"; } }
go(start);
try{ history.replaceState({cs:1,v:curView,n:0},"",curView==="notes"?location.pathname+location.search:"#"+curView); }catch(e){}
if(deepStart.length){ window.__csDeepStart={id:curView,parts:deepStart}; if(window.__csDeep&&window.__csDeep[curView]) window.__csDeep[curView].open(deepStart); }

/* ---------------- starred sections ---------------- */
let stars=LS.get("ncs-stars",[]);
const navLabel=id=>{ const b=document.querySelector('nav.side .navgroup:not(.starred) .navbtn[data-go="'+id+'"]'); if(!b) return id; const c=b.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl').forEach(x=>x.remove()); return c.textContent.trim(); };
document.querySelectorAll(".view").forEach(v=>{
  const id=v.id.slice(2); if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","park","coaching","club","students","members"].includes(id)) return;
  const h=v.querySelector("h1"); if(!h) return;
  const wrap=document.createElement("div"); wrap.className="vhead";
  h.parentNode.insertBefore(wrap,h); wrap.appendChild(h);
  const b=document.createElement("button"); b.type="button"; b.className="star-btn"; b.dataset.star=id;
  wrap.appendChild(b);
});
function renderStars(){
  stars=stars.filter(id=>document.getElementById("v-"+id)&&!["quiz","park","coaching","club","students","members"].includes(id));
  document.querySelectorAll("[data-star]").forEach(b=>{
    const on=stars.includes(b.dataset.star);
    b.setAttribute("aria-pressed",on?"true":"false");
    b.innerHTML='<span aria-hidden="true">'+(on?"★":"☆")+'</span><span class="star-txt">'+(on?"Starred":"Star")+'</span>';
    b.setAttribute("aria-label",(on?"Remove ":"Add ")+navLabel(b.dataset.star)+(on?" from":" to")+" your starred sections");
    b.title=on?"Starred: this page is in the ★ Starred list in the left menu. Click to remove it.":"Star this page to add it to the ★ Starred list in the left menu, so it's one click away.";
  });
  document.getElementById("starGroup").hidden=!stars.length;
  document.getElementById("starList").innerHTML=stars.map(id=>'<button class="navbtn star-nav" data-go="'+id+'"><span aria-hidden="true">★</span> '+esc(navLabel(id))+'</button>').join("");
  const cur=views.find(v=>!v.hidden); const cid=cur?cur.id.slice(2):"";
  document.querySelectorAll(".navbtn").forEach(b=>b.setAttribute("aria-current", b.dataset.go===cid?"true":"false"));
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-star]"); if(!b) return;
  const id=b.dataset.star;
  if(stars.includes(id)){ stars=stars.filter(x=>x!==id); toast("Removed from Starred"); }
  else { stars.push(id); toast("Added to Starred in the menu"); }
  LS.set("ncs-stars",stars); renderStars();
});
renderStars();
(function(){
  const h=location.hash||"";
  if(!h.startsWith("#import=")) return;
  let code=h.slice(8);
  for(let i=0;i<3 && /%[0-9A-Fa-f]{2}/.test(code);i++){ try{ code=decodeURIComponent(code); }catch(e){ break; } }
  code=code.replace(/ /g,"+");   // some apps turn + into spaces
  try{ history.replaceState(null,"",location.pathname); }catch(e){}
  try{ localStorage.removeItem("ncs-sync-uid"); }catch(e){}   // next sign-in merges instead of overwriting
  const inp=document.getElementById("bkIn"); inp.value=code;
  document.getElementById("bkRestore").click();
  const msg=document.getElementById("bkMsg").textContent;
  go("notes");
  setTimeout(()=>toast(msg.indexOf("Restored")>-1 ? "Your notes moved here! Sign in (top right) to save them in the cloud." : "Couldn't move your notes. Try the Back up & move page."),300);
})();

/* ---------------- study music (generated live with Web Audio) ---------------- */
(function(){
  const btn=document.getElementById("musicBtn"), panel=document.getElementById("musicPanel"), playB=document.getElementById("musicPlay"), vol=document.getElementById("musicVol");
  let mode=LS.get("ncs-music-mode","lofi"), volume=LS.get("ncs-music-vol",45), balance=LS.get("ncs-music-bal",40);
  vol.value=volume;
  const bal=document.getElementById("musicBal"), balRow=document.getElementById("balRow"); bal.value=balance;
  let pinkGain=null, whiteGain=null, brownGain=null, pianoBus=null, pianoBar=0, oceanGain=null;
  let ac=null, master=null, tone=null, musicBus=null, rainGain=null, crackleGain=null, delay=null, noiseBuf=null, crackBuf=null, rainSrc=null, crackSrc=null, timer=null, playing=false;
  let step=0, nextTime=0, bar=0;
  const BPM=76, S16=60/BPM/4;
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  const PROG=[
    {r:41,n:[53,57,60,64,67]},{r:40,n:[52,55,59,62,67]},{r:38,n:[50,53,57,60,64]},{r:36,n:[48,52,55,59,62]},
    {r:41,n:[53,57,60,64,69]},{r:40,n:[52,55,59,62,64]},{r:45,n:[57,60,64,67,71]},{r:43,n:[53,59,62,65,69]}
  ];
  const MEL=[72,74,76,79,81,84];
  function setup(){
    const C=window.AudioContext||window.webkitAudioContext; if(!C) return false;
    ac=new C();
    master=ac.createGain(); master.gain.value=0;
    tone=ac.createBiquadFilter(); tone.type="lowpass"; tone.frequency.value=4200; tone.Q.value=0.3;
    master.connect(tone).connect(ac.destination);
    musicBus=ac.createGain(); musicBus.connect(master);
    delay=ac.createDelay(1); delay.delayTime.value=S16*3; const fb=ac.createGain(); fb.gain.value=0.32; const dl=ac.createBiquadFilter(); dl.type="lowpass"; dl.frequency.value=1800;
    delay.connect(dl).connect(fb).connect(delay); dl.connect(musicBus);
    const len=ac.sampleRate*2;
    noiseBuf=ac.createBuffer(1,len,ac.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    crackBuf=ac.createBuffer(1,len*2,ac.sampleRate); const c=crackBuf.getChannelData(0); for(let i=0;i<c.length;i++){ c[i]=(Math.random()*2-1)*0.012 + (Math.random()<0.0004?(Math.random()*2-1)*0.6:0); }
    crackleGain=ac.createGain(); crackleGain.gain.value=0.5; crackleGain.connect(musicBus);
    crackSrc=ac.createBufferSource(); crackSrc.buffer=crackBuf; crackSrc.loop=true; const ch=ac.createBiquadFilter(); ch.type="bandpass"; ch.frequency.value=2500; ch.Q.value=0.4; crackSrc.connect(ch).connect(crackleGain); crackSrc.start();
    // rain: soft pink-noise wash + thousands of tiny droplets (stereo), with a slow natural swell
    rainGain=ac.createGain(); rainGain.gain.value=0; rainGain.connect(master);
    rainSrc=ac.createBufferSource(); rainSrc.buffer=makeRain(); rainSrc.loop=true;
    const hp=ac.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=220; hp.Q.value=0.5;
    const lp=ac.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=7800; lp.Q.value=0.4;
    const swell=ac.createGain(); swell.gain.value=0.85;
    const lfo=ac.createOscillator(), lfoAmt=ac.createGain(); lfo.frequency.value=0.06; lfoAmt.gain.value=0.15; lfo.connect(lfoAmt).connect(swell.gain); lfo.start();
    rainSrc.connect(hp).connect(lp).connect(swell).connect(rainGain); rainSrc.start();
    // brown noise: deep, steady, no clicks
    brownGain=ac.createGain(); brownGain.gain.value=0; brownGain.connect(master);
    const bs=ac.createBufferSource(); bs.buffer=makeBrown(); bs.loop=true;
    const bhp=ac.createBiquadFilter(); bhp.type="highpass"; bhp.frequency.value=28;
    const blp=ac.createBiquadFilter(); blp.type="lowpass"; blp.frequency.value=900; blp.Q.value=0.3;
    bs.connect(bhp).connect(blp).connect(brownGain); bs.start();
    // pink & white noise
    pinkGain=ac.createGain(); pinkGain.gain.value=0; pinkGain.connect(master);
    const ps=ac.createBufferSource(); ps.buffer=makePink(); ps.loop=true; ps.connect(pinkGain); ps.start();
    whiteGain=ac.createGain(); whiteGain.gain.value=0; whiteGain.connect(master);
    const ws=ac.createBufferSource(); ws.buffer=makeWhite(); ws.loop=true;
    const wlp=ac.createBiquadFilter(); wlp.type="lowpass"; wlp.frequency.value=9000;
    ws.connect(wlp).connect(whiteGain); ws.start();
    // ocean waves: deep surf that swells and breaks (slow, uneven), with a little foam hiss on each crest
    oceanGain=ac.createGain(); oceanGain.gain.value=0; oceanGain.connect(master);
    const os=ac.createBufferSource(); os.buffer=makeBrown(); os.loop=true;
    const olp=ac.createBiquadFilter(); olp.type="lowpass"; olp.frequency.value=650; olp.Q.value=0.2;
    const owave=ac.createGain(); owave.gain.value=0.46;
    const ol1=ac.createOscillator(), oa1=ac.createGain(); ol1.frequency.value=0.085; oa1.gain.value=0.32; ol1.connect(oa1).connect(owave.gain); ol1.start();
    const ol2=ac.createOscillator(), oa2=ac.createGain(); ol2.frequency.value=0.031; oa2.gain.value=0.12; ol2.connect(oa2).connect(owave.gain); ol2.start();
    const ofq=ac.createGain(); ofq.gain.value=480; ol1.connect(ofq).connect(olp.frequency);
    os.connect(olp).connect(owave).connect(oceanGain); os.start();
    const fs=ac.createBufferSource(); fs.buffer=makePink(); fs.loop=true; const fbp=ac.createBiquadFilter(); fbp.type="bandpass"; fbp.frequency.value=2600; fbp.Q.value=0.5;
    const fg=ac.createGain(); fg.gain.value=0.07; const fa=ac.createGain(); fa.gain.value=0.07; ol1.connect(fa).connect(fg.gain);
    fs.connect(fbp).connect(fg).connect(oceanGain); fs.start();
    // calm piano: soft piano tones through a gentle room reverb
    pianoBus=ac.createGain(); pianoBus.gain.value=0; pianoBus.connect(master);
    const verb=ac.createConvolver(); verb.buffer=makeImpulse(3.2); const wet=ac.createGain(); wet.gain.value=0.55;
    pianoBus.connect(verb); verb.connect(wet).connect(master);
    return true;
  }
  // fills d with a generator so the end blends into the start (no click when it loops)
  function loopFill(d,len,gen){
    const F=Math.floor(ac.sampleRate*0.5), tmp=new Float32Array(len+F);
    for(let i=0;i<len+F;i++) tmp[i]=gen();
    for(let i=0;i<len;i++) d[i]= i<F ? tmp[i]*(i/F)+tmp[len+i]*(1-i/F) : tmp[i];
  }
  function makePink(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0; loopFill(buf.getChannelData(ch),len,()=>{ const w=Math.random()*2-1;
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856; b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
      const o=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926; return o; }); }
    return buf;
  }
  function makeWhite(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ loopFill(buf.getChannelData(ch),len,()=>(Math.random()*2-1)*0.5); }
    return buf;
  }
  function makeBrown(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ let last=0; loopFill(buf.getChannelData(ch),len,()=>{ const w=Math.random()*2-1; last=(last+0.02*w)/1.02; return last*3.4; }); }
    return buf;
  }
  function makeImpulse(sec){
    const sr=ac.sampleRate, len=Math.floor(sr*sec), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ const d=buf.getChannelData(ch); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2); }
    return buf;
  }
  function makeRain(){
    const sr=ac.sampleRate, len=Math.floor(sr*14), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){
      const d=buf.getChannelData(ch);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      loopFill(d,len,()=>{ const w=Math.random()*2-1; b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.969*b2+w*0.153852; b3=0.8665*b3+w*0.3104856; b4=0.55*b4+w*0.5329522; b5=-0.7616*b5-w*0.016898; const v=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.04; b6=w*0.115926; return v; });
      const drops=Math.floor(14*380);
      for(let k=0;k<drops;k++){
        const start=Math.floor(Math.random()*len), heavy=Math.random()<0.05;
        const amp=(heavy?0.22:0.09)*Math.pow(Math.random(),1.6)+0.004;
        const f=heavy? 700+Math.random()*1600 : 2200+Math.random()*6000;
        const dec=(heavy? 0.008+Math.random()*0.018 : 0.0012+Math.random()*0.0035)*sr;
        const n=Math.floor(dec*5), w=2*Math.PI*f/sr; let ph=Math.random()*6.283;
        for(let j=0;j<n;j++){ const e=Math.exp(-j/dec); d[(start+j)%len]+=(Math.sin(ph)*0.55+(Math.random()*2-1)*0.45)*amp*e; ph+=w*(heavy?(1+0.6*j/n):1); }
      }
    }
    return buf;
  }
  function noiseHit(t,{freq,type,q,dur,gain}){
    const src=ac.createBufferSource(); src.buffer=noiseBuf; src.playbackRate.value=0.9+Math.random()*0.2;
    const f=ac.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q||0.7;
    const g=ac.createGain(); g.gain.setValueAtTime(gain,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    src.connect(f).connect(g).connect(musicBus); src.start(t, Math.random()*1.5); src.stop(t+dur+0.05);
  }
  function kick(t){ const o=ac.createOscillator(), g=ac.createGain(); o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(42,t+0.16); g.gain.setValueAtTime(0.9,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.42); o.connect(g).connect(musicBus); o.start(t); o.stop(t+0.45); }
  function snare(t){ noiseHit(t,{freq:1700,type:"bandpass",q:0.8,dur:0.22,gain:0.32}); const o=ac.createOscillator(), g=ac.createGain(); o.frequency.value=185; g.gain.setValueAtTime(0.18,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.12); o.connect(g).connect(musicBus); o.start(t); o.stop(t+0.14); }
  function hat(t,v){ noiseHit(t,{freq:7500,type:"highpass",q:0.5,dur:0.05,gain:0.07*v}); }
  function keyNote(m,t,dur,v){
    const g=ac.createGain(), f=ac.createBiquadFilter(); f.type="lowpass"; f.frequency.value=1500; f.Q.value=0.4;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v,t+0.03); g.gain.exponentialRampToValueAtTime(v*0.35,t+0.9); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    [["sine",0,1],["triangle",-6,0.35]].forEach(([ty,det,lv])=>{ const o=ac.createOscillator(), og=ac.createGain(); o.type=ty; o.frequency.value=mtof(m); o.detune.value=det+(Math.random()*6-3); og.gain.value=lv; o.connect(og).connect(f); o.start(t); o.stop(t+dur+0.05); });
    f.connect(g).connect(musicBus);
  }
  function pianoNote(m,t,v,dur){
    const out=ac.createGain(), f=ac.createBiquadFilter(); f.type="lowpass"; f.Q.value=0.2;
    f.frequency.setValueAtTime(3200,t); f.frequency.exponentialRampToValueAtTime(700,t+1.4);
    out.gain.setValueAtTime(0.0001,t); out.gain.linearRampToValueAtTime(v,t+0.006); out.gain.exponentialRampToValueAtTime(v*0.4,t+0.5); out.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    [["sine",1,1],["sine",2,0.28],["triangle",1,0.18],["sine",3,0.06]].forEach(([ty,mul,lv])=>{ const o=ac.createOscillator(), g=ac.createGain(); o.type=ty; o.frequency.value=mtof(m)*mul; o.detune.value=Math.random()*4-2; g.gain.value=lv; o.connect(g).connect(f); o.start(t); o.stop(t+dur+0.1); });
    f.connect(out).connect(pianoBus);
  }
  const PIANO=[
    {r:41,n:[53,60,64,67,69]},{r:43,n:[55,59,62,65,67]},{r:45,n:[57,60,64,67,71]},{r:40,n:[52,59,62,67]},
    {r:38,n:[50,57,60,64,65]},{r:43,n:[55,59,62,65,69]},{r:36,n:[48,55,59,62,64]},{r:36,n:[48,55,60,64,67]}
  ];
  function bass(m,t,dur){ const o=ac.createOscillator(), g=ac.createGain(); o.type="sine"; o.frequency.value=mtof(m); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.42,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.connect(g).connect(musicBus); o.start(t); o.stop(t+dur+0.05); }
  function mel(m,t){ const o=ac.createOscillator(), g=ac.createGain(); o.type="triangle"; o.frequency.value=mtof(m); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.07,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.7); o.connect(g); g.connect(musicBus); g.connect(delay); o.start(t); o.stop(t+0.75); }
  function schedule(t){
    const s=step%16, ch=PROG[bar%PROG.length];
    const swing=(s%2===1)? S16*0.3 : 0, tt=t+swing;
    if(mode==="piano"||mode==="pianorain"){
      const pc=PIANO[pianoBar%PIANO.length];
      if(s===0){ pianoNote(pc.r,t,0.13,6); pianoNote(pc.r+12,t+0.02,0.07,5.5); }
      const arp={2:0,5:1,8:2,11:3,14:4};
      if(arp[s]!==undefined && pc.n[arp[s]]!==undefined && Math.random()<0.85) pianoNote(pc.n[arp[s]],tt+Math.random()*0.03,0.06+Math.random()*0.03,4.5);
      if((s===4||s===12) && Math.random()<0.3) pianoNote(MEL[Math.floor(Math.random()*5)],tt+0.05,0.05,3.5);
      if(s===15) pianoBar++;
    }
    if(mode==="lofi"||mode==="both"){
      if(s===0){ ch.n.forEach((m,i)=>keyNote(m,t+i*0.018,S16*15,0.055)); bass(ch.r,t,S16*6); }
      if(s===6 || s===10) bass(ch.r+(s===10?7:0),tt,S16*3);
      if(s===0 || s===7 || s===10) kick(tt);
      if(s===4 || s===12) snare(tt);
      if(s%2===0) hat(tt, s%4===0?1:0.6); else if(Math.random()<0.25) hat(tt,0.35);
      if(s%2===0 && Math.random()<0.16) mel(MEL[Math.floor(Math.random()*MEL.length)],tt);
    }
    step++; if(step%16===0) bar++;
  }
  function tick(){
    const ahead=document.hidden?2.5:0.25;
    while(nextTime < ac.currentTime+ahead){ schedule(nextTime); nextTime+=S16; }
  }
  function applyMix(){
    if(!ac) return;
    const t=ac.currentTime, v=(volume/100);
    master.gain.setTargetAtTime(playing? v*v*0.9 : 0, t, 0.15);
    const b=balance/100;
    const mix2= mode==="both"||mode==="pianorain";
    const mus= mode==="lofi"?1 : mode==="both"? Math.cos(b*Math.PI/2)*1.15 : 0;
    const rn= mode==="rain"?0.75 : mix2? Math.sin(b*Math.PI/2)*0.75 : 0;
    musicBus.gain.setTargetAtTime(mus, t, 0.2);
    rainGain.gain.setTargetAtTime(rn, t, 0.3);
    brownGain.gain.setTargetAtTime(mode==="brown"?0.9:0, t, 0.3);
    pinkGain.gain.setTargetAtTime(mode==="pink"?0.8:0, t, 0.3);
    whiteGain.gain.setTargetAtTime(mode==="white"?0.32:0, t, 0.3);
    if(oceanGain) oceanGain.gain.setTargetAtTime(mode==="ocean"?1.1:0, t, 0.4);
    pianoBus.gain.setTargetAtTime(mode==="piano"?1 : mode==="pianorain"? Math.cos(b*Math.PI/2)*1.1 : 0, t, 0.3);
  }
  function paint(){
    playB.setAttribute("aria-pressed",playing?"true":"false");
    document.getElementById("mpIco").textContent= playing?"❚❚":"▶";
    document.getElementById("mpTxt").textContent= playing?"Pause":"Play";
    btn.classList.toggle("on",playing);
    balRow.hidden= !(mode==="both"||mode==="pianorain");
    const MDESC={lofi:"<b>Lo-fi beats</b>: relaxed hip-hop beats with soft keys. A classic for studying.",
      both:"<b>Lo-fi + rain</b>: lo-fi beats with rain in the background. Use <b>Mix</b> to choose how much of each.",
      piano:"<b>Calm piano</b>: slow, gentle piano chords. Good when you need to focus or relax.",
      pianorain:"<b>Piano + rain</b>: calm piano with soft rain. Use <b>Mix</b> to choose how much of each.",
      rain:"<b>Just rain</b>: steady rain, no music. Nice for reading.",
      ocean:"<b>Ocean waves</b>: slow waves rolling onto the beach. Calm and steady, like a day at the coast.",
      brown:"<b>Brown noise</b>: a deep, steady sound that blocks out distractions.",
      pink:"<b>Pink noise</b>: softer than white noise, like steady rain or wind. Many people find it calming.",
      white:"<b>White noise</b>: a bright, even hiss, like a fan. Good for covering voices and sudden sounds."};
    document.getElementById("mnDesc").innerHTML= MDESC[mode]||"";
    document.getElementById("mnLofi").hidden= !(mode==="lofi"||mode==="both");
    document.querySelectorAll("[data-mm]").forEach(b=>{ const on=b.dataset.mm===mode; b.setAttribute("aria-checked",on); b.setAttribute("aria-pressed",on); });
  }
  async function play(){
    btn.classList.add("used"); try{ sessionStorage.setItem("cs-music-used","1"); }catch(e){}
    if(window.csUnlockAudio) window.csUnlockAudio(true);
    if(!ac && !setup()){ toast("Your browser can't play generated music"); return; }
    try{ await ac.resume(); }catch(e){}
    playing=true; nextTime=ac.currentTime+0.1; step=0; if(RESUME){ step=RESUME.step; bar=RESUME.bar; RESUME=null; }
    clearInterval(timer); timer=setInterval(tick,25); tick(); applyMix(); paint();
  }
  function pause(){ if(window.csReleaseAudio) window.csReleaseAudio(); playing=false; applyMix(); paint(); setTimeout(()=>{ if(!playing){ clearInterval(timer); timer=null; try{ ac.suspend(); }catch(e){} } },600); }
  playB.addEventListener("click",()=> playing?pause():play());
  try{ if(sessionStorage.getItem("cs-music-used")) btn.classList.add("used"); }catch(e){}
  btn.title="Study music";
  /* keep the music going between Hibi pages: remember it was on, start again on the next page
     (browsers only allow sound after a tap, so if it can't start by itself the first tap anywhere starts it) */
  let RESUME=null;
  window.addEventListener("pagehide",()=>{ try{ if(playing) localStorage.setItem("cs-music-on",JSON.stringify({t:Date.now(),step,bar})); else localStorage.removeItem("cs-music-on"); }catch(e){} });
  (function(){ if(/[?&]np=1/.test(location.search)) return; let t=0; try{ const v=JSON.parse(localStorage.getItem("cs-music-on")||"null"); localStorage.removeItem("cs-music-on"); if(v&&typeof v==="object"){ t=v.t; RESUME={step:v.step|0,bar:v.bar|0}; } else t=+v||0; }catch(e){} if(!t||Date.now()-t>180000){ RESUME=null; return; }
    const go=()=>{ ["pointerdown","keydown","touchstart"].forEach(ev=>window.removeEventListener(ev,go,true)); btn.classList.remove("mu-wait"); btn.removeAttribute("data-wait"); if(!(ac&&ac.state==="running")) play(); };
    setTimeout(()=>{ play().then(()=>{ if(ac&&ac.state==="running") return; btn.classList.add("mu-wait"); btn.setAttribute("data-wait","Tap anywhere to keep the music going"); ["pointerdown","keydown","touchstart"].forEach(ev=>window.addEventListener(ev,go,true)); }); },300); })();
  document.getElementById("musicModes").addEventListener("click",e=>{ const b=e.target.closest("[data-mm]"); if(!b) return; mode=b.dataset.mm; LS.set("ncs-music-mode",mode); applyMix(); paint(); if(!playing) play(); });
  vol.addEventListener("input",()=>{ volume=+vol.value; LS.set("ncs-music-vol",volume); applyMix(); });
  bal.addEventListener("input",()=>{ balance=+bal.value; bal.setAttribute("aria-valuetext",balance+"% rain"); LS.set("ncs-music-bal",balance); applyMix(); });
  function openP(o){ panel.hidden=!o; btn.setAttribute("aria-expanded",o?"true":"false"); if(o) setTimeout(()=>playB.focus(),20); }
  btn.addEventListener("click",()=>openP(panel.hidden));
  document.getElementById("musicClose").addEventListener("click",()=>{ openP(false); btn.focus(); });
  panel.addEventListener("keydown",e=>{ if(e.key==="Escape"){ openP(false); btn.focus(); } });
  document.addEventListener("click",e=>{ if(!panel.hidden && e.target.isConnected && !e.target.closest(".music-wrap")) openP(false); });
  paint();
})();

/* ---------------- feedback ---------------- */
const FB_MAIL="learnwithnoa@gmail.com";
const fbSection=document.getElementById("fbSection"), fbMsg=document.getElementById("fbMsg"), fbName=document.getElementById("fbName"), fbGmail=document.getElementById("fbGmail"), fbErr=document.getElementById("fbErr");
let fbType="Something's missing";
/* sections students can pick: never Noa's admin pages, and Class notes is a tab of My notebook now (Nov 22 2026 sweep) */
const fbSkip=["feedback","students","members","classnotes","backup"], fbSeen=new Set();
const fbOpts=[["General","General / the whole page"]].concat([...document.querySelectorAll("nav.side .navbtn")].filter(b=>!b.closest(".starred") && b.dataset.go && !fbSkip.includes(b.dataset.go) && !b.classList.contains("t-tab") && !b.classList.contains("t-mnav")).map(b=>{ const c=b.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl,svg').forEach(x=>x.remove()); return [b.dataset.go, b.dataset.go==="notes"?"Home":c.textContent.replace(/\d+$/,"").trim()]; })).filter(o=>!fbSeen.has(o[0])&&fbSeen.add(o[0]));
{ const qi=fbOpts.findIndex(o=>o[0]==="quiz"); fbOpts.splice(qi<0?fbOpts.length:qi+1,0,["quiz/specific-purposes","Practice: English for Specific Purposes"]); }
fbSection.innerHTML=fbOpts.map(o=>'<option value="'+o[0]+'">'+esc(o[1])+'</option>').join("");
const fbDraft=LS.get("ncs-feedback",{});
if(fbDraft.msg) fbMsg.value=fbDraft.msg; if(fbDraft.name) fbName.value=fbDraft.name;
function fbText(){
  const sec=fbOpts.find(o=>o[0]===fbSection.value);
  return "Cheat Sheet feedback\nType: "+fbType+"\nSection: "+(sec?sec[1]:"General")+(fbName.value.trim()?"\nFrom: "+fbName.value.trim():"")+"\n\n"+fbMsg.value.trim();
}
function fbUpdate(){
  const t=fbText(), subj="Cheat Sheet feedback: "+fbType;
  fbGmail.href="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(FB_MAIL)+"&su="+encodeURIComponent(subj)+"&body="+encodeURIComponent(t);
  LS.set("ncs-feedback",{msg:fbMsg.value,name:fbName.value});
  if(fbMsg.value.trim()) fbErr.hidden=true;
}
document.getElementById("fbTypes").addEventListener("click",e=>{
  const b=e.target.closest("[data-fbtype]"); if(!b) return;
  fbType=b.dataset.fbtype;
  document.querySelectorAll("[data-fbtype]").forEach(x=>{ const on=x===b; x.setAttribute("aria-checked",on); x.setAttribute("aria-pressed",on); });
  fbUpdate();
});
[fbMsg,fbName].forEach(el=>el.addEventListener("input",fbUpdate)); fbSection.addEventListener("change",fbUpdate);
document.getElementById("fbForm").addEventListener("submit",e=>e.preventDefault());
[fbGmail].forEach(a=>a.addEventListener("click",e=>{
  if(!fbMsg.value.trim()){ e.preventDefault(); fbErr.hidden=false; fbMsg.focus(); return; }
  toast("Opened in a new tab. Press send there. Thank you!");
}));
document.getElementById("fbCopy").addEventListener("click",async()=>{
  if(!fbMsg.value.trim()){ fbErr.hidden=false; fbMsg.focus(); return; }
  toast(await copyText(fbText())?"Message copied. Paste it in an email to "+FB_MAIL:"Your browser blocked copying");
});
document.getElementById("fbCopyEmail").addEventListener("click",async()=>toast(await copyText(FB_MAIL)?"Email address copied":"Your browser blocked copying"));
// preselect the section they came from
document.addEventListener("click",e=>{
  const b=e.target.closest('[data-go="feedback"]'); if(!b) return;
  const prev=backStack.length?backStack[backStack.length-1].id:null;
  const from=(curView!=="feedback"?curView:null)||prev||window.__lastView;
  if(from && fbOpts.some(o=>o[0]===from)) { fbSection.value=from; fbUpdate(); }
},true);
fbUpdate();

/* ---------------- dismissible tips ---------------- */
let hiddenTips=LS.get("ncs-hidden-tips",[]);
const tipEls=[];
views.forEach(v=>{
  const vid=v.id.slice(2);
  v.querySelectorAll(".dismissible").forEach((el,i)=>{
    const src=el.textContent.replace(/\s+/g," ").trim().slice(0,60); let h=0; for(const ch of src) h=(h*31+ch.charCodeAt(0))|0;
    const key=vid+":"+(h>>>0).toString(36); el.dataset.tip=key; tipEls.push(el);
    const x=document.createElement("button"); x.type="button"; x.className="tip-x"; x.dataset.tipx=key; x.setAttribute("aria-label","Hide this tip"); x.textContent="×";
    el.prepend(x);
  });
});
function renderTips(){ tipEls.forEach(el=>{ el.hidden=hiddenTips.includes(el.dataset.tip); }); }
document.addEventListener("click",e=>{
  const x=e.target.closest("[data-tipx]"); if(!x) return;
  hiddenTips.push(x.dataset.tipx); LS.set("ncs-hidden-tips",hiddenTips); renderTips();
  toast("Tip hidden. Bring it back at the bottom of the page.");
});
document.getElementById("restoreTips").addEventListener("click",()=>{
  hiddenTips=[]; LS.set("ncs-hidden-tips",[]); try{localStorage.removeItem("ncs-nudge-snooze");}catch(e){}
  renderTips(); renderNudge(); toast("All tips are back");
});
renderTips();
document.getElementById("nudgeX").addEventListener("click",()=>{
  const st=nudgeState(); LS.set("ncs-nudge-snooze",{n:st?st.n:0,t:Date.now()}); renderNudge();
  toast("Reminder hidden. It comes back when you add 5 more words or in 3 days.");
});

/* ---------------- global search ---------------- */
const gIn=document.getElementById("gSearch"), gRes=document.getElementById("gResults"), sWrap=document.getElementById("searchWrap"), sTog=document.getElementById("searchToggle");
const INDEX=[];
(function buildIndex(){
  views.forEach(v=>{
    const id=v.id.slice(2); if(id==="notes"||id==="classnotes"||id==="feedback"||id==="words"||id==="changelog") return;
    const label=navLabel(id);
    INDEX.push({id,label,text:label,kind:0,el:null});
    v.querySelectorAll("h1,h2,h3,li,tr,p,.formula,.note").forEach(el=>{
      if(el.closest("#tenseBoard,.preview-banner,.vhead .star-btn")) return;
      if(el.matches("p") && el.closest("li,td,.note")) return;
      if(el.closest("thead")) return;
      const t=(el.matches("tr") ? [...el.cells].filter(c=>!c.querySelector("button")).map(c=>c.textContent.trim()).filter(Boolean).join(" · ") : el.textContent).replace(/\s+/g," ").trim();
      if(t.length<2 || t.length>260) return;
      const tb=el.closest("tbody");
      INDEX.push({id,label,text:t,kind:el.matches("h1,h2,h3")?1:2,el,table:tb?tb.id||(tb.closest("table")||{}).id||"":""});
    });
  });
})();
let gHits=[], gSel=-1;
function hl(text,q){
  const n=norm(text); const i=n.indexOf(q);
  let start=0, snippet=text;
  if(text.length>110){ start=Math.max(0,i-40); snippet=(start?"…":"")+text.slice(start,start+110)+(start+110<text.length?"…":""); }
  const sn=norm(snippet), j=sn.indexOf(q);
  if(j<0) return esc(snippet);
  return esc(snippet.slice(0,j))+"<mark>"+esc(snippet.slice(j,j+q.length))+"</mark>"+esc(snippet.slice(j+q.length));
}
function runSearch(){
  const raw=gIn.value.trim(), q=norm(raw);
  if(q.length<2){ gRes.hidden=true; gIn.setAttribute("aria-expanded","false"); gHits=[]; return; }
  const per={}, hits=[];
  const mine=allWords().filter(x=>[x.w,x.m,x.e].some(s=>norm(s||"").includes(q)));
  if(mine.length) hits.push({id:"words",label:"My notebook · words",text:mine.slice(0,3).map(x=>x.w+(x.m?" = "+x.m:"")).join(" · ")+(mine.length>3?" …":""),notes:true});
  const myNotes=cnotes.filter(x=>norm(x.text).includes(q));
  if(myNotes.length) hits.push({id:"classnotes",label:"My notebook · class notes · "+myNotes.length,text:myNotes[0].text,cn:true});
  INDEX.filter(e=>norm(e.text).includes(q)).sort((a,b)=>a.kind-b.kind).forEach(e=>{
    if(hits.length>=9) return;
    per[e.id]=(per[e.id]||0)+1;
    if(per[e.id]>2) return;
    if(e.kind===0 && hits.some(h=>h.id===e.id)) return;
    hits.push(e);
  });
  gHits=hits; gSel=hits.length?0:-1;
  gRes.innerHTML= hits.length ? hits.map((h,i)=>'<button type="button" class="g-hit'+(i===gSel?' sel':'')+'" role="option" id="gh'+i+'" data-hit="'+i+'"><span class="g-sec'+(h.notes?' g-notes':'')+'">'+esc(h.label)+'</span><span class="g-txt">'+(h.kind===0?'Open this section':hl(h.text.replace(/\s+/g," "),q))+'</span></button>').join("")
    : '<div class="g-empty">Nothing for “'+esc(raw)+'”. Try a shorter word, or use the translator.</div>';
  gRes.hidden=false; gIn.setAttribute("aria-expanded","true");
  if(gSel>=0) gIn.setAttribute("aria-activedescendant","gh0"); else gIn.removeAttribute("aria-activedescendant");
}
function openHit(h){
  const q=gIn.value.trim();
  closeSearch(true);
  go(h.id,true); window.scrollTo({top:0});
  if(h.notes){ wSearch.value=q; renderWords(); return; }
  if(h.cn){ cnSearch.value=q; renderCN(); return; }
  const tableSearch={verbTable:"verbSearch",phBody:"phSearch",gerBody:"gerSearch"}[h.table];
  if(tableSearch){ const i=document.getElementById(tableSearch); i.value=q; i.dispatchEvent(new Event("input")); setTimeout(()=>{ const r=document.querySelector("#"+(h.table==="verbTable"?"verbTable tbody":h.table)+" tr"); if(r){ r.scrollIntoView({block:"center"}); flash(r);} },30); return; }
  if(h.el && h.el.isConnected){ setTimeout(()=>{ h.el.scrollIntoView({block:"center"}); flash(h.el); },30); }
}
function flash(el){ el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); setTimeout(()=>el.classList.remove("flash"),1800); }
function closeSearch(clear){ gRes.hidden=true; gIn.setAttribute("aria-expanded","false"); if(clear){ gIn.value=""; } sWrap.classList.remove("open"); sTog.setAttribute("aria-expanded","false"); }
gIn.addEventListener("input",runSearch);
gIn.addEventListener("focus",()=>{ if(gIn.value.trim().length>=2) runSearch(); });
gIn.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){ if(!gHits.length) return; e.preventDefault(); gSel=(gSel+(e.key==="ArrowDown"?1:-1)+gHits.length)%gHits.length; gRes.querySelectorAll(".g-hit").forEach((b,i)=>b.classList.toggle("sel",i===gSel)); gIn.setAttribute("aria-activedescendant","gh"+gSel); const sb=document.getElementById("gh"+gSel); if(sb) sb.scrollIntoView({block:"nearest"}); }
  else if(e.key==="Enter"){ e.preventDefault(); if(gSel>=0) openHit(gHits[gSel]); }
  else if(e.key==="Escape"){ closeSearch(true); gIn.blur(); }
});
gRes.addEventListener("mousedown",e=>e.preventDefault());
gRes.addEventListener("click",e=>{ const b=e.target.closest("[data-hit]"); if(b) openHit(gHits[+b.dataset.hit]); });
document.addEventListener("click",e=>{ if(!e.target.closest("#searchWrap,#searchToggle")) { gRes.hidden=true; gIn.setAttribute("aria-expanded","false"); if(!gIn.value) { sWrap.classList.remove("open"); sTog.setAttribute("aria-expanded","false"); } } });
sTog.addEventListener("click",()=>{ const open=!sWrap.classList.contains("open"); sWrap.classList.toggle("open",open); sTog.setAttribute("aria-expanded",open?"true":"false"); if(open) setTimeout(()=>gIn.focus(),20); });
document.addEventListener("keydown",e=>{
  if(e.key==="/" && !e.ctrlKey && !e.metaKey && !e.altKey){
    const t=e.target; if(t && (t.matches("input,textarea,select,[contenteditable]"))) return;
    e.preventDefault(); if(getComputedStyle(sTog).display!=="none"){ sWrap.classList.add("open"); sTog.setAttribute("aria-expanded","true"); } gIn.focus();
  }
});

/* ---------------- welcome card ---------------- */
const wl=document.getElementById("welcome"), wlBd=document.getElementById("wlBackdrop");
let wlReturn=null;
let wlAt=0;
function wlShow(i){ const steps=wl.querySelectorAll(".wl-step"); wlAt=Math.max(0,Math.min(steps.length-1,i));
  steps.forEach((st,k)=>st.hidden=k!==wlAt); const last=wlAt===steps.length-1;
  document.getElementById("wlCount").textContent=(wlAt+1)+" of "+steps.length;
  document.querySelectorAll("#wlDots i").forEach((d,k)=>d.classList.toggle("on",k===wlAt));
  document.getElementById("wlBack").hidden=wlAt===0; document.getElementById("wlNext").hidden=last;
  document.getElementById("wlOk").hidden=!last; document.getElementById("wlNotes").hidden=!last;
  wl.scrollTop=0; const h=steps[wlAt].querySelector("h2"); if(h){ h.setAttribute("tabindex","-1"); }
  setTimeout(()=>document.getElementById(last?"wlOk":"wlNext").focus(),30); }
function openWelcome(){ wlReturn=document.activeElement; wl.hidden=false; wlBd.hidden=false; wlShow(0);
  try{ const im=document.getElementById("wlBdImg"); if(im&&window.csBuddy&&window.csBuddy.of&&!im.dataset.done){ const svg=window.csBuddy.of({a:"miki",c:0,head:"crown"}); if(svg){ im.firstElementChild.outerHTML=svg; im.dataset.done="1"; } } }catch(e){}
  const lvl=LS.get("ncs-level","normal"); wl.querySelectorAll("[data-wllevel]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.wllevel===(lvl==="beginner"?"beginner":"normal"))));
  const bd=LS.get("ncs-buddy",{})||{}; const ar=document.getElementById("wlAdoptRow"); if(ar) ar.hidden=bd.on===true; }
document.getElementById("wlNext").addEventListener("click",()=>wlShow(wlAt+1));
document.getElementById("wlBack").addEventListener("click",()=>wlShow(wlAt-1));
document.getElementById("wlSkip").addEventListener("click",()=>closeWelcome());
wl.addEventListener("keydown",e=>{ const n=wl.querySelectorAll(".wl-step").length; if(e.key==="ArrowRight"&&wlAt<n-1) wlShow(wlAt+1); if(e.key==="ArrowLeft"&&wlAt>0) wlShow(wlAt-1); });
wl.addEventListener("click",e=>{
  const lv=e.target.closest("[data-wllevel]");
  if(lv){ wl.querySelectorAll("[data-wllevel]").forEach(b=>b.setAttribute("aria-pressed",String(b===lv))); try{ if(typeof csSetLevel==="function") csSetLevel(lv.dataset.wllevel==="beginner"); }catch(er){} setTimeout(()=>wlShow(wlAt+1),350); return; }
  if(e.target.closest("[data-wladopt]")){ closeWelcome(); setTimeout(()=>{ if(window.csBuddy) window.csBuddy.open("adopt"); },200); }
});
function closeWelcome(){ wl.hidden=true; wlBd.hidden=true; LS.set("ncs-welcomed",1); if(wlReturn&&wlReturn.focus&&wlReturn!==document.body) wlReturn.focus(); }
document.getElementById("wlOk").addEventListener("click",closeWelcome);
document.getElementById("wlNotes").addEventListener("click",()=>{ closeWelcome(); });
wlBd.addEventListener("click",closeWelcome);
wl.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); closeWelcome(); } });
document.addEventListener("click",e=>{ if(e.target.closest("[data-welcome]")) openWelcome(); });
(function(){ let done=false; const go=()=>{ if(done||LS.get("ncs-welcomed",0)) return; done=true; setTimeout(openWelcome,400); };
  if(window.__csAuth===true||window.__csPreview||window.__csGuest) go(); window.addEventListener("cs-auth",e=>{ if(e.detail&&e.detail.signedIn) go(); }); })();

/* ---------------- what's new (changelog) ---------------- */
// Add new entries at the TOP. The popup shows the newest entry once to returning students.
const CHANGELOG=[
  {id:"2026-1112", date:"November 12, 2026", title:"Profile and settings together", items:[
    ["⚙️","One button for you","tap <b>your photo</b> at the top right: <b>👤 Profile</b> has your name, photo and club profile, and <b>⚙ Settings</b> has themes, text size, fonts, focus and calm mode, your buddy and the rest. Hibi remembers which tab you used last."],
    ["🔔","Notifications and messages together","the 🔔 at the top now has two tabs: <b>🔔 Notifications</b> and <b>💬 Messages</b>. New messages count in the bell's number, and the bell opens on the tab you used last."],
    ["🗂️","A shorter menu on small screens","when the window is narrow, the menu sections (Essentials, Grammar notes…) are pills you can open and close, so there's much less scrolling."],
    ["📸","Photos in messages","tap a photo to see it big, with a <b>⬇ Download</b> button. GIFs in messages play now too."],
    ["🎓","My coaching, tidier","your next class now shows how much is left in your pack, your last class has the <b>Save all</b> button right next to its new words, and each box has its own color so it's easier to find things.","coaching"],
    ["☁️","Your progress always follows you","everything you do on Hibi (practice, flashcards, class recap exercises, recordings you've watched…) is saved to your account as you go. Switch devices, close the tab or reload: it's all still there."],
    ["🐾","Your buddy has more to say","every pet now has two sounds, and you'll hear one every time you pet or feed them (if buddy sounds are on)."]
  ]},
  {id:"2026-1111", date:"November 11, 2026", title:"Small things, smoother", items:[
    ["🐾","Your buddy is your photo","in the club, everyone’s photo is now their buddy, unless they pick something else. Change it in your profile: your Google photo, your own photo, your buddy, or just your initials."],
    ["🗣️","How to say your words","short words and expressions in <b>My words</b> now show how to say them, like <b>LEV-er-ij</b> (CAPITALS = the strong part). Your saved words get it little by little, and you can edit it.","words"],
    ["🏃","New: Verb + -ing","<b>before leaving</b>, <b>I recommend going</b>, <b>looking forward to seeing you</b>, and when it's <b>to</b> instead. 7 stages in <b>Practice → Grammar</b>. Finish it for a 🛹 skateboard for your buddy.","quiz"],
    ["🎂","Your name, job and birthday","in the club, open <b>your profile → ✏️ Edit</b> to change how your name shows (just your first name, for example), add a little title (your job, or anything that describes you), and add your birthday. Birthdays you choose to show get a 🎂 on the club calendar and a little celebration on <b>This week</b>.","club"],
    ["✍️","My own sentence","in <b>My words</b>, tap <b>✍️ Write my own sentence</b> under any word to add a sentence of your own. You can edit it any time, and the AI never touches it.","words"],
    ["✅","Choose what the AI does","<b>✨ Complete my words</b> and <b>🧹 Clean up my words</b> now have a checklist (with <b>Select all</b>) so you choose exactly what gets filled in or checked.","words"],
    ["🎥","Your class recordings","private students: <b>My coaching</b> now lists your recent class recordings, with how long each one stays before Zoom deletes it, and a link to your Drive folder.","coaching"],
    ["🔔","Notifications for everyone","the 🔔 at the top now shows everything new for you: class recaps, recommendations, progress reports and new classes from Noa, plus replies and reactions in the club. Tap one to go straight there."],
    ["🗑️","Delete messages and chats","in <b>Messages</b>, tap the ✕ on a message you sent to delete it, or the ✕ next to a chat to remove it from your list. Hibi always asks first."],
    ["🎧","A tidier top bar","the music button is now just an icon: 🎧 until you play something, then the little bars. Your profile shows just your photo."],
    ["🧹","Word tools in order","in <b>My words</b> the buttons now follow the steps: <b>Clean up</b> first, then <b>Complete</b>, then practice.","words"],
    ["🎯","Practice next to My words","<b>Practice</b> moved right under <b>My words</b> in the menu, since that’s where your flashcards come from.","quiz"],
    ["📄","Easier to spot","your latest study guide and class recap in <b>My coaching</b> have a clear border now, so they’re easy to see in every theme."],
    ["🎵","Music that keeps going","if Study music is on, it keeps playing when Hibi opens another page. If your browser pauses it, one tap anywhere starts it again."]]},
  {id:"2026-map", date:"November 10, 2026", title:"Your English Map 🗺️", items:[
    ["🗺️","Your English Map","private students: your map from Session Zero now lives in <b>My coaching</b>. Your level, your superpower, 3 focus areas with practice links, and the route to your goal."],
    ["💬","Messages at the top","the 💬 button now sits in the top bar, with a red dot when someone writes to you. Type a name at the top to start a new chat, with anyone in the club or with Noa.","club"],
    ["⏱️","Study timer buddy","your buddy cheers you on during the study timer: halfway, 5 minutes left, and when it's time for a break."],
    ["🔴","New posts","a red dot on <b>Community</b> tells you when there's something new on the wall.","club"],
    ["⭐","Rate the podcast","give each podcast episode 1 to 5 stars. Noa reads every rating.","club"],
    ["📶","Difficulty levels","every class recording and podcast episode now shows a level from 1 to 10 (1 is about A2+, 10 is about C1), so you can pick what fits you today.","club"],
    ["🌊","Ocean waves","a new sound in 🎵 Study music: slow waves rolling onto the beach."],
    ["🖱️","Look around the park","zoomed in on the Buddy park? Drag it with your mouse to see the rest."],
    ["⚙️","Tidier settings","the ⚙️ menu is now organized into Your level, Look &amp; feel, Text &amp; reading, Page tools, Comfort &amp; accessibility and Study buddy."]
  ]},
  {id:"2026-dm", date:"November 10, 2026", title:"Messages, photos and more 💬", items:[
    ["💬","Messages","club members can now chat privately: open someone's profile (or tap their buddy in the park) and press <b>💬 Message</b>. Text, photos and GIFs.","club"],
    ["🙂","Your profile photo","tap <b>Profile</b> at the top right to use your Google photo or upload your own. It shows next to your posts and messages."],
    ["🎧","The club podcast","listen right on Hibi, at your speed, and save the episode's words with one tap (Club → Library)."],
    ["☑","Pick words faster","in <b>My words</b>, tick the words you want and practice just those with flashcards."]
  ]},
  {id:"2026-prs", date:"November 10, 2026", title:"Present simple + pronunciation ☀️", items:[
    ["☀️","New: Present simple","I work, she works, I don't, does he…? 7 short stages with a little Spanish help on every question, in Practice → Grammar.","quiz"],
    ["🗣️","New: Pronunciation","its own section in Practice, starting with -ed endings: worked, played or wanted? A 🔊 button on every word.","quiz"],
    ["🎁","New prizes for your buddy","☕ a coffee mug for Present simple, 🔔 a little bell for -ed endings, and new duel prizes your buddy can wear (headband, medal, shades, laurel)."]
  ]},
  {id:"2026-club2", date:"November 9, 2026", title:"The club, more alive 🌼", quiet:true, items:[
    ["🔔","Your own club bell","see when someone comments on your post, reacts to it or @mentions you (type @ and a name to mention someone).","club"],
    ["🙋","I’m going","tap it on each class of the week, and see who else is coming. Polls 📊 are on the wall too.","club"],
    ["✍️","Weekly challenge","answer Noa’s short challenge each week for 5 🍪 for your buddy. Noa picks a favourite ⭐.","club"],
    ["🏅","Profiles, streaks and badges","tap anyone’s name to see their buddy, level and badges. Come to classes weeks in a row to build your streak 🔥.","club"],
    ["🎬","After class","recordings, words you can save to My notebook with one tap, and useful phrases, on each week’s post.","club"]
  ]},
  {id:"2026-reports", date:"November 9, 2026", title:"Progress reports on My coaching 📈", quiet:true, items:[
    ["📈","Your progress reports","private students: your every-3-weeks progress report now lives in <b>My coaching → Progress reports</b>. Read it, open your class recordings, or print it.","coaching"]
  ]},
  {id:"2026-sentences", date:"November 9, 2026", title:"Write your own sentences ✍️", items:[
    ["📊","My English level","take a 5-minute level check or choose your level in <b>Practice → My English level</b>, so your feedback fits you.","quiz"],
    ["⭐","Stars for your sentences","in <b>Practice → Use it in a sentence</b>, every sentence gets 1 to 3 stars <b>for your level</b>, a tip to make the next one richer, and up to 3 🍪 for your buddy.","quiz"],
    ["📌","Your sentence, your example","like the sentence you wrote? Save it as that word's example in <b>My words</b>."],
    ["✍️","Write your own examples","in <b>✨ Complete my words</b>, untick <b>Example sentence</b> and the AI leaves them for you.","words"]
  ]},
  {id:"2026-hibi", date:"November 9, 2026", title:"Say hi to Hibi 日々", items:[
    ["🌱","A new name: Hibi 日々","the Cheat Sheet is now <b>Hibi</b>, Japanese for <b>“day by day”</b>. A little English every day adds up. Same site, same words and notes."],
    ["⚔️","Duels","club members can challenge each other to a friendly 7-day duel in the <b>Buddy park</b>: word race, first to 15, flashcards or grammar. Winners get treats and fighting gear for their buddy.","park"],
    ["📸","Your monthly recap, your way","pick a background (even your buddy's room) and it only shows what you actually did."],
    ["⏱","Study timer on Practice","start a 10, 15 or 25-minute session right from <b>Practice</b>, with a study tip each day.","quiz"],
    ["📝","Class note drafts","on your Home page, <b>Save draft</b> keeps your notes while you write during class; <b>Move to my notes</b> files them when you're done."],
    ["🧸","Your buddy's room","drag toys around, hide the ones you don't like, and zoom out to see more of the room."],
    ["✨","Safer AI word tools","<b>Complete my words</b> and <b>Clean up my words</b> now explain what they do first, never change sentences you wrote without asking, and have an <b>Undo</b> button."],
    ["🎓","My coaching","private students see their next class, homework, goals, guides and payments, with a 🔔 when something new arrives."]
  ]},
  {id:"2026-contrast", date:"November 7, 2026", title:"High contrast", items:[
    ["🔆","High contrast","stronger text and borders, with any theme. Turn it on in <b>Settings</b>. If your phone or computer already uses <i>Increase contrast</i>, it turns on by itself."]
  ]},
  {id:"2026-lookup", date:"November 6, 2026", title:"Look up any word 🔎", items:[
    ["🔎","Look up any word","<b>double-click</b> a word, or select a few words for phrases like <i>figure out</i> (on your phone, <b>press and hold</b>), anywhere on the site to see what it means, in English and Spanish, and save it to My notebook."],
    ["🐾","Fun mouse cursors","on a computer, choose a paw, pencil, star or a big cursor in <b>Settings</b>."]
  ]},
  {id:"2026-interviews", date:"November 6, 2026", title:"Job interviews and feeding friends 🍪", items:[
    ["💼","Job interviews","a new page in <b>Work</b>: the classic questions, the STAR method, phrases to buy time and questions to ask.","interview"],
    ["🍪","Feed other buddies","in the <b>Buddy park</b>, tap someone else\u2019s buddy and give it one of your treats (once a day). It gives them +3 friendship.","park"],
    ["🎨","More colors","every buddy now has 5 colors to unlock, with some new fun ones."],
    ["🦄","Peek at Glitter","you can now preview the unicorn before you unlock her."]
  ]},
  {id:"2026-presentperfect", date:"November 6, 2026", title:"Present perfect + works offline 🌍", items:[
    ["🌍","Present perfect","a new grammar module in <b>Practice</b>, with 7 stages, stories, a test out exam and a 🌍 Little globe for your buddy.","quiz"],
    ["📶","Works offline","once you\u2019ve opened the Cheat Sheet, it opens even without internet. Your saved words and notes are there, and everything syncs when you\u2019re back online."],
    ["👋","A new welcome tour","tap <b>How this page works</b> at the bottom of any page to see what\u2019s new."]
  ]},
  {id:"2026-smarttranslate", date:"November 6, 2026", title:"A smarter translator 🗣️", items:[
    ["🔁","It knows the language","write in Spanish or English: the translator figures it out by itself.","translate"],
    ["🗣️","How to say it","translations now show an easy way to say the English, like <b>KUMF-ter-buhl</b>.","translate"],
    ["🃏","Save words from flashcards","tap any word in the meaning or example on a flashcard to save it. Tap the words next to it to save a phrase.","quiz"],
    ["↩️","Back button","your browser\u2019s back button now takes you to the last page you visited on the Cheat Sheet."]
  ]},
  {id:"2026-vocab", date:"November 6, 2026", title:"Vocabulary, stories and a new buddy window 🗂️", items:[
    ["🗂️","Vocabulary","a new part of <b>Practice</b>: word sets made by Noa (phrasal verbs, work, travel and everyday expressions), with flashcards and a quiz.","quiz"],
    ["📖","Past simple stories","a new stage 7, <b>Tell the story</b>, plus lots of new questions in every stage.","quiz"],
    ["🐾","A new buddy window","everything is in little sections now. Tap <b>Save</b> to keep your changes."],
    ["✨","Glow in the park","buddies glow in the park as their friendship grows: silver, gold and rainbow.","park"],
    ["🦄","Glitter is now rare","the unicorn unlocks when you have learned 150 words. If you already have her, she stays!"],
    ["📸","Your monthly recap","tap your name at the top right for a picture of your month to share."]
  ]},
  {id:"2026-practicefirst", date:"November 6, 2026", title:"Practice moves up 🎯", items:[
    ["🎯","Practice is easier to find","it is now right under <b>Home</b> in the menu. You can change the theme in <b>Settings</b>.","quiz"],
    ["🐾","Move your buddy","drag your buddy to another spot on the screen. It stays where you leave it."],
    ["💛","More about your buddy","tap your buddy to see its level, mood and treats at a glance."]
  ]},
  {id:"2026-testout", date:"November 5, 2026", title:"Test out, buddy sounds, piano + rain and more 🎓", items:[
    ["🎹","Piano + rain","a new <b>Music</b> option: calm piano with soft rain, with a slider to mix them. Every sound now has a short description too.","music"],
    ["🐾","Pet your buddy","your buddy now has a <b>Pet</b> button next to <b>Feed</b>."],
    ["🔁","Irregular verbs count","every 10 right answers in <b>Irregular verbs</b> now counts as a practice round for your buddy and your weekly goal.","quiz"],
    ["✨","New default names","the cat, llama, unicorn, chicken, pudú, capybara and axolotl now have names. If you already named yours, it keeps its name."],
    ["🎓","Test out of the past simple","already good at it? Take the 15-question <b>test out</b> exam on the Past simple page. Get all 15 right and the whole module is done.","quiz"],
    ["🔊","Buddy sounds","sometimes buddies make a little sound when you tap them, in your corner and in the park. You can turn it off in the buddy window."],
    ["📊","Your stats","tap your name at the top right to see your words, study days, practice time and more."]
  ]},
  {id:"2026-pastsimple", date:"November 5, 2026", title:"A new Practice page + the past simple ⏪", items:[
    ["🧩","A new Practice page","<b>Practice</b> now has its own home page: pick flashcards, sentences, pronunciation, irregular verbs or grammar.","quiz"],
    ["⏪","Past simple, step by step","six stages from easy to harder: regular verbs, irregular verbs, was / were, negatives, questions and a final mix. Get 7/10 to open the next stage, and finish them all to get a ⏳ magic hourglass for your buddy.","quiz"],
    ["📌","My mistakes","the questions you miss are saved so you can review them later. A question leaves the list when you get it right twice in a row.","quiz"],
    ["🎯","A weekly goal","finish 3 practice rounds in a week and your buddy gets +5 🍪 and +5 friendship.","quiz"],
    ["📓","Practice this","in your weekly summaries, past simple corrections now have a <b>Practice this</b> button.","notebook"]
  ]},
  {id:"2026-findwords", date:"November 5, 2026", title:"Find words, park treats and a colorful menu 🍪", items:[
    ["✨","Find words in any saved note","in <b>My notebook → Class notes</b>, tap <b>✨ Find words</b> on a saved note to see new words and expressions you can add to My notebook.","classnotes"],
    ["🍪","Treats in the park","sometimes a treat is hiding in the <b>Buddy park</b>. If you see one, tap it to pick it up! It doesn't happen every day.","park"],
    ["🎨","A colorful menu","each part of the menu now has its own color, so it's easier to find what you need."]
  ]},
  {id:"2026-parklife", date:"November 5, 2026", title:"A livelier Buddy park 🌳", items:[
    ["🚶","Buddies on the move","in the <b>Buddy park</b>, buddies now walk around, say hi to each other and show off the moves they have unlocked.","park"],
    ["🔍","Zoom in and out","use <b>− / +</b> in the park for a wide view or a close-up. Tap a buddy to see whose it is.","park"]
  ]},
  {id:"2026-smartwords", date:"November 5, 2026", title:"Smarter words 🧠", items:[
    ["✨","Every word explained","new words now get their type (noun, verb, phrasal verb…), a simple meaning and an example sentence, all by themselves. Tap <b>✨ Complete my words</b> to do it for the ones you already have.","words"],
    ["📋","Paste anything","<b>+ Add many words</b> now understands any list: a message, notes, a document. You check the words before they're added.","words"],
    ["📝","Words from your notes","when you save a class note, the Cheat Sheet suggests the new words and expressions in it.","notes"],
    ["🧹","Clean up my words","fixes spelling, punctuation and capital letters, fills in what's missing and finds repeated words. Nothing changes until you say yes.","words"],
    ["🌱","Beginner mode","in <b>Settings</b>: more Spanish help, simpler examples and a slower voice. ¡Ideal para empezar!",null],
    ["🌑","Midnight & a new friend","a pure black <b>Midnight</b> theme, and Kero the frog 🐸 joined the study buddies.",null]
  ]},
  {id:"2026-iossound", quiet:true, date:"November 4, 2026", title:"Sound fix for iPhone 🔊", items:[
    ["🔊","Sound fix for iPhone","music and the 🔊 buttons now work even when your iPhone is on silent.",null]
  ]},
  {id:"2026-app", date:"November 2, 2026", title:"Practice more, and get the app 📲", items:[
    ["🔁","Words to review today","a new card on your Home page with 5 of your words that need practice. Tap <b>Practice these 5</b>.","notes"],
    ["🎤","Say it out loud","in <b>Practice</b>, say one of your words and see if the computer understands you.","quiz"],
    ["📲","Install the app","put the Cheat Sheet on your phone's home screen: tap <b>📲 Install the app</b> at the bottom of the page.",null],
    ["💌","Messages from Noa","Noa can now send you a little message right here in the Cheat Sheet.",null]
  ]},
  {id:"2026-notebook", date:"November 2, 2026", title:"Your notebook & sentence practice ✍️", items:[
    ["📓","Weekly summaries","in <b>My class notes</b>, a new tab groups your notes by week with a short AI summary: main topics, corrections to remember and new expressions.","notebook"],
    ["✍️","Use it in a sentence","in <b>Practice</b>, write a sentence with one of your words and get quick, friendly feedback.","quiz"]
  ]},
  {id:"2026-love", date:"November 2, 2026", title:"Love in the park 💌", items:[
    ["💌","Send love","tap a friend's buddy in the <b>Buddy park</b> to give it +2 friendship (once a day per buddy). You'll see who sent love to yours.","park"],
    ["🐾","Your buddy in your tab","the little icon in your browser tab is now your own study buddy.",null],
    ["🎧","Pink & white noise","two new sounds in <b>Music</b>, next to brown noise.",null]
  ]},
  {id:"2026-park", date:"November 2, 2026", title:"The Buddy park 🌳", items:[
    ["🌳","Buddy park","see everyone's study buddies hanging out together in the new <b>Buddy park</b> (in the green menu). Club members are in the middle, private students around the edges.","park"],
    ["📝","Notes for your words","add an optional note to any word: when to use it, a similar word, a tip from class.","words"],
    ["✨","Send love","tap ✨ on the <b>Thought for today</b> to send some love (and give your buddy +1 friendship).","notes"],
    ["💛","Each buddy, its own friendship","every animal has its own friendship level now. Your words, outfits and colors are shared. Two colors are free, and the rest unlock at 10, 20 and 35 words.",null]
  ]},
  {id:"2026-garden", date:"November 2, 2026", title:"Your buddy's garden 🌱", items:[
    ["🌱","Study garden","every day you study, a new flower grows in front of your buddy. Missed days don't matter, your flowers stay.",null],
    ["🎅","Seasonal outfits","your buddy dresses up on its own for Halloween, Christmas, Fiestas Patrias and more.",null],
    ["🃏","A flashcard cheerleader","your buddy gets a little nervous on words you missed before, and celebrates when you finally get them right.","quiz"]
  ]},
  {id:"2026-friends", date:"November 2, 2026", title:"Friendship levels 💛", items:[
    ["💛","Become best friends","feed, pet and visit your study buddy to raise its friendship level, from 1 to 10.",null],
    ["🦋","New things it does","each level unlocks something new: yawning, dancing, chasing butterflies, playing with its ball, humming to your music and reading during the study timer.",null],
    ["💬","Little English tips","the closer you are, the more it talks: today's word, your weekly progress and fun idioms.",null]
  ]},
  {id:"2026-buddy", date:"November 2, 2026", title:"Adopt a study buddy 🐾", items:[
    ["🥚","A little friend","tap the egg in the bottom corner to adopt a pixel buddy: Max, Miki, a cat, llama, unicorn, chicken, pudú, capybara or axolotl.",null],
    ["🍪","Feed it treats","you earn treats by saving new words and finishing flashcard rounds. Tap your buddy to pet it or feed it.",null],
    ["🎓","Unlock outfits","hats, glasses, scarves and rooms unlock as your word list grows, all the way to 1,000 words. Turn it off anytime in <b>Settings</b>.",null]
  ]},
  {id:"2026-fcsets", date:"November 2, 2026", title:"Practice just some of your words 🃏", items:[
    ["🎯","Choose which words","in <b>Practice</b>, pick <b>Newest 20</b>, <b>This week</b>, <b>Hard ones</b> or <b>My pick</b> instead of your whole list.","quiz"],
    ["☑","Pick your own","in <b>My words</b>, tap <b>Choose words</b>, tick the ones you want and press <b>Practice these</b>.","words"],
    ["Aa","New font: Book","a calm, book-style font in <b>Settings</b>. It looks lovely with the Sepia look.",null]
  ]},
  {id:"2026-comfort", date:"October 30, 2026", title:"Make it comfortable for you ⚙️", items:[
    ["⚙","Reading &amp; comfort settings","tap <b>Settings</b> at the top: bigger text, easier-to-read fonts, more space, bionic reading and a reading ruler.",null],
    ["🎯","Focus mode &amp; study timer","hide everything except the page you're on (the ☰ Menu button still lets you change pages), and time your study sessions with a gentle chime.",null],
    ["📖","Calm mode &amp; Sepia","no animations, softer colors and no pop-ups. Plus a new <b>Sepia</b> look, like reading on a Kindle.",null],
    ["🔊","Listen &amp; In short","a 🔊 Listen button reads any page aloud, and grammar pages start with a one-line summary.","perfect"]
  ]},
  {id:"2026-unicorn", date:"October 29, 2026", title:"Unicorn mode 🦄", items:[
    ["🌈","A third look","tap the theme button at the top (next to Music) to switch between dark, light and a bright rainbow <b>Unicorn</b> mode.",null]
  ]},
  {id:"2026-today", date:"October 29, 2026", title:"Something new every day ☀️", items:[
    ["📖","Word of the day","a useful word or expression on your Home page every day, with an example. Tap <b>+ Save to My notebook</b> to keep it.","notes"],
    ["🌱","Thought for today","a short daily reminder about patience, progress and learning at your own pace.","notes"],
    ["⇄","Translator, pinned","it now sits in the green menu with Home, My class notes and My words.","translate"]
  ]},
  {id:"2026-translate", date:"October 29, 2026", title:"Translate right on the page 🌎", items:[
    ["🌎","Translate here","write a word or sentence in the Translator and get a natural translation right on the page, no new tab needed.","translate"],
    ["↗️","Backups still there","Google Translate and DeepL are one tap away if you want a second opinion.",null]
  ]},
  {id:"2026-cloud", date:"October 29, 2026", title:"Your notes, now in the cloud ☁️", items:[
    ["☁️","Sign in with Google","tap <b>Sign in</b> at the top right and your words, class notes, stars and flashcard progress save to your Google account.",null],
    ["📱","On every device","sign in on your phone or another computer and everything is there. No more copying or backup codes.",null],
    ["📦","Nothing lost","the first time you sign in, everything already saved in this browser moves to your account.",null]
  ]},
  {id:"2026-10-28", date:"October 28, 2026", title:"Small improvements", quiet:true, items:[
    ["✏️","Write where you are","you can now write class notes right on the <b>My class notes</b> page, and add words right on the <b>My words</b> page.","classnotes"],
    ["🧭","Menu fix","the Home button no longer hides under the top bar when you're at the bottom of a page.",null]
  ]},
  {id:"2026-10-26-sounds", date:"October 26, 2026", title:"More study sounds 🎶", items:[
    ["🟤","Brown noise","a deep, steady sound that blocks out distractions. Great for focus.","music"],
    ["🎹","Calm piano","soft, slow piano with no drums, for reading or writing.","music"]
  ]},
  {id:"2026-10-26", date:"October 26, 2026", title:"Big update 🎉", items:[
    ["🎧","Study music","tap <b>Music</b> at the top for lo-fi beats, rain or both, with a volume slider and a music/rain mix.","music"],
    ["🃏","Smarter flashcards","after you flip a card, tell it if you knew the word. The ones you miss come back sooner.","quiz"],
    ["📥","Import your words","paste your whole word list from your sheet and practice it right away.","words"],
    ["📒","My words page","all your saved words in one place in the menu, plus a <b>Delete all</b> option, which asks first.","words"],
    ["🔄","Back up &amp; move","move your words, notes and starred sections to another computer or your phone.","backup"],
    ["🚫","Common mistakes","the mistakes Spanish speakers make most, and how to fix them.","mistakes"],
    ["📚","New grammar","prepositions of place, used to, passive voice, reported speech, and a clearer guide to -ing or to?","place"],
    ["🧭","Easier menu","the menu on the left now scrolls on its own, so you can reach every section without scrolling to the bottom of the page.",null]
  ]},
  {id:"2026-10-25", date:"October 25, 2026", title:"The Cheat Sheet is here", items:[
    ["📌","Everything in one place","verb tenses, irregular verbs, modals, conditionals and much more.","tenses"],
    ["✏️","Your notes and words","save class notes and new words, then practice them.","notes"],
    ["⭐","Make it yours","search everything, star your favorite sections, and pick light or dark mode.",null],
    ["💬","Feedback","send feedback anytime from the bottom of any page.","feedback"]
  ]}
];
const CL_POP=CHANGELOG.find(e=>!e.quiet), CL_LATEST=CL_POP.id; window.__csClLatest=CL_LATEST;
function clItems(e){
  return '<ul class="cl-items">'+e.items.filter(it=>it[3]!=="backup").map(([ic,b,t,go])=>'<li><span class="cl-ic" aria-hidden="true">'+ic+'</span><div><b>'+b+':</b> '+t+(go?' <button class="foot-link cl-go" type="button" '+(go==="music"?'data-openmusic':'data-go="'+go+'"')+'>'+(go==="music"?'Try it':'Open')+' →</button>':'')+'</div></li>').join("")+'</ul>';
}
const CL_T=e=>{ const t=Date.parse(e.date); return isNaN(t)?0:t; }, CL_CUT=CL_T(CHANGELOG[0])-14*864e5;
document.getElementById("clList").innerHTML=CHANGELOG.map((e,i)=>(i>0&&CL_T(e)&&CL_T(e)<CL_CUT?'<div class="cl-old" hidden>':'<div>')+'<article class="card cl-entry"><div class="cl-head"><span class="cl-date">'+e.date+'</span>'+(i===0?'<span class="badge new">latest</span>':'')+'</div><h2 class="cl-title">'+e.title+'</h2>'+clItems(e)+'</article></div>').join("")+'<button type="button" class="swap cl-older" id="clOlder">Show older updates</button>';
(function(){ const b=document.getElementById("clOlder"); if(!document.querySelector("#clList .cl-old")){ b.remove(); return; } b.addEventListener("click",()=>{ document.querySelectorAll("#clList .cl-old").forEach(x=>x.hidden=false); b.remove(); }); })();
const wn=document.getElementById("whatsnew"), wnBd=document.getElementById("wnBackdrop");
document.getElementById("wnBody").innerHTML='<p class="cl-date" style="margin:0 0 6px">'+CL_POP.date+' · '+CL_POP.title+'</p>'+clItems(CL_POP);
function wnWeekly(){ const seen=String(LS.get("ncs-seen-version","")); const out=[]; for(const e of CHANGELOG){ if(e.id===seen) break; if(!e.quiet) out.push(e); if(out.length>=8) break; }
  if(out.length>1) document.getElementById("wnBody").innerHTML='<p class="cl-date" style="margin:0 0 8px">Your weekly summary · '+out.length+' updates</p>'+out.map(e=>'<h3 class="wn-wk-h">'+e.title+' <small>'+e.date+'</small></h3>'+clItems(e)).join(""); }
function openWN(){ LS.set("ncs-wnlast",Date.now()); const l=document.getElementById("wnLess"); if(l){ const p=String(LS.get("ncs-wnpref","all")); l.textContent=p==="week"?"Turn these pop-ups off":"See fewer of these"; l.dataset.to=p==="week"?"none":"week"; } wn.hidden=false; wnBd.hidden=false; setTimeout(()=>document.getElementById("wnOk").focus(),30); }
function closeWN(){ wn.hidden=true; wnBd.hidden=true; LS.set("ncs-seen-version",CL_LATEST); }
document.getElementById("wnOk").addEventListener("click",closeWN);
document.getElementById("wnLess").addEventListener("click",e=>{ const to=e.currentTarget.dataset.to||"week"; LS.set("ncs-wnpref",to); LS.set("ncs-wnlast",Date.now()); closeWN();
  const t=to==="week"?"OK! You'll get one summary a week instead. Change it anytime in Settings → Home & notifications.":"OK, no more pop-ups. New things show as a dot on “What's new”. Change it in Settings → Home & notifications.";
  if(typeof window.toast==="function") window.toast(t); });
wnBd.addEventListener("click",closeWN);
wn.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.preventDefault(); closeWN(); } });
wn.addEventListener("click",e=>{ if(e.target.closest("[data-go],[data-openmusic]")) closeWN(); });
document.addEventListener("click",e=>{ if(e.target.closest("[data-openmusic]")){ const b=document.getElementById("musicBtn"); if(document.getElementById("musicPanel").hidden) setTimeout(()=>b.click(),0); } });
if(!LS.get("ncs-welcomed",0)) LS.set("ncs-seen-version",CL_LATEST);
else if(LS.get("ncs-seen-version","")!==CL_LATEST){
  const wnPref=String(LS.get("ncs-wnpref","all")), wnLast=+LS.get("ncs-wnlast",0)||0;
  if(document.documentElement.classList.contains("cs-calm")||wnPref==="none"||(wnPref==="week"&&Date.now()-wnLast<7*864e5)){ const f=document.querySelector('footer [data-go="changelog"]'); if(f) f.classList.add("cs-new"); }
  else { if(wnPref==="week") wnWeekly(); setTimeout(openWN,500); }
}
document.addEventListener("click",e=>{ if(e.target.closest('[data-go="changelog"]')){ LS.set("ncs-seen-version",CL_LATEST); document.querySelectorAll(".cs-new").forEach(x=>x.classList.remove("cs-new")); } });
})();
