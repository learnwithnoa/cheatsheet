# step114: progress reports: Spanish section titles for Spanish reports, and the new "Your Hibi" section
R('''  function repHTML(r,forPrint){
    const L=(arr,f)=>(arr||[]).length?arr.map(f).join(""):"";''','''  function repHTML(r,forPrint){
    const L=(arr,f)=>(arr||[]).length?arr.map(f).join(""):"", es=r.lang==="es";
    const T=es?{c:"✅ Lo que está funcionando",t:"💬 Temas que vimos",p:"🔎 Patrones al hablar",f:"🎯 En qué enfocarte ahora",r:"📚 Recurso recomendado",m:"🔭 Mirando el mes completo",h:"📱 Tu Hibi",rec:"🎥 Tus grabaciones de clase",cl:"Clase del "}
                :{c:"✅ What’s clicking",t:"💬 Topics we covered",p:"🔎 Speaking patterns worth noting",f:"🎯 What to focus on next",r:"📚 Resource pick",m:"🔭 Zooming out: your month at a glance",h:"📱 Your Hibi",rec:"🎥 Your class recordings",cl:"Class on "};''')
for a,b in [('<h4>✅ What’s clicking</h4>','<h4>${T.c}</h4>'),('<h4>💬 Topics we covered</h4>','<h4>${T.t}</h4>'),('<h4>🔎 Speaking patterns worth noting</h4>','<h4>${T.p}</h4>'),
            ('<h4>🎯 What to focus on next</h4>','<h4>${T.f}</h4>'),('<h4>📚 Resource pick</h4>','<h4>${T.r}</h4>'),('<h4>🔭 Zooming out: your month at a glance</h4>','<h4>${T.m}</h4>'),
            ('<h4>🎥 Your class recordings</h4>','<h4>${T.rec}</h4>'),('▶ ${esc(x.label||("Class on "+fs(x.date)))}','▶ ${esc(x.label||(T.cl+fs(x.date)))}')]:
    R(a,b)
R('''      ${r.month?`<div class="ch-rp-sec"><h4>${T.m}</h4>''','''      ${(r.hibi||[]).length?`<div class="ch-rp-sec"><h4>${T.h}</h4><ul>${L(r.hibi,x=>`<li>${esc(x)}</li>`)}</ul></div>`:""}
      ${r.month?`<div class="ch-rp-sec"><h4>${T.m}</h4>''')
R('''<small>${r.sessions} ${r.sessions===1?"class":"classes"}</small>''','''<small>${r.sessions} ${r.lang==="es"?(r.sessions===1?"clase":"clases"):(r.sessions===1?"class":"classes")}</small>''')
R('''<span class="ch-k">📈 Progress report</span>''','''<span class="ch-k">📈 ${r.lang==="es"?"Reporte de progreso":"Progress report"}</span>''')
