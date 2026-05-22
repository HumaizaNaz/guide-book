# Git Workflow Complete Guide
*Version control, branching, PRs, conflicts — 2026*

---

## GIT KYA HAI?

Git = Version control system — tumhare code ka history track karta hai.

```
Bina Git ke:
  project_final.zip
  project_final_v2.zip
  project_ACTUAL_final.zip
  project_REAL_final_THIS_ONE.zip  😭

Git ke saath:
  git log
  commit abc123 — "Fix login bug"
  commit def456 — "Add payment page"
  commit ghi789 — "Initial setup"
  
  Har change tracked, reversible, explained
```

---

## PART 1 — GIT INSTALL & SETUP

```bash
# Install (Ubuntu/Debian)
sudo apt install git -y

# Install (Windows) — git-scm.com se download karo

# Global config (ek baar karo)
git config --global user.name "Tumhara Naam"
git config --global user.email "tumhara@email.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"  # VS Code as default editor

# Config verify karo
git config --list
```

---

## PART 2 — DAILY GIT COMMANDS

### Naya Project Start Karna

```bash
# Option 1: Naya repo banao
git init
git add .
git commit -m "Initial commit"

# Option 2: GitHub se clone karo
git clone https://github.com/username/repo-name.git
cd repo-name
```

### Roz Ka Workflow

```bash
# 1. Status dekho — kya changed hai?
git status

# 2. Kya changes hue dekho (line by line)
git diff

# 3. Stage karo (commit ke liye tayyar karo)
git add filename.ts          # Specific file
git add src/                  # Poora folder
git add .                     # Sab kuch (carefully use karo)

# 4. Staged changes dekho
git diff --staged

# 5. Commit karo
git commit -m "Add user authentication"

# 6. GitHub pe push karo
git push origin main
```

### History Dekhna

```bash
# Simple log
git log --oneline

# Detailed log
git log

# Specific file ka history
git log --oneline -- src/app/page.tsx

# Visual graph (branches ke saath)
git log --oneline --graph --all
```

---

## PART 3 — COMMIT MESSAGES (Important!)

### Good Commit Message Format

```
<type>: <short description>

[Optional: longer explanation]
[Optional: references]
```

### Types

```
feat:     Naya feature
fix:      Bug fix
refactor: Code restructure (behavior same)
style:    Formatting, whitespace (no logic change)
test:     Tests add ya update
docs:     Documentation
chore:    Build process, dependencies
perf:     Performance improvement
```

### Examples

```bash
# BAD commits ❌
git commit -m "fix"
git commit -m "changes"
git commit -m "working now"
git commit -m "asdfgh"

# GOOD commits ✓
git commit -m "feat: add Google OAuth login"
git commit -m "fix: resolve infinite loop in checkout"
git commit -m "refactor: extract payment logic to service"
git commit -m "chore: update Prisma to v6.0"
```

### Conventional Commits (Recommended 2026)

Many teams use Conventional Commits standard — CI automatically generates changelogs se.

```bash
# Install commitlint (enforce commit format)
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"]
}
```

---

## PART 4 — BRANCHING STRATEGIES (2026)

### 2026 Recommendation: Trunk-Based Development

Purana Gitflow complex tha. Aajkal ki teams trunk-based use karti hain.

```
TRUNK-BASED (Recommended for web apps):
  main ← Always deployable
    └── feature/login (1-2 days max, phir merge)
    └── fix/payment-bug (ek din)
    └── feat/dashboard (2 din)

GITFLOW (Sirf versioned software ke liye):
  main
  develop
  feature/*
  release/*
  hotfix/*
  (Complex — avoid unless you ship versioned releases)
```

### GitHub Flow (Simple, Most Used)

```
1. main se branch banao
2. Feature likho
3. PR open karo
4. Review aur approval
5. main mein merge karo
6. Deploy hota hai automatic
```

### Branch Names (Convention)

```bash
feature/user-authentication      # Naya feature
fix/login-redirect-bug           # Bug fix
refactor/database-queries        # Code cleanup
chore/update-dependencies        # Maintenance
hotfix/critical-payment-error    # Emergency fix
```

---

## PART 5 — BRANCHES KE COMMANDS

```bash
# Branch list dekho
git branch           # Local branches
git branch -a        # All branches (remote bhi)

# Naya branch banao
git branch feature/login

# Branch pe switch karo
git checkout feature/login

# Banao aur switch karo (ek command)
git checkout -b feature/login
# Ya modern syntax:
git switch -c feature/login

# Main se latest changes lo
git pull origin main

# Branch delete karo (merged ke baad)
git branch -d feature/login        # Safe delete (unmerged block)
git branch -D feature/login        # Force delete

# Remote branch delete
git push origin --delete feature/login
```

---

## PART 6 — MERGE vs REBASE

### Merge (Simple, History preserve)

```bash
# Main pe jao
git checkout main

# Feature branch merge karo
git merge feature/login

# History:
# * Merge branch 'feature/login'
# |\
# | * Add login page
# | * Add auth API
# |/
# * Previous commit
```

### Rebase (Clean, Linear history)

```bash
# Feature branch pe ho
git checkout feature/login

# Main ke latest commits ke upar rakho
git rebase main

# History:
# * Add login page       ← Feature commits
# * Add auth API         ← on top of main
# * Previous main commit ← Clean, linear
```

### Kab Kya Use Karo?

```
Merge karo:  Team collaboration, shared branches, history preserve karna ho
Rebase karo: Local cleanup, feature branch ko main pe update karna
NEVER:       Shared/public branch pe rebase mat karo!
```

