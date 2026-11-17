# step175 (Nov 17 2026): "My words" + "My class notes" become one place: 📒 My notebook
# - one menu item, three tabs: Words · Class notes · Weekly summaries (old links #words, #classnotes, #notebook keep working)
# - "Save to My words" etc. now say "My notebook" everywhere (old What's new entries stay as they were)
# - a one-time pop-up tells members about the change
TABS = lambda sel: ('<div class="cn-tabs nb-tabs" role="tablist" aria-label="My notebook">'
  + ''.join('<button type="button" role="tab" data-go="%s" aria-selected="%s">%s</button>' % (g, "true" if g == sel else "false", t)
            for g, t in [("words", "Aa Words"), ("classnotes", "✏️ Class notes"), ("notebook", "📓 Summaries")]) + '</div>')

# menu: one item
R('''<button class="navbtn cn-nav" data-go="classnotes">''', '''<button class="navbtn cn-nav nb-merged" data-go="classnotes" hidden>''')
R('''<span class="w-ico" aria-hidden="true">Aa</span><span>My words</span><span class="cn-count" id="wNavCount">''',
  '''<span class="nb-ico" aria-hidden="true"></span><span>My notebook</span><span class="cn-count" id="wNavCount">''')
R('''(b.dataset.go===id||(id==="notebook"&&b.dataset.go==="classnotes"))''', '''((b.dataset.go===id&&!b.classList.contains("nb-merged"))||((id==="notebook"||id==="classnotes")&&b.dataset.go==="words"))''')

# the three pages share a title and tabs
R('''  <h1>My <em>words</em></h1>
  <p class="lede">Every word you save, newest first. Practice them with flashcards or import a list you already have.</p>''',
  '''  <h1>My <em>notebook</em></h1>
  ''' + TABS("words") + '''
  <p class="lede">Every word you save, newest first. Practice them with flashcards, or paste a list (or your notes from class) and ✨ Hibi finds the words.</p>''')
R('''  <h1>My class <em>notes</em></h1>
  <div class="cn-tabs" role="tablist" aria-label="Class notes"><button type="button" role="tab" data-go="classnotes" aria-selected="true">✏️ My notes</button><button type="button" role="tab" data-go="notebook" aria-selected="false">📓 Weekly summaries</button></div>''',
  '''  <h1>My <em>notebook</em></h1>
  ''' + TABS("classnotes"))
R('''  <h1>My class <em>notes</em></h1>
  <div class="cn-tabs" role="tablist" aria-label="Class notes"><button type="button" role="tab" data-go="classnotes" aria-selected="false">✏️ My notes</button><button type="button" role="tab" data-go="notebook" aria-selected="true">📓 Weekly summaries</button></div>''',
  '''  <h1>My <em>notebook</em></h1>
  ''' + TABS("notebook"))
R('''To write a new note, go to <b>✏️ My notes</b>.''', '''To write a new note, go to <b>✏️ Class notes</b>.''')
R('''<h2 style="margin:0">My words <span class="count" id="wCount">''', '''<h2 style="margin:0">Your words <span class="count" id="wCount">''')

# names used by Back, search and Practice
R('''prev.id==="classnotes"?"My class notes":prev.id==="words"?"My words"''', '''prev.id==="classnotes"?"My notebook":prev.id==="words"?"My notebook"''')
R('''label:"My words",text:''', '''label:"My notebook · words",text:''')
R('''label:"My class notes · "+myNotes.length''', '''label:"My notebook · class notes · "+myNotes.length''')
R('''renderCN(); toast(ok?"📥 Moved to My class notes"''', '''renderCN(); toast(ok?"📥 Moved to your class notes in My notebook"''')
R('''<span class="pr-ico" aria-hidden="true">📚</span><b>My words</b>''', '''<span class="pr-ico" aria-hidden="true">📚</span><b>Your words</b>''')
R('''<div class="pr-panel" data-pp="words" hidden><button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button><h1>My <em>words</em></h1>''',
  '''<div class="pr-panel" data-pp="words" hidden><button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button><h1>Your <em>words</em></h1>''')
R('''words:"My words",vocab:"Word packs"''', '''words:"Your words",vocab:"Word packs"''')

