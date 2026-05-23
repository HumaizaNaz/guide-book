# TypeScript Guide

*Type safety with JavaScript — catch bugs before production*

---

## Why TypeScript?

JavaScript is dynamically typed — a variable's type is only known at runtime:

```javascript
// JavaScript — no error until it runs
function getUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json())
}

getUser("abc")  // Works
getUser(null)   // Works — but crashes in API
getUser()       // Works — but sends undefined
```

TypeScript catches these errors **at compile time**:

```typescript
async function getUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

getUser("abc")  // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
getUser(null)   // ❌ Error: Argument of type 'null' is not assignable to parameter of type 'number'
getUser()       // ❌ Error: Expected 1 arguments, but got 0
```

**Key benefits:**
- **Autocomplete** — IDE knows what properties exist on every object
- **Refactoring safety** — rename a function and TypeScript finds every call site
- **Self-documenting** — types replace half your comments
- **Catch ~40% of bugs** before they reach production

---

## Setup in Next.js

Next.js **already includes TypeScript** — just use `.ts` and `.tsx` files. No install needed.

Check `tsconfig.json` — make sure `strict: true` is set:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "module": "esnext",
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`strict: true` enables 6 checks at once — the most important is `strictNullChecks` which prevents null/undefined crashes.

What `strict: true` catches:

```typescript
// Without strict: no error
// With strict:
const user = getUser()    // user might be undefined
user.name                 // ❌ Error: Object is possibly 'undefined'

// Fix:
if (user) {
  user.name               // ✅ TypeScript knows user exists here
}
```

---

## Core Types

### Primitives

TypeScript usually **infers** types — you rarely need to write them explicitly:

```typescript
const name = "Alice"      // inferred: string
const age = 30            // inferred: number
const active = true       // inferred: boolean

// Explicit annotations (only needed when TypeScript can't infer):
let status: string        // no initial value, must annotate
let count: number = 0
```

Special types:

```typescript
const nothing: null = null
const missing: undefined = undefined
const anything: unknown = someExternalData   // safer than any
const neverUsed: never = (() => { throw new Error() })()
```

### Arrays

```typescript
const names: string[] = ["Alice", "Bob", "Charlie"]
const scores: number[] = [95, 87, 92]
const flags: boolean[] = [true, false, true]

// Generic syntax — same thing, different style:
const names: Array<string> = ["Alice", "Bob"]
```

### Objects

```typescript
// Inline object type (gets messy — use interface instead):
const user: { id: number; name: string; email: string } = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
}
```

### Union Types

A value that can be one of several types:

```typescript
type Status = "pending" | "active" | "cancelled"
type ID = string | number

let currentStatus: Status = "active"
currentStatus = "deleted"   // ❌ Error: Type '"deleted"' is not assignable to type 'Status'
currentStatus = "cancelled" // ✅

// TypeScript narrows unions in conditions:
function formatId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase()   // TypeScript knows: id is string here
  }
  return id.toFixed(0)        // TypeScript knows: id is number here
}
```

### Optional Properties

Add `?` to mark a property as may-or-may-not exist:

```typescript
interface User {
  id: number
  name: string
  bio?: string         // optional — can be string or undefined
  avatar?: string
}

const user: User = { id: 1, name: "Alice" }            // ✅ bio not required
const user2: User = { id: 2, name: "Bob", bio: "Dev" } // ✅ bio present
```

---

## Interfaces vs Type Aliases

Both define object shapes. General rule: **`interface` for objects, `type` for everything else.**

```typescript
// Interface — for objects, classes, extendable shapes
interface User {
  id: number
  name: string
  email: string
}

// Extending an interface:
interface AdminUser extends User {
  role: "admin"
  permissions: string[]
}

// Type alias — for unions, intersections, primitives, computed types
type Status = "pending" | "active" | "cancelled"
type StringOrNumber = string | number

// Intersection type (combine two types):
type AdminUser = User & { role: "admin"; permissions: string[] }
```

When to use each:

| Use `interface` | Use `type` |
|-----------------|------------|
| Object shapes | Union types |
| Class implementations | Intersection types |
| Public API shapes (can be extended) | Tuple types |
| React component props | Utility type transformations |

---

## Generics

Generics let you write code that works with any type while staying type-safe:

```typescript
// ❌ Without generics — only works with strings
function first(arr: string[]): string {
  return arr[0]
}

// ✅ With generics — works with any array
function first<T>(arr: T[]): T {
  return arr[0]
}

const num = first([1, 2, 3])          // TypeScript infers: T = number → returns number
const str = first(["a", "b", "c"])    // TypeScript infers: T = string → returns string
```

### Generic Interfaces

```typescript
interface ApiResponse<T> {
  data: T
  error: string | null
  timestamp: number
}

// Specific instantiations:
type UserResponse = ApiResponse<User>
type PostsResponse = ApiResponse<Post[]>
type PaginatedUsers = ApiResponse<{ items: User[]; total: number; page: number }>
```

### Generic React Components

