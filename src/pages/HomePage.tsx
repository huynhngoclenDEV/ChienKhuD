import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { historyStages, SITE } from '../data/content'
import { MapEmbed } from '../components/ui/MapEmbed'
import { Reveal } from '../components/ui/Reveal'
import heroHome from '../assets/images/hero-home.jpg'

export function HomePage() {
  const { t, locale } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img
          src={heroHome}
          alt=""
          className="absolute inset-0 size-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-cream" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-32 text-center text-white animate-fade-up">
          <h1 className="font-serif text-3xl font-bold uppercase leading-tight tracking-wide md:text-5xl lg:text-[52px]">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 whitespace-pre-line font-serif text-lg italic leading-relaxed text-white/90 md:text-xl">
            {t.home.heroQuote}
          </p>
          <p className="mt-3 text-sm tracking-wide text-white/70">
            {t.home.heroQuoteAttr}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/lich-su"
              className="bg-primary px-8 py-3.5 text-sm font-semibold tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
            >
              {t.home.ctaExplore}
            </Link>
            <Link
              to="/thu-vien"
              className="border border-white/80 px-8 py-3.5 text-sm font-semibold tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {t.home.ctaFilm}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Reveal as="section" className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          {t.home.introLabel}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
          {t.home.introTitle}
        </h2>
        <p className="mt-8 text-base leading-7 text-muted">{t.home.introP1}</p>
        <p className="mt-4 text-base leading-7 text-muted">{t.home.introP2}</p>
      </Reveal>

      {/* Stages */}
      <section className="mx-auto max-w-[1280px] px-4 pb-20 md:px-16">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold">
              {t.home.stagesLabel}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">
              {t.home.stagesTitle}
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-gold/40 md:ml-8 md:block" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {historyStages.map((stage, i) => (
            <Reveal key={stage.id} as="article" delay={i * 70}>
              <div className="group flex h-full flex-col bg-cream-dark px-8 py-10 transition duration-300 hover:-translate-y-1 hover:bg-cream-muted hover:shadow-md">
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  {locale === 'vn' ? stage.titleVn : stage.titleEn}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                  {locale === 'vn' ? stage.descVn : stage.descEn}
                </p>
                <Link
                  to="/lich-su"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary transition group-hover:gap-3"
                >
                  {t.home.learnMore}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visit info */}
      <Reveal as="section" className="bg-jungle text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 md:grid-cols-2 md:px-16 lg:gap-16">
          <div>
            <div className="flex items-start gap-4">
              <span className="mt-1 h-10 w-1.5 shrink-0 bg-primary" />
              <h2 className="font-serif text-3xl font-semibold">
                {t.home.visitTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold tracking-wider text-white/50">
                  {t.home.hours}
                </p>
                <p className="mt-2 text-sm leading-6">{t.home.hoursValue}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider text-white/50">
                  {t.home.ticket}
                </p>
                <p className="mt-2 text-sm leading-6">{t.home.ticketValue}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider text-white/50">
                  {t.home.addressLabel}
                </p>
                <p className="mt-2 text-sm leading-6">{t.home.addressValue}</p>
              </div>
            </div>
            <Link
              to="/tham-quan"
              className="mt-10 inline-block bg-white px-8 py-3.5 text-sm font-semibold tracking-wider text-ink transition hover:bg-cream"
            >
              {t.home.bookTour}
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden">
            <MapEmbed
              heightClass="h-64 md:h-full md:min-h-[280px]"
              showDirections={false}
              className="size-full"
            />
            <span className="pointer-events-none absolute right-4 top-4 z-10 bg-jungle/80 px-3 py-1.5 text-xs tracking-wide text-white">
              {SITE.coordsDisplay}
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
