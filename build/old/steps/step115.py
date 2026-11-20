# step115: the round search button in the top bar (phones): a smaller magnifier, centered by its whole shape (ring + handle)
_i=s.index('</style>')
s=s[:_i]+'''
.search-toggle .search-ico{width:12px;height:12px;border-width:2px;transform:translate(-1px,-1px)}
.search-toggle .search-ico::after{height:6px;right:-3px;bottom:-5px}
'''+s[_i:]
