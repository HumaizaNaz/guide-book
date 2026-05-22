# SEO Discovery & Indexing — Complete Technical Guide
*Search engines ko apni site discover, crawl, aur index karwao — 2026 patterns*

---

## YEH GUIDE KYUN?

SEO Master Guide mein basic SEO hai. Yeh guide sirf ek kaam ke liye hai:
**Google, Bing, aur baaki search engines ko apni site INSTANTLY milni chahiye.**

3 step process:
1. **Discover** — search engine ko pata chale site exist karti hai
2. **Crawl** — bot pages padhe
3. **Index** — pages database mein store ho aur search results mein dikhen

---

## PART 1 — SITEMAP.XML (ADVANCED)

### Basic vs Advanced Sitemap

Basic (sirf URLs):
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
| Value | Use karo |
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

  // Dynamic pages — DB/CMS se fetch karo
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

### Sitemap Index (100+ pages wali sites ke liye)

```xml
<!-- sitemap-index.xml — alag alag sitemaps ek jagah -->
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
          '/api/',        // API routes index nahi hongi
          '/admin/',      // Admin panel
          '/_next/',      // Next.js internals
          '/private/',    // Private content
          '/*.json$',     // JSON files
        ],
      },
      {
        userAgent: 'GPTBot',   // ChatGPT crawler — AI training se bachao
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
# Query strings block karo (duplicate content)
Disallow: /*?*

# Specific parameter allow karo (search pages)
Allow: /*?q=
Disallow: /*?*

# Conversion pages (index nahi karni)
Disallow: /thank-you
Disallow: /checkout
Disallow: /cart
```

---

## PART 3 — INDEXNOW (INSTANT BING/YANDEX SUBMISSION)

### IndexNow Kya Hai?

**Purani duniya:** publish karo → wait karo jab tak bot crawl kare (days/weeks)
**IndexNow:** publish karo → INSTANTLY Bing, Yandex, Seznam, ZeroFox ko batao

**2026 mein supported engines:** Bing, Yandex, Seznam.cz, Naver (Korea)
**Note:** Google IndexNow support nahi karta — unke liye Part 4 dekho (Indexing API)

### Step 1: API Key Generate Karo

```bash
# Random 32-char hex key
openssl rand -hex 16
# Output: a1b2c3d4e5f6789012345678abcdef01
```

Ya Bing se generate karo: `bing.com/indexnow/getstarted`

### Step 2: Key File Host Karo

`https://yoursite.com/{your-key}.txt` pe host karo:

```typescript
// Simplest: public/a1b2c3d4e5f6789012345678abcdef01.txt
// File content: sirf key hi likho (ek line)
a1b2c3d4e5f6789012345678abcdef01
```

Ya Next.js dynamic route:
```typescript
// app/a1b2c3d4e5f6789012345678abcdef01/route.ts
export async function GET() {
  return new Response(process.env.INDEXNOW_KEY, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
```

### Step 3: URL Submit Karo

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

# Multiple URLs (max 10,000 ek saath)
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
| Code | Matlab |
|------|--------|
| 200 | Submitted successfully |
| 202 | Accepted (async processing) |
| 400 | Invalid request — JSON check karo |
| 403 | Key mismatch — key file check karo |
| 422 | URLs host se match nahi karti |
| 429 | Rate limit — thodi der baad try karo |

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
// CMS publish flow mein call karo
// app/api/publish/route.ts
import { submitToIndexNow } from '@/lib/indexnow'

