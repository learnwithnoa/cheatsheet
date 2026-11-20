// Kickoff preview: a new private student (sample) — guest link and View as → New private student
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stubT = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
(async () => { const b = await chromium.launch(); const errs = [];
  const clean=p=>p.evaluate(()=>{ document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd,.bd-bub').forEach(x=>x.remove()); document.body.style.overflow=''; });
  const state=p=>p.evaluate(()=>({ coachNav: !document.getElementById('navCoaching').hidden, view: (document.querySelector('section.view:not([hidden])')||{}).id,
    alex: document.getElementById('v-coaching').innerText.includes('Alex'), map: /English Map/i.test(document.getElementById('v-coaching').innerText),
    teacherTabs: [...document.querySelectorAll('.navbtn.t-tab')].some(x=>!x.hidden&&getComputedStyle(x).display!=='none'),
    bar: (document.getElementById('guestBar')||document.getElementById('vaBanner')||{}).innerText }));
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) for (const dark of [false,true]) {
    // 1) the guest link, opened while Noa is signed in (worst case)
    let ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stubT, contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    let p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+' guest: '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','"x"'); });
    await p.goto('http://localhost:8768/index.html?guest=hb7k2q&as=private#coaching'); await p.waitForTimeout(5000); await clean(p);
    console.log(t, dark?'dark':'light', 'guest link:', JSON.stringify(await state(p)));
    await p.screenshot({path:`/tmp/pv-${t}${dark?'-dk':''}-guest.png`, fullPage: false});
    await ctx.close();
    // 2) View as → Generic → New private student
    ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stubT, contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+' va: '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','"x"'); localStorage.setItem('ncs-words', JSON.stringify([{w:'NOA-OWN',m:''}])); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(4000); await clean(p);
    await p.evaluate(() => document.getElementById('vaHdr').click()); await p.waitForTimeout(1200);
    console.log(t, 'guest links:', await p.evaluate(()=>[...document.querySelectorAll('.va-gl span')].map(x=>x.textContent).join(' | ')));
    await Promise.all([p.waitForNavigation().catch(()=>{}), p.evaluate(() => document.querySelector('[data-va="private"]').click())]);
    await p.waitForTimeout(5000); await clean(p);
    console.log(t, dark?'dark':'light', 'view as:', JSON.stringify(await state(p)), 'noa words hidden:', await p.evaluate(()=>!localStorage.getItem('ncs-words')));
    await p.screenshot({path:`/tmp/pv-${t}${dark?'-dk':''}-va.png`});
    await ctx.close();
  }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
