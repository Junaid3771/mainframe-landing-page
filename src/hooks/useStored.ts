import { useState, useEffect } from 'react'

export function useStored<T>(
  key: string,
  initial: T,
  valid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) || 'null')
      return valid(parsed) ? parsed : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* Storage is optional. */
    }
  }, [key, value])
  return [value, setValue] as const
}
