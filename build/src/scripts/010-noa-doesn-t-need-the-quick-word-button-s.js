
/* Noa doesn't need the quick "+ Word" button; students keep it */
(function(){ function t(){ const b=document.getElementById("hdrWord"); if(b) b.hidden=!!window.__csTeacher&&!window.__csPreview; }
  document.addEventListener("cs-teacher",t); document.addEventListener("cs-preview",t); setTimeout(t,1500); })();
