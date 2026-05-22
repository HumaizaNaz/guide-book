import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { GuideMeta } from '@/lib/categories'

const categoryColors: Record<string, string> = {
  'Foundation': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Deploy & Infra': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Quality & Tools': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Visibility': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

const readTimes: Record<string, string> = {
  'web-app-fundamentals': '15 min', 'frontend-guide': '20 min', 'backend-guide': '20 min',
  'git-workflow': '20 min', 'database-guide': '25 min', 'deployment-guide': '10 min',
  'docker-guide': '25 min', 'server-vps-guide': '25 min', 'domain-hosting-guide': '20 min',
  'cicd-devops-guide': '20 min', 'performance-guide': '15 min', 'testing-guide': '20 min',
  'developer-toolkit': '15 min', 'ai-tools-guide': '20 min', 'seo-master-guide': '30 min',
  'seo-checklist': '5 min', 'seo-discovery-guide': '25 min', 'typescript-guide': '20 min',
  'auth-guide': '20 min', 'payments-guide': '20 min', 'monitoring-guide': '15 min',
}

const shortTitles: Record<string, string> = {
  'web-app-fundamentals': 'Web App Fundamentals', 'frontend-guide': 'Frontend Guide',
  'backend-guide': 'Backend Guide', 'git-workflow': 'Git Workflow',
  'database-guide': 'Database Guide', 'deployment-guide': 'Deployment (Vercel)',
  'docker-guide': 'Docker Guide', 'server-vps-guide': 'Server & VPS',
  'domain-hosting-guide': 'Domain & Hosting', 'cicd-devops-guide': 'CI/CD & DevOps',
  'performance-guide': 'Performance', 'testing-guide': 'Testing Guide',
  'developer-toolkit': 'Developer Toolkit', 'ai-tools-guide': 'AI Tools Guide',
  'seo-master-guide': 'SEO Master Guide', 'seo-checklist': 'SEO Checklist',
  'seo-discovery-guide': 'SEO Discovery & Indexing', 'typescript-guide': 'TypeScript Guide',
  'auth-guide': 'Auth Guide', 'payments-guide': 'Payments (Stripe)',
  'monitoring-guide': 'Monitoring Guide',
}

export function RelatedGuides({ guides }: { guides: GuideMeta[] }) {
  if (guides.length === 0) return null

  return (
    <section className="related-guides mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Continue Reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {guides.map(guide => (
          <Link
            key={guide.slug}
            href={`/guide/${guide.slug}`}
            className="group flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all"
          >
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full self-start mb-3 ${categoryColors[guide.category] ?? ''}`}>
              {guide.category}
            </span>
            <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-1">
              {shortTitles[guide.slug] ?? guide.slug}
            </span>
            <div className="flex items-center justify-between mt-3">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                {readTimes[guide.slug] ?? '15 min'}
              </span>
              <ArrowRight size={14} className="text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
