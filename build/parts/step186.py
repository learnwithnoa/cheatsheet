# step186 (Nov 19 2026): irregular verbs as a word pack (flashcards + quiz), built from the Irregular verbs table (IRR),
# a "🃏 Practice with flashcards" pill on the Irregular verbs page, and the American / British note moved above the list.
import re as _re, json as _json
_m = _re.search(r'const IRR = (\[.*?\]);', s, _re.S)
_irr = _json.loads(_m.group(1))
_js_irr = _json.dumps(_irr, ensure_ascii=False)
# the most common ones, most used first (Nov 19 2026: Noa asked for an "essential" pack + "all")
_ESS = ["be","have","do","go","get","make","say","see","know","take","come","think","give","find","tell","become","leave","feel","put","bring",
        "begin","keep","hold","write","stand","hear","let","mean","meet","run","pay","sit","speak","read","lose","grow","fall","send","build","understand",
        "spend","buy","eat","drink","sleep","sell","teach","catch","choose","drive","forget","wear","win","break","swim","sing","fly","wake","cut","hurt"]
_by = {v[0]: v for v in _irr}
_ess = [_by[w] for w in _ESS if w in _by]
R('''VOC_SETS.forEach(set=>{''', '''/* step186: the Irregular verbs table as a pack: front = base verb, back = past · participle + Spanish */
VOC_SETS.push({id:"irr1", ico:"⭐", t:"Essential irregular verbs", sub:"the '''+str(len(_ess))+''' you'll use every day: be, go, have, get…", irr:'''+_json.dumps(_ess, ensure_ascii=False)+''', w:""});
VOC_SETS.push({id:"irr", ico:"🔁", t:"All irregular verbs", sub:"all '''+str(len(_irr))+''' from A to Z: arise → write", irr:'''+_js_irr+''', w:""});
VOC_SETS.forEach(set=>{
  if(set.irr){ const V=set.irr, sp=f=>f.split("/").map(x=>x.trim()).filter(Boolean);
    set.items=V.map((v,i)=>({w:v[0], def:v[1]+" · "+v[2], ex:v[3], alt:[], i}));
    set.qs=[]; const n=V.length;
    V.forEach((v,i)=>{ /* wrong options = believable mistakes with the SAME verb (Nov 19 2026: other verbs' forms made the answer obvious):
         the other column, the "regular" guess (gived / goed), base, -en, past+ed… never a form that's correct */
      const base=v[0], reg=w=>/e$/.test(w)?w+"d":/[^aeiou]y$/.test(w)?w.slice(0,-1)+"ied":w+"ed";
      const pick=(col)=>{ const out=[], other=sp(v[col===1?2:1])[0], P=sp(v[1])[0];
        const en=w=>/e$/.test(w)?w+"n":w+"en", cands=col===1?[other, reg(base), base, reg(P), en(base)]:[other, reg(base), en(base), reg(P), base];
        for(const c of cands){ if(c&&!sp(v[col]).includes(c)&&!out.includes(c)) out.push(c); if(out.length===3) break; }
        for(let k=1;out.length<3&&k<n;k++){ const o=sp(V[(i+k*7)%n][col])[0]; if(!sp(v[col]).includes(o)&&!out.includes(o)) out.push(o); }
        return out; };
      set.qs.push({id:"v-"+set.id+"-"+i+"-m", st:0, mco:true, q:"Past simple of “"+v[0]+"”: ___", a:sp(v[1]), o:pick(1), why:v[0]+" → "+v[1]+" → "+v[2]+" ("+v[3]+")", es:"", voc:set.id});
      set.qs.push({id:"v-"+set.id+"-"+i+"-c", st:0, q:"Past participle of “"+v[0]+"” (I have ___): ", a:sp(v[2]), o:pick(2), why:v[0]+" → "+v[1]+" → "+v[2]+" ("+v[3]+")", es:"", voc:set.id}); });
    return; }''')
