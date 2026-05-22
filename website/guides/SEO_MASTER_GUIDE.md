# SEO Master Guide — Complete Knowledge Base
*General guide — works for any website*

---

## SEO KYA HAI? (Simple Explanation)

SEO = Search Engine Optimization
Matlab: jab koi Google pe kuch search kare, to tumhari website pehle page pe aaye.

Google 3 cheezen dekhta hai:
1. **Technical** — kya website properly bani hai?
2. **Content** — kya website me useful content hai?
3. **Authority** — kya doosre websites tumhe link karte hain?

---

## PART 1 — TECHNICAL SEO

### 1. Title Tag
```html
<title>Keyword — Brand Name</title>
```
- Max 60 characters
- Har page ka alag title hona chahiye
- Sabse important keyword pehle likho
- Example: `Medical Imaging AI — VisionDx` (good) vs `Home` (bad)

### 2. Meta Description
```html
<meta name="description" content="...">
```
- Max 160 characters
- Google pe search results me yahi dikhta hai
- Compelling likho — jaise ad copy
- Example: `AI-powered X-ray analysis in 8 seconds. Free beta access for doctors.`

### 3. Canonical URL
```html
<link rel="canonical" href="https://yoursite.com/page" />
```
- Duplicate content se bachata hai
- Har page pe lagao
- Especially important agar same content multiple URLs pe ho

### 4. Sitemap.xml
- Google ko batata hai tumhare site pe kaunse pages hain
- URL: `yoursite.com/sitemap.xml`
- Automatically generate karo (Next.js, WordPress sab me built-in)
- Google Search Console me submit karo

### 5. Robots.txt
- Google ko batata hai kaunse pages crawl kare, kaunse nahi
- URL: `yoursite.com/robots.txt`
- Basic version:
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

### 6. HTTPS (SSL Certificate)
- HTTP wali sites Google rank nahi karta properly
- Vercel/Netlify/most hosts pe automatic hota hai
- Check: URL pe lock icon aana chahiye

### 7. Mobile-Friendly (MOST IMPORTANT)
- Google pehle mobile version dekhta hai — "Mobile First Indexing"
- Test karo: https://search.google.com/test/mobile-friendly
- Responsive design lagao (Tailwind CSS automatically karta hai)

### 8. Page Speed (Core Web Vitals)
Google 3 cheezen measure karta hai:
- **LCP** (Largest Contentful Paint) — hero image/text kitni jaldi load ho
- **CLS** (Cumulative Layout Shift) — page load hote waqt elements hil toh nahi rahe
- **FID/INP** — click pe response kitni jaldi mile
- Test: https://pagespeed.web.dev
- Target: 90+ score on mobile

### 9. Structured Data (JSON-LD)
Google ko extra information deta hai — rich results milte hain (stars, FAQ dropdowns, etc.)

**Types:**
```
Organization  — company info
FAQPage       — FAQ section (Google me seedha expand hota hai!)
Product       — product pages (price, rating dikhta hai)
Article       — blog posts
Person        — team members
BreadcrumbList — navigation path
LocalBusiness — local shops/offices
```

Example benefit: FAQ schema lagao → Google search mein seedha answer expand ho jata hai → zyada clicks

### 10. Open Graph Tags (Social Preview)
Jab WhatsApp/LinkedIn/Twitter pe link share karo tab jo preview dikhti hai:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:url" content="https://yoursite.com" />
```
- Image size: exactly **1200 x 630 pixels**
- Test karo: https://opengraph.xyz

### 11. Heading Structure
```html
<h1>Main Page Title</h1>      <!-- Sirf EK h1 hona chahiye per page -->
  <h2>Section Title</h2>
    <h3>Sub-section</h3>
