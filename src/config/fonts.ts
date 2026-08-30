/**
 * Font configuration — swap font imports here without touching components.
 * CSS variables are consumed by Tailwind via globals.css @theme.
 */
import { Bebas_Neue, Inter } from 'next/font/google'

export const displayFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const bodyFont = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})
