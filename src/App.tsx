import { useEffect, useRef, useState } from 'react'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'
const MESSAGE = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timer: number | undefined
    let index = 0
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(timer)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => { window.clearTimeout(start); if (timer) window.clearInterval(timer) }
  }, [text, speed, startDelay])

  return { displayed, done }
}

const links = ['Labs', 'Studio', 'Openings', 'Shop']

function CopyIcon() {
  return <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
    <rect x="4" y="1" width="7" height="7" rx=".8" stroke="currentColor" strokeWidth="1.1" />
    <rect x="1" y="4" width="7" height="7" rx=".8" stroke="currentColor" strokeWidth="1.1" />
  </svg>
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const { displayed, done } = useTypewriter(MESSAGE)

  useEffect(() => {
    const timer = window.setTimeout(() => setActionsVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const seek = () => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || seeking.current) return
      seeking.current = true
      video.currentTime = Math.max(0, Math.min(targetTime.current, video.duration))
    }
    const move = (event: MouseEvent) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
      if (prevX.current === null) { prevX.current = event.clientX; return }
      const delta = event.clientX - prevX.current
      prevX.current = event.clientX
      targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + (delta / window.innerWidth) * 0.8 * video.duration))
      seek()
    }
    const reset = () => { prevX.current = null }
    const onSeeked = () => {
      const video = videoRef.current
      seeking.current = false
      if (video && Math.abs(video.currentTime - targetTime.current) > 0.01) seek()
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', reset)
    videoRef.current?.addEventListener('seeked', onSeeked)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', reset)
      videoRef.current?.removeEventListener('seeked', onSeeked)
    }
  }, [])

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('hello@mainframe.co') } catch { /* Clipboard may be unavailable in non-secure previews. */ }
  }

  return <main className="min-h-screen bg-black text-white">
    <video ref={videoRef} className="fixed inset-0 z-0 h-screen w-screen object-cover object-[70%_center]" src={VIDEO_URL} muted playsInline preload="auto" aria-hidden="true" />
    <div className="pointer-events-none fixed inset-0 z-0 bg-black/20" />

    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <a href="#top" className="flex items-center gap-3" aria-label="Mainframe home">
        <span className="text-[21px] tracking-tight sm:text-[26px]" style={{ fontFamily: 'var(--font-heading)' }}>Mainframe®</span>
        <span className="select-none text-[25px] leading-none tracking-[-0.02em] sm:text-[30px]">✳︎</span>
      </a>
      <div className="hidden items-center text-[23px] md:flex">
        {links.map((link, index) => <span key={link}><a href={'#' + link.toLowerCase()} className="transition-opacity hover:opacity-60">{link}</a>{index < links.length - 1 ? ', ' : ''}</span>)}
      </div>
      <a href="mailto:hello@mainframe.co" className="hidden text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60 md:block">Get in touch</a>
      <button className="relative z-20 flex flex-col gap-[5px] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span className={'h-[2px] w-6 bg-white transition duration-300 ' + (menuOpen ? 'translate-y-[7px] rotate-45' : '')} />
        <span className={'h-[2px] w-6 bg-white transition duration-300 ' + (menuOpen ? 'opacity-0' : '')} />
        <span className={'h-[2px] w-6 bg-white transition duration-300 ' + (menuOpen ? '-translate-y-[7px] -rotate-45' : '')} />
      </button>
    </nav>

    <div className={'fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 text-[32px] font-medium backdrop-blur-md transition-opacity duration-300 md:hidden ' + (menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}>
      {links.map((link) => <a key={link} href={'#' + link.toLowerCase()} onClick={() => setMenuOpen(false)} className="transition-opacity hover:opacity-60">{link}</a>)}
      <a href="mailto:hello@mainframe.co" className="underline underline-offset-4">Get in touch</a>
    </div>

    <section id="top" className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <div className="pointer-events-none mb-5 select-none text-[clamp(18px,4vw,26px)] leading-[1.3] font-normal text-white blur-[4px] sm:mb-6">Hey there, meet A.R.I.A,<br />Mainframe's Adaptive Response Interface Agent</div>
        <p className="mb-5 min-h-[54px] text-[clamp(18px,4vw,26px)] leading-[1.35] font-normal text-white sm:mb-6">{displayed}{!done && <span className="blink-cursor ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-white" />}</p>
        <div className={'flex flex-wrap gap-y-1 transition-[opacity,transform] duration-[400ms] ease-out ' + (actionsVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')}>
          {['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'].map((label) => <a key={label} href="#contact" className="mx-[0.2em] mb-[0.4em] inline-flex whitespace-nowrap items-center justify-center rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]">{label}</a>)}
          <button onClick={copyEmail} className="mx-[0.2em] mb-[0.4em] inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]" aria-label="Copy hello@mainframe.co">
            <span>Reach us: <span className="underline underline-offset-1">hello@mainframe.co</span></span><CopyIcon />
          </button>
        </div>
      </div>
    </section>
  </main>
}
