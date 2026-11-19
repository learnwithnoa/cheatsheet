const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'light'],['p',devices['iPhone 13'],'dark']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); });
    await p.goto('http://localhost:8768/index.html#quiz'); await p.waitForTimeout(2200);
    await p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); document.body.style.overflow=''; });
    await p.evaluate(()=>window.__prShow("gram")); await p.waitForTimeout(400);
    console.log(t,'topics:', await p.evaluate(()=>[...document.querySelectorAll('.pr-panel[data-pp="gram"] .pr-tiles:not(.pr-fgrid) .pr-tile b')].map(x=>x.textContent).join(' | ')));
    await p.screenshot({path:`/tmp/fold-${t}-topics.png`});
    await p.click('[data-gfolder]'); await p.waitForTimeout(300);
    console.log(t,'folder:', await p.evaluate(()=>[...document.querySelectorAll('.pr-fgrid .pr-tile b')].map(x=>x.textContent).join(' | ')));
    await p.screenshot({path:`/tmp/fold-${t}-folder.png`, fullPage:true});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
