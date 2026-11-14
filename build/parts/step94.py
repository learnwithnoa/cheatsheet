# step94: every dropdown on Hibi uses the same arrow, a comfortable distance from the edge (like the teacher pages)
_css = '''
/* step94: dropdown arrows */
select:not([multiple]):not([size]){-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:right 14px center!important;background-size:11px 7px!important;padding-right:36px!important;cursor:pointer}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
