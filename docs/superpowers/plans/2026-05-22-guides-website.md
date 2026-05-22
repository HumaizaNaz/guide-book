# Guides Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js documentation website that renders 17 markdown guides with search, progress tracking, bookmarks, and notes — hosted at `C:\Users\km\Desktop\GUIDES\website\`.

**Architecture:** Next.js 15 App Router reads `.md` files from the parent GUIDES directory at build/request time using gray-matter. Markdown is rendered with next-mdx-remote + rehype-pretty-code (Shiki). All user state (progress, bookmarks, notes) lives in localStorage via a typed storage utility.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-mdx-remote, gray-matter, rehype-pretty-code, Fuse.js, lucide-react

---

## File Map

```
website/
  app/
    layout.tsx                  ← Root layout (TopNav + Sidebar wrapper)
    page.tsx                    ← Home — guide cards grid
    globals.css                 ← Base Tailwind + custom styles
    guide/[slug]/page.tsx       ← Individual guide page
    bookmarks/page.tsx          ← All saved bookmarks
  components/
    Sidebar.tsx                 ← Left nav — categories, guides, progress icons
    TopNav.tsx                  ← Header — logo, search trigger, theme toggle
    ThemeToggle.tsx             ← Dark/light button
    GuideCard.tsx               ← Card on home page
    GuideContent.tsx            ← Markdown renderer wrapper (server)
    CodeBlock.tsx               ← Syntax-highlighted code + copy button (client)
    SearchModal.tsx             ← Ctrl+K command palette (client)
    TableOfContents.tsx         ← TOC from headings (client)
    BookmarkButton.tsx          ← Toggle bookmark on a heading (client)
    ProgressTracker.tsx         ← Scroll-based auto-mark-read (client)
    NotesPad.tsx                ← Per-guide textarea notes (client)
  lib/
    categories.ts               ← Slug → {category, order} mapping
    guides.ts                   ← Read all .md files, parse, return GuideMetadata[]
    search.ts                   ← Build + query Fuse.js index
    storage.ts                  ← localStorage helpers (progress, bookmarks, notes)
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  package.json
```

---

## Task 1: Bootstrap Project

**Files:**
- Create: `website/` (entire project)

- [ ] **Step 1: Create Next.js app inside GUIDES folder**

```bash
cd "C:\Users\km\Desktop\GUIDES"
npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
cd website
```

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-mdx-remote gray-matter fuse.js rehype-pretty-code shiki remark-gfm lucide-react reading-time
npm install -D @types/node
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: `http://localhost:3000` opens, Next.js default page shows.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: bootstrap Next.js guides website"
```

---

## Task 2: Content Layer

**Files:**
- Create: `lib/categories.ts`
- Create: `lib/guides.ts`

- [ ] **Step 1: Create `lib/categories.ts`**

```typescript
// lib/categories.ts

export type Category = 'Foundation' | 'Deploy & Infra' | 'Quality & Tools' | 'Visibility'

export interface GuideMeta {
  filename: string
  slug: string
  category: Category
  order: number
}

export const GUIDE_META: GuideMeta[] = [
  { filename: '01_WEB_APP_FUNDAMENTALS.md', slug: 'web-app-fundamentals', category: 'Foundation', order: 1 },
  { filename: '02_FRONTEND_GUIDE.md', slug: 'frontend-guide', category: 'Foundation', order: 2 },
  { filename: '03_BACKEND_GUIDE.md', slug: 'backend-guide', category: 'Foundation', order: 3 },
  { filename: '10_GIT_WORKFLOW_GUIDE.md', slug: 'git-workflow', category: 'Foundation', order: 4 },
  { filename: '11_DATABASE_GUIDE.md', slug: 'database-guide', category: 'Foundation', order: 5 },
  { filename: '04_DEPLOYMENT_GUIDE.md', slug: 'deployment-guide', category: 'Deploy & Infra', order: 6 },
  { filename: '06_DOCKER_GUIDE.md', slug: 'docker-guide', category: 'Deploy & Infra', order: 7 },
  { filename: '07_SERVER_VPS_GUIDE.md', slug: 'server-vps-guide', category: 'Deploy & Infra', order: 8 },
  { filename: '08_DOMAIN_HOSTING_GUIDE.md', slug: 'domain-hosting-guide', category: 'Deploy & Infra', order: 9 },
  { filename: '09_CICD_DEVOPS_GUIDE.md', slug: 'cicd-devops-guide', category: 'Deploy & Infra', order: 10 },
  { filename: '05_PERFORMANCE_GUIDE.md', slug: 'performance-guide', category: 'Quality & Tools', order: 11 },
  { filename: '13_TESTING_GUIDE.md', slug: 'testing-guide', category: 'Quality & Tools', order: 12 },
  { filename: '14_DEVELOPER_TOOLKIT_GUIDE.md', slug: 'developer-toolkit', category: 'Quality & Tools', order: 13 },
  { filename: '12_AI_TOOLS_GUIDE.md', slug: 'ai-tools-guide', category: 'Quality & Tools', order: 14 },
  { filename: 'SEO_MASTER_GUIDE.md', slug: 'seo-master-guide', category: 'Visibility', order: 15 },
  { filename: 'SEO_CHECKLIST.md', slug: 'seo-checklist', category: 'Visibility', order: 16 },
]

