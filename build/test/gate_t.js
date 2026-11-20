// sign-in gate: let in / not let in / removed marker / can't connect (no cache) / can't connect (approved here before)
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [mode, cached] of [['yes',0],['no',0],['gone',0],['down',0],['down',1]]) {
    const ctx = await b.newContext(devices['iPhone 13']);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(mode+': '+e.message));
    await p.addInitScript(([m,c]) => { window.__testAccess = m; localStorage.setItem('ncs-welcomed','1'); if (c) localStorage.setItem('cs-ok-u1', String(Date.now())); }, [mode, cached]);
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(mode==='down'?12000:4000);
    const r = await p.evaluate(() => { const g = document.getElementById('authGate'); return { gate: !!(g && !g.hidden), title: g && !g.hidden ? (g.querySelector('#agTitle')||{}).textContent : '', synced: localStorage.getItem('ncs-sync-uid') }; });
    console.log(mode, cached ? '(approved here before)' : '', JSON.stringify(r));
    if (mode==='down' && !cached) await p.screenshot({path:'/tmp/gate-down.png'});
    await ctx.close();
  }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
