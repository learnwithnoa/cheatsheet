# step84: every profile save starts from what's saved right now (not the list loaded earlier), so another tab/device or a failed load never wipes titles, birthdays or "member since"
R('''async function saveMe(patch){ if(G()||!me()) return; const cur=profOf(me())||{};''',
  '''async function saveMe(patch){ if(G()||!me()) return;
    const d0=await api("GET","/clubProfiles/"+me()); const cur=d0&&d0.fields?fromDoc(d0):{}; /* api throws on any error except "not found", so a failed read never overwrites the saved profile */''')
