import { getEvent } from '@/src/lib/sanity/queries'
import { Footer } from './Footer'

/**
 * Server component that fetches event data and renders the Footer.
 * Used in the root layout so every page gets the footer without prop drilling.
 */
export async function FooterWrapper() {
  const event = await getEvent()
  return <Footer event={event} />
}
