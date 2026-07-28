import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Locale, type Translations } from './translations'

type LanguageContextValue = {
  locale: Locale
  t: Translations
  toggleLocale: () => void
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'chienkhud-locale'

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'vn' || v === 'en') return v
  } catch {
    /* private mode / SSR */
  }
  return 'vn'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale === 'vn' ? 'vi' : 'en'
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'vn' ? 'en' : 'vn'))
  }, [])

  const value = useMemo(
    () => ({
      locale,
      t: translations[locale],
      toggleLocale,
      setLocale,
    }),
    [locale, toggleLocale, setLocale],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
