# 42) Practice in a logical order: Grammar, Vocabulary, Your words; Past simple, Irregular verbs, My mistakes
_v_i = s.index('<button class="pr-bigbtn pb-vocab"'); _v_j = s.index('</button>', _v_i) + 9
_vb = s[_v_i:_v_j]; s = s[:_v_i] + s[_v_j:]
_w_i = s.index('<button class="pr-bigbtn pb-words"')
s = s[:_w_i] + _vb + s[_w_i:]
_m_i = s.index('<button class="pr-tile" type="button" data-pr="mis"'); _m_j = s.index('</button>', _m_i) + 9
_mb = s[_m_i:_m_j]; s = s[:_m_i] + s[_m_j:]
_r_i = s.index('<button class="pr-tile" type="button" data-pr="irr">'); _r_j = s.index('</button>', _r_i) + 9
s = s[:_r_j] + _mb + s[_r_j:]
