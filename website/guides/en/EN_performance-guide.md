# Performance Guide
*How to make your website fast — Beginner to Advanced*

---

## WHY DOES IT MATTER?

```
1 second delay = 7% conversion drop
3 second load = 53% of mobile users leave
Google Core Web Vitals = ranking factor
```

Real numbers:
- Amazon: 100ms delay = 1% sales drop
- Google: 0.5s delay = 20% less traffic

---

## PART 1 — CORE WEB VITALS (Google's 3 Metrics)

### 1. LCP — Largest Contentful Paint
**What it is:** How quickly the largest visible element (hero image/text) loads
**Target:** Under 2.5 seconds
**Fix:** Optimize the hero image, add the `priority` prop

### 2. CLS — Cumulative Layout Shift
**What it is:** Elements shifting around while the page loads (annoying!)
**Target:** Under 0.1
**Fix:** Specify width/height on images, avoid font swap

### 3. INP — Interaction to Next Paint
**What it is:** How quickly a response comes after a click/tap
**Target:** Under 200ms
**Fix:** Reduce heavy JS, optimize event handlers

### How to Test
- https://pagespeed.web.dev
- Chrome DevTools → Lighthouse tab
- https://web.dev/measure

---

## PART 2 — IMAGES (The Biggest Performance Killer)

### Next.js Image Component
```tsx
import Image from "next/image";

// GOOD — optimized
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority          // Above fold — load immediately
  quality={85}      // Default 75, 85 is a good balance
/>

// Below fold images
<Image
  src="/team.jpg"
  alt="Team"
  width={400}
  height={400}
  loading="lazy"    // Load when it enters the viewport
/>
```

**What Next.js Image does automatically:**
- Converts to WebP/AVIF format (30–50% smaller)
- Generates responsive sizes
- Lazy loading
- Prevents CLS (placeholder)

### Image Formats
| Format | Use When | Size |
|--------|----------|------|
| WebP | General photos | Smallest |
| AVIF | Cutting edge (Next.js uses) | Even smaller |
| SVG | Icons, logos | Vector — no quality loss |
| PNG | Transparency needed | Larger |
| JPEG | Old browsers | Medium |

### Image Compression Tools
- https://squoosh.app — free, in the browser
- https://tinypng.com — compress PNG/JPG
- Before upload: keep under 1MB

---

## PART 3 — FONTS

### Google Fonts — Wrong Way
```html
<!-- BAD — render blocking -->
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">
```

### Next.js Font — Right Way
```tsx
// app/layout.tsx
import { Inter, Bricolage_Grotesque } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",     // Show system font until the font loads
  variable: "--font-inter",
});

// Automatic:
// ✓ Self-hosted (no Google server request)
// ✓ Preloaded
// ✓ No layout shift
// ✓ GDPR friendly
```

### Font Loading Best Practices
- Max 2 fonts per site (one heading, one body)
- Only load the weights you need: `weight: ["400", "700"]` (not all 100–900)
- Always add `display: "swap"`

---

## PART 4 — JAVASCRIPT BUNDLE

### Why Bundle Size Matters
More JS = more to download + more parse time = slow site

### Check Bundle Size
```bash
npm run build
# Bundle map will be in .next/analyze/

# Or for detailed analysis
ANALYZE=true npm run build
```

### Code Splitting
```tsx
// BAD — entire library loads at once
import { format, parseISO, differenceInDays } from "date-fns";

// GOOD — only import what you need
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
```

### Dynamic Imports
```tsx
// Heavy component — only load when needed
const Chart = dynamic(() => import("@/components/Chart"), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false,  // Don't render on the server
});

// Heavy library
const { default: confetti } = await import("canvas-confetti");
confetti();
```

### Tree Shaking
```tsx
// BAD — entire lodash library imported (70KB+)
import _ from "lodash";
_.debounce(fn, 300);

// GOOD — only import debounce (2KB)
import debounce from "lodash/debounce";

// BEST — implement with vanilla JS
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

---

## PART 5 — NEXT.JS RENDERING STRATEGIES

### Static (SSG) — Fastest
```tsx
// Generated at build time → served from CDN → instant load
// Use for: Blog posts, landing pages, product pages

