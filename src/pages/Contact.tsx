import { useState, type FormEvent } from 'react'
import { EMAIL } from '../config'
import { Link, Arrow, Mark } from '../components'

export default function Contact({ search }: { search: string }) {
  const service = new URLSearchParams(search).get('service') || ''
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    service,
    budget: '',
    message: '',
  })
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState('')
  const update = (name: string, value: string) => {
    setReady(false)
    setValues((v) => ({ ...v, [name]: value }))
  }
  const body = `Hello Mainframe,\n\n${values.message}\n\nName: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || 'Not specified'}\nInterested in: ${values.service}\nBudget: ${values.budget || 'Let’s discuss'}`
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setReady(true)
  }
  return (
    <>
      <section className="section contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">EVERY GOOD THING STARTS SOMEWHERE</p>
          <h1>
            Let’s make
            <br />
            <em>something</em>
            <br />
            great.
          </h1>
          <p>
            A big idea, a small question, or a brief hello.
            <br />
            We’re all ears.
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            {EMAIL} <Arrow />
          </a>
          <button
            className="text-link copy-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(EMAIL)
                setCopied('Email copied')
              } catch {
                setCopied(
                  'Copy the email address above, or open it in your email app.',
                )
              }
            }}
          >
            {copied || 'Copy email address ⧉'}
          </button>
          <span className="sr-only" role="status">
            {copied}
          </span>
          <div className="contact-stamp">
            <Mark />
            <span>
              GOOD TASTE
              <br />
              TENDS TO FIND US.
            </span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <p className="eyebrow">TELL US WHAT’S ON YOUR MIND</p>
          <div className="form-row">
            <label>
              Your name <span>*</span>
              <input
                required
                maxLength={100}
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                required
                type="email"
                maxLength={150}
                name="email"
                autoComplete="email"
                placeholder="alex@company.com"
                value={values.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </label>
          </div>
          <label>
            Company / organisation
            <input
              name="company"
              maxLength={120}
              autoComplete="organization"
              placeholder="Where you’re making things happen"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </label>
          <div className="form-row">
            <label>
              I’m interested in <span>*</span>
              <select
                required
                name="service"
                value={values.service}
                onChange={(e) => update('service', e.target.value)}
              >
                <option value="">Choose a service</option>
                {[
                  'Brand strategy',
                  'Brand identity',
                  'Digital experiences',
                  'Motion & experiments',
                  'Something else',
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Budget range
              <select
                name="budget"
                value={values.budget}
                onChange={(e) => update('budget', e.target.value)}
              >
                <option value="">Let’s discuss</option>
                <option>Under $5,000 USD</option>
                <option>$5,000–$15,000 USD</option>
                <option>$15,000–$30,000 USD</option>
                <option>$30,000+ USD</option>
              </select>
            </label>
          </div>
          <label>
            A little about your project <span>*</span>
            <textarea
              required
              minLength={20}
              maxLength={3000}
              rows={5}
              name="message"
              placeholder="What are you building? What would you like to change? Tell us a little about the idea, your goals, and your timeline."
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
            />
            <small>{values.message.length}/3000 · At least 20 characters</small>
          </label>
          <p className="form-note">
            Your details stay in this page until you choose to open your email
            app. Nothing is submitted to a server.{' '}
            <Link to="/privacy">Privacy details</Link>
          </p>
          <button type="submit" className="button button-dark">
            Prepare my enquiry <Arrow />
          </button>
          {ready && (
            <div className="form-success" role="status">
              <h3>Your brief is ready.</h3>
              <p>
                Open the draft in your email app, review it, and press send
                there. Your enquiry has not been sent yet.
              </p>
              <a
                className="button button-dark"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`New project: ${values.service} — ${values.name}`)}&body=${encodeURIComponent(body)}`}
              >
                Open email draft <Arrow />
              </a>
              <button
                type="button"
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(body)
                    setCopied(
                      'Brief copied. Paste it into an email to hello@mainframe.co.',
                    )
                  } catch {
                    setCopied(
                      'Clipboard unavailable. Select and copy the brief below.',
                    )
                  }
                }}
              >
                Copy brief ⧉
              </button>
              <details>
                <summary>View prepared brief</summary>
                <pre>{body}</pre>
              </details>
              <p>{copied}</p>
            </div>
          )}
        </form>
      </section>
    </>
  )
}
