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
    await p.screenshot({path:`/tmp/irr-${t}-page.png`});
    await p.click('#v-verbs .irr-prac .pill-green'); await p.waitForTimeout(400);
    await p.click('[data-vflip]'); await p.waitForTimeout(200);
    console.log(t, await p.evaluate(()=>document.querySelector('.vs-card')?.innerText.replace(/\s+/g,' ').slice(0,150)));
    await p.screenshot({path:`/tmp/irr-${t}-card.png`});
    await p.click('[data-vqstart="irr1"]'); await p.waitForTimeout(400);
    console.log(t, await p.evaluate(()=>document.querySelector('#v-quiz, .view:not([hidden])')?.innerText.replace(/\s+/g,' ').slice(0,200)));
    await p.screenshot({path:`/tmp/irr-${t}-quiz.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
