# 52) colour on the top-bar buttons (+ Word green, Music rainbow, timer tomato), bionic spans never become blocks
css52 = '''
/* + Word: green, like every "add" on Hibi */
#hdrWord{border-color:color-mix(in srgb,var(--green) 60%,var(--line));background:color-mix(in srgb,var(--green) 14%,var(--surface));color:var(--green)}
#hdrWord:hover{background:color-mix(in srgb,var(--green) 24%,var(--surface))}
/* Music: normal pill, three bars in blues */
#musicBtn .eq i:nth-child(1){background:#7CC4FF}#musicBtn .eq i:nth-child(2){background:#2F8CF0}#musicBtn .eq i:nth-child(3){background:#1D4ED8}
html.dark #musicBtn .eq i:nth-child(3),[data-theme="dark"] #musicBtn .eq i:nth-child(3){background:#4F7BFF}
/* Study timer: normal pill, warm orange clock */
#tmBtn .tm-ico{stroke:#F08A24!important;color:#F08A24}
/* bionic reading wraps words in spans: they must stay inline everywhere */
span.bw{display:inline!important}
/* gradient titles (Hibi logo, page titles): lighter blues on dark themes so they read well */
:root{--gloss-text:var(--gloss)}
:root[data-theme="dark"],:root[data-theme="midnight"]{--gloss-text:linear-gradient(180deg,#8CC8FF 0%,#4A9DF2 50%,#5D7EF2 100%)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="unicorn"]):not([data-theme="sepia"]):not([data-theme="midnight"]){--gloss-text:linear-gradient(180deg,#8CC8FF 0%,#4A9DF2 50%,#5D7EF2 100%)}}
.brand span,.view h1 em,.welcome h2 em,.quiz-verb{background:var(--gloss-text);-webkit-background-clip:text;background-clip:text}
/* wrong examples: easier to read (thin, soft strike line) */
.no,#misBody td.no{text-decoration-thickness:1px!important;text-decoration-color:color-mix(in srgb,var(--red) 55%,transparent)!important;font-weight:700}
/* Profile pill: no dot, no empty space, a thicker status border (green saved, yellow saving, red not connected) */
.auth-btn .dot{display:none!important}#authTxt{min-width:0!important}
.top-in .auth-btn{border-width:2.5px!important;border-style:solid!important;padding-right:14px!important}
.auth-btn.st-ok{border-color:var(--green)!important}
/* top bar order: + Word · Music · Timer | Messages · Profile · Settings */
.top-in>#clBellWrap,.top-in>#dmTopBtn{order:5}.top-in>.auth-wrap{order:6}.top-in>#csWrap{order:10}
@media (max-width:480px){#authTxt{display:none!important}.top-in .auth-btn{padding-inline:9px}}
'''
_i = s.index('</style>'); s = s[:_i] + css52 + s[_i:]
# phones: compact top bar so every button fits on one line, and the menu strip sits flush under it
css52b = '''
@media (max-width:900px){nav.side{top:calc(var(--hdr-h,61px) + var(--va-h,0px) - 1px)!important}}
@media (min-width:901px){nav.side{top:calc(env(safe-area-inset-top,0px) + 78px + var(--va-h,0px))!important}}
/* "Viewing as" banner: stays on top, the header and menu stack right under it */
.top{top:calc(env(safe-area-inset-top,0px) + var(--va-h,0px))!important}
.va-banner{top:env(safe-area-inset-top,0px)!important}
@media (max-width:600px){.va-pop{left:12px!important;right:12px!important;width:auto!important}}
/* Noa's notifications bell on Home: its own row on phones instead of floating over the title */
@media (max-width:900px){.tn-wrap{position:relative!important;top:auto!important;right:auto!important;margin:0 0 10px auto;width:fit-content}.tn-wrap .tn-box{width:min(480px,calc(100vw - 32px))}}
@media (max-width:600px){.va-banner{font-size:12.5px;padding:6px 10px;gap:6px;line-height:1.3}.va-banner button{padding:3px 10px}}
@media (max-width:480px){
  .top-in{gap:3px!important;padding-left:12px!important;padding-right:12px!important}
  .top-in>.spacer{flex:1 1 0;min-width:0}
  .brand .kj{display:none}.brand span{font-size:21px}
  #hdrWord{display:none!important}
  .top-in #dmTopBtn{height:33px;min-width:33px;padding:0 8px!important;box-sizing:border-box;justify-content:center;border-width:1.5px}
  .top-in .theme-btn,.top-in .cs-btn,.top-in .search-toggle,.top-in .t-ico{height:33px;min-width:33px;width:auto;padding:0 7px!important;justify-content:center;flex:none}
  .top-in .search-toggle{width:33px;padding:0!important}
  .top-in .auth-btn{gap:4px;padding:0 6px!important}
  .clb-n{top:-6px;right:-6px;min-width:16px;height:16px;font-size:10px;line-height:16px}
}
'''
_i = s.index('</style>'); s = s[:_i] + css52b + s[_i:]
js52b = '''<script>(function(){ var t=document.querySelector("header.top"); if(!t) return; function f(){ document.documentElement.style.setProperty("--hdr-h", Math.round(t.getBoundingClientRect().height)+"px"); } f(); try{ new ResizeObserver(f).observe(t); }catch(e){ addEventListener("resize",f); }
  var ro=null, cur=null; function va(){ var b=document.getElementById("vaBanner"); if(b===cur) return; cur=b; if(ro){ ro.disconnect(); ro=null; }
    if(!b){ document.documentElement.style.setProperty("--va-h","0px"); return; }
    var g=function(){ document.documentElement.style.setProperty("--va-h", Math.round(b.getBoundingClientRect().height)+"px"); }; g(); try{ ro=new ResizeObserver(g); ro.observe(b); }catch(e){} }
  new MutationObserver(va).observe(document.body||document.documentElement,{childList:true}); va(); })();</script>
'''
_i = s.index('</header>') + len('</header>'); s = s[:_i] + js52b + s[_i:]