```
- H1 me main keyword hona chahiye
- Skip mat karo (H1 → H3 directly bad hai)

### 12. Image Alt Text
```html
<img src="xray.jpg" alt="AI chest X-ray analysis result" />
```
- Har image pe alt text hona chahiye
- Descriptive likho — Google images se bhi traffic aata hai
- Decorative images pe `alt=""` (empty) lagao

---

## PART 2 — CONTENT SEO

### 13. Keyword Research (SABSE ZAROORI)
Pehle jaano logon ki kya search karte hain:

**Free Tools:**
- Google Search bar — type karo aur suggestions dekho
- https://ahrefs.com/keyword-generator (free)
- https://answerthepublic.com — log kya questions poochte hain
- Google Search Console — jo keywords already traffic la rahe hain

**Keyword Types:**
- **Short-tail:** `AI software` — high competition, hard to rank
- **Long-tail:** `AI medical imaging software for clinics in Pakistan` — low competition, easy to rank, better conversion

**Rule:** Naye site ke liye sirf long-tail keywords target karo

### 14. Search Intent (VERY IMPORTANT)
Keyword ka intent samjho — Google wahi dikhata hai jo user chahta hai:

- **Informational:** "how does AI work" → Blog post likho
- **Commercial:** "best AI tools" → Comparison page banao
- **Transactional:** "buy AI software" → Product/pricing page banao
- **Navigational:** "Novaj AI login" → Homepage/login page

### 15. Content Quality
- Min 500 words per page (important pages ke liye 1000+)
- Keyword naturally use karo — stuffing mat karo
- Headings me keywords rakho
- Internal links lagao (apne dusre pages ko link karo)
- External links lagao trusted sites pe (Wikipedia, official docs)
- Content regularly update karo

### 16. URL Structure
```
GOOD:  yoursite.com/products/medical-imaging-ai
BAD:   yoursite.com/page?id=123&cat=5
```
- Lowercase letters
- Hyphens use karo (underscores nahi)
- Short rakho
- Keyword include karo

### 17. Blog / Content Marketing
- Fresh content Google ko signal deta hai site active hai
- 1 blog post per week = good
- Topics: problems solve karo jo tumhare customers face karte hain
- Example for Novaj AI: "How AI is changing medical diagnosis in Pakistan"

---

## PART 3 — AUTHORITY SEO (Link Building)

### 18. Backlinks (SABSE POWERFUL FACTOR)
Doosre websites se tumhare site pe link = Google ke liye vote hai

**Quality backlinks kaise milte hain:**
- Guest posting (doosre blogs pe article likho)
- Product Hunt, Indie Hackers, BetaList pe launch karo
- Directories: Crunchbase, AngelList, G2, Capterra
- Local directories: Pakistani tech sites, Dawn tech section
- Social profiles: LinkedIn, Twitter, GitHub
- Press releases / media coverage

**Rule:** 10 high-quality backlinks > 1000 low-quality backlinks

### 19. Domain Authority (DA)
- Naya domain = low authority = hard to rank
- Purana domain = high authority = easy to rank
- .com > .ai > .net > .org (for most cases)
- Sub-domains alag treat hote hain (blog.site.com ≠ site.com)

---

## PART 4 — LOCAL SEO (Pakistan ke liye important)

### 20. Google My Business
- Free listing — Google Maps pe dikhta hai
- "AI company Karachi" ya "VisionDx Pakistan" search pe dikhne ke liye
- Setup karo: https://business.google.com

### 21. Local Keywords
- City name include karo: "AI software Karachi", "medical AI Pakistan"
- Arabic/Urdu keywords bhi consider karo

---

## PART 5 — TOOLS

### Free Tools (Must Use)
| Tool | Kaam |
|------|------|
| Google Search Console | Index status, keywords, errors |
| Google Analytics | Traffic, user behavior |
| Google PageSpeed | Performance score |
| Bing Webmaster Tools | Bing search coverage |
| Ahrefs Webmaster Tools (free) | Backlinks check |

### Paid Tools (Jab budget ho)
| Tool | Kaam | Price |
|------|------|-------|
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

## PART 6 — COMMON MISTAKES (Jo log karte hain)

1. **Duplicate content** — same content multiple pages pe = Google confuse hota hai
2. **Slow site** — har 1 second delay = 7% conversion drop
3. **No mobile optimization** — 60%+ traffic mobile se hai
4. **Keyword stuffing** — "AI AI AI Pakistan AI" = Google penalize karta hai
5. **Broken links** — 404 pages crawl waste karte hain
6. **Missing alt text** — images invisible to Google
7. **Thin content** — 50 word pages rank nahi hoti
8. **No internal linking** — pages isolated ho jate hain
9. **Ignoring GSC errors** — index problems ignore karna
10. **Expecting fast results** — SEO mein 3-6 months lagte hain minimum

---

## PART 7 — TIMELINE (Realistic Expectations)

```
Week 1-2:   Technical SEO fix karo + Google Search Console setup
Month 1:    Google crawl kare + index kare pages
Month 2-3:  First rankings start honge (long-tail keywords)
Month 4-6:  Traffic consistently aana shuru hoga
Month 6-12: Competitive keywords pe ranking
Year 2+:    Domain authority build hoti hai, top rankings
```

**Rule: SEO ek marathon hai, sprint nahi.**

---

## PART 8 — NEXT.JS SPECIFIC

```tsx
// Every page mein yeh hona chahiye
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

