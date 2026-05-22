# Guides Full Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix stale content bugs, add 4 new developer guides (TypeScript, Auth, Payments, Monitoring), and add 4 website features (read time in sidebar, related guides, tag filtering, print/PDF).

**Architecture:** Guide `.md` files live in `C:\Users\km\Desktop\GUIDES\` and are read at build time by `website/src/lib/guides.ts`. New guides need an entry in `src/lib/categories.ts` and the `.md` file. Website features extend existing components; the home page extracts a `GuideGrid` client component for tag filtering.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4 (CSS-first, no tailwind.config.ts), next-mdx-remote, gray-matter, reading-time, lucide-react

---

## File Map

| Action | File |
|--------|------|
| Modify | `website/src/components/SearchModal.tsx` — fix hardcoded count |
| Modify | `00_INDEX.md` — update guide count and list |
| Modify | `SEO_CHECKLIST.md` — genericize project-specific content |
| Modify | `website/src/lib/categories.ts` — add 4 new guide entries |
| Modify | `website/src/components/Sidebar.tsx` — add getShortTitle + read time entries |
| Create | `16_TYPESCRIPT_GUIDE.md` |
| Create | `17_AUTH_GUIDE.md` |
| Create | `18_PAYMENTS_GUIDE.md` |
| Create | `19_MONITORING_GUIDE.md` |
| Modify | `website/src/components/Sidebar.tsx` — show read time per guide |
| Create | `website/src/components/RelatedGuides.tsx` |
| Modify | `website/src/lib/guides.ts` — add getRelatedGuides() |
| Modify | `website/src/app/guide/[slug]/page.tsx` — add RelatedGuides + print button |
| Create | `website/src/lib/tags.ts` |
| Create | `website/src/components/GuideGrid.tsx` — client component with tag filter |
| Modify | `website/src/app/page.tsx` — use GuideGrid |
| Modify | `website/src/app/globals.css` — add @media print styles |

---

## Task 1: Bug Fixes

**Files:**
- Modify: `website/src/components/SearchModal.tsx:113`
- Modify: `00_INDEX.md:3`
- Modify: `SEO_CHECKLIST.md` (multiple lines)

- [ ] **Step 1: Fix SearchModal hardcoded count**

In `website/src/components/SearchModal.tsx`, add the import and change line 113:

```tsx
// Add at top with other imports:
import { GUIDE_META } from '@/lib/categories'

// Change line 113 from:
<p className="px-4 py-4 text-xs text-gray-400 text-center">Type to search all 16 guides</p>

// To:
<p className="px-4 py-4 text-xs text-gray-400 text-center">Type to search all {GUIDE_META.length} guides</p>
```

- [ ] **Step 2: Fix 00_INDEX.md header**

In `00_INDEX.md` line 3, change:
```
*14 guides — Sab kuch ek jagah*
```
To:
```
*21 guides — Sab kuch ek jagah*
```

Then add the 7 missing guides to the table. After the current Visibility section add a new Foundation row and update existing sections. The complete updated sections at the bottom of the file should be:

```markdown
### Foundation (Pehle Padho)
| File | Topic | Time |
|------|-------|------|
| 01_WEB_APP_FUNDAMENTALS.md | Web app basics, auth, state | 15 min |
| 02_FRONTEND_GUIDE.md | HTML, CSS, React best practices | 20 min |
| 03_BACKEND_GUIDE.md | APIs, Node.js, REST patterns | 20 min |
| 10_GIT_WORKFLOW_GUIDE.md | Git commands, branching, PRs | 20 min |
| 11_DATABASE_GUIDE.md | PostgreSQL, Prisma, Supabase, Redis | 25 min |
| 16_TYPESCRIPT_GUIDE.md | TypeScript essentials, types, generics | 20 min |
| 17_AUTH_GUIDE.md | Clerk, NextAuth v5, JWT, OAuth | 20 min |

### Deployment & Infrastructure
| File | Topic | Time |
|------|-------|------|
| 04_DEPLOYMENT_GUIDE.md | Vercel deploy (quickest way) | 10 min |
| 06_DOCKER_GUIDE.md | Docker, Dockerfile, Compose | 25 min |
| 07_SERVER_VPS_GUIDE.md | VPS khareedhna, Ubuntu setup, Caddy | 25 min |
| 08_DOMAIN_HOSTING_GUIDE.md | Domain, DNS, SSL, Cloudflare | 20 min |
| 09_CICD_DEVOPS_GUIDE.md | GitHub Actions, auto deployment | 20 min |
| 18_PAYMENTS_GUIDE.md | Stripe, webhooks, subscriptions | 20 min |

### Quality & Tools
| File | Topic | Time |
|------|-------|------|
| 05_PERFORMANCE_GUIDE.md | Website fast kaise banate hain | 15 min |
| 13_TESTING_GUIDE.md | Vitest, Playwright, unit/E2E tests | 20 min |
| 14_DEVELOPER_TOOLKIT_GUIDE.md | VS Code, extensions, terminal setup | 15 min |
| 12_AI_TOOLS_GUIDE.md | Cursor, Claude Code, Copilot, Claude API | 20 min |
| 19_MONITORING_GUIDE.md | Sentry, uptime, alerts | 15 min |

### Visibility
| File | Topic | Time |
|------|-------|------|
| SEO_MASTER_GUIDE.md | Complete SEO knowledge | 30 min |
| SEO_CHECKLIST.md | SEO checklist | 5 min |
| 15_SEO_DISCOVERY_GUIDE.md | IndexNow, Open Graph, JSON-LD, crawl budget | 25 min |
```

- [ ] **Step 3: Genericize SEO_CHECKLIST.md**

Open `SEO_CHECKLIST.md`. Find and replace all occurrences of:
- `Novaj AI` → `Your App`
- `neura-nest-eight.vercel.app` → `yoursite.com`
- Any other project-specific brand names → `Your App` or `yoursite.com`

Use a text editor find-and-replace. Verify no project-specific references remain.

- [ ] **Step 4: Commit bug fixes**

```bash
git add website/src/components/SearchModal.tsx 00_INDEX.md SEO_CHECKLIST.md
git commit -m "fix: update stale guide counts and genericize SEO checklist"
```

---

## Task 2: Register New Guides in categories.ts + Sidebar

**Files:**
- Modify: `website/src/lib/categories.ts`
- Modify: `website/src/components/Sidebar.tsx`

- [ ] **Step 1: Add 4 entries to GUIDE_META in categories.ts**

In `website/src/lib/categories.ts`, after the last entry (order 17, seo-discovery-guide), add:

```typescript
  { filename: '16_TYPESCRIPT_GUIDE.md', slug: 'typescript-guide', category: 'Foundation', order: 18 },
  { filename: '17_AUTH_GUIDE.md', slug: 'auth-guide', category: 'Foundation', order: 19 },
  { filename: '18_PAYMENTS_GUIDE.md', slug: 'payments-guide', category: 'Deploy & Infra', order: 20 },
  { filename: '19_MONITORING_GUIDE.md', slug: 'monitoring-guide', category: 'Quality & Tools', order: 21 },
