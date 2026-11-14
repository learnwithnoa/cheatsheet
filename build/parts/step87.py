# step87: the hidden ⚙ slot no longer leaves a gap at the end of the top row (icons line up with the page), and the top bar doesn't wait for it to appear
_css = '''
/* step87 */
html.pt-on.cs-signed .top-in>#csWrap{display:none}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('var ok=document.getElementById("tmWrap")&&document.getElementById("csWrap")&&document.getElementById("csWrap").offsetWidth>0;',
  'var ok=document.getElementById("tmWrap")&&document.getElementById("csPanel");')