### Step 1: Account banao
1. Jao: https://analytics.google.com
2. "Start measuring" click karo
3. Account name: `Novaj AI`
4. Property name: `novaj.ai`
5. Business size: Small
6. Platform: **Web** select karo
7. Website URL: `https://novaj.ai`
8. Tumhe milega ek **Measurement ID** — format: `G-XXXXXXXXXX`
9. Yeh ID save kar lo — Next.js mein lagani hai

---

### Step 2: Next.js mein lagao (2 methods)

#### Method A — `@next/third-parties` (Recommended — Official Next.js way)
```bash
npm install @next/third-parties
```

`app/layout.tsx` mein add karo:
```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />  {/* apna ID yahan */}
    </html>
  );
}
```

#### Method B — Manual Script (agar third-parties install nahi karna)
`app/layout.tsx` mein add karo:
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
- `strategy="afterInteractive"` — page load ke baad load hota hai, performance pe asar nahi padta
- `G-XXXXXXXXXX` ki jagah apna actual ID lagao
- Measurement ID ko `.env.local` mein rakho — public hai toh `NEXT_PUBLIC_` prefix lagao:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
Phir code mein:
```tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
```

---

### Step 3: Verify karo kaam kar raha hai
1. Analytics dashboard kholo
2. Left menu → Reports → Realtime
3. Apni site kholo doosri tab mein
4. Realtime mein `1 active user` dikhna chahiye — confirm hai

---

### Step 4: Important Reports samjho

**Traffic Sources (kahan se log aa rahe hain):**
Reports → Acquisition → Traffic Acquisition

| Source | Matlab |
|--------|--------|
| Organic Search | Google se aaye |
| Direct | URL type karke aaye |
| Referral | Kisi site ne link kiya |
| Social | Facebook/LinkedIn/Twitter se |
| Email | Email campaign se |

**Top Pages (kaunsa page popular hai):**
Reports → Engagement → Pages and Screens

**User Location:**
Reports → User → Demographics → Geographic

**Bounce Rate / Engagement:**
- **Engaged sessions** — log site pe 10+ seconds rahe ya 2+ pages dekhe
- Agar engagement rate 20% se kam hai — content ya UX problem hai

---

### Step 5: Goals / Conversions set karo (IMPORTANT)
Sirf traffic dekhna kaafi nahi — conversions track karo:

**Novaj AI ke liye track karo:**
- Waitlist form submit (Contact form)
- "Join Waitlist" button click
- Product page visit

Analytics → Admin → Events → Create Event

Ya code mein manually:
```tsx
// Button click pe yeh call karo
gtag('event', 'waitlist_signup', {
  event_category: 'conversion',
  event_label: 'hero_cta',
});
```

---

### Step 6: Weekly routine (10 minutes)
Har hafte yeh 3 cheezein dekho:

1. **Total users** — zyada hai ya kam last week se?
2. **Top traffic source** — Google se aa raha hai ya direct?
3. **Top page** — kaunsa page sabse zyada dekha?

Yahi 3 numbers tumhe next action batayenge.

---

## QUICK CHECKLIST (Naya project shuru karo to)

### Day 1 (Technical Setup)
- [ ] HTTPS confirm karo
- [ ] Title + description har page pe
- [ ] Sitemap.xml generate karo
- [ ] Robots.txt banao
- [ ] Canonical URLs lagao
- [ ] OG image banao (1200x630)
- [ ] Favicon + Apple icon lagao
- [ ] Mobile test karo

### Week 1 (Accounts)
- [ ] Google Search Console setup + sitemap submit
- [ ] Google Analytics add karo
- [ ] Bing Webmaster Tools
- [ ] Google My Business (agar local business)

### Month 1 (Content)
- [ ] Keyword research karo
- [ ] Har page ka content optimize karo
- [ ] JSON-LD schema lagao (Organization, FAQ minimum)
- [ ] Internal linking add karo

