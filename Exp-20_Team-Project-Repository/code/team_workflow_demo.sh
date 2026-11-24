#!/usr/bin/env bash
# Exp 20 - team workflow: module branches, pull-request style merges, README conflict, documentation.
# A local bare repository plays the role of GitHub so the whole flow can be replayed offline.
set -u
W=$(mktemp -d); cd "$W"
git init -q --bare -b main remote.git
git clone -q remote.git lead 2>/dev/null && cd lead
printf "# Team Project\nModules: none\n" > README.md
git add . && git commit -q -m "Initial README" && git push -q origin main && cd ..

module() {   # student branch file content readme-line
  git clone -q remote.git "$1" && cd "$1" && git checkout -q -b "$2"
  printf "%s\n" "$4" > "$3"; sed -i "s/^Modules: .*/$5/" README.md
  git add . && git commit -q -m "Add $2 module" && git push -q -u origin "$2" 2>/dev/null; cd ..
}
module student1 feature-login   login.py   'def login(u, p): return "Login successful" if (u, p) == ("admin", "admin123") else "Invalid credentials"' 'Modules: Login'
module student2 feature-catalog catalog.py 'CATALOG = ["Laptop", "Phone", "Headphones"]' 'Modules: Login, Catalog'
module student3 feature-cart    cart.py    'def total(prices): return sum(prices)' 'Modules: Login, Cart'

cd lead && git fetch -q
echo "== Step 4: branches on the remote =="; git branch -r
echo; echo "== Step 6: merge PR #1 (feature-login) =="
git merge --no-ff -m "Merge pull request #1 from feature-login" origin/feature-login | tail -4
echo; echo "== Step 7: merge PR #2 (feature-catalog) -> conflict =="
git merge --no-ff -m "Merge pull request #2 from feature-catalog" origin/feature-catalog 2>&1 | tail -3
cat README.md
printf "# Team Project\nModules: Login, Catalog\n" > README.md
git add README.md && git commit -q -m "Resolve README merge conflict" && echo "resolved -> Modules: Login, Catalog"
git push -q origin main
echo; echo "== Step 7: PR #3 (feature-cart) - update branch from main, resolve conflict =="
cd ../student3 && git pull --no-rebase origin main 2>&1 | tail -2
printf "# Team Project\nModules: Login, Catalog, Cart\n" > README.md
git add README.md && git commit -q -m "Resolve README merge conflict" && git push -q origin feature-cart
cd ../lead && git fetch -q && git merge --no-ff -q -m "Merge pull request #3 from feature-cart" origin/feature-cart && git push -q origin main
echo; echo "== Step 9: final state =="; ls; cat README.md
echo; git log --oneline --graph --decorate=short