# tour
R('''<h2><em>My words</em>: the heart of it 💛</h2>''', '''<h2><em>My notebook</em>: the heart of it 💛</h2>''')
R('''<div><b>Got a list?</b> Paste it in <b>My words</b> and it's organized for you, with meanings and examples.</div></li>''',
  '''<div><b>Got a list?</b> Paste it in <b>My notebook</b> and it's organized for you, with meanings and examples.</div></li>
      <li><span class="wl-ico" aria-hidden="true">✏️</span><div><b>Class notes</b> live in <b>My notebook</b> too: write them during class, ✨ Hibi finds the new words for you, and <b>📓 Summaries</b> sum up each week.</div></li>''')

# everywhere else: "My words" → "My notebook" (not inside the old What's new entries)
_a = s.index('const CHANGELOG=['); _b = s.index('\n];', _a)
def _ren(t):
    for o, n in [('to My words', 'to My notebook'), ('In My words', 'In My notebook'), ('<b>My words</b>', '<b>My notebook</b>'),
                 ('L("My words","Mis palabras")', 'L("My notebook","Mi cuaderno")'), ('a Mis palabras', 'a Mi cuaderno'), ('en Mis palabras', 'en Mi cuaderno'),
                 ('the student\'s "My words"', 'the student\'s "My notebook"')]:
        t = t.replace(o, n)
    return t
s = _ren(s[:_a]) + s[_a:_b] + _ren(s[_b:])

_css = r'''
/* step175: My notebook */
nav.side .navbtn.nb-merged{display:none!important}
.nb-tabs{margin-top:2px}
.nb-intro h3{margin:0 0 6px}
.nb-intro ul{margin:8px 0 10px;padding-left:0;list-style:none;display:grid;gap:6px}
.nb-intro li{display:flex;gap:8px;align-items:flex-start;line-height:1.4}
.cn-tabs.nb-tabs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}
.cn-tabs.nb-tabs button{white-space:nowrap}
@media (max-width:600px){.cn-tabs.nb-tabs button{font-size:14px;padding:8px 10px}}
.nb-intro ul{margin:0 0 10px}
.nb-intro li{display:block;padding-left:4px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]

_js = r'''<script>
/* step175: one-time pop-up: My words + My class notes are now My notebook */
(function(){ const K="ncs-nb-intro";
  const seen=()=>{ try{ return !!localStorage.getItem(K); }catch(e){ return true; } };
  const mark=()=>{ try{ localStorage.setItem(K,JSON.stringify(1)); window.__csOnSet&&window.__csOnSet(K); }catch(e){} };
  const busy=()=>[...document.querySelectorAll('.cs-dlg,.bd-modal,#whatsnew,#welcome')].some(x=>!x.hidden&&x.getClientRects().length)||(window.__csBusy&&window.__csBusy());
  let tries=0;
  function show(){
    if(seen()||window.__csViewAsMode||window.__csPreview) return;
    if(!localStorage.getItem("ncs-welcomed")){ mark(); return; }   /* new here: nothing was renamed for them */
    if(busy()||document.hidden){ if(++tries<60) setTimeout(show,3000); return; }
    mark();
    const d=window.csDialog(`<div class="nb-intro"><h3>📒 Meet <em>My notebook</em></h3>
      <p style="margin:0">Your <b>words</b> and your <b>class notes</b> are now together in one place: <b>My notebook</b> in the menu (it used to be <b>My words</b> and <b>My class notes</b>).</p>
      <p style="margin:10px 0 4px">It has three tabs:</p>
      <ul><li><span><b>Aa Words:</b> every word you save, same as before.</span></li>
      <li><span><b>✏️ Class notes:</b> write during class and ✨ Hibi finds the new words for you.</span></li>
      <li><span><b>📓 Summaries:</b> each week of notes, summed up.</span></li></ul>
      <p class="muted" style="margin:0 0 4px;font-size:14px">Nothing was lost: all your words and notes are right where you left them.</p>
      <p class="esb" style="margin:0">Tus palabras y tus apuntes de clase ahora están juntos en <b>My notebook</b>. ¡No se perdió nada!</p>
      <div class="note-actions" style="margin-top:12px"><button class="pill-btn pill-green" type="button" data-nbgo>Open My notebook</button><button class="swap" type="button" data-nbok>Got it</button></div></div>`,{cls:"nb-intro-dlg"});
    d.el.querySelector("[data-nbgo]").addEventListener("click",()=>{ d.close(); if(window.csGo) window.csGo("words"); else location.hash="#words"; });
    d.el.querySelector("[data-nbok]").addEventListener("click",()=>d.close());
  }
  let started=false; const start=()=>{ if(started) return; started=true; setTimeout(show,5000); };
  window.addEventListener("cs-auth",e=>{ if(e.detail&&e.detail.signedIn) start(); });
  if(window.__csAuth) start();
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
