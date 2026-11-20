# step70: teacher pill text centred
css70 = '''
/* step70 */
.cs-noa{display:inline-flex;align-items:center;justify-content:center;line-height:1;padding:3px 8px;vertical-align:middle}
.cl-prof-meta .cs-noa{align-self:center}
'''
_i = s.index('</style>'); s = s[:_i] + css70 + s[_i:]
