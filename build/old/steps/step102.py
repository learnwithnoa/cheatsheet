# step102 (v2): Noa-only menu tabs on Home: "1:1 students" and "Hibi members" (the teacher pages, shown right inside Home)
_cap='<svg class="home-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.2c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2v-4.2"/><path d="M21.5 9.5v5"/></svg>'
_ppl='<svg class="home-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.3 2.8-5.2 5.5-5.2s4.9 1.9 5.5 5.2"/><circle cx="16.8" cy="9.5" r="2.6"/><path d="M15.6 14.4c2.6-.3 4.4 1.4 5 4.6"/></svg>'
R('''<button class="navbtn cn-nav coach-nav" data-go="coaching" id="navCoaching" hidden>''','''<button class="navbtn cn-nav t-tab" data-go="students" id="navStudents" hidden>'''+_cap+'''<span>1:1 students</span><span class="st-live" id="stLiveDot" hidden>LIVE</span></button>
      <button class="navbtn cn-nav t-tab" data-go="members" id="navMembers" hidden>'''+_ppl+'''<span>Hibi members</span></button>
      <button class="navbtn cn-nav coach-nav" data-go="coaching" id="navCoaching" hidden>''')
R('''<section class="view" id="v-coaching" hidden>''','''<section class="view t-view" id="v-students" hidden>
  <h1>1:1 <em>students</em></h1>
  <div class="t-frame" id="stFrame" data-src="private-students.html?embed=1#overview" data-ttl="Your private students"><p class="muted">Loading…</p></div>
</section>
<section class="view t-view" id="v-members" hidden>
  <h1>Hibi <em>members</em></h1>
  <div class="t-frame" id="mbFrame" data-src="members.html?embed=1" data-ttl="Hibi members"><p class="muted">Loading…</p></div>
</section>
<section class="view" id="v-coaching" hidden>''')
# only Noa sees the two tabs (not in View as). The old top icons (👥 🎓) and phone-only links are gone: the tabs replace them
R('''const t=!!window.__csTeacher && !window.__csPreview; ["navTeacher","navHub","mnavTeacher","mnavHub"].forEach(id=>{ const e=document.getElementById(id); if(e) e.hidden=!t; });''',
'''const t=!!window.__csTeacher && !window.__csPreview; ["navTeacher","navHub","mnavTeacher","mnavHub"].forEach(id=>{ const e=document.getElementById(id); if(e) e.hidden=true; });
    ["navStudents","navMembers"].forEach(id=>{ const e=document.getElementById(id); if(e) e.hidden=!(t&&!window.__csViewAsMode); });''')
R('''if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","park","coaching","club"].includes(id)) return;''','''if(["notes","classnotes","notebook","feedback","words","backup","changelog","quiz","park","coaching","club","students","members"].includes(id)) return;''')
R('''!["quiz","park","coaching","club"].includes(id));''','''!["quiz","park","coaching","club","students","members"].includes(id));''')
_css='''
/* step102: Noa's teacher tabs */
nav.side .navbtn[data-go="students"]{--nc:#5AB8FF;--nc2:#1C7ED6}
nav.side .navbtn[data-go="members"]{--nc:#FF7EB6;--nc2:#C2255C}
.t-tab[aria-current="true"][data-go="students"]{background:linear-gradient(180deg,#74C3FF 0%,#2B8AE0 55%,#1C6FBF 100%);color:#fff}
.t-tab[aria-current="true"][data-go="members"]{background:linear-gradient(180deg,#FF95C4 0%,#E0457F 55%,#B82362 100%);color:#fff}
.t-view>h1{margin-bottom:6px}
.t-frame iframe{display:block;width:100%;height:600px;border:0;background:transparent;overflow:hidden}
.t-view .rec-bar{display:none!important}
.st-live{margin-left:auto;font:800 10px var(--mono);letter-spacing:.06em;color:#fff;background:#E5484D;border-radius:999px;padding:2px 7px;animation:stp 1.6s ease-in-out infinite}
@keyframes stp{50%{opacity:.55}}
@media (prefers-reduced-motion:reduce){.st-live{animation:none}}
'''
_i=s.index('</style>'); s=s[:_i]+_css+s[_i:]
_js='''<script>
/* Noa's teacher tabs: each loads its page inside Home (quietly in the background too, so they open instantly and the menu can show LIVE) */
(function(){
  const ok=()=>window.__csTeacher===true&&!window.__csPreview&&!window.__csViewAsMode;
  const T={students:document.getElementById("stFrame"),members:document.getElementById("mbFrame")};
  const sec=k=>document.getElementById("v-"+k);
  function load(k,bg){ const box=T[k]; if(!box||box.dataset.on) return; const sc=sec(k); if(sc.hidden&&bg!==true) return;
    if(!ok()){ if(!sc.hidden&&window.__csTeacher===false&&window.csGo) window.csGo("notes"); return; }
    box.dataset.on="1"; box.innerHTML=`<iframe src="${box.dataset.src}" title="${box.dataset.ttl}" scrolling="no" allow="clipboard-write"></iframe>`; }
  ["students","members"].forEach(k=>{ const sc=sec(k); if(sc) new MutationObserver(()=>load(k)).observe(sc,{attributes:true,attributeFilter:["hidden"]}); });
  const bgAll=()=>{ if(window.__csTeacher===true){ load("students",true); setTimeout(()=>load("members",true),1500); } };
  document.addEventListener("cs-teacher",()=>setTimeout(bgAll,2500)); setTimeout(()=>{ load("students"); load("members"); },800); setTimeout(bgAll,3000);
  addEventListener("message",e=>{ if(e.origin!==location.origin||!e.data) return; const d=e.data;
    if(d.stLive!==undefined){ const x=document.getElementById("stLiveDot"); if(x) x.hidden=!d.stLive; }
    /* one scrollbar: the frame is as tall as its page */
    if(d.embH&&T[d.emb]){ const f=T[d.emb].querySelector("iframe"); if(f) f.style.height=d.embH+"px"; }
    /* a link to the other teacher page: switch tabs here */
    if(d.embGo&&T[d.embGo]){ openTab(d.embGo,d.hash||""); } });
  function openTab(k,hash){ const b=document.querySelector(`.navbtn[data-go="${k}"]`); if(b) b.click(); load(k); const f=T[k]&&T[k].querySelector("iframe");
    if(f&&hash){ try{ if(f.contentWindow.location.hash!==hash) f.contentWindow.location.hash=hash; }catch(er){ f.src=T[k].dataset.src.split("#")[0]+hash; } } }
  /* links on Home to the teacher pages (notifications…) open the tabs instead */
  document.addEventListener("click",e=>{ const a=e.target.closest('a[href^="private-students.html"],a[href^="members.html"]'); if(!a||!ok()||a.target==="_blank"||e.metaKey||e.ctrlKey) return;
    const h=a.getAttribute("href"), k=h.indexOf("members.html")===0?"members":"students"; e.preventDefault(); openTab(k,(h.split("#")[1]?"#"+h.split("#")[1]:"")); });
})();
</script>'''
_j=s.rfind('</body>'); s=(s[:_j]+_js+s[_j:]) if _j>=0 else (s+_js)
