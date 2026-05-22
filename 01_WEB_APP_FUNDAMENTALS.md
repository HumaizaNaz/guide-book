# Web App Fundamentals
*Har web app mein kya hona chahiye — basics se advanced tak*

---

## WEB APP KYA HOTA HAI?

Simple website vs Web App:
- **Website:** Sirf information dikhata hai (blog, portfolio)
- **Web App:** User interact karta hai — login, data save, actions perform (Gmail, Spotify, Novaj AI)

---

## EK WEB APP KE 3 HISSE

```
┌─────────────────────────────────────────┐
│           FRONTEND (Browser)            │  ← Jo user dekhta hai
│   HTML + CSS + JavaScript / React       │
└────────────────┬────────────────────────┘
                 │  HTTP Request/Response
┌────────────────▼────────────────────────┐
│            BACKEND (Server)             │  ← Logic hoti hai
│   Node.js / Python / PHP                │
└────────────────┬────────────────────────┘
                 │  Query
┌────────────────▼────────────────────────┐
│           DATABASE (Storage)            │  ← Data save hota hai
│   PostgreSQL / MongoDB / Redis          │
└─────────────────────────────────────────┘
```

---

## PART 1 — FRONTEND KYA HOTA HAI

### HTML — Structure
Page ka skeleton:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Page Title</title>           <!-- Browser tab mein dikhta hai -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width"> <!-- Mobile ke liye -->
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
Kaise dikhega:
```css
/* Colors, fonts, spacing, layout */
body { background: black; color: white; }
h1 { font-size: 48px; font-weight: bold; }
.button { padding: 12px 24px; border-radius: 8px; }
```

### JavaScript — Behavior
Kya karega:
```js
// Click pe kuch ho
button.addEventListener('click', () => {
  alert('Clicked!');
});

// API se data laao
const data = await fetch('/api/products');
```

### React/Next.js — Modern Way
Aajkal HTML/CSS/JS seedha nahi likhte — React use karte hain:
```tsx
// Yeh ek "component" hai — reusable UI piece
function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-blue-500 px-4 py-2 rounded">
      {text}
    </button>
  );
}
```

**Next.js = React + automatic routing + SEO + performance**
Tumhara Novaj AI project Next.js pe hai — yeh best choice hai.

---

## PART 2 — BACKEND KYA HOTA HAI

### Backend ki zaroorat kyun hai?
- Passwords backend pe store hote hain (frontend mein rakhna dangerous hai)
- Database queries backend karta hai
- Private API keys backend mein hoti hain
- Business logic backend mein hoti hai

### API Kya Hai?
Frontend aur backend ek doosre se "API" ke zariye baat karte hain:
```
Frontend: "Mujhe user ka data do"
    ↓ HTTP GET /api/user/123
Backend: "Lo yeh raha"
    ↓ { name: "Humaiza", email: "h@novaj.ai" }
Frontend: Yeh data display karo
```

### HTTP Methods
| Method | Kaam | Example |
|--------|------|---------|
| GET | Data laao | User profile fetch karo |
| POST | Naya data bhejo | Form submit karo |
| PUT/PATCH | Existing data update karo | Profile edit karo |
| DELETE | Data delete karo | Account delete karo |

### HTTP Status Codes (Important!)
| Code | Matlab |
|------|--------|
| 200 | OK — sab theek |
| 201 | Created — naya record ban gaya |
| 400 | Bad Request — tumhara request galat hai |
| 401 | Unauthorized — login karo pehle |
| 403 | Forbidden — permission nahi |
| 404 | Not Found — page/data nahi mila |
| 500 | Server Error — server ki galti |

### Next.js mein API Route (tumhare project mein)
```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  // email bhejo, database mein save karo, etc.
  return Response.json({ success: true });
}
```

---

## PART 3 — DATABASE KYA HOTA HAI

### Database = Organized Storage
Jaise Excel sheet — data rows aur columns mein store hota hai.

### Types of Databases

**SQL (Relational) — Structure wali:**
```
Users Table:
| id | name    | email           | created_at  |
|----|---------|-----------------|-------------|
| 1  | Humaiza | h@novaj.ai      | 2026-01-01  |
| 2  | Ahmed   | a@example.com   | 2026-01-02  |
```
Examples: PostgreSQL, MySQL, SQLite
Use karo when: Data structured hai, relationships hain

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
Use karo when: Data flexible hai, structure vary kare

**Redis — Super Fast Cache:**
- RAM mein store hota hai (disk pe nahi)
- Temporary data ke liye (sessions, rate limiting)
- 100x faster than regular databases

### Tumhare Project ke liye Best Choice
- **Supabase** (free tier) — PostgreSQL + Authentication + Storage sab ek jagah
- **Neon** — Serverless PostgreSQL, Vercel ke saath best
- **PlanetScale** — MySQL, free tier available

### ORM Kya Hai?
SQL likhne ki bajaye, code se database use karo:
```tsx
// Bina ORM (raw SQL):
db.query("SELECT * FROM users WHERE id = $1", [userId]);

// Prisma ORM ke saath:
prisma.user.findUnique({ where: { id: userId } });
```
**Prisma** use karo — Next.js ke saath best works karta hai.

---

## PART 4 — AUTHENTICATION (Login System)

