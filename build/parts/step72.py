# step72: Noa's pill says "Coach"
assert s.count('L("Teacher","Profe")')>=3
s = s.replace('L("Teacher","Profe")', 'L("Coach","Coach")')
# the title line isn't only a job: ✨ instead of 💼, and a label that says so
R('<p class="cl-prof-job">💼 ${esc(p.job)}</p>','<p class="cl-prof-job">✨ ${esc(p.job)}</p>')
R('${L("What I do","A qué me dedico")} <small>','${L("My title","Mi título")} <small>')
R('placeholder="${L("e.g. Nurse, Software developer, Student","ej. Enfermera, Desarrollador, Estudiante")}"','placeholder="${L("e.g. Nurse, Gamer, Coffee lover, Student","ej. Enfermera, Gamer, Amante del café, Estudiante")}"')
s = s.replace('add what you do, and add your birthday','add a little title (your job, or anything that describes you), and add your birthday')
