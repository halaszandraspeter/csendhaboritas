'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'
import { DoodleArrow } from '@/src/components/ui/DoodleArrow'
import { computeStatuses, type RowStatus, type ScheduleRow } from '@/src/lib/program'

export type DayColor = 'day1' | 'day2'

// Literal class names per day so Tailwind's JIT can detect them.
const dayStyles = {
  day1: {
    line: 'bg-day1',
    label: 'text-day1',
    time: 'text-day1',
    chipBorder: 'border-day1/40',
    hoverText: 'group-hover:text-day1',
    cardHoverBorder: 'group-hover:border-day1/50',
    ring: 'ring-day1/70',
    dot: 'bg-day1',
  },
  day2: {
    line: 'bg-day2',
    label: 'text-day2',
    time: 'text-day2',
    chipBorder: 'border-day2/40',
    hoverText: 'group-hover:text-day2',
    cardHoverBorder: 'group-hover:border-day2/50',
    ring: 'ring-day2/70',
    dot: 'bg-day2',
  },
} as const

type Color = (typeof dayStyles)[DayColor]

function NowBadge({ color }: { color: Color }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 font-body text-[0.6rem] tracking-widest text-fg">
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', color.dot)} />
      MOST
    </span>
  )
}

// Mobile-only tap affordance; the desktop doodle covers the two-column layout.
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn('h-4 w-4 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

// "Részletek ›" hint in the day colour; mobile-only.
function DetailsBadge({ color, className }: { color: Color; className?: string }) {
  return (
    <span
      className={cn(
        'flex items-center gap-1 font-body text-xs tracking-widest uppercase',
        color.time,
        className
      )}
    >
      Részletek
      <Chevron />
    </span>
  )
}

/** The node sitting on the central axis: a time chip, or a bare dot when timeless. */
function TimeNode({
  time,
  status,
  color,
}: {
  time?: string
  status: RowStatus
  color: Color
}) {
  if (!time) {
    return <span className={cn('block h-3 w-3 rounded-full ring-4 ring-black', color.dot)} />
  }
  return (
    <span
      className={cn(
        'block rounded-full border bg-black px-4 py-1.5 font-display text-xl tabular-nums',
        color.time,
        color.chipBorder,
        status === 'current' && cn('ring-2 ring-offset-2 ring-offset-black animate-pulse', color.ring)
      )}
    >
      {time}
    </span>
  )
}

function TimelineCard({
  row,
  status,
  color,
  align,
}: {
  row: ScheduleRow
  status: RowStatus
  color: Color
  align: 'left' | 'right'
}) {
  const isBand = row.kind === 'band'
  const alignRight = align === 'right'

  const inner = (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-muted bg-surface/60 transition-colors',
        isBand && color.cardHoverBorder,
        status === 'past' && 'opacity-40',
        status === 'current' && cn('ring-1', color.ring)
      )}
    >
      {row.imageUrl && (
        <div className={cn('relative w-full overflow-hidden', isBand ? 'aspect-3/2' : 'aspect-square')}>
          <Image
            src={row.imageUrl}
            alt={row.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover grayscale"
          />
          {isBand && (
            <DetailsBadge
              color={color}
              className="md:hidden absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm"
            />
          )}
        </div>
      )}
      <div className={cn('p-4', alignRight && 'md:text-right')}>
        <div className={cn('flex items-center gap-2', alignRight && 'md:justify-end')}>
          <span
            className={cn(
              'font-display text-xl tracking-widest text-fg',
              isBand &&
                cn(
                  'underline decoration-muted-fg/30 decoration-1 underline-offset-4 transition-colors group-hover:decoration-current',
                  color.hoverText
                )
            )}
          >
            {row.name}
          </span>
          {status === 'current' && <NowBadge color={color} />}
          {isBand && !row.imageUrl && (
            <Chevron className={cn('md:hidden ml-auto', color.time)} />
          )}
        </div>
        {isBand
          ? row.genre && <p className="mt-1 text-sm text-muted-fg font-body">{row.genre}</p>
          : row.name && (
              <p className="mt-1 text-[0.65rem] tracking-widest text-muted-fg font-body">PROGRAM</p>
            )}
        {row.description && (
          <p className="mt-2 text-sm text-muted-fg font-body">{row.description}</p>
        )}
      </div>
    </div>
  )

  return isBand ? (
    <Link href={row.href ?? '#'} className="group block">
      {inner}
    </Link>
  ) : (
    inner
  )
}

export function ProgramTimeline({
  label,
  weekday,
  dayColor,
  rows,
  showHint = false,
}: {
  label: string
  weekday: string
  dayColor: DayColor
  rows: ScheduleRow[]
  showHint?: boolean
}) {
  // Start null to avoid SSR/client hydration mismatch; fill in after mount.
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  const statuses = useMemo(() => computeStatuses(rows, now), [rows, now])
  const color = dayStyles[dayColor]
  const dayNum = dayColor === 'day1' ? 1 : 2
  const hasBand = rows.some((r) => r.kind === 'band')

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className={cn('h-px flex-1', color.line)} />
          <p
            className={cn(
              'font-display text-3xl md:text-4xl tracking-widest whitespace-nowrap',
              color.label
            )}
          >
            {label}
          </p>
          <div className={cn('h-px flex-1', color.line)} />
        </div>
        {weekday && (
          <p className="mt-1.5 text-center text-[0.7rem] tracking-[0.3em] text-muted-fg font-body uppercase">
            {weekday}
          </p>
        )}
      </div>

      {showHint && hasBand && (
        <div className="hidden md:flex justify-end pr-8 -mt-2 -mb-6">
          <DoodleArrow day={dayNum} showFrom="md" />
        </div>
      )}

      {rows.length === 0 ? (
        <p className="py-10 text-center font-display text-2xl tracking-widest text-muted-fg/50">
          HAMAROSAN...
        </p>
      ) : (
        <div className="relative">
          {/* Central axis */}
          <div
            className={cn(
              'absolute top-2 bottom-2 w-0.5 left-6 md:left-1/2 md:-translate-x-1/2 opacity-30',
              color.line
            )}
          />
          <ul className="space-y-8">
            {rows.map((row, i) => {
              const status = statuses[i]
              const left = i % 2 === 0
              return (
                <li key={row.id} className="relative">
                  {/* Axis node */}
                  <div className="absolute top-1 left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <TimeNode time={row.setTime} status={status} color={color} />
                  </div>
                  {/* Card, alternating sides on desktop */}
                  <div
                    className={cn(
                      'pl-16 md:w-[calc(50%-2.5rem)]',
                      left ? 'md:pl-0 md:pr-6' : 'md:ml-auto md:pl-6'
                    )}
                  >
                    <TimelineCard
                      row={row}
                      status={status}
                      color={color}
                      align={left ? 'right' : 'left'}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
