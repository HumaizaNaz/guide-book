# Server & VPS Complete Guide
*Server khareedhna, setup karna, secure karna — 2026*

---

## VPS KYA HOTA HAI?

**VPS = Virtual Private Server**

```
┌─────────────────────────────────────────────────┐
│           Physical Server (Data Center)          │
├──────────────┬──────────────┬───────────────────┤
│   VPS #1     │   VPS #2     │   VPS #3          │
│  Tumhara     │  Kisi aur    │  Kisi aur         │
│  2 CPU       │  4 CPU       │  1 CPU            │
│  4 GB RAM    │  8 GB RAM    │  2 GB RAM         │
│  80 GB SSD   │  160 GB SSD  │  40 GB SSD        │
└──────────────┴──────────────┴───────────────────┘
```

Ek bada server slice kiya jata hai — tumhe dedicated resources milti hain par sharing hoti hai hardware ki.

### Shared Hosting vs VPS vs Dedicated

| Feature | Shared Hosting | VPS | Dedicated Server |
|---------|---------------|-----|-----------------|
| **Control** | Bilkul nahi | Full | Full |
| **Resources** | Share hote hain | Guaranteed | Complete |
| **Price** | $2-5/mo | $4-50/mo | $80-500/mo |
| **Performance** | Slow, inconsistent | Good | Best |
| **Use Case** | WordPress blog | Apps/APIs | High traffic |
| **2026 Recommendation** | Avoid | ✓ Best choice | Only if needed |

---

## PART 1 — VPS PROVIDERS COMPARISON (2026)

### Top Providers aur Pricing

| Provider | Entry Plan | RAM | Storage | CPU | Best For |
|----------|-----------|-----|---------|-----|----------|
| **Hetzner** | €3.29/mo | 4GB | 40GB NVMe | 2 vCPU | Best value — Europe |
| **DigitalOcean** | $6/mo | 1GB | 25GB SSD | 1 vCPU | Best DX, tutorials |
| **Vultr** | $6/mo | 1GB | 25GB SSD | 1 vCPU | Good global locations |
| **Hostinger** | $4/mo | 1GB | 20GB NVMe | 1 vCPU | Budget + Pakistan friendly |
| **Linode (Akamai)** | $5/mo | 1GB | 25GB SSD | 1 vCPU | Reliable, old school |
| **AWS EC2 t3.micro** | ~$8/mo | 1GB | EBS extra | 2 vCPU | If AWS ecosystem chahiye |
| **Google Cloud e2-micro** | ~$7/mo | 1GB | 10GB | 2 vCPU | If GCP ecosystem |

### Detailed Comparison

**Hetzner (Best Value 2026):**
```
Pros:
✓ Sab se sasta (€3.29 mein 4GB RAM — unmatched)
✓ NVMe storage — fast
✓ AMD EPYC processors
✓ EU + US locations
✓ DDoS protection included

Cons:
✗ Identity verification required (1 din delay possible)
✗ Documentation DigitalOcean se kam
✗ UI thoda basic

Best for: Solo devs, startups, budget-conscious
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
✗ Expensive vs Hetzner (same specs 3x zyada price)
✗ Bandwidth pricing ho sakta hai expensive

Best for: Teams, companies, beginners who need hand-holding
```

**Recommendation 2026:**
```
Budget tight hai?          → Hetzner
Team hai / company hai?    → DigitalOcean
Pakistan mein users hain?  → Hostinger (South Asia servers)
AWS/GCP already use?       → Wahi rakho (consistency ke liye)
```

---

## PART 2 — SERVER KHAREEDHNA (Step by Step)

### Hetzner pe Account banana

1. **hetzner.com** pe jao → Cloud Console
2. Account banao — email verify karo
3. **Identity Verify karo** — Passport ya NIC photo upload karo (1 din lagta hai pehli baar)
4. Credit card ya PayPal add karo
5. Project banao: "My Project"

### Server Create Karo (Hetzner Example)

```
1. "Add Server" click karo

2. Location choose karo:
   - Nuremberg (EU) — Europe ke users ke liye
   - Ashburn (US) — US users ke liye
   → Pakistan ke liye EU ya Singapore

3. OS Image:
   → Ubuntu 24.04 LTS (Recommended 2026)

4. Type:
   → Shared vCPU (CX22) — 2 vCPU, 4GB RAM, 40GB NVMe = €3.29/mo
   → Small apps ke liye perfect

5. SSH Key add karo (zaruri — neeche dekho)

6. Create karo
```

