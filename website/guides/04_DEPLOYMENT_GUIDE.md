# Deployment Guide
*Site live kaise karte hain — pura process*

---

## PART 1 — DEPLOYMENT KYA HAI?

Tumhara code abhi sirf tumhare laptop pe hai. Deployment = woh code internet pe available karna.

```
Tumhara laptop (localhost:3000)
        ↓ git push
GitHub repository
        ↓ auto-deploy
Vercel servers
        ↓
Poori duniya access kar sakti hai (yoursite.com)
```

---

## PART 2 — GIT WORKFLOW (SABSE PEHLE SAMJHO)

### Git Kya Hai?
Code ka version history — har change track hota hai. Galti ho gayi? Pehle wali state pe wapas jao.

### Basic Commands
```bash
# Status dekho — kya kya change hua
git status

# Changes stage karo
git add filename.tsx          # ek file
git add neura_nest/           # ek folder
git add .                     # sab kuch (careful!)

# Commit karo — ek checkpoint banao
git commit -m "feat: add contact form"

# GitHub pe push karo
git push origin main

# Latest code laao (doosron ke changes)
git pull origin main

# History dekho
git log --oneline
```

### Commit Message Format
```bash
# Format: type: description

feat: add user authentication
fix: resolve mobile navbar overlap
style: update button colors to match brand
refactor: split ProductCard into smaller components
docs: update README with setup instructions
chore: update dependencies

# Types:
# feat    — naya feature
# fix     — bug fix
# style   — UI/CSS changes
# refactor — code restructure (behavior same)
# docs    — documentation
# chore   — maintenance (deps update, config)
```

### Branches (Team workflow ke liye)
```bash
# Naya branch banao
git checkout -b feature/contact-form

# Apna kaam karo → commit karo

# Main pe wapas jao
git checkout main

# Merge karo
git merge feature/contact-form

# Branch delete karo
git branch -d feature/contact-form
```

**Rule:** Main/Master branch pe seedha mat karo. Feature branches banao → test karo → merge karo.

### .gitignore (ZAROORI FILE)
```
# .gitignore — yeh files Git mein nahi jayengi
node_modules/
.env
.env.local
.env.production
.next/
dist/
build/
*.log
.DS_Store
```

---

## PART 3 — VERCEL DEPLOYMENT

### Automatic Deployment (Best Way)
```
GitHub pe push karo
→ Vercel automatically detect karta hai
→ Build karta hai
→ Live ho jata hai
```

### Setup (Ek baar)
1. vercel.com pe account banao
2. "New Project" → GitHub repo connect karo
3. Framework: Next.js (auto-detect)
4. Environment variables add karo
5. Deploy!

### Manual Deploy (Command Line)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Preview deploy (test ke liye)
vercel

# Production deploy
vercel --prod
```

### Environment Variables Vercel Pe
```bash
# CLI se
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY

# Ya dashboard mein:
# vercel.com → project → Settings → Environment Variables
```

### Deployment Types
| Type | URL | Kab |
|------|-----|-----|
| Production | yoursite.com | `vercel --prod` |
| Preview | random-hash.vercel.app | Har push (non-main) |
| Development | localhost:3000 | `npm run dev` |

---

## PART 4 — DOMAIN CONNECT KARNA

### Step 1: Domain Kharido
- **Namecheap** — sasta, good UI
- **GoDaddy** — popular, thoda mehnga
- **Cloudflare** — best value, extra features

### Step 2: Vercel mein add karo
```
Vercel Dashboard
→ Project
→ Settings
→ Domains
→ Add "novaj.ai"
→ Add "www.novaj.ai"
```

### Step 3: DNS Records set karo
Vercel tumhe yeh records dega — apne domain registrar mein add karo:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### Step 4: Wait karo
- DNS propagate hone mein 1-48 hours lagte hain
- Check karo: https://dnschecker.org

### www vs non-www
- `novaj.ai` → `www.novaj.ai` redirect set karo (ya vice versa)
- Dono pe site accessible honi chahiye
- Canonical URL consistent hona chahiye

---

## PART 5 — CI/CD (Automated Testing + Deploy)

### Kya Hai?
```
Push karo → Tests automatically run hote hain
→ Tests pass = automatically deploy hota hai
→ Tests fail = deploy nahi hota, notification aata hai
```

### GitHub Actions (Free)
```yaml
# .github/workflows/deploy.yml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build

      # Vercel automatically deploy karta hai GitHub se
      # Separate deploy step ki zaroorat nahi