export const CATEGORIES: Category[] = ['Foundation', 'Deploy & Infra', 'Quality & Tools', 'Visibility']

export function getMetaBySlug(slug: string): GuideMeta | undefined {
  return GUIDE_META.find(g => g.slug === slug)
}
```

- [ ] **Step 2: Create `lib/guides.ts`**

```typescript
// lib/guides.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { GUIDE_META, type Category, type GuideMeta } from './categories'

// Guides are in the parent directory (GUIDES folder)
const GUIDES_DIR = path.join(process.cwd(), '..')

export interface Guide extends GuideMeta {
  title: string
  subtitle: string
  description: string
  readTime: string
  content: string
  wordCount: number
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled'
}

function extractSubtitle(content: string): string {
  // Second line after title, usually italics like *subtitle here*
  const lines = content.split('\n').filter(l => l.trim())
  if (lines.length > 1) {
    return lines[1].replace(/^\*(.+)\*$/, '$1').trim()
  }
  return ''
}

function extractDescription(content: string): string {
  // First non-heading, non-blank paragraph
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('-') && !trimmed.startsWith('```')) {
      return trimmed.slice(0, 120) + (trimmed.length > 120 ? '...' : '')
    }
  }
  return ''
}

export function getAllGuides(): Guide[] {
  return GUIDE_META.map(meta => {
    const filePath = path.join(GUIDES_DIR, meta.filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content } = matter(raw)
    const stats = readingTime(content)

    return {
      ...meta,
      title: extractTitle(content),
      subtitle: extractSubtitle(content),
      description: extractDescription(content),
      readTime: stats.text,
      wordCount: stats.words,
      content,
    }
  })
}

export function getGuideBySlug(slug: string): Guide | undefined {
  const meta = GUIDE_META.find(g => g.slug === slug)
  if (!meta) return undefined

  const filePath = path.join(GUIDES_DIR, meta.filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  const stats = readingTime(content)

  return {
    ...meta,
    title: extractTitle(content),
    subtitle: extractSubtitle(content),
    description: extractDescription(content),
    readTime: stats.text,
    wordCount: stats.words,
    content,
  }
}

export function getGuidesByCategory(category: Category): Guide[] {
  return getAllGuides().filter(g => g.category === category)
}

export function getAllSlugs(): string[] {
  return GUIDE_META.map(g => g.slug)
}
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add content layer (guides.ts + categories.ts)"
```

---

## Task 3: Storage Layer

**Files:**
- Create: `lib/storage.ts`

- [ ] **Step 1: Create `lib/storage.ts`**

```typescript
// lib/storage.ts
'use client'

// ─── Types ────────────────────────────────────────────────

export interface GuideProgress {
  read: boolean
  scrollPercent: number
  lastVisited: number  // timestamp
}

export interface Bookmark {
  id: string           // `${slug}-${headingId}`
  slug: string
  headingId: string
  headingText: string
  guideTitle: string
  savedAt: number
}

// ─── Progress ─────────────────────────────────────────────

export function getProgress(slug: string): GuideProgress {
  if (typeof window === 'undefined') return { read: false, scrollPercent: 0, lastVisited: 0 }
  const raw = localStorage.getItem(`progress-${slug}`)
  if (!raw) return { read: false, scrollPercent: 0, lastVisited: 0 }
  return JSON.parse(raw) as GuideProgress
}

export function setProgress(slug: string, data: Partial<GuideProgress>): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  localStorage.setItem(`progress-${slug}`, JSON.stringify({
    ...current,
    ...data,
    lastVisited: Date.now(),
  }))
}

