# step165: advanced-stage buddy toys (buddy.js ITEMS with ma:"<module>")
R('''window.__csModInfo=()=>Object.values(MODS).map(md=>[md.id,md.stages.filter(st=>!st.adv).length]);''', '''window.__csModInfo=()=>Object.values(MODS).map(md=>[md.id,md.stages.filter(st=>!st.adv).length]);
  window.__csModAdv=()=>{ const o={}; Object.values(MODS).forEach(md=>{ const a=md.stages.find(st=>st.adv); if(a) o[md.id]=a.n; }); return o; };''')
R('''You don’t need it to finish the module.</span></div>''', '''You don’t need it to finish the module.'+((window.__bdAdvToy&&window.__bdAdvToy(M))?' Pass it to unlock the '+window.__bdAdvToy(M).ico+' <b>'+esc(window.__bdAdvToy(M).name)+'</b> for your study buddy.':"")+'</span></div>''')
R('''(R.missed.length?'<p class="muted">The questions you missed are saved in''', '''((()=>{ const sa=md.stages.find(x=>x.n===st&&x.adv), ty=sa&&window.__bdAdvToy&&window.__bdAdvToy(M); return ty&&R.score>=PASS&&!(oldBest>=PASS)?'<p class="ps-unlock">'+ty.ico+' You passed the Advanced stage! Your buddy got the <b>'+esc(ty.name)+'</b>.</p>':""; })())+
        (R.missed.length?'<p class="muted">The questions you missed are saved in''')
R('''Finish grammar modules for special magic toys.''', '''Finish grammar modules (and their ⭐ Advanced stages) for special toys.''')
