# 26) park tweaks, Practice higher in the menu, star names, white & pink noise
R('''  <div class="park-legend"><span>🌼 In the middle: Noa's English Club</span><span>🌳 Around the edges: private students</span></div>\n''', '')
R('<p class="lede">Everyone\'s study buddies, hanging out together. Tap a buddy to say hi.</p>',
  '<p class="lede">Everyone\'s study buddies, hanging out together. Tap someone\'s buddy to send it love: it gets <b>+2 friendship</b> (once a day per buddy).</p>')
_p = '''    <div class="navgroup"><h4>Practice</h4>
      <button class="navbtn" data-go="quiz">Practice</button>
    </div>
'''
R(_p, '')
R('    <div class="navgroup"><h4>Speaking</h4>\n', _p + '    <div class="navgroup"><h4>Speaking</h4>\n')
R('''const navLabel=id=>{ const b=document.querySelector('nav.side .navgroup:not(.starred):not(.mine) .navbtn[data-go="'+id+'"]'); return b?b.textContent.trim():id; };''',
  '''const navLabel=id=>{ const b=document.querySelector('nav.side .navgroup:not(.starred) .navbtn[data-go="'+id+'"]'); if(!b) return id; const sp=[...b.querySelectorAll("span")].filter(x=>!x.getAttribute("aria-hidden")&&!x.classList.contains("cn-count")); return (sp[0]||b).textContent.trim(); };''')
# music: white & pink noise
R('<button type="button" class="chip" role="radio" data-mm="brown">Brown noise</button>',
  '<button type="button" class="chip" role="radio" data-mm="brown">Brown noise</button>\n          <button type="button" class="chip" role="radio" data-mm="pink">Pink noise</button>\n          <button type="button" class="chip" role="radio" data-mm="white">White noise</button>')
R('<p class="music-note" id="mnBrown" hidden><b>Brown noise</b> is a deep, steady sound that blocks out distractions.</p>',
  '<p class="music-note" id="mnBrown" hidden><b>Brown noise</b> is a deep, steady sound that blocks out distractions.</p>\n'
  '        <p class="music-note" id="mnPink" hidden><b>Pink noise</b> is softer than white noise and sounds like steady rain or wind. Many people find it calming.</p>\n'
  '        <p class="music-note" id="mnWhite" hidden><b>White noise</b> is a bright, even hiss, like a fan. Good for covering voices and sudden sounds.</p>')
R('  let brownGain=null,', '  let pinkGain=null, whiteGain=null, brownGain=null,')
R('''  function makeBrown(){''', '''  function makePink(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0; loopFill(buf.getChannelData(ch),len,()=>{ const w=Math.random()*2-1;
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856; b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
      const o=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926; return o; }); }
    return buf;
  }
  function makeWhite(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ loopFill(buf.getChannelData(ch),len,()=>(Math.random()*2-1)*0.5); }
    return buf;
  }
  function makeBrown(){''')
R('''    bs.connect(bhp).connect(blp).connect(brownGain); bs.start();''', '''    bs.connect(bhp).connect(blp).connect(brownGain); bs.start();
    // pink & white noise
    pinkGain=ac.createGain(); pinkGain.gain.value=0; pinkGain.connect(master);
    const ps=ac.createBufferSource(); ps.buffer=makePink(); ps.loop=true; ps.connect(pinkGain); ps.start();
    whiteGain=ac.createGain(); whiteGain.gain.value=0; whiteGain.connect(master);
    const ws=ac.createBufferSource(); ws.buffer=makeWhite(); ws.loop=true;
    const wlp=ac.createBiquadFilter(); wlp.type="lowpass"; wlp.frequency.value=9000;
    ws.connect(wlp).connect(whiteGain); ws.start();''')
R('''    brownGain.gain.setTargetAtTime(mode==="brown"?0.9:0, t, 0.3);''', '''    brownGain.gain.setTargetAtTime(mode==="brown"?0.9:0, t, 0.3);
    pinkGain.gain.setTargetAtTime(mode==="pink"?0.8:0, t, 0.3);
    whiteGain.gain.setTargetAtTime(mode==="white"?0.32:0, t, 0.3);''')
R('''    document.getElementById("mnBrown").hidden= mode!=="brown";''', '''    document.getElementById("mnBrown").hidden= mode!=="brown";
    document.getElementById("mnPink").hidden= mode!=="pink";
    document.getElementById("mnWhite").hidden= mode!=="white";''')
R('<li><span class="wl-ico" aria-hidden="true">🎵</span><div><b>Music</b>: lo-fi, rain, piano or brown noise while you study.</div></li>',
  '<li><span class="wl-ico" aria-hidden="true">🎵</span><div><b>Music</b>: lo-fi, rain, piano or brown, pink and white noise while you study.</div></li>')
TODAY_CSS += '''
.park-b .pw{font:700 10.5px var(--body);color:#1F2A44;background:rgba(255,255,255,.62);border-radius:999px;padding:1px 7px;margin-top:2px;white-space:nowrap}
.park-tip{position:absolute;transform:translateX(-50%);z-index:3;pointer-events:none;background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:12px;padding:6px 10px;font:700 12.5px var(--body);white-space:nowrap;box-shadow:0 6px 18px rgba(0,0,0,.18);animation:parkTip 2.6s ease forwards}
@keyframes parkTip{0%{opacity:0;transform:translate(-50%,6px)}10%,80%{opacity:1;transform:translate(-50%,0)}100%{opacity:0}}
@media (max-width:640px){.park-b .po{display:block;font-size:9.5px;padding:0 5px}.park-b .pw{font-size:9.5px}.park-b .pn{font-size:11px}}
'''
R('<script src="buddy.js?v=5" defer></script>', '<script src="buddy.js?v=6" defer></script>')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-love", date:"November 2, 2026", title:"Love in the park 💌", items:[\n'
  '    ["💌","Send love","tap a friend\'s buddy in the <b>Buddy park</b> to give it +2 friendship (once a day per buddy). You\'ll see who sent love to yours.","park"],\n'
  '    ["🐾","Your buddy in your tab","the little icon in your browser tab is now your own study buddy.",null],\n'
  '    ["🎧","Pink & white noise","two new sounds in <b>Music</b>, next to brown noise.",null]\n'
  '  ]},\n')
