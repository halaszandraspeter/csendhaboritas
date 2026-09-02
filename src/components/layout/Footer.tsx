import { SkylineDivider } from '@/src/components/ui/SkylineDivider'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/src/components/ui/SocialIcons'
import type { EventData } from '@/src/types'

interface FooterProps {
  event?: EventData | null
}

export function Footer({ event }: FooterProps) {
  const socials = event?.socialLinks
  const sponsors = event?.sponsors ?? []

  return (
    <footer className="relative">
      {/* Skyline overlaps page content above */}
      <div className="relative z-30 -mt-24 md:-mt-32 pointer-events-none">
        <SkylineDivider linePosition="bottom" />
      </div>

      <div className="bg-bg">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6 text-center">
        {/* Brand */}
        <p className="font-display text-2xl md:text-3xl tracking-widest text-fg">
          MISKOLCI CSENDHÁBORÍTÁS
        </p>

        {/* Social links */}
        {(socials?.facebook || socials?.instagram || socials?.tiktok) && (
          <div className="flex gap-5 items-center">
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-fg hover:text-fg transition-colors"
              >
                <FacebookIcon size={22} />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-fg hover:text-fg transition-colors"
              >
                <InstagramIcon size={22} />
              </a>
            )}
            {socials.tiktok && (
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-muted-fg hover:text-fg transition-colors"
              >
                <TikTokIcon size={22} />
              </a>
            )}
          </div>
        )}

        {/* Sponsors */}
        {sponsors.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 items-center pt-2">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor._key}
                href={sponsor.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity text-fg font-display tracking-widest text-sm"
              >
                {sponsor.name}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="text-xs text-muted-fg font-body">
          © 2026 Miskolci Csendháborítás
        </p>
        </div>
      </div>
    </footer>
  )
}
