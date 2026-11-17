const {chromium} = require('playwright'); const fs=require('fs'); const stub=fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async()=>{ const b=await chromium.launch(); const errs=[];
 for (const gap of [0, 3, 9]) { const ctx=await b.newContext({viewport:{width:1280,height:900}});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(g=>{ localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); localStorage.setItem('ncs-modrec',JSON.stringify({iq:2}));
    localStorage.setItem('ncs-buddy',JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:3,f:20,vAt:Date.now()-g*864e5,grAt:0})); }, gap);
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(7500);
  console.log('gap',gap,'→', await p.evaluate(()=>{ const b=document.querySelector('.bd-bub'); return b&&!b.hidden?b.innerText.replace(/\s+/g,' '):'(none)'; }));
  await ctx.close(); }
 console.log(errs.length?errs:'no errors'); await b.close(); })();
