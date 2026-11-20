# step127 (Nov 15 2026) Sweep: + Word on phones, removed signed-out text and the old Cheat Sheet line, "Save" everywhere,
# Star + Listen in the tour, same-size × on the bell window
import re as _re
# 1) + Word on phones too (icon only), in the same order as on a computer: + Word, music, timer, bell, profile
_css = '''
/* step127: + Word on phones */
@media (max-width:480px){ html body #hdrWord{display:inline-flex!important;width:33px;min-width:33px;padding:0!important;justify-content:center;align-items:center} html body #hdrWord .theme-txt{display:none} }
@media (max-width:360px){ html body #hdrWord{width:31px;min-width:31px} }
/* step127: bell window × same size as the others */
.nm-x{width:34px!important;height:34px!important}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
# 2) sign-in is required now: drop the "you're not signed in" boxes, the tour's sign-in page and the old Cheat Sheet line
for _pat in [r'\s*<div class="store-info dismissible when-out">.*?</div>\s*</div>',
             r'\s*<p class="cn-warn dismissible when-out">.*?</p>',
             r'\s*<div class="wl-warn wl-sign when-out">.*?</div>']:
    s, _n = _re.subn(_pat, '', s, flags=_re.S)
    assert _n >= 1, _pat
R('''      <p class="fb-help" style="margin:0"><b>Coming from the old Cheat Sheet?</b> Paste what you copied with <b>Copy my notes</b> there.</p>\n''', '')
# 3) one word for it: "Save"
s = s.replace('L("Add all to My words","Agregar todas a Mis palabras")', 'L("Save all to My words","Guardar todas en Mis palabras")')
R('data-sug="add">Add to my words<', 'data-sug="add">Save to My words<')
R('✅ Added to My words</h3>', '✅ Saved to My words</h3>')
R('"✓ Added <b>"+ids.length', '"✓ Saved <b>"+ids.length')
R('toast(ids.length?"Added "+ids.length+(ids.length===1?" word":" words"):"Nothing new to add");', 'toast(ids.length?"Saved "+ids.length+(ids.length===1?" word":" words"):"Nothing new to save");')
# 4) tour: Star and Listen
R('''<li><span class="wl-ico" aria-hidden="true">🎵</span><div><b>Music</b> (🎧 at the top): lo-fi, piano, rain or calm noise while you study.</div></li>''',
  '''<li><span class="wl-ico" aria-hidden="true">🎵</span><div><b>Music</b> (🎧 at the top): lo-fi, piano, rain or calm noise while you study.</div></li>
      <li><span class="wl-ico" aria-hidden="true">🔊</span><div><b>Listen</b> (next to a page title): Hibi reads the page out loud. Select some text first to hear just that part.</div></li>
      <li><span class="wl-ico" aria-hidden="true">★</span><div><b>Star</b> (next to a page title): adds that page to the <b>★ Starred</b> list in the menu, so it's one click away.</div></li>''')
