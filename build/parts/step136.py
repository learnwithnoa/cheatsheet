# step136 (Nov 15 2026): tidier members-only Club card for non-members.
# - Inviting headline instead of "Club members only" + the big lock (a small "🔒 Members only" tag stays).
# - The "Members get" pills repeated the schedule and "every class is recorded": the two new perks join the green boxes.
# - This week's preview: no Class material / Live board buttons (those are for members).
R('''<div class="cl-lock-h"><h2>Club members only</h2><div class="cl-lock-badge" aria-hidden="true">🔒</div></div>
      <p>Practice speaking English every week with other learners, in a relaxed, friendly group.</p>''',
  '''<div class="cl-lock-h"><h2>Practice speaking English, every week</h2><span class="cl-lock-tag">🔒 Members only</span></div>
      <p>Live conversation classes on Zoom with other learners, in a relaxed, friendly group.</p>''')
R('''        <div><span aria-hidden="true">🎬</span><p><b>Every class is recorded</b>Missed one? Watch it later, whenever you want.</p></div>
        <div><span aria-hidden="true">🙌</span><p><b>Come when you can</b>Attendance is optional. Join the classes that fit your week.</p></div>
      </div>''',
  '''        <div><span aria-hidden="true">🎬</span><p><b>Every class is recorded</b>Missed one? Watch it later.</p></div>
        <div><span aria-hidden="true">🙌</span><p><b>Come when you can</b>Join the classes that fit your week.</p></div>
        <div><span aria-hidden="true">💬</span><p><b>A community wall</b>Chat with the group between classes.</p></div>
        <div><span aria-hidden="true">🎧</span><p><b>A weekly club podcast</b>Short episodes to keep listening all week.</p></div>
      </div>''')
R('''      <div class="cl-lock-sub">Members get</div>
      <div class="cl-pills cl-perks"><span>📅 4 live classes a week</span><span>🎬 All class recordings</span><span>💬 Community wall</span><span>🎧 Weekly club podcast</span></div>
''', '')
_css = r'''
.cl-lock .cl-lock-h{align-items:flex-start}
.cl-lock h2{padding-right:0}
.cl-lock-tag{flex:none;font:700 12px var(--mono);letter-spacing:.04em;padding:5px 10px;border-radius:999px;background:var(--surface);border:1.5px solid color-mix(in srgb,#F0A63A 45%,var(--line));white-space:nowrap;margin-top:3px}
.cl-lock>p:first-of-type{margin-top:-4px}
.cl-lock .cl-good{grid-template-columns:1fr 1fr}
.cl-lock-week [data-plan],.cl-lock-week [data-board]{display:none!important}
@media (max-width:560px){.cl-lock .cl-good>div{flex-direction:column;gap:4px;padding:11px 12px}.cl-lock .cl-good p{font-size:13.5px}}
@media (max-width:480px){.cl-lock .cl-lock-h{flex-direction:column-reverse;gap:8px}.cl-lock h2{font-size:20px}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
