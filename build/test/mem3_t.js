// Members page loads (Hibi only option, tips, club archive) without errors
const {chromium} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const meta = { recs: [{id:'a',hub:'x',name:'Ana Pérez',mod:'pp',stage:6,why:'said I have seen it yesterday',date:'2026-11-10'},{id:'b',hub:'y',name:'Beto Soto',mod:'iq',stage:1,why:'Do you know where is it',date:'2026-11-12',count:4,imp:3}],
  club: { asOf:'Nov 16', members:[{name:'Old Member',status:'leaving',price:20},{name:'Paying Person',status:'paying',price:35}] } };
const cloud = {}; cloud['users/u1/data/t-hubmeta'] = { json: JSON.stringify(meta), deleted: false };
(async () => { const b = await chromium.launch(); const errs = [];
  const ctx = await b.newContext({viewport:{width:1280,height:900}});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(c => { sessionStorage.setItem('__cloud', JSON.stringify(c)); }, cloud);
  await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
  console.log('tips:', await p.evaluate(() => [...document.querySelectorAll('#tips li')].map(l=>l.innerText.replace(/\s+/g,' ').slice(0,90)).join(' || ')));
  await p.evaluate(() => { const b=document.querySelector('[data-mtab="club"]'); b&&b.click(); }); await p.waitForTimeout(300);
  console.log('archive btn:', await p.evaluate(() => document.querySelectorAll('[data-clarch]').length));
  await p.screenshot({path:'/tmp/mem3-club.png'});
  console.log('kind opts:', await p.evaluate(() => [...document.querySelectorAll('#tKind option')].map(o=>o.value).join(',')));
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
