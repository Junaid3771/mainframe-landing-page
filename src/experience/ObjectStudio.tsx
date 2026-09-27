import { useEffect, useRef, useState } from 'react'
import type { mountScene, SceneOptions } from './scene'
import { useMotion } from './useMotion'

export default function ObjectStudio({
  compact = false,
}: {
  compact?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engine = useRef<ReturnType<typeof mountScene> | null>(null)
  const motion = useMotion()
  const [shape, setShape] = useState('Knot')
  const [finish, setFinish] = useState('Crimson')
  const [spread, setSpread] = useState(25)
  const [playing, setPlaying] = useState(true)
  const [state, setState] = useState('loading')
  const options = useRef<SceneOptions>({
    shape,
    finish,
    spread,
    playing,
    motion,
  })
  useEffect(() => {
    options.current = { shape, finish, spread, playing, motion }
    engine.current?.update(options.current)
  }, [shape, finish, spread, playing, motion])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false,
      started = false
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        try {
          const { mountScene } = await import('./scene')
          if (cancelled) return
          engine.current = mountScene(canvas, options.current)
          setState('ready')
        } catch {
          if (!cancelled) setState('fallback')
        }
      },
      { rootMargin: '150px' },
    )
    observer.observe(canvas)
    return () => {
      cancelled = true
      observer.disconnect()
      engine.current?.dispose()
      engine.current = null
    }
  }, [])
  return (
    <div className={`object-studio ${compact ? 'object-compact' : ''}`}>
      <div
        className="object-stage"
        data-renderer={state}
        data-shape={shape}
        data-finish={finish}
      >
        <div className="stage-topline">
          <span>01 / OBJECT STUDIO</span>
          <span className="live-label">
            <i /> REAL-TIME / 3D
          </span>
        </div>
        <div className="stage-watermark" aria-hidden="true">
          PLAY.
        </div>
        {state !== 'ready' && (
          <div
            className={`scene-fallback finish-${finish.toLowerCase()}`}
            aria-hidden="true"
          >
            <div />
            <div />
            <div />
          </div>
        )}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={state === 'ready' ? 'scene-ready' : ''}
        />
        <div className="stage-bottomline">
          <span>
            {state === 'fallback'
              ? 'STATIC PREVIEW / 3D UNAVAILABLE'
              : 'DRAG TO ROTATE. MAKE IT YOURS.'}
          </span>
          <span>MF / {shape.toUpperCase()}</span>
        </div>
      </div>
      <div className="object-controls">
        <div>
          <p className="control-label">FORM</p>
          <div className="choice-group">
            {['Knot', 'Loop', 'Facet'].map((s) => (
              <button
                key={s}
                aria-pressed={s === shape}
                onClick={() => setShape(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="control-label">FINISH</p>
          <div className="choice-group">
            {['Crimson', 'Chrome', 'Obsidian'].map((f) => (
              <button
                key={f}
                aria-pressed={f === finish}
                onClick={() => setFinish(f)}
              >
                <i className={`swatch swatch-${f.toLowerCase()}`} />
                {f}
              </button>
            ))}
          </div>
        </div>
        {!compact && (
          <label className="spread-control">
            <span className="control-label">
              EXPANSION <b>{spread}%</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
            />
          </label>
        )}
        <div className="object-actions">
          <button
            aria-label="Rotate object left"
            onClick={() => engine.current?.turn(-0.5)}
          >
            ↶
          </button>
          <button
            aria-label="Rotate object right"
            onClick={() => engine.current?.turn(0.5)}
          >
            ↷
          </button>
          <button onClick={() => setPlaying(!playing)} aria-pressed={!playing}>
            {playing ? 'Pause spin' : 'Resume spin'}
          </button>
          <button
            onClick={() => {
              setShape('Knot')
              setFinish('Crimson')
              setSpread(25)
              setPlaying(true)
              engine.current?.reset()
            }}
          >
            Reset object
          </button>
        </div>
      </div>
      {!motion && (
        <p className="motion-hint">
          Automatic motion is off. You can still change the form, finish, and
          rotation.
        </p>
      )}
    </div>
  )
}
