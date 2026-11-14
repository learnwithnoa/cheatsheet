# step69: my own sentence + checklists for the AI word tools
R("""      '<div class="field wide"><label for="ed-n">Notes</label>""","""      '<div class="field wide"><label for="ed-own">✍️ My own sentence</label><input id="ed-own" type="text" value="'+esc(x.own||"")+'" placeholder="Write a sentence of your own with this word"></div>'+
      '<div class="field wide"><label for="ed-n">Notes</label>""")
R("""(x.e?'<div class="ex">'+esc(x.e)+'</div>':'')+(x.n?'<div class="wn">📝 '+esc(x.n)+'</div>':'')+""","""(x.e?'<div class="ex">'+esc(x.e)+'</div>':'')+(x.own?'<div class="wown">✍️ '+esc(x.own)+'</div>':(x.sample?'':'<button class="wown-add" type="button" data-ownw="'+x.id+'">✍️ Write my own sentence</button>'))+(x.n?'<div class="wn">📝 '+esc(x.n)+'</div>':'')+""")
R("""{ const nv=document.getElementById("ed-n").value.trim(); if(nv) x.n=nv; else delete x.n; }""","""{ const nv=document.getElementById("ed-n").value.trim(); if(nv) x.n=nv; else delete x.n; } { const ov=document.getElementById("ed-own").value.trim().slice(0,300); if(ov) x.own=ov; else delete x.own; }""")
R("""  const ed=e.target.closest("[data-edit]"); if(ed){ editingId=ed.dataset.edit; renderWords();""","""  const ow=e.target.closest("[data-ownw]"); if(ow){ editingId=ow.dataset.ownw; renderWords(); const i=document.getElementById("ed-own"); if(i){ i.focus(); i.scrollIntoView({block:"center",behavior:"smooth"}); } return; }
  const ed=e.target.closest("[data-edit]"); if(ed){ editingId=ed.dataset.edit; renderWords();""")
css69 = '''
/* step69 */
.wcard .wown{margin-top:4px;font-size:14.5px;padding:4px 8px;border-left:3px solid var(--accent,#2b7de9);background:color-mix(in srgb,var(--accent,#2b7de9) 7%,transparent);border-radius:0 6px 6px 0}
.wcard .wown-add{display:block;margin-top:4px;padding:0;border:0;background:none;color:var(--muted);font:inherit;font-size:13px;cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px}
.wcard .wown-add:hover{color:var(--ink,inherit)}
.ai-opts{display:grid;gap:4px;margin:10px 0 4px}
.ai-opts .cs-chk{padding:6px 10px;margin:0}
.ai-opts .ai-all{padding-bottom:6px;border-bottom:1px solid var(--line,rgba(127,127,127,.25));margin-bottom:2px}
'''
_i = s.index('</style>'); s = s[:_i] + css69 + s[_i:]
R('''    ["🎥","Your class recordings",''','''    ["✍️","My own sentence","in <b>My words</b>, tap <b>✍️ Write my own sentence</b> under any word to add a sentence of your own. You can edit it any time, and the AI never touches it.","words"],
    ["✅","Choose what the AI does","<b>✨ Complete my words</b> and <b>🧹 Clean up my words</b> now have a checklist (with <b>Select all</b>) so you choose exactly what gets filled in or checked.","words"],
    ["🎥","Your class recordings",''')
R('''in <b>✨ Complete my words</b>, tick <b>I'll write my own example sentences</b> and the AI leaves them for you.''','''in <b>✨ Complete my words</b>, untick <b>Example sentence</b> and the AI leaves them for you.''')
R('<script src="buddy.js?v=48" defer></script>','<script src="buddy.js?v=49" defer></script>')
