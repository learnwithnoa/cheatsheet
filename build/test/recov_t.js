// Members page: 💡 Recommended tab
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const J = v => ({ json: JSON.stringify(v), deleted: false });
const cloud = {};
cloud['users/u2'] = { name: 'Ana Pérez', email: 'ana@example.com' };
cloud['users/u2/data/ncs-modrec'] = J({ iq: 'all', pp: 3 });
cloud['users/u2/data/ncs-mods'] = J({ pp: { b: { 1: 9, 2: 8, 3: 8 }, s: { 1: 3 }, r: 4, last: Date.now() } , iq: { b: { 1: 5 }, r: 1, last: Date.now() - 864e5 } });
cloud['users/u3'] = { name: 'Beto Soto', email: 'beto@example.com' };
cloud['users/u3/data/ncs-modrec'] = J({ iq: 2 });
cloud['users/u1/data/t-recs'] = J({ u2: { iq: { at: Date.now() - 3*864e5, n: 'all' } }, u3: { iq: { at: Date.now() - 864e5, n: 2 } } });
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
  const ctx = await b.newContext(o);
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(c => { sessionStorage.setItem('__cloud', JSON.stringify(c)); }, cloud);
  await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
  console.log(t, 'tabs:', await p.evaluate(() => document.getElementById('mTabs').innerText.replace(/\s+/g,' ')));
  await p.evaluate(() => document.querySelector('[data-mtab="recs"]').click()); await p.waitForTimeout(300);
  console.log(t, await p.evaluate(() => document.getElementById('recsBox').innerText.replace(/\s+/g,' ').slice(0,500)));
  await p.screenshot({path:`/tmp/recov-${t}.png`, fullPage: true});
  await p.selectOption('#rcSt', 'no'); await p.waitForTimeout(200);
  console.log(t, 'not started rows:', await p.evaluate(() => document.querySelectorAll('.rc-row').length));
  await p.click('[data-rcuid]'); await p.waitForTimeout(400);
  console.log(t, 'opened tab:', await p.evaluate(() => document.querySelector('[data-mtab][aria-pressed="true"]').innerText));
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
