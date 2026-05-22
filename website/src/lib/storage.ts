'use client'

export interface GuideProgress {
  read: boolean
  scrollPercent: number
  lastVisited: number
}

export interface Bookmark {
  id: string
  slug: string
  headingId: string
  headingText: string
  guideTitle: string
  savedAt: number
}

export function getProgress(slug: string): GuideProgress {
  if (typeof window === 'undefined') return { read: false, scrollPercent: 0, lastVisited: 0 }
  const raw = localStorage.getItem(`progress-${slug}`)
  if (!raw) return { read: false, scrollPercent: 0, lastVisited: 0 }
  return JSON.parse(raw) as GuideProgress
}

export function setProgress(slug: string, data: Partial<GuideProgress>): void {
  if (typeof window === 'undefined') return
  const current = getProgress(slug)
  localStorage.setItem(`progress-${slug}`, JSON.stringify({
    ...current,
    ...data,
    lastVisited: Date.now(),
  }))
}

export function markAsRead(slug: string): void {
  setProgress(slug, { read: true, scrollPercent: 100 })
}

export function getAllProgress(): Record<string, GuideProgress> {
  if (typeof window === 'undefined') return {}
  const result: Record<string, GuideProgress> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('progress-')) {
      const slug = key.replace('progress-', '')
      result[slug] = JSON.parse(localStorage.getItem(key)!)
    }
  }
  return result
}

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('bookmarks')
  if (!raw) return []
  return JSON.parse(raw) as Bookmark[]
}

export function addBookmark(bookmark: Omit<Bookmark, 'id' | 'savedAt'>): void {
  const bookmarks = getBookmarks()
  const id = `${bookmark.slug}-${bookmark.headingId}`
  if (bookmarks.find(b => b.id === id)) return
  bookmarks.push({ ...bookmark, id, savedAt: Date.now() })
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter(b => b.id !== id)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}

export function isBookmarked(slug: string, headingId: string): boolean {
  return getBookmarks().some(b => b.id === `${slug}-${headingId}`)
}

export function getNotes(slug: string): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(`notes-${slug}`) ?? ''
}

export function setNotes(slug: string, text: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`notes-${slug}`, text)
}
