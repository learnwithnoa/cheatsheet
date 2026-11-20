# step75: non-members don't see the Instagram group button; no Star button on the Club page (it's already pinned)
R('''if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","park","coaching"].includes(id)) return;''','''if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","park","coaching","club"].includes(id)) return;''')
css75 = '''
/* step75 */
.cl-igtop[hidden]{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + css75 + s[_i:]
