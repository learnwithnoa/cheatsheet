# step122 (Nov 15 2026): Club Library showed the same class twice when the weekly post had its Zoom link
# and the class was also added as a YouTube recording. Keep the YouTube card (it has the level), hide the Zoom copy.
R('''const id="yt_"+r.id; if(out.some(o=>o.x.url===r.url)) return;''',
  '''const id="yt_"+r.id; if(out.some(o=>o.x.url===r.url)) return;
      const rwd=r.wd!=null?+r.wd:wd; let psum="";
      for(let k=out.length-1;k>=0;k--){ const o=out[k]; if(!String(o.id).startsWith("yt_")&&o.week===wk&&+o.x.wd===rwd&&!/youtu\\.?be/.test(String(o.x.url||""))){ psum=psum||o.x.summary||""; out.splice(k,1); } }''')
R('''x:{url:r.url,title:r.name||s.name,summary:r.summary||"",''', '''x:{url:r.url,title:r.name||s.name,summary:r.summary||psum||"",''')
