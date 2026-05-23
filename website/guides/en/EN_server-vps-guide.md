# Server & VPS Complete Guide
*Buying, setting up, and securing a server — 2026*

---

## WHAT IS A VPS?

**VPS = Virtual Private Server**

```
┌─────────────────────────────────────────────────┐
│           Physical Server (Data Center)          │
├──────────────┬──────────────┬───────────────────┤
│   VPS #1     │   VPS #2     │   VPS #3          │
│  Yours       │  Someone     │  Someone           │
│  2 CPU       │  else's      │  else's            │
│  4 GB RAM    │  4 CPU       │  1 CPU            │
│  80 GB SSD   │  8 GB RAM    │  2 GB RAM         │
│              │  160 GB SSD  │  40 GB SSD        │
└──────────────┴──────────────┴───────────────────┘
```

One large server is sliced into pieces — you get dedicated resources but share the underlying hardware.

### Shared Hosting vs VPS vs Dedicated

| Feature | Shared Hosting | VPS | Dedicated Server |
|---------|---------------|-----|-----------------|
| **Control** | None | Full | Full |
| **Resources** | Shared | Guaranteed | Complete |
| **Price** | $2–5/mo | $4–50/mo | $80–500/mo |
| **Performance** | Slow, inconsistent | Good | Best |
| **Use Case** | WordPress blog | Apps/APIs | High traffic |
| **2026 Recommendation** | Avoid | ✓ Best choice | Only if needed |

---

## PART 1 — VPS PROVIDERS COMPARISON (2026)

### Top Providers and Pricing

| Provider | Entry Plan | RAM | Storage | CPU | Best For |
|----------|-----------|-----|---------|-----|----------|
| **Hetzner** | €3.29/mo | 4GB | 40GB NVMe | 2 vCPU | Best value — Europe |
| **DigitalOcean** | $6/mo | 1GB | 25GB SSD | 1 vCPU | Best DX, tutorials |
| **Vultr** | $6/mo | 1GB | 25GB SSD | 1 vCPU | Good global locations |
| **Hostinger** | $4/mo | 1GB | 20GB NVMe | 1 vCPU | Budget + Pakistan friendly |
| **Linode (Akamai)** | $5/mo | 1GB | 25GB SSD | 1 vCPU | Reliable, old school |
| **AWS EC2 t3.micro** | ~$8/mo | 1GB | EBS extra | 2 vCPU | If you need the AWS ecosystem |
| **Google Cloud e2-micro** | ~$7/mo | 1GB | 10GB | 2 vCPU | If you need the GCP ecosystem |

### Detailed Comparison

**Hetzner (Best Value 2026):**
```
Pros:
✓ Cheapest (4GB RAM for €3.29 — unmatched)
✓ NVMe storage — fast
✓ AMD EPYC processors
✓ EU + US locations
✓ DDoS protection included

Cons:
✗ Identity verification required (possible 1-day delay)
✗ Documentation not as good as DigitalOcean
✗ UI is a bit basic

Best for: Solo devs, startups, budget-conscious developers
```

**DigitalOcean (Best Developer Experience):**
```
Pros:
✓ Best documentation in the industry
✓ One-click apps (WordPress, LAMP, Docker)
✓ Managed Databases, Kubernetes ready
✓ Team-friendly interface
✓ Instant provisioning (60 seconds)

Cons:
✗ Expensive vs Hetzner (3x more for same specs)
✗ Bandwidth pricing can be expensive

Best for: Teams, companies, beginners who need hand-holding
```

**Recommendation 2026:**
```
Tight budget?              → Hetzner
Team or company?           → DigitalOcean
Users in Pakistan?         → Hostinger (South Asia servers)
Already using AWS/GCP?     → Stay there (for consistency)
```

---

## PART 2 — BUYING A SERVER (Step by Step)

### Creating a Hetzner Account

1. Go to **hetzner.com** → Cloud Console
2. Create an account — verify your email
3. **Verify your identity** — upload a passport or NIC photo (takes 1 day the first time)
4. Add a credit card or PayPal
5. Create a project: "My Project"

### Create a Server (Hetzner Example)