```

The full updated GUIDE_META array should end like:
```typescript
  { filename: '15_SEO_DISCOVERY_GUIDE.md', slug: 'seo-discovery-guide', category: 'Visibility', order: 17 },
  { filename: '16_TYPESCRIPT_GUIDE.md', slug: 'typescript-guide', category: 'Foundation', order: 18 },
  { filename: '17_AUTH_GUIDE.md', slug: 'auth-guide', category: 'Foundation', order: 19 },
  { filename: '18_PAYMENTS_GUIDE.md', slug: 'payments-guide', category: 'Deploy & Infra', order: 20 },
  { filename: '19_MONITORING_GUIDE.md', slug: 'monitoring-guide', category: 'Quality & Tools', order: 21 },
]
```

- [ ] **Step 2: Add 4 entries to getShortTitle in Sidebar.tsx**

In `website/src/components/Sidebar.tsx`, in the `getShortTitle` function, add after `'seo-discovery-guide'`:

```typescript
    'typescript-guide': 'TypeScript Guide',
    'auth-guide': 'Auth Guide',
    'payments-guide': 'Payments (Stripe)',
    'monitoring-guide': 'Monitoring Guide',
```

- [ ] **Step 3: Commit**

```bash
git add website/src/lib/categories.ts website/src/components/Sidebar.tsx
git commit -m "feat: register 4 new guides in categories and sidebar"
```

---

## Task 3: Write TypeScript Guide

**Files:**
- Create: `16_TYPESCRIPT_GUIDE.md` (in `C:\Users\km\Desktop\GUIDES\`, NOT in website/)

- [ ] **Step 1: Create the file with complete content**

Create `C:\Users\km\Desktop\GUIDES\16_TYPESCRIPT_GUIDE.md` with this full content:

```markdown
# TypeScript Guide

*JavaScript ke saath type safety — bugs pehle pakdo, production se pehle*

---

## Why TypeScript?

JavaScript ek dynamically typed language hai — variable ka type runtime par pata chalta hai:

```javascript
// JavaScript — koi error nahi jab tak run na ho
function getUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json())
}

getUser("abc") // Works
getUser(null)  // Works — but crashes in API
getUser()      // Works — but sends undefined
```

TypeScript yahi errors **compile time** par pakad leta hai:

```typescript
async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

getUser("abc") // ❌ Error: string is not assignable to number
getUser(null)  // ❌ Error: null is not assignable to number
getUser()      // ❌ Error: Expected 1 argument, got 0
```

**Key benefits:**
- Autocomplete (IDE knows what properties exist)
- Refactoring safety (rename spreads everywhere)
- Self-documenting code (types = documentation)
- Catch 40% of bugs before they ship

---

## Setup in Next.js

Next.js TypeScript **already included** — just use `.ts` and `.tsx` files.

Check `tsconfig.json` — should have `strict: true`:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`strict: true` enables 6 checks at once — most important: `strictNullChecks` (prevents `null` crashes).

---

## Core Types

### Primitives

```typescript
const name: string = "Alice"
const age: number = 30
const active: boolean = true
const data: null = null
const nothing: undefined = undefined
```

You rarely need to write these — TypeScript **infers** them:

```typescript
const name = "Alice"  // TypeScript knows: string
const age = 30        // TypeScript knows: number
```

### Arrays

```typescript
const names: string[] = ["Alice", "Bob"]
const scores: number[] = [95, 87, 92]

// Or using generic syntax (same thing):
const names: Array<string> = ["Alice", "Bob"]
```

### Objects

```typescript
const user: { id: number; name: string; email: string } = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
}
```

Object types inline get messy — use `interface` or `type` instead (see below).

### Union Types

A value that can be one of several types:

```typescript
type Status = "pending" | "active" | "cancelled"
type ID = string | number

function setStatus(status: Status) {
  // TypeScript knows only those 3 strings are valid
}

setStatus("active")    // ✅
setStatus("deleted")   // ❌ Error
```

### Optional Properties

Add `?` to mark a property as optional (can be the type OR `undefined`):

```typescript
interface User {
  id: number
  name: string
  bio?: string   // optional — may or may not exist
}

const user: User = { id: 1, name: "Alice" }  // ✅ bio not required
```

---

## Interfaces vs Type Aliases

Both define object shapes. Use `interface` for objects, `type` for unions/primitives:

```typescript
// Interface — for objects (can be extended)
interface User {
  id: number
  name: string
  email: string
}

interface AdminUser extends User {
  role: "admin"
  permissions: string[]
}

// Type alias — for unions, intersections, primitives
type Status = "pending" | "active" | "cancelled"
type StringOrNumber = string | number
type AdminUser = User & { role: "admin" }  // intersection
```

**Rule of thumb:** Use `interface` for anything that looks like a class/object shape. Use `type` for everything else.

---

## Generics

Generics let you write reusable code that works with any type:

```typescript
// Without generics — only works with string[]
function first(arr: string[]): string {
  return arr[0]
}

// With generics — works with any array
function first<T>(arr: T[]): T {
  return arr[0]
}

first([1, 2, 3])         // TypeScript infers T = number, returns number
first(["a", "b", "c"])   // TypeScript infers T = string, returns string
```

### Generic Interfaces

```typescript
interface ApiResponse<T> {
  data: T
  error: string | null
  timestamp: number
}

type UserResponse = ApiResponse<User>
type PostsResponse = ApiResponse<Post[]>
```

### Generic React Components

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Usage — TypeScript infers T = User
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id.toString()}
/>
```

---

## Utility Types

TypeScript comes with built-in utility types to transform existing types:

### `Partial<T>` — all properties optional

```typescript
interface User {
  id: number
  name: string
  email: string
}

type UpdateUser = Partial<User>
// { id?: number; name?: string; email?: string }

// Useful for update functions:
async function updateUser(id: number, changes: Partial<User>) {
  // changes can have any subset of User properties
}

