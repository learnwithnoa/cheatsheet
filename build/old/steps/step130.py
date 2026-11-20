# step130 (Nov 15 2026): "I want to join" crashed (me() isn't defined there) and fell back to email.
# Now it opens a message to Noa with a ready-to-send text. In "View as" it only explains (nothing is sent).
R('''const j=e.target.closest("[data-joindm]"); if(!j||!me()||G()) return; e.preventDefault();''',
  '''const j=e.target.closest("[data-joindm]"); if(!j) return;
    if(window.__csPreview){ e.preventDefault(); if(typeof window.toast==="function") window.toast("In View as nothing is sent. Students get a message to you, ready to send: “Hi Noa! I’m interested in joining…”"); return; }
    const uid=window.__csFire&&window.__csFire.uid&&window.__csFire.uid(); if(!uid||window.__csGuest||typeof window.__clubDM!=="function") return; e.preventDefault();''')
R('''    window.__clubDM&&window.__clubDM(NOA,"Noa");
    setTimeout(()=>{ const ta=document.querySelector("#clDm textarea");''',
  '''    window.__clubDM("J8D2tjQmBaaA2QN730tSfSrjfm73","Noa");   /* Noa's account */
    setTimeout(()=>{ const ta=document.querySelector("#clDm textarea");''')
