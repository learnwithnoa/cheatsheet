# step198 (Nov 20 2026): problems on members' phones reach Noa.
# Page errors are sent quietly to the pay helper (/api/err) and listed in Noa's 🔔 under "🐞 Problems on Hibi"
# (same error = one line with a count, who saw it, page and device). Never in View as / guest preview.
_js = r'''<script>/* step198: report page errors to Noa (no words or notes, just where it broke) */
(function(){
  if(window.__csPreview||window.__csGuest) return;
  const API="https://hibi-pay.learnwithnoa.workers.dev/api/err", seen=new Set(); let sent=0;
  const dev=()=>{ const u=navigator.userAgent; const os=/iPhone/.test(u)?"iPhone":/iPad/.test(u)?"iPad":/Android/.test(u)?"Android":/Mac OS X/.test(u)?"Mac":/Windows/.test(u)?"Windows":"other";
    const br=/CriOS|Chrome\//.test(u)&&!/Edg\//.test(u)?"Chrome":/Edg\//.test(u)?"Edge":/Firefox|FxiOS/.test(u)?"Firefox":/Safari\//.test(u)?"Safari":"browser"; return os+" · "+br+(window.matchMedia&&matchMedia("(display-mode: standalone)").matches?" · app":""); };
  const view=()=>{ const v=[...document.querySelectorAll("section.view")].find(x=>x.offsetParent); return (location.hash||"").slice(0,30)||(v&&v.id)||"home"; };
  async function send(msg,src,line){
    msg=String(msg||"").slice(0,300); src=String(src||"");
    if(!msg||/^Script error\.?$/.test(msg)||/ResizeObserver loop/.test(msg)||/extension:\/\//.test(src)) return;
    if(src&&!/hibi\.cl|localhost|github\.io|^$/.test(src)&&!/^https?:\/\/[^/]*hibi/.test(src)) return;   /* only Hibi's own code */
    const k=msg+"|"+src+"|"+line; if(seen.has(k)||sent>=5) return; seen.add(k); sent++;
    try{ const F=window.__csFire; if(!F||!F.token) return; const tok=await F.token(); if(!tok) return;
      let v=""; try{ v=(window.__csVer||"")+""; }catch(e){}
      fetch(API,{method:"POST",headers:{authorization:"Bearer "+tok,"content-type":"application/json"},body:JSON.stringify({msg,src:src.replace(/^https?:\/\/[^/]+/,""),line:line|0,view:view(),dev:dev(),v}),keepalive:true}).catch(()=>{}); }catch(e){}
  }
  window.addEventListener("error",e=>{ if(e&&e.message) send(e.message,e.filename,e.lineno); });
  window.addEventListener("unhandledrejection",e=>{ const r=e&&e.reason; const m=r&&(r.message||String(r)); if(m&&!/network|Failed to fetch|Load failed|NetworkError|aborted|offline|permission|PERMISSION|unauthenticated|signin|Please sign in/i.test(m)) send("Unhandled: "+m,r&&r.stack&&(String(r.stack).match(/https?:\/\/[^\s)]+/)||[""])[0],0); });
})();
</script>'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
# 🔔: read Noa's list
R('''      let mails=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-mailsent"); mails=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}''',
  '''      let mails=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-mailsent"); mails=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let errs=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-errors"); errs=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}''')
R('''data={acc,priv,club,reps,areq,mine,welc,trials,mails};''', '''data={acc,priv,club,reps,areq,mine,welc,trials,mails,errs};''')
R('''    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length+mlNew.length;''',
  '''    const kEr=x=>"er:"+x.key+":"+x.n, erAll=(data.errs||[]).filter(x=>x.at>wk&&((x.at>since&&!rdK.includes(kEr(x)))||x.at>RD2)), erNew=erAll.filter(x=>x.at>since&&!rdK.includes(kEr(x)));
    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length+mlNew.length+erNew.length;''')
R('''      ${mlAll.length?`<h4>📧 Emails Hibi sent</h4>''', '''      ${erAll.length?`<h4>🐞 Problems on Hibi</h4><p class="muted" style="margin:0 0 6px;font-size:12.5px">Something broke on a member's screen. Send this to Claude and it'll fix it.</p><ul>${erAll.slice(0,6).map(x=>`<li${x.at>since&&!rdK.includes(kEr(x))?"":' class="tn-read"'}>🐞 <b>${esc(x.msg)}</b>${x.n>1?` <span class="muted">(${x.n} times)</span>`:""}<br><span class="muted">${esc((x.who||[]).join(", "))} · ${esc(x.view||"")} · ${esc(x.dev||"")}${x.src?` · ${esc(x.src)}:${x.line|0}`:""} · ${ago(x.at)}</span></li>`).join("")}</ul>`:""}
      ${mlAll.length?`<h4>📧 Emails Hibi sent</h4>''')
