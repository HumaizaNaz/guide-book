'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { GuideContent } from './GuideContent'
import { Loader2 } from 'lucide-react'

interface Props {
  slug: string
  urduContent: string
}

export function GuideContentSwitcher({ slug, urduContent }: Props) {
  const { lang } = useLang()
  const [enContent, setEnContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (lang !== 'en' || enContent) return
    setLoading(true)
    setError(false)
    fetch(`/api/guide/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.content) setEnContent(d.content)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [lang, slug, enContent])

  if (lang === 'en') {
    if (loading) return (
      <div className="flex items-center gap-2 py-12 text-gray-400">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading English content...</span>
      </div>
    )
    if (error) return (
      <div className="py-8 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-4">
        English version not available yet. Showing original.
        <div className="mt-4"><GuideContent content={urduContent} /></div>
      </div>
    )
    if (enContent) return <GuideContent content={enContent} />
  }

  return <GuideContent content={urduContent} />
}
