# Database Complete Guide
*PostgreSQL, Prisma, Supabase, Redis — 2026*

---

## DATABASE KYA HAI?

Database = Organized data storage — permanent, structured, queryable.

```
Bina database ke:
  Data sirf memory mein → Server restart? Sab gaya!
  Data file mein → Concurrency issues, slow, unsafe

Database ke saath:
  Data permanent storage mein
  Multiple users simultaneously access kar sakte hain
  Query karo, filter karo, sort karo — efficiently
  Relationships define karo
  Backup, recovery — built in
```

### 2026 Verdict: PostgreSQL Won

```
PostgreSQL = Web apps ke liye #1 database

Why:
✓ Free, open source
✓ ACID compliant (safe transactions)
✓ JSON support (flexible data)
✓ Full text search
✓ Extensions: PostGIS, pgvector (AI!)
✓ Scales well
✓ Supabase, Neon, Railway sab PostgreSQL pe chalte hain
```

---

## PART 1 — DATABASE TYPES

### SQL vs NoSQL

```
SQL (Relational):
  PostgreSQL, MySQL, SQLite
  Data: Tables + Rows + Columns
  Relations: JOIN karo tables
  When: Structured data, transactions, relationships

NoSQL (Non-relational):
  MongoDB, Firebase Firestore
  Data: Documents (JSON)
  When: Flexible schema, rapid prototyping, nested data

Cache:
  Redis
  Data: Key-Value (RAM mein)
  When: Speed chahiye, temporary data, sessions, queues
```

### Tumhare Liye Kya?

```
Next.js/SaaS app    → PostgreSQL (Supabase ya Neon)
Real-time app       → Supabase (built-in realtime)
Need fast cache     → Redis (sessions, rate limiting)
Simple script       → SQLite (ek file, no server)
Prototype/hackathon → Firebase (quickest setup)
```

---

## PART 2 — POSTGRESQL BASICS

### SQL Language — Zaruri Commands

```sql
-- TABLE BANAO
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  email     VARCHAR(255) UNIQUE NOT NULL,
  name      VARCHAR(100),
  role      VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DATA INSERT KARO
INSERT INTO users (email, name) VALUES ('test@example.com', 'Ahmed');

-- DATA FETCH KARO
SELECT * FROM users;
SELECT id, name FROM users WHERE role = 'admin';
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- DATA UPDATE KARO
UPDATE users SET name = 'Ali' WHERE id = 1;

-- DATA DELETE KARO
DELETE FROM users WHERE id = 1;

-- RELATION: Products jo user ka hai
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
DECIMAL(10,2)          -- Exact numbers (prices!)
TIMESTAMPTZ            -- Date + time + timezone
UUID                   -- Unique ID (better than serial)
JSONB                  -- JSON data (searchable)
```

### UUID vs Serial ID

```sql
-- Serial (simple, predictable)
id SERIAL PRIMARY KEY
-- Problem: 1, 2, 3... users count leak hoti hai

-- UUID (better for security)
id UUID DEFAULT gen_random_uuid() PRIMARY KEY
-- Output: 550e8400-e29b-41d4-a716-446655440000
-- Cannot guess/enumerate
```

---

## PART 3 — PRISMA ORM (Recommended)

ORM = Object Relational Mapper — SQL ki jagah code se database use karo.

### Setup

```bash
# Install karo
npm install prisma @prisma/client

# Initialize karo
npx prisma init

# Yeh files banta hai:
# prisma/schema.prisma  ← Database schema
# .env                  ← DATABASE_URL
```

### Schema Define Karo

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

  @@map("users")  // Database table naam
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
# Development mein migration banao
npx prisma migrate dev --name add_users_table

# Production pe migrate karo
npx prisma migrate deploy

# Schema dekho (GUI)
npx prisma studio

# Client regenerate karo (schema change ke baad)
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

// Relations ke saath
const userWithPosts = await prisma.user.findUnique({
  where: { id: '123' },
  include: { posts: true }
})

// Sirf kuch fields
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
// lib/db.ts — Ek instance, global reuse
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## PART 4 — SUPABASE (PostgreSQL + Everything)

