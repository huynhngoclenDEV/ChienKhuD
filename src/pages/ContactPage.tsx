import { type ReactNode } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE, MAPS_DIRECTIONS_URL } from '../data/content'
import { MapEmbed } from '../components/ui/MapEmbed'
import { Reveal } from '../components/ui/Reveal'
import heroContact from '../assets/images/hero-contact.jpg'

export function ContactPage() {
  const { t } = useLanguage()

  const phoneHref = `tel:${SITE.phone.replace(/[^\d+]/g, '')}`
  const emailHref = SITE.email ? `mailto:${SITE.email}` : phoneHref

  return (
    <div>
      <section className="relative flex min-h-[400px] items-end overflow-hidden md:min-h-[560px]">
        <img
          src={heroContact}
          alt=""
          className="absolute inset-0 size-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-16 pt-32 animate-fade-up md:px-16">
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            {t.contact.eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-[56px]">
            {t.contact.title}
            <br />
            {t.contact.titleLine2}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-16">
        <Reveal className="relative mx-auto max-w-2xl overflow-hidden border border-muted/15 bg-cream-muted p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/5" />
          <h2 className="font-serif text-3xl font-semibold text-ink">
            {t.contact.infoTitle}
          </h2>
          <p className="mt-4 text-base leading-6 text-muted">{t.contact.infoDesc}</p>
          <ul className="mt-10 space-y-8">
            <InfoRow
              label={t.contact.addressLabel}
              value={t.contact.address}
              icon={
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor">
                  <path d="M8 0C3.6 0 0 3.6 0 8c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              }
            />
            <InfoRow
              label={t.contact.phoneLabel}
              value={t.contact.phone}
              href={phoneHref}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
                </svg>
              }
            />
            <InfoRow
              label={t.contact.emailLabel}
              value={t.contact.emailValue}
              icon={
                <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
                  <path d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V2l8 5 8-5v2z" />
                </svg>
              }
            />
          </ul>
          <div className="mt-10 border-t border-muted/20 pt-8">
            <p className="text-xs font-semibold tracking-[0.15em] text-ink">
              {t.contact.follow}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={phoneHref}
                className="flex h-12 items-center justify-center border border-muted/20 px-4 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                {t.contact.call}
              </a>
              <a
                href={emailHref}
                className="flex h-12 items-center justify-center border border-muted/20 px-4 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                {t.contact.emailUs}
              </a>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center border border-muted/20 px-4 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                {t.contact.maps}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="overflow-hidden">
        <MapEmbed
          heightClass="h-[420px] md:h-[500px]"
          directionsLabel={t.contact.directions}
        />
      </section>
    </div>
  )
}

function InfoRow({
  label,
  value,
  icon,
  href,
}: {
  label: string
  value: string
  icon: ReactNode
  href?: string
}) {
  return (
    <li className="flex gap-6">
      <span className="flex size-12 shrink-0 items-center justify-center bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-1 block text-sm leading-6 text-muted transition hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-sm leading-6 text-muted">{value}</p>
        )}
      </div>
    </li>
  )
}
