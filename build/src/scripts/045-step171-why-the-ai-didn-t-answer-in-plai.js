
/* step171: why the AI didn't answer, in plain words */
window.__csAiWhy=function(e){ const c=e&&(e.code||e.message)||"";
  if(/rate_limited|429|quota/i.test(c)) return "😴 The AI helper has used up its free limit for today. It resets overnight, so please try again tomorrow.";
  if(/timeout/i.test(c)) return "⏳ The AI took too long to answer. Try again, or try with a shorter piece of text.";
  return "The AI didn't answer this time. Try again in a minute."; };
