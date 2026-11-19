const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'light'],['p',devices['iPhone 13'],'dark']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); });
    await p.goto('http://localhost:8768/index.html#verbs'); await p.waitForTimeout(2200);
    await p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew').forEach(x=>x.remove()); document.body.style.overflow=''; });
    await p.evaluate(() => document.querySelector('.irr-prac').scrollIntoView({block:'center'})); await p.waitForTimeout(200);
    await p.screenshot({path:`/tmp/irr2-${t}-row.png`});
    await p.click('text=⌨️ Writing drill'); await p.waitForTimeout(500);
    await p.screenshot({path:`/tmp/irr2-${t}-drill.png`});
    console.log(t, await p.evaluate(()=>document.querySelector('[data-pp="irr"]:not([hidden])')?.innerText.replace(/\s+/g,' ').slice(0,160)));
    await p.click('.irr-new .swap'); await p.waitForTimeout(500);
    console.log(t, await p.evaluate(()=>document.querySelector('.vs-card')?.innerText.replace(/\s+/g,' ').slice(0,60)));
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
