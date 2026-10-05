'use client'

import Image from 'next/image'
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
  1: { label: 'text-day1', currentBg: 'bg-day1', sticker: '/sticker-green.webp' },
  2: { label: 'text-day2', currentBg: 'bg-day2', sticker: '/sticker-purple.webp' },
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
  const sortedBands = [...bands].sort((a, b) => {
    const aMs = setEpoch(dayIso, a.setTime, a.hajnal)
    const bMs = setEpoch(dayIso, b.setTime, b.hajnal)
    if (aMs == null && bMs == null) return 0
    if (aMs == null) return 1
    if (bMs == null) return -1
    return aMs - bMs
  })
  const statuses = computeStatuses(
    sortedBands.map((b) => ({ startMs: setEpoch(dayIso, b.setTime, b.hajnal) })),
    now
  )

  return (
    <div className="relative border border-muted p-6">
      <div className="absolute -top-9 -right-3 w-28 h-28 md:w-32 md:h-32 rotate-30 z-10">
        <Image
          src={s.sticker}
          alt=""
          fill
          className={cn('object-contain', day === 1 && 'scale-[1.08]')}
          aria-hidden="true"
        />
        <span className="relative flex h-full w-full items-center justify-center pt-1 font-display tracking-widest text-base md:text-lg text-bg font-bold">
          2000 Ft
        </span>
      </div>
      <p className={cn('font-display text-2xl md:text-3xl tracking-widest mb-4', s.label)}>
        {label} — {day}. NAP
      </p>
      <ul className="space-y-2">
        {sortedBands.length > 0 ? (
          sortedBands.map((band, i) => {
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

      <div className="text-center mt-8">
        <div className="relative inline-block pr-30 md:pr-34">
          <p className="font-display tracking-widest text-lg md:text-xl text-fg">
            KÉT NAPIJEGY CSAK
          </p>
          <div
            className="absolute top-1/2 right-0 w-28 h-28 md:w-32 md:h-32 shrink-0"
            style={{ transform: 'translateY(calc(-50% - 0.125rem))' }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            >
              <Image src="/sticker-green.webp" alt="" fill className="object-contain scale-[1.08]" aria-hidden="true" />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            >
              <Image src="/sticker-purple.webp" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <span className="absolute inset-0 flex items-center justify-center pt-1 font-display tracking-wide text-lg md:text-xl text-bg font-bold">
              3000 Ft
            </span>
          </div>
        </div>
        <p className="font-body text-sm text-muted-fg mt-1">
          Karszalagvásárlás a helyszínen készpénzzel vagy kártyával.
        </p>
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
