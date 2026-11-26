// Redesign (Tech Grunge, html.rd) check: Home + My coaching + a few pages, light / night / unicorn, simple mode, desktop + phone.
// Run: node build/test/rd_t.js [fontsDir]   (after starting build/test/srv.py). Screenshots in /tmp/rd-*.png
// Optional fontsDir = a folder with @fontsource packages so screenshots show the real fonts (Google Fonts is blocked in tests).
const {chromium, devices} = require('playwright'); const fs = require('fs'); const path = require('path');
const stub = fs.readFileSync(path.join(__dirname, 'fbstub3.js'), 'utf8');
const FD = process.argv[2] || '';
const fcss = () => { if (!FD) return '';
  const f = (fam, pkg, w) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(https://fonts.gstatic.com/l/${pkg}/files/${pkg}-latin-${w}-normal.woff2)}`;
  return [300,400,500,600,700,800].map(w => f('Saira','saira',w)).concat([400,700].map(w => f('Space Mono','space-mono',w)), [400,500,600,700,800].map(w => f('Lexend','lexend',w))).join('\n'); };
(async () => {
  const b = await chromium.launch(); const errs = [];
  const only = process.env.RD_ONLY || '';
  for (const [tag, opt] of [['desktop', {viewport: {width: 1280, height: 900}}], ['phone', devices['iPhone 13']]]) {
    for (const th of ['light', 'night', 'unicorn', 'simple']) {
      if (only && !only.split(',').includes(th)) continue;
      const ctx = await b.newContext(opt);
      await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
      await ctx.route(/fonts\.googleapis\.com/, r => r.fulfill({body: fcss(), contentType: 'text/css'}));
      await ctx.route(/fonts\.gstatic\.com\/l\//, r => { const m = r.request().url().match(/\/l\/([^/]+)\/files\/(.+)$/); try { r.fulfill({body: fs.readFileSync(path.join(FD, 'node_modules/@fontsource', m[1], 'files', m[2])), contentType: 'font/woff2'}); } catch (e) { r.abort(); } });
      await ctx.route(/gstatic|firebaseapp|google\.com|ytimg/, r => r.abort());
      const p = await ctx.newPage(); p.on('pageerror', e => errs.push(tag + '/' + th + ': ' + e.message));
      await p.addInitScript(t => { localStorage.setItem('ncs-welcomed', '1'); localStorage.setItem('ncs-sync-uid', 'u1'); localStorage.setItem('ncs-seen-version', '"x"');
        localStorage.setItem('cs-rd', '1'); localStorage.setItem('cs-rd-theme', t === 'simple' ? 'light' : t); localStorage.setItem('ncs-theme', t === 'night' ? 'dark' : 'light');
        if (t === 'unicorn') localStorage.setItem('ncs-pop', '"fuchsia"'); if (t === 'simple') localStorage.setItem('ncs-simple', JSON.stringify({on: true, by: 'me', asked: 1})); }, th);
      for (const page of ['notes', 'sample', 'samplehome', 'words', 'quiz', 'tenses']) {
        await p.goto(page.startsWith('sample') ? 'http://localhost:8768/index.html?guest=hb7k2q&as=private' + (page === 'sample' ? '#coaching' : '#notes') : 'http://localhost:8768/index.html#' + page); await p.waitForTimeout(2200);
        await p.evaluate(() => { document.querySelectorAll('#wnBackdrop,.wl-backdrop,#whatsnew').forEach(e => e.remove());
          if (!window.__csHubView && !/guest/.test(location.search)) window.__csHubView = {name: 'Sofía Test', next: new Date(Date.now() + 26 * 3600e3).toISOString(), nextZoom: 'https://example.com/zoom', classes: []};
          if (window.__csRdPaint) window.__csRdPaint(); });
        await p.waitForTimeout(300);
        const rd = await p.evaluate(() => document.documentElement.classList.contains('rd'));
        if (!rd) errs.push(tag + '/' + th + ': html.rd missing');
        await p.screenshot({path: `/tmp/rd-${tag}-${th}-${page}.png`, fullPage: page === 'notes' || page.startsWith('sample')});
      }
      await ctx.close();
    }
  }
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'ok: no page errors (screenshots in /tmp/rd-*.png)'); await b.close();
})();
