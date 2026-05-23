# Deployment Guide
*How to make your site live — the complete process*

---

## PART 1 — WHAT IS DEPLOYMENT?

Your code currently only exists on your laptop. Deployment = making that code available on the internet.

```
Your laptop (localhost:3000)
        ↓ git push
GitHub repository
        ↓ auto-deploy
Vercel servers
        ↓
The whole world can access it (yoursite.com)
```

---

## PART 2 — GIT WORKFLOW (UNDERSTAND THIS FIRST)

### What Is Git?
Version history for your code — every change is tracked. Made a mistake? Roll back to a previous state.

### Basic Commands
```bash
# Check status — what has changed
git status

# Stage changes
git add filename.tsx          # one file
git add neura_nest/           # one folder
git add .                     # everything (careful!)

# Commit — create a checkpoint
git commit -m "feat: add contact form"

# Push to GitHub
git push origin main

# Pull latest code (others' changes)
git pull origin main

# View history
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
# feat    — new feature
# fix     — bug fix
# style   — UI/CSS changes
# refactor — code restructure (same behavior)
# docs    — documentation
# chore   — maintenance (deps update, config)
```

### Branches (For team workflow)
```bash
# Create a new branch
git checkout -b feature/contact-form

# Do your work → commit

# Switch back to main
git checkout main

# Merge
git merge feature/contact-form

# Delete the branch
git branch -d feature/contact-form
```

**Rule:** Never commit directly to main/master. Create feature branches → test → merge.

### .gitignore (ESSENTIAL FILE)
```
# .gitignore — these files will not go into Git
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
Push to GitHub
→ Vercel automatically detects it
→ Builds it
→ Goes live
```

### Setup (One time)
1. Create an account at vercel.com
2. "New Project" → connect your GitHub repo
3. Framework: Next.js (auto-detect)
4. Add environment variables
5. Deploy!

### Manual Deploy (Command Line)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Preview deploy (for testing)
vercel

# Production deploy
vercel --prod
```

### Environment Variables on Vercel
```bash
# Via CLI
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY

# Or in the dashboard:
# vercel.com → project → Settings → Environment Variables
```

### Deployment Types
| Type | URL | When |
|------|-----|------|
| Production | yoursite.com | `vercel --prod` |
| Preview | random-hash.vercel.app | Every push (non-main) |
| Development | localhost:3000 | `npm run dev` |

---

## PART 4 — CONNECTING A DOMAIN

### Step 1: Buy a Domain
- **Namecheap** — affordable, good UI
- **GoDaddy** — popular, slightly more expensive
- **Cloudflare** — best value, extra features

### Step 2: Add it to Vercel
```
Vercel Dashboard
→ Project
→ Settings
→ Domains
→ Add "novaj.ai"
→ Add "www.novaj.ai"
```

### Step 3: Set DNS Records
Vercel will give you these records — add them in your domain registrar:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### Step 4: Wait
- DNS propagation takes 1–48 hours
- Check at: https://dnschecker.org

### www vs non-www
- Set up `novaj.ai` → `www.novaj.ai` redirect (or vice versa)
- The site should be accessible on both
- The canonical URL must be consistent

---

## PART 5 — CI/CD (Automated Testing + Deploy)

### What Is It?
```
Push → Tests run automatically
→ Tests pass = automatically deploys
→ Tests fail = does not deploy, notification sent
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

      # Vercel automatically deploys from GitHub
      # No separate deploy step needed
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

### Check in the Vercel Dashboard
- **Functions** — API route performance
- **Analytics** — Core Web Vitals
- **Logs** — Real-time server logs

### Viewing Logs
```bash
# Via CLI
vercel logs your-deployment-url

# Or: Vercel dashboard → Deployment → Functions → Logs
```

### Common Deployment Issues

| Error | Cause | Fix |
|-------|-------|-----|
| Build failed | TypeScript error | Test `npm run build` locally |
| 500 Server Error | Runtime error | Check Vercel logs |
| Env var missing | .env.local was not pushed | Add manually in Vercel dashboard |
| CSS not loading | Wrong import | Check build output |
| API 404 | Wrong file location | Check `app/api/route.ts` format |

---

## PART 8 — ROLLBACK (Emergency)

Something bad deployed? Roll back to the previous version:

```bash
# List previous deployments
vercel ls

# Promote a specific deployment
vercel promote deployment-url
```

Or: Vercel Dashboard → Deployments → Previous deployment → "Promote to Production"

---

## PART 9 — PRE-DEPLOY CHECKLIST

Check these before every deploy:

```bash
# 1. Test build locally
npm run build

# 2. TypeScript errors
npx tsc --noEmit

# 3. Console.log cleanup
grep -r "console.log" src/  # remove or comment out everything

# 4. .env variables — are they all added to Vercel?
cat .env.local  # check what's there → verify in Vercel

# 5. Images — are they all in public/?

# 6. Test on mobile viewport

# 7. Performance check
npm run build  # check bundle size
```

---

## PART 10 — SCALING (When Traffic Grows)

### Vercel Automatic Scaling
Vercel scales automatically — nothing to configure manually.

### Database Connection Pooling
```
Many requests → many DB connections → DB slow or crashes
Solution: Connection pooling (PgBouncer, built-in with Supabase)
```

### Edge Functions
```tsx
// Normal function — one server (US East)
export default function handler() { ... }

// Edge function — server closest to user
export const runtime = "edge"; // User in Pakistan → Dubai server
```

### CDN for Static Assets
Vercel automatically serves static files (`public/` folder) via CDN.

---

## SUMMARY

```
Git          → Version control, follow commit message conventions
Vercel       → Best platform for Next.js
Domain       → DNS records, 24-48h propagation
CI/CD        → GitHub Actions — auto test + deploy
Environments → Dev/Preview/Prod — separate env vars
Monitoring   → Vercel logs, Sentry, UptimeRobot
Rollback     → Instant rollback from Vercel dashboard
```

*Next: `05_PERFORMANCE_GUIDE.md`*
