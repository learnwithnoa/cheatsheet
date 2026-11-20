# step112: My coaching "Next class": Zoom link for that class, and the booking link for students with a flexible schedule
# + clicking the menu button of the page you're on takes you back to its first tab (Club → This week, 1:1 students → Overview, Hibi members → To do)
R('''<b>${nextTxt?esc(nextTxt):"Ask Noa or check your calendar invite"}</b>''','''<b>${nextTxt?esc(nextTxt):v.book?"Book your next class whenever it suits you":"Ask Noa or check your calendar invite"}</b>${v.nextZoom||v.book?`<div class="ch-nacts">${v.nextZoom&&nextTxt?`<a class="ch-go ch-zoom" href="${esc(v.nextZoom)}" target="_blank" rel="noopener">🎥 Join on Zoom ↗</a>`:""}${v.book?`<a class="ch-go" href="${esc(v.book)}" target="_blank" rel="noopener">📅 ${nextTxt?"Book another class":"Book a class"} ↗</a>`:""}</div>`:""}''')
_i=s.index('</style>'); s=s[:_i]+'''
/* step112 */
.ch-nacts{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 2px}
.ch-nacts a.ch-go{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:999px;border:1.5px solid color-mix(in srgb,var(--k) 55%,transparent);background:color-mix(in srgb,var(--k) 12%,transparent);color:var(--ink);font:800 13.5px var(--body);text-decoration:none}
.ch-nacts a.ch-go:hover{background:color-mix(in srgb,var(--k) 22%,transparent)}
.ch-nacts a.ch-zoom{background:#2D8CFF;border-color:#2D8CFF;color:#fff}
.ch-nacts a.ch-zoom:hover{background:#1A73E8}
'''+s[_i:]
_js='''<script>
/* the menu button of the page you're already on: back to that page's first tab */
document.addEventListener("click",e=>{ const b=e.target.closest("nav .navbtn[data-go]"); if(!b||b.getAttribute("aria-current")!=="true") return; const k=b.dataset.go;
  setTimeout(()=>{ try{
    if(k==="club"&&window.__clubTab) window.__clubTab("week");
    else if(k==="students"){ const f=document.querySelector("#stFrame iframe"); if(f) f.contentWindow.location.hash="#overview"; }
    else if(k==="members"){ const f=document.querySelector("#mbFrame iframe"), t=f&&f.contentDocument.querySelector("#mTabs [data-mtab]"); if(t) t.click(); }
    scrollTo({top:0});
  }catch(er){} },30); },true);
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