updateUser(1, { name: "Bob" })             // ✅
updateUser(1, { name: "Bob", email: "…" }) // ✅
```

### `Required<T>` — all properties required

```typescript
type CompleteUser = Required<User>
// All properties non-optional, even ones that were optional
```

### `Pick<T, K>` — select specific properties

```typescript
type UserPreview = Pick<User, "id" | "name">
// { id: number; name: string }
// Useful for UI components that only need a subset
```

### `Omit<T, K>` — exclude specific properties

```typescript
type CreateUser = Omit<User, "id">
// { name: string; email: string }
// Useful for create forms where ID is auto-generated
```

### `Record<K, V>` — object with specific key/value types

```typescript
type UserMap = Record<string, User>
// { [key: string]: User }

const cache: Record<string, User> = {}
cache["alice"] = { id: 1, name: "Alice", email: "alice@example.com" }
```

### `NonNullable<T>` — remove null and undefined

```typescript
type SafeString = NonNullable<string | null | undefined>
// string
```

---

## Typing API Responses

Create a typed fetch wrapper:

```typescript
// lib/api.ts
interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      return { data: null, error: `HTTP ${res.status}` }
    }
    const data: T = await res.json()
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Unknown error" }
  }
}
```

Usage:

```typescript
interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const { data, error } = await fetchApi<Post[]>("/api/posts")

if (error) {
  console.error(error)
  return
}

// TypeScript knows data is Post[] here
data.forEach(post => console.log(post.title))
```

---

## Typing React Component Props

```typescript
// Simple props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
}

export function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}
```

For components that accept children:

```typescript
interface CardProps {
  title: string
  children: React.ReactNode  // any valid JSX
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

Extending HTML element props:

```typescript
// Extend native button to accept all button HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button className={`btn-${variant}`} {...props} />
}
```

---

## Typing Next.js Pages and Route Handlers

### Page with params (Next.js App Router):

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params
  // slug is string — TypeScript knows
}
```

### Route Handler:

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await db.user.findUnique({ where: { id: parseInt(id) } })

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}
```

### Server Actions:

```typescript
"use server"

import { z } from "zod"

const CreatePostSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(10),
})

export async function createPost(formData: FormData) {
  const result = CreatePostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  })

  if (!result.success) {
    return { error: result.error.flatten() }
  }

  const post = await db.post.create({ data: result.data })
  return { post }
}
```

---

## Common Mistakes

### 1. Abusing `any`

`any` turns off type checking — defeats the purpose:

```typescript
// ❌ Bad
function process(data: any) {
  data.foo.bar.baz  // no error, will crash at runtime
}

// ✅ Good — use unknown + type guard
function process(data: unknown) {
  if (typeof data === "object" && data !== null && "foo" in data) {
    // now TypeScript knows data has foo
  }
}
```

### 2. Type Assertion Abuse

`as Type` tells TypeScript "trust me" — can lie:

```typescript
// ❌ Lying to TypeScript
const user = response as User  // what if response is actually an error?

// ✅ Validate at runtime
const user = UserSchema.parse(response)  // zod throws if invalid
```

### 3. Not handling null/undefined

```typescript
// ❌ Will crash if user is null
const name = user.name

// ✅ Handle null
const name = user?.name ?? "Anonymous"
```

---

## Migrating a JS Project to TypeScript

1. **Rename files**: `.js` → `.ts`, `.jsx` → `.tsx` (one file at a time)
2. **Fix errors**: TypeScript will highlight issues — fix them, don't add `as any`
3. **Add types gradually**: Start with function signatures, then interfaces
4. **Enable strict**: Once existing files are clean, set `"strict": true` in tsconfig

You don't need to migrate everything at once — TypeScript and JavaScript can coexist in the same project.

---

## Quick Reference

```typescript
// Variable types
const x: string = "hello"
const y: number = 42
const z: boolean = true
const arr: string[] = ["a", "b"]
const tuple: [string, number] = ["age", 30]

// Interface
interface User { id: number; name: string; email?: string }

// Type alias
type Status = "active" | "inactive"

// Generic function
function identity<T>(arg: T): T { return arg }

// Utility types
type P = Partial<User>      // all optional
type R = Required<User>     // all required
type N = Pick<User, "id">   // just id
type X = Omit<User, "id">   // everything except id

// Assert non-null (use sparingly)
const el = document.getElementById("app")!

// Type narrowing
if (typeof val === "string") { /* val is string here */ }
if (val instanceof Error) { /* val is Error here */ }
if ("name" in obj) { /* obj has name property */ }
```
```

- [ ] **Step 2: Verify the file was created**

```bash
# Run from C:\Users\km\Desktop\GUIDES\
ls 16_TYPESCRIPT_GUIDE.md
```

Expected: file exists, size > 0

- [ ] **Step 3: Commit**

```bash
# Run from C:\Users\km\Desktop\GUIDES\
git add 16_TYPESCRIPT_GUIDE.md
git commit -m "feat: add TypeScript guide"
```

---

## Task 4: Write Auth Guide

**Files:**
- Create: `17_AUTH_GUIDE.md` (in `C:\Users\km\Desktop\GUIDES\`)

- [ ] **Step 1: Create the file with complete content**

Create `C:\Users\km\Desktop\GUIDES\17_AUTH_GUIDE.md`:

```markdown
# Auth Guide

*Authentication kaise karte hain — Clerk aur NextAuth v5 (Auth.js)*

---

## Auth Landscape

Authentication mat banao khud — it's a security minefield. Use a proven library:

| Option | Best For | Free Tier |
|--------|----------|-----------|
| **Clerk** | New projects, quickest setup | 10,000 MAU |
| **NextAuth v5** (Auth.js) | Self-hosted, custom DB control | Free always |
| **Supabase Auth** | Already using Supabase | Generous |
| **Lucia** | Full control, no magic | Free always |

**Recommendation: Use Clerk for new projects.** 15-minute setup, best DX.

---

## Clerk Setup (Recommended)

### 1. Install

```bash
npm install @clerk/nextjs
```

### 2. Get Keys

