/* 🌈 Part of speech = color, everywhere a word is shown (Nov 23 2026): My notebook, flashcards, the word look-up and word packs.
   Same rainbow as the Library / podcast word cards: noun red, verb orange, phrasal verb yellow, adjective green, adverb cyan,
   expression indigo, slang violet, anything else grey. Every ".pos" tag gets data-pk; its word card gets the same color as a side stripe. */
(function(){
  const key=t=>{ t=String(t||"").toLowerCase();
    if(/phrasal/.test(t)) return "phrasal"; if(/\bverb/.test(t)) return "verb"; if(/noun/.test(t)) return "noun"; if(/adj/.test(t)) return "adj";
    if(/adv/.test(t)) return "adv"; if(/slang/.test(t)) return "slang"; if(/idiom|expression|phrase|collocation|saying|interjection|exclamation/.test(t)) return "expr"; return "other"; };
  window.__posKey=key;
  function paint(root){
    (root||document).querySelectorAll(".pos:not([data-pk])").forEach(el=>{ const k=key(el.textContent); el.dataset.pk=k; const c=el.closest(".wcard"); if(c) c.dataset.pk=k; });
    /* word packs have no word type stored: work it out like the Library cards do */
    if(window.__clVocPos) (root||document).querySelectorAll(".vs-item:not([data-pk])").forEach(it=>{ const b=it.querySelector(".vs-item-top b"), d=it.querySelector("p"); if(!b) return;
      const k=window.__clVocPos({w:b.textContent,tr:d?d.textContent:""}), l=(window.__clPosLabels||{})[k]||"";
      it.dataset.pk=k; if(l&&!b.querySelector(".pos")) b.insertAdjacentHTML("afterend",`<span class="pos" data-pk="${k}">${l}</span>`); });
  }
  let q=false; new MutationObserver(()=>{ if(q) return; q=true; requestAnimationFrame(()=>{ q=false; try{ paint(); }catch(e){} }); }).observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(paint,500);
})();
