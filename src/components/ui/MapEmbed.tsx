import { useState } from 'react'
import { SITE, MAPS_DIRECTIONS_URL } from '../../data/content'

type MapEmbedProps = {
  className?: string
  heightClass?: string
  showDirections?: boolean
  directionsLabel?: string
}

const EMBED_SRC = `https://maps.google.com/maps?q=${SITE.lat},${SITE.lng}&hl=vi&z=15&output=embed`

export function MapEmbed({
  className = '',
  heightClass = 'h-72 md:h-[400px]',
  showDirections = true,
  directionsLabel = 'Chỉ đường',
}: MapEmbedProps) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-cream-dark ${heightClass} ${className}`}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        title={`Bản đồ ${SITE.name}`}
        src={EMBED_SRC}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        // Avoid trapping page scroll until user intentionally interacts
        style={{ pointerEvents: active ? 'auto' : 'none' }}
      />
      {!active && (
        <button
          type="button"
          className="absolute inset-0 z-[1] cursor-pointer bg-transparent"
          aria-label="Kích hoạt bản đồ"
          onClick={() => setActive(true)}
        />
      )}
      {showDirections && (
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 bg-white px-5 py-3 text-sm font-medium text-ink shadow-md transition hover:bg-cream"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary"
          >
            <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          {directionsLabel}
        </a>
      )}
    </div>
  )
}
