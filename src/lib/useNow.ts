'use client'

import { useEffect, useState } from 'react'

/**
 * Current time in ms, refreshed every `intervalMs`. Null until after mount so
 * server and client render the same markup (no hydration mismatch).
 */
export function useNow(intervalMs = 30_000): number | null {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const tick = () => setNow(Date.now())
    const first = setTimeout(tick, 0)
    const t = setInterval(tick, intervalMs)
    return () => {
      clearTimeout(first)
      clearInterval(t)
    }
  }, [intervalMs])
  return now
}