1. Sign up at [clerk.com](https://clerk.com)
2. Create application
3. Copy keys to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Wrap App in ClerkProvider

In `app/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### 4. Add Middleware (Protect Routes)

Create `middleware.ts` in the root (next to `app/`):

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/(.*)",
])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect()  // redirect to sign-in if not authenticated
  }
})

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
}
```

### 5. Sign-In and Sign-Up Pages

Create `app/sign-in/[[...sign-in]]/page.tsx`:

```tsx
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```

Create `app/sign-up/[[...sign-up]]/page.tsx`:

```tsx
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}
```

Add redirect URLs to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 6. Use Auth in Components

**Client Component:**

```tsx
"use client"
import { useUser, SignOutButton } from "@clerk/nextjs"

export function UserInfo() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!user) return <div>Not signed in</div>

  return (
    <div>
      <p>Hello, {user.firstName}!</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
    </div>
  )
}
```

**Server Component:**

```tsx
import { auth, currentUser } from "@clerk/nextjs/server"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    // This shouldn't happen since middleware protects this route
    // but TypeScript likes the check
    return null
  }

  const user = await currentUser()

  return <div>Welcome, {user?.firstName}!</div>
}
```

**Route Handler:**

```typescript
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Fetch user-specific data
  const data = await db.posts.findMany({ where: { userId } })
  return NextResponse.json(data)
}
```

### 7. UserButton (Avatar + Dropdown)

```tsx
import { UserButton } from "@clerk/nextjs"

// Renders the user's avatar with a click dropdown for sign-out, profile, etc.
<UserButton afterSignOutUrl="/" />
```

---

## NextAuth v5 (Auth.js)

Use when you need full control: custom DB, custom JWT, or can't use a third-party service.

### 1. Install

```bash
npm install next-auth@beta
```

### 2. Create Auth Config

Create `auth.ts` in the project root:

```typescript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id  // add user ID to session
      return session
    },
  },
})
```

### 3. Add Route Handler

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

### 4. Add Middleware

Create `middleware.ts`:

```typescript
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
}
```

### 5. Protect Pages (Server Side)

```typescript
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  return <div>Welcome {session.user.name}!</div>
}
```

### 6. Use Session in Client Components

Wrap your app in `SessionProvider` (in layout.tsx):

```tsx
"use client"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

Then in any client component:

```tsx
"use client"
import { useSession, signOut } from "next-auth/react"

export function NavUser() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div>
      <span>{session.user?.name}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
```

### Sign-In with Providers Button

```tsx
"use client"
import { signIn } from "next-auth/react"

export function SignInButtons() {
  return (
    <div>
      <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        Sign in with GitHub
      </button>
      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign in with Google
      </button>
    </div>
  )
}
```

---

## Role-Based Access

### With Clerk (metadata approach):

```typescript
// Set role in Clerk dashboard or via API
// In your middleware or server component:
import { auth } from "@clerk/nextjs/server"

const { sessionClaims } = await auth()
const role = sessionClaims?.metadata?.role  // "admin" | "user" | undefined

if (role !== "admin") {
  redirect("/unauthorized")
}
```

### With NextAuth (session callback):

```typescript
// In auth.ts callbacks:
callbacks: {
  session({ session, user }) {
    session.user.id = user.id
    session.user.role = user.role  // from your DB
    return session
  },
  authorized({ auth, request }) {
    const isAdmin = auth?.user?.role === "admin"
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin")
    if (isAdminPath && !isAdmin) return false
    return !!auth?.user
  }
}
```

---

## Environment Variables Checklist

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# NextAuth
NEXTAUTH_URL=https://yoursite.com          # production URL
NEXTAUTH_SECRET=your-random-secret-here    # openssl rand -base64 32
AUTH_GITHUB_ID=your-github-app-id
AUTH_GITHUB_SECRET=your-github-app-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Generate a secret:
```bash
openssl rand -base64 32
```

---

## Common Mistakes

### 1. Exposing secret keys to the client
`NEXT_PUBLIC_` prefix exposes env vars to the browser. Never use it for secret keys:
```bash
CLERK_SECRET_KEY=sk_...           # ✅ server only
NEXT_PUBLIC_CLERK_SECRET=sk_...   # ❌ exposed to browser
```

### 2. Missing callback URL after sign-in
Users get stuck on the sign-in page after authenticating. Always set `afterSignInUrl` or `callbackUrl`.

### 3. Not protecting API routes
Middleware protects pages, but API routes need separate checks:
```typescript
// Always check auth in API routes
const { userId } = await auth()
if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
```

### 4. Using the wrong session method
Clerk and NextAuth both have `auth()` but they're different functions. Don't mix imports.
```typescript
import { auth } from "@clerk/nextjs/server"  // Clerk
import { auth } from "@/auth"                  // NextAuth
```

---

## Quick Setup Checklist

**Clerk:**
- [ ] `npm install @clerk/nextjs`
- [ ] Add keys to `.env.local`
- [ ] Wrap `<ClerkProvider>` in layout
- [ ] Create `middleware.ts`
- [ ] Create sign-in/sign-up pages
- [ ] Add `<UserButton />` to nav

**NextAuth:**
- [ ] `npm install next-auth@beta`
- [ ] Create `auth.ts` with providers
- [ ] Create `app/api/auth/[...nextauth]/route.ts`
- [ ] Set `NEXTAUTH_SECRET` in env
- [ ] Create `middleware.ts`
- [ ] Wrap app in `<SessionProvider>`
```

- [ ] **Step 2: Commit**

```bash
git add 17_AUTH_GUIDE.md
git commit -m "feat: add auth guide (Clerk + NextAuth v5)"
```

---

## Task 5: Write Payments Guide

**Files:**
- Create: `18_PAYMENTS_GUIDE.md` (in `C:\Users\km\Desktop\GUIDES\`)

- [ ] **Step 1: Create the file with complete content**

Create `C:\Users\km\Desktop\GUIDES\18_PAYMENTS_GUIDE.md`:

```markdown
# Payments Guide

*Stripe se payments lena — checkout, webhooks, subscriptions*

---

## Why Stripe?

Stripe is the developer-first payment processor:
- Best API and documentation
- Test mode (no real money needed during dev)
- Built-in fraud protection
- Supports 135+ currencies
- Compliance handled (PCI DSS)

---

## Stripe Account Setup

1. Sign up at [stripe.com](https://stripe.com)
2. Complete identity verification (required for live payments)
3. Get API keys from **Developers → API Keys**

```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...        # Never expose to browser
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Safe for browser
STRIPE_WEBHOOK_SECRET=whsec_...      # Get this after creating webhook
```

**Test mode vs Live mode:** Toggle in top-left of Stripe dashboard. Always develop in test mode.

---

## Install

```bash
npm install stripe @stripe/stripe-js
```

Create a Stripe client singleton in `lib/stripe.ts`:

```typescript
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})
```

---

## Products and Prices

In the Stripe dashboard:
1. Go to **Product Catalog → Add product**
2. Set name, description, image
3. Add a price:
   - **One-time**: fixed amount charged once
   - **Recurring**: charged monthly/yearly (subscriptions)
4. Copy the **Price ID** (starts with `price_...`)

You can also create products via API:

```typescript
const product = await stripe.products.create({
  name: "Pro Plan",
  description: "Unlimited access",
})

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 1000,  // $10.00 (in cents)
  currency: "usd",
  recurring: { interval: "month" },
})
```

---

## Checkout Session (One-Time Payment)

The hosted checkout page — Stripe handles the UI, you just redirect.

### Server Action:

```typescript
// app/actions/checkout.ts
"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export async function createCheckout(priceId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const session = await stripe.checkout.sessions.create({
    mode: "payment",                    // "subscription" for recurring
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: { userId },               // pass your user ID for webhook use
  })

  redirect(session.url!)
}
```

### Button Component:

```tsx
"use client"
import { createCheckout } from "@/app/actions/checkout"

export function BuyButton({ priceId }: { priceId: string }) {
  return (
    <form action={createCheckout.bind(null, priceId)}>
      <button type="submit" className="btn-primary">
        Buy Now
      </button>
    </form>
  )
}
```

---

## Subscriptions

For monthly/yearly plans, use `mode: "subscription"`:

```typescript
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!, quantity: 1 }],
  success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  metadata: { userId },
  subscription_data: {
    metadata: { userId },
    trial_period_days: 14,  // optional free trial
  },
})
```

---

## Webhooks (Critical)

Webhooks tell your server when events happen (payment succeeded, subscription cancelled, etc.).
**Never trust the redirect URL alone** — users can close the browser tab. Always use webhooks to update your database.

### Step 1: Create the webhook endpoint

Create `app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.userId
      if (!userId) break

      // Update your database
      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: session.customer as string,
          subscriptionId: session.subscription as string,
          plan: "pro",
        },
      })
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.userId
      if (!userId) break

      await db.user.update({
        where: { id: userId },
        data: { plan: "free" },
      })
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      // Send email to user, or update status to "past_due"
      console.log("Payment failed for customer:", invoice.customer)
      break
    }
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing — Stripe needs the raw body for signature verification
export const config = { api: { bodyParser: false } }
```

### Step 2: Test locally with Stripe CLI

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This gives you a webhook secret like `whsec_...` — add it to `.env.local`.

### Step 3: Trigger test events

```bash
# In another terminal:
stripe trigger checkout.session.completed
stripe trigger customer.subscription.deleted
```

---

## Subscription Lifecycle

```
Created → Active → Past Due → Canceled
               ↑         ↓
            (retry)  (dunning emails)
```

Key events to handle:
| Event | Meaning |
|-------|---------|
| `checkout.session.completed` | Payment succeeded, grant access |
| `invoice.payment_succeeded` | Recurring payment OK |
| `invoice.payment_failed` | Payment failed, send reminder |
| `customer.subscription.updated` | Plan changed |
| `customer.subscription.deleted` | Cancelled, revoke access |

---

## Customer Portal (Let Users Manage Subscriptions)

Let users update payment method, cancel, or upgrade — without you building a UI:

```typescript
// app/actions/portal.ts
"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export async function openCustomerPortal() {
  const { userId } = await auth()
  if (!userId) throw new Error("Not authenticated")

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user?.stripeCustomerId) throw new Error("No Stripe customer")

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  })

  redirect(session.url)
}
```

Enable the portal at **Stripe Dashboard → Settings → Billing → Customer portal**.

---

## Test Card Numbers

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Payment declined |
| `4000 0025 0000 3155` | Requires 3D Secure |
| `4000 0000 0000 0002` | Card declined |

Use any future expiry date and any 3-digit CVC.

---

## Going Live Checklist

- [ ] Complete Stripe identity verification
- [ ] Switch to live API keys in production env
- [ ] Create production webhook in Stripe dashboard → Developers → Webhooks
- [ ] Set `STRIPE_WEBHOOK_SECRET` from the live webhook endpoint
- [ ] Test real payment with your own card (then refund)
- [ ] Set up failure alerts in Stripe dashboard

---

## Common Mistakes

### 1. Not verifying webhook signatures
Anyone can POST to your webhook URL. Always verify:
```typescript
stripe.webhooks.constructEvent(body, signature, secret)
// Throws if invalid — wrap in try/catch
```

### 2. Trusting the redirect URL
`/success` can be visited by anyone. Update the database **only in the webhook**, not on success page redirect.

### 3. Not handling duplicate events
Stripe may send the same event twice. Use idempotency — check if you already processed it:
```typescript
const existing = await db.payment.findUnique({
  where: { stripeEventId: event.id }
})
if (existing) return NextResponse.json({ received: true })
// Process and save event.id to db
```

### 4. Storing amount in the wrong unit
Stripe uses **cents** (smallest currency unit), not dollars:
```typescript
unit_amount: 1000   // = $10.00
unit_amount: 999    // = $9.99
```
```

- [ ] **Step 2: Commit**

```bash
git add 18_PAYMENTS_GUIDE.md
git commit -m "feat: add payments guide (Stripe + webhooks)"
```

---

## Task 6: Write Monitoring Guide

**Files:**
- Create: `19_MONITORING_GUIDE.md` (in `C:\Users\km\Desktop\GUIDES\`)

- [ ] **Step 1: Create the file with complete content**

Create `C:\Users\km\Desktop\GUIDES\19_MONITORING_GUIDE.md`:

```markdown
# Monitoring Guide

*Production mein kya ho raha hai — Sentry, uptime, alerts*

---

## Why Monitoring Matters

Local development ≠ production:
- Users have different browsers, networks, screen sizes
- Third-party APIs fail
- Database queries timeout under load
- Memory leaks build up over days
- Errors you never see locally happen constantly in prod

Without monitoring: users see errors, you don't. They leave silently.

---

## Sentry (Error Tracking)

Sentry catches every JavaScript error, shows you the stack trace, affected users, and breadcrumbs (what happened before the error).

### 1. Install

```bash
npm install @sentry/nextjs
```

### 2. Run the Setup Wizard

```bash
npx @sentry/wizard@latest -i nextjs
```

This creates:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- Updates `next.config.js` automatically

Or configure manually — see below.

### 3. Manual Config (if wizard fails)

Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,   // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

Create `sentry.server.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
})
```

Add to `.env.local`:
```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@o0.ingest.sentry.io/000
```

### 4. Source Maps (Readable Stack Traces)

Without source maps, stack traces show minified code (`a.b.c` instead of `getUserProfile`). In `next.config.ts`:

```typescript
import { withSentryConfig } from "@sentry/nextjs"

const nextConfig = {
  // your config
}

export default withSentryConfig(nextConfig, {
  org: "your-org",
  project: "your-project",
  silent: true,
  widenClientFileUpload: true,
  sourcemaps: { disable: false },
})
```

### 5. Custom Error Boundary

Show a friendly UI when a component crashes:

```tsx
"use client"
import * as Sentry from "@sentry/nextjs"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorBoundaryProps) {
  Sentry.captureException(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
      <p className="text-gray-600 text-sm">{error.message}</p>
      <button onClick={reset} className="btn-primary">Try again</button>
    </div>
  )
}
```

Save as `app/error.tsx` — Next.js uses it automatically.

### 6. Capture Errors Manually

For non-crash errors you want to track:

```typescript
import * as Sentry from "@sentry/nextjs"

try {
  const result = await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: { operation: "riskyOperation" },
    extra: { userId, context: "checkout" },
  })
  // handle gracefully
}
```

For non-error events:

```typescript
Sentry.captureMessage("Payment webhook received but user not found", {
  level: "warning",
  extra: { stripeCustomerId, eventId },
})
```

---

## Alert Rules

In Sentry dashboard → **Alerts → Create Alert**:

**New Issue Alert:**
- Trigger: New issue created
- Action: Email / Slack notification
- Use: Catch brand new error types immediately

**Regression Alert:**
- Trigger: Issue resolved then reappears
- Use: Catch bugs that sneak back in after a "fix"

**Error Spike Alert:**
- Trigger: Error rate increases by 500%+ in 1 hour
- Use: Catch production incidents before users complain

---

## Uptime Monitoring

Sentry doesn't check if your site is reachable. Use a separate uptime monitor.

### UptimeRobot (Free)

1. Sign up at [uptimerobot.com](https://uptimerobot.com) — free tier: 50 monitors, 5-min checks
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://yoursite.com`
   - Check interval: 5 minutes
   - Alert contacts: your email
3. Repeat for critical endpoints: `/api/health`, main pages

### What to Monitor

| Endpoint | Why |
|----------|-----|
| `https://yoursite.com` | Homepage reachable |
| `https://yoursite.com/api/health` | App server running |
| `https://yoursite.com/sign-in` | Auth working |
| Your payment API | Stripe integration |

### Create a Health Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  // Optionally check DB connection
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: "ok", db: "ok" })
  } catch {
    return NextResponse.json({ status: "ok", db: "error" }, { status: 500 })
  }
}
```

---

## Structured Logging

Avoid `console.log` spam in production. Use consistent log levels:

```typescript
// lib/logger.ts
const isDev = process.env.NODE_ENV === "development"

