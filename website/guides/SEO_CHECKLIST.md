# ABC — SEO Complete Checklist

Live URL: https://abc.com  
Custom Domain (pending): https://abc.com

---

## DONE (Already in Code)

### Technical SEO
- [x] `sitemap.xml` — auto-generated at `/sitemap.xml` via `app/sitemap.ts`
- [x] `robots.txt` — allows all bots, points to sitemap via `app/robots.ts`
- [x] Canonical URLs — set on every page
- [x] `metadataBase` — set to `https://abc.com` in `layout.tsx`
- [x] Title tags — under 60 characters on all pages
- [x] Meta descriptions — under 160 characters on all pages
- [x] `robots: { index: true, follow: true }` — on all pages

### Open Graph (Social Preview)
- [x] `og:title` — set
- [x] `og:description` — set
- [x] `og:type` — "website"
- [x] `og:url` — set per page
- [x] `og:image` — set (1200x630px required)
- [x] `og:siteName` — "ABC"

### Twitter Card
- [x] `twitter:card` — "summary_large_image"
- [x] `twitter:title` — set
- [x] `twitter:description` — set
- [x] `twitter:image` — set

### Structured Data (JSON-LD)
- [x] Organization schema — in `layout.tsx` (name, url, logo, description, products)
- [x] FAQPage schema — in `FAQ.tsx` (synced with actual FAQ items)

### Branding / Icons
- [x] Favicon — `app/icon.svg` (SVG, modern browsers prefer this)
- [x] Apple Touch Icon — `app/apple-icon.png` (512px, for iPhone/iPad home screen)
- [x] OG Image — stored in `public/branding/`

### Performance (affects SEO ranking)
- [x] No framer-motion / three.js (heavy libraries removed)
- [x] Lazy-loading for below-fold components (`dynamic(() => import(...))`)
- [x] Hero image uses `priority` + `fetchPriority="high"`
- [x] Below-fold images use `loading="lazy"`
- [x] RevealOnScroll uses `mounted` pattern — content visible to Google crawlers

---

## NOT DONE YET (Manual Steps Required)

### Google Search Console (MOST IMPORTANT)
- [ ] Go to https://search.google.com/search-console
- [ ] Add property: `abc.com`
- [ ] Verify ownership via **DNS TXT record** in your domain registrar (GoDaddy, Namecheap, etc.)
  - Google gives you a TXT record like: `google-site-verification=xxxxx`
  - Add it to your domain's DNS settings
- [ ] After verification → Sitemaps → Submit `https://abc.com/sitemap.xml`
- [ ] Check "Coverage" tab after 48 hours to see which pages Google indexed

### Custom Domain Connection (Vercel)
- [ ] Go to Vercel Dashboard → ABC project → Settings → Domains
- [ ] Add `abc.com` and `www.abc.com`
- [ ] Vercel gives you DNS records (A record + CNAME)
- [ ] Add those records in your domain registrar
- [ ] Wait 24-48 hours for DNS to propagate
- [ ] HTTPS is automatic on Vercel

### OG Image (Social Preview Fix)
- [ ] Current OG image is `/branding/wfASt.jpg` — verify this file exists in `public/branding/`
- [ ] If missing, create a proper 1200x630px branded image (ABC logo + tagline on dark background)
- [ ] Test preview at: https://opengraph.xyz (paste your URL to see how it looks on WhatsApp, LinkedIn, Twitter)

### Google Analytics / Tracking
- [ ] Create account at https://analytics.google.com
- [ ] Get your `G-XXXXXXXXXX` tracking ID
- [ ] Add to `layout.tsx`:
  ```tsx
  import Script from "next/script";
  // inside <head>:
  <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" strategy="afterInteractive" />
  <Script id="ga" strategy="afterInteractive">{`
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    gtag('js',new Date());
    gtag('config','G-XXXXXXXX');
  `}</Script>
  ```

### Page Speed / Core Web Vitals (Google ranking factor)
- [ ] Test at: https://pagespeed.web.dev (paste your URL)
- [ ] Target: 90+ score on mobile
- [ ] Common fixes if score is low:
  - Compress images (use WebP format)
  - Remove unused CSS
  - Reduce JavaScript bundle size

### Bing Webmaster Tools (optional but free extra traffic)
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add site, verify with DNS record
- [ ] Submit sitemap

---

## ADVANCED SEO (Future — when site has more content)

### More Structured Data Types
- [ ] `Product` schema — for each AI product (VisionDx, FlowDesk, etc.)
- [ ] `BreadcrumbList` schema — for product pages
- [ ] `WebSite` schema with `SearchAction` — enables Google sitelinks search box
- [ ] `Person` schema — for founders (Team section)

### Content SEO
- [ ] Blog section — Google rewards fresh content. Even 1 post/week helps
- [ ] Landing pages per product — `/products/flowdesk`, `/products/vaultos`, etc.
- [ ] Location page — "AI Company in Pakistan" targets local search
- [ ] Keywords to target: "AI automation Pakistan", "medical imaging AI", "VisionDx", "FlowDesk AI"

### Link Building
- [ ] Submit to Product Hunt — big boost for new SaaS products
- [ ] Submit to BetaList, Indie Hackers, SaaS directories
- [ ] Get listed on Crunchbase
- [ ] Write guest posts on Pakistani tech blogs with links back to abc.com

### Social Profiles (signals to Google)
- [ ] Create LinkedIn company page for ABC
- [ ] Create Twitter/X account @ABC (or similar)
- [ ] Link these from the website footer (currently href="#")
- [ ] Add `sameAs` links in Organization JSON-LD schema in `layout.tsx`

---

## QUICK SEO STATUS CHECK COMMANDS

```bash
# Check if sitemap is accessible
curl https://abc.com/sitemap.xml

# Check if robots.txt is correct
curl https://abc.com/robots.txt

# Check Open Graph tags on any page
npx opengraph-fetch https://abc.com
```

---

## PRIORITY ORDER (What to do first)

1. Connect `abc.com` domain to Vercel
2. Submit to Google Search Console + sitemap
3. Fix OG image (verify/create 1200x630 image)
4. Add Google Analytics
5. Test PageSpeed score → fix if below 80
6. Submit to Bing Webmaster Tools
7. Create LinkedIn + Twitter profiles
8. Product Hunt launch

---

*Last updated: May 2026*