### Yeh khud mat banao
Authentication bahut complex hai — security holes aana easy hai.

**Best options:**
- **Clerk** — Next.js ke liye best, free tier 10,000 users
- **NextAuth.js / Auth.js** — open source, free
- **Supabase Auth** — agar Supabase use kar rahe ho

### Authentication Flow
```
1. User email + password enter kare
2. Backend hash check kare (password KABHI plain text store nahi hota)
3. JWT Token mile (ek encrypted string)
4. Har request mein yeh token bheja jata hai
5. Backend token verify kare → user ko access mile
```

### JWT Token Kya Hai?
```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyM30.abc123
     (header)              (payload)        (signature)
```
- Browser mein save hota hai
- Expiry hoti hai (1 hour, 7 days, etc.)
- Tamper-proof hai

### Password Rules
- Kabhi plain text store mat karo
- `bcrypt` se hash karo minimum
- Min 8 characters enforce karo
- Common passwords block karo

---

## PART 5 — HOSTING / DEPLOYMENT

### Options Comparison

| Platform | Best For | Free Tier | Price |
|----------|----------|-----------|-------|
| **Vercel** | Next.js | Yes (generous) | $20/mo pro |
| **Netlify** | Static sites | Yes | $19/mo pro |
| **Railway** | Full backend | $5 credit | $5/mo+ |
| **Render** | Backend + DB | Yes (slow) | $7/mo |
| **AWS/GCP** | Enterprise | Limited | Complex pricing |
| **DigitalOcean** | VPS | No | $6/mo |

**Tumhare liye:** Vercel (already use kar rahe ho) ✓

### Domain Types
- `.com` — $10-15/year — professional, most trusted
- `.ai` — $70-80/year — tech/AI companies ke liye trendy
- `.co` — $25/year — startups use karte hain
- `.pk` — $5/year — Pakistani local business ke liye

---

## PART 6 — STATE MANAGEMENT (React)

### State Kya Hai?
Component ka current data jo change ho sakta hai:
```tsx
const [count, setCount] = useState(0);  // count = state
const [user, setUser] = useState(null); // user = state
const [loading, setLoading] = useState(true);
```

### Types of State

| Type | Example | Tool |
|------|---------|------|
| Local | Button clicked ya nahi | useState |
| Server | API se aaya data | TanStack Query |
| Global | Login user info | Zustand / Context |
| URL | Search filters | URL params |
| Form | Form fields | React Hook Form |

### Common Mistakes
- Poori app ka state ek jagah mat rakho — slow ho jati hai
- Server data ko Redux mein mat rakho — TanStack Query use karo
- Unnecessary re-renders avoid karo — `useMemo`, `useCallback`

---

## PART 7 — WEB APP SECURITY CHECKLIST

### OWASP Top 10 (Sabse common attacks)
1. **SQL Injection** — user input seedha SQL mein mat daalo — ORM use karo
2. **XSS** (Cross-Site Scripting) — React automatically escape karta hai — `dangerouslySetInnerHTML` avoid karo
3. **CSRF** — forms pe CSRF token lagao — Next.js mein built-in protection hai
4. **Broken Auth** — Clerk/NextAuth use karo — khud mat banao
5. **Sensitive Data Exposure** — HTTPS use karo, passwords hash karo
6. **Security Misconfiguration** — default passwords change karo, debug mode off karo production mein

### Quick Security Rules
```
✓ HTTPS — always
✓ Passwords — bcrypt hash karo
✓ API keys — .env mein, kabhi frontend mein nahi
✓ Input — har user input validate karo
✓ Rate limiting — API routes pe lagao
✓ CORS — sirf apne domain ko allow karo
✓ Dependencies — regularly update karo (npm audit)
```

---

## PART 8 — TESTING

### Types of Tests
- **Unit Test** — ek function test karo: "yeh function sahi value return karta hai?"
- **Integration Test** — multiple parts milke test karo: "API call se database tak sahi kaam karta hai?"
- **E2E Test** — puri user journey test karo: "Login se dashboard tak sab kaam karta hai?"

### Tools
- **Vitest** — unit tests (fast, modern)
- **Playwright** — E2E tests (tumhare project mein already set up hai)
- **Testing Library** — React component tests

### Minimum Jo Karo
- Critical business logic ke unit tests
- Login/signup flow ka E2E test
- Payment flow ka E2E test (agar payments hain)

---

## PART 9 — ARCHITECTURE PATTERNS

### MVC Pattern
```
Model      — Data aur database logic
View       — UI (React components)
Controller — Request handle kare, Model aur View connect kare
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
- Ek component mein 100 lines se zyada ho toh tod do
- Ek component ek kaam kare
- Props zyada hon toh new component banao

---

## SUMMARY — Kya Zaroori Hai (Priority Order)

### Must Have (Day 1)
- [ ] Responsive design (mobile first)
- [ ] HTTPS
- [ ] Loading states (spinner/skeleton)
- [ ] Error messages (user-friendly)
- [ ] 404 page
- [ ] Form validation

### Should Have (Week 1)
- [ ] Authentication (agar users hain)
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
- [ ] Microservices (agar bahut bada ho)

---

*Next: `02_FRONTEND_GUIDE.md` padho — HTML/CSS/React best practices detail mein*
