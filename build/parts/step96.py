# step96: the Hibi members / Private students pills only show on phones, where the top bar has no room for their icons
_css = '''
/* step96 */
@media (min-width:641px){nav.side .t-mnav{display:none!important}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
