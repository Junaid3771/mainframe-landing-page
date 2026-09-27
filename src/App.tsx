import { useState, useEffect, useRef } from 'react'
import { EMAIL, nav } from './config'
import { projects, products } from './data'
import { Link, Mark, Arrow, NotFound } from './components'
import { useStored } from './hooks/useStored'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Studio from './pages/Studio'
import Labs from './pages/Labs'
import Openings from './pages/Openings'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'

export default function App() {
  const [route, setRoute] = useState(() => location.hash.slice(1) || '/')
  const [menu, setMenu] = useState(false)
  const [motion, setMotion] = useStored(
    'mainframe-motion',
    true,
    (v): v is boolean => typeof v === 'boolean',
  )
  const [cart, setCart] = useStored<string[]>(
    'mainframe-selection',
    [],
    (v): v is string[] =>
      Array.isArray(v) &&
      v.every(
        (id) => typeof id === 'string' && products.some((p) => p.id === id),
      ) &&
      new Set(v).size === v.length,
  )
  const mainRef = useRef<HTMLElement>(null)
  const firstLoad = useRef(true)
  const [pathname, search = ''] = route.split('?')
  useEffect(() => {
    const onHash = () => {
      setRoute(location.hash.slice(1) || '/')
      setMenu(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', !motion)
  }, [motion])
  useEffect(() => {
    const title =
      pathname === '/'
        ? 'Independent creative studio'
        : pathname
            .split('/')
            .filter(Boolean)
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' / ')
    document.title = `${title} — Mainframe®`
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!firstLoad.current) mainRef.current?.focus({ preventScroll: true })
    firstLoad.current = false
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [route])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    if (menu) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])
  let page: React.ReactNode
  if (pathname === '/') page = <Home motion={motion} />
  else if (pathname === '/work') page = <Work />
  else if (pathname.startsWith('/work/')) {
    const project = projects.find((p) => pathname === `/work/${p.slug}`)
    page = project ? <CaseStudy project={project} /> : <NotFound />
  } else if (pathname === '/studio') page = <Studio />
  else if (pathname === '/labs') page = <Labs />
  else if (pathname === '/openings') page = <Openings />
  else if (pathname.startsWith('/openings/'))
    page = <Openings slug={pathname.slice(10)} />
  else if (pathname === '/shop') page = <Shop cart={cart} setCart={setCart} />
  else if (pathname === '/contact') page = <Contact search={search} />
  else if (pathname === '/privacy') page = <Privacy />
  else page = <NotFound />
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus()
          mainRef.current?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <header
        className={`site-header ${pathname === '/' ? 'header-aria' : ''}`}
      >
        <Link to="/" className="brand" aria-label="Mainframe home">
          Mainframe<sup>®</sup>
          <Mark />
        </Link>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-controls="main-nav"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? 'Close −' : 'Menu +'}
        </button>
        <nav
          id="main-nav"
          className={menu ? 'is-open' : ''}
          aria-label="Main navigation"
        >
          {nav.map(([label, to]) => (
            <Link
              to={to}
              key={to}
              aria-current={
                pathname === to || pathname.startsWith(`${to}/`)
                  ? 'page'
                  : undefined
              }
              onClick={() => setMenu(false)}
            >
              {label}
              {label === 'Shop' && cart.length > 0 && (
                <sup>({cart.length})</sup>
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="nav-contact"
            onClick={() => setMenu(false)}
          >
            {pathname === '/' ? 'Get in touch' : 'Let’s talk'} <Arrow />
          </Link>
        </nav>
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1} key={route}>
        {page}
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link to="/" className="brand">
            Mainframe<sup>®</sup>
            <Mark />
          </Link>
          <p>
            Independent minds.
            <br />
            Unexpected outcomes.
          </p>
          <a className="text-link" href={`mailto:${EMAIL}`}>
            {EMAIL} <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MAINFRAME</span>
          <div>
            <Link to="/studio">Studio</Link>
            <Link to="/openings">Openings</Link>
            <Link to="/privacy">Privacy & info</Link>
          </div>
          <button aria-pressed={!motion} onClick={() => setMotion(!motion)}>
            Motion {motion ? 'on' : 'off'}{' '}
            <span aria-hidden="true">{motion ? '◉' : '○'}</span>
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior:
                  motion &&
                  !matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'smooth'
                    : 'instant',
              })
            }
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </>
  )
}
