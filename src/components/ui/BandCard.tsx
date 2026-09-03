import Link from 'next/link'
import Image from 'next/image'
import { DayBadge } from './DayBadge'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import type { Band } from '@/src/types'

interface BandCardProps {
  band: Band
  dayLabel?: string
}

export function BandCard({ band, dayLabel }: BandCardProps) {
  const thumbnailUrl = band.cardThumbnailImage
    ? sanityImageUrl(band.cardThumbnailImage).width(600).height(400).url()
    : null

  return (
    <Link
      href={`/zenekarok/${band.slug.current}`}
      className="group relative block overflow-hidden bg-surface aspect-[3/2]"
    >
      {/* Background image */}
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={band.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 gap-1.5">
        <DayBadge day={band.day} time={band.setTime} label={dayLabel} />
        <h3 className="font-display text-2xl md:text-3xl tracking-widest text-fg leading-none">
          {band.name}
        </h3>
        {/* Reserve genre space so the day badge stays aligned across cards */}
        <p className="text-xs font-body text-muted-fg uppercase tracking-wider min-h-4">
          {band.genre || '\u00A0'}
        </p>
      </div>

      {/* Day-colour left border on hover */}
      <div
        className={`absolute left-0 inset-y-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom ${
          band.day === 1 ? 'bg-day1' : 'bg-day2'
        }`}
      />
    </Link>
  )
}
