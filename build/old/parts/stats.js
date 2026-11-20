/* ---------- account stats in the profile panel + approximate practice time ---------- */
(function(){
  /* practice time: count 30-second blocks while the tab is visible and you did something in the last 2 minutes */
  let lastAct=Date.now();
  ["pointerdown","keydown","scroll","touchstart"].forEach(ev=>document.addEventListener(ev,()=>{ lastAct=Date.now(); },{passive:true,capture:true}));
  setInterval(()=>{ if(document.hidden||Date.now()-lastAct>120000) return; const t=LS.get("ncs-ptime",null)||{s:0,since:Date.now()}; t.s=(t.s|0)+30; LS.set("ncs-ptime",t); },30000);
  if(!LS.get("ncs-ptime",null)) LS.set("ncs-ptime",{s:0,since:Date.now()});
  const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmtD=t=>{ const d=new Date(t); return MON[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear(); };
  const fmtT=s=>{ const h=Math.floor(s/3600), m=Math.round((s%3600)/60); return h? h+" h "+(m?m+" min":"") : (m||0)+" min"; };
  function fill(){
    const box=document.getElementById("authStats"); if(!box) return;
    const ws=(LS.get("ncs-words",[])||[]).filter(w=>w&&w.w), ns=(LS.get("ncs-classnotes",[])||[]).filter(n=>n&&n.text);
    const fc=LS.get("ncs-fc",{})||{}, learned=Object.values(fc).filter(v=>v>=3).length;
    const bd=LS.get("ncs-buddy",{})||{}, days=Array.isArray(bd.gd)?bd.gd.length:0;
    const mods=LS.get("ncs-mods",{})||{}, ps=mods.ps||{}, st=["ps","pp"].reduce((t,k)=>t+Object.values((mods[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0), outs=["ps","pp"].filter(k=>mods[k]&&mods[k].to&&mods[k].to.sc>=15).length;
    const pt=LS.get("ncs-ptime",null)||{s:0,since:Date.now()};
    const times=[...ws.map(w=>w.t),...ns.map(n=>n.t),LS.get("ncs-joined",0),pt.since].filter(t=>t>1e12);
    const joined=times.length?Math.min(...times):Date.now();
    let buddy="";
    try{ if(window.csBuddy&&bd.on===true) buddy='<div class="as-row"><span>💛 Buddy friendship</span><b>Level '+window.csBuddy.level()+'</b></div>'; }catch(e){}
    const row=(i,l,v)=>'<div class="as-row"><span>'+i+' '+l+'</span><b>'+v+'</b></div>';
    box.innerHTML='<h4>Your Cheat Sheet</h4>'+
      row("📅","Here since",fmtD(joined))+
      row("⏱️","Practice time","≈ "+fmtT(pt.s|0)+'<small>since '+fmtD(pt.since)+'</small>')+
      row("🌱","Study days",days)+
      row("📚","Words saved",ws.length)+
      row("✅","Words learned",learned)+
      row("📝","Class notes",ns.length)+
      row("🧩","Grammar stars",st+" / 42 ★"+(outs?" 🎓":""))+
      buddy+
      '<div class="note-actions" style="margin-top:8px"><button class="swap" type="button" data-recap="now">📸 My monthly recap</button></div>';
  }
  const btn=document.getElementById("authBtn"); if(btn) btn.addEventListener("click",()=>setTimeout(fill,0));
  fill();
})();
