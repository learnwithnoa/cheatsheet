# 49) private students: "My coaching" panel (read-only hub copy) + Noa's shortcuts
R('''<span>Home</span></button>''', '''<span>Home</span></button>
      <button class="navbtn cn-nav t-mnav" type="button" data-href="members.html" id="mnavTeacher" hidden><span class="w-ico em-ico" aria-hidden="true">👥</span><span>Hibi members</span></button>
      <button class="navbtn cn-nav t-mnav" type="button" data-href="private-students.html" id="mnavHub" hidden><span class="w-ico em-ico" aria-hidden="true">🎓</span><span>Private students</span></button>
      <button class="navbtn cn-nav coach-nav" data-go="coaching" id="navCoaching" hidden><span class="w-ico em-ico" aria-hidden="true">🎓</span><span>My coaching</span></button>''')
R('''<button class="navbtn cn-nav" data-go="park"><span class="w-ico em-ico" aria-hidden="true">🌳</span><span>Buddy park</span></button>''',
'''<button class="navbtn cn-nav" data-go="park"><span class="w-ico em-ico" aria-hidden="true">🌳</span><span>Buddy park</span></button>''')
R('''    <div class="music-wrap">
      <button class="theme-btn music-btn" id="musicBtn"''', '''    <a class="theme-btn t-ico" id="navTeacher" href="members.html" title="Cheat Sheet members" aria-label="Cheat Sheet members" hidden>👥</a>
    <a class="theme-btn t-ico" id="navHub" href="private-students.html" title="Private students" aria-label="Private students" hidden>🎓</a>
    <div class="music-wrap">
      <button class="theme-btn music-btn" id="musicBtn"''')
R('''<section class="view" id="v-translate" hidden>''', open('parts/coaching.html').read() + '''
<section class="view" id="v-translate" hidden>''')
s = s.replace('"translate","park"].includes(id)', '"translate","park","coaching"].includes(id)')
TODAY_CSS += open('parts/coaching.css').read()

R('<script src="buddy.js?v=21" defer></script>', '<script src="buddy.js?v=22" defer></script>')

R('<script src="buddy.js?v=22" defer></script>', '<script src="buddy.js?v=23" defer></script>')
R('<script src="buddy.js?v=23" defer></script>', '<script src="buddy.js?v=24" defer></script>')

# ---- Nov 9: what Hibi means, double-click tip, class-note drafts, What's new ----
R('''    <p class="esb">Tu compañero de inglés: referencia rápida, cuaderno personal y práctica.</p>''','''    <p class="esb">Tu compañero de inglés: referencia rápida, cuaderno personal y práctica.</p>
    <div class="wl-hibi"><b lang="ja">日々</b><div><b>Why “Hibi”?</b> <i>Hibi</i> (日々) is Japanese for <b>“day by day”</b>. That's how a language grows: a few new words, one class note, one short practice round, every day. Small steps, done daily, add up.</div></div>
    <p class="wl-tip">🔎 <b>Tip:</b> <b>double-click</b> any word on Hibi (on your phone, <b>press and hold</b>) to see what it means and save it to <b>My words</b>. Select a few words to look up a phrase.</p>''')
R('''<span class="count" id="freeSaved">Your draft is kept until you save it</span>''','''<span class="count" id="freeSaved">Your draft is saved as you type</span>''')
R('''<div class="note-actions"><button class="pill-btn pill-green" type="button" id="cnSave">Save note</button><button class="swap" type="button" data-go="classnotes" id="cnAllBtn">All my class notes →</button></div>''','''<div class="note-actions"><button class="swap" type="button" id="cnDraft" title="Keep what you've written here, so you can keep adding to it during class">💾 Save draft</button><button class="pill-btn pill-green" type="button" id="cnSave" title="Add this note to My class notes and start a fresh one">📥 Move to my notes</button><button class="swap" type="button" data-go="classnotes" id="cnAllBtn">All my class notes →</button></div>
    <p class="cn-help">Taking notes during class? Press <b>Save draft</b> as often as you like: it stays here (and in your account if you're signed in). When the class is over, press <b>Move to my notes</b>.</p>''')
