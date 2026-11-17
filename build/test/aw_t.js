// 🌍 Around the world card on Home
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']], ['pd', {...devices['iPhone 13'], colorScheme:'dark'}], ['dl', {viewport:{width:1280,height:900}, colorScheme:'light'}]]) {
    const ctx = await b.newContext(o); let posted=null;
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/world-reacts/, r => r.fulfill({contentType:'application/json', headers:{'access-control-allow-origin':'*'}, body: JSON.stringify({hidden:[], rx:{"0":[{e:"💛",n:"Ana",me:false},{e:"😂",n:"Beto",me:false},{e:"💛",n:"Cami",me:false}],"2":[{e:"🤯",n:"Dani",me:true}]}})}));
    await ctx.route(/world-react$/, r => { posted=r.request().postData(); r.fulfill({contentType:'application/json', headers:{'access-control-allow-origin':'*'}, body: JSON.stringify({hidden:[], rx:{"1":[{e:"💛",n:"Me",me:true}]}})}); });
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(6000);
    await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); document.querySelectorAll('.cs-dlg-x').forEach(x=>x.click()); });
    console.log(t, 'card:', await p.evaluate(() => { const b=document.getElementById('awBox'); return b.hidden?'HIDDEN':b.innerText.replace(/\s+/g,' ').slice(0,260); }));
    console.log(t, 'buddies svg:', await p.evaluate(() => document.querySelectorAll('#awBox .aw-bud svg').length));
    const box = await p.$('#awBox'); await box.screenshot({path:`/tmp/aw-${t}.png`});
    await p.click('#awBox [data-aww]'); await p.waitForTimeout(300);
    console.log(t, 'word dlg:', await p.evaluate(() => (document.querySelector('.cs-dlg')||{}).innerText||'none').then(x=>x.replace(/\s+/g,' ')));
    await p.evaluate(() => document.querySelector('.cs-dlg [data-savew]').click()); await p.waitForTimeout(300);
    await p.click('#awBox [data-awrx="💛"][data-i="1"]'); await p.waitForTimeout(500);
    console.log(t, 'posted:', posted);
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