```typescript
interface SelectProps<T> {
  options: T[]
  value: T
  onChange: (value: T) => void
  getLabel: (option: T) => string
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select
      value={options.indexOf(value)}
      onChange={e => onChange(options[parseInt(e.target.value)])}
    >
      {options.map((opt, i) => (
        <option key={i} value={i}>{getLabel(opt)}</option>
      ))}
    </select>
  )
}

// Usage — TypeScript infers T = User
<Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(user) => user.name}
/>
```

---

## Utility Types

TypeScript has built-in types to transform existing types. Use them instead of defining new types from scratch.

### `Partial<T>` — all properties optional

```typescript
interface User {
  id: number
  name: string
  email: string
  role: "admin" | "user"
}

type UserUpdate = Partial<User>
// Result: { id?: number; name?: string; email?: string; role?: "admin" | "user" }

// Perfect for update/patch endpoints:
async function updateUser(id: number, changes: Partial<User>) {
  return db.user.update({ where: { id }, data: changes })
}

updateUser(1, { name: "Bob" })              // ✅ only name
updateUser(1, { name: "Bob", role: "admin" }) // ✅ multiple fields
```

### `Required<T>` — all properties required

```typescript
interface Config {
  debug?: boolean
  timeout?: number
  retries?: number
}

type ResolvedConfig = Required<Config>
// Result: { debug: boolean; timeout: number; retries: number }
// Use after providing defaults — guarantees all fields present
```

### `Pick<T, K>` — select specific properties

```typescript
type UserPreview = Pick<User, "id" | "name">
// Result: { id: number; name: string }

// Perfect for UI components that only need a subset:
function UserAvatar({ user }: { user: Pick<User, "id" | "name"> }) {
  return <div>{user.name[0]}</div>
}
```

### `Omit<T, K>` — exclude specific properties

```typescript
type CreateUser = Omit<User, "id">
// Result: { name: string; email: string; role: "admin" | "user" }
// Use for create forms — ID is auto-generated, not supplied by user

type PublicUser = Omit<User, "email" | "role">
// Exclude sensitive fields from public API responses
```

### `Record<K, V>` — typed dictionary

```typescript
// Map from string to User:
const userCache: Record<string, User> = {}
userCache["alice"] = { id: 1, name: "Alice", email: "a@a.com", role: "user" }

// Map from Status enum to display label:
const statusLabels: Record<Status, string> = {
  pending: "Pending Review",
  active: "Active",
  cancelled: "Cancelled",
}
```

### `NonNullable<T>` — remove null and undefined

```typescript
type MaybeString = string | null | undefined
type SafeString = NonNullable<MaybeString>  // string

// Useful with array filter:
const ids = [1, null, 2, undefined, 3]
const validIds: number[] = ids.filter((id): id is number => id != null)
```

---

## Typing API Responses

Create a typed fetch wrapper so all API calls are type-safe:

```typescript
// lib/api.ts
interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options)

    if (!res.ok) {
      const errorText = await res.text()
      return { data: null, error: `HTTP ${res.status}: ${errorText}` }
    }

    const data: T = await res.json()
    return { data, error: null }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    }
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

// In a Server Component or Server Action:
const { data: posts, error } = await fetchApi<Post[]>("/api/posts")

if (error) {
  return <div>Error: {error}</div>
}

// TypeScript knows posts is Post[] here — full autocomplete
posts.map(post => (
  <article key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </article>
))
```

---

## Typing React Component Props

### Basic Props

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
  loading?: boolean
}

export function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant}`}
    >
      {loading ? "Loading..." : label}
    </button>
  )
}
```

### Children

```typescript
interface CardProps {
  title: string
  children: React.ReactNode     // any valid JSX: string, element, array, null
  className?: string
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={`card ${className ?? ""}`}>
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  )
}
```

### Extending HTML Element Props

```typescript
// Accept all native button attributes plus your custom ones:
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  loading?: boolean
}

export function Button({ variant = "primary", loading, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn-${variant} ${loading ? "opacity-50" : ""}`}
      disabled={loading || rest.disabled}
      {...rest}  // spreads onClick, type, aria-label, etc.
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

// Caller can pass any button attribute:
<Button variant="primary" onClick={handleClick} aria-label="Submit form">
  Submit
</Button>
```

### Event Handlers

```typescript
// Form event:
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.currentTarget
  const data = new FormData(form)
}

// Input change event:
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value)
}

// Click event (on a div, not a button):
function handleClick(e: React.MouseEvent<HTMLDivElement>) {
  console.log(e.clientX, e.clientY)
}
```

---

## Typing Next.js (App Router)

### Page with Dynamic Route Params

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page } = await searchParams

  const post = await getPost(slug)
  if (!post) notFound()

  return <article>{post.title}</article>
}

// generateMetadata uses same props type:
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post?.title }
}
```

### Route Handlers

```typescript
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id: parseInt(id) } })

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: Partial<Post> = await request.json()
  const updated = await db.post.update({ where: { id: parseInt(id) }, data: body })
  return NextResponse.json(updated)
}
```

### Server Actions with Zod

