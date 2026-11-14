/* ---------- Verb + -ing question bank (B1 friendly, Spanish help on every question) ----------
   same format as the other banks: sentence with ___ | right answer(s) / ... | 3 wrong options | why | Spanish hint */
const ING_STAGES=[
 {n:1, t:"Before, after, without + -ing", sub:"before leaving, after work", why:"After a preposition (before, after, without, by, instead of, for…), use verb + -ing.", es:"Después de una preposición (before, after, without, by…), va verbo + -ing: antes de salir → before leaving.", q:`
Always check your email before ___ it. (send)|sending|send,to send,sent
I usually have a coffee after ___ lunch. (have)|having|have,to have,had
She left without ___ goodbye. (say)|saying|say,to say,said|without + -ing.|without + -ing: sin decir → without saying.
Turn off the lights before ___ the office. (leave)|leaving|leave,to leave,leaveing|Drop the -e: leave → leaving.|Se quita la -e: leave → leaving.
After ___ the report, I sent it to my boss. (finish)|finishing|finish,to finish,finished
You can improve your English by ___ every day. (practice)|practicing/practising|practice,to practice,practiced|by + -ing = how you do something.|by + -ing = cómo lo haces: practicando.
Instead of ___ a taxi, we took the metro. (take)|taking|take,to take,took
Wash your hands before ___. (eat)|eating|eat,to eat,ate
He got the job without ___ any experience. (have)|having|have,to have,had
I'm sorry for ___ late. (be)|being|be,to be,was
Think carefully before ___ a decision. (make)|making|make,to make,makeing|Drop the -e: make → making.|Se quita la -e: make → making.
Read the contract before ___ it. (sign)|signing|sign,to sign,signed
Thanks for ___ me! (help)|helping|help,to help,helped
Before ___ to bed, I read a little. (go)|going|go,to go,went
After ___ in Chile for years, she speaks perfect Spanish. (live)|living|live,to live,lived
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
I can't stand ___ in long lines. (wait)|waiting|wait,to wait,waited
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
I recommend that you ___ early. (arrive)|arrive|arriving,to arrive,arrives|With "that + person", use the normal verb: I recommend that you arrive.|Con "that + persona", va el verbo normal: that you arrive.
She suggested that we ___ a taxi. (take)|take|taking,to take,took|suggest that + person + verb (no -ing, no to).|suggest that + persona + verbo (sin -ing, sin to).
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
I suggest that you ___ a break. (take)|take|suggest that + person + verb.
She avoided ___ the question. (answer)|answering|avoid + -ing.
Thanks for ___ me. (invite)|inviting|for + -ing.
I'm used to ___ in English. (work)|working|be used to + -ing.
It's worth ___ the movie. (see)|seeing|it's worth + -ing.
I'd like ___ a coffee. (order)|to order|would like + to + verb.
Instead of ___, he went home. (stay)|staying|instead of + -ing.
She managed ___ on time. (arrive)|to arrive|manage + to + verb.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"ingt-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });
