const {chromium, devices} = require('playwright'); const fs = require('fs');
const stub = fs.readFileSync(__dirname+'/fbstub3.js','utf8');
const CSS = `
.dz{padding:16px 18px}
.dz-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
.dz-top h2{margin:0;font-size:20px}
.dz-top a{font:700 13px var(--body);color:var(--c2);text-decoration:none;white-space:nowrap}
.dz-row{padding:10px 0;border-top:1px dashed var(--line)}
.dz-row:first-of-type{border-top:none}
.dz-t{font-size:15px;line-height:1.35}
.dz-t small{color:var(--muted)}
.dz-btns{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.dz-btns button{all:unset;cursor:pointer;font:800 13.5px var(--body);padding:6px 14px;border-radius:999px;border:1.5px solid var(--line)}
.dz-btns .go{background:var(--green,#22a35a);border-color:transparent;color:#fff}
.dz-bars{display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;align-items:center;margin-top:8px;font-size:14px}
.dz-bar{height:8px;border-radius:99px;background:color-mix(in srgb,var(--muted) 18%,transparent);overflow:hidden}
.dz-bar i{display:block;height:100%;border-radius:99px;background:var(--c2)}
.dz-bar.me i{background:var(--green,#22a35a)}
.dz-bars b{font-variant-numeric:tabular-nums}
.dz-msg{font:700 13.5px var(--body);color:var(--green,#22a35a);margin-top:6px}
.dz-wait{color:var(--muted);font-size:14.5px}`;
const HTML = `<section class="card dz" id="dzMock"><div class="dz-top"><h2>⚔️ Your duels</h2><a href="#">Buddy park →</a></div>
 <div class="dz-row"><div class="dz-t"><b>Laura</b> challenged you to a <b>🃏 Flashcard duel</b> <small>· 7 days, who learns more words</small></div>
   <div class="dz-btns"><button class="go">⚔️ Accept</button><button>No thanks</button></div></div>
 <div class="dz-row"><div class="dz-t"><b>🧠 Grammar duel</b> with Pedro <small>· 3 days left</small></div>
   <div class="dz-bars"><span>You</span><span class="dz-bar me"><i style="width:60%"></i></span><b>6</b><span>Pedro</span><span class="dz-bar"><i style="width:40%"></i></span><b>4</b></div>
   <div class="dz-msg">You're ahead by 2 💪</div></div>
 <div class="dz-row dz-wait">⏳ Waiting for <b>Fabrizio</b> to accept your 🏁 First to 15</div></section>`;
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [t,o,cs] of [['d',{viewport:{width:1280,height:900}},'dark'],['p',devices['iPhone 13'],'dark'],['pl',devices['iPhone 13'],'light']]) {
    const ctx = await b.newContext({...o, colorScheme: cs});
    await ctx.route(/fb\.js/, r => r.fulfill({body: stub, contentType: 'text/javascript'}));
    await ctx.route(/googleapis|gstatic|firebaseapp|google\.com|ytimg|workers\.dev/, r => r.abort());
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(t+': '+e.message));
    await p.addInitScript(() => { localStorage.setItem('ncs-welcomed','1'); });
    await p.goto('http://localhost:8768/index.html'); await p.waitForTimeout(2500);
    await p.evaluate(([css,html]) => { document.querySelectorAll('.qa-backdrop,.wl-backdrop,.wn-backdrop,#whatsnew,.cs-dlg,.cs-dlg-bd').forEach(x=>x.remove()); document.body.style.overflow='';
      const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
      const anchor=document.querySelector('#v-notes .hm-lede'); const x=document.createElement('div'); x.innerHTML=html; const el=x.firstElementChild;
      (anchor.nextElementSibling&&anchor.nextElementSibling.classList.contains('lede-es')?anchor.nextElementSibling:anchor).insertAdjacentElement('afterend',el); el.scrollIntoView({block:'start'}); window.scrollBy(0,-90); }, [CSS,HTML]);
    await p.waitForTimeout(300);
    await p.screenshot({path:`/tmp/dz-${t}.png`});
    await ctx.close(); }
  console.log(errs.length ? errs : 'no errors'); await b.close(); })();
