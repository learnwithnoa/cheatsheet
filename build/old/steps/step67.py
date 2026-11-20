# step67: club avatars use the shared buddy-face helper (face centred per animal)
R('''const svg=String(bd.me&&window.csBuddy.portrait?window.csBuddy.portrait():window.csBuddy.of(bd)||"").replace(/viewBox="0 0 20 22"/,'viewBox="2.5 2 15 15"');''','''const svg=bd.me&&window.csBuddy.face?window.csBuddy.face():window.csBuddyFace?window.csBuddyFace(bd):String(window.csBuddy.of(bd)||"");''')
R('''const sv=String(window.csBuddy.portrait()||"").replace(/viewBox="0 0 20 22"/,'viewBox="2.5 2 15 15"'), mb=''','''const sv=window.csBuddy.face?window.csBuddy.face():String(window.csBuddy.portrait()||""), mb=''')
R('<script src="buddy.js?v=47" defer></script>','<script src="buddy.js?v=48" defer></script>')
