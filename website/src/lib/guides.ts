import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { GUIDE_META, type Category, type GuideMeta } from './categories'

const GUIDES_DIR = path.join(process.cwd(), '..')

export interface Guide extends GuideMeta {
  title: string
  subtitle: string
  description: string
  readTime: string
  content: string
  wordCount: number
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled'
}

function extractSubtitle(content: string): string {
  const lines = content.split('\n').filter(l => l.trim())
  if (lines.length > 1) {
    return lines[1].replace(/^\*(.+)\*$/, '$1').trim()
  }
  return ''
}

function extractDescription(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('-') && !trimmed.startsWith('```')) {
      return trimmed.slice(0, 120) + (trimmed.length > 120 ? '...' : '')
    }
  }
  return ''
}

function stripFirstHeading(content: string): string {
  return content.replace(/^#\s+.+\n?/, '').trimStart()
}

export function getAllGuides(): Guide[] {
  return GUIDE_META.map(meta => {
    const filePath = path.join(GUIDES_DIR, meta.filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content } = matter(raw)
    const stats = readingTime(content)

    return {
      ...meta,
      title: extractTitle(content),
      subtitle: extractSubtitle(content),
      description: extractDescription(content),
      readTime: stats.text,
      wordCount: stats.words,
      content: stripFirstHeading(content),
    }
  })
}

export function getGuideBySlug(slug: string): Guide | undefined {
  const meta = GUIDE_META.find(g => g.slug === slug)
  if (!meta) return undefined

  const filePath = path.join(GUIDES_DIR, meta.filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  const stats = readingTime(content)

  return {
    ...meta,
    title: extractTitle(content),
    subtitle: extractSubtitle(content),
    description: extractDescription(content),
    readTime: stats.text,
    wordCount: stats.words,
    content: stripFirstHeading(content),
  }
}

export function getGuidesByCategory(category: Category): Guide[] {
  return getAllGuides().filter(g => g.category === category)
}

export function getAllSlugs(): string[] {
  return GUIDE_META.map(g => g.slug)
}

export function getRelatedGuides(slug: string): GuideMeta[] {
  const current = GUIDE_META.find(g => g.slug === slug)
  if (!current) return []

  const sameCategory = GUIDE_META.filter(
    g => g.category === current.category && g.slug !== slug
  )

  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3)
  }

  const others = GUIDE_META.filter(
    g => g.slug !== slug && !sameCategory.includes(g)
  ).sort((a, b) => Math.abs(a.order - current.order) - Math.abs(b.order - current.order))

  return [...sameCategory, ...others].slice(0, 3)
}
