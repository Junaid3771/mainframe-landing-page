import { projects, type Project } from '../data'
import { Artwork, Link, Arrow, CTA } from '../components'

export default function CaseStudy({ project }: { project: Project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <>
      <section className="case-intro section">
        <Link to="/work" className="text-link">
          ← All projects
        </Link>
        <div className="case-title">
          <h1>
            {project.name}
            <span>®</span>
          </h1>
          <p>{project.tagline}</p>
        </div>
        <div className="case-meta">
          <span>
            TYPE <b>Self-initiated concept</b>
          </span>
          <span>
            DISCIPLINES <b>{project.disciplines.join(' / ')}</b>
          </span>
          <span>
            YEAR <b>{project.year}</b>
          </span>
        </div>
      </section>
      <div className="case-art">
        <Artwork kind={project.slug} large />
      </div>
      <section className="section case-story">
        <p className="eyebrow">THE IDEA</p>
        <div>
          <h2>{project.headline}</h2>
          <p>{project.description}</p>
          <div className="story-columns">
            <div>
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`case-system system-${project.slug} section`}>
        <p className="eyebrow">A SYSTEM, NOT JUST A SYMBOL</p>
        <div className="system-layout">
          <span className="type-specimen">
            Aa<span>Clear. Confident. Characterful.</span>
          </span>
          <div className="palette">
            {project.colors.map((c) => (
              <div key={c} style={{ background: c }}>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="deliverables">
          {project.deliverables.map((d, i) => (
            <span key={d}>
              <small>0{i + 1}</small>
              {d}
            </span>
          ))}
        </div>
      </section>
      <section className="section next-project">
        <p className="eyebrow">KEEP EXPLORING</p>
        <Link to={`/work/${next.slug}`}>
          <h2>{next.name}</h2>
          <Arrow />
        </Link>
      </section>
      <CTA />
    </>
  )
}
