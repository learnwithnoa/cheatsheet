# step63: same X everywhere, notifications "mark all as read", music in two groups, buddy v47
css63 = '''
/* step63: one close button for every pop-up in the top bar */
.qa-x,.cs-x,.cl-prof-x,.tn-x{all:unset;box-sizing:border-box;cursor:pointer;width:34px!important;height:34px!important;padding:0!important;display:grid!important;place-items:center;border-radius:50%!important;font-size:24px!important;line-height:1!important;color:var(--muted)}
.cl-prof-x{font-size:18px!important}
.qa-x:hover,.cs-x:hover,.cl-prof-x:hover,.tn-x:hover,.qa-x:focus-visible,.cs-x:focus-visible,.cl-prof-x:focus-visible,.tn-x:focus-visible{background:color-mix(in srgb,var(--ink) 9%,transparent);color:var(--ink)}
.tn-h .tn-x{margin-left:2px}
/* profile photo preview: buddy or initials */
.ap-prev .ap-bd{display:block;width:100%;height:100%}.ap-prev .ap-bd svg{width:100%;height:100%;display:block}
.ap-prev .ap-ini{display:grid;place-items:center;width:100%;height:100%;font:900 22px var(--body);color:#fff;background:linear-gradient(135deg,#4F9DF0,#7C5CF2)}
.g-ico svg{width:100%;height:100%;display:block}
/* study music in two groups */
#musicModes .mm-cat{flex-basis:100%;margin:6px 0 0;font:800 11.5px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
#musicModes .mm-cat:first-child{margin-top:0}
'''
_i = s.index('</style>'); s = s[:_i] + css63 + s[_i:]
R('''          <button type="button" class="chip" role="radio" data-mm="lofi">Lo-fi beats</button>''','''          <span class="mm-cat" aria-hidden="true">🎵 Music</span>
          <button type="button" class="chip" role="radio" data-mm="lofi">Lo-fi beats</button>''')
R('''          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>''','''          <span class="mm-cat" aria-hidden="true">🌊 Sounds</span>
          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>''')
R('<script src="buddy.js?v=46" defer></script>','<script src="buddy.js?v=47" defer></script>')
# notifications: X instead of "Close", no "only you see this", and "Mark all as read" that really clears the number
R('''<div class="tn-box"><div class="tn-h"><b>🔔 Notifications</b><span class="tn-only">only you see this</span><span style="flex:1"></span>${undoPrev!=null?`<button type="button" class="tn-btn" data-tn="undo">↩ Undo “Got it”</button>`:""}${joins.length||clubNew.length?`<button type="button" class="tn-btn" data-tn="seen">Got it ✓</button>`:""}<button type="button" class="tn-btn" data-tn="hide">Close</button></div>''','''<div class="tn-box"><div class="tn-h"><b>🔔 Notifications</b><span style="flex:1"></span>${undoPrev!=null?`<button type="button" class="tn-btn" data-tn="undo">↩ Undo</button>`:""}${cnt?`<button type="button" class="tn-btn" data-tn="seen">✓ Mark all as read</button>`:""}<button type="button" class="tn-x" data-tn="hide" aria-label="Close">×</button></div>''')
R('''    const mineNew=(data.mine||[]).filter(n=>n.at>since);
    const cnt=areq.length+joins.length+packs.length+clocks.length+(unl?1:0)+clubNew.length+reps.length+mineNew.length;''','''    const mineNew=(data.mine||[]).filter(n=>n.at>since);
    /* things that stay on the list until they're dealt with (packs, requests…) only count until you mark them as read */
    const rd=getRead(), keys=[...areq.map(r=>"a:"+r.id),...reps.map(r=>"r:"+(r.id||r.pid||r.at)),...packs.map(t=>"p:"+t),...clocks.map(t=>"c:"+t)].concat(unl?["u:"+unl]:[]);
    curKeys=keys;
    const cnt=keys.filter(k=>!rd.includes(k)).length+joins.length+clubNew.length+mineNew.length;''')
R('''  function getSeen(){''','''  const READ="ncs-tnotif-read"; let curKeys=[], undoRead=null;
  function getRead(){ try{ const v=JSON.parse(localStorage.getItem(READ)||"[]"); return Array.isArray(v)?v:[]; }catch(e){ return []; } }
  function setRead(v){ try{ localStorage.setItem(READ,JSON.stringify(v.slice(-300))); }catch(e){} }
  function getSeen(){''')
R('''    else if(k==="seen"){ undoPrev=getSeen(); setSeen(Date.now()); open=true; }
    else if(k==="undo"){ setSeen(undoPrev||0); undoPrev=null; open=true; }''','''    else if(k==="seen"){ undoPrev=getSeen(); undoRead=getRead(); setSeen(Date.now()); setRead([...new Set(undoRead.concat(curKeys))]); open=true; }
    else if(k==="undo"){ setSeen(undoPrev||0); if(undoRead) setRead(undoRead); undoPrev=null; undoRead=null; open=true; }''')
