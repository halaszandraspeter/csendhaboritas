import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { displayFont, bodyFont } from '@/src/config/fonts'
import { Header } from '@/src/components/layout/Header'
import { FooterWrapper } from '@/src/components/layout/FooterWrapper'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { eventDayLabels } from '@/src/lib/dates'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const event = await getEvent()
  const ogImageUrl = event?.ogImage
    ? sanityImageUrl(event.ogImage).width(1200).height(630).fit('crop').url()
    : '/og-image.png'

  const name = event?.name ?? 'Miskolci Csendháborítás'
  const year = event?.year ?? '2026'
  const venue = event?.venue ?? 'Grizzly Music Pub'
  const city = event?.city ?? 'Miskolc'
  const days = eventDayLabels(event?.days)
  const dateRange = days.map((d) => d.title).join(' – ')
  const titleWithYear = `${name} ${year}`

  return {
    title: {
      default: titleWithYear,
      template: `%s | ${name}`,
    },
    description: `${name} — ${venue}, ${city}.${dateRange ? ` ${dateRange}, ${year}.` : ''}`,
    openGraph: {
      title: titleWithYear,
      description: `${venue} · ${city}${dateRange ? ` · ${dateRange}` : ''}`,
      locale: 'hu_HU',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: titleWithYear,
        },
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const event = await getEvent()
  const mainLogoUrl = event?.mainLogo
    ? sanityImageUrl(event.mainLogo).width(560).url()
    : '/logo-main.webp'

  return (
    <html
      lang="hu"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-bg text-fg font-body">
        <Header mainLogoUrl={mainLogoUrl} />

        <main className="flex-1">{children}</main>

        <FooterWrapper />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
