import { EMAIL } from '../config'
import { PageIntro } from '../components'

export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="THE SMALL PRINT"
        title={
          <>
            A little clarity.
            <br />
            <em>By design.</em>
          </>
        }
        description="How this website handles your information."
      />
      <section className="section legal-copy">
        <h2>Enquiries</h2>
        <p>
          The project form prepares an email on your device. Form details are
          held in memory while the page is open and are not submitted to a
          website server. Choosing “Open email draft” passes those details to
          your email application; you decide whether to send them.
        </p>
        <h2>Local preferences</h2>
        <p>
          The website stores your shop selection and motion preference in your
          browser’s local storage. These values contain product identifiers and
          a motion setting, not your contact details. You can remove them by
          clearing this site’s browser data.
        </p>
        <h2>Analytics and services</h2>
        <p>
          This application does not include analytics, advertising trackers, or
          third-party fonts. Your hosting provider may process standard request
          logs. Email you send is handled by your email provider and the
          recipient’s email service.
        </p>
        <h2>Concept content</h2>
        <p>
          Portfolio projects and shop objects are self-initiated concepts. They
          do not represent completed client engagements, verified business
          results, products currently for sale, or endorsements. Collaborator
          listings invite expressions of interest rather than advertising
          confirmed jobs.
        </p>
        <h2>Questions</h2>
        <p>
          Contact <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with questions about
          information you have shared.
        </p>
      </section>
    </>
  )
}
