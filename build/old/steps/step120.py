# step120 (Nov 14 2026):
#  1) Practice feedback box was crossed out: the page-wide ".no" class (used to cross out wrong examples) also hit ".ps-fb.no"
#  2) Hibi never refreshes itself while someone is typing something or is in the middle of a practice round,
#     and any typed text in a box with an id is kept if the page does reload (it comes back after the reload)

_css = '''
/* step120: the wrong-answer feedback box is not crossed out (only its first line is red) */
.ps-fb.no{color:inherit;font-weight:inherit;text-decoration:none}
.ps-fb.no>b{color:var(--red)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]

# the update check ("Hibi just got an update") uses the shared check
R('''const busy=()=>{ const a=document.activeElement; return !!(a&&(a.matches("textarea,input[type=text],input:not([type]),[contenteditable=true]")&&String(a.value||a.textContent||"").trim())) || !!document.querySelector(".ps-q:not([hidden]) input, dialog[open], .cs-dlg, #v-coaching:not([hidden]) .lx"); };''',
  '''const busy=()=>!!(window.__csBusy&&window.__csBusy());''')

_js = r'''<script>
/* step120: is the person in the middle of something? Then Hibi never refreshes on its own. */
window.__csBusy = function(){
  const vis = e => !!e && e.getClientRects().length > 0;
  if (document.querySelector("dialog[open], .cs-dlg, #v-coaching:not([hidden]) .lx")) return true;   /* a pop-up, or a class recap in progress */
  if (vis(document.querySelector("[data-psquit]"))) return true;                      /* a practice round is going */
  for (const e of document.querySelectorAll("textarea, input[type=text], input:not([type]), [contenteditable=true]")) {
    if (e.closest(".search-wrap, #searchBox, [data-noguard]")) continue;               /* the search box doesn't count */
    if (vis(e) && String(e.value != null ? e.value : e.textContent || "").trim()) return true;
  }
  return false;
};
/* if the page does reload anyway (e.g. they tap Refresh), bring back what they were typing */
(function(){
  const KEY = "cs-drafts";
  const save = () => { try { const d = {};
      document.querySelectorAll("textarea[id], input[type=text][id], input[id]:not([type])").forEach(e => { const v = String(e.value || ""); if (v.trim() && e.getClientRects().length && !e.closest(".ps-q, .search-wrap, #searchBox")) d[e.id] = v; });   /* not practice answers: the round starts over */
      d.__h = location.hash; d.__t = Date.now(); sessionStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  window.addEventListener("pagehide", save);
  window.addEventListener("beforeunload", save);
  let d = null; try { d = JSON.parse(sessionStorage.getItem(KEY) || "null"); sessionStorage.removeItem(KEY); } catch (e) {}
  if (!d || Date.now() - (d.__t || 0) > 10 * 60 * 1000) return;
  let tries = 0; const restore = () => { let left = 0;
    for (const id in d) { if (id.startsWith("__")) continue; const e = document.getElementById(id);
      if (e && !e.value) { e.value = d[id]; e.dispatchEvent(new Event("input", {bubbles: true})); delete d[id]; } else if (!e) left++; }
    if (left && ++tries < 20) setTimeout(restore, 500); };
  setTimeout(restore, 300);
})();
</script>
'''
_j = s.rfind('</body>'); s = (s[:_j] + _js + s[_j:]) if _j >= 0 else (s + _js)
