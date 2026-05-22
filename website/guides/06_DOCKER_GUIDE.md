# Docker Complete Guide
*Containerization — 2026 updated patterns*

---

## DOCKER KYA HAI?

Docker ek tool hai jo tumhara application ek **"container"** mein pack karta hai — jisme application ka code, dependencies, aur environment sab saath hota hai.

### Problem jo Docker solve karta hai:

```
Purani duniya:
Developer: "Mere computer pe kaam karta hai!"
Server:    "Mere pe nahi chal raha" 😤

Docker ke baad:
Developer: "Maine container banaya"
Server:    "Container chal raha hai — same environment" ✓
```

### Virtual Machine vs Container

```
┌──────────────────────────┐    ┌──────────────────────────┐
│   VIRTUAL MACHINE        │    │   DOCKER CONTAINER       │
├──────────────────────────┤    ├──────────────────────────┤
│  App A    │  App B       │    │  App A    │  App B       │
├──────────────────────────┤    ├──────────────────────────┤
│  Guest OS │  Guest OS    │    │  Docker Engine           │
├──────────────────────────┤    ├──────────────────────────┤
│  Hypervisor              │    │  Host OS                 │
├──────────────────────────┤    ├──────────────────────────┤
│  Host OS                 │    │  Server Hardware         │
└──────────────────────────┘    └──────────────────────────┘
  Size: GB, Slow boot             Size: MB, Seconds boot
```

**Container VM se better kyun:**
- Start hone mein seconds (VM: minutes)
- Size mein MB (VM: GB)
- Resources kam use karta hai
- Same machine pe dozens chal sakte hain

---

## DOCKER INSTALL KARO

