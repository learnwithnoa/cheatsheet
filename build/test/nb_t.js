// My notebook: merged menu item, tabs, one-time pop-up
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']], ['pd', {...devices['iPhone 13'], colorScheme:'dark'}]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { if(!sessionStorage.getItem('x')){ sessionStorage.setItem('x',1); localStorage.setItem('ncs-welcomed','1'); localStorage.removeItem('ncs-nb-intro'); }
      if(location.search.includes('dark')) localStorage.setItem('ncs-theme','"dark"'); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(3000);
    await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); });
    await p.waitForTimeout(9000);
    const dlg = await p.$('.nb-intro-dlg'); console.log(t, 'popup:', !!dlg);
    if (dlg) await p.screenshot({path:`/tmp/nb-pop-${t}.png`});
    if (dlg) await p.click('[data-nbgo]'); await p.waitForTimeout(800);
    console.log(t, 'hash', await p.evaluate(()=>location.hash), 'nav:', await p.evaluate(() => [...document.querySelectorAll('nav.side .navbtn')].filter(b=>b.offsetParent).map(b=>b.innerText.trim().replace(/\s+/g,' ')).slice(0,6).join(' | ')));
    await p.screenshot({path:`/tmp/nb-words-${t}.png`});
    await p.click('#v-words [data-go="classnotes"]'); await p.waitForTimeout(500);
    console.log(t, 'cur:', await p.evaluate(()=>location.hash+' '+document.querySelector('.navbtn[aria-current="true"]').innerText.trim()));
    await p.screenshot({path:`/tmp/nb-cn-${t}.png`});
    await p.click('#v-classnotes [data-go="notebook"]'); await p.waitForTimeout(500);
    console.log(t, 'cur:', await p.evaluate(()=>location.hash+' '+document.querySelector('.navbtn[aria-current="true"]').innerText.trim()));
    await p.reload(); await p.waitForTimeout(12000); console.log(t, 'popup again:', !!(await p.$('.nb-intro-dlg')));
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
