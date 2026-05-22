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
      <div className="sticky top-20 max-h-[calc(100vh-96px)] flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 shrink-0">
          On this page
        </p>
        <nav className="overflow-y-auto flex-1 pr-1">
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