### Ongoing
- [ ] Weekly content publish karo
- [ ] GSC mein errors check karo
- [ ] PageSpeed score maintain karo 90+
- [ ] Backlinks build karte raho

---

---

## PART 10 — CONVERSION RATE OPTIMIZATION (CRO)

*Traffic aana alag baat hai, traffic ka convert hona alag baat hai.*

### CTA (Call to Action) Rules
- Ek page pe ek main CTA hona chahiye — log confuse ho jaate hain zyada options se
- Button text action-oriented ho: "Join Waitlist" > "Submit", "Start Free" > "Sign Up"
- Button above the fold hona chahiye — scroll karne se pehle dikhna chahiye
- Color contrast high hona chahiye — button background alag dikhna chahiye

### Above the Fold (SABSE IMPORTANT AREA)
Jo visitor scroll kiye bina dekhta hai — woh 5 seconds mein decide karta hai rukna hai ya nahi.
Isme hona chahiye:
- Kya karte ho (1 line mein)
- Kiske liye (target audience)
- Kya benefit milega
- Ek strong CTA button

### Social Proof
- Testimonials with real names + photos (fake lagta hai bina photo ke)
- Numbers use karo: "500+ doctors use VisionDx" > "Many doctors use VisionDx"
- Logos of companies/clients (agar permission ho)
- Real reviews — even 3 honest reviews > 20 fake-looking ones

### Form Optimization
- Fields kam karo — har extra field = conversions drop
- Email only form > Email + Name + Phone + Company
- Error messages helpful hon: "Enter valid email" > "Invalid input"
- Success message dikhao immediately after submit

---

## PART 11 — ERROR MONITORING (Jo log ignore karte hain)

### Sentry — Free Error Tracking
Production mein errors hote hain jo tumhe pata nahi chalta. Users seedha band kar dete hain site, complain nahi karte.

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Kya milta hai:
- Real-time error alerts (email pe)
- Exact line number jahan error hua
- Kitne users affected hue
- Free tier: 5,000 errors/month

### Uptime Monitoring
Site band ho gayi toh pata kaise chalega?

Free tools:
- **UptimeRobot** (uptimerobot.com) — har 5 minute mein check karta hai, SMS/email alert deta hai
- **BetterStack** — free tier available

Setup: 5 minute ka kaam, lifetime peace of mind.

---

## PART 12 — EMAIL MARKETING

*Social media accounts band ho sakte hain. Email list tumhari apni property hai.*

### Waitlist/Newsletter Setup (Free)
- **Resend** — developer-friendly, 3,000 emails/month free
- **Mailchimp** — 500 contacts free, easy drag-drop editor
- **ConvertKit** — creators ke liye best, 1,000 subscribers free

### Welcome Email (Automatically bhejo)
Jab koi signup kare — immediately ek email bhejo:
1. Thank you + confirmation
2. Kya expect karein (timeline)
3. Founder ka personal note (conversion rate badhta hai)
4. Social links

### Email Rules
- Subject line = CTR ka 80% — isme time lagao
- Mobile pe test karo — 60% emails mobile pe khulte hain
- Unsubscribe link hamesha lagao — legally required bhi hai
- Spam words avoid karo: FREE, URGENT, ACT NOW, CLICK HERE

---

## PART 13 — SECURITY (Jo developers ignore karte hain)

### Environment Variables
```bash
# .env.local — KABHI bhi Git pe push mat karo
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...

# .gitignore mein hona ZAROORI hai
.env.local
.env
```

Check karo: `cat .gitignore` — `.env*` line honi chahiye

### Rate Limiting
API routes pe rate limiting lagao — warna koi tumhara API free mein use kar sakta hai ya DDoS kar sakta hai.

Next.js mein Vercel automatically kuch protection deta hai, lekin sensitive routes pe lagao:
```tsx
// Upstash rate limiter — free tier available
import { Ratelimit } from "@upstash/ratelimit";
```

### Input Validation
User se jo bhi input aaye — kabhi trust mat karo:
- Email validate karo
- File upload: type check karo (PDF/PNG only etc.)
- SQL injection: ORM use karo (Prisma, Drizzle) — raw queries avoid karo
- XSS: React automatically escape karta hai — `dangerouslySetInnerHTML` avoid karo

### CORS
API routes pe CORS properly set karo — warna koi bhi tumhara API call kar sakta hai:
```tsx
// Only allow your own domain
const allowedOrigins = ["https://novaj.ai"];
```

