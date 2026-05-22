import { getAllGuides } from '@/lib/guides'
import { NextResponse } from 'next/server'

export async function GET() {
  const guides = getAllGuides()
  const index = guides.map(g => ({
    slug: g.slug,
    title: g.title,
    category: g.category,
    content: g.content.slice(0, 5000),
  }))
  return NextResponse.json(index)
}
