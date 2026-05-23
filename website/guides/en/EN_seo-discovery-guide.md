# SEO Discovery & Indexing — Complete Technical Guide
*Get search engines to discover, crawl, and index your site instantly — 2026 patterns*

---

## WHY THIS GUIDE?

The SEO Master Guide covers basic SEO. This guide has one purpose:
**Google, Bing, and other search engines must find your site INSTANTLY.**

3-step process:
1. **Discover** — search engine learns the site exists
2. **Crawl** — bot reads the pages
3. **Index** — pages stored in the database and shown in search results

---

## PART 1 — SITEMAP.XML (ADVANCED)

### Basic vs Advanced Sitemap

Basic (URLs only):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
  </url>
</urlset>
```

Advanced (priority + changefreq + lastmod):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/blog/docker-guide</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yoursite.com/about</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

**Priority guide:**
| Value | Use when |
|-------|----------|
| 1.0 | Homepage only |
| 0.9 | Main product/service pages |
| 0.8 | Important blog posts |
| 0.7 | Category pages |
| 0.5 | Regular pages (about, contact) |
| 0.3 | Tag/archive pages |

### Next.js — Dynamic Sitemap (`app/sitemap.ts`)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

const staticPages = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
  { url: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
  { url: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com'
  const now = new Date()

  const staticEntries = staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Dynamic pages — fetch from DB/CMS
  const posts = await fetchAllPosts()
  const dynamicEntries = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticEntries, ...dynamicEntries]
}
```

### Sitemap Index (For sites with 100+ pages)

```xml
<!-- sitemap-index.xml — multiple sitemaps in one place -->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://yoursite.com/sitemap-pages.xml</loc>
    <lastmod>2026-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://yoursite.com/sitemap-blog.xml</loc>
    <lastmod>2026-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://yoursite.com/sitemap-products.xml</loc>
    <lastmod>2026-01-15</lastmod>
  </sitemap>
</sitemapindex>
```

---

## PART 2 — ROBOTS.TXT (ADVANCED)

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yoursite.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API routes won't be indexed
          '/admin/',      // Admin panel
          '/_next/',      // Next.js internals
          '/private/',    // Private content
          '/*.json$',     // JSON files
        ],
      },
      {
        userAgent: 'GPTBot',   // ChatGPT crawler — block AI training
        disallow: '/',
      },
      {
        userAgent: 'CCBot',    // Common Crawl — AI datasets
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

**Common patterns:**
```
# Block query strings (duplicate content)
Disallow: /*?*

# Allow specific parameter (search pages)
Allow: /*?q=
Disallow: /*?*

# Conversion pages (don't index)
Disallow: /thank-you
Disallow: /checkout
Disallow: /cart
```

---

## PART 3 — INDEXNOW (INSTANT BING/YANDEX SUBMISSION)

### What Is IndexNow?

**Old way:** publish → wait for a bot to crawl (days/weeks)
**IndexNow:** publish → INSTANTLY notify Bing, Yandex, Seznam, ZeroFox

**Supported engines in 2026:** Bing, Yandex, Seznam.cz, Naver (Korea)
**Note:** Google does not support IndexNow — see Part 4 (Indexing API) for Google

### Step 1: Generate an API Key

```bash
# Random 32-char hex key
openssl rand -hex 16
# Output: a1b2c3d4e5f6789012345678abcdef01
```

Or generate from Bing: `bing.com/indexnow/getstarted`

### Step 2: Host the Key File

Host at `https://yoursite.com/{your-key}.txt`:

```typescript
// Simplest: public/a1b2c3d4e5f6789012345678abcdef01.txt
// File content: just write the key (one line)
a1b2c3d4e5f6789012345678abcdef01
```

Or via Next.js dynamic route:
```typescript
// app/a1b2c3d4e5f6789012345678abcdef01/route.ts
export async function GET() {
  return new Response(process.env.INDEXNOW_KEY, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
```

### Step 3: Submit a URL

```bash
# Single URL
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "yoursite.com",
    "key": "a1b2c3d4e5f6789012345678abcdef01",
    "keyLocation": "https://yoursite.com/a1b2c3d4e5f6789012345678abcdef01.txt",
    "urlList": ["https://yoursite.com/new-blog-post"]
  }'

# Multiple URLs (max 10,000 at once)
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "yoursite.com",
    "key": "a1b2c3d4e5f6789012345678abcdef01",
    "keyLocation": "https://yoursite.com/a1b2c3d4e5f6789012345678abcdef01.txt",
    "urlList": [
      "https://yoursite.com/post-1",
      "https://yoursite.com/post-2"
    ]
  }'
```

**Response codes:**
| Code | Meaning |
|------|---------|
| 200 | Submitted successfully |
| 202 | Accepted (async processing) |
| 400 | Invalid request — check the JSON |
| 403 | Key mismatch — check the key file |
| 422 | URLs don't match the host |
| 429 | Rate limit — try again later |

### Next.js Auto-Submit Library

```typescript
// lib/indexnow.ts
const INDEXNOW_KEY = process.env.INDEXNOW_KEY!
const SITE_HOST = 'yoursite.com'
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`

export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!INDEXNOW_KEY) return false

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    })

    console.log(`IndexNow: ${res.status} for ${urls.length} URLs`)
    return res.ok
  } catch (err) {
    console.error('IndexNow failed:', err)
    return false
  }
}
```

```typescript
// Call in CMS publish flow
// app/api/publish/route.ts
import { submitToIndexNow } from '@/lib/indexnow'

