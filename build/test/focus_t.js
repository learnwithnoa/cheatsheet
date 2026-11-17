// Focus mode: ☰ Menu opens the menu as a drawer
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const theme of ['light','dark']) for (const [t, o] of [['d', {viewport:{width:1280,height:850}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(th => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('cs-theme',th); localStorage.setItem('ncs-theme',th); localStorage.setItem('ncs-comfort', JSON.stringify({focus:true})); }, theme);
    await p.goto('http://localhost:8768/index.html#quiz'); await p.waitForTimeout(2500);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); document.querySelectorAll('.qa-backdrop,.wl-backdrop').forEach(e=>e.remove()); });
    await p.waitForTimeout(300);
    await p.screenshot({path:`/tmp/focus-${theme}-${t}-1.png`});
    await p.click('#csFocusNav'); await p.waitForTimeout(400);
    await p.screenshot({path:`/tmp/focus-${theme}-${t}-2.png`});
    await p.evaluate(() => { const b = document.querySelector('nav.side .navbtn[data-go="words"], nav.side [data-go]:not([data-go="quiz"])'); window.__to = b && b.dataset.go; b && b.click(); }); await p.waitForTimeout(500);
    console.log(theme, t, await p.evaluate(() => ({ to: window.__to, hash: location.hash, drawer: document.documentElement.classList.contains('cs-fnav'), btn: !document.getElementById('csFocusNav').hidden, ow: document.documentElement.scrollWidth > innerWidth })));
    await p.screenshot({path:`/tmp/focus-${theme}-${t}-3.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