---

## PART 14 — PROGRESSIVE WEB APP (PWA)

Kya hai: Website ko phone pe app jaisi feel deti hai — home screen pe install hoti hai, offline bhi kaam karti hai.

Next.js mein lagana easy hai:
```bash
npm install next-pwa
```

Benefits:
- Users home screen pe save kar sakte hain (bina app store ke)
- Push notifications bhej sakte ho (free)
- Offline mode
- Load time fast hoti hai (caching)

`manifest.json` chahiye hota hai — name, icon, theme color define karta hai.

---

## PART 15 — A/B TESTING (Jab traffic aane lage)

Kya hai: Ek cheez ke 2 versions banao, dekho kaun zyada convert karta hai.

Example:
- Version A: "Join Waitlist Free" button
- Version B: "Get Early Access" button
- 50% users A dekhte hain, 50% B — winner ko rakh lo

Tools:
- **Vercel Edge Config** — built-in A/B testing support
- **PostHog** — free, open source, analytics + A/B testing
- **Google Optimize** — band ho gaya, alternatives: VWO, Optimizely

Rule: Ek waqt mein ek hi cheez test karo — warna pata nahi chalega kya kaam kiya.

---

## PART 16 — COOKIE CONSENT & PRIVACY

### GDPR / Pakistani Users
- EU users ke liye cookie consent legally required hai
- Analytics, tracking cookies use karte ho toh consent lena padta hai
- Tumhare site pe cookie banner already hai (jo dikha tha screenshots mein) ✓

### Privacy Policy & Terms of Service
- Google Analytics lagane ke liye Privacy Policy **required** hai
- Generator: https://www.privacypolicygenerator.info (free)
- Terms of Service bhi banao — copyright, usage rules

### Cookie Types
| Type | Example | Consent Required? |
|------|---------|-------------------|
| Necessary | Login session | No |
| Analytics | Google Analytics | Yes |
| Marketing | Facebook Pixel | Yes |
| Preferences | Dark mode setting | No |

---

## PART 17 — LAUNCH STRATEGY

*Site banana alag baat hai, launch karna alag baat hai.*

### Pre-Launch (2 weeks pehle)
- [ ] Coming soon page + email capture lagao
- [ ] Social media pe tease karo
- [ ] Beta users ko personally invite karo
- [ ] Product Hunt account banao + hunter dhundo

### Launch Day
- [ ] Product Hunt pe launch karo (Tuesday-Thursday best days hain)
- [ ] LinkedIn post — personal story wala (more engaging)
- [ ] Twitter/X thread — behind the scenes
- [ ] Relevant Reddit communities pe share karo (r/webdev, r/Pakistan, r/SaaS)
- [ ] WhatsApp groups — Pakistani tech communities
- [ ] Email list ko announce karo

### Post-Launch
- [ ] Har comment/review ka reply karo — personally
- [ ] Feedback collect karo — Google Form bhi kaam karta hai
- [ ] Bugs fix karo agle 48 hours mein
- [ ] Analytics dekho — kahan se traffic aaya

### Pakistani Specific Platforms
- **Rozee.pk** — job listings se bhi brand awareness hoti hai
- **PakWheels** nahi, but **Markhor** (Pakistani startup community)
- **LinkedIn Pakistan** groups
- **Twitter Pakistan tech community** — active hai
- **Dawn Technology** section — PR ke liye

---

## PART 18 — MONITORING DASHBOARD (Ek jagah sab dekho)

Yeh tools free hain aur tumhe real-time status dete hain:

| Tool | Kya dekhta hai | Link |
|------|---------------|------|
| Google Analytics | Traffic, users | analytics.google.com |
| Google Search Console | SEO, indexing, keywords | search.google.com/search-console |
| Vercel Dashboard | Deployments, errors, speed | vercel.com/dashboard |
| UptimeRobot | Site up/down | uptimerobot.com |
| Sentry | JavaScript errors | sentry.io |
| PageSpeed | Performance score | pagespeed.web.dev |

**Weekly 15-minute routine:**
1. Analytics — traffic up/down?
2. GSC — new keywords? any errors?
3. Sentry — koi new error?
4. UptimeRobot — koi downtime?

---

*Yeh guide save kar lo — yeh sab kuch cover karta hai jo ek developer/founder ko SEO ke baare mein pata hona chahiye.*
