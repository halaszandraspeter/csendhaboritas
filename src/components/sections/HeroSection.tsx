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
    <section className="relative h-[100dvh] md:h-[calc(100dvh-5.5rem)] flex flex-col overflow-hidden">
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
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center gap-7 pt-8">
        {/* Logo */}
        <Image
          src="/logo-main.webp"
          alt="Miskolci Csendháborítás"
          width={480}
          height={160}
          className="w-80 md:w-[30rem] drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]"
          priority
        />

        {/* Tagline */}
        <div className="font-body text-sm md:text-lg leading-[1.7] text-center space-y-5">
          <div>
            <div><span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">Egy fesztivál a miskolci undergroundért.</span></div>
            <div><span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">12 előadó, 2 nap és 1 közös cél:</span></div>
          </div>
          <div>
            <div><span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">egy olyan közeg megteremtése,</span></div>
            <div><span className="bg-[#e5e5e5] text-black px-1 py-[0.15em] box-decoration-clone uppercase">ahol az új hangok egymásra találnak.</span></div>
          </div>
        </div>

        {/* Day labels */}
        <div className="flex gap-5 items-center flex-wrap justify-center">
          <div className="relative px-7 py-4">
            <Image
              src="/sticker-green.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-sm md:text-lg text-bg font-bold">
              OKTÓBER 9.
            </span>
          </div>
          <span className="text-muted-fg font-body text-sm">·</span>
          <div className="relative px-7 py-4">
            <Image
              src="/sticker-purple.webp"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
            <span className="relative font-display tracking-widest text-sm md:text-lg text-bg font-bold">
              OKTÓBER 10.
            </span>
          </div>
        </div>

        {/* Venue */}
        <p className="font-display text-xl md:text-3xl tracking-widest text-fg/80">
          GRIZZLY MUSIC PUB · MISKOLC
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
