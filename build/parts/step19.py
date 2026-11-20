# Optional patch steps, run after build/src is put together (Nov 20 2026 cleanup).
# The site's real source is build/src (page.html, style.css, scripts/*.js, views/*.html): edit those files directly.
# A step file is still allowed for a change that's easier as a find-and-replace: write parts/stepNNN.py using
# R(old, new) on the page text `s` (old must match exactly once), then add a line here:
#   exec(open("parts/stepNNN.py").read())
# The ~200 old steps that built the site until Nov 20 2026 are kept for history in build/old/steps (not run).
