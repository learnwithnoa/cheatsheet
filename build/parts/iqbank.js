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
