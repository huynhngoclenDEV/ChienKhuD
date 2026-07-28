import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll on route change so page transitions feel intentional. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