export async function POST(req: Request) {
  const { slug } = await req.json()

  await savePost(slug)                                    // 1. Save to DB

  const url = `https://yoursite.com/blog/${slug}`
  await submitToIndexNow([url])                           // 2. Instantly notify

  return Response.json({ success: true })
}
```

### Verify in Bing Webmaster Tools

```
1. bing.com/webmasters → Sign in with Microsoft
2. Add site → yoursite.com
3. IndexNow → Verify Key
4. Paste your key → Verify
5. Now you can also submit manually via "URL Submission"
```

---

## PART 4 — GOOGLE INDEXING API (INSTANT GOOGLE INDEXING)

### Important Note

The Google Indexing API officially supports only these 2 types:
1. **Job postings** (pages with `JobPosting` schema)
2. **Live broadcast pages** (pages with `BroadcastEvent` schema)

Unofficially: you can submit any page — Google usually indexes it fast.

### Setup (One Time)

**Step 1: Google Cloud Console**
```
1. console.cloud.google.com → Create new project
2. APIs & Services → Enable APIs → Search for "Web Search Indexing API" → Enable
3. IAM & Admin → Service Accounts → Create Service Account
4. Keys tab → Add Key → JSON → Download
5. Name the JSON file: google-service-account.json
```

**Step 2: Grant Access in Search Console**
```
1. search.google.com/search-console → your property
2. Settings → Users and permissions → Add user
3. Copy "client_email" from the JSON file → paste it
4. Permission: Owner
5. Add
```

**Step 3: Code**
```bash
npm install googleapis
```

```typescript
// lib/google-indexing.ts
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'),
  scopes: ['https://www.googleapis.com/auth/indexing'],
})

export async function requestGoogleIndex(url: string) {
  const client = await auth.getClient()
  const indexing = google.indexing({ version: 'v3', auth: client as any })

  const res = await indexing.urlNotifications.publish({
    requestBody: {
      url,
      type: 'URL_UPDATED',   // or 'URL_DELETED' to remove
    },
  })

  return res.data
}
```

```bash
# In .env.local
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key":"...","client_email":"...@....iam.gserviceaccount.com",...}'
```

**Rate limits:** ~200 requests/day — if exceeded, use GSC URL Inspection manually

---

## PART 5 — OPEN GRAPH (COMPLETE)

### What Every Tag Does

```html
<!-- ===== REQUIRED ===== -->
<meta property="og:title" content="Docker Complete Guide 2026" />
<meta property="og:description" content="What Docker is, how to use it, 2026 best practices..." />
<meta property="og:image" content="https://yoursite.com/og/docker-guide.png" />
<meta property="og:url" content="https://yoursite.com/guide/docker" />
<meta property="og:type" content="article" />

