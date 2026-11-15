# step123 (Nov 15 2026): Club tab for non-members, easier to read: class tiles, "good to know" (recorded, optional), perk chips
R('''      <p>Noa’s English Club is where you practice speaking with other learners every week, in a relaxed, friendly group. It’s for B1 to C1 learners: fluency and confidence first, grammar second.</p>
      <ul class="cl-lock-list">${lockSched().map(c=>`<li>${c.ico} <b>${esc(c.name)}</b> · ${esc(c.what)}<br><span class="cl-lock-when">${esc(c.when)}</span></li>`).join("")}</ul>
      <p class="cl-lock-small">🕐 All times are <b>Chile time</b> (Santiago). On Zoom, from anywhere.</p>''',
'''      <p>Practice speaking English every week with other learners, in a relaxed, friendly group.</p>
      <div class="cl-pills"><span>🎯 B1 to C1</span><span>🗣️ Fluency first, grammar second</span><span>💻 On Zoom, from anywhere</span></div>
      <div class="cl-lock-sub">Every week</div>
      <div class="cl-tiles">${lockSched().map(c=>`<div class="cl-tile"><div class="cl-tile-h"><span class="cl-tile-i" aria-hidden="true">${c.ico}</span><b>${esc(c.name)}</b></div><p>${esc(c.what)}</p><span class="cl-tile-when">${esc(c.when)}</span></div>`).join("")}</div>
      <p class="cl-lock-small">🕐 All times are <b>Chile time</b> (Santiago).</p>
      <div class="cl-good">
        <div><span aria-hidden="true">🎬</span><p><b>Every class is recorded</b>Missed one? Watch it later, whenever you want.</p></div>
        <div><span aria-hidden="true">🙌</span><p><b>Come when you can</b>Attendance is optional. Join the classes that fit your week.</p></div>
      </div>''')
R('''      <p class="cl-lock-small">Members get every weekly class, the community wall to chat with other members, all past class recordings, the weekly club podcast 🎧, and our 📸 Instagram group to keep practicing (and send memes) between classes.</p>''',
'''      <div class="cl-lock-sub">Members get</div>
      <div class="cl-pills cl-perks"><span>📅 4 live classes a week</span><span>🎬 All class recordings</span><span>💬 Community wall</span><span>🎧 Weekly club podcast</span><span>📸 Instagram group (memes welcome)</span></div>''')
_css = '''
/* step123: club card for non-members */
.cl-pills{display:flex;flex-wrap:wrap;gap:8px}
.cl-pills span{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:13.5px;font-weight:700;background:var(--surface);border:1.5px solid color-mix(in srgb,#F0A63A 35%,var(--line));line-height:1.3}
.cl-lock-sub{font:700 12px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:6px}
.cl-tiles{display:grid;grid-template-columns:1fr;gap:10px}
@media (min-width:560px){.cl-tiles{grid-template-columns:1fr 1fr}}
.cl-tile{background:var(--surface);border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:6px}
.cl-tile-h{display:flex;align-items:center;gap:8px;font-size:15.5px}
.cl-tile-i{font-size:20px}
.cl-lock .cl-tile p{font-size:14px;line-height:1.45;color:var(--muted);flex:1}
.cl-tile-when{align-self:flex-start;font:700 12px var(--mono);padding:4px 9px;border-radius:999px;background:color-mix(in srgb,#F0A63A 14%,var(--surface));border:1px solid color-mix(in srgb,#F0A63A 35%,var(--line))}
.cl-good{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.cl-good>div{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:16px;background:color-mix(in srgb,#3FB37F 10%,var(--surface));border:1.5px solid color-mix(in srgb,#3FB37F 35%,var(--line))}
.cl-good>div>span{font-size:22px;line-height:1.2}
.cl-lock .cl-good p{font-size:14px;line-height:1.45}
.cl-good b{display:block;font-size:15px;margin-bottom:2px}
.cl-perks span{border-color:color-mix(in srgb,#FF7EB6 35%,var(--line))}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
