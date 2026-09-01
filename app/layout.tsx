import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { displayFont, bodyFont } from '@/src/config/fonts'
import { Header } from '@/src/components/layout/Header'
import { FooterWrapper } from '@/src/components/layout/FooterWrapper'
import './globals.css'

export const metadata: Metadata = {
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
  },
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