<!-- ===== RECOMMENDED ===== -->
<meta property="og:site_name" content="DevGuides" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Docker Guide cover image" />

<!-- ===== FOR ARTICLE TYPE ===== -->
<meta property="article:published_time" content="2026-01-15T10:00:00Z" />
<meta property="article:modified_time" content="2026-01-20T12:00:00Z" />
<meta property="article:author" content="https://yoursite.com/author/km" />
<meta property="article:section" content="DevOps" />
<meta property="article:tag" content="Docker" />
<meta property="article:tag" content="Containers" />

<!-- ===== TWITTER / X CARDS ===== -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourhandle" />
<meta name="twitter:creator" content="@authorhandle" />
<meta name="twitter:title" content="Docker Complete Guide 2026" />
<meta name="twitter:description" content="What Docker is, how to use it..." />
<meta name="twitter:image" content="https://yoursite.com/og/docker-guide.png" />
<meta name="twitter:image:alt" content="Docker Guide" />
```

**og:type values:**
| Type | When to use |
|------|-------------|
| `website` | Homepage, static pages |
| `article` | Blog posts, guides |
| `product` | Product pages |
| `profile` | Author/person pages |
| `video.other` | Video content |

**Twitter card types:**
| Card | Description |
|------|-------------|
| `summary_large_image` | Large image — best for blogs |
| `summary` | Small image — for apps/tools |
| `app` | For mobile app downloads |
| `player` | For video/audio content |

### Next.js `generateMetadata` (Proper Setup)

```typescript
// app/guide/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}

  const ogImage = `https://yoursite.com/api/og?title=${encodeURIComponent(guide.title)}&cat=${encodeURIComponent(guide.category)}`

  return {
    title: `${guide.title} — DevGuides`,
    description: guide.description,

    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://yoursite.com/guide/${slug}`,
      siteName: 'DevGuides',
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.title }],
      type: 'article',
      publishedTime: '2026-01-15T00:00:00Z',
      modifiedTime: '2026-01-20T00:00:00Z',
      authors: ['https://yoursite.com/author'],
      tags: [guide.category],
    },

    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [ogImage],
      creator: '@yourhandle',
    },

    alternates: {
      canonical: `https://yoursite.com/guide/${slug}`,
    },
  }
}
```

### Dynamic OG Image (Next.js built-in)

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title') ?? 'DevGuides'
  const cat = req.nextUrl.searchParams.get('cat') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px', height: '630px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        }}
      >
        <div style={{ color: '#38bdf8', fontSize: '22px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>
          {cat}
        </div>
        <div style={{ color: '#ffffff', fontSize: '58px', fontWeight: 'bold', lineHeight: 1.15, marginBottom: '32px' }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: '#38bdf8', borderRadius: '8px' }} />
          <div style={{ color: '#94a3b8', fontSize: '22px' }}>DevGuides • 2026</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

// Use: /api/og?title=Docker+Guide&cat=Deploy+%26+Infra
```

**Test:**
- Open Graph: `https://opengraph.xyz`
- Twitter: `https://cards-dev.twitter.com/validator`

---

## PART 6 — STRUCTURED DATA / JSON-LD (WORKING CODE)

### Organization Schema (Add to Layout)

```tsx
// app/layout.tsx
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevGuides',
  url: 'https://yoursite.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://yoursite.com/logo.png',
    width: 200,
    height: 200,
  },
  description: '16 developer guides covering Docker, CI/CD, databases, and more',
  sameAs: [
    'https://twitter.com/yourhandle',
    'https://github.com/yourorg',
    'https://linkedin.com/company/yourcompany',
  ],
}

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
/>
```

