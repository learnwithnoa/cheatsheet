const {chromium, devices} = require('playwright'); const fs = require('fs'); const path = require('path');
const stub = fs.readFileSync(path.join(__dirname, 'fbstub3.js'), 'utf8');
const mem = st => JSON.stringify({fields:{json:{stringValue:JSON.stringify({status:st,kind:"m",amount:24000,paidThrough:"2026-12-15",graceUntil:"2026-12-20",card:"Visa ···4242"})},deleted:{booleanValue:false}}});
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [tag, opt] of [['desktop', {viewport: {width: 1280, height: 900}}], ['phone', devices['iPhone 13']]]) {
    for (const [name, url, st, dark] of [['join','index.html?pay=1#club',null,false],['active','index.html?guest=hb7k2q&as=club#club','active',false],['grace','index.html?guest=hb7k2q&as=club#club','grace',true]]) {
      const ctx = await b.newContext(Object.assign({}, opt, {colorScheme: dark?'dark':'light'}));
      await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
      await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
      await ctx.route(/data\/membership/, r => st ? r.fulfill({body: mem(st), contentType:'application/json'}) : r.fulfill({status:404, body:'{}'}));
      const p = await ctx.newPage(); p.on('pageerror', e => errs.push(tag + name + ': ' + e.message));
      await p.addInitScript(() => { localStorage.setItem('ncs-welcomed', '1'); localStorage.setItem('ncs-sync-uid', 'u1'); localStorage.setItem('ncs-seen-version', '"x"'); });
      await p.goto('http://localhost:8768/' + url); await p.waitForTimeout(3000);
      await p.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew,.qa-backdrop').forEach(e => e.remove()));
      const info = await p.evaluate(() => ({join: !!document.querySelector('[data-hbjoin]'), mem: (document.querySelector('#hbMem')||{}).innerText||null, lock: !!document.querySelector('.cl-lock')}));
      console.log(tag, name, JSON.stringify(info));
      const el = await p.$(name==='join' ? '.hb-pay' : '#hbMem');
      if (el) { await el.scrollIntoViewIfNeeded(); }
      await p.screenshot({path: `/tmp/pay-${tag}-${name}.png`});
      await ctx.close();
    }
  }
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no page errors'); await b.close();
})();
