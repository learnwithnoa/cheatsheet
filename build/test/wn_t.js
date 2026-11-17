// What's new pop-up prefs, Settings order, Simple-mode translator
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  const mk = async (o, init) => { const ctx = await b.newContext(o); await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'})); await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort()); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); await p.addInitScript(init); return [ctx,p]; };
  // 1) pop-up shows, "See fewer" → week, no pop-up on reload
  let [ctx,p] = await mk({viewport:{width:1280,height:900}}, () => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); if(!sessionStorage.getItem('x')){ sessionStorage.setItem('x',1); localStorage.setItem('ncs-seen-version','"2026-11-10"'); } });
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(2500);
  console.log('popup open:', await p.evaluate(()=>!document.getElementById('whatsnew').hidden), 'link:', await p.evaluate(()=>document.getElementById('wnLess').textContent));
  await p.screenshot({path:'/tmp/wn-pop.png'});
  await p.click('#wnLess'); await p.waitForTimeout(300);
  console.log('pref:', await p.evaluate(()=>localStorage.getItem('ncs-wnpref')));
  await p.evaluate(()=>localStorage.setItem('ncs-seen-version','"2026-11-10"')); await p.reload(); await p.waitForTimeout(2500);
  console.log('after reload popup:', await p.evaluate(()=>!document.getElementById('whatsnew').hidden), 'dot:', await p.evaluate(()=>!!document.querySelector('.cs-new')));
  // week passed → weekly summary pop-up with several updates
  await p.evaluate(()=>{ localStorage.setItem('ncs-wnlast', String(Date.now()-8*864e5)); localStorage.setItem('ncs-seen-version','"2026-11-10"'); }); await p.reload(); await p.waitForTimeout(2500);
  console.log('weekly popup:', await p.evaluate(()=>!document.getElementById('whatsnew').hidden), await p.evaluate(()=>document.querySelector('#wnBody .cl-date').textContent), 'link now:', await p.evaluate(()=>document.getElementById('wnLess').textContent));
  await p.screenshot({path:'/tmp/wn-week.png'});
  await p.click('#wnOk');
  // settings
  await p.evaluate(()=>window.__csSettingsOpen(true)); await p.waitForTimeout(1200);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('#csPanel > .cs-sec')].map(s=>'## '+((s.querySelector(':scope > h4')||{}).textContent||'(reset)')+': '+[...s.querySelectorAll('.cs-tog b, .cs-wnp-box > b, h4 ~ div b, .cs-tog > span > b')].map(x=>x.textContent.trim().slice(0,28)).filter((v,i,a)=>a.indexOf(v)===i).join(' / ')).join('\n')));
  console.log('pressed:', await p.evaluate(()=>[...document.querySelectorAll('[data-wnp]')].map(x=>x.dataset.wnp+'='+x.getAttribute('aria-pressed')).join(' ')));
  await p.click('[data-wnp="none"]'); console.log('pref after click:', await p.evaluate(()=>localStorage.getItem('ncs-wnpref')));
  await p.screenshot({path:'/tmp/wn-settings.png', fullPage:false});
  await ctx.close();
  // 3) simple mode + translator, phone
  [ctx,p] = await mk(devices['iPhone 13'], () => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-nb-intro','1'); localStorage.setItem('ncs-seen-version','"zzz"'); localStorage.setItem('ncs-simple',JSON.stringify({on:true,by:'me',asked:true})); });
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(4000);
  await p.evaluate(()=>{ const o=document.getElementById('wnOk'); if(o&&!document.getElementById('whatsnew').hidden) o.click(); });
  console.log('simple menu:', await p.evaluate(()=>[...document.querySelectorAll('nav.side .navbtn, #smMore')].filter(x=>x.getClientRects().length&&getComputedStyle(x).display!=='none').map(x=>x.innerText.trim().replace(/\s+/g,' ')).join(' | ')));
  console.log('doors:', await p.evaluate(()=>[...document.querySelectorAll('.sm-door b')].map(x=>x.textContent).join(', ')));
  await p.screenshot({path:'/tmp/wn-simple.png'});
  await p.click('#smTr'); await p.waitForTimeout(500); console.log('translator open:', await p.evaluate(()=>location.hash+' '+!document.getElementById('v-translate').hidden+' current:'+(document.querySelector('.navbtn[aria-current="true"]')||{}).innerText));
  await p.click('#smMore'); await p.waitForTimeout(300); console.log('more: smTr hidden:', await p.evaluate(()=>getComputedStyle(document.getElementById('smTr')).display));
  await ctx.close();
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
