# 44) present perfect module: tiles, title, bank
R(' id="prPsTile"', ' id="prPsTile" data-modtile="ps"')
_t_i = s.index('id="prPsTile"'); _t_i = s.rindex('<button', 0, _t_i); _t_j = s.index('</button>', _t_i) + 9
_pp_tile = s[_t_i:_t_j].replace('id="prPsTile" data-modtile="ps"', 'id="prPpTile" data-modtile="pp"').replace('⏪', '🌍').replace('<b>Past simple</b>', '<b>Present perfect</b>')
s = s[:_t_j] + _pp_tile + s[_t_j:]
_p_i = s.index('<div class="pr-panel" data-pp="ps" hidden>'); _h = s.index('<h1>', _p_i)
s = s[:_h] + '<h1 id="psTitle">' + s[_h+4:]
R(open('parts/vocbank.js').read(), open('parts/vocbank.js').read() + '\n' + open('parts/ppbank.js').read())
R('<script src="buddy.js?v=17" defer></script>', '<script src="buddy.js?v=18" defer></script>')
