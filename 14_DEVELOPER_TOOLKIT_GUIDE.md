# Developer Toolkit Guide
*VS Code, Terminal, Extensions, Productivity — 2026*

---

## DEVELOPER SETUP KYU IMPORTANT HAI?

```
Bad setup:   Slow tools + manual tasks = 2 ghante waste daily
Good setup:  Fast tools + automation = Same kaam 30 min
Difference:  10 ghante/week = 500 ghante/year = free karo apna time
```

Ek baar setup karo — puri developer life fayda uthao.

---

## PART 1 — IDE CHOICE (2026)

### Option 1: Cursor (Recommended for Most)

```
cursor.com se download karo

Kyun Cursor:
✓ VS Code ka AI-first version
✓ Tamam VS Code extensions kaam karte hain
✓ AI features built-in (no extra plugin)
✓ Tab autocomplete bahut smart hai
✓ Multi-file AI edits
Price: $20/month
```

### Option 2: VS Code + Copilot (Budget)

```
code.visualstudio.com se download karo
+ GitHub Copilot extension ($10/month)

Kyun VS Code:
✓ Free
✓ Tamam IDEs mein most popular
✓ Massive extension ecosystem
✓ Microsoft ka support
✓ Har jagah documentation
```

### Option 3: JetBrains WebStorm (Professional)

```
jetbrains.com/webstorm

Kyun WebStorm:
✓ TypeScript/JavaScript ke liye best
✓ Built-in refactoring tools
✓ Database viewer
✓ Better code intelligence
Price: $7.90/month
Kyun nahi: Slow startup, paid
```

**Recommendation:** Cursor use karo — VS Code familiarity + AI powers.

---

## PART 2 — VS CODE / CURSOR EXTENSIONS (Must Have)

### Install Karne Ka Tarika

```
Ctrl+Shift+X  → Extensions panel
Ya command palette (Ctrl+Shift+P) → "ext install"
```

### Category 1: Code Quality (Essential)

```
Prettier - Code formatter
  ID: esbenp.prettier-vscode
  Kaam: Code automatically format karo (spacing, quotes, etc.)

ESLint
  ID: dbaeumer.vscode-eslint
  Kaam: JavaScript/TypeScript errors real-time dikhao

Error Lens
  ID: usernamehw.errorlens
  Kaam: Errors inline dikhao (line end pe) — zaroori!
```

### Category 2: Git (Essential)

```
GitLens
  ID: eamodio.gitlens
  Kaam: Git history line by line, blame, comparisons
  Best feature: Hover pe commit history dikhao

Git Graph
  ID: mhutchie.git-graph
  Kaam: Visual git tree — branches aur merges dekhna easy
```

### Category 3: Productivity

```
Auto Rename Tag
  ID: formulahendry.auto-rename-tag
  Kaam: HTML/JSX opening tag rename karo → closing bhi update

Bracket Pair Colorizer (Built-in VS Code now)
  Settings mein: "editor.bracketPairColorization.enabled": true

Path Intellisense
  ID: christian-kohler.path-intellisense
  Kaam: File paths autocomplete

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
  Kaam: Tailwind classes autocomplete + preview

Prisma
  ID: Prisma.prisma
  Kaam: schema.prisma file syntax highlighting + format
```

### Category 5: Remote Dev

```
Remote - SSH
  ID: ms-vscode-remote.remote-ssh
  Kaam: Server pe VS Code remote open karo — local jaisi feel
  Use: VPS pe code edit karo apne machine se

Dev Containers
  ID: ms-vscode-remote.remote-containers
  Kaam: Docker container ke andar develop karo
  Use: Team mein same environment guarantee
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
  "editor.formatOnSave": true,           // Save pe format
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.minimap.enabled": false,       // Minimap off (distraction)
  "editor.wordWrap": "on",

  // Cursor features
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.bracketPairColorization.enabled": true,

  // File explorer
  "explorer.confirmDelete": false,       // Confirm dialog skip
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
Ctrl+P            → File dhundho (Go to file)
Ctrl+Shift+P      → Command palette (everything)
Ctrl+`            → Terminal toggle
Ctrl+B            → Sidebar toggle

Ctrl+/            → Line comment toggle
Ctrl+Shift+/      → Block comment
Alt+Shift+F       → Format document

Ctrl+D            → Select next occurrence
Ctrl+Shift+L      → Select all occurrences
Alt+Click         → Multiple cursors

Ctrl+Shift+K      → Line delete
Alt+Up/Down       → Line move
Alt+Shift+Up/Down → Line duplicate