```
1. Click "Add Server"

2. Choose a location:
   - Nuremberg (EU) — for European users
   - Ashburn (US) — for US users
   → For Pakistan users: EU or Singapore

3. OS Image:
   → Ubuntu 24.04 LTS (Recommended 2026)

4. Type:
   → Shared vCPU (CX22) — 2 vCPU, 4GB RAM, 40GB NVMe = €3.29/mo
   → Perfect for small apps

5. Add your SSH key (required — see below)

6. Create
```

---

## PART 3 — SSH KEY SETUP (Do This Once)

### What Is an SSH Key?

Use a cryptographic key instead of a password — more secure and convenient.

```
On your computer:
  Private Key (.ssh/id_ed25519) ← never share this
  Public Key  (.ssh/id_ed25519.pub) ← this goes on the server
```

### Generate a Key

```bash
# Generate a modern key (ed25519 — 2026 standard)
ssh-keygen -t ed25519 -C "your@email.com"

# Press Enter for the default location
# Passphrase is optional (recommended for security)

# View your public key — this needs to be copied to the server
cat ~/.ssh/id_ed25519.pub
# Output: ssh-ed25519 AAAAC3Nza... your@email.com
```

### Connect to the Server via SSH

```bash
# First connection (get the IP from the Hetzner dashboard)
ssh root@YOUR_SERVER_IP

# Accept the host fingerprint (type yes and press Enter)
```

---

## PART 4 — SERVER SETUP (Ubuntu 24.04 — 2026 Checklist)

### Step 1 — System Update

```bash
# Start as root
apt update && apt upgrade -y
```

### Step 2 — Create a New User (Don't use root!)

```bash
# Create a new user
adduser deploy

# Grant sudo permissions
usermod -aG sudo deploy

# Copy SSH key to the new user
mkdir /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### Step 3 — SSH Hardening

```bash
# Edit SSH config
nano /etc/ssh/sshd_config
```

Make these changes:
```bash
# Disable root login
PermitRootLogin no

# Disable password login (keys only)
PasswordAuthentication no

# Change default port (optional, confuses bots)
Port 2222

# Idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2
```

```bash
# Restart SSH
systemctl restart sshd

# Test in a new terminal (don't close the current one yet!)
ssh -p 2222 deploy@YOUR_SERVER_IP
```

### Step 4 — Firewall Setup (UFW)

```bash
# Install UFW (already present on Ubuntu)
apt install ufw -y

# Default: block all incoming, allow all outgoing
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (use your port if you changed it)
ufw allow 2222/tcp   # or: ufw allow ssh (if port 22 was kept)

# Allow web traffic
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# Enable UFW
ufw enable

# Check status
ufw status verbose
```

### Step 5 — Fail2Ban (Auto-Block Attackers)

```bash
# Install
apt install fail2ban -y

# Create config
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
# After 5 failures
maxretry = 5
# Ban for 1 hour
bantime = 3600
# Within a 10-minute window
findtime = 600

[sshd]
enabled = true
port = 2222   # your SSH port
```

```bash
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status sshd
```

### Step 6 — Install Docker

```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
```

### Step 7 — Automatic Security Updates

```bash
apt install unattended-upgrades -y
dpkg-reconfigure -pmedium unattended-upgrades
# Choose "Yes"
```

---

## PART 5 — REVERSE PROXY SETUP

What a reverse proxy does:

```
Internet
   ↓
Server IP:80 / :443
   ↓
[Reverse Proxy — Nginx/Caddy]
   ↓              ↓
localhost:3000  localhost:8080
  (App 1)         (App 2)

+ Handles SSL certificates
+ Runs multiple apps on one server
```

### Option 1: Caddy (Recommended 2026 for Beginners)

**Why Caddy:**
- Auto SSL/HTTPS (Let's Encrypt automatically)
- Simple config (3 lines is enough)
- Perfect with Docker
- Automatic renewal

```bash
# Install
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install caddy
```

**/etc/caddy/Caddyfile:**
```caddyfile
# One app
example.com {
    reverse_proxy localhost:3000
}

# Multiple apps on different subdomains
app.example.com {
    reverse_proxy localhost:3000
}

api.example.com {
    reverse_proxy localhost:8080
}
```

```bash
# Reload Caddy
systemctl reload caddy

