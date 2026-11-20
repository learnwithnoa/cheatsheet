# step158 (Nov 16 2026): everyone on Hibi must be club, private or both. Noa's 🔔 now flags anyone who signed up
# but was never assigned (no club / private / both), with their names, until he assigns them on the Members page.
R('''    const unl=data.acc.filter(a=>a.kind==="new").length;''',
  '''    const unl=data.acc.filter(a=>a.kind==="new").length, unA=data.acc.filter(a=>a.kind==="hibi"), una=unA.length;''')
R('''.concat(unl?["u:"+unl]:[]);''', '''.concat(unl?["u:"+unl]:[]).concat(una?["ua:"+unA.map(a=>a.uid).sort().join(",")]:[]);''')
R('''      ${unl?`<p class="tn-line">🔗 ${unl}''',
  '''      ${una?`<p class="tn-line">⚪ ${una===1?"1 member isn’t":una+" members aren’t"} club or private yet: <b>${unA.slice(0,6).map(a=>esc(String(a.name||"").split(" ")[0])).join(", ")}${una>6?` +${una-6}`:""}</b>. Everyone needs one. <a class="tn-go" href="members.html#unassigned">Assign them →</a></p>`:""}
      ${unl?`<p class="tn-line">🔗 ${unl}''')
R('''!packs.length&&!unl&&!clocks.length''', '''!packs.length&&!unl&&!una&&!clocks.length''')
