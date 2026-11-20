# step189 (Nov 19 2026): Word packs points to Irregular verbs (which lives in Grammar)
R("""stars(o.s|0)+'</span></button>'; }).join("")+'</div>';""",
  """stars(o.s|0)+'</span></button>'; }).join("")+'</div>'+'<p class="vp-irr">Looking for irregular verbs? <button type="button" class="linkish" onclick="window.__irrGo&&window.__irrGo(\\'cards\\')">They\\'re in Grammar → 🔁 Irregular verbs</button></p>';""")
_k = s.index('</style>'); s = s[:_k] + '''
.vp-irr{margin:16px 0 0;color:var(--muted);font-size:14.5px}
.vp-irr .linkish{background:none;border:none;padding:0;font:inherit;font-weight:700;color:var(--c2);cursor:pointer;text-decoration:underline;text-underline-offset:3px;text-align:left}
''' + s[_k:]
