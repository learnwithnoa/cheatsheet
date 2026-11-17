// Simple mode: Noa's switch arriving with sync, the one-time question (with the Spanish-help option), menu and Home
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']], ['pl', {...devices['iPhone 13'], colorScheme:'light'}]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); if(location.search.includes('light')) localStorage.setItem('ncs-theme','"light"'); });
    await p.goto('http://localhost:8768/index.html' + (t==='pl'?'?light':'')); await p.waitForTimeout(4000);
    await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); });
    // Noa's switch arrives with the sync
    await p.evaluate(() => { localStorage.setItem('ncs-simple', JSON.stringify({on:true,by:'noa',asked:false})); window.dispatchEvent(new CustomEvent('cs-synced',{detail:{changed:true}})); });
    await p.waitForTimeout(1500);
    console.log(t, 'simple class:', await p.evaluate(()=>document.documentElement.classList.contains('cs-simple')), 'ask:', await p.evaluate(()=>{ const a=document.querySelector('.sm-ask'); return a?a.innerText.replace(/\s+/g,' ').slice(0,200):'none'; }));
    await p.screenshot({path:`/tmp/sm-ask-${t}.png`});
    if (await p.$('#smBeg')) await p.check('#smBeg');
    await p.click('.sm-ask [data-c="1"]'); await p.waitForTimeout(600);
    console.log(t, 'level:', await p.evaluate(()=>localStorage.getItem('ncs-level')), 'saved:', await p.evaluate(()=>localStorage.getItem('ncs-simple')));
    console.log(t, 'menu:', await p.evaluate(()=>[...document.querySelectorAll('nav.side .navbtn, #smMore')].filter(x=>x.getClientRects().length&&getComputedStyle(x).display!=='none').map(x=>x.innerText.trim().replace(/\s+/g,' ')).join(' | ')));
    console.log(t, 'overflow:', await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
    await p.screenshot({path:`/tmp/sm-home-${t}.png`, fullPage:false});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
