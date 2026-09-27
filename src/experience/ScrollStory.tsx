import { useEffect, useRef, useState } from 'react'
import { Link, Arrow } from '../components'
import { useMotion } from './useMotion'

const chapters = [
  {
    number: '01',
    word: 'Feel.',
    title: 'First, make them feel something.',
    copy: 'A character that follows you. A surface that responds. A first impression with a little more life.',
  },
  {
    number: '02',
    word: 'Play.',
    title: 'Then, give curiosity somewhere to go.',
    copy: 'Let people turn it, shape it, and make it their own. Interaction turns an audience into participants.',
  },
  {
    number: '03',
    word: 'Stay.',
    title: 'Build a world worth spending time in.',
    copy: 'Connect the story to the experience. Make every small detail part of a bigger, memorable idea.',
  },
]
export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null),
    motion = useMotion()
  const [active, setActive] = useState(0)
  useEffect(() => {
    const section = ref.current
    if (!section) return
    let frame = 0
    const read = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const p = Math.max(
        0,
        Math.min(0.999, -rect.top / (section.offsetHeight - innerHeight)),
      )
      section.style.setProperty('--story-progress', String(p))
      setActive(Math.floor(p * 3))
    }
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll)
    read()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', scroll)
    }
  }, [])
  const jump = (index: number) => {
    const section = ref.current
    if (!section) return
    window.scrollTo({
      top:
        scrollY +
        section.getBoundingClientRect().top +
        ((section.offsetHeight - innerHeight) * (index + 0.1)) / 3,
      behavior: motion ? 'smooth' : 'instant',
    })
  }
  return (
    <section
      className="scroll-story"
      ref={ref}
      aria-label="Our approach to interactive experiences"
    >
      <div className="story-sticky">
        <div className="story-top">
          <p className="eyebrow">DESIGNED TO BE FELT / SCROLL TO EXPLORE</p>
          <span>0{active + 1} — 03</span>
        </div>
        <div className="story-scene" data-chapter={active}>
          <div className="story-rings" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <i key={i} style={{ rotate: `${i * 22.5}deg` }} />
            ))}
          </div>
          <span className="story-word" aria-hidden="true" key={active}>
            {chapters[active].word}
          </span>
          <div className="story-copy">
            <h2>{chapters[active].title}</h2>
            <p>{chapters[active].copy}</p>
            <Link to="/labs" className="text-link">
              Try the experiments <Arrow />
            </Link>
          </div>
        </div>
        <div className="story-navigation">
          {chapters.map((c, i) => (
            <button
              key={c.word}
              aria-pressed={active === i}
              onClick={() => jump(i)}
            >
              <span>{c.number}</span>
              {c.word}
            </button>
          ))}
          <div className="story-track">
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}
