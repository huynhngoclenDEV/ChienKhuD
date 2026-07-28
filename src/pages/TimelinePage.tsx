import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { timelineEvents, type TimelinePeriod } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import heroTimeline from '../assets/images/hero-timeline.jpg'

const periods: { key: TimelinePeriod; label: string; labelEn: string }[] = [
  { key: '1929-1944', label: '1929 - 1944', labelEn: '1929 - 1944' },
  { key: '1945-1954', label: '1945 - 1954', labelEn: '1945 - 1954' },
  { key: '1954-1975', label: '1954 - 1975', labelEn: '1954 - 1975' },
  { key: 'now', label: 'Hiện nay', labelEn: 'Present' },
]

export function TimelinePage() {
  const { t, locale } = useLanguage()
  const [activePeriod, setActivePeriod] = useState<TimelinePeriod>('1929-1944')
  const sectionRefs = useRef<Partial<Record<TimelinePeriod, HTMLElement | null>>>({})

  const byPeriod = useMemo(() => {
    return periods.map((p) => ({
      ...p,
      events: timelineEvents.filter((e) => e.period === p.key),
    }))
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-period]')
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          )
        const top = visible[0]
        if (!top) return
        const period = top.target.getAttribute('data-period') as TimelinePeriod | null
        if (period) setActivePeriod(period)
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.2, 0.4],
      },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  function scrollToPeriod(key: TimelinePeriod) {
    const el = sectionRefs.current[key]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 110
    window.scrollTo({ top, behavior: 'smooth' })
    setActivePeriod(key)
  }

  return (
    <div>
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden md:min-h-[520px]">
        <img
          src={heroTimeline}
          alt=""
          className="absolute inset-0 size-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-32 text-center text-white animate-fade-up">
          <h1 className="font-serif text-4xl font-bold uppercase tracking-wide md:text-5xl">
            {t.timeline.title}
          </h1>
          <p className="mt-6 text-base leading-7 text-white/85 md:text-lg">
            {t.timeline.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-16">
        <div className="sticky top-20 z-30 -mx-4 mb-12 bg-cream/90 px-4 py-4 backdrop-blur-md md:mx-0 md:px-0">
          <div className="flex flex-wrap justify-center gap-3">
            {periods.map((p) => {
              const active = activePeriod === p.key
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => scrollToPeriod(p.key)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 ${
                    active
                      ? 'scale-105 bg-muted text-white shadow-md shadow-muted/25'
                      : 'border border-muted/25 text-muted hover:border-muted hover:text-ink'
                  }`}
                >
                  {locale === 'en' ? p.labelEn : p.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-muted/25 md:left-1/2" />

          <div className="space-y-24">
            {byPeriod.map((period) => {
              const label = locale === 'en' ? period.labelEn : period.label

              if (period.events.length === 0) {
                return (
                  <div
                    key={period.key}
                    id={`period-${period.key}`}
                    ref={(node) => {
                      sectionRefs.current[period.key] = node
                    }}
                    data-period={period.key}
                  >
                    <Reveal variant="grow" className="relative pl-12 md:pl-0">
                      <span className="reveal-dot absolute left-[11px] top-6 size-3 rounded-full border-2 border-muted/40 bg-cream md:left-1/2 md:-translate-x-1/2 md:hidden" />
                      <span className="reveal-dot absolute left-1/2 top-6 hidden size-3 -translate-x-1/2 rounded-full border-2 border-muted/40 bg-cream md:block" />
                      <div className="mx-auto max-w-lg border border-dashed border-muted/25 bg-cream-dark/60 px-8 py-12 text-center md:ml-[calc(50%+1.5rem)]">
                        <p className="text-[11px] font-semibold tracking-[0.18em] text-gold">
                          {label}
                        </p>
                        <p className="mt-4 font-serif text-2xl font-semibold text-ink">
                          {t.timeline.empty}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {t.timeline.emptyHint}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                )
              }

              return (
                <div key={period.key} className="space-y-24">
                  {period.events.map((event, eventIndex) => {
                    const isFirst = eventIndex === 0
                    const isRight = event.side === 'right'
                    const linkLabel =
                      event.linkType === 'docs'
                        ? t.timeline.viewDocs
                        : event.linkType === 'audio'
                          ? t.timeline.listenAudio
                          : null
                    const linkTo =
                      event.linkType === 'audio'
                        ? '/audio'
                        : event.linkType === 'docs'
                          ? '/thu-vien'
                          : null

                    return (
                      <div
                        key={event.id}
                        id={isFirst ? `period-${event.period}` : undefined}
                        ref={
                          isFirst
                            ? (node) => {
                                sectionRefs.current[event.period] = node
                              }
                            : undefined
                        }
                        data-period={event.period}
                      >
                        <Reveal
                          as="article"
                          variant="grow"
                          delay={Math.min(eventIndex * 80, 160)}
                          className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                            isRight ? '' : 'md:[&>*:first-child]:order-2'
                          }`}
                        >
                          <div
                            className={`hidden md:block ${isRight ? 'text-right' : 'text-left'}`}
                          >
                            <span
                              className={`reveal-year inline-block font-serif text-7xl font-bold md:text-8xl ${
                                activePeriod === event.period
                                  ? 'text-primary/25'
                                  : 'text-primary/10'
                              }`}
                            >
                              {event.year}
                            </span>
                          </div>

                          <div className="relative pl-12 md:pl-0">
                            <span
                              className={`reveal-dot absolute left-[11px] top-3 size-3 rounded-full border-2 bg-cream md:hidden ${
                                activePeriod === event.period
                                  ? 'border-primary'
                                  : 'border-primary/40'
                              }`}
                            />
                            <span
                              className={`reveal-dot absolute left-1/2 top-3 hidden size-3 -translate-x-1/2 rounded-full border-2 bg-cream md:block ${
                                activePeriod === event.period
                                  ? 'border-primary bg-primary'
                                  : 'border-primary/50'
                              }`}
                            />

                            {isFirst && (
                              <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-gold">
                                {label}
                              </p>
                            )}

                            <span
                              className={`inline-block px-3 py-1 text-[10px] font-semibold tracking-wider text-white ${event.tagColor}`}
                            >
                              {locale === 'vn' ? event.tagVn : event.tagEn}
                            </span>
                            <p className="reveal-year mt-2 font-serif text-4xl font-bold text-primary/20 md:hidden">
                              {event.year}
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-semibold text-ink">
                              {locale === 'vn' ? event.titleVn : event.titleEn}
                            </h3>
                            <div className="reveal-media mt-5 overflow-hidden border border-muted/20">
                              <img
                                src={event.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.02]"
                              />
                            </div>
                            <p className="mt-4 text-sm leading-6 text-muted">
                              {locale === 'vn' ? event.descVn : event.descEn}
                            </p>
                            {linkTo && linkLabel && (
                              <Link
                                to={linkTo}
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
                              >
                                {linkLabel}
                                <span aria-hidden>→</span>
                              </Link>
                            )}
                          </div>
                        </Reveal>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        <Reveal variant="grow" className="mt-20 text-center">
          <Link
            to="/thu-vien"
            className="inline-block bg-primary px-10 py-4 text-sm font-semibold tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            {t.timeline.cta}
          </Link>
          <p className="mt-4 text-xs text-muted">{t.timeline.ctaNote}</p>
        </Reveal>
      </section>
    </div>
  )
}
