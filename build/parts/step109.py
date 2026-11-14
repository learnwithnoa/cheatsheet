# step109: sign-ups (last 7 days, show/hide toggle at the top of the section) · View-as eye: flat purple
# · Home: shorter (class notes and "Save a word" live on their own pages), club members get "latest class" + "this week's podcast"
# · 1:1 students: the page's own title row (with + New student / Import / Backup) replaces Home's title
R('''const all=data.acc.filter(a=>a.first&&a.first>wk).sort((a,b)=>b.first-a.first);''','''const all=data.acc.filter(a=>a.first&&a.first>Date.now()-7*864e5).sort((a,b)=>b.first-a.first);''')
R('''${joins.length||(showAll&&older.length)?`<h4>New on Hibi</h4><ul>''','''${joins.length||older.length?`<h4 class="tn-h4">New on Hibi${older.length?`<button type="button" class="tn-link tn-tog" data-tn="all">${showAll?"Hide earlier ones":`Show earlier (${older.length})`}</button>`:""}</h4><ul>''')
R('''${older.length?`<button type="button" class="tn-link" data-tn="all">${showAll?"Hide earlier ones":`Show earlier sign-ups (${older.length})`}</button>`:""}''','''''')
# club data for Home
R('''  function podHTML(f){''','''  window.__clubLatestRec=()=>{ try{ const f=window.__csClub; return f?recList(f)[0]||null:null; }catch(e){ return null; } };
  window.__clubLatestPod=()=>{ try{ return pods()[0]||null; }catch(e){ return null; } };
  function podHTML(f){''')
_css='''
/* step109 */
.tn-h4{display:flex;align-items:center;gap:10px}.tn-h4 .tn-tog{margin-left:auto;font:700 12px var(--body);text-transform:none;letter-spacing:0}
.va-eye.on{background:#8B5CF6!important;background-image:none!important;box-shadow:none!important;color:#fff!important}
.va-eye.on:hover{background:#7C4DEB!important}
#slotCnHome,#slotAwHome{display:none}
#v-students>h1{display:none}
'''
_i=s.index('</style>'); s=s[:_i]+_css+s[_i:]

# the club card on Home also shows this week's podcast
R('''      return `<button type="button" class="hc-wall" data-recgo="${esc(r.id)}">''','''      return `<button type="button" class="hc-wall" data-recgo="${esc(r.id)}">''')
R('''    hc.hidden=false; hc.className="hc-club"; setTimeout(homeWall,0);''','''    hc.hidden=false; hc.className="hc-club"; setTimeout(homeWall,0);
    const pod=(()=>{ const e=window.__clubLatestPod&&window.__clubLatestPod(); return e&&e.date&&Date.now()-new Date(String(e.date).slice(0,10)+"T12:00:00").getTime()<14*864e5?e:null; })();''')
R('''<button type="button" class="hc-wall" data-hcwall="1" hidden></button>''','''<button type="button" class="hc-wall" data-hcwall="1" hidden></button>${pod?`<button type="button" class="hc-wall" data-hcgo="recordings">🎧 ${L("This week\'s club podcast","El podcast de esta semana")}${pod.title?`: ${esc(pod.title)}`:""} →</button>`:""}''')
R('''Your word of the day, class notes and new words, all in one place.''','''Your word of the day, a thought for today and what\'s new in the club.''')
_js='''<script>
document.addEventListener("cs-club-pods",()=>{ try{ document.dispatchEvent(new CustomEvent("cs-club")); }catch(e){} },{once:true});
document.addEventListener("click",e=>{ const b=e.target.closest("[data-hcgo]"); if(!b) return; const n=document.querySelector('.navbtn[data-go="club"]'); if(n) n.click(); else location.hash="#club"; setTimeout(()=>{ window.__clubTab&&window.__clubTab(b.dataset.hcgo); },120); });
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
