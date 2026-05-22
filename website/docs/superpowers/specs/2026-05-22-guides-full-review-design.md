# Guides Full Review — Design Spec

## Goal

Fix all stale content, add 4 new developer guides (TypeScript, Auth, Payments, Monitoring), and add 4 website features (read time in sidebar, related guides, tag filtering, print/PDF).

## Architecture

All guide content lives as `.md` files in `C:\Users\km\Desktop\GUIDES\`. The website at `website/` reads them via `src/lib/guides.ts` using `gray-matter` + `next-mdx-remote`. New guides follow the same pattern — add `.md` file + entry in `src/lib/categories.ts`.

Website features extend existing components: `Sidebar.tsx` (read time), new `RelatedGuides.tsx` component, updated `app/page.tsx` (tag filter), and `globals.css` print styles.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, next-mdx-remote, gray-matter, reading-time, lucide-react

---

## Part 1: Bug Fixes

### 1a. `00_INDEX.md` — stale guide count
- Current: says "14 guides"
- Fix: update to "21 guides", add 7 new guide names to the list

### 1b. `SEO_CHECKLIST.md` — project-specific content
- Current: references "Novaj AI" and `neura-nest-eight.vercel.app` throughout
- Fix: replace all with `Your App` and `yoursite.com` (generic placeholders)

### 1c. `src/components/SearchModal.tsx` — hardcoded count
- Current: hardcoded "16 guides" text
- Fix: use `GUIDE_META.length` dynamically so it auto-updates

---

## Part 2: New Guides

### 2a. `16_TYPESCRIPT_GUIDE.md` — TypeScript Guide
**Category:** Foundation | **Order:** 18

**Content outline:**
1. Why TypeScript (JS vs TS, what errors it catches)
2. Setup in Next.js (already included, `strict: true` in tsconfig)
3. Core types: primitives, arrays, objects, unions, tuples
4. Interfaces vs type aliases (when to use each)
5. Generics (functions, components, API responses)
6. Utility types: `Partial<T>`, `Required<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,V>`
7. Typing API responses (fetch wrapper pattern)
8. Typing React component props
9. Typing Next.js pages and route handlers
10. Common mistakes (any abuse, assertion abuse, missing null checks)
11. Migration from JS (rename, fix errors incrementally)

**Sidebar title:** "TypeScript Guide"

### 2b. `17_AUTH_GUIDE.md` — Auth Guide
**Category:** Foundation | **Order:** 19

**Content outline:**
1. Auth landscape (don't build it yourself — use Clerk, NextAuth, or Supabase Auth)
2. Clerk (recommended for new projects)
   - Install + wrap with `<ClerkProvider>`
   - Middleware: protect routes with `clerkMiddleware()`
   - `useUser()`, `useAuth()` hooks
   - Sign-in/sign-up pages (hosted vs custom)
   - Server-side: `auth()` in Server Components, Route Handlers
3. NextAuth v5 (Auth.js) — for self-hosted or DB-linked auth
   - Setup, providers (Google, GitHub, Credentials)
   - Session callbacks, JWT vs database sessions
   - Protecting pages with middleware
4. Role-based access (Clerk metadata vs NextAuth custom session)
5. Environment variables checklist
6. Common mistakes (exposing secrets, missing redirect, CSRF)

**Sidebar title:** "Auth Guide"

### 2c. `18_PAYMENTS_GUIDE.md` — Payments Guide
**Category:** Deploy & Infra | **Order:** 20

**Content outline:**
1. Stripe account setup + test/live mode
2. Products and prices (one-time vs recurring)
3. Checkout Session (hosted) — server action + redirect
4. Webhook setup
   - Local dev: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Webhook secret + signature verification
   - Idempotency (handle duplicate events)
5. Subscription lifecycle (created → active → past_due → canceled)
6. Stripe Billing Portal (let users manage their subscription)
7. `@stripe/stripe-js` for frontend (Stripe Elements optional)
8. Test cards (4242..., 4000000000009995 for decline)
9. Going live checklist
10. Common mistakes (not verifying webhook signature, sync issues)

**Sidebar title:** "Payments (Stripe)"

### 2d. `19_MONITORING_GUIDE.md` — Monitoring Guide
**Category:** Quality & Tools | **Order:** 21

**Content outline:**
1. Why monitoring (production is different from dev)
2. Sentry setup in Next.js
   - Install `@sentry/nextjs`, run wizard, or manual config
   - `sentry.client.config.ts`, `sentry.server.config.ts`, `instrumentation.ts`
   - Source maps for readable stack traces
   - Custom error boundaries (`Sentry.ErrorBoundary`)
   - `Sentry.captureException()` for manual capture
3. Alert rules (new issue, regression, spike)
4. Uptime monitoring
   - UptimeRobot free tier (50 monitors, 5-min checks)
   - Better Uptime free tier (more features)
   - What to monitor: homepage, API health endpoint, `/api/health` pattern
5. Structured logging pattern (avoid `console.log` spam in prod)
6. Reading Sentry traces (breadcrumbs, context, user)
7. Weekly incident review habit (5 min: new errors, resolved, trends)

**Sidebar title:** "Monitoring Guide"

---

## Part 3: Website Features

### 3a. Read Time in Sidebar

**Files modified:** `src/lib/categories.ts`, `src/lib/guides.ts`, `src/components/Sidebar.tsx`

**Design:**
- `getAllGuidesReadTime(): Record<slug, string>` — server-side function that reads all guides and returns read time map (e.g. `{ 'typescript-guide': '12 min' }`)
- On the guide index/home page, pass read times as a prop to Sidebar, or load via a separate API route
- Actually simpler: add `readTime` to `GuideMeta` interface and populate it at startup via a `getReadTimes()` helper that reads files. But `GuideMeta` is static in `categories.ts`...
- **Best approach:** `Sidebar` fetches from `/api/read-times` on mount (returns `Record<slug, string>`), stores in state alongside `progress`. Renders as `<span className="text-xs text-gray-400 ml-auto">{readTime}</span>` in each guide link.
- Alternative simpler: hardcode read times in `getShortTitle`-style map in Sidebar (avoids extra API route). Given guides don't change often, this is fine.

**Chosen approach:** Static map in Sidebar (same pattern as `getShortTitle`). Add `getReadTime(slug)` function returning hardcoded strings based on rough line counts of each guide.

### 3b. Related Guides

**Files modified:** `src/lib/guides.ts`, `src/components/RelatedGuides.tsx` (new), `src/app/guide/[slug]/page.tsx`

**Design:**
- `getRelatedGuides(slug: string): GuideMeta[]` — in `guides.ts`, returns up to 3 guides from same category, excluding current. If same category has fewer than 3, fill from adjacent categories.
- `RelatedGuides.tsx` — client or server component (server is fine, no interactivity needed)
  ```tsx
  export function RelatedGuides({ guides }: { guides: GuideMeta[] }) {
    return (
      <section className="mt-12 border-t pt-8">
        <h2>Continue Reading</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {guides.map(g => <RelatedGuideCard key={g.slug} guide={g} />)}
        </div>
      </section>
    )
  }
  ```
- Each card: title, category badge, read time, arrow link
- Rendered in `app/guide/[slug]/page.tsx` after `<NotesPad>`

### 3c. Tag Filtering on Home Page

**Files created:** `src/lib/tags.ts`
**Files modified:** `src/app/page.tsx`

**Design:**
- `GUIDE_TAGS: Record<string, string[]>` — static map: each slug → array of tags
- Tags: `frontend`, `backend`, `devops`, `database`, `testing`, `seo`, `auth`, `performance`, `typescript`, `git`, `docker`, `ai`
- Home page: `'use client'` component for filter state, or extract to a `GuideGrid` client component
- Filter chips row: "All" + one chip per unique tag (sorted by frequency)
- Clicking a chip filters the displayed guides; clicking again deselects (toggle back to All)
- No URL params needed — in-memory state is sufficient

**Tag assignments (planned):**
```
web-app-fundamentals: [frontend, backend]
frontend-guide: [frontend]
backend-guide: [backend]
git-workflow: [git]
database-guide: [database, backend]
deployment-guide: [devops]
docker-guide: [docker, devops]
server-vps-guide: [devops]
domain-hosting-guide: [devops]
cicd-devops-guide: [devops, git]
performance-guide: [performance, frontend]
testing-guide: [testing]
developer-toolkit: [frontend, backend]
ai-tools-guide: [ai]
seo-master-guide: [seo]
seo-checklist: [seo]
seo-discovery-guide: [seo]
typescript-guide: [typescript, frontend, backend]
auth-guide: [auth, backend]
payments-guide: [backend, devops]
monitoring-guide: [devops, testing]
```

### 3d. Print / PDF Export

**Files modified:** `src/app/globals.css`, `src/app/guide/[slug]/page.tsx`

**Design:**
- Print button: small icon button in guide header (printer icon from lucide-react), calls `window.print()`
- `@media print` CSS in globals.css hides: `header`, `aside` (both sidebars), `button`, `.notes-pad`, `.related-guides`, `.progress-tracker`
- Article gets `max-width: none; margin: 0` in print mode
- Clean typography: black text, no shadows, no backgrounds
- Page breaks: `h2 { page-break-before: auto }`, `pre { page-break-inside: avoid }`

---

## Part 4: `categories.ts` Updates

Add 4 new entries:
```typescript
{ filename: '16_TYPESCRIPT_GUIDE.md', slug: 'typescript-guide', category: 'Foundation', order: 18 },
{ filename: '17_AUTH_GUIDE.md', slug: 'auth-guide', category: 'Foundation', order: 19 },
{ filename: '18_PAYMENTS_GUIDE.md', slug: 'payments-guide', category: 'Deploy & Infra', order: 20 },
{ filename: '19_MONITORING_GUIDE.md', slug: 'monitoring-guide', category: 'Quality & Tools', order: 21 },
```

Update `Sidebar.tsx` `getShortTitle` map to include 4 new slugs.

---

## Spec Self-Review

1. **Placeholder scan:** No TBD or incomplete sections. All code patterns shown.
2. **Internal consistency:** `categories.ts` entries match filenames. Sidebar `getShortTitle` will need updating.
3. **Scope:** Fits a single implementation plan — all changes are additive (no refactors).
4. **Ambiguity:** Read time approach clarified (static map, not API route). Home page tag filter clarified (client component, no URL state).

---

## Implementation Order (recommended)

1. Bug fixes (quick wins, 10 min)
2. `categories.ts` + Sidebar `getShortTitle` updates (2 min)  
3. 4 new guide `.md` files (content work — longest part)
4. Website features: read time → related guides → tags → print (code work)
