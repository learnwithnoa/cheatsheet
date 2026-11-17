// Weekly goal sizes, streak, translator starred by default
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1');
      const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)-7); localStorage.setItem('ncs-wkstreak', JSON.stringify({last:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(), n:3, best:3}));
      localStorage.setItem('ncs-buddy', JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:5,f:20})); });
    await p.goto('http://localhost:8768/index.html#quiz'); await p.waitForTimeout(7000);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); document.querySelectorAll('.qa-backdrop,.wl-backdrop').forEach(e=>e.remove()); });
    console.log(t, 'stars:', await p.evaluate(() => localStorage.getItem('ncs-stars')));
    await p.evaluate(() => document.querySelector('[data-wkgoal="5"]').click()); await p.waitForTimeout(300);
    console.log(t, 'card:', await p.evaluate(() => document.getElementById('prGoal').innerText.replace(/\s+/g,' ')));
    const g = await p.$('#prGoal'); await g.screenshot({path:`/tmp/goal-${t}.png`});
    await p.evaluate(() => { for(let i=0;i<5;i++) window.__prBumpWeek(); }); await p.waitForTimeout(1500);
    console.log(t, 'after:', await p.evaluate(() => localStorage.getItem('ncs-wkstreak')+' | '+localStorage.getItem('ncs-wk')));
    console.log(t, 'toys:', await p.evaluate(() => [...document.querySelectorAll('[data-toyg]')].map(x=>x.dataset.toyg).join(',')));
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
