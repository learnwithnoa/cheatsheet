// Redesign: the signed-out landing page in Tech Grunge (html.rd). node build/test/rdlp_t.js [fontsDir]  → /tmp/rdlp-*.png
const {chromium, devices} = require('playwright'); const fs = require('fs'); const path = require('path');
const stub = fs.readFileSync(path.join(__dirname, 'fbstub3.js'), 'utf8').replace(/cb\(U\)/g, 'cb(null)').replace('currentUser:U', 'currentUser:null');
const FD = process.argv[2] || '';
const fcss = () => { if (!FD) return ''; const f = (fam, pkg, w) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(https://fonts.gstatic.com/l/${pkg}/files/${pkg}-latin-${w}-normal.woff2)}`;
  return [300,400,500,600,700,800].map(w => f('Saira','saira',w)).concat([400,700].map(w => f('Space Mono','space-mono',w)), [400,500,600,700,800].map(w => f('Lexend','lexend',w))).join('\n'); };
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [tag, opt] of [['desktop', {viewport: {width: 1280, height: 900}}], ['phone', devices['iPhone 13']]]) for (const th of ['light', 'night']) {
    const ctx = await b.newContext(opt);
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/fonts\.googleapis\.com/, r => r.fulfill({body: fcss(), contentType: 'text/css'}));
    await ctx.route(/fonts\.gstatic\.com\/l\//, r => { const m = r.request().url().match(/\/l\/([^/]+)\/files\/(.+)$/); try { r.fulfill({body: fs.readFileSync(path.join(FD, 'node_modules/@fontsource', m[1], 'files', m[2])), contentType: 'font/woff2'}); } catch (e) { r.abort(); } });
    await ctx.route(/gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(tag + ': ' + e.message));
    await p.addInitScript(t => { localStorage.setItem('cs-rd', '1'); localStorage.setItem('cs-rd-theme', t); if (t === 'night') localStorage.setItem('ncs-theme', 'dark'); }, th);
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(3500);
    const H = await p.evaluate(() => { const l = document.getElementById('authGate') || document.scrollingElement; window.__sc = l; return l.scrollHeight; }); const vh = opt.viewport ? opt.viewport.height : 664;
    for (let i = 0, y = 0; y < H && i < 8; i++, y += vh) { await p.evaluate(y => { window.__sc.scrollTop = y; }, y); await p.waitForTimeout(250); await p.screenshot({path: `/tmp/rdlp-${tag}-${th}-${i}.png`}); }
    await ctx.close(); }
  console.log(errs.length ? errs : 'ok'); await b.close(); })();
