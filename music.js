/* Study music for the teacher pages (Hibi members, Private students).
   GENERATED from the player in index.html by gen_music.py, so both always sound and work the same. Don't edit by hand. */
(function(){
  if(document.getElementById("musicBtn")) return;
  const st=document.createElement("style"); st.textContent='\n.music-wrap{position:relative;display:inline-flex}\n.music-wrap .music-btn{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 13px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:700 14px var(--body);cursor:pointer}\n.music-wrap .music-btn:hover{border-color:var(--royal)}\n.music-wrap .eq{display:inline-flex;gap:2px;align-items:flex-end;height:13px}\n.music-wrap .eq i{width:3px;border-radius:2px;height:6px;background:#7CC4FF}.music-wrap .eq i:nth-child(2){height:12px;background:#2F8CF0}.music-wrap .eq i:nth-child(3){height:9px;background:#1D4ED8}\n.music-wrap .music-btn.on .eq i{animation:tmEq .9s ease-in-out infinite alternate}.music-wrap .music-btn.on .eq i:nth-child(2){animation-delay:.25s}.music-wrap .music-btn.on .eq i:nth-child(3){animation-delay:.5s}\n@keyframes tmEq{from{transform:scaleY(.45)}to{transform:scaleY(1)}}\n.cs-calm .music-wrap .eq i{animation:none!important}\n#musicPanel{position:absolute;right:0;top:44px;width:min(340px,calc(100vw - 24px));z-index:80;background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:16px;padding:14px;box-shadow:0 14px 40px rgba(0,0,0,.28);text-align:left}\n#musicPanel[hidden]{display:none}\n#musicPanel .qa-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}#musicPanel h3{margin:0;font:800 17px var(--display,var(--body))}\n#musicPanel .qa-x{background:none;border:0;font-size:22px;line-height:1;color:var(--muted);cursor:pointer}\n#musicPanel .music-play{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px;border-radius:12px;border:0;background:var(--royal);color:#fff;font:800 15px var(--body);cursor:pointer;margin-bottom:10px}\n#musicPanel .chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}\n#musicPanel .chip{padding:6px 11px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface-2);color:var(--ink);font:700 13px var(--body);cursor:pointer}\n#musicPanel .chip[aria-checked="true"]{background:var(--royal);border-color:var(--royal);color:#fff}\n#musicPanel .vol{display:flex;align-items:center;gap:8px;font-size:13px;margin:6px 0}#musicPanel .vol input{flex:1}#musicPanel .vol[hidden]{display:none}\n#musicPanel .vol-lbl{font-weight:800;min-width:52px}#musicPanel .bal-end{font-size:12px;color:var(--muted)}\n#musicPanel .music-note{font-size:13px;color:var(--muted);margin:8px 0 0}#musicPanel .music-note[hidden]{display:none}\n@media (max-width:640px){.music-wrap .music-btn .theme-txt{display:none}}\n'; document.head.appendChild(st);
  const host=document.getElementById("csWrap"); if(!host) return;
  host.insertAdjacentHTML("beforebegin",'<div class="music-wrap">\n      <button class="theme-btn music-btn" id="musicBtn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="musicPanel"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="theme-txt">Music</span></button>\n      <div class="music-panel card" id="musicPanel" role="dialog" aria-label="Study music" hidden>\n        <div class="qa-top"><h3>Study music</h3><button class="qa-x" type="button" id="musicClose" aria-label="Close">×</button></div>\n        <button class="music-play" type="button" id="musicPlay" aria-pressed="false"><span class="mp-ico" id="mpIco" aria-hidden="true">▶</span><span id="mpTxt">Play</span></button>\n        <div class="chips" role="radiogroup" aria-label="Sound" id="musicModes">\n          <button type="button" class="chip" role="radio" data-mm="lofi">Lo-fi beats</button>\n          <button type="button" class="chip" role="radio" data-mm="both">Lo-fi + rain</button>\n          <button type="button" class="chip" role="radio" data-mm="piano">Calm piano</button>\n          <button type="button" class="chip" role="radio" data-mm="pianorain">Piano + rain</button>\n          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>\n          <button type="button" class="chip" role="radio" data-mm="ocean">Ocean waves</button>\n          <button type="button" class="chip" role="radio" data-mm="brown">Brown noise</button>\n          <button type="button" class="chip" role="radio" data-mm="pink">Pink noise</button>\n          <button type="button" class="chip" role="radio" data-mm="white">White noise</button>\n        </div>\n        <label class="vol" for="musicVol"><span class="vol-lbl">Volume</span><span aria-hidden="true">🔈</span><input type="range" id="musicVol" min="0" max="100" value="45"><span aria-hidden="true">🔊</span></label>\n        <label class="vol bal" for="musicBal" id="balRow" hidden><span class="vol-lbl">Mix</span><span class="bal-end">Music</span><input type="range" id="musicBal" min="0" max="100" value="40" aria-valuetext="40% rain"><span class="bal-end">Rain</span></label>\n        <p class="music-note" id="mnDesc"></p>\n        <p class="music-note" id="mnLofi" hidden>Want real tracks? <a href="https://www.youtube.com/@LofiGirl" target="_blank" rel="noopener">Lofi Girl on YouTube ↗</a></p>\n      </div>\n    </div>');
  if(!window.LS) window.LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
  const LS=window.LS; const toast=window.toast||function(t){ console.log(t); };
  (function(){
  const btn=document.getElementById("musicBtn"), panel=document.getElementById("musicPanel"), playB=document.getElementById("musicPlay"), vol=document.getElementById("musicVol");
  let mode=LS.get("ncs-music-mode","lofi"), volume=LS.get("ncs-music-vol",45), balance=LS.get("ncs-music-bal",40);
  vol.value=volume;
  const bal=document.getElementById("musicBal"), balRow=document.getElementById("balRow"); bal.value=balance;
  let pinkGain=null, whiteGain=null, brownGain=null, pianoBus=null, pianoBar=0, oceanGain=null;
  let ac=null, master=null, tone=null, musicBus=null, rainGain=null, crackleGain=null, delay=null, noiseBuf=null, crackBuf=null, rainSrc=null, crackSrc=null, timer=null, playing=false;
  let step=0, nextTime=0, bar=0;
  const BPM=76, S16=60/BPM/4;
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  const PROG=[
    {r:41,n:[53,57,60,64,67]},{r:40,n:[52,55,59,62,67]},{r:38,n:[50,53,57,60,64]},{r:36,n:[48,52,55,59,62]},
    {r:41,n:[53,57,60,64,69]},{r:40,n:[52,55,59,62,64]},{r:45,n:[57,60,64,67,71]},{r:43,n:[53,59,62,65,69]}
  ];
  const MEL=[72,74,76,79,81,84];
  function setup(){
    const C=window.AudioContext||window.webkitAudioContext; if(!C) return false;
    ac=new C();
    master=ac.createGain(); master.gain.value=0;
    tone=ac.createBiquadFilter(); tone.type="lowpass"; tone.frequency.value=4200; tone.Q.value=0.3;
    master.connect(tone).connect(ac.destination);
    musicBus=ac.createGain(); musicBus.connect(master);
    delay=ac.createDelay(1); delay.delayTime.value=S16*3; const fb=ac.createGain(); fb.gain.value=0.32; const dl=ac.createBiquadFilter(); dl.type="lowpass"; dl.frequency.value=1800;
    delay.connect(dl).connect(fb).connect(delay); dl.connect(musicBus);
    const len=ac.sampleRate*2;
    noiseBuf=ac.createBuffer(1,len,ac.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    crackBuf=ac.createBuffer(1,len*2,ac.sampleRate); const c=crackBuf.getChannelData(0); for(let i=0;i<c.length;i++){ c[i]=(Math.random()*2-1)*0.012 + (Math.random()<0.0004?(Math.random()*2-1)*0.6:0); }
    crackleGain=ac.createGain(); crackleGain.gain.value=0.5; crackleGain.connect(musicBus);
    crackSrc=ac.createBufferSource(); crackSrc.buffer=crackBuf; crackSrc.loop=true; const ch=ac.createBiquadFilter(); ch.type="bandpass"; ch.frequency.value=2500; ch.Q.value=0.4; crackSrc.connect(ch).connect(crackleGain); crackSrc.start();
    // rain: soft pink-noise wash + thousands of tiny droplets (stereo), with a slow natural swell
    rainGain=ac.createGain(); rainGain.gain.value=0; rainGain.connect(master);
    rainSrc=ac.createBufferSource(); rainSrc.buffer=makeRain(); rainSrc.loop=true;
    const hp=ac.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=220; hp.Q.value=0.5;
    const lp=ac.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=7800; lp.Q.value=0.4;
    const swell=ac.createGain(); swell.gain.value=0.85;
    const lfo=ac.createOscillator(), lfoAmt=ac.createGain(); lfo.frequency.value=0.06; lfoAmt.gain.value=0.15; lfo.connect(lfoAmt).connect(swell.gain); lfo.start();
    rainSrc.connect(hp).connect(lp).connect(swell).connect(rainGain); rainSrc.start();
    // brown noise: deep, steady, no clicks
    brownGain=ac.createGain(); brownGain.gain.value=0; brownGain.connect(master);
    const bs=ac.createBufferSource(); bs.buffer=makeBrown(); bs.loop=true;
    const bhp=ac.createBiquadFilter(); bhp.type="highpass"; bhp.frequency.value=28;
    const blp=ac.createBiquadFilter(); blp.type="lowpass"; blp.frequency.value=900; blp.Q.value=0.3;
    bs.connect(bhp).connect(blp).connect(brownGain); bs.start();
    // pink & white noise
    pinkGain=ac.createGain(); pinkGain.gain.value=0; pinkGain.connect(master);
    const ps=ac.createBufferSource(); ps.buffer=makePink(); ps.loop=true; ps.connect(pinkGain); ps.start();
    whiteGain=ac.createGain(); whiteGain.gain.value=0; whiteGain.connect(master);
    const ws=ac.createBufferSource(); ws.buffer=makeWhite(); ws.loop=true;
    const wlp=ac.createBiquadFilter(); wlp.type="lowpass"; wlp.frequency.value=9000;
    ws.connect(wlp).connect(whiteGain); ws.start();
    // ocean waves: deep surf that swells and breaks (slow, uneven), with a little foam hiss on each crest
    oceanGain=ac.createGain(); oceanGain.gain.value=0; oceanGain.connect(master);
    const os=ac.createBufferSource(); os.buffer=makeBrown(); os.loop=true;
    const olp=ac.createBiquadFilter(); olp.type="lowpass"; olp.frequency.value=650; olp.Q.value=0.2;
    const owave=ac.createGain(); owave.gain.value=0.46;
    const ol1=ac.createOscillator(), oa1=ac.createGain(); ol1.frequency.value=0.085; oa1.gain.value=0.32; ol1.connect(oa1).connect(owave.gain); ol1.start();
    const ol2=ac.createOscillator(), oa2=ac.createGain(); ol2.frequency.value=0.031; oa2.gain.value=0.12; ol2.connect(oa2).connect(owave.gain); ol2.start();
    const ofq=ac.createGain(); ofq.gain.value=480; ol1.connect(ofq).connect(olp.frequency);
    os.connect(olp).connect(owave).connect(oceanGain); os.start();
    const fs=ac.createBufferSource(); fs.buffer=makePink(); fs.loop=true; const fbp=ac.createBiquadFilter(); fbp.type="bandpass"; fbp.frequency.value=2600; fbp.Q.value=0.5;
    const fg=ac.createGain(); fg.gain.value=0.07; const fa=ac.createGain(); fa.gain.value=0.07; ol1.connect(fa).connect(fg.gain);
    fs.connect(fbp).connect(fg).connect(oceanGain); fs.start();
    // calm piano: soft piano tones through a gentle room reverb
    pianoBus=ac.createGain(); pianoBus.gain.value=0; pianoBus.connect(master);
    const verb=ac.createConvolver(); verb.buffer=makeImpulse(3.2); const wet=ac.createGain(); wet.gain.value=0.55;
    pianoBus.connect(verb); verb.connect(wet).connect(master);
    return true;
  }
  // fills d with a generator so the end blends into the start (no click when it loops)
  function loopFill(d,len,gen){
    const F=Math.floor(ac.sampleRate*0.5), tmp=new Float32Array(len+F);
    for(let i=0;i<len+F;i++) tmp[i]=gen();
    for(let i=0;i<len;i++) d[i]= i<F ? tmp[i]*(i/F)+tmp[len+i]*(1-i/F) : tmp[i];
  }
  function makePink(){
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
  function makeBrown(){
    const sr=ac.sampleRate, len=Math.floor(sr*12), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ let last=0; loopFill(buf.getChannelData(ch),len,()=>{ const w=Math.random()*2-1; last=(last+0.02*w)/1.02; return last*3.4; }); }
    return buf;
  }
  function makeImpulse(sec){
    const sr=ac.sampleRate, len=Math.floor(sr*sec), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){ const d=buf.getChannelData(ch); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2); }
    return buf;
  }
  function makeRain(){
    const sr=ac.sampleRate, len=Math.floor(sr*14), buf=ac.createBuffer(2,len,sr);
    for(let ch=0;ch<2;ch++){
      const d=buf.getChannelData(ch);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      loopFill(d,len,()=>{ const w=Math.random()*2-1; b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.969*b2+w*0.153852; b3=0.8665*b3+w*0.3104856; b4=0.55*b4+w*0.5329522; b5=-0.7616*b5-w*0.016898; const v=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.04; b6=w*0.115926; return v; });
      const drops=Math.floor(14*380);
      for(let k=0;k<drops;k++){
        const start=Math.floor(Math.random()*len), heavy=Math.random()<0.05;
        const amp=(heavy?0.22:0.09)*Math.pow(Math.random(),1.6)+0.004;
        const f=heavy? 700+Math.random()*1600 : 2200+Math.random()*6000;
        const dec=(heavy? 0.008+Math.random()*0.018 : 0.0012+Math.random()*0.0035)*sr;
        const n=Math.floor(dec*5), w=2*Math.PI*f/sr; let ph=Math.random()*6.283;
        for(let j=0;j<n;j++){ const e=Math.exp(-j/dec); d[(start+j)%len]+=(Math.sin(ph)*0.55+(Math.random()*2-1)*0.45)*amp*e; ph+=w*(heavy?(1+0.6*j/n):1); }
      }
    }
    return buf;
  }
  function noiseHit(t,{freq,type,q,dur,gain}){
    const src=ac.createBufferSource(); src.buffer=noiseBuf; src.playbackRate.value=0.9+Math.random()*0.2;
    const f=ac.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q||0.7;
    const g=ac.createGain(); g.gain.setValueAtTime(gain,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    src.connect(f).connect(g).connect(musicBus); src.start(t, Math.random()*1.5); src.stop(t+dur+0.05);
  }
  function kick(t){ const o=ac.createOscillator(), g=ac.createGain(); o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(42,t+0.16); g.gain.setValueAtTime(0.9,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.42); o.connect(g).connect(musicBus); o.start(t); o.stop(t+0.45); }
  function snare(t){ noiseHit(t,{freq:1700,type:"bandpass",q:0.8,dur:0.22,gain:0.32}); const o=ac.createOscillator(), g=ac.createGain(); o.frequency.value=185; g.gain.setValueAtTime(0.18,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.12); o.connect(g).connect(musicBus); o.start(t); o.stop(t+0.14); }
  function hat(t,v){ noiseHit(t,{freq:7500,type:"highpass",q:0.5,dur:0.05,gain:0.07*v}); }
  function keyNote(m,t,dur,v){
    const g=ac.createGain(), f=ac.createBiquadFilter(); f.type="lowpass"; f.frequency.value=1500; f.Q.value=0.4;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v,t+0.03); g.gain.exponentialRampToValueAtTime(v*0.35,t+0.9); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    [["sine",0,1],["triangle",-6,0.35]].forEach(([ty,det,lv])=>{ const o=ac.createOscillator(), og=ac.createGain(); o.type=ty; o.frequency.value=mtof(m); o.detune.value=det+(Math.random()*6-3); og.gain.value=lv; o.connect(og).connect(f); o.start(t); o.stop(t+dur+0.05); });
    f.connect(g).connect(musicBus);
  }
  function pianoNote(m,t,v,dur){
    const out=ac.createGain(), f=ac.createBiquadFilter(); f.type="lowpass"; f.Q.value=0.2;
    f.frequency.setValueAtTime(3200,t); f.frequency.exponentialRampToValueAtTime(700,t+1.4);
    out.gain.setValueAtTime(0.0001,t); out.gain.linearRampToValueAtTime(v,t+0.006); out.gain.exponentialRampToValueAtTime(v*0.4,t+0.5); out.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    [["sine",1,1],["sine",2,0.28],["triangle",1,0.18],["sine",3,0.06]].forEach(([ty,mul,lv])=>{ const o=ac.createOscillator(), g=ac.createGain(); o.type=ty; o.frequency.value=mtof(m)*mul; o.detune.value=Math.random()*4-2; g.gain.value=lv; o.connect(g).connect(f); o.start(t); o.stop(t+dur+0.1); });
    f.connect(out).connect(pianoBus);
  }
  const PIANO=[
    {r:41,n:[53,60,64,67,69]},{r:43,n:[55,59,62,65,67]},{r:45,n:[57,60,64,67,71]},{r:40,n:[52,59,62,67]},
    {r:38,n:[50,57,60,64,65]},{r:43,n:[55,59,62,65,69]},{r:36,n:[48,55,59,62,64]},{r:36,n:[48,55,60,64,67]}
  ];
  function bass(m,t,dur){ const o=ac.createOscillator(), g=ac.createGain(); o.type="sine"; o.frequency.value=mtof(m); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.42,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.connect(g).connect(musicBus); o.start(t); o.stop(t+dur+0.05); }
  function mel(m,t){ const o=ac.createOscillator(), g=ac.createGain(); o.type="triangle"; o.frequency.value=mtof(m); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.07,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.7); o.connect(g); g.connect(musicBus); g.connect(delay); o.start(t); o.stop(t+0.75); }
  function schedule(t){
    const s=step%16, ch=PROG[bar%PROG.length];
    const swing=(s%2===1)? S16*0.3 : 0, tt=t+swing;
    if(mode==="piano"||mode==="pianorain"){
      const pc=PIANO[pianoBar%PIANO.length];
      if(s===0){ pianoNote(pc.r,t,0.13,6); pianoNote(pc.r+12,t+0.02,0.07,5.5); }
      const arp={2:0,5:1,8:2,11:3,14:4};
      if(arp[s]!==undefined && pc.n[arp[s]]!==undefined && Math.random()<0.85) pianoNote(pc.n[arp[s]],tt+Math.random()*0.03,0.06+Math.random()*0.03,4.5);
      if((s===4||s===12) && Math.random()<0.3) pianoNote(MEL[Math.floor(Math.random()*5)],tt+0.05,0.05,3.5);
      if(s===15) pianoBar++;
    }
    if(mode==="lofi"||mode==="both"){
      if(s===0){ ch.n.forEach((m,i)=>keyNote(m,t+i*0.018,S16*15,0.055)); bass(ch.r,t,S16*6); }
      if(s===6 || s===10) bass(ch.r+(s===10?7:0),tt,S16*3);
      if(s===0 || s===7 || s===10) kick(tt);
      if(s===4 || s===12) snare(tt);
      if(s%2===0) hat(tt, s%4===0?1:0.6); else if(Math.random()<0.25) hat(tt,0.35);
      if(s%2===0 && Math.random()<0.16) mel(MEL[Math.floor(Math.random()*MEL.length)],tt);
    }
    step++; if(step%16===0) bar++;
  }
  function tick(){
    const ahead=document.hidden?2.5:0.25;
    while(nextTime < ac.currentTime+ahead){ schedule(nextTime); nextTime+=S16; }
  }
  function applyMix(){
    if(!ac) return;
    const t=ac.currentTime, v=(volume/100);
    master.gain.setTargetAtTime(playing? v*v*0.9 : 0, t, 0.15);
    const b=balance/100;
    const mix2= mode==="both"||mode==="pianorain";
    const mus= mode==="lofi"?1 : mode==="both"? Math.cos(b*Math.PI/2)*1.15 : 0;
    const rn= mode==="rain"?0.75 : mix2? Math.sin(b*Math.PI/2)*0.75 : 0;
    musicBus.gain.setTargetAtTime(mus, t, 0.2);
    rainGain.gain.setTargetAtTime(rn, t, 0.3);
    brownGain.gain.setTargetAtTime(mode==="brown"?0.9:0, t, 0.3);
    pinkGain.gain.setTargetAtTime(mode==="pink"?0.8:0, t, 0.3);
    whiteGain.gain.setTargetAtTime(mode==="white"?0.32:0, t, 0.3);
    if(oceanGain) oceanGain.gain.setTargetAtTime(mode==="ocean"?1.1:0, t, 0.4);
    pianoBus.gain.setTargetAtTime(mode==="piano"?1 : mode==="pianorain"? Math.cos(b*Math.PI/2)*1.1 : 0, t, 0.3);
  }
  function paint(){
    playB.setAttribute("aria-pressed",playing?"true":"false");
    document.getElementById("mpIco").textContent= playing?"❚❚":"▶";
    document.getElementById("mpTxt").textContent= playing?"Pause":"Play";
    btn.classList.toggle("on",playing);
    balRow.hidden= !(mode==="both"||mode==="pianorain");
    const MDESC={lofi:"<b>Lo-fi beats</b>: relaxed hip-hop beats with soft keys. A classic for studying.",
      both:"<b>Lo-fi + rain</b>: lo-fi beats with rain in the background. Use <b>Mix</b> to choose how much of each.",
      piano:"<b>Calm piano</b>: slow, gentle piano chords. Good when you need to focus or relax.",
      pianorain:"<b>Piano + rain</b>: calm piano with soft rain. Use <b>Mix</b> to choose how much of each.",
      rain:"<b>Just rain</b>: steady rain, no music. Nice for reading.",
      ocean:"<b>Ocean waves</b>: slow waves rolling onto the beach. Calm and steady, like a day at the coast.",
      brown:"<b>Brown noise</b>: a deep, steady sound that blocks out distractions.",
      pink:"<b>Pink noise</b>: softer than white noise, like steady rain or wind. Many people find it calming.",
      white:"<b>White noise</b>: a bright, even hiss, like a fan. Good for covering voices and sudden sounds."};
    document.getElementById("mnDesc").innerHTML= MDESC[mode]||"";
    document.getElementById("mnLofi").hidden= !(mode==="lofi"||mode==="both");
    document.querySelectorAll("[data-mm]").forEach(b=>{ const on=b.dataset.mm===mode; b.setAttribute("aria-checked",on); b.setAttribute("aria-pressed",on); });
  }
  async function play(){
    if(window.csUnlockAudio) window.csUnlockAudio(true);
    if(!ac && !setup()){ toast("Your browser can't play generated music"); return; }
    try{ await ac.resume(); }catch(e){}
    playing=true; nextTime=ac.currentTime+0.1; step=0;
    clearInterval(timer); timer=setInterval(tick,25); tick(); applyMix(); paint();
  }
  function pause(){ if(window.csReleaseAudio) window.csReleaseAudio(); playing=false; applyMix(); paint(); setTimeout(()=>{ if(!playing){ clearInterval(timer); timer=null; try{ ac.suspend(); }catch(e){} } },600); }
  playB.addEventListener("click",()=> playing?pause():play());
  document.getElementById("musicModes").addEventListener("click",e=>{ const b=e.target.closest("[data-mm]"); if(!b) return; mode=b.dataset.mm; LS.set("ncs-music-mode",mode); applyMix(); paint(); if(!playing) play(); });
  vol.addEventListener("input",()=>{ volume=+vol.value; LS.set("ncs-music-vol",volume); applyMix(); });
  bal.addEventListener("input",()=>{ balance=+bal.value; bal.setAttribute("aria-valuetext",balance+"% rain"); LS.set("ncs-music-bal",balance); applyMix(); });
  function openP(o){ panel.hidden=!o; btn.setAttribute("aria-expanded",o?"true":"false"); if(o) setTimeout(()=>playB.focus(),20); }
  btn.addEventListener("click",()=>openP(panel.hidden));
  document.getElementById("musicClose").addEventListener("click",()=>{ openP(false); btn.focus(); });
  panel.addEventListener("keydown",e=>{ if(e.key==="Escape"){ openP(false); btn.focus(); } });
  document.addEventListener("click",e=>{ if(!panel.hidden && !e.target.closest(".music-wrap")) openP(false); });
  paint();
})();
})();
