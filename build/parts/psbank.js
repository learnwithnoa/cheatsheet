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
I ___ tired yesterday.|was|were,am,be
They ___ at the party last night.|were|was,are,been
You ___ right!|were|was,are,be|With "you", always use were, even for one person.|Con "you" siempre es were.
The movie ___ really boring.|was|were,is,been
We ___ very hungry after the hike.|were|was,are,be
My parents ___ in Chile last year.|were|was,are,be
It ___ cold this morning.|was|were,is,be
She ___ born in 1995.|was|were,is,has|"Be born" uses was / were: I was born, she was born.|"Nací" = I was born.
There ___ a lot of people at the concert.|were|was,are,had|There were + plural (people).|There were + plural.
There ___ a problem with my phone.|was|were,is,had|There was + singular (a problem).|There was + singular.
I ___ at home, I was at work. (not)|wasn't/was not|weren't,didn't,not was|The negative is wasn't (was not).|Negativo: wasn't = was not.
They ___ happy with the hotel. (not)|weren't/were not|wasn't,didn't,not were|The negative is weren't (were not).|Negativo: weren't = were not.
___ you at home last night?|Were|Was,Did,Are|In questions, put was / were first: Were you…?|En preguntas, was / were va primero.
___ the test difficult?|Was|Were,Did,Is|In questions, put was / were first: Was the test…?|En preguntas, was / were va primero.
Where ___ you yesterday?|were|was,did,are
Why ___ she so angry?|was|were,did,is
The restaurant ___ open on Monday. (not)|wasn't/was not|weren't,didn't,isn't
My friends and I ___ late for class.|were|was,are,did|"My friends and I" = we → were.|"My friends and I" = we → were.
How ___ your weekend?|was|were,did,is
The tickets ___ really expensive.|were|was,are,did
I ___ born in Santiago.|was|were,am,did|"Be born" uses was / were: I was born.|"Nací" = I was born.
___ your parents at the wedding?|Were|Was,Did,Are
He ___ at the meeting, he was sick. (not)|wasn't/was not|weren't,didn't,isn't
We ___ really excited about the trip.|were|was,are,did
Yesterday I ___ to the gym. (go)|went|was go,was went,goed|For actions, use the past verb (went), not was + verb.|Para acciones usa el verbo en pasado, no "was go".
She ___ very nervous before the interview.|was|were,did,is
The weather ___ perfect yesterday.|was|were,is,did
My sister and her husband ___ in Spain last month.|were|was,are,did|"My sister and her husband" = they → were.|"My sister and her husband" = they → were.
I ___ really happy with my results.|was|were,am,did
___ it expensive?|Was|Were,Did,Is|In questions, put was / were first: Was it…?|En preguntas, was / were va primero.
The shops ___ closed on Sunday.|were|was,are,did
We ___ late, we arrived on time. (not)|weren't/were not|wasn't,didn't,not were|The negative is weren't (were not).|Negativo: weren't = were not.
Who ___ at the door?|was|were,did,is
How ___ your exams?|were|was,did,are|Exams is plural → were.|Exams es plural → were.
___ your friends nice?|Were|Was,Did,Are|In questions, put was / were first: Were your friends…?|En preguntas, was / were va primero.
She ___ at work yesterday, she was sick. (not)|wasn't/was not|weren't,didn't,isn't|The negative is wasn't (was not).|Negativo: wasn't = was not.
There ___ two cats in the garden.|were|was,are,had|There were + plural (two cats).|There were + plural.
There ___ any milk in the fridge. (not)|wasn't/was not|weren't,didn't,isn't|Milk is uncountable → there wasn't.|Milk es incontable → wasn't.
What ___ the name of that restaurant?|was|were,did,is
I ___ so tired that I went to bed at 9.|was|were,did,am
The children ___ very quiet in class.|were|was,did,are
It ___ my birthday last Saturday.|was|were,did,is
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
I ___ my phone all day. (not / use)|didn't use/did not use|didn't used,not used,don't used
They ___ me about the party. (not / tell)|didn't tell/did not tell|didn't told,not told,don't told
She ___ well, so she stayed home. (not / feel)|didn't feel/did not feel|didn't felt,not felt,wasn't feel
I ___ the movie. It was boring. (not / enjoy)|didn't enjoy/did not enjoy|didn't enjoyed,not enjoyed,wasn't enjoy
She ___ to the gym this week. (not / go)|didn't go/did not go|didn't went,not went,wasn't go
We ___ dinner last night, we ordered sushi. (not / cook)|didn't cook/did not cook|didn't cooked,not cooked,wasn't cook
He ___ his keys anywhere. (not / find)|didn't find/did not find|didn't found,not found,wasn't find
They ___ the driving test. (not / pass)|didn't pass/did not pass|didn't passed,not passed,wasn't pass
I ___ you with your new haircut! (not / recognize)|didn't recognize/did not recognize|didn't recognized,not recognized,wasn't recognize
The phone ___ all day. (not / ring)|didn't ring/did not ring|didn't rang,not rang,wasn't ring
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
___ they like the food?|Did|Do,Were,Was
Did you ___ a good time? (have)|have|had,has,having|After Did, use the base verb: Did you have…?|Después de Did, el verbo va en forma base.
Where ___ last summer? (you / go)|did you go|did you went,you went,were you go
What ___ for dinner? (you / eat)|did you eat|did you ate,you ate,were you eat
When ___? (the movie / start)|did the movie start|did the movie started,the movie started,was the movie start
Who ___ at the party? (you / see)|did you see|did you saw,you saw,were you see
Why ___ early? (she / leave)|did she leave|did she left,she left,was she leave
How ___ there? (they / get)|did they get|did they got,they got,were they get
___ he call you back?|Did|Was,Does,Were
Did they ___ the game? (win)|win|won,wins,winned|After Did, use the base verb: Did they win…?|Después de Did, el verbo va en forma base.
What time ___ up? (you / wake)|did you wake|did you woke,you woke,were you wake
Did you ___ my message? (get)|get|got,gets,getting|After Did, use the base verb: Did you get…?|Después de Did, el verbo va en forma base.
___ you tired after the trip?|Were|Did,Was,Do|With be (tired, happy, at home…), don't use did: Were you tired?|Con "be" no se usa did: Were you…?
___ the hotel nice?|Was|Did,Were,Does|With be (nice, big, open…), don't use did: Was the hotel nice?|Con "be" no se usa did: Was it…?
What ___ you do last weekend?|did|do,were,was
Where ___ you born?|were|did,was,are|"Be born" uses was / were: Where were you born?|"¿Dónde naciste?" = Where were you born?
How long ___ there? (you / stay)|did you stay|did you stayed,you stayed,were you stay
Did she ___ you about her new job? (tell)|tell|told,tells,telling|After Did, use the base verb: Did she tell…?|Después de Did, el verbo va en forma base.
Fix it: "Did you saw the news?" → Did you ___ the news?|see|saw,seen,sees|After Did, use the base verb: Did you see…?|Después de Did, el verbo va en forma base.
Fix it: "Where you went?" → Where ___?|did you go|you went,did you went,went you
___ it rain yesterday?|Did|Was,Does,Were
What ___ she say?|did|was,does,were
How much ___? (it / cost)|did it cost|did it costed,it cost,was it cost
Which restaurant ___? (you / choose)|did you choose|did you chose,you chose,were you choose
___ you sleep well last night?|Did|Do,Were,Was
Did you ___ the movie? (like)|like|liked,likes,liking|After Did, use the base verb: Did you like…?|Después de Did, el verbo va en forma base.
What ___ you buy at the store?|did|do,were,was
Where ___ you meet your best friend?|did|were,do,was
Who ___ you go with?|did|were,do,was
Did they ___ on time? (arrive)|arrive|arrived,arrives,arriving|After Did, use the base verb: Did they arrive…?|Después de Did, el verbo va en forma base.
How ___ the trip?|was|did,were,is|With be (how was…), don't use did.|Con "be" no se usa did.
When ___? (you / arrive)|did you arrive|did you arrived,you arrived,were you arrive
What ___ for your birthday? (you / get)|did you get|did you got,you got,were you get
Why ___ his job? (he / quit)|did he quit|did he quitted,he quit,was he quit
How many people ___ to the party? (come)|came|did come,come,comes|"How many people" is the subject here, so no did: How many people came?|Si preguntas por quién hizo la acción, no usas did.
Did it ___ a lot in the mountains? (snow)|snow|snowed,snows,snowing|After Did, use the base verb: Did it snow…?|Después de Did, el verbo va en forma base.
___ you at the meeting yesterday?|Were|Did,Was,Do|With be (at the meeting), use Were you…?, not Did.|Con "be" no se usa did.
Fix it: "Did she went to class?" → Did she ___ to class?|go|went,goes,gone|After Did, use the base verb.|Después de Did, el verbo va en forma base.
Fix it: "What you did last night?" → What ___ last night?|did you do|you did,did you did,you do
Where ___ your vacation? (you / spend)|did you spend|did you spent,you spent,were you spend
`},
 {n:6, t:"Mix it up", sub:"everything together + fix the mistake", why:"", es:"", q:`
