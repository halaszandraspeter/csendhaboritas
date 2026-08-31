/**
 * Design token constants — single source of truth.
 * These mirror the CSS custom properties in globals.css @theme.
 * Swap values here (or in globals.css) when the design team finalises exact hex codes.
 */
export const colors = {
  bg: '#000000',
  fg: '#ffffff',
  /** Day 1 (Október 9.) — green */
  day1: '#9ae06c',
  /** Day 2 (Október 10.) — purple */
  day2: '#f594fd',
  surface: '#111111',
  muted: '#1a1a1a',
  mutedFg: '#888888',
} as const

/** Returns the Tailwind text class for a given day number */
export function dayTextClass(day: 1 | 2): string {
  return day === 1 ? 'text-day1' : 'text-day2'
}

/** Returns the Tailwind bg class for a given day number */
export function dayBgClass(day: 1 | 2): string {
  return day === 1 ? 'bg-day1' : 'bg-day2'
}

/** Returns the Tailwind border class for a given day number */
export function dayBorderClass(day: 1 | 2): string {
  return day === 1 ? 'border-day1' : 'border-day2'
}
