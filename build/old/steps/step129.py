# step129 (Nov 15 2026): the club preview for non-members sits below their own daily content (word of the day, thought),
# members keep "This week in the club" at the top
R('''hc.hidden=false; hc.className="hc-club hc-tease"; hc.innerHTML=teaseHTML();''',
  '''hc.hidden=false; hc.className="hc-club hc-tease"; hc.innerHTML=teaseHTML(); homeSpot(hc,true);''')
R('''    if(!p){ hc.hidden=true; return; }
    const now=Date.now(), cl=classesOf(f,p), isNew=p.id!==seen();''',
  '''    if(!p){ hc.hidden=true; return; }
    homeSpot(hc,false);
    const now=Date.now(), cl=classesOf(f,p), isNew=p.id!==seen();''')
R('''  function teaseHTML(){''',
  '''  function homeSpot(hc,low){ if(!hc.__anchor){ hc.__anchor=document.createComment("homeClub"); hc.before(hc.__anchor); }
    const tb=document.getElementById("todayBox");
    if(low&&tb&&tb.parentNode){ if(tb.nextElementSibling!==hc) tb.after(hc); } else if(!low&&hc.__anchor.nextSibling!==hc) hc.__anchor.after(hc); }
  function teaseHTML(){''')