# the American / British note goes above the list, and a pill to the flashcards
_note = '''  <div class="note dismissible">Where you see two forms (<i>learned / learnt</i>), the first one is American English and the second is British. Both are correct.</div>
'''
R(_note, '')
R('''  <div class="verb-tools">
    <input id="verbSearch"''', _note + '''  <div class="irr-prac"><b>🃏 Practice</b><div class="note-actions"><button type="button" class="pill-btn pill-green" onclick="if(window.csVocSet){window.csVocSet('irr1');setTimeout(function(){var b=document.querySelector('[data-vlearn=&quot;irr1&quot;]');if(b)b.click();},60);}">⭐ Essential verbs ('''+str(len(_ess))+''')</button><button type="button" class="swap" onclick="if(window.csVocSet){window.csVocSet('irr1');setTimeout(function(){var b=document.querySelector('[data-vqstart=&quot;irr1&quot;]');if(b)b.click();},60);}">✏️ Quiz</button></div><div class="note-actions"><button type="button" class="pill-btn" onclick="if(window.csVocSet){window.csVocSet('irr');setTimeout(function(){var b=document.querySelector('[data-vlearn=&quot;irr&quot;]');if(b)b.click();},60);}">🔁 All verbs ('''+str(len(_irr))+''')</button><button type="button" class="swap" onclick="if(window.csVocSet){window.csVocSet('irr');setTimeout(function(){var b=document.querySelector('[data-vqstart=&quot;irr&quot;]');if(b)b.click();},60);}">✏️ Quiz</button></div></div>
  <div class="verb-tools">
    <input id="verbSearch"''')
# 🔊 on an irregular verb reads the three forms (not the Spanish)
_a = '''data-vsay="'+esc(it.w+". "+it.ex.replace(/[\\[\\]]/g,""))'''
assert s.count(_a) == 2, s.count(_a)
s = s.replace(_a, '''data-vsay="'+esc(v.irr?it.w+", "+it.def.replace(/ · /g,", ").replace(/ \\/ /g," or "):it.w+". "+it.ex.replace(/[\\[\\]]/g,""))''')
_k = s.index('</style>'); s = s[:_k] + """
/* step186: practice buttons on the Irregular verbs page */
.irr-prac{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:0 0 16px}
.irr-prac>b{font-weight:800;width:100%;font-size:15px}
.irr-prac .note-actions{margin:0;flex-wrap:wrap}
""" + s[_k:]
# learn → quiz → writing drill: the old Grammar → Tools drill gets a clear name, a button on the Irregular verbs page, and a link to the flashcards
R('''<span class="pr-ico" aria-hidden="true">🔁</span><b>Irregular verbs</b><span class="pr-sub">Past simple and past participle</span>''',
  '''<span class="pr-ico" aria-hidden="true">⌨️</span><b>Irregular verbs: writing drill</b><span class="pr-sub">Type the past simple and past participle</span>''')
R('''<h1>Irregular <em>verbs</em></h1>
  <p class="lede" style="margin-bottom:12px">Write the past simple and the past participle. Press Enter to check.</p>''',
  '''<h1>Irregular verbs: <em>writing drill</em></h1>
  <p class="lede" style="margin-bottom:12px">Write the past simple and the past participle. Press Enter to check.</p>
  <p class="irr-new">New here? <button type="button" class="swap" onclick="if(window.csVocSet){window.csVocSet('irr1');setTimeout(function(){var b=document.querySelector('[data-vlearn=&quot;irr1&quot;]');if(b)b.click();},60);}">🃏 Learn them first with flashcards →</button></p>''')
_i = s.index('<div class="irr-prac">'); _j = s.index('''  <div class="verb-tools">''', _i)
_row = s[_i:_j].rstrip()
assert _row.endswith('</div></div>')
s = s[:_i] + _row[:-6] + '''<div class="note-actions"><button type="button" class="pill-btn" onclick="if(window.csPractice)window.csPractice('irr');">⌨️ Writing drill</button><span class="irr-hint">type both forms, no options</span></div></div>
''' + s[_j:]
_k = s.index('</style>'); s = s[:_k] + """
.irr-hint{font-size:13.5px;color:var(--muted,#8a93ad);align-self:center}
.irr-new{margin:-4px 0 14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:600}
""" + s[_k:]
R("""'<span class="muted">Tap to see the meaning</span>'""", """'<span class="muted">'+(v.irr?"Tap to see the past forms":"Tap to see the meaning")+'</span>'""")
