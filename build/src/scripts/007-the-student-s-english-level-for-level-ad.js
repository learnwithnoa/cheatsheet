
/* the student's English level, for level-adapted feedback: Noa's private-student level, or the club level Noa set from class recordings */
window.csLevel=function(){
  const v=window.__csHubView, m=v&&String(v.level||"").match(/[ABC][12](?:\s*[–-]\s*[ABC][12])?/i);
  if(m) return {lv:m[0].toUpperCase().replace(/\s+/g,""),src:"coach"};
  /* the level Noa sets on the Hibi members page comes first, then the one they chose or got from the level check */
  let c=null; try{ c=JSON.parse(localStorage.getItem("cs-cefr")||"null"); }catch(e){}
  if(c&&c.lv) return {lv:String(c.lv),src:"club"};
  let my=null; try{ my=JSON.parse(localStorage.getItem("ncs-mylevel")||"null"); }catch(e){}
  if(my&&my.lv) return {lv:String(my.lv),src:my.src||"self"};
  let b=null; try{ b=JSON.parse(localStorage.getItem("ncs-level")||"null"); }catch(e){}
  return b==="beginner"?{lv:"A1–A2",src:"self"}:{lv:"",src:""};
};
