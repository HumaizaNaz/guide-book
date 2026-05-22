# Backend Guide
*APIs, Servers, Databases — Beginner se Advanced tak*

---

## PART 1 — BACKEND KYA KARTA HAI

Frontend jo nahi kar sakta:
- Passwords securely store karo
- Private API keys hide karo (OpenAI, Stripe, etc.)
- Database se data laao aur save karo
- Emails bhejo
- Files process karo
- Payments handle karo
- Rate limiting lagao

---

## PART 2 — REST API DESIGN

### Good API Design Rules

```
# Resource names plural aur lowercase
GET    /api/users          → sab users laao
GET    /api/users/123      → ek user laao
POST   /api/users          → naya user banao
PATCH  /api/users/123      → user update karo
DELETE /api/users/123      → user delete karo

# BAD naming (avoid)
GET /api/getUser
GET /api/fetchAllUsers
POST /api/createNewUser
```

### Response Format (Consistent Rakho)
```json
// SUCCESS
{
  "success": true,
  "data": { "id": 1, "name": "Humaiza" },
  "message": "User created successfully"
}

// ERROR
{
  "success": false,
  "error": "Email already exists",
  "code": "DUPLICATE_EMAIL"
}
```

### Next.js API Routes (Tumhare project)
```tsx
// app/api/users/route.ts

// GET — sab users
export async function GET() {
  try {
    const users = await db.user.findMany();
    return Response.json({ success: true, data: users });
  } catch (error) {
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// POST — naya user
export async function POST(request: Request) {
  const body = await request.json();

  // Validate
  if (!body.email || !body.name) {
    return Response.json({ error: "Email and name required" }, { status: 400 });
  }

  const user = await db.user.create({ data: body });
  return Response.json({ success: true, data: user }, { status: 201 });
}
```

### Dynamic Routes
```tsx
// app/api/users/[id]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({ data: user });
}
```

---

## PART 3 — DATABASE (Practical Guide)

### PostgreSQL with Prisma (Recommended Stack)

#### Setup
```bash
npm install prisma @prisma/client
npx prisma init
```

#### Schema banao (prisma/schema.prisma)
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int    @id @default(autoincrement())
  title     String
  content   String
  published Boolean @default(false)
  author    User   @relation(fields: [authorId], references: [id])
  authorId  Int
}

enum Role {
  USER
  ADMIN
  DOCTOR
}
```

#### CRUD Operations
```tsx
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: { email: "h@novaj.ai", name: "Humaiza" }
});

// READ — ek
const user = await prisma.user.findUnique({
  where: { email: "h@novaj.ai" }
});

// READ — sab (with filter)
const doctors = await prisma.user.findMany({
  where: { role: "DOCTOR" },
  orderBy: { createdAt: "desc" },
  take: 10,  // limit
  skip: 0,   // offset (pagination ke liye)
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: "Humaiza Naz" }
});

// DELETE
await prisma.user.delete({ where: { id: 1 } });
```

#### Migrations
```bash
# Schema change karo → migration chalao
npx prisma migrate dev --name add_phone_field

# Production pe
npx prisma migrate deploy
```

### Database Rules
- Har table mein `id`, `createdAt`, `updatedAt` hona chahiye
- Foreign keys use karo — orphan records se bachao
- Passwords KABHI store mat karo — sirf hash
- Sensitive data encrypt karo (credit cards, medical records)
- Regular backups — Supabase/Neon automatic karta hai

### Indexing (Performance)
```prisma
model User {
  email String @unique  // Auto-indexed
  role  Role

  @@index([role])  // Manual index — frequently filter karo toh
}
```
Rule: Jis column pe zyada WHERE/filter lagate ho, usse index karo.

---

## PART 4 — MIDDLEWARE

### Kya Hai?
Request aur response ke beech mein run hota hai — har request pe.

```tsx
// middleware.ts (Next.js root mein)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Auth check
  const token = request.cookies.get("token");
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Logging
  console.log(`${request.method} ${request.nextUrl.pathname}`);

  // 3. Headers add karo
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "value");

  return response;
}

// Sirf yeh paths pe run karo
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

