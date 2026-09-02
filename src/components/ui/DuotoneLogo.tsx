import Image from 'next/image'
import { cn } from '@/src/lib/utils'

interface DuotoneLogoProps {
  src: string
  alt: string
  width: number
  height: number
  /** Colour of the top layer (e.g. the current day's colour) */
  color: string
  /** Offset in px for the black shadow layer behind */
  offset?: number
  /** Classes controlling the rendered size (applied to the sizing image) */
  imgClassName?: string
  /** Layout classes for the wrapper (margins, positioning) */
  className?: string
}

/**
 * Renders a logo twice as solid-colour silhouettes stacked with an offset:
 * a black shadow behind and the given colour on top, using the logo's alpha as a mask.
 */
export function DuotoneLogo({
  src,
  alt,
  width,
  height,
  color,
  offset = 4,
  imgClassName,
  className,
}: DuotoneLogoProps) {
  const mask = {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
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
      {/* Black shadow, offset behind */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ ...mask, backgroundColor: '#000', transform: `translate(${offset}px, ${offset}px)` }}
      />
      {/* Day-colour layer on top */}
      <div aria-hidden className="absolute inset-0" style={{ ...mask, backgroundColor: color }} />
    </div>
  )
}
