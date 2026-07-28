import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { galleryItems, type GalleryCategory } from '../data/content'
import { Reveal } from '../components/ui/Reveal'

export function GalleryPage() {
  const { t, locale } = useLanguage()
  const [filter, setFilter] = useState<GalleryCategory>('all')

  const filters: { key: GalleryCategory; label: string }[] = [
    { key: 'all', label: t.gallery.all },
    { key: 'current', label: t.gallery.current },
    { key: 'archive', label: t.gallery.archive },
    { key: 'video', label: t.gallery.video },
  ]

  const items = useMemo(
    () =>
      filter === 'all'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  )

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-16">
      <Reveal as="header" className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">
          {t.gallery.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">{t.gallery.subtitle}</p>
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`px-6 py-2.5 text-sm font-medium transition duration-200 ${
              filter === f.key
                ? 'bg-primary text-white shadow-sm shadow-primary/20'
                : 'border border-muted/20 text-muted hover:-translate-y-0.5 hover:border-primary hover:text-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">{t.gallery.empty}</p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={`${filter}-${item.id}`} as="article" delay={(i % 6) * 60}>
              <div className="group relative aspect-[16/11] overflow-hidden bg-cream-dark transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img
                  src={item.image}
                  alt={locale === 'vn' ? item.titleVn : item.titleEn}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-1 p-6 text-white transition duration-300 group-hover:translate-y-0">
                  <h3 className="font-serif text-xl font-semibold">
                    {locale === 'vn' ? item.titleVn : item.titleEn}
                  </h3>
                  <p className="mt-1 text-sm text-white/80 opacity-90">
                    {locale === 'vn' ? item.descVn : item.descEn}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
