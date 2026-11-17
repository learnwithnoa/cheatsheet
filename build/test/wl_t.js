// welcome tour: "Make it yours" step
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) {
  const ctx = await b.newContext(o); await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'})); await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(3000);
  console.log(t,'tour open:', await p.evaluate(()=>!document.getElementById('welcome').hidden), await p.evaluate(()=>document.getElementById('wlCount').textContent));
  await p.click('#wlNext'); await p.click('[data-wllevel="normal"]'); await p.waitForTimeout(600);
  console.log(t,'step:', await p.evaluate(()=>document.querySelector('.wl-step:not([hidden]) h2').textContent), await p.evaluate(()=>document.getElementById('wlCount').textContent));
  await p.click('[data-wlth="light"]'); await p.waitForTimeout(200); await p.click('[data-wlsz="1.2"]'); await p.waitForTimeout(200);
  await p.check('#wlmSimple'); await p.check('#wlmCalm'); await p.waitForTimeout(300);
  console.log(t,'theme:', await p.evaluate(()=>localStorage.getItem('ncs-theme')), 'size:', await p.evaluate(()=>window.csComfort.get().size), 'simple:', await p.evaluate(()=>document.documentElement.classList.contains('cs-simple')), 'calm:', await p.evaluate(()=>document.documentElement.classList.contains('cs-calm')));
  console.log(t,'pressed:', await p.evaluate(()=>[...document.querySelectorAll('[aria-pressed="true"][data-wlth],[aria-pressed="true"][data-wlsz]')].map(x=>x.textContent).join(',')));
  await p.screenshot({path:`/tmp/wl-${t}.png`});
  await p.click('#wlNext'); console.log(t,'next:', await p.evaluate(()=>document.querySelector('.wl-step:not([hidden]) h2').textContent.slice(0,40)));
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
