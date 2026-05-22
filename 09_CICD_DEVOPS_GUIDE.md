# CI/CD & DevOps Complete Guide
*GitHub Actions, Auto Deployment, DevOps — 2026*

---

## CI/CD KYA HOTA HAI?

```
CI = Continuous Integration
     Har code push pe automatically test karo

CD = Continuous Delivery / Deployment
     Test pass ho toh automatically deploy karo
```

### Bina CI/CD (Manual — Purana Tarika):
```
1. Code likho
2. Manually server pe SSH karo
3. git pull karo
4. npm install karo
5. npm run build karo
6. Server restart karo
7. Check karo kuch toota toh nahi
--- Yeh sab baar baar karo = boring + error prone
```

### CI/CD ke Saath (Modern):
```
1. Code likho → git push karo
2. *** Sab automatic ho jata hai ***
   - Tests run hote hain
   - Build hota hai
   - Docker image banta hai
   - Server pe deploy hota hai
   - Health check hota hai
--- Tum bas code likho!
```

---

## PART 1 — GITHUB ACTIONS BASICS

GitHub Actions 2026 mein sabse popular CI/CD tool hai:
- **6 million+ workflows daily** run hote hain
- GitHub ke andar built-in — alag tool nahi chahiye
- Free tier kaafi generous hai (2000 minutes/month)
- 90% Fortune 100 companies use karti hain

### Folder Structure

```
your-project/
  .github/
    workflows/
      ci.yml          ← Test + Build
      deploy.yml      ← Deploy to server
      release.yml     ← Release create karo
```

### Pehla Workflow — Samajhne ke Liye

```yaml
# .github/workflows/ci.yml

name: CI Pipeline              # Workflow ka naam

on:                            # Kab chale?
  push:
    branches: [main, develop]  # Inpe push pe
  pull_request:
    branches: [main]           # PR open pe

jobs:
  test:                        # Job ka naam
    runs-on: ubuntu-latest     # Kis machine pe chale

    steps:
      - name: Code checkout karo
        uses: actions/checkout@v4   # SHA pin karo production mein!

      - name: Node.js setup karo
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'         # Dependencies cache karo

      - name: Dependencies install karo
        run: npm ci            # npm install ki jagah npm ci (faster, strict)

      - name: Tests chalao
        run: npm test

      - name: Build karo
        run: npm run build
```

### GitHub Actions Key Concepts

```
workflow  = Poora automation file (.yml)
job       = Ek group of steps (parallel chal sakte hain)
step      = Single command ya action
action    = Reusable piece (jaise actions/checkout)
runner    = Machine jis pe workflow chalta hai
secret    = Encrypted variables (API keys, passwords)
```

---

## PART 2 — COMPLETE CI/CD PIPELINE (Next.js App)

### Workflow 1: Test + Build (CI)

```yaml
# .github/workflows/ci.yml

name: CI — Test & Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check   # tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Build check
        run: npm run build
        env:
          # Sirf build check ke liye dummy values
          NEXT_PUBLIC_APP_URL: https://example.com
```

### Workflow 2: Vercel Deploy (CD)

```yaml
# .github/workflows/deploy-vercel.yml

name: Deploy to Vercel

on:
  push:
    branches: [main]   # Sirf main pe push pe deploy karo

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'   # Production deploy
```

### Workflow 3: VPS Pe Deploy (CD)

```yaml
# .github/workflows/deploy-vps.yml

name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Docker image build karo
        run: |
          docker build -t ghcr.io/${{ github.repository }}:latest .
          docker build -t ghcr.io/${{ github.repository }}:${{ github.sha }} .

      - name: GitHub Container Registry login
        run: echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Image push karo
        run: |
          docker push ghcr.io/${{ github.repository }}:latest
          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}

      - name: VPS pe deploy karo
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            # Server pe commands
            cd /home/deploy/meri-app
            
            # Registry se latest image pull karo
            echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
            docker compose pull
            
            # Zero-downtime restart
            docker compose up -d --remove-orphans
            
            # Old images clean karo
            docker image prune -f
            
            echo "Deploy complete! Version: ${{ github.sha }}"
```