### WebSite Schema + Sitelinks Search Box

```typescript
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevGuides',
  url: 'https://yoursite.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://yoursite.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}
// Adding this can trigger a sitelinks search box in Google
```

### Article / TechArticle Schema (On Guide Pages)

```typescript
// In app/guide/[slug]/page.tsx
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: guide.title,
  description: guide.description,
  image: `https://yoursite.com/api/og?title=${encodeURIComponent(guide.title)}`,
  author: {
    '@type': 'Person',
    name: 'KM',
    url: 'https://yoursite.com/author',
  },
  publisher: {
    '@type': 'Organization',
    name: 'DevGuides',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
    },
  },
  datePublished: '2026-01-15',
  dateModified: '2026-01-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://yoursite.com/guide/${guide.slug}`,
  },
  keywords: guide.category,
}
```

### FAQPage Schema (Get Answer Boxes in Google)

```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Docker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Docker is a containerization tool that runs applications in an isolated environment. Unlike VMs, Docker containers don\'t include a full OS — just the application layer, measured in MBs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Docker and a Virtual Machine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VMs include a full OS (GB in size, minutes to start). Docker containers only have the app layer (MB in size, seconds to start). Dozens of containers can run on the same machine.',
      },
    },
  ],
}
```

### BreadcrumbList Schema

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://yoursite.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: guide.category,
      item: `https://yoursite.com/category/${guide.category.toLowerCase().replace(' ', '-')}`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: guide.title,
      item: `https://yoursite.com/guide/${guide.slug}`,
    },
  ],
}
```

### Multiple Schemas on One Page

```tsx
// app/guide/[slug]/page.tsx
export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  const schemas = [articleSchema, breadcrumbSchema]
  // If there's a FAQ: schemas.push(faqSchema)

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* page content */}
    </>
  )
}
```

---

## PART 7 — CRAWL BUDGET OPTIMIZATION

### What Is Crawl Budget?

Google gives your site a limited number of crawl requests per day (especially for new sites).
If you have 500 pages and a budget of 100 crawls/day — important pages get indexed first.

### 5 Rules

**1. Remove orphan pages**
Every page should have at least one internal link. Orphan pages = wasted crawl budget.

**2. Noindex low-value pages**
```typescript
// Pages that should not be indexed
export const metadata: Metadata = {
  robots: { index: false, follow: true }
}
// Apply to: /thank-you, /cart, /checkout, /search?q=, /admin/*
```

**3. Fix duplicate content with canonical**
```typescript
alternates: {
  canonical: 'https://yoursite.com/guide/docker',
}
// URLs with UTM parameters will automatically redirect to the canonical
```

**4. Internal linking — create crawl paths**
```
Homepage → Category pages → Individual guides → Related guides
```
Add a "Related Guides" section at the bottom of each guide:
```tsx
<section className="mt-16 pt-8 border-t">
  <h2>Related Guides</h2>
  {relatedGuides.map(g => (
    <Link key={g.slug} href={`/guide/${g.slug}`}>{g.title}</Link>
  ))}