Supabase = Firebase alternative — PostgreSQL + Auth + Storage + Realtime + Edge Functions sab ek jagah.

### Setup (Next.js ke saath)

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

// Relations ke saath
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
  .select()  // Inserted row wapas lo

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

### Row Level Security (RLS) — Security Zaruri

```sql
-- Users sirf apna data dekh sakein
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

Redis = In-memory data store — blazing fast, temporary data ke liye.

### Kab Use Karo?

```
✓ Session storage
✓ Rate limiting (10 req/minute per user)
✓ Cache (database results temporarily store karo)
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

// TTL (expire) ke saath
await redis.set('session:abc', 'userId123', { ex: 3600 }) // 1 hour

// ─── CACHE PATTERN ────────────────────────────────
async function getCachedUser(userId: string) {
  const cacheKey = `user:${userId}`
  
  // Cache mein hai?
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached as string)
  
  // Database se lo
  const user = await db.user.findUnique({ where: { id: userId } })
  
  // Cache mein daal do (5 min)
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

-- ID type: cuid() ya uuid() (Prisma)
id String @id @default(cuid())
```

### Always Include These Columns

```prisma
model AnyModel {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // ... baaki columns
}
```

### Soft Delete (Data kabhi delete mat karo)

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  deletedAt DateTime? // null = active, date = deleted

  @@index([deletedAt]) // Performance ke liye
}
```

```typescript
// Soft delete
await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() }
})

// Active users sirf
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

  // Compound index (frequently together query hote hain)
  @@index([authorId, published])

  // Unique constraint
  @@unique([authorId, slug])
}
```

**Rule:** Jo fields WHERE clause mein frequently aate hain, unpe index lagao.

---

## PART 7 — DATABASE COMPARISON (2026)

### Hosted Postgres Options

| Service | Free Tier | Price | Best For |
|---------|----------|-------|----------|
| **Supabase** | 500MB, 2 projects | $25/mo pro | Full stack, auth included |
| **Neon** | 0.5 GB, auto-suspend | $19/mo | Serverless, Next.js |
| **Railway** | $5 credit | $5-20/mo | Docker + DB saath |
| **PlanetScale** | Removed free tier | $39/mo | MySQL, large scale |
| **Render** | 90 days free | $7/mo | Simple setup |

### Recommendation

```
Shuru karte ho (free)?  → Supabase free tier
Vercel pe deploy?        → Neon (seamless integration)
Railway pe sab kuch?     → Railway Postgres
Production serious?      → Supabase Pro ya Neon paid
```

---

## PART 8 — MIGRATIONS (Production)

```bash
# Development:
npx prisma migrate dev --name describe_change

# Staging/Production:
npx prisma migrate deploy

# Never "reset" production!
# npx prisma migrate reset  # ← KABHI NAHI production pe
```

### Migration Safety Rules

```
✓ Additive changes safe hain (column add karo)
✓ NOT NULL column? Pehle nullable banao, data fill karo, phir NOT NULL karo
✓ Column rename? Pehle naya banao, data copy karo, purana drop karo
✓ Backup pehle production pe migrate karo
✓ Staging pe test karo production se pehle
```

---

## DATABASE CHECKLIST

```
Setup:
✓ PostgreSQL choose karo (Supabase ya Neon)
✓ Prisma ORM setup karo
✓ .env mein DATABASE_URL (kabhi commit mat karo)
✓ Schema define karo — id, createdAt, updatedAt har table mein

Development:
✓ prisma migrate dev use karo
✓ prisma studio se data dekho
✓ Indexes lagao WHERE clauses pe

Security:
✓ Service role key sirf server pe
✓ RLS enable karo (Supabase)
✓ User input validate karo
✓ Prepared statements ya ORM (SQL injection se bacho)

Production:
✓ Connection pooling (Supavisor Supabase mein, ya Prisma Accelerate)
✓ Regular backups
✓ prisma migrate deploy use karo
✓ Monitoring (slow queries track karo)
```

---

*Next: `12_AI_TOOLS_GUIDE.md` padho — 2026 mein AI tools kaise use karein*
