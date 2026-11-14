# step71: profile name / job / birthday (+ age), birthdays in the club calendar and on This week
# 1) keep the new fields when the profile is saved again
R('''photo:cur.photo||"",pk:cur.pk||"",pbg:cur.pbg||""};
    Object.assign(data,patch||{});''','''photo:cur.photo||"",pk:cur.pk||"",pbg:cur.pbg||"",job:cur.job||"",bd:cur.bd||"",by:cur.by||"",bdset:cur.bdset||0};
    Object.assign(data,patch||{});''')
# ensureMe must wait for the chosen name, so it never writes the Google name back for a moment
R('''  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;
    try{ await loadProfs();''','''  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;
    try{ if(window.__csNickReady) await Promise.race([window.__csNickReady,new Promise(r=>setTimeout(r,4000))]); await loadProfs();''')
# 2) everyone's posts show the name they chose (also old posts)
R('''  const who=x=>`<button type="button" class="cs-whob"''','''  const pName=x=>{ try{ const p=PROFS&&profOf(x.uid); return (p&&p.name)||x.name; }catch(e){ return x.name; } };
  const who=x0=>{ const x=Object.assign({},x0,{name:pName(x0)}); return whoH(x); };
  const whoH=x=>`<button type="button" class="cs-whob"''')
# 3) birthdays: helpers + list for the calendar
R('''  const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;''','''  const profOf=u=>(PROFS||[]).find(x=>x.id===u||x.uid===u)||null;
  /* birthdays (only what each person chose to show) */
  const MONS=()=>L("January February March April May June July August September October November December","enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre").split(" ");
  const bdTxt=md=>{ const [m,d]=String(md).split("-").map(Number); if(!m||!d) return ""; return L(MONS()[m-1]+" "+d, d+" de "+MONS()[m-1]); };
  const ageOf=(md,by)=>{ by=+by; if(!by) return 0; const t=new Date(), [m,d]=String(md).split("-").map(Number); return t.getFullYear()-by-((t.getMonth()+1<m||(t.getMonth()+1===m&&t.getDate()<d))?1:0); };
  const bdOn=(md,y)=>{ let [m,d]=String(md).split("-").map(Number); if(m===2&&d===29&&new Date(y,1,29).getMonth()!==1) d=28; return new Date(y,m-1,d); };
  function bdList(){ const seen=new Set(); return (PROFS||[]).filter(p=>p&&/^\\d\\d-\\d\\d$/.test(p.bd||"")&&!seen.has(p.id)&&seen.add(p.id)).map(p=>({uid:p.id,name:p.name||"",bd:p.bd,by:p.by||""})); }
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
    if(e.target.closest("[data-bdadd]")){ openProfile(me()).then(()=>{ const b=document.querySelector(".cl-prof-ov [data-pedit]"); if(b){ b.click(); setTimeout(()=>document.querySelector(".cl-prof-ov [data-pf-bm]")?.scrollIntoView({block:"center",behavior:"smooth"}),60); } }); } });''')
R('''root.querySelectorAll(".cl-me:not([data-on='1'])").forEach(mountMe);''','''root.querySelectorAll(".cl-me:not([data-on='1'])").forEach(mountMe); root.querySelectorAll(".cl-bdays:not([data-on='1'])").forEach(el=>mountBdays(el).catch(()=>{}));''')
# This week: the birthday strip at the top
R('''else if(tab==="week"){ body=ps[0]?welcomeHTML(f)+nextHTML(f,ps[0],now)''','''else if(tab==="week"){ body=ps[0]?welcomeHTML(f)+'<div class="cl-bdays" hidden></div>'+nextHTML(f,ps[0],now)''')
# calendar: birthdays on their day
R('''    const ev=eventsIn(f,y,m), today=isoD(new Date());''','''    const bds=((window.__clubBdays&&window.__clubBdays())||[]).filter(b=>+b.bd.slice(0,2)===m+1).map(b=>{ let d=+b.bd.slice(3); if(m===1&&d===29&&new Date(y,1,29).getMonth()!==1) d=28; return {bday:1,date:isoD(new Date(y,m,d)),name:b.name,uid:b.uid,by:b.by,ico:"🎂",k:"bday"}; });
    const ev=eventsIn(f,y,m).concat(bds).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0), today=isoD(new Date());
    if(window.__clubLoadProfs&&!window.__clubBdLoaded){ window.__clubBdLoaded=1; setTimeout(window.__clubLoadProfs,0); }
    const bdHTML=e=>{ const a=e.by?(new Date(e.date+"T12:00").getFullYear()-(+e.by)):0; return `<div class="cl-cev bday"><div><b>🎂 ${L("","Cumpleaños de ")}<button type="button" class="cs-nameb" data-prof="${esc(e.uid)}" data-pname="${esc(e.name)}">${esc(e.name)}</button>${L("’s birthday","")}</b>${a>0?`<span>${L("Turning","Cumple")} ${a} 🎈</span>`:""}</div>${e.uid!==(window.__csFire&&window.__csFire().uid&&window.__csFire().uid())&&e.date===today?`<div class="cl-cact"><button type="button" class="cs-send cl-dmbtn" data-dmto="${esc(e.uid)}" data-dmname="${esc(e.name)}">💬 ${L("Say happy birthday","Saludar")}</button></div>`:""}</div>`; };''')