export function markAsRead(slug: string): void {
  setProgress(slug, { read: true, scrollPercent: 100 })
}

export function getAllProgress(): Record<string, GuideProgress> {
  if (typeof window === 'undefined') return {}
  const result: Record<string, GuideProgress> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('progress-')) {
      const slug = key.replace('progress-', '')
      result[slug] = JSON.parse(localStorage.getItem(key)!)
    }
  }
  return result
}

// ─── Bookmarks ────────────────────────────────────────────

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('bookmarks')
  if (!raw) return []
  return JSON.parse(raw) as Bookmark[]
}

export function addBookmark(bookmark: Omit<Bookmark, 'id' | 'savedAt'>): void {
  const bookmarks = getBookmarks()
  const id = `${bookmark.slug}-${bookmark.headingId}`
  if (bookmarks.find(b => b.id === id)) return  // already exists
  bookmarks.push({ ...bookmark, id, savedAt: Date.now() })
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter(b => b.id !== id)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export function isBookmarked(slug: string, headingId: string): boolean {
  return getBookmarks().some(b => b.id === `${slug}-${headingId}`)
}

// ─── Notes ────────────────────────────────────────────────

export function getNotes(slug: string): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(`notes-${slug}`) ?? ''
}

export function setNotes(slug: string, text: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`notes-${slug}`, text)
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/storage.ts
git commit -m "feat: add localStorage storage layer"
```

---

## Task 4: Global Styles + Tailwind Config

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `tailwind.config.ts`**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        }
      }
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Update `app/globals.css`**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100;
  }
  /* Prose styles for markdown content */
  .prose h1 { @apply text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white; }
  .prose h2 { @apply text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2; }
  .prose h3 { @apply text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-100; }
  .prose p  { @apply text-gray-700 dark:text-gray-300 leading-7 mb-4; }
  .prose ul { @apply list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1; }
  .prose ol { @apply list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1; }
  .prose li { @apply leading-7; }
  .prose a  { @apply text-brand-600 hover:text-brand-700 underline dark:text-brand-400; }
  .prose strong { @apply font-semibold text-gray-900 dark:text-white; }
  .prose hr { @apply border-gray-200 dark:border-gray-700 my-8; }
  .prose table { @apply w-full border-collapse mb-6; }
  .prose th { @apply bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-sm; }
  .prose td { @apply border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm; }
  .prose blockquote { @apply border-l-4 border-brand-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4; }
  .prose pre  { @apply rounded-xl overflow-hidden my-4; }
  .prose code:not(pre code) { @apply bg-gray-100 dark:bg-gray-800 text-brand-700 dark:text-brand-400 px-1.5 py-0.5 rounded text-sm font-mono; }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: configure Tailwind + global prose styles"
```

---

## Task 5: ThemeToggle + TopNav

**Files:**
- Create: `components/ThemeToggle.tsx`
- Create: `components/TopNav.tsx`

- [ ] **Step 1: Create `components/ThemeToggle.tsx`**

```tsx
// components/ThemeToggle.tsx
'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {dark ? <Sun size={18} className="text-gray-400" /> : <Moon size={18} className="text-gray-500" />}
    </button>
  )
}
```

- [ ] **Step 2: Create `components/TopNav.tsx`**

```tsx
// components/TopNav.tsx
'use client'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface TopNavProps {
  onSearchOpen: () => void
}

export function TopNav({ onSearchOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white hover:text-brand-600 transition-colors">
          DevGuides
        </Link>

        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Search size={14} />
          <span>Search guides...</span>
          <kbd className="hidden sm:inline text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2">
          <Link href="/bookmarks" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Bookmarks
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/
git commit -m "feat: add TopNav + ThemeToggle components"
```

---

## Task 6: Sidebar

**Files:**
- Create: `components/Sidebar.tsx`

- [ ] **Step 1: Create `components/Sidebar.tsx`**

