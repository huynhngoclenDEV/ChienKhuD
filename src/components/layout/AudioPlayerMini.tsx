import { useAudioPlayer, formatTime } from '../../context/AudioContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AudioPlayerMini() {
  const { t, locale } = useLanguage()
  const {
    track,
    isPlaying,
    isVisible,
    currentTime,
    duration,
    volume,
    toggle,
    pause,
    seek,
    setVolume,
    next,
    prev,
    close,
  } = useAudioPlayer()

  if (!isVisible) return null

  const total = duration > 0 ? duration : track.durationSec || 1
  const progress = Math.min(100, (currentTime / total) * 100)
  const title = locale === 'vn' ? track.titleVn : track.titleEn

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-audio-bar/95 text-white shadow-[0_-8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md animate-slide-up">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] md:gap-6 md:px-16">
        {/* Track info */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden bg-primary/80">
            <img
              src={track.cover}
              alt=""
              className={`size-full object-cover transition duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            {isPlaying && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                <span className="flex items-end gap-0.5">
                  <span className="h-2 w-0.5 animate-eq bg-white" />
                  <span className="h-3.5 w-0.5 animate-eq-delay bg-white" />
                  <span className="h-2.5 w-0.5 animate-eq-delay-2 bg-white" />
                </span>
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="truncate text-xs text-white/55">
              {t.audioBar.subtitle} · {formatTime(currentTime)} /{' '}
              {formatTime(duration || track.durationSec)}
            </p>
          </div>
        </div>

        {/* Transport: prev · play/pause · next · stop */}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={toggle}
            className="mx-1 flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-105 hover:bg-primary-dark active:scale-95"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={next}
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              pause()
              seek(0)
            }}
            className="ml-1 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Stop"
            title="Dừng"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          </button>
        </div>

        {/* Seek + volume + close */}
        <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
          <div className="relative min-w-0 flex-1">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={total}
              step={0.1}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Seek"
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-60"
            >
              <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-20 cursor-pointer accent-primary"
              aria-label="Volume"
            />
          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