export async function POST(req: Request) {
  const { slug } = await req.json()

  await savePost(slug)                                    // 1. DB mein save

  const url = `https://yoursite.com/blog/${slug}`
  await submitToIndexNow([url])                           // 2. Instantly notify

  return Response.json({ success: true })
}
```

### Bing Webmaster Tools mein Verify karo

```
1. bing.com/webmasters → Sign in with Microsoft
2. Add site → yoursite.com
3. IndexNow → Verify Key
4. Paste your key → Verify
5. Ab "URL Submission" se manually bhi kar sakte ho
```

---

## PART 4 — GOOGLE INDEXING API (INSTANT GOOGLE INDEXING)

### Important Note

Google Indexing API officially sirf yeh 2 types ke liye:
1. **Job postings** (`JobPosting` schema wale pages)
2. **Live broadcast pages** (`BroadcastEvent` schema wale pages)

Unofficially: koi bhi page submit kar sakte ho — Google usually fast index karta hai.

### Setup (One Time)

**Step 1: Google Cloud Console**
```
1. console.cloud.google.com → New Project banao
2. APIs & Services → Enable APIs → "Web Search Indexing API" search karo → Enable
3. IAM & Admin → Service Accounts → Create Service Account
4. Keys tab → Add Key → JSON → Download
5. JSON file ka naam: google-service-account.json
```

**Step 2: Search Console mein access do**
```
1. search.google.com/search-console → apni property
2. Settings → Users and permissions → Add user
3. JSON file mein "client_email" field copy karo → paste karo
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
      type: 'URL_UPDATED',   // ya 'URL_DELETED' agar remove karna ho
    },
  })

  return res.data
}
```

```bash
# .env.local mein
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key":"...","client_email":"...@....iam.gserviceaccount.com",...}'
```

**Rate limits:** ~200 requests/day — exceeded to GSC URL Inspection se manually karo

---

## PART 5 — OPEN GRAPH (COMPLETE)

### Har Tag Ka Matlab

```html
<!-- ===== REQUIRED ===== -->
<meta property="og:title" content="Docker Complete Guide 2026" />
<meta property="og:description" content="Docker kya hai, kaise use karo, 2026 best practices..." />
<meta property="og:image" content="https://yoursite.com/og/docker-guide.png" />
<meta property="og:url" content="https://yoursite.com/guide/docker" />
<meta property="og:type" content="article" />

<!-- ===== RECOMMENDED ===== -->
<meta property="og:site_name" content="DevGuides" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Docker Guide cover image" />

<!-- ===== ARTICLE TYPE ke liye ===== -->
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
<meta name="twitter:description" content="Docker kya hai, kaise use karo..." />
<meta name="twitter:image" content="https://yoursite.com/og/docker-guide.png" />
<meta name="twitter:image:alt" content="Docker Guide" />
```

**og:type values:**
| Type | Kab use karein |
|------|----------------|
| `website` | Homepage, static pages |
| `article` | Blog posts, guides |
| `product` | Product pages |
| `profile` | Author/person pages |
| `video.other` | Video content |

**Twitter card types:**
| Card | Description |
|------|-------------|
| `summary_large_image` | Badi image — blogs ke liye best |
| `summary` | Chhoti image — apps/tools ke liye |
| `app` | Mobile app download ke liye |
| `player` | Video/audio content ke liye |

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

**Test karo:**
- Open Graph: `https://opengraph.xyz`
- Twitter: `https://cards-dev.twitter.com/validator`

---

## PART 6 — STRUCTURED DATA / JSON-LD (WORKING CODE)

### Organization Schema (Layout mein lagao)

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

// JSX mein:
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
// Yeh lagao to Google search mein sitelinks search box aa sakta hai
```

### Article / TechArticle Schema (Guide pages pe)

```typescript
// app/guide/[slug]/page.tsx mein
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

### FAQPage Schema (Google pe answer boxes milti hain)

```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Docker kya hai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Docker ek containerization tool hai jo application ko isolated environment mein run karta hai. VM se alag — Docker mein pura OS nahi hota, sirf application layer hoti hai jo MB mein hoti hai.',
      },
    },
    {
      '@type': 'Question',
      name: 'Docker vs Virtual Machine mein kya fark hai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VM mein pura OS hota hai (GB size, minutes to start). Docker containers mein sirf app layer hoti hai (MB size, seconds to start). Same machine pe dozens of containers chal sakte hain.',
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

### Multiple Schemas Ek Page Pe

```tsx
// app/guide/[slug]/page.tsx
export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  const schemas = [articleSchema, breadcrumbSchema]
  // FAQ hai to push karo: schemas.push(faqSchema)

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

### Crawl Budget Kya Hai?

Google tumhare site pe daily limited crawl requests deta hai (naye sites ke liye especially).
Agar 500 pages hain aur budget 100 crawls/day hai — important pages pehle index honge.

### 5 Rules

**1. Orphan pages remove karo**
Har page ka koi na koi internal link hona chahiye. Orphan pages = crawl waste.

**2. Noindex low-value pages**
```typescript
// Pages jo index nahi hone chahiye
export const metadata: Metadata = {
  robots: { index: false, follow: true }
}
// Lagao: /thank-you, /cart, /checkout, /search?q=, /admin/*
```

**3. Duplicate content canonical se fix karo**
```typescript
alternates: {
  canonical: 'https://yoursite.com/guide/docker',
}
// UTM parameters wale URLs automatically canonical pe redirect honge
```

