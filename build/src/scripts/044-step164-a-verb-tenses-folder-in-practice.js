
/* step164: a "Verb tenses" folder in Practice → Grammar */
(function(){
  const TENSES=["prs","ps","pp","fut"];   /* add new tense modules here */
  const KEY="cs-gram-folder";
  function go(){
    const pan=document.querySelector('.pr-panel[data-pp="gram"]'); if(!pan) return; const grid=pan.querySelector(".pr-tiles:not(.pr-tools):not(.pr-fgrid)"); if(!grid||!grid.dataset.grouped||pan.dataset.folder) return;
    const tiles=TENSES.map(k=>grid.querySelector('[data-modtile="'+k+'"]')).filter(Boolean); if(!tiles.length) return;
    pan.dataset.folder="1";
    const f=document.createElement("button"); f.type="button"; f.className="pr-tile pr-folder"; f.dataset.gfolder="tenses";
    f.innerHTML='<span class="pr-ico" aria-hidden="true">🗂️</span><b>Verb tenses</b><span class="pr-fnames">'+tiles.map(t=>t.querySelector("b").textContent).join(" · ")+'</span><span class="pr-sub" data-fsub></span><span class="pr-bar" aria-hidden="true"><i data-fbar></i></span>';
    grid.prepend(f);
    const box=document.createElement("div"); box.className="pr-fbox"; box.hidden=true;
    box.innerHTML='<button type="button" class="pr-fback" data-gfback><span aria-hidden="true">←</span> All grammar topics</button><div class="pr-grp">🗂️ Verb tenses</div><div class="pr-tiles pr-fgrid"></div>';
    const fg=box.querySelector(".pr-fgrid"); tiles.forEach(t=>fg.appendChild(t));
    grid.before(box);
    const rest=()=>[...pan.children].filter(el=>el!==box&&!el.matches(".pr-back,h1,.lede"));
    function open(on){ box.hidden=!on; rest().forEach(el=>{ if(on){ if(!el.hidden){ el.dataset.fhid="1"; el.hidden=true; } } else if(el.dataset.fhid){ el.hidden=false; delete el.dataset.fhid; } }); try{ on?sessionStorage.setItem(KEY,"tenses"):sessionStorage.removeItem(KEY); }catch(e){} }
    function sum(){ let s=0,t=0; tiles.forEach(x=>{ const m=(x.querySelector(".pr-sub")||{}).textContent||""; const r=m.match(/(\d+)\s*\/\s*(\d+)/); if(r){ s+=+r[1]; t+=+r[2]; } });
      const sb=f.querySelector("[data-fsub]"), bar=f.querySelector("[data-fbar]"); if(sb) sb.textContent=t?s+" / "+t+" ★":tiles.length+" modules"; if(bar) bar.style.width=t?Math.round(s/t*100)+"%":"0%"; 
      /* Nov 24 2026: show on the folder which module inside it Noa recommends */
      const rn=tiles.filter(x=>x.querySelector(".pr-rec")).map(x=>(x.querySelector("b")||{}).textContent||""); let rl=f.querySelector(".pr-frec");
      if(rn.length){ if(!rl){ rl=document.createElement("span"); rl.className="pr-rec pr-recl pr-frec"; f.querySelector(".pr-bar").before(rl); } const tx="⭐ Noa recommends: "+rn.join(", "); if(rl.textContent!==tx) rl.textContent=tx; } else if(rl) rl.remove(); }
    sum(); new MutationObserver(sum).observe(fg,{subtree:true,characterData:true,childList:true});
    pan.addEventListener("click",e=>{ if(e.target.closest("[data-gfolder]")){ e.preventDefault(); open(true); window.scrollTo(0,0); } else if(e.target.closest("[data-gfback]")){ e.preventDefault(); open(false); } });
    let k=""; try{ k=sessionStorage.getItem(KEY)||""; }catch(e){} if(k) open(true);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>setTimeout(go,50)); else setTimeout(go,50); setTimeout(go,1600);
})();
