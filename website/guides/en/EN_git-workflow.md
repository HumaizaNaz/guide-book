# Git Workflow Complete Guide
*Version control, branching, PRs, conflicts — 2026*

---

## WHAT IS GIT?

Git = Version control system — tracks the history of your code.

```
Without Git:
  project_final.zip
  project_final_v2.zip
  project_ACTUAL_final.zip
  project_REAL_final_THIS_ONE.zip  😭

With Git:
  git log
  commit abc123 — "Fix login bug"
  commit def456 — "Add payment page"
  commit ghi789 — "Initial setup"
  
  Every change tracked, reversible, explained
```

---

## PART 1 — GIT INSTALL & SETUP

```bash
# Install (Ubuntu/Debian)
sudo apt install git -y

# Install (Windows) — download from git-scm.com

# Global config (do once)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"  # VS Code as default editor

# Verify config
git config --list
```

---

## PART 2 — DAILY GIT COMMANDS

### Starting a New Project

```bash
# Option 1: Create new repo
git init
git add .
git commit -m "Initial commit"

# Option 2: Clone from GitHub
git clone https://github.com/username/repo-name.git
cd repo-name
```

### Daily Workflow

```bash
# 1. Check status — what changed?
git status

# 2. See what changed (line by line)
git diff

# 3. Stage changes (prepare for commit)
git add filename.ts          # Specific file
git add src/                  # Entire folder
git add .                     # Everything (use carefully)

# 4. View staged changes
git diff --staged

# 5. Commit
git commit -m "Add user authentication"

# 6. Push to GitHub
git push origin main
```

### Viewing History

```bash
# Simple log
git log --oneline

# Detailed log
git log

# History of specific file
git log --oneline -- src/app/page.tsx

# Visual graph (with branches)
git log --oneline --graph --all
```

### Undoing Changes

```bash
# Unstage a file (keep changes in working directory)
git restore --staged filename.ts

# Discard changes in working directory (CAREFUL — permanent)
git restore filename.ts

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Go back to specific commit (CAREFUL)
git reset --hard abc123
```

---

## PART 3 — BRANCHING STRATEGY

### Why Branch?
- `main` is always stable — live code runs from here
- Every feature/bug fix gets its own branch
- Test and review before merging to main

### Branch Commands
```bash
# Create and switch to new branch
git checkout -b feature/user-dashboard

# Switch between branches
git checkout main
git checkout feature/user-dashboard

# List all branches
git branch
git branch -a  # Including remote branches

# Delete branch (after merge)
git branch -d feature/user-dashboard

# Push branch to GitHub
git push -u origin feature/user-dashboard
```

### Branch Naming Convention
```
feature/user-authentication    # New feature
fix/login-redirect-bug         # Bug fix
hotfix/critical-payment-error  # Urgent fix
chore/update-dependencies      # Maintenance
docs/api-documentation         # Documentation
```

---

## PART 4 — GITHUB WORKFLOW (Pull Requests)

### Standard Workflow
```
1. Create branch: git checkout -b feature/new-feature
2. Write code + commit regularly
3. Push: git push origin feature/new-feature
4. Open PR on GitHub
5. Code review
6. Merge to main
7. Delete branch
```

### Good Commit Messages
```bash
# BAD
git commit -m "fix"
git commit -m "changes"
git commit -m "asdfgh"

# GOOD
git commit -m "Fix login redirect after OAuth"
git commit -m "Add Stripe webhook handler"
git commit -m "Update user schema: add phone field"

# Format: <type>: <short description>
# Types: feat, fix, chore, docs, refactor, test, style
git commit -m "feat: add two-factor authentication"
git commit -m "fix: resolve null pointer in payment flow"
```

---

## PART 5 — RESOLVING MERGE CONFLICTS

### When Do Conflicts Happen?
When two people edit the same lines in the same file.

### Resolving
```bash
# Conflict looks like this in the file:
<<<<<<< HEAD (your changes)
const title = "My App"
=======
const title = "Our Application"
>>>>>>> feature/update-title (incoming changes)

# Steps:
# 1. Open the file
# 2. Delete the conflict markers
# 3. Keep the correct version (or combine both)
# 4. Save file
# 5. git add filename.ts
# 6. git commit -m "Resolve merge conflict in title"
```

### VS Code helps with conflicts:
- Shows "Accept Current Change", "Accept Incoming Change", "Accept Both"
- Click the option that's correct

---

## PART 6 — GIT BEST PRACTICES

### The Golden Rules
```
✓ Commit frequently — small, focused commits
✓ Write meaningful commit messages
✓ Pull before push (get latest changes first)
✓ Never force push to main
✓ Review your changes before committing (git diff --staged)
✓ Use .gitignore — don't commit node_modules, .env, build files
```

### .gitignore (Essential)
```
# Dependencies
node_modules/
.pnp/

# Build output
.next/
dist/
build/

# Environment variables
.env
.env.local
.env.production

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
```

### Useful Aliases
```bash
# Add to ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  lg = log --oneline --graph --all
  undo = reset --soft HEAD~1
```

---

## PART 7 — GITHUB ACTIONS (CI/CD)

### Auto-run Tests on PR
```yaml
# .github/workflows/test.yml
name: Run Tests

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

---

*Next: Read `Database Guide` — PostgreSQL, Prisma, Supabase in detail*
