'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Lang = 'ur' | 'en'

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
}>({ lang: 'ur', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ur')

  useEffect(() => {
    const saved = localStorage.getItem('site-lang') as Lang | null
    if (saved === 'en' || saved === 'ur') setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('site-lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