---

## PART 3 — SSH KEY SETUP (Once Karo)

### SSH Key Kya Hai?

Password ki jagah cryptographic key use karo — secure aur convenient.

```
Tumhare computer pe:
  Private Key (.ssh/id_ed25519) ← kabhi share mat karo
  Public Key  (.ssh/id_ed25519.pub) ← server pe daalte hain
```

### Key Generate Karo

```bash
# Modern key generate karo (ed25519 — 2026 standard)
ssh-keygen -t ed25519 -C "tumhara@email.com"

# Enter press karo default location ke liye
# Passphrase optional hai (recommended for security)

# Public key dekho — yeh server pe copy karni hai
cat ~/.ssh/id_ed25519.pub
# Output: ssh-ed25519 AAAAC3Nza... tumhara@email.com
```

### SSH se Server pe Connect karo

```bash
# First time connect (IP Hetzner dashboard se milega)
ssh root@YOUR_SERVER_IP

# Host fingerprint accept karo (yes likhke Enter)
```

---

## PART 4 — SERVER SETUP (Ubuntu 24.04 — 2026 Checklist)

### Step 1 — System Update

```bash
# Root se start karo
apt update && apt upgrade -y
```

### Step 2 — New User Banao (Root mat use karo!)

```bash
# New user banao
adduser deploy

# Sudo permissions do
usermod -aG sudo deploy

# SSH key copy karo new user ke liye
mkdir /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### Step 3 — SSH Hardening

```bash
# SSH config edit karo
nano /etc/ssh/sshd_config
```

Yeh changes karo:
```bash
# Root login disable karo
PermitRootLogin no

# Password login disable karo (sirf keys)
PasswordAuthentication no

# Default port change karo (optional, bots ko confuse karo)
Port 2222

# Idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2
```

```bash
# SSH restart karo
systemctl restart sshd

# Ab naye terminal se test karo (purana wala band mat karo abhi!)
ssh -p 2222 deploy@YOUR_SERVER_IP
```

### Step 4 — Firewall Setup (UFW)

```bash
# UFW install (Ubuntu mein already hota hai)
apt install ufw -y

# Default: sab incoming band, sab outgoing allow
ufw default deny incoming
ufw default allow outgoing

# SSH allow karo (agar port change kiya toh woh daal)
ufw allow 2222/tcp   # ya ufw allow ssh agar default 22 raha

# Web traffic allow karo
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# UFW on karo
ufw enable

# Status dekho
ufw status verbose
```

### Step 5 — Fail2Ban (Auto Block Attackers)

```bash
# Install karo
apt install fail2ban -y

# Config banao
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
# 5 failures ke baad
maxretry = 5
# 1 ghante ke liye ban karo
bantime = 3600
# 10 minute window mein
findtime = 600

[sshd]
enabled = true
port = 2222   # apna SSH port
```

```bash
systemctl enable fail2ban
systemctl start fail2ban

# Status dekho
fail2ban-client status sshd
```

### Step 6 — Docker Install

```bash
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
```

### Step 7 — Automatic Security Updates

```bash
apt install unattended-upgrades -y
dpkg-reconfigure -pmedium unattended-upgrades
# "Yes" choose karo
```

---

## PART 5 — REVERSE PROXY SETUP

Reverse proxy kya karta hai:

```
Internet
   ↓
Server IP:80 / :443
   ↓
[Reverse Proxy — Nginx/Caddy]
   ↓              ↓
localhost:3000  localhost:8080
  (App 1)         (App 2)

+ SSL certificate handle karta hai
+ Multiple apps ek server pe
```

### Option 1: Caddy (Recommended 2026 for Beginners)

**Kyun Caddy:**
- Auto SSL/HTTPS (Let's Encrypt automatically)
- Simple config (3 lines kafi hain)
- Docker ke saath perfect
- Automatic renewal

```bash
# Install karo
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install caddy
```

**/etc/caddy/Caddyfile:**
```caddyfile
# Ek app
example.com {
    reverse_proxy localhost:3000
}

# Multiple apps alag subdomains pe
app.example.com {
    reverse_proxy localhost:3000
}

