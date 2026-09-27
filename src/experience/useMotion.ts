import { useEffect, useState } from 'react'

export function useMotion() {
  const [enabled, setEnabled] = useState(
    () =>
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !document.documentElement.classList.contains('motion-off'),
  )
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () =>
      setEnabled(
        !media.matches &&
          !document.documentElement.classList.contains('motion-off'),
      )
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    media.addEventListener('change', update)
    update()
    return () => {
      observer.disconnect()
      media.removeEventListener('change', update)
    }
  }, [])
  return enabled
}