**4. Internal linking — crawl path banao**
```
Homepage → Category pages → Individual guides → Related guides
```
Har guide ke bottom mein "Related Guides" section add karo:
```tsx
<section className="mt-16 pt-8 border-t">
  <h2>Related Guides</h2>
  {relatedGuides.map(g => (
    <Link key={g.slug} href={`/guide/${g.slug}`}>{g.title}</Link>
  ))}
</section>
```

**5. 404 pages check karo regularly**
```
Google Search Console → Coverage → Not found (404)
```
Broken links = crawl waste + bad UX

---

## PART 8 — GOOGLE SEARCH CONSOLE SETUP

### Site Verify Karo

```typescript
// app/layout.tsx mein
export const metadata: Metadata = {
  verification: {
    google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    // Ya HTML file method: public/googleverfication.html
  },
}
```

### Sitemap Submit

```
GSC → Sitemaps (left sidebar) → Add sitemap
Type: sitemap.xml → Submit
```

### URL Inspect Tool (Manual Fast Indexing — Free)

```
GSC → URL Inspection
URL enter karo → Request Indexing
Limit: ~10 requests/day
Usually 24-48 hours mein index ho jata hai
```

---

## PART 9 — hreflang (Multi-Language)

Agar English + Urdu dono mein site hai:

```typescript
// generateMetadata mein
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

## PART 10 — PER-PAGE TRAFFIC ANALYSIS (Kon sa page kitna, kyun kam)

### Tool 1: Google Analytics 4 — Page Views Per Guide

**Setup (agar nahi lagaya):**
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

**Har guide ka traffic dekhne ka exact path:**
```
analytics.google.com
→ Reports (left sidebar)
→ Engagement
→ Pages and screens

Yahan milega:
- Page path: /guide/docker-guide, /guide/testing-guide etc.
- Views: kitni baar dekha gaya
- Users: kitne unique visitors
- Average engagement time: average kitni der ruke
- Bounce rate (effectively): engaged sessions %
```

**Filter specific guide ke liye:**
```
Pages and screens table ke upar → "Add filter" button
→ Page path → contains → "guide"
→ Ab sirf guide pages dikhenge
→ Sort by "Views" → highest to lowest
```

**Export karo CSV mein (weekly report ke liye):**
```
Table ke top right → Share icon → Download CSV
```

---

### Tool 2: Google Search Console — Kyun Kam Traffic? (SABSE IMPORTANT)

GA4 batata hai **kitna** traffic hai. GSC batata hai **kyun kam** hai.

**Exact path — per-page query analysis:**
```
search.google.com/search-console
→ Search results (left sidebar, Performance section mein)
→ Top right: Date range → Last 3 months

Table mein 4 columns:
- Clicks: actual visitors jo Google se aaye
- Impressions: kitni baar Google results mein dikh
- CTR: clicks ÷ impressions (click-through rate)
- Position: average ranking

Ab PAGES tab click karo (Queries ke baad wala tab)
→ Apni guide ka URL click karo
→ Ab "Queries" tab pe jao
→ Yeh page kaunse keywords pe rank kar raha hai!
```

**CTR Analysis — Page dikha lekin click nahi kiya:**

| CTR | Matlab | Fix |
|-----|--------|-----|
| < 1% | Title/description boring hai | Title + meta description rewrite karo |
| 1-3% | Average | A/B test karo titles |
| 3-5% | Acha | Minor improvements |
| 5%+ | Excellent | Copy this style for other pages |

**Position vs Traffic matrix:**

| Position | Impressions | Clicks | Problem |
|----------|-------------|--------|---------|
| 1-3 | High | High | ✅ Theek hai |
| 1-3 | High | Low | Title/description fix karo |
| 4-10 | High | Low | Push to top 3 → backlinks chahiye |
| 11-20 | Medium | Very low | Page 2 — optimize karo → page 1 tak lao |
| 20+ | Low | None | Page too new ya keyword too competitive |

**Action: "Page 2 se Page 1 pe lao" — Quick Win**
```
GSC → Pages tab → click guide URL
→ Queries tab dekhte hain kaunse keywords position 8-15 pe hain
→ Yahi keywords target karo:
  1. Un keywords ko page ke headings mein add karo
  2. Content mein naturally use karo 2-3 baar
  3. Internal links update karo (anchor text mein woh keyword ho)
  4. Doosre sites se backlink milao us keyword se
→ 2-4 weeks mein position improve hogi
```

**Coverage Report — Indexing problems:**
```
GSC → Pages (Indexing section mein)
→ "Not indexed" → reasons list dikhegi:

