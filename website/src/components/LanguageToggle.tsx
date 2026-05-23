'use client'
import { Languages } from 'lucide-react'
import { useLang } from '@/lib/language-context'

export function LanguageToggle() {
  const { lang, setLang } = useLang()
  const isEnglish = lang === 'en'

  return (
    <button
      onClick={() => setLang(isEnglish ? 'ur' : 'en')}
      title={isEnglish ? 'Switch to Urdu' : 'Translate to English'}
      className={`flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium transition-colors ${
        isEnglish
          ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 hover:bg-brand-200 dark:hover:bg-brand-900/50'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
      }`}
    >
      <Languages size={14} />
      <span className="hidden sm:inline">{isEnglish ? 'اردو' : 'EN'}</span>
    </button>
  )
}
