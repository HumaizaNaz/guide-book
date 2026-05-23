# Developer Toolkit Guide
*VS Code, Terminal, Extensions, Productivity — 2026*

---

## WHY DOES DEVELOPER SETUP MATTER?

```
Bad setup:   Slow tools + manual tasks = 2 hours wasted daily
Good setup:  Fast tools + automation = Same work in 30 min
Difference:  10 hours/week = 500 hours/year = free up your time
```

Set it up once — benefit for your entire developer career.

---

## PART 1 — IDE CHOICE (2026)

### Option 1: Cursor (Recommended for Most)

```
Download from cursor.com

Why Cursor:
✓ AI-first version of VS Code
✓ All VS Code extensions work
✓ AI features built-in (no extra plugin)
✓ Tab autocomplete is very smart
✓ Multi-file AI edits
Price: $20/month
```

### Option 2: VS Code + Copilot (Budget)

```
Download from code.visualstudio.com
+ GitHub Copilot extension ($10/month)

Why VS Code:
✓ Free
✓ Most popular IDE of all
✓ Massive extension ecosystem
✓ Microsoft-backed
✓ Documentation everywhere
```

### Option 3: JetBrains WebStorm (Professional)

```
jetbrains.com/webstorm

Why WebStorm:
✓ Best for TypeScript/JavaScript
✓ Built-in refactoring tools
✓ Database viewer
✓ Better code intelligence
Price: $7.90/month
Why not: Slow startup, paid
```

**Recommendation:** Use Cursor — VS Code familiarity + AI power.

---

## PART 2 — VS CODE / CURSOR EXTENSIONS (Must Have)

### How to Install

```
Ctrl+Shift+X  → Extensions panel
Or Command Palette (Ctrl+Shift+P) → "ext install"
```

### Category 1: Code Quality (Essential)

```
Prettier - Code formatter
  ID: esbenp.prettier-vscode
  Purpose: Automatically format code (spacing, quotes, etc.)

ESLint
  ID: dbaeumer.vscode-eslint
  Purpose: Show JavaScript/TypeScript errors in real time

Error Lens
  ID: usernamehw.errorlens
  Purpose: Show errors inline (at the end of the line) — essential!
```

### Category 2: Git (Essential)

```
GitLens
  ID: eamodio.gitlens
  Purpose: Git history line by line, blame, comparisons
  Best feature: Show commit history on hover

Git Graph
  ID: mhutchie.git-graph
  Purpose: Visual git tree — easy to see branches and merges
```

### Category 3: Productivity

```
Auto Rename Tag
  ID: formulahendry.auto-rename-tag
  Purpose: Rename HTML/JSX opening tag → closing tag updates too

Bracket Pair Colorizer (Built-in VS Code now)
  In settings: "editor.bracketPairColorization.enabled": true

Path Intellisense
  ID: christian-kohler.path-intellisense
  Purpose: Autocomplete file paths

Multiple Cursor (Built-in)
  Alt+Click → Multiple cursors
  Ctrl+D → Select next occurrence
```

### Category 4: Next.js / React

```
ES7+ React/Redux/React-Native snippets
  ID: dsznajder.es7-react-js-snippets
  Shortcuts: rafce → React component, useS → useState

Tailwind CSS IntelliSense
  ID: bradlc.vscode-tailwindcss
  Purpose: Tailwind class autocomplete + preview

Prisma
  ID: Prisma.prisma
  Purpose: Syntax highlighting + formatting for schema.prisma
```

### Category 5: Remote Dev

```
Remote - SSH
  ID: ms-vscode-remote.remote-ssh
  Purpose: Open VS Code remotely on a server — feels like local
  Use: Edit code on your VPS from your own machine

Dev Containers
  ID: ms-vscode-remote.remote-containers
  Purpose: Develop inside a Docker container
  Use: Guarantees the same environment across the team
```

---

## PART 3 — VS CODE SETTINGS (Important)

