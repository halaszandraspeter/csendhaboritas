import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { EventData } from '@/src/types'

interface HelyszinSnippetProps {
  event?: EventData | null
}

export function HelyszinSnippet({ event }: HelyszinSnippetProps) {
  const venue = event?.venue ?? 'Grizzly Music Pub'
  const address = event?.address ?? 'Miskolc'

  return (
    <section className="px-6 py-12 border-y border-muted bg-surface scroll-mt-24" id="helyszin">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <MapPin size={28} className="text-day1 flex-shrink-0 mt-1" />
          <div>
            <p className="font-display text-2xl tracking-widest text-fg">
              {venue}
            </p>
            <p className="font-body text-sm text-muted-fg mt-1">{address}</p>
          </div>
        </div>
        <Link
          href="/helyszin"
          className="font-display tracking-widest text-sm border border-fg/30 px-6 py-2 hover:border-fg hover:text-fg text-fg/70 transition-colors flex-shrink-0"
        >
          MERRE VAN? →
        </Link>
      </div>
    </section>
  )
}
