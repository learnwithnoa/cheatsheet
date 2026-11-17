// Links for Club tabs, My coaching tabs and Noa's teacher pages
const {chromium} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stubT = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  async function ctxFor(s){ const ctx = await b.newContext({viewport:{width:1280,height:900}});
    await ctx.route(/fb\.js/, r => r.fulfill({body: s, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','9999'); }); return p; }
  const info = p => p.evaluate(() => location.hash+' | club tab:'+((document.querySelector('.cl-tab[aria-pressed="true"]')||{}).dataset||{}).clt+' | coach tab:'+((document.querySelector('.ch-tab[aria-pressed="true"]')||{}).dataset||{}).ct);
  let p = await ctxFor(stub);
  await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=club#club/recordings'); await p.waitForTimeout(2500); console.log('club deep  ', await info(p));
  await p.evaluate(() => document.querySelector('.cl-tab[data-clt="calendar"]').click()); await p.waitForTimeout(300); console.log('club click ', await info(p));
  await p.evaluate(() => document.querySelector('nav.side [data-go="quiz"]').click()); await p.waitForTimeout(300);
  await p.goBack(); await p.waitForTimeout(500); console.log('club back  ', await info(p));
  await p.goto('http://localhost:8768/index.html?guest=hb7k2q#coaching/pack'); await p.waitForTimeout(2500); console.log('coach deep ', await info(p));
  await p.evaluate(() => { window.__csHubView={name:"Test",classes:[],tips:[],packs:[]}; window.__csDeep.coaching.open(["pack"]); }); await p.waitForTimeout(400); console.log('coach open ', await info(p));
  await p.evaluate(() => { const t=document.querySelector('.ch-tab[data-ct="goals"]'); t&&t.click(); }); await p.waitForTimeout(300); console.log('coach click', await info(p));
  p = await ctxFor(stubT);
  await p.goto('http://localhost:8768/index.html#students/money'); await p.waitForTimeout(4000);
  console.log('students deep', await p.evaluate(() => location.hash+' | frame:'+(document.querySelector('#stFrame iframe')||{contentWindow:{location:{}}}).contentWindow.location.hash));
  await p.evaluate(() => { document.querySelector('#stFrame iframe').contentWindow.location.hash='#overview'; }); await p.waitForTimeout(500);
  console.log('students nav ', await p.evaluate(() => location.hash));
  await p.evaluate(() => document.querySelector('nav.side [data-go="members"]').click()); await p.waitForTimeout(2500);
  console.log('members      ', await p.evaluate(() => location.hash));
  console.log(errs.length ? errs.slice(0,5) : 'no errors'); await b.close(); })();
