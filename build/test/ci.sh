#!/bin/bash
# Hibi's automatic check (GitHub runs it on every change before the site updates; you can run it too):
#   bash build/test/ci.sh
# Fails (exit 1) if the page has errors, a practice question has a conflict, or the sign-in gate lets the wrong people in.
cd "$(dirname "$0")/../.." || exit 1
(curl -s -o /dev/null localhost:8768 || (python3 build/test/srv.py >/dev/null 2>&1 &)); sleep 1
fail=0
echo "== page loads (desktop + phone)"; out=$(node build/test/smoke.js 2>&1); echo "$out" | tail -3; echo "$out" | grep -q "^ok: no page errors" || fail=1
echo "== practice questions"; out=$(node build/test/questions.js 2>&1); echo "$out" | head -2; echo "$out" | grep -q "^no conflicts" || fail=1
echo "== sign-in gate"; out=$(node build/test/gate_t.js 2>&1); echo "$out"
echo "$out" | grep -q '^yes  {"gate":false' && echo "$out" | grep -q '^no  {"gate":true' && echo "$out" | grep -q '^gone  {"gate":true' && echo "$out" | grep -q '^down  {"gate":true' && echo "$out" | grep -q "^no errors" || fail=1
echo "== new account on a shared device"; out=$(node build/test/devswitch_t.js 2>&1); echo "$out"
[ "$(echo "$out" | grep -c 'started clean')" = "2" ] && echo "$out" | grep -q "same account -> kept" || fail=1
if [ $fail = 0 ]; then echo "ALL GOOD"; else echo "SOMETHING FAILED"; fi
exit $fail
