# Frontend Guide
*HTML, CSS, JavaScript, React — Best Practices*

---

## PART 1 — HTML BEST PRACTICES

### Semantic HTML (BAHUT IMPORTANT)
```html
<!-- BAD — div soup, Google aur screen readers kuch nahi samjhte -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="main-content">
  <div class="title">Welcome</div>
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

**Kyun zaroori hai:**
- Google SEO mein semantic HTML ko zyada value deta hai
- Screen readers (visually impaired users ke liye) sahi kaam karte hain
- Code readable rehta hai

### Correct Tags Ka Use
| Tag | Kab Use Karo |
|-----|-------------|
| `<header>` | Page/section ka top area |
| `<nav>` | Navigation links |
| `<main>` | Page ka main content (sirf ek baar) |
| `<section>` | Related content ka group |
| `<article>` | Independent content (blog post, news) |
| `<aside>` | Side content (sidebar, related links) |
| `<footer>` | Page/section ka bottom |
| `<h1>-<h6>` | Headings — order follow karo |
| `<button>` | Clickable actions ke liye (anchor nahi) |
| `<a>` | Navigation/links ke liye |

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
- `label` hamesha honi chahiye — accessibility ke liye
- `type="email"` — mobile pe email keyboard aata hai
- `autocomplete` — browser autofill karta hai — UX improve hoti hai

---

## PART 2 — CSS BEST PRACTICES

### Box Model Samjho
```
┌─────────────────────────────┐
│         MARGIN              │  ← Element ke bahar space
│  ┌───────────────────────┐  │
│  │       BORDER          │  │  ← Border line
│  │  ┌─────────────────┐  │  │
│  │  │    PADDING      │  │  │  ← Content ke andar space
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  ← Actual text/image
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
/* Hamesha yeh lagao — default box model confusing hai */
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Flexbox vs Grid
```css
/* FLEXBOX — ek direction mein (row ya column) */
.navbar {
  display: flex;
  align-items: center;      /* vertical center */
  justify-content: space-between;  /* horizontal spread */
}

/* GRID — do directions mein (rows + columns) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  gap: 24px;
}

/* RULE: Nav, single row items = Flexbox
         Cards, page layout = Grid */
```

### Responsive Design — Mobile First
```css
/* Pehle mobile likho */
.container {
  padding: 16px;
  font-size: 16px;
}

/* Phir tablet add karo */
@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}

/* Phir desktop */
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
**Kyun:** Ek jagah change karo — poori site mein change ho jata hai.

### Tailwind CSS (Tumhare project mein)
```tsx
// Tailwind = inline CSS classes — no separate CSS file
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
  Click me
</button>
```
Tailwind classes cheat sheet: https://tailwindcss.com/docs

---

## PART 3 — JAVASCRIPT BEST PRACTICES

### Var vs Let vs Const
```js
var x = 1;    // ❌ Never use — scope issues, hoisting problems
let y = 2;    // ✓ Use when value change hogi
const z = 3;  // ✓ DEFAULT — use karo jab tak value change na ho

// Rule: const use karo by default, zaroorat pe let
```

### Arrow Functions
```js
// Old way
function add(a, b) { return a + b; }

// Modern way (prefer this)
const add = (a, b) => a + b;

// Async/Await — callbacks se better
const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};
```

### Destructuring
```js
// Object destructuring
const { name, email, age } = user;
// Same as: const name = user.name; const email = user.email;

// Array destructuring
const [first, second, ...rest] = items;

// Function params
function UserCard({ name, email, role = "user" }) { ... }
```

### Optional Chaining (?.)
```js
// Without — crash ho jata hai agar user null ho
const city = user.address.city;  // ERROR agar address undefined

// With optional chaining — safe hai
const city = user?.address?.city;  // undefined return karta hai, crash nahi
```

### Nullish Coalescing (??)
```js
const name = user.name ?? "Anonymous";
// Agar user.name null ya undefined ho toh "Anonymous" use karo
// Note: ?? sirf null/undefined check karta hai, || empty string bhi replace karta hai
```

### Array Methods (Most Used)
```js
const products = [
  { name: "VisionDx", price: 0, active: true },
  { name: "FlowDesk", price: 950, active: true },
  { name: "VaultOS", price: 500, active: false },
];

// Filter — condition ke base pe filter karo
const activeProducts = products.filter(p => p.active);

// Map — har item transform karo
const names = products.map(p => p.name);

// Find — pehla match dhundo
const flowdesk = products.find(p => p.name === "FlowDesk");

// Reduce — ek value mein reduce karo
const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

// Sort
const byPrice = [...products].sort((a, b) => a.price - b.price);
```

### Async/Await vs Promises
```js
// Promises (older way — harder to read)
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await (modern way — reads like synchronous code)
try {
  const res = await fetch('/api/users');
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.error(err);
}
```

---

## PART 4 — REACT BEST PRACTICES

### Component Rules
```tsx
// GOOD component — ek kaam karta hai, props clear hain
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={variant === "primary" ? "bg-blue-500" : "bg-gray-500"}
    >
      {label}
    </button>
  );
}
```

### Hooks Rules
```tsx
// useState — simple local state
const [isOpen, setIsOpen] = useState(false);

