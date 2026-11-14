# step97: Recommend before Listen; class-note buttons as pills; "Move to my notes" says it also finds the new words
R('''      const sb=v.querySelector(".vhead .star-btn"); if(sb) sb.insertAdjacentElement("beforebegin",bar); else { const h=v.querySelector("h1"); if(h) h.insertAdjacentElement("afterend",bar); else v.prepend(bar); }''',
  '''      const lb=v.querySelector(".vhead .cs-read"), sb=v.querySelector(".vhead .star-btn"); if(lb) lb.insertAdjacentElement("beforebegin",bar); else if(sb) sb.insertAdjacentElement("beforebegin",bar); else { const h=v.querySelector("h1"); if(h) h.insertAdjacentElement("afterend",bar); else v.prepend(bar); }''')
R('''  document.addEventListener("cs-teacher",recButtons);''','''  /* keep 💡 Recommend first, then 🔊 Listen, then ☆ Star (Listen can arrive a moment later) */
  setInterval(()=>{ document.querySelectorAll(".vhead .rec-bar").forEach(r=>{ const l=r.closest(".vhead").querySelector(".cs-read"); if(l&&(r.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_PRECEDING)) l.insertAdjacentElement("beforebegin",r); }); },1500);
  document.addEventListener("cs-teacher",recButtons);''')
R('''data-cnwords="'+x.id+'" title="Find new words and expressions in this note">✨ Find words</button><button class="del edit" type="button" data-cncopy="'+x.id+'">Copy</button><button class="del edit" type="button" data-cnedit="'+x.id+'">Edit</button><button class="del" type="button" data-cndel="'+x.id+'">Delete</button>''',
  '''data-cnwords="'+x.id+'" title="Find new words and expressions in this note">✨ Find words</button><button class="del edit" type="button" data-cncopy="'+x.id+'">📋 Copy</button><button class="del edit" type="button" data-cnedit="'+x.id+'">✏️ Edit</button><button class="del cn-delb" type="button" data-cndel="'+x.id+'">🗑️ Delete</button>''')
R('''title="Add this note to My class notes and start a fresh one">📥 Move to my notes</button>''','''title="Add this note to My class notes, find its new words for you, and start a fresh one">📥 Move to my notes + ✨ find words</button>''')
R('''When the class is over, press <b>Move to my notes</b>.</p>''','''When the class is over, press <b>Move to my notes</b>: Hibi files it and finds the new words and expressions in it, ready to add to My words.</p>''')
_css = '''
/* step97: class-note buttons as pills */
.cn-card .wbtns{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
.cn-card .wbtns button{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 13px;border-radius:999px;border:1px solid var(--line);background:color-mix(in srgb,var(--ink) 4%,var(--surface));color:var(--ink);font:700 13.5px var(--display,var(--body));white-space:nowrap;transition:background .15s,border-color .15s}
.cn-card .wbtns button:hover{border-color:var(--royal);background:color-mix(in srgb,var(--royal) 12%,var(--surface))}
.cn-card .wbtns button:focus-visible{outline:2px solid var(--royal);outline-offset:2px}
.cn-card .wbtns button[data-cnwords]{color:var(--royal)}
.cn-card .wbtns .cn-delb:hover{border-color:#E5533D;background:color-mix(in srgb,#E5533D 12%,var(--surface));color:#E5533D}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
