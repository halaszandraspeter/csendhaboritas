// Hungarian date labels generated from the event's `days` (ISO 'YYYY-MM-DD') list.
// Parsed manually to avoid timezone shifts from Date().

const MONTHS_LONG = [
  'január',
  'február',
  'március',
  'április',
  'május',
  'június',
  'július',
  'augusztus',
  'szeptember',
  'október',
  'november',
  'december',
]

const MONTHS_SHORT = [
  'jan.',
  'feb.',
  'márc.',
  'ápr.',
  'máj.',
  'jún.',
  'júl.',
  'aug.',
  'szept.',
  'okt.',
  'nov.',
  'dec.',
]

export interface DayLabel {
  /** e.g. "Október 9." */
  title: string
  /** e.g. "OKTÓBER 9." */
  upper: string
  /** e.g. "okt. 9." */
  short: string
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Format a single ISO date string into Hungarian label variants. */
export function formatEventDay(iso?: string): DayLabel | null {
  if (!iso) return null
  const [, m, d] = iso.split('-').map(Number)
  if (!m || !d || m < 1 || m > 12) return null
  const title = `${capitalize(MONTHS_LONG[m - 1])} ${d}.`
  return { title, upper: title.toUpperCase(), short: `${MONTHS_SHORT[m - 1]} ${d}.` }
}

/** All day labels for an event, in order. */
export function eventDayLabels(days?: string[]): DayLabel[] {
  return (days ?? []).map(formatEventDay).filter((x): x is DayLabel => x !== null)
}

/** Label for a specific 1-based day number (band.day / activity.day). */
export function dayLabelFor(days: string[] | undefined, day: number): DayLabel | null {
  return formatEventDay(days?.[day - 1])
}