### Squash Merge (PR mein popular)

```bash
# Saare feature commits ek mein compress karo
git merge --squash feature/login
git commit -m "feat: add login functionality"

# Fayda: main history clean rehti hai
```

---

## PART 7 — CONFLICTS RESOLVE KARNA

Jab do log same file ka same part change karte hain — conflict hota hai.

```bash
# Merge kiya, conflict aa gaya
git merge feature/login
# CONFLICT (content): Merge conflict in src/auth.ts
```

### Conflict Dekhna

```
<<<<<<< HEAD (tumhara current code)
const login = async (email, password) => {
  return authenticate(email, password);
}
=======
const login = async (email, password, remember) => {
  return authenticate(email, password, remember);
}
>>>>>>> feature/login (incoming changes)
```

### Resolve Karna

```bash
# VS Code mein: "Resolve conflicts" button dikhega
# Ya manually edit karo:
# 1. <<<<, ===, >>>> markers hata do
# 2. Dono changes merge karo jaise chahiye
# 3. File save karo

# Resolved file stage karo
git add src/auth.ts

# Merge complete karo
git commit
```

### Conflicts Prevent Karne ke Tips

```
1. Chote, focused PRs banao (< 400 lines changed)
2. Main se regular pull karo feature branch pe
3. Ek file pe ek waqt ek banda kaam kare
4. Long-lived branches avoid karo
```

---

## PART 8 — GITHUB / REMOTE REPOS

### Remote Setup

```bash
# Remote dekho
git remote -v

# Remote add karo
git remote add origin https://github.com/username/repo.git

# Push karo (pehli baar)
git push -u origin main

# Ab sirf
git push

# Pull karo (latest changes lo)
git pull
git pull origin main
```

### .gitignore — Kya Commit Na Ho

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment files — KABHI commit mat karo!
.env
.env.local
.env.*.local

# Build output
.next/
out/
build/
dist/

# IDE files
.vscode/settings.json
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

### PR (Pull Request) Best Practices

```
✓ Chota rakho (< 400 lines)
✓ Ek feature ya fix — ek PR
✓ Descriptive title: "feat: add user profile page"
✓ Description mein kya aur kyun likho
✓ Screenshots agar UI change hai
✓ Self-review karo pehle
✓ CI pass hone do pehle review request karo
```

---

## PART 9 — UNDO KARNA (Panic Mode)

```bash
# ─── File undo (unstaged) ────────────────────────
git restore filename.ts          # Working dir undo
git checkout -- filename.ts      # Old syntax

# ─── Staged undo ─────────────────────────────────
git restore --staged filename.ts  # Unstage karo
git reset HEAD filename.ts        # Old syntax

# ─── Last commit undo (safe) ──────────────────────
git revert HEAD                   # New commit banata hai jo undo karta hai
                                  # Safe for shared branches!

# ─── Last commit undo (local only) ────────────────
git reset --soft HEAD~1    # Commit undo, changes staged
git reset --mixed HEAD~1   # Commit undo, changes unstaged (default)
git reset --hard HEAD~1    # Commit + changes sab undo ⚠️ Careful!

# ─── Specific commit pe jao ───────────────────────
git reset --hard abc123    # ⚠️ Sab delete ho jata hai baad ka

# ─── Kuch stash karo (temporarily) ───────────────
git stash                  # Changes stash karo
git stash pop              # Wapas lao
git stash list             # Sab stashes dekho
```

**Rule:** `git revert` safe hai (history preserve karta hai). `git reset --hard` dangerous hai — shared repos pe kabhi use mat karo.

---

## PART 10 — GIT TAGS (Versions)

```bash
# Tag banao
git tag v1.0.0
git tag -a v1.0.0 -m "First release"  # Annotated tag

# Tags dekho
git tag

# Specific commit pe tag
git tag v1.0.1 abc123

# Push tags
git push origin v1.0.0
git push origin --tags  # Sab tags push

# Tag delete karo
git tag -d v1.0.0
```

---

## PART 11 — USEFUL GIT TRICKS

```bash
# Specific commit ka diff dekho
git show abc123

# File ka blame — konse line konse commit mein aaya
git blame src/app/page.tsx

# Kab bug introduce hua? (Binary search)
git bisect start
git bisect bad              # Current commit bad hai
git bisect good v1.0.0      # Yeh commit good tha
# Git automatically commits test karta hai
# git bisect good/bad likhte raho
# Bug commit mil jayega!

# Interactive rebase — commits clean karo
git rebase -i HEAD~3        # Last 3 commits ko edit karo

# Cherry pick — specific commit doosri branch mein lao
git cherry-pick abc123

# Partial add (sirf kuch changes stage karo)
git add -p filename.ts      # Interactive patch mode
```

---

## GIT CHEATSHEET

```
┌─────────────────────────────────────────────────────┐
│                   GIT QUICK REF                     │
├─────────────────────────────────────────────────────┤
│ git init           → New repo                       │
│ git clone <url>    → Copy repo                      │
│ git status         → What changed?                  │
│ git add .          → Stage all                      │
│ git commit -m "msg"→ Save snapshot                  │
│ git push           → Upload to GitHub               │
│ git pull           → Download latest                │
│ git log --oneline  → History                        │
│ git diff           → See changes                    │
│ git branch -b name → New branch                     │
│ git merge name     → Merge branch                   │
│ git stash          → Temp save                      │
│ git revert HEAD    → Safe undo                      │
└─────────────────────────────────────────────────────┘
```

---

*Next: `11_DATABASE_GUIDE.md` padho — PostgreSQL, Prisma, Supabase*
