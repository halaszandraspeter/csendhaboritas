import { BandCard } from '@/src/components/ui/BandCard'
import { PLACEHOLDER_DAY1, PLACEHOLDER_DAY2 } from '@/src/data/placeholder'
import type { Band } from '@/src/types'

interface BandGridSectionProps {
  day1Bands: Band[]
  day2Bands: Band[]
}

/** Renders a day section — real data if available, placeholder otherwise */
function DaySection({
  label,
  bands,
  placeholderNames,
  accentClass,
}: {
  label: string
  bands: Band[]
  placeholderNames: readonly string[]
  accentClass: string
}) {
  return (
    <div>
      <p className={`font-display text-sm tracking-widest ${accentClass} mb-4 uppercase`}>
        {label}
      </p>
      {bands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
          {bands.map((band) => (
            <BandCard key={band._id} band={band} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-muted">
          {placeholderNames.map((name) => (
            <div key={name} className="bg-surface aspect-[3/2] flex items-end p-4">
              <span className="font-display text-xl tracking-widest text-fg/40">{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function BandGridSection({ day1Bands, day2Bands }: BandGridSectionProps) {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto w-full" id="zenekarok">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        ZENEKAROK
      </h2>

      <div className="space-y-10">
        <DaySection
          label="Október 9. — 1. Nap"
          bands={day1Bands}
          placeholderNames={PLACEHOLDER_DAY1}
          accentClass="text-day1"
        />
        <DaySection
          label="Október 10. — 2. Nap"
          bands={day2Bands}
          placeholderNames={PLACEHOLDER_DAY2}
          accentClass="text-day2"
        />
      </div>
    </section>
  )
}
