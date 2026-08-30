import { BandCard } from '@/src/components/ui/BandCard'
import type { Band } from '@/src/types'

interface BandGridSectionProps {
  day1Bands: Band[]
  day2Bands: Band[]
}

const PLACEHOLDER_DAY1 = ['TISZTAKOSZ', 'YÜREI', 'RISINGS', 'ÉGITESTEK', 'LITTLE MISS', 'TELTHÁZ']
const PLACEHOLDER_DAY2 = ['LIES', 'BLISS', 'DAY OUT', 'PUB VATIS', 'DEMPY', 'LIBERTÉ']

export function BandGridSection({ day1Bands, day2Bands }: BandGridSectionProps) {
  const hasData = day1Bands.length > 0 || day2Bands.length > 0

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto w-full" id="zenekarok">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        ZENEKAROK
      </h2>

      {hasData ? (
        <>
          {day1Bands.length > 0 && (
            <div className="mb-10">
              <p className="font-display text-sm tracking-widest text-day1 mb-4 uppercase">
                Október 9. — 1. Nap
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
                {day1Bands.map((band) => (
                  <BandCard key={band._id} band={band} />
                ))}
              </div>
            </div>
          )}

          {day2Bands.length > 0 && (
            <div>
              <p className="font-display text-sm tracking-widest text-day2 mb-4 uppercase">
                Október 10. — 2. Nap
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
                {day2Bands.map((band) => (
                  <BandCard key={band._id} band={band} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Placeholder grid — shown until Sanity is connected */
        <>
          <div className="mb-10">
            <p className="font-display text-sm tracking-widest text-day1 mb-4 uppercase">
              Október 9. — 1. Nap
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-muted">
              {PLACEHOLDER_DAY1.map((name) => (
                <div key={name} className="bg-surface aspect-[3/2] flex items-end p-4">
                  <span className="font-display text-xl tracking-widest text-fg/40">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-sm tracking-widest text-day2 mb-4 uppercase">
              Október 10. — 2. Nap
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-muted">
              {PLACEHOLDER_DAY2.map((name) => (
                <div key={name} className="bg-surface aspect-[3/2] flex items-end p-4">
                  <span className="font-display text-xl tracking-widest text-fg/40">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
