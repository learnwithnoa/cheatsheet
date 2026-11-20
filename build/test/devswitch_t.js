// a device used by another account: the new account starts clean (nothing copied from the other one)
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [label, init] of [['other account was signed in', {'ncs-sync-uid':'someoneElse'}], ['other account signed out', {'ncs-prev-uid':'someoneElse'}], ['same account', {'ncs-sync-uid':'u1'}]]) {
    const ctx = await b.newContext(devices['iPhone 13']);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(i => { if (sessionStorage.getItem('done')) return; sessionStorage.setItem('done','1'); localStorage.setItem('ncs-welcomed','1'); for (const k in i) localStorage.setItem(k, i[k]);
      localStorage.setItem('ncs-words', JSON.stringify([{id:'x',w:'secret word',m:'',e:'',t:1}])); }, init);
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(5000);
    console.log(label, '->', await p.evaluate(() => (localStorage.getItem('ncs-words')||'').includes('secret word') ? 'kept the words' : 'started clean'));
    await ctx.close();
  }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
