import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { SITE, MAPS_DIRECTIONS_URL } from '../../data/content'

export function Footer() {
  const { t } = useLanguage()
  const phoneHref = `tel:${SITE.phone.replace(/[^\d+]/g, '')}`

  return (
    <footer className="border-t border-muted/10 bg-cream-muted">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 md:grid-cols-3 md:px-16">
        <div>
          <p className="font-serif text-xl font-bold text-primary">{t.brand}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            {t.footer.about}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] text-ink">
            {t.footer.info}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link to="/lien-he" className="transition hover:text-primary">
                {t.footer.address}
              </Link>
            </li>
            <li>
              <a href={phoneHref} className="transition hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-primary"
              >
                Google Maps
              </a>
            </li>
            <li>
              <Link to="/tham-quan" className="transition hover:text-primary">
                {t.footer.rules}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] text-ink">
            {t.footer.copyright}
          </h4>
          <p className="mt-4 text-sm leading-6 text-muted">
            {t.footer.copyrightText}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {t.footer.official}
          </div>
        </div>
      </div>
    </footer>
  )
}
