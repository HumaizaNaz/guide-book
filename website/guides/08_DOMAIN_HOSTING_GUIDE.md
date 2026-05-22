# Domain & Hosting Complete Guide
*Domain khareedhna, DNS setup, SSL, Cloudflare — 2026*

---

## DOMAIN KYA HOTA HAI?

Domain = website ka address (jaise `novaj.ai`, `google.com`)

```
URL Breakdown:
https://app.novaj.ai/dashboard

https://       → Protocol (HTTPS)
app.           → Subdomain
novaj.         → Domain name
ai             → TLD (Top Level Domain)
/dashboard     → Path
```

### Domain ke Parts

```
novaj.ai
│     └── TLD (Extension)
└──────── SLD (Second Level Domain — tumhara naam)

subdomain.novaj.ai
│         └── Root domain
└──────── Subdomain (unlimited bana sakte ho free mein)
```

---

## PART 1 — DOMAIN EXTENSIONS (TLDs)

### Popular Extensions aur Prices

| Extension | Price/Year | Best For |
|-----------|-----------|----------|
| `.com` | $10-12 | Sabse trusted, har kisi ke liye |
| `.ai` | $70-90 | AI/Tech companies, trendy |
| `.io` | $35-50 | Tech startups, developers |
| `.co` | $25-30 | Startups, .com alternative |
| `.dev` | $12-15 | Developer tools, portfolios |
| `.app` | $15-20 | Mobile/web apps |
| `.pk` | $5-8 | Pakistani local business |
| `.net` | $10-12 | Networks, tech (less preferred) |
| `.org` | $10-12 | Non-profits, NGOs |

### Kaunsa Lena Chahiye?

```
Product/SaaS banate ho?      → .com (most trusted)
AI startup?                   → .ai (trendy, expensive)
Developer tool?               → .dev ya .io
Pakistani business?           → .com + .pk dono lelo
Budget kam hai?               → .com sabse better investment
```

**Important:** `.com` hamesha best choice hai — users ko `.com` zyada trust hota hai.

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
Domain khareedo → Namecheap ya Cloudflare pe
DNS manage karo → Cloudflare pe (free, fast, secure)
```

**Cloudflare Registrar:**
- At-cost pricing = sab se sasta (zero markup)
- WHOIS privacy free
- Automatic Cloudflare DNS benefits
- **Catch:** Sirf existing domains transfer kar sakte ho, kuch TLDs support nahi

**Namecheap:**
- Easy UI, beginners ke liye best
- Free WHOIS privacy (WhoisGuard)
- Wide TLD selection
- 24/7 live chat support

**GoDaddy — Avoid Kyun:**
```
Registration: $1.99 (bait pricing!)
Renewal:      $19.99+ per year
WHOIS privacy: $10 extra
Add-ons push karte hain constantly
```

---

## PART 3 — DOMAIN KHAREEDHNA (Step by Step)

### Namecheap pe Domain Khareedna

1. **namecheap.com** pe jao
2. Search bar mein domain naam dalo: `novaj.ai`
3. Available hai? "Add to Cart" karo
4. **WHOIS Privacy (WhoisGuard)** check karo — free hai, enable rakho
5. Auto-renew ON karo (expire hone se bachao)
6. Checkout karo
7. Account verify karo (email)

### Pehle 30 Din Ka Checklist

```
Day 1:  ✓ Domain khareedo
Day 1:  ✓ WHOIS privacy enable karo
Day 1:  ✓ Auto-renew ON karo
Day 1:  ✓ DNS Cloudflare pe move karo (neeche dekho)
Day 1:  ✓ SSL certificate lagao
Week 1: ✓ Email (Google Workspace ya Zoho) setup karo
Week 2: ✓ Google Search Console mein add karo
Month 1:✓ Website live karo
```

---

## PART 4 — DNS KYA HOTA HAI?

DNS = Domain Name System = Phone book of the internet

```
Tumhara browser: "novaj.ai kahan hai?"
DNS Server: "192.168.1.100 pe hai"
Browser: IP pe jata hai

