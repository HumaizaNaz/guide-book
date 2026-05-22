# Performance Guide
*Website fast kaise banate hain — Beginner se Advanced*

---

## KYUN ZAROORI HAI?

```
1 second delay = 7% conversion drop
3 second load = 53% mobile users leave
Google Core Web Vitals = ranking factor
```

Real numbers:
- Amazon: 100ms delay = 1% sales drop
- Google: 0.5s delay = 20% less traffic

---

## PART 1 — CORE WEB VITALS (Google ke 3 Metrics)

### 1. LCP — Largest Contentful Paint
**Kya hai:** Sabse bada visible element (hero image/text) kitni jaldi load hota hai
**Target:** Under 2.5 seconds
**Fix:** Hero image optimize karo, `priority` prop lagao

### 2. CLS — Cumulative Layout Shift
**Kya hai:** Page load hote waqt elements hil rahe hain (irritating!)
**Target:** Under 0.1
**Fix:** Images pe width/height specify karo, fonts swap se bachao

### 3. INP — Interaction to Next Paint
**Kya hai:** Click/tap ke baad response kitni jaldi milti hai
**Target:** Under 200ms
**Fix:** Heavy JS reduce karo, event handlers optimize karo

### Test Karo
- https://pagespeed.web.dev
- Chrome DevTools → Lighthouse tab
- https://web.dev/measure

---

## PART 2 — IMAGES (Sabse Badi Performance Killer)

### Next.js Image Component
```tsx
import Image from "next/image";

// GOOD — optimized
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority          // Above fold — immediately load karo
  quality={85}      // Default 75, 85 good balance
/>

// Below fold images
<Image
  src="/team.jpg"
  alt="Team"
  width={400}
  height={400}
  loading="lazy"    // Viewport mein aane pe load karo
/>
```

**Next.js Image automatically kya karta hai:**
- WebP/AVIF format mein convert (30-50% smaller)
- Responsive sizes generate karta hai
- Lazy loading
- CLS prevent karta hai (placeholder)

### Image Formats
| Format | Use When | Size |
|--------|----------|------|
| WebP | General photos | Smallest |
| AVIF | Cutting edge (Next.js uses) | Even smaller |
| SVG | Icons, logos | Vector — no quality loss |
| PNG | Transparency chahiye | Larger |
| JPEG | Old browsers | Medium |

### Image Compression Tools
- https://squoosh.app — free, browser mein
- https://tinypng.com — PNG/JPG compress
- Before upload: 1MB se zyada mat rakhna

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
  display: "swap",     // Font load hone tak system font dikhao
  variable: "--font-inter",
});

// Automatic:
// ✓ Self-hosted (Google server request nahi)
// ✓ Preloaded
// ✓ No layout shift
// ✓ GDPR friendly
```

### Font Loading Best Practices
- Max 2 fonts per site (ek heading, ek body)
- Sirf zarori weights load karo: `weight: ["400", "700"]` (not 100-900 sab)
- `display: "swap"` hamesha lagao

---

## PART 4 — JAVASCRIPT BUNDLE

### Bundle Size Kyun Matter Karta Hai?
Zyada JS = zyada download + zyada parse time = slow site

### Check Bundle Size
```bash
npm run build
# .next/analyze/ mein bundle map dikhega

# Ya detailed analysis
ANALYZE=true npm run build
```

### Code Splitting
```tsx
// BAD — poori library ek baar load ho jati hai
import { format, parseISO, differenceInDays } from "date-fns";

// GOOD — sirf jo chahiye
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
```

### Dynamic Imports
```tsx
// Heavy component — sirf jab chahiye load karo
const Chart = dynamic(() => import("@/components/Chart"), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false,  // Server pe render mat karo
});

// Heavy library
const { default: confetti } = await import("canvas-confetti");
confetti();
```

### Tree Shaking
```tsx
// BAD — poori lodash library import ho jati hai (70KB+)
import _ from "lodash";
_.debounce(fn, 300);

