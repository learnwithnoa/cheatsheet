/* ---------- Vocabulary sets (drafted for Noa to review) ----------
   word | simple meaning | example with the word in [brackets] */
const VOC_SETS=[
 {id:"expr", ico:"💬", t:"Everyday expressions", sub:"feel like, no big deal, catch up…", w:`
feel like|to want to do something|I don't [feel like] cooking tonight.
make sense|to be easy to understand|Does this explanation [make sense]?
take your time|don't hurry|No rush, [take your time].
no big deal|not important or serious|Don't worry, it's [no big deal].
it depends|the answer changes in different situations|Do I like coffee? [It depends] on the day.
I'm in|I want to join|Pizza tonight? [I'm in]!
sounds good|I agree with that plan|Meet at 7? [Sounds good].
hang out|to spend free time with someone|Do you want to [hang out] this weekend?
catch up|to talk with someone after a long time|Let's get coffee and [catch up].
on my way|going there right now|I'm [on my way], see you in 10 minutes.
by the way|used to add a new topic|[By the way], did you see the game?
make up your mind|to decide|You need to [make up your mind] soon.
`},
 {id:"phrasal", ico:"🏃", t:"Everyday phrasal verbs", sub:"wake up, find out, give up…", w:`
wake up|to stop sleeping|I need to [wake up] early tomorrow.
get up|to get out of bed|On Sundays, I like to [get up] late.
turn on|to start a machine or a light|Can you [turn on] the light, please?
turn off|to stop a machine or a light|Don't forget to [turn off] the TV.
look for|to try to find something|I have to [look for] my keys again.
find out|to discover information|I want to [find out] what happened.
give up|to stop trying|Don't [give up]! You're almost there.
pick up|to go and get someone or something|Can you [pick up] the kids from school?
put on|to start wearing clothes|It's cold, so [put on] a jacket.
take off|to remove clothes or shoes|Please [take off] your shoes at the door.
run out of|to have no more of something|We always [run out of] coffee on Mondays.
figure out|to understand or solve something|I can't [figure out] this math problem.
`},
 {id:"travel", ico:"✈️", t:"Travel", sub:"luggage, layover, check in…", w:`
book|to reserve a room, a ticket or a table|I want to [book] a hotel near the beach.
luggage|the bags you take on a trip|My [luggage] was too heavy.
boarding pass|the ticket you show to get on a plane|Please have your [boarding pass] ready.
check in|to arrive and register at a hotel or an airport|We can [check in] at the hotel after 3 p.m.
delayed|later than planned|Our flight was [delayed] by two hours.
sightseeing|visiting famous places as a tourist|We spent the whole day [sightseeing].
souvenir|something you buy to remember a place|I bought a [souvenir] for my mom.
round trip|a trip to a place and back again|A [round trip] ticket is usually cheaper.
layover|a short stop between two flights|We had a three-hour [layover] in Lima.
get lost|to not know where you are|It's easy to [get lost] in a big city.
local|from the place you are visiting|We ate at a [local] restaurant.
itinerary|a plan of the places you will visit|Our [itinerary] includes three cities.
`},
 {id:"work", ico:"💼", t:"English at work", sub:"deadline, feedback, follow up…", w:`
deadline|the last day or time to finish something|The [deadline] for the report is Friday.
meeting|when people get together to talk about work|I have a [meeting] with my boss at 10.
schedule|a plan of when things will happen|Let me check my [schedule] for next week.
feedback|comments about how well you did something|My manager gave me great [feedback].
colleague|a person you work with|My [colleague] helped me with the project.
task|a piece of work you need to do|My first [task] today is answering emails.
follow up|to contact someone again about something|I'll [follow up] with the client tomorrow.
reach out|to contact someone to ask or offer something|Feel free to [reach out] if you have questions.
set up|to organize or prepare something|Can we [set up] a call for Thursday?
on track|going as planned|Don't worry, the project is [on track].
skill|something you are good at because you practiced it|Communication is an important [skill].
update|new information about something|Can you give me an [update] on the project?
`}
];
VOC_SETS.forEach(set=>{
  set.items=set.w.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); return {w:p[0], def:p[1], ex:p[2], i}; }); delete set.w;
  const n=set.items.length;
  set.qs=[];
  set.items.forEach((it,i)=>{
    const others=[1,2,3].map(k=>set.items[(i+k*3)%n]);
    set.qs.push({id:"v-"+set.id+"-"+i+"-m", st:0, mco:true, q:"“"+it.w+"” means ___.", a:[it.def], o:others.map(x=>x.def), why:"“"+it.w+"” = "+it.def+". Example: "+it.ex.replace(/[\[\]]/g,""), es:"", voc:set.id});
    const m=it.ex.match(/\[([^\]]+)\]/), ans=m?m[1]:it.w;
    set.qs.push({id:"v-"+set.id+"-"+i+"-c", st:0, q:it.ex.replace(/\[[^\]]+\]/,"___")+" (= "+it.def+")", a:[ans], o:others.map(x=>{ const mm=x.ex.match(/\[([^\]]+)\]/); return /^[A-Z]/.test(ans)? x.w.charAt(0).toUpperCase()+x.w.slice(1) : x.w; }), why:"“"+it.w+"” = "+it.def+".", es:"", voc:set.id});
  });
});
