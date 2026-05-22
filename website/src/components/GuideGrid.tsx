'use client'
import { useState } from 'react'
import { GuideCard } from '@/components/GuideCard'
import { CATEGORIES } from '@/lib/categories'
import { GUIDE_TAGS, ALL_TAGS } from '@/lib/tags'
import type { Guide } from '@/lib/guides'

const TAG_LABELS: Record<string, string> = {
  frontend: 'Frontend', backend: 'Backend', devops: 'DevOps',
  database: 'Database', testing: 'Testing', seo: 'SEO',
  auth: 'Auth', performance: 'Performance', typescript: 'TypeScript',
  git: 'Git', docker: 'Docker', ai: 'AI',
}

export function GuideGrid({ guides }: { guides: Guide[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? guides.filter(g => GUIDE_TAGS[g.slug]?.includes(activeTag))
    : guides

  const categoriesWithGuides = CATEGORIES.filter(cat =>
    filtered.some(g => g.category === cat)
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTag === null
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
      </div>

      {categoriesWithGuides.length === 0 && (
        <p className="text-gray-500 text-sm">No guides match this filter.</p>
      )}
      {categoriesWithGuides.map(category => {
        const categoryGuides = filtered.filter(g => g.category === category)
        return (
          <section key={category} className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryGuides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
