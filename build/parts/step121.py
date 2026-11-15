# step121 (Nov 15 2026): grammar practice accepts every correct answer.
#  In the question banks, an answer starting with "~" is correct English but not what the stage practices
#  (e.g. "I lost my keys" in a present perfect round). It's never marked wrong: Hibi says so and lets them try again.
R('''const ok=val!==null&&q.a.some(a=>nrm(a)===nrm(val));''',
  '''const also=!it.mc&&val!==null&&!q.a.some(a=>a[0]!=="~"&&nrm(a)===nrm(val))&&q.a.some(a=>a[0]==="~"&&nrm(a.slice(1))===nrm(val));
    if(also){ R.answered=false; const f0=$("psFb"); if(f0){ f0.className="ps-fb also"; f0.innerHTML='<b>👍 That\\'s also correct English!</b><p>But this exercise practices a different form'+(R.kind==="ps"&&R.title?' (<b>'+esc(R.title)+'</b>)':'')+'. Look at the hint in brackets and try once more.</p><p class="es">También está bien, pero aquí practicamos otra forma. Mira la pista entre paréntesis.</p>'; } const i0=$("psIn"); if(i0){ i0.focus(); i0.select(); } return; }
    const ok=val!==null&&q.a.some(a=>a[0]!=="~"&&nrm(a)===nrm(val));''')
_css = '''
/* step121: "also correct" note in grammar practice */
.ps-fb.also{background:var(--green-soft)}
.ps-fb.also .es{opacity:.85}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
