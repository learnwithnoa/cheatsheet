// Indirect questions module: tile, lesson, stages, a round, buddy toys
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('cs-theme','light');
      localStorage.setItem('ncs-mods', JSON.stringify({iq:{b:{1:8,2:8,3:8,4:9,5:7,6:10},s:{1:2,2:2,3:2,4:2,5:1,6:3}}})); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(2200);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); });
    await p.evaluate(() => { document.querySelector('[data-go="quiz"]').click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { document.querySelector('[data-pr="gram"]').click(); }); await p.waitForTimeout(500);
    console.log(t, 'tile:', await p.evaluate(() => { const x = document.querySelector('[data-modtile="iq"]'); return x && x.textContent.replace(/\s+/g,' ').trim(); }));
    await p.screenshot({path:`/tmp/iq-${t}-tiles.png`, fullPage: true});
    await p.evaluate(() => document.querySelector('[data-modtile="iq"]').click()); await p.waitForTimeout(800);
    console.log(t, 'stages:', await p.evaluate(() => [...document.querySelectorAll('.ps-stage b')].map(e=>e.textContent).join(' | ')));
    console.log(t, 'goal:', await p.evaluate(() => (document.querySelector('.ps-goal')||{}).textContent), await p.evaluate(() => (document.querySelector('.ps-advhd')||{}).textContent));
    await p.screenshot({path:`/tmp/iq-${t}-mod.png`, fullPage: true});
    console.log(t, 'buddy toys:', await p.evaluate(() => (window.csBuddy && 1) ? [...document.querySelectorAll('[data-toyg]')].map(g=>g.dataset.toyg).join(',') : 'n/a'));
    // start stage 1, answer the first question correctly
    await p.evaluate(() => { const b = document.querySelector('[data-psstart="1"]'); b && b.click(); }); await p.waitForTimeout(500);
    console.log(t, 'q:', await p.evaluate(() => (document.querySelector('.ps-q, .ps-qtext')||document.querySelector('#v-quiz .card')||{}).textContent.slice(0,160)));
    await p.screenshot({path:`/tmp/iq-${t}-q.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
