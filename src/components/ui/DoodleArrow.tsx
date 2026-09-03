import { cn } from '@/src/lib/utils'

interface DoodleArrowProps {
  day: 1 | 2
  className?: string
}

/**
 * Hand-drawn, wobbly "click on us for details" doodle.
 * Desktop-only hint that points from the label down toward the band cards.
 */
export function DoodleArrow({ day, className }: DoodleArrowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none hidden lg:flex items-center gap-2 select-none',
        day === 1 ? 'text-day1' : 'text-day2',
        className
      )}
    >
      <svg
        viewBox="0 0 140 100"
        className="h-14 w-24 shrink-0 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* shaft — tangent turns one direction the whole way (no inflection = convex) */}
        <path d="M138 12 C 135.4 14.1, 127.5 20.3, 122.5 24.8 C 117.5 29.3, 112.4 33.8, 108.1 38.9 C 103.8 44, 99.2 49.3, 96.6 55.3 C 94 61.3, 91.4 68.6, 92.3 74.7 C 93.1 80.8, 97 89, 101.7 91.7 C 106.4 94.4, 116.7 93.9, 120.4 90.7 C 124.2 87.4, 126.2 77.4, 124.3 72.3 C 122.4 67.3, 114.8 62.2, 108.9 60.4 C 103.1 58.6, 95.4 60, 89.1 61.7 C 82.8 63.4, 76.8 67.1, 71.1 70.5 C 65.4 74, 60.2 78.4, 55 82.6 C 49.8 86.9, 42.5 93.8, 40 96" />
        {/* arrowhead — points ~45° down-left at the cards */}
        <path d="M40 96 L 46.5 77.1" />
        <path d="M40 96 L 59.3 90.8" />
      </svg>
      <span className="font-display text-base leading-tight tracking-widest uppercase rotate-6 whitespace-nowrap self-start">
        katt ránk a
        <br />
        részletekért
      </span>
    </div>
  )
}
