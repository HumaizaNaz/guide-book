import { getAllGuides } from '@/lib/guides'
import { GuideGrid } from '@/components/GuideGrid'

export default function HomePage() {
  const allGuides = getAllGuides()
  const total = allGuides.length

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Developer Guides
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {total} guides — Docker, servers, domains, CI/CD, databases, AI tools, testing, and more. Updated 2026.
        </p>
      </div>

      <GuideGrid guides={allGuides} />
    </div>
  )
}
