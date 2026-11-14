/* ---------- Present simple question bank (A1-A2 friendly, Spanish help on every question) ----------
   same format as the past simple bank: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const PRS_STAGES=[
 {n:1, t:"I, you, we, they", sub:"I work, they live", why:"With I, you, we and they, use the verb as it is: no -s.", es:"Con I, you, we y they, el verbo va sin cambios: sin -s.", q:`
I ___ in Santiago. (live)|live|lives,living,am live
We ___ English on Mondays. (study)|study|studies,studys,studying
They ___ coffee every morning. (drink)|drink|drinks,drinking,are drink
You ___ really fast! (walk)|walk|walks,walking,are walk
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
Pedro ___ the guitar. (play)|plays|play,playing,is play|Pedro = he: add -s.|Pedro = he: agrega -s.
My dog ___ a lot. (sleep)|sleeps|sleep,sleeping,is sleep|My dog = it: add -s.|My dog = it: agrega -s.
She ___ English very well. (speak)|speaks|speak,speaking,is speak
He ___ the bus to work. (take)|takes|take,taking,is take
It ___ a lot in winter. (rain)|rains|rain,raining,is rain
My boss ___ long emails. (write)|writes|write,writing,is write
Ana ___ pizza. (love)|loves|love,loving,is love
The class ___ at 8 p.m. (start)|starts|start,starting,is start|The class = it: add -s.|The class = it: agrega -s.
My brother ___ video games all day. (play)|plays|play,playing,is play
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
She ___ very hard. (try)|tries|trys,try,tryes|Consonant + y → -ies.|Consonante + y → -ies.
He ___ to music in the car. (listen)|listens|listenes,listen,listenies|Normal verb: just add -s.|Verbo normal: solo agrega -s.
My friend ___ a big house. (have)|has|haves,have,haves|have → has.|have → has.
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
___ you like pizza?|Do|Does,Are,Is
___ she work on Saturdays?|Does|Do,Is,Are
___ they live near here?|Do|Does,Are,Is
Where ___ you work?|do|does,are,is
What time ___ the class start?|does|do,is,are|The class = it → does.|The class = it → does.
___ your brother play football?|Does|Do,Is,Are|Your brother = he → does.|Your brother = he → does.
Does he ___ English? (speak)|speak|speaks,speaking,spoke|After does, the verb has no -s.|Después de does, el verbo va sin -s.
Do you ___ a dog? (have)|have|has,having,haves
Does she ___ coffee? (drink)|drink|drinks,drinking,drank|After does, the verb has no -s.|Después de does, el verbo va sin -s.
What ___ you do on weekends?|do|does,are,is
How ___ he go to work?|does|do,is,are
Does it ___ a lot here? (rain)|rain|rains,raining,rained
Do you like tea? Yes, I ___.|do|does,am,like|Short answer: Yes, I do.|Respuesta corta: Yes, I do.
Does she live here? No, she ___.|doesn't|don't,isn't,not|Short answer: No, she doesn't.|Respuesta corta: No, she doesn't.
___ your parents speak English?|Do|Does,Are,Is|Your parents = they → do.|Your parents = they → do.
Where does your sister ___? (live)|live|lives,living,lived|After does, the verb has no -s.|Después de does, el verbo va sin -s.
`},
 {n:6, t:"Mix it up", sub:"routines with always, never…", why:"Check the subject first: he/she/it → -s; and always/usually/never go before the verb.", es:"Mira primero el sujeto: he/she/it → -s; y always/usually/never van antes del verbo.", q:`
She always ___ breakfast. (eat)|eats|eat,eating,is eat
I never ___ late. (arrive)|arrive|arrives,arriving,am arrive
My dad usually ___ at 7. (get up)|gets up|get up,gets ups,is get up|Phrasal verbs: the -s goes on the verb: gets up.|En los verbos con partícula, la -s va en el verbo: gets up.
We sometimes ___ out on Fridays. (go)|go|goes,going,are go
He ___ coffee. (not / drink)|doesn't drink/does not drink|don't drink,doesn't drinks,not drink
___ you usually cook at home?|Do|Does,Are,Is
Ana often ___ her grandma. (visit)|visits|visit,visiting,is visit
My kids ___ TV in the morning. (not / watch)|don't watch/do not watch|doesn't watch,not watch,don't watches
The metro ___ very full at 8 a.m. (be)|is|are,be,does|Be is different: I am, you/we/they are, he/she/it is.|Be es distinto: I am, you/we/they are, he/she/it is.
I ___ tired on Mondays. (be)|am|is,are,be|I → am.|I → am.
She ___ the dishes after lunch. (wash)|washes|wash,washs,washing
What time ___ your class finish?|does|do,is,are
He ___ two jobs. (have)|has|have,haves,is have
They usually ___ the bus. (take)|take|takes,taking,are take
My cat never ___ on the bed. (sleep)|sleeps|sleep,sleeping,is sleep
___ he like his new job?|Does|Do,Is,Are
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