```

---

## PART 6 — ENVIRONMENT SETUP

### 3 Environments
```
Development → localhost:3000 → .env.local
Preview     → hash.vercel.app → Vercel preview env vars
Production  → novaj.ai → Vercel production env vars
```

### Different Values per Environment
```bash
# Development (.env.local)
DATABASE_URL="postgresql://localhost:5432/mydb_dev"
STRIPE_KEY="sk_test_..."  # Test mode

# Production (Vercel dashboard)
DATABASE_URL="postgresql://prod-server/mydb"
STRIPE_KEY="sk_live_..."  # Live mode
```

---

## PART 7 — MONITORING AFTER DEPLOY

### Vercel Dashboard Mein Dekho
- **Functions** — API routes ka performance
- **Analytics** — Core Web Vitals
- **Logs** — Real-time server logs

### Logs Dekhna
```bash
# CLI se
vercel logs your-deployment-url

# Ya Vercel dashboard → Deployment → Functions → Logs
```

### Common Deployment Issues

| Error | Cause | Fix |
|-------|-------|-----|
| Build failed | TypeScript error | `npm run build` locally test karo |
| 500 Server Error | Runtime error | Vercel logs dekho |
| Env var missing | .env.local push nahi hua | Vercel dashboard mein manually add karo |
| CSS not loading | Wrong import | Build output check karo |
| API 404 | Wrong file location | `app/api/route.ts` format check karo |

---

## PART 8 — ROLLBACK (Emergency)

Kuch galat deploy ho gaya? Pehle wali version pe wapas jao:

```bash
# Previous deployments list karo
vercel ls

# Specific deployment ko promote karo
vercel promote deployment-url
```

Ya Vercel Dashboard → Deployments → Previous deployment → "Promote to Production"

---

## PART 9 — PRE-DEPLOY CHECKLIST

Har deploy se pehle yeh check karo:

```bash
# 1. Build locally test karo
npm run build

# 2. TypeScript errors
npx tsc --noEmit

# 3. Console.log cleanup
grep -r "console.log" src/  # sab hata do ya comment karo

# 4. .env variables — sab Vercel pe add hain?
cat .env.local  # dekho kya hai → Vercel mein check karo

# 5. Images — sab public/ mein hain?

# 6. Test on mobile viewport

# 7. Performance check
npm run build  # bundle size dekho
```

---

## PART 10 — SCALING (Jab Traffic Barhne Lage)

### Vercel Automatic Scaling
Vercel automatically scale karta hai — manually kuch nahi karna.

### Database Connection Pooling
```
Bahut requests → bahut DB connections → DB slow ya crash
Solution: Connection pooling (PgBouncer, Supabase se built-in)
```

### Edge Functions
```tsx
// Normal function — ek server (US East)
export default function handler() { ... }

// Edge function — user ke paas wala server
export const runtime = "edge"; // Pakistan ka user → Dubai server
```

### CDN for Static Assets
Vercel automatically CDN pe serve karta hai static files (`public/` folder).

---

## SUMMARY

```
Git          → Version control, commit messages follow karo
Vercel       → Next.js ke liye best platform
Domain       → DNS records, 24-48h propagation
CI/CD        → GitHub Actions — auto test + deploy
Environments → Dev/Preview/Prod — alag env vars
Monitoring   → Vercel logs, Sentry, UptimeRobot
Rollback     → Vercel dashboard se instant rollback
```

*Next: `05_PERFORMANCE_GUIDE.md`*