// useEffect — side effects (API calls, subscriptions, timers)
useEffect(() => {
  fetchUserData();
}, [userId]); // userId change hone pe dobara run karo

// useRef — DOM reference ya value jo re-render na kare
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// useMemo — expensive calculation cache karo
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]); // sirf items change hone pe recalculate karo

// useCallback — function reference stable rakho
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Common React Mistakes
```tsx
// ❌ BAD — array index as key
items.map((item, index) => <div key={index}>{item.name}</div>)

// ✓ GOOD — unique ID as key
items.map((item) => <div key={item.id}>{item.name}</div>)

// ❌ BAD — state seedha mutate karo
const addItem = () => {
  items.push(newItem); // WRONG
  setItems(items);
};

// ✓ GOOD — new array banao
const addItem = () => {
  setItems([...items, newItem]); // CORRECT
};

// ❌ BAD — useEffect mein async directly
useEffect(async () => { ... }, []); // WRONG

// ✓ GOOD — async function andar banao
useEffect(() => {
  const fetchData = async () => { ... };
  fetchData();
}, []);
```

### Performance Tips
```tsx
// 1. React.memo — unnecessary re-renders rokta hai
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// 2. Lazy loading — code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// 3. Image optimization (Next.js)
import Image from "next/image";
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // Above fold images pe
/>
```

---

## PART 5 — TYPESCRIPT (Why Use It)

### Kya Hai?
JavaScript + types = TypeScript.
Errors runtime pe nahi, development time pe pakad lo.

```tsx
// JavaScript — error runtime pe aata hai
function greet(user) {
  return user.name.toUpperCase(); // crash agar user null ho
}

// TypeScript — error development mein hi dikhta hai
function greet(user: { name: string } | null): string {
  if (!user) return "Guest";
  return user.name.toUpperCase(); // Safe hai
}
```

### Basic Types
```tsx
// Primitives
const name: string = "Humaiza";
const age: number = 25;
const isActive: boolean = true;

// Arrays
const products: string[] = ["VisionDx", "FlowDesk"];
const prices: number[] = [0, 950, 500];

// Objects (Interface)
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "doctor"; // union type
  createdAt?: Date; // optional (? matlab zarori nahi)
}

// Function
const fetchUser = async (id: number): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};
```

### Zyada Important Types
```tsx
// Union — yeh ya woh
type Status = "loading" | "success" | "error";
type ID = string | number;

// Generic — reusable types
type ApiResponse<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};

const userResponse: ApiResponse<User> = { ... };
const productResponse: ApiResponse<Product[]> = { ... };
```

---

## PART 6 — DESIGN SYSTEM

### Spacing System (8px base)
```
4px  — xs  (tiny gaps)
8px  — sm  (small)
16px — md  (medium — most used)
24px — lg  (large)
32px — xl  (section padding)
48px — 2xl (big sections)
64px — 3xl (hero sections)
```
Hamesha 4/8 ke multiples use karo — design consistent lagta hai.

### Typography Scale
```
12px — xs  (captions, labels)
14px — sm  (secondary text)
16px — md  (body text — DEFAULT)
18px — lg  (lead text)
24px — xl  (small headings)
30px — 2xl (section headings)
48px — 4xl (page headings)
64px — 6xl (hero headings)
```

### Color Rules
- **Primary** — brand color — CTAs, links, highlights
- **Background** — page background
- **Surface/Card** — card backgrounds (slightly lighter/darker than bg)
- **Text** — body text (never pure white on dark, never pure black on light)
- **Muted** — secondary text, placeholders
- **Border** — dividers, input borders
- **Danger** — errors (red)
- **Success** — success states (green)
- **Warning** — warnings (yellow)

### Contrast Ratio (Accessibility)
- Normal text: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1
- Test karo: https://webaim.org/resources/contrastchecker/

---

## PART 7 — FORMS

### React Hook Form (Best Library)
```tsx
import { useForm } from "react-hook-form";

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
        })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <button type="submit">Send</button>
    </form>
  );
}
```

### Form UX Rules
- Real-time validation dikhao (type karte waqt, submit pe nahi)
- Error messages specific hon: "Enter valid email" not "Invalid input"
- Success state clearly dikhao
- Loading state lagao submit pe
- Disabled karo button while submitting

---

## SUMMARY

```
HTML    → Semantic tags use karo
CSS     → Mobile first, CSS variables, Flexbox/Grid
JS      → Const by default, async/await, array methods
React   → Small components, unique keys, no direct mutation
TS      → Types likhne mein time lagta hai, bugs pakadne mein save hota hai
Design  → 8px grid, consistent colors, contrast ratio check karo
Forms   → React Hook Form, real-time validation, loading states
```

*Next: `03_BACKEND_GUIDE.md`*
