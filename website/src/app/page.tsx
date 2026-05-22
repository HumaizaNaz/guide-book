import { getAllGuides } from '@/lib/guides'
import { CATEGORIES } from '@/lib/categories'
import { GuideCard } from '@/components/GuideCard'

export default function HomePage() {
  const allGuides = getAllGuides()
  const total = allGuides.length

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Developer Guides
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {total} guides — Docker, servers, domains, CI/CD, databases, AI tools, testing, and more. Updated 2026.
        </p>
      </div>

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
