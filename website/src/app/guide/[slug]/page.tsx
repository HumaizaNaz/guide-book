import { notFound } from 'next/navigation'
import { getAllSlugs, getGuideBySlug, getRelatedGuides } from '@/lib/guides'
import { GuideContent } from '@/components/GuideContent'
import { ProgressTracker } from '@/components/ProgressTracker'
import { NotesPad } from '@/components/NotesPad'
import { RelatedGuides } from '@/components/RelatedGuides'
import { TableOfContents } from '@/components/TableOfContents'
import { PrintButton } from '@/components/PrintButton'
import { Clock, BookOpen } from 'lucide-react'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return { title: `${guide.title} — DevGuides`, description: guide.description }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()
  const related = getRelatedGuides(slug)

  return (
    <div className="flex gap-12">
      <article className="flex-1 min-w-0">
        <ProgressTracker slug={slug} />

        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2 block">
            {guide.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {guide.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {guide.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              {guide.wordCount.toLocaleString()} words
            </span>
            <PrintButton />
          </div>
        </div>

        <GuideContent content={guide.content} />
        <NotesPad slug={slug} />
        <RelatedGuides guides={related} />
      </article>

      <TableOfContents />
    </div>
  )
}
