# after ext patches: buddy.js cache version + What's new entry for the two new modules
import sys, re
p=sys.argv[1]; s=open(p,encoding="utf-8").read()
s=re.sub(r'buddy\.js\?v=\d+','buddy.js?v=53',s)
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
