# step147 (Nov 16 2026): Noa's bell, "New on Hibi": each new sign-up gets a ✓ (mark as read), and "Mark all as read"
# also marks them (by account, "j:<uid>" in ncs-tnotif-read), so the 🔔 number goes away even if the "seen" time doesn't stick.
R('''    const joins=all.filter(a=>a.first>since), older=all.filter(a=>a.first<=since);''',
  '''    const rdJ=getRead(), isNewJ=a=>a.first>since&&!rdJ.includes("j:"+a.uid);
    const joins=all.filter(isNewJ), older=all.filter(a=>!isNewJ(a));''')
R('''...packs.map(kOf),...clocks.map(kOf)].concat(unl?["u:"+unl]:[]);''',
  '''...packs.map(kOf),...clocks.map(kOf),...joins.map(a=>"j:"+a.uid)].concat(unl?["u:"+unl]:[]);''')
R('''    const cnt=keys.filter(k=>!rd.includes(k)).length+joins.length+clubNew.length+mineNew.length+trNew.length;''',
  '''    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length;''')
R('''<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>`}`:""}</li>`; };''',
  '''<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>`}`:""}${old?"":`<button type="button" class="tn-rd" data-tnrd="j:${esc(a.uid)}" aria-label="Mark as read" title="Mark as read (it stays here, but stops counting in the 🔔 number)">✓</button>`}</li>`; };''')