export const logger = {
  info: (msg: string, data?: object) => {
    if (isDev) console.log(`[INFO] ${msg}`, data ?? "")
  },
  warn: (msg: string, data?: object) => {
    console.warn(`[WARN] ${msg}`, data ?? "")
  },
  error: (msg: string, error?: unknown, data?: object) => {
    console.error(`[ERROR] ${msg}`, error, data ?? "")
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: { msg, ...data } })
    }
  },
}
```

Usage:

```typescript
logger.info("User signed up", { userId, plan: "free" })
logger.warn("Slow query detected", { duration: 2100, query: "getUserPosts" })
logger.error("Stripe webhook failed", error, { eventId })
```

---

## Reading Sentry Traces

When a Sentry issue arrives:

1. **Issue title** — the error message and file
2. **Breadcrumbs** — what happened in order before the crash (navigation, clicks, fetch calls)
3. **Stack trace** — exact file and line (if source maps configured)
4. **Tags** — browser, OS, URL, user
5. **User** — if you set `Sentry.setUser({ id, email })` after sign-in

Set the user after authentication:
```typescript
// In your auth provider/component after sign-in:
import * as Sentry from "@sentry/nextjs"

Sentry.setUser({
  id: user.id,
  email: user.email,
})
```

---

## Weekly 5-Minute Incident Review

Every week, spend 5 minutes:

1. Open Sentry → **Issues** → sort by "First Seen" this week
2. Any new issues? Triage: crash vs. warning vs. noise
3. Open Issues with "Regression" tag — something broke again
4. Check UptimeRobot — any downtime events?
5. Check Sentry Performance → slow pages > 2s

**Red flags to act on immediately:**
- Any issue with 100+ occurrences
- Any error affecting >5% of sessions
- Any downtime > 5 minutes

---

## Quick Setup Checklist

- [ ] `npm install @sentry/nextjs`
- [ ] Run `npx @sentry/wizard@latest -i nextjs`
- [ ] Add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`
- [ ] Add `app/error.tsx` error boundary
- [ ] Create uptime monitor on UptimeRobot for homepage
- [ ] Create `/api/health` endpoint
- [ ] Set up New Issue + Spike alert in Sentry
- [ ] Add `Sentry.setUser()` call after authentication
```

- [ ] **Step 2: Commit**

```bash
git add 19_MONITORING_GUIDE.md
git commit -m "feat: add monitoring guide (Sentry + uptime)"
```

---

## Task 7: Add Read Time to Sidebar

**Files:**
- Modify: `website/src/components/Sidebar.tsx`

The guide `readTime` is already computed by `reading-time` in `guides.ts` and available on the `Guide` type. The sidebar doesn't have access to server-side data — it's a client component. Use a static lookup map (same pattern as `getShortTitle`) based on approximate line counts.

- [ ] **Step 1: Add getReadTime function to Sidebar.tsx**

In `website/src/components/Sidebar.tsx`, add this function after `getShortTitle`:

```typescript
function getReadTime(slug: string): string {
  const times: Record<string, string> = {
    'web-app-fundamentals': '15 min',
    'frontend-guide': '20 min',
    'backend-guide': '20 min',
    'git-workflow': '20 min',
    'database-guide': '25 min',
    'deployment-guide': '10 min',
    'docker-guide': '25 min',
    'server-vps-guide': '25 min',
    'domain-hosting-guide': '20 min',
    'cicd-devops-guide': '20 min',
    'performance-guide': '15 min',
    'testing-guide': '20 min',
    'developer-toolkit': '15 min',
    'ai-tools-guide': '20 min',
    'seo-master-guide': '30 min',
    'seo-checklist': '5 min',
    'seo-discovery-guide': '25 min',
    'typescript-guide': '20 min',
    'auth-guide': '20 min',
    'payments-guide': '20 min',
    'monitoring-guide': '15 min',
  }
  return times[slug] ?? '15 min'
}
```

- [ ] **Step 2: Show read time in the guide link**

In `Sidebar.tsx`, find the `<Link>` element inside `CategorySection` and update the inner span to add a read time badge. Change:

```tsx
<span className="truncate">{getShortTitle(guide.slug)}</span>
```

To:

```tsx
<span className="truncate flex-1">{getShortTitle(guide.slug)}</span>
<span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-1">
  {getReadTime(guide.slug)}
