import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const HU_VOWELS = 'aáeéiíoóöőuúüű'

/** Digit (1–9) read aloud in Hungarian, e.g. as a leading numeral. */
const HU_DIGIT_WORDS = ['nulla', 'egy', 'két', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc']
/** Tens (20–90) read aloud in Hungarian, indexed by the tens digit (2–9). */
const HU_TENS_WORDS = ['', '', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven']

/** First spoken word of a non-negative integer read aloud in Hungarian. */
function hungarianNumberFirstWord(n: number): string {
  if (n >= 1_000_000_000) {
    const q = Math.floor(n / 1_000_000_000)
    return q === 1 ? 'egy' : hungarianNumberFirstWord(q)
  }
  if (n >= 1_000_000) {
    const q = Math.floor(n / 1_000_000)
    return q === 1 ? 'egy' : hungarianNumberFirstWord(q)
  }
  if (n >= 1000) {
    const q = Math.floor(n / 1000)
    return q === 1 ? 'ezer' : hungarianNumberFirstWord(q)
  }
  if (n >= 100) {
    const h = Math.floor(n / 100)
    return h === 1 ? 'száz' : HU_DIGIT_WORDS[h]
  }
  if (n >= 20) return HU_TENS_WORDS[Math.floor(n / 10)]
  if (n >= 10) return 'tíz'
  return HU_DIGIT_WORDS[n]
}

/**
 * Pick the Hungarian definite article ("a" or "az") for a word based on how its
 * first sound is pronounced. Skips leading symbols/punctuation, reads a leading
 * number aloud, and otherwise uses the first letter's vowel/consonant sound.
 */
export function hungarianArticle(word: string): 'a' | 'az' {
  const match = word.match(/[\p{L}\p{N}]/u)
  if (!match) return 'a'
  const first = match[0]

  if (/\d/.test(first)) {
    const digits = word.slice(match.index).match(/^\d+/)?.[0] ?? first
    const n = Number.parseInt(digits, 10)
    if (Number.isFinite(n)) {
      return HU_VOWELS.includes(hungarianNumberFirstWord(n)[0]) ? 'az' : 'a'
    }
  }

  return HU_VOWELS.includes(first.toLowerCase()) ? 'az' : 'a'
}
