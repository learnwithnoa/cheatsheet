// Mac Safari sign-in: the Google window is opened on the click and reused when Firebase asks for it (after a delay)
const {chromium} = require('playwright'); const fs = require('fs');
let stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8')
  .replace('signInWithPopup=async()=>({user:U})','signInWithPopup=async()=>{ await new Promise(r=>setTimeout(r,1500)); const w=window.open("http://localhost:8768/favicon.svg","x","popup"); window.__gotSame=(w===window.__pre); if(!w) { const e=new Error("blocked"); e.code="auth/popup-blocked"; throw e; } return {user:U}; }')
  .replace(/onAuthStateChanged=\(a,cb\)=>\{setTimeout\(\(\)=>cb\(U\),50\);/,'onAuthStateChanged=(a,cb)=>{setTimeout(()=>cb(null),50);');
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({viewport:{width:1280,height:900}, userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15'});
  await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
  await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
  const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
  let popups=0; ctx.on('page', ()=>popups++);
  await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); const o=window.open; window.open=function(){ const w=o.apply(window,arguments); if(!window.__pre) window.__pre=w; return w; }; });
  await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(4000);
  const has = await p.evaluate(()=>!!document.querySelector('[data-signin]')); console.log('signin button:', has);
  await p.locator('[data-signin]:visible').first().click(); await p.waitForTimeout(2500);
  console.log('popups opened:', popups, 'same window reused:', await p.evaluate(()=>window.__gotSame));
  console.log(errs.length?errs:'no errors'); await b.close(); })();
