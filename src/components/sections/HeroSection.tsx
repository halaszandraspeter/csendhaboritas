import Image from 'next/image'
import { SkylineDivider } from '@/src/components/ui/SkylineDivider'
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/src/components/ui/SocialIcons'
import type { EventData } from '@/src/types'

interface HeroSectionProps {
  event?: EventData | null
}

export function HeroSection({ event }: HeroSectionProps) {
  const socials = event?.socialLinks

  return (
    <section className="relative min-h-dvh flex flex-col overflow-hidden">
      {/* Background concert photo */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          alt="Csendháborítás koncert"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay — heavier at top and bottom, lighter in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/40 to-bg/85" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 pt-8">
        {/* Logo */}
        <Image
          src="/logo-main.webp"
          alt="Miskolci Csendháborítás"
          width={360}
          height={120}
          className="w-64 md:w-96 drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
          priority
        />

        {/* Day labels */}
        <div className="flex gap-4 items-center flex-wrap justify-center">
          <div className="relative px-6 py-3">
            <Image
              src="/sticker-green.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-sm md:text-base text-bg font-bold">
              OKTÓBER 9.
            </span>
          </div>
          <span className="text-muted-fg font-body text-sm">·</span>
          <div className="relative px-6 py-3">
            <Image
              src="/sticker-purple.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-sm md:text-base text-bg font-bold">
              OKTÓBER 10.
            </span>
          </div>
        </div>

        {/* Venue */}
        <p className="font-display text-lg md:text-2xl tracking-widest text-fg/80">
          GRIZZLY MUSIC PUB · MISKOLC
        </p>

        {/* Tagline */}
        <p className="font-body text-sm md:text-base text-fg/70 max-w-md leading-relaxed">
          Egy fesztivál a miskolci undergroundért.<br />
          12 előadó, 2 nap és 1 közös cél:<br />
          egy olyan közeg megteremtése,<br />
          ahol az új hangok egymásra találnak.
        </p>

        {/* Social icons */}
        {(socials?.facebook || socials?.instagram || socials?.tiktok) && (
          <div className="flex gap-6 items-center mt-2">
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-fg/60 hover:text-fg transition-colors"
              >
                <FacebookIcon size={24} />
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
                <InstagramIcon size={24} />
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
                <TikTokIcon size={24} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Skyline at bottom of hero */}
      <div className="relative">
        <SkylineDivider linePosition="bottom" />
      </div>
    </section>
  )
}