```json
// settings.json (Ctrl+Shift+P → "Open User Settings JSON")
{
  // Editor basics
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono, Fira Code, Consolas, monospace",
  "editor.fontLigatures": true,          // → <= >= arrows
  "editor.tabSize": 2,
  "editor.formatOnSave": true,           // Format on save
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.minimap.enabled": false,       // Minimap off (distraction)
  "editor.wordWrap": "on",

  // Cursor features
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,

  // File explorer
  "explorer.confirmDelete": false,       // Skip confirm dialog
  "explorer.confirmDragAndDrop": false,

  // Terminal
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.defaultProfile.windows": "PowerShell",

  // Auto save
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,           // 1 second

  // TypeScript
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always",

  // Git
  "git.autofetch": true,
  "git.confirmSync": false,

  // Prettier
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "prettier.printWidth": 100
}
```

---

## PART 4 — KEYBOARD SHORTCUTS (Must Memorize)

### Most Used

```
Ctrl+P            → Find a file (Go to file)
Ctrl+Shift+P      → Command palette (everything)
Ctrl+`            → Toggle terminal
Ctrl+B            → Toggle sidebar

Ctrl+/            → Toggle line comment
Ctrl+Shift+/      → Block comment
Alt+Shift+F       → Format document

Ctrl+D            → Select next occurrence
Ctrl+Shift+L      → Select all occurrences
Alt+Click         → Multiple cursors

Ctrl+Shift+K      → Delete line
Alt+Up/Down       → Move line
Alt+Shift+Up/Down → Duplicate line

F12               → Go to definition
Alt+F12           → Peek definition
Shift+F12         → Find all references
F2                → Rename symbol (across all files!)

Ctrl+Z            → Undo
Ctrl+Shift+Z      → Redo
Ctrl+S            → Save
```

### VS Code Tricks

```
Ctrl+G              → Go to line number
Ctrl+Home/End       → File start/end
Ctrl+F              → Find in file
Ctrl+H              → Find + Replace
Ctrl+Shift+F        → Find in all files

Ctrl+K + Ctrl+C     → Comment selection
Ctrl+K + Ctrl+U     → Uncomment selection

Ctrl+Space          → Trigger autocomplete
Ctrl+Shift+Space    → Parameter hints

Ctrl+Tab            → Switch between open files
Ctrl+W              → Close tab
Ctrl+Shift+T        → Reopen closed tab
```

---

## PART 5 — TERMINAL SETUP

### Windows: WSL (Windows Subsystem for Linux)

```powershell
# In PowerShell (Admin)
wsl --install

# Ubuntu will be installed
# Restart
# Set up Ubuntu
```

**Why WSL:** Run Linux commands on Windows — development tools work much better.

### Terminal Emulators

```
Windows: Windows Terminal (Microsoft Store) — tabs, splits, themes
Mac:     iTerm2 (free) or Warp (AI-powered)
Linux:   Kitty or Alacritty (fast)
```

### Oh My Zsh (Beautify Terminal + Shortcuts)

```bash
# Install Zsh
sudo apt install zsh -y

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Add plugins to ~/.zshrc:
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z)

# Install plugins:
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

**Benefits:**
- `zsh-autosuggestions`: Suggests previous commands in grey → accept with Tab
- `zsh-syntax-highlighting`: Correct commands in green, wrong in red
- `z`: Jump to frequently visited directories with `z projects`

---

## PART 6 — ESSENTIAL CLI TOOLS

### Must Have

```bash
# Node.js version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20       # Install Node 20
nvm use 20          # Use it
nvm ls              # List available versions

# Package managers
npm  — Default, works everywhere
pnpm — Fast, disk efficient (npm i -g pnpm)
bun  — Blazing fast, JS runtime + package manager

# Git helper
gh auth login       # GitHub CLI
gh repo create      # Create a repo
gh pr create        # Create a PR
gh pr checkout 123  # Checkout a PR

# Process manager (on server)
pm2 install globally: npm install -g pm2
pm2 start app.js
pm2 status
pm2 logs
pm2 restart app
```

