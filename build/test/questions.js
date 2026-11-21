// Checks every grammar/vocab practice question: no right answer offered as a "wrong" option, no list starting with "~". Run: node build/test/questions.js
const fs=require('fs'), vm=require('vm'), d=__dirname+'/../parts/';
const code=['intbank','futbank','iqbank','coubank','thbank','ingbank','presbank','psbank','ppbank','vocbank'].map(f=>fs.readFileSync(d+f+'.js','utf8')).join('\n')+
 '\n;({S:[INT_STAGES,FUT_STAGES,IQ_STAGES,COU_STAGES,TH_STAGES,ING_STAGES,PRS_STAGES,PS_STAGES,PP_STAGES],T:[INT_TEST,FUT_TEST,IQ_TEST,COU_TEST,TH_TEST,ING_TEST,PRS_TEST,PS_TEST,PP_TEST],V:VOC_SETS})';
const r=vm.runInNewContext(code,{});
const n=s=>String(s).toLowerCase().replace(/^~/,"").replace(/[’‘]/g,"'").replace(/\bdidn't\b/g,"did not").replace(/\bwasn't\b/g,"was not").replace(/\bweren't\b/g,"were not").replace(/\bhaven't\b/g,"have not").replace(/\bhasn't\b/g,"has not").trim();
const all=[]; r.S.forEach(S=>S.forEach(st=>(st.stories?st.stories.flatMap(x=>x.items):st.items).forEach(q=>all.push(q)))); r.T.forEach(t=>t.forEach(q=>all.push(q))); r.V.forEach(v=>v.qs.forEach(q=>all.push(q)));
const bad=[]; let alsoN=0, multi=0;
all.forEach(q=>{ if(String(q.a[0]).startsWith("~")) bad.push("starts with ~: "+q.q); if(q.a.some(a=>a.startsWith("~"))) alsoN++; if(q.a.filter(a=>!a.startsWith("~")).length>1) multi++;
  (q.o||[]).forEach(o=>{ if(q.a.some(a=>n(a)===n(o))) bad.push("option = right answer: "+q.q+" -> "+o); }); if(new Set(q.o).size!==(q.o||[]).length) bad.push("duplicate option: "+q.q); });
console.log("questions:",all.length,"| with 'also correct':",alsoN,"| with 2+ right answers:",multi); console.log(bad.length?bad.join("\n"):"no conflicts");
console.log(r.V[1].qs.filter(q=>!q.mco).slice(0,3).map(q=>q.q+" => "+q.a.join(" | ")).join("\n"));
