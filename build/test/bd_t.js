// Buddy room test: teacher (everything unlocked), then a member with stage 8 passed
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stubT = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const stubM = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
const mode = process.argv[2] || 'teacher';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: mode==='teacher'?stubT:stubM, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(m => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('cs-theme','light');
      localStorage.setItem('ncs-buddy', JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:5,f:20}));
      if (m!=='teacher') localStorage.setItem('ncs-mods', JSON.stringify({pp:{b:{8:8},s:{8:2}}, ps:{b:{1:9,2:9,3:9,4:9,5:9,6:9,7:9,8:9}}, iq:{b:{1:9,2:9,3:9,4:9,5:9,6:9,7:8}}})); }, mode);
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(2500);
    await p.evaluate(() => document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop').forEach(e=>e.remove()));
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click()); }); await p.waitForTimeout(300);
    await p.evaluate(() => document.getElementById('bdPet') && document.getElementById('bdPet').click()); await p.waitForTimeout(600);
    await p.evaluate(() => { const b=[...document.querySelectorAll('#bdBub button, .bd-bub button, button')].find(b=>b.dataset.bd==='open'); b&&b.click(); }); await p.waitForTimeout(900);
    await p.screenshot({path:`/tmp/bd-${mode}-${t}.png`});
    const st = await p.$('.bd-stage'); if (st) await st.screenshot({path:`/tmp/bd-${mode}-${t}-room.png`});
    await p.evaluate(() => { const b = document.querySelector('[data-sec="progress"]'); b && b.click(); }); await p.waitForTimeout(500);
    await p.evaluate(() => { const g=document.querySelector('.bd-gmod'); g&&g.scrollIntoView({block:'start'}); }); await p.waitForTimeout(200);
    const mo = await p.$('.bd-modal, #bdModal'); await p.screenshot({path:`/tmp/bd-${mode}-${t}-prog.png`, fullPage: false});
    console.log(t, await p.evaluate(() => [...document.querySelectorAll('.bd-gmod')].map(e=>e.textContent).join(' | ')));
    await p.evaluate(() => { location.hash = '#quiz'; }); await p.waitForTimeout(600);
    await p.evaluate(() => { document.querySelectorAll('.bd-x').forEach(b=>b.click()); const g=document.querySelector('[data-go="quiz"]'); g&&g.click(); }); await p.waitForTimeout(500);
    await p.evaluate(() => { const g=document.querySelector('[data-pr="gram"]'); g&&g.click(); }); await p.waitForTimeout(400);
    await p.evaluate(() => { const g=document.querySelector('[data-modtile="pp"]'); g&&g.click(); }); await p.waitForTimeout(700);
    console.log(t, 'advhd:', await p.evaluate(() => (document.querySelector('.ps-advhd')||{}).textContent));
    console.log(t, await p.evaluate(() => [...document.querySelectorAll('[data-toyg]')].map(g=>g.dataset.toyg).join(',')));
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