</span>
```

The `<Link>` className already has `flex items-center gap-2` so this will lay out correctly.

- [ ] **Step 3: Verify in browser**

Start the dev server (`npm run dev` in `website/`) and open any guide. The sidebar should show read times like "15 min" next to each guide title.

- [ ] **Step 4: Commit**

```bash
git add website/src/components/Sidebar.tsx
git commit -m "feat: show read time per guide in sidebar"
```

---

## Task 8: Related Guides Component

**Files:**
- Modify: `website/src/lib/guides.ts`
- Create: `website/src/components/RelatedGuides.tsx`
- Modify: `website/src/app/guide/[slug]/page.tsx`

- [ ] **Step 1: Add getRelatedGuides() to guides.ts**

In `website/src/lib/guides.ts`, add this function after `getAllSlugs()`:

```typescript
export function getRelatedGuides(slug: string): GuideMeta[] {
  const current = GUIDE_META.find(g => g.slug === slug)
  if (!current) return []

  // Same category guides, excluding current
  const sameCategory = GUIDE_META.filter(
    g => g.category === current.category && g.slug !== slug
  )

  // Take up to 3; if fewer than 3 in category, fill from adjacent orders
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }

  const others = GUIDE_META.filter(
    g => g.slug !== slug && !sameCategory.includes(g)
  ).sort((a, b) => Math.abs(a.order - current.order) - Math.abs(b.order - current.order))

  return [...sameCategory, ...others].slice(0, 3)
}
```

Also add `GuideMeta` to the imports at the top of the file if not already exported from categories (it already is — `type GuideMeta` is exported from `@/lib/categories`).

- [ ] **Step 2: Create RelatedGuides.tsx**

Create `website/src/components/RelatedGuides.tsx`:

```tsx
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { GuideMeta } from '@/lib/categories'

