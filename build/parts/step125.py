# step125 (Nov 15 2026): Star pill explains itself on hover; Instagram button hidden for non-members (and in "View as" a non-member)
R('''    b.setAttribute("aria-label",(on?"Remove ":"Add ")+navLabel(b.dataset.star)+(on?" from":" to")+" your starred sections");''',
  '''    b.setAttribute("aria-label",(on?"Remove ":"Add ")+navLabel(b.dataset.star)+(on?" from":" to")+" your starred sections");
    b.title=on?"Starred: this page is in the ★ Starred list in the left menu. Click to remove it.":"Star this page to add it to the ★ Starred list in the left menu, so it's one click away.";''')
R('''  function locked(){ loadSample();''',
  '''  function locked(){ loadSample(); document.querySelectorAll("#v-club .cl-igtop").forEach(x=>x.hidden=true);''')
_css = '''
.cl-igtop[hidden]{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
