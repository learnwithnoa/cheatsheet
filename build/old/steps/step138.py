# step138 (Nov 15 2026): free 2-week club trial, no card (like the old "Reto 14 Días").
# - Club card for non-members: "🎁 Try it free for 2 weeks" (one per account). The pay helper gives club access at once
#   and takes it away after 14 days unless they join (pay/worker.js: /api/trial + the nightly check).
# - "Your membership" card shows the trial (days left) with a way to stay.
# - Noa's bell gets a "Free club trials" section (from users/{Noa}/data/t-trials, kept by the pay helper).
# - Home club teaser + tour mention the trial.

# ---- tour ----
R('''and <b>Messages</b> to chat with other members (tap the 🔔 at the top, then <b>💬 Messages</b>).</div></li>''',
  '''and <b>Messages</b> to chat with other members (tap the 🔔 at the top, then <b>💬 Messages</b>). Not in the club yet? Try it <b>free for 2 weeks</b> from the Club page, no card needed.</div></li>''')

# ---- Noa's bell: free trials ----
R('''      let welc={}; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-kudos-sent");''',
  '''      let trials=[]; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-trials"); trials=JSON.parse((j&&j.fields&&j.fields.json&&j.fields.json.stringValue)||"[]")||[]; }catch(e){}
      let welc={}; try{ const F=window.__csFire, j=await fsx("GET","/users/"+F.uid()+"/data/t-kudos-sent");''')
R('''      data={acc,priv,club,reps,areq,mine,welc};''', '''      data={acc,priv,club,reps,areq,mine,welc,trials};''')
R('''    const cnt=keys.filter(k=>!rd.includes(k)).length+joins.length+clubNew.length+mineNew.length;''',
  '''    const trAll=(data.trials||[]).filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>wk), trNew=trAll.filter(t=>Math.max(t.start||0,t.ended||0,t.joined||0)>since);
    const cnt=keys.filter(k=>!rd.includes(k)).length+joins.length+clubNew.length+mineNew.length+trNew.length;''')
R('''      ${areq.length?`<h4>🙋 Asking to join Hibi</h4>''',
  '''      ${trAll.length?`<h4>🎁 Free club trials</h4><ul>${trAll.map(t=>{ const when=Math.max(t.start||0,t.ended||0,t.joined||0), dd=d=>{ try{ return new Date(d+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"}); }catch(e){ return d; } };
        const what=t.status==="joined"?"joined the club after the trial 💛":t.status==="trial-ended"?"’s free trial ended (club access removed)":t.status==="trial-kept"?"’s trial ended, kept in the club (you set it)":`started a free 2-week trial · ends ${dd(t.until)}`;
        return `<li${when>since?"":' class="tn-read"'}>🎁 <b>${esc(t.name||t.email||"Someone")}</b> ${what} <span class="muted">· ${ago(when)}</span>${t.status==="trial"||t.status==="trial-ended"?` <button type="button" class="tn-go" data-dmto="${esc(t.uid)}" data-dmname="${esc(t.name||"")}">Message →</button>`:""}</li>`; }).join("")}</ul>`:""}
      ${areq.length?`<h4>🙋 Asking to join Hibi</h4>''')

_css = r'''
.hb-trial{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;margin-top:4px}
.hb-trial-btn{font:800 16px var(--body);padding:12px 22px;border-radius:999px;border:0;cursor:pointer;background:linear-gradient(100deg,#7BD88F,#3FB37F 55%,#2E9C8F);color:#06281a;box-shadow:0 4px 14px rgba(63,179,127,.35)}
.hb-trial-btn[disabled]{opacity:.6;cursor:wait}
.hb-trial-or{font:700 12px var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-top:4px}
#hbMem .hb-mem.trial{border-color:color-mix(in srgb,#3FB37F 45%,var(--line))}
#hbMem .hb-mem-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
#hbMem .hb-mem-cta .hb-pay-btn{padding:8px 16px;font-size:14px}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]

# "I want to stay" (on the trial card) opens the chat with a stay message
R('''ta.value="Hi Noa! 👋 I’m interested in joining Noa’s English Club. Can you tell me how it works?";''',
  '''ta.value=j.dataset.joindm==="stay"?"Hi Noa! 👋 I’m enjoying my free trial and I’d like to stay in the club. How do I join?":"Hi Noa! 👋 I’m interested in joining Noa’s English Club. Can you tell me how it works?";''')