s = s.replace('''sel.length?sel.map(e=>{ const past=now>e.end.getTime(); return `''','''sel.length?sel.map(e=>{ if(e.bday) return bdHTML(e); const past=now>e.end.getTime(); return `''')
assert s.count('if(e.bday) return bdHTML(e)')==2
R('''const ev=eventsIn(f,y,m).concat(bds)''','''const ev=eventsIn(f,y,m).concat(bds)''')
R('''<p class="cl-chint">${L("Tap a day to see its classes and Zoom links.","Toca un día para ver sus clases y links de Zoom.")}</p>''','''<p class="cl-chint">${L("Tap a day to see its classes and Zoom links. 🎂 = a member’s birthday.","Toca un día para ver sus clases y links de Zoom. 🎂 = cumpleaños de alguien del club.")}</p>''')
# re-render the calendar when birthdays arrive
R('''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&CALPOP){ CALPOP=false; render(); } });''','''  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&CALPOP){ CALPOP=false; render(); } });
  document.addEventListener("cs-club-bdays",()=>{ const v=document.getElementById("v-club"); if(tab==="calendar"&&v&&!v.hidden&&!CALPOP) render(); });''')
# 4) the profile: job + birthday shown, and the edit form
R('''<h2>${esc(p.name||nm||L("Member","Miembro"))}</h2>''','''<h2>${esc(p.name||nm||L("Member","Miembro"))}</h2>${p.job?`<p class="cl-prof-job">💼 ${esc(p.job)}</p>`:""}''')
R('''${p.country?`<span>📍 ${esc(p.country)}</span>`:""}${since?''','''${p.country?`<span>📍 ${esc(p.country)}</span>`:""}${p.bd?`<span>🎂 ${esc(bdTxt(p.bd))}${p.by&&ageOf(p.bd,p.by)>0?` · ${ageOf(p.bd,p.by)} ${L("years old","años")}`:""}</span>`:""}${since?''')
R('''        box.innerHTML=`<label class="cl-pf">${L("About me","Sobre mí")}<textarea maxlength="200" rows="3">${esc(cur.about||"")}</textarea></label><label class="cl-pf">${L("Where are you from?","¿De dónde eres?")}<input type="text" maxlength="40" value="${esc(cur.country||"")}"></label><div class="cs-row"><span class="cs-msg" role="status"></span><button type="button" class="cs-send" data-psave="1">${L("Save","Guardar")}</button></div>`; box.querySelector("textarea").focus(); return; }''','''        const gn=window.__csGoogleName?window.__csGoogleName():"", nmNow=F().name()||"", ys=new Date().getFullYear();
        box.innerHTML=`<label class="cl-pf">${L("My name","Mi nombre")}<input type="text" data-pf-name maxlength="40" value="${esc(nmNow)}" autocomplete="off">${gn&&gn!==nmNow?`<small class="cl-pfh">${L("Your Google name:","Tu nombre de Google:")} ${esc(gn)} · <button type="button" class="foot-link" data-pf-gn>${L("Use it","Usarlo")}</button></small>`:`<small class="cl-pfh">${L("How everyone sees you on Hibi. For example, just your first name.","Cómo te ven todos en Hibi. Por ejemplo, solo tu primer nombre.")}</small>`}</label>
          <label class="cl-pf">${L("What I do","A qué me dedico")} <small>(${L("optional","opcional")})</small><input type="text" data-pf-job maxlength="50" value="${esc(cur.job||"")}" placeholder="${L("e.g. Nurse, Software developer, Student","ej. Enfermera, Desarrollador, Estudiante")}"></label>
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
        const q=k=>box.querySelector("[data-pf-"+k+"]"), syncAge=()=>{ const ok=/^\\d{4}$/.test(q("by").value.trim()); q("ashow").disabled=!ok; if(!ok) q("ashow").checked=false; };
        q("by").addEventListener("input",syncAge); syncAge();
        box.querySelector("[data-pf-gn]")?.addEventListener("click",()=>{ q("name").value=gn; q("name").focus(); });
        if(window.__csGetBday) window.__csGetBday().then(v=>{ const m=String(v||"").match(/^(\\d{4}|-)?-?(\\d\\d)-(\\d\\d)$/); if(!m||!document.body.contains(box)) return; q("bm").value=m[2]; q("bdd").value=m[3]; if(m[1]&&m[1]!=="-") q("by").value=m[1]; q("bshow").checked=!!cur.bd; q("ashow").checked=!!cur.by; syncAge(); });
        q("name").focus(); return; }''')
