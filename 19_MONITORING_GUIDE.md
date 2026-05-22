# Monitoring Guide

*Production mein kya ho raha hai — Sentry, uptime, alerts*

---

## Why Monitoring Matters

Local development ≠ production. In production:
- Users have different browsers, OS versions, screen sizes
- Network requests time out and fail
- Third-party APIs go down
- Memory leaks build up over days
- Race conditions appear under real load
- Errors happen for specific user accounts, not yours

**Without monitoring:** users silently encounter errors and leave. You find out weeks later through a 1-star review.

**With monitoring:** you know about errors within minutes, often before users report them.

---

## Sentry (Error Tracking)

Sentry catches every JavaScript/TypeScript error in production, captures the full stack trace, and shows you which users were affected.

### 1. Install

```bash
npm install @sentry/nextjs
```

### 2. Run the Setup Wizard (Easiest)

```bash
npx @sentry/wizard@latest -i nextjs
```

The wizard:
1. Asks you to log in to Sentry
2. Creates your project
3. Generates config files automatically
4. Updates `next.config.ts`

Skip to Step 6 if the wizard succeeded.

### 3. Manual Setup — Get Your DSN

1. Sign up at [sentry.io](https://sentry.io)
2. Create a new project → select Next.js
3. Copy your **DSN** (looks like `https://abc123@o0.ingest.sentry.io/0`)
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://abc123@o0.ingest.sentry.io/0
```

### 4. Create Config Files

`sentry.client.config.ts` (in project root):

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Percentage of transactions to trace (0.0 to 1.0):
  tracesSampleRate: 0.1,  // 10% — enough for performance insights

  // Replay sampling:
  replaysSessionSampleRate: 0.05,   // 5% of all sessions
  replaysOnErrorSampleRate: 1.0,    // 100% of sessions with errors

  integrations: [
    Sentry.replayIntegration(),
  ],
})
```

`sentry.server.config.ts` (in project root):

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
})
```

`sentry.edge.config.ts` (in project root):

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
})
```

### 5. Update next.config.ts

```typescript
import { withSentryConfig } from "@sentry/nextjs"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // your existing config
}

export default withSentryConfig(nextConfig, {
  org: "your-sentry-org",
  project: "your-sentry-project",
  silent: true,                  // suppress build output
  widenClientFileUpload: true,   // upload more source maps
  sourcemaps: { disable: false },
  disableLogger: true,
})
```

### 6. Add `instrumentation.ts`

Next.js 15+ requires an instrumentation file for server-side Sentry:

```typescript
// instrumentation.ts (in project root, next to app/)
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config")
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config")
  }
}
```

### 7. Error Boundary (Custom Error Page)

`app/error.tsx` — shown when any Server or Client Component crashes:

```tsx
"use client"
import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
      <div className="text-4xl">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-500 max-w-sm text-center">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
```

### 8. Capture Errors Manually

For errors you catch and handle gracefully, but still want to track:

```typescript
import * as Sentry from "@sentry/nextjs"

// In a server action or API route:
try {
  await sendEmailNotification(userId)
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      operation: "email_notification",
      feature: "checkout",
    },
    extra: {
      userId,
      emailType: "welcome",
    },
  })
  // Gracefully continue — don't crash the checkout
}
```

For non-error events worth tracking:

```typescript
// Track something that shouldn't happen but isn't an error:
Sentry.captureMessage("Webhook received for unknown user", {
  level: "warning",
  extra: { stripeCustomerId, eventId },
})
```

### 9. Identify Users in Sentry

Set user context after authentication so you can see which users are affected:

```typescript
// In your auth callback, layout, or after sign-in:
import * as Sentry from "@sentry/nextjs"

Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
})

// Clear on sign-out:
Sentry.setUser(null)
```

---

## Alert Rules in Sentry

Configure in Sentry → **Alerts → Create Alert Rule**:

### New Issue Alert (Must Have)

- **Trigger:** A new issue is created
- **Conditions:** The issue is `unresolved`
- **Actions:** Send email / Slack message
- **Use:** Know immediately when a new bug type appears

### Regression Alert (Must Have)

- **Trigger:** A previously resolved issue re-appears
- **Use:** Catch regressions after "fixes"

### Error Spike Alert

- **Trigger:** Error event count increases by 500% in 1 hour
- **Use:** Detect production incidents early (often before users start complaining)

### High Volume Filter

Add a filter: `Event frequency > 100 per hour` to reduce noise from known low-severity issues. Triage those separately.

---

## Uptime Monitoring

Sentry tracks errors but not whether your site is reachable. Use a dedicated uptime service.

### UptimeRobot (Free)

