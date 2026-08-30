import type { Metadata } from 'next'
import { getAllBands } from '@/src/lib/sanity/queries'
import { BandCard } from '@/src/components/ui/BandCard'
import type { Band } from '@/src/types'

export const metadata: Metadata = {
  title: 'Zenekarok',
  description: '12 zenekar, 2 nap — ismerd meg a Miskolci Csendháborítás fellépőit.',
}

function DaySection({
  label,
  accentClass,
  borderClass,
  bands,
}: {
  label: string
  accentClass: string
  borderClass: string
  bands: Band[]
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-px flex-1 ${borderClass}`} />
        <p className={`font-display text-xl tracking-widest ${accentClass} whitespace-nowrap`}>
          {label}
        </p>
        <div className={`h-px flex-1 ${borderClass}`} />
      </div>
      {bands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
          {bands.map((band) => (
            <BandCard key={band._id} band={band} />
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

export default async function ZenekarokPage() {
  const bands = await getAllBands()
  const day1Bands = bands.filter((b) => b.day === 1)
  const day2Bands = bands.filter((b) => b.day === 2)

  return (
    <div className="min-h-dvh px-6 py-16 max-w-7xl mx-auto w-full">
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        ZENEKAROK
      </h1>

      <div className="space-y-12">
        <DaySection
          label="OKTÓBER 9. — 1. NAP"
          accentClass="text-day1"
          borderClass="bg-day1"
          bands={day1Bands}
        />
        <DaySection
          label="OKTÓBER 10. — 2. NAP"
          accentClass="text-day2"
          borderClass="bg-day2"
          bands={day2Bands}
        />
      </div>
    </div>
  )
}
