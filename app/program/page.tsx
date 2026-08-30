import type { Metadata } from 'next'
import { getAllBands } from '@/src/lib/sanity/queries'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Program',
  description: 'A Miskolci Csendháborítás két napjának teljes műsora — Október 9–10.',
}

const PLACEHOLDER: Record<1 | 2, string[]> = {
  1: ['TISZTAKOSZ', 'YÜREI', 'RISINGS', 'ÉGITESTEK', 'LITTLE MISS', 'TELTHÁZ'],
  2: ['LIES', 'BLISS', 'DAY OUT', 'PUB VATIS', 'DEMPY', 'LIBERTÉ'],
}

export default async function ProgramPage() {
  const bands = await getAllBands()
  const day1Bands = bands.filter((b) => b.day === 1)
  const day2Bands = bands.filter((b) => b.day === 2)
  const hasData = bands.length > 0

  return (
    <div className="min-h-dvh px-6 py-16 max-w-5xl mx-auto w-full">
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        PROGRAM
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Day 1 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-day1" />
            <p className="font-display text-2xl tracking-widest text-day1 whitespace-nowrap">
              OKTÓBER 9.
            </p>
            <div className="h-px flex-1 bg-day1" />
          </div>

          <ul className="space-y-1">
            {hasData
              ? day1Bands.map((band) => (
                  <li key={band._id}>
                    <Link
                      href={`/zenekarok/${band.slug.current}`}
                      className="flex justify-between items-center py-3 border-b border-muted hover:border-day1 group transition-colors"
                    >
                      <span className="font-display text-xl tracking-widest text-fg group-hover:text-day1 transition-colors">
                        {band.name}
                      </span>
                      <div className="flex items-center gap-3">
                        {band.genre && (
                          <span className="text-xs text-muted-fg font-body hidden sm:block">
                            {band.genre}
                          </span>
                        )}
                        {band.setTime && (
                          <span className="font-display text-sm text-day1 tabular-nums">
                            {band.setTime}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))
              : PLACEHOLDER[1].map((name) => (
                  <li
                    key={name}
                    className="py-3 border-b border-muted font-display text-xl tracking-widest text-fg/40"
                  >
                    {name}
                  </li>
                ))}
          </ul>
        </div>

        {/* Day 2 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-day2" />
            <p className="font-display text-2xl tracking-widest text-day2 whitespace-nowrap">
              OKTÓBER 10.
            </p>
            <div className="h-px flex-1 bg-day2" />
          </div>

          <ul className="space-y-1">
            {hasData
              ? day2Bands.map((band) => (
                  <li key={band._id}>
                    <Link
                      href={`/zenekarok/${band.slug.current}`}
                      className="flex justify-between items-center py-3 border-b border-muted hover:border-day2 group transition-colors"
                    >
                      <span className="font-display text-xl tracking-widest text-fg group-hover:text-day2 transition-colors">
                        {band.name}
                      </span>
                      <div className="flex items-center gap-3">
                        {band.genre && (
                          <span className="text-xs text-muted-fg font-body hidden sm:block">
                            {band.genre}
                          </span>
                        )}
                        {band.setTime && (
                          <span className="font-display text-sm text-day2 tabular-nums">
                            {band.setTime}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))
              : PLACEHOLDER[2].map((name) => (
                  <li
                    key={name}
                    className="py-3 border-b border-muted font-display text-xl tracking-widest text-fg/40"
                  >
                    {name}
                  </li>
                ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-muted-fg font-body mt-12">
        Grizzly Music Pub · Miskolc · 2026
      </p>
    </div>
  )
}
