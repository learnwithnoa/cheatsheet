# step56: pets as default photos (+ initials option), park retry, teacher notifications in the top bar,
# music button icon, no "Profile" word, scrollable profile panel, rainbow music bars in unicorn
R('''        if(list){ PARK=list; } else { full.then(l=>{ PARK=l||[]; fill(PARK); parkRepaint(); }).catch(()=>{ PARK=[]; }); parkP=null; return []; }
      }catch(e){ PARK=[]; }''','''        if(list){ PARK=list; } else { full.then(l=>{ PARK=l||[]; fill(PARK); parkRepaint(); }).catch(()=>{ PARK=null; setTimeout(parkLate,20000); }); parkP=null; return []; }
      }catch(e){ PARK=null; parkP=null; setTimeout(parkLate,20000); return []; }''')
# avatars: Google photos saved before people could choose count as "not chosen" -> show their pet; "none" -> initials
R('''if(!PARKMAP[uid]&&window.csBuddy&&window.csBuddy.portrait){''','''if(!PARKMAP[uid]&&window.csBuddy&&window.csBuddy.portrait&&!(window.csMyPhotoKind&&window.csMyPhotoKind()==="none")){''')
R('''    const pp=PROFS&&profOf(uid); if(pp&&pp.photo&&/^(data:image\\/|https:\\/\\/)/.test(pp.photo)) return''','''    const pp=PROFS&&profOf(uid), noPet=(pp&&pp.pk==="none")||(uid===me()&&window.csMyPhotoKind&&window.csMyPhotoKind()==="none"); if(pp&&pp.photo&&/^(data:image\\/|https:\\/\\/)/.test(pp.photo)&&!(!pp.pk&&/googleusercontent\\.com/.test(pp.photo))) return''')
R('''const bd=PARKMAP[uid]; if(bd&&window.csBuddy&&window.csBuddy.of){''','''const bd=!noPet&&PARKMAP[uid]; if(bd&&window.csBuddy&&window.csBuddy.of){''')
R('''watched:cur.watched||[],photo:cur.photo||""};''','''watched:cur.watched||[],photo:cur.photo||"",pk:cur.pk||""};''')
R('''await saveMe({photo:(e.detail&&e.detail.photo)||""});''','''await saveMe({photo:(e.detail&&e.detail.photo)||"",pk:(e.detail&&e.detail.k)||"buddy"});''')
R('''      if(!cur||cur.name!==F().name()||posts>(cur.posts|0)||(cur.photo||"")!==ph) await saveMe(Object.assign(posts>((cur&&cur.posts)|0)?{posts}:{},{photo:ph}));''','''      const pk=window.csMyPhotoKind?window.csMyPhotoKind():"buddy";
      if(!cur||cur.name!==F().name()||posts>(cur.posts|0)||(cur.photo||"")!==ph||(cur.pk||"")!==pk) await saveMe(Object.assign(posts>((cur&&cur.posts)|0)?{posts}:{},{photo:ph,pk}));''')
# photo choice: buddy is the default; new "no photo" (initials)
# teacher notifications: in the top bar on every page, not only on Home
R('''  function box(){ let b=document.getElementById("tNotif"); if(!b){ const v=document.getElementById("v-notes"); if(!v) return null; b=document.createElement("div"); b.id="tNotif"; b.className="tn-wrap"; v.insertBefore(b,v.firstChild); } return b; }''','''  function box(){ let b=document.getElementById("tNotif"); if(!b){ const aw=document.querySelector(".top-in .auth-wrap"); if(!aw) return null; b=document.createElement("div"); b.id="tNotif"; b.className="tn-wrap"; aw.parentNode.insertBefore(b,aw); } return b; }''')
# music button: headphones until you first press play, then the bars (moving when playing, still when paused)
R('''<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="theme-txt">Music</span></button>''','''<span class="mu-ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.6"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.6"/></svg></span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr-only">Study music</span></button>''')
R('''  async function play(){
    if(window.csUnlockAudio) window.csUnlockAudio(true);''','''  async function play(){
    btn.classList.add("used"); try{ sessionStorage.setItem("cs-music-used","1"); }catch(e){}
    if(window.csUnlockAudio) window.csUnlockAudio(true);''')
R('''  playB.addEventListener("click",()=> playing?pause():play());''','''  playB.addEventListener("click",()=> playing?pause():play());
  try{ if(sessionStorage.getItem("cs-music-used")) btn.classList.add("used"); }catch(e){}
  btn.title="Study music";''')
css56 = '''
/* step56 */
.sr-only{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#musicBtn .mu-ico{display:inline-flex;color:#2F8CF0}
#musicBtn .eq{display:none}
#musicBtn.used .mu-ico{display:none}
#musicBtn.used .eq{display:inline-flex}
#musicBtn{padding-inline:11px}
html[data-theme="unicorn"] #musicBtn .eq i:nth-child(1){background:#FF5FA2}
html[data-theme="unicorn"] #musicBtn .eq i:nth-child(2){background:#FFC93C}
html[data-theme="unicorn"] #musicBtn .eq i:nth-child(3){background:#46D3A0}
html[data-theme="unicorn"] #musicBtn .mu-ico{color:#B86BFF}
html.cs-signed #authTxt{display:none}
html.cs-signed #authBtn{padding-inline:6px}
.auth-panel{max-height:calc(100dvh - var(--hdr-h,61px) - var(--va-h,0px) - 24px);overflow-y:auto;overscroll-behavior:contain}
.top-in>#tNotif{order:5;position:relative!important;top:auto!important;right:auto!important;margin:0!important;width:auto;display:flex;align-items:center}
.top-in>#tNotif .tn-bell{padding:6px 11px;font-size:14px}
.top-in>#tNotif .tn-box{position:absolute;top:calc(100% + 10px);right:0;z-index:45;width:min(480px,calc(100vw - 32px));max-height:calc(100dvh - var(--hdr-h,61px) - var(--va-h,0px) - 24px);overflow:auto;margin:0;box-shadow:0 18px 44px rgba(5,15,30,.35);background:var(--surface)}
@media (max-width:700px){.top-in>#tNotif .tn-box{position:fixed;left:16px;right:16px;width:auto;top:calc(var(--hdr-h,61px) + var(--va-h,0px) + 6px)}}
'''
_i = s.index('</style>'); s = s[:_i] + css56 + s[_i:]
R('''  {id:"2026-1111", date:"November 11, 2026", title:"Small things, smoother", items:[''','''  {id:"2026-1111", date:"November 11, 2026", title:"Small things, smoother", items:[
    ["🐾","Your buddy is your photo","in the club, everyone’s photo is now their buddy, unless they pick something else. Change it in your profile: your Google photo, your own photo, your buddy, or just your initials."],
    ["🎧","A tidier top bar","the music button is now just an icon: 🎧 until you play something, then the little bars. Your profile shows just your photo."],''')
