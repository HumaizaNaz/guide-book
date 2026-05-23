# Testing Complete Guide
*Vitest, Playwright, Unit/Integration/E2E — 2026*

---

## WHY IS TESTING IMPORTANT?

```
Without tests:
  "Does this feature work?"       → Check manually
  Make one change                 → Everything breaks without you knowing
  Bug in production               → User finds it first

With tests:
  Push code                       → 200+ automated checks
  Something breaks                → CI fails immediately
  Deploy with confidence          → "Tests pass" = safe
```

**Rule 2026:** Comprehensive tests prevent 95% of production bugs.

---

## PART 1 — TESTING TYPES

```
Unit Test:        Test one function, one component
                  Fast (milliseconds), isolated

Integration Test: Test multiple parts together
                  Do the API + Database work together?

E2E Test:         Test the complete user journey
                  Actual clicks and navigation in a browser
```

### 2026 Best Stack

```
Unit Tests:       Vitest  (5–10x faster than Jest)
Integration:      Vitest + MSW (mock server)
E2E Tests:        Playwright (best in class)

Use this combination — proven, fast, modern
```

### Testing Pyramid

```
        /\
       /E2\       ← 10–20 critical paths
      /    \         (slow, expensive, essential)
     /──────\
    /Integrat\    ← 50–100 tests
   /  ion     \     (API routes, services)
  /────────────\
 /  Unit Tests  \ ← 100–300 tests
/________________\  (functions, components)
                    (fast, cheap, many)
```

---

## PART 2 — VITEST SETUP (Unit Tests)

### Install

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // Simulate browser environment
    globals: true,               // describe, it, expect are global
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### vitest.setup.ts

```typescript
import '@testing-library/jest-dom'
```

### package.json scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## PART 3 — WRITING UNIT TESTS

### Pure Function Test

```typescript
// src/lib/utils.ts
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
```

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice, truncate } from './utils'

describe('formatPrice', () => {
  it('formats a USD price', () => {
    expect(formatPrice(99.99)).toBe('$99.99')
  })

  it('handles different currency', () => {
    expect(formatPrice(100, 'EUR')).toBe('€100.00')
  })

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })
})

describe('truncate', () => {
  it('truncates long text', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...')
  })

  it('returns short text as-is', () => {
    expect(truncate('Hi', 10)).toBe('Hi')
  })

  it('handles exactly max length', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })
})
```

### React Component Test

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('fires click event', () => {
    const handleClick = vi.fn()  // Mock function
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles disabled state', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Save</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

### Async Function Test

```typescript
// src/lib/auth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validateUser } from './auth'

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn()
    }
  }
}))

import { db } from '@/lib/db'

describe('validateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a valid user', async () => {
    const mockUser = { id: '1', email: 'test@test.com', role: 'USER' }
    vi.mocked(db.user.findUnique).mockResolvedValue(mockUser)

    const result = await validateUser('test@test.com')
    expect(result).toEqual(mockUser)
  })

  it('returns null for invalid email', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue(null)

    const result = await validateUser('notexist@test.com')
    expect(result).toBeNull()
  })

  it('throws a database error', async () => {
    vi.mocked(db.user.findUnique).mockRejectedValue(new Error('DB Error'))

    await expect(validateUser('test@test.com')).rejects.toThrow('DB Error')
  })
})
```

---

## PART 4 — PLAYWRIGHT SETUP (E2E Tests)

### Install

```bash
npm install --save-dev @playwright/test
npx playwright install  # Install browsers
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',            // E2E tests folder
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,  // Retry in CI
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',  // Screenshot on failure
  },

  // Start server in local development
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
  ],
})
```

### package.json scripts

```json
{
  "scripts": {
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:headed": "playwright test --headed",
    "e2e:debug": "playwright test --debug"
  }
}
```

---

## PART 5 — WRITING E2E TESTS

### Login Flow Test

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('Successful login', async ({ page }) => {
    await page.goto('/login')

    // Fill the form
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    
    // Submit
    await page.click('[data-testid="login-button"]')

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText('Welcome back!')).toBeVisible()
  })

  test('Wrong password error', async ({ page }) => {
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'wrongpassword')
    await page.click('[data-testid="login-button"]')

    await expect(page.getByText('Invalid credentials')).toBeVisible()
    await expect(page).toHaveURL('/login')  // Stay on login page
  })

  test('Required field validation', async ({ page }) => {
    await page.goto('/login')
    await page.click('[data-testid="login-button"]')  // Submit empty form

    await expect(page.getByText('Email is required')).toBeVisible()
  })
})
```

