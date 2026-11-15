# step132 (Nov 15 2026): club "Missed …?" suggests the newest unwatched class of the week (was the oldest);
# recording cards: no "Watch on YouTube" link when the video plays right there (it has its own YouTube button);
# "✨ I enjoyed this class" comes first, bigger and yellow
import re as _re
R('''const it=list[list.length-1], voc=''', '''const it=list[0], voc=''')
_a = s.index('<div class="cl-ract"><a class="cl-watch" href="${esc(x.url)}"')
_b = s.index('</a>', _a) + 4
_link = s[_a+len('<div class="cl-ract">'):_b]
assert 'Watch on YouTube' in _link
_link2 = _link.replace('${L("Watch on YouTube","Ver en YouTube")}', '${L("Open the recording","Abrir la grabación")}')
_link2 = _re.sub(r'<svg class="cl-yt".*?</svg>', '', _link2, flags=_re.S)
s = s[:_a] + '<div class="cl-ract"><span class="cl-recfav" data-recfav="rec_${esc(it.id)}"></span>${ytId(x.url)?"":`' + _link2 + '`}' + s[_b:]
R('''${planBtn(it.date,x.wd)}<span class="cl-recfav" data-recfav="rec_${esc(it.id)}"></span>''', '''${planBtn(it.date,x.wd)}''')
_css = '''
/* step132: ✨ I enjoyed this class, first and yellow */
.cl-ract .cl-favb{font:800 14.5px var(--body)!important;padding:9px 18px!important;color:#1f1300!important;background:linear-gradient(135deg,#F7C548,#F0A63A)!important;border:0!important;box-shadow:0 2px 0 color-mix(in srgb,#F0A63A 60%,#000)}
.cl-ract .cl-favb:hover,.cl-ract .cl-favb:focus-visible{filter:brightness(1.05)}
.cl-ract .cl-favb.on{background:color-mix(in srgb,#F5C842 28%,var(--surface))!important;color:var(--ink)!important;border:1.5px solid color-mix(in srgb,#F5C842 65%,var(--line))!important;box-shadow:none}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
