import Fuse from 'fuse.js'

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