---

## PART 3 — SECRETS MANAGEMENT

### GitHub Secrets Add Karo

```
GitHub → Repository → Settings → Secrets and variables → Actions → New repository secret
```

### Common Secrets

```
VERCEL_TOKEN          ← Vercel dashboard se
VERCEL_ORG_ID         ← Vercel project settings
VERCEL_PROJECT_ID     ← Vercel project settings

VPS_HOST              ← Server IP (e.g., 123.456.789.0)
VPS_USER              ← SSH user (e.g., deploy)
VPS_SSH_KEY           ← Private SSH key (cat ~/.ssh/id_ed25519)

DATABASE_URL          ← Production DB connection
NEXTAUTH_SECRET       ← Auth secret
```

### SSH Key Secret Kaise Add Karo

```bash
# Tumhare computer pe (local machine)
cat ~/.ssh/id_ed25519
# Output copy karo — yeh puri content GitHub Secret mein daalte hain
# BEGIN se END tak sab kuch
```

### 2026 Security Best Practices — Secrets

```yaml
# BAD — Branch ya tag se action use karo
- uses: actions/checkout@main

# GOOD — SHA pin karo (immutable, tamper-proof)
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2

# BAD — Static credentials
- uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_KEY }}

# GOOD — OIDC (no static credentials)
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/GitHubActions
    aws-region: us-east-1
```

---

## PART 4 — DOCKER + CI/CD (Full Pipeline)

### Complete Docker Pipeline

```yaml
# .github/workflows/docker-deploy.yml

name: Docker Build & Deploy

on:
  push:
    branches: [main]
  release:
    types: [published]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # JOB 1: Test
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test

  # JOB 2: Build + Push (test ke baad)
  build-and-push:
    needs: test        # test complete hone ke baad chale
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write  # GHCR push ke liye

    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}

    steps:
      - uses: actions/checkout@v4

      - name: Registry login
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Image metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=ref,event=branch
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build & Push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha    # GitHub Actions cache
          cache-to: type=gha,mode=max

  # JOB 3: Deploy to VPS
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: VPS pe deploy
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/deploy/meri-app
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f
```

---

## PART 5 — ENVIRONMENTS (Dev / Staging / Production)

### Best Practice: 3 Environments

```
main branch    → Production   (live users)
develop branch → Staging      (testing)
feature/* branches → Preview  (temporary, Vercel)
```

### Branch Protection Rules

```
GitHub → Settings → Branches → Add rule → main

✓ Require pull request reviews (1 reviewer)
✓ Require status checks to pass (CI tests)
✓ Require branches to be up to date
✓ Restrict direct pushes (sirf PR se merge)
```

### Environment-Specific Secrets

```
GitHub → Settings → Environments → New environment

Production environment:
  - Required reviewers add karo
  - Secrets: PROD_DATABASE_URL, PROD_API_KEY

Staging environment:
  - Secrets: STAGING_DATABASE_URL, STAGING_API_KEY
```

```yaml
jobs:
  deploy-prod:
    environment: production    # Environment specify karo
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        env:
          DB_URL: ${{ secrets.PROD_DATABASE_URL }}  # Env-specific secret
```

---

## PART 6 — COMMON WORKFLOW PATTERNS

### Pattern 1: PR Preview (Vercel)

```yaml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          # --prod nahi → preview URL milega
```

### Pattern 2: Database Migration Auto-Run

```yaml
- name: Database migrations run karo
  run: npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Pattern 3: Scheduled Task (Cron)

```yaml
on:
  schedule:
    - cron: '0 2 * * *'    # Roz raat 2 baje

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Old data cleanup
        run: node scripts/cleanup.js
