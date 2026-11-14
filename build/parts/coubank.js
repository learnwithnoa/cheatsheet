/* ---------- Could vs was able to question bank (B1 friendly, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const COU_STAGES=[
 {n:1, t:"can, could, be able to", sub:"I can, I could, I'll be able to", why:"Ability now: can. Ability in the past: could. Future: will be able to (never 'will can').", es:"Habilidad ahora: can. En el pasado: could. En el futuro: will be able to (nunca 'will can').", q:`
I ___ speak three languages. (now)|can|could,am able,can to|Now → can.|Ahora → can.
When I was ten, I ___ run really fast. (then)|could|can,could to,was can|Past → could.|Pasado → could.
Next year, I ___ drive. (future)|will be able to/'ll be able to|will can,can,could|Future: will be able to. 'Will can' doesn't exist.|Futuro: will be able to. 'Will can' no existe.
My grandma ___ read without glasses, even at 90. (now)|can|cans,could to,is can|Now → can (no -s, even with she).|Ahora → can (sin -s, aunque sea she).
Before the accident, he ___ play the piano. (then)|could|can,coulds,could to|Past → could.|Pasado → could.
I hope I ___ visit you in March. (future)|will be able to/'ll be able to|will can,can to,could to|Future: will be able to.|Futuro: will be able to.
She ___ swim, but she doesn't like it. (now)|can|can to,cans,is able|Now → can + verb (no 'to').|Ahora → can + verbo (sin 'to').
At university, we ___ sleep until noon. (then)|could|can,could to,were can|Past → could.|Pasado → could.
After this course, you ___ write better emails. (future)|will be able to/'ll be able to|will can,can,could|Future: will be able to.|Futuro: will be able to.
He ___ cook, but he can bake great bread. (now, negative)|can't/cannot|couldn't,can not to,doesn't can|Now, negative → can't.|Ahora, negativo → can't.
When I was a baby, I ___ talk. (then, negative)|couldn't/could not|can't,didn't could,couldn't to|Past, negative → couldn't.|Pasado, negativo → couldn't.
Don't worry, you ___ do it tomorrow. (future)|will be able to/'ll be able to|will can,can to,could to|Future: will be able to.|Futuro: will be able to.
My dog ___ open the door by himself. It's scary. (now)|can|cans,could to,is can|Now → can.|Ahora → can.
Ten years ago, I ___ eat anything and not get fat. (then)|could|can,could to,was can|Past → could.|Pasado → could.
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
The exam was hard, but I ___ pass it. (pass)|was able to|could,can,could to|One specific success → was able to.|Un logro específico → was able to: logré aprobar.
The door was stuck, but finally we ___ open it. (open)|were able to|could,can,was able to|One specific moment + we → were able to.|Un momento específico + we → were able to.
There was a lot of traffic, but she ___ arrive on time. (arrive)|was able to|could,can,were able to|She did it that day → was able to.|Lo logró ese día → was able to.
The fire spread fast, but everyone ___ escape. (escape)|was able to|could,can,were able|One specific success → was able to.|Un logro específico → was able to.
I lost my keys yesterday, but I ___ find them in the car. (find)|was able to|could,can,could to|Yesterday, one success → was able to.|Ayer, un logro → was able to.
After three hours, the mechanic ___ fix my car. (fix)|was able to|could,can,could fixed|One specific success → was able to.|Un logro específico → was able to.
The flight was full, but we ___ get two seats together. (get)|were able to|could,can,was able to|We + one success → were able to.|We + un logro → were able to.
I ___ talk to the manager and solve the problem. (talk)|was able to|could,can,could to|One specific success → was able to.|Un logro específico → was able to.
It was raining all day, but they ___ finish the race. (finish)|were able to|could,can,was able to|They + one success → were able to.|They + un logro → were able to.
My phone died, but I ___ call you from a friend's phone. (call)|was able to|could,can,could called|One specific moment → was able to.|Un momento específico → was able to.
The interview was in English, and I ___ answer every question. (answer)|was able to|could,can,could answered|One specific success → was able to.|Un logro específico → was able to.
The concert was sold out, but Ana ___ buy a ticket online. (buy)|was able to|could,can,were able to|One specific success → was able to.|Un logro específico → was able to.
The ice was thin, but the kids ___ cross the lake. (cross)|were able to|could,can,was able to|The kids = they → were able to.|The kids = they → were able to.
I was really tired, but I ___ stay awake until the end of the movie. (stay)|was able to|could,can,could to|One specific success → was able to.|Un logro específico → was able to.
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
The doctor ___ see me until Friday. (see)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't saw|Negative → couldn't.|Negativo → couldn't.
We ___ hear you. Can you repeat that? (hear)|couldn't/could not|didn't could,can't heard,couldn't heard|Negative → couldn't + base verb.|Negativo → couldn't + verbo base.
She ___ remember his name at the meeting. (remember)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't remembered|Negative → couldn't.|Negativo → couldn't.
I ___ say no. He looked so sad! (say)|couldn't/could not|didn't could,can't said,couldn't said|Negative → couldn't + base verb.|Negativo → couldn't + verbo base.
`},
 {n:5, t:"Questions: Could you…? Were you able to…?", sub:"Were you able to fix it?", why:"Question about general past ability: Could you…? About one specific moment: Were you able to…? (Could you…? now is also a polite request.)", es:"Pregunta sobre habilidad general pasada: Could you…? Sobre un momento específico: Were you able to…? (Could you…? en presente también es una petición amable.)", q:`
___ you swim when you were a kid? (general)|Could|Were,Did,Can|General past ability → Could you…?|Habilidad general pasada → Could you…?
___ you able to fix the printer yesterday? (one moment)|Were|Could,Did,Was|One specific moment → Were you able to…?|Un momento específico → Were you able to…?
Was she ___ to get a ticket? (one moment)|able|could,can,possible|Was she able to…?|Was she able to…?
___ you speak English when you moved to London? (general)|Could|Were,Did,Can|General past ability → Could you…?|Habilidad general pasada → Could you…?
___ they able to finish the project on time? (one moment)|Were|Could,Did,Was|They + one moment → Were they able to…?|They + un momento → Were they able to…?
___ you pass me the salt, please? (polite request)|Could|Were,Did,Are|Polite request → Could you…?|Petición amable → Could you…?
Were you able to ___ him? (call)|call|called,calling,to call|After 'able to' → base verb.|Después de 'able to' → verbo base.
Could you ___ the music from your room? (hear)|hear|heard,hearing,to hear|After could → base verb.|Después de could → verbo base.
___ he able to come to the meeting? (one moment)|Was|Could,Did,Were|He + one moment → Was he able to…?|He + un momento → Was he able to…?
___ you help me with this box? (polite request)|Could|Were,Did,Was|Polite request → Could you…?|Petición amable → Could you…?
Was your dad able to ___ the car? (fix)|fix|fixed,fixing,to fix|After 'able to' → base verb.|Después de 'able to' → verbo base.
Were you able to sleep on the plane? Yes, I ___. (short answer)|was|could,did,were|Short answer: Yes, I was.|Respuesta corta: Yes, I was.
Could she read when she was four? No, she ___. (short answer)|couldn't/could not|wasn't,didn't,can't|Short answer: No, she couldn't.|Respuesta corta: No, she couldn't.
___ you able to find the restaurant OK last night? (one moment)|Were|Could,Did,Was|One specific moment → Were you able to…?|Un momento específico → Were you able to…?
`},
 {n:6, t:"will be able to, have been able to", sub:"other tenses: use be able to", why:"Can and could only have these two forms. For the future, the present perfect or after another modal, use be able to: will be able to, have been able to, might be able to.", es:"Can y could solo tienen esas dos formas. Para el futuro, el present perfect o después de otro modal, usa be able to: will be able to, have been able to, might be able to.", q:`
In two months, you ___ have basic conversations. (future)|will be able to/'ll be able to|will can,can,could|Future → will be able to.|Futuro → will be able to.
I ___ sleep well since I moved. (present perfect, negative)|haven't been able to/have not been able to|didn't can,haven't could,couldn't been|Present perfect → have been able to.|Present perfect → have been able to.
She ___ finish the report yet. (present perfect, negative)|hasn't been able to/has not been able to|hasn't could,didn't can,isn't able|Present perfect → has been able to.|Present perfect → has been able to.
I'm busy now, but I ___ help you later. (might)|might be able to|might can,might could,might able to|After another modal (might) → be able to.|Después de otro modal (might) → be able to.
I'd love ___ play the guitar. (would love + to)|to be able to|to can,can,could|After 'love to', 'want to' → be able to.|Después de 'love to', 'want to' → be able to.
Have you ___ talk to your boss? (present perfect)|been able to|could,can,be able to|Present perfect → have you been able to…?|Present perfect → have you been able to…?
When the new metro line opens, we ___ get to work in 20 minutes. (future)|will be able to/'ll be able to|will can,can,could to|Future → will be able to.|Futuro → will be able to.
Since I started practicing, I ___ understand movies without subtitles. (present perfect)|'ve been able to/have been able to|could,can,have could|Present perfect → have been able to.|Present perfect → have been able to.
You need ___ speak English for this job. (need to)|to be able to|to can,can,could|After 'need to' → be able to.|Después de 'need to' → be able to.
If you practice every day, you ___ speak with more confidence. (future)|will be able to/'ll be able to|will can,can,could|Future → will be able to.|Futuro → will be able to.
We ___ meet next week. I'll let you know. (may)|may be able to|may can,may could,may able to|After may → be able to.|Después de may → be able to.
They ___ fix the problem yet. (present perfect, negative)|haven't been able to/have not been able to|didn't can,haven't could,couldn't been|Present perfect → have been able to.|Present perfect → have been able to.
I hate not ___ sleep. (not + -ing)|being able to|can,could,be able|After a preposition or 'not' + -ing → being able to.|Con -ing → being able to.
One day, robots ___ do all the housework. (future)|will be able to/'ll be able to|will can,can,could|Future → will be able to.|Futuro → will be able to.
`},
 {n:7, t:"Tell the story", sub:"a hard day, 10 blanks", story:true, why:"General past ability → could. One specific success → was/were able to. Negative → couldn't. Future → will be able to.", es:"Habilidad general pasada → could. Un logro específico → was/were able to. Negativo → couldn't. Futuro → will be able to.", q:`
#The job interview
When I was at school, I ___ speak English very well. (speak, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't spoke
But I practiced a lot, and now I ___ have long conversations. (now)|can|could,can to,am able
Last Monday, I had a big job interview in English. My bus was late, but I ___ arrive on time. (arrive)|was able to|could,can,could arrived
The first questions were easy, so I ___ answer them without problems. (answer)|was able to|can,could answered,could to
Then they asked a technical question, and I ___ remember the word "budget"! (remember, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't remembered
I stayed calm and ___ explain the idea with other words. (explain)|was able to|could,can,could explained
They asked: "___ you start next month?" (polite question)|Could|Were,Did,Are
I said: "Yes, I'll ___ start on the 1st." (future)|be able to|can,could,able to
Yesterday they called me. I ___ believe it: I got the job! (believe, negative)|couldn't/could not|didn't could,can't,couldn't believed
Now I'm sure I ___ work in English every day. (future)|will be able to/'ll be able to|will can,can,could
#My grandma's village
My grandma grew up in a small village. As a girl, she ___ climb any tree. (climb)|could/was able to|can,could climbed,could to
There was no school nearby, so she ___ read until she was twelve. (read, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't read to
From her house, she ___ hear the river at night. (hear)|could/was able to|can,could heard,could to
One winter, a big storm came, but her family ___ save all the animals. (save)|was able to|could,can,were able to
Her brother ___ find the road home for two days. (find, negative)|couldn't/could not/wasn't able to/was not able to|didn't could,can't,couldn't found
Finally, he ___ get home with help from a neighbour. (get)|was able to|could,can,could got
Today she's 85, and she ___ still cook for twenty people. (now)|can|could,can to,is able
Last month she ___ walk to the river by herself! (one success)|was able to|could,can,were able to
Next summer, I hope I ___ visit the village with her. (future)|will be able to/'ll be able to|will can,can,could
I'm sure I ___ understand her stories better then. (future)|will be able to/'ll be able to|will can,can,could
`}
];
COU_STAGES.forEach(st=>{
  if(st.story){ st.stories=[]; let cur=null, k=0; st.items=[]; st.q.trim().split("\n").forEach(l=>{ if(l.startsWith("#")){ cur={title:l.slice(1).trim(),items:[]}; st.stories.push(cur); return; } const p=l.split("|").map(x=>x.trim()); const it={id:"cou"+st.n+"-"+(k++), st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es, story:cur.title}; cur.items.push(it); st.items.push(it); }); delete st.q; return; }
  st.items=st.q.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"cou"+st.n+"-"+i, st:st.n, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:(p[2]||"").split(",").map(x=>x.trim()).filter(Boolean), why:p[3]||st.why, es:p[4]||st.es}; });
  delete st.q;
});
const COU_TEST=`
I ___ ride a bike. I learned last year. (now)|can|Now → can.
When I was six, I ___ already swim. (general past)|could/was able to|General past ability → could.
The test was hard, but I ___ pass it. (one success)|was able to|One specific success → was able to, not could.
We ___ find the hotel, so we asked for help. (negative)|couldn't/could not/weren't able to/were not able to|Negative → couldn't.
Next year I ___ drive. (future)|will be able to/'ll be able to|Future → will be able to.
I ___ sleep well lately. (present perfect, negative)|haven't been able to/have not been able to|Present perfect → haven't been able to.
___ you able to call him yesterday? (one moment)|Were|One moment → Were you able to…?
___ you play an instrument when you were a kid? (general)|Could|General → Could you…?
The traffic was crazy, but they ___ arrive on time. (one success)|were able to|They + one success → were able to.
She ___ come yesterday. She was working. (negative)|couldn't/could not/wasn't able to/was not able to|Negative → couldn't.
From the hotel we ___ see the mountains. (senses)|could/were able to|See, hear → could.
I might ___ help you on Friday. (might)|be able to|After might → be able to.
After many tries, he ___ open the box. (one success)|was able to|One success → was able to.
My grandpa ___ fix anything. (general past)|could/was able to|General past ability → could.
___ you help me, please? (polite request)|Could|Polite request → Could you…?
Were you able to fix it? Yes, I ___. (short answer)|was|Yes, I was.
I want ___ speak English fluently. (want to)|to be able to|After want to → be able to.
She ___ finish the project yet. (present perfect, negative)|hasn't been able to/has not been able to|Present perfect → hasn't been able to.
I ___ believe my eyes! (negative)|couldn't/could not|I couldn't believe it.
The fire was big, but everyone ___ get out. (one success)|was able to|One success → was able to.
In two weeks, you ___ use these words. (future)|will be able to/'ll be able to|Future → will be able to.
Could you ___ the music? (hear)|hear|After could → base verb.
They ___ afford a house when they were young. (negative)|couldn't/could not/weren't able to/were not able to|Negative → couldn't.
Have you ___ talk to her? (present perfect)|been able to|Have you been able to…?
My sister ___ speak Japanese now. (now)|can|Now → can (no -s).
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"cout-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });
