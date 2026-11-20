# step80: tidy buddy-photo note; Club shows in the menu right away for people who were signed in last time
s = s.replace('.ap-note{color:var(--muted);font-size:12.5px;font-weight:500}', '.ap-note{color:var(--muted);font-size:12.5px;font-weight:500;line-height:1.35;margin:4px 0 0}', 1)
i = s.index('id="navClub" hidden>'); j = s.index('</button>', i) + len('</button>')
s = s[:j] + '''<script>try{var _w=localStorage.getItem("cs-club-nav");if(_w){var _b=document.getElementById("navClub");_b.hidden=false;if(_w==="2")_b.classList.add("locked");}}catch(e){}</script>''' + s[j:]
R('''b.hidden=!f&&!signed; b.classList.toggle("locked",!f);''','''b.hidden=!f&&!signed; b.classList.toggle("locked",!f); try{ if(f) localStorage.setItem("cs-club-nav","1"); else if(window.__csAuth===false) localStorage.removeItem("cs-club-nav"); }catch(e){}''')
# the club profile picks up a new name right away
R('''  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;''','''  document.addEventListener("cs-nick",()=>{ meDone=false; setTimeout(()=>ensureMe().catch(()=>{}),300); });
  async function ensureMe(){ if(meDone||G()||!me()||!F()) return; meDone=true;''')
css80 = '''
/* step80: change my name in the profile panel */
.auth-name{display:flex;flex-wrap:wrap;gap:4px 12px;margin:-2px 0 10px}
.auth-nform{display:grid;gap:6px;width:100%}
.auth-nform label{font-weight:800;font-size:14px}
.auth-nform input{font:inherit;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:inherit;width:100%;box-sizing:border-box}
.auth-nform small{color:var(--muted);font-size:12.5px}
.auth-nrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.auth-nsave{border:0;border-radius:999px;padding:6px 16px;font:800 14px var(--body);background:var(--accent,#5b8def);color:#fff;cursor:pointer}
.auth-nmsg{font-size:13px;color:var(--muted)}
'''
_i = s.index('</style>'); s = s[:_i] + css80 + s[_i:]
