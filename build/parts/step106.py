# step106: the View as eye: closed eye normally, open eye while viewing as someone (stays in the header then, to switch person). Next to + Word.
_eyeC='<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10c2.4 3 5.4 4.5 9 4.5s6.6-1.5 9-4.5"/><path d="M6.2 13.1 4.6 15.6M12 14.5v2.9M17.8 13.1l1.6 2.5"/></svg>'
_eyeO='<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>'
R('''    const t=!!window.__csTeacher&&!window.__csPreview;
    let btn=document.getElementById("vaHdr"), pop=document.getElementById("vaPop");
    if(!t){ if(btn) btn.hidden=true; if(pop) pop.hidden=true; return; }
    if(!btn){ const anchor=document.getElementById("navTeacher"); if(!anchor) return;
      btn=document.createElement("button"); btn.type="button"; btn.id="vaHdr"; btn.className="theme-btn t-ico"; btn.title="View the site as a student"; btn.setAttribute("aria-label","View the site as a student"); btn.setAttribute("aria-expanded","false"); btn.textContent="👁";
      anchor.insertAdjacentElement("beforebegin",btn); }
    btn.hidden=false;''','''    const viewing=!!(window.__csPreview||window.__csViewAsMode), t=!!window.__csTeacher||viewing;
    let btn=document.getElementById("vaHdr"), pop=document.getElementById("vaPop");
    if(!t){ if(btn) btn.hidden=true; if(pop) pop.hidden=true; return; }
    if(!btn){ const anchor=document.getElementById("hdrWord"); if(!anchor) return;
      btn=document.createElement("button"); btn.type="button"; btn.id="vaHdr"; btn.className="theme-btn t-ico va-eye"; btn.setAttribute("aria-expanded","false");
      anchor.insertAdjacentElement("beforebegin",btn); }
    btn.innerHTML=viewing?\''''+_eyeO+'''\':\''''+_eyeC+'''\'; btn.classList.toggle("on",viewing);
    const tt=viewing?"Viewing as someone else: tap to switch to another person":"View the site as a student"; btn.title=tt; btn.setAttribute("aria-label",tt);
    btn.hidden=false;''')
_i=s.index('</style>'); s=s[:_i]+'''
/* step106: View as eye */
.va-eye{display:inline-flex;align-items:center;justify-content:center}
.va-eye.on{color:#fff;background:linear-gradient(180deg,#B18CFF,#7348D8)!important;border-color:transparent!important}
'''+s[_i:]
