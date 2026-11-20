# 45) usage counts
R('/* ---------------- import words', open('parts/usage.js').read() + '\n/* ---------------- import words')
R('''  curView=id;
  renderBack();''', '''  if(curView!==id&&window.csUse) window.csUse("p:"+id);
  curView=id;
  renderBack();''')
R('''  words.push(Object.assign({id:Date.now().toString(36)''', '''  if(window.csUse) window.csUse("word");
  words.push(Object.assign({id:Date.now().toString(36)''')
# offline support
R('/* ---------------- import words', '''/* offline support */
if("serviceWorker" in navigator&&location.protocol==="https:"){ window.addEventListener("load",()=>{ navigator.serviceWorker.register("sw.js").catch(()=>{}); }); }
window.addEventListener("offline",()=>toast("You're offline. Your saved words and notes still work, and everything syncs when you're back online."));
/* ---------------- import words''')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-presentperfect", date:"November 6, 2026", title:"Present perfect + works offline 🌍", items:[\n'
  '    ["🌍","Present perfect","a new grammar module in <b>Practice</b>, with 7 stages, stories, a test out exam and a 🌍 Little globe for your buddy.","quiz"],\n'
  '    ["📶","Works offline","once you\\u2019ve opened the Cheat Sheet, it opens even without internet. Your saved words and notes are there, and everything syncs when you\\u2019re back online."],\n'
  '    ["👋","A new welcome tour","tap <b>How this page works</b> at the bottom of any page to see what\\u2019s new."]\n'
  '  ]},\n')
