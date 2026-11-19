const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
const mods = {"th":{"b":{},"s":{},"r":1,"tod":"2026-11-16","last":Date.now()-3*864e5},"ps":{"b":{"1":5},"s":{"1":0},"r":2,"last":Date.now()-864e5,"tr":{"1":2},"ls":{"1":{"sc":5,"t":Date.now()-864e5}}}};
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'light'],['p',devices['iPhone 13'],'dark']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(m => { if(!sessionStorage.getItem('x')){ sessionStorage.setItem('x','1'); localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-mods',JSON.stringify(m)); } }, mods);
    await p.goto('http://localhost:8768/index.html#quiz'); await p.waitForTimeout(2200);
    const clean=()=>p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); document.body.style.overflow=''; });
    await clean();
    await p.evaluate(()=>window.__prShow("gram")); await p.waitForTimeout(300);
    console.log(t,'tiles:', await p.evaluate(()=>[...document.querySelectorAll('[data-modtile]')].map(x=>x.querySelector('b').textContent+': '+x.querySelector('.pr-sub').textContent).filter(x=>/started|practiced/.test(x)).join(' | ')));
    await p.click('[data-modtile="th"]'); await p.waitForTimeout(300);
    console.log(t,'test card:', await p.evaluate(()=>document.querySelector('.ps-last')?.textContent));
    await p.click('[data-psstart="1"]'); await p.waitForTimeout(200);
    for(let i=0;i<3;i++){ await p.click('.ps-opt'); await p.waitForTimeout(80); await p.click('#psNext'); await p.waitForTimeout(80); }
    await clean(); await p.evaluate(()=>document.querySelector('[data-psquit]').click()); await p.waitForTimeout(200);
    console.log(t,'pause:', await p.evaluate(()=>document.querySelector('.ps-pause')?.innerText.replace(/\s+/g,' ')), '|', await p.evaluate(()=>document.querySelector('.ps-stage .ps-side')?.innerText.replace(/\s+/g,' ')));
    await p.screenshot({path:`/tmp/hist-${t}-mod.png`, fullPage:true});
    await clean(); await p.evaluate(()=>document.querySelector('.ps-pause [data-pscont]').click()); await p.waitForTimeout(200);
    console.log(t,'resumed at:', await p.evaluate(()=>document.querySelector('.ps-q .count')?.textContent));
    await clean(); await p.evaluate(()=>document.querySelector('[data-psquit]').click()); await p.waitForTimeout(200);
    await p.evaluate(()=>{ const d=document.querySelector('.ps-hist'); if(d){ d.open=true; d.scrollIntoView(); } }); await p.waitForTimeout(150);
    console.log(t,'hist:', await p.evaluate(()=>document.querySelector('.ps-hist')?.innerText.replace(/\s+/g,' ').slice(0,200)));
    await p.screenshot({path:`/tmp/hist-${t}-hist.png`});
    await p.evaluate(()=>window.__prShow("gram")); await clean(); await p.click('[data-gfolder]'); await p.waitForTimeout(200);
    await clean(); await p.evaluate(()=>document.querySelector('[data-modtile="ps"]').click()); await p.waitForTimeout(300);
    console.log(t,'ps stage1:', await p.evaluate(()=>document.querySelector('.ps-stage .ps-side')?.innerText.replace(/\s+/g,' ')));
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
