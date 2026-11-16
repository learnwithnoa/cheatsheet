# step150 (Nov 16 2026): people who signed up but aren't in the club were labelled "club member" (in Noa's bell and in View as).
# Now: "Hibi only · not in the club" (kind "hibi" from cloud.js), and View as says "(not in the club yet)" for them.
R('''const KIND={private:["private student","tn-p"],both:["private + club","tn-b"],club:["club member","tn-c"],new:["private, not linked yet","tn-n"]};''',
  '''const KIND={private:["private student","tn-p"],both:["private + club","tn-b"],club:["club member","tn-c"],new:["private, not linked yet","tn-n"],hibi:["Hibi only · not in the club","tn-n"]};''')
R('''const dm=a.kind==="club"||a.kind==="both",''','''const dm=a.kind==="club"||a.kind==="both"||a.kind==="hibi",''')
R('''if(x) realView(x.name+" (club)",null,"club",x.uid,pick); }''','''if(x) realView(x.name+(x.inClub===false?" (not in the club yet)":" (club)"),null,"club",x.uid,pick); }''')
