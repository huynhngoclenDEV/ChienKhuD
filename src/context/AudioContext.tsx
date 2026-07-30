import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { playlist } from '../data/content'

export type Track = (typeof playlist)[number]

type AudioContextValue = {
  track: Track
  tracks: Track[]
  isPlaying: boolean
  isVisible: boolean
  currentTime: number
  duration: number
  volume: number
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  next: () => void
  prev: () => void
  selectTrack: (id: string, autoplay?: boolean) => void
  close: () => void
  show: () => void
}

const AudioPlayerContext = createContext<AudioContextValue | null>(null)

/** Cap React progress updates so many open tabs stay smooth. */
const PROGRESS_MS = 250

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const lastProgressAt = useRef(0)
  const wantPlayRef = useRef(false)
  const [trackId, setTrackId] = useState(playlist[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)

  const track = playlist.find((t) => t.id === trackId) ?? playlist[0]

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTime = () => {
      const now = performance.now()
      if (now - lastProgressAt.current < PROGRESS_MS) return
      lastProgressAt.current = now
      setCurrentTime(audio.currentTime)
    }
    const onMeta = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onEnded = () => {
      setTrackId((current) => {
        const idx = playlist.findIndex((t) => t.id === current)
        return playlist[(idx + 1) % playlist.length].id
      })
      wantPlayRef.current = true
      setIsPlaying(true)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    // Only fetch media after the player is shown — avoids requests on every page load.
    if (!isVisible) {
      setCurrentTime(0)
      setDuration(track.durationSec)
      return
    }
    audio.src = track.src
    audio.load()
    setCurrentTime(0)
    lastProgressAt.current = 0
    setDuration(track.durationSec)
    if (wantPlayRef.current || isPlaying) {
      void audio.play().catch(() => {
        wantPlayRef.current = false
        setIsPlaying(false)
      })
    }
  }, [track.src, track.durationSec, isVisible]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    wantPlayRef.current = isPlaying
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const play = useCallback(() => {
    setIsVisible(true)
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => setIsPlaying(false), [])
  const toggle = useCallback(() => {
    setIsVisible(true)
    setIsPlaying((p) => !p)
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    lastProgressAt.current = 0
    setCurrentTime(time)
  }, [])

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v))
    setVolumeState(clamped)
    if (audioRef.current) audioRef.current.volume = clamped
  }, [])

  const selectTrack = useCallback((id: string, autoplay = true) => {
    setTrackId(id)
    setIsVisible(true)
    if (autoplay) {
      wantPlayRef.current = true
      setIsPlaying(true)
    }
  }, [])

  const next = useCallback(() => {
    const idx = playlist.findIndex((t) => t.id === trackId)
    const nextTrack = playlist[(idx + 1) % playlist.length]
    selectTrack(nextTrack.id, true)
  }, [selectTrack, trackId])

  const prev = useCallback(() => {
    const idx = playlist.findIndex((t) => t.id === trackId)
    const prevTrack = playlist[(idx - 1 + playlist.length) % playlist.length]
    selectTrack(prevTrack.id, true)
  }, [selectTrack, trackId])

  const close = useCallback(() => {
    setIsPlaying(false)
    setIsVisible(false)
  }, [])

  const show = useCallback(() => setIsVisible(true), [])

  const value = useMemo(
    () => ({
      track,
      tracks: playlist,
      isPlaying,
      isVisible,
      currentTime,
      duration,
      volume,
      play,
      pause,
      toggle,
      seek,
      setVolume,
      next,
      prev,
      selectTrack,
      close,
      show,
    }),
    [
      track,
      isPlaying,
      isVisible,
      currentTime,
      duration,
      volume,
      play,
      pause,
      toggle,
      seek,
      setVolume,
      next,
      prev,
      selectTrack,
      close,
      show,
    ],
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioProvider')
  return ctx
}

export function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '00:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
