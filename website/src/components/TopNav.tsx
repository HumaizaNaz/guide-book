'use client'
import Link from 'next/link'
import { Search, Bookmark } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'

interface TopNavProps {
  onSearchOpen: () => void
  onMenuToggle?: () => void
}

export function TopNav({ onSearchOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white hover:text-brand-600 transition-colors pl-8 md:pl-0">
          DevGuides
        </Link>

        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Search size={14} />
          <span className="hidden md:inline">Search guides...</span>
          <kbd className="hidden sm:inline text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2">
          <Link href="/exam" className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            <span className="hidden md:inline">📘 Study Notes</span>
            <span className="md:hidden">📘</span>
          </Link>
          <Link href="/final-exam" className="flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <span className="hidden md:inline">🔥 Practice Quiz</span>
            <span className="md:hidden">🔥</span>
          </Link>
          <Link href="/bookmarks" className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bookmark size={15} className="md:hidden" />
            <span className="hidden md:inline">Bookmarks</span>
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
