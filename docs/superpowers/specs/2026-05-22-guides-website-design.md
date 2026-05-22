# Guides Website — Design Spec
*Date: 2026-05-22*

## Overview

A Next.js documentation website that renders the 17 markdown guides from the GUIDES folder into a clean, searchable, interactive web app — published online, publicly accessible.

---

## Goals

- Render all 17 markdown guides as a polished website
- Clean minimal light theme (Notion/Tailwind docs style)
- Search, progress tracking, bookmarks, notes — all client-side
- No auth — publicly accessible
- Deploy-ready (Vercel or VPS)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS + shadcn/ui |
| Markdown | gray-matter + next-mdx-remote |
| Syntax highlight | Shiki |
| Search | Fuse.js (client-side) |
| State | localStorage (progress, bookmarks, notes) |
| Deploy | Vercel (recommended) |

---

## Project Structure

```
guides-website/
  app/
    layout.tsx           ← Root layout (sidebar + nav)
    page.tsx             ← Home (guide index grid)
    guide/
      [slug]/
        page.tsx         ← Individual guide
    search/
      page.tsx           ← Search results
    bookmarks/
      page.tsx           ← Saved bookmarks
  components/
    Sidebar.tsx          ← Left sidebar, category nav, progress
    TopNav.tsx           ← Search trigger, dark/light toggle
    GuideContent.tsx     ← Rendered markdown + TOC
    SearchModal.tsx      ← Ctrl+K command palette search
    CodeBlock.tsx        ← Syntax highlight + copy button
    ProgressBar.tsx      ← Reading progress
    BookmarkButton.tsx   ← Bookmark toggle on headings
    NotesPad.tsx         ← Per-guide personal notes
  lib/
    guides.ts            ← Read + parse all .md files
    search.ts            ← Fuse.js index builder
    storage.ts           ← localStorage helpers (progress, bookmarks, notes)
  content/               ← Symlink or copy of GUIDES/*.md files
  public/
```

---

## Routes

| Route | Page |
|-------|------|
| `/` | Home — guide cards grid (title, description, read time, category) |
| `/guide/[slug]` | Full guide (sidebar + markdown + TOC + notes) |
| `/search` | Search results |
| `/bookmarks` | All saved bookmarks |

---

## Layout (Every Page)

```
┌──────────────────────────────────────────────────────┐
│  TOP NAV: Logo "DevGuides" | Search (Ctrl+K) | 🌙    │
├────────────────┬─────────────────────────────────────┤
│                │                                     │
│  SIDEBAR       │   MAIN CONTENT                     │
│  (260px)       │                                     │
│                │   Guide title + metadata            │
│  Categories    │   ───────────────                   │
│  > Foundation  │   Rendered markdown                 │
│  > Deploy      │   with Shiki code blocks           │
│  > Quality     │   copy buttons                     │
│  > Tools       │   anchor links                     │
│                │                                     │
│  Each guide:   │   ───────────────                   │
│  ✓ Read        │   Notes section                    │
│  ◐ In progress │                                     │
│  ○ Unread      │                                     │
│                │                                     │
│  [14/17 read]  │                                     │
└────────────────┴─────────────────────────────────────┘
Mobile: sidebar hidden, hamburger menu
```

---

## Features Detail

### 1. Guide Rendering
- gray-matter parses frontmatter (title, description, category, readTime)
- next-mdx-remote renders markdown to React
- Shiki for syntax highlighting (github-light theme)
- Custom CodeBlock component with copy button
- Headings get anchor IDs automatically

### 2. Sidebar
- Guides grouped by category: Foundation / Deploy & Infra / Quality & Tools / Visibility
- Each guide shows: title + read/unread/in-progress icon
- Footer: "X/17 guides completed" progress bar
- Sticky, scrollable independently
- Collapsible on mobile

### 3. Search (Fuse.js)
- All guide content indexed at build time
- `Ctrl+K` opens command palette modal
- Real-time fuzzy search as user types
- Results show: guide title + matching snippet
- Click → navigate to guide

### 4. Progress Tracking (localStorage)
- Key: `guide-progress-{slug}` → `{ read: boolean, scrollPercent: number }`
- Auto-marks as read when user scrolls to 80% of guide
- Sidebar icons update live
- Home page shows overall progress

### 5. Bookmarks (localStorage)
- Key: `bookmarks` → array of `{ slug, headingId, headingText, guideTitle }`
- Bookmark icon appears on hover next to each heading
- `/bookmarks` page lists all with links
- Toggle — click again to remove

### 6. Notes (localStorage)
- Key: `notes-{slug}` → string
- Textarea at bottom of each guide
- Auto-saves on blur (no save button needed)
- Character count shown

### 7. Dark/Light Toggle
- System preference default
- Manual toggle saved to localStorage
- Tailwind `dark:` classes

---

## Guides Mapping

| File | Slug | Category |
|------|------|----------|
| 01_WEB_APP_FUNDAMENTALS.md | web-app-fundamentals | Foundation |
| 02_FRONTEND_GUIDE.md | frontend-guide | Foundation |
| 03_BACKEND_GUIDE.md | backend-guide | Foundation |
| 10_GIT_WORKFLOW_GUIDE.md | git-workflow | Foundation |
| 11_DATABASE_GUIDE.md | database-guide | Foundation |
| 04_DEPLOYMENT_GUIDE.md | deployment-guide | Deploy & Infra |
| 06_DOCKER_GUIDE.md | docker-guide | Deploy & Infra |
| 07_SERVER_VPS_GUIDE.md | server-vps-guide | Deploy & Infra |
| 08_DOMAIN_HOSTING_GUIDE.md | domain-hosting-guide | Deploy & Infra |
| 09_CICD_DEVOPS_GUIDE.md | cicd-devops-guide | Deploy & Infra |
| 05_PERFORMANCE_GUIDE.md | performance-guide | Quality & Tools |
| 13_TESTING_GUIDE.md | testing-guide | Quality & Tools |
| 14_DEVELOPER_TOOLKIT_GUIDE.md | developer-toolkit | Quality & Tools |
| 12_AI_TOOLS_GUIDE.md | ai-tools-guide | Quality & Tools |
| SEO_MASTER_GUIDE.md | seo-master-guide | Visibility |
| SEO_CHECKLIST.md | seo-checklist | Visibility |

---

## Non-Goals (Out of Scope)

- User accounts or auth
- Backend database
- Comments system
- Admin panel
- Multi-language support
