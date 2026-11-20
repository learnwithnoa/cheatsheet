# step65: club avatars use the zoomed-in buddy face; colour dots fit in one row
R('''const svg=bd.me&&window.csBuddy.portrait?window.csBuddy.portrait():window.csBuddy.of(bd);''','''const svg=String(bd.me&&window.csBuddy.portrait?window.csBuddy.portrait():window.csBuddy.of(bd)||"").replace(/viewBox="0 0 20 22"/,'viewBox="2.5 2 15 15"');''')
R('''const sv=window.csBuddy.portrait(), mb=''','''const sv=String(window.csBuddy.portrait()||"").replace(/viewBox="0 0 20 22"/,'viewBox="2.5 2 15 15"'), mb=''')
css65 = '''
/* step65 */
.cs-avb{padding:0!important}
.ap-bgs{gap:5px!important}.ap-bg{width:21px!important;height:21px!important;font-size:11px!important}
'''
_i = s.index('</style>'); s = s[:_i] + css65 + s[_i:]
