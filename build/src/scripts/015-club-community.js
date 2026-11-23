
/* ---------- Club community: members' posts, comments on the weekly post, photos, likes ----------
   Everything lives in club-only parts of the database (clubPosts, clubImgs, clubActivity). The database's security
   rules only let people on the club list read or write there, and only the author (or Noa) can edit/delete. */
(function(){
  const NOA="J8D2tjQmBaaA2QN730tSfSrjfm73";
  const GIPHY_KEY="VFTSkGppzLMC3vvhvEjVsyeV8DT5AlPp"; /* GIPHY web key (public by design); the GIF button stays hidden while this is empty */
  const L=(en,es)=>window.__clL?window.__clL(en,es):en;
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const linkify=s=>esc(s).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)"']/g,u=>`<a href="${u}" target="_blank" rel="noopener nofollow">${u.length>48?u.slice(0,45)+"…":u}</a>`);
  const ago=t=>{ const es=L(0,1), m=Math.round((Date.now()-t)/6e4); if(m<1) return es?"recién":"just now"; if(m<60) return es?"hace "+m+" min":m+" min ago"; const h=Math.round(m/60); if(h<24) return es?"hace "+h+(h===1?" hora":" horas"):h+(h===1?" hour ago":" hours ago"); const d=Math.round(h/24); if(d<7) return d===1?(es?"ayer":"yesterday"):(es?"hace "+d+" días":d+" days ago"); return new Date(t).toLocaleDateString(es?"es-CL":"en-US",{month:"short",day:"numeric"}); };
  const F=()=>window.__csFire;
  const me=()=>F()&&F().uid();
  const rid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
  let state="unknown"; /* unknown | ok | off (rules not switched on) | denied */
  let roT=0; function toastRO(){ if(Date.now()-roT<4000) return; roT=Date.now(); if(typeof window.toast==="function") window.toast("👁 View as is read-only: nothing is saved"); }
  async function api(method,path,body){
    const f=F(); if(!f) throw new Error("not ready");
    if(f.readOnly&&f.readOnly()&&method!=="GET"&&!/:runQuery$/.test(path)){ toastRO(); const e=new Error("view-as is read-only"); e.code=0; throw e; }
    const tok=await f.token(); if(!tok) throw new Error("signin");
    const r=await fetch(f.base+path,{method,headers:{"Authorization":"Bearer "+tok,"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined});
    if(r.status===403){ state=state==="ok"?"ok":"off"; const e=new Error("denied"); e.code=403; throw e; }
    if(!r.ok&&r.status!==404) throw new Error("http "+r.status);
    return r.status===404?null:r.json();
  }
  const S=v=>({stringValue:String(v)}), I=v=>({integerValue:String(Math.round(v))});
  function fromDoc(d){ const o={id:d.name.split("/").pop()}; const f=d.fields||{}; for(const k in f){ const v=f[k]; o[k]=v.stringValue!=null?v.stringValue:v.integerValue!=null?+v.integerValue:v.arrayValue?(v.arrayValue.values||[]).map(x=>x.stringValue):v.booleanValue!=null?v.booleanValue:null; } try{ Object.assign(o,JSON.parse(o.json||"{}")); }catch(e){} return o; }
  async function query(parent,coll,dir,limit){
    const res=await api("POST",(parent?"/"+parent:"")+":runQuery",{structuredQuery:{from:[{collectionId:coll}],orderBy:[{field:{fieldPath:"at"},direction:dir}],limit}});
    state="ok"; return (res||[]).filter(x=>x.document).map(x=>fromDoc(x.document));
  }
  /* Noa's guest preview: sample posts, nothing is sent anywhere */
  const G=()=>!!window.__csGuest&&!window.__csPreview, H=h=>Date.now()-h*36e5;
  const SAMPLE_POSTS=[{id:"s3",uid:"x3",name:"Sam (sample)",at:H(1),text:"Which topic should we do next Deep Dive Monday? 🤔",poll:{opts:["Travel disasters ✈️","Food from home 🍲","Dream jobs 💼"]},likes:["a|🔥"],n:0},{id:"s4",uid:"x2",name:"Alex (sample)",at:H(5),ch:"wSAMPLE",text:"The best advice I ever got: 'Done is better than perfect.' It helped me start speaking in class instead of waiting until my English was perfect.",likes:["a|👏","b|❤️"],n:1},{id:"s5",uid:"x1",name:"Robin (sample)",at:H(20),cat:"intro",text:"Hi everyone! I'm Robin and this is a sample post I'm learning English because I want to work remotely. Fun fact: I have three cats.",likes:["a|❤️","b|👏"],n:0},{id:"s1",uid:"x1",name:"Robin (sample)",at:H(3),cat:"q",text:"Does anyone have a good podcast for practicing listening on the bus? 🎧",likes:["a","b"],n:2},{id:"s2",uid:NOA,name:"Noa (sample)",at:H(26),text:"Welcome to the new club wall! Ask questions, share wins, post your pet photos 🐾",likes:["a","b","c","d"],n:1}];
  const SAMPLE_COMM={s1:[{id:"c1",uid:"x2",name:"Alex (sample)",at:H(2),text:"6 Minute English from the BBC! Short and easy to follow.",likes:["a"]},{id:"c2",uid:NOA,name:"Noa (sample)",at:H(1),text:"Great pick. Culips is also really good for real conversations.",likes:[]}],s2:[{id:"c3",uid:"x3",name:"Sam (sample)",at:H(20),text:"Love this! 🫰🏻",likes:["a"]}]};
  const listPosts=()=>G()?Promise.resolve(SAMPLE_POSTS):query("","clubPosts","DESCENDING",50);
  const listComments=pid=>G()?Promise.resolve(SAMPLE_COMM[pid]||[{id:"c9",uid:"x4",name:"Kim (sample)",at:H(5),text:"This is Kira, she thinks she's a cat 🐶",likes:["a","b","c"]}]):query("clubPosts/"+pid,"comments","ASCENDING",300);
  async function createDoc(path,id,data){ const fields={uid:S(me()),at:I(Date.now()),name:S(F().name()),json:S(JSON.stringify(data))}; if(path==="clubPosts") { fields.likes={arrayValue:{values:[]}}; fields.n=I(0); fields.lastAt=I(Date.now()); } else fields.likes={arrayValue:{values:[]}};
    await api("POST","/"+path+"?documentId="+id,{fields}); }
  async function activity(kind,pid,text,img){ try{ await api("POST","/clubActivity?documentId="+rid(),{fields:{uid:S(me()),at:I(Date.now()),name:S(F().name()),kind:S(kind),pid:S(pid),text:S(String(text||"").slice(0,140)),img:{booleanValue:!!img}}}); }catch(e){} }
  /* photos: shrunk in the browser to a light JPEG and kept in the database (no separate file storage needed) */
  function shrink(file){ return new Promise((res,rej)=>{ const u=URL.createObjectURL(file), im=new Image(); im.onload=()=>{ let w=im.naturalWidth,h=im.naturalHeight; const M=1280; if(Math.max(w,h)>M){ const k=M/Math.max(w,h); w=Math.round(w*k); h=Math.round(h*k); } const c=document.createElement("canvas"); c.width=w; c.height=h; c.getContext("2d").drawImage(im,0,0,w,h); URL.revokeObjectURL(u); let q=.82,d=c.toDataURL("image/jpeg",q); while(d.length>700000&&q>.35){ q-=.12; d=c.toDataURL("image/jpeg",q); } if(d.length>900000){ rej(new Error("too big")); return; } res(d); }; im.onerror=()=>{ URL.revokeObjectURL(u); rej(new Error("not an image")); }; im.src=u; }); }
  async function uploadImg(file){ const d=await shrink(file), id=rid(); await api("POST","/clubImgs?documentId="+id,{fields:{uid:S(me()),at:I(Date.now()),data:S(d)}}); IMG[id]=d; return id; }
  const IMG={};
  async function img(id){ if(IMG[id]) return IMG[id]; const r=await api("GET","/clubImgs/"+id); IMG[id]=r&&r.fields&&r.fields.data?r.fields.data.stringValue:""; return IMG[id]; }
  function paintImgs(root){ root.querySelectorAll("img[data-img]:not([src])").forEach(async el=>{ try{ const d=await img(el.dataset.img); if(d) el.src=d; else el.closest(".cs-ph")?.remove(); }catch(e){} }); }
  const RX=["❤️","😂","😮","👏","🔥","🙏"];
  const rxOf=v=>{ const i=String(v).indexOf("|"); return i<0?[v,"❤️"]:[v.slice(0,i),v.slice(i+1)]; };
  async function react(path,item,emo){ const mine=me(); const prev=(item.likes||[]).map(rxOf).find(([u])=>u===mine);
    const rest=(item.likes||[]).filter(v=>rxOf(v)[0]!==mine); item.likes=prev&&prev[1]===emo?rest:rest.concat([mine+"|"+emo]);
    await api("PATCH","/"+path+"?updateMask.fieldPaths=likes",{fields:{likes:{arrayValue:{values:item.likes.map(S)}}}});
    if(!(prev&&prev[1]===emo)&&!prev&&item.uid&&item.uid!==mine){ const ps=path.split("/"); note(item.uid,ps.length>2?"reactc":"react",ps[1],emo+(item.text?" "+item.text:"")); } }
  async function editDoc(path,item,text,media){ let data={}; try{ data=JSON.parse(item.json||"{}")||{}; }catch(e){ data={}; } ["ch","cat","poll","idea"].forEach(k=>{ if(item[k]!=null&&data[k]==null) data[k]=item[k]; });
    data.text=text; data.edited=Date.now(); const imgs=media?media.imgs:(item.imgs||[]), gifs=media?media.gifs:(item.gifs||[]);
    data.imgs=imgs; if(gifs&&gifs.length) data.gifs=gifs; else delete data.gifs;
    const js=JSON.stringify(data); await api("PATCH","/"+path+"?updateMask.fieldPaths=json",{fields:{json:S(js)}});
    item.json=js; item.text=text; item.edited=data.edited; item.imgs=imgs; if(data.gifs) item.gifs=data.gifs; else delete item.gifs; }
  async function del(path){ await api("DELETE","/"+path); }
  /* ---------- UI ---------- */
  const COLORS=["#E5533D","#F0A63A","#3DDC97","#5AB8FF","#B18CFF","#FF7EB6","#2DD4BF","#C9A26B"];
  let PARKMAP={};
  const av=(uid,name)=>{ if(uid&&uid===me()&&!G()&&window.csMyPhoto){ const mp=window.csMyPhoto(); if(mp) return `<span class="cs-av cs-avp" aria-hidden="true"><img src="${esc(mp)}" alt="" referrerpolicy="no-referrer"></span>`; if(!PARKMAP[uid]&&window.csBuddy&&window.csBuddy.portrait&&!(window.csMyPhotoKind&&window.csMyPhotoKind()==="none")){ const sv=window.csBuddy.face?window.csBuddy.face():String(window.csBuddy.portrait()||""), mb=window.csMyPhotoBg?window.csMyPhotoBg():""; if(sv) return `<span class="cs-av cs-avb" aria-hidden="true"${mb?` style="background:${mb}"`:""}>${sv}</span>`; } }
    const pp=PROFS&&profOf(uid), noPet=(pp&&pp.pk==="none")||(uid===me()&&window.csMyPhotoKind&&window.csMyPhotoKind()==="none"); if(pp&&pp.photo&&/^(data:image\/|https:\/\/)/.test(pp.photo)&&!(!pp.pk&&/googleusercontent\.com/.test(pp.photo))) return `<span class="cs-av cs-avp" aria-hidden="true"><img src="${esc(pp.photo)}" alt="" referrerpolicy="no-referrer" loading="lazy"></span>`; const bd=!noPet&&PARKMAP[uid]; if(bd&&window.csBuddy&&window.csBuddy.of){ const svg=bd.me&&window.csBuddy.face?window.csBuddy.face():window.csBuddyFace?window.csBuddyFace(bd):String(window.csBuddy.of(bd)||""); if(svg) return `<span class="cs-av cs-avb" aria-hidden="true"${pp&&/^#[0-9A-Fa-f]{6}$/.test(pp.pbg||"")?` style="background:${pp.pbg}"`:""}>${svg}</span>`; } let h=0; for(const c of String(uid)) h=(h*31+c.charCodeAt(0))>>>0; const ini=String(name||"?").trim().split(/\s+/).map(w=>(w.match(/[\p{L}\p{N}]/u)||[""])[0]).filter(Boolean).slice(0,2).join("").toUpperCase(); return `<span class="cs-av" style="background:${COLORS[h%COLORS.length]}" aria-hidden="true">${esc(ini||"?")}</span>`; };
  const pName=x=>{ try{ const p=PROFS&&profOf(x.uid); return (p&&p.name)||x.name; }catch(e){ return x.name; } };
  const who=x0=>{ const x=Object.assign({},x0,{name:pName(x0)}); return whoH(x); };
  const whoH=x=>`<button type="button" class="cs-whob" data-prof="${esc(x.uid||"")}" data-pname="${esc(x.name||"")}" aria-label="${esc(L("See profile: ","Ver perfil: ")+(x.name||""))}">${av(x.uid,x.name)}</button><span class="cs-who"><b><button type="button" class="cs-nameb" data-prof="${esc(x.uid||"")}" data-pname="${esc(x.name||"")}">${esc(x.name||L("Member","Miembro"))}</button></b>${x.uid===NOA?`<span class="cs-noa">${L("Coach","Coach")}</span>`:""}<span class="cs-ago">${ago(x.at)}${x.edited?L(" · edited"," · editado"):""}</span>${G()?`<span class="cs-sample">${L("Sample","Ejemplo")}</span>`:""}</span>`;
  const canDel=x=>x.uid===me()||me()===NOA;
  const canEdit=x=>x.uid===me()&&!G();
  const tools=(x,path,isPost)=>`<span class="cs-tools">${x.uid!==me()&&x.uid!==NOA&&me()!==NOA?`<button type="button" class="cs-x cs-rep" data-report="${esc(path)}" title="${L("Report to Noa","Reportar a Noa")}" aria-label="${L("Report to Noa","Reportar a Noa")}">⚑</button>`:""}${canEdit(x)?`<button type="button" class="cs-x" data-edit="${esc(path)}" title="${L("Edit","Editar")}" aria-label="${L("Edit","Editar")}">✏️</button>`:""}${canDel(x)?`<button type="button" class="cs-x" data-del="${esc(path)}" title="${isPost?L("Delete post","Borrar post"):L("Delete","Borrar")}" aria-label="${isPost?L("Delete post","Borrar post"):L("Delete","Borrar")}">✕</button>`:""}</span>`;
  const txtHTML=s=>linkify(s).replace(/(^|\s)@([A-ZÁÉÍÓÚÑ][\wáéíóúñ]+)/g,'$1<b class="cs-at">@$2</b>');
  const gifs=x=>(x.gifs||[]).filter(g=>g&&/^https:\/\/media\d*\.giphy\.com\//.test(g.u)).map(g=>`<div class="cs-gif"><img src="${esc(g.u)}" alt="${esc(g.t||"GIF")}" loading="lazy"${g.w&&g.h?` width="${+g.w}" height="${+g.h}"`:""}></div>`).join("");
  const imgs=x=>gifs(x)+((x.imgs||[]).length?`<div class="cs-imgs n${Math.min(x.imgs.length,4)}">${x.imgs.map(i=>`<button type="button" class="cs-ph" data-big="${esc(i)}" aria-label="Open photo"><img data-img="${esc(i)}" alt="Photo" loading="lazy"></button>`).join("")}</div>`:"");
  const likeBtn=(x,path)=>{ const c={}; let mine=null; (x.likes||[]).forEach(v=>{ const [u,e]=rxOf(v); c[e]=(c[e]||0)+1; if(u===me()) mine=e; });
    return `<span class="cs-rx" data-rxpath="${esc(path)}">${RX.filter(e=>c[e]).map(e=>`<button type="button" class="cs-act${mine===e?" on":""}" data-rx="${e}" aria-pressed="${mine===e}" aria-label="${e} ${c[e]}">${e} ${c[e]}</button>`).join("")}${(x.likes||[]).length?`<button type="button" class="cs-act cs-rxwho" data-rxwho="${esc(JSON.stringify((x.likes||[]).map(rxOf)))}" aria-label="${esc(L("Who reacted?","¿Quién reaccionó?"))}" title="${esc(L("Who reacted?","¿Quién reaccionó?"))}">👀</button>`:""}<span class="cs-rxadd"><button type="button" class="cs-act cs-rxbtn" data-rxopen="1" aria-label="${L("Add a reaction","Reaccionar")}" aria-expanded="false">${mine?"":"🤍 "}＋</button><span class="cs-rxpal" hidden>${RX.map(e=>`<button type="button" data-rx="${e}" aria-label="React ${e}">${e}</button>`).join("")}</span></span></span>`; };
  function composer(kind,target,ph){ return `<form class="cs-comp" data-comp="${kind}" data-target="${esc(target||"")}"><div class="cs-taw"><textarea rows="${kind==="comment"||kind==="poll"?2:3}" maxlength="3000" placeholder="${esc(ph)}" aria-label="${esc(ph)}"></textarea><div class="cs-ment" role="listbox" hidden></div></div><div class="cs-pollbox"${kind==="poll"?"":" hidden"}>${kind==="poll"?`<p class="cs-ph2">${L("Options (2 to 6):","Opciones (de 2 a 6):")}</p><div class="cs-popts">${optIn(1)}${optIn(2)}</div><button type="button" class="cs-act" data-polladd="1">＋ ${L("Option","Opción")}</button>`:""}</div>${kind==="idea"?`<div class="cs-cats" role="group" aria-label="${L("What kind of idea?","¿Qué tipo de idea?")}"><span>${L("It’s about:","Es sobre:")}</span>${IDEAK.map(c=>`<button type="button" class="cs-cat" data-cat="${c[0]}" aria-pressed="false">${c[1]} ${esc(L(c[2][0],c[2][1]))}</button>`).join("")}</div>`:""}${kind==="post"?`<div class="cs-cats" role="group" aria-label="${L("Topic (optional)","Tema (opcional)")}"><span>${L("Topic:","Tema:")}</span>${CATS.map(c=>`<button type="button" class="cs-cat" data-cat="${c[0]}" aria-pressed="false">${c[1]} ${esc(L(c[2][0],c[2][1]))}</button>`).join("")}</div><div class="cs-cats cs-ideak" role="group" hidden aria-label="${L("What kind of idea?","¿Qué tipo de idea?")}"><span>${L("It’s about:","Es sobre:")}</span>${IDEAK.map(c=>`<button type="button" class="cs-cat cs-ik" data-ik="${c[0]}" aria-pressed="false">${c[1]} ${esc(L(c[2][0],c[2][1]))}</button>`).join("")}</div>`:""}<div class="cs-prev"></div><div class="cs-gifpick" hidden></div><div class="cs-row">${kind==="poll"?`<button type="button" class="cs-act" data-topost="1">← ${L("Back to post","Volver al post")}</button>`:""}<label class="cs-act cs-addph">📷 ${L("Photo","Foto")}<input type="file" accept="image/*" multiple hidden></label>${kind==="post"?`<button type="button" class="cs-act" data-topoll="1">📊 ${L("Poll","Encuesta")}</button>`:""}${GIPHY_KEY?'<button type="button" class="cs-act cs-gifbtn" data-gifopen="1" aria-expanded="false">GIF</button>':""}<span class="cs-msg" role="status"></span><button type="submit" class="cs-send">${kind==="post"?L("Post","Publicar"):kind==="chal"?L("Send my answer","Enviar mi respuesta"):kind==="poll"?L("Start the poll","Publicar encuesta"):kind==="idea"?L("Send my idea","Enviar mi idea"):kind==="dm"?L("Send","Enviar"):L("Comment","Comentar")}</button></div></form>`; }
  const OFF=`<p class="cs-off">💬 ${L("Comments and posts are almost ready. They’ll switch on very soon.","Los comentarios y posts están casi listos. Se activan muy pronto.")}</p>`;
  const COMM={};
  async function mountThread(el){
    const pid=el.dataset.thread; el.dataset.on="1";
    if(el.dataset.lazy&&!el.closest("details")?.open){ el.closest("details")?.addEventListener("toggle",()=>mountThread(el),{once:true}); el.dataset.on=""; return; }
    if(COMM[pid]) paintThread(el,pid,COMM[pid]); else el.innerHTML=`<div class="cs-th"><h3 class="cs-h">💬 ${L("Comments","Comentarios")}</h3><p class="cs-load">${L("Loading…","Cargando…")}</p></div>`;
    let list=[]; try{ [list]=await Promise.all([listComments(pid),loadPark()]); COMM[pid]=list; }catch(e){ el.innerHTML=state==="off"?OFF:`<p class="cs-off">${L("Comments couldn’t load. Check your connection and try again.","No se pudieron cargar los comentarios. Revisa tu conexión e intenta de nuevo.")}</p>`; return; }
    paintThread(el,pid,list);
  }
  function commentHTML(pid,c){ const path=`clubPosts/${pid}/comments/${c.id}`; return `<div class="cs-c" data-cid="${esc(c.id)}"><div class="cs-top">${who(c)}${tools(c,path,false)}</div>${c.text?`<p class="cs-txt">${txtHTML(c.text)}</p>`:'<p class="cs-txt" hidden></p>'}${imgs(c)}<div class="cs-acts">${likeBtn(c,path)}<button type="button" class="cs-act" data-reply="${esc(String(c.name||"").split(/\s+/)[0])}" data-ruid="${esc(c.uid||"")}">↩ ${L("Reply","Responder")}</button></div></div>`; }
  function paintThread(el,pid,list){
    el.innerHTML=`<div class="cs-th"><h3 class="cs-h">💬 ${L("Comments","Comentarios")}${list.length?` <span>${list.length}</span>`:""}</h3>${list.map(c=>commentHTML(pid,c)).join("")||`<p class="cs-empty">${L("No comments yet. Be the first! Photos welcome 📷","Aún no hay comentarios. ¡Sé el primero! Las fotos son bienvenidas 📷")}</p>`}${composer("comment",pid,L("Write a comment…","Escribe un comentario…"))}</div>`;
    paintImgs(el);
  }
  let POSTS=null, PINS=[], NEWIDS=new Set(), SEEN_AT=0;
  const WSEEN="cs-wall-seen";
  const getSeen=()=>{ try{ return +localStorage.getItem(WSEEN)||0; }catch(e){ return 0; } };
  const setSeen=v=>{ try{ localStorage.setItem(WSEEN,String(v)); }catch(e){} };
  const WREAD="cs-wall-read";
  const getRd=()=>{ try{ return JSON.parse(localStorage.getItem(WREAD)||"{}")||{}; }catch(e){ return {}; } };
  const setRd=m=>{ try{ const k=Object.keys(m); if(k.length>300) k.slice(0,k.length-300).forEach(x=>delete m[x]); localStorage.setItem(WREAD,JSON.stringify(m)); }catch(e){} };
  const lastOf=p=>Math.max(p.at||0,p.lastAt||0);
  const isUnread=(p,s,rd)=>isNew(p,s)&&p.uid!==me()&&(rd[p.id]||0)<lastOf(p);
  function paintCount(){ if(G()||!POSTS) return; const s=getSeen()||(Date.now()-7*864e5), rd=getRd(); badge(POSTS.filter(p=>isUnread(p,s,rd)).length); }
  function markRead(id){ const p=(POSTS||[]).find(x=>x.id===id); if(!p) return; const rd=getRd(); if((rd[id]||0)>=lastOf(p)) return; rd[id]=lastOf(p); setRd(rd); paintCount(); }
  function watchRead(el){ if(G()||!window.IntersectionObserver||!el) return; if(el._io) el._io.disconnect();
    const tm=new Map(), io=new IntersectionObserver(es=>es.forEach(en=>{ const id=en.target.dataset.pid, seen=en.isIntersecting&&(en.intersectionRatio>=.5||en.intersectionRect.height>innerHeight*.45);
      if(seen){ if(!tm.has(id)) tm.set(id,setTimeout(()=>{ markRead(id); io.unobserve(en.target); },900)); } else { clearTimeout(tm.get(id)); tm.delete(id); } }),{threshold:[0,.25,.5,.75,1]});
    el._io=io; el.querySelectorAll("article.cs-p.isnew[data-pid]").forEach(a=>io.observe(a)); }
  let pinsAt=0;
  async function loadPins(){ if(G()){ PINS=["s2"]; PICKS={wSAMPLE:"s4"}; return; } if(Date.now()-pinsAt<20000) return; try{ const r=await api("GET","/clubPublic/pins"); const j=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; PINS=j.ids||[]; PICKS=j.picks||{}; IDEAST=j.ideas||{}; pinsAt=Date.now(); }catch(e){ PINS=PINS||[]; } }
  async function savePins(){ await api("PATCH","/clubPublic/pins",{fields:{json:S(JSON.stringify({ids:PINS,picks:PICKS,ideas:IDEAST}))}}); pinsAt=Date.now(); }
  const isNew=(p,seen)=>seen&&((p.at>seen&&p.uid!==me())||(p.lastAt>seen&&p.lastAt>p.at+2000));
  /* how many posts are new or have new comments since you last opened Community (for the tab and the Home card) */
  let unreadAt=0;
  function unreadPid(){ const s=getSeen()||(Date.now()-7*864e5); const l=(POSTS||[]).filter(p=>isNew(p,s)&&p.uid!==me()).sort((a,b)=>(b.lastAt||b.at||0)-(a.lastAt||a.at||0)); return l[0]?l[0].id:(G()?"s1":""); }
  async function unread(){ if(G()) return 1; try{ if(!POSTS||Date.now()-unreadAt>600000){ POSTS=await listPosts(); unreadAt=Date.now(); } }catch(e){ return 0; } const s=getSeen()||(Date.now()-7*864e5); const rd=getRd(); return POSTS.filter(p=>isUnread(p,s,rd)).length; }
  async function mountWall(el){
    el.dataset.on="1"; if(POSTS) paintWall(el); else el.innerHTML='<p class="cs-load">Loading…</p>';
    try{ const [ps]=await Promise.all([listPosts(),loadPins(),loadPark()]); POSTS=ps; }catch(e){ el.innerHTML=state==="off"?OFF:`<p class="cs-off">${L("The wall couldn’t load. Check your connection and try again.","No se pudo cargar el muro. Revisa tu conexión e intenta de nuevo.")}</p>`; return; }
    if(!G()&&!getSeen()) setSeen(Date.now()-7*864e5);
    SEEN_AT=getSeen(); { const rd=getRd(); NEWIDS=new Set(POSTS.filter(p=>isNew(p,SEEN_AT)&&(rd[p.id]||0)<lastOf(p)).map(p=>p.id)); } if(G()) NEWIDS=new Set(["s1"]);
    paintWall(el); paintCount();
    if(FOCUS){ const id=FOCUS; FOCUS=null; const art=el.querySelector(`[data-pid="${CSS.escape(id)}"]`); if(art){ art.scrollIntoView({block:"center",behavior:"smooth"}); art.classList.add("cs-flash");
      (async()=>{ const sub=art.querySelector(".cs-sub"); if(art._subP) await art._subP.catch(()=>{}); else if(sub&&sub.hidden) await openSub(art,id);
        /* go down to the newest reply */
        const cs=art.querySelectorAll(".cs-sub .cs-c"), last=cs[cs.length-1]; if(last){ setTimeout(()=>{ last.scrollIntoView({block:"center",behavior:"smooth"}); last.classList.add("cs-flash"); },250); } })(); } }
  }
  function badge(n){ document.querySelectorAll("[data-unread]").forEach(b=>{ b.hidden=!n; b.textContent=n>9?"9+":String(n); });
    document.querySelectorAll("[data-wallbar]").forEach(b=>{ b.hidden=!n; const t=b.querySelector("[data-wallbar-n]"); if(t) t.textContent=n===1?L("1 new post or comment","1 post o comentario nuevo"):L(n+" new posts or comments",n+" posts o comentarios nuevos"); }); }
  document.addEventListener("click",e=>{ if(!e.target.closest("[data-wallread]")) return; e.preventDefault();
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ if(typeof window.toast==="function") window.toast("In View as nothing changes."); return; }
    setSeen(Date.now()); setRd({}); badge(0); if(typeof window.toast==="function") window.toast(L("✓ All caught up","✓ Todo al día")); });
  async function refreshBadge(){ const n=await unread(); badge(n); return n; }
  const CATS=[["intro","👋",["Introductions","Presentaciones"]],["q","❓",["Questions","Preguntas"]],["win","🏆",["Wins","Logros"]],["res","📎",["Resources","Recursos"]],["fun","🎉",["Off-topic","Off-topic"]],["idea","💡",["Class idea","Idea para clase"]]];
  const catOf=k=>CATS.find(c=>c[0]===k);
  const IDEAK=[["topic","💡",["Topic","Tema"]],["grammar","🧩",["Grammar","Gramática"]],["vocab","📚",["Vocabulary","Vocabulario"]],["game","🎲",["Activity or game","Actividad o juego"]],["other","✨",["Other","Otro"]]];
  let WCAT="";
  const cmtLbl=n=>`💬 ${n?n+" ":""}${n===1?L("comment","comentario"):L("comments","comentarios")}`;
  function ideaBits(p){ if(!p.idea) return {flag:"",up:""}; const k=IDEAK.find(c=>c[0]===(p.idea||{}).k)||IDEAK[4], up=(p.likes||[]).map(rxOf).filter(x=>x[1]==="👍"), mine=up.some(x=>x[0]===(G()?"me":me())), st=IDEAST[p.id]||"";
    return {flag:`<span class="cs-catf">${k[1]} ${esc(L(k[2][0],k[2][1]))}</span>${st==="planned"?`<span class="cs-pickf">🗓 ${L("Planned","Planeada")}</span>`:st==="done"?`<span class="cs-chf">✅ ${L("Done in class","Hecha en clase")}</span>`:""}`,
      up:`<button type="button" class="cs-act cl-iup2${mine?" on":""}" data-iup="${esc(p.id)}" aria-pressed="${mine}">👍 ${up.length?up.length+" ":""}${L("I want this","Lo quiero")}</button>${me()===NOA&&!G()?`<button type="button" class="cs-act" data-ist="${esc(p.id)}" data-v="planned">${st==="planned"?"✓ ":""}🗓 Planned</button><button type="button" class="cs-act" data-ist="${esc(p.id)}" data-v="done">${st==="done"?"✓ ":""}✅ Done</button>`:""}`}; }
  function postHTML(p){ const path=`clubPosts/${p.id}`, pin=PINS.includes(p.id), nw=NEWIDS.has(p.id), pick=p.ch&&PICKS[p.ch]===p.id, ib=ideaBits(p);
    return `<article class="cs-p${pin?" pinned":""}${nw?" isnew":""}" data-pid="${esc(p.id)}">${pin||nw||p.ch||p.cat||p.idea?`<div class="cs-flags">${pin?`<span class="cs-pin">📌 ${L("Pinned","Fijado")}</span>`:""}${p.ch?`<span class="cs-chf">✍️ ${L("Weekly challenge","Desafío semanal")}</span>`:""}${p.cat&&catOf(p.cat)?`<span class="cs-catf">${catOf(p.cat)[1]} ${esc(L(catOf(p.cat)[2][0],catOf(p.cat)[2][1]))}</span>`:""}${ib.flag}${pick?`<span class="cs-pickf">⭐ ${L("Noa’s pick","Elegido por Noa")}</span>`:""}${nw?`<span class="cs-newf">${p.at>SEEN_AT&&p.uid!==me()?L("New","Nuevo"):L("New comments","Comentarios nuevos")}</span>`:""}</div>`:""}<div class="cs-top">${who(p)}${tools(p,path,true)}</div>${p.text?`<p class="cs-txt">${txtHTML(p.text)}</p>`:'<p class="cs-txt" hidden></p>'}${p.poll&&(p.poll.opts||[]).length?`<div class="cs-poll" data-poll="${esc(p.id)}">${pollHTML(p,null)}</div>`:""}${imgs(p)}
      <div class="cs-acts">${p.idea?ib.up:likeBtn(p,path)}<button type="button" class="cs-act" data-open="${esc(p.id)}" aria-expanded="false">${cmtLbl(p.n|0)}</button>${me()===NOA&&!G()?`<button type="button" class="cs-act" data-pin="${esc(p.id)}">${pin?"📌 Unpin":"📌 Pin"}</button>${p.ch?`<button type="button" class="cs-act" data-pick="${esc(p.id)}" data-ch="${esc(p.ch)}">${pick?"⭐ Unpick":"⭐ Pick"}</button>`:""}`:""}</div><div class="cs-sub" hidden></div></article>`; }
  function paintWall(el){ setTimeout(()=>watchRead(el),60);
    const all=(POSTS||[]).filter(p=>!p.poll).map(p=>p.idea&&!p.cat?Object.assign(p,{cat:"idea"}):p).sort((a,b)=>(PINS.includes(b.id)-PINS.includes(a.id))||(b.at-a.at));
    const list=WCAT?all.filter(p=>WCAT==="ch"?p.ch:p.cat===WCAT):all.filter(p=>!(p.idea&&IDEAST[p.id]==="done"));
    const chips=[["","✨",[L("All","Todo"),""]]].concat(CATS).concat(all.some(p=>p.ch)?[["ch","✍️",["Challenges","Desafíos"]]]:[]).filter(c=>!c[0]||all.some(p=>c[0]==="ch"?p.ch:p.cat===c[0]));
    const flt=chips.length>1?`<div class="cs-wcats" role="group" aria-label="${L("Filter the wall","Filtrar el muro")}">${chips.map(c=>`<button type="button" class="cs-wcat${WCAT===c[0]?" on":""}" data-wcat="${c[0]}" aria-pressed="${WCAT===c[0]}">${c[1]} ${esc(c[0]?L(c[2][0],c[2][1]):c[2][0])}</button>`).join("")}</div>`:"";
    const old=el.querySelector(".cs-new form"), keep=old?{v:old.querySelector("textarea").value,cat:(old.querySelector(".cs-cat.on")||{dataset:{}}).dataset.cat,focus:old.contains(document.activeElement)}:null;
    el.innerHTML=flt+`<div class="cs-new">${composer("post","",L("Share something with the club: a question, a photo, a small win…","Comparte algo con el club: una pregunta, una foto, un pequeño logro…"))}</div>${list.map(postHTML).join("")||`<p class="cs-empty">${L("Nothing here yet. Say hi, ask a question, or share a photo 👋","Aún no hay nada. Saluda, haz una pregunta o comparte una foto 👋")}</p>`}`;
    paintImgs(el); paintPolls(el);
    /* comments show under each post by default (the first posts with replies), so replies are never hidden behind a button */
    list.filter(p=>(p.n|0)>0).slice(0,12).forEach(p=>{ const art=el.querySelector(`[data-pid="${CSS.escape(p.id)}"]`), sub=art&&art.querySelector(".cs-sub"); if(sub&&sub.hidden) art._subP=openSub(art,p.id); });
    if(keep&&(keep.v||keep.cat)){ const fm=el.querySelector(".cs-new form"), ta=fm&&fm.querySelector("textarea"); if(ta){ ta.value=keep.v; if(keep.cat){ const ct=fm.querySelector(`.cs-cat[data-cat="${keep.cat}"]`); if(ct){ ct.classList.add("on"); ct.setAttribute("aria-pressed","true"); } } if(keep.focus) ta.focus(); } }
    if(window.__clubIntro){ window.__clubIntro=false; const fm=el.querySelector(".cs-new form"), ta=fm&&fm.querySelector("textarea"); if(ta){ ta.value=L("Hi everyone! I’m … from … I’m learning English because … Fun fact about me: …","¡Hola a todos! Soy … de … Estoy aprendiendo inglés porque … Un dato curioso sobre mí: …"); const ct=fm.querySelector('.cs-cat[data-cat="intro"]'); if(ct){ ct.classList.add("on"); ct.setAttribute("aria-pressed","true"); } ta.focus(); ta.setSelectionRange(0,0); ta.scrollIntoView({block:"center",behavior:"smooth"}); } }
  }
  async function openSub(art,pid){ const sub=art.querySelector(".cs-sub"), b=art.querySelector("[data-open]"); if(!sub.hidden){ sub.hidden=true; b.setAttribute("aria-expanded","false"); return; } sub.hidden=false; b.setAttribute("aria-expanded","true"); sub.innerHTML=`<p class="cs-load">${L("Loading…","Cargando…")}</p>`;
    try{ const list=COMM[pid]=await listComments(pid); sub.innerHTML=list.map(c=>commentHTML(pid,c)).join("")+composer("comment",pid,L("Write a comment…","Escribe un comentario…")); paintImgs(sub); }catch(e){ sub.innerHTML=`<p class="cs-off">${L("Couldn’t load the comments.","No se pudieron cargar los comentarios.")}</p>`; } }
  function mount(root){ root.querySelectorAll(".cl-thread[data-thread]:not([data-on='1'])").forEach(mountThread); root.querySelectorAll(".cl-wall:not([data-on='1'])").forEach(mountWall);
    root.querySelectorAll(".cl-members:not([data-on='1'])").forEach(mountMembers); paintRsvp(root); try{ paintStars(root); paintIntro(root); paintBoardWords(root); }catch(e){} root.querySelectorAll(".cl-chal-list:not([data-on='1'])").forEach(mountChal); root.querySelectorAll(".cl-me:not([data-on='1'])").forEach(mountMe); root.querySelectorAll(".cl-bdays:not([data-on='1'])").forEach(el=>mountBdays(el).catch(()=>{})); root.querySelectorAll(".cl-insights:not([data-on='1'])").forEach(mountInsights); root.querySelectorAll(".cl-say:not([data-on='1'])").forEach(mountSay); loadRecs(); loadPods(); loadPlans(); paintSoon(root); paintFav(root); ensureMe(); }
  /* picked photos (up to 4) */
  const PICK=new WeakMap();
  document.addEventListener("change",e=>{ const inp=e.target.closest(".cs-comp input[type=file]"); if(!inp) return; const form=inp.closest("form"); const arr=(PICK.get(form)||[]).concat([...inp.files]).slice(0,4); PICK.set(form,arr); inp.value="";
    const pv=form.querySelector(".cs-prev"); pv.innerHTML=arr.map((f,i)=>`<span class="cs-pv"><img src="${URL.createObjectURL(f)}" alt=""><button type="button" data-unpick="${i}" aria-label="Remove photo">✕</button></span>`).join(""); });
  document.addEventListener("submit",async e=>{ const form=e.target.closest(".cs-comp"); if(!form) return; e.preventDefault();
    const ta=form.querySelector("textarea"), msg=form.querySelector(".cs-msg"), btn=form.querySelector(".cs-send"), text=ta.value.trim(), files=PICK.get(form)||[], gif=GIF.get(form);
    const poll=readPoll(form);
    if(poll&&poll.err){ msg.textContent=poll.err; return; }
    if(form.dataset.comp==="poll"&&!poll){ msg.textContent=L("Add at least 2 options.","Agrega al menos 2 opciones."); return; }
    if(poll&&!text){ msg.textContent=L("Write your question first.","Escribe tu pregunta primero."); ta.focus(); return; }
    if(!text&&!files.length&&!gif){ ta.focus(); return; }
    if(G()){ msg.textContent=L("Guest preview: posting is off here.","Vista de invitado: aquí no se publica."); return; }
    if(!me()){ msg.textContent=L("Sign in first.","Primero inicia sesión."); return; }
    if(form.dataset.comp==="dm"){ btn.disabled=true; msg.textContent=files.length?L("Uploading photo…","Subiendo foto…"):""; try{ await sendDm(form,text,files,gif); PICK.delete(form); GIF.delete(form); ta.value=""; form.querySelector(".cs-prev").innerHTML=""; const gp=form.querySelector(".cs-gifpick"); if(gp) gp.hidden=true; msg.textContent=""; await paintChat(true); }catch(er){ msg.textContent=er&&er.code===403?L("Messages aren’t switched on yet.","Los mensajes aún no están activados."):L("Couldn’t send. Try again.","No se pudo enviar. Intenta de nuevo."); } btn.disabled=false; ta.focus(); return; }
    btn.disabled=true; msg.textContent=files.length?L("Uploading photo…","Subiendo foto…"):L("Posting…","Publicando…");
    try{
      const ids=[]; for(const f of files){ ids.push(await uploadImg(f)); }
      const id=rid(), kind=form.dataset.comp, pid=form.dataset.target;
      const data={text,imgs:ids}; if(gif) data.gifs=[gif]; if(poll&&poll.opts) data.poll={opts:poll.opts}; if(kind==="chal") data.ch=pid; { const ct=form.querySelector(".cs-cat.on"); if(ct&&kind==="post") data.cat=ct.dataset.cat; if(kind==="idea") data.idea={k:ct?ct.dataset.cat:"other"}; if(kind==="post"&&ct&&ct.dataset.cat==="idea"){ const ik=form.querySelector(".cs-ik.on"); data.idea={k:ik?ik.dataset.ik:"other"}; } }
      const ats=mentionsIn(form,text);
      if(kind==="post"||kind==="chal"||kind==="poll"||kind==="idea"){ await createDoc("clubPosts",id,data); activity(kind==="chal"?"challenge":kind==="idea"?"idea":kind==="poll"?"poll":"post",id,text||(gif?"(GIF)":""),ids.length); if(POSTS) POSTS.unshift(Object.assign({id,uid:me(),name:F().name(),at:Date.now(),likes:[],n:0},data));
        bump(kind==="chal"?{posts:1,ch:1}:{posts:1}); if(kind==="chal") treat(5,L("Thanks for taking the challenge!","¡Gracias por hacer el desafío!"));
        ats.forEach(u=>note(u,"mention",id,text)); }
      else { await createDoc(`clubPosts/${pid}/comments`,id,data); activity("comment",pid,text||(gif?"(GIF)":""),ids.length); bump({comments:1});
        { const p=(POSTS||[]).find(x=>x.id===pid); if(p&&p.uid&&!ats.includes(p.uid)) note(p.uid,"comment",pid,text||"(GIF)"); ats.forEach(u=>note(u,"mention",pid,text)); }
        if(!/^w\d{8}$/.test(pid)){ try{ const p=(POSTS||[]).find(x=>x.id===pid); const n=((COMM[pid]||[]).length||0)+1; if(p) p.n=n; await api("PATCH",`/clubPosts/${pid}?updateMask.fieldPaths=n&updateMask.fieldPaths=lastAt`,{fields:{n:I(n),lastAt:I(Date.now())}}); }catch(er){} } }
      PICK.delete(form); GIF.delete(form); ta.value=""; form._at={};
      const th=form.closest(".cl-thread"), sub=form.closest(".cs-sub"), wall=form.closest(".cl-wall"), chl=form.closest(".cl-chal-list");
      const say=form.closest(".cl-say");
      if(say){ mountSay(say); }
      else if(chl){ chl.dataset.on=""; mountChal(chl); }
      else if(th) mountThread(th); else if(sub){ const art=sub.closest(".cs-p"); sub.hidden=true; openSub(art,pid); const b=art.querySelector("[data-open]"); if(b){ const n=(COMM[pid]||[]).length+1; b.innerHTML=cmtLbl(n); } } else if(wall) mountWall(wall);
      setSeen(Date.now());
      if(typeof window.toast==="function") window.toast(kind==="comment"?L("Comment added ✓","Comentario agregado ✓"):kind==="idea"?L("Thanks for the idea! 💡","¡Gracias por la idea! 💡"):L("Posted ✓","Publicado ✓"));
    }catch(er){ msg.textContent=er.code===0?"👁 View as is read-only: nothing is saved.":er.code===403?L("You can’t post here yet.","Aún no puedes publicar aquí."):er.message==="too big"?L("That photo is too big. Try another one.","Esa foto es muy grande. Prueba con otra."):er.message==="not an image"?L("That file isn’t a photo.","Ese archivo no es una foto."):L("Didn’t work. Try again.","No funcionó. Intenta de nuevo."); btn.disabled=false; return; }
    btn.disabled=false; msg.textContent=""; });
  /* GIF picker (GIPHY): trending when it opens, search after you stop typing; results cached so the free key's limit lasts */
  const GIF=new WeakMap(), GCACHE={};
  async function giphy(q){ const k=(q||"").trim().toLowerCase(); if(GCACHE[k]) return GCACHE[k];
    const u=k?`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(k)}&limit=24&rating=pg&lang=en&bundle=messaging_non_clips`:`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=24&rating=pg&bundle=messaging_non_clips`;
    const r=await fetch(u); if(!r.ok) throw new Error("giphy "+r.status); const j=await r.json();
    return GCACHE[k]=(j.data||[]).map(g=>{ const s=g.images&&(g.images.fixed_width_small||g.images.fixed_width), b=g.images&&(g.images.fixed_width||g.images.downsized); return s&&b?{s:s.url,u:b.url,w:+b.width||0,h:+b.height||0,t:g.title||"GIF"}:null; }).filter(Boolean); }
  function gifGrid(pick,list){ const grid=pick.querySelector(".cs-gg"); grid.innerHTML=list.length?list.map((g,i)=>`<button type="button" class="cs-gi" data-gifi="${i}" aria-label="${esc(g.t)}"><img src="${esc(g.s)}" alt="" loading="lazy"></button>`).join(""):'<p class="cs-empty">No GIFs found. Try another word.</p>'; pick._list=list; }
  async function gifLoad(pick,q){ const grid=pick.querySelector(".cs-gg"); grid.innerHTML='<p class="cs-load">Loading…</p>'; try{ gifGrid(pick,await giphy(q)); }catch(e){ grid.innerHTML='<p class="cs-off">GIFs couldn\u2019t load right now. Try again in a bit.</p>'; } }
  function gifShow(form){ const g=GIF.get(form), pv=form.querySelector(".cs-prev"); pv.querySelectorAll(".cs-pvg").forEach(x=>x.remove()); if(g) pv.insertAdjacentHTML("beforeend",`<span class="cs-pv cs-pvg"><img src="${esc(g.s||g.u)}" alt="GIF"><button type="button" data-ungif="1" aria-label="Remove GIF">✕</button></span>`); }
  function edPrev(fm){ const pv=fm.querySelector(".cs-prev"); pv.innerHTML=(fm._imgs||[]).map(id=>`<span class="cs-pv"><img data-img="${esc(id)}" alt=""><button type="button" data-edunimg="${esc(id)}" aria-label="${L("Remove photo","Quitar foto")}">✕</button></span>`).join(""); gifShow(fm); paintImgs(pv); }
  let gTimer=null;
  document.addEventListener("input",e=>{ const inp=e.target.closest(".cs-gq"); if(!inp) return; clearTimeout(gTimer); const pick=inp.closest(".cs-gifpick"), q=inp.value.trim(); gTimer=setTimeout(()=>{ if(q.length===1) return; gifLoad(pick,q); },650); });
  document.addEventListener("click",e=>{
    const op=e.target.closest("[data-gifopen]"); if(op){ const form=op.closest("form"), pick=form.querySelector(".cs-gifpick"); const show=pick.hidden; pick.hidden=!show; op.setAttribute("aria-expanded",String(show));
      if(show&&!pick.dataset.ready){ pick.dataset.ready="1"; pick.innerHTML=`<div class="cs-gtop"><input class="cs-gq" type="search" placeholder="Search GIFs" aria-label="Search GIFs"><span class="cs-giphy">Powered by GIPHY</span></div><div class="cs-gg"></div>`; gifLoad(pick,""); }
      if(show) setTimeout(()=>pick.querySelector(".cs-gq")?.focus(),50); return; }
    const gi=e.target.closest("[data-gifi]"); if(gi){ const pick=gi.closest(".cs-gifpick"), form=pick.closest("form"), g=(pick._list||[])[+gi.dataset.gifi]; if(!g) return; GIF.set(form,g); gifShow(form); pick.hidden=true; form.querySelector("[data-gifopen]")?.setAttribute("aria-expanded","false"); return; }
    const ug=e.target.closest("[data-ungif]"); if(ug){ const form=ug.closest("form"); GIF.delete(form); gifShow(form); return; }
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)&&e.target.closest(".cs-comp textarea")){ e.preventDefault(); e.target.closest("form").requestSubmit(); } });
  document.addEventListener("click",async e=>{
    const t=e.target;
    const un=t.closest("[data-unpick]"); if(un){ const form=un.closest("form"); const arr=PICK.get(form)||[]; arr.splice(+un.dataset.unpick,1); PICK.set(form,arr); un.parentElement.remove(); form.querySelectorAll("[data-unpick]").forEach((b,i)=>b.dataset.unpick=i); return; }
    const ro=t.closest("[data-rxopen]"); if(ro){ const pal=ro.parentElement.querySelector(".cs-rxpal"); const o=pal.hidden; document.querySelectorAll(".cs-rxpal").forEach(x=>{ x.hidden=true; }); pal.hidden=!o; ro.setAttribute("aria-expanded",String(o)); return; }
    if(!t.closest(".cs-rxadd")) document.querySelectorAll(".cs-rxpal:not([hidden])").forEach(x=>x.hidden=true);
    if(G()&&t.closest("[data-rx],[data-del],[data-edit],[data-pin],[data-pick],[data-report]")) return;
    const rx=t.closest("[data-rx]"); if(rx){ const wrap=rx.closest("[data-rxpath]"), path=wrap.dataset.rxpath, parts=path.split("/"), id=parts[parts.length-1];
      const item=parts.length>2?(COMM[parts[1]]||[]).find(x=>x.id===id):(POSTS||[]).find(x=>x.id===id); if(!item) return;
      try{ await react(path,item,rx.dataset.rx); }catch(er){ return; } wrap.outerHTML=likeBtn(item,path); return; }
    const rp=t.closest("[data-reply]"); if(rp){ const box=rp.closest(".cs-th,.cs-sub"), ta=box&&box.querySelector(".cs-comp textarea"); if(ta){ const tag="@"+rp.dataset.reply+" "; const fm=ta.closest("form"); if(fm&&rp.dataset.ruid){ fm._at=fm._at||{}; fm._at[rp.dataset.reply]=rp.dataset.ruid; } if(!ta.value.startsWith(tag)) ta.value=tag+ta.value; ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); } return; }
    const ed=t.closest("[data-edit]"); if(ed){ const path=ed.dataset.edit, parts=path.split("/"), id=parts[parts.length-1];
      const item=parts.length>2?(COMM[parts[1]]||[]).find(x=>x.id===id):(POSTS||[]).find(x=>x.id===id); if(!item) return;
      const card=ed.closest(".cs-c,.cs-p,.cl-ans"), p=card.querySelector(":scope > .cs-txt"); if(!p||card.querySelector(".cs-edit")) return;
      p.hidden=true; const media=card.querySelector(":scope > .cs-gif, :scope > .cs-imgs"); if(media) card.querySelectorAll(":scope > .cs-gif, :scope > .cs-imgs").forEach(x=>x.hidden=true);
      p.insertAdjacentHTML("afterend",`<form class="cs-edit" novalidate><textarea rows="3" maxlength="3000" aria-label="Edit">${esc(item.text||"")}</textarea><div class="cs-prev"></div><div class="cs-gifpick" hidden></div><div class="cs-row"><button type="button" class="cs-act cs-gifbtn" data-gifopen="1" aria-expanded="false">GIF</button><span class="cs-msg" role="status"></span><button type="button" class="cs-act" data-edcancel="1">${L("Cancel","Cancelar")}</button><button type="button" class="cs-send" data-edsave="${esc(path)}">${L("Save","Guardar")}</button></div></form>`);
      const fm=card.querySelector(".cs-edit"); fm._imgs=(item.imgs||[]).slice(); const g0=(item.gifs||[])[0]; if(g0) GIF.set(fm,g0); edPrev(fm);
      const ta=fm.querySelector("textarea"); ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); return; }
    const ui=t.closest("[data-edunimg]"); if(ui){ const fm=ui.closest(".cs-edit"); fm._imgs=fm._imgs.filter(x=>x!==ui.dataset.edunimg); edPrev(fm); return; }
    const ec=t.closest("[data-edcancel]"); if(ec){ const card=ec.closest(".cs-c,.cs-p,.cl-ans"); card.querySelector(".cs-edit").remove(); card.querySelectorAll(":scope > .cs-gif, :scope > .cs-imgs").forEach(x=>x.hidden=false); const p=card.querySelector(":scope > .cs-txt"); p.hidden=!p.textContent.trim(); return; }
    const es=t.closest("[data-edsave]"); if(es){ const path=es.dataset.edsave, parts=path.split("/"), id=parts[parts.length-1], card=es.closest(".cs-c,.cs-p,.cl-ans"), box=card.querySelector(".cs-edit"), text=box.querySelector("textarea").value.trim();
      const item=parts.length>2?(COMM[parts[1]]||[]).find(x=>x.id===id):(POSTS||[]).find(x=>x.id===id); if(!item) return;
      const g=GIF.get(box), nm={imgs:(box._imgs||item.imgs||[]).slice(),gifs:g?[{u:g.u,w:g.w||0,h:g.h||0,t:g.t||"GIF"}]:[]};
      if(!text&&!nm.imgs.length&&!nm.gifs.length){ box.querySelector(".cs-msg").textContent=L("Write something first.","Escribe algo primero."); return; }
      es.disabled=true; try{ await editDoc(path,item,text,nm); }catch(er){ box.querySelector(".cs-msg").textContent="Couldn’t save. Try again."; es.disabled=false; return; }
      if(card.classList.contains("cl-ans")){ const cl=card.closest(".cl-chal-list"); if(cl){ cl.dataset.on=""; mountChal(cl); } return; } const fresh=parts.length>2?commentHTML(parts[1],item):postHTML(item); card.outerHTML=fresh; const host=document.querySelector(`[data-cid="${id}"],[data-pid="${id}"]`); if(host){ paintImgs(host); paintPolls(host); } return; }
    const pn=t.closest("[data-pin]"); if(pn){ const id=pn.dataset.pin; PINS=PINS.includes(id)?PINS.filter(x=>x!==id):[id].concat(PINS).slice(0,3); try{ await savePins(); }catch(er){ if(typeof window.toast==="function") window.toast("Couldn’t pin it."); return; } const w=pn.closest(".cl-wall"); if(w) paintWall(w); return; }
    const dl=t.closest("[data-del]"); if(dl){ if(!confirm(L("Delete this? It can't be undone.","¿Borrar esto? No se puede deshacer."))) return; const path=dl.dataset.del; try{ await del(path); }catch(er){ if(typeof window.toast==="function") window.toast("Couldn’t delete it."); return; }
      const parts=path.split("/"); if(parts.length>2){ const pid=parts[1]; COMM[pid]=(COMM[pid]||[]).filter(x=>x.id!==parts[3]); dl.closest(".cs-c").remove(); } else { POSTS=(POSTS||[]).filter(x=>x.id!==parts[1]); (dl.closest(".cs-p,.cl-ans")||{remove(){}}).remove(); } return; }
    const op=t.closest("[data-open]"); if(op){ openSub(op.closest(".cs-p"),op.dataset.open); return; }
    const big=t.closest("[data-big]"); if(big){ const d=IMG[big.dataset.big]; if(!d) return; if(window.__csLightbox) window.__csLightbox(d); return; }
  });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ const lb=document.querySelector(".cs-lb"); if(lb) lb.remove(); } });
  /* Noa's bell: recent club activity */
  async function recent(){ try{ return await query("","clubActivity","DESCENDING",40); }catch(e){ return null; } }
  /* ================= club extras: buddies as avatars, profiles & badges, member bell, @mentions, polls, RSVPs, weekly challenge, reports ================= */
  let FOCUS=null, PICKS={};
  const LSG=(k,d)=>{ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v); }catch(e){ return d; } };
  const LSS=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
  const toast=m=>{ if(typeof window.toast==="function") window.toast(m); };
  const first=n=>String(n||"").trim().split(/\s+/)[0]||"";
  /* everyone's buddy, from the Buddy park */
  let PARK=null, parkP=null;
  function loadPark(){ if(PARK) return Promise.resolve(PARK); if(parkP) return parkP;
    parkP=(async()=>{ const fill=l=>{ const myU=me(); (l||[]).forEach(x=>{ const u=x.me?myU:x.uid; if(u&&x.a&&x.on!==false) PARKMAP[u]=x; }); };
      try{ const P=window.__csPark; if(!P||!P.list){ /* the buddy script isn't ready yet: try again in a moment, don't cache an empty park */ parkP=null; setTimeout(parkLate,1500); return []; }
        const full=P.list(), list=await Promise.race([full,new Promise(r=>setTimeout(()=>r(null),4000))]);
        if(list){ PARK=list; } else { full.then(l=>{ PARK=l||[]; fill(PARK); parkRepaint(); }).catch(()=>{ PARK=null; setTimeout(parkLate,20000); }); parkP=null; return []; }
      }catch(e){ PARK=null; parkP=null; setTimeout(parkLate,20000); return []; }
      fill(PARK); parkP=null; return PARK; })(); return parkP; }
  function parkLate(){ if(PARK) return; loadPark().then(l=>{ if(l&&l.length) parkRepaint(); }); }
  function parkRepaint(){ const v=document.getElementById("v-club"); if(!v||v.hidden||box.querySelector("textarea:focus,input:focus,.cl-ytf,.cl-pplay.on")) return; const ms=document.querySelectorAll(".cl-members[data-on='1']"); if(ms.length){ ms.forEach(x=>mountMembers(x)); return; } render(); }
  /* ---------- profiles (clubProfiles/{uid}) and attendance (clubStats/{uid}, written by Noa's nightly helper) ---------- */
  const SMO=(()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0"); })();
  const SAMPLE_PROFS=[{id:NOA,uid:NOA,name:"Noa (sample)",about:"This is a sample profile.",country:"Chile",since:Date.now()-200*864e5,posts:12,comments:40,ch:0},{id:"x3",uid:"x3",name:"Sam (sample)",about:"This is a sample profile.",country:"Chile",since:Date.now()-180*864e5,posts:6,comments:22,ch:3,mo:{[SMO]:{posts:2,comments:9,ch:1}},watched:["a","b","c"]},{id:"x2",uid:"x2",name:"Alex (sample)",about:"This is a sample profile.",country:"Chile",since:Date.now()-60*864e5,posts:2,comments:11,ch:1,mo:{[SMO]:{posts:1,comments:4,ch:1}}},{id:"x1",uid:"x1",name:"Robin (sample)",about:"",country:"",since:Date.now()-9*864e5,posts:1,comments:2,ch:0}];
  { const md=n=>{ const d=new Date(Date.now()+n*864e5); return String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }; const s3=SAMPLE_PROFS.find(x=>x.id==="x3"), s2=SAMPLE_PROFS.find(x=>x.id==="x2"); if(s3){ s3.bd=md(0); s3.job="Nurse"; } if(s2) s2.bd=md(3); }
  const SAMPLE_STATS={x3:{weeks:wk(-5,0)},x2:{weeks:wk(-2,0)},x1:{weeks:wk(0,0)}};
  function wk(a,b){ const out=[], d=new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); for(let i=a;i<=b;i++){ const x=new Date(d); x.setDate(d.getDate()+7*i); out.push(iso(x)); } return out; }
  function iso(x){ return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); }
  let PROFS=null, STATS=null, profOK=true;
  async function loadProfs(force){ if(G()){ PROFS=SAMPLE_PROFS; STATS=SAMPLE_STATS; return PROFS; } if(PROFS&&!force) return PROFS;
    try{ const r=await api("GET","/clubProfiles?pageSize=300"); PROFS=((r&&r.documents)||[]).map(fromDoc); profOK=true; }catch(e){ PROFS=PROFS||[]; profOK=false; }
    try{ const r=await api("GET","/clubStats?pageSize=300"); STATS={}; ((r&&r.documents)||[]).forEach(d=>{ const o=fromDoc(d); STATS[o.id]=o; }); }catch(e){ STATS=STATS||{}; }
    return PROFS; }
  const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;
  window.__clubWho=async list=>{ try{ await loadProfs(); }catch(e){} return list.map(([u,e])=>({n:u===me()?L("You","Tú"):((profOf(u)||{}).name||L("A member","Un miembro")),e})); };
  /* birthdays (only what each person chose to show) */
  const MONS=()=>L("January February March April May June July August September October November December","enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre").split(" ");
  const bdTxt=md=>{ const [m,d]=String(md).split("-").map(Number); if(!m||!d) return ""; return L(MONS()[m-1]+" "+d, d+" de "+MONS()[m-1]); };
  const ageOf=(md,by)=>{ by=+by; if(!by) return 0; const t=new Date(), [m,d]=String(md).split("-").map(Number); return t.getFullYear()-by-((t.getMonth()+1<m||(t.getMonth()+1===m&&t.getDate()<d))?1:0); };
  const bdOn=(md,y)=>{ let [m,d]=String(md).split("-").map(Number); if(m===2&&d===29&&new Date(y,1,29).getMonth()!==1) d=28; return new Date(y,m-1,d); };
  function bdList(){ const seen=new Set(); return (PROFS||[]).filter(p=>p&&/^\d\d-\d\d$/.test(p.bd||"")&&!seen.has(p.id)&&seen.add(p.id)).map(p=>({uid:p.id,name:p.name||"",bd:p.bd,by:p.by||""})); }
  let BDSIG="";
  window.__clubBdays=bdList;
  window.__clubLoadProfs=()=>loadProfs().then(()=>{ const sig=JSON.stringify(bdList()); if(sig!==BDSIG){ BDSIG=sig; document.dispatchEvent(new CustomEvent("cs-club-bdays")); } }).catch(()=>{});
  /* "This week": today's birthdays, the ones coming up this week, and (once) a nudge to add yours */
  async function mountBdays(el){ el.dataset.on="1"; await loadProfs(); BDSIG=JSON.stringify(bdList());
    const t=new Date(); t.setHours(0,0,0,0); const list=bdList().map(b=>{ let d=bdOn(b.bd,t.getFullYear()); if(d<t) d=bdOn(b.bd,t.getFullYear()+1); return Object.assign({},b,{d,days:Math.round((d-t)/864e5)}); });
    const today=list.filter(b=>b.days===0), soon=list.filter(b=>b.days>0&&b.days<=7).sort((a,b)=>a.days-b.days);
    const mine=G()?null:profOf(me()), askK="cs-bd-ask-"+(me()||"g"), ask=!G()&&me()&&mine&&!mine.bdset&&!LSG(askK,false);
    let h="";
    today.forEach(b=>{ const isMe=b.uid===me(), a=ageOf(b.bd,b.by);
      h+=isMe?`<div class="cl-bdcard"><span class="cl-bdi" aria-hidden="true">🎂</span><div><b>${L("Happy birthday","Feliz cumpleaños")}, ${esc(String(b.name).split(" ")[0])}! 🎉</b><span>${L("The whole club is celebrating you today.","Todo el club te celebra hoy.")}</span></div></div>`
        :`<div class="cl-bdcard"><span class="cl-bdi" aria-hidden="true">🎂</span><div><b>${L("Today is","Hoy es el cumpleaños de")} <button type="button" class="cs-nameb" data-prof="${esc(b.uid)}" data-pname="${esc(b.name)}">${esc(b.name)}</button>${L("’s birthday!"," 🎉")}</b>${a?`<span>${L("They’re turning","Cumple")} ${a} 🎈</span>`:""}</div>${me()?`<button type="button" class="cs-send cl-dmbtn" data-dmto="${esc(b.uid)}" data-dmname="${esc(b.name)}">💬 ${L("Say happy birthday","Saludar")}</button>`:""}</div>`; });
    if(soon.length) h+=`<p class="cl-bsoon">🎈 ${L("Birthdays coming up:","Cumpleaños que se vienen:")} ${soon.map(b=>`<button type="button" class="cs-nameb" data-prof="${esc(b.uid)}" data-pname="${esc(b.name)}">${esc(String(b.name).split(" ")[0])}</button> <small>(${b.days===1?L("tomorrow","mañana"):esc(b.d.toLocaleDateString(L("en-US","es-CL"),{weekday:"short",month:"short",day:"numeric"}))})</small>`).join(" · ")}</p>`;
    if(ask) h+=`<p class="cl-bask">🎂 ${L("Add your birthday to your profile so the club can celebrate you.","Agrega tu cumpleaños a tu perfil para que el club te celebre.")} <button type="button" class="cs-act" data-bdadd="1">${L("Add it","Agregar")}</button><button type="button" class="tip-x" data-bdno="1" aria-label="${L("Not now","Ahora no")}">×</button></p>`;
    el.innerHTML=h; el.hidden=!h; }
  document.addEventListener("click",e=>{ if(e.target.closest("[data-bdno]")){ LSS("cs-bd-ask-"+(me()||"g"),true); const p=e.target.closest(".cl-bask"); if(p) p.remove(); return; }
    if(e.target.closest("[data-bdadd]")){ openProfile(me()).then(()=>{ const b=document.querySelector(".cl-prof-ov [data-pedit]"); if(b){ b.click(); setTimeout(()=>document.querySelector(".cl-prof-ov [data-pf-bm]")?.scrollIntoView({block:"center",behavior:"smooth"}),60); } }); } });
  let SAVEQ=Promise.resolve();
  function saveMe(patch){ const run=()=>saveMe0(patch); const r=SAVEQ.then(run,run); SAVEQ=r.catch(()=>{}); return r; }  /* one save at a time: each one starts from the result of the one before */
  async function saveMe0(patch){ if(G()||!me()) return;
    const d0=await api("GET","/clubProfiles/"+me()); const cur=d0&&d0.fields?fromDoc(d0):{}; /* api throws on any error except "not found", so a failed read never overwrites the saved profile */
    const data={about:cur.about||"",country:cur.country||"",since:cur.since||Date.now(),badges:cur.badges||[],posts:cur.posts|0,comments:cur.comments|0,ch:cur.ch|0,mo:cur.mo||{},watched:cur.watched||[],photo:cur.photo||"",pk:cur.pk||"",pbg:cur.pbg||"",job:cur.job||"",bd:cur.bd||"",by:cur.by||"",bdset:cur.bdset||0};
    Object.assign(data,patch||{});
    await api("PATCH","/clubProfiles/"+me(),{fields:{uid:S(me()),name:S(F().name()||""),at:I(Date.now()),json:S(JSON.stringify(data))}});
    const o=Object.assign({id:me(),uid:me(),name:F().name()},data); PROFS=(PROFS||[]).filter(x=>x.id!==me()).concat([o]); return o; }
  const MON=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0"); };
  async function bump(d){ if(G()||!me()) return; try{ await loadProfs(); const cur=profOf(me())||{}; const p={}; for(const k in d) p[k]=(cur[k]|0)+d[k];
    const mo=Object.assign({},cur.mo||{}), m=MON(), x=Object.assign({},mo[m]||{}); for(const k in d) x[k]=(x[k]|0)+d[k]; mo[m]=x; Object.keys(mo).sort().slice(0,-6).forEach(k=>delete mo[k]); p.mo=mo;
    await saveMe(p); checkBadges(); }catch(e){} }
  let wT=0; function syncWatched(list){ clearTimeout(wT); wT=setTimeout(async()=>{ if(G()||!me()) return; try{ await loadProfs(); await saveMe({watched:list.slice(-300)}); checkBadges(); }catch(e){} },800); }
  document.addEventListener("cs-photo",async e=>{ if(G()||!me()) return; try{ await loadProfs(); await saveMe({photo:(e.detail&&e.detail.photo)||"",pk:(e.detail&&e.detail.k)||"buddy",pbg:(e.detail&&e.detail.bg)||""}); document.querySelectorAll(".cl-members[data-on='1']").forEach(x=>{ x.dataset.on=""; mountMembers(x); }); }catch(er){} });
  let meDone=false;
  document.addEventListener("cs-nick",()=>{ meDone=false; setTimeout(()=>ensureMe().catch(()=>{}),300); });
  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;
    try{ if(window.__csNickReady) await Promise.race([window.__csNickReady,new Promise(r=>setTimeout(r,4000))]); await loadProfs(); const cur=profOf(me()); if(!profOK) return;
      const posts=(POSTS||[]).filter(p=>p.uid===me()).length;
      const ph=window.csMyPhoto?window.csMyPhoto():"";
      const pk=window.csMyPhotoKind?window.csMyPhotoKind():"buddy";
      if(!cur||cur.name!==F().name()||posts>(cur.posts|0)||(cur.photo||"")!==ph||(cur.pk||"")!==pk) await saveMe(Object.assign(posts>((cur&&cur.posts)|0)?{posts}:{},{photo:ph,pk}));
      checkBadges(); }catch(e){} }
  function treat(n,why){ try{ if(window.csBuddy&&window.csBuddy.treat&&window.csBuddy.treat(n,why)) return; }catch(e){} toast(why); }
  /* streaks: weeks in a row with at least one class */
  function weekStats(weeks){ const ws=[...new Set(weeks||[])].sort(); let best=0, run=0, prev=null;
    ws.forEach(w=>{ const t=new Date(w+"T12:00:00").getTime(); run=prev!=null&&Math.round((t-prev)/(7*864e5))===1?run+1:1; best=Math.max(best,run); prev=t; });
    const thisW=wk(0,0)[0], lastW=wk(-1,-1)[0], cur=ws.length&&(ws[ws.length-1]===thisW||ws[ws.length-1]===lastW)?run:0;
    return {classes:ws.length,best,cur}; }
  function statsOf(u){ const p=profOf(u)||{}, st=weekStats(((STATS||{})[u]||{}).weeks); const pick=Object.values(PICKS).filter(id=>{ const x=(POSTS||[]).find(y=>y.id===id); return x&&x.uid===u; }).length;
    const posts=Math.max(p.posts|0,(POSTS||[]).filter(x=>x.uid===u).length);
    const watched=u===me()?Math.max((p.watched||[]).length,(()=>{ try{ return JSON.parse(localStorage.getItem("cs-club-watched")||"[]").length; }catch(e){ return 0; } })()):(p.watched||[]).length;
    const intro=(POSTS||[]).filter(x=>x.uid===u&&x.cat==="intro").length;
    return Object.assign({posts,comments:p.comments|0,ch:p.ch|0,pick,watched,intro},st); }
  /* monthly points for the leaderboard: post 5 · comment 2 · challenge +5 · a week with a class 10 */
  function points(u,m){ const p=profOf(u)||{}, x=((p.mo||{})[m])||{}, wks=(((STATS||{})[u]||{}).weeks||[]).filter(w=>w.slice(0,7)===m).length;
    const live=(POSTS||[]).filter(y=>y.uid===u&&new Date(y.at).toISOString().slice(0,7)===m).length;
    return Math.max(x.posts|0,live)*5+(x.comments|0)*2+(x.ch|0)*5+wks*10; }
  const BADGES=[
    ["hello","👋","First post","Primer post","Wrote your first post on the wall","Tu primer post en el muro",s=>s.posts>=1],
    ["intro","🙌","Said hi","Te presentaste","Introduced yourself on the wall","Te presentaste en el muro",s=>s.intro>=1],
    ["film","🎬","Catch-up pro","Al día","Watched 3 class recordings","Viste 3 grabaciones de clases",s=>s.watched>=3],
    ["chat","💬","Chatterbox","Conversador","10 comments","10 comentarios",s=>s.comments>=10],
    ["chal","✍️","Challenger","Desafiante","Took a weekly challenge","Hiciste un desafío semanal",s=>s.ch>=1],
    ["chal5","🖋️","Writer","Escritor","5 weekly challenges","5 desafíos semanales",s=>s.ch>=5],
    ["star","⭐","Noa’s pick","Elegido por Noa","Noa picked your challenge answer","Noa eligió tu respuesta",s=>s.pick>=1],
    ["first","🎟️","First class","Primera clase","Came to your first club class","Viniste a tu primera clase",s=>s.classes>=1],
    ["fire","🔥","On fire","En racha","3 weeks of classes in a row","3 semanas seguidas de clases",s=>s.best>=3],
    ["medal","🏅","Regular","Habitual","4 weeks in a row","4 semanas seguidas",s=>s.best>=4],
    ["grad","🎓","Ten weeks","Diez semanas","Classes in 10 different weeks","Clases en 10 semanas distintas",s=>s.classes>=10]];
  const earned=u=>{ const s=statsOf(u); return BADGES.filter(b=>b[6](s)); };
  function checkBadges(){ if(G()||!me()) return; const got=earned(me()).map(b=>b[0]), key="cs-club-badges-"+me(), had=LSG(key,null);
    if(had===null){ LSS(key,got); syncBadges(got); return; }  /* first time on this device: no fanfare for old badges */
    const fresh=got.filter(b=>!had.includes(b)); if(!fresh.length){ syncBadges(got); return; }
    LSS(key,got); syncBadges(got);
    fresh.forEach((id,i)=>{ const b=BADGES.find(x=>x[0]===id); setTimeout(()=>treat(5,`${b[1]} ${L("New badge:","Nueva insignia:")} <b>${esc(L(b[2],b[3]))}</b>!`),400+i*2500); }); }
  function syncBadges(got){ const cur=profOf(me()); if(cur&&JSON.stringify(cur.badges||[])!==JSON.stringify(got)) saveMe({badges:got}).catch(()=>{}); }
  /* your little strip on "This week": streak + badges */
  async function mountMe(el){ el.dataset.on="1"; if(!me()&&!G()) return; await Promise.all([loadProfs(),POSTS?null:listPosts().then(p=>{ POSTS=p; }).catch(()=>{}),loadPins()]);
    const u=G()?"x3":me(), s=statsOf(u), bs=earned(u);
    el.innerHTML=`<button type="button" class="cl-mestrip" data-prof="${esc(u)}">${s.cur>=2?`<span class="cl-streak">🔥 ${s.cur} ${L("weeks in a row","semanas seguidas")}</span>`:s.classes?`<span>🎟️ ${s.classes} ${s.classes===1?L("week of classes","semana de clases"):L("weeks of classes","semanas de clases")}</span>`:`<span>👋 ${L("Come to a class this week to start your streak","Ven a una clase esta semana y empieza tu racha")}</span>`}<span class="cl-mebadges">${bs.map(b=>`<i title="${esc(L(b[2],b[3]))}">${b[1]}</i>`).join("")||`<small>${L("No badges yet","Aún sin insignias")}</small>`}</span><span class="cl-mego">${L("My profile","Mi perfil")} →</span></button>`; }
  /* ---------- Members tab: directory ---------- */
  async function mountMembers(el){ el.dataset.on="1"; el.innerHTML=`<p class="cs-load">${L("Loading…","Cargando…")}</p>`;
    await Promise.all([loadProfs(true),loadPark(),loadPins(),POSTS?null:listPosts().then(p=>{ POSTS=p; }).catch(()=>{})]);
    let list=(PROFS||[]).slice();
    (POSTS||[]).forEach(p=>{ if(p.uid&&!list.some(x=>x.id===p.uid)) list.push({id:p.uid,uid:p.uid,name:p.name}); });
    { const fd=window.__clubFeed&&window.__clubFeed(); ((fd&&fd.roster)||[]).forEach(r=>{ if(r.uid&&!list.some(x=>x.id===r.uid)) list.push({id:r.uid,uid:r.uid,name:r.name}); }); }
    list.sort((a,b)=>(b.id===NOA)-(a.id===NOA)||(b.id===me())-(a.id===me())||String(a.name).localeCompare(String(b.name)));
    const m=MON(), board=list.filter(x=>x.id!==NOA).map(x=>({x,pt:points(x.id,m)})).filter(b=>b.pt>0).sort((a,b)=>b.pt-a.pt), myI=board.findIndex(b=>b.x.id===me());
    const lb=`<div class="cl-board"><div class="cl-boardh"><h3>🏆 ${L("This month","Este mes")}</h3><details class="cl-howpts"><summary>${L("How points work","Cómo funcionan los puntos")}</summary><p>${L("A post 5 · a comment 2 · a weekly challenge +5 · each week you come to a class 10. It starts again every month.","Un post 5 · un comentario 2 · un desafío semanal +5 · cada semana que vienes a clase 10. Se reinicia cada mes.")}</p></details></div>
      ${board.length?`<ol>${board.slice(0,5).map((b,i)=>`<li${b.x.id===me()?' class="me"':""}><span class="r">${["🥇","🥈","🥉","4","5"][i]}</span><button type="button" class="cs-nameb" data-prof="${esc(b.x.id)}" data-pname="${esc(b.x.name||"")}">${av(b.x.id,b.x.name)} ${esc(b.x.name||"")}</button><b>${b.pt}</b></li>`).join("")}</ol>${myI>4?`<p class="cl-myrank">${L("You’re","Vas en el lugar")} #${myI+1} ${L("with","con")} ${board[myI].pt} ${L("points","puntos")}</p>`:""}`:`<p class="cl-empty">${L("No points yet this month. Post, comment or come to a class to get on the board!","Aún no hay puntos este mes. ¡Publica, comenta o ven a clase para aparecer aquí!")}</p>`}</div>`;
    el.innerHTML=(me()||G()?'<div class="cl-me" data-mestrip="1"></div>':"")+lb+`<p class="cl-mintro">${L("Everyone in the club on Hibi. Tap someone to see their profile, buddy and badges.","Todos los del club en Hibi. Toca a alguien para ver su perfil, su buddy y sus insignias.")}</p>
      ${!profOK&&!G()?`<p class="cs-off">${L("Profiles are almost ready. They’ll switch on very soon.","Los perfiles están casi listos. Se activan muy pronto.")}</p>`:""}
      <div class="cl-mgrid">${list.map(x=>{ const s=statsOf(x.id), bs=earned(x.id), bd=PARKMAP[x.id];
        return `<button type="button" class="cl-mcard${x.id===me()?" me":""}" data-prof="${esc(x.id)}" data-pname="${esc(x.name||"")}"><span class="cl-mav">${av(x.id,x.name)}</span><b>${esc(x.name||L("Member","Miembro"))}${x.id===me()?` <small>(${L("you","tú")})</small>`:""}</b>
          <span class="cl-msub">${x.id===NOA?L("Coach","Coach"):[bd&&(bd.cefr||(bd.role&&bd.role.lv))?"📊 "+esc(String(bd.cefr||bd.role.lv).slice(0,7)):"",x.country?esc(x.country):""].filter(Boolean).join(" · ")}</span>
          ${s.cur>=2?`<span class="cl-mstreak">🔥 ${s.cur}</span>`:""}<span class="cl-mbadges">${bs.slice(-5).map(b=>`<i title="${esc(L(b[2],b[3]))}">${b[1]}</i>`).join("")}</span></button>`; }).join("")}</div>`;  const ms=el.querySelector(".cl-me"); if(ms) mountMe(ms); }
  /* ---------- profile popup ---------- */
  async function openProfile(u,nm){ if(!u) return; await Promise.all([loadProfs(),loadPark()]);
    const p=profOf(u)||{name:nm}, bd=PARKMAP[u], s=statsOf(u), got=earned(u).map(b=>b[0]), mine=u===(G()?"":me());
    const svg=bd&&window.csBuddy?(bd.me&&window.csBuddy.portrait?window.csBuddy.portrait():window.csBuddy.of(bd)):"";
    const bn=bd?(bd.n&&String(bd.n).trim())||"":"";
    const lv=bd&&(bd.cefr||(bd.role&&bd.role.lv));
    const since=p.since?new Date(p.since).toLocaleDateString(L("en-US","es-CL"),{month:"long",year:"numeric"}):"";
    const o=document.createElement("div"); o.className="cl-prof-ov"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label",L("Profile","Perfil"));
    o.innerHTML=`<div class="cl-prof"><button type="button" class="cl-prof-x" data-pclose="1" aria-label="${L("Close","Cerrar")}">✕</button>
      <div class="cl-prof-top"><div class="cl-prof-pic">${av(u,p.name||nm)}${svg&&bd&&bd.on!==false&&bd.a?(()=>{ const I=window.csBuddy&&window.csBuddy.info?window.csBuddy.info(bd):null, nmB=bn||(I&&I.species)||L("Buddy","Buddy");
          return `<button type="button" class="cl-prof-pet" data-ppet="1" aria-label="${esc(L("About ","Sobre ")+nmB)}" aria-expanded="false">${svg}</button><div class="cl-prof-tip" role="tooltip"><b>${esc(nmB)}</b>${I&&I.species&&bn?` <span>${L("the","")} ${esc(I.species)}</span>`:""}${I&&I.shiny?" ✨":""}
            <ul><li>💛 ${L("Friendship level","Nivel de amistad")} ${I?I.lvl:(bd.lvl|0||1)}</li>${I&&I.wearing.length?`<li>👕 ${L("Wearing","Lleva")}: ${esc(I.wearing.join(", "))}</li>`:""}${I&&I.words?`<li>📚 ${I.words} ${L("words saved","palabras guardadas")}</li>`:""}${I&&I.dw?`<li>⚔️ ${I.dw} ${I.dw===1?L("duel win","duelo ganado"):L("duel wins","duelos ganados")}</li>`:""}</ul></div>`; })():""}</div><div><h2>${esc(p.name||nm||L("Member","Miembro"))}</h2>${p.job?`<p class="cl-prof-job">✨ ${esc(p.job)}</p>`:""}
        <p class="cl-prof-meta">${u===NOA?`<span class="cs-noa">${L("Coach","Coach")}</span>`:""}${lv?`<span>📊 ${esc(String(lv).slice(0,7))}</span>`:""}${p.country?`<span>📍 ${esc(p.country)}</span>`:""}${p.bd?`<span>🎂 ${esc(bdTxt(p.bd))}${p.by&&ageOf(p.bd,p.by)>0?` · ${ageOf(p.bd,p.by)} ${L("years old","años")}`:""}</span>`:""}${since?`<span>🌼 ${L("Member since","Miembro desde")} ${esc(since)}</span>`:""}</p>
</div></div>
      <div class="cl-prof-about" data-pabout>${p.about?`<p>${esc(p.about)}</p>`:mine?`<p class="muted">${L("Tell the club a bit about you.","Cuéntale al club un poco sobre ti.")}</p>`:""}</div>
      ${mine?`<button type="button" class="cs-act" data-pedit="1">✏️ ${L("Edit my profile","Editar mi perfil")}</button>`:`<button type="button" class="cs-send cl-dmbtn" data-dmto="${esc(u)}" data-dmname="${esc(p.name||nm||"")}">💬 ${L("Message","Mensaje")}</button>`}
      <div class="cl-prof-stats"><div><b>${s.cur||0}</b><span>🔥 ${L("week streak","semanas seguidas")}</span></div><div><b>${s.classes}</b><span>🎟️ ${L("weeks of classes","semanas con clases")}</span></div><div><b>${s.posts}</b><span>📝 ${L("posts","posts")}</span></div><div><b>${s.comments}</b><span>💬 ${L("comments","comentarios")}</span></div><div><b>${s.ch}</b><span>✍️ ${L("challenges","desafíos")}</span></div></div>
      <h3>${L("Badges","Insignias")}</h3><div class="cl-prof-badges">${BADGES.filter(b=>mine||got.includes(b[0])).map(b=>`<div class="cl-badge${got.includes(b[0])?"":" off"}"><span>${b[1]}</span><b>${esc(L(b[2],b[3]))}</b><small>${esc(L(b[4],b[5]))}</small></div>`).join("")||`<p class="muted">${L("No badges yet.","Aún no tiene insignias.")}</p>`}</div>
      ${mine?`<p class="cl-prof-tip">${L("Each new badge gives your buddy 5 treats 🍪","Cada insignia nueva le da 5 galletas a tu buddy 🍪")}</p>`:""}</div>`;
    document.body.appendChild(o); o.querySelector(".cl-prof-x").focus();
    o.addEventListener("click",async e=>{ if(e.target===o||e.target.closest("[data-pclose]")){ o.remove(); return; }
      if(e.target.closest("[data-pedit]")){ const box=o.querySelector("[data-pabout]"); e.target.closest("[data-pedit]").hidden=true;
        let cur=profOf(me())||{}; try{ await SAVEQ; const d0=await api("GET","/clubProfiles/"+me()); if(d0&&d0.fields) cur=fromDoc(d0); }catch(er){}
        const gn=window.__csGoogleName?window.__csGoogleName():"", nmNow=F().name()||"", ys=new Date().getFullYear();
        box.innerHTML=`<label class="cl-pf">${L("My name","Mi nombre")}<input type="text" data-pf-name maxlength="40" value="${esc(nmNow)}" autocomplete="off">${gn&&gn!==nmNow?`<small class="cl-pfh">${L("Your Google name:","Tu nombre de Google:")} ${esc(gn)} · <button type="button" class="foot-link" data-pf-gn>${L("Use it","Usarlo")}</button></small>`:`<small class="cl-pfh">${L("How everyone sees you on Hibi. For example, just your first name.","Cómo te ven todos en Hibi. Por ejemplo, solo tu primer nombre.")}</small>`}</label>
          <label class="cl-pf">${L("My title","Mi título")} <small>(${L("optional","opcional")})</small><input type="text" data-pf-job maxlength="50" value="${esc(cur.job||"")}" placeholder="${L("e.g. Nurse, Gamer, Coffee lover, Student","ej. Enfermera, Gamer, Amante del café, Estudiante")}"></label>
          <label class="cl-pf">${L("About me","Sobre mí")}<textarea data-pf-about maxlength="200" rows="3">${esc(cur.about||"")}</textarea></label>
          <label class="cl-pf">${L("Where are you from?","¿De dónde eres?")}<input type="text" data-pf-country maxlength="40" value="${esc(cur.country||"")}"></label>
          <fieldset class="cl-pf cl-pfbd"><legend>🎂 ${L("My birthday","Mi cumpleaños")} <small>(${L("optional","opcional")})</small></legend>
            <div class="cl-pfbdr"><select data-pf-bm aria-label="${L("Month","Mes")}"><option value="">${L("Month","Mes")}</option>${MONS().map((m,i)=>`<option value="${String(i+1).padStart(2,"0")}">${m[0].toUpperCase()+m.slice(1)}</option>`).join("")}</select>
            <select data-pf-bdd aria-label="${L("Day","Día")}"><option value="">${L("Day","Día")}</option>${Array.from({length:31},(_,i)=>`<option value="${String(i+1).padStart(2,"0")}">${i+1}</option>`).join("")}</select>
            <input type="number" data-pf-by inputmode="numeric" min="${ys-100}" max="${ys-5}" placeholder="${L("Year (optional)","Año (opcional)")}" aria-label="${L("Year","Año")}"></div>
            <label class="cs-chk"><input type="checkbox" data-pf-bshow checked> <span><b>${L("Show my birthday in the club","Mostrar mi cumpleaños en el club")}</b><small>${L("🎂 on the calendar, and the club gets a little reminder on your day.","🎂 en el calendario, y el club recibe un recordatorio ese día.")}</small></span></label>
            <label class="cs-chk"><input type="checkbox" data-pf-ashow> <span><b>${L("Show my age","Mostrar mi edad")}</b><small>${L("Only if you add the year.","Solo si agregas el año.")}</small></span></label>
            <small class="cl-pfh">🔒 ${L("Your full date stays private. Only what you tick is shown.","Tu fecha completa es privada. Solo se muestra lo que marques.")}</small></fieldset>
          <div class="cs-row"><span class="cs-msg" role="status"></span><button type="button" class="cs-send" data-psave="1">${L("Save","Guardar")}</button></div>`;
        const q=k=>box.querySelector("[data-pf-"+k+"]"), syncAge=()=>{ const ok=/^\d{4}$/.test(q("by").value.trim()); q("ashow").disabled=!ok; if(!ok) q("ashow").checked=false; };
        q("by").addEventListener("input",syncAge); syncAge();
        box.querySelector("[data-pf-gn]")?.addEventListener("click",()=>{ q("name").value=gn; q("name").focus(); });
        if(window.__csGetBday) window.__csGetBday().then(v=>{ const m=String(v||"").match(/^(\d{4}|-)?-?(\d\d)-(\d\d)$/); if(!m||!document.body.contains(box)) return; q("bm").value=m[2]; q("bdd").value=m[3]; if(m[1]&&m[1]!=="-") q("by").value=m[1]; q("bshow").checked=!!cur.bd; q("ashow").checked=!!cur.by; syncAge(); });
        q("name").focus(); return; }
      if(e.target.closest("[data-psave]")){ const box=o.querySelector("[data-pabout]"), q=k=>box.querySelector("[data-pf-"+k+"]"), msg=box.querySelector(".cs-msg");
        const about=q("about").value.trim(), country=q("country").value.trim(), job=q("job").value.trim(), nmIn=q("name").value.replace(/\s+/g," ").trim();
        const bm=q("bm").value, bdd=q("bdd").value, byv=q("by").value.trim(), ys=new Date().getFullYear();
        if(!nmIn){ msg.textContent=L("Write your name first.","Escribe tu nombre primero."); q("name").focus(); return; }
        if((bm&&!bdd)||(!bm&&bdd)){ msg.textContent=L("Choose the month and the day of your birthday.","Elige el mes y el día de tu cumpleaños."); return; }
        if(bm&&new Date(2024,+bm-1,+bdd).getMonth()!==+bm-1){ msg.textContent=L("That day doesn’t exist in that month.","Ese día no existe en ese mes."); return; }
        if(byv&&(!/^\d{4}$/.test(byv)||+byv<ys-100||+byv>ys-5)){ msg.textContent=L("Check the year.","Revisa el año."); return; }
        const md=bm?bm+"-"+bdd:"", full=md?(byv?byv+"-"+md:"--"+md):"";
        try{ const gn=window.__csGoogleName?window.__csGoogleName():""; if(nmIn!==F().name()&&window.__csSetNick) await window.__csSetNick(nmIn===gn?"":nmIn);
          if(window.__csSetBday) await window.__csSetBday(full);
          await saveMe({about,country,job,bd:md&&q("bshow").checked?md:"",by:md&&byv&&q("ashow").checked?byv:"",bdset:md?1:0}); }catch(er){ box.querySelector(".cs-msg").textContent=L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo."); return; }
        o.remove(); openProfile(me()); toast(L("Profile saved ✓","Perfil guardado ✓")); document.querySelectorAll(".cl-members[data-on='1']").forEach(x=>{ x.dataset.on=""; mountMembers(x); }); } });
  }
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ document.querySelector(".cl-prof-ov")?.remove(); document.getElementById("clBellPanel")?.setAttribute("hidden",""); } });
  /* ---------- notifications for members (clubNotes, addressed to one person) ---------- */
  async function note(to,kind,pid,text){ if(!to||to===me()||G()||!me()) return; try{ await api("POST","/clubNotes?documentId="+rid(),{fields:{uid:S(me()),name:S(F().name()||""),to:S(to),kind:S(kind),pid:S(pid||""),text:S(String(text||"").slice(0,120)),at:I(Date.now())}}); }catch(e){} }
  const BSEEN="cs-clbell-seen";
  let NOTES=[], bellT=0;
  const SAMPLE_NOTES=[{id:"n1",name:"Sam (sample)",kind:"comment",pid:"s1",text:"Great question! I use Culips.",at:H(1)},{id:"n2",name:"Alex (sample)",kind:"react",pid:"s1",text:"❤️",at:H(4)},{id:"n3",name:"Noa (sample)",kind:"mention",pid:"s2",text:"@Robin welcome to the club!",at:H(30)}];
  async function loadNotes(){ if(G()){ NOTES=SAMPLE_NOTES; return; } if(!me()) return;
    try{ const res=await api("POST",":runQuery",{structuredQuery:{from:[{collectionId:"clubNotes"}],where:{fieldFilter:{field:{fieldPath:"to"},op:"EQUAL",value:S(me())}},limit:200}});
      const all=(res||[]).filter(x=>x.document).map(x=>fromDoc(x.document)); const old=Date.now()-30*864e5;
      all.filter(n=>n.at<old).slice(0,20).forEach(n=>api("DELETE","/clubNotes/"+n.id).catch(()=>{}));  /* tidy up after a month */
      NOTES=all.filter(n=>n.at>=old).sort((a,b)=>b.at-a.at).slice(0,40); }catch(e){ NOTES=NOTES||[]; } }
  function noteTxt(n){ const nm=`<b>${esc(n.name||L("Someone","Alguien"))}</b>`, weekly=/^w\d{8}$/.test(n.pid||"");
    if(n.kind==="comment") return `💬 ${nm} ${L("commented on your post","comentó tu post")}`;
    if(n.kind==="react") return `${esc(String(n.text||"").split(" ")[0]||"❤️")} ${nm} ${L("reacted to your post","reaccionó a tu post")}`;
    if(n.kind==="reactc") return `${esc(String(n.text||"").split(" ")[0]||"❤️")} ${nm} ${L("reacted to your comment","reaccionó a tu comentario")}`;
    if(n.kind==="dm") return `💬 ${nm} ${L("sent you a message","te envió un mensaje")}`;
    if(n.kind==="mention") return `@ ${nm} ${L("mentioned you","te mencionó")}${weekly?L(" on the weekly post"," en el post semanal"):""}`;
    return `🔔 ${nm}`; }
  let CNSNAP=null;
  const isClubber=()=>{ const fd=window.__clubFeed&&window.__clubFeed(); return !!fd; };
  function KDH(){ try{ const h=JSON.parse(localStorage.getItem("ncs-kudos-hid")||"[]"); return Array.isArray(h)?h:[]; }catch(e){ return []; } }
  function DZN(){ try{ return window.__bdDuelNotes?window.__bdDuelNotes():[]; }catch(e){ return []; } }
  function dzHTML(pn){ const l=DZN(); return l.length?`<h4 class="clb-sec">⚔️ ${L("Duels","Duelos")}</h4><ul>${l.map(m=>`<li><button type="button" class="clb-i${(m.at||0)>(+pn.dataset.seen||0)?" new":""}" data-dzgo="1"><span>${m.t}</span><em>${typeof ago==="function"?ago(m.at):""}</em></button></li>`).join("")}</ul>`:""; }
  document.addEventListener("cs-duelnote",()=>{ try{ paintBell(); }catch(e){} });
  function KDN(){ try{ const h=JSON.parse(localStorage.getItem("ncs-kudos")||"[]"), hid=KDH(); return Array.isArray(h)?h.filter(m=>m&&m.text&&!hid.includes(m.at||0)):[]; }catch(e){ return []; } }
  document.addEventListener("click",e=>{ const x=e.target.closest("[data-kdhide]"); if(!x) return; e.preventDefault(); e.stopPropagation();
    if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ if(typeof window.toast==="function") window.toast("In View as nothing changes. Members can hide a note here."); return; }
    const at=+x.dataset.kdhide||0, h=KDH(); if(!h.includes(at)){ h.push(at); try{ localStorage.setItem("ncs-kudos-hid",JSON.stringify(h.slice(-200))); }catch(err){} }
    const li=x.closest("li"), ul=li&&li.parentElement; if(li) li.remove();
    if(ul&&!ul.querySelector("li")){ const h4=ul.previousElementSibling, r=ul.nextElementSibling; if(r&&r.classList.contains("clb-kdr")) r.remove(); if(h4&&h4.tagName==="H4") h4.remove(); ul.remove(); }
    if(typeof window.toast==="function") window.toast("Hidden. You can still find it under See all.");
    try{ paintBell(); }catch(err){} }, true);
  document.addEventListener("click",e=>{ const o=e.target.closest("[data-kdopen],[data-kdreply]"); if(!o) return; const pn=document.getElementById("clBellPanel"); if(pn) pn.hidden=true;
    if(o.dataset.kdreply){ if(window.__csPreview||(window.__csFire&&window.__csFire.readOnly&&window.__csFire.readOnly())){ if(typeof window.toast==="function") window.toast("In View as nothing is sent."); return; } if(window.__clubDM) window.__clubDM("J8D2tjQmBaaA2QN730tSfSrjfm73","Noa"); return; }
    const k=document.getElementById("kdLink"); if(k) k.click(); });
  function paintBell(){ const b=document.getElementById("clBell"); if(!b) return; const CN=window.__csCoachNews?window.__csCoachNews.list():[], club=isClubber(), seen=+LSG(BSEEN,0)||0, n=(club?NOTES.filter(x=>x.kind!=="dm"&&x.at>seen).length:0)+CN.length+KDN().filter(m=>(m.at||0)>seen).length+DZN().filter(m=>(m.at||0)>seen).length;
    b.classList.toggle("has",!!n); const c=b.querySelector(".clb-n"); c.hidden=!n; c.textContent=n>9?"9+":String(n);
    b.setAttribute("aria-label",L("Notifications","Notificaciones")+(n?` (${n})`:""));
    const pn=document.getElementById("clBellPanel"); if(!pn||pn.hidden) return;
    const cn=CNSNAP||CN, fdt=d=>{ try{ return new Date(d+"T12:00").toLocaleDateString(L("en-US","es-CL"),{month:"short",day:"numeric"}); }catch(e){ return d; } };
    const kdl=KDN().slice(0,3), kfmt=t=>{ try{ return new Date(t).toLocaleDateString(L("en-US","es-CL"),{month:"short",day:"numeric"}); }catch(e){ return ""; } };
    const kdHTML=kdl.length?`<h4 class="clb-sec">💌 ${L("From Noa","De Noa")}</h4><ul>${kdl.map(m=>`<li class="clb-kdli"><button type="button" class="clb-i${(m.at||0)>(+pn.dataset.seen||0)?" new":""}" data-kdopen="1"><span>${esc(String(m.text||"").slice(0,110))}${String(m.text||"").length>110?"…":""}</span><em>${kfmt(m.at)}</em></button><button type="button" class="clb-kdx" data-kdhide="${m.at||0}" title="${L("Hide this note","Ocultar esta nota")}" aria-label="${L("Hide this note","Ocultar esta nota")}">✕</button></li>`).join("")}</ul><div class="clb-kdr"><button type="button" class="clb-kd-b" data-kdopen="1">${L("See all","Ver todos")}</button><button type="button" class="clb-kd-b" data-kdreply="1">💬 ${L("Reply to Noa","Responder a Noa")}</button></div>`:"";
    const coachHTML=cn.length?`<h4 class="clb-sec">📚 ${L("Your classes","Tus clases")}</h4><ul>${cn.map(x=>`<li><button type="button" class="clb-i new" data-cngo="${esc(x.tab||"top")}"><span>${x.ico} ${x.t}</span><em>${fdt(x.d)}</em></button></li>`).join("")}</ul>`:"";
    if(!club){ pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+kdHTML+dzHTML(pn)+(coachHTML||(kdHTML||dzHTML(pn))&&" "||`<p class="clb-e">${L("Nothing new right now. When Noa adds a class recap, a recommendation or a progress report, you’ll see it here.","Nada nuevo por ahora. Cuando Noa suba un resumen de clase, una recomendación o un informe de progreso, lo verás aquí.")}</p>`); return; }
    pn.innerHTML=`<div class="clb-h"><b>🔔 ${L("Notifications","Notificaciones")}</b></div>`+kdHTML+dzHTML(pn)+coachHTML+(coachHTML?`<h4 class="clb-sec">🌼 ${L("Club","Club")}</h4>`:"")+`${NOTES.some(x=>x.kind!=="dm")?`<ul>${NOTES.filter(x=>x.kind!=="dm").map(x=>`<li><button type="button" class="clb-i${x.at>(+pn.dataset.seen||0)?" new":""}" data-bgo="${esc(x.pid||"")}"><span>${noteTxt(x)}${x.text&&!/^react/.test(x.kind)?`<small>“${esc(x.text)}”</small>`:""}</span><em>${ago(x.at)}</em></button></li>`).join("")}</ul>`:`<p class="clb-e">${L("Nothing yet. When someone replies to you, reacts to your posts or mentions you, it shows up here.","Nada aún. Cuando alguien te responda, reaccione a tus posts o te mencione, aparece aquí.")}</p>`}`; }
  function buildBell(){ if(document.getElementById("clBellWrap")) return; const anchor=document.getElementById("tmWrap")||document.getElementById("csWrap"); if(!anchor||!anchor.parentNode) return;
    const w=document.createElement("div"); w.id="clBellWrap"; w.className="cs-wrap clb-wrap"; w.hidden=true;
    w.innerHTML=`<button type="button" id="clBell" class="cs-btn clb-btn" aria-expanded="false" aria-controls="clBellPanel" title="${L("Notifications","Notificaciones")}"><span aria-hidden="true">🔔</span><span class="clb-n" hidden></span></button><div id="clBellPanel" class="cs-panel clb-panel" role="dialog" aria-label="${L("Club notifications","Notificaciones del club")}" hidden></div>`;
    anchor.parentNode.insertBefore(w,anchor);
    w.querySelector("#clBell").addEventListener("click",async()=>{ const pn=document.getElementById("clBellPanel"), open=pn.hidden; pn.hidden=!open; w.querySelector("#clBell").setAttribute("aria-expanded",String(open));
      if(open){ CNSNAP=window.__csCoachNews?window.__csCoachNews.list():[]; pn.dataset.seen=String(+LSG(BSEEN,0)||0); paintBell(); if(isClubber()){ await loadNotes(); paintBell(); } if(!G()&&!window.__csViewAsMode){ LSS(BSEEN,Date.now()); if(CNSNAP.length&&window.__csCoachNews) window.__csCoachNews.seen(); } setTimeout(paintBell,0); } else { CNSNAP=null; paintBell(); } });
    document.addEventListener("click",e=>{ const pn=document.getElementById("clBellPanel"); if(pn&&!pn.hidden&&!e.target.closest("#clBellWrap")){ pn.hidden=true; CNSNAP=null; document.getElementById("clBell")?.setAttribute("aria-expanded","false"); paintBell(); } }); }
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-cngo]"); if(!g) return; const pn=document.getElementById("clBellPanel"); if(pn) pn.hidden=true; CNSNAP=null; paintBell(); window.__csCoachNews&&window.__csCoachNews.go(g.dataset.cngo); });
  function bellCheck(){ const fd=window.__clubFeed&&window.__clubFeed(), coach=!!window.__csHubView&&!window.__csTeacher, on=(!!fd||coach)&&(G()||(!!me()&&me()!==NOA))&&(!window.__csPreview||!!window.__csViewAsMode); buildBell(); const w=document.getElementById("clBellWrap"); if(!w) return; w.hidden=!on;
    if(on&&fd&&Date.now()-bellT>600000){ bellT=Date.now(); loadNotes().then(paintBell); } else if(on) paintBell(); }
  ["cs-club","cs-hubview"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(bellCheck,50))); window.addEventListener("cs-auth",()=>setTimeout(bellCheck,300));
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden) bellCheck(); }); setInterval(()=>{ if(!document.hidden) bellCheck(); },60000); setTimeout(bellCheck,800);
  document.addEventListener("click",e=>{ const g=e.target.closest("[data-bgo]"); if(!g) return; const pid=g.dataset.bgo; const pn=document.getElementById("clBellPanel"); if(pn) pn.hidden=true; paintBell();
    if(/^dm:/.test(pid)){ const n=(NOTES||[]).find(x=>x.pid===pid); window.__clubDM(pid.slice(3),n&&n.name); return; }
    if(location.hash!=="#club") location.hash="#club";
    setTimeout(()=>{ if(/^w\d{8}$/.test(pid)||!pid){ window.__clubTab&&window.__clubTab("week"); setTimeout(()=>document.querySelector(".cl-thread")?.scrollIntoView({block:"start",behavior:"smooth"}),500); } else { FOCUS=pid; window.__clubTab&&window.__clubTab("wall"); } },60); });
  /* ---------- @mentions: suggestions while typing, and who to notify ---------- */
  function people(){ const m=new Map(); (PROFS||[]).forEach(p=>m.set(p.id,p.name)); (POSTS||[]).forEach(p=>{ if(p.uid&&!m.has(p.uid)) m.set(p.uid,p.name); }); Object.values(COMM).flat().forEach(c=>{ if(c.uid&&!m.has(c.uid)) m.set(c.uid,c.name); }); m.delete(me()); return [...m].map(([uid,name])=>({uid,name})).filter(x=>x.name); }
  function mentionsIn(form,text){ const at=form._at||{}, out=new Set(), ppl=people();
    (String(text).match(/(^|\s)@([A-Za-zÁÉÍÓÚÑáéíóúñü]+)/g)||[]).forEach(m=>{ const w=m.trim().slice(1); if(at[w]){ out.add(at[w]); return; } const hit=ppl.filter(p=>first(p.name).toLowerCase()===w.toLowerCase()); if(hit.length===1) out.add(hit[0].uid); });
    out.delete(me()); return [...out]; }
  document.addEventListener("input",async e=>{ const ta=e.target.closest(".cs-comp textarea"); if(!ta) return; const box=ta.parentElement.querySelector(".cs-ment"); if(!box) return;
    const before=ta.value.slice(0,ta.selectionStart), m=before.match(/(^|\s)@([A-Za-zÁÉÍÓÚÑáéíóúñü]*)$/); if(!m){ box.hidden=true; return; }
    if(!PROFS) await loadProfs(); const q=m[2].toLowerCase(), list=people().filter(p=>p.name.toLowerCase().split(/\s+/).some(w=>w.startsWith(q))).slice(0,6);
    if(!list.length){ box.hidden=true; return; } box._q=m[2]; box.innerHTML=list.map((p,i)=>`<button type="button" role="option" class="cs-mi${i?"":" on"}" data-mpick="${esc(p.uid)}" data-mname="${esc(first(p.name))}">${av(p.uid,p.name)}<span>${esc(p.name)}</span></button>`).join(""); box.hidden=false; });
  function pickMention(btn){ const box=btn.closest(".cs-ment"), ta=box.parentElement.querySelector("textarea"), form=ta.closest("form"), nm=btn.dataset.mname;
    const pos=ta.selectionStart, before=ta.value.slice(0,pos).replace(/@([A-Za-zÁÉÍÓÚÑáéíóúñü]*)$/,"@"+nm+" "); ta.value=before+ta.value.slice(pos); ta.focus(); ta.setSelectionRange(before.length,before.length);
    form._at=form._at||{}; form._at[nm]=btn.dataset.mpick; box.hidden=true; }
  document.addEventListener("keydown",e=>{ const ta=e.target.closest(".cs-comp textarea"); if(!ta) return; const box=ta.parentElement.querySelector(".cs-ment"); if(!box||box.hidden) return;
    const items=[...box.querySelectorAll(".cs-mi")], i=items.findIndex(x=>x.classList.contains("on"));
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){ e.preventDefault(); const j=(i+(e.key==="ArrowDown"?1:-1)+items.length)%items.length; items.forEach((x,k)=>x.classList.toggle("on",k===j)); }
    else if(e.key==="Enter"||e.key==="Tab"){ if(items[i]){ e.preventDefault(); e.stopPropagation(); pickMention(items[i]); } }
    else if(e.key==="Escape"){ box.hidden=true; } },true);
  /* ---------- polls and RSVPs (clubVotes: one doc per person per poll) ---------- */
  const VOTES={};
  const SAMPLE_VOTES={"p_s3":[{uid:"a",opt:"0",name:"Sample member"},{uid:"b",opt:"1",name:"Sample member"},{uid:"c",opt:"0",name:"Sam (sample)"},{uid:"d",opt:"2",name:"Sample member"}]};
  async function votes(poll,force){ if(G()) return VOTES[poll]||(VOTES[poll]=(SAMPLE_VOTES[poll]||(/^r_/.test(poll)?[{uid:"x3",name:"Sam (sample)",opt:"1,5"},{uid:"x2",name:"Alex (sample)",opt:"1"},{uid:"x1",name:"Robin (sample)",opt:"3,5"}]:[])).slice());
    if(VOTES[poll]&&!force) return VOTES[poll];
    const res=await api("POST",":runQuery",{structuredQuery:{from:[{collectionId:"clubVotes"}],where:{fieldFilter:{field:{fieldPath:"poll"},op:"EQUAL",value:S(poll)}},limit:300}});
    return VOTES[poll]=(res||[]).filter(x=>x.document).map(x=>fromDoc(x.document)); }
  async function vote(poll,opt){ const id=poll+"_"+(G()?"me":me()), list=VOTES[poll]||[]; const mine=G()?"me":me();
    VOTES[poll]=list.filter(v=>v.uid!==mine).concat(opt==null||opt===""?[]:[{uid:mine,name:G()?"You":F().name(),opt:String(opt),poll}]);
    if(G()) return;
    if(opt==null||opt==="") await api("DELETE","/clubVotes/"+id); else await api("PATCH","/clubVotes/"+id,{fields:{uid:S(me()),name:S(F().name()||""),poll:S(poll),opt:S(String(opt)),at:I(Date.now())}}); }
  function pollHTML(p,list){ const opts=p.poll.opts, mineU=G()?"me":me(), vs=list||[], tot=vs.length, mine=vs.find(v=>v.uid===mineU), c=opts.map((_,i)=>vs.filter(v=>v.opt===String(i)).length), voted=!!mine;
    return `<div class="cs-pollq">${list==null?`<p class="cs-load">${L("Loading votes…","Cargando votos…")}</p>`:""}${opts.map((o,i)=>{ const pc=tot?Math.round(c[i]*100/tot):0, me_=mine&&mine.opt===String(i);
      return `<button type="button" class="cs-popt${me_?" on":""}${voted?" shown":""}" data-vote="${esc(p.id)}" data-opt="${i}" aria-pressed="${!!me_}"><span class="cs-pbar" style="width:${voted?pc:0}%"></span><span class="cs-ptxt">${me_?"✓ ":""}${esc(o)}</span>${voted?`<span class="cs-ppc">${pc}%</span>`:""}</button>`; }).join("")}
      <div class="cs-pfoot">${tot} ${tot===1?L("vote","voto"):L("votes","votos")}${voted?` · ${L("tap your answer again to undo","toca tu respuesta otra vez para deshacer")}`:` · ${L("vote to see the results","vota para ver los resultados")}`}</div></div>`; }
  function paintPolls(root){ root.querySelectorAll(".cs-poll[data-poll]").forEach(async el=>{ const p=(POSTS||[]).find(x=>x.id===el.dataset.poll); if(!p||!p.poll) return;
    try{ el.innerHTML=pollHTML(p,await votes("p_"+p.id)); }catch(e){ el.innerHTML=pollHTML(p,[]); el.insertAdjacentHTML("beforeend",`<p class="cs-off">${L("Voting opens very soon.","La votación se abre muy pronto.")}</p>`); } }); }
  function readPoll(form){ const pb=form.querySelector(".cs-pollbox"); if(!pb||pb.hidden) return null; const opts=[...pb.querySelectorAll("input")].map(i=>i.value.trim()).filter(Boolean);
    if(opts.length<2) return {err:L("Add at least 2 options.","Agrega al menos 2 opciones.")}; return {opts:opts.slice(0,6)}; }
  const optIn=(i)=>`<input type="text" maxlength="80" placeholder="${L("Option","Opción")} ${i}" aria-label="${L("Option","Opción")} ${i}">`;
  /* RSVPs: "I'm going" on each class of this week */
  function rsvpHTML(week,wd,list){ const mineU=G()?"me":me(), going=list.filter(v=>String(v.opt||"").split(",").includes(String(wd))), on=going.some(v=>v.uid===mineU);
    return `<button type="button" class="cl-going${on?" on":""}" data-rsvpgo="${esc(week)}" data-wd="${wd}" aria-pressed="${on}">${on?L("✓ I’m going","✓ Voy"):L("🙋 I’m going","🙋 Voy")}</button>${going.length?`<button type="button" class="cl-gwho" data-whot="${esc(L("🙋 Going","🙋 Van"))}" data-who="${esc(JSON.stringify(going.map(v=>({n:v.name}))))}" aria-label="${esc(L("See who's going","Ver quién va"))}">${going.slice(0,4).map(v=>av(v.uid,v.name)).join("")}<small>${going.length} ${L("going","van")}</small></button>`:""}`; }
  async function paintRsvp(root){ const els=[...root.querySelectorAll(".cl-rsvp[data-rsvp]")]; if(!els.length) return; await loadPark();
    const weeks=[...new Set(els.map(e=>e.dataset.rsvp))];
    for(const w of weeks){ let list=[]; try{ list=await votes("r_"+w); }catch(e){ els.filter(x=>x.dataset.rsvp===w).forEach(x=>x.hidden=true); continue; }
      els.filter(x=>x.dataset.rsvp===w).forEach(x=>{ x.hidden=false; x.innerHTML=rsvpHTML(w,x.dataset.wd,list); }); } }
  /* ---------- weekly challenge: answers are wall posts tagged with the week; Noa can pick a favourite ---------- */
  async function mountChal(el){ el.dataset.on="1"; const cid=el.dataset.chal;
    try{ await Promise.all([POSTS?null:listPosts().then(p=>{ POSTS=p; }),loadPins(),loadPark()]); }catch(e){ el.innerHTML=state==="off"?OFF:""; return; }
    const cidG=G()?"wSAMPLE":cid, ans=(POSTS||[]).filter(p=>p.ch===cidG).sort((a,b)=>(PICKS[cidG]===b.id)-(PICKS[cidG]===a.id)||a.at-b.at), done=ans.some(p=>p.uid===me());
    el.innerHTML=`${ans.length?`<div class="cl-chal-ans">${ans.map(p=>`<div class="cl-ans${PICKS[cidG]===p.id?" pick":""}" data-pid="${esc(p.id)}"><div class="cs-top">${who(p)}${G()?"":tools(p,"clubPosts/"+p.id,true)}</div>${PICKS[cidG]===p.id?`<span class="cs-pickf">⭐ ${L("Noa’s pick","Elegido por Noa")}</span>`:""}<p class="cs-txt">${txtHTML(p.text||"")}</p>${imgs(p)}<div class="cs-acts">${likeBtn(p,"clubPosts/"+p.id)}${me()===NOA&&!G()?`<button type="button" class="cs-act" data-pick="${esc(p.id)}" data-ch="${esc(cidG)}">${PICKS[cidG]===p.id?"⭐ Unpick":"⭐ Pick"}</button>`:""}</div></div>`).join("")}</div>`:`<p class="cs-empty">${L("No answers yet. Be the first!","Aún no hay respuestas. ¡Sé el primero!")}</p>`}
      ${el.dataset.cur?(done?`<p class="cl-chal-done">✅ ${L("You took this week’s challenge. Nice!","Hiciste el desafío de esta semana. ¡Bien!")}</p>`:composer("chal",cid,L("Write your answer… (+5 🍪 for your buddy)","Escribe tu respuesta… (+5 🍪 para tu buddy)"))):""}`;
    paintImgs(el);
    /* a little reward when Noa picks your answer */
    if(!G()&&me()){ const won=Object.values(PICKS).filter(id=>{ const x=(POSTS||[]).find(y=>y.id===id); return x&&x.uid===me(); }), seen=LSG("cs-club-picks",[]); const fresh=won.filter(x=>!seen.includes(x));
      if(fresh.length){ LSS("cs-club-picks",seen.concat(fresh)); treat(10,L("⭐ Noa picked your challenge answer!","⭐ ¡Noa eligió tu respuesta del desafío!")); checkBadges(); } } }
  /* ---------- reports (Noa sees them in his bell and the nightly email) ---------- */
  async function reports(){ if(me()!==NOA) return []; try{ const r=await query("","clubReports","DESCENDING",50); return r; }catch(e){ return []; } }
  async function delReport(id){ await api("DELETE","/clubReports/"+id); }
  /* ---------- clicks ---------- */
  document.addEventListener("click",async e=>{ const t=e.target;
    const mp=t.closest("[data-mpick]"); if(mp){ pickMention(mp); return; }
    const pf=t.closest("[data-prof]"); if(pf&&!t.closest(".cl-prof")){ e.preventDefault(); openProfile(pf.dataset.prof,pf.dataset.pname); return; }
    const po=t.closest("[data-pollopen]"); if(po){ const form=po.closest("form"), pb=form.querySelector(".cs-pollbox"), show=pb.hidden; pb.hidden=!show; po.setAttribute("aria-expanded",String(show));
      if(show&&!pb.dataset.ready){ pb.dataset.ready="1"; pb.innerHTML=`<p class="cs-ph2">${L("Your text above is the question. Options:","Tu texto de arriba es la pregunta. Opciones:")}</p><div class="cs-popts">${optIn(1)}${optIn(2)}</div><button type="button" class="cs-act" data-polladd="1">＋ ${L("Option","Opción")}</button>`; }
      if(show) pb.querySelector("input").focus(); return; }
    const pa=t.closest("[data-polladd]"); if(pa){ const box=pa.parentElement.querySelector(".cs-popts"), n=box.querySelectorAll("input").length; if(n<6){ box.insertAdjacentHTML("beforeend",optIn(n+1)); box.lastElementChild.focus(); } if(n+1>=6) pa.hidden=true; return; }
    const vt=t.closest("[data-vote]"); if(vt){ const pid=vt.dataset.vote, p=(POSTS||[]).find(x=>x.id===pid), poll="p_"+pid, mineU=G()?"me":me(); if(!p||(!me()&&!G())) return;
      const cur=(VOTES[poll]||[]).find(v=>v.uid===mineU), opt=cur&&cur.opt===vt.dataset.opt?"":vt.dataset.opt; const el=vt.closest(".cs-poll");
      try{ await vote(poll,opt); }catch(er){ toast(L("Couldn’t vote. Try again.","No se pudo votar. Intenta de nuevo.")); return; } el.innerHTML=pollHTML(p,VOTES[poll]); return; }
    const rg=t.closest("[data-rsvpgo]"); if(rg){ if(!me()&&!G()) return; const w=rg.dataset.rsvpgo, wd=rg.dataset.wd, poll="r_"+w, mineU=G()?"me":me(); const cur=(VOTES[poll]||[]).find(v=>v.uid===mineU);
      let ds=cur?String(cur.opt||"").split(",").filter(Boolean):[]; ds=ds.includes(wd)?ds.filter(x=>x!==wd):ds.concat([wd]);
      rg.disabled=true; try{ await vote(poll,ds.join(",")); }catch(er){ rg.disabled=false; toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); return; }
      if(ds.includes(wd)) toast(L("See you there! 🙌","¡Nos vemos ahí! 🙌"));
      document.querySelectorAll(`.cl-rsvp[data-rsvp="${CSS.escape(w)}"]`).forEach(x=>{ x.innerHTML=rsvpHTML(w,x.dataset.wd,VOTES[poll]); }); return; }
    const pk=t.closest("[data-pick]"); if(pk){ const id=pk.dataset.pick, ch=pk.dataset.ch; if(PICKS[ch]===id) delete PICKS[ch]; else PICKS[ch]=id;
      try{ await savePins(); }catch(er){ toast("Couldn’t save the pick."); return; }
      const w=pk.closest(".cl-wall"); if(w) paintWall(w); document.querySelectorAll(".cl-chal-list[data-on='1']").forEach(x=>mountChal(x)); return; }
    const rp=t.closest("[data-report]"); if(rp){ const path=rp.dataset.report, parts=path.split("/"), id=parts[parts.length-1];
      const item=parts.length>2?(COMM[parts[1]]||[]).find(x=>x.id===id):(POSTS||[]).find(x=>x.id===id); if(!item) return;
      const why=prompt(L("Report this to Noa? Tell him what’s wrong (optional). Only Noa sees reports.","¿Reportar esto a Noa? Cuéntale qué pasa (opcional). Solo Noa ve los reportes."),""); if(why===null) return;
      try{ await api("POST","/clubReports?documentId="+rid(),{fields:{uid:S(me()),name:S(F().name()||""),path:S(path),pid:S(parts[1]),author:S(item.name||""),text:S(String(item.text||"").slice(0,200)),why:S(String(why).slice(0,300)),at:I(Date.now())}}); }
      catch(er){ toast(L("Couldn’t send the report. Try again.","No se pudo enviar el reporte. Intenta de nuevo.")); return; }
      toast(L("Thanks. Noa will take a look 🙏","Gracias. Noa lo va a revisar 🙏")); return; }
  });
  /* ---------- 🗳 Polls & ideas tab: class ideas from members (👍 to support one) + polls ---------- */
  const SAMPLE_IDEAS=[{id:"i1",uid:"x3",name:"Sam (sample)",at:H(30),text:"A class about job interviews: common questions and how to answer them.",idea:{k:"topic"},likes:["a|👍","b|👍","c|👍"]},{id:"i2",uid:"x2",name:"Alex (sample)",at:H(50),text:"When do we use 'since' and 'for'? I always mix them up.",idea:{k:"grammar"},likes:["a|👍"]}];
  let ISORT="top";
  function ideaHTML(p){ const k=IDEAK.find(c=>c[0]===(p.idea||{}).k)||IDEAK[4], up=(p.likes||[]).map(rxOf).filter(x=>x[1]==="👍"), mine=up.some(x=>x[0]===(G()?"me":me())), st=IDEAST[p.id]||"";
    return `<div class="cs-p cl-idea${st?" st-"+st:""}" data-pid="${esc(p.id)}"><button type="button" class="cl-iup${mine?" on":""}" data-iup="${esc(p.id)}" aria-pressed="${mine}" aria-label="${L("Support this idea","Apoyar esta idea")} (${up.length})"><span>👍</span><b>${up.length}</b></button>
      <div class="cl-ib"><div class="cs-flags"><span class="cs-catf">${k[1]} ${esc(L(k[2][0],k[2][1]))}</span>${st==="planned"?`<span class="cs-pickf">🗓 ${L("Planned","Planeada")}</span>`:st==="done"?`<span class="cs-chf">✅ ${L("Done in class","Hecha en clase")}</span>`:""}</div>
        <p class="cs-txt">${txtHTML(p.text||"")}</p><div class="cl-imeta">${who(p)}${tools(p,"clubPosts/"+p.id,true)}${me()===NOA&&!G()?`<span class="cl-ist"><button type="button" class="cs-act" data-ist="${esc(p.id)}" data-v="planned">${st==="planned"?"✓ ":""}🗓 Planned</button><button type="button" class="cs-act" data-ist="${esc(p.id)}" data-v="done">${st==="done"?"✓ ":""}✅ Done</button></span>`:""}</div></div></div>`; }
  function paintIdeas(el){ const box=el.querySelector("[data-ideas]"); if(!box) return; let list=(POSTS||[]).filter(p=>p.idea); if(G()) list=SAMPLE_IDEAS.concat(list);
    const n=p=>(p.likes||[]).map(rxOf).filter(x=>x[1]==="👍").length, rank=p=>IDEAST[p.id]==="done"?1:0;
    list.sort((a,b)=>rank(a)-rank(b)||(ISORT==="top"?n(b)-n(a)||b.at-a.at:b.at-a.at));
    box.innerHTML=list.length?list.map(ideaHTML).join(""):`<p class="cs-empty">${L("No ideas yet. Be the first!","Aún no hay ideas. ¡Sé el primero!")}</p>`; }
  async function mountSay(el){ el.dataset.on="1"; el.innerHTML=`<p class="cs-load">${L("Loading…","Cargando…")}</p>`;
    try{ await Promise.all([listPosts().then(p=>{ POSTS=G()?SAMPLE_POSTS.slice():p; }),loadPins(),loadPark()]); }catch(e){ el.innerHTML=state==="off"?OFF:""; return; }
    const polls=(POSTS||[]).filter(p=>p.poll).sort((a,b)=>b.at-a.at);
    const ih=el.parentElement&&el.parentElement.querySelector(".cl-sayideas");
    const pollsH=`<div class="cl-sec cl-polls${polls.length?"":" empty"}"><h2>📊 ${L("Polls","Encuestas")}</h2>${polls.map(postHTML).join("")}
        <details class="cl-newpoll"><summary>＋ ${L("Start a poll","Crear una encuesta")}</summary>${composer("poll","",L("Your question…","Tu pregunta…"))}</details></div>`;
    const ideasH=`<div class="cl-sec cl-ideas"><h2>💡 ${L("Ideas for future classes","Ideas para próximas clases")}</h2><p class="cl-note">${L("What would you like to do in class? A topic, a grammar point, vocabulary, a game… Noa reads every idea. Tap 👍 on the ones you like.","¿Qué te gustaría hacer en clase? Un tema, un punto de gramática, vocabulario, un juego… Noa lee todas las ideas. Toca 👍 en las que te gusten.")}</p>
        ${composer("idea","",L("My idea for a class: …","Mi idea para una clase: …"))}
        <div class="cs-wcats" role="group" aria-label="${L("Sort ideas","Ordenar ideas")}"><button type="button" class="cs-wcat${ISORT==="top"?" on":""}" data-isort="top" aria-pressed="${ISORT==="top"}">👍 ${L("Most liked","Más apoyadas")}</button><button type="button" class="cs-wcat${ISORT==="new"?" on":""}" data-isort="new" aria-pressed="${ISORT==="new"}">🆕 ${L("Newest","Más nuevas")}</button></div>
        <div class="cl-ilist2" data-ideas="1"></div></div>`;
    el.innerHTML=pollsH; paintPolls(el); paintImgs(el); }
  let IDEAST={};
  document.addEventListener("click",async e=>{ const u=e.target.closest("[data-iup]"); if(u){ if(!me()&&!G()) return; const id=u.dataset.iup; const item=(POSTS||[]).find(x=>x.id===id)||(G()?SAMPLE_IDEAS.find(x=>x.id===id):null); if(!item) return;
      if(G()){ const r=(item.likes||[]).filter(v=>rxOf(v)[0]!=="me"); item.likes=r.length!==(item.likes||[]).length?r:r.concat(["me|👍"]); }
      else { try{ await react("clubPosts/"+id,item,"👍"); }catch(er){ toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); return; } }
      const card=u.closest(".cl-idea"); if(card){ card.outerHTML=ideaHTML(item); return; } const art=u.closest(".cs-p"); if(art){ const open=!art.querySelector(".cs-sub").hidden; if(!open){ art.outerHTML=postHTML(item); const a2=document.querySelector(`.cs-p[data-pid="${CSS.escape(id)}"]`); if(a2) paintImgs(a2); } else u.outerHTML=ideaBits(item).up.split("</button>")[0]+"</button>"; } return; }
    const so=e.target.closest("[data-isort]"); if(so){ ISORT=so.dataset.isort; const say=so.closest(".cl-say"); so.parentElement.querySelectorAll("[data-isort]").forEach(b=>{ b.classList.toggle("on",b===so); b.setAttribute("aria-pressed",String(b===so)); }); paintIdeas(say); return; }
    const st=e.target.closest("[data-ist]"); if(st){ const id=st.dataset.ist, v=st.dataset.v; if(IDEAST[id]===v) delete IDEAST[id]; else IDEAST[id]=v; try{ await savePins(); }catch(er){ toast("Couldn’t save."); return; } const wl=st.closest(".cl-wall"); if(wl) paintWall(wl); else paintIdeas(st.closest(".cl-say")); return; } });
  /* ---------- 🎬 recordings Noa adds (YouTube), stored in clubStats/_recordings: Noa writes, members read ---------- */
  /* the first load can happen before sign-in has finished: try again a few times instead of showing nothing */
  const RETRY={}; function retryLoad(k,fn){ RETRY[k]=(RETRY[k]||0)+1; if(RETRY[k]>6) return; setTimeout(fn,1500*RETRY[k]); }
  let RECS=null, recsAt=0;
  async function loadRecs(force){ if(G()) return; if(RECS&&!force&&Date.now()-recsAt<120000) return; recsAt=Date.now();
    try{ const r=await api("GET","/clubStats/_recordings"); const j=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; RECS=j.list||[]; }catch(e){ RECS=RECS||[]; retryLoad("recs",()=>loadRecs(true)); }
    window.__clubRecs=RECS; document.dispatchEvent(new CustomEvent("cs-club-recs")); }
  /* lesson plans: the helper uploads each class's plan only AFTER the class (clubStats/_plans index + _plans_<week>) */
  let PLANS=null, plansAt=0; const PLANDOC={};
  async function loadPlans(force){ if(G()) return; if(PLANS&&!force&&Date.now()-plansAt<300000) return; plansAt=Date.now();
    try{ const r=await api("GET","/clubStats/_plans"); const j=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; PLANS=j.weeks||{}; }catch(e){ PLANS=PLANS||{}; retryLoad("plans",()=>loadPlans(true)); }
    window.__clubPlans=PLANS; document.dispatchEvent(new CustomEvent("cs-club-plans")); }
  function mdHTML(md){ const inl=t=>esc(t).replace(/&lt;br\s*\/?&gt;/g,"<br>").replace(/&lt;(\/?)(b|i|strong|em|u)&gt;/g,"<$1$2>").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*?)\*/g,"$1<i>$2</i>")
      .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,(m,a,u)=>`<a href="${u.replace(/&amp;/g,"&").replace(/"/g,"%22")}" target="_blank" rel="noopener">${a}</a>`).replace(/\\([$_*#\-\[\]()>])/g,"$1");
    const out=[]; let list=null; const close=()=>{ if(list){ out.push(`</${list}>`); list=null; } };
    String(md||"").replace(/<\/?(content|page|callout|columns?|column|toggle|details|summary|quote|span|empty-block)[^>]*>/gi,"").split("\n").forEach(raw=>{ const l=raw.replace(/\t/g,"  ").trim(); let m;
      if(!l){ close(); return; }
      if(/^(---|\*\*\*)$/.test(l)){ close(); out.push("<hr>"); return; }
      if((m=l.match(/^(#{1,4})\s+(.*)/))){ close(); const h=Math.min(5,m[1].length+2); out.push(`<h${h}>${inl(m[2])}</h${h}>`); return; }
      if((m=l.match(/^[-*•]\s+(?:\[[ x]\]\s*)?(.*)/))){ if(list!=="ul"){ close(); out.push("<ul>"); list="ul"; } out.push(`<li>${inl(m[1])}</li>`); return; }
      if((m=l.match(/^\d+[.)]\s+(.*)/))){ if(list!=="ol"){ close(); out.push("<ol>"); list="ol"; } out.push(`<li>${inl(m[1])}</li>`); return; }
      if((m=l.match(/^>\s?(.*)/))){ close(); out.push(`<blockquote>${inl(m[1])}</blockquote>`); return; }
      close(); out.push(`<p>${inl(l)}</p>`); });
    close(); return out.join(""); }
  document.addEventListener("click",async e=>{ const b=e.target.closest("[data-plan]"); if(!b) return; e.preventDefault();
    const nx=b.parentElement.nextElementSibling&&b.parentElement.nextElementSibling.classList.contains("cl-plan")?b.parentElement.nextElementSibling:null;
    if(nx){ nx.remove(); b.setAttribute("aria-expanded","false"); return; }
    const [wk,wd]=b.dataset.plan.split("|"); b.setAttribute("aria-expanded","true");
    try{ if(!PLANDOC[wk]){ const r=await api("GET","/clubStats/_plans_"+wk.replace(/-/g,"")); PLANDOC[wk]=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; }
      const pl=(PLANDOC[wk].plans||{})[wd]; if(!pl){ toast(L("Couldn’t find it.","No lo encontré.")); return; }
      b.parentElement.insertAdjacentHTML("afterend",`<div class="cl-plan"><div class="cl-planh"><b>📄 ${esc(pl.title||L("Class material","Material de la clase"))}</b><button type="button" class="cs-act" data-planx="1">✕ ${L("Close","Cerrar")}</button></div><div class="cl-planb2">${mdHTML(pl.md)}</div></div>`);
    }catch(er){ b.setAttribute("aria-expanded","false"); toast(L("Couldn’t open it. Try again.","No se pudo abrir. Intenta de nuevo.")); } });
  document.addEventListener("click",e=>{ const x=e.target.closest("[data-planx]"); if(!x) return; const p=x.closest(".cl-plan"), b=p.previousElementSibling&&p.previousElementSibling.querySelector("[data-plan]"); if(b) b.setAttribute("aria-expanded","false"); p.remove(); });
  /* the first lines of a class's plan intro (for recordings that have no summary yet) */
  async function planIntro(date){ if(G()||!date) return ""; const wk=weekOf(new Date(date+"T12:00:00")), wd=new Date(date+"T12:00:00").getDay();
    if(!PLANDOC[wk]){ const r=await api("GET","/clubStats/_plans_"+wk.replace(/-/g,"")); PLANDOC[wk]=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; }
    const pl=(PLANDOC[wk].plans||{})[wd]; if(!pl||!pl.md) return "";
    const lines=String(pl.md).split("\n").map(l=>l.trim()); let i=lines.findIndex(l=>/^#{1,4}\s*(?:🎯\s*)?(intro|class overview)/i.test(l)), out=[];
    for(let k=i<0?0:i+1;k<lines.length&&out.join(" ").length<260;k++){ const l=lines[k]; if(!l||/^📅|^---$/.test(l)) { if(out.length) break; continue; } if(/^#/.test(l)) break; out.push(l); }
    const t=out.join(" ").replace(/<br\s*\/?>/gi," · ").replace(/<[^>]+>/g,"").replace(/\*\*|\*|\\/g,"").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").trim();
    return t.length>300?t.slice(0,297).replace(/\s\S*$/,"")+"…":t; }
  let PODS=null, podsAt=0;
  async function loadPods(force){ if(G()) return; if(PODS&&!force&&Date.now()-podsAt<120000) return; podsAt=Date.now();
    try{ const r=await api("GET","/clubStats/_podcast"); const j=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; PODS=j.list||[]; }catch(e){ PODS=PODS||[]; retryLoad("pods",()=>loadPods(true)); }
    window.__clubPods=PODS; document.dispatchEvent(new CustomEvent("cs-club-pods")); }
  async function savePods(list){ await api("PATCH","/clubStats/_podcast",{fields:{uid:S("_podcast"),json:S(JSON.stringify({list}))}}); PODS=list; window.__clubPods=list; document.dispatchEvent(new CustomEvent("cs-club-pods")); }
  document.addEventListener("submit",async e=>{ const f=e.target.closest("[data-podform]"); if(!f) return; e.preventDefault(); const msg=f.querySelector(".cs-msg");
    const ep={id:rid(),url:f.url.value.trim(),date:f.date.value,title:f.title.value.trim(),notes:f.notes.value.trim(),at:Date.now()};
    msg.textContent="Saving…"; try{ await loadPods(true); await savePods((PODS||[]).concat([ep])); }catch(er){ msg.textContent="Couldn’t save. Try again."; return; } toast("🎧 Episode added ✓"); });
  document.addEventListener("click",async e=>{ const d=e.target.closest("[data-poddel]"); if(!d) return; if(!confirm("Remove this episode?")) return; try{ await loadPods(true); await savePods((PODS||[]).filter(x=>x.id!==d.dataset.poddel)); }catch(er){ toast("Couldn’t remove it."); } });
  async function saveRecs(list){ await api("PATCH","/clubStats/_recordings",{fields:{uid:S("_recordings"),json:S(JSON.stringify({list}))}}); RECS=list; window.__clubRecs=list; document.dispatchEvent(new CustomEvent("cs-club-recs")); }
  document.addEventListener("submit",async e=>{ const f=e.target.closest("[data-recform]"); if(!f) return; e.preventDefault(); const msg=f.querySelector(".cs-msg"), url=f.url.value.trim();
    if(!/youtu\.?be/.test(url)){ msg.textContent="That doesn’t look like a YouTube link."; return; }
    const rec={id:rid(),url,date:f.date.value,wd:f.wd.value===""?null:+f.wd.value,topic:f.topic.value.trim(),summary:f.summary.value.trim(),at:Date.now()};
    const n=f.wd.selectedOptions[0]; if(f.wd.value==="") rec.name="Club class";
    msg.textContent="Saving…"; try{ await loadRecs(true); await saveRecs((RECS||[]).concat([rec])); }catch(er){ msg.textContent="Couldn’t save. Try again."; return; }
    toast("🎬 Added to the Library ✓"); });
  /* picking the class sets the date to its most recent day (e.g. last Wednesday) */
  document.addEventListener("change",e=>{ const sel=e.target.closest("[data-recform] select[name=wd]"); if(!sel||sel.value==="") return; const wd=+sel.value, d=new Date(); d.setDate(d.getDate()-((d.getDay()-wd+7)%7));
    sel.form.date.value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); });
  document.addEventListener("click",async e=>{ const d=e.target.closest("[data-recdel]"); if(!d) return; if(!confirm("Remove this recording from the Library?")) return;
    try{ await loadRecs(true); await saveRecs((RECS||[]).filter(r=>r.id!==d.dataset.recdel)); }catch(er){ toast("Couldn’t remove it."); } });
  /* ---------- 🚀 coming-soon votes ---------- */
  /* ✨ "I enjoyed this class" on recordings (clubVotes, poll rec_<id>) */
  async function paintFav(root){ const els=[...root.querySelectorAll(".cl-recfav[data-recfav]:not([data-fp])")].filter(x=>x.closest("details")?x.closest("details").open:true); if(!els.length) return; const mineU=G()?"me":me();
    await Promise.all(els.map(async el=>{ el.dataset.fp="1"; let vs=[]; try{ vs=await votes(el.dataset.recfav); }catch(e){} const on=vs.some(v=>v.uid===mineU);
      el.innerHTML=`<button type="button" class="cs-act cl-favb${on?" on":""}" data-fav="${esc(el.dataset.recfav)}" aria-pressed="${on}" title="${esc(vs.map(v=>(v.name||"").split(" ")[0]).filter(Boolean).join(", "))}">✨ ${L("I enjoyed this class","Me gustó esta clase")}${vs.length?` · ${vs.length}`:""}</button>${vs.length?`<button type="button" class="cl-gwho cs-whob" data-whot="${esc(L("✨ Enjoyed this class","✨ Les gustó esta clase"))}" data-who="${esc(JSON.stringify(vs.map(v=>({n:v.name}))))}" aria-label="${esc(L("See who enjoyed it","Ver a quién le gustó"))}">${vs.slice(0,4).map(v=>av(v.uid,v.name)).join("")}</button>`:""}`; })); }
  document.addEventListener("toggle",e=>{ const d=e.target; if(d&&d.classList&&d.classList.contains("cl-rcard")&&d.open) paintFav(d); },true);
  document.addEventListener("click",async e=>{ const b=e.target.closest("[data-fav]"); if(!b) return; if(api&&F()&&F().readOnly&&F().readOnly()){ toastRO(); return; } const poll=b.dataset.fav, mineU=G()?"me":me(), on=(VOTES[poll]||[]).some(v=>v.uid===mineU);
    b.disabled=true; try{ await vote(poll,on?"":"1"); }catch(er){ b.disabled=false; toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); return; } const el=b.closest(".cl-recfav"); delete el.dataset.fp; paintFav(el.parentElement); if(!on) toast(L("✨ Thanks! Noa and the club can see it.","✨ ¡Gracias! Noa y el club lo pueden ver.")); });
  /* ⭐ 1-5 star rating for podcast episodes (clubVotes, poll pr_<id>, opt "1".."5") */
  async function paintStars(root){ const els=[...(root||document).querySelectorAll(".cl-stars[data-stars]:not([data-sp])")]; if(!els.length) return; const mineU=G()?"me":me();
    await Promise.all(els.map(async el=>{ el.dataset.sp="1"; let vs=[]; try{ vs=await votes(el.dataset.stars); }catch(e){} const mine=vs.find(v=>v.uid===mineU), my=mine?+mine.opt:0, nums=vs.map(v=>+v.opt).filter(n=>n>=1&&n<=5), avg=nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;
      el.innerHTML=`<span class="cl-stl">${my?L("Your rating","Tu nota"):L("Rate this episode","Califica este episodio")}</span><span class="cl-strow" role="radiogroup" aria-label="${L("Rate this episode from 1 to 5 stars","Califica este episodio de 1 a 5 estrellas")}">${[1,2,3,4,5].map(n=>`<button type="button" class="cl-star${n<=my?" on":""}" data-star="${n}" role="radio" aria-checked="${n===my}" aria-label="${n} ${n===1?L("star","estrella"):L("stars","estrellas")}">★</button>`).join("")}</span>${nums.length?`<small class="muted">${avg.toFixed(1)} · ${nums.length} ${nums.length===1?L("rating","nota"):L("ratings","notas")}</small>`:""}`; })); }
  document.addEventListener("click",async e=>{ const b=e.target.closest(".cl-stars [data-star]"); if(!b) return; if(api&&F()&&F().readOnly&&F().readOnly()){ toastRO(); return; } const el=b.closest(".cl-stars"), poll=el.dataset.stars, n=+b.dataset.star, mineU=G()?"me":me(), cur=(VOTES[poll]||[]).find(v=>v.uid===mineU);
    const val=cur&&+cur.opt===n?"":String(n); el.querySelectorAll("[data-star]").forEach(x=>x.disabled=true);
    try{ await vote(poll,val); }catch(er){ toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); } delete el.dataset.sp; paintStars(el.parentElement); if(val) toast(L("⭐ Thanks! Noa will see your rating.","⭐ ¡Gracias! Noa verá tu nota.")); });
  document.addEventListener("toggle",e=>{ const d=e.target; if(d&&d.tagName==="DETAILS"&&d.open){ paintStars(d); paintIntro(d); paintBoardWords(d); } },true);
  /* recordings without a summary: show the first lines of that class's lesson plan intro */
  /* 📚 a recording's words come from THAT class's live board (Nov 23 2026: the week's word list was the same on every class of the week) */
  const BWDOC={};
  async function paintBoardWords(root){ if(G()) return; const els=[...(root||document).querySelectorAll(".cl-bwords[data-bw]:not([data-ip])")].filter(el=>{ const d=el.closest("details"); return !d||d.open; });
    for(const el of els){ el.dataset.ip="1"; const [wk,wd]=el.dataset.bw.split("|");
      try{ const idx=window.__clubBoards; if(idx&&!((idx[wk]||[]).includes(Number(wd)))){ el.remove(); continue; }
        if(!BWDOC[wk]){ const r=await api("GET","/clubStats/_boards_"+wk.replace(/-/g,"")); BWDOC[wk]=r&&r.fields&&r.fields.json?JSON.parse(r.fields.json.stringValue):{}; }
        const bd=(BWDOC[wk].boards||{})[wd]; const sav=window.__lbSav||(c=>!!(c&&c.style!=="wrap"&&(c.english||c.meaning)));
        const cards=bd?(bd.cards||[]).filter(c=>!c.hidden&&c.text&&sav(c)).sort((a,b)=>(a.n||0)-(b.n||0)):[];
        if(cards.length<3){ el.remove(); continue; }   /* one or two words looks odd: only show a real list */
        const v=cards.map(c=>({w:c.text,tr:c.english||c.meaning||"",ex:c.example||""}));
        /* same look as the podcast's "Words from this episode": a row you swipe sideways + Save all */
        el.innerHTML=window.__clVocCards?window.__clVocCards(v,`📚 ${L("Words from this class","Palabras de esta clase")}`):"";
      }catch(er){ el.removeAttribute("data-ip"); } } }
  async function paintIntro(root){ const els=[...(root||document).querySelectorAll(".cl-planintro[data-pintro]:not([data-ip])")]; for(const el of els){ el.dataset.ip="1"; try{ const t=await planIntro(el.dataset.pintro); if(t) el.textContent=t; else el.remove(); }catch(er){ el.remove(); } } }
  async function paintSoon(root){ const els=[...root.querySelectorAll(".cl-soonv[data-soon]")]; if(!els.length) return; const mineU=G()?"me":me();
    for(const el of els){ let list=[]; try{ list=await votes("soon_"+el.dataset.soon); }catch(e){ el.hidden=true; continue; } const on=list.some(v=>v.uid===mineU);
      el.innerHTML=`<button type="button" class="cl-going${on?" on":""}" data-soonv="${esc(el.dataset.soon)}" aria-pressed="${on}">👍 ${on?L("Voted","Votado"):L("I want this","Lo quiero")}</button><small>${list.length} ${list.length===1?L("vote","voto"):L("votes","votos")}</small>`; } }
  document.addEventListener("click",async e=>{ const b=e.target.closest("[data-soonv]"); if(!b||(!me()&&!G())) return; const k=b.dataset.soonv, poll="soon_"+k, mineU=G()?"me":me(), on=(VOTES[poll]||[]).some(v=>v.uid===mineU);
    b.disabled=true; try{ await vote(poll,on?"":"1"); }catch(er){ b.disabled=false; toast(L("Couldn’t save. Try again.","No se pudo guardar. Intenta de nuevo.")); return; } paintSoon(b.closest(".cl-soon")||document); });
  /* ---------- wall filter + topic chips ---------- */
  document.addEventListener("click",e=>{ const k=e.target.closest(".cs-ik[data-ik]"); if(k){ const on=!k.classList.contains("on"); k.parentElement.querySelectorAll(".cs-ik").forEach(x=>{ x.classList.remove("on"); x.setAttribute("aria-pressed","false"); }); if(on){ k.classList.add("on"); k.setAttribute("aria-pressed","true"); } return; }
    const c=e.target.closest(".cs-cat[data-cat]"); if(c){ const on=!c.classList.contains("on"); c.parentElement.querySelectorAll(".cs-cat").forEach(x=>{ x.classList.remove("on"); x.setAttribute("aria-pressed","false"); }); if(on){ c.classList.add("on"); c.setAttribute("aria-pressed","true"); } const ik=c.closest("form")&&c.closest("form").querySelector(".cs-ideak"); if(ik){ ik.hidden=!(on&&c.dataset.cat==="idea"); const ta=c.closest("form").querySelector("textarea"); if(ta) ta.placeholder=on&&c.dataset.cat==="idea"?L("My idea for a class: …","Mi idea para una clase: …"):L("Share something with the club: a question, a photo, a small win…","Comparte algo con el club: una pregunta, una foto, un pequeño logro…"); } return; }
    const w=e.target.closest("[data-wcat]"); if(w){ WCAT=w.dataset.wcat; const wall=w.closest(".cl-wall"); if(wall) paintWall(wall); } });
  /* ---------- 📈 Noa's insights ---------- */
  async function mountInsights(el){ el.dataset.on="1"; if(me()!==NOA&&!G()) return; el.innerHTML=`<p class="cs-load">Loading…</p>`;
    await Promise.all([loadProfs(true),loadPark(),loadPins(),listPosts().then(p=>{ POSTS=p; }).catch(()=>{})]);
    let acc=[]; try{ const r=await api("GET","/clubAccess?pageSize=300"); acc=((r&&r.documents)||[]).map(d=>({id:d.name.split("/").pop(),name:(d.fields&&d.fields.name&&d.fields.name.stringValue)||""})); }catch(e){}
    const profs=PROFS||[], byId=new Map(); acc.forEach(a=>byId.set(a.id,{id:a.id,name:a.name})); profs.forEach(p=>byId.set(p.id,Object.assign(byId.get(p.id)||{},{id:p.id,name:p.name||((byId.get(p.id)||{}).name)},{prof:p})));
    byId.delete(NOA); const all=[...byId.values()], m=MON(), now=Date.now(), wk3=wk(-3,-3)[0];
    const lastSeen=u=>{ const ts=[(profOf(u)||{}).at|0,...(POSTS||[]).filter(p=>p.uid===u).map(p=>p.at)]; const w=((((STATS||{})[u]||{}).weeks)||[]).slice(-1)[0]; if(w) ts.push(new Date(w+"T20:00:00").getTime()); return Math.max(0,...ts); };
    const never=all.filter(x=>!x.prof), quiet=all.filter(x=>x.prof&&lastSeen(x.id)<now-21*864e5), fresh=all.filter(x=>x.prof&&x.prof.since&&new Date(x.prof.since).toISOString().slice(0,7)===m);
    const board=all.map(x=>({x,pt:points(x.id,m)})).sort((a,b)=>b.pt-a.pt);
    const postsM=(POSTS||[]).filter(p=>new Date(p.at).toISOString().slice(0,7)===m).length, comM=all.reduce((n,x)=>n+((((x.prof||{}).mo||{})[m]||{}).comments|0),0);
    const thisW=wk(0,0)[0], lastW=wk(-1,-1)[0], came=w=>all.filter(x=>((((STATS||{})[x.id]||{}).weeks)||[]).includes(w)).length;
    const soon=[]; for(const k of ["dm","digest","courses","join"]){ try{ soon.push([k,(await votes("soon_"+k,true)).length]); }catch(e){} }
    const nm=x=>`<button type="button" class="cs-nameb" data-prof="${esc(x.id)}" data-pname="${esc(x.name||"")}">${esc(x.name||"(no name)")}</button>`;
    el.innerHTML=`<p class="cl-mintro">Only you see this tab.</p>
      <div class="cl-istats"><div><b>${all.length}</b><span>members with the Club page</span></div><div><b>${all.length-never.length}</b><span>opened it</span></div><div><b>${postsM}</b><span>posts this month</span></div><div><b>${comM}</b><span>comments this month</span></div><div><b>${came(lastW)}</b><span>came to class last week</span></div><div><b>${came(thisW)}</b><span>this week so far</span></div></div>
      <div class="cl-sec"><h2>🌱 Joined this month <small>(${fresh.length})</small></h2>${fresh.length?`<p>${fresh.map(nm).join(" · ")}</p>`:'<p class="muted">Nobody new yet.</p>'}</div>
      <div class="cl-sec"><h2>😴 Gone quiet <small>(${quiet.length})</small></h2><p class="cl-note">No class, post or visit in 3+ weeks. Maybe a friendly message?</p>${quiet.length?`<ul class="cl-ilist">${quiet.sort((a,b)=>lastSeen(a.id)-lastSeen(b.id)).map(x=>`<li>${nm(x)} <span class="muted">· last seen ${ago(lastSeen(x.id))}</span></li>`).join("")}</ul>`:'<p class="muted">Everyone’s around 🙌</p>'}</div>
      <div class="cl-sec"><h2>👀 Haven’t opened the Club page yet <small>(${never.length})</small></h2>${never.length?`<p>${never.map(x=>esc(x.name||"(no name)")).join(" · ")}</p>`:'<p class="muted">Everyone has.</p>'}</div>
      <div class="cl-sec"><h2>🏆 Most active this month</h2><ol class="cl-ilist">${board.slice(0,10).map(b=>`<li>${nm(b.x)} <b>${b.pt}</b> pts</li>`).join("")}</ol></div>
      ${soon.length?`<div class="cl-sec"><h2>🚀 Coming-soon votes</h2><p>${soon.map(([k,n])=>`${({dm:"💬 Direct messages",digest:"📧 Email digest",courses:"🎓 Club courses",join:"💳 Join & pay on Hibi"})[k]}: <b>${n}</b>`).join(" · ")}</p></div>`:""}`; }

  /* ---------- 💬 direct messages (dms/{a_b} thread + msgs; only the two members can read them) ---------- */
  const tidOf=(a,b)=>[a,b].sort().join("_");
  let THREADS=null, thAt=0, DMOPEN=null, DMTIMER=null;
  const SAMPLE_TH=[{id:"me_x2",members:["me","x2"],names:{x2:"Alex (sample)"},last:{text:"See you on Wednesday! 👋",from:"x2",at:H(2)},at:H(2),unread:true}];
  async function loadThreads(force){ if(G()){ THREADS=SAMPLE_TH; return THREADS; } if(!me()) return []; if(THREADS&&!force&&Date.now()-thAt<20000) return THREADS;
    try{ const res=await api("POST",":runQuery",{structuredQuery:{from:[{collectionId:"dms"}],where:{fieldFilter:{field:{fieldPath:"members"},op:"ARRAY_CONTAINS",value:S(me())}},limit:60}});
      THREADS=(res||[]).filter(x=>x.document).map(x=>{ const o=fromDoc(x.document); o.unread=o.last&&o.last.from!==me()&&(o["r_"+me()]||0)<(o.at||0); return o; }).filter(o=>!((o["h_"+me()]||0)>=(o.at||0))).sort((a,b)=>(b.at||0)-(a.at||0)); thAt=Date.now(); }
    catch(e){ THREADS=THREADS||[]; } dmBadge(); return THREADS; }
  const otherOf=t=>(t.members||[]).find(u=>u!==(G()?"me":me()))||"";
  function dmBadge(){ const n=(THREADS||[]).filter(t=>t.unread).length; document.querySelectorAll(".cl-dmtop .cl-dmn").forEach(b=>{ b.hidden=!n; b.textContent=n>9?"9+":n; }); }
  function dmPanel(){ let o=document.getElementById("clDm"); if(o) return o; o=document.createElement("div"); o.id="clDm"; o.className="cl-dm-ov"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label",L("Messages","Mensajes"));
    o.innerHTML=`<div class="cl-dm"><div class="cl-dmh"><button type="button" class="cs-act cl-dmback" data-dmback="1" hidden aria-label="${L("Back","Volver")}">←</button><b class="cl-dmt">💬 ${L("Messages","Mensajes")}</b><button type="button" class="cl-prof-x" data-dmx="1" aria-label="${L("Close","Cerrar")}">×</button></div><div class="cl-dmb"></div></div>`;
    document.body.appendChild(o); dmPlace(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-dmx]")) closeDm(); }); return o; }
  const askDel=async(t,b,ok)=> window.csConfirm?window.csConfirm(t,b,ok):confirm(t);
  document.addEventListener("click",async e=>{
    const d=e.target.closest("[data-msgdel]");
    if(d&&DMOPEN){ e.preventDefault(); e.stopPropagation(); const tid=DMOPEN.tid;
      if(!(await askDel(L("Delete this message?","¿Borrar este mensaje?"),`<p>${L("It’s deleted for both of you. This can’t be undone.","Se borra para los dos. No se puede deshacer.")}</p>`,L("Delete","Borrar")))) return;
      try{ await api("DELETE",`/dms/${tid}/msgs/${d.dataset.msgdel}`); toast(L("Message deleted.","Mensaje borrado.")); DMOPEN&&(DMOPEN.lastAt=0); paintChat(false); }catch(err){ toast(L("Couldn’t delete it. Try again.","No se pudo borrar. Intenta de nuevo.")); } return; }
    const h=e.target.closest("[data-dmhide]");
    if(h){ e.preventDefault(); e.stopPropagation(); const tid=h.dataset.dmhide, nm=h.dataset.dmname||"";
      if(!(await askDel(L("Delete this chat?","¿Borrar este chat?"),`<p>${L(`Your chat with <b>${esc(nm)}</b> disappears from your messages. If they write to you again, it comes back.`,`Tu chat con <b>${esc(nm)}</b> desaparece de tus mensajes. Si te vuelve a escribir, aparece de nuevo.`)}</p>`,L("Delete","Borrar")))) return;
      const now=Date.now();
      try{ await api("PATCH",`/dms/${tid}?updateMask.fieldPaths=h_${me()}&updateMask.fieldPaths=r_${me()}`,{fields:{["h_"+me()]:I(now),["r_"+me()]:I(now)}}); THREADS=(THREADS||[]).filter(x=>x.id!==tid); dmBadge(); openInbox(); toast(L("Chat deleted.","Chat borrado.")); }catch(err){ toast(L("Couldn’t delete it. Try again.","No se pudo borrar. Intenta de nuevo.")); } } },true);
  window.__clubDmClose=()=>closeDm();
  function closeDm(){ const o=document.getElementById("clDm"); if(o) o.remove(); DMOPEN=null; clearInterval(DMTIMER); }
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.getElementById("clDm")) closeDm(); });
  function dmPlace(o){ try{ const bt=window.__nmAnchor?window.__nmAnchor():document.getElementById("dmTopBtn"), r=bt&&bt.offsetParent!==null?bt.getBoundingClientRect():null;
      o.style.setProperty("--dmtop",Math.round(r&&r.bottom>0?r.bottom+(bt&&bt.id==="dmTopBtn"?8:10):64)+"px"); o.style.setProperty("--dmright",Math.round(r?Math.max(8,innerWidth-r.right-(bt&&bt.id==="dmTopBtn"?60:0)):12)+"px"); }catch(e){} }
  const DMALIAS=new Map();  /* every name we've seen for a person (club profile, roster, old posts), so the search finds them by any of them */
  async function openInbox(){ loadProfs(true).then(()=>{ const i=document.getElementById("dmFind"); if(i&&i.value.trim()) i.dispatchEvent(new Event("input",{bubbles:true})); }).catch(()=>{}); const o=dmPanel(), b=o.querySelector(".cl-dmb"); dmPlace(o); DMOPEN=null; clearInterval(DMTIMER); o.querySelector(".cl-dmback").hidden=true; o.querySelector(".cl-dmt").textContent="💬 "+L("Messages","Mensajes");
    b.innerHTML=`<p class="cs-load">${L("Loading…","Cargando…")}</p>`; await Promise.all([loadThreads(true),loadProfs(),loadPark(),POSTS?null:listPosts().then(p=>{ POSTS=p; }).catch(()=>{}),loadNotes().catch(()=>{})]);
    const ts=THREADS||[];
    b.innerHTML=`<div class="cl-dmnew"><label class="sr" for="dmFind">${L("New message to…","Nuevo mensaje para…")}</label><input id="dmFind" type="search" autocomplete="off" placeholder="✏️ ${L("New message: type a name…","Nuevo mensaje: escribe un nombre…")}"><ul class="cl-dmfind" hidden></ul></div>`+dmSugHTML()+(ts.length?`<ul class="cl-dml">${ts.map(t=>{ const u=otherOf(t), nm=(profOf(u)||{}).name||(t.names||{})[u]||L("Member","Miembro");
      return `<li class="cl-dmli">${G()?"":`<button type="button" class="cl-dmdel" data-dmhide="${esc(t.id)}" data-dmname="${esc(nm)}" aria-label="${L("Delete chat with","Borrar chat con")} ${esc(nm)}" title="${L("Delete chat","Borrar chat")}">✕</button>`}<button type="button" class="cl-dmi${t.unread?" new":""}" data-dmto="${esc(u)}" data-dmname="${esc(nm)}">${av(u,nm)}<span><b>${esc(nm)}</b><small>${t.last?esc((t.last.from===(G()?"me":me())?L("You: ","Tú: "):"")+(t.last.text||"📷")):""}</small></span><em>${t.at?ago(t.at):""}</em></button></li>`; }).join("")}</ul>`
      :`<p class="cl-empty">${L("No messages yet. Type a name above to start one, or open someone’s profile and press 💬 Message.","Aún no hay mensajes. Escribe un nombre arriba para empezar uno, o abre el perfil de alguien y presiona 💬 Mensaje.")}</p>`)+`<p class="cl-dmnote">🔒 ${L("Only you and the other person can read your messages.","Solo tú y la otra persona pueden leer sus mensajes.")}</p>`; }
  /* everyone you can write to: club profiles, people on the wall, the club roster, and always Noa */
  function dmPeople(){ const out=new Map(), add=(u,n)=>{ if(!u||u===me()) return; if(n){ const al=DMALIAS.get(u)||new Set(); al.add(n); DMALIAS.set(u,al); } if(out.has(u)) return; out.set(u,(profOf(u)||{}).name||n||""); };
    if(G()){ [["x2","Alex (sample)"],["x3","Sam (sample)"],[NOA,"Noa"]].forEach(([u,n])=>add(u,n)); return [...out]; }
    add(NOA,(profOf(NOA)||{}).name||"Noa");
    (PROFS||[]).forEach(x=>add(x.id,x.name)); (POSTS||[]).forEach(p=>add(p.uid,p.name));
    { const fd=window.__clubFeed&&window.__clubFeed(); ((fd&&fd.roster)||[]).forEach(r=>add(r.uid,r.name)); }
    return [...out].filter(([,n])=>n); }
  /* smart suggestions: people you've interacted with (DMs, replies, reactions, mentions, duels), plus Noa, always */
  function dmSuggest(){ const my=G()?"me":me(), sc=new Map(), why=new Map(), names=new Map(dmPeople());
    const bump=(u,n,w)=>{ if(!u||u===my||u===me()) return; sc.set(u,(sc.get(u)||0)+n); if(w&&!(why.get(u)||[]).includes(w)) why.set(u,(why.get(u)||[]).concat(w)); };
    (THREADS||[]).forEach(t=>bump(otherOf(t),3,"💬"));
    (NOTES||[]).forEach(n=>bump(n.uid,n.kind==="react"?2:3,n.kind==="react"?"❤️":n.kind==="mention"?"@":"↩️"));
    (POSTS||[]).forEach(p=>{ (p.likes||[]).forEach(v=>{ const [u]=rxOf(v); if(p.uid===my) bump(u,2,"❤️"); else if(u===my) bump(p.uid,2,"❤️"); });
      (COMM[p.id]||[]).forEach(c=>{ if(c.uid===my) bump(p.uid,3,"↩️"); else if(p.uid===my) bump(c.uid,3,"↩️"); (c.likes||[]).forEach(v=>{ const [u]=rxOf(v); if(c.uid===my) bump(u,1,"❤️"); else if(u===my) bump(c.uid,1,"❤️"); }); }); });
    (PARK||[]).forEach(x=>{ const u=x.me?my:x.uid; (x.dz||[]).forEach(z=>{ if(u===my) bump(z.to,4,"⚔️"); else if(z.to===me()) bump(u,4,"⚔️"); }); });
    let list=[...sc].filter(([u])=>names.get(u)).sort((a,b)=>b[1]-a[1]).map(([u])=>u).slice(0,6);
    if(my!==NOA&&!list.includes(NOA)) list.splice(Math.min(list.length,2),0,NOA);   /* Noa is always there: near the top, not necessarily first */
    if(list.length<4){ (POSTS||[]).forEach(p=>{ if(list.length<6&&p.uid&&p.uid!==my&&p.uid!==me()&&!list.includes(p.uid)&&names.get(p.uid)) list.push(p.uid); }); }
    return list.slice(0,7).map(u=>[u,names.get(u)||"Noa",u===NOA&&!(why.get(u)||[]).length?["🎓"]:(why.get(u)||[])]); }
  function dmSugHTML(){ const l=dmSuggest(); if(!l.length) return "";
    return `<div class="cl-dmsug"><div class="cl-dmsugh">${L("Suggested","Sugerencias")}</div><div class="cl-dmsugr">${l.map(([u,n,w])=>`<button type="button" class="cl-dmsc" data-dmto="${esc(u)}" data-dmname="${esc(n)}" title="${esc(n)}">${av(u,n)}<b>${esc(String(n).split(" ")[0])}</b>${w.length?`<small>${w.slice(0,2).join(" ")}</small>`:""}</button>`).join("")}</div></div>`; }
  const fold=t=>String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  document.addEventListener("input",e=>{ const i=e.target.closest("#dmFind"); if(!i) return; const ul=i.parentNode.querySelector(".cl-dmfind"), q=fold(i.value.trim());
    if(!q){ ul.hidden=true; ul.innerHTML=""; return; }
    const hits=dmPeople().filter(([u,n])=>[n,...(DMALIAS.get(u)||[])].some(x=>fold(x).split(/\s+/).some(w=>w.startsWith(q))||fold(x).includes(q))).sort((a,b)=>(b[0]===NOA)-(a[0]===NOA)||a[1].localeCompare(b[1])).slice(0,8);
    ul.hidden=false; ul.innerHTML=hits.length?hits.map(([u,n])=>`<li><button type="button" class="cl-dmi" data-dmto="${esc(u)}" data-dmname="${esc(n)}">${av(u,n)}<span><b>${esc(n)}</b>${u===NOA?`<small>${L("Coach","Coach")}</small>`:""}</span></button></li>`).join(""):`<li class="muted cl-dmnone">${L("Nobody with that name in the club yet.","Nadie con ese nombre en el club todavía.")}</li>`; });
  document.addEventListener("keydown",e=>{ if(e.key!=="Enter"||!e.target.closest("#dmFind")) return; e.preventDefault(); const f=e.target.parentNode.querySelector(".cl-dmfind [data-dmto]"); if(f) f.click(); });
  const RXE="❤️ 😂 😮 😢 👍 🔥".split(" ");
  const rxOn=(m,who)=>{ const R=(DMOPEN&&DMOPEN.rx)||{}; return ((R[who]||{})[m.id])||""; };
  function rxHTML(m,mine){ if(!m.id) return ""; const my=G()?"me":me(), other=DMOPEN&&DMOPEN.u;
    const e=mine?rxOn(m,other):rxOn(m,my);
    const chip=e?`<button type="button" class="cl-msgrx${mine?"":" me"}"${mine?" disabled":` data-rxset="${esc(m.id)}" data-rxe="${esc(e)}"`} aria-label="${mine?L("Their reaction","Su reacción"):L("Your reaction (tap to remove)","Tu reacción (toca para quitarla)")}">${e}</button>`:"";
    const btn=mine?"":`<button type="button" class="cl-msgrxb" data-rxpick="${esc(m.id)}" aria-label="${L("React","Reaccionar")}" title="${L("React","Reaccionar")}">☺</button>`;
    return chip+btn; }
  function msgHTML(m){ const mine=m.from===(G()?"me":me());
    return `<div class="cl-msg${mine?" mine":""}${m.id&&((mine&&rxOn(m,DMOPEN&&DMOPEN.u))||(!mine&&rxOn(m,G()?"me":me())))?" has-rx":""}" data-mid="${esc(m.id||"")}">${mine&&m.id&&!G()?`<button type="button" class="cl-msgdel" data-msgdel="${esc(m.id)}" aria-label="${L("Delete this message","Borrar este mensaje")}" title="${L("Delete","Borrar")}">✕</button>`:""}${m.text?`<p>${txtHTML(m.text)}</p>`:""}${(m.imgs||[]).map(i=>`<img data-img="${esc(i)}" alt="${L("Photo","Foto")}" class="cl-msgimg">`).join("")}${(m.gifs||[]).map(g=>{ const s=typeof g==="string"?g:(g&&(g.u||g.url||g.s))||""; return /^https:\/\/media\d*\.giphy\.com\//.test(s)?`<img src="${esc(s)}" alt="${esc((g&&g.t)||"GIF")}" class="cl-msgimg cl-msggif" loading="lazy">`:""; }).join("")}<em>${new Date(m.at).toLocaleString(L("en-US","es-CL"),{hour:"numeric",minute:"2-digit",month:"short",day:"numeric"})}</em>${rxHTML(m,mine)}</div>`; }
  async function openChat(u,nm){ if(!u||u===me()) return; if(!G()&&!me()){ toast(L("Sign in first.","Primero inicia sesión.")); return; }
    const o=dmPanel(), b=o.querySelector(".cl-dmb"), tid=G()?"me_"+u:tidOf(me(),u); DMOPEN={tid,u,nm};
    o.querySelector(".cl-dmback").hidden=false; o.querySelector(".cl-dmt").innerHTML=`<button type="button" class="cl-dmwho" data-prof="${esc(u)}" data-pname="${esc(nm||"")}" title="${L("See profile","Ver perfil")}">${av(u,nm)}<span>${esc(nm||L("Member","Miembro"))}</span></button>`;
    b.innerHTML=`<div class="cl-msgs" aria-live="polite"><p class="cs-load">${L("Loading…","Cargando…")}</p></div>${composer("dm",u,L("Write a message…","Escribe un mensaje…"))}`;
    const ta=b.querySelector("textarea"); if(ta){ ta.rows=2; ta.focus(); ta.addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); ta.form.requestSubmit(); } }); }
    await paintChat(true); clearInterval(DMTIMER); DMTIMER=setInterval(async()=>{ if(!(document.getElementById("clDm")&&DMOPEN&&!document.hidden)) return; if(G()){ paintChat(false); return; }
      /* check the thread's "last message" time (1 read) and only reload the messages when something new arrived */
      try{ const t=DMOPEN.tid, r=await api("GET","/dms/"+t), at=r&&r.fields&&r.fields.at?Number(r.fields.at.integerValue||r.fields.at.doubleValue||0):0; if(!DMOPEN||DMOPEN.tid!==t) return; if(at&&at===DMOPEN.lastAt) return; DMOPEN.lastAt=at; paintChat(false); }catch(e){} },15000); }
  async function paintChat(scroll){ if(!DMOPEN) return; const {tid}=DMOPEN, box=document.querySelector("#clDm .cl-msgs"); if(!box) return; let ms=[];
    if(G()) ms=[{from:DMOPEN.u,text:"Hi! Are you coming on Wednesday? 😊",at:H(3)},{from:"me",text:"Yes! See you there 👋",at:H(2)}];
    else { try{ ms=await query("dms/"+tid,"msgs","ASCENDING",300); }catch(e){ ms=[]; }
      try{ const th=await api("GET","/dms/"+tid), f=(th&&th.fields)||{}, rx={}; Object.keys(f).forEach(k=>{ if(k.startsWith("rx_")) try{ rx[k.slice(3)]=JSON.parse(f[k].stringValue||"{}")||{}; }catch(er){} }); if(DMOPEN&&DMOPEN.tid===tid) DMOPEN.rx=rx; }catch(e){} }
    if(G()){ ms.forEach((m,i)=>{ if(!m.id) m.id="g"+i; }); if(DMOPEN&&!DMOPEN.rx) DMOPEN.rx={}; }
    const near=box.scrollHeight-box.scrollTop-box.clientHeight<80;
    box.innerHTML=ms.length?ms.map(msgHTML).join(""):`<p class="cl-empty">${L("Say hi 👋","Saluda 👋")}</p>`; paintImgs(box);
    if(scroll||near){ const down=()=>{ box.scrollTop=box.scrollHeight; }; down(); requestAnimationFrame(down);
      /* photos and GIFs load a moment later and make the chat taller: keep it at the bottom while they do */
      box.querySelectorAll("img").forEach(im=>{ if(!im.complete) im.addEventListener("load",()=>{ if(box.scrollHeight-box.scrollTop-box.clientHeight<400) down(); },{once:true}); });
      const mo=new MutationObserver(()=>down()); mo.observe(box,{subtree:true,attributes:true,attributeFilter:["src"]}); setTimeout(()=>mo.disconnect(),2500); }
    const thr=(THREADS||[]).find(x=>x.id===tid);
    if(!G()&&((thr&&thr.unread)||(ms.length&&ms[ms.length-1].from!==me()))){ try{ await api("PATCH",`/dms/${tid}?updateMask.fieldPaths=r_${me()}`,{fields:{["r_"+me()]:I(Date.now())}}); const t=(THREADS||[]).find(x=>x.id===tid); if(t) t.unread=false; dmBadge(); }catch(e){} } }
  async function sendDm(form,text,files,gif){ const u=form.dataset.target, tid=tidOf(me(),u), now=Date.now();
    const ids=[]; for(const f of files){ ids.push(await uploadImg(f)); }
    const names={[me()]:F().name()||"",[u]:(DMOPEN&&DMOPEN.nm)||(profOf(u)||{}).name||""};
    await api("PATCH",`/dms/${tid}?updateMask.fieldPaths=members&updateMask.fieldPaths=json&updateMask.fieldPaths=at&updateMask.fieldPaths=r_${me()}`,{fields:{members:{arrayValue:{values:[me(),u].sort().map(S)}},json:S(JSON.stringify({names,last:{text:text.slice(0,120)||(gif?"GIF":"📷"),from:me(),at:now}})),at:I(now),["r_"+me()]:I(now)}});
    const data={text}; if(ids.length) data.imgs=ids; if(gif) data.gifs=[gif];
    await api("POST",`/dms/${tid}/msgs?documentId=${rid()}`,{fields:{from:S(me()),at:I(now),json:S(JSON.stringify(data))}});
    if(window.__csTeacher===true){ try{ const K="cs-kudos-sent", m=JSON.parse(localStorage.getItem(K)||"{}")||{}; if(!m[u+"-join"]){ m[u+"-join"]=now; localStorage.setItem(K,JSON.stringify(m)); } }catch(er){} }
    const t=(THREADS||[]).find(x=>x.id===tid); if(!t||!t.at||now-t.at>30*60000) note(u,"dm","dm:"+me(),text||"📷"); if(t){ t.at=now; t.last={text,from:me(),at:now}; } }
  async function setRx(mid,emo){ if(!DMOPEN) return; const my=G()?"me":me(); DMOPEN.rx=DMOPEN.rx||{}; const mine=Object.assign({},DMOPEN.rx[my]||{});
    if(!emo||mine[mid]===emo) delete mine[mid]; else mine[mid]=emo;
    const ks=Object.keys(mine); if(ks.length>200) ks.slice(0,ks.length-200).forEach(k=>delete mine[k]);
    const prev=DMOPEN.rx[my]; DMOPEN.rx[my]=mine; paintRx(mid);
    if(G()) return;
    if(window.__csPreview||(F().readOnly&&F().readOnly())){ DMOPEN.rx[my]=prev; paintRx(mid); toast("In View as nothing changes."); return; }
    try{ await api("PATCH",`/dms/${DMOPEN.tid}?updateMask.fieldPaths=rx_${me()}`,{fields:{["rx_"+me()]:S(JSON.stringify(mine))}}); }
    catch(e){ DMOPEN.rx[my]=prev; paintRx(mid); toast(L("Couldn’t save that reaction. Try again.","No se pudo guardar la reacción. Intenta de nuevo.")); } }
  function paintRx(mid){ const el=document.querySelector(`#clDm .cl-msg[data-mid="${CSS.escape(mid)}"]`); if(!el) return; const mine=el.classList.contains("mine");
    el.querySelectorAll(".cl-msgrx,.cl-msgrxb").forEach(x=>x.remove()); const tmp=document.createElement("div"); tmp.innerHTML=rxHTML({id:mid},mine); [...tmp.children].forEach(c=>el.appendChild(c));
    el.classList.toggle("has-rx",!!el.querySelector(".cl-msgrx")); }
  function closePick(){ document.querySelectorAll(".cl-rxpick").forEach(p=>p.remove()); }
  document.addEventListener("click",e=>{
    const pk=e.target.closest("[data-rxpick]"); if(pk){ e.preventDefault(); e.stopPropagation(); const open=document.querySelector(`.cl-rxpick[data-for="${CSS.escape(pk.dataset.rxpick)}"]`); closePick(); if(open) return;
      const msg=pk.closest(".cl-msg"), cur=rxOn({id:pk.dataset.rxpick},G()?"me":me()), p=document.createElement("div"); p.className="cl-rxpick"; p.dataset.for=pk.dataset.rxpick; p.setAttribute("role","menu");
      p.innerHTML=RXE.map(x=>`<button type="button" role="menuitem" data-rxset="${esc(pk.dataset.rxpick)}" data-rxe="${x}" class="${x===cur?"on":""}" aria-label="${L("React with","Reaccionar con")} ${x}">${x}</button>`).join("");
      msg.appendChild(p); const r=p.getBoundingClientRect(), box=msg.closest(".cl-msgs").getBoundingClientRect(); if(r.right>box.right-4) p.style.left="auto", p.style.right="0"; if(r.top<box.top) p.classList.add("below"); return; }
    const st=e.target.closest("[data-rxset]"); if(st){ e.preventDefault(); e.stopPropagation(); closePick(); setRx(st.dataset.rxset,st.dataset.rxe); return; }
    if(!e.target.closest(".cl-rxpick")) closePick(); });
  /* double-tap / double-click a message you received = ❤️ */
  document.addEventListener("dblclick",e=>{ const m=e.target.closest("#clDm .cl-msg:not(.mine)[data-mid]"); if(!m||!m.dataset.mid||e.target.closest("button,img,a")) return; e.preventDefault(); try{ window.getSelection().removeAllRanges(); }catch(er){} setRx(m.dataset.mid,"❤️"); });
  let lastTap={id:"",t:0};
  document.addEventListener("touchend",e=>{ const m=e.target.closest("#clDm .cl-msg:not(.mine)[data-mid]"); if(!m||e.target.closest("button,img,a")) return; const now=Date.now();
    if(lastTap.id===m.dataset.mid&&now-lastTap.t<320){ e.preventDefault(); lastTap={id:"",t:0}; setRx(m.dataset.mid,"❤️"); } else lastTap={id:m.dataset.mid,t:now}; },{passive:false});
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.querySelector(".cl-rxpick")){ e.stopPropagation(); closePick(); } },true);
  window.__clubMyProfile=()=>{ if(!me()) return; if(location.hash!=="#club") location.hash="#club"; setTimeout(()=>openProfile(me()),200); };
  window.__clubDM=(u,nm)=>{ if(location.hash!=="#club") location.hash="#club"; setTimeout(()=>openChat(u,nm),u?150:0); };
  window.__clubInbox=()=>openInbox();
  document.addEventListener("click",e=>{ const t=e.target.closest("[data-dmto]"); if(t){ e.preventDefault(); document.querySelector(".cl-prof-ov")?.remove(); openChat(t.dataset.dmto,t.dataset.dmname); return; }
    if(e.target.closest("[data-dmback]")){ openInbox(); return; }
    if(e.target.closest("[data-dminbox]")){ openInbox(); return; } });
  async function myNotes(){ await loadNotes(); return (NOTES||[]).filter(n=>n.kind!=="dm"&&n.kind!=="comment").map(n=>Object.assign({},n,{html:noteTxt(n)})); }
  window.__clubSocial={ mount, dms:loadThreads, recent, myNotes, refreshBadge, unread, unreadPid, reports, delReport, watched:syncWatched };
  const b=document.getElementById("clubMain"); if(b) mount(b);
})();