1. Sign up at [uptimerobot.com](https://uptimerobot.com) — free tier includes 50 monitors, 5-minute checks
2. Add new monitor:
   - **Monitor type:** HTTP(s)
   - **Friendly name:** My App - Homepage
   - **URL:** `https://yoursite.com`
   - **Monitoring interval:** Every 5 minutes
   - **Alert contacts:** Your email
3. Repeat for each critical endpoint

### What to Monitor

| Endpoint | Why |
|----------|-----|
| `https://yoursite.com` | Homepage reachable |
| `https://yoursite.com/api/health` | App server running |
| `https://yoursite.com/sign-in` | Auth flow not broken |
| `https://yoursite.com/dashboard` | Core feature accessible |

### Create an `/api/health` Endpoint

A simple health check endpoint that uptime monitors can ping:

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const checks: Record<string, "ok" | "error"> = {
    app: "ok",
  }

  // Optional: check DB connectivity
  try {
    await prisma.$queryRaw`SELECT 1`
    checks.db = "ok"
  } catch {
    checks.db = "error"
  }

  const allOk = Object.values(checks).every(v => v === "ok")
  const status = allOk ? 200 : 503

  return NextResponse.json(
    { status: allOk ? "ok" : "degraded", checks, timestamp: new Date().toISOString() },
    { status }
  )
}
```

Response when healthy:
```json
{
  "status": "ok",
  "checks": { "app": "ok", "db": "ok" },
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

---

## Structured Logging

Avoid `console.log` everywhere — it's noisy and hard to filter. Use consistent log levels:

```typescript
// lib/logger.ts
import * as Sentry from "@sentry/nextjs"

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogOptions {
  data?: Record<string, unknown>
  error?: unknown
}

function log(level: LogLevel, message: string, options: LogOptions = {}) {
  const timestamp = new Date().toISOString()
  const entry = { timestamp, level, message, ...options.data }

  switch (level) {
    case "debug":
      if (process.env.NODE_ENV === "development") console.log(entry)
      break
    case "info":
      console.log(JSON.stringify(entry))
      break
    case "warn":
      console.warn(JSON.stringify(entry))
      break
    case "error":
      console.error(JSON.stringify(entry))
      if (options.error instanceof Error) {
        Sentry.captureException(options.error, { extra: options.data })
      }
      break
  }
}

export const logger = {
  debug: (msg: string, data?: Record<string, unknown>) => log("debug", msg, { data }),
  info: (msg: string, data?: Record<string, unknown>) => log("info", msg, { data }),
  warn: (msg: string, data?: Record<string, unknown>) => log("warn", msg, { data }),
  error: (msg: string, error?: unknown, data?: Record<string, unknown>) =>
    log("error", msg, { error, data }),
}
```

Usage:

```typescript
import { logger } from "@/lib/logger"

// In a Server Action:
logger.info("User signed up", { userId, plan: "free", source: "google" })
logger.warn("Slow DB query", { duration: 2100, query: "getUserPosts", userId })
logger.error("Stripe webhook failed", error, { eventId, eventType })
```

---

## Reading Sentry Issues

When a Sentry notification arrives, open the issue and check:

1. **Title** — error class and message (`TypeError: Cannot read properties of null`)
2. **Stack trace** — exact file and line number (only readable with source maps configured)
3. **Breadcrumbs** — actions leading up to the error (navigation, clicks, API calls, console logs)
4. **User** — which user was affected (if you called `Sentry.setUser()`)
5. **Tags** — browser, OS, URL, environment
6. **Frequency graph** — is this new, growing, or sporadic?

**Triage priority:**
- 100+ events in 1 hour → urgent
- Affects multiple users → high
- Single occurrence, no pattern → low
- "Regression" tag → investigate why it came back

---

## Weekly 5-Minute Monitoring Routine

Every Monday morning:

1. **Sentry → Issues → Sort by "Last Seen"** — any new error types this week?
2. **Sentry → Issues → Filter "Regression"** — anything that came back after a fix?
3. **UptimeRobot dashboard** — any downtime events? How long?
4. **Sentry → Performance → Web Vitals** — any pages with p75 LCP > 2.5s?
5. **Check alert inbox** — any alerts you dismissed without investigating?

Takes 5 minutes. Catches most issues before they compound.

---

## Quick Setup Checklist

- [ ] `npm install @sentry/nextjs`
- [ ] Run `npx @sentry/wizard@latest -i nextjs` or create config files manually
- [ ] Add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`
- [ ] Add `instrumentation.ts` to project root
- [ ] Create `app/error.tsx` with `Sentry.captureException(error)`
- [ ] Call `Sentry.setUser()` after authentication
- [ ] Configure New Issue + Regression alert rules in Sentry
- [ ] Create uptime monitor on UptimeRobot for homepage
- [ ] Create `/api/health` endpoint
- [ ] Add `logger.ts` and replace `console.log` calls in critical paths
