# step188 (Nov 19 2026): every collapsible box on Hibi shows the same arrow (▸ closed, rotates down when open)
_css = open('parts/sumarrow.css').read() + '''
.ps-lesson>summary::after{content:none}
.cl-past>summary{justify-content:flex-start}
.cl-past>summary>span{margin-left:auto}
'''
_k = s.rindex('</style>'); s = s[:_k] + _css + s[_k:]
