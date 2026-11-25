/* ---------- "📖 Learn it" lessons for the other grammar modules (Nov 2026). Same shape as lesson_pp.js. ---------- */
Object.assign(window.PS_LESSONS = window.PS_LESSONS || {}, {

prs: {
  name: { en: "Present simple", es: "Present simple" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "The present simple is for things that are <b>generally true</b>: habits, routines, facts, likes and opinions. Not for what’s happening right now.",
           es: "El present simple es para lo que es <b>verdad en general</b>: hábitos, rutinas, hechos, gustos y opiniones. No para lo que está pasando justo ahora." } },
    { h: { en: "How to make it", es: "Cómo se forma" }, stage: 1,
      p: { en: "Use the base verb. With <b>he, she, it</b>, add <b>-s</b>.", es: "Se usa el verbo base. Con <b>he, she, it</b>, se agrega <b>-s</b>." },
      table: [
        ["+", "I / you / we / they <b>work</b>", "He / she / it <b>works</b>"],
        ["−", "I <b>don’t</b> work.", "She <b>doesn’t</b> work."],
        ["?", "<b>Do</b> you work? Yes, I do.", "<b>Does</b> he work? No, he doesn’t."]
      ],
      note: { en: "Spelling (Stage 3): add <b>-es</b> after s, sh, ch, x and o (watch<b>es</b>, go<b>es</b>). Consonant + y → <b>-ies</b> (stud<b>ies</b>). Have → <b>has</b>.",
              es: "Ortografía (etapa 3): agrega <b>-es</b> después de s, sh, ch, x y o (watch<b>es</b>, go<b>es</b>). Consonante + y → <b>-ies</b> (stud<b>ies</b>). Have → <b>has</b>." } },
    { h: { en: "1. Habits and routines", es: "1. Hábitos y rutinas" }, stage: 2,
      p: { en: "Often with <b>always, usually, often, sometimes, never</b>. They go before the main verb, but after <b>be</b>.",
           es: "Muchas veces con <b>always, usually, often, sometimes, never</b>. Van antes del verbo principal, pero después de <b>be</b>." },
      ex: [["I usually get up at seven.", "Normalmente me levanto a las siete."], ["She never drinks coffee.", "Ella nunca toma café."], ["He’s always late.", "Él siempre llega tarde."]] },
    { h: { en: "2. Facts", es: "2. Hechos" },
      ex: [["Water boils at 100 degrees.", "El agua hierve a 100 grados."], ["Chile has a very long coast.", "Chile tiene una costa muy larga."]] },
    { h: { en: "3. Likes, opinions and states", es: "3. Gustos, opiniones y estados" },
      p: { en: "Verbs like <b>like, love, want, know, understand, believe</b> almost always use the present simple.",
           es: "Verbos como <b>like, love, want, know, understand, believe</b> casi siempre van en present simple." },
      ex: [["I love this song.", "Me encanta esta canción."], ["Do you understand?", "¿Entiendes?"]] },
    { h: { en: "Negatives and questions", es: "Negativos y preguntas" }, stage: 4,
      p: { en: "Use <b>don’t / doesn’t</b> and <b>do / does</b> + the base verb. The -s goes on does, so the verb has no -s.",
           es: "Usa <b>don’t / doesn’t</b> y <b>do / does</b> + el verbo base. La -s va en does, así que el verbo va sin -s." },
      ex: [["She doesn’t like spicy food.", "A ella no le gusta la comida picante."], ["Where does he live?", "¿Dónde vive él?"]] },
    { h: { en: "Present simple or present continuous?", es: "¿Present simple o present continuous?" }, key: true,
      p: { en: "<b>Usually / in general</b> → present simple. <b>Right now / these days</b> → present continuous (am / is / are + -ing).",
           es: "<b>Normalmente / en general</b> → present simple. <b>Ahora mismo / estos días</b> → present continuous (am / is / are + -ing)." },
      ex: [["I work from home. (usually)", "Trabajo desde la casa. (normalmente)"], ["I’m working from home today. (right now)", "Hoy estoy trabajando desde la casa. (ahora)"]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["She work in a bank.", "She works in a bank.", { en: "he / she / it → add -s.", es: "he / she / it → agrega -s." }],
        ["He doesn’t works.", "He doesn’t work.", { en: "After doesn’t, no -s.", es: "Después de doesn’t, sin -s." }],
        ["Does she likes it?", "Does she like it?", { en: "After does, no -s.", es: "Después de does, sin -s." }],
        ["I’m work at a bank.", "I work at a bank.", { en: "Don’t add am / is / are to the present simple.", es: "No agregues am / is / are al present simple." }],
        ["I am agree.", "I agree.", { en: "Agree is a verb, not an adjective.", es: "Agree es un verbo, no un adjetivo." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["He ___ (watch) TV every night.", "watches", { en: "he + -es after ch.", es: "he + -es después de ch." }],
        ["___ you speak Spanish?", "Do", { en: "you → do.", es: "you → do." }],
        ["She ___ (not / like) coffee.", "doesn’t like", { en: "she → doesn’t + base verb.", es: "she → doesn’t + verbo base." }]
      ] }
  ],
  adv: [
    { h: { en: "Timetables and schedules (future)", es: "Horarios (futuro)" },
      p: { en: "For timetables and fixed schedules, the present simple can talk about the future.", es: "Para horarios fijos, el present simple puede hablar del futuro." },
      ex: [["The train leaves at 7:45 tomorrow.", "El tren sale mañana a las 7:45."], ["The course starts on Monday.", "El curso empieza el lunes."]] },
    { h: { en: "After when, if, as soon as (future)", es: "Después de when, if, as soon as (futuro)" },
      p: { en: "In future time clauses, English uses the present simple, not will.", es: "En oraciones de tiempo futuro, el inglés usa present simple, no will." },
      ex: [["I’ll call you when I get home.", "Te llamo cuando llegue a la casa."], ["If it rains, we’ll stay in.", "Si llueve, nos quedamos en la casa."]] },
    { h: { en: "State verbs with two meanings", es: "Verbos de estado con dos significados" },
      p: { en: "Some verbs are states in one meaning (simple only) and actions in another (they can take -ing): <b>think, have, taste, see</b>.",
           es: "Algunos verbos son estados en un significado (solo forma simple) y acciones en otro (pueden ir con -ing): <b>think, have, taste, see</b>." },
      ex: [["I think it’s a good idea. (opinion)", "Creo que es buena idea. (opinión)"], ["I’m thinking about moving. (considering)", "Estoy pensando en mudarme. (evaluando)"], ["She has two cats. / She’s having lunch.", "Tiene dos gatos. / Está almorzando."], ["This soup tastes amazing.", "Esta sopa está buenísima."]] },
    { h: { en: "Emphatic do", es: "Do enfático" },
      p: { en: "Add <b>do / does</b> (stressed) to insist or contrast.", es: "Agrega <b>do / does</b> (con énfasis) para insistir o contrastar." },
      ex: [["I don’t eat meat, but I do like fish.", "No como carne, pero el pescado sí me gusta."], ["She does know the answer!", "¡Ella sí sabe la respuesta!"]] },
    { h: { en: "Telling stories, instructions and headlines", es: "Relatos, instrucciones y titulares" },
      p: { en: "Live commentary, step-by-step instructions and news headlines use the present simple to sound direct.",
           es: "Los relatos en vivo, las instrucciones paso a paso y los titulares usan present simple para sonar directos." },
      ex: [["He takes the ball, runs past two players… and scores!", "Toma la pelota, pasa a dos jugadores… ¡y hace el gol!"], ["You open the app and tap the plus button.", "Abres la app y tocas el botón más."], ["Here comes the bus!", "¡Ahí viene la micro!"]] }
  ]
},

ps: {
  name: { en: "Past simple", es: "Past simple" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "The past simple is for <b>finished</b> actions and situations at a <b>finished time</b> in the past: yesterday, last week, in 2019, two years ago.",
           es: "El past simple es para acciones y situaciones <b>terminadas</b> en un <b>momento terminado</b> del pasado: yesterday, last week, in 2019, two years ago." } },
    { h: { en: "Regular verbs: + -ed", es: "Verbos regulares: + -ed" }, stage: 1,
      p: { en: "Add <b>-ed</b>. It’s the same for every person (I, you, she, they…).", es: "Agrega <b>-ed</b>. Es igual para todas las personas (I, you, she, they…)." },
      note: { en: "Spelling: live → liv<b>ed</b>, study → stud<b>ied</b>, stop → sto<b>pped</b> (short word ending in consonant-vowel-consonant: double it).",
              es: "Ortografía: live → liv<b>ed</b>, study → stud<b>ied</b>, stop → sto<b>pped</b> (palabra corta que termina en consonante-vocal-consonante: se duplica)." },
      ex: [["I worked late yesterday.", "Ayer trabajé hasta tarde."], ["We watched a movie last night.", "Anoche vimos una película."]] },
    { h: { en: "Irregular verbs", es: "Verbos irregulares" }, stage: 2,
      p: { en: "Many common verbs have their own past form. Learn them in groups: go → <b>went</b>, see → <b>saw</b>, have → <b>had</b>, make → <b>made</b>, buy → <b>bought</b>, take → <b>took</b>, get → <b>got</b>.",
           es: "Muchos verbos comunes tienen su propia forma en pasado. Apréndelos en grupos: go → <b>went</b>, see → <b>saw</b>, have → <b>had</b>, make → <b>made</b>, buy → <b>bought</b>, take → <b>took</b>, get → <b>got</b>." },
      ex: [["She went to Peru in 2019.", "Ella fue a Perú en 2019."], ["I bought a new phone last week.", "La semana pasada me compré un teléfono nuevo."]] },
    { h: { en: "Was and were", es: "Was y were" }, stage: 3,
      table: [
        ["+", "I / he / she / it <b>was</b> tired.", "You / we / they <b>were</b> tired."],
        ["−", "It <b>wasn’t</b> easy.", "They <b>weren’t</b> home."],
        ["?", "<b>Was</b> it fun?", "<b>Were</b> you there?"]
      ] },
    { h: { en: "Negatives and questions", es: "Negativos y preguntas" }, stage: 4,
      p: { en: "Use <b>didn’t</b> and <b>did</b> + the <b>base verb</b>. The past is already in did, so the verb goes back to its base form.",
           es: "Usa <b>didn’t</b> y <b>did</b> + el <b>verbo base</b>. El pasado ya está en did, así que el verbo vuelve a su forma base." },
      table: [
        ["−", "I <b>didn’t go</b> to the party.", "She <b>didn’t see</b> it."],
        ["?", "<b>Did</b> you <b>go</b>? Yes, I did.", "Where <b>did</b> she <b>go</b>?"]
      ] },
    { h: { en: "Telling a story", es: "Contar una historia" }, stage: 7,
      p: { en: "Use a chain of past simple verbs for things that happened one after another.", es: "Usa una cadena de verbos en past simple para cosas que pasaron una después de otra." },
      ex: [["I woke up, had a coffee and left.", "Me desperté, me tomé un café y salí."]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I didn’t went.", "I didn’t go.", { en: "After didn’t, use the base verb.", es: "Después de didn’t, verbo base." }],
        ["Did you saw it?", "Did you see it?", { en: "After did, use the base verb.", es: "Después de did, verbo base." }],
        ["Yesterday I go to the beach.", "Yesterday I went to the beach.", { en: "Finished time → past form.", es: "Momento terminado → forma en pasado." }],
        ["I goed home.", "I went home.", { en: "Go is irregular: went.", es: "Go es irregular: went." }],
        ["I was go to work.", "I went to work.", { en: "Don’t add was to a past action.", es: "No agregues was a una acción en pasado." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["We ___ (meet) in 2020.", "met", { en: "Meet is irregular.", es: "Meet es irregular." }],
        ["___ you call her yesterday?", "Did", { en: "Past question → did.", es: "Pregunta en pasado → did." }],
        ["They ___ (not / be) at home.", "weren’t", { en: "they → were.", es: "they → were." }]
      ] }
  ],
  adv: [
    { h: { en: "used to and would (past habits)", es: "used to y would (hábitos pasados)" },
      p: { en: "<b>used to</b> = past habits and states that aren’t true now. <b>would</b> = only past habits (actions), not states. Question: <b>Did you use to…?</b>",
           es: "<b>used to</b> = hábitos y estados del pasado que ya no son así. <b>would</b> = solo hábitos (acciones), no estados. Pregunta: <b>Did you use to…?</b>" },
      ex: [["I used to live in Concepción.", "Antes vivía en Concepción."], ["Every summer we would go to the beach.", "Todos los veranos íbamos a la playa."], ["Did you use to play football?", "¿Jugabas fútbol antes?"]] },
    { h: { en: "Background and interruptions", es: "Fondo e interrupciones" },
      p: { en: "Past continuous for the action in progress, past simple for what interrupted it.", es: "Past continuous para la acción en progreso, past simple para lo que la interrumpió." },
      ex: [["I was cooking when the lights went out.", "Estaba cocinando cuando se cortó la luz."]] },
    { h: { en: "The earlier past", es: "El pasado anterior" },
      p: { en: "<b>had + participle</b> (past perfect) for something that happened before another past moment.", es: "<b>had + participio</b> (past perfect) para algo que pasó antes de otro momento pasado." },
      ex: [["By the time we arrived, the movie had started.", "Cuando llegamos, la película ya había empezado."]] },
    { h: { en: "The ‘unreal’ past", es: "El pasado ‘irreal’" },
      p: { en: "After <b>if, wish, it’s time, I’d rather, suppose</b>, the past simple talks about the present, but something imaginary.",
           es: "Después de <b>if, wish, it’s time, I’d rather, suppose</b>, el past simple habla del presente, pero de algo imaginario." },
      ex: [["If I had more time, I’d travel more.", "Si tuviera más tiempo, viajaría más."], ["I wish I knew the answer.", "Ojalá supiera la respuesta."], ["It’s time we went home.", "Ya es hora de irnos a la casa."], ["I’d rather you didn’t tell anyone.", "Prefiero que no le cuentes a nadie."]] },
    { h: { en: "The polite past", es: "El pasado amable" },
      p: { en: "Past forms make requests softer and more polite.", es: "Las formas en pasado suavizan las peticiones y suenan más amables." },
      ex: [["I was wondering if you could help me.", "Me preguntaba si me podrías ayudar."], ["I wanted to ask you something.", "Quería preguntarte algo."]] }
  ]
},

th: {
  name: { en: "There is / there are", es: "There is / there are" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "<b>There is / there are</b> says that something exists or is in a place. It’s the English for <b>hay</b>.",
           es: "<b>There is / there are</b> dice que algo existe o está en un lugar. Es el <b>hay</b> del inglés." } },
    { h: { en: "How to make it", es: "Cómo se forma" }, stage: 1,
      p: { en: "<b>There is</b> (there’s) + one thing or something uncountable. <b>There are</b> + plural.",
           es: "<b>There is</b> (there’s) + una cosa o algo incontable. <b>There are</b> + plural." },
      table: [
        ["+", "<b>There’s</b> a café near here.", "<b>There are</b> two parks."],
        ["−", "<b>There isn’t</b> any milk.", "<b>There aren’t</b> any chairs."],
        ["?", "<b>Is there</b> a bank? Yes, there is.", "<b>Are there</b> any buses? No, there aren’t."]
      ],
      note: { en: "Stages 2 and 3 practice negatives and questions. Also: <b>There’s no…</b> / <b>There are no…</b>, and <b>How many… are there?</b>",
              es: "Las etapas 2 y 3 practican negativos y preguntas. También: <b>There’s no…</b> / <b>There are no…</b>, y <b>How many… are there?</b>" } },
    { h: { en: "Past and future", es: "Pasado y futuro" }, stage: 4,
      ex: [["There was a storm last night.", "Anoche hubo una tormenta."], ["There were a lot of people.", "Había mucha gente."], ["There will be a test on Friday.", "El viernes va a haber una prueba."], ["There’s going to be a party.", "Va a haber una fiesta."]] },
    { h: { en: "There is or it is?", es: "¿There is o it is?" }, key: true,
      p: { en: "Use <b>there is</b> to introduce something new. Then use <b>it / they</b> to talk about it.",
           es: "Usa <b>there is</b> para presentar algo nuevo. Después usa <b>it / they</b> para hablar de eso." },
      ex: [["There’s a café near my house. It’s really good.", "Hay un café cerca de mi casa. Es muy bueno."]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["Have a lot of people here.", "There are a lot of people here.", { en: "‘Hay’ → there is / there are, not have.", es: "‘Hay’ → there is / there are, no have." }],
        ["It has a park near my house.", "There’s a park near my house.", { en: "To say something exists, use there is.", es: "Para decir que algo existe, usa there is." }],
        ["There is two cars.", "There are two cars.", { en: "Plural → there are.", es: "Plural → there are." }],
        ["There are much traffic.", "There’s a lot of traffic.", { en: "Traffic is uncountable → there is.", es: "Traffic es incontable → there is." }],
        ["Is there a bank? Yes, is.", "Yes, there is.", { en: "Short answers need there.", es: "Las respuestas cortas llevan there." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["___ any eggs in the fridge?", "Are there", { en: "Plural question → are there.", es: "Pregunta en plural → are there." }],
        ["There ___ a lot of noise last night.", "was", { en: "Noise is uncountable, past → was.", es: "Noise es incontable, pasado → was." }],
        ["There ___ (not) a cloud in the sky.", "isn’t", { en: "One thing → isn’t.", es: "Una cosa → isn’t." }]
      ] }
  ],
  adv: [
    { h: { en: "There + modal verbs", es: "There + verbos modales" },
      ex: [["There must be a mistake.", "Tiene que haber un error."], ["There might be a delay.", "Puede que haya un retraso."], ["There can’t be more than ten people.", "No puede haber más de diez personas."], ["There must have been a problem.", "Debe haber habido un problema."]] },
    { h: { en: "seems to be, bound to be, used to be", es: "seems to be, bound to be, used to be" },
      ex: [["There seems to be a problem with the Wi-Fi.", "Parece que hay un problema con el Wi-Fi."], ["There’s bound to be traffic at this time.", "A esta hora seguro que hay tráfico."], ["There used to be a cinema here.", "Antes había un cine aquí."]] },
    { h: { en: "With the present perfect", es: "Con el present perfect" },
      p: { en: "<b>There has been / there have been</b> for news and changes up to now.", es: "<b>There has been / there have been</b> para noticias y cambios hasta ahora." },
      ex: [["There’s been an accident on the highway.", "Hubo un accidente en la carretera."], ["There have been a lot of changes.", "Ha habido muchos cambios."]] },
    { h: { en: "Fixed expressions", es: "Expresiones fijas" },
      ex: [["There’s no point worrying about it.", "No tiene sentido preocuparse."], ["There’s no way I’m going out in this rain.", "Ni loco salgo con esta lluvia."], ["Is there any chance you could help me?", "¿Habrá alguna posibilidad de que me ayudes?"]] },
    { h: { en: "Informal speech", es: "Habla informal" },
      p: { en: "In fast, informal speech, people often say <b>there’s</b> with a plural (“there’s two problems”). You’ll hear it, but write <b>there are</b>.",
           es: "En el habla rápida e informal, mucha gente dice <b>there’s</b> con plural (“there’s two problems”). Lo vas a escuchar, pero escribe <b>there are</b>." } }
  ]
},

cou: {
  name: { en: "Could vs was able to", es: "Could vs was able to" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "To talk about <b>ability</b>: <b>can</b> (now), <b>could</b> (in general, in the past) and <b>be able to</b> (any tense).",
           es: "Para hablar de <b>habilidad</b>: <b>can</b> (ahora), <b>could</b> (en general, en el pasado) y <b>be able to</b> (cualquier tiempo)." } },
    { h: { en: "How to make it", es: "Cómo se forma" }, stage: 1,
      p: { en: "<b>can / could</b> + base verb (no <i>to</i>, no <i>-s</i>). <b>be able to</b> + base verb, and you change <i>be</i> for the tense.",
           es: "<b>can / could</b> + verbo base (sin <i>to</i>, sin <i>-s</i>). <b>be able to</b> + verbo base, y cambias <i>be</i> según el tiempo." },
      table: [
        [{ en: "Now", es: "Ahora" }, "I <b>can</b> swim.", "I’m <b>able to</b> swim."],
        [{ en: "Past", es: "Pasado" }, "I <b>could</b> swim when I was five.", "I <b>was able to</b> swim."],
        [{ en: "Future", es: "Futuro" }, { en: "<i>can has no future form</i>", es: "<i>can no tiene futuro</i>" }, { en: "I’ll <b>be able to</b> swim. (never “will can”)", es: "I’ll <b>be able to</b> swim. (nunca “will can”)" }]
      ] },
    { h: { en: "could: ability in general", es: "could: habilidad en general" }, stage: 2,
      p: { en: "Use <b>could</b> for something you were able to do <b>in general</b>, over a period of time.", es: "Usa <b>could</b> para algo que podías hacer <b>en general</b>, durante un tiempo." },
      ex: [["When I was a kid, I could run really fast.", "Cuando era niño, podía correr muy rápido."]] },
    { h: { en: "was able to: one specific moment", es: "was able to: un momento puntual" }, stage: 3, key: true,
      p: { en: "For <b>one specific success</b> in the past, use <b>was able to</b> or <b>managed to</b>, not could. In the negative, <b>couldn’t</b> works for both.",
           es: "Para <b>un logro puntual</b> en el pasado, usa <b>was able to</b> o <b>managed to</b>, no could. En negativo, <b>couldn’t</b> sirve para los dos." },
      ex: [["The fire was big, but everyone was able to escape.", "El incendio era grande, pero todos lograron escapar."], ["I couldn’t find my keys this morning.", "Esta mañana no pude encontrar mis llaves."]] },
    { h: { en: "Questions and requests", es: "Preguntas y peticiones" }, stage: 5,
      ex: [["Could you help me, please?", "¿Me podrías ayudar, por favor?"], ["Were you able to fix it?", "¿Pudiste arreglarlo?"]] },
    { h: { en: "Other tenses", es: "Otros tiempos" }, stage: 6,
      ex: [["I haven’t been able to sleep this week.", "Esta semana no he podido dormir."], ["You’ll be able to see it from the hotel.", "Lo vas a poder ver desde el hotel."]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I will can come.", "I’ll be able to come.", { en: "Future → will be able to.", es: "Futuro → will be able to." }],
        ["I can to swim.", "I can swim.", { en: "No to after can.", es: "Sin to después de can." }],
        ["She cans drive.", "She can drive.", { en: "No -s on can.", es: "Can no lleva -s." }],
        ["Yesterday I could finish the report.", "Yesterday I was able to / managed to finish the report.", { en: "One specific success → was able to / managed to.", es: "Un logro puntual → was able to / managed to." }],
        ["I don’t can.", "I can’t.", { en: "Negative: can’t / cannot.", es: "Negativo: can’t / cannot." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["My grandma ___ speak four languages when she was young.", "could", { en: "General past ability.", es: "Habilidad general en el pasado." }],
        ["After three hours, we ___ to fix the car.", "were able / managed", { en: "One specific success.", es: "Un logro puntual." }],
        ["Next year I ___ drive.", "’ll be able to", { en: "Future → will be able to.", es: "Futuro → will be able to." }]
      ] }
  ],
  adv: [
    { h: { en: "could have, couldn’t have, can’t have", es: "could have, couldn’t have, can’t have" },
      p: { en: "<b>could have + participle</b> = it was possible but didn’t happen (or maybe it happened). <b>can’t / couldn’t have</b> = I’m sure it didn’t happen.",
           es: "<b>could have + participio</b> = era posible pero no pasó (o tal vez pasó). <b>can’t / couldn’t have</b> = estoy seguro de que no pasó." },
      ex: [["You could have called me!", "¡Me podrías haber llamado!"], ["He can’t have stolen it. He was with me.", "No puede haberlo robado. Estaba conmigo."], ["They might have gotten lost.", "Puede que se hayan perdido."]] },
    { h: { en: "managed to, succeeded in", es: "managed to, succeeded in" },
      ex: [["I managed to finish on time.", "Logré terminar a tiempo."], ["She succeeded in getting the job.", "Logró conseguir el trabajo."]] },
    { h: { en: "to be able to / being able to", es: "to be able to / being able to" },
      p: { en: "After verbs like want, need, love → <b>to be able to</b>. As a subject or after a preposition → <b>being able to</b>.",
           es: "Después de verbos como want, need, love → <b>to be able to</b>. Como sujeto o después de preposición → <b>being able to</b>." },
      ex: [["I’d love to be able to speak without thinking.", "Me encantaría poder hablar sin pensar."], ["Being able to work from home is great.", "Poder trabajar desde la casa es genial."]] },
    { h: { en: "be able to after other modals", es: "be able to después de otros modales" },
      ex: [["You should be able to see the mountains.", "Deberías poder ver la cordillera."], ["I might be able to help.", "Puede que pueda ayudar."]] },
    { h: { en: "could for possibility", es: "could para posibilidad" },
      p: { en: "<b>could</b> also means <b>maybe</b>, about now or the future.", es: "<b>could</b> también significa <b>tal vez</b>, sobre el ahora o el futuro." },
      ex: [["It could rain later.", "Podría llover más tarde."], ["Could you possibly close the window?", "¿Podrías cerrar la ventana, por favor?"]] }
  ]
},

ing: {
  name: { en: "Verb + -ing", es: "Verbo + -ing" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "The <b>-ing</b> form can work like a noun: after prepositions, after some verbs, and as the subject. Spanish often uses the infinitive here, English uses -ing.",
           es: "La forma <b>-ing</b> puede funcionar como sustantivo: después de preposiciones, después de algunos verbos y como sujeto. En español aquí solemos usar el infinitivo; en inglés, -ing." } },
    { h: { en: "1. After prepositions", es: "1. Después de preposiciones" }, stage: 1,
      p: { en: "After <b>before, after, without, by, about, in, at, of</b>… always -ing.", es: "Después de <b>before, after, without, by, about, in, at, of</b>… siempre -ing." },
      ex: [["Wash your hands before eating.", "Lávate las manos antes de comer."], ["She left without saying goodbye.", "Se fue sin despedirse."]] },
    { h: { en: "2. Verbs that take -ing", es: "2. Verbos que van con -ing" }, stage: 2,
      p: { en: "<b>enjoy, finish, mind, avoid, keep, miss, practice, consider, can’t stand</b> + -ing. Also <b>suggest, recommend</b> (Stage 3).",
           es: "<b>enjoy, finish, mind, avoid, keep, miss, practice, consider, can’t stand</b> + -ing. También <b>suggest, recommend</b> (etapa 3)." },
      ex: [["I enjoy cooking.", "Disfruto cocinar."], ["Do you mind waiting?", "¿Te molesta esperar?"], ["I suggest taking the metro.", "Sugiero tomar el metro."]] },
    { h: { en: "3. Adjective + preposition", es: "3. Adjetivo + preposición" }, stage: 4,
      p: { en: "<b>good at, interested in, tired of, afraid of</b>, and <b>look forward to</b> (here <i>to</i> is a preposition).",
           es: "<b>good at, interested in, tired of, afraid of</b>, y <b>look forward to</b> (aquí <i>to</i> es preposición)." },
      ex: [["She’s good at drawing.", "Ella es buena para dibujar."], ["I look forward to seeing you.", "Tengo ganas de verte."]] },
    { h: { en: "4. As the subject", es: "4. Como sujeto" },
      ex: [["Swimming is good exercise.", "Nadar es buen ejercicio."]] },
    { h: { en: "-ing or to?", es: "¿-ing o to?" }, stage: 5, key: true,
      p: { en: "<b>want, need, decide, hope, plan, would like</b> + to. <b>enjoy, finish, avoid, mind</b> + -ing. <b>like, love, hate, start, begin</b> can take both.",
           es: "<b>want, need, decide, hope, plan, would like</b> + to. <b>enjoy, finish, avoid, mind</b> + -ing. <b>like, love, hate, start, begin</b> aceptan las dos." },
      ex: [["I want to learn French.", "Quiero aprender francés."], ["I finished studying at ten.", "Terminé de estudiar a las diez."]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I enjoy to dance.", "I enjoy dancing.", { en: "enjoy + -ing.", es: "enjoy + -ing." }],
        ["I look forward to see you.", "I look forward to seeing you.", { en: "look forward to + -ing.", es: "look forward to + -ing." }],
        ["Before to go, call me.", "Before going, call me.", { en: "Preposition + -ing.", es: "Preposición + -ing." }],
        ["I suggest you to go.", "I suggest going. / I suggest (that) you go.", { en: "suggest + -ing, or suggest that…", es: "suggest + -ing, o suggest that…" }],
        ["I’m interested in learn English.", "I’m interested in learning English.", { en: "in + -ing.", es: "in + -ing." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["I’m tired of ___ (wait).", "waiting", { en: "of + -ing.", es: "of + -ing." }],
        ["She decided ___ (quit) her job.", "to quit", { en: "decide + to.", es: "decide + to." }],
        ["Have you finished ___ (eat)?", "eating", { en: "finish + -ing.", es: "finish + -ing." }]
      ] }
  ],
  adv: [
    { h: { en: "Verbs that change meaning", es: "Verbos que cambian de significado" },
      p: { en: "<b>remember / forget / regret</b> + -ing = about the past. + to = about something to do. <b>stop</b> + -ing = quit; + to = stop in order to. <b>try</b> + -ing = experiment; + to = make an effort.",
           es: "<b>remember / forget / regret</b> + -ing = sobre el pasado. + to = sobre algo por hacer. <b>stop</b> + -ing = dejar de; + to = parar para. <b>try</b> + -ing = probar; + to = esforzarse." },
      ex: [["I remember meeting him. / Remember to call him.", "Me acuerdo de haberlo conocido. / Acuérdate de llamarlo."], ["He stopped smoking. / He stopped to rest.", "Dejó de fumar. / Paró para descansar."], ["Try restarting it. / I tried to open it, but I couldn’t.", "Prueba reiniciarlo. / Intenté abrirlo, pero no pude."]] },
    { h: { en: "be used to / get used to + -ing", es: "be used to / get used to + -ing" },
      p: { en: "<b>be used to + -ing</b> = be accustomed to. <b>get used to + -ing</b> = become accustomed. Don’t mix it up with <b>used to + verb</b> (past habit).",
           es: "<b>be used to + -ing</b> = estar acostumbrado. <b>get used to + -ing</b> = acostumbrarse. No lo confundas con <b>used to + verbo</b> (hábito pasado)." },
      ex: [["I’m used to getting up early.", "Estoy acostumbrado a levantarme temprano."], ["You’ll get used to driving on the left.", "Te vas a acostumbrar a manejar por la izquierda."]] },
    { h: { en: "Fixed -ing expressions", es: "Expresiones fijas con -ing" },
      ex: [["It’s worth visiting.", "Vale la pena visitarlo."], ["I can’t help laughing.", "No puedo evitar reírme."], ["I have trouble remembering names.", "Me cuesta recordar nombres."], ["There’s no point arguing.", "No tiene sentido discutir."]] },
    { h: { en: "Perfect and passive -ing", es: "-ing perfecto y pasivo" },
      ex: [["After having finished, I went home.", "Después de haber terminado, me fui a la casa."], ["She hates being told what to do.", "Odia que le digan qué hacer."], ["My car needs washing.", "Mi auto necesita una lavada."], ["Do you mind me asking?", "¿Te molesta que te pregunte?"]] }
  ]
},

ed: {
  name: { en: "-ed endings", es: "Terminaciones -ed" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "The <b>-ed</b> ending has <b>3 sounds</b>: /t/, /d/ and /ɪd/. Only <b>/ɪd/</b> adds an extra syllable. Saying every -ed as “ed” is the most common mistake for Spanish speakers.",
           es: "La terminación <b>-ed</b> tiene <b>3 sonidos</b>: /t/, /d/ y /ɪd/. Solo <b>/ɪd/</b> agrega una sílaba extra. Pronunciar todas las -ed como “ed” es el error más común de quienes hablamos español." } },
    { h: { en: "/ɪd/: an extra syllable", es: "/ɪd/: una sílaba extra" }, stage: 1,
      p: { en: "Only when the verb ends in a <b>t</b> or <b>d</b> sound.", es: "Solo cuando el verbo termina en sonido <b>t</b> o <b>d</b>." },
      ex: [["wanted (WAN-tid)", "quiso / quería"], ["needed (NEE-did)", "necesitó"], ["decided (de-SY-did)", "decidió"]] },
    { h: { en: "/t/: a quiet sound", es: "/t/: un sonido sordo" }, stage: 2,
      p: { en: "When the verb ends in a quiet sound: <b>p, k, f, s, sh, ch, x</b>. Touch your throat: no vibration. No extra syllable.",
           es: "Cuando el verbo termina en un sonido sordo: <b>p, k, f, s, sh, ch, x</b>. Toca tu garganta: no vibra. Sin sílaba extra." },
      ex: [["worked (workt)", "trabajó"], ["helped (helpt)", "ayudó"], ["watched (wotcht)", "vio / miró"]] },
    { h: { en: "/d/: a voiced sound", es: "/d/: un sonido sonoro" }, stage: 3,
      p: { en: "After vowels and voiced sounds (b, g, l, m, n, r, v, z…). Your throat vibrates. No extra syllable.",
           es: "Después de vocales y sonidos sonoros (b, g, l, m, n, r, v, z…). La garganta vibra. Sin sílaba extra." },
      ex: [["played (playd)", "jugó"], ["called (cawld)", "llamó"], ["opened (O-pend)", "abrió"]] },
    { h: { en: "Listen to the sound, not the spelling", es: "Escucha el sonido, no la ortografía" }, stage: 5, key: true,
      p: { en: "What matters is the <b>last sound</b>: fixed → /t/ (x sounds “ks”), closed → /d/ (s sounds “z”), laughed → /t/ (gh sounds “f”).",
           es: "Lo que importa es el <b>último sonido</b>: fixed → /t/ (la x suena “ks”), closed → /d/ (la s suena “z”), laughed → /t/ (gh suena “f”)." },
      ex: [["fixed (fikst)", "arregló"], ["closed (cloazd)", "cerró"], ["laughed (laft)", "se rio"]] },
    { h: { en: "Feelings: -ed or -ing?", es: "Sentimientos: ¿-ed o -ing?" }, stage: 7,
      p: { en: "<b>-ed</b> = how you feel. <b>-ing</b> = what causes the feeling.", es: "<b>-ed</b> = cómo te sientes. <b>-ing</b> = lo que causa ese sentimiento." },
      ex: [["I’m bored. This movie is boring.", "Estoy aburrido. Esta película es aburrida."], ["She was surprised. The news was surprising.", "Ella estaba sorprendida. La noticia era sorprendente."]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["work-ed (2 syllables)", "workt (1 syllable)", { en: "Only t / d verbs get the extra syllable.", es: "Solo los verbos en t / d tienen sílaba extra." }],
        ["look-ed", "lookt", { en: "k is quiet → /t/.", es: "k es sordo → /t/." }],
        ["plan-ned", "pland", { en: "n is voiced → /d/, no extra syllable.", es: "n es sonoro → /d/, sin sílaba extra." }],
        ["I’m boring in this class.", "I’m bored in this class.", { en: "Your feeling → -ed. (I’m boring = I make people bored!)", es: "Tu sentimiento → -ed. (I’m boring = ¡aburro a los demás!)" }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["“started”: extra syllable?", "Yes: STAR-tid", { en: "Ends in t.", es: "Termina en t." }],
        ["“stopped”: which sound?", "/t/ (stopt)", { en: "p is quiet.", es: "p es sordo." }],
        ["The trip was really ___ (tire).", "tiring", { en: "What causes the feeling → -ing.", es: "Lo que causa el sentimiento → -ing." }]
      ] }
  ],
  adv: [
    { h: { en: "Adjectives that break the rule", es: "Adjetivos que rompen la regla" },
      p: { en: "Some -ed <b>adjectives</b> keep the extra syllable even though the rule says they shouldn’t.", es: "Algunos <b>adjetivos</b> en -ed mantienen la sílaba extra, aunque la regla diga que no." },
      ex: [["naked (NAY-kid)", "desnudo"], ["wicked (WI-kid)", "malvado"], ["crooked (KRU-kid)", "chueco"], ["rugged (RU-gid)", "robusto, agreste"], ["my beloved dog (bi-LUV-id)", "mi querido perro"]] },
    { h: { en: "Same word, two pronunciations", es: "Misma palabra, dos pronunciaciones" },
      ex: [["I learned a lot. (lernd)", "Aprendí mucho."], ["a learned professor (LER-nid)", "un profesor muy culto"], ["He aged fast. (ayjd)", "Envejeció rápido."], ["an aged parent (AY-jid)", "un padre anciano"]] },
    { h: { en: "used to, supposed to", es: "used to, supposed to" },
      p: { en: "The -ed joins the <b>to</b> and sounds like a soft t: “yoost-tuh”, “suh-POHS-tuh”.", es: "La -ed se une al <b>to</b> y suena como una t suave: “yoost-tuh”, “suh-POHS-tuh”." },
      ex: [["I used to swim every day.", "Antes nadaba todos los días."], ["We’re supposed to be there at 8.", "Se supone que tenemos que estar ahí a las 8."]] },
    { h: { en: "Linking in fast speech", es: "Enlace en el habla rápida" },
      p: { en: "Before a vowel, the -ed links to the next word (“worked a lot” → “work-ta-lot”). Before a consonant, it’s often very soft, almost silent, but keep a tiny stop.",
           es: "Antes de una vocal, la -ed se une a la palabra siguiente (“worked a lot” → “work-ta-lot”). Antes de una consonante, suele ser muy suave, casi muda, pero mantén una pequeña pausa." },
      ex: [["I worked all day.", "Trabajé todo el día."], ["I watched TV last night.", "Anoche vi tele."]] }
  ]
}
,
iq: {
  name: { en: "Indirect questions", es: "Preguntas indirectas" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "An <b>indirect question</b> is a question inside another sentence: <i>Do you know…? Can you tell me…? I wonder…</i> It sounds more polite and professional. The trick: the question inside goes back to <b>normal order</b> (subject + verb).",
           es: "Una <b>pregunta indirecta</b> es una pregunta dentro de otra oración: <i>Do you know…? Can you tell me…? I wonder…</i> Suena más educada y profesional. El truco: la pregunta de adentro vuelve al <b>orden normal</b> (sujeto + verbo)." } },
    { h: { en: "1. Back to normal order", es: "1. Vuelve al orden normal" }, stage: 1, key: true,
      p: { en: "With <b>be, can, will, have</b>: just put the subject first.", es: "Con <b>be, can, will, have</b>: solo pon el sujeto primero." },
      table: [
        ["be", "Where <b>is the station</b>?", "Do you know where <b>the station is</b>?"],
        ["be", "What time <b>is it</b>?", "Can you tell me what time <b>it is</b>?"],
        ["can", "Where <b>can I</b> park?", "Could you tell me where <b>I can</b> park?"],
        ["have", "What <b>has he</b> done?", "Do you know what <b>he has</b> done?"]
      ] },
    { h: { en: "2. do / does / did disappear", es: "2. do / does / did desaparecen" }, stage: 2, key: true,
      p: { en: "Take out <b>do, does, did</b>. The tense moves onto the verb: <i>lives, starts, went</i>.", es: "Saca <b>do, does, did</b>. El tiempo pasa al verbo: <i>lives, starts, went</i>." },
      ex: [["Where does she live? → Do you know where she lives?", "¿Dónde vive? → ¿Sabes dónde vive?"], ["Where did he go? → I don’t know where he went.", "¿Adónde fue? → No sé adónde fue."]] },
    { h: { en: "3. Yes/no questions: if or whether", es: "3. Preguntas de sí o no: if o whether" }, stage: 3,
      p: { en: "No question word? Add <b>if</b> (or <b>whether</b>) and use normal order.", es: "¿No hay palabra interrogativa? Agrega <b>if</b> (o <b>whether</b>) y usa orden normal." },
      ex: [["Is it open? → Do you know if it’s open?", "¿Está abierto? → ¿Sabes si está abierto?"], ["Did she call? → I wonder whether she called.", "¿Llamó? → Me pregunto si llamó."]] },
    { h: { en: "4. Polite openers", es: "4. Frases para empezar" }, stage: 4,
      p: { en: "<i>Do you know… · Can / Could you tell me… · Would you mind telling me… · Do you have any idea… · I wonder… · I’d like to know… · I’m not sure… · I can’t remember…</i> If the opener is a statement (<i>I wonder…</i>), end with a <b>period</b>, not a question mark.",
           es: "<i>Do you know… · Can / Could you tell me… · Would you mind telling me… · Do you have any idea… · I wonder… · I’d like to know… · I’m not sure… · I can’t remember…</i> Si la frase es una afirmación (<i>I wonder…</i>), termina con <b>punto</b>, no con signo de pregunta." },
      ex: [["I wonder where he is.", "Me pregunto dónde está."], ["Would you mind telling me how old you are?", "¿Te molestaría decirme cuántos años tienes?"]] },
    { h: { en: "5. The who / what trap", es: "5. La trampa de who / what" }, stage: 5, key: true,
      p: { en: "When <b>who</b> or <b>what</b> is the subject (the one doing the action), the order is already normal, so <b>nothing changes</b>.",
           es: "Cuando <b>who</b> o <b>what</b> es el sujeto (el que hace la acción), el orden ya es normal, así que <b>nada cambia</b>." },
      table: [
        [{ en: "subject", es: "sujeto" }, "Who called?", "Do you know <b>who called</b>?"],
        [{ en: "object", es: "objeto" }, "Who did you call?", "Do you know <b>who you called</b>?"],
        [{ en: "subject", es: "sujeto" }, "What happened?", "Tell me <b>what happened</b>."],
        [{ en: "object", es: "objeto" }, "What did she buy?", "Tell me <b>what she bought</b>."]
      ] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["Do you know when are you leaving?", "Do you know when you are leaving?", { en: "Normal order inside: you are.", es: "Adentro, orden normal: you are." }],
        ["Can you tell me what time is it?", "Can you tell me what time it is?", { en: "Normal order: it is.", es: "Orden normal: it is." }],
        ["Do you know where does she live?", "Do you know where she lives?", { en: "No does, and the -s goes on the verb.", es: "Sin does, y la -s va en el verbo." }],
        ["I don’t know where did he go.", "I don’t know where he went.", { en: "No did: the verb goes to the past.", es: "Sin did: el verbo pasa a pasado." }],
        ["Do you know is it open?", "Do you know if it’s open?", { en: "Yes/no question → if.", es: "Pregunta de sí o no → if." }],
        ["I wonder where is he?", "I wonder where he is.", { en: "Normal order, and a period after I wonder.", es: "Orden normal, y punto después de I wonder." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["Do you know when ___ leaving? (you / be)", "you are", { en: "Normal order: you are.", es: "Orden normal: you are." }],
        ["Can you tell me where ___? (he / work)", "he works", { en: "No does: he works.", es: "Sin does: he works." }],
        ["I’m not sure ___ she’s coming.", "if / whether", { en: "Yes/no question → if or whether.", es: "Pregunta de sí o no → if o whether." }]
      ] }
  ],
  adv: [
    { h: { en: "Reported questions", es: "Preguntas reportadas" },
      p: { en: "When you report a question later, use normal order and move the tense back: <b>is → was, will → would, can → could, did / have done → had done</b>.",
           es: "Cuando cuentas una pregunta después, usa orden normal y retrocede el tiempo: <b>is → was, will → would, can → could, did / have done → had done</b>." },
      ex: [["“Where are you going?” → She asked me where I was going.", "“¿Adónde vas?” → Me preguntó adónde iba."], ["“Can you help me?” → He asked if I could help him.", "“¿Me puedes ayudar?” → Me preguntó si lo podía ayudar."]] },
    { h: { en: "Question word + to", es: "Palabra interrogativa + to" },
      p: { en: "When the subject is obvious, use <b>question word + to + verb</b>.", es: "Cuando el sujeto es obvio, usa <b>palabra interrogativa + to + verbo</b>." },
      ex: [["I don’t know what to say.", "No sé qué decir."], ["Can you show me how to use this?", "¿Me puedes mostrar cómo usar esto?"]] },
    { h: { en: "whether, not if", es: "whether, no if" },
      p: { en: "Use <b>whether</b> (not if) before <b>to + verb</b>, right after a preposition, with <b>or not</b> right after it, and at the start of a sentence.",
           es: "Usa <b>whether</b> (no if) antes de <b>to + verbo</b>, justo después de una preposición, con <b>or not</b> justo después, y al comienzo de una oración." },
      ex: [["I can’t decide whether to go.", "No puedo decidir si ir."], ["Whether he comes or not doesn’t matter.", "Si viene o no, da lo mismo."]] },
    { h: { en: "What… is why…", es: "What… is why…" },
      p: { en: "A strong way to focus on something: <b>What I don’t understand is why…</b> The second part also uses normal order.",
           es: "Una forma fuerte de destacar algo: <b>What I don’t understand is why…</b> La segunda parte también usa orden normal." },
      ex: [["What I don’t understand is why she left.", "Lo que no entiendo es por qué se fue."], ["The question is whether we have enough time.", "La pregunta es si tenemos suficiente tiempo."]] }
  ]
}
,
int: {
  name: { en: "Job interviews", es: "Entrevistas de trabajo" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "Every interview is different, so this module doesn’t tell you <b>what</b> to say about your job. It trains the <b>English</b> you need for any interview: the right tenses for your career, strong verbs and numbers for your results, stories, hypothetical questions, phrases to buy time, and polite questions at the end. Finish with the <b>🎤 Practice interview</b>, where Hibi checks your English.",
           es: "Cada entrevista es distinta, así que este módulo no te dice <b>qué</b> decir de tu trabajo. Entrena el <b>inglés</b> que necesitas en cualquier entrevista: los tiempos verbales para tu carrera, verbos fuertes y números para tus resultados, historias, preguntas hipotéticas, frases para ganar tiempo y preguntas educadas al final. Termina con la <b>🎤 Entrevista de práctica</b>, donde Hibi revisa tu inglés." } },
    { h: { en: "1. Tell me about yourself", es: "1. Háblame de ti" }, stage: 1, key: true,
      p: { en: "Your job now → <b>present simple</b>. These days → <b>present continuous</b>. From the past until now → <b>present perfect</b> (+ for / since).", es: "Tu trabajo actual → <b>presente simple</b>. Estos días → <b>presente continuo</b>. Desde el pasado hasta ahora → <b>present perfect</b> (+ for / since)." },
      ex: [["I work for a logistics company.", "Trabajo en una empresa de logística."], ["I’m currently doing a Master’s degree.", "Actualmente estoy haciendo un magíster."], ["I’ve been working in marketing for five years.", "Llevo cinco años trabajando en marketing."]] },
    { h: { en: "2. Your experience and results", es: "2. Tu experiencia y resultados" }, stage: 2, key: true,
      p: { en: "A finished job → <b>past simple</b> with strong verbs (<i>led, managed, created, improved</i>). Numbers: increase / reduce <b>by</b> 20%.", es: "Un trabajo terminado → <b>pasado simple</b> con verbos fuertes (<i>led, managed, created, improved</i>). Números: increase / reduce <b>by</b> 20%." },
      ex: [["In my last job, I led a team of eight people.", "En mi último trabajo, lideré un equipo de ocho personas."], ["We increased sales by 20%.", "Aumentamos las ventas en un 20%."]] },
    { h: { en: "3. Telling a work story", es: "3. Contar una historia de trabajo" }, stage: 3, key: true,
      p: { en: "Situation → what you did → result. <b>At the time</b>… <b>While I was</b> + -ing… <b>First</b>… <b>After</b>… <b>As a result</b>…", es: "Situación → qué hiciste → resultado. <b>At the time</b>… <b>While I was</b> + -ing… <b>First</b>… <b>After</b>… <b>As a result</b>…" },
      ex: [["At the time, I was working as a sales assistant.", "En ese momento, trabajaba como asistente de ventas."], ["As a result, we kept the client.", "Como resultado, mantuvimos al cliente."]] },
    { h: { en: "4. Strengths and weaknesses", es: "4. Fortalezas y debilidades" }, stage: 4,
      p: { en: "<b>good at</b> + -ing · work well <b>under</b> pressure · describe me <b>as</b> · I <b>tend to</b> + verb · I’m <b>detail-oriented</b> (not “detailist”).", es: "<b>good at</b> + -ing · trabajar bien <b>bajo</b> presión · describe me <b>as</b> · I <b>tend to</b> + verbo · I’m <b>detail-oriented</b> (no “detailist”)." },
      ex: [["I’m good at solving problems.", "Soy bueno resolviendo problemas."], ["Sometimes I find it hard to delegate, but I’m learning.", "A veces me cuesta delegar, pero estoy aprendiendo."]] },
    { h: { en: "5. “What would you do if…?”", es: "5. “¿Qué harías si…?”" }, stage: 5,
      p: { en: "<b>If + past simple, … would + verb.</b> With be: <i>If I were you…</i>", es: "<b>If + pasado simple, … would + verbo.</b> Con be: <i>If I were you…</i>" },
      ex: [["If a client was angry, I would listen first.", "Si un cliente estuviera enojado, primero lo escucharía."]] },
    { h: { en: "6. Goals and the future", es: "6. Metas y futuro" }, stage: 6,
      p: { en: "<b>I’d like to</b> / <b>I’m hoping to</b> / <b>I’m planning to</b> + verb · <b>I see myself</b> + -ing · looking forward <b>to</b> + -ing.", es: "<b>I’d like to</b> / <b>I’m hoping to</b> / <b>I’m planning to</b> + verbo · <b>I see myself</b> + -ing · looking forward <b>to</b> + -ing." },
      ex: [["In five years, I’d like to lead a team.", "En cinco años, me gustaría liderar un equipo."]] },
    { h: { en: "7. Buying time", es: "7. Ganar tiempo" }, stage: 7,
      p: { en: "<i>That’s a great question. Let me think for a second.</i> · <i>Could you rephrase that?</i> · <i>Just to make sure I understand, you mean…?</i>", es: "<i>That’s a great question. Let me think for a second.</i> · <i>Could you rephrase that?</i> · <i>Just to make sure I understand, you mean…?</i>" } },
    { h: { en: "8. Your questions for them", es: "8. Tus preguntas para ellos" }, stage: 8,
      p: { en: "Indirect questions keep <b>normal word order</b>: <i>Could you tell me what a typical day <b>looks</b> like?</i> (not “does look”).", es: "Las preguntas indirectas mantienen el <b>orden normal</b>: <i>Could you tell me what a typical day <b>looks</b> like?</i> (no “does look”)." } },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I have 30 years.", "I’m 30.", { en: "Age uses be.", es: "La edad va con be." }],
        ["I have five years working in sales.", "I have five years of experience in sales.", { en: "years OF experience.", es: "years OF experience." }],
        ["I’m very detailist.", "I’m very detail-oriented.", { en: "“detailist” isn’t English.", es: "“detailist” no existe en inglés." }],
        ["I work since 2019 here.", "I’ve worked here since 2019.", { en: "since → present perfect.", es: "since → present perfect." }],
        ["Could you tell me what does the job involve?", "Could you tell me what the job involves?", { en: "Indirect question → normal order.", es: "Pregunta indirecta → orden normal." }]
      ] }
  ]
}
,
fut: {
  name: { en: "Talking about the future", es: "Hablar del futuro" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "English has no single “future tense”. You choose the form by <b>when you decided</b> and <b>how sure</b> you are: <i>will</i>, <i>going to</i>, the <i>present continuous</i> or the <i>present simple</i>. Often two forms are fine; this module teaches the most natural one for each situation.",
           es: "El inglés no tiene un solo “tiempo futuro”. Eliges la forma según <b>cuándo lo decidiste</b> y <b>qué tan seguro</b> estás: <i>will</i>, <i>going to</i>, el <i>presente continuo</i> o el <i>presente simple</i>. Muchas veces dos formas sirven; este módulo enseña la más natural para cada situación." } },
    { h: { en: "1. will: decide now, offer, promise", es: "1. will: decides ahora, ofreces, prometes" }, stage: 1, key: true,
      p: { en: "You decide <b>in the moment</b>, offer help, or promise: <b>will / ’ll + verb</b>. Negative: <b>won’t</b>.", es: "Decides <b>en el momento</b>, ofreces ayuda o prometes: <b>will / ’ll + verbo</b>. Negativo: <b>won’t</b>." },
      ex: [["The phone’s ringing! I’ll get it.", "¡Suena el teléfono! Yo contesto."], ["I’ll have the chicken, please.", "Para mí el pollo, por favor."], ["I won’t tell anyone, I promise.", "No le voy a contar a nadie, te lo prometo."]] },
    { h: { en: "2. going to: plans", es: "2. going to: planes" }, stage: 2, key: true,
      p: { en: "You <b>already decided</b> before speaking: <b>am / is / are going to + verb</b>.", es: "<b>Ya lo decidiste</b> antes de hablar: <b>am / is / are going to + verbo</b>." },
      ex: [["I’m going to study Japanese next year.", "Voy a estudiar japonés el próximo año."], ["What are you going to do this weekend?", "¿Qué vas a hacer este fin de semana?"]] },
    { h: { en: "3. Predictions: going to or will", es: "3. Predicciones: going to o will" }, stage: 3, key: true,
      table: [
        [{ en: "you can see it", es: "lo ves venir" }, "Look at those clouds!", "It’s <b>going to</b> rain."],
        [{ en: "you think it", es: "lo crees" }, "I think… / I’m sure… / maybe…", "Chile <b>will</b> win."]
      ] },
    { h: { en: "4. Present continuous: arrangements", es: "4. Presente continuo: cosas acordadas" }, stage: 4,
      p: { en: "Already arranged with other people, often with a time or place: <b>am / is / are + -ing</b>.", es: "Ya acordado con otras personas, muchas veces con hora o lugar: <b>am / is / are + -ing</b>." },
      ex: [["I’m meeting Ana for lunch tomorrow.", "Mañana almuerzo con Ana."], ["What are you doing tonight?", "¿Qué vas a hacer esta noche?"]] },
    { h: { en: "5. Present simple: timetables", es: "5. Presente simple: horarios" }, stage: 5,
      p: { en: "Trains, flights, classes, shows, opening hours: the <b>present simple</b>, even for tomorrow.", es: "Trenes, vuelos, clases, funciones, horarios de atención: el <b>presente simple</b>, aunque sea mañana." },
      ex: [["The train leaves at 7:15 tomorrow.", "El tren sale mañana a las 7:15."], ["What time does the movie start?", "¿A qué hora empieza la película?"]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["I will to call you.", "I’ll call you.", { en: "No to after will.", es: "Sin to después de will." }],
        ["I going to study.", "I’m going to study.", { en: "Don’t forget am / is / are.", es: "No olvides am / is / are." }],
        ["I’m going to studying.", "I’m going to study.", { en: "going to + base verb, no -ing.", es: "going to + verbo base, sin -ing." }],
        ["Tomorrow I meet Ana for lunch.", "Tomorrow I’m meeting Ana for lunch.", { en: "Plans with people → present continuous.", es: "Planes con otras personas → presente continuo." }],
        ["I’ll call you when I will arrive.", "I’ll call you when I arrive.", { en: "After when / as soon as: present simple.", es: "Después de when / as soon as: presente simple." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["That bag looks heavy. ___ help you. (I / will)", "I’ll", { en: "An offer → will.", es: "Una oferta → will." }],
        ["Look at the sky! It’s ___ rain.", "going to", { en: "You can see it → going to.", es: "Lo ves venir → going to." }],
        ["The bus ___ at 8 tomorrow. (leave)", "leaves", { en: "A timetable → present simple.", es: "Un horario → presente simple." }]
      ] }
  ],
  adv: [
    { h: { en: "Future continuous: will be + -ing", es: "Futuro continuo: will be + -ing" },
      p: { en: "Something <b>in progress</b> at a moment in the future. Also a polite way to ask about plans: <i>Will you be using the car tonight?</i>",
           es: "Algo <b>en progreso</b> en un momento del futuro. También es una forma educada de preguntar por planes: <i>Will you be using the car tonight?</i>" },
      ex: [["This time tomorrow, I’ll be lying on a beach.", "Mañana a esta hora voy a estar tirado en la playa."], ["Don’t call at 8. We’ll be having dinner.", "No llames a las 8. Vamos a estar comiendo."]] },
    { h: { en: "Future perfect: will have + past participle", es: "Futuro perfecto: will have + participio" },
      p: { en: "Something <b>finished before</b> a future moment (often with <b>by</b>). For how long: <b>will have been + -ing</b>.",
           es: "Algo <b>terminado antes</b> de un momento futuro (muchas veces con <b>by</b>). Para cuánto tiempo: <b>will have been + -ing</b>." },
      ex: [["By the time you arrive, we’ll have finished the cake.", "Cuando llegues, ya nos vamos a haber comido la torta."], ["By June, she’ll have been studying English for two years.", "En junio va a cumplir dos años estudiando inglés."]] },
    { h: { en: "about to, due to, bound to", es: "about to, due to, bound to" },
      p: { en: "<b>be about to</b> = very, very soon · <b>be due</b> = scheduled · <b>be bound to</b> = almost certain.",
           es: "<b>be about to</b> = muy, muy pronto · <b>be due</b> = programado · <b>be bound to</b> = casi seguro." },
      ex: [["Quick, the train is about to leave!", "¡Rápido, el tren está por salir!"], ["She’s so talented, she’s bound to succeed.", "Tiene tanto talento que seguro le va a ir bien."]] },
    { h: { en: "when, as soon as + present", es: "when, as soon as + presente" },
      p: { en: "In a time clause about the future, use the <b>present simple</b>, not will.", es: "En una frase de tiempo sobre el futuro, usa el <b>presente simple</b>, no will." },
      ex: [["I’ll text you when I arrive.", "Te escribo cuando llegue."], ["As soon as she gets here, we’ll start.", "Apenas llegue, empezamos."]] }
  ]
}
,
wo: {
  name: { en: "Word order and object pronouns", es: "Orden de las palabras y pronombres de objeto" },
  basics: [
    { h: { en: "What it is", es: "Qué es" },
      p: { en: "In Spanish you can move words around (<i>lo vi ayer</i>, <i>es importante</i>). English is strict: <b>subject + verb + object</b>, always a subject, and pronouns like <b>him, her, them</b> go <b>after</b> the verb.",
           es: "En español puedes mover las palabras (<i>lo vi ayer</i>, <i>es importante</i>). El inglés es estricto: <b>sujeto + verbo + objeto</b>, siempre con sujeto, y los pronombres como <b>him, her, them</b> van <b>después</b> del verbo." } },
    { h: { en: "1. Subject + verb + object", es: "1. Sujeto + verbo + objeto" }, stage: 1, key: true,
      p: { en: "The subject goes first, then the verb, then the object. <b>Very much</b> and <b>well</b> go after the object.", es: "Primero el sujeto, después el verbo y después el objeto. <b>Very much</b> y <b>well</b> van después del objeto." },
      ex: [["I drink coffee every morning.", "Tomo café todas las mañanas."], ["I like my job very much.", "Me gusta mucho mi trabajo."], ["She speaks English well.", "Ella habla bien inglés."]] },
    { h: { en: "2. Never drop the subject: it and there", es: "2. Nunca omitas el sujeto: it y there" }, stage: 2, key: true,
      p: { en: "Weather, time, distance, opinions: <b>it</b>. Something exists (hay): <b>there is / there are</b>.", es: "Clima, hora, distancia, opiniones: <b>it</b>. Algo existe (hay): <b>there is / there are</b>." },
      ex: [["It’s raining.", "Está lloviendo."], ["It’s important to practice.", "Es importante practicar."], ["There’s a café near my house.", "Hay un café cerca de mi casa."]] },
    { h: { en: "3. Object pronouns", es: "3. Pronombres de objeto" }, stage: 3, key: true,
      table: [
        [{ en: "subject", es: "sujeto" }, "I · you · he · she · it · we · they", "<b>I</b> see Ana."],
        [{ en: "object", es: "objeto" }, "me · you · him · her · it · us · them", "Ana sees <b>me</b>."]
      ] },
    { h: { en: "4. Where the pronoun goes", es: "4. Dónde va el pronombre" }, stage: 4,
      p: { en: "<b>After</b> the verb, never before it like in Spanish (<i>lo vi</i>).", es: "<b>Después</b> del verbo, nunca antes como en español (<i>lo vi</i>)." },
      ex: [["I saw him yesterday.", "Lo vi ayer."], ["Can you help me?", "¿Me puedes ayudar?"], ["Where did you buy it?", "¿Dónde lo compraste?"]] },
    { h: { en: "5. Two objects", es: "5. Dos objetos" }, stage: 5,
      p: { en: "<b>give + person + thing</b> (give her the book) or <b>give + thing + to + person</b> (give it to her). With <b>it / them</b>, use <b>to</b>. <b>explain</b> and <b>say</b> always need <b>to</b>.", es: "<b>give + persona + cosa</b> (give her the book) o <b>give + cosa + to + persona</b> (give it to her). Con <b>it / them</b>, usa <b>to</b>. <b>explain</b> y <b>say</b> siempre llevan <b>to</b>." },
      ex: [["I sent her an email.", "Le mandé un correo."], ["Give it to me, please.", "Dámelo, por favor."], ["Can you explain it to me?", "¿Me lo puedes explicar?"]] },
    { h: { en: "Common mistakes", es: "Errores comunes" },
      mis: [
        ["Is raining.", "It’s raining.", { en: "English always needs a subject.", es: "En inglés siempre necesitas un sujeto." }],
        ["I him saw.", "I saw him.", { en: "The pronoun goes after the verb.", es: "El pronombre va después del verbo." }],
        ["I like very much my job.", "I like my job very much.", { en: "very much goes after the object.", es: "very much va después del objeto." }],
        ["Has a café near my house.", "There’s a café near my house.", { en: "hay = there is / there are.", es: "hay = there is / there are." }],
        ["Can you explain me this?", "Can you explain this to me?", { en: "explain something to someone.", es: "explain algo to alguien." }]
      ] },
    { h: { en: "Quick check", es: "Prueba rápida" }, quiz: [
        ["___ cold today. (it / be)", "It’s", { en: "Never drop the subject.", es: "Nunca omitas el sujeto." }],
        ["Pedro? I saw ___ yesterday. (he)", "him", { en: "he → him.", es: "he → him." }],
        ["That’s mine! Give it ___ me.", "to", { en: "give it to me.", es: "give it to me." }]
      ] }
  ],
  adv: [
    { h: { en: "Phrasal verbs: the pronoun goes in the middle", es: "Phrasal verbs: el pronombre va al medio" },
      p: { en: "With a noun, both are fine: <i>turn off the light / turn the light off</i>. With a pronoun, only the middle: <b>turn it off</b> (not <i>turn off it</i>).",
           es: "Con un sustantivo sirven los dos: <i>turn off the light / turn the light off</i>. Con un pronombre, solo al medio: <b>turn it off</b> (no <i>turn off it</i>)." },
      ex: [["It’s too loud. Can you turn it down?", "Está muy fuerte. ¿Lo puedes bajar?"], ["I don’t know this word. I’ll look it up.", "No conozco esta palabra. La voy a buscar."]] },
    { h: { en: "it as an empty object", es: "it como objeto vacío" },
      p: { en: "<b>find it + adjective + to…</b>, <b>make it clear that…</b>, <b>I’d appreciate it if…</b>", es: "<b>find it + adjetivo + to…</b>, <b>make it clear that…</b>, <b>I’d appreciate it if…</b>" },
      ex: [["I find it hard to wake up early.", "Me cuesta levantarme temprano."], ["I’d appreciate it if you could call me back.", "Te agradecería si me pudieras llamar de vuelta."]] },
    { h: { en: "Prepositions at the end of questions", es: "Preposiciones al final de las preguntas" },
      p: { en: "In everyday English the preposition goes at the end: <b>Who did you go with?</b> <b>What are you talking about?</b>", es: "En el inglés de todos los días la preposición va al final: <b>Who did you go with?</b> <b>What are you talking about?</b>" },
      ex: [["Who did you go to the party with?", "¿Con quién fuiste a la fiesta?"], ["Where are you from?", "¿De dónde eres?"]] },
    { h: { en: "Never, rarely, not only + question order", es: "Never, rarely, not only + orden de pregunta" },
      p: { en: "At the start of a sentence (formal or for emphasis), these words use question order.", es: "Al comienzo de una oración (formal o para dar énfasis), estas palabras usan el orden de pregunta." },
      ex: [["Never have I seen such a beautiful place.", "Nunca he visto un lugar tan lindo."], ["Rarely do I drink coffee after 6.", "Casi nunca tomo café después de las 6."]] }
  ]
}
});
