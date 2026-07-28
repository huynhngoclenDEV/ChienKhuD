import { useMemo } from 'react'
import { useAudioPlayer, formatTime } from '../context/AudioContext'
import { useLanguage } from '../i18n/LanguageContext'
import audioBg from '../assets/images/audio-bg.jpg'

export function AudioPage() {
  const { t, locale } = useLanguage()
  const {
    track,
    tracks,
    isPlaying,
    currentTime,
    duration,
    volume,
    toggle,
    pause,
    seek,
    setVolume,
    next,
    prev,
    selectTrack,
  } = useAudioPlayer()

  const groups = useMemo(() => {
    const map = new Map<string, typeof tracks>()
    for (const item of tracks) {
      const key = locale === 'vn' ? item.periodVn : item.periodEn
      const list = map.get(key) ?? []
      list.push(item)
      map.set(key, list)
    }
    return [...map.entries()]
  }, [tracks, locale])

  const total = duration > 0 ? duration : track.durationSec || 1
  const progress = Math.min(100, (currentTime / total) * 100)
  const title = locale === 'vn' ? track.titleVn : track.titleEn
  const subtitle = locale === 'vn' ? track.subtitleVn : track.subtitleEn
  const desc = locale === 'vn' ? track.descVn : track.descEn

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <img
        src={audioBg}
        alt=""
        className="absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-cream/70 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-6 px-4 pb-16 pt-28 md:grid-cols-[380px_1fr] md:gap-8 md:px-16 lg:pt-32">
        <aside className="animate-fade-up border border-muted/15 bg-cream/90 p-6 backdrop-blur-sm">
          <h2 className="font-serif text-2xl font-semibold text-primary">
            {t.audio.library}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.audio.libraryDesc}</p>

          <div className="mt-6 max-h-[65vh] space-y-6 overflow-y-auto pr-1">
            {groups.map(([period, items]) => (
              <div key={period}>
                <p className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-gold">
                  {period}
                </p>
                <ul className="space-y-1">
                  {items.map((item) => {
                    const active = item.id === track.id
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => selectTrack(item.id, true)}
                          className={`flex w-full items-center gap-3 px-3 py-3 text-left transition duration-200 ${
                            active
                              ? 'bg-cream-muted ring-1 ring-primary/20'
                              : 'hover:bg-cream-dark'
                          }`}
                        >
                          <span
                            className={`flex size-8 shrink-0 items-center justify-center border transition ${
                              active
                                ? 'border-primary bg-primary text-white'
                                : 'border-primary text-primary'
                            }`}
                          >
                            {active && isPlaying ? (
                              <span className="flex items-end gap-0.5">
                                <span className="w-0.5 animate-eq bg-current" />
                                <span className="w-0.5 animate-eq-delay bg-current" />
                                <span className="w-0.5 animate-eq-delay-2 bg-current" />
                              </span>
                            ) : (
                              <svg
                                width="10"
                                height="12"
                                viewBox="0 0 10 12"
                                fill="currentColor"
                              >
                                <path d="M0 0v12l10-6L0 0z" />
                              </svg>
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-ink">
                              {locale === 'vn' ? item.titleVn : item.titleEn}
                            </span>
                            <span className="text-xs text-muted">
                              {active && isPlaying ? t.audio.playing : ''}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="animate-fade-up border border-muted/15 bg-cream/90 p-6 backdrop-blur-sm md:p-10">
          <div className="mx-auto max-w-xl">
            <div className="relative overflow-hidden border border-muted/20">
              <img
                src={track.cover}
                alt=""
                className={`aspect-square w-full object-cover transition duration-700 ${
                  isPlaying ? 'scale-[1.03]' : 'scale-100'
                }`}
              />
            </div>
            <h1 className="mt-8 font-serif text-3xl font-semibold text-ink md:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gold">{subtitle}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{desc}</p>

            <div className="mt-8">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/15">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={total}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || track.durationSec)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="rounded-full p-2 text-muted transition hover:bg-cream-dark hover:text-ink"
                aria-label="Previous"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={toggle}
                className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 transition hover:scale-105 hover:bg-primary-dark active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full p-2 text-muted transition hover:bg-cream-dark hover:text-ink"
                aria-label="Next"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  pause()
                  seek(0)
                }}
                className="rounded-full p-2 text-muted transition hover:bg-cream-dark hover:text-ink"
                aria-label="Stop"
                title="Dừng"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-muted"
              >
                <path d="M3 10v4h4l5 5V5L7 10H3z" />
              </svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1 flex-1 cursor-pointer accent-muted"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-muted"
              >
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
