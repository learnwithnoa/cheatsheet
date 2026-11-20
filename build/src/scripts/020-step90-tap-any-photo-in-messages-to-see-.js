
/* step90: tap any photo in messages to see it big, with a Download button (the wall uses the same viewer) */
(function(){
  function ext(src){ const m=/^data:image\/(\w+)/.exec(src); if(m) return m[1]==="jpeg"?"jpg":m[1]; const n=/\.(gif|png|jpe?g|webp)(\?|$)/i.exec(src); return n?n[1].toLowerCase().replace("jpeg","jpg"):"jpg"; }
  async function dl(src){ const name="hibi-photo-"+new Date().toISOString().slice(0,10)+"."+ext(src);
    try{ let href=src; if(!/^data:|^blob:/.test(src)){ const r=await fetch(src,{mode:"cors"}); href=URL.createObjectURL(await r.blob()); }
      const a=document.createElement("a"); a.href=href; a.download=name; document.body.appendChild(a); window.__nmProg=true; try{ a.click(); }finally{ window.__nmProg=false; } a.remove(); if(href!==src) setTimeout(()=>URL.revokeObjectURL(href),4000);
    }catch(e){ window.open(src,"_blank","noopener"); } }
  window.__csLightbox=function(src){ if(!src) return; const prev=document.activeElement; const o=document.createElement("div"); o.className="cs-lb"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label","Photo");
    o.innerHTML='<img alt="Photo"><button type="button" class="cs-lbdl" aria-label="Download photo">⬇ Download</button><button type="button" class="cs-lbx" aria-label="Close">✕</button>';
    o.querySelector("img").src=src;
    const close=()=>{ o.remove(); window.removeEventListener("keydown",key,true); if(prev&&prev.focus) try{ prev.focus(); }catch(e){} };
    const key=e=>{ if(e.key==="Escape"){ e.stopImmediatePropagation(); e.preventDefault(); close(); } };
    o.addEventListener("click",e=>{ if(e.target.closest(".cs-lbdl")){ e.stopPropagation(); dl(src); return; } close(); });
    window.addEventListener("keydown",key,true); document.body.appendChild(o); o.querySelector(".cs-lbx").focus(); };
  document.addEventListener("click",e=>{ const im=e.target.closest("img.cl-msgimg"); if(!im||!im.src||im.naturalWidth===0) return; e.preventDefault(); e.stopPropagation(); window.__csLightbox(im.currentSrc||im.src); },true);
})();
