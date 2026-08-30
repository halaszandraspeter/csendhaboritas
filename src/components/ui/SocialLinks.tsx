import {
  SpotifyIcon,
  SoundCloudIcon,
  AppleMusicIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from './SocialIcons'
import type { BandSocialLinks } from '@/src/types'

interface SocialLinksProps {
  links: BandSocialLinks
  className?: string
}

const socialConfig = [
  { key: 'spotify' as const, label: 'Spotify', Icon: SpotifyIcon },
  { key: 'soundcloud' as const, label: 'SoundCloud', Icon: SoundCloudIcon },
  { key: 'appleMusic' as const, label: 'Apple Music', Icon: AppleMusicIcon },
  { key: 'instagram' as const, label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook' as const, label: 'Facebook', Icon: FacebookIcon },
  { key: 'youtube' as const, label: 'YouTube', Icon: YouTubeIcon },
]

export function SocialLinks({ links, className }: SocialLinksProps) {
  const available = socialConfig.filter((s) => links[s.key])
  if (available.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-4 items-center ${className ?? ''}`}>
      {available.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={links[key]!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-fg hover:text-fg transition-colors duration-150"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  )
}
