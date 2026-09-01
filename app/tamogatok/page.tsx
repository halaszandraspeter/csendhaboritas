import type { Metadata } from 'next'
import Image from 'next/image'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Támogatók',
  description: 'A Miskolci Csendháborítás támogatói.',
}

export default async function TamogatokPage() {
  const event = await getEvent()
  const sponsors = event?.sponsors ?? []

  return (
    <main className="px-6 py-16 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        TÁMOGATÓK
      </h1>

      {sponsors.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor) => {
            const logoUrl = sponsor.logo
              ? sanityImageUrl(sponsor.logo).width(300).height(200).fit('max').url()
              : null

            return (
              <a
                key={sponsor._key}
                href={sponsor.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 p-4 border border-muted hover:border-fg/30 transition-colors group"
              >
                {logoUrl ? (
                  <div className="relative w-full aspect-[3/2]">
                    <Image
                      src={logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[3/2] bg-surface flex items-center justify-center">
                    <span className="font-display text-lg tracking-widest text-muted-fg">
                      {sponsor.name}
                    </span>
                  </div>
                )}
                <span className="font-display text-sm tracking-widest text-muted-fg group-hover:text-fg transition-colors text-center">
                  {sponsor.name}
                </span>
              </a>
            )
          })}
        </div>
      ) : (
        <div className="font-body text-base leading-relaxed text-fg/80 text-center">
          <p>Hamarosan...</p>
        </div>
      )}
    </main>
  )
}
