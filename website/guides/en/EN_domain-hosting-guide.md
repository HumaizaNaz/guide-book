# Domain & Hosting Complete Guide
*Buying a domain, DNS setup, SSL, Cloudflare — 2026*

---

## WHAT IS A DOMAIN?

Domain = website address (like `novaj.ai`, `google.com`)

```
URL Breakdown:
https://app.novaj.ai/dashboard

https://       → Protocol (HTTPS)
app.           → Subdomain
novaj.         → Domain name
ai             → TLD (Top Level Domain)
/dashboard     → Path
```

### Parts of a Domain

```
novaj.ai
│     └── TLD (Extension)
└──────── SLD (Second Level Domain — your name)

subdomain.novaj.ai
│         └── Root domain
└──────── Subdomain (create unlimited for free)
```

---

## PART 1 — DOMAIN EXTENSIONS (TLDs)

### Popular Extensions and Prices

| Extension | Price/Year | Best For |
|-----------|-----------|----------|
| `.com` | $10–12 | Most trusted, for everyone |
| `.ai` | $70–90 | AI/Tech companies, trendy |
| `.io` | $35–50 | Tech startups, developers |
| `.co` | $25–30 | Startups, .com alternative |
| `.dev` | $12–15 | Developer tools, portfolios |
| `.app` | $15–20 | Mobile/web apps |
| `.pk` | $5–8 | Pakistani local business |
| `.net` | $10–12 | Networks, tech (less preferred) |
| `.org` | $10–12 | Non-profits, NGOs |

### Which One Should You Get?

```
Building a product/SaaS?    → .com (most trusted)
AI startup?                  → .ai (trendy, expensive)
Developer tool?              → .dev or .io
Pakistani business?          → get both .com + .pk
Budget is limited?           → .com is the best investment
```

**Important:** `.com` is always the best choice — users trust `.com` more.

---

## PART 2 — DOMAIN REGISTRARS (2026 Best Options)

### Top Registrars Comparison

| Registrar | .com Price | WHOIS Privacy | Best For |
|-----------|-----------|--------------|----------|
| **Cloudflare** | ~$10.44 (at-cost) | Free | Best value, no markup |
| **Namecheap** | ~$9.98 | Free | Best overall, easy UI |
| **Spaceship** | ~$9.98 | Free | New, best UX |
| **Porkbun** | ~$9.73 | Free | Budget friendly |
| **GoDaddy** | $19.99 | $10 extra | Avoid — hidden fees |
| **Squarespace Domains** | $20+ | Free | Avoid unless using Squarespace |

### Recommendations (2026)

**Best Strategy:**
```
Buy domain → at Namecheap or Cloudflare
Manage DNS → at Cloudflare (free, fast, secure)
```

**Cloudflare Registrar:**
- At-cost pricing = cheapest (zero markup)
- WHOIS privacy is free
- Automatic Cloudflare DNS benefits
- **Catch:** You can only transfer existing domains — some TLDs are not supported

**Namecheap:**
- Easy UI, best for beginners
- Free WHOIS privacy (WhoisGuard)
- Wide TLD selection
- 24/7 live chat support

**Why Avoid GoDaddy:**
```
Registration: $1.99 (bait pricing!)
Renewal:      $19.99+ per year
WHOIS privacy: $10 extra
Constantly pushes add-ons
```

---

## PART 3 — BUYING A DOMAIN (Step by Step)

### Buying a Domain on Namecheap

1. Go to **namecheap.com**
2. Enter the domain name in the search bar: `novaj.ai`
3. Is it available? Click "Add to Cart"
4. Check **WHOIS Privacy (WhoisGuard)** — it's free, keep it enabled
5. Turn ON Auto-renew (to prevent it from expiring)
6. Checkout
7. Verify your account (email)

### First 30 Days Checklist

```
Day 1:  ✓ Buy the domain
Day 1:  ✓ Enable WHOIS privacy
Day 1:  ✓ Turn ON Auto-renew
Day 1:  ✓ Move DNS to Cloudflare (see below)
Day 1:  ✓ Set up SSL certificate
Week 1: ✓ Set up email (Google Workspace or Zoho)
Week 2: ✓ Add to Google Search Console
Month 1:✓ Get the website live
```

---

## PART 4 — WHAT IS DNS?

DNS = Domain Name System = The phone book of the internet

```
Your browser: "Where is novaj.ai?"
DNS Server: "It's at 192.168.1.100"
Browser: goes to that IP

Without DNS: You'd have to memorize every site's IP (impossible!)
With DNS:    Just remember the name
```

### DNS Records — Types

| Record | Function | Example |
|--------|----------|---------|
| **A** | Domain → IPv4 address | `novaj.ai → 123.456.789.0` |
| **AAAA** | Domain → IPv6 address | `novaj.ai → 2001:db8::1` |
| **CNAME** | Domain → Another domain | `www.novaj.ai → novaj.ai` |
| **MX** | Email server | `novaj.ai → mail.google.com` |
| **TXT** | Text info (SPF, DMARC, verify) | Domain verification |
| **NS** | Nameserver | Who handles DNS |
| **CAA** | Which CA can issue SSL | Let's Encrypt only |

