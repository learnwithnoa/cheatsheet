# step104: the recording button says it opens YouTube (the video thumbnail above it plays here)
R('''data-watched="${esc(it.id)}">▶ ${L("Watch the recording","Ver la grabación")}</a>''','''data-watched="${esc(it.id)}"><svg class="cl-yt" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg>${L("Watch on YouTube","Ver en YouTube")}<span class="cl-ext" aria-hidden="true">↗</span></a>''')
_i=s.index('</style>'); s=s[:_i]+'''
/* step104 */
.cl-watch .cl-yt{width:1.25em;height:1.25em;vertical-align:-.25em;margin-right:6px}
.cl-watch .cl-ext{margin-left:6px;opacity:.8;font-weight:700}
'''+s[_i:]