Last year I ___ to Peru. (travel)|traveled/travelled|travel,was travel,traveling|Regular verb: add -ed.|Verbo regular: agrega -ed.
She ___ the bus this morning. (not / take)|didn't take/did not take|didn't took,wasn't take,not took|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
___ you at work yesterday?|Were|Did,Was,Do|With be (at work), use Were you…?, not Did.|Con "be" no se usa did.
We visited the museum three days ___.|ago|before,last,past|Use "ago" after an amount of time: three days ago.|"three days ago" = hace tres días.
I ___ him last week. (meet)|met|meeted,meet,was meet|Meet is irregular: met.|Meet es irregular: met.
What did you do ___ weekend?|last|the last,past,ago|Say "last weekend", not "the last weekend".|"el fin de semana pasado" = last weekend.
They ___ very happy with the results.|were|was,did,are|They → were.|They → were.
He ___ his keys yesterday. (lose)|lost|losed,was lose,loosed|Lose is irregular: lost.|Lose es irregular: lost.
___ she like the gift?|Did|Was,Does,Is|Did + person + base verb: Did she like…?|Did + persona + verbo base.
I ___ busy, so I didn't call you.|was|were,did,am|I → was.|I → was.
We ___ dinner at home last night. (have)|had|haved,have,was have|Have is irregular: had.|Have es irregular: had.
Fix it: "I was go to the supermarket." → I ___ to the supermarket.|went|was go,was went,goed|For actions, use the past verb (went), not was + verb.|Para acciones usa el verbo en pasado, no "was go".
Fix it: "He didn't came to class." → He didn't ___ to class.|come|came,comed,comes|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Fix it: "Did you enjoyed the trip?" → Did you ___ the trip?|enjoy|enjoyed,enjoys,was enjoy|After Did, use the base verb.|Después de Did, el verbo va en forma base.
Fix it: "They was at the beach." → They ___ at the beach.|were|was,did,are|They → were.|They → were.
Fix it: "I studyed a lot." → I ___ a lot.|studied|studyed,study,studed|Consonant + y → -ied: studied.|Consonante + y → -ied.
I ___ English when I was a kid. (not / study)|didn't study/did not study|didn't studied,wasn't study,not studied|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
How ___ the concert?|was|did,were,is|The concert (it) → was.|The concert (it) → was.
She sent me a message ___ night.|last|yesterday,ago,the last|Say "last night" (but "yesterday morning").|anoche = last night.
I ___ you at the party! Where were you? (not / see)|didn't see/did not see|didn't saw,wasn't see,not saw|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Where ___ before Santiago? (you / live)|did you live|did you lived,you lived,were you live|Where + did + person + base verb.|Where + did + persona + verbo base.
It ___ a great day at the beach.|was|were,did,is|It → was.|It → was.
My sister ___ a new car last month. (buy)|bought|buyed,brought,was buy|Buy is irregular: bought (brought comes from bring).|bought = compró, brought = trajo.
___ they finish the project on time?|Did|Were,Was,Do|Did + person + base verb: Did they finish…?|Did + persona + verbo base.
We ___ to the radio while we cooked. (listen)|listened|listen,were listen,listenned|Regular verb: add -ed.|Verbo regular: agrega -ed.
I finished my homework ___ evening.|yesterday|last,ago,past|Say "yesterday evening", "yesterday morning" (but "last night").|ayer en la tarde = yesterday evening.
I ___ to the party because I was sick. (not / go)|didn't go/did not go|didn't went,wasn't go,not went|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
We ___ really tired after the trip.|were|was,did,are|We → were.|We → were.
She ___ me a gift for my birthday. (give)|gave|gived,given,was give|Give is irregular: gave.|Give es irregular: gave.
___ you enjoy the concert?|Did|Were,Was,Do|Did + person + base verb: Did you enjoy…?|Did + persona + verbo base.
They moved to Chile ten years ___.|ago|before,last,past|Use "ago" after an amount of time: ten years ago.|"ten years ago" = hace diez años.
He ___ English very fast. (learn)|learned/learnt|learn,was learn,learnd|Learned (US) and learnt (UK) are both correct.|learned y learnt están bien.
How ___ your first day at work?|was|did,were,is|Your first day (it) → was.|Your first day (it) → was.
Fix it: "Yesterday I go to the beach." → Yesterday I ___ to the beach.|went|go,goed,was go|With yesterday, use the past: went.|Con yesterday, usa el pasado: went.
Fix it: "We was at home." → We ___ at home.|were|was,did,are|We → were.|We → were.
Fix it: "Did they won the game?" → Did they ___ the game?|win|won,wins,winned|After Did, use the base verb.|Después de Did, el verbo va en forma base.
I ___ the email, so I didn't know about the meeting. (not / read)|didn't read/did not read|didn't readed,wasn't read,not read|After didn't, use the base verb.|Después de didn't, el verbo va en forma base.
Where ___ your parents born?|were|did,was,are|"Be born" uses was / were: Where were your parents born?|"¿Dónde nacieron?" = Where were they born?
We stayed at home ___ weekend because it rained.|last|the last,past,ago|Say "last weekend", not "the last weekend".|el fin de semana pasado = last weekend.
It ___ two hours to get there. (take)|took|taked,was take,takes|Take is irregular: took.|Take es irregular: took.
What ___ you think of the movie?|did|were,was,do|What + did + person + base verb.|What + did + persona + verbo base.
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
There ___ a lot of traffic this morning. (be)|was|Traffic is uncountable, so: there was.
Everybody ___ really happy at the party. (be)|was|Everybody is singular: everybody was.
The news ___ really surprising. (be)|was|News is uncountable: the news was.
My new jeans ___ too small, so I returned them. (be)|were|Jeans are plural: they were.
She ___ coffee to tea when she was younger. (prefer)|preferred|The stress is at the end (pre-FER), so double the r: preferred.
The accident ___ on a Monday night. (occur)|occurred|The stress is at the end (oc-CUR), so double the r: occurred.
He ___ when he saw the spider. (panic)|panicked|Verbs that end in -ic add -ked: panicked.
I ___ the bill last week. (pay)|paid|Pay is irregular: paid (not payed).
The police ___ the thief two blocks away. (catch)|caught|catch → caught.
They ___ for their rights for many years. (fight)|fought|fight → fought.
She ___ with the problem really well. (deal)|dealt|deal → dealt.
The price of the tickets ___ a lot last year. (rise)|rose|rise → rose (risen is the participle).
I'm sorry, I ___ to hurt you. (not / mean)|didn't mean/did not mean|After didn't, use the base verb: didn't mean.
She ___ the bus because she woke up late. (not / catch)|didn't catch/did not catch|After didn't, use the base verb: didn't catch.
Why ___ me back? (you / not / call)|didn't you call/did you not call|Negative questions: Why didn't you call me back?
How long ago ___ to Santiago? (you / move)|did you move|Did + person + base verb: How long ago did you move…?
What time ___ yesterday? (the store / close)|did the store close|Did + subject + base verb: did the store close.
I ___ my keys on the table, and now they're gone! (put)|put|Put doesn't change: put – put – put.
That shirt ___ a lot of money. (cost)|cost|Cost doesn't change: cost – cost – cost.
The baby ___ at 3 a.m. and didn't go back to sleep. (wake up)|woke up|wake up → woke up.
We ___ the whole night talking. (spend)|spent|spend → spent.
She ___ me she was tired. (tell)|told|tell → told.
He ___ his phone into the pool by accident. (drop)|dropped|Short verbs like drop double the last letter: dropped.
The kids ___ in the garden all afternoon. (lie)|lay|lie (= acostarse) → lay. Tricky!
I ___ English for three years when I was at school. (study)|studied|Consonant + y → -ied: studied.
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"pst-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });
