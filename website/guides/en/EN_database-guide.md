# Database Complete Guide
*PostgreSQL, Prisma, Supabase, Redis — 2026*

---

## WHAT IS A DATABASE?

Database = Organized data storage — permanent, structured, and queryable.

```
Without a database:
  Data only in memory → Server restarts? It's all gone!
  Data in a file → Concurrency issues, slow, unsafe

With a database:
  Data in permanent storage
  Multiple users can access it simultaneously
  Query, filter, sort — efficiently
  Define relationships
  Backup, recovery — built in
```

### 2026 Verdict: PostgreSQL Won

```
PostgreSQL = The #1 database for web apps

Why:
✓ Free, open source
✓ ACID compliant (safe transactions)
✓ JSON support (flexible data)
✓ Full text search
✓ Extensions: PostGIS, pgvector (for AI!)
✓ Scales well
✓ Supabase, Neon, Railway all run on PostgreSQL
```

---

## PART 1 — DATABASE TYPES

### SQL vs NoSQL

```
SQL (Relational):
  PostgreSQL, MySQL, SQLite
  Data: Tables + Rows + Columns
  Relations: JOIN tables together
  When: Structured data, transactions, relationships

NoSQL (Non-relational):
  MongoDB, Firebase Firestore
  Data: Documents (JSON)
  When: Flexible schema, rapid prototyping, nested data

Cache:
  Redis
  Data: Key-Value (in RAM)
  When: Need speed, temporary data, sessions, queues
```

### What Should You Use?

```
Next.js/SaaS app    → PostgreSQL (Supabase or Neon)
Real-time app       → Supabase (built-in realtime)
Need fast cache     → Redis (sessions, rate limiting)
Simple script       → SQLite (one file, no server)
Prototype/hackathon → Firebase (quickest setup)
```

---

## PART 2 — POSTGRESQL BASICS

### SQL Language — Essential Commands

```sql
-- CREATE A TABLE
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  email     VARCHAR(255) UNIQUE NOT NULL,
  name      VARCHAR(100),
  role      VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT DATA
INSERT INTO users (email, name) VALUES ('test@example.com', 'Ahmed');

-- FETCH DATA
SELECT * FROM users;
SELECT id, name FROM users WHERE role = 'admin';
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- UPDATE DATA
UPDATE users SET name = 'Ali' WHERE id = 1;

-- DELETE DATA
DELETE FROM users WHERE id = 1;

-- RELATION: Products belonging to a user
SELECT u.name, p.title 
FROM users u
JOIN products p ON p.user_id = u.id
WHERE u.id = 1;
```

### Data Types (Common)

```sql
INTEGER / BIGINT       -- Numbers
SERIAL / BIGSERIAL     -- Auto-increment ID
VARCHAR(n)             -- Text (max n chars)
TEXT                   -- Unlimited text
BOOLEAN                -- true/false
DECIMAL(10,2)          -- Exact numbers (for prices!)
TIMESTAMPTZ            -- Date + time + timezone
UUID                   -- Unique ID (better than serial)
JSONB                  -- JSON data (searchable)
```

### UUID vs Serial ID

```sql
-- Serial (simple, predictable)
id SERIAL PRIMARY KEY
-- Problem: 1, 2, 3... leaks user count

-- UUID (better for security)
id UUID DEFAULT gen_random_uuid() PRIMARY KEY
-- Output: 550e8400-e29b-41d4-a716-446655440000
-- Cannot be guessed or enumerated
```

---

## PART 3 — PRISMA ORM (Recommended)

ORM = Object Relational Mapper — use code instead of SQL to interact with the database.

### Setup

```bash
# Install
npm install prisma @prisma/client

# Initialize
npx prisma init

# This creates:
# prisma/schema.prisma  ← Database schema
# .env                  ← DATABASE_URL
```

### Define the Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]   // Relation
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")  // Database table name
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())

  @@map("posts")
}

enum Role {
  USER
  ADMIN
}
```

### Migrations

```bash
# Create a migration in development
npx prisma migrate dev --name add_users_table

# Deploy migration to production
npx prisma migrate deploy

# View schema (GUI)
npx prisma studio

# Regenerate client (after schema change)
npx prisma generate
```

### Prisma Queries

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ─── CREATE ──────────────────────────────────────
const user = await prisma.user.create({
  data: {
    email: 'ahmed@example.com',
    name: 'Ahmed',
  }
})

// ─── READ ─────────────────────────────────────────
// Single user
const user = await prisma.user.findUnique({
  where: { email: 'ahmed@example.com' }
})

// Multiple users
const users = await prisma.user.findMany({
  where: { role: 'USER' },
  orderBy: { createdAt: 'desc' },
  take: 10,       // LIMIT
  skip: 0,        // OFFSET
})

// With relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: '123' },
  include: { posts: true }
})

// Select specific fields only
const names = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
})

// ─── UPDATE ──────────────────────────────────────
const updated = await prisma.user.update({
  where: { id: '123' },
  data: { name: 'Ali Ahmed' }
})

// ─── DELETE ──────────────────────────────────────
await prisma.user.delete({ where: { id: '123' } })

// ─── COUNT ───────────────────────────────────────
const total = await prisma.user.count()
const admins = await prisma.user.count({ where: { role: 'ADMIN' } })

// ─── TRANSACTION ─────────────────────────────────
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'new@example.com' } }),
  prisma.post.create({ data: { title: 'Hello', authorId: '...' } })
])
```

### Prisma Connection (Next.js Pattern)

```typescript
// lib/db.ts — One instance, reused globally
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## PART 4 — SUPABASE (PostgreSQL + Everything)

Supabase = Firebase alternative — PostgreSQL + Auth + Storage + Realtime + Edge Functions all in one place.

### Setup (with Next.js)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**.env.local:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # Server only!
```

### Supabase Client Setup

```typescript
// lib/supabase/client.ts — Browser side
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// lib/supabase/server.ts — Server side (Next.js)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )
}
```

### Supabase Queries

```typescript
const supabase = createClient()

// ─── READ ─────────────────────────────────────────
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('role', 'admin')
  .order('created_at', { ascending: false })
  .limit(10)

// With relations
const { data } = await supabase
  .from('posts')
  .select(`
    *,
    author:users(id, name, email)
  `)

// ─── INSERT ──────────────────────────────────────
const { data, error } = await supabase
  .from('users')
  .insert({ email: 'new@example.com', name: 'New User' })
  .select()  // Return the inserted row

// ─── UPDATE ──────────────────────────────────────
const { error } = await supabase
  .from('users')
  .update({ name: 'Updated Name' })
  .eq('id', userId)

// ─── DELETE ──────────────────────────────────────
await supabase.from('users').delete().eq('id', userId)

// ─── REALTIME ────────────────────────────────────
supabase
  .channel('posts-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change!', payload)
    }
  )
  .subscribe()
```

### Supabase Auth

```typescript
// Email/Password signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Google OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: 'https://yourapp.com/auth/callback' }
})

// Current user
const { data: { user } } = await supabase.auth.getUser()

// Logout
await supabase.auth.signOut()
```

### Row Level Security (RLS) — Security Is Essential

```sql
-- Users can only see their own data
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);
```

---

## PART 5 — REDIS (Cache + Speed)

Redis = In-memory data store — blazing fast, for temporary data.

### When to Use It

```
✓ Session storage
✓ Rate limiting (10 req/minute per user)
✓ Cache (temporarily store database results)
✓ Job queues
✓ Leaderboards
✓ Real-time counters
```

### Setup (Upstash — Serverless Redis)

```bash
npm install @upstash/redis
```

**.env:**
```env
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxx
```

### Redis Usage

