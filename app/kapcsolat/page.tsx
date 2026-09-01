import type { Metadata } from 'next'
import { getEvent } from '@/src/lib/sanity/queries'
import type { Organizer } from '@/src/types'
import { ContactInfoSticker } from '@/src/components/ui/ContactInfoSticker'

export const metadata: Metadata = {
  title: 'Kapcsolat',
  description: 'Kapcsolatfelvétel a Miskolci Csendháborítás szervezőivel.',
}

function OrganizerCard({
  organizer,
  variant,
}: {
  organizer: Organizer
  variant: 'light' | 'dark'
}) {
  const bgColor = variant === 'light' ? 'bg-neutral-300' : 'bg-neutral-500'
  const textColor = variant === 'light' ? 'text-neutral-900' : 'text-neutral-100'
  const rotation = variant === 'light' ? '-rotate-2' : 'rotate-2'
  // Alternate sticker colors for contact info
  const firstStickerVariant = variant === 'light' ? 'green' : 'purple'
  const secondStickerVariant = variant === 'light' ? 'purple' : 'green'

  return (
    <div
      className={`${bgColor} ${rotation} p-6 md:p-8 shadow-lg transform transition-transform hover:scale-[1.02] hover:rotate-0`}
      style={{
        clipPath:
          'polygon(2% 0%, 8% 3%, 15% 0%, 22% 2%, 30% 0%, 38% 3%, 45% 1%, 52% 0%, 60% 2%, 68% 0%, 75% 3%, 82% 1%, 90% 0%, 95% 2%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
      }}
    >
      {/* Name - 1.5x bigger */}
      <p className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6 ${textColor}`}>
        {organizer.name.toUpperCase()}
      </p>

      {/* Contact info stickers */}
      <div className="flex flex-col gap-3 items-start">
        {organizer.email && (
          <ContactInfoSticker value={organizer.email} variant={firstStickerVariant} />
        )}
        {organizer.mobile && (
          <ContactInfoSticker value={organizer.mobile} variant={secondStickerVariant} />
        )}
      </div>
    </div>
  )
}

export default async function KapcsolatPage() {
  const event = await getEvent()
  const organizers = event?.organizers ?? []

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-widest text-fg text-center mb-16">
        KAPCSOLAT
      </h1>

      {organizers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {organizers.map((organizer, index) => (
            <OrganizerCard
              key={organizer._key}
              organizer={organizer}
              variant={index % 2 === 0 ? 'light' : 'dark'}
            />
          ))}
        </div>
      ) : (
        <div className="font-body text-base leading-relaxed text-fg/80 text-center">
          <p>Hamarosan...</p>
        </div>
      )}
    </main>
  )
}
