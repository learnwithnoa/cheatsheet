# step186 (Nov 19 2026): irregular verbs as a word pack (flashcards + quiz), built from the Irregular verbs table (IRR),
# a "🃏 Practice with flashcards" pill on the Irregular verbs page, and the American / British note moved above the list.
import re as _re, json as _json
_m = _re.search(r'const IRR = (\[.*?\]);', s, _re.S)
_irr = _json.loads(_m.group(1))
_js_irr = _json.dumps(_irr, ensure_ascii=False)
R('''VOC_SETS.forEach(set=>{''', '''/* step186: the Irregular verbs table as a pack: front = base verb, back = past · participle + Spanish */
VOC_SETS.push({id:"irr", ico:"🔁", t:"Irregular verbs", sub:"go → went → gone, and '''+str(len(_irr)-1)+''' more", irr:'''+_js_irr+''', w:""});
VOC_SETS.forEach(set=>{
  if(set.irr){ const V=set.irr, sp=f=>f.split("/").map(x=>x.trim()).filter(Boolean);
    set.items=V.map((v,i)=>({w:v[0], def:v[1]+" · "+v[2], ex:v[3], alt:[], i}));
    set.qs=[]; const n=V.length;
    V.forEach((v,i)=>{ const pick=(col)=>{ const out=[], ans=sp(v[col]); for(let k=1;out.length<3&&k<n;k++){ const o=sp(V[(i+k*7)%n][col])[0]; if(!ans.includes(o)&&!out.includes(o)&&!sp(v[1]).concat(sp(v[2])).includes(o)) out.push(o); } return out; };
      set.qs.push({id:"v-irr-"+i+"-m", st:0, mco:true, q:"Past simple of “"+v[0]+"”: ___", a:sp(v[1]), o:pick(1), why:v[0]+" → "+v[1]+" → "+v[2]+" ("+v[3]+")", es:"", voc:"irr"});
      set.qs.push({id:"v-irr-"+i+"-c", st:0, q:"Past participle of “"+v[0]+"” (I have ___): ", a:sp(v[2]), o:pick(2), why:v[0]+" → "+v[1]+" → "+v[2]+" ("+v[3]+")", es:"", voc:"irr"}); });
    return; }''')
# the American / British note goes above the list, and a pill to the flashcards
_note = '''  <div class="note dismissible">Where you see two forms (<i>learned / learnt</i>), the first one is American English and the second is British. Both are correct.</div>
'''
R(_note, '')
R('''  <div class="verb-tools">
    <input id="verbSearch"''', _note + '''  <div class="note-actions" style="margin:0 0 14px"><button type="button" class="pill-btn pill-green" onclick="if(window.csVocSet){window.csVocSet('irr');setTimeout(function(){var b=document.querySelector('[data-vlearn=&quot;irr&quot;]');if(b)b.click();},60);}">🃏 Practice with flashcards</button><button type="button" class="pill-btn" onclick="if(window.csVocSet){window.csVocSet('irr');setTimeout(function(){var b=document.querySelector('[data-vqstart=&quot;irr&quot;]');if(b)b.click();},60);}">✏️ Quiz yourself</button></div>
  <div class="verb-tools">
    <input id="verbSearch"''')
# 🔊 on an irregular verb reads the three forms (not the Spanish)
_a = '''data-vsay="'+esc(it.w+". "+it.ex.replace(/[\\[\\]]/g,""))'''
assert s.count(_a) == 2, s.count(_a)
s = s.replace(_a, '''data-vsay="'+esc(v.irr?it.w+", "+it.def.replace(/ · /g,", ").replace(/ \\/ /g," or "):it.w+". "+it.ex.replace(/[\\[\\]]/g,""))''')
