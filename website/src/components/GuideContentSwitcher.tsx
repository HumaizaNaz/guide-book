'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { ClientMarkdown } from './ClientMarkdown'
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
    if (error) return <ClientMarkdown content={urduContent} />
    if (!enContent) return (
      <div className="flex items-center gap-2 py-12 text-gray-400">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading English content...</span>
      </div>
    )
    return <ClientMarkdown content={enContent} />
  }

  return <ClientMarkdown content={urduContent} />
}
