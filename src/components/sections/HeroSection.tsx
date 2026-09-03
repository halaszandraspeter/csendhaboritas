import Image from 'next/image'
import { SkylineDivider } from '@/src/components/ui/SkylineDivider'
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/src/components/ui/SocialIcons'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import { eventDayLabels } from '@/src/lib/dates'
import type { EventData } from '@/src/types'

interface HeroSectionProps {
  event?: EventData | null
}

export function HeroSection({ event }: HeroSectionProps) {
  const socials = event?.socialLinks
  const days = eventDayLabels(event?.days)
  const venueCity =
    [event?.venue, event?.city].filter(Boolean).join(' · ').toUpperCase() ||
    'GRIZZLY MUSIC PUB · MISKOLC'
  const mainLogoUrl = event?.mainLogo
    ? sanityImageUrl(event.mainLogo).width(960).url()
    : '/logo-main.webp'

  return (
    <section className="relative h-svh md:h-[calc(100svh-5.5rem)] flex flex-col overflow-hidden">
      {/* Background concert photo */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          alt="Csendháborítás koncert"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay — heavier at top and bottom, lighter in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/40 to-bg/85" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center gap-[clamp(0.9375rem,2.85vh,2rem)] pt-[clamp(0.975rem,3vh,2rem)] min-h-0">
        {/* Logo */}
        <Image
          src={mainLogoUrl}
          alt={event?.name ?? 'Miskolci Csendháborítás'}
          width={480}
          height={160}
          className="w-[clamp(15rem,46vh,42rem)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
          priority
        />

        {/* Tagline */}
        {event?.heroDescription && (
          <div className="font-body text-[clamp(0.6rem,1.85vh,1.25rem)] leading-[1.7] text-center">
            {event.heroDescription.split('\n').map((line, i) =>
              line.trim() === '' ? (
                <div key={i} className="h-[clamp(0.5rem,1.72vh,1.4rem)]" />
              ) : (
                <div key={i}>
                  <span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">
                    {line.trim()}
                  </span>
                </div>
              )
            )}
          </div>
        )}

        {/* Day labels */}
        <div className="flex gap-5 items-center flex-wrap justify-center">
          <div className="relative px-[clamp(1.025rem,3.15vh,2.5rem)] py-[clamp(0.75rem,2.3vh,1.5rem)]">
            <Image
              src="/sticker-green.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-[clamp(0.82rem,2.5vh,1.65rem)] text-bg font-bold">
              {days[0]?.upper ?? 'OKTÓBER 9.'}
            </span>
          </div>
          <span className="text-muted-fg font-body text-sm">·</span>
          <div className="relative px-[clamp(1.025rem,3.15vh,2.5rem)] py-[clamp(0.75rem,2.3vh,1.5rem)]">
            <Image
              src="/sticker-purple.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-[clamp(0.82rem,2.5vh,1.65rem)] text-bg font-bold">
              {days[1]?.upper ?? 'OKTÓBER 10.'}
            </span>
          </div>
        </div>

        {/* Venue */}
        <p className="font-display text-[clamp(0.67rem,2.05vh,1.25rem)] tracking-widest text-fg/80">
          {venueCity}
        </p>

        {/* Social icons */}
        {(socials?.facebook || socials?.instagram || socials?.tiktok) && (
          <div className="flex gap-7 items-center">
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-fg/60 hover:text-fg transition-colors"
              >
                <FacebookIcon size={30} />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-fg/60 hover:text-fg transition-colors"
              >
                <InstagramIcon size={30} />
              </a>
            )}
            {socials.tiktok && (
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-fg/60 hover:text-fg transition-colors"
              >
                <TikTokIcon size={30} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Skyline at bottom of hero */}
      <div className="relative -mt-4">
        <SkylineDivider linePosition="bottom" size="large" />
      </div>
    </section>
  )
}
