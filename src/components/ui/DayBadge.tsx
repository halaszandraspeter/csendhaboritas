import { cn } from '@/src/lib/utils'

interface DayBadgeProps {
  day: 1 | 2
  className?: string
}

const dayLabels: Record<1 | 2, string> = {
  1: 'Október 9.',
  2: 'Október 10.',
}

export function DayBadge({ day, className }: DayBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-xs font-display tracking-widest uppercase text-bg',
        day === 1 ? 'bg-day1' : 'bg-day2',
        className
      )}
    >
      {dayLabels[day]}
    </span>
  )
}
