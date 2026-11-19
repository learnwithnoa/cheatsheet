// Members page loads (Hibi only option, tips, club archive) without errors
const {chromium} = require('playwright'); const fs = require('fs');
const page = fs.readFileSync(__dirname+'/../../private-students.html','utf8');
const T = (page.match(/const TEACHER = "([^"]+)"/)||[])[1];
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8').replace('tester@example.com', T);
const meta = { ideas: [
 {id:'i1',key:'phrasalwork',kind:'words',title:'Phrasal verbs for meetings',why:'Keeps saying "postpone" for everything',examples:['we can move it'],students:['Ana'],count:2,first:'2026-11-17',last:'2026-11-18',status:'new'},
 {id:'i2',key:'modals',kind:'grammar',title:'Must vs have to',why:'Mixes them up',count:3,first:'2026-11-10',last:'2026-11-15',status:'yes',asked:'2026-11-18'},
 {id:'i3',key:'talkingaboutthefuture',kind:'grammar',title:'Talking about the future: will, going to, present continuous',count:2,status:'done',built:'2026-11-18',link:'https://hibi.cl/#quiz/grammar/talking-about-the-future',builtNote:'6 stages + Advanced, lesson, test out'},
 {id:'i4',key:'confusingwordpairs',kind:'words',title:'Confusing word pairs',count:3,status:'done',built:'2026-11-18',link:'https://hibi.cl/#quiz/word-packs'}] };
const cloud = {}; cloud['users/u1/data/t-hubmeta'] = { json: JSON.stringify(meta), deleted: false };
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,dark] of [['d',{viewport:{width:1280,height:900}},0],['p',require('playwright').devices['iPhone 13'],1]]) {
  const ctx = await b.newContext({...o, colorScheme: dark?'dark':'light'});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
  const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(c => { sessionStorage.setItem('__cloud', JSON.stringify(c)); }, cloud);
  await p.goto('http://localhost:8768/members.html'); await p.waitForTimeout(2500);
  await p.evaluate(() => { const b=document.querySelector('[data-mtab="ideas"]'); b&&b.click(); }); await p.waitForTimeout(300);
  console.log(t, await p.evaluate(() => document.getElementById('ideas').innerText.replace(/\s+/g,' ').slice(0,700)));
  await p.screenshot({path:`/tmp/ideas-${t}.png`, fullPage:true});
  await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
