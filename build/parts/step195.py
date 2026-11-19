# step195 (Nov 19 2026): "How to use flashcards" tip wherever flashcards appear (My notebook, Irregular verbs).
# Open until the student closes it once (ncs-fchow), then it stays a one-line "💡 How to use flashcards".
R('''<div class="fc-set" role="group"''', '''<div class="fc-howslot" data-fchow="words"></div><div class="fc-set" role="group"''')
R('''<button type="button" class="irr-card" data-irrflip>''', '''${window.__fcHow?window.__fcHow("irr"):""}<button type="button" class="irr-card" data-irrflip>''')
_js = r'''<script>/* step195: how to use flashcards */
(function(){
  const K="ncs-fchow", shut=()=>{ try{ return localStorage.getItem(K)==="1"; }catch(e){ return false; } };
  const steps={
    words:["<b>Before you flip</b>, try to remember the meaning. Say it out loud or in your head.","<b>Tap the card</b> to flip it and check.","<b>Be honest:</b> tap ✓ <b>I knew it</b> only if you got it without peeking. If you weren't sure, tap ✗ <b>Didn't know</b>.","Words you don't know come back a few cards later. After ✓ <b>3 times in a row</b>, a word counts as <b>learned</b>.","Tip: tap <b>Start in Spanish</b> to practice saying the word in English."],
    irr:["<b>Before you flip</b>, say the <b>past simple</b> and <b>past participle</b> out loud (go → went → gone).","<b>Tap the card</b> to flip it and check. Tap 🔊 Listen to hear it.","<b>Be honest:</b> tap ✓ <b>I knew it</b> only if you got both forms right. Otherwise tap ✗ <b>Didn't know</b>.","Verbs you miss go to 📌 <b>Review</b>. After ✓ <b>3 times in a row</b>, you know that verb."]
  };
  window.__fcHow=k=>`<details class="fc-how"${shut()?"":" open"}><summary>💡 How to use flashcards</summary><ol>${(steps[k]||steps.words).map(x=>`<li>${x}</li>`).join("")}</ol><p class="fc-how-tip">A few minutes every day works better than one long session.</p></details>`;
  const fill=()=>document.querySelectorAll("[data-fchow]").forEach(s=>{ if(!s.firstChild) s.innerHTML=window.__fcHow(s.dataset.fchow); });
  document.addEventListener("toggle",e=>{ const d=e.target; if(d&&d.classList&&d.classList.contains("fc-how")){ try{ localStorage.setItem(K,d.open?"0":"1"); }catch(_){}
    document.querySelectorAll(".fc-how").forEach(x=>{ if(x!==d&&x.open!==d.open) x.open=d.open; }); } },true);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",fill); else fill();
})();
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
/* step195: how to use flashcards */
.fc-how{margin:0 0 14px;padding:10px 14px;border:1.5px solid var(--line);border-radius:14px;background:var(--surface);font-size:14.5px}
.fc-how>summary{font-weight:800}
.fc-how ol{margin:8px 0 0;padding-left:22px;line-height:1.5}
.fc-how li{margin:3px 0}
#fcEmpty:not([hidden])~.fc-howslot{display:none}
.fc-how-tip{margin:8px 0 0;color:var(--muted);font-size:13.5px}
'''
_k = s.index('</style>'); s = s[:_k] + _css + s[_k:]
