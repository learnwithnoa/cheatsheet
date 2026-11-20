// page errors are reported (once, no personal data) to the pay helper
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const sent = [];
  const ctx = await b.newContext(devices['iPhone 13']);
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  await ctx.route(/\/api\/err/, r => { sent.push(r.request().postData()); r.fulfill({status:200, body:'{"ok":true}', contentType:'application/json', headers:{'access-control-allow-origin':'*'}}); });
  const p = await ctx.newPage();
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(4000);
  await p.addScriptTag({content: 'setTimeout(()=>{ undefinedThing.go(); },10); setTimeout(()=>{ undefinedThing.go(); },20);'});
  await p.waitForTimeout(1500);
  console.log(sent.length, sent[0]);
  await b.close(); })();
