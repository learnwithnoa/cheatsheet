// 1:1 overview: LIVE NOW card with a live class (fake data)
const {chromium} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
(async () => { const b = await chromium.launch(); const errs=[];
  for (const vp of [{width:1100,height:800},{width:390,height:844}]) {
  const ctx = await b.newContext({viewport:vp});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  const now=Date.now(); const up=[{start:new Date(now-10*60e3).toISOString(),end:new Date(now+40*60e3).toISOString(),name:'Pascal Cáceres',student:'',note:'Ask how his first club class went (trial). Story words in My words.'},{start:new Date(now+3*3600e3).toISOString(),name:'Bayron Amaro',student:'',note:'Class 8: past simple'}];
  await p.addInitScript(c=>{ sessionStorage.setItem('__cloud', JSON.stringify(c)); }, {'users/u1/data/t-hubmeta':{json:JSON.stringify({upcoming:up}),deleted:false}});
  await p.goto('http://localhost:8768/private-students.html#overview'); await p.waitForTimeout(3000);
  console.log(vp.width, await p.evaluate(()=>{ const b=document.getElementById('nextBox'); return b.hidden?'HIDDEN':b.innerText.replace(/\s+/g,' ').slice(0,300); }));
  const el=await p.$('#nextBox'); if(el) await el.screenshot({path:'/tmp/nx-'+vp.width+'.png'});
  await ctx.close(); }
  console.log(errs.length?errs:'no errors'); await b.close(); })();
