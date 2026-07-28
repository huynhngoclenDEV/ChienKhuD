import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { visitRouteSteps, visitRules } from '../data/content'
import { MapEmbed } from '../components/ui/MapEmbed'
import { Reveal } from '../components/ui/Reveal'
import visitVr from '../assets/images/visit-vr.jpg'
import sitePlan from '../assets/images/site-plan.jpg'

type Tab = 'route' | 'rules' | 'book'

export function VisitPage() {
  const { t, locale } = useLanguage()
  const [tab, setTab] = useState<Tab>('route')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'route', label: t.visit.tabRoute },
    { key: 'rules', label: t.visit.tabRules },
    { key: 'book', label: t.visit.tabBook },
  ]

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-16">
      <Reveal as="header" className="max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">
          {t.visit.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">{t.visit.subtitle}</p>
      </Reveal>

      {/* Bento info */}
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <Reveal delay={0} className="border border-muted/15 bg-cream p-8 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3 text-primary">
            <ClockIcon />
            <span className="text-xs font-semibold tracking-[0.15em]">
              {t.visit.hoursLabel}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">
            {t.visit.hoursTitle}
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">
            {t.visit.hoursDetail}
          </p>
          <p className="mt-6 border-t border-muted/15 pt-4 text-xs text-muted">
            {t.visit.hoursNote}
          </p>
        </Reveal>

        <Reveal delay={70} className="border border-muted/15 bg-cream p-8 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3 text-primary">
            <TicketIcon />
            <span className="text-xs font-semibold tracking-[0.15em]">
              {t.visit.ticketLabel}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">
            {t.visit.ticketTitle}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">{t.visit.ticketDesc}</p>
          <Link
            to="/lien-he"
            className="mt-8 block bg-primary py-3 text-center text-sm font-semibold tracking-wider text-white transition hover:bg-primary-dark"
          >
            {t.visit.bookGroup}
          </Link>
        </Reveal>

        <Reveal delay={140}>
          <Link
            to="/audio"
            className="group relative flex min-h-[260px] overflow-hidden"
          >
            <img
              src={visitVr}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="text-sm text-white/80">{t.visit.vrLabel}</p>
              <p className="mt-2 font-serif text-2xl font-semibold">
                {t.visit.vrTitle} →
              </p>
              <p className="mt-2 text-xs text-white/65">{t.visit.vrSoon}</p>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Location */}
      <Reveal as="section" className="mt-20">
        <SectionLabel>{t.visit.locationLabel}</SectionLabel>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden lg:col-span-2">
            <MapEmbed
              heightClass="h-72 md:h-[400px]"
              directionsLabel="Google Maps"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="border border-muted/15 bg-cream-muted p-6">
              <p className="text-xs font-semibold tracking-[0.15em] text-primary">
                {t.visit.officialAddress}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {t.contact.address}
              </p>
              <p className="mt-2 font-mono text-xs text-ink">{t.visit.coords}</p>
            </div>
            <div className="border border-muted/15 bg-cream p-6">
              <p className="text-xs font-semibold tracking-[0.15em] text-primary">
                {t.visit.quickGuide}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{t.visit.byCar}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{t.visit.byBus}</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Site plan */}
      <Reveal as="section" className="mt-20">
        <SectionLabel>{t.visit.planLabel}</SectionLabel>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <img
            src={sitePlan}
            alt="Site plan"
            loading="lazy"
            className="h-72 w-full border border-muted/15 object-cover md:h-[360px]"
          />
          <div className="flex flex-col gap-5">
            <div className="border-l-4 border-primary bg-cream-muted p-6">
              <h3 className="font-serif text-xl font-semibold text-ink">
                {t.visit.zone1}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{t.visit.zone1Desc}</p>
            </div>
            <div className="border-l-4 border-primary bg-cream-muted p-6">
              <h3 className="font-serif text-xl font-semibold text-ink">
                {t.visit.zone2}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{t.visit.zone2Desc}</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Guide tabs */}
      <Reveal as="section" className="mt-20">
        <h2 className="font-serif text-3xl font-semibold text-ink">
          {t.visit.guideTitle}
        </h2>
        <div className="mt-6 flex flex-wrap gap-6 border-b border-muted/15">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`pb-3 text-xs font-semibold tracking-[0.12em] transition ${
                tab === item.key
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 border border-muted/10 bg-white/60 p-6 md:grid-cols-3 md:p-8">
          <div className="md:col-span-2">
            {tab === 'route' && (
              <ol className="space-y-5">
                {visitRouteSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-muted">
                      {locale === 'vn' ? step.vn : step.en}
                    </p>
                  </li>
                ))}
              </ol>
            )}
            {tab === 'rules' && (
              <ul className="space-y-4">
                {visitRules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {locale === 'vn' ? rule.vn : rule.en}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'book' && (
              <div>
                <p className="text-sm leading-6 text-muted">{t.visit.ticketDesc}</p>
                <Link
                  to="/lien-he"
                  className="mt-6 inline-block bg-primary px-8 py-3 text-sm font-semibold tracking-wider text-white"
                >
                  {t.visit.bookGroup}
                </Link>
              </div>
            )}
          </div>
          <aside className="bg-[#F5EED0] p-5">
            <p className="text-xs font-semibold tracking-[0.12em] text-ink">
              {t.visit.noteTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">{t.visit.noteText}</p>
          </aside>
        </div>
      </Reveal>
    </div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-8 bg-gold" />
      <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
        {children}
      </h2>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-4V7h2v4h2v2z" />
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 24 20" fill="currentColor">
      <path d="M22 6v2a2 2 0 010 4v2H2v-2a2 2 0 010-4V6h20zM4 4v2a4 4 0 000 8v2h16v-2a4 4 0 000-8V4H4z" />
    </svg>
  )
}
