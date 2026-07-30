import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms (e.g. index * 80) */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'header'
  /** up = fade up, grow = scale+rise, left/right = slide from side */
  variant?: 'up' | 'grow' | 'left' | 'right'
}

/**
 * One-shot IntersectionObserver reveal.
 * Only toggles a class — animations stay on the compositor (opacity + transform).
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  variant = 'up',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        el.classList.add('is-revealed')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style = delay
    ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties)
    : undefined

  const variantClass =
    variant === 'up' ? '' : `reveal--${variant}`

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${variantClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  )
}
