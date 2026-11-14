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