F12               → Go to definition
Alt+F12           → Peek definition
Shift+F12         → Find all references
F2                → Rename symbol (all files!)

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
# PowerShell mein (Admin)
wsl --install

# Ubuntu install hoga
# Restart karo
# Ubuntu setup karo
```

**Kyun WSL:** Linux commands Windows pe chalao — development tools better kaam karte hain.

### Terminal Emulators

```
Windows: Windows Terminal (Microsoft Store) — tabs, splits, themes
Mac:     iTerm2 (free) ya Warp (AI-powered)
Linux:   Kitty ya Alacritty (fast)
```

### Oh My Zsh (Terminal Beautify + Shortcuts)

```bash
# Install Zsh
sudo apt install zsh -y

# Oh My Zsh install karo
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Plugins add karo ~/.zshrc mein:
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z)

# Plugins install karo:
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

**Benefits:**
- `zsh-autosuggestions`: Purani commands grey mein suggest karta hai → Tab se accept
- `zsh-syntax-highlighting`: Correct commands green, wrong red
- `z`: Frequently visited directories mein jump karo `z projects`

---

## PART 6 — ESSENTIAL CLI TOOLS

### Must Have

```bash
# Node.js version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20       # Node 20 install
nvm use 20          # Use karo
nvm ls              # Available versions

# Package managers
npm  — Default, works everywhere
pnpm — Fast, disk efficient (npm i -g pnpm)
bun  — Blazing fast, JS runtime + package manager

# Git helper
gh auth login       # GitHub CLI
gh repo create      # Repo banao
gh pr create        # PR banao
gh pr checkout 123  # PR checkout

# Process manager (server pe)
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
# ya bat instead of cat
apt install bat       # bat filename.ts (syntax highlighted)

# Tree view
apt install tree      # tree src/

# HTTP requests test karo
apt install httpie    # http GET localhost:3000/api/users
# ya curl works too

# Process viewer
apt install htop      # Better than top

# Quick port check
lsof -i :3000         # Port 3000 pe kya chal raha hai?
```

---

## PART 7 — PROJECT SETUP TEMPLATE

### Ek Perfect .prettierrc

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
localhost:3000         → Tumhari running app
localhost:5555         → Prisma Studio (database GUI)

caniuse.com            → Browser support check (CSS/JS features)
bundlephobia.com       → npm package size check karo (add karne se pehle)
regex101.com           → Regex test karo
jwt.io                 → JWT token decode karo
transform.tools        → JSON → TypeScript types, JSON → Prisma schema

excalidraw.com         → Quick diagrams
dbdiagram.io           → Database schema diagrams
```

### Documentation (Bookmark Karo)

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
React DevTools       → React component tree inspect karo
Redux DevTools       → State debugging
JSON Viewer          → API responses readable banao
Wappalyzer           → Kisi bhi site ka tech stack dekho
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
✓ Windows Terminal install karo (Microsoft Store)
✓ WSL2 + Ubuntu install karo
✓ Git install + configure karo (name, email)
✓ Node.js via nvm install karo
✓ VS Code ya Cursor install karo
✓ JetBrains Mono font install karo

Day 1 — Extensions:
✓ Prettier, ESLint, Error Lens
✓ GitLens
✓ Tailwind CSS IntelliSense
✓ Prisma
✓ GitHub Copilot ya Cursor subscription

Day 2 — Fine-tune:
✓ settings.json configure karo
✓ .prettierrc global set karo
✓ Oh My Zsh install karo (WSL mein)
✓ zsh plugins (autosuggestions, syntax-highlighting)
✓ SSH key generate karo
✓ GitHub pe SSH key add karo
```

### Mac (Fresh Setup)

```
✓ Homebrew install karo: brew.sh
✓ brew install git node
✓ nvm install karo
✓ iTerm2 ya Warp download karo
✓ Oh My Zsh install karo
✓ VS Code ya Cursor install karo
✓ Baaki same as Windows
```

---

## PRODUCTIVITY RULES (Developer Mindset)

```
1. "Works on my machine" → Always Docker use karo development mein
2. Context switching cost → Ek task finish karo pehle
3. Boring task?           → Script banao ya AI se karo
4. Baar baar same command?→ Alias banana (alias dc="docker compose")
5. Bug fix kiya?          → Test likho taake wapas na aaye
6. Naya tool?             → 30 min invest karo sahi setup mein
7. Git commit daily       → Small, focused commits
```

---

*Yeh tha last guide! Ab sab kuch covered hai.*
*Index dekho: `00_INDEX.md`*
