import { roles } from '../data'
import { EMAIL } from '../config'
import { PageIntro, Link, Arrow, CTA, NotFound } from '../components'

export default function Openings({ slug }: { slug?: string }) {
  const role = roles.find((r) => r.slug === slug)
  if (slug && !role) return <NotFound />
  if (role)
    return (
      <>
        <section className="section page-intro">
          <Link to="/openings" className="text-link">
            ← All opportunities
          </Link>
          <p className="eyebrow role-eyebrow">{role.type} / REMOTE</p>
          <h1>{role.title}</h1>
          <p className="intro-description">{role.description}</p>
        </section>
        <section className="section role-details">
          <div>
            <h2>What you’ll bring</h2>
            <ul>
              {role.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <h2>How we work</h2>
            <p>
              Open communication, thoughtful critique, and care for the details.
              We’re building a network of independent collaborators for future
              projects.
            </p>
            <p>
              This is an expression of interest, not a confirmed vacancy.
              Project scope, availability, and rates are agreed before any
              engagement.
            </p>
          </div>
          <aside>
            <p className="eyebrow">LET’S MEET</p>
            <h3>
              Show us your
              <br />
              point of view.
            </h3>
            <p>
              Send a short introduction, your portfolio, and your availability.
              No lengthy cover letter needed.
            </p>
            <a
              className="button button-dark"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Collaborator interest: ${role.title}`)}`}
            >
              Introduce yourself <Arrow />
            </a>
          </aside>
        </section>
      </>
    )
  return (
    <>
      <PageIntro
        eyebrow="OPEN MINDS WELCOME"
        title={
          <>
            Good people.
            <br />
            <em>Great chemistry.</em>
          </>
        }
        description="Interesting work starts with interesting people. We’re always curious to meet independent thinkers, thoughtful makers, and kind collaborators."
      />
      <section className="section openings">
        <div className="opportunities-note">
          <i className="status-dot" />
          <p>
            Building our collaborator network. The roles below are expressions
            of interest for future projects, not active employment vacancies.
          </p>
        </div>
        {roles.map((r, i) => (
          <Link to={`/openings/${r.slug}`} key={r.slug} className="opening-row">
            <span>0{i + 1}</span>
            <div>
              <h2>{r.title}</h2>
              <p>{r.type} · Remote · Expression of interest</p>
            </div>
            <Arrow />
          </Link>
        ))}
        <div className="open-application">
          <h3>Don’t see your thing?</h3>
          <p>Good talent rarely fits neatly into a box.</p>
          <a
            className="text-link"
            href={`mailto:${EMAIL}?subject=An%20introduction`}
          >
            Say hello anyway <Arrow />
          </a>
        </div>
      </section>
      <CTA />
    </>
  )
}
