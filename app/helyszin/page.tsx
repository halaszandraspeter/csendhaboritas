import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Helyszín',
  description: 'Grizzly Music Pub — a Miskolci Csendháborítás helyszíne. Cím, megközelítés, térkép.',
}

/** Accepts a bare URL or a full <iframe> tag — extracts the src either way. */
function extractMapSrc(input: string | undefined | null): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (trimmed.startsWith('http')) return trimmed
  const match = trimmed.match(/src="([^"]+)"/)
  return match ? match[1] : null
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

  return (
    <div className="min-h-dvh px-6 py-16 max-w-4xl mx-auto w-full">
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        HELYSZÍN
      </h1>

      {/* Venue info — always visible (uses fallbacks when Sanity not connected) */}
      <div className="flex items-start gap-4 mb-10">
        <MapPin size={32} className="text-day1 flex-shrink-0 mt-1" />
        <div>
          <h2 className="font-display text-3xl tracking-widest text-fg">{venue}</h2>
          <p className="text-muted-fg font-body mt-1">{address}</p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-10">
          <h3 className="font-display text-2xl tracking-widest mb-3">
            <span className="bg-day1 text-black px-2 py-1 box-decoration-clone">
              JÓ TUDNI
            </span>
          </h3>
          <div className="font-body text-base leading-[1.7] max-w-2xl">
            {description.split('\n').map((line, i) => (
              line.trim() === '' ? (
                <div key={i} className="h-4" />
              ) : (
                <div key={i}>
                  <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                    {line}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Map embed — CSS filter gives a dark/night look without an API key */}
      {mapUrl && (
        <div
          className="w-full aspect-video mb-10 overflow-hidden border border-muted"
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
      )}

      {/* Transport / parking info */}
      {transportInfo && (
        <div className="mb-10">
          <h3 className="font-display text-2xl tracking-widest mb-3">
            <span className="bg-day2 text-black px-2 py-1 box-decoration-clone">
              MEGKÖZELÍTÉS
            </span>
          </h3>
          <div className="font-body text-base leading-[1.7]">
            {transportInfo.split('\n').map((line, i) => (
              line.trim() === '' ? (
                <div key={i} className="h-4" />
              ) : (
                <div key={i}>
                  <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                    {line}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Venue photos — keyed by Sanity _key for stable identity */}
      {photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted mt-8">
          {photos.map((photo, i) => {
            const url = sanityImageUrl(photo).width(800).height(533).url()
            // Sanity injects _key on array items at runtime even though our type
            // doesn't declare it; fall back to index only if absent.
            const key = (photo as { _key?: string })._key ?? i
            return (
              <div key={key} className="relative aspect-[3/2] bg-surface overflow-hidden">
                <Image
                  src={url}
                  alt={`${venue} fotó ${i + 1}`}
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
