/* Teacher pages (Hibi members, Private students): the top-right buttons are Home's own
   (🎧 music, 🔔 notifications + messages, your photo → Profile / Settings), shown through
   index.html?tb=1. So they always look and work exactly like Home, with nothing to keep in sync. */
(function () {
  if (window.top !== window.self) return;
  const top = document.querySelector("header .top"); if (!top || document.querySelector(".tbx")) return;
  const st = document.createElement("style");
  st.textContent = [
    "#csWrap,#tmWrap,#outBtn,.music-wrap,.tb-bw{display:none!important}",
    ".tbx{position:relative;flex:none;width:150px;height:52px;margin:-8px 0}",
    /* the frame is always as wide as the page (so Home uses the same layout as here); this box only shows the part you need */
    ".tbx-c{position:absolute;top:0;right:0;overflow:hidden;width:100%;height:100%;z-index:90}",
    ".tbx.open .tbx-c{z-index:1000}",
    ".tbx-f{position:absolute;top:0;right:0;border:0;background:transparent;display:block}",
    ".tbx.full .tbx-c{position:fixed;inset:0;width:100vw!important;height:100vh!important;z-index:100000}",
    ".tbx.full .tbx-f{top:var(--tbt,0px);right:auto;left:0}"
  ].join("\n");
  document.head.appendChild(st);
  const ph = document.createElement("div"); ph.className = "tbx";
  ph.innerHTML = '<div class="tbx-c"><iframe class="tbx-f" src="index.html?tb=1" title="Music, notifications and your profile" allow="autoplay" scrolling="no"></iframe></div>';
  const f = ph.querySelector("iframe"), c = ph.querySelector(".tbx-c");
  const anchor = document.getElementById("csWrap") || document.getElementById("outBtn");
  if (anchor) anchor.insertAdjacentElement("beforebegin", ph); else top.appendChild(ph);
  let S = { open: false, full: false, w: 150, h: 52 };
  function size() {
    ph.style.width = Math.max(40, S.w) + "px"; ph.style.height = Math.max(40, S.h) + "px";
    const r = ph.getBoundingClientRect();
    f.style.width = Math.round(r.right) + "px"; f.style.height = Math.round(innerHeight - r.top) + "px";
    ph.style.setProperty("--tbt", Math.round(r.top) + "px");
    if (S.full) f.style.right = "auto";
    ph.classList.toggle("full", !!S.full); ph.classList.toggle("open", !!S.open);
    if (S.full) { c.style.width = ""; c.style.height = ""; f.style.left = "0px"; return; }
    f.style.left = "";
    c.style.width = S.open ? Math.round(r.right) + "px" : "100%";
    c.style.height = S.open ? Math.round(innerHeight - r.top) + "px" : "100%";
  }
  size();
  addEventListener("message", e => {
    if (e.origin !== location.origin || e.source !== f.contentWindow || !e.data || !e.data.tbx) return;
    S = e.data; if (S.cs) f.style.colorScheme = S.cs; size();
  });
  addEventListener("resize", size);
  /* a click anywhere on the page closes an open window, like on Home */
  document.addEventListener("pointerdown", e => { if (S.open && !S.full && !ph.contains(e.target)) try { f.contentWindow.postMessage({ tbClose: 1 }, location.origin); } catch (er) {} }, true);
})();
