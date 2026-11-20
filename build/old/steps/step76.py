# step76: the intro text above a test-out round explains the test, not the stages
R('''  function renderStages(){''','''  let LEDE0=null;
  function psLede(test){ const l=document.querySelector('#v-quiz [data-pp="ps"] .lede'); if(!l) return; if(LEDE0===null) LEDE0=l.innerHTML;
    l.innerHTML=test?'🎓 <b>Test out:</b> 15 questions, no multiple choice, and you see your results at the end. Get <b>all 15 right</b> and you pass the whole module, with all the rewards. One try a day.<span class="esb">Examen: 15 preguntas sin alternativas. Si aciertas las 15, pasas todo el módulo. Un intento al día.</span>':LEDE0; }
  function renderStages(){ psLede(false);''')
R('''  function paintQ(){
    const R=round,''','''  function paintQ(){ psLede(!!(round&&round.test));
    const R=round,''')