R('''freeNotes.addEventListener("input",()=>{ clearTimeout(freeT); freeT=setTimeout(()=>{ freeSaved.textContent= LS.set("ncs-freenotes",freeNotes.value)?"Draft kept · press Save note when you're done":"This browser blocks storage, so notes won't be kept"; },500); });''','''freeNotes.addEventListener("input",()=>{ clearTimeout(freeT); freeT=setTimeout(()=>{ freeSaved.textContent= LS.set("ncs-freenotes",freeNotes.value)?"Draft saved as you type ✓":"This browser blocks storage, so notes won't be kept"; },500); });
document.getElementById("cnDraft").addEventListener("click",()=>{ clearTimeout(freeT); const ok=LS.set("ncs-freenotes",freeNotes.value); freeSaved.textContent=ok?"Draft saved ✓ "+new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}):"This browser blocks storage, so notes won't be kept"; toast(ok?"💾 Draft saved. It stays here until you move it to your notes.":"This browser blocks storage"); });''')
R('''renderCN(); toast(ok?"Note saved to My class notes":"Saved for now, but this browser blocks storage");''','''renderCN(); toast(ok?"📥 Moved to My class notes":"Saved for now, but this browser blocks storage");''')
R('''freeNotes.value=""; LS.set("ncs-freenotes",""); freeSaved.textContent="Your draft is kept until you save it";''','''freeNotes.value=""; LS.set("ncs-freenotes",""); freeSaved.textContent="Your draft is saved as you type";''')
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-hibi", date:"November 9, 2026", title:"Say hi to Hibi 日々", items:[
    ["🌱","A new name: Hibi 日々","the Cheat Sheet is now <b>Hibi</b>, Japanese for <b>“day by day”</b>. A little English every day adds up. Same site, same words and notes."],
    ["⚔️","Duels","club members can challenge each other to a friendly 7-day duel in the <b>Buddy park</b>: word race, first to 15, flashcards or grammar. Winners get treats and fighting gear for their buddy.","park"],
    ["📸","Your monthly recap, your way","pick a background (even your buddy's room) and it only shows what you actually did."],
    ["⏱","Study timer on Practice","start a 10, 15 or 25-minute session right from <b>Practice</b>, with a study tip each day.","quiz"],
    ["📝","Class note drafts","on your Home page, <b>Save draft</b> keeps your notes while you write during class; <b>Move to my notes</b> files them when you're done."],
    ["🧸","Your buddy's room","drag toys around, hide the ones you don't like, and zoom out to see more of the room."],
    ["✨","Safer AI word tools","<b>Complete my words</b> and <b>Clean up my words</b> now explain what they do first, never change sentences you wrote without asking, and have an <b>Undo</b> button."],
    ["🎓","My coaching","private students see their next class, homework, goals, guides and payments, with a 🔔 when something new arrives."]
  ]},''')
R('<script src="buddy.js?v=24" defer></script>', '<script src="buddy.js?v=25" defer></script>')
R('<script src="buddy.js?v=25" defer></script>', '<script src="buddy.js?v=26" defer></script>')
R('<script src="buddy.js?v=26" defer></script>', '<script src="buddy.js?v=27" defer></script>')
R('<script src="buddy.js?v=27" defer></script>', '<script src="buddy.js?v=28" defer></script>')
R('<script src="buddy.js?v=28" defer></script>', '<script src="buddy.js?v=29" defer></script>')
R('<script src="buddy.js?v=29" defer></script>', '<script src="buddy.js?v=30" defer></script>')
R('<p>Write your own sentence with one of your words, and get quick feedback. It uses the words from your flashcards.</p>', '<p>Write your own sentence with one of your words and get quick feedback. Each sentence gets ⭐ to ⭐⭐⭐ <b>for your level</b> (not compared with anyone else), and your buddy gets 1 to 3 🍪. Like your sentence? Save it as the word\'s example.</p>')
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-sentences", date:"November 9, 2026", title:"Write your own sentences ✍️", items:[
    ["⭐","Stars for your sentences","in <b>Practice → Use it in a sentence</b>, every sentence gets 1 to 3 stars <b>for your level</b>, a tip to make the next one richer, and up to 3 🍪 for your buddy.","quiz"],
    ["📌","Your sentence, your example","like the sentence you wrote? Save it as that word's example in <b>My words</b>."],
    ["✍️","Write your own examples","in <b>✨ Complete my words</b>, tick <b>I'll write my own example sentences</b> and the AI leaves them for you.","words"]
  ]},''')