Without DNS: Har site ka IP yaad karna parta (impossible!)
With DNS:    Sirf naam yaad rakho
```

### DNS Records — Types

| Record | Kaam | Example |
|--------|------|---------|
| **A** | Domain → IPv4 address | `novaj.ai → 123.456.789.0` |
| **AAAA** | Domain → IPv6 address | `novaj.ai → 2001:db8::1` |
| **CNAME** | Domain → Doosra domain | `www.novaj.ai → novaj.ai` |
| **MX** | Email server | `novaj.ai → mail.google.com` |
| **TXT** | Text info (SPF, DMARC, verify) | Domain verification |
| **NS** | Nameserver | DNS server kaun hai |
| **CAA** | Kaunsa CA SSL de sakta hai | Let's Encrypt only |

### Common DNS Setups

**VPS Server pe point karna:**
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

**Vercel pe point karna:**
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

**Subdomain alag server pe:**
```
Type: A
Name: api         (api.novaj.ai)
Value: 456.789.0.1
TTL: 300

Type: CNAME
Name: docs        (docs.novaj.ai → docs site)
Value: username.github.io
```

### TTL Kya Hai?

TTL = Time To Live = Kitni der tak cache rakho

```
TTL 300  = 5 minutes  (use karo jab changes kar rahe ho)
TTL 3600 = 1 hour     (normal use)
TTL 86400 = 1 day     (stable records ke liye)
```

**Rule:** Changes karne se pehle TTL 300 karo — changes fast propagate honge.

### DNS Propagation

DNS changes hote hain par poori duniya mein spread hone mein time lagta hai:
- Usually: 5 minutes to 2 hours
- Max: 24-48 hours (purane TTL ke hisaab se)

Check karo: `dnschecker.org` pe domain dalo — worldwide propagation dekho

---

## PART 5 — CLOUDFLARE SETUP (Highly Recommended)

Cloudflare ek free CDN + DNS + Security layer hai. Sabse pehle yeh setup karo.

### Cloudflare pe Add Karna

1. **cloudflare.com** → Free account banao
2. "Add a Site" → Domain naam dalo
3. Free plan select karo
4. Cloudflare tumhare existing DNS records automatically import karega
5. Check karo — sab records theek hain?
6. **Namecheap pe jao** → Domain DNS → Custom Nameservers
7. Cloudflare ke nameservers daal do:
   ```
   NS1: aida.ns.cloudflare.com
   NS2: noah.ns.cloudflare.com
   ```
   (Exact names Cloudflare dashboard mein milenge)
8. Wait karo — 24 ghante tak (usually 30 min)

### Cloudflare ke Free Benefits

```
✓ Free SSL/HTTPS (CDN ke through)
✓ DDoS protection
✓ Global CDN (assets fast load hote hain worldwide)
✓ Free DNS management
✓ Analytics
✓ Rate limiting (limited free tier)
✓ Bot protection (basic)
✓ Page Rules
```

### Cloudflare SSL Modes

```
Settings → SSL/TLS → Overview

Off         = HTTP only — never use this!
Flexible    = Browser→Cloudflare: HTTPS, Cloudflare→Server: HTTP
             ⚠️ Server pe real SSL nahi — ok for static sites
Full        = End-to-end HTTPS, self-signed cert ok server pe
Full(Strict)= End-to-end HTTPS, valid cert required server pe ← BEST
```

**Use karo:** Full (Strict) — agar server pe Caddy/Let's Encrypt hai.

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

### SSL Kya Hai?

SSL/TLS = Encryption layer — data encrypt hota hai browser aur server ke beech.

```
HTTP  (no SSL): Data plain text — koi bhi intercept kar sakta hai ❌
HTTPS (SSL on): Data encrypted — safe ✓
```

### 2026 Important Change:
**March 2026 se SSL certificates max 200 days valid hain** (pehle 1 year tha).
Iska matlab: Auto-renewal mandatory hai.

### SSL Types

| Type | Validation | Best For | Price |
|------|-----------|----------|-------|
| **DV (Domain Validation)** | Domain ownership only | Most websites | Free (Let's Encrypt) |
| **OV (Org Validation)** | Business verify | Business sites | $50-200/year |
| **EV (Extended Validation)** | Strict business verify | Banks, Finance | $200+/year |
| **Wildcard** | All subdomains (*.domain.com) | Multiple subdomains | Free ya $100+/year |

**99% developers ke liye:** Let's Encrypt (DV) free kaafi hai.

### SSL Kaise Lagaen

**Method 1: Caddy (Automatic — Recommended)**
```caddyfile
example.com {
    reverse_proxy localhost:3000
}
```
Bas! Caddy automatically Let's Encrypt se certificate leta hai aur renew karta hai.

**Method 2: Certbot (Nginx ke liye)**
```bash
apt install certbot python3-certbot-nginx -y

