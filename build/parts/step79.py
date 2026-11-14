# step79: sign-in screen puts "Continue with Google" first; Home has a clean URL (no #notes); Noa's bell refreshes by itself
# 1) the gate: students who already have access sign in first; the request form is for new people
R('''      <h2 id="agTitle">Hibi is for Noa’s students</h2>
      <p>Ask for access below. Noa will email you when you’re in, and then you sign in with Google.</p>
      <p class="ag-es" lang="es">Hibi es para los alumnos de Noa. Pide acceso aquí: Noa te escribirá cuando estés dentro.</p>
      ${reqForm("",false)}
      <div class="ag-or"><span>Already approved?</span></div>
      <button type="button" class="ag-btn" data-signin>${G}<span>Continue with Google</span></button>
      <p class="ag-msg" id="agMsg" role="alert" hidden></p>''','''      <h2 id="agTitle">Hibi is for Noa’s students</h2>
      <p><b>Already a student or club member?</b> Just sign in with the Google account Noa added.</p>
      <p class="ag-es" lang="es">¿Ya eres alumno o del club? Entra con tu cuenta de Google.</p>
      <button type="button" class="ag-btn" data-signin>${G}<span>Continue with Google</span></button>
      <p class="ag-msg" id="agMsg" role="alert" hidden></p>
      <details class="ag-new"><summary>New here? Ask Noa for access</summary>
      <p>Noa will email you when you’re in, and then you sign in with Google.</p>
      <p class="ag-es" lang="es">¿Eres nuevo? Pide acceso aquí: Noa te escribirá cuando estés dentro.</p>
      ${reqForm("",false)}</details>''')
R('''<label>I’m…<select name="who"><option value="club">In Noa’s English Club</option>''','''<label>I’m…<select name="who" required><option value="" disabled selected>Choose one</option><option value="club">In Noa’s English Club</option>''')
css79 = '''
/* step79 */
.ag-new{margin-top:14px;border-top:1px solid var(--line);padding-top:12px;text-align:left}
.ag-new>summary{cursor:pointer;font-weight:800;color:var(--accent,#5b8def);list-style:none;text-align:center;padding:4px 0}
.ag-new>summary::-webkit-details-marker{display:none}
.ag-new[open]>summary{margin-bottom:6px}
'''
_i = s.index('</style>'); s = s[:_i] + css79 + s[_i:]
# 2) Home without "#notes" in the address
R('''<a class="brand" href="#notes" data-go="notes"''','''<a class="brand" href="./" data-go="notes"''')
R('''if(location.hash!=="#notes") history.replaceState(null,"","#notes"); location.reload(); },true);''','''history.replaceState(null,"",location.pathname); location.reload(); },true);''')
R('''  if(push&&!fromPop){ try{ if(history.state&&history.state.cs&&history.state.v===id) history.replaceState(history.state,"","#"+id); else if(goingBack) history.replaceState({cs:1,v:id,n:histN},"","#"+id); else history.pushState({cs:1,v:id,n:++histN},"","#"+id);}catch(e){} }''','''  if(push&&!fromPop){ const U=id==="notes"?location.pathname+location.search:"#"+id; try{ if(history.state&&history.state.cs&&history.state.v===id) history.replaceState(history.state,"",U); else if(goingBack) history.replaceState({cs:1,v:id,n:histN},"",U); else history.pushState({cs:1,v:id,n:++histN},"",U);}catch(e){} }''')
R('''try{ history.replaceState({cs:1,v:curView,n:0},"","#"+curView); }catch(e){}''','''try{ history.replaceState({cs:1,v:curView,n:0},"",curView==="notes"?location.pathname+location.search:"#"+curView); }catch(e){}''')
# 3) Noa's bell: refresh every 10 minutes while the page is open, and when he opens it if it's a few minutes old
R('''  async function load(){
    const b0=document.getElementById("tNotif");''','''  let lastLoad=0;
  setInterval(()=>{ if(!document.hidden&&window.__csTeacher&&Date.now()-lastLoad>600000) load(); },60000);
  async function load(){ lastLoad=Date.now();
    const b0=document.getElementById("tNotif");''')
R('''    if(k==="open"){ open=!open; }''','''    if(k==="open"){ open=!open; if(open&&Date.now()-lastLoad>180000) setTimeout(load,0); }''')
s = s.replace('.ag-new[open]>summary{margin-bottom:6px}', '.ag-new[open]>summary{margin-bottom:6px}\n.ap-note{color:var(--muted);font-size:12.5px;font-weight:500}', 1)
R('<script src="buddy.js?v=50" defer></script>','<script src="buddy.js?v=51" defer></script>')
