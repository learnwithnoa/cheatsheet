// live board on Hibi: cards with "items" show a bullet list (light + dark, desktop + phone)
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
const board = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,theme] of [['d',{viewport:{width:1280,height:900}},'dark'],['p',devices['iPhone 13'],'dark'],['pl',devices['iPhone 13'],'light']]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/_boards_/, r => r.fulfill({contentType:'application/json', body: JSON.stringify({fields:{json:{stringValue: JSON.stringify({boards:{3:{...board, theme}}})}}})}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(2200);
    await p.evaluate(() => { [...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Got it').forEach(b=>b.click());
      document.body.insertAdjacentHTML('beforeend','<button id="tb" data-board="2026-11-16|3">x</button>'); document.getElementById('tb').click(); });
    await p.waitForTimeout(900);
    console.log(t, await p.evaluate(() => [document.querySelectorAll('.lb-items').length, document.querySelectorAll('.lb-items li').length, document.querySelectorAll('.lb-card').length].join(' / ')));
    await p.evaluate(() => { const c=[...document.querySelectorAll('.lb-card')].find(x=>x.textContent.includes('Wekondo')); c && c.scrollIntoView(); });
    await p.waitForTimeout(300); await p.screenshot({path:`/tmp/lbi-${t}.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
