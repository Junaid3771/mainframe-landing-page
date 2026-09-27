import type { CSSProperties } from 'react'
import type { Project } from './data'

export const Arrow = () => <span aria-hidden="true">↗</span>
export const Mark = () => (
  <span className="brand-mark" aria-hidden="true">
    ✳
  </span>
)
export const Link = ({
  to,
  children,
  className = '',
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
  <a href={`#${to}`} className={className} {...props}>
    {children}
  </a>
)

export function Sculpture({
  mode = 'orbit',
  speed = 1,
  hue = 0,
}: {
  mode?: string
  speed?: number
  hue?: number
}) {
  return (
    <div
      className={`sculpture ${mode}`}
      style={
        { '--speed': `${24 / speed}s`, '--hue': `${hue}deg` } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="sculpture-halo" />
      <div className="orbital-object">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={{ '--i': i, '--angle': `${i * 6}deg` } as CSSProperties}
          />
        ))}
        <div className="object-core" />
      </div>
      <span className="art-cross cross-one">+</span>
      <span className="art-cross cross-two">+</span>
    </div>
  )
}

export function Artwork({
  kind,
  large = false,
}: {
  kind: string
  large?: boolean
}) {
  return (
    <div
      className={`artwork art-${kind} ${large ? 'art-large' : ''}`}
      aria-hidden="true"
    >
      {kind === 'forma' ? (
        <>
          <div className="forma-circle" />
          <span className="art-word">
            forma<span>®</span>
          </span>
          <div className="art-caption">MOVEMENT IS A WAY OF LIFE.</div>
          <div className="forma-line" />
        </>
      ) : kind === 'offscript' ? (
        <>
          <span className="poster-small">
            INDEPENDENT MINDS. COLLECTIVE ENERGY.
          </span>
          <span className="offscript-word">
            OFF
            <br />
            <em>SCRIPT</em>
          </span>
          <span className="poster-bottom">CULTURE WITHOUT A TEMPLATE. ↗</span>
          <div className="poster-star">✳</div>
        </>
      ) : kind === 'noma' ? (
        <>
          <span className="noma-word">noma</span>
          <div className="bottle">
            <span>
              noma
              <br />
              <small>
                EVERYDAY,
                <br />
                RECONSIDERED.
              </small>
            </span>
          </div>
          <div className="bottle second">
            <span>
              noma
              <br />
              <small>
                A LITTLE
                <br />
                LESS ORDINARY.
              </small>
            </span>
          </div>
          <span className="noma-bottom">GOOD BY NATURE.</span>
        </>
      ) : (
        <>
          <div className="signal-grid" />
          <span className="signal-word">
            signal<span>®</span>
          </span>
          <div className="signal-orbit" />
          <span className="art-caption">LESS NOISE. MORE CONNECTION.</span>
        </>
      )}
    </div>
  )
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`project-card reveal delay-${index % 2}`}
    >
      <div className="project-art">
        <Artwork kind={project.slug} />
        <span className="project-open">
          <Arrow />
        </span>
        <span className="concept-tag">CONCEPT STUDY</span>
      </div>
      <div className="project-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.tagline}</p>
        </div>
        <span className="project-category">
          {project.category}
          <br />
          {project.year}
        </span>
      </div>
    </Link>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string
  title: string
  link?: { text: string; to: string }
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="text-link">
          {link.text} <Arrow />
        </Link>
      )}
    </div>
  )
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
}) {
  return (
    <section className="page-intro section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </section>
  )
}

export function NotFound() {
  return (
    <section className="section page-intro not-found">
      <p className="eyebrow">404 / OUTSIDE THE FRAME</p>
      <h1>
        A little
        <br />
        <em>off course.</em>
      </h1>
      <p className="intro-description">
        That page isn’t here. There’s plenty more to explore.
      </p>
      <Link to="/" className="button button-dark">
        Back to Mainframe <Arrow />
      </Link>
    </section>
  )
}

export function CTA() {
  return (
    <section className="cta section">
      <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
      <Link to="/contact">
        <h2>
          Let’s make
          <br />
          <em>it happen.</em>
        </h2>
        <span className="cta-arrow">
          <Arrow />
        </span>
      </Link>
      <div className="cta-bottom">
        <span>A GOOD CONVERSATION IS A GREAT START.</span>
        <span>YOUR NEXT CHAPTER STARTS HERE.</span>
      </div>
    </section>
  )
}