```typescript
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// ─── BASIC SET/GET ────────────────────────────────
await redis.set('user:123', JSON.stringify({ name: 'Ahmed' }))
const user = await redis.get('user:123')

// With TTL (expire)
await redis.set('session:abc', 'userId123', { ex: 3600 }) // 1 hour

// ─── CACHE PATTERN ────────────────────────────────
async function getCachedUser(userId: string) {
  const cacheKey = `user:${userId}`
  
  // Is it in cache?
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached as string)
  
  // Fetch from database
  const user = await db.user.findUnique({ where: { id: userId } })
  
  // Store in cache (5 min)
  await redis.set(cacheKey, JSON.stringify(user), { ex: 300 })
  
  return user
}

// ─── RATE LIMITING ────────────────────────────────
async function rateLimit(userId: string) {
  const key = `rate:${userId}`
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, 60) // 1 minute window
  }
  
  if (requests > 10) {
    throw new Error('Rate limit exceeded')
  }
}

// ─── COUNTERS ─────────────────────────────────────
await redis.incr('page:views:home')
const views = await redis.get('page:views:home')
```

---

## PART 6 — SCHEMA DESIGN (Best Practices)

### Naming Conventions

```sql
-- Table names: lowercase, plural, snake_case
users, blog_posts, order_items

-- Column names: snake_case
user_id, created_at, is_active

-- ID type: cuid() or uuid() (Prisma)
id String @id @default(cuid())
```

### Always Include These Columns

```prisma
model AnyModel {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // ... other columns
}
```

### Soft Delete (Never delete data)

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  deletedAt DateTime? // null = active, date = deleted

  @@index([deletedAt]) // For performance
}
```

```typescript
// Soft delete
await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() }
})

// Active users only
await prisma.user.findMany({
  where: { deletedAt: null }
})
```

### Indexing — Performance

```prisma
model Post {
  id        String  @id @default(cuid())
  authorId  String
  published Boolean
  createdAt DateTime @default(now())

  // Single field index
  @@index([authorId])

  // Compound index (frequently queried together)
  @@index([authorId, published])

  // Unique constraint
  @@unique([authorId, slug])
}
```

**Rule:** Add an index on fields that frequently appear in WHERE clauses.

---

## PART 7 — DATABASE COMPARISON (2026)

### Hosted Postgres Options

| Service | Free Tier | Price | Best For |
|---------|----------|-------|----------|
| **Supabase** | 500MB, 2 projects | $25/mo pro | Full stack, auth included |
| **Neon** | 0.5 GB, auto-suspend | $19/mo | Serverless, Next.js |
| **Railway** | $5 credit | $5–20/mo | Docker + DB together |
| **PlanetScale** | Free tier removed | $39/mo | MySQL, large scale |
| **Render** | 90 days free | $7/mo | Simple setup |

### Recommendation

```
Just starting (free)?    → Supabase free tier
Deploying on Vercel?     → Neon (seamless integration)
Everything on Railway?   → Railway Postgres
Serious production?      → Supabase Pro or Neon paid
```

---

## PART 8 — MIGRATIONS (Production)

```bash
# Development:
npx prisma migrate dev --name describe_change

# Staging/Production:
npx prisma migrate deploy

# Never "reset" production!
# npx prisma migrate reset  # ← NEVER on production
```

### Migration Safety Rules

```
✓ Additive changes are safe (adding a column)
✓ NOT NULL column? First make it nullable, fill data, then set NOT NULL
✓ Rename a column? First add new, copy data, drop old
✓ Always back up before migrating production
✓ Test on staging before production
```

---

## DATABASE CHECKLIST

```
Setup:
✓ Choose PostgreSQL (Supabase or Neon)
✓ Set up Prisma ORM
✓ DATABASE_URL in .env (never commit it!)
✓ Define schema — id, createdAt, updatedAt in every table

Development:
✓ Use prisma migrate dev
✓ View data with prisma studio
✓ Add indexes on WHERE clause fields

Security:
✓ Service role key server-side only
✓ Enable RLS (Supabase)
✓ Validate user input
✓ Use prepared statements or ORM (avoid SQL injection)

Production:
✓ Connection pooling (Supavisor in Supabase, or Prisma Accelerate)
✓ Regular backups
✓ Use prisma migrate deploy
✓ Monitoring (track slow queries)
```

---

*Next: Read `12_AI_TOOLS_GUIDE.md` — how to use AI tools in 2026*
