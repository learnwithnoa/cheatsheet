/* ---------- shareable monthly recap ---------- */
(function(){
  const MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const mkey=d=>d.getFullYear()+"-"+(d.getMonth()+1);
  function bump(){ const m=LS.get("ncs-mst",{})||{}, k=mkey(new Date()); m[k]=(m[k]|0)+1; LS.set("ncs-mst",m); }
  document.addEventListener("cs-modround",bump);
  document.addEventListener("cs-fcround",e=>{ if(!(e.detail&&e.detail.n<5)) bump(); });
  function stats(off){
    const d=new Date(); d.setDate(1); d.setMonth(d.getMonth()+off);
    const y=d.getFullYear(), m=d.getMonth(), k=y+"-"+(m+1), kk=y+"-"+String(m+1).padStart(2,"0");
    const inM=t=>{ if(!t) return false; const x=new Date(t); return x.getFullYear()===y&&x.getMonth()===m; };
    const ws=(LS.get("ncs-words",[])||[]).filter(w=>w&&w.w&&!w.sample);
    const bd=LS.get("ncs-buddy",{})||{};
    const gd=(Array.isArray(bd.gd)?bd.gd:[]).map(String).filter(g=>g.startsWith(k+"-")||g.startsWith(kk+"-"));
    const dayN=[...new Set(gd.map(g=>+g.split("-")[2]))].sort((a,b)=>a-b); let streak=0,run=0,prev=-9; dayN.forEach(n=>{ run=n===prev+1?run+1:1; prev=n; streak=Math.max(streak,run); });
    const fc=LS.get("ncs-fc",{})||{}, learned=Object.values(fc).filter(v=>v>=3).length;
    const md=LS.get("ncs-mods",{})||{}, stars=["ps","pp"].reduce((t,k)=>t+Object.values((md[k]||{}).s||{}).reduce((a,b)=>a+(b|0),0),0);
    const notes=(LS.get("ncs-classnotes",[])||[]).filter(n=>n&&inM(n.t)).length;
    const mw=ws.filter(w=>inM(w.t)).sort((a,b)=>(b.t||0)-(a.t||0));
    const on=window.csBuddy&&bd.on===true;
    return {month:MON[m], y, words:mw.length, newest:mw[0]?mw[0].w:"", total:ws.length, days:dayN.length, streak, rounds:(LS.get("ncs-mst",{})||{})[k]|0, learned, stars, notes,
      dw:bd.dw|0, dplay:bd.dplay|0, lvl:on?window.csBuddy.level():0, bname:on?window.csBuddy.name():"", room:on};
  }
  /* only things they actually did: no zeros */
  function modules(st){
    const L=[];
    const add=(ico,n,one,many)=>{ if(n>0) L.push({ico,n:String(n),t:n===1?one:many}); };
    add("📚",st.words,"new word","new words");
    add("🌱",st.days,"study day","study days");
    if(st.streak>=2) add("🔥",st.streak,"","days in a row");
    add("🎯",st.rounds,"practice round","practice rounds");
    add("✅",st.learned,"word learned","words learned");
    add("🧩",st.stars,"grammar star","grammar stars");
    add("📝",st.notes,"class note","class notes");
    add("⚔️",st.dw,"duel win","duel wins");
    if(!st.words) add("🗂️",st.total,"word in my collection","words in my collection");
    return L.slice(0,6);
  }
  const BG={night:["#0B1226","#16235A","#3A1F5C"],sunset:["#2B1055","#B8336A","#F29A3E"],ocean:["#03203C","#0E5E8A","#1FA2B5"],forest:["#0A2618","#1E5631","#5E8C3E"],candy:["#4B2378","#B02A6B","#E88AB4"]};
  const BGS=[["room","🏠","My buddy's room"],["night","🌌","Night"],["sunset","🌅","Sunset"],["ocean","🌊","Ocean"],["forest","🌲","Forest"],["candy","🍬","Candy"]];
  function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  const svgImg=async(svg,w,h)=>{ const img=new Image(); img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" ')); await new Promise((ok,no)=>{ img.onload=ok; img.onerror=no; }); return img; };
  async function draw(st,bg){
    const W=1080,H=1920, cv=document.createElement("canvas"); cv.width=W; cv.height=H; const c=cv.getContext("2d");
    const useRoom=bg==="room"&&st.room&&window.csBuddy&&window.csBuddy.scene;
    const cols=BG[useRoom?"night":bg]||BG.night;
    const g=c.createLinearGradient(0,0,W,H); g.addColorStop(0,cols[0]); g.addColorStop(.55,cols[1]); g.addColorStop(1,cols[2]); c.fillStyle=g; c.fillRect(0,0,W,H);
    for(let i=0;i<60;i++){ c.fillStyle="rgba(255,255,255,"+(Math.random()*.45+.12)+")"; const s=Math.random()*4+1; c.fillRect(Math.random()*W,Math.random()*H*.5,s,s); }
    const F='system-ui,-apple-system,"Segoe UI",Roboto,"Hiragino Sans","Noto Sans JP",sans-serif';
    c.textAlign="center"; c.fillStyle="rgba(255,255,255,.75)"; c.font="700 40px "+F; c.fillText("MY "+st.month.toUpperCase()+" "+st.y,W/2,160);
    c.fillStyle="#FFFFFF"; c.font="800 96px "+F; c.fillText("on Hibi 日々",W/2,270);
    let by=330;
    if(useRoom){
      const sh=460, sw=Math.round(sh*40/26), sx=(W-sw)/2;
      try{ c.save(); rr(c,sx,by,sw,sh,40); c.clip(); c.imageSmoothingEnabled=false; c.drawImage(await svgImg(window.csBuddy.scene(),sw,sh),sx,by,sw,sh); c.restore(); rr(c,sx,by,sw,sh,40); c.strokeStyle="rgba(255,255,255,.35)"; c.lineWidth=4; c.stroke(); }catch(e){}
      by+=sh+66; c.fillStyle="#FFFFFF"; c.font="800 50px "+F; c.fillText(st.bname+"  ·  💛 Level "+st.lvl,W/2,by); by+=50;
    } else if(st.lvl&&window.csBuddy){
      rr(c,270,by,540,470,48); c.fillStyle="rgba(255,255,255,.1)"; c.fill();
      try{ c.imageSmoothingEnabled=false; c.drawImage(await svgImg(window.csBuddy.portrait(),400,440),370,by+24,340,374); }catch(e){}
      c.fillStyle="#FFFFFF"; c.font="800 50px "+F; c.fillText(st.bname,W/2,by+440); by+=470;
      c.fillStyle="#FFD86B"; c.font="700 40px "+F; c.fillText("💛 Friendship level "+st.lvl,W/2,by+66); by+=96;
    } else by+=20;
    let ms=modules(st); const cw=440, ch=200, gx=50, gy=28, x0=(W-cw*2-gx)/2, MINH=190;
    const fits=(n,extra)=>{ const rows=Math.ceil(n/2); return H-180-(by+extra)-gy*rows-20>=rows*MINH; };
    let showNew=!!st.newest&&fits(ms.length,128);
    while(ms.length>2&&!fits(ms.length,showNew?128:0)) ms=ms.slice(0,ms.length-(ms.length%2?1:2));
    if(showNew){ const y=by+20; rr(c,x0,y,cw*2+gx,120,36); c.fillStyle="rgba(255,255,255,.14)"; c.fill(); c.fillStyle="rgba(255,255,255,.7)"; c.font="600 30px "+F; c.fillText("Newest word this month",W/2,y+46); c.fillStyle="#FFFFFF"; c.font="800 48px "+F; c.fillText("“"+String(st.newest).slice(0,28)+"”",W/2,y+98); by=y+120+8; }
    const avail=H-180-by-20, rows=Math.ceil(ms.length/2), chh=Math.max(MINH,Math.min(ch,Math.floor((avail-gy*rows)/Math.max(1,rows))));
    ms.forEach((k,i)=>{ const last=i===ms.length-1&&ms.length%2===1, x=last?(W-cw)/2:x0+(i%2)*(cw+gx), y=by+20+Math.floor(i/2)*(chh+gy);
      rr(c,x,y,cw,chh,36); c.fillStyle="rgba(255,255,255,.12)"; c.fill();
      c.fillStyle="#FFFFFF"; c.font="50px "+F; c.fillText(k.ico,x+cw/2,y+chh*.33); c.font="800 64px "+F; c.fillText(k.n,x+cw/2,y+chh*.66); c.fillStyle="rgba(255,255,255,.75)"; c.font="600 29px "+F; c.fillText(k.t,x+cw/2,y+chh*.87); });
    if(!ms.length){ c.fillStyle="#FFFFFF"; c.font="700 46px "+F; c.fillText("A fresh start.",W/2,by+120); c.fillStyle="rgba(255,255,255,.75)"; c.font="600 36px "+F; c.fillText("Next month is yours 💪",W/2,by+176); }
    c.fillStyle="#FFFFFF"; c.font="700 40px "+F; c.fillText("Hibi 日々 by Noa",W/2,H-110); c.fillStyle="rgba(255,255,255,.7)"; c.font="600 34px "+F; c.fillText("@learnwithnoa",W/2,H-62);
    return cv;
  }
  async function open(off){
    const st=stats(off); let bg=localStorage.getItem("ncs-recap-bg")||(st.room?"room":"night"); if(bg==="room"&&!st.room) bg="night";
    const fname="hibi-"+st.month.toLowerCase()+"-"+st.y+".png", canShare=!!(navigator.canShare&&window.File);
    const dl=csDialog('<h3 style="margin:0 0 10px">📸 Your '+esc(st.month)+' recap</h3><img id="rcImg" alt="Your '+esc(st.month)+' recap" style="width:100%;max-width:300px;aspect-ratio:9/16;display:block;margin:0 auto 12px;border-radius:14px;background:#16235A">'+
      '<div class="rc-bgs" role="group" aria-label="Background">'+BGS.filter(b=>b[0]!=="room"||st.room).map(b=>'<button type="button" class="rc-bg" data-rcbg="'+b[0]+'" aria-pressed="'+(b[0]===bg)+'" title="'+b[2]+'"><span aria-hidden="true">'+b[1]+'</span> '+b[2]+'</button>').join("")+'</div>'+
      '<p class="muted" style="margin:10px 0 12px;font-size:14px">Share it in your Instagram stories and tag <b>@learnwithnoa</b>! 💛</p>'+
      '<div class="note-actions" style="justify-content:center">'+(canShare?'<button class="pill-btn pill-green" type="button" data-rcshare>Share</button>':"")+'<a class="pill-btn'+(canShare?"":" pill-green")+'" id="rcDl" download="'+fname+'" style="text-decoration:none">Download</a>'+(off===0?'<button class="swap" type="button" data-rcprev>Last month</button>':'')+'</div>',{cls:"rc-dlg"});
    let url="";
    const paint=async()=>{ url=(await draw(st,bg)).toDataURL("image/png"); const im=dl.el.querySelector("#rcImg"); if(im) im.src=url; const a=dl.el.querySelector("#rcDl"); if(a) a.href=url; };
    await paint();
    dl.el.addEventListener("click",async e=>{
      const b=e.target.closest("[data-rcbg]"); if(b){ bg=b.dataset.rcbg; try{ localStorage.setItem("ncs-recap-bg",bg); }catch(er){} dl.el.querySelectorAll("[data-rcbg]").forEach(x=>x.setAttribute("aria-pressed",x===b)); await paint(); return; }
      if(e.target.closest("[data-rcprev]")){ dl.close(); open(-1); return; }
      if(!e.target.closest("[data-rcshare]")) return;
      try{ const blob=await (await fetch(url)).blob(); const f=new File([blob],fname,{type:"image/png"}); if(navigator.canShare({files:[f]})) await navigator.share({files:[f],title:"My "+st.month+" on Hibi"}); else { const a=document.createElement("a"); a.href=url; a.download=fname; a.click(); } }catch(er){}
    });
  }
  window.csRecap=open;
  document.addEventListener("click",e=>{ const b=e.target.closest("[data-recap]"); if(!b) return; e.preventDefault(); open(b.dataset.recap==="prev"?-1:0); });
  /* at the start of a month, the buddy offers last month's recap (once) */
  setTimeout(()=>{ try{
    const d=new Date(); if(d.getDate()>7) return;
    const p=new Date(); p.setDate(1); p.setMonth(p.getMonth()-1); const pk=mkey(p);
    if(localStorage.getItem("cs-recap-offer")===pk) return;
    const st=stats(-1); if(!st.words&&!st.days&&!st.rounds) return;
    localStorage.setItem("cs-recap-offer",pk);
    if(window.csBuddy&&window.csBuddy.say) window.csBuddy.say("📸 Your <b>"+st.month+"</b> recap is ready! Want to see it?",'<button class="bd-b go" type="button" data-recap="prev">See my recap</button>',12000);
  }catch(e){} },7000);
})();
