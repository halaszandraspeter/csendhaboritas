'use client'

interface MusicEmbedProps {
  url: string
  className?: string
}

/**
 * Renders a Spotify or SoundCloud embed iframe from its embed src URL.
 * The URL stored in Sanity should be the embed iframe src (not the share URL).
 */
export function MusicEmbed({ url, className }: MusicEmbedProps) {
  return (
    <div className={`w-full overflow-hidden rounded-none ${className ?? ''}`}>
      <iframe
        src={url}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Music player"
        className="border-0"
      />
    </div>
  )
}