```tsx
// components/Sidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle2, Circle, BookOpen } from 'lucide-react'
import { CATEGORIES, GUIDE_META, type Category } from '@/lib/categories'
import { getAllProgress, type GuideProgress } from '@/lib/storage'

export function Sidebar() {
  const pathname = usePathname()
  const [progress, setProgress] = useState<Record<string, GuideProgress>>({})
  const totalGuides = GUIDE_META.length
  const readCount = Object.values(progress).filter(p => p.read).length

  useEffect(() => {
    setProgress(getAllProgress())

    // Refresh when storage changes (other tabs or ProgressTracker)
    const handler = () => setProgress(getAllProgress())
    window.addEventListener('storage', handler)
    window.addEventListener('progress-updated', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('progress-updated', handler)
    }
  }, [])

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-4">
      {/* Progress summary */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <span className="font-medium">Progress</span>
          <span>{readCount}/{totalGuides}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-brand-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(readCount / totalGuides) * 100}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-4">
        {CATEGORIES.map(category => (
          <CategorySection
            key={category}
            category={category}
            pathname={pathname}
            progress={progress}
          />
        ))}
      </nav>
    </aside>
  )
}

function CategorySection({
  category,
  pathname,
  progress,
}: {
  category: Category
  pathname: string
  progress: Record<string, GuideProgress>
}) {
  const guides = GUIDE_META.filter(g => g.category === category)

  return (
    <div>
      <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {category}
      </p>
      <ul className="space-y-0.5">
        {guides.map(guide => {
          const isActive = pathname === `/guide/${guide.slug}`
          const isRead = progress[guide.slug]?.read ?? false

          return (
            <li key={guide.slug}>
              <Link
                href={`/guide/${guide.slug}`}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors group ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {isRead ? (
                  <CheckCircle2 size={14} className="shrink-0 text-green-500" />
                ) : (
                  <Circle size={14} className="shrink-0 text-gray-300 dark:text-gray-600" />
                )}
                <span className="truncate">{getShortTitle(guide.slug)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function getShortTitle(slug: string): string {
  const titles: Record<string, string> = {
    'web-app-fundamentals': 'Web App Fundamentals',
    'frontend-guide': 'Frontend Guide',
    'backend-guide': 'Backend Guide',
    'git-workflow': 'Git Workflow',
    'database-guide': 'Database Guide',
    'deployment-guide': 'Deployment (Vercel)',
    'docker-guide': 'Docker Guide',
    'server-vps-guide': 'Server & VPS',
    'domain-hosting-guide': 'Domain & Hosting',
    'cicd-devops-guide': 'CI/CD & DevOps',
    'performance-guide': 'Performance',
    'testing-guide': 'Testing Guide',
    'developer-toolkit': 'Developer Toolkit',
    'ai-tools-guide': 'AI Tools Guide',
    'seo-master-guide': 'SEO Master Guide',
    'seo-checklist': 'SEO Checklist',
  }
  return titles[slug] ?? slug
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: add Sidebar with category navigation + progress icons"
```

---

## Task 7: Root Layout

**Files:**
- Create: `components/SearchModal.tsx` (stub — will flesh out in Task 10)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create stub `components/SearchModal.tsx`**

```tsx
// components/SearchModal.tsx
'use client'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl p-4" onClick={e => e.stopPropagation()}>
        <p className="text-gray-400 text-sm">Search coming in Task 10…</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `app/layout.tsx`**

```tsx
// app/layout.tsx
'use client'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/TopNav'
import { Sidebar } from '@/components/Sidebar'
import { SearchModal } from '@/components/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TopNav onSearchOpen={() => setSearchOpen(true)} />
        <div className="flex max-w-screen-2xl mx-auto">
          <Sidebar />
          <main className="flex-1 min-w-0 px-6 py-8 max-w-4xl">
            {children}
          </main>
        </div>
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Run dev server and verify layout renders**

```bash
npm run dev
```

Expected: Page loads with topnav + sidebar on the left, main content area on right.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/SearchModal.tsx
git commit -m "feat: root layout with sidebar + search modal stub"
```

---

## Task 8: Home Page

**Files:**
- Create: `components/GuideCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/GuideCard.tsx`**

```tsx
// components/GuideCard.tsx
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import type { Guide } from '@/lib/guides'

