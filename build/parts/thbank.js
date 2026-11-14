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
How many people ___ in your family? (question)|are there|there are,is there,have|How many + plural → are there?|How many + plural → are there?
Is there a pharmacy on this street? Yes, ___. (short answer)|there is|there's,it is,is there|Short answer: Yes, there is. (Not 'there's'.)|Respuesta corta: Yes, there is. (No 'there's'.)
Are there any questions? No, ___. (short answer)|there aren't/there are not|there isn't,they aren't,aren't there|Short answer: No, there aren't.|Respuesta corta: No, there aren't.
___ a problem? You look worried. (one)|Is there|Are there,There is,Has|One problem → Is there…?|Un problema → Is there…?
___ any tickets for tonight? (plural)|Are there|Is there,There are,Have|Tickets (plural) → Are there…?|Tickets (plural) → Are there…?
How much water ___ in the bottle? (uncountable)|is there|are there,there is,has|How much + uncountable → is there?|How much + no contable → is there?
Is there any coffee? No, ___. (short answer)|there isn't/there is not|there aren't,it isn't,isn't there|Short answer: No, there isn't.|Respuesta corta: No, there isn't.
___ a gym in your building? (one)|Is there|Are there,There is,Has|One gym → Is there…?|Un gimnasio → Is there…?
Are there many tourists in summer? Yes, ___. (short answer)|there are|there is,they are,are there|Short answer: Yes, there are.|Respuesta corta: Yes, there are.
___ any shops open on Sunday? (plural)|Are there|Is there,There are,Have|Shops (plural) → Are there…?|Shops (plural) → Are there…?
What ___ in the box? (one thing, unknown)|is there|are there,there is,has|What + is there?|What is there…? (¿Qué hay…?)
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
How many students ___ in your class last year? (past question)|were there|there were,was there,had|How many + plural, past → were there?|How many + plural, pasado → were there?
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
How many people ___ at the wedding next month? (future question)|will there be|there will be,will be there,are there will|Future question → will there be?|Pregunta futura → will there be?
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
___ only an old bakery and a small shop. (past)|There were|There was,There is,Had
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
How many people ___ in your family? (now, question)|are there|How many + plural → are there?
___ some water in the bottle. (now, uncountable)|There is/There's|Water → There is.
Ten years ago ___ a metro station here. (past, negative)|there wasn't/there was not|Past + one, negative → there wasn't.
Next year ___ more buses. (future, plural)|there will be/there'll be|Future → there will be (same for plural).
___ time to finish. Hurry! (now, negative)|There isn't/There is not|Time → There isn't.
Were there any messages? Yes, ___. (short answer)|there were|Yes, there were.
How much money ___ in your wallet? (now, question)|is there|How much → is there?
`.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {id:"tht-"+i, st:0, q:p[0], a:p[1].split("/").map(x=>x.trim()), o:[], why:p[2], es:""}; });