# Check status
systemctl status caddy
```

**That's it! SSL is automatic.**

### Option 2: Nginx (Maximum Performance)

```bash
apt install nginx -y
```

**/etc/nginx/sites-available/myapp:**
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;  # HTTP → HTTPS redirect
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable
ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Get SSL certificate (Certbot)
apt install certbot python3-certbot-nginx -y
certbot --nginx -d example.com -d www.example.com

# Test config
nginx -t

# Reload
systemctl reload nginx
```

### Caddy vs Nginx vs Traefik — When to Use What

| | Caddy | Nginx | Traefik |
|---|---|---|---|
| **Auto SSL** | ✓ Built-in | Manual (Certbot) | ✓ Built-in |
| **Config** | Super easy | Medium | Complex |
| **Performance** | Good | Best | Good |
| **Docker support** | Good | Manual | Excellent (labels) |
| **Use when** | Solo/small apps | High traffic | Docker-heavy setups |

---

## PART 6 — DEPLOYING AN APP (On the Server)

### Method 1: Docker Compose Deploy

```bash
# Go to the server
ssh deploy@YOUR_SERVER_IP

# Clone the repo
git clone https://github.com/username/my-app.git
cd my-app

# Create .env file
nano .env.production

# Start with Docker Compose
docker compose -f docker-compose.prod.yml up -d
```

### Method 2: Auto Deploy via GitHub Actions

(Details in the CI/CD Guide — `09_CICD_DEVOPS_GUIDE.md`)

### Updating the App

```bash
# On the server
cd /home/deploy/my-app

# Pull latest code
git pull origin main

# Build new image and restart
docker compose -f docker-compose.prod.yml up -d --build
```

---

## PART 7 — MONITORING

### Basic Monitoring

```bash
# View server resources
htop          # CPU, RAM, processes (apt install htop)
df -h         # Disk usage
free -m       # Memory usage

# Docker containers
docker stats  # Live CPU/RAM per container
docker ps     # Running containers

# Nginx/Caddy logs
tail -f /var/log/nginx/access.log
journalctl -u caddy -f
```

### Uptime Monitoring (Free Tools)

- **UptimeRobot** — free, checks every 5 min, sends email alerts
- **BetterStack** — better UI, paid plans available
- **Oh Dear** — developer-friendly

Setup: Enter your domain → configure email alert → done.

---

## PART 8 — BACKUP STRATEGY

```bash
# Database backup (PostgreSQL)
docker compose exec db pg_dump -U postgres mydb > backup_$(date +%Y%m%d).sql

# Automatic daily backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
cd /home/deploy/my-app
docker compose exec -T db pg_dump -U postgres mydb | gzip > /home/deploy/backups/db_$(date +%Y%m%d_%H%M%S).sql.gz
# Delete backups older than 7 days
find /home/deploy/backups -name "*.sql.gz" -mtime +7 -delete
EOF

chmod +x /home/deploy/backup.sh
mkdir -p /home/deploy/backups

# Add to cron (daily at 2am)
crontab -e
# Add this line:
# 0 2 * * * /home/deploy/backup.sh
```

---

## SERVER SECURITY CHECKLIST (2026)

```
✓ Root login disabled (PermitRootLogin no)
✓ Password auth disabled (PasswordAuthentication no)
✓ SSH key in use (ed25519)
✓ UFW firewall on, only necessary ports open
✓ Fail2Ban installed and configured
✓ Auto security updates enabled
✓ Docker containers run as non-root user
✓ Ports bound to localhost only (127.0.0.1:3000)
✓ SSL/HTTPS via Caddy or Certbot
✓ Regular backups (daily, off-site)
✓ Uptime monitoring (UptimeRobot)
✓ Logs checked regularly
```

---

## TROUBLESHOOTING — Common Issues

```bash
# Can't connect to server?
ping YOUR_SERVER_IP
ssh -v deploy@YOUR_SERVER_IP  # verbose mode

# App is running but website won't open?
docker ps                      # Is the container running?
curl localhost:3000             # Test directly
ufw status                      # Is the firewall blocking it?
systemctl status caddy/nginx    # Is the proxy running?

# Disk full?
df -h                           # Check usage
docker system prune -a          # Clean unused Docker data

# RAM full?
free -m                         # Check memory
docker stats                    # Which container is consuming it?
```

---

*Next: Read `08_DOMAIN_HOSTING_GUIDE.md` — buying a domain and DNS setup*
