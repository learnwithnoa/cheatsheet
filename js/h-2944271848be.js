
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
      '<div class="field wide"><label for="ed-e">Example sentence</label><input id="ed-e" type="text" value="'+esc(x.e||"")+'"></div>'+
      '<div class="field"><label for="ed-pr">🗣️ How to say it</label><input id="ed-pr" type="text" value="'+esc(x.pr||"")+'" placeholder="e.g. LEV-er-ij"></div>'+
      '<div class="field wide"><label for="ed-own">✍️ My own sentence</label><input id="ed-own" type="text" value="'+esc(x.own||"")+'" placeholder="Write a sentence of your own with this word"></div>'+
      '<div class="field wide"><label for="ed-n">Notes</label><input id="ed-n" type="text" value="'+esc(x.n||"")+'"></div>'+
      '<div class="note-actions"><button class="pill-btn" type="submit">Save changes</button><button class="swap" type="button" data-cancel>Cancel</button></div></form>';
    const isNew = x.sample || isPending(x);
    const picked=wSel&&fcPick.includes(x.id);
    return '<article class="card wcard'+(picked?' picked':'')+'">'+'<span class="w-lead">'+(x.sample?'':'<label class="w-chkw" title="Pick for flashcards"><input type="checkbox" class="w-chk" data-wpick="'+x.id+'" aria-label="Pick '+esc(x.w)+' for flashcards"'+(picked?' checked':'')+'></label>')+sayBtn(x.w.replace(/\(.*?\)/g,""))+'</span>'+
      '<div><div class="w">'+esc(x.w)+(x.pos?' <span class="pos">'+esc(x.pos)+'</span>':'')+'</div>'+(x.pr?'<div class="wpr" title="How to say it (CAPITALS = the strong part)"><span aria-hidden="true">🗣️</span> '+esc(x.pr)+'</div>':'')+(x.m?'<div class="m">'+esc(x.m)+'</div>':'')+(x.def?'<div class="wdef">'+esc(x.def)+'</div>':'')+(x.e?'<div class="ex">'+esc(x.e)+'</div>':'')+(x.own?'<div class="wown">✍️ '+esc(x.own)+'</div>':(x.sample?'':'<button class="wown-add" type="button" data-ownw="'+x.id+'">✍️ Write my own sentence</button>'))+(x.n?'<div class="wn">📝 '+esc(x.n)+'</div>':'')+
      '<div class="meta">'+(x.sample?'<span class="badge ex">example</span>':'<span class="badge wnum" title="Word number (in the order you added them)">#'+nums.get(x.id)+'</span>')+''+(x.imp?'<span class="badge ex">imported</span>':'')+'<span class="badge date">'+fmtDate(x.t)+'</span></div></div>'+
      (x.sample?'<span></span>':'<div class="wbtns"><button class="del edit" type="button" data-edit="'+x.id+'" aria-label="Edit '+esc(x.w)+'">Edit</button><button class="del" type="button" data-del="'+x.id+'" aria-label="Delete '+esc(x.w)+'">Delete</button></div>')+'</article>';
  }).join("")+(wLeft>0?'<div class="w-more"><button class="pill-btn" type="button" id="wMore">Show more words <small>('+wLeft+' more)</small></button></div>':"");
  if(window.__wMoreWatch) window.__wMoreWatch();
}
window.__wRender=renderWords;
function isPending(x){ return !x.imp && x.t>lastCopy; }
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
  x.w=nw; x.m=document.getElementById("ed-m").value.trim(); x.e=document.getElementById("ed-e").value.trim(); { const nv=document.getElementById("ed-n").value.trim(); if(nv) x.n=nv; else delete x.n; } { const ov=document.getElementById("ed-own").value.trim().slice(0,300); if(ov) x.own=ov; else delete x.own; } { const pi=document.getElementById("ed-pr"); if(pi){ const pv=pi.value.trim().slice(0,60); if(pv) x.pr=pv; else { delete x.pr; x.prTried=1; } } }
  LS.set("ncs-words",words); editingId=null; renderWords(); toast("Changes saved");
});
wList.addEventListener("keydown",e=>{ if(e.key==="Escape" && editingId){ editingId=null; renderWords(); } });
function savePick(){ LS.set("ncs-fcpick",fcPick); renderWords(); }
wList.addEventListener("click",e=>{
  const pc=e.target.closest("[data-wpick]");
  if(pc){ const id=pc.dataset.wpick; fcPick=fcPick.includes(id)?fcPick.filter(i=>i!==id):fcPick.concat(id); savePick(); return; }
  const s=e.target.closest("[data-say]"); if(s){ say(s.dataset.say,s); return; }
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

/* ---------------- today: word of the day + thought for today ---------------- */
(function(){
const WOTD=[
 ["figure out","entender, resolver","It took me a while to figure out how the app works."],
 ["look forward to","esperar con ganas","I'm really looking forward to the weekend."],
 ["get used to","acostumbrarse a","I'm getting used to speaking English at work."],
 ["catch up","ponerse al día","Let's grab a coffee and catch up."],
 ["run out of","quedarse sin","We ran out of time before the last question."],
 ["come up with","ocurrírsele, idear","She came up with a great idea for the project."],
 ["point out","señalar, hacer notar","He pointed out a small mistake in my email."],
 ["deal with","lidiar con, encargarse de","I'll deal with the client tomorrow morning."],
 ["give up","rendirse, dejar de","Don't give up, you're improving every week."],
 ["turn out","resultar","The meeting turned out to be really useful."],
 ["by the way","por cierto","By the way, did you finish the report?"],
 ["to be honest","la verdad, siendo honesto","To be honest, I didn't understand the question."],
 ["it depends","depende","It depends on how much time we have."],
 ["make sense","tener sentido","Does that make sense to you?"],
 ["on the other hand","por otro lado","It's cheap. On the other hand, it's very far."],
 ["worth it","vale la pena","The trip was long, but it was worth it."],
 ["a piece of cake","pan comido","The first exercise was a piece of cake."],
 ["take it easy","tómatelo con calma","Take it easy, we still have time."],
 ["keep in mind","tener en cuenta","Keep in mind that the store closes at six."],
 ["in the meantime","mientras tanto","The food will take a while. In the meantime, let's talk."],
 ["actually","en realidad (no \"actualmente\")","I thought it was hard, but it's actually easy."],
 ["eventually","finalmente, con el tiempo","Eventually, you'll stop translating in your head."],
 ["struggle","costarle a uno, tener dificultades","I struggle to understand fast speakers."],
 ["improve","mejorar","My listening has improved a lot this month."],
 ["be about to","estar a punto de","I was about to call you."],
 ["show up","aparecer, llegar","Only three people showed up to the meeting."],
 ["find out","averiguar, enterarse","I found out that the class was cancelled."],
 ["set up","organizar, configurar","Can you set up a meeting for Friday?"],
 ["put off","posponer","Stop putting off your homework!"],
 ["bring up","sacar un tema","She brought up an interesting point."],
 ["get along with","llevarse bien con","I get along really well with my coworkers."],
 ["hang out","juntarse, pasar el rato","We usually hang out on Saturdays."],
 ["work out","resultar bien / hacer ejercicio","Don't worry, everything will work out."],
 ["sort of","más o menos, como que","I sort of understand, but not completely."],
 ["no wonder","con razón","You didn't sleep? No wonder you're tired."],
 ["I'm into","me gusta, me interesa","I'm really into podcasts lately."],
 ["out of the blue","de la nada","He called me out of the blue."],
 ["on purpose","a propósito","Sorry, I didn't do it on purpose."],
 ["get the hang of","agarrarle la mano","You'll get the hang of it soon."],
 ["feel like","tener ganas de","I don't feel like cooking tonight."],
 ["mind","molestar, importar","Do you mind if I open the window?"],
 ["used to","solía","I used to be afraid of speaking English."]
];
const THOUGHTS=[
 "Mistakes are proof that you're trying. Make a few today.",
 "You don't need to be fluent to start. You need to start to be fluent.",
 "Slow progress is still progress. Look back a month, not a day.",
 "Speak before you feel ready. Ready usually shows up later.",
 "Notice one new word today. Just one. That's how a language grows.",
 "Take a breath before you answer. The words come easier when you're calm.",
 "Nobody is grading your accent in real conversations. They're listening to you.",
 "Compare yourself to who you were last month, not to anyone else.",
 "You control the effort, not the speed. Focus on what you control.",
 "Some days English feels easy, some days it doesn't. Both days count.",
 "Curiosity beats perfection. Ask the question, even with mistakes.",
 "Listening is a skill too. Today, listen like you're collecting words.",
 "Small daily practice beats one big weekend effort.",
 "When you get stuck, describe it with simpler words. That's real fluency.",
 "Be patient with yourself the way you'd be patient with a friend.",
 "Every conversation in English is practice, even the awkward ones.",
 "You've already learned harder things than this. You can do it again.",
 "The goal isn't zero mistakes. It's being understood.",
 "Rest is part of learning. Your brain keeps working while you sleep.",
 "Today, say one thing in English that you'd usually say in Spanish.",
 "Confidence isn't the start of speaking. It's the result of it.",
 "What you practice grows. Choose to practice speaking, not just studying.",
 "Feeling uncomfortable means you're learning something new.",
 "One podcast, one chapter, one conversation. That's enough for today.",
 "You don't have to understand every word to understand the message.",
 "Celebrate a small win today: a word you remembered, a sentence that flowed.",
 "Worry about what's in your control: your routine, your attention, your effort.",
 "A pause while you think is normal. Native speakers pause too.",
 "Learning a language is a long walk, not a race. Enjoy the view.",
 "Repeat out loud what you hear. Your mouth needs practice too.",
 "If it feels hard, that's where the growth is.",
 "Be present in this class. The next one can wait.",
 "Your future self will thank you for the five minutes you practice today.",
 "Write down one thing you learned this week. It's more than you think.",
 "Progress hides in routines. Keep showing up.",
 "Laugh at your mistakes. They make the best stories.",
 "Kindness to yourself is not laziness. It's how you keep going."
];
const SHEET="1GloP5CoJPf7T_tFnVV9lkIqLJvKnJ4bBPgnCtDrxKHc";
const now=new Date(), pad=n=>String(n).padStart(2,"0");
const today=now.getFullYear()+"-"+pad(now.getMonth()+1)+"-"+pad(now.getDate());
const day=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/864e5);
const box=document.getElementById("todayBox"); if(!box) return;
document.getElementById("tdDate").textContent=now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
let cur=null;
function show(w,th){
  if(w&&w[0]){ cur=w; document.getElementById("twWord").textContent=w[0]; document.getElementById("twMean").textContent=w[1]||""; document.getElementById("twEx").textContent=w[2]?"“"+w[2]+"”":"";
    const wo=document.getElementById("twWatch"); wo.textContent=w[3]||""; wo.hidden=!w[3]; }
  if(th) document.getElementById("ttText").textContent=th;
}
// read today's row from Noa's Google Sheet (JSONP, so no CORS issues)
function sheetRow(tab,cols){
  return new Promise((res,rej)=>{
    const cb="__csDaily"+tab+Date.now(); const sc=document.createElement("script");
    const t=setTimeout(()=>{ cleanup(); rej(new Error("timeout")); },7000);
    function cleanup(){ clearTimeout(t); try{ delete window[cb]; }catch(e){ window[cb]=undefined; } sc.remove(); }
    window[cb]=r=>{ cleanup(); try{ const row=r&&r.status==="ok"&&r.table.rows[0]; if(!row) return rej(new Error("no row")); res(row.c.map(c=>c&&c.v!=null?String(c.v):"")); }catch(e){ rej(e); } };
    sc.onerror=()=>{ cleanup(); rej(new Error("load")); };
    sc.src="https://docs.google.com/spreadsheets/d/"+SHEET+"/gviz/tq?tqx=responseHandler:"+cb+"&headers=1&sheet="+tab+"&tq="+encodeURIComponent("select "+cols+" where A = '"+today+"'");
    document.head.appendChild(sc);
  });
}
const CK="csdaily-"+today;
let cached=null; try{ cached=JSON.parse(localStorage.getItem(CK)||"null"); }catch(e){}
if(cached&&cached.w&&cached.t){ show(cached.w,cached.t); }
else {
  show(WOTD[day%WOTD.length],THOUGHTS[day%THOUGHTS.length]); // placeholder while loading
  (async()=>{
    let w=null,t=null;
    try{ w=await sheetRow("Words","B,C,D,E"); }catch(e){}
    try{ const r=await sheetRow("Thoughts","B"); t=r[0]; }catch(e){}
    if(!w||!t){ try{ const b=await (await fetch("daily-bank.json",{cache:"no-cache"})).json(); w=w||b.w[today]; t=t||b.t[today]; }catch(e){} }
    if(w||t) show(w,t);
    if(w&&t){ try{ Object.keys(localStorage).filter(k=>k.startsWith("csdaily-")).forEach(k=>localStorage.removeItem(k)); localStorage.setItem(CK,JSON.stringify({w,t})); }catch(e){} }
  })();
}
const sb=document.getElementById("twSay");
if(typeof canSpeak!=="undefined" && canSpeak){ sb.addEventListener("click",()=>{ if(cur) say(cur[0]+". "+(cur[2]||""),sb); }); } else sb.hidden=true;
/* Nov 26 2026: the button says when today's word is already in My notebook */
const svb=document.getElementById("twSave");
function savedMark(){ let has=false; try{ const n=x=>String(x||"").toLowerCase().replace(/[^a-z0-9' ]/g,"").trim(); const ws=JSON.parse(localStorage.getItem("ncs-words")||"[]"); has=!!(cur&&Array.isArray(ws)&&ws.some(x=>x&&n(x.w)===n(cur[0]))); }catch(e){}
  svb.classList.toggle("is-saved",has); svb.textContent=has?"✓ Saved to My notebook":"+ Save to My notebook"; svb.setAttribute("aria-pressed",has?"true":"false"); }
svb.addEventListener("click",()=>{ if(cur&&!svb.classList.contains("is-saved")) addWord(cur[0],cur[1],cur[2]); setTimeout(savedMark,50); });
savedMark(); setTimeout(savedMark,1500); setTimeout(savedMark,5000); setInterval(savedMark,15000);
window.addEventListener("storage",e=>{ if(e.key==="ncs-words") savedMark(); });
})();

(function(){ const s=document.getElementById("wSort"); if(!s) return; s.value=wSortMode; s.addEventListener("change",()=>{ wSortMode=s.value; try{ localStorage.setItem("cs-wsort",wSortMode); }catch(e){} renderWords(); }); })();
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
  window.addEventListener("appinstalled",()=>{ deferred=null; toast("🎉 Installed! Find Hibi on your home screen."); });
  function how(){
    const ua=navigator.userAgent||"", ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1), android=/Android/i.test(ua), safariMac=/Macintosh/.test(ua)&&/Safari/.test(ua)&&!/Chrome|Edg|Firefox/.test(ua);
    if(ios) return "<ol><li>Tap the <b>Share</b> button <span aria-hidden=\"true\">⬆︎</span> (at the bottom in Safari, or at the top in Chrome).</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. That's it!</li></ol>";
    if(android) return "<ol><li>Tap your browser's menu <b>⋮</b> (top right).</li><li>Tap <b>Install app</b> or <b>Add to Home screen</b>.</li><li>Tap <b>Install</b>.</li></ol>";
    if(safariMac) return "<ol><li>In the menu bar, click <b>File</b>.</li><li>Click <b>Add to Dock…</b></li></ol>";
    return "<ol><li>Look for the install icon <b>⊕</b> at the right end of the address bar and click it.</li><li>Or open the browser menu <b>⋮</b> and choose <b>Install Hibi</b> (in Edge: <b>Apps → Install this site as an app</b>).</li></ol>";
  }
  window.csInstall=async function(){
    if(standalone()){ csDialog('<h3 style="margin-top:0">📲 You\'re already in the app 🎉</h3><p>You opened Hibi from your home screen. Nothing else to do!</p>'); return; }
    if(deferred){ try{ deferred.prompt(); const r=await deferred.userChoice; deferred=null; if(r&&r.outcome==="accepted") return; }catch(e){} }
    csDialog('<h3 style="margin-top:0">📲 Get the Hibi app</h3><p>Add Hibi to your home screen. It opens like an app, full screen, with your words and notes right there.</p>'+how()+'<p class="muted" style="font-size:13.5px;margin-bottom:0">It\'s free and takes no space. Your words and notes stay synced with your account.</p>');
  };
  document.addEventListener("click",e=>{ if(e.target.closest("[data-install]")){ e.preventDefault(); window.csInstall(); } });
  // Settings panel: add an "Install the app" button
  function inject(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csInstallSec")) return;
    const secs=p.querySelectorAll(".cs-sec"), last=secs[secs.length-1]; if(!last) return;
    const sec=document.createElement("div"); sec.className="cs-sec"; sec.id="csInstallSec";
    sec.innerHTML='<h4>App</h4><button class="cs-reset" type="button" data-install style="text-align:left">📲 Install Hibi as an app</button><small style="color:var(--muted);font-size:12.5px">Opens from your home screen like a normal app.</small>';
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

/* ---------- Past simple question bank ----------
   one question per line:  sentence with ___ | right answer(s) / ... | 3 wrong options , , | why (optional) | Spanish hint (optional)
   empty "why" / "es" use the stage's default. */
const PS_STAGES=[
 {n:1, t:"Regular verbs", sub:"worked, stopped, studied", why:"Regular verbs add -ed in the past.", es:"Los verbos regulares agregan -ed en pasado.", q:`
Yesterday I ___ late at the office. (work)|worked|work,workt,working
We ___ a movie last night. (watch)|watched|watch,watcht,watching
She ___ her mom on Sunday. (call)|called|call,calls,calld
They ___ in Valparaíso for two years. (live)|lived|liveed,live,lives|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
I ___ English at school. (study)|studied|studyed,studed,study|Consonant + y → change the y to -ied.|Consonante + y → cambia la y por -ied.
The bus ___ in front of my house. (stop)|stopped|stoped,stopt,stop|Short verbs like stop double the last letter: stopped.|Verbos cortos como stop duplican la última letra.
He ___ video games all weekend. (play)|played|plaied,plaid,play|Vowel + y → just add -ed: played.|Vocal + y → solo agrega -ed.
We ___ for the bus for 20 minutes. (wait)|waited|waitted,wait,waitid
My brother ___ me with my homework. (help)|helped|helpt,help,helpped
I ___ the dishes after dinner. (wash)|washed|washt,wash,washid
She ___ when she saw the photo. (smile)|smiled|smileed,smile,smild|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
They ___ to Spain in 2019. (travel)|traveled/travelled|traveld,travel,travelt|Both traveled (US) and travelled (UK) are correct.|traveled (EE.UU.) y travelled (UK) están bien.
I ___ to a podcast on the way to work. (listen)|listened|listen,listend,listenned
He ___ the email this morning. (answer)|answered|answerd,answer,answerred
We ___ the party a lot. (enjoy)|enjoyed|enjoied,enjoy,enjoyd|Vowel + y → just add -ed: enjoyed.|Vocal + y → solo agrega -ed.
The baby ___ all night. (cry)|cried|cryed,cry,cryied|Consonant + y → change the y to -ied.|Consonante + y → cambia la y por -ied.
I ___ my phone and broke the screen. (drop)|dropped|droped,drop,dropt|Short verbs like drop double the last letter: dropped.|Verbos cortos como drop duplican la última letra.
She ___ to buy a new phone. (decide)|decided|decideed,decide,decidid|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
We ___ the whole apartment on Saturday. (clean)|cleaned|clean,cleand,cleanned
He ___ a new job last month. (start)|started|startted,start,startid
I ___ my grandparents in the south. (visit)|visited|visitted,visit,visitid|Visit doesn't double the t, because the stress is at the start: VIS-it.|Visit no duplica la t.
They ___ about the problem for hours. (talk)|talked|talk,talkt,talkked
The class ___ at 7 p.m. (finish)|finished|finisht,finish,finishd
We ___ a trip to the south. (plan)|planned|planed,plan,plannd|Short verbs like plan double the last letter: planned.|Verbos cortos como plan duplican la última letra.
She ___ the exam! (pass)|passed|past,pass,passd|"Past" isn't a verb. The past of pass is passed.|"Past" no es un verbo: el pasado de pass es passed.
He ___ me his new car. (show)|showed|showd,show,shown
They ___ the house blue. (paint)|painted|paintted,paint,paintid
I ___ off the light and went to sleep. (turn)|turned|turnned,turn,turnd
She ___ a pizza for dinner. (order)|ordered|orderred,order,orderd
We ___ the bus to the airport. (miss)|missed|mist,miss,missd|"Mist" sounds the same, but the past of miss is missed.|"Mist" suena igual, pero el pasado de miss es missed.
He ___ the door very quietly. (close)|closed|closeed,close,clossed|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
Someone ___ on the door. (knock)|knocked|knockt,knock,knoked
The kids ___ into the pool. (jump)|jumped|jumpt,jump,jumpped
She ___ really hard for the exam. (try)|tried|tryed,try,tryied|Consonant + y → change the y to -ied.|Consonante + y → cambia la y por -ied.
They ___ a new restaurant downtown. (open)|opened|openned,open,opend|Open doesn't double the n, because the stress is at the start: O-pen.|Open no duplica la n.
We ___ a lot at the party. (dance)|danced|danceed,dance,dancd|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
I ___ my phone last night. (charge)|charged|chargeed,charge,chargd|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
The dog ___ its tail when it saw me. (wag)|wagged|waged,wag,wagd|Short verbs like wag double the last letter: wagged.|Verbos cortos como wag duplican la última letra.
We ___ in a beautiful hotel. (stay)|stayed|staied,stay,stayd|Vowel + y → just add -ed: stayed.|Vocal + y → solo agrega -ed.
My friend ___ me to her party. (invite)|invited|inviteed,invite,invitted|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
She ___ her old clothes to charity. (donate)|donated|donateed,donate,donatted
The train ___ at 6 o'clock. (arrive)|arrived|arriveed,arrive,arrivd|If the verb ends in -e, just add -d.|Si el verbo termina en -e, solo agrega -d.
`},
 {n:2, t:"Irregular verbs", sub:"went, had, saw, made", why:"This verb is irregular, so it doesn't use -ed.", es:"Este verbo es irregular: no lleva -ed.", q:`
Last summer we ___ to the beach. (go)|went|goed,gone,go
I ___ a great time at the party. (have)|had|haved,has,have
She ___ a delicious cake for my birthday. (make)|made|maked,make,maded
They ___ a famous actor at the mall. (see)|saw|seed,seen,sawed
I ___ breakfast at 8. (eat)|ate|eated,eaten,eat
He ___ me a message last night. (send)|sent|sended,send,sented
We ___ the 10 o'clock bus. (take)|took|taked,taken,tooked
I ___ a new laptop. (buy)|bought|buyed,boughted,brought|Careful: bought comes from buy, brought comes from bring.|Ojo: bought = compré, brought = traje.
She ___ "hello" and smiled. (say)|said|sayed,say,sayd
My parents ___ me a bike for Christmas. (give)|gave|gived,given,gaved
I ___ really tired after work. (feel)|felt|feeled,feel,fell|Felt comes from feel. Fell is the past of fall.|felt = me sentí, fell = me caí.
He ___ home at midnight. (come)|came|comed,come,camed
We ___ an email to the company. (write)|wrote|writed,written,wroted
I ___ the answer! (know)|knew|knowed,known,new
She ___ her keys on the table. (leave)|left|leaved,leave,lefted
They ___ a lot of money on the trip. (spend)|spent|spended,spend,spented
I ___ my wallet at the restaurant. (lose)|lost|losed,loose,lose
He ___ the whole book in two days. (read)|read|readed,red,reads|The past of read is written "read" but it sounds like "red".|Se escribe read pero suena como "red".
We ___ on a bench at the park. (sit)|sat|sitted,set,sit
I ___ my best friend at a concert. (meet)|met|meeted,meet,metted
She ___ a beautiful song. (sing)|sang|singed,sung,sing
I ___ about you yesterday. (think)|thought|thinked,taught,think|Thought comes from think. Taught is the past of teach.|thought = pensé, taught = enseñé.
Our teacher ___ us a new grammar rule. (teach)|taught|teached,thought,teach|Taught comes from teach. Thought is the past of think.|taught = enseñó, thought = pensó.
He ___ his car to work. (drive)|drove|drived,driven,drive
The movie ___ at 9. (begin)|began|begined,begun,begin
I ___ really well last night. (sleep)|slept|sleeped,sleep,slep
We ___ coffee after class. (drink)|drank|drinked,drunk,drink
They ___ the match 3–1. (win)|won|winned,win,wined
I ___ my keys under the sofa. (find)|found|finded,find,founded
She ___ a beautiful dress to the wedding. (wear)|wore|weared,worn,wear
He ___ his leg skiing. (break)|broke|breaked,broken,brake
The kids ___ in the lake all afternoon. (swim)|swam|swimmed,swum,swim
I ___ the news on the radio. (hear)|heard|heared,hear,herd
She ___ me a funny story. (tell)|told|telled,tell,toll
We ___ the last train home. (catch)|caught|catched,catch,cought
He ___ really fast to catch the bus. (run)|ran|runned,run,runs
I ___ asleep on the sofa. (fall)|fell|falled,fallen,felt|Fell comes from fall. Felt is the past of feel.|fell = me caí / me quedé, felt = me sentí.
They ___ a new house last year. (build)|built|builded,build,builted
She ___ her bike to work. (ride)|rode|rided,ridden,ride
I ___ my umbrella at the café. (forget)|forgot|forgetted,forgotten,forget
He ___ the ball to the dog. (throw)|threw|throwed,thrown,through|"Through" sounds the same, but it isn't a verb.|"Through" suena igual, pero no es un verbo.
We ___ our tickets online. (get)|got|getted,gotten,get
I finally ___ the joke. (understand)|understood|understanded,understand,understooded
We ___ the red one. (choose)|chose|choosed,chosen,choose
`},
 {n:3, t:"Was / were", sub:"I was, they were", why:"I / he / she / it → was. You / we / they → were.", es:"I, he, she, it → was. You, we, they → were.", q:`
I ___ tired yesterday. (be)|was|were,am,be
They ___ at the party last night. (be)|were|was,are,been
You ___ so funny at the party last night! (be)|were|was,are,be|With "you", always use were, even for one person.|Con "you" siempre es were.
The movie last night ___ really boring. (be)|was|were,is,been
We ___ very hungry after the hike yesterday. (be)|were|was,are,be
My parents ___ in Chile last year. (be)|were|was,are,be
It ___ cold yesterday morning. (be)|was|were,is,be
She ___ born in 1995. (be)|was|were,is,has|"Be born" uses was / were: I was born, she was born.|"Nací" = I was born.
There ___ a lot of people at the concert last night. (be)|were|was,are,had|There were + plural (people).|There were + plural.
There ___ a problem with my phone yesterday. (be)|was|were,is,had|There was + singular (a problem).|There was + singular.
I ___ at home, I was at work. (not)|wasn't/was not|weren't,didn't,not was|The negative is wasn't (was not).|Negativo: wasn't = was not.
They ___ happy with the hotel last summer. (not)|weren't/were not|wasn't,didn't,not were|The negative is weren't (were not).|Negativo: weren't = were not.
___ you at home last night? (be)|Were|Was,Did,Are|In questions, put was / were first: Were you…?|En preguntas, was / were va primero.
___ yesterday's test difficult? (be)|Was|Were,Did,Is|In questions, put was / were first: Was the test…?|En preguntas, was / were va primero.
Where ___ you yesterday? (be)|were|was,did,are
Why ___ she so angry yesterday? (be)|was|were,did,is
The restaurant ___ open last Monday. (not)|wasn't/was not|weren't,didn't,isn't
My friends and I ___ late for class yesterday. (be)|were|was,are,did|"My friends and I" = we → were.|"My friends and I" = we → were.
How ___ your weekend? Did you do anything fun? (be)|was|were,did,is
The concert tickets ___ really expensive last year. (be)|were|was,are,did
I ___ born in Santiago. (be)|was|were,am,did|"Be born" uses was / were: I was born.|"Nací" = I was born.
___ your parents at the wedding last Saturday? (be)|Were|Was,Did,Are
He ___ at the meeting, he was sick. (not)|wasn't/was not|weren't,didn't,isn't
We ___ really excited before the trip. (be)|were|was,are,did
Yesterday I ___ to the gym. (go)|went|was go,was went,goed|For actions, use the past verb (went), not was + verb.|Para acciones usa el verbo en pasado, no "was go".
She ___ very nervous before her interview yesterday. (be)|was|were,did,is
The weather ___ perfect yesterday. (be)|was|were,is,did
My sister and her husband ___ in Spain last month. (be)|were|was,are,did|"My sister and her husband" = they → were.|"My sister and her husband" = they → were.
I ___ really happy with my results last semester. (be)|was|were,am,did
___ your last vacation expensive? (be)|Was|Were,Did,Is|In questions, put was / were first: Was it…?|En preguntas, was / were va primero.
The shops ___ closed last Sunday. (be)|were|was,are,did
We ___ late, we arrived on time. (not)|weren't/were not|wasn't,didn't,not were|The negative is weren't (were not).|Negativo: weren't = were not.
Who ___ at the door last night? (be)|was|were,did,is
How ___ your exams last week? (be)|were|was,did,are|Exams is plural → were.|Exams es plural → were.
___ your new classmates nice on the first day? (be)|Were|Was,Did,Are|In questions, put was / were first: Were your friends…?|En preguntas, was / were va primero.
She ___ at work yesterday, she was sick. (not)|wasn't/was not|weren't,didn't,isn't|The negative is wasn't (was not).|Negativo: wasn't = was not.
There ___ two cats in the garden yesterday. (be)|were|was,are,had|There were + plural (two cats).|There were + plural.
There ___ any milk in the fridge. (not)|wasn't/was not|weren't,didn't,isn't|Milk is uncountable → there wasn't.|Milk es incontable → wasn't.
What ___ the weather like yesterday? (be)|was|were,did,is
I ___ so tired that I went to bed at 9. (be)|was|were,did,am
The children ___ very quiet in class yesterday. (be)|were|was,did,are
It ___ my birthday last Saturday. (be)|was|were,did,is
`},
 {n:4, t:"Negatives", sub:"didn't go, didn't eat", why:"After didn't, use the base verb: didn't go, not didn't went.", es:"Después de didn't, el verbo va en forma base: didn't go.", q:`
I ___ to the party. (not / go)|didn't go/did not go|didn't went,don't went,not went
She ___ breakfast this morning. (not / eat)|didn't eat/did not eat|didn't ate,not ate,doesn't ate
We ___ the movie. (not / like)|didn't like/did not like|didn't liked,not liked,don't liked
They ___ the bus. (not / take)|didn't take/did not take|didn't took,not took,wasn't take
He ___ my message. (not / answer)|didn't answer/did not answer|didn't answered,not answered,wasn't answer
I ___ much last night. (not / sleep)|didn't sleep/did not sleep|didn't slept,wasn't sleep,not slept
You ___ me! (not / call)|didn't call/did not call|didn't called,not called,don't called
It ___ yesterday. (not / rain)|didn't rain/did not rain|didn't rained,wasn't rain,not rained
We ___ enough time. (not / have)|didn't have/did not have|didn't had,hadn't,not had
She ___ anything. (not / say)|didn't say/did not say|didn't said,not said,wasn't say
I ___ the answer. (not / know)|didn't know/did not know|didn't knew,not knew,wasn't know
They ___ to the meeting. (not / come)|didn't come/did not come|didn't came,not came,wasn't come
He ___ his homework. (not / do)|didn't do/did not do|didn't did,not did,wasn't do
I ___ any souvenirs. (not / buy)|didn't buy/did not buy|didn't bought,not bought,wasn't buy
We ___ each other at the concert. (not / see)|didn't see/did not see|didn't saw,not saw,wasn't see
She ___ the job. (not / get)|didn't get/did not get|didn't got,not got,wasn't get
My team ___ the game. (not / win)|didn't win/did not win|didn't won,not won,wasn't win
I ___ to bring my umbrella. (not / remember)|didn't remember/did not remember|didn't remembered,not remembered,wasn't remember
He ___ the lesson. (not / understand)|didn't understand/did not understand|didn't understood,not understood,wasn't understand
Fix it: "I didn't went to work." → I didn't ___ to work.|go|went,gone,goes
Fix it: "She didn't saw me." → She didn't ___ me.|see|saw,seen,sees
Fix it: "We not watched the game." → We ___ the game.|didn't watch/did not watch|not watched,don't watched,didn't watched|Use didn't + base verb, not just "not".|Usa didn't + verbo base, no solo "not".
I ___ my phone all day yesterday. (not / use)|didn't use/did not use|didn't used,not used,don't used
They ___ me about the party. (not / tell)|didn't tell/did not tell|didn't told,not told,don't told
She ___ well, so she stayed home. (not / feel)|didn't feel/did not feel|didn't felt,not felt,wasn't feel
I ___ the movie. It was boring. (not / enjoy)|didn't enjoy/did not enjoy|didn't enjoyed,not enjoyed,wasn't enjoy
She ___ to the gym last week. (not / go)|didn't go/did not go|didn't went,not went,wasn't go
We ___ dinner last night, we ordered sushi. (not / cook)|didn't cook/did not cook|didn't cooked,not cooked,wasn't cook
He ___ his keys anywhere. (not / find)|didn't find/did not find|didn't found,not found,wasn't find
They ___ the driving test. (not / pass)|didn't pass/did not pass|didn't passed,not passed,wasn't pass
I ___ you with your new haircut! (not / recognize)|didn't recognize/did not recognize|didn't recognized,not recognized,wasn't recognize
The phone ___ all day yesterday. (not / ring)|didn't ring/did not ring|didn't rang,not rang,wasn't ring
We ___ a taxi, we walked. (not / take)|didn't take/did not take|didn't took,not took,wasn't take
He ___ time for breakfast today. (not / have)|didn't have/did not have|didn't had,hadn't,not had
I ___ to be rude. (not / want)|didn't want/did not want|didn't wanted,not wanted,wasn't want
Fix it: "He didn't knew the answer." → He didn't ___ the answer.|know|knew,known,knows
Fix it: "They didn't went home." → They didn't ___ home.|go|went,gone,goes
Fix it: "I no understood." → I ___.|didn't understand/did not understand|no understood,not understood,didn't understood|In English, use didn't + base verb, not "no".|En inglés se usa didn't + verbo base, no "no".
My parents ___ TV last night. (not / watch)|didn't watch/did not watch|didn't watched,not watched,wasn't watch
The hotel ___ much money. (not / cost)|didn't cost/did not cost|didn't costed,not cost,wasn't cost
She ___ me about the change. (not / tell)|didn't tell/did not tell|didn't told,not told,wasn't tell
`},
 {n:5, t:"Questions", sub:"Did you…? Where did you…?", why:"Questions: Did + person + base verb. Did you go? Where did you go?", es:"Preguntas: Did + persona + verbo base.", q:`
___ you go to the gym yesterday?|Did|Do,Was,Were
Did she ___ the email? (send)|send|sent,sends,sending|After Did, use the base verb: Did she send…?|Después de Did, el verbo va en forma base.
___ they like the food at the party?|Did|Do,Were,Was
Did you ___ a good time? (have)|have|had,has,having|After Did, use the base verb: Did you have…?|Después de Did, el verbo va en forma base.
Where ___ last summer? (you / go)|did you go|did you went,you went,were you go
What ___ for dinner? (you / eat)|did you eat|did you ate,you ate,were you eat
When ___? (the movie / start)|did the movie start|did the movie started,the movie started,was the movie start
Who ___ at the party? (you / see)|did you see|did you saw,you saw,were you see
Why ___ early? (she / leave)|did she leave|did she left,she left,was she leave
How ___ there? (they / get)|did they get|did they got,they got,were they get
___ he call you back yesterday?|Did|Was,Does,Were
Did they ___ the game? (win)|win|won,wins,winned|After Did, use the base verb: Did they win…?|Después de Did, el verbo va en forma base.
What time ___ up? (you / wake)|did you wake|did you woke,you woke,were you wake
Did you ___ my message? (get)|get|got,gets,getting|After Did, use the base verb: Did you get…?|Después de Did, el verbo va en forma base.
___ you tired after the trip last weekend? (be)|Were|Did,Was,Do|With be (tired, happy, at home…), don't use did: Were you tired?|Con "be" no se usa did: Were you…?
___ the hotel nice last summer? (be)|Was|Did,Were,Does|With be (nice, big, open…), don't use did: Was the hotel nice?|Con "be" no se usa did: Was it…?
What ___ you do last weekend?|did|do,were,was
Where ___ you born? (be)|were|did,was,are|"Be born" uses was / were: Where were you born?|"¿Dónde naciste?" = Where were you born?
How long ___ there? (you / stay)|did you stay|did you stayed,you stayed,were you stay
Did she ___ you about her new job? (tell)|tell|told,tells,telling|After Did, use the base verb: Did she tell…?|Después de Did, el verbo va en forma base.
Fix it: "Did you saw the news?" → Did you ___ the news?|see|saw,seen,sees|After Did, use the base verb: Did you see…?|Después de Did, el verbo va en forma base.
Fix it: "Where you went?" → Where ___?|did you go|you went,did you went,went you
___ it rain yesterday?|Did|Was,Does,Were
What ___ she say yesterday?|did|was,does,were
How much ___? (it / cost)|did it cost|did it costed,it cost,was it cost
Which restaurant ___? (you / choose)|did you choose|did you chose,you chose,were you choose
___ you sleep well last night?|Did|Do,Were,Was
Did you ___ the movie? (like)|like|liked,likes,liking|After Did, use the base verb: Did you like…?|Después de Did, el verbo va en forma base.
What ___ you buy at the store yesterday?|did|do,were,was
Where ___ you first meet your best friend?|did|were,do,was
Who ___ you go with last night?|did|were,do,was
Did they ___ on time? (arrive)|arrive|arrived,arrives,arriving|After Did, use the base verb: Did they arrive…?|Después de Did, el verbo va en forma base.
How ___ the trip last month? (be)|was|did,were,is|With be (how was…), don't use did.|Con "be" no se usa did.
When ___? (you / arrive)|did you arrive|did you arrived,you arrived,were you arrive
What ___ for your birthday? (you / get)|did you get|did you got,you got,were you get
Why ___ his job? (he / quit)|did he quit|did he quitted,he quit,was he quit
How many people ___ to the party? (come)|came|did come,come,comes|"How many people" is the subject here, so no did: How many people came?|Si preguntas por quién hizo la acción, no usas did.
Did it ___ a lot in the mountains? (snow)|snow|snowed,snows,snowing|After Did, use the base verb: Did it snow…?|Después de Did, el verbo va en forma base.
___ you at the meeting yesterday? (be)|Were|Did,Was,Do|With be (at the meeting), use Were you…?, not Did.|Con "be" no se usa did.
Fix it: "Did she went to class?" → Did she ___ to class?|go|went,goes,gone|After Did, use the base verb.|Después de Did, el verbo va en forma base.
Fix it: "What you did last night?" → What ___ last night?|did you do|you did,did you did,you do
Where ___ your vacation? (you / spend)|did you spend|did you spent,you spent,were you spend
`},
 {n:6, t:"Mix it up", sub:"everything together + fix the mistake", why:"", es:"", q:`
Last year I ___ to Peru. (travel)|traveled/travelled|travel,was travel,traveling|Regular verb: add -ed.|Verbo regular: agrega -ed.
She ___ the bus this morning. (not / take)|didn't take/did not take|didn't took,wasn't take,not took|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
___ you at work yesterday? (be)|Were|Did,Was,Do|With be (at work), use Were you…?, not Did.|Con "be" no se usa did.
We visited the museum three days ___.|ago|before,last,past|Use "ago" after an amount of time: three days ago.|"three days ago" = hace tres días.
I ___ him last week. (meet)|met|meeted,meet,was meet|Meet is irregular: met.|Meet es irregular: met.
What did you do ___ weekend?|last/this/that|the last,past,ago|Say "last weekend", not "the last weekend".|"el fin de semana pasado" = last weekend.
They ___ very happy with the results last year. (be)|were|was,did,are|They → were.|They → were.
He ___ his keys yesterday. (lose)|lost|losed,was lose,loosed|Lose is irregular: lost.|Lose es irregular: lost.
___ she like the gift you gave her yesterday?|Did|Was,Does,Is|Did + person + base verb: Did she like…?|Did + persona + verbo base.
I ___ busy, so I didn't call you. (be)|was|were,did,am|I → was.|I → was.
We ___ dinner at home last night. (have)|had|haved,have,was have|Have is irregular: had.|Have es irregular: had.
Fix it: "I was go to the supermarket." → I ___ to the supermarket.|went|was go,was went,goed|For actions, use the past verb (went), not was + verb.|Para acciones usa el verbo en pasado, no "was go".
Fix it: "He didn't came to class." → He didn't ___ to class.|come|came,comed,comes|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Fix it: "Did you enjoyed the trip?" → Did you ___ the trip?|enjoy|enjoyed,enjoys,was enjoy|After Did, use the base verb.|Después de Did, el verbo va en forma base.
Fix it: "They was at the beach." → They ___ at the beach. (be)|were|was,did,are|They → were.|They → were.
Fix it: "I studyed a lot." → I ___ a lot.|studied|studyed,study,studed|Consonant + y → -ied: studied.|Consonante + y → -ied.
I ___ English when I was a kid. (not / study)|didn't study/did not study|didn't studied,wasn't study,not studied|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
How ___ the concert last night? (be)|was|did,were,is|The concert (it) → was.|The concert (it) → was.
She sent me a message ___ night.|last/that|yesterday,ago,the last|Say "last night" (but "yesterday morning").|anoche = last night.
I ___ you at the party! Where were you? (not / see)|didn't see/did not see|didn't saw,wasn't see,not saw|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Where ___ before Santiago? (you / live)|did you live|did you lived,you lived,were you live|Where + did + person + base verb.|Where + did + persona + verbo base.
It ___ a great day at the beach yesterday. (be)|was|were,did,is|It → was.|It → was.
My sister ___ a new car last month. (buy)|bought|buyed,brought,was buy|Buy is irregular: bought (brought comes from bring).|bought = compró, brought = trajo.
___ they finish the project on time last month?|Did|Were,Was,Do|Did + person + base verb: Did they finish…?|Did + persona + verbo base.
We ___ to the radio while we cooked. (listen)|listened|listen,were listen,listenned|Regular verb: add -ed.|Verbo regular: agrega -ed.
I finished my homework ___ evening.|yesterday/this/that|before,ago,past|Say "yesterday evening", "yesterday morning" (but "last night").|ayer en la tarde = yesterday evening.
I ___ to the party because I was sick. (not / go)|didn't go/did not go|didn't went,wasn't go,not went|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
We ___ really tired after the trip last weekend. (be)|were|was,did,are|We → were.|We → were.
She ___ me a gift for my birthday. (give)|gave|gived,given,was give|Give is irregular: gave.|Give es irregular: gave.
___ you enjoy the concert last night?|Did|Were,Was,Do|Did + person + base verb: Did you enjoy…?|Did + persona + verbo base.
They moved to Chile ten years ___.|ago|before,last,past|Use "ago" after an amount of time: ten years ago.|"ten years ago" = hace diez años.
He ___ English very fast. (learn)|learned/learnt|learn,was learn,learnd|Learned (US) and learnt (UK) are both correct.|learned y learnt están bien.
How ___ your first day at work yesterday? (be)|was|did,were,is|Your first day (it) → was.|Your first day (it) → was.
Fix it: "Yesterday I go to the beach." → Yesterday I ___ to the beach.|went|go,goed,was go|With yesterday, use the past: went.|Con yesterday, usa el pasado: went.
Fix it: "We was at home." → We ___ at home. (be)|were|was,did,are|We → were.|We → were.
Fix it: "Did they won the game?" → Did they ___ the game?|win|won,wins,winned|After Did, use the base verb.|Después de Did, el verbo va en forma base.
I ___ the email, so I didn't know about the meeting. (not / read)|didn't read/did not read|didn't readed,wasn't read,not read|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Where ___ your parents born? (be)|were|did,was,are|"Be born" uses was / were: Where were your parents born?|"¿Dónde nacieron?" = Where were they born?
We stayed at home ___ weekend because it rained.|last/this/that|the last,past,ago|Say "last weekend", not "the last weekend".|el fin de semana pasado = last weekend.
It ___ two hours to get there. (take)|took|taked,was take,takes|Take is irregular: took.|Take es irregular: took.
What ___ you think of the movie last night?|did|were,was,do|What + did + person + base verb.|What + did + persona + verbo base.
I ___ my homework before dinner. (finish)|finished|finish,was finish,finisht|Regular verb: add -ed.|Verbo regular: agrega -ed.
`},
 {n:7, t:"Tell the story", sub:"real stories with 10 blanks", story:true, why:"Read the whole sentence: the story tells you which form you need.", es:"Lee toda la oración: la historia te dice qué forma necesitas.", q:`
#A weekend in Valparaíso
Last weekend, my friends and I ___ to Valparaíso. (go)|went|goed,go,was go
We ___ the bus from Santiago at 8 a.m. (take)|took|taked,take,taken
The trip ___ about two hours. (be)|was|were,did,is
When we arrived, it ___ a little cold. (be)|was|were,did,is
First, we ___ around the hills and took photos. (walk)|walked|walk,walkt,was walk
At lunch, we ___ seafood at a small restaurant. (eat)|ate|eated,eaten,eat
I ___ the empanadas, they were too spicy for me. (not / like)|didn't like/did not like|didn't liked,not liked,wasn't like
In the afternoon, we ___ a funicular to the top of a hill. (ride)|rode|rided,ridden,ride
My friend asked me, "___ you enjoy the day?"|Did|Were,Do,Was
We ___ home late, tired but happy. (get)|got|getted,gotten,get
#My first job interview
Last month, I ___ my first job interview in English. (have)|had|haved,has,have
I ___ very nervous before it started. (be)|was|were,did,am
The night before, I ___ a lot about the company. (read)|read|readed,red,reads
I ___ much that night. (not / sleep)|didn't sleep/did not sleep|didn't slept,wasn't sleep,not slept
In the morning, I ___ my best shirt. (wear)|wore|weared,worn,wear
The interviewer ___ me about my last job. (ask)|asked|askt,ask,askd
"Why ___ that job?" she asked. (you / leave)|did you leave|did you left,you left,were you leave
I ___ her the truth: I wanted to grow. (tell)|told|telled,tell,toll
The interview ___ really well. (go)|went|goed,gone,was go
Two days later, they ___ me with good news! (call)|called|call,calld,was call
#The lost dog
On Saturday morning, my neighbor's dog ___ away. (run)|ran|runned,run,runs
The gate ___ open, so he escaped. (be)|was|were,did,is
My neighbor ___ really worried. (be)|was|were,did,is
We ___ for him everywhere in the neighborhood. (look)|looked|lookt,look,was look
We ___ him at the park or at the shops. (not / find)|didn't find/did not find|didn't found,not found,wasn't find
Then, a woman ___ a photo of him on Instagram. (post)|posted|postted,post,postid
She ___ him near the bakery. (see)|saw|seed,seen,sawed
"Where ___ him?" my neighbor asked her. (you / see)|did you see|did you saw,you saw,were you see
We ___ to the bakery as fast as we could. (drive)|drove|drived,driven,drive
The dog ___ there, eating a croissant! (be)|was|were,did,is
#A really bad day
Yesterday ___ a terrible day. (be)|was|were,did,is
My alarm ___, so I woke up late. (not / ring)|didn't ring/did not ring|didn't rang,not rang,wasn't ring
I ___ breakfast because I was in a hurry. (not / have)|didn't have/did not have|didn't had,hadn't,not had
I ___ all the way to the metro station. (run)|ran|runned,run,was run
When I ___ at work, my boss was waiting for me. (arrive)|arrived|arrive,arrivd,was arrive
"Why ___ late?" he asked. (you / be)|were you|did you,was you,you were
At lunch, I ___ coffee on my new shirt. (spill)|spilled/spilt|spill,spilld,was spill
In the afternoon, my computer ___ working. (stop)|stopped|stoped,stop,stopt
I ___ home at 8 p.m., really tired. (get)|got|getted,gotten,get
But then my roommate ___ pizza for dinner, so the day ended well! (make)|made|maked,make,maded
`},
 {n:8, adv:true, t:"Advanced: used to, wishes & polite past", sub:"used to vs would, If I had…, I was wondering…", why:"Past forms at B2–C1: past habits, the earlier past and the 'unreal' past.", es:"Formas del pasado nivel B2–C1: hábitos pasados, el pasado anterior y el pasado 'irreal'.", q:`
When I was a kid, I ___ play outside every day. (past habit)|used to/would|use to,was used to,am used to|Past habits: used to (or would).|Hábitos del pasado: used to (o would).
I ___ have long hair, but now it's short. (past state)|used to|would,use to,was used to|For past states (have, be, live), use used to, not would.|Para estados del pasado (have, be, live), usa used to, no would.
___ you use to live in Valparaíso?|Did|Do,Were,Have|Question: Did you use to…? (no -d on use).|Pregunta: Did you use to…? (use sin -d).
It's late. It's time we ___ home. (go)|went|will go,going,gone|It's time + person + past simple = we should do it now.|It's time + persona + past simple = deberíamos hacerlo ya.
If I ___ more time, I'd travel more. (have)|had|have,would have,will have|Second conditional: if + past simple, would + verb.|Segundo condicional: if + past simple, would + verbo.
I wish I ___ how to swim. (know)|knew|know,would know,have known|Wish about now → past simple.|Wish sobre el presente → past simple.
I'd rather you ___ tell anyone.|didn't|doesn't,won't,not|I'd rather + person + past simple.|I'd rather + persona + past simple.
I ___ if you could help me with something. (wonder, polite)|was wondering/wondered/~wonder|am wonder,wonders,was wonder|Past forms sound more polite: I was wondering if…|El pasado suena más amable: I was wondering if…
I ___ to call you, but I forgot. (mean)|meant|meaned,mean,have meant|Mean → meant.|Mean → meant.
She ___ her keys, so she couldn't get in. (lose)|had lost/lost|has lost,loses,was lose|Something that happened before another past moment → past perfect (or past simple).|Algo que pasó antes de otro momento pasado → past perfect (o past simple).
By the time we arrived, the movie ___. (start)|had started/had already started/~started|has started,starts,was start|Before another past moment → past perfect.|Antes de otro momento pasado → past perfect.
I ___ dinner when the lights went out. (cook)|was cooking|cooked,am cooking,have cooked|Background action (in progress) → past continuous; the interruption → past simple.|Acción de fondo (en progreso) → past continuous; la interrupción → past simple.
`}
];
PS_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"ps"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"ps"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
/* ---------- Test out: tricky questions (all typed) ---------- */
const PS_TEST=`
Who ___ you last night? (call)|called|When "who" is the person doing the action, don't use did: Who called you?
What ___ at the meeting? (happen)|happened|"What" is the subject here, so no did: What happened?
Who ___ the cake? It was delicious! (make)|made|"Who" is the person doing the action, so no did: Who made the cake?
There ___ a lot of traffic yesterday morning. (be)|was|Traffic is uncountable, so: there was.
Everybody ___ really happy at the party last night. (be)|was|Everybody is singular: everybody was.
The news last night ___ really surprising. (be)|was|News is uncountable: the news was.
My new jeans ___ too small, so I returned them. (be)|were|Jeans are plural: they were.
She ___ coffee to tea when she was younger. (prefer)|preferred|The stress is at the end (pre-FER), so double the r: preferred.
The accident ___ on a Monday night. (occur)|occurred|The stress is at the end (oc-CUR), so double the r: occurred.
He ___ when he saw the spider. (panic)|panicked|Verbs that end in -ic add -ked: panicked.
I ___ the bill last week. (pay)|paid|Pay is irregular: paid (not payed).
The police ___ the thief two blocks away. (catch)|caught|catch → caught.
They ___ for their rights for many years. (fight)|fought|fight → fought.
She ___ with the problem really well yesterday. (deal)|dealt|deal → dealt.
The price of the tickets ___ a lot last year. (rise)|rose|rise → rose (risen is the participle).
I'm sorry, I ___ to hurt you. (not / mean)|didn't mean/did not mean|After didn't, use the base verb: didn't mean.
She ___ the bus because she woke up late. (not / catch)|didn't catch/did not catch|After didn't, use the base verb: didn't catch.
Why ___ me back? (you / not / call)|didn't you call/did you not call|Negative questions: Why didn't you call me back?
How long ago ___ to Santiago? (you / move)|did you move|Did + person + base verb: How long ago did you move…?
What time ___ yesterday? (the store / close)|did the store close|Did + subject + base verb: did the store close.
I ___ my keys on the table, and now they're gone! (put)|put|Put doesn't change: put – put – put.
That shirt ___ a lot of money, so I didn't buy it. (cost)|cost|Cost doesn't change: cost – cost – cost.
The baby ___ at 3 a.m. and didn't go back to sleep. (wake up)|woke up|wake up → woke up.
We ___ the whole night talking. (spend)|spent|spend → spent.
She ___ me she was tired. (tell)|told|tell → told.
He ___ his phone into the pool by accident. (drop)|dropped|Short verbs like drop double the last letter: dropped.
The kids ___ in the garden all afternoon. (lie)|lay|lie (= acostarse) → lay. Tricky!
I ___ English for three years when I was at school. (study)|studied|Consonant + y → -ied: studied.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"pst-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Vocabulary sets (drafted for Noa to review) ----------
   word | simple meaning | example with the word in [brackets] */
const VOC_SETS=[
 {id:"expr", ico:"💬", t:"Everyday expressions", sub:"feel like, no big deal, catch up…", w:`
feel like|to want to do something|I don't [feel like] cooking tonight.
make sense|to be easy to understand|Does this explanation [make sense]?
take your time|don't hurry|No rush, [take your time].
no big deal|not important or serious|Don't worry, it's [no big deal].
it depends|the answer changes in different situations|Do I like coffee? [It depends] on the day.
I'm in|I want to join|Pizza tonight? [I'm in]!
sounds good|I agree with that plan|Meet at 7? [Sounds good/~Sounds great].
hang out|to spend free time with someone|Do you want to [hang out/~meet up] this weekend?
catch up|to talk with someone after a long time|Let's get coffee and [catch up].
on my way|going there right now|I'm [on my way], see you in 10 minutes.
by the way|used to add a new topic|[By the way], did you see the game?
make up your mind|to decide|You need to [make up your mind] soon.
`},
 {id:"phrasal", ico:"🏃", t:"Everyday phrasal verbs", sub:"wake up, find out, give up…", w:`
wake up|to stop sleeping|I need to [wake up/~get up] early tomorrow.
get up|to get out of bed|On Sundays, I like to [get up/~wake up] late.
turn on|to start a machine or a light|Can you [turn on/switch on] the light, please?
turn off|to stop a machine or a light|Don't forget to [turn off/switch off] the TV.
look for|to try to find something|I have to [look for] my keys again.
find out|to discover information|I want to [find out/~discover] what happened.
give up|to stop trying|Don't [give up/~quit]! You're almost there.
pick up|to go and get someone or something|Can you [pick up/~get] the kids from school?
put on|to start wearing clothes|It's cold, so [put on/~wear] a jacket.
take off|to remove clothes or shoes|Please [take off/remove] your shoes at the door.
run out of|to have no more of something|We always [run out of] coffee on Mondays.
figure out|to understand or solve something|I can't [figure out/~solve] this math problem.
`},
 {id:"travel", ico:"✈️", t:"Travel", sub:"luggage, layover, check in…", w:`
book|to reserve a room, a ticket or a table|I want to [book/reserve] a hotel near the beach.
luggage|the bags you take on a trip|My [luggage/baggage] was too heavy.
boarding pass|the ticket you show to get on a plane|Please have your [boarding pass] ready.
check in|to arrive and register at a hotel or an airport|We can [check in] at the hotel after 3 p.m.
delayed|later than planned|Our flight was [delayed] by two hours.
sightseeing|visiting famous places as a tourist|We spent the whole day [sightseeing].
souvenir|something you buy to remember a place|I bought a [souvenir] for my mom.
round trip|a trip to a place and back again|A [round trip] ticket is usually cheaper.
layover|a short stop between two flights|We had a three-hour [layover] in Lima.
get lost|to not know where you are|It's easy to [get lost] in a big city.
local|from the place you are visiting|We ate at a [local] restaurant.
itinerary|a plan of the places you will visit|Our [itinerary] includes three cities.
`},
 {id:"work", ico:"💼", t:"English at work", sub:"deadline, feedback, follow up…", w:`
deadline|the last day or time to finish something|The [deadline] for the report is Friday.
meeting|when people get together to talk about work|I have a [meeting] with my boss at 10.
schedule|a plan of when things will happen|Let me check my [schedule] for next week.
feedback|comments about how well you did something|My manager gave me great [feedback].
colleague|a person you work with|My [colleague/coworker/co-worker] helped me with the project.
task|a piece of work you need to do|My first [task] today is answering emails.
follow up|to contact someone again about something|I'll [follow up] with the client tomorrow.
reach out|to contact someone to ask or offer something|Feel free to [reach out] if you have questions.
set up|to organize or prepare something|Can we [set up/~arrange/~organize] a call for Thursday?
on track|going as planned|Don't worry, the project is [on track].
skill|something you are good at because you practiced it|Communication is an important [skill].
update|new information about something|Can you give me an [update] on the project?
`},
 {id:"pairs", ico:"🔀", t:"Confusing word pairs", sub:"fun vs funny, say vs tell, borrow vs lend…", np:true, w:`
fun|enjoyable, a good time|We had a lot of [fun] at the beach.|funny,funnily,fan
funny|it makes you laugh|Why are you laughing? What's so [funny]?|fun,funnily,fan
say|to speak words (you say something)|What did she [say] about the trip?|tell,talk,speak
tell|to give information to a person (you tell someone something)|Can you [tell] me the time?|say,talk,speak
finish|to complete something you are doing|I need to [finish] my homework before dinner.|end,ended,ending
end|the last part of something|I cried at the [end] of the movie.|finish,final,finishing
grow|to get bigger, like a child or a plant|My daughter is [growing] so fast!|increasing,raising,rising
increase|to go up in number or amount|Prices [increased/~went up/~rose/~grew] by 10% last year.|raised,growed,increasing
bet|to risk money on what will happen (also: I bet = I'm sure)|I [bet] you can't eat ten tacos!|gamble,bets,betting
gamble|to play games of chance for money, like in a casino|He lost all his money because he loved to [gamble/~bet].|gambling,gambles,gambled
borrow|to take something and give it back later|Can I [borrow] your pen?|lend,lent,borrowing
lend|to give something to someone for a short time|Can you [lend] me 5,000 pesos?|borrow,borrowed,lending
remember|to keep something in your mind|I can't [remember] his name.|remind,reminded,remembering
remind|to make someone remember something|Please [remind] me to call my mom.|remember,remembered,reminding
lose|to not have something anymore, or to not win|Don't [lose] your keys again!|miss,loose,lost
miss|to be too late for something, or to feel sad someone isn't there|Hurry up or we'll [miss] the bus!|lose,loose,lost
make|to create or build something|Did you [make] a mistake?|do,done,making
do|to complete a task or an activity|I have to [do] my homework.|make,made,doing
hear|sounds come to your ears (no effort)|Can you [hear] me? The connection is bad.|listen,listening,listened
listen|to pay attention to sounds|I love to [listen] to podcasts.|hear,heard,listening
`},
 {id:"pets", ico:"🐶", t:"Pets and animals", sub:"fur, paw, leash, vet, groomer…", w:`
pet|an animal you keep at home|We can't have a [pet/~dog/~cat] in our apartment. It's not allowed.|pets,petting,fur
puppy|a baby dog|Our dog had six [puppies/~pups/~babies] last week!|kittens,puppy,puppys
kitten|a baby cat|My cat had four [kittens/~babies] this morning.|puppies,kitten,kittys
fur|the soft hair on an animal's body (for people, we say hair)|Look at that dog, he looks great with his fluffy [fur].|furry,feathers,scales
paw|an animal's foot, like a dog's or a cat's|"Good boy! Give me your [paw]," I said to my dog.|tail,fur,bark
tail|the long part at the back of an animal's body|My dog wags his [tail] when he's happy.|paw,fur,leash
bark|to make the loud sound a dog makes|Our neighbor's dog [barks] all night.|meows,purrs,barking
purr|to make the soft sound a happy cat makes|My cat [purrs] when I pet her.|barks,purr,purring
feed|to give food to an animal|Can you [feed] the cat while I'm on vacation?|food,fed,feeding
leash|a long strap you use to walk a dog|In the park, dogs must be on a [leash/lead].|collar,paw,bowl
collar|a band that an animal wears around its neck|My dog wears a red [collar] around his neck.|muzzle,bowl,tail
muzzle|a cover over a dog's mouth so it can't bite|He bites, so he has to wear a [muzzle] over his mouth.|collar,leash,fur
vet|an animal doctor|My dog is sick, so I'm taking him to the [vet/~veterinarian/~vet's].|veterinary,groom,collar
groomer|a person who washes a pet and cuts its fur|Every month, I take my dog to the [groomer/~groomer's/~dog groomer] for a bath and a haircut.|grooming,groom,leash
adopt|to take an animal from a shelter and give it a home|We [adopted/~got/~rescued] our cat from an animal shelter.|adapted,adopt,adoption
shelter|a place that takes care of animals with no home|There are many dogs at the [shelter] waiting for a family.|shelf,cage,collar
neuter|to do an operation so a male animal can't make babies|The vet [neutered/~castrated/~fixed] our male cat last week.|spayed,neutral,neutering
spay|to do an operation so a female animal can't have babies|We had our female dog [spayed/~fixed/~neutered] so she can't have puppies.|sprayed,spay,spaying
`}
];
VOC_SETS.forEach(set=>{
  set.items=set.w.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); const alt=((p[2].match(/\[[^\]\/]+\/([^\]]*)\]/)||[])[1]||"").split("/").filter(Boolean); return {w:p[0], def:p[1], ex:p[2].replace(/\[([^\]\/]+)\/[^\]]*\]/,"[$1]"), alt, i, wr:p[3]?p[3].split(",").map(x=>x.trim()):null}; });   /* [turn on/switch on]: other right answers; ~ = right but not this word */ delete set.w;
  const n=set.items.length;
  set.qs=[];
  set.items.forEach((it,i)=>{
    const others=[1,2,3].map(k=>set.items[(i+k*3)%n]);
    set.qs.push({id:"v-"+set.id+"-"+i+"-m", st:0, mco:true, q:"“"+it.w+"” means ___.", a:[it.def], o:others.map(x=>x.def), why:"“"+it.w+"” = "+it.def+". Example: "+it.ex.replace(/[\[\]]/g,""), es:"", voc:set.id});
    const m=it.ex.match(/\[([^\]]+)\]/), ans=m?m[1]:it.w;
    set.qs.push({id:"v-"+set.id+"-"+i+"-c", st:0, q:it.ex.replace(/\[[^\]]+\]/,"___")+(set.np?"":" (= "+it.def+")"), a:[ans].concat(it.alt), o:it.wr||others.map(x=>{ const mm=x.ex.match(/\[([^\]]+)\]/); return /^[A-Z]/.test(ans)? x.w.charAt(0).toUpperCase()+x.w.slice(1) : x.w; }), why:"“"+it.w+"” = "+it.def+".", es:"", voc:set.id});
  });
});

/* ---------- Present perfect question bank (same format as the past simple) ---------- */
const PP_STAGES=[
 {n:1, t:"Have / has + verb", sub:"I have worked, she has finished", why:"Present perfect = have / has + past participle. I / you / we / they have, he / she / it has.", es:"have / has + participio. I have worked, she has worked.", q:`
I ___ in Santiago for ten years. (live)|have lived/~lived/have been living|has lived,have live,am live
She ___ her homework. (finish)|has finished/~finished|have finished,has finishing,has finish
We ___ this movie before. (watch)|have watched/~watched|has watched,have watching,have watch
He ___ a new job. (start)|has started/~started|have started,has starting,has start
They ___ to Chile three times. (travel)|have traveled/have travelled/~traveled/~travelled|has traveled,have traveling,have travel
I ___ my mind. (change)|have changed/~changed|has changed,have changing,have change
My sister ___ a cake for us. (bake)|has baked/~baked|have baked,has baking,has bake
You ___ a lot this year. (improve)|have improved/~improved|has improved,have improving,have improve
The train ___. (arrive)|has arrived/~arrived|have arrived,has arriving,has arrive
It ___ all week. (rain)|has rained/~rained|have rained,has raining,has rain
We ___ the whole house. (clean)|have cleaned/~cleaned|has cleaned,have cleaning,have clean
My parents ___ a new sofa. (order)|have ordered/~ordered|has ordered,have ordering,have order
He ___ smoking. (stop)|has stopped/~stopped|have stopped,has stoped,has stop|Stop doubles the p: has stopped.|Stop duplica la p: stopped.
I ___ really hard for this exam. (study)|have studied/~studied|has studied,have studyed,have study|Consonant + y → -ied: studied.|Consonante + y → -ied.
She ___ us to her wedding. (invite)|has invited/~invited|have invited,has inviting,has invite
The kids ___ outside all afternoon. (play)|have played/~played|has played,have playing,have play
Our team ___ very hard this season. (try)|has tried/~tried|have tried,has tryed,has try|"Our team" is one group → has.|"Our team" = it → has.
I ___ to your message. (reply)|have replied/~replied|has replied,have replyed,have reply
Prices ___ a lot this year. (increase)|have increased/~increased|has increased,have increasing,have increase|Prices is plural → have.|Prices = they → have.
The company ___ ten new people. (hire)|has hired/~hired|have hired,has hiring,has hire
You ___ the right answer! (guess)|have guessed/~guessed|has guessed,have guessing,have guess
My brother ___ to Canada. (move)|has moved/~moved|have moved,has moving,has move
We ___ three trips this year. (plan)|have planned/~planned|has planned,have planed,have plan|Plan doubles the n: planned.|Plan duplica la n: planned.
She ___ English for two years. (learn)|has learned/has learnt/~learned/~learnt|have learned,has learning,has learn
I ___ my grandmother twice this week. (call)|have called/~called|has called,have calling,have call
The weather ___ a lot today. (change)|has changed/~changed|have changed,has changing,has change
They ___ the date of the party. (confirm)|have confirmed/~confirmed|has confirmed,have confirming,have confirm
He ___ about this for weeks. (talk)|has talked/~talked|have talked,has talking,has talk
I ___ to this song a hundred times. (listen)|have listened/~listened|has listened,have listening,have listen
My dog ___ the sofa again! (destroy)|has destroyed/~destroyed|have destroyed,has destroying,has destroy
We ___ for this moment for so long. (wait)|have waited/~waited|has waited,have waiting,have wait
Someone ___ the window. (open)|has opened/~opened|have opened,has open,has openned
You ___ me so much! (help)|have helped/~helped|has helped,have helping,have help
The shop on the corner ___. (close)|has closed/~closed|have closed,has closing,has close
I ___ two new apps. (download)|have downloaded/~downloaded|has downloaded,have downloading,have download
She ___ in three marathons. (compete)|has competed/~competed|have competed,has competing,has compete
They ___ really well together. (work)|have worked/~worked|has worked,have working,have work
It ___ since this morning. (snow)|has snowed|have snowed,snowed,has snow
I ___ to learn the guitar. (decide)|have decided/~decided|has decided,have deciding,have decide
My friends ___ me a lot. (support)|have supported/~supported|has supported,have supporting,have support
`},
 {n:2, t:"Irregular participles", sub:"seen, gone, eaten, done", why:"This verb is irregular: use its past participle (the 3rd form).", es:"Verbo irregular: usa el participio (la 3ª forma).", q:`
I ___ that movie three times. (see)|have seen/~saw|have saw,has seen,have seed
She ___ to Europe twice. (be)|has been|has be,have been,has was
We ___ lunch already. (eat)|have eaten/~ate|have ate,has eaten,have eated
He ___ to the bank. He'll be back soon. (go)|has gone/~went|has went,has go,have gone|Has gone = he's there now. Has been = he went and came back.|has gone = está allá ahora.
I ___ my homework. (do)|have done/~did|have did,has done,have doed
They ___ a new house. (buy)|have bought/~bought|have buyed,has bought,have brought|Bought comes from buy. Brought comes from bring.|bought = comprado, brought = traído.
She ___ three books this year. (write)|has written/~wrote|has wrote,have written,has writed
I ___ my keys! (lose)|have lost/~lost|have losed,has lost,have loose
You ___ so much! (grow)|have grown/~grew|have grew,has grown,have growed
He ___ his leg. (break)|has broken/~broke|has broke,have broken,has breaked
We ___ a lot of money this month. (spend)|have spent/~spent|have spended,has spent,have spend
I ___ him for years. (know)|have known/~knew|have knew,has known,have knowed
She ___ me a message. (send)|has sent/~sent|has sended,have sent,has send
They ___ the match! (win)|have won/~won|have winned,has won,have win
I ___ a decision. (make)|have made/~made|have maked,has made,have make
He ___ a lot of coffee today. (drink)|has drunk/~drank|has drank,have drunk,has drinked
I ___ that song before. (hear)|have heard/~heard|have heared,has heard,have hear
We ___ our tickets. (get)|have got/have gotten/~got|have getted,has got,have get|Got (UK) and gotten (US) are both correct.|got y gotten están bien.
She ___ her car. (sell)|has sold/~sold|has selled,have sold,has sell
I ___ the news. (read)|have read/~read|have readed,has read,have red|Read, read, read: same spelling, but the participle sounds like "red".|Se escribe read, suena "red".
They ___ to visit us. (come)|have come/~came|have came,has come,have comed
You ___ my favorite shirt again! (wear)|have worn/~wore|have wore,has worn,have weared
He ___ his phone at home. (leave)|has left/~left|has leaved,have left,has leave
I ___ really tired lately. (feel)|have felt|have feeled,has felt,have fell
She ___ English for ten years. (teach)|has taught/~taught|has teached,have taught,has thought|Taught comes from teach. Thought comes from think.|taught = enseñado.
We ___ a lot of new people here. (meet)|have met/~met|have meeted,has met,have meet
I ___ my bike to work all week. (ride)|have ridden/~rode|have rode,has ridden,have rided
The baby ___ asleep. (fall)|has fallen/~fell|has fell,have fallen,has falled
I ___ in the sea today. (swim)|have swum/~swam|have swam,has swum,have swimmed
He ___ me his secret. (tell)|has told/~told|has telled,have told,has tell
We ___ the wrong bus! (take)|have taken/~took|have took,has taken,have taked
She ___ a beautiful dress for the wedding. (choose)|has chosen/~chose|has chose,have chosen,has choosed
I ___ the answer. (forget)|have forgotten/~forgot|have forgetted,has forgotten,have forgeted
They ___ a new bridge. (build)|have built/~built|have builded,has built,have build
The price of coffee ___ again. (rise)|has risen/~rose|has rose,have risen,has rised
I ___ the cat some food. (give)|have given/~gave|have gave,has given,have gived
I ___ my old glasses! (find)|have found/~found|have finded,has found,have find
He ___ the whole cake! (eat)|has eaten/~ate|has ate,have eaten,has eated
We ___ here before. (be)|have been/~were|have be,has been,have was
She ___ a lot of photos. (take)|has taken/~took|has took,have taken,has taked
`},
 {n:3, t:"Negatives & questions", sub:"I haven't seen… Have you ever…?", why:"Negative: haven't / hasn't + past participle. Questions: Have / Has + person + past participle.", es:"Negativo: haven't / hasn't + participio. Pregunta: Have / Has + persona + participio.", q:`
I ___ my homework yet. (not / finish)|haven't finished/have not finished/~didn't finish|don't finished,haven't finish,hasn't finished
She ___ the movie. (not / see)|hasn't seen/has not seen/~didn't see|hasn't saw,haven't seen,didn't seen
We ___ lunch. (not / eat)|haven't eaten/have not eaten/~didn't eat|haven't ate,hasn't eaten,didn't eaten
He ___ me back. (not / call)|hasn't called/has not called/~didn't call|haven't called,hasn't call,didn't called
They ___ yet. (not / arrive)|haven't arrived/have not arrived/~didn't arrive|hasn't arrived,haven't arrive,didn't arrived
It ___ for weeks. (not / rain)|hasn't rained/has not rained|haven't rained,didn't rained,hasn't rain
I ___ him for years. (not / see)|haven't seen/have not seen|haven't saw,hasn't seen,didn't seen
My boss ___ my email. (not / answer)|hasn't answered/has not answered/~didn't answer|haven't answered,hasn't answer,didn't answered
___ you ever been to Peru?|Have|Has,Did,Are
___ she finished the report?|Has|Have,Did,Is
___ they called you?|Have|Has,Did,Are
Have you ___ my keys? (see)|seen|saw,see,seeing
Has he ___ the tickets? (buy)|bought|buyed,buy,buying
___ it stopped raining?|Has|Have,Did,Is
What ___ you done today?|have|has,did,are
Where ___ she gone?|has|have,did,is
How many countries ___ you visited?|have|has,did,are
___ your parents met your new partner?|Have|Has,Did,Are|Your parents = they → Have.|Your parents = they → Have.
___ anyone seen my phone?|Has|Have,Did,Is|Anyone is singular → Has.|Anyone es singular → Has.
We ___ a decision yet. (not / make)|haven't made/have not made/~didn't make|haven't make,hasn't made,didn't made
She ___ to me since Monday. (not / speak)|hasn't spoken/has not spoken|hasn't spoke,haven't spoken,didn't spoken
I ___ that book. (not / read)|haven't read/have not read/~didn't read|hasn't read,haven't readed,didn't readed
Have you ___ lunch yet? (have)|had|have,has,having
Has she ___ home? (go)|gone|went,go,goes
Has your brother ___ a job? (find)|found|finded,find,finding
The kids ___ their vegetables. (not / eat)|haven't eaten/have not eaten/~didn't eat|hasn't eaten,haven't ate,didn't ate
___ you tried the new café?|Have|Has,Did,Do
Why ___ he answered my messages? (not)|hasn't|haven't,didn't,isn't
Fix it: "Have you saw this movie?" → Have you ___ this movie?|seen|saw,see,seeing
Fix it: "She haven't called." → She ___ called.|hasn't/has not|haven't,didn't,isn't
Fix it: "Has they finished?" → ___ they finished?|Have|Has,Did,Are
Fix it: "I don't have finished." → I ___ finished.|haven't/have not|don't,didn't,hasn't|Use haven't, not "don't have".|Usa haven't, no "don't have".
___ he ever ridden a horse?|Has|Have,Did,Is
Have they ___ the news? (hear)|heard|heared,hear,hearing
How long ___ you worked here?|have|has,did,are
I ___ my password. (not / change)|haven't changed/have not changed/~didn't change|hasn't changed,haven't change,didn't changed
Has the package ___? (arrive)|arrived|arrive,arriving,arrives
My sister ___ her new car yet. (not / drive)|hasn't driven/has not driven/~didn't drive|hasn't drove,haven't driven,didn't drove
___ we met before?|Have|Has,Did,Are
What ___ he done to his hair?!|has|have,did,is
`},
 {n:4, t:"Ever, never, already, yet, just", sub:"Have you ever…? I've just…", why:"", es:"", q:`
Have you ___ been to Japan?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
Have you ___ eaten sushi?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
Has she ___ met a famous person?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
Have they ___ seen snow?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
Is this the best movie you've ___ seen?|ever|yet,since,for|After "the best…", use ever.|the best… I've ever seen = el mejor que he visto.
Has your dog ___ bitten anyone?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
I've ___ been to Japan, but I'd love to go.|never|ever,yet,since|never = not at any time in your life.|never = nunca.
She's ___ eaten sushi. She doesn't like fish.|never|ever,yet,since|never = not at any time in your life.|never = nunca.
We've ___ seen snow. We live in the desert.|never|ever,yet,since|never = not at any time in your life.|never = nunca.
He's ___ been late to class. Not once!|never|ever,yet,since|never = not at any time.|never = nunca.
I've ___ tried surfing. Is it hard?|never|ever,yet,since|never = not at any time in your life.|never = nunca.
They've ___ met my parents. I'm nervous about Sunday.|never|ever,yet,since|never = not at any time.|never = nunca.
Have you finished ___?|yet/already|since,for,ever|Use yet at the end of questions.|yet = ya (en preguntas), al final.
I haven't eaten ___.|yet|already,ever,just|Use yet at the end of negatives.|yet = todavía (en negativo), al final.
Has the bus come ___?|yet/already|since,for,ever|Use yet at the end of questions.|yet = ya (en preguntas), al final.
She hasn't called ___.|yet/~since|already,ever,just|Use yet at the end of negatives.|yet = todavía, al final.
We haven't decided ___.|yet|already,ever,just|Use yet at the end of negatives.|yet = todavía, al final.
Have you done your homework ___?|yet/already|since,for,ever|Use yet at the end of questions.|yet = ya (en preguntas), al final.
They haven't arrived ___.|yet|already,ever,just|Use yet at the end of negatives.|yet = todavía, al final.
She's ___ finished. That was fast!|already/just|yet,ever,since|already = sooner than expected. It goes between has and the participle.|already = ya.
We've ___ seen this movie. Let's watch something else.|already/just|yet,ever,since|already goes between have and the participle.|already = ya.
I've ___ paid. You don't need to pay.|already/just|yet,ever,since|already goes between have and the participle.|already = ya.
He's ___ told me the news.|already/just|yet,ever,since|already goes between has and the participle.|already = ya.
They've ___ left. They're on the bus now.|already/just|yet,ever,since|already goes between have and the participle.|already = ya.
I've ___ had lunch, thanks.|already/just|yet,ever,since|already goes between have and the participle.|already = ya.
He's ___ left. You missed him by one minute.|just/already|yet,ever,since|just = a moment ago.|just = recién, acaba de.
I've ___ woken up. Give me five minutes.|just|yet,ever,since|just = a moment ago.|just = recién, acabo de.
The movie has ___ started. Hurry!|just/already|yet,ever,since|just = a moment ago.|just = recién, acaba de.
She's ___ called me. She's on her way.|just/already|yet,ever,since|just = a moment ago.|just = recién, acaba de.
We've ___ arrived at the airport.|just/already|yet,ever,since|just = a moment ago.|just = recién, acabamos de.
I've ___ seen the news. Wow!|just/already|yet,ever,since|just = a moment ago.|just = recién, acabo de.
Fix it: "I have finished yet." → I have ___ finished.|already/just|yet,ever,since|In positive sentences, use already, not yet.|En afirmativo: already.
Fix it: "She has yet arrived." → She has ___ arrived.|already/just|yet,ever,since|In positive sentences, use already or just, not yet.|En afirmativo: already o just.
Fix it: "I don't have ever been to Peru." → I have ___ been to Peru.|never|ever,yet,since|Say "I have never been", not "don't have ever".|"Nunca he ido" = I have never been.
Have you ___ been here before?|ever|yet,since,for|Use ever in questions about your whole life.|ever = alguna vez.
I've ___ had a better coffee!|never|ever,yet,since|never = not at any time.|never = nunca.
Has he sent the email ___?|yet/already|since,for,ever|Use yet at the end of questions.|yet = ya (en preguntas), al final.
Wow, you've ___ finished the whole book!|already/just|yet,ever,since|already = sooner than expected.|already = ya.
The baby has ___ fallen asleep, so be quiet.|just/already|yet,ever,since|just = a moment ago.|just = recién, acaba de.
I haven't told anyone ___.|yet|already,ever,just|Use yet at the end of negatives.|yet = todavía, al final.
`},
 {n:5, t:"For & since", sub:"for two years, since 2020, How long…?", why:"for + a period of time (for two years). since + a starting point (since 2020, since Monday).", es:"for = durante (un período). since = desde (un momento).", q:`
I've lived here ___ ten years.|for|since,ago,during
I've lived here ___ 2015.|since|for,ago,during
She's worked there ___ March.|since|for,ago,from
We've known each other ___ a long time.|for|since,ago,from
He's been sick ___ Monday.|since|for,ago,from
They've been married ___ five years.|for|since,ago,during
I haven't seen her ___ last summer.|since|for,ago,from
It's rained ___ three days.|for|since,ago,during
I've had this phone ___ two months.|for|since,ago,during
She's been a teacher ___ she was 25.|since|for,ago,from
We've waited ___ an hour!|for|since,ago,during
He hasn't eaten ___ breakfast.|since|for,ago,from
I've studied English ___ I was a kid.|since|for,ago,from
They've lived in Chile ___ ages.|for|since,ago,during
I haven't slept well ___ weeks.|for|since,ago,during
She's had her dog ___ Christmas.|since|for,ago,from
How long ___ you lived here?|have|has,did,are|How long + have / has + person + past participle.|How long + have / has + persona + participio.
How long ___ she known him?|has|have,did,is|How long + have / has + person + past participle.|How long + have / has + persona + participio.
How long have you ___ a teacher? (be)|been|be,was,being|The participle of be is been.|El participio de be es been.
How long ___ they been together?|have|has,did,are|How long + have / has + person + past participle.|How long + have / has + persona + participio.
I ___ here for three years. (work)|have worked/have been working|work,am working,has worked|Until now + for → present perfect.|Hasta ahora + for → present perfect.
She ___ him since 2010. (know)|has known|knows,is knowing,have known|Until now + since → present perfect.|Hasta ahora + since → present perfect.
We ___ in this house since 2019. (live)|have lived/have been living|live,are living,has lived|Until now + since → present perfect.|Hasta ahora + since → present perfect.
He ___ that car for ten years. (have)|has had|has,is having,have had|Until now + for → present perfect.|Hasta ahora + for → present perfect.
They ___ friends since school. (be)|have been|are,are being,has been|Until now + since → present perfect.|Hasta ahora + since → present perfect.
I ___ to the gym since January. (not / go)|haven't been/have not been/haven't gone/have not gone|don't go,didn't go,hasn't gone|Until now + since → present perfect.|Hasta ahora + since → present perfect.
Fix it: "I live here since 2015." → I ___ here since 2015.|have lived|live,lived,am living|With since and for (until now), use the present perfect.|"Vivo aquí desde 2015" = I have lived here since 2015.
Fix it: "I know her for ten years." → I ___ her for ten years.|have known|know,knew,am knowing|With for (until now), use the present perfect.|"La conozco hace diez años" = I have known her for ten years.
Fix it: "She works here since May." → She ___ here since May.|has worked|works,worked,is work|With since (until now), use the present perfect.|"Trabaja aquí desde mayo" = She has worked here since May.
Fix it: "How long do you live here?" → How long ___ you lived here?|have|do,did,are|How long + have + person + past participle.|"¿Cuánto tiempo llevas viviendo aquí?" = How long have you lived here?
Fix it: "We are married for five years." → We ___ married for five years.|have been|are,were,has been|With for (until now), use the present perfect.|"Llevamos cinco años casados" = We have been married for five years.
It's been a long time ___ I saw you!|since|for,ago,from
I've been awake ___ 6 a.m.|since|for,ago,from
She's played the piano ___ most of her life.|for|since,ago,during
We haven't talked ___ the party.|since|for,ago,from
He's been in the meeting ___ two hours.|for|since,ago,during
I've wanted this ___ a long time.|for|since,ago,during
They haven't called ___ yesterday.|since|for,ago,from
How long ___ your sister lived in Spain?|has|have,did,is|Your sister = she → has.|Your sister = she → has.
I've known about it ___ this morning.|since|for,ago,from
`},
 {n:6, t:"Present perfect or past simple?", sub:"I've been… vs I went…", why:"Finished time (yesterday, last week, in 2019, ago) → past simple. Life until now, no specific time → present perfect.", es:"Tiempo terminado (yesterday, last…, ago) → pasado simple. Hasta ahora, sin fecha → present perfect.", q:`
I ___ to Brazil last year. (go)|went|have gone,have been,go
I ___ to Brazil twice. (be)|have been|was,am,be
She ___ me yesterday. (call)|called|has called,have called,calls
She ___ me three times today. (call)|has called/~called|have called,calls,call|Today isn't finished yet → present perfect.|Hoy no ha terminado → present perfect.
We ___ the movie on Friday. (see)|saw|have seen,has seen,seen
___ you ever eaten sushi?|Have|Did,Do,Has|Life experience (ever) → present perfect.|Experiencia de vida (ever) → present perfect.
___ you eat sushi last night?|Did|Have,Do,Has|Last night is finished → past simple.|Last night → pasado simple.
He ___ here since 2020. (work)|has worked|worked,works,have worked|Since + until now → present perfect.|Since → present perfect.
He ___ here from 2015 to 2020. (work)|worked|has worked,have worked,works|From… to… is a finished period → past simple.|Período terminado → pasado simple.
I ___ my keys. I can't find them! (lose)|have lost/~lost|lose,loses,has lost|The result is now (I can't find them) → present perfect.|El resultado es ahora → present perfect.
I ___ my keys yesterday, but I found them. (lose)|lost|have lost,has lost,lose
When ___ you arrive?|did|have,has,do|With "when", use the past simple.|Con "when" → pasado simple.
They ___ married in 2018. (get)|got|have got,have gotten,get
They ___ married for five years. (be)|have been|were,are,was|For + until now → present perfect.|For → present perfect.
I ___ breakfast at 7 a.m. (have)|had|have had,has had,have
___ you finished your homework yet?|Have|Did,Do,Has|Yet → present perfect.|Yet → present perfect.
I ___ him two days ago. (see)|saw|have seen,has seen,seen|With "ago", use the past simple.|Con "ago" → pasado simple.
I ___ him since Monday. (not / see)|haven't seen/have not seen|didn't see,don't see,hasn't seen|Since + until now → present perfect.|Since → present perfect.
She ___ a book in 2021. (write)|wrote|has written,have written,writes
She ___ three books so far. (write)|has written|wrote,writes,have written|"So far" = until now → present perfect.|"So far" = hasta ahora → present perfect.
We ___ to that restaurant last weekend. (go)|went|have gone,have been,go
Shakespeare ___ many plays. (write)|wrote|has written,have written,writes|His life is finished → past simple.|Su vida terminó → pasado simple.
My grandma ___ 30 countries, and she's still traveling! (visit)|has visited|visit,visits,have visited|Her life experience until now → present perfect.|Hasta ahora → present perfect.
___ you see the game last night?|Did|Have,Do,Has|Last night is finished → past simple.|Last night → pasado simple.
I've never ___ a horse. (ride)|ridden|rode,ride,riding|After have / has, use the past participle: ridden.|Después de have / has: participio.
I ___ a horse when I was ten. (ride)|rode|have ridden,ridden,ride|"When I was ten" is finished time → past simple.|"When I was ten" → pasado simple.
What time ___ you get up today?|did|have,has,do|"What time" asks for a specific time → past simple.|Hora específica → pasado simple.
It ___ a lot this year. (rain)|has rained/~rained|rains,have rained,rain|This year isn't finished → present perfect.|Este año no ha terminado → present perfect.
It ___ a lot last year. (rain)|rained|has rained,rains,have rained
Fix it: "I have seen him yesterday." → I ___ him yesterday.|saw|have seen,seen,see|With yesterday, use the past simple.|Con yesterday → pasado simple.
Fix it: "Did you ever go to Europe?" → ___ you ever been to Europe?|Have|Did,Do,Has
Fix it: "When have you arrived?" → When ___ you arrive?|did|have,has,do
Fix it: "I have finished school in 2015." → I ___ school in 2015.|finished|have finished,finish,has finished|"In 2015" is finished time → past simple.|"In 2015" → pasado simple.
Fix it: "She lived here since 2010." → She ___ here since 2010.|has lived|lived,lives,have lived|Since + until now → present perfect.|Since → present perfect.
Look! Someone ___ my car! (scratch)|has scratched/~scratched|scratches,scratch,have scratched|You can see the result now → present perfect.|Se ve el resultado ahora → present perfect.
Last night I ___ until 2 a.m. (study)|studied|have studied,has studied,study
How many times ___ you been to the dentist this year?|have|did,has,do|This year isn't finished → present perfect.|Este año → present perfect.
I ___ to the dentist on Tuesday. (go)|went|have gone,have been,go
We ___ each other since we were kids. (know)|have known|knew,know,has known|Since + until now → present perfect.|Since → present perfect.
We ___ in school, in 2005. (meet)|met|have met,has met,meet
`},
 {n:7, t:"Tell the story", sub:"real stories with 10 blanks", story:true, why:"Read the whole sentence: the time words tell you which tense you need.", es:"Lee toda la oración: las palabras de tiempo te dicen qué tiempo verbal usar.", q:`
#Moving to a new city
I ___ in Santiago for two years now. (live)|have lived/have been living|lived,live,has lived
I ___ here from Valdivia in 2024. (move)|moved|have moved,has moved,move
Since then, I ___ a lot of new friends. (make)|have made|make,makes,has made
I ___ my first job here three months after I arrived. (get)|got|have got,have gotten,get
I ___ at the same company since then. (work)|have worked/have been working|work,works,has worked
I ___ every neighborhood yet. (not / visit)|haven't visited/have not visited/~didn't visit|don't visited,don't visit,hasn't visited
Last weekend, I ___ Cerro San Cristóbal for the first time. (climb)|climbed|have climbed,has climbed,climb
"___ you ever seen the city from up there?" my friend asked.|Have|Did,Do,Has
"I've never ___ anything so beautiful," I said. (see)|seen|saw,see,seeing
I ___ really happy here so far. (be)|have been|am,be,has been
#Job interview prep
I've just ___ an email from a big company. (get)|got/gotten|get,getting,gets
They ___ me twice this week. (write)|have written/~wrote|write,writes,has written
I ___ this job for months. (want)|have wanted|want,wants,has wanted
I ___ three interviews this year, and none of them went well. (have)|have had/~had|has had,having,have
At my last interview, I ___ really nervous. (be)|was|have been,has been,am
I ___ the questions at that interview. (not / understand)|didn't understand/did not understand|don't understand,hasn't understood,not understood
But since then, I ___ English every day. (practice)|have practiced/have practised/have been practicing/have been practising|practice,practices,has practiced
I've already ___ my answers to the common questions. (write)|written|wrote,write,writing
Yesterday, my teacher ___ a practice interview with me. (do)|did|has done,have done,does
"You ___ so much!" she told me. (improve)|have improved/~improved|improve,improves,has improved
#My grandma's adventures
My grandma ___ 80 years old last month. (turn)|turned|has turned,have turned,turns
She ___ to more than 20 countries in her life. (be)|has been|is,be,have been
When she was young, she ___ in Italy for a year. (live)|lived|has lived,have lived,lives
She ___ Italian there, and she still speaks it. (learn)|learned/learnt|has learn,learn,have learned
She has never ___ on a cruise. (be)|been|was,be,being
This year, she has already ___ three trips. (take)|taken|took,take,taking
In March, she ___ to Mexico with her friends. (fly)|flew|has flown,have flown,flies
"___ you ever tried skydiving?" I asked her.|Have|Did,Do,Has
"Not yet," she said. "But I ___ about it a lot!" (think)|have thought/have been thinking/~think|have think,thinks,has thought
I've never ___ anyone like her. (meet)|met|meet,meeting,meets
#A busy morning
It's 9 a.m., and I've already ___ a lot. (do)|done|did,do,doing
I ___ up at 6 today. (wake)|woke|have woken,has woken,wake
Then I ___ for a run before breakfast. (go)|went|have gone,has gone,go
I ___ all my emails, but I haven't answered them yet. (read)|have read/~read|has read,reading,am read
My roommate ___ up yet. (not / get)|hasn't got/has not got/hasn't gotten/has not gotten/~didn't get|didn't got,don't get,haven't got
He ___ to bed at 3 a.m. last night. (go)|went|has gone,have gone,goes
I ___ two coffees so far. (drink)|have drunk/have had|drink,drinks,has drunk
Oh no, I ___ my keys! I can't find them anywhere. (lose)|have lost/~lost|lose,loses,has lost
Wait, I've ___ them! They were in my bag. (find)|found|finded,find,finding
I've just ___ the door, and now I'm ready for work. (lock)|locked|lock,locking,locks
`},
 {n:8, adv:true, t:"Advanced: been, gone & -ing", sub:"been vs gone, I've been waiting, the first time I've…", why:"Present perfect at B2–C1: been vs gone, the continuous form and fixed patterns.", es:"Present perfect nivel B2–C1: been vs gone, la forma continua y estructuras fijas.", q:`
She isn't here. She ___ to the dentist. (go)|has gone/'s gone|has been,have gone,has went|Gone to = she went and she's there now.|Gone to = fue y está allá ahora.
I ___ to Japan three times. I love it! (be)|have been/'ve been|have gone,has been,am|Been to = you went and came back.|Been to = fuiste y volviste.
I'm exhausted. I ___ all morning. (clean)|have been cleaning/'ve been cleaning/~have cleaned|am cleaning,have cleaning,has been cleaning|An activity until now, with a result you can see (tired) → present perfect continuous.|Una actividad hasta ahora con un resultado que se nota (cansado) → present perfect continuous.
I ___ her for ten years. (know)|have known/'ve known|have been knowing,know,am knowing|Know is a state verb: no -ing, even with "for".|Know es un verbo de estado: sin -ing, aunque haya "for".
It's the first time I ___ octopus. (eat)|have eaten/'ve eaten|eat,am eating,have eat|It's the first time + present perfect.|It's the first time + present perfect (en español usamos presente).
That's the best pizza I've ever ___. (have)|had|have,having,has|After "I've ever", use the participle.|Después de "I've ever", usa el participio.
I've lived here since I ___ a kid. (be)|was|have been,am,were|Since + a moment in the past → past simple after since.|Since + un momento pasado → past simple después de since.
It ___ two years since we last met. (be)|has been/'s been|have been,is being,be|It's been + time + since…|It's been + tiempo + since… = han pasado…
Call me as soon as you ___ the report. (finish)|have finished/'ve finished/~finish|finished,will finish,are finishing|After as soon as / when (future), use the present perfect (or the present), not will.|Después de as soon as / when (futuro), usa present perfect (o presente), no will.
Breaking news: the president ___. He announced it at 9 a.m. (resign)|has resigned|resigning,have resigned,was resigned|News → present perfect first; details (when) → past simple.|Noticia → primero present perfect; detalles (cuándo) → past simple.
How long ___ you been waiting?|have|did,are,has|How long + have you been + -ing?|How long + have you been + -ing?
I ___ three emails this morning, and it's only 10 a.m. (write)|have written/'ve written/~wrote|have been writing,am writing,write|How many → simple form, not continuous. The morning isn't over.|Cuántos → forma simple, no continua. La mañana no ha terminado.
We ___ for an hour, and we still haven't found the street. (walk)|have been walking/'ve been walking/~have walked|are walking,walk,have been walk|How long an activity has been going on → present perfect continuous.|Cuánto tiempo lleva una actividad → present perfect continuous.
`}
];
PP_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"pp"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"pp"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const PP_TEST=`
I ___ here since I was a child. (live)|have lived/have been living|Since + until now → present perfect.
She ___ to Paris. She'll be back next week. (go)|has gone/~went|Has gone = she's there now. Has been = she went and came back.
She ___ to Paris twice. She loved it. (be)|has been|Has been = she went and came back (experience).
How long ___ you known her?|have|How long + have + person + past participle.
I ___ him since we were in school. (know)|have known|Know → known. Since → present perfect.
When ___ you start working here?|did|With "when", use the past simple.
I ___ my wallet. Can you help me look for it? (lose)|have lost/~lost|The result is now → present perfect.
We ___ each other in 2019. (meet)|met|"In 2019" is finished time → past simple.
This is the best pizza I have ever ___. (eat)|eaten|Eat → eaten.
She hasn't called ___.|yet/~since|Yet goes at the end of negatives.
I've ___ seen him. He was here a minute ago.|just/already|Just = a moment ago.
Have you ___ been to Easter Island?|ever|Ever is for life experience questions.
I haven't seen her ___ ages.|for|For + a period of time (ages).
It's been two years ___ we moved.|since|Since + the starting point (when we moved).
He ___ three cups of coffee today. (drink)|has drunk/has had/~drank|Today isn't finished. Drink → drunk.
They ___ married for ten years. (be)|have been|For + until now → present perfect.
Fix it: "I am here since Monday." → I ___ here since Monday.|have been|Since + until now → present perfect, not "am".
Fix it: "Have you went to the bank?" → Have you ___ to the bank?|gone/been|After have, use the participle: gone or been.
Fix it: "She has wrote a book." → She has ___ a book.|written|Write → wrote → written.
Fix it: "I have seen that movie last week." → I ___ that movie last week.|saw|Last week is finished → past simple.
Fix it: "How long are you studying English?" → How long ___ you studied English?|have|How long + have + person + past participle.
Fix it: "Did you ever try sushi?" → ___ you ever tried sushi?|Have|Life experience (ever) → present perfect.
The price of gas ___ a lot this year. (rise)|has risen/~rose|Rise → rose → risen.
Someone ___ the last cookie! (eat)|has eaten/~ate|You see the result now → present perfect.
My phone ___ again. I need a new one. (break)|has broken/~broke|Break → broke → broken.
I ___ to Mendoza in 2022. (drive)|drove|"In 2022" is finished time → past simple.
He has ___ his bike to work every day this week. (ride)|ridden|Ride → rode → ridden.
We ___ a word since the argument. (not / speak)|haven't spoken/have not spoken|Since → present perfect. Speak → spoken.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"ppt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- -ed endings (pronunciation) question bank ----------
   word | t / d / id | how it sounds | extra note (optional)
   Every stage is multiple choice with a 🔊 button; the test out is typed (/t/, /d/ or /ɪd/). */
const ED_SND={t:"/t/",d:"/d/",id:"/ɪd/ (extra syllable)"};
const ED_RULE={
  t:["The verb ends in a quiet sound (p, k, f, s, sh, ch, x), so -ed sounds like a soft /t/. No extra syllable.","El verbo termina en un sonido sordo (p, k, f, s, sh, ch, x): la -ed suena como /t/, sin sílaba extra."],
  d:["The verb ends in a voiced sound (a vowel, or b, g, j, l, m, n, r, v, z…), so -ed sounds like /d/. No extra syllable.","El verbo termina en un sonido sonoro (vocal, o b, g, j, l, m, n, r, v, z…): la -ed suena como /d/, sin sílaba extra."],
  id:["The verb ends in a /t/ or /d/ sound, so -ed adds an extra syllable: /ɪd/.","El verbo termina en sonido /t/ o /d/: la -ed agrega una sílaba extra, /ɪd/."]
};
const ED_STAGES=[
 {n:1, t:"Extra syllable or not?", sub:"wanted vs worked", kind:"syl", q:`
wanted|id|WAN-tid
needed|id|NEE-did
worked|t|workt
played|d|playd
decided|id|de-SY-did
started|id|STAR-tid
waited|id|WAY-tid
ended|id|EN-did
loved|d|luvd
helped|t|helpt
added|id|AD-did
called|d|cawld
looked|t|lookt
painted|id|PAIN-tid
invited|id|in-VY-tid
opened|d|O-pend|Two syllables, but the -ed doesn't add a new one: o-pen → o-pened.
cleaned|d|cleend
rested|id|RES-tid
missed|t|mist|It ends in s, not t, so there's no extra syllable.
finished|t|FIN-isht|Two syllables, like finish. The -ed doesn't add a third.
mixed|t|mikst
visited|id|VIS-i-tid
hated|id|HAY-tid
landed|id|LAN-did
`},
 {n:2, t:"The /t/ sound", sub:"worked, stopped, laughed", q:`
worked|t|workt
stopped|t|stopt
helped|t|helpt
watched|t|watcht
washed|t|washt
kissed|t|kist
cooked|t|cookt
liked|t|laikt
hoped|t|houpt
jumped|t|jumpt
talked|t|tawkt
walked|t|wawkt
danced|t|danst|Ends in a /s/ sound (the -ce sounds like s).
passed|t|past|It sounds exactly like the word "past".
relaxed|t|ri-LAKST
asked|t|askt|Native speakers often say it fast: "ast".
dropped|t|dropt
shopped|t|shopt
laughed|t|laft|The -gh sounds like f, a quiet sound.
picked|t|pikt
played|d|playd|Careful: play ends in a vowel sound, so it's /d/.
wanted|id|WAN-tid|Careful: want ends in t, so it's /ɪd/.
called|d|cawld|Careful: call ends in l, a voiced sound.
`},
 {n:3, t:"The /d/ sound", sub:"played, loved, cleaned", q:`
played|d|playd
loved|d|luvd
called|d|cawld
cleaned|d|cleend
opened|d|O-pend
lived|d|livd
moved|d|moovd
changed|d|chaynjd
enjoyed|d|en-JOYD
tried|d|traid
studied|d|STUH-deed
listened|d|LIS-end
arrived|d|a-RAIVD
smiled|d|smaild
hugged|d|hugd
answered|d|AN-serd
cried|d|craid
stayed|d|stayd
rained|d|raynd
showed|d|shoud
planned|d|pland
worked|t|workt|Careful: work ends in k, a quiet sound, so it's /t/.
needed|id|NEE-did|Careful: need ends in d, so it's /ɪd/.
`},
 {n:4, t:"Mix it up", sub:"/t/, /d/ or /ɪd/?", q:`
watched|t|watcht
waited|id|WAY-tid
cleaned|d|cleend
decided|id|de-SY-did
stopped|t|stopt
enjoyed|d|en-JOYD
started|id|STAR-tid
helped|t|helpt
travelled|d|TRA-veld
counted|id|COWN-tid
fixed|t|fikst
married|d|MA-reed
pointed|id|POIN-tid
followed|d|FO-loud
touched|t|tucht
needed|id|NEE-did
learned|d|lernd
checked|t|chekt
graduated|id|GRA-ju-ay-tid
ordered|d|OR-derd
attended|id|a-TEN-did
pushed|t|pusht
explained|d|ex-PLAYND
completed|id|com-PLEE-tid
`},
 {n:5, t:"Spelling tricks", sub:"fixed, closed, laughed", q:`
fixed|t|fikst|The x sounds like "ks", a quiet sound.
laughed|t|laft|The -gh sounds like f.
coughed|t|coft|The -gh sounds like f.
danced|t|danst|The -ce sounds like s.
raced|t|rayst|The -ce sounds like s.
closed|d|cloazd|The s in close sounds like z, a voiced sound.
used|d|yoozd|The s in use sounds like z. (In "I used to", it's /t/: "yoost to".)
raised|d|rayzd|The s sounds like z.
refused|d|ri-FYOOZD|The s sounds like z.
surprised|d|ser-PRAIZD|The s sounds like z.
changed|d|chaynjd|The -ge sounds like j, a voiced sound.
judged|d|jujd|The -dge sounds like j, not d. So no extra syllable!
typed|t|taipt|The e is silent: the last sound is p.
baked|t|baykt|The e is silent: the last sound is k.
hoped|t|houpt|The e is silent: the last sound is p.
hated|id|HAY-tid|The e is silent, the last sound is t: extra syllable.
voted|id|VOU-tid|The last sound is t: extra syllable.
excited|id|ex-SAI-tid|The last sound is t: extra syllable.
breathed|d|breethd|The -the sounds like a buzzing th, a voiced sound.
crashed|t|crasht|The -sh is a quiet sound.
boxed|t|bokst|The x sounds like "ks".
tired|d|TAI-erd|Ends in an r sound, voiced.
missed|t|mist|Double s, still just one quiet s sound.
faxed|t|fakst
`},
 {n:6, t:"Odd one out", sub:"which one sounds different?", kind:"odd", q:`
worked, watched, played, kissed|played|played has /d/; the others have /t/.
loved, called, wanted, cleaned|wanted|wanted has /ɪd/ (WAN-tid); the others have /d/.
needed, started, decided, helped|helped|helped has /t/; the others have the extra syllable /ɪd/.
stopped, lived, cooked, laughed|lived|lived has /d/; the others have /t/.
opened, rained, jumped, smiled|jumped|jumped has /t/; the others have /d/.
waited, ended, missed, visited|missed|missed has /t/ (mist); the others have /ɪd/.
fixed, danced, closed, washed|closed|closed has /d/ (the s sounds like z); the others have /t/.
changed, judged, painted, hugged|painted|painted has /ɪd/; the others have /d/ (judged is "jujd", no extra syllable).
asked, hated, voted, counted|asked|asked has /t/; the others have /ɪd/.
tried, cried, studied, typed|typed|typed has /t/; the others have /d/.
relaxed, finished, enjoyed, talked|enjoyed|enjoyed has /d/; the others have /t/.
used, refused, raced, surprised|raced|raced has /t/ (the -ce sounds like s); the others have /d/ (the s sounds like z).
landed, added, laughed, rested|laughed|laughed has /t/ (laft); the others have /ɪd/.
showed, followed, listened, pushed|pushed|pushed has /t/; the others have /d/.
`},
 {n:7, t:"Feelings: -ed adjectives", sub:"tired, excited, stressed", q:`
tired|d|TAI-erd
bored|d|bord
excited|id|ex-SAI-tid
interested|id|IN-tres-tid|Most people say it in 3 syllables: IN-tres-tid.
relaxed|t|ri-LAKST
stressed|t|strest
worried|d|WUH-reed
surprised|d|ser-PRAIZD
shocked|t|shokt
embarrassed|t|em-BA-rast
frustrated|id|frus-TRAY-tid
exhausted|id|ig-ZAWS-tid
disappointed|id|dis-a-POIN-tid
amazed|d|a-MAYZD
scared|d|skerd
confused|d|con-FYOOZD
annoyed|d|a-NOYD
depressed|t|di-PREST
overwhelmed|d|o-ver-WELMD
motivated|id|MO-ti-vay-tid
naked|id|NAY-kid|A rule-breaker! As an adjective, naked has the extra syllable.
wicked|id|WI-kid|A rule-breaker! As an adjective, wicked has the extra syllable.
`},
 {n:8, adv:true, t:"Advanced: rule-breakers & used to", sub:"naked, beloved, crooked, used to", q:`
naked|id|NAY-kid|An adjective rule-breaker: it keeps the extra syllable.
beloved|id|bi-LUV-id|Before a noun (my beloved dog), it's usually bi-LUV-id.
a learned professor|id|LER-nid|As an adjective (very educated), it's LER-nid. The verb (I learned) is "lernd".
an aged parent|id|AY-jid|As an adjective (old), it's AY-jid. The verb (he aged) is "ayjd".
crooked|id|KRU-kid|An adjective rule-breaker (not straight).
ragged|id|RA-gid|An adjective rule-breaker (old and torn).
rugged|id|RU-gid|An adjective rule-breaker (rough, strong).
wretched|id|RE-chid|An adjective rule-breaker (very unhappy or bad).
I used to swim|t|yoost-tuh|In "used to", the -ed is a /t/ that joins the "to": "yoost-tuh".
coughed|t|koft|The -gh sounds like f, a quiet sound.
breathed|d|breethd|The th in breathe is voiced (like "the"), so -ed is /d/.
mixed|t|mikst|The x sounds like "ks", a quiet sound.
`}
];
ED_STAGES.forEach(st=>{
  st.items=st.q.trim().split("\n").map((l,k)=>{ const p=l.split("|").map(x=>x.trim()); const id="ed"+st.n+"-"+k;
    if(st.kind==="odd"){ const ws=p[0].split(",").map(x=>x.trim()); return {id, st:st.n, mco:true, q:"Which one has a different -ed sound? "+ws.join(" · "), a:[p[1]], o:ws.filter(w=>w!==p[1]), why:p[2], es:"Di cada palabra en voz alta y escucha el final.", say:ws.join(", ")}; }
    const w=p[0], s=p[1], rs=p[2]||"", note=p[3]||"";
    const why=w+" sounds like “"+rs+"”. "+ED_RULE[s][0]+(note?" "+note:"");
    if(st.kind==="syl") return {id, st:st.n, mco:true, q:"“"+w+"”: does the -ed add an extra syllable?", a:[s==="id"?"Yes, an extra syllable (/ɪd/)":"No extra syllable"], o:[s==="id"?"No extra syllable":"Yes, an extra syllable (/ɪd/)"], why, es:ED_RULE[s][1], say:w};
    return {id, st:st.n, mco:true, q:"“"+w+"”: how does the -ed sound?", a:[ED_SND[s]], o:Object.keys(ED_SND).filter(k2=>k2!==s).map(k2=>ED_SND[k2]), why, es:ED_RULE[s][1], say:w};
  });
  st.why=ED_RULE.id[0]; st.es=ED_RULE.id[1]; delete st.q;
});
const ED_ANS={t:["t","/t/"],d:["d","/d/"],id:["ɪd","id","/ɪd/","/id/","ed","/ed/","i d","ɪ d"]};
const ED_TEST=`
watched|t|watcht
needed|id|NEE-did
arrived|d|a-RAIVD
fixed|t|fikst|The x sounds like "ks".
closed|d|cloazd|The s sounds like z.
excited|id|ex-SAI-tid
laughed|t|laft|The -gh sounds like f.
judged|d|jujd|The -dge sounds like j: no extra syllable.
stressed|t|strest
pointed|id|POIN-tid
breathed|d|breethd
danced|t|danst
attended|id|a-TEN-did
enjoyed|d|en-JOYD
typed|t|taipt
voted|id|VOU-tid
refused|d|ri-FYOOZD
coughed|t|coft
exhausted|id|ig-ZAWS-tid
planned|d|pland
crashed|t|crasht
graduated|id|GRA-ju-ay-tid
changed|d|chaynjd
relaxed|t|ri-LAKST
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"edt-"+i, st:0, q:"“"+p[0]+"”: the -ed sounds like /___/ (write t, d or id)", a:ED_ANS[p[1]], o:[], why:p[0]+" sounds like “"+p[2]+"”. "+ED_RULE[p[1]][0]+(p[3]?" "+p[3]:""), es:ED_RULE[p[1]][1], say:p[0]}; });

/* ---------- Present simple question bank (A1-A2 friendly, Spanish help on every question) ----------
   same format as the past simple bank: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const PRS_STAGES=[
 {n:1, t:"I, you, we, they", sub:"I work, they live", why:"With I, you, we and they, use the verb as it is: no -s.", es:"Con I, you, we y they, el verbo va sin cambios: sin -s.", q:`
I ___ in Santiago. (live)|live|lives,living,am live
We ___ English on Mondays. (study)|study|studies,studys,studying
They ___ coffee every morning. (drink)|drink|drinks,drinking,are drink
You ___ really fast! (walk)|walk/~are walking|walks,walking,are walk
I ___ my mom every Sunday. (call)|call|calls,calling,am call
My friends ___ football on Saturdays. (play)|play|plays,playing,are play|My friends = they, so no -s.|My friends = they: el verbo va sin -s.
We ___ at 9 a.m. (start)|start|starts,starting,are start
I ___ cats. (love)|love|loves,loving,am love
You ___ a lot of questions. (ask)|ask|asks,asking,are ask
My parents ___ in Viña del Mar. (live)|live|lives,living,are live|My parents = they, so no -s.|My parents = they: sin -s.
I ___ to music on the metro. (listen)|listen|listens,listening,am listen
They ___ dinner at 9 p.m. (eat)|eat|eats,eating,are eat
We ___ the same TV shows. (like)|like|likes,liking,are like
I ___ in an office. (work)|work|works,working,am work
You and Ana ___ very well. (dance)|dance|dances,dancing,are dance|You and Ana = you (plural), so no -s.|You and Ana = ustedes: sin -s.
Many people ___ the metro in Santiago. (take)|take|takes,taking,are take|Many people = they, so no -s.|Many people = ellos: sin -s.
`},
 {n:2, t:"He, she, it + -s", sub:"she works, it opens", why:"With he, she and it, add -s to the verb.", es:"Con he, she e it, agrega -s al verbo.", q:`
She ___ in a bank. (work)|works|work,working,is work
He ___ coffee every morning. (drink)|drinks|drink,drinking,is drink
My sister ___ in Concepción. (live)|lives|live,living,is live|My sister = she: add -s.|My sister = she: agrega -s.
The store ___ at 10 a.m. (open)|opens|open,opening,is open|The store = it: add -s.|The store = it: agrega -s.
Pedro ___ the guitar. (play)|plays/~is playing|play,playing,is play|Pedro = he: add -s.|Pedro = he: agrega -s.
My dog ___ a lot. (sleep)|sleeps|sleep,sleeping,is sleep|My dog = it: add -s.|My dog = it: agrega -s.
She ___ English very well. (speak)|speaks|speak,speaking,is speak
He ___ the bus to work. (take)|takes|take,taking,is take
It ___ a lot in winter. (rain)|rains|rain,raining,is rain
My boss ___ long emails. (write)|writes|write,writing,is write
Ana ___ pizza. (love)|loves|love,loving,is love
The class ___ at 8 p.m. (start)|starts|start,starting,is start|The class = it: add -s.|The class = it: agrega -s.
My brother ___ video games all day. (play)|plays/~is playing|play,playing,is play
She ___ her mom every day. (call)|calls|call,calling,is call
He ___ at a restaurant. (cook)|cooks|cook,cooking,is cook
My phone ___ a lot of money. (cost)|costs|cost,costing,is cost
`},
 {n:3, t:"Spelling: -es, -ies, has", sub:"watches, studies, has, goes", why:"Some verbs change: -es after ch, sh, s, x, o; consonant + y → -ies; have → has.", es:"Algunos verbos cambian: -es después de ch, sh, s, x, o; consonante + y → -ies; have → has.", q:`
She ___ TV every night. (watch)|watches|watchs,watch,watchies|After -ch, add -es: watches.|Después de -ch, agrega -es.
He ___ English at university. (study)|studies|studys,study,studyes|Consonant + y → -ies: studies.|Consonante + y → -ies.
My mom ___ two cats. (have)|has|haves,have,hass|have → has with he, she, it.|have → has con he, she, it.
He ___ to the gym on Mondays. (go)|goes|gos,go,goies|go → goes.|go → goes.
She ___ her homework after dinner. (do)|does|dos,do,doies|do → does.|do → does.
Tom ___ the dishes. (wash)|washes|washs,wash,washies|After -sh, add -es.|Después de -sh, agrega -es.
The baby ___ a lot at night. (cry)|cries|crys,cry,cryes|Consonant + y → -ies.|Consonante + y → -ies.
He ___ cars. (fix)|fixes|fixs,fix,fixies|After -x, add -es.|Después de -x, agrega -es.
She always ___ the bus. (miss)|misses|miss,misss,missies|After -ss, add -es.|Después de -ss, agrega -es.
My dad ___ to work at 7. (drive)|drives|drivees,drive,drivies|Normal verb: just add -s.|Verbo normal: solo agrega -s.
She ___ very hard. (try)|tries/~is trying|trys,try,tryes|Consonant + y → -ies.|Consonante + y → -ies.
He ___ to music in the car. (listen)|listens|listenes,listen,listenies|Normal verb: just add -s.|Verbo normal: solo agrega -s.
My friend ___ a big house. (have)|has|haves,have,is have|have → has.|have → has.
The movie ___ at 9. (finish)|finishes|finishs,finish,finishies|After -sh, add -es.|Después de -sh, agrega -es.
She ___ video games. (play)|plays|plaies,play,playes|Vowel + y → just -s: plays.|Vocal + y → solo -s: plays.
He ___ his teeth twice a day. (brush)|brushes|brushs,brush,brushies|After -sh, add -es.|Después de -sh, agrega -es.
`},
 {n:4, t:"Negatives: don't / doesn't", sub:"I don't, she doesn't", why:"I/you/we/they + don't + verb. He/she/it + doesn't + verb (no -s after doesn't).", es:"I/you/we/they + don't + verbo. He/she/it + doesn't + verbo (sin -s después de doesn't).", q:`
I ___ coffee. (not / like)|don't like/do not like|doesn't like,not like,don't likes
She ___ meat. (not / eat)|doesn't eat/does not eat|don't eat,doesn't eats,not eat|She → doesn't, and the verb has no -s.|She → doesn't, y el verbo va sin -s.
We ___ on Sundays. (not / work)|don't work/do not work|doesn't work,not work,don't works
He ___ English at home. (not / speak)|doesn't speak/does not speak|don't speak,doesn't speaks,not speak
They ___ in Santiago. (not / live)|don't live/do not live|doesn't live,not live,don't lives
My dog ___ cats. (not / like)|doesn't like/does not like|don't like,doesn't likes,not like|My dog = it → doesn't.|My dog = it → doesn't.
I ___ how to swim. (not / know)|don't know/do not know|doesn't know,not know,don't knows
The bus ___ here. (not / stop)|doesn't stop/does not stop|don't stop,doesn't stops,not stop|The bus = it → doesn't.|The bus = it → doesn't.
You ___ to come. (not / need)|don't need/do not need|doesn't need,not need,don't needs
My brother ___ TV. (not / watch)|doesn't watch/does not watch|don't watch,doesn't watches,not watch|After doesn't, the verb has no -s or -es.|Después de doesn't, el verbo va sin -s ni -es.
She ___ a car. (not / have)|doesn't have/does not have|doesn't has,don't have,not have|After doesn't, use have (not has).|Después de doesn't, usa have (no has).
We ___ much time. (not / have)|don't have/do not have|doesn't have,don't has,not have
He ___ on weekends. (not / study)|doesn't study/does not study|doesn't studies,don't study,not study
I ___ the answer. (not / understand)|don't understand/do not understand|doesn't understand,not understand,don't understands
It ___ much in summer. (not / rain)|doesn't rain/does not rain|don't rain,doesn't rains,not rain
My parents ___ English. (not / speak)|don't speak/do not speak|doesn't speak,not speak,don't speaks|My parents = they → don't.|My parents = they → don't.
`},
 {n:5, t:"Questions: do / does", sub:"Do you…? Does she…?", why:"Do + I/you/we/they + verb? Does + he/she/it + verb? (no -s after does).", es:"Do + I/you/we/they + verbo? Does + he/she/it + verbo? (sin -s después de does).", q:`
___ you like pizza? (do)|Do|Does,Are,Is
___ she work on Saturdays? (do)|Does|Do,Is,Are
___ they live near here? (do)|Do|Does,Are,Is
Where ___ you work? (do)|do|does,are,is
What time ___ the class start? (do)|does|do,is,are|The class = it → does.|The class = it → does.
___ your brother play football? (do)|Does|Do,Is,Are|Your brother = he → does.|Your brother = he → does.
Does he ___ English? (speak)|speak|speaks,speaking,spoke|After does, the verb has no -s.|Después de does, el verbo va sin -s.
Do you ___ a dog? (have)|have|has,having,haves
Does she ___ coffee? (drink)|drink|drinks,drinking,drank|After does, the verb has no -s.|Después de does, el verbo va sin -s.
What ___ you do on weekends? (do)|do|does,are,is
How ___ he go to work? (do)|does|do,is,are
Does it ___ a lot here? (rain)|rain|rains,raining,rained
Do you like tea? Yes, I ___.|do|does,am,like|Short answer: Yes, I do.|Respuesta corta: Yes, I do.
Does she live here? No, she ___.|doesn't|don't,isn't,not|Short answer: No, she doesn't.|Respuesta corta: No, she doesn't.
___ your parents speak English? (do)|Do|Does,Are,Is|Your parents = they → do.|Your parents = they → do.
Where does your sister ___? (live)|live|lives,living,lived|After does, the verb has no -s.|Después de does, el verbo va sin -s.
`},
 {n:6, t:"Mix it up", sub:"routines with always, never…", why:"Check the subject first: he/she/it → -s; and always/usually/never go before the verb.", es:"Mira primero el sujeto: he/she/it → -s; y always/usually/never van antes del verbo.", q:`
She always ___ breakfast. (eat)|eats|eat,eating,is eat
I never ___ late. (arrive)|arrive|arrives,arriving,am arrive
My dad usually ___ at 7. (get up)|gets up|get up,gets ups,is get up|Phrasal verbs: the -s goes on the verb: gets up.|En los verbos con partícula, la -s va en el verbo: gets up.
We sometimes ___ out on Fridays. (go)|go|goes,going,are go
He ___ coffee. (not / drink)|doesn't drink/does not drink|don't drink,doesn't drinks,not drink
___ you usually cook at home? (do)|Do|Does,Are,Is
Ana often ___ her grandma. (visit)|visits|visit,visiting,is visit
My kids ___ TV in the morning. (not / watch)|don't watch/do not watch|doesn't watch,not watch,don't watches
The metro ___ very full at 8 a.m. (be)|is|are,be,does|Be is different: I am, you/we/they are, he/she/it is.|Be es distinto: I am, you/we/they are, he/she/it is.
I ___ tired on Mondays. (be)|am|is,are,be|I → am.|I → am.
She ___ the dishes after lunch. (wash)|washes|wash,washs,washing
What time ___ your class finish? (do)|does|do,is,are
He ___ two jobs. (have)|has|have,haves,is have
They usually ___ the bus. (take)|take|takes,taking,are take
My cat never ___ on the bed. (sleep)|sleeps|sleep,sleeping,is sleep
___ he like his new job? (do)|Does|Do,Is,Are
`},
 {n:7, t:"Tell the story", sub:"a normal day, 10 blanks", story:true, why:"Read the whole sentence: who does it? He/she/it → -s.", es:"Lee toda la oración: ¿quién lo hace? He/she/it → -s.", q:`
#Camila's normal day
Camila ___ in Santiago with her dog, Toby. (live)|lives|live,living,is live
She ___ up at 7 every morning. (get)|gets|get,getting,is get
First, she ___ a big cup of coffee. (drink)|drinks|drink,drinking,is drink
Then she ___ the metro to work. (take)|takes|take,taking,is take
She ___ in an office near Plaza de Armas. (work)|works|work,working,is work
She ___ her job, but it's a little boring. (like)|likes|like,liking,is like
At lunch, she and her friends ___ completos. (eat)|eat|eats,eating,are eat
After work, she ___ to the gym. (go)|goes|go,gos,going
Toby ___ the gym, so he waits at home. (not / like)|doesn't like/does not like|don't like,doesn't likes,not like
At night, Camila and Toby ___ TV together. (watch)|watch|watches,watching,are watch
#My weekend
On Saturdays, I ___ late. (wake up)|wake up|wakes up,waking up,am wake up
My roommate ___ pancakes for breakfast. (make)|makes|make,making,is make
We ___ breakfast on the balcony. (have)|have|has,having,are have
In the afternoon, my roommate ___ football with his friends. (play)|plays|play,playing,is play
I ___ football, so I stay home. (not / play)|don't play/do not play|doesn't play,not play,don't plays
I usually ___ a series in bed. (watch)|watch|watches,watching,am watch
On Sundays, we ___ my grandma. (visit)|visit|visits,visiting,are visit
She ___ the best empanadas in Chile! (cook)|cooks|cook,cooking,is cook
She always ___: “Eat more!” (say)|says|say,saying,is say
___ you have a favorite day of the week? (do)|Do|Does,Are,Is
`},
 {n:8, adv:true, t:"Advanced: future, states & emphasis", sub:"The train leaves at 8, when I get home, I do like it", why:"Present simple at B2–C1: timetables, future time clauses, state verbs and emphatic do.", es:"Presente simple nivel B2–C1: horarios, oraciones de tiempo futuro, verbos de estado y do enfático.", q:`
The train ___ at 7:45 tomorrow morning. (leave)|leaves/~is leaving/~will leave|is leave,will leaving,leave|Timetables → present simple, even for the future.|Horarios → presente simple, aunque sea futuro.
I'll call you when I ___ home. (get)|get|will get,getting,gets|After when (talking about the future), use the present simple, not will.|Después de when (hablando del futuro), presente simple, no will.
This soup ___ amazing! (taste)|tastes|is tasting,taste,tasting|Taste (how the soup is) is a state → no -ing.|Taste (cómo es la sopa) es un estado → sin -ing.
I ___ you're right about that. (think)|think|am thinking,thinks,am think|Think = my opinion → present simple.|Think = mi opinión → presente simple.
I don't eat meat, but I ___ like fish. (do, for emphasis)|do|does,am,doing|Emphatic do: "I do like fish" = I really like it.|Do enfático: "I do like fish" = sí me gusta.
If it ___ tomorrow, we'll stay home. (rain)|rains|will rain,raining,rain|First conditional: if + present simple, will + verb.|Primer condicional: if + presente simple, will + verbo.
Here ___ the bus! Run! (come)|comes|come,is come,coming|"Here comes…" uses the present simple for what's happening right now.|"Here comes…" usa presente simple para lo que pasa justo ahora.
As soon as the class ___, I'll send you the link. (end)|ends|will end,ending,end|After as soon as (future), present simple.|Después de as soon as (futuro), presente simple.
This bag ___ to my sister, not me. (belong)|belongs|is belonging,belong,belonging|Belong is a state verb: no -ing.|Belong es un verbo de estado: sin -ing.
What ___ this word mean?|does|do,is,means|Mean is a state verb: What does it mean?|Mean es un verbo de estado: What does it mean?
I ___ (not / understand) what you mean.|don't understand/do not understand|am not understanding,doesn't understand,not understand|Understand is a state verb: no -ing.|Understand es un verbo de estado: sin -ing.
She ___ (have) breakfast right now, so call her later.|is having/'s having|has,have,is have|Have = eat is an action, so it can take -ing. Have = own can't.|Have = comer es una acción, así que puede ir con -ing. Have = tener, no.
`}
];
PRS_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"prs"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"prs"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const PRS_TEST=`
My sister ___ in a hospital. (work)|works|My sister = she: works.
They ___ near the beach. (live)|live|They: no -s.
He ___ English at night. (study)|studies|Consonant + y → -ies.
She ___ a red car. (have)|has|have → has.
My dad ___ to work by bike. (go)|goes|go → goes.
The shop ___ at 9. (close)|closes|The shop = it: closes.
I ___ spicy food. (not / like)|don't like/do not like|I → don't + verb.
He ___ meat. (not / eat)|doesn't eat/does not eat|He → doesn't + verb (no -s).
We ___ a car. (not / have)|don't have/do not have|We → don't have.
She ___ a dog. (not / have)|doesn't have/does not have|After doesn't: have, not has.
___ you speak Spanish? (do)|Do|You → Do.
___ he work here? (do)|Does|He → Does.
Where ___ she live? (do)|does|She → does.
Does your mom ___ coffee? (drink)|drink|After does: no -s.
He always ___ his keys. (forget)|forgets|He → -s; always goes before the verb.
My kids ___ TV after school. (watch)|watch|My kids = they: no -s.
She ___ the dishes every night. (wash)|washes|After -sh: -es.
I ___ happy today. (be)|am|I → am.
My friends ___ very funny. (be)|are|They → are.
The baby ___ at night. (cry)|cries|Consonant + y → -ies.
He usually ___ up at 6. (get)|gets|He → gets up.
Do you like tea? Yes, I ___. (do)|do|Short answer: Yes, I do.
Does he play guitar? No, he ___. (do)|doesn't/does not|Short answer: No, he doesn't.
My cat ___ a lot. (sleep)|sleeps|My cat = it: sleeps.
What time ___ the movie start? (do)|does|The movie = it → does.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"prst-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Verb + -ing question bank (B1 friendly, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const ING_STAGES=[
 {n:1, t:"Before, after, without + -ing", sub:"before leaving, after work", why:"After a preposition (before, after, without, by, instead of, for…), use verb + -ing.", es:"Después de una preposición (before, after, without, by…), va verbo + -ing: antes de salir → before leaving.", q:`
Always check your email before ___ it. (send)|sending|send,to send,sent
I usually have a coffee after ___ lunch. (have)|having|have,to have,had
She left without ___ goodbye. (say)|saying|say,to say,said|without + -ing.|without + -ing: sin decir → without saying.
Turn off the lights before ___ the office. (leave)|leaving|leave,to leave,leaveing|Drop the -e: leave → leaving.|Se quita la -e: leave → leaving.
After ___ the report, I sent it to my boss. (finish)|finishing/having finished|finish,to finish,finished
You can improve your English by ___ every day. (practice)|practicing/practising|practice,to practice,practiced|by + -ing = how you do something.|by + -ing = cómo lo haces: practicando.
Instead of ___ a taxi, we took the metro. (take)|taking|take,to take,took
Wash your hands before ___. (eat)|eating|eat,to eat,ate
He got the job without ___ any experience. (have)|having|have,to have,had
I'm sorry for ___ late. (be)|being|be,to be,was
Think carefully before ___ a decision. (make)|making|make,to make,makeing|Drop the -e: make → making.|Se quita la -e: make → making.
Read the contract before ___ it. (sign)|signing|sign,to sign,signed
Thanks for ___ me! (help)|helping|help,to help,helped
Before ___ to bed, I read a little. (go)|going|go,to go,went
After ___ in Chile for years, she speaks perfect Spanish. (live)|living/having lived|live,to live,lived
We talked about ___ to Peru. (travel)|traveling/travelling|travel,to travel,traveled
`},
 {n:2, t:"Verbs that take -ing", sub:"enjoy cooking, avoid eating", why:"Some verbs are always followed by -ing: enjoy, finish, avoid, mind, keep, miss, practice, consider, imagine, give up.", es:"Algunos verbos siempre van con -ing: enjoy, finish, avoid, mind, keep, miss, practice, consider…", q:`
I really enjoy ___ for my friends. (cook)|cooking|cook,to cook,cooked
Have you finished ___ the email? (write)|writing|write,to write,writeing|Drop the -e: write → writing.|Se quita la -e: write → writing.
Try to avoid ___ late at night. (eat)|eating|eat,to eat,ate
Do you mind ___ a few minutes? (wait)|waiting|wait,to wait,waited
He keeps ___ me in meetings. (interrupt)|interrupting|interrupt,to interrupt,interrupted|keep + -ing = keep doing it again and again.|keep + -ing = no parar de: no para de interrumpirme.
I miss ___ near the beach. (live)|living|live,to live,lived
You need to practice ___ every day. (speak)|speaking|speak,to speak,spoke
We're considering ___ to a new office. (move)|moving|move,to move,moved
Imagine ___ in Japan for a year! (work)|working|work,to work,worked
She stopped ___ because it was bad for her. (smoke)|smoking|smoke,to smoke,smoked|stop + -ing = quit doing it.|stop + -ing = dejar de: dejó de fumar.
I can't stand ___ in long lines. (wait)|waiting/to wait|wait,to waiting,waited
He admitted ___ a mistake. (make)|making|make,to make,made
Don't give up ___ English! (learn)|learning|learn,to learn,learned
I spent the whole weekend ___. (study)|studying|study,to study,studied|spend time + -ing.|pasar tiempo + -ing: pasé el fin de semana estudiando.
I don't mind ___ in cold water. (swim)|swimming|swiming,swim,to swim|Short verb: double the last letter: swim → swimming.|Verbo corto: se duplica la última letra: swimming.
They delayed ___ the project until March. (start)|starting|start,to start,started
`},
 {n:3, t:"suggest, recommend, propose", sub:"I recommend going", why:"After suggest, recommend and propose, use -ing. Never 'suggest to go'. (Or use that + person + verb: I suggest that you go.)", es:"Después de suggest, recommend y propose va -ing. Nunca 'suggest to go'. (O usa that + persona + verbo: I suggest that you go.)", q:`
I recommend ___ the early train. (take)|taking|to take,take,took|recommend + -ing.|recommend + -ing: te recomiendo tomar → I recommend taking.
She suggested ___ out for dinner. (go)|going|to go,go,went|suggest + -ing. Never "suggest to go".|suggest + -ing. Nunca "suggest to go".
We proposed ___ two more people for the team. (hire)|hiring|hire,to hire,hired|propose + -ing: We proposed hiring…|propusimos contratar → we proposed hiring.
The doctor recommended ___ more water. (drink)|drinking|to drink,drink,drank
I suggest ___ the meeting to Friday. (move)|moving|to move,move,moved
They recommended ___ the tickets online. (buy)|buying|to buy,buy,bought
My manager suggested ___ a short break. (take)|taking|to take,take,took
Do you recommend ___ this hotel? (book)|booking|to book,book,booked
He proposed ___ the price by 10%. (lower)|lowering|to lower,lower,lowered
I'd suggest ___ with the easy questions. (start)|starting|to start,start,started
Experts recommend ___ at least 7 hours a night. (sleep)|sleeping|to sleep,sleep,slept
We recommend ___ early to get a good seat. (arrive)|arriving|to arrive,arrive,arriveing|Drop the -e: arrive → arriving.|Se quita la -e: arrive → arriving.
I recommend that you ___ early. (arrive)|arrive/should arrive|arriving,to arrive,arrives|With "that + person", use the normal verb: I recommend that you arrive.|Con "that + persona", va el verbo normal: that you arrive.
She suggested that we ___ a taxi. (take)|take/should take|taking,to take,takes|suggest that + person + verb (no -ing, no to).|suggest that + persona + verbo (sin -ing, sin to).
I suggest ___ a short email instead of calling. (send)|sending|to send,send,sent
Someone proposed ___ the office on Fridays. (close)|closing|to close,close,closeing|propose + -ing. Drop the -e: closing.|propose + -ing. Se quita la -e: closing.
`},
 {n:4, t:"good at, interested in, look forward to", sub:"word + preposition + -ing", why:"Many words come with a preposition: good at, interested in, tired of, thinking about, look forward to. After the preposition: -ing.", es:"Muchas palabras van con preposición: good at, interested in, tired of, look forward to. Después de la preposición: -ing.", q:`
I'm really interested in ___ more about AI. (learn)|learning|learn,to learn,learned
She's very good at ___ problems. (solve)|solving|solve,to solve,solveing|good at + -ing. Drop the -e: solving.|good at + -ing. Se quita la -e: solving.
I'm looking forward to ___ you next week. (see)|seeing|see,to see,saw|look forward to + -ing: here "to" is a preposition!|En look forward to, el "to" es preposición: va -ing.
I'm tired of ___ the same thing every day. (do)|doing|do,to do,did
We're thinking about ___ a house. (buy)|buying|buy,to buy,bought
He's afraid of ___ in public. (speak)|speaking|speak,to speak,spoke
Thank you for ___ so patient. (be)|being|be,to be,been
I'm used to ___ up early. (get)|getting|get,to get,geting|be used to + -ing = it's normal for me. Double the t: getting.|be used to + -ing = estar acostumbrado a. Se duplica la t: getting.
She apologized for ___ the deadline. (miss)|missing|miss,to miss,missed
They're excited about ___ the new office. (open)|opening|open,to open,opened
I'm not very good at ___ names. (remember)|remembering|remember,to remember,remembered
He insisted on ___ for dinner. (pay)|paying|pay,to pay,paid
Are you interested in ___ our team? (join)|joining|join,to join,joined
I'm worried about ___ my job. (lose)|losing|lose,to lose,loseing|Drop the -e: lose → losing.|Se quita la -e: lose → losing.
We look forward to ___ from you. (hear)|hearing|hear,to hear,heard|A classic email ending: We look forward to hearing from you.|Cierre típico de email: We look forward to hearing from you.
She's in charge of ___ new staff. (train)|training|train,to train,trained
`},
 {n:5, t:"-ing or to?", sub:"enjoy doing vs want to do", why:"Some verbs take -ing (enjoy, avoid, finish, suggest, mind). Others take to + verb (want, need, decide, hope, plan, agree).", es:"Algunos verbos van con -ing (enjoy, avoid, finish, suggest). Otros con to + verbo (want, need, decide, hope, plan).", q:`
I want ___ English fluently. (speak)|to speak|speaking,speak,to speaking|want + to + verb.|want + to + verbo.
I enjoy ___ English with friends. (speak)|speaking|to speak,speak,spoke|enjoy + -ing.|enjoy + -ing.
We decided ___ the meeting. (cancel)|to cancel|canceling,cancel,cancelled|decide + to + verb.|decide + to + verbo.
She avoids ___ her phone at dinner. (use)|using|to use,use,used|avoid + -ing.|avoid + -ing.
I hope ___ you soon. (see)|to see|seeing,see,saw|hope + to + verb.|hope + to + verbo.
He suggested ___ a break. (take)|taking|to take,take,took|suggest + -ing.|suggest + -ing.
They agreed ___ the contract. (sign)|to sign|signing,sign,signed|agree + to + verb.|agree + to + verbo.
I need ___ this report today. (finish)|to finish|finishing,finish,finished|need + to + verb.|need + to + verbo.
I've finished ___ the report. (write)|writing|to write,write,wrote|finish + -ing.|finish + -ing.
We're planning ___ in December. (travel)|to travel|traveling,travel,traveled|plan + to + verb.|plan + to + verbo.
Do you mind ___ the window? (open)|opening|to open,open,opened|mind + -ing.|mind + -ing.
I can't afford ___ a new car. (buy)|to buy|buying,buy,bought|afford + to + verb.|afford + to + verbo.
She managed ___ the problem. (fix)|to fix|fixing,fix,fixed|manage + to + verb = lograr.|manage + to + verbo = lograr.
I'd like ___ a table for two. (book)|to book|booking,book,booked|would like + to + verb.|would like + to + verbo.
He keeps ___ the same mistake. (make)|making|to make,make,made|keep + -ing.|keep + -ing.
I learned ___ when I was 30. (drive)|to drive|driving,drive,drove|learn + to + verb.|learn + to + verbo.
`},
 {n:6, t:"Mix it up", sub:"all of it, mixed", why:"After a preposition or verbs like enjoy/suggest/recommend: -ing. After want, need, decide, hope: to + verb.", es:"Después de preposición o verbos como enjoy/suggest/recommend: -ing. Después de want, need, decide, hope: to + verbo.", q:`
Before ___ the call, check your notes. (start)|starting|to start,start,started
I recommend ___ this book. (read)|reading|to read,read,readed
I'd love ___ with you on this project. (work)|to work|working,work,worked|would love + to + verb.|would love + to + verbo.
She left the meeting without ___ anything. (say)|saying|to say,say,said
We proposed ___ a new system. (use)|using|to use,use,used
I'm looking forward to ___ on holiday. (go)|going|to go,go,went
He refused ___ for the damage. (pay)|to pay|paying,pay,paid
Have you considered ___ jobs? (change)|changing|to change,change,changeing
I'm good at ___ under pressure. (work)|working|to work,work,worked
It's important ___ every day. (practice)|to practice/to practise|practicing,practice,practiced|After an adjective (important, easy, hard): to + verb.|Después de un adjetivo (important, easy): to + verbo.
After ___ the news, we all went quiet. (hear)|hearing|to hear,hear,heard
She promised ___ me back. (call)|to call|calling,call,called
Instead of ___, let's find a solution. (complain)|complaining|to complain,complain,complained
I suggest ___ the client first. (call)|calling|to call,call,called
Do you feel like ___ out tonight? (go)|going|to go,go,went
They expect ___ by Friday. (finish)|to finish|finishing,finish,finished
`},
 {n:7, t:"Tell the story", sub:"at work, 10 blanks", story:true, why:"Look at the word before the blank: a preposition, enjoy/suggest/recommend → -ing. want/need/decide → to + verb.", es:"Mira la palabra antes del espacio: preposición, enjoy/suggest/recommend → -ing. want/need/decide → to + verbo.", q:`
#Marta's first week
Before ___ her new job, Marta was nervous. (start)|starting|to start,start,started
Her boss suggested ___ the whole team on day one. (meet)|meeting|to meet,meet,met
She really enjoyed ___ to everyone. (talk)|talking|to talk,talk,talked
After ___ lunch together, they showed her the office. (have)|having|to have,have,had
On Tuesday, she decided ___ notes in English. (take)|to take|taking,take,took
Her manager recommended ___ a short online course. (do)|doing|to do,do,did
She's interested in ___ her presentation skills. (improve)|improving|to improve,improve,improved
She tries to avoid ___ too fast in meetings. (speak)|speaking|to speak,speak,spoke
On Friday, she left without ___ her laptop! (take)|taking|to take,take,took
She's looking forward to ___ back on Monday. (go)|going|to go,go,went
#The team meeting
Thanks for ___ to the meeting, everyone. (come)|coming|to come,come,came
Today I want ___ about our sales. (talk)|to talk|talking,talk,talked
Sales went down after ___ the price. (raise)|raising|to raise,raise,raised
Carlos suggested ___ a new ad campaign. (try)|trying|to try,try,tried
Ana proposed ___ two new salespeople. (hire)|hiring|to hire,hire,hired
I think it's worth ___ about. (think)|thinking|to think,think,thought
We need ___ a decision soon. (make)|to make|making,make,made
Let's avoid ___ too much money. (spend)|spending|to spend,spend,spent
Does anyone mind ___ the notes? (write)|writing|to write,write,wrote
Great! I look forward to ___ the results. (see)|seeing|to see,see,saw
`},
 {n:8, adv:true, t:"Advanced: remember doing vs remember to do", sub:"stop, try, regret, be used to, it's worth", why:"-ing at B2–C1: verbs that change meaning, be used to, and fixed -ing patterns.", es:"-ing nivel B2–C1: verbos que cambian de significado, be used to y estructuras fijas con -ing.", q:`
I remember ___ him at a party years ago. (meet)|meeting|to meet,meet,met|remember + -ing = a memory of something you did.|remember + -ing = un recuerdo de algo que hiciste.
Remember ___ the door when you leave! (lock)|to lock|locking,lock,locked|remember + to = don't forget to do it.|remember + to = no olvides hacerlo.
He stopped ___ two years ago. He feels great now. (smoke)|smoking|to smoke,smoke,smoked|stop + -ing = quit doing it.|stop + -ing = dejar de hacerlo.
I'm not used to ___ up so early. (get)|getting|get,got,to get|be used to + -ing = be accustomed to.|be used to + -ing = estar acostumbrado a.
This museum is worth ___. (visit)|visiting|to visit,visit,visited|It's worth + -ing = it's a good idea to do it.|It's worth + -ing = vale la pena.
I can't help ___ when I see that video. (laugh)|laughing|to laugh,laugh,laughed|can't help + -ing = I can't stop myself.|can't help + -ing = no puedo evitarlo.
I regret ___ to the party last night. I'm so tired today. (go)|going/having gone|to go,go,went|regret + -ing = I'm sorry I did it.|regret + -ing = me arrepiento de haberlo hecho.
If the computer freezes, try ___ it off and on again. (turn)|turning/~to turn|turned,turn to,turns|try + -ing = do it as an experiment to see if it works.|try + -ing = probar a ver si funciona.
She doesn't like ___ what to do. (tell, passive)|being told|telling,be told,been told|Passive -ing: being + participle.|-ing pasivo: being + participio.
After ___ the whole book, I watched the movie. (read)|having read/reading|to read,read,have read|After + -ing ("having + participle" stresses it finished first).|After + -ing ("having + participio" recalca que terminó antes).
Would you mind ___ the music down? (turn)|turning|to turn,turn,turned|mind + -ing.|mind + -ing.
My car needs ___. It's so dirty. (wash)|washing/to be washed|to wash,wash,washed|need + -ing = it needs to be done (passive meaning).|need + -ing = necesita que lo hagan (sentido pasivo).
I have trouble ___ new words. (remember)|remembering|to remember,remember,remembered|have trouble / difficulty + -ing.|have trouble / difficulty + -ing = me cuesta.
`}
];
ING_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"ing"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"ing"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const ING_TEST=`
Call me before ___ the office. (leave)|leaving|Before + -ing. Drop the -e.
She left without ___ a word. (say)|saying|without + -ing.
I enjoy ___ in the morning. (run)|running|enjoy + -ing. Double the n.
We recommend ___ the tickets early. (buy)|buying|recommend + -ing.
He suggested ___ a meeting. (have)|having|suggest + -ing, never "suggest to".
We proposed ___ more staff. (hire)|hiring|propose + -ing.
I want ___ a new job. (find)|to find|want + to + verb.
They decided ___ the trip. (cancel)|to cancel|decide + to + verb.
I'm looking forward to ___ you. (meet)|meeting|look forward to + -ing.
She's good at ___ people. (manage)|managing|good at + -ing.
I'm interested in ___ abroad. (study)|studying|interested in + -ing.
Do you mind ___ me? (help)|helping|mind + -ing.
I need ___ my boss. (call)|to call|need + to + verb.
He keeps ___ late. (arrive)|arriving|keep + -ing.
After ___ the email, she felt better. (send)|sending|after + -ing.
I'm tired of ___ for the bus. (wait)|waiting|tired of + -ing.
We hope ___ soon. (finish)|to finish|hope + to + verb.
I suggest that you ___ a break. (take)|take/should take|suggest that + person + verb.
She avoided ___ the question. (answer)|answering|avoid + -ing.
Thanks for ___ me. (invite)|inviting|for + -ing.
I'm used to ___ in English. (work)|working|be used to + -ing.
It's worth ___ the movie. (see)|seeing|it's worth + -ing.
I'd like ___ a coffee. (order)|to order|would like + to + verb.
Instead of ___, he went home. (stay)|staying|instead of + -ing.
She managed ___ on time. (arrive)|to arrive|manage + to + verb.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"ingt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Could vs was able to question bank (B1 friendly, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const COU_STAGES=[
 {n:1, t:"can, could, be able to", sub:"I can, I could, I'll be able to", why:"Ability now: can. Ability in the past: could. Future: will be able to (never 'will can').", es:"Habilidad ahora: can. En el pasado: could. En el futuro: will be able to (nunca 'will can').", q:`
I ___ speak three languages. (now)|can/am able to|could,am able,can to|Now → can.|Ahora → can.
When I was ten, I ___ run really fast. (then)|could/was able to|can,could to,was can|Past → could.|Pasado → could.
Next year, I ___ drive. (future)|will be able to/'ll be able to/~can|will can,will able to,could|Future: will be able to. 'Will can' doesn't exist.|Futuro: will be able to. 'Will can' no existe.
My grandma ___ read without glasses, even at 90. (now)|can/is able to|cans,could to,is can|Now → can (no -s, even with she).|Ahora → can (sin -s, aunque sea she).
Before the accident, he ___ play the piano. (then)|could/was able to|can,coulds,could to|Past → could.|Pasado → could.
After a few more lessons, I ___ swim across the pool. (future)|will be able to/'ll be able to|will can,can,could to|Future: will be able to.|Futuro: will be able to.
She ___ swim, but she doesn't like it. (now)|can/is able to|can to,cans,is able|Now → can + verb (no 'to').|Ahora → can + verbo (sin 'to').
At university, we ___ sleep until noon. (then)|could/were able to|can,could to,were can|Past → could.|Pasado → could.
After this course, you ___ write better emails. (future)|will be able to/'ll be able to/~can|will can,will able to,could|Future: will be able to.|Futuro: will be able to.
He ___ cook, but he can bake great bread. (now, negative)|can't/cannot/isn't able to/is not able to|couldn't,can not to,doesn't can|Now, negative → can't.|Ahora, negativo → can't.
When I was a baby, I ___ talk. (then, negative)|couldn't/could not/wasn't able to/was not able to|can't,didn't could,couldn't to|Past, negative → couldn't.|Pasado, negativo → couldn't.
Don't worry, by next month you ___ do it without help. (future)|will be able to/'ll be able to|will can,can,could to|Future: will be able to.|Futuro: will be able to.
My dog ___ open the door by himself. It's scary. (now)|can/is able to|cans,could to,is can|Now → can.|Ahora → can.
Ten years ago, I ___ eat anything and not get fat. (then)|could/was able to|can,could to,was can|Past → could.|Pasado → could.
`},
 {n:2, t:"could: ability in general", sub:"when I was a kid, I could…", why:"For a general ability in the past (something you could do any time), use could. Was/were able to is also correct here.", es:"Para una habilidad general en el pasado (algo que podías hacer siempre), usa could. Was/were able to también está bien aquí.", q:`
When I was five, I ___ already read. (read)|could/was able to|can,could to,could read|General past ability → could.|Habilidad general en el pasado → could.
My grandpa ___ fix anything in the house. (fix)|could/was able to|can,could fixed,could to|Something he could always do → could.|Algo que siempre podía hacer → could.
As a teenager, she ___ dance for hours. (dance)|could/was able to|can,could danced,could to|General past ability → could.|Habilidad general en el pasado → could.
In my old job, I ___ work from home on Fridays. (work)|could/was able to|can,could worked,could to|It was possible every Friday → could.|Era posible todos los viernes → could.
Before the surgery, he ___ walk very well. (walk, negative)|couldn't/could not/wasn't able to/was not able to|can't,didn't could,couldn't walked|General, negative → couldn't.|General, negativo → couldn't.
In the 90s, you ___ smoke in restaurants. (smoke)|could/were able to|can,could smoked,could to|It was allowed back then → could.|Estaba permitido en esa época → could.
My sister ___ speak French when she lived in Paris. (speak)|could/was able to|can,could spoke,could to|General past ability → could.|Habilidad general en el pasado → could.
When we were kids, we ___ play in the street all day. (play)|could/were able to|can,could played,could to|General past ability → could.|Habilidad general en el pasado → could.
I ___ understand my teacher at first. She talked so fast! (understand, negative)|couldn't/could not/wasn't able to/was not able to|can't,didn't could,couldn't understood|Negative → couldn't.|Negativo → couldn't.
Our old house was on a hill. We ___ see the ocean from the kitchen. (see)|could/were able to|can,could saw,could to|See, hear, smell → could, even for one moment.|Con see, hear, smell → could, incluso para un momento.
From my window I ___ hear the neighbours every night. (hear)|could/was able to|can,could heard,could to|Senses (hear, see) → could.|Con los sentidos (hear, see) → could.
He was a great student. He ___ remember everything. (remember)|could/was able to|can,could remembered,could to|General past ability → could.|Habilidad general en el pasado → could.
When I lived in Chile, I ___ eat avocado every day. (eat)|could/was able to|can,could ate,could to|General past ability → could.|Habilidad general en el pasado → could.
At 20, my mom ___ already drive a truck. (drive)|could/was able to|can,could drove,could to|General past ability → could.|Habilidad general en el pasado → could.
`},
 {n:3, t:"was able to: one specific moment", sub:"I was able to fix it", why:"For ONE specific success in the past (you did it, maybe it was difficult), use was/were able to or managed to. Not could.", es:"Para UN logro específico en el pasado (lo lograste, quizás con esfuerzo), usa was/were able to o managed to. No could.", q:`
The exam was hard, but I ___ pass it. (pass)|was able to/managed to|could,can,could to|One specific success → was able to.|Un logro específico → was able to: logré aprobar.
The door was stuck, but finally we ___ open it. (open)|were able to/managed to|could,can,was able to|One specific moment + we → were able to.|Un momento específico + we → were able to.
There was a lot of traffic, but she ___ arrive on time. (arrive)|was able to/managed to|could,can,were able to|She did it that day → was able to.|Lo logró ese día → was able to.
The fire spread fast, but everyone ___ escape. (escape)|was able to/managed to|could,can,were able|One specific success → was able to.|Un logro específico → was able to.
I lost my keys yesterday, but I ___ find them in the car. (find)|was able to/managed to|could,can,could to|Yesterday, one success → was able to.|Ayer, un logro → was able to.
After three hours, the mechanic ___ fix my car. (fix)|was able to/managed to|could,can,could fixed|One specific success → was able to.|Un logro específico → was able to.
The flight was full, but we ___ get two seats together. (get)|were able to/managed to|could,can,was able to|We + one success → were able to.|We + un logro → were able to.
I ___ talk to the manager and solve the problem. (talk)|was able to/managed to|could,can,could to|One specific success → was able to.|Un logro específico → was able to.
It was raining all day, but they ___ finish the race. (finish)|were able to/managed to|could,can,was able to|They + one success → were able to.|They + un logro → were able to.
My phone died, but I ___ call you from a friend's phone. (call)|was able to/managed to|could,can,could called|One specific moment → was able to.|Un momento específico → was able to.
The interview was in English, and I ___ answer every question. (answer)|was able to/managed to|could,can,could answered|One specific success → was able to.|Un logro específico → was able to.
The concert was sold out, but Ana ___ buy a ticket online. (buy)|was able to/managed to|could,can,were able to|One specific success → was able to.|Un logro específico → was able to.
The ice was thin, but the kids ___ cross the lake. (cross)|were able to/managed to|could,can,was able to|The kids = they → were able to.|The kids = they → were able to.
I was really tired, but I ___ stay awake until the end of the movie. (stay)|was able to/managed to|could,can,could to|One specific success → was able to.|Un logro específico → was able to.
`},
 {n:4, t:"Negatives: couldn't", sub:"I couldn't open it", why:"In the negative, couldn't works for everything: general ability AND one specific moment. Wasn't/weren't able to is also correct.", es:"En negativo, couldn't sirve para todo: habilidad general Y un momento específico. Wasn't/weren't able to también está bien.", q:`
I tried and tried, but I ___ open the jar. (open)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't to|Negative → couldn't works, even for one moment.|Negativo → couldn't sirve, incluso para un momento.
She ___ come to the party. She was sick. (come)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't came|Negative → couldn't.|Negativo → couldn't.
We ___ find a parking spot, so we went home. (find)|couldn't/could not/weren't able to/were not able to|didn't could,can't,couldn't found|Negative → couldn't (+ verb in base form).|Negativo → couldn't (+ verbo en forma base).
I ___ sleep last night. The neighbours were so loud! (sleep)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't slept|Negative → couldn't + base verb.|Negativo → couldn't + verbo base.
They ___ understand the instructions. (understand)|couldn't/could not/weren't able to/were not able to|didn't could,can't,couldn't understood|Negative → couldn't.|Negativo → couldn't.
He ___ swim until he was 30. (swim)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't swam|General, negative → couldn't.|General, negativo → couldn't.
Sorry, I ___ answer your call. I was in a meeting. (answer)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't answered|Negative → couldn't.|Negativo → couldn't.
The wifi was terrible, so I ___ join the class. (join)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't joined|Negative → couldn't.|Negativo → couldn't.
My parents ___ afford a car when I was a kid. (afford)|couldn't/could not/weren't able to/were not able to|didn't could,can't,couldn't afforded|Negative → couldn't.|Negativo → couldn't.
I ___ believe it when I heard the news! (believe)|couldn't/could not|didn't could,can't,couldn't believed|Common expression: I couldn't believe it.|Expresión común: I couldn't believe it (no lo podía creer).
The doctor ___ see me until Friday. (see)|couldn't/could not/wasn't able to/was not able to/~can't/~cannot|didn't could,can't to,couldn't saw|Negative → couldn't.|Negativo → couldn't.
We ___ hear you. Can you repeat that? (hear)|couldn't/could not/can't/cannot|didn't could,can't heard,couldn't heard|Negative → couldn't + base verb.|Negativo → couldn't + verbo base.
She ___ remember his name at the meeting. (remember)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't remembered|Negative → couldn't.|Negativo → couldn't.
I ___ say no. He looked so sad! (say)|couldn't/could not|didn't could,can't said,couldn't said|Negative → couldn't + base verb.|Negativo → couldn't + verbo base.
`},
 {n:5, t:"Questions: Could you…? Were you able to…?", sub:"Were you able to fix it?", why:"Question about general past ability: Could you…? About one specific moment: Were you able to…? (Could you…? now is also a polite request.)", es:"Pregunta sobre habilidad general pasada: Could you…? Sobre un momento específico: Were you able to…? (Could you…? en presente también es una petición amable.)", q:`
___ you swim when you were a kid? (general)|Could|Were,Did,Can|General past ability → Could you…?|Habilidad general pasada → Could you…?
___ you able to fix the printer yesterday? (one moment)|Were|Could,Did,Was|One specific moment → Were you able to…?|Un momento específico → Were you able to…?
Was she ___ to get a ticket? (one moment)|able|could,can,possible|Was she able to…?|Was she able to…?
___ you speak English when you moved to London? (general)|Could|Were,Did,Can|General past ability → Could you…?|Habilidad general pasada → Could you…?
___ they able to finish the project on time? (one moment)|Were|Could,Did,Was|They + one moment → Were they able to…?|They + un momento → Were they able to…?
___ you pass me the salt, please? (polite request)|Could/Can/Would|Were,Did,Are|Polite request → Could you…?|Petición amable → Could you…?
Were you able to ___ him? (call)|call|called,calling,to call|After 'able to' → base verb.|Después de 'able to' → verbo base.
Could you ___ the music from your room? (hear)|hear|heard,hearing,to hear|After could → base verb.|Después de could → verbo base.
___ he able to come to the meeting? (one moment)|Was|Could,Did,Were|He + one moment → Was he able to…?|He + un momento → Was he able to…?
___ you help me with this box? (polite request)|Could/Can/Would|Were,Did,Was|Polite request → Could you…?|Petición amable → Could you…?
Was your dad able to ___ the car? (fix)|fix|fixed,fixing,to fix|After 'able to' → base verb.|Después de 'able to' → verbo base.
Were you able to sleep on the plane? Yes, I ___. (short answer)|was|could,did,were|Short answer: Yes, I was.|Respuesta corta: Yes, I was.
Could she read when she was four? No, she ___. (short answer)|couldn't/could not|wasn't,didn't,can't|Short answer: No, she couldn't.|Respuesta corta: No, she couldn't.
___ you able to find the restaurant OK last night? (one moment)|Were|Could,Did,Was|One specific moment → Were you able to…?|Un momento específico → Were you able to…?
`},
 {n:6, t:"will be able to, have been able to", sub:"other tenses: use be able to", why:"Can and could only have these two forms. For the future, the present perfect or after another modal, use be able to: will be able to, have been able to, might be able to.", es:"Can y could solo tienen esas dos formas. Para el futuro, el present perfect o después de otro modal, usa be able to: will be able to, have been able to, might be able to.", q:`
In two months, you ___ have basic conversations. (future)|will be able to/'ll be able to/~can|will can,will able to,could|Future → will be able to.|Futuro → will be able to.
I ___ sleep well since I moved. (present perfect, negative)|haven't been able to/have not been able to|didn't can,haven't could,couldn't been|Present perfect → have been able to.|Present perfect → have been able to.
She ___ finish the report yet. (present perfect, negative)|hasn't been able to/has not been able to|hasn't could,didn't can,isn't able|Present perfect → has been able to.|Present perfect → has been able to.
I'm busy now, but I ___ help you later. (might)|might be able to|might can,might could,might able to|After another modal (might) → be able to.|Después de otro modal (might) → be able to.
I'd love ___ play the guitar. (would love + to)|to be able to|to can,can,could|After 'love to', 'want to' → be able to.|Después de 'love to', 'want to' → be able to.
Have you ___ talk to your boss? (present perfect)|been able to|could,can,be able to|Present perfect → have you been able to…?|Present perfect → have you been able to…?
When the new metro line opens, we ___ get to work in 20 minutes. (future)|will be able to/'ll be able to/~can|will can,will able to,could to|Future → will be able to.|Futuro → will be able to.
Since I started practicing, I ___ understand movies without subtitles. (present perfect)|'ve been able to/have been able to|could,can,have could|Present perfect → have been able to.|Present perfect → have been able to.
You need ___ speak English for this job. (need to)|to be able to|to can,can,could|After 'need to' → be able to.|Después de 'need to' → be able to.
If you practice every day, you ___ speak with more confidence. (future)|will be able to/'ll be able to/~can|will can,will able to,could|Future → will be able to.|Futuro → will be able to.
We ___ meet next week. I'll let you know. (may)|may be able to|may can,may could,may able to|After may → be able to.|Después de may → be able to.
They ___ fix the problem yet. (present perfect, negative)|haven't been able to/have not been able to|didn't can,haven't could,couldn't been|Present perfect → have been able to.|Present perfect → have been able to.
I hate not ___ sleep. (not + -ing)|being able to|can,could,be able|After a preposition or 'not' + -ing → being able to.|Con -ing → being able to.
One day, robots ___ do all the housework. (future)|will be able to/'ll be able to|will can,can,could|Future → will be able to.|Futuro → will be able to.
`},
 {n:7, t:"Tell the story", sub:"a hard day, 10 blanks", story:true, why:"General past ability → could. One specific success → was/were able to. Negative → couldn't. Future → will be able to.", es:"Habilidad general pasada → could. Un logro específico → was/were able to. Negativo → couldn't. Futuro → will be able to.", q:`
#The job interview
When I was at school, I ___ speak English very well. (speak, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't spoke
But I practiced a lot, and now I ___ have long conversations. (now)|can/am able to|could,can to,am able
Last Monday, I had a big job interview in English. My bus was late, but I ___ arrive on time. (arrive)|was able to/managed to|could,can,could arrived
The first question was hard, but I ___ answer it. (answer)|was able to/managed to|can,could answered,could to
Then they asked a technical question, and I ___ remember the word "budget"! (remember, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't remembered
I stayed calm and ___ explain the idea with other words. (explain)|was able to/managed to|could,can,could explained
They asked: "___ you start next month?" (polite question)|Could/Can|Were,Did,Are
I said: "Yes, I'll ___ start on the 1st." (future)|be able to|can,could,able to
Yesterday they called me. I ___ believe it: I got the job! (believe, negative)|couldn't/could not|didn't could,can't,couldn't believed
Now I'm sure I ___ work in English every day. (future)|will be able to/'ll be able to/~can|will can,will able to,could
#My grandma's village
My grandma grew up in a small village. As a girl, she ___ climb any tree. (climb)|could/was able to|can,could climbed,could to
There was no school nearby, so she ___ read until she was twelve. (read, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't read to
From her house, she ___ hear the river at night. (hear)|could/was able to|can,could heard,could to
One winter, a big storm came, but her family ___ save all the animals. (save)|was able to/managed to/were able to|could,can,could to
Her brother ___ find the road home for two days. (find, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't found
Finally, he ___ get home with help from a neighbour. (get)|was able to/managed to|could,can,could got
Today she's 85, and she ___ still cook for twenty people. (now)|can/is able to|could,can to,is able
Last month she ___ walk to the river by herself! (one success)|was able to/managed to|could,can,were able to
By next summer, I ___ talk to her neighbours in their dialect. (future)|will be able to/'ll be able to|will can,can,could
I'm sure I ___ understand her stories better then. (future)|will be able to/'ll be able to|will can,can,could
`},
 {n:8, adv:true, t:"Advanced: managed to, could have…", sub:"I managed to, you could have called, it can't have been", why:"Ability and possibility at B2–C1: managed to, could have, can't have and being able to.", es:"Habilidad y posibilidad nivel B2–C1: managed to, could have, can't have y being able to.", q:`
The exam was hard, but I ___ to pass. (succeed)|managed/~was able|manage,could,was manage|One specific success → managed to (or was able to), not could.|Un logro puntual → managed to (o was able to), no could.
You ___ called me! I would have helped.|could have/could've|can have,could has,could of|Could have + participle = it was possible, but you didn't do it.|Could have + participio = era posible, pero no lo hiciste.
He ___ stolen it. He was with me all day. (impossible)|can't have/couldn't have|mustn't have,can't has,couldn't of|Can't / couldn't have = I'm sure it didn't happen.|Can't / couldn't have = estoy seguro de que no pasó.
I'd love ___ speak English without thinking.|to be able to|to can,being able,can|After love / want / need → to be able to (never "to can").|Después de love / want / need → to be able to (nunca "to can").
___ able to work from home is a big advantage.|Being/~To be|Be,To can,Can|As the subject of a sentence → being able to.|Como sujeto de la oración → being able to.
We were so tired that we ___ stay awake.|couldn't/could not|can't,didn't could,couldn't to|General past inability → couldn't.|Incapacidad en el pasado → couldn't.
I ___ have finished earlier if you'd helped me.|could/~would|can,would can,could to|Could have + participle = an unreal past possibility.|Could have + participio = una posibilidad que no se dio.
___ you possibly close the window? (very polite)|Could|Should,Must,Did|"Could you possibly…?" is a very polite request.|"Could you possibly…?" es una petición muy amable.
The firefighters ___ to rescue everyone. (one specific success)|were able/managed|could,can,are able|One specific success in the past → were able to / managed to.|Un logro puntual en el pasado → were able to / managed to.
I haven't ___ to sleep well since I moved. (be able)|been able|could,be able,can|Present perfect: haven't been able to.|Present perfect: haven't been able to.
They ___ have gotten lost. Let's call them. (maybe)|might/may/could|can,must to,should of|Might / may / could have = maybe it happened.|Might / may / could have = tal vez pasó.
You should ___ to see the mountains from the hotel. (be able)|be able|can,able,could|After a modal (should, might, will) → be able to.|Después de un modal (should, might, will) → be able to.
`}
];
COU_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"cou"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"cou"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const COU_TEST=`
I ___ ride a bike. I learned last year. (now)|can/am able to|Now → can.
When I was six, I ___ already swim. (general past)|could/was able to|General past ability → could.
The test was hard, but I ___ pass it. (one success)|was able to/managed to|One specific success → was able to, not could.
We ___ find the hotel, so we asked for help. (negative)|couldn't/could not/weren't able to/were not able to|Negative → couldn't.
Next year I ___ drive. (future)|will be able to/'ll be able to/~can|Future → will be able to.
I ___ sleep well lately. (present perfect, negative)|haven't been able to/have not been able to|Present perfect → haven't been able to.
___ you able to call him yesterday? (one moment)|Were|One moment → Were you able to…?
___ you play an instrument when you were a kid? (general)|Could|General → Could you…?
The traffic was crazy, but they ___ arrive on time. (one success)|were able to/managed to|They + one success → were able to.
She ___ come yesterday. She was working. (negative)|couldn't/could not/wasn't able to/was not able to|Negative → couldn't.
From the hotel we ___ see the mountains. (senses)|could/were able to|See, hear → could.
I might ___ help you on Friday. (might)|be able to|After might → be able to.
After many tries, he ___ open the box. (one success)|was able to/managed to|One success → was able to.
My grandpa ___ fix anything. (general past)|could/was able to|General past ability → could.
___ you help me, please? (polite request)|Could/Can/Would|Polite request → Could you…?
Were you able to fix it? Yes, I ___. (short answer)|was|Yes, I was.
I want ___ speak English fluently. (want to)|to be able to|After want to → be able to.
She ___ finish the project yet. (present perfect, negative)|hasn't been able to/has not been able to|Present perfect → hasn't been able to.
I ___ believe my eyes! (negative)|couldn't/could not|I couldn't believe it.
The fire was big, but everyone ___ get out. (one success)|was able to/managed to|One success → was able to.
In two weeks, you ___ use these words. (future)|will be able to/'ll be able to/~can|Future → will be able to.
Could you ___ the music? (hear)|hear|After could → base verb.
They ___ afford a house when they were young. (negative)|couldn't/could not/weren't able to/were not able to|Negative → couldn't.
Have you ___ talk to her? (present perfect)|been able to|Have you been able to…?
My sister ___ speak Japanese now. (now)|can/is able to|Now → can (no -s).
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"cout-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Indirect questions question bank (B1+ to B2, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint
   6 core stages + the ⭐ Advanced one (a module can have any number of stages) */
const IQ_STAGES=[
 {n:1, t:"Back to normal order", sub:"Do you know where the station is? · what he has done", why:"Inside a polite question, the question goes back to normal order: subject + verb.", es:"Dentro de una pregunta educada, la pregunta vuelve al orden normal: sujeto + verbo.", q:`
Do you know where ___? (the station / be)|the station is|is the station,the station be,does the station is|After "Do you know", normal order: the station is.|Después de "Do you know", orden normal: the station is.
Can you tell me what time ___? (it / be)|it is/it's|is it,it be,does it be|Normal order: what time it is (not "what time is it").|Orden normal: what time it is (no "what time is it").
I don't know who ___. (that man / be)|that man is|is that man,that man does,does that man be|Normal order: who that man is.|Orden normal: who that man is.
Do you know when ___ open? (the bank / will)|the bank will|will the bank,the bank wills,does the bank will|Subject first, then will.|Primero el sujeto, después will.
Could you tell me where ___ park? (I / can)|I can|can I,I could to,do I can|Subject first, then can: where I can park.|Primero el sujeto, después can: where I can park.
Do you know what ___ done? (he / have)|he has/he's|has he,he have,did he has|Subject first, then has: what he has done.|Primero el sujeto, después has: what he has done.
I'm not sure how old ___. (she / be)|she is/she's|is she,she be,does she is|Normal order: how old she is.|Orden normal: how old she is.
Can you tell me how much ___? (this jacket / be)|this jacket is|is this jacket,this jacket does,does this jacket is|Normal order: how much this jacket is.|Orden normal: how much this jacket is.
I wonder what ___ doing right now. (they / be)|they are/they're|are they,they be,do they are|Normal order: what they are doing.|Orden normal: what they are doing.
Do you know when ___ be back? (she / will)|she will/she'll|will she,she wills,does she will|Subject first, then will: when she will be back.|Primero el sujeto, después will: when she will be back.
Can you tell me where ___ been? (you / have)|you have/you've|have you,you has,did you have|Subject first, then have: where you have been.|Primero el sujeto, después have: where you have been.
I have no idea why ___ so angry. (he / be)|he is/he's/~he was|is he,he be,does he is|Normal order: why he is so angry.|Orden normal: why he is so angry.
Do you know how long ___ stay? (we / can)|we can|can we,we could to,do we can|Subject first, then can: how long we can stay.|Primero el sujeto, después can: how long we can stay.
`},
 {n:2, t:"do, does, did disappear", sub:"where she lives · what time it starts · where he went", why:"In an indirect question, do / does / did disappear. The tense moves onto the verb: lives, starts, went.", es:"En una pregunta indirecta, do / does / did desaparecen. El tiempo pasa al verbo: lives, starts, went.", q:`
Do you know where ___? (she / live)|she lives|does she live,she live,she living|No does: the -s goes on the verb. Where she lives.|Sin does: la -s va en el verbo. Where she lives.
Can you tell me what time ___? (the movie / start)|the movie starts|does the movie start,the movie start,did the movie starts|No does: what time the movie starts.|Sin does: what time the movie starts.
I don't know where ___ last night. (he / go)|he went|did he go,he go,he did went|No did: the verb goes to the past. Where he went.|Sin did: el verbo pasa a pasado. Where he went.
Do you know how much ___? (it / cost, now)|it costs|does it cost,it cost,it does costs|No does: how much it costs.|Sin does: how much it costs.
Could you tell me when ___? (the last bus / leave)|the last bus leaves|does the last bus leave,the last bus leave,did the last bus leaves|No does: when the last bus leaves.|Sin does: when the last bus leaves.
Do you remember what ___ for dinner? (we / eat, past)|we ate|did we eat,we eated,we did ate|No did: what we ate.|Sin did: what we ate.
I'm not sure why ___ early. (she / leave, past)|she left|did she leave,she leaved,she did left|No did: why she left.|Sin did: why she left.
Do you know what ___ for a living? (your brother / do)|your brother does|does your brother do,your brother do,your brother doing|"Do" is the main verb here, so it stays: what your brother does.|Aquí "do" es el verbo principal, así que se queda: what your brother does.
Can you tell me where ___ these shoes? (you / buy, past)|you bought|did you buy,you buyed,you did bought|No did: where you bought them.|Sin did: where you bought them.
Do you know what ___? (this word / mean)|this word means|does this word mean,this word mean,this word meaning|No does: what this word means.|Sin does: what this word means.
I have no idea what ___ yesterday. (she / say)|she said|did she say,she sayed,she did said|No did: what she said.|Sin did: what she said.
Do you know how often ___? (the bus / come)|the bus comes|does the bus come,the bus come,the bus coming|No does: how often the bus comes.|Sin does: how often the bus comes.
I wonder how ___ so fast. (they / learn, past)|they learned/they learnt|did they learn,they learn,they did learned|No did: how they learned.|Sin did: how they learned.
`},
 {n:3, t:"Yes/no questions: if or whether", sub:"Do you know if it's open? · I wonder whether they'll remember", why:"A yes/no question has no question word, so you add if (or whether) and use normal order.", es:"Una pregunta de sí o no no tiene palabra interrogativa, así que agregas if (o whether) y usas orden normal.", q:`
Do you know ___ open on Sundays? (Is the museum open…?)|if the museum is/whether the museum is|is the museum,if is the museum,does the museum be|Yes/no question → if + normal order.|Pregunta de sí o no → if + orden normal.
Can you tell me ___ a bathroom here? (Is there…?)|if there is/whether there is/if there's/whether there's|is there,if is there,there is if|Yes/no question → if there is.|Pregunta de sí o no → if there is.
I'm not sure ___ coming. (Is he coming?)|if he is/whether he is/if he's/whether he's|is he,if is he,he if is|If + normal order: if he is coming.|If + orden normal: if he is coming.
Do you know ___ the meeting? (Did she go to…?)|if she went to/whether she went to|did she go to,if did she go to,if she go to|No did: if she went.|Sin did: if she went.
I wonder ___ remember me. (Will they remember me?)|if they will/whether they will/if they'll/whether they'll|will they,if will they,they will if|If + normal order: if they will remember me.|If + orden normal: if they will remember me.
Could you tell me ___ breakfast? (Does the room include…?)|if the room includes/whether the room includes|does the room include,if does the room include,if the room include|No does: if the room includes.|Sin does: if the room includes.
Do you know ___ any brothers? (Does Laura have…?)|if Laura has/whether Laura has|does Laura have,if does Laura have,if Laura have|No does: if Laura has.|Sin does: if Laura has.
Can you check ___ the door? (Did I lock…?)|if I locked/whether I locked|did I lock,if did I lock,if I locking|No did: if I locked the door.|Sin did: if I locked the door.
Do you know ___? (Has the class started?)|if the class has started/whether the class has started|has the class started,if has the class started,if the class have started|If + normal order: if the class has started.|If + orden normal: if the class has started.
Do you know ___ speak English? (Can she…?)|if she can/whether she can|can she,if can she,she can if|If + normal order: if she can speak.|If + orden normal: if she can speak.
Let me know ___ come to the party. (Can you…?)|if you can/whether you can|can you,if can you,you can if|If + normal order: if you can come.|If + orden normal: if you can come.
I'm not sure ___ right. (Am I right?)|if I am/whether I am/if I'm/whether I'm|am I,if am I,I am if|If + normal order: if I am right.|If + orden normal: if I am right.
I don't know ___ she likes coffee. (yes/no)|if/whether|does,what,is|Yes/no question → if or whether.|Pregunta de sí o no → if o whether.
`},
 {n:4, t:"Polite openers", sub:"I wonder… · Would you mind telling me… · I have no idea…", why:"Many openers work the same way: I wonder, I'd like to know, I can't remember, Would you mind telling me. After all of them: normal order.", es:"Muchas frases funcionan igual: I wonder, I'd like to know, I can't remember, Would you mind telling me. Después de todas: orden normal.", q:`
I wonder where ___. (Where is he?)|he is/he's|is he,he does be,does he is|I wonder + normal order. It's a statement, so it ends with a period.|I wonder + orden normal. Es una afirmación, así que termina con punto.
Would you mind telling me how old ___? (How old are you?)|you are/you're|are you,you be,do you are|Normal order: how old you are.|Orden normal: how old you are.
I'd like to know why ___ late. (Why was the train late?)|the train was|was the train,did the train be,the train did be|Normal order: why the train was late.|Orden normal: why the train was late.
I can't remember what ___. (What's her name?)|her name is|is her name,her name does,does her name is|Normal order: what her name is.|Orden normal: what her name is.
Do you have any idea how ___ there? (How do I get there?)|I get/I can get|do I get,I getting,did I get|No do: how I get there.|Sin do: how I get there.
I'm not sure what ___. (What does he want?)|he wants|does he want,he want,he does wants|No does: what he wants.|Sin does: what he wants.
Who knows when ___? (When will it end?)|it will end/it'll end|will it end,it wills end,does it will end|Normal order: when it will end.|Orden normal: when it will end.
Nobody told me where ___. (Where did they go?)|they went|did they go,they go,they did went|No did: where they went.|Sin did: where they went.
Could you explain how ___? (How does this machine work?)|this machine works|does this machine work,this machine work,this machine working|No does: how this machine works.|Sin does: how this machine works.
I'd love to know what ___ about me. (What did she say?)|she said|did she say,she say,she did said|No did: what she said.|Sin did: what she said.
Tell me what ___. (What do you need?)|you need|do you need,you needing,you does need|No do: what you need.|Sin do: what you need.
I have no idea where ___. (Where are my glasses?)|my glasses are|are my glasses,my glasses is,do my glasses are|Normal order: where my glasses are.|Orden normal: where my glasses are.
I wonder ___. (Is it going to rain?)|if it is going to rain/whether it is going to rain/if it's going to rain/whether it's going to rain|is it going to rain,if is it going to rain,it is going to rain if|Yes/no question → if + normal order.|Pregunta de sí o no → if + orden normal.
`},
 {n:5, t:"The who / what trap", sub:"Do you know who called? · what happened?", why:"When who or what is the subject of the question, the order is already normal. Nothing moves: Who called? → Do you know who called?", es:"Cuando who o what es el sujeto de la pregunta, el orden ya es normal. Nada se mueve: Who called? → Do you know who called?", q:`
Do you know who ___? (Who called?)|called|call,did called,calling|Who is the subject, so nothing changes: who called.|Who es el sujeto, así que nada cambia: who called.
Do you know who ___? (Who did you call?)|you called|did you call,you did call,you did called|Here who is the object, so did disappears: who you called.|Aquí who es el objeto, así que did desaparece: who you called.
Can you tell me what ___? (What happened?)|happened|happen,was happened,happening|What is the subject, so nothing changes: what happened.|What es el sujeto, así que nada cambia: what happened.
I wonder who ___ the cake. (Who made the cake?)|made|make,maked,did made|Who is the subject: who made the cake.|Who es el sujeto: who made the cake.
I don't know what ___ yesterday. (What did she buy?)|she bought|did she buy,she buyed,bought she|What is the object, so did disappears: what she bought.|What es el objeto, así que did desaparece: what she bought.
Do you know who ___ the party? (Who is organizing the party?)|is organizing/is organising|organizing,organize,does organize|Who is the subject: who is organizing (same order as the question).|Who es el sujeto: who is organizing (mismo orden que la pregunta).
Can you tell me who ___ to? (Who should I talk to?)|I should talk|should I talk,I should to talk,should talk I|Who is the object: who I should talk to.|Who es el objeto: who I should talk to.
Do you know what ___ in the box? (What is in the box?)|is|does,are being,be|What is the subject: what is in the box.|What es el sujeto: what is in the box.
Do you know whose bag ___? (Whose bag is this?)|this is|is this,this does,does this be|Normal order: whose bag this is.|Orden normal: whose bag this is.
I wonder what ___ to her. (What happened to her?)|happened|happen,was happen,happens did|What is the subject: what happened to her.|What es el sujeto: what happened to her.
Do you know who ___ the most? (Who earns the most?)|earns|earn,earning,is earn|Who is the subject: who earns the most.|Who es el sujeto: who earns the most.
Do you know who ___? (Who did they invite?)|they invited|did they invite,invited they,they did invited|Who is the object: who they invited.|Who es el objeto: who they invited.
Tell me which team ___. (Which team won?)|won|win,winned,did won|Which team is the subject: which team won.|Which team es el sujeto: which team won.
`},
 {n:6, t:"Real life mix", sub:"at a hotel, in an interview, in an email", why:"Indirect questions sound polite and professional. Mix everything: normal order, no do/does/did, if for yes/no.", es:"Las preguntas indirectas suenan educadas y profesionales. Mezcla todo: orden normal, sin do/does/did, if para sí o no.", q:`
(At a hotel) Could you tell me what time ___? (What time is breakfast served?)|breakfast is served|is breakfast served,breakfast does served,does breakfast is served|Normal order: what time breakfast is served.|Orden normal: what time breakfast is served.
(Job interview) Can I ask why ___ this position? (Why did you apply for…?)|you applied for|did you apply for,you did applied for,did you applied for|No did: why you applied for.|Sin did: why you applied for.
(Email) Could you let me know when ___ the report? (When will you send…?)|you will send/you'll send|will you send,you will sending,do you will send|Normal order: when you will send.|Orden normal: when you will send.
(On the street) Excuse me, do you know where ___? (Where is the nearest pharmacy?)|the nearest pharmacy is|is the nearest pharmacy,the nearest pharmacy does be,does the nearest pharmacy is|Normal order: where the nearest pharmacy is.|Orden normal: where the nearest pharmacy is.
(On the phone) Do you know ___ the shop is still open?|if/whether|is,does,what|Yes/no question → if or whether.|Pregunta de sí o no → if o whether.
(Job interview) Would you mind telling me how many people ___ the team? (How many people are on…?)|are on|is on,do are on,on are|"How many people" is the subject: how many people are on the team.|"How many people" es el sujeto: how many people are on the team.
(Restaurant) Could you tell me what ___ in this dish? (What is in this dish?)|is|does,are being,be|What is the subject: what is in this dish.|What es el sujeto: what is in this dish.
(Email) I was wondering if ___ help me with this. (Could you…?)|you could/~you can|could you,you can to,do you could|If + normal order: if you could help me.|If + orden normal: if you could help me.
(Airport) Do you know which gate ___ from? (Which gate does the flight leave from?)|the flight leaves|does the flight leave,the flight leave,did the flight leaves|No does: which gate the flight leaves from.|Sin does: which gate the flight leaves from.
(With a friend) I can't remember where ___ my phone. (Where did I leave…?)|I left|did I leave,I leaved,I did left|No did: where I left my phone.|Sin did: where I left my phone.
(At work) Do you happen to know who ___ charge of this? (Who is in charge?)|is in|in is,does in,are in|Who is the subject: who is in charge.|Who es el sujeto: who is in charge.
(At the doctor's) Can you tell me how long ___ taking this? (How long should I keep…?)|I should keep|should I keep,I should to keep,should keep I|Normal order: how long I should keep taking it.|Orden normal: how long I should keep taking it.
(In a shop) Do you know how much ___? (How much do these cost?)|these cost|do these cost,these costs,these does cost|No do: how much these cost.|Sin do: how much these cost.
`},
 {n:7, adv:true, t:"Advanced: reported questions & whether", sub:"She asked where I was going · I don't know what to say", why:"Indirect questions at B2–C1: reported questions, whether (or not), question word + to, and what… is why….", es:"Preguntas indirectas nivel B2–C1: preguntas reportadas, whether (or not), palabra interrogativa + to, y what… is why….", q:`
She asked me where ___. (Where are you going?)|I was going|was I going,I going,did I go|Reported question: normal order, and the tense moves back: where I was going.|Pregunta reportada: orden normal y el tiempo retrocede: where I was going.
He asked if ___ help him. (Can you help me?)|I could/~I can|could I,can I,I could to|Reported: if + normal order, can → could.|Reportada: if + orden normal, can → could.
They wanted to know when ___ ready. (When will the results be ready?)|the results would be/~the results will be|would the results be,the results will ready,did the results be|Reported: will → would, normal order.|Reportada: will → would, orden normal.
I don't know what ___. (What should I say?)|to say|to saying,saying,should say|Question word + to + verb: what to say.|Palabra interrogativa + to + verbo: what to say.
Can you show me how ___ this? (How do I use it?)|to use|to using,using,use to|Question word + to + verb: how to use it.|Palabra interrogativa + to + verbo: how to use it.
I can't decide ___ to go or not.|whether|if,what,that|Before to + verb, only whether (not if): whether to go.|Antes de to + verbo, solo whether (no if): whether to go.
___ he'll come or not doesn't matter.|Whether|If,What,That|At the start of a sentence, use whether (not if).|Al comienzo de la oración, usa whether (no if).
What I don't understand is why ___. (Why did she leave?)|she left|did she leave,she leaved,left she|What… is why + normal order: why she left.|What… is why + orden normal: why she left.
The question is whether ___ enough time. (Do we have…?)|we have|do we have,we has,have we|Whether + normal order: whether we have.|Whether + orden normal: whether we have.
I asked her how long ___ there. (How long have you lived there?)|she had lived/she'd lived/~she has lived|had she lived,has she lived,she have lived|Reported: have lived → had lived, normal order.|Reportada: have lived → had lived, orden normal.
Nobody knows how ___. (How did it happen?)|it happened|did it happen,it happen,happened it|No did: how it happened.|Sin did: how it happened.
He wondered whether or not ___ her the truth. (Should he tell…?)|he should tell|should he tell,he should to tell,should tell he|Whether or not + normal order: whether he should tell.|Whether or not + orden normal: whether he should tell.
The teacher asked us what ___ during the holidays. (What did you do?)|we had done/we'd done/~we did|had we done,did we do,we have did|Reported: did → had done, normal order.|Reportada: did → had done, orden normal.
`}
];
IQ_STAGES.forEach(st=>{
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"iq"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const IQ_TEST=`
Do you know where ___? (the bank / be)|the bank is|Normal order: where the bank is.
Can you tell me what time ___? (it / be)|it is/it's|Normal order: what time it is.
I don't know where ___. (he / live)|he lives|No does: where he lives.
Do you know when ___? (the train / leave)|the train leaves|No does: when the train leaves.
I can't remember what ___. (she / say, past)|she said|No did: what she said.
Do you know ___ open today? (Is the pharmacy open?)|if the pharmacy is/whether the pharmacy is|Yes/no → if + normal order.
Could you tell me where ___ park? (I / can)|I can|Normal order: where I can park.
Do you know who ___? (Who called?)|called|Who is the subject: nothing changes.
Do you know who ___? (Who did you see?)|you saw|Who is the object: no did.
I wonder ___ remember me. (Will they…?)|if they will/whether they will/if they'll/whether they'll|If + normal order.
Can you tell me how much ___? (How much does it cost?)|it costs|No does: how much it costs.
I'd like to know why ___ late. (Why were you late?)|you were|Normal order: why you were late.
Do you know what ___? (What happened?)|happened|What is the subject: nothing changes.
I have no idea where ___. (Where are my keys?)|my keys are|Normal order: where my keys are.
Do you know what ___ done? (he / have)|he has/he's|Normal order: what he has done.
Would you mind telling me how old ___? (How old are you?)|you are/you're|Normal order: how old you are.
Do you know ___ speak Spanish? (Can he…?)|if he can/whether he can|If + normal order.
I'm not sure what ___. (What does it mean?)|it means|No does: what it means.
Could you let me know when ___ arrive? (When will you…?)|you will/you'll|Normal order: when you will arrive.
I wonder what ___ doing now. (they / be)|they are/they're|Normal order: what they are doing.
Do you know where ___ my phone? (Where did I put…?)|I put|No did: where I put my phone.
Do you know which bus ___ to the airport? (Which bus goes…?)|goes|Which bus is the subject: which bus goes.
Can you check ___ the email? (Did she send…?)|if she sent/whether she sent|No did: if she sent.
Tell me what ___. (What do you want?)|you want|No do: what you want.
I wonder how long ___ here. (How long has she worked here?)|she has worked/she's worked|Normal order: how long she has worked.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"iqt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Talking about the future question bank (B1 to B2, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint
   ~ = also correct English, but not the form this stage practices (never marked wrong)
   6 core stages + the ⭐ Advanced one */
const FUT_STAGES=[
 {n:1, t:"will: decide now, offer, promise", sub:"I'll get it! · I'll help you · I won't tell anyone", why:"Use will ('ll) when you decide in the moment, offer help or make a promise.", es:"Usa will ('ll) cuando decides en el momento, ofreces ayuda o haces una promesa.", q:`
The phone's ringing! Don't worry, ___ it. (I / get)|I'll get/I will get|I will getting,I will to get,I'm get|You decide right now → will: I'll get it.|Lo decides en el momento → will: I'll get it.
It's cold in here. ___ the window. (I / close)|I'll close/I will close|I will closing,I will to close,I closing|A quick decision → will: I'll close it.|Una decisión rápida → will: I'll close it.
(At a restaurant) ___ the chicken, please. (I / have)|I'll have/I will have/~I'm going to have|I will having,I having,I'm have|Ordering food: I'll have… is the classic.|Para pedir comida: I'll have… es lo típico.
That bag looks heavy. ___ you. (I / help)|I'll help/I will help|I will helping,I helping,I'm help|An offer → will: I'll help you.|Una oferta de ayuda → will: I'll help you.
I promise ___ anyone. (I / not tell)|I won't tell/I will not tell|I won't to tell,I not will tell,I don't will tell|A promise → will not = won't.|Una promesa → will not = won't.
Are you thirsty? ___ you a glass of water. (I / get)|I'll get/I will get|I will getting,I'm get,I getting|An offer → will.|Una oferta → will.
Don't worry, ___ your secret. (I / keep)|I'll keep/I will keep|I will keeping,I keeping,I'm keep|A promise → will.|Una promesa → will.
You forgot your wallet? No problem, ___ for lunch. (I / pay)|I'll pay/I will pay|I will paying,I'm pay,I paying|You decide right now → will.|Lo decides en el momento → will.
___ me a favor? (you / do)|Will you do/~Can you do/~Could you do/~Would you do|Do you will do,Will you doing,Will you to do|A request → Will you…?|Un pedido → Will you…?
Hmm, the blue one or the red one? ___ the blue one. (I / take)|I'll take/I will take|I will taking,I taking,I'm take|Deciding in a shop → I'll take it.|Decidiendo en una tienda → I'll take it.
Thanks for the book! ___ it back next week. (I / give)|I'll give/I will give/~I'm going to give|I will giving,I giving,I'm give|A promise → will.|Una promesa → will.
It's late. I think ___ home now. (I / go)|I'll go/I will go/~I'm going to go|I will going,I'm go,I going|You decide right now → will.|Lo decides en el momento → will.
Don't worry about the dishes. ___ them later. (I / do)|I'll do/I will do|I will doing,I'm do,I doing|An offer → will.|Una oferta → will.
`},
 {n:2, t:"going to: plans you already made", sub:"I'm going to study Japanese · We're going to visit Paris", why:"Use be going to for plans and intentions: you decided before you speak.", es:"Usa be going to para planes e intenciones: ya lo decidiste antes de hablar.", q:`
I've decided: ___ Japanese next year. (I / study)|I'm going to study/I am going to study/~I'll study/~I will study|I going to study,I'm going study,I'm going to studying|A plan you already made → going to.|Un plan que ya hiciste → going to.
We bought the tickets! ___ Paris in July. (we / visit)|We're going to visit/We are going to visit/~We're visiting/~We are visiting|We going to visit,We're going visit,We're go to visit|A plan → be going to + verb.|Un plan → be going to + verbo.
She's saved a lot of money. ___ a car. (she / buy)|She's going to buy/She is going to buy|She going to buy,She's going buy,She's go to buy|Her plan → she's going to buy.|Su plan → she's going to buy.
What ___ this weekend? (you / do)|are you going to do/~are you doing|you are going to do,are you going do,do you going to do|Question: are you going to + verb.|Pregunta: are you going to + verbo.
___ my grandma on Sunday. It's her birthday. (I / visit)|I'm going to visit/I am going to visit/~I'm visiting/~I am visiting|I going to visit,I'm going visit,I'm go to visit|A plan → I'm going to visit.|Un plan → I'm going to visit.
They ___ married next spring. They've found a place. (get)|are going to get/~are getting|going to get,are going get,are go to get|Their plan → are going to get married.|Su plan → are going to get married.
___ the kitchen this year. We already chose the color. (we / paint)|We're going to paint/We are going to paint/~We're painting/~We are painting|We going to paint,We're going paint,We're going to painting|A plan → going to + verb (no -ing).|Un plan → going to + verbo (sin -ing).
___ coffee anymore. I've decided. (I / not drink)|I'm not going to drink/I am not going to drink/~I won't drink/~I will not drink|I not going to drink,I'm not going drink,I don't going to drink|Negative plan → I'm not going to.|Plan negativo → I'm not going to.
___ to the gym after work? (you / go)|Are you going to go/~Are you going|You going to go,Are you going go,Do you going to go|Question about plans → Are you going to…?|Pregunta sobre planes → Are you going to…?
He ___ his job. He told his boss yesterday. (quit)|is going to quit/~is quitting|going to quit,is going quit,is go to quit|His plan → he's going to quit.|Su plan → he's going to quit.
My sister ___ a cake for the party. She bought everything. (make)|is going to make/~is making|going to make,is going make,is go to make|A plan → is going to make.|Un plan → is going to make.
When ___ him the news? (you / tell)|are you going to tell/~will you tell|you are going to tell,are you going tell,do you going to tell|Question about a plan → are you going to…?|Pregunta sobre un plan → are you going to…?
`},
 {n:3, t:"Predictions: going to or will", sub:"Look at those clouds, it's going to rain · I think you'll love it", why:"You can SEE it coming → going to. You THINK or believe it → will (I think, I'm sure, maybe, probably).", es:"Lo VES venir → going to. Lo CREES u opinas → will (I think, I'm sure, maybe, probably).", q:`
Look at those black clouds! ___ rain. (it)|It's going to/It is going to/~It'll/~It will|It will to,It going to,It's going|You can see it → going to.|Lo puedes ver → going to.
Careful! That glass ___ fall! (be going to)|is going to|going to,is going,are going to|You can see it → is going to.|Lo puedes ver → is going to.
I think Chile ___ the match. (win)|will win/~is going to win|will winning,will to win,is win|I think… → will.|I think… → will.
She's yawning a lot. She ___ asleep soon. (fall)|is going to fall/~will fall|going to fall,is going fall,will falling|You can see it → going to.|Lo puedes ver → going to.
Don't worry, I'm sure you ___ the exam. (pass)|will pass/~are going to pass|will passing,are going pass,will to pass|I'm sure… → will.|I'm sure… → will.
Watch out! You ___! (fall)|are going to fall/~will fall|going to fall,are going fall,will falling|You can see it → going to.|Lo puedes ver → going to.
I don't think ___ today. (it / rain)|it will rain/it'll rain/~it's going to rain/~it is going to rain|it will raining,it going to rain,it's going rain|I don't think… → will.|I don't think… → will.
In 2050, people ___ on Mars. (live)|will live/~will be living/~are going to live|will living,will to live,are live|A guess about the far future → will.|Una suposición sobre el futuro lejano → will.
The traffic is terrible. We ___ late! (be)|are going to be/~will be|going to be,are going be,will being|You can see it → going to.|Lo puedes ver → going to.
Maybe she ___ us later. (call)|will call/~is going to call|will calling,will to call,is call|Maybe… → will.|Maybe… → will.
Look, the baby's face is red. He ___ cry. (be going to)|is going to|going to,is going,are going to|You can see it → going to.|Lo puedes ver → going to.
Try this cake. I'm sure you ___ it. (love)|will love/~are going to love|will loving,will to love,are love|I'm sure… → will.|I'm sure… → will.
`},
 {n:4, t:"Present continuous: arrangements", sub:"I'm meeting Ana tomorrow · What are you doing tonight?", why:"For things already arranged with other people, with a time or place, English often uses the present continuous: I'm meeting Ana at 6.", es:"Para cosas ya acordadas con otras personas, con hora o lugar, el inglés suele usar el presente continuo: I'm meeting Ana at 6.", q:`
___ Ana for lunch tomorrow. We booked a table. (I / meet)|I'm meeting/I am meeting/~I'm going to meet/~I am going to meet|I meeting,I'm meet,I am meet|An arrangement → I'm meeting.|Algo acordado → I'm meeting.
What ___ tonight? (you / do)|are you doing/~are you going to do|you are doing,do you doing,are you do|Asking about plans → What are you doing tonight?|Para preguntar por planes → What are you doing tonight?
___ to Lima on Friday. I have my ticket. (we / fly)|We're flying/We are flying/~We're going to fly/~We are going to fly|We flying,We're fly,We are fly|Arranged, with a ticket → we're flying.|Acordado, con pasaje → we're flying.
My parents ___ dinner with us on Sunday. (have)|are having/~are going to have|having,are have,is having|An arrangement → are having.|Algo acordado → are having.
___ the dentist at 4 tomorrow. (I / see)|I'm seeing/I am seeing/~I'm going to see/~I am going to see|I seeing,I'm see,I am see|An appointment → I'm seeing.|Una hora agendada → I'm seeing.
She ___ tonight. She has a party. (not work)|isn't working/is not working/~isn't going to work/~is not going to work|not working,doesn't working,isn't work|Negative arrangement → isn't working.|Negativo → isn't working.
___ anything this weekend? (you / do)|Are you doing/~Are you going to do|You doing,Do you doing,Are you do|Question → Are you doing…?|Pregunta → Are you doing…?
Tom ___ to the party with us on Saturday. (come)|is coming/~is going to come|coming,is come,are coming|An arrangement → is coming.|Algo acordado → is coming.
When ___ for Spain? (you / leave)|are you leaving/~are you going to leave|you are leaving,do you leaving,are you leave|Question about an arrangement → When are you leaving?|Pregunta sobre algo acordado → When are you leaving?
We ___ married in June! (get)|are getting/~are going to get|getting,are get,is getting|An arrangement → we're getting married.|Algo acordado → we're getting married.
___ a party next Saturday. Can you come? (we / have)|We're having/We are having/~We're going to have/~We are going to have|We having,We are have,We're have|An arrangement → we're having a party.|Algo acordado → we're having a party.
I can't go out tomorrow. ___ my cousin at the airport. (I / pick up)|I'm picking up/I am picking up/~I'm going to pick up/~I am going to pick up|I picking up,I'm pick up,I am pick up|An arrangement → I'm picking up.|Algo acordado → I'm picking up.
`},
 {n:5, t:"Present simple: timetables", sub:"The train leaves at 7 · What time does the movie start?", why:"For timetables and schedules (trains, flights, classes, shows), use the present simple, even for the future.", es:"Para horarios (trenes, vuelos, clases, funciones), usa el presente simple, aunque sea futuro.", q:`
The train ___ at 7:15 tomorrow. (leave)|leaves/~will leave/~is leaving|leave,is leave,leaving|A timetable → present simple: leaves.|Un horario → presente simple: leaves.
The movie ___ at 8, so let's meet at 7:30. (start)|starts/~will start/~is starting|start,is start,starting|A schedule → starts.|Un horario → starts.
What time ___ tomorrow? (the shop / open)|does the shop open/~will the shop open/~is the shop opening|the shop opens,do the shop open,does the shop opens|Timetable question → What time does it open?|Pregunta de horario → What time does it open?
My flight ___ in Santiago at 6 a.m. (land)|lands/~will land/~is landing|land,is land,landing|A flight time → lands.|Hora de un vuelo → lands.
Classes ___ next Monday. (begin)|begin/~will begin/~are beginning|begins,are begin,beginning|A school calendar → begin.|Un calendario escolar → begin.
When ___? (the next train / leave)|does the next train leave/~is the next train leaving/~will the next train leave|the next train leaves,do the next train leave,does the next train leaves|Timetable question → does… leave?|Pregunta de horario → does… leave?
Hurry up! The film ___ in five minutes. (start)|starts/~is starting/~will start|start,is start,starting|A schedule → starts.|Un horario → starts.
The museum ___ at 6 p.m. today. (close)|closes/~will close/~is closing|close,is close,closing|Opening hours → closes.|Horario de atención → closes.
The meeting ___ at 3 p.m. tomorrow. It's in the calendar. (be)|is/~will be|are,be,being|In the calendar → is.|En el calendario → is.
Our holiday ___ on July 2nd. (start)|starts/~will start/~is starting|start,is start,starting|A fixed date → starts.|Una fecha fija → starts.
What time ___ tomorrow? (your plane / arrive)|does your plane arrive/~will your plane arrive/~is your plane arriving|your plane arrives,do your plane arrive,does your plane arrives|Timetable question → does… arrive?|Pregunta de horario → does… arrive?
The concert ___ until midnight. (not finish)|doesn't finish/does not finish/~won't finish/~will not finish/~isn't finishing/~is not finishing|don't finish,not finishes,doesn't finishes|Schedule, negative → doesn't finish.|Horario, negativo → doesn't finish.
`},
 {n:6, t:"Real life mix", sub:"at a restaurant, at work, with friends", why:"Choose by the situation: decision now/offer/promise → will · plan → going to · arrangement → present continuous · timetable → present simple · you can see it → going to.", es:"Elige según la situación: decisión ahora/oferta/promesa → will · plan → going to · algo acordado → presente continuo · horario → presente simple · lo ves venir → going to.", q:`
(Waiter: What would you like?) ___ the soup, please. (I / have)|I'll have/I will have/~I'm going to have|I having,I will having,I'm have|Ordering → I'll have.|Para pedir → I'll have.
(Why did you buy paint?) ___ my room. (I / paint)|I'm going to paint/I am going to paint/~I'm painting/~I am painting|I going to paint,I'm going paint,I will painting|A plan → I'm going to paint.|Un plan → I'm going to paint.
(Are you free on Friday?) Sorry, ___ my cousin. (I / see)|I'm seeing/I am seeing/~I'm going to see/~I am going to see|I seeing,I'm see,I will seeing|An arrangement → I'm seeing.|Algo acordado → I'm seeing.
Hurry! The bus ___ in five minutes. (leave)|leaves/~is leaving/~will leave|leave,is leave,leaving|A timetable → leaves.|Un horario → leaves.
Look at the score! We ___! (win)|are going to win/~will win|going to win,are going win,will winning|You can see it → going to.|Lo puedes ver → going to.
___ late again, I promise. (I / not be)|I won't be/I will not be|I don't will be,I won't to be,I not will be|A promise → won't.|Una promesa → won't.
Those boxes look heavy. ___ you. (I / help)|I'll help/I will help|I will helping,I helping,I'm help|An offer → I'll help.|Una oferta → I'll help.
Do you think she ___ the job? (get)|will get/~is going to get|will getting,will to get,is get|Do you think…? → will.|Do you think…? → will.
(Work email) ___ you the report tomorrow. (I / send)|I'll send/I will send/~I'm going to send/~I am going to send/~I'm sending/~I am sending|I sending,I will sending,I'm send|A promise in an email → I'll send.|Una promesa en un correo → I'll send.
Where do you think ___ in five years? (you / be)|you will be/you'll be/~you are going to be/~you're going to be|will you be,you be,you will being|Opinion → will, and normal order after "do you think".|Opinión → will, y orden normal después de "do you think".
Next year ___ a master's degree. It's all planned. (I / start)|I'm going to start/I am going to start/~I'm starting/~I am starting|I going to start,I'm going start,I will starting|A plan → I'm going to start.|Un plan → I'm going to start.
___ a barbecue on Saturday. Want to come? (we / have)|We're having/We are having/~We're going to have/~We are going to have|We having,We're have,We will having|An arrangement → we're having.|Algo acordado → we're having.
What time ___? (the game / start)|does the game start/~is the game starting/~will the game start|the game starts,do the game start,does the game starts|A schedule → does… start?|Un horario → does… start?
`},
 {n:7, adv:true, t:"Advanced: future continuous, future perfect & more", sub:"This time tomorrow I'll be flying · By June I'll have finished", why:"Future at B2–C1: will be + -ing (in progress at a future time), will have + past participle (done before a future time), be about to, be due to, be bound to, and the present after when / as soon as.", es:"El futuro nivel B2–C1: will be + -ing (en progreso en un momento futuro), will have + participio (terminado antes de un momento futuro), be about to, be due to, be bound to, y el presente después de when / as soon as.", q:`
This time tomorrow, ___ on a beach. (I / lie)|I'll be lying/I will be lying|I'll lying,I will be lie,I'm lie|In progress at a future time → will be + -ing.|En progreso en un momento futuro → will be + -ing.
Don't call at 8. ___ dinner then. (we / have)|We'll be having/We will be having/~We're having/~We are having|We'll having,We will be have,We having|In progress at 8 → will be having.|En progreso a las 8 → will be having.
By the time you arrive, ___ the cake. (we / finish)|we'll have finished/we will have finished|we'll finished,we will have finish,we have will finished|Done before a future moment → will have + past participle.|Terminado antes de un momento futuro → will have + participio.
By next June, ___ English for two years. (she / study)|she'll have been studying/she will have been studying/~she'll have studied/~she will have studied|she'll been studying,she will have be studying,she will has been studying|How long, up to a future moment → will have been + -ing.|Cuánto tiempo, hasta un momento futuro → will have been + -ing.
Quick, get in! The train ___ leave. (be about to)|is about to|about to,is about,are about to|Very soon → be about to.|Muy pronto → be about to.
___ through Santiago tomorrow? I need a ride. (you / pass)|Will you be passing/~Are you passing/~Are you going to pass|Will you passing,Will you be pass,Do you will pass|A polite question about plans → Will you be + -ing?|Una pregunta educada sobre planes → Will you be + -ing?
The report ___ on Friday. (be due)|is due/~will be due|are due,due,is due for|Scheduled → be due.|Programado → be due.
She's so talented. She ___ succeed. (be bound to)|is bound to/~will|bound to,is bound,are bound to|Almost certain → be bound to.|Casi seguro → be bound to.
Don't worry, ___ it by tomorrow. (I / finish)|I'll have finished/I will have finished/~I'll finish/~I will finish|I'll finished,I will have finish,I have will finished|Done before tomorrow → will have finished.|Terminado antes de mañana → will have finished.
I'll call you when I ___ home. (get)|get|will get,gets,getting|After when (future): present simple, not will.|Después de when (futuro): presente simple, no will.
As soon as she ___, we'll start. (arrive)|arrives|will arrive,arrive,arriving|After as soon as: present simple.|Después de as soon as: presente simple.
We ___ leave when it started to rain. (be about to, past)|were about to|was about to,are about to,were about|Past of be about to → were about to.|Pasado de be about to → were about to.
`}
];
FUT_STAGES.forEach(st=>{
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"fut"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const FUT_TEST=`
The phone's ringing! ___ it. (I / get)|I'll get/I will get|You decide right now → will.
I've already decided: ___ a new phone. (I / buy)|I'm going to buy/I am going to buy/~I'll buy/~I will buy|A plan → going to.
Look at those clouds! It ___ rain. (be going to)|is going to|You can see it → going to.
I think you ___ this movie. (like)|will like/'ll like/~are going to like|I think… → will.
___ Pedro at 6 tomorrow. (I / meet)|I'm meeting/I am meeting/~I'm going to meet/~I am going to meet|An arrangement → present continuous.
The train ___ at 9:30. (leave)|leaves/~will leave/~is leaving|A timetable → present simple.
I promise ___ late. (I / not be)|I won't be/I will not be|A promise → won't.
What ___ this weekend? (you / do)|are you doing/are you going to do|Plans → are you doing / going to do.
That box looks heavy. ___ you. (I / help)|I'll help/I will help|An offer → will.
What time ___? (the class / start)|does the class start/~will the class start/~is the class starting|A schedule → does… start?
Careful! You ___! (fall)|are going to fall/'re going to fall/~will fall|You can see it → going to.
We ___ a party on Saturday. Can you come? (have)|are having/'re having/~are going to have|An arrangement → we're having.
Maybe ___ later. (it / snow)|it will snow/it'll snow/~it's going to snow/~it is going to snow|Maybe… → will.
(At a café) ___ a coffee, please. (I / have)|I'll have/I will have/~I'm going to have|Ordering → I'll have.
She ___ a doctor. She starts university in March. (be going to / be)|is going to be/'s going to be|A plan → going to.
I'm sure ___ the interview. (you / pass)|you will pass/you'll pass/~you're going to pass/~you are going to pass|I'm sure… → will.
The shop ___ at 10 tomorrow. (open)|opens/~will open/~is opening|Opening hours → present simple.
When ___ for Brazil? (you / leave)|are you leaving/~are you going to leave|An arrangement → are you leaving?
Don't worry, ___ anyone. (I / not tell)|I won't tell/I will not tell|A promise → won't.
They ___ married next year. They've booked the place. (get)|are getting/'re getting/are going to get/'re going to get|An arrangement or plan.
I'll text you when I ___. (arrive)|arrive|After when: present simple.
___ the dishes later, don't worry. (I / do)|I'll do/I will do|An offer → will.
Do you think it ___ expensive? (be)|will be/'ll be/~is going to be|Do you think…? → will.
My flight ___ at 11 p.m. (land)|lands/~will land/~is landing|A flight time → present simple.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"futt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Word order and object pronouns question bank (A2 to B1, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ (hint) | right answer(s) / ... | 3 wrong options | why | Spanish hint
   hints with " / " are the words to put in order; ~ = also correct English, but not the form this stage practices (never marked wrong)
   6 core stages + the ⭐ Advanced one (from Noa's Ideas to build, Nov 25 2026) */
const WO_STAGES=[
 {n:1, t:"Subject + verb + object", sub:"I drink coffee · She plays football · Where do you live?", why:"English order: subject + verb + object. The subject goes first, the object goes after the verb.", es:"El orden en inglés: sujeto + verbo + objeto. El sujeto va primero y el objeto va después del verbo.", q:`
___ every morning. (coffee / drink / I)|I drink coffee|I coffee drink,Drink I coffee,Coffee drink I|Subject + verb + object: I drink coffee.|Sujeto + verbo + objeto: I drink coffee.
My brother ___ every Saturday. (football / plays)|plays football|football plays,playing football,football playing|Verb first, then the object: plays football.|Primero el verbo, después el objeto: plays football.
Yesterday, ___. (a great movie / we / watched)|we watched a great movie|we a great movie watched,watched we a great movie,a great movie we watched|Subject + verb + object: we watched a great movie.|Sujeto + verbo + objeto: we watched a great movie.
My parents ___ in the south. (a house / have)|have a house|a house have,has a house,house have|Verb + object: have a house. (They have, not they has.)|Verbo + objeto: have a house. (They have, no they has.)
Every day, ___ to work. (the bus / takes / Ana)|Ana takes the bus|takes Ana the bus,Ana the bus takes,takes the bus Ana|The subject (Ana) goes before the verb.|El sujeto (Ana) va antes del verbo.
She has ___. (car / a / red)|a red car|a car red,red a car,a cars red|The adjective goes before the noun: a red car.|El adjetivo va antes del sustantivo: a red car (no "a car red").
I speak ___. (well / English)|English well|well English,English good,the English well|Verb + object + how: I speak English well.|Verbo + objeto + cómo: I speak English well.
We ___ last night. (pizza / ate)|ate pizza|pizza ate,eated pizza,pizza eat|Verb + object: we ate pizza.|Verbo + objeto: we ate pizza.
Where ___? (you / do / live)|do you live|you live,you do live,live you|Question: question word + do + subject + verb.|Pregunta: palabra de pregunta + do + sujeto + verbo.
What ___ for breakfast? (you / did / eat)|did you eat|you did eat,you ate,did you ate|Past question: did + subject + base verb.|Pregunta en pasado: did + sujeto + verbo base.
___. (very much / my job / I like)|I like my job very much|I like very much my job,Very much my job I like,I like my job much very|Very much goes at the end, after the object.|Very much va al final, después del objeto (no "I like very much my job").
She ___ every night. (to music / listens)|listens to music|to music listens,listens music,listen to music|Listen to + something. With she: listens.|Listen to + algo. Con she: listens.
Does ___ meat? (eat / your sister)|your sister eat|eat your sister,your sister eats,eats your sister|Question: does + subject + base verb.|Pregunta: does + sujeto + verbo base.
`},
 {n:2, t:"Never drop the subject: it and there", sub:"It's raining · It's important · There's a café", why:"English always needs a subject. Use it for weather, time, distance and opinions. Use there is / there are to say something exists.", es:"En inglés siempre necesitas un sujeto. Usa it para el clima, la hora, la distancia y las opiniones. Usa there is / there are para decir que algo existe (hay).", q:`
___ raining again! (be)|It's/It is|Is,Are,Its|Weather needs a subject: It's raining.|El clima necesita sujeto: It's raining (no "Is raining").
Look outside! ___ very cold today. (be)|It's/It is|Is,Makes,Has|Hace frío = It's cold. Never "makes cold".|Hace frío = It's cold. Nunca "makes cold".
What time is ___? (pronoun)|it|there,its,he|Time: What time is it?|La hora: What time is it?
___ ten o'clock. (be)|It's/It is|Is,Are,Its|Time: It's ten o'clock.|La hora: It's ten o'clock (son las diez).
___ important to practice every day. (be)|It's/It is|Is,Are,There is|Opinions: It's important to…|Opiniones: It's important to… (es importante…).
How far is ___ from your house to the beach? (pronoun)|it|there,he,its|Distance: How far is it?|La distancia: How far is it?
___ a lot of people at the party. (be, past)|There were|It was,Were,Had|Había = there was / there were.|Había = there was / there were (no "had").
___ a good restaurant near my house. (be)|There's/There is|It's,Is,Has|Hay = there is / there are.|Hay = there is / there are (no "has").
I love this song. ___ beautiful! (be)|It's/It is|Is,Its,There's|Opinion about a thing: It's beautiful.|Opinión sobre una cosa: It's beautiful (no "Is beautiful").
___ easy to get lost in Santiago. (be)|It's/It is|Is,Its,There is|It's + adjective + to…: It's easy to get lost.|It's + adjetivo + to…: It's easy to get lost.
Do you like the city? Yes, ___ very nice. (be)|it's/it is|is,its,there's|Short answer about a thing: Yes, it's very nice.|Respuesta sobre una cosa: Yes, it's very nice.
___ two bathrooms in my apartment. (be)|There are|It has,Has,Are|Hay (plural) = there are.|Hay (plural) = there are (no "has").
Is ___ a bank near here? (pronoun)|there|they,it's,has|Hay…? = Is there…?|¿Hay…? = Is there…?
`},
 {n:3, t:"Object pronouns: me, him, her, us, them", sub:"I call her · I saw him · Help me!", why:"After a verb or a preposition, use an object pronoun: me, you, him, her, it, us, them.", es:"Después de un verbo o una preposición, usa un pronombre de objeto: me, you, him, her, it, us, them.", q:`
I love my sister. I call ___ every day. (she)|her|she,hers,him|she → her (after a verb).|she → her (después del verbo). La llamo = I call her.
Where's Pedro? I need to talk to ___. (he)|him|he,his,her|he → him (after a preposition).|he → him (después de una preposición).
These are my new shoes. Do you like ___? (they)|them|they,their,it|they → them. Shoes = plural.|they → them. Shoes es plural.
Can you help ___, please? (I)|me|I,my,mine|I → me (after a verb).|I → me. Ayúdame = help me.
Our teacher gave ___ a lot of homework. (we)|us|we,our,ours|we → us.|we → us. Nos dio = gave us.
My keys! I can't find ___ anywhere. (they)|them|they,it,their|Keys = plural → them.|Keys es plural → them.
I bought a new phone, but I don't like ___. (it)|it|him,them,its|A thing → it (not him or her).|Una cosa → it (no him ni her, aunque en español sea "lo").
Ana and Tomás are coming. I'll wait for ___. (they)|them|they,their,theirs|they → them (after for).|they → them (después de for).
This gift is for ___, Mom! (you)|you|your,yours,you're|you → you (it doesn't change).|you no cambia: for you.
My grandpa is 90. I visit ___ on Sundays. (he)|him|he,his,her|he → him.|he → him. Lo visito = I visit him.
Laura sent ___ a message last night. (I)|me|I,my,mine|I → me.|I → me. Me mandó = sent me.
Between you and ___, I don't like this. (I)|me|I,my,mine|After between: me.|Después de between: me.
Did you see Marta? Yes, I saw ___ at the gym. (she)|her|she,hers,him|she → her.|she → her. La vi = I saw her.
`},
 {n:4, t:"Where the pronoun goes: after the verb", sub:"I saw him (not I him saw) · Call me tomorrow", why:"In Spanish the pronoun often goes before the verb (lo vi). In English it goes after the verb: I saw him.", es:"En español el pronombre muchas veces va antes del verbo (lo vi). En inglés va después del verbo: I saw him.", q:`
Juan? Yes, ___ yesterday. (him / saw / I)|I saw him|I him saw,I saw he,Saw I him|Lo vi = I saw him. The pronoun goes after the verb.|Lo vi = I saw him. El pronombre va después del verbo.
Your book? ___ on the table. (it / left / I)|I left it|I it left,I left him,Left I it|Lo dejé = I left it.|Lo dejé = I left it.
My parents? ___ every week. (them / I / call)|I call them|I them call,I call they,I call their|Los llamo = I call them.|Los llamo = I call them.
I need your help. Can you ___? (me / help)|help me|me help,help I,helping me|Ayúdame = help me.|Ayúdame = help me.
That song is great. ___ every day. (I / to it / listen)|I listen to it|I it listen to,I listen it,I to it listen|Listen to it: the pronoun goes after to.|Listen to it: el pronombre va después de to.
Carla? ___ last week. (met / her / we)|We met her|We her met,We met she,We met hers|La conocimos = we met her.|La conocimos = we met her.
The kids are hungry. Can you ___? (them / feed)|feed them|them feed,feed they,feed their|Dales de comer = feed them.|Dales de comer = feed them.
Please ___. (me / call / tomorrow)|call me tomorrow|me call tomorrow,call tomorrow me,tomorrow me call|Verb + pronoun + time: call me tomorrow.|Verbo + pronombre + tiempo: call me tomorrow.
This cake is delicious. ___? (it / make / did you)|Did you make it|Did you it make,Did you make him,Did you made it|¿Lo hiciste tú? = Did you make it?|¿Lo hiciste tú? = Did you make it?
I like your shirt. Where ___? (buy / did you / it)|did you buy it|did you it buy,you bought it,did you bought it|¿Dónde la compraste? = Where did you buy it?|¿Dónde la compraste? = Where did you buy it?
My cat is sick, so ___ to the vet. (I'm taking / her)|I'm taking her/I am taking her|I'm her taking,I her am taking,I'm taking she|La llevo = I'm taking her.|La llevo al veterinario = I'm taking her to the vet.
The movie? ___. (it / didn't / I / like)|I didn't like it/I did not like it|I didn't it like,I it didn't like,I didn't like him|No me gustó = I didn't like it.|No me gustó = I didn't like it.
Our neighbors are nice. ___ to dinner. (invited / we / them)|We invited them|We them invited,We invited they,We invited their|Los invitamos = we invited them.|Los invitamos = we invited them.
`},
 {n:5, t:"Two objects: give her the book / give it to her", sub:"Send her an email · Give it to me · Explain it to me", why:"Two objects: give + person + thing (give her the book), or give + thing + to + person (give it to her). With it or them, use to: give it to her.", es:"Dos objetos: give + persona + cosa (give her the book), o give + cosa + to + persona (give it to her). Con it o them, usa to: give it to her.", q:`
Can you give ___? (me / the salt)|me the salt/~the salt to me|the salt me,to me the salt,me to the salt|give + person + thing: give me the salt.|give + persona + cosa: give me the salt.
I sent ___ yesterday. (an email / her)|her an email/~an email to her|an email her,to her an email,her to an email|send + person + thing: I sent her an email.|send + persona + cosa: I sent her an email.
That's my pen! Give ___, please. (it / to me)|it to me/~me it|it me,to me it,me to it|With it: give it to me.|Con it: give it to me. Dámelo = give it to me.
My dad bought ___ for my birthday. (a bike / me)|me a bike/~a bike for me|a bike me,me for a bike,for me a bike|buy + person + thing: he bought me a bike.|buy + persona + cosa: he bought me a bike.
Can you explain ___? (this / to me)|this to me|me this,to me this,me to this|explain + thing + to + person. Never "explain me".|explain + cosa + to + persona. Nunca "explain me".
I told ___. (the truth / him)|him the truth/~the truth to him|the truth him,to him the truth,him to the truth|tell + person + thing: I told him the truth.|tell + persona + cosa: I told him the truth.
She showed ___ on her phone. (us / the photos)|us the photos/~the photos to us|the photos us,to us the photos,us to the photos|show + person + thing: she showed us the photos.|show + persona + cosa: she showed us the photos.
Here's the book. Can you give ___? (it / Ana)|it to Ana|Ana it,it Ana,to Ana it|With it: give it to Ana.|Con it: give it to Ana. Dáselo a Ana = give it to Ana.
Don't forget to send ___! (them / to me)|them to me|to me them,them me,me to them|With them: send them to me.|Con them: send them to me. Mándamelos = send them to me.
Can you lend ___? (your car / me)|me your car/~your car to me|your car me,to me your car,me to your car|lend + person + thing: lend me your car.|lend + persona + cosa: lend me your car.
He said ___ that he was sorry. (to / I)|to me|me,for me,at me|say something to someone. Never "said me".|say algo to alguien. Nunca "said me" (me dijo = he told me / he said to me).
Can you tell ___ about the trip? (we)|us|to us,we,our|tell + person, no to: tell us.|tell + persona, sin to: tell us (no "tell to us").
I'll write ___ tomorrow. (a letter / them)|them a letter/~a letter to them|a letter them,to them a letter,them to a letter|write + person + thing: write them a letter.|write + persona + cosa: write them a letter.
`},
 {n:6, t:"Real life mix", sub:"Everything together, like in a real conversation", why:"Subject + verb + object, never drop the subject, and the pronoun after the verb.", es:"Sujeto + verbo + objeto, nunca omitas el sujeto y el pronombre va después del verbo.", q:`
___ hot today, right? (be)|It's/It is|Is,Makes,Its|Weather → It's hot.|El clima → It's hot (hace calor).
I miss my friends. I want to see ___ soon. (they)|them|they,their,theirs|they → them.|they → them. Quiero verlos = I want to see them.
The keys? ___ in the car. (them / left / I)|I left them|I them left,I left they,I left it|Las dejé = I left them. Keys = plural.|Las dejé = I left them. Keys es plural.
Where ___? (does / work / your sister)|does your sister work|your sister works,works your sister,does work your sister|Question: does + subject + verb.|Pregunta: does + sujeto + verbo.
My boss called ___ this morning. (I)|me|I,my,mine|I → me.|I → me. Me llamó = called me.
Can you send ___? (the report / me)|me the report/~the report to me|the report me,to me the report,me to the report|send + person + thing.|send + persona + cosa.
I love this city. ___ beautiful. (be)|It's/It is|Is,Its,There's|Never drop the subject: It's beautiful.|Nunca omitas el sujeto: It's beautiful.
My mom? ___ on Fridays. (her / visit / I)|I visit her|I her visit,I visit she,I visit hers|La visito = I visit her.|La visito = I visit her.
___ two dogs and a cat in our house. (be)|There are|It has,Has,Are|Hay = there are.|Hay = there are (no "has").
Explain ___ again, please. (it / to me)|it to me|me it,to me it,me to it|explain it to me. Never "explain me".|explain it to me. Nunca "explain me". Explícamelo = explain it to me.
She speaks ___. (very well / English)|English very well|very well English,English very good,English well very|Verb + object + how: speaks English very well.|Verbo + objeto + cómo: speaks English very well.
Did you call ___? (he)|him|he,his,he's|he → him.|he → him. ¿Lo llamaste? = Did you call him?
That movie was great. Did you like ___? (it)|it|him,its,them|A thing → it.|Una cosa → it.
`},
 {n:7, adv:true, t:"⭐ Advanced (bonus, B2–C1)", sub:"turn it off · I find it hard to… · Never have I…", why:"With phrasal verbs the pronoun goes in the middle (turn it off). English uses it as an empty object (I find it hard to…). After never, rarely, not only: question order.", es:"Con phrasal verbs el pronombre va al medio (turn it off). El inglés usa it como objeto vacío (I find it hard to…). Después de never, rarely, not only: orden de pregunta.", q:`
It's too loud. Can you ___? (turn off / it)|turn it off|turn off it,it turn off,turn it of|Phrasal verb + pronoun: the pronoun goes in the middle.|Phrasal verb + pronombre: el pronombre va al medio (turn it off).
That's my jacket! Please ___. (give back / it)|give it back|give back it,it give back,give it to back|Pronoun in the middle: give it back.|Pronombre al medio: give it back.
I don't know this word. I'll ___. (look up / it)|look it up|look up it,look it for,it look up|Pronoun in the middle: look it up.|Pronombre al medio: look it up (lo busco).
The kids are asleep. Don't ___! (wake up / them)|wake them up|wake up them,wake up they,them wake up|Pronoun in the middle: wake them up.|Pronombre al medio: wake them up.
Here's the form. Please ___ and send it back. (fill in / it)|fill it in/~fill it out|fill in it,fill out it,it fill in|Pronoun in the middle: fill it in.|Pronombre al medio: fill it in.
I find ___ hard to wake up early. (pronoun)|it|that,this,its|find it + adjective + to…: I find it hard to…|find it + adjetivo + to…: me cuesta = I find it hard to…
She made ___ clear that she wasn't happy. (pronoun)|it|that,this,its|make it clear that…|make it clear that… (dejó claro que…).
I'd appreciate ___ if you could call me back. (pronoun)|it|you,its,them|I'd appreciate it if… (a polite request).|I'd appreciate it if… (te lo agradecería si…).
Who did you go to the party ___? (preposition)|with|at,in,of|In questions, the preposition often goes at the end: Who did you go with?|En las preguntas la preposición suele ir al final: Who did you go with? (¿Con quién fuiste?)
What are you talking ___? (preposition)|about|at,in,by|Preposition at the end: What are you talking about?|Preposición al final: What are you talking about? (¿De qué hablas?)
Never ___ such a beautiful place. (I / have / seen)|have I seen|I have seen,I seen have,seen I have|After never at the start: question order (have I seen).|Después de never al comienzo: orden de pregunta (have I seen).
Not only ___ late, but he also forgot the tickets. (he / was)|was he|he was,he were,were he|After not only at the start: question order (was he).|Después de not only al comienzo: orden de pregunta (was he).
Rarely ___ coffee after 6 p.m. (I / drink / do)|do I drink|I drink,I do drink,drink I|After rarely at the start: do + subject + verb.|Después de rarely al comienzo: do + sujeto + verbo.
`}
];
WO_STAGES.forEach(st=>{
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"wo"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const WO_TEST=`
___ every morning. (coffee / drink / I)|I drink coffee|Subject + verb + object.
___ raining again. (be)|It's/It is|Weather needs a subject: It's raining.
I love my sister. I call ___ every day. (she)|her|she → her.
Pedro? ___ yesterday. (him / saw / I)|I saw him|The pronoun goes after the verb.
Can you give ___? (me / the salt)|me the salt/~the salt to me|give + person + thing.
___ a good café near my office. (be)|There's/There is|Hay = there is.
Where's my phone? I can't find ___. (pronoun)|it|A thing → it.
These shoes are great. I love ___. (they)|them|they → them.
Can you explain ___? (this / to me)|this to me|explain + thing + to + person.
Where ___? (you / do / work)|do you work|Question: do + subject + verb.
___ important to sleep well. (be)|It's/It is|It's important to…
My parents? ___ every Sunday. (them / visit / I)|I visit them|The pronoun goes after the verb.
Laura sent ___ a photo. (we)|us|we → us.
She has ___. (dog / a / big)|a big dog|Adjective before the noun.
Can you help ___? (I)|me|I → me.
That's my book. Give ___, please. (it / to me)|it to me/~me it|With it: give it to me.
___. (very much / this song / I like)|I like this song very much/~I very much like this song|Very much goes at the end.
___ a lot of people at the beach yesterday. (be, past)|There were|Había = there were.
How far is ___ to the airport? (pronoun)|it|Distance: How far is it?
I told ___ the truth. (he)|him|he → him.
My cat is sick. I'm taking ___ to the vet. (she)|her|she → her.
What time ___? (start / the class / does)|does the class start|Question: does + subject + verb.
He bought ___ for her birthday. (flowers / her)|her flowers/~flowers for her|buy + person + thing.
Our neighbors are lovely. We invited ___ to dinner. (they)|them|they → them.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"wot-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- There is / there are question bank (A1-A2 friendly, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const TH_STAGES=[
 {n:1, t:"There is / there are", sub:"there's a park, there are two cafés", why:"'Hay' in English: there is + one thing (a/an), there are + two or more. Never 'has' or 'have' for 'hay'.", es:"'Hay' en inglés: there is + una cosa (a/an), there are + dos o más. Nunca uses 'has' o 'have' para decir 'hay'.", q:`
___ a park near my house. (one park)|There is/There's|There are,It has,Is|One thing → There is.|Una cosa → There is: hay un parque.
___ two supermarkets on my street. (two)|There are|There is,It has,Are|Two or more → There are.|Dos o más → There are: hay dos supermercados.
In my city, ___ a lot of museums. (many)|there are|there is,has,it have|Many museums (plural) → there are. Not 'has'.|Muchos museos (plural) → there are. No uses 'has' para 'hay'.
___ a cat on the sofa. (one)|There is/There's|There are,It has,Has|One cat → There is.|Un gato → There is.
___ some books on the table. (plural)|There are|There is,Has,Are|Books (plural) → There are.|Books (plural) → There are.
___ an apple in my bag. (one)|There is/There's|There are,Has,It is|One thing → There is.|Una cosa → There is.
___ three bedrooms in the apartment. (three)|There are|There is,It has three,Has|Three → There are.|Tres → There are.
___ some milk in the fridge. (milk = uncountable)|There is/There's|There are,Has,It have|Milk can't be counted → There is (some milk).|La leche no se cuenta → There is (some milk).
___ many people at the party. (many)|There are|There is,It has,Have|People is plural → There are.|People es plural → There are.
___ a problem with my computer. (one)|There is/There's|There are,Has,It has a|One problem → There is.|Un problema → There is.
___ two students from Brazil in my class. (two)|There are|There is,Have,Has|Two → There are.|Dos → There are.
___ a lot of traffic today. (traffic = uncountable)|There is/There's|There are,Has,It have|Traffic can't be counted → There is.|Traffic no se cuenta → There is.
___ a good restaurant in this neighborhood. (one)|There is/There's|There are,Has,It have|One → There is.|Uno → There is.
In Chile ___ many volcanoes. (many)|there are|there is,has,have|Many volcanoes → there are.|Muchos volcanes → there are.
`},
 {n:2, t:"Negatives: there isn't / there aren't", sub:"there isn't any milk", why:"There isn't (a/any) + one thing. There aren't (any) + plural. Use any in negatives.", es:"There isn't (a/any) + una cosa. There aren't (any) + plural. En negativo se usa any: no hay → there isn't / there aren't.", q:`
___ any milk in the fridge. (negative)|There isn't/There is not|There aren't,There don't,Hasn't|Milk (uncountable) → There isn't any.|Milk (no se cuenta) → There isn't any.
___ any chairs in the room. (negative)|There aren't/There are not|There isn't,There don't,Haven't|Chairs (plural) → There aren't any.|Chairs (plural) → There aren't any.
___ a bank near here. (negative)|There isn't/There is not|There aren't,There don't is,Hasn't|One bank → There isn't a.|Un banco → There isn't a.
___ many people today. (negative)|There aren't/There are not|There isn't,There don't,Hasn't|People (plural) → There aren't.|People (plural) → There aren't.
___ any problems. Everything is OK. (negative)|There aren't/There are not|There isn't,There don't,Haven't|Problems (plural) → There aren't any.|Problems (plural) → There aren't any.
There aren't ___ eggs. We need to buy some. (any / some)|any|some,a,no any|Negative → any.|En negativo → any.
There isn't ___ sugar in my coffee. (any / some)|any|some,a,an|Negative → any.|En negativo → any.
___ a supermarket in my village. (negative)|There isn't/There is not|There aren't,Hasn't,There don't|One → There isn't.|Uno → There isn't.
___ any good movies on TV tonight. (negative)|There aren't/There are not|There isn't,There don't,Hasn't|Movies (plural) → There aren't.|Movies (plural) → There aren't.
___ time to talk now. Sorry! (negative)|There isn't/There is not|There aren't,There don't,Hasn't|Time (uncountable) → There isn't.|Time (no se cuenta) → There isn't.
___ any windows in the bathroom. (negative)|There aren't/There are not|There isn't,Hasn't,There don't|Windows (plural) → There aren't.|Windows (plural) → There aren't.
There's no milk. = There isn't ___ milk. (same meaning)|any|some,no,a|There's no = There isn't any.|There's no = There isn't any: no hay leche.
___ a bus after midnight. (negative)|There isn't/There is not|There aren't,There don't,Hasn't|One bus → There isn't.|Un bus → There isn't.
___ enough chairs for everyone. (negative)|There aren't/There are not|There isn't,There don't,Haven't|Chairs (plural) → There aren't.|Chairs (plural) → There aren't.
`},
 {n:3, t:"Questions: Is there…? Are there…?", sub:"Is there a bank near here?", why:"Questions: Is there + one thing? Are there + plural? Short answers: Yes, there is. / No, there aren't.", es:"Preguntas: Is there + una cosa? Are there + plural? (¿Hay…?) Respuestas cortas: Yes, there is. / No, there aren't.", q:`
___ a bank near here? (one)|Is there|Are there,There is,Has|One bank → Is there…?|Un banco → Is there…? (¿Hay un banco…?)
___ any good restaurants in this area? (plural)|Are there|Is there,There are,Have|Restaurants (plural) → Are there…?|Restaurants (plural) → Are there…?
___ any milk left? (uncountable)|Is there|Are there,There is,Has|Milk → Is there…?|Milk → Is there…?
How many people ___ in your family? (question)|are there/~are|there are,is there,have|How many + plural → are there?|How many + plural → are there?
Is there a pharmacy on this street? Yes, ___. (short answer)|there is|there's,it is,is there|Short answer: Yes, there is. (Not 'there's'.)|Respuesta corta: Yes, there is. (No 'there's'.)
Are there any questions? No, ___. (short answer)|there aren't/there are not|there isn't,they aren't,aren't there|Short answer: No, there aren't.|Respuesta corta: No, there aren't.
___ a problem? You look worried. (one)|Is there|Are there,There is,Has|One problem → Is there…?|Un problema → Is there…?
___ any tickets for tonight? (plural)|Are there|Is there,There are,Have|Tickets (plural) → Are there…?|Tickets (plural) → Are there…?
How much water ___ in the bottle? (uncountable)|is there/~is|are there,there is,has|How much + uncountable → is there?|How much + no contable → is there?
Is there any coffee? No, ___. (short answer)|there isn't/there is not|there aren't,it isn't,isn't there|Short answer: No, there isn't.|Respuesta corta: No, there isn't.
___ a gym in your building? (one)|Is there|Are there,There is,Has|One gym → Is there…?|Un gimnasio → Is there…?
Are there many tourists in summer? Yes, ___. (short answer)|there are|there is,they are,are there|Short answer: Yes, there are.|Respuesta corta: Yes, there are.
___ any shops open on Sunday? (plural)|Are there|Is there,There are,Have|Shops (plural) → Are there…?|Shops (plural) → Are there…?
What ___ in the box? (one thing, unknown)|is there/~is|are there,there is,has|What + is there?|What is there…? (¿Qué hay…?)
`},
 {n:4, t:"Past: there was / there were", sub:"there was a party, there were 20 people", why:"'Había / hubo': there was + one thing, there were + plural. Negatives: wasn't / weren't. Questions: Was there…? Were there…?", es:"'Había / hubo': there was + una cosa, there were + plural. Negativo: wasn't / weren't. Preguntas: Was there…? Were there…?", q:`
___ a party at my house last night. (past, one)|There was|There were,There is,Had|Past + one → There was.|Pasado + uno → There was: hubo una fiesta.
___ twenty people at the party. (past, plural)|There were|There was,There are,Had|Past + plural → There were.|Pasado + plural → There were: había veinte personas.
___ a lot of traffic this morning. (past, uncountable)|There was|There were,There is,Had|Traffic → There was.|Traffic → There was.
When I was a kid, ___ a big tree in our garden. (past, one)|there was|there were,there is,had|Past + one → there was.|Pasado + uno → there was.
___ many cars in the 1950s. (past, negative, plural)|There weren't/There were not|There wasn't,There didn't,Didn't have|Past + plural, negative → There weren't.|Pasado + plural, negativo → There weren't.
___ any food left at the end. (past, negative, uncountable)|There wasn't/There was not|There weren't,There didn't,Didn't have|Food → There wasn't.|Food → There wasn't.
___ a problem with your flight? (past question, one)|Was there|Were there,There was,Had|Past question + one → Was there…?|Pregunta pasada + uno → Was there…?
___ many people at the concert? (past question, plural)|Were there|Was there,There were,Had|Past question + plural → Were there…?|Pregunta pasada + plural → Were there…?
Was there a lot of snow? Yes, ___. (short answer)|there was|there were,it was,was there|Short answer: Yes, there was.|Respuesta corta: Yes, there was.
Were there any messages for me? No, ___. (short answer)|there weren't/there were not|there wasn't,they weren't,weren't there|Short answer: No, there weren't.|Respuesta corta: No, there weren't.
___ an accident on the highway yesterday. (past, one)|There was|There were,There is,Had|Past + one → There was.|Pasado + uno → There was: hubo un accidente.
In my old school, ___ only two computers. (past, plural)|there were|there was,there are,had|Past + plural → there were.|Pasado + plural → there were.
___ any wifi at the hotel. (past, negative)|There wasn't/There was not|There weren't,There didn't,Didn't have|Wifi → There wasn't.|Wifi → There wasn't.
How many students ___ in your class last year? (past question)|were there/~were|there were,was there,had|How many + plural, past → were there?|How many + plural, pasado → were there?
`},
 {n:5, t:"Future: there will be", sub:"there will be a meeting, there won't be time", why:"'Habrá': there will be (one or many, it doesn't change!). Negative: there won't be. Question: Will there be…? Never 'there doesn't will be'.", es:"'Habrá': there will be (uno o muchos, ¡no cambia!). Negativo: there won't be. Pregunta: Will there be…? Nunca 'there doesn't will be'.", q:`
___ a meeting tomorrow at 10. (future)|There will be/There'll be|There is going,There will,Will be|Future → There will be.|Futuro → There will be: habrá una reunión.
___ a lot of people at the concert. (future, plural)|There will be/There'll be|There wills be,There will are,Will have|Future → There will be (even with plural!).|Futuro → There will be (¡también con plural!).
Don't worry, ___ a problem. (future, negative)|there won't be/there will not be|there doesn't will be,there won't,there isn't will be|Future negative → there won't be. Not 'there doesn't will be'.|Futuro negativo → there won't be. No 'there doesn't will be'.
___ time to see everything. The trip is too short. (future, negative)|There won't be/There will not be|There doesn't will be,There won't,There not will be|Future negative → There won't be.|Futuro negativo → There won't be.
___ food at the party? (future question)|Will there be|There will be,Will be there,Is there will|Future question → Will there be…?|Pregunta futura → Will there be…? (¿Habrá…?)
Will there be any tickets left? Yes, ___. (short answer)|there will|there will be,it will,will there|Short answer: Yes, there will.|Respuesta corta: Yes, there will.
I think ___ more electric cars in 2030. (future, plural)|there will be/there'll be|there will are,there are will,will have|Future → there will be.|Futuro → there will be.
___ any classes next Monday. It's a holiday. (future, negative)|There won't be/There will not be|There don't will be,There won't,There aren't will be|Future negative → There won't be.|Futuro negativo → There won't be.
Look at those clouds. There's going ___ a storm. (going to)|to be|be,to have,will be|There's going to be = there will be (when you can see it coming).|There's going to be = va a haber (cuando lo ves venir).
___ going to be a big party on Saturday. (going to)|There's/There is|It's,There are,Is|There is going to be…|There is going to be… (va a haber).
Will there be parking at the hotel? No, ___. (short answer)|there won't/there will not|there won't be,it won't,won't there|Short answer: No, there won't.|Respuesta corta: No, there won't.
___ a test at the end of the course? (future question)|Will there be|There will be,Will be there,Is there will|Future question → Will there be…?|Pregunta futura → Will there be…?
In the future, ___ flying cars. (future, plural)|there will be/there'll be|there will are,there wills be,will have|Future → there will be.|Futuro → there will be.
___ enough chairs for everyone? (future question)|Will there be|There will be,Will be there,Are there will|Future question → Will there be…?|Pregunta futura → Will there be…?
`},
 {n:6, t:"Mix it up", sub:"now, before and later", why:"Look at the time: now → is/are, past → was/were, future → will be. Then: one thing or many?", es:"Mira el tiempo: ahora → is/are, pasado → was/were, futuro → will be. Luego: ¿una cosa o varias?", q:`
Yesterday ___ a big storm. (past)|there was|there were,there is,had|Yesterday + one → there was.|Ayer + uno → there was.
Right now ___ three people in the office. (now)|there are|there is,there were,has|Now + plural → there are.|Ahora + plural → there are.
Tomorrow ___ a test. (future)|there will be/there'll be|there is will,there will,will have|Tomorrow → there will be.|Mañana → there will be.
Last year ___ any good concerts here. (past, negative)|there weren't/there were not|there wasn't,there didn't,there aren't|Past + plural, negative → there weren't.|Pasado + plural, negativo → there weren't.
Next week ___ a class on Friday. It's a holiday. (future, negative)|there won't be/there will not be|there doesn't will be,there isn't,there won't|Future negative → there won't be.|Futuro negativo → there won't be.
___ a doctor here? It's an emergency! (now, question)|Is there|Are there,Was there,Has|Now + one, question → Is there…?|Ahora + uno, pregunta → Is there…?
In 1990, ___ no cell phones. (past)|there were|there was,there are,had|Past + plural → there were.|Pasado + plural → there were.
___ a lot of noise last night. Did you hear it? (past)|There was|There were,There is,Had|Noise (uncountable), past → There was.|Noise (no se cuenta), pasado → There was.
How many people ___ at the wedding next month? (future question)|will there be/~will be|there will be,will be there,are there will|Future question → will there be?|Pregunta futura → will there be?
___ any coffee? I need some! (now, question)|Is there|Are there,Was there,Has|Coffee (uncountable) → Is there…?|Coffee (no se cuenta) → Is there…?
My city is small. ___ many things to do. (now, negative)|There aren't/There are not|There isn't,There don't,Hasn't|Now + plural, negative → There aren't.|Ahora + plural, negativo → There aren't.
When I arrived, ___ anyone at home. (past, negative)|there wasn't/there was not|there weren't,there didn't,there isn't|Anyone → singular → there wasn't.|Anyone → singular → there wasn't.
___ a new mall in my neighborhood next year. (future)|There will be/There'll be|There is will,There will,Will have|Next year → There will be.|El próximo año → There will be.
___ any problems with the order? (past question)|Were there|Was there,Are there,Had|Past + plural, question → Were there…?|Pasado + plural, pregunta → Were there…?
`},
 {n:7, t:"Tell the story", sub:"my neighborhood, 10 blanks", story:true, why:"Now → is/are, past → was/were, future → will be. One thing or many? Negatives with any.", es:"Ahora → is/are, pasado → was/were, futuro → will be. ¿Una cosa o varias? Negativos con any.", q:`
#My neighborhood
I live in Ñuñoa. ___ a big park near my apartment. (now, one)|There is/There's|There are,It has,Has
___ also many small cafés on my street. (now, plural)|There are|There is,Has,Have
Ten years ago, ___ any cafés here. (past, negative, plural)|there weren't/there were not|there wasn't,there didn't,there aren't
___ only an old bakery and a small shop. (past)|There were/There was|There had,There is,Had
___ a metro station either. (past, negative, one)|There wasn't/There was not|There weren't,There didn't,There isn't
Now ___ a new station, so it's easy to go downtown. (now, one)|there is/there's|there are,has,there was
But ___ a lot of traffic in the mornings. (now, uncountable)|there is/there's|there are,has,there were
Next year ___ a new library. (future)|there will be/there'll be|there is will,there will,will have
I hope ___ more trees too. (future, plural)|there will be/there'll be|there will are,there wills be,will have
And you? ___ a park near your house? (now, question)|Is there|Are there,There is,Has
#The party
Last Saturday ___ a party at Sofía's house. (past, one)|there was|there were,there is,had
___ about thirty people. (past, plural)|There were|There was,There are,Had
___ a lot of food: empanadas, pizza and cake. (past, uncountable)|There was|There were,There is,Had
But ___ any ice for the drinks! (past, negative)|there wasn't/there was not|there weren't,there didn't,there isn't
___ a shop open at that time? (past question, one)|Was there|Were there,Is there,Had
Yes, ___, so I went to buy some. (short answer)|there was|there were,it was,was there
When I came back, ___ music and everyone was dancing. (past, uncountable)|there was|there were,there is,had
___ a problem with the neighbors? No, they came to the party too! (past question)|Was there|Were there,Is there,Had
Sofía says ___ another party in December. (future)|there will be/there'll be|there is will,there will,will have
I'm sure ___ enough ice next time! (future)|there will be/there'll be|there will,there is will,will have
`},
 {n:8, adv:true, t:"Advanced: there seems to be, there's been…", sub:"there must be, there used to be, there's no point", why:"There is/are at B2–C1: with modals, seem, used to and the present perfect.", es:"There is/are nivel B2–C1: con modales, seem, used to y el present perfect.", q:`
There ___ to be a problem with the Wi-Fi. (seem)|seems|seem,are seem,seeming|There seems to be + singular.|There seems to be + singular = parece que hay.
There ___ a lot of changes since you left. (be, present perfect)|have been|has been,were being,are been|Present perfect + plural: there have been.|Present perfect + plural: there have been.
There ___ an accident on the highway. Traffic is terrible. (be)|has been/'s been/~was|have been,is been,was being|There has been = news with a result now.|There has been = noticia con un resultado ahora.
There ___ be a cinema here, but now it's a supermarket.|used to|use to,was used to,would|There used to be = it existed in the past, not now.|There used to be = antes había, ahora no.
There's no point ___ about it now. (worry)|worrying/in worrying|to worry,worry,worried|There's no point (in) + -ing.|There's no point (in) + -ing = no tiene sentido.
There ___ have been a mistake. My name isn't on the list. (I'm almost sure)|must|musts,must to,can|There must have been = I'm almost sure it happened.|There must have been = estoy casi seguro de que pasó.
There's bound ___ traffic at this time. (be)|to be|be,being,been|There's bound to be = there will definitely be.|There's bound to be = seguro que va a haber.
There ___ (not / be) enough time, so we stopped.|wasn't/was not|weren't,isn't,hasn't|Time is uncountable → there wasn't.|Time es incontable → there wasn't.
There ___ going to be a party on Friday.|is/'s|are,will,has|Future plan: there is going to be.|Plan futuro: there is going to be.
I don't think there ___ any milk left.|is/'s|are,has,have|Milk is uncountable → is.|Milk es incontable → is.
There ___ fewer people at the meeting than we expected.|were|was,had,is|People is plural, and it's the past → were.|People es plural y es pasado → were.
There ___ no way I'm going out in this rain.|is/'s|are,be,has|There's no way… = it won't happen.|There's no way… = de ninguna manera.
`}
];
TH_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"th"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"th"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const TH_TEST=`
___ a supermarket near my house. (now, one)|There is/There's|One → There is.
___ two bathrooms in the apartment. (now, plural)|There are|Plural → There are.
In my city ___ many parks. (now, plural)|there are|Not 'has': there are.
___ any milk. (now, negative)|There isn't/There is not|Milk → There isn't any.
___ any eggs. (now, negative)|There aren't/There are not|Eggs → There aren't any.
___ a bank near here? (question, one)|Is there|One → Is there…?
___ any good cafés here? (question, plural)|Are there|Plural → Are there…?
Is there a gym? Yes, ___. (short answer)|there is|Yes, there is.
Are there any tickets? No, ___. (short answer)|there aren't/there are not|No, there aren't.
___ a party last night. (past, one)|There was|Past + one → There was.
___ a lot of people at the concert. (past, plural)|There were|Past + plural → There were.
___ any wifi at the hotel. (past, negative)|There wasn't/There was not|Past, negative → There wasn't.
___ many students in class yesterday. (past, negative, plural)|There weren't/There were not|Past + plural, negative → There weren't.
___ a problem with the flight? (past question)|Was there|Past + one → Was there…?
___ a meeting tomorrow. (future)|There will be/There'll be|Future → There will be.
___ a problem. Don't worry. (future, negative)|There won't be/There will not be|Not 'there doesn't will be' → There won't be.
___ food at the party? (future question)|Will there be|Future question → Will there be…?
Look at the sky. There's going ___ a storm. (going to)|to be|There's going to be.
How many people ___ in your family? (now, question)|are there/~are|How many + plural → are there?
___ some water in the bottle. (now, uncountable)|There is/There's|Water → There is.
Ten years ago ___ a metro station here. (past, negative)|there wasn't/there was not|Past + one, negative → there wasn't.
Next year ___ more buses. (future, plural)|there will be/there'll be|Future → there will be (same for plural).
___ time to finish. Hurry! (now, negative)|There isn't/There is not|Time → There isn't.
Were there any messages? Yes, ___. (short answer)|there were|Yes, there were.
How much money ___ in your wallet? (now, question)|is there/~is|How much → is there?
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"tht-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

/* ---------- Job interviews (English for Specific Purposes) question bank (B1 to C1, Spanish help on every question) ----------
   same format as the grammar banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint
   ~ = also correct English, but not the form this stage practices (never marked wrong)
   a line that starts with * is always multiple choice (whole sentences to choose from); its wrong options never contain commas
   8 stages, no ⭐ Advanced stage and no buddy toy (Noa, Nov 21 2026: not everyone needs interview prep) */
const INT_STAGES=[
 {n:1, t:"Tell me about yourself", sub:"I've been working as… · I'm responsible for… · I'm currently…", why:"Talk about your career with the present simple (your job now), the present continuous (these days) and the present perfect (from the past until now).", es:"Habla de tu carrera con el presente simple (tu trabajo actual), el presente continuo (estos días) y el present perfect (desde el pasado hasta ahora).", q:`
I ___ as a project manager for three years. (work)|have been working/'ve been working/~have worked/~'ve worked|am working,work,have been work|Started in the past and still true → have been working + for.|Empezó en el pasado y sigue → have been working + for.
Currently, I ___ for a logistics company in Santiago. (work)|work/~am working/~'m working|worked,have work,working|Your job now → present simple: I work for…|Tu trabajo actual → presente simple: I work for…
I'm ___ for a team of five people. (responsible)|responsible|in charge,the responsible,responsable|Be responsible for + people or tasks (in charge takes "of").|Ser responsable de → be responsible for (in charge va con "of").
I ___ in marketing since 2019. (be)|have been/'ve been|am,was,have be|since + a year → present perfect.|since + un año → present perfect.
I ___ a degree in Civil Engineering. (have)|have/~'ve got/~have got|has,am having,having|Your degree → I have a degree in…|Tu título → I have a degree in…
*(Interviewer: "So, tell me about yourself.") ___|I'm a civil engineer with five years of experience in construction.|My name is Pedro and I have 30 years.,I am engineer since five years.,I have five years working of engineer.|Start with who you are professionally and your experience. Your age isn't needed (and in English you ARE 30, you don't HAVE 30).|Empieza con quién eres profesionalmente y tu experiencia. Tu edad no hace falta (y en inglés se dice I AM 30).
Right now, I ___ my Master's degree part-time. (do)|'m doing/am doing|do,doing,have do|Something in progress these days → present continuous.|Algo en progreso estos días → presente continuo.
I have experience ___ customer service. (en)|in/~with|on,at,about|experience in + an area.|experiencia en → experience in.
I ___ for this company since I finished university. (work)|have worked/'ve worked/have been working/'ve been working|work,worked,am working|since + a moment in the past → present perfect.|since + un momento del pasado → present perfect.
I have five years ___ experience in sales. (de)|of|with,in,the|years of experience (not "years working").|años de experiencia → years of experience.
I'm ___ in data analysis. (especializado)|specialized/specialised|specialist,special,speciality|I'm specialized in… (or: I specialize in…).|Estoy especializado en → I'm specialized in…
At the moment, I ___ for new opportunities in the tech industry. (look)|'m looking/am looking|look,looking,have look|Right now → present continuous.|Ahora mismo → presente continuo.
`},
 {n:2, t:"Your experience and results", sub:"I led a team · We increased sales by 20% · I've finished three projects", why:"A finished job or time → past simple (I led, I managed). Until now → present perfect (I've finished). Results: increase / reduce BY + a number.", es:"Un trabajo o tiempo terminado → pasado simple (I led, I managed). Hasta ahora → present perfect (I've finished). Resultados: increase / reduce BY + un número.", q:`
In my last job, I ___ a team of eight people. (lead)|led|leaded,have led,lead|A finished job → past simple. lead → led.|Un trabajo terminado → pasado simple. lead → led.
Last year, we ___ sales by 20%. (increase)|increased|have increased,increase,increased of|Last year → past simple. Increase BY + a percentage.|Last year → pasado simple. Increase BY + un porcentaje.
Sales went up ___ 20% after the campaign. (en)|by|in,of,on|go up / increase BY + a percentage.|subir un 20% → go up BY 20%.
I ___ three big projects so far this year. (finish)|have finished/'ve finished|finished,finish,am finishing|so far → present perfect.|so far (hasta ahora) → present perfect.
When I was at my last company, I ___ a new payment system. (implement)|implemented|have implemented,implement,implementing|A finished period (when I was at…) → past simple.|Un período terminado (when I was at…) → pasado simple.
I ___ with international clients many times. (work)|have worked/'ve worked/~worked|work,am working,working|Experience until now → present perfect.|Experiencia hasta ahora → present perfect.
*Which sounds stronger in an interview?|I managed a budget of $2 million.|I was in a budget of $2 million.,I made the budget of $2 million things.,I did a budget management of $2 million.|Use strong action verbs: managed, led, created, improved.|Usa verbos de acción fuertes: managed, led, created, improved.
I ___ the onboarding process, so new employees learned faster. (improve)|improved|improve,have improve,improving|A past action → improved.|Una acción pasada → improved.
We reduced costs ___ 15%. (en)|by|in,on,to the|reduce BY a percentage.|reducir un 15% → reduce BY 15%.
I ___ responsible for hiring new staff in 2022. (be)|was|have been,am,were|2022 → past simple.|2022 → pasado simple.
Since I joined the company, I ___ two promotions. (get)|have got/have gotten/'ve got/'ve gotten|got,get,am getting|Since I joined → present perfect.|Since I joined (desde que entré) → present perfect.
*A strong way to finish a story about a result:|As a result, customer complaints dropped by 30%.|As result the complaints dropped in 30%.,Like result complains dropped 30% less.,In result customer complaints went down of 30%.|"As a result" + a number makes your answer memorable.|"As a result" + un número hace tu respuesta memorable.
`},
 {n:3, t:"Telling a work story", sub:"At the time… · While I was working… · As a result…", why:"Tell a story in order: the situation (past simple and past continuous), what you did (first, then, after) and the result (as a result, in the end).", es:"Cuenta una historia en orden: la situación (pasado simple y continuo), lo que hiciste (first, then, after) y el resultado (as a result, in the end).", q:`
___ the time, I was working as a sales assistant. (En ese momento)|At|In,On,By|At the time = en ese momento.|En ese momento → At the time.
We had a big problem: the client ___ to cancel the contract. (want)|wanted|want,wanting,has wanted|A past story → past simple.|Una historia pasada → pasado simple.
While I ___ on the report, my manager called me. (work)|was working/~worked|am working,have worked,was work|Background action in progress → past continuous.|Una acción de fondo en progreso → pasado continuo.
___, I talked to the client to understand the problem. (primero)|First/First of all/Firstly|In first,Firstly of all,On first|First / First of all = primero (for steps).|Primero (para pasos) → First / First of all.
___ I offered a discount, they agreed to stay. (después de que)|After|Before of,After of,Then|After + an action.|Después de que → After + acción.
___, we kept the client and sales grew 10%. (como resultado)|As a result/~In the end|As result,Like a result,For result|As a result = como resultado.|Como resultado → As a result (con "a").
I decided ___ a meeting with the whole team. (organize)|to organize/to organise|organize,organizing,for organize|decide + to + verb.|decide + to + verbo.
In the end, the project ___ on time. (finish)|finished/was finished|has finished,finish,finishing|In the end → past simple.|In the end (al final) → pasado simple.
The situation was difficult ___ we only had two weeks. (porque)|because/~as/~since|so,for that,why|because + the reason.|porque → because + la razón.
We only had two weeks, ___ I made a clear plan. (así que)|so|because,why,for|so = así que / por eso.|Así que / por eso → so.
*(Interviewer: "Tell me about a challenge you faced.") Best first sentence:|In my last job, we had a serious problem with a supplier.|In my last job we have had a serious problem with a supplier ago.,The last job I had a problem serious with a supplier.,When I was in my last job I am having a problem with supplier.|Start by setting the scene in the past simple.|Empieza describiendo la situación en pasado simple.
I ___ that experience a lot. It taught me to stay calm. (learn)|learned from/learnt from|learned of,learned,have learn from|learn FROM an experience.|aprender de una experiencia → learn FROM.
`},
 {n:4, t:"Strengths and weaknesses", sub:"I'm detail-oriented · I work well under pressure · I tend to…", why:"Describe yourself with the right words and prepositions (good at, under pressure, describe me as), then back it up with an example.", es:"Descríbete con las palabras y preposiciones correctas (good at, under pressure, describe me as) y luego dalo con un ejemplo.", q:`
I'm very ___. I always double-check my work. (detallista)|detail-oriented/detail oriented|detailist,detallist,detailed person|detallista → detail-oriented (not "detailist").|Detallista → detail-oriented (no "detailist").
One of my strengths ___ communication. (be)|is|are,it's,have|One of my strengths IS… (one = singular).|One of my strengths IS… (one = singular).
I work well ___ pressure. (bajo)|under|with,in,on|work well under pressure.|trabajar bien bajo presión → under pressure.
I'm good ___ solving problems. (en)|at|in,for,on|good AT + -ing.|bueno para → good AT.
I'm good at ___ with difficult customers. (deal)|dealing|deal,to deal,dealt|good at + verb-ing.|good at + verbo con -ing.
I tend ___ too much on details. (focus)|to focus|focus,for focus,focusing in|tend to + verb.|tiendo a → tend to + verbo.
I ___ on my public speaking. I joined a course last month. (work)|'ve been working/have been working/'m working/am working|working,works,have work|Something you're improving these days → present perfect continuous or present continuous.|Algo que estás mejorando estos días → present perfect continuous o presente continuo.
*Which is the best way to talk about a weakness?|Sometimes I find it hard to delegate, but I'm learning to trust my team.|My weakness is that I am too much perfectionist.,I have a weakness in delegate tasks.,Sometimes is difficult for me delegate.|Name one real weakness + what you're doing about it. Watch the grammar: too much + adjective is wrong, and "it" can't disappear.|Nombra una debilidad real + qué haces para mejorarla. Ojo: "too much perfectionist" está mal y el "it" no puede desaparecer.
I'm a fast ___. (learn)|learner|learn,learning,learned|I'm a fast learner = aprendo rápido.|Aprendo rápido → I'm a fast learner.
My colleagues would describe me ___ reliable and friendly. (como)|as|like,how,that|describe someone AS + adjective.|describir a alguien como → describe someone AS.
I'm a very ___ person. (responsable)|responsible|responsable,responsability,responsibly|English: responsible (with -ible).|En inglés: responsible (con -ible).
I always ___ problems before they become big. (try / anticipate)|try to anticipate|try anticipate,try for anticipate,am try to anticipate|try + to + verb.|try + to + verbo.
`},
 {n:5, t:"\"What would you do if…?\"", sub:"If a client was angry, I would… · If I were you, I'd…", why:"Hypothetical questions use the second conditional: If + past simple, … would + verb.", es:"Las preguntas hipotéticas usan el segundo condicional: If + pasado simple, … would + verbo.", q:`
If a client ___ angry, I would listen first. (be)|was/were|is,would be,will be|If + past (was / were), … would.|If + pasado (was / were), … would.
If I disagreed with my manager, I ___ to him in private. (talk)|would talk/'d talk|will talk,talk,talked|An imagined situation → would + verb.|Una situación imaginada → would + verbo.
What ___ if you missed a deadline? (you / do)|would you do|will you do,you would do,did you do|What would you do if…? (question order).|What would you do if…? (orden de pregunta).
If I ___ the answer, I would ask a colleague. (not know)|didn't know/did not know|don't know,wouldn't know,not knew|If + past negative → didn't know.|If + pasado negativo → didn't know.
If I were you, I ___ for more information. (ask)|would ask/'d ask|will ask,asked,ask|If I were you → would.|If I were you (yo que tú) → would.
I would tell my manager immediately if I ___ a mistake. (make)|made|make,would make,will make|… if + past simple.|… if + pasado simple.
If two colleagues ___, I'd help them find a solution together. (argue)|argued/were arguing|argue,would argue,will argue|If + past.|If + pasado.
*(Interviewer: "What would you do if you had too much work?") Best start:|I would prioritize the most urgent tasks.|I will prioritize the most urgent tasks if I would have.,I prioritize the urgents tasks.,I would to prioritize the most urgent tasks.|Answer with I would + base verb.|Responde con I would + verbo base.
If I ___ more time, I'd take a leadership course. (have)|had|have,would have,will have|If + past simple.|If + pasado simple.
___ were in that situation, I'd stay calm. (Si yo)|If I|If I'm,When I,If I would|If I were… (not "If I would").|Si yo estuviera… → If I were (no "If I would").
I wouldn't ___ the client anything without checking first. (promise)|promise|to promise,promised,promising|would / wouldn't + base verb.|would / wouldn't + verbo base.
In that case, I ___ my team leader for advice. (ask)|would ask/'d ask|will asked,would asked,asking|would + base verb.|would + verbo base.
`},
 {n:6, t:"Goals and the future", sub:"I'd like to… · I'm hoping to… · I see myself…", why:"Talk about your goals with I'd like to, I'm hoping to, I'm planning to and I see myself + -ing. Watch the small words: to, in, myself.", es:"Habla de tus metas con I'd like to, I'm hoping to, I'm planning to y I see myself + -ing. Ojo con las palabras chicas: to, in, myself.", q:`
In five years, I'd like ___ a team. (lead)|to lead|lead,leading,for lead|I'd like + to + verb.|I'd like + to + verbo.
I'm hoping ___ my English to C1. (improve)|to improve|improve,improving,for improve|hope + to + verb.|hope + to + verbo.
I see ___ in a management position. (me)|myself|me,my self,mine|I see myself… = me veo…|Me veo… → I see myself…
My goal is ___ an expert in cybersecurity. (become)|to become/~becoming|become,for become,to becoming|My goal is to + verb.|Mi meta es… → My goal is to + verbo.
I'm really interested ___ growing with this company. (en)|in|on,for,to|interested IN + -ing.|interesado en → interested IN.
I'd love to ___ more about the role. (learn)|learn|learning,learned,to learn|I'd love to + base verb.|I'd love to + verbo base.
I ___ available to start in January. (be)|am/'m/~would be/~will be|have,being,is|I am available to start…|Estoy disponible → I am available.
Long term, I want to ___ into a strategy role. (move)|move|moving,moved,to move|want to + base verb.|want to + verbo base.
*(Interviewer: "Where do you see yourself in five years?") Best start:|I'd like to be leading projects and growing with the company.|I will see me in a big position.,I see me working here five years more.,In five years I would like be a manager.|I'd like to be + -ing sounds natural and positive.|I'd like to be + -ing suena natural y positivo.
I'm looking forward to ___ from you. (hear)|hearing|hear,heard,hears|look forward to + -ing.|look forward to + verbo con -ing.
I'm planning ___ a certification next year. (get)|to get/~on getting|get,getting,for get|plan + to + verb.|plan + to + verbo.
This role would help me ___ my skills. (develop)|develop/to develop|developing,developed,for develop|help + (to) + verb.|help + (to) + verbo.
`},
 {n:7, t:"Buying time and staying calm", sub:"That's a great question · Could you rephrase that? · Just to make sure…", why:"It's OK not to answer immediately. Use a short phrase to think, ask them to repeat, or check that you understood.", es:"Está bien no responder al tiro. Usa una frase corta para pensar, pide que repitan o confirma que entendiste.", q:`
*You need a few seconds to think:|That's a great question. Let me think for a second.|Wait wait. I am thinking.,Is a good question. Let me to think.,Ehhh good question I think it.|Thank them for the question, then ask for a moment.|Agradece la pregunta y pide un momento.
*You didn't understand the question:|Sorry, could you repeat the question, please?|Can you say me again?,Repeat please the question.,What? Again please.|Could you repeat…, please? is polite and natural.|Could you repeat…, please? es educado y natural.
Could you ___ that? I'm not sure I understood. (decirlo de otra forma)|rephrase|rephrasing,re-say,explain me|rephrase = say it in other words.|Decirlo de otra forma → rephrase.
Just to make sure I ___, you mean the sales team? (understand)|understand/understood/~'ve understood|understanding,understands,am understand|Just to make sure I understand… = para asegurarme de que entendí…|Para asegurarme de que entendí → Just to make sure I understand.
___ me a moment to think about that. (dame)|Give|Let,Make,Leave|Give me a moment = dame un momento.|Dame un momento → Give me a moment.
*You want to add something you forgot:|I'd also like to add that I speak Portuguese.|I want to add other thing more that I speak Portuguese.,Also I would like add that I speak Portuguese.,I'd like to add too that speak Portuguese.|I'd also like to add that… = también me gustaría agregar que…|También me gustaría agregar que → I'd also like to add that…
That's a ___ question. (difícil, de forma amable)|tricky/good/great/~tough/~difficult|trickly,difficulty,hardly|That's a tricky question = buena pregunta (y difícil).|Una pregunta difícil → a tricky question.
*You don't know the answer:|I haven't worked with that tool yet, but I'm a fast learner.|I don't know nothing about that tool.,I never have worked with this tool before.,That tool I don't use it never.|Be honest and add something positive. Watch the double negatives.|Sé honesto y agrega algo positivo. Ojo con la doble negación.
Sorry, ___ do you mean by "stakeholders"? (qué)|what|how,which,that|What do you mean by…? = ¿qué quieres decir con…?|¿Qué quieres decir con…? → What do you mean by…?
Could you give me an ___? (ejemplo)|example|exemple,exampl,examples|an example (with an a).|un ejemplo → an example.
*The interviewer's video stops on a video call:|Sorry, I think you froze for a second. Could you say that again?|You are frozen so repeat.,Your video stopped and you need say again.,I lost you can you repeat?|You froze = se te congeló la imagen.|Se te congeló → you froze.
Can you hear me ___? (bien)|OK/okay/well/~all right/~alright|nice,correct,bien|Can you hear me OK? = ¿me escuchas bien?|¿Me escuchas bien? → Can you hear me OK?
`},
 {n:8, t:"Your questions for them", sub:"Could you tell me what a typical day looks like?", why:"At the end, ask polite indirect questions: Could you tell me / I'd like to know / I was wondering + normal word order (no do / does).", es:"Al final, haz preguntas indirectas y educadas: Could you tell me / I'd like to know / I was wondering + orden normal (sin do / does).", q:`
Could you tell me what a typical day ___ like? (look)|looks|does look,look,is looking|Indirect question → normal order: what a typical day looks like.|Pregunta indirecta → orden normal: what a typical day looks like.
I'd like to know how the team ___ organized. (be)|is|are,does,it is|the team = it → is (normal order).|the team = it → is (orden normal).
Can you tell me when I ___ hear back from you? (will)|will/might/~can|will to,do,am|Normal order: when I will hear back.|Orden normal: when I will hear back.
Could you tell me ___ the next steps are? (cuáles)|what|which,how,that|what the next steps are (not "which").|cuáles son los próximos pasos → what the next steps are.
I was wondering ___ there are opportunities for training. (si)|if/whether|that,what,are|I was wondering if / whether…|Me preguntaba si… → I was wondering if…
Do you know when the position ___? (start)|starts/will start/~is starting|does start,start,starting|Normal order after Do you know when…|Orden normal después de Do you know when…
*A good question to ask at the end:|What do you enjoy most about working here?|What you enjoy more of work here?,Which is the thing you like working here?,Why do you like to work here so much you?|Interviewers like questions about the team and the culture.|A los entrevistadores les gustan las preguntas sobre el equipo y la cultura.
Could you tell me how many people ___ in the team? (be)|there are|are there,there is,is there|Indirect question → there are (normal order).|Pregunta indirecta → there are (orden normal).
I'd like to know what the biggest challenges for this role ___. (be)|are|is,are they,do|the challenges = they → are, at the end.|the challenges = they → are, al final.
*A polite way to ask about the salary:|Could you tell me what the salary range is for this position?|How much you pay?,Which is the salary for this position?,What is the money of this job?|Indirect + "salary range" sounds professional.|Indirecta + "salary range" suena profesional.
Can I ask how the team ___ success? (measure)|measures|does measure,measure,measuring|Normal order: how the team measures success.|Orden normal: how the team measures success.
I'd love to know ___ you enjoy working here. (por qué)|why|because,for what,porque|why = por qué (in questions).|por qué → why.
`}
];
INT_STAGES.forEach(st=>{
  st.items=st.q.trim().split("\n").map((l,i)=>{ const mco=l.startsWith("*"); const p=(mco?l.slice(1):l).split("|").map(x=>x.trim()); const it={id:"int"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; if(mco) it.mco=true; return it; });
  delete st.q;
});
const INT_TEST=`
I ___ as a nurse for six years. (work)|have been working/'ve been working/have worked/'ve worked|For + a period until now → present perfect.
In my last job, I ___ a team of ten. (manage)|managed|A finished job → past simple.
We increased sales ___ 25%. (en)|by|increase BY a percentage.
I'm good ___ working with numbers. (en)|at|good AT + -ing.
I work well ___ pressure. (bajo)|under|work well under pressure.
One of my strengths ___ teamwork. (be)|is|One of my strengths IS…
I tend ___ too many tasks at once. (take on)|to take on|tend to + verb.
If a customer ___ rude, I would stay calm. (be)|was/were|If + past → would.
What ___ if you missed a deadline? (you / do)|would you do|What would you do if…?
If I were you, I ___ the manager. (call)|would call/'d call|If I were you → would.
In five years, I'd like ___ my own team. (have)|to have|I'd like to + verb.
I'm really interested ___ this role. (en)|in|interested IN.
I'm looking forward to ___ from you. (hear)|hearing|look forward to + -ing.
My colleagues describe me ___ organized. (como)|as|describe someone AS…
___ the time, I was working in a bank. (En ese momento)|At|At the time.
While I ___ on the report, my boss called. (work)|was working/~worked|Background in progress → past continuous.
We only had a week, ___ I made a clear plan. (así que)|so|so = así que.
Could you tell me what a typical day ___ like? (look)|looks|Indirect question → normal order.
I was wondering ___ there's room to grow. (si)|if/whether|I was wondering if…
Do you know when the position ___? (start)|starts/will start/~is starting|Normal order after Do you know…
I have five years ___ experience in sales. (de)|of|years of experience.
Could you ___ the question, please? (say it again)|repeat/~rephrase|Could you repeat…?
I'm a fast ___. (learn)|learner|I'm a fast learner.
Since I joined the company, I ___ two promotions. (get)|have got/have gotten/'ve got/'ve gotten|Since… → present perfect.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"intt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });

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
    box.innerHTML='<h4>Hibi</h4>'+
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

/* ---------- shareable monthly recap ---------- */
(function(){
  const MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const mkey=d=>d.getFullYear()+"-"+(d.getMonth()+1);
  function bump(){ const m=LS.get("ncs-mst",{})||{}, k=mkey(new Date()); m[k]=(m[k]|0)+1; LS.set("ncs-mst",m); }
  document.addEventListener("cs-modround",bump);
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bump(); });
  function stats(off){
    const d=new Date(); d.setDate(1); d.setMonth(d.getMonth()+off);
    const y=d.getFullYear(), m=d.getMonth(), k=y+"-"+(m+1), kk=y+"-"+String(m+1).padStart(2,"0");
    const inM=t=>{ if(!t) return false; const x=new Date(t); return x.getFullYear()===y&&x.getMonth()===m; };
    const ws=(LS.get("ncs-words",[])||[]).filter(w=>w&&w.w&&!w.sample);
    const bd=LS.get("ncs-buddy",{})||{};
    const gd=(Array.isArray(bd.gd)?bd.gd:[]).map(String).filter(g=>g.startsWith(k+"-")||g.startsWith(kk+"-"));
    const dayN=[...new Set(gd.map(g=>+g.split("-")[2]))].sort((a,b)=>a-b); let streak=0,run=0,prev=-9; dayN.forEach(n=>{ run=n===prev+1?run+1:1; prev=n; streak=Math.max(streak,run); });
    const fc=LS.get("ncs-fc",{})||{}, learned=Object.values(fc).filter(v=>v>=3).length;
    const md=LS.get("ncs-mods",{})||{}, stars=["ps","pp"].reduce((t,k)=>t+Object.values((md[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0);
    const notes=(LS.get("ncs-classnotes",[])||[]).filter(n=>n&&inM(n.t)).length;
    const mw=ws.filter(w=>inM(w.t)).sort((a,b)=>(b.t||0)-(a.t||0));
    const on=window.csBuddy&&bd.on===true;
    return {month:MON[m], y, words:mw.length, newest:mw[0]?mw[0].w:"", total:ws.length, days:dayN.length, streak, rounds:(LS.get("ncs-mst",{})||{})[k]|0, learned, stars, notes,
      dw:bd.dw|0, dplay:bd.dplay|0, lvl:on?window.csBuddy.level():0, bname:on?window.csBuddy.name():"", room:on};
  }
  /* only things they actually did: no zeros */
  function modules(st){
    const L=[];
    const add=(ico,n,one,many)=>{ if(n>0) L.push({ico,n:String(n),t:n===1?one:many}); };
    add("📚",st.words,"new word","new words");
    add("🌱",st.days,"study day","study days");
    if(st.streak>=2) add("🔥",st.streak,"","days in a row");
    add("🎯",st.rounds,"practice round","practice rounds");
    add("✅",st.learned,"word learned","words learned");
    add("🧩",st.stars,"grammar star","grammar stars");
    add("📝",st.notes,"class note","class notes");
    add("⚔️",st.dw,"duel win","duel wins");
    if(!st.words) add("🗂️",st.total,"word in my collection","words in my collection");
    return L.slice(0,6);
  }
  const BG={night:["#0B1226","#16235A","#3A1F5C"],sunset:["#2B1055","#B8336A","#F29A3E"],ocean:["#03203C","#0E5E8A","#1FA2B5"],forest:["#0A2618","#1E5631","#5E8C3E"],candy:["#4B2378","#B02A6B","#E88AB4"]};
  const BGS=[["room","🏠","My buddy's room"],["night","🌌","Night"],["sunset","🌅","Sunset"],["ocean","🌊","Ocean"],["forest","🌲","Forest"],["candy","🍬","Candy"]];
  function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  const svgImg=async(svg,w,h)=>{ const img=new Image(); img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" ')); await new Promise((ok,no)=>{ img.onload=ok; img.onerror=no; }); return img; };
  async function draw(st,bg){
    const W=1080,H=1920, cv=document.createElement("canvas"); cv.width=W; cv.height=H; const c=cv.getContext("2d");
    const useRoom=bg==="room"&&st.room&&window.csBuddy&&window.csBuddy.scene;
    const cols=BG[useRoom?"night":bg]||BG.night;
    const g=c.createLinearGradient(0,0,W,H); g.addColorStop(0,cols[0]); g.addColorStop(.55,cols[1]); g.addColorStop(1,cols[2]); c.fillStyle=g; c.fillRect(0,0,W,H);
    for(let i=0;i<60;i++){ c.fillStyle="rgba(255,255,255,"+(Math.random()*.45+.12)+")"; const s=Math.random()*4+1; c.fillRect(Math.random()*W,Math.random()*H*.5,s,s); }
    const F='system-ui,-apple-system,"Segoe UI",Roboto,"Hiragino Sans","Noto Sans JP",sans-serif';
    c.textAlign="center"; c.fillStyle="rgba(255,255,255,.75)"; c.font="700 40px "+F; c.fillText("MY "+st.month.toUpperCase()+" "+st.y,W/2,160);
    c.fillStyle="#FFFFFF"; c.font="800 96px "+F; c.fillText("on Hibi 日々",W/2,270);
    let by=330;
    if(useRoom){
      const sh=460, sw=Math.round(sh*40/26), sx=(W-sw)/2;
      try{ c.save(); rr(c,sx,by,sw,sh,40); c.clip(); c.imageSmoothingEnabled=false; c.drawImage(await svgImg(window.csBuddy.scene(),sw,sh),sx,by,sw,sh); c.restore(); rr(c,sx,by,sw,sh,40); c.strokeStyle="rgba(255,255,255,.35)"; c.lineWidth=4; c.stroke(); }catch(e){}
      by+=sh+66; c.fillStyle="#FFFFFF"; c.font="800 50px "+F; c.fillText(st.bname+"  ·  💛 Level "+st.lvl,W/2,by); by+=50;
    } else if(st.lvl&&window.csBuddy){
      rr(c,270,by,540,470,48); c.fillStyle="rgba(255,255,255,.1)"; c.fill();
      try{ c.imageSmoothingEnabled=false; c.drawImage(await svgImg(window.csBuddy.portrait(),400,440),370,by+24,340,374); }catch(e){}
      c.fillStyle="#FFFFFF"; c.font="800 50px "+F; c.fillText(st.bname,W/2,by+440); by+=470;
      c.fillStyle="#FFD86B"; c.font="700 40px "+F; c.fillText("💛 Friendship level "+st.lvl,W/2,by+66); by+=96;
    } else by+=20;
    let ms=modules(st); const cw=440, ch=200, gx=50, gy=28, x0=(W-cw*2-gx)/2, MINH=190;
    const fits=(n,extra)=>{ const rows=Math.ceil(n/2); return H-180-(by+extra)-gy*rows-20>=rows*MINH; };
    let showNew=!!st.newest&&fits(ms.length,128);
    while(ms.length>2&&!fits(ms.length,showNew?128:0)) ms=ms.slice(0,ms.length-(ms.length%2?1:2));
    if(showNew){ const y=by+20; rr(c,x0,y,cw*2+gx,120,36); c.fillStyle="rgba(255,255,255,.14)"; c.fill(); c.fillStyle="rgba(255,255,255,.7)"; c.font="600 30px "+F; c.fillText("Newest word this month",W/2,y+46); c.fillStyle="#FFFFFF"; c.font="800 48px "+F; c.fillText("“"+String(st.newest).slice(0,28)+"”",W/2,y+98); by=y+120+8; }
    const avail=H-180-by-20, rows=Math.ceil(ms.length/2), chh=Math.max(MINH,Math.min(ch,Math.floor((avail-gy*rows)/Math.max(1,rows))));
    ms.forEach((k,i)=>{ const last=i===ms.length-1&&ms.length%2===1, x=last?(W-cw)/2:x0+(i%2)*(cw+gx), y=by+20+Math.floor(i/2)*(chh+gy);
      rr(c,x,y,cw,chh,36); c.fillStyle="rgba(255,255,255,.12)"; c.fill();
      c.fillStyle="#FFFFFF"; c.font="50px "+F; c.fillText(k.ico,x+cw/2,y+chh*.33); c.font="800 64px "+F; c.fillText(k.n,x+cw/2,y+chh*.66); c.fillStyle="rgba(255,255,255,.75)"; c.font="600 29px "+F; c.fillText(k.t,x+cw/2,y+chh*.87); });
    if(!ms.length){ c.fillStyle="#FFFFFF"; c.font="700 46px "+F; c.fillText("A fresh start.",W/2,by+120); c.fillStyle="rgba(255,255,255,.75)"; c.font="600 36px "+F; c.fillText("Next month is yours 💪",W/2,by+176); }
    c.fillStyle="#FFFFFF"; c.font="700 40px "+F; c.fillText("Hibi 日々 by Noa",W/2,H-110); c.fillStyle="rgba(255,255,255,.7)"; c.font="600 34px "+F; c.fillText("@learnwithnoa",W/2,H-62);
    return cv;
  }
  async function open(off){
    const st=stats(off); let bg=localStorage.getItem("ncs-recap-bg")||(st.room?"room":"night"); if(bg==="room"&&!st.room) bg="night";
    const fname="hibi-"+st.month.toLowerCase()+"-"+st.y+".png", canShare=!!(navigator.canShare&&window.File);
    const dl=csDialog('<h3 style="margin:0 0 10px">📸 Your '+esc(st.month)+' recap</h3><img id="rcImg" alt="Your '+esc(st.month)+' recap" style="width:100%;max-width:300px;aspect-ratio:9/16;display:block;margin:0 auto 12px;border-radius:14px;background:#16235A">'+
      '<div class="rc-bgs" role="group" aria-label="Background">'+BGS.filter(b=>b[0]!=="room"||st.room).map(b=>'<button type="button" class="rc-bg" data-rcbg="'+b[0]+'" aria-pressed="'+(b[0]===bg)+'" title="'+b[2]+'"><span aria-hidden="true">'+b[1]+'</span> '+b[2]+'</button>').join("")+'</div>'+
      '<p class="muted" style="margin:10px 0 12px;font-size:14px">Share it in your Instagram stories and tag <b>@learnwithnoa</b>! 💛</p>'+
      '<div class="note-actions" style="justify-content:center">'+(canShare?'<button class="pill-btn pill-green" type="button" data-rcshare>Share</button>':"")+'<a class="pill-btn'+(canShare?"":" pill-green")+'" id="rcDl" download="'+fname+'" style="text-decoration:none">Download</a>'+(off===0?'<button class="swap" type="button" data-rcprev>Last month</button>':'')+'</div>',{cls:"rc-dlg"});
    let url="";
    const paint=async()=>{ url=(await draw(st,bg)).toDataURL("image/png"); const im=dl.el.querySelector("#rcImg"); if(im) im.src=url; const a=dl.el.querySelector("#rcDl"); if(a) a.href=url; };
    await paint();
    dl.el.addEventListener("click",async e=>{
      const b=e.target.closest("[data-rcbg]"); if(b){ bg=b.dataset.rcbg; try{ localStorage.setItem("ncs-recap-bg",bg); }catch(er){} dl.el.querySelectorAll("[data-rcbg]").forEach(x=>x.setAttribute("aria-pressed",x===b)); await paint(); return; }
      if(e.target.closest("[data-rcprev]")){ dl.close(); open(-1); return; }
      if(!e.target.closest("[data-rcshare]")) return;
      try{ const blob=await (await fetch(url)).blob(); const f=new File([blob],fname,{type:"image/png"}); if(navigator.canShare({files:[f]})) await navigator.share({files:[f],title:"My "+st.month+" on Hibi"}); else { const a=document.createElement("a"); a.href=url; a.download=fname; a.click(); } }catch(er){}
    });
  }
  window.csRecap=open;
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-recap]"); if(!b) return; e.preventDefault(); open(b.dataset.recap==="prev"?-1:0); });
  /* at the start of a month, the buddy offers last month's recap (once) */
  setTimeout(()=>{ try{
    const d=new Date(); if(d.getDate()>7) return;
    const p=new Date(); p.setDate(1); p.setMonth(p.getMonth()-1); const pk=mkey(p);
    if(localStorage.getItem("cs-recap-offer")===pk) return;
    const st=stats(-1); if(!st.words&&!st.days&&!st.rounds) return;
    localStorage.setItem("cs-recap-offer",pk);
    if(window.csBuddy&&window.csBuddy.say) window.csBuddy.say("📸 Your <b>"+st.month+"</b> recap is ready! Want to see it?",'<button class="bd-b go" type="button" data-recap="prev">See my recap</button>',12000);
  }catch(e){} },7000);
})();

/* ---------- usage counts (for Noa's teacher view): how often each part of the site is used, per day ---------- */
(function(){
  const DAY=()=>{ const d=new Date(); return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); };
  let pend={}, timer=null;
  function flush(){
    timer=null; const keys=Object.keys(pend); if(!keys.length) return;
    const u=LS.get("ncs-usage",{})||{}, d=DAY(); u[d]=u[d]||{};
    keys.forEach(k=>{ u[d][k]=(u[d][k]|0)+pend[k]; }); pend={};
    const ds=Object.keys(u).sort((a,b)=>new Date(b)-new Date(a)); ds.slice(35).forEach(k=>delete u[k]);
    LS.set("ncs-usage",u);
  }
  window.csUse=function(k){ pend[k]=(pend[k]|0)+1; if(!timer) timer=setTimeout(flush,45000); };
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) flush(); });
  window.addEventListener("pagehide",flush);
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) csUse("flash"); });
  document.addEventListener("cs-modround",e=>{ const d=e.detail||{}; csUse(d.irr?"irr":d.mod?"gram":"vocab"); });
  document.addEventListener("cs-sentence",()=>csUse("sentence"));
  document.addEventListener("cs-said",()=>csUse("say"));
  document.addEventListener("click",e=>{ if(e.target.closest("#trBtn")) csUse("translate"); if(e.target.closest("[data-vlearn]")) csUse("vcards"); },true);
})();

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
  return "Hibi feedback\nType: "+fbType+"\nSection: "+(sec?sec[1]:"General")+(fbName.value.trim()?"\nFrom: "+fbName.value.trim():"")+"\n\n"+fbMsg.value.trim();
}
function fbUpdate(){
  const t=fbText(), subj="Hibi feedback: "+fbType;
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
  {id:"2026-1127-words", date:"November 27, 2026", title:"Clearer word cards", items:[
    ["🔤","Spanish and meaning, apart","in <b>Words from this class</b>, the Spanish translation (with a small <b>ES</b> tag) and the English meaning now look different, so they're easy to tell apart.","club"]
  ]},
  {id:"2026-1126-tour", date:"November 26, 2026", title:"A shorter welcome tour", items:[
    ["🐢","Less to read","<b>How this page works</b> is now a few short cards per step instead of long lists. Take your time: there's a lot to explore, one thing a day is perfect.",""]
  ]},
  {id:"2026-1126-past", date:"November 26, 2026", title:"Your coaching history stays with you", items:[
    ["🎓","After your classes end","if you stop your private classes with Noa, <b>My coaching</b> stays: your class history, recaps, study guides, progress reports, English Map and words are all still there. Want to start again? Tap <b>💬 Write to Noa</b>.","coaching"]
  ]},
  {id:"2026-1126-small", date:"November 26, 2026", title:"Little things on Home", items:[
    ["🎬","Club recordings from Home","in <b>This week in the club</b> on Home, every class that already happened has a <b>🎬 Recording</b> button when its video is up.","notes"],
    ["✅","Word of the day: already saved?","if today's word is already in My notebook, the button now says <b>✓ Saved to My notebook</b>.","notes"],
    ["🌐","A simpler Translator","the page-wide 🔊 Listen button is gone from the Translator. You can still hear each translation with its own 🔊 button.","translate"]
  ]},
  {id:"2026-1125-sweep", date:"November 25, 2026", title:"Small fixes all over Hibi 🧹", items:[
    ["📊","Wide tables on your phone","tables that don't fit on the screen now show <b>Swipe the table →</b>, so you know there's more to the right."],
    ["🐾","Your buddy steps aside","on your phone, your study buddy fades while you scroll so it never covers what you're reading."],
    ["🔤","Easier to read","the level badges next to each lesson (A1, B1…) are clear again in light mode, and small labels are a bit bigger."]
  ]},
  {id:"2026-1125-wordorder", date:"November 25, 2026", title:"New: word order, and pets and animals", items:[
    ["🧱","Word order and object pronouns","A new module in <b>Practice → Grammar</b> (A2 to B1): <i>It's raining</i> (not <i>Is raining</i>), <i>I saw him</i> (not <i>I him saw</i>), <i>give it to me</i>, <i>explain it to me</i>. A short lesson, 6 stages, an ⭐ Advanced bonus and a test, all with Spanish help.","quiz"],
    ["🐶","Pets and animals","A new word pack in <b>Practice → Word packs</b>: <i>fur</i> (not hair!), <i>paw</i>, <i>leash</i>, <i>vet</i>, <i>groomer</i>, <i>adopt</i> and more, for talking about your dog or cat.","quiz"],
    ["🧩","Two new toys","Finish the word order module for 🧱 <b>building blocks</b> for your study buddy, and pass its Advanced stage for a 🧩 <b>puzzle piece</b>.",""]
  ]},
  {id:"2026-1124-landing", date:"November 24, 2026", title:"A new front page for hibi.cl 🏡", items:[
    ["👋","For people who aren't in Hibi yet","hibi.cl now opens with a real page about Noa, his 1:1 classes and the club, what Hibi is, and what students say. Share the link with friends who want to learn with Noa!"],
    ["🔑","Signing in is the same","If you ever sign out, tap Student sign in at the top (or Continue with Google at the bottom)."]
  ]},
  {id:"2026-1124-recs", date:"November 24, 2026", title:"Find what Noa recommends ⭐", items:[
    ["⭐","Noa recommends for you","Everything Noa recommends to you now shows at the top of Practice, with how far you got and an Open button.","quiz"],
    ["🔔","Messages that take you there","When Noa's message is about a module, tap it in your 🔔 (or Open it in Messages from Noa) and it takes you straight to it.","quiz"],
    ["🗂️","Easier to spot","Module cards and the Verb tenses folder show Noa's recommendation on its own line.","quiz"],
    ["🎧","Music button","The music button shows the headphones, and the little bars only while music is playing.","notes"]
  ]},
  {id:"2026-1124-tidy-room", date:"November 24, 2026", title:"A tidier buddy room 🏠", items:[
    ["✨","Tidy up puts every toy in its place","Floor toys go on the floor, the banner, clock and map go on the wall, and the bell, plane and rocket hang or fly up high, spread around the whole room instead of piled next to your buddy.","notes"],
    ["🧸","A cleaner Toys list","Every toy you can win is listed now, grouped by how you get it, with a count of how many are in the room."]
  ]},
  {id:"2026-1123-fill-retry", date:"November 23, 2026", title:"Auto-fill tries again ✨", items:[
    ["✨","If a word didn't get its details","Sometimes the AI helper can't connect for a moment. Now Hibi tells you clearly when that happens, and words that are still missing something fill in by themselves the next time you open Hibi.","words"]
  ]},
  {id:"2026-1123-park-active", date:"November 23, 2026", title:"A livelier Buddy park 🌳", items:[
    ["🌳","Only buddies people are visiting","The <b>Buddy park</b> now shows the buddies of people who've been on Hibi in the last 30 days, so it's easier to find someone to send love to or challenge to a duel. Away for a while? Your buddy comes back to the park as soon as you open Hibi.","park"]
  ]},
  {id:"2026-1123-board-undo", date:"November 23, 2026", title:"Live board words, tidier 🧩", items:[
    ["↩️","See what you saved (and undo it)","On a class's <b>🧩 Live board</b>, <b>＋ Save all</b> now shows exactly which words went to My notebook, with an <b>Undo</b> button if you change your mind.","club"],
    ["📚","Each recording has its own words","In the Club <b>Library</b>, a recording now shows the words from <i>that</i> class (from its live board), not the same list for the whole week.","club"],
    ["🌈","Colors that mean something","Words are colored by type, the same everywhere on Hibi (My notebook, flashcards, word packs, the word look-up, and the word cards in the Library and podcast): 🔴 nouns, 🟠 verbs, 🟡 phrasal verbs, 🟢 adjectives, 🩵 adverbs, 🟣 expressions. In My notebook you can also sort your words by <b>🌈 Type of word</b>.","words"]
  ]},
  {id:"2026-1123-print", date:"November 23, 2026", title:"Print a whole module 🖨️", items:[
    ["🖨️","Print it or save it as a PDF","Like studying on paper? Open any grammar module (or Job interviews) and tap <b>🖨️ Print or save as PDF</b> at the top. You get the whole thing: the 📖 Learn it lesson (basics and advanced), every stage with a line to write your answer, the final test and an answer key at the end.","quiz"]
  ]},
  {id:"2026-1123-wordnums", date:"November 23, 2026", title:"Numbered words 🔢", items:[
    ["🔢","Every word has a number","In <b>My notebook</b>, each word now shows a number like <b>#65</b> (#1 is the first word you saved). Want Noa to look at a word? Just tell him the number. You can also type <b>#65</b> in the search box to find it.","words"]
  ]},
  {id:"2026-1123-simple-search", date:"November 23, 2026", title:"Search in Simple mode 🔎", items:[
    ["🔎","Search is back in Simple mode","If you use <b>Simple mode</b>, the search bar at the top is back, so you can find your words, lessons and practice in a second.",""]
  ]},
  {id:"2026-1122-duels-all", date:"November 22, 2026", title:"Duels for everyone ⚔️", items:[
    ["⚔️","Duel anyone on Hibi","You don't need to be in the club anymore: everyone on Hibi can challenge anyone else to a 7-day duel. Tap someone's buddy in the <b>Buddy park</b>, then <b>⚔️ Duel</b>.","park"]
  ]},
  {id:"2026-1122-sweep", date:"November 22, 2026", title:"Small fixes and tidy-ups", items:[
    ["🎤","Interview practice counts","Each question you check in the <b>🎤 Practice interview</b> now counts as a round for your weekly goal (once per question each week).","quiz"],
    ["✏️","Clearer class notes","The help text in <b>My notebook → Class notes</b> now matches how it works: write in the box, <b>Save draft</b> during class, then <b>Move to my notes</b>.","classnotes"]
  ]},
  {id:"2026-1121-esp", date:"November 21, 2026", title:"New: English for Specific Purposes 🎯", items:[
    ["👔","Job interviews","A new section in <b>Practice</b>: <b>English for Specific Purposes</b>. The first module is <b>Job interviews</b>: 8 stages with the English you need for any interview (talking about your experience, results, stories, strengths and weaknesses, “what would you do if…”, buying time and your questions at the end).","quiz"],
    ["🎤","Practice interview","Answer 12 real interview questions in writing and Hibi checks your <b>English</b>: mistakes, a more natural version and useful phrases. It never judges the content, because that depends on your job.","quiz"]
  ]},
  {id:"2026-1120-autofill", date:"November 20, 2026", title:"Choose what Hibi fills in for your words", items:[
    ["⚙️","Auto-fill, your way","When you save a word, Hibi fills in the Spanish, a simple meaning, the word type, how to say it and an example by itself. In <b>My notebook</b>, tap <b>⚙️ Auto-fill</b> to choose which ones (untick <b>Example sentence</b> if you like writing your own).","words"],
    ["✨","Only when something's missing","The <b>✨ Fill in missing details</b> button now shows up only when some of your words are missing something, with how many.","words"]
  ]},
  {id:"2026-1119-editgif", date:"November 19, 2026", title:"Edit your GIFs and photos", items:[
    ["✏️","Fix a post after you share it","Tap ✏️ on your post, comment or weekly challenge answer to change the text, remove a photo, or remove or change the GIF.","club"]
  ]},
  {id:"2026-1119-fchow", date:"November 19, 2026", title:"How to use flashcards", items:[
    ["💡","Flashcard tips","Flashcards now have a short <b>💡 How to use flashcards</b> guide: try to remember before you flip, be honest with ✓ / ✗, and a word is learned after ✓ 3 times in a row. Close it once and it stays closed.","quiz"]
  ]},
  {id:"2026-1119-profpet", date:"November 19, 2026", title:"Profiles show your photo and your buddy", items:[
    ["🐾","Meet their buddy","A member's profile now shows the same photo as the members list, with their study buddy in the corner. Hover over it (or tap it on your phone) to see its name, friendship level, what it's wearing and more.",""]
  ]},
  {id:"2026-1119-duels", date:"November 19, 2026", title:"Follow your duels", items:[
    ["⚔️","Your duels on Home","When you have a duel, <b>⚔️ Your duels</b> sits at the top of Home. Tap it to see the score, accept a challenge or check who you're waiting for.",""],
    ["🔔","Duel news in the bell","The 🔔 tells you when someone challenges you, accepts, takes the lead, when there's 1 day left and who won.",""],
    ["📜","Your past duels","Buddy park now keeps a list of your duels and results. After a practice round that counts for a duel, you'll see the new score.",""]
  ]},
  {id:"2026-1119-tries", date:"November 19, 2026", title:"See all your practice, even without stars", items:[
    ["📜","Your tries","Every grammar module now shows your <b>best score, how many tries and when</b>, even if you didn't get a star yet, plus a <b>📜 Your tries</b> history at the bottom.",""],
    ["⏸","Stop and continue later","If you tap <b>Stop this round</b>, Hibi remembers where you were. Tap <b>Continue</b> to pick up from the same question.",""],
    ["🎓","Your test out score","The test out box shows your last score and how many more you need to pass. Stars: ★ 7/10 · ★★ 9/10 · ★★★ 10/10.",""]
  ]},
  {id:"2026-1119-irr", date:"November 19, 2026", title:"Irregular verbs, all in one place", items:[
    ["🔁","Irregular verbs: all in one place","<b>Practice → Grammar → Irregular verbs</b> now has everything: pick <b>⭐ Essential</b> (the 60 you'll use every day) or <b>All</b>, then 🃏 flashcards in random order (✓ I knew it / ✗ Didn't know), a ✏️ quiz, the ⌨️ writing drill, and 📌 Review for the ones you missed. Hibi remembers your progress. You can also start from the buttons at the top of the Irregular verbs page.",""]
  ]},
  {id:"2026-1119-lbsave", date:"November 19, 2026", title:"Smarter live boards", items:[
    ["🧩","Save only the useful stuff","On a class's <b>🧩 Live board</b>, <b>+ My notebook</b> now shows only on new expressions and useful phrases (not on game rules or instructions), and every phrase in a list has its own little <b>＋</b>.",""],
    ["📧","Fewer emails","If you get an email about an unread message, Hibi won't email you again until you've read it.",""]
  ]},
  {id:"2026-1118-lbitems", date:"November 18, 2026", title:"Easier-to-read live boards", items:[
    ["🧩","Lists on the live board","When a card on a class's <b>🧩 Live board</b> has a list (like the options in a game or the things a group chose), it now shows as bullet points, one per line, just like in class.",""]
  ]},
  {id:"2026-1118-future", date:"November 18, 2026", title:"New: the future, and confusing word pairs", items:[
    ["🔮","Talking about the future","A new module in <b>Practice → Grammar → Verb tenses</b> (B1 and up): when to use <i>will</i>, <i>going to</i>, <i>I'm meeting…</i> and <i>the train leaves at 7</i>. A short lesson, 6 stages, an ⭐ Advanced stage and a test out.",""],
    ["🔀","Confusing word pairs","A new word pack in <b>Practice → Word packs</b>: <i>fun or funny</i>, <i>say or tell</i>, <i>borrow or lend</i>, <i>lose or miss</i> and more.",""],
    ["🚀","Two new toys","Finish the future module for a 🔮 <b>crystal ball</b> for your study buddy, and pass its Advanced stage for a 🚀 <b>rocket</b>.",""]
  ]},
  {id:"2026-1117-fewer", date:"November 17, 2026", title:"Fewer pop-ups, tidier Settings", items:[
    ["🔕","Fewer of these pop-ups","Use Hibi a lot? Tap <b>See fewer of these</b> under this window to get one summary a week instead, or choose <b>Never</b> in Settings → Home &amp; notifications. Everything new is always listed in What's new.",""],
    ["⚙️","Tidier Settings","Settings now has clearer groups: Make Hibi easier, Look &amp; feel, Text &amp; reading, Focus &amp; comfort, and Home &amp; notifications.",""],
    ["⇄","Translator in Simple mode","Simple mode now has the <b>Translator</b> as one of its main buttons.","translate"],
    ["📒","Long word lists load faster","If you have lots of words, My notebook shows them 60 at a time. Scroll down and more appear by themselves (or tap <b>Show more words</b>). Search still looks through all of them.","words"],
    ["✨","Make it yours from the start","The welcome tour now lets new members pick their colors, text size, Simple mode and Calm mode right away. (You can replay the tour from <b>How this page works</b>.)",""]
  ]},
  {id:"2026-1117-simple", date:"November 17, 2026", title:"Simple mode 🧩", items:[
    ["🧩","Less on the screen","Too much on Hibi? Turn on <b>Simple mode</b> in <b>Settings</b>: the menu shows only Home, My coaching, Club, My notebook and Practice, with bigger buttons, and Home starts with big buttons to get where you want to go.",""],
    ["☰","Everything is still there","Tap <b>☰ More</b> in the menu to see every page, and <b>Simple menu</b> to go back. Noa can turn it on for you, and you can always turn it off.",""]
  ]},
  {id:"2026-1117-buddytalk", date:"November 17, 2026", title:"Your study buddy has more to say", items:[
    ["🐾","Smarter hellos","Your buddy now says something different each time: \"welcome back\" after a few days away, a reminder on club class days, Noa's recommended module, how close you are to your weekly goal, today's word and much more.",""],
    ["🔁","No more repeats","It won't say the same thing over and over, and it only says hi when you arrive, not every time you refresh.",""]
  ]},
  {id:"2026-1117-world", date:"November 17, 2026", title:"Around the world today", items:[
    ["🌍","Little good news, every day","On your <b>Home</b> page: three small things happening in the world each day (a celebration, space or tech, and good news), presented by some random study buddies.","notes"],
    ["📖","Learn a word, read more","Tap the <b>underlined word</b> to learn it and save it, and tap a title to open the full story. Missed a day? Tap <b>‹ Yesterday</b>.","notes"],
    ["✏️","Make Home yours","Tap <b>✏️ Arrange</b> at the top of Home to move sections up or down, or hide the ones you don't need.","notes"],
    ["💛","Reactions everyone sees","React with 💛 🤯 😂 and see who else did. In the club you can now also tap the faces to see <b>who's going</b> to a class, who <b>enjoyed a recording</b>, and 👀 who reacted to a post or comment.","club"]
  ]},
  {id:"2026-1117-notebook", date:"November 17, 2026", title:"Meet My notebook", items:[
    ["📒","Words + class notes, together","<b>My words</b> and <b>My class notes</b> are now one place in the menu: <b>My notebook</b>. Nothing was lost.","words"],
    ["🗂️","Three tabs","<b>Aa Words</b> (everything you save), <b>✏️ Class notes</b> (write during class, ✨ Hibi finds the new words) and <b>📓 Summaries</b> (each week, summed up).","classnotes"]
  ]},
  {id:"2026-1117-goal2", date:"November 17, 2026", title:"A weekly goal that fits you", items:[
    ["🎯","Choose your goal","In <b>Practice</b>, pick <b>Easy</b> (3 rounds), <b>Steady</b> (5) or <b>Strong</b> (8) a week. Bigger goal, bigger reward: up to +12 🍪 and +12 friendship.",""],
    ["📖","More things count","Reading a <b>Learn it first</b> lesson and saying phrases out loud now count toward your goal too, not only practice rounds.",""],
    ["🔥","Keep the streak","Do your goal 4 weeks in a row and your study buddy gets a <b>campfire</b>.",""],
    ["⭐","Translator, one click away","The Translator is now in your ★ Starred list in the menu. Don't need it there? Un-star it on its page.",""]
  ]},
  {id:"2026-1117-yearly", date:"November 17, 2026", title:"Switch to the yearly plan", items:[
    ["📅","Monthly member? You can switch to yearly","In <b>Club → Your membership</b>, tap <b>Switch to yearly</b>. The yearly plan costs half of 12 monthly payments. Your paid month stays as it is: the yearly payment starts the day it ends, and the monthly payments stop.",""]
  ]},
  {id:"2026-1117-links", date:"November 17, 2026", title:"Links that take you to the right place", items:[
    ["🔗","The address follows you","When you open a grammar module, a Club tab or a page of My coaching, the address at the top changes too (like <b>hibi.cl/#quiz/grammar/past-simple</b> or <b>hibi.cl/#club/library</b>). Refresh, bookmark it or share it, and it opens right there.",""]
  ]},
  {id:"2026-1117-iq", date:"November 17, 2026", title:"New grammar module: Indirect questions", items:[
    ["❓","Do you know where it is?","A new module in <b>Practice → Grammar</b> (B1+ and up) for polite questions like <i>Do you know where the station is?</i> (not <i>where is the station</i>). A short lesson, 6 stages, an ⭐ Advanced stage and a test out.",""],
    ["🧭","Two new toys","Finish it for a 🧭 <b>compass</b> for your study buddy, and pass its Advanced stage for a 🔍 <b>detective's magnifying glass</b>.",""]
  ]},
  {id:"2026-1117-focusmenu", date:"November 17, 2026", title:"Focus mode: a menu button", items:[
    ["☰","Change pages in focus mode","In focus mode there's now a <b>☰ Menu</b> button at the top left. It opens the menu on the side, so you can jump to another page without leaving focus mode.",""]
  ]},
  {id:"2026-1117-advtoys", date:"November 17, 2026", title:"New toys for your study buddy", items:[
    ["🎁","A toy for every Advanced stage","Pass the ⭐ Advanced stage of a grammar module and your buddy gets a new toy: ⏰ alarm clock, 📷 old camera, ✈️ paper plane, 🗺️ treasure map, 🥇 gold medal, 🎧 headphones and 🔭 telescope. See them all in your buddy's <b>Progress</b>.",""]
  ]},
  {id:"2026-1117-lessons-all", date:"November 17, 2026", title:"Lessons for every grammar module + an Advanced stage", items:[
    ["📖","Learn it first, everywhere","Every grammar module now starts with a short lesson: <b>Basics</b> (A1–B1) and <b>Advanced</b> (B2–C1), in English or <b>Español</b>, with 🔊 examples and common mistakes.",""],
    ["⭐","Stage 8: Advanced","Each module has a new bonus stage for B2–C1. It opens when you pass stage 7 (or test out). You don't need it to finish the module.",""],
    ["🗂️","Verb tenses in one folder","In <b>Practice → Grammar</b>, the present simple, past simple and present perfect now live together in a <b>Verb tenses</b> folder, so the list stays tidy as more topics arrive.",""]
  ]},
  {id:"2026-1117-lesson", date:"November 17, 2026", title:"Learn it first: grammar lessons", items:[
    ["📖","Present perfect lesson","Open <b>Practice → Present perfect</b> and you'll find a short lesson before the stages: <b>Basics</b> (how to make it and when to use it, with examples and common mistakes) and <b>Advanced</b> for B2–C1. Switch it to <b>Español</b> anytime. More topics coming soon.",""]
  ]},
  {id:"2026-1116-dmreact", date:"November 16, 2026", title:"React to messages", items:[
    ["❤️","Reactions in Messages","When someone sends you a message, tap the little <b>☺</b> next to it and pick an emoji, or <b>double-tap</b> the message for a ❤️. Tap your reaction again to remove it.",""]
  ]},
  {id:"2026-1116-stoic", date:"November 16, 2026", title:"A little Stoic idea each day", items:[
    ["🏛️","Daily Stoic (optional)","Want one short idea a day from the Stoics, with a small thing to try? Turn on <b>🏛️ Daily Stoic on Home</b> in <b>Settings</b>, and it shows up at the top of Home. It's off unless you turn it on.",""]
  ]},
  {id:"2026-1116-community", date:"November 16, 2026", title:"Community: see what's new", items:[
    ["🔢","New posts counter","The <b>Community</b> tab shows how many posts and comments you haven't seen. They count as read as you scroll past them, or tap <b>Mark all as read</b>.",""],
    ["📊","Polls in the post box","To start a poll, tap <b>📊 Poll</b> right in the box where you write a post.",""],
    ["🎬","Library: Show less","After <b>Show more</b> in the Library, tap <b>Show less</b> to keep the list short.",""]
  ]},
  {id:"2026-1116-mailnotif", date:"November 16, 2026", title:"Never miss a message", items:[
    ["📧","A little email if a message waits","If someone sends you a message on Hibi and it waits unread for 12 hours, Hibi sends you one short email so you don't miss it. Never more than one a day. You can turn it off in Settings.",""]
  ]},
  {id:"2026-1116-clubpay", date:"November 16, 2026", title:"Hibi 2.0: the club lives here now", items:[
    ["💛","Your membership, on Hibi","Noa's English Club is leaving Skool. Club members keep their same price and switch at the top of the <b>Club</b> page: your first payment waits until the day Skool would have charged you, so you never pay twice.",""],
    ["💳","Pesos or dollars","Pay with <b>Mercado Pago</b> in pesos or <b>PayPal</b> in US dollars. You can see, change or cancel your membership anytime on Hibi.",""],
    ["🔖","New address","Hibi lives at <b>hibi.cl</b> now. If you installed the app on your phone, install it again from hibi.cl.",""]
  ]},
  {id:"2026-1116-kudosbell", date:"November 16, 2026", title:"Notes from Noa in your notifications", items:[
    ["💌","Easier to find","Little notes from Noa now also appear in your 🔔 notifications, with a <b>Reply to Noa</b> button that opens your chat with him. Tap ✕ to hide one (you can still find it under <b>See all</b>).",""]
  ]},
  {id:"2026-1116-studypet", date:"November 16, 2026", title:"Pet your buddy while you study", items:[
    ["🎧","Study room","In the music window, tap your buddy to pet it. Tap anywhere else in the room to play or pause the music.",""]
  ]},
  {id:"2026-1116-translate", date:"November 16, 2026", title:"The translator always answers", items:[
    ["🌐","No more “busy”","When the smart translator is busy, the Translator now gives you a quick translation anyway, so you’re never stuck.",""]
  ]},
  {id:"2026-1115-trial", date:"November 15, 2026", title:"Try the club free for 2 weeks", items:[
    ["🎁","Free 2-week trial","Not in Noa’s English Club yet? Open <b>Club</b> and tap <b>Try it free for 2 weeks</b>. No card needed: you get the classes, recordings, community wall and podcast right away.",""],
    ["💛","Then you decide","Your trial shows how many days are left at the top of the Club page. Want to stay? Tap <b>I want to stay</b> and Noa will help you join.",""]
  ]},
  {id:"2026-1115-domain", date:"November 15, 2026", title:"Hibi has its own address: hibi.cl", items:[
    ["🏠","hibi.cl","Hibi now lives at <b>hibi.cl</b>. Old links still work and bring you here.",""],
    ["🔑","Sign in once more","Because the address is new, you may need to sign in again. All your notes, words and progress are saved to your account, so everything is still here.",""],
    ["📲","Installed the app?","If you added Hibi to your phone or computer, add it again from <b>hibi.cl</b> (Install the app, at the bottom of any page) and remove the old icon.",""]
  ]},
  {id:"2026-1115-sweep", date:"November 15, 2026", title:"Tidier top bar", items:[
    ["＋","Save words on your phone","The green <b>＋</b> button is now at the top on phones too, next to search. Tap it on any page to save a new word.",""],
    ["🪟","One window at a time","Music, timer, notifications, messages and your profile each open right under their own button, and opening one closes the others.",""]
  ]},
  {id:"2026-1115-answers", date:"November 15, 2026", title:"Fairer grammar practice", items:[
    ["✅","More right answers count","Noa checked every question in <b>Practice → Grammar</b>. If there's more than one correct answer (like <b>managed to</b> or <b>was able to</b>), they all count now, and some questions got a clearer time word (<b>yesterday</b>, <b>last night</b>…).","practice"],
    ["👍","\"That's also correct!\"","Wrote something that's correct English but isn't the form the stage is practicing? It won't be marked wrong. Hibi tells you, and you can try the other form.","practice"]
  ]},
  {id:"2026-1114-typing", date:"November 14, 2026", title:"Your typing is safe", items:[
    ["✍️","No surprise refreshes","Hibi never refreshes by itself while you're typing or in the middle of a practice round. If you tap <b>Refresh</b> while writing a note, your text comes back.",""],
    ["💪","Clearer practice feedback","When an answer is wrong, the explanation is easy to read again (it was crossed out by mistake). Three <b>will be able to</b> questions in <b>Could vs was able to</b> are clearer now.","practice"]
  ]},
  {id:"2026-1113-clublib", date:"November 13, 2026", title:"Club Library filters and a smoother 🔔 window", items:[
    ["🎬","Library: filter by class","In <b>Club → Library</b>, tap <b>Deep Dive Monday</b>, <b>Wildcard Wednesday</b>, <b>Word Up Thursday</b> or <b>Free Talk Friday</b> to see only those recordings. The newest 8 show first, then <b>Show more</b>.","club"],
    ["📸","Instagram group, always at the top","The <b>Instagram group</b> button is back at the top right of the club page, on every tab.","club"],
    ["🔔","Notifications and Messages: one window","The 🔔 opens one window with two tabs, like Profile and Settings. The tabs always switch, and the 🔔 closes it again.",""]
  ]},
  {id:"2026-1113-mods", date:"November 13, 2026", title:"Two new grammar modules", items:[
    ["💪","New: Could vs was able to","<b>I could swim</b> (always) vs <b>I was able to fix it</b> (that one time), <b>couldn't</b>, <b>will be able to</b>… 7 stages in <b>Practice → Grammar</b>. Finish it for a 🔑 golden key for your buddy.","quiz"],
    ["🏠","New: There is / there are","<b>hay, había, habrá</b> in English: <b>there is / there are</b>, <b>there was / there were</b>, <b>there will be</b>, negatives and questions. 7 short stages with Spanish help, in <b>Practice → Grammar</b>. Finish it for a 🏠 little house for your buddy.","quiz"]
  ]},
  {id:"2026-1112", date:"November 12, 2026", title:"Profile and settings together", items:[
    ["🧩","The live board from class","the board Noa shares on screen during club classes (your ideas, the new expressions and the questions) is saved after class. Open it with <b>🧩 Live board</b> next to the class recording or the class on <b>This week</b>, and save any expression (or all of them at once with <b>＋ Save all</b>) to <b>My words</b>. The full class material is inside it too: tap <b>📄 Full class material</b> at the top (and <b>← Back to the board</b> to return).","club"],
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
    ["📶","Works offline","once you\u2019ve opened Hibi, it opens even without internet. Your saved words and notes are there, and everything syncs when you\u2019re back online."],
    ["👋","A new welcome tour","tap <b>How this page works</b> at the bottom of any page to see what\u2019s new."]
  ]},
  {id:"2026-smarttranslate", date:"November 6, 2026", title:"A smarter translator 🗣️", items:[
    ["🔁","It knows the language","write in Spanish or English: the translator figures it out by itself.","translate"],
    ["🗣️","How to say it","translations now show an easy way to say the English, like <b>KUMF-ter-buhl</b>.","translate"],
    ["🃏","Save words from flashcards","tap any word in the meaning or example on a flashcard to save it. Tap the words next to it to save a phrase.","quiz"],
    ["↩️","Back button","your browser\u2019s back button now takes you to the last page you visited on Hibi."]
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
    ["📝","Words from your notes","when you save a class note, Hibi suggests the new words and expressions in it.","notes"],
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
    ["📲","Install the app","put Hibi on your phone's home screen: tap <b>📲 Install the app</b> at the bottom of the page.",null],
    ["💌","Messages from Noa","Noa can now send you a little message right here in Hibi.",null]
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
  {id:"2026-10-25", date:"October 25, 2026", title:"Hibi is here", items:[
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
