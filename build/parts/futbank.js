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
