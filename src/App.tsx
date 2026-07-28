import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AudioProvider } from './context/AudioContext'
import { AppLayout } from './components/layout/AppLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const TimelinePage = lazy(() =>
  import('./pages/TimelinePage').then((m) => ({ default: m.TimelinePage })),
)
const VisitPage = lazy(() =>
  import('./pages/VisitPage').then((m) => ({ default: m.VisitPage })),
)
const AudioPage = lazy(() =>
  import('./pages/AudioPage').then((m) => ({ default: m.AudioPage })),
)
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-hidden>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-muted/15">
        <div className="h-full w-1/2 animate-pulse bg-primary/60" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="lich-su" element={<TimelinePage />} />
                <Route path="tham-quan" element={<VisitPage />} />
                <Route path="audio" element={<AudioPage />} />
                <Route path="thu-vien" element={<GalleryPage />} />
                <Route path="lien-he" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AudioProvider>
    </LanguageProvider>
  )
}
