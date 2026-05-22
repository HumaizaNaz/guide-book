'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { CATEGORIES, GUIDE_META, type Category } from '@/lib/categories'
import { getAllProgress, type GuideProgress } from '@/lib/storage'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [progress, setProgress] = useState<Record<string, GuideProgress>>({})
  const totalGuides = GUIDE_META.length
  const readCount = Object.values(progress).filter(p => p.read).length

  useEffect(() => {
    setProgress(getAllProgress())

    const handler = () => setProgress(getAllProgress())
    window.addEventListener('storage', handler)
    window.addEventListener('progress-updated', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('progress-updated', handler)
    }
  }, [])

  return (
    <aside className="w-64 shrink-0 flex flex-col sticky top-14 h-[calc(100vh-56px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-4">
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
            onNavigate={onNavigate}
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
  onNavigate,
}: {
  category: Category
  pathname: string
  progress: Record<string, GuideProgress>
  onNavigate?: () => void
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
                onClick={onNavigate}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors group ${
                  isActive
                    ? 'bg-brand-50 dark:bg-blue-900/20 text-brand-700 dark:text-brand-400 font-medium'
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
    'seo-discovery-guide': 'SEO Discovery & Indexing',
  }
  return titles[slug] ?? slug
}
