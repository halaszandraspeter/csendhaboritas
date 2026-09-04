import type { Metadata } from 'next'
import { getAllActivities, getAllBands, getEvent } from '@/src/lib/sanity/queries'
import { footerOverlapPaddingClass } from '@/src/config/layout'
import { eventDayLabels } from '@/src/lib/dates'
import { buildRows } from '@/src/lib/program'
import { ProgramTimeline } from '@/src/components/sections/ProgramTimeline'

export const metadata: Metadata = {
  title: 'Program',
  description: 'A Miskolci Csendháborítás két napjának teljes műsora — Október 9–10.',
}

export default async function ProgramPage() {
  const [bands, activities, event] = await Promise.all([
    getAllBands(),
    getAllActivities(),
    getEvent(),
  ])
  const days = eventDayLabels(event?.days)
  const day1Rows = buildRows(bands, activities, 1, event?.days?.[0])
  const day2Rows = buildRows(bands, activities, 2, event?.days?.[1])

  return (
    <div className={`min-h-dvh px-6 py-16 max-w-3xl mx-auto w-full ${footerOverlapPaddingClass}`}>
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-16 text-center">
        PROGRAM
      </h1>

      <div className="space-y-20">
        <ProgramTimeline
          label={days[0]?.upper ?? 'OKTÓBER 9.'}
          weekday={days[0]?.weekday ?? ''}
          dayColor="day1"
          rows={day1Rows}
          showHint
        />
        <ProgramTimeline
          label={days[1]?.upper ?? 'OKTÓBER 10.'}
          weekday={days[1]?.weekday ?? ''}
          dayColor="day2"
          rows={day2Rows}
          showHint
        />
      </div>

      <p className="text-center text-xs text-muted-fg font-body mt-16">
        {[event?.venue ?? 'Grizzly Music Pub', event?.city ?? 'Miskolc', event?.year ?? '2026'].join(
          ' · '
        )}
      </p>
    </div>
  )
}
