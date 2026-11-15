const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js', 'utf8');
const mem = JSON.stringify({fields:{json:{stringValue:JSON.stringify({status:"active",kind:"m",amount:24000,paidThrough:"2026-12-15",card:"Visa ···4242"})},deleted:{booleanValue:false}}});
(async () => { const b = await chromium.launch(); const errs=[];
  for (const [t,o,light] of [['d',{viewport:{width:1100,height:900}},1],['p',devices['iPhone 13'],0]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
    await ctx.route(/data\/membership/, r => r.fulfill({body: mem, contentType:'application/json'}));
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(l => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-sync-uid','u1'); localStorage.setItem('ncs-seen-version','"x"'); if(l) localStorage.setItem('ncs-theme','"light"'); }, light);
    await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=club#club'); await p.waitForTimeout(3000);
    await p.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew,.qa-backdrop').forEach(e => e.remove()));
    await p.screenshot({path:`/tmp/mem-${t}-open.png`, clip: t==='d'?{x:240,y:60,width:860,height:320}:undefined});
    await p.click('[data-hbmem="min"]'); await p.waitForTimeout(300);
    console.log(t, 'minimized:', await p.evaluate(()=>document.querySelector('.hb-mem').className), await p.evaluate(()=>localStorage.getItem('hibi-mem-min')));
    await p.reload(); await p.waitForTimeout(3000);
    await p.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew,.qa-backdrop').forEach(e => e.remove()));
    console.log(t, 'after reload:', await p.evaluate(()=>document.querySelector('.hb-mem').className));
    await p.screenshot({path:`/tmp/mem-${t}-min.png`, clip: t==='d'?{x:240,y:60,width:860,height:320}:undefined});
    // locked card
    const p2 = await ctx.newPage(); await p2.goto('http://localhost:8768/index.html?pay=1#club'); await p2.waitForTimeout(3000);
    await p2.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew,.qa-backdrop').forEach(e => e.remove()));
    const g = await p2.$('.cl-tiles'); await g.scrollIntoViewIfNeeded(); await p2.screenshot({path:`/tmp/lock4-${t}-tiles.png`});
    const h = await p2.$('.hb-pay'); await h.scrollIntoViewIfNeeded(); await p2.screenshot({path:`/tmp/lock4-${t}-cta.png`});
    await ctx.close(); }
  console.log(errs.length?errs:'no errors'); await b.close(); })();
