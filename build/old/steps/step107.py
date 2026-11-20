# step107: notification history: club comments/posts and "about you" from the last 2 weeks stay on the list after they're read (faded, not counted),
# and club ones open the exact post
R('''const clubNew=(data.club||[]).filter(a=>a.at>since&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73");''',
'''const clubNew=(data.club||[]).filter(a=>a.at>since&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"), clubAll=(data.club||[]).filter(a=>a.at>wk&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73");''')
R('''${clubNew.length?`<h4>Club community</h4><ul>${clubNew.map(a=>`<li>''','''${clubAll.length?`<h4>Club community</h4><ul>${clubAll.map(a=>`<li${a.at>since?"":' class="tn-read"'}>''')
R('''<a class="tn-go" href="#club" data-go="club">Open →</a></li>`).join("")}</ul>`:""}''','''<a class="tn-go" href="#club" data-go="club"${a.pid?` data-bgo="${esc(a.pid)}"`:""}>Open →</a></li>`).join("")}</ul>`:""}''')
R('''const mineNew=(data.mine||[]).filter(n=>n.at>since);''','''const mineNew=(data.mine||[]).filter(n=>n.at>since), mineAll=(data.mine||[]).filter(n=>n.at>wk);''')
R('''${mineNew.length?`<h4>💛 About you in the club</h4><ul>${mineNew.map(n=>`<li>''','''${mineAll.length?`<h4>💛 About you in the club</h4><ul>${mineAll.map(n=>`<li${n.at>since?"":' class="tn-read"'}>''')
R('''!clubNew.length?`<p class="tn-line muted">Nothing new right now''','''!clubAll.length&&!mineAll.length?`<p class="tn-line muted">Nothing new right now''')
