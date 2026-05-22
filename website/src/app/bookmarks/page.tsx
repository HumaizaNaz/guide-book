'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookmarkCheck, Trash2 } from 'lucide-react'
import { getBookmarks, removeBookmark, type Bookmark } from '@/lib/storage'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    setBookmarks(getBookmarks().sort((a, b) => b.savedAt - a.savedAt))
  }, [])

  function remove(id: string) {
    removeBookmark(id)
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Bookmarks</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{bookmarks.length} saved</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <BookmarkCheck size={40} className="mx-auto mb-3 opacity-30" />
          <p>No bookmarks yet.</p>
          <p className="text-sm mt-1">Hover over headings in any guide to bookmark them.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map(b => (
            <li key={b.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div>
                <Link
                  href={`/guide/${b.slug}#${b.headingId}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {b.headingText}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{b.guideTitle}</p>
              </div>
              <button
                onClick={() => remove(b.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
