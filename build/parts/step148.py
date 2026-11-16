# step148 (Nov 16 2026): the "Move your membership to Hibi" card says what happens if they don't switch:
# Skool is already cancelled, so club access pauses 5 days after their Skool month ends (Hibi itself stays).
# After their Skool month ended (pay helper: P.ended / P.switchBy) the card says so, and the first payment is today.
R('''      const when=P.start?`Nothing is charged today. Your first payment on Hibi is on <b>${day(P.start)}</b>, the day Skool would have charged you.`:`Your first payment is today, and then once a month.`;''',
  '''      const plus5=d=>{ const x=new Date(d+"T12:00:00"); x.setDate(x.getDate()+5); return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); };
      const when=P.start?`Nothing is charged today. Your first payment on Hibi is on <b>${day(P.start)}</b>, when your Skool month ends. Your Skool subscription is already cancelled, so you never pay twice.<br><span class="hb-mv-warn">Switch before then to keep your spot. If you haven’t switched by ${day(plus5(P.start))}, your club access pauses (the rest of Hibi stays).</span>`
        :P.ended?`Your Skool month ended on <b>${day(P.ended)}</b>. Switch by <b>${day(P.switchBy)}</b> to keep your club access. Your first payment is today, and then once a month.`
        :`Your first payment is today, and then once a month.`;''')
_css = r'''
#hbMove .hb-mv-warn{display:inline-block;margin-top:6px;font-size:13.5px;color:var(--muted)}
'''
_i = s.index('</style>'); s = s[:_i] + _css + s[_i:]
R('''<li>Tap the button and confirm with ${usdOnly?"PayPal":"Mercado Pago"}.</li><li>Noa cancels your Skool membership, so you never pay twice.</li>''',
  '''<li>Tap the button and confirm with ${usdOnly?"PayPal":"Mercado Pago"}.</li>''')
