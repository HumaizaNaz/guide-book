'use client'
import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { addBookmark, removeBookmark, isBookmarked } from '@/lib/storage'

interface BookmarkButtonProps {
  slug: string
  headingId: string
  headingText: string
  guideTitle: string
}

export function BookmarkButton({ slug, headingId, headingText, guideTitle }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(slug, headingId))
  }, [slug, headingId])

  function toggle() {
    const id = `${slug}-${headingId}`
    if (saved) {
      removeBookmark(id)
      setSaved(false)
    } else {
      addBookmark({ slug, headingId, headingText, guideTitle })
      setSaved(true)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      className={`ml-2 opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${saved ? 'opacity-100 text-brand-600 dark:text-brand-400' : 'text-gray-400'}`}
    >
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </button>
  )
}
