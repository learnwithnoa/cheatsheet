# step140 (Nov 16 2026): Translator never dead-ends. When the smart (AI) translator is busy or fails,
# Hibi asks a plain free translator (MyMemory, no key, each student's own daily allowance) instead of showing an error.
R('''    if(e&&e.code==="rate_limited"){ trOut.textContent="The translator is busy right now. Try again in a minute, or use Google Translate or DeepL below."; }
    else if(!(e&&e.name==="AbortError")){ trOut.textContent="That didn't work. Use Google Translate or DeepL below."; }''',
  '''    if(!(e&&e.name==="AbortError")){
      let ok=false;
      try{ const r2=await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(t.slice(0,480))+"&langpair="+(dir==="es-en"?"es|en":"en|es"),{signal:ctrl.signal});
        const j2=await r2.json(); const tx=j2&&j2.responseData&&j2.responseData.translatedText;
        if(r2.ok&&tx&&!/MYMEMORY WARNING|INVALID|QUERY LENGTH/i.test(tx)){ const clean=String(tx).replace(/&#39;/g,"’").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
          trOut.innerHTML=esc(clean)+'<span class="tr-also">Quick translation (the smart translator is busy). For more options, try Google Translate or DeepL below.</span>';
          trOut.dataset.tr=clean; trOut.dataset.en= dir==="es-en"? clean : t; ok=true; } }catch(er){}
      if(!ok) trOut.textContent=(e&&e.code==="rate_limited")?"The translator is busy right now. Try again in a minute, or use Google Translate or DeepL below.":"That didn't work. Use Google Translate or DeepL below.";
    }''')