### Common DNS Setups

**Pointing to a VPS Server:**
```
Type: A
Name: @           (@ = root domain = novaj.ai)
Value: 123.456.789.0  (VPS IP)
TTL: 300

Type: A
Name: www
Value: 123.456.789.0
TTL: 300
```

**Pointing to Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21    (Vercel IP)
TTL: Auto

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

**Subdomain on a different server:**
```
Type: A
Name: api         (api.novaj.ai)
Value: 456.789.0.1
TTL: 300

Type: CNAME
Name: docs        (docs.novaj.ai → docs site)
Value: username.github.io
```

### What Is TTL?

TTL = Time To Live = How long to cache the record

```
TTL 300  = 5 minutes  (use when you're making changes)
TTL 3600 = 1 hour     (normal use)
TTL 86400 = 1 day     (for stable records)
```

**Rule:** Set TTL to 300 before making changes — changes will propagate faster.

### DNS Propagation

DNS changes happen, but spreading them across the world takes time:
- Usually: 5 minutes to 2 hours
- Max: 24–48 hours (depending on the old TTL)

Check at: `dnschecker.org` — enter your domain and see worldwide propagation

---

## PART 5 — CLOUDFLARE SETUP (Highly Recommended)

Cloudflare is a free CDN + DNS + Security layer. Set this up first.

### Adding Your Site to Cloudflare

1. Go to **cloudflare.com** → Create a free account
2. "Add a Site" → enter your domain name
3. Select the Free plan
4. Cloudflare will automatically import your existing DNS records
5. Review them — are all records correct?
6. **Go to Namecheap** → Domain DNS → Custom Nameservers
7. Enter Cloudflare's nameservers:
   ```
   NS1: aida.ns.cloudflare.com
   NS2: noah.ns.cloudflare.com
   ```
   (Exact names will be shown in the Cloudflare dashboard)
8. Wait — up to 24 hours (usually 30 minutes)

### Free Benefits of Cloudflare

```
✓ Free SSL/HTTPS (through CDN)
✓ DDoS protection
✓ Global CDN (assets load fast worldwide)
✓ Free DNS management
✓ Analytics
✓ Rate limiting (limited free tier)
✓ Bot protection (basic)
✓ Page Rules
```

### Cloudflare SSL Modes

```
Settings → SSL/TLS → Overview

Off          = HTTP only — never use this!
Flexible     = Browser→Cloudflare: HTTPS, Cloudflare→Server: HTTP
              ⚠️ No real SSL on server — OK for static sites
Full         = End-to-end HTTPS, self-signed cert OK on server
Full(Strict) = End-to-end HTTPS, valid cert required on server ← BEST
```

**Use:** Full (Strict) — if your server has Caddy/Let's Encrypt.

### Important Cloudflare Settings

```
1. SSL/TLS → Always Use HTTPS: ON
2. SSL/TLS → Minimum TLS Version: TLS 1.2
3. Speed → Auto Minify: CSS ✓, JS ✓, HTML ✓
4. Caching → Browser Cache TTL: 4 hours
5. Security → Security Level: Medium
```

---

## PART 6 — SSL CERTIFICATE (HTTPS)

### What Is SSL?

SSL/TLS = Encryption layer — data is encrypted between the browser and server.

```
HTTP  (no SSL): Data is plain text — anyone can intercept it ❌
HTTPS (SSL on): Data is encrypted — safe ✓
```

### Important 2026 Change:
**From March 2026, SSL certificates are valid for a maximum of 200 days** (previously 1 year).
This means: Auto-renewal is now mandatory.

### SSL Types

