const {chromium, devices} = require('playwright'); const fs = require('fs');
const T = (fs.readFileSync(__dirname+'/../../private-students.html','utf8').match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const J = v => ({ json: JSON.stringify(v), deleted: false });
const words = Array.from({length: 14}, (_, i) => ({ w: 'word'+i, m: 'palabra'+i, t: Date.now() }));
const cloud = { 'users/s1': { name: 'Sara Test', email: 's@example.com' }, 'roles/s1': { club: true },
  'users/s1/data/ncs-words': J(words), 'users/s1/data/ncs-modrec': J({ ps: 'all', pp: 3 }) };
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(c => sessionStorage.setItem('__cloud', JSON.stringify(c)), cloud);
    await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
    await p.evaluate(() => { const e = [...document.querySelectorAll('[data-uid="s1"]')].find(x => x.offsetParent); if (e) e.click(); }); await p.waitForTimeout(800);
    console.log(t, await p.evaluate(() => [...document.querySelectorAll('details.mcol')].map(d => d.dataset.col + ':' + (d.open ? 'open' : 'closed') + ':' + d.querySelector('summary').textContent.trim().slice(0, 70))));
    const pr = await p.$('details.mcol[data-col="p"]'); if (pr) { await pr.scrollIntoViewIfNeeded(); await p.screenshot({path:`/tmp/mem2-${t}-closed.png`}); await p.click('details.mcol[data-col="p"] > summary'); await p.waitForTimeout(300); await p.screenshot({path:`/tmp/mem2-${t}-open.png`}); }
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