// GOOD — sirf debounce import karo (2KB)
import debounce from "lodash/debounce";

// BEST — vanilla JS se karo
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
// Build time pe generate → CDN pe serve → instant load
// Use karo: Blog posts, landing pages, product pages

export default function ProductPage() {
  return <div>...</div>;
}
// Default in Next.js App Router
```

### Server Side (SSR) — Fresh Data
```tsx
// Har request pe server se generate
// Use karo: Dashboard, user-specific pages

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await fetchUserData();
  return <div>{data.name}</div>;
}
```

### Incremental Static Regeneration (ISR) — Best of Both
```tsx
// Build pe generate, phir background mein refresh
// Use karo: Blog, products with changing data

export const revalidate = 3600; // Har ghante refresh

export default async function BlogPost() {
  const post = await fetchPost();
  return <article>{post.content}</article>;
}
```

### Client Side — Interactive Components
```tsx
"use client"; // Yeh line zarori hai

// Use karo: Forms, state wale components, animations
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}
```

**Rule:**
```
Static data  → SSG (default)
Changing data → ISR (revalidate)
User-specific → SSR
Interactive  → Client components
```

---

## PART 6 — CACHING

### HTTP Cache Headers
```tsx
// API routes pe cache headers set karo
export async function GET() {
  const data = await fetchData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      // s-maxage=3600 → CDN pe 1 ghante cache karo
      // stale-while-revalidate → purana data dikhao jabtak fresh aa raha hai
    }
  });
}
```

### Memoization
```tsx
import { cache } from "react";

// Ek request mein ek baar hi DB call hoga
export const getUser = cache(async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
});
```

---

## PART 7 — LAZY LOADING

### Intersection Observer (Khud banao)
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
// 1000 items render mat karo — sirf visible ones
import { VirtualList } from "react-window";

// Sirf screen pe jo dikhta hai woh render hota hai
<FixedSizeList height={600} itemCount={1000} itemSize={50}>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</FixedSizeList>
```

---

## PART 8 — NETWORK

### Prefetching
```tsx
// Next.js Link automatically prefetch karta hai viewport mein
import Link from "next/link";
<Link href="/products/visiondx" prefetch>VisionDx</Link>

// Manual prefetch
import { useRouter } from "next/navigation";
const router = useRouter();
router.prefetch("/dashboard"); // User login karne wala hai toh pehle load karo
```

### API Requests Optimize Karo
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
/* BAD — complex selectors slow hote hain */
div > ul li:nth-child(odd) a:hover span { ... }

/* GOOD — simple class */
.nav-link:hover { ... }

/* BAD — layout se bachao (reflow trigger) */
element.style.width = "200px"; /* JS se width change = layout recalculate */

/* GOOD — transform use karo (GPU accelerated) */
element.style.transform = "translateX(200px)"; /* Fast! */
```

### Will-change (Careful Use)
```css
/* Sirf jab actual animation ho */
.animated-element {
  will-change: transform; /* GPU ko batao — prepare raho */
}
/* Overuse mat karo — memory use hota hai */
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
1. Images → Next.js <Image> component lagao
2. Fonts → next/font use karo
3. Heavy components → dynamic import karo
4. API calls → Promise.all se parallelize karo
5. Large lists → virtualization
6. Animations → transform/opacity sirf (no width/height)
7. Third-party scripts → strategy="afterInteractive"
8. Build check → npm run build, bundle size dekho
```

---

## PERFORMANCE DEBUGGING

```bash
# 1. Lighthouse audit
# Chrome DevTools → Lighthouse → Generate Report

# 2. Network tab
# DevTools → Network → Slow 3G simulate karo → Load time dekho

# 3. Coverage tab
# DevTools → Coverage → JS/CSS jo use nahi ho rahi

# 4. Performance tab
# DevTools → Performance → Record → Kya slow hai exact dekho
```

---

*Yeh sab apply karo → 90+ PageSpeed score easily milta hai*
