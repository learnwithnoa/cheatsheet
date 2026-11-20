// Noa's menu: one "Students" item with Private students / Hibi members tabs
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) {
  const ctx = await b.newContext(o);
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-sync-uid','u1'); localStorage.setItem('ncs-seen-version','"x"'); });
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(4000);
  const clean=()=>p.evaluate(()=>{ document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd,.bd-bub').forEach(x=>x.remove()); document.body.style.overflow=''; });
  await clean();
  const menu = await p.evaluate(() => [...document.querySelectorAll('.navbtn.t-tab')].map(x => x.id+':'+(getComputedStyle(x).display!=='none'&&!x.hidden)));
  console.log(t, 'menu', menu);
  await p.evaluate(() => document.getElementById('navStudents').click()); await p.waitForTimeout(600);
  console.log(t, 'students view:', await p.evaluate(() => !document.getElementById('v-students').hidden));
  await p.screenshot({path:`/tmp/adm-${t}-1.png`});
  await p.evaluate(() => document.querySelector('#v-students [data-admgo="members"]').click()); await p.waitForTimeout(600);
  console.log(t, 'members view:', await p.evaluate(() => !document.getElementById('v-members').hidden), 'menu current:', await p.evaluate(() => document.getElementById('navStudents').getAttribute('aria-current')));
  await p.screenshot({path:`/tmp/adm-${t}-2.png`});
  await p.evaluate(() => document.querySelector('.navbtn[data-go="notes"]').click()); await p.waitForTimeout(400);
  await p.evaluate(() => document.getElementById('navStudents').click()); await p.waitForTimeout(600);
  console.log(t, 'remembers members:', await p.evaluate(() => !document.getElementById('v-members').hidden));
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
