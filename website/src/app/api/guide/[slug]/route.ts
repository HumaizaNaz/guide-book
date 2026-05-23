import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const guidesDir = path.join(process.cwd(), 'guides', 'en')

  if (!fs.existsSync(guidesDir)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // File is named EN_<slug>.md
  const filePath = path.join(guidesDir, `EN_${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)

  // Strip first heading
  const stripped = content.replace(/^#\s+.+\n?/, '').trimStart()

  return NextResponse.json({ content: stripped })
}
