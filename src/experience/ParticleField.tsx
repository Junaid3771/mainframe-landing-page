import { useEffect, useRef, useState } from 'react'
import { useMotion } from './useMotion'

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState('Sphere')
  const [pulse, setPulse] = useState(0)
  const [paused, setPaused] = useState(false)
  const motion = useMotion()
  const settings = useRef({ mode, pulse, running: motion && !paused, motion })
  const redraw = useRef<() => void>(() => {})
  useEffect(() => {
    settings.current = { mode, pulse, running: motion && !paused, motion }
    redraw.current()
  }, [mode, pulse, motion, paused])
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0,
      h = 0,
      frame = 0,
      visible = false,
      time = 0,
      last = 0,
      burst = 0,
      seenPulse = 0
    let mouseX = -9999,
      mouseY = -9999
    const count = 700
    const points = Array.from({ length: count }, (_, i) => ({
      u: i / count,
      v: (i * 0.61803398875) % 1,
      x: 0,
      y: 0,
      z: 0,
    }))
    const draw = (stamp = performance.now()) => {
      frame = 0
      if (!visible || document.hidden) return
      const { mode, running, pulse, motion } = settings.current
      const dt = Math.min((stamp - (last || stamp)) / 1000, 0.035)
      last = stamp
      if (running) time += dt
      if (pulse !== seenPulse) {
        burst = motion ? 1 : 0.4
        seenPulse = pulse
      }
      if (motion) burst = Math.max(0, burst - dt * 0.8)
      ctx.clearRect(0, 0, w, h)
      const scale = Math.min(w * 0.34, h * 0.38),
        turn = time * 0.16
      points.forEach((p) => {
        const a = p.u * Math.PI * 2,
          b = p.v * Math.PI * 2
        let x, y, z
        if (mode === 'Wave') {
          x = (p.u - 0.5) * 2.5
          y = (p.v - 0.5) * 1.8
          z = Math.sin(p.u * 12 + time) * Math.cos(p.v * 8 + time * 0.5) * 0.45
        } else if (mode === 'Ring') {
          x = (0.85 + 0.25 * Math.cos(b)) * Math.cos(a)
          y = (0.85 + 0.25 * Math.cos(b)) * Math.sin(a)
          z = 0.25 * Math.sin(b)
        } else {
          const phi = Math.acos(1 - 2 * p.u)
          x = Math.sin(phi) * Math.cos(b)
          y = Math.cos(phi)
          z = Math.sin(phi) * Math.sin(b)
        }
        const rx = x * Math.cos(turn) - z * Math.sin(turn),
          rz = x * Math.sin(turn) + z * Math.cos(turn)
        const perspective = 3 / (3 + rz)
        const tx = w * 0.5 + rx * scale * perspective * (1 + burst * 0.35),
          ty = h * 0.5 + y * scale * perspective * (1 + burst * 0.35)
        const dx = tx - mouseX,
          dy = ty - mouseY,
          d = Math.hypot(dx, dy),
          force = Math.max(0, 1 - d / 110) * 35
        const ease = running ? 0.12 : 1
        p.x += (tx + (d ? (dx / d) * force : 0) - p.x) * ease
        p.y += (ty + (d ? (dy / d) * force : 0) - p.y) * ease
        p.z = rz
      })
      const sorted = [...points].sort((a, b) => b.z - a.z)
      sorted.forEach((p, i) => {
        const light = (1.4 - p.z) / 2.4
        ctx.fillStyle =
          i % 7 === 0
            ? `rgba(255,35,66,${0.35 + light * 0.6})`
            : `rgba(255,232,235,${0.12 + light * 0.65})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, 1.1 + light * 1.2), 0, Math.PI * 2)
        ctx.fill()
      })
      if (burst > 0) {
        ctx.strokeStyle = `rgba(255,42,69,${burst * 0.4})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(w * 0.5, h * 0.5, (1 - burst) * scale * 2, 0, Math.PI * 2)
        ctx.stroke()
      }
      if (running || (motion && burst > 0)) frame = requestAnimationFrame(draw)
    }
    const wake = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw)
    }
    redraw.current = wake
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const dpr = Math.min(devicePixelRatio, 1.5)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      points.forEach((p) => {
        p.x = w * 0.5
        p.y = h * 0.5
      })
      wake()
    }
    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      wake()
    }
    const leave = () => {
      mouseX = mouseY = -9999
      wake()
    }
    const activate = () => {
      setPulse((p) => p + 1)
    }
    const visibility = () => {
      last = 0
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
      } else wake()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) wake()
        else {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { rootMargin: '50px' },
    )
    io.observe(canvas)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    canvas.addEventListener('pointerdown', activate)
    document.addEventListener('visibilitychange', visibility)
    resize()
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
      canvas.removeEventListener('pointerdown', activate)
      document.removeEventListener('visibilitychange', visibility)
      redraw.current = () => {}
    }
  }, [])
  return (
    <div className="particle-experiment">
      <div className="particle-stage" data-form={mode} data-pulse={pulse}>
        <div className="stage-topline">
          <span>02 / PARTICLE SIGNAL</span>
          <span>700 POINTS. ONE REACTION.</span>
        </div>
        <canvas ref={ref} aria-hidden="true" />
        <div className="stage-bottomline">
          <span>MOVE TO DISPLACE / TAP TO SEND A PULSE</span>
          <span>LIVE FIELD</span>
        </div>
      </div>
      <div className="particle-controls">
        <div className="choice-group">
          {['Sphere', 'Ring', 'Wave'].map((s) => (
            <button
              key={s}
              aria-pressed={s === mode}
              onClick={() => setMode(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="pill" onClick={() => setPulse((p) => p + 1)}>
          Send a pulse ↗
        </button>
        <button className="pill" onClick={() => setPaused(!paused)}>
          {paused ? 'Resume field' : 'Pause field'}
        </button>
      </div>
    </div>
  )
}