### Windows / Mac:
**Docker Desktop** download karo: [docker.com/products/docker-desktop](https://docker.com)
- Ek installer — sab kuch install ho jata hai

### Ubuntu Server:
```bash
# Official script
curl -fsSL https://get.docker.com | sh

# Apna user docker group mein add karo (sudo na likhna pade)
sudo usermod -aG docker $USER

# Verify
docker --version       # Docker version 27.x.x
docker compose version # Docker Compose version 2.x.x
```

---

## PART 1 — DOCKER BASICS

### Key Concepts

```
IMAGE    = Blueprint (recipe) — read-only template
CONTAINER = Running instance (cooked dish) — ek image se multiple containers
REGISTRY = Image store (Docker Hub, GitHub Container Registry)
VOLUME   = Persistent storage — container band ho toh data bache
NETWORK  = Containers kaise ek doosre se baat karte hain
```

### Pehle Commands Seekho

```bash
# Image download karo Docker Hub se
docker pull nginx

# Container chala'o
docker run nginx

# Background mein chala'o (-d = detached)
docker run -d nginx

# Port expose karo (host:container)
docker run -d -p 8080:80 nginx
# Ab browser mein localhost:8080 kholo

# Running containers dekho
docker ps

# Sab containers dekho (band wale bhi)
docker ps -a

# Container band karo
docker stop <container-id>

# Container delete karo
docker rm <container-id>

# Images dekho
docker images

# Image delete karo
docker rmi nginx

# Container ke andar jao (bash terminal)
docker exec -it <container-id> bash

# Container ke logs dekho
docker logs <container-id>
docker logs -f <container-id>  # live follow karo
```

---

## PART 2 — DOCKERFILE LIKHNA

Dockerfile ek script hai jo batata hai — "meri image kaise bananee hai."

### Basic Dockerfile

```dockerfile
# Base image — kaunsa OS/runtime use karna hai
FROM node:20-alpine

# Working directory set karo container ke andar
WORKDIR /app

# Package files pehle copy karo (caching ke liye — zaruri!)
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki sab copy karo
COPY . .

# App build karo
RUN npm run build

# Port expose karo
EXPOSE 3000

# App start karo
CMD ["npm", "start"]
```

### Image banao aur chala'o

```bash
# Image build karo (. = current folder)
docker build -t meri-app:1.0 .

# Run karo
docker run -d -p 3000:3000 meri-app:1.0
```

---

## PART 3 — DOCKERFILE BEST PRACTICES (2026)

### 1. Chota Base Image Use Karo

```dockerfile
# BAD — 1.1 GB
FROM node:20

# GOOD — 180 MB
FROM node:20-slim

# BEST — 70 MB (Alpine Linux)
FROM node:20-alpine
```

### 2. Layer Caching — Dependencies Pehle Copy Karo

Docker har instruction ke baad layer cache karta hai. Agar koi layer change ho toh uske baad sab rebuild hota hai.

```dockerfile
# BAD — har code change pe npm install bhi chale ga
COPY . .
RUN npm install

# GOOD — npm install sirf tab chale ga jab package.json change ho
COPY package*.json ./
RUN npm install
COPY . .
```

### 3. Multi-Stage Build — Production Image Chota Karo

```dockerfile
# Stage 1: Build karo
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Sirf production files rakho
FROM node:20-alpine AS production
WORKDIR /app

# Sirf package files copy karo
COPY package*.json ./
RUN npm ci --only=production

# Build output copy karo builder se
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

**Result:** Image 1.2GB ki jagah 180MB ban jati hai — 85% chhoti!

### 4. Non-Root User (Security — 2026 MUST)

```dockerfile
FROM node:20-alpine

WORKDIR /app

# User banao (root mat chala'o!)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=production
COPY --chown=appuser:appgroup . .

# User switch karo
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
```

**Kyun zaruri hai:** Agar container hack ho toh root access nahi milega attacker ko.

### 5. .dockerignore File

`.dockerignore` file banao — jaisi `.gitignore` hoti hai:

```
node_modules
.git
.env
.env.local
*.log
dist
build
.next
coverage
README.md
.DS_Store
```

**Bina .dockerignore ke:** `node_modules` (200MB+) har baar copy hoga — slow builds!

### 6. Environment Variables

```dockerfile
# ENV = default value (image mein bake ho jata hai)
ENV NODE_ENV=production
ENV PORT=3000

# ARG = build-time variable (image mein nahi rehta)
ARG BUILD_VERSION
RUN echo "Building version: $BUILD_VERSION"
```

```bash
# Build time pe variable pass karo
docker build --build-arg BUILD_VERSION=1.5 -t meri-app .

# Runtime pe environment variable pass karo
docker run -e DATABASE_URL=postgres://... meri-app
```

---

## PART 4 — DOCKER COMPOSE (Multiple Containers)

Real apps mein aksar multiple services hoti hain: app + database + cache. Docker Compose sab saath manage karta hai.

### docker-compose.yml — Basic

```yaml
version: '3.9'

services:
  # App (Next.js / Node)
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped

  # PostgreSQL Database
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # Redis Cache
  cache:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  postgres_data:  # Data persist karne ke liye
```

### Compose Commands

```bash
# Sab services start karo (background mein)
docker compose up -d

# Start karo aur fresh build karo
docker compose up -d --build

# Status dekho
docker compose ps

# Logs dekho
docker compose logs
docker compose logs app      # sirf ek service ke
docker compose logs -f app   # live follow

# Services band karo
docker compose down

# Band karo aur volumes bhi delete karo (data delete ho ga!)
docker compose down -v

# Ek service restart karo
docker compose restart app

# Database ke andar jao
docker compose exec db psql -U postgres -d mydb
```

### .env File ke saath Compose

**docker-compose.yml:**
```yaml
services:
  app:
    env_file:
      - .env
```

**.env:**
```env
DATABASE_URL=postgresql://postgres:secret@db:5432/mydb
JWT_SECRET=supersecretkey123
```

**.env** file kabhi git mein commit mat karo!

---

## PART 5 — PRODUCTION DOCKER (2026 Patterns)

### Resource Limits — Zaruri Hai

```yaml
services:
  app:
    image: meri-app:latest
    deploy:
      resources:
        limits:
          memory: 512M    # Max 512MB RAM
          cpus: '0.5'     # Max 50% of one CPU core
        reservations:
          memory: 256M    # Minimum guaranteed RAM
          cpus: '0.25'
```

**Kyun:** Bina limits ke ek faulty container poora server ka RAM kha sakta hai.

### Health Checks

```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s      # Har 30 seconds check karo
      timeout: 10s       # 10 seconds mein respond kare
      retries: 3         # 3 fails ke baad unhealthy mark karo
      start_period: 40s  # Start mein 40 seconds grace period do
```

### Volumes — Data Preserve Karo

```yaml
volumes:
  # Named volume (Docker manage karta hai)
  postgres_data:
    driver: local

  # Bind mount (specific folder use karo)
  # services mein:
  # volumes:
  #   - ./uploads:/app/uploads
```

### Production Compose Complete Example

```yaml
version: '3.9'

services:
  app:
    image: ghcr.io/username/meri-app:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"  # Sirf localhost se accessible
    env_file: .env.production
    depends_on:
      db:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"    # Max 10MB per log file
        max-file: "3"      # Max 3 log files rako

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    env_file: .env.production
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

---

## PART 6 — DOCKER REGISTRY (Image Store)

### Docker Hub (Public, Free)

```bash
# Login karo
docker login

# Image tag karo
docker tag meri-app:latest username/meri-app:latest

# Push karo
docker push username/meri-app:latest

# Pull karo
docker pull username/meri-app:latest
```

### GitHub Container Registry (Recommended 2026)

```bash
# Login (GitHub token se)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag karo
docker tag meri-app:latest ghcr.io/username/meri-app:latest

# Push karo
docker push ghcr.io/username/meri-app:latest
```

### Versioning — Hamesha Karo

```bash
# BAD — latest sirf use karo local dev mein
docker tag app:latest username/app:latest

# GOOD — version bhi tag karo
docker tag app:latest username/app:v1.2.3
docker tag app:latest username/app:latest

# Push dono
docker push username/app:v1.2.3
docker push username/app:latest
```

---

## PART 7 — DOCKER SECURITY CHECKLIST (2026)

```
✓ Non-root user container ke andar
✓ Alpine/slim base images
✓ Multi-stage builds
✓ .dockerignore mein node_modules, .env, .git
✓ Secrets ENV variables se — hardcode mat karo
✓ Resource limits (memory + CPU) set karo
✓ Health checks lagao
✓ Image vulnerability scan karo (docker scout)
✓ Log rotation configure karo
✓ Port sirf localhost pe expose karo (127.0.0.1:3000:3000)
✓ Read-only filesystem jahan possible ho
```

### Image Scan Karo

```bash
# Docker Scout se scan karo (free)
docker scout cves meri-app:latest

# Trivy se scan karo (open source)
trivy image meri-app:latest
```

---

## PART 8 — DOCKER vs DOCKER COMPOSE vs KUBERNETES

| | Docker | Docker Compose | Kubernetes |
|---|---|---|---|
| **Kya hai** | Single container | Multi-container | Container cluster |
| **Use karo** | Dev/test | 1 server production | Multiple servers |
| **Complexity** | Low | Medium | High |
| **Cost** | Free | Free | $200-400+/mo managed |
| **Scale** | 1 container | 1 server | Infinite |
| **2026 Recommendation** | Seekhna zaroori | Small/medium apps | Enterprise only |

**Rule of thumb:**
- **Solo developer / startup:** Docker + Compose = perfect
- **50k+ users, multiple servers:** Tab Kubernetes sochna

---

## QUICK REFERENCE — Sab Commands

```bash
# ─── IMAGES ───────────────────────────────────────
docker build -t app:1.0 .          # Build
docker images                       # List
docker rmi app:1.0                  # Delete
docker pull nginx:alpine            # Download

# ─── CONTAINERS ───────────────────────────────────
docker run -d -p 3000:3000 app:1.0  # Run background
docker ps                           # Running dekho
docker ps -a                        # Sab dekho
docker stop <id>                    # Stop
docker rm <id>                      # Delete
docker exec -it <id> sh             # Inside jao

# ─── COMPOSE ──────────────────────────────────────
docker compose up -d                # Start all
docker compose up -d --build        # Rebuild + start
docker compose down                 # Stop all
docker compose ps                   # Status
docker compose logs -f app          # Live logs

# ─── CLEANUP ──────────────────────────────────────
docker system prune                 # Unused sab delete
docker system prune -a              # Images bhi delete
docker volume prune                 # Unused volumes delete
```

---

*Next: `07_SERVER_VPS_GUIDE.md` padho — VPS khareedhna aur server setup karna*