api.example.com {
    reverse_proxy localhost:8080
}
```

```bash
# Caddy reload karo
systemctl reload caddy

# Status check
systemctl status caddy
```

**Bas! SSL automatic milega.**

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
# Enable karo
ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# SSL certificate lo (Certbot)
apt install certbot python3-certbot-nginx -y
certbot --nginx -d example.com -d www.example.com

# Test config
nginx -t

# Reload
systemctl reload nginx
```

### Caddy vs Nginx vs Traefik — Kab Kya?

| | Caddy | Nginx | Traefik |
|---|---|---|---|
| **Auto SSL** | ✓ Built-in | Manual (Certbot) | ✓ Built-in |
| **Config** | Super easy | Medium | Complex |
| **Performance** | Good | Best | Good |
| **Docker support** | Good | Manual | Excellent (labels) |
| **Use karo** | Solo/small apps | High traffic | Docker-heavy setups |

---

## PART 6 — APP DEPLOY KARNA (Server Pe)

### Method 1: Docker Compose Deploy

```bash
# Server pe jao
ssh deploy@YOUR_SERVER_IP

# Git clone karo
git clone https://github.com/username/meri-app.git
cd meri-app

# .env file banao
nano .env.production

# Docker Compose se start karo
docker compose -f docker-compose.prod.yml up -d
```

### Method 2: GitHub Actions se Auto Deploy

(CI/CD Guide mein detail hai — `09_CICD_DEVOPS_GUIDE.md`)

### App Update Karna

```bash
# Server pe
cd /home/deploy/meri-app

# Latest code pull karo
git pull origin main

# New image build karo aur restart karo
docker compose -f docker-compose.prod.yml up -d --build
```

---

## PART 7 — MONITORING

### Basic Monitoring

```bash
# Server resources dekho
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

- **UptimeRobot** — free, har 5 min check karta hai, email alert bhejta hai
- **BetterStack** — better UI, paid plans available
- **Oh Dear** — developer-friendly

Setup: Domain enter karo → email alert configure karo → done.

---

## PART 8 — BACKUP STRATEGY

```bash
# Database backup (PostgreSQL)
docker compose exec db pg_dump -U postgres mydb > backup_$(date +%Y%m%d).sql

# Automatic daily backup script
cat > /home/deploy/backup.sh << 'EOF'
#!/bin/bash
cd /home/deploy/meri-app
docker compose exec -T db pg_dump -U postgres mydb | gzip > /home/deploy/backups/db_$(date +%Y%m%d_%H%M%S).sql.gz
# 7 din se purane backups delete karo
find /home/deploy/backups -name "*.sql.gz" -mtime +7 -delete
EOF

chmod +x /home/deploy/backup.sh
mkdir -p /home/deploy/backups

# Cron mein daal do (daily raat 2 baje)
crontab -e
# Yeh line add karo:
# 0 2 * * * /home/deploy/backup.sh
```

---

## SERVER SECURITY CHECKLIST (2026)

```
✓ Root login disable (PermitRootLogin no)
✓ Password auth disable (PasswordAuthentication no)
✓ SSH key use karo (ed25519)
✓ UFW firewall on, sirf zaroori ports open
✓ Fail2Ban install aur configure
✓ Auto security updates on
✓ Docker containers non-root user se chalate hain
✓ Ports sirf localhost pe bind (127.0.0.1:3000)
✓ SSL/HTTPS Caddy ya Certbot se
✓ Regular backups (daily, off-site)
✓ Uptime monitoring (UptimeRobot)
✓ Logs regularly check karo
```

---

## TROUBLESHOOTING — Common Issues

```bash
# Server connect nahi ho raha?
ping YOUR_SERVER_IP
ssh -v deploy@YOUR_SERVER_IP  # verbose mode

# App chal raha hai par website nahi khul rahi?
docker ps                      # Container running hai?
curl localhost:3000             # Directly test karo
ufw status                      # Firewall block kar raha?
systemctl status caddy/nginx    # Proxy chal raha?

# Disk full?
df -h                           # Usage dekho
docker system prune -a          # Unused Docker data clean karo

# RAM full?
free -m                         # Memory dekho
docker stats                    # Konsa container kha raha hai?
```

---

*Next: `08_DOMAIN_HOSTING_GUIDE.md` padho — domain khareedhna aur DNS setup*
