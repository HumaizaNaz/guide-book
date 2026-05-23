# Frontend Guide
*HTML, CSS, JavaScript, React — Best Practices*

---

## PART 1 — HTML BEST PRACTICES

### Semantic HTML (VERY IMPORTANT)
```html
<!-- BAD — div soup, Google and screen readers understand nothing -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- GOOD — meaningful tags -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <h1>Welcome</h1>
</main>
```

**Why it matters:**
- Google gives more SEO value to semantic HTML
- Screen readers work correctly for visually impaired users
- Code stays readable

### Correct Tag Usage
| Tag | When to Use |
|-----|-------------|
| `<header>` | Top area of page/section |
| `<nav>` | Navigation links |
| `<main>` | Main page content (only once) |
| `<section>` | Group of related content |
| `<article>` | Independent content (blog post, news) |
| `<aside>` | Side content (sidebar, related links) |
| `<footer>` | Bottom of page/section |
| `<h1>-<h6>` | Headings — follow the order |
| `<button>` | For clickable actions (not anchor) |
| `<a>` | For navigation/links |

### Form Best Practices
```html
<!-- BAD -->
<input type="text" placeholder="Email">

<!-- GOOD -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  name="email"
  placeholder="you@example.com"
  required
  autocomplete="email"
>
```
- `label` is always required — for accessibility
- `type="email"` — brings up email keyboard on mobile
- `autocomplete` — browser autofills — improves UX

---

## PART 2 — CSS BEST PRACTICES

### Understand the Box Model
```
┌─────────────────────────────┐
│         MARGIN              │  ← Space outside element
│  ┌───────────────────────┐  │
│  │       BORDER          │  │  ← Border line
│  │  ┌─────────────────┐  │  │
│  │  │    PADDING      │  │  │  ← Space inside content
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  ← Actual text/image
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
/* Always add this — the default box model is confusing */
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Flexbox vs Grid
```css
/* FLEXBOX — one direction (row or column) */
.navbar {
  display: flex;
  align-items: center;          /* vertical center */
  justify-content: space-between; /* horizontal spread */
}

/* GRID — two directions (rows + columns) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 24px;
}

/* RULE: Nav, single row items = Flexbox
         Cards, page layout = Grid */
```

### Responsive Design — Mobile First
```css
/* Write mobile first */
.container {
  padding: 16px;
  font-size: 16px;
}

/* Then add tablet */
@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}

/* Then desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px;
  }
}
```

### CSS Variables (Design Tokens)
```css
:root {
  --color-primary: #0099CC;
  --color-background: #080C14;
  --color-text: #FFFFFF;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --font-size-base: 16px;
  --border-radius: 8px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
}
```
**Why:** Change in one place — updates everywhere on the site.

### Tailwind CSS
```tsx
// Tailwind = inline CSS classes — no separate CSS file
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
  Click me
</button>
```

---

## PART 3 — JAVASCRIPT BEST PRACTICES

### Var vs Let vs Const
```js
var x = 1;    // ❌ Never use — scope issues, hoisting problems
let y = 2;    // ✓ Use when value will change
const z = 3;  // ✓ DEFAULT — use unless value needs to change

// Rule: use const by default, let when necessary
```

### Arrow Functions & Async/Await
```js
// Old way
function add(a, b) { return a + b; }

// Modern way (prefer this)
const add = (a, b) => a + b;

// Async/Await — better than callbacks
const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};
```

### Destructuring & Spread
```js
// Object destructuring
const { name, email, role = 'user' } = user;

// Array destructuring
const [first, second, ...rest] = items;

// Spread operator
const newUser = { ...existingUser, role: 'admin' };
const allItems = [...list1, ...list2];
```

### Optional Chaining & Nullish Coalescing
```js
// Without optional chaining (old way — crashes if user is null)
const city = user && user.address && user.address.city;

// With optional chaining (safe)
const city = user?.address?.city;

// Nullish coalescing — default value if null/undefined
const name = user?.name ?? 'Anonymous';
```

### Array Methods (Use these, avoid loops)
```js
const users = [
  { name: 'Ali', age: 25, active: true },
  { name: 'Sara', age: 30, active: false },
  { name: 'Ahmed', age: 22, active: true },
];

// Filter — get subset
const activeUsers = users.filter(u => u.active);

// Map — transform each item
const names = users.map(u => u.name);

// Find — get first match
const ali = users.find(u => u.name === 'Ali');

// Reduce — calculate total
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

// Sort — order items
const sorted = users.sort((a, b) => a.age - b.age);
```

---

## PART 4 — REACT BEST PRACTICES

### Component Structure
```tsx
// Good component structure
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}`}
    >
      {label}
    </button>
  );
}
```

### Hooks Rules
```tsx
// ✓ CORRECT — hooks at top level
function MyComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // ❌ WRONG — never in conditions or loops
  // if (someCondition) {
  //   const [value] = useState('');
  // }
}
```

### useEffect Properly
```tsx
// ✓ Fetch data on mount
useEffect(() => {
  async function loadData() {
    const res = await fetch('/api/data');
    const data = await res.json();
    setData(data);
  }
  loadData();
}, []); // Empty array = run once on mount

// ✓ Cleanup subscriptions
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe(); // Cleanup!
}, [userId]);
```

### Custom Hooks — Extract Logic
```tsx
// Instead of repeating fetch logic in every component
function useUser(id: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(r => r.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading };
}

// Usage
function Profile({ id }) {
  const { user, loading } = useUser(id);
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

---

## PART 5 — NEXT.JS SPECIFIC

### File-Based Routing
```
app/
  page.tsx           → /
  about/page.tsx     → /about
  blog/
    page.tsx         → /blog
    [slug]/page.tsx  → /blog/any-post
  (auth)/
    login/page.tsx   → /login (grouped, no URL impact)
```

### Server vs Client Components
```tsx
// SERVER component (default) — runs on server
// Can fetch data directly, no useState/useEffect
async function ProductList() {
  const products = await db.product.findMany(); // direct DB access!
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// CLIENT component — needs 'use client'
// Can use useState, useEffect, event handlers
'use client'
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Image Optimization
```tsx
import Image from 'next/image';

// Always use Next.js Image — auto optimization
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // Add for above-the-fold images
/>
```

### Metadata & SEO
```tsx
// app/layout.tsx or any page
export const metadata = {
  title: 'My App',
  description: 'Description here',
  openGraph: {
    title: 'My App',
    description: 'Description here',
    images: ['/og-image.jpg'],
  },
};
```

---

## PART 6 — PERFORMANCE

### Image Optimization
- Always use `next/image` — auto WebP conversion, lazy loading
- Add `priority` to above-the-fold images
- Use `width` and `height` to prevent layout shift

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

// Load heavy component only when needed
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // No server-side render if it uses browser APIs
});
```

### React Performance
```tsx
// Memoize expensive calculations
const sortedUsers = useMemo(
  () => users.sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);

// Prevent unnecessary re-renders
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

*Next: Read `Backend Guide` — APIs, databases, servers in detail*
