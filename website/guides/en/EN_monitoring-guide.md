# Monitoring Guide
*What is happening in production — Sentry, uptime, alerts*

---

## Why Monitoring Matters

Local development is not production. In production:
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

The wizard logs you into Sentry, creates your project, generates config files, and updates `next.config.ts`. Skip to Step 6 if it succeeded.

### 3. Manual Setup — Get Your DSN

1. Sign up at sentry.io
2. Create a new project, select Next.js
3. Copy your DSN (looks like `https://abc123@o0.ingest.sentry.io/0`)
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://abc123@o0.ingest.sentry.io/0
```

### 4. Create Config Files

`sentry.client.config.ts` (project root):

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
})
```

`sentry.server.config.ts` and `sentry.edge.config.ts`:

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

const nextConfig: NextConfig = {}

export default withSentryConfig(nextConfig, {
  org: "your-sentry-org",
  project: "your-sentry-project",
  silent: true,
  widenClientFileUpload: true,
  sourcemaps: { disable: false },
  disableLogger: true,
})
```

### 6. Add instrumentation.ts

```typescript
// instrumentation.ts (project root, next to app/)
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config")
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config")
  }
}
```

### 7. Error Boundary

```tsx
// app/error.tsx
"use client"
import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error) }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500">{error.message || "An unexpected error occurred"}</p>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
        Try again
      </button>
    </div>
  )
}
```

### 8. Capture Errors Manually

```typescript
import * as Sentry from "@sentry/nextjs"

try {
  await sendEmailNotification(userId)
} catch (error) {
  Sentry.captureException(error, {
    tags: { operation: "email_notification" },
    extra: { userId },
  })
}

// Non-error events:
Sentry.captureMessage("Webhook received for unknown user", {
  level: "warning",
  extra: { stripeCustomerId, eventId },
})
```

### 9. Identify Users in Sentry

```typescript
import * as Sentry from "@sentry/nextjs"

// After sign-in:
Sentry.setUser({ id: user.id, email: user.email, username: user.name })

// On sign-out:
Sentry.setUser(null)
```

---

## Alert Rules in Sentry

Configure in Sentry > Alerts > Create Alert Rule:

### New Issue Alert (Must Have)
- Trigger: A new issue is created
- Actions: Send email or Slack message
- Use: Know immediately when a new bug type appears

### Regression Alert (Must Have)
- Trigger: A previously resolved issue re-appears
- Use: Catch regressions after fixes

### Error Spike Alert
- Trigger: Error event count increases by 500% in 1 hour
- Use: Detect production incidents early

---

## Uptime Monitoring

### UptimeRobot (Free)

1. Sign up at uptimerobot.com — 50 monitors, 5-minute checks, free
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://yoursite.com`
   - Interval: Every 5 minutes
   - Alert contacts: Your email

### What to Monitor

| Endpoint | Why |
|----------|-----|
| https://yoursite.com | Homepage reachable |
| https://yoursite.com/api/health | App server running |
| https://yoursite.com/sign-in | Auth flow not broken |

### Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const checks: Record<string, "ok" | "error"> = { app: "ok" }

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.db = "ok"
  } catch {
    checks.db = "error"
  }

  const allOk = Object.values(checks).every(v => v === "ok")
  return NextResponse.json(
    { status: allOk ? "ok" : "degraded", checks, timestamp: new Date().toISOString() },
    { status: allOk ? 200 : 503 }
  )
}
```

---

## Structured Logging

```typescript
// lib/logger.ts
import * as Sentry from "@sentry/nextjs"

type LogLevel = "debug" | "info" | "warn" | "error"

function log(level: LogLevel, message: string, options: { data?: Record<string, unknown>; error?: unknown } = {}) {
  const entry = { timestamp: new Date().toISOString(), level, message, ...options.data }

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
  error: (msg: string, error?: unknown, data?: Record<string, unknown>) => log("error", msg, { error, data }),
}
```

Usage:

```typescript
logger.info("User signed up", { userId, plan: "free", source: "google" })
logger.warn("Slow DB query", { duration: 2100, query: "getUserPosts" })
logger.error("Stripe webhook failed", error, { eventId, eventType })
```

---

## Reading Sentry Issues

When a Sentry notification arrives, check:

1. Title: error class and message
2. Stack trace: exact file and line number
3. Breadcrumbs: actions leading up to the error
4. User: which user was affected
5. Frequency graph: is this new, growing, or sporadic?

Triage priority:
- 100+ events in 1 hour: urgent
- Affects multiple users: high
- Single occurrence, no pattern: low
- Regression tag: investigate why it came back

---

## Weekly 5-Minute Monitoring Routine

Every Monday:

1. Sentry > Issues > Sort by Last Seen: any new error types this week?
2. Sentry > Issues > Filter Regression: anything that came back after a fix?
3. UptimeRobot dashboard: any downtime events?
4. Sentry > Performance > Web Vitals: any pages with p75 LCP above 2.5s?
5. Check alert inbox: any alerts dismissed without investigating?

---

## Quick Setup Checklist

- [ ] npm install @sentry/nextjs
- [ ] Run npx @sentry/wizard@latest -i nextjs or create config files manually
- [ ] Add NEXT_PUBLIC_SENTRY_DSN to .env.local
- [ ] Add instrumentation.ts to project root
- [ ] Create app/error.tsx with Sentry.captureException(error)
- [ ] Call Sentry.setUser() after authentication
- [ ] Configure New Issue and Regression alert rules in Sentry
- [ ] Create uptime monitor on UptimeRobot for homepage
- [ ] Create /api/health endpoint
- [ ] Add logger.ts and replace console.log in critical paths
