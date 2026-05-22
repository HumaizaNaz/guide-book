# Auth Guide

*Authentication kaise implement karte hain — Clerk aur NextAuth v5 (Auth.js)*

---

## Auth Landscape

**Authentication khud mat banao** — it's a security minefield. Session management, password hashing, CSRF protection, brute-force prevention — all of this is handled by proven libraries.

| Option | Best For | Free Tier |
|--------|----------|-----------|
| **Clerk** | New projects, fastest setup, best DX | 10,000 MAU |
| **NextAuth v5** (Auth.js) | Self-hosted, custom DB, full control | Free always |
| **Supabase Auth** | Already using Supabase | Generous |
| **Lucia** | Maximum control, no magic | Free always |

**Recommendation: Use Clerk for new projects.** 15-minute setup, hosted auth UI, built-in user management dashboard.

---

## Clerk Setup (Recommended)

### 1. Install

```bash
npm install @clerk/nextjs
```

### 2. Get API Keys

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Choose providers (email, Google, GitHub, etc.)
4. Copy keys to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Wrap App in ClerkProvider

`app/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "My App" }

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

Create `middleware.ts` in the project root (same level as `app/`):

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/blog(.*)",          // add any other public routes
  "/api/webhooks/(.*)", // webhook endpoints bypass auth
])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect()  // redirects unauthenticated users to /sign-in
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

### 5. Sign-In and Sign-Up Pages

`app/sign-in/[[...sign-in]]/page.tsx`:

```tsx
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  )
}
```

`app/sign-up/[[...sign-up]]/page.tsx`:

```tsx
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp />
    </main>
  )
}
```

The `[[...sign-in]]` catch-all route handles all Clerk's internal redirect flows.

### 6. Use Auth in Client Components

```tsx
"use client"
import { useUser, useAuth, SignOutButton } from "@clerk/nextjs"

export function UserProfile() {
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) return <div className="animate-pulse">Loading...</div>
  if (!isSignedIn) return <div>Not signed in</div>

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.imageUrl}
        alt={user.fullName ?? ""}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="font-medium">{user.fullName}</p>
        <p className="text-sm text-gray-500">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
      <SignOutButton>
        <button className="btn-secondary text-sm">Sign out</button>
      </SignOutButton>
    </div>
  )
}
```

### 7. Use Auth in Server Components

```tsx
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = await auth()

  // Middleware already protects this route, but TypeScript needs the check
  if (!userId) redirect("/sign-in")

  const user = await currentUser()

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>User ID: {userId}</p>
    </div>
  )
}
```

### 8. Use Auth in Route Handlers

```typescript
// app/api/posts/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const posts = await db.post.findMany({ where: { userId } })
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const post = await db.post.create({
    data: { ...body, userId },
  })
  return NextResponse.json(post, { status: 201 })
}
```

### 9. UserButton (Avatar + Dropdown)

Drop the `<UserButton />` anywhere in your nav — Clerk renders an avatar with a dropdown for managing account and signing out:

```tsx
import { UserButton } from "@clerk/nextjs"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <a href="/">My App</a>
      <UserButton afterSignOutUrl="/" />
    </nav>
  )
}
```

---

## NextAuth v5 (Auth.js)

Use NextAuth when you need full control: custom database, custom providers, or when Clerk's managed service doesn't fit your requirements.

### 1. Install

```bash
npm install next-auth@beta
```

### 2. Create `auth.ts`

In the project root (next to `app/`):

```typescript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    // Email + password (optional):
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user?.password) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        return valid ? user : null
      },
    }),
  ],

  callbacks: {
    // Add user ID and role to the session:
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role   // requires User model to have role field
      return session
    },
  },

  pages: {
    signIn: "/sign-in",   // custom sign-in page (optional)
    error: "/auth/error",
  },
})
```

### 3. Add Route Handler

`app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

### 4. Extend the Session Type

NextAuth's session type doesn't have `id` or `role` by default. Extend it in `types/next-auth.d.ts`:

```typescript
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    role: string
  }
}
```

### 5. Add Middleware

`middleware.ts`:

```typescript
export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
}
```

### 6. Protect Pages (Server Side)

```tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/sign-in")
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Your ID: {session.user.id}</p>
    </div>
  )
}
```

### 7. Use Session in Client Components

Wrap your app in `SessionProvider`:

```tsx
// app/providers.tsx
"use client"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

```tsx
// app/layout.tsx
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Then in any client component:

```tsx
"use client"
import { useSession, signOut } from "next-auth/react"

export function UserMenu() {
  const { data: session, status } = useSession()

  if (status === "loading") return <div className="animate-pulse w-8 h-8 rounded-full bg-gray-200" />
  if (!session) return null

  return (
    <div className="flex items-center gap-2">
      <img src={session.user?.image ?? ""} className="w-8 h-8 rounded-full" alt="" />
      <span>{session.user?.name}</span>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  )
}
```

