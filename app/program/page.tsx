import type { Metadata } from 'next'
import { getAllActivities, getAllBands } from '@/src/lib/sanity/queries'
import { sanityImageUrl } from '@/src/lib/sanity/image'
import type { Activity, Band } from '@/src/types'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Program',
  description: 'A Miskolci Csendháborítás két napjának teljes műsora — Október 9–10.',
}

type ScheduleItem =
  | { kind: 'band'; item: Band }
  | { kind: 'activity'; item: Activity }

// Literal class names per day so Tailwind's JIT can detect them.
const dayStyles = {
  day1: {
    line: 'bg-day1',
    label: 'text-day1',
    time: 'text-day1',
    hoverBorder: 'hover:border-day1',
    hoverText: 'group-hover:text-day1',
  },
  day2: {
    line: 'bg-day2',
    label: 'text-day2',
    time: 'text-day2',
    hoverBorder: 'hover:border-day2',
    hoverText: 'group-hover:text-day2',
  },
} as const

type DayColor = keyof typeof dayStyles

function buildSchedule(bands: Band[], activities: Activity[], day: 1 | 2): ScheduleItem[] {
  const items: ScheduleItem[] = [
    ...bands.filter((b) => b.day === day).map((item) => ({ kind: 'band', item }) as const),
    ...activities
      .filter((a) => a.day === day)
      .map((item) => ({ kind: 'activity', item }) as const),
  ]
  return items.sort((a, b) => (a.item.setTime ?? '').localeCompare(b.item.setTime ?? ''))
}

function BandRow({ band, dayColor }: { band: Band; dayColor: DayColor }) {
  const s = dayStyles[dayColor]
  return (
    <Link
      href={`/zenekarok/${band.slug.current}`}
      className={`flex justify-between items-center py-3 border-b border-muted ${s.hoverBorder} group transition-colors`}
    >
      <span
        className={`font-display text-xl tracking-widest text-fg ${s.hoverText} transition-colors`}
      >
        {band.name}
      </span>
      <div className="flex items-center gap-3">
        {band.genre && (
          <span className="text-xs text-muted-fg font-body hidden sm:block">{band.genre}</span>
        )}
        {band.setTime && (
          <span className={`font-display text-sm ${s.time} tabular-nums`}>{band.setTime}</span>
        )}
      </div>
    </Link>
  )
}

function ActivityRow({ activity, dayColor }: { activity: Activity; dayColor: DayColor }) {
  const s = dayStyles[dayColor]
  return (
    <div className="flex gap-4 py-3 border-b border-muted">
      {activity.image && (
        <Image
          src={sanityImageUrl(activity.image).width(120).height(120).fit('crop').url()}
          alt={activity.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center gap-3">
          <span className="font-display text-xl tracking-widest text-fg">{activity.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-fg font-body hidden sm:block">PROGRAM</span>
            {activity.setTime && (
              <span className={`font-display text-sm ${s.time} tabular-nums`}>
                {activity.setTime}
              </span>
            )}
          </div>
        </div>
        {activity.description && (
          <p className="text-sm text-muted-fg font-body mt-1">{activity.description}</p>
        )}
      </div>
    </div>
  )
}

function DayColumn({
  label,
  dayColor,
  schedule,
}: {
  label: string
  dayColor: DayColor
  schedule: ScheduleItem[]
}) {
  const s = dayStyles[dayColor]
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-px flex-1 ${s.line}`} />
        <p className={`font-display text-2xl tracking-widest ${s.label} whitespace-nowrap`}>
          {label}
        </p>
        <div className={`h-px flex-1 ${s.line}`} />
      </div>

      <ul className="space-y-1">
        {schedule.length > 0 ? (
          schedule.map((entry) => (
            <li key={entry.item._id}>
              {entry.kind === 'band' ? (
                <BandRow band={entry.item} dayColor={dayColor} />
              ) : (
                <ActivityRow activity={entry.item} dayColor={dayColor} />
              )}
            </li>
          ))
        ) : (
          <li className="font-display text-2xl tracking-widest text-muted-fg/50 py-10 text-center">
            HAMAROSAN...
          </li>
        )}
      </ul>
    </div>
  )
}

export default async function ProgramPage() {
  const [bands, activities] = await Promise.all([getAllBands(), getAllActivities()])
  const day1Schedule = buildSchedule(bands, activities, 1)
  const day2Schedule = buildSchedule(bands, activities, 2)

  return (
    <div className="min-h-dvh px-6 py-16 max-w-5xl mx-auto w-full">
      <h1 className="font-display text-5xl md:text-7xl tracking-widest text-fg mb-12 text-center">
        PROGRAM
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DayColumn label="OKTÓBER 9." dayColor="day1" schedule={day1Schedule} />
        <DayColumn label="OKTÓBER 10." dayColor="day2" schedule={day2Schedule} />
      </div>

      <p className="text-center text-xs text-muted-fg font-body mt-12">
        Grizzly Music Pub · Miskolc · 2026
      </p>
    </div>
  )
}
