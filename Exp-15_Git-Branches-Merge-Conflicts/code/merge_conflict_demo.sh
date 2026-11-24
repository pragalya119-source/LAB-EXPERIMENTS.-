#!/usr/bin/env bash
# Exp 15 - branches + merge conflict, reproduced locally (a bare repo plays the role of GitHub)
set -u
W=$(mktemp -d); cd "$W"
git init -q --bare -b main remote.git
git clone -q remote.git teammate 2>/dev/null && cd teammate
echo "# Shared Project" > README.md && echo "Status: draft" >> README.md
git add . && git commit -q -m "Initial commit" && git push -q origin main
cd .. && git clone -q remote.git me && cd me
echo "== Step 2: create feature branch =="
git checkout -b feature-update
sed -i 's/Status: draft/Status: updated by feature branch/' README.md
git status --short
git add README.md && git commit -q -m "Updated README"
git push -q -u origin feature-update 2>&1 | tail -1; git branch
echo "== teammate changes the same line on main =="
cd ../teammate && sed -i 's/Status: draft/Status: reviewed by teammate/' README.md
git commit -q -am "Teammate edits status" && git push -q origin main
echo "== Steps 6-9: pull main, back to feature, merge =="
cd ../me && git checkout -q main && git pull -q origin main && git checkout -q feature-update
git merge main; git status --short
echo "== Step 10: conflict markers in README.md =="; cat README.md
echo "== resolve: keep both changes =="
printf "# Shared Project\nStatus: reviewed by teammate and updated by feature branch\n" > README.md
cat README.md
git add README.md && git commit -q -m "Resolved merge conflict"
git status; git log --oneline --graph