### Navigation Test

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Novaj AI/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('navigation')).toBeVisible()
})

test('404 page for unknown routes', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page.getByText('Page not found')).toBeVisible()
})
```

### API Testing in Playwright

```typescript
// e2e/api.spec.ts
import { test, expect } from '@playwright/test'

test('API health check', async ({ request }) => {
  const response = await request.get('/api/health')
  expect(response.ok()).toBeTruthy()
  
  const data = await response.json()
  expect(data.status).toBe('ok')
})

test('Create user via API', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: {
      email: 'newuser@example.com',
      name: 'New User'
    }
  })
  
  expect(response.status()).toBe(201)
  const user = await response.json()
  expect(user.email).toBe('newuser@example.com')
})
```

### Page Object Model (Reusable Code)

```typescript
// e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.getByTestId('email-input')
    this.passwordInput = page.getByTestId('password-input')
    this.submitButton = page.getByTestId('login-button')
    this.errorMessage = page.getByRole('alert')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}

// Use in tests:
// const loginPage = new LoginPage(page)
// await loginPage.goto()
// await loginPage.login('test@test.com', 'pass123')
```

---

## PART 6 — DATA-TESTID ATTRIBUTE

```tsx
// Add data-testid to components
<input 
  data-testid="email-input"
  type="email"
  placeholder="Email"
/>

<button 
  data-testid="submit-button"
  type="submit"
>
  Submit
</button>

<div data-testid="error-message" role="alert">
  {error}
</div>
```

**Why:** CSS classes/IDs change, but `data-testid` stays stable.

---

## PART 7 — TESTING IN CI/CD

### With GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps  # Browsers
      - run: npm run e2e
      - uses: actions/upload-artifact@v4
        if: failure()            # Upload reports on failure
        with:
          name: playwright-report
          path: playwright-report/
```

---

## PART 8 — WHAT TO TEST (Priority)

### Must Test (High Priority)

```
✓ Auth flow: Login, logout, signup, password reset
✓ Payment flow: Checkout, success, failure
✓ Critical business logic: Pricing calculations, permissions
✓ API routes: Status codes, response format
✓ Form validation: Required fields, format validation
```

### Should Test (Medium Priority)

```
✓ Navigation: All main pages load
✓ Data display: Correct data shows in UI
✓ Error states: What happens when API fails
✓ Loading states: Spinner shows during fetch
```

### Skip (Low Priority)

```
✗ Third-party library internal code
✗ Styling/CSS details
✗ Minor UI text (too brittle)
✗ Generated code (Prisma client)
```

---

## TESTING CHECKLIST

```
Setup:
✓ Configure Vitest (unit tests)
✓ Configure Playwright (E2E)
✓ Add test jobs to GitHub Actions
✓ Add data-testid attributes to critical elements

Unit Tests:
✓ Test utility functions
✓ Test business logic
✓ Test API route handlers
✓ Cover edge cases (null, empty, invalid)

E2E Tests:
✓ Login/signup flow
✓ Main user journey (key feature)
✓ Payment/checkout (if applicable)
✓ 404 page

Quality:
✓ Tests fail in CI (intentionally break something and verify)
✓ Check coverage report (aim for 70%+)
✓ Tests are fast (unit < 1s, E2E < 30s)
```

---

*Next: Read `14_DEVELOPER_TOOLKIT_GUIDE.md` — VS Code setup and productivity tools*
