import type { Metadata } from 'next'
import { getAllBands } from '@/src/lib/sanity/queries'
import { BandCard } from '@/src/components/ui/BandCard'

export const metadata: Metadata = {
  title: 'Zenekarok',
  description: '12 zenekar, 2 nap — ismerd meg a Miskolci Csendháborítás fellépőit.',
}

const PLACEHOLDER_DAY1 = ['TISZTAKOSZ', 'YÜREI', 'RISINGS', 'ÉGITESTEK', 'LITTLE MISS', 'TELTHÁZ']
const PLACEHOLDER_DAY2 = ['LIES', 'BLISS', 'DAY OUT', 'PUB VATIS', 'DEMPY', 'LIBERTÉ']

export default async function ZenekarokPage() {
  const bands = await getAllBands()
  const day1Bands = bands.filter((b) => b.day === 1)
  const day2Bands = bands.filter((b) => b.day === 2)
  const hasData = bands.length > 0

  return (
    <div className="min-h-dvh px-6 py-16 max-w-7xl mx-auto w-full">
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        ZENEKAROK
      </h1>

      {hasData ? (
        <>
          {/* Day 1 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-day1" />
              <p className="font-display text-xl tracking-widest text-day1 whitespace-nowrap">
                OKTÓBER 9. — 1. NAP
              </p>
              <div className="h-px flex-1 bg-day1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
              {day1Bands.map((band) => (
                <BandCard key={band._id} band={band} />
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-day2" />
              <p className="font-display text-xl tracking-widest text-day2 whitespace-nowrap">
                OKTÓBER 10. — 2. NAP
              </p>
              <div className="h-px flex-1 bg-day2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-muted">
              {day2Bands.map((band) => (
                <BandCard key={band._id} band={band} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Placeholder */
        <>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-day1" />
              <p className="font-display text-xl tracking-widest text-day1 whitespace-nowrap">
                OKTÓBER 9. — 1. NAP
              </p>
              <div className="h-px flex-1 bg-day1" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-muted">
              {PLACEHOLDER_DAY1.map((name) => (
                <div key={name} className="bg-surface aspect-[3/2] flex items-end p-4">
                  <span className="font-display text-xl tracking-widest text-fg/40">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-day2" />
              <p className="font-display text-xl tracking-widest text-day2 whitespace-nowrap">
                OKTÓBER 10. — 2. NAP
              </p>
              <div className="h-px flex-1 bg-day2" />
            </div>
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
    </div>
  )
}
