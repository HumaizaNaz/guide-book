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
