import { getAllBands, getEvent } from '@/src/lib/sanity/queries'
import { HeroSection } from '@/src/components/sections/HeroSection'
import { ProgramSnippet } from '@/src/components/sections/ProgramSnippet'
import { HelyszinSnippet } from '@/src/components/sections/HelyszinSnippet'
import { BandGridSection } from '@/src/components/sections/BandGridSection'
import { footerOverlapPaddingClass } from '@/src/config/layout'
import { SITE_URL, VENUE_LAT, VENUE_LNG } from '@/src/config/site'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import type { Band, EventData } from '@/src/types'

function buildEventJsonLd(event: EventData | null, bands: Band[]) {
  const name = event?.name ?? 'Miskolci Csendháborítás'
  const year = event?.year ?? '2026'
  const venue = event?.venue ?? 'Grizzly Music Pub'
  const city = event?.city ?? 'Miskolc'
  const days = event?.days ?? []
  const startDate = days[0]?.date
  const endDate = days[days.length - 1]?.date ?? startDate
  const image = event?.ogImage
    ? sanityImageUrl(event.ogImage).width(1200).height(630).fit('crop').url()
    : `${SITE_URL}/og-image.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${name} ${year}`,
    description: event?.heroDescription ?? `${name} — ${venue}, ${city}.`,
    startDate,
    endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    url: SITE_URL,
    image: [image],
    location: {
      '@type': 'MusicVenue',
      name: venue,
      address: event?.address ?? city,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: VENUE_LAT,
        longitude: VENUE_LNG,
      },
    },
    performer: bands.map((band) => ({
      '@type': 'MusicGroup',
      name: band.name,
      url: `${SITE_URL}/fellepok/${band.slug.current}`,
    })),
    offers: days
      .filter((d) => d.ticketPrice != null)
      .map((d) => ({
        '@type': 'Offer',
        price: d.ticketPrice,
        priceCurrency: 'HUF',
        availability: 'https://schema.org/InStock',
        validFrom: d.date,
        url: SITE_URL,
      })),
    organizer: {
      '@type': 'Organization',
      name,
      url: SITE_URL,
    },
  }
}

export default async function Kezdolap() {
  const [bands, event] = await Promise.all([getAllBands(), getEvent()])

  const day1Bands = bands.filter((b) => b.day === 1)
  const day2Bands = bands.filter((b) => b.day === 2)

  return (
    <div className={footerOverlapPaddingClass}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEventJsonLd(event, bands)) }}
      />
      <HeroSection event={event} />
      <ProgramSnippet day1Bands={day1Bands} day2Bands={day2Bands} event={event} />
      <HelyszinSnippet event={event} />
      <BandGridSection day1Bands={day1Bands} day2Bands={day2Bands} event={event} />
    </div>
  )
}
