'use client'
import { useEffect } from 'react'
import { setProgress, markAsRead } from '@/lib/storage'

export function ProgressTracker({ slug }: { slug: string }) {
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop + window.innerHeight
      const total = el.scrollHeight
      const percent = Math.round((scrolled / total) * 100)

      setProgress(slug, { scrollPercent: percent })

      if (percent >= 80) {
        markAsRead(slug)
        window.dispatchEvent(new Event('progress-updated'))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  return null
}
