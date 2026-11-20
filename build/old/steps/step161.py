# step161 (Nov 17 2026): grammar module page layout: the lesson on top, then the stages on the left and the
# "test out" card in its own little column on the right (purple), same width as the lesson; even spacing.
R('''    box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+toCard+'<div class="ps-list">'+md.stages.map(st=>{''',
  '''    box.innerHTML=(window.__psLesson?window.__psLesson(M):"")+'<div class="ps-cols'+(toCard?"":" one")+'"><div class="ps-main"><div class="ps-list">'+md.stages.map(st=>{''')
R('''md.toyName+"</b> for your buddy.")+'</p>';''', '''md.toyName+"</b> for your buddy.")+'</p></div>'+(toCard?'<aside class="ps-aside">'+toCard+'</aside>':"")+'</div>';''')
_css = r'''
/* step161: stages left, test out right */
.ps-lesson{max-width:980px;margin:0 0 16px}
.ps-cols{display:grid;grid-template-columns:minmax(0,680px) minmax(240px,284px);gap:16px;align-items:start;max-width:980px}
.ps-cols.one{grid-template-columns:minmax(0,680px)}
.ps-main{min-width:0}
.ps-aside{position:sticky;top:76px}
.ps-aside .ps-to{max-width:none;margin:0;flex-direction:column;align-items:stretch;gap:12px;padding:16px;
  background:linear-gradient(160deg,color-mix(in srgb,#8E5CD9 16%,var(--surface)),color-mix(in srgb,#8E5CD9 6%,var(--surface)));border:1.5px solid color-mix(in srgb,#8E5CD9 55%,transparent)}
.ps-aside .ps-to>div{display:flex;flex-direction:column;gap:6px}
.ps-aside .ps-to b{font-size:15.5px;line-height:1.3}
.ps-aside .ps-to .pill-btn{align-self:stretch;text-align:center;justify-content:center}
.ps-aside .ps-to.done{background:color-mix(in srgb,var(--green) 10%,var(--surface));border-color:var(--green)}
@media (max-width:980px){.ps-cols{grid-template-columns:minmax(0,1fr)}.ps-aside{position:static}.ps-list,.ps-goal{max-width:none}}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
