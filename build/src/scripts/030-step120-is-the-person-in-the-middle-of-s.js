
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