Common reasons:
- "Crawled - currently not indexed" → Content thin hai, improve karo
- "Discovered - currently not indexed" → Crawl budget kam hai, internal links add karo
- "Duplicate without canonical" → Canonical fix karo
- "Blocked by robots.txt" → robots.ts check karo
- "Page with redirect" → Redirect chain check karo
```

---

### Tool 3: Microsoft Clarity — FREE Heatmaps + Session Recording

**Clarity kya hai?**
- Hotjar jaisi functionality — completely free, koi limit nahi
- Heatmaps: users kahan click karte hain, kahan scroll karte hain
- Session recordings: actual user session video dekho
- Built by Microsoft — privacy compliant

**Setup:**
```
1. clarity.microsoft.com → Sign up (Microsoft account se)
2. New project → yoursite.com
3. Tumhe milega: Clarity Project ID (e.g., "abc123xyz")
4. Install karo:
```

```bash
npm install @microsoft/clarity
```

```tsx
// app/layout.tsx mein
'use client'
import { useEffect } from 'react'

// Layout component ke andar:
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

Ya Next.js Script component se (better performance):
```tsx
// app/layout.tsx
import Script from 'next/script'

// <body> ke andar add karo:
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

**Clarity se kya sikhte hain:**

```
clarity.microsoft.com → Dashboard

1. Heatmaps → select page → /guide/docker-guide
   → Dekho users kahan click karte hain
   → Scroll depth dekho — kitne log bottom tak jaate hain
   → "Dead clicks" — kahan click karte hain lekin kuch nahi hota
   → "Rage clicks" — frustrated users — kuch kaam nahi kar raha wahan

2. Recordings
   → Actual users ka session video
   → Filter: Pages → /guide/testing-guide → jo kam traffic wala hai
   → Dekho log page pe aa ke kya karte hain, kahan jaate hain
   → Kab page close karte hain — content boring tha ya hard to read?

3. Insights (AI-powered)
   → Clarity automatically batata hai:
      "Users on /guide/performance are rage clicking the TOC"
      "High scroll on /guide/docker — users engaged"
      "Quick exits on /guide/frontend — might need better intro"
```

---

### Tool 4: Ahrefs / Semrush (Paid — Jab budget ho)

Free alternatives se kaam chal sakta hai, lekin yeh tools batate hain:
- Competitor ka traffic
- Backlinks kitne hain
- Keyword difficulty
- Ranking history

**Free alternatives jo kaafi hain:**
- **Ahrefs Webmaster Tools** (free, limited) — ahrefs.com/webmaster-tools
- **Ubersuggest** (limited free) — keyword ideas
- **Google Keyword Planner** (free with Google Ads account) — search volumes

---

### Diagnosis Workflow: "Guide X ka traffic kyun kam hai?"

Yeh step-by-step process follow karo jab koi guide underperforming ho:

**Step 1: Check karo index hua hai ya nahi**
```
GSC → URL Inspection
→ Paste: https://yoursite.com/guide/testing-guide
→ "URL is on Google" dikhna chahiye
→ Agar nahi: Request Indexing
```

**Step 2: Impressions check karo**
```
GSC → Search results → Pages tab → guide URL click karo
→ Impressions: 0 ya bahut kam?
  → Keyword targeting problem — page kisi query pe rank nahi kar raha
  → Fix: better keyword research, optimize title/headings
→ Impressions hain lekin Clicks nahi?
  → CTR problem — title ya description boring
  → Fix: compelling title + meta description likho
```

**Step 3: Position check karo**
```
GSC → wahi page → Queries tab
→ Average position 11-20? → Page 2 pe ho — "Page 2 Quick Win" steps follow karo
→ Average position 20+? → Either keyword too competitive ya content quality
```

**Step 4: Content quality check**
```
Khud honestly dekho:
□ Kya heading mein main keyword hai?
□ Kya content detailed hai ya sirf surface level?
□ Kya koi actual code examples / practical steps hain?
□ Kya competitor ka page is topic pe zyada helpful hai?
□ Kya page fast load ho raha hai? (pagespeed.web.dev pe check karo)
```

**Step 5: Clarity mein session recording dekho**
```
clarity.microsoft.com → Recordings → filter by /guide/testing-guide
→ Log kitni der ruke?
→ Kahan scroll karke ruk gaye?
→ Kab back button dabaya?
→ Yeh batayega content mein exactly kahan problem hai
```

**Step 6: Internal links check karo**
```
Site ke doosre pages se yeh guide link ho rahi hai?
→ GSC → Links → Internal links → specific URL dekhte hain
→ Agar sirf sidebar se link hai:
  → Home page pe mention karo
  → Related guides mein add karo
  → Relevant doosri guides ke bottom mein link add karo
