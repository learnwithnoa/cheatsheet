# step191 (Nov 19 2026): every grammar tile gets a short line under its name (like Irregular verbs and the Verb tenses folder),
# so the tiles look the same. NEW MODULES: add a line to _DESC here (and if you clone a tile, replace its pr-desc text).
import re as _re
_DESC = {
  "prs": "I work, she works, do you…?",
  "ps":  "I went, did you…?, I didn't…",
  "pp":  "I've been, have you ever…?",
  "fut": "will, going to, I'm meeting…",
  "th":  "there is a…, there are some…",
  "cou": "I could swim, I was able to finish",
  "ing": "I enjoy reading, I want to go",
  "iq":  "Can you tell me where it is?",
}
def _add(m):
    k = m.group(2)
    if k not in _DESC or 'class="pr-desc"' in m.group(0): return m.group(0)
    return m.group(1) + '</b><span class="pr-desc">' + _DESC[k] + '</span>'
s, _n = _re.subn(r'(<button class="pr-tile"[^>]*data-modtile="([a-z]+)"[^>]*>.*?<b>[^<]*)</b>', _add, s)
assert _n >= 8, _n
# the folder: the module names right under its title too
R('''<b>Verb tenses</b><span class="pr-sub" data-fsub></span><span class="pr-fnames">'+tiles.map(t=>t.querySelector("b").textContent).join(" · ")+'</span>''',
  '''<b>Verb tenses</b><span class="pr-fnames">'+tiles.map(t=>t.querySelector("b").textContent).join(" · ")+'</span><span class="pr-sub" data-fsub></span>''')
_k = s.index('</style>'); s = s[:_k] + '''
.pr-desc,.pr-folder .pr-fnames{font-size:14px;color:var(--muted);line-height:1.4}
''' + s[_k:]
