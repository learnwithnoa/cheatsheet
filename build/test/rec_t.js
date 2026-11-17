// Noa: Recommend pill inside a module; Grammar opens on all topics
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stubT = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stubT, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); });
    await p.goto('http://localhost:8768/index.html#quiz/grammar/past-simple'); await p.waitForTimeout(3500);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); document.querySelectorAll('.qa-backdrop,.wl-backdrop').forEach(e=>e.remove()); });
    console.log(t, 'pill:', await p.evaluate(() => !!document.querySelector('.ps-recbtn')));
    await p.screenshot({path:`/tmp/rec-${t}-1.png`});
    await p.evaluate(() => document.querySelector('.ps-recbtn').click()); await p.waitForTimeout(700);
    await p.evaluate(() => { const x=document.querySelector('[data-rs="3"]'); x&&x.click(); });
    console.log(t, 'msg:', await p.evaluate(() => (document.getElementById('psrMsg')||{}).value));
    await p.screenshot({path:`/tmp/rec-${t}-2.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
