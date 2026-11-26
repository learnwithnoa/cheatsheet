
/* Noa only: notifications at the top of Home (new sign-ups, packs that need attention) */
(function(){
  const NP=/[?&]np=1/.test(location.search);   /* shown inside the 🔔 pop-up on the teacher pages */
  if(NP){ document.documentElement.classList.add("np-mode"); const bs=document.createElement("base"); bs.target="_top"; document.head.appendChild(bs); }
  const npSay=m=>{ if(NP&&window.parent!==window) try{ window.parent.postMessage(Object.assign({tn:1},m),location.origin); }catch(e){} };
  const SEEN="ncs-tnotif-seen", HIDE="cs-tnotif-hide";
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ago=t=>{ const m=Math.round((Date.now()-t)/6e4); if(m<60) return m<=1?"just now":m+" min ago"; const h=Math.round(m/60); if(h<24) return h+(h===1?" hour ago":" hours ago"); const d=Math.round(h/24); return d===1?"yesterday":d+" days ago"; };
  const dkey=()=>new Date().toDateString();
  /* notifications Noa dismissed with × (they come back if anything about them changes) */
  const DISK="ncs-tnotif-dis"; const DIS=()=>{ try{ const v=JSON.parse(localStorage.getItem(DISK)||"[]"); return Array.isArray(v)?v:[]; }catch(e){ return []; } };
  const welcome=n=>{ const f=String(n||"").trim().split(/\s+/)[0]||""; return `Hi ${f}! 👋 Welcome to Hibi, I'm really happy you're here. Have a look around: save new words, practice a bit, and say hi in the club. If you need anything, just write me here. Noa`; };
  let busy=false, data=null;
  function box(){ let b=document.getElementById("tNotif"); if(!b){ const aw=document.querySelector(".top-in .auth-wrap"); if(!aw) return null; b=document.createElement("div"); b.id="tNotif"; b.className="tn-wrap"; aw.parentNode.insertBefore(b,aw); } return b; }
  let lastLoad=0;
  setInterval(()=>{ if(!document.hidden&&window.__csTeacher&&Date.now()-lastLoad>600000) load(); },60000);
  async function load(){ lastLoad=Date.now();
    const b0=document.getElementById("tNotif");
    if(!window.__csTeacher||window.__csPreview||!window.__csTeach||!window.__csTeach.accounts){ if(b0) b0.remove(); return; }
    if(busy) return; busy=true;
    try{
      const acc=await window.__csTeach.accounts();
      let priv=[]; try{ priv=(await window.__csViewAs.students()).priv||[]; }catch(e){}
      let club=null; try{ club=window.__clubSocial?await window.__clubSocial.recent():null; }catch(e){}
      let reps=[]; try{ reps=window.__clubSocial&&window.__clubSocial.reports?await window.__clubSocial.reports():[]; }catch(e){}
      let areq=[]; try{ areq=await accessReqs(); }catch(e){}
      let mine=[]; try{ mine=window.__clubSocial&&window.__clubSocial.myNotes?await window.__clubSocial.myNotes():[]; }catch(e){}
      let trials=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-trials"); trials=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let mails=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-mailsent"); mails=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let pays=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-pays"); pays=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let errs=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-errors"); errs=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let welc={}; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-kudos-sent"); welc=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"{}")||{}; }catch(e){}
      try{ const th=window.__clubSocial&&window.__clubSocial.dms?await window.__clubSocial.dms():[], me=window.__csFire&&window.__csFire.uid(); (th||[]).forEach(t=>(t.members||[]).forEach(u=>{ if(u&&u!==me) welc[u+"-join"]=welc[u+"-join"]||1; })); }catch(e){}
      data={acc,priv,club,reps,areq,mine,welc,trials,mails,errs,pays}; if(NP) open=true;
      try{ if(new URLSearchParams(location.search).get("notif")){ open=true; history.replaceState(null,"",location.pathname+location.hash); } }catch(e){}
      paint();
    }catch(e){ console.warn("notifications",e); } finally{ busy=false; }
  }
  let showAll=false, open=false, undoPrev=null;
  const READ="ncs-tnotif-read"; let curKeys=[], undoRead=null;
  function getRead(){ try{ const v=JSON.parse(localStorage.getItem(READ)||"[]"); return Array.isArray(v)?v:[]; }catch(e){ return []; } }
  function setRead(v){ try{ localStorage.setItem(READ,JSON.stringify(v.slice(-300))); }catch(e){} }
  function getSeen(){ try{ return +JSON.parse(localStorage.getItem(SEEN)||"0")||0; }catch(e){ return 0; } }
  function setSeen(v){ try{ localStorage.setItem(SEEN,JSON.stringify(v)); }catch(e){} if(window.__csOnSet) try{ window.__csOnSet(SEEN); }catch(e){} }
  function paint(){
    const b=box(); if(!b||!data) return;
    const seen=getSeen(), wk=Date.now()-14*864e5, since=Math.max(seen,wk), RD2=Date.now()-2*864e5;
    const KIND={private:["private student","tn-p"],both:["private + club","tn-b"],club:["club member","tn-c"],new:["private, not linked yet","tn-n"],hibi:["Hibi only · not in the club","tn-n"],hibionly:["Hibi only","tn-n"],former:["left the club","tn-n"]};
    const all=data.acc.filter(a=>a.first&&a.first>Date.now()-7*864e5).sort((a,b)=>b.first-a.first);
    const rdJ=getRead(), isNewJ=a=>a.first>since&&!rdJ.includes("j:"+a.uid);
    const joins=all.filter(isNewJ), older=all.filter(a=>!isNewJ(a));
    const packs=[];
    data.priv.filter(p=>p.status!=="inactive"&&p.status!=="paused").forEach(p=>{ const v=p.view||{}, du=v.due; if(!du) return; const nm=esc(v.name), id=esc(p.key.slice(4));
      let t=""; if(du.pending) t=`<b>${nm}</b>: pack not paid yet`; else if(du.left!=null&&du.left<=0) t=`<b>${nm}</b>: pack used up`; else if(du.classesLeft!=null&&du.classesLeft<=1) t=`<b>${nm}</b>: ${du.classesLeft} class left in the pack`; else if(du.half&&du.instAt&&du.nextNo>=du.instAt) t=`<b>${nm}</b>: 2nd payment due`;
      const dk="p:"+id+"|"+t.replace(/<[^>]+>/g,"")+"|"+JSON.stringify(du); if(t&&!DIS().includes(dk)) packs.push(`<li data-tnk="${esc("p:"+id+"|"+t.replace(/<[^>]+>/g,""))}">💳 ${t} <a class="tn-go" href="private-students.html#s/${id}">Open →</a><button type="button" class="tn-dis" data-tndis="${esc(dk)}" aria-label="Hide this notification" title="Hide this (it comes back if something changes)">×</button></li>`); });
    const clocks=[]; if(typeof window.__csTzRem==="function"){ const td=new Date(), ti=td.getFullYear()+"-"+String(td.getMonth()+1).padStart(2,"0")+"-"+String(td.getDate()).padStart(2,"0");
      data.priv.filter(p=>p.status==="active"&&p.view&&p.view.tz).forEach(p=>window.__csTzRem({name:p.view.name,tz:p.view.tz,country:p.view.country},ti,21,2).forEach(r=>{ const dk="c:"+p.key+"|"+r.text; if(!DIS().includes(dk)) clocks.push(`<li data-tnk="${esc("c:"+p.key+"|"+r.text)}">🕐 ${esc(r.text)} <a class="tn-go" href="private-students.html#s/${esc(p.key.slice(4))}">Open →</a><button type="button" class="tn-dis" data-tndis="${esc(dk)}" aria-label="Hide this notification" title="Hide this">×</button></li>`); })); }
    const unl=data.acc.filter(a=>a.kind==="new").length, unA=data.acc.filter(a=>a.kind==="hibi"), una=unA.length;
    let hid=false; try{ hid=localStorage.getItem(HIDE)===dkey(); }catch(e){}
    const rdK=getRead(), kCl=a=>"cl:"+(a.pid||"")+":"+a.at, kMi=n=>"mi:"+(n.pid||n.kind||"")+":"+n.at, kTr=t=>"tr:"+t.uid+":"+Math.max(t.start||0,t.ended||0,t.joined||0), kMl=m=>"ml:"+(m.uid||"")+":"+m.at;
    const clubNew=(data.club||[]).filter(a=>a.at>since&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"&&!rdK.includes(kCl(a))), clubAll=(data.club||[]).filter(a=>a.at>wk&&a.uid!=="J8D2tjQmBaaA2QN730tSfSrjfm73"&&((a.at>since&&!rdK.includes(kCl(a)))||a.at>RD2));
    const reps=data.reps||[], areq=data.areq||[];
    const mineNew=(data.mine||[]).filter(n=>n.at>since&&!rdK.includes(kMi(n))), mineAll=(data.mine||[]).filter(n=>n.at>wk&&((n.at>since&&!rdK.includes(kMi(n)))||n.at>RD2));
    /* things that stay on the list until they're dealt with (packs, requests…) only count until you mark them as read */
    const kOf=h=>(String(h).match(/data-tnk="([^"]*)"/)||[])[1]||h;
    const rd=getRead(), keys=[...areq.map(r=>"a:"+r.id),...reps.map(r=>"r:"+(r.id||r.pid||r.at)),...packs.map(kOf),...clocks.map(kOf),...joins.map(a=>"j:"+a.uid)].concat(unl?["u:"+unl]:[]).concat(una?["ua:"+unA.map(a=>a.uid).sort().join(",")]:[]);
    const rowR=h=>{ const k=kOf(h); return rd.includes(k)?h.replace("<li ",'<li class="tn-read" '):h.replace(/<\/li>$/,`<button type="button" class="tn-rd" data-tnrd="${k}" aria-label="Mark as read" title="Mark as read (it stays here, but stops counting in the 🔔 number)">✓</button></li>`); };
    curKeys=keys;
    const trAll=(data.trials||[]).filter(t=>{ const w=Math.max(t.start||0,t.ended||0,t.joined||0); return w>wk&&((w>since&&!rdK.includes(kTr(t)))||w>RD2); }), trNew=trAll.filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>since&&!rdK.includes(kTr(t)));
    const mlAll=(data.mails||[]).filter(m=>m.at>wk&&((m.at>since&&!rdK.includes(kMl(m)))||m.at>RD2)), mlNew=mlAll.filter(m=>m.at>since&&!rdK.includes(kMl(m)));
    /* Nov 24 2026: club payments on Hibi (the pay helper writes t-pays): started paying, payment failed, cancelled */
    const kPy=x=>"py:"+x.uid+":"+x.at, pyAll=(data.pays||[]).filter(x=>x.at>wk&&((x.at>since&&!rdK.includes(kPy(x)))||x.at>RD2)), pyNew=pyAll.filter(x=>x.at>since&&!rdK.includes(kPy(x)));
    const kEr=x=>"er:"+x.key+":"+x.n, erAll=(data.errs||[]).filter(x=>x.at>wk&&((x.at>since&&!rdK.includes(kEr(x)))||x.at>RD2)), erNew=erAll.filter(x=>x.at>since&&!rdK.includes(kEr(x)));
    const cnt=keys.filter(k=>!rd.includes(k)).length+clubNew.length+mineNew.length+trNew.length+mlNew.length+erNew.length+pyNew.length;
    try{ localStorage.setItem("cs-tn-count",String(cnt)); }catch(e){} npSay({n:cnt});
    b.hidden=false;
    /* closed: a small button that opens it again */
    const bell=`<button type="button" class="tn-bell theme-btn${cnt?" has":""}" data-tn="open" aria-expanded="${open}" title="Notifications (only you see this)">🔔<span class="tn-bl">Notifications</span>${cnt?`<span class="tn-num">${cnt}</span>`:""}</button>`;
    if(!open){ b.className="tn-wrap"; b.innerHTML=bell; return; }
    b.className="tn-wrap open";
    const li=(a,old)=>{ const dm=a.kind==="club"||a.kind==="both"||a.kind==="hibi", act=dm?`data-dmto="${esc(a.uid)}" data-dmname="${esc(a.name)}" data-dmdraft="${esc(welcome(a.name))}"`:a.email?`data-tnmail="${esc(a.email)}" data-tnname="${esc(a.name)}"`:"";
      return `<li class="${old?"tn-old":""}" ${act}>🎉 <b>${esc(a.name)}</b> joined <span class="muted">· ${ago(a.first)}</span> <span class="tn-k ${KIND[a.kind][1]}">${KIND[a.kind][0]}</span>${act?`${(data.welc||{})[a.uid+"-join"]?`<span class="tn-hint tn-done">✓ Welcomed · open the chat</span>`:`<span class="tn-hint">👋 ${dm?"Send a welcome message":"Email a welcome"}</span>`}`:""}${old?"":`<button type="button" class="tn-rd" data-tnrd="j:${esc(a.uid)}" aria-label="Mark as read" title="Mark as read (it stays here, but stops counting in the 🔔 number)">✓</button>`}</li>`; };
    /* Nov 25 2026: sections with something new go first, newest on top; the rest follow, also newest first */
    const SECS=[{h:erAll.length?`<h4>🐞 Problems on Hibi</h4><p class="muted" style="margin:0 0 6px;font-size:12.5px">Something broke on a member's screen. Send this to Claude and it'll fix it.</p><ul>${erAll.slice(0,6).map(x=>`<li${x.at>since&&!rdK.includes(kEr(x))?"":' class="tn-read"'}>🐞 <b>${esc(x.msg)}</b>${x.n>1?` <span class="muted">(${x.n} times)</span>`:""}<br><span class="muted">${esc((x.who||[]).join(", "))} · ${esc(x.view||"")} · ${esc(x.dev||"")}${x.src?` · ${esc(x.src)}:${x.line|0}`:""} · ${ago(x.at)}</span></li>`).join("")}</ul>`:"",t:Math.max(0,...erAll.map(x=>x.at)),n:erNew.length>0},
{h:pyAll.length?`<h4>💳 Club payments on Hibi</h4><ul>${pyAll.slice(0,8).map(x=>{ const amt=x.amount?(x.currency==="USD"?"US$"+x.amount:"$"+Number(x.amount).toLocaleString("es-CL"))+"/"+(x.per==="year"?"year":"month"):"", via=x.provider==="paypal"?"PayPal":x.provider==="mp"?"Mercado Pago":"", dd=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"}); }catch(e){ return d; } };
        const what=x.kind==="start"?` started paying on Hibi${amt?": "+amt:""}${via?" · "+via:""} 🎉`:x.kind==="back"?`’s payment went through again ✓`:x.kind==="failed"?`’s payment failed${x.until?" · still in until "+dd(x.until):""}`:` cancelled their membership${x.until?" · still in until "+dd(x.until):""}`;
        return `<li${x.at>since&&!rdK.includes(kPy(x))?"":' class="tn-read"'}>${x.kind==="start"||x.kind==="back"?"💳":x.kind==="failed"?"⚠️":"🚪"} <b>${esc(x.name||x.email||"Someone")}</b>${what} <span class="muted">· ${ago(x.at)}</span>${x.uid?` <button type="button" class="tn-go" data-tnrdgo="${esc(kPy(x))}" data-dmto="${esc(x.uid)}" data-dmname="${esc(x.name||"")}">Message →</button>`:""}</li>`; }).join("")}</ul>`:"",t:Math.max(0,...pyAll.map(x=>x.at)),n:pyNew.length>0},
{h:mlAll.length?`<h4>📧 Emails Hibi sent</h4><ul>${mlAll.slice(0,8).map(m=>`<li${m.at>since&&!rdK.includes(kMl(m))?"":' class="tn-read"'}>📧 <b>${esc(m.name||"Someone")}</b> ${m.why==="test email"?"got the test email":!m.why||m.why==="unread message"?`got an email: unread message from ${esc(m.from||"someone")}`:`got a message + email from you: ${esc(String(m.why).replace(/\s*\(message \+ email\)\s*$/,""))}`} <span class="muted">· ${ago(m.at)}</span>${m.uid&&m.why!=="test email"?` <button type="button" class="tn-go" data-tnrdgo="${esc(kMl(m))}" data-dmto="${esc(m.uid)}" data-dmname="${esc(m.name||"")}">Chat →</button>`:""}</li>`).join("")}</ul>`:"",t:Math.max(0,...mlAll.map(x=>x.at)),n:mlNew.length>0},
{h:trAll.length?`<h4>🎁 Free club trials</h4><ul>${trAll.map(t=>{ const when=Math.max(t.start||0,t.ended||0,t.joined||0), dd=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"}); }catch(e){ return d; } };
        const what=t.status==="joined"?"joined the club after the trial 💛":t.status==="trial-ended"?"’s free trial ended (club access removed)":t.status==="trial-kept"?"’s trial ended, kept in the club (you set it)":`started a free 2-week trial · ends ${dd(t.until)}`;
        return `<li${when>since&&!rdK.includes(kTr(t))?"":' class="tn-read"'}>🎁 <b>${esc(t.name||t.email||"Someone")}</b> ${what} <span class="muted">· ${ago(when)}</span>${t.status==="trial"||t.status==="trial-ended"?` <button type="button" class="tn-go" data-tnrdgo="${esc(kTr(t))}" data-dmto="${esc(t.uid)}" data-dmname="${esc(t.name||"")}">Message →</button>`:""}</li>`; }).join("")}</ul>`:"",t:Math.max(0,...trAll.map(t=>Math.max(t.start||0,t.ended||0,t.joined||0))),n:trNew.length>0},
{h:areq.length?`<h4>🙋 Asking to join Hibi</h4><ul>${areq.map(r=>`<li><b>${esc(r.name)}</b> · ${esc(r.email)} <span class="muted">· ${esc(({club:"club member",private:"private student",joining:"wants to join",other:"other"})[r.who]||r.who||"")} · ${ago(r.at)}${r.n>1?` · asked ${r.n} times`:""}</span>${r.msg?`<div class="muted">“${esc(r.msg)}”</div>`:""}<div class="tn-acts"><button type="button" class="tn-btn" data-tnok="${esc(r.id)}">✓ Approve + email them</button><button type="button" class="tn-btn" data-tnno="${esc(r.id)}">Decline</button></div></li>`).join("")}</ul>`:"",t:Math.max(0,...areq.map(r=>+r.at||0)),n:areq.some(r=>!rd.includes("a:"+r.id))},
{h:reps.length?`<h4>⚑ Reported on the club wall</h4><ul>${reps.map(r=>`<li>⚑ <b>${esc(r.name)}</b> reported ${esc(r.author||"a post")}’s ${String(r.path||"").split("/").length>2?"comment":"post"}${r.text?`: <span class="muted">“${esc(r.text.slice(0,90))}”</span>`:""}${r.why?` · <i>${esc(r.why)}</i>`:""} <span class="muted">· ${ago(r.at)}</span> <a class="tn-go" href="#club" data-bgo="${esc(r.pid||"")}">Open →</a> <button type="button" class="tn-btn" data-tnrep="${esc(r.id)}">Done ✓</button></li>`).join("")}</ul>`:"",t:Math.max(0,...reps.map(r=>+r.at||0)),n:reps.length>0},
{h:clubAll.length?`<h4>Club community</h4><ul>${clubAll.map(a=>`<li${a.at>since&&!rdK.includes(kCl(a))?"":' class="tn-read"'}>${a.kind==="post"?"📝":a.kind==="challenge"?"✍️":"💬"} <b>${esc(a.name)}</b> ${a.kind==="post"?"posted on the wall":a.kind==="challenge"?"answered the weekly challenge":/^w\d{8}$/.test(a.pid||"")?"commented on the weekly post":"commented on a post"}${a.img?" 📷":""}${a.text?`: <span class="muted">“${esc(a.text)}”</span>`:""} <span class="muted">· ${ago(a.at)}</span> <a class="tn-go" href="#club" data-go="club" data-tnrdgo="${esc(kCl(a))}"${a.pid?` data-bgo="${esc(a.pid)}"`:""}>Open →</a></li>`).join("")}</ul>`:"",t:Math.max(0,...clubAll.map(a=>a.at)),n:clubNew.length>0},
{h:joins.length||older.length?`<h4 class="tn-h4">New on Hibi${older.length?`<button type="button" class="tn-link tn-tog" data-tn="all">${showAll?"Hide earlier ones":`Show earlier (${older.length})`}</button>`:""}</h4><ul>${joins.map(a=>li(a,false)).join("")}${showAll?older.map(a=>li(a,true)).join(""):""}</ul>`:(!packs.length&&!unl&&!una&&!clocks.length&&!clubAll.length&&!mineAll.length?`<p class="tn-line muted">Nothing new right now.</p>`:""),t:Math.max(0,...joins.map(a=>+a.first||0)),n:joins.some(a=>!rd.includes("j:"+a.uid))},
{h:una?`<p class="tn-line">⚪ ${una===1?"1 member isn’t":una+" members aren’t"} club or private yet: <b>${unA.slice(0,6).map(a=>esc(String(a.name||"").split(" ")[0])).join(", ")}${una>6?` +${una-6}`:""}</b>. Everyone needs one. <a class="tn-go" href="members.html#unassigned">Assign them →</a></p>`:"",t:0,n:false},
{h:unl?`<p class="tn-line">🔗 ${unl} ${unl===1?"account isn’t":"accounts aren’t"} linked to a student or the club yet. <a class="tn-go" href="members.html">Members page →</a></p>`:"",t:0,n:false},
{h:mineAll.length?`<h4>💛 About you in the club</h4><ul>${mineAll.map(n=>`<li${n.at>since&&!rdK.includes(kMi(n))?"":' class="tn-read"'}>${n.html}${n.text&&!/^react/.test(n.kind)?` <span class="muted">“${esc(n.text)}”</span>`:""} <span class="muted">· ${ago(n.at)}</span> <a class="tn-go" href="#club" data-go="club" data-tnrdgo="${esc(kMi(n))}"${n.pid?` data-bgo="${esc(n.pid)}"`:""}>Open →</a></li>`).join("")}</ul>`:"",t:Math.max(0,...mineAll.map(n=>n.at)),n:mineNew.length>0},
{h:packs.length?`<h4>Packs</h4><ul>${packs.map(rowR).join("")}</ul>`:"",t:0,n:packs.some(h=>!rd.includes(kOf(h)))},
{h:clocks.length?`<h4>Clock changes</h4><ul>${clocks.map(rowR).join("")}</ul>`:"",t:0,n:clocks.some(h=>!rd.includes(kOf(h)))}].filter(x=>x.h).sort((a,b)=>(b.n-a.n)||(b.t-a.t));
    b.innerHTML=bell+`<div class="tn-box"><div class="tn-h"><b>🔔 Notifications</b><span style="flex:1"></span>${undoPrev!=null?`<button type="button" class="tn-btn" data-tn="undo">↩ Undo</button>`:""}${cnt?`<button type="button" class="tn-btn" data-tn="seen">✓ Mark all as read</button>`:""}<button type="button" class="tn-x" data-tn="hide" aria-label="Close">×</button></div>
      ${SECS.map(x=>x.h).join("")}
      <p class="tn-line tn-more"><a class="tn-go" href="members.html">More student news (milestones, ✨ love, practice tips) on Members →</a></p></div>`;
  }
  /* access requests: approve = access/{email} + a ready-to-send Gmail invite */
  async function fsx(method,path,body){ const F=window.__csFire; const tok=await F.token(); const r=await fetch(F.base+path,{method,headers:{Authorization:"Bearer "+tok,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined}); if(!r.ok) throw new Error(r.status); return r.status===204?null:r.json(); }
  async function accessReqs(){ if(!window.__csTeacher||window.__csPreview||!window.__csFire) return []; const j=await fsx("GET","/accessRequests?pageSize=100"); const v=f=>f?(f.stringValue!=null?f.stringValue:f.integerValue!=null?+f.integerValue:""):"";
    const all=((j&&j.documents)||[]).map(d=>({id:d.name.split("/").pop(),name:v(d.fields.name),email:String(v(d.fields.email)).trim().toLowerCase(),who:v(d.fields.who),msg:v(d.fields.msg),at:v(d.fields.at)})).sort((a,b)=>b.at-a.at);
    const by=new Map(); all.forEach(r=>{ const k=r.email||r.id, o=by.get(k); if(o){ o.ids.push(r.id); o.n++; if(!o.msg&&r.msg) o.msg=r.msg; } else by.set(k,Object.assign(r,{ids:[r.id],n:1})); });
    return [...by.values()]; }
  async function approve(name,email){ email=String(email).trim().toLowerCase(); await fsx("PATCH","/access/"+encodeURIComponent(email),{fields:{name:{stringValue:name},at:{integerValue:String(Date.now())},by:{stringValue:"noa"}}});
    const first=String(name).trim().split(/\s+/)[0]||"";
    const body=`Hi ${first}!\n\nYou're in! 🎉 Your Hibi account is ready.\n\n1. Open https://hibi.cl/\n2. Tap "Continue with Google" and use this email (${email}).\n\nOn your phone, you can add it to your home screen so it works like an app.\n\nSee you there!\nNoa`;
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(email)+"&su="+encodeURIComponent("You're in! Your Hibi access 🎉")+"&body="+encodeURIComponent(body),"_blank"); }
  document.addEventListener("click",async e=>{ const ok=e.target.closest("[data-tnok]"), no=e.target.closest("[data-tnno]"); if(!ok&&!no) return; const id=(ok||no).dataset.tnok||(ok||no).dataset.tnno, r=(data.areq||[]).find(x=>x.id===id); if(!r) return;
    try{ if(ok) await approve(r.name,r.email); for(const x of (r.ids||[id])) await fsx("DELETE","/accessRequests/"+encodeURIComponent(x)); }catch(er){ if(window.toast) window.toast("Couldn’t save that. Did you paste the new Firebase rules?"); return; }
    data.areq=data.areq.filter(x=>x.id!==id); open=true; paint(); if(window.toast) window.toast(ok?"✓ Approved. Send the email that just opened.":"Request removed"); });
  document.addEventListener("submit",async e=>{ const f=e.target.closest("[data-tninv]"); if(!f) return; e.preventDefault(); try{ await approve(f.name.value.trim(),f.email.value); }catch(er){ if(window.toast) window.toast("Couldn’t save that. Did you paste the new Firebase rules?"); return; } f.reset(); if(window.toast) window.toast("✓ Approved. Send the email that just opened."); });
  document.addEventListener("click",async e=>{ const r=e.target.closest("[data-tnrep]"); if(!r) return; try{ await window.__clubSocial.delReport(r.dataset.tnrep); }catch(er){ return; } data.reps=(data.reps||[]).filter(x=>x.id!==r.dataset.tnrep); open=true; paint(); });
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-tnrdgo]"); if(!g||window.__csPreview) return; const k=g.dataset.tnrdgo, r=getRead(); if(!r.includes(k)){ r.push(k); setRead(r); } setTimeout(()=>{ try{ paint(); }catch(er){} },0); });
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-tn]"); if(!t) return; const k=t.dataset.tn;
    if(k==="open"){ open=!open; if(open&&Date.now()-lastLoad>180000) setTimeout(load,0); }
    else if(k==="all") showAll=!showAll;
    else if(k==="seen"){ undoPrev=getSeen(); undoRead=getRead(); setSeen(Date.now()); setRead([...new Set(undoRead.concat(curKeys))]); open=true; }
    else if(k==="undo"){ setSeen(undoPrev||0); if(undoRead) setRead(undoRead); undoPrev=null; undoRead=null; open=true; }
    else if(k==="hide"){ if(NP){ npSay({close:1}); return; } open=false; undoPrev=null; }
    paint(); });
  document.addEventListener("click",e=>{ if(NP) return; if(open&&e.target.isConnected&&!e.target.closest("#tNotif")){ open=false; undoPrev=null; paint(); } });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&open){ open=false; paint(); } });
  document.addEventListener("cs-teacher",()=>setTimeout(load,300));
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&window.__csTeacher&&window.__csAway&&window.__csAway(300000)) load(); });
  window.__csNotifLoad=load; setTimeout(load,2000);
  /* clock-change helper (also used by My coaching) */
  if(typeof window.__csTzRem!=="function") import("./hubview.js?v=20").then(m=>{ window.__csTzRem=m.tzReminders; paint(); document.dispatchEvent(new CustomEvent("cs-hubview")); }).catch(()=>{});
})();
