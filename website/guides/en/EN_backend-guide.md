# Backend Guide
*APIs, Servers, Databases — Beginner to Advanced*

---

## PART 1 — WHAT DOES BACKEND DO

Things frontend cannot do:
- Store passwords securely
- Hide private API keys (OpenAI, Stripe, etc.)
- Fetch and save data from database
- Send emails
- Process files
- Handle payments
- Apply rate limiting

---

## PART 2 — REST API DESIGN

### Good API Design Rules
```
# Resource names plural and lowercase
GET    /api/users          → get all users
GET    /api/users/123      → get one user
POST   /api/users          → create new user
PATCH  /api/users/123      → update user
DELETE /api/users/123      → delete user

# BAD naming (avoid)
GET /api/getUser
GET /api/fetchAllUsers
POST /api/createNewUser
```

### Consistent Response Format
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

### Next.js API Routes
```tsx
// app/api/users/route.ts

// GET — all users
export async function GET() {
  try {
    const users = await db.user.findMany();
    return Response.json({ success: true, data: users });
  } catch (error) {
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// POST — create user
export async function POST(request: Request) {
  const body = await request.json();

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

#### Define Schema (prisma/schema.prisma)
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
}
```

#### CRUD Operations
```tsx
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
const user = await prisma.user.create({
  data: { email: "h@example.com", name: "Humaiza" }
});

// READ
const users = await prisma.user.findMany();
const user = await prisma.user.findUnique({ where: { id: 1 } });

// With relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: "New Name" }
});

// DELETE
await prisma.user.delete({ where: { id: 1 } });
```

#### Migrations
```bash
# Create migration
npx prisma migrate dev --name add_user_table

# Apply to production
npx prisma migrate deploy

# View data in browser
npx prisma studio
```

---

## PART 4 — MIDDLEWARE & SECURITY

### Auth Middleware (Next.js)
```tsx
// middleware.ts (runs before every request)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" }
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"]
};
```

### Input Validation with Zod
```tsx
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

// In API route
export async function POST(request: Request) {
  const body = await request.json();
  const result = UserSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 });
  }

  const user = await db.user.create({ data: result.data });
  return Response.json({ data: user }, { status: 201 });
}
```

### Rate Limiting
```tsx
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  // ... rest of handler
}
```

---

## PART 5 — EMAIL SENDING

### Resend (Recommended)
```bash
npm install resend
```

```tsx
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, name } = await request.json();

  await resend.emails.send({
    from: "hello@yourapp.com",
    to: email,
    subject: "Welcome!",
    html: `<h1>Welcome ${name}!</h1><p>Thanks for signing up.</p>`,
  });

  return Response.json({ success: true });
}
```

---

## PART 6 — FILE UPLOADS

### Uploadthing (Recommended for Next.js)
```bash
npm install uploadthing @uploadthing/react
```

```tsx
// app/api/uploadthing/core.ts
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Authenticate user
      const user = await getUser(req);
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: { id: metadata.userId },
        data: { avatar: file.url },
      });
    }),
};
```

---

## PART 7 — ENVIRONMENT VARIABLES

```bash
# .env.local (never commit to git!)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
NEXTAUTH_SECRET="random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_test_..."
```

```tsx
// Access in server code
const dbUrl = process.env.DATABASE_URL;

// Type-safe env vars (install t3-env)
import { env } from "@/env";
const key = env.OPENAI_API_KEY; // TypeScript error if missing!
```

**Rules:**
- Never expose server env vars to client (don't use `NEXT_PUBLIC_` prefix for secrets)
- Add to `.gitignore`
- Set in Vercel dashboard for production

---

*Next: Read `Deployment Guide` — deploy your app to production*
