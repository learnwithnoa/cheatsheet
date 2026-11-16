const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js', 'utf8');
const mem = o => JSON.stringify({fields:{json:{stringValue:JSON.stringify(o)},deleted:{booleanValue:false}}});
const until = new Date(Date.now()+9*864e5).toISOString().slice(0,10);
(async () => { const b = await chromium.launch(); const errs=[];
  const cases = [
    ['locked','index.html#club',null,''],
    ['lockedpay','index.html?pay=1#club',null,''],
    ['home','index.html#home',null,''],
    ['trial','index.html?guest=hb7k2q&as=club#club',{status:'trial',trialUntil:until,trialUsed:true},''],
    ['trialpay','index.html?pay=1#club',{status:'trial',trialUntil:until,trialUsed:true},'pay'],
    ['ended','index.html#club',{status:'trial-ended',trialUntil:'2026-11-10',trialUsed:true},''],
  ];
  for (const [t,o] of [['d',{viewport:{width:1100,height:900}}],['p',devices['iPhone 13']]]) for (const [name,url,m] of cases) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
    await ctx.route(/data\/membership/, r => m ? r.fulfill({body: mem(m), contentType:'application/json'}) : r.fulfill({status:404, body:'{}', contentType:'application/json'}));
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-sync-uid','u1'); localStorage.setItem('ncs-seen-version','"x"'); localStorage.setItem('ncs-theme','"light"'); });
    await p.goto('http://localhost:8768/'+url); await p.waitForTimeout(3200);
    await p.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew,.qa-backdrop').forEach(e => e.remove()));
    const info = await p.evaluate(() => ({trialBtn: !!document.querySelector('[data-hbtrial]'), hc: (document.querySelector('#homeClub .hc-join')||{}).textContent||null, mem: ((document.querySelector('#hbMem')||{}).innerText||'').replace(/\n+/g,' | ')}));
    if (t==='d') console.log(name, JSON.stringify(info));
    const el = await p.$(name.startsWith('locked') ? '.hb-trial' : name==='home' ? '#homeClub' : '#hbMem'); if (el) await el.scrollIntoViewIfNeeded();
    await p.screenshot({path:`/tmp/tr-${t}-${name}.png`}); await ctx.close(); }
  console.log(errs.length?errs:'no errors'); await b.close(); })();
