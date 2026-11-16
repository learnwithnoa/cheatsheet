// Teacher pages test (local only): fake Noa sign-in + sample students
const {chromium, devices} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const d = n => { const x = new Date(Date.now() + n*864e5); return x.toISOString().slice(0,10); };
const stu = (id, name, classes) => ({ id, name, status: 'active', classes, packs: [], payments: [], words: [], other: [] });
const S = [stu('ana','Ana Pérez',[{id:'c1',date:d(-1),topics:'fabulang: mouse story',homework:'read ch. 2',att:'Present'},{id:'c2',date:d(-8),topics:'past simple',att:'Present'}]),
  stu('beto','Beto Soto',[{id:'c3',date:d(0),topics:'job interview prep',att:'Present'}]), stu('cami','Cami Rojas',[{id:'c4',date:d(-3),topics:'phrasal verbs',att:'Absent'}]), stu('dora','Dora Old',[{id:'c5',date:d(-40),topics:'old class',att:'Present'}])];
const meta = { upcoming: [{ start: new Date(Date.now()-2*3600e3).toISOString(), student: 'cami', name: 'Cami Rojas' }, { start: new Date(Date.now()+3*3600e3).toISOString(), student: 'ana', name: 'Ana Pérez', note: 'review past simple' }, { start: new Date(Date.now()+5*3600e3).toISOString(), student: 'beto', name: 'Beto Soto' }] };
const cloud = {}; S.forEach(s => cloud['users/u1/data/t-hub-'+s.id] = { json: JSON.stringify(s), deleted: false }); cloud['users/u1/data/t-hubmeta'] = { json: JSON.stringify(meta), deleted: false };
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t, o] of [['d', {viewport:{width:1280,height:900}}], ['p', devices['iPhone 13']]]) {
    const ctx = await b.newContext(o);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|exchangerate|open\.er-api/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(c => { sessionStorage.setItem('__cloud', JSON.stringify(c)); localStorage.setItem('cs-theme','light'); }, cloud);
    await p.goto('http://localhost:8768/private-students.html#overview'); await p.waitForTimeout(2500);
    console.log(t, await p.evaluate(() => ({ recent: !document.getElementById('recentBox').hidden, recentN: document.querySelectorAll('#recentBox li').length, imp: getComputedStyle(document.getElementById('impBtn')).display, nextClickable: document.querySelectorAll('#nextBox li[data-open]').length, recentTxt: document.getElementById('recentBox').innerText.replace(/\n+/g,' | ').slice(0,200), summary: document.getElementById('summary').textContent, filters: document.getElementById('filters').innerText.replace(/\n/g,' ') })));
    await p.screenshot({path:`/tmp/teach-${t}-ov.png`, fullPage: t==='d'});
    await p.click('#nextBox li[data-open]'); await p.waitForTimeout(800);
    console.log(t, 'detail:', await p.evaluate(() => ({ hash: location.hash, tab: (document.querySelector('.tabs [aria-pressed="true"]')||{}).textContent, pill: (document.querySelector('.eng-pill')||{}).textContent || null, rec: !!document.querySelector('[data-act="recOpen"]') })));
    await p.screenshot({path:`/tmp/teach-${t}-detail.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