const categoryColors: Record<string, string> = {
  'Foundation': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Deploy & Infra': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Quality & Tools': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Visibility': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guide/${guide.slug}`}
      className="group flex flex-col p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[guide.category]}`}>
          {guide.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={12} />
          {guide.readTime}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {guide.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">
        {guide.description}
      </p>

      <div className="flex items-center justify-end mt-3 text-brand-600 dark:text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Read guide <ChevronRight size={14} className="ml-1" />
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Rewrite `app/page.tsx`**

```tsx
// app/page.tsx
import { getAllGuides } from '@/lib/guides'
import { CATEGORIES } from '@/lib/categories'
import { GuideCard } from '@/components/GuideCard'

export default function HomePage() {
  const allGuides = getAllGuides()
  const total = allGuides.length

  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Developer Guides
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {total} guides — Docker, servers, domains, CI/CD, databases, AI tools, testing, aur bahut kuch. 2026 updated.
        </p>
      </div>

      {/* Guides by category */}
      {CATEGORIES.map(category => {
        const guides = allGuides.filter(g => g.category === category)
        return (
          <section key={category} className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Test home page renders**

```bash
npm run dev
```

Expected: Home page shows guide cards grouped by category. Each card shows title, category badge, read time, description.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/GuideCard.tsx
git commit -m "feat: home page with guide cards grouped by category"
```

---

## Task 9: Guide Page + Markdown Rendering

**Files:**
- Create: `components/CodeBlock.tsx`
- Create: `components/GuideContent.tsx`
- Create: `app/guide/[slug]/page.tsx`

- [ ] **Step 1: Create `components/CodeBlock.tsx`**

```tsx
// components/CodeBlock.tsx
'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300"
      >
        {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/GuideContent.tsx`**

```tsx
// components/GuideContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CodeBlock } from './CodeBlock'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options } from 'rehype-pretty-code'

const prettyCodeOptions: Options = {
  theme: 'github-light',
  keepBackground: true,
}

const components = {
  pre: ({ children, ...props }: React.ComponentProps<'pre'>) => {
    // Extract text from nested code element
    const codeEl = (children as React.ReactElement)
    const text = codeEl?.props?.children ?? ''
    return <CodeBlock className={codeEl?.props?.className}>{String(text)}</CodeBlock>
  },
}

export function GuideContent({ content }: { content: string }) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={components}
      />
    </div>
  )
}
```

- [ ] **Step 3: Create `app/guide/[slug]/page.tsx`**

```tsx
// app/guide/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllSlugs, getGuideBySlug } from '@/lib/guides'
import { GuideContent } from '@/components/GuideContent'
import { Clock, BookOpen } from 'lucide-react'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return { title: `${guide.title} — DevGuides`, description: guide.description }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  return (
    <article>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 block">
          {guide.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {guide.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {guide.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} />
            {guide.wordCount.toLocaleString()} words
          </span>
        </div>
      </div>

      {/* Content */}
      <GuideContent content={guide.content} />
    </article>
  )
}
```

- [ ] **Step 4: Test a guide page**

```bash
npm run dev
# Open: http://localhost:3000/guide/docker-guide
```

Expected: Guide renders with formatted markdown, syntax-highlighted code blocks, copy buttons.

- [ ] **Step 5: Commit**

```bash
git add app/guide/ components/CodeBlock.tsx components/GuideContent.tsx
git commit -m "feat: guide page with MDX rendering + syntax highlighting"
```

---

## Task 10: Search Modal (Fuse.js)

**Files:**
- Create: `lib/search.ts`
- Modify: `components/SearchModal.tsx`

- [ ] **Step 1: Create `lib/search.ts`**

```typescript
// lib/search.ts
import Fuse from 'fuse.js'
import { GUIDE_META } from './categories'

export interface SearchResult {
  slug: string
  title: string
  category: string
  snippet: string
  score: number
}

export interface SearchIndex {
  slug: string
  title: string
  category: string
  content: string
}

let fuse: Fuse<SearchIndex> | null = null

export function buildSearchIndex(guides: SearchIndex[]): void {
  fuse = new Fuse(guides, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'content', weight: 0.6 },
    ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 2,
  })
}

export function search(query: string): SearchResult[] {
  if (!fuse || !query.trim()) return []
  const results = fuse.search(query, { limit: 8 })
  return results.map(r => ({
    slug: r.item.slug,
    title: r.item.title,
    category: r.item.category,
    snippet: extractSnippet(r.item.content, query),
    score: r.score ?? 1,
  }))
}

function extractSnippet(content: string, query: string): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return content.slice(0, 100) + '...'
  const start = Math.max(0, idx - 40)
  const end = Math.min(content.length, idx + 80)
  return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '')
}
```

- [ ] **Step 2: Create API route for search index**

```typescript
// app/api/search-index/route.ts
import { getAllGuides } from '@/lib/guides'
import { NextResponse } from 'next/server'

export async function GET() {
  const guides = getAllGuides()
  const index = guides.map(g => ({
    slug: g.slug,
    title: g.title,
    category: g.category,
    content: g.content.slice(0, 5000), // limit for perf
  }))
  return NextResponse.json(index)
}
```

- [ ] **Step 3: Rewrite `components/SearchModal.tsx`**

```tsx
// components/SearchModal.tsx
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { buildSearchIndex, search, type SearchResult, type SearchIndex } from '@/lib/search'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)
  const [indexed, setIndexed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load + build index once
  useEffect(() => {
    if (indexed) return
    fetch('/api/search-index')
      .then(r => r.json())
      .then((data: SearchIndex[]) => {
        buildSearchIndex(data)
        setIndexed(true)
      })
  }, [indexed])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setResults([])
      setSelected(0)
    }
  }, [open])

  // Ctrl+K global shortcut
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) onClose() // noop — parent handles open
      }
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleQuery = useCallback((q: string) => {
    setQuery(q)
    setResults(search(q))
    setSelected(0)
  }, [])

  function navigate(slug: string) {
    router.push(`/guide/${slug}`)
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) navigate(results[selected].slug)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => handleQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search guides..."
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.slug}>
                <button
                  onClick={() => navigate(r.slug)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    i === selected ? 'bg-brand-50 dark:bg-brand-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{r.title}</span>
                    <span className="text-xs text-gray-400">{r.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{r.snippet}</p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-gray-400">No results for "{query}"</p>
        )}

        {!query && (
          <p className="px-4 py-4 text-xs text-gray-400 text-center">Type to search all {16} guides</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Wire Ctrl+K in layout**

In `app/layout.tsx`, add a `useEffect` after the existing `useState`:

```tsx
// Add inside RootLayout, after useState:
useEffect(() => {
  function handler(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])
```

- [ ] **Step 5: Test search**

```bash
npm run dev
# Press Ctrl+K → type "docker" → should show Docker guide in results
```

Expected: Modal opens, typing shows matching guides with snippet previews.

- [ ] **Step 6: Commit**

```bash
git add lib/search.ts app/api/ components/SearchModal.tsx app/layout.tsx
git commit -m "feat: Ctrl+K search modal with Fuse.js full-text search"
```

---

## Task 11: Progress Tracking

**Files:**
- Create: `components/ProgressTracker.tsx`
- Modify: `app/guide/[slug]/page.tsx`

- [ ] **Step 1: Create `components/ProgressTracker.tsx`**

```tsx
// components/ProgressTracker.tsx
'use client'
import { useEffect } from 'react'
import { setProgress, markAsRead } from '@/lib/storage'

export function ProgressTracker({ slug }: { slug: string }) {
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop + window.innerHeight
      const total = el.scrollHeight
      const percent = Math.round((scrolled / total) * 100)

      setProgress(slug, { scrollPercent: percent })

      // Mark as read when 80% scrolled
      if (percent >= 80) {
        markAsRead(slug)
        window.dispatchEvent(new Event('progress-updated'))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  return null  // No UI — just a side-effect component
}
```

- [ ] **Step 2: Add ProgressTracker to guide page**

In `app/guide/[slug]/page.tsx`, add the import and usage:

```tsx
// Add import at top:
import { ProgressTracker } from '@/components/ProgressTracker'

// Add inside the <article>, right after the opening tag:
<ProgressTracker slug={slug} />
```

- [ ] **Step 3: Verify progress updates**

```bash
npm run dev
# Open a guide, scroll to bottom
# Sidebar icon should change from ○ to ✓
```

- [ ] **Step 4: Commit**

```bash
git add components/ProgressTracker.tsx app/guide/
git commit -m "feat: scroll-based progress tracking, auto-mark read at 80%"
```

---

## Task 12: Bookmarks

**Files:**
- Create: `components/BookmarkButton.tsx`
- Create: `app/bookmarks/page.tsx`

- [ ] **Step 1: Create `components/BookmarkButton.tsx`**

```tsx
// components/BookmarkButton.tsx
'use client'
import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { addBookmark, removeBookmark, isBookmarked } from '@/lib/storage'

interface BookmarkButtonProps {
  slug: string
  headingId: string
  headingText: string
  guideTitle: string
}

export function BookmarkButton({ slug, headingId, headingText, guideTitle }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(slug, headingId))
  }, [slug, headingId])

  function toggle() {
    const id = `${slug}-${headingId}`
    if (saved) {
      removeBookmark(id)
      setSaved(false)
    } else {
      addBookmark({ slug, headingId, headingText, guideTitle })
      setSaved(true)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      className={`ml-2 opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${saved ? 'opacity-100 text-brand-600 dark:text-brand-400' : 'text-gray-400'}`}
    >
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </button>
  )
}
```

- [ ] **Step 2: Create `app/bookmarks/page.tsx`**

```tsx
// app/bookmarks/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookmarkCheck, Trash2 } from 'lucide-react'
import { getBookmarks, removeBookmark, type Bookmark } from '@/lib/storage'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks().sort((a, b) => b.savedAt - a.savedAt))
  }, [])

  function remove(id: string) {
    removeBookmark(id)
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Bookmarks</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{bookmarks.length} saved</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookmarkCheck size={40} className="mx-auto mb-3 opacity-30" />
          <p>No bookmarks yet.</p>
          <p className="text-sm mt-1">Hover over headings in any guide to bookmark them.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map(b => (
            <li key={b.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div>
                <Link
                  href={`/guide/${b.slug}#${b.headingId}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {b.headingText}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{b.guideTitle}</p>
              </div>
              <button
                onClick={() => remove(b.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Test bookmarks page**

```bash
npm run dev
# Open /bookmarks — shows empty state
```

Expected: Clean empty state with icon and instructions.

- [ ] **Step 4: Commit**

```bash
git add components/BookmarkButton.tsx app/bookmarks/
git commit -m "feat: bookmarks — save headings, list at /bookmarks"
```

---

## Task 13: Notes

**Files:**
- Create: `components/NotesPad.tsx`
- Modify: `app/guide/[slug]/page.tsx`

- [ ] **Step 1: Create `components/NotesPad.tsx`**

```tsx
// components/NotesPad.tsx
'use client'
import { useState, useEffect } from 'react'
import { StickyNote } from 'lucide-react'
import { getNotes, setNotes } from '@/lib/storage'

export function NotesPad({ slug }: { slug: string }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setText(getNotes(slug))
  }, [slug])

  function handleChange(val: string) {
    setText(val)
    setSaved(false)
  }

  function handleBlur() {
    setNotes(slug, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <StickyNote size={15} />
          My Notes
        </div>
        <span className={`text-xs transition-opacity ${saved ? 'opacity-100 text-green-500' : 'opacity-0'}`}>
          Saved ✓
        </span>
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your notes for this guide here... (auto-saves)"
        rows={5}
        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-700 transition-shadow"
      />
      <p className="text-right text-xs text-gray-400 mt-1">{text.length} chars</p>
    </div>
  )
}
```

- [ ] **Step 2: Add NotesPad to guide page**

In `app/guide/[slug]/page.tsx`, add at the bottom of `<article>`:

```tsx
// Add import:
import { NotesPad } from '@/components/NotesPad'

// Add before closing </article>:
<NotesPad slug={slug} />
```

- [ ] **Step 3: Test notes**

```bash
npm run dev
# Open a guide, scroll to bottom, type in notes, click away
# Reload page — notes should persist
```

- [ ] **Step 4: Commit**

```bash
git add components/NotesPad.tsx app/guide/
git commit -m "feat: per-guide notes with localStorage auto-save"
```

---

## Task 14: Table of Contents

**Files:**
- Create: `components/TableOfContents.tsx`
- Modify: `app/guide/[slug]/page.tsx`

- [ ] **Step 1: Create `components/TableOfContents.tsx`**

```tsx
// components/TableOfContents.tsx
'use client'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('article h2, article h3'))
    const items: TocItem[] = headings.map(h => ({
      id: h.id,
      text: h.textContent ?? '',
      level: parseInt(h.tagName[1]),
    }))
    setToc(items)

    // Intersection observer for active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
          On this page
        </p>
        <nav>
          <ul className="space-y-1">
            {toc.map(item => (
              <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                <a
                  href={`#${item.id}`}
                  className={`block text-xs py-1 transition-colors truncate ${
                    active === item.id
                      ? 'text-brand-600 dark:text-brand-400 font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Add TOC to guide page layout**

In `app/guide/[slug]/page.tsx`, wrap content with a flex layout:

```tsx
// Add import:
import { TableOfContents } from '@/components/TableOfContents'

// Wrap the return in a flex container:
return (
  <div className="flex gap-12">
    <article className="flex-1 min-w-0">
      <ProgressTracker slug={slug} />
      {/* ... existing content ... */}
      <NotesPad slug={slug} />
    </article>
    <TableOfContents />
  </div>
)
```

- [ ] **Step 3: Add IDs to headings in markdown**

In `components/GuideContent.tsx`, add rehype-slug to auto-generate heading IDs:

```bash
npm install rehype-slug
```

```tsx
// Add import:
import rehypeSlug from 'rehype-slug'

// Add to rehypePlugins array:
rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
```

- [ ] **Step 4: Test TOC**

```bash
npm run dev
# Open docker guide — TOC should appear on right (xl screens)
# Scroll — active heading highlights in TOC
```

- [ ] **Step 5: Commit**

```bash
git add components/TableOfContents.tsx app/guide/ components/GuideContent.tsx
git commit -m "feat: table of contents with active heading tracking"
```

---

## Task 15: Mobile Responsive + Final Polish

**Files:**
- Create: `components/MobileSidebarToggle.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/Sidebar.tsx`

- [ ] **Step 1: Create `components/MobileSidebarToggle.tsx`**

```tsx
// components/MobileSidebarToggle.tsx
'use client'
import { Menu, X } from 'lucide-react'

interface Props {
  open: boolean
  onToggle: () => void
}

export function MobileSidebarToggle({ open, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle menu"
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}
```

- [ ] **Step 2: Update `app/layout.tsx` for mobile sidebar**

```tsx
// app/layout.tsx
'use client'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/TopNav'
import { Sidebar } from '@/components/Sidebar'
import { SearchModal } from '@/components/SearchModal'
import { MobileSidebarToggle } from '@/components/MobileSidebarToggle'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex items-center gap-2 fixed top-0 left-0 z-50 px-4 h-14 md:hidden">
          <MobileSidebarToggle open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />
        </div>
        <TopNav onSearchOpen={() => setSearchOpen(true)} />

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex max-w-screen-2xl mx-auto">
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 transition-transform duration-200`}>
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
          <main className="flex-1 min-w-0 px-4 md:px-8 py-8">
            {children}
          </main>
        </div>

        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Add `onNavigate` prop to Sidebar**

In `components/Sidebar.tsx`, add the prop and call it on link click:

```tsx
// Update Sidebar signature:
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  // ...
}

// Update CategorySection signature:
function CategorySection({ ..., onNavigate }: { ...; onNavigate?: () => void }) {
  // ...
}

// Add onClick on each Link:
<Link
  href={`/guide/${guide.slug}`}
  onClick={onNavigate}
  className={...}
>
```

- [ ] **Step 4: Final check — run build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Note any warnings to address.

- [ ] **Step 5: Test on mobile viewport**

```bash
npm run dev
# Open DevTools → mobile viewport (375px width)
# Test: hamburger opens sidebar, nav links work, search works
```

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: mobile sidebar, responsive layout — complete guides website"
```

---

## Deployment (Vercel)

When ready to deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Or: Push to GitHub → Connect repo in vercel.com → Auto-deploys on every push to main.

**Note:** Since guides are read from the filesystem at build time (`process.cwd() + '/..`), Vercel needs the guide files present. Options:
1. Include guides in the `website/` repo (copy files)
2. Make `website/` a subfolder of a monorepo that includes GUIDES
3. Commit all files together to GitHub

**Recommended:** Copy the `.md` files into `website/content/` and update `GUIDES_DIR` in `lib/guides.ts`:
```typescript
const GUIDES_DIR = path.join(process.cwd(), 'content')
```

---

*Plan complete. All 15 tasks cover: bootstrap → content layer → storage → home → layout → sidebar → topnav → guide rendering → search → progress → bookmarks → notes → TOC → mobile → deploy.*
