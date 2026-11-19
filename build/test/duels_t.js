// duels tracker: Home card (collapsed, at the top), bell section, park badge, history
const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'light'],['p',devices['iPhone 13'],'dark'],['pl',devices['iPhone 13'],'light']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { const now=Date.now(), D=864e5;
      localStorage.setItem('ncs-welcomed','1');
      localStorage.setItem('ncs-buddy', JSON.stringify({on:true,a:'cat',n:'Mimi',c:0,t:5,f:20,gr:6,da:{d2:now-2*D},dd:{d2:{ty:'gram',st:now-2*D,gb:0},d3:{}},dz:[{id:'d3',to:'u4',ty:'first15',at:now-36e5}],
        dhist:[{id:'d0',ty:'race',opp:'Ana',mine:9,theirs:5,res:'w',end:now-5*D}],dw:1}));
      const list=()=>[{me:true,uid:'me1',first:'Me',role:{club:true}},
        {uid:'u2',first:'Laura',role:{club:true},dz:[{id:'d1',to:'me1',ty:'cards',at:now-36e5}]},
        {uid:'u3',first:'Pedro',role:{club:true},dz:[{id:'d2',to:'me1',ty:'gram',at:now-2*D}],dsc:{d2:4}},
        {uid:'u4',first:'Fabrizio',role:{club:true}}];
      const P={signedIn:()=>true,uid:()=>'me1',list:async()=>list(),publish:async()=>{},heart:async()=>{},feed:async()=>{},claim:async()=>[]};
      Object.defineProperty(window,'__csPark',{get:()=>P,set:()=>{},configurable:false});
    });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(7000);
    await p.evaluate(() => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); document.body.style.overflow=''; });
    const info = await p.evaluate(() => { const bx=document.getElementById('dzBox'); const nx=bx&&bx.nextElementSibling; const r=bx.getBoundingClientRect();
      let sib=bx.nextElementSibling; while(sib&&(sib.hidden||!sib.offsetHeight)) sib=sib.nextElementSibling;
      return {hidden:bx.hidden, open:bx.open, prev:bx.previousElementSibling&&bx.previousElementSibling.className, next:sib&&sib.id, gap: sib?Math.round(sib.getBoundingClientRect().top-r.bottom):null,
        sum:bx.querySelector('summary')&&bx.querySelector('summary').textContent, badge:[...document.querySelectorAll('.dz-badge')].map(x=>x.hidden+':'+x.textContent)}; });
    console.log(t, JSON.stringify(info), await p.evaluate(()=>localStorage.getItem('ncs-buddy').slice(0,200)));
    await p.evaluate(()=>document.getElementById('dzBox').scrollIntoView({block:'center'}));
    await p.screenshot({path:`/tmp/dz-${t}-closed.png`});
    await p.evaluate(()=>{document.getElementById('dzBox').open=true; document.querySelectorAll('.bd-bub,.bd-say,[class*=bd-speech]').forEach(x=>x.remove());}); await p.waitForTimeout(400);
    await p.screenshot({path:`/tmp/dz-${t}-open.png`});
    if (t==='p') { // bell
      await p.evaluate(()=>{ const b=document.getElementById('clBell'); b&&b.click(); }); await p.waitForTimeout(500);
      console.log('bell', await p.evaluate(()=>{ const pn=document.getElementById('clBellPanel'); return pn?pn.innerText.slice(0,300):'none'; }));
      await p.screenshot({path:`/tmp/dz-${t}-bell.png`});
    }
  }
  console.log('errors', errs); await b.close(); })();
