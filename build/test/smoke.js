// Smoke test: loads Hibi with a fake sign-in (no real data), opens a few pages on desktop and phone, reports page errors.
// Run:  node build/test/smoke.js   (after starting build/test/srv.py). Playwright + Chromium are preinstalled in Claude's workspace.
// Copy this file to test a change: open the page, click things, check the DOM, take screenshots.
const {chromium, devices} = require('playwright'); const fs = require('fs'); const path = require('path');
const stub = fs.readFileSync(path.join(__dirname, 'fbstub3.js'), 'utf8');
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [tag, opt] of [['desktop', {viewport: {width: 1280, height: 900}}], ['phone', devices['iPhone 13']]]) {
    const ctx = await b.newContext(opt);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));     // fake sign-in
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());         // never touch real data
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(tag + ': ' + e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed', '1'); localStorage.setItem('ncs-sync-uid', 'u1'); localStorage.setItem('ncs-seen-version', '"x"'); });
    for (const page of ['notes', 'words', 'practice', 'club']) {
      await p.goto('http://localhost:8768/index.html#' + page); await p.waitForTimeout(2500);
      await p.evaluate(() => document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew').forEach(e => e.remove()));   // close What's new
      await p.screenshot({path: `/tmp/smoke-${tag}-${page}.png`});
    }
    await ctx.close();
  }
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'ok: no page errors (screenshots in /tmp/smoke-*.png)'); await b.close();
})();
