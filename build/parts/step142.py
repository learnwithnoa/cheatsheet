# step142 (Nov 16 2026): a click on something inside the music window that gets redrawn while you click
# (e.g. the study room scene) no longer counts as "clicked outside", so the window stays open.
R('''  document.addEventListener("click",e=>{ if(!panel.hidden && !e.target.closest(".music-wrap")) openP(false); });''',
  '''  document.addEventListener("click",e=>{ if(!panel.hidden && e.target.isConnected && !e.target.closest(".music-wrap")) openP(false); });''')
