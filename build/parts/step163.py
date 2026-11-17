# step163 (Nov 17 2026): "Learn it first" lessons for the other six grammar modules (content in parts/lessons_more.js).
_js = '<script>\n' + open('parts/lessons_more.js', encoding='utf-8').read() + '\n</script>\n'
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = '''
/* step163 */
.pl-tr{grid-template-columns:minmax(28px,auto) 1fr 1fr}
.pl-sign{white-space:nowrap;font-size:13px}
.pl-tr .pl-sign:only-child{font-size:16px}
@media (max-width:560px){.pl-tr{grid-template-columns:minmax(24px,auto) 1fr}.pl-tr>span:last-child{grid-column:2}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''Some start with a short <b>📖 Learn it first</b> lesson (basics and advanced, in English or Spanish).''',
  '''Each one starts with a short <b>📖 Learn it first</b> lesson (basics and advanced, in English or Spanish) and ends with a bonus <b>⭐ Advanced</b> stage for B2–C1.''')