</section>
```

**5. Check 404 pages regularly**
```
Google Search Console → Coverage → Not found (404)
```
Broken links = wasted crawl budget + bad UX

---

## PART 8 — GOOGLE SEARCH CONSOLE SETUP

### Verify Your Site

```typescript
// In app/layout.tsx
export const metadata: Metadata = {
  verification: {
    google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // Or HTML file method: public/googleverfication.html
  },
}
```

### Submit Sitemap

```
GSC → Sitemaps (left sidebar) → Add sitemap
Type: sitemap.xml → Submit
```

### URL Inspect Tool (Manual Fast Indexing — Free)

```
GSC → URL Inspection
Enter URL → Request Indexing
Limit: ~10 requests/day
Usually indexes within 24–48 hours
```

---

## PART 9 — hreflang (Multi-Language)

If your site has both English and Urdu versions:

```typescript
// In generateMetadata
return {
  alternates: {
    canonical: 'https://yoursite.com/guide/docker',
    languages: {
      'en': 'https://yoursite.com/guide/docker',
      'ur': 'https://yoursite.com/ur/guide/docker',
      'x-default': 'https://yoursite.com/guide/docker',
    },
  },
}
```

---

## PART 10 — PER-PAGE TRAFFIC ANALYSIS (Why a Guide Has Low Traffic)

### Tool 1: Google Analytics 4 — Page Views Per Guide

**Setup (if not installed):**
```bash
npm install @next/third-parties
```

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  )
}
```

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Exact path to view traffic per guide:**
```
analytics.google.com
→ Reports (left sidebar)
→ Engagement
→ Pages and screens

You'll find:
- Page path: /guide/docker-guide, /guide/testing-guide etc.
- Views: how many times viewed
- Users: how many unique visitors
- Average engagement time: average time spent
- Bounce rate (effectively): engaged sessions %
```

**Filter for a specific guide:**
```
Above the Pages and screens table → "Add filter" button
→ Page path → contains → "guide"
→ Now only guide pages are shown
→ Sort by "Views" → highest to lowest
```

**Export to CSV (for weekly reports):**
```
Top right of table → Share icon → Download CSV
```

---

### Tool 2: Google Search Console — Why Low Traffic? (MOST IMPORTANT)

GA4 tells you **how much** traffic you have. GSC tells you **why it's low**.

**Exact path — per-page query analysis:**
```
search.google.com/search-console
→ Search results (left sidebar, Performance section)
→ Top right: Date range → Last 3 months

Table has 4 columns:
- Clicks: actual visitors who came from Google
- Impressions: how many times shown in Google results
- CTR: clicks ÷ impressions (click-through rate)
- Position: average ranking

Click the PAGES tab (after the Queries tab)
→ Click your guide's URL
→ Now go to the "Queries" tab
→ This shows which keywords that page is ranking for!
```

**CTR Analysis — Page appeared but wasn't clicked:**

| CTR | Meaning | Fix |
|-----|---------|-----|
| < 1% | Title/description is boring | Rewrite title + meta description |
| 1–3% | Average | A/B test titles |
| 3–5% | Good | Minor improvements |
| 5%+ | Excellent | Copy this style for other pages |

**Position vs Traffic matrix:**

| Position | Impressions | Clicks | Problem |
|----------|-------------|--------|---------|
| 1–3 | High | High | ✅ Fine |
| 1–3 | High | Low | Fix title/description |
| 4–10 | High | Low | Push to top 3 → need backlinks |
| 11–20 | Medium | Very low | Page 2 — optimize to get to page 1 |
| 20+ | Low | None | Page too new or keyword too competitive |

**Action: "Move from Page 2 to Page 1" — Quick Win**
```
GSC → Pages tab → click guide URL
→ Queries tab shows which keywords are at position 8–15
→ Target these keywords:
  1. Add them to the page headings
  2. Use them naturally 2–3 times in content
  3. Update internal links (anchor text should include the keyword)
  4. Get backlinks from other sites using that keyword
→ Position should improve within 2–4 weeks
```

**Coverage Report — Indexing problems:**
```
GSC → Pages (Indexing section)
→ "Not indexed" → list of reasons:

Common reasons:
- "Crawled - currently not indexed" → Content too thin, improve it
- "Discovered - currently not indexed" → Crawl budget low, add internal links
- "Duplicate without canonical" → Fix canonical
- "Blocked by robots.txt" → Check robots.ts
- "Page with redirect" → Check for redirect chains
```

---

### Tool 3: Microsoft Clarity — FREE Heatmaps + Session Recording

**What is Clarity?**
- Same functionality as Hotjar — completely free, no limits
- Heatmaps: where users click, where they scroll
- Session recordings: watch actual user sessions as videos
- Built by Microsoft — privacy compliant

