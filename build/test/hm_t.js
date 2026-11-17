// Home order + arrange + compact world card
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/world-reacts/, r => r.fulfill({contentType:'application/json', headers:{'access-control-allow-origin':'*'}, body: JSON.stringify({hidden:[], rx:{"0":[{e:"💛",n:"Ana"},{e:"😂",n:"Beto"},{e:"💛",n:"Cami"}]}})}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); });
    await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=club'); await p.waitForTimeout(6000);
    await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); document.querySelectorAll('.cs-dlg-x').forEach(x=>x.click()); document.querySelectorAll('.bd-egg,.bd-bub').forEach(x=>x.remove()); });
    const order = () => p.evaluate(() => [...document.getElementById('v-notes').children].filter(c=>['tStoic','homeClub','todayBox','awBox','rvBox'].includes(c.id)).map(c=>c.id+(c.classList.contains('hm-off')?'(off)':'')+':'+c.offsetHeight).join(' > '));
    console.log(t, 'order:', await order());
    await p.screenshot({path:`/tmp/hm-${t}.png`, fullPage:true});
    await p.click('#hmArrange'); await p.waitForTimeout(300);
    await p.screenshot({path:`/tmp/hm-dlg-${t}.png`});
    await p.click('[data-hmup="world"]'); await p.click('[data-hmhide="today"]'); await p.waitForTimeout(200);
    console.log(t, 'after:', await order(), 'saved:', await p.evaluate(()=>localStorage.getItem('ncs-homeorder')));
    await p.click('[data-hmreset]'); await p.click('[data-hmdone]');
    console.log(t, 'reset:', await order());
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