```typescript
"use server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const CreatePostSchema = z.object({
  title: z.string().min(1, "Title required").max(100),
  body: z.string().min(10, "Too short"),
  tags: z.array(z.string()).optional(),
})

// Return type is explicit — client knows what to expect
type ActionResult =
  | { success: true; postId: number }
  | { success: false; errors: z.ZodFormattedError<typeof CreatePostSchema._type> }

export async function createPost(formData: FormData): Promise<ActionResult> {
  const result = CreatePostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData.getAll("tags"),
  })

  if (!result.success) {
    return { success: false, errors: result.error.format() }
  }

  const post = await db.post.create({ data: result.data })
  revalidatePath("/posts")
  return { success: true, postId: post.id }
}
```

---

## Common Mistakes

### 1. Abusing `any`

`any` turns off type checking entirely — defeats the purpose:

```typescript
// ❌ Bad — any infects everything it touches
function process(data: any) {
  data.foo.bar.baz.qux   // No error. Will crash at runtime.
  return data.result * 2  // No error. May return NaN.
}

// ✅ Good — use unknown for external/untyped data
function process(data: unknown) {
  if (typeof data !== "object" || data === null) throw new Error("Invalid data")
  if (!("result" in data) || typeof (data as any).result !== "number") {
    throw new Error("Missing result")
  }
  return (data as { result: number }).result * 2
}

// ✅ Even better — use zod to validate at boundaries
const DataSchema = z.object({ result: z.number() })
function process(data: unknown) {
  const { result } = DataSchema.parse(data)  // throws if invalid
  return result * 2
}
```

### 2. Type Assertion Abuse

`as Type` tells TypeScript "trust me" — but it can lie:

```typescript
// ❌ Lying to TypeScript
const user = response as User   // What if response is { error: "Not found" }?
user.email.toLowerCase()        // Will crash if response was an error object

// ✅ Validate the shape at runtime
const user = UserSchema.parse(response)   // Zod throws if shape doesn't match
```

Non-null assertion (`!`) is another common lie:

```typescript
// ❌ Bad — can crash if element doesn't exist
const el = document.getElementById("app")!
el.addEventListener("click", handler)

// ✅ Check first
const el = document.getElementById("app")
if (!el) throw new Error("#app element not found")
el.addEventListener("click", handler)
```

### 3. Not Handling null/undefined

```typescript
// ❌ Will crash if user is null (e.g., not logged in)
function showName(user: User | null) {
  return user.name   // Error: Object is possibly 'null'
}

// ✅ Optional chaining + nullish coalescing
function showName(user: User | null) {
  return user?.name ?? "Guest"
}

// ✅ Early return
function showName(user: User | null) {
  if (!user) return "Guest"
  return user.name   // TypeScript knows user is User here
}
```

### 4. Overly Wide Return Types

```typescript
// ❌ Return type too wide — callers don't know what fields exist
async function getUser(): Promise<object> {
  return db.user.findFirst()
}

// ✅ Specific return type — full autocomplete for callers
async function getUser(): Promise<User | null> {
  return db.user.findFirst()
}
```

---

## Migrating a JS Project to TypeScript

You don't need to migrate everything at once. TypeScript and JavaScript coexist.

**Step 1: Rename one file at a time**

```bash
# Rename .js → .ts or .jsx → .tsx
mv src/components/Button.jsx src/components/Button.tsx
```

**Step 2: Fix errors in that file** — don't add `as any` to silence them. Fix the actual types.

**Step 3: Add types to function signatures first**

```typescript
// Start here — explicit parameter and return types
function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale)
}
```

**Step 4: Create interfaces for your data shapes**

```typescript
// Create types/index.ts or colocate with your API files
interface User { id: number; name: string; email: string }
interface Post { id: number; title: string; body: string; userId: number }
```

**Step 5: Enable strict mode**

Once existing files are converted, add `"strict": true` to tsconfig.json. Fix the new errors that appear — mostly null checks.

**Step 6: Use `@types/*` packages for untyped libraries**

```bash
npm install -D @types/lodash @types/node
```

---

## Quick Reference

```typescript
// ---- Types ----
const x: string = "hello"
const y: number = 42
const z: boolean = true
const arr: string[] = ["a", "b"]
const tuple: [string, number] = ["age", 30]
const maybe: string | null = null
const opt: { name?: string } = {}

// ---- Interface ----
interface User { id: number; name: string; email?: string }
interface Admin extends User { role: "admin" }

// ---- Type alias ----
type Status = "active" | "inactive" | "pending"
type ID = string | number

// ---- Generics ----
function wrap<T>(val: T): T[] { return [val] }
interface Box<T> { value: T; label: string }

// ---- Utility types ----
type P = Partial<User>         // all optional
type R = Required<User>        // all required
type N = Pick<User, "id">      // just id
type X = Omit<User, "id">      // everything except id
type M = Record<string, User>  // string key → User
type S = NonNullable<string | null>  // string

// ---- Type narrowing ----
if (typeof val === "string") { /* string */ }
if (val instanceof Date) { /* Date */ }
if ("name" in obj) { /* has name */ }
if (val !== null && val !== undefined) { /* not null/undefined */ }

// ---- Non-null assert (use sparingly) ----
const el = document.getElementById("root")!

// ---- Type cast (use sparingly) ----
const n = someValue as number
```