R('''const p="You are a kind, encouraging English coach for a Spanish-speaking learner "+((window.csBeginnerOn&&window.csBeginnerOn())?"who is a BEGINNER (level A1 to A2): use very simple, short English, and end the feedback with one short sentence in Spanish that repeats the main point":"(level B1 to B2)")+". The student is practicing''',
  '''const L=typeof window.csLevel==="function"?window.csLevel():{lv:""}, LB=/^A/.test(L.lv||"")||(window.csBeginnerOn&&window.csBeginnerOn());
    const p="You are a kind, encouraging English coach for a Spanish-speaking learner "+(L.lv?"whose English level is "+L.lv+" (CEFR)":"(level not known: assume about B1)")+(LB?": use very simple, short English, and end the feedback with one short sentence in Spanish that repeats the main point":"")+". The student is practicing''')

R('''<span class="esb">Tus palabras</span></button></div></div>''', '''<span class="esb">Tus palabras</span></button></div>
  <button class="pr-lvlbtn" type="button" data-pr="level"><span aria-hidden="true">📊</span> <b>My English level</b> <span id="prLvlNow"></span><span class="pr-lvl-go">Take the 5-minute level check or choose it →</span></button></div>''')
R('''<div class="pr-panel" data-pp="sent" hidden>''', '''<div class="pr-panel" data-pp="level" hidden><button class="pr-back" type="button" data-prback><span aria-hidden="true">←</span> <span class="pr-back-t">All practice</span></button><h1>My English <em>level</em></h1>
  <p class="lede">Your level helps Hibi give you fair feedback: the stars for your sentences are <b>for your level</b>, never compared with anyone else. It's not a grade, and you can change it any time.</p>
  <div id="lvlBox"></div></div>
<div class="pr-panel" data-pp="sent" hidden>''')
R('''    ["⭐","Stars for your sentences",''','''    ["📊","My English level","take a 5-minute level check or choose your level in <b>Practice → My English level</b>, so your feedback fits you.","quiz"],
    ["⭐","Stars for your sentences",''')

R('''const CL_POP=CHANGELOG.find(e=>!e.quiet), CL_LATEST=CL_POP.id;''', '''const CL_POP=CHANGELOG.find(e=>!e.quiet), CL_LATEST=CL_POP.id; window.__csClLatest=CL_LATEST;''')


R('<script src="buddy.js?v=30" defer></script>', '<script src="buddy.js?v=31" defer></script>')
R('"backup","changelog","quiz","translate","park","coaching"].includes(id)) return;', '"backup","changelog","quiz","park","coaching"].includes(id)) return;')
R('!["quiz","translate","park","coaching"].includes(id));', '!["quiz","park","coaching"].includes(id));')
R('<h1>Quick <em>translator</em></h1>', '<h1><em>Translator</em></h1>')
R('''    <div class="music-wrap">
      <button class="theme-btn music-btn" id="musicBtn"''', '''    <button class="theme-btn" id="hdrWord" type="button" title="Add a word to My words" aria-label="Add a word" aria-haspopup="dialog" aria-controls="qa"><span aria-hidden="true" style="font-size:17px;line-height:1">＋</span><span class="theme-txt">Word</span></button>
    <div class="music-wrap">
      <button class="theme-btn music-btn" id="musicBtn"''')
