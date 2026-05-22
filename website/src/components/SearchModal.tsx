'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { buildSearchIndex, search, type SearchResult, type SearchIndex } from '@/lib/search'
import { GUIDE_META } from '@/lib/categories'

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

  useEffect(() => {
    if (indexed) return
    fetch('/api/search-index')
      .then(r => r.json())
      .then((data: SearchIndex[]) => {
        buildSearchIndex(data)
        setIndexed(true)
      })
  }, [indexed])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setResults([])
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

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

        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.slug}>
                <button
                  onClick={() => navigate(r.slug)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    i === selected ? 'bg-brand-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
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
          <p className="px-4 py-6 text-center text-sm text-gray-400">No results for &quot;{query}&quot;</p>
        )}

        {!query && (
          <p className="px-4 py-4 text-xs text-gray-400 text-center">Type to search all {GUIDE_META.length} guides</p>
        )}
      </div>
    </div>
  )
}
