# step53: English Map, top-bar Messages, timer buddy, tour + What's new
R('''your class recaps with exercises Hibi checks for you, the new words from each class (save them with one tap), your progress reports and what Noa recommends you practice.</div>''','''your <b>English Map</b> (where you are, your superpower, 3 focus areas and the route to your goal), class recaps with exercises Hibi checks for you, the new words from each class (save them with one tap), your progress reports and what Noa recommends you practice.</div>''')
R('''pick your photo (your Google one or your own). The button turns''','''pick your photo (your Google one, your own, or your buddy), and jump to your words and your club profile. The button turns''')
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-map", date:"November 10, 2026", title:"Your English Map 🗺️", items:[
    ["🗺️","Your English Map","private students: your map from Session Zero now lives in <b>My coaching</b>. Your level, your superpower, 3 focus areas with practice links, and the route to your goal."],
    ["💬","Messages at the top","the 💬 button now sits in the top bar, with a red dot when someone writes to you. Type a name at the top to start a new chat, with anyone in the club or with Noa.","club"],
    ["⏱️","Study timer buddy","your buddy cheers you on during the study timer: halfway, 5 minutes left, and when it's time for a break."],
    ["🔴","New posts","a red dot on <b>Community</b> tells you when there's something new on the wall.","club"],
    ["⭐","Rate the podcast","give each podcast episode 1 to 5 stars. Noa reads every rating.","club"],
    ["📶","Difficulty levels","every class recording and podcast episode now shows a level from 1 to 10 (1 is about A2+, 10 is about C1), so you can pick what fits you today.","club"],
    ["🌊","Ocean waves","a new sound in 🎵 Study music: slow waves rolling onto the beach."],
    ["🖱️","Look around the park","zoomed in on the Buddy park? Drag it with your mouse to see the rest."],
    ["⚙️","Tidier settings","the ⚙️ menu is now organized into Your level, Look &amp; feel, Text &amp; reading, Page tools, Comfort &amp; accessibility and Study buddy."]
  ]},''')
R('<script src="buddy.js?v=43" defer></script>', '<script src="buddy.js?v=46" defer></script>')
# version tag in the footer (opens What's new)
R('''<div>Cheat Sheet · by Learn with Noa</div></footer>''','''<div>Cheat Sheet · by Learn with Noa</div><div class="foot-v"><button type="button" class="foot-ver" data-go="changelog" title="What's new in this version">v1.0</button></div></footer>''')
_i = s.index('</style>'); s = s[:_i] + '''
footer>div:has(+ .foot-v){display:inline}.foot-v{display:inline-block;margin-left:10px;vertical-align:1px}
.foot-ver{all:unset;cursor:pointer;font:700 12px var(--mono);letter-spacing:.04em;padding:2px 8px;border-radius:999px;border:1px solid var(--line);color:var(--muted)}
.foot-ver:hover,.foot-ver:focus-visible{color:var(--bright);border-color:var(--bright)}
''' + s[_i:]
