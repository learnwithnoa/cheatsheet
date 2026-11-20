// Members page: Remove from Hibi + Let back in
const {chromium} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const cloud = {}; cloud['users/u1/data/t-hubmeta'] = { json: JSON.stringify({}), deleted: false };
cloud['users/u7'] = { name: 'Test Person', email: 'wrong@example.com' }; cloud['access/wrong@example.com'] = { name: 'Test Person', at: 1 };
cloud['users/u8'] = { name: 'Other Person', email: 'other@example.com' };
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,dark] of [['d',{viewport:{width:1280,height:900}},0],['p',require('playwright').devices['iPhone 13'],1]]) {
  const ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(c => { if(!sessionStorage.getItem('__cloud')) sessionStorage.setItem('__cloud', JSON.stringify(c)); }, cloud);
  await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
  console.log(t, 'list:', await p.evaluate(() => [...document.querySelectorAll('#list .stu b')].map(x=>x.textContent).join(', ')));
  await p.evaluate(() => document.querySelector('#list [data-uid="u7"]').click()); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector('.rm-box').scrollIntoView({block:'center'}));
  await p.screenshot({path:`/tmp/rm-${t}-1.png`});
  await p.evaluate(() => document.querySelector('[data-rmhibi]').click()); await p.waitForTimeout(200);
  console.log(t, 'btn:', await p.evaluate(() => document.querySelector('[data-rmhibi]').textContent));
  await p.evaluate(() => document.querySelector('[data-rmhibi]').click()); await p.waitForTimeout(1200);
  const st = await p.evaluate(() => { const c = JSON.parse(sessionStorage.getItem('__cloud')||'{}'); return { access: !!c['access/wrong@example.com'], removed: Object.keys((JSON.parse((c['users/u1/data/t-hubmeta']||{}).json||'{}').removed)||{}),
    list: [...document.querySelectorAll('#list .stu b')].map(x=>x.textContent).join(', '), rm: document.getElementById('rmList') && document.getElementById('rmList').innerText.replace(/\s+/g,' ') }; });
  console.log(t, JSON.stringify(st));
  await p.evaluate(() => { const d=document.getElementById('rmList'); d.open=true; d.scrollIntoView({block:'center'}); }); await p.screenshot({path:`/tmp/rm-${t}-2.png`});
  await p.evaluate(() => document.querySelector('[data-rmback]').click()); await p.waitForTimeout(2500);
  console.log(t, 'back:', await p.evaluate(() => { const c = JSON.parse(sessionStorage.getItem('__cloud')||'{}'); return !!c['access/wrong@example.com'] + ' list: ' + [...document.querySelectorAll('#list .stu b')].map(x=>x.textContent).join(', '); }));
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
