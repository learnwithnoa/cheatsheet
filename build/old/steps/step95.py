# step95: menu as a row of pills (narrow windows): every pill on the same line, same height, text centered
_css = '''
/* step95 */
@media (max-width:900px){
  nav.side,nav.side .navgroup{align-items:center!important}
  nav.side .navbtn:not([hidden]){margin:0!important;display:inline-flex!important;align-items:center;flex:none;line-height:1.2}
  nav.side .navbtn[hidden]{display:none!important}
}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
