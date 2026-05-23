# Docker Complete Guide
*Containerization — 2026 updated patterns*

---

## WHAT IS DOCKER?

Docker is a tool that packages your application into a **"container"** — which includes the application's code, dependencies, and environment all together.

### The Problem Docker Solves:

```
Old world:
Developer: "It works on my machine!"
Server:    "It doesn't run here" 😤

After Docker:
Developer: "I created a container"
Server:    "Container is running — same environment" ✓
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
  Size: GB, Slow boot             Size: MB, Seconds to start
```

**Why containers beat VMs:**
- Starts in seconds (VM: minutes)
- Size in MB (VM: GB)
- Uses fewer resources
- Dozens can run on the same machine

---

## INSTALL DOCKER

### Windows / Mac:
Download **Docker Desktop**: [docker.com/products/docker-desktop](https://docker.com)
- One installer — everything installs

### Ubuntu Server:
```bash
# Official script
curl -fsSL https://get.docker.com | sh

# Add your user to docker group (so you don't need sudo)
sudo usermod -aG docker $USER

# Verify
docker --version       # Docker version 27.x.x
docker compose version # Docker Compose version 2.x.x
```

---

## PART 1 — DOCKER BASICS

### Key Concepts

```
IMAGE     = Blueprint (recipe) — read-only template
CONTAINER = Running instance (cooked dish) — multiple containers from one image
REGISTRY  = Image store (Docker Hub, GitHub Container Registry)
VOLUME    = Persistent storage — data survives when container stops
NETWORK   = How containers communicate with each other
```

### Essential Commands

```bash
# Download image from Docker Hub
docker pull nginx

# Run a container
docker run nginx

# Run in background (-d = detached)
docker run -d nginx

# Expose a port (host:container)
docker run -d -p 8080:80 nginx
# Open localhost:8080 in browser

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container-id>

# Delete a container
docker rm <container-id>

# View images
docker images

# Delete an image
docker rmi nginx

# Enter container (bash terminal)
docker exec -it <container-id> bash

# View container logs
docker logs <container-id>
docker logs -f <container-id>  # live follow
```

---

## PART 2 — WRITING A DOCKERFILE

A Dockerfile is a script that says — "here's how to build my image."

### Basic Dockerfile

```dockerfile
# Base image — which OS/runtime to use
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching — important!)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Command to start app
CMD ["node", "server.js"]
```

### Next.js Optimized Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image — minimal size
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### Build & Run

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 my-app

# With environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="secret" \
  my-app
```

---

## PART 3 — DOCKER COMPOSE

Docker Compose runs multiple containers together.

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Docker Compose Commands

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# Stop all services
docker compose down

# Stop and delete volumes (data!)
docker compose down -v

# View logs
docker compose logs
docker compose logs app  # specific service

# Rebuild after code change
docker compose up --build

# Run command in a service
docker compose exec app bash
docker compose exec db psql -U postgres myapp
```

---

## PART 4 — PRODUCTION DEPLOYMENT

### Docker on VPS (DigitalOcean / Hetzner)

```bash
# On your server — install Docker
curl -fsSL https://get.docker.com | sh

# Clone your repo
git clone https://github.com/yourname/your-app.git
cd your-app

# Create .env file
nano .env

# Start with compose
docker compose up -d

# Auto-restart on server reboot
docker compose up -d --restart always
```

### Using Docker Hub (Registry)

```bash
# Login
docker login

# Tag your image
docker tag my-app username/my-app:latest
docker tag my-app username/my-app:v1.0.0

# Push to registry
docker push username/my-app:latest

# Pull on server
docker pull username/my-app:latest
docker run -d -p 3000:3000 username/my-app:latest
```

### GitHub Actions — Auto Deploy

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t my-app .

      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker tag my-app ${{ secrets.DOCKER_USERNAME }}/my-app:latest
          docker push ${{ secrets.DOCKER_USERNAME }}/my-app:latest

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ubuntu
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app
            docker pull ${{ secrets.DOCKER_USERNAME }}/my-app:latest
            docker compose up -d
```

---

## PART 5 — TROUBLESHOOTING

### Common Issues

```bash
# Container won't start — check logs
docker logs <container-id>

# Port already in use
lsof -i :3000
kill -9 <PID>

# Out of disk space — clean up
docker system prune -a       # Remove unused images, containers
docker volume prune          # Remove unused volumes

# Container keeps restarting
docker logs --tail 50 <container-id>

# Can't connect to database
docker compose exec app ping db  # Test network connectivity

# Permission issues on volumes
docker compose exec app ls -la /app
```

---

*Next: Read `Server & VPS Guide` — setting up and securing your server*
