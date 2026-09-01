/**
 * Miskolc industrial skyline silhouette — panel blocks + factory chimneys.
 * Used as a decorative top divider in the Footer and bottom of hero/band page.
 */
export function SkylineDivider({
  className = '',
  linePosition = 'none',
}: {
  className?: string
  linePosition?: 'top' | 'bottom' | 'none'
}) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      {linePosition === 'top' && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-muted" />
      )}
      <div
        className="w-full h-12 md:h-16"
        style={{
          backgroundImage: 'url(/berhazak.webp)',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center bottom',
        }}
      />
      {linePosition === 'bottom' && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-muted" />
      )}
    </div>
  )
}