### Useful Everyday Tools

```bash
# Better ls
apt install exa       # exa -la (modern ls)
# or bat instead of cat
apt install bat       # bat filename.ts (syntax highlighted)

# Tree view
apt install tree      # tree src/

# Test HTTP requests
apt install httpie    # http GET localhost:3000/api/users
# or curl works too

# Process viewer
apt install htop      # Better than top

# Quick port check
lsof -i :3000         # What is running on port 3000?
```

---

## PART 7 — PROJECT SETUP TEMPLATE

### A Perfect .prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### .eslintrc.json (Next.js)

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### tsconfig.json (Recommended Paths)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### .editorconfig (Consistent across team)

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

---

## PART 8 — USEFUL WEBSITES & TOOLS

### Daily Use

```
localhost:3000         → Your running app
localhost:5555         → Prisma Studio (database GUI)

caniuse.com            → Browser support check (CSS/JS features)
bundlephobia.com       → Check npm package size before adding it
regex101.com           → Test regular expressions
jwt.io                 → Decode JWT tokens
transform.tools        → JSON → TypeScript types, JSON → Prisma schema

excalidraw.com         → Quick diagrams
dbdiagram.io           → Database schema diagrams
```

### Documentation (Bookmark These)

```
next.js → nextjs.org/docs
prisma  → prisma.io/docs
tailwind→ tailwindcss.com/docs
react   → react.dev
typescript → typescriptlang.org/docs
supabase → supabase.com/docs
```

### Chrome Extensions (Dev Tools)

```
React DevTools       → Inspect React component tree
Redux DevTools       → State debugging
JSON Viewer          → Make API responses readable
Wappalyzer           → See the tech stack of any website
ColorZilla           → Color picker
```

---

## PART 9 — FONTS FOR CODING

### Best Monospace Fonts (2026)

```
JetBrains Mono  → Best ligatures, most popular developer font (FREE)
Fira Code       → Clean ligatures (FREE)
Cascadia Code   → Microsoft, Windows Terminal default
Monaspace       → GitHub's new font family

Install JetBrains Mono:
  jetbrains.com/lp/mono → Download → Install
  VS Code settings: "editor.fontFamily": "JetBrains Mono"
```

---

## PART 10 — COMPLETE DEVELOPER MACHINE SETUP CHECKLIST

### Windows (Fresh Setup)

```
Day 1 — Foundation:
✓ Install Windows Terminal (Microsoft Store)
✓ Install WSL2 + Ubuntu
✓ Install + configure Git (name, email)
✓ Install Node.js via nvm
✓ Install VS Code or Cursor
✓ Install JetBrains Mono font

Day 1 — Extensions:
✓ Prettier, ESLint, Error Lens
✓ GitLens
✓ Tailwind CSS IntelliSense
✓ Prisma
✓ GitHub Copilot or Cursor subscription

Day 2 — Fine-tune:
✓ Configure settings.json
✓ Set up .prettierrc globally
✓ Install Oh My Zsh (in WSL)
✓ Install zsh plugins (autosuggestions, syntax-highlighting)
✓ Generate SSH key
✓ Add SSH key to GitHub
```

### Mac (Fresh Setup)

```
✓ Install Homebrew: brew.sh
✓ brew install git node
✓ Install nvm
✓ Download iTerm2 or Warp
✓ Install Oh My Zsh
✓ Install VS Code or Cursor
✓ Rest is same as Windows
```

---

## PRODUCTIVITY RULES (Developer Mindset)

```
1. "Works on my machine" → Always use Docker in development
2. Context switching cost → Finish one task before switching
3. Boring task?           → Write a script or use AI
4. Repeating commands?   → Create an alias (alias dc="docker compose")
5. Fixed a bug?           → Write a test so it never comes back
6. New tool?              → Invest 30 min in proper setup
7. Git commit daily       → Small, focused commits
```

---

*That was the last guide! Everything is now covered.*
*See the index: `00_INDEX.md`*