const categoryColors: Record<string, string> = {
  'Foundation': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Deploy & Infra': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Quality & Tools': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Visibility': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

const readTimes: Record<string, string> = {
  'web-app-fundamentals': '15 min', 'frontend-guide': '20 min', 'backend-guide': '20 min',
  'git-workflow': '20 min', 'database-guide': '25 min', 'deployment-guide': '10 min',
  'docker-guide': '25 min', 'server-vps-guide': '25 min', 'domain-hosting-guide': '20 min',
  'cicd-devops-guide': '20 min', 'performance-guide': '15 min', 'testing-guide': '20 min',
  'developer-toolkit': '15 min', 'ai-tools-guide': '20 min', 'seo-master-guide': '30 min',
  'seo-checklist': '5 min', 'seo-discovery-guide': '25 min', 'typescript-guide': '20 min',
  'auth-guide': '20 min', 'payments-guide': '20 min', 'monitoring-guide': '15 min',
}

const shortTitles: Record<string, string> = {
  'web-app-fundamentals': 'Web App Fundamentals', 'frontend-guide': 'Frontend Guide',
  'backend-guide': 'Backend Guide', 'git-workflow': 'Git Workflow',
  'database-guide': 'Database Guide', 'deployment-guide': 'Deployment (Vercel)',
  'docker-guide': 'Docker Guide', 'server-vps-guide': 'Server & VPS',
  'domain-hosting-guide': 'Domain & Hosting', 'cicd-devops-guide': 'CI/CD & DevOps',
  'performance-guide': 'Performance', 'testing-guide': 'Testing Guide',
  'developer-toolkit': 'Developer Toolkit', 'ai-tools-guide': 'AI Tools Guide',
  'seo-master-guide': 'SEO Master Guide', 'seo-checklist': 'SEO Checklist',
  'seo-discovery-guide': 'SEO Discovery & Indexing', 'typescript-guide': 'TypeScript Guide',
  'auth-guide': 'Auth Guide', 'payments-guide': 'Payments (Stripe)',
  'monitoring-guide': 'Monitoring Guide',
}

export function RelatedGuides({ guides }: { guides: GuideMeta[] }) {
  if (guides.length === 0) return null

  return (
    <section className="related-guides mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Continue Reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {guides.map(guide => (
          <Link
            key={guide.slug}
            href={`/guide/${guide.slug}`}
            className="group flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all"
          >
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full self-start mb-3 ${categoryColors[guide.category]}`}>
              {guide.category}
            </span>
            <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-1">
              {shortTitles[guide.slug] ?? guide.slug}
            </span>
            <div className="flex items-center justify-between mt-3">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                {readTimes[guide.slug] ?? '15 min'}
              </span>
              <ArrowRight size={14} className="text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add RelatedGuides to the guide page**

In `website/src/app/guide/[slug]/page.tsx`, add the import and render the component after `<NotesPad>`:

```tsx
// Add to imports at top:
import { RelatedGuides } from '@/components/RelatedGuides'
import { getRelatedGuides } from '@/lib/guides'

// In the page component, after getting the guide:
const related = getRelatedGuides(slug)

// In the JSX, after <NotesPad slug={slug} />:
<RelatedGuides guides={related} />
```

The complete updated page component body should look like:

```tsx
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const related = getRelatedGuides(slug)

  return (
    <div className="flex gap-12">
      <article className="flex-1 min-w-0">
        <ProgressTracker slug={slug} />

        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 block">
            {guide.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {guide.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {guide.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              {guide.wordCount.toLocaleString()} words
            </span>
          </div>
        </div>

        <GuideContent content={guide.content} />
        <NotesPad slug={slug} />
        <RelatedGuides guides={related} />
      </article>

      <TableOfContents />
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

Open any guide page. Scroll to the bottom past the notes section — should see "Continue Reading" with 3 guide cards.

- [ ] **Step 5: Commit**

```bash
git add website/src/lib/guides.ts website/src/components/RelatedGuides.tsx website/src/app/guide/[slug]/page.tsx
git commit -m "feat: add related guides section at bottom of each guide"
```

---

## Task 9: Tag Filtering on Home Page

**Files:**
- Create: `website/src/lib/tags.ts`
- Create: `website/src/components/GuideGrid.tsx`
- Modify: `website/src/app/page.tsx`

- [ ] **Step 1: Create tags.ts**

Create `website/src/lib/tags.ts`:

```typescript
export const GUIDE_TAGS: Record<string, string[]> = {
  'web-app-fundamentals': ['frontend', 'backend'],
  'frontend-guide': ['frontend'],
  'backend-guide': ['backend'],
  'git-workflow': ['git'],
  'database-guide': ['database', 'backend'],
  'deployment-guide': ['devops'],
  'docker-guide': ['docker', 'devops'],
  'server-vps-guide': ['devops'],
  'domain-hosting-guide': ['devops'],
  'cicd-devops-guide': ['devops', 'git'],
  'performance-guide': ['performance', 'frontend'],
  'testing-guide': ['testing'],
  'developer-toolkit': ['frontend', 'backend'],
  'ai-tools-guide': ['ai'],
  'seo-master-guide': ['seo'],
  'seo-checklist': ['seo'],
  'seo-discovery-guide': ['seo'],
  'typescript-guide': ['typescript', 'frontend', 'backend'],
  'auth-guide': ['auth', 'backend'],
  'payments-guide': ['backend', 'devops'],
  'monitoring-guide': ['devops', 'testing'],
}

export const ALL_TAGS = [
  'frontend', 'backend', 'devops', 'database',
  'testing', 'seo', 'auth', 'performance',
  'typescript', 'git', 'docker', 'ai',
] as const

export type Tag = (typeof ALL_TAGS)[number]
```

- [ ] **Step 2: Create GuideGrid.tsx client component**

Create `website/src/components/GuideGrid.tsx`:

```tsx
'use client'
import { useState } from 'react'
import { GuideCard } from '@/components/GuideCard'
import { CATEGORIES, type Category } from '@/lib/categories'
import { GUIDE_TAGS, ALL_TAGS } from '@/lib/tags'
import type { Guide } from '@/lib/guides'

const TAG_LABELS: Record<string, string> = {
  frontend: 'Frontend', backend: 'Backend', devops: 'DevOps',
  database: 'Database', testing: 'Testing', seo: 'SEO',
  auth: 'Auth', performance: 'Performance', typescript: 'TypeScript',
  git: 'Git', docker: 'Docker', ai: 'AI',
}

export function GuideGrid({ guides }: { guides: Guide[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? guides.filter(g => GUIDE_TAGS[g.slug]?.includes(activeTag))
    : guides

  const categoriesWithGuides = CATEGORIES.filter(cat =>
    filtered.some(g => g.category === cat)
  )

  return (
    <div>
      {/* Tag filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTag === null
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
      </div>

      {/* Guide sections */}
      {categoriesWithGuides.length === 0 && (
        <p className="text-gray-500 text-sm">No guides match this filter.</p>
      )}
      {categoriesWithGuides.map((category: Category) => {
        const categoryGuides = filtered.filter(g => g.category === category)
        return (
          <section key={category} className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryGuides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Update app/page.tsx to use GuideGrid**

Replace the full content of `website/src/app/page.tsx`:

```tsx
import { getAllGuides } from '@/lib/guides'
import { GuideGrid } from '@/components/GuideGrid'

export default function HomePage() {
  const allGuides = getAllGuides()
  const total = allGuides.length

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Developer Guides
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {total} guides — Docker, servers, domains, CI/CD, databases, AI tools, testing, and more. Updated 2026.
        </p>
      </div>

      <GuideGrid guides={allGuides} />
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

Open the home page. Should see tag filter chips at the top. Click "Frontend" — only frontend guides show. Click "All" — all guides return.

- [ ] **Step 5: Commit**

```bash
git add website/src/lib/tags.ts website/src/components/GuideGrid.tsx website/src/app/page.tsx
git commit -m "feat: add tag filtering to home page"
```

---

## Task 10: Print / PDF Export

**Files:**
- Modify: `website/src/app/globals.css`
- Modify: `website/src/app/guide/[slug]/page.tsx`

- [ ] **Step 1: Add print styles to globals.css**

At the end of `website/src/app/globals.css`, add:

```css
@media print {
  /* Hide everything except the article */
  header,
  aside,
  nav,
  .notes-pad,
  .related-guides,
  button {
    display: none !important;
  }

  /* Full-width article */
  body {
    background: white !important;
    color: black !important;
  }

  article {
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Clean typography */
  .prose h2 {
    border-bottom: 1px solid #ccc !important;
    margin-top: 24pt !important;
  }

  /* Avoid breaking code blocks across pages */
  pre {
    page-break-inside: avoid;
    border: 1px solid #ddd !important;
    background: #f5f5f5 !important;
    color: black !important;
  }

  /* Avoid orphaned headings */
  h2, h3 {
    page-break-after: avoid;
  }

  a {
    color: black !important;
    text-decoration: underline;
  }

  /* Show URLs after links */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
}
```

- [ ] **Step 2: Add print button to guide page header**

In `website/src/app/guide/[slug]/page.tsx`, add `Printer` to the lucide-react import:

```tsx
import { Clock, BookOpen, Printer } from 'lucide-react'
```

In the guide header div (after the word count span), add a print button:

```tsx
<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
  <span className="flex items-center gap-1.5">
    <Clock size={14} />
    {guide.readTime}
  </span>
  <span className="flex items-center gap-1.5">
    <BookOpen size={14} />
    {guide.wordCount.toLocaleString()} words
  </span>
  <PrintButton />
</div>
```

Create `PrintButton` as a small client component inline is not possible (guide page is server component), so create `website/src/components/PrintButton.tsx`:

```tsx
'use client'
import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      title="Print or save as PDF"
    >
      <Printer size={14} />
      <span>Print</span>
    </button>
  )
}
```

Add `PrintButton` import to `guide/[slug]/page.tsx`:

```tsx
import { PrintButton } from '@/components/PrintButton'
```

And add `<PrintButton />` to the header flex div.

- [ ] **Step 3: Add notes-pad CSS class to NotesPad**

`ProgressTracker` returns `null` — nothing to hide. `RelatedGuides` already has `className="related-guides ..."` from Task 8.

Only change needed: add `notes-pad` class to `NotesPad`'s outer div.

In `website/src/components/NotesPad.tsx`, change line 26 from:
```tsx
<div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
```
To:
```tsx
<div className="notes-pad mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
```

Also remove `.progress-tracker` from the print CSS in globals.css (ProgressTracker renders nothing, the class is unused).

- [ ] **Step 4: Verify print output**

Open any guide page. Click Print button. In the print preview, verify:
- Only the article content shows
- Sidebar and TOC are hidden
- Notes and Related Guides sections are hidden
- Code blocks have light background

- [ ] **Step 5: Commit**

```bash
git add website/src/app/globals.css website/src/app/guide/[slug]/page.tsx website/src/components/PrintButton.tsx
git commit -m "feat: add print/PDF export with clean print styles"
```

---

## Final Verification

- [ ] Run `npm run build` in `website/` — should complete with no errors
- [ ] Check that all 21 guides appear in the sidebar
- [ ] Check that search shows the correct count dynamically
- [ ] Check that read times appear in sidebar
- [ ] Verify related guides show at bottom of each guide
- [ ] Verify tag filter works on home page
- [ ] Verify print preview looks clean
- [ ] Commit any remaining changes

```bash
cd website && npm run build
```

Expected: `✓ Compiled successfully` with 21 guide static pages generated.
