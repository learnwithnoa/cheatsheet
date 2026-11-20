# 48) feedback section names, WordReference only for one word, flashcards button
R('''.map(b=>[b.dataset.go, b.dataset.go==="notes"?"Home":b.textContent.replace(/\\d+$/,"").trim()]));''',
  '''.map(b=>{ const c=b.cloneNode(true); c.querySelectorAll('[aria-hidden="true"],.cn-count,.nav-lvl,svg').forEach(x=>x.remove()); return [b.dataset.go, b.dataset.go==="notes"?"Home":c.textContent.replace(/\\d+$/,"").trim()]; }));''')
R('''  lnkW.hidden=false;
  lnkW.href = !t ? (sl==="es" ? "https://www.wordreference.com/es/en/" : "https://www.wordreference.com/es/") : sl==="es" ?''',
  '''  const single=/^[\\p{L}'-]+$/u.test(t);
  lnkW.hidden=!single;
  if(single) lnkW.href = sl==="es" ?''')
R('<a class="linkbtn" id="lnkWR" href="https://www.wordreference.com/" target="_blank" rel="noopener">WordReference ↗</a>', '<a class="linkbtn" id="lnkWR" href="https://www.wordreference.com/" target="_blank" rel="noopener" hidden>WordReference ↗</a>')
R('<button class="swap" type="button" data-go="quiz">Practice with flashcards →</button>', '<button class="swap" type="button" id="wGoFlash">Practice with flashcards →</button>')
R('/* ---------------- import words', 'document.getElementById("wGoFlash").addEventListener("click",()=>{ if(window.csPractice) window.csPractice("flash"); });\n/* ---------------- import words')
