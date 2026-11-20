# step78: pronunciation guide (LEV-er-ij) for short words in My words
R("""'<div><div class="w">'+esc(x.w)+(x.pos?' <span class="pos">'+esc(x.pos)+'</span>':'')+'</div>'+""","""'<div><div class="w">'+esc(x.w)+(x.pos?' <span class="pos">'+esc(x.pos)+'</span>':'')+'</div>'+(x.pr?'<div class="wpr" title="How to say it (CAPITALS = the strong part)"><span aria-hidden="true">🗣️</span> '+esc(x.pr)+'</div>':'')+""")
R("""      '<div class="field wide"><label for="ed-own">✍️ My own sentence</label>""","""      '<div class="field"><label for="ed-pr">🗣️ How to say it</label><input id="ed-pr" type="text" value="'+esc(x.pr||"")+'" placeholder="e.g. LEV-er-ij"></div>'+
      '<div class="field wide"><label for="ed-own">✍️ My own sentence</label>""")
R("""{ const ov=document.getElementById("ed-own").value.trim().slice(0,300); if(ov) x.own=ov; else delete x.own; }""","""{ const ov=document.getElementById("ed-own").value.trim().slice(0,300); if(ov) x.own=ov; else delete x.own; } { const pi=document.getElementById("ed-pr"); if(pi){ const pv=pi.value.trim().slice(0,60); if(pv) x.pr=pv; else { delete x.pr; x.prTried=1; } } }""")
css78 = '''
/* step78 */
.wcard .wpr{font:600 13.5px var(--mono,ui-monospace,monospace);letter-spacing:.02em;color:var(--muted);margin:1px 0 2px}
'''
_i = s.index('</style>'); s = s[:_i] + css78 + s[_i:]
R('''    ["🏃","New: Verb + -ing",''','''    ["🗣️","How to say your words","short words and expressions in <b>My words</b> now show how to say them, like <b>LEV-er-ij</b> (CAPITALS = the strong part). Your saved words get it little by little, and you can edit it.","words"],
    ["🏃","New: Verb + -ing",''')
