// Nov 22 2026: duels for everyone. A private student (not in the club) sees the duels card and can challenge club and non-club buddies; club messages stay club-only
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'light'],['p',devices['iPhone 13'],'dark']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { const now=Date.now();
      localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','"x"'); localStorage.setItem('ncs-nb-intro','1');
      localStorage.setItem('ncs-buddy', JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:5,f:20}));
      const list=()=>[{me:true,uid:'me1',first:'Me',a:'cat',on:true,role:{private:true,hub:true,club:false}},
        {uid:'u2',first:'Laura',a:'frog',on:true,role:{club:true}},
        {uid:'u3',first:'Jose',a:'frog',on:true,role:{private:true,hub:true,club:false},dz:[{id:'d1',to:'me1',ty:'race',at:now-36e5}]}];
      const P={signedIn:()=>true,uid:()=>'me1',list:async()=>list(),publish:async()=>{},heart:async()=>{},feed:async()=>{},claim:async()=>[]};
      Object.defineProperty(window,'__csPark',{get:()=>P,set:()=>{},configurable:false});
      window.__clubDM = ()=>{};
    });
    await p.goto('http://localhost:8768/index.html#park'); await p.waitForTimeout(7000);
    await p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); });
    const r = await p.evaluate(() => [...document.querySelectorAll('#parkArea .park-b[data-uid]')].filter(x=>x.dataset.uid).map(x=>x.getAttribute('aria-label').split(',')[1]+': duel='+!!x.querySelector('[data-duel]')+' dm='+!!x.querySelector('[data-pdm]')));
    console.log(t, 'park:', JSON.stringify(r));
    console.log(t, 'park duels box:', await p.evaluate(()=>{ const x=document.querySelector('#duelBox, .duel-box, [id*=duel]'); return x?(x.hidden?'hidden':'shown: '+x.innerText.slice(0,120).replace(/\n/g,' / ')):'none'; }));
    await p.evaluate(()=>{ const d=document.querySelector('[data-duel="u2"]'); d&&d.click(); }); await p.waitForTimeout(400);
    console.log(t, 'dialog:', await p.evaluate(()=>{ const d=document.querySelector('.cs-dlg'); return d?d.innerText.slice(0,80).replace(/\n/g,' / '):'none'; }));
    await p.evaluate(()=>{ document.querySelectorAll('.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); location.hash='#notes'; }); await p.waitForTimeout(1500);
    console.log(t, 'home duels card:', await p.evaluate(()=>{ const x=document.getElementById('dzBox'); return x?(x.hidden?'hidden':'shown'):'none'; }));
    await p.screenshot({path:`/tmp/dzall-${t}.png`});
    await ctx.close();
  }
  console.log('errors', errs); await b.close(); })();
