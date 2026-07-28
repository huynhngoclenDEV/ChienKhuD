import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary">404</p>
      <h1 className="mt-4 font-serif text-4xl font-bold text-ink">{t.notFound.title}</h1>
      <p className="mt-4 text-base leading-7 text-muted">{t.notFound.desc}</p>
      <Link
        to="/"
        className="mt-10 bg-primary px-8 py-3.5 text-sm font-semibold tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
      >
        {t.notFound.home}
      </Link>
    </div>
  )
}
