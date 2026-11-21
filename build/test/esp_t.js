// English for Specific Purposes: hub button, Job interviews module (no toy), Practice interview with a fake AI answer
const {chromium, devices} = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o] of [['d',{viewport:{width:1280,height:900}}],['p',devices['iPhone 13']]]) for (const dark of [false,true]) {
    const ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
    await ctx.route(/fb\.js/, r => r.fulfill({body: fs.readFileSync(__dirname+'/fbstub3.js','utf8'), contentType: 'text/javascript'}));
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); localStorage.setItem('ncs-seen-version','"x"'); localStorage.setItem('ncs-nb-intro','1');
      window.__csSample = async () => ({text: JSON.stringify({good:"Clear structure and good verbs.",fixes:[{from:"I have 5 years working",to:"I have 5 years of experience",why:"years OF experience"}],better:"I'm a project manager with five years of experience in logistics.",phrases:["I'm responsible for","As a result"]})}); });
    const clean = () => p.evaluate(()=>document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd,.bd-bub').forEach(x=>x.remove()));
    await p.goto('http://localhost:8768/index.html#quiz'); await p.waitForTimeout(4000); await clean();
    const tag = `${t}${dark?'-dk':''}`;
    await p.screenshot({path:`/tmp/esp-${tag}-hub.png`, fullPage:true});
    await p.evaluate(()=>document.querySelector('#v-quiz [data-pr="esp"]').click()); await p.waitForTimeout(400);
    console.log(tag, 'esp:', await p.evaluate(()=>location.hash), await p.evaluate(()=>document.querySelector('#prIntTile .pr-sub').textContent));
    await p.screenshot({path:`/tmp/esp-${tag}-panel.png`});
    await p.evaluate(()=>document.querySelector('#prIntTile').click()); await p.waitForTimeout(500);
    console.log(tag, 'module:', await p.evaluate(()=>location.hash), await p.evaluate(()=>[document.querySelectorAll('#psArea .ps-stage').length, (document.querySelector('#psArea .ps-goal')||{}).textContent, (document.querySelector('[data-pp="ps"] .pr-back-t')||{}).textContent]));
    await p.screenshot({path:`/tmp/esp-${tag}-mod.png`, fullPage:true});
    await p.evaluate(()=>document.querySelector('#psArea [data-psstart="1"]').click()); await p.waitForTimeout(400);
    await p.screenshot({path:`/tmp/esp-${tag}-q.png`});
    // answer 10 questions with the right answers
    for (let k=0;k<12;k++){ const done = await p.evaluate(()=>{ const r=document.querySelector('.ps-res'); if(r) return true;
        const opts=[...document.querySelectorAll('.ps-opt:not([disabled])')], inp=document.getElementById('psIn');
        const nx=document.getElementById('psNext'); if(nx){ nx.click(); return false; }
        return 'q'; });
      if(done===true) break;
      if(done==='q'){ const info = await p.evaluate(()=>window.__testRight?null:null); }
      await p.evaluate(()=>{ const o=document.querySelector('.ps-opt:not([disabled])'); if(o){ o.click(); return; } const i=document.getElementById('psIn'); if(i){ i.value='x'; document.getElementById('psCheck').click(); } });
      await p.waitForTimeout(80); await p.evaluate(()=>{ const nx=document.getElementById('psNext'); if(nx) nx.click(); }); await p.waitForTimeout(80); }
    await p.evaluate(()=>{ const q=[...document.querySelectorAll('[data-psquit]')][0]; if(q) q.click(); });
    // practice interview
    await p.evaluate(()=>{ window.__csSample = async () => ({text: JSON.stringify({good:'Clear structure and good verbs.',fixes:[{from:'I have 5 years working',to:'I have 5 years of experience',why:'years OF experience'}],better:"I'm a project manager with five years of experience in logistics.",phrases:["I'm responsible for",'As a result']})}); });
    await p.evaluate(()=>{ location.hash='#quiz/specific-purposes/practice-interview'; }); await p.waitForTimeout(600);
    await p.evaluate(()=>{ if(document.querySelector('[data-pp="intv"]').hidden) window.__csDeep.quiz.open(['specific-purposes','practice-interview']); }); await p.waitForTimeout(400);
    await p.evaluate(()=>{ document.querySelector('[data-intvs="0"]').click(); document.getElementById('intvTxt').value+= 'project manager with 5 years working in logistics.'; document.querySelector('[data-intv="check"]').click(); });
    await p.waitForTimeout(800); await clean();
    console.log(tag, 'intv:', await p.evaluate(()=>[!!document.querySelector('.intv-fix'), !!document.querySelector('.intv-better'), JSON.parse(localStorage.getItem('ncs-intv')||'{}').a ? Object.keys(JSON.parse(localStorage.getItem('ncs-intv')).a) : null]));
    await p.screenshot({path:`/tmp/esp-${tag}-intv.png`, fullPage:true});
    await ctx.close();
  }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
