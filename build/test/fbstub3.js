const U={uid:"u1",email:"tester@example.com",displayName:"Noa",photoURL:"",emailVerified:true,getIdToken:async()=>"x"};
const C=()=>{ try{ return JSON.parse(sessionStorage.getItem("__cloud")||"{}"); }catch(e){ return {}; } }, W=o=>sessionStorage.setItem("__cloud",JSON.stringify(o));
window.__cloudGet=C; window.__cloudSet=W;
export const initializeApp=()=>({}); export const getAuth=()=>({currentUser:U}); export class GoogleAuthProvider{setCustomParameters(){}addScope(){}}
export const onAuthStateChanged=(a,cb)=>{setTimeout(()=>cb(U),50);return()=>{}};
export const signInWithPopup=async()=>({user:U}),signInWithRedirect=async()=>{},getRedirectResult=async()=>null,signOut=async()=>{};
export const getFirestore=()=>({}),collection=(db,...a)=>({p:a.join("/")}),doc=(db,...a)=>({p:a.join("/"),id:String(a[a.length-1])});
export const getDocs=async(c)=>{ const all=C(), ds=Object.keys(all).filter(k=>k.startsWith(c.p+"/")&&k.slice(c.p.length+1).indexOf("/")<0).map(k=>({id:k.split("/").pop(),data:()=>all[k]})); return {docs:ds,empty:!ds.length,size:ds.length,forEach:f=>ds.forEach(f)}; };
export const getDoc=async(d)=>{ const all=C(); return {exists:()=>d.p in all,data:()=>all[d.p]||{},id:d.id}; };
export const setDoc=async(d,v,o)=>{ const all=C(); all[d.p]=o&&o.merge?Object.assign({},all[d.p],v):v; W(all); };
export const deleteDoc=async(d)=>{ const all=C(); delete all[d.p]; W(all); }, serverTimestamp=()=>null;
export const initializeAppCheck=()=>({}); export class ReCaptchaEnterpriseProvider{}; export const getAI=()=>({}); export class GoogleAIBackend{}; export class AgentPlatformBackend{}; export const getGenerativeModel=()=>({generateContent:async()=>({response:{text:()=>""}})});