---

## PART 5 — EMAIL BHEJANA

### Resend (Recommended — Next.js ke liye best)
```bash
npm install resend
```

```tsx
// app/api/contact/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  await resend.emails.send({
    from: "Novaj AI <hello@novaj.ai>",
    to: "team@novaj.ai",
    subject: `New contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });

  return Response.json({ success: true });
}
```

### Email Types
| Type | Example | Tool |
|------|---------|------|
| Transactional | Welcome email, password reset | Resend, SendGrid |
| Marketing | Newsletters, announcements | Mailchimp, ConvertKit |
| Notification | "Your order is ready" | Resend, Twilio |

---

## PART 6 — FILE UPLOADS

### Vercel Blob (Vercel users ke liye)
```bash
npm install @vercel/blob
```

```tsx
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  // Validate file type
  if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
    return Response.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "File too large" }, { status: 400 });
  }

  const blob = await put(file.name, file, { access: "public" });

  return Response.json({ url: blob.url });
}
```

---

## PART 7 — PAYMENTS (Stripe)

### Setup
```bash
npm install stripe @stripe/stripe-js
```

### Basic Payment Flow
```tsx
// app/api/checkout/route.ts
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",  // ya "payment" one-time ke liye
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "https://novaj.ai/success",
    cancel_url: "https://novaj.ai/pricing",
  });

  return Response.json({ url: session.url });
}
```

### Webhook — Payment Confirm Karo
```tsx
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    payload, sig, process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // ← Yahan user ko premium access do
    await db.user.update({
      where: { email: session.customer_email! },
      data: { isPremium: true }
    });
  }

  return Response.json({ received: true });
}
```

**Rule:** Payment confirmation ke liye HAMESHA webhook use karo — frontend redirect pe depend mat karo (user browser band kar sakta hai).

---

## PART 8 — CACHING

### Kyun Zaroori Hai?
Database query har request pe mat karo — slow hai. Cache karo.

### Next.js Built-in Caching
```tsx
// Static — build time pe generate, forever cache
export const dynamic = "force-static";

// Revalidate — har 1 ghante mein refresh
export const revalidate = 3600;

// Dynamic — har request pe fresh
export const dynamic = "force-dynamic";

// Fetch ke saath
const data = await fetch('/api/data', {
  next: { revalidate: 3600 }  // 1 hour cache
});
```

### Redis Cache (Advanced)
```tsx
import { Redis } from "@upstash/redis";
const redis = new Redis({ ... });

async function getUser(id: number) {
  // Cache check karo
  const cached = await redis.get(`user:${id}`);
  if (cached) return cached;

  // Database se laao
  const user = await db.user.findUnique({ where: { id } });

  // Cache mein save karo (1 ghante ke liye)
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));

  return user;
}
```

---

## PART 9 — RATE LIMITING

```tsx
// app/api/contact/route.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  // Normal logic continue karo
}
```

---

## PART 10 — ENVIRONMENT VARIABLES

```bash
# .env.local (development — kabhi commit mat karo)
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_test_..."
RESEND_API_KEY="re_..."

# NEXT_PUBLIC_ prefix = browser mein bhi available
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

```tsx
// Backend mein use karo
const apiKey = process.env.OPENAI_API_KEY; // private

// Frontend mein use karo (sirf NEXT_PUBLIC_ wale)
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
```

### Vercel pe set karo
```bash
vercel env add OPENAI_API_KEY
# Ya Vercel dashboard → Settings → Environment Variables
```

---

## SUMMARY

```
API Design    → REST conventions follow karo, consistent response format
Database      → Prisma + PostgreSQL, migrations, indexes
Middleware    → Auth check, logging, headers
Email         → Resend for transactional, Mailchimp for marketing
File Upload   → Vercel Blob, type + size validate karo
Payments      → Stripe, webhooks use karo confirmation ke liye
Caching       → Next.js revalidate, Redis for custom caching
Rate Limiting → Upstash, IP based
Env Vars      → .env.local, kabhi commit mat karo
```

*Next: `04_DEPLOYMENT_GUIDE.md`*