export default function ProductPage() {
  return <div>...</div>;
}
// Default in Next.js App Router
```

### Server Side (SSR) — Fresh Data
```tsx
// Generated on the server per request
// Use for: Dashboards, user-specific pages

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await fetchUserData();
  return <div>{data.name}</div>;
}
```

### Incremental Static Regeneration (ISR) — Best of Both
```tsx
// Generated at build, then refreshed in the background
// Use for: Blogs, products with changing data

export const revalidate = 3600; // Refresh every hour

export default async function BlogPost() {
  const post = await fetchPost();
  return <article>{post.content}</article>;
}
```

### Client Side — Interactive Components
```tsx
"use client"; // This line is required

// Use for: Forms, stateful components, animations
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}
```

**Rule:**
```
Static data   → SSG (default)
Changing data → ISR (revalidate)
User-specific → SSR
Interactive   → Client components
```

---

## PART 6 — CACHING

### HTTP Cache Headers
```tsx
// Set cache headers on API routes
export async function GET() {
  const data = await fetchData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      // s-maxage=3600 → cache on CDN for 1 hour
      // stale-while-revalidate → show old data while fresh data is loading
    }
  });
}
```

### Memoization
```tsx
import { cache } from "react";

// DB call happens only once per request
export const getUser = cache(async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
});
```

---

## PART 7 — LAZY LOADING

### Intersection Observer (Build It Yourself)
```tsx
function LazySection({ children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? children : <Skeleton />}
    </div>
  );
}
```

### Virtualization (Long Lists)
```tsx
// Don't render 1000 items — only render visible ones
import { VirtualList } from "react-window";

// Only what's on screen gets rendered
<FixedSizeList height={600} itemCount={1000} itemSize={50}>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</FixedSizeList>
```

---

## PART 8 — NETWORK

### Prefetching
```tsx
// Next.js Link automatically prefetches when in the viewport
import Link from "next/link";
<Link href="/products/visiondx" prefetch>VisionDx</Link>

// Manual prefetch
import { useRouter } from "next/navigation";
const router = useRouter();
router.prefetch("/dashboard"); // Pre-load before user logs in
```

### Optimize API Requests
```tsx
// BAD — 3 separate requests
const users = await fetch('/api/users');
const products = await fetch('/api/products');
const stats = await fetch('/api/stats');

// GOOD — parallel requests
const [users, products, stats] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/products').then(r => r.json()),
  fetch('/api/stats').then(r => r.json()),
]);
```

---

## PART 9 — CSS PERFORMANCE

```css
/* BAD — complex selectors are slow */
div > ul li:nth-child(odd) a:hover span { ... }

/* GOOD — simple class */
.nav-link:hover { ... }

/* BAD — avoid layout changes (triggers reflow) */
element.style.width = "200px"; /* Changing width in JS = layout recalculate */

/* GOOD — use transform (GPU accelerated) */
element.style.transform = "translateX(200px)"; /* Fast! */
```

### Will-change (Use Carefully)
```css
/* Only when there is an actual animation */
.animated-element {
  will-change: transform; /* Tell the GPU to prepare */
}
/* Don't overuse — it consumes memory */
```

---

## PART 10 — PERFORMANCE BUDGET

### Targets
```
First Contentful Paint (FCP):  < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Total Blocking Time (TBT):      < 200ms
Cumulative Layout Shift (CLS):  < 0.1
Time to First Byte (TTFB):      < 600ms

Bundle Size:
  Total JS:     < 200KB (gzipped)
  Total CSS:    < 50KB (gzipped)
  Images:       < 100KB each (hero < 200KB)
```

---

## QUICK WINS (Fast Improvements)

```
1. Images → Use Next.js <Image> component
2. Fonts → Use next/font
3. Heavy components → Use dynamic import
4. API calls → Parallelize with Promise.all
5. Large lists → Use virtualization
6. Animations → transform/opacity only (no width/height)
7. Third-party scripts → strategy="afterInteractive"
8. Build check → npm run build, inspect bundle size
```

---

## PERFORMANCE DEBUGGING

```bash
# 1. Lighthouse audit
# Chrome DevTools → Lighthouse → Generate Report

# 2. Network tab
# DevTools → Network → Simulate Slow 3G → Check load time

# 3. Coverage tab
# DevTools → Coverage → JS/CSS that is not being used

# 4. Performance tab
# DevTools → Performance → Record → See exactly what is slow
```

---

*Apply all of this → a 90+ PageSpeed score is easily achievable*