```

### Pattern 4: Manual Trigger

```yaml
on:
  workflow_dispatch:       # Manual trigger
    inputs:
      environment:
        description: 'Deploy kahan karna hai?'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ${{ inputs.environment }}
        run: echo "Deploying to ${{ inputs.environment }}"
```

---

## PART 7 — DEVOPS FOLDER STRUCTURE

```
project/
  .github/
    workflows/
      ci.yml              ← Test + lint + build
      deploy-vercel.yml   ← Vercel deploy
      deploy-vps.yml      ← VPS deploy
      release.yml         ← Version release
    dependabot.yml        ← Auto dependency updates

  docker/
    Dockerfile            ← Production image
    Dockerfile.dev        ← Development image
    .dockerignore

  scripts/
    backup.sh             ← Database backup
    health-check.sh       ← Server health check
    deploy.sh             ← Manual deploy script

  docker-compose.yml      ← Development
  docker-compose.prod.yml ← Production
```

---

## PART 8 — MONITORING & ALERTING

### GitHub Actions Mein Notifications

```yaml
# Slack mein notify karo agar deploy fail ho
- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
    text: "Deploy FAILED on ${{ github.ref }}!"

# Success pe bhi notify
- name: Notify success
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
    text: "Deploy successful! ✓"
```

### Health Check After Deploy

```yaml
- name: Health check karo
  run: |
    # 60 second wait do server start hone ke liye
    sleep 60
    
    # Health endpoint check karo
    response=$(curl -s -o /dev/null -w "%{http_code}" https://novaj.ai/api/health)
    
    if [ $response -eq 200 ]; then
      echo "Health check passed!"
    else
      echo "Health check FAILED! Status: $response"
      exit 1
    fi
```

---

## PART 9 — GITHUB ACTIONS COSTS

### Free Tier (2026)

| Plan | Free Minutes/Month | Concurrent Jobs |
|------|--------------------|----------------|
| **Free** | 2,000 min | 20 |
| **Pro** | 3,000 min | 40 |
| **Team** | 3,000 min | 60 |

### Minutes Kaise Bachao

```yaml
# Cache use karo (dependencies baar baar install na ho)
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# Sirf relevant files pe trigger karo
on:
  push:
    paths:
      - 'src/**'           # sirf src change pe
      - 'package*.json'    # ya package files pe
      - '.github/workflows/**'
```

---

## PART 10 — COMPLETE DEVOPS FLOW (Summary)

```
Developer:
  1. Feature branch banao
  2. Code likho
  3. Push karo
     ↓
  GitHub Actions CI:
  4. Tests chalte hain
  5. Build check hota hai
  6. Lint check hota hai
     ↓ (agar sab pass)
  7. PR banao
  8. Code review
  9. Approve karo
     ↓
  GitHub Actions CD:
  10. main mein merge
  11. Docker image build hota hai
  12. Image registry pe push hota hai
  13. VPS pe deploy hota hai
  14. Health check pass hota hai
  15. Slack notification milti hai ✓
```

---

## DEVOPS CHECKLIST (2026)

```
CI Setup:
✓ .github/workflows/ci.yml banao
✓ Tests, lint, build sabke steps
✓ Actions SHA pin karo (security)
✓ Secrets GitHub mein add karo (never hardcode)

CD Setup:
✓ Deploy workflow banao (Vercel ya VPS)
✓ Branch protection rules lagao (main pe direct push band)
✓ Staging environment setup karo
✓ Health check after deploy

Docker:
✓ Dockerfile + .dockerignore
✓ GitHub Container Registry use karo
✓ Image versioning (SHA tag)

Monitoring:
✓ Deploy failure pe Slack/email notification
✓ Health check endpoint: /api/health
✓ UptimeRobot se uptime monitor
```

---

*Back to index: `00_INDEX.md`*
*Docker guide: `06_DOCKER_GUIDE.md`*
*Server guide: `07_SERVER_VPS_GUIDE.md`*
*Domain guide: `08_DOMAIN_HOSTING_GUIDE.md`*
