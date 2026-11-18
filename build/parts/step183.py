# step183 (Nov 18 2026): coming back to "1:1 students" or "Hibi members" from the menu starts again on the first tab
# (Overview / the default Hibi members tab), not the tab you were on before.
_js = r'''<script>
/* step183: teacher pages start on their first tab when you open them from the menu */
document.addEventListener("click",e=>{
  const b=e.target.closest&&e.target.closest('nav.side [data-go="students"], nav.side [data-go="members"]'); if(!b) return;
  const id=b.dataset.go, v=document.getElementById("v-"+id); if(v&&!v.hidden) return;   /* already there: leave it */
  const f=document.querySelector("#"+(id==="students"?"stFrame":"mbFrame")+" iframe"); if(!f) return;
  try{ const w=f.contentWindow;
    if(id==="students"){ if(w.location.hash!=="#overview") w.location.hash="#overview"; }
    else if(w.__mFirstTab) w.__mFirstTab();
  }catch(er){}
},true);
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
