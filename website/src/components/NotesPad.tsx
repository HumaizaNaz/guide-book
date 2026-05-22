'use client'
import { useState, useEffect } from 'react'
import { StickyNote } from 'lucide-react'
import { getNotes, setNotes } from '@/lib/storage'

export function NotesPad({ slug }: { slug: string }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setText(getNotes(slug))
  }, [slug])

  function handleChange(val: string) {
    setText(val)
    setSaved(false)
  }

  function handleBlur() {
    setNotes(slug, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="notes-pad mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <StickyNote size={15} />
          My Notes
        </div>
        <span className={`text-xs transition-opacity ${saved ? 'opacity-100 text-green-500' : 'opacity-0'}`}>
          Saved ✓
        </span>
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your notes for this guide here... (auto-saves)"
        rows={5}
        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-700 transition-shadow"
      />
      <p className="text-right text-xs text-gray-400 mt-1">{text.length} chars</p>
    </div>
  )
}
