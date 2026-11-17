# step159 (Nov 16 2026): the "Join our Instagram group" pop-up shows once per ACCOUNT, not once per browser.
# It used a browser-only key (cs-ig-nudged), so a new device, a private window or cleared data showed it again.
# Now: synced key ncs-ig-nudged (follows the account), it waits for the account's settings to load before deciding,
# and Noa never gets it.
R('''  function igNudge(){ try{ if(!localStorage.getItem(WELC)||localStorage.getItem("cs-ig-nudged")||window.__csPreview||!feed()) return; localStorage.setItem("cs-ig-nudged","1"); }catch(e){ return; }
    setTimeout(()=>{ if(!window.csDialog) return;''',
  '''  let igAsk=false;
  const igDone=()=>{ try{ return !!(localStorage.getItem("ncs-ig-nudged")||localStorage.getItem("cs-ig-nudged")); }catch(e){ return true; } };
  function igNudge(){ try{ if(igAsk||!localStorage.getItem(WELC)||igDone()||window.__csPreview||window.__csTeacher===true||!feed()) return; }catch(e){ return; }
    igAsk=true;
    setTimeout(()=>{ igAsk=false; if(!window.csDialog||igDone()||window.__csTeacher===true||window.__csPreview) return; try{ localStorage.setItem("ncs-ig-nudged",JSON.stringify(Date.now())); localStorage.setItem("cs-ig-nudged","1"); }catch(e){}''')
R('''if(ev.target.closest("[data-a]")) setTimeout(d.close,50); }); },1500); }''', '''if(ev.target.closest("[data-a]")) setTimeout(d.close,50); }); },6000); }''')
