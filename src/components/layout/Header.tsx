import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

const links = [
  { to: '/', key: 'home' as const },
  { to: '/lich-su', key: 'history' as const },
  { to: '/tham-quan', key: 'visit' as const },
  { to: '/audio', key: 'audio' as const },
  { to: '/thu-vien', key: 'gallery' as const },
  { to: '/lien-he', key: 'contact' as const },
]

type HeaderProps = {
  variant?: 'light' | 'dark' | 'overlay'
}

/** Ignore nav clicks that fire right after a scroll (mobile/trackpad ghost clicks). */
const SCROLL_CLICK_GUARD_MS = 450

export function Header({ variant = 'light' }: HeaderProps) {
  const { t, locale, toggleLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const lastScrollAt = useRef(0)

  useEffect(() => {
    const mark = () => {
      lastScrollAt.current = performance.now()
    }
    window.addEventListener('scroll', mark, { passive: true })
    return () => window.removeEventListener('scroll', mark)
  }, [])

  function guardNavClick(e: MouseEvent) {
    if (performance.now() - lastScrollAt.current < SCROLL_CLICK_GUARD_MS) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const isDark = variant === 'dark' || variant === 'overlay'
  const text = isDark ? 'text-white' : 'text-ink'
  const muted = isDark ? 'text-white/80' : 'text-muted'
  const logo = isDark ? 'text-white' : 'text-primary'
  const border = isDark ? 'border-white/10' : 'border-muted/15'
  const bg =
    variant === 'overlay'
      ? 'bg-gradient-to-b from-black/55 to-transparent border-transparent'
      : variant === 'dark'
        ? 'bg-jungle'
        : 'bg-cream/95 backdrop-blur-sm'

  return (
    <header
      className={`z-40 w-full border-b ${border} ${bg} ${
        variant === 'overlay' ? 'fixed inset-x-0 top-0' : 'sticky top-0'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-16">
        <Link
          to="/"
          onClick={guardNavClick}
          className={`font-serif text-xl font-bold tracking-tight md:text-2xl ${logo}`}
        >
          {t.brand}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={guardNavClick}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : `${muted} hover:text-primary`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t.nav[link.key]}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            className={`text-sm font-semibold tracking-wide ${
              isDark ? 'text-white' : 'text-primary'
            }`}
            aria-label="Toggle language"
          >
            <span className={locale === 'vn' ? 'opacity-100' : 'opacity-40'}>
              VN
            </span>
            <span className="mx-0.5 opacity-50">/</span>
            <span className={locale === 'en' ? 'opacity-100' : 'opacity-40'}>
              EN
            </span>
          </button>

          <button
            type="button"
            className={`lg:hidden ${text}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className={`animate-menu-in border-t px-4 py-4 lg:hidden ${
            isDark
              ? 'border-white/10 bg-jungle/95 text-white'
              : 'border-muted/10 bg-cream'
          }`}
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={(e) => {
                  guardNavClick(e)
                  setOpen(false)
                }}
                className={({ isActive }) =>
                  `py-2 text-sm font-medium ${
                    isActive
                      ? 'text-primary'
                      : isDark
                        ? 'text-white/80'
                        : 'text-muted'
                  }`
                }
              >
                {t.nav[link.key]}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
