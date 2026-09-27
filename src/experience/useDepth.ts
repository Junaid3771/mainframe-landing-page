import { useEffect } from 'react'
import { useMotion } from './useMotion'

export function useDepth(route: string) {
  const motion = useMotion()
  useEffect(() => {
    if (!motion || !matchMedia('(pointer:fine)').matches) return
    let active: HTMLElement | null = null,
      frame = 0,
      x = 0,
      y = 0
    const reset = () => {
      if (active) {
        active.style.setProperty('--tilt-x', '0deg')
        active.style.setProperty('--tilt-y', '0deg')
        active = null
      }
    }
    const move = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(
        '.project-art,.product-art,.studio-symbol',
      )
      if (card !== active) {
        reset()
        active = card
      }
      if (!card) return
      const rect = card.getBoundingClientRect()
      x = (e.clientX - rect.left) / rect.width
      y = (e.clientY - rect.top) / rect.height
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0
          if (active) {
            active.style.setProperty('--tilt-x', `${(y - 0.5) * -9}deg`)
            active.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`)
            active.style.setProperty('--light-x', `${x * 100}%`)
            active.style.setProperty('--light-y', `${y * 100}%`)
          }
        })
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      reset()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
    }
  }, [route, motion])
}
