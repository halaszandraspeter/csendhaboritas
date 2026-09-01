/**
 * Miskolc industrial skyline silhouette — panel blocks + factory chimneys.
 * Used as a decorative top divider in the Footer and bottom of hero/band page.
 */
export function SkylineDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full h-12 md:h-16 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: 'url(/berhazak.webp)',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center bottom',
      }}
    />
  )
}
