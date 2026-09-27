import { useEffect, useRef, useState } from 'react'
import { Link } from './components'
import { EMAIL } from './config'

// Preserve the original Mainframe character and its pointer-driven head turn.
export const ARIA_VIDEO_URL = `${import.meta.env.BASE_URL}media/aria-head.mp4`
const MESSAGE =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'
const actions = [
  ['Pitch us an idea', '/contact'],
  ['Come work here', '/openings'],
  ['Send a brief hello', '/contact?service=Something%20else'],
  ['See how we operate', '/studio'],
]

export default function AriaHero({ motion }: { motion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [displayed, setDisplayed] = useState('')
  const [copied, setCopied] = useState('')
  const [videoError, setVideoError] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const animate = motion && !reducedMotion

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!animate) {
      setDisplayed(MESSAGE)
      return
    }
    setDisplayed('')
    let timer: number | undefined
    let index = 0
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1
        setDisplayed(MESSAGE.slice(0, index))
        if (index >= MESSAGE.length) window.clearInterval(timer)
      }, 38)
    }, 600)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [animate])

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section || !animate) return
    let previousX: number | null = null
    let targetTime = video.currentTime
    let seeking = false
    const seek = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0 || seeking)
        return
      // Stay just inside the last decodable frame rather than seeking past it.
      const next = Math.max(0, Math.min(targetTime, video.duration - 0.04))
      if (Math.abs(video.currentTime - next) < 0.01) return
      seeking = true
      video.currentTime = next
    }
    const move = (event: PointerEvent) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      if (previousX === null) {
        previousX = event.clientX
        return
      }
      const delta = event.clientX - previousX
      previousX = event.clientX
      targetTime = Math.max(
        0,
        Math.min(
          video.duration - 0.04,
          targetTime + (delta / section.clientWidth) * 0.8 * video.duration,
        ),
      )
      seek()
    }
    const reset = () => {
      previousX = null
    }
    const onSeeked = () => {
      seeking = false
      seek()
    }
    section.addEventListener('pointermove', move)
    section.addEventListener('pointerleave', reset)
    section.addEventListener('pointerup', reset)
    section.addEventListener('pointercancel', reset)
    video.addEventListener('seeked', onSeeked)
    return () => {
      section.removeEventListener('pointermove', move)
      section.removeEventListener('pointerleave', reset)
      section.removeEventListener('pointerup', reset)
      section.removeEventListener('pointercancel', reset)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [animate])

  return (
    <section className="aria-hero" id="top" ref={sectionRef}>
      <video
        ref={videoRef}
        className="aria-video"
        src={ARIA_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onError={() => setVideoError(true)}
      />
      <div className="aria-shade" />
      <h1 className="sr-only">Mainframe — Meet A.R.I.A.</h1>
      <div className="aria-copy">
        <div className="aria-introduction">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </div>
        <p className="aria-message">
          <span className="sr-only">{MESSAGE}</span>
          <span aria-hidden="true">
            {displayed}
            {displayed.length < MESSAGE.length && (
              <span className="aria-cursor" />
            )}
          </span>
        </p>
        <div className="aria-actions">
          {actions.map(([label, to]) => (
            <Link key={label} to={to}>
              {label}
            </Link>
          ))}
          <button
            className="aria-email"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(EMAIL)
                setCopied('Email copied')
              } catch {
                setCopied(`Email us at ${EMAIL}`)
              }
            }}
            aria-label={`Copy ${EMAIL}`}
          >
            <span>
              Reach us: <u>{EMAIL}</u>
            </span>
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect
                x="4"
                y="1"
                width="7"
                height="7"
                rx=".8"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <rect
                x="1"
                y="4"
                width="7"
                height="7"
                rx=".8"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
          </button>
        </div>
        <p className="aria-feedback" role="status">
          {copied}
        </p>
        {videoError && (
          <p className="aria-video-error">
            The character is taking a moment to load.{' '}
            <button
              onClick={() => {
                setVideoError(false)
                videoRef.current?.load()
              }}
            >
              Try again
            </button>
          </p>
        )}
      </div>
      <div className="aria-bottom">
        <span>MOVE YOUR CURSOR. SAY HELLO.</span>
        <a
          href="#selected-work"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('selected-work')
              ?.scrollIntoView({ behavior: animate ? 'smooth' : 'instant' })
          }}
        >
          Explore our work ↓
        </a>
      </div>
    </section>
  )
}
