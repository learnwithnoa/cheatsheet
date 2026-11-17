const {chromium, devices} = require('playwright');
(async () => { const b = await chromium.launch(); const errs=[];
  const ctx = await b.newContext(devices['iPhone 13']);
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); });
  await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=club#club'); await p.waitForTimeout(6000);
  await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); });
  const n = await p.evaluate(() => document.querySelectorAll('button.cl-gwho').length); console.log('going who buttons:', n);
  if (n) { await p.evaluate(() => document.querySelector('button.cl-gwho').click()); await p.waitForTimeout(300); console.log('dlg:', await p.evaluate(()=>(document.querySelector('.cs-dlg')||{}).innerText)); }
  console.log('rx who:', await p.evaluate(() => document.querySelectorAll('.cs-rxwho').length));
  console.log(errs.length?errs:'no errors'); await b.close(); })();
