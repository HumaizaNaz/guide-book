# Web App Fundamentals
*Everything a web app needs — from basics to advanced*

---

## WHAT IS A WEB APP?

Simple website vs Web App:
- **Website:** Displays information only (blog, portfolio)
- **Web App:** User can interact — login, save data, perform actions (Gmail, Spotify, Novaj AI)

---

## THE 3 PARTS OF A WEB APP

```
┌─────────────────────────────────────────┐
│           FRONTEND (Browser)            │  ← What the user sees
│   HTML + CSS + JavaScript / React       │
└────────────────┬────────────────────────┘
                 │  HTTP Request/Response
┌────────────────▼────────────────────────┐
│            BACKEND (Server)             │  ← Where logic lives
│   Node.js / Python / PHP                │
└────────────────┬────────────────────────┘
                 │  Query
┌────────────────▼────────────────────────┐
│           DATABASE (Storage)            │  ← Where data is saved
│   PostgreSQL / MongoDB / Redis          │
└─────────────────────────────────────────┘
```

---

## PART 1 — WHAT IS FRONTEND

### HTML — Structure
The skeleton of the page:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Page Title</title>           <!-- Shows in browser tab -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width"> <!-- For mobile -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>Navigation</header>
    <main>Main content</main>
    <footer>Footer</footer>
  </body>
</html>
```

### CSS — Design
How it looks:
```css
/* Colors, fonts, spacing, layout */
body { background: black; color: white; }
h1 { font-size: 48px; font-weight: bold; }
.button { padding: 12px 24px; border-radius: 8px; }
```

### JavaScript — Behavior
What it does:
```js
// Do something on click
button.addEventListener('click', () => {
  alert('Clicked!');
});

// Fetch data from API
const data = await fetch('/api/products');
```

### React/Next.js — The Modern Way
Today we don't write raw HTML/CSS/JS — we use React:
```tsx
// This is a "component" — a reusable UI piece
function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-500 px-4 py-2 rounded">
      {text}
    </button>
  );
}
```

**Next.js = React + automatic routing + SEO + performance**
Next.js is the best choice for modern web apps.

---

## PART 2 — WHAT IS BACKEND

### Why do we need a backend?
- Passwords are stored on the backend (dangerous to keep in frontend)
- Database queries are handled by the backend
- Private API keys live in the backend
- Business logic lives in the backend

### What is an API?
Frontend and backend communicate through an "API":
```
Frontend: "Give me the user's data"
    ↓ HTTP GET /api/user/123
Backend: "Here you go"
    ↓ { name: "Humaiza", email: "h@novaj.ai" }
Frontend: Display this data
```

### HTTP Methods
| Method | Purpose | Example |
|--------|---------|---------|
| GET | Fetch data | Get user profile |
| POST | Send new data | Submit a form |
| PUT/PATCH | Update existing data | Edit profile |
| DELETE | Delete data | Delete account |

### HTTP Status Codes (Important!)
| Code | Meaning |
|------|---------|
| 200 | OK — everything is fine |
| 201 | Created — new record created |
| 400 | Bad Request — your request is wrong |
| 401 | Unauthorized — please log in first |
| 403 | Forbidden — no permission |
| 404 | Not Found — page/data not found |
| 500 | Server Error — server's fault |

### API Route in Next.js
```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  // send email, save to database, etc.
  return Response.json({ success: true });
}
```

---

## PART 3 — WHAT IS A DATABASE

### Database = Organized Storage
Like an Excel sheet — data is stored in rows and columns.

### Types of Databases

**SQL (Relational) — Structured:**
```
Users Table:
| id | name    | email           | created_at  |
|----|---------|-----------------|-------------|
| 1  | Humaiza | h@novaj.ai      | 2026-01-01  |
| 2  | Ahmed   | a@example.com   | 2026-01-02  |
```
Examples: PostgreSQL, MySQL, SQLite
Use when: Data is structured and has relationships

**NoSQL (Non-relational) — Flexible:**
```json
{
  "id": "1",
  "name": "Humaiza",
  "skills": ["React", "Next.js", "Python"],
  "address": { "city": "Karachi", "country": "Pakistan" }
}
```
Examples: MongoDB, Firebase
Use when: Data is flexible and structure varies

**Redis — Super Fast Cache:**
- Stored in RAM (not on disk)
- For temporary data (sessions, rate limiting)
- 100x faster than regular databases

### Best Choices for Your Project
- **Supabase** (free tier) — PostgreSQL + Authentication + Storage all in one
- **Neon** — Serverless PostgreSQL, best with Vercel
- **PlanetScale** — MySQL, free tier available

### What is an ORM?
Instead of writing raw SQL, use code to interact with the database:
```tsx
// Without ORM (raw SQL):
db.query("SELECT * FROM users WHERE id = $1", [userId]);

// With Prisma ORM:
prisma.user.findUnique({ where: { id: userId } });
```
Use **Prisma** — works best with Next.js.

---

## PART 4 — AUTHENTICATION (Login System)

### Don't build this yourself
Authentication is very complex — security holes are easy to introduce.

**Best options:**
- **Clerk** — Best for Next.js, free tier 10,000 users
- **NextAuth.js / Auth.js** — open source, free
- **Supabase Auth** — if you're already using Supabase

### Authentication Flow
```
1. User enters email + password
2. Backend checks hash (password is NEVER stored as plain text)
3. JWT Token is issued (an encrypted string)
4. This token is sent with every request
5. Backend verifies token → user gets access
```

### What is a JWT Token?
```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyM30.abc123
     (header)              (payload)        (signature)
