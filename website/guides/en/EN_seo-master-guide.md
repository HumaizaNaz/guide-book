# SEO Master Guide — Complete Knowledge Base
*General guide — works for any website*

---

## WHAT IS SEO? (Simple Explanation)

SEO = Search Engine Optimization
Meaning: when someone searches something on Google, your website appears on the first page.

Google looks at 3 things:
1. **Technical** — is the website built properly?
2. **Content** — does the website have useful content?
3. **Authority** — do other websites link to you?

---

## PART 1 — TECHNICAL SEO

### 1. Title Tag
```html
<title>Keyword — Brand Name</title>
```
- Max 60 characters
- Every page must have a unique title
- Write the most important keyword first
- Example: `Medical Imaging AI — VisionDx` (good) vs `Home` (bad)

### 2. Meta Description
```html
<meta name="description" content="...">
```
- Max 160 characters
- This is what appears in Google search results
- Write it compellingly — like ad copy
- Example: `AI-powered X-ray analysis in 8 seconds. Free beta access for doctors.`

### 3. Canonical URL
```html
<link rel="canonical" href="https://yoursite.com/page" />
```
- Protects against duplicate content
- Add to every page
- Especially important if the same content exists at multiple URLs

### 4. Sitemap.xml
- Tells Google which pages exist on your site
- URL: `yoursite.com/sitemap.xml`
- Generate automatically (Next.js, WordPress all have this built-in)
- Submit it in Google Search Console

### 5. Robots.txt
- Tells Google which pages to crawl and which to skip
- URL: `yoursite.com/robots.txt`
- Basic version:
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

### 6. HTTPS (SSL Certificate)
- Google does not rank HTTP sites properly
- Automatic on Vercel/Netlify/most hosts
- Check: there should be a lock icon in the URL bar

### 7. Mobile-Friendly (MOST IMPORTANT)
- Google looks at the mobile version first — "Mobile First Indexing"
- Test at: https://search.google.com/test/mobile-friendly
- Use responsive design (Tailwind CSS does this automatically)

### 8. Page Speed (Core Web Vitals)
Google measures 3 things:
- **LCP** (Largest Contentful Paint) — how quickly the hero image/text loads
- **CLS** (Cumulative Layout Shift) — do elements shift around while the page loads
- **FID/INP** — how quickly the page responds to a click
- Test: https://pagespeed.web.dev
- Target: 90+ score on mobile

### 9. Structured Data (JSON-LD)
Gives Google extra information — earns rich results (stars, FAQ dropdowns, etc.)

**Types:**
```
Organization  — company info
FAQPage       — FAQ section (expands directly in Google results!)
Product       — product pages (shows price, rating)
Article       — blog posts
Person        — team members
BreadcrumbList — navigation path
LocalBusiness — local shops/offices
```

Example benefit: add FAQ schema → Google expands answers directly in search → more clicks

### 10. Open Graph Tags (Social Preview)
When you share a link on WhatsApp/LinkedIn/Twitter, this controls the preview:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:url" content="https://yoursite.com" />
```
- Image size: exactly **1200 x 630 pixels**
- Test at: https://opengraph.xyz

### 11. Heading Structure
```html
<h1>Main Page Title</h1>      <!-- Only ONE h1 per page -->
  <h2>Section Title</h2>
    <h3>Sub-section</h3>
