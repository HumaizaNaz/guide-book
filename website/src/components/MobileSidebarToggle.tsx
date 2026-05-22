'use client'
import { Menu, X } from 'lucide-react'

interface Props {
  open: boolean
  onToggle: () => void
}

export function MobileSidebarToggle({ open, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle menu"
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}
