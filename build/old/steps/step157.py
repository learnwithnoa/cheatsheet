# step157 (Nov 16 2026): when Noa sends someone a message (e.g. the welcome from the 🔔), remember it as "welcomed",
# so Members → Student news shows "✓ Already welcomed" right away (same key the Members page uses: cs-kudos-sent "<uid>-join").
R('''    const t=(THREADS||[]).find(x=>x.id===tid); if(!t||!t.at||now-t.at>30*60000) note(u,"dm","dm:"+me(),text||"📷");''',
  '''    if(window.__csTeacher===true){ try{ const K="cs-kudos-sent", m=JSON.parse(localStorage.getItem(K)||"{}")||{}; if(!m[u+"-join"]){ m[u+"-join"]=now; localStorage.setItem(K,JSON.stringify(m)); } }catch(er){} }
    const t=(THREADS||[]).find(x=>x.id===tid); if(!t||!t.at||now-t.at>30*60000) note(u,"dm","dm:"+me(),text||"📷");''')
