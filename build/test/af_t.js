// ⚙️ Auto-fill + "Fill in missing details" only when something's missing
const {chromium, devices} = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) for (const dark of [false,true]) {
    const ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
    await ctx.route(/fb\.js/, r => r.fulfill({body: fs.readFileSync(__dirname+'/fbstub3.js','utf8'), contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    const old = Date.now()-864e5;
    await p.addInitScript(o => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','"x"'); localStorage.setItem('ncs-nb-intro','1');
      localStorage.setItem('ncs-words', JSON.stringify([{id:'a',w:'awkward',m:'incómodo',def:'uncomfortable',pos:'adjective',e:'It was awkward.',pr:'AWK-werd',t:o,ai:1},{id:'b',w:'figure out',m:'',t:o},{id:'c',w:'glitch',m:'falla',def:'small problem',pos:'noun',pr:'glich',t:o,ai:1}])); }, old);
    await p.goto('http://localhost:8768/index.html#words'); await p.waitForTimeout(4500);
    await p.evaluate(()=>document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()));
    const st = () => p.evaluate(()=>{ const f=document.getElementById('aiFill'); return {fillShown: !!f && !f.hidden, label: f && f.innerText.replace(/\s+/g,' ')}; });
    console.log(t, dark?'dark':'light', 'before:', JSON.stringify(await st()));   // b misses everything, c misses an example → 2
    await p.screenshot({path:`/tmp/af-${t}${dark?'-dk':''}.png`});
    await p.evaluate(()=>document.getElementById('aiAuto').click()); await p.waitForTimeout(500);
    await p.screenshot({path:`/tmp/af-${t}${dark?'-dk':''}-dlg.png`});
    await p.evaluate(()=>{ const d=document.querySelector('.cs-dlg'); d.querySelector('[data-opt][value="e"]').click(); d.querySelector('[data-af="y"]').click(); });
    await p.waitForTimeout(400);
    console.log(t, 'after unticking examples:', JSON.stringify(await st()), await p.evaluate(()=>localStorage.getItem('ncs-fillf')));
    await ctx.close();
  }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