```
- Saved in the browser
- Has an expiry (1 hour, 7 days, etc.)
- Tamper-proof

### Password Rules
- Never store plain text passwords
- Hash with `bcrypt` at minimum
- Enforce min 8 characters
- Block common passwords

---

## PART 5 — HOSTING / DEPLOYMENT

### Platform Comparison

| Platform | Best For | Free Tier | Price |
|----------|----------|-----------|-------|
| **Vercel** | Next.js | Yes (generous) | $20/mo pro |
| **Netlify** | Static sites | Yes | $19/mo pro |
| **Railway** | Full backend | $5 credit | $5/mo+ |
| **Render** | Backend + DB | Yes (slow) | $7/mo |
| **AWS/GCP** | Enterprise | Limited | Complex pricing |
| **DigitalOcean** | VPS | No | $6/mo |

**For most projects:** Vercel is the best choice ✓

### Domain Types
- `.com` — $10-15/year — professional, most trusted
- `.ai` — $70-80/year — trendy for tech/AI companies
- `.co` — $25/year — popular with startups
- `.pk` — $5/year — for Pakistani local businesses

---

## PART 6 — STATE MANAGEMENT (React)

### What is State?
A component's current data that can change:
```tsx
const [count, setCount] = useState(0);  // count = state
const [user, setUser] = useState(null); // user = state
const [loading, setLoading] = useState(true);
```

### Types of State

| Type | Example | Tool |
|------|---------|------|
| Local | Button clicked or not | useState |
| Server | Data from API | TanStack Query |
| Global | Logged-in user info | Zustand / Context |
| URL | Search filters | URL params |
| Form | Form fields | React Hook Form |

### Common Mistakes
- Don't put all app state in one place — it slows things down
- Don't put server data in Redux — use TanStack Query
- Avoid unnecessary re-renders — use `useMemo`, `useCallback`

---

## PART 7 — WEB APP SECURITY CHECKLIST

### OWASP Top 10 (Most common attacks)
1. **SQL Injection** — never put user input directly into SQL — use an ORM
2. **XSS** (Cross-Site Scripting) — React escapes automatically — avoid `dangerouslySetInnerHTML`
3. **CSRF** — add CSRF tokens to forms — Next.js has built-in protection
4. **Broken Auth** — use Clerk/NextAuth — don't build it yourself
5. **Sensitive Data Exposure** — use HTTPS, hash passwords
6. **Security Misconfiguration** — change default passwords, turn off debug mode in production

### Quick Security Rules
```
✓ HTTPS — always
✓ Passwords — bcrypt hash
✓ API keys — in .env, never in frontend
✓ Input — validate all user input
✓ Rate limiting — add to API routes
✓ CORS — only allow your own domain
✓ Dependencies — update regularly (npm audit)
```

---

## PART 8 — TESTING

### Types of Tests
- **Unit Test** — test one function: "does this function return the right value?"
- **Integration Test** — test multiple parts together: "does the API call work end-to-end to the database?"
- **E2E Test** — test the full user journey: "does everything work from login to dashboard?"

### Tools
- **Vitest** — unit tests (fast, modern)
- **Playwright** — E2E tests
- **Testing Library** — React component tests

### Minimum You Should Do
- Unit tests for critical business logic
- E2E test for login/signup flow
- E2E test for payment flow (if you have payments)

---

## PART 9 — ARCHITECTURE PATTERNS

### MVC Pattern
```
Model      — Data and database logic
View       — UI (React components)
Controller — Handles requests, connects Model and View
```

### Folder Structure (Good Practice)
```
app/
  (auth)/          — Authentication pages
  (dashboard)/     — Protected pages
  api/             — API routes
components/
  ui/              — Reusable UI (Button, Input, Modal)
  landing/         — Page-specific components
  forms/           — Form components
lib/
  db.ts            — Database connection
  auth.ts          — Auth utilities
  utils.ts         — Helper functions
hooks/             — Custom React hooks
types/             — TypeScript types
```

### Component Size Rule
- If a component exceeds 100 lines, break it up
- One component should do one thing
- Too many props = time for a new component

---

## SUMMARY — What's Required (Priority Order)

### Must Have (Day 1)
- [ ] Responsive design (mobile first)
- [ ] HTTPS
- [ ] Loading states (spinner/skeleton)
- [ ] Error messages (user-friendly)
- [ ] 404 page
- [ ] Form validation

### Should Have (Week 1)
- [ ] Authentication (if you have users)
- [ ] SEO metadata
- [ ] Analytics
- [ ] Error monitoring (Sentry)
- [ ] Rate limiting on APIs

### Nice to Have (Month 1)
- [ ] Dark/light mode
- [ ] PWA support
- [ ] Email notifications
- [ ] A/B testing setup
- [ ] Performance monitoring

### Advanced (When scaling)
- [ ] CDN for assets
- [ ] Database indexing
- [ ] Caching layer (Redis)
- [ ] Background jobs
- [ ] Microservices (when things get really big)

---

*Next: Read `Frontend Guide` — HTML/CSS/React best practices in detail*
