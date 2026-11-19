# step186 (Nov 19 2026): Irregular verbs page: the American / British note goes above the list,
# and buttons to the Irregular verbs practice (one place, with flashcards, quiz and writing drill: see step187).
_note = '''  <div class="note dismissible">Where you see two forms (<i>learned / learnt</i>), the first one is American English and the second is British. Both are correct.</div>
'''
R(_note, '')
R('''  <div class="verb-tools">
    <input id="verbSearch"''', _note + '''  <div class="irr-prac"><b>🃏 Practice these verbs</b><div class="note-actions"><button type="button" class="pill-btn pill-green" onclick="window.__irrGo&&window.__irrGo('cards')">🃏 Flashcards</button><button type="button" class="swap" onclick="window.__irrGo&&window.__irrGo('quiz')">✏️ Quiz</button><button type="button" class="swap" onclick="window.__irrGo&&window.__irrGo('write')">⌨️ Writing drill</button></div></div>
  <div class="verb-tools">
    <input id="verbSearch"''')
_k = s.index('</style>'); s = s[:_k] + """
/* step186: practice buttons on the Irregular verbs page */
.irr-prac{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:0 0 16px}
.irr-prac>b{font-weight:800;width:100%;font-size:15px}
.irr-prac .note-actions{margin:0;flex-wrap:wrap}
""" + s[_k:]
