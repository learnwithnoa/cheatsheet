# 32) iPhone: sound even on silent mode
R('''  async function play(){
    if(!ac && !setup()){''', '''  async function play(){
    if(window.csUnlockAudio) window.csUnlockAudio(true);
    if(!ac && !setup()){''')
R('function pause(){ playing=false; applyMix();', 'function pause(){ if(window.csReleaseAudio) window.csReleaseAudio(); playing=false; applyMix();')
R('function say(text,btn){\n', 'function say(text,btn){\n  if(window.csUnlockAudio) window.csUnlockAudio(false);\n')
R('const CHANGELOG=[\n', 'const CHANGELOG=[\n'
  '  {id:"2026-iossound", quiet:true, date:"November 4, 2026", title:"Sound fix for iPhone 🔊", items:[\n'
  '    ["🔊","Sound fix for iPhone","music and the 🔊 buttons now work even when your iPhone is on silent.",null]\n'
  '  ]},\n')
