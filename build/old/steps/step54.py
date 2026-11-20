# step54: Ocean waves in Study music
R('''          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>''','''          <button type="button" class="chip" role="radio" data-mm="rain">Just rain</button>
          <button type="button" class="chip" role="radio" data-mm="ocean">Ocean waves</button>''')
R('''  let pinkGain=null, whiteGain=null, brownGain=null, pianoBus=null, pianoBar=0;''','''  let pinkGain=null, whiteGain=null, brownGain=null, pianoBus=null, pianoBar=0, oceanGain=null;''')
R('''    // calm piano: soft piano tones through a gentle room reverb''','''    // ocean waves: deep surf that swells and breaks (slow, uneven), with a little foam hiss on each crest
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
    // calm piano: soft piano tones through a gentle room reverb''')
R('''    whiteGain.gain.setTargetAtTime(mode==="white"?0.32:0, t, 0.3);''','''    whiteGain.gain.setTargetAtTime(mode==="white"?0.32:0, t, 0.3);
    if(oceanGain) oceanGain.gain.setTargetAtTime(mode==="ocean"?1.1:0, t, 0.4);''')
R('''      rain:"<b>Just rain</b>: steady rain, no music. Nice for reading.",''','''      rain:"<b>Just rain</b>: steady rain, no music. Nice for reading.",
      ocean:"<b>Ocean waves</b>: slow waves rolling onto the beach. Calm and steady, like a day at the coast.",''')
