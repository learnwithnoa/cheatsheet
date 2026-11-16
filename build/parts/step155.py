# step155 (Nov 16 2026): Noa's 🔔 — opening a notification (Open → / Chat → / Message →) marks THAT one as read,
# so it stops counting in the bell number (club wall, "about you", trials, emails). Uses the same read list as the ✓ buttons.
R('''    const clubNew=(data.club||[]).filter(a=>a.at>since&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"), clubAll=''',
  '''    const rdK=getRead(), kCl=a=>"cl:"+(a.pid||"")+":"+a.at, kMi=n=>"mi:"+(n.pid||n.kind||"")+":"+n.at, kTr=t=>"tr:"+t.uid+":"+Math.max(t.start||0,t.ended||0,t.joined||0), kMl=m=>"ml:"+(m.uid||"")+":"+m.at;
    const clubNew=(data.club||[]).filter(a=>a.at>since&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"&&!rdK.includes(kCl(a))), clubAll=''')
R('''    const mineNew=(data.mine||[]).filter(n=>n.at>since), mineAll=''',
  '''    const mineNew=(data.mine||[]).filter(n=>n.at>since&&!rdK.includes(kMi(n))), mineAll=''')
R('''trNew=trAll.filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>since);''',
  '''trNew=trAll.filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>since&&!rdK.includes(kTr(t)));''')
R('''mlNew=mlAll.filter(m=>m.at>since);''', '''mlNew=mlAll.filter(m=>m.at>since&&!rdK.includes(kMl(m)));''')
# rows: greyed out once read, and the link/button carries the key to mark
R('''${mlAll.slice(0,8).map(m=>`<li${m.at>since?"":' class="tn-read"'}>''', '''${mlAll.slice(0,8).map(m=>`<li${m.at>since&&!rdK.includes(kMl(m))?"":' class="tn-read"'}>''')
R('''<button type="button" class="tn-go" data-dmto="${esc(m.uid)}" data-dmname="${esc(m.name||"")}">Chat →</button>''',
  '''<button type="button" class="tn-go" data-tnrdgo="${esc(kMl(m))}" data-dmto="${esc(m.uid)}" data-dmname="${esc(m.name||"")}">Chat →</button>''')
R('''        return `<li${when>since?"":' class="tn-read"'}>🎁''', '''        return `<li${when>since&&!rdK.includes(kTr(t))?"":' class="tn-read"'}>🎁''')
R('''<button type="button" class="tn-go" data-dmto="${esc(t.uid)}" data-dmname="${esc(t.name||"")}">Message →</button>''',
  '''<button type="button" class="tn-go" data-tnrdgo="${esc(kTr(t))}" data-dmto="${esc(t.uid)}" data-dmname="${esc(t.name||"")}">Message →</button>''')
R('''${clubAll.map(a=>`<li${a.at>since?"":' class="tn-read"'}>''', '''${clubAll.map(a=>`<li${a.at>since&&!rdK.includes(kCl(a))?"":' class="tn-read"'}>''')
R('''<span class="muted">· ${ago(a.at)}</span> <a class="tn-go" href="#club" data-go="club"${a.pid?` data-bgo="${esc(a.pid)}"`:""}>Open →</a>''',
  '''<span class="muted">· ${ago(a.at)}</span> <a class="tn-go" href="#club" data-go="club" data-tnrdgo="${esc(kCl(a))}"${a.pid?` data-bgo="${esc(a.pid)}"`:""}>Open →</a>''')
R('''${mineAll.map(n=>`<li${n.at>since?"":' class="tn-read"'}>''', '''${mineAll.map(n=>`<li${n.at>since&&!rdK.includes(kMi(n))?"":' class="tn-read"'}>''')
R('''<span class="muted">· ${ago(n.at)}</span> <a class="tn-go" href="#club" data-go="club"${n.pid?` data-bgo="${esc(n.pid)}"`:""}>Open →</a>''',
  '''<span class="muted">· ${ago(n.at)}</span> <a class="tn-go" href="#club" data-go="club" data-tnrdgo="${esc(kMi(n))}"${n.pid?` data-bgo="${esc(n.pid)}"`:""}>Open →</a>''')
# the click: remember it as read and refresh the number (the link still does its normal job)
R('''  document.addEventListener("click",e=>{ const t=e.target.closest("[data-tn]"); if(!t) return; const k=t.dataset.tn;''',
  '''  document.addEventListener("click",e=>{ const g=e.target.closest("[data-tnrdgo]"); if(!g||window.__csPreview) return; const k=g.dataset.tnrdgo, r=getRead(); if(!r.includes(k)){ r.push(k); setRead(r); } setTimeout(()=>{ try{ paint(); }catch(er){} },0); });
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-tn]"); if(!t) return; const k=t.dataset.tn;''')
