# Runs last: "My words" is now "My notebook" (step175). Catches text added by the patches and other post scripts
# (live board etc.). Old What's new entries (inside CHANGELOG) stay as they were.
import sys
p=sys.argv[1]; s=open(p,encoding="utf-8").read()
a=s.index('const CHANGELOG=['); b=s.index('\n];',a)
def ren(t):
    for o,n in [('to My words','to My notebook'),('In My words','In My notebook'),('in My words','in My notebook'),('<b>My words</b>','<b>My notebook</b>'),
                ('L("My words","Mis palabras")','L("My notebook","Mi cuaderno")'),('a Mis palabras','a Mi cuaderno'),('en Mis palabras','en Mi cuaderno'),
                ('Add this note to My class notes','Add this note to your class notes in My notebook')]:
        t=t.replace(o,n)
    return t
s=ren(s[:a])+s[a:b]+ren(s[b:])
s=s.replace('(it used to be <b>My notebook</b> and <b>My class notes</b>)','(it used to be <b>My words</b> and <b>My class notes</b>)')
open(p,"w",encoding="utf-8").write(s)
