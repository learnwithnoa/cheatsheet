# step124 (Nov 15 2026): earlier podcast episodes keep their "Show notes" section (notes + word list), like the newest one
R('''<div class="cl-stars" data-stars="pr_${esc(x.id)}"></div>${x.notes?`<p>${esc(x.notes).replace(/\\n/g,"<br>")}</p>`:""}''',
  '''<div class="cl-stars" data-stars="pr_${esc(x.id)}"></div>${podNotes(x)}''')
R('''${e.notes||(e.vocab||[]).length?`<details class="cl-podn"><summary>📝 ${L("Show notes","Notas del episodio")}${(e.vocab||[]).length?` <span class="muted">· ${e.vocab.length} ${L("words","palabras")}</span>`:""}</summary>${e.notes?`<p>${esc(e.notes).replace(/\\n/g,"<br>")}</p>`:""}${podVocab(e)}</details>`:""}''',
  '''${podNotes(e)}''')
R('''  function podVocab(e){''', '''  function podNotes(e){ return e.notes||(e.vocab||[]).length?`<details class="cl-podn"><summary>📝 ${L("Show notes","Notas del episodio")}${(e.vocab||[]).length?` <span class="muted">· ${e.vocab.length} ${L("words","palabras")}</span>`:""}</summary>${e.notes?`<p>${esc(e.notes).replace(/\\n/g,"<br>")}</p>`:""}${podVocab(e)}</details>`:""; }
  function podVocab(e){''')
