// club profile: same photo as the members list + buddy in the corner with a hover card
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-buddy', JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:5,f:20}));
      const list=()=>[{me:true,uid:'me1',first:'Me',on:true,a:'cat',n:'Mimi',lvl:1,role:{club:true}},{uid:'u2',first:'Giacomo',on:true,a:'frog',n:'Pickles',lvl:2,head:'crown',words:42,dw:2,role:{club:true}},{uid:'u3',first:'Egg',on:false}];
      const P={signedIn:()=>true,uid:()=>'me1',list:async()=>list(),publish:async()=>{},heart:async()=>{},feed:async()=>{},claim:async()=>[]};
      Object.defineProperty(window,'__csPark',{get:()=>P,set:()=>{},configurable:false}); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(3500);
    const clean = () => p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd,.bd-bub').forEach(x=>x.remove()); document.body.style.overflow=''; });
    await clean();
    const n = await p.evaluate(() => { const c=[...document.querySelectorAll('.cl-mcard[data-prof]')]; return c.length; });
    console.log(t, 'cards', n);
    if (!n) { await p.evaluate(()=>{ const x=document.querySelector('[data-go="club"]'); x&&x.click(); }); await p.waitForTimeout(1500); await clean();
      await p.evaluate(()=>{ const x=[...document.querySelectorAll('button,a')].find(e=>/Members|Miembros/.test(e.textContent)&&e.offsetParent); x&&x.click(); }); await p.waitForTimeout(1500); await clean(); }
    const who = process.env.WHO||'u2'; const r = await p.evaluate((w) => { const x=document.createElement('button'); x.dataset.prof=w; x.dataset.pname=w==='u2'?'Giacomo Rosso':'Egg Person'; document.body.appendChild(x); x.click(); return w; }, who);
    console.log(t, 'opened', r); await p.waitForTimeout(1200);
    console.log(t, await p.evaluate(()=>{ const pic=document.querySelector('.cl-prof-pic'); return pic?pic.innerHTML.slice(0,120)+' | pet:'+!!pic.querySelector('.cl-prof-pet'):'no pic'; }));
    const pet = await p.$('.cl-prof-pet');
    if (pet) { if (t==='d') await pet.hover(); else await pet.tap(); await p.waitForTimeout(300); }
    await p.screenshot({path:`/tmp/prof-${t}-${process.env.WHO||'u2'}.png`});
  }
  console.log('errors', errs); await b.close(); })();
