# Builds Hibi's page (called by build.sh). Since Nov 20 2026 the source is build/src (see assemble.py),
# plus optional patch steps listed in parts/step19.py.
import re, sys, os, time, json
from assemble import assemble
_bid = time.strftime("%Y%m%d%H%M%S")          # build number: open tabs compare it with version.json to offer a refresh
open('../version.json', 'w').write(json.dumps({"v": _bid}) + "\n")
s = assemble(_bid)
def R(old, new, cnt=1):
    global s
    assert s.count(old) == cnt, (s.count(old), old[:80]); s = s.replace(old, new)
exec(open('parts/step19.py').read())

page=s
head='''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Your English Cheat Sheet: verb tenses, irregular verbs, grammar, your words and class notes, by Learn with Noa.">
<link rel="icon" href="favicon.svg?v=2" type="image/svg+xml">
<link rel="icon" href="favicon-32.png?v=2" sizes="32x32" type="image/png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body data-auth="out">
<script>try{if(localStorage.getItem("ncs-sync-uid"))document.body.dataset.auth="in";}catch(e){}</script>
'''
cloud=open('cloud.js').read()
head=head.replace('</head>',open('parts/comfort_early.html').read()+'</head>')
out=head+page+'\n<script type="module">\n'+cloud+'\n</script>\n</body>\n</html>\n'
import hibi
out = hibi.rename(out)
out = out.replace('</style>', '.brand-row{font-style:normal;display:flex;align-items:baseline;gap:7px;min-width:0}.kj{font:700 15px "Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",sans-serif;color:var(--muted);letter-spacing:.06em;white-space:nowrap}footer .kj{font-size:inherit;font-weight:600}.brand .brand-row>span{font-size:26px}.brand .kj{font-size:17px}@media (max-width:480px){.brand .brand-row>span{font-size:21px}.brand .kj{font-size:14px}}\n</style>', 1)
open('site/index.html','w').write(out)
print("ok", len(out))
