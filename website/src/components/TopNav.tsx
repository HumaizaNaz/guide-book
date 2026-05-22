'use client'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

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
          <span>Search guides...</span>
          <kbd className="hidden sm:inline text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2">
          <Link href="/bookmarks" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Bookmarks
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
