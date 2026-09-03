import { cn } from '@/src/lib/utils'

interface DayBadgeProps {
  day: 1 | 2
  time?: string
  className?: string
}

const dayLabels: Record<1 | 2, string> = {
  1: 'Október 9.',
  2: 'Október 10.',
}

export function DayBadge({ day, time, className }: DayBadgeProps) {
  return (
    <span
      className={cn(
        'flex w-full items-center gap-2 px-2 py-1 text-sm md:text-base font-display tracking-widest uppercase text-bg',
        day === 1 ? 'bg-day1' : 'bg-day2',
        className
      )}
    >
      {dayLabels[day]}
      {time && <span>{time}</span>}
    </span>
  )
}