R('<script src="buddy.js?v=31" defer></script>', '<script src="buddy.js?v=32" defer></script>')
R('<script src="buddy.js?v=32" defer></script>', '<script src="buddy.js?v=33" defer></script>')
# menu icons: same line-icon style for everything (no emoji)
_svg=lambda d: '<svg class="home-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+d+'</svg>'
_PEOPLE=_svg('<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.3 2.8-5.2 5.5-5.2s4.9 1.9 5.5 5.2"/><circle cx="16.8" cy="9.5" r="2.6"/><path d="M15.6 14.4c2.6-.3 4.4 1.4 5 4.6"/>')
_CAP=_svg('<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.2c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2v-4.2"/><path d="M21.5 9.5v5"/>')
_TREE=_svg('<path d="M12 3.5c-3.3 0-5.6 2.4-5.6 5.3 0 .6.1 1.2.3 1.7-1.4.8-2.2 2.1-2.2 3.6 0 2.4 2.1 4.2 4.6 4.2h5.8c2.5 0 4.6-1.8 4.6-4.2 0-1.5-.8-2.8-2.2-3.6.2-.5.3-1.1.3-1.7 0-2.9-2.3-5.3-5.6-5.3z"/><path d="M12 11v9.5"/>')
R('<span class="w-ico em-ico" aria-hidden="true">👥</span><span>Hibi members</span>', _PEOPLE+'<span>Hibi members</span>')
R('<span class="w-ico em-ico" aria-hidden="true">🎓</span><span>Private students</span>', _CAP+'<span>Private students</span>')
R('<span class="w-ico em-ico" aria-hidden="true">🎓</span><span>My coaching</span>', _CAP+'<span>My coaching</span>')
R('<span class="w-ico em-ico" aria-hidden="true">🌳</span><span>Buddy park</span>', _TREE+'<span>Buddy park</span>')
# Practice: "My words" first and clearly yours; Noa's sets become "Word packs"
R('''<div class="pr-big"><button class="pr-bigbtn pb-gram" type="button" data-pr="gram"><span class="pr-ico" aria-hidden="true">🧩</span><b>Grammar</b><span>Step-by-step modules with stars and rewards</span><span class="esb">Gramática</span></button><button class="pr-bigbtn pb-vocab" type="button" data-pr="vocab"><span class="pr-ico" aria-hidden="true">🗂️</span><b>Vocabulary</b><span>Word sets by Noa: phrasal verbs, work, travel and more</span><span class="esb">Vocabulario</span></button><button class="pr-bigbtn pb-words" type="button" data-pr="words"><span class="pr-ico" aria-hidden="true">📚</span><b>Your words</b><span>Flashcards, sentences and pronunciation</span><span class="esb">Tus palabras</span></button></div>''',
'''<div class="pr-big"><button class="pr-bigbtn pb-words" type="button" data-pr="words"><span class="pr-ico" aria-hidden="true">📚</span><b>My words</b><span>Practice the words you saved: flashcards, sentences and pronunciation</span><span class="esb">Mis palabras: las que tú guardaste</span></button><button class="pr-bigbtn pb-gram" type="button" data-pr="gram"><span class="pr-ico" aria-hidden="true">🧩</span><b>Grammar</b><span>Step-by-step modules with stars and rewards</span><span class="esb">Gramática</span></button><button class="pr-bigbtn pb-vocab" type="button" data-pr="vocab"><span class="pr-ico" aria-hidden="true">🗂️</span><b>Word packs</b><span>New words picked by Noa: phrasal verbs, work, travel and more</span><span class="esb">Paquetes de palabras nuevas de Noa</span></button></div>''')
R('PNAME={gram:"Grammar",words:"Your words",vocab:"Vocabulary"}','PNAME={gram:"Grammar",words:"My words",vocab:"Word packs"}')
R('<h1><em>Vocabulary</em></h1><p class="lede">Useful words and expressions, in sets.','<h1>Word <em>packs</em></h1><p class="lede">New words and expressions picked by Noa, in sets (not your saved words: those are in <b>My words</b>).')
R('<h1>Your <em>words</em></h1><p class="lede">Practice the words you saved in <b>My words</b>.</p>','<h1>My <em>words</em></h1><p class="lede">Practice the words you saved in <b>My words</b>.</p>')
# progress reports live on My coaching (quiet: only private students get them)
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-reports", date:"November 9, 2026", title:"Progress reports on My coaching 📈", quiet:true, items:[
    ["📈","Your progress reports","private students: your every-3-weeks progress report now lives in <b>My coaching → Progress reports</b>. Read it, open your class recordings, or print it.","coaching"]
  ]},''')
R('<script src="buddy.js?v=33" defer></script>', '<script src="buddy.js?v=34" defer></script>')
# the welcome card waits until they've signed in (the sign-in screen comes first)
R('''if(!LS.get("ncs-welcomed",0)) setTimeout(openWelcome,400);''','''(function(){ let done=false; const go=()=>{ if(done||LS.get("ncs-welcomed",0)) return; done=true; setTimeout(openWelcome,400); };
  if(window.__csAuth===true||window.__csPreview||window.__csGuest) go(); window.addEventListener("cs-auth",e=>{ if(e.detail&&e.detail.signedIn) go(); }); })();''')
R('<script src="buddy.js?v=34" defer></script>', '<script src="buddy.js?v=35" defer></script>')
# Noa's English Club: members-only page + Home card (content arrives in each member's private hub-view copy)
R('''<section class="view" id="v-translate" hidden>''', open('parts/club.html').read() + '''<section class="view" id="v-translate" hidden>''')
TODAY_CSS += open('parts/club.css').read()
_CHAT=_svg('<path d="M4 5.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.2V15.5H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"/><path d="M17 9.5h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.7l-3.4-2.7H12"/>')
R(_CAP+'<span>My coaching</span></button>', _CAP+'<span>My coaching</span></button>\n      <button class="navbtn cn-nav club-nav" data-go="club" id="navClub" hidden>'+_CHAT+'<span>Club</span></button>')
R('''  <div class="today" id="todayBox">''', '''  <div id="homeClub" hidden></div>
  <div class="today" id="todayBox">''')
R('<script src="buddy.js?v=35" defer></script>', '<script src="buddy.js?v=36" defer></script>')
R('<script src="buddy.js?v=36" defer></script>', '<script src="buddy.js?v=37" defer></script>')
# My words: the "Cleaned up / Completed" message sits right above the buttons, below "Add a word"
R('''  <p class="ai-status" id="aiStatus" hidden aria-live="polite"></p>
  <div id="slotAwPage" class="page-slot"></div>''', '''  <div id="slotAwPage" class="page-slot"></div>
  <p class="ai-status" id="aiStatus" hidden aria-live="polite"></p>''')
R('<script src="buddy.js?v=37" defer></script>', '<script src="buddy.js?v=38" defer></script>')
R('<script src="buddy.js?v=38" defer></script>', '<script src="buddy.js?v=39" defer></script>')
# club extras (Nov 9): profiles, badges, bell, polls, RSVPs, challenge, after-class (quiet: only club members use it)
R('''const CHANGELOG=[''','''const CHANGELOG=[
  {id:"2026-club2", date:"November 9, 2026", title:"The club, more alive 🌼", quiet:true, items:[
    ["🔔","Your own club bell","see when someone comments on your post, reacts to it or @mentions you (type @ and a name to mention someone).","club"],
    ["🙋","I’m going","tap it on each class of the week, and see who else is coming. Polls 📊 are on the wall too.","club"],
    ["✍️","Weekly challenge","answer Noa’s short challenge each week for 5 🍪 for your buddy. Noa picks a favourite ⭐.","club"],
    ["🏅","Profiles, streaks and badges","tap anyone’s name to see their buddy, level and badges. Come to classes weeks in a row to build your streak 🔥.","club"],
    ["🎬","After class","recordings, words you can save to My words with one tap, and useful phrases, on each week’s post.","club"]
  ]},''')
R('<script src="buddy.js?v=39" defer></script>', '<script src="buddy.js?v=40" defer></script>')

# no flash of "Verb tenses" before the page you opened (the boot script in the head shows the right one)
R('<section class="view" id="v-tenses">', '<section class="view" id="v-tenses" hidden>')
