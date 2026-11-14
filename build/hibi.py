"""Rename "Cheat Sheet" → "Hibi" in visible text. Used by build_site.py and for the repo's other files."""
import re
KJ = '<b class="kj" lang="ja">日々</b>'
PAIRS = [
  ('<title>Cheat Sheet</title>', '<title>Hibi 日々</title>'),
  ('<meta name="apple-mobile-web-app-title" content="Cheat Sheet">', '<meta name="apple-mobile-web-app-title" content="Hibi">'),
  ('aria-label="Cheat Sheet, go to Home"><small>Learn with Noa</small><span>Cheat Sheet</span>', 'aria-label="Hibi, go to Home"><i class="brand-row"><span>Hibi</span>' + KJ + '<small class="brand-tag">day by day</small></i>'),
  ('<div>Cheat Sheet · by Learn with Noa</div>', '<div>Hibi ' + KJ + ' · by Noa</div>'),
  ('Welcome to your <em>Cheat Sheet</em>', 'Welcome to <em>Hibi</em> <span lang="ja">日々</span>'),
  ('Your English companion from <b>Learn with Noa</b>. It does three jobs:', 'Your English companion, made by <b>Noa</b>. It does three jobs:'),
  ('Your English Cheat Sheet', 'Hibi 日々, your daily English'),
  ('Install Cheat Sheet', 'Install Hibi'),
  ('the old Cheat Sheet', 'the old Cheat Sheet'),
]
RX = [
  (r'\b([Tt])he Cheat Sheet app\b', r'\1he Hibi app'),
  (r'\b[Tt]he Cheat Sheet\b', 'Hibi'),
  (r'\b[Yy]our Cheat Sheet\b', 'Hibi'),
  (r'\bCheat Sheet\b', 'Hibi'),
]
def rename(s):
    keep = '\x00OLD\x00'
    s = s.replace('the old Cheat Sheet', keep).replace('the Cheat Sheet is now', '\x00NOW\x00')
    for a, b in PAIRS:
        s = s.replace(a, b)
    for a, b in RX:
        s = re.sub(a, b, s)
    return s.replace(keep, 'the old Cheat Sheet').replace('\x00NOW\x00', 'the Cheat Sheet is now')
