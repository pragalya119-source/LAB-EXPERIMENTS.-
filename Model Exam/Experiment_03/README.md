# Experiment 03 – GitHub Repository Setup with .gitignore and README

Create an empty GitHub repository named `personal-portfolio`, then clone it:
```bash
git clone https://github.com/YOUR-USERNAME/personal-portfolio.git
cd personal-portfolio
```
Copy the files from this experiment's `Source_Code` folder into the cloned repository, then:
```bash
git add README.md
git commit -m "Add portfolio project README"
git add .gitignore index.html
git commit -m "Add ignore rules and portfolio page"
git log --oneline
git status --short
git push origin main
```
Use `master` instead if that is the repository's default branch. `.gitignore` affects matching untracked files; it does not untrack files already committed.

Screenshots show a real local Git repository with two commits and a clean working tree. No GitHub URL was supplied, so no remote push is claimed.
