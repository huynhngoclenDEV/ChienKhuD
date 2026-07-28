import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { AudioPlayerMini } from './AudioPlayerMini'
import { useAudioPlayer } from '../../context/AudioContext'

const OVERLAY_ROUTES = new Set(['/', '/lich-su', '/audio'])

export function AppLayout() {
  const { pathname } = useLocation()
  const { isVisible } = useAudioPlayer()
  const isOverlay = OVERLAY_ROUTES.has(pathname)

  return (
    <div className="relative flex min-h-screen flex-col bg-cream">
      <Header variant={isOverlay ? 'overlay' : 'light'} />
      <main className={`flex-1 ${isVisible ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <AudioPlayerMini />
    </div>
  )
}
