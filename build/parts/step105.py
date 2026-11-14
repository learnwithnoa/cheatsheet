# step105: pack / clock notifications: stable ids (so "read" sticks), and a ✓ to mark one as read (it stays on the list, but no longer counts)
R('''if(t&&!DIS().includes(dk)) packs.push(`<li>💳 ${t} ''','''if(t&&!DIS().includes(dk)) packs.push(`<li data-tnk="${esc("p:"+id+"|"+t.replace(/<[^>]+>/g,""))}">💳 ${t} ''')
R('''if(!DIS().includes(dk)) clocks.push(`<li>🕐 ${esc(r.text)} ''','''if(!DIS().includes(dk)) clocks.push(`<li data-tnk="${esc("c:"+p.key+"|"+r.text)}">🕐 ${esc(r.text)} ''')
R('''const rd=getRead(), keys=[...areq.map(r=>"a:"+r.id),...reps.map(r=>"r:"+(r.id||r.pid||r.at)),...packs.map(t=>"p:"+t),...clocks.map(t=>"c:"+t)].concat(unl?["u:"+unl]:[]);''',
'''const kOf=h=>(String(h).match(/data-tnk="([^"]*)"/)||[])[1]||h;
    const rd=getRead(), keys=[...areq.map(r=>"a:"+r.id),...reps.map(r=>"r:"+(r.id||r.pid||r.at)),...packs.map(kOf),...clocks.map(kOf)].concat(unl?["u:"+unl]:[]);
    const rowR=h=>{ const k=kOf(h); return rd.includes(k)?h.replace("<li ",'<li class="tn-read" '):h.replace(/<\\/li>$/,`<button type="button" class="tn-rd" data-tnrd="${k}" aria-label="Mark as read" title="Mark as read (it stays here, but stops counting in the 🔔 number)">✓</button></li>`); };''')
R('''${packs.length?`<h4>Packs</h4><ul>${packs.join("")}</ul>`:""}''','''${packs.length?`<h4>Packs</h4><ul>${packs.map(rowR).join("")}</ul>`:""}''')
R('''${clocks.length?`<h4>Clock changes</h4><ul>${clocks.join("")}</ul>`:""}''','''${clocks.length?`<h4>Clock changes</h4><ul>${clocks.map(rowR).join("")}</ul>`:""}''')
_i=s.index('</style>'); s=s[:_i]+'''
/* step105: mark one notification as read */
.tn-box li:has(> .tn-rd){padding-right:64px}
.tn-rd{position:absolute;top:50%;right:34px;transform:translateY(-50%);width:26px;height:26px;border-radius:999px;border:1.5px solid color-mix(in srgb,var(--c-green,#3DDC97) 60%,transparent);background:transparent;color:var(--c-green,#3DDC97);font:800 13px var(--body);line-height:1;cursor:pointer}
.tn-rd:hover,.tn-rd:focus-visible{background:color-mix(in srgb,var(--c-green,#3DDC97) 18%,transparent)}
.tn-box li.tn-read{opacity:.6}
'''+s[_i:]
_js='''<script>
document.addEventListener("click",e=>{ const b=e.target.closest("[data-tnrd]"); if(!b) return; e.preventDefault(); e.stopPropagation();
  let v=[]; try{ v=JSON.parse(localStorage.getItem("ncs-tnotif-read")||"[]")||[]; }catch(er){} const k=b.dataset.tnrd; if(!v.includes(k)) v.push(k);
  try{ localStorage.setItem("ncs-tnotif-read",JSON.stringify(v.slice(-300))); }catch(er){}
  const li=b.closest("li"); if(li){ li.classList.add("tn-read"); b.remove(); }
  try{ const n=Math.max(0,(+localStorage.getItem("cs-tn-count")||0)-1); localStorage.setItem("cs-tn-count",String(n)); }catch(er){}
  try{ document.dispatchEvent(new CustomEvent("cs-teacher")); }catch(er){} },true);
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
