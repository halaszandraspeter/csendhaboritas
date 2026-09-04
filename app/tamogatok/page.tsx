import type { Metadata } from 'next'
import Image from 'next/image'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { footerOverlapPaddingClass } from '@/src/config/layout'
import type { Sponsor } from '@/src/types'

export const metadata: Metadata = {
  title: 'Támogatók',
  description: 'A Miskolci Csendháborítás támogatói.',
}

/** Section divider matching the program page: a coloured rule with a centred label. */
function SectionLabel({ label, color }: { label: string; color: 'day1' | 'day2' }) {
  const line = color === 'day1' ? 'bg-day1' : 'bg-day2'
  const text = color === 'day1' ? 'text-day1' : 'text-day2'
  return (
    <div className="flex items-center gap-3">
      <div className={`h-px flex-1 ${line}`} />
      <p className={`font-display text-3xl md:text-4xl tracking-widest ${text} whitespace-nowrap`}>
        {label}
      </p>
      <div className={`h-px flex-1 ${line}`} />
    </div>
  )
}

/** Elevated main sponsor — larger, full-opacity, framed in day1 green with a glow. */
function MainSponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const logoUrl = sponsor.logo
    ? sanityImageUrl(sponsor.logo).width(800).fit('max').url()
    : null

  return (
    <a
      href={sponsor.url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full max-w-2xl mx-auto border-2 border-transparent bg-surface p-8 md:p-12 transition-all duration-300 hover:scale-[1.01] hover:border-day1 hover:shadow-[0_0_50px_-10px_var(--color-day1)]"
    >
      {logoUrl ? (
        <div className="relative w-full aspect-5/2">
          <Image
            src={logoUrl}
            alt={sponsor.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      ) : (
        <div className="w-full aspect-5/2 flex items-center justify-center">
          <span className="font-display text-3xl md:text-5xl tracking-widest text-fg text-center">
            {sponsor.name}
          </span>
        </div>
      )}
      <p className="font-display text-2xl md:text-3xl tracking-widest text-fg text-center mt-6 group-hover:text-day1 transition-colors">
        {sponsor.name}
      </p>
    </a>
  )
}

/** Regular partner tile — dark card with a day2 purple hover accent. */
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const logoUrl = sponsor.logo
    ? sanityImageUrl(sponsor.logo).width(400).fit('max').url()
    : null

  return (
    <a
      href={sponsor.url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-4 p-4 border border-muted hover:border-day2 transition-colors group"
    >
      {logoUrl ? (
        <div className="relative w-full aspect-3/2">
          <Image
            src={logoUrl}
            alt={sponsor.name}
            fill
            className="object-contain p-4 opacity-70 group-hover:opacity-100 transition-opacity"
            sizes="(max-width: 768px) 50vw, 220px"
          />
        </div>
      ) : (
        <div className="w-full aspect-3/2 bg-surface flex items-center justify-center">
          <span className="font-display text-lg tracking-widest text-muted-fg">{sponsor.name}</span>
        </div>
      )}
      <span className="font-display text-base md:text-lg tracking-widest text-muted-fg group-hover:text-day2 transition-colors text-center">
        {sponsor.name}
      </span>
    </a>
  )
}

export default async function TamogatokPage() {
  const event = await getEvent()
  const sponsors = event?.sponsors ?? []
  const mainSponsor = sponsors.find((s) => s.isMain) ?? null
  const partners = sponsors.filter((s) => s !== mainSponsor)

  return (
    <main className={`px-6 py-16 max-w-5xl mx-auto ${footerOverlapPaddingClass}`}>
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-12">
        TÁMOGATÓK
      </h1>

      {sponsors.length > 0 ? (
        <div className="space-y-12">
          {mainSponsor && (
            <section className="space-y-6">
              <div className="max-w-2xl mx-auto">
                <SectionLabel label="FELBUJTÓ" color="day1" />
              </div>
              <MainSponsorCard sponsor={mainSponsor} />
            </section>
          )}

          {partners.length > 0 && (
            <section className="space-y-8">
              {mainSponsor && <SectionLabel label="BŰNTÁRSAK" color="day2" />}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {partners.map((sponsor) => (
                  <SponsorCard key={sponsor._key} sponsor={sponsor} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="font-body text-base leading-relaxed text-fg/80 text-center">
          <p>Hamarosan...</p>
        </div>
      )}
    </main>
  )
}
