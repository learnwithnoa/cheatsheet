// "Switch to yearly" on the membership card (fake monthly member)
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
const mem = (cur, amt, prov) => JSON.stringify({fields:{json:{stringValue:JSON.stringify({status:"active",kind:"m",amount:amt,currency:cur,paidThrough:"2026-12-05",card:prov==="paypal"?"PayPal":"Mercado Pago",provider:prov,trialUsed:false})}}});
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o, cur, amt, prov] of [['d', {viewport:{width:1280,height:900}}, 'CLP', 35000, 'mp'], ['p', devices['iPhone 13'], 'USD', 35, 'paypal'], ['p2', devices['iPhone 13'], 'CLP', 20000, 'mp']]) {
    for (const theme of ['light','dark']) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    await ctx.route(/data\/membership/, r => r.fulfill({body: mem(cur, amt, prov), contentType: 'application/json'}));
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(th => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','9999'); localStorage.setItem('cs-theme',th); localStorage.setItem('ncs-theme',th); }, theme);
    await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=club#club'); await p.waitForTimeout(3000);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); document.querySelectorAll('.qa-backdrop,.wl-backdrop').forEach(e=>e.remove()); const g=document.querySelector('.gp-bar,#gpBar,[class*=guest]'); });
    console.log(t, theme, 'pill:', await p.evaluate(() => (document.querySelector('[data-hbup]')||{}).textContent));
    if (await p.$('[data-hbup]')) { await p.evaluate(() => document.querySelector('[data-hbup]').click()); await p.waitForTimeout(300);
      console.log(t, 'box:', await p.evaluate(() => document.querySelector('.hb-upbox').innerText.replace(/\s+/g,' '))); }
    const c = await p.$('#hbMem'); if (c) await c.screenshot({path:`/tmp/up-${t}-${theme}.png`});
    await ctx.close(); } }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
