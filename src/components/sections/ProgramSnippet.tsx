'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { eventDayLabels, setEpoch } from '@/src/lib/dates'
import { computeStatuses } from '@/src/lib/program'
import { cn } from '@/src/lib/utils'
import type { Band, EventData } from '@/src/types'

interface ProgramSnippetProps {
  day1Bands: Band[]
  day2Bands: Band[]
  event?: EventData | null
}

const dayStyles = {
  1: { label: 'text-day1', currentBg: 'bg-day1' },
  2: { label: 'text-day2', currentBg: 'bg-day2' },
} as const

function DayList({
  label,
  bands,
  day,
  dayIso,
}: {
  label: string
  bands: Band[]
  day: 1 | 2
  dayIso?: string
}) {
  // Start null to avoid SSR/client hydration mismatch; fill in after mount.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  const s = dayStyles[day]
  const statuses = computeStatuses(
    bands.map((b) => ({ startMs: setEpoch(dayIso, b.setTime) })),
    now
  )

  return (
    <div className="border border-muted p-6">
      <p className={cn('font-display text-2xl md:text-3xl tracking-widest mb-4', s.label)}>
        {label} — {day}. NAP
      </p>
      <ul className="space-y-2">
        {bands.length > 0 ? (
          bands.map((band, i) => {
            const status = statuses[i]
            const current = status === 'current'
            return (
              <li
                key={band._id}
                className={cn(
                  'flex justify-between items-center font-body text-lg transition-all',
                  status === 'past' && 'opacity-40',
                  current && cn('-mx-2 rounded px-2 py-1', s.currentBg)
                )}
              >
                <span
                  className={cn(
                    'font-display tracking-wider text-xl md:text-2xl',
                    current ? 'text-bg' : 'text-fg'
                  )}
                >
                  {band.name}
                </span>
                {band.setTime && (
                  <span
                    className={cn(
                      'tabular-nums text-lg md:text-xl',
                      current ? 'text-bg' : 'text-muted-fg'
                    )}
                  >
                    {band.setTime}
                  </span>
                )}
              </li>
            )
          })
        ) : (
          <li className="font-display text-lg tracking-widest text-muted-fg/50 py-4 text-center">
            HAMAROSAN...
          </li>
        )}
      </ul>
    </div>
  )
}

export function ProgramSnippet({ day1Bands, day2Bands, event }: ProgramSnippetProps) {
  const days = eventDayLabels(event?.days)
  const d1 = days[0]?.upper ?? 'OKTÓBER 9.'
  const d2 = days[1]?.upper ?? 'OKTÓBER 10.'
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto w-full scroll-mt-24" id="program">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-10">
        KONCERTEK
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DayList label={d1} bands={day1Bands} day={1} dayIso={event?.days?.[0]} />
        <DayList label={d2} bands={day2Bands} day={2} dayIso={event?.days?.[1]} />
      </div>

      <div className="text-center mt-10">
        <Link
          href="/program"
          className="inline-block font-display tracking-widest text-lg md:text-xl bg-fg text-bg px-10 py-4 hover:bg-fg/90 transition-colors"
        >
          TELJES PROGRAM →
        </Link>
      </div>
    </section>
  )
}
