# step57: compact 🔔 like the messages button, profile pill without extra space, header order
R('''const bell=`<button type="button" class="tn-bell${cnt?" has":""}"''','''const bell=`<button type="button" class="tn-bell theme-btn${cnt?" has":""}"''')
css57 = '''
/* step57: header order  + Word · 🎧 · ⏱ | 🔔 · 💬 · photo · ⚙ */
.top-in>#tNotif,.top-in>#clBellWrap{order:5}
.top-in>#dmTopBtn{order:6}
.top-in>.auth-wrap{order:7}
.top-in>#csWrap{order:10}
.top-in>#tNotif .tn-bell{position:relative;padding-inline:10px!important;gap:0;font-size:15px;border-color:var(--line)}
.top-in>#tNotif .tn-bell.has{border-color:color-mix(in srgb,#E5533D 55%,var(--line))}
.top-in>#tNotif .tn-bl{display:none!important}
.top-in>#tNotif .tn-num{position:absolute;top:-5px;right:-5px;margin:0;min-width:18px;height:18px;line-height:18px;padding:0 5px;box-sizing:border-box;font:800 11px var(--body)}
html.cs-signed .top-in #authBtn{padding:0 4px!important;gap:0!important;min-width:0;justify-content:center}
html.cs-signed .top-in #authBtn #authTxt,html.cs-signed .top-in #authBtn .dot{display:none!important}
'''
_i = s.index('</style>'); s = s[:_i] + css57 + s[_i:]
