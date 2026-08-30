'use client'

/** Allowed embed origins. Only URLs from these hosts are rendered as iframes. */
const ALLOWED_ORIGINS = [
  'open.spotify.com',
  'w.soundcloud.com',
  'embed.music.apple.com',
  'www.youtube.com',
  'youtube.com',
]

function isAllowedEmbedUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return ALLOWED_ORIGINS.some((allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`))
  } catch {
    return false
  }
}

interface MusicEmbedProps {
  url: string
  className?: string
}

/**
 * Renders a Spotify / SoundCloud / Apple Music embed iframe.
 * Only renders if the URL's origin is in the ALLOWED_ORIGINS allowlist.
 * The URL stored in Sanity should be the embed iframe src (not the share URL).
 */
export function MusicEmbed({ url, className }: MusicEmbedProps) {
  if (!isAllowedEmbedUrl(url)) {
    console.warn('[MusicEmbed] Blocked embed from disallowed origin:', url)
    return null
  }

  return (
    <div className={`w-full overflow-hidden ${className ?? ''}`}>
      <iframe
        src={url}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
        title="Music player"
        className="border-0"
      />
    </div>
  )
}