| Type | Validation | Best For | Price |
|------|-----------|----------|-------|
| **DV (Domain Validation)** | Domain ownership only | Most websites | Free (Let's Encrypt) |
| **OV (Org Validation)** | Business verification | Business sites | $50–200/year |
| **EV (Extended Validation)** | Strict business verify | Banks, Finance | $200+/year |
| **Wildcard** | All subdomains (*.domain.com) | Multiple subdomains | Free or $100+/year |

**For 99% of developers:** Let's Encrypt (DV) for free is perfectly sufficient.

### How to Set Up SSL

**Method 1: Caddy (Automatic — Recommended)**
```caddyfile
example.com {
    reverse_proxy localhost:3000
}
```
That's it! Caddy automatically gets a certificate from Let's Encrypt and renews it.

**Method 2: Certbot (for Nginx)**
```bash
apt install certbot python3-certbot-nginx -y

# Get certificate
certbot --nginx -d example.com -d www.example.com

# Wildcard certificate (DNS challenge)
certbot certonly --manual --preferred-challenges dns \
  -d "*.example.com" -d example.com

# Test auto renewal
certbot renew --dry-run
```

**Method 3: Cloudflare SSL (Simplest)**
- Point to Cloudflare
- SSL mode: Flexible (basic only) or Full (Strict)
- Cloudflare provides SSL automatically — no setup needed

**Method 4: Vercel/Netlify**
- Automatic — nothing to configure
- Add your custom domain → SSL is automatic

---

## PART 7 — EMAIL SETUP

### How to Create a Domain Email

Domain email = `team@novaj.ai` (looks professional)

**Options:**

| Service | Price | Best For |
|---------|-------|----------|
| **Google Workspace** | $6/user/mo | Best, Gmail interface |
| **Zoho Mail** | Free (5 users) | Budget, small team |
| **Proton Mail for Business** | $4/user/mo | Privacy focused |
| **Fastmail** | $5/user/mo | Privacy, developer friendly |

### Zoho Mail Free Setup (Budget Option)

1. zoho.com/mail → Free plan
2. Add your domain
3. Add DNS records (Zoho will tell you what to add):
   ```
   Add MX records in Cloudflare
   TXT record (SPF): v=spf1 include:zoho.in ~all
   CNAME: zb... (DKIM verification)
   ```
4. Create email address: `you@yourdomain.com`

### Email DNS Records (Important!)

```
MX Record — specifies the email server
SPF — prevents email spoofing
DKIM — email signature (tamper-proof)
DMARC — defines policy if SPF/DKIM fails
```

**Minimum email DNS setup (Zoho example):**
```
Type  Name   Value
MX    @      mx.zoho.in (Priority: 10)
TXT   @      v=spf1 include:zoho.in ~all
TXT   @      v=DMARC1; p=quarantine; rua=mailto:you@domain.com
CNAME zomailverify._domainkey  zomailverify.zoho.in
```

---

## PART 8 — CONNECTING YOUR DOMAIN TO VERCEL

### Steps

1. Vercel Dashboard → Project → Settings → Domains
2. Enter your domain name: `novaj.ai`
3. Vercel will tell you the DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Add these records in Cloudflare
5. Turn OFF the Cloudflare proxy (orange cloud) for Vercel records
   (Gray cloud = DNS only = Vercel handles it directly)
6. Wait 5–10 minutes

**Note:** With Vercel + Cloudflare, keep the proxy OFF because Vercel handles SSL itself.

---

## PART 9 — CONNECTING YOUR DOMAIN TO A VPS

### Full Flow

```
Domain: novaj.ai
VPS IP: 123.456.789.0
Reverse Proxy: Caddy

1. A record in Cloudflare:
   Type: A
   Name: @
   Value: 123.456.789.0
   Proxy: ON (Cloudflare DDoS protection)

2. www as well:
   Type: CNAME
   Name: www
   Value: novaj.ai
   Proxy: ON

3. Caddy config on server:
/etc/caddy/Caddyfile:
   novaj.ai {
       reverse_proxy localhost:3000
   }

4. Restart Caddy:
   systemctl reload caddy

5. Done! HTTPS is automatic.
```

---

## PART 10 — MULTIPLE SITES ON ONE SERVER

You can run multiple projects on one VPS:

```
Server: 123.456.789.0

Cloudflare DNS:
  novaj.ai         A → 123.456.789.0
  app.novaj.ai     A → 123.456.789.0
  api.novaj.ai     A → 123.456.789.0
  client1.com      A → 123.456.789.0

Caddy Config:
novaj.ai {
    reverse_proxy localhost:3000    # Main site
}

app.novaj.ai {
    reverse_proxy localhost:3001    # App
}

api.novaj.ai {
    reverse_proxy localhost:8080    # API
}

client1.com {
    reverse_proxy localhost:4000    # Client project
}
```

Caddy automatically manages a separate SSL certificate for each site.

---

## QUICK REFERENCE — DNS Propagation Check

```bash
# Check via command line
nslookup novaj.ai          # Windows/Linux
dig novaj.ai               # Linux/Mac

# Online tools
# dnschecker.org
# whatsmydns.net
# toolbox.googleapps.com/apps/dig/
```

---

## DOMAIN MANAGEMENT CHECKLIST

```
Day One:
✓ Buy domain (Namecheap/Cloudflare)
✓ WHOIS privacy ON
✓ Auto-renew ON (prevent expiry!)
✓ Move to Cloudflare (change nameservers)
✓ Add A record pointing to server/Vercel

SSL:
✓ Using Caddy? Auto SSL
✓ Using Nginx? Get certificate with Certbot
✓ Using Vercel? Automatic
✓ Monitor certificate expiry (UptimeRobot)

Email:
✓ Add MX records
✓ Set SPF, DKIM, DMARC
✓ Test email (check score at mail-tester.com)

Security:
✓ Cloudflare Always Use HTTPS: ON
✓ Add CAA record (allow Let's Encrypt only)
✓ Enable 2FA on registrar and Cloudflare
```

---

*Next: Read `09_CICD_DEVOPS_GUIDE.md` — GitHub Actions and auto deployment*
