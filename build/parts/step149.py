# step149 (Nov 16 2026): emails about unread messages (sent by the pay helper through Resend, see pay/worker.js unreadMail).
# - Settings: "Email me about unread messages" (on by default; ncs-mailnotif = "off" turns it off; synced to the account).
# - Noa's bell: "📧 Emails Hibi sent" (from users/{Noa}/data/t-mailsent), new ones count in the 🔔 number.
# - Tour line.
R('''      let trials=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-trials"); trials=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}''',
  '''      let trials=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-trials"); trials=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let mails=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-mailsent"); mails=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}''')
R('''      data={acc,priv,club,reps,areq,mine,welc,trials};''', '''      data={acc,priv,club,reps,areq,mine,welc,trials,mails};''')
R('''    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length;''',
  '''    const mlAll=(data.mails||[]).filter(m=>m.at>wk), mlNew=mlAll.filter(m=>m.at>since);
    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length+mlNew.length;''')
R('''      ${trAll.length?`<h4>🎁 Free club trials</h4>''',
  '''      ${mlAll.length?`<h4>📧 Emails Hibi sent</h4><ul>${mlAll.slice(0,8).map(m=>`<li${m.at>since?"":' class="tn-read"'}>📧 <b>${esc(m.name||"Someone")}</b> ${m.why==="test email"?"got the test email":`got an email: unread message from ${esc(m.from||"someone")}`} <span class="muted">· ${ago(m.at)}</span>${m.uid&&m.why!=="test email"?` <button type="button" class="tn-go" data-dmto="${esc(m.uid)}" data-dmname="${esc(m.name||"")}">Chat →</button>`:""}</li>`).join("")}</ul>`:""}
      ${trAll.length?`<h4>🎁 Free club trials</h4>''')

# tour
R('''Little notes from Noa show up in the 🔔 too.''', '''Little notes from Noa show up in the 🔔 too. If a message waits unread for 12 hours, Hibi sends you one short email (you can turn that off in Settings).''')

_js = r'''<script>
/* step149: Settings switch for the unread-message emails */
(function(){
  const K="ncs-mailnotif";
  const isOn=()=>{ try{ return JSON.parse(localStorage.getItem(K)||'"on"')!=="off"; }catch(e){ return true; } };
  function add(){
    const p=document.getElementById("csPanel"); if(!p||document.getElementById("csMailN")) return;
    const F=window.__csFire; if(!F||!F.uid||!F.uid()||window.__csGuest) return;
    const anchor=document.getElementById("csResetAll"); if(!anchor) return;
    const box=document.createElement("div"); box.className="cs-sec cs-mailn";
    box.innerHTML=`<h4>Messages</h4><label class="cs-tog"><input type="checkbox" id="csMailN"><span><b>Email me about unread messages</b><small>If a message waits 12 hours, Hibi sends one short email. Never more than one a day.</small></span></label>`;
    const host=document.getElementById("csInstallSec")||anchor.closest(".cs-sec")||anchor.parentNode; host.parentNode.insertBefore(box,host);
    const cb=box.querySelector("input"); cb.checked=isOn();
    cb.addEventListener("change",()=>{
      if(window.__csPreview||(F.readOnly&&F.readOnly())){ cb.checked=isOn(); if(typeof window.toast==="function") window.toast("In View as nothing changes."); return; }
      try{ localStorage.setItem(K,JSON.stringify(cb.checked?"on":"off")); }catch(e){}
      if(typeof window.toast==="function") window.toast(cb.checked?"✓ You'll get an email if a message waits 12 hours.":"Got it: no emails about messages.");
    });
  }
  document.addEventListener("click",e=>{ if(e.target.closest("#csBtn")) setTimeout(add,30); },true);
  new MutationObserver(()=>{ const p=document.getElementById("csPanel"); if(p&&!p.hidden) add(); }).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["hidden"]});
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
