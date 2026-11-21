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
sounds good|I agree with that plan|Meet at 7? [Sounds good/~Sounds great].
hang out|to spend free time with someone|Do you want to [hang out/~meet up] this weekend?
catch up|to talk with someone after a long time|Let's get coffee and [catch up].
on my way|going there right now|I'm [on my way], see you in 10 minutes.
by the way|used to add a new topic|[By the way], did you see the game?
make up your mind|to decide|You need to [make up your mind] soon.
`},
 {id:"phrasal", ico:"🏃", t:"Everyday phrasal verbs", sub:"wake up, find out, give up…", w:`
wake up|to stop sleeping|I need to [wake up/~get up] early tomorrow.
get up|to get out of bed|On Sundays, I like to [get up/~wake up] late.
turn on|to start a machine or a light|Can you [turn on/switch on] the light, please?
turn off|to stop a machine or a light|Don't forget to [turn off/switch off] the TV.
look for|to try to find something|I have to [look for] my keys again.
find out|to discover information|I want to [find out/~discover] what happened.
give up|to stop trying|Don't [give up/~quit]! You're almost there.
pick up|to go and get someone or something|Can you [pick up/~get] the kids from school?
put on|to start wearing clothes|It's cold, so [put on/~wear] a jacket.
take off|to remove clothes or shoes|Please [take off/remove] your shoes at the door.
run out of|to have no more of something|We always [run out of] coffee on Mondays.
figure out|to understand or solve something|I can't [figure out/~solve] this math problem.
`},
 {id:"travel", ico:"✈️", t:"Travel", sub:"luggage, layover, check in…", w:`
book|to reserve a room, a ticket or a table|I want to [book/reserve] a hotel near the beach.
luggage|the bags you take on a trip|My [luggage/baggage] was too heavy.
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
colleague|a person you work with|My [colleague/coworker/co-worker] helped me with the project.
task|a piece of work you need to do|My first [task] today is answering emails.
follow up|to contact someone again about something|I'll [follow up] with the client tomorrow.
reach out|to contact someone to ask or offer something|Feel free to [reach out] if you have questions.
set up|to organize or prepare something|Can we [set up/~arrange/~organize] a call for Thursday?
on track|going as planned|Don't worry, the project is [on track].
skill|something you are good at because you practiced it|Communication is an important [skill].
update|new information about something|Can you give me an [update] on the project?
`},
 {id:"pairs", ico:"🔀", t:"Confusing word pairs", sub:"fun vs funny, say vs tell, borrow vs lend…", np:true, w:`
fun|enjoyable, a good time|We had a lot of [fun] at the beach.|funny,funnily,fan
funny|it makes you laugh|Why are you laughing? What's so [funny]?|fun,funnily,fan
say|to speak words (you say something)|What did she [say] about the trip?|tell,talk,speak
tell|to give information to a person (you tell someone something)|Can you [tell] me the time?|say,talk,speak
finish|to complete something you are doing|I need to [finish] my homework before dinner.|end,ended,ending
end|the last part of something|I cried at the [end] of the movie.|finish,final,finishing
grow|to get bigger, like a child or a plant|My daughter is [growing] so fast!|increasing,raising,rising
increase|to go up in number or amount|Prices [increased/~went up/~rose/~grew] by 10% last year.|raised,growed,increasing
bet|to risk money on what will happen (also: I bet = I'm sure)|I [bet] you can't eat ten tacos!|gamble,bets,betting
gamble|to play games of chance for money, like in a casino|He lost all his money because he loved to [gamble/~bet].|gambling,gambles,gambled
borrow|to take something and give it back later|Can I [borrow] your pen?|lend,lent,borrowing
lend|to give something to someone for a short time|Can you [lend] me 5,000 pesos?|borrow,borrowed,lending
remember|to keep something in your mind|I can't [remember] his name.|remind,reminded,remembering
remind|to make someone remember something|Please [remind] me to call my mom.|remember,remembered,reminding
lose|to not have something anymore, or to not win|Don't [lose] your keys again!|miss,loose,lost
miss|to be too late for something, or to feel sad someone isn't there|Hurry up or we'll [miss] the bus!|lose,loose,lost
make|to create or build something|Did you [make] a mistake?|do,done,making
do|to complete a task or an activity|I have to [do] my homework.|make,made,doing
hear|sounds come to your ears (no effort)|Can you [hear] me? The connection is bad.|listen,listening,listened
listen|to pay attention to sounds|I love to [listen] to podcasts.|hear,heard,listening
`}
];
VOC_SETS.forEach(set=>{
  set.items=set.w.trim().split("\n").map((l,i)=>{ const p=l.split("|").map(x=>x.trim()); const alt=((p[2].match(/\[[^\]\/]+\/([^\]]*)\]/)||[])[1]||"").split("/").filter(Boolean); return {w:p[0], def:p[1], ex:p[2].replace(/\[([^\]\/]+)\/[^\]]*\]/,"[$1]"), alt, i, wr:p[3]?p[3].split(",").map(x=>x.trim()):null}; });   /* [turn on/switch on]: other right answers; ~ = right but not this word */ delete set.w;
  const n=set.items.length;
  set.qs=[];
  set.items.forEach((it,i)=>{
    const others=[1,2,3].map(k=>set.items[(i+k*3)%n]);
    set.qs.push({id:"v-"+set.id+"-"+i+"-m", st:0, mco:true, q:"“"+it.w+"” means ___.", a:[it.def], o:others.map(x=>x.def), why:"“"+it.w+"” = "+it.def+". Example: "+it.ex.replace(/[\[\]]/g,""), es:"", voc:set.id});
    const m=it.ex.match(/\[([^\]]+)\]/), ans=m?m[1]:it.w;
    set.qs.push({id:"v-"+set.id+"-"+i+"-c", st:0, q:it.ex.replace(/\[[^\]]+\]/,"___")+(set.np?"":" (= "+it.def+")"), a:[ans].concat(it.alt), o:it.wr||others.map(x=>{ const mm=x.ex.match(/\[([^\]]+)\]/); return /^[A-Z]/.test(ans)? x.w.charAt(0).toUpperCase()+x.w.slice(1) : x.w; }), why:"“"+it.w+"” = "+it.def+".", es:"", voc:set.id});
  });
});