**Setup:**
```
1. clarity.microsoft.com → Sign up (Microsoft account)
2. New project → yoursite.com
3. You'll get a Clarity Project ID (e.g., "abc123xyz")
4. Install:
```

```bash
npm install @microsoft/clarity
```

```tsx
// app/layout.tsx
'use client'
import { useEffect } from 'react'

// Inside the layout component:
useEffect(() => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.clarity = window.clarity || function() {
      (window.clarity.q = window.clarity.q || []).push(arguments)
    }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.clarity.ms/tag/YOUR_PROJECT_ID'
    document.head.appendChild(script)
  }
}, [])
```

Or using Next.js Script component (better performance):
```tsx
// app/layout.tsx
import Script from 'next/script'

// Add inside <body>:
<Script
  id="microsoft-clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
    `,
  }}
/>
```

**What you learn from Clarity:**

```
clarity.microsoft.com → Dashboard

1. Heatmaps → select page → /guide/docker-guide
   → See where users click
   → See scroll depth — how many reach the bottom
   → "Dead clicks" — clicks where nothing happens
   → "Rage clicks" — frustrated users — something isn't working there

2. Recordings
   → Actual user session videos
   → Filter: Pages → /guide/testing-guide → the low-traffic one
   → See what users do after landing, where they go
   → When do they close the page — was content boring or hard to read?

3. Insights (AI-powered)
   → Clarity automatically tells you:
      "Users on /guide/performance are rage clicking the TOC"
      "High scroll on /guide/docker — users engaged"
      "Quick exits on /guide/frontend — might need better intro"
```

---

### Tool 4: Ahrefs / Semrush (Paid — When You Have Budget)

Free alternatives can work, but these tools tell you:
- Competitor traffic
- How many backlinks you have
- Keyword difficulty
- Ranking history

**Free alternatives that are quite sufficient:**
- **Ahrefs Webmaster Tools** (free, limited) — ahrefs.com/webmaster-tools
- **Ubersuggest** (limited free) — keyword ideas
- **Google Keyword Planner** (free with Google Ads account) — search volumes

---

### Diagnosis Workflow: "Why Does Guide X Have Low Traffic?"

Follow this step-by-step process when a guide is underperforming:

**Step 1: Check if it's indexed**
```
GSC → URL Inspection
→ Paste: https://yoursite.com/guide/testing-guide
→ Should show "URL is on Google"
→ If not: Request Indexing
```

**Step 2: Check impressions**
```
GSC → Search results → Pages tab → click the guide URL
→ Impressions: 0 or very low?
  → Keyword targeting problem — page isn't ranking for any query
  → Fix: better keyword research, optimize title/headings
→ Impressions but no Clicks?
  → CTR problem — title or description is boring
  → Fix: write a compelling title + meta description
```

**Step 3: Check position**
```
GSC → same page → Queries tab
→ Average position 11–20? → You're on page 2 — follow "Page 2 Quick Win" steps
→ Average position 20+? → Either keyword too competitive or content quality
```

**Step 4: Content quality check**
```
Honestly assess:
□ Does the heading include the main keyword?
□ Is the content detailed or just surface level?
□ Are there actual code examples / practical steps?
□ Is a competitor's page more helpful on this topic?
□ Is the page loading fast? (check at pagespeed.web.dev)
```

**Step 5: Watch session recordings in Clarity**
```
clarity.microsoft.com → Recordings → filter by /guide/testing-guide
→ How long did they stay?
→ Where did they stop scrolling?
→ When did they hit the back button?
→ This tells you exactly where the content has a problem
```

**Step 6: Check internal links**
```
Are other pages on the site linking to this guide?
→ GSC → Links → Internal links → check the specific URL
→ If it's only linked from the sidebar:
  → Mention it on the home page
  → Add it to related guides
  → Add a link in the bottom of other relevant guides
