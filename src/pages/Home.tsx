import AriaHero from '../AriaHero'
import { projects } from '../data'
import {
  Sculpture,
  SectionHeading,
  ProjectCard,
  Mark,
  Link,
  Arrow,
  CTA,
} from '../components'

export default function Home({ motion }: { motion: boolean }) {
  return (
    <>
      <AriaHero motion={motion} />
      <div className="ticker" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              INDEPENDENT MINDS <b>✳</b> UNEXPECTED OUTCOMES <b>✳</b>{' '}
            </span>
          ))}
        </div>
      </div>
      <section id="selected-work" className="section work-section">
        <SectionHeading
          eyebrow="01 / SELECTED WORK"
          title="Different by design."
          link={{ text: 'All projects', to: '/work' }}
        />
        <div className="project-grid">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <p className="section-note">
          A selection of self-initiated concepts. A glimpse of what we could
          make together.
        </p>
      </section>
      <section className="studio-teaser section">
        <div className="studio-symbol reveal">
          <Mark />
          <span>
            THINK FORWARD.
            <br />
            FEEL SOMETHING.
          </span>
        </div>
        <div className="reveal">
          <p className="eyebrow">02 / A DIFFERENT FRAME OF MIND</p>
          <h2>
            Small studio.
            <br />
            Big <em>what if.</em>
          </h2>
          <p>
            We’re a creative practice built around a simple belief: the best
            work happens when curious people make brave decisions together.
          </p>
          <p>
            From the first question to the final pixel, we connect clear
            thinking with expressive design.
          </p>
          <Link to="/studio" className="text-link">
            Meet Mainframe <Arrow />
          </Link>
        </div>
      </section>
      <section className="section capabilities">
        <SectionHeading
          eyebrow="03 / WHAT WE BRING"
          title="From spark to something real."
        />
        {[
          [
            '01',
            'Brand strategy',
            'Find your point of view. Give people something to believe in.',
            'Positioning · Naming · Brand voice',
          ],
          [
            '02',
            'Brand identity',
            'A visual world that feels unmistakably you.',
            'Art direction · Identity systems · Guidelines',
          ],
          [
            '03',
            'Digital experiences',
            'Beautiful to look at. Even better to use.',
            'Web design · Development · Interaction',
          ],
          [
            '04',
            'Motion & experiments',
            'Ideas with a pulse, made to move people.',
            'Motion systems · Creative coding · Prototypes',
          ],
        ].map(([n, title, copy, tags]) => (
          <Link
            to={`/contact?service=${encodeURIComponent(title)}`}
            className="service-row reveal"
            key={n}
          >
            <span className="service-number">{n}</span>
            <h3>{title}</h3>
            <div>
              <p>{copy}</p>
              <span>{tags}</span>
            </div>
            <Arrow />
          </Link>
        ))}
      </section>
      <section className="lab-teaser section">
        <div>
          <p className="eyebrow">04 / MAINFRAME LABS</p>
          <h2>
            Serious about
            <br />
            <em>playing.</em>
          </h2>
          <p>
            No brief. No boundaries. Just curiosity.
            <br />
            Step inside our space for happy accidents.
          </p>
          <Link to="/labs" className="button button-dark">
            Enter the lab <Arrow />
          </Link>
        </div>
        <div className="lab-mini">
          <Sculpture mode="helix" />
          <span>EXPERIMENT 001 / ORBITAL PLAY</span>
        </div>
      </section>
      <CTA />
    </>
  )
}