```

**Quick fix priority:**
```
Not indexed → Fix immediately (GSC Request Indexing)
No impressions → Keyword/title fix (1-2 weeks)
Low CTR → Meta description rewrite (quick win)
Position 11-20 → Internal links + content improve (2-4 weeks)
Position 20+ → Major content rewrite ya different keyword target karo
```

---

### Weekly 15-Minute Routine

**Har Monday karo (15 min total):**

```
1. GA4 → Pages and screens → Sort by Views
   → Kaunse guides top pe hain? (2 min)
   → Kaunse bottom pe hain? → Note down karo

2. GSC → Search results → Dates: Last 7 days vs Previous period
   → Total clicks up ya down?
   → Pages tab → kaunsi guide improve/decline hui? (5 min)

3. GSC → Pages → Not indexed section
   → Naye indexing issues toh nahi? (2 min)

4. Clarity → Dashboard → AI Insights
   → Koi rage clicks ya dead clicks? (3 min)

5. Action: ek guide pick karo jo underperforming hai
   → Ek small improvement karo (title, heading, internal link)
   → Note karo — next week results dekhna hai (3 min)
```

---

## QUICK CHECKLIST

### Naya Site Launch (Day 1)

- [ ] `app/sitemap.ts` banao → test: `yoursite.com/sitemap.xml`
- [ ] `app/robots.ts` banao → test: `yoursite.com/robots.txt`
- [ ] Google Search Console: site add + verify + sitemap submit
- [ ] Bing Webmaster Tools: site add + sitemap submit
- [ ] IndexNow key generate → `.txt` file host karo → Bing mein verify

### Naya Page Publish (Har Baar)

- [ ] IndexNow API call karo (Bing/Yandex instant notification)
- [ ] GSC → URL Inspection → Request Indexing (Google)
- [ ] Internal links update karo (related pages se link add karo)

### Open Graph Har Page Pe

- [ ] `og:title` (60 chars max)
- [ ] `og:description` (160 chars max)
- [ ] `og:image` (1200x630px, `https://` URL)
- [ ] `og:url` (canonical URL)
- [ ] `og:type` (`website` / `article`)
- [ ] `og:site_name`
- [ ] `twitter:card` = `summary_large_image`
- [ ] Test: `opengraph.xyz`

### Structured Data Har Site Pe

- [ ] Homepage: `Organization` + `WebSite` schema
- [ ] Guide/Blog pages: `TechArticle` schema
- [ ] FAQ section hai to: `FAQPage` schema
- [ ] Breadcrumbs: `BreadcrumbList` schema
- [ ] Test: `search.google.com/test/rich-results`

---

## TOOLS SUMMARY

### Traffic & Analytics

| Tool | Kaam | URL | Cost |
|------|------|-----|------|
| Google Analytics 4 | Per-page views, traffic sources, engagement | analytics.google.com | Free |
| Google Search Console | Per-page queries, CTR, position, indexing | search.google.com/search-console | Free |
| Microsoft Clarity | Heatmaps, session recordings, AI insights | clarity.microsoft.com | Free |
| Ahrefs Webmaster Tools | Backlinks, organic keywords (limited) | ahrefs.com/webmaster-tools | Free (limited) |
| PageSpeed Insights | Core Web Vitals per page | pagespeed.web.dev | Free |

### Indexing & Discovery

| Tool | Kaam | URL | Cost |
|------|------|-----|------|
| Bing Webmaster Tools | Bing indexing, IndexNow verify | bing.com/webmasters | Free |
| GSC URL Inspection | Manual Google index request | GSC → URL Inspection | Free |
| IndexNow API | Instant Bing/Yandex submission | api.indexnow.org | Free |

### Validation & Testing

| Tool | Kaam | URL | Cost |
|------|------|-----|------|
| Rich Results Test | JSON-LD structured data | search.google.com/test/rich-results | Free |
| Open Graph Preview | OG + Twitter card preview | opengraph.xyz | Free |
| Twitter Card Validator | Twitter preview test | cards-dev.twitter.com/validator | Free |
| Schema Validator | JSON-LD validate | validator.schema.org | Free |
| JSON-LD Playground | Schema write + test | json-ld.org/playground | Free |
