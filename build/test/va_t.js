// View as: read-only (no pay-helper calls, banner says nothing is saved), page works
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o); let calls=[];
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/workers\.dev/, r => { calls.push(r.request().url()); r.abort(); });
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-words', JSON.stringify([{w:'NOA-OWN',m:''}]));
      sessionStorage.setItem('cs-viewas', JSON.stringify({label:'Test Student',kind:'private',uid:'stu1',view:null,data:{'ncs-words':JSON.stringify([{w:'student word',m:'palabra'}]),'ncs-nb-intro':'1'},at:Date.now()})); });
    await p.goto('http://localhost:8768/index.html#words'); await p.waitForTimeout(6000);
    await p.evaluate(() => { const o=document.getElementById('wnOk'); if(o) o.click(); });
    console.log(t, 'banner:', await p.evaluate(()=>(document.getElementById('vaBanner')||{}).innerText));
    console.log(t, 'words shown:', await p.evaluate(()=>document.getElementById('v-words').innerText.includes('student word')), 'noa word shown:', await p.evaluate(()=>document.getElementById('v-words').innerText.includes('NOA-OWN')));
    const r = await p.evaluate(async()=>{ try{ await fetch('https://hibi-pay.learnwithnoa.workers.dev/api/trial',{method:'POST'}); return 'sent'; }catch(e){ return 'blocked: '+e.message; } });
    console.log(t, 'trial call:', r, 'reached network:', calls.filter(u=>u.includes('/api/trial')).length);
    await p.evaluate(()=>{ localStorage.setItem('ncs-words', JSON.stringify([{w:'added in view as'}])); });
    console.log(t, 'real storage untouched:', await p.evaluate(()=>Storage.prototype.getItem.toString().length>0) );
    await p.screenshot({path:`/tmp/va-${t}.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
