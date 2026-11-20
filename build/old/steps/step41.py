# 41) menu order: easier → harder, vocabulary topics under Words & sounds
import re as _re
def _regroup(cls, order):
    global s
    i = s.index('<div class="navgroup ' + cls + '">'); j = s.index('</div>', i)
    blk = s[i:j]
    head = blk[:blk.index('</h4>') + 5]
    btns = {m.group(1): m.group(0) for m in _re.finditer(r'<button class="navbtn" data-go="([^"]+)">.*?</button>', blk)}
    return i, j, head, btns
_all = {}
for _c in ['ng-start', 'ng-grammar', 'ng-words']:
    _i, _j, _h, _b = _regroup(_c, None); _all.update(_b)
def _set(cls, order):
    global s
    i, j, head, _ = _regroup(cls, None)
    s = s[:i] + head + '\n' + '\n'.join('      ' + _all[k] for k in order) + '\n    ' + s[j:]
_set('ng-start', ['basics', 'be', 'tenses', 'verbs', 'mistakes'])
_set('ng-grammar', ['pronouns', 'time', 'place', 'tofor', 'quantity', 'frequency', 'compare', 'gerund', 'usedto', 'perfect', 'modals', 'conditionals', 'passive', 'reported'])
_set('ng-words', ['phrasal', 'domake', 'false', 'pronunciation', 'numbers'])