### 8. Sign-In with Provider Buttons

```tsx
"use client"
import { signIn } from "next-auth/react"

export function SignInButtons() {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="flex items-center gap-2 btn-secondary"
      >
        <GitHubIcon />
        Continue with GitHub
      </button>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="flex items-center gap-2 btn-secondary"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </div>
  )
}
```

---

## Role-Based Access

### With Clerk (publicMetadata approach)

Set the role in the Clerk dashboard (Users → select user → Metadata → publicMetadata) or via the Clerk API:

```typescript
// In a server action or API route:
import { clerkClient } from "@clerk/nextjs/server"

await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: { role: "admin" },
})
```

Check role in middleware or server components:

```typescript
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth()

  if (!userId) redirect("/sign-in")

  const role = sessionClaims?.metadata?.role
  if (role !== "admin") redirect("/unauthorized")

  return <AdminDashboard />
}
```

### With NextAuth (database role)

Add a `role` column to your User table (Prisma schema):

```prisma
model User {
  id       String @id @default(cuid())
  email    String @unique
  name     String?
  role     String @default("user")  // "user" | "admin"
  // ... other fields
}
```

Check role in server components:

```typescript
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) redirect("/sign-in")
  if (session.user.role !== "admin") redirect("/unauthorized")

  return <AdminDashboard />
}
```

---

## Environment Variables Checklist

### Clerk

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### NextAuth

```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000              # http in dev, https in prod
NEXTAUTH_SECRET=your-secret-here               # openssl rand -base64 32
AUTH_GITHUB_ID=your-github-app-client-id
AUTH_GITHUB_SECRET=your-github-app-client-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
DATABASE_URL=postgresql://...                  # for adapter
```

Generate a secret:

```bash
openssl rand -base64 32
```

---

## Common Mistakes

### 1. Exposing secret keys to the browser

`NEXT_PUBLIC_` prefix makes env vars visible in client-side bundle:

```bash
# ❌ Secret exposed to everyone who visits your site
NEXT_PUBLIC_CLERK_SECRET_KEY=sk_...

# ✅ Server-only — never sent to browser
CLERK_SECRET_KEY=sk_...
```

### 2. Not protecting API routes

Middleware protects page routes. API routes need their own check:

```typescript
// ❌ Anyone can call this
export async function GET() {
  const data = await db.user.findMany()
  return NextResponse.json(data)
}

// ✅ Check auth first
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await db.user.findMany({ where: { userId } })
  return NextResponse.json(data)
}
```

### 3. Missing callback URL after sign-in

Users sign in and get stuck on the sign-in page. Always set a redirect:

```typescript
// Clerk — set in env vars:
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

// NextAuth — pass callbackUrl:
signIn("github", { callbackUrl: "/dashboard" })
```

### 4. Mixing Clerk and NextAuth imports

Both have an `auth()` function. Don't mix them:

```typescript
// ❌ Wrong import
import { auth } from "next-auth"       // NextAuth's auth
const { userId } = await auth()        // crashes — NextAuth has no userId

// ✅ Clerk
import { auth } from "@clerk/nextjs/server"
const { userId } = await auth()        // Clerk's userId

// ✅ NextAuth
import { auth } from "@/auth"
const session = await auth()           // NextAuth's session
```

### 5. Using `useSession` in a Server Component

```tsx
// ❌ useSession is client-only
export default async function Page() {
  const { data: session } = useSession()  // Error: hooks can't be in Server Components
}

// ✅ Server Component — use auth() directly
export default async function Page() {
  const session = await auth()
}

// ✅ Client Component — use useSession
"use client"
export default function Page() {
  const { data: session } = useSession()
}
```

---

## Quick Setup Checklist

### Clerk
- [ ] `npm install @clerk/nextjs`
- [ ] Sign up at clerk.com, create app, copy keys to `.env.local`
- [ ] Wrap layout in `<ClerkProvider>`
- [ ] Create `middleware.ts` with `clerkMiddleware`
- [ ] Create `app/sign-in/[[...sign-in]]/page.tsx`
- [ ] Create `app/sign-up/[[...sign-up]]/page.tsx`
- [ ] Add `<UserButton afterSignOutUrl="/" />` to nav

### NextAuth
- [ ] `npm install next-auth@beta`
- [ ] Create `auth.ts` with providers
- [ ] Create `app/api/auth/[...nextauth]/route.ts`
- [ ] Add `NEXTAUTH_SECRET` to `.env.local` (`openssl rand -base64 32`)
- [ ] Extend session type in `types/next-auth.d.ts`
- [ ] Create `middleware.ts` with route matchers
- [ ] Wrap app in `<SessionProvider>` via `Providers` component
