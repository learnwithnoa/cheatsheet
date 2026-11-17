# step173 (Nov 17 2026): Noa's 🔔 stays short: things you've already read (club comments, "about you", trials, emails sent)
# leave the list after 2 days; unread ones stay until you read them (up to 2 weeks)
R('''    const seen=getSeen(), wk=Date.now()-14*864e5, since=Math.max(seen,wk);''',
  '''    const seen=getSeen(), wk=Date.now()-14*864e5, since=Math.max(seen,wk), RD2=Date.now()-2*864e5;''')
R('''clubAll=(data.club||[]).filter(a=>a.at>wk&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73");''',
  '''clubAll=(data.club||[]).filter(a=>a.at>wk&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"&&((a.at>since&&!rdK.includes(kCl(a)))||a.at>RD2));''')
R('''mineAll=(data.mine||[]).filter(n=>n.at>wk);''', '''mineAll=(data.mine||[]).filter(n=>n.at>wk&&((n.at>since&&!rdK.includes(kMi(n)))||n.at>RD2));''')
R('''const trAll=(data.trials||[]).filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>wk),''',
  '''const trAll=(data.trials||[]).filter(t=>{ const w=Math.max(t.start||0,t.ended||0,t.joined||0); return w>wk&&((w>since&&!rdK.includes(kTr(t)))||w>RD2); }),''')
R('''const mlAll=(data.mails||[]).filter(m=>m.at>wk),''', '''const mlAll=(data.mails||[]).filter(m=>m.at>wk&&((m.at>since&&!rdK.includes(kMl(m)))||m.at>RD2)),''')
