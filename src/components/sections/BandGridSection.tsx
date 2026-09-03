import { BandCard } from '@/src/components/ui/BandCard'
import { DoodleArrow } from '@/src/components/ui/DoodleArrow'
import { eventDayLabels } from '@/src/lib/dates'
import type { Band, EventData } from '@/src/types'

interface BandGridSectionProps {
  day1Bands: Band[]
  day2Bands: Band[]
  event?: EventData | null
}

/** Renders a day section — real data if available, "coming soon" otherwise */
function DaySection({
  label,
  bands,
  accentClass,
  day,
  dayLabel,
}: {
  label: string
  bands: Band[]
  accentClass: string
  day: 1 | 2
  dayLabel?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p className={`font-display text-2xl md:text-3xl tracking-widest ${accentClass} uppercase`}>
          {label}
        </p>
        {bands.length > 0 && <DoodleArrow day={day} className="ml-auto" />}
      </div>
      {bands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
          {bands.map((band) => (
            <BandCard key={band._id} band={band} dayLabel={dayLabel} />
          ))}
        </div>
      ) : (
        <p className="font-display text-2xl tracking-widest text-muted-fg/50 py-10 text-center">
          HAMAROSAN...
        </p>
      )}
    </div>
  )
}

export function BandGridSection({ day1Bands, day2Bands, event }: BandGridSectionProps) {
  const days = eventDayLabels(event?.days)
  const d1 = days[0]?.title ?? 'Október 9.'
  const d2 = days[1]?.title ?? 'Október 10.'
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto w-full scroll-mt-24" id="fellepok">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        FELLÉPŐK
      </h2>

      <div className="space-y-10">
        <DaySection
          label={`${d1} — 1. Nap`}
          bands={day1Bands}
          accentClass="text-day1"
          day={1}
          dayLabel={d1}
        />
        <DaySection
          label={`${d2} — 2. Nap`}
          bands={day2Bands}
          accentClass="text-day2"
          day={2}
          dayLabel={d2}
        />
      </div>
    </section>
  )
}
