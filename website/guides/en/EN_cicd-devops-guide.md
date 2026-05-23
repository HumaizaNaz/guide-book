# CI/CD & DevOps Complete Guide
*GitHub Actions, Auto Deployment, DevOps — 2026*

---

## WHAT IS CI/CD?

```
CI = Continuous Integration
     Automatically test code on every push

CD = Continuous Delivery / Deployment
     If tests pass, automatically deploy
```

### Without CI/CD (Manual — Old Way):
```
1. Write code
2. Manually SSH into the server
3. Run git pull
4. Run npm install
5. Run npm run build
6. Restart the server
7. Check if anything broke
--- Do all of this every time = boring + error prone
```

### With CI/CD (Modern):
```
1. Write code → git push
2. *** Everything happens automatically ***
   - Tests run
   - Build happens
   - Docker image is created
   - Deployed to server
   - Health check runs
--- You just write code!
```

---

## PART 1 — GITHUB ACTIONS BASICS

GitHub Actions is the most popular CI/CD tool in 2026:
- **6 million+ workflows daily** are run
- Built right into GitHub — no separate tool needed
- Free tier is quite generous (2000 minutes/month)
- Used by 90% of Fortune 100 companies

### Folder Structure

```
your-project/
  .github/
    workflows/
      ci.yml          ← Test + Build
      deploy.yml      ← Deploy to server
      release.yml     ← Create a release
```

### First Workflow — To Understand the Basics

```yaml
# .github/workflows/ci.yml

name: CI Pipeline              # Workflow name

on:                            # When does it run?
  push:
    branches: [main, develop]  # On push to these branches
  pull_request:
    branches: [main]           # On PR open

jobs:
  test:                        # Job name
    runs-on: ubuntu-latest     # Which machine to run on

    steps:
      - name: Checkout code
        uses: actions/checkout@v4   # Pin to SHA in production!

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'         # Cache dependencies

      - name: Install dependencies
        run: npm ci            # npm ci is faster and stricter than npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### GitHub Actions Key Concepts

```
workflow  = The entire automation file (.yml)
job       = A group of steps (can run in parallel)
step      = A single command or action
action    = A reusable piece (like actions/checkout)
runner    = The machine the workflow runs on
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
          # Dummy values just for the build check
          NEXT_PUBLIC_APP_URL: https://example.com
```

### Workflow 2: Vercel Deploy (CD)

```yaml
# .github/workflows/deploy-vercel.yml

name: Deploy to Vercel

on:
  push:
    branches: [main]   # Only deploy on push to main

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

### Workflow 3: Deploy to VPS (CD)

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

      - name: Build Docker image
        run: |
          docker build -t ghcr.io/${{ github.repository }}:latest .
          docker build -t ghcr.io/${{ github.repository }}:${{ github.sha }} .

      - name: Login to GitHub Container Registry
        run: echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Push image
        run: |
          docker push ghcr.io/${{ github.repository }}:latest
          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            # Commands on the server
            cd /home/deploy/my-app
            
            # Pull latest image from registry
            echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
            docker compose pull
            
            # Zero-downtime restart
            docker compose up -d --remove-orphans
            
            # Clean up old images
            docker image prune -f
            
            echo "Deploy complete! Version: ${{ github.sha }}"
```

---

## PART 3 — SECRETS MANAGEMENT

### Add GitHub Secrets

```
GitHub → Repository → Settings → Secrets and variables → Actions → New repository secret
```

### Common Secrets

```
VERCEL_TOKEN          ← From the Vercel dashboard
VERCEL_ORG_ID         ← From Vercel project settings
VERCEL_PROJECT_ID     ← From Vercel project settings

VPS_HOST              ← Server IP (e.g., 123.456.789.0)
VPS_USER              ← SSH user (e.g., deploy)
VPS_SSH_KEY           ← Private SSH key (cat ~/.ssh/id_ed25519)

DATABASE_URL          ← Production DB connection
NEXTAUTH_SECRET       ← Auth secret
```

### How to Add an SSH Key Secret

```bash
# On your local machine
cat ~/.ssh/id_ed25519
# Copy the output — paste the entire content into the GitHub Secret
# Everything from BEGIN to END
```

### 2026 Security Best Practices — Secrets

```yaml
# BAD — using branch or tag for an action
- uses: actions/checkout@main

# GOOD — pin to SHA (immutable, tamper-proof)
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2

# BAD — static credentials
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

  # JOB 2: Build + Push (after test)
  build-and-push:
    needs: test        # Run after test completes
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write  # For GHCR push

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
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/deploy/my-app
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
✓ Restrict direct pushes (merge via PR only)
```

### Environment-Specific Secrets

```
GitHub → Settings → Environments → New environment

Production environment:
  - Add required reviewers
  - Secrets: PROD_DATABASE_URL, PROD_API_KEY

Staging environment:
  - Secrets: STAGING_DATABASE_URL, STAGING_API_KEY
```

```yaml
jobs:
  deploy-prod:
    environment: production    # Specify environment
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
          # No --prod → gets a preview URL
```

### Pattern 2: Auto-Run Database Migration

```yaml
- name: Run database migrations
  run: npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Pattern 3: Scheduled Task (Cron)

```yaml
on:
  schedule:
    - cron: '0 2 * * *'    # Every day at 2am

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
        description: 'Where to deploy?'
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

### Notifications in GitHub Actions

```yaml
# Notify Slack if deploy fails
- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
    text: "Deploy FAILED on ${{ github.ref }}!"

# Also notify on success
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
- name: Run health check
  run: |
    # Give the server 60 seconds to start
    sleep 60
    
    # Check health endpoint
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

### How to Save Minutes

```yaml
# Use cache (don't reinstall dependencies every time)
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# Only trigger on relevant files
on:
  push:
    paths:
      - 'src/**'           # only on src changes
      - 'package*.json'    # or package file changes
      - '.github/workflows/**'
```

---

## PART 10 — COMPLETE DEVOPS FLOW (Summary)

```
Developer:
  1. Create a feature branch
  2. Write code
  3. Push
     ↓
  GitHub Actions CI:
  4. Tests run
  5. Build is checked
  6. Lint is checked
     ↓ (if all pass)
  7. Create a PR
  8. Code review
  9. Approve
     ↓
  GitHub Actions CD:
  10. Merge into main
  11. Docker image is built
  12. Image pushed to registry
  13. Deployed to VPS
  14. Health check passes
  15. Slack notification received ✓
```

---

## DEVOPS CHECKLIST (2026)

```
CI Setup:
✓ Create .github/workflows/ci.yml
✓ Steps for tests, lint, and build
✓ Pin action SHAs (security)
✓ Add secrets to GitHub (never hardcode)

CD Setup:
✓ Create deploy workflow (Vercel or VPS)
✓ Add branch protection rules (block direct push to main)
✓ Set up staging environment
✓ Health check after deploy

Docker:
✓ Dockerfile + .dockerignore
✓ Use GitHub Container Registry
✓ Image versioning (SHA tag)

Monitoring:
✓ Slack/email notification on deploy failure
✓ Health check endpoint: /api/health
✓ Monitor uptime with UptimeRobot
```

---

*Back to index: `00_INDEX.md`*
*Docker guide: `06_DOCKER_GUIDE.md`*
*Server guide: `07_SERVER_VPS_GUIDE.md`*
*Domain guide: `08_DOMAIN_HOSTING_GUIDE.md`*
