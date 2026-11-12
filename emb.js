/* Teacher pages shown inside Home's menu tabs (index.html → "1:1 students", "Hibi members").
   ?embed=1 inside Home: no page header, no inner scrollbar (Home grows the frame to fit), pop-ups and toasts
   appear where Noa is looking, and links to the other teacher page switch Home's tab instead of leaving. */
(function () {
  if (!/[?&]embed=1/.test(location.search) || window.top === window.self) return;
  const P = window.parent, FR = window.frameElement, root = document.documentElement;
  root.classList.add("emb"); window.__psEmbed = true;
  const ID = /members\.html/.test(location.pathname) ? "members" : "students";
  const st = document.createElement("style");
  st.textContent = [
    "html.emb,html.emb body{background:transparent!important;min-height:0!important;height:auto!important;overflow:hidden!important}",
    "html.emb header{position:fixed;top:6px;right:10px;left:auto;background:none!important;border:0!important;box-shadow:none!important;z-index:60;pointer-events:none}",
    "html.emb header .top>*:not(#saving){display:none!important}",
    "html.emb main{max-width:none!important;margin:0!important;padding:0 0 32px!important}",
    "html.emb #vMain>h1,html.emb .dh h1.hubt{display:none!important}",
    "html.emb .dh{justify-content:flex-end}",
    "html.emb footer,html.emb .site-foot,html.emb .foot{display:none!important}",
    /* pop-ups: in the part of the frame Noa can see (the frame itself is as tall as the page) */
    "html.emb .modal,html.emb .csc-bd{position:absolute!important;inset:auto!important;left:0!important;right:0!important;top:var(--vt,0px)!important;height:var(--vh,100vh)!important}",
    "html.emb .toast{position:absolute!important;bottom:auto!important;top:calc(var(--vt,0px) + var(--vh,100vh) - 76px)!important}"
  ].join("\n");
  (document.head || root).appendChild(st);
  /* the visible part of this frame, for pop-ups */
  function vis() { try { const r = FR.getBoundingClientRect(), top = Math.max(0, -r.top), bot = Math.min(r.height, P.innerHeight - r.top);
    root.style.setProperty("--vt", Math.round(top) + "px"); root.style.setProperty("--vh", Math.max(200, Math.round(bot - top)) + "px"); } catch (e) {} }
  P.addEventListener("scroll", vis, { passive: true }); P.addEventListener("resize", vis); vis();
  /* tell Home how tall the page is, so the frame grows with it (one scrollbar: Home's) */
  let lastH = 0;
  function report() { const m = document.querySelector("main"); const h = Math.ceil(Math.max(m ? m.getBoundingClientRect().bottom + 8 : 0, 400));
    if (Math.abs(h - lastH) < 2) return; lastH = h; try { P.postMessage({ embH: h, emb: ID }, location.origin); } catch (e) {} vis(); }
  const go = () => { try { new ResizeObserver(report).observe(document.body); } catch (e) {} new MutationObserver(() => requestAnimationFrame(report)).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "open", "class"] }); report(); };
  if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
  addEventListener("load", report); setInterval(report, 1500);
  /* "scroll to the top" inside the page scrolls Home instead */
  const toY = y => { try { const r = FR.getBoundingClientRect(); P.scrollTo({ top: Math.max(0, P.scrollY + r.top + (y || 0) - 90) }); } catch (e) {} };
  window.scrollTo = function (a, b) { toY(typeof a === "object" && a ? a.top : b); };
  window.scroll = window.scrollTo;
  /* links: the other teacher page → Home's other tab; anything else outside this page → the whole window */
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]"); if (!a || a.target === "_blank") return; const href = a.getAttribute("href") || "";
    if (href.charAt(0) === "#" || /^(mailto|tel|javascript):/.test(href)) return;
    const m = href.match(/^(?:\.\/)?(members|private-students)\.html(#.*)?$/);
    if (m) { e.preventDefault(); try { P.postMessage({ embGo: m[1] === "members" ? "members" : "students", hash: m[2] || "" }, location.origin); } catch (er) {} return; }
    a.target = "_top";
  }, true);
})();
