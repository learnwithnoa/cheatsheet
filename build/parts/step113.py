# step113: the 🔔 knows who was already welcomed (a welcome sent from Hibi members, or any Hibi chat with them)
R('''      data={acc,priv,club,reps,areq,mine}; if(NP) open=true;''','''      let welc={}; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-kudos-sent"); welc=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"{}")||{}; }catch(e){}
      try{ const th=window.__clubSocial&&window.__clubSocial.dms?await window.__clubSocial.dms():[], me=window.__csFire&&window.__csFire.uid(); (th||[]).forEach(t=>(t.members||[]).forEach(u=>{ if(u&&u!==me) welc[u+"-join"]=welc[u+"-join"]||1; })); }catch(e){}
      data={acc,priv,club,reps,areq,mine,welc}; if(NP) open=true;''')
R('''<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>''','''${(data.welc||{})[a.uid+"-join"]?`<span class="tn-hint tn-done">✓ Welcomed · open the chat</span>`:`<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>`}''')
_i=s.index('</style>'); s=s[:_i]+'''
.tn-hint.tn-done{color:var(--c-green,#3DDC97);opacity:.9}
'''+s[_i:]
