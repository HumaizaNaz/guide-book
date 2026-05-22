'use client'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { TopNav } from '@/components/TopNav'
import { Sidebar } from '@/components/Sidebar'
import { SearchModal } from '@/components/SearchModal'
import { MobileSidebarToggle } from '@/components/MobileSidebarToggle'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="fixed top-0 left-0 z-50 flex items-center h-14 px-2 md:hidden">
          <MobileSidebarToggle open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />
        </div>

        <TopNav onSearchOpen={() => setSearchOpen(true)} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex max-w-screen-2xl mx-auto">
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed top-14 left-0 h-[calc(100vh-56px)] md:static md:h-auto z-40 transition-transform duration-200`}>
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
          <main className="flex-1 min-w-0 px-4 md:px-8 py-8">
            {children}
          </main>
        </div>

        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </body>
    </html>
  )
}
