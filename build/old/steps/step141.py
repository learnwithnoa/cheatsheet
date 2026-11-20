# step141 (Nov 16 2026): "Noa recommends" grammar tips on My coaching open the module with that stage unlocked
# (a recommended stage opens even if the earlier stages aren't done yet; with no stage, the whole module gets the ⭐).
R('''<button type="button" class="ch-go" data-go="${t.mod?"quiz":esc(t.page)}">''',
  '''<button type="button" class="ch-go" ${t.mod?`data-gomod="${esc(t.mod)}" data-tipstage="${esc(String(t.stage||""))}"`:`data-go="${esc(t.page)}"`}>''')
_js = r'''<script>
/* step141: tapping a recommended stage saves it as Noa's recommendation, so the module opens it right away */
document.addEventListener("click",e=>{ const b=e.target.closest("[data-tipstage]"); if(!b) return;
  if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())) return;   /* View as never changes anything */
  try{ const k="ncs-modrec", r=JSON.parse(localStorage.getItem(k)||"{}")||{}, st=parseInt(b.dataset.tipstage,10);
    r[b.dataset.gomod]= st>0 ? st : "all"; localStorage.setItem(k,JSON.stringify(r)); if(window.__csOnSet) window.__csOnSet(k); }catch(er){}
},true);
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
