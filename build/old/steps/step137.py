# step137 (Nov 15 2026):
# 1. window.toast was never a function (it pointed at the #toast element), so ~13 little messages around Hibi never showed,
#    e.g. "I want to join" in View as did nothing. Now window.toast shows the same pop-up message as the page's own toast().
# 2. Club card for non-members: two buttons, "💛 I want to join" (message to Noa, ready to send) and a smaller
#    "💬 Message Noa" (empty message, for questions), and a clearer line under them.
R('''<a class="cl-join-btn" href="mailto:learnwithnoa@gmail.com?subject=${encodeURIComponent("I want to join Noa's English Club 💛")}&body=${encodeURIComponent("Hi Noa! I'd like to join the club.\\n\\nMy name: "+((window.__csFire&&window.__csFire.name&&window.__csFire.name())||"")+"\\nMy level (if I know it): \\n\\n")}" data-joindm="1">💛 I want to join</a><p class="cl-lock-small">Tap the button to send Noa a message here on Hibi, and he’ll send you everything you need. Prefer email? <a href="mailto:learnwithnoa@gmail.com?subject=${encodeURIComponent("I want to join Noa's English Club 💛")}">Email Noa</a>.</p>''',
  '''<div class="cl-join-row"><a class="cl-join-btn" href="mailto:learnwithnoa@gmail.com?subject=${encodeURIComponent("I want to join Noa's English Club 💛")}" data-joindm="1">💛 I want to join</a><a class="cl-ask-btn" href="mailto:learnwithnoa@gmail.com" data-joindm="ask">💬 Message Noa</a></div><p class="cl-lock-small cl-join-note">Both open a chat with Noa here on Hibi. He’ll send you everything you need to get started.</p>''')
# the message handler: "ask" opens an empty chat; in View as / guest preview it explains instead
R('''    if(window.__csPreview){ e.preventDefault(); if(typeof window.toast==="function") window.toast("In View as nothing is sent. Students get a message to you, ready to send: “Hi Noa! I’m interested in joining…”"); return; }''',
  '''    const ask=j.dataset.joindm==="ask";
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ e.preventDefault(); window.toast(ask?"In View as nothing is sent. Students get an empty chat with you, to ask anything.":"In View as nothing is sent. Students get a message to you, ready to send: “Hi Noa! I’m interested in joining…”"); return; }
    if(window.__csGuest){ e.preventDefault(); window.toast("This is a preview: sign in to message Noa."); return; }''')
R('''    setTimeout(()=>{ const ta=document.querySelector("#clDm textarea"); if(ta&&!ta.value.trim()){''',
  '''    if(!ask) setTimeout(()=>{ const ta=document.querySelector("#clDm textarea"); if(ta&&!ta.value.trim()){''')
_css = r'''
.cl-join-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;margin-top:4px}
.cl-join-row .cl-join-btn{align-self:auto;margin-top:0}
.cl-ask-btn{font:700 14px var(--body);padding:9px 16px;border-radius:999px;background:var(--surface);color:var(--ink);text-decoration:none;border:1.5px solid color-mix(in srgb,#F0A63A 45%,var(--line))}
.cl-ask-btn:hover{border-color:#E79A1E}
.cl-lock .cl-join-note{text-align:center;margin:0}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
_js = r'''<script>
/* step137: a real window.toast (before, window.toast was just the #toast element, so these messages never showed) */
(function(){
  let t=null;
  window.toast=function(msg){ const el=document.getElementById("toast"); if(!el) return;
    el.textContent=String(msg||""); el.classList.add("show"); clearTimeout(t);
    t=setTimeout(()=>el.classList.remove("show"),Math.min(6500,2400+String(msg||"").length*35)); };
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
