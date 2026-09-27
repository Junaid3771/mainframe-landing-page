import { useState } from 'react'
import { PageIntro, Sculpture, Link, Arrow, CTA } from '../components'

export default function Labs() {
  const [mode, setMode] = useState('orbit')
  const [speed, setSpeed] = useState(1)
  const [hue, setHue] = useState(0)
  const [paused, setPaused] = useState(false)
  return (
    <>
      <PageIntro
        eyebrow="MAINFRAME LABS / EXPERIMENT 001"
        title={
          <>
            Less permission.
            <br />
            <em>More possibility.</em>
          </>
        }
        description="An open playground for form, motion, and happy accidents. Take the controls and make something unexpected."
      />
      <section className="section lab-section">
        <div className={`lab-canvas ${paused ? 'is-paused' : ''}`}>
          <div className="lab-canvas-label">
            <span>ORBITAL PLAY</span>
            <span>
              {paused ? 'PAUSED' : 'LIVE EXPERIMENT'}{' '}
              <i className="status-dot" />
            </span>
          </div>
          <Sculpture mode={mode} speed={speed} hue={hue} />
          <span className="lab-coordinate">X: ∞ &nbsp; Y: POSSIBILITY</span>
        </div>
        <div className="lab-controls">
          <div>
            <p className="eyebrow">01 / FORM</p>
            <div className="segmented">
              {['orbit', 'helix', 'bloom'].map((m) => (
                <button
                  key={m}
                  className={mode === m ? 'active' : ''}
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <label>
            <span className="eyebrow">
              02 / TEMPO <b>{speed.toFixed(1)}×</b>
            </span>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
          <label>
            <span className="eyebrow">
              03 / COLOR SHIFT <b>{hue}°</b>
            </span>
            <input
              type="range"
              min="0"
              max="300"
              step="1"
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
            />
          </label>
          <div className="lab-actions">
            <button className="pill active" onClick={() => setPaused(!paused)}>
              {paused ? 'Play motion' : 'Pause motion'}
            </button>
            <button
              className="text-link"
              onClick={() => {
                setMode('orbit')
                setSpeed(1)
                setHue(0)
                setPaused(false)
              }}
            >
              Reset ↺
            </button>
          </div>
        </div>
        <p className="section-note">
          Designed to be explored. Motion respects your device’s reduced-motion
          preference.
        </p>
      </section>
      <section className="section lab-note">
        <p className="eyebrow">WHY WE PLAY</p>
        <h2>
          Not every experiment needs a destination.
          <br />
          <em>Sometimes curiosity is enough.</em>
        </h2>
        <Link
          to="/contact?service=Motion%20%26%20experiments"
          className="text-link"
        >
          Make something unexpected with us <Arrow />
        </Link>
      </section>
      <CTA />
    </>
  )
}
