# after ext patches: buddy.js cache version + What's new entry for the two new modules
import sys, re
p=sys.argv[1]; s=open(p,encoding="utf-8").read()
s=re.sub(r'buddy\.js\?v=\d+','buddy.js?v=55',s)
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
