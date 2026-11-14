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
document.getElementById("twSave").addEventListener("click",()=>{ if(cur) addWord(cur[0],cur[1],cur[2]); });
})();

