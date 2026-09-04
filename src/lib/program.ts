import { sanityImageUrl } from '@/src/lib/sanity/image'
import { setEpoch } from '@/src/lib/dates'
import type { Activity, Band } from '@/src/types'

export interface ScheduleRow {
  id: string
  kind: 'band' | 'activity'
  name: string
  href?: string
  genre?: string
  setTime?: string
  imageUrl?: string
  description?: string
  startMs: number | null
}

export type RowStatus = 'past' | 'current' | 'upcoming'

// Fallback duration when a set has no following item to bound its end.
const ASSUMED_SET_MS = 90 * 60 * 1000

/** Merge bands + activities for one day into time-sorted, serializable rows. */
export function buildRows(
  bands: Band[],
  activities: Activity[],
  day: 1 | 2,
  dayIso?: string
): ScheduleRow[] {
  const bandRows: ScheduleRow[] = bands
    .filter((b) => b.day === day)
    .map((b) => ({
      id: b._id,
      kind: 'band',
      name: b.name,
      href: `/zenekarok/${b.slug.current}`,
      genre: b.genre,
      setTime: b.setTime,
      imageUrl: b.cardThumbnailImage
        ? sanityImageUrl(b.cardThumbnailImage).width(900).height(600).fit('crop').url()
        : undefined,
      startMs: setEpoch(dayIso, b.setTime),
    }))

  const activityRows: ScheduleRow[] = activities
    .filter((a) => a.day === day)
    .map((a) => ({
      id: a._id,
      kind: 'activity',
      name: a.name,
      setTime: a.setTime,
      description: a.description,
      imageUrl: a.image
        ? sanityImageUrl(a.image).width(800).height(800).fit('crop').url()
        : undefined,
      startMs: setEpoch(dayIso, a.setTime),
    }))

  return [...bandRows, ...activityRows].sort((a, b) =>
    (a.setTime ?? '').localeCompare(b.setTime ?? '')
  )
}

/**
 * Per-row playing status relative to `now` (ms epoch, or null before mount).
 * A row is `current` from its start until the next timed row starts (or +90min
 * for the last set of the night); earlier rows are `past`.
 */
export function computeStatuses(rows: ScheduleRow[], now: number | null): RowStatus[] {
  if (now == null) return rows.map(() => 'upcoming')

  const starts = rows
    .map((r) => r.startMs)
    .filter((s): s is number => s != null)
    .sort((a, b) => a - b)

  return rows.map((row) => {
    if (row.startMs == null) return 'upcoming'
    const next = starts.find((s) => s > row.startMs!)
    const end = next ?? row.startMs + ASSUMED_SET_MS
    if (now >= end) return 'past'
    if (now >= row.startMs) return 'current'
    return 'upcoming'
  })
}
