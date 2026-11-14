# 31) keep a small log of "Send love" days so the teacher view can show them
R('if(first){ LS.set("ncs-ttlove",day()); paint();', 'if(first){ LS.set("ncs-ttlove",day()); const lg=(LS.get("ncs-ttlove-log",[])||[]).filter(x=>x&&x.t>Date.now()-60*864e5); lg.push({t:Date.now(),tt:(document.getElementById("ttText")||{}).textContent||""}); LS.set("ncs-ttlove-log",lg.slice(-40)); paint();')
