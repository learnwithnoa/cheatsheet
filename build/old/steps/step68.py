# step68: My coaching: Drive folder + Zoom class recordings (with "available until")
R('''    const resBox=res.length?`<div class="ch-res ch-tint ch-a">''','''    /* their class recordings (Zoom deletes them after a while) and their Drive folder */
    const zr=(v.zrecs||[]).slice().sort((a,b)=>b.date.localeCompare(a.date)), tdy=new Date().toISOString().slice(0,10);
    const dLeft=u=>u?Math.round((Date.parse(u+"T12:00")-Date.parse(tdy+"T12:00"))/864e5):999;
    const zrRow=r=>{ const n=dLeft(r.until), warn=n<=14; return `<a class="ch-resb ch-zr" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="i">🎥</span><span><b>${fd(r.date)}${r.min?` · ${r.min} min`:""}</b><small class="${warn?"zr-warn":""}">${r.until?(n<=0?"Deleted today":warn?`⚠️ Deleted in ${n} ${n===1?"day":"days"} (${fs(r.until)})`:`Available until ${fs(r.until)}`):""}</small></span></a>`; };
    const zBox=zr.length||v.folder?`<div class="ch-res ch-tint ch-s" id="chZrecs"><div class="ch-k">🎥 Your class recordings</div><p class="muted" style="margin:2px 0 8px;font-size:13.5px">${zr.length?"Watch our classes again. Zoom deletes each recording after a while, so the date shows how long it stays.":"Recordings of our classes will show up here."}</p>${zr.length?`<div class="ch-resl">${zr.map(zrRow).join("")}</div>`:""}${v.folder?`<p style="margin:10px 0 0"><a class="ch-go" href="https://drive.google.com/drive/folders/${esc(v.folder)}" target="_blank" rel="noopener">📁 Your Drive folder ↗</a></p>`:""}</div>`:"";
    const resBox=res.length?`<div class="ch-res ch-tint ch-a">''')
R('''    box.innerHTML=newsBox+top+mapBox+recapBox+tipsBox+guideBox+resBox+stats+''','''    box.innerHTML=newsBox+top+mapBox+recapBox+zBox+tipsBox+guideBox+resBox+stats+''')
css68 = '''
/* step68 */
.ch-zr small.zr-warn{color:#E0A100;font-weight:700}
'''
_i = s.index('</style>'); s = s[:_i] + css68 + s[_i:]
R('''    ["🔔","Notifications for everyone",''','''    ["🎥","Your class recordings","private students: <b>My coaching</b> now lists your recent class recordings, with how long each one stays before Zoom deletes it, and a link to your Drive folder.","coaching"],
    ["🔔","Notifications for everyone",''')