# Certificate lo
certbot --nginx -d example.com -d www.example.com

# Wildcard certificate (DNS challenge)
certbot certonly --manual --preferred-challenges dns \
  -d "*.example.com" -d example.com

# Auto renewal test karo
certbot renew --dry-run
```

**Method 3: Cloudflare SSL (Simplest)**
- Cloudflare pe point karo
- SSL mode: Flexible (sirf basic ke liye) ya Full (Strict)
- Cloudflare automatically SSL deta hai — koi setup nahi

**Method 4: Vercel/Netlify**
- Automatic — kuch nahi karna
- Custom domain add karo → SSL automatic

---

## PART 7 — EMAIL SETUP

### Domain Email Kaise Banate Hain

Domain email = `team@novaj.ai` (professional lagta hai)

**Options:**

| Service | Price | Best For |
|---------|-------|----------|
| **Google Workspace** | $6/user/mo | Best, Gmail interface |
| **Zoho Mail** | Free (5 users) | Budget, small team |
| **Proton Mail for Business** | $4/user/mo | Privacy focused |
| **Fastmail** | $5/user/mo | Privacy, developer friendly |

### Zoho Mail Free Setup (Budget Option)

1. zoho.com/mail → Free plan
2. Domain add karo
3. DNS records add karo (Zoho batata hai):
   ```
   MX records add karo Cloudflare mein
   TXT record (SPF): v=spf1 include:zoho.in ~all
   CNAME: zb... (DKIM verification)
   ```
4. Email address banao: `you@yourdomain.com`

### Email DNS Records (Important!)

```
MX Record — Email server specify karo
SPF — Email spoofing rokta hai
DKIM — Email signature (tamper-proof)
DMARC — Policy define karo agar SPF/DKIM fail ho
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

## PART 8 — DOMAIN VERCEL PE CONNECT KARNA

### Steps

1. Vercel Dashboard → Project → Settings → Domains
2. Domain naam dalo: `novaj.ai`
3. Vercel batayega DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Cloudflare mein yeh records add karo
5. Cloudflare proxy (orange cloud) OFF karo Vercel records ke liye
   (Gray cloud = DNS only = Vercel direct handle kare)
6. 5-10 minute wait karo

**Note:** Vercel + Cloudflare ke saath proxy OFF rakhna kyunki Vercel khud SSL handle karta hai.

---

## PART 9 — DOMAIN KO VPS PE CONNECT KARNA

### Full Flow

```
Domain: novaj.ai
VPS IP: 123.456.789.0
Reverse Proxy: Caddy

1. Cloudflare mein A record:
   Type: A
   Name: @
   Value: 123.456.789.0
   Proxy: ON (Cloudflare DDoS protection)

2. www bhi:
   Type: CNAME
   Name: www
   Value: novaj.ai
   Proxy: ON

3. Server pe Caddy config:
/etc/caddy/Caddyfile:
   novaj.ai {
       reverse_proxy localhost:3000
   }

4. Caddy restart:
   systemctl reload caddy

5. Done! HTTPS automatic.
```

---

## PART 10 — MULTIPLE SITES EK SERVER PE

Ek VPS pe multiple projects chala sakte ho:

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

Har site ka alag SSL certificate Caddy automatically manage karta hai.

---

## QUICK REFERENCE — DNS Propagation Check

```bash
# Command line se check karo
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
Pehle Din:
✓ Domain khareedo (Namecheap/Cloudflare)
✓ WHOIS privacy ON
✓ Auto-renew ON (expire hone se bachao!)
✓ Cloudflare pe move karo (nameservers change)
✓ A record add karo server/Vercel ki taraf

SSL:
✓ Caddy use karo? Auto SSL
✓ Nginx? Certbot se certificate lo
✓ Vercel? Automatic
✓ Certificate expiry monitor karo (UptimeRobot)

Email:
✓ MX records add karo
✓ SPF, DKIM, DMARC set karo
✓ Email test karo (mail-tester.com se score check karo)

Security:
✓ Cloudflare Always Use HTTPS: ON
✓ CAA record add karo (sirf Let's Encrypt allow)
✓ 2FA enable karo registrar aur Cloudflare pe
```

---

*Next: `09_CICD_DEVOPS_GUIDE.md` padho — GitHub Actions aur auto deployment*
