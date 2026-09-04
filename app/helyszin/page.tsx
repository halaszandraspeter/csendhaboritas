import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Navigation } from 'lucide-react'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { footerOverlapPaddingClass } from '@/src/config/layout'
import { cn } from '@/src/lib/utils'

export const metadata: Metadata = {
  title: 'Helyszín',
  description: 'Grizzly Music Pub — a Miskolci Csendháborítás helyszíne. Cím, megközelítés, térkép.',
}

// Grizzly Music Pub exact coordinates (from the Google Maps place URL).
const VENUE_COORDS = '48.1037614,20.7787727'
const MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${VENUE_COORDS}`
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${VENUE_COORDS}`

/** Accepts a bare URL or a full <iframe> tag — extracts the src either way. */
function extractMapSrc(input: string | undefined | null): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (trimmed.startsWith('http')) return trimmed
  const match = trimmed.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

/** Renders CMS multiline text as the site's marker-highlight lines. */
function HighlightLines({ text }: { text: string }) {
  return (
    <div className="font-body text-base leading-[1.7]">
      {text.split('\n').map((line, i) =>
        line.trim() === '' ? (
          <div key={i} className="h-4" />
        ) : (
          <div key={i}>
            <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
              {line}
            </span>
          </div>
        )
      )}
    </div>
  )
}

function DirectionsButton({ className }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 border border-day1 text-day1 font-display tracking-widest px-6 py-3 hover:bg-day1 hover:text-black transition-colors',
        className
      )}
    >
      <Navigation size={18} />
      ÚTVONALTERV
    </a>
  )
}

export default async function HelyszinPage() {
  const event = await getEvent()

  // Use Sanity data when available, fall back to known defaults
  const venue = event?.venue ?? 'Grizzly Music Pub'
  const address = event?.address ?? 'Miskolc'
  const description = event?.venueDescription
  // Accept either a bare URL or a full <iframe> paste from Google Maps
  const mapUrl = extractMapSrc(event?.mapEmbedUrl)
  const transportInfo = event?.transportInfo
  const photos = event?.venuePhotos ?? []
  const [heroPhoto, ...restPhotos] = photos

  const twoColumn = Boolean(mapUrl && (description || transportInfo))

  return (
    <div className={`min-h-dvh px-6 py-16 max-w-4xl mx-auto w-full ${footerOverlapPaddingClass}`}>
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        HELYSZÍN
      </h1>

      {/* Venue identity — over the first photo when available, otherwise plain */}
      {heroPhoto ? (
        <div className="relative w-full aspect-video overflow-hidden border border-muted mb-6 md:mb-10">
          <Image
            src={sanityImageUrl(heroPhoto).width(1200).height(675).url()}
            alt={venue}
            fill
            priority
            className="object-cover grayscale"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-start gap-2 sm:gap-3 p-4 sm:p-5 md:p-8">
            <MapPin className="text-day1 shrink-0 mt-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            <div>
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl tracking-widest text-fg">
                {venue}
              </h2>
              <a
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-fg font-body text-xs sm:text-sm md:text-base mt-1 inline-block hover:text-fg transition-colors"
              >
                {address}
              </a>
            </div>
          </div>
          {/* Desktop: directions button tucked into the photo's bottom-right corner */}
          <DirectionsButton className="hidden md:inline-flex absolute bottom-6 right-6" />
        </div>
      ) : (
        <div className="flex items-start gap-3 sm:gap-4 mb-6">
          <MapPin className="text-day1 shrink-0 mt-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          <div>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl tracking-widest text-fg">
              {venue}
            </h2>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-fg font-body text-xs sm:text-sm md:text-base mt-1 inline-block hover:text-fg transition-colors"
            >
              {address}
            </a>
          </div>
        </div>
      )}

      {/* Directions CTA — standalone on mobile; desktop shows it inside the hero corner */}
      <DirectionsButton
        className={cn(
          'mb-12',
          heroPhoto && 'md:hidden',
          'max-md:w-full max-md:justify-center max-md:text-xl'
        )}
      />

      {/* Info + map — two columns on desktop when both exist */}
      <div className={twoColumn ? 'grid gap-10 md:grid-cols-2 items-start' : 'space-y-10'}>
        {(description || transportInfo) && (
          <div className="space-y-10">
            {description && (
              <div>
                <h3 className="font-display text-2xl tracking-widest mb-3">
                  <span className="bg-day1 text-black px-2 py-1 box-decoration-clone">JÓ TUDNI</span>
                </h3>
                <HighlightLines text={description} />
              </div>
            )}

            {transportInfo && (
              <div>
                <h3 className="font-display text-2xl tracking-widest mb-3">
                  <span className="bg-day2 text-black px-2 py-1 box-decoration-clone">
                    MEGKÖZELÍTÉS
                  </span>
                </h3>
                <HighlightLines text={transportInfo} />
              </div>
            )}
          </div>
        )}

        {/* Map embed — CSS filter gives a dark/night look without an API key */}
        {mapUrl && (
          <div className="md:sticky md:top-24">
            <div
              className="w-full aspect-video overflow-hidden border border-muted"
              style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
            >
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${venue} térkép`}
                className="border-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Remaining venue photos */}
      {restPhotos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted mt-10">
          {restPhotos.map((photo, i) => {
            const url = sanityImageUrl(photo).width(800).height(533).url()
            // Sanity injects _key on array items at runtime even though our type
            // doesn't declare it; fall back to index only if absent.
            const key = (photo as { _key?: string })._key ?? i
            return (
              <div key={key} className="relative aspect-3/2 bg-surface overflow-hidden">
                <Image
                  src={url}
                  alt={`${venue} fotó ${i + 2}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Shown only when Sanity is connected but the event document is empty of extras */}
      {!event && (
        <div className="border border-muted p-8 text-center mt-8">
          <p className="font-body text-xs text-muted-fg">
            Részletek hamarosan · Október 9–10, 2026
          </p>
        </div>
      )}
    </div>
  )
}
