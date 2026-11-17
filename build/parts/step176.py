# step176 (Nov 17 2026): the "Your membership is moving to Hibi" sample card only shows in Noa's generic preview,
# not when he views as a real person (e.g. a private student who was never a club member)
R('''const show=main&&window.__csClub&&payOn()&&(preview()||(P&&P.onList&&!P.free))&&m&&!busy;''',
  '''const show=main&&window.__csClub&&payOn()&&((preview()&&!window.__csViewAsMode)||(P&&P.onList&&!P.free))&&m&&!busy;''')