R('''      if(e.target.closest("[data-psave]")){ const box=o.querySelector("[data-pabout]"); const about=box.querySelector("textarea").value.trim(), country=box.querySelector("input").value.trim();
        try{ await saveMe({about,country}); }catch(er){''','''      if(e.target.closest("[data-psave]")){ const box=o.querySelector("[data-pabout]"), q=k=>box.querySelector("[data-pf-"+k+"]"), msg=box.querySelector(".cs-msg");
        const about=q("about").value.trim(), country=q("country").value.trim(), job=q("job").value.trim(), nmIn=q("name").value.replace(/\\s+/g," ").trim();
        const bm=q("bm").value, bdd=q("bdd").value, byv=q("by").value.trim(), ys=new Date().getFullYear();
        if(!nmIn){ msg.textContent=L("Write your name first.","Escribe tu nombre primero."); q("name").focus(); return; }
        if((bm&&!bdd)||(!bm&&bdd)){ msg.textContent=L("Choose the month and the day of your birthday.","Elige el mes y el día de tu cumpleaños."); return; }
        if(bm&&new Date(2024,+bm-1,+bdd).getMonth()!==+bm-1){ msg.textContent=L("That day doesn’t exist in that month.","Ese día no existe en ese mes."); return; }
        if(byv&&(!/^\\d{4}$/.test(byv)||+byv<ys-100||+byv>ys-5)){ msg.textContent=L("Check the year.","Revisa el año."); return; }
        const md=bm?bm+"-"+bdd:"", full=md?(byv?byv+"-"+md:"--"+md):"";
        try{ const gn=window.__csGoogleName?window.__csGoogleName():""; if(nmIn!==F().name()&&window.__csSetNick) await window.__csSetNick(nmIn===gn?"":nmIn);
          if(window.__csSetBday) await window.__csSetBday(full);
          await saveMe({about,country,job,bd:md&&q("bshow").checked?md:"",by:md&&byv&&q("ashow").checked?byv:"",bdset:md?1:0}); }catch(er){''')
css71 = '''
/* step71 */
.cl-prof-job{margin:2px 0 0;font-size:14px;color:var(--muted)}
.cl-pfh{display:block;margin-top:4px;font-weight:400;font-size:12.5px;color:var(--muted)}
.cl-pf small{font-weight:400;color:var(--muted)}
.cl-pfbd{border:1px solid var(--line);border-radius:12px;padding:8px 12px 10px;margin:8px 0;display:grid;gap:8px}
.cl-pfbd legend{padding:0 4px;font-weight:700}
.cl-pfbdr{display:flex;flex-wrap:wrap;gap:6px}
.cl-pfbdr select,.cl-pfbdr input{font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:9px;background:var(--surface);color:inherit;min-width:0}
.cl-pfbdr select[data-pf-bm]{flex:1 1 130px}.cl-pfbdr select[data-pf-bdd]{flex:0 1 80px}.cl-pfbdr input{flex:1 1 120px}
.cl-pfbd .cs-chk{margin:0}
.cl-bdays{display:grid;gap:8px;margin:0 0 12px}
.cl-bdcard{text-align:left;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;border-radius:14px;border:1.5px solid #F0A63A;background:color-mix(in srgb,#F0A63A 12%,var(--surface))}
.cl-bdcard>div{flex:1 1 180px;display:grid;gap:2px}.cl-bdcard>div span{font-size:13.5px;color:var(--muted)}
.cl-bdi{font-size:26px;line-height:1}
.cl-bsoon,.cl-bask{margin:0;font-size:14px;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px}
.cl-bsoon small{color:var(--muted)}
.cl-bask{padding:8px 10px;border:1px dashed var(--line);border-radius:12px}.cl-bask .tip-x{margin-left:auto}
.cl-cev.bday{border-left:3px solid #F0A63A}
'''
_i = s.index('</style>'); s = s[:_i] + css71 + s[_i:]
# samples show the birthday bits too
R('''  const SAMPLE_STATS={x3:''','''  { const md=n=>{ const d=new Date(Date.now()+n*864e5); return String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }; const s3=SAMPLE_PROFS.find(x=>x.id==="x3"), s2=SAMPLE_PROFS.find(x=>x.id==="x2"); if(s3){ s3.bd=md(0); s3.job="Nurse"; } if(s2) s2.bd=md(3); }
  const SAMPLE_STATS={x3:''')
s = s.replace('.cl-cev.bday{border-left:3px solid #F0A63A}', '.cl-cev.bday{border-left:3px solid #F0A63A}\n.cl-pf>small:not(.cl-pfh){display:inline}', 1)
R('''    ["✍️","My own sentence",''','''    ["🎂","Your name, job and birthday","in the club, open <b>your profile → ✏️ Edit</b> to change how your name shows (just your first name, for example), add what you do, and add your birthday. Birthdays you choose to show get a 🎂 on the club calendar and a little celebration on <b>This week</b>.","club"],
    ["✍️","My own sentence",''')
