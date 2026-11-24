#!/usr/bin/env bash
# Exp 28 - pulling a collaborator's changes (a bare repo plays the role of GitHub)
set -u
W=$(mktemp -d); cd "$W"
git init -q --bare -b main remote.git
git clone -q remote.git seed 2>/dev/null && cd seed
echo "# My Project" > README.md && git add . && git commit -q -m "Initial commit" && git push -q origin main
cd .. && git clone -q remote.git me && git clone -q remote.git collaborator
echo "== Step 3: collaborator edits README.md and pushes =="
cd collaborator && echo "Added by collaborator" >> README.md
git add README.md && git commit -q -m "Updated README by collaborator" && git push -q origin main
echo "== Step 4: my local copy is behind =="
cd ../me && git status -sb && git fetch -q && git status -sb
echo "== Step 5: git pull origin main =="
git pull origin main
echo "== Step 6: verify =="
cat README.md; git log --oneline; git status
