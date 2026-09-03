import Link from 'next/link'
import type { Band } from '@/src/types'

interface ProgramSnippetProps {
  day1Bands: Band[]
  day2Bands: Band[]
}

export function ProgramSnippet({ day1Bands, day2Bands }: ProgramSnippetProps) {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto w-full scroll-mt-24" id="program">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-10">
        KONCERTEK
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Day 1 */}
        <div className="border border-muted p-6">
          <p className="font-display text-2xl md:text-3xl tracking-widest text-day1 mb-4">
            OKTÓBER 9. — 1. NAP
          </p>
          <ul className="space-y-2">
            {day1Bands.length > 0 ? (
              day1Bands.map((band) => (
                <li
                  key={band._id}
                  className="flex justify-between items-center text-fg/80 font-body text-lg"
                >
                  <span className="font-display tracking-wider text-xl md:text-2xl text-fg">
                    {band.name}
                  </span>
                  {band.setTime && (
                    <span className="text-muted-fg tabular-nums text-lg md:text-xl">
                      {band.setTime}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="font-display text-lg tracking-widest text-muted-fg/50 py-4 text-center">
                HAMAROSAN...
              </li>
            )}
          </ul>
        </div>

        {/* Day 2 */}
        <div className="border border-muted p-6">
          <p className="font-display text-2xl md:text-3xl tracking-widest text-day2 mb-4">
            OKTÓBER 10. — 2. NAP
          </p>
          <ul className="space-y-2">
            {day2Bands.length > 0 ? (
              day2Bands.map((band) => (
                <li
                  key={band._id}
                  className="flex justify-between items-center text-fg/80 font-body text-lg"
                >
                  <span className="font-display tracking-wider text-xl md:text-2xl text-fg">
                    {band.name}
                  </span>
                  {band.setTime && (
                    <span className="text-muted-fg tabular-nums text-lg md:text-xl">
                      {band.setTime}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="font-display text-lg tracking-widest text-muted-fg/50 py-4 text-center">
                HAMAROSAN...
              </li>
            )}
          </ul>
        </div>
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
