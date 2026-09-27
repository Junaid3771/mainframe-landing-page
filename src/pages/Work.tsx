import { useState } from 'react'
import { projects } from '../data'
import { PageIntro, ProjectCard, CTA } from '../components'

export default function Work() {
  const [filter, setFilter] = useState('All work')
  const filtered = projects.filter(
    (p) => filter === 'All work' || p.disciplines.includes(filter),
  )
  return (
    <>
      <PageIntro
        eyebrow="THE WORK / 01—04"
        title={
          <>
            Good ideas.
            <br />
            <em>Out in the world.</em>
          </>
        }
        description="Distinctive identities. Thoughtful experiences. Explore our self-initiated concept studies across brand, digital, and motion."
      />
      <section className="section page-content">
        <div className="filter-bar" aria-label="Filter projects">
          {['All work', 'Branding', 'Digital', 'Motion'].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? 'active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}{' '}
              <span>
                {f === 'All work'
                  ? projects.length
                  : projects.filter((p) => p.disciplines.includes(f)).length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {filtered.length} projects
        </p>
        <div className="project-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
