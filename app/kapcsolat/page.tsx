import type { Metadata } from 'next'
import { getEvent } from '@/src/lib/sanity/queries'
import type { Organizer } from '@/src/types'

export const metadata: Metadata = {
  title: 'Kapcsolat',
  description: 'Kapcsolatfelvétel a Miskolci Csendháborítás szervezőivel.',
}

function ContactSticker({
  organizer,
  variant,
}: {
  organizer: Organizer
  variant: 'light' | 'dark'
}) {
  const bgColor = variant === 'light' ? 'bg-neutral-300' : 'bg-neutral-500'
  const textColor = variant === 'light' ? 'text-neutral-900' : 'text-neutral-100'
  const rotation = variant === 'light' ? '-rotate-2' : 'rotate-2'

  return (
    <div
      className={`${bgColor} ${rotation} p-6 md:p-8 shadow-lg transform transition-transform hover:scale-105 hover:rotate-0`}
      style={{
        clipPath:
          'polygon(2% 0%, 8% 3%, 15% 0%, 22% 2%, 30% 0%, 38% 3%, 45% 1%, 52% 0%, 60% 2%, 68% 0%, 75% 3%, 82% 1%, 90% 0%, 95% 2%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
      }}
    >
      {/* "MI VAGYUNK A [NAME]" style header */}
      <h2 className={`font-display text-xl md:text-2xl tracking-widest mb-4 ${textColor}`}>
        <span className="bg-black/10 px-2 py-1">MI VAGYOK</span>
      </h2>
      <p className={`font-display text-3xl md:text-4xl font-bold tracking-wider mb-6 ${textColor}`}>
        {organizer.name.toUpperCase()}
      </p>

      <div className={`space-y-3 font-body text-base md:text-lg ${textColor}`}>
        {organizer.email && (
          <a
            href={`mailto:${organizer.email}`}
            className="flex items-center gap-3 hover:underline"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="break-all">{organizer.email}</span>
          </a>
        )}
        {organizer.mobile && (
          <a
            href={`tel:${organizer.mobile.replace(/\s/g, '')}`}
            className="flex items-center gap-3 hover:underline"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{organizer.mobile}</span>
          </a>
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
            <ContactSticker
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
