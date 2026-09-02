import Image from 'next/image'
import { cn } from '@/src/lib/utils'

interface DuotoneLogoProps {
  src: string
  alt: string
  width: number
  height: number
  /** Colour of the top (foreground) layer */
  color: string
  /** Colour of the offset shadow layer behind */
  shadowColor?: string
  /** Offset in px for the shadow layer behind */
  offset?: number
  /** Classes controlling the rendered size (applied to the sizing image) */
  imgClassName?: string
  /** Layout classes for the wrapper (margins, positioning) */
  className?: string
}

/**
 * Renders a logo twice as solid-colour silhouettes stacked with an offset:
 * an offset shadow behind and the foreground colour on top, using the logo's alpha as a mask.
 */
export function DuotoneLogo({
  src,
  alt,
  width,
  height,
  color,
  shadowColor = '#000',
  offset = 4,
  imgClassName,
  className,
}: DuotoneLogoProps) {
  // mask-image requires a CORS-clean, same-origin resource, so proxy the CDN asset.
  const maskUrl = `/api/asset?url=${encodeURIComponent(src)}`
  const mask = {
    WebkitMaskImage: `url("${maskUrl}")`,
    maskImage: `url("${maskUrl}")`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  } as const

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Invisible image reserves the correct box size */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        style={{ opacity: 0 }}
      />
      {/* Shadow, offset behind */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ ...mask, backgroundColor: shadowColor, transform: `translate(${offset}px, ${offset}px)` }}
      />
      {/* Foreground layer on top */}
      <div aria-hidden className="absolute inset-0" style={{ ...mask, backgroundColor: color }} />
    </div>
  )
}
