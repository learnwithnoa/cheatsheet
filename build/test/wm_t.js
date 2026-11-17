// long word list: batches of 60
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) {
  const ctx = await b.newContext(o); await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'})); await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); 
    const W=[]; for(let i=0;i<250;i++) W.push({id:'w'+i,w:'word'+i,m:'palabra'+i,t:Date.now()-i*1000}); localStorage.setItem('ncs-words',JSON.stringify(W)); });
  await p.goto('http://localhost:8768/index.html#words'); await p.waitForTimeout(4000); await p.evaluate(()=>{ const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); });
  const n=()=>p.evaluate(()=>document.querySelectorAll('#wordList article').length);
  console.log(t,'cards:', await n(), 'button:', await p.evaluate(()=>(document.getElementById('wMore')||{}).innerText));
  await p.click('#wMore'); await p.waitForTimeout(400); console.log(t,'after click:', await n());
  await p.evaluate(()=>document.getElementById('wMore').scrollIntoView()); await p.waitForTimeout(800); console.log(t,'after scroll:', await n());
  await p.fill('#wSearch','word24'); await p.waitForTimeout(400); console.log(t,'search word24:', await n(), 'button:', await p.evaluate(()=>!!document.getElementById('wMore')));
  await p.fill('#wSearch',''); await p.waitForTimeout(400); console.log(t,'cleared:', await n());
  await p.evaluate(()=>document.getElementById('wSelAll')&&document.getElementById('wSelAll').click());
  await p.screenshot({path:`/tmp/wm-${t}.png`});
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
