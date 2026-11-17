# step171 (Nov 17 2026): clearer AI errors (daily limit vs too slow), and "Find words" in a class note shows its message right under the note's buttons
R('''  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); }
  b.disabled=false; b.textContent="✨ Find my words";
  if(!Array.isArray(arr)){ impPrev.innerHTML="Couldn't read that right now. Try again, or use <b>Import exactly as pasted</b> below."; return; }''',
  '''  let aiErr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); aiErr=e; }
  b.disabled=false; b.textContent="✨ Find my words";
  if(!Array.isArray(arr)){ impPrev.innerHTML=window.__csAiWhy(aiErr)+" For now, you can use <b>Import exactly as pasted</b> below."; return; }''')
R('''  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); }
  if(!Array.isArray(arr)){ if(manual){ box.innerHTML='<p class="muted" style="margin:0">Couldn\\'t check this note right now. Try again in a minute.</p>'; } else box.hidden=true; return; }''',
  '''  let aiErr=null;
  try{ const r=await window.__csSample(p); arr=aiJSON(r&&r.text); }catch(e){ console.warn(e); aiErr=e; }
  if(!Array.isArray(arr)){ if(manual){ box.innerHTML='<p class="muted" style="margin:0">'+window.__csAiWhy(aiErr)+'</p>'; } else box.hidden=true; return; }''')
R('''box.setAttribute("aria-live","polite"); card.appendChild(box); } if(window.csSuggestWords)''',
  '''box.setAttribute("aria-live","polite"); const hd=card.querySelector(".cn-head"); if(hd) hd.after(box); else card.appendChild(box); } if(window.csSuggestWords)''')
_js = r'''<script>
/* step171: why the AI didn't answer, in plain words */
window.__csAiWhy=function(e){ const c=e&&(e.code||e.message)||"";
  if(/rate_limited|429|quota/i.test(c)) return "😴 The AI helper has used up its free limit for today. It resets overnight, so please try again tomorrow.";
  if(/timeout/i.test(c)) return "⏳ The AI took too long to answer. Try again, or try with a shorter piece of text.";
  return "The AI didn't answer this time. Try again in a minute."; };
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