```

**Quick fix priority:**
```
Not indexed → Fix immediately (GSC Request Indexing)
No impressions → Keyword/title fix (1–2 weeks)
Low CTR → Rewrite meta description (quick win)
Position 11–20 → Internal links + content improve (2–4 weeks)
Position 20+ → Major content rewrite or target a different keyword
```

---

### Weekly 15-Minute Routine

**Do this every Monday (15 min total):**

```
1. GA4 → Pages and screens → Sort by Views
   → Which guides are at the top? (2 min)
   → Which are at the bottom? → Note them down

2. GSC → Search results → Dates: Last 7 days vs Previous period
   → Total clicks up or down?
   → Pages tab → which guide improved/declined? (5 min)

3. GSC → Pages → Not indexed section
   → Any new indexing issues? (2 min)

4. Clarity → Dashboard → AI Insights
   → Any rage clicks or dead clicks? (3 min)

5. Action: pick one underperforming guide
   → Make one small improvement (title, heading, internal link)
   → Note it — check results next week (3 min)
```

---

## QUICK CHECKLIST

### New Site Launch (Day 1)

- [ ] Create `app/sitemap.ts` → test at: `yoursite.com/sitemap.xml`
- [ ] Create `app/robots.ts` → test at: `yoursite.com/robots.txt`
- [ ] Google Search Console: add + verify site + submit sitemap
- [ ] Bing Webmaster Tools: add site + submit sitemap
- [ ] Generate IndexNow key → host `.txt` file → verify in Bing

### New Page Published (Every Time)

- [ ] Call IndexNow API (instant Bing/Yandex notification)
- [ ] GSC → URL Inspection → Request Indexing (Google)
- [ ] Update internal links (add links from related pages)

### Open Graph on Every Page

- [ ] `og:title` (max 60 chars)
- [ ] `og:description` (max 160 chars)
- [ ] `og:image` (1200x630px, `https://` URL)
- [ ] `og:url` (canonical URL)
- [ ] `og:type` (`website` / `article`)
- [ ] `og:site_name`
- [ ] `twitter:card` = `summary_large_image`
- [ ] Test at: `opengraph.xyz`

### Structured Data on Every Site

- [ ] Homepage: `Organization` + `WebSite` schema
- [ ] Guide/Blog pages: `TechArticle` schema
- [ ] FAQ section: `FAQPage` schema
- [ ] Breadcrumbs: `BreadcrumbList` schema
- [ ] Test at: `search.google.com/test/rich-results`

---

## TOOLS SUMMARY

### Traffic & Analytics

| Tool | Purpose | URL | Cost |
|------|---------|-----|------|
| Google Analytics 4 | Per-page views, traffic sources, engagement | analytics.google.com | Free |
| Google Search Console | Per-page queries, CTR, position, indexing | search.google.com/search-console | Free |
| Microsoft Clarity | Heatmaps, session recordings, AI insights | clarity.microsoft.com | Free |
| Ahrefs Webmaster Tools | Backlinks, organic keywords (limited) | ahrefs.com/webmaster-tools | Free (limited) |
| PageSpeed Insights | Core Web Vitals per page | pagespeed.web.dev | Free |

### Indexing & Discovery

| Tool | Purpose | URL | Cost |
|------|---------|-----|------|
| Bing Webmaster Tools | Bing indexing, IndexNow verify | bing.com/webmasters | Free |
| GSC URL Inspection | Manual Google index request | GSC → URL Inspection | Free |
| IndexNow API | Instant Bing/Yandex submission | api.indexnow.org | Free |

### Validation & Testing

| Tool | Purpose | URL | Cost |
|------|---------|-----|------|
| Rich Results Test | JSON-LD structured data | search.google.com/test/rich-results | Free |
| Open Graph Preview | OG + Twitter card preview | opengraph.xyz | Free |
| Twitter Card Validator | Twitter preview test | cards-dev.twitter.com/validator | Free |
| Schema Validator | Validate JSON-LD | validator.schema.org | Free |
| JSON-LD Playground | Write + test schema | json-ld.org/playground | Free |
