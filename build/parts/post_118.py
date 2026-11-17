# after ext patches: buddy.js cache version + What's new entry for the two new modules
import sys, re
p=sys.argv[1]; s=open(p,encoding="utf-8").read()
s=re.sub(r'buddy\.js\?v=\d+','buddy.js?v=60',s)
a='const CHANGELOG=[\n'
assert s.count(a)==1
if '2026-1113-mods' not in s:
    s=s.replace(a,a+'''  {id:"2026-1113-mods", date:"November 13, 2026", title:"Two new grammar modules", items:[
    ["💪","New: Could vs was able to","<b>I could swim</b> (always) vs <b>I was able to fix it</b> (that one time), <b>couldn't</b>, <b>will be able to</b>… 7 stages in <b>Practice → Grammar</b>. Finish it for a 🔑 golden key for your buddy.","quiz"],
    ["🏠","New: There is / there are","<b>hay, había, habrá</b> in English: <b>there is / there are</b>, <b>there was / there were</b>, <b>there will be</b>, negatives and questions. 7 short stages with Spanish help, in <b>Practice → Grammar</b>. Finish it for a 🏠 little house for your buddy.","quiz"]
  ]},
''',1)
open(p,"w",encoding="utf-8").write(s)
# Nov 13 evening: What's new for the club library / Instagram / bell window
s=open(p,encoding="utf-8").read()
if '2026-1113-clublib' not in s:
    s=s.replace(a,a+'''  {id:"2026-1113-clublib", date:"November 13, 2026", title:"Club Library filters and a smoother 🔔 window", items:[
    ["🎬","Library: filter by class","In <b>Club → Library</b>, tap <b>Deep Dive Monday</b>, <b>Wildcard Wednesday</b>, <b>Word Up Thursday</b> or <b>Free Talk Friday</b> to see only those recordings. The newest 8 show first, then <b>Show more</b>.","club"],
    ["📸","Instagram group, always at the top","The <b>Instagram group</b> button is back at the top right of the club page, on every tab.","club"],
    ["🔔","Notifications and Messages: one window","The 🔔 opens one window with two tabs, like Profile and Settings. The tabs always switch, and the 🔔 closes it again.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 14: typing is safe from refreshes, practice feedback box fix
s=open(p,encoding="utf-8").read()
if '2026-1114-typing' not in s:
    s=s.replace(a,a+'''  {id:"2026-1114-typing", date:"November 14, 2026", title:"Your typing is safe", items:[
    ["✍️","No surprise refreshes","Hibi never refreshes by itself while you're typing or in the middle of a practice round. If you tap <b>Refresh</b> while writing a note, your text comes back.",""],
    ["💪","Clearer practice feedback","When an answer is wrong, the explanation is easy to read again (it was crossed out by mistake). Three <b>will be able to</b> questions in <b>Could vs was able to</b> are clearer now.","practice"]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 15: fairer grammar answers
s=open(p,encoding="utf-8").read()
if '2026-1115-answers' not in s:
    s=s.replace(a,a+'''  {id:"2026-1115-answers", date:"November 15, 2026", title:"Fairer grammar practice", items:[
    ["✅","More right answers count","Noa checked every question in <b>Practice → Grammar</b>. If there's more than one correct answer (like <b>managed to</b> or <b>was able to</b>), they all count now, and some questions got a clearer time word (<b>yesterday</b>, <b>last night</b>…).","practice"],
    ["👍","\\"That's also correct!\\"","Wrote something that's correct English but isn't the form the stage is practicing? It won't be marked wrong. Hibi tells you, and you can try the other form.","practice"]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 15: sweep (phone + Word, windows)
s=open(p,encoding="utf-8").read()
if '2026-1115-sweep' not in s:
    s=s.replace(a,a+'''  {id:"2026-1115-sweep", date:"November 15, 2026", title:"Tidier top bar", items:[
    ["＋","Save words on your phone","The green <b>＋</b> button is now at the top on phones too, next to search. Tap it on any page to save a new word.",""],
    ["🪟","One window at a time","Music, timer, notifications, messages and your profile each open right under their own button, and opening one closes the others.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 15: new address hibi.cl
s=open(p,encoding="utf-8").read()
if '2026-1115-domain' not in s:
    s=s.replace(a,a+'''  {id:"2026-1115-domain", date:"November 15, 2026", title:"Hibi has its own address: hibi.cl", items:[
    ["🏠","hibi.cl","Hibi now lives at <b>hibi.cl</b>. Old links still work and bring you here.",""],
    ["🔑","Sign in once more","Because the address is new, you may need to sign in again. All your notes, words and progress are saved to your account, so everything is still here.",""],
    ["📲","Installed the app?","If you added Hibi to your phone or computer, add it again from <b>hibi.cl</b> (Install the app, at the bottom of any page) and remove the old icon.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 15: free 2-week club trial
s=open(p,encoding="utf-8").read()
if '2026-1115-trial' not in s:
    s=s.replace(a,a+'''  {id:"2026-1115-trial", date:"November 15, 2026", title:"Try the club free for 2 weeks", items:[
    ["🎁","Free 2-week trial","Not in Noa’s English Club yet? Open <b>Club</b> and tap <b>Try it free for 2 weeks</b>. No card needed: you get the classes, recordings, community wall and podcast right away.",""],
    ["💛","Then you decide","Your trial shows how many days are left at the top of the Club page. Want to stay? Tap <b>I want to stay</b> and Noa will help you join.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: translator fallback
s=open(p,encoding="utf-8").read()
if '2026-1116-translate' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-translate", date:"November 16, 2026", title:"The translator always answers", items:[
    ["🌐","No more “busy”","When the smart translator is busy, the Translator now gives you a quick translation anyway, so you’re never stuck.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: pet the buddy in the study room
s=open(p,encoding="utf-8").read()
if '2026-1116-studypet' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-studypet", date:"November 16, 2026", title:"Pet your buddy while you study", items:[
    ["🎧","Study room","In the music window, tap your buddy to pet it. Tap anywhere else in the room to play or pause the music.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: Noa's notes in the bell
s=open(p,encoding="utf-8").read()
if '2026-1116-kudosbell' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-kudosbell", date:"November 16, 2026", title:"Notes from Noa in your notifications", items:[
    ["💌","Easier to find","Little notes from Noa now also appear in your 🔔 notifications, with a <b>Reply to Noa</b> button that opens your chat with him. Tap ✕ to hide one (you can still find it under <b>See all</b>).",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: club payments on Hibi (v2.0)
s=open(p,encoding="utf-8").read()
if '2026-1116-clubpay' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-clubpay", date:"November 16, 2026", title:"Hibi 2.0: the club lives here now", items:[
    ["💛","Your membership, on Hibi","Noa's English Club is leaving Skool. Club members keep their same price and switch at the top of the <b>Club</b> page: your first payment waits until the day Skool would have charged you, so you never pay twice.",""],
    ["💳","Pesos or dollars","Pay with <b>Mercado Pago</b> in pesos or <b>PayPal</b> in US dollars. You can see, change or cancel your membership anytime on Hibi.",""],
    ["🔖","New address","Hibi lives at <b>hibi.cl</b> now. If you installed the app on your phone, install it again from hibi.cl.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: unread message emails
s=open(p,encoding="utf-8").read()
if '2026-1116-mailnotif' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-mailnotif", date:"November 16, 2026", title:"Never miss a message", items:[
    ["📧","A little email if a message waits","If someone sends you a message on Hibi and it waits unread for 12 hours, Hibi sends you one short email so you don't miss it. Never more than one a day. You can turn it off in Settings.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: community count, polls in the post box
s=open(p,encoding="utf-8").read()
if '2026-1116-community' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-community", date:"November 16, 2026", title:"Community: see what's new", items:[
    ["🔢","New posts counter","The <b>Community</b> tab shows how many posts and comments you haven't seen. They count as read as you scroll past them, or tap <b>Mark all as read</b>.",""],
    ["📊","Polls in the post box","To start a poll, tap <b>📊 Poll</b> right in the box where you write a post.",""],
    ["🎬","Library: Show less","After <b>Show more</b> in the Library, tap <b>Show less</b> to keep the list short.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: Daily Stoic for members (optional)
s=open(p,encoding="utf-8").read()
if '2026-1116-stoic' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-stoic", date:"November 16, 2026", title:"A little Stoic idea each day", items:[
    ["🏛️","Daily Stoic (optional)","Want one short idea a day from the Stoics, with a small thing to try? Turn on <b>🏛️ Daily Stoic on Home</b> in <b>Settings</b>, and it shows up at the top of Home. It's off unless you turn it on.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 16: react to messages
s=open(p,encoding="utf-8").read()
if '2026-1116-dmreact' not in s:
    s=s.replace(a,a+'''  {id:"2026-1116-dmreact", date:"November 16, 2026", title:"React to messages", items:[
    ["❤️","Reactions in Messages","When someone sends you a message, tap the little <b>☺</b> next to it and pick an emoji, or <b>double-tap</b> the message for a ❤️. Tap your reaction again to remove it.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 17: grammar lessons (pilot)
s=open(p,encoding="utf-8").read()
if '2026-1117-lesson' not in s:
    s=s.replace(a,a+'''  {id:"2026-1117-lesson", date:"November 17, 2026", title:"Learn it first: grammar lessons", items:[
    ["📖","Present perfect lesson","Open <b>Practice → Present perfect</b> and you'll find a short lesson before the stages: <b>Basics</b> (how to make it and when to use it, with examples and common mistakes) and <b>Advanced</b> for B2–C1. Switch it to <b>Español</b> anytime. More topics coming soon.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 17: lessons for every grammar module + advanced stages
s=open(p,encoding="utf-8").read()
if '2026-1117-lessons-all' not in s:
    s=s.replace(a,a+'''  {id:"2026-1117-lessons-all", date:"November 17, 2026", title:"Lessons for every grammar module + an Advanced stage", items:[
    ["📖","Learn it first, everywhere","Every grammar module now starts with a short lesson: <b>Basics</b> (A1–B1) and <b>Advanced</b> (B2–C1), in English or <b>Español</b>, with 🔊 examples and common mistakes.",""],
    ["⭐","Stage 8: Advanced","Each module has a new bonus stage for B2–C1. It opens when you pass stage 7 (or test out). You don't need it to finish the module.",""],
    ["🗂️","Verb tenses in one folder","In <b>Practice → Grammar</b>, the present simple, past simple and present perfect now live together in a <b>Verb tenses</b> folder, so the list stays tidy as more topics arrive.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 17: advanced-stage buddy toys
s=open(p,encoding="utf-8").read()
if '2026-1117-advtoys' not in s:
    s=s.replace(a,a+'''  {id:"2026-1117-advtoys", date:"November 17, 2026", title:"New toys for your study buddy", items:[
    ["🎁","A toy for every Advanced stage","Pass the ⭐ Advanced stage of a grammar module and your buddy gets a new toy: ⏰ alarm clock, 📷 old camera, ✈️ paper plane, 🗺️ treasure map, 🥇 gold medal, 🎧 headphones and 🔭 telescope. See them all in your buddy's <b>Progress</b>.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 17: focus mode menu button
s=open(p,encoding="utf-8").read()
if '2026-1117-focusmenu' not in s:
    s=s.replace(a,a+'''  {id:"2026-1117-focusmenu", date:"November 17, 2026", title:"Focus mode: a menu button", items:[
    ["☰","Change pages in focus mode","In focus mode there's now a <b>☰ Menu</b> button at the top left. It opens the menu on the side, so you can jump to another page without leaving focus mode.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
# Nov 17: indirect questions module
s=open(p,encoding="utf-8").read()
if '2026-1117-iq' not in s:
    s=s.replace(a,a+'''  {id:"2026-1117-iq", date:"November 17, 2026", title:"New grammar module: Indirect questions", items:[
    ["❓","Do you know where it is?","A new module in <b>Practice → Grammar</b> (B1+ and up) for polite questions like <i>Do you know where the station is?</i> (not <i>where is the station</i>). A short lesson, 6 stages, an ⭐ Advanced stage and a test out.",""],
    ["🧭","Two new toys","Finish it for a 🧭 <b>compass</b> for your study buddy, and pass its Advanced stage for a 🔍 <b>detective's magnifying glass</b>.",""]
  ]},
''',1)
    open(p,"w",encoding="utf-8").write(s)
