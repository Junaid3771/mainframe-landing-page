import { PageIntro, Mark, SectionHeading, CTA } from '../components'

export default function Studio() {
  return (
    <>
      <PageIntro
        eyebrow="HELLO. WE’RE MAINFRAME."
        title={
          <>
            Built on curiosity.
            <br />
            <em>Driven by feeling.</em>
          </>
        }
        description="An independent creative studio connecting strategy, identity, and digital craft. We make brands feel like themselves—only louder."
      />
      <section className="studio-banner">
        <div className="studio-banner-type">
          OPEN
          <br />
          <em>MINDS.</em>
        </div>
        <Mark />
        <span>GOOD PEOPLE. BETTER QUESTIONS.</span>
      </section>
      <section className="section case-story">
        <p className="eyebrow">OUR POINT OF VIEW</p>
        <div>
          <h2>
            Great work starts
            <br />
            with a better question.
          </h2>
          <p>
            What if a brand could feel less like a business and more like a
            belief? What if your website was the most interesting thing in the
            room? What if we stopped doing what’s expected?
          </p>
          <p>
            That’s where we like to start. We bring a collaborative mindset and
            a hands-on approach to every project, building purposeful systems
            with room for surprise.
          </p>
        </div>
      </section>
      <section className="section values-section">
        <SectionHeading
          eyebrow="HOW WE THINK"
          title="A few things we believe."
        />
        <div className="value-grid">
          {[
            [
              'Stay curious.',
              'Ask why. Then ask what if. The interesting answers usually live one question further.',
            ],
            [
              'Make it matter.',
              'Good design earns its place. Every decision should serve an idea and the people behind it.',
            ],
            [
              'Build together.',
              'We treat collaboration as part of the craft. Open conversations make better work.',
            ],
          ].map(([title, copy], i) => (
            <div className="value-card reveal" key={title}>
              <span>0{i + 1} /</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="OUR PROCESS" title="Clarity at every step." />
        <div className="process-grid">
          {[
            [
              'Discover',
              'We listen, research, and map the opportunity. A shared brief gives every decision a purpose.',
            ],
            [
              'Define',
              'We establish the strategy, creative direction, and a clear plan for what comes next.',
            ],
            [
              'Create',
              'Ideas become tangible. We explore, prototype, and refine together with regular feedback.',
            ],
            [
              'Launch',
              'We test the details, prepare the handover, and help the work find its place in the world.',
            ],
          ].map(([t, d], i) => (
            <div key={t}>
              <span className="process-index">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