```
- The h1 must contain the main keyword
- Don't skip levels (jumping from H1 to H3 directly is bad)

### 12. Image Alt Text
```html
<img src="xray.jpg" alt="AI chest X-ray analysis result" />
```
- Every image must have alt text
- Write descriptively — Google Images also drives traffic
- Decorative images get `alt=""` (empty)

---

## PART 2 — CONTENT SEO

### 13. Keyword Research (MOST IMPORTANT)
First, understand what people are actually searching for:

**Free Tools:**
- Google Search bar — type something and look at the suggestions
- https://ahrefs.com/keyword-generator (free)
- https://answerthepublic.com — see what questions people ask
- Google Search Console — see which keywords already bring traffic

**Keyword Types:**
- **Short-tail:** `AI software` — high competition, hard to rank
- **Long-tail:** `AI medical imaging software for clinics in Pakistan` — low competition, easy to rank, better conversion

**Rule:** For a new site, only target long-tail keywords

### 14. Search Intent (VERY IMPORTANT)
Understand the intent behind a keyword — Google shows what the user actually wants:

- **Informational:** "how does AI work" → write a blog post
- **Commercial:** "best AI tools" → create a comparison page
- **Transactional:** "buy AI software" → build a product/pricing page
- **Navigational:** "Novaj AI login" → homepage/login page

### 15. Content Quality
- Min 500 words per page (1000+ for important pages)
- Use keywords naturally — don't stuff them
- Put keywords in headings
- Add internal links (link to your other pages)
- Add external links to trusted sites (Wikipedia, official docs)
- Update content regularly

### 16. URL Structure
```
GOOD:  yoursite.com/products/medical-imaging-ai
BAD:   yoursite.com/page?id=123&cat=5
```
- Lowercase letters
- Use hyphens (not underscores)
- Keep it short
- Include the keyword

### 17. Blog / Content Marketing
- Fresh content signals to Google that the site is active
- 1 blog post per week is good
- Topics: solve problems your customers actually face
- Example: "How AI is changing medical diagnosis in Pakistan"

---

## PART 3 — AUTHORITY SEO (Link Building)

### 18. Backlinks (MOST POWERFUL FACTOR)
A link from another website to yours = a vote in Google's eyes

**How to earn quality backlinks:**
- Guest posting (write articles on other blogs)
- Launch on Product Hunt, Indie Hackers, BetaList
- Directories: Crunchbase, AngelList, G2, Capterra
- Local directories: Pakistani tech sites, Dawn tech section
- Social profiles: LinkedIn, Twitter, GitHub
- Press releases / media coverage

**Rule:** 10 high-quality backlinks > 1000 low-quality backlinks

### 19. Domain Authority (DA)
- New domain = low authority = hard to rank
- Old domain = high authority = easier to rank
- .com > .ai > .net > .org (for most cases)
- Subdomains are treated separately (blog.site.com ≠ site.com)

---

## PART 4 — LOCAL SEO

### 20. Google My Business
- Free listing — appears on Google Maps
- For ranking on searches like "AI company Karachi" or "VisionDx Pakistan"
- Set up at: https://business.google.com

### 21. Local Keywords
- Include city names: "AI software Karachi", "medical AI Pakistan"
- Also consider keywords in the local language

---

## PART 5 — TOOLS

### Free Tools (Must Use)
| Tool | Purpose |
|------|---------|
| Google Search Console | Index status, keywords, errors |
| Google Analytics | Traffic, user behavior |
| Google PageSpeed | Performance score |
| Bing Webmaster Tools | Bing search coverage |
| Ahrefs Webmaster Tools (free) | Backlinks check |

### Paid Tools (When budget allows)
| Tool | Purpose | Price |
|------|---------|-------|
| Ahrefs | Full SEO suite | $99/mo |
| SEMrush | Competitor analysis | $119/mo |
| Screaming Frog | Technical SEO audit | $259/yr |

### Testing Tools (Free)
- https://pagespeed.web.dev — page speed
- https://search.google.com/test/mobile-friendly — mobile test
- https://opengraph.xyz — social preview
- https://validator.schema.org — JSON-LD validation
- https://www.seoptimer.com — quick SEO audit

---

## PART 6 — COMMON MISTAKES

1. **Duplicate content** — same content on multiple pages confuses Google
2. **Slow site** — every 1 second delay = 7% conversion drop
3. **No mobile optimization** — 60%+ of traffic comes from mobile
4. **Keyword stuffing** — "AI AI AI Pakistan AI" = Google penalizes you
5. **Broken links** — 404 pages waste crawl budget
6. **Missing alt text** — images are invisible to Google
7. **Thin content** — 50-word pages don't rank
8. **No internal linking** — pages become isolated
9. **Ignoring GSC errors** — ignoring index problems
10. **Expecting fast results** — SEO takes a minimum of 3-6 months

---

## PART 7 — TIMELINE (Realistic Expectations)

```
Week 1-2:   Fix technical SEO + set up Google Search Console
Month 1:    Google crawls and indexes your pages
Month 2-3:  First rankings appear (long-tail keywords)
Month 4-6:  Traffic starts arriving consistently
Month 6-12: Ranking for more competitive keywords
Year 2+:    Domain authority builds, top rankings
```

**Rule: SEO is a marathon, not a sprint.**

---

## PART 8 — NEXT.JS SPECIFIC

```tsx
// Every page should have this
export const metadata: Metadata = {
  title: "Page Title — Brand",          // 60 chars max
  description: "...",                    // 160 chars max
  alternates: { canonical: "https://yoursite.com/page" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};
```

- `app/sitemap.ts` — auto sitemap
- `app/robots.ts` — auto robots.txt
- `app/icon.svg` — auto favicon
- `app/apple-icon.png` — auto Apple icon
- `metadataBase` in `layout.tsx` — base URL for all pages

---

## PART 9 — GOOGLE ANALYTICS (Step-by-Step)

### Step 1: Create an Account
1. Go to: https://analytics.google.com
2. Click "Start measuring"
3. Account name: your company name
4. Property name: your domain
5. Business size: Small
6. Platform: select **Web**
7. Website URL: `https://yoursite.com`
8. You will receive a **Measurement ID** — format: `G-XXXXXXXXXX`
9. Save this ID — you need to add it to Next.js

---

### Step 2: Add to Next.js (2 methods)

#### Method A — `@next/third-parties` (Recommended — Official Next.js way)
```bash
npm install @next/third-parties
```

Add to `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />  {/* your ID here */}
    </html>
  );
}
```

#### Method B — Manual Script (if you prefer not to install the package)
Add to `app/layout.tsx`:
```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </html>
  );
}
```

**Important:**
- `strategy="afterInteractive"` — loads after the page, no performance impact
- Replace `G-XXXXXXXXXX` with your actual ID
- Store the Measurement ID in `.env.local` — it's public so use the `NEXT_PUBLIC_` prefix:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
Then in code:
```tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
```

---

### Step 3: Verify It's Working
1. Open the Analytics dashboard
2. Left menu → Reports → Realtime
3. Open your site in another tab
4. You should see `1 active user` in Realtime — confirmed

---

### Step 4: Understand the Important Reports

**Traffic Sources (where users come from):**
Reports → Acquisition → Traffic Acquisition

| Source | Meaning |
|--------|---------|
| Organic Search | Came from Google |
| Direct | Typed the URL directly |
| Referral | Another site linked to you |
| Social | Came from Facebook/LinkedIn/Twitter |
| Email | Came from an email campaign |

**Top Pages (which pages are popular):**
Reports → Engagement → Pages and Screens

**User Location:**
Reports → User → Demographics → Geographic

**Bounce Rate / Engagement:**
- **Engaged sessions** — user stayed 10+ seconds or viewed 2+ pages
- If engagement rate is below 20% — there's a content or UX problem

---

### Step 5: Set Up Goals / Conversions (IMPORTANT)
Tracking traffic alone is not enough — track conversions:

**Track these events:**
- Waitlist form submit
- CTA button click
- Key page visit

Analytics → Admin → Events → Create Event

Or manually in code:
```tsx
// Call this on a button click
gtag('event', 'waitlist_signup', {
  event_category: 'conversion',
  event_label: 'hero_cta',
});
```

---

### Step 6: Weekly Routine (10 minutes)
Check these 3 things every week:

1. **Total users** — more or fewer than last week?
2. **Top traffic source** — coming from Google or direct?
3. **Top page** — which page is viewed most?

These 3 numbers tell you what to do next.

---

## QUICK CHECKLIST (For a new project)

### Day 1 (Technical Setup)
- [ ] Confirm HTTPS
- [ ] Title + description on every page
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Add canonical URLs
- [ ] Create OG image (1200x630)
- [ ] Add Favicon + Apple icon
- [ ] Test mobile compatibility

### Week 1 (Accounts)
- [ ] Set up Google Search Console + submit sitemap
- [ ] Add Google Analytics
- [ ] Add to Bing Webmaster Tools
- [ ] Set up Google My Business (if local business)

### Month 1 (Content)
- [ ] Do keyword research
- [ ] Optimize content on each page
- [ ] Add JSON-LD schema (Organization, FAQ at minimum)
- [ ] Add internal links

### Ongoing
- [ ] Publish content weekly
- [ ] Check GSC for errors
- [ ] Keep PageSpeed score at 90+
- [ ] Continue building backlinks

---

---

## PART 10 — CONVERSION RATE OPTIMIZATION (CRO)

*Getting traffic is one thing. Converting that traffic is another.*

### CTA (Call to Action) Rules
- One page should have one main CTA — too many options confuse people
- Button text should be action-oriented: "Join Waitlist" > "Submit", "Start Free" > "Sign Up"
- Button should be above the fold — visible without scrolling
- Color contrast must be high — the button background should stand out clearly

### Above the Fold (MOST IMPORTANT AREA)
What a visitor sees without scrolling — they decide in 5 seconds whether to stay or leave.
This area should contain:
- What you do (in one line)
- Who it's for (target audience)
- What benefit they get
- One strong CTA button

### Social Proof
- Testimonials with real names + photos (feels fake without a photo)
- Use numbers: "500+ doctors use VisionDx" > "Many doctors use VisionDx"
- Logos of companies/clients (with permission)
- Real reviews — even 3 honest reviews beat 20 that look fake

### Form Optimization
- Reduce fields — every extra field drops conversions
- Email-only form > Email + Name + Phone + Company
- Error messages should be helpful: "Enter valid email" > "Invalid input"
- Show a success message immediately after submit

---

## PART 11 — ERROR MONITORING (What developers ignore)

### Sentry — Free Error Tracking
Errors happen in production that you never know about. Users just close the tab — they don't complain.

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

What you get:
- Real-time error alerts (email)
- Exact line number where the error occurred
- How many users were affected
- Free tier: 5,000 errors/month

### Uptime Monitoring
How would you know if your site went down?

Free tools:
- **UptimeRobot** (uptimerobot.com) — checks every 5 minutes, sends SMS/email alert
- **BetterStack** — free tier available

Setup: 5 minutes of work, lifetime peace of mind.

---

## PART 12 — EMAIL MARKETING

*Social media accounts can get banned. Your email list is your own property.*

### Waitlist/Newsletter Setup (Free)
- **Resend** — developer-friendly, 3,000 emails/month free
- **Mailchimp** — 500 contacts free, easy drag-drop editor
- **ConvertKit** — best for creators, 1,000 subscribers free

### Welcome Email (Send Automatically)
When someone signs up — immediately send an email:
1. Thank you + confirmation
2. What to expect (timeline)
3. A personal note from the founder (increases conversion rate)
4. Social links

### Email Rules
- Subject line = 80% of your CTR — spend time on it
- Test on mobile — 60% of emails are opened on mobile
- Always include an unsubscribe link — legally required
- Avoid spam words: FREE, URGENT, ACT NOW, CLICK HERE

---

## PART 13 — SECURITY (What developers ignore)

### Environment Variables
```bash
# .env.local — NEVER push this to Git
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...

# This MUST be in .gitignore
.env.local
.env
```

Check: open `.gitignore` — there must be a `.env*` line

### Rate Limiting
Add rate limiting to API routes — otherwise someone can use your API for free or DDoS you.

Next.js on Vercel gets some protection automatically, but add it on sensitive routes:
```tsx
// Upstash rate limiter — free tier available
import { Ratelimit } from "@upstash/ratelimit";
```

### Input Validation
Never trust input from users:
- Validate email addresses
- File uploads: check the type (PDF/PNG only, etc.)
- SQL injection: use an ORM (Prisma, Drizzle) — avoid raw queries
- XSS: React escapes automatically — avoid `dangerouslySetInnerHTML`

### CORS
Set CORS properly on API routes — otherwise anyone can call your API:
```tsx
// Only allow your own domain
const allowedOrigins = ["https://yoursite.com"];
```

---

## PART 14 — PROGRESSIVE WEB APP (PWA)

What it is: makes your website feel like a phone app — installs on the home screen, works offline too.

Easy to add in Next.js:
```bash
npm install next-pwa
```

Benefits:
- Users can save it to their home screen (no app store needed)
- You can send push notifications (free)
- Offline mode
- Faster load times (caching)

A `manifest.json` is required — it defines the name, icon, and theme color.

---

## PART 15 — A/B TESTING (Once traffic arrives)

What it is: create 2 versions of something, see which one converts better.

Example:
- Version A: "Join Waitlist Free" button
- Version B: "Get Early Access" button
- 50% of users see A, 50% see B — keep the winner

Tools:
- **Vercel Edge Config** — built-in A/B testing support
- **PostHog** — free, open source, analytics + A/B testing
- **Google Optimize** — discontinued; alternatives: VWO, Optimizely

Rule: Test only one thing at a time — otherwise you won't know what worked.

---

## PART 16 — COOKIE CONSENT & PRIVACY

### GDPR / Privacy Compliance
- Cookie consent is legally required for EU users
- If you use analytics or tracking cookies, you need to get consent
- If your site already has a cookie banner, that's covered

### Privacy Policy & Terms of Service
- A Privacy Policy is **required** to use Google Analytics
- Generator: https://www.privacypolicygenerator.info (free)
- Also create Terms of Service — copyright, usage rules

### Cookie Types
| Type | Example | Consent Required? |
|------|---------|-------------------|
| Necessary | Login session | No |
| Analytics | Google Analytics | Yes |
| Marketing | Facebook Pixel | Yes |
| Preferences | Dark mode setting | No |

---

## PART 17 — LAUNCH STRATEGY

*Building the site is one thing. Launching it is another.*

### Pre-Launch (2 weeks before)
- [ ] Add a coming soon page + email capture
- [ ] Tease it on social media
- [ ] Personally invite beta users
- [ ] Create a Product Hunt account + find a hunter

### Launch Day
- [ ] Launch on Product Hunt (Tuesday–Thursday are the best days)
- [ ] LinkedIn post — personal story format (more engaging)
- [ ] Twitter/X thread — behind the scenes
- [ ] Share in relevant Reddit communities (r/webdev, r/SaaS, r/Pakistan)
- [ ] Share in WhatsApp groups — Pakistani tech communities
- [ ] Announce to your email list

### Post-Launch
- [ ] Reply personally to every comment/review
- [ ] Collect feedback — Google Forms works fine
- [ ] Fix bugs within the next 48 hours
- [ ] Check analytics — where did the traffic come from?

### Pakistani Specific Platforms
- **Markhor** — Pakistani startup community
- **LinkedIn Pakistan** groups
- **Twitter Pakistan tech community** — active
- **Dawn Technology** section — for press coverage

---

## PART 18 — MONITORING DASHBOARD (See everything in one place)

These tools are free and give you real-time status:

| Tool | What It Shows | Link |
|------|--------------|------|
| Google Analytics | Traffic, users | analytics.google.com |
| Google Search Console | SEO, indexing, keywords | search.google.com/search-console |
| Vercel Dashboard | Deployments, errors, speed | vercel.com/dashboard |
| UptimeRobot | Site up/down | uptimerobot.com |
| Sentry | JavaScript errors | sentry.io |
| PageSpeed | Performance score | pagespeed.web.dev |

**Weekly 15-minute routine:**
1. Analytics — traffic up or down?
2. GSC — new keywords? any errors?
3. Sentry — any new errors?
4. UptimeRobot — any downtime?

---

*Save this guide — it covers everything a developer/founder needs to know about SEO.*
