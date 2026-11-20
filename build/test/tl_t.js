// Members page: admin switcher + 🕒 Timeline for a student
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const now = Date.now(), D = 864e5, J = o => ({ json: JSON.stringify(o), deleted: false });
const cloud = {};
cloud['users/u1/data/t-hubmeta'] = J({ ids: ['ana'] });
cloud['users/u1/data/t-hub-ana'] = J({ id: 'ana', name: 'Ana Test', status: 'active', classes: [{ date: '2026-11-10', att: 'Present', topics: 'Past simple stories' }, { date: '2026-11-17', att: 'Late cancellation', topics: '' }], packs: [{ label: 'Pack 8', paid: '2026-11-03', price: '$120.000' }], guides: [{ title: 'Week 2 recap', date: '2026-11-11' }] });
cloud['users/u1/data/t-trials'] = J([{ uid: 'u7', email: 'ana@example.com', start: now - 20 * D, until: '2026-11-13', ended: now - 6 * D, joined: now - 5 * D, status: 'joined' }]);
cloud['users/u7'] = { name: 'Ana Test', email: 'ana@example.com' }; cloud['access/ana@example.com'] = { name: 'Ana', at: 1 };
cloud['roles/u7'] = { club: true, private: true, hub: 'ana' };
cloud['users/u7/data/membership'] = J({ status: 'active', amount: 35000, currency: 'CLP', kind: 'm', provider: 'mp', paidThrough: '2026-12-15' });
cloud['users/u7/data/ncs-mods'] = J({ ps: { s: {}, h: [{ k: 'st', n: 1, sc: 8, t: now - 2 * D }, { k: 'to', sc: 11, t: now - D }] } });
cloud['users/u7/data/ncs-words'] = J([{ id: 'a', w: 'trip', m: '', e: '', t: now - 3 * D }, { id: 'b', w: 'tip', m: '', e: '', t: now - 3 * D, by: 'teacher' }]);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,dark] of [['d',{viewport:{width:1280,height:900}},0],['p',devices['iPhone 13'],1]]) {
  const ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(c => { if(!sessionStorage.getItem('__cloud')) sessionStorage.setItem('__cloud', JSON.stringify(c)); }, cloud);
  await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
  await p.screenshot({path:`/tmp/tl-${t}-top.png`});
  await p.evaluate(() => { const tb=[...document.querySelectorAll('[data-mtab]')].find(x=>/Hibi members/.test(x.textContent)); tb&&tb.click(); document.querySelector('#list [data-uid="u7"]').click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { const b = document.getElementById('tlBox'); b.open = true; b.scrollIntoView({block:'start'}); window.scrollBy(0,-70); }); await p.waitForTimeout(300);
  console.log(t, await p.evaluate(() => document.getElementById('tlBox').innerText.replace(/\n+/g,' | ').slice(0,900)));
  await p.screenshot({path:`/tmp/tl-${t}.png`});
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
