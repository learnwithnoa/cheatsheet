# step164 (Nov 17 2026): Practice → Grammar: the verb tenses go into one "Verb tenses" folder (present simple, past simple,
# present perfect, and future tense modules as they're added), so the Topics grid stays short as modules grow.
_js = r'''<script>
/* step164: a "Verb tenses" folder in Practice → Grammar */
(function(){
  const TENSES=["prs","ps","pp"];   /* add new tense modules here */
  const KEY="cs-gram-folder";
  function go(){
    const pan=document.querySelector('.pr-panel[data-pp="gram"]'); if(!pan) return; const grid=pan.querySelector(".pr-tiles:not(.pr-tools):not(.pr-fgrid)"); if(!grid||!grid.dataset.grouped||pan.dataset.folder) return;
    const tiles=TENSES.map(k=>grid.querySelector('[data-modtile="'+k+'"]')).filter(Boolean); if(!tiles.length) return;
    pan.dataset.folder="1";
    const f=document.createElement("button"); f.type="button"; f.className="pr-tile pr-folder"; f.dataset.gfolder="tenses";
    f.innerHTML='<span class="pr-ico" aria-hidden="true">🗂️</span><b>Verb tenses</b><span class="pr-sub" data-fsub></span><span class="pr-fnames">'+tiles.map(t=>t.querySelector("b").textContent).join(" · ")+'</span><span class="pr-bar" aria-hidden="true"><i data-fbar></i></span>';
    grid.prepend(f);
    const box=document.createElement("div"); box.className="pr-fbox"; box.hidden=true;
    box.innerHTML='<button type="button" class="pr-fback" data-gfback><span aria-hidden="true">←</span> All grammar topics</button><div class="pr-grp">🗂️ Verb tenses</div><div class="pr-tiles pr-fgrid"></div>';
    const fg=box.querySelector(".pr-fgrid"); tiles.forEach(t=>fg.appendChild(t));
    grid.before(box);
    const rest=()=>[...pan.children].filter(el=>el!==box&&!el.matches(".pr-back,h1,.lede"));
    function open(on){ box.hidden=!on; rest().forEach(el=>{ if(on){ if(!el.hidden){ el.dataset.fhid="1"; el.hidden=true; } } else if(el.dataset.fhid){ el.hidden=false; delete el.dataset.fhid; } }); try{ on?sessionStorage.setItem(KEY,"tenses"):sessionStorage.removeItem(KEY); }catch(e){} }
    function sum(){ let s=0,t=0; tiles.forEach(x=>{ const m=(x.querySelector(".pr-sub")||{}).textContent||""; const r=m.match(/(\d+)\s*\/\s*(\d+)/); if(r){ s+=+r[1]; t+=+r[2]; } });
      const sb=f.querySelector("[data-fsub]"), bar=f.querySelector("[data-fbar]"); if(sb) sb.textContent=t?s+" / "+t+" ★":tiles.length+" modules"; if(bar) bar.style.width=t?Math.round(s/t*100)+"%":"0%"; }
    sum(); new MutationObserver(sum).observe(fg,{subtree:true,characterData:true,childList:true});
    pan.addEventListener("click",e=>{ if(e.target.closest("[data-gfolder]")){ e.preventDefault(); open(true); window.scrollTo(0,0); } else if(e.target.closest("[data-gfback]")){ e.preventDefault(); open(false); } });
    let k=""; try{ k=sessionStorage.getItem(KEY)||""; }catch(e){} if(k) open(true);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>setTimeout(go,50)); else setTimeout(go,50); setTimeout(go,1600);
})();
</script>
'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
_css = r'''
/* step164: Verb tenses folder */
.pr-folder{border:1.5px solid color-mix(in srgb,var(--royal) 45%,var(--line));background:linear-gradient(160deg,color-mix(in srgb,var(--royal) 10%,var(--surface)),var(--surface))}
.pr-fnames{font-size:12.5px;color:var(--muted);line-height:1.35}
.pr-fback{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:6px;margin:0 0 12px;padding:6px 12px;border-radius:999px;border:1.5px solid var(--line);font:700 13.5px var(--body);color:var(--ink)}
.pr-fback:hover{border-color:var(--royal)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''<b>Grammar:</b> modules like the <b>present simple</b>, <b>past simple</b> and <b>present perfect</b>, in stages''', '''<b>Grammar:</b> modules like <b>there is / there are</b> and <b>could vs was able to</b>, plus a <b>Verb tenses</b> folder (present simple, past simple, present perfect), in stages''')
