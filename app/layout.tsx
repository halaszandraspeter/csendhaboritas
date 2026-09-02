import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { displayFont, bodyFont } from '@/src/config/fonts'
import { Header } from '@/src/components/layout/Header'
import { FooterWrapper } from '@/src/components/layout/FooterWrapper'
import { getEvent } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const event = await getEvent()
  const ogImageUrl = event?.ogImage
    ? sanityImageUrl(event.ogImage).width(1200).height(630).fit('crop').url()
    : '/og-image.png'

  return {
    title: {
      default: 'Miskolci Csendháborítás 2026',
      template: '%s | Miskolci Csendháborítás',
    },
    description:
      'Miskolc legizgalmasabb zenei bemutatója — 12 zenekar, 2 nap, Grizzly Music Pub. Október 9–10, 2026.',
    openGraph: {
      title: 'Miskolci Csendháborítás 2026',
      description: '12 zenekar · 2 nap · Grizzly Music Pub, Miskolc',
      locale: 'hu_HU',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Miskolci Csendháborítás 2026',
        },
      ],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="hu"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-bg text-fg font-body">
        <Header />

        <main className="flex-1">{children}</main>

        <FooterWrapper />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
