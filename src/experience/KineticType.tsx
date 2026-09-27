import { useState } from 'react'
import type { CSSProperties } from 'react'

export default function KineticType() {
  const [text, setText] = useState('MAKE IT MOVE')
  const [style, setStyle] = useState('Ripple')
  const [speed, setSpeed] = useState(1)
  return (
    <div className="type-experiment">
      <div
        className={`type-stage type-${style.toLowerCase()}`}
        style={
          {
            '--type-speed': `${2.6 / speed}s`,
            '--letters': Math.max(text.length, 1),
          } as CSSProperties
        }
      >
        <div className="stage-topline">
          <span>03 / TYPE IN MOTION</span>
          <span>YOUR WORDS. OUR PLAYGROUND.</span>
        </div>
        <div
          className="kinetic-letters"
          role="img"
          aria-label={text || 'Type something below'}
        >
          {(text || 'YOUR IDEA').split('').map((letter, i) => (
            <span
              key={i}
              style={{ '--letter': i } as CSSProperties}
              aria-hidden="true"
            >
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </div>
        <div className="stage-bottomline">
          <span>CHANGE THE WORDS. CHANGE THE FEELING.</span>
          <span>{style.toUpperCase()}</span>
        </div>
      </div>
      <div className="type-controls">
        <label>
          Your words
          <input
            value={text}
            maxLength={18}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="MAKE IT MOVE"
          />
          <span>{text.length}/18</span>
        </label>
        <div>
          <p className="control-label">MOVEMENT</p>
          <div className="choice-group">
            {['Ripple', 'Stretch', 'Float'].map((s) => (
              <button
                key={s}
                aria-pressed={s === style}
                onClick={() => setStyle(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <label>
          Type tempo
          <input
            type="range"
            min=".5"
            max="2"
            step=".1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}
